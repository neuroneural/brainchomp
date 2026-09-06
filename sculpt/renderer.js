import { nearestSurface } from "./targeting.js";
import { mat4, vec3 } from "gl-matrix";
import {
  defaultOrientation,
  facing,
  trackballRotation,
  wheelRotation,
} from "./navigation.js";
import { transform, unit, cross, dot, sub } from "./geometry.js";

const vertex = `#version 300 es
precision highp float;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
uniform mat4 affine, mvp;
out vec3 worldNormal;
void main(){worldNormal=normal;gl_Position=mvp*affine*vec4(position,1.0);}`;
const fragment = `#version 300 es
precision highp float;
precision highp int;
in vec3 worldNormal;
uniform bool picking;
uniform vec3 eyeDirection;
layout(location=0) out vec4 color;
layout(location=1) out vec4 normalColor;
void main(){
 vec3 n=normalize(worldNormal);
 normalColor=vec4(n*.5+.5,1.0);
 if(picking){
   uint d=uint(gl_FragCoord.z*16777214.0)+1u;
   color=vec4(vec3(float(d&255u),float((d>>8u)&255u),float((d>>16u)&255u))/255.0,1.0);
 }else{
   float light=.28+.64*max(0.0,dot(n,normalize(eyeDirection+vec3(-.4,.2,.5))));
   float rim=pow(1.0-abs(dot(n,eyeDirection)),3.0)*.12;
   color=vec4(vec3(.79,.69,.58)*light+rim,1.0);
 }
}`;

