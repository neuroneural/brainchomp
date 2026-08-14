// webgl2_runners/meshnet_gl.js
// ---------------------------------------------------------------------------
// The native WebGL2 MeshNet runner: a JS port of brainchopC/src/backend_webgl2.c.
//
// This exists because tf.conv3d cannot be made fast enough. tfjs-backend-webgl
// only ever attaches COLOR_ATTACHMENT0 with TEXTURE_2D -- there is no
// TEXTURE_3D, no drawBuffers and no framebufferTextureLayer anywhere in the
// package -- so multiple render targets and 3D textures, which are where the
// speed comes from, are unreachable even from a custom registered kernel. The
// only way to have them is to run outside tfjs, which is what this does.
//
// STRUCTURE follows the C, including the one thing that file got right the hard
// way: ONE EXIT. Every handle is declared up front and null until created, every
// failure throws, and a single `finally` deletes textures, framebuffers and
// programs. brainchop-test's existing worker fallback is only a real fallback if
// this releases ~1-2 GiB cleanly on the way out.
//
// SYNCHRONOUS BY NATURE. readPixels blocks. brainchopC measured the in-thread
// WebGL2 path drawing THREE FRAMES in 2.2 seconds -- a hung tab. Run this in a
// worker on an OffscreenCanvas; brainchop-webgl2-worker.js does.
// ---------------------------------------------------------------------------

import { buildSources, WTEX_W, LAB_W } from './kernels.js';

// ---------------------------------------------------------------- capabilities

/**
 * Probe whether this device can run a given descriptor, with a reason in the
 * caller's terms for each refusal. Cheap: allocates one plane-sized texture to
 * answer the only question WebGL2 has no query for.
 *
 * There is NO memory query in WebGL2. The activation working set is
 * 2 * planes * nx*ny*nz * 8 bytes (RGBA16F), which is 1.0 GiB for a 16-channel
 * 256^3 model and 2.1 GiB for a 32-channel one. An honest "won't fit" is only
 * obtainable by trying, so this allocates one full plane and checks glGetError.
 */
export function probeWebgl2(d, dims, existingGl = null) {
  const reasons = [];
  const [nx, ny, nz] = dims;
  let gl = existingGl, canvas = null;
  try {
    if (!gl) {
      if (typeof OffscreenCanvas === 'undefined') {
        return { supported: false, reasons: ['OffscreenCanvas is unavailable in this context'] };
      }
      canvas = new OffscreenCanvas(1, 1);
      gl = canvas.getContext('webgl2', {
        antialias: false, depth: false, stencil: false,
        preserveDrawingBuffer: false, powerPreference: 'high-performance',
      });
    }
    if (!gl) return { supported: false, reasons: ['no webgl2 context could be created'] };

    // EXT_color_buffer_float is an EXTENSION, not core, and without it no float
    // texture is renderable -- it is the hard dependency. Do NOT substitute
    // EXT_color_buffer_half_float when it is missing: Firefox exposes the former
    // and not the latter, and half_float would not cover the RGBA32F moment
    // targets anyway.
    const cbf = gl.getExtension('EXT_color_buffer_float');
    if (!cbf) reasons.push('EXT_color_buffer_float is not available (no renderable float textures)');

    const max3d = gl.getParameter(gl.MAX_3D_TEXTURE_SIZE);
    const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const maxDraw = gl.getParameter(gl.MAX_DRAW_BUFFERS);
    const maxAttach = gl.getParameter(gl.MAX_COLOR_ATTACHMENTS);
    const need3d = Math.max(nx, ny, nz);
    if (max3d < need3d) reasons.push(`MAX_3D_TEXTURE_SIZE is ${max3d}, this volume needs ${need3d}`);
    if (maxDraw < d.planes) reasons.push(`MAX_DRAW_BUFFERS is ${maxDraw}, ${d.chan} channels need ${d.planes}`);
    if (maxAttach < d.planes) reasons.push(`MAX_COLOR_ATTACHMENTS is ${maxAttach}, ${d.chan} channels need ${d.planes}`);
    if (maxTex < LAB_W) reasons.push(`MAX_TEXTURE_SIZE is ${maxTex}, the label texture needs ${LAB_W}`);

    // Allocate the REAL working set, not one plane.
    //
    // brainchopC's probe tries a single 128 MB texture, and this one used to copy
    // that. It is not good enough: a device can hand out one plane and fail on the
    // twelfth, and the gap matters most exactly where the answer is interesting --
    // 16 channels need 1.0 GiB (which phones do manage) while 24 need 1.5 GiB and
    // 32 need 2.0 GiB. Guessing from one plane would refuse those on principle or
    // admit them on hope. So allocate all 2*planes and free them.
    let allocates = false;
    const probeTex = [];
    if (!reasons.length) {
      while (gl.getError() !== gl.NO_ERROR) { /* drain */ }
      allocates = true;
      for (let i = 0; i < 2 * d.planes && allocates; i++) {
        const t = gl.createTexture();
        probeTex.push(t);
        gl.bindTexture(gl.TEXTURE_3D, t);
        gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGBA16F, nx, ny, nz);
        if (gl.getError() !== gl.NO_ERROR || gl.isContextLost()) allocates = false;
      }
      for (const t of probeTex) gl.deleteTexture(t);
      if (!allocates) {
        const mb = Math.round((2 * d.planes * nx * ny * nz * 8) / 1048576);
        reasons.push(`could not allocate this model's ${mb} MB activation working set ` +
          `(${2 * d.planes} x RGBA16F ${nx}x${ny}x${nz} 3D textures)`);
      }
    }

    const bytes = 2 * d.planes * nx * ny * nz * 8;
    return {
      supported: reasons.length === 0,
      reasons,
      vox2: maxDraw >= 2 * d.planes && maxAttach >= 2 * d.planes,
      renderer: describeRenderer(gl),
      limits: { max3d, maxTex, maxDraw, maxAttach },
      activationBytes: bytes,
      allocates,
    };
  } catch (e) {
    return { supported: false, reasons: [`probe threw: ${e.message}`] };
  } finally {
    if (canvas && gl) gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}

