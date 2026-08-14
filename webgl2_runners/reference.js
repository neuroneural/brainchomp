// webgl2_runners/reference.js
// ---------------------------------------------------------------------------
// A scalar CPU forward pass, used only as a test oracle.
//
// This deliberately reads the ORIGINAL tensors (the `desc` from
// describeSafetensors) and NOT the packed weight array. If it read the packed
// array with the same index formula the runner uses, an error in that formula
// would cancel out and the test would pass while the GPU produced a
// plausible-looking wrong volume -- which is the exact failure mode brainchopC
// warns about for tap order, packed weight indexing and MRT channel mapping. So
// packWeights() is under test here, not assumed.
//
// It is slow on purpose: straight loops, no blocking, nothing clever. Use it on
// small synthetic volumes.
// ---------------------------------------------------------------------------

function activation(kind) {
  switch (kind) {
    case 'gelu_tanh':
      return (x) => 0.5 * x * (1 + Math.tanh(0.7978845608028654 * (x + 0.044715 * x * x * x)));
    case 'gelu_tanh_approx':
      return (x) => {
        const u = 0.797884583 * (x + 0.044715 * x * x * x);
        const t = Math.max(-9, Math.min(9, u));
        const uu = t * t;
        let p = -8.29118133e-14;
        p = p * uu + 5.19263868e-11;
        p = p * uu - 2.00294448e-8;
        p = p * uu + 1.11017944e-5;
        p = p * uu + 0.00309865153;
        p = p * uu + 0.130791619;
        p = p * uu + 0.99999994;
        let q = 0.000253859733;
        q = q * uu + 0.024473751;
        q = q * uu + 0.464124829;
        q = q * uu + 1.0;
        return 0.5 * x * (1 + (t * p) / q);
      };
    case 'gelu_exp2_approx':
      return (x) => {
        const u = x + 0.044715 * x * x * x;
        return x / (1 + Math.pow(2, -2.302208198144325 * u));
      };
    case 'relu': return (x) => Math.max(x, 0);
    case 'elu': return (x) => (x > 0 ? x : Math.exp(x) - 1);
    default: throw new Error(`reference: unknown activation '${kind}'`);
  }
}

/**
 * Forward pass. `input` is length nx*ny*nz with x fastest (axis 0 of the source
 * tensor is z), matching what the runner uploads.
 *
 * Returns { labels: Uint8Array, activations: Float32Array[] } where
 * activations[i] is the post-activation output of layer i, channel-major
 * ([c][voxel]) so a test can compare one channel of one layer.
 */
