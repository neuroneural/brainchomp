var nt=Object.defineProperty,ut=Object.defineProperties;var st=Object.getOwnPropertyDescriptors;var Ue=Object.getOwnPropertySymbols;var ft=Object.prototype.hasOwnProperty,ot=Object.prototype.propertyIsEnumerable;var _e=(l,a,t)=>a in l?nt(l,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[a]=t,_a=(l,a)=>{for(var t in a||(a={}))ft.call(a,t)&&_e(l,t,a[t]);if(Ue)for(var t of Ue(a))ot.call(a,t)&&_e(l,t,a[t]);return l},Ma=(l,a)=>ut(l,st(a));var $=(l,a,t)=>new Promise((r,u)=>{var e=f=>{try{s(t.next(f))}catch(v){u(v)}},d=f=>{try{s(t.throw(f))}catch(v){u(v)}},s=f=>f.done?r(f.value):Promise.resolve(f.value).then(e,d);s((t=t.apply(l,a)).next())});import{m as ct}from"./vendor-gTbkpY2o.js";import{W as dt,X as vt,Y as Ia,Z as ge,_ as Re,$ as gt,z as ce,b as ka,O as le,E as bt,a0 as pt,K as yt,a1 as xe,a2 as ht,k as ja,u as St,y as mt,i as ke,a3 as Ce}from"./vendor-math-Cp3_ovwH.js";import{S as $a,a as Pt,M as ie,N as Ut}from"./vendor-niivue-Cdme4TKu.js";import{l as _t,t as Ka,s as xt,d as Ga,b as Ie,a as ma,z as Ct,g as Fe,w as Za,f as Ne,m as wt,o as Mt,c as de,e as Et,h as be,i as te,r as ze,j as Tt,k as We,n as Gt,p as Ot,q as $e,u as xa,v as De,x as Lt,y as Wa,A as Bt,B as re,C as At,D as Rt}from"./vendor-tf-DGuKl8vL.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))r(u);new MutationObserver(u=>{for(const e of u)if(e.type==="childList")for(const d of e.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function t(u){const e={};return u.integrity&&(e.integrity=u.integrity),u.referrerPolicy&&(e.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?e.credentials="include":u.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(u){if(u.ep)return;u.ep=!0;const e=t(u);fetch(u.href,e)}})();function kt(l,a){let t=0,r=1;const u=[0,0,0];for(const e of a){const d=Math.abs(e)-1;u[d]=Math.sign(e)*r,e<0&&(t+=(l[d]-1)*r),r*=l[d]}return{offset:t,strides:u}}class It{constructor(a){if(this.nv=a,this.volume=a.volumes[1],this.opacity=this.volume.opacity,this.drawOpacity=a.drawOpacity,this.drawLut=a.drawLut,!a.loadDrawing(this.volume))throw new Error("Could not align the mask with the slice grid.");a.drawClearAllUndoBitmaps(),a.setDrawingEnabled(!1);const t=a.drawLut.lut.slice();t.set([217,119,33,255],4),a.drawLut=Ma(_a({},a.drawLut),{lut:t}),a.refreshColormaps(),a.setDrawOpacity(this.opacity),a.setOpacity(1,0),Object.assign(this,kt(this.volume.hdr.dims.slice(1,4),this.volume.permRAS))}patch({rect:a,data:t}){const[r,u,e,d]=a,s=e-r+1,f=d-u+1,[v,g,S]=this.strides,b=this.nv.drawBitmap,p=this.volume.hdr.dims[3];for(let o=0;o<p;o++)for(let P=u;P<=d;P++){let M=this.offset+r*v+P*g+o*S,w=s*(P-u+f*o);for(let C=r;C<=e;C++,M+=v)b[M]=t[w++]}this.nv.refreshDrawing(!0)}close(){const a=this.nv,t=a.drawOpacity;a.closeDrawing(),a.drawLut=this.drawLut,a.setDrawOpacity(this.drawOpacity),a.refreshColormaps(),a.volumes[1]===this.volume&&(this.volume.opacity=t,a.updateGLVolume())}}function qe(l,a=[0,0,1]){const t=ce(ka(),l);let r=le(ka(),a,t);bt(r)<1e-5&&(r=le(r,[0,1,0],t)),ce(r,r);const u=le(ka(),t,r);return ge(Ia(),pt(Ia(),yt(...r,...u,...t)))}function we(){return qe([0,-Math.cos(.2),Math.sin(.2)])}function Ft(l,a,t){const r=Math.hypot(a,t);if(!r)return dt(l);const u=vt(Ia(),[t/r,a/r,0],r*.006);return ge(Ia(),Re(Ia(),l,u))}function Nt(l,a,t,r,u){const e=([s,f])=>{const v=Math.max(1,Math.min(r,u)),g=[(2*s-r)/v,(u-2*f)/v,0],S=Math.hypot(g[0],g[1]);return g[2]=S<Math.SQRT1_2?Math.sqrt(1-S*S):.5/Math.max(S,1e-6),ce(ka(),g)},d=gt(Ia(),e(t),e(a));return ge(Ia(),Re(Ia(),l,d))}function ne(l,a){return[0,1,2].map(t=>l[t]*a[0]+l[t+4]*a[1]+l[t+8]*a[2]+l[t+12])}const Me=(l,a)=>[l[1]*a[2]-l[2]*a[1],l[2]*a[0]-l[0]*a[2],l[0]*a[1]-l[1]*a[0]],ue=(l,a)=>l.map((t,r)=>t-a[r]),zt=(l,a)=>l.reduce((t,r,u)=>t+r*a[u],0);function se(l){const a=Math.hypot(...l);return a>1e-15?l.map(t=>t/a):[0,0,1]}function Ee(l,a,t,r){const[u,e,d,s]=t,f=d-u+1,v=s-e+1;for(let g=0;g<a[2];g++)for(let S=e;S<=s;S++)l.set(r.subarray(f*(S-e+v*g),f*(S-e+v*g)+f),u+a[0]*(S+a[1]*g))}const Wt=`#version 300 es
precision highp float;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
uniform mat4 affine, mvp;
out vec3 worldNormal;
void main(){worldNormal=normal;gl_Position=mvp*affine*vec4(position,1.0);}`,$t=`#version 300 es
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
}`;class Dt{constructor(a,t,r,u){this.canvas=a,this.overlay=t,this.positions=r.positions,this.normals=r.normals,this.affine=u;const e=a.getContext("webgl2",{antialias:!0,alpha:!1});if(!e)throw new Error("Sculpting requires WebGL2.");this.gl=e;const d=(b,p)=>{const o=e.createShader(b);if(e.shaderSource(o,p),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(o));return o},s=d(e.VERTEX_SHADER,Wt),f=d(e.FRAGMENT_SHADER,$t),v=e.createProgram();if(e.attachShader(v,s),e.attachShader(v,f),e.linkProgram(v),!e.getProgramParameter(v,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(v));e.deleteShader(s),e.deleteShader(f),this.program=v,this.uniforms=Object.fromEntries(["affine","mvp","picking","eyeDirection"].map(b=>[b,e.getUniformLocation(v,b)])),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),this.positionBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.positionBuffer),e.bufferData(e.ARRAY_BUFFER,r.positions,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,0,0),this.normalBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.normalBuffer),e.bufferData(e.ARRAY_BUFFER,r.normals,e.DYNAMIC_DRAW),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,0,0),this.indexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r.indices,e.STATIC_DRAW),this.count=r.indices.length;const g=[1/0,1/0,1/0],S=[-1/0,-1/0,-1/0];for(let b=0;b<r.positions.length;b+=3){const p=ne(u,r.positions.subarray(b,b+3));for(let o=0;o<3;o++)g[o]=Math.min(g[o],p[o]),S[o]=Math.max(S[o],p[o])}this.center=g.map((b,p)=>(b+S[p])/2),this.target=this.center.slice(),this.scale=Math.hypot(...ue(S,g))*.6,this.initialScale=this.scale,this.orientation=we(),this.crosshair=null,this.cursor=null,this.framebuffer=e.createFramebuffer(),this.textures=[e.createTexture(),e.createTexture()],this.depth=e.createRenderbuffer(),this.observer=new ResizeObserver(()=>this.draw()),this.observer.observe(a),this.draw()}matrices(){this.direction=Array.from(xe(ka(),[0,0,1],this.orientation));const a=xe(ka(),[0,1,0],this.orientation),t=this.target.map((s,f)=>s+this.direction[f]*this.initialScale*4),r=ht(ja(),t,this.target,a),u=this.canvas.width/this.canvas.height,e=this.scale,d=St(ja(),-e*u,e*u,-e,e,.001*this.initialScale,10*this.initialScale);this.mvp=mt(ja(),d,r),this.inverseMVP=ke(ja(),this.mvp)}resize(){const a=Math.min(2,window.devicePixelRatio||1),t=Math.max(1,Math.round(this.canvas.clientWidth*a)),r=Math.max(1,Math.round(this.canvas.clientHeight*a));if(this.canvas.width===t&&this.canvas.height===r)return;this.canvas.width=t,this.canvas.height=r,this.overlay.width=t,this.overlay.height=r;const u=this.gl;if(u.bindFramebuffer(u.FRAMEBUFFER,this.framebuffer),this.textures.forEach((e,d)=>{u.bindTexture(u.TEXTURE_2D,e),u.texImage2D(u.TEXTURE_2D,0,u.RGBA8,t,r,0,u.RGBA,u.UNSIGNED_BYTE,null),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.NEAREST),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.NEAREST),u.framebufferTexture2D(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0+d,u.TEXTURE_2D,e,0)}),u.bindRenderbuffer(u.RENDERBUFFER,this.depth),u.renderbufferStorage(u.RENDERBUFFER,u.DEPTH_COMPONENT24,t,r),u.framebufferRenderbuffer(u.FRAMEBUFFER,u.DEPTH_ATTACHMENT,u.RENDERBUFFER,this.depth),u.checkFramebufferStatus(u.FRAMEBUFFER)!==u.FRAMEBUFFER_COMPLETE)throw new Error("Could not allocate the surface picking buffer.");u.bindFramebuffer(u.FRAMEBUFFER,null)}render(a){const t=this.gl;t.useProgram(this.program),t.bindVertexArray(this.vao),t.viewport(0,0,this.canvas.width,this.canvas.height),t.enable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.BLEND),t.uniformMatrix4fv(this.uniforms.affine,!1,this.affine),t.uniformMatrix4fv(this.uniforms.mvp,!1,this.mvp),t.uniform1i(this.uniforms.picking,a?1:0),t.uniform3fv(this.uniforms.eyeDirection,this.direction),t.drawElements(t.TRIANGLES,this.count,t.UNSIGNED_INT,0)}draw(){if(this.disposed)return;this.resize(),this.matrices();const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,null),a.disable(a.SCISSOR_TEST),a.clearColor(.035,.04,.045,1),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),this.render(!1),this.drawCursor()}project(a){const t=Ce(ka(),a,this.mvp);return[(t[0]+1)*this.overlay.width/2,(1-t[1])*this.overlay.height/2]}drawCursor(){const a=this.overlay.getContext("2d");if(a.clearRect(0,0,this.overlay.width,this.overlay.height),this.drawCrosshair(a),!this.cursor)return;const{point:t,normal:r,radius:u,origin:e}=this.cursor,d=se(Me(r,Math.abs(r[2])<.9?[0,0,1]:[0,1,0])),s=Me(r,d),f=this.overlay.width/this.canvas.clientWidth;a.strokeStyle=this.cursor.tool==="smooth"?"#99e8b5":"#f5df42",a.lineWidth=1.7*f;for(const v of[1,.12]){a.beginPath();for(let g=0;g<=96;g++){const S=g*Math.PI/48,b=t.map((o,P)=>o+u*v*(d[P]*Math.cos(S)+s[P]*Math.sin(S))),p=this.project(b);g?a.lineTo(...p):a.moveTo(...p)}a.stroke()}e&&(a.setLineDash([4*f,4*f]),a.beginPath(),a.moveTo(...this.project(e)),a.lineTo(...this.project(t)),a.stroke(),a.setLineDash([]))}drawCrosshair(a){if(!this.crosshair)return;const t=this.overlay.width/Math.max(1,this.canvas.clientWidth),r=this.project(this.crosshair),u=this.scale*.09;a.save(),a.strokeStyle="#65dcff",a.lineWidth=1.4*t,a.shadowColor="#000",a.shadowBlur=3*t,a.setLineDash([4*t,3*t]);for(let e=0;e<3;e++){const d=this.crosshair.slice(),s=this.crosshair.slice();d[e]-=u,s[e]+=u,a.beginPath(),a.moveTo(...this.project(d)),a.lineTo(...this.project(s)),a.stroke()}a.setLineDash([]),a.beginPath(),a.arc(...r,4*t,0,Math.PI*2),a.stroke(),a.restore()}orbit(a,t){this.orientation=Ft(this.orientation,a,t),this.cursor=null,this.draw()}dragOrbit(a,t){const r=this.canvas.getBoundingClientRect();this.orientation=Nt(this.orientation,a.map((u,e)=>u-(e?r.top:r.left)),t.map((u,e)=>u-(e?r.top:r.left)),r.width,r.height),this.cursor=null,this.draw()}resetView(){this.target=this.center.slice(),this.scale=this.initialScale,this.orientation=we(),this.cursor=null,this.draw()}pick(a,t){this.resize(),this.matrices();const r=this.gl,u=this.canvas.getBoundingClientRect(),e=Math.floor((a-u.left)*this.canvas.width/u.width),d=this.canvas.height-1-Math.floor((t-u.top)*this.canvas.height/u.height);if(e<0||d<0||e>=this.canvas.width||d>=this.canvas.height)return null;r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),r.drawBuffers([r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),r.enable(r.SCISSOR_TEST),r.scissor(e,d,1,1),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),this.render(!0);const s=new Uint8Array(4),f=new Uint8Array(4);if(r.readBuffer(r.COLOR_ATTACHMENT0),r.readPixels(e,d,1,1,r.RGBA,r.UNSIGNED_BYTE,s),r.readBuffer(r.COLOR_ATTACHMENT1),r.readPixels(e,d,1,1,r.RGBA,r.UNSIGNED_BYTE,f),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.FRAMEBUFFER,null),!s[3])return null;const v=(s[0]+256*s[1]+65536*s[2]-1)/16777214;return{point:Array.from(Ce(ka(),[(e+.5)/this.canvas.width*2-1,(d+.5)/this.canvas.height*2-1,v*2-1],this.inverseMVP)),normal:se([f[0]/255*2-1,f[1]/255*2-1,f[2]/255*2-1])}}patch(a){if(!a)return;const t=this.gl;for(const[r,u,e]of[[a.positions,this.positions,this.positionBuffer],[a.normals,this.normals,this.normalBuffer]])if(r){a.ids.forEach((d,s)=>u.set(r.subarray(s*3,s*3+3),d*3)),t.bindBuffer(t.ARRAY_BUFFER,e);for(let d=0;d<a.ids.length;){let s=d+1;for(;s<a.ids.length&&a.ids[s]===a.ids[s-1]+1;)s++;t.bufferSubData(t.ARRAY_BUFFER,a.ids[d]*12,r.subarray(d*3,s*3)),d=s}}}focus(a){var d;let t=0,r=1/0;for(let s=0;s<this.positions.length;s+=3){const f=ne(this.affine,this.positions.subarray(s,s+3)),v=zt(ue(f,a),ue(f,a));v<r&&(r=v,t=s)}const u=ne(this.affine,this.positions.subarray(t,t+3)),e=se(Array.from(this.normals.subarray(t,t+3)));return this.target=u,this.orientation=qe(e),this.cursor={point:u,normal:e,radius:((d=this.cursor)==null?void 0:d.radius)||this.initialScale*.1},this.draw(),{point:u,normal:e}}dispose(){this.disposed=!0,this.observer.disconnect();const a=this.gl;for(const t of[this.positionBuffer,this.normalBuffer,this.indexBuffer])a.deleteBuffer(t);this.textures.forEach(t=>a.deleteTexture(t)),a.deleteRenderbuffer(this.depth),a.deleteFramebuffer(this.framebuffer),a.deleteVertexArray(this.vao),a.deleteProgram(this.program)}}function qt({nv:l,getState:a,prepare:t,onPatch:r,onError:u}){const e=document.getElementById("sculptBtn"),d=document.getElementById("canvas-container"),s=document.createElement("section");s.id="sculpt-panel",s.hidden=!0,s.innerHTML='<div class="sculpt-bar"><strong>Sculpt mask</strong><div class="sculpt-modes" role="group" aria-label="Surface interaction"><button type="button" data-mode="grab" aria-pressed="true">Grab</button><button type="button" data-mode="smooth" aria-pressed="false">Smooth</button><button type="button" data-mode="rotate" aria-pressed="false">Rotate</button></div><button type="button" data-action="undo" title="Undo (Ctrl/⌘ Z)" disabled>Undo</button><button type="button" data-action="redo" title="Redo (Ctrl/⌘ Shift Z)" disabled>Redo</button><button type="button" data-action="done">Done</button></div><div class="sculpt-size"><label>Size <input aria-label="Brush radius" type="range" min="1" max="100" value="35"/><output></output></label><button type="button" data-action="focus" title="Bring the surface nearest the slice crosshair forward">Focus slice</button><button type="button" data-action="reset">Reset view</button></div><div class="sculpt-viewport"><canvas class="sculpt-surface" aria-label="Brain mask sculpting surface" tabindex="0"></canvas><canvas class="sculpt-cursor" aria-hidden="true"></canvas></div><p class="sculpt-help">Drag the ring along its normal. Facing you: drag up to pull, down to push. Two-finger scroll or right-drag rotates. Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.</p><p class="sculpt-status" role="status" aria-live="polite"></p>',d.append(s);const f=s.querySelector(".sculpt-surface"),v=s.querySelector(".sculpt-cursor"),g=s.querySelector("input"),S=s.querySelector("output"),b=s.querySelector(".sculpt-status"),p=s.querySelector(".sculpt-help"),o=Object.fromEntries([...s.querySelectorAll("[data-action]")].map(_=>[_.dataset.action,_])),P=["modelRunButton","sampleSelect","maskToggle","drawBtn","modelSelect"],M=new Map;let w=null,C=null,k=new Map,j=0,W=!1,q=!1,i="grab",G=null,R=0,y=null,c=null,O=1,T={undo:0,redo:0},z=0,N=null;const V=()=>{var _;e.disabled=!a()||!W&&((_=a())==null?void 0:_.running)||q,e.setAttribute("aria-pressed",String(W)),e.title=a()?"Sculpt the brain mask":"Run Skull-strip first to enable sculpting",o.undo.disabled=q||!T.undo,o.redo.disabled=q||!T.redo,o.done.disabled=q,o.focus.disabled=q,o.reset.disabled=q,g.disabled=q,s.querySelectorAll("[data-mode]").forEach(L=>L.disabled=q);for(const L of["saveBtn","saveStatsBtn"]){const F=document.getElementById(L);F&&(F.disabled=W&&q)}},I=_=>{q=_,V()},Z=(_,L={})=>new Promise((F,ea)=>{if(!w){ea(new Error("Editing session was closed."));return}const pa=++j;k.set(pa,{resolve:F,reject:ea}),w.postMessage(_a({id:pa,type:_},L))}),ua=()=>{O=c.minRadius+(c.maxRadius-c.minRadius)*(Number(g.value)-1)/99,S.textContent=`${Number(O.toPrecision(3))} mm`,C!=null&&C.cursor&&(C.cursor.radius=O,C.drawCursor())};g.oninput=ua;function Q(_){for(const L of P){const F=document.getElementById(L);F&&(_?(M.set(L,F.disabled),F.disabled=!0):M.has(L)&&(F.disabled=M.get(L)))}_||M.clear()}const ha=()=>{!W||!C||(C.crosshair=Array.from(l.frac2mm(l.scene.crosshairPos)),s.dataset.crosshair=C.crosshair.join(","),C.drawCursor())},Ca=l.onLocationChange;l.onLocationChange=function(_){Ca==null||Ca.call(l,_),ha()};const Pa=_=>{l.scene.crosshairPos=Array.from(l.mm2frac(_)).map(L=>Math.max(0,Math.min(1,L))),l.createOnLocationChange()},H=_=>{_&&(C.patch(_),Ee(c.mask,c.dims,_.rect,_.data),r(_),N.patch(_))},la=_=>{b.textContent=_.message||String(_),console.error("Sculpt:",_)};function va(){return $(this,null,function*(){var L;if(W||!a())return;if((L=l.drawBitmap)!=null&&L.some(F=>F!==0)){u(new Error("Apply or clear the current drawing before opening Sculpt."));return}W=!0,s.hidden=!1,d.classList.add("sculpting"),Q(!0),I(!0),y={sliceType:l.opts.sliceType,multiplanarForceRender:l.opts.multiplanarForceRender,multiplanarShowRender:l.opts.multiplanarShowRender},l.setDrawingEnabled(!1),l.closeDrawing(),l.opts.multiplanarForceRender=!1,l.opts.multiplanarShowRender=0,l.setSliceType(l.sliceTypeMultiplanar),l.resizeListener();const _=z;try{if(yield t(),_!==z)return;if(N=new It(l),w)ha(),C.draw(),b.textContent="Ready · corrections and undo history retained.";else{b.textContent="Building the editable surface…";const F=a(),ea=new Float32Array(16);for(let U=0;U<4;U++)for(let h=0;h<4;h++)ea[h*4+U]=F.affine[U][h];const pa=ke(ja(),ea);if(!pa)throw new Error("Image geometry has a singular affine.");const da=[0,4,8].map(U=>Math.hypot(ea[U],ea[U+1],ea[U+2]));c=Ma(_a({},F),{affine:ea,inverse:pa,minRadius:Math.min(...da)*2,maxRadius:Math.min(...F.dims.map((U,h)=>U*da[h]))*.16}),c.maxRadius=Math.max(c.minRadius*2,c.maxRadius),ua(),w=new Worker(new URL(""+new URL("worker-DsbYbgyC.js",import.meta.url).href,import.meta.url),{type:"module"}),w.onmessage=({data:U})=>{const h=k.get(U.id);h&&(k.delete(U.id),U.error?h.reject(new Error(U.error)):(T=U.history,h.resolve(U)))},w.onerror=U=>{for(const h of k.values())h.reject(new Error(U.message||"Surface worker failed."));k.clear()};const{result:fa,ms:x}=yield Z("init",{mask:F.mask,dims:F.dims,affine:ea,inverse:pa});if(_!==z)return;C=new Dt(f,v,fa,ea),ha(),s.dataset.triangles=String(fa.indices.length/3),s.dataset.buildMs=String(Math.round(x)),b.textContent="Ready · hover over the surface to place the grab."}}catch(F){_===z&&(la(F),ra(),u(F))}finally{_===z&&I(!1)}})}function ia(){!W||q||(W=!1,G=null,N==null||N.close(),N=null,cancelAnimationFrame(R),s.hidden=!0,d.classList.remove("sculpting"),y&&Object.assign(l.opts,y),Q(!1),l.resizeListener(),V())}function ra(){z++,q=!1,ia(),w==null||w.terminate(),w=null,C==null||C.dispose(),C=null,c=null,T={undo:0,redo:0};for(const _ of k.values())_.reject(new Error("Editing session was replaced."));k.clear(),V()}e.onclick=()=>{W?ia():va()},o.done.onclick=ia,s.querySelectorAll("[data-mode]").forEach(_=>_.onclick=()=>{i=_.dataset.mode,p.textContent=(i==="smooth"?"Smooth: click to soften the patch; drag upward for more. ":i==="grab"?"Grab: drag along the normal; facing you, up pulls and down pushes. ":"Drag to freely rotate. ")+"Two-finger scroll or right-drag rotates; Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.",s.querySelectorAll("[data-mode]").forEach(L=>L.setAttribute("aria-pressed",String(L===_))),f.style.cursor=i==="rotate"?"grab":"crosshair",C.cursor=null,C.drawCursor()});function ca(_){return $(this,null,function*(){if(q||!C)return;I(!0);const L=z;try{const{result:F}=yield Z(_);if(L!==z)return;H(F),C.draw(),b.textContent=_==="undo"?"Correction undone.":"Correction restored."}catch(F){L===z&&la(F)}finally{L===z&&I(!1)}})}o.undo.onclick=()=>ca("undo"),o.redo.onclick=()=>ca("redo");const ba=()=>{if(!W||q||!C)return;const _=C.focus(Array.from(l.frac2mm(l.scene.crosshairPos)));return C.cursor.radius=O,C.drawCursor(),b.textContent="Nearest surface to the slice crosshair highlighted.",_};o.focus.onclick=ba,o.reset.onclick=()=>C==null?void 0:C.resetView(),l.gl.canvas.addEventListener("dblclick",()=>{W&&requestAnimationFrame(ba)});for(const _ of["drop","dragover"])l.gl.canvas.addEventListener(_,L=>{W&&(L.preventDefault(),L.stopImmediatePropagation(),b.textContent="Choose Done before loading another image.")},!0);f.addEventListener("contextmenu",_=>_.preventDefault()),f.addEventListener("webglcontextlost",_=>$(null,null,function*(){_.preventDefault(),z++,I(!0);try{if((G==null?void 0:G.kind)==="grab"){const{result:L}=yield Z("cancel");L&&c&&(Ee(c.mask,c.dims,L.rect,L.data),r(L),N==null||N.patch(L))}}catch(L){la(L)}finally{ra(),u(new Error("The sculpting graphics context was lost. Accepted corrections are retained; reopen Sculpt after graphics recovers."))}})),f.addEventListener("wheel",_=>{if(_.preventDefault(),!C||q)return;const L=_.deltaMode===1?16:_.deltaMode===2?f.clientHeight:1,F=_.deltaX*L,ea=_.deltaY*L;_.altKey||_.metaKey||_.ctrlKey?(C.scale=Math.max(C.initialScale*.15,Math.min(C.initialScale*3,C.scale*Math.exp(ea*.001))),C.draw()):C.orbit(F,ea)},{passive:!1});const sa=_=>{if(!C||q)return;const L=i!=="rotate"?C.pick(_.clientX,_.clientY):null;C.cursor=L?Ma(_a({},L),{radius:O,tool:i}):null,C.drawCursor()};f.addEventListener("pointerleave",()=>{!G&&C&&(C.cursor=null,C.drawCursor())}),f.addEventListener("pointerdown",_=>$(null,null,function*(){if(!C||q||G||![0,2].includes(_.button))return;if(_.preventDefault(),f.focus(),f.setPointerCapture(_.pointerId),i==="rotate"||_.button===2||_.shiftKey){G={kind:"rotate",id:_.pointerId,x:_.clientX,y:_.clientY},C.cursor=null,C.drawCursor();return}const L=C.pick(_.clientX,_.clientY);if(!L)return;const F=C.project(L.point),ea=C.project(L.point.map((Ea,Ta)=>Ea+L.normal[Ta])),pa=f.width/f.clientWidth,da=(ea[0]-F[0])/pa,fa=(ea[1]-F[1])/pa,x=Math.hypot(da,fa),U=2*C.scale/f.clientHeight,h=x*U>.2?[da/x,fa/x]:[0,-1],A={kind:"grab",tool:i,id:_.pointerId,hit:L,x:_.clientX,y:_.clientY,direction:h,worldPerPixel:U,wanted:i==="smooth"?.35:0,shown:0,starting:!0,running:!1,ended:!1,cancelled:!1,generation:z};G=A,I(!0),C.cursor=Ma(_a({},L),{radius:O,tool:A.tool,origin:L.point}),Pa(L.point),l.drawScene(),C.drawCursor(),b.textContent=A.tool==="smooth"?"Softening this patch · drag upward for more; Escape cancels.":"Drag to move the boundary · Escape cancels this grab.";try{const{result:Ea,ms:Ta}=yield Z("begin",{center:L.point,normal:L.normal,tool:A.tool,radius:O});s.dataset.beginMs=String(Math.round(Ta)),A.max=A.tool==="smooth"?1:Ea.maxDistance,A.starting=!1,Sa(A)}catch(Ea){A.generation===z&&(la(Ea),G=null,I(!1))}}));function Sa(_){return $(this,null,function*(){if(!(_.starting||_.running||_.generation!==z)){_.running=!0;try{for(;!_.cancelled&&_.wanted!==_.shown;){const L=Math.max(_.tool==="smooth"?0:-_.max,Math.min(_.max,_.wanted));_.wanted=L;const F=performance.now(),{result:ea,ms:pa}=yield Z(_.tool==="smooth"?"smooth":"move",_.tool==="smooth"?{amount:L}:{distance:L});if(_.generation!==z)return;_.shown=L;const da=_.tool==="smooth"?_.hit.point:_.hit.point.map((x,U)=>x+_.hit.normal[U]*L);Pa(da),H(ea),C.cursor={point:da,normal:_.hit.normal,tool:_.tool,radius:O,origin:_.hit.point},C.draw();const fa=performance.now()-F;b.textContent=_.tool==="smooth"?"Smoothing this patch · release to keep, Escape to cancel.":`${L>=0?"+":""}${Number(L.toPrecision(3))} mm${Math.abs(L)>=_.max?" · release and grab again to move farther":""}`,s.dataset.previewMs=String(Math.round(fa)),s.dataset.workerMs=String(Math.round(pa))}if(_.ended){const{result:L,ms:F}=yield Z(_.cancelled?"cancel":"commit");if(s.dataset.commitMs=String(Math.round(F)),_.generation!==z)return;_.cancelled?(H(L),Pa(_.hit.point),l.drawScene(),C.cursor=Ma(_a({},_.hit),{radius:O,tool:_.tool}),b.textContent="Correction cancelled."):b.textContent="Correction applied · inspect the slices, then rotate or grab again.",C.draw(),G=null,I(!1)}}catch(L){if(_.generation===z){try{const{result:F}=yield Z("cancel");H(F),Pa(_.hit.point),l.drawScene(),C.draw()}catch(F){ra(),u(F)}G=null,I(!1),la(L)}}finally{_.running=!1}}})}f.addEventListener("pointermove",_=>{const L=G;if((L==null?void 0:L.id)===_.pointerId){L.kind==="rotate"?(C.dragOrbit([L.x,L.y],[_.clientX,_.clientY]),L.x=_.clientX,L.y=_.clientY):L.ended||(L.wanted=L.tool==="smooth"?.35+(L.y-_.clientY)/120:((_.clientX-L.x)*L.direction[0]+(_.clientY-L.y)*L.direction[1])*L.worldPerPixel,Sa(L));return}cancelAnimationFrame(R),R=requestAnimationFrame(()=>sa(_))});const Oa=(_,L=!1)=>{const F=G;if(!(!F||F.id!==_.pointerId)){if(F.kind==="rotate"){G=null;return}F.ended||(F.ended=!0,F.cancelled=L,Sa(F))}};return f.addEventListener("pointerup",_=>Oa(_)),f.addEventListener("pointercancel",_=>Oa(_,!0)),f.addEventListener("lostpointercapture",_=>Oa(_,!0)),window.addEventListener("keydown",_=>{!W||/INPUT|TEXTAREA|SELECT/.test(_.target.tagName)||document.querySelector("dialog[open]")||(_.key==="Escape"&&(G==null?void 0:G.kind)==="grab"?(_.preventDefault(),G.cancelled=!0,G.ended=!0,Sa(G)):(_.ctrlKey||_.metaKey)&&_.key.toLowerCase()==="z"?(_.preventDefault(),ca(_.shiftKey?"redo":"undo")):(_.ctrlKey||_.metaKey)&&_.key.toLowerCase()==="y"&&(_.preventDefault(),ca("redo")))}),V(),{invalidate:ra,updateAvailability:V,get active(){return W},get busy(){return q}}}const Vt={batchSize:1,numOfChan:1,isColorEnable:!0,isAutoColors:!0,bgLabelValue:0,drawBoundingVolume:!1,isGPU:!0,isBrainCropMaskBased:!0,showPhase1Output:!1,isPostProcessEnable:!0,fillSuppressedWithNeighborLabel:!1,diagnoseEnclosedComponents:!1,isContoursViewEnable:!1,browserArrayBufferMaxZDim:30,telemetryFlag:!1,chartXaxisStepPercent:10,uiSampleName:"Brainchomp sample",atlasSelectedColorTable:"Fire"},Yt={path:"/models/rodent/model.json",webgpu_safetensor:"./models/rodent/model.safetensors",webgpu_runner:"rodent",forceFP32:!1,webgpuStorageSize:536870912,numClasses:2,preModelId:null,preModelPostProcess:!1,isBatchOverlapEnable:!1,numOverlapBatches:0,enableTranspose:!0,enableCrop:!1,cropPadding:0,autoThreshold:0,enableQuantileNorm:!0,filterOutWithPreMask:!1,enableSeqConv:!0,textureSize:0,isPostProcessEnable:!0,returnMaskForExtraction:!0,inferenceDelay:100,warning:null},Ba=[Ma(_a({},Yt),{id:1,type:"Brain_Extraction",modelName:"Skull-strip",description:"Extract the rodent brain and save the input intensities with non-brain voxels set to zero."})];class jt{idx(a,t,r,u){return r*u[0]*u[1]+t*u[0]+a}check_previous_slice(a,t,r,u,e,d,s,f,v,g){let S=0;if(!e)return 0;const b=a[this.idx(r,u,e,d)];if(s>=6){const p=this.idx(r,u,e-1,d);b===a[p]&&(v[S++]=t[p])}if(s>=18){if(r){const p=this.idx(r-1,u,e-1,d);b===a[p]&&(v[S++]=t[p])}if(u){const p=this.idx(r,u-1,e-1,d);b===a[p]&&(v[S++]=t[p])}if(r<d[0]-1){const p=this.idx(r+1,u,e-1,d);b===a[p]&&(v[S++]=t[p])}if(u<d[1]-1){const p=this.idx(r,u+1,e-1,d);b===a[p]&&(v[S++]=t[p])}}if(s===26){if(r&&u){const p=this.idx(r-1,u-1,e-1,d);b===a[p]&&(v[S++]=t[p])}if(r<d[0]-1&&u){const p=this.idx(r+1,u-1,e-1,d);b===a[p]&&(v[S++]=t[p])}if(r&&u<d[1]-1){const p=this.idx(r-1,u+1,e-1,d);b===a[p]&&(v[S++]=t[p])}if(r<d[0]-1&&u<d[1]-1){const p=this.idx(r+1,u+1,e-1,d);b===a[p]&&(v[S++]=t[p])}}return S?(this.fill_tratab(f,v,S,g),v[0]):0}do_initial_labelling(a,t,r){const u=new Uint32Array(32),e=new Uint32Array(32);let d=1;const s=8192;let f=s,v=new Uint32Array(f).fill(0);const g=new Uint32Array(t[0]*t[1]*t[2]).fill(0),S=new Uint32Array(27);for(let b=0;b<t[2];b++)for(let p=0;p<t[1];p++)for(let o=0;o<t[0];o++){let P=0;const M=a[this.idx(o,p,b,t)];if(M!==0){if(S[0]=this.check_previous_slice(a,g,o,p,b,t,r,v,u,e),S[0]&&(P+=1),r>=6){if(o){const w=this.idx(o-1,p,b,t);M===a[w]&&(S[P++]=g[w])}if(p){const w=this.idx(o,p-1,b,t);M===a[w]&&(S[P++]=g[w])}}if(r>=18){if(p&&o){const w=this.idx(o-1,p-1,b,t);M===a[w]&&(S[P++]=g[w])}if(p&&o<t[0]-1){const w=this.idx(o+1,p-1,b,t);M===a[w]&&(S[P++]=g[w])}}if(P)g[this.idx(o,p,b,t)]=S[0],this.fill_tratab(v,S,P,e);else{if(g[this.idx(o,p,b,t)]=d,d>=f){f+=s;const w=new Uint32Array(f);w.set(v),v=w}v[d-1]=d,d++}}}for(let b=0;b<d-1;b++){let p=b;for(;v[p]!==p+1;)p=v[p]-1;v[b]=p+1}return[d-1,v,g]}fill_tratab(a,t,r,u){let d=2147483647;for(let s=0;s<r;s++){let f=t[s];for(;a[f-1]!==f;)f=a[f-1];u[s]=f,d=Math.min(d,f)}for(let s=0;s<r;s++)a[u[s]-1]=d}translate_labels(a,t,r,u){const e=t[0]*t[1]*t[2];let d=0;const s=new Uint32Array(e).fill(0);for(let g=0;g<u;g++)d=Math.max(d,r[g]);const f=new Uint32Array(d).fill(0);let v=0;for(let g=0;g<e;g++)a[g]&&(f[r[a[g]-1]-1]||(v+=1,f[r[a[g]-1]-1]=v),s[g]=f[r[a[g]-1]-1]);return[v,s]}neighbor_winners(a,t,r,u){const e=t[0],d=t[1],s=t[2],f=e*d,v=new Map,g=(b,p)=>{let o=v.get(b);o||(o=new Map,v.set(b,o)),o.set(p,(o.get(p)||0)+1)};for(let b=0;b<s;b++)for(let p=0;p<d;p++)for(let o=0;o<e;o++){const P=b*f+p*e+o,M=a[P];if(M===0||r[M])continue;let w;o>0&&(w=r[a[P-1]])&&g(M,w),o<e-1&&(w=r[a[P+1]])&&g(M,w),p>0&&(w=r[a[P-e]])&&g(M,w),p<d-1&&(w=r[a[P+e]])&&g(M,w),b>0&&(w=r[a[P-f]])&&g(M,w),b<s-1&&(w=r[a[P+f]])&&g(M,w)}const S=new Uint32Array(u+1).fill(0);for(const[b,p]of v){let o=0,P=0;for(const[M,w]of p)(w>P||w===P&&(o===0||M<o))&&(P=w,o=M);S[b]=o}return S}finalize_volume(a,t,r,u,e){const d=a.length,s=new Uint32Array(d).fill(0),f=e?this.neighbor_winners(a,t,r,u):null;let v=0;for(let g=0;g<d;g++){const S=a[g];if(S===0)continue;let b=r[S];!b&&f&&(b=f[S]),b&&(s[g]=b,b>v&&(v=b))}return[v,s]}diagnose_components(a,t,r,u,e={}){var R,y,c;const d=(R=e.topN)!=null?R:50,s=(y=e.minSize)!=null?y:1,f=(c=e.label)!=null?c:"diag",v=u[0],g=u[1],S=u[2],b=v*g,p=new Uint32Array(t+1),o=new Uint32Array(t+1);for(let O=0;O<a.length;O++){const T=r[O];T&&(p[T]=a[O],o[T]++)}const P=new Map,M=new Uint32Array(t+1),w=new Uint32Array(t+1),C=(O,T)=>{let z=P.get(O);z||(z=new Map,P.set(O,z)),z.set(T,(z.get(T)||0)+1)};for(let O=0;O<S;O++)for(let T=0;T<g;T++)for(let z=0;z<v;z++){const N=O*b+T*v+z,V=r[N];if(!V)continue;const I=p[V],Z=ua=>{const Q=r[ua];if(Q===V)return;w[V]++;const ha=Q?p[Q]:0;ha===0?M[V]++:ha!==I&&C(V,ha)};z>0&&Z(N-1),z<v-1&&Z(N+1),T>0&&Z(N-v),T<g-1&&Z(N+v),O>0&&Z(N-b),O<S-1&&Z(N+b)}const k=new Map,j=new Map;for(let O=1;O<=t;O++){const T=p[O];k.set(T,(k.get(T)||0)+1),(!j.has(T)||o[O]>j.get(T))&&j.set(T,o[O])}const W=[];for(let O=1;O<=t;O++){if(o[O]<s)continue;const T=p[O],z=P.get(O);let N=0,V=0,I=0;if(z)for(const[ua,Q]of z)I+=Q,Q>V&&(V=Q,N=ua);const Z=w[O]||1;W.push({comp:O,class:T,size:o[O],largestOfClass:o[O]===j.get(T)?"Y":"n",compsInClass:k.get(T),domNeighbor:N,domFracForeign:I?+(V/I).toFixed(2):0,domFracBoundary:+(V/Z).toFixed(2),bgFrac:+(M[O]/Z).toFixed(2)})}W.sort((O,T)=>T.domFracForeign-O.domFracForeign||T.size-O.size);const q=(O,T)=>{const z=T.map(V=>Math.max(V.h.length,...O.map(I=>String(I[V.k]).length))),N=V=>V.map((I,Z)=>String(I).padStart(z[Z])).join("  ");return[N(T.map(V=>V.h)),...O.map(V=>N(T.map(I=>V[I.k])))].join(`
`)},i=[{k:"comp",h:"comp"},{k:"class",h:"class"},{k:"size",h:"size"},{k:"largestOfClass",h:"lrg"},{k:"compsInClass",h:"nComp"},{k:"domNeighbor",h:"domNbr"},{k:"domFracForeign",h:"encF"},{k:"domFracBoundary",h:"encB"},{k:"bgFrac",h:"bgF"}];console.log(`[${f}] total components=${t}, distinct classes=${k.size}
[${f}] island candidates (encF≈1 + small size + lrg=n ⇒ swallowed island):
`+q(W.slice(0,d),i));const G=[...k.entries()].map(([O,T])=>({class:O,components:T,maxCompSize:j.get(O)})).sort((O,T)=>T.components-O.components);return console.log(`[${f}] per-class component counts (components=1 ⇒ fully connected):
`+q(G.slice(0,30),[{k:"class",h:"class"},{k:"components",h:"comps"},{k:"maxCompSize",h:"maxSize"}])),W}largest_original_cluster_labels(a,t,r,u=null,e=!1){const d=a.length,s=new Uint32Array(t+1).fill(0),f=new Uint32Array(t+1).fill(0);for(let v=0;v<d;v++){const g=a[v],S=r[v];s[S]=g,f[S]++}for(let v=0;v<t+1;v++){const g=s[v];for(let S=0;S<t+1;S++)S!==v&&g===s[S]&&(f[v]<f[S]||f[v]===f[S]&&v<S)&&(s[v]=0)}return this.finalize_volume(r,u,s,t,e)}filter_clusters(a,t,r,u,e=null,d=!1){const s=a.length,f=new Uint32Array(t+1).fill(0),v=new Uint32Array(t+1).fill(0);for(let b=0;b<s;b++){const p=a[b],o=r[b];o>0&&(f[o]=p,v[o]++)}const g=new Uint8Array(t+1).fill(1);for(let b=1;b<=t;b++){const p=f[b];if(u==="all"||u.has&&u.has(p)){for(let P=1;P<=t;P++)if(b!==P&&f[P]===p){if(v[P]>v[b]){g[b]=0;break}else if(v[P]===v[b]&&P<b){g[b]=0;break}}}}const S=new Uint32Array(t+1).fill(0);for(let b=1;b<=t;b++)g[b]&&(S[b]=f[b]);return this.finalize_volume(r,e,S,t,d)}filter_clusters_by_ratio(a,t,r,u,e=null,d=!1){const s=a.length,f=new Uint32Array(t+1).fill(0),v=new Uint32Array(t+1).fill(0);for(let p=0;p<s;p++){const o=r[p];o>0&&(f[o]===0&&(f[o]=a[p]),v[o]++)}const g=new Map;for(let p=1;p<=t;p++){const o=f[p],P=v[p];(!g.has(o)||P>g.get(o))&&g.set(o,P)}const S=new Uint8Array(t+1).fill(0);for(let p=1;p<=t;p++){const o=f[p],P=v[p],M=g.get(o)||0;P>=M*u&&(S[p]=1)}const b=new Uint32Array(t+1).fill(0);for(let p=1;p<=t;p++)S[p]&&(b[p]=f[p]);return this.finalize_volume(r,e,b,t,d)}bwlabel(a,t,r=26,u=!1,e=!1){const d=Date.now(),s=t[0]*t[1]*t[2],f=new Uint32Array(s).fill(0);if(![6,18,26].includes(r))return console.log("bwlabel: conn must be 6, 18 or 26."),[0,f];if(t[0]<2||t[1]<2||t[2]<1)return console.log("bwlabel: img must be 2 or 3-dimensional"),[0,f];if(u)for(let o=0;o<s;o++)a[o]!==0&&(f[o]=1);else f.set(a);let[v,g,S]=this.do_initial_labelling(f,t,r);g===void 0&&(g=new Uint32Array(0));const[b,p]=this.translate_labels(S,t,g,v);if(console.log(r+" neighbor clustering into "+b+" regions in "+(Date.now()-d)+"ms"),e){const[o,P]=this.largest_original_cluster_labels(f,b,p);return[o,P]}return[b,p]}filter_clusters_by_rank(a,t,r,u,e=0,d=null,s=!1,f=null,v=!1){const g=a.length,S=new Uint32Array(t+1).fill(0),b=new Uint32Array(t+1).fill(0),p=f!=null&&Array.isArray(d)&&d.length===3,o=p?d[0]:0,P=p?d[1]:0,M=p?new Int32Array(t+1).fill(2147483647):null,w=p?new Int32Array(t+1).fill(-1):null,C=p?new Int32Array(t+1).fill(2147483647):null,k=p?new Int32Array(t+1).fill(-1):null,j=p?new Int32Array(t+1).fill(2147483647):null,W=p?new Int32Array(t+1).fill(-1):null;for(let c=0;c<g;c++){const O=r[c];if(O>0&&(S[O]===0&&(S[O]=a[c]),b[O]++,p)){const T=c%o,z=c/o|0,N=z%P,V=z/P|0;T<M[O]&&(M[O]=T),T>w[O]&&(w[O]=T),N<C[O]&&(C[O]=N),N>k[O]&&(k[O]=N),V<j[O]&&(j[O]=V),V>W[O]&&(W[O]=V)}}let q=null,i=0;if(p){let c=-1;for(let I=1;I<=t;I++)b[I]>c&&(c=b[I],i=I);const O=Math.max(2,Math.ceil(f)+4),T=o*P,z=new Int16Array(g).fill(-1);let N=[];for(let I=0;I<g;I++)r[I]===i&&(z[I]=0,N.push(I));for(let I=1;I<=O&&N.length;I++){const Z=[];for(let ua=0;ua<N.length;ua++){const Q=N[ua],ha=Q%o,Pa=(Q/o|0)%P;ha>0&&z[Q-1]===-1&&(z[Q-1]=I,Z.push(Q-1)),ha<o-1&&z[Q+1]===-1&&(z[Q+1]=I,Z.push(Q+1)),Pa>0&&z[Q-o]===-1&&(z[Q-o]=I,Z.push(Q-o)),Pa<P-1&&z[Q+o]===-1&&(z[Q+o]=I,Z.push(Q+o)),Q-T>=0&&z[Q-T]===-1&&(z[Q-T]=I,Z.push(Q-T)),Q+T<g&&z[Q+T]===-1&&(z[Q+T]=I,Z.push(Q+T))}N=Z}const V=O+1;q=new Float64Array(t+1).fill(V);for(let I=0;I<g;I++){const Z=r[I];if(Z>0&&Z!==i){const ua=z[I]>=0?z[I]:V;ua<q[Z]&&(q[Z]=ua)}}v&&console.log(`[rank-filter] brain comp=${i} size=${c} bbox A[${M[i]},${w[i]}] B[${C[i]},${k[i]}] C[${j[i]},${W[i]}] | maxGap=${f} scan=${O}`)}const G=new Map;for(let c=1;c<=t;c++){const O=S[c],T=b[c];G.has(O)||G.set(O,[]),G.get(O).push({i:c,size:T})}const R=new Uint8Array(t+1).fill(0);for(const[c,O]of G.entries()){O.sort((V,I)=>I.size-V.size);const T=O.length?O[0].size:0,z=e>0?T*e:0,N=Math.min(O.length,u);for(let V=0;V<N;V++){const I=O[V];if(I.size<z){v&&V>0&&console.log(`[rank-filter] class ${c} #${V}: size=${I.size} DROP (below ${(e*100).toFixed(0)}% floor)`);break}if(V>0&&p){const Z=q[I.i],ua=Z<=f;if(v&&console.log(`[rank-filter] class ${c} #${V}: size=${I.size} surfDist=${Z} -> ${ua?"KEEP":"DROP (too far)"}`),!ua)continue}R[I.i]=1}}const y=new Uint32Array(t+1).fill(0);for(let c=1;c<=t;c++)R[c]&&(y[c]=S[c]);return this.finalize_volume(r,d,y,t,s)}}function Xt(l,a,t){return $(this,null,function*(){const[r,u,e,d,s,f]=yield il(a),v=u-r+1,g=d-e+1,S=f-s+1,b=(G,R,y,c)=>{const O=Math.min(G,c),T=Math.min(255-R,c),z=Math.max(0,G-O),N=Math.min(255,R+T);return[z,N]},[p,o]=b(r,u,v,t),[P,M]=b(e,d,g,t),[w,C]=b(s,f,S,t);let k=l.slice([p,P,w],[o-p+1,M-P+1,C-w+1]);const j=k.shape,W=j[0]%2,q=j[1]%2,i=j[2]%2;return W||q||i?(k=k.pad([[0,W],[0,q],[0,i]]),console.log(`Padded to even dims: [${j}] -> [${k.shape}]`)):console.log(`Crop dimensions (already even): [${j}]`),{cropped:k,corner:[p,P,w],padding:[W,q,i]}})}function Ht(u,e,d){return $(this,arguments,function*(l,a,t,r=[0,0,0]){const[s,f,v]=a,[g,S,b]=t,[p,o,P]=l.shape,[M,w,C]=r||[0,0,0],k=Math.max(0,s+M),j=Math.max(0,f+w),W=Math.max(0,v+C),q=[[k,Math.max(0,g-p-k)],[j,Math.max(0,S-o-j)],[W,Math.max(0,b-P-W)]],i=l.pad(q);if(i.shape[0]>g||i.shape[1]>S||i.shape[2]>b){const G=i.slice([0,0,0],[g,S,b]);return i.dispose(),G}return i})}function Kt(l,a){return $(this,null,function*(){const t=l.max(),r=t.mul(a),u=yield r.data();return t.dispose(),r.dispose(),ma(()=>l.clone().greater(u[0]))})}function Te(l,a,t){const r=(a-1)*t,u=Math.floor(r),e=Math.ceil(r);let d=0,s=0,f=0,v=!1;for(let g=0;g<l.length;g++)if(d+=l[g],!v&&d>u&&(s=g,v=!0),d>e){f=g;break}return s+(f-s)*(r-u)}function Zt(l,a=.02,t=.98){return $(this,null,function*(){const r=l.flatten(),u=r.shape[0],e=yield r.data();r.dispose();const d=new Uint32Array(256);let s=!0;for(let o=0;o<u;o++){const P=e[o];if(!Number.isFinite(P))throw new Error("Cannot percentile-normalize a volume containing NaN or Infinity");P<0||P>255||P!==Math.trunc(P)?s=!1:d[P]++}if(s)return{qmin:Te(d,u,a),qmax:Te(d,u,t)};const f=Math.min(1e5,u),v=new Float32Array(f),g=f>1?(u-1)/(f-1):0;for(let o=0;o<f;o++){const P=e[Math.round(o*g)];if(!Number.isFinite(P))throw new Error("Cannot percentile-normalize a volume containing NaN or Infinity");v[o]=P}v.sort();const S=o=>{const P=(f-1)*o,M=Math.floor(P),w=Math.ceil(P);return v[M]+(v[w]-v[M])*(P-M)},b=S(a),p=S(t);return{qmin:b,qmax:p}})}function Jt(l,a,t,r,u,e,d){return $(this,null,function*(){const s=l.shape[4],f=a.shape[4];let v=null;for(let g=0;g<f;g++){const S=Math.ceil(s/d);let b=null;for(let o=0;o<S;o++){const P=o*d,M=Math.min((o+1)*d,s);if(P<s){const w=ma(()=>{const C=l.slice([0,0,0,0,P],[-1,-1,-1,-1,M-P]),k=a.slice([0,0,0,P,g],[-1,-1,-1,M-P,1]);return te(C,k,r,u,"NDHWC",e)});if(b===null)b=w;else{const C=b.add(w);b.dispose(),w.dispose(),b=C}}}let p;if(t){const o=t.slice([g],[1]);p=b.add(o),b.dispose(),o.dispose()}else p=b;if(v==null)v=p;else{const o=yield be([v,p],4);p.dispose(),v.dispose(),v=o}}return v})}function Qt(l,a=1e-5){return ma(()=>{const{mean:t,variance:r}=Ot(l,[1,2,3],!0),u=ze(r.add(a));return l.sub(t).mul(u)})}function al(l,a,t,r,u,e,d){return $(this,null,function*(){const s=l.shape[4],f=a.shape[4];let v=null;for(let g=0;g<f;g++){const S=Math.ceil(s/d);let b=null;for(let P=0;P<S;P++){const M=P*d,w=Math.min((P+1)*d,s);if(M<s){const C=ma(()=>{const k=l.slice([0,0,0,0,M],[-1,-1,-1,-1,w-M]),j=a.slice([0,0,0,M,g],[-1,-1,-1,w-M,1]);return te(k,j,r,u,"NDHWC",e)});if(b===null)b=C;else{const k=b.add(C);b.dispose(),C.dispose(),b=k}}}let p;if(t){const P=t.slice([g],[1]);p=b.add(P),b.dispose(),P.dispose()}else p=b;const o=Qt(p);if(p.dispose(),v===null)v=o;else{const P=yield be([v,o],4);o.dispose(),v.dispose(),v=P}}return v})}function Ve(l,a,t,r,u,e,d,s){const f=l.length;return ma(()=>{let v=null;const g=Math.ceil(f/s);for(let S=0;S<g;S++){const b=S*s,p=Math.min((S+1)*s,f),o=p-b,P=o===1?l[b]:be(l.slice(b,p),4),M=a.slice([0,0,0,b,r],[-1,-1,-1,o,1]),w=te(P,M,u,e,"NDHWC",d);v=v===null?w:v.add(w)}return t&&(v=v.add(t.slice([r],[1]))),v})}function Ge(l,a,t,r,u,e,d,s=!1){const f=a.shape[4],v=[];for(let g=0;g<f;g++){let S=Ve(l,a,t,g,r,u,e,d);if(s){const b=Ye(S);S.dispose(),S=b}v.push(S)}return v}function el(l,a,t,r,u,e){const d=a.shape[3],s=a.shape[4],f=[1,r[0],r[1],r[2],1],v=[];for(let g=0;g<d;g++){const S=ma(()=>{let b=null;for(let p=0;p<s;p++){const o=a.slice([0,0,0,g,p],[-1,-1,-1,1,1]),P=Et(l[p],o,f,u,e);b=b===null?P:b.add(P)}return t&&(b=b.add(t.slice([g],[1]))),b});v.push(S)}return v}function tl(l,a,t,r,u,e,d,s=!0){return $(this,null,function*(){const f=a.shape[4],v=3;let g=null,S=null,b=null;for(let p=0;p<f;p++){const o=Ve(l,a,t,p,r,u,e,v);b===null&&(b=[o.shape[1],o.shape[2],o.shape[3]]);const P=ma(()=>o.reshape(b));if(o.dispose(),g===null)g=P,S=Ct(P);else{const[M,w]=ma(()=>{const C=Fe(P,g);return[Za(C,P,g),Za(C,Ne(S.shape,p),S)]});g.dispose(),S.dispose(),P.dispose(),g=M,S=w}d&&d(`Final layer class ${p+1}/${f}`,(p+1)/f),!s&&p%8===0&&(yield new Promise(M=>setTimeout(M,0)))}return g.dispose(),S})}function ll(l){const a=l.shape[4];if(a===1)return[l];const t=[];for(let r=0;r<a;r++)t.push(l.slice([0,0,0,0,r],[-1,-1,-1,-1,1]));return t}function Ye(l,a=1e-5){return ma(()=>{const t=l.shape.length,r=l.shape[t-1],u=l.shape[1]*l.shape[2]*l.shape[3],e=l.transpose([0,4,1,2,3]).reshape([r,u]),d=e.mean(1),f=e.sub(d.reshape([r,1])).square().mean(1),v=ze(Tt(f,a)),g=d.reshape([1,1,1,1,r]),S=v.reshape([1,1,1,1,r]);return l.sub(g).mul(S)})}function fe(l,a=0){return $(this,null,function*(){let t=[];a===0?t=yield l.max(2).max(1).arraySync():a===1?t=yield l.max(2).max(0).arraySync():t=yield l.max(1).max(0).arraySync();let r=t.length,u=0;for(let e=0;e<t.length;e++)if(t[e]>0){r=e;break}for(let e=t.length-1;e>=0;e--)if(t[e]>0){u=e;break}return[r,u]})}function il(l){return $(this,null,function*(){const[a,t]=yield fe(l,0),[r,u]=yield fe(l,1),[e,d]=yield fe(l,2);return console.log("row min and max  :",a,t),console.log("col min and max  :",r,u),console.log("depth min and max  :",e,d),[a,t,r,u,e,d]})}function rl(l,a,t,r,u,e,d,s,f=!0){return $(this,null,function*(){l[0].dtype!=="int32"&&d("",-1,"generateBrainMask assumes int32"),u.preModelPostProcess&&d("",-1,"generateBrainMask assumes BWLabeler instead of preModelPostProcess");const v=l.length,g=l[0].size,S=v*g,b=new Int32Array(S);let p=0;for(let o=0;o<v;o++)b.set(l[o].dataSync(),p),p+=g;for(let o=0;o<S;o++)b[o]=b[o]!==0?1:0;return(f||e.showPhase1Output)&&(s(b,e,u),d("Segmentation finished",0)),Ka(b,[a,t,r])})}function nl(l,a,t){return $(this,null,function*(){const r=a.dims[1],u=a.dims[2];let e;if(a.datatypeCode===2)e=new Uint8Array(t);else if(a.datatypeCode===4)e=new Int16Array(t);else if(a.datatypeCode===8)e=new Int32Array(t);else if(a.datatypeCode===16)e=new Float32Array(t);else if(a.datatypeCode===64)e=new Float64Array(t);else if(a.datatypeCode===256)e=new Int8Array(t);else if(a.datatypeCode===512)e=new Uint16Array(t);else if(a.datatypeCode===768)e=new Uint32Array(t);else return;const d=[];let s=0;for(let v=0;v<l;v++){const g=new Array(u*r);let S=0;for(let b=0;b<u;b++)for(let p=0;p<r;p++){const o=e[s++];g[S++]=o&255}d.push(Ka(g,[u,r]))}const f=xt(d);return Ga(d),f})}function je(l){return $(this,null,function*(){return l.layers.length})}function Xe(l){return $(this,null,function*(){let a=0;for(let t=0;t<l.layers.length;t++)a+=l.layers[t].countParams();return a})}function Ja(l){return $(this,null,function*(){for(let a=0;a<l.layers.length;a++)if(l.layersByDepth[a][0].dataFormat)return l.layersByDepth[a][0].dataFormat==="channelsLast"})}function He(l){return $(this,null,function*(){return yield _t(l)})}function pe(l){return $(this,null,function*(){const a=l.max(),t=l.min();return yield l.sub(t).div(a.sub(t))})}function ul(l,a,t){const d=l.shape[4],s=Math.ceil(d/t);let f=null;for(let v=0;v<s;v++){const g=v*t,b=Math.min((v+1)*t,d)-g,p=ma(()=>l.slice([0,0,0,0,g],[-1,-1,-1,-1,b])),o=ma(()=>a.slice([0,0,0,g,0],[-1,-1,-1,b,-1])),P=te(p,o,1,0,"NDHWC",1);p.dispose(),o.dispose();const M=We(P);if(P.dispose(),f===null)f=M;else{const w=f.add(M);f.dispose(),f!==M&&M.dispose(),f=w}ma(()=>{Gt(de([1,1]),de([1,1]))})}return f}function ye(l,a=.02,t=.98,r=.001){return $(this,null,function*(){if(!(a>=0&&a<t&&t<=1))throw new Error(`Invalid normalization percentiles: ${a}, ${t}`);const{qmin:u,qmax:e}=yield Zt(l,a,t);console.log(`[Normalization] ${a*100}-${t*100} percentiles: low=${u}, high=${e}, epsilon=${r}, clip=[0,1]`);const d=e-u+r,s=l.sub(u),f=s.div(d),v=f.clipByValue(0,1);return s.dispose(),f.dispose(),v})}class sl{constructor(a,t,r,u,e=!0){this.model=a,this.outChannels=a.outputLayers[0].kernel.shape[4],this.chunkSize=t,this.isChannelLast=r,this.callbackUI=u,this.isWebWorker=e}apply(a){return $(this,null,function*(){const t=performance.now(),r=this.model.layers[this.model.layers.length-1],u=r.getWeights()[0],e=r.getWeights()[1],d=this.isChannelLast?a.shape.slice(1,-1):a.shape.slice(2);let s=yield wt(Mt(d),-1e4),f=yield de(d);const v=3,g=Math.ceil(this.outChannels/v);for(let p=0;p<g;p++){const o=p*v,P=Math.min((p+1)*v,this.outChannels),[M,w]=yield ma(()=>{let C=s,k=f;for(let j=o;j<P;j++){const W=u.slice([0,0,0,0,j],[-1,-1,-1,-1,1]),q=e.slice([j],[1]),i=ul(a,W,Math.min(this.chunkSize,this.outChannels)).add(q),G=Fe(i,C);C=Za(G,i,C),k=Za(G,Ne(k.shape,j),k)}return[C,k]});Ga([s,f]),s=M,f=w,this.callbackUI(`Processing chunk ${p+1}/${g}`,(p+1)/g),this.isWebWorker||(yield new Promise(C=>setTimeout(C,0)))}const S=f.clone();Ga([s,f]);const b=performance.now();return console.log(`Execution time: ${b-t} milliseconds`),S})}}function Ke(l,a,t,r){return $(this,null,function*(){console.log("Downloading segmentation data from GPU to CPU...");const u=yield l.data(),e=l.shape;if(console.log("Data download complete. Starting CPU processing."),r.isPostProcessEnable){console.log("Applying CPU-based connected-component labeling...");const d=performance.now(),s=new jt,f=[5,14],v=!!r.fillSuppressedWithNeighborLabel||f.includes(t.id),g=e[0]*e[1]*e[2],S=Math.max(1e5,Math.floor(g*.01)),[b,p]=s.bwlabel(u,e,6,!1,!1);if(b>S){const w=`Segmentation produced noise: ${b.toLocaleString()} disconnected regions (cap ${S.toLocaleString()}). The model output is unusable, so post-processing was aborted. Try re-running, switching backend (WebGPU/WebGL2), or another model.`;console.error("[postprocess] "+w);const C=new Error(w);throw C.code="SEGMENTATION_NOISE",C}let o=!1,P=!1;if(t.type==="Brain_Extraction"||t.type==="Brain_Masking"?(o=!0,P=!0):[1,7].includes(t.id)?(o=!1,P=!1):[5,14].includes(t.id)?(o=!1,P=!0):[3,8,9].includes(t.id)?(o=!1,P=!1):(o=!0,P=!0),[1,7].includes(t.id)){const j=b,W=p,[q,i]=s.filter_clusters_by_rank(u,j,W,2,.02,e,v,8,!1);u.set(i)}else if(!P&&[3,8,9].includes(t.id)){const[w,C]=s.bwlabel(u,e,6,!0,!0);for(let G=0;G<u.length;G++)u[G]*=C[G];const[k,j]=s.bwlabel(u,e,6,!1,!1),W=new Set([1,2,5,6,13]),[q,i]=s.filter_clusters(u,k,j,W,e,v);u.set(i)}else if(!o&&P){r.diagnoseEnclosedComponents&&s.diagnose_components(u,b,p,e,{label:`model${t.id}`,topN:60});const[w,C]=s.largest_original_cluster_labels(u,b,p,e,v);u.set(C)}else{const[w,C]=s.bwlabel(u,e,6,o,P);if(o)for(let k=0;k<u.length;k++)u[k]*=C[k];else u.set(C)}const M=((performance.now()-d)/1e3).toFixed(4);console.log(`Connected-component labeling took: ${M} seconds.`)}switch(t.type){case"Brain_Masking":{const d=new Uint8Array(u.length);for(let s=0;s<u.length;s++)d[s]=u[s]!==0?1:0;return d}case"Brain_Extraction":{if(t.returnMaskForExtraction){const s=new Uint8Array(u.length);for(let f=0;f<u.length;f++)s[f]=u[f]!==0?1:0;return s}const d=new a.constructor(u.length);for(let s=0;s<u.length;s++){const f=u[s]!==0?1:0;d[s]=a[s]*f}return d}default:return new Uint8Array(u)}})}function he(l,a,t){var f;let r=0,u=1;if(t)if(a.length===5)u=a[1]*a[2]*a[3];else for(let v=0;v<a.length;v++)a[v]>1&&(u*=a[v]);else if(a.length===5)u=a[2]*a[3]*a[4];else for(let v=0;v<a.length;v++)a[v]>32&&(u*=a[v]);let e=0,d=0;if(l&&l.layers){const v=l.layers.length;for(let g=0;g<v;g++){const S=l.layers[g],b=g===v-1;let p=0,o=S.outputShape;Array.isArray(o)&&Array.isArray(o[0])&&(o=o[0]),Array.isArray(o)&&(t?p=o[o.length-1]:p=o[1]);let P=0;const M=S.batchInputShape,w=C=>Array.isArray(C)?t?C[C.length-1]:C[1]:0;if(M)if(Array.isArray(M)&&Array.isArray(M[0]))for(const C of M)P+=w(C);else Array.isArray(M)&&(P=w(M));if(P===0&&S.weights&&S.weights.length>0){const C=S.weights[0];C&&C.shape&&(C.shape.length===5?P=C.shape[3]:C.shape.length===4&&(P=C.shape[2]))}if(P===0&&(P=p),typeof p=="number"&&typeof P=="number"){const C=u*(P+p),k=u*p;!b&&C>r&&(r=C);const j=u*Math.max(P,p);!b&&j>d&&(d=j),e=k}}}r===0&&(r=u*32*2),d===0&&(d=u*32);const s=!!(l&&l.layers&&l.layers.some(v=>typeof v.name=="string"&&v.name.endsWith("_gn")));return console.log(`[Estimator] Total Layers: ${(f=l==null?void 0:l.layers)==null?void 0:f.length}, Peak(in+out): ${r}, MaxSingle: ${d}, Final Output: ${e}, unpackedIntermediate: ${s}`),{peak:r,maxSingle:d,maxOutput:e,hasUnpackedIntermediate:s}}function Ze(l,a){try{const t=Ie();if(t&&t.gpgpu&&t.gpgpu.gl){const r=t.gpgpu.gl.getParameter(t.gpgpu.gl.MAX_TEXTURE_SIZE),u=Math.ceil(l/4),e=Math.ceil(Math.sqrt(u)),s=Math.ceil(Math.sqrt(a));if(console.log(`[Memory Check] Peak: ${l}, MaxOutput: ${a}, Packed Dim: ${e}, Unpacked Dim: ${s}, MaxTextureSize: ${r}`),e>r)return console.warn(`Proactive check (PACKED): Tensor size ${l} requires approx ${e}x${e} texture. Exceeds MAX_TEXTURE_SIZE ${r}`),!1;if(s>r)return console.warn(`Proactive check (UNPACKED): Max output ${a} requires approx ${s}x${s} texture. Exceeds MAX_TEXTURE_SIZE ${r}`),!1}}catch(t){console.warn("Could not check texture size limits:",t)}return!0}const Qa={WEBGPU:"webgpu",WEBGL_MAIN:"webgl-main",WEBGL_SEQUENTIAL:"webgl-sequential"};function Je(l,a){return{startTime:Date.now(),Model_Name:(l==null?void 0:l.modelName)||"Unknown",Execution_Mode:a,TF_Backend:a===Qa.WEBGPU?"webgpu":"webgl",isModelFullVol:null,No_SubVolumes:1,Brainchop_Ver:"FullVolume",Input_Shape:null,Output_Shape:null,Channel_Last:null,Model_Param:null,Model_Layers:null,Actual_Labels:null,Expect_Labels:null,NumLabels_Match:null,Missing_Labels:null,Inference_t:null,Postprocess_t:null,Status:null,Error_Type:null,Extra_Err_Info:null}}function fl(l,a,t,r,u,e){return $(this,null,function*(){var d,s,f;if(a)try{l.Input_Shape=JSON.stringify(t),l.Output_Shape=JSON.stringify(((d=a.output)==null?void 0:d.shape)||((f=(s=a.outputs)==null?void 0:s[0])==null?void 0:f.shape)),l.Channel_Last=r,u&&(l.Model_Param=yield u(a)),e&&(l.Model_Layers=yield e(a))}catch(v){console.warn("Failed to add model info to diagnostics:",v)}})}function Se(l,a,t,r=null){l.Expect_Labels=a,l.Actual_Labels=t,l.NumLabels_Match=a===t,r&&r.length>0&&(l.Missing_Labels=r.join(", "))}function me(l,a,t){l.Inference_t=a,l.Postprocess_t=t,l.Status="OK"}function Da(l,a,t=null){l.Inference_t=1/0,l.Postprocess_t=1/0,l.Status="Fail",l.Error_Type=(a==null?void 0:a.message)||String(a),t&&(l.Extra_Err_Info=t)}const ol=!1;function ae(l,a,t,r,u,e,d,s,f){return $(this,null,function*(){const v=performance.now();console.log(`---- Start FullVolume Inference (SeqConv: ${a.enableSeqConv}) ----`),a.enableQuantileNorm?(console.log("preModel Quantile normalization enabled"),r=yield ye(r)):(console.log("preModel Min Max normalization enabled"),r=yield pe(r));let g;if(u==null){const H=a.autoThreshold;H>0&&H<=1?g=yield Kt(r,H):g=yield r.greater([0]).asType("bool")}else g=yield u.greater([0]).asType("bool");const S=r.shape,b=a.webglEnableTranspose!==void 0?a.webglEnableTranspose:a.enableTranspose,p=a.cropPadding;let o,P,M;if(a.enableCrop){const H=yield Xt(r,g,p);o=H.cropped,P=H.corner,M=H.padding,r.dispose()}else{console.log("Skipping cropping (enableCrop: false)");const H=r.shape,la=H[0]%2,va=H[1]%2,ia=H[2]%2;la||va||ia?(console.log(`Padding standard input to even: ${H} -> +[${la}, ${va}, ${ia}]`),o=r.pad([[0,la],[0,va],[0,ia]]),M=[la,va,ia],r.dispose()):(o=r,M=null),P=[0,0,0]}g.dispose(),a.inputPermutation?(console.log(`Permuting Input: ${a.inputPermutation}`),o=o.transpose(a.inputPermutation)):b&&(o=o.transpose(),console.log("Input transposed for pre-model"));const w=yield t,C=w.layers.length,k=Ja(w);let j;k?(w.layers[0].batchInputShape[1]=o.shape[0],w.layers[0].batchInputShape[2]=o.shape[1],w.layers[0].batchInputShape[3]=o.shape[2],j=[l.batchSize,w.layers[0].batchInputShape[1],w.layers[0].batchInputShape[2],w.layers[0].batchInputShape[3],l.numOfChan]):(w.layers[0].batchInputShape[2]=o.shape[0],w.layers[0].batchInputShape[3]=o.shape[1],w.layers[0].batchInputShape[4]=o.shape[2],j=[l.batchSize,l.numOfChan,w.layers[0].batchInputShape[2],w.layers[0].batchInputShape[3],w.layers[0].batchInputShape[4]]);let W=o.reshape(j),q=!1;if(!a.enableSeqConv){const{peak:H,maxSingle:la,maxOutput:va,hasUnpackedIntermediate:ia}=he(w,j,k);console.log(`[Centralized Check] Peak (In+Out): ${H}, MaxSingle: ${la}, Max Output: ${va}, unpackedIntermediate: ${ia}`);const ra=Ie(),ca=ra&&ra.gpgpu&&ra.gpgpu.gl?ra.gpgpu.gl.getParameter(ra.gpgpu.gl.MAX_TEXTURE_SIZE):16384;console.log(`[Memory Check] MAX_TEXTURE_SIZE from WebGL context: ${ca}`);const sa=Math.ceil(Math.sqrt(Math.ceil(la/(ia?1:4)))),Sa=Math.ceil(Math.sqrt(va));sa>ca?(console.warn(`[Memory Check] PACKED intermediates too large (${sa} > ${ca}). Using full SeqConv.`),a.enableSeqConv=!0):Sa>ca?(console.warn(`[Memory Check] UNPACKED output too large (${Sa} > ${ca}). Using chunkedArgMax.`),q=!0):console.log("[Memory Check] All checks passed. Using fast path.")}const i=a.enableSeqConv?"SeqConv (SLOW: per-channel conv + sync every layer)":q?"fast + chunkedArgMax (final layer only)":"fast (dense)";console.log(`%c[PATH] ${i}  | crop=${o.shape}  | enableCrop=${a.enableCrop} cropPadding=${a.cropPadding}`,"font-weight:bold;color:#0a0");function G(H,la,va,ia,ra,ca,ba){return $(this,null,function*(){let sa=1,Sa=la;const Oa=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),_=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;let L=Oa||_?10:15;for(ra.enableSeqConv&&(L=1),console.log(`Syncing GPU every ${L} layers.`);sa<=va;){performance.now();let F="";try{let ea;const pa=H.layers[sa],da=pa.activation,fa=pa.getClassName()==="Conv3D"&&da&&da.getClassName()==="linear";ra.enableSeqConv&&fa?ea=yield(H.layers[sa].name.endsWith("_gn")?al:Jt)(Sa,H.layers[sa].getWeights()[0],H.layers[sa].getWeights()[1],H.layers[sa].strides,H.layers[sa].padding,H.layers[sa].dilationRate,3):ol&&H.layers[sa].name.endsWith("_gn")||(ea=ma(()=>{let x=H.layers[sa].apply(Sa);return H.layers[sa].name.endsWith("_gn")&&(x=Ye(x)),x})),Sa.dispose(),Sa=ea}catch(ea){throw ba(ea.message,-1,ea.message),xa().endScope(),xa().disposeVariables(),Da(ca,ea,"Failed while model layer "+sa+" apply"),ba("",-1,"",ca),ea}if(sa%L===0){ba("Layer "+sa.toString(),(sa+1)/ia);const ea=Sa.slice([0,0,0,0,0],[1,1,1,1,1]);yield ea.data(),ea.dispose()}else ba("Layer "+sa.toString(),(sa+1)/ia);sa++}return Sa})}function R(H,la,va,ia,ra,ca,ba){return $(this,null,function*(){const sa=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Sa=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,Oa=sa||Sa?4:6;let _=ll(la),L=1;for(;L<=va;){try{const F=H.layers[L],ea=F.getClassName(),pa=F.activation;let da;if(ea==="Conv3D"&&pa&&pa.getClassName()==="linear"){const fa=F.name.endsWith("_gn");da=Ge(_,F.getWeights()[0],F.getWeights()[1],F.strides,F.padding,F.dilationRate,3,fa)}else if(ea==="Activation")da=_.map(fa=>ma(()=>F.apply(fa)));else if(ea==="Conv3D"){da=Ge(_,F.getWeights()[0],F.getWeights()[1],F.strides,F.padding,F.dilationRate,3,!1);const fa=da.map(x=>ma(()=>F.activation.apply(x)));Ga(da),da=fa}else if(ea==="Conv3DTranspose"){const fa=[_[0].shape[1],_[0].shape[2],_[0].shape[3]],x=F.computeOutputShape([1,fa[0],fa[1],fa[2],_.length]),U=[x[1],x[2],x[3]];if(da=el(_,F.getWeights()[0],F.getWeights()[1],U,F.strides,F.padding),F.activation&&F.activation.getClassName()!=="linear"){const h=da.map(A=>ma(()=>F.activation.apply(A)));Ga(da),da=h}}else throw new Error(`Channel-list path: unsupported layer ${ea} (${F.name})`);Ga(_),_=da}catch(F){throw Ga(_),ba(F.message,-1,F.message),xa().endScope(),xa().disposeVariables(),Da(ca,F,"Failed while model layer "+L+" apply (channel-list)"),ba("",-1,"",ca),F}if(ba("Layer "+L.toString(),(L+1)/ia),L%Oa===0){const F=_[0].slice([0,0,0,0,0],[1,1,1,1,1]);yield F.data(),F.dispose()}L++}return _})}const y=performance.now(),O=a.enableSeqConv||q?C-2:C-1;let T;if(a.enableSeqConv){a.enableTTA&&console.warn("[channel-list] TTA is not supported on the channel-list path; running a single pass.");const H=yield R(w,W,O,C,a,e,s);o.dispose(),console.log("Applying channel-list final classifier + argmax...");const la=w.layers[C-1],va=typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope,ia=yield tl(H,la.getWeights()[0],la.getWeights()[1],la.strides,la.padding,la.dilationRate,s,va);Ga(H),T=ia.asType("int32"),ia.dispose(),console.log("Channel-list argmax output shape:",T.shape)}else{if(a.enableTTA){console.log("--- Running TTA Pass 1 (Original) ---");const la=yield G(w,W,O,C,a,e,s);if(!la)throw new Error("TTA Error: logits1 is null or undefined");console.log("--- Running TTA Pass 2 (Flipped) ---");const va=a.ttaFlipAxis||1,ia=o.clone().reverse(va).reshape(j),ra=yield G(w,ia,O,C,a,e,s);if(!ra)throw new Error("TTA Error: logits2 is null or undefined");console.log("--- Averaging TTA Results ---");const ca=ma(()=>{const ba=ra.shape;return ra.reshape([ba[0]*ba[1],ba[2],ba[3],ba[4]]).reverse(va).reshape(ba)});W=la.add(ca).div(2),la.dispose(),ra.dispose(),ca.dispose(),o.dispose()}else W=yield G(w,W,O,C,a,e,s),o.dispose();if(q){console.log("Applying SequentialConvLayer for final layer only (fast path for layers 1-18)...");const la=yield new sl(w,10,k,s).apply(W);T=la.asType("int32"),la.dispose(),W.dispose(),console.log("SequentialConvLayer (final only) output shape:",T.shape)}else console.log("Applying final ArgMax..."),T=ma(()=>{const la=$e(W,k?-1:1);return We(la)}),W.dispose(),console.log("ArgMax output shape:",T.shape)}const z=((performance.now()-y)/1e3).toFixed(4);console.log(`---- Inference Time: ${z} seconds ----`),a.outputPermutation?(console.log(`Permuting Output: ${a.outputPermutation}`),T=T.transpose(a.outputPermutation)):b&&(console.log("outLabelVolume transposed"),T=T.transpose());const N=performance.now();if(M&&(M[0]||M[1]||M[2])){const H=T.shape,la=[H[0]-M[0],H[1]-M[1],H[2]-M[2]],va=T.slice([0,0,0],la);T.dispose(),T=va,console.log(`Removed padding: [${H}] -> [${T.shape}]`)}console.log("outLabelVolume without padding shape: ",T.shape),T=yield Ht(T,P,S,a.outputShift),console.log("outLabelVolume final shape after restoration: ",T.shape);const V=((performance.now()-N)/1e3).toFixed(4);console.log(`---- Restoration Time: ${V} seconds ----`);const I=performance.now();let Z;try{Z=yield Ke(T,f,a,l)}catch(H){throw s(H.message,-1,H.message),Da(e,H,"Failed during segmentation post-processing"),s("",-1,"",e),T.dispose(),xa().disposeVariables(),H}const ua=((performance.now()-I)/1e3).toFixed(4);console.log(`---- Postprocessing Time: ${ua} seconds ----`),T.dispose(),xa().disposeVariables();const Q=((performance.now()-v)/1e3).toFixed(4);console.log(`---- Total Execution Time: ${Q} seconds ----`);const Ca=new Set(Z).size,Pa=a.numClasses||Ca;return Se(e,Pa,Ca),me(e,z,ua),s(a.modelName+"<br>Segmentation finished",0),s("",-1,"",e),d(Z,l,a),0})}function cl(l,a,t,r,u,e,d,s,f,v,g,S){return $(this,null,function*(){if(s.No_SubVolumes=1,d.preModelId){const b=yield He(f.rootURL+Ba[d.preModelId-1].path),p=Ba[d.preModelId-1].enableTranspose,o=Ba[d.preModelId-1].enableQuantileNorm;let P=null;o?(console.log("preModel Quantile normalization enabled"),P=yield ye(a)):(console.log("preModel Min Max normalization enabled"),P=yield pe(a)),p?(P=yield P.transpose(),console.log("Input transposed for pre-model")):console.log("Transpose not enabled for pre-model"),s.Brainchop_Ver="PreModel_FV";const M=yield b;try{const w=performance.now(),C=M,k=C.layers[0].batchInputShape;if(console.log(" Pre-Model batch input shape : ",k),k.length!==5){const I="The pre-model input shape must be 5D ";return g(I,-1,I),0}const j=Ja(C),W=f.batchSize,q=f.numOfChan;let i,G,R,y;if(j){if(console.log("Pre-Model Channel Last"),isNaN(k[4])||k[4]!==1){const I="The number of channels for pre-model input shape must be 1";return g(I,-1,I),0}i=k[1],G=k[2],R=k[3],y=[W,i,G,R,q]}else{if(console.log("Pre-Model Channel First"),isNaN(k[1])||k[1]!==1){const I="The number of channels for pre-model input shape must be 1";return g(I,-1,I),0}i=k[2],G=k[3],R=k[4],y=[W,q,i,G,R]}s.Input_Shape=JSON.stringify(y),s.Output_Shape=JSON.stringify(C.output.shape),s.Channel_Last=j,s.Model_Param=yield Xe(C),s.Model_Layers=yield je(C);let c=0;const O=Ba[d.preModelId-1].inferenceDelay;let T=1;const z=M.layers.length,N=[];N[0]=P.reshape(y),Ga(P);const V=window.setInterval(function(){return $(this,null,function*(){try{N[T]=yield M.layers[T].apply(N[T-1])}catch(I){const Z="Your graphics card (e.g. Intel) may not be compatible with WebGL. "+I.message;return g(Z,-1,Z),window.clearInterval(V),xa().endScope(),xa().disposeVariables(),Da(s,I,"PreModel Failed while model layer "+T+" apply"),g("",-1,"",s),0}if(M.layers[T].dispose(),N[T-1].dispose(),g("Layer "+T.toString(),(T+1)/z),re().unreliable){const I="unreliable reasons :"+re().reasons;g(I,NaN,I)}if(T===z-1){window.clearInterval(V);const I=j?-1:1;console.log(" find argmax "),console.log("last Tensor shape : ",N[T].shape);const Z=j?N[T].shape[4]:N[T].shape[1];let ua;try{console.log(" Try tf.argMax for fullVolume .."),ua=yield $e(N[T],I)}catch(ia){if(I===-1)try{const ra=performance.now();console.log(" tf.argMax failed .. try argMaxLarge .."),window.alert("tensor2LightBuffer() is not dead code?"),window.alert("argMaxLarge() is not dead code?"),console.log("argMaxLarge for fullVolume takes : ",((performance.now()-ra)/1e3).toFixed(4))}catch(ra){const ca="argMax buffer couldn't be created due to limited memory resources.";return g(ca,-1,ca),ua.dispose(),window.clearInterval(V),xa().endScope(),xa().disposeVariables(),s.Inference_t=1/0,s.Postprocess_t=1/0,s.Status="Fail",s.Error_Type=ra.message,s.Extra_Err_Info="preModel prediction_argmax from argMaxLarge failed",g("",-1,"",s),0}else{const ra="argMax buffer couldn't be created due to limited memory resources.";return g(ra,-1,ra),ua.dispose(),window.clearInterval(V),xa().endScope(),xa().disposeVariables(),s.Inference_t=1/0,s.Postprocess_t=1/0,s.Status="Fail",s.Error_Type=ia.message,s.Extra_Err_Info="preModel prediction_argmax from argMaxLarge not support yet channel first",g("",-1,"",s),0}}console.log(" Pre-model prediction_argmax shape : ",ua.shape);const Q=((performance.now()-w)/1e3).toFixed(4);Ga(N[T]),console.log(" Pre-model find array max ");const ha=yield ua.max().dataSync()[0];c<ha&&(c=ha);const Ca=c+1;console.log("Pre-model numSegClasses",Ca),Se(s,Z,Ca);let Pa=yield ua.reshape([t,r,u]);Ga(ua),p&&(console.log("Pre-model outLabelVolume transposed"),Pa=Pa.transpose());const H=performance.now();console.log("Generating pre-model output");let la;try{const ia=yield At(Pa);la=yield rl(ia,t,r,u,d,f,g,v,!1),yield Ga(Pa),console.log(" Phase-1 num of tensors after generateBrainMask: ",re().numTensors)}catch(ia){xa().endScope(),xa().disposeVariables();const ra="Failed while generating pre-model output due to limited browser memory available";return g(ra,-1,ra),s.Inference_t=Q,Da(s,ia,"Pre-model failed while generating output"),s.Inference_t=Q,g("",-1,"",s),0}const va=((performance.now()-H)/1e3).toFixed(4);if(console.log("Pre-model processing the whole brain volume in tfjs tooks for multi-class output mask : ",((performance.now()-w)/1e3).toFixed(4)+"  Seconds"),me(s,Q,va),g("",-1,"",s),la==null){const ia="slice_3d_mask failed ...";return g(ia,-1,ia),0}else if(console.log("--- pre-model done ---"),e){if(!d.enableSeqConv){const ia=[1,...a.shape],ra=he(l,ia);console.log(`Proactive Memory Check (Phase 1): Estimated Max Tensor Size: ${ra} elements`),Ze(ra)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),d.enableSeqConv=!0)}return yield ae(f,d,l,a,la,s,v,g,S),0}else window.alert("inferenceSubVolumes() is not dead code?")}T++})},O)}catch(w){g(w.message,-1,w.message),console.log('If webgl context is lost, try to restore webgl context by visit the link <a href="https://support.biodigital.com/hc/en-us/articles/218322977-How-to-turn-on-WebGL-in-my-browser">here</a>')}}else console.log("--- No pre-model is selected ---"),console.log("------ Run voxel cropping ------"),e?ae(f,d,l,a,null,s,v,g,S):window.alert("inferenceSubVolumes() is not dead code?")})}function dl(l=!0){return $(this,null,function*(){yield Lt(),Wa().set("DEBUG",!1),Wa().set("WEBGL_FORCE_F16_TEXTURES",l),Wa().set("WEBGL_DELETE_TEXTURE_THRESHOLD",-1),yield Bt(),console.log("tf env() flags :",Wa().flags),console.log("tf env() features :",Wa().features),console.log("tf env total features: ",Object.keys(Wa().features).length),console.log(De())})}function vl(l,a,t,r,u,e){return $(this,null,function*(){const d=a.enableSeqConv?Qa.WEBGL_SEQUENTIAL:Qa.WEBGL_MAIN,s=Je(a,d);e("Segmentation started",0),performance.now();const f=l.batchSize,v=l.numOfChan;if(isNaN(f)||f!==1){const R="The batch Size for input shape must be 1";return e(R,-1,R),0}if(isNaN(v)||v!==1){const R="The number of channels for input shape must be 1";return e(R,-1,R),0}xa().startScope(),console.log("Batch size: ",f),console.log("Num of Channels: ",v);const g=yield He(l.rootURL+a.path),S=!a.forceFP32;yield dl(S),s.TF_Backend=De();const b=g;yield fl(s,b,b.layers[0].batchInputShape,yield Ja(b),Xe,je);let p=[];if(p=b.layers[0].batchInputShape,console.log(" Model batch input shape : ",p),p.length!==5){const R="The model input shape must be 5D";return e(R,-1,R),0}let o,P,M;const w=t.dims[1],C=t.dims[2],k=t.dims[3];if(yield Ja(b)){if(console.log("Model Channel Last"),isNaN(p[4])||p[4]!==1){const R="The number of channels for input shape must be 1";return e(R,-1,R),0}o=p[1],P=p[2],M=p[3]}else{if(console.log("Model Channel First"),isNaN(p[1])||p[1]!==1){const R="The number of channels for input shape must be 1";return e(R,-1,R),0}o=p[2],P=p[3],M=p[4]}let W;o===256&&P===256&&M===256?W=!0:W=!1,s.isModelFullVol=W;let q=yield nl(k,t,r);const i=a.enableTranspose,G=a.enableCrop;if(W)if(G)yield cl(g,q,k,C,w,W,a,s,l,u,e,r);else{console.log("Cropping Disabled"),i?(q=q.transpose(),console.log("Input transposed")):console.log("Transpose NOT Enabled");let R=a.enableSeqConv;if(!R){const y=[1,...q.shape],c=he(g,y);console.log(`Proactive Memory Check: Estimated Max Tensor Size: ${c} elements`),Ze(c)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),R=!0,a.enableSeqConv=!0)}R?(console.log("Seq Convoluton Enabled"),ae(l,a,g,q,null,s,u,e,r)):(console.log("Seq Convoluton Disabled"),ae(l,a,g,q,null,s,u,e,r))}})}const gl=(()=>{const l=(i,G)=>i.subarray(...G.data_offsets),a=i=>{const G=Number(new DataView(i.buffer).getBigUint64(0,!0)),R=JSON.parse(new TextDecoder("utf8").decode(i.subarray(8,8+G)));return Object.fromEntries(Object.entries(R).filter(([y,c])=>y!=="__metadata__").map(([y,c])=>[y,Ma(_a({},c),{data_offsets:c.data_offsets.map(O=>8+G+O)})]))},t=(i,G)=>i.createBuffer({size:G,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),r=i=>{const R=i.createBuffer({mappedAtCreation:!0,size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});return new Float32Array(R.getMappedRange())[0]=1/0,R.unmap(),R},u=(i,G,R)=>{const y=Math.ceil(G/4)*4,c=i.createBuffer({size:y,usage:GPUBufferUsage.STORAGE,mappedAtCreation:!0});return new Uint8Array(c.getMappedRange()).set(R),c.unmap(),c},e=(i,G,R,y,c,O,T)=>{const z=i.createBindGroup({layout:y,entries:[{binding:0,resource:{buffer:c}},...O.map((V,I)=>({binding:I+1,resource:{buffer:V}}))]}),N=G.beginComputePass();N.setPipeline(R),N.setBindGroup(0,z),N.dispatchWorkgroups(...T),N.end()},d=`enable f16;
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
}`,s=`enable f16;
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
}`,f=`fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
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
}`,g=`enable f16;
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
}`,S=`enable f16;
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
}`,b=`enable f16;
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
}`,p=`enable f16;
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
}`,o=`enable f16;
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
}`,P=`enable f16;
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
}`,M=`enable f16;
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
}`,w=`enable f16;
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
}`,C=`enable f16;
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
}`,k=`enable f16;
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
}`,j=`enable f16;
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
}`,W=(i,G)=>$(null,null,function*(){const R=a(G),y=r(i),c=[i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]})],O=t(i,33554432),T=u(i,864,l(G,R["m.model.0.weight"])),z=u(i,13824,l(G,R["m.model.3.weight"])),N=u(i,13824,l(G,R["m.model.6.weight"])),V=u(i,13824,l(G,R["m.model.9.weight"])),I=u(i,13824,l(G,R["m.model.12.weight"])),Z=u(i,13824,l(G,R["m.model.15.weight"])),ua=u(i,13824,l(G,R["m.model.18.weight"])),Q=u(i,13824,l(G,R["m.model.21.weight"])),ha=u(i,13824,l(G,R["m.model.24.weight"])),Ca=u(i,13824,l(G,R["m.model.27.weight"])),Pa=u(i,13824,l(G,R["m.model.30.weight"])),H=u(i,13824,l(G,R["m.model.33.weight"])),la=u(i,13824,l(G,R["m.model.36.weight"])),va=u(i,13824,l(G,R["m.model.39.weight"])),ia=u(i,13824,l(G,R["m.model.42.weight"])),ra=u(i,13824,l(G,R["m.model.45.weight"])),ca=u(i,13824,l(G,R["m.model.48.weight"])),ba=u(i,13824,l(G,R["m.model.51.weight"])),sa=u(i,13824,l(G,R["m.model.54.weight"])),Sa=u(i,13824,l(G,R["m.model.57.weight"])),Oa=u(i,13824,l(G,R["m.model.60.weight"])),_=u(i,13824,l(G,R["m.model.63.weight"])),L=u(i,13824,l(G,R["m.model.66.weight"])),F=u(i,13824,l(G,R["m.model.69.weight"])),ea=u(i,13824,l(G,R["m.model.72.weight"])),pa=u(i,64,l(G,R["m.seq_conv_argmax.weight"])),da=u(i,4,l(G,R["m.seq_conv_argmax.bias"])),fa=t(i,67108864),x=t(i,536870912),U=t(i,4194304),h=t(i,536870912),A=t(i,536870912),Ea=i.createBuffer({size:O.size,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.MAP_WRITE}),Ta=i.createBuffer({size:fa.size,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),Ra=[d,s,f,v,g,f,S,b,s,f,v,g,f,S,p,s,f,v,g,f,S,o,s,f,v,g,f,S,P,s,f,v,g,f,S,M,s,f,v,g,f,S,b,s,f,v,g,f,S,p,s,f,v,g,f,S,o,s,f,v,g,f,S,P,s,f,v,g,f,S,M,s,f,v,g,f,S,b,s,f,v,g,f,S,p,s,f,v,g,f,S,o,s,f,v,g,f,S,P,s,f,v,g,f,S,M,s,f,v,g,f,S,b,s,f,v,g,f,S,p,s,f,v,g,f,S,o,s,f,v,g,f,S,P,s,f,v,g,f,S,M,s,f,v,g,f,S,b,s,f,v,g,f,S,p,s,f,v,g,f,S,o,s,f,v,g,f,S,P,s,f,v,g,f,S,w,C,k,j],m=yield Promise.all(Ra.map((Fa,n)=>$(null,null,function*(){return yield i.createComputePipelineAsync({layout:i.createPipelineLayout({bindGroupLayouts:[c[n]]}),compute:{module:i.createShaderModule({code:Fa}),entryPoint:"main"}})})));return Fa=>$(null,null,function*(){let n=i.createCommandEncoder();yield Ea.mapAsync(GPUMapMode.WRITE),new Float16Array(Ea.getMappedRange()).set(Fa),Ea.unmap(),n.copyBufferToBuffer(Ea,0,O,0,Ea.size),e(i,n,m[0],c[0],y,[x,O,T],[128,256,4]),e(i,n,m[1],c[1],y,[U,x],[8192,1,1]),e(i,n,m[2],c[2],y,[h,U],[32,1,1]),e(i,n,m[3],c[3],y,[U,h],[16,1,1]),e(i,n,m[4],c[4],y,[h,x,U],[1024,2,1]),e(i,n,m[5],c[5],y,[A,h],[32,1,1]),e(i,n,m[6],c[6],y,[h,A],[16,1,1]),e(i,n,m[7],c[7],y,[A,x,U,h,z],[128,256,4]),e(i,n,m[8],c[8],y,[x,A],[8192,1,1]),e(i,n,m[9],c[9],y,[U,x],[32,1,1]),e(i,n,m[10],c[10],y,[x,U],[16,1,1]),e(i,n,m[11],c[11],y,[U,A,x],[1024,2,1]),e(i,n,m[12],c[12],y,[h,U],[32,1,1]),e(i,n,m[13],c[13],y,[U,h],[16,1,1]),e(i,n,m[14],c[14],y,[h,A,x,U,N],[128,256,4]),e(i,n,m[15],c[15],y,[x,h],[8192,1,1]),e(i,n,m[16],c[16],y,[U,x],[32,1,1]),e(i,n,m[17],c[17],y,[x,U],[16,1,1]),e(i,n,m[18],c[18],y,[U,h,x],[1024,2,1]),e(i,n,m[19],c[19],y,[A,U],[32,1,1]),e(i,n,m[20],c[20],y,[U,A],[16,1,1]),e(i,n,m[21],c[21],y,[A,h,x,U,V],[128,256,4]),e(i,n,m[22],c[22],y,[x,A],[8192,1,1]),e(i,n,m[23],c[23],y,[U,x],[32,1,1]),e(i,n,m[24],c[24],y,[x,U],[16,1,1]),e(i,n,m[25],c[25],y,[U,A,x],[1024,2,1]),e(i,n,m[26],c[26],y,[h,U],[32,1,1]),e(i,n,m[27],c[27],y,[U,h],[16,1,1]),e(i,n,m[28],c[28],y,[h,A,x,U,I],[128,256,4]),e(i,n,m[29],c[29],y,[x,h],[8192,1,1]),e(i,n,m[30],c[30],y,[U,x],[32,1,1]),e(i,n,m[31],c[31],y,[x,U],[16,1,1]),e(i,n,m[32],c[32],y,[U,h,x],[1024,2,1]),e(i,n,m[33],c[33],y,[A,U],[32,1,1]),e(i,n,m[34],c[34],y,[U,A],[16,1,1]),e(i,n,m[35],c[35],y,[A,h,x,U,Z],[128,256,4]),e(i,n,m[36],c[36],y,[x,A],[8192,1,1]),e(i,n,m[37],c[37],y,[U,x],[32,1,1]),e(i,n,m[38],c[38],y,[x,U],[16,1,1]),e(i,n,m[39],c[39],y,[U,A,x],[1024,2,1]),e(i,n,m[40],c[40],y,[h,U],[32,1,1]),e(i,n,m[41],c[41],y,[U,h],[16,1,1]),e(i,n,m[42],c[42],y,[h,A,x,U,ua],[128,256,4]),e(i,n,m[43],c[43],y,[x,h],[8192,1,1]),e(i,n,m[44],c[44],y,[U,x],[32,1,1]),e(i,n,m[45],c[45],y,[x,U],[16,1,1]),e(i,n,m[46],c[46],y,[U,h,x],[1024,2,1]),e(i,n,m[47],c[47],y,[A,U],[32,1,1]),e(i,n,m[48],c[48],y,[U,A],[16,1,1]),e(i,n,m[49],c[49],y,[A,h,x,U,Q],[128,256,4]),e(i,n,m[50],c[50],y,[x,A],[8192,1,1]),e(i,n,m[51],c[51],y,[U,x],[32,1,1]),e(i,n,m[52],c[52],y,[x,U],[16,1,1]),e(i,n,m[53],c[53],y,[U,A,x],[1024,2,1]),e(i,n,m[54],c[54],y,[h,U],[32,1,1]),e(i,n,m[55],c[55],y,[U,h],[16,1,1]),e(i,n,m[56],c[56],y,[h,A,x,U,ha],[128,256,4]),e(i,n,m[57],c[57],y,[x,h],[8192,1,1]),e(i,n,m[58],c[58],y,[U,x],[32,1,1]),e(i,n,m[59],c[59],y,[x,U],[16,1,1]),e(i,n,m[60],c[60],y,[U,h,x],[1024,2,1]),e(i,n,m[61],c[61],y,[A,U],[32,1,1]),e(i,n,m[62],c[62],y,[U,A],[16,1,1]),e(i,n,m[63],c[63],y,[A,h,x,U,Ca],[128,256,4]),e(i,n,m[64],c[64],y,[x,A],[8192,1,1]),e(i,n,m[65],c[65],y,[U,x],[32,1,1]),e(i,n,m[66],c[66],y,[x,U],[16,1,1]),e(i,n,m[67],c[67],y,[U,A,x],[1024,2,1]),e(i,n,m[68],c[68],y,[h,U],[32,1,1]),e(i,n,m[69],c[69],y,[U,h],[16,1,1]),e(i,n,m[70],c[70],y,[h,A,x,U,Pa],[128,256,4]),e(i,n,m[71],c[71],y,[x,h],[8192,1,1]),e(i,n,m[72],c[72],y,[U,x],[32,1,1]),e(i,n,m[73],c[73],y,[x,U],[16,1,1]),e(i,n,m[74],c[74],y,[U,h,x],[1024,2,1]),e(i,n,m[75],c[75],y,[A,U],[32,1,1]),e(i,n,m[76],c[76],y,[U,A],[16,1,1]),e(i,n,m[77],c[77],y,[A,h,x,U,H],[128,256,4]),e(i,n,m[78],c[78],y,[x,A],[8192,1,1]),e(i,n,m[79],c[79],y,[U,x],[32,1,1]),e(i,n,m[80],c[80],y,[x,U],[16,1,1]),e(i,n,m[81],c[81],y,[U,A,x],[1024,2,1]),e(i,n,m[82],c[82],y,[h,U],[32,1,1]),e(i,n,m[83],c[83],y,[U,h],[16,1,1]),e(i,n,m[84],c[84],y,[h,A,x,U,la],[128,256,4]),e(i,n,m[85],c[85],y,[x,h],[8192,1,1]),e(i,n,m[86],c[86],y,[U,x],[32,1,1]),e(i,n,m[87],c[87],y,[x,U],[16,1,1]),e(i,n,m[88],c[88],y,[U,h,x],[1024,2,1]),e(i,n,m[89],c[89],y,[A,U],[32,1,1]),e(i,n,m[90],c[90],y,[U,A],[16,1,1]),e(i,n,m[91],c[91],y,[A,h,x,U,va],[128,256,4]),e(i,n,m[92],c[92],y,[x,A],[8192,1,1]),e(i,n,m[93],c[93],y,[U,x],[32,1,1]),e(i,n,m[94],c[94],y,[x,U],[16,1,1]),e(i,n,m[95],c[95],y,[U,A,x],[1024,2,1]),e(i,n,m[96],c[96],y,[h,U],[32,1,1]),e(i,n,m[97],c[97],y,[U,h],[16,1,1]),e(i,n,m[98],c[98],y,[h,A,x,U,ia],[128,256,4]),e(i,n,m[99],c[99],y,[x,h],[8192,1,1]),e(i,n,m[100],c[100],y,[U,x],[32,1,1]),e(i,n,m[101],c[101],y,[x,U],[16,1,1]),e(i,n,m[102],c[102],y,[U,h,x],[1024,2,1]),e(i,n,m[103],c[103],y,[A,U],[32,1,1]),e(i,n,m[104],c[104],y,[U,A],[16,1,1]),e(i,n,m[105],c[105],y,[A,h,x,U,ra],[128,256,4]),e(i,n,m[106],c[106],y,[x,A],[8192,1,1]),e(i,n,m[107],c[107],y,[U,x],[32,1,1]),e(i,n,m[108],c[108],y,[x,U],[16,1,1]),e(i,n,m[109],c[109],y,[U,A,x],[1024,2,1]),e(i,n,m[110],c[110],y,[h,U],[32,1,1]),e(i,n,m[111],c[111],y,[U,h],[16,1,1]),e(i,n,m[112],c[112],y,[h,A,x,U,ca],[128,256,4]),e(i,n,m[113],c[113],y,[x,h],[8192,1,1]),e(i,n,m[114],c[114],y,[U,x],[32,1,1]),e(i,n,m[115],c[115],y,[x,U],[16,1,1]),e(i,n,m[116],c[116],y,[U,h,x],[1024,2,1]),e(i,n,m[117],c[117],y,[A,U],[32,1,1]),e(i,n,m[118],c[118],y,[U,A],[16,1,1]),e(i,n,m[119],c[119],y,[A,h,x,U,ba],[128,256,4]),e(i,n,m[120],c[120],y,[x,A],[8192,1,1]),e(i,n,m[121],c[121],y,[U,x],[32,1,1]),e(i,n,m[122],c[122],y,[x,U],[16,1,1]),e(i,n,m[123],c[123],y,[U,A,x],[1024,2,1]),e(i,n,m[124],c[124],y,[h,U],[32,1,1]),e(i,n,m[125],c[125],y,[U,h],[16,1,1]),e(i,n,m[126],c[126],y,[h,A,x,U,sa],[128,256,4]),e(i,n,m[127],c[127],y,[x,h],[8192,1,1]),e(i,n,m[128],c[128],y,[U,x],[32,1,1]),e(i,n,m[129],c[129],y,[x,U],[16,1,1]),e(i,n,m[130],c[130],y,[U,h,x],[1024,2,1]),e(i,n,m[131],c[131],y,[A,U],[32,1,1]),e(i,n,m[132],c[132],y,[U,A],[16,1,1]),e(i,n,m[133],c[133],y,[A,h,x,U,Sa],[128,256,4]),e(i,n,m[134],c[134],y,[x,A],[8192,1,1]),e(i,n,m[135],c[135],y,[U,x],[32,1,1]),e(i,n,m[136],c[136],y,[x,U],[16,1,1]),e(i,n,m[137],c[137],y,[U,A,x],[1024,2,1]),e(i,n,m[138],c[138],y,[h,U],[32,1,1]),e(i,n,m[139],c[139],y,[U,h],[16,1,1]),e(i,n,m[140],c[140],y,[h,A,x,U,Oa],[128,256,4]),e(i,n,m[141],c[141],y,[x,h],[8192,1,1]),e(i,n,m[142],c[142],y,[U,x],[32,1,1]),e(i,n,m[143],c[143],y,[x,U],[16,1,1]),e(i,n,m[144],c[144],y,[U,h,x],[1024,2,1]),e(i,n,m[145],c[145],y,[A,U],[32,1,1]),e(i,n,m[146],c[146],y,[U,A],[16,1,1]),e(i,n,m[147],c[147],y,[A,h,x,U,_],[128,256,4]),e(i,n,m[148],c[148],y,[x,A],[8192,1,1]),e(i,n,m[149],c[149],y,[U,x],[32,1,1]),e(i,n,m[150],c[150],y,[x,U],[16,1,1]),e(i,n,m[151],c[151],y,[U,A,x],[1024,2,1]),e(i,n,m[152],c[152],y,[h,U],[32,1,1]),e(i,n,m[153],c[153],y,[U,h],[16,1,1]),e(i,n,m[154],c[154],y,[h,A,x,U,L],[128,256,4]),e(i,n,m[155],c[155],y,[x,h],[8192,1,1]),e(i,n,m[156],c[156],y,[U,x],[32,1,1]),e(i,n,m[157],c[157],y,[x,U],[16,1,1]),e(i,n,m[158],c[158],y,[U,h,x],[1024,2,1]),e(i,n,m[159],c[159],y,[A,U],[32,1,1]),e(i,n,m[160],c[160],y,[U,A],[16,1,1]),e(i,n,m[161],c[161],y,[A,h,x,U,F],[128,256,4]),e(i,n,m[162],c[162],y,[x,A],[8192,1,1]),e(i,n,m[163],c[163],y,[U,x],[32,1,1]),e(i,n,m[164],c[164],y,[x,U],[16,1,1]),e(i,n,m[165],c[165],y,[U,A,x],[1024,2,1]),e(i,n,m[166],c[166],y,[h,U],[32,1,1]),e(i,n,m[167],c[167],y,[U,h],[16,1,1]),e(i,n,m[168],c[168],y,[h,A,x,U,ea],[128,256,4]),e(i,n,m[169],c[169],y,[x,h],[8192,1,1]),e(i,n,m[170],c[170],y,[U,x],[32,1,1]),e(i,n,m[171],c[171],y,[x,U],[16,1,1]),e(i,n,m[172],c[172],y,[U,h,x],[1024,2,1]),e(i,n,m[173],c[173],y,[A,U],[32,1,1]),e(i,n,m[174],c[174],y,[U,A],[16,1,1]),e(i,n,m[175],c[175],y,[A,h,x,U],[32768,16,1]),e(i,n,m[176],c[176],y,[x,A,pa,da],[32768,8,1]),e(i,n,m[177],c[177],y,[h,x],[32768,4,1]),e(i,n,m[178],c[178],y,[fa,x,h],[32768,4,1]),n.copyBufferToBuffer(fa,0,Ta,0,fa.size),i.queue.submit([n.finish()]),yield Ta.mapAsync(GPUMapMode.READ);const E=new Float32Array(Ta.size/4);return E.set(new Float32Array(Ta.getMappedRange())),Ta.unmap(),[E]})});return{load:(i,G)=>$(null,null,function*(){return yield fetch(G).then(R=>R.arrayBuffer()).then(R=>W(i,new Uint8Array(R)))}),setupNet:W}})(),bl=Object.freeze(Object.defineProperty({__proto__:null,default:gl},Symbol.toStringTag,{value:"Module"})),za=Object.assign({"./webgpu_runners/rodent_runner.js":bl});function pl(){return Object.keys(za).map(l=>{const a=l.match(/\/([^\/]+)_runner\.js$/);return a?a[1]:null}).filter(Boolean)}function yl(l){const a=`./webgpu_runners/${l}_runner.js`;if(za[a])return za[a];const t=l.toLowerCase();for(const[r,u]of Object.entries(za))if(r.toLowerCase().includes(`/${t}_runner.js`))return u;for(const[r,u]of Object.entries(za))if(r.includes(l))return u;return null}function hl(l){const a=`./webgpu_runners/${l}_runner.js`;if(za[a])return!0;const t=`/${l.toLowerCase()}_runner.js`;return Object.keys(za).some(r=>r.toLowerCase().endsWith(t))}function Sl(l,a){if(typeof Float16Array=="undefined")throw new Error("Float16Array unavailable: cannot cast fp32 master weights to fp16.");const t=new DataView(l.buffer,l.byteOffset,l.byteLength),r=Number(t.getBigUint64(0,!0)),u=JSON.parse(new TextDecoder("utf8").decode(l.subarray(8,8+r))),e=8+r;if(!Object.entries(u).some(([o,P])=>o!=="__metadata__"&&P.dtype==="F32"))return l;const s={},f=[];let v=0;for(const[o,P]of Object.entries(u)){if(o==="__metadata__"){s[o]=P;continue}const[M,w]=P.data_offsets,C=l.subarray(e+M,e+w);let k,j;if(P.dtype==="F32"){const W=new Float32Array(C.slice().buffer),q=new Float16Array(W);k=new Uint8Array(q.buffer),j="F16"}else k=C,j=P.dtype;s[o]={dtype:j,shape:P.shape,data_offsets:[v,v+k.byteLength]},f.push(k),v+=k.byteLength}const g=new TextEncoder().encode(JSON.stringify(s)),S=(8-g.byteLength%8)%8,b=new Uint8Array(8+g.byteLength+S+v);new DataView(b.buffer).setBigUint64(0,BigInt(g.byteLength+S),!0),b.set(g,8),b.fill(32,8+g.byteLength,8+g.byteLength+S);let p=8+g.byteLength+S;for(const o of f)b.set(o,p),p+=o.byteLength;return a&&a("Cast fp32 master weights -> fp16 for WebGPU.",.05),b}function ml(l,a){try{const t=d=>!!(l.features&&l.features.has&&l.features.has(d)),r=l.limits||{},u=typeof navigator!="undefined"&&navigator.userAgent||"unknown",e=/Safari/.test(u)&&!/Chrome|Chromium|Android/.test(u);console.log("[SAFARI-DEBUG] ===== WebGPU device capabilities ====="),console.log("[SAFARI-DEBUG] model:",(a==null?void 0:a.modelName)||(a==null?void 0:a.webgpu_runner)||"(unknown)"),console.log("[SAFARI-DEBUG] userAgent:",u,"| classified Safari:",e),console.log("[SAFARI-DEBUG] shader-f16:",t("shader-f16")),console.log("[SAFARI-DEBUG] features:",l.features?Array.from(l.features):"(none)"),console.log("[SAFARI-DEBUG] limits:",{maxBufferSize:r.maxBufferSize,maxStorageBufferBindingSize:r.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:r.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.maxComputeWorkgroupSizeZ,maxComputeWorkgroupsPerDimension:r.maxComputeWorkgroupsPerDimension}),console.log("[SAFARI-DEBUG] BC_WEBGPU_DEBUG (logits readback):",typeof window!="undefined"&&!!window.BC_WEBGPU_DEBUG),console.log("[SAFARI-DEBUG] =======================================")}catch(t){console.warn("[SAFARI-DEBUG] capability dump failed:",t==null?void 0:t.message)}}function Pl(l,a,t){return $(this,null,function*(){var g,S;ml(l,a);let r=a.webgpu_runner,u=a.webgpu_safetensor;const e=!!(l.features&&l.features.has&&l.features.has("shader-f16"));let d=!1;a.forceFP32?(d=!0,console.log("[WebGPU] forceFP32: using fp32 runner and weights.")):e||(hl(`${r}_f32`)?(d=!0,console.log("[WebGPU] shader-f16 not supported on this device -> auto-selecting fp32 runner and weights."),t("fp16 not supported - using fp32 WebGPU runner.",.05)):console.warn(`[WebGPU] shader-f16 not supported and no fp32 runner ('${r}_f32') available; the fp16 runner will likely fail and fall back to WebGL2.`)),d&&(r=`${r}_f32`,u=u.replace(".safetensors","_f32.safetensors")),a.enableTTA&&a.webgpuTTArunner&&(console.log("[WebGPU] TTA Enabled: Switching to TTA runner and weights."),r=`${r}_tta`,u=u.replace(".safetensors","_tta.safetensors"));const s=yl(r);if(!s){const b=pl();throw new Error(`Runner '${r}' not found. Available runners: ${b.join(", ")||"none"}. Looking in: ./webgpu_runners/`)}if(!s.setupNet&&!((g=s.default)!=null&&g.setupNet))throw new Error(`Runner module '${r}' doesn't export 'setupNet'. Exported keys: ${Object.keys(s).join(", ")}`);let f;try{const b=yield fetch(u);if(!b.ok)throw new Error(`HTTP ${b.status}: ${b.statusText}`);f=yield b.arrayBuffer()}catch(b){throw new Error(`Failed to load weights from '${u}': ${b.message}`)}const v=s.setupNet||((S=s.default)==null?void 0:S.setupNet);try{let b=new Uint8Array(f);return d||(b=Sl(b,t)),yield v(l,b,t)}catch(b){throw new Error(`Failed to setup network for '${r}': ${b.message}`)}})}function Ul(l,a,t,r,u,e,d){return $(this,null,function*(){var p,o,P;d("Starting WebGPU inference...",0);const s=performance.now(),f=Je(t,Qa.WEBGPU);f.isModelFullVol=!0;let v,g=[],S=null,b=!1;try{if(!l)throw new Error("WebGPU device is required but not provided");if(!(t!=null&&t.webgpu_runner))throw new Error("Model entry must specify webgpu_runner property");if(!(t!=null&&t.webgpu_safetensor))throw new Error("Model entry must specify webgpu_safetensor property");const M=t.webgpuStorageSize||335544320;if(l.limits){const N=Z=>(Z/1048576).toFixed(0),V=(p=l.limits.maxStorageBufferBindingSize)!=null?p:1/0,I=(o=l.limits.maxBufferSize)!=null?o:1/0;if(V<M||I<M){const Z=N(Math.min(V,I)),ua=N(M),Q=`[WebGPU] Device buffer limit (${Z} MB) is below the ${ua} MB this model needs - using WebGL2 fallback.`;throw console.warn(Q),d(Q,.1),new Error(Q)}}d("Preparing input data...",.1);let w=Ka(u,[256,256,256],"float32");const C=t.enableQuantileNorm?yield ye(w):yield pe(w);if(w.dispose(),w=C,t.inputPermutation){console.log(`[WebGPU] Permuting Input: ${t.inputPermutation}`);const N=w.transpose(t.inputPermutation);w.dispose(),w=N}else if(t.enableTranspose){const N=w.transpose();w.dispose(),w=N}const k=yield w.data(),j=w.shape;w.dispose(),d("Input data prepared (full volume).",.3),d("Loading model runner...",.4),l&&(S=l.createBuffer.bind(l),l.createBuffer=N=>{const V=S(N);return g.push(V),V}),l.pushErrorScope("out-of-memory"),b=!0;const W=yield Pl(l,t,d);if(typeof W!="function")throw new Error(`setupNet for '${t.webgpu_runner}' didn't return a function. Returned type: ${typeof W}`);d("Running inference...",.5);const q=yield W(k);b=!1;const i=yield l.popErrorScope();if(i)throw new Error(`WebGPU out of memory (${i.message||"allocation failed"}) - falling back to WebGL2.`);if(!q||!Array.isArray(q))throw new Error(`Inference didn't return expected array format. Returned: ${typeof q}`);const G=((performance.now()-s)/1e3).toFixed(4);d(`WebGPU inference took ${G}s.`,.9),console.log("Inference result shape:",(P=q[0])==null?void 0:P.length),v=ma(()=>{let N=Ka(q[0],j,"int32");t.outputPermutation?(console.log(`[WebGPU] Permuting Output: ${t.outputPermutation}`),N=N.transpose(t.outputPermutation)):t.enableTranspose&&(N=N.transpose());const V=Rt(N).dataSync()[0];if(console.log("Segmentation volume sum:",V),V===0)throw new Error("Segmentation resulted in all zeros (empty volume).");return N});const R=performance.now(),y=yield Ke(v,u,t,a),c=((performance.now()-R)/1e3).toFixed(4);e(y,a,t);const T=new Set(y).size,z=t.numClasses||T;Se(f,z,T),me(f,G,c),d(t.modelName+"<br>Segmentation finished.",1,"",f)}catch(M){if(console.error("WebGPU Inference Error:",M),b&&l){b=!1;try{yield l.popErrorScope()}catch(C){}}let w=M.message;throw M.message.includes("not found")?w+=". Check that the runner file exists and the name matches.":M.message.includes("fetch")?w+=". Check network connection and file paths.":M.message.includes("binding size")&&(w+=". GPU memory limit exceeded."),Da(f,w,"WebGPU inference failed"),d("",-1,`WebGPU Error: ${w}`,f),M}finally{if(v&&v.dispose(),S&&l&&(l.createBuffer=S),g&&g.length>0){for(const M of g)M.destroy();g=[]}}})}function Pe(){return $(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?"Opera":navigator.userAgent.indexOf("Edg/")>-1?"Edge":navigator.userAgent.indexOf("Falkon/")>-1?"Falkon":navigator.userAgent.indexOf("Chrome/")>-1?"Chrome":navigator.userAgent.indexOf("Firefox/")>-1?"Firefox":navigator.userAgent.indexOf("Safari/")>-1?"Safari":navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?"IExplorer":"Unknown"})}function _l(){return $(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?parseInt(navigator.userAgent.split("OPR/")[1]):navigator.userAgent.indexOf("Edg/")>-1?parseInt(navigator.userAgent.split("Edg/")[1]):navigator.userAgent.indexOf("Falkon/")>-1?parseInt(navigator.userAgent.split("Falkon/")[1]):navigator.userAgent.indexOf("Chrome/")>-1?parseInt(navigator.userAgent.split("Chrome/")[1]):navigator.userAgent.indexOf("Firefox/")>-1?parseInt(navigator.userAgent.split("Firefox/")[1]):navigator.userAgent.indexOf("Safari/")>-1?parseInt(navigator.userAgent.split("Safari/")[1]):navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?parseInt(navigator.userAgent.split("MSIE/")[1]):1/0})}function xl(){return $(this,null,function*(){return navigator.userAgent.indexOf("Win")>-1?"Windows":navigator.userAgent.indexOf("Mac")>-1?"MacOS":navigator.userAgent.indexOf("Linux")>-1?"Linux":navigator.userAgent.indexOf("UNIX")>-1?"UNIX":"Unknown"})}function Cl(l){return $(this,null,function*(){return l?(console.log("WebGl2 is enabled"),!0):(console.log(typeof WebGL2RenderingContext!="undefined"?"WebGL2 may be disabled. Please try updating video card drivers":"WebGL2 is not supported"),!1)})}function wl(l){return $(this,null,function*(){let a;if(l&&(a=l.getExtension("WEBGL_debug_renderer_info"),a)){const t=l.getParameter(a.UNMASKED_VENDOR_WEBGL);return t.indexOf("(")>-1&&t.indexOf(")")>-1?t.substring(t.indexOf("(")+1,t.indexOf(")")):t}return null})}function Ml(l){return $(this,null,function*(){if(l){const a=l.getExtension("WEBGL_debug_renderer_info");return a?l.getParameter(a.UNMASKED_VENDOR_WEBGL):null}else return null})}function El(l){return $(this,null,function*(){if(l){if(Pe()==="Firefox")return l.getParameter(l.RENDERER);const a=l.getExtension("WEBGL_debug_renderer_info");return a?l.getParameter(a.UNMASKED_RENDERER_WEBGL):null}else return null})}function Tl(l){return $(this,null,function*(){let a;if(l){if(Pe()==="Firefox")return l.getParameter(l.RENDERER);if(a=l.getExtension("WEBGL_debug_renderer_info"),a){let t=l.getParameter(a.UNMASKED_RENDERER_WEBGL);return t.indexOf("(")>-1&&t.indexOf(")")>-1&&t.indexOf("(R)")===-1&&(t=t.substring(t.indexOf("(")+1,t.indexOf(")")),t.split(",").length===3)?t.split(",")[1].trim():t}}return null})}function Gl(){return $(this,null,function*(){return navigator.hardwareConcurrency})}function Ol(){return $(this,null,function*(){return/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)})}function Ll(l,a=null){return $(this,null,function*(){const t=new Date;if(l.isModelFullVol?l.Brainchop_Ver="FullVolume":l.Brainchop_Ver="SubVolumes",l.Total_t=(Date.now()-l.startTime)/1e3,delete l.startTime,l.Date=parseInt(t.getMonth()+1)+"/"+t.getDate()+"/"+t.getFullYear(),l.Browser=yield Pe(),l.Browser_Ver=yield _l(),l.OS=yield xl(),l.WebGL2=yield Cl(a),l.GPU_Vendor=yield wl(a),l.GPU_Card=yield Tl(a),l.GPU_Vendor_Full=yield Ml(a),l.GPU_Card_Full=yield El(a),l.CPU_Cores=yield Gl(),l.Which_Brainchop="latest",(yield Ol())&&(l.Heap_Size_MB=window.performance.memory.totalJSHeapSize/(1024*1024).toFixed(2),l.Used_Heap_MB=window.performance.memory.usedJSHeapSize/(1024*1024).toFixed(2),l.Heap_Limit_MB=window.performance.memory.jsHeapSizeLimit/(1024*1024).toFixed(2)),a){console.log("MAX_TEXTURE_SIZE :",a.getParameter(a.MAX_TEXTURE_SIZE)),console.log("MAX_RENDERBUFFER_SIZE :",a.getParameter(a.MAX_RENDERBUFFER_SIZE));const r=a.getExtension("WEBGL_debug_renderer_info");console.log("VENDOR WEBGL:",a.getParameter(r.UNMASKED_VENDOR_WEBGL)),l.Texture_Size=a.getParameter(a.MAX_TEXTURE_SIZE)}else l.Texture_Size=null;return l})}function Bl(l){return new Worker(""+new URL("brainchop-webworker-B_zqIdIx.js",import.meta.url).href,{name:l==null?void 0:l.name})}const Oe=.5,Le=8,Be=(l,a,t)=>Math.min(t,Math.max(a,l)),Ae=l=>Math.hypot(l[0].clientX-l[1].clientX,l[0].clientY-l[1].clientY);function Qe(l){l!=null&&l.scene&&(l.scene.pan2Dxyzmm=[0,0,0,1],l.scene.volScaleMultiplier=1,l.drawScene()),Al()}function Al(){const l=document.querySelector('meta[name="viewport"]');if(!l)return;const a=l.getAttribute("content")||"width=device-width, initial-scale=1.0";/maximum-scale/.test(a)||(l.setAttribute("content",`${a}, maximum-scale=1, user-scalable=no`),requestAnimationFrame(()=>requestAnimationFrame(()=>l.setAttribute("content",a))))}function Rl(){const l=a=>a.preventDefault();for(const a of["gesturestart","gesturechange","gestureend"])document.addEventListener(a,l,{passive:!1});document.addEventListener("touchmove",a=>{a.touches.length>1&&a.preventDefault()},{passive:!1})}function kl(l){const a=l.canvas;if(!a)return;let t=null;const r=e=>{var g;if(e.touches.length!==2){t=null;return}const d=a.getBoundingClientRect(),s=(e.touches[0].clientX+e.touches[1].clientX)/2-d.left,f=(e.touches[0].clientY+e.touches[1].clientY)/2-d.top,v=((g=l.uiData)==null?void 0:g.dpr)||1;t={dist:Math.max(1,Ae(e.touches)),zoom:l.scene.pan2Dxyzmm[3]||1,pan:Array.from(l.scene.pan2Dxyzmm).slice(0,3),scale3d:l.scene.volScaleMultiplier||1,inRender:l.inRenderTile?l.inRenderTile(s*v,f*v)>=0:!1}},u=()=>{t=null};a.addEventListener("touchstart",r,{passive:!1}),a.addEventListener("touchend",u,{passive:!1}),a.addEventListener("touchcancel",u,{passive:!1}),l.handlePinchZoom=e=>{if(!t||!e.touches||e.touches.length!==2)return;const d=Ae(e.touches)/t.dist;if(!isFinite(d)||d<=0)return;if(t.inRender){l.scene.volScaleMultiplier=Be(t.scale3d*d,Oe,Le),l.drawScene();return}const s=Be(t.zoom*d,Oe,Le),f=l.frac2mm(l.scene.crosshairPos),v=t.zoom-s;l.scene.pan2Dxyzmm=[t.pan[0]+v*f[0],t.pan[1]+v*f[1],t.pan[2]+v*f[2],s],l.opts.yoke3Dto2DZoom&&(l.scene.volScaleMultiplier=s),l.drawScene()}}function Il(l){return Rl(),kl(l),{resetView:()=>Qe(l)}}const Fl=720,Nl=860;function zl(){var u,e,d,s,f,v;const l=window.visualViewport,a=Math.round((e=(u=l==null?void 0:l.width)!=null?u:window.innerWidth)!=null?e:0),t=Math.round((s=(d=l==null?void 0:l.height)!=null?d:window.innerHeight)!=null?s:0);return a>0&&a<=Fl?!0:!!((v=(f=window.matchMedia)==null?void 0:f.call(window,"(pointer: coarse)"))==null?void 0:v.matches)&&Math.min(a,t)<=Nl}function Va(l,a,t,r,u,e){const d=t-u,s=r-e;if(!(d>0)||!(s>0)||!(l>0)||!(a>0))return 0;let f=d/l;return a*f>s&&(f=s/a),f}function Wl(l){var w,C,k,j,W,q,i,G,R,y;const a=((j=(w=l.effectiveCanvasWidth)==null?void 0:w.call(l))!=null?j:(k=(C=l.gl)==null?void 0:C.canvas)==null?void 0:k.width)||0,t=((G=(W=l.effectiveCanvasHeight)==null?void 0:W.call(l))!=null?G:(i=(q=l.gl)==null?void 0:q.canvas)==null?void 0:i.height)||0;if(!a||!t)return null;let r=[1,1,1];try{const c=l.sliceScale();((R=c==null?void 0:c.volScale)==null?void 0:R.length)===3&&(r=c.volScale.slice())}catch(c){}l.opts.multiplanarEqualSize&&(r=[1,1,1]);const[u,e,d]=r,s=Math.max(u,e,d),f=((y=l.uiData)==null?void 0:y.dpr)||1,v=(parseFloat(`${l.opts.multiplanarPadPixels}`)||0)*f;let g=(l.opts.tileMargin||0)*f;g<0&&(g=2*(2+Math.ceil(l.fontPx||0)));const S=c=>(c-1)*v+c*g,b=c=>(c-1)*v+c*g,p=l.opts.multiplanarShowRender===Pt.ALWAYS||l.opts.multiplanarForceRender===!0,o=p?Va(s,e+d+d+s,a,t,S(1),b(4)):Va(s,e+d+d,a,t,S(1),b(3)),P=p?Va(u+u+e+s,Math.max(e,d),a,t,S(4),b(1)):Va(u+u+e,Math.max(e,d),a,t,S(3),b(1)),M=Va(u+e,e+d,a,t,S(2),b(2));return[{layout:ie.GRID,name:"grid",scale:M},{layout:ie.COLUMN,name:"column",scale:o},{layout:ie.ROW,name:"row",scale:P}]}function $l(l){if(!(l!=null&&l.gl))return null;const a=Wl(l);if(!a)return null;const t=a.reduce((u,e)=>e.scale>u.scale+1e-6?e:u),r=l.opts.multiplanarLayout!==t.layout;return l.opts.multiplanarLayout=t.layout,Ma(_a({},t),{changed:r})}function Dl(l){let a="";const t=l.drawScene.bind(l);l.drawScene=function(){var r,u,e;if(l.opts.sliceType===$a.MULTIPLANAR&&l.gl){const d=[l.gl.canvas.width,l.gl.canvas.height,l.opts.multiplanarShowRender,l.opts.multiplanarForceRender,l.opts.multiplanarEqualSize,(e=(u=(r=l.volumes)==null?void 0:r[0])==null?void 0:u.id)!=null?e:""].join("|");d!==a&&(a=d,$l(l))}return t()}}const ve=[{id:"multi",label:"All",title:"All planes",type:$a.MULTIPLANAR},{id:"axial",label:"A",title:"Axial only",type:$a.AXIAL},{id:"coronal",label:"C",title:"Coronal only",type:$a.CORONAL},{id:"sagittal",label:"S",title:"Sagittal only",type:$a.SAGITTAL},{id:"render",label:"3D",title:"3D render only",type:$a.RENDER}];function ql(l,a){const t=document.createElement("div");t.id="paneSwitcher",t.className="pane-switcher",t.setAttribute("role","group"),t.setAttribute("aria-label","Visible planes");for(const u of ve){const e=document.createElement("button");e.type="button",e.dataset.pane=u.id,e.textContent=u.label,e.title=u.title,e.setAttribute("aria-label",u.title),e.addEventListener("click",()=>at(l,t,u.id)),t.appendChild(e)}const r=document.createElement("button");return r.type="button",r.className="pane-reset",r.textContent="⟲",r.title="Reset zoom and pan",r.setAttribute("aria-label","Reset zoom and pan"),r.addEventListener("click",()=>Qe(l)),t.appendChild(r),a.appendChild(t),t}function at(l,a,t){const r=ve.find(u=>u.id===t)||ve[0];l.setSliceType(r.type),a.querySelectorAll("button").forEach(u=>u.classList.toggle("active",u.dataset.pane===r.id))}function Vl(l){var d;const a=document.getElementById("canvas-container")||document.body,t=ql(l,a);t.querySelector('button[data-pane="multi"]').classList.add("active"),Dl(l);let r=0;const u=()=>{r=0,document.body.classList.toggle("nv-narrow",zl());const s=l.canvas,f=l.opts.forceDevicePixelRatio===0?window.devicePixelRatio||1:l.opts.forceDevicePixelRatio<0?1:l.opts.forceDevicePixelRatio;s&&l.opts.isResizeCanvas!==!1&&(Math.abs(s.width-s.offsetWidth*f)>1||Math.abs(s.height-s.offsetHeight*f)>1)?l.resizeListener():l.drawScene()},e=()=>{r||(r=requestAnimationFrame(u))};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),(d=window.visualViewport)==null||d.addEventListener("resize",e),typeof ResizeObserver!="undefined"&&new ResizeObserver(e).observe(a),u(),{refresh:e,setPane:s=>at(l,t,s)}}let et=null,Ha=!1,oe=null,Ya=!1,ee=[];const tt=new URLSearchParams(window.location.search).get("backend")==="webgl2";function Yl(){return $(this,null,function*(){const l={secureContext:window.isSecureContext,navigatorGpuExists:"gpu"in navigator,adapterObtained:!1,deviceObtained:!1,f16Support:!1,error:null};if(window.isSecureContext||(console.warn("WebGPU requires a secure context (HTTPS or localhost)."),console.warn("Current origin:",window.location.origin)),"gpu"in navigator)try{console.log("Requesting WebGPU adapter...");const a=yield navigator.gpu.requestAdapter();if(a){l.adapterObtained=!0,console.log("WebGPU adapter obtained:",a),a.info&&console.log("Adapter info:",a.info),console.log("Adapter limits:",{maxBufferSize:a.limits.maxBufferSize,maxStorageBufferBindingSize:a.limits.maxStorageBufferBindingSize,maxComputeWorkgroupsPerDimension:a.limits.maxComputeWorkgroupsPerDimension});const t={maxBufferSize:a.limits.maxBufferSize,maxStorageBufferBindingSize:a.limits.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:a.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:a.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:a.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:a.limits.maxComputeWorkgroupSizeZ,maxComputeWorkgroupStorageSize:a.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:a.limits.maxComputeWorkgroupsPerDimension},r=a.features.has("shader-f16");l.f16Support=r;const u=r?["shader-f16"]:[];et=yield a.requestDevice({requiredLimits:t,requiredFeatures:u}),l.deviceObtained=!0,Ha=!0,console.log(`✓ WebGPU initialized successfully. F16: ${r?"enabled":"not available"}`)}else console.warn("WebGPU adapter request returned null."),console.warn("This typically means:"),console.warn("  - Safari: WebGPU feature flags not enabled in Settings > Feature Flags"),console.warn("  - Unsupported GPU hardware"),console.warn("  - GPU drivers need updating"),l.error="Adapter returned null"}catch(a){l.error=a.message,console.error("WebGPU initialization error:",a),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(console.warn("Safari detected. To enable WebGPU:"),console.warn("  1. Open Safari Settings/Preferences"),console.warn('  2. Go to Advanced tab, enable "Show features for web developers"'),console.warn("  3. Go to Feature Flags tab"),console.warn("  4. Enable: WebGPU, GPU Process: DOM Rendering, GPU Process: Canvas Rendering"),console.warn("  5. Restart Safari"))}else console.warn("navigator.gpu not found. WebGPU API is not available in this browser."),l.error="navigator.gpu not found",navigator.userAgent.includes("Firefox")&&(console.warn("Firefox detected. To enable WebGPU in about:config:"),console.warn("  1. Set dom.webgpu.enabled = true"),console.warn("  2. Set gfx.webgpu.ignore-blocklist = true"),console.warn("  3. Restart Firefox"));return jl(Ha&&!tt,l),Ha||console.log("Falling back to WebGL backend."),window.webgpuDiagnostics=l,l})}function jl(l,a){const t=document.getElementById("backendStatus");if(!t){console.log("Backend status element not found in DOM");return}if(l){const r=a.f16Support?" (F16)":"";t.textContent=`WebGPU${r}`,t.style.color="#4CAF50",t.title="WebGPU backend active - fastest performance"}else{t.textContent="WebGL",t.style.color="#FF9800";let r="WebGL backend (fallback)";a.error&&(r+=`
Reason: ${a.error}`),a.secureContext||(r+=`
⚠ Not a secure context (HTTPS required)`),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(r+=`

