import { mat4 } from "gl-matrix";
import { MaskSliceAdapter, SliceFootprint } from "./slices.js";
import { SurfaceRenderer } from "./renderer.js";
import { writeColumns } from "./geometry.js";
import "./sculpt.css";

// Owns interaction and worker lifetime. The application owns the authoritative
// mask and derived outputs, supplied through onPatch; the renderer never saves.
export function installSculptEditor({
  nv,
  getState,
  prepare,
  onPatch,
  onError,
}) {
  const button = document.getElementById("sculptBtn");
  const host = document.getElementById("canvas-container");
  const panel = document.createElement("section");
  panel.id = "sculpt-panel";
  panel.hidden = true;
  panel.innerHTML = `<div class="sculpt-bar"><strong>Sculpt mask</strong><div class="sculpt-modes" role="group" aria-label="Surface interaction"><button type="button" data-mode="grab" aria-pressed="true">Grab</button><button type="button" data-mode="smooth" aria-pressed="false">Smooth</button><button type="button" data-mode="scoop" aria-pressed="false">Scoop</button><button type="button" data-mode="rotate" aria-pressed="false">Rotate</button></div><button type="button" data-action="undo" title="Undo (Ctrl/⌘ Z)" disabled>Undo</button><button type="button" data-action="redo" title="Redo (Ctrl/⌘ Shift Z)" disabled>Redo</button><button type="button" data-action="done">Done</button></div><div class="sculpt-size"><label>Size <input aria-label="Brush radius" type="range" min="1" max="100" value="35"/><output></output></label><button type="button" data-action="focus" title="Bring the surface nearest the slice crosshair forward">Focus slice</button><button type="button" data-action="reset">Reset view</button></div><div class="sculpt-target"><label><input type="checkbox" data-control="lock"/> Lock to slice crosshair</label><label>Crosshair <input type="range" aria-label="Crosshair opacity" min="0" max="100" value="45"/><output data-opacity>45%</output></label><span class="sculpt-anchor"></span></div><div class="sculpt-viewport"><canvas class="sculpt-surface" aria-label="Brain mask sculpting surface" tabindex="0"></canvas><canvas class="sculpt-cursor" aria-hidden="true"></canvas></div><p class="sculpt-help">Drag the ring along its normal. Facing you: drag up to pull, down to push. Two-finger scroll or right-drag rotates. Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.</p><p class="sculpt-status" role="status" aria-live="polite"></p>`;
  host.append(panel);
  const canvas = panel.querySelector(".sculpt-surface"),
    overlay = panel.querySelector(".sculpt-cursor");
  const slider = panel.querySelector("input"),
    output = panel.querySelector("output"),
    status = panel.querySelector(".sculpt-status");
  const help = panel.querySelector(".sculpt-help");
  const lockBrush = panel.querySelector('[data-control="lock"]');
  const opacity = panel.querySelector('[aria-label="Crosshair opacity"]');
  const anchorLabel = panel.querySelector(".sculpt-anchor");
  let footprint = null,
    lockedHit = null,
    anchorCache = null;
  opacity.oninput = () => {
    panel.querySelector("[data-opacity]").textContent = `${opacity.value}%`;
    if (renderer) {
      renderer.crosshairOpacity = Number(opacity.value) / 100;
      renderer.drawCursor();
    }
  };
  const refreshLock = () => {
    if (!renderer || !active || busy) return;
    lockedHit = null;
    if (lockBrush.checked && mode !== "rotate") {
      const point = renderer.crosshair;
      const key = point.join(",") + ":" + (renderer.revision || 0);
      if (anchorCache?.renderer !== renderer || anchorCache.key !== key)
        anchorCache = { renderer, key, hit: renderer.nearest(point) };
      const nearest = anchorCache.hit;
      lockedHit =
        mode === "scoop"
          ? {
              point: point.slice(),
              normal: nearest?.normal || renderer.direction,
            }
          : nearest;
      anchorLabel.textContent =
        mode === "scoop"
          ? "Scoop center is the exact slice point."
          : nearest
            ? `Surface anchor ${Number(
                nearest.distance.toPrecision(2),
              )} mm from slice point.`
            : "No surface remains; undo to restore it.";
      renderer.cursor = lockedHit
        ? { ...lockedHit, radius, tool: mode, locked: true }
        : null;
    } else {
      anchorLabel.textContent = "";
      renderer.cursor = null;
    }
    panel.dataset.anchor = lockedHit?.point.join(",") || "";
    renderer.drawCursor();
  };
  lockBrush.onchange = refreshLock;
  const actions = Object.fromEntries(
    [...panel.querySelectorAll("[data-action]")].map((b) => [
      b.dataset.action,
      b,
    ]),
  );
  const lockedIds = [
    "modelRunButton",
    "sampleSelect",
    "maskToggle",
    "drawBtn",
    "modelSelect",
  ];
  const originalDisabled = new Map();
  let worker = null,
    renderer = null,
    pending = new Map(),
    sequence = 0;
  let active = false,
    busy = false,
    mode = "grab",
    gesture = null,
    frame = 0,
    oldOptions = null,
    state = null,
    radius = 1,
    history = { undo: 0, redo: 0 };
  let sessionGeneration = 0,
    slices = null;
  const controls = () => {
    button.disabled = !getState() || (!active && getState()?.running) || busy;
    button.setAttribute("aria-pressed", String(active));
    button.title = !getState()
      ? "Run Skull-strip first to enable sculpting"
      : "Sculpt the brain mask";
    actions.undo.disabled = busy || !history.undo;
    actions.redo.disabled = busy || !history.redo;
    actions.done.disabled = busy;
    actions.focus.disabled = busy;
    actions.reset.disabled = busy;
    slider.disabled = busy;
    lockBrush.disabled = busy;
    panel.querySelectorAll("[data-mode]").forEach((b) => (b.disabled = busy));
    // A save during a stroke could otherwise race the latest voxel preview.
    for (const id of ["saveBtn", "saveStatsBtn"]) {
      const el = document.getElementById(id);
      if (el) el.disabled = active && busy;
    }
  };
  const setBusy = (value) => {
    busy = value;
    controls();
  };
  const rpc = (type, data = {}) =>
    new Promise((resolve, reject) => {
      if (!worker) {
        reject(new Error("Editing session was closed."));
        return;
      }
      const id = ++sequence;
      pending.set(id, { resolve, reject });
      worker.postMessage({ id, type, ...data });
    });
  const changeRadius = () => {
    radius =
      state.minRadius +
      ((state.maxRadius - state.minRadius) * (Number(slider.value) - 1)) / 99;
    output.textContent = `${Number(radius.toPrecision(3))} mm`;
    if (renderer?.cursor) {
      renderer.cursor.radius = radius;
      renderer.drawCursor();
    }
  };
  slider.oninput = changeRadius;
  function lock(value) {
    for (const id of lockedIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (value) {
        originalDisabled.set(id, el.disabled);
        el.disabled = true;
      } else if (originalDisabled.has(id)) {
        el.disabled = originalDisabled.get(id);
      }
    }
    if (!value) originalDisabled.clear();
  }
  const syncCrosshair = () => {
    if (!active || !renderer) return;
    renderer.crosshair = Array.from(nv.frac2mm(nv.scene.crosshairPos)).slice(
      0,
      3,
    );
    panel.dataset.crosshair = renderer.crosshair.join(",");
    refreshLock();
    renderer.drawCursor();
  };
  const onLocationChange = nv.onLocationChange;
  nv.onLocationChange = function (data) {
    onLocationChange?.call(nv, data);
    syncCrosshair();
  };
  const recenter = (point) => {
    nv.scene.crosshairPos = Array.from(nv.mm2frac(point)).map((v) =>
      Math.max(0, Math.min(1, v)),
    );
    nv.createOnLocationChange();
  };
  const apply = (patch) => {
    if (!patch) return;
    renderer.patch(patch);
    writeColumns(state.mask, state.dims, patch.rect, patch.data);
    onPatch(patch); // refresh derived output values before publishing this revision
    slices.patch(patch);
  };
  const report = (error) => {
    status.textContent = error.message || String(error);
    console.error("Sculpt:", error);
  };
  async function open() {
    if (active || !getState()) return;
    if (nv.drawBitmap?.some((v) => v !== 0)) {
      onError(
        new Error("Apply or clear the current drawing before opening Sculpt."),
      );
      return;
    }
    active = true;
    panel.hidden = false;
    host.classList.add("sculpting");
    lock(true);
    setBusy(true);
    oldOptions = {
      sliceType: nv.opts.sliceType,
      multiplanarForceRender: nv.opts.multiplanarForceRender,
      multiplanarShowRender: nv.opts.multiplanarShowRender,
    };
    nv.setDrawingEnabled(false);
    nv.closeDrawing();
    nv.opts.multiplanarForceRender = false;
    nv.opts.multiplanarShowRender = 0;
    nv.setSliceType(nv.sliceTypeMultiplanar);
    nv.resizeListener();
    const generation = sessionGeneration;
    try {
      await prepare();
      if (generation !== sessionGeneration) return;
      slices = new MaskSliceAdapter(nv);
      footprint = new SliceFootprint(nv);
      if (!worker) {
        status.textContent = "Building the editable surface…";
        const source = getState(),
          affine = new Float32Array(16);
        for (let r = 0; r < 4; r++)
          for (let c = 0; c < 4; c++) affine[c * 4 + r] = source.affine[r][c];
        const inverse = mat4.invert(mat4.create(), affine);
        if (!inverse) throw new Error("Image geometry has a singular affine.");
        const spacings = [0, 4, 8].map((i) =>
          Math.hypot(affine[i], affine[i + 1], affine[i + 2]),
        );
        state = {
          ...source,
          affine,
          inverse,
          minRadius: Math.min(...spacings) * 2,
          maxRadius:
            Math.min(...source.dims.map((n, i) => n * spacings[i])) * 0.16,
        };
        state.maxRadius = Math.max(state.minRadius * 2, state.maxRadius);
        changeRadius();
        worker = new Worker(new URL("./worker.js", import.meta.url), {
          type: "module",
        });
        worker.onmessage = ({ data: m }) => {
          const p = pending.get(m.id);
          if (!p) return;
          pending.delete(m.id);
          if (m.error) p.reject(new Error(m.error));
          else {
            history = m.history;
            p.resolve(m);
          }
        };
        worker.onerror = (e) => {
          for (const p of pending.values())
            p.reject(new Error(e.message || "Surface worker failed."));
          pending.clear();
        };
        const { result, ms } = await rpc("init", {
          mask: source.mask,
          dims: source.dims,
          affine,
          inverse,
        });
        if (generation !== sessionGeneration) return;
        renderer = new SurfaceRenderer(canvas, overlay, result, affine);
        renderer.crosshairOpacity = Number(opacity.value) / 100;
        renderer.onCursorChange = (cursor) => footprint?.set(cursor);
        syncCrosshair();
        panel.dataset.triangles = String(result.indices.length / 3);
        panel.dataset.buildMs = String(Math.round(ms));
        status.textContent =
          "Ready · hover over the surface to place the grab.";
      } else {
        syncCrosshair();
        renderer.draw();
        status.textContent = "Ready · corrections and undo history retained.";
      }
    } catch (error) {
      if (generation === sessionGeneration) {
        report(error);
        invalidate();
        onError(error);
      }
    } finally {
      if (generation === sessionGeneration) {
        setBusy(false);
        refreshLock();
      }
    }
  }
  function close() {
    if (!active || busy) return;
    active = false;
    gesture = null;
    footprint?.close();
    footprint = null;
    slices?.close();
    slices = null;
    cancelAnimationFrame(frame);
    panel.hidden = true;
    host.classList.remove("sculpting");
    if (oldOptions) Object.assign(nv.opts, oldOptions);
    lock(false);
    nv.resizeListener();
    controls();
  }
  function invalidate() {
    sessionGeneration++;
    busy = false;
    close();
    worker?.terminate();
    worker = null;
    renderer?.dispose();
    renderer = null;
    state = null;
    history = { undo: 0, redo: 0 };
    for (const p of pending.values())
      p.reject(new Error("Editing session was replaced."));
    pending.clear();
    controls();
  }
  button.onclick = () => {
    if (active) close();
    else void open();
  };
  actions.done.onclick = close;
  panel.querySelectorAll("[data-mode]").forEach(
    (b) =>
      (b.onclick = () => {
        mode = b.dataset.mode;
        help.textContent =
          (mode === "smooth"
            ? "Smooth: click to soften the patch; drag upward for more. "
            : mode === "grab"
              ? "Grab: drag along the normal; facing you, up pulls and down pushes. "
              : mode === "scoop"
                ? "Scoop: click to erase a sphere; drag to sweep at fixed depth. Lock to slices for an exact center. "
                : "Drag to freely rotate. ") +
          "Two-finger scroll or right-drag rotates; Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.";
        panel
          .querySelectorAll("[data-mode]")
          .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        canvas.style.cursor = mode === "rotate" ? "grab" : "crosshair";
        renderer.cursor = null;
        refreshLock();
        renderer.drawCursor();
      }),
  );
  async function historyAction(type) {
    if (busy || !renderer) return;
    setBusy(true);
    const generation = sessionGeneration;
    try {
      const { result } = await rpc(type);
      if (generation !== sessionGeneration) return;
      apply(result);
      renderer.draw();
      status.textContent =
        type === "undo" ? "Correction undone." : "Correction restored.";
    } catch (error) {
      if (generation === sessionGeneration) report(error);
    } finally {
      if (generation === sessionGeneration) {
        setBusy(false);
        refreshLock();
      }
    }
  }
  actions.undo.onclick = () => historyAction("undo");
  actions.redo.onclick = () => historyAction("redo");
  const focus = () => {
    if (!active || busy || !renderer) return;
    const picked = renderer.focus(
      Array.from(nv.frac2mm(nv.scene.crosshairPos)),
    );
    if (!picked) return;
    renderer.cursor.radius = radius;
    if (lockBrush.checked) refreshLock();
    renderer.drawCursor();
    status.textContent = "Nearest surface to the slice crosshair highlighted.";
    return picked;
  };
  actions.focus.onclick = focus;
  actions.reset.onclick = () => {
    renderer?.resetView();
    refreshLock();
  };
  nv.gl.canvas.addEventListener("dblclick", () => {
    if (active) requestAnimationFrame(focus);
  });
  // Prevent replacing the volume while an editing session owns its geometry.
  for (const event of ["drop", "dragover"])
    nv.gl.canvas.addEventListener(
      event,
      (e) => {
        if (active) {
          e.preventDefault();
          e.stopImmediatePropagation();
          status.textContent = "Choose Done before loading another image.";
        }
      },
      true,
    );
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  canvas.addEventListener("webglcontextlost", async (e) => {
    e.preventDefault();
    // Ignore in-flight previews, then roll back the stroke in voxel space.
    // No renderer calls are made against the lost graphics context.
    sessionGeneration++;
    setBusy(true);
    try {
      if (gesture?.kind === "grab") {
        const { result } = await rpc("cancel");
        if (result && state) {
          writeColumns(state.mask, state.dims, result.rect, result.data);
          onPatch(result);
          slices?.patch(result);
        }
      }
    } catch (error) {
      report(error);
    } finally {
      invalidate();
      onError(
        new Error(
          "The sculpting graphics context was lost. Accepted corrections are retained; reopen Sculpt after graphics recovers.",
        ),
      );
    }
  });
  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (!renderer || busy) return;
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? canvas.clientHeight : 1;
      const dx = e.deltaX * unit,
        dy = e.deltaY * unit;
      // macOS trackpad scrolling is a wheel event. Native pinch commonly
      // arrives with ctrlKey; keep that gesture as zoom as well.
      if (e.altKey || e.metaKey || e.ctrlKey) {
        renderer.scale = Math.max(
          renderer.initialScale * 0.15,
          Math.min(
            renderer.initialScale * 3,
            renderer.scale * Math.exp(dy * 0.001),
          ),
        );
        renderer.draw();
      } else renderer.orbit(dx, dy);
      if (lockBrush.checked) refreshLock();
    },
    { passive: false },
  );
  const hover = (e) => {
    if (!renderer || busy) return;
    if (lockBrush.checked && mode !== "rotate") {
      renderer.cursor = lockedHit
        ? { ...lockedHit, radius, tool: mode, locked: true }
        : null;
      renderer.drawCursor();
      return;
    }
    const hit = mode !== "rotate" ? renderer.pick(e.clientX, e.clientY) : null;
    renderer.cursor = hit ? { ...hit, radius, tool: mode } : null;
    renderer.drawCursor();
  };
  canvas.addEventListener("pointerleave", () => {
    if (!gesture && renderer && !lockBrush.checked) {
      renderer.cursor = null;
      renderer.drawCursor();
    }
  });
  canvas.addEventListener("pointerdown", async (e) => {
    if (!renderer || busy || gesture || ![0, 2].includes(e.button)) return;
    e.preventDefault();
    canvas.focus();
    canvas.setPointerCapture(e.pointerId);
    if (mode === "rotate" || e.button === 2 || e.shiftKey) {
      gesture = { kind: "rotate", id: e.pointerId, x: e.clientX, y: e.clientY };
      renderer.cursor = null;
      renderer.drawCursor();
      return;
    }
    const hit = lockBrush.checked
      ? lockedHit
      : renderer.pick(e.clientX, e.clientY);
    if (!hit) return;
    const a = renderer.project(hit.point),
      b = renderer.project(hit.point.map((v, i) => v + hit.normal[i]));
    const ratio = canvas.width / canvas.clientWidth,
      dx = (b[0] - a[0]) / ratio,
      dy = (b[1] - a[1]) / ratio,
      length = Math.hypot(dx, dy);
    const worldPerPixel = (2 * renderer.scale) / canvas.clientHeight;
    const direction =
      length * worldPerPixel > 0.2 ? [dx / length, dy / length] : [0, -1];
    const g = {
      kind: "grab",
      tool: mode,
      id: e.pointerId,
      hit,
      x: e.clientX,
      y: e.clientY,
      direction,
      worldPerPixel,
      wanted: mode === "smooth" ? 0.35 : 0,
      shown: 0,
      points: mode === "scoop" ? [hit.point.slice()] : [],
      screenStart: renderer.screenPoint(e.clientX, e.clientY, hit.point),
      sliceOrigin: renderer.crosshair.slice(),
      starting: true,
      running: false,
      ended: false,
      cancelled: false,
      generation: sessionGeneration,
    };
    gesture = g;
    setBusy(true);
    renderer.cursor = { ...hit, radius, tool: g.tool, origin: hit.point };
    if (!lockBrush.checked) recenter(hit.point);
    nv.drawScene();
    renderer.drawCursor();
    status.textContent =
      g.tool === "smooth"
        ? "Softening this patch · drag upward for more; Escape cancels."
        : g.tool === "scoop"
          ? "Scoop removes the orange sphere · drag to sweep; Escape cancels."
          : "Drag to move the boundary · Escape cancels this grab.";
    try {
      const { result, ms } = await rpc("begin", {
        center: hit.point,
        normal: hit.normal,
        tool: g.tool,
        radius,
      });
      panel.dataset.beginMs = String(Math.round(ms));
      g.max = g.tool === "smooth" ? 1 : result.maxDistance;
      g.starting = false;
      void pump(g);
    } catch (error) {
      if (g.generation === sessionGeneration) {
        report(error);
        gesture = null;
        setBusy(false);
        refreshLock();
      }
    }
  });
  async function pump(g) {
    if (g.starting || g.running || g.generation !== sessionGeneration) return;
    g.running = true;
    try {
      while (
        !g.cancelled &&
        (g.tool === "scoop" ? g.points.length : g.wanted !== g.shown)
      ) {
        if (g.tool === "scoop") {
          const points = g.points.splice(0, 64),
            start = performance.now();
          const { result, ms } = await rpc("scoop", { points });
          if (g.generation !== sessionGeneration) return;
          apply(result);
          const point = points[points.length - 1];
          recenter(point);
          renderer.cursor = {
            point,
            normal: g.hit.normal,
            radius,
            tool: "scoop",
            locked: lockBrush.checked,
          };
          renderer.draw();
          panel.dataset.previewMs = String(
            Math.round(performance.now() - start),
          );
          panel.dataset.workerMs = String(Math.round(ms));
          status.textContent =
            "Scooping · release to keep; Escape restores the whole stroke.";
          continue;
        }
        const distance = Math.max(
          g.tool === "smooth" ? 0 : -g.max,
          Math.min(g.max, g.wanted),
        );
        g.wanted = distance;
        const start = performance.now(),
          { result, ms: workerMs } = await rpc(
            g.tool === "smooth" ? "smooth" : "move",
            g.tool === "smooth" ? { amount: distance } : { distance },
          );
        if (g.generation !== sessionGeneration) return;
        g.shown = distance;
        const point =
          g.tool === "smooth"
            ? g.hit.point
            : g.hit.point.map((v, i) => v + g.hit.normal[i] * distance);
        recenter(point);
        apply(result);
        renderer.cursor = {
          point,
          normal: g.hit.normal,
          tool: g.tool,
          radius,
          origin: g.hit.point,
        };
        renderer.draw();
        const elapsed = performance.now() - start;
        status.textContent =
          g.tool === "smooth"
            ? "Smoothing this patch · release to keep, Escape to cancel."
            : `${distance >= 0 ? "+" : ""}${Number(
                distance.toPrecision(3),
              )} mm${
                Math.abs(distance) >= g.max
                  ? " · release and grab again to move farther"
                  : ""
              }`;
        panel.dataset.previewMs = String(Math.round(elapsed));
        panel.dataset.workerMs = String(Math.round(workerMs));
      }
      if (g.ended) {
        const { result, ms } = await rpc(g.cancelled ? "cancel" : "commit");
        panel.dataset.commitMs = String(Math.round(ms));
        if (g.generation !== sessionGeneration) return;
        if (g.cancelled) {
          apply(result);
          recenter(g.sliceOrigin);
          nv.drawScene();
          renderer.cursor = { ...g.hit, radius, tool: g.tool };
          status.textContent = "Correction cancelled.";
        } else {
          status.textContent =
            "Correction applied · inspect the slices, then rotate or grab again.";
        }
        renderer.draw();
        gesture = null;
        setBusy(false);
        refreshLock();
      }
    } catch (error) {
      if (g.generation === sessionGeneration) {
        // Restore both representations, including any successful earlier preview.
        try {
          const { result } = await rpc("cancel");
          apply(result);
          recenter(g.sliceOrigin);
          nv.drawScene();
          renderer.draw();
        } catch (rollbackError) {
          invalidate();
          onError(rollbackError);
        }
        gesture = null;
        setBusy(false);
        refreshLock();
        report(error);
      }
    } finally {
      g.running = false;
    }
  }
  canvas.addEventListener("pointermove", (e) => {
    const g = gesture;
    if (g?.id === e.pointerId) {
      if (g.kind === "rotate") {
        renderer.dragOrbit([g.x, g.y], [e.clientX, e.clientY]);
        if (lockBrush.checked) refreshLock();
        g.x = e.clientX;
        g.y = e.clientY;
      } else if (!g.ended) {
        if (g.tool === "scoop") {
          const screen = renderer.screenPoint(
            e.clientX,
            e.clientY,
            g.hit.point,
          );
          const point = g.hit.point.map(
            (v, k) => v + screen[k] - g.screenStart[k],
          );
          g.points.push(point);
          // Cursor responds immediately; accepted surface and mask revisions
          // still publish together when the worker finishes the local cut.
          renderer.cursor = {
            point,
            normal: g.hit.normal,
            radius,
            tool: "scoop",
          };
          renderer.drawCursor();
          void pump(g);
          return;
        }
        g.wanted =
          g.tool === "smooth"
            ? 0.35 + (g.y - e.clientY) / 120
            : ((e.clientX - g.x) * g.direction[0] +
                (e.clientY - g.y) * g.direction[1]) *
              g.worldPerPixel;
        void pump(g);
      }
      return;
    }
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => hover(e));
  });
  const end = (e, cancelled = false) => {
    const g = gesture;
    if (!g || g.id !== e.pointerId) return;
    if (g.kind === "rotate") {
      gesture = null;
      return;
    }
    if (g.ended) return;
    g.ended = true;
    g.cancelled = cancelled;
    void pump(g);
  };
  canvas.addEventListener("pointerup", (e) => end(e));
  canvas.addEventListener("pointercancel", (e) => end(e, true));
  canvas.addEventListener("lostpointercapture", (e) => end(e, true));
  window.addEventListener("keydown", (e) => {
    if (
      !active ||
      /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) ||
      document.querySelector("dialog[open]")
    )
      return;
    if (e.key === "Escape" && gesture?.kind === "grab") {
      e.preventDefault();
      gesture.cancelled = true;
      gesture.ended = true;
      void pump(gesture);
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      void historyAction(e.shiftKey ? "redo" : "undo");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
      e.preventDefault();
      void historyAction("redo");
    }
  });
  controls();
  return {
    invalidate,
    updateAvailability: controls,
    get active() {
      return active;
    },
    get busy() {
      return busy;
    },
  };
}
