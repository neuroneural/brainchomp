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
export function extractSurface(mask, dims) {
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
  const triangle = (a, b, c, out) => {
    const pa = pts.slice(a * 3, a * 3 + 3),
      pb = pts.slice(b * 3, b * 3 + 3),
      pc = pts.slice(c * 3, c * 3 + 3);
    if (dot(cross(sub(pb, pa), sub(pc, pa)), out) < 0) tris.push(a, c, b);
    else tris.push(a, b, c);
  };
  for (let z = -1; z < nz; z++)
    for (let y = -1; y < ny; y++)
      for (let x = -1; x < nx; x++) {
        const values = corners.map((c) => sample(x + c[0], y + c[1], z + c[2]));
        const n = values.reduce((a, b) => a + Number(b), 0);
        if (!n || n === 8) continue;
        const p = corners.map((c) => [x + c[0], y + c[1], z + c[2]]);
        for (const t of tets) {
          const inside = t.filter((i) => values[i]),
            outside = t.filter((i) => !values[i]);
          if (!inside.length || !outside.length) continue;
          const mean = (ids) =>
            [0, 1, 2].map(
              (k) => ids.reduce((s, i) => s + p[i][k], 0) / ids.length,
            );
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
  return { positions: new Float32Array(pts), indices: new Uint32Array(tris) };
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

export class SculptSession {
  constructor(mask, dims, affine, inverse) {
    this.mask = mask;
    this.dims = dims;
    this.affine = affine;
    this.inverse = inverse;
    Object.assign(this, extractSurface(mask, dims));
    if (!this.indices.length) throw new Error("The mask is empty.");
    this.voxelizer = new ColumnVoxelizer(this.positions, this.indices, dims);
    this.vertexNormals = normals(this.positions, this.indices, affine);
    this.undoStack = [];
    this.redoStack = [];
    this.historyBytes = 0;
    this.limit = 32 * 1024 * 1024;
  }
  begin(center, normal, radius, tool = "grab") {
    if (this.stroke) throw new Error("A grab is already active.");
    if (
      !(radius > 0) ||
      !Number.isFinite(radius) ||
      !center.every(Number.isFinite) ||
      !normal.every(Number.isFinite)
    )
      throw new Error("Invalid brush.");
    normal = unit(normal);
    const ids = [],
      weights = [],
      before = [],
      beforeNormals = [],
      gradients = [];
    for (let i = 0; i < this.positions.length; i += 3) {
      const p = this.positions.subarray(i, i + 3),
        world = transform(this.affine, p);
      const r = Math.hypot(...sub(world, center)) / radius;
      if (r >= 1) continue;
      ids.push(i / 3);
      before.push(...p);
      beforeNormals.push(...this.vertexNormals.subarray(i, i + 3));
      const factor = (-30 * r * (1 - r) ** 2) / (radius * radius);
      gradients.push(...world.map((v, k) => (v - center[k]) * factor));
      weights.push(1 - 10 * r ** 3 + 15 * r ** 4 - 6 * r ** 5);
    }
    const selected = new Set(ids),
      triangles = [];
    let x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;
    const vector = transform(this.inverse, normal).map(
      (v, i) => v - this.inverse[12 + i],
    );
    for (let t = 0; t < this.indices.length; t += 3) {
      if (![0, 1, 2].some((k) => selected.has(this.indices[t + k]))) continue;
      triangles.push(t / 3);
      for (let k = 0; k < 3; k++) {
        const id = this.indices[t + k] * 3;
        x0 = Math.min(x0, this.positions[id]);
        x1 = Math.max(x1, this.positions[id]);
        y0 = Math.min(y0, this.positions[id + 1]);
        y1 = Math.max(y1, this.positions[id + 1]);
      }
    }
    if (!ids.length)
      throw new Error(
        "Brush is smaller than the surface sampling. Increase its size.",
      );
    const maxDistance = radius * 0.25;
    const extent =
      tool === "smooth"
        ? [0, 1, 2].map((k) =>
            Math.hypot(
              this.inverse[k],
              this.inverse[k + 4],
              this.inverse[k + 8],
            ),
          )
        : vector.map(Math.abs);
    const rect = [
      Math.max(0, Math.floor(x0 - extent[0] * maxDistance)),
      Math.max(0, Math.floor(y0 - extent[1] * maxDistance)),
      Math.min(this.dims[0] - 1, Math.ceil(x1 + extent[0] * maxDistance)),
      Math.min(this.dims[1] - 1, Math.ceil(y1 + extent[1] * maxDistance)),
    ];
    const triangleNormals = new Float32Array(triangles.length * 3);
    triangles.forEach((t, j) => {
      const p = [0, 1, 2].map((k) =>
        this.positions.subarray(
          this.indices[t * 3 + k] * 3,
          this.indices[t * 3 + k] * 3 + 3,
        ),
      );
      triangleNormals.set(cross(sub(p[1], p[0]), sub(p[2], p[0])), j * 3);
    });
    this.stroke = {
      tool,
      center,
      radius,
      triangleNormals,
      normal,
      gradients: new Float32Array(gradients),
      beforeNormals: new Float32Array(beforeNormals),
      ids: new Uint32Array(ids),
      weights: new Float32Array(weights),
      before: new Float32Array(before),
      triangles,
      vector,
      maxDistance,
      rect,
      maskBefore: readColumns(this.mask, this.dims, rect),
      distance: 0,
    };
    return maxDistance;
  }
  move(distance) {
    const s = this.stroke;
    if (!s) throw new Error("No active grab.");
    if (!Number.isFinite(distance)) throw new Error("Invalid displacement.");
    distance = Math.max(-s.maxDistance, Math.min(s.maxDistance, distance));
    const after = new Float32Array(s.before.length);
    const afterNormals = new Float32Array(s.before.length);
    for (let j = 0; j < s.ids.length; j++)
      for (let k = 0; k < 3; k++) {
        const v = s.before[j * 3 + k] + s.vector[k] * distance * s.weights[j];
        if (v < -0.5 - 1e-6 || v > this.dims[k] - 0.5 + 1e-6)
          throw new Error(
            "The surface would leave the image. Try a smaller correction.",
          );
        after[j * 3 + k] = v;
        this.positions[s.ids[j] * 3 + k] = v;
      }
    this.validateStroke();
    // Transform the shading normal by J^-T for f(p)=p+d*n*w(p).
    // This updates only the grabbed vertices and avoids a full mesh-normal
    // rebuild on release. The same normals are retained for exact undo/redo.
    for (let j = 0; j < s.ids.length; j++) {
      const gradient = s.gradients.subarray(j * 3, j * 3 + 3),
        before = s.beforeNormals.subarray(j * 3, j * 3 + 3);
      const factor =
        (distance * dot(s.normal, before)) /
        (1 + distance * dot(gradient, s.normal));
      const n = unit(Array.from(before, (v, k) => v - gradient[k] * factor));
      afterNormals.set(n, j * 3);
      this.vertexNormals.set(n, s.ids[j] * 3);
    }
    return this.publishStroke(distance, after, afterNormals);
  }
  validateStroke() {
    const s = this.stroke;
    s.triangles.forEach((t, j) => {
      const p = [0, 1, 2].map((k) =>
        this.positions.subarray(
          this.indices[t * 3 + k] * 3,
          this.indices[t * 3 + k] * 3 + 3,
        ),
      );
      const n = cross(sub(p[1], p[0]), sub(p[2], p[0]));
      const before = s.triangleNormals.subarray(j * 3, j * 3 + 3);
      if (dot(n, before) <= dot(before, before) * 1e-5)
        throw new Error(
          "This grab would fold a surface triangle. Try a smaller correction.",
        );
    });
  }
  publishStroke(distance, after, afterNormals) {
    const s = this.stroke;
    for (const t of s.triangles) this.voxelizer.updateTriangle(t);
    const data = this.voxelizer.fill(s.rect);
    writeColumns(this.mask, this.dims, s.rect, data);
    s.distance = distance;
    return {
      ids: s.ids,
      positions: after,
      normals: afterNormals,
      rect: s.rect,
      data,
      distance,
    };
  }
  buildAdjacency() {
    if (this.adjacency) return;
    const count = this.positions.length / 3,
      offsets = new Uint32Array(count + 1);
    for (const id of this.indices) offsets[id + 1] += 2;
    for (let i = 1; i <= count; i++) offsets[i] += offsets[i - 1];
    const neighbors = new Uint32Array(offsets[count]),
      next = offsets.slice();
    for (let t = 0; t < this.indices.length; t += 3)
      for (let k = 0; k < 3; k++) {
        const id = this.indices[t + k];
        neighbors[next[id]++] = this.indices[t + ((k + 1) % 3)];
        neighbors[next[id]++] = this.indices[t + ((k + 2) % 3)];
      }
    this.adjacency = { offsets, neighbors };
  }
  smooth(amount) {
    const s = this.stroke;
    if (!s || s.tool !== "smooth")
      throw new Error("No active smoothing stroke.");
    if (!Number.isFinite(amount)) throw new Error("Invalid smoothing amount.");
    amount = Math.max(0, Math.min(1, amount));
    this.buildAdjacency();
    const { offsets, neighbors } = this.adjacency;
    // Jacobi relaxation with a fixed brush footprint and pinned outside
    // vertices. Every preview starts from the same stroke snapshot.
    s.ids.forEach((id, j) =>
      this.positions.set(s.before.subarray(j * 3, j * 3 + 3), id * 3),
    );
    const after = s.before.slice();
    for (let pass = 0; pass < 8; pass++) {
      s.ids.forEach((id, j) => {
        const begin = offsets[id],
          end = offsets[id + 1],
          average = [0, 0, 0];
        for (let n = begin; n < end; n++)
          for (let k = 0; k < 3; k++)
            average[k] += this.positions[neighbors[n] * 3 + k];
        const lambda = 0.45 * amount * s.weights[j];
        const p = average.map(
          (v, k) =>
            this.positions[id * 3 + k] +
            lambda * (v / (end - begin) - this.positions[id * 3 + k]),
        );
        const delta = p.map((v, k) => v - s.before[j * 3 + k]);
        const worldDelta = [0, 1, 2].map(
          (k) =>
            this.affine[k] * delta[0] +
            this.affine[k + 4] * delta[1] +
            this.affine[k + 8] * delta[2],
        );
        const scale = Math.min(
          1,
          s.maxDistance / Math.max(1e-12, Math.hypot(...worldDelta)),
        );
        after.set(
          delta.map((v, k) => s.before[j * 3 + k] + v * scale),
          j * 3,
        );
      });
      s.ids.forEach((id, j) =>
        this.positions.set(after.subarray(j * 3, j * 3 + 3), id * 3),
      );
    }
    this.validateStroke();
    const local = new Map(Array.from(s.ids, (id, j) => [id, j]));
    let afterNormals = new Float32Array(s.beforeNormals.length);
    const det = dot(
      [this.affine[0], this.affine[1], this.affine[2]],
      cross(
        [this.affine[4], this.affine[5], this.affine[6]],
        [this.affine[8], this.affine[9], this.affine[10]],
      ),
    );
    for (const t of s.triangles) {
      const ids = [0, 1, 2].map((k) => this.indices[t * 3 + k]),
        p = ids.map((id) =>
          transform(this.affine, this.positions.subarray(id * 3, id * 3 + 3)),
        );
      const n = cross(sub(p[1], p[0]), sub(p[2], p[0]));
      for (const id of ids) {
        const j = local.get(id);
        if (j === undefined) continue;
        for (let k = 0; k < 3; k++)
          afterNormals[j * 3 + k] += n[k] * Math.sign(det);
      }
    }
    for (let j = 0; j < s.ids.length; j++)
      afterNormals.set(
        unit(Array.from(afterNormals.subarray(j * 3, j * 3 + 3))),
        j * 3,
      );
    for (let pass = 0; pass < 3; pass++) {
      const next = new Float32Array(afterNormals.length);
      s.ids.forEach((id, j) => {
        const sum = Array.from(afterNormals.subarray(j * 3, j * 3 + 3));
        for (let n = offsets[id]; n < offsets[id + 1]; n++) {
          const neighbor = neighbors[n],
            localId = local.get(neighbor);
          const source =
            localId === undefined
              ? this.vertexNormals.subarray(neighbor * 3, neighbor * 3 + 3)
              : afterNormals.subarray(localId * 3, localId * 3 + 3);
          for (let k = 0; k < 3; k++) sum[k] += source[k];
        }
        next.set(unit(sum), j * 3);
      });
      afterNormals = next;
    }
    s.ids.forEach((id, j) => {
      const blend = amount === 0 ? 0 : s.weights[j];
      const n =
        blend === 0
          ? Array.from(s.beforeNormals.subarray(j * 3, j * 3 + 3))
          : unit(
              [0, 1, 2].map(
                (k) =>
                  s.beforeNormals[j * 3 + k] * (1 - blend) +
                  afterNormals[j * 3 + k] * blend,
              ),
            );
      afterNormals.set(n, j * 3);
      this.vertexNormals.set(n, id * 3);
    });
    return this.publishStroke(amount, after, afterNormals);
  }
  commit() {
    const s = this.stroke;
    if (!s) return this.history();
    if (s.distance !== 0) {
      const after = new Float32Array(s.before.length);
      s.ids.forEach((id, j) =>
        after.set(this.positions.subarray(id * 3, id * 3 + 3), j * 3),
      );
      const afterNormals = new Float32Array(s.beforeNormals.length);
      s.ids.forEach((id, j) =>
        afterNormals.set(
          this.vertexNormals.subarray(id * 3, id * 3 + 3),
          j * 3,
        ),
      );
      const maskAfter = readColumns(this.mask, this.dims, s.rect);
      const item = {
        ids: s.ids,
        beforeNormals: s.beforeNormals,
        afterNormals,
        before: s.before,
        after,
        rect: s.rect,
        maskBefore: s.maskBefore,
        maskAfter,
        triangles: s.triangles,
      };
      item.bytes =
        item.beforeNormals.byteLength +
        item.afterNormals.byteLength +
        item.ids.byteLength +
        item.before.byteLength +
        after.byteLength +
        item.maskBefore.byteLength +
        maskAfter.byteLength +
        item.triangles.length * 8;
      this.historyBytes -= this.redoStack.reduce((n, h) => n + h.bytes, 0);
      this.redoStack = [];
      this.undoStack.push(item);
      this.historyBytes += item.bytes;
      while (this.historyBytes > this.limit && this.undoStack.length > 1)
        this.historyBytes -= this.undoStack.shift().bytes;
    }
    this.stroke = null;
    return this.history();
  }
  history() {
    return {
      undo: this.undoStack.length,
      redo: this.redoStack.length,
      historyBytes: this.historyBytes,
    };
  }
  restore(item, forward) {
    const positions = forward ? item.after : item.before,
      data = forward ? item.maskAfter : item.maskBefore;
    item.ids.forEach((id, j) =>
      this.positions.set(positions.subarray(j * 3, j * 3 + 3), id * 3),
    );
    const normalPatch = forward ? item.afterNormals : item.beforeNormals;
    item.ids.forEach((id, j) =>
      this.vertexNormals.set(normalPatch.subarray(j * 3, j * 3 + 3), id * 3),
    );
    for (const t of item.triangles) this.voxelizer.updateTriangle(t);
    writeColumns(this.mask, this.dims, item.rect, data);
    return {
      ids: item.ids,
      positions,
      normals: normalPatch,
      rect: item.rect,
      data,
    };
  }
  cancel() {
    if (!this.stroke) return null;
    const patch = this.restore(this.stroke, false);
    this.stroke = null;
    return patch;
  }
  undo() {
    if (this.stroke) throw new Error("Finish the grab first.");
    const h = this.undoStack.pop();
    if (!h) return null;
    this.redoStack.push(h);
    return this.restore(h, false);
  }
  redo() {
    if (this.stroke) throw new Error("Finish the grab first.");
    const h = this.redoStack.pop();
    if (!h) return null;
    this.undoStack.push(h);
    return this.restore(h, true);
  }
}
