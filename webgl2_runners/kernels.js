// webgl2_runners/kernels.js
// ---------------------------------------------------------------------------
// GLSL ES 3.00 kernels for the native WebGL2 MeshNet runner.
//
// Transliterated from brainchopC/src/webgl2_kernels.h, which is the measured,
// browser-validated original (1 f16 ULP vs a scalar C reference on both
// Chromium's ANGLE translator and Firefox's own). Read
// brainchopC/webgl2_plan.md before changing anything here -- every structural
// choice below has a recorded reason and several have a recorded rejected
// alternative.
//
// WHAT THIS BUYS OVER tf.conv3d. tfjs's Conv3DProgram computes ONE output
// element per fragment, unpacked (1 float per RGBA texel), addressing every
// fetch through flat-index -> 2D texcoord div/mod. Here one fragment emits ALL
// CS output channels through P multiple render targets, so the 27*CS input
// window is read ONCE and reused across every output channel, activations live
// in RGBA16F 3D textures addressed by texelFetch(sampler3D, ivec3), and weights
// arrive four at a time. For a 16->16 layer that is ~1.8k vec4 fetches per voxel
// against ~13.8k scalar fetches.
//
// TWO DIFFERENCES FROM THE C, both required here and neither optional:
//
//   1. The C hardcodes CS = 16 (exactly four RGBA planes). brainchop-test's
//      models need 5, 6, 11, 15, 16, 24, 30 and 32 channels, so the plane count
//      P = CS/4 is a descriptor parameter and every per-plane statement is
//      generated. MAX_DRAW_BUFFERS >= P is a hard requirement (8 on the M1 that
//      was measured, which covers P <= 8 i.e. every shipped model). VOX=2 needs
//      2P attachments, so it is only available for P <= 4.
//
//   2. The C assumes a DIM^3 cube. brainchop-test crops the big models, so
//      dimensions are three independent constants NX, NY, NZ. The moment
//      reduction shapes and the voxel count follow from them.
//
// PRECISION. Storage is f16 (RGBA16F); all arithmetic is `highp float` = f32.
// `precision highp float` is mandatory, not defensive: GLSL ES has no default
// float precision in the fragment stage, so omitting it is a compile error and a
// mediump fallback would silently compute the convolution at f16.
// ---------------------------------------------------------------------------

/** Width, in RGBA texels, of the 2D texture holding every layer's weights.
 *  A power of two so the row/column split is a shift and a mask, never an
 *  integer division, in the innermost of 27 taps. */
export const WTEX_W = 256;
const WTEX_SHIFT = 8;
const WTEX_MASK = 255;

/** Width of the RGBA8 label texture. Four consecutive x voxels per texel, so
 *  the readback is one byte per voxel instead of four. */
export const LAB_W = 2048;

/**
 * The vertex shader, shared by every program.
 *
 * A fullscreen triangle synthesised from gl_VertexID alone: no vertex buffer,
 * no attributes, no VAO contents. That is what keeps a full-volume pass at three
 * GL calls per z slice (bindFramebuffer, uniform, drawArrays), which is the
 * premise the per-slice design rests on. Three vertices at (0,0), (2,0), (0,2)
 * in unit space cover the viewport with one primitive and no diagonal seam.
 */
export const VERTEX_SRC = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

const preamble = (d) => `#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
const int NX = ${d.nx};
const int NY = ${d.ny};
const int NZ = ${d.nz};
const int CS = ${d.cs};
const int P = ${d.planes};
const int CHAN = ${d.chan};
const int NCLASS = ${d.nclass};
const float EPS = ${d.eps ?? 1e-5};
`;

/**
 * Weight fetch. `q` is an index in RGBA texels, i.e. a float index divided by
 * four, which is exact because CS is a multiple of 4 and every offset the host
 * passes is a multiple of CS.
 */
const WFETCH = `uniform highp sampler2D wts;
vec4 wf(int q) {
  return texelFetch(wts, ivec2(q & ${WTEX_MASK}, q >> ${WTEX_SHIFT}), 0);
}
float ws(int i) { return wf(i >> 2)[i & 3]; }
`;

// --- small generators over the plane count ---------------------------------

