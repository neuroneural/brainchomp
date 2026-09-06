// Geometry uses storage-voxel coordinates; all brush distances use world mm.
// No viewer dependencies: this code also runs in a worker and node tests.
export function transform(m, p) {
  return [0, 1, 2].map(
    (i) => m[i] * p[0] + m[i + 4] * p[1] + m[i + 8] * p[2] + m[i + 12],
  );
}
export const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
export const sub = (a, b) => a.map((v, i) => v - b[i]);
export const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
export function unit(a) {
  const n = Math.hypot(...a);
  return n > 1e-15 ? a.map((v) => v / n) : [0, 0, 1];
}

// Consistent tetrahedral subdivision of cubes avoids ambiguous cube faces.
// Padding closes masks touching the image edge. Shared edge vertices are welded.
// The 0.5 isosurface exactly separates foreground/background voxel centers.
export function extractSurface(mask, dims, cells = null) {
  const [nx, ny, nz] = dims;
  const corners = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 1],
  ];
  const tets = [
    [0, 1, 2, 6],
    [0, 2, 3, 6],
    [0, 3, 7, 6],
    [0, 7, 4, 6],
    [0, 4, 5, 6],
    [0, 5, 1, 6],
  ];
  const pts = [],
    tris = [],
    triangleCells = [],
    edges = new Map();
  const sample = (x, y, z) =>
    x < 0 || y < 0 || z < 0 || x >= nx || y >= ny || z >= nz
      ? 0
      : mask[x + nx * (y + ny * z)] !== 0;
  const gridId = (x, y, z) => x + 1 + (nx + 2) * (y + 1 + (ny + 2) * (z + 1));
  const vertex = (a, b) => {
    const ia = gridId(...a),
      ib = gridId(...b);
    // String edge keys also support larger grids without integer-pair overflow.
    const key = `${Math.min(ia, ib)}:${Math.max(ia, ib)}`;
    let v = edges.get(key);
    if (v === undefined) {
      v = pts.length / 3;
      pts.push(...a.map((x, i) => (x + b[i]) * 0.5));
      edges.set(key, v);
    }
    return v;
  };
  let cell;
  const triangle = (a, b, c, out) => {
    triangleCells.push(cell);
    const pa = pts.slice(a * 3, a * 3 + 3),
      pb = pts.slice(b * 3, b * 3 + 3),
      pc = pts.slice(c * 3, c * 3 + 3);
    if (dot(cross(sub(pb, pa), sub(pc, pa)), out) < 0) tris.push(a, c, b);
    else tris.push(a, b, c);
  };
  function* allCells() {
    for (let z = -1; z < nz; z++)
      for (let y = -1; y < ny; y++)
        for (let x = -1; x < nx; x++)
          yield x + 1 + (nx + 1) * (y + 1 + (ny + 1) * (z + 1));
  }
  for (cell of cells || allCells()) {
    const x = (cell % (nx + 1)) - 1;
    const y = (Math.floor(cell / (nx + 1)) % (ny + 1)) - 1;
    const z = Math.floor(cell / ((nx + 1) * (ny + 1))) - 1;
    const values = corners.map((c) => sample(x + c[0], y + c[1], z + c[2]));
    const n = values.reduce((a, b) => a + Number(b), 0);
    if (!n || n === 8) continue;
    const p = corners.map((c) => [x + c[0], y + c[1], z + c[2]]);
    for (const t of tets) {
      const inside = t.filter((i) => values[i]),
        outside = t.filter((i) => !values[i]);
      if (!inside.length || !outside.length) continue;
      const mean = (ids) =>
        [0, 1, 2].map((k) => ids.reduce((s, i) => s + p[i][k], 0) / ids.length);
      const out = sub(mean(outside), mean(inside));
      if (inside.length === 1 || outside.length === 1) {
        const one = inside.length === 1 ? inside : outside,
          rest = inside.length === 1 ? outside : inside;
        triangle(...rest.map((i) => vertex(p[one[0]], p[i])), out);
      } else {
        const a = vertex(p[inside[0]], p[outside[0]]),
          b = vertex(p[inside[0]], p[outside[1]]);
        const c = vertex(p[inside[1]], p[outside[0]]),
          d = vertex(p[inside[1]], p[outside[1]]);
        triangle(a, b, c, out);
        triangle(b, d, c, out);
      }
    }
  }
  return {
    positions: new Float32Array(pts),
    indices: new Uint32Array(tris),
    triangleCells: new Int32Array(triangleCells),
  };
}

