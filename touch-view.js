// Touch view controls: keep pinch gestures inside the app, and give the user a
// way back when a view has been zoomed into a corner.
//
// Two separate problems, easy to confuse:
//
// 1. The browser was pinch-zooming the DOCUMENT. Nothing on the page set
//    `touch-action` and the viewport meta allows user scaling, so a two-finger
//    pinch scaled the whole app -- toolbar, canvas and status bar together --
//    and no in-app control can undo that, which is why only a reload helped.
//    (niivue's own 2D zoom bottoms out at 0.5x and recovers on the way back in,
//    so it was never the cause of a "microscopic, stuck" view.) We now block
//    document scaling: `touch-action` in CSS for Chromium/modern Safari, plus
//    gesture* preventDefault for older iOS Safari which ignores it.
//
// 2. niivue's pinch handler is not proportional. Every touchmove event with two
//    fingers applies a fixed +-10% step (sliceScroll2D(+-0.01) -> zoom * 1.1 or
//    0.9, rounded to one decimal), so zoom depends on how many move events the
//    OS delivered rather than on how far the fingers travelled -- and the
//    rounding makes small zooms sticky. It also only zooms while the drag mode
//    happens to be Pan/zoom; in any other mode a pinch scrolls slices instead,
//    which is not what a pinch means on a phone. We replace it with a zoom
//    driven by the distance ratio since the gesture started, clamped, anchored
//    on the crosshair the same way niivue anchors its own zoom.

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 8;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const touchDistance = (t) =>
  Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

/**
 * Restore the default view: image zoom/pan back to 1x centred, and -- as a
 * belt-and-braces measure -- undo any document scaling that slipped past the
 * guards below.
 */
export function resetView(nv) {
  if (nv?.scene) {
    nv.scene.pan2Dxyzmm = [0, 0, 0, 1];
    nv.scene.volScaleMultiplier = 1;
    nv.drawScene();
  }
  unzoomDocument();
}

/**
 * JS cannot set the visual viewport scale directly, but rewriting the viewport
 * meta with `maximum-scale=1` forces the engine to clamp the current pinch zoom
 * back to 1. The original content is restored two frames later so deliberate
 * zooming (browser menu, accessibility settings) keeps working afterwards.
 */
function unzoomDocument() {
  const meta = document.querySelector('meta[name="viewport"]');
  if (!meta) return;
  const original = meta.getAttribute("content") || "width=device-width, initial-scale=1.0";
  if (/maximum-scale/.test(original)) return; // already pinned; nothing to undo
  meta.setAttribute("content", `${original}, maximum-scale=1, user-scalable=no`);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => meta.setAttribute("content", original)));
}

function blockDocumentPinchZoom() {
  // Older iOS Safari ignores touch-action for pinch and fires gesture* instead.
  // These listeners must be non-passive to be allowed to cancel the gesture.
  const stop = (e) => e.preventDefault();
  for (const type of ["gesturestart", "gesturechange", "gestureend"]) {
    document.addEventListener(type, stop, { passive: false });
  }
  // Multi-touch that reaches the document (toolbar, status bar, padding) would
  // still scale the page on some engines. Single-finger touches pass through
  // untouched, so scrolling inside dialogs keeps working.
  document.addEventListener(
    "touchmove",
    (e) => { if (e.touches.length > 1) e.preventDefault(); },
    { passive: false }
  );
}

function installPinchZoom(nv) {
  const canvas = nv.canvas;
  if (!canvas) return;
  let start = null;

  const begin = (e) => {
    if (e.touches.length !== 2) { start = null; return; }
    const rect = canvas.getBoundingClientRect();
    const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
    const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
    const dpr = nv.uiData?.dpr || 1;
    start = {
      dist: Math.max(1, touchDistance(e.touches)),
      zoom: nv.scene.pan2Dxyzmm[3] || 1,
      pan: Array.from(nv.scene.pan2Dxyzmm).slice(0, 3),
      scale3d: nv.scene.volScaleMultiplier || 1,
      // Pinching the 3D tile should scale the render, not the slices.
      inRender: nv.inRenderTile ? nv.inRenderTile(cx * dpr, cy * dpr) >= 0 : false,
    };
  };
  const end = () => { start = null; };

  canvas.addEventListener("touchstart", begin, { passive: false });
  canvas.addEventListener("touchend", end, { passive: false });
  canvas.addEventListener("touchcancel", end, { passive: false });

  // niivue calls this.handlePinchZoom(e) from touchMoveListener for any
  // 2+ finger move, so an own property on the instance is enough to take over.
  nv.handlePinchZoom = (e) => {
    if (!start || !e.touches || e.touches.length !== 2) return;
    const ratio = touchDistance(e.touches) / start.dist;
    if (!isFinite(ratio) || ratio <= 0) return;

    if (start.inRender) {
      nv.scene.volScaleMultiplier = clamp(start.scale3d * ratio, MIN_ZOOM, MAX_ZOOM);
      nv.drawScene();
      return;
    }
    const zoom = clamp(start.zoom * ratio, MIN_ZOOM, MAX_ZOOM);
    // niivue accumulates pan += (oldZoom - newZoom) * crosshairMM on every zoom
    // step; the crosshair does not move during a pinch, so computing it once
    // from the gesture's starting state is the same thing without the drift.
    const mm = nv.frac2mm(nv.scene.crosshairPos);
    const d = start.zoom - zoom;
    nv.scene.pan2Dxyzmm = [
      start.pan[0] + d * mm[0],
      start.pan[1] + d * mm[1],
      start.pan[2] + d * mm[2],
      zoom,
    ];
    if (nv.opts.yoke3Dto2DZoom) nv.scene.volScaleMultiplier = zoom;
    nv.drawScene();
  };
}

/**
 * Install both guards. Safe to call once, after the canvas is attached.
 */
export function installTouchViewControls(nv) {
  blockDocumentPinchZoom();
  installPinchZoom(nv);
  return { resetView: () => resetView(nv) };
}
