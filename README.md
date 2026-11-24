# Brainchomp

Brainchomp is a browser-only rodent brain-extraction app derived from
[Brainchop](https://brainchop.org/) ([GitHub](https://github.com/neuroneural/brainchop)).
Imaging data stays on the user's device.

Live app: [brainchomp.org](https://brainchomp.org/) — Working with human brain MRI? Use [Brainchop](https://brainchop.org/).

## Model and outputs

The single **Skull-strip** model is run by
[brainchomp-lib](https://github.com/neuroneural/brainchomp-lib). One inference
produces both downloadable outputs:

- a skull-stripped image that preserves the input intensities and sets
  non-brain voxels to zero;
- a post-processed binary brain mask.

The **Mask** toggle switches the overlay without rerunning inference. The brain
uses the same copper overlay as Brainchop's MindGrab result; the mask uses a
binary label overlay. The Save menu always offers both files.

## Input contract

The model was trained on `256 × 256 × 256` volumes of 0.1 mm voxels whose
headers claimed LPS but whose voxel axes actually run R, S, A. The model entry's
`inputWorldRemap` (`brainchop-parameters.js`) rewrites the affine of the copy
sent to the model to reproduce that layout; display is untouched and the mask
returns on the same voxel grid. Drop the field for a correctly trained model.
brainchomp-lib conforms any other input to that grid (trilinear,
centered on the input's field of view, robust 0–255 rescale), normalizes with
the 2nd and 98th intensity percentiles, keeps the largest connected component,
applies a morphological opening (`maskOpeningRadius` = 4 voxels) that cuts off
skull or muscle attached by thin bridges, and returns the mask on the input's
own grid. The app displays and edits the image as loaded.

Headers must carry real voxel sizes: rodent scans whose headers were scaled ×10
for human tools have to be fixed first.

Two bundled volumes can be selected from the toolbar:

- `MA_F_15M_20_image.nii.gz` — rodent MRI
- `camriMouse_sub-012_ses-1_t2w_image.nii.gz` — CAMRI mouse T2-weighted MRI

Both are min/max-quantized `256³` uint8 NIfTIs. Their headers now state the
true axes (voxel i→R, j→S, k→A, 0.1 mm), verified by matching the CAMRI sample
to its source scan `sub-012_ses-1_acq-RARE_T2w` (r = 0.96; mirrored 0.82). The
CAMRI origin is the source scan's; MA_F_15M_20 is centred and its L/R is
assumed. True CAMRI voxels are ~0.075 mm (19.2 mm conformed into 256), but the
header keeps 0.1 mm to match training, so correctly scaled inputs reach the
model ~25% smaller than its training data.

## Reorient

Quadrupeds scanned with biped DICOM labels (HFS/HFP swaps prone and supine)
load mis-oriented. The **Reorient** button asks where the on-screen A, S and L
labels truly point (L, not R: neurological display; "Not sure" assumes no
mirroring), then rewrites only the header affine and reloads. It confirms
before discarding a segmentation, edits or pending drawing.

## Model and runtimes

The model is a 13-block MeshNet with 16 channels, dilations
1,3,5,7,13,19,31,19,13,7,5,3,1, GroupNorm with a per-channel affine, GELU, and
two output classes. Inference runs inside a Web Worker from vendored
[brainchomp-lib](https://github.com/neuroneural/brainchomp-lib):

- **WebGPU V4 8-bit (primary, zero WASM):** pure-JS ZYCX split-plane U8×4 engine
  with 3-tier support (`shader-f16` + flexible subgroups, `shader-f16` shared
  memory, and `f32` fallback when `shader-f16` is absent), automatic 128 MiB
  `LowMem128` layout, 3-layer GPU auto-detection + self-calibrating micro-probe
  (cached 30 days), Windows WDDM TDR-safe pacing, and Layer 3 automatic
  safe-mode retry.
- **WebGL2 WASM (fallback):** `public/brainchomp/brainchomp-gl.wasm`, skipping
  software rasterisers in `auto` mode.
- **Threaded CPU WASM (fallback):** `public/brainchomp/brainchomp.wasm` on
  cross-origin isolated pages (COOP/COEP).

`vendor/brainchomp/` holds the bundled API (`index.js`) and `VERSION` (the
upstream `brainchomp-lib` commit); `public/brainchomp/` holds `worker.js`,
`rodent.bin`, and the WebGL2/CPU fallback WASM modules. To refresh the vendored
copy:

```sh
(cd ../brainchomp-lib/js && npm run build)
scripts/update-brainchomp-lib.sh ../brainchomp-lib
```

## Development

```sh
npm ci
npm run dev
```

Append `?backend=webgl2` (or `webgpu`, `cpu`) to force one backend, or
`?webgpuMode=low-memory` (`standard`, `recalibrate`, `probe`) and
`?webgpuExec=single|pipelined|paced` to override WebGPU V4 scheduling.

## License

Brainchomp inherits Brainchop's [MIT license](LICENSE).