function describeRenderer(gl) {
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
}

// ---------------------------------------------------------------- GL helpers

function compile(gl, type, src, name) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`${name}: shader compile failed: ${log}`);
  }
  return sh;
}

function link(gl, vsSrc, fsSrc, name) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc, `${name}/vs`);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc, `${name}/fs`);
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(p);
    gl.deleteProgram(p);
    // linkProgram is where an MRT or uniform-layout mistake surfaces, which is
    // why brainchopC's check-glsl links rather than only compiling.
    throw new Error(`${name}: program link failed: ${log}`);
  }
  return p;
}

function tex3d(gl, nx, ny, nz, internal) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_3D, t);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
  gl.texStorage3D(gl.TEXTURE_3D, 1, internal, nx, ny, nz);
  return t;
}

function tex2d(gl, w, h, internal) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texStorage2D(gl.TEXTURE_2D, 1, internal, w, h);
  return t;
}

const ATTACH = (gl, i) => gl.COLOR_ATTACHMENT0 + i;

/**
 * A framebuffer with one z-layer of each plane texture attached.
 *
 * Completeness is what validates the setup, and a lingering error queue is a
 * NOTE rather than a refusal. That is a deliberate exception to "a GL error
 * fails the run": brainchopC reproduced, in plain JavaScript with no emscripten
 * involved, that Firefox 151 on macOS returns FRAMEBUFFER_COMPLETE and
 * simultaneously raises INVALID_FRAMEBUFFER_OPERATION when several RGBA16F 3D
 * layers are attached and drawBuffers covers them all -- from the completeness
 * query itself, not from our calls. Refusing would mean not running on one of
 * the two browsers this path exists for, over an error that demonstrably does
 * not affect the output. Every draw and readback afterwards still treats the
 * queue as fatal.
 */
function makeLayerFbo(gl, planes, z, count) {
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  const bufs = [];
  for (let i = 0; i < count; i++) {
    const plane = planes[i % planes.length];
    const layer = z + Math.floor(i / planes.length);
    gl.framebufferTextureLayer(gl.FRAMEBUFFER, ATTACH(gl, i), plane, 0, layer);
    bufs.push(ATTACH(gl, i));
  }
  gl.drawBuffers(bufs);
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    throw new Error(`framebuffer for z=${z} incomplete: 0x${status.toString(16)}`);
  }
  while (gl.getError() !== gl.NO_ERROR) { /* the Firefox note, drained */ }
  return fbo;
}

