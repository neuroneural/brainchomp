// tests/webgl2_gate_page.js
// The in-browser half of tests/webgl2_gate.mjs. Kept as a module the page
// imports (rather than an inline script) so it can import the runner exactly the
// way the worker does, with no bundler in the way.

import { buildSources, VERTEX_SRC } from '/webgl2_runners/kernels.js';
import { packWeights, deriveDescriptor } from '/webgl2_runners/weights.js';
import { runMeshNetGL, probeWebgl2 } from '/webgl2_runners/meshnet_gl.js';
import { referenceForward, compareLabels, syntheticModel } from '/webgl2_runners/reference.js';

/**
 * The real shapes, read off public/models/<name>/model.json and
 * model.safetensors rather than assumed. If a model is retrained with a
 * different channel count this table is what should fail first.
 *
 * Families, which is the thing the table is really encoding:
 *   A  plain MeshNet   Conv3D(bias) -> relu/elu, no norm anywhere
 *   B  gn, no affine   conv_gn(no bias) -> gelu
 *   C  gn + affine     conv_gn -> affine 1x1 -> gelu
 */
const SHIPPED = [
  { name: 'rodent', chan: 16, nclass: 2, nconv: 25, norm: 'gn', affine: false, convBias: false, act: 'gelu_tanh' },
];

const NUMERICS = [
  { label: 'family C (gn + affine, gelu)', chan: 8, nclass: 4, nlayers: 4,
    dil: [1, 2, 3, 1], gn: true, affine: true, convBias: false, act: 'gelu_tanh', n: 20 },
  { label: 'family B (gn, no affine, gelu)', chan: 4, nclass: 2, nlayers: 3,
    dil: [1, 2, 1], gn: true, affine: false, convBias: false, act: 'gelu_tanh', n: 20 },
  { label: 'family A (bias + relu, no norm)', chan: 4, nclass: 3, nlayers: 3,
    dil: [1, 2, 1], gn: false, affine: false, convBias: true, act: 'relu', n: 20 },
  { label: 'family A (bias + elu, no norm)', chan: 8, nclass: 3, nlayers: 2,
    dil: [1, 3], gn: false, affine: false, convBias: true, act: 'elu', n: 18 },
  // Dilation far larger than the volume, so nearly every tap of every fragment
  // lands outside and must be masked to zero. Padding is the one thing a
  // small-dilation test cannot exercise.
  { label: 'padding: dilation 11 on 16^3', chan: 4, nclass: 2, nlayers: 2,
    dil: [11, 1], gn: true, affine: true, convBias: false, act: 'gelu_tanh', n: 16 },
];

function noise(n, lo, span, seed) {
  let s = seed >>> 0;
  const a = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    a[i] = (s / 4294967296) * span + lo;
  }
  return a;
}

function linkAll(gl, sources) {
  const errs = [];
  for (const [key, src] of Object.entries(sources)) {
    if (!src || key === 'vertex') continue;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, VERTEX_SRC); gl.compileShader(vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, src); gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      errs.push(`${key} compile: ${gl.getShaderInfoLog(fs).trim().split('\n')[0]}`);
      gl.deleteShader(vs); gl.deleteShader(fs);
      continue;
    }
    const p = gl.createProgram();
    gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      errs.push(`${key} link: ${gl.getProgramInfoLog(p).trim().split('\n')[0]}`);
    }
    gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteProgram(p);
  }
  return errs;
}

