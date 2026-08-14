// brainchop-webgl2-worker.js
// ---------------------------------------------------------------------------
// Worker for the NATIVE WebGL2 path (webgl2_runners/), as distinct from
// brainchop-webworker.js which is the tfjs path and remains the fallback.
//
// WHY A WORKER, not the main thread like inference-webgpu.js. The WebGL2 runner
// is synchronous: readPixels blocks and there is no cooperative yield. brainchopC
// measured its in-thread WebGL2 path drawing THREE FRAMES in 2.2 seconds against
// 56 for WebGPU -- a hung tab, not a slow one. The same measurement showed a
// worker takes the longest frame gap to 0 ms with no change to the backend at
// all, because an OffscreenCanvas needs no DOM.
//
// PRE- AND POST-PROCESSING ARE COPIED FROM inference-webgpu.js, NOT FROM
// inference-logic.js, and that is load-bearing rather than incidental. The
// weights come from model.safetensors, so this path inherits the WebGPU
// orientation convention: it must use `modelEntry.enableTranspose` and must NOT
// use `webglEnableTranspose`. Memory `webgl-tissue-gwm-orientation` records that
// id 7's tfjs export wants the OPPOSITE transpose from its safetensors export,
// and feeding the wrong one degrades the segmentation to noise without erroring.
//
// The upside of matching inference-webgpu.js exactly is that the WebGPU runner's
// output on the same volume is a direct oracle: same input pipeline, same
// weights, same output pipeline, so any label difference is the kernels.
// ---------------------------------------------------------------------------

import * as tf from '@tensorflow/tfjs';
import {
  minMaxNormalizeVolumeData,
  quantileNormalizeVolumeData,
  processSegmentationVolume,
} from './tensor-utils.js';
import {
  createStatData, addLabelStats, markSuccess, markFailure, ExecutionModes,
} from './diagnostic-stats.js';
import { descriptorFor } from './webgl2_runners/descriptors.js';
import { parseSafetensors, describeSafetensors, packWeights, deriveDescriptor } from './webgl2_runners/weights.js';
import { probeWebgl2, runMeshNetGL } from './webgl2_runners/meshnet_gl.js';

function callbackUI(message = '', progressFrac = -1, modalMessage = '', statData = []) {
  let statStr = [];
  if (statData && Object.keys(statData).length > 0) statStr = JSON.stringify({ ...statData });
  self.postMessage({ cmd: 'ui', message, progressFrac, modalMessage, statData: statStr });
}

function callbackImg(img, opts, modelEntry) {
  self.postMessage({ cmd: 'img', img, opts, modelEntry });
}

/** A refusal, not a crash: main.js reads this and starts the tfjs worker. */
function refuse(reason) {
  self.postMessage({ cmd: 'unsupported', reason });
}

