import { extractSurface, normals, transform, readColumns } from "./surface.js";

// Stable vertex/triangle slots let local remeshing share welded boundary
// vertices with the untouched mesh, and keep topology history as small patches.
export class SurfaceTopology {
  constructor(session) {
    this.s = session;
    this.uses = new Uint32Array(session.positions.length / 3);
    this.cells = new Map();
    this.dirty = new Set();
    for (let t = 0; t < session.indices.length / 3; t++) this.attach(t);
  }
  attach(t) {
    const s = this.s,
      cell = s.triangleCells[t];
    if (cell < 0) return;
    if (!this.cells.has(cell)) this.cells.set(cell, new Set());
    this.cells.get(cell).add(t);
    for (let k = 0; k < 3; k++) this.uses[s.indices[t * 3 + k]]++;
  }
  detach(t) {
    const s = this.s,
      cell = s.triangleCells[t];
    if (cell < 0) return;
    const set = this.cells.get(cell);
    set.delete(t);
    if (!set.size) this.cells.delete(cell);
    for (let k = 0; k < 3; k++) this.uses[s.indices[t * 3 + k]]--;
  }
  voxelCells(x, y, z, target = this.dirty) {
    const [nx, ny] = this.s.dims;
    for (let dz = 0; dz <= 1; dz++)
      for (let dy = 0; dy <= 1; dy++)
        for (let dx = 0; dx <= 1; dx++)
          target.add(x + dx + (nx + 1) * (y + dy + (ny + 1) * (z + dz)));
  }
  markChanged(triangles, rect, data) {
    for (const t of triangles)
      if (this.s.triangleCells[t] >= 0) this.dirty.add(this.s.triangleCells[t]);
    const [x0, y0, x1, y1] = rect,
      [nx, ny, nz] = this.s.dims;
    let j = 0;
    for (let z = 0; z < nz; z++)
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++, j++)
          if (this.s.mask[x + nx * (y + ny * z)] !== data[j])
            this.voxelCells(x, y, z);
  }
  grow(vertexCount, triangleCount) {
    const s = this.s;
    if (vertexCount > this.uses.length) {
      const count = Math.max(vertexCount, Math.ceil(this.uses.length * 1.25));
      for (const name of ["positions", "vertexNormals"]) {
        const next = new Float32Array(count * 3);
        next.set(s[name]);
        s[name] = next;
      }
      const uses = new Uint32Array(count);
      uses.set(this.uses);
      this.uses = uses;
    }
    if (triangleCount > s.triangleCells.length) {
      const count = Math.max(
        triangleCount,
        Math.ceil(s.triangleCells.length * 1.25),
      );
      const indices = new Uint32Array(count * 3);
      indices.set(s.indices);
      s.indices = indices;
      const cells = new Int32Array(count).fill(-1);
      cells.set(s.triangleCells);
      s.triangleCells = cells;
    }
    s.voxelizer.positions = s.positions;
    s.voxelizer.indices = s.indices;
  }
  remesh(cells) {
    const s = this.s,
      stroke = s.stroke;
    const vertices = new Set(),
      triangles = new Set(),
      boundary = new Map();
    const saveVertex = (id) => {
      if (!stroke.vertices.has(id))
        stroke.vertices.set(id, {
          p: s.positions.slice(id * 3, id * 3 + 3),
          n: s.vertexNormals.slice(id * 3, id * 3 + 3),
        });
      vertices.add(id);
    };
    const saveTriangle = (t) => {
      if (!stroke.triangles.has(t))
        stroke.triangles.set(t, {
          indices: s.indices.slice(t * 3, t * 3 + 3),
          cell: s.triangleCells[t],
        });
      triangles.add(t);
    };
    const candidates = new Set();
    for (const cell of cells)
      for (const t of [...(this.cells.get(cell) || [])]) {
        saveTriangle(t);
        for (let k = 0; k < 3; k++) candidates.add(s.indices[t * 3 + k]);
        this.detach(t);
        s.triangleCells[t] = -1;
        s.indices.fill(0, t * 3, t * 3 + 3);
      }
    const key = (p) => `${p[0]},${p[1]},${p[2]}`;
    for (const id of candidates)
      if (this.uses[id])
        boundary.set(key(s.positions.subarray(id * 3, id * 3 + 3)), id);
    const freeVertices = [],
      freeTriangles = [];
    for (let id = this.uses.length - 1; id >= 0; id--)
      if (!this.uses[id]) freeVertices.push(id);
    for (let t = s.triangleCells.length - 1; t >= 0; t--)
      if (s.triangleCells[t] < 0) freeTriangles.push(t);
    const mesh = extractSurface(s.mask, s.dims, cells);
    const ns = normals(mesh.positions, mesh.indices, s.affine);
    const mapping = new Uint32Array(mesh.positions.length / 3);
    let nextVertex = this.uses.length,
      nextTriangle = s.triangleCells.length;
    this.grow(
      nextVertex + Math.max(0, mapping.length - freeVertices.length),
      nextTriangle +
        Math.max(0, mesh.indices.length / 3 - freeTriangles.length),
    );
    for (let j = 0; j < mapping.length; j++) {
      const p = mesh.positions.subarray(j * 3, j * 3 + 3);
      let id = boundary.get(key(p));
      if (id === undefined) {
        id = freeVertices.length ? freeVertices.pop() : nextVertex++;
        saveVertex(id);
        s.positions.set(p, id * 3);
        s.vertexNormals.set(ns.subarray(j * 3, j * 3 + 3), id * 3);
      }
      mapping[j] = id;
    }
    for (let j = 0; j < mesh.indices.length / 3; j++) {
      const t = freeTriangles.length ? freeTriangles.pop() : nextTriangle++;
      saveTriangle(t);
      for (let k = 0; k < 3; k++)
        s.indices[t * 3 + k] = mapping[mesh.indices[j * 3 + k]];
      s.triangleCells[t] = mesh.triangleCells[j];
      this.attach(t);
    }
    for (const t of triangles) s.voxelizer.updateTriangle(t);
    s.adjacency = null;
    this.dirty.clear();
    return this.patch(vertices, triangles);
  }
  patch(vertices, triangles) {
    const s = this.s,
      ids = Uint32Array.from(vertices).sort(),
      triangleIds = Uint32Array.from(triangles).sort();
    const positions = new Float32Array(ids.length * 3),
      ns = positions.slice();
    const indices = new Uint32Array(triangleIds.length * 3),
      cells = new Int32Array(triangleIds.length);
    ids.forEach((id, j) => {
      positions.set(s.positions.subarray(id * 3, id * 3 + 3), j * 3);
      ns.set(s.vertexNormals.subarray(id * 3, id * 3 + 3), j * 3);
    });
    triangleIds.forEach((t, j) => {
      indices.set(s.indices.subarray(t * 3, t * 3 + 3), j * 3);
      cells[j] = s.triangleCells[t];
    });
    return {
      ids,
      positions,
      normals: ns,
      triangleIds,
      indices,
      cells,
      vertexLength: s.positions.length,
      indexLength: s.indices.length,
    };
  }
  restore(patch) {
    const s = this.s;
    this.grow(patch.vertexLength / 3, patch.indexLength / 3);
    patch.triangleIds.forEach((t) => this.detach(t));
    patch.ids.forEach((id, j) => {
      s.positions.set(patch.positions.subarray(j * 3, j * 3 + 3), id * 3);
      s.vertexNormals.set(patch.normals.subarray(j * 3, j * 3 + 3), id * 3);
    });
    patch.triangleIds.forEach((t, j) => {
      s.indices.set(patch.indices.subarray(j * 3, j * 3 + 3), t * 3);
      s.triangleCells[t] = patch.cells[j];
      this.attach(t);
      s.voxelizer.updateTriangle(t);
    });
    s.adjacency = null;
  }
}