export async function runGate() {
  const checks = [];
  const add = (name, ok, detail, skip = false) => checks.push({ name, ok: !!ok, detail, skip });

  const gl = new OffscreenCanvas(1, 1).getContext('webgl2',
    { antialias: false, depth: false, stencil: false });
  if (!gl) { add('webgl2 context', false, 'none available'); return { checks }; }

  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
  const maxDraw = Math.min(gl.getParameter(gl.MAX_DRAW_BUFFERS), gl.getParameter(gl.MAX_COLOR_ATTACHMENTS));
  const cbf = !!gl.getExtension('EXT_color_buffer_float');
  add('webgl2 context + capabilities', cbf,
    `${renderer} | draw buffers ${maxDraw} | 3D<=${gl.getParameter(gl.MAX_3D_TEXTURE_SIZE)} | EXT_color_buffer_float=${cbf}`);
  if (!cbf) return { checks };

  // ---- gate 1: link at real shapes ---------------------------------------
  for (const s of SHIPPED) {
    const cs = Math.ceil(s.chan / 4) * 4;
    const d = {
      nx: 256, ny: 256, nz: 256, chan: s.chan, cs, planes: cs / 4, nclass: s.nclass,
      norm: s.norm, affine: s.affine, convBias: s.convBias, activation: s.act, eps: 1e-5,
      dilations: Array.from({ length: s.nconv }, (_, i) => [1, 3, 5, 7, 13, 19, 31][i % 7]),
    };
    const label = `link ${s.name} (${s.chan}ch P=${d.planes} ${s.nclass}cls ${s.norm})`;
    if (d.planes > maxDraw) {
      add(label, true, `needs ${d.planes} draw buffers, device has ${maxDraw} -> tfjs fallback`, true);
      continue;
    }
    let errs, nprog = 0;
    try {
      const sources = buildSources(d, maxDraw);
      nprog = Object.keys(sources).filter((k) => k !== 'vertex').length;
      errs = linkAll(gl, sources);
    } catch (e) { errs = [`buildSources threw: ${e.message}`]; }
    add(label, errs.length === 0, errs.length ? errs.join(' | ') : `${nprog} programs link`);
  }

  // ---- gate 2: numerics vs the CPU reference -----------------------------
  for (const c of NUMERICS) {
    try {
      const { desc } = syntheticModel({
        chan: c.chan, nclass: c.nclass, nlayers: c.nlayers, dilations: c.dil,
        convBias: c.convBias, gn: c.gn, affine: c.affine, seed: 12345,
      });
      const d = deriveDescriptor(desc, {
        nx: c.n, ny: c.n, nz: c.n, activation: c.act,
        dilations: c.dil, norm: c.gn ? 'gn' : 'none',
      });
      if (d.planes > maxDraw) {
        add(`numerics ${c.label}`, true, `needs ${d.planes} draw buffers`, true);
        continue;
      }
      const nvox = c.n * c.n * c.n;
      const input = noise(nvox, 0.05, 1.5, 999);          // never zero
      const packed = packWeights(desc, d);
      const args = { descriptor: d, packed: packed.data, offsets: packed.offsets, input, vox2: false };

      const gpu = runMeshNetGL(args);
      const ref = referenceForward(d, desc, input);
      const cmp = compareLabels(ref.labels, gpu.labels);

      // fp16 activation storage lets a handful of near-tied voxels flip. A
      // STRUCTURAL error -- tap order, weight index, MRT channel mapping,
      // moments shape -- moves values by order 1, so it fails this by orders of
      // magnitude rather than by a few voxels. That asymmetry is what makes a
      // budget legitimate here instead of a fudge.
      const budget = Math.max(4, Math.ceil(nvox * 0.002));
      add(`numerics ${c.label}`, cmp.diff <= budget,
        `${cmp.diff}/${cmp.total} differ (${cmp.pct.toFixed(3)}%, budget ${budget}) | ${gpu.path}`);

      // A second run must be identical: catches a leak, or state left bound.
      const again = compareLabels(gpu.labels, runMeshNetGL(args).labels);
      add(`repeat ${c.label}`, again.diff === 0, `second run identical (${again.diff} differ)`);
    } catch (e) {
      add(`numerics ${c.label}`, false, `threw: ${e.message}`);
    }
  }

  // ---- VOX=2 must not move a single voxel --------------------------------
  try {
    const dil = [1, 2, 3, 1];
    const { desc } = syntheticModel({
      chan: 8, nclass: 4, nlayers: 4, dilations: dil,
      convBias: false, gn: true, affine: true, seed: 777,
    });
    const d = deriveDescriptor(desc, {
      nx: 20, ny: 20, nz: 20, activation: 'gelu_tanh', dilations: dil, norm: 'gn',
    });
    if (2 * d.planes > maxDraw) {
      add('vox2 moves no voxel', true, `needs ${2 * d.planes} draw buffers, device has ${maxDraw}`, true);
    } else {
      const input = noise(8000, 0.05, 1.5, 4242);
      const packed = packWeights(desc, d);
      const base = { descriptor: d, packed: packed.data, offsets: packed.offsets, input };
      const a = runMeshNetGL({ ...base, vox2: false });
      const b = runMeshNetGL({ ...base, vox2: true });
      const cmp = compareLabels(a.labels, b.labels);
      // Expected rather than lucky: VOX=2 changes only WHICH fragment computes a
      // voxel, never the order that voxel's own products are summed. brainchopC
      // relies on the same property to demand bit-identical output from all 18
      // of its CUDA launch shapes.
      add('vox2 moves no voxel', cmp.diff === 0, `${cmp.diff} differ | ${b.path}`);
    }
  } catch (e) {
    add('vox2 moves no voxel', false, `threw: ${e.message}`);
  }

  // ---- the probe must report, never throw --------------------------------
  try {
    const d = {
      nx: 256, ny: 256, nz: 256, chan: 16, cs: 16, planes: 4, nclass: 18,
      norm: 'gn', affine: true, convBias: false, activation: 'gelu_tanh',
      eps: 1e-5, dilations: new Array(13).fill(1),
    };
    const p = probeWebgl2(d, [256, 256, 256]);
    add('probe returns a verdict with reasons', typeof p.supported === 'boolean',
      `supported=${p.supported} vox2=${p.vox2} ${Math.round(p.activationBytes / 1048576)} MB` +
      (p.reasons.length ? ' | ' + p.reasons.join('; ') : ''));
  } catch (e) {
    add('probe returns a verdict with reasons', false, `threw: ${e.message}`);
  }

  return { checks };
}
