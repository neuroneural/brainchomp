// Responsive niivue layout.
//
// Two problems this fixes on small screens (phones especially):
//
// 1. niivue's MULTIPLANAR_TYPE.AUTO picks the tile *family* (column / row /
//    grid) by comparing the THREE-tile metrics (1x3 vs 3x1 vs 2x2), but we ask
//    it to always draw the 3D render tile too, so it then draws FOUR tiles in
//    the family it chose. Measured on a phone-shaped canvas (1078x1630 device
//    px, i.e. Sergey's screenshot): AUTO picks COLUMN because 1x3 scores 543,
//    four pixels more than 2x2's 539 -- and then draws 1x4, which scores 408.
//    Every pane ends up 25% smaller than it needed to be and ~60% of the canvas
//    width is empty black. Re-doing the choice with the tile count actually
//    drawn selects the 2x2 grid: 539 vs 408, +32% linear / +74% area. The same
//    off-by-one-tile bug shrinks wide desktop canvases (AUTO picks ROW off the
//    3x1 score, then draws a smaller 4x1).
//
// 2. Four panes on a phone are small no matter how they are packed. So on
//    narrow / touch viewports we also expose a pane switcher that drops to a
//    single plane filling the whole canvas: 1078 px against the forced column's
//    408, 2.6x linear and ~7x the area.
//
// Nothing here changes desktop behaviour beyond the (strictly better) layout
// pick, and the multiplanar view remains the default everywhere.

import { SLICE_TYPE, MULTIPLANAR_TYPE, SHOW_RENDER } from "@niivue/niivue";
import { resetView } from "./touch-view.js";

// A viewport is treated as "narrow" (phone-like) when either the CSS width is
// small, or it is a touch screen whose short side is small. Checking the real
// viewport instead of the user agent means desktop window resizing and tablet
// rotation behave sensibly too.
const NARROW_WIDTH_CSS_PX = 720;
const COARSE_SHORT_SIDE_CSS_PX = 860;

export function isNarrowViewport() {
  const vv = window.visualViewport;
  const w = Math.round(vv?.width ?? window.innerWidth ?? 0);
  const h = Math.round(vv?.height ?? window.innerHeight ?? 0);
  if (w > 0 && w <= NARROW_WIDTH_CSS_PX) return true;
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
  return !!coarse && Math.min(w, h) <= COARSE_SHORT_SIDE_CSS_PX;
}

// ---------------------------------------------------------------------------
// Layout scoring -- mirrors Niivue.scaleSlice()/drawScene() tile math so we can
// compare candidate layouts before committing to one.
// ---------------------------------------------------------------------------

function tileScale(w, h, canvasW, canvasH, padW, padH) {
  const cw = canvasW - padW;
  const ch = canvasH - padH;
  if (!(cw > 0) || !(ch > 0) || !(w > 0) || !(h > 0)) return 0;
  let scale = cw / w;
  if (h * scale > ch) scale = ch / h;
  return scale;
}