export class SurfaceRenderer {
  constructor(canvas, overlay, mesh, affine) {
    this.canvas = canvas;
    this.overlay = overlay;
    this.positions = mesh.positions;
    this.indices = mesh.indices;
    this.worldPositions = new Float32Array(mesh.positions.length);
    for (let i = 0; i < mesh.positions.length; i += 3)
      this.worldPositions.set(
        transform(affine, mesh.positions.subarray(i, i + 3)),
        i,
      );
    this.normals = mesh.normals;
    this.affine = affine;
    const gl = canvas.getContext("webgl2", { antialias: true, alpha: false });
    if (!gl) throw new Error("Sculpting requires WebGL2.");
    this.gl = gl;
    const compile = (type, source) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, vertex),
      fs = compile(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program));
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    this.program = program;
    this.uniforms = Object.fromEntries(
      ["affine", "mvp", "picking", "eyeDirection"].map((n) => [
        n,
        gl.getUniformLocation(program, n),
      ]),
    );
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.normals, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);
    this.count = mesh.indices.length;
    const lo = [Infinity, Infinity, Infinity],
      hi = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < mesh.positions.length; i += 3) {
      const p = transform(affine, mesh.positions.subarray(i, i + 3));
      for (let k = 0; k < 3; k++) {
        lo[k] = Math.min(lo[k], p[k]);
        hi[k] = Math.max(hi[k], p[k]);
      }
    }
    this.center = lo.map((v, k) => (v + hi[k]) / 2);
    this.target = this.center.slice();
    this.scale = Math.hypot(...sub(hi, lo)) * 0.6;
    this.initialScale = this.scale;
    this.orientation = defaultOrientation();
    this.crosshair = null;
    this.crosshairOpacity = 0.45;
    this.cursor = null;
    this.framebuffer = gl.createFramebuffer();
    this.textures = [gl.createTexture(), gl.createTexture()];
    this.depth = gl.createRenderbuffer();
    this.observer = new ResizeObserver(() => this.draw());
    this.observer.observe(canvas);
    this.draw();
  }
  matrices() {
    this.direction = Array.from(
      vec3.transformQuat(vec3.create(), [0, 0, 1], this.orientation),
    );
    const up = vec3.transformQuat(vec3.create(), [0, 1, 0], this.orientation);
    const eye = this.target.map(
      (v, i) => v + this.direction[i] * this.initialScale * 4,
    );
    const view = mat4.lookAt(mat4.create(), eye, this.target, up);
    const a = this.canvas.width / this.canvas.height,
      half = this.scale;
    const projection = mat4.ortho(
      mat4.create(),
      -half * a,
      half * a,
      -half,
      half,
      0.001 * this.initialScale,
      10 * this.initialScale,
    );
    this.mvp = mat4.multiply(mat4.create(), projection, view);
    this.inverseMVP = mat4.invert(mat4.create(), this.mvp);
  }
  resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1),
      w = Math.max(1, Math.round(this.canvas.clientWidth * dpr)),
      h = Math.max(1, Math.round(this.canvas.clientHeight * dpr));
    if (this.canvas.width === w && this.canvas.height === h) return;
    this.canvas.width = w;
    this.canvas.height = h;
    this.overlay.width = w;
    this.overlay.height = h;
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    this.textures.forEach((texture, i) => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA8,
        w,
        h,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0 + i,
        gl.TEXTURE_2D,
        texture,
        0,
      );
    });
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depth);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, w, h);
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      this.depth,
    );
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
      throw new Error("Could not allocate the surface picking buffer.");
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
  render(picking) {
    const gl = this.gl;
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);
    gl.uniformMatrix4fv(this.uniforms.affine, false, this.affine);
    gl.uniformMatrix4fv(this.uniforms.mvp, false, this.mvp);
    gl.uniform1i(this.uniforms.picking, picking ? 1 : 0);
    gl.uniform3fv(this.uniforms.eyeDirection, this.direction);
    gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_INT, 0);
  }
  draw() {
    if (this.disposed) return;
    this.resize();
    this.matrices();
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.disable(gl.SCISSOR_TEST);
    gl.clearColor(0.035, 0.04, 0.045, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.render(false);
    this.drawCursor();
  }
  project(point) {
    const p = vec3.transformMat4(vec3.create(), point, this.mvp);
    return [
      ((p[0] + 1) * this.overlay.width) / 2,
      ((1 - p[1]) * this.overlay.height) / 2,
    ];
  }
  drawCursor() {
    this.onCursorChange?.(this.cursor);
    const ctx = this.overlay.getContext("2d");
    ctx.clearRect(0, 0, this.overlay.width, this.overlay.height);
    this.drawCrosshair(ctx);
    if (!this.cursor) return;
    const { point, normal, radius, origin } = this.cursor;
    const u = unit(
        cross(normal, Math.abs(normal[2]) < 0.9 ? [0, 0, 1] : [0, 1, 0]),
      ),
      v = cross(normal, u);
    const dpr = this.overlay.width / this.canvas.clientWidth;
    ctx.strokeStyle =
      this.cursor.tool === "scoop"
        ? "#ff9876"
        : this.cursor.tool === "smooth"
          ? "#99e8b5"
          : "#f5df42";
    if (this.cursor.tool === "scoop") {
      const center = this.project(point),
        r = (radius * this.overlay.height) / (2 * this.scale);
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.arc(...center, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([3 * dpr, 3 * dpr]);
    }
    ctx.lineWidth = 1.7 * dpr;
    for (const factor of [1, 0.12]) {
      ctx.beginPath();
      for (let i = 0; i <= 96; i++) {
        const t = (i * Math.PI) / 48,
          p = point.map(
            (x, k) =>
              x + radius * factor * (u[k] * Math.cos(t) + v[k] * Math.sin(t)),
          ),
          s = this.project(p);
        if (!i) ctx.moveTo(...s);
        else ctx.lineTo(...s);
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
    if (this.cursor.locked && this.crosshair) {
      ctx.save();
      ctx.globalAlpha = this.crosshairOpacity;
      ctx.setLineDash([2 * dpr, 4 * dpr]);
      ctx.beginPath();
      ctx.moveTo(...this.project(this.crosshair));
      ctx.lineTo(...this.project(point));
      ctx.stroke();
      ctx.restore();
    }
    if (origin) {
      ctx.setLineDash([4 * dpr, 4 * dpr]);
      ctx.beginPath();
      ctx.moveTo(...this.project(origin));
      ctx.lineTo(...this.project(point));
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  drawCrosshair(ctx) {
    if (!this.crosshair || this.crosshairOpacity === 0) return;
    const dpr = this.overlay.width / Math.max(1, this.canvas.clientWidth);
    const center = this.project(this.crosshair),
      span = this.scale * 0.09;
    // This marker intentionally remains visible through the surface: slice
    // crosshairs can lie inside the brain. Dashes distinguish it from the brush.
    ctx.save();
    ctx.globalAlpha = this.crosshairOpacity;
    ctx.strokeStyle = "#65dcff";
    ctx.lineWidth = 1.4 * dpr;
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 3 * dpr;
    ctx.setLineDash([4 * dpr, 3 * dpr]);
    for (let axis = 0; axis < 3; axis++) {
      const a = this.crosshair.slice(),
        b = this.crosshair.slice();
      a[axis] -= span;
      b[axis] += span;
      ctx.beginPath();
      // Leave the central defect unobscured, even at full opacity.
      const pa = this.project(a),
        pb = this.project(b);
      for (const p of [pa, pb]) {
        const d = Math.hypot(p[0] - center[0], p[1] - center[1]);
        if (d <= 5 * dpr) continue;
        ctx.moveTo(...p);
        ctx.lineTo(
          center[0] + ((p[0] - center[0]) * 5 * dpr) / d,
          center[1] + ((p[1] - center[1]) * 5 * dpr) / d,
        );
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(...center, 4 * dpr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  orbit(dx, dy) {
    this.orientation = wheelRotation(this.orientation, dx, dy);
    this.cursor = null;
    this.draw();
  }
  dragOrbit(from, to) {
    const rect = this.canvas.getBoundingClientRect();
    this.orientation = trackballRotation(
      this.orientation,
      from.map((v, i) => v - (i ? rect.top : rect.left)),
      to.map((v, i) => v - (i ? rect.top : rect.left)),
      rect.width,
      rect.height,
    );
    this.cursor = null;
    this.draw();
  }
  resetView() {
    this.target = this.center.slice();
    this.scale = this.initialScale;
    this.orientation = defaultOrientation();
    this.cursor = null;
    this.draw();
  }
  pick(clientX, clientY) {
    this.resize();
    this.matrices();
    const gl = this.gl,
      r = this.canvas.getBoundingClientRect();
    const x = Math.floor(((clientX - r.left) * this.canvas.width) / r.width),
      y =
        this.canvas.height -
        1 -
        Math.floor(((clientY - r.top) * this.canvas.height) / r.height);
    if (x < 0 || y < 0 || x >= this.canvas.width || y >= this.canvas.height)
      return null;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1]);
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(x, y, 1, 1);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.render(true);
    const rgba = new Uint8Array(4),
      n = new Uint8Array(4);
    gl.readBuffer(gl.COLOR_ATTACHMENT0);
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
    gl.readBuffer(gl.COLOR_ATTACHMENT1);
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, n);
    gl.disable(gl.SCISSOR_TEST);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (!rgba[3]) return null;
    const depth = (rgba[0] + 256 * rgba[1] + 65536 * rgba[2] - 1) / 16777214;
    const point = Array.from(
      vec3.transformMat4(
        vec3.create(),
        [
          ((x + 0.5) / this.canvas.width) * 2 - 1,
          ((y + 0.5) / this.canvas.height) * 2 - 1,
          depth * 2 - 1,
        ],
        this.inverseMVP,
      ),
    );
    return {
      point,
      normal: unit([
        (n[0] / 255) * 2 - 1,
        (n[1] / 255) * 2 - 1,
        (n[2] / 255) * 2 - 1,
      ]),
    };
  }
  patch(patch) {
    if (!patch) return;
    this.revision = (this.revision || 0) + 1;
    const gl = this.gl;
    gl.bindVertexArray(this.vao);
    if (patch.vertexLength > this.positions.length) {
      for (const [name, buffer] of [
        ["positions", this.positionBuffer],
        ["normals", this.normalBuffer],
      ]) {
        const grown = new Float32Array(patch.vertexLength);
        grown.set(this[name]);
        this[name] = grown;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, grown, gl.DYNAMIC_DRAW);
      }
      const grown = new Float32Array(patch.vertexLength);
      grown.set(this.worldPositions);
      this.worldPositions = grown;
    }
    if (patch.indexLength > this.indices.length) {
      const grown = new Uint32Array(patch.indexLength);
      grown.set(this.indices);
      this.indices = grown;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, grown, gl.DYNAMIC_DRAW);
      this.count = grown.length;
    }
    if (patch.triangleIds) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      patch.triangleIds.forEach((t, j) =>
        this.indices.set(patch.indices.subarray(j * 3, j * 3 + 3), t * 3),
      );
      for (let j = 0; j < patch.triangleIds.length; ) {
        let end = j + 1;
        while (
          end < patch.triangleIds.length &&
          patch.triangleIds[end] === patch.triangleIds[end - 1] + 1
        )
          end++;
        gl.bufferSubData(
          gl.ELEMENT_ARRAY_BUFFER,
          patch.triangleIds[j] * 12,
          patch.indices.subarray(j * 3, end * 3),
        );
        j = end;
      }
    }
    if (patch.positions)
      patch.ids.forEach((id, j) =>
        this.worldPositions.set(
          transform(this.affine, patch.positions.subarray(j * 3, j * 3 + 3)),
          id * 3,
        ),
      );
    for (const [values, allValues, buffer] of [
      [patch.positions, this.positions, this.positionBuffer],
      [patch.normals, this.normals, this.normalBuffer],
    ]) {
      if (!values) continue;
      patch.ids.forEach((id, j) =>
        allValues.set(values.subarray(j * 3, j * 3 + 3), id * 3),
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      // Batch adjacent vertices into one upload per contiguous run.
      for (let j = 0; j < patch.ids.length; ) {
        let end = j + 1;
        while (
          end < patch.ids.length &&
          patch.ids[end] === patch.ids[end - 1] + 1
        )
          end++;
        gl.bufferSubData(
          gl.ARRAY_BUFFER,
          patch.ids[j] * 12,
          values.subarray(j * 3, end * 3),
        );
        j = end;
      }
    }
  }
  nearest(point) {
    return nearestSurface(
      point,
      this.worldPositions,
      this.indices,
      this.normals,
    );
  }
  // Orthographic screen-plane movement keeps scoop depth fixed while dragging.
  screenPoint(clientX, clientY, anchor) {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = vec3.transformMat4(vec3.create(), anchor, this.mvp);
    return Array.from(
      vec3.transformMat4(
        vec3.create(),
        [
          ((clientX - rect.left) / rect.width) * 2 - 1,
          1 - ((clientY - rect.top) / rect.height) * 2,
          ndc[2],
        ],
        this.inverseMVP,
      ),
    );
  }
  focus(point) {
    const hit = this.nearest(point);
    if (!hit) return null;
    const p = hit.point,
      n = hit.normal;
    this.target = p;
    this.orientation = facing(n);
    this.cursor = {
      point: p,
      normal: n,
      radius: this.cursor?.radius || this.initialScale * 0.1,
    };
    this.draw();
    return { point: p, normal: n };
  }
  dispose() {
    this.disposed = true;
    this.observer.disconnect();
    const g = this.gl;
    for (const b of [this.positionBuffer, this.normalBuffer, this.indexBuffer])
      g.deleteBuffer(b);
    this.textures.forEach((t) => g.deleteTexture(t));
    g.deleteRenderbuffer(this.depth);
    g.deleteFramebuffer(this.framebuffer);
    g.deleteVertexArray(this.vao);
    g.deleteProgram(this.program);
  }
}
