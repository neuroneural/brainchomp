import {
  SurfaceTopology,
  scoopBegin,
  scoopMove,
  scoopRestore,
  scoopItem,
} from "./topology.js";
import {
  transform,
  cross,
  sub,
  dot,
  unit,
  extractSurface,
  normals,
  ColumnVoxelizer,
  readColumns,
  writeColumns,
} from "./surface.js";
export {
  transform,
  cross,
  sub,
  dot,
  unit,
  extractSurface,
  normals,
  ColumnVoxelizer,
  readColumns,
  writeColumns,
} from "./surface.js";

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
    this.topology = new SurfaceTopology(this);
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
    if (tool === "scoop") return scoopBegin(this, center, radius);
    normal = unit(normal);
    const ids = [],
      weights = [],
      before = [],
      beforeNormals = [],
      gradients = [];
    for (let i = 0; i < this.positions.length; i += 3) {
      if (!this.topology.uses[i / 3]) continue;
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
      if (this.triangleCells[t / 3] < 0) continue;
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
    this.topology.markChanged(s.triangles, s.rect, data);
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
    for (let t = 0; t < this.indices.length; t += 3)
      if (this.triangleCells[t / 3] >= 0)
        for (let k = 0; k < 3; k++) offsets[this.indices[t + k] + 1] += 2;
    for (let i = 1; i <= count; i++) offsets[i] += offsets[i - 1];
    const neighbors = new Uint32Array(offsets[count]),
      next = offsets.slice();
    for (let t = 0; t < this.indices.length; t += 3)
      if (this.triangleCells[t / 3] >= 0)
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
  scoop(points) {
    return scoopMove(this, points);
  }
  commit() {
    const s = this.stroke;
    if (!s) return this.history();
    if (s.tool === "scoop") {
      const item = scoopItem(this);
      if (item) this.record(item);
      this.stroke = null;
      return this.history();
    }
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
      this.record(item);
    }
    this.stroke = null;
    return this.history();
  }
  record(item) {
    this.historyBytes -= this.redoStack.reduce((n, h) => n + h.bytes, 0);
    this.redoStack = [];
    this.undoStack.push(item);
    this.historyBytes += item.bytes;
    while (this.historyBytes > this.limit && this.undoStack.length > 1)
      this.historyBytes -= this.undoStack.shift().bytes;
  }
  history() {
    return {
      undo: this.undoStack.length,
      redo: this.redoStack.length,
      historyBytes: this.historyBytes,
    };
  }
  restore(item, forward) {
    if (item.tool === "scoop") return scoopRestore(this, item, forward);
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
    this.topology.markChanged(item.triangles, item.rect, data);
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
    const patch =
      this.stroke.tool === "scoop"
        ? scoopRestore(this, scoopItem(this), false)
        : this.restore(this.stroke, false);
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
