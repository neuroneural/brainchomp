// Closest point on a triangle, including edges and vertices. Barycentric
// coordinates also interpolate the displayed normal at a locked brush anchor.
export function closestTriangle(p, a, b, c) {
  const sub = (a, b) => a.map((v, k) => v - b[k]);
  const dot = (a, b) => a.reduce((n, v, k) => n + v * b[k], 0);
  const ab = sub(b, a),
    ac = sub(c, a),
    ap = sub(p, a);
  const d1 = dot(ab, ap),
    d2 = dot(ac, ap);
  let weights;
  if (d1 <= 0 && d2 <= 0) weights = [1, 0, 0];
  else {
    const bp = sub(p, b),
      d3 = dot(ab, bp),
      d4 = dot(ac, bp);
    if (d3 >= 0 && d4 <= d3) weights = [0, 1, 0];
    else {
      const vc = d1 * d4 - d3 * d2;
      if (vc <= 0 && d1 >= 0 && d3 <= 0) {
        const v = d1 / (d1 - d3);
        weights = [1 - v, v, 0];
      } else {
        const cp = sub(p, c),
          d5 = dot(ab, cp),
          d6 = dot(ac, cp);
        if (d6 >= 0 && d5 <= d6) weights = [0, 0, 1];
        else {
          const vb = d5 * d2 - d1 * d6;
          if (vb <= 0 && d2 >= 0 && d6 <= 0) {
            const w = d2 / (d2 - d6);
            weights = [1 - w, 0, w];
          } else {
            const va = d3 * d6 - d5 * d4;
            if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
              const w = (d4 - d3) / (d4 - d3 + d5 - d6);
              weights = [0, 1 - w, w];
            } else {
              const denom = va + vb + vc;
              if (Math.abs(denom) < 1e-20) return null;
              const v = vb / denom,
                w = vc / denom;
              weights = [1 - v - w, v, w];
            }
          }
        }
      }
    }
  }
  return {
    point: a.map(
      (v, k) => v * weights[0] + b[k] * weights[1] + c[k] * weights[2],
    ),
    weights,
  };
}

export function nearestSurface(point, positions, indices, normals) {
  let best = Infinity,
    hit = null;
  for (let t = 0; t < indices.length; t += 3) {
    const ia = indices[t] * 3,
      ib = indices[t + 1] * 3,
      ic = indices[t + 2] * 3;
    if (ia === ib || ib === ic || ia === ic) continue;
    let bound = 0;
    for (let k = 0; k < 3; k++) {
      const lo = Math.min(
        positions[ia + k],
        positions[ib + k],
        positions[ic + k],
      );
      const hi = Math.max(
        positions[ia + k],
        positions[ib + k],
        positions[ic + k],
      );
      bound += Math.max(lo - point[k], 0, point[k] - hi) ** 2;
    }
    if (bound >= best) continue;
    const candidate = closestTriangle(
      point,
      Array.from(positions.subarray(ia, ia + 3)),
      Array.from(positions.subarray(ib, ib + 3)),
      Array.from(positions.subarray(ic, ic + 3)),
    );
    if (!candidate) continue;
    const d = candidate.point.reduce((n, v, k) => n + (v - point[k]) ** 2, 0);
    if (d >= best) continue;
    best = d;
    const normal = [0, 1, 2].map(
      (k) =>
        candidate.weights[0] * normals[ia + k] +
        candidate.weights[1] * normals[ib + k] +
        candidate.weights[2] * normals[ic + k],
    );
    const length = Math.hypot(...normal) || 1;
    hit = {
      point: candidate.point,
      normal: normal.map((v) => v / length),
      distance: Math.sqrt(d),
    };
  }
  return hit;
}
