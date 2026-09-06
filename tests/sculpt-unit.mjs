import test from "node:test";
import assert from "node:assert/strict";
import { mat4 } from "gl-matrix";
import {
  extractSurface,
  ColumnVoxelizer,
  SculptSession,
  transform,
} from "../sculpt/geometry.js";
const identity = Array.from(mat4.create());
function sphere() {
  const m = new Uint8Array(32 ** 3);
  for (let z = 0; z < 32; z++)
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++)
        if (Math.hypot(x - 16, y - 16, z - 16) < 10)
          m[x + 32 * (y + 32 * z)] = 1;
  return m;
}
function roundTrip(mask, dims) {
  const mesh = extractSurface(mask, dims);
  const v = new ColumnVoxelizer(mesh.positions, mesh.indices, dims);
  assert.deepEqual(v.fill([0, 0, dims[0] - 1, dims[1] - 1]), mask);
  return mesh;
}
test("round-trip preserves holes, islands, diagonal contacts, and image edges", () => {
  for (let seed = 0; seed < 12; seed++) {
    const dims = [8, 9, 10],
      mask = new Uint8Array(720);
    let n = seed + 1;
    for (let i = 0; i < mask.length; i++) {
      n = (Math.imul(n, 1664525) + 1013904223) >>> 0;
      mask[i] = Number(n / 2 ** 32 > 0.65);
    }
    roundTrip(mask, dims);
  }
  roundTrip(new Uint8Array(720).fill(1), [8, 9, 10]);
  roundTrip(new Uint8Array(720), [8, 9, 10]);
});
test("triangulation is closed and consistently oriented", () => {
  const mesh = roundTrip(sphere(), [32, 32, 32]),
    edges = new Map();
  for (let t = 0; t < mesh.indices.length; t += 3)
    for (let k = 0; k < 3; k++) {
      const a = mesh.indices[t + k],
        b = mesh.indices[t + ((k + 1) % 3)],
        key = `${Math.min(a, b)},${Math.max(a, b)}`;
      const v = edges.get(key) || { count: 0, sum: 0 };
      v.count++;
      v.sum += a < b ? 1 : -1;
      edges.set(key, v);
    }
  for (const v of edges.values()) {
    assert.equal(v.count, 2);
    assert.equal(v.sum, 0);
  }
});
test("grab, cancel, undo and redo restore mesh and mask exactly", () => {
  const original = sphere(),
    s = new SculptSession(original.slice(), [32, 32, 32], identity, identity),
    positions = s.positions.slice();
  s.begin([16, 6.5, 16], [0, -1, 0], 7);
  s.move(1.5);
  s.commit();
  const corrected = s.mask.slice(),
    editedPositions = s.positions.slice();
  assert.notDeepEqual(corrected, original);
  assert.notDeepEqual(editedPositions, positions);
  s.undo();
  assert.deepEqual(s.mask, original);
  assert.deepEqual(s.positions, positions);
  s.redo();
  assert.deepEqual(s.mask, corrected);
  assert.deepEqual(s.positions, editedPositions);
  s.begin([16, 5, 16], [0, -1, 0], 7);
  s.move(-1);
  s.cancel();
  assert.deepEqual(s.mask, corrected);
  assert.deepEqual(s.positions, editedPositions);
});
test("preview is independent of pointer sampling; returning to zero is exact", () => {
  const a = new SculptSession(sphere(), [32, 32, 32], identity, identity),
    b = new SculptSession(sphere(), [32, 32, 32], identity, identity);
  for (const s of [a, b]) s.begin([16, 6.5, 16], [0, -1, 0], 7);
  for (const d of [0.01, 0.3, 1, -0.3, 0.8]) a.move(d);
  b.move(0.8);
  assert.deepEqual(a.positions, b.positions);
  assert.deepEqual(a.mask, b.mask);
  a.move(0);
  assert.deepEqual(a.mask, sphere());
  a.commit();
  assert.equal(a.history().undo, 0);
});
test("physical brush supports reflected anisotropic oblique affine", () => {
  const affine = mat4.fromValues(
      -0.1,
      0.03,
      0,
      0,
      0.02,
      0.2,
      0.02,
      0,
      0,
      0,
      0.4,
      0,
      8,
      -3,
      2,
      1,
    ),
    inverse = mat4.invert(mat4.create(), affine);
  const s = new SculptSession(sphere(), [32, 32, 32], affine, inverse);
  s.begin(transform(affine, [16, 6.5, 16]), [0, -1, 0], 0.8);
  const before = s.stroke.before.slice(),
    ids = s.stroke.ids.slice(),
    weights = s.stroke.weights.slice();
  s.move(0.12);
  ids.forEach((id, j) => {
    const a = transform(affine, before.subarray(j * 3, j * 3 + 3)),
      b = transform(affine, s.positions.subarray(id * 3, id * 3 + 3));
    assert.ok(Math.abs(b[0] - a[0]) < 1e-5);
    assert.ok(Math.abs(b[2] - a[2]) < 1e-5);
    assert.ok(Math.abs(b[1] - a[1] + 0.12 * weights[j]) < 1e-5);
  });
  s.cancel();
  assert.deepEqual(s.mask, sphere());
});
test("successive edits and history branching remain exact", () => {
  const s = new SculptSession(sphere(), [32, 32, 32], identity, identity);
  for (let j = 0; j < 8; j++) {
    s.begin([16, 6 - j * 0.25, 16], [0, -1, 0], 7);
    s.move(0.6);
    s.commit();
  }
  const after = s.mask.slice();
  for (let i = 0; i < 8; i++) s.undo();
  assert.deepEqual(s.mask, sphere());
  for (let i = 0; i < 8; i++) s.redo();
  assert.deepEqual(s.mask, after);
  s.undo();
  s.begin([16, 6, 16], [0, -1, 0], 7);
  s.move(0.01);
  s.cancel();
  assert.equal(s.history().redo, 1);
  s.begin([16, 6, 16], [0, -1, 0], 7);
  s.move(-0.4);
  s.commit();
  assert.equal(s.history().redo, 0);
});
test("invalid edits are rejected and displacement bounded", () => {
  const s = new SculptSession(sphere(), [32, 32, 32], identity, identity);
  assert.throws(() => s.begin([1, 1, 1], [1, 0, 0], 0));
  s.begin([16, 6.5, 16], [0, -1, 0], 7);
  assert.throws(() => s.move(NaN));
  assert.equal(s.move(100).distance, 1.75);
  s.cancel();
  assert.deepEqual(s.mask, sphere());
});

