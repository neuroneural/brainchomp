var St=Object.defineProperty,mt=Object.defineProperties;var Pt=Object.getOwnPropertyDescriptors;var Oe=Object.getOwnPropertySymbols;var Ut=Object.prototype.hasOwnProperty,_t=Object.prototype.propertyIsEnumerable;var Ha=Math.pow,Le=(l,a,t)=>a in l?St(l,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[a]=t,Ta=(l,a)=>{for(var t in a||(a={}))Ut.call(a,t)&&Le(l,t,a[t]);if(Oe)for(var t of Oe(a))_t.call(a,t)&&Le(l,t,a[t]);return l},La=(l,a)=>mt(l,Pt(a));var j=(l,a,t)=>new Promise((r,n)=>{var e=u=>{try{s(t.next(u))}catch(c){n(c)}},f=u=>{try{s(t.throw(u))}catch(c){n(c)}},s=u=>u.done?r(u.value):Promise.resolve(u.value).then(e,f);s((t=t.apply(l,a)).next())});import{m as xt}from"./vendor-gTbkpY2o.js";import{W as wt,X as Ct,Y as qa,Z as Pe,_ as Ve,$ as Mt,z as ye,b as Ia,O as de,E as Et,a0 as Tt,K as Gt,a1 as Be,a2 as Ot,k as $a,u as Lt,y as Ye,i as Ue,a3 as ie,t as Bt}from"./vendor-math-Cp3_ovwH.js";import{S as ja,a as At,M as ve,N as Rt}from"./vendor-niivue-Cdme4TKu.js";import{l as kt,t as re,s as Ft,d as Aa,b as je,a as wa,z as It,g as Xe,w as ne,f as He,m as Nt,o as zt,c as Se,e as Wt,h as _e,i as ce,r as Ke,j as Dt,k as Ze,n as $t,p as qt,q as Je,u as Ba,v as Qe,x as Vt,y as Ya,A as Yt,B as ge,C as jt,D as Xt}from"./vendor-tf-DGuKl8vL.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const f of e.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function t(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(n){if(n.ep)return;n.ep=!0;const e=t(n);fetch(n.href,e)}})();function Ht(l,a){let t=0,r=1;const n=[0,0,0];for(const e of a){const f=Math.abs(e)-1;n[f]=Math.sign(e)*r,e<0&&(t+=(l[f]-1)*r),r*=l[f]}return{offset:t,strides:n}}class Kt{constructor(a){if(this.nv=a,this.volume=a.volumes[1],this.opacity=this.volume.opacity,this.drawOpacity=a.drawOpacity,this.drawLut=a.drawLut,!a.loadDrawing(this.volume))throw new Error("Could not align the mask with the slice grid.");a.drawClearAllUndoBitmaps(),a.setDrawingEnabled(!1);const t=a.drawLut.lut.slice();t.set([217,119,33,255],4),a.drawLut=La(Ta({},a.drawLut),{lut:t}),a.refreshColormaps(),a.setDrawOpacity(this.opacity),a.setOpacity(1,0),Object.assign(this,Ht(this.volume.hdr.dims.slice(1,4),this.volume.permRAS))}patch({rect:a,data:t}){const[r,n,e,f]=a,s=e-r+1,u=f-n+1,[c,d,S]=this.strides,b=this.nv.drawBitmap,g=this.volume.hdr.dims[3];for(let v=0;v<g;v++)for(let y=n;y<=f;y++){let C=this.offset+r*c+y*d+v*S,w=s*(y-n+u*v);for(let G=r;G<=e;G++,C+=c)b[C]=t[w++]}this.nv.refreshDrawing(!0)}close(){const a=this.nv,t=a.drawOpacity;a.closeDrawing(),a.drawLut=this.drawLut,a.setDrawOpacity(this.drawOpacity),a.refreshColormaps(),a.volumes[1]===this.volume&&(this.volume.opacity=t,a.updateGLVolume())}}class Zt{constructor(a){this.nv=a,this.canvas=document.createElement("canvas"),this.canvas.className="sculpt-slice-footprint",this.canvas.setAttribute("aria-hidden","true"),a.gl.canvas.parentElement.append(this.canvas),this.originalDraw=a.drawScene;const t=this;this.wrappedDraw=function(...r){const n=t.originalDraw.apply(this,r);return t.draw(),n},a.drawScene=this.wrappedDraw}set(a){this.brush=(a==null?void 0:a.tool)==="scoop"?a:null,this.draw()}draw(){const{nv:a,canvas:t,brush:r}=this,n=a.gl.canvas;t.width!==n.width&&(t.width=n.width),t.height!==n.height&&(t.height=n.height);const e=t.getContext("2d");if(e.clearRect(0,0,t.width,t.height),!r)return;const f=(u,c)=>u.reduce((d,S,b)=>d+S*c[b],0),s=(u,c)=>u.map((d,S)=>d-c[S]);for(let u=0;u<a.screenSlices.length;u++){const c=a.screenSlices[u];if(c.axCorSag>2||c.AxyzMxy.length<4)continue;const[d,S,b,g]=c.leftTopWidthHeight,v=d+b*.5,y=S+g*.5,C=(B,D)=>Array.from(a.frac2mm(a.screenXY2TextureFrac(B,D,u,!1))).slice(0,3),w=C(v,y),G=s(C(v+1,y),w),k=s(C(v,y+1),w),I=f(G,G),z=f(G,k),K=f(k,k),i=I*K-z*z;if(i<1e-20)continue;const A=B=>{const D=s(B,w),N=f(D,G),Y=f(D,k);return[v+(N*K-Y*z)/i,y+(Y*I-N*z)/i]},x=[G[1]*k[2]-G[2]*k[1],G[2]*k[0]-G[0]*k[2],G[0]*k[1]-G[1]*k[0]].map(B=>B/Math.sqrt(i)),m=f(s(r.point,w),x);if(Math.abs(m)>r.radius)continue;const p=r.point.map((B,D)=>B-x[D]*m),L=Math.sqrt(Ha(r.radius,2)-Ha(m,2)),E=G.map(B=>B/Math.sqrt(I)),W=[x[1]*E[2]-x[2]*E[1],x[2]*E[0]-x[0]*E[2],x[0]*E[1]-x[1]*E[0]];e.save(),e.beginPath(),e.rect(Math.min(d,d+b),S,Math.abs(b),g),e.clip(),e.strokeStyle="#ff9876",e.lineWidth=1.5*t.width/n.clientWidth,e.beginPath();for(let B=0;B<=96;B++){const D=B*Math.PI/48,N=p.map((ta,Q)=>ta+L*(E[Q]*Math.cos(D)+W[Q]*Math.sin(D))),Y=A(N);B===0?e.moveTo(...Y):e.lineTo(...Y)}e.stroke(),e.restore()}}close(){this.nv.drawScene===this.wrappedDraw&&(this.nv.drawScene=this.originalDraw),this.canvas.remove()}}function Jt(l,a,t,r){const n=(b,g)=>b.map((v,y)=>v-g[y]),e=(b,g)=>b.reduce((v,y,C)=>v+y*g[C],0),f=n(t,a),s=n(r,a),u=n(l,a),c=e(f,u),d=e(s,u);let S;if(c<=0&&d<=0)S=[1,0,0];else{const b=n(l,t),g=e(f,b),v=e(s,b);if(g>=0&&v<=g)S=[0,1,0];else{const y=c*v-g*d;if(y<=0&&c>=0&&g<=0){const C=c/(c-g);S=[1-C,C,0]}else{const C=n(l,r),w=e(f,C),G=e(s,C);if(G>=0&&w<=G)S=[0,0,1];else{const k=w*d-c*G;if(k<=0&&d>=0&&G<=0){const I=d/(d-G);S=[1-I,0,I]}else{const I=g*G-w*v;if(I<=0&&v-g>=0&&w-G>=0){const z=(v-g)/(v-g+w-G);S=[0,1-z,z]}else{const z=I+k+y;if(Math.abs(z)<1e-20)return null;const K=k/z,i=y/z;S=[1-K-i,K,i]}}}}}}return{point:a.map((b,g)=>b*S[0]+t[g]*S[1]+r[g]*S[2]),weights:S}}function Qt(l,a,t,r){let n=1/0,e=null;for(let f=0;f<t.length;f+=3){const s=t[f]*3,u=t[f+1]*3,c=t[f+2]*3;if(s===u||u===c||s===c)continue;let d=0;for(let y=0;y<3;y++){const C=Math.min(a[s+y],a[u+y],a[c+y]),w=Math.max(a[s+y],a[u+y],a[c+y]);d+=Ha(Math.max(C-l[y],0,l[y]-w),2)}if(d>=n)continue;const S=Jt(l,Array.from(a.subarray(s,s+3)),Array.from(a.subarray(u,u+3)),Array.from(a.subarray(c,c+3)));if(!S)continue;const b=S.point.reduce((y,C,w)=>y+Ha(C-l[w],2),0);if(b>=n)continue;n=b;const g=[0,1,2].map(y=>S.weights[0]*r[s+y]+S.weights[1]*r[u+y]+S.weights[2]*r[c+y]),v=Math.hypot(...g)||1;e={point:S.point,normal:g.map(y=>y/v),distance:Math.sqrt(b)}}return e}function at(l,a=[0,0,1]){const t=ye(Ia(),l);let r=de(Ia(),a,t);Et(r)<1e-5&&(r=de(r,[0,1,0],t)),ye(r,r);const n=de(Ia(),t,r);return Pe(qa(),Tt(qa(),Gt(...r,...n,...t)))}function Ae(){return at([0,-Math.cos(.2),Math.sin(.2)])}function al(l,a,t){const r=Math.hypot(a,t);if(!r)return wt(l);const n=Ct(qa(),[t/r,a/r,0],r*.006);return Pe(qa(),Ve(qa(),l,n))}function el(l,a,t,r,n){const e=([s,u])=>{const c=Math.max(1,Math.min(r,n)),d=[(2*s-r)/c,(n-2*u)/c,0],S=Math.hypot(d[0],d[1]);return d[2]=S<Math.SQRT1_2?Math.sqrt(1-S*S):.5/Math.max(S,1e-6),ye(Ia(),d)},f=Mt(qa(),e(t),e(a));return Pe(qa(),Ve(qa(),l,f))}function be(l,a){return[0,1,2].map(t=>l[t]*a[0]+l[t+4]*a[1]+l[t+8]*a[2]+l[t+12])}const Re=(l,a)=>[l[1]*a[2]-l[2]*a[1],l[2]*a[0]-l[0]*a[2],l[0]*a[1]-l[1]*a[0]],tl=(l,a)=>l.map((t,r)=>t-a[r]);function ke(l){const a=Math.hypot(...l);return a>1e-15?l.map(t=>t/a):[0,0,1]}function Fe(l,a,t,r){const[n,e,f,s]=t,u=f-n+1,c=s-e+1;for(let d=0;d<a[2];d++)for(let S=e;S<=s;S++)l.set(r.subarray(u*(S-e+c*d),u*(S-e+c*d)+u),n+a[0]*(S+a[1]*d))}const ll=`#version 300 es
precision highp float;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
uniform mat4 affine, mvp;
out vec3 worldNormal;
void main(){worldNormal=normal;gl_Position=mvp*affine*vec4(position,1.0);}`,il=`#version 300 es
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
}`;class rl{constructor(a,t,r,n){this.canvas=a,this.overlay=t,this.positions=r.positions,this.indices=r.indices,this.worldPositions=new Float32Array(r.positions.length);for(let b=0;b<r.positions.length;b+=3)this.worldPositions.set(be(n,r.positions.subarray(b,b+3)),b);this.normals=r.normals,this.affine=n;const e=a.getContext("webgl2",{antialias:!0,alpha:!1});if(!e)throw new Error("Sculpting requires WebGL2.");this.gl=e;const f=(b,g)=>{const v=e.createShader(b);if(e.shaderSource(v,g),e.compileShader(v),!e.getShaderParameter(v,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(v));return v},s=f(e.VERTEX_SHADER,ll),u=f(e.FRAGMENT_SHADER,il),c=e.createProgram();if(e.attachShader(c,s),e.attachShader(c,u),e.linkProgram(c),!e.getProgramParameter(c,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(c));e.deleteShader(s),e.deleteShader(u),this.program=c,this.uniforms=Object.fromEntries(["affine","mvp","picking","eyeDirection"].map(b=>[b,e.getUniformLocation(c,b)])),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),this.positionBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.positionBuffer),e.bufferData(e.ARRAY_BUFFER,r.positions,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,0,0),this.normalBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.normalBuffer),e.bufferData(e.ARRAY_BUFFER,r.normals,e.DYNAMIC_DRAW),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,0,0),this.indexBuffer=e.createBuffer(),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r.indices,e.STATIC_DRAW),this.count=r.indices.length;const d=[1/0,1/0,1/0],S=[-1/0,-1/0,-1/0];for(let b=0;b<r.positions.length;b+=3){const g=be(n,r.positions.subarray(b,b+3));for(let v=0;v<3;v++)d[v]=Math.min(d[v],g[v]),S[v]=Math.max(S[v],g[v])}this.center=d.map((b,g)=>(b+S[g])/2),this.target=this.center.slice(),this.scale=Math.hypot(...tl(S,d))*.6,this.initialScale=this.scale,this.orientation=Ae(),this.crosshair=null,this.crosshairOpacity=.45,this.cursor=null,this.framebuffer=e.createFramebuffer(),this.textures=[e.createTexture(),e.createTexture()],this.depth=e.createRenderbuffer(),this.observer=new ResizeObserver(()=>this.draw()),this.observer.observe(a),this.draw()}matrices(){this.direction=Array.from(Be(Ia(),[0,0,1],this.orientation));const a=Be(Ia(),[0,1,0],this.orientation),t=this.target.map((s,u)=>s+this.direction[u]*this.initialScale*4),r=Ot($a(),t,this.target,a),n=this.canvas.width/this.canvas.height,e=this.scale,f=Lt($a(),-e*n,e*n,-e,e,.001*this.initialScale,10*this.initialScale);this.mvp=Ye($a(),f,r),this.inverseMVP=Ue($a(),this.mvp)}resize(){const a=Math.min(2,window.devicePixelRatio||1),t=Math.max(1,Math.round(this.canvas.clientWidth*a)),r=Math.max(1,Math.round(this.canvas.clientHeight*a));if(this.canvas.width===t&&this.canvas.height===r)return;this.canvas.width=t,this.canvas.height=r,this.overlay.width=t,this.overlay.height=r;const n=this.gl;if(n.bindFramebuffer(n.FRAMEBUFFER,this.framebuffer),this.textures.forEach((e,f)=>{n.bindTexture(n.TEXTURE_2D,e),n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,t,r,0,n.RGBA,n.UNSIGNED_BYTE,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+f,n.TEXTURE_2D,e,0)}),n.bindRenderbuffer(n.RENDERBUFFER,this.depth),n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_COMPONENT24,t,r),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,this.depth),n.checkFramebufferStatus(n.FRAMEBUFFER)!==n.FRAMEBUFFER_COMPLETE)throw new Error("Could not allocate the surface picking buffer.");n.bindFramebuffer(n.FRAMEBUFFER,null)}render(a){const t=this.gl;t.useProgram(this.program),t.bindVertexArray(this.vao),t.viewport(0,0,this.canvas.width,this.canvas.height),t.enable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.BLEND),t.uniformMatrix4fv(this.uniforms.affine,!1,this.affine),t.uniformMatrix4fv(this.uniforms.mvp,!1,this.mvp),t.uniform1i(this.uniforms.picking,a?1:0),t.uniform3fv(this.uniforms.eyeDirection,this.direction),t.drawElements(t.TRIANGLES,this.count,t.UNSIGNED_INT,0)}draw(){if(this.disposed)return;this.resize(),this.matrices();const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,null),a.disable(a.SCISSOR_TEST),a.clearColor(.035,.04,.045,1),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),this.render(!1),this.drawCursor()}project(a){const t=ie(Ia(),a,this.mvp);return[(t[0]+1)*this.overlay.width/2,(1-t[1])*this.overlay.height/2]}drawCursor(){var c;(c=this.onCursorChange)==null||c.call(this,this.cursor);const a=this.overlay.getContext("2d");if(a.clearRect(0,0,this.overlay.width,this.overlay.height),this.drawCrosshair(a),!this.cursor)return;const{point:t,normal:r,radius:n,origin:e}=this.cursor,f=ke(Re(r,Math.abs(r[2])<.9?[0,0,1]:[0,1,0])),s=Re(r,f),u=this.overlay.width/this.canvas.clientWidth;if(a.strokeStyle=this.cursor.tool==="scoop"?"#ff9876":this.cursor.tool==="smooth"?"#99e8b5":"#f5df42",this.cursor.tool==="scoop"){const d=this.project(t),S=n*this.overlay.height/(2*this.scale);a.lineWidth=1.5*u,a.beginPath(),a.arc(...d,S,0,Math.PI*2),a.stroke(),a.setLineDash([3*u,3*u])}a.lineWidth=1.7*u;for(const d of[1,.12]){a.beginPath();for(let S=0;S<=96;S++){const b=S*Math.PI/48,g=t.map((y,C)=>y+n*d*(f[C]*Math.cos(b)+s[C]*Math.sin(b))),v=this.project(g);S?a.lineTo(...v):a.moveTo(...v)}a.stroke()}a.setLineDash([]),this.cursor.locked&&this.crosshair&&(a.save(),a.globalAlpha=this.crosshairOpacity,a.setLineDash([2*u,4*u]),a.beginPath(),a.moveTo(...this.project(this.crosshair)),a.lineTo(...this.project(t)),a.stroke(),a.restore()),e&&(a.setLineDash([4*u,4*u]),a.beginPath(),a.moveTo(...this.project(e)),a.lineTo(...this.project(t)),a.stroke(),a.setLineDash([]))}drawCrosshair(a){if(!this.crosshair||this.crosshairOpacity===0)return;const t=this.overlay.width/Math.max(1,this.canvas.clientWidth),r=this.project(this.crosshair),n=this.scale*.09;a.save(),a.globalAlpha=this.crosshairOpacity,a.strokeStyle="#65dcff",a.lineWidth=1.4*t,a.shadowColor="#000",a.shadowBlur=3*t,a.setLineDash([4*t,3*t]);for(let e=0;e<3;e++){const f=this.crosshair.slice(),s=this.crosshair.slice();f[e]-=n,s[e]+=n,a.beginPath();const u=this.project(f),c=this.project(s);for(const d of[u,c]){const S=Math.hypot(d[0]-r[0],d[1]-r[1]);S<=5*t||(a.moveTo(...d),a.lineTo(r[0]+(d[0]-r[0])*5*t/S,r[1]+(d[1]-r[1])*5*t/S))}a.stroke()}a.setLineDash([]),a.beginPath(),a.arc(...r,4*t,0,Math.PI*2),a.stroke(),a.restore()}orbit(a,t){this.orientation=al(this.orientation,a,t),this.cursor=null,this.draw()}dragOrbit(a,t){const r=this.canvas.getBoundingClientRect();this.orientation=el(this.orientation,a.map((n,e)=>n-(e?r.top:r.left)),t.map((n,e)=>n-(e?r.top:r.left)),r.width,r.height),this.cursor=null,this.draw()}resetView(){this.target=this.center.slice(),this.scale=this.initialScale,this.orientation=Ae(),this.cursor=null,this.draw()}pick(a,t){this.resize(),this.matrices();const r=this.gl,n=this.canvas.getBoundingClientRect(),e=Math.floor((a-n.left)*this.canvas.width/n.width),f=this.canvas.height-1-Math.floor((t-n.top)*this.canvas.height/n.height);if(e<0||f<0||e>=this.canvas.width||f>=this.canvas.height)return null;r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),r.drawBuffers([r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),r.enable(r.SCISSOR_TEST),r.scissor(e,f,1,1),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),this.render(!0);const s=new Uint8Array(4),u=new Uint8Array(4);if(r.readBuffer(r.COLOR_ATTACHMENT0),r.readPixels(e,f,1,1,r.RGBA,r.UNSIGNED_BYTE,s),r.readBuffer(r.COLOR_ATTACHMENT1),r.readPixels(e,f,1,1,r.RGBA,r.UNSIGNED_BYTE,u),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.FRAMEBUFFER,null),!s[3])return null;const c=(s[0]+256*s[1]+65536*s[2]-1)/16777214;return{point:Array.from(ie(Ia(),[(e+.5)/this.canvas.width*2-1,(f+.5)/this.canvas.height*2-1,c*2-1],this.inverseMVP)),normal:ke([u[0]/255*2-1,u[1]/255*2-1,u[2]/255*2-1])}}patch(a){if(!a)return;this.revision=(this.revision||0)+1;const t=this.gl;if(t.bindVertexArray(this.vao),a.vertexLength>this.positions.length){for(const[n,e]of[["positions",this.positionBuffer],["normals",this.normalBuffer]]){const f=new Float32Array(a.vertexLength);f.set(this[n]),this[n]=f,t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,f,t.DYNAMIC_DRAW)}const r=new Float32Array(a.vertexLength);r.set(this.worldPositions),this.worldPositions=r}if(a.indexLength>this.indices.length){const r=new Uint32Array(a.indexLength);r.set(this.indices),this.indices=r,t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,r,t.DYNAMIC_DRAW),this.count=r.length}if(a.triangleIds){t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.triangleIds.forEach((r,n)=>this.indices.set(a.indices.subarray(n*3,n*3+3),r*3));for(let r=0;r<a.triangleIds.length;){let n=r+1;for(;n<a.triangleIds.length&&a.triangleIds[n]===a.triangleIds[n-1]+1;)n++;t.bufferSubData(t.ELEMENT_ARRAY_BUFFER,a.triangleIds[r]*12,a.indices.subarray(r*3,n*3)),r=n}}a.positions&&a.ids.forEach((r,n)=>this.worldPositions.set(be(this.affine,a.positions.subarray(n*3,n*3+3)),r*3));for(const[r,n,e]of[[a.positions,this.positions,this.positionBuffer],[a.normals,this.normals,this.normalBuffer]])if(r){a.ids.forEach((f,s)=>n.set(r.subarray(s*3,s*3+3),f*3)),t.bindBuffer(t.ARRAY_BUFFER,e);for(let f=0;f<a.ids.length;){let s=f+1;for(;s<a.ids.length&&a.ids[s]===a.ids[s-1]+1;)s++;t.bufferSubData(t.ARRAY_BUFFER,a.ids[f]*12,r.subarray(f*3,s*3)),f=s}}}nearest(a){return Qt(a,this.worldPositions,this.indices,this.normals)}screenPoint(a,t,r){const n=this.canvas.getBoundingClientRect(),e=ie(Ia(),r,this.mvp);return Array.from(ie(Ia(),[(a-n.left)/n.width*2-1,1-(t-n.top)/n.height*2,e[2]],this.inverseMVP))}focus(a){var e;const t=this.nearest(a);if(!t)return null;const r=t.point,n=t.normal;return this.target=r,this.orientation=at(n),this.cursor={point:r,normal:n,radius:((e=this.cursor)==null?void 0:e.radius)||this.initialScale*.1},this.draw(),{point:r,normal:n}}dispose(){this.disposed=!0,this.observer.disconnect();const a=this.gl;for(const t of[this.positionBuffer,this.normalBuffer,this.indexBuffer])a.deleteBuffer(t);this.textures.forEach(t=>a.deleteTexture(t)),a.deleteRenderbuffer(this.depth),a.deleteFramebuffer(this.framebuffer),a.deleteVertexArray(this.vao),a.deleteProgram(this.program)}}function nl({nv:l,getState:a,prepare:t,onPatch:r,onError:n}){const e=document.getElementById("sculptBtn"),f=document.getElementById("canvas-container"),s=document.createElement("section");s.id="sculpt-panel",s.hidden=!0,s.innerHTML='<div class="sculpt-bar"><strong>Sculpt mask</strong><div class="sculpt-modes" role="group" aria-label="Surface interaction"><button type="button" data-mode="grab" aria-pressed="true">Grab</button><button type="button" data-mode="smooth" aria-pressed="false">Smooth</button><button type="button" data-mode="scoop" aria-pressed="false">Scoop</button><button type="button" data-mode="rotate" aria-pressed="false">Rotate</button></div><button type="button" data-action="undo" title="Undo (Ctrl/⌘ Z)" disabled>Undo</button><button type="button" data-action="redo" title="Redo (Ctrl/⌘ Shift Z)" disabled>Redo</button><button type="button" data-action="done">Done</button></div><div class="sculpt-size"><label>Size <input aria-label="Brush radius" type="range" min="1" max="100" value="35"/><output></output></label><button type="button" data-action="focus" title="Bring the surface nearest the slice crosshair forward">Focus slice</button><button type="button" data-action="reset">Reset view</button></div><div class="sculpt-target"><label><input type="checkbox" data-control="lock"/> Lock to slice crosshair</label><label>Crosshair <input type="range" aria-label="Crosshair opacity" min="0" max="100" value="45"/><output data-opacity>45%</output></label><span class="sculpt-anchor"></span></div><div class="sculpt-viewport"><canvas class="sculpt-surface" aria-label="Brain mask sculpting surface" tabindex="0"></canvas><canvas class="sculpt-cursor" aria-hidden="true"></canvas></div><p class="sculpt-help">Drag the ring along its normal. Facing you: drag up to pull, down to push. Two-finger scroll or right-drag rotates. Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.</p><p class="sculpt-status" role="status" aria-live="polite"></p>',f.append(s);const u=s.querySelector(".sculpt-surface"),c=s.querySelector(".sculpt-cursor"),d=s.querySelector("input"),S=s.querySelector("output"),b=s.querySelector(".sculpt-status"),g=s.querySelector(".sculpt-help"),v=s.querySelector('[data-control="lock"]'),y=s.querySelector('[aria-label="Crosshair opacity"]'),C=s.querySelector(".sculpt-anchor");let w=null,G=null,k=null;y.oninput=()=>{s.querySelector("[data-opacity]").textContent=`${y.value}%`,x&&(x.crosshairOpacity=Number(y.value)/100,x.drawCursor())};const I=()=>{if(!(!x||!L||E)){if(G=null,v.checked&&W!=="rotate"){const o=x.crosshair,h=o.join(",")+":"+(x.revision||0);((k==null?void 0:k.renderer)!==x||k.key!==h)&&(k={renderer:x,key:h,hit:x.nearest(o)});const M=k.hit;G=W==="scoop"?{point:o.slice(),normal:(M==null?void 0:M.normal)||x.direction}:M,C.textContent=W==="scoop"?"Scoop center is the exact slice point.":M?`Surface anchor ${Number(M.distance.toPrecision(2))} mm from slice point.`:"No surface remains; undo to restore it.",x.cursor=G?La(Ta({},G),{radius:ta,tool:W,locked:!0}):null}else C.textContent="",x.cursor=null;s.dataset.anchor=(G==null?void 0:G.point.join(","))||"",x.drawCursor()}};v.onchange=I;const z=Object.fromEntries([...s.querySelectorAll("[data-action]")].map(o=>[o.dataset.action,o])),K=["modelRunButton","sampleSelect","maskToggle","drawBtn","modelSelect"],i=new Map;let A=null,x=null,m=new Map,p=0,L=!1,E=!1,W="grab",B=null,D=0,N=null,Y=null,ta=1,Q={undo:0,redo:0},oa=0,ba=null;const Sa=()=>{var o;e.disabled=!a()||!L&&((o=a())==null?void 0:o.running)||E,e.setAttribute("aria-pressed",String(L)),e.title=a()?"Sculpt the brain mask":"Run Skull-strip first to enable sculpting",z.undo.disabled=E||!Q.undo,z.redo.disabled=E||!Q.redo,z.done.disabled=E,z.focus.disabled=E,z.reset.disabled=E,d.disabled=E,v.disabled=E,s.querySelectorAll("[data-mode]").forEach(h=>h.disabled=E);for(const h of["saveBtn","saveStatsBtn"]){const M=document.getElementById(h);M&&(M.disabled=L&&E)}},X=o=>{E=o,Sa()},ea=(o,h={})=>new Promise((M,R)=>{if(!A){R(new Error("Editing session was closed."));return}const O=++p;m.set(O,{resolve:M,reject:R}),A.postMessage(Ta({id:O,type:o},h))}),da=()=>{ta=Y.minRadius+(Y.maxRadius-Y.minRadius)*(Number(d.value)-1)/99,S.textContent=`${Number(ta.toPrecision(3))} mm`,x!=null&&x.cursor&&(x.cursor.radius=ta,x.drawCursor())};d.oninput=da;function sa(o){for(const h of K){const M=document.getElementById(h);M&&(o?(i.set(h,M.disabled),M.disabled=!0):i.has(h)&&(M.disabled=i.get(h)))}o||i.clear()}const ua=()=>{!L||!x||(x.crosshair=Array.from(l.frac2mm(l.scene.crosshairPos)).slice(0,3),s.dataset.crosshair=x.crosshair.join(","),I(),x.drawCursor())},ga=l.onLocationChange;l.onLocationChange=function(o){ga==null||ga.call(l,o),ua()};const pa=o=>{l.scene.crosshairPos=Array.from(l.mm2frac(o)).map(h=>Math.max(0,Math.min(1,h))),l.createOnLocationChange()},ca=o=>{o&&(x.patch(o),Fe(Y.mask,Y.dims,o.rect,o.data),r(o),ba.patch(o))},Ua=o=>{b.textContent=o.message||String(o),console.error("Sculpt:",o)};function za(){return j(this,null,function*(){var h;if(L||!a())return;if((h=l.drawBitmap)!=null&&h.some(M=>M!==0)){n(new Error("Apply or clear the current drawing before opening Sculpt."));return}L=!0,s.hidden=!1,f.classList.add("sculpting"),sa(!0),X(!0),N={sliceType:l.opts.sliceType,multiplanarForceRender:l.opts.multiplanarForceRender,multiplanarShowRender:l.opts.multiplanarShowRender},l.setDrawingEnabled(!1),l.closeDrawing(),l.opts.multiplanarForceRender=!1,l.opts.multiplanarShowRender=0,l.setSliceType(l.sliceTypeMultiplanar),l.resizeListener();const o=oa;try{if(yield t(),o!==oa)return;if(ba=new Kt(l),w=new Zt(l),A)ua(),x.draw(),b.textContent="Ready · corrections and undo history retained.";else{b.textContent="Building the editable surface…";const M=a(),R=new Float32Array(16);for(let ra=0;ra<4;ra++)for(let P=0;P<4;P++)R[P*4+ra]=M.affine[ra][P];const O=Ue($a(),R);if(!O)throw new Error("Image geometry has a singular affine.");const xa=[0,4,8].map(ra=>Math.hypot(R[ra],R[ra+1],R[ra+2]));Y=La(Ta({},M),{affine:R,inverse:O,minRadius:Math.min(...xa)*2,maxRadius:Math.min(...M.dims.map((ra,P)=>ra*xa[P]))*.16}),Y.maxRadius=Math.max(Y.minRadius*2,Y.maxRadius),da(),A=new Worker(new URL(""+new URL("worker-v1mX1G6D.js",import.meta.url).href,import.meta.url),{type:"module"}),A.onmessage=({data:ra})=>{const P=m.get(ra.id);P&&(m.delete(ra.id),ra.error?P.reject(new Error(ra.error)):(Q=ra.history,P.resolve(ra)))},A.onerror=ra=>{for(const P of m.values())P.reject(new Error(ra.message||"Surface worker failed."));m.clear()};const{result:ka,ms:U}=yield ea("init",{mask:M.mask,dims:M.dims,affine:R,inverse:O});if(o!==oa)return;x=new rl(u,c,ka,R),x.crosshairOpacity=Number(y.value)/100,x.onCursorChange=ra=>w==null?void 0:w.set(ra),ua(),s.dataset.triangles=String(ka.indices.length/3),s.dataset.buildMs=String(Math.round(U)),b.textContent="Ready · hover over the surface to place the grab."}}catch(M){o===oa&&(Ua(M),_a(),n(M))}finally{o===oa&&(X(!1),I())}})}function Pa(){!L||E||(L=!1,B=null,w==null||w.close(),w=null,ba==null||ba.close(),ba=null,cancelAnimationFrame(D),s.hidden=!0,f.classList.remove("sculpting"),N&&Object.assign(l.opts,N),sa(!1),l.resizeListener(),Sa())}function _a(){oa++,E=!1,Pa(),A==null||A.terminate(),A=null,x==null||x.dispose(),x=null,Y=null,Q={undo:0,redo:0};for(const o of m.values())o.reject(new Error("Editing session was replaced."));m.clear(),Sa()}e.onclick=()=>{L?Pa():za()},z.done.onclick=Pa,s.querySelectorAll("[data-mode]").forEach(o=>o.onclick=()=>{W=o.dataset.mode,g.textContent=(W==="smooth"?"Smooth: click to soften the patch; drag upward for more. ":W==="grab"?"Grab: drag along the normal; facing you, up pulls and down pushes. ":W==="scoop"?"Scoop: click to erase a sphere; drag to sweep at fixed depth. Lock to slices for an exact center. ":"Drag to freely rotate. ")+"Two-finger scroll or right-drag rotates; Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.",s.querySelectorAll("[data-mode]").forEach(h=>h.setAttribute("aria-pressed",String(h===o))),u.style.cursor=W==="rotate"?"grab":"crosshair",x.cursor=null,I(),x.drawCursor()});function la(o){return j(this,null,function*(){if(E||!x)return;X(!0);const h=oa;try{const{result:M}=yield ea(o);if(h!==oa)return;ca(M),x.draw(),b.textContent=o==="undo"?"Correction undone.":"Correction restored."}catch(M){h===oa&&Ua(M)}finally{h===oa&&(X(!1),I())}})}z.undo.onclick=()=>la("undo"),z.redo.onclick=()=>la("redo");const ma=()=>{if(!L||E||!x)return;const o=x.focus(Array.from(l.frac2mm(l.scene.crosshairPos)));if(o)return x.cursor.radius=ta,v.checked&&I(),x.drawCursor(),b.textContent="Nearest surface to the slice crosshair highlighted.",o};z.focus.onclick=ma,z.reset.onclick=()=>{x==null||x.resetView(),I()},l.gl.canvas.addEventListener("dblclick",()=>{L&&requestAnimationFrame(ma)});for(const o of["drop","dragover"])l.gl.canvas.addEventListener(o,h=>{L&&(h.preventDefault(),h.stopImmediatePropagation(),b.textContent="Choose Done before loading another image.")},!0);u.addEventListener("contextmenu",o=>o.preventDefault()),u.addEventListener("webglcontextlost",o=>j(null,null,function*(){o.preventDefault(),oa++,X(!0);try{if((B==null?void 0:B.kind)==="grab"){const{result:h}=yield ea("cancel");h&&Y&&(Fe(Y.mask,Y.dims,h.rect,h.data),r(h),ba==null||ba.patch(h))}}catch(h){Ua(h)}finally{_a(),n(new Error("The sculpting graphics context was lost. Accepted corrections are retained; reopen Sculpt after graphics recovers."))}})),u.addEventListener("wheel",o=>{if(o.preventDefault(),!x||E)return;const h=o.deltaMode===1?16:o.deltaMode===2?u.clientHeight:1,M=o.deltaX*h,R=o.deltaY*h;o.altKey||o.metaKey||o.ctrlKey?(x.scale=Math.max(x.initialScale*.15,Math.min(x.initialScale*3,x.scale*Math.exp(R*.001))),x.draw()):x.orbit(M,R),v.checked&&I()},{passive:!1});const Ra=o=>{if(!x||E)return;if(v.checked&&W!=="rotate"){x.cursor=G?La(Ta({},G),{radius:ta,tool:W,locked:!0}):null,x.drawCursor();return}const h=W!=="rotate"?x.pick(o.clientX,o.clientY):null;x.cursor=h?La(Ta({},h),{radius:ta,tool:W}):null,x.drawCursor()};u.addEventListener("pointerleave",()=>{!B&&x&&!v.checked&&(x.cursor=null,x.drawCursor())}),u.addEventListener("pointerdown",o=>j(null,null,function*(){if(!x||E||B||![0,2].includes(o.button))return;if(o.preventDefault(),u.focus(),u.setPointerCapture(o.pointerId),W==="rotate"||o.button===2||o.shiftKey){B={kind:"rotate",id:o.pointerId,x:o.clientX,y:o.clientY},x.cursor=null,x.drawCursor();return}const h=v.checked?G:x.pick(o.clientX,o.clientY);if(!h)return;const M=x.project(h.point),R=x.project(h.point.map((_,T)=>_+h.normal[T])),O=u.width/u.clientWidth,xa=(R[0]-M[0])/O,ka=(R[1]-M[1])/O,U=Math.hypot(xa,ka),ra=2*x.scale/u.clientHeight,P=U*ra>.2?[xa/U,ka/U]:[0,-1],Ca={kind:"grab",tool:W,id:o.pointerId,hit:h,x:o.clientX,y:o.clientY,direction:P,worldPerPixel:ra,wanted:W==="smooth"?.35:0,shown:0,points:W==="scoop"?[h.point.slice()]:[],screenStart:x.screenPoint(o.clientX,o.clientY,h.point),sliceOrigin:x.crosshair.slice(),starting:!0,running:!1,ended:!1,cancelled:!1,generation:oa};B=Ca,X(!0),x.cursor=La(Ta({},h),{radius:ta,tool:Ca.tool,origin:h.point}),v.checked||pa(h.point),l.drawScene(),x.drawCursor(),b.textContent=Ca.tool==="smooth"?"Softening this patch · drag upward for more; Escape cancels.":Ca.tool==="scoop"?"Scoop removes the orange sphere · drag to sweep; Escape cancels.":"Drag to move the boundary · Escape cancels this grab.";try{const{result:_,ms:T}=yield ea("begin",{center:h.point,normal:h.normal,tool:Ca.tool,radius:ta});s.dataset.beginMs=String(Math.round(T)),Ca.max=Ca.tool==="smooth"?1:_.maxDistance,Ca.starting=!1,ha(Ca)}catch(_){Ca.generation===oa&&(Ua(_),B=null,X(!1),I())}}));function ha(o){return j(this,null,function*(){if(!(o.starting||o.running||o.generation!==oa)){o.running=!0;try{for(;!o.cancelled&&(o.tool==="scoop"?o.points.length:o.wanted!==o.shown);){if(o.tool==="scoop"){const U=o.points.splice(0,64),ra=performance.now(),{result:P,ms:Ca}=yield ea("scoop",{points:U});if(o.generation!==oa)return;ca(P);const _=U[U.length-1];pa(_),x.cursor={point:_,normal:o.hit.normal,radius:ta,tool:"scoop",locked:v.checked},x.draw(),s.dataset.previewMs=String(Math.round(performance.now()-ra)),s.dataset.workerMs=String(Math.round(Ca)),b.textContent="Scooping · release to keep; Escape restores the whole stroke.";continue}const h=Math.max(o.tool==="smooth"?0:-o.max,Math.min(o.max,o.wanted));o.wanted=h;const M=performance.now(),{result:R,ms:O}=yield ea(o.tool==="smooth"?"smooth":"move",o.tool==="smooth"?{amount:h}:{distance:h});if(o.generation!==oa)return;o.shown=h;const xa=o.tool==="smooth"?o.hit.point:o.hit.point.map((U,ra)=>U+o.hit.normal[ra]*h);pa(xa),ca(R),x.cursor={point:xa,normal:o.hit.normal,tool:o.tool,radius:ta,origin:o.hit.point},x.draw();const ka=performance.now()-M;b.textContent=o.tool==="smooth"?"Smoothing this patch · release to keep, Escape to cancel.":`${h>=0?"+":""}${Number(h.toPrecision(3))} mm${Math.abs(h)>=o.max?" · release and grab again to move farther":""}`,s.dataset.previewMs=String(Math.round(ka)),s.dataset.workerMs=String(Math.round(O))}if(o.ended){const{result:h,ms:M}=yield ea(o.cancelled?"cancel":"commit");if(s.dataset.commitMs=String(Math.round(M)),o.generation!==oa)return;o.cancelled?(ca(h),pa(o.sliceOrigin),l.drawScene(),x.cursor=La(Ta({},o.hit),{radius:ta,tool:o.tool}),b.textContent="Correction cancelled."):b.textContent="Correction applied · inspect the slices, then rotate or grab again.",x.draw(),B=null,X(!1),I()}}catch(h){if(o.generation===oa){try{const{result:M}=yield ea("cancel");ca(M),pa(o.sliceOrigin),l.drawScene(),x.draw()}catch(M){_a(),n(M)}B=null,X(!1),I(),Ua(h)}}finally{o.running=!1}}})}u.addEventListener("pointermove",o=>{const h=B;if((h==null?void 0:h.id)===o.pointerId){if(h.kind==="rotate")x.dragOrbit([h.x,h.y],[o.clientX,o.clientY]),v.checked&&I(),h.x=o.clientX,h.y=o.clientY;else if(!h.ended){if(h.tool==="scoop"){const M=x.screenPoint(o.clientX,o.clientY,h.hit.point),R=h.hit.point.map((O,xa)=>O+M[xa]-h.screenStart[xa]);h.points.push(R),x.cursor={point:R,normal:h.hit.normal,radius:ta,tool:"scoop"},x.drawCursor(),ha(h);return}h.wanted=h.tool==="smooth"?.35+(h.y-o.clientY)/120:((o.clientX-h.x)*h.direction[0]+(o.clientY-h.y)*h.direction[1])*h.worldPerPixel,ha(h)}return}cancelAnimationFrame(D),D=requestAnimationFrame(()=>Ra(o))});const ya=(o,h=!1)=>{const M=B;if(!(!M||M.id!==o.pointerId)){if(M.kind==="rotate"){B=null;return}M.ended||(M.ended=!0,M.cancelled=h,ha(M))}};return u.addEventListener("pointerup",o=>ya(o)),u.addEventListener("pointercancel",o=>ya(o,!0)),u.addEventListener("lostpointercapture",o=>ya(o,!0)),window.addEventListener("keydown",o=>{!L||/INPUT|TEXTAREA|SELECT/.test(o.target.tagName)||document.querySelector("dialog[open]")||(o.key==="Escape"&&(B==null?void 0:B.kind)==="grab"?(o.preventDefault(),B.cancelled=!0,B.ended=!0,ha(B)):(o.ctrlKey||o.metaKey)&&o.key.toLowerCase()==="z"?(o.preventDefault(),la(o.shiftKey?"redo":"undo")):(o.ctrlKey||o.metaKey)&&o.key.toLowerCase()==="y"&&(o.preventDefault(),la("redo")))}),Sa(),{invalidate:_a,updateAvailability:Sa,get active(){return L},get busy(){return E}}}const sl={batchSize:1,numOfChan:1,isColorEnable:!0,isAutoColors:!0,bgLabelValue:0,drawBoundingVolume:!1,isGPU:!0,isBrainCropMaskBased:!0,showPhase1Output:!1,isPostProcessEnable:!0,fillSuppressedWithNeighborLabel:!1,diagnoseEnclosedComponents:!1,isContoursViewEnable:!1,browserArrayBufferMaxZDim:30,telemetryFlag:!1,chartXaxisStepPercent:10,uiSampleName:"Brainchomp sample",atlasSelectedColorTable:"Fire"},ul={path:"/models/rodent/model.json",webgpu_safetensor:"./models/rodent/model.safetensors",webgpu_runner:"rodent",forceFP32:!1,webgpuStorageSize:536870912,numClasses:2,preModelId:null,preModelPostProcess:!1,isBatchOverlapEnable:!1,numOverlapBatches:0,enableTranspose:!0,enableCrop:!1,cropPadding:0,autoThreshold:0,enableQuantileNorm:!0,filterOutWithPreMask:!1,enableSeqConv:!0,textureSize:0,isPostProcessEnable:!0,returnMaskForExtraction:!0,maskOpeningRadius:4,inferenceDelay:100,warning:null},Na=[La(Ta({},ul),{id:1,type:"Brain_Extraction",modelName:"Skull-strip",description:"Extract the rodent brain and save the input intensities with non-brain voxels set to zero."})];class et{idx(a,t,r,n){return r*n[0]*n[1]+t*n[0]+a}check_previous_slice(a,t,r,n,e,f,s,u,c,d){let S=0;if(!e)return 0;const b=a[this.idx(r,n,e,f)];if(s>=6){const g=this.idx(r,n,e-1,f);b===a[g]&&(c[S++]=t[g])}if(s>=18){if(r){const g=this.idx(r-1,n,e-1,f);b===a[g]&&(c[S++]=t[g])}if(n){const g=this.idx(r,n-1,e-1,f);b===a[g]&&(c[S++]=t[g])}if(r<f[0]-1){const g=this.idx(r+1,n,e-1,f);b===a[g]&&(c[S++]=t[g])}if(n<f[1]-1){const g=this.idx(r,n+1,e-1,f);b===a[g]&&(c[S++]=t[g])}}if(s===26){if(r&&n){const g=this.idx(r-1,n-1,e-1,f);b===a[g]&&(c[S++]=t[g])}if(r<f[0]-1&&n){const g=this.idx(r+1,n-1,e-1,f);b===a[g]&&(c[S++]=t[g])}if(r&&n<f[1]-1){const g=this.idx(r-1,n+1,e-1,f);b===a[g]&&(c[S++]=t[g])}if(r<f[0]-1&&n<f[1]-1){const g=this.idx(r+1,n+1,e-1,f);b===a[g]&&(c[S++]=t[g])}}return S?(this.fill_tratab(u,c,S,d),c[0]):0}do_initial_labelling(a,t,r){const n=new Uint32Array(32),e=new Uint32Array(32);let f=1;const s=8192;let u=s,c=new Uint32Array(u).fill(0);const d=new Uint32Array(t[0]*t[1]*t[2]).fill(0),S=new Uint32Array(27);for(let b=0;b<t[2];b++)for(let g=0;g<t[1];g++)for(let v=0;v<t[0];v++){let y=0;const C=a[this.idx(v,g,b,t)];if(C!==0){if(S[0]=this.check_previous_slice(a,d,v,g,b,t,r,c,n,e),S[0]&&(y+=1),r>=6){if(v){const w=this.idx(v-1,g,b,t);C===a[w]&&(S[y++]=d[w])}if(g){const w=this.idx(v,g-1,b,t);C===a[w]&&(S[y++]=d[w])}}if(r>=18){if(g&&v){const w=this.idx(v-1,g-1,b,t);C===a[w]&&(S[y++]=d[w])}if(g&&v<t[0]-1){const w=this.idx(v+1,g-1,b,t);C===a[w]&&(S[y++]=d[w])}}if(y)d[this.idx(v,g,b,t)]=S[0],this.fill_tratab(c,S,y,e);else{if(d[this.idx(v,g,b,t)]=f,f>=u){u+=s;const w=new Uint32Array(u);w.set(c),c=w}c[f-1]=f,f++}}}for(let b=0;b<f-1;b++){let g=b;for(;c[g]!==g+1;)g=c[g]-1;c[b]=g+1}return[f-1,c,d]}fill_tratab(a,t,r,n){let f=2147483647;for(let s=0;s<r;s++){let u=t[s];for(;a[u-1]!==u;)u=a[u-1];n[s]=u,f=Math.min(f,u)}for(let s=0;s<r;s++)a[n[s]-1]=f}translate_labels(a,t,r,n){const e=t[0]*t[1]*t[2];let f=0;const s=new Uint32Array(e).fill(0);for(let d=0;d<n;d++)f=Math.max(f,r[d]);const u=new Uint32Array(f).fill(0);let c=0;for(let d=0;d<e;d++)a[d]&&(u[r[a[d]-1]-1]||(c+=1,u[r[a[d]-1]-1]=c),s[d]=u[r[a[d]-1]-1]);return[c,s]}neighbor_winners(a,t,r,n){const e=t[0],f=t[1],s=t[2],u=e*f,c=new Map,d=(b,g)=>{let v=c.get(b);v||(v=new Map,c.set(b,v)),v.set(g,(v.get(g)||0)+1)};for(let b=0;b<s;b++)for(let g=0;g<f;g++)for(let v=0;v<e;v++){const y=b*u+g*e+v,C=a[y];if(C===0||r[C])continue;let w;v>0&&(w=r[a[y-1]])&&d(C,w),v<e-1&&(w=r[a[y+1]])&&d(C,w),g>0&&(w=r[a[y-e]])&&d(C,w),g<f-1&&(w=r[a[y+e]])&&d(C,w),b>0&&(w=r[a[y-u]])&&d(C,w),b<s-1&&(w=r[a[y+u]])&&d(C,w)}const S=new Uint32Array(n+1).fill(0);for(const[b,g]of c){let v=0,y=0;for(const[C,w]of g)(w>y||w===y&&(v===0||C<v))&&(y=w,v=C);S[b]=v}return S}finalize_volume(a,t,r,n,e){const f=a.length,s=new Uint32Array(f).fill(0),u=e?this.neighbor_winners(a,t,r,n):null;let c=0;for(let d=0;d<f;d++){const S=a[d];if(S===0)continue;let b=r[S];!b&&u&&(b=u[S]),b&&(s[d]=b,b>c&&(c=b))}return[c,s]}diagnose_components(a,t,r,n,e={}){var x,m,p;const f=(x=e.topN)!=null?x:50,s=(m=e.minSize)!=null?m:1,u=(p=e.label)!=null?p:"diag",c=n[0],d=n[1],S=n[2],b=c*d,g=new Uint32Array(t+1),v=new Uint32Array(t+1);for(let L=0;L<a.length;L++){const E=r[L];E&&(g[E]=a[L],v[E]++)}const y=new Map,C=new Uint32Array(t+1),w=new Uint32Array(t+1),G=(L,E)=>{let W=y.get(L);W||(W=new Map,y.set(L,W)),W.set(E,(W.get(E)||0)+1)};for(let L=0;L<S;L++)for(let E=0;E<d;E++)for(let W=0;W<c;W++){const B=L*b+E*c+W,D=r[B];if(!D)continue;const N=g[D],Y=ta=>{const Q=r[ta];if(Q===D)return;w[D]++;const oa=Q?g[Q]:0;oa===0?C[D]++:oa!==N&&G(D,oa)};W>0&&Y(B-1),W<c-1&&Y(B+1),E>0&&Y(B-c),E<d-1&&Y(B+c),L>0&&Y(B-b),L<S-1&&Y(B+b)}const k=new Map,I=new Map;for(let L=1;L<=t;L++){const E=g[L];k.set(E,(k.get(E)||0)+1),(!I.has(E)||v[L]>I.get(E))&&I.set(E,v[L])}const z=[];for(let L=1;L<=t;L++){if(v[L]<s)continue;const E=g[L],W=y.get(L);let B=0,D=0,N=0;if(W)for(const[ta,Q]of W)N+=Q,Q>D&&(D=Q,B=ta);const Y=w[L]||1;z.push({comp:L,class:E,size:v[L],largestOfClass:v[L]===I.get(E)?"Y":"n",compsInClass:k.get(E),domNeighbor:B,domFracForeign:N?+(D/N).toFixed(2):0,domFracBoundary:+(D/Y).toFixed(2),bgFrac:+(C[L]/Y).toFixed(2)})}z.sort((L,E)=>E.domFracForeign-L.domFracForeign||E.size-L.size);const K=(L,E)=>{const W=E.map(D=>Math.max(D.h.length,...L.map(N=>String(N[D.k]).length))),B=D=>D.map((N,Y)=>String(N).padStart(W[Y])).join("  ");return[B(E.map(D=>D.h)),...L.map(D=>B(E.map(N=>D[N.k])))].join(`
`)},i=[{k:"comp",h:"comp"},{k:"class",h:"class"},{k:"size",h:"size"},{k:"largestOfClass",h:"lrg"},{k:"compsInClass",h:"nComp"},{k:"domNeighbor",h:"domNbr"},{k:"domFracForeign",h:"encF"},{k:"domFracBoundary",h:"encB"},{k:"bgFrac",h:"bgF"}];console.log(`[${u}] total components=${t}, distinct classes=${k.size}
[${u}] island candidates (encF≈1 + small size + lrg=n ⇒ swallowed island):
`+K(z.slice(0,f),i));const A=[...k.entries()].map(([L,E])=>({class:L,components:E,maxCompSize:I.get(L)})).sort((L,E)=>E.components-L.components);return console.log(`[${u}] per-class component counts (components=1 ⇒ fully connected):
`+K(A.slice(0,30),[{k:"class",h:"class"},{k:"components",h:"comps"},{k:"maxCompSize",h:"maxSize"}])),z}largest_original_cluster_labels(a,t,r,n=null,e=!1){const f=a.length,s=new Uint32Array(t+1).fill(0),u=new Uint32Array(t+1).fill(0);for(let c=0;c<f;c++){const d=a[c],S=r[c];s[S]=d,u[S]++}for(let c=0;c<t+1;c++){const d=s[c];for(let S=0;S<t+1;S++)S!==c&&d===s[S]&&(u[c]<u[S]||u[c]===u[S]&&c<S)&&(s[c]=0)}return this.finalize_volume(r,n,s,t,e)}filter_clusters(a,t,r,n,e=null,f=!1){const s=a.length,u=new Uint32Array(t+1).fill(0),c=new Uint32Array(t+1).fill(0);for(let b=0;b<s;b++){const g=a[b],v=r[b];v>0&&(u[v]=g,c[v]++)}const d=new Uint8Array(t+1).fill(1);for(let b=1;b<=t;b++){const g=u[b];if(n==="all"||n.has&&n.has(g)){for(let y=1;y<=t;y++)if(b!==y&&u[y]===g){if(c[y]>c[b]){d[b]=0;break}else if(c[y]===c[b]&&y<b){d[b]=0;break}}}}const S=new Uint32Array(t+1).fill(0);for(let b=1;b<=t;b++)d[b]&&(S[b]=u[b]);return this.finalize_volume(r,e,S,t,f)}filter_clusters_by_ratio(a,t,r,n,e=null,f=!1){const s=a.length,u=new Uint32Array(t+1).fill(0),c=new Uint32Array(t+1).fill(0);for(let g=0;g<s;g++){const v=r[g];v>0&&(u[v]===0&&(u[v]=a[g]),c[v]++)}const d=new Map;for(let g=1;g<=t;g++){const v=u[g],y=c[g];(!d.has(v)||y>d.get(v))&&d.set(v,y)}const S=new Uint8Array(t+1).fill(0);for(let g=1;g<=t;g++){const v=u[g],y=c[g],C=d.get(v)||0;y>=C*n&&(S[g]=1)}const b=new Uint32Array(t+1).fill(0);for(let g=1;g<=t;g++)S[g]&&(b[g]=u[g]);return this.finalize_volume(r,e,b,t,f)}bwlabel(a,t,r=26,n=!1,e=!1){const f=Date.now(),s=t[0]*t[1]*t[2],u=new Uint32Array(s).fill(0);if(![6,18,26].includes(r))return console.log("bwlabel: conn must be 6, 18 or 26."),[0,u];if(t[0]<2||t[1]<2||t[2]<1)return console.log("bwlabel: img must be 2 or 3-dimensional"),[0,u];if(n)for(let v=0;v<s;v++)a[v]!==0&&(u[v]=1);else u.set(a);let[c,d,S]=this.do_initial_labelling(u,t,r);d===void 0&&(d=new Uint32Array(0));const[b,g]=this.translate_labels(S,t,d,c);if(console.log(r+" neighbor clustering into "+b+" regions in "+(Date.now()-f)+"ms"),e){const[v,y]=this.largest_original_cluster_labels(u,b,g);return[v,y]}return[b,g]}filter_clusters_by_rank(a,t,r,n,e=0,f=null,s=!1,u=null,c=!1){const d=a.length,S=new Uint32Array(t+1).fill(0),b=new Uint32Array(t+1).fill(0),g=u!=null&&Array.isArray(f)&&f.length===3,v=g?f[0]:0,y=g?f[1]:0,C=g?new Int32Array(t+1).fill(2147483647):null,w=g?new Int32Array(t+1).fill(-1):null,G=g?new Int32Array(t+1).fill(2147483647):null,k=g?new Int32Array(t+1).fill(-1):null,I=g?new Int32Array(t+1).fill(2147483647):null,z=g?new Int32Array(t+1).fill(-1):null;for(let p=0;p<d;p++){const L=r[p];if(L>0&&(S[L]===0&&(S[L]=a[p]),b[L]++,g)){const E=p%v,W=p/v|0,B=W%y,D=W/y|0;E<C[L]&&(C[L]=E),E>w[L]&&(w[L]=E),B<G[L]&&(G[L]=B),B>k[L]&&(k[L]=B),D<I[L]&&(I[L]=D),D>z[L]&&(z[L]=D)}}let K=null,i=0;if(g){let p=-1;for(let N=1;N<=t;N++)b[N]>p&&(p=b[N],i=N);const L=Math.max(2,Math.ceil(u)+4),E=v*y,W=new Int16Array(d).fill(-1);let B=[];for(let N=0;N<d;N++)r[N]===i&&(W[N]=0,B.push(N));for(let N=1;N<=L&&B.length;N++){const Y=[];for(let ta=0;ta<B.length;ta++){const Q=B[ta],oa=Q%v,Sa=(Q/v|0)%y;oa>0&&W[Q-1]===-1&&(W[Q-1]=N,Y.push(Q-1)),oa<v-1&&W[Q+1]===-1&&(W[Q+1]=N,Y.push(Q+1)),Sa>0&&W[Q-v]===-1&&(W[Q-v]=N,Y.push(Q-v)),Sa<y-1&&W[Q+v]===-1&&(W[Q+v]=N,Y.push(Q+v)),Q-E>=0&&W[Q-E]===-1&&(W[Q-E]=N,Y.push(Q-E)),Q+E<d&&W[Q+E]===-1&&(W[Q+E]=N,Y.push(Q+E))}B=Y}const D=L+1;K=new Float64Array(t+1).fill(D);for(let N=0;N<d;N++){const Y=r[N];if(Y>0&&Y!==i){const ta=W[N]>=0?W[N]:D;ta<K[Y]&&(K[Y]=ta)}}c&&console.log(`[rank-filter] brain comp=${i} size=${p} bbox A[${C[i]},${w[i]}] B[${G[i]},${k[i]}] C[${I[i]},${z[i]}] | maxGap=${u} scan=${L}`)}const A=new Map;for(let p=1;p<=t;p++){const L=S[p],E=b[p];A.has(L)||A.set(L,[]),A.get(L).push({i:p,size:E})}const x=new Uint8Array(t+1).fill(0);for(const[p,L]of A.entries()){L.sort((D,N)=>N.size-D.size);const E=L.length?L[0].size:0,W=e>0?E*e:0,B=Math.min(L.length,n);for(let D=0;D<B;D++){const N=L[D];if(N.size<W){c&&D>0&&console.log(`[rank-filter] class ${p} #${D}: size=${N.size} DROP (below ${(e*100).toFixed(0)}% floor)`);break}if(D>0&&g){const Y=K[N.i],ta=Y<=u;if(c&&console.log(`[rank-filter] class ${p} #${D}: size=${N.size} surfDist=${Y} -> ${ta?"KEEP":"DROP (too far)"}`),!ta)continue}x[N.i]=1}}const m=new Uint32Array(t+1).fill(0);for(let p=1;p<=t;p++)x[p]&&(m[p]=S[p]);return this.finalize_volume(r,f,m,t,s)}}function ol(l,a,t){return j(this,null,function*(){const[r,n,e,f,s,u]=yield Sl(a),c=n-r+1,d=f-e+1,S=u-s+1,b=(A,x,m,p)=>{const L=Math.min(A,p),E=Math.min(255-x,p),W=Math.max(0,A-L),B=Math.min(255,x+E);return[W,B]},[g,v]=b(r,n,c,t),[y,C]=b(e,f,d,t),[w,G]=b(s,u,S,t);let k=l.slice([g,y,w],[v-g+1,C-y+1,G-w+1]);const I=k.shape,z=I[0]%2,K=I[1]%2,i=I[2]%2;return z||K||i?(k=k.pad([[0,z],[0,K],[0,i]]),console.log(`Padded to even dims: [${I}] -> [${k.shape}]`)):console.log(`Crop dimensions (already even): [${I}]`),{cropped:k,corner:[g,y,w],padding:[z,K,i]}})}function fl(n,e,f){return j(this,arguments,function*(l,a,t,r=[0,0,0]){const[s,u,c]=a,[d,S,b]=t,[g,v,y]=l.shape,[C,w,G]=r||[0,0,0],k=Math.max(0,s+C),I=Math.max(0,u+w),z=Math.max(0,c+G),K=[[k,Math.max(0,d-g-k)],[I,Math.max(0,S-v-I)],[z,Math.max(0,b-y-z)]],i=l.pad(K);if(i.shape[0]>d||i.shape[1]>S||i.shape[2]>b){const A=i.slice([0,0,0],[d,S,b]);return i.dispose(),A}return i})}function cl(l,a){return j(this,null,function*(){const t=l.max(),r=t.mul(a),n=yield r.data();return t.dispose(),r.dispose(),wa(()=>l.clone().greater(n[0]))})}function Ie(l,a,t){const r=(a-1)*t,n=Math.floor(r),e=Math.ceil(r);let f=0,s=0,u=0,c=!1;for(let d=0;d<l.length;d++)if(f+=l[d],!c&&f>n&&(s=d,c=!0),f>e){u=d;break}return s+(u-s)*(r-n)}function dl(l,a=.02,t=.98){return j(this,null,function*(){const r=l.flatten(),n=r.shape[0],e=yield r.data();r.dispose();const f=new Uint32Array(256);let s=!0;for(let v=0;v<n;v++){const y=e[v];if(!Number.isFinite(y))throw new Error("Cannot percentile-normalize a volume containing NaN or Infinity");y<0||y>255||y!==Math.trunc(y)?s=!1:f[y]++}if(s)return{qmin:Ie(f,n,a),qmax:Ie(f,n,t)};const u=Math.min(1e5,n),c=new Float32Array(u),d=u>1?(n-1)/(u-1):0;for(let v=0;v<u;v++){const y=e[Math.round(v*d)];if(!Number.isFinite(y))throw new Error("Cannot percentile-normalize a volume containing NaN or Infinity");c[v]=y}c.sort();const S=v=>{const y=(u-1)*v,C=Math.floor(y),w=Math.ceil(y);return c[C]+(c[w]-c[C])*(y-C)},b=S(a),g=S(t);return{qmin:b,qmax:g}})}function vl(l,a,t,r,n,e,f){return j(this,null,function*(){const s=l.shape[4],u=a.shape[4];let c=null;for(let d=0;d<u;d++){const S=Math.ceil(s/f);let b=null;for(let v=0;v<S;v++){const y=v*f,C=Math.min((v+1)*f,s);if(y<s){const w=wa(()=>{const G=l.slice([0,0,0,0,y],[-1,-1,-1,-1,C-y]),k=a.slice([0,0,0,y,d],[-1,-1,-1,C-y,1]);return ce(G,k,r,n,"NDHWC",e)});if(b===null)b=w;else{const G=b.add(w);b.dispose(),w.dispose(),b=G}}}let g;if(t){const v=t.slice([d],[1]);g=b.add(v),b.dispose(),v.dispose()}else g=b;if(c==null)c=g;else{const v=yield _e([c,g],4);g.dispose(),c.dispose(),c=v}}return c})}function gl(l,a=1e-5){return wa(()=>{const{mean:t,variance:r}=qt(l,[1,2,3],!0),n=Ke(r.add(a));return l.sub(t).mul(n)})}function bl(l,a,t,r,n,e,f){return j(this,null,function*(){const s=l.shape[4],u=a.shape[4];let c=null;for(let d=0;d<u;d++){const S=Math.ceil(s/f);let b=null;for(let y=0;y<S;y++){const C=y*f,w=Math.min((y+1)*f,s);if(C<s){const G=wa(()=>{const k=l.slice([0,0,0,0,C],[-1,-1,-1,-1,w-C]),I=a.slice([0,0,0,C,d],[-1,-1,-1,w-C,1]);return ce(k,I,r,n,"NDHWC",e)});if(b===null)b=G;else{const k=b.add(G);b.dispose(),G.dispose(),b=k}}}let g;if(t){const y=t.slice([d],[1]);g=b.add(y),b.dispose(),y.dispose()}else g=b;const v=gl(g);if(g.dispose(),c===null)c=v;else{const y=yield _e([c,v],4);v.dispose(),c.dispose(),c=y}}return c})}function tt(l,a,t,r,n,e,f,s){const u=l.length;return wa(()=>{let c=null;const d=Math.ceil(u/s);for(let S=0;S<d;S++){const b=S*s,g=Math.min((S+1)*s,u),v=g-b,y=v===1?l[b]:_e(l.slice(b,g),4),C=a.slice([0,0,0,b,r],[-1,-1,-1,v,1]),w=ce(y,C,n,e,"NDHWC",f);c=c===null?w:c.add(w)}return t&&(c=c.add(t.slice([r],[1]))),c})}function Ne(l,a,t,r,n,e,f,s=!1){const u=a.shape[4],c=[];for(let d=0;d<u;d++){let S=tt(l,a,t,d,r,n,e,f);if(s){const b=lt(S);S.dispose(),S=b}c.push(S)}return c}function pl(l,a,t,r,n,e){const f=a.shape[3],s=a.shape[4],u=[1,r[0],r[1],r[2],1],c=[];for(let d=0;d<f;d++){const S=wa(()=>{let b=null;for(let g=0;g<s;g++){const v=a.slice([0,0,0,d,g],[-1,-1,-1,1,1]),y=Wt(l[g],v,u,n,e);b=b===null?y:b.add(y)}return t&&(b=b.add(t.slice([d],[1]))),b});c.push(S)}return c}function hl(l,a,t,r,n,e,f,s=!0){return j(this,null,function*(){const u=a.shape[4],c=3;let d=null,S=null,b=null;for(let g=0;g<u;g++){const v=tt(l,a,t,g,r,n,e,c);b===null&&(b=[v.shape[1],v.shape[2],v.shape[3]]);const y=wa(()=>v.reshape(b));if(v.dispose(),d===null)d=y,S=It(y);else{const[C,w]=wa(()=>{const G=Xe(y,d);return[ne(G,y,d),ne(G,He(S.shape,g),S)]});d.dispose(),S.dispose(),y.dispose(),d=C,S=w}f&&f(`Final layer class ${g+1}/${u}`,(g+1)/u),!s&&g%8===0&&(yield new Promise(C=>setTimeout(C,0)))}return d.dispose(),S})}function yl(l){const a=l.shape[4];if(a===1)return[l];const t=[];for(let r=0;r<a;r++)t.push(l.slice([0,0,0,0,r],[-1,-1,-1,-1,1]));return t}function lt(l,a=1e-5){return wa(()=>{const t=l.shape.length,r=l.shape[t-1],n=l.shape[1]*l.shape[2]*l.shape[3],e=l.transpose([0,4,1,2,3]).reshape([r,n]),f=e.mean(1),u=e.sub(f.reshape([r,1])).square().mean(1),c=Ke(Dt(u,a)),d=f.reshape([1,1,1,1,r]),S=c.reshape([1,1,1,1,r]);return l.sub(d).mul(S)})}function pe(l,a=0){return j(this,null,function*(){let t=[];a===0?t=yield l.max(2).max(1).arraySync():a===1?t=yield l.max(2).max(0).arraySync():t=yield l.max(1).max(0).arraySync();let r=t.length,n=0;for(let e=0;e<t.length;e++)if(t[e]>0){r=e;break}for(let e=t.length-1;e>=0;e--)if(t[e]>0){n=e;break}return[r,n]})}function Sl(l){return j(this,null,function*(){const[a,t]=yield pe(l,0),[r,n]=yield pe(l,1),[e,f]=yield pe(l,2);return console.log("row min and max  :",a,t),console.log("col min and max  :",r,n),console.log("depth min and max  :",e,f),[a,t,r,n,e,f]})}function ml(l,a,t,r,n,e,f,s,u=!0){return j(this,null,function*(){l[0].dtype!=="int32"&&f("",-1,"generateBrainMask assumes int32"),n.preModelPostProcess&&f("",-1,"generateBrainMask assumes BWLabeler instead of preModelPostProcess");const c=l.length,d=l[0].size,S=c*d,b=new Int32Array(S);let g=0;for(let v=0;v<c;v++)b.set(l[v].dataSync(),g),g+=d;for(let v=0;v<S;v++)b[v]=b[v]!==0?1:0;return(u||e.showPhase1Output)&&(s(b,e,n),f("Segmentation finished",0)),re(b,[a,t,r])})}function Pl(l,a,t){return j(this,null,function*(){const r=a.dims[1],n=a.dims[2];let e;if(a.datatypeCode===2)e=new Uint8Array(t);else if(a.datatypeCode===4)e=new Int16Array(t);else if(a.datatypeCode===8)e=new Int32Array(t);else if(a.datatypeCode===16)e=new Float32Array(t);else if(a.datatypeCode===64)e=new Float64Array(t);else if(a.datatypeCode===256)e=new Int8Array(t);else if(a.datatypeCode===512)e=new Uint16Array(t);else if(a.datatypeCode===768)e=new Uint32Array(t);else return;const f=[];let s=0;for(let c=0;c<l;c++){const d=new Array(n*r);let S=0;for(let b=0;b<n;b++)for(let g=0;g<r;g++){const v=e[s++];d[S++]=v&255}f.push(re(d,[n,r]))}const u=Ft(f);return Aa(f),u})}function it(l){return j(this,null,function*(){return l.layers.length})}function rt(l){return j(this,null,function*(){let a=0;for(let t=0;t<l.layers.length;t++)a+=l.layers[t].countParams();return a})}function se(l){return j(this,null,function*(){for(let a=0;a<l.layers.length;a++)if(l.layersByDepth[a][0].dataFormat)return l.layersByDepth[a][0].dataFormat==="channelsLast"})}function nt(l){return j(this,null,function*(){return yield kt(l)})}function xe(l){return j(this,null,function*(){const a=l.max(),t=l.min();return yield l.sub(t).div(a.sub(t))})}function Ul(l,a,t){const f=l.shape[4],s=Math.ceil(f/t);let u=null;for(let c=0;c<s;c++){const d=c*t,b=Math.min((c+1)*t,f)-d,g=wa(()=>l.slice([0,0,0,0,d],[-1,-1,-1,-1,b])),v=wa(()=>a.slice([0,0,0,d,0],[-1,-1,-1,b,-1])),y=ce(g,v,1,0,"NDHWC",1);g.dispose(),v.dispose();const C=Ze(y);if(y.dispose(),u===null)u=C;else{const w=u.add(C);u.dispose(),u!==C&&C.dispose(),u=w}wa(()=>{$t(Se([1,1]),Se([1,1]))})}return u}function we(l,a=.02,t=.98,r=.001){return j(this,null,function*(){if(!(a>=0&&a<t&&t<=1))throw new Error(`Invalid normalization percentiles: ${a}, ${t}`);const{qmin:n,qmax:e}=yield dl(l,a,t);console.log(`[Normalization] ${a*100}-${t*100} percentiles: low=${n}, high=${e}, epsilon=${r}, clip=[0,1]`);const f=e-n+r,s=l.sub(n),u=s.div(f),c=u.clipByValue(0,1);return s.dispose(),u.dispose(),c})}class _l{constructor(a,t,r,n,e=!0){this.model=a,this.outChannels=a.outputLayers[0].kernel.shape[4],this.chunkSize=t,this.isChannelLast=r,this.callbackUI=n,this.isWebWorker=e}apply(a){return j(this,null,function*(){const t=performance.now(),r=this.model.layers[this.model.layers.length-1],n=r.getWeights()[0],e=r.getWeights()[1],f=this.isChannelLast?a.shape.slice(1,-1):a.shape.slice(2);let s=yield Nt(zt(f),-1e4),u=yield Se(f);const c=3,d=Math.ceil(this.outChannels/c);for(let g=0;g<d;g++){const v=g*c,y=Math.min((g+1)*c,this.outChannels),[C,w]=yield wa(()=>{let G=s,k=u;for(let I=v;I<y;I++){const z=n.slice([0,0,0,0,I],[-1,-1,-1,-1,1]),K=e.slice([I],[1]),i=Ul(a,z,Math.min(this.chunkSize,this.outChannels)).add(K),A=Xe(i,G);G=ne(A,i,G),k=ne(A,He(k.shape,I),k)}return[G,k]});Aa([s,u]),s=C,u=w,this.callbackUI(`Processing chunk ${g+1}/${d}`,(g+1)/d),this.isWebWorker||(yield new Promise(G=>setTimeout(G,0)))}const S=u.clone();Aa([s,u]);const b=performance.now();return console.log(`Execution time: ${b-t} milliseconds`),S})}}function st(l,a,t,r){return j(this,null,function*(){console.log("Downloading segmentation data from GPU to CPU...");const n=yield l.data(),e=l.shape;if(console.log("Data download complete. Starting CPU processing."),r.isPostProcessEnable){console.log("Applying CPU-based connected-component labeling...");const f=performance.now(),s=new et,u=[5,14],c=!!r.fillSuppressedWithNeighborLabel||u.includes(t.id),d=e[0]*e[1]*e[2],S=Math.max(1e5,Math.floor(d*.01)),[b,g]=s.bwlabel(n,e,6,!1,!1);if(b>S){const w=`Segmentation produced noise: ${b.toLocaleString()} disconnected regions (cap ${S.toLocaleString()}). The model output is unusable, so post-processing was aborted. Try re-running, switching backend (WebGPU/WebGL2), or another model.`;console.error("[postprocess] "+w);const G=new Error(w);throw G.code="SEGMENTATION_NOISE",G}let v=!1,y=!1;if(t.type==="Brain_Extraction"||t.type==="Brain_Masking"?(v=!0,y=!0):[1,7].includes(t.id)?(v=!1,y=!1):[5,14].includes(t.id)?(v=!1,y=!0):[3,8,9].includes(t.id)?(v=!1,y=!1):(v=!0,y=!0),[1,7].includes(t.id)){const I=b,z=g,[K,i]=s.filter_clusters_by_rank(n,I,z,2,.02,e,c,8,!1);n.set(i)}else if(!y&&[3,8,9].includes(t.id)){const[w,G]=s.bwlabel(n,e,6,!0,!0);for(let A=0;A<n.length;A++)n[A]*=G[A];const[k,I]=s.bwlabel(n,e,6,!1,!1),z=new Set([1,2,5,6,13]),[K,i]=s.filter_clusters(n,k,I,z,e,c);n.set(i)}else if(!v&&y){r.diagnoseEnclosedComponents&&s.diagnose_components(n,b,g,e,{label:`model${t.id}`,topN:60});const[w,G]=s.largest_original_cluster_labels(n,b,g,e,c);n.set(G)}else{const[w,G]=s.bwlabel(n,e,6,v,y);if(v)for(let k=0;k<n.length;k++)n[k]*=G[k];else n.set(G)}const C=((performance.now()-f)/1e3).toFixed(4);console.log(`Connected-component labeling took: ${C} seconds.`)}switch(t.type){case"Brain_Masking":{const f=new Uint8Array(n.length);for(let s=0;s<n.length;s++)f[s]=n[s]!==0?1:0;return f}case"Brain_Extraction":{if(t.returnMaskForExtraction){const s=new Uint8Array(n.length);for(let u=0;u<n.length;u++)s[u]=n[u]!==0?1:0;return s}const f=new a.constructor(n.length);for(let s=0;s<n.length;s++){const u=n[s]!==0?1:0;f[s]=a[s]*u}return f}default:return new Uint8Array(n)}})}function Ce(l,a,t){var u;let r=0,n=1;if(t)if(a.length===5)n=a[1]*a[2]*a[3];else for(let c=0;c<a.length;c++)a[c]>1&&(n*=a[c]);else if(a.length===5)n=a[2]*a[3]*a[4];else for(let c=0;c<a.length;c++)a[c]>32&&(n*=a[c]);let e=0,f=0;if(l&&l.layers){const c=l.layers.length;for(let d=0;d<c;d++){const S=l.layers[d],b=d===c-1;let g=0,v=S.outputShape;Array.isArray(v)&&Array.isArray(v[0])&&(v=v[0]),Array.isArray(v)&&(t?g=v[v.length-1]:g=v[1]);let y=0;const C=S.batchInputShape,w=G=>Array.isArray(G)?t?G[G.length-1]:G[1]:0;if(C)if(Array.isArray(C)&&Array.isArray(C[0]))for(const G of C)y+=w(G);else Array.isArray(C)&&(y=w(C));if(y===0&&S.weights&&S.weights.length>0){const G=S.weights[0];G&&G.shape&&(G.shape.length===5?y=G.shape[3]:G.shape.length===4&&(y=G.shape[2]))}if(y===0&&(y=g),typeof g=="number"&&typeof y=="number"){const G=n*(y+g),k=n*g;!b&&G>r&&(r=G);const I=n*Math.max(y,g);!b&&I>f&&(f=I),e=k}}}r===0&&(r=n*32*2),f===0&&(f=n*32);const s=!!(l&&l.layers&&l.layers.some(c=>typeof c.name=="string"&&c.name.endsWith("_gn")));return console.log(`[Estimator] Total Layers: ${(u=l==null?void 0:l.layers)==null?void 0:u.length}, Peak(in+out): ${r}, MaxSingle: ${f}, Final Output: ${e}, unpackedIntermediate: ${s}`),{peak:r,maxSingle:f,maxOutput:e,hasUnpackedIntermediate:s}}function ut(l,a){try{const t=je();if(t&&t.gpgpu&&t.gpgpu.gl){const r=t.gpgpu.gl.getParameter(t.gpgpu.gl.MAX_TEXTURE_SIZE),n=Math.ceil(l/4),e=Math.ceil(Math.sqrt(n)),s=Math.ceil(Math.sqrt(a));if(console.log(`[Memory Check] Peak: ${l}, MaxOutput: ${a}, Packed Dim: ${e}, Unpacked Dim: ${s}, MaxTextureSize: ${r}`),e>r)return console.warn(`Proactive check (PACKED): Tensor size ${l} requires approx ${e}x${e} texture. Exceeds MAX_TEXTURE_SIZE ${r}`),!1;if(s>r)return console.warn(`Proactive check (UNPACKED): Max output ${a} requires approx ${s}x${s} texture. Exceeds MAX_TEXTURE_SIZE ${r}`),!1}}catch(t){console.warn("Could not check texture size limits:",t)}return!0}const ue={WEBGPU:"webgpu",WEBGL_MAIN:"webgl-main",WEBGL_SEQUENTIAL:"webgl-sequential"};function ot(l,a){return{startTime:Date.now(),Model_Name:(l==null?void 0:l.modelName)||"Unknown",Execution_Mode:a,TF_Backend:a===ue.WEBGPU?"webgpu":"webgl",isModelFullVol:null,No_SubVolumes:1,Brainchop_Ver:"FullVolume",Input_Shape:null,Output_Shape:null,Channel_Last:null,Model_Param:null,Model_Layers:null,Actual_Labels:null,Expect_Labels:null,NumLabels_Match:null,Missing_Labels:null,Inference_t:null,Postprocess_t:null,Status:null,Error_Type:null,Extra_Err_Info:null}}function xl(l,a,t,r,n,e){return j(this,null,function*(){var f,s,u;if(a)try{l.Input_Shape=JSON.stringify(t),l.Output_Shape=JSON.stringify(((f=a.output)==null?void 0:f.shape)||((u=(s=a.outputs)==null?void 0:s[0])==null?void 0:u.shape)),l.Channel_Last=r,n&&(l.Model_Param=yield n(a)),e&&(l.Model_Layers=yield e(a))}catch(c){console.warn("Failed to add model info to diagnostics:",c)}})}function Me(l,a,t,r=null){l.Expect_Labels=a,l.Actual_Labels=t,l.NumLabels_Match=a===t,r&&r.length>0&&(l.Missing_Labels=r.join(", "))}function Ee(l,a,t){l.Inference_t=a,l.Postprocess_t=t,l.Status="OK"}function Xa(l,a,t=null){l.Inference_t=1/0,l.Postprocess_t=1/0,l.Status="Fail",l.Error_Type=(a==null?void 0:a.message)||String(a),t&&(l.Extra_Err_Info=t)}const wl=!1;function oe(l,a,t,r,n,e,f,s,u){return j(this,null,function*(){const c=performance.now();console.log(`---- Start FullVolume Inference (SeqConv: ${a.enableSeqConv}) ----`),a.enableQuantileNorm?(console.log("preModel Quantile normalization enabled"),r=yield we(r)):(console.log("preModel Min Max normalization enabled"),r=yield xe(r));let d;if(n==null){const X=a.autoThreshold;X>0&&X<=1?d=yield cl(r,X):d=yield r.greater([0]).asType("bool")}else d=yield n.greater([0]).asType("bool");const S=r.shape,b=a.webglEnableTranspose!==void 0?a.webglEnableTranspose:a.enableTranspose,g=a.cropPadding;let v,y,C;if(a.enableCrop){const X=yield ol(r,d,g);v=X.cropped,y=X.corner,C=X.padding,r.dispose()}else{console.log("Skipping cropping (enableCrop: false)");const X=r.shape,ea=X[0]%2,da=X[1]%2,sa=X[2]%2;ea||da||sa?(console.log(`Padding standard input to even: ${X} -> +[${ea}, ${da}, ${sa}]`),v=r.pad([[0,ea],[0,da],[0,sa]]),C=[ea,da,sa],r.dispose()):(v=r,C=null),y=[0,0,0]}d.dispose(),a.inputPermutation?(console.log(`Permuting Input: ${a.inputPermutation}`),v=v.transpose(a.inputPermutation)):b&&(v=v.transpose(),console.log("Input transposed for pre-model"));const w=yield t,G=w.layers.length,k=se(w);let I;k?(w.layers[0].batchInputShape[1]=v.shape[0],w.layers[0].batchInputShape[2]=v.shape[1],w.layers[0].batchInputShape[3]=v.shape[2],I=[l.batchSize,w.layers[0].batchInputShape[1],w.layers[0].batchInputShape[2],w.layers[0].batchInputShape[3],l.numOfChan]):(w.layers[0].batchInputShape[2]=v.shape[0],w.layers[0].batchInputShape[3]=v.shape[1],w.layers[0].batchInputShape[4]=v.shape[2],I=[l.batchSize,l.numOfChan,w.layers[0].batchInputShape[2],w.layers[0].batchInputShape[3],w.layers[0].batchInputShape[4]]);let z=v.reshape(I),K=!1;if(!a.enableSeqConv){const{peak:X,maxSingle:ea,maxOutput:da,hasUnpackedIntermediate:sa}=Ce(w,I,k);console.log(`[Centralized Check] Peak (In+Out): ${X}, MaxSingle: ${ea}, Max Output: ${da}, unpackedIntermediate: ${sa}`);const ua=je(),ga=ua&&ua.gpgpu&&ua.gpgpu.gl?ua.gpgpu.gl.getParameter(ua.gpgpu.gl.MAX_TEXTURE_SIZE):16384;console.log(`[Memory Check] MAX_TEXTURE_SIZE from WebGL context: ${ga}`);const ca=Math.ceil(Math.sqrt(Math.ceil(ea/(sa?1:4)))),Ua=Math.ceil(Math.sqrt(da));ca>ga?(console.warn(`[Memory Check] PACKED intermediates too large (${ca} > ${ga}). Using full SeqConv.`),a.enableSeqConv=!0):Ua>ga?(console.warn(`[Memory Check] UNPACKED output too large (${Ua} > ${ga}). Using chunkedArgMax.`),K=!0):console.log("[Memory Check] All checks passed. Using fast path.")}const i=a.enableSeqConv?"SeqConv (SLOW: per-channel conv + sync every layer)":K?"fast + chunkedArgMax (final layer only)":"fast (dense)";console.log(`%c[PATH] ${i}  | crop=${v.shape}  | enableCrop=${a.enableCrop} cropPadding=${a.cropPadding}`,"font-weight:bold;color:#0a0");function A(X,ea,da,sa,ua,ga,pa){return j(this,null,function*(){let ca=1,Ua=ea;const za=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Pa=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;let _a=za||Pa?10:15;for(ua.enableSeqConv&&(_a=1),console.log(`Syncing GPU every ${_a} layers.`);ca<=da;){performance.now();let la="";try{let ma;const Ra=X.layers[ca],ha=Ra.activation,ya=Ra.getClassName()==="Conv3D"&&ha&&ha.getClassName()==="linear";ua.enableSeqConv&&ya?ma=yield(X.layers[ca].name.endsWith("_gn")?bl:vl)(Ua,X.layers[ca].getWeights()[0],X.layers[ca].getWeights()[1],X.layers[ca].strides,X.layers[ca].padding,X.layers[ca].dilationRate,3):wl&&X.layers[ca].name.endsWith("_gn")||(ma=wa(()=>{let o=X.layers[ca].apply(Ua);return X.layers[ca].name.endsWith("_gn")&&(o=lt(o)),o})),Ua.dispose(),Ua=ma}catch(ma){throw pa(ma.message,-1,ma.message),Ba().endScope(),Ba().disposeVariables(),Xa(ga,ma,"Failed while model layer "+ca+" apply"),pa("",-1,"",ga),ma}if(ca%_a===0){pa("Layer "+ca.toString(),(ca+1)/sa);const ma=Ua.slice([0,0,0,0,0],[1,1,1,1,1]);yield ma.data(),ma.dispose()}else pa("Layer "+ca.toString(),(ca+1)/sa);ca++}return Ua})}function x(X,ea,da,sa,ua,ga,pa){return j(this,null,function*(){const ca=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Ua=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,za=ca||Ua?4:6;let Pa=yl(ea),_a=1;for(;_a<=da;){try{const la=X.layers[_a],ma=la.getClassName(),Ra=la.activation;let ha;if(ma==="Conv3D"&&Ra&&Ra.getClassName()==="linear"){const ya=la.name.endsWith("_gn");ha=Ne(Pa,la.getWeights()[0],la.getWeights()[1],la.strides,la.padding,la.dilationRate,3,ya)}else if(ma==="Activation")ha=Pa.map(ya=>wa(()=>la.apply(ya)));else if(ma==="Conv3D"){ha=Ne(Pa,la.getWeights()[0],la.getWeights()[1],la.strides,la.padding,la.dilationRate,3,!1);const ya=ha.map(o=>wa(()=>la.activation.apply(o)));Aa(ha),ha=ya}else if(ma==="Conv3DTranspose"){const ya=[Pa[0].shape[1],Pa[0].shape[2],Pa[0].shape[3]],o=la.computeOutputShape([1,ya[0],ya[1],ya[2],Pa.length]),h=[o[1],o[2],o[3]];if(ha=pl(Pa,la.getWeights()[0],la.getWeights()[1],h,la.strides,la.padding),la.activation&&la.activation.getClassName()!=="linear"){const M=ha.map(R=>wa(()=>la.activation.apply(R)));Aa(ha),ha=M}}else throw new Error(`Channel-list path: unsupported layer ${ma} (${la.name})`);Aa(Pa),Pa=ha}catch(la){throw Aa(Pa),pa(la.message,-1,la.message),Ba().endScope(),Ba().disposeVariables(),Xa(ga,la,"Failed while model layer "+_a+" apply (channel-list)"),pa("",-1,"",ga),la}if(pa("Layer "+_a.toString(),(_a+1)/sa),_a%za===0){const la=Pa[0].slice([0,0,0,0,0],[1,1,1,1,1]);yield la.data(),la.dispose()}_a++}return Pa})}const m=performance.now(),L=a.enableSeqConv||K?G-2:G-1;let E;if(a.enableSeqConv){a.enableTTA&&console.warn("[channel-list] TTA is not supported on the channel-list path; running a single pass.");const X=yield x(w,z,L,G,a,e,s);v.dispose(),console.log("Applying channel-list final classifier + argmax...");const ea=w.layers[G-1],da=typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope,sa=yield hl(X,ea.getWeights()[0],ea.getWeights()[1],ea.strides,ea.padding,ea.dilationRate,s,da);Aa(X),E=sa.asType("int32"),sa.dispose(),console.log("Channel-list argmax output shape:",E.shape)}else{if(a.enableTTA){console.log("--- Running TTA Pass 1 (Original) ---");const ea=yield A(w,z,L,G,a,e,s);if(!ea)throw new Error("TTA Error: logits1 is null or undefined");console.log("--- Running TTA Pass 2 (Flipped) ---");const da=a.ttaFlipAxis||1,sa=v.clone().reverse(da).reshape(I),ua=yield A(w,sa,L,G,a,e,s);if(!ua)throw new Error("TTA Error: logits2 is null or undefined");console.log("--- Averaging TTA Results ---");const ga=wa(()=>{const pa=ua.shape;return ua.reshape([pa[0]*pa[1],pa[2],pa[3],pa[4]]).reverse(da).reshape(pa)});z=ea.add(ga).div(2),ea.dispose(),ua.dispose(),ga.dispose(),v.dispose()}else z=yield A(w,z,L,G,a,e,s),v.dispose();if(K){console.log("Applying SequentialConvLayer for final layer only (fast path for layers 1-18)...");const ea=yield new _l(w,10,k,s).apply(z);E=ea.asType("int32"),ea.dispose(),z.dispose(),console.log("SequentialConvLayer (final only) output shape:",E.shape)}else console.log("Applying final ArgMax..."),E=wa(()=>{const ea=Je(z,k?-1:1);return Ze(ea)}),z.dispose(),console.log("ArgMax output shape:",E.shape)}const W=((performance.now()-m)/1e3).toFixed(4);console.log(`---- Inference Time: ${W} seconds ----`),a.outputPermutation?(console.log(`Permuting Output: ${a.outputPermutation}`),E=E.transpose(a.outputPermutation)):b&&(console.log("outLabelVolume transposed"),E=E.transpose());const B=performance.now();if(C&&(C[0]||C[1]||C[2])){const X=E.shape,ea=[X[0]-C[0],X[1]-C[1],X[2]-C[2]],da=E.slice([0,0,0],ea);E.dispose(),E=da,console.log(`Removed padding: [${X}] -> [${E.shape}]`)}console.log("outLabelVolume without padding shape: ",E.shape),E=yield fl(E,y,S,a.outputShift),console.log("outLabelVolume final shape after restoration: ",E.shape);const D=((performance.now()-B)/1e3).toFixed(4);console.log(`---- Restoration Time: ${D} seconds ----`);const N=performance.now();let Y;try{Y=yield st(E,u,a,l)}catch(X){throw s(X.message,-1,X.message),Xa(e,X,"Failed during segmentation post-processing"),s("",-1,"",e),E.dispose(),Ba().disposeVariables(),X}const ta=((performance.now()-N)/1e3).toFixed(4);console.log(`---- Postprocessing Time: ${ta} seconds ----`),E.dispose(),Ba().disposeVariables();const Q=((performance.now()-c)/1e3).toFixed(4);console.log(`---- Total Execution Time: ${Q} seconds ----`);const ba=new Set(Y).size,Sa=a.numClasses||ba;return Me(e,Sa,ba),Ee(e,W,ta),s(a.modelName+"<br>Segmentation finished",0),s("",-1,"",e),f(Y,l,a),0})}function Cl(l,a,t,r,n,e,f,s,u,c,d,S){return j(this,null,function*(){if(s.No_SubVolumes=1,f.preModelId){const b=yield nt(u.rootURL+Na[f.preModelId-1].path),g=Na[f.preModelId-1].enableTranspose,v=Na[f.preModelId-1].enableQuantileNorm;let y=null;v?(console.log("preModel Quantile normalization enabled"),y=yield we(a)):(console.log("preModel Min Max normalization enabled"),y=yield xe(a)),g?(y=yield y.transpose(),console.log("Input transposed for pre-model")):console.log("Transpose not enabled for pre-model"),s.Brainchop_Ver="PreModel_FV";const C=yield b;try{const w=performance.now(),G=C,k=G.layers[0].batchInputShape;if(console.log(" Pre-Model batch input shape : ",k),k.length!==5){const N="The pre-model input shape must be 5D ";return d(N,-1,N),0}const I=se(G),z=u.batchSize,K=u.numOfChan;let i,A,x,m;if(I){if(console.log("Pre-Model Channel Last"),isNaN(k[4])||k[4]!==1){const N="The number of channels for pre-model input shape must be 1";return d(N,-1,N),0}i=k[1],A=k[2],x=k[3],m=[z,i,A,x,K]}else{if(console.log("Pre-Model Channel First"),isNaN(k[1])||k[1]!==1){const N="The number of channels for pre-model input shape must be 1";return d(N,-1,N),0}i=k[2],A=k[3],x=k[4],m=[z,K,i,A,x]}s.Input_Shape=JSON.stringify(m),s.Output_Shape=JSON.stringify(G.output.shape),s.Channel_Last=I,s.Model_Param=yield rt(G),s.Model_Layers=yield it(G);let p=0;const L=Na[f.preModelId-1].inferenceDelay;let E=1;const W=C.layers.length,B=[];B[0]=y.reshape(m),Aa(y);const D=window.setInterval(function(){return j(this,null,function*(){try{B[E]=yield C.layers[E].apply(B[E-1])}catch(N){const Y="Your graphics card (e.g. Intel) may not be compatible with WebGL. "+N.message;return d(Y,-1,Y),window.clearInterval(D),Ba().endScope(),Ba().disposeVariables(),Xa(s,N,"PreModel Failed while model layer "+E+" apply"),d("",-1,"",s),0}if(C.layers[E].dispose(),B[E-1].dispose(),d("Layer "+E.toString(),(E+1)/W),ge().unreliable){const N="unreliable reasons :"+ge().reasons;d(N,NaN,N)}if(E===W-1){window.clearInterval(D);const N=I?-1:1;console.log(" find argmax "),console.log("last Tensor shape : ",B[E].shape);const Y=I?B[E].shape[4]:B[E].shape[1];let ta;try{console.log(" Try tf.argMax for fullVolume .."),ta=yield Je(B[E],N)}catch(sa){if(N===-1)try{const ua=performance.now();console.log(" tf.argMax failed .. try argMaxLarge .."),window.alert("tensor2LightBuffer() is not dead code?"),window.alert("argMaxLarge() is not dead code?"),console.log("argMaxLarge for fullVolume takes : ",((performance.now()-ua)/1e3).toFixed(4))}catch(ua){const ga="argMax buffer couldn't be created due to limited memory resources.";return d(ga,-1,ga),ta.dispose(),window.clearInterval(D),Ba().endScope(),Ba().disposeVariables(),s.Inference_t=1/0,s.Postprocess_t=1/0,s.Status="Fail",s.Error_Type=ua.message,s.Extra_Err_Info="preModel prediction_argmax from argMaxLarge failed",d("",-1,"",s),0}else{const ua="argMax buffer couldn't be created due to limited memory resources.";return d(ua,-1,ua),ta.dispose(),window.clearInterval(D),Ba().endScope(),Ba().disposeVariables(),s.Inference_t=1/0,s.Postprocess_t=1/0,s.Status="Fail",s.Error_Type=sa.message,s.Extra_Err_Info="preModel prediction_argmax from argMaxLarge not support yet channel first",d("",-1,"",s),0}}console.log(" Pre-model prediction_argmax shape : ",ta.shape);const Q=((performance.now()-w)/1e3).toFixed(4);Aa(B[E]),console.log(" Pre-model find array max ");const oa=yield ta.max().dataSync()[0];p<oa&&(p=oa);const ba=p+1;console.log("Pre-model numSegClasses",ba),Me(s,Y,ba);let Sa=yield ta.reshape([t,r,n]);Aa(ta),g&&(console.log("Pre-model outLabelVolume transposed"),Sa=Sa.transpose());const X=performance.now();console.log("Generating pre-model output");let ea;try{const sa=yield jt(Sa);ea=yield ml(sa,t,r,n,f,u,d,c,!1),yield Aa(Sa),console.log(" Phase-1 num of tensors after generateBrainMask: ",ge().numTensors)}catch(sa){Ba().endScope(),Ba().disposeVariables();const ua="Failed while generating pre-model output due to limited browser memory available";return d(ua,-1,ua),s.Inference_t=Q,Xa(s,sa,"Pre-model failed while generating output"),s.Inference_t=Q,d("",-1,"",s),0}const da=((performance.now()-X)/1e3).toFixed(4);if(console.log("Pre-model processing the whole brain volume in tfjs tooks for multi-class output mask : ",((performance.now()-w)/1e3).toFixed(4)+"  Seconds"),Ee(s,Q,da),d("",-1,"",s),ea==null){const sa="slice_3d_mask failed ...";return d(sa,-1,sa),0}else if(console.log("--- pre-model done ---"),e){if(!f.enableSeqConv){const sa=[1,...a.shape],ua=Ce(l,sa);console.log(`Proactive Memory Check (Phase 1): Estimated Max Tensor Size: ${ua} elements`),ut(ua)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),f.enableSeqConv=!0)}return yield oe(u,f,l,a,ea,s,c,d,S),0}else window.alert("inferenceSubVolumes() is not dead code?")}E++})},L)}catch(w){d(w.message,-1,w.message),console.log('If webgl context is lost, try to restore webgl context by visit the link <a href="https://support.biodigital.com/hc/en-us/articles/218322977-How-to-turn-on-WebGL-in-my-browser">here</a>')}}else console.log("--- No pre-model is selected ---"),console.log("------ Run voxel cropping ------"),e?oe(u,f,l,a,null,s,c,d,S):window.alert("inferenceSubVolumes() is not dead code?")})}function Ml(l=!0){return j(this,null,function*(){yield Vt(),Ya().set("DEBUG",!1),Ya().set("WEBGL_FORCE_F16_TEXTURES",l),Ya().set("WEBGL_DELETE_TEXTURE_THRESHOLD",-1),yield Yt(),console.log("tf env() flags :",Ya().flags),console.log("tf env() features :",Ya().features),console.log("tf env total features: ",Object.keys(Ya().features).length),console.log(Qe())})}function El(l,a,t,r,n,e){return j(this,null,function*(){const f=a.enableSeqConv?ue.WEBGL_SEQUENTIAL:ue.WEBGL_MAIN,s=ot(a,f);e("Segmentation started",0),performance.now();const u=l.batchSize,c=l.numOfChan;if(isNaN(u)||u!==1){const x="The batch Size for input shape must be 1";return e(x,-1,x),0}if(isNaN(c)||c!==1){const x="The number of channels for input shape must be 1";return e(x,-1,x),0}Ba().startScope(),console.log("Batch size: ",u),console.log("Num of Channels: ",c);const d=yield nt(l.rootURL+a.path),S=!a.forceFP32;yield Ml(S),s.TF_Backend=Qe();const b=d;yield xl(s,b,b.layers[0].batchInputShape,yield se(b),rt,it);let g=[];if(g=b.layers[0].batchInputShape,console.log(" Model batch input shape : ",g),g.length!==5){const x="The model input shape must be 5D";return e(x,-1,x),0}let v,y,C;const w=t.dims[1],G=t.dims[2],k=t.dims[3];if(yield se(b)){if(console.log("Model Channel Last"),isNaN(g[4])||g[4]!==1){const x="The number of channels for input shape must be 1";return e(x,-1,x),0}v=g[1],y=g[2],C=g[3]}else{if(console.log("Model Channel First"),isNaN(g[1])||g[1]!==1){const x="The number of channels for input shape must be 1";return e(x,-1,x),0}v=g[2],y=g[3],C=g[4]}let z;v===256&&y===256&&C===256?z=!0:z=!1,s.isModelFullVol=z;let K=yield Pl(k,t,r);const i=a.enableTranspose,A=a.enableCrop;if(z)if(A)yield Cl(d,K,k,G,w,z,a,s,l,n,e,r);else{console.log("Cropping Disabled"),i?(K=K.transpose(),console.log("Input transposed")):console.log("Transpose NOT Enabled");let x=a.enableSeqConv;if(!x){const m=[1,...K.shape],p=Ce(d,m);console.log(`Proactive Memory Check: Estimated Max Tensor Size: ${p} elements`),ut(p)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),x=!0,a.enableSeqConv=!0)}x?(console.log("Seq Convoluton Enabled"),oe(l,a,d,K,null,s,n,e,r)):(console.log("Seq Convoluton Disabled"),oe(l,a,d,K,null,s,n,e,r))}})}const Tl=(()=>{const l=(i,A)=>i.subarray(...A.data_offsets),a=i=>{const A=Number(new DataView(i.buffer).getBigUint64(0,!0)),x=JSON.parse(new TextDecoder("utf8").decode(i.subarray(8,8+A)));return Object.fromEntries(Object.entries(x).filter(([m,p])=>m!=="__metadata__").map(([m,p])=>[m,La(Ta({},p),{data_offsets:p.data_offsets.map(L=>8+A+L)})]))},t=(i,A)=>i.createBuffer({size:A,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),r=i=>{const x=i.createBuffer({mappedAtCreation:!0,size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});return new Float32Array(x.getMappedRange())[0]=1/0,x.unmap(),x},n=(i,A,x)=>{const m=Math.ceil(A/4)*4,p=i.createBuffer({size:m,usage:GPUBufferUsage.STORAGE,mappedAtCreation:!0});return new Uint8Array(p.getMappedRange()).set(x),p.unmap(),p},e=(i,A,x,m,p,L,E)=>{const W=i.createBindGroup({layout:m,entries:[{binding:0,resource:{buffer:p}},...L.map((D,N)=>({binding:N+1,resource:{buffer:D}}))]}),B=A.beginComputePass();B.setPipeline(x),B.setBindGroup(0,W),B.dispatchWorkgroups(...E),B.end()},f=`enable f16;
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
}`,u=`fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
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
}`,c=`enable f16;
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
}`,d=`enable f16;
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
}`,v=`enable f16;
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
}`,C=`enable f16;
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
}`,G=`enable f16;
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
}`,I=`enable f16;
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
}`,z=(i,A)=>j(null,null,function*(){const x=a(A),m=r(i),p=[i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]})],L=t(i,33554432),E=n(i,864,l(A,x["m.model.0.weight"])),W=n(i,13824,l(A,x["m.model.3.weight"])),B=n(i,13824,l(A,x["m.model.6.weight"])),D=n(i,13824,l(A,x["m.model.9.weight"])),N=n(i,13824,l(A,x["m.model.12.weight"])),Y=n(i,13824,l(A,x["m.model.15.weight"])),ta=n(i,13824,l(A,x["m.model.18.weight"])),Q=n(i,13824,l(A,x["m.model.21.weight"])),oa=n(i,13824,l(A,x["m.model.24.weight"])),ba=n(i,13824,l(A,x["m.model.27.weight"])),Sa=n(i,13824,l(A,x["m.model.30.weight"])),X=n(i,13824,l(A,x["m.model.33.weight"])),ea=n(i,13824,l(A,x["m.model.36.weight"])),da=n(i,13824,l(A,x["m.model.39.weight"])),sa=n(i,13824,l(A,x["m.model.42.weight"])),ua=n(i,13824,l(A,x["m.model.45.weight"])),ga=n(i,13824,l(A,x["m.model.48.weight"])),pa=n(i,13824,l(A,x["m.model.51.weight"])),ca=n(i,13824,l(A,x["m.model.54.weight"])),Ua=n(i,13824,l(A,x["m.model.57.weight"])),za=n(i,13824,l(A,x["m.model.60.weight"])),Pa=n(i,13824,l(A,x["m.model.63.weight"])),_a=n(i,13824,l(A,x["m.model.66.weight"])),la=n(i,13824,l(A,x["m.model.69.weight"])),ma=n(i,13824,l(A,x["m.model.72.weight"])),Ra=n(i,64,l(A,x["m.seq_conv_argmax.weight"])),ha=n(i,4,l(A,x["m.seq_conv_argmax.bias"])),ya=t(i,67108864),o=t(i,536870912),h=t(i,4194304),M=t(i,536870912),R=t(i,536870912),O=i.createBuffer({size:L.size,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.MAP_WRITE}),xa=i.createBuffer({size:ya.size,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),ka=[f,s,u,c,d,u,S,b,s,u,c,d,u,S,g,s,u,c,d,u,S,v,s,u,c,d,u,S,y,s,u,c,d,u,S,C,s,u,c,d,u,S,b,s,u,c,d,u,S,g,s,u,c,d,u,S,v,s,u,c,d,u,S,y,s,u,c,d,u,S,C,s,u,c,d,u,S,b,s,u,c,d,u,S,g,s,u,c,d,u,S,v,s,u,c,d,u,S,y,s,u,c,d,u,S,C,s,u,c,d,u,S,b,s,u,c,d,u,S,g,s,u,c,d,u,S,v,s,u,c,d,u,S,y,s,u,c,d,u,S,C,s,u,c,d,u,S,b,s,u,c,d,u,S,g,s,u,c,d,u,S,v,s,u,c,d,u,S,y,s,u,c,d,u,S,w,G,k,I],U=yield Promise.all(ka.map((ra,P)=>j(null,null,function*(){return yield i.createComputePipelineAsync({layout:i.createPipelineLayout({bindGroupLayouts:[p[P]]}),compute:{module:i.createShaderModule({code:ra}),entryPoint:"main"}})})));return ra=>j(null,null,function*(){let P=i.createCommandEncoder();yield O.mapAsync(GPUMapMode.WRITE),new Float16Array(O.getMappedRange()).set(ra),O.unmap(),P.copyBufferToBuffer(O,0,L,0,O.size),e(i,P,U[0],p[0],m,[o,L,E],[128,256,4]),e(i,P,U[1],p[1],m,[h,o],[8192,1,1]),e(i,P,U[2],p[2],m,[M,h],[32,1,1]),e(i,P,U[3],p[3],m,[h,M],[16,1,1]),e(i,P,U[4],p[4],m,[M,o,h],[1024,2,1]),e(i,P,U[5],p[5],m,[R,M],[32,1,1]),e(i,P,U[6],p[6],m,[M,R],[16,1,1]),e(i,P,U[7],p[7],m,[R,o,h,M,W],[128,256,4]),e(i,P,U[8],p[8],m,[o,R],[8192,1,1]),e(i,P,U[9],p[9],m,[h,o],[32,1,1]),e(i,P,U[10],p[10],m,[o,h],[16,1,1]),e(i,P,U[11],p[11],m,[h,R,o],[1024,2,1]),e(i,P,U[12],p[12],m,[M,h],[32,1,1]),e(i,P,U[13],p[13],m,[h,M],[16,1,1]),e(i,P,U[14],p[14],m,[M,R,o,h,B],[128,256,4]),e(i,P,U[15],p[15],m,[o,M],[8192,1,1]),e(i,P,U[16],p[16],m,[h,o],[32,1,1]),e(i,P,U[17],p[17],m,[o,h],[16,1,1]),e(i,P,U[18],p[18],m,[h,M,o],[1024,2,1]),e(i,P,U[19],p[19],m,[R,h],[32,1,1]),e(i,P,U[20],p[20],m,[h,R],[16,1,1]),e(i,P,U[21],p[21],m,[R,M,o,h,D],[128,256,4]),e(i,P,U[22],p[22],m,[o,R],[8192,1,1]),e(i,P,U[23],p[23],m,[h,o],[32,1,1]),e(i,P,U[24],p[24],m,[o,h],[16,1,1]),e(i,P,U[25],p[25],m,[h,R,o],[1024,2,1]),e(i,P,U[26],p[26],m,[M,h],[32,1,1]),e(i,P,U[27],p[27],m,[h,M],[16,1,1]),e(i,P,U[28],p[28],m,[M,R,o,h,N],[128,256,4]),e(i,P,U[29],p[29],m,[o,M],[8192,1,1]),e(i,P,U[30],p[30],m,[h,o],[32,1,1]),e(i,P,U[31],p[31],m,[o,h],[16,1,1]),e(i,P,U[32],p[32],m,[h,M,o],[1024,2,1]),e(i,P,U[33],p[33],m,[R,h],[32,1,1]),e(i,P,U[34],p[34],m,[h,R],[16,1,1]),e(i,P,U[35],p[35],m,[R,M,o,h,Y],[128,256,4]),e(i,P,U[36],p[36],m,[o,R],[8192,1,1]),e(i,P,U[37],p[37],m,[h,o],[32,1,1]),e(i,P,U[38],p[38],m,[o,h],[16,1,1]),e(i,P,U[39],p[39],m,[h,R,o],[1024,2,1]),e(i,P,U[40],p[40],m,[M,h],[32,1,1]),e(i,P,U[41],p[41],m,[h,M],[16,1,1]),e(i,P,U[42],p[42],m,[M,R,o,h,ta],[128,256,4]),e(i,P,U[43],p[43],m,[o,M],[8192,1,1]),e(i,P,U[44],p[44],m,[h,o],[32,1,1]),e(i,P,U[45],p[45],m,[o,h],[16,1,1]),e(i,P,U[46],p[46],m,[h,M,o],[1024,2,1]),e(i,P,U[47],p[47],m,[R,h],[32,1,1]),e(i,P,U[48],p[48],m,[h,R],[16,1,1]),e(i,P,U[49],p[49],m,[R,M,o,h,Q],[128,256,4]),e(i,P,U[50],p[50],m,[o,R],[8192,1,1]),e(i,P,U[51],p[51],m,[h,o],[32,1,1]),e(i,P,U[52],p[52],m,[o,h],[16,1,1]),e(i,P,U[53],p[53],m,[h,R,o],[1024,2,1]),e(i,P,U[54],p[54],m,[M,h],[32,1,1]),e(i,P,U[55],p[55],m,[h,M],[16,1,1]),e(i,P,U[56],p[56],m,[M,R,o,h,oa],[128,256,4]),e(i,P,U[57],p[57],m,[o,M],[8192,1,1]),e(i,P,U[58],p[58],m,[h,o],[32,1,1]),e(i,P,U[59],p[59],m,[o,h],[16,1,1]),e(i,P,U[60],p[60],m,[h,M,o],[1024,2,1]),e(i,P,U[61],p[61],m,[R,h],[32,1,1]),e(i,P,U[62],p[62],m,[h,R],[16,1,1]),e(i,P,U[63],p[63],m,[R,M,o,h,ba],[128,256,4]),e(i,P,U[64],p[64],m,[o,R],[8192,1,1]),e(i,P,U[65],p[65],m,[h,o],[32,1,1]),e(i,P,U[66],p[66],m,[o,h],[16,1,1]),e(i,P,U[67],p[67],m,[h,R,o],[1024,2,1]),e(i,P,U[68],p[68],m,[M,h],[32,1,1]),e(i,P,U[69],p[69],m,[h,M],[16,1,1]),e(i,P,U[70],p[70],m,[M,R,o,h,Sa],[128,256,4]),e(i,P,U[71],p[71],m,[o,M],[8192,1,1]),e(i,P,U[72],p[72],m,[h,o],[32,1,1]),e(i,P,U[73],p[73],m,[o,h],[16,1,1]),e(i,P,U[74],p[74],m,[h,M,o],[1024,2,1]),e(i,P,U[75],p[75],m,[R,h],[32,1,1]),e(i,P,U[76],p[76],m,[h,R],[16,1,1]),e(i,P,U[77],p[77],m,[R,M,o,h,X],[128,256,4]),e(i,P,U[78],p[78],m,[o,R],[8192,1,1]),e(i,P,U[79],p[79],m,[h,o],[32,1,1]),e(i,P,U[80],p[80],m,[o,h],[16,1,1]),e(i,P,U[81],p[81],m,[h,R,o],[1024,2,1]),e(i,P,U[82],p[82],m,[M,h],[32,1,1]),e(i,P,U[83],p[83],m,[h,M],[16,1,1]),e(i,P,U[84],p[84],m,[M,R,o,h,ea],[128,256,4]),e(i,P,U[85],p[85],m,[o,M],[8192,1,1]),e(i,P,U[86],p[86],m,[h,o],[32,1,1]),e(i,P,U[87],p[87],m,[o,h],[16,1,1]),e(i,P,U[88],p[88],m,[h,M,o],[1024,2,1]),e(i,P,U[89],p[89],m,[R,h],[32,1,1]),e(i,P,U[90],p[90],m,[h,R],[16,1,1]),e(i,P,U[91],p[91],m,[R,M,o,h,da],[128,256,4]),e(i,P,U[92],p[92],m,[o,R],[8192,1,1]),e(i,P,U[93],p[93],m,[h,o],[32,1,1]),e(i,P,U[94],p[94],m,[o,h],[16,1,1]),e(i,P,U[95],p[95],m,[h,R,o],[1024,2,1]),e(i,P,U[96],p[96],m,[M,h],[32,1,1]),e(i,P,U[97],p[97],m,[h,M],[16,1,1]),e(i,P,U[98],p[98],m,[M,R,o,h,sa],[128,256,4]),e(i,P,U[99],p[99],m,[o,M],[8192,1,1]),e(i,P,U[100],p[100],m,[h,o],[32,1,1]),e(i,P,U[101],p[101],m,[o,h],[16,1,1]),e(i,P,U[102],p[102],m,[h,M,o],[1024,2,1]),e(i,P,U[103],p[103],m,[R,h],[32,1,1]),e(i,P,U[104],p[104],m,[h,R],[16,1,1]),e(i,P,U[105],p[105],m,[R,M,o,h,ua],[128,256,4]),e(i,P,U[106],p[106],m,[o,R],[8192,1,1]),e(i,P,U[107],p[107],m,[h,o],[32,1,1]),e(i,P,U[108],p[108],m,[o,h],[16,1,1]),e(i,P,U[109],p[109],m,[h,R,o],[1024,2,1]),e(i,P,U[110],p[110],m,[M,h],[32,1,1]),e(i,P,U[111],p[111],m,[h,M],[16,1,1]),e(i,P,U[112],p[112],m,[M,R,o,h,ga],[128,256,4]),e(i,P,U[113],p[113],m,[o,M],[8192,1,1]),e(i,P,U[114],p[114],m,[h,o],[32,1,1]),e(i,P,U[115],p[115],m,[o,h],[16,1,1]),e(i,P,U[116],p[116],m,[h,M,o],[1024,2,1]),e(i,P,U[117],p[117],m,[R,h],[32,1,1]),e(i,P,U[118],p[118],m,[h,R],[16,1,1]),e(i,P,U[119],p[119],m,[R,M,o,h,pa],[128,256,4]),e(i,P,U[120],p[120],m,[o,R],[8192,1,1]),e(i,P,U[121],p[121],m,[h,o],[32,1,1]),e(i,P,U[122],p[122],m,[o,h],[16,1,1]),e(i,P,U[123],p[123],m,[h,R,o],[1024,2,1]),e(i,P,U[124],p[124],m,[M,h],[32,1,1]),e(i,P,U[125],p[125],m,[h,M],[16,1,1]),e(i,P,U[126],p[126],m,[M,R,o,h,ca],[128,256,4]),e(i,P,U[127],p[127],m,[o,M],[8192,1,1]),e(i,P,U[128],p[128],m,[h,o],[32,1,1]),e(i,P,U[129],p[129],m,[o,h],[16,1,1]),e(i,P,U[130],p[130],m,[h,M,o],[1024,2,1]),e(i,P,U[131],p[131],m,[R,h],[32,1,1]),e(i,P,U[132],p[132],m,[h,R],[16,1,1]),e(i,P,U[133],p[133],m,[R,M,o,h,Ua],[128,256,4]),e(i,P,U[134],p[134],m,[o,R],[8192,1,1]),e(i,P,U[135],p[135],m,[h,o],[32,1,1]),e(i,P,U[136],p[136],m,[o,h],[16,1,1]),e(i,P,U[137],p[137],m,[h,R,o],[1024,2,1]),e(i,P,U[138],p[138],m,[M,h],[32,1,1]),e(i,P,U[139],p[139],m,[h,M],[16,1,1]),e(i,P,U[140],p[140],m,[M,R,o,h,za],[128,256,4]),e(i,P,U[141],p[141],m,[o,M],[8192,1,1]),e(i,P,U[142],p[142],m,[h,o],[32,1,1]),e(i,P,U[143],p[143],m,[o,h],[16,1,1]),e(i,P,U[144],p[144],m,[h,M,o],[1024,2,1]),e(i,P,U[145],p[145],m,[R,h],[32,1,1]),e(i,P,U[146],p[146],m,[h,R],[16,1,1]),e(i,P,U[147],p[147],m,[R,M,o,h,Pa],[128,256,4]),e(i,P,U[148],p[148],m,[o,R],[8192,1,1]),e(i,P,U[149],p[149],m,[h,o],[32,1,1]),e(i,P,U[150],p[150],m,[o,h],[16,1,1]),e(i,P,U[151],p[151],m,[h,R,o],[1024,2,1]),e(i,P,U[152],p[152],m,[M,h],[32,1,1]),e(i,P,U[153],p[153],m,[h,M],[16,1,1]),e(i,P,U[154],p[154],m,[M,R,o,h,_a],[128,256,4]),e(i,P,U[155],p[155],m,[o,M],[8192,1,1]),e(i,P,U[156],p[156],m,[h,o],[32,1,1]),e(i,P,U[157],p[157],m,[o,h],[16,1,1]),e(i,P,U[158],p[158],m,[h,M,o],[1024,2,1]),e(i,P,U[159],p[159],m,[R,h],[32,1,1]),e(i,P,U[160],p[160],m,[h,R],[16,1,1]),e(i,P,U[161],p[161],m,[R,M,o,h,la],[128,256,4]),e(i,P,U[162],p[162],m,[o,R],[8192,1,1]),e(i,P,U[163],p[163],m,[h,o],[32,1,1]),e(i,P,U[164],p[164],m,[o,h],[16,1,1]),e(i,P,U[165],p[165],m,[h,R,o],[1024,2,1]),e(i,P,U[166],p[166],m,[M,h],[32,1,1]),e(i,P,U[167],p[167],m,[h,M],[16,1,1]),e(i,P,U[168],p[168],m,[M,R,o,h,ma],[128,256,4]),e(i,P,U[169],p[169],m,[o,M],[8192,1,1]),e(i,P,U[170],p[170],m,[h,o],[32,1,1]),e(i,P,U[171],p[171],m,[o,h],[16,1,1]),e(i,P,U[172],p[172],m,[h,M,o],[1024,2,1]),e(i,P,U[173],p[173],m,[R,h],[32,1,1]),e(i,P,U[174],p[174],m,[h,R],[16,1,1]),e(i,P,U[175],p[175],m,[R,M,o,h],[32768,16,1]),e(i,P,U[176],p[176],m,[o,R,Ra,ha],[32768,8,1]),e(i,P,U[177],p[177],m,[M,o],[32768,4,1]),e(i,P,U[178],p[178],m,[ya,o,M],[32768,4,1]),P.copyBufferToBuffer(ya,0,xa,0,ya.size),i.queue.submit([P.finish()]),yield xa.mapAsync(GPUMapMode.READ);const Ca=new Float32Array(xa.size/4);return Ca.set(new Float32Array(xa.getMappedRange())),xa.unmap(),[Ca]})});return{load:(i,A)=>j(null,null,function*(){return yield fetch(A).then(x=>x.arrayBuffer()).then(x=>z(i,new Uint8Array(x)))}),setupNet:z}})(),Gl=Object.freeze(Object.defineProperty({__proto__:null,default:Tl},Symbol.toStringTag,{value:"Module"})),Va=Object.assign({"./webgpu_runners/rodent_runner.js":Gl});function Ol(){return Object.keys(Va).map(l=>{const a=l.match(/\/([^\/]+)_runner\.js$/);return a?a[1]:null}).filter(Boolean)}function Ll(l){const a=`./webgpu_runners/${l}_runner.js`;if(Va[a])return Va[a];const t=l.toLowerCase();for(const[r,n]of Object.entries(Va))if(r.toLowerCase().includes(`/${t}_runner.js`))return n;for(const[r,n]of Object.entries(Va))if(r.includes(l))return n;return null}function Bl(l){const a=`./webgpu_runners/${l}_runner.js`;if(Va[a])return!0;const t=`/${l.toLowerCase()}_runner.js`;return Object.keys(Va).some(r=>r.toLowerCase().endsWith(t))}function Al(l,a){if(typeof Float16Array=="undefined")throw new Error("Float16Array unavailable: cannot cast fp32 master weights to fp16.");const t=new DataView(l.buffer,l.byteOffset,l.byteLength),r=Number(t.getBigUint64(0,!0)),n=JSON.parse(new TextDecoder("utf8").decode(l.subarray(8,8+r))),e=8+r;if(!Object.entries(n).some(([v,y])=>v!=="__metadata__"&&y.dtype==="F32"))return l;const s={},u=[];let c=0;for(const[v,y]of Object.entries(n)){if(v==="__metadata__"){s[v]=y;continue}const[C,w]=y.data_offsets,G=l.subarray(e+C,e+w);let k,I;if(y.dtype==="F32"){const z=new Float32Array(G.slice().buffer),K=new Float16Array(z);k=new Uint8Array(K.buffer),I="F16"}else k=G,I=y.dtype;s[v]={dtype:I,shape:y.shape,data_offsets:[c,c+k.byteLength]},u.push(k),c+=k.byteLength}const d=new TextEncoder().encode(JSON.stringify(s)),S=(8-d.byteLength%8)%8,b=new Uint8Array(8+d.byteLength+S+c);new DataView(b.buffer).setBigUint64(0,BigInt(d.byteLength+S),!0),b.set(d,8),b.fill(32,8+d.byteLength,8+d.byteLength+S);let g=8+d.byteLength+S;for(const v of u)b.set(v,g),g+=v.byteLength;return a&&a("Cast fp32 master weights -> fp16 for WebGPU.",.05),b}function Rl(l,a){try{const t=f=>!!(l.features&&l.features.has&&l.features.has(f)),r=l.limits||{},n=typeof navigator!="undefined"&&navigator.userAgent||"unknown",e=/Safari/.test(n)&&!/Chrome|Chromium|Android/.test(n);console.log("[SAFARI-DEBUG] ===== WebGPU device capabilities ====="),console.log("[SAFARI-DEBUG] model:",(a==null?void 0:a.modelName)||(a==null?void 0:a.webgpu_runner)||"(unknown)"),console.log("[SAFARI-DEBUG] userAgent:",n,"| classified Safari:",e),console.log("[SAFARI-DEBUG] shader-f16:",t("shader-f16")),console.log("[SAFARI-DEBUG] features:",l.features?Array.from(l.features):"(none)"),console.log("[SAFARI-DEBUG] limits:",{maxBufferSize:r.maxBufferSize,maxStorageBufferBindingSize:r.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:r.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.maxComputeWorkgroupSizeZ,maxComputeWorkgroupsPerDimension:r.maxComputeWorkgroupsPerDimension}),console.log("[SAFARI-DEBUG] BC_WEBGPU_DEBUG (logits readback):",typeof window!="undefined"&&!!window.BC_WEBGPU_DEBUG),console.log("[SAFARI-DEBUG] =======================================")}catch(t){console.warn("[SAFARI-DEBUG] capability dump failed:",t==null?void 0:t.message)}}function kl(l,a,t){return j(this,null,function*(){var d,S;Rl(l,a);let r=a.webgpu_runner,n=a.webgpu_safetensor;const e=!!(l.features&&l.features.has&&l.features.has("shader-f16"));let f=!1;a.forceFP32?(f=!0,console.log("[WebGPU] forceFP32: using fp32 runner and weights.")):e||(Bl(`${r}_f32`)?(f=!0,console.log("[WebGPU] shader-f16 not supported on this device -> auto-selecting fp32 runner and weights."),t("fp16 not supported - using fp32 WebGPU runner.",.05)):console.warn(`[WebGPU] shader-f16 not supported and no fp32 runner ('${r}_f32') available; the fp16 runner will likely fail and fall back to WebGL2.`)),f&&(r=`${r}_f32`,n=n.replace(".safetensors","_f32.safetensors")),a.enableTTA&&a.webgpuTTArunner&&(console.log("[WebGPU] TTA Enabled: Switching to TTA runner and weights."),r=`${r}_tta`,n=n.replace(".safetensors","_tta.safetensors"));const s=Ll(r);if(!s){const b=Ol();throw new Error(`Runner '${r}' not found. Available runners: ${b.join(", ")||"none"}. Looking in: ./webgpu_runners/`)}if(!s.setupNet&&!((d=s.default)!=null&&d.setupNet))throw new Error(`Runner module '${r}' doesn't export 'setupNet'. Exported keys: ${Object.keys(s).join(", ")}`);let u;try{const b=yield fetch(n);if(!b.ok)throw new Error(`HTTP ${b.status}: ${b.statusText}`);u=yield b.arrayBuffer()}catch(b){throw new Error(`Failed to load weights from '${n}': ${b.message}`)}const c=s.setupNet||((S=s.default)==null?void 0:S.setupNet);try{let b=new Uint8Array(u);return f||(b=Al(b,t)),yield c(l,b,t)}catch(b){throw new Error(`Failed to setup network for '${r}': ${b.message}`)}})}function Fl(l,a,t,r,n,e,f){return j(this,null,function*(){var g,v,y;f("Starting WebGPU inference...",0);const s=performance.now(),u=ot(t,ue.WEBGPU);u.isModelFullVol=!0;let c,d=[],S=null,b=!1;try{if(!l)throw new Error("WebGPU device is required but not provided");if(!(t!=null&&t.webgpu_runner))throw new Error("Model entry must specify webgpu_runner property");if(!(t!=null&&t.webgpu_safetensor))throw new Error("Model entry must specify webgpu_safetensor property");const C=t.webgpuStorageSize||335544320;if(l.limits){const B=Y=>(Y/1048576).toFixed(0),D=(g=l.limits.maxStorageBufferBindingSize)!=null?g:1/0,N=(v=l.limits.maxBufferSize)!=null?v:1/0;if(D<C||N<C){const Y=B(Math.min(D,N)),ta=B(C),Q=`[WebGPU] Device buffer limit (${Y} MB) is below the ${ta} MB this model needs - using WebGL2 fallback.`;throw console.warn(Q),f(Q,.1),new Error(Q)}}f("Preparing input data...",.1);let w=re(n,[256,256,256],"float32");const G=t.enableQuantileNorm?yield we(w):yield xe(w);if(w.dispose(),w=G,t.inputPermutation){console.log(`[WebGPU] Permuting Input: ${t.inputPermutation}`);const B=w.transpose(t.inputPermutation);w.dispose(),w=B}else if(t.enableTranspose){const B=w.transpose();w.dispose(),w=B}const k=yield w.data(),I=w.shape;w.dispose(),f("Input data prepared (full volume).",.3),f("Loading model runner...",.4),l&&(S=l.createBuffer.bind(l),l.createBuffer=B=>{const D=S(B);return d.push(D),D}),l.pushErrorScope("out-of-memory"),b=!0;const z=yield kl(l,t,f);if(typeof z!="function")throw new Error(`setupNet for '${t.webgpu_runner}' didn't return a function. Returned type: ${typeof z}`);f("Running inference...",.5);const K=yield z(k);b=!1;const i=yield l.popErrorScope();if(i)throw new Error(`WebGPU out of memory (${i.message||"allocation failed"}) - falling back to WebGL2.`);if(!K||!Array.isArray(K))throw new Error(`Inference didn't return expected array format. Returned: ${typeof K}`);const A=((performance.now()-s)/1e3).toFixed(4);f(`WebGPU inference took ${A}s.`,.9),console.log("Inference result shape:",(y=K[0])==null?void 0:y.length),c=wa(()=>{let B=re(K[0],I,"int32");t.outputPermutation?(console.log(`[WebGPU] Permuting Output: ${t.outputPermutation}`),B=B.transpose(t.outputPermutation)):t.enableTranspose&&(B=B.transpose());const D=Xt(B).dataSync()[0];if(console.log("Segmentation volume sum:",D),D===0)throw new Error("Segmentation resulted in all zeros (empty volume).");return B});const x=performance.now(),m=yield st(c,n,t,a),p=((performance.now()-x)/1e3).toFixed(4);e(m,a,t);const E=new Set(m).size,W=t.numClasses||E;Me(u,W,E),Ee(u,A,p),f(t.modelName+"<br>Segmentation finished.",1,"",u)}catch(C){if(console.error("WebGPU Inference Error:",C),b&&l){b=!1;try{yield l.popErrorScope()}catch(G){}}let w=C.message;throw C.message.includes("not found")?w+=". Check that the runner file exists and the name matches.":C.message.includes("fetch")?w+=". Check network connection and file paths.":C.message.includes("binding size")&&(w+=". GPU memory limit exceeded."),Xa(u,w,"WebGPU inference failed"),f("",-1,`WebGPU Error: ${w}`,u),C}finally{if(c&&c.dispose(),S&&l&&(l.createBuffer=S),d&&d.length>0){for(const C of d)C.destroy();d=[]}}})}const Qa=256,ae=.1,Il=[-1,-2,3];function Nl(l){const{dims:a,pixDims:t}=l.hdr;return a[1]===Qa&&a[2]===Qa&&a[3]===Qa&&[1,2,3].every(r=>Math.abs(t[r]-ae)<1e-4)&&l.permRAS.every((r,n)=>r===Il[n])}function zl(l){const{dims:a,affine:t}=l.hdr,r=(a[1]-1)/2,n=(a[2]-1)/2,e=(a[3]-1)/2,f=[0,1,2].map(c=>t[c][0]*r+t[c][1]*n+t[c][2]*e+t[c][3]),s=ae,u=(Qa-1)/2;return[[-s,0,0,f[0]+s*u],[0,-s,0,f[1]+s*u],[0,0,s,f[2]-s*u],[0,0,0,1]]}function ft(l,a){const t=e=>Bt($a(),e.flat()),r=Ue($a(),t(a)),n=Ye($a(),r,t(l));return[0,1,2].map(e=>[n[e],n[4+e],n[8+e],n[12+e]])}function Wl(l,a){return j(this,null,function*(){const{dims:t,scl_slope:r,scl_inter:n}=a.hdr,e=t[1],f=t[2],s=Math.max(1,t[3]),u=e*f,c=a.img,d=r!==1||n!==0,S=i=>d?c[i]*r+n:c[i],b=zl(a),g=ft(b,a.hdr.affine),v=Qa,y=new Float32Array(v*v*v),C=(i,A)=>{if(i<-.5||i>A-.5)return null;const x=Math.min(Math.max(i,0),A-1),m=Math.floor(x),p=Math.min(m+1,A-1);return[m,p,x-m]};let w=0;for(let i=0;i<v;i++)for(let A=0;A<v;A++)for(let x=0;x<v;x++,w++){const m=C(g[0][0]*x+g[0][1]*A+g[0][2]*i+g[0][3],e);if(!m)continue;const p=C(g[1][0]*x+g[1][1]*A+g[1][2]*i+g[1][3],f);if(!p)continue;const L=C(g[2][0]*x+g[2][1]*A+g[2][2]*i+g[2][3],s);if(!L)continue;const[E,W,B]=m,[D,N,Y]=p,[ta,Q,oa]=L,ba=ta*u,Sa=Q*u,X=D*e,ea=N*e,da=S(E+X+ba)*(1-B)+S(W+X+ba)*B,sa=S(E+ea+ba)*(1-B)+S(W+ea+ba)*B,ua=S(E+X+Sa)*(1-B)+S(W+X+Sa)*B,ga=S(E+ea+Sa)*(1-B)+S(W+ea+Sa)*B;y[w]=(da*(1-Y)+sa*Y)*(1-oa)+(ua*(1-Y)+ga*Y)*oa}const[G,k]=l.getScale(a,0,255),I=yield l.scalecropUint8(y,0,255,G,k),z=yield l.createNiftiArray([v,v,v],[ae,ae,ae],b.flat(),2,I),K=yield l.niftiArray2NVImage(z);return K.name=a.name,K})}function Dl(l,a,t,r,n){const e=a[t],f=t===0?1:t===1?a[0]:a[0]*a[1],s=l.length/(e*f),u=r+1,c=n?u:0,d=new Uint8Array(l.length),S=new Uint8Array(f);for(let b=0;b<s;b++){const g=b*e*f;for(let v=0;v<e;v++){const y=g+v*f;for(let C=0;C<f;C++){const w=v?d[y-f+C]:c;d[y+C]=l[y+C]?Math.min(w+1,u):0}}S.fill(c);for(let v=e-1;v>=0;v--){const y=g+v*f;for(let C=0;C<f;C++){const w=l[y+C]?Math.min(S[C]+1,u):0;S[C]=w,d[y+C]=d[y+C]===u&&w===u?1:0}}}return d}const ze=l=>{for(let a=0;a<l.length;a++)l[a]^=1;return l},ct=(l,a,t,r=!1)=>[0,1,2].reduce((n,e)=>Dl(n,a,e,t,r),l),$l=(l,a,t)=>ze(ct(ze(l.slice()),a,t,!0));function ql(l,a,t=4){if(t<=0)return l;const r=ct(l,a,t),[n,e]=new et().bwlabel(r,a,6,!0,!0);if(n===0)return l;const f=new Uint8Array(e.length);for(let c=0;c<e.length;c++)f[c]=e[c]?1:0;const s=$l(f,a,t),u=new Uint8Array(l.length);for(let c=0;c<l.length;c++)u[c]=l[c]&s[c];return u}function Te(){return j(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?"Opera":navigator.userAgent.indexOf("Edg/")>-1?"Edge":navigator.userAgent.indexOf("Falkon/")>-1?"Falkon":navigator.userAgent.indexOf("Chrome/")>-1?"Chrome":navigator.userAgent.indexOf("Firefox/")>-1?"Firefox":navigator.userAgent.indexOf("Safari/")>-1?"Safari":navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?"IExplorer":"Unknown"})}function Vl(){return j(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?parseInt(navigator.userAgent.split("OPR/")[1]):navigator.userAgent.indexOf("Edg/")>-1?parseInt(navigator.userAgent.split("Edg/")[1]):navigator.userAgent.indexOf("Falkon/")>-1?parseInt(navigator.userAgent.split("Falkon/")[1]):navigator.userAgent.indexOf("Chrome/")>-1?parseInt(navigator.userAgent.split("Chrome/")[1]):navigator.userAgent.indexOf("Firefox/")>-1?parseInt(navigator.userAgent.split("Firefox/")[1]):navigator.userAgent.indexOf("Safari/")>-1?parseInt(navigator.userAgent.split("Safari/")[1]):navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?parseInt(navigator.userAgent.split("MSIE/")[1]):1/0})}function Yl(){return j(this,null,function*(){return navigator.userAgent.indexOf("Win")>-1?"Windows":navigator.userAgent.indexOf("Mac")>-1?"MacOS":navigator.userAgent.indexOf("Linux")>-1?"Linux":navigator.userAgent.indexOf("UNIX")>-1?"UNIX":"Unknown"})}function jl(l){return j(this,null,function*(){return l?(console.log("WebGl2 is enabled"),!0):(console.log(typeof WebGL2RenderingContext!="undefined"?"WebGL2 may be disabled. Please try updating video card drivers":"WebGL2 is not supported"),!1)})}function Xl(l){return j(this,null,function*(){let a;if(l&&(a=l.getExtension("WEBGL_debug_renderer_info"),a)){const t=l.getParameter(a.UNMASKED_VENDOR_WEBGL);return t.indexOf("(")>-1&&t.indexOf(")")>-1?t.substring(t.indexOf("(")+1,t.indexOf(")")):t}return null})}function Hl(l){return j(this,null,function*(){if(l){const a=l.getExtension("WEBGL_debug_renderer_info");return a?l.getParameter(a.UNMASKED_VENDOR_WEBGL):null}else return null})}function Kl(l){return j(this,null,function*(){if(l){if(Te()==="Firefox")return l.getParameter(l.RENDERER);const a=l.getExtension("WEBGL_debug_renderer_info");return a?l.getParameter(a.UNMASKED_RENDERER_WEBGL):null}else return null})}function Zl(l){return j(this,null,function*(){let a;if(l){if(Te()==="Firefox")return l.getParameter(l.RENDERER);if(a=l.getExtension("WEBGL_debug_renderer_info"),a){let t=l.getParameter(a.UNMASKED_RENDERER_WEBGL);return t.indexOf("(")>-1&&t.indexOf(")")>-1&&t.indexOf("(R)")===-1&&(t=t.substring(t.indexOf("(")+1,t.indexOf(")")),t.split(",").length===3)?t.split(",")[1].trim():t}}return null})}function Jl(){return j(this,null,function*(){return navigator.hardwareConcurrency})}function Ql(){return j(this,null,function*(){return/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)})}function ai(l,a=null){return j(this,null,function*(){const t=new Date;if(l.isModelFullVol?l.Brainchop_Ver="FullVolume":l.Brainchop_Ver="SubVolumes",l.Total_t=(Date.now()-l.startTime)/1e3,delete l.startTime,l.Date=parseInt(t.getMonth()+1)+"/"+t.getDate()+"/"+t.getFullYear(),l.Browser=yield Te(),l.Browser_Ver=yield Vl(),l.OS=yield Yl(),l.WebGL2=yield jl(a),l.GPU_Vendor=yield Xl(a),l.GPU_Card=yield Zl(a),l.GPU_Vendor_Full=yield Hl(a),l.GPU_Card_Full=yield Kl(a),l.CPU_Cores=yield Jl(),l.Which_Brainchop="latest",(yield Ql())&&(l.Heap_Size_MB=window.performance.memory.totalJSHeapSize/(1024*1024).toFixed(2),l.Used_Heap_MB=window.performance.memory.usedJSHeapSize/(1024*1024).toFixed(2),l.Heap_Limit_MB=window.performance.memory.jsHeapSizeLimit/(1024*1024).toFixed(2)),a){console.log("MAX_TEXTURE_SIZE :",a.getParameter(a.MAX_TEXTURE_SIZE)),console.log("MAX_RENDERBUFFER_SIZE :",a.getParameter(a.MAX_RENDERBUFFER_SIZE));const r=a.getExtension("WEBGL_debug_renderer_info");console.log("VENDOR WEBGL:",a.getParameter(r.UNMASKED_VENDOR_WEBGL)),l.Texture_Size=a.getParameter(a.MAX_TEXTURE_SIZE)}else l.Texture_Size=null;return l})}function ei(l){return new Worker(""+new URL("brainchop-webworker-CSW4Mvfv.js",import.meta.url).href,{name:l==null?void 0:l.name})}const We=.5,De=8,$e=(l,a,t)=>Math.min(t,Math.max(a,l)),qe=l=>Math.hypot(l[0].clientX-l[1].clientX,l[0].clientY-l[1].clientY);function dt(l){l!=null&&l.scene&&(l.scene.pan2Dxyzmm=[0,0,0,1],l.scene.volScaleMultiplier=1,l.drawScene()),ti()}function ti(){const l=document.querySelector('meta[name="viewport"]');if(!l)return;const a=l.getAttribute("content")||"width=device-width, initial-scale=1.0";/maximum-scale/.test(a)||(l.setAttribute("content",`${a}, maximum-scale=1, user-scalable=no`),requestAnimationFrame(()=>requestAnimationFrame(()=>l.setAttribute("content",a))))}function li(){const l=a=>a.preventDefault();for(const a of["gesturestart","gesturechange","gestureend"])document.addEventListener(a,l,{passive:!1});document.addEventListener("touchmove",a=>{a.touches.length>1&&a.preventDefault()},{passive:!1})}function ii(l){const a=l.canvas;if(!a)return;let t=null;const r=e=>{var d;if(e.touches.length!==2){t=null;return}const f=a.getBoundingClientRect(),s=(e.touches[0].clientX+e.touches[1].clientX)/2-f.left,u=(e.touches[0].clientY+e.touches[1].clientY)/2-f.top,c=((d=l.uiData)==null?void 0:d.dpr)||1;t={dist:Math.max(1,qe(e.touches)),zoom:l.scene.pan2Dxyzmm[3]||1,pan:Array.from(l.scene.pan2Dxyzmm).slice(0,3),scale3d:l.scene.volScaleMultiplier||1,inRender:l.inRenderTile?l.inRenderTile(s*c,u*c)>=0:!1}},n=()=>{t=null};a.addEventListener("touchstart",r,{passive:!1}),a.addEventListener("touchend",n,{passive:!1}),a.addEventListener("touchcancel",n,{passive:!1}),l.handlePinchZoom=e=>{if(!t||!e.touches||e.touches.length!==2)return;const f=qe(e.touches)/t.dist;if(!isFinite(f)||f<=0)return;if(t.inRender){l.scene.volScaleMultiplier=$e(t.scale3d*f,We,De),l.drawScene();return}const s=$e(t.zoom*f,We,De),u=l.frac2mm(l.scene.crosshairPos),c=t.zoom-s;l.scene.pan2Dxyzmm=[t.pan[0]+c*u[0],t.pan[1]+c*u[1],t.pan[2]+c*u[2],s],l.opts.yoke3Dto2DZoom&&(l.scene.volScaleMultiplier=s),l.drawScene()}}function ri(l){return li(),ii(l),{resetView:()=>dt(l)}}const ni=720,si=860;function ui(){var n,e,f,s,u,c;const l=window.visualViewport,a=Math.round((e=(n=l==null?void 0:l.width)!=null?n:window.innerWidth)!=null?e:0),t=Math.round((s=(f=l==null?void 0:l.height)!=null?f:window.innerHeight)!=null?s:0);return a>0&&a<=ni?!0:!!((c=(u=window.matchMedia)==null?void 0:u.call(window,"(pointer: coarse)"))==null?void 0:c.matches)&&Math.min(a,t)<=si}function Ka(l,a,t,r,n,e){const f=t-n,s=r-e;if(!(f>0)||!(s>0)||!(l>0)||!(a>0))return 0;let u=f/l;return a*u>s&&(u=s/a),u}function oi(l){var w,G,k,I,z,K,i,A,x,m;const a=((I=(w=l.effectiveCanvasWidth)==null?void 0:w.call(l))!=null?I:(k=(G=l.gl)==null?void 0:G.canvas)==null?void 0:k.width)||0,t=((A=(z=l.effectiveCanvasHeight)==null?void 0:z.call(l))!=null?A:(i=(K=l.gl)==null?void 0:K.canvas)==null?void 0:i.height)||0;if(!a||!t)return null;let r=[1,1,1];try{const p=l.sliceScale();((x=p==null?void 0:p.volScale)==null?void 0:x.length)===3&&(r=p.volScale.slice())}catch(p){}l.opts.multiplanarEqualSize&&(r=[1,1,1]);const[n,e,f]=r,s=Math.max(n,e,f),u=((m=l.uiData)==null?void 0:m.dpr)||1,c=(parseFloat(`${l.opts.multiplanarPadPixels}`)||0)*u;let d=(l.opts.tileMargin||0)*u;d<0&&(d=2*(2+Math.ceil(l.fontPx||0)));const S=p=>(p-1)*c+p*d,b=p=>(p-1)*c+p*d,g=l.opts.multiplanarShowRender===At.ALWAYS||l.opts.multiplanarForceRender===!0,v=g?Ka(s,e+f+f+s,a,t,S(1),b(4)):Ka(s,e+f+f,a,t,S(1),b(3)),y=g?Ka(n+n+e+s,Math.max(e,f),a,t,S(4),b(1)):Ka(n+n+e,Math.max(e,f),a,t,S(3),b(1)),C=Ka(n+e,e+f,a,t,S(2),b(2));return[{layout:ve.GRID,name:"grid",scale:C},{layout:ve.COLUMN,name:"column",scale:v},{layout:ve.ROW,name:"row",scale:y}]}function fi(l){if(!(l!=null&&l.gl))return null;const a=oi(l);if(!a)return null;const t=a.reduce((n,e)=>e.scale>n.scale+1e-6?e:n),r=l.opts.multiplanarLayout!==t.layout;return l.opts.multiplanarLayout=t.layout,La(Ta({},t),{changed:r})}function ci(l){let a="";const t=l.drawScene.bind(l);l.drawScene=function(){var r,n,e;if(l.opts.sliceType===ja.MULTIPLANAR&&l.gl){const f=[l.gl.canvas.width,l.gl.canvas.height,l.opts.multiplanarShowRender,l.opts.multiplanarForceRender,l.opts.multiplanarEqualSize,(e=(n=(r=l.volumes)==null?void 0:r[0])==null?void 0:n.id)!=null?e:""].join("|");f!==a&&(a=f,fi(l))}return t()}}const me=[{id:"multi",label:"All",title:"All planes",type:ja.MULTIPLANAR},{id:"axial",label:"A",title:"Axial only",type:ja.AXIAL},{id:"coronal",label:"C",title:"Coronal only",type:ja.CORONAL},{id:"sagittal",label:"S",title:"Sagittal only",type:ja.SAGITTAL},{id:"render",label:"3D",title:"3D render only",type:ja.RENDER}];function di(l,a){const t=document.createElement("div");t.id="paneSwitcher",t.className="pane-switcher",t.setAttribute("role","group"),t.setAttribute("aria-label","Visible planes");for(const n of me){const e=document.createElement("button");e.type="button",e.dataset.pane=n.id,e.textContent=n.label,e.title=n.title,e.setAttribute("aria-label",n.title),e.addEventListener("click",()=>vt(l,t,n.id)),t.appendChild(e)}const r=document.createElement("button");return r.type="button",r.className="pane-reset",r.textContent="⟲",r.title="Reset zoom and pan",r.setAttribute("aria-label","Reset zoom and pan"),r.addEventListener("click",()=>dt(l)),t.appendChild(r),a.appendChild(t),t}function vt(l,a,t){const r=me.find(n=>n.id===t)||me[0];l.setSliceType(r.type),a.querySelectorAll("button").forEach(n=>n.classList.toggle("active",n.dataset.pane===r.id))}function vi(l){var f;const a=document.getElementById("canvas-container")||document.body,t=di(l,a);t.querySelector('button[data-pane="multi"]').classList.add("active"),ci(l);let r=0;const n=()=>{r=0,document.body.classList.toggle("nv-narrow",ui());const s=l.canvas,u=l.opts.forceDevicePixelRatio===0?window.devicePixelRatio||1:l.opts.forceDevicePixelRatio<0?1:l.opts.forceDevicePixelRatio;s&&l.opts.isResizeCanvas!==!1&&(Math.abs(s.width-s.offsetWidth*u)>1||Math.abs(s.height-s.offsetHeight*u)>1)?l.resizeListener():l.drawScene()},e=()=>{r||(r=requestAnimationFrame(n))};return window.addEventListener("resize",e),window.addEventListener("orientationchange",e),(f=window.visualViewport)==null||f.addEventListener("resize",e),typeof ResizeObserver!="undefined"&&new ResizeObserver(e).observe(a),n(),{refresh:e,setPane:s=>vt(l,t,s)}}let gt=null,ee=!1,he=null,Za=!1,fe=[];const bt=new URLSearchParams(window.location.search).get("backend")==="webgl2";function gi(){return j(this,null,function*(){const l={secureContext:window.isSecureContext,navigatorGpuExists:"gpu"in navigator,adapterObtained:!1,deviceObtained:!1,f16Support:!1,error:null};if(window.isSecureContext||(console.warn("WebGPU requires a secure context (HTTPS or localhost)."),console.warn("Current origin:",window.location.origin)),"gpu"in navigator)try{console.log("Requesting WebGPU adapter...");const a=yield navigator.gpu.requestAdapter();if(a){l.adapterObtained=!0,console.log("WebGPU adapter obtained:",a),a.info&&console.log("Adapter info:",a.info),console.log("Adapter limits:",{maxBufferSize:a.limits.maxBufferSize,maxStorageBufferBindingSize:a.limits.maxStorageBufferBindingSize,maxComputeWorkgroupsPerDimension:a.limits.maxComputeWorkgroupsPerDimension});const t={maxBufferSize:a.limits.maxBufferSize,maxStorageBufferBindingSize:a.limits.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:a.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:a.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:a.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:a.limits.maxComputeWorkgroupSizeZ,maxComputeWorkgroupStorageSize:a.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:a.limits.maxComputeWorkgroupsPerDimension},r=a.features.has("shader-f16");l.f16Support=r;const n=r?["shader-f16"]:[];gt=yield a.requestDevice({requiredLimits:t,requiredFeatures:n}),l.deviceObtained=!0,ee=!0,console.log(`✓ WebGPU initialized successfully. F16: ${r?"enabled":"not available"}`)}else console.warn("WebGPU adapter request returned null."),console.warn("This typically means:"),console.warn("  - Safari: WebGPU feature flags not enabled in Settings > Feature Flags"),console.warn("  - Unsupported GPU hardware"),console.warn("  - GPU drivers need updating"),l.error="Adapter returned null"}catch(a){l.error=a.message,console.error("WebGPU initialization error:",a),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(console.warn("Safari detected. To enable WebGPU:"),console.warn("  1. Open Safari Settings/Preferences"),console.warn('  2. Go to Advanced tab, enable "Show features for web developers"'),console.warn("  3. Go to Feature Flags tab"),console.warn("  4. Enable: WebGPU, GPU Process: DOM Rendering, GPU Process: Canvas Rendering"),console.warn("  5. Restart Safari"))}else console.warn("navigator.gpu not found. WebGPU API is not available in this browser."),l.error="navigator.gpu not found",navigator.userAgent.includes("Firefox")&&(console.warn("Firefox detected. To enable WebGPU in about:config:"),console.warn("  1. Set dom.webgpu.enabled = true"),console.warn("  2. Set gfx.webgpu.ignore-blocklist = true"),console.warn("  3. Restart Firefox"));return bi(ee&&!bt,l),ee||console.log("Falling back to WebGL backend."),window.webgpuDiagnostics=l,l})}function bi(l,a){const t=document.getElementById("backendStatus");if(!t){console.log("Backend status element not found in DOM");return}if(l){const r=a.f16Support?" (F16)":"";t.textContent=`WebGPU${r}`,t.style.color="#4CAF50",t.title="WebGPU backend active - fastest performance"}else{t.textContent="WebGL",t.style.color="#FF9800";let r="WebGL backend (fallback)";a.error&&(r+=`
Reason: ${a.error}`),a.secureContext||(r+=`
⚠ Not a secure context (HTTPS required)`),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(r+=`

