import { installSculptEditor } from "./sculpt/editor.js";
import { Niivue } from "@niivue/niivue";
import { segment, checkSupport, checkWebgl2Support } from "./vendor/brainchomp/index.js";
import { inferenceModelsList } from "./brainchop-parameters.js";
import { localSystemDetails } from "./brainchop-diagnostics.js";
import { installResponsiveLayout } from "./responsive-layout.js";
import { installTouchViewControls } from "./touch-view.js";

// --- Backend state ----------------------------------------------------------
// brainchomp-lib (vendor/brainchomp, see scripts/update-brainchomp-lib.sh) runs
// the whole pipeline in a worker: conform to the model's 256³ 0.1 mm LPS grid,
// normalise, the MeshNet, largest component, mask opening, and reslicing back
// onto the input's grid. It picks WebGPU, then WebGL2, then a threaded CPU
// module (cross-origin isolated pages only) before downloading anything.
let lastInferenceModelEntry = null;
let backendReport = null; // what the startup probe found, for the status chip and Diagnostics

// ?backend=webgpu|webgl2|cpu forces one backend for testing; one this browser
// cannot run is then an error rather than a fallback.
const FORCED_BACKEND = ["webgpu", "webgl2", "cpu"].find(
  (b) => b === new URLSearchParams(window.location.search).get("backend"));

// The library loads worker.js and its wasm modules by URL, so they are served
// unhashed from public/brainchomp/ rather than bundled.
const BRAINCHOMP_ASSETS = new URL(`${import.meta.env.BASE_URL}brainchomp/`, window.location.href).href;

const BACKEND_LABELS = { webgpu: "WebGPU", webgl2: "WebGL2", cpu: "CPU" };

/**
 * Asks the library which backend this browser can run, without running it, so
 * the status chip is right before the first segmentation.
 */
async function probeBackends() {
  const webgpu = await checkSupport().catch((e) => ({ supported: false, reasons: [e.message] }));
  // checkWebgl2Support allocates a 128 MiB test texture, so only ask when needed.
  const webgl2 = webgpu.supported ? null : checkWebgl2Support();
  backendReport = { secureContext: window.isSecureContext, webgpu, webgl2 };
  const expected = FORCED_BACKEND
    ?? (webgpu.supported ? "webgpu" : webgl2?.supported ? "webgl2" : null);
  updateBackendStatusUI(expected);
}

/**
 * Updates the status chip: the backend that will run (after the probe) or did
 * run (after a segmentation).
 */
function updateBackendStatusUI(backend) {
  const statusEl = document.getElementById('backendStatus');
  if (!statusEl) return;
  const webgpuReasons = backendReport?.webgpu?.reasons ?? [];
  statusEl.textContent = BACKEND_LABELS[backend] ?? "No GPU";
  statusEl.style.color = backend === "webgpu" ? '#4CAF50' : backend ? '#FF9800' : '#F44336';
  let tooltip = backend === "webgpu" ? 'WebGPU backend - fastest performance'
    : backend ? `${BACKEND_LABELS[backend]} backend (fallback)` : 'Neither WebGPU nor WebGL2 can run the model here';
  if (backend !== "webgpu" && webgpuReasons.length) tooltip += `\nWebGPU: ${webgpuReasons.join('; ')}`;
  if (!window.isSecureContext) tooltip += '\n⚠ Not a secure context (HTTPS required)';
  statusEl.title = tooltip;
}