test("image-edge edits are rejected and cancellable without losing voxels", () => {
  const mask = new Uint8Array(8 ** 3).fill(1),
    s = new SculptSession(mask.slice(), [8, 8, 8], identity, identity);
  const original = s.positions.slice();
  s.begin([-0.5, 4, 4], [-1, 0, 0], 3);
  assert.throws(() => s.move(0.2), /leave the image/);
  s.cancel();
  assert.deepEqual(s.mask, mask);
  assert.deepEqual(s.positions, original);
});

import { drawingLayout } from "../sculpt/slices.js";
test("slice adapter maps all 48 storage orientations bijectively", () => {
  const dims = [3, 4, 5],
    perms = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ];
  for (const p of perms)
    for (let flips = 0; flips < 8; flips++) {
      const perm = p.map((axis, k) => axis * (flips & (1 << k) ? -1 : 1));
      const { offset, strides } = drawingLayout(dims, perm),
        seen = new Set();
      for (let z = 0; z < 5; z++)
        for (let y = 0; y < 4; y++)
          for (let x = 0; x < 3; x++) {
            const coord = [x, y, z],
              ras = perm.map((axis) =>
                axis > 0
                  ? coord[axis - 1]
                  : dims[-axis - 1] - 1 - coord[-axis - 1],
              );
            const rd = perm.map((axis) => dims[Math.abs(axis) - 1]);
            const expected = ras[0] + rd[0] * (ras[1] + rd[1] * ras[2]);
            const actual =
              offset + x * strides[0] + y * strides[1] + z * strides[2];
            assert.equal(actual, expected);
            seen.add(actual);
          }
      assert.equal(seen.size, 60);
    }
});