export function referenceForward(d, desc, input) {
  const { nx, ny, nz } = d;
  const nvox = nx * ny * nz;
  const act = activation(d.activation);
  const { convs, affines, classifier } = desc;

  const at = (buf, c, x, y, z) => buf[c][(z * ny + y) * nx + x];
  let cur = [input];                          // one input channel

  const layerOut = [];
  for (let li = 0; li < convs.length; li++) {
    const c = convs[li];
    const dil = d.dilations[li];
    const out = Array.from({ length: c.outC }, () => new Float32Array(nvox));

    for (let oc = 0; oc < c.outC; oc++) {
      const ob = out[oc];
      for (let z = 0; z < nz; z++) {
        for (let y = 0; y < ny; y++) {
          for (let x = 0; x < nx; x++) {
            let acc = 0;
            for (let kd = 0; kd < c.kd; kd++) {
              const sz = z + (c.kd === 3 ? (kd - 1) * dil : 0);
              if (sz < 0 || sz >= nz) continue;
              for (let kh = 0; kh < c.kh; kh++) {
                const sy = y + (c.kh === 3 ? (kh - 1) * dil : 0);
                if (sy < 0 || sy >= ny) continue;
                for (let kw = 0; kw < c.kw; kw++) {
                  const sx = x + (c.kw === 3 ? (kw - 1) * dil : 0);
                  if (sx < 0 || sx >= nx) continue;
                  for (let ic = 0; ic < c.inC; ic++) {
                    const w = c.w[(((oc * c.inC + ic) * c.kd + kd) * c.kh + kh) * c.kw + kw];
                    acc += w * at(cur, ic, sx, sy, sz);
                  }
                }
              }
            }
            if (c.bias) acc += c.bias[oc];
            ob[(z * ny + y) * nx + x] = acc;
          }
        }
      }
    }

    if (d.norm === 'gn') {
      // Per-channel instance norm over the whole volume, variance as
      // E[x^2] - E[x]^2 to match the shader (and the CPU/CUDA/Metal reference).
      const aff = affines[li];
      for (let oc = 0; oc < c.outC; oc++) {
        const ob = out[oc];
        let s = 0, q = 0;
        for (let i = 0; i < nvox; i++) { s += ob[i]; q += ob[i] * ob[i]; }
        const mean = s / nvox;
        const varr = Math.max(q / nvox - mean * mean, 0);
        const invs = 1 / Math.sqrt(varr + d.eps);
        const g = aff && aff.scale ? aff.scale[oc] : 1;
        const b = aff && aff.bias ? aff.bias[oc] : 0;
        for (let i = 0; i < nvox; i++) ob[i] = act((ob[i] - mean) * invs * g + b);
      }
    } else {
      for (let oc = 0; oc < c.outC; oc++) {
        const ob = out[oc];
        for (let i = 0; i < nvox; i++) ob[i] = act(ob[i]);
      }
    }

    layerOut.push(out);
    cur = out;
  }

  let labels = null;
  if (classifier) {
    labels = new Uint8Array(nvox);
    for (let i = 0; i < nvox; i++) {
      let best = 0, bestv = -Infinity;
      for (let k = 0; k < classifier.outC; k++) {
        let acc = classifier.bias ? classifier.bias[k] : 0;
        for (let ch = 0; ch < classifier.inC; ch++) {
          acc += cur[ch][i] * classifier.w[k * classifier.inC + ch];
        }
        if (acc > bestv) { bestv = acc; best = k; }   // strict >: ties keep the lower index
      }
      labels[i] = best;
    }
  }
  return { labels, activations: layerOut };
}

/**
 * Compare two label volumes. Returns counts rather than a boolean, because the
 * useful question is never "identical?" but "how many voxels, and are they on
 * class boundaries?"
 */
export function compareLabels(a, b) {
  let diff = 0;
  const examples = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      diff++;
      if (examples.length < 8) examples.push({ i, a: a[i], b: b[i] });
    }
  }
  return { diff, total: a.length, pct: (100 * diff) / a.length, examples };
}

/**
 * A synthetic model, for testing the plumbing without needing real weights.
 *
 * Random weights are the point, not a shortcut: brainchopC's layer-0 gate uses
 * random input specifically so no value can be zero, after discovering that a
 * comparison against an all-zero reference reported "100% exact" and proved
 * nothing. Anything that indexes a weight or a tap wrongly here moves values by
 * order 1.
 */
export function syntheticModel({ chan, nclass, nlayers, dilations, convBias, gn, affine, seed = 1 }) {
  let s = seed >>> 0;
  const rnd = () => {
    // xorshift32: deterministic across runs and platforms, which matters for a
    // test that is supposed to be reproducible.
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return (s / 4294967296) * 2 - 1;
  };
  const arr = (n, scale) => {
    const a = new Float32Array(n);
    for (let i = 0; i < n; i++) a[i] = rnd() * scale;
    return a;
  };
  const convs = [];
  const affines = [];
  for (let li = 0; li < nlayers; li++) {
    const inC = li === 0 ? 1 : chan;
    // 1/sqrt(fan_in) keeps activations O(1) so an fp16 store cannot overflow and
    // muddy a numerics comparison with a range problem.
    const scale = 1 / Math.sqrt(27 * inC);
    convs.push({
      idx: li * 3, outC: chan, inC, kd: 3, kh: 3, kw: 3, is1x1: false,
      w: arr(27 * inC * chan, scale),
      bias: convBias ? arr(chan, 0.1) : null,
    });
    if (gn && affine) {
      affines.push({ idx: li * 3 + 1, scale: arr(chan, 0.5), bias: arr(chan, 0.2) });
      for (let i = 0; i < chan; i++) affines[li].scale[i] += 1;   // centre near 1
    }
  }
  const classifier = {
    idx: nlayers * 3, outC: nclass, inC: chan, kd: 1, kh: 1, kw: 1, is1x1: true,
    w: arr(nclass * chan, 0.5), bias: arr(nclass, 0.1),
  };
  return { desc: { convs, affines, classifier }, dilations };
}