export function normals(positions, indices, affine) {
  const out = new Float32Array(positions.length);
  const det = dot(
    [affine[0], affine[1], affine[2]],
    cross(
      [affine[4], affine[5], affine[6]],
      [affine[8], affine[9], affine[10]],
    ),
  );
  for (let t = 0; t < indices.length; t += 3) {
    const ids = [indices[t], indices[t + 1], indices[t + 2]];
    const p = ids.map((i) =>
      transform(affine, positions.subarray(i * 3, i * 3 + 3)),
    );
    const n = cross(sub(p[1], p[0]), sub(p[2], p[0]));
    // A reflected storage affine reverses winding, but not inside/outside.
    for (const id of ids)
      for (let k = 0; k < 3; k++) out[id * 3 + k] += n[k] * Math.sign(det);
  }
  for (let i = 0; i < out.length; i += 3)
    out.set(unit(Array.from(out.subarray(i, i + 3))), i);
  for (let pass = 0; pass < 3; pass++) {
    const smoothed = new Float32Array(out.length),
      counts = new Uint16Array(out.length / 3);
    for (let t = 0; t < indices.length; t += 3) {
      const a = indices[t],
        b = indices[t + 1],
        c = indices[t + 2];
      for (const id of [a, b, c]) {
        counts[id]++;
        for (let k = 0; k < 3; k++)
          smoothed[id * 3 + k] +=
            out[a * 3 + k] + out[b * 3 + k] + out[c * 3 + k];
      }
    }
    for (let i = 0; i < out.length; i += 3)
      if (counts[i / 3])
        out.set(unit(Array.from(smoothed.subarray(i, i + 3))), i);
  }
  return out;
}