test("deformed shading normals and undo remain exact", () => {
  const s = new SculptSession(sphere(), [32, 32, 32], identity, identity),
    original = s.vertexNormals.slice();
  s.begin([16, 6.5, 16], [0, -1, 0], 7);
  s.move(1);
  const corrected = s.vertexNormals.slice();
  assert.notDeepEqual(corrected, original);
  for (let i = 0; i < corrected.length; i += 3)
    assert.ok(Math.abs(Math.hypot(...corrected.subarray(i, i + 3)) - 1) < 1e-6);
  s.commit();
  s.undo();
  assert.deepEqual(s.vertexNormals, original);
  s.redo();
  assert.deepEqual(s.vertexNormals, corrected);
});

test("local smoothing reduces a thin spike and is exactly undoable", () => {
  const original = sphere();
  for (let y = 2; y < 9; y++) original[16 + 32 * (y + 32 * 16)] = 1;
  const s = new SculptSession(
    original.slice(),
    [32, 32, 32],
    identity,
    identity,
  );
  const before = s.positions.slice(),
    normalBefore = s.vertexNormals.slice();
  s.begin([16, 3, 16], [0, -1, 0], 7, "smooth");
  const selected = new Set(s.stroke.ids);
  const minY = (positions) =>
    Math.min(...Array.from(selected, (id) => positions[id * 3 + 1]));
  const tipBefore = minY(before);
  s.smooth(1);
  assert.ok(
    minY(s.positions) > tipBefore + 0.1,
    "the tip must retract, not merely change shading",
  );
  assert.notDeepEqual(s.mask, original);
  for (let id = 0; id < before.length / 3; id++)
    if (!selected.has(id))
      assert.deepEqual(
        s.positions.subarray(id * 3, id * 3 + 3),
        before.subarray(id * 3, id * 3 + 3),
      );
  const after = s.positions.slice(),
    maskAfter = s.mask.slice(),
    normalAfter = s.vertexNormals.slice();
  s.commit();
  s.undo();
  assert.deepEqual(s.positions, before);
  assert.deepEqual(s.mask, original);
  assert.deepEqual(s.vertexNormals, normalBefore);
  s.redo();
  assert.deepEqual(s.positions, after);
  assert.deepEqual(s.mask, maskAfter);
  assert.deepEqual(s.vertexNormals, normalAfter);
});
test("smoothing is independent of preview frequency and cancellation restores it", () => {
  const a = new SculptSession(sphere(), [32, 32, 32], identity, identity),
    b = new SculptSession(sphere(), [32, 32, 32], identity, identity);
  for (const s of [a, b]) s.begin([16, 6.5, 16], [0, -1, 0], 7, "smooth");
  const before = a.positions.slice(),
    normalBefore = a.vertexNormals.slice();
  a.smooth(0.2);
  a.smooth(0.8);
  a.smooth(0.5);
  b.smooth(0.5);
  assert.deepEqual(a.positions, b.positions);
  assert.deepEqual(a.mask, b.mask);
  assert.deepEqual(a.vertexNormals, b.vertexNormals);
  a.cancel();
  assert.deepEqual(a.mask, sphere());
  assert.deepEqual(a.positions, before);
  assert.deepEqual(a.vertexNormals, normalBefore);
});

import { quat, vec3 } from "gl-matrix";
import {
  defaultOrientation,
  wheelRotation,
  trackballRotation,
} from "../sculpt/navigation.js";
test("free rotation crosses the poles and completes a full revolution", () => {
  const initial = defaultOrientation(),
    up = vec3.transformQuat(vec3.create(), [0, 1, 0], initial);
  let q = initial;
  for (let i = 0; i < 60; i++) q = wheelRotation(q, 0, Math.PI / (0.006 * 60));
  const flippedUp = vec3.transformQuat(vec3.create(), [0, 1, 0], q);
  assert.ok(
    vec3.dot(up, flippedUp) < -0.9999,
    "camera must invert instead of stopping at a pitch limit",
  );
  for (let i = 0; i < 60; i++) q = wheelRotation(q, 0, Math.PI / (0.006 * 60));
  assert.ok(Math.abs(quat.dot(q, initial)) > 0.99999);
  assert.ok(Math.abs(quat.length(q) - 1) < 1e-6);
});
test("off-center trackball drags include roll and remain reversible", () => {
  const initial = defaultOrientation(),
    a = [150, 100],
    b = [450, 150];
  const moved = trackballRotation(initial, a, b, 600, 600),
    restored = trackballRotation(moved, b, a, 600, 600);
  const local = quat.multiply(
    quat.create(),
    quat.invert(quat.create(), initial),
    moved,
  );
  assert.ok(Math.abs(local[2]) > 0.01, "edge drag should produce roll");
  assert.ok(Math.abs(quat.dot(initial, restored)) > 0.99999);
});

