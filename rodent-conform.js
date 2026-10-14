// Conform an arbitrary rodent NIfTI to the grid the model was trained on:
// 256³ voxels of 0.1 mm, stored in LPS order (i → left, j → posterior,
// k → superior), centered on the input's field of view, uint8 intensities.
// This is the 0.1 mm analogue of niivue's conform() (which is fixed at 1 mm,
// LIA): trilinear resampling followed by the same robust 0–255 rescale.
import { mat4 } from "gl-matrix";

export const CONFORM_DIM = 256;
export const CONFORM_MM = 0.1;
// NVImage.permRAS for LPS storage: x flipped, y flipped, z as is.
const LPS_PERM = [-1, -2, 3];

export function isConformed(volume) {
  const { dims, pixDims } = volume.hdr;
  return dims[1] === CONFORM_DIM && dims[2] === CONFORM_DIM && dims[3] === CONFORM_DIM
    && [1, 2, 3].every((d) => Math.abs(pixDims[d] - CONFORM_MM) < 1e-4)
    && volume.permRAS.every((p, i) => p === LPS_PERM[i]);
}

// Row-major 4×4 storage-voxel → mm affine of the conformed grid, centered on
// the input volume's center.
function conformedAffine(volume) {
  const { dims, affine: A } = volume.hdr;
  const ci = (dims[1] - 1) / 2, cj = (dims[2] - 1) / 2, ck = (dims[3] - 1) / 2;
  const center = [0, 1, 2].map((r) => A[r][0] * ci + A[r][1] * cj + A[r][2] * ck + A[r][3]);
  const s = CONFORM_MM, c = (CONFORM_DIM - 1) / 2;
  return [
    [-s, 0, 0, center[0] + s * c],
    [0, -s, 0, center[1] + s * c],
    [0, 0, s, center[2] - s * c],
    [0, 0, 0, 1],
  ];
}

// Row-major 3×4 map taking a voxel of the `from` grid to a (fractional) voxel
// of the `to` grid, given both row-major storage affines.
export function voxelMap(fromAffine, toAffine) {
  const toGL = (a) => mat4.transpose(mat4.create(), a.flat());
  const toInv = mat4.invert(mat4.create(), toGL(toAffine));
  const m = mat4.multiply(mat4.create(), toInv, toGL(fromAffine)); // column-major
  return [0, 1, 2].map((r) => [m[r], m[4 + r], m[8 + r], m[12 + r]]);
}

// Returns a new conformed NVImage (the input is left untouched).
export async function conformRodent(nv, volume) {
  const { dims, scl_slope: slope, scl_inter: inter } = volume.hdr;
  const nx = dims[1], ny = dims[2], nz = Math.max(1, dims[3]);
  const nxy = nx * ny;
  const src = volume.img; // first frame only for 4D inputs
  const scaled = slope !== 1 || inter !== 0;
  const at = (idx) => (scaled ? src[idx] * slope + inter : src[idx]);

  const outAffine = conformedAffine(volume);
  const M = voxelMap(outAffine, volume.hdr.affine);
  const n = CONFORM_DIM;
  const out = new Float32Array(n * n * n);

  // Linear interpolation weights along one axis, clamped at the edges; voxels
  // more than half a voxel outside the input stay 0.
  const axis = (p, dim) => {
    if (p < -0.5 || p > dim - 0.5) return null;
    const q = Math.min(Math.max(p, 0), dim - 1);
    const f = Math.floor(q);
    const c = Math.min(f + 1, dim - 1);
    return [f, c, q - f];
  };

  let o = 0;
  for (let k = 0; k < n; k++) {
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++, o++) {
        const ax = axis(M[0][0] * i + M[0][1] * j + M[0][2] * k + M[0][3], nx);
        if (!ax) continue;
        const ay = axis(M[1][0] * i + M[1][1] * j + M[1][2] * k + M[1][3], ny);
        if (!ay) continue;
        const az = axis(M[2][0] * i + M[2][1] * j + M[2][2] * k + M[2][3], nz);
        if (!az) continue;
        const [x0, x1, wx] = ax, [y0, y1, wy] = ay, [z0, z1, wz] = az;
        const z0o = z0 * nxy, z1o = z1 * nxy, y0o = y0 * nx, y1o = y1 * nx;
        const c00 = at(x0 + y0o + z0o) * (1 - wx) + at(x1 + y0o + z0o) * wx;
        const c10 = at(x0 + y1o + z0o) * (1 - wx) + at(x1 + y1o + z0o) * wx;
        const c01 = at(x0 + y0o + z1o) * (1 - wx) + at(x1 + y0o + z1o) * wx;
        const c11 = at(x0 + y1o + z1o) * (1 - wx) + at(x1 + y1o + z1o) * wx;
        out[o] = (c00 * (1 - wy) + c10 * wy) * (1 - wz) + (c01 * (1 - wy) + c11 * wy) * wz;
      }
    }
  }

  // Same robust (0–99.9th percentile) rescale to uint8 as niivue's conform().
  const [srcMin, scale] = nv.getScale(volume, 0, 255);
  const out8 = await nv.scalecropUint8(out, 0, 255, srcMin, scale);
  const bytes = await nv.createNiftiArray(
    [n, n, n],
    [CONFORM_MM, CONFORM_MM, CONFORM_MM],
    outAffine.flat(),
    2, // DT_UINT8
    out8
  );
  const conformed = await nv.niftiArray2NVImage(bytes);
  conformed.name = volume.name;
  return conformed;
}