To enable WebGPU in Safari:
1. Settings > Feature Flags
2. Enable WebGPU flags
3. Restart Safari`),navigator.userAgent.includes("Firefox")&&(r+=`

To enable WebGPU in Firefox:
1. about:config > dom.webgpu.enabled = true
2. gfx.webgpu.ignore-blocklist = true
3. Restart Firefox`),t.title=r}}function Xl(){return $(this,null,function*(){let l="",a="",t,r=null,u=null;const e="altKey";let d=null,s=null,f=null;const v=.9;let g=null;const S=document.getElementById("sampleSelect"),b=document.getElementById("maskToggle"),p=document.getElementById("modelRunButton");let o=null,P=null,M=null;function w(){o==null||o.invalidate(),P=null,M=null,o==null||o.updateAvailability(),oe=null,b&&(b.checked=!1,b.disabled=!0)}const C=document.getElementById("dragSegmented");C&&C.querySelectorAll("button").forEach(n=>{n.onclick=()=>{h.opts.dragMode=parseInt(n.dataset.drag,10),C.querySelectorAll("button").forEach(E=>E.classList.toggle("active",E===n))}});const k=document.getElementById("drawBtn"),j=document.getElementById("drawPopover"),W=document.getElementById("penRow"),q=document.getElementById("drawApplyRow");function i(n){j&&(j.hidden=!n,k&&k.setAttribute("aria-expanded",String(n)))}function G(n){h.setDrawingEnabled(n>=0),n>=0&&h.setPenValue(n&7,n>7),W&&W.querySelectorAll(".chip").forEach(E=>E.classList.toggle("active",parseInt(E.dataset.pen,10)===n))}function R(n){return $(this,null,function*(){if(h.volumes.length<2){window.alert("No segmentation open (run a model first).");return}if(o!=null&&o.active)return;if(n===0){h.drawUndo();return}if(!h.drawBitmap){window.alert("Nothing drawn yet — pick a pen and draw on the image first.");return}const E=h.volumes[1].img,D=yield h.volumes[0].saveToDisk("",h.drawBitmap),X=352,aa=E.length;if(n===1)for(let B=0;B<aa;B++)D[X+B]>0&&(E[B]=1);if(n===2)for(let B=0;B<aa;B++)D[X+B]>0&&(E[B]=0);if(P&&(b!=null&&b.checked)){P.set(E);for(let B=0;B<aa;B++)M[B]=h.volumes[0].img[B]*P[B]}else if(P)for(let B=0;B<aa;B++)D[X+B]>0&&(P[B]=n===1?1:0,M[B]=h.volumes[0].img[B]*P[B]);o==null||o.invalidate(),h.closeDrawing(),h.updateGLVolume(),h.setDrawingEnabled(!1),G(-1)})}k&&(k.onclick=n=>{n.stopPropagation(),i(j.hidden)}),W&&W.querySelectorAll(".chip").forEach(n=>{n.onclick=()=>G(parseInt(n.dataset.pen,10))}),q&&q.querySelectorAll(".chip").forEach(n=>{n.onclick=()=>R(parseInt(n.dataset.apply,10))}),document.addEventListener("click",n=>{!j||j.hidden||n.target.closest(".popover-wrap")||i(!1)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&i(!1)});const y=document.getElementById("appDialog");y&&y.addEventListener("click",n=>{n.target===y&&y.close()}),aboutBtn.onclick=function(){La("About Brainchomp",`
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
    `)},diagnosticsBtn.onclick=function(){let n=l;if(n.length<1&&window.webgpuDiagnostics){const D=window.webgpuDiagnostics;n=`:: Startup Diagnostics ::