function make2dFbo(gl, textures) {
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  const bufs = textures.map((t, i) => {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, ATTACH(gl, i), gl.TEXTURE_2D, t, 0);
    return ATTACH(gl, i);
  });
  gl.drawBuffers(bufs);
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    throw new Error(`2D framebuffer incomplete: 0x${status.toString(16)}`);
  }
  while (gl.getError() !== gl.NO_ERROR) { /* ditto */ }
  return fbo;
}

/**
 * A real GPU sync.
 *
 * brainchopC's first printed number measured nothing: 256 draws "completed" in
 * 0.1 ms because WebGL defers and finish() is advisory. A one-pixel readPixels
 * is what forces the round trip.
 */
function hardSync(gl, fbo) {
  gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo);
  const px = new Uint8Array(4);
  gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
}

/**
 * Read a small float patch out of an activation framebuffer and summarise it.
 *
 * This exists because of a real failure: a NaN-producing GELU ran all 13 layers,
 * reported a healthy 8.03 s, and only then yielded an all-zero volume -- because
 * nothing in the layer loop ever looks at a VALUE. checkGl catches errors, not
 * wrong numbers. Sampling 64 texels once, right after the first layer, turns a
 * silent 8-second wrong answer into an immediate named failure.
 *
 * Best-effort: RGBA/FLOAT readback from a float attachment is allowed with
 * EXT_color_buffer_float but the spec leaves some combinations
 * implementation-defined, so a failure here returns null and never breaks a run
 * that is otherwise fine.
 */
function sampleActivation(gl, fbo, w, h) {
  try {
    const n = Math.min(8, w, h);
    const buf = new Float32Array(n * n * 4);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fbo);
    gl.readBuffer(gl.COLOR_ATTACHMENT0);
    while (gl.getError() !== gl.NO_ERROR) { /* drain */ }
    // Sample away from the volume edge, where zero padding legitimately produces
    // zeros and would make an all-zero patch look like a failure.
    const x0 = Math.max(0, Math.floor(w / 2) - n);
    const y0 = Math.max(0, Math.floor(h / 2) - n);
    gl.readPixels(x0, y0, n, n, gl.RGBA, gl.FLOAT, buf);
    if (gl.getError() !== gl.NO_ERROR) return null;
    let nan = 0, inf = 0, nz = 0, min = Infinity, max = -Infinity;
    for (let i = 0; i < buf.length; i++) {
      const v = buf[i];
      if (Number.isNaN(v)) { nan++; continue; }
      if (!Number.isFinite(v)) { inf++; continue; }
      if (v !== 0) nz++;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    return { nan, inf, nonZero: nz, total: buf.length, min, max };
  } catch {
    return null;
  }
}

function checkGl(gl, where) {
  // Context loss is checked SYNCHRONOUSLY via isContextLost(), not via the
  // `webglcontextlost` event, and the distinction is the whole point: this runner
  // never yields, so an event listener cannot fire until the run has already
  // finished and returned. A listener is still registered, but only so the loss
  // gets logged -- isContextLost() is what actually stops the run.
  //
  // Losing the context is the likely failure mode when a large model's activation
  // set does not fit (1.5 GiB at 24 channels, 2.0 at 32), and per the standing
  // rule it must make the run fail rather than return a blank volume.
  if (gl.isContextLost()) {
    throw new Error(`the WebGL context was lost at ${where} (most likely the activation set did not fit)`);
  }
  const e = gl.getError();
  if (e !== gl.NO_ERROR) {
    // Never a blank volume with status 0: a silent wrong answer is the cardinal sin.
    throw new Error(`GL error 0x${e.toString(16)} at ${where}`);
  }
}

// ---------------------------------------------------------------- the runner

/**
 * Run one volume through the model.
 *
 * @param {object}       o
 * @param {object}       o.descriptor  from deriveDescriptor(), plus nx/ny/nz
 * @param {Float32Array} o.packed      from packWeights().data
 * @param {object}       o.offsets     from packWeights().offsets
 * @param {Float32Array} o.input       normalized volume, axis0 slowest (z), length nx*ny*nz
 * @param {function}     [o.onProgress] (fraction, message)
 * @param {boolean}      [o.vox2]      enable 2-voxel blocking if the device allows
 * @param {WebGL2RenderingContext} [o.gl] reuse a context instead of making one
 * @returns {{labels: Uint8Array, ms: number, path: string}}
 */
