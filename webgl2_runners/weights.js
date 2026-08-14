// webgl2_runners/weights.js
// ---------------------------------------------------------------------------
// Safetensors loading and weight packing for the native WebGL2 runner.
//
// The weight SOURCE is `model.safetensors`, the same file the WebGPU runners
// use, chosen so that a run's labels can be diffed directly against the WebGPU
// runner as the acceptance test. That also means this path inherits the WebGPU
// tap/orientation convention, NOT the tfjs one -- so the caller must use
// `modelEntry.enableTranspose`, never `webglEnableTranspose` (see memory
// `webgl-tissue-gwm-orientation`: id 7's tfjs export wants the opposite
// transpose from its safetensors export, and mixing them yields noise).
//
// Safetensors kernels are PyTorch order [outC, inC, kD, kH, kW]. The runner
// uploads the volume with axis 0 -> texture z, axis 1 -> y, axis 2 -> x (that is
// what texImage3D does with a row-major array), so kD maps to the shader's dz,
// kH to dy and kW to dx with no permutation. That claim is not taken on trust:
// checkLayer0() in reference.js recomputes a slice on the CPU and compares, and
// a wrong tap permutation (a base-3 digit swap) is exactly the error it catches.
// It has to be checked rather than reasoned about, because getting it wrong
// yields a plausible-looking volume, not an error.
// ---------------------------------------------------------------------------

/** f16 bits -> f32. Handles subnormals, Inf and NaN. */
function f16ToF32(h) {
  const s = (h & 0x8000) ? -1 : 1;
  const e = (h & 0x7c00) >> 10;
  const f = h & 0x03ff;
  if (e === 0) return s * Math.pow(2, -14) * (f / 1024);
  if (e === 0x1f) return f ? NaN : s * Infinity;
  return s * Math.pow(2, e - 15) * (1 + f / 1024);
}

/**
 * Parse a safetensors buffer into { name: {dtype, shape, data: Float32Array} }.
 * F16, F32 and BF16 are accepted; anything else throws by name rather than
 * silently producing zeros.
 */
export function parseSafetensors(buffer) {
  const dv = new DataView(buffer);
  const headerLen = Number(dv.getBigUint64(0, true));
  const header = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 8, headerLen)));
  const base = 8 + headerLen;
  const out = {};
  for (const [name, info] of Object.entries(header)) {
    if (name === '__metadata__') { out.__metadata__ = info; continue; }
    const [start, end] = info.data_offsets;
    const n = info.shape.reduce((a, b) => a * b, 1);
    let data;
    if (info.dtype === 'F32') {
      // .slice() rather than a view: the offset is not guaranteed 4-byte aligned.
      data = new Float32Array(buffer.slice(base + start, base + end));
    } else if (info.dtype === 'F16') {
      const u16 = new Uint16Array(buffer.slice(base + start, base + end));
      data = new Float32Array(n);
      for (let i = 0; i < n; i++) data[i] = f16ToF32(u16[i]);
    } else if (info.dtype === 'BF16') {
      const u16 = new Uint16Array(buffer.slice(base + start, base + end));
      data = new Float32Array(n);
      const u32 = new Uint32Array(1);
      const f32 = new Float32Array(u32.buffer);
      for (let i = 0; i < n; i++) { u32[0] = u16[i] << 16; data[i] = f32[0]; }
    } else {
      throw new Error(`safetensors: unsupported dtype ${info.dtype} for tensor '${name}'`);
    }
    if (data.length !== n) {
      throw new Error(`safetensors: tensor '${name}' has ${data.length} values, shape says ${n}`);
    }
    out[name] = { dtype: info.dtype, shape: info.shape, data };
  }
  return out;
}

/**
 * Read the layer sequence out of a safetensors file.
 *
 * The exports are tinygrad `nn.Sequential`-style, so names are `m.model.<i>.*`
 * with `<i>` the position in the sequence: a 3x3x3 conv, then (family C) a 1x1
 * affine conv, then the activation slot. Rather than hardcode the stride between
 * layers -- which differs per family (2 for plain MeshNet, 3 for GN+affine, 3 for
 * GN-only mindgrab) -- this reads the actual conv shapes and sorts by index, so a
 * new model works without edits.
 *
 * Returns { convs: [{w, bias|null}], affines: [{scale, bias}], classifier }.
 */
