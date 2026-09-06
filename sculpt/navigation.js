import { mat3, quat, vec3 } from "gl-matrix";

// Camera-to-world orientation. There is no world-up/pitch clamp: the camera
// can pass over either pole and retain roll, like a virtual trackball.
export function facing(direction, up = [0, 0, 1]) {
  const z = vec3.normalize(vec3.create(), direction);
  let x = vec3.cross(vec3.create(), up, z);
  if (vec3.length(x) < 1e-5) x = vec3.cross(x, [0, 1, 0], z);
  vec3.normalize(x, x);
  const y = vec3.cross(vec3.create(), z, x);
  return quat.normalize(
    quat.create(),
    quat.fromMat3(quat.create(), mat3.fromValues(...x, ...y, ...z)),
  );
}
export function defaultOrientation() {
  return facing([0, -Math.cos(0.2), Math.sin(0.2)]);
}
export function wheelRotation(orientation, dx, dy) {
  const distance = Math.hypot(dx, dy);
  if (!distance) return quat.clone(orientation);
  const delta = quat.setAxisAngle(
    quat.create(),
    [dy / distance, dx / distance, 0],
    distance * 0.006,
  );
  return quat.normalize(
    quat.create(),
    quat.multiply(quat.create(), orientation, delta),
  );
}
export function trackballRotation(orientation, from, to, width, height) {
  const sphere = ([x, y]) => {
    const scale = Math.max(1, Math.min(width, height));
    const p = [(2 * x - width) / scale, (height - 2 * y) / scale, 0],
      r = Math.hypot(p[0], p[1]);
    p[2] = r < Math.SQRT1_2 ? Math.sqrt(1 - r * r) : 0.5 / Math.max(r, 1e-6);
    return vec3.normalize(vec3.create(), p);
  };
  const delta = quat.rotationTo(quat.create(), sphere(to), sphere(from));
  return quat.normalize(
    quat.create(),
    quat.multiply(quat.create(), orientation, delta),
  );
}