const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
const outDecls = (n, pfx) => rep(n, (i) => `layout(location = ${i}) out vec4 ${pfx}${i};\n`);
const samplerDecl = (n) => `uniform highp sampler3D ${rep(n, (i) => (i ? ', ' : '') + 's' + i)};\n`;
const accDecls = (n, pfx) => `  vec4 ${rep(n, (i) => (i ? ', ' : '') + pfx + i + ' = vec4(0.0)')};\n`;
const emit = (n, dst, src) => rep(n, (i) => `  ${dst}${i} = ${src}${i};\n`);

/**
 * The activation. Selected by the descriptor, never defaulted silently.
 *
 * `gelu_tanh` is tinygrad's `.gelu()` verbatim and is the right default for
 * weights loaded from a safetensors export, since that is the function the
 * WebGPU runner this path is validated against computes. GLSL ES 3.00 does have
 * `tanh`, so no rational approximation is needed to reproduce it.
 *
 * The two `gelu_*_approx` flavours are brainchopC's, kept because it records
 * that its two models declare the same `"gelu"` string while computing
 * DIFFERENT, non-interchangeable functions, and that CUDA and OpenCL once
 * hardcoded one and silently ran the wrong one for the other model. If label
 * parity against the WebGPU runner fails, this is the FIRST knob to try -- a
 * wrong GELU flavour moves labels without erroring.
 */
function activationSrc(kind) {
  switch (kind) {
    case 'gelu_tanh':
      // The clamp is REQUIRED, not defensive, and brainchopC's mn_tanh carries the
      // same one for the same reason. GLSL's tanh is commonly lowered to
      // (exp(2x)-1)/(exp(2x)+1), so a large argument gives Inf/Inf = NaN. The
      // cubic reaches |u| > 9 at |x| ~ 5.6, which real quantile-normalized
      // activations do hit. tanh(9) = 0.999999997, so clamping is numerically
      // free -- and without it the NaN propagates to the classifier, where
      // `acc > bestv` is false for EVERY class, leaving label 0 at every voxel.
      // An all-zero volume, 8 seconds after the run looked healthy.
      return `float act(float x) {
  float u = clamp(0.7978845608028654 * (x + 0.044715 * x * x * x), -9.0, 9.0);
  return 0.5 * x * (1.0 + tanh(u));
}
`;
    case 'gelu_tanh_approx':
      return `float mn_tanh(float x_in) {
  float x = clamp(x_in, -9.0, 9.0);
  float u = x * x;
  float p = -8.29118133e-14;
  p = p * u + 5.19263868e-11;
  p = p * u - 2.00294448e-08;
  p = p * u + 1.11017944e-05;
  p = p * u + 0.00309865153;
  p = p * u + 0.130791619;
  p = p * u + 0.99999994;
  float q = 0.000253859733;
  q = q * u + 0.024473751;
  q = q * u + 0.464124829;
  q = q * u + 1.0;
  return x * p / q;
}
float act(float x) {
  float u = 0.797884583 * (x + 0.044715 * (x * x * x));
  return (0.5 * x) * (1.0 + mn_tanh(u));
}
`;
    case 'gelu_exp2_approx':
      // Reproduces brainchopC's mn_fast_exp2 polynomial rather than calling
      // exp2(); it records that the builtin exceeded its model16 parity budget.
      return `float mn_fast_exp2(float x_in) {
  float x = x_in;
  if (!(x > -126.0)) x = -126.0;
  if (x > 126.0) x = 126.0;
  float f = floor(x);
  float r = x - f;
  float p = 0.000216128448;
  p = p * r + 0.00124678648;
  p = p * r + 0.0096754498;
  p = p * r + 0.0554852814;
  p = p * r + 0.240229305;
  p = p * r + 0.693147044;
  p = p * r + 1.0;
  float scale = uintBitsToFloat(uint((int(f) + 127) << 23));
  return p * scale;
}
float act(float x) {
  float u = x + 0.044715 * x * x * x;
  return x / (1.0 + mn_fast_exp2(-2.302208198144325 * u));
}
`;
    case 'relu':
      return `float act(float x) { return max(x, 0.0); }\n`;
    case 'elu':
      return `float act(float x) { return x > 0.0 ? x : (exp(x) - 1.0); }\n`;
    default:
      throw new Error(
        `webgl2 kernels: unknown activation '${kind}'. ` +
        `Add it here deliberately -- do NOT fall back to a default; ` +
        `brainchopC records that silently substituting a GELU flavour ran the ` +
        `wrong function on four backends without erroring.`
      );
  }
}