export function scoopBegin(s, center, radius) {
  s.stroke = {
    tool: "scoop",
    radius,
    last: center.slice(),
    removed: new Set(),
    vertices: new Map(),
    triangles: new Map(),
    dirtyBefore: new Set(s.topology.dirty),
    rect: [Infinity, Infinity, -Infinity, -Infinity],
  };
  return radius;
}

// Remove voxel centers within the swept world-space sphere (a capsule), so
// sparse pointer events cannot leave gaps and anisotropic scans stay spherical.
export function scoopMove(s, points) {
  const g = s.stroke;
  if (!g || g.tool !== "scoop") throw new Error("No active scoop.");
  if (
    !Array.isArray(points) ||
    points.some((p) => p.length !== 3 || !p.every(Number.isFinite))
  )
    throw new Error("Invalid scoop path.");
  const cells = new Set(),
    rect = [Infinity, Infinity, -Infinity, -Infinity];
  const [nx, ny, nz] = s.dims;
  const ext = [0, 1, 2].map(
    (k) =>
      g.radius * Math.hypot(s.inverse[k], s.inverse[k + 4], s.inverse[k + 8]),
  );
  for (const b of points) {
    const a = g.last,
      av = transform(s.inverse, a),
      bv = transform(s.inverse, b);
    const lo = av.map((v, k) =>
      Math.max(0, Math.ceil(Math.min(v, bv[k]) - ext[k])),
    );
    const hi = av.map((v, k) =>
      Math.min(s.dims[k] - 1, Math.floor(Math.max(v, bv[k]) + ext[k])),
    );
    const d = b.map((v, k) => v - a[k]),
      dd = d.reduce((v, x) => v + x * x, 0);
    for (let z = lo[2]; z <= hi[2]; z++)
      for (let y = lo[1]; y <= hi[1]; y++)
        for (let x = lo[0]; x <= hi[0]; x++) {
          const i = x + nx * (y + ny * z);
          if (!s.mask[i]) continue;
          const p = transform(s.affine, [x, y, z]);
          const t = dd
            ? Math.max(
                0,
                Math.min(
                  1,
                  d.reduce((v, q, k) => v + q * (p[k] - a[k]), 0) / dd,
                ),
              )
            : 0;
          if (
            p.reduce((v, q, k) => v + (q - a[k] - t * d[k]) ** 2, 0) >
            g.radius ** 2
          )
            continue;
          g.removed.add(i);
          s.mask[i] = 0;
          s.topology.voxelCells(x, y, z, cells);
          rect[0] = Math.min(rect[0], x);
          rect[1] = Math.min(rect[1], y);
          rect[2] = Math.max(rect[2], x);
          rect[3] = Math.max(rect[3], y);
        }
    g.last = b.slice();
  }
  if (!cells.size) return null;
  for (let k = 0; k < 4; k++)
    g.rect[k] =
      k < 2 ? Math.min(g.rect[k], rect[k]) : Math.max(g.rect[k], rect[k]);
  // Include cells touched by continuous deformations since the last extraction.
  // Their authoritative voxel mask is retained; re-extraction restores canonical
  // boundaries before welding a topology change into the mesh.
  for (const cell of s.topology.dirty) cells.add(cell);
  const patch = s.topology.remesh(cells);
  return { ...patch, rect, data: readColumns(s.mask, s.dims, rect) };
}

