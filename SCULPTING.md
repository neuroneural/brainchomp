# Brain-mask sculpting

Run **Skull-strip**, then choose **Sculpt**. Hover to place a yellow tangent
circle. **Size** is the grab radius in physical millimeters. A left drag moves
the local surface along the normal locked at press time, with a smooth radial
falloff. When that normal faces the camera, dragging up pulls outward and down
pushes inward. Otherwise drag along its projected screen direction.

Use **Rotate**, right-drag, or two-finger scrolling over the surface to rotate
freely, including past the poles. Rotation preserves roll and leaves slices
fixed. **Option/Alt or Command + two-finger scroll** zooms in every tool mode;
native pinch events reported as Ctrl+wheel also zoom.

**Smooth** softens pinched or jagged geometry inside the brush footprint. Click
for a gentle correction, or drag upward for stronger smoothing. It changes the
actual mesh and filled mask, is local to the brush, and is undone as one stroke.
Repeated small strokes can soften a longer protrusion. It does not cut off blobs.

The cyan 3D crosshair tracks ordinary slice clicks. It remains visible through
the surface when the selected point is inside the brain, and does not change the
camera angle. During a grab, slices follow the displaced surface anchor and show
the current binary mask. Double-click a slice, or choose **Focus slice**, to bring
its nearest surface point forward. **Escape** cancels a grab. Undo/redo is available through
buttons, Ctrl/Command-Z, Ctrl/Command-Shift-Z, or Ctrl/Command-Y.

**Done** retains corrections and session history. Reopening Sculpt reuses the
mesh. Loading another image, running inference again, or applying a 2D drawing
invalidates that mesh/history. Apply any pending drawing before entering Sculpt.
The mask and skull-stripped brain exports include accepted corrections. A page
reload does not retain sculpt history; save the corrected NIfTI before leaving.

## Implementation

- `sculpt/geometry.js`: one-time, welded marching-tetrahedra extraction at 0.5,
  local normal deformation, an XY triangle index, column-wise filled-surface
  voxelization, and mesh/mask undo patches. The Smooth tool uses weighted local
  Jacobi relaxation with pinned vertices outside the brush and bounded physical
  displacement. Padding closes image-edge surfaces.
- `sculpt/worker.js`: owns the editable mesh and history. CPU geometry work stays
  off the UI thread. Only affected projected columns are voxelized; complete
  columns are necessary because a local surface patch is not closed.
- `sculpt/navigation.js`: quaternion camera orientation with unconstrained
  trackball rotation and continuous touchpad orbit.
- `sculpt/renderer.js`: WebGL2 surface rendering and depth/normal picking. The
  tangent ring is projected into a small 2D overlay using the same camera.
  Vertex and normal updates upload contiguous changed runs. Initial shading
  normals are smoothed without changing geometry; subsequent normals use the
  deformation’s inverse-transpose Jacobian, avoiding a full rebuild on release.
- `sculpt/slices.js`: maps storage voxels into NiiVue's RAS drawing texture using
  `permRAS`. The public R8 drawing upload avoids rebuilding MRI and label RGBA
  textures per preview. The actual overlay array remains the authoritative mask;
  the drawing is a temporary display representation, removed on Done.
- `sculpt/editor.js`: pointer state, coalesced worker requests, locked normal and
  anchor, cancellation, camera/slice coordination, and lifecycle cleanup.
- `main.js`: synchronizes extracted intensities from the edited mask; exports
  and statistics consume that same mask.

The worker always evaluates displacement from the stroke's original vertices,
not its preceding preview. This prevents event-rate-dependent deformation.
Previews publish matching mesh and mask revisions together; stale responses
from invalidated sessions are ignored. History targets 32 MiB and retains at
least the most recent operation, even if it individually exceeds that target.

This version has fixed topology: no cutting, remeshing, blob deletion, or model
updates. Displacement is limited to a quarter of the brush radius per grab.
Image-boundary exits and locally folded triangles reject and cancel the stroke.
These checks are not a general self-intersection solver; extreme cumulative
sculpting is outside this first version's intended small-correction workflow.
The surface interpolates between voxel centers; slice masks and saved labels
remain discrete. Display smoothing does not silently change the mask.

## Verification

From this directory:

```sh
npm run test:sculpt
npm run build
./node_modules/.bin/vite --host 127.0.0.1 --port 5178
# With the local server running and Google Chrome installed:
node tests/sculpt-browser.mjs
node tests/sculpt-app-smoke.mjs
```

The geometry tests cover exact round trips including holes, diagonal contacts,
islands and edge-touching masks; closed triangle winding; physical-space grabs
under reflected/oblique/anisotropic affines; event-rate independence; exact
cancel/undo/redo; history branching; image-edge rejection; all 48 storage
orientations; spike smoothing with exact rollback; and rotation through the
poles, a full revolution, and off-center roll. The browser fixture uses real NiiVue, WebGL2 and the worker, and
checks drawing export against the canonical mask, camera/slice behavior,
undo/redo, cancellation, narrow layout, and retained history.

The full app smoke test runs the bundled rodent model, sculpts its actual 256³
output, checks undo/redo and downloads both NIfTI outputs. It verifies the
exported brain equals the input times the corrected mask at every voxel.

Developer timing values are recorded in `#sculpt-panel` data attributes, not in
the clinical editing controls. Preview time measures request-to-render-submission
processing, not display scanout or GPU completion. Benchmark on target devices;
local Chrome results are not cross-browser latency guarantees.