function layoutCandidates(nv) {
  const canvasW = (nv.effectiveCanvasWidth?.() ?? nv.gl?.canvas?.width) || 0;
  const canvasH = (nv.effectiveCanvasHeight?.() ?? nv.gl?.canvas?.height) || 0;
  if (!canvasW || !canvasH) return null;

  let volScale = [1, 1, 1];
  try {
    const s = nv.sliceScale();
    if (s?.volScale?.length === 3) volScale = s.volScale.slice();
  } catch {
    /* no volume yet -- isotropic assumption is fine for the layout choice */
  }
  if (nv.opts.multiplanarEqualSize) volScale = [1, 1, 1];
  const [x, y, z] = volScale;
  const mx = Math.max(x, y, z);

  const dpr = nv.uiData?.dpr || 1;
  const gap = (parseFloat(`${nv.opts.multiplanarPadPixels}`) || 0) * dpr;
  let inner = (nv.opts.tileMargin || 0) * dpr;
  if (inner < 0) inner = 2 * (2 + Math.ceil(nv.fontPx || 0));
  const padW = (cols) => (cols - 1) * gap + cols * inner;
  const padH = (rows) => (rows - 1) * gap + rows * inner;

  // The render tile is drawn whenever showRender is ALWAYS; when it is AUTO,
  // niivue keeps it only if it is free, so scoring the 3-tile variant is right.
  const withRender =
    nv.opts.multiplanarShowRender === SHOW_RENDER.ALWAYS ||
    nv.opts.multiplanarForceRender === true;

  const column = withRender
    ? tileScale(mx, y + z + z + mx, canvasW, canvasH, padW(1), padH(4))
    : tileScale(mx, y + z + z, canvasW, canvasH, padW(1), padH(3));
  const row = withRender
    ? tileScale(x + x + y + mx, Math.max(y, z), canvasW, canvasH, padW(4), padH(1))
    : tileScale(x + x + y, Math.max(y, z), canvasW, canvasH, padW(3), padH(1));
  // The 2x2 grid holds the render tile in its fourth cell at no cost, so its
  // score does not depend on withRender.
  const grid = tileScale(x + y, y + z, canvasW, canvasH, padW(2), padH(2));

  return [
    { layout: MULTIPLANAR_TYPE.GRID, name: "grid", scale: grid },
    { layout: MULTIPLANAR_TYPE.COLUMN, name: "column", scale: column },
    { layout: MULTIPLANAR_TYPE.ROW, name: "row", scale: row },
  ];
}

/**
 * Force the multiplanar layout that actually yields the largest panes.
 * Returns the chosen candidate (or null when the canvas is not measurable yet).
 */
export function applyBestMultiplanarLayout(nv) {
  if (!nv?.gl) return null;
  const candidates = layoutCandidates(nv);
  if (!candidates) return null;
  // Ties go to the grid (first entry): it uses both canvas axes, so it degrades
  // most gracefully as the window changes.
  const best = candidates.reduce((a, b) => (b.scale > a.scale + 1e-6 ? b : a));
  const changed = nv.opts.multiplanarLayout !== best.layout;
  nv.opts.multiplanarLayout = best.layout;
  return { ...best, changed };
}

/**
 * Keep the layout in sync from inside the draw path.
 *
 * Deciding on resize events instead is racy: niivue resizes the backing store
 * in its own resize/observer handler, so a listener that measures gl.canvas can
 * read the pre-resize size and lock in the layout for the *old* aspect ratio
 * (observed: phone rotated to landscape kept the grid, 483px tiles, when the
 * row layout gives 639px). Recomputing immediately before niivue lays out the
 * frame removes the ordering question entirely. The result is memoized on the
 * canvas size + volume scale, so steady-state frames do no extra work.
 */
function installDrawHook(nv) {
  let key = "";
  const origDrawScene = nv.drawScene.bind(nv);
  // drawScene() delegates the tiling to drawSceneCore(), so setting opts here
  // is picked up by the very frame we are about to draw, and cannot recurse.
  nv.drawScene = function () {
    if (nv.opts.sliceType === SLICE_TYPE.MULTIPLANAR && nv.gl) {
      const k = [
        nv.gl.canvas.width,
        nv.gl.canvas.height,
        nv.opts.multiplanarShowRender,
        nv.opts.multiplanarForceRender,
        nv.opts.multiplanarEqualSize,
        nv.volumes?.[0]?.id ?? "",
      ].join("|");
      if (k !== key) {
        key = k;
        applyBestMultiplanarLayout(nv);
      }
    }
    return origDrawScene();
  };
}

// ---------------------------------------------------------------------------
// Pane switcher (narrow viewports only)
// ---------------------------------------------------------------------------