To enable WebGPU in Safari:
1. Settings > Feature Flags
2. Enable WebGPU flags
3. Restart Safari`),navigator.userAgent.includes("Firefox")&&(r+=`

To enable WebGPU in Firefox:
1. about:config > dom.webgpu.enabled = true
2. gfx.webgpu.ignore-blocklist = true
3. Restart Firefox`),t.title=r}}function pi(){return j(this,null,function*(){let l="",a="",t,r=null,n=null;const e="altKey";let f=null,s=null,u=null;const c=.9;let d=null,S=!1;const b=document.getElementById("sampleSelect"),g=document.getElementById("maskToggle"),v=document.getElementById("modelRunButton");let y=null,C=null,w=null;function G(){y==null||y.invalidate(),C=null,w=null,y==null||y.updateAvailability(),he=null,g&&(g.checked=!1,g.disabled=!0)}const k=document.getElementById("dragSegmented");k&&k.querySelectorAll("button").forEach(_=>{_.onclick=()=>{O.opts.dragMode=parseInt(_.dataset.drag,10),k.querySelectorAll("button").forEach(T=>T.classList.toggle("active",T===_))}});const I=document.getElementById("drawBtn"),z=document.getElementById("drawPopover"),K=document.getElementById("penRow"),i=document.getElementById("drawApplyRow");function A(_){z&&(z.hidden=!_,I&&I.setAttribute("aria-expanded",String(_)))}function x(_){O.setDrawingEnabled(_>=0),_>=0&&O.setPenValue(_&7,_>7),K&&K.querySelectorAll(".chip").forEach(T=>T.classList.toggle("active",parseInt(T.dataset.pen,10)===_))}function m(_){return j(this,null,function*(){if(O.volumes.length<2){window.alert("No segmentation open (run a model first).");return}if(y!=null&&y.active)return;if(_===0){O.drawUndo();return}if(!O.drawBitmap){window.alert("Nothing drawn yet — pick a pen and draw on the image first.");return}const T=O.volumes[1].img,$=yield O.volumes[0].saveToDisk("",O.drawBitmap),q=352,aa=T.length;if(_===1)for(let F=0;F<aa;F++)$[q+F]>0&&(T[F]=1);if(_===2)for(let F=0;F<aa;F++)$[q+F]>0&&(T[F]=0);if(C&&(g!=null&&g.checked)){C.set(T);for(let F=0;F<aa;F++)w[F]=O.volumes[0].img[F]*C[F]}else if(C)for(let F=0;F<aa;F++)$[q+F]>0&&(C[F]=_===1?1:0,w[F]=O.volumes[0].img[F]*C[F]);y==null||y.invalidate(),O.closeDrawing(),O.updateGLVolume(),O.setDrawingEnabled(!1),x(-1)})}I&&(I.onclick=_=>{_.stopPropagation(),A(z.hidden)}),K&&K.querySelectorAll(".chip").forEach(_=>{_.onclick=()=>x(parseInt(_.dataset.pen,10))}),i&&i.querySelectorAll(".chip").forEach(_=>{_.onclick=()=>m(parseInt(_.dataset.apply,10))}),document.addEventListener("click",_=>{!z||z.hidden||_.target.closest(".popover-wrap")||A(!1)}),document.addEventListener("keydown",_=>{_.key==="Escape"&&A(!1)});const p=document.getElementById("appDialog");p&&p.addEventListener("click",_=>{_.target===p&&p.close()}),aboutBtn.onclick=function(){Fa("About Brainchomp",`
      <div style="text-align: left; font-size: 0.95em;">
        <p><strong>🔒 Privacy First</strong><br>
        Brainchomp runs entirely <strong>locally in your browser</strong>. Your imaging data never leaves your device.</p>

        <p><strong>⌨️ Controls</strong><br>
        • <strong>Drag & Drop</strong> a rodent NIfTI file to open.<br>
        • Use the <strong>example selector</strong> to switch between the bundled rodent MRI and mask.<br>
        • Press <strong>C</strong> to cycle the clip-plane.<br>
        • Press <strong>V</strong> to cycle through views.</p>

        <p><strong>🐭 Rodent brain extraction</strong><br>
        Skull-strip runs the 16-channel MeshNet once. Use the <strong>Mask</strong>
        toggle to switch the overlay between the extracted brain and its
        post-processed binary mask. The Save menu offers both outputs.</p>
        
        <p><em>Inputs of any size or orientation are resampled to 256³ at 0.1 mm (LPS) before inference; saved masks and brains are written back on the original grid.</em></p>
      </div>
    `)},diagnosticsBtn.onclick=function(){let _=l;if(_.length<1&&window.webgpuDiagnostics){const $=window.webgpuDiagnostics;_=`:: Startup Diagnostics ::
