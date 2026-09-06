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
camera angle. **Crosshair** controls its opacity from hidden to full brightness;
the marker leaves a clear hole at the center. **Lock to slice crosshair** pins
Grab/Smooth to the nearest point on a surface triangle, with an explicit distance
label and a connector to the slice point. Hovering elsewhere does not retarget a
locked brush. Rotation also preserves the anchor. During a grab, slices follow the displaced surface anchor and show
the current binary mask. Double-click a slice, or choose **Focus slice**, to bring
its nearest surface point forward. **Escape** cancels a grab. Undo/redo is available through
buttons, Ctrl/Command-Z, Ctrl/Command-Shift-Z, or Ctrl/Command-Y.

**Scoop** removes a sphere of mask voxels at the orange cursor. The circle in
each slice is the sphere's intersection with that slice, in physical millimeters.
Click for one scoop; drag to sweep a continuous sphere at the initial camera depth.
It does not follow a changing surface underneath, so the tool will not chase a
hole deeper as voxels disappear. Rotate between strokes to choose another plane.
With **Lock to slice crosshair**, Scoop starts at the exact slice point, including
points inside/outside the surface; this differs from Grab/Smooth's surface anchor.
The cursor responds immediately; accepted mesh and mask revisions publish together.
Escape restores the entire stroke. Undo/redo includes both geometry and mask, and
Grab/Smooth remain available after a cut. Scoop can sever thin connections; there
is no automatic removal of the resulting disconnected components.

**Done** retains corrections and session history. Reopening Sculpt reuses the
mesh. Loading another image, running inference again, or applying a 2D drawing
invalidates that mesh/history. Apply any pending drawing before entering Sculpt.
The mask and skull-stripped brain exports include accepted corrections. A page
reload does not retain sculpt history; save the corrected NIfTI before leaving.

## Implementation

- `sculpt/surface.js`: welded marching-tetrahedra extraction at 0.5 (whole volume
  initially, selected lattice cells for cuts), physical geometry helpers, an XY
  triangle index, and column-wise filled-surface voxelization.
- `sculpt/geometry.js`: editing sessions, local normal deformation, and mesh/mask
  undo patches. The Smooth tool uses weighted local
  Jacobi relaxation with pinned vertices outside the brush and bounded physical
  displacement. Padding closes image-edge surfaces.
- `sculpt/topology.js`: sparse extraction of changed lattice cells, with stable
  vertex/triangle slots and welded boundary vertices. Scoop subtracts a swept
  world-space sphere from voxel centers. Free mesh slots are reused; buffers grow
  only when needed. Undo stores changed slots and removed voxel IDs, not whole
  mesh snapshots. Cells affected by Grab/Smooth since the last extraction are
  also re-extracted when cutting, retaining their exact voxel masks while
  resampling their subvoxel geometry to the binary boundary. Untouched cells
  retain their geometry. Triangle indexes update locally; adjacency rebuilds lazily.
- `sculpt/targeting.js`: closest-point triangle projection and interpolated normals
  for explicit slice-to-surface targeting; inactive triangle slots are ignored.
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

Grab/Smooth preserve topology; Scoop changes it with local remeshing. There is
no component deletion tool, fill brush, or model update/backpropagation feature.
The spherical cut is voxel-resolution, so a small cut may have visible sampling
steps; Smooth can soften the result. Undo is the exact recovery from overscooping. Displacement is limited to a quarter of the brush radius per grab.
Image-boundary exits and locally folded triangles reject and cancel the stroke.
These Grab/Smooth checks are not a general self-intersection solver; extreme cumulative
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
poles, a full revolution, and off-center roll. Scoop tests cover closed local
replacement after deformations, swept-path sampling, reflected/oblique affines,
image-edge cuts, severing a bridge, complete removal, history branching, mixed
Grab/Smooth/Scoop history, and triangle-interior targeting. The browser fixture uses real NiiVue, WebGL2 and the worker, and
checks drawing export against the canonical mask after Grab and Scoop, camera/slice behavior,
undo/redo, cancellation, narrow layout, and retained history.

The full app smoke test runs the bundled rodent model, sculpts its actual 256³
output with Grab and Scoop, checks undo/redo and downloads both NIfTI outputs. It verifies the
exported brain equals the input times the corrected mask at every voxel.

Developer timing values are recorded in `#sculpt-panel` data attributes, not in
the clinical editing controls. Preview time measures request-to-render-submission
processing, not display scanout or GPU completion. Benchmark on target devices;
local Chrome results are not cross-browser latency guarantees.