`,n+=`Secure Context: ${D.secureContext}
`,n+=`WebGPU Enabled: ${Ha}
`,n+=`F16 Support: ${D.f16Support}
`,D.error&&(n+=`Error: ${D.error}
`),n+=`User Agent: ${navigator.userAgent}
`}if(n.length<1&&window.webgpuDiagnostics,n.length<1){La("Diagnostics","No diagnostic string generated: run a model to create diagnostics");return}let E=n;a=a.slice(0,-2),a!==""&&E.includes("Status: OK")&&(E=E.replace("Status: OK",`Status: ${a}`)),a="",navigator.clipboard.writeText(E).then(()=>{La("Diagnostics",`<p>Diagnostics copied to clipboard</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${E}</pre>`)}).catch(D=>{La("Diagnostics",`<p>Failed to copy to clipboard.</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${E}</pre>`)})},opacitySlider0.oninput=function(){h.setOpacity(0,opacitySlider0.value/255),h.updateGLVolume()},opacitySlider1.oninput=function(){if(o!=null&&o.active){h.setDrawOpacity(opacitySlider1.value/255);return}h.setOpacity(1,opacitySlider1.value/255)};function c(){return $(this,null,function*(){const n=h.volumes[0],E=256*256*256;if(!(n.dims[1]===256&&n.dims[2]===256&&n.dims[3]===256&&n.img.length===E))throw new Error(`Brainchomp currently requires a pre-conformed 256 × 256 × 256 NIfTI; received ${n.dims[1]} × ${n.dims[2]} × ${n.dims[3]}.`)})}function O(){return $(this,null,function*(){for(;h.volumes.length>1;)yield h.removeVolume(h.volumes[1])})}function T(){return h.volumes.length>=2&&h.volumes[1].colormapLabel?h.volumes[1]:null}function z(){d=null,s=null,f=null}function N(){const n=T();if(n){if(s===null&&(s=n.img),d===null)n.img=s,f=null;else{const E=s,D=new E.constructor(E.length);for(let X=0;X<E.length;X++)D[X]=E[X]===d?d:0;n.img=D,f=V(d)}h.updateGLVolume()}}function V(n){const E=h.volumes[0],D=s||h.volumes[1]&&h.volumes[1].img;if(!E||!D)return null;const X=E.hdr.pixDims||[],aa=X[1]&&X[2]&&X[3]?X[1]*X[2]*X[3]:1,B=ba(E.img,D,aa),oa=B.reduce((na,ga)=>na+ga.volume_mm3,0),ta=B.find(na=>na.label===n);if(!ta)return null;const J=oa>0?ta.volume_mm3/oa*100:0,Y=[ta.name,`${_(ta.volume_mm3)} cm3   (${J.toFixed(1)}% of brain)`,`${ta.voxels.toLocaleString()} voxels`,`intensity  ${ta.mean.toFixed(0)} +/- ${ta.stdev.toFixed(0)}`];let K=[1,1,1,1];if(u&&u.R&&u.R[n]!=null){const na=ga=>Math.min(255,ga*.55+130)/255;K=[na(u.R[n]),na(u.G[n]),na(u.B[n]),1]}return{lines:Y,color:K}}function I(){if(d===null||!f||!T())return;const n=h.screenSlices&&h.screenSlices.find(ga=>ga.axCorSag===4);if(!n)return;const[E,D]=n.leftTopWidthHeight,X=h.gl;X.viewport(0,0,X.canvas.width,X.canvas.height),X.enable(X.BLEND);const B=h.fontPx*v*1.55,oa=h.fontPx*.6,ta=E+oa,J=D+oa,Y=[.92,.92,.92,1],{lines:K,color:na}=f;h.drawText([ta,J],K[0],v,na);for(let ga=1;ga<K.length;ga++)h.drawText([ta,J+ga*B],K[ga],v,Y)}function Z(){const n=T();if(!n)return null;const E=h.frac2mm(h.scene.crosshairPos,0,!0),D=n.mm2vox(E),X=n.img;s&&(n.img=s);const aa=Math.round(n.getValue(D[0],D[1],D[2],n.frame4D));return n.img=X,aa}function ua(n){o!=null&&o.active||T()&&(d=n===0||n===d?null:n,N())}function Q(n){if(!n[e]||!T())return;const E=Z();E===null||Number.isNaN(E)||(ua(E),n.preventDefault())}function ha(){return $(this,null,function*(){if(!(Ya||o!=null&&o.active)){Ya=!0,o==null||o.updateAvailability(),p&&(p.disabled=!0),ee=[];try{yield Ca()}catch(n){console.error("Inference could not start:",n),La("Input not supported",Xa((n==null?void 0:n.message)||String(n)))}finally{Ya=!1,o==null||o.updateAvailability(),p&&(p.disabled=!1)}}})}function Ca(){return $(this,null,function*(){const n=modelSelect.value;if(n==="-1"||modelSelect.selectedIndex<0)return;yield O(),z(),yield c();const E=Ba[n],D=_a({},Vt),X=new URL("./",window.location.href).href;D.rootURL=X.endsWith("/")?X.slice(0,-1):X;const aa=h.volumes[0].img;if(Ha&&!tt&&E.webgpu_safetensor){console.log("Attempting WebGPU backend...");const J=Ma(_a({},E),{enableTTA:!1});try{yield Ul(et,D,J,h.volumes[0].hdr,aa,pa,fa);return}catch(Y){console.error("WebGPU inference failed, falling back to WebWorker.",Y)}}if(E.webgpu_safetensor)try{const{runInferenceWebGl2:J,nativeWebgl2Available:Y}=yield ct(()=>$(null,null,function*(){const{runInferenceWebGl2:K,nativeWebgl2Available:na}=yield import("./inference-webgl2-DGjvxGXZ.js");return{runInferenceWebGl2:K,nativeWebgl2Available:na}}),[],import.meta.url);if(Y()){console.log("Attempting native WebGL2 runner..."),yield J(D,E,h.volumes[0].hdr,aa,pa,fa);return}console.log("Native WebGL2 unavailable here (no OffscreenCanvas/webgl2); using the tfjs worker.")}catch(J){console.warn("Native WebGL2 declined or failed, falling back to the tfjs worker.",J.message)}if(console.log("Attempting WebWorker backend..."),typeof t!="undefined"){console.log("Worker is busy. Please wait.");return}const B={dims:h.volumes[0].hdr.dims,datatypeCode:h.volumes[0].hdr.datatypeCode},oa=J=>new Promise((Y,K)=>{const na=Ma(_a({},D),{enableSeqConv:J}),ga=Ma(_a({},E),{enableSeqConv:J,enableTTA:!1});t=new Bl({}),t.postMessage({opts:na,modelEntry:ga,niftiHeader:B,niftiImage:aa}),t.onmessage=function(Ua){const{cmd:wa,message:Na,progressFrac:qa,modalMessage:ya,statData:Aa,img:lt,opts:it,modelEntry:rt}=Ua.data;if(wa==="ui"){if(ya){if(t.terminate(),t=void 0,Aa&&Aa.Status==="Fail"){K(new Error(Aa.Error_Type||ya));return}if(typeof ya=="string"&&(ya.toLowerCase().includes("fail")||ya.toLowerCase().includes("error")||ya.toLowerCase().includes("compatible")||ya.toLowerCase().includes("texture")||ya.toLowerCase().includes("maximum"))){K(new Error(ya));return}}fa(Na,qa,ya,Aa)}wa==="img"&&(t.terminate(),t=void 0,pa(lt,it,rt),Y())},t.onerror=function(Ua){console.error("WebWorker failed",Ua),t.terminate(),t=void 0,K(Ua)}});try{console.log("Attempting WebWorker with enableSeqConv: false"),yield oa(!1);return}catch(J){console.warn("WebWorker (fast) failed, retrying with enableSeqConv: true",J),typeof t!="undefined"&&(t.terminate(),t=void 0),console.log("Waiting 1000ms for WebGL context cleanup..."),yield new Promise(Y=>setTimeout(Y,1e3));try{console.log("Attempting WebWorker with enableSeqConv: true"),yield oa(!0);return}catch(Y){console.error("WebWorker (slow) failed, falling back to Main Thread.",Y)}}console.log("Attempting Main Thread backend...");const ta=J=>new Promise((Y,K)=>{const na=Ma(_a({},D),{enableSeqConv:J}),ga=Ma(_a({},E),{enableSeqConv:J}),Ua=(Na,qa,ya,Aa)=>{Aa&&Aa.Status==="Fail"?K(new Error(Aa.Error_Type||ya||"Inference Failed")):ya&&typeof ya=="string"&&(ya.toLowerCase().includes("fail")||ya.toLowerCase().includes("error")||ya.toLowerCase().includes("compatible")||ya.toLowerCase().includes("texture")||ya.toLowerCase().includes("maximum"))&&K(new Error(ya)),fa(Na,qa,ya,Aa)},wa=(Na,qa,ya)=>{pa(Na,qa,ya),Y()};vl(na,ga,h.volumes[0].hdr,aa,wa,Ua).catch(Na=>K(Na))});try{console.log("Attempting Main Thread with enableSeqConv: false"),yield ta(!1)}catch(J){console.warn("Main Thread (fast) failed, retrying with enableSeqConv: true",J),yield new Promise(Y=>setTimeout(Y,100));try{console.log("Attempting Main Thread with enableSeqConv: true"),yield ta(!0)}catch(Y){console.error("Main Thread (slow) failed.",Y),Hl(Y)}}})}modelSelect.onchange=ha,p&&(p.onclick=()=>{modelSelect.value="0",ha()}),b&&(b.onchange=()=>{P&&ea().catch(n=>{console.error("Could not switch result overlay:",n),La("Overlay error",Xa((n==null?void 0:n.message)||String(n)))})});function Pa(n){const E=T(),D=d!==null&&E&&s;D&&(E.img=s);try{return n()}finally{D&&N()}}function H(n){return $(this,null,function*(){if(o!=null&&o.busy)return;if(!P||!M){window.alert("No result to save (run Skull-strip first).");return}const E=yield h.volumes[0].clone();if(E.zeroImage(),Object.assign(E.hdr,{scl_inter:0,scl_slope:1}),n==="mask"){E.img=P,E.hdr.datatypeCode=2,E.hdr.numBitsPerVoxel=8,E.hdr.intent_code=1002,E.saveToDisk("brainmask.nii.gz");return}E.img=M,E.hdr.intent_code=0,E.saveToDisk("skull_stripped_brain.nii.gz")})}function la(){if(h.volumes.length<1){window.alert("No image loaded.");return}h.volumes[0].saveToDisk("input.nii.gz")}function va(){return $(this,null,function*(){if(h.volumes.length<1){window.alert("No image loaded.");return}yield Pa(()=>$(null,null,function*(){yield h.saveDocument("brainchomp.nvd")}))})}const ia=[{act:()=>H("brain"),title:"Skull-stripped brain",sub:"input intensities with background set to zero",need:"result"},{act:()=>H("mask"),title:"Brain mask",sub:"binary mask, including accepted edits",need:"result"},{act:la,title:"Input volume",sub:"the currently loaded 256³ NIfTI",need:"img"},{act:va,title:"Scene",sub:"everything, as a .nvd document",need:"img"}];function ra(){const n=h.volumes.length>=1,E=!!P,D=B=>B==="result"?E:n,X=ia.map((B,oa)=>{const ta=D(B.need)?"":" disabled";return`<button type="button" class="save-opt${ta}" data-i="${oa}"${ta?" disabled":""}>
        <span class="save-opt-title">${B.title}</span>
        <span class="save-opt-sub">${B.sub}</span>
      </button>`}).join("");La("Save",`<div class="save-options">${X}</div>`,{hideClose:!0,saveMode:!0});const aa=document.getElementById("dialogMessage");aa&&aa.querySelectorAll(".save-opt:not(.disabled)").forEach(B=>{B.onclick=()=>{const oa=ia[parseInt(B.dataset.i,10)],ta=document.getElementById("appDialog");ta&&ta.open&&ta.close(),oa.act()}})}const ca=document.getElementById("saveBtn");ca&&(ca.onclick=ra);function ba(n,E,D){const aa=new Map,B=E.length;for(let J=0;J<B;J++){const Y=E[J];if(Y===0)continue;let K=aa.get(Y);K||(K={count:0,sum:0,sumSq:0,hist:new Float64Array(256)},aa.set(Y,K));const na=n[J];K.count++,K.sum+=na,K.sumSq+=na*na,K.hist[na]++}const oa=(J,Y,K)=>{const na=K*Y;let ga=0;for(let Ua=0;Ua<J.length;Ua++)if(ga+=J[Ua],ga>=na)return Ua;return J.length-1},ta=[];for(const[J,Y]of[...aa.entries()].sort((K,na)=>K[0]-na[0])){const K=Y.sum/Y.count,na=Math.max(0,Y.sumSq/Y.count-K*K);let ga=0,Ua=0;for(let wa=0;wa<Y.hist.length;wa++)if(Y.hist[wa]>0){ga=wa;break}for(let wa=Y.hist.length-1;wa>=0;wa--)if(Y.hist[wa]>0){Ua=wa;break}ta.push({label:J,name:r&&r[J]!=null?r[J]:`label_${J}`,voxels:Y.count,volume_mm3:Y.count*D,min:ga,max:Ua,q1:oa(Y.hist,Y.count,.25),median:oa(Y.hist,Y.count,.5),q3:oa(Y.hist,Y.count,.75),mean:K,stdev:Math.sqrt(na)})}return ta}function sa(n){const E=["label","name","voxels","volume_mm3","min","max","q1","median","q3","mean","stdev"],D=B=>Number.isInteger(B)?String(B):B.toFixed(6),X=B=>/[",\n]/.test(B)?`"${String(B).replace(/"/g,'""')}"`:String(B),aa=[E.join(",")];for(const B of n)aa.push([B.label,X(B.name),B.voxels,D(B.volume_mm3),B.min,B.max,B.q1,B.median,B.q3,D(B.mean),D(B.stdev)].join(","));return aa.join(`