async function main() {
  let diagnosticsString = "";
  let missingLabelStatus = "";
  let inferenceRunning = false;
  // Raw label names / colors for the current segmentation (index -> value), used by "Save Stats".
  let lastSegLabelNames = null;
  let lastSegColors = null; // { R:[], G:[], B:[] }

  // --- Single-label isolation --------------------------------------------
  // Alt/Option-click a region in a 2D panel to show ONLY that label across
  // the X/Y/Z panels and the 3D render. Alt-click the same region again (or
  // Alt-click background) to restore all labels. It's a pure display toggle:
  // we only flip per-label alpha in the overlay color LUT, never the voxels.
  // Option/Alt is chosen because niivue already binds Shift+drag and
  // Ctrl+drag to its own drag modes (and Ctrl-click is a context menu on
  // macOS), whereas altKey is free for in-canvas clicks.
  const ISOLATE_MODIFIER = "altKey";
  let isolatedLabel = null;    // label value shown alone, or null = show all
  let originalSegImg = null;   // pristine label voxels, for restore + stats
  let isolationStats = null;   // { lines:[...], color:[r,g,b,a] } drawn as a fixed HUD
  const HUD_TEXT_SCALE = 0.9;  // relative to niivue fontPx
  const sampleSelect = document.getElementById("sampleSelect");
  const maskToggle = document.getElementById("maskToggle");
  const modelRunButton = document.getElementById("modelRunButton");
  let sculptEditor = null;
  let lastBrainMask = null;
  let lastExtractedBrain = null;

  function clearCachedResult() {
    sculptEditor?.invalidate();
    lastBrainMask = null;
    lastExtractedBrain = null;
    sculptEditor?.updateAvailability();
    lastInferenceModelEntry = null;
    if (maskToggle) {
      maskToggle.checked = false;
      maskToggle.disabled = true;
    }
  }

  // --- Drag mode: segmented control (data-drag maps to nv.opts.dragMode) ---
  const dragSegmented = document.getElementById("dragSegmented");
  if (dragSegmented) {
    dragSegmented.querySelectorAll("button").forEach((btn) => {
      btn.onclick = () => {
        nv1.opts.dragMode = parseInt(btn.dataset.drag, 10);
        dragSegmented.querySelectorAll("button").forEach((b) =>
          b.classList.toggle("active", b === btn));
      };
    });
  }

  // --- Draw tools: popover with pen selection + apply actions ---
  const drawBtn = document.getElementById("drawBtn");
  const drawPopover = document.getElementById("drawPopover");
  const penRow = document.getElementById("penRow");
  const drawApplyRow = document.getElementById("drawApplyRow");

  function openDrawPopover(open) {
    if (!drawPopover) return;
    drawPopover.hidden = !open;
    if (drawBtn) drawBtn.setAttribute("aria-expanded", String(open));
  }

  function setPen(mode) {
    nv1.setDrawingEnabled(mode >= 0);
    if (mode >= 0) nv1.setPenValue(mode & 7, mode > 7);
    if (penRow) penRow.querySelectorAll(".chip").forEach((b) =>
      b.classList.toggle("active", parseInt(b.dataset.pen, 10) === mode));
  }

  async function applyDraw(mode) {
    if (nv1.volumes.length < 2) {
      window.alert("No segmentation open (run a model first).");
      return;
    }
    if (sculptEditor?.active) return;
    if (mode === 0) { // undo
      nv1.drawUndo();
      return;
    }
    if (!nv1.drawBitmap) {
      window.alert("Nothing drawn yet — pick a pen and draw on the image first.");
      return;
    }
    const img = nv1.volumes[1].img;
    // Pass RAS drawing bytes directly to the writer: NiiVue 0.62 saveImage
    // and its NVImage writer otherwise both reorient non-RAS drawings.
    const draw = await nv1.volumes[0].saveToDisk("", nv1.drawBitmap);
    const niiHdrBytes = 352;
    const nvox = img.length;
    if (mode === 1) { // append
      for (let i = 0; i < nvox; i++) if (draw[niiHdrBytes + i] > 0) img[i] = 1;
    }
    if (mode === 2) { // remove
      for (let i = 0; i < nvox; i++) if (draw[niiHdrBytes + i] > 0) img[i] = 0;
    }
    // Drawing and sculpting share the binary mask; extracted intensities derive
    // from that mask instead of becoming a separately edited output.
    if (lastBrainMask && maskToggle?.checked) {
      lastBrainMask.set(img);
      for (let i = 0; i < nvox; i++) lastExtractedBrain[i] = nv1.volumes[0].img[i] * lastBrainMask[i];
    } else if (lastBrainMask) {
      // Applying a drawing while viewing extracted intensities still edits the mask.
      for (let i = 0; i < nvox; i++) if (draw[niiHdrBytes + i] > 0) {
        lastBrainMask[i] = mode === 1 ? 1 : 0;
        lastExtractedBrain[i] = nv1.volumes[0].img[i] * lastBrainMask[i];
      }
    }
    sculptEditor?.invalidate();
    nv1.closeDrawing();
    nv1.updateGLVolume();
    nv1.setDrawingEnabled(false);
    setPen(-1);
  }

  if (drawBtn) {
    drawBtn.onclick = (e) => {
      e.stopPropagation();
      openDrawPopover(drawPopover.hidden);
    };
  }
  if (penRow) {
    penRow.querySelectorAll(".chip").forEach((btn) => {
      btn.onclick = () => setPen(parseInt(btn.dataset.pen, 10));
    });
  }
  if (drawApplyRow) {
    drawApplyRow.querySelectorAll(".chip").forEach((btn) => {
      btn.onclick = () => applyDraw(parseInt(btn.dataset.apply, 10));
    });
  }
  // Close the popover on outside click / Escape.
  document.addEventListener("click", (e) => {
    if (!drawPopover || drawPopover.hidden) return;
    if (!e.target.closest(".popover-wrap")) openDrawPopover(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") openDrawPopover(false);
  });
  // Dismiss any modal by clicking its backdrop.
  const appDialogEl = document.getElementById("appDialog");
  if (appDialogEl) {
    appDialogEl.addEventListener("click", (e) => {
      if (e.target === appDialogEl) appDialogEl.close();
    });
  }

  aboutBtn.onclick = function () {
    const aboutContent = `
      <div style="text-align: left; font-size: 0.95em;">
        <p><strong>🔒 Privacy First</strong><br>
        Brainchomp runs entirely <strong>locally in your browser</strong>. Your imaging data never leaves your device.</p>

        <p><strong>⌨️ Controls</strong><br>
        • <strong>Drag & Drop</strong> a rodent NIfTI file to open.<br>
        • Use the <strong>example selector</strong> to switch between the bundled rodent MRI and mask.<br>
        • Press <strong>C</strong> to cycle the clip-plane.<br>
        • Press <strong>V</strong> to cycle through views.</p>

        <p><strong>🐭 Rodent brain extraction</strong><br>
        Skull-strip runs the 16-channel MeshNet once. Use the <strong>Mask</strong>
        toggle to switch the overlay between the extracted brain and its
        post-processed binary mask. The Save menu offers both outputs.</p>
        
        <p><em>Inputs of any size or orientation are conformed to 256³ at 0.1 mm (LPS) for the model; the mask comes back on the image's own grid.</em></p>
      </div>
    `;
    showModal("About Brainchomp", aboutContent);
  };

  diagnosticsBtn.onclick = function () {
    let msg = diagnosticsString;

    // If no inference run yet, show startup diagnostics
    if (msg.length < 1 && backendReport) {
      const d = backendReport;
      msg = ":: Startup Diagnostics ::\n";
      msg += `Secure Context: ${d.secureContext}\n`;
      msg += `WebGPU: ${d.webgpu.supported ? "yes" : `no (${d.webgpu.reasons.join("; ")})`}\n`;
      if (d.webgpu.hasShaderF16 !== undefined) msg += `F16 Support: ${d.webgpu.hasShaderF16}\n`;
      if (d.webgl2) msg += `WebGL2: ${d.webgl2.supported ? "yes" : `no (${d.webgl2.reasons.join("; ")})`}\n`;
      msg += `User Agent: ${navigator.userAgent}\n`;
    }

    if (msg.length < 1) {
      showModal("Diagnostics", "No diagnostic string generated: run a model to create diagnostics");
      return;
    }

    // Logic for missing labels
    let statusMsg = msg;
    missingLabelStatus = missingLabelStatus.slice(0, -2);
    if (missingLabelStatus !== "") {
      if (statusMsg.includes('Status: OK')) {
        statusMsg = statusMsg.replace('Status: OK', `Status: ${missingLabelStatus}`);
      }
    }
    missingLabelStatus = "";

    // ^ note: clipboard write is async but often works without await in loose contexts. 
    // Ideally we catch errors.
    navigator.clipboard.writeText(statusMsg).then(() => {
      showModal("Diagnostics", `<p>Diagnostics copied to clipboard</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${statusMsg}</pre>`);
    }).catch(err => {
      showModal("Diagnostics", `<p>Failed to copy to clipboard.</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${statusMsg}</pre>`);
    });
  };

  opacitySlider0.oninput = function () {
    nv1.setOpacity(0, opacitySlider0.value / 255);
    nv1.updateGLVolume();
  };

  opacitySlider1.oninput = function () {
    if (sculptEditor?.active) { nv1.setDrawOpacity(opacitySlider1.value / 255); return; }
    nv1.setOpacity(1, opacitySlider1.value / 255);
  };

  async function closeAllOverlays() {
    while (nv1.volumes.length > 1) {
      await nv1.removeVolume(nv1.volumes[1]);
    }
  }

  // The segmentation overlay, only if it carries a discrete label LUT.
  function segOverlay() {
    return (nv1.volumes.length >= 2 && nv1.volumes[1].colormapLabel)
      ? nv1.volumes[1] : null;
  }

  function resetLabelIsolation() {
    isolatedLabel = null;
    originalSegImg = null;
    isolationStats = null;
  }

  // Isolation works on the label DATA, not the color LUT: non-selected voxels
  // are set to background (0). We tried hiding others via the LUT (alpha 0)
  // instead, but niivue's 3D atlas shader anti-aliases each voxel's ALPHA from
  // its 6 neighbours while keeping each voxel's own RGB — so hidden voxels
  // touching the kept region borrowed alpha and smeared their color/glow onto
  // the surface, burying the folds. Zeroing the data makes those voxels true
  // background: the shader skips them, the T1 shows through the sulci, and the
  // kept region keeps clean anti-aliased edges. Fully reversible — the pristine
  // labels are restored from originalSegImg (also used for stats).
  function applyLabelIsolation() {
    const ov = segOverlay();
    if (!ov) return;
    if (originalSegImg === null) originalSegImg = ov.img; // capture pristine once
    if (isolatedLabel === null) {
      ov.img = originalSegImg;
      isolationStats = null;
    } else {
      const src = originalSegImg;
      const out = new src.constructor(src.length);
      for (let i = 0; i < src.length; i++) out[i] = (src[i] === isolatedLabel) ? isolatedLabel : 0;
      ov.img = out;
      isolationStats = buildIsolationStats(isolatedLabel);
    }
    nv1.updateGLVolume();
  }

  // Full stats for one label, formatted as lines for the on-screen readout.
  function buildIsolationStats(labelVal) {
    const base = nv1.volumes[0];
    const seg = originalSegImg || (nv1.volumes[1] && nv1.volumes[1].img);
    if (!base || !seg) return null;
    const pd = base.hdr.pixDims || [];
    const voxMm3 = (pd[1] && pd[2] && pd[3]) ? pd[1] * pd[2] * pd[3] : 1;
    const rows = computeLabelStats(base.img, seg, voxMm3);
    const total = rows.reduce((s, r) => s + r.volume_mm3, 0);
    const r = rows.find((x) => x.label === labelVal);
    if (!r) return null;
    const pct = total > 0 ? (r.volume_mm3 / total) * 100 : 0;
    const lines = [
      r.name,
      `${fmtCm3(r.volume_mm3)} cm3   (${pct.toFixed(1)}% of brain)`,
      `${r.voxels.toLocaleString()} voxels`,
      `intensity  ${r.mean.toFixed(0)} +/- ${r.stdev.toFixed(0)}`,
    ];
    // Title in the region's own color, brightened for legibility on black.
    let color = [1, 1, 1, 1];
    if (lastSegColors && lastSegColors.R && lastSegColors.R[labelVal] != null) {
      const br = (c) => Math.min(255, c * 0.55 + 130) / 255;
      color = [br(lastSegColors.R[labelVal]), br(lastSegColors.G[labelVal]), br(lastSegColors.B[labelVal]), 1];
    }
    return { lines, color };
  }

  // Draw the isolated-region readout as fixed screen-space text in the empty
  // top-left corner of the 3D render tile. Because it's drawn per-frame in
  // canvas coordinates (not anchored in the scene), it stays put while the head
  // rotates. niivue's drawText is single-line, so we lay out the lines by hand.
  function drawIsolationHUD() {
    if (isolatedLabel === null || !isolationStats || !segOverlay()) return;
    const tile = nv1.screenSlices && nv1.screenSlices.find((s) => s.axCorSag === 4 /* RENDER */);
    if (!tile) return;
    const [L, T] = tile.leftTopWidthHeight; // canvas px, top-left origin
    const gl = nv1.gl;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.BLEND);
    const size = nv1.fontPx * HUD_TEXT_SCALE;
    const lineH = size * 1.55;
    const pad = nv1.fontPx * 0.6;
    const x = L + pad;
    const y = T + pad;
    const white = [0.92, 0.92, 0.92, 1];
    const { lines, color } = isolationStats;
    nv1.drawText([x, y], lines[0], HUD_TEXT_SCALE, color);
    for (let i = 1; i < lines.length; i++) {
      nv1.drawText([x, y + i * lineH], lines[i], HUD_TEXT_SCALE, white);
    }
  }

  // True (pristine) label under the crosshair, even while a region is isolated,
  // so Alt-clicking a different region switches straight to it.
  function labelUnderCursor() {
    const ov = segOverlay();
    if (!ov) return null;
    const mm = nv1.frac2mm(nv1.scene.crosshairPos, 0, true);
    const vox = ov.mm2vox(mm);
    const cur = ov.img;
    if (originalSegImg) ov.img = originalSegImg;
    const v = Math.round(ov.getValue(vox[0], vox[1], vox[2], ov.frame4D));
    ov.img = cur;
    return v;
  }

  // Toggle isolation of a specific label value. Background (0) or the already
  // isolated label restores the full view. Shared by Alt-click, the stats
  // panel, and Esc.
  function isolateLabel(labelVal) {
    if (sculptEditor?.active) return;
    if (!segOverlay()) return;
    isolatedLabel = (labelVal === 0 || labelVal === isolatedLabel) ? null : labelVal;
    applyLabelIsolation();
  }

  function handleIsolateClick(e) {
    if (!e[ISOLATE_MODIFIER]) return;
    if (!segOverlay()) return;
    const lbl = labelUnderCursor();
    if (lbl === null || Number.isNaN(lbl)) return;
    isolateLabel(lbl);
    e.preventDefault();
  }

  async function runSelectedInference() {
    if (inferenceRunning || sculptEditor?.active) return; // already running or editing
    inferenceRunning = true;
    sculptEditor?.updateAvailability();
    if (modelRunButton) modelRunButton.disabled = true;
    try {
      await runInference();
    } catch (error) {
      console.error("Segmentation failed:", error);
      callbackUI("Segmentation failed", 0);
      // BrainchompError carries a machine-readable code; bad-input is the
      // user's file, everything else is this browser or device.
      const title = error?.code === "bad-input" ? "Input not supported" : "Segmentation failed";
      showModal(title, `<p>${escapeHtml(error?.message || String(error))}</p>` +
        (error?.code ? `<p style="font-size:0.88em;color:#9aa4af">Code: ${escapeHtml(error.code)}. Full details are in the browser console.</p>` : ""));
    } finally {
      inferenceRunning = false;
      sculptEditor?.updateAvailability();
      if (modelRunButton) modelRunButton.disabled = false;
    }
  }

  async function runInference() {
    const selectedModelIndex = modelSelect.value;
    if (selectedModelIndex === "-1") return;
    if (modelSelect.selectedIndex < 0) return;

    await closeAllOverlays();
    resetLabelIsolation(); // drop any active single-label view + its HUD

    const modelEntry = inferenceModelsList[selectedModelIndex];
    const input = nv1.volumes[0];
    callbackUI(`${modelEntry.modelName}: running…`, 0);
    const startTime = Date.now();
    const result = await segment(await input.saveToDisk(""), {
      worker: true,
      backend: FORCED_BACKEND ?? "auto",
      opening: modelEntry.maskOpeningRadius,
      gzipOutput: false,
      assetPath: BRAINCHOMP_ASSETS,
      onLog: (line) => console.log("[brainchomp]", line),
    });
    if (nv1.volumes[0] !== input) return; // another image was loaded meanwhile

    const mask = niftiVoxels(result.mask);
    const nvox = input.hdr.dims[1] * input.hdr.dims[2] * input.hdr.dims[3];
    if (mask.length < nvox) throw new Error(`The returned mask has ${mask.length} voxels; the image has ${nvox}.`);
    updateBackendStatusUI(result.backend);
    callbackImg(mask.subarray(0, nvox), modelEntry);
    const seconds = (result.elapsedMs / 1000).toFixed(1);
    callbackUI(`${modelEntry.modelName}<br>Segmentation finished (${BACKEND_LABELS[result.backend]}, ${seconds} s)`, 1);
    reportTelemetry({
      Model: modelEntry.modelName,
      Backend: BACKEND_LABELS[result.backend],
      Worker: result.ranInWorker,
      Inference_t: Number(seconds),
      Input_Shape: input.hdr.dims.slice(1, 4).join("x"),
      Status: "OK",
      isModelFullVol: true,
      startTime,
    });
  }

  // Voxels of a uint8 NIfTI-1 or NIfTI-2 file (the library's mask output).
  function niftiVoxels(buffer) {
    const view = new DataView(buffer);
    for (const little of [true, false]) {
      const size = view.getInt32(0, little);
      if (size === 348 && view.getInt16(70, little) === 2)
        return new Uint8Array(buffer, view.getFloat32(108, little));
      if (size === 540 && view.getInt16(12, little) === 2)
        return new Uint8Array(buffer, Number(view.getBigInt64(168, little)));
    }
    throw new Error("The returned mask is not a uint8 NIfTI file.");
  }

  modelSelect.onchange = runSelectedInference;
  if (modelRunButton) {
    modelRunButton.onclick = () => {
      modelSelect.value = "0";
      runSelectedInference();
    };
  }
  if (maskToggle) {
    maskToggle.onchange = () => {
      if (!lastBrainMask) return;
      renderCachedOutput().catch((error) => {
        console.error("Could not switch result overlay:", error);
        showModal("Overlay error", escapeHtml(error?.message || String(error)));
      });
    };
  }
  // backendSelect.onchange = runSelectedInference; // Removed

  // --- Save actions -------------------------------------------------------
  // Each action performs the pristine-label swap where relevant (isolation is
  // a view-only state) so exports always contain the full segmentation.
  function withPristineLabels(fn) {
    const ov = segOverlay();
    const restore = isolatedLabel !== null && ov && originalSegImg;
    if (restore) ov.img = originalSegImg;
    try {
      return fn();
    } finally {
      if (restore) applyLabelIsolation();
    }
  }

  async function saveCachedResult(kind) {
    if (sculptEditor?.busy) return;
    if (!lastBrainMask || !lastExtractedBrain) {
      window.alert("No result to save (run Skull-strip first).");
      return;
    }
    const outputVolume = await nv1.volumes[0].clone();
    outputVolume.zeroImage();
    Object.assign(outputVolume.hdr, { scl_inter: 0, scl_slope: 1 });
    if (kind === "mask") {
      outputVolume.img = lastBrainMask;
      outputVolume.hdr.datatypeCode = 2; // DT_UINT8
      outputVolume.hdr.numBitsPerVoxel = 8;
      outputVolume.hdr.intent_code = 1002; // NIFTI_INTENT_LABEL
      outputVolume.saveToDisk("brainmask.nii.gz");
      return;
    }
    outputVolume.img = lastExtractedBrain;
    outputVolume.hdr.intent_code = 0;
    outputVolume.saveToDisk("skull_stripped_brain.nii.gz");
  }

  function saveInputVolume() {
    if (nv1.volumes.length < 1) { window.alert("No image loaded."); return; }
    nv1.volumes[0].saveToDisk("input.nii.gz");
  }

  async function saveScene() {
    if (nv1.volumes.length < 1) { window.alert("No image loaded."); return; }
    await withPristineLabels(async () => { await nv1.saveDocument("brainchomp.nvd"); });
  }

  const SAVE_OPTIONS = [
    { act: () => saveCachedResult("brain"), title: "Skull-stripped brain", sub: "input intensities with background set to zero", need: "result" },
    { act: () => saveCachedResult("mask"), title: "Brain mask", sub: "binary mask, including accepted edits", need: "result" },
    { act: saveInputVolume, title: "Input volume", sub: "the loaded image, as shown", need: "img" },
    { act: saveScene, title: "Scene", sub: "everything, as a .nvd document", need: "img" },
  ];

  function openSaveModal() {
    const hasImg = nv1.volumes.length >= 1;
    const hasResult = !!lastBrainMask;
    const ready = (need) => (need === "result" ? hasResult : hasImg);
    const rows = SAVE_OPTIONS.map((o, i) => {
      const dis = ready(o.need) ? "" : " disabled";
      return `<button type="button" class="save-opt${dis}" data-i="${i}"${dis ? " disabled" : ""}>
        <span class="save-opt-title">${o.title}</span>
        <span class="save-opt-sub">${o.sub}</span>
      </button>`;
    }).join("");
    showModal("Save", `<div class="save-options">${rows}</div>`, { hideClose: true, saveMode: true });
    const msg = document.getElementById("dialogMessage");
    if (!msg) return;
    msg.querySelectorAll(".save-opt:not(.disabled)").forEach((btn) => {
      btn.onclick = () => {
        const opt = SAVE_OPTIONS[parseInt(btn.dataset.i, 10)];
        const dlg = document.getElementById("appDialog");
        if (dlg && dlg.open) dlg.close();  // dismiss first so the native save dialog is unobstructed
        opt.act();
      };
    });
  }

  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) saveBtn.onclick = openSaveModal;

  // Compute per-label statistics of the input image intensities within each
  // segmentation label. Single pass builds a 256-bin histogram per label
  // (the conformed input is Uint8Array, so bins are exact), from which
  // count/volume/min/max/quartiles/mean/stdev are derived.
  function computeLabelStats(imgArr, labelArr, voxelVolMm3) {
    const HIST = 256;
    const stats = new Map(); // labelValue -> { count, sum, sumSq, hist }
    const n = labelArr.length;
    for (let i = 0; i < n; i++) {
      const lbl = labelArr[i];
      if (lbl === 0) continue; // skip background
      let s = stats.get(lbl);
      if (!s) {
        s = { count: 0, sum: 0, sumSq: 0, hist: new Float64Array(HIST) };
        stats.set(lbl, s);
      }
      const v = imgArr[i];
      s.count++;
      s.sum += v;
      s.sumSq += v * v;
      s.hist[v]++;
    }

    const quantileFromHist = (hist, count, p) => {
      const target = p * count;
      let cum = 0;
      for (let b = 0; b < hist.length; b++) {
        cum += hist[b];
        if (cum >= target) return b;
      }
      return hist.length - 1;
    };

    const rows = [];
    for (const [lbl, s] of [...stats.entries()].sort((a, b) => a[0] - b[0])) {
      const mean = s.sum / s.count;
      const variance = Math.max(0, s.sumSq / s.count - mean * mean);
      let min = 0, max = 0;
      for (let b = 0; b < s.hist.length; b++) { if (s.hist[b] > 0) { min = b; break; } }
      for (let b = s.hist.length - 1; b >= 0; b--) { if (s.hist[b] > 0) { max = b; break; } }
      rows.push({
        label: lbl,
        name: (lastSegLabelNames && lastSegLabelNames[lbl] != null) ? lastSegLabelNames[lbl] : `label_${lbl}`,
        voxels: s.count,
        volume_mm3: s.count * voxelVolMm3,
        min,
        max,
        q1: quantileFromHist(s.hist, s.count, 0.25),
        median: quantileFromHist(s.hist, s.count, 0.5),
        q3: quantileFromHist(s.hist, s.count, 0.75),
        mean,
        stdev: Math.sqrt(variance),
      });
    }
    return rows;
  }

  function buildStatsCsv(rows) {
    const header = ["label", "name", "voxels", "volume_mm3", "min", "max", "q1", "median", "q3", "mean", "stdev"];
    const fmt = (x) => (Number.isInteger(x) ? String(x) : x.toFixed(6));
    const esc = (s) => /[",\n]/.test(s) ? `"${String(s).replace(/"/g, '""')}"` : String(s);
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push([r.label, esc(r.name), r.voxels, fmt(r.volume_mm3),
      r.min, r.max, r.q1, r.median, r.q3, fmt(r.mean), fmt(r.stdev)].join(","));
    }
    return lines.join("\n") + "\n";
  }

  function downloadCsv(rows) {
    const blob = new Blob([buildStatsCsv(rows)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mask_stats.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const escHtml = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmtCm3 = (mm3) => { const v = mm3 / 1000; return v >= 10 ? Math.round(v).toLocaleString() : v.toFixed(1); };

  function buildStatsPanelHtml(rows, totalMm3) {
    const maxVol = Math.max(...rows.map(r => r.volume_mm3));
    const colorOf = (r) => (lastSegColors && lastSegColors.R && lastSegColors.R[r.label] != null)
      ? `rgb(${lastSegColors.R[r.label]},${lastSegColors.G[r.label]},${lastSegColors.B[r.label]})`
      : "#6b9bd1";
    let body = "";
    for (const r of rows) {
      const pct = totalMm3 > 0 ? (r.volume_mm3 / totalMm3) * 100 : 0;
      const wAbs = maxVol > 0 ? (r.volume_mm3 / maxVol) * 100 : 0;
      const val = `<span class="stat-val" data-cm3="${fmtCm3(r.volume_mm3)}" data-pct="${pct.toFixed(1)}%">${fmtCm3(r.volume_mm3)}</span>`;
      const bar = `<span class="stat-bar" style="width:${wAbs.toFixed(2)}%;background:${colorOf(r)}" data-w-abs="${wAbs.toFixed(2)}" data-w-pct="${pct.toFixed(2)}"></span>`;
      const cell = (k, v) => `<div><span class="k">${k}</span><span class="v">${v}</span></div>`;
      const detail = cell("min", r.min) + cell("max", r.max)
        + cell("Q1", r.q1) + cell("Q3", r.q3)
        + cell("median", r.median) + cell("mean", r.mean.toFixed(2))
        + cell("SD", r.stdev.toFixed(2)) + cell("voxels", r.voxels.toLocaleString());
      body += `
        <div class="stat-row" role="button" tabindex="0" data-label="${r.label}" style="cursor:pointer">
          <div class="stat-line">
            <span class="stat-name">${escHtml(r.name)}</span>
            <span class="stat-track">${bar}</span>
            ${val}
            <button type="button" class="stat-iso" title="Show only this region in the viewer">isolate</button>
          </div>
          <div class="stat-detail" style="display:none">${detail}</div>
        </div>`;
    }
    return `
      <style>
        /* niivue.css sets a global "div{display:table-row}"; force block/flex on our
           plain container divs so width/1fr track sizing works. */
        /* Cap the dialog and let ONLY the region list scroll, so the header,
           toggle, Download and Close stay pinned/visible with long atlases. */
        #appDialog[open]{max-height:88vh;display:flex;flex-direction:column;box-sizing:border-box}
        #appDialog[open] h3{flex:0 0 auto}
        #appDialog[open] #dialogCloseBtn{flex:0 0 auto;align-self:center;width:auto;float:none}
        #dialogMessage{display:flex;flex-direction:column;flex:1 1 auto;min-height:0}
        #statsPanel{display:flex;flex-direction:column;flex:1 1 auto;min-height:0;width:440px;max-width:100%;box-sizing:border-box}
        #statsPanel .stat-head{flex:0 0 auto;display:flex;justify-content:space-between;align-items:baseline;margin:0 0 8px}
        #statsPanel .stat-total{opacity:.7;font-size:.95em}
        #statsPanel .stat-toggle{flex:0 0 auto;align-self:flex-start;display:inline-flex;border:1px solid #444;border-radius:8px;overflow:hidden;margin:0 0 10px}
        #statsPanel .stat-toggle button{background:transparent;color:inherit;border:0;padding:6px 16px;cursor:pointer;font:inherit;float:none;margin:0}
        #statsPanel .stat-toggle button.active{background:#3a3a3a;font-weight:600}
        #statsPanel #statsRows{flex:1 1 auto;min-height:0;overflow-y:auto;display:block}
        #statsPanel .stat-row{display:block;padding:6px 4px;border-radius:6px}
        #statsPanel .stat-row:hover{background:rgba(255,255,255,.05)}
        #statsPanel .stat-line{display:grid;grid-template-columns:120px 1fr 60px auto;align-items:center;gap:10px}
        #statsPanel .stat-iso{background:transparent;color:inherit;border:1px solid #555;border-radius:6px;padding:2px 8px;font:inherit;font-size:.78em;opacity:.55;cursor:pointer;float:none;margin:0}
        #statsPanel .stat-row:hover .stat-iso{opacity:.9}
        #statsPanel .stat-iso:hover{background:#3a3a3a;border-color:#777}
        #statsPanel .stat-name{text-align:right;opacity:.85;font-size:.9em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        #statsPanel .stat-track{background:rgba(255,255,255,.06);border-radius:5px;height:18px;overflow:hidden;min-width:0}
        #statsPanel .stat-bar{display:block;height:100%;border-radius:5px;min-width:3px}
        #statsPanel .stat-val{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
        #statsPanel .stat-detail{margin:4px 0 6px 0;display:grid;grid-template-rows:auto auto;grid-auto-flow:column;grid-auto-columns:1fr;gap:2px 14px;font-size:.78em;font-variant-numeric:tabular-nums}
        #statsPanel .stat-detail>div{display:flex;justify-content:space-between;gap:6px;white-space:nowrap}
        #statsPanel .stat-detail .k{opacity:.55}
        #statsPanel .stat-detail .v{font-weight:600}
        #statsPanel .stat-actions{flex:0 0 auto;display:block;margin-top:12px;border-top:1px solid #444;padding-top:10px;text-align:right}
      </style>
      <div id="statsPanel">
        <div class="stat-head">
          <span class="stat-total" id="statsUnitLabel">total ${fmtCm3(totalMm3)} cm³</span>
        </div>
        <div class="stat-toggle">
          <button type="button" data-mode="cm3" class="active">cm³</button>
          <button type="button" data-mode="pct">% of total</button>
        </div>
        <div id="statsRows">${body}</div>
        <div class="stat-actions">
          <button type="button" id="statsDownloadBtn">Download CSV</button>
        </div>
      </div>`;
  }

  saveStatsBtn.onclick = function () {
    if (nv1.volumes.length < 2) {
      window.alert("No segmentation to measure (run a model first).");
      return;
    }
    const imgArr = nv1.volumes[0].img;   // conformed input intensities
    // Use pristine labels so region stats stay whole-brain even while isolated.
    const labelArr = originalSegImg || nv1.volumes[1].img; // segmentation labels
    if (!imgArr || !labelArr || imgArr.length !== labelArr.length) {
      window.alert("Input and segmentation grids do not match.");
      return;
    }
    const pd = nv1.volumes[0].hdr.pixDims || [];
    const voxelVolMm3 = (pd[1] && pd[2] && pd[3]) ? pd[1] * pd[2] * pd[3] : 1;

    let rows = computeLabelStats(imgArr, labelArr, voxelVolMm3);
    if (rows.length === 0) {
      window.alert("No non-background labels found in the segmentation.");
      return;
    }
    // Largest region first, matching the reference panel layout.
    rows = rows.slice().sort((a, b) => b.volume_mm3 - a.volume_mm3);
    const totalMm3 = rows.reduce((s, r) => s + r.volume_mm3, 0);

    showModal("Region volumes", buildStatsPanelHtml(rows, totalMm3));

    // Wire up interactivity (innerHTML strips <script>, so attach handlers here).
    const panel = document.getElementById("statsPanel");
    if (!panel) return;

    panel.querySelectorAll(".stat-toggle button").forEach(btn => {
      btn.onclick = () => {
        const mode = btn.dataset.mode;
        panel.querySelectorAll(".stat-toggle button").forEach(b => b.classList.toggle("active", b === btn));
        document.getElementById("statsUnitLabel").textContent =
          mode === "pct" ? "100% of segmented volume" : `total ${fmtCm3(totalMm3)} cm³`;
        panel.querySelectorAll(".stat-row").forEach(row => {
          const val = row.querySelector(".stat-val");
          const bar = row.querySelector(".stat-bar");
          val.textContent = mode === "pct" ? val.dataset.pct : val.dataset.cm3;
          bar.style.width = (mode === "pct" ? bar.dataset.wPct : bar.dataset.wAbs) + "%";
        });
      };
    });

    panel.querySelectorAll(".stat-row").forEach(row => {
      const toggle = () => {
        const d = row.querySelector(".stat-detail");
        d.style.display = d.style.display === "none" ? "grid" : "none";
      };
      row.onclick = toggle;
      row.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } };
    });

    // Per-row "isolate": show only that region in the viewer and close the
    // dialog so it's visible. stopPropagation so the row's detail toggle
    // doesn't also fire.
    panel.querySelectorAll(".stat-iso").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const labelVal = parseInt(btn.closest(".stat-row").dataset.label, 10);
        if (!Number.isNaN(labelVal)) isolateLabel(labelVal);
        const dlg = document.getElementById("appDialog");
        if (dlg && dlg.open) dlg.close();
      };
    });

    document.getElementById("statsDownloadBtn").onclick = () => downloadCsv(rows);
  };

  function doLoadImage() {
    opacitySlider0.oninput();
    modelSelect.value = "-1";
    if (nv1.volumes.length === 1) clearCachedResult();
  }

  async function fetchJSON(fnm) {
    const response = await fetch(fnm);
    return await response.json();
  }

  async function getUniqueValuesAndCounts(uint8Array) {
    const countsMap = new Map();
    for (const value of uint8Array) {
      countsMap.set(value, (countsMap.get(value) || 0) + 1);
    }
    return Array.from(countsMap, ([value, count]) => ({ value, count }));
  }

  async function createLabeledCounts(uniqueValuesAndCounts, labelStrings, voxelVolMm3 = 1) {
    if (!labelStrings || uniqueValuesAndCounts.length !== labelStrings.length) {
      missingLabelStatus = "Failed to Predict Some Labels - ";
    }
    return labelStrings.map((label, index) => {
      const entry = uniqueValuesAndCounts.find(item => item.value === index);
      const countText = entry ? `${fmtCm3(entry.count * voxelVolMm3)} cm3` : "Missing";
      if (countText === "Missing") missingLabelStatus += `${label}, `;
      return `${label}   ${countText}`;
    });
  }

  async function renderCachedOutput() {
    if (!lastBrainMask || !lastExtractedBrain || !lastInferenceModelEntry) return;
    await closeAllOverlays();
    resetLabelIsolation();
    const overlayVolume = await nv1.volumes[0].clone();
    overlayVolume.zeroImage();
    Object.assign(overlayVolume.hdr, { scl_inter: 0, scl_slope: 1 });

    lastSegLabelNames = null;
    lastSegColors = null;
    if (maskToggle?.checked) {
      overlayVolume.img = lastBrainMask;
      const newLabels = ["Background", "Brain Mask"];
      lastSegLabelNames = newLabels.slice();
      const newR = [0, 217];
      const newG = [0, 119];
      const newB = [0, 33];
      lastSegColors = { R: newR, G: newG, B: newB };
      overlayVolume.setColormapLabel({ R: newR, G: newG, B: newB, labels: newLabels });
      overlayVolume.hdr.datatypeCode = 2; // DT_UINT8
      overlayVolume.hdr.numBitsPerVoxel = 8;
      overlayVolume.hdr.intent_code = 1002; // NIFTI_INTENT_LABEL
    } else {
      overlayVolume.img = lastExtractedBrain;
      overlayVolume.hdr.intent_code = 0;
      overlayVolume.colormap = nv1.colormaps().includes("copper2") ? "copper2" : "actc";
      // Window the copper on the brain's own intensities. The clone inherits
      // the whole image's range, which can start below zero (float scans),
      // turning the zeroed background into opaque dark copper in 3D, or be set
      // by brighter non-brain tissue, leaving the brain dim. With cal_min at 0
      // the background maps to the colormap's transparent bottom.
      const top = brainPercentile(0.98);
      if (top > 0) {
        overlayVolume.cal_min = 0;
        overlayVolume.cal_max = top;
      }
    }
    overlayVolume.opacity = opacitySlider1.value / 255;
    await nv1.addVolume(overlayVolume);
  }

  // Intensity at quantile q of the voxels inside the brain mask, from a sample
  // of at most ~200k of them.
  function brainPercentile(q) {
    const img = lastExtractedBrain, mask = lastBrainMask;
    let count = 0;
    for (let i = 0; i < mask.length; i++) count += mask[i];
    if (count === 0) return 0;
    const stride = Math.max(1, Math.floor(count / 200000));
    const values = [];
    for (let i = 0, seen = 0; i < mask.length; i++) {
      if (mask[i] && seen++ % stride === 0) values.push(img[i]);
    }
    values.sort((a, b) => a - b);
    return values[Math.min(values.length - 1, Math.floor(q * values.length))];
  }

  // mask: 0/1 per voxel of the displayed image, already cleaned by the library.
  async function callbackImg(mask, modelEntry) {
    sculptEditor?.invalidate();
    lastInferenceModelEntry = modelEntry;
    lastBrainMask = Uint8Array.from(mask, (v) => (v ? 1 : 0));
    lastExtractedBrain = new nv1.volumes[0].img.constructor(mask.length);
    const inputImage = nv1.volumes[0].img;
    for (let i = 0; i < mask.length; i++) lastExtractedBrain[i] = inputImage[i] * lastBrainMask[i];
    if (maskToggle) maskToggle.disabled = false;
    await renderCachedOutput();
    sculptEditor?.updateAvailability();
  }

  async function reportTelemetry(statData) {
    if (typeof statData === "string") {
      try {
        statData = JSON.parse(statData);
      } catch (e) {
        console.error("Failed to parse telemetry data", e);
        return;
      }
    }
    statData = await localSystemDetails(statData, nv1.gl);
    diagnosticsString = ":: Diagnostics https://github.com/neuroneural/brainchop/issues ::\n";
    for (const key in statData) {
      if (statData[key] !== null && statData[key] !== undefined) {
        diagnosticsString += `${key}: ${statData[key]}\n`;
      }
    }
  }

  function callbackUI(message = "", progressFrac = -1, modalMessage = "", statData = []) {
    if (message) {
      console.log(message);
      document.getElementById("location").innerHTML = message;
    }
    if (isNaN(progressFrac)) {
      memstatus.style.color = "red";
      memstatus.innerHTML = "Memory Issue";
    } else if (progressFrac >= 0) {
      modelProgress.value = progressFrac * modelProgress.max;
    }
    if (modalMessage) {
      showModal("Message", escapeHtml(String(modalMessage)).replace(/\n/g, "<br>"));
    }
    if (statData && Object.keys(statData).length > 0) {
      reportTelemetry(statData);
    }
  }

  function handleLocationChange(data) {
    document.getElementById("location").innerHTML = data.string
      .split("   ")
      .map((value) => value.trim())
      .filter((value) => value !== "")
      .map((value) => `<span class="loc-seg">${value}</span>`)
      .join('<span class="loc-sep">&middot;</span>');
  }

  const defaults = {
    // Match the 2D panes (whose surround is the image's black background) so the
    // 3D render tile no longer reads as a lighter gray box.
    backColor: [0, 0, 0, 1],
    show3Dcrosshair: true,
    onLocationChange: handleLocationChange,
  };

  const nv1 = new Niivue(defaults);
  await nv1.attachTo("gl1");
  // Brighten every colormap (scan, brain overlay and mask) in all four panels:
  // rodent scans read dark at gamma 1. 1.6 lifts shadows and mid-tones without
  // washing out the copper overlay, which turns beige above ~2.
  nv1.setGamma(1.6);
  sculptEditor = installSculptEditor({
    nv: nv1,
    getState: () => lastBrainMask ? {
      mask: lastBrainMask, dims: nv1.volumes[0].hdr.dims.slice(1, 4),
      affine: nv1.volumes[0].hdr.affine, running: inferenceRunning,
    } : null,
    prepare: async () => {
      resetLabelIsolation();
      maskToggle.checked = true;
      await renderCachedOutput();
    },
    onPatch: ({ rect }) => {
      const [x0, y0, x1, y1] = rect;
      const [nx, ny, nz] = nv1.volumes[0].hdr.dims.slice(1, 4);
      const source = nv1.volumes[0].img;
      for (let z = 0; z < nz; z++) for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++) {
          const i = x + nx * (y + ny * z);
          lastExtractedBrain[i] = source[i] * lastBrainMask[i];
        }
    },
    onError: error => showModal("Sculpting", escapeHtml(error.message)),
  });
  // Alt/Option-click a region to isolate it (see handleIsolateClick).
  nv1.gl.canvas.addEventListener("click", handleIsolateClick);

  // Esc restores the full segmentation (unless a dialog is open — let it close).
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || isolatedLabel === null) return;
    if (document.querySelector("dialog[open]")) return;
    isolatedLabel = null;
    applyLabelIsolation();
  });

  // Note: we intentionally do NOT force the label overlay to NEAREST in the 3D
  // pass. niivue's draw3D uses LINEAR there on purpose — in a volume ray-marcher
  // nearest sampling makes big opaque regions (e.g. white matter) accumulate
  // into a flat, noisy "glow" with the folds washed out. LINEAR gives the soft
  // shading that reveals surface structure. 2D panels stay crisp via
  // setInterpolation(true).

  // Crisp isolation. niivue's atlas shader anti-aliases label edges with a
  // 7-tap alpha feather (uniform xyzaFrac.xyz = 1/dims). With the full
  // segmentation every voxel is a label, so the feather is invisible — but an
  // isolated region borders background (0), and the feather softens that edge,
  // making the isolated region look blurry/"interpolated" in 2D even though the
  // texture filter is nearest (the feather is baked into the overlay texture
  // that both 2D and 3D sample). While a region is isolated we zero the feather
  // offsets for the atlas shaders so edges stay hard, matching the full-seg
  // look; the outline component (xyzaFrac.a) is preserved. Passes through
  // untouched when not isolating, so the full segmentation is unchanged.
  const _origUniform4fv = nv1.gl.uniform4fv.bind(nv1.gl);
  nv1.gl.uniform4fv = function (loc, v) {
    if (isolatedLabel !== null) {
      const aU = nv1.orientShaderAtlasU && nv1.orientShaderAtlasU.uniforms.xyzaFrac;
      const aI = nv1.orientShaderAtlasI && nv1.orientShaderAtlasI.uniforms.xyzaFrac;
      if ((aU && loc === aU) || (aI && loc === aI)) {
        return _origUniform4fv(loc, [0, 0, 0, v[3]]);
      }
    }
    return _origUniform4fv(loc, v);
  };

  // Draw the isolated-region readout at the end of every frame (screen-space,
  // so it doesn't rotate with the 3D head).
  const _origDrawSceneCore = nv1.drawSceneCore.bind(nv1);
  nv1.drawSceneCore = function () {
    const s = _origDrawSceneCore();
    try { drawIsolationHUD(); } catch (e) { console.warn("isolation HUD draw failed", e); }
    return s;
  };
  Object.assign(nv1.opts, {
    dragMode: nv1.dragModes.slicer3D,
    multiplanarForceRender: true,
    yoke3Dto2DZoom: true,
    crosshairGap: 11,
  });
  // Reflect the actual initial drag mode in the segmented control, so the
  // highlight always matches nv.opts.dragMode regardless of the HTML default.
  {
    const seg = document.getElementById("dragSegmented");
    if (seg) seg.querySelectorAll("button").forEach((b) =>
      b.classList.toggle("active", parseInt(b.dataset.drag, 10) === nv1.opts.dragMode));
  }
  nv1.setInterpolation(true);

  async function loadExample(url) {
    clearCachedResult();
    while (nv1.volumes.length) {
      await nv1.removeVolume(nv1.volumes[nv1.volumes.length - 1]);
    }
    resetLabelIsolation();
    await nv1.loadVolumes([{ url }]);
  }

  nv1.onImageLoaded = doLoadImage;
  if (sampleSelect) {
    sampleSelect.onchange = () => loadExample(sampleSelect.value);
    await loadExample(sampleSelect.value);
  }

  // Clear loading placeholder
  modelSelect.innerHTML = "";

  // Add default placeholder
  const placeholderOption = document.createElement("option");
  placeholderOption.text = "Run Segmentation Model";
  placeholderOption.value = "-1";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  placeholderOption.hidden = true;
  modelSelect.appendChild(placeholderOption);

  for (let i = 0; i < inferenceModelsList.length; i++) {
    console.log(`Adding model option: ${inferenceModelsList[i].modelName}`);
    const option = document.createElement("option");
    option.text = inferenceModelsList[i].modelName;
    option.value = i;

    if (inferenceModelsList[i].type === 'Divider') {
      option.disabled = true;
    }

    modelSelect.appendChild(option);
  }
  // Phone/desktop layout: pick the multiplanar tiling that actually maximizes
  // pane size, and offer single-plane views on narrow screens. Installed after
  // onImageLoaded so it can chain onto it. See responsive-layout.js.
  installResponsiveLayout(nv1);
  // Pinch guards: keep two-finger gestures zooming the image, not the document.
  installTouchViewControls(nv1);
  // modelSelect.selectedIndex = -1; // Removed as we want the placeholder to be selected by default (which is index 0 or value "-1")
  // Actually, we set selected=true on placeholder, so browser should pick it up.
  // But let's be explicit.
  modelSelect.value = "-1";
  setPen(-1);

  await probeBackends();

  // --- FIX IS HERE ---
  // Use URLSearchParams to correctly parse the query string.
  const urlParams = new URLSearchParams(window.location.search);
  const modelParam = urlParams.get("model");
  if (modelParam && modelParam < inferenceModelsList.length) {
    modelSelect.value = modelParam;
    runSelectedInference();
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// Helper to show custom modal
function showModal(title, message, opts = {}) {
  const dialog = document.getElementById("appDialog");
  const titleEl = document.getElementById("dialogTitle");
  const msgEl = document.getElementById("dialogMessage");
  const closeBtn = document.getElementById("dialogCloseBtn");

  if (!dialog) return;

  titleEl.textContent = title;
  msgEl.innerHTML = message;

  // Default: show the bottom Close button. The Save picker hides it — you
  // dismiss via an option, the top-right ×, Esc, or the backdrop.
  closeBtn.style.display = opts.hideClose ? "none" : "";
  closeBtn.onclick = () => dialog.close();
  dialog.classList.toggle("dialog-save", !!opts.saveMode);
  const xBtn = document.getElementById("dialogXBtn");
  if (xBtn) xBtn.onclick = () => dialog.close();
  dialog.showModal();
}

async function updateStarCount() {
  try {
    const response = await fetch("https://api.github.com/repos/neuroneural/brainchop");
    const data = await response.json();
    document.getElementById("star-count").textContent = data.stargazers_count;
  } catch (error) {
    console.error("Error fetching star count:", error);
  }
}

(async function () {
  await main();
  await updateStarCount();
})();