const ACT4 = `vec4 act4(vec4 v) { return vec4(act(v.x), act(v.y), act(v.z), act(v.w)); }\n`;

// --- conv, layer 0 ---------------------------------------------------------

/**
 * Layer 0: a 3x3x3 dilated convolution from ONE input channel to CS outputs,
 * `same` zero padding.
 *
 * A separate program from the hidden convolution rather than a runtime branch on
 * the input channel count. Two programs mean neither carries the other's dead
 * loop, and it lets the input volume stay a one-channel R16F texture -- indexing
 * it at the CS-wide activation stride would demand P times the memory to hold
 * the same data.
 *
 * TAP ORDER is (dz, dy, dx) lexicographic, so `tap` increments exactly as the
 * weight packer's dst_tap = (dz+1)*9 + (dy+1)*3 + (dx+1). Getting this wrong
 * produces a plausible-looking volume, not an error, so it is stated rather than
 * implied. See packWeights() in safetensors.js, which is the other half.
 *
 * PADDING is a clamped fetch multiplied by a mask, not a branch. Skipping the
 * tap contributes nothing; multiplying by zero is the same arithmetic and stays
 * uniform across the quad, where a branch would diverge at the volume edge for
 * no gain.
 *
 * Accumulators are named vec4s, never an array: a dynamically indexed array
 * tends to land in scratch memory rather than registers.
 */
export function convFirstSrc(d) {
  const P = d.planes;
  const fold = d.norm === 'none';         // family A: bias + activation fold in here
  return preamble(d) +
    `uniform highp sampler3D src;\n` + WFETCH +
    `uniform int uZ;\nuniform int uDil;\nuniform int uWQ0;\n` +
    (fold ? `uniform int uBiasQ;\n` + activationSrc(d.activation) + ACT4 : '') +
    outDecls(P, 'o') +
    `void main() {
  ivec3 p = ivec3(int(gl_FragCoord.x), int(gl_FragCoord.y), uZ);
` + accDecls(P, 'a') + `  int tap = 0;
  for (int dz = -1; dz <= 1; ++dz) {
  for (int dy = -1; dy <= 1; ++dy) {
  for (int dx = -1; dx <= 1; ++dx) {
    ivec3 s = p + ivec3(dx, dy, dz) * uDil;
    bool ok = all(greaterThanEqual(s, ivec3(0))) &&
              s.x < NX && s.y < NY && s.z < NZ;
    float v = texelFetch(src, clamp(s, ivec3(0), ivec3(NX - 1, NY - 1, NZ - 1)), 0).r *
              (ok ? 1.0 : 0.0);
    int w = uWQ0 + tap * P;
` + rep(P, (i) => `    a${i} += wf(w + ${i}) * v;\n`) + `    ++tap;
  }}}
` + (fold
      ? rep(P, (i) => `  a${i} = act4(a${i} + wf(uBiasQ + ${i}));\n`)
      : '') +
    emit(P, 'o', 'a') + `}
`;
}

// --- conv, hidden ----------------------------------------------------------

/**
 * Hidden layers: 3x3x3 dilated, CS inputs to CS outputs.
 *
 * The CS input channels of a voxel arrive as P RGBA fetches and the CS outputs
 * leave through P attachments, so one fragment does the work tfjs spreads over
 * CS fragments, reading the 27*CS input window once instead of CS times.
 *
 * What a fragment CANNOT do is register-block over voxels: it owns exactly one
 * texel per attachment, so the 27*CS*CS weights are re-fetched per voxel. That
 * is the dominant cost, and convHiddenVox2Src below is the answer to it.
 *
 * The input-channel walk is ascending so the accumulation order agrees with the
 * CPU reference as closely as a different data layout allows.
 */