// XY tile index makes voxelization proportional to affected projected columns.
// Filling complete columns is necessary: a local surface patch is not closed.
export class ColumnVoxelizer {
  constructor(positions, indices, dims) {
    this.positions = positions;
    this.indices = indices;
    this.dims = dims;
    this.tile = 16;
    this.nx = Math.ceil(dims[0] / this.tile);
    this.ny = Math.ceil(dims[1] / this.tile);
    this.bins = Array.from({ length: this.nx * this.ny }, () => new Set());
    this.memberships = new Array(indices.length / 3);
    for (let t = 0; t < indices.length / 3; t++) this.updateTriangle(t);
  }
  updateTriangle(t) {
    for (const b of this.memberships[t] || []) this.bins[b].delete(t);
    if (this.indices[t * 3] === this.indices[t * 3 + 1]) {
      this.memberships[t] = [];
      return;
    }
    const p = [0, 1, 2].map((k) =>
      this.positions.subarray(
        this.indices[t * 3 + k] * 3,
        this.indices[t * 3 + k] * 3 + 3,
      ),
    );
    const x0 = Math.max(
      0,
      Math.floor(Math.min(...p.map((p) => p[0])) / this.tile),
    );
    const x1 = Math.min(
      this.nx - 1,
      Math.floor(Math.max(...p.map((p) => p[0])) / this.tile),
    );
    const y0 = Math.max(
      0,
      Math.floor(Math.min(...p.map((p) => p[1])) / this.tile),
    );
    const y1 = Math.min(
      this.ny - 1,
      Math.floor(Math.max(...p.map((p) => p[1])) / this.tile),
    );
    const bins = [];
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        const b = x + y * this.nx;
        this.bins[b].add(t);
        bins.push(b);
      }
    this.memberships[t] = bins;
  }
  fill(rect) {
    const [x0, y0, x1, y1] = rect,
      w = x1 - x0 + 1,
      h = y1 - y0 + 1;
    const candidates = new Set();
    for (
      let y = Math.floor(y0 / this.tile);
      y <= Math.floor(y1 / this.tile);
      y++
    )
      for (
        let x = Math.floor(x0 / this.tile);
        x <= Math.floor(x1 / this.tile);
        x++
      )
        for (const t of this.bins[x + y * this.nx]) candidates.add(t);
    const hits = Array.from({ length: w * h }, () => []);
    const edge = (a, b, x, y) =>
      (b[0] - a[0]) * (y - a[1]) - (b[1] - a[1]) * (x - a[0]);
    const topLeft = (a, b) => b[1] > a[1] || (b[1] === a[1] && b[0] < a[0]);
    for (const t of candidates) {
      let [a, b, c] = [0, 1, 2].map((k) =>
        this.positions.subarray(
          this.indices[t * 3 + k] * 3,
          this.indices[t * 3 + k] * 3 + 3,
        ),
      );
      let area = edge(a, b, c[0], c[1]);
      if (Math.abs(area) < 1e-12) continue;
      if (area < 0) {
        [b, c] = [c, b];
        area = -area;
      }
      const loX = Math.max(x0, Math.ceil(Math.min(a[0], b[0], c[0]))),
        hiX = Math.min(x1, Math.floor(Math.max(a[0], b[0], c[0])));
      const loY = Math.max(y0, Math.ceil(Math.min(a[1], b[1], c[1]))),
        hiY = Math.min(y1, Math.floor(Math.max(a[1], b[1], c[1])));
      for (let y = loY; y <= hiY; y++)
        for (let x = loX; x <= hiX; x++) {
          const ea = edge(b, c, x, y),
            eb = edge(c, a, x, y),
            ec = edge(a, b, x, y);
          if (ea < 0 || eb < 0 || ec < 0) continue;
          if (
            (ea === 0 && !topLeft(b, c)) ||
            (eb === 0 && !topLeft(c, a)) ||
            (ec === 0 && !topLeft(a, b))
          )
            continue;
          hits[x - x0 + w * (y - y0)].push(
            (ea * a[2] + eb * b[2] + ec * c[2]) / area,
          );
        }
    }
    const data = new Uint8Array(w * h * this.dims[2]);
    for (let col = 0; col < hits.length; col++) {
      const zs = hits[col].sort((a, b) => a - b);
      if (zs.length % 2)
        throw new Error(
          "Surface is not closed at a voxel column; edit was not applied.",
        );
      for (let i = 0; i < zs.length; i += 2) {
        const start = Math.max(0, Math.ceil(zs[i])),
          end = Math.min(this.dims[2] - 1, Math.ceil(zs[i + 1]) - 1);
        for (let z = start; z <= end; z++) data[col + w * h * z] = 1;
      }
    }
    return data;
  }
}

export function readColumns(mask, dims, rect) {
  const [x0, y0, x1, y1] = rect,
    w = x1 - x0 + 1,
    h = y1 - y0 + 1,
    out = new Uint8Array(w * h * dims[2]);
  for (let z = 0; z < dims[2]; z++)
    for (let y = y0; y <= y1; y++)
      out.set(
        mask.subarray(
          x0 + dims[0] * (y + dims[1] * z),
          x1 + 1 + dims[0] * (y + dims[1] * z),
        ),
        w * (y - y0 + h * z),
      );
  return out;
}
export function writeColumns(mask, dims, rect, data) {
  const [x0, y0, x1, y1] = rect,
    w = x1 - x0 + 1,
    h = y1 - y0 + 1;
  for (let z = 0; z < dims[2]; z++)
    for (let y = y0; y <= y1; y++)
      mask.set(
        data.subarray(w * (y - y0 + h * z), w * (y - y0 + h * z) + w),
        x0 + dims[0] * (y + dims[1] * z),
      );
}