`,_+=`Secure Context: ${$.secureContext}
`,_+=`WebGPU Enabled: ${ee}
`,_+=`F16 Support: ${$.f16Support}
`,$.error&&(_+=`Error: ${$.error}
`),_+=`User Agent: ${navigator.userAgent}
`}if(_.length<1&&window.webgpuDiagnostics,_.length<1){Fa("Diagnostics","No diagnostic string generated: run a model to create diagnostics");return}let T=_;a=a.slice(0,-2),a!==""&&T.includes("Status: OK")&&(T=T.replace("Status: OK",`Status: ${a}`)),a="",navigator.clipboard.writeText(T).then(()=>{Fa("Diagnostics",`<p>Diagnostics copied to clipboard</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${T}</pre>`)}).catch($=>{Fa("Diagnostics",`<p>Failed to copy to clipboard.</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${T}</pre>`)})},opacitySlider0.oninput=function(){O.setOpacity(0,opacitySlider0.value/255),O.updateGLVolume()},opacitySlider1.oninput=function(){if(y!=null&&y.active){O.setDrawOpacity(opacitySlider1.value/255);return}O.setOpacity(1,opacitySlider1.value/255)};function L(){return j(this,null,function*(){const _=O.volumes[0];if(Nl(_))return;h("Conforming input to 256³ at 0.1 mm…",0),yield new Promise($=>setTimeout($,30));const T=yield Wl(O,_);S=!0;try{yield O.removeVolume(_),O.addVolume(T)}finally{S=!1}})}function E(){return j(this,null,function*(){for(;O.volumes.length>1;)yield O.removeVolume(O.volumes[1])})}function W(){return O.volumes.length>=2&&O.volumes[1].colormapLabel?O.volumes[1]:null}function B(){f=null,s=null,u=null}function D(){const _=W();if(_){if(s===null&&(s=_.img),f===null)_.img=s,u=null;else{const T=s,$=new T.constructor(T.length);for(let q=0;q<T.length;q++)$[q]=T[q]===f?f:0;_.img=$,u=N(f)}O.updateGLVolume()}}function N(_){const T=O.volumes[0],$=s||O.volumes[1]&&O.volumes[1].img;if(!T||!$)return null;const q=T.hdr.pixDims||[],aa=q[1]&&q[2]&&q[3]?q[1]*q[2]*q[3]:1,F=Ua(T.img,$,aa),na=F.reduce((ia,va)=>ia+va.volume_mm3,0),J=F.find(ia=>ia.label===_);if(!J)return null;const H=na>0?J.volume_mm3/na*100:0,V=[J.name,`${la(J.volume_mm3)} cm3   (${H.toFixed(1)}% of brain)`,`${J.voxels.toLocaleString()} voxels`,`intensity  ${J.mean.toFixed(0)} +/- ${J.stdev.toFixed(0)}`];let Z=[1,1,1,1];if(n&&n.R&&n.R[_]!=null){const ia=va=>Math.min(255,va*.55+130)/255;Z=[ia(n.R[_]),ia(n.G[_]),ia(n.B[_]),1]}return{lines:V,color:Z}}function Y(){if(f===null||!u||!W())return;const _=O.screenSlices&&O.screenSlices.find(va=>va.axCorSag===4);if(!_)return;const[T,$]=_.leftTopWidthHeight,q=O.gl;q.viewport(0,0,q.canvas.width,q.canvas.height),q.enable(q.BLEND);const F=O.fontPx*c*1.55,na=O.fontPx*.6,J=T+na,H=$+na,V=[.92,.92,.92,1],{lines:Z,color:ia}=u;O.drawText([J,H],Z[0],c,ia);for(let va=1;va<Z.length;va++)O.drawText([J,H+va*F],Z[va],c,V)}function ta(){const _=W();if(!_)return null;const T=O.frac2mm(O.scene.crosshairPos,0,!0),$=_.mm2vox(T),q=_.img;s&&(_.img=s);const aa=Math.round(_.getValue($[0],$[1],$[2],_.frame4D));return _.img=q,aa}function Q(_){y!=null&&y.active||W()&&(f=_===0||_===f?null:_,D())}function oa(_){if(!_[e]||!W())return;const T=ta();T===null||Number.isNaN(T)||(Q(T),_.preventDefault())}function ba(){return j(this,null,function*(){if(!(Za||y!=null&&y.active)){Za=!0,y==null||y.updateAvailability(),v&&(v.disabled=!0),fe=[];try{yield Sa()}catch(_){console.error("Inference could not start:",_),Fa("Input not supported",Ja((_==null?void 0:_.message)||String(_)))}finally{Za=!1,y==null||y.updateAvailability(),v&&(v.disabled=!1)}}})}function Sa(){return j(this,null,function*(){const _=modelSelect.value;if(_==="-1"||modelSelect.selectedIndex<0)return;yield E(),B(),yield L();const T=Na[_],$=Ta({},sl),q=new URL("./",window.location.href).href;$.rootURL=q.endsWith("/")?q.slice(0,-1):q;const aa=O.volumes[0].img;if(ee&&!bt&&T.webgpu_safetensor){console.log("Attempting WebGPU backend...");const H=La(Ta({},T),{enableTTA:!1});try{yield Fl(gt,$,H,O.volumes[0].hdr,aa,ya,h);return}catch(V){console.error("WebGPU inference failed, falling back to WebWorker.",V)}}if(T.webgpu_safetensor)try{const{runInferenceWebGl2:H,nativeWebgl2Available:V}=yield xt(()=>j(null,null,function*(){const{runInferenceWebGl2:Z,nativeWebgl2Available:ia}=yield import("./inference-webgl2-DGjvxGXZ.js");return{runInferenceWebGl2:Z,nativeWebgl2Available:ia}}),[],import.meta.url);if(V()){console.log("Attempting native WebGL2 runner..."),yield H($,T,O.volumes[0].hdr,aa,ya,h);return}console.log("Native WebGL2 unavailable here (no OffscreenCanvas/webgl2); using the tfjs worker.")}catch(H){console.warn("Native WebGL2 declined or failed, falling back to the tfjs worker.",H.message)}if(console.log("Attempting WebWorker backend..."),typeof t!="undefined"){console.log("Worker is busy. Please wait.");return}const F={dims:O.volumes[0].hdr.dims,datatypeCode:O.volumes[0].hdr.datatypeCode},na=H=>new Promise((V,Z)=>{const ia=La(Ta({},$),{enableSeqConv:H}),va=La(Ta({},T),{enableSeqConv:H,enableTTA:!1});t=new ei({}),t.postMessage({opts:ia,modelEntry:va,niftiHeader:F,niftiImage:aa}),t.onmessage=function(Ma){const{cmd:Ga,message:Wa,progressFrac:Oa,modalMessage:fa,statData:Ea,img:Da,opts:te,modelEntry:le}=Ma.data;if(Ga==="ui"){if(fa){if(t.terminate(),t=void 0,Ea&&Ea.Status==="Fail"){Z(new Error(Ea.Error_Type||fa));return}if(typeof fa=="string"&&(fa.toLowerCase().includes("fail")||fa.toLowerCase().includes("error")||fa.toLowerCase().includes("compatible")||fa.toLowerCase().includes("texture")||fa.toLowerCase().includes("maximum"))){Z(new Error(fa));return}}h(Wa,Oa,fa,Ea)}Ga==="img"&&(t.terminate(),t=void 0,ya(Da,te,le),V())},t.onerror=function(Ma){console.error("WebWorker failed",Ma),t.terminate(),t=void 0,Z(Ma)}});try{console.log("Attempting WebWorker with enableSeqConv: false"),yield na(!1);return}catch(H){console.warn("WebWorker (fast) failed, retrying with enableSeqConv: true",H),typeof t!="undefined"&&(t.terminate(),t=void 0),console.log("Waiting 1000ms for WebGL context cleanup..."),yield new Promise(V=>setTimeout(V,1e3));try{console.log("Attempting WebWorker with enableSeqConv: true"),yield na(!0);return}catch(V){console.error("WebWorker (slow) failed, falling back to Main Thread.",V)}}console.log("Attempting Main Thread backend...");const J=H=>new Promise((V,Z)=>{const ia=La(Ta({},$),{enableSeqConv:H}),va=La(Ta({},T),{enableSeqConv:H}),Ma=(Wa,Oa,fa,Ea)=>{Ea&&Ea.Status==="Fail"?Z(new Error(Ea.Error_Type||fa||"Inference Failed")):fa&&typeof fa=="string"&&(fa.toLowerCase().includes("fail")||fa.toLowerCase().includes("error")||fa.toLowerCase().includes("compatible")||fa.toLowerCase().includes("texture")||fa.toLowerCase().includes("maximum"))&&Z(new Error(fa)),h(Wa,Oa,fa,Ea)},Ga=(Wa,Oa,fa)=>{ya(Wa,Oa,fa),V()};El(ia,va,O.volumes[0].hdr,aa,Ga,Ma).catch(Wa=>Z(Wa))});try{console.log("Attempting Main Thread with enableSeqConv: false"),yield J(!1)}catch(H){console.warn("Main Thread (fast) failed, retrying with enableSeqConv: true",H),yield new Promise(V=>setTimeout(V,100));try{console.log("Attempting Main Thread with enableSeqConv: true"),yield J(!0)}catch(V){console.error("Main Thread (slow) failed.",V),hi(V)}}})}modelSelect.onchange=ba,v&&(v.onclick=()=>{modelSelect.value="0",ba()}),g&&(g.onchange=()=>{C&&ha().catch(_=>{console.error("Could not switch result overlay:",_),Fa("Overlay error",Ja((_==null?void 0:_.message)||String(_)))})});function X(_){const T=W(),$=f!==null&&T&&s;$&&(T.img=s);try{return _()}finally{$&&D()}}function ea(_){return j(this,null,function*(){if(y!=null&&y.busy)return;if(!C||!w){window.alert("No result to save (run Skull-strip first).");return}if(d&&d!==O.volumes[0]){h("Reslicing to native space…",0),yield new Promise(aa=>setTimeout(aa,30));const $=ua(C),q=d.clone();if(_==="mask"){const aa=d.hdr.dims;q.hdr.dims=[3,aa[1],aa[2],aa[3],1,1,1,1],Object.assign(q.hdr,{scl_inter:0,scl_slope:1,cal_min:0,cal_max:1}),q.img=$,q.hdr.datatypeCode=2,q.hdr.numBitsPerVoxel=8,q.hdr.intent_code=1002,yield q.saveToDisk("brainmask.nii.gz")}else{const aa=q.img,F=$.length;for(let na=0;na<aa.length;na++)$[na%F]||(aa[na]=0);q.hdr.intent_code=0,yield q.saveToDisk("skull_stripped_brain.nii.gz")}h("Saved native-space result.",1);return}const T=yield O.volumes[0].clone();if(T.zeroImage(),Object.assign(T.hdr,{scl_inter:0,scl_slope:1}),_==="mask"){T.img=C,T.hdr.datatypeCode=2,T.hdr.numBitsPerVoxel=8,T.hdr.intent_code=1002,T.saveToDisk("brainmask.nii.gz");return}T.img=w,T.hdr.intent_code=0,T.saveToDisk("skull_stripped_brain.nii.gz")})}function da(){if(O.volumes.length<1){window.alert("No image loaded.");return}O.volumes[0].saveToDisk("input.nii.gz")}function sa(){return j(this,null,function*(){if(O.volumes.length<1){window.alert("No image loaded.");return}yield X(()=>j(null,null,function*(){yield O.saveDocument("brainchomp.nvd")}))})}function ua(_){const T=O.volumes[0],$=d.hdr.dims[1],q=d.hdr.dims[2],aa=d.hdr.dims[3],F=T.hdr.dims[1],na=T.hdr.dims[2],J=T.hdr.dims[3],H=ft(d.hdr.affine,T.hdr.affine),V=[H[0][0],H[1][0],H[2][0]],Z=[H[0][1],H[1][1],H[2][1]],ia=[H[0][2],H[1][2],H[2][2]],va=[];for(const Oa of[-.25,.25])for(const fa of[-.25,.25])for(const Ea of[-.25,.25])va.push([0,1,2].map(Da=>Oa*V[Da]+fa*Z[Da]+Ea*ia[Da]));const Ma=(Oa,fa,Ea)=>Oa>=0&&Oa<F&&fa>=0&&fa<na&&Ea>=0&&Ea<J?_[Oa+fa*F+Ea*F*na]:0,Ga=new Uint8Array($*q*aa);let Wa=0;for(let Oa=0;Oa<aa;Oa++)for(let fa=0;fa<q;fa++){let Ea=H[0][3]+fa*Z[0]+Oa*ia[0],Da=H[1][3]+fa*Z[1]+Oa*ia[1],te=H[2][3]+fa*Z[2]+Oa*ia[2];for(let le=0;le<$;le++){let Ge=0;for(const[pt,ht,yt]of va)Ma(Math.round(Ea+pt),Math.round(Da+ht),Math.round(te+yt))&&Ge++;Ga[Wa++]=Ge>=4?1:0,Ea+=V[0],Da+=V[1],te+=V[2]}}return Ga}const ga=[{act:()=>ea("brain"),title:"Skull-stripped brain",sub:"input intensities with background set to zero",need:"result"},{act:()=>ea("mask"),title:"Brain mask",sub:"binary mask, including accepted edits",need:"result"},{act:da,title:"Input volume",sub:"the 256³, 0.1 mm volume the model sees",need:"img"},{act:sa,title:"Scene",sub:"everything, as a .nvd document",need:"img"}];function pa(){const _=O.volumes.length>=1,T=!!C,$=F=>F==="result"?T:_,q=ga.map((F,na)=>{const J=$(F.need)?"":" disabled";return`<button type="button" class="save-opt${J}" data-i="${na}"${J?" disabled":""}>
        <span class="save-opt-title">${F.title}</span>
        <span class="save-opt-sub">${F.sub}</span>
      </button>`}).join("");Fa("Save",`<div class="save-options">${q}</div>`,{hideClose:!0,saveMode:!0});const aa=document.getElementById("dialogMessage");aa&&aa.querySelectorAll(".save-opt:not(.disabled)").forEach(F=>{F.onclick=()=>{const na=ga[parseInt(F.dataset.i,10)],J=document.getElementById("appDialog");J&&J.open&&J.close(),na.act()}})}const ca=document.getElementById("saveBtn");ca&&(ca.onclick=pa);function Ua(_,T,$){const aa=new Map,F=T.length;for(let H=0;H<F;H++){const V=T[H];if(V===0)continue;let Z=aa.get(V);Z||(Z={count:0,sum:0,sumSq:0,hist:new Float64Array(256)},aa.set(V,Z));const ia=_[H];Z.count++,Z.sum+=ia,Z.sumSq+=ia*ia,Z.hist[ia]++}const na=(H,V,Z)=>{const ia=Z*V;let va=0;for(let Ma=0;Ma<H.length;Ma++)if(va+=H[Ma],va>=ia)return Ma;return H.length-1},J=[];for(const[H,V]of[...aa.entries()].sort((Z,ia)=>Z[0]-ia[0])){const Z=V.sum/V.count,ia=Math.max(0,V.sumSq/V.count-Z*Z);let va=0,Ma=0;for(let Ga=0;Ga<V.hist.length;Ga++)if(V.hist[Ga]>0){va=Ga;break}for(let Ga=V.hist.length-1;Ga>=0;Ga--)if(V.hist[Ga]>0){Ma=Ga;break}J.push({label:H,name:r&&r[H]!=null?r[H]:`label_${H}`,voxels:V.count,volume_mm3:V.count*$,min:va,max:Ma,q1:na(V.hist,V.count,.25),median:na(V.hist,V.count,.5),q3:na(V.hist,V.count,.75),mean:Z,stdev:Math.sqrt(ia)})}return J}function za(_){const T=["label","name","voxels","volume_mm3","min","max","q1","median","q3","mean","stdev"],$=F=>Number.isInteger(F)?String(F):F.toFixed(6),q=F=>/[",\n]/.test(F)?`"${String(F).replace(/"/g,'""')}"`:String(F),aa=[T.join(",")];for(const F of _)aa.push([F.label,q(F.name),F.voxels,$(F.volume_mm3),F.min,F.max,F.q1,F.median,F.q3,$(F.mean),$(F.stdev)].join(","));return aa.join(`