export function convHiddenSrc(d) {
  const P = d.planes;
  const fold = d.norm === 'none';
  // weights: float index ((tap*CS) + ic)*CS + oc  ->  quad index
  //          (tap*CS + ic)*P + j,  j in [0,P)
  const quad = (qi) => `  { for (int i = 0; i < 4; ++i) {
      float v = q${qi}[i];
      int w = b + (${qi * 4} + i) * P;
` + rep(P, (j) => `      a${j} += wf(w + ${j}) * v;\n`) + `    } }
`;
  return preamble(d) + samplerDecl(P) + WFETCH +
    `uniform int uZ;\nuniform int uDil;\nuniform int uWQ0;\n` +
    (fold ? `uniform int uBiasQ;\n` + activationSrc(d.activation) + ACT4 : '') +
    outDecls(P, 'o') +
    `void main() {
  ivec3 p = ivec3(int(gl_FragCoord.x), int(gl_FragCoord.y), uZ);
` + accDecls(P, 'a') + `  int tap = 0;
  for (int dz = -1; dz <= 1; ++dz) {
  for (int dy = -1; dy <= 1; ++dy) {
  for (int dx = -1; dx <= 1; ++dx) {
    ivec3 s = p + ivec3(dx, dy, dz) * uDil;
    float m = (all(greaterThanEqual(s, ivec3(0))) &&
               s.x < NX && s.y < NY && s.z < NZ) ? 1.0 : 0.0;
    ivec3 sc = clamp(s, ivec3(0), ivec3(NX - 1, NY - 1, NZ - 1));
` + rep(P, (i) => `    vec4 q${i} = texelFetch(s${i}, sc, 0) * m;\n`) +
    `    int b = uWQ0 + tap * CS * P;
` + rep(P, quad) + `    ++tap;
  }}}
` + (fold
      ? rep(P, (i) => `  a${i} = act4(a${i} + wf(uBiasQ + ${i}));\n`)
      : '') +
    emit(P, 'o', 'a') + `}
`;
}

/**
 * The same convolution computing TWO z slices per fragment.
 *
 * Getting this to exist at all took choosing the right axis, and brainchopC's
 * reasoning is worth repeating because the obvious axis is the wrong one.
 * Blocking over x would need two voxels' CS channels in 2P distinct attachments,
 * and since the P activation textures are already fully spent on one voxel it
 * would mean splitting the activation into even-x and odd-x halves -- a layout
 * change every other kernel would have to know about, and a convolution whose
 * source fetch picks a texture by the parity of a runtime dilation.
 *
 * Blocking over z costs none of that. glFramebufferTextureLayer attaches an
 * IMAGE, not a texture, so layer z and layer z+1 of the same texture are two
 * different images and may both be attached to one framebuffer. Attachments
 * 0..P-1 take layer z and P..2P-1 layer z+1, and THE ACTIVATION LAYOUT DOES NOT
 * CHANGE AT ALL -- moments, norm and classify are untouched.
 *
 * Measured 1.41x in the C, with the voxel counts unchanged (it changes only
 * which fragment computes a voxel, never the order a voxel's own products are
 * summed). Needs 2P draw buffers, so the host probes MAX_DRAW_BUFFERS and falls
 * back to convHiddenSrc. Layer 0 stays at one voxel per fragment: one pass in
 * ~14 with a single input channel, carrying almost none of the weight traffic
 * this exists to halve.
 */
