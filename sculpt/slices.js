// Storage voxel -> NiiVue drawing offset (RAS order), with all axis flips.
export function drawingLayout(dims, permRAS) {
  let offset = 0,
    stride = 1;
  const strides = [0, 0, 0];
  for (const signedAxis of permRAS) {
    const axis = Math.abs(signedAxis) - 1;
    strides[axis] = Math.sign(signedAxis) * stride;
    if (signedAxis < 0) offset += (dims[axis] - 1) * stride;
    stride *= dims[axis];
  }
  return { offset, strides };
}

// NiiVue's drawing texture is an R8 mask in RAS voxel order. Its public
// refreshDrawing path avoids reprocessing the MRI/label RGBA textures on every
// preview. Keep the storage-order application mask separate from this view.
export class MaskSliceAdapter {
  constructor(nv) {
    this.nv = nv;
    this.volume = nv.volumes[1];
    this.opacity = this.volume.opacity;
    this.drawOpacity = nv.drawOpacity;
    this.drawLut = nv.drawLut;
    if (!nv.loadDrawing(this.volume))
      throw new Error("Could not align the mask with the slice grid.");
    nv.drawClearAllUndoBitmaps(); // the sculpt worker owns undo, not NiiVue drawing
    nv.setDrawingEnabled(false);
    const lut = nv.drawLut.lut.slice();
    lut.set([217, 119, 33, 255], 4);
    nv.drawLut = { ...nv.drawLut, lut };
    nv.refreshColormaps();
    nv.setDrawOpacity(this.opacity);
    nv.setOpacity(1, 0);
    // permRAS lists signed storage axes in RAS order. Unlike toRASvox,
    // it is also defined on cloned NVImages and identity-oriented volumes.
    Object.assign(
      this,
      drawingLayout(this.volume.hdr.dims.slice(1, 4), this.volume.permRAS),
    );
  }
  patch({ rect, data }) {
    const [x0, y0, x1, y1] = rect,
      w = x1 - x0 + 1,
      h = y1 - y0 + 1;
    const [sx, sy, sz] = this.strides,
      draw = this.nv.drawBitmap;
    const nz = this.volume.hdr.dims[3];
    for (let z = 0; z < nz; z++)
      for (let y = y0; y <= y1; y++) {
        let dst = this.offset + x0 * sx + y * sy + z * sz,
          src = w * (y - y0 + h * z);
        for (let x = x0; x <= x1; x++, dst += sx) draw[dst] = data[src++];
      }
    this.nv.refreshDrawing(true);
  }
  close() {
    const nv = this.nv;
    const opacity = nv.drawOpacity;
    nv.closeDrawing();
    nv.drawLut = this.drawLut;
    nv.setDrawOpacity(this.drawOpacity);
    nv.refreshColormaps();
    if (nv.volumes[1] === this.volume) {
      this.volume.opacity = opacity;
      nv.updateGLVolume();
    }
  }
}
