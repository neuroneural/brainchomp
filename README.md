# Brainchomp

Brainchomp is a browser-only rodent brain-extraction app derived from
[Brainchop](https://github.com/neuroneural/brainchop-test). Imaging data stays
on the user's device.

Live app: [neuroneural.net/brainchomp](https://neuroneural.net/brainchomp/)

## Outputs

- **Skull-strip** runs the rodent MeshNet, retains its largest connected
  foreground component, and saves the original input intensities with
  non-brain voxels set to zero.
- **Brainmask** runs the same checkpoint and saves the post-processed binary
  mask.

Both outputs are shown as overlays on the dropped image. Skull-strip uses the
same copper overlay as Brainchop's MindGrab result; Brainmask uses a binary label
overlay.

## Input contract

This version intentionally does not conform or resample inputs. NIfTI volumes
must already be `256 × 256 × 256`. Model preprocessing is min/max
normalization.

Two bundled volumes can be selected from the toolbar:

- `MA_F_15M_20_image.nii.gz` — rodent MRI
- `camriMouse_sub-012_ses-1_t2w_image_mask.nii.gz` — binary brain mask

Both supplied files are `256³` float32 NIfTIs with 0.1 mm isotropic voxel
spacing, and their headers are served unchanged.

## Model and runtimes

The single checkpoint is a 25-block MeshNet with 16 hidden channels,
non-affine per-channel GroupNorm, GELU, and two output classes. Foreground is
class 1. The app prefers the generated fp16 WebGPU runner and falls back to the
native WebGL2 runner. A TF.js model is retained as a final compatibility
fallback.

The WebGPU export uses the low-memory Brainchop pipeline: fp16 activation
storage, fp32-safe GroupNorm conditioning, and fused two-class argmax. The
largest individual activation buffer is 512 MiB.

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