function filledSession(s) {
  return s.voxelizer.fill([0, 0, s.dims[0] - 1, s.dims[1] - 1]);
}
function activeMesh(s) {
  return Array.from(s.indices)
    .filter((_, i) => s.triangleCells[Math.floor(i / 3)] >= 0)
    .map((id) => Array.from(s.positions.subarray(id * 3, id * 3 + 3)))
    .flat();
}
test("scoop removes a swept sphere, welds closed boundaries, and restores mixed history", () => {
  const s = new SculptSession(sphere(), [32, 32, 32], identity, identity);
  s.begin([25.5, 16, 16], [1, 0, 0], 5);
  s.move(0.6);
  s.commit();
  const before = s.mask.slice(),
    mesh = activeMesh(s);
  s.begin([25, 16, 16], [1, 0, 0], 3, "scoop");
  s.scoop([
    [25, 16, 16],
    [25, 20, 16],
  ]);
  assert.ok(
    s.mask.reduce((a, b) => a + b, 0) < before.reduce((a, b) => a + b, 0),
  );
  assert.deepEqual(filledSession(s), s.mask);
  s.commit();
  const after = s.mask.slice(),
    afterMesh = activeMesh(s);
  s.undo();
  assert.deepEqual(s.mask, before);
  assert.deepEqual(activeMesh(s), mesh);
  s.redo();
  assert.deepEqual(s.mask, after);
  assert.deepEqual(activeMesh(s), afterMesh);
  s.begin([16, 16, 25.5], [0, 0, 1], 4);
  s.move(0.4);
  s.commit();
  assert.deepEqual(filledSession(s), s.mask);
  s.undo();
  s.undo();
  assert.deepEqual(s.mask, before);
  assert.deepEqual(activeMesh(s), mesh);
});
test("scoop path samples, cancellation, empty cuts and complete removal are exact", () => {
  const a = new SculptSession(sphere(), [32, 32, 32], identity, identity);
  const b = new SculptSession(sphere(), [32, 32, 32], identity, identity);
  for (const s of [a, b]) s.begin([25, 12, 16], [1, 0, 0], 3, "scoop");
  a.scoop([[25, 22, 16]]);
  for (let y = 12; y <= 22; y++) b.scoop([[25, y, 16]]);
  assert.deepEqual(a.mask, b.mask);
  assert.deepEqual(filledSession(b), b.mask);
  a.cancel();
  b.cancel();
  assert.deepEqual(a.mask, sphere());
  assert.deepEqual(filledSession(b), sphere());
  a.begin([100, 100, 100], [1, 0, 0], 1, "scoop");
  assert.equal(a.scoop([[100, 100, 100]]), null);
  a.commit();
  assert.equal(a.history().undo, 0);
  a.begin([16, 16, 16], [1, 0, 0], 30, "scoop");
  a.scoop([[16, 16, 16]]);
  a.commit();
  assert.equal(a.mask.some(Boolean), false);
  assert.deepEqual(filledSession(a), a.mask);
  a.undo();
  assert.deepEqual(a.mask, sphere());
  assert.deepEqual(filledSession(a), a.mask);
});
test("scoop uses millimeters under reflected oblique anisotropic affines", () => {
  const affine = mat4.fromValues(
    -2,
    0.2,
    0,
    0,
    0.3,
    1.1,
    0,
    0,
    0,
    0.1,
    3,
    0,
    10,
    -4,
    8,
    1,
  );
  const inverse = mat4.invert(mat4.create(), affine),
    mask = sphere();
  const s = new SculptSession(mask.slice(), [32, 32, 32], affine, inverse);
  const center = transform(affine, [24, 16, 16]),
    radius = 5;
  s.begin(center, [1, 0, 0], radius, "scoop");
  s.scoop([center]);
  for (let z = 0; z < 32; z++)
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++) {
        const i = x + 32 * (y + 32 * z),
          p = transform(affine, [x, y, z]);
        const outside = Math.hypot(...p.map((v, k) => v - center[k])) > radius;
        assert.equal(s.mask[i], Number(mask[i] && outside));
      }
  assert.deepEqual(filledSession(s), s.mask);
});