async function run(opts, modelEntry, niftiHeader, niftiImage) {
  const entry = descriptorFor(modelEntry);
  if (!entry) {
    refuse(`no native WebGL2 descriptor for ${modelEntry.path} (needs a webgl2_runners/descriptors.js entry and a model.safetensors)`);
    return;
  }
  if (!entry.fullVolume) {
    // The 24- and 32-channel models want 1.6-2.1 GiB of activations at 256^3 and
    // today's tfjs path crops them. Cropping here means a crop/restore pass this
    // worker does not have, so they stay on the tfjs channel-list path until it
    // is written -- deliberately, so the first cut has no half-tested path.
    refuse(`${entry.name} needs cropping on this path, which is not implemented yet`);
    return;
  }

  const statData = createStatData(modelEntry, ExecutionModes.WEBGL_WEBWORKER ?? 'webgl2-native');
  statData.TF_Backend = 'webgl2-native';
  callbackUI('Segmentation started', 0);

  const dim = 256;                      // main.js conforms before dispatching
  const dims = [dim, dim, dim];

  // ---- weights ----------------------------------------------------------
  callbackUI('Loading weights...', 0.05);
  const stUrl = `${opts.rootURL}${modelEntry.webgpu_safetensor.replace(/^\.\//, '/')}`;
  const stRes = await fetch(stUrl);
  if (!stRes.ok) { refuse(`could not fetch ${stUrl}: ${stRes.status}`); return; }
  const raw = await stRes.arrayBuffer();
  const tensors = parseSafetensors(raw);
  const desc = describeSafetensors(tensors);
  const d = deriveDescriptor(desc, {
    nx: dim, ny: dim, nz: dim,
    activation: entry.activation,
    dilations: entry.dilations,
  });

  // ---- probe before doing any real work --------------------------------
  const probe = probeWebgl2(d, dims);
  console.log(`[webgl2-native] ${entry.name}: ${d.chan}ch P=${d.planes} ${d.nclass}cls ` +
    `norm=${d.norm} affine=${d.affine} act=${d.activation} | ` +
    `${Math.round(probe.activationBytes / 1048576)} MB activations | ${probe.renderer}`);
  if (!probe.supported) { refuse(probe.reasons.join('; ')); return; }

  const packed = packWeights(desc, d);

  // ---- preprocessing, identical to inference-webgpu.js ------------------
  callbackUI('Preparing input data...', 0.1);
  await tf.setBackend('webgl');
  // Let tfjs hand textures back promptly: the runner is about to ask for ~1 GiB
  // and tfjs's default is to retain a texture pool for speed. brainchop-test's
  // tfjs worker deliberately sets this to -1 for that reason; here the opposite
  // is what we want, because tfjs is only doing pre/post work.
  tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 0);

  let input, finalShape;
  {
    let t = tf.tensor(niftiImage, dims, 'float32');
    const normed = modelEntry.enableQuantileNorm
      ? await quantileNormalizeVolumeData(t)
      : await minMaxNormalizeVolumeData(t);
    t.dispose();
    t = normed;
    if (modelEntry.inputPermutation) {
      const p = t.transpose(modelEntry.inputPermutation); t.dispose(); t = p;
    } else if (modelEntry.enableTranspose) {
      const p = t.transpose(); t.dispose(); t = p;
    }
    finalShape = t.shape;
    input = new Float32Array(await t.data());
    t.dispose();
  }
  // Release tfjs's GPU allocations before the runner allocates its own. Without
  // this the two pools compete and the probe's "allocates" answer stops meaning
  // anything.
  tf.engine().disposeVariables();
  tf.engine().reset();

  // ---- inference -------------------------------------------------------
  callbackUI('Running inference...', 0.2);
  const t0 = performance.now();
  const out = runMeshNetGL({
    descriptor: d,
    packed: packed.data,
    offsets: packed.offsets,
    input,
    vox2: probe.vox2,
    onProgress: (frac, msg) => callbackUI(msg, 0.2 + 0.7 * frac),
    onLog: (msg) => console.log(msg),
  });
  const Inference_t = ((performance.now() - t0) / 1000).toFixed(4);
  console.log(`[webgl2-native] ---- Inference Time: ${Inference_t} s ---- (${out.path})`);

  // ---- postprocessing, identical to inference-webgpu.js ----------------
  await tf.setBackend('webgl');
  let outLabelVolume = tf.tidy(() => {
    // Int32Array, NOT Array.from: Array.from on 16.7M entries builds a boxed JS
    // array of ~130 MB and takes seconds, which would land inside the number
    // this path exists to improve.
    let v = tf.tensor(new Int32Array(out.labels), finalShape, 'int32');
    if (modelEntry.outputPermutation) v = v.transpose(modelEntry.outputPermutation);
    else if (modelEntry.enableTranspose) v = v.transpose();
    return v;
  });

  // An all-zero volume is a failure, never a result. Per the standing rule that
  // a silent wrong answer is the cardinal sin, this must not reach the viewer as
  // a successful empty segmentation.
  const sum = tf.tidy(() => tf.sum(outLabelVolume).dataSync()[0]);
  if (sum === 0) {
    outLabelVolume.dispose();
    refuse('native WebGL2 produced an all-zero volume');
    return;
  }

  const p0 = performance.now();
  const outimg = await processSegmentationVolume(outLabelVolume, niftiImage, modelEntry, opts);
  const Postprocess_t = ((performance.now() - p0) / 1000).toFixed(4);
  outLabelVolume.dispose();
  tf.engine().disposeVariables();

  const uniq = new Set(outimg);
  addLabelStats(statData, modelEntry.numClasses || uniq.size, uniq.size);
  markSuccess(statData, Inference_t, Postprocess_t);
  callbackUI(modelEntry.modelName + '<br>Segmentation finished', 0);
  callbackUI('', -1, '', statData);
  callbackImg(outimg, opts, modelEntry);
}

self.addEventListener('message', async (e) => {
  const { opts, modelEntry, niftiHeader, niftiImage } = e.data;
  try {
    await run(opts, modelEntry, niftiHeader, niftiImage);
  } catch (err) {
    console.error('[webgl2-native] failed', err);
    // Any throw is a refusal from main.js's point of view: it should try the
    // tfjs worker rather than show the user an error, because the tfjs path can
    // still run every one of these models.
    try {
      const statData = createStatData(modelEntry, 'webgl2-native');
      markFailure(statData, err, 'native WebGL2 runner');
    } catch { /* stats are best-effort */ }
    refuse(err?.message || String(err));
  }
});