export function describeSafetensors(t) {
  const convs = [];
  const affines = [];
  const scalars = [];
  for (const [name, v] of Object.entries(t)) {
    if (name === '__metadata__') continue;
    const m = name.match(/^m\.model\.(\d+)\.(weight|bias)$/);
    if (!m) continue;                      // skips m.seq_conv_argmax.* (a duplicate head)
    const idx = Number(m[1]);
    const isW = m[2] === 'weight';
    if (v.shape.length === 5) {
      const [outC, inC, kd, kh, kw] = v.shape;
      const is1x1 = kd === 1 && kh === 1 && kw === 1;
      const entry = { idx, outC, inC, kd, kh, kw, is1x1, w: v.data, bias: null };
      const slot = convs.find((c) => c.idx === idx);
      if (slot) Object.assign(slot, entry); else convs.push(entry);
    } else if (v.shape.length === 1) {
      scalars.push({ idx, isW, data: v.data, len: v.shape[0] });
    }
  }
  convs.sort((a, b) => a.idx - b.idx);

  // Attach 1-D tensors: a bias whose index matches a conv is that conv's bias;
  // a weight/bias PAIR at an index with no conv is a GroupNorm affine.
  for (const s of scalars) {
    const conv = convs.find((c) => c.idx === s.idx);
    if (conv && !s.isW) { conv.bias = s.data; continue; }
    if (conv && s.isW) continue;           // per-conv weight vector: not a shape we emit
    let aff = affines.find((a) => a.idx === s.idx);
    if (!aff) { aff = { idx: s.idx, scale: null, bias: null }; affines.push(aff); }
    if (s.isW) aff.scale = s.data; else aff.bias = s.data;
  }
  affines.sort((a, b) => a.idx - b.idx);

  // The last 1x1 conv is the classifier; everything before it is the backbone.
  let classifier = null;
  if (convs.length && convs[convs.length - 1].is1x1) classifier = convs.pop();

  // Family C stores the affine as a real 1x1 Conv3D in the tfjs export but as a
  // (weight, bias) vector pair in safetensors, so `affines` carries it there.
  // Family A / B leave it empty.
  return { convs, affines, classifier };
}

/**
 * Pack every layer's weights into one Float32Array laid out for the RGBA16F
 * weight texture, in brainchopC's order:
 *
 *     float index = ((tap * inCS) + ic) * CS + oc
 *
 * i.e. VECTORISED OVER THE OUTPUT CHANNEL, which is what makes `oc` the RGBA
 * axis and a weight fetch a single vec4 load. brainchopC measures that choice as
 * worth ~2x on its WebGPU path and it is the reason the shader's inner statement
 * is `a0 += wf(w) * v` rather than four scalar multiplies.
 *
 * Pad lanes (oc or ic >= CHAN) are ZERO-FILLED, not left undefined. The shader
 * processes all CS channels and relies on a padded channel staying identically
 * zero through every layer -- zero mean, zero variance, normalises to 0, and
 * every activation maps 0 to 0. A stray value in a pad lane would leak into real
 * channels at the next layer with nothing to flag it.
 *
 * Returns { data, offsets } where offsets carry QUAD indices for wf() consumers
 * (uWQ0, uAffQ, uBiasQ) and FLOAT indices for ws() consumers (uWCls, uWBias).
 */