`)+`
`}function Sa(n){const E=new Blob([sa(n)],{type:"text/csv"}),D=URL.createObjectURL(E),X=document.createElement("a");X.href=D,X.download="mask_stats.csv",document.body.appendChild(X),X.click(),X.remove(),URL.revokeObjectURL(D)}const Oa=n=>String(n).replace(/[&<>"]/g,E=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[E]),_=n=>{const E=n/1e3;return E>=10?Math.round(E).toLocaleString():E.toFixed(1)};function L(n,E){const D=Math.max(...n.map(B=>B.volume_mm3)),X=B=>u&&u.R&&u.R[B.label]!=null?`rgb(${u.R[B.label]},${u.G[B.label]},${u.B[B.label]})`:"#6b9bd1";let aa="";for(const B of n){const oa=E>0?B.volume_mm3/E*100:0,ta=D>0?B.volume_mm3/D*100:0,J=`<span class="stat-val" data-cm3="${_(B.volume_mm3)}" data-pct="${oa.toFixed(1)}%">${_(B.volume_mm3)}</span>`,Y=`<span class="stat-bar" style="width:${ta.toFixed(2)}%;background:${X(B)}" data-w-abs="${ta.toFixed(2)}" data-w-pct="${oa.toFixed(2)}"></span>`,K=(ga,Ua)=>`<div><span class="k">${ga}</span><span class="v">${Ua}</span></div>`,na=K("min",B.min)+K("max",B.max)+K("Q1",B.q1)+K("Q3",B.q3)+K("median",B.median)+K("mean",B.mean.toFixed(2))+K("SD",B.stdev.toFixed(2))+K("voxels",B.voxels.toLocaleString());aa+=`
        <div class="stat-row" role="button" tabindex="0" data-label="${B.label}" style="cursor:pointer">
          <div class="stat-line">
            <span class="stat-name">${Oa(B.name)}</span>
            <span class="stat-track">${Y}</span>
            ${J}
            <button type="button" class="stat-iso" title="Show only this region in the viewer">isolate</button>
          </div>
          <div class="stat-detail" style="display:none">${na}</div>
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
          <span class="stat-total" id="statsUnitLabel">total ${_(E)} cm³</span>
        </div>
        <div class="stat-toggle">
          <button type="button" data-mode="cm3" class="active">cm³</button>
          <button type="button" data-mode="pct">% of total</button>
        </div>
        <div id="statsRows">${aa}</div>
        <div class="stat-actions">
          <button type="button" id="statsDownloadBtn">Download CSV</button>
        </div>
      </div>`}saveStatsBtn.onclick=function(){if(h.volumes.length<2){window.alert("No segmentation to measure (run a model first).");return}const n=h.volumes[0].img,E=s||h.volumes[1].img;if(!n||!E||n.length!==E.length){window.alert("Input and segmentation grids do not match.");return}const D=h.volumes[0].hdr.pixDims||[],X=D[1]&&D[2]&&D[3]?D[1]*D[2]*D[3]:1;let aa=ba(n,E,X);if(aa.length===0){window.alert("No non-background labels found in the segmentation.");return}aa=aa.slice().sort((ta,J)=>J.volume_mm3-ta.volume_mm3);const B=aa.reduce((ta,J)=>ta+J.volume_mm3,0);La("Region volumes",L(aa,B));const oa=document.getElementById("statsPanel");oa&&(oa.querySelectorAll(".stat-toggle button").forEach(ta=>{ta.onclick=()=>{const J=ta.dataset.mode;oa.querySelectorAll(".stat-toggle button").forEach(Y=>Y.classList.toggle("active",Y===ta)),document.getElementById("statsUnitLabel").textContent=J==="pct"?"100% of segmented volume":`total ${_(B)} cm³`,oa.querySelectorAll(".stat-row").forEach(Y=>{const K=Y.querySelector(".stat-val"),na=Y.querySelector(".stat-bar");K.textContent=J==="pct"?K.dataset.pct:K.dataset.cm3,na.style.width=(J==="pct"?na.dataset.wPct:na.dataset.wAbs)+"%"})}}),oa.querySelectorAll(".stat-row").forEach(ta=>{const J=()=>{const Y=ta.querySelector(".stat-detail");Y.style.display=Y.style.display==="none"?"grid":"none"};ta.onclick=J,ta.onkeydown=Y=>{(Y.key==="Enter"||Y.key===" ")&&(Y.preventDefault(),J())}}),oa.querySelectorAll(".stat-iso").forEach(ta=>{ta.onclick=J=>{J.stopPropagation();const Y=parseInt(ta.closest(".stat-row").dataset.label,10);Number.isNaN(Y)||ua(Y);const K=document.getElementById("appDialog");K&&K.open&&K.close()}}),document.getElementById("statsDownloadBtn").onclick=()=>Sa(aa))};function F(){g=h.volumes[0]||null,g&&g.name&&g.name,opacitySlider0.oninput(),modelSelect.value="-1",h.volumes.length===1&&w()}function ea(){return $(this,null,function*(){if(!P||!M||!oe)return;yield O(),z();const n=yield h.volumes[0].clone();if(n.zeroImage(),Object.assign(n.hdr,{scl_inter:0,scl_slope:1}),r=null,u=null,b!=null&&b.checked){n.img=P;const E=["Background","Brain Mask"];r=E.slice();const D=[0,217],X=[0,119],aa=[0,33];u={R:D,G:X,B:aa},n.setColormapLabel({R:D,G:X,B:aa,labels:E}),n.hdr.datatypeCode=2,n.hdr.numBitsPerVoxel=8,n.hdr.intent_code=1002}else n.img=M,n.hdr.intent_code=0,n.colormap=h.colormaps().includes("copper2")?"copper2":"actc";n.opacity=opacitySlider1.value/255,yield h.addVolume(n)})}function pa(n,E,D){return $(this,null,function*(){o==null||o.invalidate(),oe=D,P=new Uint8Array(n.length),M=new h.volumes[0].img.constructor(n.length);const X=h.volumes[0].img;for(let aa=0;aa<n.length;aa++){const B=n[aa]!==0?1:0;P[aa]=B,M[aa]=X[aa]*B}b&&(b.disabled=!1),yield ea(),o==null||o.updateAvailability()})}function da(n){return $(this,null,function*(){if(typeof n=="string")try{n=JSON.parse(n)}catch(E){console.error("Failed to parse telemetry data",E);return}n=yield Ll(n,h.gl),l=`:: Diagnostics https://github.com/neuroneural/brainchop/issues ::