`)+`
`}function Pa(_){const T=new Blob([za(_)],{type:"text/csv"}),$=URL.createObjectURL(T),q=document.createElement("a");q.href=$,q.download="mask_stats.csv",document.body.appendChild(q),q.click(),q.remove(),URL.revokeObjectURL($)}const _a=_=>String(_).replace(/[&<>"]/g,T=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[T]),la=_=>{const T=_/1e3;return T>=10?Math.round(T).toLocaleString():T.toFixed(1)};function ma(_,T){const $=Math.max(..._.map(F=>F.volume_mm3)),q=F=>n&&n.R&&n.R[F.label]!=null?`rgb(${n.R[F.label]},${n.G[F.label]},${n.B[F.label]})`:"#6b9bd1";let aa="";for(const F of _){const na=T>0?F.volume_mm3/T*100:0,J=$>0?F.volume_mm3/$*100:0,H=`<span class="stat-val" data-cm3="${la(F.volume_mm3)}" data-pct="${na.toFixed(1)}%">${la(F.volume_mm3)}</span>`,V=`<span class="stat-bar" style="width:${J.toFixed(2)}%;background:${q(F)}" data-w-abs="${J.toFixed(2)}" data-w-pct="${na.toFixed(2)}"></span>`,Z=(va,Ma)=>`<div><span class="k">${va}</span><span class="v">${Ma}</span></div>`,ia=Z("min",F.min)+Z("max",F.max)+Z("Q1",F.q1)+Z("Q3",F.q3)+Z("median",F.median)+Z("mean",F.mean.toFixed(2))+Z("SD",F.stdev.toFixed(2))+Z("voxels",F.voxels.toLocaleString());aa+=`
        <div class="stat-row" role="button" tabindex="0" data-label="${F.label}" style="cursor:pointer">
          <div class="stat-line">
            <span class="stat-name">${_a(F.name)}</span>
            <span class="stat-track">${V}</span>
            ${H}
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
          <span class="stat-total" id="statsUnitLabel">total ${la(T)} cm³</span>
        </div>
        <div class="stat-toggle">
          <button type="button" data-mode="cm3" class="active">cm³</button>
          <button type="button" data-mode="pct">% of total</button>
        </div>
        <div id="statsRows">${aa}</div>
        <div class="stat-actions">
          <button type="button" id="statsDownloadBtn">Download CSV</button>
        </div>
      </div>`}saveStatsBtn.onclick=function(){if(O.volumes.length<2){window.alert("No segmentation to measure (run a model first).");return}const _=O.volumes[0].img,T=s||O.volumes[1].img;if(!_||!T||_.length!==T.length){window.alert("Input and segmentation grids do not match.");return}const $=O.volumes[0].hdr.pixDims||[],q=$[1]&&$[2]&&$[3]?$[1]*$[2]*$[3]:1;let aa=Ua(_,T,q);if(aa.length===0){window.alert("No non-background labels found in the segmentation.");return}aa=aa.slice().sort((J,H)=>H.volume_mm3-J.volume_mm3);const F=aa.reduce((J,H)=>J+H.volume_mm3,0);Fa("Region volumes",ma(aa,F));const na=document.getElementById("statsPanel");na&&(na.querySelectorAll(".stat-toggle button").forEach(J=>{J.onclick=()=>{const H=J.dataset.mode;na.querySelectorAll(".stat-toggle button").forEach(V=>V.classList.toggle("active",V===J)),document.getElementById("statsUnitLabel").textContent=H==="pct"?"100% of segmented volume":`total ${la(F)} cm³`,na.querySelectorAll(".stat-row").forEach(V=>{const Z=V.querySelector(".stat-val"),ia=V.querySelector(".stat-bar");Z.textContent=H==="pct"?Z.dataset.pct:Z.dataset.cm3,ia.style.width=(H==="pct"?ia.dataset.wPct:ia.dataset.wAbs)+"%"})}}),na.querySelectorAll(".stat-row").forEach(J=>{const H=()=>{const V=J.querySelector(".stat-detail");V.style.display=V.style.display==="none"?"grid":"none"};J.onclick=H,J.onkeydown=V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),H())}}),na.querySelectorAll(".stat-iso").forEach(J=>{J.onclick=H=>{H.stopPropagation();const V=parseInt(J.closest(".stat-row").dataset.label,10);Number.isNaN(V)||Q(V);const Z=document.getElementById("appDialog");Z&&Z.open&&Z.close()}}),document.getElementById("statsDownloadBtn").onclick=()=>Pa(aa))};function Ra(){O.volumes.length===1&&!S&&(d=O.volumes[0]),opacitySlider0.oninput(),modelSelect.value="-1",O.volumes.length===1&&G()}function ha(){return j(this,null,function*(){if(!C||!w||!he)return;yield E(),B();const _=yield O.volumes[0].clone();if(_.zeroImage(),Object.assign(_.hdr,{scl_inter:0,scl_slope:1}),r=null,n=null,g!=null&&g.checked){_.img=C;const T=["Background","Brain Mask"];r=T.slice();const $=[0,217],q=[0,119],aa=[0,33];n={R:$,G:q,B:aa},_.setColormapLabel({R:$,G:q,B:aa,labels:T}),_.hdr.datatypeCode=2,_.hdr.numBitsPerVoxel=8,_.hdr.intent_code=1002}else _.img=w,_.hdr.intent_code=0,_.colormap=O.colormaps().includes("copper2")?"copper2":"actc";_.opacity=opacitySlider1.value/255,yield O.addVolume(_)})}function ya(_,T,$){return j(this,null,function*(){var na;y==null||y.invalidate(),he=$;const q=new Uint8Array(_.length);for(let J=0;J<_.length;J++)q[J]=_[J]!==0?1:0;const aa=O.volumes[0].hdr.dims.slice(1,4);C=ql(q,aa,(na=$.maskOpeningRadius)!=null?na:0),w=new O.volumes[0].img.constructor(_.length);const F=O.volumes[0].img;for(let J=0;J<_.length;J++)w[J]=F[J]*C[J];g&&(g.disabled=!1),yield ha(),y==null||y.updateAvailability()})}function o(_){return j(this,null,function*(){if(typeof _=="string")try{_=JSON.parse(_)}catch(T){console.error("Failed to parse telemetry data",T);return}_=yield ai(_,O.gl),l=`:: Diagnostics https://github.com/neuroneural/brainchop/issues ::