export function convHiddenVox2Src(d) {
  const P = d.planes;
  const fold = d.norm === 'none';
  const quad2 = (qi) => `  { for (int i = 0; i < 4; ++i) {
      float v = q${qi}[i];
      float u = r${qi}[i];
      int w = b + (${qi * 4} + i) * P;
` + rep(P, (j) => `      vec4 W${j} = wf(w + ${j}); a${j} += W${j} * v; b${j} += W${j} * u;\n`) +
    `    } }
`;
  return preamble(d) + samplerDecl(P) + WFETCH +
    `uniform int uZ;\nuniform int uDil;\nuniform int uWQ0;\n` +
    (fold ? `uniform int uBiasQ;\n` + activationSrc(d.activation) + ACT4 : '') +
    outDecls(P, 'o') + rep(P, (i) => `layout(location = ${P + i}) out vec4 n${i};\n`) +
    `void main() {
  int x = int(gl_FragCoord.x);
  int y = int(gl_FragCoord.y);
` + accDecls(P, 'a') + accDecls(P, 'b') + `  int tap = 0;
  for (int dz = -1; dz <= 1; ++dz) {
  for (int dy = -1; dy <= 1; ++dy) {
  for (int dx = -1; dx <= 1; ++dx) {
    int sx = x + dx * uDil;
    int sy = y + dy * uDil;
    int za = uZ + dz * uDil;
    int zb = za + 1;
    bool okxy = sx >= 0 && sx < NX && sy >= 0 && sy < NY;
    float ma = (okxy && za >= 0 && za < NZ) ? 1.0 : 0.0;
    float mb = (okxy && zb >= 0 && zb < NZ) ? 1.0 : 0.0;
    int cx = clamp(sx, 0, NX - 1);
    int cy = clamp(sy, 0, NY - 1);
    ivec3 ca = ivec3(cx, cy, clamp(za, 0, NZ - 1));
    ivec3 cb = ivec3(cx, cy, clamp(zb, 0, NZ - 1));
` + rep(P, (i) => `    vec4 q${i} = texelFetch(s${i}, ca, 0) * ma;\n`) +
    rep(P, (i) => `    vec4 r${i} = texelFetch(s${i}, cb, 0) * mb;\n`) +
    `    int b = uWQ0 + tap * CS * P;
` + rep(P, quad2) + `    ++tap;
  }}}
` + (fold
      ? rep(P, (i) => `  a${i} = act4(a${i} + wf(uBiasQ + ${i}));\n  b${i} = act4(b${i} + wf(uBiasQ + ${i}));\n`)
      : '') +
    emit(P, 'o', 'a') + emit(P, 'n', 'b') + `}
`;
}

// --- GroupNorm moments -----------------------------------------------------

/**
 * GroupNorm moments, in three passes because WebGL2 has neither shared memory
 * nor atomics. Groups are per-channel (instance norm), matching both the tfjs
 * export's decomposition and the WebGPU runner.
 *
 * The shape is chosen for SHORT accumulation chains, which is the whole point:
 *
 *   A  one fragment per (x, y) column, summing the NZ voxels along z.
 *   B  collapse each column of A: NY partials per group.
 *   F  collapse those over NX and form mean and inverse stddev.
 *
 * No chain exceeds max(NX, NY, NZ). brainchopC records that its WGSL folds
 * 262144 partials through 16 stripes and that striping is what moved its WebGPU
 * backend from 940 to 699 differing voxels; three short chains need neither
 * striping nor Kahan compensation (which the optimiser removes anyway). Measured
 * there as slightly FASTER than the two-pass WGSL version in absolute time, so
 * the "fold the moments away" optimisation held open for WebGPU is not the one
 * to port here.
 *
 * Pass A runs once per plane with that plane's texture bound to the same
 * sampler and the viewport moved to its rows, because GLSL ES 3.00 forbids
 * indexing an array of samplers by a runtime value. That is cheaper than P
 * separate programs.
 */
export const momentsASrc = (d) => preamble(d) + `uniform highp sampler3D src;
uniform int uRowBase;
layout(location = 0) out vec4 oSum;
layout(location = 1) out vec4 oSq;
void main() {
  int x = int(gl_FragCoord.x);
  int y = int(gl_FragCoord.y) - uRowBase;
  vec4 s = vec4(0.0), q = vec4(0.0);
  for (int z = 0; z < NZ; ++z) {
    vec4 v = texelFetch(src, ivec3(x, y, z), 0);
    s += v;
    q += v * v;
  }
  oSum = s; oSq = q;
}
`;

export const momentsBSrc = (d) => preamble(d) + `uniform highp sampler2D pSum, pSq;
layout(location = 0) out vec4 oSum;
layout(location = 1) out vec4 oSq;
void main() {
  int x = int(gl_FragCoord.x);
  int g = int(gl_FragCoord.y);
  vec4 s = vec4(0.0), q = vec4(0.0);
  for (int y = 0; y < NY; ++y) {
    s += texelFetch(pSum, ivec2(x, g * NY + y), 0);
    q += texelFetch(pSq,  ivec2(x, g * NY + y), 0);
  }
  oSum = s; oSq = q;
}
`;