export function packWeights(desc, d) {
  const CS = d.cs;
  const CHAN = d.chan;
  const { convs, affines, classifier } = desc;

  // --- sizes -------------------------------------------------------------
  const convFloats = (inCS) => 27 * inCS * CS;
  let total = 0;
  const layers = [];
  convs.forEach((c, li) => {
    const inCS = li === 0 ? 1 : CS;
    const rec = { wq: total / 4, inCS };
    total += convFloats(inCS);
    if (c.bias) { rec.biasQ = total / 4; total += CS; }
    layers.push(rec);
  });
  affines.forEach((a, ai) => {
    layers[ai] = layers[ai] || {};
    layers[ai].affQ = total / 4; total += CS;
    layers[ai].affBiasQ = total / 4; total += CS;
  });
  let clsOff = -1, clsBiasOff = -1;
  if (classifier) {
    clsOff = total; total += CHAN * d.nclass;
    total = Math.ceil(total / 4) * 4;
    if (classifier.bias) { clsBiasOff = total; total += d.nclass; }
    total = Math.ceil(total / 4) * 4;
  }

  const data = new Float32Array(total);   // zero-filled: the pad-lane invariant

  // --- the 3x3x3 and 1x1 backbone convs ----------------------------------
  convs.forEach((c, li) => {
    const rec = layers[li];
    const inCS = rec.inCS;
    const base = rec.wq * 4;
    const K = c.kd * c.kh * c.kw;         // 27 for a 3x3x3, 1 for a 1x1
    if (c.outC > CHAN || (li > 0 && c.inC > CHAN)) {
      throw new Error(`layer ${li}: shape ${c.outC}x${c.inC} exceeds CHAN ${CHAN}`);
    }
    for (let oc = 0; oc < c.outC; oc++) {
      for (let ic = 0; ic < c.inC; ic++) {
        for (let kd = 0; kd < c.kd; kd++) {
          for (let kh = 0; kh < c.kh; kh++) {
            for (let kw = 0; kw < c.kw; kw++) {
              // tap = (dz+1)*9 + (dy+1)*3 + (dx+1), with kd->dz, kh->dy, kw->dx
              const tap = c.kd === 3 ? kd * 9 + kh * 3 + kw : 0;
              const src = (((oc * c.inC + ic) * c.kd + kd) * c.kh + kh) * c.kw + kw;
              data[base + (tap * inCS + ic) * CS + oc] = c.w[src];
            }
          }
        }
      }
      if (c.bias) data[rec.biasQ * 4 + oc] = c.bias[oc];
    }
    if (K !== 27 && K !== 1) throw new Error(`layer ${li}: kernel ${c.kd}x${c.kh}x${c.kw} unsupported`);
  });

  // --- GroupNorm affine (family C) ---------------------------------------
  affines.forEach((a, ai) => {
    const rec = layers[ai];
    for (let oc = 0; oc < CHAN; oc++) {
      // Pad lanes get scale 0 / bias 0 so they stay zero, NOT scale 1.
      data[rec.affQ * 4 + oc] = a.scale ? a.scale[oc] : 0;
      data[rec.affBiasQ * 4 + oc] = a.bias ? a.bias[oc] : 0;
    }
  });

  // --- classifier: float layout c * NCLASS + k ---------------------------
  if (classifier) {
    for (let k = 0; k < d.nclass; k++) {
      for (let c = 0; c < CHAN; c++) {
        data[clsOff + c * d.nclass + k] = classifier.w[k * classifier.inC + c];
      }
      if (classifier.bias) data[clsBiasOff + k] = classifier.bias[k];
    }
  }

  return {
    data,
    offsets: {
      layers,                    // [{wq, inCS, biasQ?, affQ?, affBiasQ?}] quad indices
      clsFloat: clsOff,          // FLOAT index (ws consumer)
      clsBiasFloat: clsBiasOff,  // FLOAT index, -1 when the head has no bias
    },
  };
}

/**
 * Derive a runner descriptor from a safetensors file, so a model does not need a
 * hand-written entry unless it disagrees with what the weights say.
 *
 * What CANNOT be derived and must be supplied: the dilation schedule (it is in
 * the tfjs model.json, not in the weights) and the activation flavour (every
 * export declares "gelu" while the family-A models compute relu/elu, and
 * brainchopC records two mutually-incompatible functions both spelled "gelu").
 */
export function deriveDescriptor(desc, override = {}) {
  const { convs, affines, classifier } = desc;
  const chan = convs[0].outC;
  const cs = Math.ceil(chan / 4) * 4;
  const hasBias = convs.some((c) => c.bias);
  const d = {
    chan,
    cs,
    planes: cs / 4,
    nclass: classifier ? classifier.outC : 0,
    nhidden: convs.length - 1,
    norm: affines.length ? 'gn' : (hasBias ? 'none' : 'gn'),
    affine: affines.length > 0,
    convBias: hasBias,
    classifierBias: !!(classifier && classifier.bias),
    centeredVariance: false,
    eps: 1e-5,
    ...override,
  };
  if (d.nclass > 256) {
    throw new Error(`classifier has ${d.nclass} classes; the RGBA8 label texture holds at most 256`);
  }
  if (!d.activation) throw new Error('descriptor needs an explicit `activation`');
  if (!d.dilations) throw new Error('descriptor needs an explicit `dilations` array');
  if (d.dilations.length !== convs.length) {
    throw new Error(`descriptor has ${d.dilations.length} dilations for ${convs.length} convs`);
  }
  return d;
}