`;for(const T in _)_[T]!==null&&_[T]!==void 0&&(l+=`${T}: ${_[T]}
`)})}function h(_="",T=-1,$="",q=[]){_&&(console.log(_),document.getElementById("location").innerHTML=_),isNaN(T)?(memstatus.style.color="red",memstatus.innerHTML="Memory Issue"):T>=0&&(modelProgress.value=T*modelProgress.max),$&&(Za?(fe.push(String($)),console.warn("[backend]",$)):Fa("Message",Ja(String($)).replace(/\n/g,"<br>"))),q&&Object.keys(q).length>0&&o(q)}function M(_){document.getElementById("location").innerHTML=_.string.split("   ").map(T=>T.trim()).filter(T=>T!=="").map(T=>`<span class="loc-seg">${T}</span>`).join('<span class="loc-sep">&middot;</span>')}const R={backColor:[0,0,0,1],show3Dcrosshair:!0,onLocationChange:M},O=new Rt(R);yield O.attachTo("gl1"),y=nl({nv:O,getState:()=>C?{mask:C,dims:O.volumes[0].hdr.dims.slice(1,4),affine:O.volumes[0].hdr.affine,running:Za}:null,prepare:()=>j(null,null,function*(){B(),g.checked=!0,yield ha()}),onPatch:({rect:_})=>{const[T,$,q,aa]=_,[F,na,J]=O.volumes[0].hdr.dims.slice(1,4),H=O.volumes[0].img;for(let V=0;V<J;V++)for(let Z=$;Z<=aa;Z++)for(let ia=T;ia<=q;ia++){const va=ia+F*(Z+na*V);w[va]=H[va]*C[va]}},onError:_=>Fa("Sculpting",Ja(_.message))}),O.gl.canvas.addEventListener("click",oa),window.addEventListener("keydown",_=>{_.key!=="Escape"||f===null||document.querySelector("dialog[open]")||(f=null,D())});const xa=O.gl.uniform4fv.bind(O.gl);O.gl.uniform4fv=function(_,T){if(f!==null){const $=O.orientShaderAtlasU&&O.orientShaderAtlasU.uniforms.xyzaFrac,q=O.orientShaderAtlasI&&O.orientShaderAtlasI.uniforms.xyzaFrac;if($&&_===$||q&&_===q)return xa(_,[0,0,0,T[3]])}return xa(_,T)};const ka=O.drawSceneCore.bind(O);O.drawSceneCore=function(){const _=ka();try{Y()}catch(T){console.warn("isolation HUD draw failed",T)}return _},Object.assign(O.opts,{dragMode:O.dragModes.slicer3D,multiplanarForceRender:!0,yoke3Dto2DZoom:!0,crosshairGap:11});{const _=document.getElementById("dragSegmented");_&&_.querySelectorAll("button").forEach(T=>T.classList.toggle("active",parseInt(T.dataset.drag,10)===O.opts.dragMode))}O.setInterpolation(!0);function U(_){return j(this,null,function*(){for(G();O.volumes.length;)yield O.removeVolume(O.volumes[O.volumes.length-1]);B(),yield O.loadVolumes([{url:_}])})}O.onImageLoaded=Ra,b&&(b.onchange=()=>U(b.value),yield U(b.value)),modelSelect.innerHTML="";const ra=document.createElement("option");ra.text="Run Segmentation Model",ra.value="-1",ra.disabled=!0,ra.selected=!0,ra.hidden=!0,modelSelect.appendChild(ra);for(let _=0;_<Na.length;_++){console.log(`Adding model option: ${Na[_].modelName}`);const T=document.createElement("option");T.text=Na[_].modelName,T.value=_,Na[_].type==="Divider"&&(T.disabled=!0),modelSelect.appendChild(T)}vi(O),ri(O),modelSelect.value="-1",x(-1),yield gi();const Ca=new URLSearchParams(window.location.search).get("model");Ca&&Ca<Na.length&&(modelSelect.value=Ca,ba())})}function Ja(l){return String(l).replace(/[&<>"']/g,a=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[a])}function hi(l){const t=(fe.length?fe:[l&&l.message?l.message:String(l||"unknown error")]).map(r=>`<li>${Ja(r)}</li>`).join("");Fa("Segmentation failed",`<p>No available backend could run this model on this device.</p>
     <ul style="margin:0 0 4px 1.1em;padding:0;font-size:0.92em;line-height:1.45">${t}</ul>
     <p style="font-size:0.88em;color:#9aa4af">Full details are in the browser console and under Diagnostics.</p>`)}function Fa(l,a,t={}){const r=document.getElementById("appDialog"),n=document.getElementById("dialogTitle"),e=document.getElementById("dialogMessage"),f=document.getElementById("dialogCloseBtn");if(!r)return;n.textContent=l,e.innerHTML=a,f.style.display=t.hideClose?"none":"",f.onclick=()=>r.close(),r.classList.toggle("dialog-save",!!t.saveMode);const s=document.getElementById("dialogXBtn");s&&(s.onclick=()=>r.close()),r.showModal()}function yi(){return j(this,null,function*(){try{const a=yield(yield fetch("https://api.github.com/repos/neuroneural/brainchop")).json();document.getElementById("star-count").textContent=a.stargazers_count}catch(l){console.error("Error fetching star count:",l)}})}(function(){return j(this,null,function*(){yield pi(),yield yi()})})();