export function scoopItem(s) {
  const g = s.stroke;
  if (!g.removed.size) return null;
  const after = s.topology.patch(g.vertices.keys(), g.triangles.keys());
  const before = {
    ...after,
    positions: after.positions.slice(),
    normals: after.normals.slice(),
    indices: after.indices.slice(),
    cells: after.cells.slice(),
  };
  before.ids.forEach((id, j) => {
    const v = g.vertices.get(id);
    before.positions.set(v.p, j * 3);
    before.normals.set(v.n, j * 3);
  });
  before.triangleIds.forEach((t, j) => {
    const v = g.triangles.get(t);
    before.indices.set(v.indices, j * 3);
    before.cells[j] = v.cell;
  });
  const removed = Uint32Array.from(g.removed);
  const bytes =
    removed.byteLength +
    [...Object.values(before), ...Object.values(after)].reduce(
      (n, v) => n + (v?.byteLength || 0),
      0,
    ) +
    g.dirtyBefore.size * 8;
  return {
    tool: "scoop",
    before,
    after,
    removed,
    rect: g.rect,
    dirtyBefore: g.dirtyBefore,
    bytes,
  };
}

export function scoopRestore(s, item, forward) {
  if (!item) return null;
  const patch = forward ? item.after : item.before;
  s.topology.restore(patch);
  for (const i of item.removed) s.mask[i] = forward ? 0 : 1;
  s.topology.dirty = forward ? new Set() : new Set(item.dirtyBefore);
  return {
    ...patch,
    rect: item.rect,
    data: readColumns(s.mask, s.dims, item.rect),
  };
}
