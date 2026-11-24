# Brainchomp

Browser-only rodent brain extraction (NiiVue UI + vendored brainchomp-lib). See README.md.

## Key files
- `main.js`: app; `segment()` call, `remapNiftiAffine()`, Reorient dialog.
- `brainchop-parameters.js`: single Skull-strip model entry.
- `index.html`: toolbar (Reorient next to Sculpt).
- `vendor/brainchomp/`: vendored [brainchomp-lib](https://github.com/neuroneural/brainchomp-lib) JS API (`index.js`, `*.d.ts`, `VERSION`).
- `public/brainchomp/`: vendored `worker.js`, `rodent.bin` weights for pure-JS WebGPU V4, and WebGL2/CPU WASM fallback modules (refreshed via `scripts/update-brainchomp-lib.sh`).
- `public/examples/*.nii.gz`: bundled 256³ uint8 samples.

## Orientation
- Samples were labelled LPS but voxel axes run R,S,A (CAMRI matched to source scan `sub-012_ses-1_acq-RARE_T2w`, 120x120x48 @0.16 mm: r=0.96 vs mirrored 0.82).
- Headers fixed: sform/qform i→R, j→S, k→A, 0.1 mm. CAMRI origin = source world origin; MA_F_15M_20 centred, L/R assumed (unverifiable).
- Model was trained on the mislabelled layout, so its entry has `inputWorldRemap` [[-1,0,0],[0,0,-1],[0,1,0]]. `remapNiftiAffine()` applies it to the copy sent to `segment()` only; display untouched; conform recentres so only the linear part matters; mask returns on the same grid.
- Verified: fixed samples + remap give masks identical to original runs; on raw source scan the remap adds olfactory bulb and cerebellum edges.
- NiiVue orientation cube on (`isOrientCube`).

## Reorient
3-step dialog: where the on-screen A, S, then L label (neurological view) truly points; step 3 "Not sure" = not mirrored (R = A×S). Rewrites header affine only and reloads; identity is a no-op; confirms before discarding segmentation/edits/pending drawing; then clears the drawing and disarms the pen (`setPen(-1)`). For quadrupeds with biped DICOM labels (HFS/HFP).

## Workflow
- No ESLint config in repo.
- Tests: `npm run test:sculpt`; `npm run test:sculpt:app` (needs `vite` dev server on 127.0.0.1:5178, Chrome).
- Do not commit/push until the maintainer signs off.

## Open items
- Scale: true CAMRI voxel ~0.075 mm (19.2 mm conformed into 256) but header kept 0.1 mm as trained; correctly scaled inputs reach the model ~25% smaller than training data.
- Retrain on correctly oriented (and scaled) data, then drop `inputWorldRemap`.
- Sample voxels differ from HEAD: background zeroed by an FSL 6.0.5 tool (header `descrip`) after the header fix; assumed a deliberate maintainer edit, confirm before commit.