`;for(const E in n)n[E]!==null&&n[E]!==void 0&&(l+=`${E}: ${n[E]}
`)})}function fa(n="",E=-1,D="",X=[]){n&&(console.log(n),document.getElementById("location").innerHTML=n),isNaN(E)?(memstatus.style.color="red",memstatus.innerHTML="Memory Issue"):E>=0&&(modelProgress.value=E*modelProgress.max),D&&(Ya?(ee.push(String(D)),console.warn("[backend]",D)):La("Message",Xa(String(D)).replace(/\n/g,"<br>"))),X&&Object.keys(X).length>0&&da(X)}function x(n){document.getElementById("location").innerHTML=n.string.split("   ").map(E=>E.trim()).filter(E=>E!=="").map(E=>`<span class="loc-seg">${E}</span>`).join('<span class="loc-sep">&middot;</span>')}const U={backColor:[0,0,0,1],show3Dcrosshair:!0,onLocationChange:x},h=new Ut(U);yield h.attachTo("gl1"),o=qt({nv:h,getState:()=>P?{mask:P,dims:h.volumes[0].hdr.dims.slice(1,4),affine:h.volumes[0].hdr.affine,running:Ya}:null,prepare:()=>$(null,null,function*(){z(),b.checked=!0,yield ea()}),onPatch:({rect:n})=>{const[E,D,X,aa]=n,[B,oa,ta]=h.volumes[0].hdr.dims.slice(1,4),J=h.volumes[0].img;for(let Y=0;Y<ta;Y++)for(let K=D;K<=aa;K++)for(let na=E;na<=X;na++){const ga=na+B*(K+oa*Y);M[ga]=J[ga]*P[ga]}},onError:n=>La("Sculpting",Xa(n.message))}),h.gl.canvas.addEventListener("click",Q),window.addEventListener("keydown",n=>{n.key!=="Escape"||d===null||document.querySelector("dialog[open]")||(d=null,N())});const A=h.gl.uniform4fv.bind(h.gl);h.gl.uniform4fv=function(n,E){if(d!==null){const D=h.orientShaderAtlasU&&h.orientShaderAtlasU.uniforms.xyzaFrac,X=h.orientShaderAtlasI&&h.orientShaderAtlasI.uniforms.xyzaFrac;if(D&&n===D||X&&n===X)return A(n,[0,0,0,E[3]])}return A(n,E)};const Ea=h.drawSceneCore.bind(h);h.drawSceneCore=function(){const n=Ea();try{I()}catch(E){console.warn("isolation HUD draw failed",E)}return n},Object.assign(h.opts,{dragMode:h.dragModes.slicer3D,multiplanarForceRender:!0,yoke3Dto2DZoom:!0,crosshairGap:11});{const n=document.getElementById("dragSegmented");n&&n.querySelectorAll("button").forEach(E=>E.classList.toggle("active",parseInt(E.dataset.drag,10)===h.opts.dragMode))}h.setInterpolation(!0);function Ta(n){return $(this,null,function*(){for(w();h.volumes.length;)yield h.removeVolume(h.volumes[h.volumes.length-1]);z(),yield h.loadVolumes([{url:n}])})}h.onImageLoaded=F,S&&(S.onchange=()=>Ta(S.value),yield Ta(S.value)),modelSelect.innerHTML="";const Ra=document.createElement("option");Ra.text="Run Segmentation Model",Ra.value="-1",Ra.disabled=!0,Ra.selected=!0,Ra.hidden=!0,modelSelect.appendChild(Ra);for(let n=0;n<Ba.length;n++){console.log(`Adding model option: ${Ba[n].modelName}`);const E=document.createElement("option");E.text=Ba[n].modelName,E.value=n,Ba[n].type==="Divider"&&(E.disabled=!0),modelSelect.appendChild(E)}Vl(h),Il(h),modelSelect.value="-1",G(-1),yield Yl();const Fa=new URLSearchParams(window.location.search).get("model");Fa&&Fa<Ba.length&&(modelSelect.value=Fa,ha())})}function Xa(l){return String(l).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}function Hl(l){const t=(ee.length?ee:[l&&l.message?l.message:String(l||"unknown error")]).map(r=>`<li>${Xa(r)}</li>`).join("");La("Segmentation failed",`<p>No available backend could run this model on this device.</p>
     <ul style="margin:0 0 4px 1.1em;padding:0;font-size:0.92em;line-height:1.45">${t}</ul>
     <p style="font-size:0.88em;color:#9aa4af">Full details are in the browser console and under Diagnostics.</p>`)}function La(l,a,t={}){const r=document.getElementById("appDialog"),u=document.getElementById("dialogTitle"),e=document.getElementById("dialogMessage"),d=document.getElementById("dialogCloseBtn");if(!r)return;u.textContent=l,e.innerHTML=a,d.style.display=t.hideClose?"none":"",d.onclick=()=>r.close(),r.classList.toggle("dialog-save",!!t.saveMode);const s=document.getElementById("dialogXBtn");s&&(s.onclick=()=>r.close()),r.showModal()}function Kl(){return $(this,null,function*(){try{const a=yield(yield fetch("https://api.github.com/repos/neuroneural/brainchop")).json();document.getElementById("star-count").textContent=a.stargazers_count}catch(l){console.error("Error fetching star count:",l)}})}(function(){return $(this,null,function*(){yield Xl(),yield Kl()})})();
