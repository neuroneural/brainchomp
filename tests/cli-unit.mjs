import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import * as tf from '@tensorflow/tfjs'
import { dilatedConv3d, readNifti, writeNifti } from '../cli.mjs'

test('space-to-batch conv matches a direct dilated same-padded conv', () => {
  const [n, ci, co] = [8, 2, 3]
  const x = tf.randomNormal([1, n, n, n, ci])
  const w = tf.randomNormal([3, 3, 3, ci, co])
  const X = x.arraySync()[0]
  const W = w.arraySync()
  for (const d of [1, 2, 4]) {
    const got = dilatedConv3d(x, w, d).arraySync()[0]
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
      for (let o = 0; o < co; o++) {
        let s = 0
        for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
          const [ii, jj, kk] = [i + (a - 1) * d, j + (b - 1) * d, k + (c - 1) * d]
          if (ii < 0 || jj < 0 || kk < 0 || ii >= n || jj >= n || kk >= n) continue
          for (let q = 0; q < ci; q++) s += X[ii][jj][kk][q] * W[a][b][c][q][o]
        }
        assert.ok(Math.abs(got[i][j][k][o] - s) < 1e-4, `d=${d} (${i},${j},${k},${o}): ${got[i][j][k][o]} vs ${s}`)
      }
    }
  }
})

test('writeNifti keeps the source header and swaps datatype', () => {
  const src = readNifti('public/examples/MA_F_15M_20_image.nii.gz')
  const data = Float32Array.from(src.img, (v) => v / 2)
  const out = join(tmpdir(), `brainchomp-cli-${process.pid}.nii.gz`)
  writeNifti(out, src, data, 16, true)
  const back = readNifti(out)
  assert.deepEqual(back.hdr.affine, src.hdr.affine)
  assert.equal(back.hdr.datatypeCode, 16)
  assert.equal(back.hdr.scl_slope, 1)
  assert.deepEqual(back.img, data)
  assert.equal(gunzipSync(readFileSync(out)).length, src.hdr.vox_offset + data.byteLength)
})
