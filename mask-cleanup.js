// Morphological opening of the binary brain mask: erode, keep the largest
// connected component, dilate back, and intersect with the original mask.
// Skull, muscle or eye tissue that the model labels as brain usually hangs on
// by thin bridges; eroding cuts those bridges so the attached blobs fall away
// with the non-largest components, while the brain itself only loses detail
// thinner than 2·radius+1 voxels. On the conformed 0.1 mm grid radius 4
// (a 0.9 mm cube) trims well-segmented brains by about 1%.
import { BWLabeler } from "./bwlabels.js";

// Erode along one axis with a cube half-width r, in O(n) using run lengths
// capped at r+1 (all the test needs). The volume is walked as
// [outer][axis][inner] so the innermost loop is always contiguous. With
// edgeInside the region beyond the volume counts as foreground, which turns
// "erode the complement" into an exact dilation.
function erode1D(src, dims, axis, r, edgeInside) {
  const n = dims[axis];
  const inner = axis === 0 ? 1 : axis === 1 ? dims[0] : dims[0] * dims[1];
  const outer = src.length / (n * inner);
  const cap = r + 1;
  const edge = edgeInside ? cap : 0;
  const out = new Uint8Array(src.length); // forward pass: run ending here
  const lane = new Uint8Array(inner);     // backward pass: run starting here
  for (let t = 0; t < outer; t++) {
    const base = t * n * inner;
    for (let p = 0; p < n; p++) {
      const row = base + p * inner;
      for (let q = 0; q < inner; q++) {
        const prev = p ? out[row - inner + q] : edge;
        out[row + q] = src[row + q] ? Math.min(prev + 1, cap) : 0;
      }
    }
    lane.fill(edge);
    for (let p = n - 1; p >= 0; p--) {
      const row = base + p * inner;
      for (let q = 0; q < inner; q++) {
        const c = src[row + q] ? Math.min(lane[q] + 1, cap) : 0;
        lane[q] = c;
        out[row + q] = out[row + q] === cap && c === cap ? 1 : 0;
      }
    }
  }
  return out;
}

const invert = (m) => { for (let i = 0; i < m.length; i++) m[i] ^= 1; return m; };
const erode = (mask, dims, r, edgeInside = false) =>
  [0, 1, 2].reduce((m, axis) => erode1D(m, dims, axis, r, edgeInside), mask);
// Dilation (outside = background) is the complement of eroding the complement.
const dilate = (mask, dims, r) => invert(erode(invert(mask.slice()), dims, r, true));

export function openBrainMask(mask, dims, radius = 4) {
  if (radius <= 0) return mask;
  const eroded = erode(mask, dims, radius);
  const [count, labels] = new BWLabeler().bwlabel(eroded, dims, 6, true, true);
  if (count === 0) return mask; // too thin to survive erosion; leave untouched
  const core = new Uint8Array(labels.length);
  for (let i = 0; i < labels.length; i++) core[i] = labels[i] ? 1 : 0;
  const dilated = dilate(core, dims, radius);
  const out = new Uint8Array(mask.length);
  for (let i = 0; i < mask.length; i++) out[i] = mask[i] & dilated[i];
  return out;
}
