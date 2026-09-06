var nt=Object.defineProperty,st=Object.defineProperties;var ut=Object.getOwnPropertyDescriptors;var Ue=Object.getOwnPropertySymbols;var ot=Object.prototype.hasOwnProperty,ft=Object.prototype.propertyIsEnumerable;var Va=Math.pow,_e=(l,a,t)=>a in l?nt(l,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[a]=t,Ca=(l,a)=>{for(var t in a||(a={}))ot.call(a,t)&&_e(l,t,a[t]);if(Ue)for(var t of Ue(a))ft.call(a,t)&&_e(l,t,a[t]);return l},Ea=(l,a)=>st(l,ut(a));var D=(l,a,t)=>new Promise((r,n)=>{var e=o=>{try{u(t.next(o))}catch(v){n(v)}},d=o=>{try{u(t.throw(o))}catch(v){n(v)}},u=o=>o.done?r(o.value):Promise.resolve(o.value).then(e,d);u((t=t.apply(l,a)).next())});import{m as ct}from"./vendor-gTbkpY2o.js";import{W as dt,X as vt,Y as Fa,Z as ge,_ as Re,$ as gt,z as ce,b as Aa,O as re,E as bt,a0 as pt,K as ht,a1 as xe,a2 as yt,k as Xa,u as St,y as mt,i as ke,a3 as Za}from"./vendor-math-Cp3_ovwH.js";import{S as Da,a as Pt,M as ne,N as Ut}from"./vendor-niivue-Cdme4TKu.js";import{l as _t,t as Ja,s as xt,d as La,b as Ie,a as _a,z as Ct,g as Fe,w as Qa,f as Ne,m as wt,o as Mt,c as de,e as Et,h as be,i as ie,r as ze,j as Tt,k as We,n as Gt,p as Ot,q as De,u as Ta,v as $e,x as Lt,y as Wa,A as Bt,B as se,C as At,D as Rt}from"./vendor-tf-DGuKl8vL.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const d of e.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(n){if(n.ep)return;n.ep=!0;const e=t(n);fetch(n.href,e)}})();function kt(l,a){let t=0,r=1;const n=[0,0,0];for(const e of a){const d=Math.abs(e)-1;n[d]=Math.sign(e)*r,e<0&&(t+=(l[d]-1)*r),r*=l[d]}return{offset:t,strides:n}}class It{constructor(a){if(this.nv=a,this.volume=a.volumes[1],this.opacity=this.volume.opacity,this.drawOpacity=a.drawOpacity,this.drawLut=a.drawLut,!a.loadDrawing(this.volume))throw new Error("Could not align the mask with the slice grid.");a.drawClearAllUndoBitmaps(),a.setDrawingEnabled(!1);const t=a.drawLut.lut.slice();t.set([217,119,33,255],4),a.drawLut=Ea(Ca({},a.drawLut),{lut:t}),a.refreshColormaps(),a.setDrawOpacity(this.opacity),a.setOpacity(1,0),Object.assign(this,kt(this.volume.hdr.dims.slice(1,4),this.volume.permRAS))}patch({rect:a,data:t}){const[r,n,e,d]=a,u=e-r+1,o=d-n+1,[v,b,P]=this.strides,g=this.nv.drawBitmap,y=this.volume.hdr.dims[3];for(let c=0;c<y;c++)for(let U=n;U<=d;U++){let w=this.offset+r*v+U*b+c*P,C=u*(U-n+o*c);for(let T=r;T<=e;T++,w+=v)g[w]=t[C++]}this.nv.refreshDrawing(!0)}close(){const a=this.nv,t=a.drawOpacity;a.closeDrawing(),a.drawLut=this.drawLut,a.setDrawOpacity(this.drawOpacity),a.refreshColormaps(),a.volumes[1]===this.volume&&(this.volume.opacity=t,a.updateGLVolume())}}class Ft{constructor(a){this.nv=a,this.canvas=document.createElement("canvas"),this.canvas.className="sculpt-slice-footprint",this.canvas.setAttribute("aria-hidden","true"),a.gl.canvas.parentElement.append(this.canvas),this.originalDraw=a.drawScene;const t=this;this.wrappedDraw=function(...r){const n=t.originalDraw.apply(this,r);return t.draw(),n},a.drawScene=this.wrappedDraw}set(a){this.brush=(a==null?void 0:a.tool)==="scoop"?a:null,this.draw()}draw(){const{nv:a,canvas:t,brush:r}=this,n=a.gl.canvas;t.width!==n.width&&(t.width=n.width),t.height!==n.height&&(t.height=n.height);const e=t.getContext("2d");if(e.clearRect(0,0,t.width,t.height),!r)return;const d=(o,v)=>o.reduce((b,P,g)=>b+P*v[g],0),u=(o,v)=>o.map((b,P)=>b-v[P]);for(let o=0;o<a.screenSlices.length;o++){const v=a.screenSlices[o];if(v.axCorSag>2||v.AxyzMxy.length<4)continue;const[b,P,g,y]=v.leftTopWidthHeight,c=b+g*.5,U=P+y*.5,w=(L,W)=>Array.from(a.frac2mm(a.screenXY2TextureFrac(L,W,o,!1))).slice(0,3),C=w(c,U),T=u(w(c+1,U),C),B=u(w(c,U+1),C),k=d(T,T),F=d(T,B),j=d(B,B),i=k*j-F*F;if(i<1e-20)continue;const A=L=>{const W=u(L,C),I=d(W,T),q=d(W,B);return[c+(I*j-q*F)/i,U+(q*k-I*F)/i]},x=[T[1]*B[2]-T[2]*B[1],T[2]*B[0]-T[0]*B[2],T[0]*B[1]-T[1]*B[0]].map(L=>L/Math.sqrt(i)),m=d(u(r.point,C),x);if(Math.abs(m)>r.radius)continue;const p=r.point.map((L,W)=>L-x[W]*m),G=Math.sqrt(Va(r.radius,2)-Va(m,2)),M=T.map(L=>L/Math.sqrt(k)),N=[x[1]*M[2]-x[2]*M[1],x[2]*M[0]-x[0]*M[2],x[0]*M[1]-x[1]*M[0]];e.save(),e.beginPath(),e.rect(Math.min(b,b+g),P,Math.abs(g),y),e.clip(),e.strokeStyle="#ff9876",e.lineWidth=1.5*t.width/n.clientWidth,e.beginPath();for(let L=0;L<=96;L++){const W=L*Math.PI/48,I=p.map((Z,H)=>Z+G*(M[H]*Math.cos(W)+N[H]*Math.sin(W))),q=A(I);L===0?e.moveTo(...q):e.lineTo(...q)}e.stroke(),e.restore()}}close(){this.nv.drawScene===this.wrappedDraw&&(this.nv.drawScene=this.originalDraw),this.canvas.remove()}}function Nt(l,a,t,r){const n=(g,y)=>g.map((c,U)=>c-y[U]),e=(g,y)=>g.reduce((c,U,w)=>c+U*y[w],0),d=n(t,a),u=n(r,a),o=n(l,a),v=e(d,o),b=e(u,o);let P;if(v<=0&&b<=0)P=[1,0,0];else{const g=n(l,t),y=e(d,g),c=e(u,g);if(y>=0&&c<=y)P=[0,1,0];else{const U=v*c-y*b;if(U<=0&&v>=0&&y<=0){const w=v/(v-y);P=[1-w,w,0]}else{const w=n(l,r),C=e(d,w),T=e(u,w);if(T>=0&&C<=T)P=[0,0,1];else{const B=C*b-v*T;if(B<=0&&b>=0&&T<=0){const k=b/(b-T);P=[1-k,0,k]}else{const k=y*T-C*c;if(k<=0&&c-y>=0&&C-T>=0){const F=(c-y)/(c-y+C-T);P=[0,1-F,F]}else{const F=k+B+U;if(Math.abs(F)<1e-20)return null;const j=B/F,i=U/F;P=[1-j-i,j,i]}}}}}}return{point:a.map((g,y)=>g*P[0]+t[y]*P[1]+r[y]*P[2]),weights:P}}function zt(l,a,t,r){let n=1/0,e=null;for(let d=0;d<t.length;d+=3){const u=t[d]*3,o=t[d+1]*3,v=t[d+2]*3;if(u===o||o===v||u===v)continue;let b=0;for(let U=0;U<3;U++){const w=Math.min(a[u+U],a[o+U],a[v+U]),C=Math.max(a[u+U],a[o+U],a[v+U]);b+=Va(Math.max(w-l[U],0,l[U]-C),2)}if(b>=n)continue;const P=Nt(l,Array.from(a.subarray(u,u+3)),Array.from(a.subarray(o,o+3)),Array.from(a.subarray(v,v+3)));if(!P)continue;const g=P.point.reduce((U,w,C)=>U+Va(w-l[C],2),0);if(g>=n)continue;n=g;const y=[0,1,2].map(U=>P.weights[0]*r[u+U]+P.weights[1]*r[o+U]+P.weights[2]*r[v+U]),c=Math.hypot(...y)||1;e={point:P.point,normal:y.map(U=>U/c),distance:Math.sqrt(g)}}return e}function qe(l,a=[0,0,1]){const t=ce(Aa(),l);let r=re(Aa(),a,t);bt(r)<1e-5&&(r=re(r,[0,1,0],t)),ce(r,r);const n=re(Aa(),t,r);return ge(Fa(),pt(Fa(),ht(...r,...n,...t)))}function Ce(){return qe([0,-Math.cos(.2),Math.sin(.2)])}function Wt(l,a,t){const r=Math.hypot(a,t);if(!r)return dt(l);const n=vt(Fa(),[t/r,a/r,0],r*.006);return ge(Fa(),Re(Fa(),l,n))}function Dt(l,a,t,r,n){const e=([u,o])=>{const v=Math.max(1,Math.min(r,n)),b=[(2*u-r)/v,(n-2*o)/v,0],P=Math.hypot(b[0],b[1]);return b[2]=P<Math.SQRT1_2?Math.sqrt(1-P*P):.5/Math.max(P,1e-6),ce(Aa(),b)},d=gt(Fa(),e(t),e(a));return ge(Fa(),Re(Fa(),l,d))}function ue(l,a){return[0,1,2].map(t=>l[t]*a[0]+l[t+4]*a[1]+l[t+8]*a[2]+l[t+12])}const we=(l,a)=>[l[1]*a[2]-l[2]*a[1],l[2]*a[0]-l[0]*a[2],l[0]*a[1]-l[1]*a[0]],$t=(l,a)=>l.map((t,r)=>t-a[r]);function Me(l){const a=Math.hypot(...l);return a>1e-15?l.map(t=>t/a):[0,0,1]}function Ee(l,a,t,r){const[n,e,d,u]=t,o=d-n+1,v=u-e+1;for(let b=0;b<a[2];b++)for(let P=e;P<=u;P++)l.set(r.subarray(o*(P-e+v*b),o*(P-e+v*b)+o),n+a[0]*(P+a[1]*b))}const qt=`#version 300 es
precision highp float;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
uniform mat4 affine, mvp;
out vec3 worldNormal;
void main(){worldNormal=normal;gl_Position=mvp*affine*vec4(position,1.0);}`,Vt=`#version 300 es
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
}`;class Yt{constructor(a,t,r,n){this.canvas=a,this.overlay=t,this.positions=r.positions,this.indices=r.indices,this.worldPositions=new Float32Array(r.positions.length);for(let g=0;g<r.positions.length;g+=3)this.worldPositions.set(ue(n,r.positions.subarray(g,g+3)),g);this.normals=r.normals,this.affine=n;const e=a.getContext("webgl2",{antialias:!0,alpha:!1});if(!e)throw new Error("Sculpting requires WebGL2.");this.gl=e;const d=(g,y)=>{const c=e.createShader(g);if(e.shaderSource(c,y),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(c));return c},u=d(e.VERTEX_SHADER,qt),o=d(e.FRAGMENT_SHADER,Vt),v=e.createProgram();if(e.attachShader(v,u),e.attachShader(v,o),e.linkProgram(v),!e.getProgramParameter(v,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(v));e.deleteShader(u),e.deleteShader(o),this.program=v,this.uniforms=Object.fromEntries(["affine","mvp","picking","eyeDirection"].map(g=>[g,e.getUniformLocation(v,g)])),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),this.positionBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.positionBuffer),e.bufferData(e.ARRAY_BUFFER,r.positions,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,0,0),this.normalBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.normalBuffer),e.bufferData(e.ARRAY_BUFFER,r.normals,e.DYNAMIC_DRAW),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,0,0),this.indexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r.indices,e.STATIC_DRAW),this.count=r.indices.length;const b=[1/0,1/0,1/0],P=[-1/0,-1/0,-1/0];for(let g=0;g<r.positions.length;g+=3){const y=ue(n,r.positions.subarray(g,g+3));for(let c=0;c<3;c++)b[c]=Math.min(b[c],y[c]),P[c]=Math.max(P[c],y[c])}this.center=b.map((g,y)=>(g+P[y])/2),this.target=this.center.slice(),this.scale=Math.hypot(...$t(P,b))*.6,this.initialScale=this.scale,this.orientation=Ce(),this.crosshair=null,this.crosshairOpacity=.45,this.cursor=null,this.framebuffer=e.createFramebuffer(),this.textures=[e.createTexture(),e.createTexture()],this.depth=e.createRenderbuffer(),this.observer=new ResizeObserver(()=>this.draw()),this.observer.observe(a),this.draw()}matrices(){this.direction=Array.from(xe(Aa(),[0,0,1],this.orientation));const a=xe(Aa(),[0,1,0],this.orientation),t=this.target.map((u,o)=>u+this.direction[o]*this.initialScale*4),r=yt(Xa(),t,this.target,a),n=this.canvas.width/this.canvas.height,e=this.scale,d=St(Xa(),-e*n,e*n,-e,e,.001*this.initialScale,10*this.initialScale);this.mvp=mt(Xa(),d,r),this.inverseMVP=ke(Xa(),this.mvp)}resize(){const a=Math.min(2,window.devicePixelRatio||1),t=Math.max(1,Math.round(this.canvas.clientWidth*a)),r=Math.max(1,Math.round(this.canvas.clientHeight*a));if(this.canvas.width===t&&this.canvas.height===r)return;this.canvas.width=t,this.canvas.height=r,this.overlay.width=t,this.overlay.height=r;const n=this.gl;if(n.bindFramebuffer(n.FRAMEBUFFER,this.framebuffer),this.textures.forEach((e,d)=>{n.bindTexture(n.TEXTURE_2D,e),n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,t,r,0,n.RGBA,n.UNSIGNED_BYTE,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+d,n.TEXTURE_2D,e,0)}),n.bindRenderbuffer(n.RENDERBUFFER,this.depth),n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_COMPONENT24,t,r),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,this.depth),n.checkFramebufferStatus(n.FRAMEBUFFER)!==n.FRAMEBUFFER_COMPLETE)throw new Error("Could not allocate the surface picking buffer.");n.bindFramebuffer(n.FRAMEBUFFER,null)}render(a){const t=this.gl;t.useProgram(this.program),t.bindVertexArray(this.vao),t.viewport(0,0,this.canvas.width,this.canvas.height),t.enable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.BLEND),t.uniformMatrix4fv(this.uniforms.affine,!1,this.affine),t.uniformMatrix4fv(this.uniforms.mvp,!1,this.mvp),t.uniform1i(this.uniforms.picking,a?1:0),t.uniform3fv(this.uniforms.eyeDirection,this.direction),t.drawElements(t.TRIANGLES,this.count,t.UNSIGNED_INT,0)}draw(){if(this.disposed)return;this.resize(),this.matrices();const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,null),a.disable(a.SCISSOR_TEST),a.clearColor(.035,.04,.045,1),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),this.render(!1),this.drawCursor()}project(a){const t=Za(Aa(),a,this.mvp);return[(t[0]+1)*this.overlay.width/2,(1-t[1])*this.overlay.height/2]}drawCursor(){var v;(v=this.onCursorChange)==null||v.call(this,this.cursor);const a=this.overlay.getContext("2d");if(a.clearRect(0,0,this.overlay.width,this.overlay.height),this.drawCrosshair(a),!this.cursor)return;const{point:t,normal:r,radius:n,origin:e}=this.cursor,d=Me(we(r,Math.abs(r[2])<.9?[0,0,1]:[0,1,0])),u=we(r,d),o=this.overlay.width/this.canvas.clientWidth;if(a.strokeStyle=this.cursor.tool==="scoop"?"#ff9876":this.cursor.tool==="smooth"?"#99e8b5":"#f5df42",this.cursor.tool==="scoop"){const b=this.project(t),P=n*this.overlay.height/(2*this.scale);a.lineWidth=1.5*o,a.beginPath(),a.arc(...b,P,0,Math.PI*2),a.stroke(),a.setLineDash([3*o,3*o])}a.lineWidth=1.7*o;for(const b of[1,.12]){a.beginPath();for(let P=0;P<=96;P++){const g=P*Math.PI/48,y=t.map((U,w)=>U+n*b*(d[w]*Math.cos(g)+u[w]*Math.sin(g))),c=this.project(y);P?a.lineTo(...c):a.moveTo(...c)}a.stroke()}a.setLineDash([]),this.cursor.locked&&this.crosshair&&(a.save(),a.globalAlpha=this.crosshairOpacity,a.setLineDash([2*o,4*o]),a.beginPath(),a.moveTo(...this.project(this.crosshair)),a.lineTo(...this.project(t)),a.stroke(),a.restore()),e&&(a.setLineDash([4*o,4*o]),a.beginPath(),a.moveTo(...this.project(e)),a.lineTo(...this.project(t)),a.stroke(),a.setLineDash([]))}drawCrosshair(a){if(!this.crosshair||this.crosshairOpacity===0)return;const t=this.overlay.width/Math.max(1,this.canvas.clientWidth),r=this.project(this.crosshair),n=this.scale*.09;a.save(),a.globalAlpha=this.crosshairOpacity,a.strokeStyle="#65dcff",a.lineWidth=1.4*t,a.shadowColor="#000",a.shadowBlur=3*t,a.setLineDash([4*t,3*t]);for(let e=0;e<3;e++){const d=this.crosshair.slice(),u=this.crosshair.slice();d[e]-=n,u[e]+=n,a.beginPath();const o=this.project(d),v=this.project(u);for(const b of[o,v]){const P=Math.hypot(b[0]-r[0],b[1]-r[1]);P<=5*t||(a.moveTo(...b),a.lineTo(r[0]+(b[0]-r[0])*5*t/P,r[1]+(b[1]-r[1])*5*t/P))}a.stroke()}a.setLineDash([]),a.beginPath(),a.arc(...r,4*t,0,Math.PI*2),a.stroke(),a.restore()}orbit(a,t){this.orientation=Wt(this.orientation,a,t),this.cursor=null,this.draw()}dragOrbit(a,t){const r=this.canvas.getBoundingClientRect();this.orientation=Dt(this.orientation,a.map((n,e)=>n-(e?r.top:r.left)),t.map((n,e)=>n-(e?r.top:r.left)),r.width,r.height),this.cursor=null,this.draw()}resetView(){this.target=this.center.slice(),this.scale=this.initialScale,this.orientation=Ce(),this.cursor=null,this.draw()}pick(a,t){this.resize(),this.matrices();const r=this.gl,n=this.canvas.getBoundingClientRect(),e=Math.floor((a-n.left)*this.canvas.width/n.width),d=this.canvas.height-1-Math.floor((t-n.top)*this.canvas.height/n.height);if(e<0||d<0||e>=this.canvas.width||d>=this.canvas.height)return null;r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),r.drawBuffers([r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),r.enable(r.SCISSOR_TEST),r.scissor(e,d,1,1),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),this.render(!0);const u=new Uint8Array(4),o=new Uint8Array(4);if(r.readBuffer(r.COLOR_ATTACHMENT0),r.readPixels(e,d,1,1,r.RGBA,r.UNSIGNED_BYTE,u),r.readBuffer(r.COLOR_ATTACHMENT1),r.readPixels(e,d,1,1,r.RGBA,r.UNSIGNED_BYTE,o),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.FRAMEBUFFER,null),!u[3])return null;const v=(u[0]+256*u[1]+65536*u[2]-1)/16777214;return{point:Array.from(Za(Aa(),[(e+.5)/this.canvas.width*2-1,(d+.5)/this.canvas.height*2-1,v*2-1],this.inverseMVP)),normal:Me([o[0]/255*2-1,o[1]/255*2-1,o[2]/255*2-1])}}patch(a){if(!a)return;this.revision=(this.revision||0)+1;const t=this.gl;if(t.bindVertexArray(this.vao),a.vertexLength>this.positions.length){for(const[n,e]of[["positions",this.positionBuffer],["normals",this.normalBuffer]]){const d=new Float32Array(a.vertexLength);d.set(this[n]),this[n]=d,t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,d,t.DYNAMIC_DRAW)}const r=new Float32Array(a.vertexLength);r.set(this.worldPositions),this.worldPositions=r}if(a.indexLength>this.indices.length){const r=new Uint32Array(a.indexLength);r.set(this.indices),this.indices=r,t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,r,t.DYNAMIC_DRAW),this.count=r.length}if(a.triangleIds){t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.triangleIds.forEach((r,n)=>this.indices.set(a.indices.subarray(n*3,n*3+3),r*3));for(let r=0;r<a.triangleIds.length;){let n=r+1;for(;n<a.triangleIds.length&&a.triangleIds[n]===a.triangleIds[n-1]+1;)n++;t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,a.triangleIds[r]*12,a.indices.subarray(r*3,n*3)),r=n}}a.positions&&a.ids.forEach((r,n)=>this.worldPositions.set(ue(this.affine,a.positions.subarray(n*3,n*3+3)),r*3));for(const[r,n,e]of[[a.positions,this.positions,this.positionBuffer],[a.normals,this.normals,this.normalBuffer]])if(r){a.ids.forEach((d,u)=>n.set(r.subarray(u*3,u*3+3),d*3)),t.bindBuffer(t.ARRAY_BUFFER,e);for(let d=0;d<a.ids.length;){let u=d+1;for(;u<a.ids.length&&a.ids[u]===a.ids[u-1]+1;)u++;t.bufferSubData(t.ARRAY_BUFFER,a.ids[d]*12,r.subarray(d*3,u*3)),d=u}}}nearest(a){return zt(a,this.worldPositions,this.indices,this.normals)}screenPoint(a,t,r){const n=this.canvas.getBoundingClientRect(),e=Za(Aa(),r,this.mvp);return Array.from(Za(Aa(),[(a-n.left)/n.width*2-1,1-(t-n.top)/n.height*2,e[2]],this.inverseMVP))}focus(a){var e;const t=this.nearest(a);if(!t)return null;const r=t.point,n=t.normal;return this.target=r,this.orientation=qe(n),this.cursor={point:r,normal:n,radius:((e=this.cursor)==null?void 0:e.radius)||this.initialScale*.1},this.draw(),{point:r,normal:n}}dispose(){this.disposed=!0,this.observer.disconnect();const a=this.gl;for(const t of[this.positionBuffer,this.normalBuffer,this.indexBuffer])a.deleteBuffer(t);this.textures.forEach(t=>a.deleteTexture(t)),a.deleteRenderbuffer(this.depth),a.deleteFramebuffer(this.framebuffer),a.deleteVertexArray(this.vao),a.deleteProgram(this.program)}}function jt({nv:l,getState:a,prepare:t,onPatch:r,onError:n}){const e=document.getElementById("sculptBtn"),d=document.getElementById("canvas-container"),u=document.createElement("section");u.id="sculpt-panel",u.hidden=!0,u.innerHTML='<div class="sculpt-bar"><strong>Sculpt mask</strong><div class="sculpt-modes" role="group" aria-label="Surface interaction"><button type="button" data-mode="grab" aria-pressed="true">Grab</button><button type="button" data-mode="smooth" aria-pressed="false">Smooth</button><button type="button" data-mode="scoop" aria-pressed="false">Scoop</button><button type="button" data-mode="rotate" aria-pressed="false">Rotate</button></div><button type="button" data-action="undo" title="Undo (Ctrl/⌘ Z)" disabled>Undo</button><button type="button" data-action="redo" title="Redo (Ctrl/⌘ Shift Z)" disabled>Redo</button><button type="button" data-action="done">Done</button></div><div class="sculpt-size"><label>Size <input aria-label="Brush radius" type="range" min="1" max="100" value="35"/><output></output></label><button type="button" data-action="focus" title="Bring the surface nearest the slice crosshair forward">Focus slice</button><button type="button" data-action="reset">Reset view</button></div><div class="sculpt-target"><label><input type="checkbox" data-control="lock"/> Lock to slice crosshair</label><label>Crosshair <input type="range" aria-label="Crosshair opacity" min="0" max="100" value="45"/><output data-opacity>45%</output></label><span class="sculpt-anchor"></span></div><div class="sculpt-viewport"><canvas class="sculpt-surface" aria-label="Brain mask sculpting surface" tabindex="0"></canvas><canvas class="sculpt-cursor" aria-hidden="true"></canvas></div><p class="sculpt-help">Drag the ring along its normal. Facing you: drag up to pull, down to push. Two-finger scroll or right-drag rotates. Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.</p><p class="sculpt-status" role="status" aria-live="polite"></p>',d.append(u);const o=u.querySelector(".sculpt-surface"),v=u.querySelector(".sculpt-cursor"),b=u.querySelector("input"),P=u.querySelector("output"),g=u.querySelector(".sculpt-status"),y=u.querySelector(".sculpt-help"),c=u.querySelector('[data-control="lock"]'),U=u.querySelector('[aria-label="Crosshair opacity"]'),w=u.querySelector(".sculpt-anchor");let C=null,T=null,B=null;U.oninput=()=>{u.querySelector("[data-opacity]").textContent=`${U.value}%`,x&&(x.crosshairOpacity=Number(U.value)/100,x.drawCursor())};const k=()=>{if(!(!x||!G||M)){if(T=null,c.checked&&N!=="rotate"){const f=x.crosshair,h=f.join(",")+":"+(x.revision||0);((B==null?void 0:B.renderer)!==x||B.key!==h)&&(B={renderer:x,key:h,hit:x.nearest(f)});const S=B.hit;T=N==="scoop"?{point:f.slice(),normal:(S==null?void 0:S.normal)||x.direction}:S,w.textContent=N==="scoop"?"Scoop center is the exact slice point.":S?`Surface anchor ${Number(S.distance.toPrecision(2))} mm from slice point.`:"No surface remains; undo to restore it.",x.cursor=T?Ea(Ca({},T),{radius:Z,tool:N,locked:!0}):null}else w.textContent="",x.cursor=null;u.dataset.anchor=(T==null?void 0:T.point.join(","))||"",x.drawCursor()}};c.onchange=k;const F=Object.fromEntries([...u.querySelectorAll("[data-action]")].map(f=>[f.dataset.action,f])),j=["modelRunButton","sampleSelect","maskToggle","drawBtn","modelSelect"],i=new Map;let A=null,x=null,m=new Map,p=0,G=!1,M=!1,N="grab",L=null,W=0,I=null,q=null,Z=1,H={undo:0,redo:0},ra=0,ma=null;const xa=()=>{var f;e.disabled=!a()||!G&&((f=a())==null?void 0:f.running)||M,e.setAttribute("aria-pressed",String(G)),e.title=a()?"Sculpt the brain mask":"Run Skull-strip first to enable sculpting",F.undo.disabled=M||!H.undo,F.redo.disabled=M||!H.redo,F.done.disabled=M,F.focus.disabled=M,F.reset.disabled=M,b.disabled=M,c.disabled=M,u.querySelectorAll("[data-mode]").forEach(h=>h.disabled=M);for(const h of["saveBtn","saveStatsBtn"]){const S=document.getElementById(h);S&&(S.disabled=G&&M)}},V=f=>{M=f,xa()},Q=(f,h={})=>new Promise((S,O)=>{if(!A){O(new Error("Editing session was closed."));return}const Sa=++p;m.set(Sa,{resolve:S,reject:O}),A.postMessage(Ca({id:Sa,type:f},h))}),oa=()=>{Z=q.minRadius+(q.maxRadius-q.minRadius)*(Number(b.value)-1)/99,P.textContent=`${Number(Z.toPrecision(3))} mm`,x!=null&&x.cursor&&(x.cursor.radius=Z,x.drawCursor())};b.oninput=oa;function ta(f){for(const h of j){const S=document.getElementById(h);S&&(f?(i.set(h,S.disabled),S.disabled=!0):i.has(h)&&(S.disabled=i.get(h)))}f||i.clear()}const na=()=>{!G||!x||(x.crosshair=Array.from(l.frac2mm(l.scene.crosshairPos)).slice(0,3),u.dataset.crosshair=x.crosshair.join(","),k(),x.drawCursor())},da=l.onLocationChange;l.onLocationChange=function(f){da==null||da.call(l,f),na()};const fa=f=>{l.scene.crosshairPos=Array.from(l.mm2frac(f)).map(h=>Math.max(0,Math.min(1,h))),l.createOnLocationChange()},sa=f=>{f&&(x.patch(f),Ee(q.mask,q.dims,f.rect,f.data),r(f),ma.patch(f))},ya=f=>{g.textContent=f.message||String(f),console.error("Sculpt:",f)};function ka(){return D(this,null,function*(){var h;if(G||!a())return;if((h=l.drawBitmap)!=null&&h.some(S=>S!==0)){n(new Error("Apply or clear the current drawing before opening Sculpt."));return}G=!0,u.hidden=!1,d.classList.add("sculpting"),ta(!0),V(!0),I={sliceType:l.opts.sliceType,multiplanarForceRender:l.opts.multiplanarForceRender,multiplanarShowRender:l.opts.multiplanarShowRender},l.setDrawingEnabled(!1),l.closeDrawing(),l.opts.multiplanarForceRender=!1,l.opts.multiplanarShowRender=0,l.setSliceType(l.sliceTypeMultiplanar),l.resizeListener();const f=ra;try{if(yield t(),f!==ra)return;if(ma=new It(l),C=new Ft(l),A)na(),x.draw(),g.textContent="Ready · corrections and undo history retained.";else{g.textContent="Building the editable surface…";const S=a(),O=new Float32Array(16);for(let la=0;la<4;la++)for(let s=0;s<4;s++)O[s*4+la]=S.affine[la][s];const Sa=ke(Xa(),O);if(!Sa)throw new Error("Image geometry has a singular affine.");const Ua=[0,4,8].map(la=>Math.hypot(O[la],O[la+1],O[la+2]));q=Ea(Ca({},S),{affine:O,inverse:Sa,minRadius:Math.min(...Ua)*2,maxRadius:Math.min(...S.dims.map((la,s)=>la*Ua[s]))*.16}),q.maxRadius=Math.max(q.minRadius*2,q.maxRadius),oa(),A=new Worker(new URL(""+new URL("worker-v1mX1G6D.js",import.meta.url).href,import.meta.url),{type:"module"}),A.onmessage=({data:la})=>{const s=m.get(la.id);s&&(m.delete(la.id),la.error?s.reject(new Error(la.error)):(H=la.history,s.resolve(la)))},A.onerror=la=>{for(const s of m.values())s.reject(new Error(la.message||"Surface worker failed."));m.clear()};const{result:wa,ms:_}=yield Q("init",{mask:S.mask,dims:S.dims,affine:O,inverse:Sa});if(f!==ra)return;x=new Yt(o,v,wa,O),x.crosshairOpacity=Number(U.value)/100,x.onCursorChange=la=>C==null?void 0:C.set(la),na(),u.dataset.triangles=String(wa.indices.length/3),u.dataset.buildMs=String(Math.round(_)),g.textContent="Ready · hover over the surface to place the grab."}}catch(S){f===ra&&(ya(S),Pa(),n(S))}finally{f===ra&&(V(!1),k())}})}function ca(){!G||M||(G=!1,L=null,C==null||C.close(),C=null,ma==null||ma.close(),ma=null,cancelAnimationFrame(W),u.hidden=!0,d.classList.remove("sculpting"),I&&Object.assign(l.opts,I),ta(!1),l.resizeListener(),xa())}function Pa(){ra++,M=!1,ca(),A==null||A.terminate(),A=null,x==null||x.dispose(),x=null,q=null,H={undo:0,redo:0};for(const f of m.values())f.reject(new Error("Editing session was replaced."));m.clear(),xa()}e.onclick=()=>{G?ca():ka()},F.done.onclick=ca,u.querySelectorAll("[data-mode]").forEach(f=>f.onclick=()=>{N=f.dataset.mode,y.textContent=(N==="smooth"?"Smooth: click to soften the patch; drag upward for more. ":N==="grab"?"Grab: drag along the normal; facing you, up pulls and down pushes. ":N==="scoop"?"Scoop: click to erase a sphere; drag to sweep at fixed depth. Lock to slices for an exact center. ":"Drag to freely rotate. ")+"Two-finger scroll or right-drag rotates; Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.",u.querySelectorAll("[data-mode]").forEach(h=>h.setAttribute("aria-pressed",String(h===f))),o.style.cursor=N==="rotate"?"grab":"crosshair",x.cursor=null,k(),x.drawCursor()});function ea(f){return D(this,null,function*(){if(M||!x)return;V(!0);const h=ra;try{const{result:S}=yield Q(f);if(h!==ra)return;sa(S),x.draw(),g.textContent=f==="undo"?"Correction undone.":"Correction restored."}catch(S){h===ra&&ya(S)}finally{h===ra&&(V(!1),k())}})}F.undo.onclick=()=>ea("undo"),F.redo.onclick=()=>ea("redo");const va=()=>{if(!G||M||!x)return;const f=x.focus(Array.from(l.frac2mm(l.scene.crosshairPos)));if(f)return x.cursor.radius=Z,c.checked&&k(),x.drawCursor(),g.textContent="Nearest surface to the slice crosshair highlighted.",f};F.focus.onclick=va,F.reset.onclick=()=>{x==null||x.resetView(),k()},l.gl.canvas.addEventListener("dblclick",()=>{G&&requestAnimationFrame(va)});for(const f of["drop","dragover"])l.gl.canvas.addEventListener(f,h=>{G&&(h.preventDefault(),h.stopImmediatePropagation(),g.textContent="Choose Done before loading another image.")},!0);o.addEventListener("contextmenu",f=>f.preventDefault()),o.addEventListener("webglcontextlost",f=>D(null,null,function*(){f.preventDefault(),ra++,V(!0);try{if((L==null?void 0:L.kind)==="grab"){const{result:h}=yield Q("cancel");h&&q&&(Ee(q.mask,q.dims,h.rect,h.data),r(h),ma==null||ma.patch(h))}}catch(h){ya(h)}finally{Pa(),n(new Error("The sculpting graphics context was lost. Accepted corrections are retained; reopen Sculpt after graphics recovers."))}})),o.addEventListener("wheel",f=>{if(f.preventDefault(),!x||M)return;const h=f.deltaMode===1?16:f.deltaMode===2?o.clientHeight:1,S=f.deltaX*h,O=f.deltaY*h;f.altKey||f.metaKey||f.ctrlKey?(x.scale=Math.max(x.initialScale*.15,Math.min(x.initialScale*3,x.scale*Math.exp(O*.001))),x.draw()):x.orbit(S,O),c.checked&&k()},{passive:!1});const Ga=f=>{if(!x||M)return;if(c.checked&&N!=="rotate"){x.cursor=T?Ea(Ca({},T),{radius:Z,tool:N,locked:!0}):null,x.drawCursor();return}const h=N!=="rotate"?x.pick(f.clientX,f.clientY):null;x.cursor=h?Ea(Ca({},h),{radius:Z,tool:N}):null,x.drawCursor()};o.addEventListener("pointerleave",()=>{!L&&x&&!c.checked&&(x.cursor=null,x.drawCursor())}),o.addEventListener("pointerdown",f=>D(null,null,function*(){if(!x||M||L||![0,2].includes(f.button))return;if(f.preventDefault(),o.focus(),o.setPointerCapture(f.pointerId),N==="rotate"||f.button===2||f.shiftKey){L={kind:"rotate",id:f.pointerId,x:f.clientX,y:f.clientY},x.cursor=null,x.drawCursor();return}const h=c.checked?T:x.pick(f.clientX,f.clientY);if(!h)return;const S=x.project(h.point),O=x.project(h.point.map((z,Y)=>z+h.normal[Y])),Sa=o.width/o.clientWidth,Ua=(O[0]-S[0])/Sa,wa=(O[1]-S[1])/Sa,_=Math.hypot(Ua,wa),la=2*x.scale/o.clientHeight,s=_*la>.2?[Ua/_,wa/_]:[0,-1],E={kind:"grab",tool:N,id:f.pointerId,hit:h,x:f.clientX,y:f.clientY,direction:s,worldPerPixel:la,wanted:N==="smooth"?.35:0,shown:0,points:N==="scoop"?[h.point.slice()]:[],screenStart:x.screenPoint(f.clientX,f.clientY,h.point),sliceOrigin:x.crosshair.slice(),starting:!0,running:!1,ended:!1,cancelled:!1,generation:ra};L=E,V(!0),x.cursor=Ea(Ca({},h),{radius:Z,tool:E.tool,origin:h.point}),c.checked||fa(h.point),l.drawScene(),x.drawCursor(),g.textContent=E.tool==="smooth"?"Softening this patch · drag upward for more; Escape cancels.":E.tool==="scoop"?"Scoop removes the orange sphere · drag to sweep; Escape cancels.":"Drag to move the boundary · Escape cancels this grab.";try{const{result:z,ms:Y}=yield Q("begin",{center:h.point,normal:h.normal,tool:E.tool,radius:Z});u.dataset.beginMs=String(Math.round(Y)),E.max=E.tool==="smooth"?1:z.maxDistance,E.starting=!1,pa(E)}catch(z){E.generation===ra&&(ya(z),L=null,V(!1),k())}}));function pa(f){return D(this,null,function*(){if(!(f.starting||f.running||f.generation!==ra)){f.running=!0;try{for(;!f.cancelled&&(f.tool==="scoop"?f.points.length:f.wanted!==f.shown);){if(f.tool==="scoop"){const _=f.points.splice(0,64),la=performance.now(),{result:s,ms:E}=yield Q("scoop",{points:_});if(f.generation!==ra)return;sa(s);const z=_[_.length-1];fa(z),x.cursor={point:z,normal:f.hit.normal,radius:Z,tool:"scoop",locked:c.checked},x.draw(),u.dataset.previewMs=String(Math.round(performance.now()-la)),u.dataset.workerMs=String(Math.round(E)),g.textContent="Scooping · release to keep; Escape restores the whole stroke.";continue}const h=Math.max(f.tool==="smooth"?0:-f.max,Math.min(f.max,f.wanted));f.wanted=h;const S=performance.now(),{result:O,ms:Sa}=yield Q(f.tool==="smooth"?"smooth":"move",f.tool==="smooth"?{amount:h}:{distance:h});if(f.generation!==ra)return;f.shown=h;const Ua=f.tool==="smooth"?f.hit.point:f.hit.point.map((_,la)=>_+f.hit.normal[la]*h);fa(Ua),sa(O),x.cursor={point:Ua,normal:f.hit.normal,tool:f.tool,radius:Z,origin:f.hit.point},x.draw();const wa=performance.now()-S;g.textContent=f.tool==="smooth"?"Smoothing this patch · release to keep, Escape to cancel.":`${h>=0?"+":""}${Number(h.toPrecision(3))} mm${Math.abs(h)>=f.max?" · release and grab again to move farther":""}`,u.dataset.previewMs=String(Math.round(wa)),u.dataset.workerMs=String(Math.round(Sa))}if(f.ended){const{result:h,ms:S}=yield Q(f.cancelled?"cancel":"commit");if(u.dataset.commitMs=String(Math.round(S)),f.generation!==ra)return;f.cancelled?(sa(h),fa(f.sliceOrigin),l.drawScene(),x.cursor=Ea(Ca({},f.hit),{radius:Z,tool:f.tool}),g.textContent="Correction cancelled."):g.textContent="Correction applied · inspect the slices, then rotate or grab again.",x.draw(),L=null,V(!1),k()}}catch(h){if(f.generation===ra){try{const{result:S}=yield Q("cancel");sa(S),fa(f.sliceOrigin),l.drawScene(),x.draw()}catch(S){Pa(),n(S)}L=null,V(!1),k(),ya(h)}}finally{f.running=!1}}})}o.addEventListener("pointermove",f=>{const h=L;if((h==null?void 0:h.id)===f.pointerId){if(h.kind==="rotate")x.dragOrbit([h.x,h.y],[f.clientX,f.clientY]),c.checked&&k(),h.x=f.clientX,h.y=f.clientY;else if(!h.ended){if(h.tool==="scoop"){const S=x.screenPoint(f.clientX,f.clientY,h.hit.point),O=h.hit.point.map((Sa,Ua)=>Sa+S[Ua]-h.screenStart[Ua]);h.points.push(O),x.cursor={point:O,normal:h.hit.normal,radius:Z,tool:"scoop"},x.drawCursor(),pa(h);return}h.wanted=h.tool==="smooth"?.35+(h.y-f.clientY)/120:((f.clientX-h.x)*h.direction[0]+(f.clientY-h.y)*h.direction[1])*h.worldPerPixel,pa(h)}return}cancelAnimationFrame(W),W=requestAnimationFrame(()=>Ga(f))});const ba=(f,h=!1)=>{const S=L;if(!(!S||S.id!==f.pointerId)){if(S.kind==="rotate"){L=null;return}S.ended||(S.ended=!0,S.cancelled=h,pa(S))}};return o.addEventListener("pointerup",f=>ba(f)),o.addEventListener("pointercancel",f=>ba(f,!0)),o.addEventListener("lostpointercapture",f=>ba(f,!0)),window.addEventListener("keydown",f=>{!G||/INPUT|TEXTAREA|SELECT/.test(f.target.tagName)||document.querySelector("dialog[open]")||(f.key==="Escape"&&(L==null?void 0:L.kind)==="grab"?(f.preventDefault(),L.cancelled=!0,L.ended=!0,pa(L)):(f.ctrlKey||f.metaKey)&&f.key.toLowerCase()==="z"?(f.preventDefault(),ea(f.shiftKey?"redo":"undo")):(f.ctrlKey||f.metaKey)&&f.key.toLowerCase()==="y"&&(f.preventDefault(),ea("redo")))}),xa(),{invalidate:Pa,updateAvailability:xa,get active(){return G},get busy(){return M}}}const Xt={batchSize:1,numOfChan:1,isColorEnable:!0,isAutoColors:!0,bgLabelValue:0,drawBoundingVolume:!1,isGPU:!0,isBrainCropMaskBased:!0,showPhase1Output:!1,isPostProcessEnable:!0,fillSuppressedWithNeighborLabel:!1,diagnoseEnclosedComponents:!1,isContoursViewEnable:!1,browserArrayBufferMaxZDim:30,telemetryFlag:!1,chartXaxisStepPercent:10,uiSampleName:"Brainchomp sample",atlasSelectedColorTable:"Fire"},Ht={path:"/models/rodent/model.json",webgpu_safetensor:"./models/rodent/model.safetensors",webgpu_runner:"rodent",forceFP32:!1,webgpuStorageSize:536870912,numClasses:2,preModelId:null,preModelPostProcess:!1,isBatchOverlapEnable:!1,numOverlapBatches:0,enableTranspose:!0,enableCrop:!1,cropPadding:0,autoThreshold:0,enableQuantileNorm:!0,filterOutWithPreMask:!1,enableSeqConv:!0,textureSize:0,isPostProcessEnable:!0,returnMaskForExtraction:!0,inferenceDelay:100,warning:null},Ra=[Ea(Ca({},Ht),{id:1,type:"Brain_Extraction",modelName:"Skull-strip",description:"Extract the rodent brain and save the input intensities with non-brain voxels set to zero."})];class Kt{idx(a,t,r,n){return r*n[0]*n[1]+t*n[0]+a}check_previous_slice(a,t,r,n,e,d,u,o,v,b){let P=0;if(!e)return 0;const g=a[this.idx(r,n,e,d)];if(u>=6){const y=this.idx(r,n,e-1,d);g===a[y]&&(v[P++]=t[y])}if(u>=18){if(r){const y=this.idx(r-1,n,e-1,d);g===a[y]&&(v[P++]=t[y])}if(n){const y=this.idx(r,n-1,e-1,d);g===a[y]&&(v[P++]=t[y])}if(r<d[0]-1){const y=this.idx(r+1,n,e-1,d);g===a[y]&&(v[P++]=t[y])}if(n<d[1]-1){const y=this.idx(r,n+1,e-1,d);g===a[y]&&(v[P++]=t[y])}}if(u===26){if(r&&n){const y=this.idx(r-1,n-1,e-1,d);g===a[y]&&(v[P++]=t[y])}if(r<d[0]-1&&n){const y=this.idx(r+1,n-1,e-1,d);g===a[y]&&(v[P++]=t[y])}if(r&&n<d[1]-1){const y=this.idx(r-1,n+1,e-1,d);g===a[y]&&(v[P++]=t[y])}if(r<d[0]-1&&n<d[1]-1){const y=this.idx(r+1,n+1,e-1,d);g===a[y]&&(v[P++]=t[y])}}return P?(this.fill_tratab(o,v,P,b),v[0]):0}do_initial_labelling(a,t,r){const n=new Uint32Array(32),e=new Uint32Array(32);let d=1;const u=8192;let o=u,v=new Uint32Array(o).fill(0);const b=new Uint32Array(t[0]*t[1]*t[2]).fill(0),P=new Uint32Array(27);for(let g=0;g<t[2];g++)for(let y=0;y<t[1];y++)for(let c=0;c<t[0];c++){let U=0;const w=a[this.idx(c,y,g,t)];if(w!==0){if(P[0]=this.check_previous_slice(a,b,c,y,g,t,r,v,n,e),P[0]&&(U+=1),r>=6){if(c){const C=this.idx(c-1,y,g,t);w===a[C]&&(P[U++]=b[C])}if(y){const C=this.idx(c,y-1,g,t);w===a[C]&&(P[U++]=b[C])}}if(r>=18){if(y&&c){const C=this.idx(c-1,y-1,g,t);w===a[C]&&(P[U++]=b[C])}if(y&&c<t[0]-1){const C=this.idx(c+1,y-1,g,t);w===a[C]&&(P[U++]=b[C])}}if(U)b[this.idx(c,y,g,t)]=P[0],this.fill_tratab(v,P,U,e);else{if(b[this.idx(c,y,g,t)]=d,d>=o){o+=u;const C=new Uint32Array(o);C.set(v),v=C}v[d-1]=d,d++}}}for(let g=0;g<d-1;g++){let y=g;for(;v[y]!==y+1;)y=v[y]-1;v[g]=y+1}return[d-1,v,b]}fill_tratab(a,t,r,n){let d=2147483647;for(let u=0;u<r;u++){let o=t[u];for(;a[o-1]!==o;)o=a[o-1];n[u]=o,d=Math.min(d,o)}for(let u=0;u<r;u++)a[n[u]-1]=d}translate_labels(a,t,r,n){const e=t[0]*t[1]*t[2];let d=0;const u=new Uint32Array(e).fill(0);for(let b=0;b<n;b++)d=Math.max(d,r[b]);const o=new Uint32Array(d).fill(0);let v=0;for(let b=0;b<e;b++)a[b]&&(o[r[a[b]-1]-1]||(v+=1,o[r[a[b]-1]-1]=v),u[b]=o[r[a[b]-1]-1]);return[v,u]}neighbor_winners(a,t,r,n){const e=t[0],d=t[1],u=t[2],o=e*d,v=new Map,b=(g,y)=>{let c=v.get(g);c||(c=new Map,v.set(g,c)),c.set(y,(c.get(y)||0)+1)};for(let g=0;g<u;g++)for(let y=0;y<d;y++)for(let c=0;c<e;c++){const U=g*o+y*e+c,w=a[U];if(w===0||r[w])continue;let C;c>0&&(C=r[a[U-1]])&&b(w,C),c<e-1&&(C=r[a[U+1]])&&b(w,C),y>0&&(C=r[a[U-e]])&&b(w,C),y<d-1&&(C=r[a[U+e]])&&b(w,C),g>0&&(C=r[a[U-o]])&&b(w,C),g<u-1&&(C=r[a[U+o]])&&b(w,C)}const P=new Uint32Array(n+1).fill(0);for(const[g,y]of v){let c=0,U=0;for(const[w,C]of y)(C>U||C===U&&(c===0||w<c))&&(U=C,c=w);P[g]=c}return P}finalize_volume(a,t,r,n,e){const d=a.length,u=new Uint32Array(d).fill(0),o=e?this.neighbor_winners(a,t,r,n):null;let v=0;for(let b=0;b<d;b++){const P=a[b];if(P===0)continue;let g=r[P];!g&&o&&(g=o[P]),g&&(u[b]=g,g>v&&(v=g))}return[v,u]}diagnose_components(a,t,r,n,e={}){var x,m,p;const d=(x=e.topN)!=null?x:50,u=(m=e.minSize)!=null?m:1,o=(p=e.label)!=null?p:"diag",v=n[0],b=n[1],P=n[2],g=v*b,y=new Uint32Array(t+1),c=new Uint32Array(t+1);for(let G=0;G<a.length;G++){const M=r[G];M&&(y[M]=a[G],c[M]++)}const U=new Map,w=new Uint32Array(t+1),C=new Uint32Array(t+1),T=(G,M)=>{let N=U.get(G);N||(N=new Map,U.set(G,N)),N.set(M,(N.get(M)||0)+1)};for(let G=0;G<P;G++)for(let M=0;M<b;M++)for(let N=0;N<v;N++){const L=G*g+M*v+N,W=r[L];if(!W)continue;const I=y[W],q=Z=>{const H=r[Z];if(H===W)return;C[W]++;const ra=H?y[H]:0;ra===0?w[W]++:ra!==I&&T(W,ra)};N>0&&q(L-1),N<v-1&&q(L+1),M>0&&q(L-v),M<b-1&&q(L+v),G>0&&q(L-g),G<P-1&&q(L+g)}const B=new Map,k=new Map;for(let G=1;G<=t;G++){const M=y[G];B.set(M,(B.get(M)||0)+1),(!k.has(M)||c[G]>k.get(M))&&k.set(M,c[G])}const F=[];for(let G=1;G<=t;G++){if(c[G]<u)continue;const M=y[G],N=U.get(G);let L=0,W=0,I=0;if(N)for(const[Z,H]of N)I+=H,H>W&&(W=H,L=Z);const q=C[G]||1;F.push({comp:G,class:M,size:c[G],largestOfClass:c[G]===k.get(M)?"Y":"n",compsInClass:B.get(M),domNeighbor:L,domFracForeign:I?+(W/I).toFixed(2):0,domFracBoundary:+(W/q).toFixed(2),bgFrac:+(w[G]/q).toFixed(2)})}F.sort((G,M)=>M.domFracForeign-G.domFracForeign||M.size-G.size);const j=(G,M)=>{const N=M.map(W=>Math.max(W.h.length,...G.map(I=>String(I[W.k]).length))),L=W=>W.map((I,q)=>String(I).padStart(N[q])).join("  ");return[L(M.map(W=>W.h)),...G.map(W=>L(M.map(I=>W[I.k])))].join(`
`)},i=[{k:"comp",h:"comp"},{k:"class",h:"class"},{k:"size",h:"size"},{k:"largestOfClass",h:"lrg"},{k:"compsInClass",h:"nComp"},{k:"domNeighbor",h:"domNbr"},{k:"domFracForeign",h:"encF"},{k:"domFracBoundary",h:"encB"},{k:"bgFrac",h:"bgF"}];console.log(`[${o}] total components=${t}, distinct classes=${B.size}
[${o}] island candidates (encF≈1 + small size + lrg=n ⇒ swallowed island):
`+j(F.slice(0,d),i));const A=[...B.entries()].map(([G,M])=>({class:G,components:M,maxCompSize:k.get(G)})).sort((G,M)=>M.components-G.components);return console.log(`[${o}] per-class component counts (components=1 ⇒ fully connected):
`+j(A.slice(0,30),[{k:"class",h:"class"},{k:"components",h:"comps"},{k:"maxCompSize",h:"maxSize"}])),F}largest_original_cluster_labels(a,t,r,n=null,e=!1){const d=a.length,u=new Uint32Array(t+1).fill(0),o=new Uint32Array(t+1).fill(0);for(let v=0;v<d;v++){const b=a[v],P=r[v];u[P]=b,o[P]++}for(let v=0;v<t+1;v++){const b=u[v];for(let P=0;P<t+1;P++)P!==v&&b===u[P]&&(o[v]<o[P]||o[v]===o[P]&&v<P)&&(u[v]=0)}return this.finalize_volume(r,n,u,t,e)}filter_clusters(a,t,r,n,e=null,d=!1){const u=a.length,o=new Uint32Array(t+1).fill(0),v=new Uint32Array(t+1).fill(0);for(let g=0;g<u;g++){const y=a[g],c=r[g];c>0&&(o[c]=y,v[c]++)}const b=new Uint8Array(t+1).fill(1);for(let g=1;g<=t;g++){const y=o[g];if(n==="all"||n.has&&n.has(y)){for(let U=1;U<=t;U++)if(g!==U&&o[U]===y){if(v[U]>v[g]){b[g]=0;break}else if(v[U]===v[g]&&U<g){b[g]=0;break}}}}const P=new Uint32Array(t+1).fill(0);for(let g=1;g<=t;g++)b[g]&&(P[g]=o[g]);return this.finalize_volume(r,e,P,t,d)}filter_clusters_by_ratio(a,t,r,n,e=null,d=!1){const u=a.length,o=new Uint32Array(t+1).fill(0),v=new Uint32Array(t+1).fill(0);for(let y=0;y<u;y++){const c=r[y];c>0&&(o[c]===0&&(o[c]=a[y]),v[c]++)}const b=new Map;for(let y=1;y<=t;y++){const c=o[y],U=v[y];(!b.has(c)||U>b.get(c))&&b.set(c,U)}const P=new Uint8Array(t+1).fill(0);for(let y=1;y<=t;y++){const c=o[y],U=v[y],w=b.get(c)||0;U>=w*n&&(P[y]=1)}const g=new Uint32Array(t+1).fill(0);for(let y=1;y<=t;y++)P[y]&&(g[y]=o[y]);return this.finalize_volume(r,e,g,t,d)}bwlabel(a,t,r=26,n=!1,e=!1){const d=Date.now(),u=t[0]*t[1]*t[2],o=new Uint32Array(u).fill(0);if(![6,18,26].includes(r))return console.log("bwlabel: conn must be 6, 18 or 26."),[0,o];if(t[0]<2||t[1]<2||t[2]<1)return console.log("bwlabel: img must be 2 or 3-dimensional"),[0,o];if(n)for(let c=0;c<u;c++)a[c]!==0&&(o[c]=1);else o.set(a);let[v,b,P]=this.do_initial_labelling(o,t,r);b===void 0&&(b=new Uint32Array(0));const[g,y]=this.translate_labels(P,t,b,v);if(console.log(r+" neighbor clustering into "+g+" regions in "+(Date.now()-d)+"ms"),e){const[c,U]=this.largest_original_cluster_labels(o,g,y);return[c,U]}return[g,y]}filter_clusters_by_rank(a,t,r,n,e=0,d=null,u=!1,o=null,v=!1){const b=a.length,P=new Uint32Array(t+1).fill(0),g=new Uint32Array(t+1).fill(0),y=o!=null&&Array.isArray(d)&&d.length===3,c=y?d[0]:0,U=y?d[1]:0,w=y?new Int32Array(t+1).fill(2147483647):null,C=y?new Int32Array(t+1).fill(-1):null,T=y?new Int32Array(t+1).fill(2147483647):null,B=y?new Int32Array(t+1).fill(-1):null,k=y?new Int32Array(t+1).fill(2147483647):null,F=y?new Int32Array(t+1).fill(-1):null;for(let p=0;p<b;p++){const G=r[p];if(G>0&&(P[G]===0&&(P[G]=a[p]),g[G]++,y)){const M=p%c,N=p/c|0,L=N%U,W=N/U|0;M<w[G]&&(w[G]=M),M>C[G]&&(C[G]=M),L<T[G]&&(T[G]=L),L>B[G]&&(B[G]=L),W<k[G]&&(k[G]=W),W>F[G]&&(F[G]=W)}}let j=null,i=0;if(y){let p=-1;for(let I=1;I<=t;I++)g[I]>p&&(p=g[I],i=I);const G=Math.max(2,Math.ceil(o)+4),M=c*U,N=new Int16Array(b).fill(-1);let L=[];for(let I=0;I<b;I++)r[I]===i&&(N[I]=0,L.push(I));for(let I=1;I<=G&&L.length;I++){const q=[];for(let Z=0;Z<L.length;Z++){const H=L[Z],ra=H%c,xa=(H/c|0)%U;ra>0&&N[H-1]===-1&&(N[H-1]=I,q.push(H-1)),ra<c-1&&N[H+1]===-1&&(N[H+1]=I,q.push(H+1)),xa>0&&N[H-c]===-1&&(N[H-c]=I,q.push(H-c)),xa<U-1&&N[H+c]===-1&&(N[H+c]=I,q.push(H+c)),H-M>=0&&N[H-M]===-1&&(N[H-M]=I,q.push(H-M)),H+M<b&&N[H+M]===-1&&(N[H+M]=I,q.push(H+M))}L=q}const W=G+1;j=new Float64Array(t+1).fill(W);for(let I=0;I<b;I++){const q=r[I];if(q>0&&q!==i){const Z=N[I]>=0?N[I]:W;Z<j[q]&&(j[q]=Z)}}v&&console.log(`[rank-filter] brain comp=${i} size=${p} bbox A[${w[i]},${C[i]}] B[${T[i]},${B[i]}] C[${k[i]},${F[i]}] | maxGap=${o} scan=${G}`)}const A=new Map;for(let p=1;p<=t;p++){const G=P[p],M=g[p];A.has(G)||A.set(G,[]),A.get(G).push({i:p,size:M})}const x=new Uint8Array(t+1).fill(0);for(const[p,G]of A.entries()){G.sort((W,I)=>I.size-W.size);const M=G.length?G[0].size:0,N=e>0?M*e:0,L=Math.min(G.length,n);for(let W=0;W<L;W++){const I=G[W];if(I.size<N){v&&W>0&&console.log(`[rank-filter] class ${p} #${W}: size=${I.size} DROP (below ${(e*100).toFixed(0)}% floor)`);break}if(W>0&&y){const q=j[I.i],Z=q<=o;if(v&&console.log(`[rank-filter] class ${p} #${W}: size=${I.size} surfDist=${q} -> ${Z?"KEEP":"DROP (too far)"}`),!Z)continue}x[I.i]=1}}const m=new Uint32Array(t+1).fill(0);for(let p=1;p<=t;p++)x[p]&&(m[p]=P[p]);return this.finalize_volume(r,d,m,t,u)}}function Zt(l,a,t){return D(this,null,function*(){const[r,n,e,d,u,o]=yield sl(a),v=n-r+1,b=d-e+1,P=o-u+1,g=(A,x,m,p)=>{const G=Math.min(A,p),M=Math.min(255-x,p),N=Math.max(0,A-G),L=Math.min(255,x+M);return[N,L]},[y,c]=g(r,n,v,t),[U,w]=g(e,d,b,t),[C,T]=g(u,o,P,t);let B=l.slice([y,U,C],[c-y+1,w-U+1,T-C+1]);const k=B.shape,F=k[0]%2,j=k[1]%2,i=k[2]%2;return F||j||i?(B=B.pad([[0,F],[0,j],[0,i]]),console.log(`Padded to even dims: [${k}] -> [${B.shape}]`)):console.log(`Crop dimensions (already even): [${k}]`),{cropped:B,corner:[y,U,C],padding:[F,j,i]}})}function Jt(n,e,d){return D(this,arguments,function*(l,a,t,r=[0,0,0]){const[u,o,v]=a,[b,P,g]=t,[y,c,U]=l.shape,[w,C,T]=r||[0,0,0],B=Math.max(0,u+w),k=Math.max(0,o+C),F=Math.max(0,v+T),j=[[B,Math.max(0,b-y-B)],[k,Math.max(0,P-c-k)],[F,Math.max(0,g-U-F)]],i=l.pad(j);if(i.shape[0]>b||i.shape[1]>P||i.shape[2]>g){const A=i.slice([0,0,0],[b,P,g]);return i.dispose(),A}return i})}function Qt(l,a){return D(this,null,function*(){const t=l.max(),r=t.mul(a),n=yield r.data();return t.dispose(),r.dispose(),_a(()=>l.clone().greater(n[0]))})}function Te(l,a,t){const r=(a-1)*t,n=Math.floor(r),e=Math.ceil(r);let d=0,u=0,o=0,v=!1;for(let b=0;b<l.length;b++)if(d+=l[b],!v&&d>n&&(u=b,v=!0),d>e){o=b;break}return u+(o-u)*(r-n)}function al(l,a=.02,t=.98){return D(this,null,function*(){const r=l.flatten(),n=r.shape[0],e=yield r.data();r.dispose();const d=new Uint32Array(256);let u=!0;for(let c=0;c<n;c++){const U=e[c];if(!Number.isFinite(U))throw new Error("Cannot percentile-normalize a volume containing NaN or Infinity");U<0||U>255||U!==Math.trunc(U)?u=!1:d[U]++}if(u)return{qmin:Te(d,n,a),qmax:Te(d,n,t)};const o=Math.min(1e5,n),v=new Float32Array(o),b=o>1?(n-1)/(o-1):0;for(let c=0;c<o;c++){const U=e[Math.round(c*b)];if(!Number.isFinite(U))throw new Error("Cannot percentile-normalize a volume containing NaN or Infinity");v[c]=U}v.sort();const P=c=>{const U=(o-1)*c,w=Math.floor(U),C=Math.ceil(U);return v[w]+(v[C]-v[w])*(U-w)},g=P(a),y=P(t);return{qmin:g,qmax:y}})}function el(l,a,t,r,n,e,d){return D(this,null,function*(){const u=l.shape[4],o=a.shape[4];let v=null;for(let b=0;b<o;b++){const P=Math.ceil(u/d);let g=null;for(let c=0;c<P;c++){const U=c*d,w=Math.min((c+1)*d,u);if(U<u){const C=_a(()=>{const T=l.slice([0,0,0,0,U],[-1,-1,-1,-1,w-U]),B=a.slice([0,0,0,U,b],[-1,-1,-1,w-U,1]);return ie(T,B,r,n,"NDHWC",e)});if(g===null)g=C;else{const T=g.add(C);g.dispose(),C.dispose(),g=T}}}let y;if(t){const c=t.slice([b],[1]);y=g.add(c),g.dispose(),c.dispose()}else y=g;if(v==null)v=y;else{const c=yield be([v,y],4);y.dispose(),v.dispose(),v=c}}return v})}function tl(l,a=1e-5){return _a(()=>{const{mean:t,variance:r}=Ot(l,[1,2,3],!0),n=ze(r.add(a));return l.sub(t).mul(n)})}function ll(l,a,t,r,n,e,d){return D(this,null,function*(){const u=l.shape[4],o=a.shape[4];let v=null;for(let b=0;b<o;b++){const P=Math.ceil(u/d);let g=null;for(let U=0;U<P;U++){const w=U*d,C=Math.min((U+1)*d,u);if(w<u){const T=_a(()=>{const B=l.slice([0,0,0,0,w],[-1,-1,-1,-1,C-w]),k=a.slice([0,0,0,w,b],[-1,-1,-1,C-w,1]);return ie(B,k,r,n,"NDHWC",e)});if(g===null)g=T;else{const B=g.add(T);g.dispose(),T.dispose(),g=B}}}let y;if(t){const U=t.slice([b],[1]);y=g.add(U),g.dispose(),U.dispose()}else y=g;const c=tl(y);if(y.dispose(),v===null)v=c;else{const U=yield be([v,c],4);c.dispose(),v.dispose(),v=U}}return v})}function Ve(l,a,t,r,n,e,d,u){const o=l.length;return _a(()=>{let v=null;const b=Math.ceil(o/u);for(let P=0;P<b;P++){const g=P*u,y=Math.min((P+1)*u,o),c=y-g,U=c===1?l[g]:be(l.slice(g,y),4),w=a.slice([0,0,0,g,r],[-1,-1,-1,c,1]),C=ie(U,w,n,e,"NDHWC",d);v=v===null?C:v.add(C)}return t&&(v=v.add(t.slice([r],[1]))),v})}function Ge(l,a,t,r,n,e,d,u=!1){const o=a.shape[4],v=[];for(let b=0;b<o;b++){let P=Ve(l,a,t,b,r,n,e,d);if(u){const g=Ye(P);P.dispose(),P=g}v.push(P)}return v}function il(l,a,t,r,n,e){const d=a.shape[3],u=a.shape[4],o=[1,r[0],r[1],r[2],1],v=[];for(let b=0;b<d;b++){const P=_a(()=>{let g=null;for(let y=0;y<u;y++){const c=a.slice([0,0,0,b,y],[-1,-1,-1,1,1]),U=Et(l[y],c,o,n,e);g=g===null?U:g.add(U)}return t&&(g=g.add(t.slice([b],[1]))),g});v.push(P)}return v}function rl(l,a,t,r,n,e,d,u=!0){return D(this,null,function*(){const o=a.shape[4],v=3;let b=null,P=null,g=null;for(let y=0;y<o;y++){const c=Ve(l,a,t,y,r,n,e,v);g===null&&(g=[c.shape[1],c.shape[2],c.shape[3]]);const U=_a(()=>c.reshape(g));if(c.dispose(),b===null)b=U,P=Ct(U);else{const[w,C]=_a(()=>{const T=Fe(U,b);return[Qa(T,U,b),Qa(T,Ne(P.shape,y),P)]});b.dispose(),P.dispose(),U.dispose(),b=w,P=C}d&&d(`Final layer class ${y+1}/${o}`,(y+1)/o),!u&&y%8===0&&(yield new Promise(w=>setTimeout(w,0)))}return b.dispose(),P})}function nl(l){const a=l.shape[4];if(a===1)return[l];const t=[];for(let r=0;r<a;r++)t.push(l.slice([0,0,0,0,r],[-1,-1,-1,-1,1]));return t}function Ye(l,a=1e-5){return _a(()=>{const t=l.shape.length,r=l.shape[t-1],n=l.shape[1]*l.shape[2]*l.shape[3],e=l.transpose([0,4,1,2,3]).reshape([r,n]),d=e.mean(1),o=e.sub(d.reshape([r,1])).square().mean(1),v=ze(Tt(o,a)),b=d.reshape([1,1,1,1,r]),P=v.reshape([1,1,1,1,r]);return l.sub(b).mul(P)})}function oe(l,a=0){return D(this,null,function*(){let t=[];a===0?t=yield l.max(2).max(1).arraySync():a===1?t=yield l.max(2).max(0).arraySync():t=yield l.max(1).max(0).arraySync();let r=t.length,n=0;for(let e=0;e<t.length;e++)if(t[e]>0){r=e;break}for(let e=t.length-1;e>=0;e--)if(t[e]>0){n=e;break}return[r,n]})}function sl(l){return D(this,null,function*(){const[a,t]=yield oe(l,0),[r,n]=yield oe(l,1),[e,d]=yield oe(l,2);return console.log("row min and max  :",a,t),console.log("col min and max  :",r,n),console.log("depth min and max  :",e,d),[a,t,r,n,e,d]})}function ul(l,a,t,r,n,e,d,u,o=!0){return D(this,null,function*(){l[0].dtype!=="int32"&&d("",-1,"generateBrainMask assumes int32"),n.preModelPostProcess&&d("",-1,"generateBrainMask assumes BWLabeler instead of preModelPostProcess");const v=l.length,b=l[0].size,P=v*b,g=new Int32Array(P);let y=0;for(let c=0;c<v;c++)g.set(l[c].dataSync(),y),y+=b;for(let c=0;c<P;c++)g[c]=g[c]!==0?1:0;return(o||e.showPhase1Output)&&(u(g,e,n),d("Segmentation finished",0)),Ja(g,[a,t,r])})}function ol(l,a,t){return D(this,null,function*(){const r=a.dims[1],n=a.dims[2];let e;if(a.datatypeCode===2)e=new Uint8Array(t);else if(a.datatypeCode===4)e=new Int16Array(t);else if(a.datatypeCode===8)e=new Int32Array(t);else if(a.datatypeCode===16)e=new Float32Array(t);else if(a.datatypeCode===64)e=new Float64Array(t);else if(a.datatypeCode===256)e=new Int8Array(t);else if(a.datatypeCode===512)e=new Uint16Array(t);else if(a.datatypeCode===768)e=new Uint32Array(t);else return;const d=[];let u=0;for(let v=0;v<l;v++){const b=new Array(n*r);let P=0;for(let g=0;g<n;g++)for(let y=0;y<r;y++){const c=e[u++];b[P++]=c&255}d.push(Ja(b,[n,r]))}const o=xt(d);return La(d),o})}function je(l){return D(this,null,function*(){return l.layers.length})}function Xe(l){return D(this,null,function*(){let a=0;for(let t=0;t<l.layers.length;t++)a+=l.layers[t].countParams();return a})}function ae(l){return D(this,null,function*(){for(let a=0;a<l.layers.length;a++)if(l.layersByDepth[a][0].dataFormat)return l.layersByDepth[a][0].dataFormat==="channelsLast"})}function He(l){return D(this,null,function*(){return yield _t(l)})}function pe(l){return D(this,null,function*(){const a=l.max(),t=l.min();return yield l.sub(t).div(a.sub(t))})}function fl(l,a,t){const d=l.shape[4],u=Math.ceil(d/t);let o=null;for(let v=0;v<u;v++){const b=v*t,g=Math.min((v+1)*t,d)-b,y=_a(()=>l.slice([0,0,0,0,b],[-1,-1,-1,-1,g])),c=_a(()=>a.slice([0,0,0,b,0],[-1,-1,-1,g,-1])),U=ie(y,c,1,0,"NDHWC",1);y.dispose(),c.dispose();const w=We(U);if(U.dispose(),o===null)o=w;else{const C=o.add(w);o.dispose(),o!==w&&w.dispose(),o=C}_a(()=>{Gt(de([1,1]),de([1,1]))})}return o}function he(l,a=.02,t=.98,r=.001){return D(this,null,function*(){if(!(a>=0&&a<t&&t<=1))throw new Error(`Invalid normalization percentiles: ${a}, ${t}`);const{qmin:n,qmax:e}=yield al(l,a,t);console.log(`[Normalization] ${a*100}-${t*100} percentiles: low=${n}, high=${e}, epsilon=${r}, clip=[0,1]`);const d=e-n+r,u=l.sub(n),o=u.div(d),v=o.clipByValue(0,1);return u.dispose(),o.dispose(),v})}class cl{constructor(a,t,r,n,e=!0){this.model=a,this.outChannels=a.outputLayers[0].kernel.shape[4],this.chunkSize=t,this.isChannelLast=r,this.callbackUI=n,this.isWebWorker=e}apply(a){return D(this,null,function*(){const t=performance.now(),r=this.model.layers[this.model.layers.length-1],n=r.getWeights()[0],e=r.getWeights()[1],d=this.isChannelLast?a.shape.slice(1,-1):a.shape.slice(2);let u=yield wt(Mt(d),-1e4),o=yield de(d);const v=3,b=Math.ceil(this.outChannels/v);for(let y=0;y<b;y++){const c=y*v,U=Math.min((y+1)*v,this.outChannels),[w,C]=yield _a(()=>{let T=u,B=o;for(let k=c;k<U;k++){const F=n.slice([0,0,0,0,k],[-1,-1,-1,-1,1]),j=e.slice([k],[1]),i=fl(a,F,Math.min(this.chunkSize,this.outChannels)).add(j),A=Fe(i,T);T=Qa(A,i,T),B=Qa(A,Ne(B.shape,k),B)}return[T,B]});La([u,o]),u=w,o=C,this.callbackUI(`Processing chunk ${y+1}/${b}`,(y+1)/b),this.isWebWorker||(yield new Promise(T=>setTimeout(T,0)))}const P=o.clone();La([u,o]);const g=performance.now();return console.log(`Execution time: ${g-t} milliseconds`),P})}}function Ke(l,a,t,r){return D(this,null,function*(){console.log("Downloading segmentation data from GPU to CPU...");const n=yield l.data(),e=l.shape;if(console.log("Data download complete. Starting CPU processing."),r.isPostProcessEnable){console.log("Applying CPU-based connected-component labeling...");const d=performance.now(),u=new Kt,o=[5,14],v=!!r.fillSuppressedWithNeighborLabel||o.includes(t.id),b=e[0]*e[1]*e[2],P=Math.max(1e5,Math.floor(b*.01)),[g,y]=u.bwlabel(n,e,6,!1,!1);if(g>P){const C=`Segmentation produced noise: ${g.toLocaleString()} disconnected regions (cap ${P.toLocaleString()}). The model output is unusable, so post-processing was aborted. Try re-running, switching backend (WebGPU/WebGL2), or another model.`;console.error("[postprocess] "+C);const T=new Error(C);throw T.code="SEGMENTATION_NOISE",T}let c=!1,U=!1;if(t.type==="Brain_Extraction"||t.type==="Brain_Masking"?(c=!0,U=!0):[1,7].includes(t.id)?(c=!1,U=!1):[5,14].includes(t.id)?(c=!1,U=!0):[3,8,9].includes(t.id)?(c=!1,U=!1):(c=!0,U=!0),[1,7].includes(t.id)){const k=g,F=y,[j,i]=u.filter_clusters_by_rank(n,k,F,2,.02,e,v,8,!1);n.set(i)}else if(!U&&[3,8,9].includes(t.id)){const[C,T]=u.bwlabel(n,e,6,!0,!0);for(let A=0;A<n.length;A++)n[A]*=T[A];const[B,k]=u.bwlabel(n,e,6,!1,!1),F=new Set([1,2,5,6,13]),[j,i]=u.filter_clusters(n,B,k,F,e,v);n.set(i)}else if(!c&&U){r.diagnoseEnclosedComponents&&u.diagnose_components(n,g,y,e,{label:`model${t.id}`,topN:60});const[C,T]=u.largest_original_cluster_labels(n,g,y,e,v);n.set(T)}else{const[C,T]=u.bwlabel(n,e,6,c,U);if(c)for(let B=0;B<n.length;B++)n[B]*=T[B];else n.set(T)}const w=((performance.now()-d)/1e3).toFixed(4);console.log(`Connected-component labeling took: ${w} seconds.`)}switch(t.type){case"Brain_Masking":{const d=new Uint8Array(n.length);for(let u=0;u<n.length;u++)d[u]=n[u]!==0?1:0;return d}case"Brain_Extraction":{if(t.returnMaskForExtraction){const u=new Uint8Array(n.length);for(let o=0;o<n.length;o++)u[o]=n[o]!==0?1:0;return u}const d=new a.constructor(n.length);for(let u=0;u<n.length;u++){const o=n[u]!==0?1:0;d[u]=a[u]*o}return d}default:return new Uint8Array(n)}})}function ye(l,a,t){var o;let r=0,n=1;if(t)if(a.length===5)n=a[1]*a[2]*a[3];else for(let v=0;v<a.length;v++)a[v]>1&&(n*=a[v]);else if(a.length===5)n=a[2]*a[3]*a[4];else for(let v=0;v<a.length;v++)a[v]>32&&(n*=a[v]);let e=0,d=0;if(l&&l.layers){const v=l.layers.length;for(let b=0;b<v;b++){const P=l.layers[b],g=b===v-1;let y=0,c=P.outputShape;Array.isArray(c)&&Array.isArray(c[0])&&(c=c[0]),Array.isArray(c)&&(t?y=c[c.length-1]:y=c[1]);let U=0;const w=P.batchInputShape,C=T=>Array.isArray(T)?t?T[T.length-1]:T[1]:0;if(w)if(Array.isArray(w)&&Array.isArray(w[0]))for(const T of w)U+=C(T);else Array.isArray(w)&&(U=C(w));if(U===0&&P.weights&&P.weights.length>0){const T=P.weights[0];T&&T.shape&&(T.shape.length===5?U=T.shape[3]:T.shape.length===4&&(U=T.shape[2]))}if(U===0&&(U=y),typeof y=="number"&&typeof U=="number"){const T=n*(U+y),B=n*y;!g&&T>r&&(r=T);const k=n*Math.max(U,y);!g&&k>d&&(d=k),e=B}}}r===0&&(r=n*32*2),d===0&&(d=n*32);const u=!!(l&&l.layers&&l.layers.some(v=>typeof v.name=="string"&&v.name.endsWith("_gn")));return console.log(`[Estimator] Total Layers: ${(o=l==null?void 0:l.layers)==null?void 0:o.length}, Peak(in+out): ${r}, MaxSingle: ${d}, Final Output: ${e}, unpackedIntermediate: ${u}`),{peak:r,maxSingle:d,maxOutput:e,hasUnpackedIntermediate:u}}function Ze(l,a){try{const t=Ie();if(t&&t.gpgpu&&t.gpgpu.gl){const r=t.gpgpu.gl.getParameter(t.gpgpu.gl.MAX_TEXTURE_SIZE),n=Math.ceil(l/4),e=Math.ceil(Math.sqrt(n)),u=Math.ceil(Math.sqrt(a));if(console.log(`[Memory Check] Peak: ${l}, MaxOutput: ${a}, Packed Dim: ${e}, Unpacked Dim: ${u}, MaxTextureSize: ${r}`),e>r)return console.warn(`Proactive check (PACKED): Tensor size ${l} requires approx ${e}x${e} texture. Exceeds MAX_TEXTURE_SIZE ${r}`),!1;if(u>r)return console.warn(`Proactive check (UNPACKED): Max output ${a} requires approx ${u}x${u} texture. Exceeds MAX_TEXTURE_SIZE ${r}`),!1}}catch(t){console.warn("Could not check texture size limits:",t)}return!0}const ee={WEBGPU:"webgpu",WEBGL_MAIN:"webgl-main",WEBGL_SEQUENTIAL:"webgl-sequential"};function Je(l,a){return{startTime:Date.now(),Model_Name:(l==null?void 0:l.modelName)||"Unknown",Execution_Mode:a,TF_Backend:a===ee.WEBGPU?"webgpu":"webgl",isModelFullVol:null,No_SubVolumes:1,Brainchop_Ver:"FullVolume",Input_Shape:null,Output_Shape:null,Channel_Last:null,Model_Param:null,Model_Layers:null,Actual_Labels:null,Expect_Labels:null,NumLabels_Match:null,Missing_Labels:null,Inference_t:null,Postprocess_t:null,Status:null,Error_Type:null,Extra_Err_Info:null}}function dl(l,a,t,r,n,e){return D(this,null,function*(){var d,u,o;if(a)try{l.Input_Shape=JSON.stringify(t),l.Output_Shape=JSON.stringify(((d=a.output)==null?void 0:d.shape)||((o=(u=a.outputs)==null?void 0:u[0])==null?void 0:o.shape)),l.Channel_Last=r,n&&(l.Model_Param=yield n(a)),e&&(l.Model_Layers=yield e(a))}catch(v){console.warn("Failed to add model info to diagnostics:",v)}})}function Se(l,a,t,r=null){l.Expect_Labels=a,l.Actual_Labels=t,l.NumLabels_Match=a===t,r&&r.length>0&&(l.Missing_Labels=r.join(", "))}function me(l,a,t){l.Inference_t=a,l.Postprocess_t=t,l.Status="OK"}function $a(l,a,t=null){l.Inference_t=1/0,l.Postprocess_t=1/0,l.Status="Fail",l.Error_Type=(a==null?void 0:a.message)||String(a),t&&(l.Extra_Err_Info=t)}const vl=!1;function te(l,a,t,r,n,e,d,u,o){return D(this,null,function*(){const v=performance.now();console.log(`---- Start FullVolume Inference (SeqConv: ${a.enableSeqConv}) ----`),a.enableQuantileNorm?(console.log("preModel Quantile normalization enabled"),r=yield he(r)):(console.log("preModel Min Max normalization enabled"),r=yield pe(r));let b;if(n==null){const V=a.autoThreshold;V>0&&V<=1?b=yield Qt(r,V):b=yield r.greater([0]).asType("bool")}else b=yield n.greater([0]).asType("bool");const P=r.shape,g=a.webglEnableTranspose!==void 0?a.webglEnableTranspose:a.enableTranspose,y=a.cropPadding;let c,U,w;if(a.enableCrop){const V=yield Zt(r,b,y);c=V.cropped,U=V.corner,w=V.padding,r.dispose()}else{console.log("Skipping cropping (enableCrop: false)");const V=r.shape,Q=V[0]%2,oa=V[1]%2,ta=V[2]%2;Q||oa||ta?(console.log(`Padding standard input to even: ${V} -> +[${Q}, ${oa}, ${ta}]`),c=r.pad([[0,Q],[0,oa],[0,ta]]),w=[Q,oa,ta],r.dispose()):(c=r,w=null),U=[0,0,0]}b.dispose(),a.inputPermutation?(console.log(`Permuting Input: ${a.inputPermutation}`),c=c.transpose(a.inputPermutation)):g&&(c=c.transpose(),console.log("Input transposed for pre-model"));const C=yield t,T=C.layers.length,B=ae(C);let k;B?(C.layers[0].batchInputShape[1]=c.shape[0],C.layers[0].batchInputShape[2]=c.shape[1],C.layers[0].batchInputShape[3]=c.shape[2],k=[l.batchSize,C.layers[0].batchInputShape[1],C.layers[0].batchInputShape[2],C.layers[0].batchInputShape[3],l.numOfChan]):(C.layers[0].batchInputShape[2]=c.shape[0],C.layers[0].batchInputShape[3]=c.shape[1],C.layers[0].batchInputShape[4]=c.shape[2],k=[l.batchSize,l.numOfChan,C.layers[0].batchInputShape[2],C.layers[0].batchInputShape[3],C.layers[0].batchInputShape[4]]);let F=c.reshape(k),j=!1;if(!a.enableSeqConv){const{peak:V,maxSingle:Q,maxOutput:oa,hasUnpackedIntermediate:ta}=ye(C,k,B);console.log(`[Centralized Check] Peak (In+Out): ${V}, MaxSingle: ${Q}, Max Output: ${oa}, unpackedIntermediate: ${ta}`);const na=Ie(),da=na&&na.gpgpu&&na.gpgpu.gl?na.gpgpu.gl.getParameter(na.gpgpu.gl.MAX_TEXTURE_SIZE):16384;console.log(`[Memory Check] MAX_TEXTURE_SIZE from WebGL context: ${da}`);const sa=Math.ceil(Math.sqrt(Math.ceil(Q/(ta?1:4)))),ya=Math.ceil(Math.sqrt(oa));sa>da?(console.warn(`[Memory Check] PACKED intermediates too large (${sa} > ${da}). Using full SeqConv.`),a.enableSeqConv=!0):ya>da?(console.warn(`[Memory Check] UNPACKED output too large (${ya} > ${da}). Using chunkedArgMax.`),j=!0):console.log("[Memory Check] All checks passed. Using fast path.")}const i=a.enableSeqConv?"SeqConv (SLOW: per-channel conv + sync every layer)":j?"fast + chunkedArgMax (final layer only)":"fast (dense)";console.log(`%c[PATH] ${i}  | crop=${c.shape}  | enableCrop=${a.enableCrop} cropPadding=${a.cropPadding}`,"font-weight:bold;color:#0a0");function A(V,Q,oa,ta,na,da,fa){return D(this,null,function*(){let sa=1,ya=Q;const ka=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),ca=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;let Pa=ka||ca?10:15;for(na.enableSeqConv&&(Pa=1),console.log(`Syncing GPU every ${Pa} layers.`);sa<=oa;){performance.now();let ea="";try{let va;const Ga=V.layers[sa],pa=Ga.activation,ba=Ga.getClassName()==="Conv3D"&&pa&&pa.getClassName()==="linear";na.enableSeqConv&&ba?va=yield(V.layers[sa].name.endsWith("_gn")?ll:el)(ya,V.layers[sa].getWeights()[0],V.layers[sa].getWeights()[1],V.layers[sa].strides,V.layers[sa].padding,V.layers[sa].dilationRate,3):vl&&V.layers[sa].name.endsWith("_gn")||(va=_a(()=>{let f=V.layers[sa].apply(ya);return V.layers[sa].name.endsWith("_gn")&&(f=Ye(f)),f})),ya.dispose(),ya=va}catch(va){throw fa(va.message,-1,va.message),Ta().endScope(),Ta().disposeVariables(),$a(da,va,"Failed while model layer "+sa+" apply"),fa("",-1,"",da),va}if(sa%Pa===0){fa("Layer "+sa.toString(),(sa+1)/ta);const va=ya.slice([0,0,0,0,0],[1,1,1,1,1]);yield va.data(),va.dispose()}else fa("Layer "+sa.toString(),(sa+1)/ta);sa++}return ya})}function x(V,Q,oa,ta,na,da,fa){return D(this,null,function*(){const sa=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),ya=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,ka=sa||ya?4:6;let ca=nl(Q),Pa=1;for(;Pa<=oa;){try{const ea=V.layers[Pa],va=ea.getClassName(),Ga=ea.activation;let pa;if(va==="Conv3D"&&Ga&&Ga.getClassName()==="linear"){const ba=ea.name.endsWith("_gn");pa=Ge(ca,ea.getWeights()[0],ea.getWeights()[1],ea.strides,ea.padding,ea.dilationRate,3,ba)}else if(va==="Activation")pa=ca.map(ba=>_a(()=>ea.apply(ba)));else if(va==="Conv3D"){pa=Ge(ca,ea.getWeights()[0],ea.getWeights()[1],ea.strides,ea.padding,ea.dilationRate,3,!1);const ba=pa.map(f=>_a(()=>ea.activation.apply(f)));La(pa),pa=ba}else if(va==="Conv3DTranspose"){const ba=[ca[0].shape[1],ca[0].shape[2],ca[0].shape[3]],f=ea.computeOutputShape([1,ba[0],ba[1],ba[2],ca.length]),h=[f[1],f[2],f[3]];if(pa=il(ca,ea.getWeights()[0],ea.getWeights()[1],h,ea.strides,ea.padding),ea.activation&&ea.activation.getClassName()!=="linear"){const S=pa.map(O=>_a(()=>ea.activation.apply(O)));La(pa),pa=S}}else throw new Error(`Channel-list path: unsupported layer ${va} (${ea.name})`);La(ca),ca=pa}catch(ea){throw La(ca),fa(ea.message,-1,ea.message),Ta().endScope(),Ta().disposeVariables(),$a(da,ea,"Failed while model layer "+Pa+" apply (channel-list)"),fa("",-1,"",da),ea}if(fa("Layer "+Pa.toString(),(Pa+1)/ta),Pa%ka===0){const ea=ca[0].slice([0,0,0,0,0],[1,1,1,1,1]);yield ea.data(),ea.dispose()}Pa++}return ca})}const m=performance.now(),G=a.enableSeqConv||j?T-2:T-1;let M;if(a.enableSeqConv){a.enableTTA&&console.warn("[channel-list] TTA is not supported on the channel-list path; running a single pass.");const V=yield x(C,F,G,T,a,e,u);c.dispose(),console.log("Applying channel-list final classifier + argmax...");const Q=C.layers[T-1],oa=typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope,ta=yield rl(V,Q.getWeights()[0],Q.getWeights()[1],Q.strides,Q.padding,Q.dilationRate,u,oa);La(V),M=ta.asType("int32"),ta.dispose(),console.log("Channel-list argmax output shape:",M.shape)}else{if(a.enableTTA){console.log("--- Running TTA Pass 1 (Original) ---");const Q=yield A(C,F,G,T,a,e,u);if(!Q)throw new Error("TTA Error: logits1 is null or undefined");console.log("--- Running TTA Pass 2 (Flipped) ---");const oa=a.ttaFlipAxis||1,ta=c.clone().reverse(oa).reshape(k),na=yield A(C,ta,G,T,a,e,u);if(!na)throw new Error("TTA Error: logits2 is null or undefined");console.log("--- Averaging TTA Results ---");const da=_a(()=>{const fa=na.shape;return na.reshape([fa[0]*fa[1],fa[2],fa[3],fa[4]]).reverse(oa).reshape(fa)});F=Q.add(da).div(2),Q.dispose(),na.dispose(),da.dispose(),c.dispose()}else F=yield A(C,F,G,T,a,e,u),c.dispose();if(j){console.log("Applying SequentialConvLayer for final layer only (fast path for layers 1-18)...");const Q=yield new cl(C,10,B,u).apply(F);M=Q.asType("int32"),Q.dispose(),F.dispose(),console.log("SequentialConvLayer (final only) output shape:",M.shape)}else console.log("Applying final ArgMax..."),M=_a(()=>{const Q=De(F,B?-1:1);return We(Q)}),F.dispose(),console.log("ArgMax output shape:",M.shape)}const N=((performance.now()-m)/1e3).toFixed(4);console.log(`---- Inference Time: ${N} seconds ----`),a.outputPermutation?(console.log(`Permuting Output: ${a.outputPermutation}`),M=M.transpose(a.outputPermutation)):g&&(console.log("outLabelVolume transposed"),M=M.transpose());const L=performance.now();if(w&&(w[0]||w[1]||w[2])){const V=M.shape,Q=[V[0]-w[0],V[1]-w[1],V[2]-w[2]],oa=M.slice([0,0,0],Q);M.dispose(),M=oa,console.log(`Removed padding: [${V}] -> [${M.shape}]`)}console.log("outLabelVolume without padding shape: ",M.shape),M=yield Jt(M,U,P,a.outputShift),console.log("outLabelVolume final shape after restoration: ",M.shape);const W=((performance.now()-L)/1e3).toFixed(4);console.log(`---- Restoration Time: ${W} seconds ----`);const I=performance.now();let q;try{q=yield Ke(M,o,a,l)}catch(V){throw u(V.message,-1,V.message),$a(e,V,"Failed during segmentation post-processing"),u("",-1,"",e),M.dispose(),Ta().disposeVariables(),V}const Z=((performance.now()-I)/1e3).toFixed(4);console.log(`---- Postprocessing Time: ${Z} seconds ----`),M.dispose(),Ta().disposeVariables();const H=((performance.now()-v)/1e3).toFixed(4);console.log(`---- Total Execution Time: ${H} seconds ----`);const ma=new Set(q).size,xa=a.numClasses||ma;return Se(e,xa,ma),me(e,N,Z),u(a.modelName+"<br>Segmentation finished",0),u("",-1,"",e),d(q,l,a),0})}function gl(l,a,t,r,n,e,d,u,o,v,b,P){return D(this,null,function*(){if(u.No_SubVolumes=1,d.preModelId){const g=yield He(o.rootURL+Ra[d.preModelId-1].path),y=Ra[d.preModelId-1].enableTranspose,c=Ra[d.preModelId-1].enableQuantileNorm;let U=null;c?(console.log("preModel Quantile normalization enabled"),U=yield he(a)):(console.log("preModel Min Max normalization enabled"),U=yield pe(a)),y?(U=yield U.transpose(),console.log("Input transposed for pre-model")):console.log("Transpose not enabled for pre-model"),u.Brainchop_Ver="PreModel_FV";const w=yield g;try{const C=performance.now(),T=w,B=T.layers[0].batchInputShape;if(console.log(" Pre-Model batch input shape : ",B),B.length!==5){const I="The pre-model input shape must be 5D ";return b(I,-1,I),0}const k=ae(T),F=o.batchSize,j=o.numOfChan;let i,A,x,m;if(k){if(console.log("Pre-Model Channel Last"),isNaN(B[4])||B[4]!==1){const I="The number of channels for pre-model input shape must be 1";return b(I,-1,I),0}i=B[1],A=B[2],x=B[3],m=[F,i,A,x,j]}else{if(console.log("Pre-Model Channel First"),isNaN(B[1])||B[1]!==1){const I="The number of channels for pre-model input shape must be 1";return b(I,-1,I),0}i=B[2],A=B[3],x=B[4],m=[F,j,i,A,x]}u.Input_Shape=JSON.stringify(m),u.Output_Shape=JSON.stringify(T.output.shape),u.Channel_Last=k,u.Model_Param=yield Xe(T),u.Model_Layers=yield je(T);let p=0;const G=Ra[d.preModelId-1].inferenceDelay;let M=1;const N=w.layers.length,L=[];L[0]=U.reshape(m),La(U);const W=window.setInterval(function(){return D(this,null,function*(){try{L[M]=yield w.layers[M].apply(L[M-1])}catch(I){const q="Your graphics card (e.g. Intel) may not be compatible with WebGL. "+I.message;return b(q,-1,q),window.clearInterval(W),Ta().endScope(),Ta().disposeVariables(),$a(u,I,"PreModel Failed while model layer "+M+" apply"),b("",-1,"",u),0}if(w.layers[M].dispose(),L[M-1].dispose(),b("Layer "+M.toString(),(M+1)/N),se().unreliable){const I="unreliable reasons :"+se().reasons;b(I,NaN,I)}if(M===N-1){window.clearInterval(W);const I=k?-1:1;console.log(" find argmax "),console.log("last Tensor shape : ",L[M].shape);const q=k?L[M].shape[4]:L[M].shape[1];let Z;try{console.log(" Try tf.argMax for fullVolume .."),Z=yield De(L[M],I)}catch(ta){if(I===-1)try{const na=performance.now();console.log(" tf.argMax failed .. try argMaxLarge .."),window.alert("tensor2LightBuffer() is not dead code?"),window.alert("argMaxLarge() is not dead code?"),console.log("argMaxLarge for fullVolume takes : ",((performance.now()-na)/1e3).toFixed(4))}catch(na){const da="argMax buffer couldn't be created due to limited memory resources.";return b(da,-1,da),Z.dispose(),window.clearInterval(W),Ta().endScope(),Ta().disposeVariables(),u.Inference_t=1/0,u.Postprocess_t=1/0,u.Status="Fail",u.Error_Type=na.message,u.Extra_Err_Info="preModel prediction_argmax from argMaxLarge failed",b("",-1,"",u),0}else{const na="argMax buffer couldn't be created due to limited memory resources.";return b(na,-1,na),Z.dispose(),window.clearInterval(W),Ta().endScope(),Ta().disposeVariables(),u.Inference_t=1/0,u.Postprocess_t=1/0,u.Status="Fail",u.Error_Type=ta.message,u.Extra_Err_Info="preModel prediction_argmax from argMaxLarge not support yet channel first",b("",-1,"",u),0}}console.log(" Pre-model prediction_argmax shape : ",Z.shape);const H=((performance.now()-C)/1e3).toFixed(4);La(L[M]),console.log(" Pre-model find array max ");const ra=yield Z.max().dataSync()[0];p<ra&&(p=ra);const ma=p+1;console.log("Pre-model numSegClasses",ma),Se(u,q,ma);let xa=yield Z.reshape([t,r,n]);La(Z),y&&(console.log("Pre-model outLabelVolume transposed"),xa=xa.transpose());const V=performance.now();console.log("Generating pre-model output");let Q;try{const ta=yield At(xa);Q=yield ul(ta,t,r,n,d,o,b,v,!1),yield La(xa),console.log(" Phase-1 num of tensors after generateBrainMask: ",se().numTensors)}catch(ta){Ta().endScope(),Ta().disposeVariables();const na="Failed while generating pre-model output due to limited browser memory available";return b(na,-1,na),u.Inference_t=H,$a(u,ta,"Pre-model failed while generating output"),u.Inference_t=H,b("",-1,"",u),0}const oa=((performance.now()-V)/1e3).toFixed(4);if(console.log("Pre-model processing the whole brain volume in tfjs tooks for multi-class output mask : ",((performance.now()-C)/1e3).toFixed(4)+"  Seconds"),me(u,H,oa),b("",-1,"",u),Q==null){const ta="slice_3d_mask failed ...";return b(ta,-1,ta),0}else if(console.log("--- pre-model done ---"),e){if(!d.enableSeqConv){const ta=[1,...a.shape],na=ye(l,ta);console.log(`Proactive Memory Check (Phase 1): Estimated Max Tensor Size: ${na} elements`),Ze(na)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),d.enableSeqConv=!0)}return yield te(o,d,l,a,Q,u,v,b,P),0}else window.alert("inferenceSubVolumes() is not dead code?")}M++})},G)}catch(C){b(C.message,-1,C.message),console.log('If webgl context is lost, try to restore webgl context by visit the link <a href="https://support.biodigital.com/hc/en-us/articles/218322977-How-to-turn-on-WebGL-in-my-browser">here</a>')}}else console.log("--- No pre-model is selected ---"),console.log("------ Run voxel cropping ------"),e?te(o,d,l,a,null,u,v,b,P):window.alert("inferenceSubVolumes() is not dead code?")})}function bl(l=!0){return D(this,null,function*(){yield Lt(),Wa().set("DEBUG",!1),Wa().set("WEBGL_FORCE_F16_TEXTURES",l),Wa().set("WEBGL_DELETE_TEXTURE_THRESHOLD",-1),yield Bt(),console.log("tf env() flags :",Wa().flags),console.log("tf env() features :",Wa().features),console.log("tf env total features: ",Object.keys(Wa().features).length),console.log($e())})}function pl(l,a,t,r,n,e){return D(this,null,function*(){const d=a.enableSeqConv?ee.WEBGL_SEQUENTIAL:ee.WEBGL_MAIN,u=Je(a,d);e("Segmentation started",0),performance.now();const o=l.batchSize,v=l.numOfChan;if(isNaN(o)||o!==1){const x="The batch Size for input shape must be 1";return e(x,-1,x),0}if(isNaN(v)||v!==1){const x="The number of channels for input shape must be 1";return e(x,-1,x),0}Ta().startScope(),console.log("Batch size: ",o),console.log("Num of Channels: ",v);const b=yield He(l.rootURL+a.path),P=!a.forceFP32;yield bl(P),u.TF_Backend=$e();const g=b;yield dl(u,g,g.layers[0].batchInputShape,yield ae(g),Xe,je);let y=[];if(y=g.layers[0].batchInputShape,console.log(" Model batch input shape : ",y),y.length!==5){const x="The model input shape must be 5D";return e(x,-1,x),0}let c,U,w;const C=t.dims[1],T=t.dims[2],B=t.dims[3];if(yield ae(g)){if(console.log("Model Channel Last"),isNaN(y[4])||y[4]!==1){const x="The number of channels for input shape must be 1";return e(x,-1,x),0}c=y[1],U=y[2],w=y[3]}else{if(console.log("Model Channel First"),isNaN(y[1])||y[1]!==1){const x="The number of channels for input shape must be 1";return e(x,-1,x),0}c=y[2],U=y[3],w=y[4]}let F;c===256&&U===256&&w===256?F=!0:F=!1,u.isModelFullVol=F;let j=yield ol(B,t,r);const i=a.enableTranspose,A=a.enableCrop;if(F)if(A)yield gl(b,j,B,T,C,F,a,u,l,n,e,r);else{console.log("Cropping Disabled"),i?(j=j.transpose(),console.log("Input transposed")):console.log("Transpose NOT Enabled");let x=a.enableSeqConv;if(!x){const m=[1,...j.shape],p=ye(b,m);console.log(`Proactive Memory Check: Estimated Max Tensor Size: ${p} elements`),Ze(p)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),x=!0,a.enableSeqConv=!0)}x?(console.log("Seq Convoluton Enabled"),te(l,a,b,j,null,u,n,e,r)):(console.log("Seq Convoluton Disabled"),te(l,a,b,j,null,u,n,e,r))}})}const hl=(()=>{const l=(i,A)=>i.subarray(...A.data_offsets),a=i=>{const A=Number(new DataView(i.buffer).getBigUint64(0,!0)),x=JSON.parse(new TextDecoder("utf8").decode(i.subarray(8,8+A)));return Object.fromEntries(Object.entries(x).filter(([m,p])=>m!=="__metadata__").map(([m,p])=>[m,Ea(Ca({},p),{data_offsets:p.data_offsets.map(G=>8+A+G)})]))},t=(i,A)=>i.createBuffer({size:A,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),r=i=>{const x=i.createBuffer({mappedAtCreation:!0,size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});return new Float32Array(x.getMappedRange())[0]=1/0,x.unmap(),x},n=(i,A,x)=>{const m=Math.ceil(A/4)*4,p=i.createBuffer({size:m,usage:GPUBufferUsage.STORAGE,mappedAtCreation:!0});return new Uint8Array(p.getMappedRange()).set(x),p.unmap(),p},e=(i,A,x,m,p,G,M)=>{const N=i.createBindGroup({layout:m,entries:[{binding:0,resource:{buffer:p}},...G.map((W,I)=>({binding:I+1,resource:{buffer:W}}))]}),L=A.beginComputePass();L.setPipeline(x),L.setBindGroup(0,N),L.dispatchWorkgroups(...M),L.end()},d=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_16777216:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_432:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>((gidx0&3));
  var alu0 = (lidx1+bitcast<i32>((cast1<<4u)));
  var alu1 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((bitcast<u32>((gidx0>>2u))<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast1<<6u)));
  var alu2 = (gidx0<120);
  var alu3 = (alu0<60);
  var alu4 = (3<alu0);
  var alu5 = (7<gidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 3; Ridx0++) {
    var cast2 = bitcast<u32>(Ridx0);
    var alu22 = (gidx1+bitcast<i32>((cast2<<4u)));
    var alu23 = (alu1+cast0+bitcast<i32>((cast2<<20u)));
    var alu24 = ((15<alu22)&(alu22<272));
    var alu25 = (alu4&alu5&alu24);
    var val0 = select((f16(0.0f)), data1_16777216[(alu23+-1052688)], alu25);
    var alu26 = ((gidx2*108)+(Ridx0*9));
    var val1 = data2_432[(alu26+1)];
    var val2 = data2_432[(alu26+2)];
    var val3 = data2_432[alu26];
    var val4 = select((f16(0.0f)), data1_16777216[(alu23+-1052686)], alu25);
    var val5 = select((f16(0.0f)), data1_16777216[(alu23+-1052685)], alu25);
    var alu27 = (alu5&alu24);
    var val6 = select((f16(0.0f)), data1_16777216[(alu23+-1052672)], alu27);
    var val7 = select((f16(0.0f)), data1_16777216[(alu23+-1052670)], alu27);
    var val8 = select((f16(0.0f)), data1_16777216[(alu23+-1052669)], alu27);
    var alu28 = (alu3&alu5&alu24);
    var val9 = select((f16(0.0f)), data1_16777216[(alu23+-1052656)], alu28);
    var val10 = select((f16(0.0f)), data1_16777216[(alu23+-1052654)], alu28);
    var val11 = select((f16(0.0f)), data1_16777216[(alu23+-1052653)], alu28);
    var alu29 = (alu4&alu24);
    var val12 = select((f16(0.0f)), data1_16777216[(alu23+-1048592)], alu29);
    var val13 = data2_432[(alu26+3)];
    var val14 = select((f16(0.0f)), data1_16777216[(alu23+-1048590)], alu29);
    var val15 = select((f16(0.0f)), data1_16777216[(alu23+-1048589)], alu29);
    var val16 = select((f16(0.0f)), data1_16777216[(alu23+-1048576)], alu24);
    var val17 = data2_432[(alu26+4)];
    var val18 = select((f16(0.0f)), data1_16777216[(alu23+-1048574)], alu24);
    var val19 = select((f16(0.0f)), data1_16777216[(alu23+-1048573)], alu24);
    var alu30 = (alu3&alu24);
    var val20 = select((f16(0.0f)), data1_16777216[(alu23+-1048560)], alu30);
    var val21 = data2_432[(alu26+5)];
    var val22 = select((f16(0.0f)), data1_16777216[(alu23+-1048558)], alu30);
    var val23 = select((f16(0.0f)), data1_16777216[(alu23+-1048557)], alu30);
    var alu31 = (alu4&alu2&alu24);
    var val24 = select((f16(0.0f)), data1_16777216[(alu23+-1044496)], alu31);
    var val25 = data2_432[(alu26+6)];
    var val26 = select((f16(0.0f)), data1_16777216[(alu23+-1044494)], alu31);
    var val27 = select((f16(0.0f)), data1_16777216[(alu23+-1044493)], alu31);
    var alu32 = (alu2&alu24);
    var val28 = select((f16(0.0f)), data1_16777216[(alu23+-1044480)], alu32);
    var val29 = data2_432[(alu26+7)];
    var val30 = select((f16(0.0f)), data1_16777216[(alu23+-1044478)], alu32);
    var val31 = select((f16(0.0f)), data1_16777216[(alu23+-1044477)], alu32);
    var alu33 = (alu3&alu2&alu24);
    var val32 = select((f16(0.0f)), data1_16777216[(alu23+-1044464)], alu33);
    var val33 = data2_432[(alu26+8)];
    var val34 = data2_432[(alu26+27)];
    var val35 = data2_432[(alu26+28)];
    var val36 = data2_432[(alu26+29)];
    var val37 = data2_432[(alu26+30)];
    var val38 = data2_432[(alu26+31)];
    var val39 = data2_432[(alu26+32)];
    var val40 = data2_432[(alu26+33)];
    var val41 = data2_432[(alu26+34)];
    var val42 = data2_432[(alu26+35)];
    var val43 = data2_432[(alu26+54)];
    var val44 = data2_432[(alu26+55)];
    var val45 = data2_432[(alu26+56)];
    var val46 = data2_432[(alu26+57)];
    var val47 = data2_432[(alu26+58)];
    var val48 = data2_432[(alu26+59)];
    var val49 = data2_432[(alu26+60)];
    var val50 = data2_432[(alu26+61)];
    var val51 = data2_432[(alu26+62)];
    var val52 = data2_432[(alu26+81)];
    var val53 = data2_432[(alu26+82)];
    var val54 = data2_432[(alu26+83)];
    var val55 = data2_432[(alu26+84)];
    var val56 = data2_432[(alu26+85)];
    var val57 = data2_432[(alu26+86)];
    var val58 = data2_432[(alu26+87)];
    var val59 = data2_432[(alu26+88)];
    var val60 = data2_432[(alu26+89)];
    var val61 = select((f16(0.0f)), data1_16777216[(alu23+-1052687)], alu25);
    var val62 = select((f16(0.0f)), data1_16777216[(alu23+-1052671)], alu27);
    var val63 = select((f16(0.0f)), data1_16777216[(alu23+-1052655)], alu28);
    var val64 = select((f16(0.0f)), data1_16777216[(alu23+-1048591)], alu29);
    var val65 = select((f16(0.0f)), data1_16777216[(alu23+-1048575)], alu24);
    var val66 = select((f16(0.0f)), data1_16777216[(alu23+-1048559)], alu30);
    var val67 = select((f16(0.0f)), data1_16777216[(alu23+-1044495)], alu31);
    var val68 = select((f16(0.0f)), data1_16777216[(alu23+-1044479)], alu32);
    var val69 = select((f16(0.0f)), data1_16777216[(alu23+-1044463)], alu33);
    var val70 = select((f16(0.0f)), data1_16777216[(alu23+-1044462)], alu33);
    var val71 = select((f16(0.0f)), data1_16777216[(alu23+-1044461)], alu33);
    acc0[0] = (acc0[0]+(f32((val0*val3)))+(f32((val6*val1)))+(f32((val9*val2)))+(f32((val12*val13)))+(f32((val16*val17)))+(f32((val20*val21)))+(f32((val24*val25)))+(f32((val28*val29)))+(f32((val32*val33))));
    acc0[1] = (acc0[1]+(f32((val0*val34)))+(f32((val6*val35)))+(f32((val9*val36)))+(f32((val12*val37)))+(f32((val16*val38)))+(f32((val20*val39)))+(f32((val24*val40)))+(f32((val28*val41)))+(f32((val32*val42))));
    acc0[2] = (acc0[2]+(f32((val0*val43)))+(f32((val6*val44)))+(f32((val9*val45)))+(f32((val12*val46)))+(f32((val16*val47)))+(f32((val20*val48)))+(f32((val24*val49)))+(f32((val28*val50)))+(f32((val32*val51))));
    acc0[3] = (acc0[3]+(f32((val0*val52)))+(f32((val6*val53)))+(f32((val9*val54)))+(f32((val12*val55)))+(f32((val16*val56)))+(f32((val20*val57)))+(f32((val24*val58)))+(f32((val28*val59)))+(f32((val32*val60))));
    acc0[4] = (acc0[4]+(f32((val61*val3)))+(f32((val62*val1)))+(f32((val63*val2)))+(f32((val64*val13)))+(f32((val65*val17)))+(f32((val66*val21)))+(f32((val67*val25)))+(f32((val68*val29)))+(f32((val69*val33))));
    acc0[5] = (acc0[5]+(f32((val61*val34)))+(f32((val62*val35)))+(f32((val63*val36)))+(f32((val64*val37)))+(f32((val65*val38)))+(f32((val66*val39)))+(f32((val67*val40)))+(f32((val68*val41)))+(f32((val69*val42))));
    acc0[6] = (acc0[6]+(f32((val61*val43)))+(f32((val62*val44)))+(f32((val63*val45)))+(f32((val64*val46)))+(f32((val65*val47)))+(f32((val66*val48)))+(f32((val67*val49)))+(f32((val68*val50)))+(f32((val69*val51))));
    acc0[7] = (acc0[7]+(f32((val61*val52)))+(f32((val62*val53)))+(f32((val63*val54)))+(f32((val64*val55)))+(f32((val65*val56)))+(f32((val66*val57)))+(f32((val67*val58)))+(f32((val68*val59)))+(f32((val69*val60))));
    acc0[8] = (acc0[8]+(f32((val4*val3)))+(f32((val7*val1)))+(f32((val10*val2)))+(f32((val14*val13)))+(f32((val18*val17)))+(f32((val22*val21)))+(f32((val26*val25)))+(f32((val30*val29)))+(f32((val70*val33))));
    acc0[9] = (acc0[9]+(f32((val4*val34)))+(f32((val7*val35)))+(f32((val10*val36)))+(f32((val14*val37)))+(f32((val18*val38)))+(f32((val22*val39)))+(f32((val26*val40)))+(f32((val30*val41)))+(f32((val70*val42))));
    acc0[10] = (acc0[10]+(f32((val4*val43)))+(f32((val7*val44)))+(f32((val10*val45)))+(f32((val14*val46)))+(f32((val18*val47)))+(f32((val22*val48)))+(f32((val26*val49)))+(f32((val30*val50)))+(f32((val70*val51))));
    acc0[11] = (acc0[11]+(f32((val4*val52)))+(f32((val7*val53)))+(f32((val10*val54)))+(f32((val14*val55)))+(f32((val18*val56)))+(f32((val22*val57)))+(f32((val26*val58)))+(f32((val30*val59)))+(f32((val70*val60))));
    acc0[12] = (acc0[12]+(f32((val5*val3)))+(f32((val8*val1)))+(f32((val11*val2)))+(f32((val15*val13)))+(f32((val19*val17)))+(f32((val23*val21)))+(f32((val27*val25)))+(f32((val31*val29)))+(f32((val71*val33))));
    acc0[13] = (acc0[13]+(f32((val5*val34)))+(f32((val8*val35)))+(f32((val11*val36)))+(f32((val15*val37)))+(f32((val19*val38)))+(f32((val23*val39)))+(f32((val27*val40)))+(f32((val31*val41)))+(f32((val71*val42))));
    acc0[14] = (acc0[14]+(f32((val5*val43)))+(f32((val8*val44)))+(f32((val11*val45)))+(f32((val15*val46)))+(f32((val19*val47)))+(f32((val23*val48)))+(f32((val27*val49)))+(f32((val31*val50)))+(f32((val71*val51))));
    acc0[15] = (acc0[15]+(f32((val5*val52)))+(f32((val8*val53)))+(f32((val11*val54)))+(f32((val15*val55)))+(f32((val19*val56)))+(f32((val23*val57)))+(f32((val27*val58)))+(f32((val31*val59)))+(f32((val71*val60))));
  }
  var alu51 = (alu1+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu51] = (f16(acc0[0]));
  data0_268435456[(alu51+1)] = (f16(acc0[4]));
  data0_268435456[(alu51+2)] = (f16(acc0[8]));
  data0_268435456[(alu51+3)] = (f16(acc0[12]));
  data0_268435456[(alu51+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu51+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu51+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu51+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu51+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu51+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu51+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu51+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu51+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu51+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu51+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu51+50331651)] = (f16(acc0[15]));
}`,u=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_1048576:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,4>;
  var gidx0 = i32(gindex.x); /* 8192 */
  var lidx0 = i32(lindex.x); /* 32 */
  var cast0 = bitcast<u32>(gidx0);
  var cast1 = bitcast<u32>(lidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 64; Ridx0++) {
    var alu4 = (bitcast<i32>((cast0<<15u))+bitcast<i32>((cast1<<10u))+bitcast<i32>((bitcast<u32>(Ridx0)<<2u)));
    var val0 = data1_268435456[alu4];
    var val1 = data1_268435456[(alu4+1)];
    var val2 = data1_268435456[(alu4+2)];
    var val3 = data1_268435456[(alu4+3)];
    var val4 = data1_268435456[(alu4+256)];
    var val5 = data1_268435456[(alu4+257)];
    var val6 = data1_268435456[(alu4+258)];
    var val7 = data1_268435456[(alu4+259)];
    var val8 = data1_268435456[(alu4+512)];
    var val9 = data1_268435456[(alu4+513)];
    var val10 = data1_268435456[(alu4+514)];
    var val11 = data1_268435456[(alu4+515)];
    var val12 = data1_268435456[(alu4+768)];
    var val13 = data1_268435456[(alu4+769)];
    var val14 = data1_268435456[(alu4+770)];
    var val15 = data1_268435456[(alu4+771)];
    acc0[0] = (acc0[0]+(f32(val0))+(f32(val1))+(f32(val2))+(f32(val3)));
    acc0[1] = (acc0[1]+(f32(val4))+(f32(val5))+(f32(val6))+(f32(val7)));
    acc0[2] = (acc0[2]+(f32(val8))+(f32(val9))+(f32(val10))+(f32(val11)));
    acc0[3] = (acc0[3]+(f32(val12))+(f32(val13))+(f32(val14))+(f32(val15)));
  }
  var alu10 = (bitcast<i32>((cast0<<7u))+bitcast<i32>((cast1<<2u)));
  data0_1048576[alu10] = acc0[0];
  data0_1048576[(alu10+1)] = acc0[1];
  data0_1048576[(alu10+2)] = acc0[2];
  data0_1048576[(alu10+3)] = acc0[3];
}`,o=`fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_4096:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_1048576:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,4>;
  var gidx0 = i32(gindex.x); /* 32 */
  var lidx0 = i32(lindex.x); /* 32 */
  var cast0 = bitcast<u32>(gidx0);
  var cast1 = bitcast<u32>(lidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 64; Ridx0++) {
    var alu4 = (bitcast<i32>((cast0<<15u))+bitcast<i32>((cast1<<10u))+bitcast<i32>((bitcast<u32>(Ridx0)<<2u)));
    var val0 = data1_1048576[alu4];
    var val1 = data1_1048576[(alu4+1)];
    var val2 = data1_1048576[(alu4+2)];
    var val3 = data1_1048576[(alu4+3)];
    var val4 = data1_1048576[(alu4+256)];
    var val5 = data1_1048576[(alu4+257)];
    var val6 = data1_1048576[(alu4+258)];
    var val7 = data1_1048576[(alu4+259)];
    var val8 = data1_1048576[(alu4+512)];
    var val9 = data1_1048576[(alu4+513)];
    var val10 = data1_1048576[(alu4+514)];
    var val11 = data1_1048576[(alu4+515)];
    var val12 = data1_1048576[(alu4+768)];
    var val13 = data1_1048576[(alu4+769)];
    var val14 = data1_1048576[(alu4+770)];
    var val15 = data1_1048576[(alu4+771)];
    acc0[0] = (acc0[0]+val0+val1+val2+val3);
    acc0[1] = (acc0[1]+val4+val5+val6+val7);
    acc0[2] = (acc0[2]+val8+val9+val10+val11);
    acc0[3] = (acc0[3]+val12+val13+val14+val15);
  }
  var alu10 = (bitcast<i32>((cast0<<7u))+bitcast<i32>((cast1<<2u)));
  data0_4096[alu10] = acc0[0];
  data0_4096[(alu10+1)] = acc0[1];
  data0_4096[(alu10+2)] = acc0[2];
  data0_4096[(alu10+3)] = acc0[3];
}`,v=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32,16>;
@group(0) @binding(1)var<storage,read_write>data0_16:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_4096:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,1>;
  var acc1: array<f32,1>;
  var gidx0 = i32(gindex.x); /* 16 */
  var lidx0 = i32(lindex.x); /* 16 */
  acc0[0] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data1_4096[(bitcast<i32>((bitcast<u32>(lidx0)<<4u))+Ridx0+bitcast<i32>((bitcast<u32>(gidx0)<<8u)))];
    acc0[0] = (acc0[0]+val0);
  }
  temp0[lidx0] = acc0[0];
  workgroupBarrier();
  acc1[0] = 0.0f;
  for (var Ridx102 = 0; Ridx102 < 16; Ridx102++) {
    var val1 = temp0[Ridx102];
    acc1[0] = (acc1[0]+val1);
  }
  var alu8 = ((bool(lidx0))!=true);
  if (alu8) {
    data0_16[gidx0] = (f32((f16((acc1[0]*5.960464477539063e-08f)))));
  }
}`,b=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_1048576:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,4>;
  var gidx1 = i32(gindex.y); /* 2 */
  var lidx0 = i32(lindex.x); /* 8 */
  var cast0 = bitcast<u32>(gidx1);
  var val0 = data2_16[(lidx0+bitcast<i32>((cast0<<3u)))];
  var gidx0 = i32(gindex.x); /* 1024 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast1 = (f16(val0));
  var cast2 = bitcast<u32>(gidx0);
  var cast3 = bitcast<u32>(lidx0);
  var cast4 = bitcast<u32>(lidx1);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 64; Ridx0++) {
    var alu4 = (bitcast<i32>((cast2<<14u))+bitcast<i32>((cast4<<10u))+bitcast<i32>((bitcast<u32>(Ridx0)<<2u))+bitcast<i32>((cast0<<27u))+bitcast<i32>((cast3<<24u)));
    var val1 = data1_268435456[alu4];
    var val2 = data1_268435456[(alu4+1)];
    var val3 = data1_268435456[(alu4+2)];
    var val4 = data1_268435456[(alu4+3)];
    var val5 = data1_268435456[(alu4+256)];
    var val6 = data1_268435456[(alu4+257)];
    var val7 = data1_268435456[(alu4+258)];
    var val8 = data1_268435456[(alu4+259)];
    var val9 = data1_268435456[(alu4+512)];
    var val10 = data1_268435456[(alu4+513)];
    var val11 = data1_268435456[(alu4+514)];
    var val12 = data1_268435456[(alu4+515)];
    var val13 = data1_268435456[(alu4+768)];
    var val14 = data1_268435456[(alu4+769)];
    var val15 = data1_268435456[(alu4+770)];
    var val16 = data1_268435456[(alu4+771)];
    var alu5 = (val1-cast1);
    var alu6 = (val2-cast1);
    var alu7 = (val3-cast1);
    var alu8 = (val4-cast1);
    var alu9 = (val5-cast1);
    var alu10 = (val6-cast1);
    var alu11 = (val7-cast1);
    var alu12 = (val8-cast1);
    var alu13 = (val9-cast1);
    var alu14 = (val10-cast1);
    var alu15 = (val11-cast1);
    var alu16 = (val12-cast1);
    var alu17 = (val13-cast1);
    var alu18 = (val14-cast1);
    var alu19 = (val15-cast1);
    var alu20 = (val16-cast1);
    acc0[0] = (acc0[0]+(f32((alu5*alu5)))+(f32((alu6*alu6)))+(f32((alu7*alu7)))+(f32((alu8*alu8))));
    acc0[1] = (acc0[1]+(f32((alu9*alu9)))+(f32((alu10*alu10)))+(f32((alu11*alu11)))+(f32((alu12*alu12))));
    acc0[2] = (acc0[2]+(f32((alu13*alu13)))+(f32((alu14*alu14)))+(f32((alu15*alu15)))+(f32((alu16*alu16))));
    acc0[3] = (acc0[3]+(f32((alu17*alu17)))+(f32((alu18*alu18)))+(f32((alu19*alu19)))+(f32((alu20*alu20))));
  }
  var alu26 = (bitcast<i32>((cast2<<6u))+bitcast<i32>((cast4<<2u))+bitcast<i32>((cast0<<19u))+bitcast<i32>((cast3<<16u)));
  data0_1048576[alu26] = acc0[0];
  data0_1048576[(alu26+1)] = acc0[1];
  data0_1048576[(alu26+2)] = acc0[2];
  data0_1048576[(alu26+3)] = acc0[3];
}`,P=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32,16>;
@group(0) @binding(1)var<storage,read_write>data0_16:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_4096:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,1>;
  var acc1: array<f32,1>;
  var gidx0 = i32(gindex.x); /* 16 */
  var lidx0 = i32(lindex.x); /* 16 */
  acc0[0] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data1_4096[(bitcast<i32>((bitcast<u32>(lidx0)<<4u))+Ridx0+bitcast<i32>((bitcast<u32>(gidx0)<<8u)))];
    acc0[0] = (acc0[0]+val0);
  }
  temp0[lidx0] = acc0[0];
  workgroupBarrier();
  acc1[0] = 0.0f;
  for (var Ridx102 = 0; Ridx102 < 16; Ridx102++) {
    var val1 = temp0[Ridx102];
    acc1[0] = (acc1[0]+val1);
  }
  var alu8 = ((bool(lidx0))!=true);
  if (alu8) {
    data0_16[gidx0] = (f32((1/sqrt(((f16((acc1[0]*5.960464477539063e-08f)))+(f16(1e-05f)))))));
  }
}`,g=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>((gidx0&3));
  var alu0 = (lidx1+bitcast<i32>((cast1<<4u)));
  var alu1 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((bitcast<u32>((gidx0>>2u))<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast1<<6u)));
  var alu2 = (gidx0<124);
  var alu3 = (alu0<62);
  var alu4 = (1<alu0);
  var alu5 = (3<gidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast2 = (f16(val0));
    var cast3 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var cast4 = bitcast<u32>(Ridx1);
      var alu22 = (gidx1+bitcast<i32>((cast4<<3u)));
      var alu23 = (alu1+cast0+bitcast<i32>((cast4<<19u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu24 = ((7<alu22)&(alu22<264));
      var alu25 = (alu4&alu5&alu24);
      var val2 = select((f16(0.0f)), data1_268435456[(alu23+-526344)], alu25);
      var alu26 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[alu26];
      var alu27 = (alu5&alu24);
      var val4 = select((f16(0.0f)), data1_268435456[(alu23+-526336)], alu27);
      var val5 = data4_6912[(alu26+1)];
      var alu28 = (alu3&alu5&alu24);
      var val6 = select((f16(0.0f)), data1_268435456[(alu23+-526328)], alu28);
      var val7 = data4_6912[(alu26+2)];
      var alu29 = (alu4&alu24);
      var val8 = select((f16(0.0f)), data1_268435456[(alu23+-524296)], alu29);
      var val9 = data4_6912[(alu26+3)];
      var val10 = select((f16(0.0f)), data1_268435456[(alu23+-524288)], alu24);
      var val11 = data4_6912[(alu26+4)];
      var alu30 = (alu3&alu24);
      var val12 = select((f16(0.0f)), data1_268435456[(alu23+-524280)], alu30);
      var val13 = data4_6912[(alu26+5)];
      var alu31 = (alu4&alu2&alu24);
      var val14 = select((f16(0.0f)), data1_268435456[(alu23+-522248)], alu31);
      var val15 = data4_6912[(alu26+6)];
      var alu32 = (alu2&alu24);
      var val16 = select((f16(0.0f)), data1_268435456[(alu23+-522240)], alu32);
      var val17 = data4_6912[(alu26+7)];
      var alu33 = (alu3&alu2&alu24);
      var val18 = select((f16(0.0f)), data1_268435456[(alu23+-522232)], alu33);
      var val19 = data4_6912[(alu26+8)];
      var val20 = data4_6912[(alu26+432)];
      var val21 = data4_6912[(alu26+433)];
      var val22 = data4_6912[(alu26+434)];
      var val23 = data4_6912[(alu26+435)];
      var val24 = data4_6912[(alu26+436)];
      var val25 = data4_6912[(alu26+437)];
      var val26 = data4_6912[(alu26+438)];
      var val27 = data4_6912[(alu26+439)];
      var val28 = data4_6912[(alu26+440)];
      var val29 = data4_6912[(alu26+864)];
      var val30 = data4_6912[(alu26+865)];
      var val31 = data4_6912[(alu26+866)];
      var val32 = data4_6912[(alu26+867)];
      var val33 = data4_6912[(alu26+868)];
      var val34 = data4_6912[(alu26+869)];
      var val35 = data4_6912[(alu26+870)];
      var val36 = data4_6912[(alu26+871)];
      var val37 = data4_6912[(alu26+872)];
      var val38 = data4_6912[(alu26+1296)];
      var val39 = data4_6912[(alu26+1297)];
      var val40 = data4_6912[(alu26+1298)];
      var val41 = data4_6912[(alu26+1299)];
      var val42 = data4_6912[(alu26+1300)];
      var val43 = data4_6912[(alu26+1301)];
      var val44 = data4_6912[(alu26+1302)];
      var val45 = data4_6912[(alu26+1303)];
      var val46 = data4_6912[(alu26+1304)];
      var val47 = select((f16(0.0f)), data1_268435456[(alu23+-526343)], alu25);
      var val48 = select((f16(0.0f)), data1_268435456[(alu23+-526342)], alu25);
      var val49 = select((f16(0.0f)), data1_268435456[(alu23+-526341)], alu25);
      var val50 = select((f16(0.0f)), data1_268435456[(alu23+-526335)], alu27);
      var val51 = select((f16(0.0f)), data1_268435456[(alu23+-526334)], alu27);
      var val52 = select((f16(0.0f)), data1_268435456[(alu23+-526333)], alu27);
      var val53 = select((f16(0.0f)), data1_268435456[(alu23+-526327)], alu28);
      var val54 = select((f16(0.0f)), data1_268435456[(alu23+-526326)], alu28);
      var val55 = select((f16(0.0f)), data1_268435456[(alu23+-526325)], alu28);
      var val56 = select((f16(0.0f)), data1_268435456[(alu23+-524295)], alu29);
      var val57 = select((f16(0.0f)), data1_268435456[(alu23+-524294)], alu29);
      var val58 = select((f16(0.0f)), data1_268435456[(alu23+-524293)], alu29);
      var val59 = select((f16(0.0f)), data1_268435456[(alu23+-524287)], alu24);
      var val60 = select((f16(0.0f)), data1_268435456[(alu23+-524286)], alu24);
      var val61 = select((f16(0.0f)), data1_268435456[(alu23+-524285)], alu24);
      var val62 = select((f16(0.0f)), data1_268435456[(alu23+-524279)], alu30);
      var val63 = select((f16(0.0f)), data1_268435456[(alu23+-524278)], alu30);
      var val64 = select((f16(0.0f)), data1_268435456[(alu23+-524277)], alu30);
      var val65 = select((f16(0.0f)), data1_268435456[(alu23+-522247)], alu31);
      var val66 = select((f16(0.0f)), data1_268435456[(alu23+-522246)], alu31);
      var val67 = select((f16(0.0f)), data1_268435456[(alu23+-522245)], alu31);
      var val68 = select((f16(0.0f)), data1_268435456[(alu23+-522239)], alu32);
      var val69 = select((f16(0.0f)), data1_268435456[(alu23+-522238)], alu32);
      var val70 = select((f16(0.0f)), data1_268435456[(alu23+-522237)], alu32);
      var val71 = select((f16(0.0f)), data1_268435456[(alu23+-522231)], alu33);
      var val72 = select((f16(0.0f)), data1_268435456[(alu23+-522230)], alu33);
      var val73 = select((f16(0.0f)), data1_268435456[(alu23+-522229)], alu33);
      var alu34 = ((val10-cast2)*cast3);
      var alu35 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu34+((f16(0.044715f))*alu34*alu34*alu34))*(f16(-2.302208198144325f))))))*alu34),alu24);
      var alu36 = ((val59-cast2)*cast3);
      var alu37 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu36+((f16(0.044715f))*alu36*alu36*alu36))*(f16(-2.302208198144325f))))))*alu36),alu24);
      var alu38 = ((val60-cast2)*cast3);
      var alu39 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu38+((f16(0.044715f))*alu38*alu38*alu38))*(f16(-2.302208198144325f))))))*alu38),alu24);
      var alu40 = ((val61-cast2)*cast3);
      var alu41 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu40+((f16(0.044715f))*alu40*alu40*alu40))*(f16(-2.302208198144325f))))))*alu40),alu24);
      var alu42 = ((val16-cast2)*cast3);
      var alu43 = (alu24&alu2);
      var alu44 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu42+((f16(0.044715f))*alu42*alu42*alu42))*(f16(-2.302208198144325f))))))*alu42),alu43);
      var alu45 = ((val68-cast2)*cast3);
      var alu46 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu45+((f16(0.044715f))*alu45*alu45*alu45))*(f16(-2.302208198144325f))))))*alu45),alu43);
      var alu47 = ((val69-cast2)*cast3);
      var alu48 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu47+((f16(0.044715f))*alu47*alu47*alu47))*(f16(-2.302208198144325f))))))*alu47),alu43);
      var alu49 = ((val70-cast2)*cast3);
      var alu50 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu49+((f16(0.044715f))*alu49*alu49*alu49))*(f16(-2.302208198144325f))))))*alu49),alu43);
      var alu51 = ((val12-cast2)*cast3);
      var alu52 = (alu24&alu3);
      var alu53 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu51+((f16(0.044715f))*alu51*alu51*alu51))*(f16(-2.302208198144325f))))))*alu51),alu52);
      var alu54 = ((val62-cast2)*cast3);
      var alu55 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu54+((f16(0.044715f))*alu54*alu54*alu54))*(f16(-2.302208198144325f))))))*alu54),alu52);
      var alu56 = ((val63-cast2)*cast3);
      var alu57 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu56+((f16(0.044715f))*alu56*alu56*alu56))*(f16(-2.302208198144325f))))))*alu56),alu52);
      var alu58 = ((val64-cast2)*cast3);
      var alu59 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu58+((f16(0.044715f))*alu58*alu58*alu58))*(f16(-2.302208198144325f))))))*alu58),alu52);
      var alu60 = ((val8-cast2)*cast3);
      var alu61 = (alu24&alu4);
      var alu62 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu60+((f16(0.044715f))*alu60*alu60*alu60))*(f16(-2.302208198144325f))))))*alu60),alu61);
      var alu63 = ((val56-cast2)*cast3);
      var alu64 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu63+((f16(0.044715f))*alu63*alu63*alu63))*(f16(-2.302208198144325f))))))*alu63),alu61);
      var alu65 = ((val57-cast2)*cast3);
      var alu66 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu65+((f16(0.044715f))*alu65*alu65*alu65))*(f16(-2.302208198144325f))))))*alu65),alu61);
      var alu67 = ((val58-cast2)*cast3);
      var alu68 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu67+((f16(0.044715f))*alu67*alu67*alu67))*(f16(-2.302208198144325f))))))*alu67),alu61);
      var alu69 = ((val4-cast2)*cast3);
      var alu70 = (alu24&alu5);
      var alu71 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu69+((f16(0.044715f))*alu69*alu69*alu69))*(f16(-2.302208198144325f))))))*alu69),alu70);
      var alu72 = ((val50-cast2)*cast3);
      var alu73 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu72+((f16(0.044715f))*alu72*alu72*alu72))*(f16(-2.302208198144325f))))))*alu72),alu70);
      var alu74 = ((val51-cast2)*cast3);
      var alu75 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu74+((f16(0.044715f))*alu74*alu74*alu74))*(f16(-2.302208198144325f))))))*alu74),alu70);
      var alu76 = ((val52-cast2)*cast3);
      var alu77 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu76+((f16(0.044715f))*alu76*alu76*alu76))*(f16(-2.302208198144325f))))))*alu76),alu70);
      var alu78 = ((val18-cast2)*cast3);
      var alu79 = (alu43&alu3);
      var alu80 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu78+((f16(0.044715f))*alu78*alu78*alu78))*(f16(-2.302208198144325f))))))*alu78),alu79);
      var alu81 = ((val71-cast2)*cast3);
      var alu82 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu81+((f16(0.044715f))*alu81*alu81*alu81))*(f16(-2.302208198144325f))))))*alu81),alu79);
      var alu83 = ((val72-cast2)*cast3);
      var alu84 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu83+((f16(0.044715f))*alu83*alu83*alu83))*(f16(-2.302208198144325f))))))*alu83),alu79);
      var alu85 = ((val73-cast2)*cast3);
      var alu86 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu85+((f16(0.044715f))*alu85*alu85*alu85))*(f16(-2.302208198144325f))))))*alu85),alu79);
      var alu87 = ((val14-cast2)*cast3);
      var alu88 = (alu43&alu4);
      var alu89 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu87+((f16(0.044715f))*alu87*alu87*alu87))*(f16(-2.302208198144325f))))))*alu87),alu88);
      var alu90 = ((val65-cast2)*cast3);
      var alu91 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu90+((f16(0.044715f))*alu90*alu90*alu90))*(f16(-2.302208198144325f))))))*alu90),alu88);
      var alu92 = ((val66-cast2)*cast3);
      var alu93 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu92+((f16(0.044715f))*alu92*alu92*alu92))*(f16(-2.302208198144325f))))))*alu92),alu88);
      var alu94 = ((val67-cast2)*cast3);
      var alu95 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu94+((f16(0.044715f))*alu94*alu94*alu94))*(f16(-2.302208198144325f))))))*alu94),alu88);
      var alu96 = ((val6-cast2)*cast3);
      var alu97 = (alu70&alu3);
      var alu98 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu96+((f16(0.044715f))*alu96*alu96*alu96))*(f16(-2.302208198144325f))))))*alu96),alu97);
      var alu99 = ((val53-cast2)*cast3);
      var alu100 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu99+((f16(0.044715f))*alu99*alu99*alu99))*(f16(-2.302208198144325f))))))*alu99),alu97);
      var alu101 = ((val54-cast2)*cast3);
      var alu102 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu101+((f16(0.044715f))*alu101*alu101*alu101))*(f16(-2.302208198144325f))))))*alu101),alu97);
      var alu103 = ((val55-cast2)*cast3);
      var alu104 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu103+((f16(0.044715f))*alu103*alu103*alu103))*(f16(-2.302208198144325f))))))*alu103),alu97);
      var alu105 = ((val2-cast2)*cast3);
      var alu106 = (alu70&alu4);
      var alu107 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu105+((f16(0.044715f))*alu105*alu105*alu105))*(f16(-2.302208198144325f))))))*alu105),alu106);
      var alu108 = ((val47-cast2)*cast3);
      var alu109 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu108+((f16(0.044715f))*alu108*alu108*alu108))*(f16(-2.302208198144325f))))))*alu108),alu106);
      var alu110 = ((val48-cast2)*cast3);
      var alu111 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu110+((f16(0.044715f))*alu110*alu110*alu110))*(f16(-2.302208198144325f))))))*alu110),alu106);
      var alu112 = ((val49-cast2)*cast3);
      var alu113 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu112+((f16(0.044715f))*alu112*alu112*alu112))*(f16(-2.302208198144325f))))))*alu112),alu106);
      acc0[0] = (acc0[0]+(f32((alu107*val3)))+(f32((alu71*val5)))+(f32((alu98*val7)))+(f32((alu62*val9)))+(f32((alu35*val11)))+(f32((alu53*val13)))+(f32((alu89*val15)))+(f32((alu44*val17)))+(f32((alu80*val19))));
      acc0[1] = (acc0[1]+(f32((alu107*val20)))+(f32((alu71*val21)))+(f32((alu98*val22)))+(f32((alu62*val23)))+(f32((alu35*val24)))+(f32((alu53*val25)))+(f32((alu89*val26)))+(f32((alu44*val27)))+(f32((alu80*val28))));
      acc0[2] = (acc0[2]+(f32((alu107*val29)))+(f32((alu71*val30)))+(f32((alu98*val31)))+(f32((alu62*val32)))+(f32((alu35*val33)))+(f32((alu53*val34)))+(f32((alu89*val35)))+(f32((alu44*val36)))+(f32((alu80*val37))));
      acc0[3] = (acc0[3]+(f32((alu107*val38)))+(f32((alu71*val39)))+(f32((alu98*val40)))+(f32((alu62*val41)))+(f32((alu35*val42)))+(f32((alu53*val43)))+(f32((alu89*val44)))+(f32((alu44*val45)))+(f32((alu80*val46))));
      acc0[4] = (acc0[4]+(f32((alu109*val3)))+(f32((alu73*val5)))+(f32((alu100*val7)))+(f32((alu64*val9)))+(f32((alu37*val11)))+(f32((alu55*val13)))+(f32((alu91*val15)))+(f32((alu46*val17)))+(f32((alu82*val19))));
      acc0[5] = (acc0[5]+(f32((alu109*val20)))+(f32((alu73*val21)))+(f32((alu100*val22)))+(f32((alu64*val23)))+(f32((alu37*val24)))+(f32((alu55*val25)))+(f32((alu91*val26)))+(f32((alu46*val27)))+(f32((alu82*val28))));
      acc0[6] = (acc0[6]+(f32((alu109*val29)))+(f32((alu73*val30)))+(f32((alu100*val31)))+(f32((alu64*val32)))+(f32((alu37*val33)))+(f32((alu55*val34)))+(f32((alu91*val35)))+(f32((alu46*val36)))+(f32((alu82*val37))));
      acc0[7] = (acc0[7]+(f32((alu109*val38)))+(f32((alu73*val39)))+(f32((alu100*val40)))+(f32((alu64*val41)))+(f32((alu37*val42)))+(f32((alu55*val43)))+(f32((alu91*val44)))+(f32((alu46*val45)))+(f32((alu82*val46))));
      acc0[8] = (acc0[8]+(f32((alu111*val3)))+(f32((alu75*val5)))+(f32((alu102*val7)))+(f32((alu66*val9)))+(f32((alu39*val11)))+(f32((alu57*val13)))+(f32((alu93*val15)))+(f32((alu48*val17)))+(f32((alu84*val19))));
      acc0[9] = (acc0[9]+(f32((alu111*val20)))+(f32((alu75*val21)))+(f32((alu102*val22)))+(f32((alu66*val23)))+(f32((alu39*val24)))+(f32((alu57*val25)))+(f32((alu93*val26)))+(f32((alu48*val27)))+(f32((alu84*val28))));
      acc0[10] = (acc0[10]+(f32((alu111*val29)))+(f32((alu75*val30)))+(f32((alu102*val31)))+(f32((alu66*val32)))+(f32((alu39*val33)))+(f32((alu57*val34)))+(f32((alu93*val35)))+(f32((alu48*val36)))+(f32((alu84*val37))));
      acc0[11] = (acc0[11]+(f32((alu111*val38)))+(f32((alu75*val39)))+(f32((alu102*val40)))+(f32((alu66*val41)))+(f32((alu39*val42)))+(f32((alu57*val43)))+(f32((alu93*val44)))+(f32((alu48*val45)))+(f32((alu84*val46))));
      acc0[12] = (acc0[12]+(f32((alu113*val3)))+(f32((alu77*val5)))+(f32((alu104*val7)))+(f32((alu68*val9)))+(f32((alu41*val11)))+(f32((alu59*val13)))+(f32((alu95*val15)))+(f32((alu50*val17)))+(f32((alu86*val19))));
      acc0[13] = (acc0[13]+(f32((alu113*val20)))+(f32((alu77*val21)))+(f32((alu104*val22)))+(f32((alu68*val23)))+(f32((alu41*val24)))+(f32((alu59*val25)))+(f32((alu95*val26)))+(f32((alu50*val27)))+(f32((alu86*val28))));
      acc0[14] = (acc0[14]+(f32((alu113*val29)))+(f32((alu77*val30)))+(f32((alu104*val31)))+(f32((alu68*val32)))+(f32((alu41*val33)))+(f32((alu59*val34)))+(f32((alu95*val35)))+(f32((alu50*val36)))+(f32((alu86*val37))));
      acc0[15] = (acc0[15]+(f32((alu113*val38)))+(f32((alu77*val39)))+(f32((alu104*val40)))+(f32((alu68*val41)))+(f32((alu41*val42)))+(f32((alu59*val43)))+(f32((alu95*val44)))+(f32((alu50*val45)))+(f32((alu86*val46))));
    }
  }
  var alu132 = (alu1+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu132] = (f16(acc0[0]));
  data0_268435456[(alu132+1)] = (f16(acc0[4]));
  data0_268435456[(alu132+2)] = (f16(acc0[8]));
  data0_268435456[(alu132+3)] = (f16(acc0[12]));
  data0_268435456[(alu132+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu132+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu132+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu132+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu132+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu132+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu132+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu132+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu132+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu132+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu132+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu132+50331651)] = (f16(acc0[15]));
}`,y=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>((gidx0>>2u));
  var alu0 = (gidx0&3);
  var cast2 = bitcast<u32>(alu0);
  var alu1 = (lidx0+bitcast<i32>((cast1<<3u)));
  var alu2 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((cast1<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast2<<6u)));
  var alu3 = (alu1<252);
  var alu4 = ((lidx1+bitcast<i32>((cast2<<4u)))<63);
  var alu5 = (0<(lidx1+alu0));
  var alu6 = (3<alu1);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast3 = (f16(val0));
    var cast4 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var cast5 = bitcast<u32>(Ridx1);
      var alu23 = (gidx1+bitcast<i32>((cast5<<2u)));
      var alu24 = (alu2+cast0+bitcast<i32>((cast5<<18u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu25 = ((3<alu23)&(alu23<260));
      var alu26 = (alu5&alu6&alu25);
      var val2 = select((f16(0.0f)), data1_268435456[(alu24+-263172)], alu26);
      var alu27 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[(alu27+1)];
      var val4 = data4_6912[alu27];
      var alu28 = (alu6&alu25);
      var val5 = select((f16(0.0f)), data1_268435456[(alu24+-263168)], alu28);
      var alu29 = (alu4&alu6&alu25);
      var val6 = select((f16(0.0f)), data1_268435456[(alu24+-263164)], alu29);
      var val7 = data4_6912[(alu27+2)];
      var alu30 = (alu5&alu25);
      var val8 = select((f16(0.0f)), data1_268435456[(alu24+-262148)], alu30);
      var val9 = data4_6912[(alu27+3)];
      var val10 = select((f16(0.0f)), data1_268435456[(alu24+-262144)], alu25);
      var val11 = data4_6912[(alu27+4)];
      var alu31 = (alu4&alu25);
      var val12 = select((f16(0.0f)), data1_268435456[(alu24+-262140)], alu31);
      var val13 = data4_6912[(alu27+5)];
      var alu32 = (alu5&alu3&alu25);
      var val14 = select((f16(0.0f)), data1_268435456[(alu24+-261124)], alu32);
      var val15 = data4_6912[(alu27+6)];
      var alu33 = (alu3&alu25);
      var val16 = select((f16(0.0f)), data1_268435456[(alu24+-261120)], alu33);
      var val17 = data4_6912[(alu27+7)];
      var alu34 = (alu4&alu3&alu25);
      var val18 = select((f16(0.0f)), data1_268435456[(alu24+-261116)], alu34);
      var val19 = data4_6912[(alu27+8)];
      var val20 = data4_6912[(alu27+432)];
      var val21 = data4_6912[(alu27+433)];
      var val22 = data4_6912[(alu27+434)];
      var val23 = data4_6912[(alu27+435)];
      var val24 = data4_6912[(alu27+436)];
      var val25 = data4_6912[(alu27+437)];
      var val26 = data4_6912[(alu27+438)];
      var val27 = data4_6912[(alu27+439)];
      var val28 = data4_6912[(alu27+440)];
      var val29 = data4_6912[(alu27+864)];
      var val30 = data4_6912[(alu27+865)];
      var val31 = data4_6912[(alu27+866)];
      var val32 = data4_6912[(alu27+867)];
      var val33 = data4_6912[(alu27+868)];
      var val34 = data4_6912[(alu27+869)];
      var val35 = data4_6912[(alu27+870)];
      var val36 = data4_6912[(alu27+871)];
      var val37 = data4_6912[(alu27+872)];
      var val38 = data4_6912[(alu27+1296)];
      var val39 = data4_6912[(alu27+1297)];
      var val40 = data4_6912[(alu27+1298)];
      var val41 = data4_6912[(alu27+1299)];
      var val42 = data4_6912[(alu27+1300)];
      var val43 = data4_6912[(alu27+1301)];
      var val44 = data4_6912[(alu27+1302)];
      var val45 = data4_6912[(alu27+1303)];
      var val46 = data4_6912[(alu27+1304)];
      var val47 = select((f16(0.0f)), data1_268435456[(alu24+-263171)], alu26);
      var val48 = select((f16(0.0f)), data1_268435456[(alu24+-263170)], alu26);
      var val49 = select((f16(0.0f)), data1_268435456[(alu24+-263169)], alu26);
      var val50 = select((f16(0.0f)), data1_268435456[(alu24+-263167)], alu28);
      var val51 = select((f16(0.0f)), data1_268435456[(alu24+-263166)], alu28);
      var val52 = select((f16(0.0f)), data1_268435456[(alu24+-263165)], alu28);
      var val53 = select((f16(0.0f)), data1_268435456[(alu24+-263163)], alu29);
      var val54 = select((f16(0.0f)), data1_268435456[(alu24+-263162)], alu29);
      var val55 = select((f16(0.0f)), data1_268435456[(alu24+-263161)], alu29);
      var val56 = select((f16(0.0f)), data1_268435456[(alu24+-262147)], alu30);
      var val57 = select((f16(0.0f)), data1_268435456[(alu24+-262146)], alu30);
      var val58 = select((f16(0.0f)), data1_268435456[(alu24+-262145)], alu30);
      var val59 = select((f16(0.0f)), data1_268435456[(alu24+-262143)], alu25);
      var val60 = select((f16(0.0f)), data1_268435456[(alu24+-262142)], alu25);
      var val61 = select((f16(0.0f)), data1_268435456[(alu24+-262141)], alu25);
      var val62 = select((f16(0.0f)), data1_268435456[(alu24+-262139)], alu31);
      var val63 = select((f16(0.0f)), data1_268435456[(alu24+-262138)], alu31);
      var val64 = select((f16(0.0f)), data1_268435456[(alu24+-262137)], alu31);
      var val65 = select((f16(0.0f)), data1_268435456[(alu24+-261123)], alu32);
      var val66 = select((f16(0.0f)), data1_268435456[(alu24+-261122)], alu32);
      var val67 = select((f16(0.0f)), data1_268435456[(alu24+-261121)], alu32);
      var val68 = select((f16(0.0f)), data1_268435456[(alu24+-261119)], alu33);
      var val69 = select((f16(0.0f)), data1_268435456[(alu24+-261118)], alu33);
      var val70 = select((f16(0.0f)), data1_268435456[(alu24+-261117)], alu33);
      var val71 = select((f16(0.0f)), data1_268435456[(alu24+-261115)], alu34);
      var val72 = select((f16(0.0f)), data1_268435456[(alu24+-261114)], alu34);
      var val73 = select((f16(0.0f)), data1_268435456[(alu24+-261113)], alu34);
      var alu35 = ((val10-cast3)*cast4);
      var alu36 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu35+((f16(0.044715f))*alu35*alu35*alu35))*(f16(-2.302208198144325f))))))*alu35),alu25);
      var alu37 = ((val59-cast3)*cast4);
      var alu38 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu37+((f16(0.044715f))*alu37*alu37*alu37))*(f16(-2.302208198144325f))))))*alu37),alu25);
      var alu39 = ((val60-cast3)*cast4);
      var alu40 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu39+((f16(0.044715f))*alu39*alu39*alu39))*(f16(-2.302208198144325f))))))*alu39),alu25);
      var alu41 = ((val61-cast3)*cast4);
      var alu42 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu41+((f16(0.044715f))*alu41*alu41*alu41))*(f16(-2.302208198144325f))))))*alu41),alu25);
      var alu43 = ((val16-cast3)*cast4);
      var alu44 = (alu25&alu3);
      var alu45 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu43+((f16(0.044715f))*alu43*alu43*alu43))*(f16(-2.302208198144325f))))))*alu43),alu44);
      var alu46 = ((val68-cast3)*cast4);
      var alu47 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu46+((f16(0.044715f))*alu46*alu46*alu46))*(f16(-2.302208198144325f))))))*alu46),alu44);
      var alu48 = ((val69-cast3)*cast4);
      var alu49 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu48+((f16(0.044715f))*alu48*alu48*alu48))*(f16(-2.302208198144325f))))))*alu48),alu44);
      var alu50 = ((val70-cast3)*cast4);
      var alu51 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu50+((f16(0.044715f))*alu50*alu50*alu50))*(f16(-2.302208198144325f))))))*alu50),alu44);
      var alu52 = ((val12-cast3)*cast4);
      var alu53 = (alu25&alu4);
      var alu54 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu52+((f16(0.044715f))*alu52*alu52*alu52))*(f16(-2.302208198144325f))))))*alu52),alu53);
      var alu55 = ((val62-cast3)*cast4);
      var alu56 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu55+((f16(0.044715f))*alu55*alu55*alu55))*(f16(-2.302208198144325f))))))*alu55),alu53);
      var alu57 = ((val63-cast3)*cast4);
      var alu58 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu57+((f16(0.044715f))*alu57*alu57*alu57))*(f16(-2.302208198144325f))))))*alu57),alu53);
      var alu59 = ((val64-cast3)*cast4);
      var alu60 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu59+((f16(0.044715f))*alu59*alu59*alu59))*(f16(-2.302208198144325f))))))*alu59),alu53);
      var alu61 = ((val8-cast3)*cast4);
      var alu62 = (alu25&alu5);
      var alu63 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu61+((f16(0.044715f))*alu61*alu61*alu61))*(f16(-2.302208198144325f))))))*alu61),alu62);
      var alu64 = ((val56-cast3)*cast4);
      var alu65 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu64+((f16(0.044715f))*alu64*alu64*alu64))*(f16(-2.302208198144325f))))))*alu64),alu62);
      var alu66 = ((val57-cast3)*cast4);
      var alu67 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu66+((f16(0.044715f))*alu66*alu66*alu66))*(f16(-2.302208198144325f))))))*alu66),alu62);
      var alu68 = ((val58-cast3)*cast4);
      var alu69 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu68+((f16(0.044715f))*alu68*alu68*alu68))*(f16(-2.302208198144325f))))))*alu68),alu62);
      var alu70 = ((val5-cast3)*cast4);
      var alu71 = (alu25&alu6);
      var alu72 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu70+((f16(0.044715f))*alu70*alu70*alu70))*(f16(-2.302208198144325f))))))*alu70),alu71);
      var alu73 = ((val50-cast3)*cast4);
      var alu74 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu73+((f16(0.044715f))*alu73*alu73*alu73))*(f16(-2.302208198144325f))))))*alu73),alu71);
      var alu75 = ((val51-cast3)*cast4);
      var alu76 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu75+((f16(0.044715f))*alu75*alu75*alu75))*(f16(-2.302208198144325f))))))*alu75),alu71);
      var alu77 = ((val52-cast3)*cast4);
      var alu78 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu77+((f16(0.044715f))*alu77*alu77*alu77))*(f16(-2.302208198144325f))))))*alu77),alu71);
      var alu79 = ((val18-cast3)*cast4);
      var alu80 = (alu44&alu4);
      var alu81 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu79+((f16(0.044715f))*alu79*alu79*alu79))*(f16(-2.302208198144325f))))))*alu79),alu80);
      var alu82 = ((val71-cast3)*cast4);
      var alu83 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu82+((f16(0.044715f))*alu82*alu82*alu82))*(f16(-2.302208198144325f))))))*alu82),alu80);
      var alu84 = ((val72-cast3)*cast4);
      var alu85 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu84+((f16(0.044715f))*alu84*alu84*alu84))*(f16(-2.302208198144325f))))))*alu84),alu80);
      var alu86 = ((val73-cast3)*cast4);
      var alu87 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu86+((f16(0.044715f))*alu86*alu86*alu86))*(f16(-2.302208198144325f))))))*alu86),alu80);
      var alu88 = ((val14-cast3)*cast4);
      var alu89 = (alu44&alu5);
      var alu90 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu88+((f16(0.044715f))*alu88*alu88*alu88))*(f16(-2.302208198144325f))))))*alu88),alu89);
      var alu91 = ((val65-cast3)*cast4);
      var alu92 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu91+((f16(0.044715f))*alu91*alu91*alu91))*(f16(-2.302208198144325f))))))*alu91),alu89);
      var alu93 = ((val66-cast3)*cast4);
      var alu94 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu93+((f16(0.044715f))*alu93*alu93*alu93))*(f16(-2.302208198144325f))))))*alu93),alu89);
      var alu95 = ((val67-cast3)*cast4);
      var alu96 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu95+((f16(0.044715f))*alu95*alu95*alu95))*(f16(-2.302208198144325f))))))*alu95),alu89);
      var alu97 = ((val6-cast3)*cast4);
      var alu98 = (alu71&alu4);
      var alu99 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu97+((f16(0.044715f))*alu97*alu97*alu97))*(f16(-2.302208198144325f))))))*alu97),alu98);
      var alu100 = ((val53-cast3)*cast4);
      var alu101 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu100+((f16(0.044715f))*alu100*alu100*alu100))*(f16(-2.302208198144325f))))))*alu100),alu98);
      var alu102 = ((val54-cast3)*cast4);
      var alu103 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu102+((f16(0.044715f))*alu102*alu102*alu102))*(f16(-2.302208198144325f))))))*alu102),alu98);
      var alu104 = ((val55-cast3)*cast4);
      var alu105 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu104+((f16(0.044715f))*alu104*alu104*alu104))*(f16(-2.302208198144325f))))))*alu104),alu98);
      var alu106 = ((val2-cast3)*cast4);
      var alu107 = (alu71&alu5);
      var alu108 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu106+((f16(0.044715f))*alu106*alu106*alu106))*(f16(-2.302208198144325f))))))*alu106),alu107);
      var alu109 = ((val47-cast3)*cast4);
      var alu110 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu109+((f16(0.044715f))*alu109*alu109*alu109))*(f16(-2.302208198144325f))))))*alu109),alu107);
      var alu111 = ((val48-cast3)*cast4);
      var alu112 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu111+((f16(0.044715f))*alu111*alu111*alu111))*(f16(-2.302208198144325f))))))*alu111),alu107);
      var alu113 = ((val49-cast3)*cast4);
      var alu114 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu113+((f16(0.044715f))*alu113*alu113*alu113))*(f16(-2.302208198144325f))))))*alu113),alu107);
      acc0[0] = (acc0[0]+(f32((alu108*val4)))+(f32((alu72*val3)))+(f32((alu99*val7)))+(f32((alu63*val9)))+(f32((alu36*val11)))+(f32((alu54*val13)))+(f32((alu90*val15)))+(f32((alu45*val17)))+(f32((alu81*val19))));
      acc0[1] = (acc0[1]+(f32((alu108*val20)))+(f32((alu72*val21)))+(f32((alu99*val22)))+(f32((alu63*val23)))+(f32((alu36*val24)))+(f32((alu54*val25)))+(f32((alu90*val26)))+(f32((alu45*val27)))+(f32((alu81*val28))));
      acc0[2] = (acc0[2]+(f32((alu108*val29)))+(f32((alu72*val30)))+(f32((alu99*val31)))+(f32((alu63*val32)))+(f32((alu36*val33)))+(f32((alu54*val34)))+(f32((alu90*val35)))+(f32((alu45*val36)))+(f32((alu81*val37))));
      acc0[3] = (acc0[3]+(f32((alu108*val38)))+(f32((alu72*val39)))+(f32((alu99*val40)))+(f32((alu63*val41)))+(f32((alu36*val42)))+(f32((alu54*val43)))+(f32((alu90*val44)))+(f32((alu45*val45)))+(f32((alu81*val46))));
      acc0[4] = (acc0[4]+(f32((alu110*val4)))+(f32((alu74*val3)))+(f32((alu101*val7)))+(f32((alu65*val9)))+(f32((alu38*val11)))+(f32((alu56*val13)))+(f32((alu92*val15)))+(f32((alu47*val17)))+(f32((alu83*val19))));
      acc0[5] = (acc0[5]+(f32((alu110*val20)))+(f32((alu74*val21)))+(f32((alu101*val22)))+(f32((alu65*val23)))+(f32((alu38*val24)))+(f32((alu56*val25)))+(f32((alu92*val26)))+(f32((alu47*val27)))+(f32((alu83*val28))));
      acc0[6] = (acc0[6]+(f32((alu110*val29)))+(f32((alu74*val30)))+(f32((alu101*val31)))+(f32((alu65*val32)))+(f32((alu38*val33)))+(f32((alu56*val34)))+(f32((alu92*val35)))+(f32((alu47*val36)))+(f32((alu83*val37))));
      acc0[7] = (acc0[7]+(f32((alu110*val38)))+(f32((alu74*val39)))+(f32((alu101*val40)))+(f32((alu65*val41)))+(f32((alu38*val42)))+(f32((alu56*val43)))+(f32((alu92*val44)))+(f32((alu47*val45)))+(f32((alu83*val46))));
      acc0[8] = (acc0[8]+(f32((alu112*val4)))+(f32((alu76*val3)))+(f32((alu103*val7)))+(f32((alu67*val9)))+(f32((alu40*val11)))+(f32((alu58*val13)))+(f32((alu94*val15)))+(f32((alu49*val17)))+(f32((alu85*val19))));
      acc0[9] = (acc0[9]+(f32((alu112*val20)))+(f32((alu76*val21)))+(f32((alu103*val22)))+(f32((alu67*val23)))+(f32((alu40*val24)))+(f32((alu58*val25)))+(f32((alu94*val26)))+(f32((alu49*val27)))+(f32((alu85*val28))));
      acc0[10] = (acc0[10]+(f32((alu112*val29)))+(f32((alu76*val30)))+(f32((alu103*val31)))+(f32((alu67*val32)))+(f32((alu40*val33)))+(f32((alu58*val34)))+(f32((alu94*val35)))+(f32((alu49*val36)))+(f32((alu85*val37))));
      acc0[11] = (acc0[11]+(f32((alu112*val38)))+(f32((alu76*val39)))+(f32((alu103*val40)))+(f32((alu67*val41)))+(f32((alu40*val42)))+(f32((alu58*val43)))+(f32((alu94*val44)))+(f32((alu49*val45)))+(f32((alu85*val46))));
      acc0[12] = (acc0[12]+(f32((alu114*val4)))+(f32((alu78*val3)))+(f32((alu105*val7)))+(f32((alu69*val9)))+(f32((alu42*val11)))+(f32((alu60*val13)))+(f32((alu96*val15)))+(f32((alu51*val17)))+(f32((alu87*val19))));
      acc0[13] = (acc0[13]+(f32((alu114*val20)))+(f32((alu78*val21)))+(f32((alu105*val22)))+(f32((alu69*val23)))+(f32((alu42*val24)))+(f32((alu60*val25)))+(f32((alu96*val26)))+(f32((alu51*val27)))+(f32((alu87*val28))));
      acc0[14] = (acc0[14]+(f32((alu114*val29)))+(f32((alu78*val30)))+(f32((alu105*val31)))+(f32((alu69*val32)))+(f32((alu42*val33)))+(f32((alu60*val34)))+(f32((alu96*val35)))+(f32((alu51*val36)))+(f32((alu87*val37))));
      acc0[15] = (acc0[15]+(f32((alu114*val38)))+(f32((alu78*val39)))+(f32((alu105*val40)))+(f32((alu69*val41)))+(f32((alu42*val42)))+(f32((alu60*val43)))+(f32((alu96*val44)))+(f32((alu51*val45)))+(f32((alu87*val46))));
    }
  }
  var alu133 = (alu2+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu133] = (f16(acc0[0]));
  data0_268435456[(alu133+1)] = (f16(acc0[4]));
  data0_268435456[(alu133+2)] = (f16(acc0[8]));
  data0_268435456[(alu133+3)] = (f16(acc0[12]));
  data0_268435456[(alu133+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu133+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu133+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu133+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu133+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu133+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu133+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu133+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu133+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu133+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu133+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu133+50331651)] = (f16(acc0[15]));
}`,c=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>(lidx1);
  var cast2 = bitcast<u32>((gidx0>>2u));
  var cast3 = bitcast<u32>((gidx0&3));
  var alu0 = (lidx0+bitcast<i32>((cast2<<3u)));
  var alu1 = (bitcast<i32>((cast1<<2u))+bitcast<i32>((cast3<<6u)));
  var alu2 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((cast2<<11u))+alu1);
  var alu3 = (alu0<254);
  var alu4 = ((lidx1+bitcast<i32>((cast3<<4u)))<63);
  var alu5 = (alu1<251);
  var alu6 = (0<(bitcast<i32>((cast1<<1u))+bitcast<i32>((cast3<<5u))));
  var alu7 = (0<alu1);
  var alu8 = (1<alu0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast4 = (f16(val0));
    var cast5 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var cast6 = bitcast<u32>(Ridx1);
      var alu25 = (gidx1+bitcast<i32>((cast6<<1u)));
      var alu26 = (alu2+cast0+bitcast<i32>((cast6<<17u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu27 = ((1<alu25)&(alu25<258));
      var val2 = select((f16(0.0f)), data1_268435456[(alu26+-131586)], (alu6&alu8&alu27));
      var alu28 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[(alu28+1)];
      var val4 = data4_6912[(alu28+2)];
      var val5 = data4_6912[(alu28+4)];
      var val6 = data4_6912[(alu28+7)];
      var val7 = data4_6912[alu28];
      var alu29 = (alu8&alu27);
      var val8 = select((f16(0.0f)), data1_268435456[(alu26+-131584)], alu29);
      var val9 = select((f16(0.0f)), data1_268435456[(alu26+-131582)], alu29);
      var val10 = select((f16(0.0f)), data1_268435456[(alu26+-131580)], (alu4&alu8&alu27));
      var val11 = select((f16(0.0f)), data1_268435456[(alu26+-131579)], (alu5&alu8&alu27));
      var val12 = select((f16(0.0f)), data1_268435456[(alu26+-131074)], (alu6&alu27));
      var val13 = data4_6912[(alu28+3)];
      var val14 = select((f16(0.0f)), data1_268435456[(alu26+-131072)], alu27);
      var val15 = select((f16(0.0f)), data1_268435456[(alu26+-131070)], alu27);
      var val16 = data4_6912[(alu28+5)];
      var val17 = select((f16(0.0f)), data1_268435456[(alu26+-131069)], alu27);
      var val18 = select((f16(0.0f)), data1_268435456[(alu26+-131068)], (alu4&alu27));
      var val19 = select((f16(0.0f)), data1_268435456[(alu26+-131067)], (alu5&alu27));
      var val20 = select((f16(0.0f)), data1_268435456[(alu26+-130562)], (alu6&alu3&alu27));
      var val21 = data4_6912[(alu28+6)];
      var val22 = select((f16(0.0f)), data1_268435456[(alu26+-130561)], (alu7&alu3&alu27));
      var alu30 = (alu3&alu27);
      var val23 = select((f16(0.0f)), data1_268435456[(alu26+-130560)], alu30);
      var val24 = select((f16(0.0f)), data1_268435456[(alu26+-130559)], alu30);
      var val25 = select((f16(0.0f)), data1_268435456[(alu26+-130558)], alu30);
      var val26 = data4_6912[(alu28+8)];
      var val27 = data4_6912[(alu28+432)];
      var val28 = data4_6912[(alu28+433)];
      var val29 = data4_6912[(alu28+434)];
      var val30 = data4_6912[(alu28+435)];
      var val31 = data4_6912[(alu28+436)];
      var val32 = data4_6912[(alu28+437)];
      var val33 = data4_6912[(alu28+438)];
      var val34 = data4_6912[(alu28+439)];
      var val35 = data4_6912[(alu28+440)];
      var val36 = data4_6912[(alu28+864)];
      var val37 = data4_6912[(alu28+865)];
      var val38 = data4_6912[(alu28+866)];
      var val39 = data4_6912[(alu28+867)];
      var val40 = data4_6912[(alu28+868)];
      var val41 = data4_6912[(alu28+869)];
      var val42 = data4_6912[(alu28+870)];
      var val43 = data4_6912[(alu28+871)];
      var val44 = data4_6912[(alu28+872)];
      var val45 = data4_6912[(alu28+1296)];
      var val46 = data4_6912[(alu28+1297)];
      var val47 = data4_6912[(alu28+1298)];
      var val48 = data4_6912[(alu28+1299)];
      var val49 = data4_6912[(alu28+1300)];
      var val50 = data4_6912[(alu28+1301)];
      var val51 = data4_6912[(alu28+1302)];
      var val52 = data4_6912[(alu28+1303)];
      var val53 = data4_6912[(alu28+1304)];
      var val54 = select((f16(0.0f)), data1_268435456[(alu26+-131585)], (alu7&alu8&alu27));
      var val55 = select((f16(0.0f)), data1_268435456[(alu26+-131583)], alu29);
      var val56 = select((f16(0.0f)), data1_268435456[(alu26+-131581)], alu29);
      var val57 = select((f16(0.0f)), data1_268435456[(alu26+-131073)], (alu7&alu27));
      var val58 = select((f16(0.0f)), data1_268435456[(alu26+-131071)], alu27);
      var val59 = select((f16(0.0f)), data1_268435456[(alu26+-130557)], alu30);
      var val60 = select((f16(0.0f)), data1_268435456[(alu26+-130556)], (alu4&alu3&alu27));
      var val61 = select((f16(0.0f)), data1_268435456[(alu26+-130555)], (alu5&alu3&alu27));
      var alu31 = ((val14-cast4)*cast5);
      var alu32 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu31+((f16(0.044715f))*alu31*alu31*alu31))*(f16(-2.302208198144325f))))))*alu31),alu27);
      var alu33 = ((val58-cast4)*cast5);
      var alu34 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu33+((f16(0.044715f))*alu33*alu33*alu33))*(f16(-2.302208198144325f))))))*alu33),alu27);
      var alu35 = ((val15-cast4)*cast5);
      var alu36 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu35+((f16(0.044715f))*alu35*alu35*alu35))*(f16(-2.302208198144325f))))))*alu35),alu27);
      var alu37 = ((val17-cast4)*cast5);
      var alu38 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu37+((f16(0.044715f))*alu37*alu37*alu37))*(f16(-2.302208198144325f))))))*alu37),alu27);
      var alu39 = ((val23-cast4)*cast5);
      var alu40 = (alu27&alu3);
      var alu41 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu39+((f16(0.044715f))*alu39*alu39*alu39))*(f16(-2.302208198144325f))))))*alu39),alu40);
      var alu42 = ((val24-cast4)*cast5);
      var alu43 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu42+((f16(0.044715f))*alu42*alu42*alu42))*(f16(-2.302208198144325f))))))*alu42),alu40);
      var alu44 = ((val25-cast4)*cast5);
      var alu45 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu44+((f16(0.044715f))*alu44*alu44*alu44))*(f16(-2.302208198144325f))))))*alu44),alu40);
      var alu46 = ((val59-cast4)*cast5);
      var alu47 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu46+((f16(0.044715f))*alu46*alu46*alu46))*(f16(-2.302208198144325f))))))*alu46),alu40);
      var alu48 = ((val18-cast4)*cast5);
      var alu49 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu48+((f16(0.044715f))*alu48*alu48*alu48))*(f16(-2.302208198144325f))))))*alu48),(alu27&alu4));
      var alu50 = ((val19-cast4)*cast5);
      var alu51 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu50+((f16(0.044715f))*alu50*alu50*alu50))*(f16(-2.302208198144325f))))))*alu50),(alu27&alu5));
      var alu52 = ((val12-cast4)*cast5);
      var alu53 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu52+((f16(0.044715f))*alu52*alu52*alu52))*(f16(-2.302208198144325f))))))*alu52),(alu27&alu6));
      var alu54 = ((val57-cast4)*cast5);
      var alu55 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu54+((f16(0.044715f))*alu54*alu54*alu54))*(f16(-2.302208198144325f))))))*alu54),(alu27&alu7));
      var alu56 = ((val8-cast4)*cast5);
      var alu57 = (alu27&alu8);
      var alu58 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu56+((f16(0.044715f))*alu56*alu56*alu56))*(f16(-2.302208198144325f))))))*alu56),alu57);
      var alu59 = ((val55-cast4)*cast5);
      var alu60 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu59+((f16(0.044715f))*alu59*alu59*alu59))*(f16(-2.302208198144325f))))))*alu59),alu57);
      var alu61 = ((val9-cast4)*cast5);
      var alu62 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu61+((f16(0.044715f))*alu61*alu61*alu61))*(f16(-2.302208198144325f))))))*alu61),alu57);
      var alu63 = ((val56-cast4)*cast5);
      var alu64 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu63+((f16(0.044715f))*alu63*alu63*alu63))*(f16(-2.302208198144325f))))))*alu63),alu57);
      var alu65 = ((val60-cast4)*cast5);
      var alu66 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu65+((f16(0.044715f))*alu65*alu65*alu65))*(f16(-2.302208198144325f))))))*alu65),(alu40&alu4));
      var alu67 = ((val61-cast4)*cast5);
      var alu68 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu67+((f16(0.044715f))*alu67*alu67*alu67))*(f16(-2.302208198144325f))))))*alu67),(alu40&alu5));
      var alu69 = ((val20-cast4)*cast5);
      var alu70 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu69+((f16(0.044715f))*alu69*alu69*alu69))*(f16(-2.302208198144325f))))))*alu69),(alu40&alu6));
      var alu71 = ((val22-cast4)*cast5);
      var alu72 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu71+((f16(0.044715f))*alu71*alu71*alu71))*(f16(-2.302208198144325f))))))*alu71),(alu40&alu7));
      var alu73 = ((val10-cast4)*cast5);
      var alu74 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu73+((f16(0.044715f))*alu73*alu73*alu73))*(f16(-2.302208198144325f))))))*alu73),(alu57&alu4));
      var alu75 = ((val11-cast4)*cast5);
      var alu76 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu75+((f16(0.044715f))*alu75*alu75*alu75))*(f16(-2.302208198144325f))))))*alu75),(alu57&alu5));
      var alu77 = ((val2-cast4)*cast5);
      var alu78 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu77+((f16(0.044715f))*alu77*alu77*alu77))*(f16(-2.302208198144325f))))))*alu77),(alu57&alu6));
      var alu79 = ((val54-cast4)*cast5);
      var alu80 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu79+((f16(0.044715f))*alu79*alu79*alu79))*(f16(-2.302208198144325f))))))*alu79),(alu57&alu7));
      acc0[0] = (acc0[0]+(f32((alu78*val7)))+(f32((alu58*val3)))+(f32((alu62*val4)))+(f32((alu53*val13)))+(f32((alu32*val5)))+(f32((alu36*val16)))+(f32((alu70*val21)))+(f32((alu41*val6)))+(f32((alu45*val26))));
      acc0[1] = (acc0[1]+(f32((alu78*val27)))+(f32((alu58*val28)))+(f32((alu62*val29)))+(f32((alu53*val30)))+(f32((alu32*val31)))+(f32((alu36*val32)))+(f32((alu70*val33)))+(f32((alu41*val34)))+(f32((alu45*val35))));
      acc0[2] = (acc0[2]+(f32((alu78*val36)))+(f32((alu58*val37)))+(f32((alu62*val38)))+(f32((alu53*val39)))+(f32((alu32*val40)))+(f32((alu36*val41)))+(f32((alu70*val42)))+(f32((alu41*val43)))+(f32((alu45*val44))));
      acc0[3] = (acc0[3]+(f32((alu78*val45)))+(f32((alu58*val46)))+(f32((alu62*val47)))+(f32((alu53*val48)))+(f32((alu32*val49)))+(f32((alu36*val50)))+(f32((alu70*val51)))+(f32((alu41*val52)))+(f32((alu45*val53))));
      acc0[4] = (acc0[4]+(f32((alu80*val7)))+(f32((alu60*val3)))+(f32((alu64*val4)))+(f32((alu55*val13)))+(f32((alu34*val5)))+(f32((alu38*val16)))+(f32((alu72*val21)))+(f32((alu43*val6)))+(f32((alu47*val26))));
      acc0[5] = (acc0[5]+(f32((alu80*val27)))+(f32((alu60*val28)))+(f32((alu64*val29)))+(f32((alu55*val30)))+(f32((alu34*val31)))+(f32((alu38*val32)))+(f32((alu72*val33)))+(f32((alu43*val34)))+(f32((alu47*val35))));
      acc0[6] = (acc0[6]+(f32((alu80*val36)))+(f32((alu60*val37)))+(f32((alu64*val38)))+(f32((alu55*val39)))+(f32((alu34*val40)))+(f32((alu38*val41)))+(f32((alu72*val42)))+(f32((alu43*val43)))+(f32((alu47*val44))));
      acc0[7] = (acc0[7]+(f32((alu80*val45)))+(f32((alu60*val46)))+(f32((alu64*val47)))+(f32((alu55*val48)))+(f32((alu34*val49)))+(f32((alu38*val50)))+(f32((alu72*val51)))+(f32((alu43*val52)))+(f32((alu47*val53))));
      acc0[8] = (acc0[8]+(f32((alu58*val7)))+(f32((alu62*val3)))+(f32((alu74*val4)))+(f32((alu32*val13)))+(f32((alu36*val5)))+(f32((alu49*val16)))+(f32((alu41*val21)))+(f32((alu45*val6)))+(f32((alu66*val26))));
      acc0[9] = (acc0[9]+(f32((alu58*val27)))+(f32((alu62*val28)))+(f32((alu74*val29)))+(f32((alu32*val30)))+(f32((alu36*val31)))+(f32((alu49*val32)))+(f32((alu41*val33)))+(f32((alu45*val34)))+(f32((alu66*val35))));
      acc0[10] = (acc0[10]+(f32((alu58*val36)))+(f32((alu62*val37)))+(f32((alu74*val38)))+(f32((alu32*val39)))+(f32((alu36*val40)))+(f32((alu49*val41)))+(f32((alu41*val42)))+(f32((alu45*val43)))+(f32((alu66*val44))));
      acc0[11] = (acc0[11]+(f32((alu58*val45)))+(f32((alu62*val46)))+(f32((alu74*val47)))+(f32((alu32*val48)))+(f32((alu36*val49)))+(f32((alu49*val50)))+(f32((alu41*val51)))+(f32((alu45*val52)))+(f32((alu66*val53))));
      acc0[12] = (acc0[12]+(f32((alu60*val7)))+(f32((alu64*val3)))+(f32((alu76*val4)))+(f32((alu34*val13)))+(f32((alu38*val5)))+(f32((alu51*val16)))+(f32((alu43*val21)))+(f32((alu47*val6)))+(f32((alu68*val26))));
      acc0[13] = (acc0[13]+(f32((alu60*val27)))+(f32((alu64*val28)))+(f32((alu76*val29)))+(f32((alu34*val30)))+(f32((alu38*val31)))+(f32((alu51*val32)))+(f32((alu43*val33)))+(f32((alu47*val34)))+(f32((alu68*val35))));
      acc0[14] = (acc0[14]+(f32((alu60*val36)))+(f32((alu64*val37)))+(f32((alu76*val38)))+(f32((alu34*val39)))+(f32((alu38*val40)))+(f32((alu51*val41)))+(f32((alu43*val42)))+(f32((alu47*val43)))+(f32((alu68*val44))));
      acc0[15] = (acc0[15]+(f32((alu60*val45)))+(f32((alu64*val46)))+(f32((alu76*val47)))+(f32((alu34*val48)))+(f32((alu38*val49)))+(f32((alu51*val50)))+(f32((alu43*val51)))+(f32((alu47*val52)))+(f32((alu68*val53))));
    }
  }
  var alu99 = (alu2+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu99] = (f16(acc0[0]));
  data0_268435456[(alu99+1)] = (f16(acc0[4]));
  data0_268435456[(alu99+2)] = (f16(acc0[8]));
  data0_268435456[(alu99+3)] = (f16(acc0[12]));
  data0_268435456[(alu99+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu99+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu99+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu99+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu99+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu99+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu99+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu99+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu99+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu99+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu99+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu99+50331651)] = (f16(acc0[15]));
}`,U=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var alu0 = (gidx0>>2u);
  var cast1 = bitcast<u32>(alu0);
  var alu1 = (gidx0&3);
  var cast2 = bitcast<u32>(alu1);
  var alu2 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((cast1<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast2<<6u)));
  var alu3 = ((lidx0+bitcast<i32>((cast1<<3u)))<255);
  var alu4 = ((lidx1+bitcast<i32>((cast2<<4u)))<63);
  var alu5 = (0<(lidx0+alu0));
  var alu6 = (0<(lidx1+alu1));
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast3 = (f16(val0));
    var cast4 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var alu23 = (gidx1+Ridx1);
      var alu24 = (alu2+cast0+bitcast<i32>((bitcast<u32>(Ridx1)<<16u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu25 = ((0<alu23)&(alu23<257));
      var val2 = select((f16(0.0f)), data1_268435456[(alu24+-65793)], (alu6&alu5&alu25));
      var alu26 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[(alu26+1)];
      var val4 = data4_6912[(alu26+3)];
      var val5 = data4_6912[alu26];
      var alu27 = (alu5&alu25);
      var val6 = select((f16(0.0f)), data1_268435456[(alu24+-65792)], alu27);
      var val7 = select((f16(0.0f)), data1_268435456[(alu24+-65791)], alu27);
      var val8 = data4_6912[(alu26+2)];
      var val9 = select((f16(0.0f)), data1_268435456[(alu24+-65537)], (alu6&alu25));
      var val10 = select((f16(0.0f)), data1_268435456[(alu24+-65536)], alu25);
      var val11 = data4_6912[(alu26+4)];
      var val12 = select((f16(0.0f)), data1_268435456[(alu24+-65535)], alu25);
      var val13 = data4_6912[(alu26+5)];
      var val14 = select((f16(0.0f)), data1_268435456[(alu24+-65281)], (alu6&alu3&alu25));
      var val15 = data4_6912[(alu26+6)];
      var alu28 = (alu3&alu25);
      var val16 = select((f16(0.0f)), data1_268435456[(alu24+-65280)], alu28);
      var val17 = data4_6912[(alu26+7)];
      var val18 = select((f16(0.0f)), data1_268435456[(alu24+-65279)], alu28);
      var val19 = data4_6912[(alu26+8)];
      var val20 = data4_6912[(alu26+432)];
      var val21 = data4_6912[(alu26+433)];
      var val22 = data4_6912[(alu26+434)];
      var val23 = data4_6912[(alu26+435)];
      var val24 = data4_6912[(alu26+436)];
      var val25 = data4_6912[(alu26+437)];
      var val26 = data4_6912[(alu26+438)];
      var val27 = data4_6912[(alu26+439)];
      var val28 = data4_6912[(alu26+440)];
      var val29 = data4_6912[(alu26+864)];
      var val30 = data4_6912[(alu26+865)];
      var val31 = data4_6912[(alu26+866)];
      var val32 = data4_6912[(alu26+867)];
      var val33 = data4_6912[(alu26+868)];
      var val34 = data4_6912[(alu26+869)];
      var val35 = data4_6912[(alu26+870)];
      var val36 = data4_6912[(alu26+871)];
      var val37 = data4_6912[(alu26+872)];
      var val38 = data4_6912[(alu26+1296)];
      var val39 = data4_6912[(alu26+1297)];
      var val40 = data4_6912[(alu26+1298)];
      var val41 = data4_6912[(alu26+1299)];
      var val42 = data4_6912[(alu26+1300)];
      var val43 = data4_6912[(alu26+1301)];
      var val44 = data4_6912[(alu26+1302)];
      var val45 = data4_6912[(alu26+1303)];
      var val46 = data4_6912[(alu26+1304)];
      var val47 = select((f16(0.0f)), data1_268435456[(alu24+-65790)], alu27);
      var val48 = select((f16(0.0f)), data1_268435456[(alu24+-65789)], alu27);
      var val49 = select((f16(0.0f)), data1_268435456[(alu24+-65788)], (alu4&alu5&alu25));
      var val50 = select((f16(0.0f)), data1_268435456[(alu24+-65534)], alu25);
      var val51 = select((f16(0.0f)), data1_268435456[(alu24+-65533)], alu25);
      var val52 = select((f16(0.0f)), data1_268435456[(alu24+-65532)], (alu4&alu25));
      var val53 = select((f16(0.0f)), data1_268435456[(alu24+-65278)], alu28);
      var val54 = select((f16(0.0f)), data1_268435456[(alu24+-65277)], alu28);
      var val55 = select((f16(0.0f)), data1_268435456[(alu24+-65276)], (alu4&alu3&alu25));
      var alu29 = ((val10-cast3)*cast4);
      var alu30 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu29+((f16(0.044715f))*alu29*alu29*alu29))*(f16(-2.302208198144325f))))))*alu29),alu25);
      var alu31 = ((val12-cast3)*cast4);
      var alu32 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu31+((f16(0.044715f))*alu31*alu31*alu31))*(f16(-2.302208198144325f))))))*alu31),alu25);
      var alu33 = ((val50-cast3)*cast4);
      var alu34 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu33+((f16(0.044715f))*alu33*alu33*alu33))*(f16(-2.302208198144325f))))))*alu33),alu25);
      var alu35 = ((val51-cast3)*cast4);
      var alu36 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu35+((f16(0.044715f))*alu35*alu35*alu35))*(f16(-2.302208198144325f))))))*alu35),alu25);
      var alu37 = ((val16-cast3)*cast4);
      var alu38 = (alu25&alu3);
      var alu39 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu37+((f16(0.044715f))*alu37*alu37*alu37))*(f16(-2.302208198144325f))))))*alu37),alu38);
      var alu40 = ((val18-cast3)*cast4);
      var alu41 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu40+((f16(0.044715f))*alu40*alu40*alu40))*(f16(-2.302208198144325f))))))*alu40),alu38);
      var alu42 = ((val53-cast3)*cast4);
      var alu43 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu42+((f16(0.044715f))*alu42*alu42*alu42))*(f16(-2.302208198144325f))))))*alu42),alu38);
      var alu44 = ((val54-cast3)*cast4);
      var alu45 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu44+((f16(0.044715f))*alu44*alu44*alu44))*(f16(-2.302208198144325f))))))*alu44),alu38);
      var alu46 = ((val52-cast3)*cast4);
      var alu47 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu46+((f16(0.044715f))*alu46*alu46*alu46))*(f16(-2.302208198144325f))))))*alu46),(alu25&alu4));
      var alu48 = ((val6-cast3)*cast4);
      var alu49 = (alu25&alu5);
      var alu50 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu48+((f16(0.044715f))*alu48*alu48*alu48))*(f16(-2.302208198144325f))))))*alu48),alu49);
      var alu51 = ((val7-cast3)*cast4);
      var alu52 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu51+((f16(0.044715f))*alu51*alu51*alu51))*(f16(-2.302208198144325f))))))*alu51),alu49);
      var alu53 = ((val47-cast3)*cast4);
      var alu54 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu53+((f16(0.044715f))*alu53*alu53*alu53))*(f16(-2.302208198144325f))))))*alu53),alu49);
      var alu55 = ((val48-cast3)*cast4);
      var alu56 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu55+((f16(0.044715f))*alu55*alu55*alu55))*(f16(-2.302208198144325f))))))*alu55),alu49);
      var alu57 = ((val9-cast3)*cast4);
      var alu58 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu57+((f16(0.044715f))*alu57*alu57*alu57))*(f16(-2.302208198144325f))))))*alu57),(alu25&alu6));
      var alu59 = ((val55-cast3)*cast4);
      var alu60 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu59+((f16(0.044715f))*alu59*alu59*alu59))*(f16(-2.302208198144325f))))))*alu59),(alu38&alu4));
      var alu61 = ((val14-cast3)*cast4);
      var alu62 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu61+((f16(0.044715f))*alu61*alu61*alu61))*(f16(-2.302208198144325f))))))*alu61),(alu38&alu6));
      var alu63 = ((val49-cast3)*cast4);
      var alu64 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu63+((f16(0.044715f))*alu63*alu63*alu63))*(f16(-2.302208198144325f))))))*alu63),(alu49&alu4));
      var alu65 = ((val2-cast3)*cast4);
      var alu66 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu65+((f16(0.044715f))*alu65*alu65*alu65))*(f16(-2.302208198144325f))))))*alu65),(alu49&alu6));
      acc0[0] = (acc0[0]+(f32((alu66*val5)))+(f32((alu50*val3)))+(f32((alu52*val8)))+(f32((alu58*val4)))+(f32((alu30*val11)))+(f32((alu32*val13)))+(f32((alu62*val15)))+(f32((alu39*val17)))+(f32((alu41*val19))));
      acc0[1] = (acc0[1]+(f32((alu66*val20)))+(f32((alu50*val21)))+(f32((alu52*val22)))+(f32((alu58*val23)))+(f32((alu30*val24)))+(f32((alu32*val25)))+(f32((alu62*val26)))+(f32((alu39*val27)))+(f32((alu41*val28))));
      acc0[2] = (acc0[2]+(f32((alu66*val29)))+(f32((alu50*val30)))+(f32((alu52*val31)))+(f32((alu58*val32)))+(f32((alu30*val33)))+(f32((alu32*val34)))+(f32((alu62*val35)))+(f32((alu39*val36)))+(f32((alu41*val37))));
      acc0[3] = (acc0[3]+(f32((alu66*val38)))+(f32((alu50*val39)))+(f32((alu52*val40)))+(f32((alu58*val41)))+(f32((alu30*val42)))+(f32((alu32*val43)))+(f32((alu62*val44)))+(f32((alu39*val45)))+(f32((alu41*val46))));
      acc0[4] = (acc0[4]+(f32((alu50*val5)))+(f32((alu52*val3)))+(f32((alu54*val8)))+(f32((alu30*val4)))+(f32((alu32*val11)))+(f32((alu34*val13)))+(f32((alu39*val15)))+(f32((alu41*val17)))+(f32((alu43*val19))));
      acc0[5] = (acc0[5]+(f32((alu50*val20)))+(f32((alu52*val21)))+(f32((alu54*val22)))+(f32((alu30*val23)))+(f32((alu32*val24)))+(f32((alu34*val25)))+(f32((alu39*val26)))+(f32((alu41*val27)))+(f32((alu43*val28))));
      acc0[6] = (acc0[6]+(f32((alu50*val29)))+(f32((alu52*val30)))+(f32((alu54*val31)))+(f32((alu30*val32)))+(f32((alu32*val33)))+(f32((alu34*val34)))+(f32((alu39*val35)))+(f32((alu41*val36)))+(f32((alu43*val37))));
      acc0[7] = (acc0[7]+(f32((alu50*val38)))+(f32((alu52*val39)))+(f32((alu54*val40)))+(f32((alu30*val41)))+(f32((alu32*val42)))+(f32((alu34*val43)))+(f32((alu39*val44)))+(f32((alu41*val45)))+(f32((alu43*val46))));
      acc0[8] = (acc0[8]+(f32((alu52*val5)))+(f32((alu54*val3)))+(f32((alu56*val8)))+(f32((alu32*val4)))+(f32((alu34*val11)))+(f32((alu36*val13)))+(f32((alu41*val15)))+(f32((alu43*val17)))+(f32((alu45*val19))));
      acc0[9] = (acc0[9]+(f32((alu52*val20)))+(f32((alu54*val21)))+(f32((alu56*val22)))+(f32((alu32*val23)))+(f32((alu34*val24)))+(f32((alu36*val25)))+(f32((alu41*val26)))+(f32((alu43*val27)))+(f32((alu45*val28))));
      acc0[10] = (acc0[10]+(f32((alu52*val29)))+(f32((alu54*val30)))+(f32((alu56*val31)))+(f32((alu32*val32)))+(f32((alu34*val33)))+(f32((alu36*val34)))+(f32((alu41*val35)))+(f32((alu43*val36)))+(f32((alu45*val37))));
      acc0[11] = (acc0[11]+(f32((alu52*val38)))+(f32((alu54*val39)))+(f32((alu56*val40)))+(f32((alu32*val41)))+(f32((alu34*val42)))+(f32((alu36*val43)))+(f32((alu41*val44)))+(f32((alu43*val45)))+(f32((alu45*val46))));
      acc0[12] = (acc0[12]+(f32((alu54*val5)))+(f32((alu56*val3)))+(f32((alu64*val8)))+(f32((alu34*val4)))+(f32((alu36*val11)))+(f32((alu47*val13)))+(f32((alu43*val15)))+(f32((alu45*val17)))+(f32((alu60*val19))));
      acc0[13] = (acc0[13]+(f32((alu54*val20)))+(f32((alu56*val21)))+(f32((alu64*val22)))+(f32((alu34*val23)))+(f32((alu36*val24)))+(f32((alu47*val25)))+(f32((alu43*val26)))+(f32((alu45*val27)))+(f32((alu60*val28))));
      acc0[14] = (acc0[14]+(f32((alu54*val29)))+(f32((alu56*val30)))+(f32((alu64*val31)))+(f32((alu34*val32)))+(f32((alu36*val33)))+(f32((alu47*val34)))+(f32((alu43*val35)))+(f32((alu45*val36)))+(f32((alu60*val37))));
      acc0[15] = (acc0[15]+(f32((alu54*val38)))+(f32((alu56*val39)))+(f32((alu64*val40)))+(f32((alu34*val41)))+(f32((alu36*val42)))+(f32((alu47*val43)))+(f32((alu43*val44)))+(f32((alu45*val45)))+(f32((alu60*val46))));
    }
  }
  var alu85 = (alu2+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu85] = (f16(acc0[0]));
  data0_268435456[(alu85+1)] = (f16(acc0[4]));
  data0_268435456[(alu85+2)] = (f16(acc0[8]));
  data0_268435456[(alu85+3)] = (f16(acc0[12]));
  data0_268435456[(alu85+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu85+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu85+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu85+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu85+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu85+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu85+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu85+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu85+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu85+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu85+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu85+50331651)] = (f16(acc0[15]));
}`,w=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4_6912:array<f16>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0: array<f32,16>;
  var gidx0 = i32(gindex.x); /* 128 */
  var gidx1 = i32(gindex.y); /* 256 */
  var gidx2 = i32(gindex.z); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<i32>((bitcast<u32>(gidx1)<<16u));
  var cast1 = bitcast<u32>((gidx0&3));
  var alu0 = (lidx1+bitcast<i32>((cast1<<4u)));
  var alu1 = (bitcast<i32>((bitcast<u32>(lidx0)<<8u))+bitcast<i32>((bitcast<u32>((gidx0>>2u))<<11u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((cast1<<6u)));
  var alu2 = (gidx0<120);
  var alu3 = (alu0<60);
  var alu4 = (3<alu0);
  var alu5 = (7<gidx0);
  acc0[0] = 0.0f;
  acc0[1] = 0.0f;
  acc0[2] = 0.0f;
  acc0[3] = 0.0f;
  acc0[4] = 0.0f;
  acc0[5] = 0.0f;
  acc0[6] = 0.0f;
  acc0[7] = 0.0f;
  acc0[8] = 0.0f;
  acc0[9] = 0.0f;
  acc0[10] = 0.0f;
  acc0[11] = 0.0f;
  acc0[12] = 0.0f;
  acc0[13] = 0.0f;
  acc0[14] = 0.0f;
  acc0[15] = 0.0f;
  for (var Ridx0 = 0; Ridx0 < 16; Ridx0++) {
    var val0 = data2_16[Ridx0];
    var val1 = data3_16[Ridx0];
    var cast2 = (f16(val0));
    var cast3 = (f16(val1));
    for (var Ridx1 = 0; Ridx1 < 3; Ridx1++) {
      var cast4 = bitcast<u32>(Ridx1);
      var alu22 = (gidx1+bitcast<i32>((cast4<<4u)));
      var alu23 = (alu1+cast0+bitcast<i32>((cast4<<20u))+bitcast<i32>((bitcast<u32>(Ridx0)<<24u)));
      var alu24 = ((15<alu22)&(alu22<272));
      var alu25 = (alu4&alu5&alu24);
      var val2 = select((f16(0.0f)), data1_268435456[(alu23+-1052688)], alu25);
      var alu26 = ((Ridx0*27)+(Ridx1*9)+(gidx2*1728));
      var val3 = data4_6912[alu26];
      var alu27 = (alu5&alu24);
      var val4 = select((f16(0.0f)), data1_268435456[(alu23+-1052672)], alu27);
      var val5 = data4_6912[(alu26+1)];
      var alu28 = (alu3&alu5&alu24);
      var val6 = select((f16(0.0f)), data1_268435456[(alu23+-1052656)], alu28);
      var val7 = data4_6912[(alu26+2)];
      var alu29 = (alu4&alu24);
      var val8 = select((f16(0.0f)), data1_268435456[(alu23+-1048592)], alu29);
      var val9 = data4_6912[(alu26+3)];
      var val10 = select((f16(0.0f)), data1_268435456[(alu23+-1048576)], alu24);
      var val11 = data4_6912[(alu26+4)];
      var alu30 = (alu3&alu24);
      var val12 = select((f16(0.0f)), data1_268435456[(alu23+-1048560)], alu30);
      var val13 = data4_6912[(alu26+5)];
      var alu31 = (alu4&alu2&alu24);
      var val14 = select((f16(0.0f)), data1_268435456[(alu23+-1044496)], alu31);
      var val15 = data4_6912[(alu26+6)];
      var alu32 = (alu2&alu24);
      var val16 = select((f16(0.0f)), data1_268435456[(alu23+-1044480)], alu32);
      var val17 = data4_6912[(alu26+7)];
      var alu33 = (alu3&alu2&alu24);
      var val18 = select((f16(0.0f)), data1_268435456[(alu23+-1044464)], alu33);
      var val19 = data4_6912[(alu26+8)];
      var val20 = data4_6912[(alu26+432)];
      var val21 = data4_6912[(alu26+433)];
      var val22 = data4_6912[(alu26+434)];
      var val23 = data4_6912[(alu26+435)];
      var val24 = data4_6912[(alu26+436)];
      var val25 = data4_6912[(alu26+437)];
      var val26 = data4_6912[(alu26+438)];
      var val27 = data4_6912[(alu26+439)];
      var val28 = data4_6912[(alu26+440)];
      var val29 = data4_6912[(alu26+864)];
      var val30 = data4_6912[(alu26+865)];
      var val31 = data4_6912[(alu26+866)];
      var val32 = data4_6912[(alu26+867)];
      var val33 = data4_6912[(alu26+868)];
      var val34 = data4_6912[(alu26+869)];
      var val35 = data4_6912[(alu26+870)];
      var val36 = data4_6912[(alu26+871)];
      var val37 = data4_6912[(alu26+872)];
      var val38 = data4_6912[(alu26+1296)];
      var val39 = data4_6912[(alu26+1297)];
      var val40 = data4_6912[(alu26+1298)];
      var val41 = data4_6912[(alu26+1299)];
      var val42 = data4_6912[(alu26+1300)];
      var val43 = data4_6912[(alu26+1301)];
      var val44 = data4_6912[(alu26+1302)];
      var val45 = data4_6912[(alu26+1303)];
      var val46 = data4_6912[(alu26+1304)];
      var val47 = select((f16(0.0f)), data1_268435456[(alu23+-1052687)], alu25);
      var val48 = select((f16(0.0f)), data1_268435456[(alu23+-1052686)], alu25);
      var val49 = select((f16(0.0f)), data1_268435456[(alu23+-1052685)], alu25);
      var val50 = select((f16(0.0f)), data1_268435456[(alu23+-1052671)], alu27);
      var val51 = select((f16(0.0f)), data1_268435456[(alu23+-1052670)], alu27);
      var val52 = select((f16(0.0f)), data1_268435456[(alu23+-1052669)], alu27);
      var val53 = select((f16(0.0f)), data1_268435456[(alu23+-1052655)], alu28);
      var val54 = select((f16(0.0f)), data1_268435456[(alu23+-1052654)], alu28);
      var val55 = select((f16(0.0f)), data1_268435456[(alu23+-1052653)], alu28);
      var val56 = select((f16(0.0f)), data1_268435456[(alu23+-1048591)], alu29);
      var val57 = select((f16(0.0f)), data1_268435456[(alu23+-1048590)], alu29);
      var val58 = select((f16(0.0f)), data1_268435456[(alu23+-1048589)], alu29);
      var val59 = select((f16(0.0f)), data1_268435456[(alu23+-1048575)], alu24);
      var val60 = select((f16(0.0f)), data1_268435456[(alu23+-1048574)], alu24);
      var val61 = select((f16(0.0f)), data1_268435456[(alu23+-1048573)], alu24);
      var val62 = select((f16(0.0f)), data1_268435456[(alu23+-1048559)], alu30);
      var val63 = select((f16(0.0f)), data1_268435456[(alu23+-1048558)], alu30);
      var val64 = select((f16(0.0f)), data1_268435456[(alu23+-1048557)], alu30);
      var val65 = select((f16(0.0f)), data1_268435456[(alu23+-1044495)], alu31);
      var val66 = select((f16(0.0f)), data1_268435456[(alu23+-1044494)], alu31);
      var val67 = select((f16(0.0f)), data1_268435456[(alu23+-1044493)], alu31);
      var val68 = select((f16(0.0f)), data1_268435456[(alu23+-1044479)], alu32);
      var val69 = select((f16(0.0f)), data1_268435456[(alu23+-1044478)], alu32);
      var val70 = select((f16(0.0f)), data1_268435456[(alu23+-1044477)], alu32);
      var val71 = select((f16(0.0f)), data1_268435456[(alu23+-1044463)], alu33);
      var val72 = select((f16(0.0f)), data1_268435456[(alu23+-1044462)], alu33);
      var val73 = select((f16(0.0f)), data1_268435456[(alu23+-1044461)], alu33);
      var alu34 = ((val10-cast2)*cast3);
      var alu35 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu34+((f16(0.044715f))*alu34*alu34*alu34))*(f16(-2.302208198144325f))))))*alu34),alu24);
      var alu36 = ((val59-cast2)*cast3);
      var alu37 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu36+((f16(0.044715f))*alu36*alu36*alu36))*(f16(-2.302208198144325f))))))*alu36),alu24);
      var alu38 = ((val60-cast2)*cast3);
      var alu39 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu38+((f16(0.044715f))*alu38*alu38*alu38))*(f16(-2.302208198144325f))))))*alu38),alu24);
      var alu40 = ((val61-cast2)*cast3);
      var alu41 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu40+((f16(0.044715f))*alu40*alu40*alu40))*(f16(-2.302208198144325f))))))*alu40),alu24);
      var alu42 = ((val16-cast2)*cast3);
      var alu43 = (alu24&alu2);
      var alu44 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu42+((f16(0.044715f))*alu42*alu42*alu42))*(f16(-2.302208198144325f))))))*alu42),alu43);
      var alu45 = ((val68-cast2)*cast3);
      var alu46 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu45+((f16(0.044715f))*alu45*alu45*alu45))*(f16(-2.302208198144325f))))))*alu45),alu43);
      var alu47 = ((val69-cast2)*cast3);
      var alu48 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu47+((f16(0.044715f))*alu47*alu47*alu47))*(f16(-2.302208198144325f))))))*alu47),alu43);
      var alu49 = ((val70-cast2)*cast3);
      var alu50 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu49+((f16(0.044715f))*alu49*alu49*alu49))*(f16(-2.302208198144325f))))))*alu49),alu43);
      var alu51 = ((val12-cast2)*cast3);
      var alu52 = (alu24&alu3);
      var alu53 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu51+((f16(0.044715f))*alu51*alu51*alu51))*(f16(-2.302208198144325f))))))*alu51),alu52);
      var alu54 = ((val62-cast2)*cast3);
      var alu55 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu54+((f16(0.044715f))*alu54*alu54*alu54))*(f16(-2.302208198144325f))))))*alu54),alu52);
      var alu56 = ((val63-cast2)*cast3);
      var alu57 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu56+((f16(0.044715f))*alu56*alu56*alu56))*(f16(-2.302208198144325f))))))*alu56),alu52);
      var alu58 = ((val64-cast2)*cast3);
      var alu59 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu58+((f16(0.044715f))*alu58*alu58*alu58))*(f16(-2.302208198144325f))))))*alu58),alu52);
      var alu60 = ((val8-cast2)*cast3);
      var alu61 = (alu24&alu4);
      var alu62 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu60+((f16(0.044715f))*alu60*alu60*alu60))*(f16(-2.302208198144325f))))))*alu60),alu61);
      var alu63 = ((val56-cast2)*cast3);
      var alu64 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu63+((f16(0.044715f))*alu63*alu63*alu63))*(f16(-2.302208198144325f))))))*alu63),alu61);
      var alu65 = ((val57-cast2)*cast3);
      var alu66 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu65+((f16(0.044715f))*alu65*alu65*alu65))*(f16(-2.302208198144325f))))))*alu65),alu61);
      var alu67 = ((val58-cast2)*cast3);
      var alu68 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu67+((f16(0.044715f))*alu67*alu67*alu67))*(f16(-2.302208198144325f))))))*alu67),alu61);
      var alu69 = ((val4-cast2)*cast3);
      var alu70 = (alu24&alu5);
      var alu71 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu69+((f16(0.044715f))*alu69*alu69*alu69))*(f16(-2.302208198144325f))))))*alu69),alu70);
      var alu72 = ((val50-cast2)*cast3);
      var alu73 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu72+((f16(0.044715f))*alu72*alu72*alu72))*(f16(-2.302208198144325f))))))*alu72),alu70);
      var alu74 = ((val51-cast2)*cast3);
      var alu75 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu74+((f16(0.044715f))*alu74*alu74*alu74))*(f16(-2.302208198144325f))))))*alu74),alu70);
      var alu76 = ((val52-cast2)*cast3);
      var alu77 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu76+((f16(0.044715f))*alu76*alu76*alu76))*(f16(-2.302208198144325f))))))*alu76),alu70);
      var alu78 = ((val18-cast2)*cast3);
      var alu79 = (alu43&alu3);
      var alu80 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu78+((f16(0.044715f))*alu78*alu78*alu78))*(f16(-2.302208198144325f))))))*alu78),alu79);
      var alu81 = ((val71-cast2)*cast3);
      var alu82 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu81+((f16(0.044715f))*alu81*alu81*alu81))*(f16(-2.302208198144325f))))))*alu81),alu79);
      var alu83 = ((val72-cast2)*cast3);
      var alu84 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu83+((f16(0.044715f))*alu83*alu83*alu83))*(f16(-2.302208198144325f))))))*alu83),alu79);
      var alu85 = ((val73-cast2)*cast3);
      var alu86 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu85+((f16(0.044715f))*alu85*alu85*alu85))*(f16(-2.302208198144325f))))))*alu85),alu79);
      var alu87 = ((val14-cast2)*cast3);
      var alu88 = (alu43&alu4);
      var alu89 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu87+((f16(0.044715f))*alu87*alu87*alu87))*(f16(-2.302208198144325f))))))*alu87),alu88);
      var alu90 = ((val65-cast2)*cast3);
      var alu91 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu90+((f16(0.044715f))*alu90*alu90*alu90))*(f16(-2.302208198144325f))))))*alu90),alu88);
      var alu92 = ((val66-cast2)*cast3);
      var alu93 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu92+((f16(0.044715f))*alu92*alu92*alu92))*(f16(-2.302208198144325f))))))*alu92),alu88);
      var alu94 = ((val67-cast2)*cast3);
      var alu95 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu94+((f16(0.044715f))*alu94*alu94*alu94))*(f16(-2.302208198144325f))))))*alu94),alu88);
      var alu96 = ((val6-cast2)*cast3);
      var alu97 = (alu70&alu3);
      var alu98 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu96+((f16(0.044715f))*alu96*alu96*alu96))*(f16(-2.302208198144325f))))))*alu96),alu97);
      var alu99 = ((val53-cast2)*cast3);
      var alu100 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu99+((f16(0.044715f))*alu99*alu99*alu99))*(f16(-2.302208198144325f))))))*alu99),alu97);
      var alu101 = ((val54-cast2)*cast3);
      var alu102 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu101+((f16(0.044715f))*alu101*alu101*alu101))*(f16(-2.302208198144325f))))))*alu101),alu97);
      var alu103 = ((val55-cast2)*cast3);
      var alu104 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu103+((f16(0.044715f))*alu103*alu103*alu103))*(f16(-2.302208198144325f))))))*alu103),alu97);
      var alu105 = ((val2-cast2)*cast3);
      var alu106 = (alu70&alu4);
      var alu107 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu105+((f16(0.044715f))*alu105*alu105*alu105))*(f16(-2.302208198144325f))))))*alu105),alu106);
      var alu108 = ((val47-cast2)*cast3);
      var alu109 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu108+((f16(0.044715f))*alu108*alu108*alu108))*(f16(-2.302208198144325f))))))*alu108),alu106);
      var alu110 = ((val48-cast2)*cast3);
      var alu111 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu110+((f16(0.044715f))*alu110*alu110*alu110))*(f16(-2.302208198144325f))))))*alu110),alu106);
      var alu112 = ((val49-cast2)*cast3);
      var alu113 = select((f16(0.0f)),((1/((f16(1.0f))+exp2(((alu112+((f16(0.044715f))*alu112*alu112*alu112))*(f16(-2.302208198144325f))))))*alu112),alu106);
      acc0[0] = (acc0[0]+(f32((alu107*val3)))+(f32((alu71*val5)))+(f32((alu98*val7)))+(f32((alu62*val9)))+(f32((alu35*val11)))+(f32((alu53*val13)))+(f32((alu89*val15)))+(f32((alu44*val17)))+(f32((alu80*val19))));
      acc0[1] = (acc0[1]+(f32((alu107*val20)))+(f32((alu71*val21)))+(f32((alu98*val22)))+(f32((alu62*val23)))+(f32((alu35*val24)))+(f32((alu53*val25)))+(f32((alu89*val26)))+(f32((alu44*val27)))+(f32((alu80*val28))));
      acc0[2] = (acc0[2]+(f32((alu107*val29)))+(f32((alu71*val30)))+(f32((alu98*val31)))+(f32((alu62*val32)))+(f32((alu35*val33)))+(f32((alu53*val34)))+(f32((alu89*val35)))+(f32((alu44*val36)))+(f32((alu80*val37))));
      acc0[3] = (acc0[3]+(f32((alu107*val38)))+(f32((alu71*val39)))+(f32((alu98*val40)))+(f32((alu62*val41)))+(f32((alu35*val42)))+(f32((alu53*val43)))+(f32((alu89*val44)))+(f32((alu44*val45)))+(f32((alu80*val46))));
      acc0[4] = (acc0[4]+(f32((alu109*val3)))+(f32((alu73*val5)))+(f32((alu100*val7)))+(f32((alu64*val9)))+(f32((alu37*val11)))+(f32((alu55*val13)))+(f32((alu91*val15)))+(f32((alu46*val17)))+(f32((alu82*val19))));
      acc0[5] = (acc0[5]+(f32((alu109*val20)))+(f32((alu73*val21)))+(f32((alu100*val22)))+(f32((alu64*val23)))+(f32((alu37*val24)))+(f32((alu55*val25)))+(f32((alu91*val26)))+(f32((alu46*val27)))+(f32((alu82*val28))));
      acc0[6] = (acc0[6]+(f32((alu109*val29)))+(f32((alu73*val30)))+(f32((alu100*val31)))+(f32((alu64*val32)))+(f32((alu37*val33)))+(f32((alu55*val34)))+(f32((alu91*val35)))+(f32((alu46*val36)))+(f32((alu82*val37))));
      acc0[7] = (acc0[7]+(f32((alu109*val38)))+(f32((alu73*val39)))+(f32((alu100*val40)))+(f32((alu64*val41)))+(f32((alu37*val42)))+(f32((alu55*val43)))+(f32((alu91*val44)))+(f32((alu46*val45)))+(f32((alu82*val46))));
      acc0[8] = (acc0[8]+(f32((alu111*val3)))+(f32((alu75*val5)))+(f32((alu102*val7)))+(f32((alu66*val9)))+(f32((alu39*val11)))+(f32((alu57*val13)))+(f32((alu93*val15)))+(f32((alu48*val17)))+(f32((alu84*val19))));
      acc0[9] = (acc0[9]+(f32((alu111*val20)))+(f32((alu75*val21)))+(f32((alu102*val22)))+(f32((alu66*val23)))+(f32((alu39*val24)))+(f32((alu57*val25)))+(f32((alu93*val26)))+(f32((alu48*val27)))+(f32((alu84*val28))));
      acc0[10] = (acc0[10]+(f32((alu111*val29)))+(f32((alu75*val30)))+(f32((alu102*val31)))+(f32((alu66*val32)))+(f32((alu39*val33)))+(f32((alu57*val34)))+(f32((alu93*val35)))+(f32((alu48*val36)))+(f32((alu84*val37))));
      acc0[11] = (acc0[11]+(f32((alu111*val38)))+(f32((alu75*val39)))+(f32((alu102*val40)))+(f32((alu66*val41)))+(f32((alu39*val42)))+(f32((alu57*val43)))+(f32((alu93*val44)))+(f32((alu48*val45)))+(f32((alu84*val46))));
      acc0[12] = (acc0[12]+(f32((alu113*val3)))+(f32((alu77*val5)))+(f32((alu104*val7)))+(f32((alu68*val9)))+(f32((alu41*val11)))+(f32((alu59*val13)))+(f32((alu95*val15)))+(f32((alu50*val17)))+(f32((alu86*val19))));
      acc0[13] = (acc0[13]+(f32((alu113*val20)))+(f32((alu77*val21)))+(f32((alu104*val22)))+(f32((alu68*val23)))+(f32((alu41*val24)))+(f32((alu59*val25)))+(f32((alu95*val26)))+(f32((alu50*val27)))+(f32((alu86*val28))));
      acc0[14] = (acc0[14]+(f32((alu113*val29)))+(f32((alu77*val30)))+(f32((alu104*val31)))+(f32((alu68*val32)))+(f32((alu41*val33)))+(f32((alu59*val34)))+(f32((alu95*val35)))+(f32((alu50*val36)))+(f32((alu86*val37))));
      acc0[15] = (acc0[15]+(f32((alu113*val38)))+(f32((alu77*val39)))+(f32((alu104*val40)))+(f32((alu68*val41)))+(f32((alu41*val42)))+(f32((alu59*val43)))+(f32((alu95*val44)))+(f32((alu50*val45)))+(f32((alu86*val46))));
    }
  }
  var alu132 = (alu1+cast0+bitcast<i32>((bitcast<u32>(gidx2)<<26u)));
  data0_268435456[alu132] = (f16(acc0[0]));
  data0_268435456[(alu132+1)] = (f16(acc0[4]));
  data0_268435456[(alu132+2)] = (f16(acc0[8]));
  data0_268435456[(alu132+3)] = (f16(acc0[12]));
  data0_268435456[(alu132+16777216)] = (f16(acc0[1]));
  data0_268435456[(alu132+16777217)] = (f16(acc0[5]));
  data0_268435456[(alu132+16777218)] = (f16(acc0[9]));
  data0_268435456[(alu132+16777219)] = (f16(acc0[13]));
  data0_268435456[(alu132+33554432)] = (f16(acc0[2]));
  data0_268435456[(alu132+33554433)] = (f16(acc0[6]));
  data0_268435456[(alu132+33554434)] = (f16(acc0[10]));
  data0_268435456[(alu132+33554435)] = (f16(acc0[14]));
  data0_268435456[(alu132+50331648)] = (f16(acc0[3]));
  data0_268435456[(alu132+50331649)] = (f16(acc0[7]));
  data0_268435456[(alu132+50331650)] = (f16(acc0[11]));
  data0_268435456[(alu132+50331651)] = (f16(acc0[15]));
}`,C=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_268435456:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3_16:array<f32>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32768 */
  var gidx1 = i32(gindex.y); /* 16 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var cast0 = bitcast<u32>((gidx1&1));
  var alu0 = (bitcast<i32>((bitcast<u32>(gidx0)<<9u))+bitcast<i32>((bitcast<u32>((gidx1>>1u))<<6u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u))+bitcast<i32>((bitcast<u32>(lidx0)<<24u))+bitcast<i32>((cast0<<27u)));
  var val0 = data1_268435456[alu0];
  var alu1 = (alu0+1);
  var val1 = data1_268435456[alu1];
  var alu2 = (alu0+2);
  var val2 = data1_268435456[alu2];
  var alu3 = (alu0+3);
  var val3 = data1_268435456[alu3];
  var alu4 = (lidx0+bitcast<i32>((cast0<<3u)));
  var val4 = data2_16[alu4];
  var val5 = data3_16[alu4];
  var cast1 = (f16(val4));
  var cast2 = (f16(val5));
  var alu5 = ((val0-cast1)*cast2);
  var alu6 = ((val1-cast1)*cast2);
  var alu7 = ((val2-cast1)*cast2);
  var alu8 = ((val3-cast1)*cast2);
  data0_268435456[alu0] = ((1/((f16(1.0f))+exp2(((alu5+((f16(0.044715f))*alu5*alu5*alu5))*(f16(-2.302208198144325f))))))*alu5);
  data0_268435456[alu1] = ((1/((f16(1.0f))+exp2(((alu6+((f16(0.044715f))*alu6*alu6*alu6))*(f16(-2.302208198144325f))))))*alu6);
  data0_268435456[alu2] = ((1/((f16(1.0f))+exp2(((alu7+((f16(0.044715f))*alu7*alu7*alu7))*(f16(-2.302208198144325f))))))*alu7);
  data0_268435456[alu3] = ((1/((f16(1.0f))+exp2(((alu8+((f16(0.044715f))*alu8*alu8*alu8))*(f16(-2.302208198144325f))))))*alu8);
}`,T=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_33554432:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_268435456:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_32:array<f16>;
@group(0) @binding(4)var<storage,read_write>data3_2:array<f16>;
@compute @workgroup_size(2,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32768 */
  var gidx1 = i32(gindex.y); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = (bitcast<i32>((bitcast<u32>(gidx0)<<9u))+bitcast<i32>((bitcast<u32>(gidx1)<<6u))+bitcast<i32>((bitcast<u32>(lidx1)<<2u)));
  var val0 = data1_268435456[alu0];
  var lidx0 = i32(lindex.x); /* 2 */
  var cast0 = bitcast<u32>(lidx0);
  var cast1 = bitcast<i32>((cast0<<4u));
  var val1 = data2_32[cast1];
  var val2 = data1_268435456[(alu0+1)];
  var val3 = data1_268435456[(alu0+2)];
  var val4 = data1_268435456[(alu0+3)];
  var val5 = data1_268435456[(alu0+16777216)];
  var val6 = data2_32[(cast1+1)];
  var val7 = data1_268435456[(alu0+16777217)];
  var val8 = data1_268435456[(alu0+16777218)];
  var val9 = data1_268435456[(alu0+16777219)];
  var val10 = data1_268435456[(alu0+33554432)];
  var val11 = data2_32[(cast1+2)];
  var val12 = data1_268435456[(alu0+33554433)];
  var val13 = data1_268435456[(alu0+33554434)];
  var val14 = data1_268435456[(alu0+33554435)];
  var val15 = data1_268435456[(alu0+50331648)];
  var val16 = data2_32[(cast1+3)];
  var val17 = data1_268435456[(alu0+50331649)];
  var val18 = data1_268435456[(alu0+50331650)];
  var val19 = data1_268435456[(alu0+50331651)];
  var val20 = data1_268435456[(alu0+67108864)];
  var val21 = data2_32[(cast1+4)];
  var val22 = data1_268435456[(alu0+67108865)];
  var val23 = data1_268435456[(alu0+67108866)];
  var val24 = data1_268435456[(alu0+67108867)];
  var val25 = data1_268435456[(alu0+83886080)];
  var val26 = data2_32[(cast1+5)];
  var val27 = data1_268435456[(alu0+83886081)];
  var val28 = data1_268435456[(alu0+83886082)];
  var val29 = data1_268435456[(alu0+83886083)];
  var val30 = data1_268435456[(alu0+100663296)];
  var val31 = data2_32[(cast1+6)];
  var val32 = data1_268435456[(alu0+100663297)];
  var val33 = data1_268435456[(alu0+100663298)];
  var val34 = data1_268435456[(alu0+100663299)];
  var val35 = data1_268435456[(alu0+117440512)];
  var val36 = data2_32[(cast1+7)];
  var val37 = data1_268435456[(alu0+117440513)];
  var val38 = data1_268435456[(alu0+117440514)];
  var val39 = data1_268435456[(alu0+117440515)];
  var val40 = data1_268435456[(alu0+134217728)];
  var val41 = data2_32[(cast1+8)];
  var val42 = data1_268435456[(alu0+134217729)];
  var val43 = data1_268435456[(alu0+134217730)];
  var val44 = data1_268435456[(alu0+134217731)];
  var val45 = data1_268435456[(alu0+150994944)];
  var val46 = data2_32[(cast1+9)];
  var val47 = data1_268435456[(alu0+150994945)];
  var val48 = data1_268435456[(alu0+150994946)];
  var val49 = data1_268435456[(alu0+150994947)];
  var val50 = data1_268435456[(alu0+167772160)];
  var val51 = data2_32[(cast1+10)];
  var val52 = data1_268435456[(alu0+167772161)];
  var val53 = data1_268435456[(alu0+167772162)];
  var val54 = data1_268435456[(alu0+167772163)];
  var val55 = data1_268435456[(alu0+184549376)];
  var val56 = data2_32[(cast1+11)];
  var val57 = data1_268435456[(alu0+184549377)];
  var val58 = data1_268435456[(alu0+184549378)];
  var val59 = data1_268435456[(alu0+184549379)];
  var val60 = data1_268435456[(alu0+201326592)];
  var val61 = data2_32[(cast1+12)];
  var val62 = data1_268435456[(alu0+201326593)];
  var val63 = data1_268435456[(alu0+201326594)];
  var val64 = data1_268435456[(alu0+201326595)];
  var val65 = data1_268435456[(alu0+218103808)];
  var val66 = data2_32[(cast1+13)];
  var val67 = data1_268435456[(alu0+218103809)];
  var val68 = data1_268435456[(alu0+218103810)];
  var val69 = data1_268435456[(alu0+218103811)];
  var val70 = data1_268435456[(alu0+234881024)];
  var val71 = data2_32[(cast1+14)];
  var val72 = data1_268435456[(alu0+234881025)];
  var val73 = data1_268435456[(alu0+234881026)];
  var val74 = data1_268435456[(alu0+234881027)];
  var val75 = data1_268435456[(alu0+251658240)];
  var val76 = data2_32[(cast1+15)];
  var val77 = data3_2[lidx0];
  var val78 = data1_268435456[(alu0+251658241)];
  var val79 = data1_268435456[(alu0+251658242)];
  var val80 = data1_268435456[(alu0+251658243)];
  var alu1 = (alu0+bitcast<i32>((cast0<<24u)));
  data0_33554432[alu1] = ((f16(((f32((val0*val1)))+(f32((val5*val6)))+(f32((val10*val11)))+(f32((val15*val16)))+(f32((val20*val21)))+(f32((val25*val26)))+(f32((val30*val31)))+(f32((val35*val36)))+(f32((val40*val41)))+(f32((val45*val46)))+(f32((val50*val51)))+(f32((val55*val56)))+(f32((val60*val61)))+(f32((val65*val66)))+(f32((val70*val71)))+(f32((val75*val76))))))+val77);
  data0_33554432[(alu1+1)] = ((f16(((f32((val2*val1)))+(f32((val7*val6)))+(f32((val12*val11)))+(f32((val17*val16)))+(f32((val22*val21)))+(f32((val27*val26)))+(f32((val32*val31)))+(f32((val37*val36)))+(f32((val42*val41)))+(f32((val47*val46)))+(f32((val52*val51)))+(f32((val57*val56)))+(f32((val62*val61)))+(f32((val67*val66)))+(f32((val72*val71)))+(f32((val78*val76))))))+val77);
  data0_33554432[(alu1+2)] = ((f16(((f32((val3*val1)))+(f32((val8*val6)))+(f32((val13*val11)))+(f32((val18*val16)))+(f32((val23*val21)))+(f32((val28*val26)))+(f32((val33*val31)))+(f32((val38*val36)))+(f32((val43*val41)))+(f32((val48*val46)))+(f32((val53*val51)))+(f32((val58*val56)))+(f32((val63*val61)))+(f32((val68*val66)))+(f32((val73*val71)))+(f32((val79*val76))))))+val77);
  data0_33554432[(alu1+3)] = ((f16(((f32((val4*val1)))+(f32((val9*val6)))+(f32((val14*val11)))+(f32((val19*val16)))+(f32((val24*val21)))+(f32((val29*val26)))+(f32((val34*val31)))+(f32((val39*val36)))+(f32((val44*val41)))+(f32((val49*val46)))+(f32((val54*val51)))+(f32((val59*val56)))+(f32((val64*val61)))+(f32((val69*val66)))+(f32((val74*val71)))+(f32((val80*val76))))))+val77);
}`,B=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_16777216:array<f16>;
@group(0) @binding(2)var<storage,read_write>data1_33554432:array<f16>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32768 */
  var gidx1 = i32(gindex.y); /* 4 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = (bitcast<i32>((bitcast<u32>(gidx0)<<9u))+bitcast<i32>((bitcast<u32>(gidx1)<<7u))+bitcast<i32>((bitcast<u32>(lidx0)<<2u)));
  var val0 = data1_33554432[alu0];
  var alu1 = (alu0+1);
  var val1 = data1_33554432[alu1];
  var alu2 = (alu0+2);
  var val2 = data1_33554432[alu2];
  var alu3 = (alu0+3);
  var val3 = data1_33554432[alu3];
  var val4 = data1_33554432[(alu0+16777216)];
  var val5 = data1_33554432[(alu0+16777217)];
  var val6 = data1_33554432[(alu0+16777218)];
  var val7 = data1_33554432[(alu0+16777219)];
  var alu4 = select(val0,val4,(val0<val4));
  var alu5 = select(val1,val5,(val1<val5));
  var alu6 = select(val2,val6,(val2<val6));
  var alu7 = select(val3,val7,(val3<val7));
  data0_16777216[alu0] = alu4;
  data0_16777216[alu1] = alu5;
  data0_16777216[alu2] = alu6;
  data0_16777216[alu3] = alu7;
}`,k=`enable f16;
fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0_16777216:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1_33554432:array<f16>;
@group(0) @binding(3)var<storage,read_write>data2_16777216:array<f16>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32768 */
  var gidx1 = i32(gindex.y); /* 4 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = (bitcast<i32>((bitcast<u32>(gidx0)<<9u))+bitcast<i32>((bitcast<u32>(gidx1)<<7u))+bitcast<i32>((bitcast<u32>(lidx0)<<2u)));
  var val0 = data1_33554432[alu0];
  var val1 = data2_16777216[alu0];
  var alu1 = (alu0+1);
  var val2 = data1_33554432[alu1];
  var alu2 = (alu0+2);
  var val3 = data1_33554432[alu2];
  var alu3 = (alu0+3);
  var val4 = data1_33554432[alu3];
  var val5 = data1_33554432[(alu0+16777216)];
  var val6 = data2_16777216[alu1];
  var val7 = data1_33554432[(alu0+16777217)];
  var val8 = data2_16777216[alu2];
  var val9 = data1_33554432[(alu0+16777218)];
  var val10 = data2_16777216[alu3];
  var val11 = data1_33554432[(alu0+16777219)];
  var cast0 = (i32((val5==val1)));
  var cast1 = (i32((val7==val6)));
  var cast2 = (i32((val9==val8)));
  var cast3 = (i32((val11==val10)));
  var cast4 = bitcast<i32>((bitcast<u32>((i32((val0==val1))))<<1u));
  var alu4 = select(cast4,cast0,(cast4<cast0));
  var cast5 = bitcast<i32>((bitcast<u32>((i32((val2==val6))))<<1u));
  var alu5 = select(cast5,cast1,(cast5<cast1));
  var cast6 = bitcast<i32>((bitcast<u32>((i32((val3==val8))))<<1u));
  var alu6 = select(cast6,cast2,(cast6<cast2));
  var cast7 = bitcast<i32>((bitcast<u32>((i32((val4==val10))))<<1u));
  var alu7 = select(cast7,cast3,(cast7<cast3));
  data0_16777216[alu0] = (f32((2-alu4)));
  data0_16777216[alu1] = (f32((2-alu5)));
  data0_16777216[alu2] = (f32((2-alu6)));
  data0_16777216[alu3] = (f32((2-alu7)));
}`,F=(i,A)=>D(null,null,function*(){const x=a(A),m=r(i),p=[i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]})],G=t(i,33554432),M=n(i,864,l(A,x["m.model.0.weight"])),N=n(i,13824,l(A,x["m.model.3.weight"])),L=n(i,13824,l(A,x["m.model.6.weight"])),W=n(i,13824,l(A,x["m.model.9.weight"])),I=n(i,13824,l(A,x["m.model.12.weight"])),q=n(i,13824,l(A,x["m.model.15.weight"])),Z=n(i,13824,l(A,x["m.model.18.weight"])),H=n(i,13824,l(A,x["m.model.21.weight"])),ra=n(i,13824,l(A,x["m.model.24.weight"])),ma=n(i,13824,l(A,x["m.model.27.weight"])),xa=n(i,13824,l(A,x["m.model.30.weight"])),V=n(i,13824,l(A,x["m.model.33.weight"])),Q=n(i,13824,l(A,x["m.model.36.weight"])),oa=n(i,13824,l(A,x["m.model.39.weight"])),ta=n(i,13824,l(A,x["m.model.42.weight"])),na=n(i,13824,l(A,x["m.model.45.weight"])),da=n(i,13824,l(A,x["m.model.48.weight"])),fa=n(i,13824,l(A,x["m.model.51.weight"])),sa=n(i,13824,l(A,x["m.model.54.weight"])),ya=n(i,13824,l(A,x["m.model.57.weight"])),ka=n(i,13824,l(A,x["m.model.60.weight"])),ca=n(i,13824,l(A,x["m.model.63.weight"])),Pa=n(i,13824,l(A,x["m.model.66.weight"])),ea=n(i,13824,l(A,x["m.model.69.weight"])),va=n(i,13824,l(A,x["m.model.72.weight"])),Ga=n(i,64,l(A,x["m.seq_conv_argmax.weight"])),pa=n(i,4,l(A,x["m.seq_conv_argmax.bias"])),ba=t(i,67108864),f=t(i,536870912),h=t(i,4194304),S=t(i,536870912),O=t(i,536870912),Sa=i.createBuffer({size:G.size,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.MAP_WRITE}),Ua=i.createBuffer({size:ba.size,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),wa=[d,u,o,v,b,o,P,g,u,o,v,b,o,P,y,u,o,v,b,o,P,c,u,o,v,b,o,P,U,u,o,v,b,o,P,w,u,o,v,b,o,P,g,u,o,v,b,o,P,y,u,o,v,b,o,P,c,u,o,v,b,o,P,U,u,o,v,b,o,P,w,u,o,v,b,o,P,g,u,o,v,b,o,P,y,u,o,v,b,o,P,c,u,o,v,b,o,P,U,u,o,v,b,o,P,w,u,o,v,b,o,P,g,u,o,v,b,o,P,y,u,o,v,b,o,P,c,u,o,v,b,o,P,U,u,o,v,b,o,P,w,u,o,v,b,o,P,g,u,o,v,b,o,P,y,u,o,v,b,o,P,c,u,o,v,b,o,P,U,u,o,v,b,o,P,C,T,B,k],_=yield Promise.all(wa.map((la,s)=>D(null,null,function*(){return yield i.createComputePipelineAsync({layout:i.createPipelineLayout({bindGroupLayouts:[p[s]]}),compute:{module:i.createShaderModule({code:la}),entryPoint:"main"}})})));return la=>D(null,null,function*(){let s=i.createCommandEncoder();yield Sa.mapAsync(GPUMapMode.WRITE),new Float16Array(Sa.getMappedRange()).set(la),Sa.unmap(),s.copyBufferToBuffer(Sa,0,G,0,Sa.size),e(i,s,_[0],p[0],m,[f,G,M],[128,256,4]),e(i,s,_[1],p[1],m,[h,f],[8192,1,1]),e(i,s,_[2],p[2],m,[S,h],[32,1,1]),e(i,s,_[3],p[3],m,[h,S],[16,1,1]),e(i,s,_[4],p[4],m,[S,f,h],[1024,2,1]),e(i,s,_[5],p[5],m,[O,S],[32,1,1]),e(i,s,_[6],p[6],m,[S,O],[16,1,1]),e(i,s,_[7],p[7],m,[O,f,h,S,N],[128,256,4]),e(i,s,_[8],p[8],m,[f,O],[8192,1,1]),e(i,s,_[9],p[9],m,[h,f],[32,1,1]),e(i,s,_[10],p[10],m,[f,h],[16,1,1]),e(i,s,_[11],p[11],m,[h,O,f],[1024,2,1]),e(i,s,_[12],p[12],m,[S,h],[32,1,1]),e(i,s,_[13],p[13],m,[h,S],[16,1,1]),e(i,s,_[14],p[14],m,[S,O,f,h,L],[128,256,4]),e(i,s,_[15],p[15],m,[f,S],[8192,1,1]),e(i,s,_[16],p[16],m,[h,f],[32,1,1]),e(i,s,_[17],p[17],m,[f,h],[16,1,1]),e(i,s,_[18],p[18],m,[h,S,f],[1024,2,1]),e(i,s,_[19],p[19],m,[O,h],[32,1,1]),e(i,s,_[20],p[20],m,[h,O],[16,1,1]),e(i,s,_[21],p[21],m,[O,S,f,h,W],[128,256,4]),e(i,s,_[22],p[22],m,[f,O],[8192,1,1]),e(i,s,_[23],p[23],m,[h,f],[32,1,1]),e(i,s,_[24],p[24],m,[f,h],[16,1,1]),e(i,s,_[25],p[25],m,[h,O,f],[1024,2,1]),e(i,s,_[26],p[26],m,[S,h],[32,1,1]),e(i,s,_[27],p[27],m,[h,S],[16,1,1]),e(i,s,_[28],p[28],m,[S,O,f,h,I],[128,256,4]),e(i,s,_[29],p[29],m,[f,S],[8192,1,1]),e(i,s,_[30],p[30],m,[h,f],[32,1,1]),e(i,s,_[31],p[31],m,[f,h],[16,1,1]),e(i,s,_[32],p[32],m,[h,S,f],[1024,2,1]),e(i,s,_[33],p[33],m,[O,h],[32,1,1]),e(i,s,_[34],p[34],m,[h,O],[16,1,1]),e(i,s,_[35],p[35],m,[O,S,f,h,q],[128,256,4]),e(i,s,_[36],p[36],m,[f,O],[8192,1,1]),e(i,s,_[37],p[37],m,[h,f],[32,1,1]),e(i,s,_[38],p[38],m,[f,h],[16,1,1]),e(i,s,_[39],p[39],m,[h,O,f],[1024,2,1]),e(i,s,_[40],p[40],m,[S,h],[32,1,1]),e(i,s,_[41],p[41],m,[h,S],[16,1,1]),e(i,s,_[42],p[42],m,[S,O,f,h,Z],[128,256,4]),e(i,s,_[43],p[43],m,[f,S],[8192,1,1]),e(i,s,_[44],p[44],m,[h,f],[32,1,1]),e(i,s,_[45],p[45],m,[f,h],[16,1,1]),e(i,s,_[46],p[46],m,[h,S,f],[1024,2,1]),e(i,s,_[47],p[47],m,[O,h],[32,1,1]),e(i,s,_[48],p[48],m,[h,O],[16,1,1]),e(i,s,_[49],p[49],m,[O,S,f,h,H],[128,256,4]),e(i,s,_[50],p[50],m,[f,O],[8192,1,1]),e(i,s,_[51],p[51],m,[h,f],[32,1,1]),e(i,s,_[52],p[52],m,[f,h],[16,1,1]),e(i,s,_[53],p[53],m,[h,O,f],[1024,2,1]),e(i,s,_[54],p[54],m,[S,h],[32,1,1]),e(i,s,_[55],p[55],m,[h,S],[16,1,1]),e(i,s,_[56],p[56],m,[S,O,f,h,ra],[128,256,4]),e(i,s,_[57],p[57],m,[f,S],[8192,1,1]),e(i,s,_[58],p[58],m,[h,f],[32,1,1]),e(i,s,_[59],p[59],m,[f,h],[16,1,1]),e(i,s,_[60],p[60],m,[h,S,f],[1024,2,1]),e(i,s,_[61],p[61],m,[O,h],[32,1,1]),e(i,s,_[62],p[62],m,[h,O],[16,1,1]),e(i,s,_[63],p[63],m,[O,S,f,h,ma],[128,256,4]),e(i,s,_[64],p[64],m,[f,O],[8192,1,1]),e(i,s,_[65],p[65],m,[h,f],[32,1,1]),e(i,s,_[66],p[66],m,[f,h],[16,1,1]),e(i,s,_[67],p[67],m,[h,O,f],[1024,2,1]),e(i,s,_[68],p[68],m,[S,h],[32,1,1]),e(i,s,_[69],p[69],m,[h,S],[16,1,1]),e(i,s,_[70],p[70],m,[S,O,f,h,xa],[128,256,4]),e(i,s,_[71],p[71],m,[f,S],[8192,1,1]),e(i,s,_[72],p[72],m,[h,f],[32,1,1]),e(i,s,_[73],p[73],m,[f,h],[16,1,1]),e(i,s,_[74],p[74],m,[h,S,f],[1024,2,1]),e(i,s,_[75],p[75],m,[O,h],[32,1,1]),e(i,s,_[76],p[76],m,[h,O],[16,1,1]),e(i,s,_[77],p[77],m,[O,S,f,h,V],[128,256,4]),e(i,s,_[78],p[78],m,[f,O],[8192,1,1]),e(i,s,_[79],p[79],m,[h,f],[32,1,1]),e(i,s,_[80],p[80],m,[f,h],[16,1,1]),e(i,s,_[81],p[81],m,[h,O,f],[1024,2,1]),e(i,s,_[82],p[82],m,[S,h],[32,1,1]),e(i,s,_[83],p[83],m,[h,S],[16,1,1]),e(i,s,_[84],p[84],m,[S,O,f,h,Q],[128,256,4]),e(i,s,_[85],p[85],m,[f,S],[8192,1,1]),e(i,s,_[86],p[86],m,[h,f],[32,1,1]),e(i,s,_[87],p[87],m,[f,h],[16,1,1]),e(i,s,_[88],p[88],m,[h,S,f],[1024,2,1]),e(i,s,_[89],p[89],m,[O,h],[32,1,1]),e(i,s,_[90],p[90],m,[h,O],[16,1,1]),e(i,s,_[91],p[91],m,[O,S,f,h,oa],[128,256,4]),e(i,s,_[92],p[92],m,[f,O],[8192,1,1]),e(i,s,_[93],p[93],m,[h,f],[32,1,1]),e(i,s,_[94],p[94],m,[f,h],[16,1,1]),e(i,s,_[95],p[95],m,[h,O,f],[1024,2,1]),e(i,s,_[96],p[96],m,[S,h],[32,1,1]),e(i,s,_[97],p[97],m,[h,S],[16,1,1]),e(i,s,_[98],p[98],m,[S,O,f,h,ta],[128,256,4]),e(i,s,_[99],p[99],m,[f,S],[8192,1,1]),e(i,s,_[100],p[100],m,[h,f],[32,1,1]),e(i,s,_[101],p[101],m,[f,h],[16,1,1]),e(i,s,_[102],p[102],m,[h,S,f],[1024,2,1]),e(i,s,_[103],p[103],m,[O,h],[32,1,1]),e(i,s,_[104],p[104],m,[h,O],[16,1,1]),e(i,s,_[105],p[105],m,[O,S,f,h,na],[128,256,4]),e(i,s,_[106],p[106],m,[f,O],[8192,1,1]),e(i,s,_[107],p[107],m,[h,f],[32,1,1]),e(i,s,_[108],p[108],m,[f,h],[16,1,1]),e(i,s,_[109],p[109],m,[h,O,f],[1024,2,1]),e(i,s,_[110],p[110],m,[S,h],[32,1,1]),e(i,s,_[111],p[111],m,[h,S],[16,1,1]),e(i,s,_[112],p[112],m,[S,O,f,h,da],[128,256,4]),e(i,s,_[113],p[113],m,[f,S],[8192,1,1]),e(i,s,_[114],p[114],m,[h,f],[32,1,1]),e(i,s,_[115],p[115],m,[f,h],[16,1,1]),e(i,s,_[116],p[116],m,[h,S,f],[1024,2,1]),e(i,s,_[117],p[117],m,[O,h],[32,1,1]),e(i,s,_[118],p[118],m,[h,O],[16,1,1]),e(i,s,_[119],p[119],m,[O,S,f,h,fa],[128,256,4]),e(i,s,_[120],p[120],m,[f,O],[8192,1,1]),e(i,s,_[121],p[121],m,[h,f],[32,1,1]),e(i,s,_[122],p[122],m,[f,h],[16,1,1]),e(i,s,_[123],p[123],m,[h,O,f],[1024,2,1]),e(i,s,_[124],p[124],m,[S,h],[32,1,1]),e(i,s,_[125],p[125],m,[h,S],[16,1,1]),e(i,s,_[126],p[126],m,[S,O,f,h,sa],[128,256,4]),e(i,s,_[127],p[127],m,[f,S],[8192,1,1]),e(i,s,_[128],p[128],m,[h,f],[32,1,1]),e(i,s,_[129],p[129],m,[f,h],[16,1,1]),e(i,s,_[130],p[130],m,[h,S,f],[1024,2,1]),e(i,s,_[131],p[131],m,[O,h],[32,1,1]),e(i,s,_[132],p[132],m,[h,O],[16,1,1]),e(i,s,_[133],p[133],m,[O,S,f,h,ya],[128,256,4]),e(i,s,_[134],p[134],m,[f,O],[8192,1,1]),e(i,s,_[135],p[135],m,[h,f],[32,1,1]),e(i,s,_[136],p[136],m,[f,h],[16,1,1]),e(i,s,_[137],p[137],m,[h,O,f],[1024,2,1]),e(i,s,_[138],p[138],m,[S,h],[32,1,1]),e(i,s,_[139],p[139],m,[h,S],[16,1,1]),e(i,s,_[140],p[140],m,[S,O,f,h,ka],[128,256,4]),e(i,s,_[141],p[141],m,[f,S],[8192,1,1]),e(i,s,_[142],p[142],m,[h,f],[32,1,1]),e(i,s,_[143],p[143],m,[f,h],[16,1,1]),e(i,s,_[144],p[144],m,[h,S,f],[1024,2,1]),e(i,s,_[145],p[145],m,[O,h],[32,1,1]),e(i,s,_[146],p[146],m,[h,O],[16,1,1]),e(i,s,_[147],p[147],m,[O,S,f,h,ca],[128,256,4]),e(i,s,_[148],p[148],m,[f,O],[8192,1,1]),e(i,s,_[149],p[149],m,[h,f],[32,1,1]),e(i,s,_[150],p[150],m,[f,h],[16,1,1]),e(i,s,_[151],p[151],m,[h,O,f],[1024,2,1]),e(i,s,_[152],p[152],m,[S,h],[32,1,1]),e(i,s,_[153],p[153],m,[h,S],[16,1,1]),e(i,s,_[154],p[154],m,[S,O,f,h,Pa],[128,256,4]),e(i,s,_[155],p[155],m,[f,S],[8192,1,1]),e(i,s,_[156],p[156],m,[h,f],[32,1,1]),e(i,s,_[157],p[157],m,[f,h],[16,1,1]),e(i,s,_[158],p[158],m,[h,S,f],[1024,2,1]),e(i,s,_[159],p[159],m,[O,h],[32,1,1]),e(i,s,_[160],p[160],m,[h,O],[16,1,1]),e(i,s,_[161],p[161],m,[O,S,f,h,ea],[128,256,4]),e(i,s,_[162],p[162],m,[f,O],[8192,1,1]),e(i,s,_[163],p[163],m,[h,f],[32,1,1]),e(i,s,_[164],p[164],m,[f,h],[16,1,1]),e(i,s,_[165],p[165],m,[h,O,f],[1024,2,1]),e(i,s,_[166],p[166],m,[S,h],[32,1,1]),e(i,s,_[167],p[167],m,[h,S],[16,1,1]),e(i,s,_[168],p[168],m,[S,O,f,h,va],[128,256,4]),e(i,s,_[169],p[169],m,[f,S],[8192,1,1]),e(i,s,_[170],p[170],m,[h,f],[32,1,1]),e(i,s,_[171],p[171],m,[f,h],[16,1,1]),e(i,s,_[172],p[172],m,[h,S,f],[1024,2,1]),e(i,s,_[173],p[173],m,[O,h],[32,1,1]),e(i,s,_[174],p[174],m,[h,O],[16,1,1]),e(i,s,_[175],p[175],m,[O,S,f,h],[32768,16,1]),e(i,s,_[176],p[176],m,[f,O,Ga,pa],[32768,8,1]),e(i,s,_[177],p[177],m,[S,f],[32768,4,1]),e(i,s,_[178],p[178],m,[ba,f,S],[32768,4,1]),s.copyBufferToBuffer(ba,0,Ua,0,ba.size),i.queue.submit([s.finish()]),yield Ua.mapAsync(GPUMapMode.READ);const E=new Float32Array(Ua.size/4);return E.set(new Float32Array(Ua.getMappedRange())),Ua.unmap(),[E]})});return{load:(i,A)=>D(null,null,function*(){return yield fetch(A).then(x=>x.arrayBuffer()).then(x=>F(i,new Uint8Array(x)))}),setupNet:F}})(),yl=Object.freeze(Object.defineProperty({__proto__:null,default:hl},Symbol.toStringTag,{value:"Module"})),za=Object.assign({"./webgpu_runners/rodent_runner.js":yl});function Sl(){return Object.keys(za).map(l=>{const a=l.match(/\/([^\/]+)_runner\.js$/);return a?a[1]:null}).filter(Boolean)}function ml(l){const a=`./webgpu_runners/${l}_runner.js`;if(za[a])return za[a];const t=l.toLowerCase();for(const[r,n]of Object.entries(za))if(r.toLowerCase().includes(`/${t}_runner.js`))return n;for(const[r,n]of Object.entries(za))if(r.includes(l))return n;return null}function Pl(l){const a=`./webgpu_runners/${l}_runner.js`;if(za[a])return!0;const t=`/${l.toLowerCase()}_runner.js`;return Object.keys(za).some(r=>r.toLowerCase().endsWith(t))}function Ul(l,a){if(typeof Float16Array=="undefined")throw new Error("Float16Array unavailable: cannot cast fp32 master weights to fp16.");const t=new DataView(l.buffer,l.byteOffset,l.byteLength),r=Number(t.getBigUint64(0,!0)),n=JSON.parse(new TextDecoder("utf8").decode(l.subarray(8,8+r))),e=8+r;if(!Object.entries(n).some(([c,U])=>c!=="__metadata__"&&U.dtype==="F32"))return l;const u={},o=[];let v=0;for(const[c,U]of Object.entries(n)){if(c==="__metadata__"){u[c]=U;continue}const[w,C]=U.data_offsets,T=l.subarray(e+w,e+C);let B,k;if(U.dtype==="F32"){const F=new Float32Array(T.slice().buffer),j=new Float16Array(F);B=new Uint8Array(j.buffer),k="F16"}else B=T,k=U.dtype;u[c]={dtype:k,shape:U.shape,data_offsets:[v,v+B.byteLength]},o.push(B),v+=B.byteLength}const b=new TextEncoder().encode(JSON.stringify(u)),P=(8-b.byteLength%8)%8,g=new Uint8Array(8+b.byteLength+P+v);new DataView(g.buffer).setBigUint64(0,BigInt(b.byteLength+P),!0),g.set(b,8),g.fill(32,8+b.byteLength,8+b.byteLength+P);let y=8+b.byteLength+P;for(const c of o)g.set(c,y),y+=c.byteLength;return a&&a("Cast fp32 master weights -> fp16 for WebGPU.",.05),g}function _l(l,a){try{const t=d=>!!(l.features&&l.features.has&&l.features.has(d)),r=l.limits||{},n=typeof navigator!="undefined"&&navigator.userAgent||"unknown",e=/Safari/.test(n)&&!/Chrome|Chromium|Android/.test(n);console.log("[SAFARI-DEBUG] ===== WebGPU device capabilities ====="),console.log("[SAFARI-DEBUG] model:",(a==null?void 0:a.modelName)||(a==null?void 0:a.webgpu_runner)||"(unknown)"),console.log("[SAFARI-DEBUG] userAgent:",n,"| classified Safari:",e),console.log("[SAFARI-DEBUG] shader-f16:",t("shader-f16")),console.log("[SAFARI-DEBUG] features:",l.features?Array.from(l.features):"(none)"),console.log("[SAFARI-DEBUG] limits:",{maxBufferSize:r.maxBufferSize,maxStorageBufferBindingSize:r.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:r.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.maxComputeWorkgroupSizeZ,maxComputeWorkgroupsPerDimension:r.maxComputeWorkgroupsPerDimension}),console.log("[SAFARI-DEBUG] BC_WEBGPU_DEBUG (logits readback):",typeof window!="undefined"&&!!window.BC_WEBGPU_DEBUG),console.log("[SAFARI-DEBUG] =======================================")}catch(t){console.warn("[SAFARI-DEBUG] capability dump failed:",t==null?void 0:t.message)}}function xl(l,a,t){return D(this,null,function*(){var b,P;_l(l,a);let r=a.webgpu_runner,n=a.webgpu_safetensor;const e=!!(l.features&&l.features.has&&l.features.has("shader-f16"));let d=!1;a.forceFP32?(d=!0,console.log("[WebGPU] forceFP32: using fp32 runner and weights.")):e||(Pl(`${r}_f32`)?(d=!0,console.log("[WebGPU] shader-f16 not supported on this device -> auto-selecting fp32 runner and weights."),t("fp16 not supported - using fp32 WebGPU runner.",.05)):console.warn(`[WebGPU] shader-f16 not supported and no fp32 runner ('${r}_f32') available; the fp16 runner will likely fail and fall back to WebGL2.`)),d&&(r=`${r}_f32`,n=n.replace(".safetensors","_f32.safetensors")),a.enableTTA&&a.webgpuTTArunner&&(console.log("[WebGPU] TTA Enabled: Switching to TTA runner and weights."),r=`${r}_tta`,n=n.replace(".safetensors","_tta.safetensors"));const u=ml(r);if(!u){const g=Sl();throw new Error(`Runner '${r}' not found. Available runners: ${g.join(", ")||"none"}. Looking in: ./webgpu_runners/`)}if(!u.setupNet&&!((b=u.default)!=null&&b.setupNet))throw new Error(`Runner module '${r}' doesn't export 'setupNet'. Exported keys: ${Object.keys(u).join(", ")}`);let o;try{const g=yield fetch(n);if(!g.ok)throw new Error(`HTTP ${g.status}: ${g.statusText}`);o=yield g.arrayBuffer()}catch(g){throw new Error(`Failed to load weights from '${n}': ${g.message}`)}const v=u.setupNet||((P=u.default)==null?void 0:P.setupNet);try{let g=new Uint8Array(o);return d||(g=Ul(g,t)),yield v(l,g,t)}catch(g){throw new Error(`Failed to setup network for '${r}': ${g.message}`)}})}function Cl(l,a,t,r,n,e,d){return D(this,null,function*(){var y,c,U;d("Starting WebGPU inference...",0);const u=performance.now(),o=Je(t,ee.WEBGPU);o.isModelFullVol=!0;let v,b=[],P=null,g=!1;try{if(!l)throw new Error("WebGPU device is required but not provided");if(!(t!=null&&t.webgpu_runner))throw new Error("Model entry must specify webgpu_runner property");if(!(t!=null&&t.webgpu_safetensor))throw new Error("Model entry must specify webgpu_safetensor property");const w=t.webgpuStorageSize||335544320;if(l.limits){const L=q=>(q/1048576).toFixed(0),W=(y=l.limits.maxStorageBufferBindingSize)!=null?y:1/0,I=(c=l.limits.maxBufferSize)!=null?c:1/0;if(W<w||I<w){const q=L(Math.min(W,I)),Z=L(w),H=`[WebGPU] Device buffer limit (${q} MB) is below the ${Z} MB this model needs - using WebGL2 fallback.`;throw console.warn(H),d(H,.1),new Error(H)}}d("Preparing input data...",.1);let C=Ja(n,[256,256,256],"float32");const T=t.enableQuantileNorm?yield he(C):yield pe(C);if(C.dispose(),C=T,t.inputPermutation){console.log(`[WebGPU] Permuting Input: ${t.inputPermutation}`);const L=C.transpose(t.inputPermutation);C.dispose(),C=L}else if(t.enableTranspose){const L=C.transpose();C.dispose(),C=L}const B=yield C.data(),k=C.shape;C.dispose(),d("Input data prepared (full volume).",.3),d("Loading model runner...",.4),l&&(P=l.createBuffer.bind(l),l.createBuffer=L=>{const W=P(L);return b.push(W),W}),l.pushErrorScope("out-of-memory"),g=!0;const F=yield xl(l,t,d);if(typeof F!="function")throw new Error(`setupNet for '${t.webgpu_runner}' didn't return a function. Returned type: ${typeof F}`);d("Running inference...",.5);const j=yield F(B);g=!1;const i=yield l.popErrorScope();if(i)throw new Error(`WebGPU out of memory (${i.message||"allocation failed"}) - falling back to WebGL2.`);if(!j||!Array.isArray(j))throw new Error(`Inference didn't return expected array format. Returned: ${typeof j}`);const A=((performance.now()-u)/1e3).toFixed(4);d(`WebGPU inference took ${A}s.`,.9),console.log("Inference result shape:",(U=j[0])==null?void 0:U.length),v=_a(()=>{let L=Ja(j[0],k,"int32");t.outputPermutation?(console.log(`[WebGPU] Permuting Output: ${t.outputPermutation}`),L=L.transpose(t.outputPermutation)):t.enableTranspose&&(L=L.transpose());const W=Rt(L).dataSync()[0];if(console.log("Segmentation volume sum:",W),W===0)throw new Error("Segmentation resulted in all zeros (empty volume).");return L});const x=performance.now(),m=yield Ke(v,n,t,a),p=((performance.now()-x)/1e3).toFixed(4);e(m,a,t);const M=new Set(m).size,N=t.numClasses||M;Se(o,N,M),me(o,A,p),d(t.modelName+"<br>Segmentation finished.",1,"",o)}catch(w){if(console.error("WebGPU Inference Error:",w),g&&l){g=!1;try{yield l.popErrorScope()}catch(T){}}let C=w.message;throw w.message.includes("not found")?C+=". Check that the runner file exists and the name matches.":w.message.includes("fetch")?C+=". Check network connection and file paths.":w.message.includes("binding size")&&(C+=". GPU memory limit exceeded."),$a(o,C,"WebGPU inference failed"),d("",-1,`WebGPU Error: ${C}`,o),w}finally{if(v&&v.dispose(),P&&l&&(l.createBuffer=P),b&&b.length>0){for(const w of b)w.destroy();b=[]}}})}function Pe(){return D(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?"Opera":navigator.userAgent.indexOf("Edg/")>-1?"Edge":navigator.userAgent.indexOf("Falkon/")>-1?"Falkon":navigator.userAgent.indexOf("Chrome/")>-1?"Chrome":navigator.userAgent.indexOf("Firefox/")>-1?"Firefox":navigator.userAgent.indexOf("Safari/")>-1?"Safari":navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?"IExplorer":"Unknown"})}function wl(){return D(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?parseInt(navigator.userAgent.split("OPR/")[1]):navigator.userAgent.indexOf("Edg/")>-1?parseInt(navigator.userAgent.split("Edg/")[1]):navigator.userAgent.indexOf("Falkon/")>-1?parseInt(navigator.userAgent.split("Falkon/")[1]):navigator.userAgent.indexOf("Chrome/")>-1?parseInt(navigator.userAgent.split("Chrome/")[1]):navigator.userAgent.indexOf("Firefox/")>-1?parseInt(navigator.userAgent.split("Firefox/")[1]):navigator.userAgent.indexOf("Safari/")>-1?parseInt(navigator.userAgent.split("Safari/")[1]):navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?parseInt(navigator.userAgent.split("MSIE/")[1]):1/0})}function Ml(){return D(this,null,function*(){return navigator.userAgent.indexOf("Win")>-1?"Windows":navigator.userAgent.indexOf("Mac")>-1?"MacOS":navigator.userAgent.indexOf("Linux")>-1?"Linux":navigator.userAgent.indexOf("UNIX")>-1?"UNIX":"Unknown"})}function El(l){return D(this,null,function*(){return l?(console.log("WebGl2 is enabled"),!0):(console.log(typeof WebGL2RenderingContext!="undefined"?"WebGL2 may be disabled. Please try updating video card drivers":"WebGL2 is not supported"),!1)})}function Tl(l){return D(this,null,function*(){let a;if(l&&(a=l.getExtension("WEBGL_debug_renderer_info"),a)){const t=l.getParameter(a.UNMASKED_VENDOR_WEBGL);return t.indexOf("(")>-1&&t.indexOf(")")>-1?t.substring(t.indexOf("(")+1,t.indexOf(")")):t}return null})}function Gl(l){return D(this,null,function*(){if(l){const a=l.getExtension("WEBGL_debug_renderer_info");return a?l.getParameter(a.UNMASKED_VENDOR_WEBGL):null}else return null})}function Ol(l){return D(this,null,function*(){if(l){if(Pe()==="Firefox")return l.getParameter(l.RENDERER);const a=l.getExtension("WEBGL_debug_renderer_info");return a?l.getParameter(a.UNMASKED_RENDERER_WEBGL):null}else return null})}function Ll(l){return D(this,null,function*(){let a;if(l){if(Pe()==="Firefox")return l.getParameter(l.RENDERER);if(a=l.getExtension("WEBGL_debug_renderer_info"),a){let t=l.getParameter(a.UNMASKED_RENDERER_WEBGL);return t.indexOf("(")>-1&&t.indexOf(")")>-1&&t.indexOf("(R)")===-1&&(t=t.substring(t.indexOf("(")+1,t.indexOf(")")),t.split(",").length===3)?t.split(",")[1].trim():t}}return null})}function Bl(){return D(this,null,function*(){return navigator.hardwareConcurrency})}function Al(){return D(this,null,function*(){return/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)})}function Rl(l,a=null){return D(this,null,function*(){const t=new Date;if(l.isModelFullVol?l.Brainchop_Ver="FullVolume":l.Brainchop_Ver="SubVolumes",l.Total_t=(Date.now()-l.startTime)/1e3,delete l.startTime,l.Date=parseInt(t.getMonth()+1)+"/"+t.getDate()+"/"+t.getFullYear(),l.Browser=yield Pe(),l.Browser_Ver=yield wl(),l.OS=yield Ml(),l.WebGL2=yield El(a),l.GPU_Vendor=yield Tl(a),l.GPU_Card=yield Ll(a),l.GPU_Vendor_Full=yield Gl(a),l.GPU_Card_Full=yield Ol(a),l.CPU_Cores=yield Bl(),l.Which_Brainchop="latest",(yield Al())&&(l.Heap_Size_MB=window.performance.memory.totalJSHeapSize/(1024*1024).toFixed(2),l.Used_Heap_MB=window.performance.memory.usedJSHeapSize/(1024*1024).toFixed(2),l.Heap_Limit_MB=window.performance.memory.jsHeapSizeLimit/(1024*1024).toFixed(2)),a){console.log("MAX_TEXTURE_SIZE :",a.getParameter(a.MAX_TEXTURE_SIZE)),console.log("MAX_RENDERBUFFER_SIZE :",a.getParameter(a.MAX_RENDERBUFFER_SIZE));const r=a.getExtension("WEBGL_debug_renderer_info");console.log("VENDOR WEBGL:",a.getParameter(r.UNMASKED_VENDOR_WEBGL)),l.Texture_Size=a.getParameter(a.MAX_TEXTURE_SIZE)}else l.Texture_Size=null;return l})}function kl(l){return new Worker(""+new URL("brainchop-webworker-B_zqIdIx.js",import.meta.url).href,{name:l==null?void 0:l.name})}const Oe=.5,Le=8,Be=(l,a,t)=>Math.min(t,Math.max(a,l)),Ae=l=>Math.hypot(l[0].clientX-l[1].clientX,l[0].clientY-l[1].clientY);function Qe(l){l!=null&&l.scene&&(l.scene.pan2Dxyzmm=[0,0,0,1],l.scene.volScaleMultiplier=1,l.drawScene()),Il()}function Il(){const l=document.querySelector('meta[name="viewport"]');if(!l)return;const a=l.getAttribute("content")||"width=device-width, initial-scale=1.0";/maximum-scale/.test(a)||(l.setAttribute("content",`${a}, maximum-scale=1, user-scalable=no`),requestAnimationFrame(()=>requestAnimationFrame(()=>l.setAttribute("content",a))))}function Fl(){const l=a=>a.preventDefault();for(const a of["gesturestart","gesturechange","gestureend"])document.addEventListener(a,l,{passive:!1});document.addEventListener("touchmove",a=>{a.touches.length>1&&a.preventDefault()},{passive:!1})}function Nl(l){const a=l.canvas;if(!a)return;let t=null;const r=e=>{var b;if(e.touches.length!==2){t=null;return}const d=a.getBoundingClientRect(),u=(e.touches[0].clientX+e.touches[1].clientX)/2-d.left,o=(e.touches[0].clientY+e.touches[1].clientY)/2-d.top,v=((b=l.uiData)==null?void 0:b.dpr)||1;t={dist:Math.max(1,Ae(e.touches)),zoom:l.scene.pan2Dxyzmm[3]||1,pan:Array.from(l.scene.pan2Dxyzmm).slice(0,3),scale3d:l.scene.volScaleMultiplier||1,inRender:l.inRenderTile?l.inRenderTile(u*v,o*v)>=0:!1}},n=()=>{t=null};a.addEventListener("touchstart",r,{passive:!1}),a.addEventListener("touchend",n,{passive:!1}),a.addEventListener("touchcancel",n,{passive:!1}),l.handlePinchZoom=e=>{if(!t||!e.touches||e.touches.length!==2)return;const d=Ae(e.touches)/t.dist;if(!isFinite(d)||d<=0)return;if(t.inRender){l.scene.volScaleMultiplier=Be(t.scale3d*d,Oe,Le),l.drawScene();return}const u=Be(t.zoom*d,Oe,Le),o=l.frac2mm(l.scene.crosshairPos),v=t.zoom-u;l.scene.pan2Dxyzmm=[t.pan[0]+v*o[0],t.pan[1]+v*o[1],t.pan[2]+v*o[2],u],l.opts.yoke3Dto2DZoom&&(l.scene.volScaleMultiplier=u),l.drawScene()}}function zl(l){return Fl(),Nl(l),{resetView:()=>Qe(l)}}const Wl=720,Dl=860;function $l(){var n,e,d,u,o,v;const l=window.visualViewport,a=Math.round((e=(n=l==null?void 0:l.width)!=null?n:window.innerWidth)!=null?e:0),t=Math.round((u=(d=l==null?void 0:l.height)!=null?d:window.innerHeight)!=null?u:0);return a>0&&a<=Wl?!0:!!((v=(o=window.matchMedia)==null?void 0:o.call(window,"(pointer: coarse)"))==null?void 0:v.matches)&&Math.min(a,t)<=Dl}function Ya(l,a,t,r,n,e){const d=t-n,u=r-e;if(!(d>0)||!(u>0)||!(l>0)||!(a>0))return 0;let o=d/l;return a*o>u&&(o=u/a),o}function ql(l){var C,T,B,k,F,j,i,A,x,m;const a=((k=(C=l.effectiveCanvasWidth)==null?void 0:C.call(l))!=null?k:(B=(T=l.gl)==null?void 0:T.canvas)==null?void 0:B.width)||0,t=((A=(F=l.effectiveCanvasHeight)==null?void 0:F.call(l))!=null?A:(i=(j=l.gl)==null?void 0:j.canvas)==null?void 0:i.height)||0;if(!a||!t)return null;let r=[1,1,1];try{const p=l.sliceScale();((x=p==null?void 0:p.volScale)==null?void 0:x.length)===3&&(r=p.volScale.slice())}catch(p){}l.opts.multiplanarEqualSize&&(r=[1,1,1]);const[n,e,d]=r,u=Math.max(n,e,d),o=((m=l.uiData)==null?void 0:m.dpr)||1,v=(parseFloat(`${l.opts.multiplanarPadPixels}`)||0)*o;let b=(l.opts.tileMargin||0)*o;b<0&&(b=2*(2+Math.ceil(l.fontPx||0)));const P=p=>(p-1)*v+p*b,g=p=>(p-1)*v+p*b,y=l.opts.multiplanarShowRender===Pt.ALWAYS||l.opts.multiplanarForceRender===!0,c=y?Ya(u,e+d+d+u,a,t,P(1),g(4)):Ya(u,e+d+d,a,t,P(1),g(3)),U=y?Ya(n+n+e+u,Math.max(e,d),a,t,P(4),g(1)):Ya(n+n+e,Math.max(e,d),a,t,P(3),g(1)),w=Ya(n+e,e+d,a,t,P(2),g(2));return[{layout:ne.GRID,name:"grid",scale:w},{layout:ne.COLUMN,name:"column",scale:c},{layout:ne.ROW,name:"row",scale:U}]}function Vl(l){if(!(l!=null&&l.gl))return null;const a=ql(l);if(!a)return null;const t=a.reduce((n,e)=>e.scale>n.scale+1e-6?e:n),r=l.opts.multiplanarLayout!==t.layout;return l.opts.multiplanarLayout=t.layout,Ea(Ca({},t),{changed:r})}function Yl(l){let a="";const t=l.drawScene.bind(l);l.drawScene=function(){var r,n,e;if(l.opts.sliceType===Da.MULTIPLANAR&&l.gl){const d=[l.gl.canvas.width,l.gl.canvas.height,l.opts.multiplanarShowRender,l.opts.multiplanarForceRender,l.opts.multiplanarEqualSize,(e=(n=(r=l.volumes)==null?void 0:r[0])==null?void 0:n.id)!=null?e:""].join("|");d!==a&&(a=d,Vl(l))}return t()}}const ve=[{id:"multi",label:"All",title:"All planes",type:Da.MULTIPLANAR},{id:"axial",label:"A",title:"Axial only",type:Da.AXIAL},{id:"coronal",label:"C",title:"Coronal only",type:Da.CORONAL},{id:"sagittal",label:"S",title:"Sagittal only",type:Da.SAGITTAL},{id:"render",label:"3D",title:"3D render only",type:Da.RENDER}];function jl(l,a){const t=document.createElement("div");t.id="paneSwitcher",t.className="pane-switcher",t.setAttribute("role","group"),t.setAttribute("aria-label","Visible planes");for(const n of ve){const e=document.createElement("button");e.type="button",e.dataset.pane=n.id,e.textContent=n.label,e.title=n.title,e.setAttribute("aria-label",n.title),e.addEventListener("click",()=>at(l,t,n.id)),t.appendChild(e)}const r=document.createElement("button");return r.type="button",r.className="pane-reset",r.textContent="⟲",r.title="Reset zoom and pan",r.setAttribute("aria-label","Reset zoom and pan"),r.addEventListener("click",()=>Qe(l)),t.appendChild(r),a.appendChild(t),t}function at(l,a,t){const r=ve.find(n=>n.id===t)||ve[0];l.setSliceType(r.type),a.querySelectorAll("button").forEach(n=>n.classList.toggle("active",n.dataset.pane===r.id))}function Xl(l){var d;const a=document.getElementById("canvas-container")||document.body,t=jl(l,a);t.querySelector('button[data-pane="multi"]').classList.add("active"),Yl(l);let r=0;const n=()=>{r=0,document.body.classList.toggle("nv-narrow",$l());const u=l.canvas,o=l.opts.forceDevicePixelRatio===0?window.devicePixelRatio||1:l.opts.forceDevicePixelRatio<0?1:l.opts.forceDevicePixelRatio;u&&l.opts.isResizeCanvas!==!1&&(Math.abs(u.width-u.offsetWidth*o)>1||Math.abs(u.height-u.offsetHeight*o)>1)?l.resizeListener():l.drawScene()},e=()=>{r||(r=requestAnimationFrame(n))};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),(d=window.visualViewport)==null||d.addEventListener("resize",e),typeof ResizeObserver!="undefined"&&new ResizeObserver(e).observe(a),n(),{refresh:e,setPane:u=>at(l,t,u)}}let et=null,Ka=!1,fe=null,ja=!1,le=[];const tt=new URLSearchParams(window.location.search).get("backend")==="webgl2";function Hl(){return D(this,null,function*(){const l={secureContext:window.isSecureContext,navigatorGpuExists:"gpu"in navigator,adapterObtained:!1,deviceObtained:!1,f16Support:!1,error:null};if(window.isSecureContext||(console.warn("WebGPU requires a secure context (HTTPS or localhost)."),console.warn("Current origin:",window.location.origin)),"gpu"in navigator)try{console.log("Requesting WebGPU adapter...");const a=yield navigator.gpu.requestAdapter();if(a){l.adapterObtained=!0,console.log("WebGPU adapter obtained:",a),a.info&&console.log("Adapter info:",a.info),console.log("Adapter limits:",{maxBufferSize:a.limits.maxBufferSize,maxStorageBufferBindingSize:a.limits.maxStorageBufferBindingSize,maxComputeWorkgroupsPerDimension:a.limits.maxComputeWorkgroupsPerDimension});const t={maxBufferSize:a.limits.maxBufferSize,maxStorageBufferBindingSize:a.limits.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:a.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:a.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:a.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:a.limits.maxComputeWorkgroupSizeZ,maxComputeWorkgroupStorageSize:a.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:a.limits.maxComputeWorkgroupsPerDimension},r=a.features.has("shader-f16");l.f16Support=r;const n=r?["shader-f16"]:[];et=yield a.requestDevice({requiredLimits:t,requiredFeatures:n}),l.deviceObtained=!0,Ka=!0,console.log(`✓ WebGPU initialized successfully. F16: ${r?"enabled":"not available"}`)}else console.warn("WebGPU adapter request returned null."),console.warn("This typically means:"),console.warn("  - Safari: WebGPU feature flags not enabled in Settings > Feature Flags"),console.warn("  - Unsupported GPU hardware"),console.warn("  - GPU drivers need updating"),l.error="Adapter returned null"}catch(a){l.error=a.message,console.error("WebGPU initialization error:",a),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(console.warn("Safari detected. To enable WebGPU:"),console.warn("  1. Open Safari Settings/Preferences"),console.warn('  2. Go to Advanced tab, enable "Show features for web developers"'),console.warn("  3. Go to Feature Flags tab"),console.warn("  4. Enable: WebGPU, GPU Process: DOM Rendering, GPU Process: Canvas Rendering"),console.warn("  5. Restart Safari"))}else console.warn("navigator.gpu not found. WebGPU API is not available in this browser."),l.error="navigator.gpu not found",navigator.userAgent.includes("Firefox")&&(console.warn("Firefox detected. To enable WebGPU in about:config:"),console.warn("  1. Set dom.webgpu.enabled = true"),console.warn("  2. Set gfx.webgpu.ignore-blocklist = true"),console.warn("  3. Restart Firefox"));return Kl(Ka&&!tt,l),Ka||console.log("Falling back to WebGL backend."),window.webgpuDiagnostics=l,l})}function Kl(l,a){const t=document.getElementById("backendStatus");if(!t){console.log("Backend status element not found in DOM");return}if(l){const r=a.f16Support?" (F16)":"";t.textContent=`WebGPU${r}`,t.style.color="#4CAF50",t.title="WebGPU backend active - fastest performance"}else{t.textContent="WebGL",t.style.color="#FF9800";let r="WebGL backend (fallback)";a.error&&(r+=`
Reason: ${a.error}`),a.secureContext||(r+=`
⚠ Not a secure context (HTTPS required)`),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(r+=`

To enable WebGPU in Safari:
1. Settings > Feature Flags
2. Enable WebGPU flags
3. Restart Safari`),navigator.userAgent.includes("Firefox")&&(r+=`

To enable WebGPU in Firefox:
1. about:config > dom.webgpu.enabled = true
2. gfx.webgpu.ignore-blocklist = true
3. Restart Firefox`),t.title=r}}function Zl(){return D(this,null,function*(){let l="",a="",t,r=null,n=null;const e="altKey";let d=null,u=null,o=null;const v=.9;let b=null;const P=document.getElementById("sampleSelect"),g=document.getElementById("maskToggle"),y=document.getElementById("modelRunButton");let c=null,U=null,w=null;function C(){c==null||c.invalidate(),U=null,w=null,c==null||c.updateAvailability(),fe=null,g&&(g.checked=!1,g.disabled=!0)}const T=document.getElementById("dragSegmented");T&&T.querySelectorAll("button").forEach(s=>{s.onclick=()=>{S.opts.dragMode=parseInt(s.dataset.drag,10),T.querySelectorAll("button").forEach(E=>E.classList.toggle("active",E===s))}});const B=document.getElementById("drawBtn"),k=document.getElementById("drawPopover"),F=document.getElementById("penRow"),j=document.getElementById("drawApplyRow");function i(s){k&&(k.hidden=!s,B&&B.setAttribute("aria-expanded",String(s)))}function A(s){S.setDrawingEnabled(s>=0),s>=0&&S.setPenValue(s&7,s>7),F&&F.querySelectorAll(".chip").forEach(E=>E.classList.toggle("active",parseInt(E.dataset.pen,10)===s))}function x(s){return D(this,null,function*(){if(S.volumes.length<2){window.alert("No segmentation open (run a model first).");return}if(c!=null&&c.active)return;if(s===0){S.drawUndo();return}if(!S.drawBitmap){window.alert("Nothing drawn yet — pick a pen and draw on the image first.");return}const E=S.volumes[1].img,z=yield S.volumes[0].saveToDisk("",S.drawBitmap),Y=352,J=E.length;if(s===1)for(let R=0;R<J;R++)z[Y+R]>0&&(E[R]=1);if(s===2)for(let R=0;R<J;R++)z[Y+R]>0&&(E[R]=0);if(U&&(g!=null&&g.checked)){U.set(E);for(let R=0;R<J;R++)w[R]=S.volumes[0].img[R]*U[R]}else if(U)for(let R=0;R<J;R++)z[Y+R]>0&&(U[R]=s===1?1:0,w[R]=S.volumes[0].img[R]*U[R]);c==null||c.invalidate(),S.closeDrawing(),S.updateGLVolume(),S.setDrawingEnabled(!1),A(-1)})}B&&(B.onclick=s=>{s.stopPropagation(),i(k.hidden)}),F&&F.querySelectorAll(".chip").forEach(s=>{s.onclick=()=>A(parseInt(s.dataset.pen,10))}),j&&j.querySelectorAll(".chip").forEach(s=>{s.onclick=()=>x(parseInt(s.dataset.apply,10))}),document.addEventListener("click",s=>{!k||k.hidden||s.target.closest(".popover-wrap")||i(!1)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&i(!1)});const m=document.getElementById("appDialog");m&&m.addEventListener("click",s=>{s.target===m&&m.close()}),aboutBtn.onclick=function(){Ba("About Brainchomp",`
      <div style="text-align: left; font-size: 0.95em;">
        <p><strong>🔒 Privacy First</strong><br>
        Brainchomp runs entirely <strong>locally in your browser</strong>. Your imaging data never leaves your device.</p>

        <p><strong>⌨️ Controls</strong><br>
        • <strong>Drag & Drop</strong> a pre-conformed 256³ NIfTI file to open.<br>
        • Use the <strong>example selector</strong> to switch between the bundled rodent MRI and mask.<br>
        • Press <strong>C</strong> to cycle the clip-plane.<br>
        • Press <strong>V</strong> to cycle through views.</p>

        <p><strong>🐭 Rodent brain extraction</strong><br>
        Skull-strip runs the 16-channel MeshNet once. Use the <strong>Mask</strong>
        toggle to switch the overlay between the extracted brain and its
        post-processed binary mask. The Save menu offers both outputs.</p>
        
        <p><em>Inputs must already be 256 × 256 × 256. This version does not resample or conform them.</em></p>
      </div>
    `)},diagnosticsBtn.onclick=function(){let s=l;if(s.length<1&&window.webgpuDiagnostics){const z=window.webgpuDiagnostics;s=`:: Startup Diagnostics ::
`,s+=`Secure Context: ${z.secureContext}
`,s+=`WebGPU Enabled: ${Ka}
`,s+=`F16 Support: ${z.f16Support}
`,z.error&&(s+=`Error: ${z.error}
`),s+=`User Agent: ${navigator.userAgent}
`}if(s.length<1&&window.webgpuDiagnostics,s.length<1){Ba("Diagnostics","No diagnostic string generated: run a model to create diagnostics");return}let E=s;a=a.slice(0,-2),a!==""&&E.includes("Status: OK")&&(E=E.replace("Status: OK",`Status: ${a}`)),a="",navigator.clipboard.writeText(E).then(()=>{Ba("Diagnostics",`<p>Diagnostics copied to clipboard</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${E}</pre>`)}).catch(z=>{Ba("Diagnostics",`<p>Failed to copy to clipboard.</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${E}</pre>`)})},opacitySlider0.oninput=function(){S.setOpacity(0,opacitySlider0.value/255),S.updateGLVolume()},opacitySlider1.oninput=function(){if(c!=null&&c.active){S.setDrawOpacity(opacitySlider1.value/255);return}S.setOpacity(1,opacitySlider1.value/255)};function p(){return D(this,null,function*(){const s=S.volumes[0],E=256*256*256;if(!(s.dims[1]===256&&s.dims[2]===256&&s.dims[3]===256&&s.img.length===E))throw new Error(`Brainchomp currently requires a pre-conformed 256 × 256 × 256 NIfTI; received ${s.dims[1]} × ${s.dims[2]} × ${s.dims[3]}.`)})}function G(){return D(this,null,function*(){for(;S.volumes.length>1;)yield S.removeVolume(S.volumes[1])})}function M(){return S.volumes.length>=2&&S.volumes[1].colormapLabel?S.volumes[1]:null}function N(){d=null,u=null,o=null}function L(){const s=M();if(s){if(u===null&&(u=s.img),d===null)s.img=u,o=null;else{const E=u,z=new E.constructor(E.length);for(let Y=0;Y<E.length;Y++)z[Y]=E[Y]===d?d:0;s.img=z,o=W(d)}S.updateGLVolume()}}function W(s){const E=S.volumes[0],z=u||S.volumes[1]&&S.volumes[1].img;if(!E||!z)return null;const Y=E.hdr.pixDims||[],J=Y[1]&&Y[2]&&Y[3]?Y[1]*Y[2]*Y[3]:1,R=fa(E.img,z,J),ua=R.reduce((ia,ga)=>ia+ga.volume_mm3,0),aa=R.find(ia=>ia.label===s);if(!aa)return null;const K=ua>0?aa.volume_mm3/ua*100:0,$=[aa.name,`${ca(aa.volume_mm3)} cm3   (${K.toFixed(1)}% of brain)`,`${aa.voxels.toLocaleString()} voxels`,`intensity  ${aa.mean.toFixed(0)} +/- ${aa.stdev.toFixed(0)}`];let X=[1,1,1,1];if(n&&n.R&&n.R[s]!=null){const ia=ga=>Math.min(255,ga*.55+130)/255;X=[ia(n.R[s]),ia(n.G[s]),ia(n.B[s]),1]}return{lines:$,color:X}}function I(){if(d===null||!o||!M())return;const s=S.screenSlices&&S.screenSlices.find(ga=>ga.axCorSag===4);if(!s)return;const[E,z]=s.leftTopWidthHeight,Y=S.gl;Y.viewport(0,0,Y.canvas.width,Y.canvas.height),Y.enable(Y.BLEND);const R=S.fontPx*v*1.55,ua=S.fontPx*.6,aa=E+ua,K=z+ua,$=[.92,.92,.92,1],{lines:X,color:ia}=o;S.drawText([aa,K],X[0],v,ia);for(let ga=1;ga<X.length;ga++)S.drawText([aa,K+ga*R],X[ga],v,$)}function q(){const s=M();if(!s)return null;const E=S.frac2mm(S.scene.crosshairPos,0,!0),z=s.mm2vox(E),Y=s.img;u&&(s.img=u);const J=Math.round(s.getValue(z[0],z[1],z[2],s.frame4D));return s.img=Y,J}function Z(s){c!=null&&c.active||M()&&(d=s===0||s===d?null:s,L())}function H(s){if(!s[e]||!M())return;const E=q();E===null||Number.isNaN(E)||(Z(E),s.preventDefault())}function ra(){return D(this,null,function*(){if(!(ja||c!=null&&c.active)){ja=!0,c==null||c.updateAvailability(),y&&(y.disabled=!0),le=[];try{yield ma()}catch(s){console.error("Inference could not start:",s),Ba("Input not supported",Ha((s==null?void 0:s.message)||String(s)))}finally{ja=!1,c==null||c.updateAvailability(),y&&(y.disabled=!1)}}})}function ma(){return D(this,null,function*(){const s=modelSelect.value;if(s==="-1"||modelSelect.selectedIndex<0)return;yield G(),N(),yield p();const E=Ra[s],z=Ca({},Xt),Y=new URL("./",window.location.href).href;z.rootURL=Y.endsWith("/")?Y.slice(0,-1):Y;const J=S.volumes[0].img;if(Ka&&!tt&&E.webgpu_safetensor){console.log("Attempting WebGPU backend...");const K=Ea(Ca({},E),{enableTTA:!1});try{yield Cl(et,z,K,S.volumes[0].hdr,J,Ga,ba);return}catch($){console.error("WebGPU inference failed, falling back to WebWorker.",$)}}if(E.webgpu_safetensor)try{const{runInferenceWebGl2:K,nativeWebgl2Available:$}=yield ct(()=>D(null,null,function*(){const{runInferenceWebGl2:X,nativeWebgl2Available:ia}=yield import("./inference-webgl2-DGjvxGXZ.js");return{runInferenceWebGl2:X,nativeWebgl2Available:ia}}),[],import.meta.url);if($()){console.log("Attempting native WebGL2 runner..."),yield K(z,E,S.volumes[0].hdr,J,Ga,ba);return}console.log("Native WebGL2 unavailable here (no OffscreenCanvas/webgl2); using the tfjs worker.")}catch(K){console.warn("Native WebGL2 declined or failed, falling back to the tfjs worker.",K.message)}if(console.log("Attempting WebWorker backend..."),typeof t!="undefined"){console.log("Worker is busy. Please wait.");return}const R={dims:S.volumes[0].hdr.dims,datatypeCode:S.volumes[0].hdr.datatypeCode},ua=K=>new Promise(($,X)=>{const ia=Ea(Ca({},z),{enableSeqConv:K}),ga=Ea(Ca({},E),{enableSeqConv:K,enableTTA:!1});t=new kl({}),t.postMessage({opts:ia,modelEntry:ga,niftiHeader:R,niftiImage:J}),t.onmessage=function(Ma){const{cmd:Oa,message:Na,progressFrac:qa,modalMessage:ha,statData:Ia,img:lt,opts:it,modelEntry:rt}=Ma.data;if(Oa==="ui"){if(ha){if(t.terminate(),t=void 0,Ia&&Ia.Status==="Fail"){X(new Error(Ia.Error_Type||ha));return}if(typeof ha=="string"&&(ha.toLowerCase().includes("fail")||ha.toLowerCase().includes("error")||ha.toLowerCase().includes("compatible")||ha.toLowerCase().includes("texture")||ha.toLowerCase().includes("maximum"))){X(new Error(ha));return}}ba(Na,qa,ha,Ia)}Oa==="img"&&(t.terminate(),t=void 0,Ga(lt,it,rt),$())},t.onerror=function(Ma){console.error("WebWorker failed",Ma),t.terminate(),t=void 0,X(Ma)}});try{console.log("Attempting WebWorker with enableSeqConv: false"),yield ua(!1);return}catch(K){console.warn("WebWorker (fast) failed, retrying with enableSeqConv: true",K),typeof t!="undefined"&&(t.terminate(),t=void 0),console.log("Waiting 1000ms for WebGL context cleanup..."),yield new Promise($=>setTimeout($,1e3));try{console.log("Attempting WebWorker with enableSeqConv: true"),yield ua(!0);return}catch($){console.error("WebWorker (slow) failed, falling back to Main Thread.",$)}}console.log("Attempting Main Thread backend...");const aa=K=>new Promise(($,X)=>{const ia=Ea(Ca({},z),{enableSeqConv:K}),ga=Ea(Ca({},E),{enableSeqConv:K}),Ma=(Na,qa,ha,Ia)=>{Ia&&Ia.Status==="Fail"?X(new Error(Ia.Error_Type||ha||"Inference Failed")):ha&&typeof ha=="string"&&(ha.toLowerCase().includes("fail")||ha.toLowerCase().includes("error")||ha.toLowerCase().includes("compatible")||ha.toLowerCase().includes("texture")||ha.toLowerCase().includes("maximum"))&&X(new Error(ha)),ba(Na,qa,ha,Ia)},Oa=(Na,qa,ha)=>{Ga(Na,qa,ha),$()};pl(ia,ga,S.volumes[0].hdr,J,Oa,Ma).catch(Na=>X(Na))});try{console.log("Attempting Main Thread with enableSeqConv: false"),yield aa(!1)}catch(K){console.warn("Main Thread (fast) failed, retrying with enableSeqConv: true",K),yield new Promise($=>setTimeout($,100));try{console.log("Attempting Main Thread with enableSeqConv: true"),yield aa(!0)}catch($){console.error("Main Thread (slow) failed.",$),Jl($)}}})}modelSelect.onchange=ra,y&&(y.onclick=()=>{modelSelect.value="0",ra()}),g&&(g.onchange=()=>{U&&va().catch(s=>{console.error("Could not switch result overlay:",s),Ba("Overlay error",Ha((s==null?void 0:s.message)||String(s)))})});function xa(s){const E=M(),z=d!==null&&E&&u;z&&(E.img=u);try{return s()}finally{z&&L()}}function V(s){return D(this,null,function*(){if(c!=null&&c.busy)return;if(!U||!w){window.alert("No result to save (run Skull-strip first).");return}const E=yield S.volumes[0].clone();if(E.zeroImage(),Object.assign(E.hdr,{scl_inter:0,scl_slope:1}),s==="mask"){E.img=U,E.hdr.datatypeCode=2,E.hdr.numBitsPerVoxel=8,E.hdr.intent_code=1002,E.saveToDisk("brainmask.nii.gz");return}E.img=w,E.hdr.intent_code=0,E.saveToDisk("skull_stripped_brain.nii.gz")})}function Q(){if(S.volumes.length<1){window.alert("No image loaded.");return}S.volumes[0].saveToDisk("input.nii.gz")}function oa(){return D(this,null,function*(){if(S.volumes.length<1){window.alert("No image loaded.");return}yield xa(()=>D(null,null,function*(){yield S.saveDocument("brainchomp.nvd")}))})}const ta=[{act:()=>V("brain"),title:"Skull-stripped brain",sub:"input intensities with background set to zero",need:"result"},{act:()=>V("mask"),title:"Brain mask",sub:"binary mask, including accepted edits",need:"result"},{act:Q,title:"Input volume",sub:"the currently loaded 256³ NIfTI",need:"img"},{act:oa,title:"Scene",sub:"everything, as a .nvd document",need:"img"}];function na(){const s=S.volumes.length>=1,E=!!U,z=R=>R==="result"?E:s,Y=ta.map((R,ua)=>{const aa=z(R.need)?"":" disabled";return`<button type="button" class="save-opt${aa}" data-i="${ua}"${aa?" disabled":""}>
        <span class="save-opt-title">${R.title}</span>
        <span class="save-opt-sub">${R.sub}</span>
      </button>`}).join("");Ba("Save",`<div class="save-options">${Y}</div>`,{hideClose:!0,saveMode:!0});const J=document.getElementById("dialogMessage");J&&J.querySelectorAll(".save-opt:not(.disabled)").forEach(R=>{R.onclick=()=>{const ua=ta[parseInt(R.dataset.i,10)],aa=document.getElementById("appDialog");aa&&aa.open&&aa.close(),ua.act()}})}const da=document.getElementById("saveBtn");da&&(da.onclick=na);function fa(s,E,z){const J=new Map,R=E.length;for(let K=0;K<R;K++){const $=E[K];if($===0)continue;let X=J.get($);X||(X={count:0,sum:0,sumSq:0,hist:new Float64Array(256)},J.set($,X));const ia=s[K];X.count++,X.sum+=ia,X.sumSq+=ia*ia,X.hist[ia]++}const ua=(K,$,X)=>{const ia=X*$;let ga=0;for(let Ma=0;Ma<K.length;Ma++)if(ga+=K[Ma],ga>=ia)return Ma;return K.length-1},aa=[];for(const[K,$]of[...J.entries()].sort((X,ia)=>X[0]-ia[0])){const X=$.sum/$.count,ia=Math.max(0,$.sumSq/$.count-X*X);let ga=0,Ma=0;for(let Oa=0;Oa<$.hist.length;Oa++)if($.hist[Oa]>0){ga=Oa;break}for(let Oa=$.hist.length-1;Oa>=0;Oa--)if($.hist[Oa]>0){Ma=Oa;break}aa.push({label:K,name:r&&r[K]!=null?r[K]:`label_${K}`,voxels:$.count,volume_mm3:$.count*z,min:ga,max:Ma,q1:ua($.hist,$.count,.25),median:ua($.hist,$.count,.5),q3:ua($.hist,$.count,.75),mean:X,stdev:Math.sqrt(ia)})}return aa}function sa(s){const E=["label","name","voxels","volume_mm3","min","max","q1","median","q3","mean","stdev"],z=R=>Number.isInteger(R)?String(R):R.toFixed(6),Y=R=>/[",\n]/.test(R)?`"${String(R).replace(/"/g,'""')}"`:String(R),J=[E.join(",")];for(const R of s)J.push([R.label,Y(R.name),R.voxels,z(R.volume_mm3),R.min,R.max,R.q1,R.median,R.q3,z(R.mean),z(R.stdev)].join(","));return J.join(`
`)+`
`}function ya(s){const E=new Blob([sa(s)],{type:"text/csv"}),z=URL.createObjectURL(E),Y=document.createElement("a");Y.href=z,Y.download="mask_stats.csv",document.body.appendChild(Y),Y.click(),Y.remove(),URL.revokeObjectURL(z)}const ka=s=>String(s).replace(/[&<>"]/g,E=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[E]),ca=s=>{const E=s/1e3;return E>=10?Math.round(E).toLocaleString():E.toFixed(1)};function Pa(s,E){const z=Math.max(...s.map(R=>R.volume_mm3)),Y=R=>n&&n.R&&n.R[R.label]!=null?`rgb(${n.R[R.label]},${n.G[R.label]},${n.B[R.label]})`:"#6b9bd1";let J="";for(const R of s){const ua=E>0?R.volume_mm3/E*100:0,aa=z>0?R.volume_mm3/z*100:0,K=`<span class="stat-val" data-cm3="${ca(R.volume_mm3)}" data-pct="${ua.toFixed(1)}%">${ca(R.volume_mm3)}</span>`,$=`<span class="stat-bar" style="width:${aa.toFixed(2)}%;background:${Y(R)}" data-w-abs="${aa.toFixed(2)}" data-w-pct="${ua.toFixed(2)}"></span>`,X=(ga,Ma)=>`<div><span class="k">${ga}</span><span class="v">${Ma}</span></div>`,ia=X("min",R.min)+X("max",R.max)+X("Q1",R.q1)+X("Q3",R.q3)+X("median",R.median)+X("mean",R.mean.toFixed(2))+X("SD",R.stdev.toFixed(2))+X("voxels",R.voxels.toLocaleString());J+=`
        <div class="stat-row" role="button" tabindex="0" data-label="${R.label}" style="cursor:pointer">
          <div class="stat-line">
            <span class="stat-name">${ka(R.name)}</span>
            <span class="stat-track">${$}</span>
            ${K}
            <button type="button" class="stat-iso" title="Show only this region in the viewer">isolate</button>
          </div>
          <div class="stat-detail" style="display:none">${ia}</div>
        </div>`}return`
      <style>
        /* niivue.css sets a global "div{display:table-row}"; force block/flex on our
           plain container divs so width/1fr track sizing works. */
        /* Cap the dialog and let ONLY the region list scroll, so the header,
           toggle, Download and Close stay pinned/visible with long atlases. */
        #appDialog[open]{max-height:88vh;display:flex;flex-direction:column;box-sizing:border-box}
        #appDialog[open] h3{flex:0 0 auto}
        #appDialog[open] #dialogCloseBtn{flex:0 0 auto;align-self:center;width:auto;float:none}
        #dialogMessage{display:flex;flex-direction:column;flex:1 1 auto;min-height:0}
        #statsPanel{display:flex;flex-direction:column;flex:1 1 auto;min-height:0;width:440px;max-width:100%;box-sizing:border-box}
        #statsPanel .stat-head{flex:0 0 auto;display:flex;justify-content:space-between;align-items:baseline;margin:0 0 8px}
        #statsPanel .stat-total{opacity:.7;font-size:.95em}
        #statsPanel .stat-toggle{flex:0 0 auto;align-self:flex-start;display:inline-flex;border:1px solid #444;border-radius:8px;overflow:hidden;margin:0 0 10px}
        #statsPanel .stat-toggle button{background:transparent;color:inherit;border:0;padding:6px 16px;cursor:pointer;font:inherit;float:none;margin:0}
        #statsPanel .stat-toggle button.active{background:#3a3a3a;font-weight:600}
        #statsPanel #statsRows{flex:1 1 auto;min-height:0;overflow-y:auto;display:block}
        #statsPanel .stat-row{display:block;padding:6px 4px;border-radius:6px}
        #statsPanel .stat-row:hover{background:rgba(255,255,255,.05)}
        #statsPanel .stat-line{display:grid;grid-template-columns:120px 1fr 60px auto;align-items:center;gap:10px}
        #statsPanel .stat-iso{background:transparent;color:inherit;border:1px solid #555;border-radius:6px;padding:2px 8px;font:inherit;font-size:.78em;opacity:.55;cursor:pointer;float:none;margin:0}
        #statsPanel .stat-row:hover .stat-iso{opacity:.9}
        #statsPanel .stat-iso:hover{background:#3a3a3a;border-color:#777}
        #statsPanel .stat-name{text-align:right;opacity:.85;font-size:.9em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        #statsPanel .stat-track{background:rgba(255,255,255,.06);border-radius:5px;height:18px;overflow:hidden;min-width:0}
        #statsPanel .stat-bar{display:block;height:100%;border-radius:5px;min-width:3px}
        #statsPanel .stat-val{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
        #statsPanel .stat-detail{margin:4px 0 6px 0;display:grid;grid-template-rows:auto auto;grid-auto-flow:column;grid-auto-columns:1fr;gap:2px 14px;font-size:.78em;font-variant-numeric:tabular-nums}
        #statsPanel .stat-detail>div{display:flex;justify-content:space-between;gap:6px;white-space:nowrap}
        #statsPanel .stat-detail .k{opacity:.55}
        #statsPanel .stat-detail .v{font-weight:600}
        #statsPanel .stat-actions{flex:0 0 auto;display:block;margin-top:12px;border-top:1px solid #444;padding-top:10px;text-align:right}
      </style>
      <div id="statsPanel">
        <div class="stat-head">
          <span class="stat-total" id="statsUnitLabel">total ${ca(E)} cm³</span>
        </div>
        <div class="stat-toggle">
          <button type="button" data-mode="cm3" class="active">cm³</button>
          <button type="button" data-mode="pct">% of total</button>
        </div>
        <div id="statsRows">${J}</div>
        <div class="stat-actions">
          <button type="button" id="statsDownloadBtn">Download CSV</button>
        </div>
      </div>`}saveStatsBtn.onclick=function(){if(S.volumes.length<2){window.alert("No segmentation to measure (run a model first).");return}const s=S.volumes[0].img,E=u||S.volumes[1].img;if(!s||!E||s.length!==E.length){window.alert("Input and segmentation grids do not match.");return}const z=S.volumes[0].hdr.pixDims||[],Y=z[1]&&z[2]&&z[3]?z[1]*z[2]*z[3]:1;let J=fa(s,E,Y);if(J.length===0){window.alert("No non-background labels found in the segmentation.");return}J=J.slice().sort((aa,K)=>K.volume_mm3-aa.volume_mm3);const R=J.reduce((aa,K)=>aa+K.volume_mm3,0);Ba("Region volumes",Pa(J,R));const ua=document.getElementById("statsPanel");ua&&(ua.querySelectorAll(".stat-toggle button").forEach(aa=>{aa.onclick=()=>{const K=aa.dataset.mode;ua.querySelectorAll(".stat-toggle button").forEach($=>$.classList.toggle("active",$===aa)),document.getElementById("statsUnitLabel").textContent=K==="pct"?"100% of segmented volume":`total ${ca(R)} cm³`,ua.querySelectorAll(".stat-row").forEach($=>{const X=$.querySelector(".stat-val"),ia=$.querySelector(".stat-bar");X.textContent=K==="pct"?X.dataset.pct:X.dataset.cm3,ia.style.width=(K==="pct"?ia.dataset.wPct:ia.dataset.wAbs)+"%"})}}),ua.querySelectorAll(".stat-row").forEach(aa=>{const K=()=>{const $=aa.querySelector(".stat-detail");$.style.display=$.style.display==="none"?"grid":"none"};aa.onclick=K,aa.onkeydown=$=>{($.key==="Enter"||$.key===" ")&&($.preventDefault(),K())}}),ua.querySelectorAll(".stat-iso").forEach(aa=>{aa.onclick=K=>{K.stopPropagation();const $=parseInt(aa.closest(".stat-row").dataset.label,10);Number.isNaN($)||Z($);const X=document.getElementById("appDialog");X&&X.open&&X.close()}}),document.getElementById("statsDownloadBtn").onclick=()=>ya(J))};function ea(){b=S.volumes[0]||null,b&&b.name&&b.name,opacitySlider0.oninput(),modelSelect.value="-1",S.volumes.length===1&&C()}function va(){return D(this,null,function*(){if(!U||!w||!fe)return;yield G(),N();const s=yield S.volumes[0].clone();if(s.zeroImage(),Object.assign(s.hdr,{scl_inter:0,scl_slope:1}),r=null,n=null,g!=null&&g.checked){s.img=U;const E=["Background","Brain Mask"];r=E.slice();const z=[0,217],Y=[0,119],J=[0,33];n={R:z,G:Y,B:J},s.setColormapLabel({R:z,G:Y,B:J,labels:E}),s.hdr.datatypeCode=2,s.hdr.numBitsPerVoxel=8,s.hdr.intent_code=1002}else s.img=w,s.hdr.intent_code=0,s.colormap=S.colormaps().includes("copper2")?"copper2":"actc";s.opacity=opacitySlider1.value/255,yield S.addVolume(s)})}function Ga(s,E,z){return D(this,null,function*(){c==null||c.invalidate(),fe=z,U=new Uint8Array(s.length),w=new S.volumes[0].img.constructor(s.length);const Y=S.volumes[0].img;for(let J=0;J<s.length;J++){const R=s[J]!==0?1:0;U[J]=R,w[J]=Y[J]*R}g&&(g.disabled=!1),yield va(),c==null||c.updateAvailability()})}function pa(s){return D(this,null,function*(){if(typeof s=="string")try{s=JSON.parse(s)}catch(E){console.error("Failed to parse telemetry data",E);return}s=yield Rl(s,S.gl),l=`:: Diagnostics https://github.com/neuroneural/brainchop/issues ::
`;for(const E in s)s[E]!==null&&s[E]!==void 0&&(l+=`${E}: ${s[E]}
`)})}function ba(s="",E=-1,z="",Y=[]){s&&(console.log(s),document.getElementById("location").innerHTML=s),isNaN(E)?(memstatus.style.color="red",memstatus.innerHTML="Memory Issue"):E>=0&&(modelProgress.value=E*modelProgress.max),z&&(ja?(le.push(String(z)),console.warn("[backend]",z)):Ba("Message",Ha(String(z)).replace(/\n/g,"<br>"))),Y&&Object.keys(Y).length>0&&pa(Y)}function f(s){document.getElementById("location").innerHTML=s.string.split("   ").map(E=>E.trim()).filter(E=>E!=="").map(E=>`<span class="loc-seg">${E}</span>`).join('<span class="loc-sep">&middot;</span>')}const h={backColor:[0,0,0,1],show3Dcrosshair:!0,onLocationChange:f},S=new Ut(h);yield S.attachTo("gl1"),c=jt({nv:S,getState:()=>U?{mask:U,dims:S.volumes[0].hdr.dims.slice(1,4),affine:S.volumes[0].hdr.affine,running:ja}:null,prepare:()=>D(null,null,function*(){N(),g.checked=!0,yield va()}),onPatch:({rect:s})=>{const[E,z,Y,J]=s,[R,ua,aa]=S.volumes[0].hdr.dims.slice(1,4),K=S.volumes[0].img;for(let $=0;$<aa;$++)for(let X=z;X<=J;X++)for(let ia=E;ia<=Y;ia++){const ga=ia+R*(X+ua*$);w[ga]=K[ga]*U[ga]}},onError:s=>Ba("Sculpting",Ha(s.message))}),S.gl.canvas.addEventListener("click",H),window.addEventListener("keydown",s=>{s.key!=="Escape"||d===null||document.querySelector("dialog[open]")||(d=null,L())});const O=S.gl.uniform4fv.bind(S.gl);S.gl.uniform4fv=function(s,E){if(d!==null){const z=S.orientShaderAtlasU&&S.orientShaderAtlasU.uniforms.xyzaFrac,Y=S.orientShaderAtlasI&&S.orientShaderAtlasI.uniforms.xyzaFrac;if(z&&s===z||Y&&s===Y)return O(s,[0,0,0,E[3]])}return O(s,E)};const Sa=S.drawSceneCore.bind(S);S.drawSceneCore=function(){const s=Sa();try{I()}catch(E){console.warn("isolation HUD draw failed",E)}return s},Object.assign(S.opts,{dragMode:S.dragModes.slicer3D,multiplanarForceRender:!0,yoke3Dto2DZoom:!0,crosshairGap:11});{const s=document.getElementById("dragSegmented");s&&s.querySelectorAll("button").forEach(E=>E.classList.toggle("active",parseInt(E.dataset.drag,10)===S.opts.dragMode))}S.setInterpolation(!0);function Ua(s){return D(this,null,function*(){for(C();S.volumes.length;)yield S.removeVolume(S.volumes[S.volumes.length-1]);N(),yield S.loadVolumes([{url:s}])})}S.onImageLoaded=ea,P&&(P.onchange=()=>Ua(P.value),yield Ua(P.value)),modelSelect.innerHTML="";const wa=document.createElement("option");wa.text="Run Segmentation Model",wa.value="-1",wa.disabled=!0,wa.selected=!0,wa.hidden=!0,modelSelect.appendChild(wa);for(let s=0;s<Ra.length;s++){console.log(`Adding model option: ${Ra[s].modelName}`);const E=document.createElement("option");E.text=Ra[s].modelName,E.value=s,Ra[s].type==="Divider"&&(E.disabled=!0),modelSelect.appendChild(E)}Xl(S),zl(S),modelSelect.value="-1",A(-1),yield Hl();const la=new URLSearchParams(window.location.search).get("model");la&&la<Ra.length&&(modelSelect.value=la,ra())})}function Ha(l){return String(l).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}function Jl(l){const t=(le.length?le:[l&&l.message?l.message:String(l||"unknown error")]).map(r=>`<li>${Ha(r)}</li>`).join("");Ba("Segmentation failed",`<p>No available backend could run this model on this device.</p>
     <ul style="margin:0 0 4px 1.1em;padding:0;font-size:0.92em;line-height:1.45">${t}</ul>
     <p style="font-size:0.88em;color:#9aa4af">Full details are in the browser console and under Diagnostics.</p>`)}function Ba(l,a,t={}){const r=document.getElementById("appDialog"),n=document.getElementById("dialogTitle"),e=document.getElementById("dialogMessage"),d=document.getElementById("dialogCloseBtn");if(!r)return;n.textContent=l,e.innerHTML=a,d.style.display=t.hideClose?"none":"",d.onclick=()=>r.close(),r.classList.toggle("dialog-save",!!t.saveMode);const u=document.getElementById("dialogXBtn");u&&(u.onclick=()=>r.close()),r.showModal()}function Ql(){return D(this,null,function*(){try{const a=yield(yield fetch("https://api.github.com/repos/neuroneural/brainchop")).json();document.getElementById("star-count").textContent=a.stargazers_count}catch(l){console.error("Error fetching star count:",l)}})}(function(){return D(this,null,function*(){yield Zl(),yield Ql()})})();
