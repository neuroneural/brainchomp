# Brainchomp

Brainchomp is a browser-only rodent brain-extraction app derived from
[Brainchop](https://github.com/neuroneural/brainchop-test). Imaging data stays
on the user's device.

Live app: [brainchomp.org](https://brainchomp.org/)

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
two output classes. brainchomp-lib runs it in a Web Worker on WebGPU (fp16,
needs `shader-f16`), falling back to WebGL2, then to a threaded CPU module that
only starts on cross-origin isolated pages (not GitHub Pages).

Until the library is published on npm under its final name, its build is
vendored: `vendor/brainchomp/` holds the API (bundled with the app) and
`public/brainchomp/` the worker and wasm modules (loaded by URL).
`vendor/brainchomp/VERSION` records the library commit. To update:

```sh
(cd ../brainchomp-lib/js && npm run build)
scripts/update-brainchomp-lib.sh ../brainchomp-lib
```

## Development

```sh
npm ci
npm run dev
```

Append `?backend=webgl2` (or `webgpu`, `cpu`) to the app URL to force one
backend; one the browser cannot run is then reported as an error.

## License

Brainchomp inherits Brainchop's [MIT license](LICENSE).