import { closestTriangle, nearestSurface } from "../sculpt/targeting.js";
test("locked target uses the closest triangle point, including interior and edges", () => {
  assert.deepEqual(
    closestTriangle([2, 2, 5], [0, 0, 0], [10, 0, 0], [0, 10, 0]).point,
    [2, 2, 0],
  );
  assert.deepEqual(
    closestTriangle([6, 6, 0], [0, 0, 0], [10, 0, 0], [0, 10, 0]).point,
    [5, 5, 0],
  );
  const positions = new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 20]);
  const ns = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
  const hit = nearestSurface(
    [2, 2, 1],
    positions,
    new Uint32Array([0, 0, 0, 0, 1, 2]),
    ns,
  );
  assert.deepEqual(hit.point, [2, 2, 0]);
  assert.equal(hit.distance, 1);
  assert.equal(
    nearestSurface([0, 0, 0], positions, new Uint32Array([0, 0, 0]), ns),
    null,
  );
});
test("cutting an image-edge bridge changes topology with exact cancellation and branching", () => {
  const dims = [16, 16, 16],
    m = new Uint8Array(4096);
  for (let z = 0; z < 16; z++)
    for (let y = 0; y < 16; y++)
      for (let x = 0; x < 16; x++)
        m[x + 16 * (y + 16 * z)] = Number(
          ((x < 5 || x > 10) && y < 10 && z < 10) || (y === 5 && z === 5),
        );
  const s = new SculptSession(m.slice(), dims, identity, identity),
    original = activeMesh(s);
  s.begin([8, 5, 5], [1, 0, 0], 2, "scoop");
  s.scoop([[8, 5, 5]]);
  s.commit();
  assert.equal(s.mask[8 + 16 * (5 + 16 * 5)], 0);
  assert.deepEqual(filledSession(s), s.mask);
  s.undo();
  assert.deepEqual(activeMesh(s), original);
  s.begin([0, 0, 0], [1, 0, 0], 3, "scoop");
  s.scoop([[0, 0, 0]]);
  s.commit();
  assert.equal(s.history().redo, 0);
  assert.deepEqual(filledSession(s), s.mask);
  s.begin([11, 4, 4], [1, 0, 0], 2, "smooth");
  s.smooth(0.2);
  s.cancel();
  s.undo();
  assert.deepEqual(s.mask, m);
  assert.deepEqual(activeMesh(s), original);
});

test("an interior locked scoop grows mesh buffers and restores an enclosed cavity exactly", () => {
  const s = new SculptSession(sphere(), [32, 32, 32], identity, identity);
  const mesh = activeMesh(s),
    capacity = s.indices.length;
  s.begin([16, 16, 16], [1, 0, 0], 3, "scoop");
  const patch = s.scoop([[16, 16, 16]]);
  assert.ok(patch.indexLength > capacity);
  assert.equal(s.mask[16 + 32 * (16 + 32 * 16)], 0);
  assert.deepEqual(filledSession(s), s.mask);
  s.commit();
  s.undo();
  assert.deepEqual(s.mask, sphere());
  assert.deepEqual(activeMesh(s), mesh);
  s.redo();
  assert.deepEqual(filledSession(s), s.mask);
  s.begin([16, 16, 16], [1, 0, 0], 3, "scoop");
  s.scoop([[26, 16, 16]]);
  s.commit();
  assert.deepEqual(filledSession(s), s.mask);
  s.undo();
  s.undo();
  assert.deepEqual(activeMesh(s), mesh);
});
