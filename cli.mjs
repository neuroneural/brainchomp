#!/usr/bin/env node
// Apply the rodent brain-extraction model to a 256^3 NIfTI file.
// Mirrors the WebGPU path in inference-webgpu.js, on the tfjs-node CPU backend.
import * as nifti from 'nifti-reader-js'
import { readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import util, { parseArgs } from 'node:util'
import { fileURLToPath } from 'node:url'
import { inferenceModelsList } from './brainchop-parameters.js'
import { LayerNormInPlace, quantileNormalizeVolumeData, processSegmentationVolume } from './tensor-utils.js'

// tfjs-node 4.22 calls util.isNullOrUndefined, which Node 23+ removed.
util.isNullOrUndefined ??= (v) => v === null || v === undefined
const tf = await import('@tensorflow/tfjs-node')

const TYPES = {
  2: Uint8Array, 4: Int16Array, 8: Int32Array, 16: Float32Array,
  64: Float64Array, 256: Int8Array, 512: Uint16Array, 768: Uint32Array
}
const DT_UINT8 = 2
const DT_FLOAT32 = 16

const modelEntry = inferenceModelsList.find((m) => m.webgpu_runner === 'rodent')
const modelUrl = new URL('./public/models/rodent/model.json', import.meta.url).href

// The TF CPU Conv3D kernel rejects dilation, so run dilated 'same' convs via
// space-to-batch (what tf.nn.convolution does). Needs each dim % dilation == 0.
export function dilatedConv3d(x, w, d) {
  if (d === 1) return tf.conv3d(x, w, 1, 'same')
  return tf.tidy(() => {
    const p = d * (w.shape[0] >> 1)
    const s2b = tf.spaceToBatchND(x, [d, d, d], [[p, p], [p, p], [p, p]])
    return tf.batchToSpaceND(tf.conv3d(s2b, w, 1, 'valid'), [d, d, d], [[0, 0], [0, 0], [0, 0]])
  })
}

function conv3dLayer(layer, x) {
  const [w, b] = layer.getWeights()
  const y = dilatedConv3d(x, w, layer.dilationRate[0])
  return b ? y.add(b) : y
}

export function readNifti(path) {
  let buf = readFileSync(path)
  buf = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  if (nifti.isCompressed(buf)) buf = nifti.decompress(buf)
  if (!nifti.isNIFTI1(buf)) throw new Error(`${path}: only single-file NIfTI-1 (.nii/.nii.gz) is supported`)
  const hdr = nifti.readHeader(buf)
  if (!hdr.littleEndian) throw new Error(`${path}: big-endian NIfTI is not supported`)
  const Type = TYPES[hdr.datatypeCode]
  if (!Type) throw new Error(`${path}: unsupported NIfTI datatype ${hdr.datatypeCode}`)
  const img = new Type(nifti.readImage(hdr, buf))
  return { hdr, bytes: new Uint8Array(buf), img }
}

// Copy the source header + extensions verbatim so the affine is exact; patch only the data type.
export function writeNifti(path, src, data, datatype, resetScale) {
  const head = src.bytes.slice(0, src.hdr.vox_offset)
  const view = new DataView(head.buffer)
  view.setInt16(70, datatype, true)
  view.setInt16(72, data.BYTES_PER_ELEMENT * 8, true)
  if (resetScale) {
    view.setFloat32(112, 1, true)
    view.setFloat32(116, 0, true)
  }
  const body = new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
  const out = Buffer.concat([head, body])
  writeFileSync(path, path.endsWith('.gz') ? gzipSync(out) : out)
}

export async function run(inputPath, prefix, log = console.error) {
  const src = readNifti(inputPath)
  const [, nx, ny, nz] = src.hdr.dims
  if (nx !== 256 || ny !== 256 || nz !== 256) {
    throw new Error(`Input must be 256x256x256 (got ${nx}x${ny}x${nz})`)
  }

  const raw = tf.tensor(src.img, [256, 256, 256], 'float32')
  const norm = await quantileNormalizeVolumeData(raw)
  raw.dispose()
  let x = tf.tidy(() => norm.transpose().reshape([1, 256, 256, 256, 1]))
  norm.dispose()

  const model = await tf.loadLayersModel(modelUrl)
  const t0 = performance.now()
  for (let i = 1; i < model.layers.length; i++) {
    const layer = model.layers[i]
    // Dispose each stage as soon as the next exists: activations are ~1 GB each.
    const y = tf.tidy(() => layer.getClassName() === 'Conv3D' ? conv3dLayer(layer, x) : layer.apply(x))
    x.dispose()
    x = y
    if (layer.name.endsWith('_gn')) {
      x = LayerNormInPlace(y)
      y.dispose()
    }
    log(`layer ${i}/${model.layers.length - 1} ${layer.name} (${((performance.now() - t0) / 1000).toFixed(1)} s)`)
  }

  const prob = tf.tidy(() => tf.softmax(x).slice([0, 0, 0, 0, 1], [1, 256, 256, 256, 1]).reshape([256, 256, 256]).transpose())
  const labels = tf.tidy(() => x.argMax(-1).reshape([256, 256, 256]).transpose())
  x.dispose()

  const mask = await processSegmentationVolume(labels, src.img, modelEntry, { isPostProcessEnable: true })
  labels.dispose()
  const brain = new src.img.constructor(mask.length)
  for (let i = 0; i < mask.length; i++) brain[i] = src.img[i] * mask[i]
  const probData = await prob.data()
  prob.dispose()

  const outputs = {
    mask: `${prefix}_mask.nii.gz`,
    brain: `${prefix}_brain.nii.gz`,
    prob: `${prefix}_prob.nii.gz`
  }
  writeNifti(outputs.mask, src, mask, DT_UINT8, true)
  writeNifti(outputs.brain, src, brain, src.hdr.datatypeCode, false)
  writeNifti(outputs.prob, src, probData, DT_FLOAT32, true)
  return outputs
}

if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(process.argv[1])) {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { output: { type: 'string', short: 'o' }, help: { type: 'boolean', short: 'h' } }
  })
  if (values.help || positionals.length !== 1) {
    console.error('Usage: brainchomp <input.nii[.gz]> [-o <prefix>]\n' +
      'Writes <prefix>_mask.nii.gz, <prefix>_brain.nii.gz, <prefix>_prob.nii.gz.\n' +
      'Default prefix: the input path without .nii/.nii.gz.')
    process.exit(values.help ? 0 : 2)
  }
  const input = positionals[0]
  const prefix = values.output ?? input.replace(/\.nii(\.gz)?$/, '')
  try {
    const out = await run(input, prefix)
    console.error(`Wrote ${Object.values(out).join(', ')}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}