/**
 * The variance is formed as E[x^2] - E[x]^2, the cancellation-prone way, which
 * is what the CPU, CUDA, Metal and the WGSL all do.
 *
 * This is SAFE here in a way it is not in the tfjs path, and the distinction is
 * worth stating because memory `webgl-fp16-centered-variance` records that
 * brainchop-test's WebGL path needed a centered-variance LayerNormInPlace to
 * avoid pure-noise segmentations. That failure was squaring IN fp16: tfjs
 * reduced inside fp16 textures. Here storage is f16 but every fetch is widened
 * to `highp float` and the partials live in RGBA32F, so the square cannot
 * overflow and the subtraction has f32 to cancel against -- the same arrangement
 * brainchopC's fixtures pass under.
 *
 * If parity still fails, the escape hatch is a two-pass centered form: mean
 * first, then sum of (x - mean)^2, for one extra full read of the activation
 * plus a `varr = q / n` finish shader. It is deliberately NOT written here --
 * brainchopC measures moments+norm at 6-7% of GPU time so the cost is a few
 * percent, but untested code is worse than absent code. Try the GELU flavour
 * first; this second, and write it only if the first does not explain a
 * mismatch.
 */
export const momentsFinishSrc = (d) => preamble(d) + `uniform highp sampler2D pSum, pSq;
layout(location = 0) out vec4 oMean;
layout(location = 1) out vec4 oInv;
void main() {
  int g = int(gl_FragCoord.y);
  vec4 s = vec4(0.0), q = vec4(0.0);
  for (int x = 0; x < NX; ++x) {
    s += texelFetch(pSum, ivec2(x, g), 0);
    q += texelFetch(pSq,  ivec2(x, g), 0);
  }
  float n = float(NX) * float(NY) * float(NZ);
  vec4 mean = s / n;
  vec4 varr = max(q / n - mean * mean, vec4(0.0));
  oMean = mean;
  oInv = inversesqrt(varr + EPS);
}
`;

// --- norm ------------------------------------------------------------------

/**
 * Normalise, apply the optional per-channel affine, activate.
 *
 * NOT in place, unlike the CPU and WGSL versions: WebGL2 forbids reading and
 * writing one texture in a draw (feedback loop, undefined). This reads the
 * convolution's output and writes the other half of the ping-pong. Write traffic
 * is unchanged -- the same bytes are stored either way -- so the only cost is
 * that the schedule has to name which buffer is current.
 *
 * All CS channels are processed, including the pad lanes beyond CHAN. They are
 * inert: a zeroed channel has mean 0 and variance 0, normalises to 0, and every
 * activation here maps 0 to 0, so it stays zero for every layer. That is the
 * same argument the CPU engine's channel stride relies on -- and it is why the
 * weight packer must zero-fill those lanes rather than leave them uninitialised.
 */
export function normSrc(d) {
  const P = d.planes;
  const group = (i) => `  vec4 v${i} = (texelFetch(s${i}, p, 0) - texelFetch(pMean, ivec2(0, ${i}), 0))
              * texelFetch(pInv, ivec2(0, ${i}), 0);
` + (d.affine ? `  v${i} = v${i} * wf(uAffQ + ${i}) + wf(uBiasQ + ${i});\n` : '');
  return preamble(d) + samplerDecl(P) +
    `uniform highp sampler2D pMean, pInv;\n` + WFETCH +
    (d.affine ? `uniform int uAffQ;\nuniform int uBiasQ;\n` : '') +
    `uniform int uZ;\n` + activationSrc(d.activation) + ACT4 +
    outDecls(P, 'o') +
    `void main() {
  ivec3 p = ivec3(int(gl_FragCoord.x), int(gl_FragCoord.y), uZ);
` + rep(P, group) + rep(P, (i) => `  o${i} = act4(v${i});\n`) + `}
`;
}

// --- classifier ------------------------------------------------------------

