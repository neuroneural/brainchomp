# Brainchomp

Brainchomp is a browser-only rodent brain-extraction app derived from
[Brainchop](https://github.com/neuroneural/brainchop-test). Imaging data stays
on the user's device.

Live app: [neuroneural.net/brainchomp](https://neuroneural.net/brainchomp/)

## Model and outputs

The single **Skull-strip** model runs the rodent MeshNet and retains its largest
connected foreground component. One inference produces both downloadable
outputs:

- a skull-stripped image that preserves the input intensities and sets
  non-brain voxels to zero;
- a post-processed binary brain mask.

The **Mask** toggle switches the overlay without rerunning inference. The brain
uses the same copper overlay as Brainchop's MindGrab result; the mask uses a
binary label overlay. The Save menu always offers both files.

## Input contract

This version intentionally does not conform or resample inputs. NIfTI volumes
must already be `256 × 256 × 256`. Model preprocessing uses the 2nd and 98th
intensity percentiles with a `1e-3` denominator guard and clipping to `[0, 1]`,
matching MindGrab in brainchop-cli.

Two bundled volumes can be selected from the toolbar:

- `MA_F_15M_20_image.nii.gz` — rodent MRI
- `camriMouse_sub-012_ses-1_t2w_image.nii.gz` — CAMRI mouse T2-weighted MRI

Both supplied files are min/max-quantized `256³` uint8 NIfTIs with 0.1 mm
isotropic voxel spacing. Their spatial geometry is preserved from the source
volumes.

## Model and runtimes

The single checkpoint is a 25-block MeshNet with 16 hidden channels,
non-affine per-channel GroupNorm, GELU, and two output classes. Foreground is
class 1. The app prefers the generated fp16 WebGPU runner and falls back to the
native WebGL2 runner. A TF.js model is retained as a final compatibility
fallback.

The WebGPU export uses the low-memory Brainchop pipeline: fp16 activation
storage, fp32-safe GroupNorm conditioning, and fused two-class argmax. The
largest individual activation buffer is 512 MiB.

## Command-line use

`cli.mjs` runs the same model on NIfTI files in Node.js on the CPU. It uses
tfjs-node and the same normalization and largest-component postprocessing as
the app.

```sh
npm ci
node cli.mjs input.nii.gz -o out/sub-01
```

It writes three files. Each file has the header and affine of the input.

- `<prefix>_mask.nii.gz` — uint8 brain mask (largest connected component)
- `<prefix>_brain.nii.gz` — input multiplied by the mask, in the input datatype
- `<prefix>_prob.nii.gz` — float32 brain probability (softmax, no component filter)

If you do not give `-o`, the prefix is the input path without `.nii`/`.nii.gz`.
The input contract above also applies here: the input must be `256³`, NIfTI-1
and little-endian. One volume takes about 35 s and about 9.5 GB of RAM.

## Development

```sh
npm ci
npm run dev
```

Build and verification:

```sh
npm run build
node tests/webgl2_gate.mjs chromium
```

Append `?backend=webgl2` to the app URL to exercise the native WebGL2 fallback
on a browser that also supports WebGPU.

The model conversion inputs and reproducibility manifest live in
`temporaryRodentModel/`; browser-ready assets live in `public/models/rodent/`.

## License

Brainchomp inherits Brainchop's [MIT license](LICENSE).
