import { SculptSession } from "./geometry.js";
let session;
self.onmessage = ({ data: m }) => {
  const start = performance.now();
  try {
    let result;
    if (m.type === "init") {
      session = new SculptSession(m.mask, m.dims, m.affine, m.inverse);
      result = {
        positions: session.positions,
        indices: session.indices,
        normals: session.vertexNormals,
      };
    } else if (m.type === "begin")
      result = {
        maxDistance: session.begin(m.center, m.normal, m.radius, m.tool),
      };
    else if (m.type === "move") result = session.move(m.distance);
    else if (m.type === "scoop") result = session.scoop(m.points);
    else if (m.type === "smooth") result = session.smooth(m.amount);
    else if (m.type === "commit") result = session.commit();
    else if (m.type === "cancel") result = session.cancel();
    else if (m.type === "undo") result = session.undo();
    else if (m.type === "redo") result = session.redo();
    else throw new Error("Unknown sculpt command");
    // Structured clone retains worker ownership for exact history and filling.
    self.postMessage({
      id: m.id,
      result,
      history: session.history(),
      ms: performance.now() - start,
    });
  } catch (error) {
    self.postMessage({ id: m.id, error: error.message });
  }
};
