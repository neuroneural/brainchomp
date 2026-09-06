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

// Draw the physical sphere/plane intersection without altering any image data.
// Sample NiiVue's screen->world mapping so radiological flips, zoom, and oblique
// slices use the same projection as the underlying MRI.
export class SliceFootprint {
  constructor(nv) {
    this.nv = nv;
    this.canvas = document.createElement("canvas");
    this.canvas.className = "sculpt-slice-footprint";
    this.canvas.setAttribute("aria-hidden", "true");
    nv.gl.canvas.parentElement.append(this.canvas);
    this.originalDraw = nv.drawScene;
    const self = this;
    this.wrappedDraw = function (...args) {
      const value = self.originalDraw.apply(this, args);
      self.draw();
      return value;
    };
    nv.drawScene = this.wrappedDraw;
  }
  set(brush) {
    this.brush = brush?.tool === "scoop" ? brush : null;
    this.draw();
  }
  draw() {
    const { nv, canvas, brush } = this,
      source = nv.gl.canvas;
    if (canvas.width !== source.width) canvas.width = source.width;
    if (canvas.height !== source.height) canvas.height = source.height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!brush) return;
    const dot = (a, b) => a.reduce((s, v, k) => s + v * b[k], 0);
    const sub = (a, b) => a.map((v, k) => v - b[k]);
    for (let i = 0; i < nv.screenSlices.length; i++) {
      const tile = nv.screenSlices[i];
      if (tile.axCorSag > 2 || tile.AxyzMxy.length < 4) continue;
      const [left, top, width, height] = tile.leftTopWidthHeight;
      const x = left + width * 0.5,
        y = top + height * 0.5;
      const world = (sx, sy) =>
        Array.from(nv.frac2mm(nv.screenXY2TextureFrac(sx, sy, i, false))).slice(
          0,
          3,
        );
      const origin = world(x, y),
        u = sub(world(x + 1, y), origin),
        v = sub(world(x, y + 1), origin);
      const uu = dot(u, u),
        uv = dot(u, v),
        vv = dot(v, v),
        det = uu * vv - uv * uv;
      if (det < 1e-20) continue;
      const project = (p) => {
        const d = sub(p, origin),
          du = dot(d, u),
          dv = dot(d, v);
        return [x + (du * vv - dv * uv) / det, y + (dv * uu - du * uv) / det];
      };
      const n = [
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0],
      ].map((q) => q / Math.sqrt(det));
      const distance = dot(sub(brush.point, origin), n);
      if (Math.abs(distance) > brush.radius) continue;
      const center = brush.point.map((q, k) => q - n[k] * distance),
        r = Math.sqrt(brush.radius ** 2 - distance ** 2);
      const a = u.map((q) => q / Math.sqrt(uu));
      const b = [
        n[1] * a[2] - n[2] * a[1],
        n[2] * a[0] - n[0] * a[2],
        n[0] * a[1] - n[1] * a[0],
      ];
      ctx.save();
      ctx.beginPath();
      ctx.rect(Math.min(left, left + width), top, Math.abs(width), height);
      ctx.clip();
      ctx.strokeStyle = "#ff9876";
      ctx.lineWidth = (1.5 * canvas.width) / source.clientWidth;
      ctx.beginPath();
      for (let j = 0; j <= 96; j++) {
        const t = (j * Math.PI) / 48,
          p = center.map(
            (q, k) => q + r * (a[k] * Math.cos(t) + b[k] * Math.sin(t)),
          ),
          screen = project(p);
        if (j === 0) ctx.moveTo(...screen);
        else ctx.lineTo(...screen);
      }
      ctx.stroke();
      ctx.restore();
    }
  }
  close() {
    if (this.nv.drawScene === this.wrappedDraw)
      this.nv.drawScene = this.originalDraw;
    this.canvas.remove();
  }
}