export function runMeshNetGL(o) {
  const d = o.descriptor;
  const { nx, ny, nz, planes: P, cs: CS } = d;
  const nvox = nx * ny * nz;
  const t0 = (typeof performance !== 'undefined' ? performance : Date).now();

  if (o.input.length !== nvox) {
    throw new Error(`input has ${o.input.length} voxels, descriptor says ${nvox}`);
  }

  let canvas = null, gl = o.gl || null;
  // Declared up front and null until created, so one cleanup path can free
  // everything regardless of where a failure lands.
  const owned = { textures: [], fbos: [], programs: [] };
  const T = (t) => { owned.textures.push(t); return t; };
  const F = (f) => { owned.fbos.push(f); return f; };
  const G = (p) => { owned.programs.push(p); return p; };

  try {
    if (!gl) {
      canvas = new OffscreenCanvas(1, 1);
      gl = canvas.getContext('webgl2', {
        antialias: false, depth: false, stencil: false,
        preserveDrawingBuffer: false, powerPreference: 'high-performance',
      });
      if (!gl) throw new Error('no webgl2 context');
      // Logging only -- see checkGl for why isContextLost() is the mechanism that
      // actually stops a synchronous run.
      canvas.addEventListener?.('webglcontextlost', (ev) => {
        ev.preventDefault?.();
        o.onLog?.('[webgl2] webglcontextlost fired (the run has already been aborted by isContextLost)');
      });
    }
    if (!gl.getExtension('EXT_color_buffer_float')) {
      throw new Error('EXT_color_buffer_float unavailable; float textures are not renderable here');
    }
    const maxDraw = Math.min(gl.getParameter(gl.MAX_DRAW_BUFFERS),
                             gl.getParameter(gl.MAX_COLOR_ATTACHMENTS));
    if (maxDraw < P) throw new Error(`need ${P} draw buffers, device has ${maxDraw}`);
    // VOX=2 needs (a) 2P attachments, (b) an even nz so every slice is covered
    // by a pair, and (c) the gn schedule, which keeps the convolution's target
    // set fixed so one array of 2P-attachment framebuffers suffices.
    const useVox2 = !!o.vox2 && maxDraw >= 2 * P && nz >= 2 && nz % 2 === 0 && d.norm === 'gn';

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.SCISSOR_TEST);
    // No VAO contents needed: the vertex shader synthesises its triangle from
    // gl_VertexID. A VAO must still be bound in a core profile.
    gl.bindVertexArray(gl.createVertexArray());

    // ---- textures -------------------------------------------------------
    const src = T(tex3d(gl, nx, ny, nz, gl.R16F));
    gl.bindTexture(gl.TEXTURE_3D, src);
    gl.texSubImage3D(gl.TEXTURE_3D, 0, 0, 0, 0, nx, ny, nz, gl.RED, gl.FLOAT, o.input);
    checkGl(gl, 'input upload');

    // Two activation sets, ping-ponged. Written as setP / setQ because the
    // schedule below keeps P as "the current activation" throughout, which is
    // the whole invariant: conv P->Q, moments read Q, norm Q->P.
    const setP = [], setQ = [];
    for (let i = 0; i < P; i++) setP.push(T(tex3d(gl, nx, ny, nz, gl.RGBA16F)));
    for (let i = 0; i < P; i++) setQ.push(T(tex3d(gl, nx, ny, nz, gl.RGBA16F)));
    checkGl(gl, 'activation allocation');

    const wQuads = Math.ceil(o.packed.length / 4);
    const wRows = Math.ceil(wQuads / WTEX_W);
    if (wRows > gl.getParameter(gl.MAX_TEXTURE_SIZE)) {
      throw new Error(`weight texture needs ${wRows} rows, MAX_TEXTURE_SIZE is ${gl.getParameter(gl.MAX_TEXTURE_SIZE)}`);
    }
    const wts = T(tex2d(gl, WTEX_W, wRows, gl.RGBA16F));
    const wPad = new Float32Array(WTEX_W * wRows * 4);
    wPad.set(o.packed);
    gl.bindTexture(gl.TEXTURE_2D, wts);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, WTEX_W, wRows, gl.RGBA, gl.FLOAT, wPad);
    checkGl(gl, 'weight upload');

    let momSum = null, momSq = null, redSum = null, redSq = null, mean = null, inv = null;
    let fboMomA = null, fboMomB = null, fboMomF = null;
    if (d.norm === 'gn') {
      momSum = T(tex2d(gl, nx, ny * P, gl.RGBA32F));
      momSq = T(tex2d(gl, nx, ny * P, gl.RGBA32F));
      redSum = T(tex2d(gl, nx, P, gl.RGBA32F));
      redSq = T(tex2d(gl, nx, P, gl.RGBA32F));
      mean = T(tex2d(gl, 1, P, gl.RGBA32F));
      inv = T(tex2d(gl, 1, P, gl.RGBA32F));
      fboMomA = F(make2dFbo(gl, [momSum, momSq]));
      fboMomB = F(make2dFbo(gl, [redSum, redSq]));
      fboMomF = F(make2dFbo(gl, [mean, inv]));
    }

    const labTexels = Math.ceil(nvox / 4);
    const labRows = Math.ceil(labTexels / LAB_W);
    const labels = T(tex2d(gl, LAB_W, labRows, gl.RGBA8));
    const fboLab = F(make2dFbo(gl, [labels]));
    checkGl(gl, 'aux textures');

    // ---- framebuffers ---------------------------------------------------
    // Pre-created so a slice costs bindFramebuffer + uniform1i + drawArrays.
    // brainchopC measured the empty-pass floor at 4.6 ms/layer -- 2.7% of a
    // hidden convolution -- which is what makes the per-slice design viable.
    const fboP = [], fboQ = [], fboQ2 = [];
    for (let z = 0; z < nz; z++) {
      fboP.push(F(makeLayerFbo(gl, setP, z, P)));
      fboQ.push(F(makeLayerFbo(gl, setQ, z, P)));
    }
    if (useVox2) {
      for (let z = 0; z + 1 < nz; z += 2) fboQ2.push(F(makeLayerFbo(gl, setQ, z, 2 * P)));
    }
    checkGl(gl, 'framebuffer creation');

    // ---- programs -------------------------------------------------------
    const S = buildSources(d, maxDraw);
    const progs = {};
    const mk = (key, srcKey, name) => {
      if (!S[srcKey]) return;
      progs[key] = G(link(gl, S.vertex, S[srcKey], name));
    };
    mk('convFirst', 'convFirst', 'conv_first');
    mk('convHidden', 'convHidden', 'conv_hidden');
    if (useVox2) mk('convHidden2', 'convHiddenVox2', 'conv_hidden_vox2');
    if (d.norm === 'gn') {
      mk('momentsA', 'momentsA', 'moments_a');
      mk('momentsB', 'momentsB', 'moments_b');
      mk('momentsF', 'momentsFinish', 'moments_finish');
      mk('norm', 'norm', 'norm');
    }
    if (d.nclass > 0) mk('classify', 'classify', 'classify');
    checkGl(gl, 'program link');

    const U = (p, n) => gl.getUniformLocation(p, n);
    const planeNames = Array.from({ length: P }, (_, i) => `s${i}`);
    gl.useProgram(progs.convFirst);
    gl.uniform1i(U(progs.convFirst, 'src'), 0);
    gl.uniform1i(U(progs.convFirst, 'wts'), 1);
    for (const p of [progs.convHidden, progs.convHidden2].filter(Boolean)) {
      gl.useProgram(p);
      planeNames.forEach((n, i) => gl.uniform1i(U(p, n), i));
      gl.uniform1i(U(p, 'wts'), P);
    }
    if (progs.norm) {
      gl.useProgram(progs.norm);
      planeNames.forEach((n, i) => gl.uniform1i(U(progs.norm, n), i));
      gl.uniform1i(U(progs.norm, 'pMean'), P);
      gl.uniform1i(U(progs.norm, 'pInv'), P + 1);
      gl.uniform1i(U(progs.norm, 'wts'), P + 2);
    }
    if (progs.momentsA) { gl.useProgram(progs.momentsA); gl.uniform1i(U(progs.momentsA, 'src'), 0); }
    if (progs.momentsB) {
      gl.useProgram(progs.momentsB);
      gl.uniform1i(U(progs.momentsB, 'pSum'), 0);
      gl.uniform1i(U(progs.momentsB, 'pSq'), 1);
    }
    if (progs.momentsF) {
      gl.useProgram(progs.momentsF);
      gl.uniform1i(U(progs.momentsF, 'pSum'), 0);
      gl.uniform1i(U(progs.momentsF, 'pSq'), 1);
    }
    if (progs.classify) {
      gl.useProgram(progs.classify);
      planeNames.forEach((n, i) => gl.uniform1i(U(progs.classify, n), i));
      gl.uniform1i(U(progs.classify, 'wts'), P);
    }
    checkGl(gl, 'uniform setup');

    const bind3d = (unit, t) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_3D, t); };
    const bind2d = (unit, t) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t); };
    const draw = () => gl.drawArrays(gl.TRIANGLES, 0, 3);

    // ---- the model ------------------------------------------------------
    let cur = setP, nxt = setQ, curFbo = fboP, nxtFbo = fboQ;
    const L = o.offsets.layers;
    const nlayer = d.dilations.length;
    const report = (i) => o.onProgress?.((i + 1) / (nlayer + 1), `Layer ${i + 1}/${nlayer}`);

    // Layer 0: one input channel, out of the R16F source volume.
    {
      const p = progs.convFirst;
      gl.useProgram(p);
      gl.viewport(0, 0, nx, ny);
      bind3d(0, src);
      bind2d(1, wts);
      gl.uniform1i(U(p, 'uDil'), d.dilations[0]);
      gl.uniform1i(U(p, 'uWQ0'), L[0].wq);
      if (L[0].biasQ !== undefined) gl.uniform1i(U(p, 'uBiasQ'), L[0].biasQ);
      const uZ = U(p, 'uZ');
      for (let z = 0; z < nz; z++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, nxtFbo[z]);
        gl.uniform1i(uZ, z);
        draw();
      }
      checkGl(gl, 'conv_first');
    }

    const normalizeInto = (fromList, toFbo, li) => {
      // moments over `fromList`, then norm from it into the other set.
      // Pass A: one fragment per (x,y) column, per plane, viewport shifted to
      // that plane's rows. Reads the activation exactly once.
      gl.useProgram(progs.momentsA);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboMomA);
      const uRow = U(progs.momentsA, 'uRowBase');
      for (let g = 0; g < P; g++) {
        bind3d(0, fromList[g]);
        gl.uniform1i(uRow, g * ny);
        gl.viewport(0, g * ny, nx, ny);
        draw();
      }
      gl.useProgram(progs.momentsB);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboMomB);
      bind2d(0, momSum); bind2d(1, momSq);
      gl.viewport(0, 0, nx, P);
      draw();

      gl.useProgram(progs.momentsF);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboMomF);
      bind2d(0, redSum); bind2d(1, redSq);
      gl.viewport(0, 0, 1, P);
      draw();

      // norm: no readback anywhere -- `norm` samples the 1xP moments texture
      // directly. A CPU-side finish would put one synchronous readPixels stall
      // per layer in the middle of the pipeline.
      const p = progs.norm;
      gl.useProgram(p);
      for (let g = 0; g < P; g++) bind3d(g, fromList[g]);
      bind2d(P, mean); bind2d(P + 1, inv); bind2d(P + 2, wts);
      if (d.affine) {
        gl.uniform1i(U(p, 'uAffQ'), L[li].affQ);
        gl.uniform1i(U(p, 'uBiasQ'), L[li].affBiasQ);
      }
      gl.viewport(0, 0, nx, ny);
      const uZ = U(p, 'uZ');
      for (let z = 0; z < nz; z++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, toFbo[z]);
        gl.uniform1i(uZ, z);
        draw();
      }
      checkGl(gl, `norm layer ${li}`);
    };

    if (d.norm === 'gn') {
      normalizeInto(nxt, curFbo, 0);             // Q -> P, so P stays "current"
    } else {
      // Family A has no norm pass, so nothing swaps the sets back: the roles
      // alternate instead.
      [cur, nxt] = [nxt, cur]; [curFbo, nxtFbo] = [nxtFbo, curFbo];
    }
    report(0);

    // Fail fast on a numerically dead first layer rather than 8 seconds later.
    // A NaN here reaches the classifier as `acc > bestv` false for every class,
    // which silently leaves label 0 at every voxel -- indistinguishable from a
    // successful run until the very end.
    const stats0 = sampleActivation(gl, curFbo[nz >> 1], nx, ny);
    if (stats0) {
      const s = `min=${stats0.min.toPrecision(4)} max=${stats0.max.toPrecision(4)} ` +
        `nonzero=${stats0.nonZero}/${stats0.total} nan=${stats0.nan} inf=${stats0.inf}`;
      if (stats0.nan || stats0.inf) {
        throw new Error(
          `layer 1 activations are not finite (${s}). The usual cause is the ` +
          `activation flavour: an unclamped tanh overflows to Inf/Inf = NaN. ` +
          `Check descriptor.activation ('${d.activation}').`
        );
      }
      if (stats0.nonZero === 0) {
        throw new Error(
          `layer 1 activations are all zero at the volume centre (${s}). ` +
          `Suspect the input upload, the weight packing, or a wrong dilation.`
        );
      }
      o.onLog?.(`[webgl2] layer 1 sample: ${s}`);
    }

    for (let li = 1; li < nlayer; li++) {
      const vox2 = useVox2 && !!progs.convHidden2;
      const p = vox2 ? progs.convHidden2 : progs.convHidden;
      gl.useProgram(p);
      gl.viewport(0, 0, nx, ny);
      for (let g = 0; g < P; g++) bind3d(g, cur[g]);
      bind2d(P, wts);
      gl.uniform1i(U(p, 'uDil'), d.dilations[li]);
      gl.uniform1i(U(p, 'uWQ0'), L[li].wq);
      if (L[li].biasQ !== undefined) gl.uniform1i(U(p, 'uBiasQ'), L[li].biasQ);
      const uZ = U(p, 'uZ');
      if (vox2) {
        // Each draw writes layers z and z+1 through 2P attachments, so the 27*CS
        // weight quads are fetched once and consumed by two voxels. Safe to use
        // fboQ2 unconditionally: useVox2 implies the gn schedule, under which
        // the convolution's target is always setQ.
        for (let k = 0; k < fboQ2.length; k++) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, fboQ2[k]);
          gl.uniform1i(uZ, k * 2);
          draw();
        }
      } else {
        for (let z = 0; z < nz; z++) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, nxtFbo[z]);
          gl.uniform1i(uZ, z);
          draw();
        }
      }
      checkGl(gl, `conv layer ${li}`);

      if (d.norm === 'gn') {
        normalizeInto(nxt, curFbo, li);
      } else {
        [cur, nxt] = [nxt, cur]; [curFbo, nxtFbo] = [nxtFbo, curFbo];
      }

      // Bound the command queue without ever reading back an activation.
      if (li % 8 === 0) hardSync(gl, fboLab);
      report(li);
    }

    // ---- classifier + argmax, on the GPU --------------------------------
    let out;
    if (d.nclass > 0) {
      const p = progs.classify;
      gl.useProgram(p);
      for (let g = 0; g < P; g++) bind3d(g, cur[g]);
      bind2d(P, wts);
      gl.uniform1i(U(p, 'uWCls'), o.offsets.clsFloat);
      gl.uniform1i(U(p, 'uWBias'), Math.max(o.offsets.clsBiasFloat, 0));
      gl.uniform1i(U(p, 'uHasBias'), o.offsets.clsBiasFloat >= 0 ? 1 : 0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboLab);
      gl.viewport(0, 0, LAB_W, labRows);
      draw();
      checkGl(gl, 'classify');

      // The only transfer off the device: one byte per voxel, because each RGBA8
      // texel packs four consecutive x voxels.
      const raw = new Uint8Array(LAB_W * labRows * 4);
      gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fboLab);
      gl.readPixels(0, 0, LAB_W, labRows, gl.RGBA, gl.UNSIGNED_BYTE, raw);
      checkGl(gl, 'readback');
      out = raw.subarray(0, nvox);
    } else {
      throw new Error('descriptor has no classifier; a raw-activation readback path is not implemented');
    }

    const ms = (typeof performance !== 'undefined' ? performance : Date).now() - t0;
    return {
      labels: out,
      ms,
      path: `webgl2-native P=${P}${useVox2 ? ' vox2' : ''} ${nx}x${ny}x${nz}`,
    };
  } finally {
    // One exit. brainchopC's repeat test gates WebGL2 harder than WebGPU
    // precisely here: leaking a single activation set fails the third run, and
    // brainchop-test needs the tfjs fallback to still have a GPU to run on.
    if (gl) {
      for (const f of owned.fbos) gl.deleteFramebuffer(f);
      for (const t of owned.textures) gl.deleteTexture(t);
      for (const p of owned.programs) gl.deleteProgram(p);
      if (canvas) {
        // Firefox logs this as "WebGL context was lost." at whatever line calls
        // loseContext, which reads alarmingly like a crash in a console dump. It
        // is deliberate teardown of a context we created and it fires on the
        // SUCCESS path too, so say so before triggering it.
        o.onLog?.('[webgl2] releasing our own GL context (the "context was lost" notice below is expected)');
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    }
  }
}