/**
 * Classifier: a 1x1 convolution followed by argmax, four voxels per fragment.
 *
 * The output is an RGBA8 2D texture rather than a 3D one because this is the
 * ONLY buffer that leaves the GPU, and glReadPixels with GL_RGBA /
 * GL_UNSIGNED_BYTE from a normalized attachment is the one combination every
 * implementation must support -- integer-attachment readback formats are
 * implementation-defined. Packing four consecutive x voxels per texel makes the
 * readback one byte per voxel instead of four.
 *
 * A tie leaves the LOWER class index, matching a strict `>` on the CPU. The
 * channel loop runs to CHAN, not CS: classifier weights are packed at stride
 * NCLASS with only CHAN channels, so a pad lane would index a weight that does
 * not belong to it.
 *
 * NCLASS <= 256 is required (one byte per label). Every shipped model is at most
 * 104, and the host asserts it.
 */
export function classifySrc(d) {
  const P = d.planes;
  const pick = rep(P, (i) =>
    i === 0 ? `      float sv = c0[c];\n`
      : `      if (c >= ${i * 4}) sv = c${i}[c - ${i * 4}];\n`);
  return preamble(d) + samplerDecl(P) + WFETCH +
    `uniform int uWCls;\nuniform int uWBias;\nuniform int uHasBias;\n` +
    `out vec4 outColor;\n` +
    `void main() {
  int t = int(gl_FragCoord.y) * ${LAB_W} + int(gl_FragCoord.x);
  vec4 lab = vec4(0.0);
  for (int j = 0; j < 4; ++j) {
    int v = t * 4 + j;
    if (v >= NX * NY * NZ) break;
    ivec3 p = ivec3(v % NX, (v / NX) % NY, v / (NX * NY));
` + rep(P, (i) => `    vec4 c${i} = texelFetch(s${i}, p, 0);\n`) +
    `    float bestv = -3.0e38;
    int best = 0;
    for (int k = 0; k < NCLASS; ++k) {
      float acc = uHasBias != 0 ? ws(uWBias + k) : 0.0;
      for (int c = 0; c < CHAN; ++c) {
` + pick + `        acc += sv * ws(uWCls + c * NCLASS + k);
      }
      if (acc > bestv) { bestv = acc; best = k; }
    }
    lab[j] = float(best) / 255.0;
  }
  outColor = lab;
}
`;
}

/**
 * Build every shader source for a descriptor. Returned as plain strings so the
 * host can hand them to a validator (mirroring brainchopC's check-glsl) without
 * creating a context.
 *
 * `maxDrawBuffers` is the DEVICE's MAX_DRAW_BUFFERS and must be passed in, not
 * assumed. The GLES 3.0 floor is 4, brainchopC measured 8 on Chromium and
 * Firefox on an M4 Pro and an M1 -- but SwiftShader reports 6, so P=8 models
 * (32 and 30 channels) cannot compile there at all and VOX=2 is unavailable even
 * at P=4. Emitting a shader with an output location past the device limit is a
 * compile error, so this refuses by name instead of handing back source that
 * cannot build.
 */
export function buildSources(d, maxDrawBuffers = 8) {
  if (d.planes > maxDrawBuffers) {
    throw new Error(
      `${d.chan} channels need ${d.planes} draw buffers; this device has ` +
      `${maxDrawBuffers}. This model cannot run on the native WebGL2 path here ` +
      `-- fall back to the tfjs channel-list path.`
    );
  }
  const src = {
    vertex: VERTEX_SRC,
    convFirst: convFirstSrc(d),
    convHidden: convHiddenSrc(d),
    classify: d.nclass > 0 ? classifySrc(d) : null,
  };
  // VOX=2 is only offered for the GroupNorm families. It needs the convolution
  // to always target the SAME activation set, which the gn schedule guarantees
  // (conv P->Q, norm Q->P, so P is always current). Family A has no norm pass,
  // so its sets alternate and vox2 would need a second set of 2P framebuffers.
  // Those models are the small ones (5, 11, 30 channels); not worth it yet.
  if (d.norm === 'gn' && d.planes * 2 <= maxDrawBuffers) {
    src.convHiddenVox2 = convHiddenVox2Src(d);
  }
  if (d.norm === 'gn') {
    src.momentsA = momentsASrc(d);
    src.momentsB = momentsBSrc(d);
    src.momentsFinish = momentsFinishSrc(d);
    src.norm = normSrc(d);
  }
  return src;
}