const PANES = [
  { id: "multi", label: "All", title: "All planes", type: SLICE_TYPE.MULTIPLANAR },
  { id: "axial", label: "A", title: "Axial only", type: SLICE_TYPE.AXIAL },
  { id: "coronal", label: "C", title: "Coronal only", type: SLICE_TYPE.CORONAL },
  { id: "sagittal", label: "S", title: "Sagittal only", type: SLICE_TYPE.SAGITTAL },
  { id: "render", label: "3D", title: "3D render only", type: SLICE_TYPE.RENDER },
];

function buildSwitcher(nv, container) {
  const bar = document.createElement("div");
  bar.id = "paneSwitcher";
  bar.className = "pane-switcher";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", "Visible planes");
  // Visibility is CSS-only (see .pane-switcher / body.nv-narrow .pane-switcher).
  // Do NOT set an inline display here: it would win over the `display: none`
  // base rule and leak the switcher onto desktop. Both class rules already
  // outrank niivue.css's global `div { display: table-row }` on specificity.

  for (const pane of PANES) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.pane = pane.id;
    btn.textContent = pane.label;
    btn.title = pane.title;
    btn.setAttribute("aria-label", pane.title);
    btn.addEventListener("click", () => setPane(nv, bar, pane.id));
    bar.appendChild(btn);
  }

  // Reset view: zoom/pan back to default. Not a pane, so it never takes the
  // active highlight -- it is an action, and the current pane stays selected.
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "pane-reset";
  reset.textContent = "\u27F2";
  reset.title = "Reset zoom and pan";
  reset.setAttribute("aria-label", "Reset zoom and pan");
  reset.addEventListener("click", () => resetView(nv));
  bar.appendChild(reset);

  container.appendChild(bar);
  return bar;
}

function setPane(nv, bar, id) {
  const pane = PANES.find((p) => p.id === id) || PANES[0];
  nv.setSliceType(pane.type); // draw hook re-picks the layout for MULTIPLANAR
  bar.querySelectorAll("button").forEach((b) =>
    b.classList.toggle("active", b.dataset.pane === pane.id));
}

/**
 * Install responsive layout handling: keeps the multiplanar layout optimal for
 * the current canvas, marks the body as `nv-narrow` on phone-like viewports
 * (CSS uses this to slim the toolbar and reveal the pane switcher), and wires
 * up the single-plane switcher.
 */
export function installResponsiveLayout(nv) {
  const container = document.getElementById("canvas-container") || document.body;
  const bar = buildSwitcher(nv, container);
  bar.querySelector('button[data-pane="multi"]').classList.add("active");

  installDrawHook(nv);

  let frame = 0;
  const refresh = () => {
    frame = 0;
    document.body.classList.toggle("nv-narrow", isNarrowViewport());
    // Toggling that class resizes the toolbar/status bar, which changes the
    // canvas CSS box without firing a window resize -- so niivue would keep
    // drawing into a stale backing store (measured: the canvas stayed 63 device
    // px short after slimming). resizeListener() re-measures and redraws.
    // Guarded by an actual mismatch so this can never feed back into the
    // ResizeObserver that calls us.
    const c = nv.canvas;
    const dpr = nv.opts.forceDevicePixelRatio === 0
      ? (window.devicePixelRatio || 1)
      : (nv.opts.forceDevicePixelRatio < 0 ? 1 : nv.opts.forceDevicePixelRatio);
    const stale = c && nv.opts.isResizeCanvas !== false &&
      (Math.abs(c.width - c.offsetWidth * dpr) > 1 ||
       Math.abs(c.height - c.offsetHeight * dpr) > 1);
    if (stale) nv.resizeListener();
    else nv.drawScene(); // layout itself is re-picked inside the draw hook
  };
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(refresh);
  };

  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", schedule);
  window.visualViewport?.addEventListener("resize", schedule);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(schedule).observe(container);
  }

  refresh();
  return { refresh: schedule, setPane: (id) => setPane(nv, bar, id) };
}
