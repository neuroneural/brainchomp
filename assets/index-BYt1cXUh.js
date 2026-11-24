import{W as us,X as fs,Y as sn,Z as kr,_ as ho,$ as ps,z as ur,b as Vt,O as Hn,E as ms,a0 as ds,K as gs,a1 as qr,a2 as hs,k as zn,u as _s,y as ws,i as _o,a3 as Ln}from"./vendor-math-DpLDVhy-.js";import{S as wn,a as bs,M as Xn,N as vs}from"./vendor-niivue-L8nm8kcR.js";import"./vendor-DcbF-JDf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function ys(e,t){let n=0,r=1;const o=[0,0,0];for(const s of t){const i=Math.abs(s)-1;o[i]=Math.sign(s)*r,s<0&&(n+=(e[i]-1)*r),r*=e[i]}return{offset:n,strides:o}}class xs{constructor(t){if(this.nv=t,this.volume=t.volumes[1],this.opacity=this.volume.opacity,this.drawOpacity=t.drawOpacity,this.drawLut=t.drawLut,!t.loadDrawing(this.volume))throw new Error("Could not align the mask with the slice grid.");t.drawClearAllUndoBitmaps(),t.setDrawingEnabled(!1);const n=t.drawLut.lut.slice();n.set([217,119,33,255],4),t.drawLut={...t.drawLut,lut:n},t.refreshColormaps(),t.setDrawOpacity(this.opacity),t.setOpacity(1,0),Object.assign(this,ys(this.volume.hdr.dims.slice(1,4),this.volume.permRAS))}patch({rect:t,data:n}){const[r,o,s,i]=t,a=s-r+1,l=i-o+1,[u,f,m]=this.strides,c=this.nv.drawBitmap,p=this.volume.hdr.dims[3];for(let d=0;d<p;d++)for(let _=o;_<=i;_++){let z=this.offset+r*u+_*f+d*m,w=a*(_-o+l*d);for(let g=r;g<=s;g++,z+=u)c[z]=n[w++]}this.nv.refreshDrawing(!0)}close(){const t=this.nv,n=t.drawOpacity;t.closeDrawing(),t.drawLut=this.drawLut,t.setDrawOpacity(this.drawOpacity),t.refreshColormaps(),t.volumes[1]===this.volume&&(this.volume.opacity=n,t.updateGLVolume())}}class $s{constructor(t){this.nv=t,this.canvas=document.createElement("canvas"),this.canvas.className="sculpt-slice-footprint",this.canvas.setAttribute("aria-hidden","true"),t.gl.canvas.parentElement.append(this.canvas),this.originalDraw=t.drawScene;const n=this;this.wrappedDraw=function(...r){const o=n.originalDraw.apply(this,r);return n.draw(),o},t.drawScene=this.wrappedDraw}set(t){this.brush=t?.tool==="scoop"?t:null,this.draw()}draw(){const{nv:t,canvas:n,brush:r}=this,o=t.gl.canvas;n.width!==o.width&&(n.width=o.width),n.height!==o.height&&(n.height=o.height);const s=n.getContext("2d");if(s.clearRect(0,0,n.width,n.height),!r)return;const i=(l,u)=>l.reduce((f,m,c)=>f+m*u[c],0),a=(l,u)=>l.map((f,m)=>f-u[m]);for(let l=0;l<t.screenSlices.length;l++){const u=t.screenSlices[l];if(u.axCorSag>2||u.AxyzMxy.length<4)continue;const[f,m,c,p]=u.leftTopWidthHeight,d=f+c*.5,_=m+p*.5,z=(q,J)=>Array.from(t.frac2mm(t.screenXY2TextureFrac(q,J,l,!1))).slice(0,3),w=z(d,_),g=a(z(d+1,_),w),x=a(z(d,_+1),w),P=i(g,g),$=i(g,x),y=i(x,x),C=P*y-$*$;if(C<1e-20)continue;const S=q=>{const J=a(q,w),E=i(J,g),Z=i(J,x);return[d+(E*y-Z*$)/C,_+(Z*P-E*$)/C]},h=[g[1]*x[2]-g[2]*x[1],g[2]*x[0]-g[0]*x[2],g[0]*x[1]-g[1]*x[0]].map(q=>q/Math.sqrt(C)),A=i(a(r.point,w),h);if(Math.abs(A)>r.radius)continue;const b=r.point.map((q,J)=>q-h[J]*A),M=Math.sqrt(r.radius**2-A**2),k=g.map(q=>q/Math.sqrt(P)),I=[h[1]*k[2]-h[2]*k[1],h[2]*k[0]-h[0]*k[2],h[0]*k[1]-h[1]*k[0]];s.save(),s.beginPath(),s.rect(Math.min(f,f+c),m,Math.abs(c),p),s.clip(),s.strokeStyle="#ff9876",s.lineWidth=1.5*n.width/o.clientWidth,s.beginPath();for(let q=0;q<=96;q++){const J=q*Math.PI/48,E=b.map((me,be)=>me+M*(k[be]*Math.cos(J)+I[be]*Math.sin(J))),Z=S(E);q===0?s.moveTo(...Z):s.lineTo(...Z)}s.stroke(),s.restore()}}close(){this.nv.drawScene===this.wrappedDraw&&(this.nv.drawScene=this.originalDraw),this.canvas.remove()}}function ks(e,t,n,r){const o=(c,p)=>c.map((d,_)=>d-p[_]),s=(c,p)=>c.reduce((d,_,z)=>d+_*p[z],0),i=o(n,t),a=o(r,t),l=o(e,t),u=s(i,l),f=s(a,l);let m;if(u<=0&&f<=0)m=[1,0,0];else{const c=o(e,n),p=s(i,c),d=s(a,c);if(p>=0&&d<=p)m=[0,1,0];else{const _=u*d-p*f;if(_<=0&&u>=0&&p<=0){const z=u/(u-p);m=[1-z,z,0]}else{const z=o(e,r),w=s(i,z),g=s(a,z);if(g>=0&&w<=g)m=[0,0,1];else{const x=w*f-u*g;if(x<=0&&f>=0&&g<=0){const P=f/(f-g);m=[1-P,0,P]}else{const P=p*g-w*d;if(P<=0&&d-p>=0&&w-g>=0){const $=(d-p)/(d-p+w-g);m=[0,1-$,$]}else{const $=P+x+_;if(Math.abs($)<1e-20)return null;const y=x/$,C=_/$;m=[1-y-C,y,C]}}}}}}return{point:t.map((c,p)=>c*m[0]+n[p]*m[1]+r[p]*m[2]),weights:m}}function Ss(e,t,n,r){let o=1/0,s=null;for(let i=0;i<n.length;i+=3){const a=n[i]*3,l=n[i+1]*3,u=n[i+2]*3;if(a===l||l===u||a===u)continue;let f=0;for(let _=0;_<3;_++){const z=Math.min(t[a+_],t[l+_],t[u+_]),w=Math.max(t[a+_],t[l+_],t[u+_]);f+=Math.max(z-e[_],0,e[_]-w)**2}if(f>=o)continue;const m=ks(e,Array.from(t.subarray(a,a+3)),Array.from(t.subarray(l,l+3)),Array.from(t.subarray(u,u+3)));if(!m)continue;const c=m.point.reduce((_,z,w)=>_+(z-e[w])**2,0);if(c>=o)continue;o=c;const p=[0,1,2].map(_=>m.weights[0]*r[a+_]+m.weights[1]*r[l+_]+m.weights[2]*r[u+_]),d=Math.hypot(...p)||1;s={point:m.point,normal:p.map(_=>_/d),distance:Math.sqrt(c)}}return s}function wo(e,t=[0,0,1]){const n=ur(Vt(),e);let r=Hn(Vt(),t,n);ms(r)<1e-5&&(r=Hn(r,[0,1,0],n)),ur(r,r);const o=Hn(Vt(),n,r);return kr(sn(),ds(sn(),gs(...r,...o,...n)))}function Or(){return wo([0,-Math.cos(.2),Math.sin(.2)])}function Ms(e,t,n){const r=Math.hypot(t,n);if(!r)return us(e);const o=fs(sn(),[n/r,t/r,0],r*.006);return kr(sn(),ho(sn(),e,o))}function Ps(e,t,n,r,o){const s=([a,l])=>{const u=Math.max(1,Math.min(r,o)),f=[(2*a-r)/u,(o-2*l)/u,0],m=Math.hypot(f[0],f[1]);return f[2]=m<Math.SQRT1_2?Math.sqrt(1-m*m):.5/Math.max(m,1e-6),ur(Vt(),f)},i=ps(sn(),s(n),s(t));return kr(sn(),ho(sn(),e,i))}function Yn(e,t){return[0,1,2].map(n=>e[n]*t[0]+e[n+4]*t[1]+e[n+8]*t[2]+e[n+12])}const Nr=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],As=(e,t)=>e.map((n,r)=>n-t[r]);function Dr(e){const t=Math.hypot(...e);return t>1e-15?e.map(n=>n/t):[0,0,1]}function Gr(e,t,n,r){const[o,s,i,a]=n,l=i-o+1,u=a-s+1;for(let f=0;f<t[2];f++)for(let m=s;m<=a;m++)e.set(r.subarray(l*(m-s+u*f),l*(m-s+u*f)+l),o+t[0]*(m+t[1]*f))}const zs=`#version 300 es
precision highp float;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
uniform mat4 affine, mvp;
out vec3 worldNormal;
void main(){worldNormal=normal;gl_Position=mvp*affine*vec4(position,1.0);}`,Bs=`#version 300 es
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
}`;class Cs{constructor(t,n,r,o){this.canvas=t,this.overlay=n,this.positions=r.positions,this.indices=r.indices,this.worldPositions=new Float32Array(r.positions.length);for(let c=0;c<r.positions.length;c+=3)this.worldPositions.set(Yn(o,r.positions.subarray(c,c+3)),c);this.normals=r.normals,this.affine=o;const s=t.getContext("webgl2",{antialias:!0,alpha:!1});if(!s)throw new Error("Sculpting requires WebGL2.");this.gl=s;const i=(c,p)=>{const d=s.createShader(c);if(s.shaderSource(d,p),s.compileShader(d),!s.getShaderParameter(d,s.COMPILE_STATUS))throw new Error(s.getShaderInfoLog(d));return d},a=i(s.VERTEX_SHADER,zs),l=i(s.FRAGMENT_SHADER,Bs),u=s.createProgram();if(s.attachShader(u,a),s.attachShader(u,l),s.linkProgram(u),!s.getProgramParameter(u,s.LINK_STATUS))throw new Error(s.getProgramInfoLog(u));s.deleteShader(a),s.deleteShader(l),this.program=u,this.uniforms=Object.fromEntries(["affine","mvp","picking","eyeDirection"].map(c=>[c,s.getUniformLocation(u,c)])),this.vao=s.createVertexArray(),s.bindVertexArray(this.vao),this.positionBuffer=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,this.positionBuffer),s.bufferData(s.ARRAY_BUFFER,r.positions,s.DYNAMIC_DRAW),s.enableVertexAttribArray(0),s.vertexAttribPointer(0,3,s.FLOAT,!1,0,0),this.normalBuffer=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,this.normalBuffer),s.bufferData(s.ARRAY_BUFFER,r.normals,s.DYNAMIC_DRAW),s.enableVertexAttribArray(1),s.vertexAttribPointer(1,3,s.FLOAT,!1,0,0),this.indexBuffer=s.createBuffer(),s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,this.indexBuffer),s.bufferData(s.ELEMENT_ARRAY_BUFFER,r.indices,s.STATIC_DRAW),this.count=r.indices.length;const f=[1/0,1/0,1/0],m=[-1/0,-1/0,-1/0];for(let c=0;c<r.positions.length;c+=3){const p=Yn(o,r.positions.subarray(c,c+3));for(let d=0;d<3;d++)f[d]=Math.min(f[d],p[d]),m[d]=Math.max(m[d],p[d])}this.center=f.map((c,p)=>(c+m[p])/2),this.target=this.center.slice(),this.scale=Math.hypot(...As(m,f))*.6,this.initialScale=this.scale,this.orientation=Or(),this.crosshair=null,this.crosshairOpacity=.45,this.cursor=null,this.framebuffer=s.createFramebuffer(),this.textures=[s.createTexture(),s.createTexture()],this.depth=s.createRenderbuffer(),this.observer=new ResizeObserver(()=>this.draw()),this.observer.observe(t),this.draw()}matrices(){this.direction=Array.from(qr(Vt(),[0,0,1],this.orientation));const t=qr(Vt(),[0,1,0],this.orientation),n=this.target.map((a,l)=>a+this.direction[l]*this.initialScale*4),r=hs(zn(),n,this.target,t),o=this.canvas.width/this.canvas.height,s=this.scale,i=_s(zn(),-s*o,s*o,-s,s,.001*this.initialScale,10*this.initialScale);this.mvp=ws(zn(),i,r),this.inverseMVP=_o(zn(),this.mvp)}resize(){const t=Math.min(2,window.devicePixelRatio||1),n=Math.max(1,Math.round(this.canvas.clientWidth*t)),r=Math.max(1,Math.round(this.canvas.clientHeight*t));if(this.canvas.width===n&&this.canvas.height===r)return;this.canvas.width=n,this.canvas.height=r,this.overlay.width=n,this.overlay.height=r;const o=this.gl;if(o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),this.textures.forEach((s,i)=>{o.bindTexture(o.TEXTURE_2D,s),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,n,r,0,o.RGBA,o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+i,o.TEXTURE_2D,s,0)}),o.bindRenderbuffer(o.RENDERBUFFER,this.depth),o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_COMPONENT24,n,r),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.RENDERBUFFER,this.depth),o.checkFramebufferStatus(o.FRAMEBUFFER)!==o.FRAMEBUFFER_COMPLETE)throw new Error("Could not allocate the surface picking buffer.");o.bindFramebuffer(o.FRAMEBUFFER,null)}render(t){const n=this.gl;n.useProgram(this.program),n.bindVertexArray(this.vao),n.viewport(0,0,this.canvas.width,this.canvas.height),n.enable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.disable(n.BLEND),n.uniformMatrix4fv(this.uniforms.affine,!1,this.affine),n.uniformMatrix4fv(this.uniforms.mvp,!1,this.mvp),n.uniform1i(this.uniforms.picking,t?1:0),n.uniform3fv(this.uniforms.eyeDirection,this.direction),n.drawElements(n.TRIANGLES,this.count,n.UNSIGNED_INT,0)}draw(){if(this.disposed)return;this.resize(),this.matrices();const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,null),t.disable(t.SCISSOR_TEST),t.clearColor(.035,.04,.045,1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),this.render(!1),this.drawCursor()}project(t){const n=Ln(Vt(),t,this.mvp);return[(n[0]+1)*this.overlay.width/2,(1-n[1])*this.overlay.height/2]}drawCursor(){this.onCursorChange?.(this.cursor);const t=this.overlay.getContext("2d");if(t.clearRect(0,0,this.overlay.width,this.overlay.height),this.drawCrosshair(t),!this.cursor)return;const{point:n,normal:r,radius:o,origin:s}=this.cursor,i=Dr(Nr(r,Math.abs(r[2])<.9?[0,0,1]:[0,1,0])),a=Nr(r,i),l=this.overlay.width/this.canvas.clientWidth;if(t.strokeStyle=this.cursor.tool==="scoop"?"#ff9876":this.cursor.tool==="smooth"?"#99e8b5":"#f5df42",this.cursor.tool==="scoop"){const u=this.project(n),f=o*this.overlay.height/(2*this.scale);t.lineWidth=1.5*l,t.beginPath(),t.arc(...u,f,0,Math.PI*2),t.stroke(),t.setLineDash([3*l,3*l])}t.lineWidth=1.7*l;for(const u of[1,.12]){t.beginPath();for(let f=0;f<=96;f++){const m=f*Math.PI/48,c=n.map((d,_)=>d+o*u*(i[_]*Math.cos(m)+a[_]*Math.sin(m))),p=this.project(c);f?t.lineTo(...p):t.moveTo(...p)}t.stroke()}t.setLineDash([]),this.cursor.locked&&this.crosshair&&(t.save(),t.globalAlpha=this.crosshairOpacity,t.setLineDash([2*l,4*l]),t.beginPath(),t.moveTo(...this.project(this.crosshair)),t.lineTo(...this.project(n)),t.stroke(),t.restore()),s&&(t.setLineDash([4*l,4*l]),t.beginPath(),t.moveTo(...this.project(s)),t.lineTo(...this.project(n)),t.stroke(),t.setLineDash([]))}drawCrosshair(t){if(!this.crosshair||this.crosshairOpacity===0)return;const n=this.overlay.width/Math.max(1,this.canvas.clientWidth),r=this.project(this.crosshair),o=this.scale*.09;t.save(),t.globalAlpha=this.crosshairOpacity,t.strokeStyle="#65dcff",t.lineWidth=1.4*n,t.shadowColor="#000",t.shadowBlur=3*n,t.setLineDash([4*n,3*n]);for(let s=0;s<3;s++){const i=this.crosshair.slice(),a=this.crosshair.slice();i[s]-=o,a[s]+=o,t.beginPath();const l=this.project(i),u=this.project(a);for(const f of[l,u]){const m=Math.hypot(f[0]-r[0],f[1]-r[1]);m<=5*n||(t.moveTo(...f),t.lineTo(r[0]+(f[0]-r[0])*5*n/m,r[1]+(f[1]-r[1])*5*n/m))}t.stroke()}t.setLineDash([]),t.beginPath(),t.arc(...r,4*n,0,Math.PI*2),t.stroke(),t.restore()}orbit(t,n){this.orientation=Ms(this.orientation,t,n),this.cursor=null,this.draw()}dragOrbit(t,n){const r=this.canvas.getBoundingClientRect();this.orientation=Ps(this.orientation,t.map((o,s)=>o-(s?r.top:r.left)),n.map((o,s)=>o-(s?r.top:r.left)),r.width,r.height),this.cursor=null,this.draw()}resetView(){this.target=this.center.slice(),this.scale=this.initialScale,this.orientation=Or(),this.cursor=null,this.draw()}pick(t,n){this.resize(),this.matrices();const r=this.gl,o=this.canvas.getBoundingClientRect(),s=Math.floor((t-o.left)*this.canvas.width/o.width),i=this.canvas.height-1-Math.floor((n-o.top)*this.canvas.height/o.height);if(s<0||i<0||s>=this.canvas.width||i>=this.canvas.height)return null;r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),r.drawBuffers([r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),r.enable(r.SCISSOR_TEST),r.scissor(s,i,1,1),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),this.render(!0);const a=new Uint8Array(4),l=new Uint8Array(4);if(r.readBuffer(r.COLOR_ATTACHMENT0),r.readPixels(s,i,1,1,r.RGBA,r.UNSIGNED_BYTE,a),r.readBuffer(r.COLOR_ATTACHMENT1),r.readPixels(s,i,1,1,r.RGBA,r.UNSIGNED_BYTE,l),r.disable(r.SCISSOR_TEST),r.bindFramebuffer(r.FRAMEBUFFER,null),!a[3])return null;const u=(a[0]+256*a[1]+65536*a[2]-1)/16777214;return{point:Array.from(Ln(Vt(),[(s+.5)/this.canvas.width*2-1,(i+.5)/this.canvas.height*2-1,u*2-1],this.inverseMVP)),normal:Dr([l[0]/255*2-1,l[1]/255*2-1,l[2]/255*2-1])}}patch(t){if(!t)return;this.revision=(this.revision||0)+1;const n=this.gl;if(n.bindVertexArray(this.vao),t.vertexLength>this.positions.length){for(const[o,s]of[["positions",this.positionBuffer],["normals",this.normalBuffer]]){const i=new Float32Array(t.vertexLength);i.set(this[o]),this[o]=i,n.bindBuffer(n.ARRAY_BUFFER,s),n.bufferData(n.ARRAY_BUFFER,i,n.DYNAMIC_DRAW)}const r=new Float32Array(t.vertexLength);r.set(this.worldPositions),this.worldPositions=r}if(t.indexLength>this.indices.length){const r=new Uint32Array(t.indexLength);r.set(this.indices),this.indices=r,n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,this.indexBuffer),n.bufferData(n.ELEMENT_ARRAY_BUFFER,r,n.DYNAMIC_DRAW),this.count=r.length}if(t.triangleIds){n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.triangleIds.forEach((r,o)=>this.indices.set(t.indices.subarray(o*3,o*3+3),r*3));for(let r=0;r<t.triangleIds.length;){let o=r+1;for(;o<t.triangleIds.length&&t.triangleIds[o]===t.triangleIds[o-1]+1;)o++;n.bufferSubData(n.ELEMENT_ARRAY_BUFFER,t.triangleIds[r]*12,t.indices.subarray(r*3,o*3)),r=o}}t.positions&&t.ids.forEach((r,o)=>this.worldPositions.set(Yn(this.affine,t.positions.subarray(o*3,o*3+3)),r*3));for(const[r,o,s]of[[t.positions,this.positions,this.positionBuffer],[t.normals,this.normals,this.normalBuffer]])if(r){t.ids.forEach((i,a)=>o.set(r.subarray(a*3,a*3+3),i*3)),n.bindBuffer(n.ARRAY_BUFFER,s);for(let i=0;i<t.ids.length;){let a=i+1;for(;a<t.ids.length&&t.ids[a]===t.ids[a-1]+1;)a++;n.bufferSubData(n.ARRAY_BUFFER,t.ids[i]*12,r.subarray(i*3,a*3)),i=a}}}nearest(t){return Ss(t,this.worldPositions,this.indices,this.normals)}screenPoint(t,n,r){const o=this.canvas.getBoundingClientRect(),s=Ln(Vt(),r,this.mvp);return Array.from(Ln(Vt(),[(t-o.left)/o.width*2-1,1-(n-o.top)/o.height*2,s[2]],this.inverseMVP))}focus(t){const n=this.nearest(t);if(!n)return null;const r=n.point,o=n.normal;return this.target=r,this.orientation=wo(o),this.cursor={point:r,normal:o,radius:this.cursor?.radius||this.initialScale*.1},this.draw(),{point:r,normal:o}}dispose(){this.disposed=!0,this.observer.disconnect();const t=this.gl;for(const n of[this.positionBuffer,this.normalBuffer,this.indexBuffer])t.deleteBuffer(n);this.textures.forEach(n=>t.deleteTexture(n)),t.deleteRenderbuffer(this.depth),t.deleteFramebuffer(this.framebuffer),t.deleteVertexArray(this.vao),t.deleteProgram(this.program)}}function Es({nv:e,getState:t,prepare:n,onPatch:r,onError:o}){const s=document.getElementById("sculptBtn"),i=document.getElementById("canvas-container"),a=document.createElement("section");a.id="sculpt-panel",a.hidden=!0,a.innerHTML='<div class="sculpt-bar"><strong>Sculpt mask</strong><div class="sculpt-modes" role="group" aria-label="Surface interaction"><button type="button" data-mode="grab" aria-pressed="true">Grab</button><button type="button" data-mode="smooth" aria-pressed="false">Smooth</button><button type="button" data-mode="scoop" aria-pressed="false">Scoop</button><button type="button" data-mode="rotate" aria-pressed="false">Rotate</button></div><button type="button" data-action="undo" title="Undo (Ctrl/⌘ Z)" disabled>Undo</button><button type="button" data-action="redo" title="Redo (Ctrl/⌘ Shift Z)" disabled>Redo</button><button type="button" data-action="done">Done</button></div><div class="sculpt-size"><label>Size <input aria-label="Brush radius" type="range" min="1" max="100" value="35"/><output></output></label><button type="button" data-action="focus" title="Bring the surface nearest the slice crosshair forward">Focus slice</button><button type="button" data-action="reset">Reset view</button></div><div class="sculpt-target"><label><input type="checkbox" data-control="lock"/> Lock to slice crosshair</label><label>Crosshair <input type="range" aria-label="Crosshair opacity" min="0" max="100" value="45"/><output data-opacity>45%</output></label><span class="sculpt-anchor"></span></div><div class="sculpt-viewport"><canvas class="sculpt-surface" aria-label="Brain mask sculpting surface" tabindex="0"></canvas><canvas class="sculpt-cursor" aria-hidden="true"></canvas></div><p class="sculpt-help">Drag the ring along its normal. Facing you: drag up to pull, down to push. Two-finger scroll or right-drag rotates. Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.</p><p class="sculpt-status" role="status" aria-live="polite"></p>',i.append(a);const l=a.querySelector(".sculpt-surface"),u=a.querySelector(".sculpt-cursor"),f=a.querySelector("input"),m=a.querySelector("output"),c=a.querySelector(".sculpt-status"),p=a.querySelector(".sculpt-help"),d=a.querySelector('[data-control="lock"]'),_=a.querySelector('[aria-label="Crosshair opacity"]'),z=a.querySelector(".sculpt-anchor");let w=null,g=null,x=null;_.oninput=()=>{a.querySelector("[data-opacity]").textContent=`${_.value}%`,h&&(h.crosshairOpacity=Number(_.value)/100,h.drawCursor())};const P=()=>{if(!(!h||!M||k)){if(g=null,d.checked&&I!=="rotate"){const v=h.crosshair,F=v.join(",")+":"+(h.revision||0);(x?.renderer!==h||x.key!==F)&&(x={renderer:h,key:F,hit:h.nearest(v)});const N=x.hit;g=I==="scoop"?{point:v.slice(),normal:N?.normal||h.direction}:N,z.textContent=I==="scoop"?"Scoop center is the exact slice point.":N?`Surface anchor ${Number(N.distance.toPrecision(2))} mm from slice point.`:"No surface remains; undo to restore it.",h.cursor=g?{...g,radius:me,tool:I,locked:!0}:null}else z.textContent="",h.cursor=null;a.dataset.anchor=g?.point.join(",")||"",h.drawCursor()}};d.onchange=P;const $=Object.fromEntries([...a.querySelectorAll("[data-action]")].map(v=>[v.dataset.action,v])),y=["modelRunButton","sampleSelect","maskToggle","drawBtn","modelSelect"],C=new Map;let S=null,h=null,A=new Map,b=0,M=!1,k=!1,I="grab",q=null,J=0,E=null,Z=null,me=1,be={undo:0,redo:0},G=0,T=null;const ee=()=>{s.disabled=!t()||!M&&t()?.running||k,s.setAttribute("aria-pressed",String(M)),s.title=t()?"Sculpt the brain mask":"Run Skull-strip first to enable sculpting",$.undo.disabled=k||!be.undo,$.redo.disabled=k||!be.redo,$.done.disabled=k,$.focus.disabled=k,$.reset.disabled=k,f.disabled=k,d.disabled=k,a.querySelectorAll("[data-mode]").forEach(v=>v.disabled=k);for(const v of["saveBtn","saveStatsBtn"]){const F=document.getElementById(v);F&&(F.disabled=M&&k)}},j=v=>{k=v,ee()},le=(v,F={})=>new Promise((N,ue)=>{if(!S){ue(new Error("Editing session was closed."));return}const de=++b;A.set(de,{resolve:N,reject:ue}),S.postMessage({id:de,type:v,...F})}),te=()=>{me=Z.minRadius+(Z.maxRadius-Z.minRadius)*(Number(f.value)-1)/99,m.textContent=`${Number(me.toPrecision(3))} mm`,h?.cursor&&(h.cursor.radius=me,h.drawCursor())};f.oninput=te;function D(v){for(const F of y){const N=document.getElementById(F);N&&(v?(C.set(F,N.disabled),N.disabled=!0):C.has(F)&&(N.disabled=C.get(F)))}v||C.clear()}const se=()=>{!M||!h||(h.crosshair=Array.from(e.frac2mm(e.scene.crosshairPos)).slice(0,3),a.dataset.crosshair=h.crosshair.join(","),P(),h.drawCursor())},ae=e.onLocationChange;e.onLocationChange=function(v){ae?.call(e,v),se()};const ye=v=>{e.scene.crosshairPos=Array.from(e.mm2frac(v)).map(F=>Math.max(0,Math.min(1,F))),e.createOnLocationChange()},X=v=>{v&&(h.patch(v),Gr(Z.mask,Z.dims,v.rect,v.data),r(v),T.patch(v))},oe=v=>{c.textContent=v.message||String(v),console.error("Sculpt:",v)};async function V(){if(M||!t())return;if(e.drawBitmap?.some(F=>F!==0)){o(new Error("Apply or clear the current drawing before opening Sculpt."));return}M=!0,a.hidden=!1,i.classList.add("sculpting"),D(!0),j(!0),E={sliceType:e.opts.sliceType,multiplanarForceRender:e.opts.multiplanarForceRender,multiplanarShowRender:e.opts.multiplanarShowRender},e.setDrawingEnabled(!1),e.closeDrawing(),e.opts.multiplanarForceRender=!1,e.opts.multiplanarShowRender=0,e.setSliceType(e.sliceTypeMultiplanar),e.resizeListener();const v=G;try{if(await n(),v!==G)return;if(T=new xs(e),w=new $s(e),S)se(),h.draw(),c.textContent="Ready · corrections and undo history retained.";else{c.textContent="Building the editable surface…";const F=t(),N=new Float32Array(16);for(let he=0;he<4;he++)for(let we=0;we<4;we++)N[we*4+he]=F.affine[he][we];const ue=_o(zn(),N);if(!ue)throw new Error("Image geometry has a singular affine.");const de=[0,4,8].map(he=>Math.hypot(N[he],N[he+1],N[he+2]));Z={...F,affine:N,inverse:ue,minRadius:Math.min(...de)*2,maxRadius:Math.min(...F.dims.map((he,we)=>he*de[we]))*.16},Z.maxRadius=Math.max(Z.minRadius*2,Z.maxRadius),te(),S=new Worker(new URL(""+new URL("worker-CVWjrrhw.js",import.meta.url).href,import.meta.url),{type:"module"}),S.onmessage=({data:he})=>{const we=A.get(he.id);we&&(A.delete(he.id),he.error?we.reject(new Error(he.error)):(be=he.history,we.resolve(he)))},S.onerror=he=>{for(const we of A.values())we.reject(new Error(he.message||"Surface worker failed."));A.clear()};const{result:Pe,ms:ke}=await le("init",{mask:F.mask,dims:F.dims,affine:N,inverse:ue});if(v!==G)return;h=new Cs(l,u,Pe,N),h.crosshairOpacity=Number(_.value)/100,h.onCursorChange=he=>w?.set(he),se(),a.dataset.triangles=String(Pe.indices.length/3),a.dataset.buildMs=String(Math.round(ke)),c.textContent="Ready · hover over the surface to place the grab."}}catch(F){v===G&&(oe(F),ie(),o(F))}finally{v===G&&(j(!1),P())}}function fe(){!M||k||(M=!1,q=null,w?.close(),w=null,T?.close(),T=null,cancelAnimationFrame(J),a.hidden=!0,i.classList.remove("sculpting"),E&&Object.assign(e.opts,E),D(!1),e.resizeListener(),ee())}function ie(){G++,k=!1,fe(),S?.terminate(),S=null,h?.dispose(),h=null,Z=null,be={undo:0,redo:0};for(const v of A.values())v.reject(new Error("Editing session was replaced."));A.clear(),ee()}s.onclick=()=>{M?fe():V()},$.done.onclick=fe,a.querySelectorAll("[data-mode]").forEach(v=>v.onclick=()=>{I=v.dataset.mode,p.textContent=(I==="smooth"?"Smooth: click to soften the patch; drag upward for more. ":I==="grab"?"Grab: drag along the normal; facing you, up pulls and down pushes. ":I==="scoop"?"Scoop: click to erase a sphere; drag to sweep at fixed depth. Lock to slices for an exact center. ":"Drag to freely rotate. ")+"Two-finger scroll or right-drag rotates; Option/⌘ + scroll zooms. Cyan crosshair follows slice clicks.",a.querySelectorAll("[data-mode]").forEach(F=>F.setAttribute("aria-pressed",String(F===v))),l.style.cursor=I==="rotate"?"grab":"crosshair",h.cursor=null,P(),h.drawCursor()});async function ge(v){if(k||!h)return;j(!0);const F=G;try{const{result:N}=await le(v);if(F!==G)return;X(N),h.draw(),c.textContent=v==="undo"?"Correction undone.":"Correction restored."}catch(N){F===G&&oe(N)}finally{F===G&&(j(!1),P())}}$.undo.onclick=()=>ge("undo"),$.redo.onclick=()=>ge("redo");const Q=()=>{if(!M||k||!h)return;const v=h.focus(Array.from(e.frac2mm(e.scene.crosshairPos)));if(v)return h.cursor.radius=me,d.checked&&P(),h.drawCursor(),c.textContent="Nearest surface to the slice crosshair highlighted.",v};$.focus.onclick=Q,$.reset.onclick=()=>{h?.resetView(),P()},e.gl.canvas.addEventListener("dblclick",()=>{M&&requestAnimationFrame(Q)});for(const v of["drop","dragover"])e.gl.canvas.addEventListener(v,F=>{M&&(F.preventDefault(),F.stopImmediatePropagation(),c.textContent="Choose Done before loading another image.")},!0);l.addEventListener("contextmenu",v=>v.preventDefault()),l.addEventListener("webglcontextlost",async v=>{v.preventDefault(),G++,j(!0);try{if(q?.kind==="grab"){const{result:F}=await le("cancel");F&&Z&&(Gr(Z.mask,Z.dims,F.rect,F.data),r(F),T?.patch(F))}}catch(F){oe(F)}finally{ie(),o(new Error("The sculpting graphics context was lost. Accepted corrections are retained; reopen Sculpt after graphics recovers."))}}),l.addEventListener("wheel",v=>{if(v.preventDefault(),!h||k)return;const F=v.deltaMode===1?16:v.deltaMode===2?l.clientHeight:1,N=v.deltaX*F,ue=v.deltaY*F;v.altKey||v.metaKey||v.ctrlKey?(h.scale=Math.max(h.initialScale*.15,Math.min(h.initialScale*3,h.scale*Math.exp(ue*.001))),h.draw()):h.orbit(N,ue),d.checked&&P()},{passive:!1});const ce=v=>{if(!h||k)return;if(d.checked&&I!=="rotate"){h.cursor=g?{...g,radius:me,tool:I,locked:!0}:null,h.drawCursor();return}const F=I!=="rotate"?h.pick(v.clientX,v.clientY):null;h.cursor=F?{...F,radius:me,tool:I}:null,h.drawCursor()};l.addEventListener("pointerleave",()=>{!q&&h&&!d.checked&&(h.cursor=null,h.drawCursor())}),l.addEventListener("pointerdown",async v=>{if(!h||k||q||![0,2].includes(v.button))return;if(v.preventDefault(),l.focus(),l.setPointerCapture(v.pointerId),I==="rotate"||v.button===2||v.shiftKey){q={kind:"rotate",id:v.pointerId,x:v.clientX,y:v.clientY},h.cursor=null,h.drawCursor();return}const F=d.checked?g:h.pick(v.clientX,v.clientY);if(!F)return;const N=h.project(F.point),ue=h.project(F.point.map((We,Oe)=>We+F.normal[Oe])),de=l.width/l.clientWidth,Pe=(ue[0]-N[0])/de,ke=(ue[1]-N[1])/de,he=Math.hypot(Pe,ke),we=2*h.scale/l.clientHeight,pe=he*we>.2?[Pe/he,ke/he]:[0,-1],L={kind:"grab",tool:I,id:v.pointerId,hit:F,x:v.clientX,y:v.clientY,direction:pe,worldPerPixel:we,wanted:I==="smooth"?.35:0,shown:0,points:I==="scoop"?[F.point.slice()]:[],screenStart:h.screenPoint(v.clientX,v.clientY,F.point),sliceOrigin:h.crosshair.slice(),starting:!0,running:!1,ended:!1,cancelled:!1,generation:G};q=L,j(!0),h.cursor={...F,radius:me,tool:L.tool,origin:F.point},d.checked||ye(F.point),e.drawScene(),h.drawCursor(),c.textContent=L.tool==="smooth"?"Softening this patch · drag upward for more; Escape cancels.":L.tool==="scoop"?"Scoop removes the orange sphere · drag to sweep; Escape cancels.":"Drag to move the boundary · Escape cancels this grab.";try{const{result:We,ms:Oe}=await le("begin",{center:F.point,normal:F.normal,tool:L.tool,radius:me});a.dataset.beginMs=String(Math.round(Oe)),L.max=L.tool==="smooth"?1:We.maxDistance,L.starting=!1,W(L)}catch(We){L.generation===G&&(oe(We),q=null,j(!1),P())}});async function W(v){if(!(v.starting||v.running||v.generation!==G)){v.running=!0;try{for(;!v.cancelled&&(v.tool==="scoop"?v.points.length:v.wanted!==v.shown);){if(v.tool==="scoop"){const he=v.points.splice(0,64),we=performance.now(),{result:pe,ms:L}=await le("scoop",{points:he});if(v.generation!==G)return;X(pe);const We=he[he.length-1];ye(We),h.cursor={point:We,normal:v.hit.normal,radius:me,tool:"scoop",locked:d.checked},h.draw(),a.dataset.previewMs=String(Math.round(performance.now()-we)),a.dataset.workerMs=String(Math.round(L)),c.textContent="Scooping · release to keep; Escape restores the whole stroke.";continue}const F=Math.max(v.tool==="smooth"?0:-v.max,Math.min(v.max,v.wanted));v.wanted=F;const N=performance.now(),{result:ue,ms:de}=await le(v.tool==="smooth"?"smooth":"move",v.tool==="smooth"?{amount:F}:{distance:F});if(v.generation!==G)return;v.shown=F;const Pe=v.tool==="smooth"?v.hit.point:v.hit.point.map((he,we)=>he+v.hit.normal[we]*F);ye(Pe),X(ue),h.cursor={point:Pe,normal:v.hit.normal,tool:v.tool,radius:me,origin:v.hit.point},h.draw();const ke=performance.now()-N;c.textContent=v.tool==="smooth"?"Smoothing this patch · release to keep, Escape to cancel.":`${F>=0?"+":""}${Number(F.toPrecision(3))} mm${Math.abs(F)>=v.max?" · release and grab again to move farther":""}`,a.dataset.previewMs=String(Math.round(ke)),a.dataset.workerMs=String(Math.round(de))}if(v.ended){const{result:F,ms:N}=await le(v.cancelled?"cancel":"commit");if(a.dataset.commitMs=String(Math.round(N)),v.generation!==G)return;v.cancelled?(X(F),ye(v.sliceOrigin),e.drawScene(),h.cursor={...v.hit,radius:me,tool:v.tool},c.textContent="Correction cancelled."):c.textContent="Correction applied · inspect the slices, then rotate or grab again.",h.draw(),q=null,j(!1),P()}}catch(F){if(v.generation===G){try{const{result:N}=await le("cancel");X(N),ye(v.sliceOrigin),e.drawScene(),h.draw()}catch(N){ie(),o(N)}q=null,j(!1),P(),oe(F)}}finally{v.running=!1}}}l.addEventListener("pointermove",v=>{const F=q;if(F?.id===v.pointerId){if(F.kind==="rotate")h.dragOrbit([F.x,F.y],[v.clientX,v.clientY]),d.checked&&P(),F.x=v.clientX,F.y=v.clientY;else if(!F.ended){if(F.tool==="scoop"){const N=h.screenPoint(v.clientX,v.clientY,F.hit.point),ue=F.hit.point.map((de,Pe)=>de+N[Pe]-F.screenStart[Pe]);F.points.push(ue),h.cursor={point:ue,normal:F.hit.normal,radius:me,tool:"scoop"},h.drawCursor(),W(F);return}F.wanted=F.tool==="smooth"?.35+(F.y-v.clientY)/120:((v.clientX-F.x)*F.direction[0]+(v.clientY-F.y)*F.direction[1])*F.worldPerPixel,W(F)}return}cancelAnimationFrame(J),J=requestAnimationFrame(()=>ce(v))});const O=(v,F=!1)=>{const N=q;if(!(!N||N.id!==v.pointerId)){if(N.kind==="rotate"){q=null;return}N.ended||(N.ended=!0,N.cancelled=F,W(N))}};return l.addEventListener("pointerup",v=>O(v)),l.addEventListener("pointercancel",v=>O(v,!0)),l.addEventListener("lostpointercapture",v=>O(v,!0)),window.addEventListener("keydown",v=>{!M||/INPUT|TEXTAREA|SELECT/.test(v.target.tagName)||document.querySelector("dialog[open]")||(v.key==="Escape"&&q?.kind==="grab"?(v.preventDefault(),q.cancelled=!0,q.ended=!0,W(q)):(v.ctrlKey||v.metaKey)&&v.key.toLowerCase()==="z"?(v.preventDefault(),ge(v.shiftKey?"redo":"undo")):(v.ctrlKey||v.metaKey)&&v.key.toLowerCase()==="y"&&(v.preventDefault(),ge("redo")))}),ee(),{invalidate:ie,updateAvailability:ee,get active(){return M},get busy(){return k}}}var Ve=class extends Error{code;log;constructor(e,t,n){super(t),this.name="BrainchompError",this.code=e,this.log=n}},bo=16,Sr=128*1024*1024,Fs=256*256*(bo/2)*80*4,vo=256*256*256*bo*2,Xt=e=>`${Math.round(e/(1024*1024))} MiB`,yo=/SwiftShader|llvmpipe|lavapipe|softpipe|Software|Basic Render/i,xo="navigator.gpu is undefined: either this browser has no WebGPU, or the page is not a secure context. about:blank and file:// are NOT secure contexts and look exactly like a browser without WebGPU; serve over https or localhost.";async function fr(){if(typeof navigator>"u"||!navigator.gpu)return{supported:!1,reasons:[xo]};const e=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!e)return{supported:!1,reasons:["requestAdapter returned null"]};const t=[],n=e.features.has("shader-f16"),r=e.features.has("subgroups"),{maxBufferSize:o,maxStorageBufferBindingSize:s}=e.limits,i=Sr;s<i&&t.push(`maxStorageBufferBindingSize is ${Xt(s)}, but WebGPU V4 requires at least ${Xt(i)}`),o<i&&t.push(`maxBufferSize is ${Xt(o)}, but WebGPU V4 requires at least ${Xt(i)}`);const a=Math.min(o,s)<Fs,l=e.info,u=l?.isFallbackAdapter,f=e.isFallbackAdapter,m=!!(u??f)||yo.test(`${l?.vendor??""} ${l?.architecture??""} ${l?.description??""}`);return{supported:t.length===0,reasons:t,maxBufferSize:o,maxStorageBufferBindingSize:s,hasShaderF16:n,hasSubgroups:r,lowMemoryRequired:a,software:m,adapterInfo:l?{vendor:l.vendor??"",architecture:l.architecture??"",device:l.device??"",description:l.description??""}:null}}async function $o(){if(typeof navigator>"u"||!navigator.gpu)throw new Ve("no-webgpu",xo);const e=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!e)throw new Ve("no-adapter","requestAdapter returned null");const{maxBufferSize:t,maxStorageBufferBindingSize:n}=e.limits,r=Sr;if(n<r||t<r)throw new Ve("device-too-small",`this device allows ${Xt(n)} per storage binding and ${Xt(t)} per buffer, but WebGPU V4 needs at least ${Xt(r)}`);const o=[];e.features.has("shader-f16")&&o.push("shader-f16"),e.features.has("subgroups")&&o.push("subgroups");const s=["maxBufferSize","maxStorageBufferBindingSize","maxStorageBuffersPerShaderStage","maxUniformBufferBindingSize","maxComputeInvocationsPerWorkgroup","maxComputeWorkgroupSizeX","maxComputeWorkgroupSizeY","maxComputeWorkgroupSizeZ","maxComputeWorkgroupStorageSize","maxComputeWorkgroupsPerDimension"],i=e.limits,a={};for(const u of s){const f=i[u];typeof f=="number"&&Number.isFinite(f)&&(a[u]=f)}const l=await e.requestDevice({requiredFeatures:o,requiredLimits:a});return l.__adapterInfo=e.info??null,l.__isLost=!1,l.lost&&typeof l.lost.then=="function"&&l.lost.then(()=>{l.__isLost=!0}),l}function Ls(e){const{maxStorageBufferBindingSize:t,maxBufferSize:n}=e.limits,r=Sr;if(t<r||n<r)throw new Ve("device-too-small",`the supplied device allows ${Xt(t)} per storage binding and ${Xt(n)} per buffer, but WebGPU V4 needs at least ${Xt(r)}. Request it with acquireDevice(), which asks for the right limits.`)}var Us=vo*2,qt=256,Vr=qt*qt*qt*4*2,Sn=2048,Hr=e=>`${Math.round(e/(1024*1024))} MiB`;function ko(){const e=typeof OffscreenCanvas<"u"&&typeof document>"u"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;return e?e.getContext("webgl2",{alpha:!1,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"}):null}function So(){const e=ko();if(!e)return{supported:!1,reasons:["a webgl2 context could not be created; this browser is either too old or has WebGL disabled or blocklisted"]};const t=[],n=e.getExtension("WEBGL_debug_renderer_info"),r=n?e.getParameter(n.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER),o=yo.test(String(r||""))?!0:n?!1:void 0,s=e.getExtension("EXT_color_buffer_float");s||t.push("this device lacks EXT_color_buffer_float, which the kernels require in order to render into float textures");const i=e.getParameter(e.MAX_3D_TEXTURE_SIZE),a=e.getParameter(e.MAX_DRAW_BUFFERS),l=e.getParameter(e.MAX_COLOR_ATTACHMENTS),u=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_VIEWPORT_DIMS);i<qt&&t.push(`MAX_3D_TEXTURE_SIZE is ${i}, but the model needs ${qt}`);const m=vo/Vr;(a<m||l<m)&&t.push(`this device allows ${a} draw buffers and ${l} colour attachments, but the model writes ${m} at once`),(u<Sn||f[0]<Sn||f[1]<Sn)&&t.push(`MAX_TEXTURE_SIZE is ${u} and MAX_VIEWPORT_DIMS ${f[0]}x${f[1]}, but the label texture is ${Sn}x${Sn}`);let c;if(s&&i>=qt){for(;e.getError()!==e.NO_ERROR;);const p=e.createTexture();e.bindTexture(e.TEXTURE_3D,p),e.texStorage3D(e.TEXTURE_3D,1,e.RGBA16F,qt,qt,qt),c=e.getError()===e.NO_ERROR&&!e.isContextLost(),e.deleteTexture(p),c||t.push(`this device could not allocate even one ${Hr(Vr)} activation plane; a run needs ${Hr(Us)} of them`)}return e.getExtension("WEBGL_lose_context")?.loseContext(),{supported:t.length===0,reasons:t,renderer:r,software:o,max3dTextureSize:i,maxDrawBuffers:a,maxColorAttachments:l,maxTextureSize:u,allocates:c}}function Rs(e){e.getExtension("WEBGL_lose_context")?.loseContext()}function pr(){const e=ko();if(!e)throw new Ve("no-webgpu","a webgl2 context could not be created; this browser is either too old or has WebGL disabled or blocklisted");if(!e.getExtension("EXT_color_buffer_float"))throw new Ve("no-f16","this device lacks EXT_color_buffer_float, which the segmentation kernels require in order to render into float textures");const t=e.getParameter(e.MAX_3D_TEXTURE_SIZE);if(t<qt)throw new Ve("device-too-small",`this device allows 3D textures up to ${t}, but the model needs ${qt}`);return e}var Xr=[31,139];function Is(e){return e.length>=2&&e[0]===Xr[0]&&e[1]===Xr[1]}async function Mo(e,t){const n=new Uint8Array(e),r=new Blob([n]).stream().pipeThrough(t);return new Uint8Array(await new Response(r).arrayBuffer())}async function Ts(e){if(typeof DecompressionStream>"u")throw new Ve("bad-input","the input is gzipped but this environment has no DecompressionStream; decompress it before calling, or pass an uncompressed NIfTI");return Mo(e,new DecompressionStream("gzip"))}async function Ws(e){if(typeof CompressionStream>"u")throw new Ve("bad-input","gzip output was requested but this environment has no CompressionStream");return Mo(e,new CompressionStream("gzip"))}var qs=12e4,Os=12e4,Po=9e5,Ns={webgl2:"./brainchomp-gl.js",cpu:"./brainchomp.js"},vn=new Map;function Mr(e,t){if(!t)return new URL(e,import.meta.url).href;const n=t.endsWith("/")?t:`${t}/`,r=typeof location<"u"?location.href:"file:///",o=new URL(`${n}${e.replace(/^\.\//,"")}`,r);if(typeof location<"u"){if(location.origin==="null")throw new Ve("unsupported-option","assetPath cannot be used from an opaque origin (file:// or a sandboxed iframe); serve the page over http(s)");if(o.origin!==location.origin)throw new Ve("unsupported-option",`assetPath must be same-origin; ${o.origin} is not ${location.origin}`)}return o.href}function Ds(e,t){return Mr(Ns[e],t)}function Gs(e){let t=vn.get(e);return t||(t=import(e).then(n=>n.default),vn.set(e,t),t.catch(()=>{vn.get(e)===t&&vn.delete(e)})),t}async function Vs(e){const t=[],n=g=>{t.push(g),e.onLog?.(g)};let r;const o=new Promise(g=>{r=g});let s;const i={noInitialRun:!0,thisProgram:"brainchomp",print:n,printErr:n,onExit:g=>r(g)};e.backend==="webgl2"&&(i.preinitializedWebGLContext=e.glContext);const a=e.timeoutMs??(e.backend==="cpu"?Po:qs),l=Math.min(a,Os),u=Ds(e.backend,e.assetPath),f=Gs(u);let m=!1;const c=await Promise.race([f.then(g=>g(i)),new Promise((g,x)=>{s=setTimeout(()=>{m=!0,x(new Ve("initialization-failed",`the ${e.backend} module did not finish initialising within ${l} ms`,t))},l)})]).finally(()=>{clearTimeout(s),m&&vn.get(u)===f&&vn.delete(u)});if(e.backend==="webgl2"){if(!c.specialHTMLTargets)throw new Ve("inference-failed","this WebGL2 module was built without specialHTMLTargets exported; rebuild it with the flags in src/Makefile",t);c.specialHTMLTargets["#brainchomp-webgl2"]=e.glContext.canvas}c.FS.writeFile("/in.nii",e.input);const p=performance.now();try{c.callMain([...e.args,"-backend",e.backend,"-o","/out.nii","/in.nii"])}catch(g){g&&typeof g.status=="number"?r(g.status):(n(`threw: ${g instanceof Error?g.stack??g.message:String(g)}`),r(-1))}const d=e.backend==="webgl2"?await o:await Promise.race([o,new Promise((g,x)=>{s=setTimeout(()=>x(new Ve("inference-failed",`the ${e.backend} module did not finish within ${a} ms; this machine may simply be slower than the limit allows`,t)),a)})]).finally(()=>clearTimeout(s)),_=performance.now()-p;if(e.backend==="webgl2"&&e.glContext?.isContextLost())throw new Ve("inference-failed","the WebGL2 context was lost during the run; the GPU or its driver reset. Any output from this run is meaningless.",t);if(d!==0)throw new Ve("inference-failed",`the ${e.backend} module exited with status ${d}`,t);const z="/out.nii";if(!c.FS.analyzePath(z).exists)throw new Ve("inference-failed",`the ${e.backend} module exited cleanly but wrote no output`,t);const w=new Map;for(const g of e.extraOutputs??[])c.FS.analyzePath(g).exists&&w.set(g,c.FS.readFile(g));return{image:c.FS.readFile(z),extras:w,elapsedMs:_,log:t}}var Pr="v1",Ar="brainchomp:webgpu-v4-profile:",Hs=720*60*60*1e3,un=256*64,Ht=4,Ao=2,Yr=Ht*64*Ao,Zr=16,Xs=120,Ys=140,mr=220,dr=550,Zs=450,yn=64,gr=8,qn=yn+2*gr,hr=24,Rt=12,bn=6,_r=9*hr*3*bn,wr=_r/2,Nn=new Map,jr=new WeakMap,Zn=new WeakMap,js=/\b(?:nvidia|geforce|rtx|gtx|quadro|tesla|amd|radeon|ryzen|intel|arc|uhd|iris|apple|qualcomm|adreno|arm|mali|immortalis|powervr|microsoft|swiftshader|llvmpipe|mesa)\b/i;function zo(e){return e?.navigator??globalThis.navigator}function zr(e){if(e&&"storage"in e)return e.storage;try{return globalThis.localStorage??null}catch{return null}}function Bo(e){if(e&&typeof e.search=="string")return e.search;try{return globalThis.location?.search||""}catch{return""}}function Un(e){return typeof e?.now=="function"?e.now():typeof globalThis.performance?.now=="function"?globalThis.performance.now():Date.now()}function Co(e){return typeof e?.wallNow=="function"?e.wallNow():Date.now()}function Kr(e,t=void 0){const n=String(t??globalThis.navigator?.userAgentData?.platform??globalThis.navigator?.platform??""),r=String(e||"");return/Linux/i.test(n)&&!/Android/i.test(n)&&/\bMesa\b/i.test(r)&&/\bIntel\b/i.test(r)&&/\b(?:WHL|KBL|CFL|SKL|CML)\b/i.test(r)}function Gn(e){const t=String(e||"").trim().toLowerCase();return t==="single"||t==="pipelined"||t==="paced"||t==="calibrate"?t:t==="chunked"?"paced":""}function Eo(e=void 0){let t=e;if(t===void 0)try{t=globalThis.location?.search||""}catch{t=""}const n={mode:"",exec:""};if(!t)return n;try{const r=new URLSearchParams(t),o=(r.get("webgpuMode")||"").trim().toLowerCase();o==="low-memory"||o==="lowmem"||o==="low_memory"||o==="128m"?n.mode="low-memory":o==="standard"||o==="std"?n.mode="standard":o==="recalibrate"||o==="reset"?n.mode="recalibrate":o==="probe"&&(n.mode="probe"),n.exec=Gn(r.get("webgpuExec"))}catch{}return n}function Ks(e,t=null){if(!e)return"";if(typeof e.__glRenderer=="string")return e.__glRenderer;let n="";try{const r=zo(t),o=!!(r&&/Firefox/i.test(r.userAgent||"")),i=(typeof globalThis.OffscreenCanvas<"u"?new globalThis.OffscreenCanvas(1,1):typeof globalThis.document<"u"?globalThis.document.createElement("canvas"):null)?.getContext?.("webgl2",{powerPreference:"high-performance"});if(i){if(o)n=String(i.getParameter(i.RENDERER)||"");else{const a=i.getExtension("WEBGL_debug_renderer_info");n=String((a?i.getParameter(a.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER))||"")}i.getExtension("WEBGL_lose_context")?.loseContext()}}catch{}return e.__glRenderer=n,n}function En(e,t=null){const n=e?.__adapterInfo||e?.adapterInfo||{},r=String(n.vendor||"").trim().toLowerCase(),o=String(n.architecture||"").trim().toLowerCase(),s=zo(t),i=String(t?.userAgent??s?.userAgent??""),a=String(t?.platform??s?.userAgentData?.platform??s?.platform??""),l=/Android/i.test(i)||/Android/i.test(a),u=!l&&(r==="apple"||/Mac|iPhone|iPad|iPod/i.test(`${a} ${i}`)&&!["intel","amd","nvidia","microsoft"].includes(r)),f=!u&&!l&&(/Win/i.test(a)||/Windows/i.test(i)),m=!u&&!f&&!l&&(/Linux/i.test(a)||/Linux/i.test(i)),c=typeof e?.__glRenderer=="string"?e.__glRenderer:!u&&!r&&!t?.skipGlProbe?Ks(e,t):"",p=`${n.device||""} ${n.description||""} ${c}`.trim(),d=r||(/\bintel\b/i.test(c)?"intel":/\bmicrosoft\b|\bbasic render\b/i.test(c)?"microsoft":/\bnvidia\b/i.test(c)?"nvidia":/\bamd\b|\bradeon\b/i.test(c)?"amd":""),_=f&&(d==="microsoft"||d==="intel"&&!/\bArc\b/i.test(p)&&(/^gen-(9|11|12lp)/i.test(o)||/(?:UHD|HD)\s+Graphics|Iris(?:\(R\))?\s*(?:Plus|Xe)|Pentium|Celeron/i.test(p))),z=m&&(r==="intel"&&/^gen-9/i.test(o)||Kr(c,a||"Linux")||Kr(n.description||"",a||"Linux")||d==="intel"&&/\b(?:WHL|KBL|CFL|SKL|CML|UHD\s+Graphics\s+6[0-3]0|HD\s+Graphics\s+(?:5[0-3]0|6[0-3]0))\b/i.test(p)),w=`${r} ${o} ${n.device||""} ${n.description||""} ${c}`.trim(),g=!u&&(w===""||/^(?:brave|unknown|generic|webgl|webgpu|default|\s)+$/i.test(w)||!js.test(w)&&!/^gen-\d/i.test(o));return{os:u?"apple":f?"windows":l?"android":m?"linux":"other",vendor:d,arch:o,desc:p,glRenderer:c,isApple:u,isWindows:f,isLinux:m,isAndroid:l,isWindowsSharedIgpu:_,isLinuxIntelGen9:z,isMaskedGpu:g}}function Br(e,t=null,n=null){const r=t||En(e,n),o=e?.limits||{},s=e?.__adapterInfo||e?.adapterInfo||{},i=Number(o.maxStorageBufferBindingSize||0),a=Number(o.maxBufferSize||0),l=e?.features?.has?.("shader-f16")?1:0,f=!!e?.features?.has?.("subgroups")?`${s.subgroupMinSize|0}-${s.subgroupMaxSize|0}`:"none",c=([s.vendor||"",s.architecture||"",s.device||"",s.description||"",r.glRenderer||""].map(p=>String(p).trim().toLowerCase().replace(/\s+/g," ")).filter(Boolean).join("/")||"masked").slice(0,96);return[Pr,r.os,`sb=${i}`,`mb=${a}`,`f16=${l}`,`sg=${f}`,c].join("|")}function Cr(e){return`${Ar}${e}`}function Fo(e){return e?(e.__v4Calib instanceof Map||(e.__v4Calib=new Map),e.__v4Calib):null}function jn(e,t){return!e||typeof e!="object"||e.version!==Pr||typeof e.ts!="number"||!Number.isFinite(e.ts)?!1:t-e.ts<=Hs}function Lo(e,t,n=null){const r=Co(n),o=Fo(e),s=o?.get(t);if(jn(s,r))return s;const i=zr(n);let a=!1;if(i&&typeof i.getItem=="function")try{const l=i.getItem(t);if(a=!0,l){const u=JSON.parse(l);if(jn(u,r))return o?.set(t,u),u}}catch{}if(!a){const l=Nn.get(t);if(jn(l,r))return o?.set(t,l),l}return null}function Uo(e,t,n,r=null){const o={version:Pr,ts:Co(r),...n};Fo(e)?.set(t,o);const s=zr(r);let i=!1;if(s&&typeof s.setItem=="function")try{s.setItem(t,JSON.stringify(o)),i=!0}catch{}return i||Nn.set(t,o),o}function Qs(e,t=null,n=null){const r=t||(e?Cr(Br(e,null,n)):null);if(e&&(e.__v4Calib instanceof Map&&(r?e.__v4Calib.delete(r):e.__v4Calib.clear()),delete e.__v4WinCalibrated,delete e.__v4WinFast,delete e.__v4MsPerStrip,delete e.__v4Recalibrated,delete e.__v4ProbeDone),r){Nn.delete(r);const o=zr(n);if(o&&typeof o.removeItem=="function")try{o.removeItem(r)}catch{}}else Nn.clear()}function Js(e,t="device-lost",n=null){if(!e)return null;const r=En(e,n),o=Br(e,r,n),s=Cr(o),i=Lo(e,s,n)||{};return Uo(e,s,{...i,safeMode:"low-memory-paced",safeModeReason:t},n)}function Qr(e){return!Number.isFinite(e)||e>=dr?"very-slow":e>=mr?"moderate":"fast"}function ea(e){const t=Rt*qn,n=Rt*yn,r=(s,i)=>Array.from({length:s},(a,l)=>i(l)).join("");if(e){const s=()=>{let a="";for(let l=0;l<bn;l+=2){const u=l*4,f=l/2;a+=`      {
        let wp0 = w_eff_u[wbu + ${f}u];
        let wp1 = w_eff_u[wbu + ${3+f}u];
        let wp2 = w_eff_u[wbu + ${6+f}u];
        let w0a = u4_lo(wp0);
        let w0b = u4_hi(wp0);
        let w1a = u4_lo(wp1);
        let w1b = u4_hi(wp1);
        let w2a = u4_lo(wp2);
        let w2b = u4_hi(wp2);
        a_${u}     = fma(vn, vec4<f16>(w0a.x), fma(vc, vec4<f16>(w1a.x), fma(vp, vec4<f16>(w2a.x), a_${u})));
        a_${u+1} = fma(vn, vec4<f16>(w0a.y), fma(vc, vec4<f16>(w1a.y), fma(vp, vec4<f16>(w2a.y), a_${u+1})));
        a_${u+2} = fma(vn, vec4<f16>(w0a.z), fma(vc, vec4<f16>(w1a.z), fma(vp, vec4<f16>(w2a.z), a_${u+2})));
        a_${u+3} = fma(vn, vec4<f16>(w0a.w), fma(vc, vec4<f16>(w1a.w), fma(vp, vec4<f16>(w2a.w), a_${u+3})));
        a_${u+4} = fma(vn, vec4<f16>(w0b.x), fma(vc, vec4<f16>(w1b.x), fma(vp, vec4<f16>(w2b.x), a_${u+4})));
        a_${u+5} = fma(vn, vec4<f16>(w0b.y), fma(vc, vec4<f16>(w1b.y), fma(vp, vec4<f16>(w2b.y), a_${u+5})));
        a_${u+6} = fma(vn, vec4<f16>(w0b.z), fma(vc, vec4<f16>(w1b.z), fma(vp, vec4<f16>(w2b.z), a_${u+6})));
        a_${u+7} = fma(vn, vec4<f16>(w0b.w), fma(vc, vec4<f16>(w1b.w), fma(vp, vec4<f16>(w2b.w), a_${u+7})));
      }
`}return a},i=(a,l)=>`    for (var ic : u32 = 0u; ic < ${Rt}u; ic = ic + 1u) {
      let base = row_off + ic * ${qn}u;
      let uL = ${a}[base - 2u];
      let uN = ${a}[base - 1u];
      let uC = ${a}[base];
      let uP = ${a}[base + 1u];
      let uR = ${a}[base + 2u];
      let u_neg = (uL >> 24u) | (uN << 8u);
      let u_pos = (uP >> 8u) | (uR << 24u);
      let vn = vec4<f16>(vec2<f16>(unpack2x16float(((u_neg & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((u_neg >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(1.02734375h);
      let vc = vec4<f16>(vec2<f16>(unpack2x16float(((uC & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((uC >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(1.02734375h);
      let vp = vec4<f16>(vec2<f16>(unpack2x16float(((u_pos & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((u_pos >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(1.02734375h);
      let wbu = wbu_tap + (${l}u + ic) * 9u;
${s()}    }
`;return`enable f16;
@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> y8_0 : array<u32>;
@group(0) @binding(3) var<storage, read_write> y8_1 : array<u32>;
@group(0) @binding(4) var<uniform> w_eff_u : array<vec4<u32>, ${wr}>;

fn u4_lo(p : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(p.x)), vec2<f16>(unpack2x16float(p.y)));
}
fn u4_hi(p : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(p.z)), vec2<f16>(unpack2x16float(p.w)));
}

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let x_pad = x4 + ${gr}u;
  let y = (wid.y * 4u + lid.y) & 255u;
  let z = wid.z & ${Ht-1}u;
${r(hr,a=>`  var a_${a} = vec4<f16>(0.0h);
`)}
  for (var tap_yz : u32 = 0u; tap_yz < 9u; tap_yz = tap_yz + 1u) {
    let dz = tap_yz / 3u;
    let dy = tap_yz - dz * 3u;
    let z_src = (z + dz + ${Ht-1}u) & ${Ht-1}u;
    let y_src = (y + dy * 5u + 251u) & 255u;
    let row_off = (z_src * 256u + y_src) * ${t}u + x_pad;
    let wbu_tap = tap_yz * 216u;
${i("act8_0",0)}${i("act8_1",Rt)}  }

  let y_base = (z * 256u + y) * ${n}u + x4;
${r(Rt,a=>`  y8_0[y_base + ${a*yn}u] = pack4x8unorm(vec4<f32>(a_${a}) * 0.5 + vec4<f32>(0.5));
`)}${r(Rt,a=>`  y8_1[y_base + ${a*yn}u] = pack4x8unorm(vec4<f32>(a_${a+Rt}) * 0.5 + vec4<f32>(0.5));
`)}
}`}const o=(s,i,a)=>{const l=i*4,u=()=>r(3,m=>{const c=i+m,p=l+m*4;return`      {
        let w0 = w_eff[wb + ${c}u];
        let w1 = w_eff[wb + ${bn+c}u];
        let w2 = w_eff[wb + ${2*bn+c}u];
        a_${p}     = fma(vn, vec4<f32>(w0.x), fma(vc, vec4<f32>(w1.x), fma(vp, vec4<f32>(w2.x), a_${p})));
        a_${p+1} = fma(vn, vec4<f32>(w0.y), fma(vc, vec4<f32>(w1.y), fma(vp, vec4<f32>(w2.y), a_${p+1})));
        a_${p+2} = fma(vn, vec4<f32>(w0.z), fma(vc, vec4<f32>(w1.z), fma(vp, vec4<f32>(w2.z), a_${p+2})));
        a_${p+3} = fma(vn, vec4<f32>(w0.w), fma(vc, vec4<f32>(w1.w), fma(vp, vec4<f32>(w2.w), a_${p+3})));
      }
`}),f=(m,c)=>`    for (var ic : u32 = 0u; ic < ${Rt}u; ic = ic + 1u) {
      let base = row_off + ic * ${qn}u;
      let uL = ${m}[base - 2u];
      let uN = ${m}[base - 1u];
      let uC = ${m}[base];
      let uP = ${m}[base + 1u];
      let uR = ${m}[base + 2u];
      let u_neg = (uL >> 24u) | (uN << 8u);
      let u_pos = (uP >> 8u) | (uR << 24u);
      let vn = unpack4x8unorm(u_neg) - vec4<f32>(0.02745098);
      let vc = unpack4x8unorm(uC) - vec4<f32>(0.02745098);
      let vp = unpack4x8unorm(u_pos) - vec4<f32>(0.02745098);
      let wb = wb_tap + (${c}u + ic) * ${3*bn}u;
${u()}    }
`;return`@compute @workgroup_size(64, 4, 1)
fn ${s}(@builtin(local_invocation_id) lid : vec3<u32>,
                @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let x_pad = x4 + ${gr}u;
  let y = (wid.y * 4u + lid.y) & 255u;
  let z = wid.z & ${Ht-1}u;
${r(Rt,m=>`  var a_${l+m} = vec4<f32>(0.0);
`)}
  for (var tap_yz : u32 = 0u; tap_yz < 9u; tap_yz = tap_yz + 1u) {
    let dz = tap_yz / 3u;
    let dy = tap_yz - dz * 3u;
    let z_src = (z + dz + ${Ht-1}u) & ${Ht-1}u;
    let y_src = (y + dy * 5u + 251u) & 255u;
    let row_off = (z_src * 256u + y_src) * ${t}u + x_pad;
    let wb_tap = tap_yz * ${hr*3*bn}u;
${f("act8_0",0)}${f("act8_1",Rt)}  }

  let y_base = (z * 256u + y) * ${n}u + x4;
${r(Rt,m=>`  ${a}[y_base + ${m*yn}u] = pack4x8unorm(a_${l+m} * 0.5 + vec4<f32>(0.5));
`)}
}`};return`@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> y8_0 : array<u32>;
@group(0) @binding(3) var<storage, read_write> y8_1 : array<u32>;
@group(0) @binding(4) var<storage, read> w_eff : array<vec4<f32>>;

${o("main_lo",0,"y8_0")}

${o("main_hi",3,"y8_1")}`}async function ta(e,t){let n=jr.get(e);n||(n=new Map,jr.set(e,n));const r=t?"f16":"f32";let o=n.get(r);return o||(o=(async()=>{const s=ea(t),i=e.createShaderModule({code:s});if(t){const m=await e.createComputePipelineAsync({layout:"auto",compute:{module:i,entryPoint:"main"}});return{main:m,bgl:m.getBindGroupLayout(0)}}const a=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}}]}),l=e.createPipelineLayout({bindGroupLayouts:[a]}),[u,f]=await Promise.all([e.createComputePipelineAsync({layout:l,compute:{module:i,entryPoint:"main_lo"}}),e.createComputePipelineAsync({layout:l,compute:{module:i,entryPoint:"main_hi"}})]);return{lo:u,hi:f,bgl:a}})().catch(s=>{throw n.delete(r),s}),n.set(r,o)),o}async function na(e,t={}){const n=t?.env||null;if(typeof t?.runProbe=="function"){const s=await t.runProbe(e),i=Math.max(.1,Number(s?.probeMs??s)||.1),a=Number.isFinite(s?.estFullLayerMs)?s.estFullLayerMs:i*(un/Yr),l=s?.tier||Qr(a);return{probeMs:i,warmupMs:Number(s?.warmupMs??0),estFullLayerMs:a,msPerStrip24:a/un,tier:l,abortedEarly:!!s?.abortedEarly}}const r=Zn.get(e);if(r)return r;const o=(async()=>{const s=t.hasF16!==void 0?!!t.hasF16:!!e?.features?.has?.("shader-f16"),i=GPUBufferUsage.STORAGE,a=GPUBufferUsage.COPY_DST,l=GPUBufferUsage.UNIFORM,u=Ht*256*Rt*qn*4,f=Ht*256*Rt*yn*4,m=s?wr*16:_r*16,c=[],p=typeof e.pushErrorScope=="function"&&typeof e.popErrorScope=="function";let d=!1;p&&(e.pushErrorScope("out-of-memory"),d=!0);try{const _=await ta(e,s),z=(M,k)=>{const I=e.createBuffer({size:M,usage:k});return c.push(I),I},w=z(u,i),g=z(u,i),x=z(f,i),P=z(f,i),$=z(m,(s?l:i)|a);if(s){const M=new Uint32Array(wr*4);M.fill(2703171871),e.queue.writeBuffer($,0,M)}else{const M=new Float32Array(_r*4);for(let k=0;k<M.length;k++)M[k]=k&1?-.01:.01;e.queue.writeBuffer($,0,M)}const y=e.createBindGroup({layout:_.bgl,entries:[{binding:0,resource:{buffer:w}},{binding:1,resource:{buffer:g}},{binding:2,resource:{buffer:x}},{binding:3,resource:{buffer:P}},{binding:4,resource:{buffer:$}}]}),C=(M,k,I,q)=>{for(let J=0;J<q;J++)if(s){const E=M.beginComputePass();E.setPipeline(_.main),E.setBindGroup(0,y),E.dispatchWorkgroups(1,k,I),E.end()}else{const E=M.beginComputePass();E.setPipeline(_.lo),E.setBindGroup(0,y),E.dispatchWorkgroups(1,k,I),E.end();const Z=M.beginComputePass();Z.setPipeline(_.hi),Z.setBindGroup(0,y),Z.dispatchWorkgroups(1,k,I),Z.end()}},S=e.createCommandEncoder();C(S,Zr,1,1);const h=Un(n);e.queue.submit([S.finish()]),await e.queue.onSubmittedWorkDone();const A=Math.max(.1,Un(n)-h);let b;if(A>=Xs){const M=A*(un/Zr);b={probeMs:A,warmupMs:A,estFullLayerMs:M,msPerStrip24:M/un,tier:"very-slow",abortedEarly:!0}}else{const M=async()=>{const Z=e.createCommandEncoder();C(Z,64,Ht,Ao);const me=Un(n);return e.queue.submit([Z.finish()]),await e.queue.onSubmittedWorkDone(),Math.max(.1,Un(n)-me)},k=await M(),I=k>=Ys?k:await M(),q=Math.min(k,I),J=q*(un/Yr),E=Qr(J);b={probeMs:q,warmupMs:A,estFullLayerMs:J,msPerStrip24:J/un,tier:E,abortedEarly:!1}}if(d){d=!1;const M=await e.popErrorScope();if(M){const k=new Error(`WebGPU micro-probe out of memory: ${M.message||"allocation failed"}`);throw k.oomError=M,k}}return b}finally{for(const _ of c)try{_.destroy()}catch{}if(d){d=!1;try{await e.popErrorScope()}catch{}}}})().finally(()=>{Zn.delete(e)});return Zn.set(e,o),o}function gn(e){const t=Math.floor(e/1048576);return t<=128?"limit<=128M":`limit<=${t}M`}function Kn(e,t){const n=Math.max(8,Number(t)||24)/24,r=Math.max(.35,Math.min(1,n*n));return Math.max(.005,Math.min(2,e*r))}function Qn(e){return e.chan===15||Array.isArray(e.dilations)&&e.dilations.length>=25}async function ra(e,t,n=null,r={}){const o=r?.env||null,s=En(e,o),i=Br(e,s,o),a=Cr(i),l=e?.limits||{},u=Math.min(l.maxStorageBufferBindingSize??1/0,l.maxBufferSize??1/0),f=t.cs>=8&&t.cs%4===0,m=Number(r.actBytes??0),c=Number(r.outBufBytes??0),p=(m>u||c>u)&&f,d=Eo(Bo(o)),_=Gn(n?.webgpuExecMode)||d.exec,z=n?.forceLowMem128===!0?!0:n?.forceLowMem128===!1?!1:d.mode==="low-memory"?!0:d.mode==="standard"?!1:null,w=!!(d.mode==="low-memory"||d.mode==="standard"||d.exec||n?.__v4PlanReasonOverride==="url-override"),g=n?.forceProbe===!0||d.mode==="probe"&&!e?.__v4ProbeDone;(d.mode==="recalibrate"||d.mode==="probe"||n?.recalibrate===!0)&&!e?.__v4Recalibrated&&(Qs(e,a,o),e&&(e.__v4Recalibrated=!0));const P=({layout:k,execMode:I,reason:q,tier:J=null,probeMs:E=null,estFullLayerMs:Z=null,msPerStrip:me=null,fromCache:be=!1,safeMode:G=!1})=>{const T=p||k==="LowMem128"&&f?"LowMem128":"std",ee=T==="std"&&(I==="paced"||I==="calibrate");return e&&Number.isFinite(me)&&(e.__v4MsPerStrip=me),{layout:T,execMode:I,chunkableStd:ee,reason:q,tier:J,probeMs:E,estFullLayerMs:Z,msPerStrip:me,fromCache:be,safeMode:G,fingerprint:i,storageKey:a,platform:s}};if(n?.__v4PlanReasonOverride==="safe-mode-retry")return P({layout:f?"LowMem128":"std",execMode:"paced",reason:"safe-mode-retry",safeMode:!0});const $=g?null:Lo(e,a,o);if(!g&&(z!==null||_!=="")){let k="std",I="";p?(k="LowMem128",I=gn(u)):z===!0?k=f?"LowMem128":"std":z===!1?k="std":s.isWindowsSharedIgpu&&t.cs>=24&&f?(k="LowMem128",I="hint:win-igpu"):s.isLinuxIntelGen9&&Qn(t)&&f?(k="LowMem128",I="hint:intel-gen9"):$?.safeMode==="low-memory-paced"&&f?(k="LowMem128",I="cached-safe-mode"):$?.tier==="very-slow"&&f&&(k="LowMem128",I="cached-probe");let q=_;q||(z===!0?q="paced":s.isApple?q="single":s.isWindowsSharedIgpu||s.isLinuxIntelGen9?q="paced":q="pipelined");const J=p&&z===!1?gn(u):w?"url-override":I||"override";return P({layout:k,execMode:q,reason:J,tier:$?.tier??null,probeMs:$?.probeMs??null,estFullLayerMs:$?.estFullLayerMs??null,msPerStrip:$?.msPerStrip24?Kn($.msPerStrip24,t.cs):null,fromCache:!!$,safeMode:$?.safeMode==="low-memory-paced"})}if(s.isApple&&!g)return $?.safeMode==="low-memory-paced"?P({layout:f?"LowMem128":"std",execMode:"paced",reason:"cached-safe-mode",fromCache:!0,safeMode:!0}):P({layout:p?"LowMem128":"std",execMode:"single",reason:p?gn(u):"apple"});if(!g&&$?.safeMode==="low-memory-paced")return s.isWindows&&e&&(e.__v4WinCalibrated=!0,e.__v4WinFast=!1),P({layout:f?"LowMem128":"std",execMode:"paced",reason:"cached-safe-mode",tier:$.tier??"very-slow",probeMs:$.probeMs??null,estFullLayerMs:$.estFullLayerMs??null,msPerStrip:$.msPerStrip24?Kn($.msPerStrip24,t.cs):null,fromCache:!0,safeMode:!0});if(!g&&s.isLinuxIntelGen9){const k=p||Qn(t)&&f;return P({layout:k?"LowMem128":"std",execMode:"paced",reason:p?gn(u):"hint:intel-gen9"})}if(!g&&s.isWindowsSharedIgpu){e&&(e.__v4WinCalibrated=!0,e.__v4WinFast=!1);const k=p||t.cs>=24&&f;return P({layout:k?"LowMem128":"std",execMode:"paced",reason:p?gn(u):"hint:win-igpu"})}let y=!g&&$&&$.tier&&Number.isFinite($.estFullLayerMs)?$:null,C=!!y;if(!y)try{const k=await na(e,{hasF16:r.hasF16,runProbe:r.runProbe,env:o});y=Uo(e,a,{tier:k.tier,probeMs:Number(k.probeMs.toFixed(2)),estFullLayerMs:Number(k.estFullLayerMs.toFixed(1)),msPerStrip24:k.msPerStrip24,safeMode:null,safeModeReason:null},o),e&&(e.__v4ProbeDone=!0),C=!1}catch(k){const I=Io(k,e,!!e?.__isLost);if(I==="device-lost")throw k;const q=I==="oom"?"very-slow":"moderate";y={tier:q,probeMs:null,estFullLayerMs:q==="very-slow"?dr:mr,msPerStrip24:(q==="very-slow"?dr:mr)/un},C=!1}s.isWindows&&e&&(e.__v4WinCalibrated=!0,e.__v4WinFast=y.tier==="fast");const S=Number(y.estFullLayerMs),h=!!(s.isMaskedGpu&&y.tier==="moderate"&&S>=Zs&&(t.cs>=24||Qn(t))),A=p||f&&(y.tier==="very-slow"||h),b=_||(y.tier==="fast"?"pipelined":"paced");let M;return p?M=gn(u):C?M="cached-probe":Number.isFinite(y.probeMs)?M=`probe:${Number(y.probeMs).toFixed(1)}ms`:M="probe:fallback",P({layout:A?"LowMem128":"std",execMode:b,reason:M,tier:y.tier,probeMs:y.probeMs??null,estFullLayerMs:Number.isFinite(S)?S:null,msPerStrip:Number.isFinite(y.msPerStrip24)?Kn(y.msPerStrip24,t.cs):null,fromCache:C,safeMode:!1})}function Ro(e,t=null){const n=t?` | ${t.chan}ch(cs=${t.cs})/${t.dilations?.length??"?"}L`:"",r=Number.isFinite(e?.estFullLayerMs)?` | est24ch=${Math.round(e.estFullLayerMs)}ms(${e.tier})`:"";return`[WebGPU-V4] layout=${e.layout} exec=${e.execMode} reason=${e.reason}${r}${n}`}async function oa(e,t=10){return e?e.__isLost?!0:!e.lost||typeof e.lost.then!="function"?!1:Promise.race([e.lost.then(n=>(e.__isLost=!0,n?.reason!=="destroyed")),new Promise(n=>setTimeout(()=>n(!!e.__isLost),t))]):!1}function Io(e,t=null,n=!1){if(n||t?.__isLost)return"device-lost";if(e?.oomError)return"oom";const r=String(e?.message||e||"");return/\bdevice(?:\s+was|\s+is)?\s+lost\b|gpu\s+reset|engine\s+reset|\btdr\b|instance\s+dropped|device\s+destroyed/i.test(r)?"device-lost":/out[- ]of[- ]memory|\boom\b|allocation\s+failed|failed\s+to\s+allocate|exceeds\s+device\s+limit|binding\s+size|maxbuffersize|maxstoragebufferbinding/i.test(r)?"oom":null}async function sa({device:e,modelEntry:t,runAttempt:n,requestFreshDevice:r,onRetry:o=null,env:s=null}){try{return await n(e,t,{isRetry:!1})}catch(i){const a=!!t?.quantize8Bit,l=await oa(e,s?.lostWaitMs??10),u=Io(i,e,l),f=e?.__v4LastPlan||null,m=f?.layout==="LowMem128"&&f?.execMode==="paced"||t?.forceLowMem128===!0&&Gn(t?.webgpuExecMode)==="paced",p=Eo(Bo(s)).mode==="standard"||t?.forceLowMem128===!1;if(!a||!u||m||p||typeof r!="function")throw i;Js(e,u,s);const d=await r({failedDevice:e,failureKind:u,error:i});if(!d||d.__isLost){const z=new Error(`WebGPU safe-mode retry aborted: could not acquire fresh GPUDevice after ${u} (${i?.message||i})`);throw z.priorWebGpuError=i,z}const _={...t,forceLowMem128:!0,webgpuExecMode:"paced",__v4PlanReasonOverride:"safe-mode-retry"};o?.({failureKind:u,error:i,retryEntry:_,freshDevice:d});try{return await n(d,_,{isRetry:!0})}catch(z){throw z&&typeof z=="object"&&(z.priorWebGpuError=i),z}}}var mn=348,nn=352,To=0,Jn=1002,Je={UINT8:2,INT16:4,INT32:8,FLOAT32:16,FLOAT64:64,INT8:256,UINT16:512,UINT32:768,INT64:1024,UINT64:1280};function Er(e){switch(e){case Je.UINT8:case Je.INT8:return 1;case Je.INT16:case Je.UINT16:return 2;case Je.INT32:case Je.UINT32:case Je.FLOAT32:return 4;case Je.FLOAT64:case Je.INT64:case Je.UINT64:return 8;default:return 0}}function aa(e){if(!e||e.length<16)return!1;for(let r=0;r<16;r++)if(!Number.isFinite(e[r]))return!1;const t=e[0]*(e[5]*e[10]-e[6]*e[9])-e[1]*(e[4]*e[10]-e[6]*e[8])+e[2]*(e[4]*e[9]-e[5]*e[8]);let n=0;for(let r=0;r<3;r++)for(let o=0;o<3;o++)n=Math.max(n,Math.abs(e[r*4+o]));return Number.isFinite(t)&&n>0&&Math.abs(t)>1e-9*n*n*n}function ia(e,t,n,r,o,s,i,a,l,u){let f=e,m=t,c=n,p=1-(f*f+m*m+c*c);if(p<1e-7){const w=Math.sqrt(f*f+m*m+c*c);if(w>0){const g=1/w;f*=g,m*=g,c*=g}p=0}else p=Math.sqrt(p);const d=i>0?i:1,_=a>0?a:1;let z=l>0?l:1;return u<0&&(z=-z),[(p*p+f*f-m*m-c*c)*d,2*(f*m-p*c)*_,2*(f*c+p*m)*z,r,2*(f*m+p*c)*d,(p*p+m*m-f*f-c*c)*_,2*(m*c-p*f)*z,o,2*(f*c-p*m)*d,2*(m*c+p*f)*_,(p*p+c*c-m*m-f*f)*z,s,0,0,0,1]}function er(e){let t=0;for(let n=0;n<3;n++){const r=Math.abs(e[n])+Math.abs(e[3+n])+Math.abs(e[6+n]);r>t&&(t=r)}return t}function tr(e){let t=0;for(let n=0;n<3;n++){const r=n*3,o=Math.abs(e[r])+Math.abs(e[r+1])+Math.abs(e[r+2]);o>t&&(t=o)}return t}function la(e){const t=e[4]*e[8]-e[5]*e[7],n=-(e[3]*e[8]-e[5]*e[6]),r=e[3]*e[7]-e[4]*e[6],o=e[0]*t+e[1]*n+e[2]*r;if(!Number.isFinite(o)||Math.abs(o)<1e-18)return null;const s=1/o;return[t*s,-(e[1]*e[8]-e[2]*e[7])*s,(e[1]*e[5]-e[2]*e[4])*s,n*s,(e[0]*e[8]-e[2]*e[6])*s,-(e[0]*e[5]-e[2]*e[3])*s,r*s,-(e[0]*e[7]-e[1]*e[6])*s,(e[0]*e[4]-e[1]*e[3])*s]}function ca(e){let t=e.slice(),n=er(t);if(n===0)return t;let r=tr(t);for(let o=0;o<64;o++){const s=la(t);if(!s)break;const i=er(s),a=tr(s),l=Math.sqrt(Math.sqrt(i*a/(n*r))),u=.5*l,f=.5/l;let m=0;const c=new Array(9);for(let p=0;p<3;p++)for(let d=0;d<3;d++){const _=p*3+d,z=u*t[_]+f*s[d*3+p];m+=Math.abs(z-t[_]),c[_]=z}if(t=c,m<1e-12)break;n=er(t),r=tr(t)}return t}function ua(e){const t=e[3],n=e[7],r=e[11];let o=e[0],s=e[1],i=e[2],a=e[4],l=e[5],u=e[6],f=e[8],m=e[9],c=e[10],p=Math.sqrt(o*o+a*a+f*f),d=Math.sqrt(s*s+l*l+m*m),_=Math.sqrt(i*i+u*u+c*c);p===0&&(o=1,a=0,f=0,p=1),d===0&&(l=1,s=0,m=0,d=1),_===0&&(c=1,i=0,u=0,_=1);const z=p,w=d,g=_;o/=p,a/=p,f/=p,s/=d,l/=d,m/=d,i/=_,u/=_,c/=_;const x=ca([o,s,i,a,l,u,f,m,c]);o=x[0],s=x[1],i=x[2],a=x[3],l=x[4],u=x[5],f=x[6],m=x[7],c=x[8];const P=o*l*c-o*m*u-a*s*c+a*m*i+f*s*u-f*l*i;let $=1;P<=0&&($=-1,i=-i,u=-u,c=-c);let y=o+l+c+1,C,S,h;if(y>.5)y=.5*Math.sqrt(y),C=.25*(m-u)/y,S=.25*(i-f)/y,h=.25*(a-s)/y;else{const A=1+o-(l+c),b=1+l-(o+c),M=1+c-(o+l);A>1?(C=.5*Math.sqrt(A),S=.25*(s+a)/C,h=.25*(i+f)/C,y=.25*(m-u)/C):b>1?(S=.5*Math.sqrt(b),C=.25*(s+a)/S,h=.25*(u+m)/S,y=.25*(i-f)/S):(h=.5*Math.sqrt(M),C=.25*(i+f)/h,S=.25*(u+m)/h,y=.25*(a-s)/h),y<0&&(C=-C,S=-S,h=-h)}return{quaternB:C,quaternC:S,quaternD:h,qoffsetX:t,qoffsetY:n,qoffsetZ:r,dx:z,dy:w,dz:g,qfac:$}}function fa(e,t,n,r,o){const s=Er(r);if(!s)throw new Error(`Unsupported NIfTI-1 datatype code: ${r}`);const i=n*s;if(t+i>e.byteLength)throw new Error(`NIfTI-1 data truncated: need ${t+i} bytes, got ${e.byteLength}`);if(o){const l=(e.byteOffset+t&s-1)===0,u=l?e.buffer:e.slice(t,t+i).buffer,f=l?e.byteOffset+t:0;switch(r){case Je.UINT8:return new Uint8Array(u,f,n);case Je.INT8:return new Int8Array(u,f,n);case Je.INT16:return new Int16Array(u,f,n);case Je.UINT16:return new Uint16Array(u,f,n);case Je.INT32:return new Int32Array(u,f,n);case Je.UINT32:return new Uint32Array(u,f,n);case Je.FLOAT32:return new Float32Array(u,f,n);case Je.FLOAT64:return new Float64Array(u,f,n);case Je.INT64:return new BigInt64Array(u,f,n);case Je.UINT64:return new BigUint64Array(u,f,n)}}const a=new DataView(e.buffer,e.byteOffset+t,i);switch(r){case Je.UINT8:return e.subarray(t,t+n);case Je.INT8:return new Int8Array(e.slice(t,t+n).buffer);case Je.INT16:{const l=new Int16Array(n);for(let u=0;u<n;u++)l[u]=a.getInt16(u*2,!1);return l}case Je.UINT16:{const l=new Uint16Array(n);for(let u=0;u<n;u++)l[u]=a.getUint16(u*2,!1);return l}case Je.INT32:{const l=new Int32Array(n);for(let u=0;u<n;u++)l[u]=a.getInt32(u*4,!1);return l}case Je.UINT32:{const l=new Uint32Array(n);for(let u=0;u<n;u++)l[u]=a.getUint32(u*4,!1);return l}case Je.FLOAT32:{const l=new Float32Array(n);for(let u=0;u<n;u++)l[u]=a.getFloat32(u*4,!1);return l}case Je.FLOAT64:{const l=new Float64Array(n);for(let u=0;u<n;u++)l[u]=a.getFloat64(u*8,!1);return l}case Je.INT64:{const l=new BigInt64Array(n);for(let u=0;u<n;u++)l[u]=a.getBigInt64(u*8,!1);return l}case Je.UINT64:{const l=new BigUint64Array(n);for(let u=0;u<n;u++)l[u]=a.getBigUint64(u*8,!1);return l}default:throw new Error(`Unsupported NIfTI-1 datatype code: ${r}`)}}function pa(e){const t=e instanceof Uint8Array?e:new Uint8Array(e);if(t.byteLength<nn)throw new Error(`Invalid NIfTI-1 input: expected at least ${nn} bytes, got ${t.byteLength}`);const n=new DataView(t.buffer,t.byteOffset,t.byteLength),r=n.getInt32(0,!0),o=n.getInt32(0,!1);let s;if(r===mn)s=!0;else if(o===mn)s=!1;else throw new Error(`Invalid NIfTI-1 header: sizeof_hdr is ${r} (expected ${mn})`);const i=String.fromCharCode(t[344],t[345],t[346],t[347]);if(i!=="n+1\0")throw new Error(`Unsupported NIfTI-1 magic '${i.replace(/\0/g,"\\0")}'; expected single-file 'n+1\\0'`);const a=new Array(8);for(let se=0;se<8;se++)a[se]=n.getInt16(40+se*2,s);const l=a[1],u=a[2],f=a[3],m=a[0]>=4&&a[4]>0?a[4]:1;if(l<1||u<1||f<1||m!==1)throw new Error(`NIfTI-1 input must be a scalar 3D image; got dims=[${a.slice(0,5).join(", ")}]`);const c=n.getInt16(68,s),p=n.getInt16(70,s),d=n.getInt16(72,s),_=new Array(8);for(let se=0;se<8;se++)_[se]=n.getFloat32(76+se*4,s);const z=Math.floor(n.getFloat32(108,s)),w=z>=nn?z:nn,g=n.getFloat32(112,s),x=n.getFloat32(116,s),P=n.getFloat32(124,s),$=n.getFloat32(128,s),y=n.getInt16(252,s),C=n.getInt16(254,s),S=n.getFloat32(256,s),h=n.getFloat32(260,s),A=n.getFloat32(264,s),b=n.getFloat32(268,s),M=n.getFloat32(272,s),k=n.getFloat32(276,s),I=[n.getFloat32(280,s),n.getFloat32(284,s),n.getFloat32(288,s),n.getFloat32(292,s)],q=[n.getFloat32(296,s),n.getFloat32(300,s),n.getFloat32(304,s),n.getFloat32(308,s)],J=[n.getFloat32(312,s),n.getFloat32(316,s),n.getFloat32(320,s),n.getFloat32(324,s)],E=Math.abs(_[1])||1,Z=Math.abs(_[2])||1,me=Math.abs(_[3])||1,be=[E,0,0,0,0,Z,0,0,0,0,me,0,0,0,0,1],G=_[0]<0?-1:1,T=y>0?ia(S,h,A,b,M,k,E,Z,me,G):be.slice(),ee=C>0?[...I,...q,...J,0,0,0,1]:T.slice(),j=C>0?ee.slice():T.slice(),le=l*u*f,te=fa(t,w,le,p,s),D=new Uint8Array(nn);return D.set(t.subarray(0,mn),0),{header:{dims:a,pixDims:_,datatypeCode:p,numBitsPerVoxel:d,voxOffset:w,sclSlope:g,sclInter:x,calMin:$,calMax:P,intentCode:c,qformCode:y,sformCode:C,quaternB:S,quaternC:h,quaternD:A,qoffsetX:b,qoffsetY:M,qoffsetZ:k,qtoXyz:T,stoXyz:ee,affine:j,littleEndian:s,rawHeader:D},data:te}}function ma(e,t,n){const r=e.length,o=new Float32Array(r),s=Number.isFinite(t)&&t!==0?t:1,i=Number.isFinite(n)?n:0,a=e instanceof BigInt64Array||e instanceof BigUint64Array;let l=0;for(let u=0;u<r;u++){const m=(a?Number(e[u]):e[u])*s+i;Number.isFinite(m)?(o[u]=m,l++):o[u]=0}if(l===0)throw new Error("brainchomp: input has no finite voxels");return o}function hn(e,t,n={}){const r=n.datatypeCode??e?.datatypeCode??Je.UINT8,o=Er(r);if(!o)throw new Error(`Unsupported NIfTI-1 datatype code: ${r}`);const s=new Uint8Array(t.buffer,t.byteOffset,t.byteLength),i=new Uint8Array(nn+s.byteLength);e&&e.littleEndian&&e.rawHeader.byteLength>=mn&&i.set(e.rawHeader.subarray(0,mn),0);const a=new DataView(i.buffer);a.setInt32(0,mn,!0);const l=n.dims?[3,n.dims[0],n.dims[1],n.dims[2],1,1,1,1]:e?[3,e.dims[1],e.dims[2],e.dims[3],1,1,1,1]:[3,1,1,1,1,1,1,1];for(let c=0;c<8;c++)a.setInt16(40+c*2,l[c],!0);const u=n.intentCode??e?.intentCode??To;a.setFloat32(56,0,!0),a.setFloat32(60,0,!0),a.setFloat32(64,0,!0),a.setInt16(68,u,!0),a.setInt16(70,r,!0),a.setInt16(72,o*8,!0);const f=e?e.pixDims.slice():[1,1,1,1,1,0,0,0];n.pixDims&&(f[1]=n.pixDims[0],f[2]=n.pixDims[1],f[3]=n.pixDims[2]);for(let c=0;c<8;c++)a.setFloat32(76+c*4,f[c]??0,!0);if(a.setFloat32(108,nn,!0),a.setFloat32(112,n.sclSlope??e?.sclSlope??1,!0),a.setFloat32(116,n.sclInter??e?.sclInter??0,!0),a.setFloat32(124,n.calMax??e?.calMax??0,!0),a.setFloat32(128,n.calMin??e?.calMin??0,!0),i.fill(0,328,344),n.descrip!==void 0){i.fill(0,148,228);for(let c=0;c<Math.min(80,n.descrip.length);c++)i[148+c]=n.descrip.charCodeAt(c)&127}const m=n.affine??(e&&!e.littleEndian?e.stoXyz:null);if(m){const c=n.sformCode??n.qformCode??Math.max(e?.qformCode??0,e?.sformCode??0,1);a.setInt16(252,n.qformCode??c,!0),a.setInt16(254,n.sformCode??c,!0);const p=ua(m);a.setFloat32(76,p.qfac,!0),a.setFloat32(80,n.preservePixDims?n.preservePixDims[0]:p.dx,!0),a.setFloat32(84,n.preservePixDims?n.preservePixDims[1]:p.dy,!0),a.setFloat32(88,n.preservePixDims?n.preservePixDims[2]:p.dz,!0),a.setFloat32(256,p.quaternB,!0),a.setFloat32(260,p.quaternC,!0),a.setFloat32(264,p.quaternD,!0),a.setFloat32(268,p.qoffsetX,!0),a.setFloat32(272,p.qoffsetY,!0),a.setFloat32(276,p.qoffsetZ,!0);for(let d=0;d<4;d++)a.setFloat32(280+d*4,m[d],!0);for(let d=0;d<4;d++)a.setFloat32(296+d*4,m[4+d],!0);for(let d=0;d<4;d++)a.setFloat32(312+d*4,m[8+d],!0)}else if(e&&!e.littleEndian){a.setInt16(252,e.qformCode,!0),a.setInt16(254,e.sformCode,!0),a.setFloat32(256,e.quaternB,!0),a.setFloat32(260,e.quaternC,!0),a.setFloat32(264,e.quaternD,!0),a.setFloat32(268,e.qoffsetX,!0),a.setFloat32(272,e.qoffsetY,!0),a.setFloat32(276,e.qoffsetZ,!0);for(let c=0;c<4;c++)a.setFloat32(280+c*4,e.stoXyz[c],!0);for(let c=0;c<4;c++)a.setFloat32(296+c*4,e.stoXyz[4+c],!0);for(let c=0;c<4;c++)a.setFloat32(312+c*4,e.stoXyz[8+c],!0)}return i[344]=110,i[345]=43,i[346]=49,i[347]=0,i[348]=0,i[349]=0,i[350]=0,i[351]=0,i.set(s,nn),i}var ln=new WeakMap,da=class{getLabelMeta(e){return ln.get(e)||null}idx(e,t,n,r){return n*r[0]*r[1]+t*r[0]+e}check_previous_slice(e,t,n,r,o,s,i,a,l,u){let f=0;if(!o)return 0;const m=e[this.idx(n,r,o,s)];if(i>=6){const c=this.idx(n,r,o-1,s);m===e[c]&&(l[f++]=t[c])}if(i>=18){if(n){const c=this.idx(n-1,r,o-1,s);m===e[c]&&(l[f++]=t[c])}if(r){const c=this.idx(n,r-1,o-1,s);m===e[c]&&(l[f++]=t[c])}if(n<s[0]-1){const c=this.idx(n+1,r,o-1,s);m===e[c]&&(l[f++]=t[c])}if(r<s[1]-1){const c=this.idx(n,r+1,o-1,s);m===e[c]&&(l[f++]=t[c])}}if(i===26){if(n&&r){const c=this.idx(n-1,r-1,o-1,s);m===e[c]&&(l[f++]=t[c])}if(n<s[0]-1&&r){const c=this.idx(n+1,r-1,o-1,s);m===e[c]&&(l[f++]=t[c])}if(n&&r<s[1]-1){const c=this.idx(n-1,r+1,o-1,s);m===e[c]&&(l[f++]=t[c])}if(n<s[0]-1&&r<s[1]-1){const c=this.idx(n+1,r+1,o-1,s);m===e[c]&&(l[f++]=t[c])}}return f?(this.fill_tratab(a,l,f,u),l[0]):0}do_initial_labelling(e,t,n,r=null){const o=t[0]|0,s=t[1]|0,i=t[2]|0,a=o*s,l=a*i;let u=1;const f=8192;let m=f,c=new Uint32Array(m),p;if(n===6&&r&&r.il&&r.il.length===l){if(p=r.il,r.dirty)p.fill(0);else if(r.runs&&r.runLen>0){const w=r.runs,g=r.runLen;for(let x=0;x<g;x+=2)p.fill(0,w[x],w[x+1])}}else p=new Uint32Array(l),n===6&&r&&(r.il=p,r.runs=null,r.runLen=0,r.dirty=!1);if(n===6){r&&(r.dirty=!0);const w=(e instanceof Uint8Array||e instanceof Uint8ClampedArray)&&(e.byteOffset&3)===0&&(o&3)===0&&e.length>=l?new Uint32Array(e.buffer,e.byteOffset,l>>2):null;let g=r&&r.runs?r.runs:new Uint32Array(8192),x=g.length,P=0,$=0,y=0,C=0,S=-1,h=-1,A=i,b=-1;for(let M=0;M<i;M++){const k=M*a;for(let I=0;I<s;I++){const q=k+I*o;let J=0;if(w){const Z=q+o>>2;let me=q>>2;for(;me<Z&&w[me]===0;)me++;if(me===Z)continue;J=(me<<2)-q}let E=!1;for(;J<o;J++){const Z=q+J;if(w&&!E&&(J&3)===0&&w[Z>>2]===0){J+=3;continue}const me=e[Z];if(me===0){E&&(g[P++]=Z,E=!1);continue}if(!E){if(P+2>x){x<<=1;const G=new Uint32Array(x);G.set(g),g=G}g[P++]=Z,E=!0}S<0&&(S=Z,A=M),h=Z,b=M;let be=0;if(M>0&&e[Z-a]===me&&($=p[Z-a],be=1),J>0&&e[Z-1]===me){const G=p[Z-1];be===0?$=G:be===1?y=G:C=G,be++}if(I>0&&e[Z-o]===me){const G=p[Z-o];be===0?$=G:be===1?y=G:C=G,be++}if(be===0){if(p[Z]=u,u>=m){m+=f;const G=new Uint32Array(m);G.set(c),c=G}c[u-1]=u,u++}else if(p[Z]=$,be===2&&y!==$){let G=$;for(;c[G-1]!==G;)G=c[G-1];let T=y;for(;c[T-1]!==T;)T=c[T-1];const ee=G<T?G:T;c[G-1]=ee,c[T-1]=ee}else if(be===3&&(y!==$||C!==$)){let G=$;for(;c[G-1]!==G;)G=c[G-1];let T=y;for(;c[T-1]!==T;)T=c[T-1];let ee=C;for(;c[ee-1]!==ee;)ee=c[ee-1];let j=G<T?G:T;ee<j&&(j=ee),c[G-1]=j,c[T-1]=j,c[ee-1]=j}}E&&(g[P++]=q+o)}}for(let M=0;M<u-1;M++){let k=M;for(;c[k]!==k+1;)k=c[k]-1;c[M]=k+1}return r&&(r.runs=g,r.runLen=P,r.dirty=!1),this._lastInitialRange={conn:6,fgStart:S,fgEnd:h,minSl:A,maxSl:b,runs:g,runLen:P},[u-1,c,p]}const d=new Uint32Array(32),_=new Uint32Array(32),z=new Uint32Array(27);for(let w=0;w<i;w++)for(let g=0;g<s;g++)for(let x=0;x<o;x++){let P=0;const $=e[this.idx(x,g,w,t)];if($!==0){if(z[0]=this.check_previous_slice(e,p,x,g,w,t,n,c,d,_),z[0]&&(P+=1),n>=6){if(x){const y=this.idx(x-1,g,w,t);$===e[y]&&(z[P++]=p[y])}if(g){const y=this.idx(x,g-1,w,t);$===e[y]&&(z[P++]=p[y])}}if(n>=18){if(g&&x){const y=this.idx(x-1,g-1,w,t);$===e[y]&&(z[P++]=p[y])}if(g&&x<o-1){const y=this.idx(x+1,g-1,w,t);$===e[y]&&(z[P++]=p[y])}}if(P)p[this.idx(x,g,w,t)]=z[0],this.fill_tratab(c,z,P,_);else{if(p[this.idx(x,g,w,t)]=u,u>=m){m+=f;const y=new Uint32Array(m);y.set(c),c=y}c[u-1]=u,u++}}}for(let w=0;w<u-1;w++){let g=w;for(;c[g]!==g+1;)g=c[g]-1;c[w]=g+1}return this._lastInitialRange=null,[u-1,c,p]}fill_tratab(e,t,n,r){let s=2147483647;for(let i=0;i<n;i++){let a=t[i];for(;e[a-1]!==a;)a=e[a-1];r[i]=a,s=Math.min(s,a)}for(let i=0;i<n;i++)e[r[i]-1]=s}translate_labels(e,t,n,r,o=null,s=null){const i=t[0]*t[1]*t[2];if(s&&(r===0||s.fgStart<0))return o&&(this._lastMeta={conn:s.conn,cl:0,fgStart:0,fgEnd:-1,minSl:0,maxSl:-1,ls2bw:new Uint32Array(1),sumls:new Uint32Array(1),distinctFgClasses:0,bw:o}),[0,e];let a=0;for(let d=0;d<r;d++)n[d]>a&&(a=n[d]);const l=new Uint32Array(a+1),u=o&&s?new Uint32Array(r+1):null,f=o&&s?new Uint32Array(r+1):null,m=s?s.fgStart:0,c=s?s.fgEnd:i-1;let p=0;if(s&&s.runs){const d=s.runs,_=s.runLen;for(let z=0;z<_;z+=2){const w=d[z],g=d[z+1];for(let x=w;x<g;x++){const P=n[e[x]-1];let $=l[P];$||(p+=1,$=p,l[P]=$,u&&(u[$]=o[x])),e[x]=$,f&&f[$]++}}}else for(let d=m;d<=c;d++){const _=e[d];if(_){const z=n[_-1];let w=l[z];w||(p+=1,w=p,l[z]=w,u&&(u[w]=o[d])),e[d]=w,f&&f[w]++}}if(o&&s){const d=u.slice(0,p+1),_=f.slice(0,p+1);let z=0;if(p>0){const w=d[1];z=1;for(let g=2;g<=p;g++)if(d[g]!==w){z=2;break}}this._lastMeta={conn:s.conn,cl:p,fgStart:s.fgStart,fgEnd:s.fgEnd,minSl:s.minSl,maxSl:s.maxSl,runs:s.runs,runLen:s.runLen,ls2bw:d,sumls:_,distinctFgClasses:z,bw:o}}return[p,e]}neighbor_winners(e,t,n,r,o=null,s=null){const i=t[0],a=t[1],l=t[2],u=i*a,f=!!(s&&o);let m=!1;for(let x=1;x<=r;x++)if(!n[x]){m=!0;break}if(!m)return f&&console.log("[relabel] 0/0 suppressed components resolved within their own class family (0 fell back to the unrestricted neighbour vote)"),new Uint32Array(r+1);const c=f?new Int32Array(r+1).fill(-1):null,p=new Map,d=(x,P)=>{let $=p.get(x);$||($=new Map,p.set(x,$)),$.set(P,($.get(P)||0)+1)},_=ln.get(e),z=_&&_.cl===r&&e.length===u*l;if(z&&_.runs){const x=_.runs,P=_.runLen;for(let $=0;$<P;$+=2){const y=x[$],C=x[$+1],S=y/u|0,h=y-S*u,A=h/i|0;let b=h-A*i;for(let M=y;M<C;M++,b++){const k=e[M];if(n[k])continue;f&&c[k]<0&&(c[k]=s(o[M]));let I;b>0&&(I=n[e[M-1]])&&d(k,I),b<i-1&&(I=n[e[M+1]])&&d(k,I),A>0&&(I=n[e[M-i]])&&d(k,I),A<a-1&&(I=n[e[M+i]])&&d(k,I),S>0&&(I=n[e[M-u]])&&d(k,I),S<l-1&&(I=n[e[M+u]])&&d(k,I)}}}else{const x=z?_.minSl:0,P=z?_.maxSl:l-1;let $=x*u;for(let y=x;y<=P;y++)for(let C=0;C<a;C++)for(let S=0;S<i;S++,$++){const h=e[$];if(h===0||n[h])continue;f&&c[h]<0&&(c[h]=s(o[$]));let A;S>0&&(A=n[e[$-1]])&&d(h,A),S<i-1&&(A=n[e[$+1]])&&d(h,A),C>0&&(A=n[e[$-i]])&&d(h,A),C<a-1&&(A=n[e[$+i]])&&d(h,A),y>0&&(A=n[e[$-u]])&&d(h,A),y<l-1&&(A=n[e[$+u]])&&d(h,A)}}const w=new Uint32Array(r+1).fill(0);let g=0;for(const[x,P]of p){const $=f?c[x]:0;let y=0,C=0;if($>0){for(const[S,h]of P)s(S)===$&&(h>C||h===C&&(y===0||S<y))&&(C=h,y=S);y&&g++}if(!y)for(const[S,h]of P)(h>C||h===C&&(y===0||S<y))&&(C=h,y=S);w[x]=y}return f&&console.log(`[relabel] ${g}/${p.size} suppressed components resolved within their own class family (${p.size-g} fell back to the unrestricted neighbour vote)`),w}finalize_volume(e,t,n,r,o,s=null,i=null,a=!1){const l=e.length,u=o?this.neighbor_winners(e,t,n,r,s,i):null,f=u?new Uint32Array(r+1):n;let m=0;for(let w=1;w<=r;w++){let g=n[w];u&&(g||(g=u[w]),f[w]=g),g>m&&(m=g)}const c=ln.get(e),p=c&&c.cl===r&&c.ls2bw.length===r+1&&c.fgEnd<l;let d=0;if(p&&c.runs){const w=c.runs,g=c.runLen;for(let $=1;$<=r;$++)c.sumls[$]>0&&f[$]>d&&(d=f[$]);if(c.bw===s&&s instanceof Uint8Array&&m<=255){const $=new Uint8Array(r+1);let y=!1;for(let S=1;S<=r;S++)c.sumls[S]>0&&f[S]!==c.ls2bw[S]&&($[S]=1,y=!0);const C=a?s:s.slice();if(y)for(let S=0;S<g;S+=2){const h=w[S],A=w[S+1];for(let b=h;b<A;b++){const M=e[b];$[M]&&(C[b]=f[M])}}return[d,C]}const P=s instanceof Uint8Array&&m<=255?new Uint8Array(l):new Uint32Array(l);for(let $=0;$<g;$+=2){const y=w[$],C=w[$+1];for(let S=y;S<C;S++){const h=f[e[S]];h&&(P[S]=h)}}return[d,P]}const z=s instanceof Uint8Array&&m<=255?new Uint8Array(l):new Uint32Array(l);if(p){if(c.fgStart>=0&&c.fgEnd>=c.fgStart)for(let w=c.fgStart;w<=c.fgEnd;w++){const g=e[w];if(g!==0){const x=f[g];x&&(z[w]=x,x>d&&(d=x))}}}else for(let w=0;w<l;w++){const g=e[w];if(g!==0){const x=f[g];x&&(z[w]=x,x>d&&(d=x))}}return[d,z]}diagnose_components(e,t,n,r,o={}){const s=o.topN??50,i=o.minSize??1,a=o.label??"diag",l=r[0],u=r[1],f=r[2],m=l*u,c=new Uint32Array(t+1),p=new Uint32Array(t+1);for(let S=0;S<e.length;S++){const h=n[S];h&&(c[h]=e[S],p[h]++)}const d=new Map,_=new Uint32Array(t+1),z=new Uint32Array(t+1),w=(S,h)=>{let A=d.get(S);A||(A=new Map,d.set(S,A)),A.set(h,(A.get(h)||0)+1)};for(let S=0;S<f;S++)for(let h=0;h<u;h++)for(let A=0;A<l;A++){const b=S*m+h*l+A,M=n[b];if(!M)continue;const k=c[M],I=q=>{const J=n[q];if(J===M)return;z[M]++;const E=J?c[J]:0;E===0?_[M]++:E!==k&&w(M,E)};A>0&&I(b-1),A<l-1&&I(b+1),h>0&&I(b-l),h<u-1&&I(b+l),S>0&&I(b-m),S<f-1&&I(b+m)}const g=new Map,x=new Map;for(let S=1;S<=t;S++){const h=c[S];g.set(h,(g.get(h)||0)+1),(!x.has(h)||p[S]>x.get(h))&&x.set(h,p[S])}const P=[];for(let S=1;S<=t;S++){if(p[S]<i)continue;const h=c[S],A=d.get(S);let b=0,M=0,k=0;if(A)for(const[q,J]of A)k+=J,J>M&&(M=J,b=q);const I=z[S]||1;P.push({comp:S,class:h,size:p[S],largestOfClass:p[S]===x.get(h)?"Y":"n",compsInClass:g.get(h),domNeighbor:b,domFracForeign:k?+(M/k).toFixed(2):0,domFracBoundary:+(M/I).toFixed(2),bgFrac:+(_[S]/I).toFixed(2)})}P.sort((S,h)=>h.domFracForeign-S.domFracForeign||h.size-S.size);const $=(S,h)=>{const A=h.map(M=>Math.max(M.h.length,...S.map(k=>String(k[M.k]).length))),b=M=>M.map((k,I)=>String(k).padStart(A[I])).join("  ");return[b(h.map(M=>M.h)),...S.map(M=>b(h.map(k=>M[k.k])))].join(`
`)},y=[{k:"comp",h:"comp"},{k:"class",h:"class"},{k:"size",h:"size"},{k:"largestOfClass",h:"lrg"},{k:"compsInClass",h:"nComp"},{k:"domNeighbor",h:"domNbr"},{k:"domFracForeign",h:"encF"},{k:"domFracBoundary",h:"encB"},{k:"bgFrac",h:"bgF"}];console.log(`[${a}] total components=${t}, distinct classes=${g.size}
[${a}] island candidates (encF≈1 + small size + lrg=n ⇒ swallowed island):
`+$(P.slice(0,s),y));const C=[...g.entries()].map(([S,h])=>({class:S,components:h,maxCompSize:x.get(S)})).sort((S,h)=>h.components-S.components);return console.log(`[${a}] per-class component counts (components=1 ⇒ fully connected):
`+$(C.slice(0,30),[{k:"class",h:"class"},{k:"components",h:"comps"},{k:"maxCompSize",h:"maxSize"}])),P}_collectComponentStats(e,t,n){const r=ln.get(n);if(r&&r.cl===t&&r.bw===e&&n.length===e.length)return[r.ls2bw,r.sumls];const o=e.length,s=new Uint32Array(t+1),i=new Uint32Array(t+1);for(let a=0;a<o;a++){const l=n[a];l>0&&(s[l]=e[a],i[l]++)}return[s,i]}_buildKeptMap(e,t,n,r,o){const s=new Uint32Array(n+1);let i=0;for(let l=1;l<=n;l++)e[l]>i&&(i=e[l]);const a=r==="all";if(i<=65535){const l=new Uint32Array(i+1),u=new Uint32Array(i+1);for(let f=1;f<=n;f++){const m=e[f];if(m!==0)if(a||r&&r.has&&r.has(m)){const c=t[f];(!u[m]||(o?c>=l[m]:c>l[m]))&&(l[m]=c,u[m]=f)}else s[f]=m}for(let f=1;f<=i;f++){const m=u[f];m>0&&(s[m]=f)}}else{const l=new Map;for(let u=1;u<=n;u++){const f=e[u];if(f!==0)if(a||r&&r.has&&r.has(f)){const m=t[u],c=l.get(f);(!c||(o?m>=c.sz:m>c.sz))&&l.set(f,{c:u,sz:m})}else s[u]=f}for(const[u,{c:f}]of l)s[f]=u}return s}largest_original_cluster_labels(e,t,n,r=null,o=!1,s=null,i=!1){const[a,l]=this._collectComponentStats(e,t,n),u=this._buildKeptMap(a,l,t,"all",!0);return this.finalize_volume(n,r,u,t,o,e,s,i)}filter_clusters(e,t,n,r,o=null,s=!1,i=null,a=!1){const[l,u]=this._collectComponentStats(e,t,n),f=this._buildKeptMap(l,u,t,r,!1);return this.finalize_volume(n,o,f,t,s,e,i,a)}filter_clusters_by_ratio(e,t,n,r,o=null,s=!1,i=null){const a=e.length,l=new Uint32Array(t+1).fill(0),u=new Uint32Array(t+1).fill(0);for(let p=0;p<a;p++){const d=n[p];d>0&&(l[d]===0&&(l[d]=e[p]),u[d]++)}const f=new Map;for(let p=1;p<=t;p++){const d=l[p],_=u[p];(!f.has(d)||_>f.get(d))&&f.set(d,_)}const m=new Uint8Array(t+1).fill(0);for(let p=1;p<=t;p++){const d=l[p],_=u[p],z=f.get(d)||0;_>=z*r&&(m[p]=1)}const c=new Uint32Array(t+1).fill(0);for(let p=1;p<=t;p++)m[p]&&(c[p]=l[p]);return this.finalize_volume(n,o,c,t,s,e,i)}_binaryComponentsFromLabels(e,t,n,r,o=!1){const s=r[0]|0,i=r[1]|0,a=r[2]|0,l=s*i,u=ln.get(n),f=u&&u.cl===t&&n.length===l*a&&(!o||u.bw===e);if(f&&u.conn===6&&u.distinctFgClasses<=1){const w=new Uint32Array(t+1);let g=0,x=0;for(let P=1;P<=t;P++){w[P]=P;const $=u.sumls[P];$>0&&$>=x&&(x=$,g=P)}return{parent:w,compSize:u.sumls,compClass:o?u.ls2bw:null,bestRoot:g}}const m=f?u.sumls:new Uint32Array(t+1),c=f?o?u.ls2bw:null:o?new Uint32Array(t+1):null,p=new Uint32Array(t+1);for(let w=1;w<=t;w++)p[w]=w;if(f&&u.conn===6&&u.runs&&u.bw===e){const w=(P,$)=>{for(;p[P]!==P;)p[P]=p[p[P]],P=p[P];for(;p[$]!==$;)p[$]=p[p[$]],$=p[$];P!==$&&(P<$?p[$]=P:p[P]=$)},g=u.runs,x=u.runLen;for(let P=0;P<x;P+=2){const $=g[P],y=g[P+1],C=$/l|0,S=$-C*l,h=S/s|0;let A=S-h*s;for(let b=$;b<y;b++,A++){const M=e[b];let k=0;if(C>0){const I=e[b-l];I!==0&&I!==M&&(k=n[b],w(k,n[b-l]))}if(h>0){const I=e[b-s];I!==0&&I!==M&&(k||(k=n[b]),w(k,n[b-s]))}if(A>0){const I=e[b-1];I!==0&&I!==M&&(k||(k=n[b]),w(k,n[b-1]))}}}}else{const w=f?u.minSl:0,g=f?u.maxSl:a-1;let x=w*l;for(let P=w;P<=g;P++)for(let $=0;$<i;$++)for(let y=0;y<s;y++,x++){const C=n[x];if(C===0)continue;f||(m[C]++,c&&c[C]===0&&(c[C]=e[x]));let S=C;for(;p[S]!==S;)p[S]=p[p[S]],S=p[S];if(P>0){const h=n[x-l];if(h!==0&&h!==C){let A=h;for(;p[A]!==A;)p[A]=p[p[A]],A=p[A];S!==A&&(S<A?p[A]=S:(p[S]=A,S=A))}}if($>0){const h=n[x-s];if(h!==0&&h!==C){let A=h;for(;p[A]!==A;)p[A]=p[p[A]],A=p[A];S!==A&&(S<A?p[A]=S:(p[S]=A,S=A))}}if(y>0){const h=n[x-1];if(h!==0&&h!==C){let A=h;for(;p[A]!==A;)p[A]=p[p[A]],A=p[A];S!==A&&(S<A?p[A]=S:p[S]=A)}}}}const d=new Uint32Array(t+1);for(let w=1;w<=t;w++){let g=w;for(;p[g]!==g;)g=p[g];p[w]=g,d[g]+=m[w]}let _=0,z=0;for(let w=1;w<=t;w++){const g=d[w];g>0&&g>=z&&(z=g,_=w)}return{parent:p,compSize:m,compClass:c,bestRoot:_}}applyLargestBinaryMaskInPlace(e,t,n,r){const o=e.length;if(t===0)return e.fill(0),e;const s=ln.get(n),i=s&&s.cl===t&&n.length===o;if(i&&s.conn===6&&s.distinctFgClasses<=1){let u=0,f=0;for(let m=1;m<=t;m++){const c=s.sumls[m];c>0&&c>=f&&(f=c,u=m)}if(s.runs&&s.bw===e){if(t>1){const m=s.runs,c=s.runLen;for(let p=0;p<c;p+=2){const d=m[p],_=m[p+1];for(let z=d;z<_;z++)n[z]!==u&&(e[z]=0)}}return e}if(s.fgStart>0&&e.fill(0,0,s.fgStart),s.fgEnd>=s.fgStart){for(let m=s.fgStart;m<=s.fgEnd;m++)n[m]!==u&&(e[m]=0);s.fgEnd+1<o&&e.fill(0,s.fgEnd+1)}else e.fill(0);return e}const{parent:a,bestRoot:l}=this._binaryComponentsFromLabels(e,t,n,r,!1);if(i&&s.runs&&s.bw===e){const u=s.runs,f=s.runLen;for(let m=0;m<f;m+=2){const c=u[m],p=u[m+1];for(let d=c;d<p;d++)a[n[d]]!==l&&(e[d]=0)}return e}if(i&&s.fgEnd>=s.fgStart){s.fgStart>0&&e.fill(0,0,s.fgStart);for(let u=s.fgStart;u<=s.fgEnd;u++){const f=n[u];(f===0||a[f]!==l)&&(e[u]=0)}s.fgEnd+1<o&&e.fill(0,s.fgEnd+1)}else for(let u=0;u<o;u++){const f=n[u];(f===0||a[f]!==l)&&(e[u]=0)}return e}filterHierarchicalFromLabels(e,t,n,r,o="all",s=!0,i=!1,a=null,l=!1){if(t===0)return[0,e instanceof Uint8Array?l?e:new Uint8Array(e.length):new Uint32Array(e.length)];const{parent:u,compSize:f,compClass:m,bestRoot:c}=this._binaryComponentsFromLabels(e,t,n,r,!0),p=new Uint32Array(t+1);for(let _=1;_<=t;_++)u[_]===c&&(p[_]=m[_]);const d=this._buildKeptMap(p,f,t,o,s);return this.finalize_volume(n,r,d,t,i,e,a,l)}filter18ClassFromLabels(e,t,n,r,o,s=!1,i=null,a=!1){return this.filterHierarchicalFromLabels(e,t,n,r,o,!1,s,i,a)}bwlabel(e,t,n=26,r=!1,o=!1,s=null){const i=Date.now(),a=t[0]*t[1]*t[2];if(![6,18,26].includes(n))return console.log("bwlabel: conn must be 6, 18 or 26."),[0,new Uint32Array(a)];if(t[0]<2||t[1]<2||t[2]<1)return console.log("bwlabel: img must be 2 or 3-dimensional"),[0,new Uint32Array(a)];let l;if(r){l=new Uint8Array(a);for(let d=0;d<a;d++)e[d]!==0&&(l[d]=1)}else e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Uint16Array||e instanceof Uint32Array||e instanceof Int8Array||e instanceof Int16Array||e instanceof Int32Array?e.length===a?l=e:(l=new Uint32Array(a),l.set(e.subarray(0,a))):(l=new Uint32Array(a),l.set(e));this._lastInitialRange=null,this._lastMeta=null;let[u,f,m]=this.do_initial_labelling(l,t,n,s);f===void 0&&(f=new Uint32Array(0));const[c,p]=this.translate_labels(m,t,f,u,l,this._lastInitialRange);if(this._lastMeta&&ln.set(p,this._lastMeta),console.log(n+" neighbor clustering into "+c+" regions in "+(Date.now()-i)+"ms"),o){const[d,_]=this.largest_original_cluster_labels(l,c,p);return[d,_]}return[c,p]}filter_clusters_by_rank(e,t,n,r,o=0,s=null,i=!1,a=null,l=!1,u=null){const f=e.length,m=new Uint32Array(t+1).fill(0),c=new Uint32Array(t+1).fill(0),p=a!=null&&Array.isArray(s)&&s.length===3,d=p?s[0]:0,_=p?s[1]:0,z=p?new Int32Array(t+1).fill(2147483647):null,w=p?new Int32Array(t+1).fill(-1):null,g=p?new Int32Array(t+1).fill(2147483647):null,x=p?new Int32Array(t+1).fill(-1):null,P=p?new Int32Array(t+1).fill(2147483647):null,$=p?new Int32Array(t+1).fill(-1):null;for(let b=0;b<f;b++){const M=n[b];if(M>0&&(m[M]===0&&(m[M]=e[b]),c[M]++,p)){const k=b%d,I=b/d|0,q=I%_,J=I/_|0;k<z[M]&&(z[M]=k),k>w[M]&&(w[M]=k),q<g[M]&&(g[M]=q),q>x[M]&&(x[M]=q),J<P[M]&&(P[M]=J),J>$[M]&&($[M]=J)}}let y=null,C=0;if(p){let b=-1;for(let E=1;E<=t;E++)c[E]>b&&(b=c[E],C=E);const M=Math.max(2,Math.ceil(a)+4),k=d*_,I=new Int16Array(f).fill(-1);let q=[];for(let E=0;E<f;E++)n[E]===C&&(I[E]=0,q.push(E));for(let E=1;E<=M&&q.length;E++){const Z=[];for(let me=0;me<q.length;me++){const be=q[me],G=be%d,ee=(be/d|0)%_;G>0&&I[be-1]===-1&&(I[be-1]=E,Z.push(be-1)),G<d-1&&I[be+1]===-1&&(I[be+1]=E,Z.push(be+1)),ee>0&&I[be-d]===-1&&(I[be-d]=E,Z.push(be-d)),ee<_-1&&I[be+d]===-1&&(I[be+d]=E,Z.push(be+d)),be-k>=0&&I[be-k]===-1&&(I[be-k]=E,Z.push(be-k)),be+k<f&&I[be+k]===-1&&(I[be+k]=E,Z.push(be+k))}q=Z}const J=M+1;y=new Float64Array(t+1).fill(J);for(let E=0;E<f;E++){const Z=n[E];if(Z>0&&Z!==C){const me=I[E]>=0?I[E]:J;me<y[Z]&&(y[Z]=me)}}l&&console.log(`[rank-filter] brain comp=${C} size=${b} bbox A[${z[C]},${w[C]}] B[${g[C]},${x[C]}] C[${P[C]},${$[C]}] | maxGap=${a} scan=${M}`)}const S=new Map;for(let b=1;b<=t;b++){const M=m[b],k=c[b];S.has(M)||S.set(M,[]),S.get(M).push({i:b,size:k})}const h=new Uint8Array(t+1).fill(0);for(const[b,M]of S.entries()){M.sort((J,E)=>E.size-J.size);const k=M.length?M[0].size:0,I=o>0?k*o:0,q=Math.min(M.length,r);for(let J=0;J<q;J++){const E=M[J];if(E.size<I){l&&J>0&&console.log(`[rank-filter] class ${b} #${J}: size=${E.size} DROP (below ${(o*100).toFixed(0)}% floor)`);break}if(J>0&&p){const Z=y[E.i],me=Z<=a;if(l&&console.log(`[rank-filter] class ${b} #${J}: size=${E.size} surfDist=${Z} -> ${me?"KEEP":"DROP (too far)"}`),!me)continue}h[E.i]=1}}const A=new Uint32Array(t+1).fill(0);for(let b=1;b<=t;b++)h[b]&&(A[b]=m[b]);return this.finalize_volume(n,s,A,t,i,e,u)}};function ga(e,t=.02,n=.98){const r=e.length;if(r===0)return{qmin:0,qmax:0};const o=new Uint32Array(256);for(let l=0;l<r;l++)o[e[l]]++;const s=new Float64Array(256);let i=0;for(let l=0;l<256;l++)i+=o[l],s[l]=i;const a=l=>{const u=l*(r-1),f=Math.floor(u),m=u-f;let c=0;for(;c<255&&s[c]<=f;)c++;let p=c;for(;p<255&&s[p]<=f+1;)p++;return m<.5?c+(p-c)*m:p-(p-c)*(1-m)};return{qmin:a(t),qmax:a(n)}}function ha(e,t,n,r){const o=t[0]|0,s=t[1]|0,i=t[2]|0,a=o*s*i,l=new r(a);if(n[0]===2&&n[1]===1&&n[2]===0&&a===e.length){const z=s*i,w=s*o,g=16;for(let x=0;x<s;x++){const P=x*i,$=x*o;for(let y=0;y<o;y+=g){const C=Math.min(y+g,o);for(let S=0;S<i;S+=g){const h=Math.min(S+g,i);for(let A=y;A<C;A++){let b=A*z+P+S,M=S*w+$+A;for(let k=S;k<h;k++,b++,M+=w)l[M]=e[b]}}}}return l}const u=[o,s,i],f=[u[n[0]],u[n[1]],u[n[2]]],m=[s*i,i,1],c=m[n[0]],p=m[n[1]],d=m[n[2]];let _=0;for(let z=0;z<f[0];z++){const w=z*c;for(let g=0;g<f[1];g++){const x=w+g*p;for(let P=0;P<f[2];P++,_++)l[_]=e[x+P*d]}}return l}function Jr(e,t=[256,256,256],n=[2,1,0]){return ha(e,t,n,Float32Array)}function _a(e){const t=e&32768?-1:1,n=(e&31744)>>10,r=e&1023;return n===0?t*Math.pow(2,-14)*(r/1024):n===31?r?NaN:t*(1/0):t*Math.pow(2,n-15)*(1+r/1024)}function wa(e){const t=new DataView(e),n=Number(t.getBigUint64(0,!0)),r=JSON.parse(new TextDecoder().decode(new Uint8Array(e,8,n))),o=8+n,s={};for(const[i,a]of Object.entries(r)){if(i==="__metadata__"){s.__metadata__=a;continue}const[l,u]=a.data_offsets,f=a.shape.reduce((c,p)=>c*p,1);let m;if(a.dtype==="F32")m=new Float32Array(e.slice(o+l,o+u));else if(a.dtype==="F16"){const c=new Uint16Array(e.slice(o+l,o+u));m=new Float32Array(f);for(let p=0;p<f;p++)m[p]=_a(c[p])}else if(a.dtype==="BF16"){const c=new Uint16Array(e.slice(o+l,o+u));m=new Float32Array(f);const p=new Uint32Array(1),d=new Float32Array(p.buffer);for(let _=0;_<f;_++)p[0]=c[_]<<16,m[_]=d[0]}else throw new Error(`safetensors: unsupported dtype ${a.dtype} for tensor '${i}'`);if(m.length!==f)throw new Error(`safetensors: tensor '${i}' has ${m.length} values, shape says ${f}`);s[i]={dtype:a.dtype,shape:a.shape,data:m}}return s}var nr={mindgrab:{chan:15,nhidden:25,nclass:2,hasAffine:!1,weightFloats:146237},"mindmap-fast":{chan:16,nhidden:13,nclass:18,hasAffine:!0,weightFloats:87218},mindmap:{chan:24,nhidden:13,nclass:18,hasAffine:!0,weightFloats:195522},mindsnap:{chan:24,nhidden:13,nclass:104,hasAffine:!0,weightFloats:197672},rodent:{chan:16,nhidden:13,nclass:2,hasAffine:!0,weightFloats:86946}};function ba(e){return e==="16chan18cls"||e==="model16chan18cls"?"mindmap-fast":e}function va(e,t){const n=ba(t),r=Object.hasOwn(nr,n)?nr[n]:null;if(!r)throw new Error(`parseModelBin: unknown model '${t}'; expected one of ${Object.keys(nr).join(", ")}`);let o;if(e instanceof ArrayBuffer)o=new Uint8Array(e);else if(ArrayBuffer.isView(e))o=new Uint8Array(e.buffer,e.byteOffset,e.byteLength);else throw new Error("parseModelBin: expected an ArrayBuffer or ArrayBufferView");const s=r.weightFloats*4;if(o.byteLength!==s)throw new Error(`parseModelBin(${n}): expected ${s} bytes (${r.weightFloats} floats), got ${o.byteLength}`);const i=(o.byteOffset&3)===0?new Float32Array(o.buffer,o.byteOffset,r.weightFloats):new Float32Array(o.slice().buffer),a={};let l=0;for(let p=0;p<r.nhidden;p++){const d=p===0?1:r.chan,_=r.chan,z=27*d*_,w=new Float32Array(z);for(let g=0;g<_;g++)for(let x=0;x<d;x++){const P=(g*d+x)*27;for(let $=0;$<27;$++)w[P+$]=i[l+($*d+x)*_+g]}if(l+=z,a[`m.model.${p*3}.weight`]={dtype:"F32",shape:[_,d,3,3,3],data:w},r.hasAffine){const g=new Float32Array(_);for(let P=0;P<_;P++)for(let $=0;$<_;$++){const y=i[l+P*_+$];if(P===$)g[$]=y;else if(y!==0)throw new Error(`parseModelBin(${n}): non-diagonal affine weight at layer ${p} [${P},${$}] = ${y}`)}l+=_*_;const x=new Float32Array(_);for(let P=0;P<_;P++)x[P]=i[l+P];l+=_,a[`m.model.${p*3+1}.weight`]={dtype:"F32",shape:[_],data:g},a[`m.model.${p*3+1}.bias`]={dtype:"F32",shape:[_],data:x}}}const u=r.nhidden*3,f=r.chan*r.nclass,m=new Float32Array(f);for(let p=0;p<r.nclass;p++)for(let d=0;d<r.chan;d++)m[p*r.chan+d]=i[l+d*r.nclass+p];l+=f;const c=new Float32Array(r.nclass);for(let p=0;p<r.nclass;p++)c[p]=i[l+p];if(l+=r.nclass,l!==r.weightFloats)throw new Error(`parseModelBin(${n}): parsed ${l} floats, expected ${r.weightFloats}`);return a[`m.model.${u}.weight`]={dtype:"F32",shape:[r.nclass,r.chan,1,1,1],data:m},a[`m.model.${u}.bias`]={dtype:"F32",shape:[r.nclass],data:c},a}function ya(e){const t=[],n=[],r=[];for(const[s,i]of Object.entries(e)){if(s==="__metadata__")continue;const a=s.match(/^m\.model\.(\d+)\.(weight|bias)$/);if(!a)continue;const l=Number(a[1]),u=a[2]==="weight";if(i.shape.length===5){const[f,m,c,p,d]=i.shape,z={idx:l,outC:f,inC:m,kd:c,kh:p,kw:d,is1x1:c===1&&p===1&&d===1,w:i.data,bias:null},w=t.find(g=>g.idx===l);w?Object.assign(w,z):t.push(z)}else i.shape.length===1&&r.push({idx:l,isW:u,data:i.data,len:i.shape[0]})}t.sort((s,i)=>s.idx-i.idx);for(const s of r){const i=t.find(l=>l.idx===s.idx);if(i&&!s.isW){i.bias=s.data;continue}if(i&&s.isW)continue;let a=n.find(l=>l.idx===s.idx);a||(a={idx:s.idx,scale:null,bias:null},n.push(a)),s.isW?a.scale=s.data:a.bias=s.data}n.sort((s,i)=>s.idx-i.idx);let o=null;return t.length&&t[t.length-1].is1x1&&(o=t.pop()),{convs:t,affines:n,classifier:o}}function xa(e,t={}){const{convs:n,affines:r,classifier:o}=e,s=n[0].outC,i=Math.ceil(s/4)*4,a=n.some(u=>u.bias),l={chan:s,cs:i,planes:i/4,nclass:o?o.outC:0,nhidden:n.length-1,norm:r.length?"gn":a?"none":"gn",affine:r.length>0,convBias:a,classifierBias:!!(o&&o.bias),centeredVariance:!1,eps:1e-5,...t};if(l.nclass>256)throw new Error(`classifier has ${l.nclass} classes; the RGBA8 label texture holds at most 256`);if(!l.activation)throw new Error("descriptor needs an explicit `activation`");if(!l.dilations)throw new Error("descriptor needs an explicit `dilations` array");if(l.dilations.length!==n.length)throw new Error(`descriptor has ${l.dilations.length} dilations for ${n.length} convs`);return l}var Ut=[1,3,5,7,13,19,31,19,13,7,5,3,1],$a=[16,8,4,2,1,16,8,4,2,1,16,8,4,2,1,16,8,4,2,1,16,8,4,2,1],br={"mindmap-fast":{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},"16chan18cls":{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},mindmap:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},mindsnap:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},rodent:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},model16chan18cls:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},model24chan18cls_gdice_prio:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},model6chan3cls:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},model24chan104cls_synth:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},model24chan104cls_infant_refit_synth:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},model24chan104cls_v3_repbn:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},model24chan50cls:{dilations:Ut,activation:"gelu_tanh",fullVolume:!0},model32chan18cls:{dilations:Ut,activation:"gelu_tanh",fullVolume:!1},mindgrab:{dilations:$a,activation:"gelu_tanh",fullVolume:!0},model5_gw_ae:{dilations:[1,2,4,8,16,8,4,2,1],activation:"relu",fullVolume:!0},model11_gw_ae:{dilations:[1,2,4,8,4,2,2,1],activation:"relu",noSafetensors:!0,fullVolume:!0},model30chan18cls:{dilations:[1,2,4,8,16,8,4,2,1],activation:"elu",fullVolume:!0},model30chan50cls:{dilations:[1,2,4,8,16,8,4,2,1],activation:"elu",fullVolume:!0}};function ka(e){if(e?.modelBinModel&&Object.hasOwn(br,e.modelBinModel))return e.modelBinModel;if(e?.model&&Object.hasOwn(br,e.model))return e.model;const t=String(e?.path||"").match(/\/models\/([^/]+)\//);return t?t[1]:null}function Sa(e){const t=ka(e);if(!t)return null;const n=br[t];return!n||n.noSafetensors?null:{name:t,...n}}var Ma={grayMatter:[2,6,7,8,9,10,14,15,16,17],whiteMatter:[1,5],csf:[3,4,11,12]};function xn(e,t,n,r,o){const s=Number(e[t]??n);if(!Number.isFinite(s)||s<r||s>o)throw new Error(`${t} must be between ${r} and ${o}, got ${e[t]}`);return s}function rr(e,t,n){let r=0;for(const o of e||[]){if(!Number.isInteger(o)||o<0||o>=t||o>=32)throw new Error(`Invalid ${n} tissue label ${o} for ${t} classes`);r=(r|1<<o)>>>0}return r}function Pa(e,t){if(!Number.isInteger(t)||t<2||t>32)throw new Error(`Native WebGL2 grouped probabilities require 2..32 classes, got ${t}`);const n={...Ma,...e.probabilityGroups||{}};return{temperature:xn(e,"softmaxTemperature",1,1e-6,1e6),supportTemperature:xn(e,"brainSupportTemperature",1,1e-6,1e6),supportPower:xn(e,"brainSupportPower",1,1e-6,1e6),sigma:xn(e,"partialVolumeSigma",0,0,2),grayMask:rr(n.grayMatter,t,"gray-matter"),whiteMask:rr(n.whiteMatter,t,"white-matter"),csfMask:rr(n.csf,t,"CSF")}}function or(e,t,n,r,o,s){const[i,a,l]=n,u=i*a,f=o.length-1>>1;for(let m=0;m<l;m++)for(let c=0;c<a;c++)for(let p=0;p<i;p++){const d=m*u+c*i+p,_=r===1?p:r===i?c:m,z=r===1?i:r===i?a:l;let w=0;for(let g=-f;g<=f;g++){const x=_+g;x<0||x>=z||(w+=o[g+f]*e[d+g*r])}t[d]=w/s}}function Aa(e,t,n,r){const[o,s,i]=n,a=o*s*i;if(!Array.isArray(e)||e.length!==3||e.some(p=>p.length!==a)||t.length!==a)throw new Error("Native WebGL2 tissue-prior dimensions do not match");const l=xn(r,"partialVolumeSigma",0,0,2),u=xn(r,"brainSupportPower",1,1e-6,1e6);let f=null,m=null,c=1;if(l>0){const p=Math.max(1,Math.round(3*l));m=new Float32Array(p*2+1),c=0;for(let d=-p;d<=p;d++){const _=Math.exp(-.5*d*d/(l*l));m[d+p]=_,c+=_}f=new Float32Array(a)}for(const p of e){let d=p;m&&(or(p,f,n,1,m,c),or(f,p,n,o,m,c),or(p,f,n,o*s,m,c),d=f);for(let _=0;_<a;_++){const z=Math.pow(Math.max(0,Math.min(1,t[_])),u);p[_]=Math.max(0,Math.min(1,d[_]*z))}}return e}var U=256,mt=64,Tt=8,lt=mt+2*Tt,tn=lt*4,Te=U*64,Bn=U*U*2,On=9216,Wo=On*8,za=[1,3,5,7,13,19,31,19,13,7,5,3,1],at=(e,t)=>Array.from({length:e},(n,r)=>t(r)).join(""),qo=280,Oo=150,Ba=55,sr=112;function vr(e,t){const n=Math.floor(e/4),r=e%4,o=r===0?n:n+1,s=n,i=r*8,a=r===0?0:32-i;return(e&63|(o&15)<<6|(s&15)<<10|(i&31)<<14|(a&31)<<19|(t?1:0)<<24)>>>0}function Ca(e,t){if(!e?.features?.has?.("subgroups")||t?.disableSubgroups)return"none";if(t?.forceSubgroupMode)return t.forceSubgroupMode;const n=e.__adapterInfo||e.adapterInfo||{},r=n.subgroupMinSize|0,o=n.subgroupMaxSize|0;return r===32&&o===32?"sg32":r===64&&o===64?"sg64":r>=32&&o<=64?"sg32_64":r>=8&&o<=32?"sg_small":"none"}function No(e){switch(e){case"sg32":return"subgroups32";case"sg64":return"subgroups64-bf";case"sg32_64":return"subgroups32-64";case"sg_small":return"subgroups8-32";default:return"shared-8KiB"}}function Do(){return typeof requestAnimationFrame!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{let t=!1;const n=()=>{t||(t=!0,e())},r=setTimeout(n,16);requestAnimationFrame(()=>{clearTimeout(r),setTimeout(n,0)})})}function Go(e,t,n){let r=t,o=null,s=null,i=performance.now(),a=performance.now();async function l(f,m,c,{forceUiYield:p=!1,emitTick:d=!0}={}){o&&(await o,o=null);const _=performance.now();e.queue.submit([f.finish()]);const z=e.createCommandEncoder(),w=e.queue.onSubmittedWorkDone().then(()=>{const x=performance.now(),P=Math.max(_,i),$=Math.max(0,x-P);x>i&&(i=x),m>=256&&$>.2&&(r=Math.max(.005,Math.min(2,.7*r+.3*($/m))),e.__v4MsPerStrip=r)});o=s,s=w,d&&n&&n(c);const g=performance.now();return(p||g-a>=Ba)&&(await Do(),a=performance.now()),z}async function u(){o&&(await o,o=null)}return{submitChunk:l,waitBeforeFinalSubmit:u,getMsPerStrip:()=>r,setMsPerStrip:f=>{r=Math.max(.005,Math.min(2,f)),e.__v4MsPerStrip=r,i=performance.now()}}}function Fr(e,t,n){const r=e.isFull?Te:e.mainStrips.length,o=e.isFull||!e.extStrips?0:e.extStrips.length,s=t+1<n?e.isFull?Te:e.normStrips?e.normStrips.length:0:0,i=Math.max(16,Math.round(s*.12));return t===0?{convWork:Math.max(64,Math.round(r*.12)),normWork:i}:{convWork:r+o,normWork:i}}function Vo(e,t){let n=0;for(let o=0;o<t;o++){const s=Fr(e.layers[o],o,t);n+=s.convWork+s.normWork}const r=e.clsSkipped?e.clsStrips.length:Te;return n+=Math.max(64,Math.round(r*.2)),Math.max(1,n)}var Ho=new Float32Array(1),Ea=new Uint32Array(Ho.buffer);function yr(e){Ho[0]=e;const t=Ea[0],n=t>>>16&32768,r=t>>>23&255;let o=t&8388607;if(r===255)return n|31744|(o?512:0);let s=r-127+15;return s<=0?s<-10?n:(o=(o|8388608)>>>1-s,n|o+4096>>>13):s>=31?n|31744:n|Math.min(31744,(s<<10)+(o+4096>>>13))}function Fa(e){const t=new Uint16Array(e.length);for(let n=0;n<e.length;n++)t[n]=yr(e[n]);return t}var Qt=new Map,La=12,Xo=new WeakMap,Ua=new WeakMap;function Ra(e){let t=2166136261,n=2654435769;const r=e.byteLength>>>2;if((e.byteOffset&3)===0){const o=new Uint32Array(e.buffer,e.byteOffset,r);for(let s=0;s<o.length;s++){const i=o[s];t=Math.imul(t^i,16777619)>>>0,n=Math.imul(n^(i<<13|i>>>19),2246822507)>>>0}}else for(let o=0;o<r*4;o+=4){const s=e[o]|e[o+1]<<8|e[o+2]<<16|e[o+3]<<24;t=Math.imul(t^s,16777619)>>>0,n=Math.imul(n^(s<<13|s>>>19),2246822507)>>>0}for(let o=r*4;o<e.byteLength;o++)t=Math.imul(t^e[o],16777619)>>>0;return`${e.byteLength}_${t.toString(16)}_${n.toString(16)}`}function Ia(e,t,n,r){const o=r?.classifierBias?JSON.stringify(r.classifierBias):"",s=`${Ra(e)}|${n.chan}|${n.cs}|${n.nclass}|${n.norm}|${n.eps}|${o}`;if(Qt.has(s)){const a=Qt.get(s);return Qt.delete(s),Qt.set(s,a),a}const i=Ga(t,n);if(Qt.size>=La){const a=Qt.keys().next().value;Qt.delete(a)}return Qt.set(s,i),i}function Lr(e,t){let n=e.get(t);return n||(n=new Map,e.set(t,n)),n}function It(e,t,n){let r=e.get(t);return r||(r=n().catch(o=>{throw e.delete(t),o}),e.set(t,r)),r}function Dn(e,t){let n=0;return{alloc:(o,s)=>{const i=Math.max(16,Math.ceil(o/16)*16),a=e.createBuffer({size:i,usage:s});return t.push(a),n+=i,a},getBytes:()=>n,resetBytes:()=>{n=0}}}var jt=new WeakMap;function kn(e){const t=e?jt.get(e):null;if(t){jt.delete(e),t.inUse=!1;for(const n of t.buffers)n.destroy();t.buffers.length=0}}function Yo(e,t,n){const r=jt.get(e);if(r){if(r.key===t&&!r.inUse)return r.inUse=!0,r;if(r.inUse){const i=n();return{key:t,...i,inUse:!0,pooled:!1}}jt.delete(e);for(const i of r.buffers)i.destroy();r.buffers.length=0}const o=n(),s={key:t,...o,inUse:!0,pooled:!0};return jt.set(e,s),s}function Et(e,t,n){return e.createShaderModule({label:t,code:n})}async function Ur(e,t,n,r,o){const s=e.createBindGroupLayout({entries:o.map((i,a)=>typeof i=="string"?{binding:a,visibility:GPUShaderStage.COMPUTE,buffer:{type:i}}:{binding:a,visibility:GPUShaderStage.COMPUTE,buffer:i})});try{const i=await e.createComputePipelineAsync({label:t,layout:e.createPipelineLayout({bindGroupLayouts:[s]}),compute:{module:n,entryPoint:r}});return{bgl:s,pipe:i}}catch(i){if(n?.getCompilationInfo){const a=await n.getCompilationInfo().catch(()=>null),l=a?a.messages.filter(u=>u.type==="error"):[];if(l.length)throw new Error(`meshnet_fast_v4 [${t}] WGSL error: `+l.map(u=>`L${u.lineNum}:${u.linePos} ${u.message}`).join(" | "))}throw i}}function eo(e,t){const n=t?`enable f16;
`:"",r=t?"f16":"f32",o=`vec4<${r}>`;return e?`${n}
@group(0) @binding(0) var<storage, read> raw_u32 : array<u32>;
@group(0) @binding(1) var<storage, read_write> inp_4 : array<${o}>;
@group(0) @binding(2) var<uniform> lut : array<vec4<f32>, 64>;

var<workgroup> sh : array<f32, 32u * 33u>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let t = lid.y * 8u + lid.x;
  let X0 = wid.x * 32u;
  let Y = wid.y;
  let Z0 = wid.z * 32u;

  let z4 = t & 7u;
  let xOff = t >> 3u;
  let zBase = z4 * 4u;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let xLoc = s * 8u + xOff;
    let w = raw_u32[((X0 + xLoc) * 256u + Y) * 64u + wid.z * 8u + z4];
    let b0 = w & 0xffu;
    let b1 = (w >> 8u) & 0xffu;
    let b2 = (w >> 16u) & 0xffu;
    let b3 = (w >> 24u) & 0xffu;
    sh[(zBase + 0u) * 33u + xLoc] = lut[b0 >> 2u][b0 & 3u];
    sh[(zBase + 1u) * 33u + xLoc] = lut[b1 >> 2u][b1 & 3u];
    sh[(zBase + 2u) * 33u + xLoc] = lut[b2 >> 2u][b2 & 3u];
    sh[(zBase + 3u) * 33u + xLoc] = lut[b3 >> 2u][b3 & 3u];
  }
  workgroupBarrier();

  let x4Loc = t & 7u;
  let zOff = t >> 3u;
  let xBase = x4Loc * 4u;
  let dstX4 = ${Tt}u + wid.x * 8u + x4Loc;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let zLoc = s * 8u + zOff;
    let r = zLoc * 33u + xBase;
    inp_4[((Z0 + zLoc) * 256u + Y) * ${lt}u + dstX4] =
      ${o}(${r}(sh[r]), ${r}(sh[r + 1u]), ${r}(sh[r + 2u]), ${r}(sh[r + 3u]));
  }
}`:`${n}
@group(0) @binding(0) var<storage, read> raw_f32 : array<f32>;
@group(0) @binding(1) var<storage, read_write> inp_4 : array<${o}>;
@group(0) @binding(2) var<uniform> params : vec4<f32>;

var<workgroup> sh : array<f32, 32u * 33u>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let t = lid.y * 8u + lid.x;
  let X0 = wid.x * 32u;
  let Y = wid.y;
  let Z0 = wid.z * 32u;

  let zLoc = t & 31u;
  let xOff = t >> 5u;
  for (var s : u32 = 0u; s < 16u; s = s + 1u) {
    let xLoc = s * 2u + xOff;
    let v = raw_f32[((X0 + xLoc) * 256u + Y) * 256u + (Z0 + zLoc)];
    sh[zLoc * 33u + xLoc] = select((v - params.x) / params.y, 0.0, v == params.x);
  }
  workgroupBarrier();

  let x4Loc = t & 7u;
  let zOff = t >> 3u;
  let xBase = x4Loc * 4u;
  let dstX4 = ${Tt}u + wid.x * 8u + x4Loc;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let zl = s * 8u + zOff;
    let r = zl * 33u + xBase;
    inp_4[((Z0 + zl) * 256u + Y) * ${lt}u + dstX4] =
      ${o}(${r}(sh[r]), ${r}(sh[r + 1u]), ${r}(sh[r + 2u]), ${r}(sh[r + 3u]));
  }
}`}function Ta(){return`
@group(0) @binding(0) var<storage, read> src_u32 : array<u32>;
@group(0) @binding(1) var<storage, read_write> dst_u32 : array<u32>;

var<workgroup> sh : array<u32, 32u * 33u>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let t = lid.y * 8u + lid.x;
  let X0 = wid.x * 32u;
  let Y = wid.y;
  let Z0 = wid.z * 32u;

  let x4Loc = t & 7u;
  let zOff = t >> 3u;
  let xBase = x4Loc * 4u;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let zLoc = s * 8u + zOff;
    let w = src_u32[((Z0 + zLoc) * 256u + Y) * 64u + wid.x * 8u + x4Loc];
    let r = zLoc * 33u + xBase;
    sh[r + 0u] = w & 0xffu;
    sh[r + 1u] = (w >> 8u) & 0xffu;
    sh[r + 2u] = (w >> 16u) & 0xffu;
    sh[r + 3u] = (w >> 24u) & 0xffu;
  }
  workgroupBarrier();

  let z4Loc = t & 7u;
  let xOff = t >> 3u;
  let zBase = z4Loc * 4u;
  for (var s : u32 = 0u; s < 4u; s = s + 1u) {
    let xLoc = s * 8u + xOff;
    let b0 = sh[(zBase + 0u) * 33u + xLoc];
    let b1 = sh[(zBase + 1u) * 33u + xLoc];
    let b2 = sh[(zBase + 2u) * 33u + xLoc];
    let b3 = sh[(zBase + 3u) * 33u + xLoc];
    dst_u32[((X0 + xLoc) * 256u + Y) * 64u + wid.z * 8u + z4Loc] =
      b0 | (b1 << 8u) | (b2 << 16u) | (b3 << 24u);
  }
}`}function Wa(){return`
@group(0) @binding(0) var<storage, read> src_f32 : array<f32>;
@group(0) @binding(1) var<storage, read_write> dst_f32 : array<f32>;

var<workgroup> sh : array<f32, 32u * 33u>;

@compute @workgroup_size(8, 8, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let t = lid.y * 8u + lid.x;
  let X0 = wid.x * 32u;
  let Y = wid.y;
  let Z0 = wid.z * 32u;

  let xLoc = t & 31u;
  let zOff = t >> 5u;
  for (var s : u32 = 0u; s < 16u; s = s + 1u) {
    let zLoc = s * 2u + zOff;
    sh[zLoc * 33u + xLoc] = src_f32[((Z0 + zLoc) * 256u + Y) * 256u + (X0 + xLoc)];
  }
  workgroupBarrier();

  let zLoc = t & 31u;
  let xOff = t >> 5u;
  for (var s : u32 = 0u; s < 16u; s = s + 1u) {
    let xl = s * 2u + xOff;
    dst_f32[((X0 + xl) * 256u + Y) * 256u + (Z0 + zLoc)] = sh[zLoc * 33u + xl];
  }
}`}function qa(){return`
@group(0) @binding(0) var<storage, read> packedSrc : array<u32>;
@group(0) @binding(1) var<storage, read_write> outA : array<f32>;
@group(0) @binding(2) var<storage, read_write> outB : array<f32>;

@compute @workgroup_size(256, 1, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let idx = wid.y * 65536u + wid.x * 256u + lid.x;
  let w = packedSrc[idx];
  let inv = 1.0 / 65535.0;
  outA[idx] = f32(w & 0xffffu) * inv;
  outB[idx] = f32(w >> 16u) * inv;
}`}function to(){return`
struct BlurParams {
  axis : u32,
  radius : u32,
  weightSum : f32,
  supPow : f32,
  k : array<vec4<f32>, 8>,
};
@group(0) @binding(0) var<storage, read> src : array<f32>;
@group(0) @binding(1) var<storage, read_write> dst : array<f32>;
@group(0) @binding(2) var<storage, read> sup : array<f32>;
@group(0) @binding(3) var<uniform> p : BlurParams;

fn blurSample(idx : u32, x : u32, y : u32, z : u32) -> f32 {
  var coord : i32 = i32(x);
  var stride : i32 = 1;
  if (p.axis == 1u) {
    coord = i32(y);
    stride = 256;
  } else if (p.axis == 2u) {
    coord = i32(z);
    stride = 65536;
  }
  let rad = i32(p.radius);
  var sum : f32 = 0.0;
  for (var o : i32 = -rad; o <= rad; o = o + 1) {
    let c = coord + o;
    if (c >= 0 && c < 256) {
      let kIdx = u32(o + rad);
      let w = p.k[kIdx >> 2u][kIdx & 3u];
      sum = sum + src[u32(i32(idx) + o * stride)] * w;
    }
  }
  return sum / p.weightSum;
}

@compute @workgroup_size(64, 4, 1)
fn blur_axis(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>) {
  let x = wid.x * 64u + lid.x;
  let y = wid.y * 4u + lid.y;
  let z = wid.z;
  let idx = (z * 256u + y) * 256u + x;
  dst[idx] = blurSample(idx, x, y, z);
}

@compute @workgroup_size(64, 4, 1)
fn blur_z_gate(@builtin(local_invocation_id) lid : vec3<u32>,
               @builtin(workgroup_id) wid : vec3<u32>) {
  let x = wid.x * 64u + lid.x;
  let y = wid.y * 4u + lid.y;
  let z = wid.z;
  let idx = (z * 256u + y) * 256u + x;
  let blurred = blurSample(idx, x, y, z);
  let sv = clamp(sup[idx], 0.0, 1.0);
  var gate : f32 = 0.0;
  if (sv > 0.0) {
    gate = select(pow(sv, p.supPow), sv, p.supPow == 1.0);
  }
  dst[idx] = clamp(blurred * gate, 0.0, 1.0);
}`}async function cn(e,t,n,r,o){const s=Lr(Ua,e);let i=s.get(t);return i||(i=(async()=>{const a=Et(e,t,n());return Ur(e,t,a,r,o)})().catch(a=>{throw s.delete(t),a}),s.set(t,i)),i}function no(e,t,n,r,o){t.fill(0);const s=U*U*U;if(!(o&&e[0]===r&&e[s-1]===r))return{hasBgSkip:!1};if(n.fill(0),(e instanceof Uint8Array||e instanceof Uint8ClampedArray)&&(e.byteOffset&3)===0&&Number.isInteger(r)&&r>=0&&r<=255){const l=new Uint32Array(e.buffer,e.byteOffset,s>>>2),u=new Uint32Array(n.buffer,n.byteOffset,U*U>>>2),f=(r&255)*16843009>>>0;let m=0;for(let c=0;c<U;c++)for(let p=0;p<16384;p++)u[p]|=l[m++]^f}else{let l=0;const u=U*U;for(let f=0;f<U;f++)for(let m=0;m<u;m++,l++)e[l]!==r&&(n[m]=1)}let a=0;for(let l=0;l<U;l++){const u=l*U;for(let f=0;f<U;f++)n[u+f]!==0&&(t[f*U+l]=1,a++)}return a===0||a>=6e4?{hasBgSkip:!1}:{hasBgSkip:!0}}function Zo(e){return e?`${e.grayMask}_${e.whiteMask}_${e.csfMask}_${e.temperature}_${e.supportTemperature}`:"seg"}async function Oa(e,t,n,r,o,s,i,{includeCls:a=!0,sequential:l=!1,shouldAbort:u=null}={}){const f=Lr(Xo,e),m=r?1:0,c=o||"none",p=i.useUniformWeff?1:0,d=(D,se,ae,ye)=>Ur(e,D,se,ae,ye),_=["storage","storage","storage","storage"],z=["read-only-storage","storage","storage","storage","storage","storage","read-only-storage","storage","uniform","uniform","uniform"],w=["read-only-storage","read-only-storage","storage","storage","read-only-storage","uniform"],g=["storage","storage","storage","storage","read-only-storage","read-only-storage",{type:"uniform",hasDynamicOffset:!0,minBindingSize:32}],x=["storage","storage","storage","storage","read-only-storage","read-only-storage","read-only-storage","uniform"],P=["read-only-storage","read-only-storage","read-only-storage","read-only-storage","storage","storage",i.useUniformWeff?"uniform":"read-only-storage","read-only-storage",{type:"uniform",hasDynamicOffset:!0,minBindingSize:32}],$=["read-only-storage","read-only-storage","read-only-storage","read-only-storage","read-only-storage","read-only-storage","read-only-storage","storage","uniform","uniform","uniform"],y=`128|init|${t.cs}|${t.activation}|${m}`,C=`128|conv0|${t.cs}|${t.dilations[0]}|${t.norm}|${m}|${c}`,S=`128|prep|${t.chan}|${t.cs}|${t.activation}|${t.norm}|${m}`,h=`128|flush|${t.cs}|${m}`,A=`128|norm|${t.cs}|${t.activation}|${t.norm}|${m}`,b=`128|conv|${t.chan}|${t.cs}|${t.activation}|${t.norm}|${p}|${m}|${c}`,M=`128|cls|${t.chan}|${t.cs}|${t.nclass}|${n?.clsK4??0}|${i.numConvs}|${t.activation}|${t.norm}|${m}|${Zo(s)}`,k=()=>It(f,y,()=>{const D=Et(e,"init_act8_128",i.initActWgsl());return d("init_act8_128",D,"main",_)}),I=()=>It(f,C,async()=>{const D=Et(e,"conv0_128",i.conv0Wgsl()),se=await Promise.all(i.halfPass0?[d("conv0_128_lo",D,"main_lo",z),d("conv0_128_hi",D,"main_hi",z),d("conv0_128_bg_lo",D,"main_bg_lo",z),d("conv0_128_bg_hi",D,"main_bg_hi",z)]:[d("conv0_128",D,"main",z),d("conv0_128_bg",D,"main_bg",z)]);return i.halfPass0?{lo:se[0],hi:se[1],bgLo:se[2],bgHi:se[3]}:{main:se[0],bg:se[1]}}),q=()=>It(f,S,async()=>{const D=Et(e,"prep_128",i.prepWgsl()),[se,ae]=await Promise.all([d("moments_finish_128",D,"moments_finish",w),d("prep_weff_128",D,"prep_weff",w)]);return{pMomFin:se,pPrepW:ae}}),J=()=>It(f,h,()=>{const D=Et(e,"flush_128",i.flushWgsl());return d("flush_stage_128",D,"main",g)}),E=()=>It(f,A,async()=>{const D=Et(e,"norm_128",i.normWgsl()),[se,ae]=await Promise.all([d("norm_quant8_128",D,"main",x),d("norm_halo_fill_128",D,"norm_halo_fill",x)]);return{pNorm:se,pNormHalo:ae}}),Z=()=>a?It(f,M,()=>{const D=Et(e,"cls_128",i.clsWgsl());return d("classify_v4_128",D,"main",$)}):Promise.resolve(null),me=()=>It(f,b,async()=>{const D=Et(e,"conv_128",i.convWgsl());if(i.halfPassConv){const[X,oe,V,fe,ie,ge]=await Promise.all([d("conv_128_lo",D,"main_lo",P),d("conv_128_hi",D,"main_hi",P),d("conv_128_ext_lo",D,"main_ext_lo",P),d("conv_128_ext_hi",D,"main_ext_hi",P),d("conv_128_bg_lo",D,"main_bg_lo",P),d("conv_128_bg_hi",D,"main_bg_hi",P)]);return{lo:X,hi:oe,extLo:V,extHi:fe,bgLo:ie,bgHi:ge}}const[se,ae,ye]=await Promise.all([d("conv_128",D,"main",P),d("conv_128_ext",D,"main_ext",P),d("conv_128_bg",D,"main_bg",P)]);return{main:se,ext:ae,bg:ye}});if(l){for(const D of[k,q,J,E,I,me,Z]){if(u?.())return null;await D()}return null}const[be,G,T,ee,j,le,te]=await Promise.all([k(),I(),q(),J(),E(),Z(),me()]);return{pInit:be,pMomFin:T.pMomFin,pPrepW:T.pPrepW,pFlush:ee,pNorm:j.pNorm,pNormHalo:j.pNormHalo,pCls:le,pConv0:G,pConv:te}}async function Na(e,t,n,r,o,s,i,a,{includeCls:l=!0,sequential:u=!1,shouldAbort:f=null}={}){const m=Lr(Xo,e),c=r?1:0,p=o||"none",d=s?1:0,_=a.useUniformWeff?1:0,z=a.chunkableStd?1:0,w=(te,D,se,ae)=>Ur(e,te,D,se,ae),g=["storage","storage"],x=["read-only-storage","storage","storage","read-only-storage","read-only-storage","storage","storage","read-only-storage","uniform"],P=["read-only-storage","read-only-storage","storage","storage","storage","storage","read-only-storage","uniform"],$=["storage","storage","read-only-storage","read-only-storage","read-only-storage","read-only-storage","read-only-storage","read-only-storage","uniform"],y=["read-only-storage","read-only-storage","storage","storage","storage","storage",a.useUniformWeff?"uniform":"read-only-storage","read-only-storage",a.chunkableStd?{type:"uniform",hasDynamicOffset:!0,minBindingSize:32}:"uniform"],C=["read-only-storage","read-only-storage","read-only-storage","read-only-storage","read-only-storage","read-only-storage","storage","read-only-storage","uniform"],S=`std|init|${t.cs}|${t.activation}|${c}|${d}`,h=`std|conv0|${t.cs}|${t.dilations[0]}|${t.norm}|${c}|${p}|${d}`,A=`std|prep|${t.chan}|${t.cs}|${t.activation}|${t.norm}|${c}|${d}`,b=`std|norm|${t.cs}|${t.activation}|${t.norm}|${c}|${d}`,M=`std|conv|${t.chan}|${t.cs}|${t.activation}|${t.norm}|${_}|${c}|${p}|${d}${z?"|chk1":""}`,k=`std|cls|${t.chan}|${t.cs}|${t.nclass}|${n?.clsK4??0}|${t.activation}|${t.norm}|${c}|${d}|${Zo(i)}`,I=()=>It(m,S,()=>{const te=Et(e,"init_act8",a.initActWgsl());return w("init_act8",te,"main",g)}),q=()=>It(m,h,async()=>{const te=Et(e,"conv0",a.conv0Wgsl()),D=await Promise.all(a.halfPass0?[w("conv0_lo",te,"main_lo",x),w("conv0_hi",te,"main_hi",x),w("conv0_bg_lo",te,"main_bg_lo",x),w("conv0_bg_hi",te,"main_bg_hi",x)]:[w("conv0",te,"main",x),w("conv0_bg",te,"main_bg",x)]);return a.halfPass0?{lo:D[0],hi:D[1],bgLo:D[2],bgHi:D[3]}:{main:D[0],bg:D[1]}}),J=()=>It(m,A,async()=>{const te=Et(e,"prep",a.prepWgsl()),[D,se]=await Promise.all([w("moments_finish",te,"moments_finish",P),w("prep_weff",te,"prep_weff",P)]);return{pMomFin:D,pPrepW:se}}),E=()=>It(m,b,async()=>{const te=Et(e,"norm",a.normWgsl()),[D,se]=await Promise.all([w("norm_quant8",te,"main",$),w("norm_halo_fill",te,"norm_halo_fill",$)]);return{pNorm:D,pNormHalo:se}}),Z=()=>l?It(m,k,()=>{const te=Et(e,"cls",a.clsWgsl());return w("classify_v4",te,"main",C)}):Promise.resolve(null),me=()=>It(m,M,async()=>{const te=Et(e,"conv",a.convWgsl());if(a.halfPassConv){const[ae,ye,X,oe]=await Promise.all([w("conv_lo",te,"main_lo",y),w("conv_hi",te,"main_hi",y),w("conv_ext_lo",te,"main_ext_lo",y),w("conv_ext_hi",te,"main_ext_hi",y)]);return{lo:ae,hi:ye,extLo:X,extHi:oe}}const[D,se]=await Promise.all([w("conv",te,"main",y),w("conv_ext",te,"main_ext",y)]);return{main:D,ext:se}});if(u){for(const te of[I,J,E,q,me,Z]){if(f?.())return null;await te()}return null}const[be,G,T,ee,j,le]=await Promise.all([I(),q(),J(),E(),Z(),me()]);return{pInit:be,pMomFin:T.pMomFin,pPrepW:T.pPrepW,pNorm:ee.pNorm,pNormHalo:ee.pNormHalo,pCls:j,pConv0:G,pConv:le}}function ro(e,t,n,r,o){n.fill(0);const s=o&&e[0]===0&&e[e.length-1]===0;let i=0,a=0;if(!s){if(r)for(let l=0;l<U;l++){const u=l*U*tn;for(let f=0;f<U;f++){let m=u+f*tn+32;for(let c=0;c<U;c++,a++,m++){const p=e[a];t[m]=p===0?0:yr(p)}}}else for(let l=0;l<U;l++){const u=l*U*tn;for(let f=0;f<U;f++){const m=l*U*U+f*U;t.set(e.subarray(m,m+U),u+f*tn+32)}}return{hasBgSkip:!1}}for(let l=0;l<U;l++){const u=l*U*tn;for(let f=0;f<U;f++){let m=!1,c=u+f*tn+32;for(let p=0;p<U;p++,a++,c++){const d=e[a];d!==0?(t[c]=r?yr(d):d,m=!0):t[c]=0}m&&(n[l*U+f]=1,i++)}}return i===0||i>=6e4?{hasBgSkip:!1}:{hasBgSkip:!0}}function Mn(e,t){const n=new Uint8Array(U*U);for(let r=0;r<U;r++){const o=r*U,s=r-t,i=r+t;for(let a=0;a<U;a++){if(!e[o+a])continue;const l=a-t,u=a+t;if(s>=0){const f=s*U;l>=0&&(n[f+l]=1),n[f+a]=1,u<U&&(n[f+u]=1)}if(l>=0&&(n[o+l]=1),n[o+a]=1,u<U&&(n[o+u]=1),i>=0&&i<U){const f=i*U;l>=0&&(n[f+l]=1),n[f+a]=1,u<U&&(n[f+u]=1)}}}return n}function Da(e,t){const n=new Uint8Array(U*U),r=new Uint8Array(U*U),o=new Int32Array(U+1);for(let s=0;s<U;s++){const i=s*U;for(let a=0;a<U;a++)o[a+1]=o[a]+e[i+a];for(let a=0;a<U;a++)o[Math.min(U-1,a+t)+1]-o[Math.max(0,a-t)]>0&&(n[i+a]=1)}for(let s=0;s<U;s++){for(let i=0;i<U;i++)o[i+1]=o[i]+n[i*U+s];for(let i=0;i<U;i++)o[Math.min(U-1,i+t)+1]-o[Math.max(0,i-t)]>0&&(r[i*U+s]=1)}return r}function ar(e){const t=new Uint8Array(Te);for(let n=0;n<U;n++){const r=n*U,o=n*64;for(let s=0;s<64;s++){const i=r+(s<<2);e[i]|e[i+1]|e[i+2]|e[i+3]&&(t[o+s]=1)}}return t}function Rn(e){const t=new Uint8Array(U*U);for(let n=0;n<U;n++){const r=n*U,o=n*64;for(let s=0;s<64;s++)if(e[o+s]){const i=r+(s<<2);t[i]=1,t[i+1]=1,t[i+2]=1,t[i+3]=1}}return t}function In(e){let t=0;for(let o=0;o<Te;o++)t+=e[o];const n=new Uint32Array(t);let r=0;for(let o=0;o<U;o++){const s=o*64;for(let i=0;i<64;i++)e[s+i]&&(n[r++]=o<<8|i)}return n}function Jt(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n];return t}function oo(e){const t=new Uint8Array(Te);if(e===1024)for(let n=0;n<32;n++)for(let r=0;r<32;r++){const o=n*8+(n*3+r*5&7),s=r*2+(n+r&1);t[o*64+s]=1}else if(e===512)for(let n=0;n<32;n++)for(let r=0;r<16;r++){const o=n*8+(n*3+r*5&7),s=r*4+(n+r*3&3);t[o*64+s]=1}else for(let n=0;n<16;n++)for(let r=0;r<16;r++){const o=n*16+(n*7+r*3&15),s=r*4+(n+r*3&3);t[o*64+s]=1}return t}function jo(e,t,n,r){const o=n.length,s=()=>({isFull:!0,mode:"full",writtenMask:null,computedMask:null,mainStrips:null,extStrips:null,nMomExt:0,normStrips:null,haloRows:null,bgStrip:null,extWeight:0});if(!r||!t.hasBgSkip)return{clsSkipped:!1,clsStrips:null,layers:Array.from({length:o},s)};const i=ar(Da(e,3)),a=Jt(i)<15800,l=a?In(i):null,u=new Array(o);let f=null;for(let g=0;g<o;g++){const x=n[g],P=Mn(g===0?e:f,x);if(g>0)for(let y=0;y<U;y++){const C=y<x||y>=U-x,S=y*U;for(let h=0;h<U;h++)(C||h<x||h>=U-x)&&(P[S+h]=1)}f=P;const $=new Uint8Array(Te);for(let y=0;y<U;y++){const C=y*U,S=y*64;for(let h=0;h<64;h++){const A=C+(h<<2);P[A]|P[A+1]|P[A+2]|P[A+3]||($[S+h]=1)}}u[g]=$}const m=new Array(o);m[o-1]=i;for(let g=o-2;g>=0;g--)m[g]=ar(Mn(Rn(m[g+1]),n[g+1]));const c=a&&o>=4&&n[o-1]<=2&&n[o-2]<=4&&n[o-3]<=6,p=Math.max(1,o-3),d=new Array(o).fill(null),_=new Array(o).fill(null),z=new Array(o).fill(null);if(c){const x=(Te-Jt(m[o-1]))/Te>=.52?256:512,P=1024,$=oo(x),y=oo(P),C=m[o-1],S=new Uint8Array(Te);let h=0;for(let A=0;A<Te;A++)$[A]&&!C[A]&&(S[A]=1,h++);if(h>0&&h<=On&&Jt(C)+h<=15360){d[o-1]=S,_[o-1]=new Uint8Array(Te),z[o-1]=$;for(let A=o-2;A>=p;A--){const b=new Uint8Array(Te),M=m[A+1],k=d[A+1];for(let G=0;G<Te;G++)b[G]=M[G]|k[G];const I=ar(Mn(Rn(b),n[A+1])),q=new Uint8Array(Te),J=m[A];for(let G=0;G<Te;G++)I[G]&&!J[G]&&(q[G]=1);const E=A===p?y:$,Z=new Uint8Array(Te);let me=0,be=0;for(let G=0;G<Te;G++)(q[G]||E[G])&&!J[G]&&(Z[G]=1,me++,E[G]&&be++);if(be===0||me>On||Jt(J)+me>15360){const G=A+1,T=m[G],ee=_[G],j=new Uint8Array(Te);let le=0;for(let te=0;te<Te;te++)(ee[te]||y[te])&&!T[te]&&(j[te]=1,le++);le<=On&&Jt(T)+le<=15360&&(d[G]=j,z[G]=y);break}_[A]=q,d[A]=Z,z[A]=E}}}const w=new Array(o);for(let g=0;g<o;g++){const x=Jt(u[g]),P=Te-x,$=d[g]!==null,y=$?Jt(m[g])+Jt(d[g]):1/0;if(x>=512&&P<=y){const C=new Uint8Array(Te);let S=-1;for(let M=0;M<Te;M++)u[g][M]?S<0&&(S=M):C[M]=1;const h=C.slice();h[S]=1;const A={z:S>>>6,yWg:S&63,packed:S>>>6<<8|S&63},b=In(C);w[g]={isFull:!1,mode:"rpure",writtenMask:C,computedMask:h,mainStrips:b,extStrips:g===0?null:new Uint32Array([A.packed]),nMomExt:g===0?0:1,normStrips:b,haloRows:null,bgStrip:A,extWeight:x}}else if($&&y<=15360){const C=m[g],S=d[g],h=_[g],A=z[g],b=In(C),M=[],k=[];for(let Z=0;Z<U;Z++){const me=Z*64;for(let be=0;be<64;be++){const G=me+be;if(!S[G])continue;const T=Z<<8|be;A[G]?M.push(T):k.push(T)}}const I=M.length;if(I===0){w[g]=s();continue}const q=new Uint32Array(M.length+k.length);q.set(M,0),q.set(k,M.length);const J=new Uint8Array(Te),E=new Uint8Array(Te);for(let Z=0;Z<Te;Z++)J[Z]=C[Z]|h[Z],E[Z]=C[Z]|S[Z];w[g]={isFull:!1,mode:"bwd",writtenMask:J,computedMask:E,mainStrips:b,extStrips:q,nMomExt:I,normStrips:g+1<o?In(J):null,haloRows:null,bgStrip:null,extWeight:(Te-b.length)/I}}else w[g]=s()}for(let g=o-2;g>=0;g--)w[g].mode==="bwd"&&w[g+1].mode!=="bwd"&&(w[g]=s());for(let g=0;g<o-1;g++){const x=w[g];if(x.mode!=="rpure")continue;const P=w[g+1],$=P.isFull?new Uint8Array(U*U).fill(1):Mn(Rn(P.computedMask),n[g+1]),y=Rn(x.writtenMask),C=[];for(let S=0;S<U;S++){const h=S*U;for(let A=0;A<U;A++)$[h+A]&&!y[h+A]&&C.push(S<<8|A)}C.length>0&&(x.haloRows=new Uint32Array(C))}return{clsSkipped:a,clsStrips:l,layers:w}}function Ga(e,t){const n=t.chan,r=t.cs,o=r/4,s=t.nclass,i=Math.ceil(s/4),{convs:a,affines:l,classifier:u}=e,f=a.length,m=27*o,c=9*r*3*o,p=r*i,d=(m+(f-1)*c+p)*4,_=new Float32Array(d),z=4*r,w=f*z,g=new Float32Array(w+i*4),x=(y,C,S)=>{if(t.norm!=="gn"||C>=n)return 1;const h=a[y],A=S*27,b=C*A;let M=0;for(let k=0;k<A;k++)M+=Math.abs(h.w[b+k]);return Math.max(M/16,1e-6)};for(let y=0;y<a[0].outC;y++){const C=x(0,y,a[0].inC),S=1/C;for(let h=0;h<27;h++)_[h*r+y]=a[0].w[y*27+h]*S;g[2*r+y]=t.eps/(C*C),a[0].bias&&(g[3*r+y]=a[0].bias[y])}for(let y=a[0].outC;y<r;y++)g[2*r+y]=t.eps;for(let y=1;y<f;y++){const C=a[y],S=(m+(y-1)*c)*4,h=y*z;for(let A=0;A<C.outC;A++){const b=x(y,A,C.inC),M=1/b,k=A>>>2,I=A&3;for(let q=0;q<9;q++)for(let J=0;J<C.inC;J++)for(let E=0;E<3;E++){const Z=q*3+E,me=S+(((q*r+J)*3+E)*o+k)*4+I;_[me]=C.w[(A*C.inC+J)*27+Z]*M}g[h+2*r+A]=t.eps/(b*b),C.bias&&(g[h+3*r+A]=C.bias[A])}for(let A=C.outC;A<r;A++)g[h+2*r+A]=t.eps}for(let y=0;y<f;y++){const C=y*z,S=l[y];for(let h=0;h<n;h++)t.norm==="gn"?(g[C+h]=S?.scale?S.scale[h]:1,g[C+r+h]=S?.bias?S.bias[h]:0):(g[C+h]=1,g[C+r+h]=0)}const P=m+(f-1)*c,$=P*4;for(let y=0;y<n;y++)for(let C=0;C<s;C++)_[$+y*i*4+C]=u.w[C*u.inC+y];for(let y=0;y<i*4;y++)g[w+y]=y<s?u.bias?u.bias[y]:0:-1e30;return{wF32:_,wF16:Fa(_),qmetaF32:g,w0Vec4s:m,hiddenVec4PerLayer:c,clsVec4Off:P,clsBiasOff:w,metaStride:z,clsK4:i}}function $n(e){if(e==="gelu_tanh")return`fn act(x : f32) -> f32 {
  let u = clamp(0.7978845608028654 * (x + 0.044715 * x * x * x), -9.0, 9.0);
  return 0.5 * x * (1.0 + tanh(u));
}`;if(e==="relu")return"fn act(x : f32) -> f32 { return max(x, 0.0); }";if(e==="elu")return"fn act(x : f32) -> f32 { return select(exp(clamp(x, -20.0, 0.0)) - 1.0, x, x >= 0.0); }";throw new Error(`meshnet_fast_v4: unsupported activation '${e}'`)}function Ko(e){return e==="gelu_tanh"?{uZeroInt:7,uZeroFloat:7/255,uZeroWord:117901063,sterbenzSub:"1.02734375h",zeroBin:7}:e==="relu"?{uZeroInt:0,uZeroFloat:0,uZeroWord:0,sterbenzSub:"1.0h",zeroBin:0}:{uZeroInt:32,uZeroFloat:32/255,uZeroWord:538976288,sterbenzSub:"1.125h",zeroBin:32}}function Qo({chan:e,clsK4:t,nclass:n,V4:r,suf:o,readBiasStmt:s,biasExpr:i,probCfg:a}){const l=`    var acc0 = ${r}(0.0${o});
    var acc1 = ${r}(0.0${o});
    var acc2 = ${r}(0.0${o});
    var acc3 = ${r}(0.0${o});
    for (var c : u32 = 0u; c < ${e}u; c = c + 1u) {
      let wv = w16_4[w_cls + c * ${t}u + k4];
      let f = feat[c];
      acc0 = fma(f, ${r}(wv.x), acc0);
      acc1 = fma(f, ${r}(wv.y), acc1);
      acc2 = fma(f, ${r}(wv.z), acc2);
      acc3 = fma(f, ${r}(wv.w), acc3);
    }
    let k_base = k4 * 4u;
${s}`;if(!a)return`  var best_v = vec4<f32>(-1.0e29);
  var best_k = vec4<u32>(0u);

  for (var k4 : u32 = 0u; k4 < ${t}u; k4 = k4 + 1u) {
${l}
${at(4,c=>`    let l${c} = vec4<f32>(acc${c}) + vec4<f32>(${i(c)});
    let m${c} = l${c} > best_v;
    best_v = select(best_v, l${c}, m${c});
    best_k = select(best_k, vec4<u32>(k_base + ${c}u), m${c});
`)}  }

  labels8[row_idx * ${mt}u + x4] = best_k.x | (best_k.y << 8u) | (best_k.z << 16u) | (best_k.w << 24u);`;const u=`f32(${(1/Math.max(a.temperature,1e-6)).toExponential(8)})`,f=`f32(${(1/Math.max(a.supportTemperature,1e-6)).toExponential(8)})`,m=a.temperature===a.supportTemperature;return`  var max_v = vec4<f32>(-1.0e29);
  for (var k4 : u32 = 0u; k4 < ${t}u; k4 = k4 + 1u) {
${l}
${at(4,c=>`    if (k_base + ${c}u < ${n}u) {
      max_v = max(max_v, vec4<f32>(acc${c}) + vec4<f32>(${i(c)}));
    }
`)}  }

  var denom = vec4<f32>(0.0);
  var sup_denom = vec4<f32>(0.0);
  var bg_w = vec4<f32>(0.0);
  var gm_num = vec4<f32>(0.0);
  var wm_num = vec4<f32>(0.0);
  var csf_num = vec4<f32>(0.0);
  for (var k4 : u32 = 0u; k4 < ${t}u; k4 = k4 + 1u) {
${l}
${at(4,c=>`    let k${c} = k_base + ${c}u;
    if (k${c} < ${n}u) {
      let l${c} = vec4<f32>(acc${c}) + vec4<f32>(${i(c)});
      let v${c} = exp(clamp((l${c} - max_v) * ${u}, vec4<f32>(-80.0), vec4<f32>(0.0)));
      let s${c} = ${m?`v${c}`:`exp(clamp((l${c} - max_v) * ${f}, vec4<f32>(-80.0), vec4<f32>(0.0)))`};
      denom = denom + v${c};
      sup_denom = sup_denom + s${c};
      if (k${c} == 0u) { bg_w = s${c}; }
      let bit${c} = 1u << k${c};
      if ((${a.grayMask}u & bit${c}) != 0u) { gm_num = gm_num + v${c}; }
      if ((${a.whiteMask}u & bit${c}) != 0u) { wm_num = wm_num + v${c}; }
      if ((${a.csfMask}u & bit${c}) != 0u) { csf_num = csf_num + v${c}; }
    }
`)}  }

  let inv_den = vec4<f32>(1.0) / max(denom, vec4<f32>(1.0e-20));
  let gm = clamp(gm_num * inv_den, vec4<f32>(0.0), vec4<f32>(1.0));
  let wm = clamp(wm_num * inv_den, vec4<f32>(0.0), vec4<f32>(1.0));
  let csf = clamp(csf_num * inv_den, vec4<f32>(0.0), vec4<f32>(1.0));
  let sup = clamp(vec4<f32>(1.0) - bg_w / max(sup_denom, vec4<f32>(1.0e-20)), vec4<f32>(0.0), vec4<f32>(1.0));
  let vox_base = row_idx * ${U}u + x4 * 4u;
  if (cp.pad0 == 0u) {
    labels8[vox_base]      = pack2x16unorm(vec2<f32>(gm.x, wm.x));
    labels8[vox_base + 1u] = pack2x16unorm(vec2<f32>(gm.y, wm.y));
    labels8[vox_base + 2u] = pack2x16unorm(vec2<f32>(gm.z, wm.z));
    labels8[vox_base + 3u] = pack2x16unorm(vec2<f32>(gm.w, wm.w));
  } else {
    labels8[vox_base]      = pack2x16unorm(vec2<f32>(csf.x, sup.x));
    labels8[vox_base + 1u] = pack2x16unorm(vec2<f32>(csf.y, sup.y));
    labels8[vox_base + 2u] = pack2x16unorm(vec2<f32>(csf.z, sup.z));
    labels8[vox_base + 3u] = pack2x16unorm(vec2<f32>(csf.w, sup.w));
  }`}function Jo({device:e,hasF16:t,nvox:n,outBufBytes:r,inpBuf:o,act8_0:s,labels8Buf:i,readbackBuf:a,pInit:l,bgInit:u,pCls:f,bgCls:m,clsUbo:c,packed:p,modelEntry:d,probCfg:_,canGpuProb:z,probSlots:w,ownedBuffers:g,mkBuf:x}){let P=!1,$=!1,y=!1,C=!1;const S=new Uint8Array(U*U);let h=null,A=null,b=null,M=null;const k=(T,ee)=>e.createBindGroup({layout:T,entries:ee.map((j,le)=>({binding:le,resource:j&&j.buffer?j:{buffer:j}}))});function I(){if(!h){const T=t?"prep_in_u8_f16":"prep_in_u8_f32";h=(async()=>{const{bgl:ee,pipe:j}=await cn(e,T,()=>eo(!0,t),"main",["read-only-storage","storage","uniform"]);if(C)return null;const le=x(256*4,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST),te=new Float32Array(256),D=k(ee,[{buffer:i,offset:0,size:n},o,le]);return{pipe:j,ubo:le,lutF32:te,bg:D}})().catch(ee=>{throw h=null,ee})}return h}function q(){if(!A){const T=t?"prep_in_f32_f16":"prep_in_f32_f32";A=(async()=>{const{bgl:ee,pipe:j}=await cn(e,T,()=>eo(!1,t),"main",["read-only-storage","storage","uniform"]);if(C)return null;const le=x(16,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST),te=new Float32Array(4),D=r>=n*4?k(ee,[{buffer:i,offset:0,size:n*4},o,le]):null,se=s.size>=n*4?k(ee,[{buffer:s,offset:0,size:n*4},o,le]):null;return{pipe:j,ubo:le,f32Tmp:te,bgLabels:D,bgAct0:se}})().catch(ee=>{throw A=null,ee})}return A}function J(){return b||(b=(async()=>{const{bgl:T,pipe:ee}=await cn(e,"transpose_u8_v4",Ta,"main",["read-only-storage","storage"]);if(C)return null;const j=k(T,[{buffer:i,offset:0,size:n},{buffer:o,offset:0,size:n}]);return{pipe:ee,bg:j}})().catch(T=>{throw b=null,T})),b}function E(){return M||(M=(async()=>{const[T,ee,j,le]=await Promise.all([cn(e,"prob_unpack_two",qa,"main",["read-only-storage","storage","storage"]),cn(e,"prob_blur_axis",to,"blur_axis",["read-only-storage","storage","read-only-storage","uniform"]),cn(e,"prob_blur_z_gate",to,"blur_z_gate",["read-only-storage","storage","read-only-storage","uniform"]),cn(e,"transpose_f32",Wa,"main",["read-only-storage","storage"])]);if(C)return null;const te=GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,D=144,se=x(D,te),ae=x(D,te),ye=x(D,te),X=ie=>({buffer:ie,offset:0,size:r}),oe=k(T.bgl,[X(w.pass0HoldBuf),X(w.y0),X(w.y1)]),V=k(T.bgl,[X(i),X(w.b),X(w.sup)]),fe=[w.y0,w.y1,w.b].map(ie=>({buf:ie,bgBlurX:k(ee.bgl,[X(ie),X(i),X(w.sup),se]),bgBlurY:k(ee.bgl,[X(i),X(ie),X(w.sup),ae]),bgBlurZ:k(j.bgl,[X(ie),X(i),X(w.sup),ye]),bgTranspose:k(le.bgl,[X(i),X(ie)])}));return{pUnpack:T.pipe,pBlurAxis:ee.pipe,pBlurZGate:j.pipe,pTransposeF32:le.pipe,bgUnpack0:oe,bgUnpack1:V,tissues:fe,uboX:se,uboY:ae,uboZ:ye,uboScratch:new ArrayBuffer(D),lastBlurKey:null}})().catch(T=>{throw M=null,T})),M}function Z(){_?z&&E().catch(()=>{}):(I().catch(()=>{}),J().catch(()=>{}))}function me(){C=!0}async function be({volume:T,ioOpts:ee,useCone:j,padInputHost:le,headRowHost:te,hasF16Flag:D}){if(ee?.gpuNativeInput){const ae=ee.normOffset??0,ye=ee.normRange||1,X=T instanceof Uint8Array||T instanceof Uint8ClampedArray,oe=r>=n*4||s.size>=n*4;if(X){const ge=no(T,te,S,ae,j),Q=await I(),ce=!!ee.normClamp;for(let W=0;W<256;W++){let O=W===ae?0:(W-ae)/ye;ce&&(O>0?O>1&&(O=1):O=0),Q.lutF32[W]=O}return e.queue.writeBuffer(Q.ubo,0,Q.lutF32),e.queue.writeBuffer(i,0,T,0,n),{info:ge,runPrePasses(W,O){(!$||y)&&(W.clearBuffer(o),$=!0,y=!1);const v=W.beginComputePass();if(v.setPipeline(Q.pipe),v.setBindGroup(0,Q.bg),v.dispatchWorkgroups(8,U,8),v.end(),O.push("preprocess"),P){const F=W.beginComputePass();F.setPipeline(l.pipe),F.setBindGroup(0,u),F.dispatchWorkgroups(1,U,U),F.end(),O.push("preprocess"),P=!1}}}}if(oe){const ge=no(T,te,S,ae,j),Q=await q(),ce=!(r>=n*4),W=ce?s:i,O=ce?Q.bgAct0:Q.bgLabels,v=T instanceof Float32Array?T:Float32Array.from(T);return Q.f32Tmp[0]=ae,Q.f32Tmp[1]=ye,Q.f32Tmp[2]=0,Q.f32Tmp[3]=0,e.queue.writeBuffer(Q.ubo,0,Q.f32Tmp),e.queue.writeBuffer(W,0,v,0,n),{info:ge,runPrePasses(F,N){(!$||y)&&(F.clearBuffer(o),$=!0,y=!1);const ue=F.beginComputePass();if(ue.setPipeline(Q.pipe),ue.setBindGroup(0,O),ue.dispatchWorkgroups(8,U,8),ue.end(),N.push("preprocess"),P||ce){const de=F.beginComputePass();de.setPipeline(l.pipe),de.setBindGroup(0,u),de.dispatchWorkgroups(1,U,U),de.end(),N.push("preprocess"),P=!1}}}}const V=new Float32Array(n);for(let ge=0;ge<n;ge++){const Q=T[ge];V[ge]=Q===ae?0:(Q-ae)/ye}const fe=Jr(V,[U,U,U],[2,1,0]),ie=ro(fe,le,te,D,j);return e.queue.writeBuffer(o,0,le),$=!0,y=!1,{info:ie,runPrePasses(ge,Q){if(P){const ce=ge.beginComputePass();ce.setPipeline(l.pipe),ce.setBindGroup(0,u),ce.dispatchWorkgroups(1,U,U),ce.end(),Q.push("preprocess"),P=!1}}}}const se=ro(T,le,te,D,j);return e.queue.writeBuffer(o,0,le),$=!0,y=!1,{info:se,runPrePasses(ae,ye){if(P){const X=ae.beginComputePass();X.setPipeline(l.pipe),X.setBindGroup(0,u),X.dispatchWorkgroups(1,U,U),X.end(),ye.push("preprocess"),P=!1}}}}async function G({enc:T,schedule:ee,passCategories:j,u4Tmp:le,ioOpts:te,paced:D=!1,onProgress:se=null}){const ae=ee.clsSkipped?ee.clsStrips.length:U;if(!_){le[0]=p.clsVec4Off,le[1]=p.clsBiasOff,le[2]=ee.clsSkipped?0:1,le[3]=0,e.queue.writeBuffer(c,0,le);{const F=T.beginComputePass();F.setPipeline(f.pipe),F.setBindGroup(0,m),ae>0&&F.dispatchWorkgroups(1,ee.clsSkipped?1:64,ae),F.end(),j.push("classify")}if(te?.gpuNativeOutput){const F=await J(),N=T.beginComputePass();N.setPipeline(F.pipe),N.setBindGroup(0,F.bg),N.dispatchWorkgroups(8,U,8),N.end(),j.push("postprocess"),y=!0,T.copyBufferToBuffer(o,0,a,0,n),e.queue.submit([T.finish()]),await a.mapAsync(GPUMapMode.READ);const ue=new Uint8Array(a.getMappedRange()).slice();return a.unmap(),D&&se&&se(1,""),[ue]}T.copyBufferToBuffer(i,0,a,0,r),e.queue.submit([T.finish()]),await a.mapAsync(GPUMapMode.READ);const O=new Uint8Array(a.getMappedRange()),v=new Float32Array(n);for(let F=0;F<n;F++)v[F]=O[F];return a.unmap(),D&&se&&se(1,""),[v]}if(z){const O=await E();le[0]=p.clsVec4Off,le[1]=p.clsBiasOff,le[2]=ee.clsSkipped?0:1,le[3]=0,e.queue.writeBuffer(c,0,le),le[3]=1,e.queue.writeBuffer(w.clsUbo1,0,le);{const pe=T.beginComputePass();pe.setPipeline(f.pipe),pe.setBindGroup(0,m),ae>0&&pe.dispatchWorkgroups(1,ee.clsSkipped?1:64,ae),pe.end(),j.push("classify")}T.copyBufferToBuffer(i,0,w.pass0HoldBuf,0,r),ee.clsSkipped&&T.clearBuffer(i,0,r);{const pe=T.beginComputePass();pe.setPipeline(f.pipe),pe.setBindGroup(0,w.bgCls1),ae>0&&pe.dispatchWorkgroups(1,ee.clsSkipped?1:64,ae),pe.end(),j.push("classify")}P=!0;const v=`${_.sigma}|${_.supportPower}`,F=_.sigma>0,N=F?Math.max(1,Math.round(3*_.sigma)):0;if(O.lastBlurKey!==v){const pe=new Uint32Array(O.uboScratch),L=new Float32Array(O.uboScratch);L.fill(0);let We=1;if(F){We=0;for(let Oe=-N;Oe<=N;Oe++){const bt=Math.exp(-.5*Oe*Oe/(_.sigma*_.sigma));L[4+Oe+N]=bt,We+=bt}}else L[4]=1;pe[1]=N,L[2]=We,pe[0]=0,L[3]=1,e.queue.writeBuffer(O.uboX,0,O.uboScratch),pe[0]=1,e.queue.writeBuffer(O.uboY,0,O.uboScratch),pe[0]=2,L[3]=_.supportPower,e.queue.writeBuffer(O.uboZ,0,O.uboScratch),O.lastBlurKey=v}{const pe=T.beginComputePass();pe.setPipeline(O.pUnpack),pe.setBindGroup(0,O.bgUnpack0),pe.dispatchWorkgroups(256,256,1),pe.end(),j.push("postprocess");const L=T.beginComputePass();L.setPipeline(O.pUnpack),L.setBindGroup(0,O.bgUnpack1),L.dispatchWorkgroups(256,256,1),L.end(),j.push("postprocess")}D&&(e.queue.submit([T.finish()]),await e.queue.onSubmittedWorkDone(),se&&se(.992,""),await Do(),T=e.createCommandEncoder());const ue=!!te?.gpuNativeOutput;for(let pe=0;pe<3;pe++){const L=O.tissues[pe];if(F){const Oe=T.beginComputePass();Oe.setPipeline(O.pBlurAxis),Oe.setBindGroup(0,L.bgBlurX),Oe.dispatchWorkgroups(4,64,U),Oe.end(),j.push("postprocess");const bt=T.beginComputePass();bt.setPipeline(O.pBlurAxis),bt.setBindGroup(0,L.bgBlurY),bt.dispatchWorkgroups(4,64,U),bt.end(),j.push("postprocess")}const We=T.beginComputePass();if(We.setPipeline(O.pBlurZGate),We.setBindGroup(0,L.bgBlurZ),We.dispatchWorkgroups(4,64,U),We.end(),j.push("postprocess"),ue){const Oe=T.beginComputePass();Oe.setPipeline(O.pTransposeF32),Oe.setBindGroup(0,L.bgTranspose),Oe.dispatchWorkgroups(8,U,8),Oe.end(),j.push("postprocess")}else pe<2&&T.copyBufferToBuffer(i,0,L.buf,0,r)}const de=ue?[w.y0,w.y1,w.b]:[w.y0,w.y1,i];T.copyBufferToBuffer(de[0],0,a,0,r),e.queue.submit([T.finish()]),await a.mapAsync(GPUMapMode.READ);const Pe=new Float32Array(a.getMappedRange()).slice();a.unmap();const ke=async pe=>{const L=e.createCommandEncoder();L.copyBufferToBuffer(pe,0,a,0,r),e.queue.submit([L.finish()]),await a.mapAsync(GPUMapMode.READ);const We=new Float32Array(a.getMappedRange()).slice();return a.unmap(),We},he=await ke(de[1]),we=await ke(de[2]);return D&&se&&se(1,""),[Pe,he,we]}le[0]=p.clsVec4Off,le[1]=p.clsBiasOff,le[2]=ee.clsSkipped?0:1,le[3]=0,e.queue.writeBuffer(c,0,le);{const O=T.beginComputePass();O.setPipeline(f.pipe),O.setBindGroup(0,m),ae>0&&O.dispatchWorkgroups(1,ee.clsSkipped?1:64,ae),O.end(),j.push("classify"),T.copyBufferToBuffer(i,0,a,0,r)}e.queue.submit([T.finish()]),await a.mapAsync(GPUMapMode.READ);const ye=1/65535,X=new Uint16Array(a.getMappedRange()),oe=new Float32Array(n),V=new Float32Array(n);for(let O=0;O<n;O++)oe[O]=X[O*2]*ye,V[O]=X[O*2+1]*ye;a.unmap(),le[3]=1,e.queue.writeBuffer(c,0,le);const fe=e.createCommandEncoder();ee.clsSkipped&&fe.clearBuffer(i,0,r);const ie=fe.beginComputePass();ie.setPipeline(f.pipe),ie.setBindGroup(0,m),ae>0&&ie.dispatchWorkgroups(1,ee.clsSkipped?1:64,ae),ie.end(),j.push("classify"),fe.copyBufferToBuffer(i,0,a,0,r),e.queue.submit([fe.finish()]),await a.mapAsync(GPUMapMode.READ);const ge=new Uint16Array(a.getMappedRange()),Q=new Float32Array(n),ce=new Float32Array(n);for(let O=0;O<n;O++)Q[O]=ge[O*2]*ye,ce[O]=ge[O*2+1]*ye;a.unmap();const W=Aa([oe,V,Q],ce,[U,U,U],d);return te?.gpuNativeOutput?W.map(O=>Jr(O,[U,U,U],[2,1,0])):W}return{prepareInput:be,finishAndReadback:G,warmupIoPipelines:Z,dispose:me}}function es(e,t){if(e==="sg32")return{decls:"",entryArgs:"",add:o=>`subgroupAdd(${o})`,min:o=>`subgroupMin(${o})`,max:o=>`subgroupMax(${o})`};const n=(o,s)=>{const i=l=>o==="+"?`  x = x + subgroupShuffleXor(x, ${l}u);`:`  x = ${o}(x, subgroupShuffleXor(x, ${l}u));`;return e==="sg64"?`fn ${s}(v : f32) -> f32 {
  var x = v;
${i(16)}
${i(8)}
${i(4)}
${i(2)}
${i(1)}
  return x;
}
`:`fn ${s}(v : f32, sg_size : u32) -> f32 {
  if (sg_size == 32u) { return ${o==="+"?"subgroupAdd":o==="min"?"subgroupMin":"subgroupMax"}(v); }
  var x = v;
${i(16)}
${i(8)}
${i(4)}
${i(2)}
${i(1)}
  return x;
}
`},r=(t==="none"?"":n("+","sg32_add"))+n("min","sg32_min")+n("max","sg32_max");return e==="sg64"?{decls:r,entryArgs:"",add:o=>`sg32_add(${o})`,min:o=>`sg32_min(${o})`,max:o=>`sg32_max(${o})`}:{decls:r,entryArgs:`,
             @builtin(subgroup_size) sg_size : u32`,add:o=>`sg32_add(${o}, sg_size)`,min:o=>`sg32_min(${o}, sg_size)`,max:o=>`sg32_max(${o}, sg_size)`}}function ts({V4:e,sw:t,norm:n,writeMomFn:r,momParams:o,momArgs:s}){const i=n==="none",a=i?"vec2<f32>":"vec4<f32>",l=i?`fn sg32_pack1(a : ${e}, slane : u32, c_out : u32, ${o}) -> u32 {
  let f = vec4<f32>(a${t});
  let mn = subgroupMin(min(min(f.x, f.y), min(f.z, f.w)));
  let mx = subgroupMax(max(max(f.x, f.y), max(f.z, f.w)));
  let sp = mx - mn;
  if (slane == 0u) {
    write_mom(c_out, vec4<f32>(0.0, 0.0, mn, sp), ${s});
  }
  return pack4x8unorm((f - vec4<f32>(mn)) * select(0.0, 1.0 / sp, sp > 1e-7));
}
`:`fn sg32_pack1(a : ${e}, slane : u32, c_out : u32, ${o}) -> u32 {
  let f = vec4<f32>(a${t});
  let s = subgroupAdd(f.x + f.y + f.z + f.w);
  let q = subgroupAdd(dot(f, f));
  let mn = subgroupMin(min(min(f.x, f.y), min(f.z, f.w)));
  let mx = subgroupMax(max(max(f.x, f.y), max(f.z, f.w)));
  let sp = mx - mn;
  if (slane == 0u) {
    write_mom(c_out, vec4<f32>(s, q, mn, sp), ${s});
  }
  return pack4x8unorm((f - vec4<f32>(mn)) * select(0.0, 1.0 / sp, sp > 1e-7));
}
`,u=i?`fn sg_sub_store(a : ${e}, slot : u32, sg_id : u32) {
  let f = vec4<f32>(a${t});
  let mn = subgroupMin(min(min(f.x, f.y), min(f.z, f.w)));
  let mx = subgroupMax(max(max(f.x, f.y), max(f.z, f.w)));
  if (sg_id == 0u) { sh_sg[slot] = vec2<f32>(mn, mx); }
}
`:`fn sg_sub_store(a : ${e}, slot : u32, sg_id : u32) {
  let f = vec4<f32>(a${t});
  let s = subgroupAdd(f.x + f.y + f.z + f.w);
  let q = subgroupAdd(dot(f, f));
  let mn = subgroupMin(min(min(f.x, f.y), min(f.z, f.w)));
  let mx = subgroupMax(max(max(f.x, f.y), max(f.z, f.w)));
  if (sg_id == 0u) { sh_sg[slot] = vec4<f32>(s, q, mn, mx); }
}
`,f=i?`      let p0 = sh_sg[rb];
      let p1 = sh_sg[rb + 1u];
      var rmn = min(p0.x, p1.x);
      var rmx = max(p0.y, p1.y);
      if (sg_size == 8u) {
        let p2 = sh_sg[rb + 2u];
        let p3 = sh_sg[rb + 3u];
        rmn = min(rmn, min(p2.x, p3.x));
        rmx = max(rmx, max(p2.y, p3.y));
      }
      let sp = rmx - rmn;
      sh_res[h * 4u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
      write_mom(c_base + slane, vec4<f32>(0.0, 0.0, rmn, sp), ${s});`:`      let p0 = sh_sg[rb];
      let p1 = sh_sg[rb + 1u];
      var rs = p0.x + p1.x;
      var rq = p0.y + p1.y;
      var rmn = min(p0.z, p1.z);
      var rmx = max(p0.w, p1.w);
      if (sg_size == 8u) {
        let p2 = sh_sg[rb + 2u];
        let p3 = sh_sg[rb + 3u];
        rs += p2.x + p3.x;
        rq += p2.y + p3.y;
        rmn = min(rmn, min(p2.z, p3.z));
        rmx = max(rmx, max(p2.w, p3.w));
      }
      let sp = rmx - rmn;
      sh_res[h * 4u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
      write_mom(c_base + slane, vec4<f32>(rs, rq, rmn, sp), ${s});`;return`var<workgroup> sh_sg  : array<${a}, 128>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
${r}${l}${u}fn reduce_pack4_sg(
  a0 : ${e}, a1 : ${e}, a2 : ${e}, a3 : ${e},
  h : u32, slane : u32, sg_size : u32, sg_id : u32,
  c_base : u32, ${o}
) -> vec4<u32> {
  var out_q : vec4<u32>;
  if (sg_size == 32u) {
    out_q = vec4<u32>(
      sg32_pack1(a0, slane, c_base + 0u, ${s}),
      sg32_pack1(a1, slane, c_base + 1u, ${s}),
      sg32_pack1(a2, slane, c_base + 2u, ${s}),
      sg32_pack1(a3, slane, c_base + 3u, ${s})
    );
  } else {
    let b0 = (h * 4u) * 4u + (slane / sg_size);
    sg_sub_store(a0, b0 + 0u, sg_id);
    sg_sub_store(a1, b0 + 4u, sg_id);
    sg_sub_store(a2, b0 + 8u, sg_id);
    sg_sub_store(a3, b0 + 12u, sg_id);
    workgroupBarrier();
    if (slane < 4u) {
      let rb = (h * 4u + slane) * 4u;
${f}
    }
    workgroupBarrier();
    let r0 = sh_res[h * 4u + 0u];
    let r1 = sh_res[h * 4u + 1u];
    let r2 = sh_res[h * 4u + 2u];
    let r3 = sh_res[h * 4u + 3u];
    out_q = vec4<u32>(
      pack4x8unorm((vec4<f32>(a0${t}) - vec4<f32>(r0.x)) * r0.y),
      pack4x8unorm((vec4<f32>(a1${t}) - vec4<f32>(r1.x)) * r1.y),
      pack4x8unorm((vec4<f32>(a2${t}) - vec4<f32>(r2.x)) * r2.y),
      pack4x8unorm((vec4<f32>(a3${t}) - vec4<f32>(r3.x)) * r3.y)
    );
  }
  return out_q;
}
`}function Va(e){const{cs:t,chan:n,nclass:r,clsK4:o,dilations:s,activation:i,norm:a,hasF16:l,subgroupMode:u="none",splitHalves:f,probCfg:m,chunkableStd:c=!1}=e,p=t/4,d=f?t/2:t,_=d*lt,z=d*mt,w=9*t*3*p,g=w,x=w+p,P=l&&p%2===0&&x*8<=65536,$=Ko(i),y=l?`enable f16;
`:"",C=l&&u!=="none",S=C?`enable subgroups;
`:"",h=l?"f16":"f32",A=l?"h":"f",b=`vec4<${h}>`,M=l?256:255,k=G=>{const T=G?".xzyw":"",ee=(D,se,ae)=>f&&se>=d?`y8_1[${D} + ${(se-d)*mt}u] = ${ae};`:`y8_0[${D} + ${se*mt}u] = ${ae};`;if(C&&(u==="sg32"||u==="sg64"||u==="sg32_64")){const D=es(u,a);return{decls:D.decls,entryArgs:D.entryArgs,localHeader:"",emit:({accVar:se,cStart:ae,cEnd:ye,hrExpr:X,yRowExpr:oe,momMode:V,writeY8Expr:fe="true"})=>at(ye-ae,ie=>{const ge=ae+ie,Q=V==="ext_and_main"?`mom_ext[(${X}) * ${t}u + ${ge}u] = mv;
      mom_main[(row_idx * 2u + sg) * ${t}u + ${ge}u] = mv;`:V==="ext_only"?`mom_ext[(${X}) * ${t}u + ${ge}u] = mv;`:`mom_main[(${X}) * ${t}u + ${ge}u] = mv;`;return a==="none"?`  {
    let f = vec4<f32>(${se}.v_${ie}${T});
    let lmn = ${D.min("min(min(f.x, f.y), min(f.z, f.w))")};
    let lmx = ${D.max("max(max(f.x, f.y), max(f.z, f.w))")};
    let sp = lmx - lmn;
    let inv = select(0.0, 1.0 / sp, sp > 1e-7);
    if (${fe}) {
      ${ee(oe,ge,"pack4x8unorm((f - vec4<f32>(lmn)) * inv)")}
    }
    if (slane == 0u) {
      let mv = vec4<f32>(0.0, 0.0, lmn, sp);
      ${Q}
    }
  }
`:`  {
    let f = vec4<f32>(${se}.v_${ie}${T});
    let ls = ${D.add("f.x + f.y + f.z + f.w")};
    let lq = ${D.add("dot(f, f)")};
    let lmn = ${D.min("min(min(f.x, f.y), min(f.z, f.w))")};
    let lmx = ${D.max("max(max(f.x, f.y), max(f.z, f.w))")};
    let sp = lmx - lmn;
    let inv = select(0.0, 1.0 / sp, sp > 1e-7);
    if (${fe}) {
      ${ee(oe,ge,"pack4x8unorm((f - vec4<f32>(lmn)) * inv)")}
    }
    if (slane == 0u) {
      let mv = vec4<f32>(ls, lq, lmn, sp);
      ${Q}
    }
  }
`})}}if(C&&u==="sg_small")return{decls:ts({V4:b,sw:T,norm:a,writeMomFn:`fn write_mom(c_out : u32, mv : vec4<f32>, ext_off : u32, main_off : u32, mom_mode : u32) {
  if (mom_mode == 0u) {
    mom_main[main_off + c_out] = mv;
  } else if (mom_mode == 1u) {
    mom_ext[ext_off + c_out] = mv;
    mom_main[main_off + c_out] = mv;
  } else {
    mom_ext[ext_off + c_out] = mv;
  }
}
`,momParams:"ext_off : u32, main_off : u32, mom_mode : u32",momArgs:"ext_off, main_off, mom_mode"}),entryArgs:`,
             @builtin(subgroup_size) sg_size : u32,
             @builtin(subgroup_invocation_id) sg_id : u32`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:ae,cStart:ye,cEnd:X,hrExpr:oe,yRowExpr:V,momMode:fe,writeY8Expr:ie="true"})=>{const ge=fe==="ext_and_main"?"1u":fe==="ext_only"?"2u":"0u",Q=fe==="main"?"0u":`(${oe}) * ${t}u`,ce=fe==="ext_only"?"0u":`(row_idx * 2u + sg) * ${t}u`;let W=`  let ep_ext_off = ${Q};
  let ep_main_off = ${ce};
`;for(let O=0;O<X-ye;O+=4){const v=ye+O;W+=`  {
    let qw = reduce_pack4_sg(${ae}.v_${O}, ${ae}.v_${O+1}, ${ae}.v_${O+2}, ${ae}.v_${O+3}, h, slane, sg_size, sg_id, ${v}u, ep_ext_off, ep_main_off, ${ge});
    if (${ie}) {
      ${ee(V,v,"qw.x")}
      ${ee(V,v+1,"qw.y")}
      ${ee(V,v+2,"qw.z")}
      ${ee(V,v+3,"qw.w")}
    }
  }
`}return W}};const j=`    let c_out = c_base + slane;
    if (mom_mode == 0u) {
      mom_main[main_off + c_out] = mv;
    } else if (mom_mode == 1u) {
      mom_ext[ext_off + c_out] = mv;
      mom_main[main_off + c_out] = mv;
    } else {
      mom_ext[ext_off + c_out] = mv;
    }`;if(a==="none"&&l){const D=at(31,ae=>`    {
      let m = sh_mm[rb + ${ae+1}u];
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);return{decls:`var<workgroup> sh_mm  : array<vec2<f16>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm16(a : vec4<f16>) -> vec2<f16> {
  return vec2<f16>(min(min(a.x, a.y), min(a.z, a.w)), max(max(a.x, a.y), max(a.z, a.w)));
}
fn reduce_pack4(
  a0 : ${b}, a1 : ${b}, a2 : ${b}, a3 : ${b},
  h : u32, slane : u32, c_base : u32, ext_off : u32, main_off : u32, mom_mode : u32
) -> vec4<u32> {
  let b0 = (h * 4u) * 32u + slane;
  sh_mm[b0]       = vec_mm16(a0);
  sh_mm[b0 + 32u] = vec_mm16(a1);
  sh_mm[b0 + 64u] = vec_mm16(a2);
  sh_mm[b0 + 96u] = vec_mm16(a3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    let m0 = sh_mm[rb];
    var rmn : f16 = m0.x;
    var rmx : f16 = m0.y;
${D}    let fmn = f32(rmn);
    let sp = f32(rmx) - fmn;
    sh_res[h * 4u + slane] = vec2<f32>(fmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(0.0, 0.0, fmn, sp);
${j}
  }
  workgroupBarrier();
  let f0 = vec4<f32>(a0${T});
  let f1 = vec4<f32>(a1${T});
  let f2 = vec4<f32>(a2${T});
  let f3 = vec4<f32>(a3${T});
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:ae,cStart:ye,cEnd:X,hrExpr:oe,yRowExpr:V,momMode:fe,writeY8Expr:ie="true"})=>{const ge=fe==="ext_and_main"?"1u":fe==="ext_only"?"2u":"0u",Q=fe==="main"?"0u":`(${oe}) * ${t}u`,ce=fe==="ext_only"?"0u":`(row_idx * 2u + sg) * ${t}u`;let W=`  let ep_ext_off = ${Q};
  let ep_main_off = ${ce};
`;for(let O=0;O<X-ye;O+=4){const v=ye+O;W+=`  {
    let qw = reduce_pack4(${ae}.v_${O}, ${ae}.v_${O+1}, ${ae}.v_${O+2}, ${ae}.v_${O+3}, h, slane, ${v}u, ep_ext_off, ep_main_off, ${ge});
    if (${ie}) {
      ${ee(V,v,"qw.x")}
      ${ee(V,v+1,"qw.y")}
      ${ee(V,v+2,"qw.z")}
      ${ee(V,v+3,"qw.w")}
    }
  }
`}return W}}}if(a==="none"){const D=at(32,ae=>`    {
      let m = sh_mm[rb + ${ae}u];
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);return{decls:`var<workgroup> sh_mm  : array<vec2<f32>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm(f : vec4<f32>) -> vec2<f32> {
  return vec2<f32>(min(min(f.x, f.y), min(f.z, f.w)), max(max(f.x, f.y), max(f.z, f.w)));
}
fn reduce_pack4(
  a0 : ${b}, a1 : ${b}, a2 : ${b}, a3 : ${b},
  h : u32, slane : u32, c_base : u32, ext_off : u32, main_off : u32, mom_mode : u32
) -> vec4<u32> {
  let f0 = vec4<f32>(a0${T});
  let f1 = vec4<f32>(a1${T});
  let f2 = vec4<f32>(a2${T});
  let f3 = vec4<f32>(a3${T});
  let b0 = (h * 4u) * 32u + slane;
  sh_mm[b0]       = vec_mm(f0);
  sh_mm[b0 + 32u] = vec_mm(f1);
  sh_mm[b0 + 64u] = vec_mm(f2);
  sh_mm[b0 + 96u] = vec_mm(f3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    var rmn : f32 = 3.0e38;
    var rmx : f32 = -3.0e38;
${D}    let sp = rmx - rmn;
    sh_res[h * 4u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(0.0, 0.0, rmn, sp);
${j}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:ae,cStart:ye,cEnd:X,hrExpr:oe,yRowExpr:V,momMode:fe,writeY8Expr:ie="true"})=>{const ge=fe==="ext_and_main"?"1u":fe==="ext_only"?"2u":"0u",Q=fe==="main"?"0u":`(${oe}) * ${t}u`,ce=fe==="ext_only"?"0u":`(row_idx * 2u + sg) * ${t}u`;let W=`  let ep_ext_off = ${Q};
  let ep_main_off = ${ce};
`;for(let O=0;O<X-ye;O+=4){const v=ye+O;W+=`  {
    let qw = reduce_pack4(${ae}.v_${O}, ${ae}.v_${O+1}, ${ae}.v_${O+2}, ${ae}.v_${O+3}, h, slane, ${v}u, ep_ext_off, ep_main_off, ${ge});
    if (${ie}) {
      ${ee(V,v,"qw.x")}
      ${ee(V,v+1,"qw.y")}
      ${ee(V,v+2,"qw.z")}
      ${ee(V,v+3,"qw.w")}
    }
  }
`}return W}}}if(l){const D=at(31,ae=>{const ye=ae+1;return`    {
      let s = sh_sq[rb + ${ye}u];
      let m = sh_mm[rb + ${ye}u];
      rs += s.x;
      rq += s.y;
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`});return{decls:`var<workgroup> sh_sq  : array<vec2<f32>, 1024>;
var<workgroup> sh_mm  : array<vec2<f16>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm16(a : vec4<f16>) -> vec2<f16> {
  return vec2<f16>(min(min(a.x, a.y), min(a.z, a.w)), max(max(a.x, a.y), max(a.z, a.w)));
}
fn reduce_pack4(
  a0 : ${b}, a1 : ${b}, a2 : ${b}, a3 : ${b},
  h : u32, slane : u32, c_base : u32, ext_off : u32, main_off : u32, mom_mode : u32
) -> vec4<u32> {
  let f0 = vec4<f32>(a0${T});
  let f1 = vec4<f32>(a1${T});
  let f2 = vec4<f32>(a2${T});
  let f3 = vec4<f32>(a3${T});
  let b0 = (h * 4u) * 32u + slane;
  sh_sq[b0]       = vec2<f32>(f0.x + f0.y + f0.z + f0.w, dot(f0, f0));
  sh_sq[b0 + 32u] = vec2<f32>(f1.x + f1.y + f1.z + f1.w, dot(f1, f1));
  sh_sq[b0 + 64u] = vec2<f32>(f2.x + f2.y + f2.z + f2.w, dot(f2, f2));
  sh_sq[b0 + 96u] = vec2<f32>(f3.x + f3.y + f3.z + f3.w, dot(f3, f3));
  sh_mm[b0]       = vec_mm16(a0);
  sh_mm[b0 + 32u] = vec_mm16(a1);
  sh_mm[b0 + 64u] = vec_mm16(a2);
  sh_mm[b0 + 96u] = vec_mm16(a3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    let s0 = sh_sq[rb];
    let m0 = sh_mm[rb];
    var rs : f32 = s0.x;
    var rq : f32 = s0.y;
    var rmn : f16 = m0.x;
    var rmx : f16 = m0.y;
${D}    let fmn = f32(rmn);
    let sp = f32(rmx) - fmn;
    sh_res[h * 4u + slane] = vec2<f32>(fmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(rs, rq, fmn, sp);
${j}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:ae,cStart:ye,cEnd:X,hrExpr:oe,yRowExpr:V,momMode:fe,writeY8Expr:ie="true"})=>{const ge=fe==="ext_and_main"?"1u":fe==="ext_only"?"2u":"0u",Q=fe==="main"?"0u":`(${oe}) * ${t}u`,ce=fe==="ext_only"?"0u":`(row_idx * 2u + sg) * ${t}u`;let W=`  let ep_ext_off = ${Q};
  let ep_main_off = ${ce};
`;for(let O=0;O<X-ye;O+=4){const v=ye+O;W+=`  {
    let qw = reduce_pack4(${ae}.v_${O}, ${ae}.v_${O+1}, ${ae}.v_${O+2}, ${ae}.v_${O+3}, h, slane, ${v}u, ep_ext_off, ep_main_off, ${ge});
    if (${ie}) {
      ${ee(V,v,"qw.x")}
      ${ee(V,v+1,"qw.y")}
      ${ee(V,v+2,"qw.z")}
      ${ee(V,v+3,"qw.w")}
    }
  }
`}return W}}}const le=at(32,D=>`    {
      let s = sh_sq[rb + ${D}u];
      let m = sh_mm[rb + ${D}u];
      rs += s.x;
      rq += s.y;
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);return{decls:`var<workgroup> sh_sq  : array<vec2<f32>, 512>;
var<workgroup> sh_mm  : array<vec2<f32>, 512>;
var<workgroup> sh_res : array<vec2<f32>, 16>;
fn vec_mm(f : vec4<f32>) -> vec2<f32> {
  return vec2<f32>(min(min(f.x, f.y), min(f.z, f.w)), max(max(f.x, f.y), max(f.z, f.w)));
}
fn reduce_pack2(
  a0 : ${b}, a1 : ${b},
  h : u32, slane : u32, c_base : u32, ext_off : u32, main_off : u32, mom_mode : u32
) -> vec2<u32> {
  let f0 = vec4<f32>(a0${T});
  let f1 = vec4<f32>(a1${T});
  let b0 = (h * 2u) * 32u + slane;
  sh_sq[b0]       = vec2<f32>(f0.x + f0.y + f0.z + f0.w, dot(f0, f0));
  sh_sq[b0 + 32u] = vec2<f32>(f1.x + f1.y + f1.z + f1.w, dot(f1, f1));
  sh_mm[b0]       = vec_mm(f0);
  sh_mm[b0 + 32u] = vec_mm(f1);
  workgroupBarrier();
  if (slane < 2u) {
    let rb = (h * 2u + slane) * 32u;
    var rs : f32 = 0.0;
    var rq : f32 = 0.0;
    var rmn : f32 = 3.0e38;
    var rmx : f32 = -3.0e38;
${le}    let sp = rmx - rmn;
    sh_res[h * 2u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(rs, rq, rmn, sp);
${j}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 2u + 0u];
  let r1 = sh_res[h * 2u + 1u];
  return vec2<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y)
  );
}
`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:D,cStart:se,cEnd:ae,hrExpr:ye,yRowExpr:X,momMode:oe,writeY8Expr:V="true"})=>{const fe=oe==="ext_and_main"?"1u":oe==="ext_only"?"2u":"0u",ie=oe==="main"?"0u":`(${ye}) * ${t}u`,ge=oe==="ext_only"?"0u":`(row_idx * 2u + sg) * ${t}u`;let Q=`  let ep_ext_off = ${ie};
  let ep_main_off = ${ge};
`;for(let ce=0;ce<ae-se;ce+=2){const W=se+ce;Q+=`  {
    let qw = reduce_pack2(${D}.v_${ce}, ${D}.v_${ce+1}, h, slane, ${W}u, ep_ext_off, ep_main_off, ${fe});
    if (${V}) {
      ${ee(X,W,"qw.x")}
      ${ee(X,W+1,"qw.y")}
    }
  }
`}return Q}}},I=()=>`
@group(0) @binding(0) var<storage, read_write> act0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act1 : array<u32>;
@compute @workgroup_size(${lt}, 1, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let row_base = (wid.z * 256u + wid.y) * ${_}u + lid.x;
  let val = ${$.uZeroWord}u;
  for (var c : u32 = 0u; c < ${d}u; c = c + 1u) {
    let idx = row_base + c * ${lt}u;
    act0[idx] = val;
    ${f?"act1[idx] = val;":""}
  }
}`,q=s[0];return{initActWgsl:I,conv0Wgsl:()=>{const G=!l&&f,T=k(!1),ee=(ye,X)=>{const oe=ye/4,V=X/4;return at(V-oe,fe=>{const ie=oe+fe,ge=ie*4;return`          {
            let w0 = w16_4[wb + ${ie}u];
            let w1 = w16_4[wb + ${p+ie}u];
            let w2 = w16_4[wb + ${2*p+ie}u];
            a_${ge}     = fma(vn, ${b}(w0.x), fma(vc, ${b}(w1.x), fma(vp, ${b}(w2.x), a_${ge})));
            a_${ge+1} = fma(vn, ${b}(w0.y), fma(vc, ${b}(w1.y), fma(vp, ${b}(w2.y), a_${ge+1})));
            a_${ge+2} = fma(vn, ${b}(w0.z), fma(vc, ${b}(w1.z), fma(vp, ${b}(w2.z), a_${ge+2})));
            a_${ge+3} = fma(vn, ${b}(w0.w), fma(vc, ${b}(w1.w), fma(vp, ${b}(w2.w), a_${ge+3})));
          }
`})},j=Math.floor(q/4),le=q%4;let te="";le===0?te=`
        let vn = inp_4[base - ${j}u];
        let vc = inp_4[base];
        let vp = inp_4[base + ${j}u];`:j===0&&le===1?te=`
        let vL = inp_4[base - 1u];
        let vc = inp_4[base];
        let vR = inp_4[base + 1u];
        let vn = ${b}(vL.w, vc.xyz);
        let vp = ${b}(vc.yzw, vR.x);`:le===1?te=`
        let vL = inp_4[base - ${j+1}u];
        let vN = inp_4[base - ${j}u];
        let vc = inp_4[base];
        let vP = inp_4[base + ${j}u];
        let vR = inp_4[base + ${j+1}u];
        let vn = ${b}(vL.w, vN.xyz);
        let vp = ${b}(vP.yzw, vR.x);`:le===2?te=`
        let vL = inp_4[base - ${j+1}u];
        let vN = ${j===0?"inp_4[base]":`inp_4[base - ${j}u]`};
        let vc = ${j===0?"vN":"inp_4[base]"};
        let vP = ${j===0?"vN":`inp_4[base + ${j}u]`};
        let vR = inp_4[base + ${j+1}u];
        let vn = ${b}(vL.zw, vN.xy);
        let vp = ${b}(vP.zw, vR.xy);`:te=`
        let vL = inp_4[base - ${j+1}u];
        let vN = ${j===0?"inp_4[base]":`inp_4[base - ${j}u]`};
        let vc = ${j===0?"vN":"inp_4[base]"};
        let vP = ${j===0?"vN":`inp_4[base + ${j}u]`};
        let vR = inp_4[base + ${j+1}u];
        let vn = ${b}(vL.yzw, vN.x);
        let vp = ${b}(vP.w, vR.xyz);`;const D=(ye,X,oe,V)=>{const fe=V-oe,ie=at(fe,ce=>`  v_${ce} : ${b},
`),ge=at(fe,ce=>{const W=oe+ce;return a==="none"?`  var a_${W} = ${b}(${h}(qmeta[${3*t+W}u]));
`:`  var a_${W} = ${b}(0.0${A});
`}),Q=Array.from({length:fe},(ce,W)=>`a_${oe+W}`).join(", ");return`struct ${X} {
${ie}};
fn ${ye}(y : i32, z : i32, x_pad : u32) -> ${X} {
${ge}  var tap_yz : u32 = 0u;
  for (var dz : i32 = -1; dz <= 1; dz = dz + 1) {
    let sz = z + dz * ${q};
    for (var dy : i32 = -1; dy <= 1; dy = dy + 1) {
      let sy = y + dy * ${q};
      if ((u32(sz) | u32(sy)) < 256u) {
        let base = (u32(sz) * 256u + u32(sy)) * ${lt}u + x_pad;
${te}
        let wb = tap_yz * ${3*p}u;
${ee(oe,V)}
      }
      tap_yz = tap_yz + 1u;
    }
  }
  return ${X}(${Q});
}
`},se=(ye,X,oe,V,fe)=>{const ie=fe?`  let y = i32(p0.bg_y0 + lid.y);
  let z = i32(p0.bg_z0);`:`  var y : i32;
  var z : i32;
  if (p0.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(wid.z);
  } else {
    let pk = strips0[wid.z];
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`,ge=fe?"lid.y * 2u + sg":"row_idx * 2u + sg";return`
@compute @workgroup_size(64, 4, 1)
fn ${ye}(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>${T.entryArgs||""}) {
  let sg = lid.x >> 5u;
  let slane = lid.x & 31u;
${T.localHeader}  let x_pad = lid.x + ${Tt}u;
${ie}
  let acc = ${X}(y, z, x_pad);
  let row_idx = u32(z) * 256u + u32(y);
  let y_row_base = row_idx * ${z}u + lid.x;
${T.emit({accVar:"acc",cStart:oe,cEnd:V,hrExpr:ge,yRowExpr:"y_row_base",momMode:fe?"ext_only":"main"})}}`},ae=G?D("run_conv0_lo","Conv0AccLo",0,d)+D("run_conv0_hi","Conv0AccHi",d,t)+se("main_lo","run_conv0_lo",0,d,!1)+se("main_hi","run_conv0_hi",d,t,!1)+se("main_bg_lo","run_conv0_lo",0,d,!0)+se("main_bg_hi","run_conv0_hi",d,t,!0):D("run_conv0","Conv0Acc",0,t)+se("main","run_conv0",0,t,!1)+se("main_bg","run_conv0",0,t,!0);return`${y}${S}
struct Params0 {
  is_full : u32,
  bg_y0 : u32,
  bg_z0 : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> inp_4 : array<${b}>;
@group(0) @binding(1) var<storage, read_write> y8_0 : array<u32>;
@group(0) @binding(2) var<storage, read_write> y8_1 : array<u32>;
@group(0) @binding(3) var<storage, read> w16_4 : array<${b}>;
@group(0) @binding(4) var<storage, read> qmeta : array<f32>;
@group(0) @binding(5) var<storage, read_write> mom_main : array<vec4<f32>>;
@group(0) @binding(6) var<storage, read_write> mom_ext : array<vec4<f32>>;
@group(0) @binding(7) var<storage, read> strips0 : array<u32>;
@group(0) @binding(8) var<uniform> p0 : Params0;
${T.decls}${ae}`},prepWgsl:()=>`${y}
${$n(i)}
struct PrepParams {
  meta_off : u32,
  next_w_vec4_off : u32,
  next_meta_off : u32,
  has_next : u32,
  is_first : u32,
  is_full : u32,
  n_main_strips : u32,
  n_ext_hr : u32,
  ext_weight : f32,
  pad0 : u32,
  pad1 : u32,
  pad2 : u32,
};
@group(0) @binding(0) var<storage, read> w16_4 : array<${b}>;
@group(0) @binding(1) var<storage, read> qmeta : array<f32>;
@group(0) @binding(2) var<storage, read_write> mom_main : array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> mom_ext : array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> mom_stats : array<vec4<f32>>;
@group(0) @binding(5) var<storage, read_write> w_eff : array<${b}>;
@group(0) @binding(6) var<storage, read> main_strips : array<u32>;
@group(0) @binding(7) var<uniform> pp : PrepParams;

${a==="gn"?`var<workgroup> fin_s  : array<f32, 256>;
var<workgroup> fin_q  : array<f32, 256>;
var<workgroup> fin_es : array<f32, 256>;
var<workgroup> fin_eq : array<f32, 256>;
`:""}var<workgroup> fin_mn : array<f32, 256>;
var<workgroup> fin_mx : array<f32, 256>;

@compute @workgroup_size(256, 1, 1)
fn moments_finish(@builtin(local_invocation_index) lid : u32,
                  @builtin(workgroup_id) wid : vec3<u32>) {
  let c = wid.x;
${a==="gn"?`  var s : f32 = 0.0;
  var q : f32 = 0.0;
  var es : f32 = 0.0;
  var eq : f32 = 0.0;
`:""}  var mn : f32 = 3.0e38;
  var mx : f32 = -3.0e38;
  if (pp.is_full != 0u) {
    for (var hr : u32 = lid; hr < ${Bn}u; hr = hr + 256u) {
      let v = mom_main[hr * ${t}u + c];
${a==="gn"?`      s  += v.x;
      q  += v.y;
`:""}      mn  = min(mn, v.z);
      mx  = max(mx, v.z + v.w);
    }
  } else {
    for (var si : u32 = lid; si < pp.n_main_strips; si = si + 256u) {
      let pk = main_strips[si];
      let base_hr = ((pk >> 8u) * 256u + (pk & 255u) * 4u) * 2u;
      for (var h : u32 = 0u; h < 8u; h = h + 1u) {
        let v = mom_main[(base_hr + h) * ${t}u + c];
${a==="gn"?`        s  += v.x;
        q  += v.y;
`:""}        mn  = min(mn, v.z);
        mx  = max(mx, v.z + v.w);
      }
    }
    if (pp.is_first != 0u) {
      mn = min(mn, 0.0);
      mx = max(mx, 0.0);
    } else if (pp.n_ext_hr > 0u) {
      for (var e : u32 = lid; e < pp.n_ext_hr; e = e + 256u) {
        let v = mom_ext[e * ${t}u + c];
${a==="gn"?`        es += v.x;
        eq += v.y;
`:""}        mn  = min(mn, v.z);
        mx  = max(mx, v.z + v.w);
      }
    }
  }
${a==="gn"?`  fin_s[lid]  = s;
  fin_q[lid]  = q;
  fin_es[lid] = es;
  fin_eq[lid] = eq;
`:""}  fin_mn[lid] = mn;
  fin_mx[lid] = mx;
  workgroupBarrier();
  for (var stride : u32 = 128u; stride > 0u; stride = stride >> 1u) {
    if (lid < stride) {
${a==="gn"?`      fin_s[lid]  += fin_s[lid + stride];
      fin_q[lid]  += fin_q[lid + stride];
      fin_es[lid] += fin_es[lid + stride];
      fin_eq[lid] += fin_eq[lid + stride];
`:""}      fin_mn[lid]  = min(fin_mn[lid], fin_mn[lid + stride]);
      fin_mx[lid]  = max(fin_mx[lid], fin_mx[lid + stride]);
    }
    workgroupBarrier();
  }
  if (lid == 0u) {
    let mbase = pp.meta_off;
    let gamma = qmeta[mbase + c];
    let beta  = qmeta[mbase + ${t}u + c];
    let eps_base = qmeta[mbase + ${2*t}u + c];
    let q_prev = select(mom_stats[${t*2}u].x, 1.0, pp.is_first != 0u);
    let eff_eps = eps_base / (q_prev * q_prev);
${a==="gn"?`    let total_s = fin_s[0] + pp.ext_weight * fin_es[0];
    let total_q = fin_q[0] + pp.ext_weight * fin_eq[0];
    let mean = total_s / 16777216.0;
    let varr = max(total_q / 16777216.0 - mean * mean, 0.0);
    let inv_std = inverseSqrt(varr + eff_eps);
`:`    let mean : f32 = 0.0;
    let inv_std : f32 = 1.0;
`}    let scale = inv_std * gamma;
    let shift = beta - mean * scale;
    let u_lo = fin_mn[0] * scale + shift;
    let u_hi = fin_mx[0] * scale + shift;
    let vmax = max(0.25, max(act(u_lo), act(u_hi)));
    ${i==="gelu_tanh"?`
    let qs = select(max(vmax / 248.0, 0.1705 / 7.0), 1.0, c >= ${n}u);
    `:i==="relu"?`
    let qs = select(max(vmax / 255.0, 1e-6), 1.0, c >= ${n}u);
    `:`
    let qs = select(max(vmax / 223.0, 1.0 / 32.0), 1.0, c >= ${n}u);
    `}
    let sb = c * 2u;
    mom_stats[sb]      = vec4<f32>(mean, inv_std, qs, 1.0 / qs);
    mom_stats[sb + 1u] = vec4<f32>(scale, shift, 0.0, 0.0);
  }
}

@compute @workgroup_size(256, 1, 1)
fn prep_weff(@builtin(local_invocation_index) lid : u32) {
  if (pp.has_next == 0u) { return; }
  var q_ref : f32 = 1e-6;
  for (var ic : u32 = 0u; ic < ${n}u; ic = ic + 1u) {
    let qs = mom_stats[ic * 2u].z;
    q_ref = max(q_ref, ${M.toFixed(1)} * qs);
  }
  ${a==="none"?"q_ref = 1.0;":""}
  if (lid == 0u) {
    mom_stats[${t*2}u] = vec4<f32>(q_ref, 0.0, 0.0, 0.0);
  }
  let scale_num = ${M.toFixed(1)} / q_ref;
  for (var idx : u32 = lid; idx < ${w}u; idx = idx + 256u) {
    let ic = (idx / ${3*p}u) % ${t}u;
    let qs = mom_stats[ic * 2u].z;
    w_eff[idx] = w16_4[pp.next_w_vec4_off + idx] * ${h}(qs * scale_num);
  }
  if (lid < ${p}u) {
    ${a==="none"?`
    let mb = pp.next_meta_off + ${3*t}u + lid * 4u;
    w_eff[${g}u + lid] = ${b}(${h}(qmeta[mb]), ${h}(qmeta[mb + 1u]), ${h}(qmeta[mb + 2u]), ${h}(qmeta[mb + 3u]));
    `:`
    w_eff[${g}u + lid] = ${b}(0.0${A});
    `}
  }
}`,normWgsl:()=>`${$n(i)}
struct NormParams {
  is_full : u32,
  bg_row : u32,
  halo_off : u32,
  n_halo : u32,
};
@group(0) @binding(0) var<storage, read_write> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read> y8_0 : array<u32>;
@group(0) @binding(3) var<storage, read> y8_1 : array<u32>;
@group(0) @binding(4) var<storage, read> mom_main : array<vec4<f32>>;
@group(0) @binding(5) var<storage, read> mom_ext : array<vec4<f32>>;
@group(0) @binding(6) var<storage, read> mom_stats : array<vec4<f32>>;
@group(0) @binding(7) var<storage, read> norm_aux : array<u32>;
@group(0) @binding(8) var<uniform> np : NormParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let x_pad = x4 + ${Tt}u;
  var y : u32;
  var z : u32;
  if (np.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = wid.z;
  } else {
    let pk = norm_aux[wid.z];
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let row_idx = z * 256u + y;
  let hr = row_idx * 2u + sg;
  let y_base = row_idx * ${z}u + x4;
  let a_base = row_idx * ${_}u + x_pad;
  let mom_base = hr * ${t}u;

  for (var c : u32 = 0u; c < ${d}u; c = c + 1u) {
    let inv_qs = mom_stats[c * 2u].w;
    let st = mom_stats[c * 2u + 1u];
    let rm = mom_main[mom_base + c];
    let yv = unpack4x8unorm(y8_0[y_base + c * ${mt}u]) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_0[a_base + c * ${lt}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${$.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }
  ${f?`
  for (var c : u32 = 0u; c < ${d}u; c = c + 1u) {
    let cg = ${d}u + c;
    let inv_qs = mom_stats[cg * 2u].w;
    let st = mom_stats[cg * 2u + 1u];
    let rm = mom_main[mom_base + cg];
    let yv = unpack4x8unorm(y8_1[y_base + c * ${mt}u]) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_1[a_base + c * ${lt}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${$.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }`:""}
}

@compute @workgroup_size(64, 4, 1)
fn norm_halo_fill(@builtin(local_invocation_id) lid : vec3<u32>,
                  @builtin(workgroup_id) wid : vec3<u32>) {
  let idx = wid.y * 4u + lid.y;
  if (idx >= np.n_halo) { return; }
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let x_pad = x4 + ${Tt}u;
  let y_base = np.bg_row * ${z}u + x4;
  let mom_base = sg * ${t}u;
  let dst_row = norm_aux[np.halo_off + idx];
  let a_base = dst_row * ${_}u + x_pad;

  for (var c : u32 = 0u; c < ${d}u; c = c + 1u) {
    let inv_qs = mom_stats[c * 2u].w;
    let st = mom_stats[c * 2u + 1u];
    let rm = mom_ext[mom_base + c];
    let yv = unpack4x8unorm(y8_0[y_base + c * ${mt}u]) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_0[a_base + c * ${lt}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${$.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }
  ${f?`
  for (var c : u32 = 0u; c < ${d}u; c = c + 1u) {
    let cg = ${d}u + c;
    let inv_qs = mom_stats[cg * 2u].w;
    let st = mom_stats[cg * 2u + 1u];
    let rm = mom_ext[mom_base + cg];
    let yv = unpack4x8unorm(y8_1[y_base + c * ${mt}u]) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_1[a_base + c * ${lt}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${$.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }`:""}
}`,convWgsl:()=>{const G=!l&&f,T=k(l),ee=(X,oe)=>l?`
          let ${X} = vec4<f16>(vec2<f16>(unpack2x16float(((${oe} & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((${oe} >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(${$.sterbenzSub});`:`
          let ${X} = unpack4x8unorm(${oe}) - vec4<f32>(${$.uZeroFloat});`,j=X=>`
          let uL = ${X}[base - off0];
          let uN = ${X}[base - off1];
          let uC = ${X}[base];
          let uP = ${X}[base + off1];
          let uR = ${X}[base + off0];
          let u_neg = (uL >> sh_l) | (uN << sh_r);
          let u_pos = (uP >> sh_r) | (uR << sh_l);`+ee("vn","u_neg")+ee("vc","uC")+ee("vp","u_pos"),le=(X,oe)=>{const V=X/4,fe=oe/4;if(P){const ie=p/2,ge=p;let Q="";for(let ce=V;ce<fe;ce+=2){const W=ce*4,O=ce/2;Q+=`          {
            let wp0 = w_eff_u[wbu + ${O}u];
            let wp1 = w_eff_u[wbu + ${ie+O}u];
            let wp2 = w_eff_u[wbu + ${ge+O}u];
            let w0a = u4_lo(wp0);
            let w0b = u4_hi(wp0);
            let w1a = u4_lo(wp1);
            let w1b = u4_hi(wp1);
            let w2a = u4_lo(wp2);
            let w2b = u4_hi(wp2);
            a_${W}     = fma(vn, vec4<f16>(w0a.x), fma(vc, vec4<f16>(w1a.x), fma(vp, vec4<f16>(w2a.x), a_${W})));
            a_${W+1} = fma(vn, vec4<f16>(w0a.y), fma(vc, vec4<f16>(w1a.y), fma(vp, vec4<f16>(w2a.y), a_${W+1})));
            a_${W+2} = fma(vn, vec4<f16>(w0a.z), fma(vc, vec4<f16>(w1a.z), fma(vp, vec4<f16>(w2a.z), a_${W+2})));
            a_${W+3} = fma(vn, vec4<f16>(w0a.w), fma(vc, vec4<f16>(w1a.w), fma(vp, vec4<f16>(w2a.w), a_${W+3})));
            a_${W+4} = fma(vn, vec4<f16>(w0b.x), fma(vc, vec4<f16>(w1b.x), fma(vp, vec4<f16>(w2b.x), a_${W+4})));
            a_${W+5} = fma(vn, vec4<f16>(w0b.y), fma(vc, vec4<f16>(w1b.y), fma(vp, vec4<f16>(w2b.y), a_${W+5})));
            a_${W+6} = fma(vn, vec4<f16>(w0b.z), fma(vc, vec4<f16>(w1b.z), fma(vp, vec4<f16>(w2b.z), a_${W+6})));
            a_${W+7} = fma(vn, vec4<f16>(w0b.w), fma(vc, vec4<f16>(w1b.w), fma(vp, vec4<f16>(w2b.w), a_${W+7})));
          }
`}return Q}return at(fe-V,ie=>{const ge=V+ie,Q=ge*4;return`          {
            let w0 = w_eff[wb + ${ge}u];
            let w1 = w_eff[wb + ${p+ge}u];
            let w2 = w_eff[wb + ${2*p+ge}u];
            a_${Q}     = fma(vn, ${b}(w0.x), fma(vc, ${b}(w1.x), fma(vp, ${b}(w2.x), a_${Q})));
            a_${Q+1} = fma(vn, ${b}(w0.y), fma(vc, ${b}(w1.y), fma(vp, ${b}(w2.y), a_${Q+1})));
            a_${Q+2} = fma(vn, ${b}(w0.z), fma(vc, ${b}(w1.z), fma(vp, ${b}(w2.z), a_${Q+2})));
            a_${Q+3} = fma(vn, ${b}(w0.w), fma(vc, ${b}(w1.w), fma(vp, ${b}(w2.w), a_${Q+3})));
          }
`})},te=(X,oe,V,fe)=>{const ie=fe-V,ge=at(ie,F=>`  v_${F} : ${b},
`),Q=at(ie,F=>{const N=V+F;if(a==="none"){const ue=N>>>2,de=["x","y","z","w"][N&3];if(P){const Pe=g+ue>>>1,ke=g+ue&1?"u4_hi":"u4_lo";return`  var a_${N} = ${b}(${ke}(w_eff_u[${Pe}u]).${de});
`}return`  var a_${N} = ${b}(w_eff[${g+ue}u].${de});
`}return`  var a_${N} = ${b}(0.0${A});
`}),ce=d<=8?`(${d}u + cp.pad0)`:`${d}u`,W=P?`        let wbu_tap = tap_yz * ${t*3*p/2}u;
        for (var ic : u32 = 0u; ic < ${ce}; ic = ic + 1u) {
          let base = row_off + ic * ${lt}u;
${j("act8_0")}
          let wbu = wbu_tap + ic * ${3*p/2}u;
${le(V,fe)}
        }`:`        let wb_tap = tap_yz * ${t*3*p}u;
        for (var ic : u32 = 0u; ic < ${ce}; ic = ic + 1u) {
          let base = row_off + ic * ${lt}u;
${j("act8_0")}
          let wb = wb_tap + ic * ${3*p}u;
${le(V,fe)}
        }`,O=P?`        for (var ic : u32 = 0u; ic < ${ce}; ic = ic + 1u) {
          let base = row_off + ic * ${lt}u;
${j("act8_1")}
          let wbu = wbu_tap + (${d}u + ic) * ${3*p/2}u;
${le(V,fe)}
        }`:`        for (var ic : u32 = 0u; ic < ${ce}; ic = ic + 1u) {
          let base = row_off + ic * ${lt}u;
${j("act8_1")}
          let wb = wb_tap + (${d}u + ic) * ${3*p}u;
${le(V,fe)}
        }`,v=Array.from({length:ie},(F,N)=>`a_${V+N}`).join(", ");return`struct ${oe} {
${ge}};
fn ${X}(y : i32, z : i32, x_pad : u32, dp : u32) -> ${oe} {
${Q}  let d_step = i32(dp & 63u);
  let off0 = (dp >> 6u) & 15u;
  let off1 = (dp >> 10u) & 15u;
  let sh_r = (dp >> 14u) & 31u;
  let sh_l = (dp >> 19u) & 31u;
  var tap_yz : u32 = 0u;
  for (var dz : i32 = -1; dz <= 1; dz = dz + 1) {
    let sz = z + dz * d_step;
    for (var dy : i32 = -1; dy <= 1; dy = dy + 1) {
      let sy = y + dy * d_step;
      if ((u32(sz) | u32(sy)) < 256u) {
        let row_off = (u32(sz) * 256u + u32(sy)) * ${_}u + x_pad;
${W}
        ${f?O:""}
      }
      tap_yz = tap_yz + 1u;
    }
  }
  return ${oe}(${v});
}
`},D=(X,oe,V,fe,ie)=>{const ge=ie?c?`
  let ext_i = cp.ext_base + wid.z;
  let pk = strips[cp.ext_off + ext_i];
  let y = i32((pk & 255u) * 4u + lid.y);
  let z = i32(pk >> 8u);`:`
  let pk = strips[cp.ext_off + wid.z];
  let y = i32((pk & 255u) * 4u + lid.y);
  let z = i32(pk >> 8u);`:c?`
  var y : i32;
  var z : i32;
  if (cp.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(cp.main_off + wid.z);
  } else {
    let pk = strips[cp.main_off + wid.z];
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`:`
  var y : i32;
  var z : i32;
  if (cp.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(wid.z);
  } else {
    let pk = strips[wid.z];
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`,Q=ie?c?"ext_i * 8u + lid.y * 2u + sg":"wid.z * 8u + lid.y * 2u + sg":"row_idx * 2u + sg",ce=ie?"(((dp >> 24u) & 1u) != 0u)":"true";return`
@compute @workgroup_size(64, 4, 1)
fn ${X}(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>${T.entryArgs||""}) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let slane = x4 & 31u;
${T.localHeader}  let x_pad = x4 + ${Tt}u;
${ge}
  let dp = cp.d_pack;
  let acc = ${oe}(y, z, x_pad, dp);
  let row_idx = u32(z) * 256u + u32(y);
  let y_row_base = row_idx * ${z}u + x4;
${T.emit({accVar:"acc",cStart:V,cEnd:fe,hrExpr:Q,yRowExpr:"y_row_base",momMode:ie?"ext_and_main":"main",writeY8Expr:ce})}}`},se=G?te("run_conv_lo","ConvAccLo",0,d)+te("run_conv_hi","ConvAccHi",d,t)+D("main_lo","run_conv_lo",0,d,!1)+D("main_hi","run_conv_hi",d,t,!1)+D("main_ext_lo","run_conv_lo",0,d,!0)+D("main_ext_hi","run_conv_hi",d,t,!0):te("run_conv","ConvAcc",0,t)+D("main","run_conv",0,t,!1)+D("main_ext","run_conv",0,t,!0),ae=P?`fn u4_lo(u : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(u.x)), vec2<f16>(unpack2x16float(u.y)));
}
fn u4_hi(u : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(u.z)), vec2<f16>(unpack2x16float(u.w)));
}
@group(0) @binding(6) var<uniform> w_eff_u : array<vec4<u32>, ${Math.ceil(x/2)}>;`:`@group(0) @binding(6) var<storage, read> w_eff : array<${b}>;`;return`${y}${S}
${c?`struct ConvParams {
  is_full : u32,
  ext_off : u32,
  d_pack : u32,
  pad0 : u32,
  main_off : u32,
  ext_base : u32,
  pad1 : u32,
  pad2 : u32,
};`:`struct ConvParams {
  is_full : u32,
  ext_off : u32,
  d_pack : u32,
  pad0 : u32,
};`}
@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> y8_0 : array<u32>;
@group(0) @binding(3) var<storage, read_write> y8_1 : array<u32>;
@group(0) @binding(4) var<storage, read_write> mom_main : array<vec4<f32>>;
@group(0) @binding(5) var<storage, read_write> mom_ext : array<vec4<f32>>;
${ae}
@group(0) @binding(7) var<storage, read> strips : array<u32>;
@group(0) @binding(8) var<uniform> cp : ConvParams;
${T.decls}${se}`},clsWgsl:()=>`${y}
${$n(i)}
struct ClsParams {
  w_vec4_off : u32,
  bias_off : u32,
  is_full : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> y8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> y8_1 : array<u32>;
@group(0) @binding(2) var<storage, read> w16_4 : array<${b}>;
@group(0) @binding(3) var<storage, read> qmeta : array<f32>;
@group(0) @binding(4) var<storage, read> mom_main : array<vec4<f32>>;
@group(0) @binding(5) var<storage, read> mom_stats : array<vec4<f32>>;
@group(0) @binding(6) var<storage, read_write> labels8 : array<u32>;
@group(0) @binding(7) var<storage, read> cls_strips : array<u32>;
@group(0) @binding(8) var<uniform> cp : ClsParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  var y : u32;
  var z : u32;
  if (cp.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = wid.z;
  } else {
    let pk = cls_strips[wid.z];
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let row_idx = z * 256u + y;
  let hr = row_idx * 2u + sg;
  let y_base = row_idx * ${z}u + x4;
  let mom_base = hr * ${t}u;

  var feat : array<${b}, ${n}>;
  for (var c : u32 = 0u; c < ${n}u; c = c + 1u) {
    let st = mom_stats[c * 2u + 1u];
    let rm = mom_main[mom_base + c];
    ${f?`
    let in_hi = c >= ${d}u;
    let c_loc = select(c, c - ${d}u, in_hi);
    let idx4 = y_base + c_loc * ${mt}u;
    let q_word = select(y8_0[idx4], y8_1[idx4], in_hi);
    `:`
    let q_word = y8_0[y_base + c * ${mt}u];
    `}
    let yv = unpack4x8unorm(q_word) * rm.w + vec4<f32>(rm.z);
    let fv = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    feat[c] = ${b}(fv);
  }

  let w_cls = cp.w_vec4_off;
  let m_cls = cp.bias_off;
${Qo({chan:n,clsK4:o,nclass:r,V4:b,suf:A,readBiasStmt:"",biasExpr:G=>`qmeta[m_cls + k_base + ${G}u]`,probCfg:m})}
}`,totalWEffVec4s:x,useUniformWeff:P,csHalf:d,chunkableStd:c,halfPass0:!l&&f,halfPassConv:!l&&f}}function Ha(e){const{cs:t,chan:n,nclass:r,clsK4:o,dilations:s,activation:i,norm:a,hasF16:l,subgroupMode:u="none",numConvs:f,probCfg:m}=e,c=t/4,p=t/2,d=t/4,_=c*lt,z=16384,w=t*mt,x=t*2+4,P=x+Bn*t,$=4*t,y=(f*$+o*4)/4,C=9*t*3*d,S=C,h=C+d,A=l&&d%2===0&&h*8<=65536,b=Ko(i),M=l?`enable f16;
`:"",k=l&&u!=="none",I=k?`enable subgroups;
`:"",q=l?"f16":"f32",J=l?"h":"f",E=`vec4<${q}>`,Z=l?256:255,me=X=>{const oe=X?".xzyw":"",V=(Q,ce,W)=>{if(Q==="stage_bg")return`stage[s_bg_base + ${ce*mt}u] = ${W};`;if(Q==="stage")return`stage[s_row_base + ${ce*mt}u] = ${W};`;const O=Math.floor(ce/c),v=ce%c;return`if (use_act) { act8_${O}[a_row_base + ${v*lt}u] = ${W}; } else { stage[s_row_base + ${ce*mt}u] = ${W}; }`};if(k&&(u==="sg32"||u==="sg64"||u==="sg32_64")){const Q=es(u,a);return{decls:Q.decls,entryArgs:Q.entryArgs,localHeader:"",emit:({accVar:ce,cStart:W,cEnd:O,hrExpr:v,storeMode:F,momOffExpr:N,alsoWriteMomMain:ue=!1,writeY8Expr:de="true"})=>at(O-W,Pe=>{const ke=W+Pe;return a==="none"?`  {
    let f = vec4<f32>(${ce}.v_${Pe}${oe});
    let lmn = ${Q.min("min(min(f.x, f.y), min(f.z, f.w))")};
    let lmx = ${Q.max("max(max(f.x, f.y), max(f.z, f.w))")};
    let sp = lmx - lmn;
    let inv = select(0.0, 1.0 / sp, sp > 1e-7);
    if (${de}) {
      ${V(F,ke,"pack4x8unorm((f - vec4<f32>(lmn)) * inv)")}
    }
    if (slane == 0u) {
      let mv = vec4<f32>(0.0, 0.0, lmn, sp);
      mom[${N} + (${v}) * ${t}u + ${ke}u] = mv;
      ${ue?`mom[${x}u + (row_idx * 2u + sg) * ${t}u + ${ke}u] = mv;`:""}
    }
  }
`:`  {
    let f = vec4<f32>(${ce}.v_${Pe}${oe});
    let ls = ${Q.add("f.x + f.y + f.z + f.w")};
    let lq = ${Q.add("dot(f, f)")};
    let lmn = ${Q.min("min(min(f.x, f.y), min(f.z, f.w))")};
    let lmx = ${Q.max("max(max(f.x, f.y), max(f.z, f.w))")};
    let sp = lmx - lmn;
    let inv = select(0.0, 1.0 / sp, sp > 1e-7);
    if (${de}) {
      ${V(F,ke,"pack4x8unorm((f - vec4<f32>(lmn)) * inv)")}
    }
    if (slane == 0u) {
      let mv = vec4<f32>(ls, lq, lmn, sp);
      mom[${N} + (${v}) * ${t}u + ${ke}u] = mv;
      ${ue?`mom[${x}u + (row_idx * 2u + sg) * ${t}u + ${ke}u] = mv;`:""}
    }
  }
`})}}if(k&&u==="sg_small")return{decls:ts({V4:E,sw:oe,norm:a,writeMomFn:`fn write_mom(c_out : u32, mv : vec4<f32>, mom_off : u32, main_off : u32, also_main : bool) {
  mom[mom_off + c_out] = mv;
  if (also_main) {
    mom[main_off + c_out] = mv;
  }
}
`,momParams:"mom_off : u32, main_off : u32, also_main : bool",momArgs:"mom_off, main_off, also_main"}),entryArgs:`,
             @builtin(subgroup_size) sg_size : u32,
             @builtin(subgroup_invocation_id) sg_id : u32`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:W,cStart:O,cEnd:v,hrExpr:F,storeMode:N,momOffExpr:ue,alsoWriteMomMain:de=!1,writeY8Expr:Pe="true"})=>{const ke=`${ue} + (${F}) * ${t}u`,he=de?`${x}u + (row_idx * 2u + sg) * ${t}u`:"0u";let we=`  let ep_mom_off = ${ke};
  let ep_main_off = ${he};
`;for(let pe=0;pe<v-O;pe+=4){const L=O+pe;we+=`  {
    let qw = reduce_pack4_sg(${W}.v_${pe}, ${W}.v_${pe+1}, ${W}.v_${pe+2}, ${W}.v_${pe+3}, h, slane, sg_size, sg_id, ${L}u, ep_mom_off, ep_main_off, ${de});
    if (${Pe}) {
      ${V(N,L,"qw.x")}
      ${V(N,L+1,"qw.y")}
      ${V(N,L+2,"qw.z")}
      ${V(N,L+3,"qw.w")}
    }
  }
`}return we}};const fe=`    let c_out = c_base + slane;
    mom[mom_off + c_out] = mv;
    if (also_main) {
      mom[main_off + c_out] = mv;
    }`;if(a==="none"&&l){const Q=at(31,W=>`    {
      let m = sh_mm[rb + ${W+1}u];
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);return{decls:`var<workgroup> sh_mm  : array<vec2<f16>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm16(a : vec4<f16>) -> vec2<f16> {
  return vec2<f16>(min(min(a.x, a.y), min(a.z, a.w)), max(max(a.x, a.y), max(a.z, a.w)));
}
fn reduce_pack4(
  a0 : ${E}, a1 : ${E}, a2 : ${E}, a3 : ${E},
  h : u32, slane : u32, c_base : u32, mom_off : u32, main_off : u32, also_main : bool
) -> vec4<u32> {
  let b0 = (h * 4u) * 32u + slane;
  sh_mm[b0]       = vec_mm16(a0);
  sh_mm[b0 + 32u] = vec_mm16(a1);
  sh_mm[b0 + 64u] = vec_mm16(a2);
  sh_mm[b0 + 96u] = vec_mm16(a3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    let m0 = sh_mm[rb];
    var rmn : f16 = m0.x;
    var rmx : f16 = m0.y;
${Q}    let fmn = f32(rmn);
    let sp = f32(rmx) - fmn;
    sh_res[h * 4u + slane] = vec2<f32>(fmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(0.0, 0.0, fmn, sp);
${fe}
  }
  workgroupBarrier();
  let f0 = vec4<f32>(a0${oe});
  let f1 = vec4<f32>(a1${oe});
  let f2 = vec4<f32>(a2${oe});
  let f3 = vec4<f32>(a3${oe});
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:W,cStart:O,cEnd:v,hrExpr:F,storeMode:N,momOffExpr:ue,alsoWriteMomMain:de=!1,writeY8Expr:Pe="true"})=>{const ke=`${ue} + (${F}) * ${t}u`,he=de?`${x}u + (row_idx * 2u + sg) * ${t}u`:"0u";let we=`  let ep_mom_off = ${ke};
  let ep_main_off = ${he};
`;for(let pe=0;pe<v-O;pe+=4){const L=O+pe;we+=`  {
    let qw = reduce_pack4(${W}.v_${pe}, ${W}.v_${pe+1}, ${W}.v_${pe+2}, ${W}.v_${pe+3}, h, slane, ${L}u, ep_mom_off, ep_main_off, ${de});
    if (${Pe}) {
      ${V(N,L,"qw.x")}
      ${V(N,L+1,"qw.y")}
      ${V(N,L+2,"qw.z")}
      ${V(N,L+3,"qw.w")}
    }
  }
`}return we}}}if(a==="none"){const Q=at(32,W=>`    {
      let m = sh_mm[rb + ${W}u];
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);return{decls:`var<workgroup> sh_mm  : array<vec2<f32>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm(f : vec4<f32>) -> vec2<f32> {
  return vec2<f32>(min(min(f.x, f.y), min(f.z, f.w)), max(max(f.x, f.y), max(f.z, f.w)));
}
fn reduce_pack4(
  a0 : ${E}, a1 : ${E}, a2 : ${E}, a3 : ${E},
  h : u32, slane : u32, c_base : u32, mom_off : u32, main_off : u32, also_main : bool
) -> vec4<u32> {
  let f0 = vec4<f32>(a0${oe});
  let f1 = vec4<f32>(a1${oe});
  let f2 = vec4<f32>(a2${oe});
  let f3 = vec4<f32>(a3${oe});
  let b0 = (h * 4u) * 32u + slane;
  sh_mm[b0]       = vec_mm(f0);
  sh_mm[b0 + 32u] = vec_mm(f1);
  sh_mm[b0 + 64u] = vec_mm(f2);
  sh_mm[b0 + 96u] = vec_mm(f3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    var rmn : f32 = 3.0e38;
    var rmx : f32 = -3.0e38;
${Q}    let sp = rmx - rmn;
    sh_res[h * 4u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(0.0, 0.0, rmn, sp);
${fe}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:W,cStart:O,cEnd:v,hrExpr:F,storeMode:N,momOffExpr:ue,alsoWriteMomMain:de=!1,writeY8Expr:Pe="true"})=>{const ke=`${ue} + (${F}) * ${t}u`,he=de?`${x}u + (row_idx * 2u + sg) * ${t}u`:"0u";let we=`  let ep_mom_off = ${ke};
  let ep_main_off = ${he};
`;for(let pe=0;pe<v-O;pe+=4){const L=O+pe;we+=`  {
    let qw = reduce_pack4(${W}.v_${pe}, ${W}.v_${pe+1}, ${W}.v_${pe+2}, ${W}.v_${pe+3}, h, slane, ${L}u, ep_mom_off, ep_main_off, ${de});
    if (${Pe}) {
      ${V(N,L,"qw.x")}
      ${V(N,L+1,"qw.y")}
      ${V(N,L+2,"qw.z")}
      ${V(N,L+3,"qw.w")}
    }
  }
`}return we}}}if(l){const Q=at(31,W=>{const O=W+1;return`    {
      let s = sh_sq[rb + ${O}u];
      let m = sh_mm[rb + ${O}u];
      rs += s.x;
      rq += s.y;
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`});return{decls:`var<workgroup> sh_sq  : array<vec2<f32>, 1024>;
var<workgroup> sh_mm  : array<vec2<f16>, 1024>;
var<workgroup> sh_res : array<vec2<f32>, 32>;
fn vec_mm16(a : vec4<f16>) -> vec2<f16> {
  return vec2<f16>(min(min(a.x, a.y), min(a.z, a.w)), max(max(a.x, a.y), max(a.z, a.w)));
}
fn reduce_pack4(
  a0 : ${E}, a1 : ${E}, a2 : ${E}, a3 : ${E},
  h : u32, slane : u32, c_base : u32, mom_off : u32, main_off : u32, also_main : bool
) -> vec4<u32> {
  let f0 = vec4<f32>(a0${oe});
  let f1 = vec4<f32>(a1${oe});
  let f2 = vec4<f32>(a2${oe});
  let f3 = vec4<f32>(a3${oe});
  let b0 = (h * 4u) * 32u + slane;
  sh_sq[b0]       = vec2<f32>(f0.x + f0.y + f0.z + f0.w, dot(f0, f0));
  sh_sq[b0 + 32u] = vec2<f32>(f1.x + f1.y + f1.z + f1.w, dot(f1, f1));
  sh_sq[b0 + 64u] = vec2<f32>(f2.x + f2.y + f2.z + f2.w, dot(f2, f2));
  sh_sq[b0 + 96u] = vec2<f32>(f3.x + f3.y + f3.z + f3.w, dot(f3, f3));
  sh_mm[b0]       = vec_mm16(a0);
  sh_mm[b0 + 32u] = vec_mm16(a1);
  sh_mm[b0 + 64u] = vec_mm16(a2);
  sh_mm[b0 + 96u] = vec_mm16(a3);
  workgroupBarrier();
  if (slane < 4u) {
    let rb = (h * 4u + slane) * 32u;
    let s0 = sh_sq[rb];
    let m0 = sh_mm[rb];
    var rs : f32 = s0.x;
    var rq : f32 = s0.y;
    var rmn : f16 = m0.x;
    var rmx : f16 = m0.y;
${Q}    let fmn = f32(rmn);
    let sp = f32(rmx) - fmn;
    sh_res[h * 4u + slane] = vec2<f32>(fmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(rs, rq, fmn, sp);
${fe}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 4u + 0u];
  let r1 = sh_res[h * 4u + 1u];
  let r2 = sh_res[h * 4u + 2u];
  let r3 = sh_res[h * 4u + 3u];
  return vec4<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y),
    pack4x8unorm((f2 - vec4<f32>(r2.x)) * r2.y),
    pack4x8unorm((f3 - vec4<f32>(r3.x)) * r3.y)
  );
}
`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:W,cStart:O,cEnd:v,hrExpr:F,storeMode:N,momOffExpr:ue,alsoWriteMomMain:de=!1,writeY8Expr:Pe="true"})=>{const ke=`${ue} + (${F}) * ${t}u`,he=de?`${x}u + (row_idx * 2u + sg) * ${t}u`:"0u";let we=`  let ep_mom_off = ${ke};
  let ep_main_off = ${he};
`;for(let pe=0;pe<v-O;pe+=4){const L=O+pe;we+=`  {
    let qw = reduce_pack4(${W}.v_${pe}, ${W}.v_${pe+1}, ${W}.v_${pe+2}, ${W}.v_${pe+3}, h, slane, ${L}u, ep_mom_off, ep_main_off, ${de});
    if (${Pe}) {
      ${V(N,L,"qw.x")}
      ${V(N,L+1,"qw.y")}
      ${V(N,L+2,"qw.z")}
      ${V(N,L+3,"qw.w")}
    }
  }
`}return we}}}const ie=at(32,Q=>`    {
      let s = sh_sq[rb + ${Q}u];
      let m = sh_mm[rb + ${Q}u];
      rs += s.x;
      rq += s.y;
      rmn = min(rmn, m.x);
      rmx = max(rmx, m.y);
    }
`);return{decls:`var<workgroup> sh_sq  : array<vec2<f32>, 512>;
var<workgroup> sh_mm  : array<vec2<f32>, 512>;
var<workgroup> sh_res : array<vec2<f32>, 16>;
fn vec_mm(f : vec4<f32>) -> vec2<f32> {
  return vec2<f32>(min(min(f.x, f.y), min(f.z, f.w)), max(max(f.x, f.y), max(f.z, f.w)));
}
fn reduce_pack2(
  a0 : ${E}, a1 : ${E},
  h : u32, slane : u32, c_base : u32, mom_off : u32, main_off : u32, also_main : bool
) -> vec2<u32> {
  let f0 = vec4<f32>(a0${oe});
  let f1 = vec4<f32>(a1${oe});
  let b0 = (h * 2u) * 32u + slane;
  sh_sq[b0]       = vec2<f32>(f0.x + f0.y + f0.z + f0.w, dot(f0, f0));
  sh_sq[b0 + 32u] = vec2<f32>(f1.x + f1.y + f1.z + f1.w, dot(f1, f1));
  sh_mm[b0]       = vec_mm(f0);
  sh_mm[b0 + 32u] = vec_mm(f1);
  workgroupBarrier();
  if (slane < 2u) {
    let rb = (h * 2u + slane) * 32u;
    var rs : f32 = 0.0;
    var rq : f32 = 0.0;
    var rmn : f32 = 3.0e38;
    var rmx : f32 = -3.0e38;
${ie}    let sp = rmx - rmn;
    sh_res[h * 2u + slane] = vec2<f32>(rmn, select(0.0, 1.0 / sp, sp > 1e-7));
    let mv = vec4<f32>(rs, rq, rmn, sp);
${fe}
  }
  workgroupBarrier();
  let r0 = sh_res[h * 2u + 0u];
  let r1 = sh_res[h * 2u + 1u];
  return vec2<u32>(
    pack4x8unorm((f0 - vec4<f32>(r0.x)) * r0.y),
    pack4x8unorm((f1 - vec4<f32>(r1.x)) * r1.y)
  );
}
`,localHeader:`  let h = lid.y * 2u + sg;
`,emit:({accVar:Q,cStart:ce,cEnd:W,hrExpr:O,storeMode:v,momOffExpr:F,alsoWriteMomMain:N=!1,writeY8Expr:ue="true"})=>{const de=`${F} + (${O}) * ${t}u`,Pe=N?`${x}u + (row_idx * 2u + sg) * ${t}u`:"0u";let ke=`  let ep_mom_off = ${de};
  let ep_main_off = ${Pe};
`;for(let he=0;he<W-ce;he+=2){const we=ce+he;ke+=`  {
    let qw = reduce_pack2(${Q}.v_${he}, ${Q}.v_${he+1}, h, slane, ${we}u, ep_mom_off, ep_main_off, ${N});
    if (${ue}) {
      ${V(v,we,"qw.x")}
      ${V(v,we+1,"qw.y")}
    }
  }
`}return ke}}},be=()=>`
@group(0) @binding(0) var<storage, read_write> act0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> act2 : array<u32>;
@group(0) @binding(3) var<storage, read_write> act3 : array<u32>;
@compute @workgroup_size(${lt}, 1, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let row_base = (wid.z * 256u + wid.y) * ${_}u + lid.x;
  let val = ${b.uZeroWord}u;
  for (var c : u32 = 0u; c < ${c}u; c = c + 1u) {
    let idx = row_base + c * ${lt}u;
    act0[idx] = val;
    act1[idx] = val;
    act2[idx] = val;
    act3[idx] = val;
  }
}`,G=s[0],T=!l&&t>=16,ee=()=>{const X=me(!1),oe=(W,O)=>{const v=W/4,F=O/4;return at(F-v,N=>{const ue=v+N,de=ue*4;return`          {
            let w0 = w16_4[wb + ${ue}u];
            let w1 = w16_4[wb + ${d+ue}u];
            let w2 = w16_4[wb + ${2*d+ue}u];
            a_${de}     = fma(vn, ${E}(w0.x), fma(vc, ${E}(w1.x), fma(vp, ${E}(w2.x), a_${de})));
            a_${de+1} = fma(vn, ${E}(w0.y), fma(vc, ${E}(w1.y), fma(vp, ${E}(w2.y), a_${de+1})));
            a_${de+2} = fma(vn, ${E}(w0.z), fma(vc, ${E}(w1.z), fma(vp, ${E}(w2.z), a_${de+2})));
            a_${de+3} = fma(vn, ${E}(w0.w), fma(vc, ${E}(w1.w), fma(vp, ${E}(w2.w), a_${de+3})));
          }
`})},V=Math.floor(G/4),fe=G%4;let ie="";fe===0?ie=`
        let vn = inp_4[base - ${V}u];
        let vc = inp_4[base];
        let vp = inp_4[base + ${V}u];`:V===0&&fe===1?ie=`
        let vL = inp_4[base - 1u];
        let vc = inp_4[base];
        let vR = inp_4[base + 1u];
        let vn = ${E}(vL.w, vc.xyz);
        let vp = ${E}(vc.yzw, vR.x);`:fe===1?ie=`
        let vL = inp_4[base - ${V+1}u];
        let vN = inp_4[base - ${V}u];
        let vc = inp_4[base];
        let vP = inp_4[base + ${V}u];
        let vR = inp_4[base + ${V+1}u];
        let vn = ${E}(vL.w, vN.xyz);
        let vp = ${E}(vP.yzw, vR.x);`:fe===2?ie=`
        let vL = inp_4[base - ${V+1}u];
        let vN = ${V===0?"inp_4[base]":`inp_4[base - ${V}u]`};
        let vc = ${V===0?"vN":"inp_4[base]"};
        let vP = ${V===0?"vN":`inp_4[base + ${V}u]`};
        let vR = inp_4[base + ${V+1}u];
        let vn = ${E}(vL.zw, vN.xy);
        let vp = ${E}(vP.zw, vR.xy);`:ie=`
        let vL = inp_4[base - ${V+1}u];
        let vN = ${V===0?"inp_4[base]":`inp_4[base - ${V}u]`};
        let vc = ${V===0?"vN":"inp_4[base]"};
        let vP = ${V===0?"vN":`inp_4[base + ${V}u]`};
        let vR = inp_4[base + ${V+1}u];
        let vn = ${E}(vL.yzw, vN.x);
        let vp = ${E}(vP.w, vR.xyz);`;const ge=(W,O,v,F)=>{const N=F-v,ue=at(N,ke=>`  v_${ke} : ${E},
`),de=at(N,ke=>{const he=v+ke;if(a==="none"){const we=3*t+he;return`  var a_${he} = ${E}(${q}(qmeta_u[${we>>>2}u][${we&3}u]));
`}return`  var a_${he} = ${E}(0.0${J});
`}),Pe=Array.from({length:N},(ke,he)=>`a_${v+he}`).join(", ");return`struct ${O} {
${ue}};
fn ${W}(y : i32, z : i32, x_pad : u32) -> ${O} {
${de}  var tap_yz : u32 = 0u;
  for (var dz : i32 = -1; dz <= 1; dz = dz + 1) {
    let sz = z + dz * ${G};
    for (var dy : i32 = -1; dy <= 1; dy = dy + 1) {
      let sy = y + dy * ${G};
      if ((u32(sz) | u32(sy)) < 256u) {
        let base = (u32(sz) * 256u + u32(sy)) * ${lt}u + x_pad;
${ie}
        let wb = tap_yz * ${3*d}u;
${oe(v,F)}
      }
      tap_yz = tap_yz + 1u;
    }
  }
  return ${O}(${Pe});
}
`},Q=(W,O,v,F,N)=>{const ue=N?`  let y = i32(p0.bg_y0 + lid.y);
  let z = i32(p0.bg_z0);`:`  var y : i32;
  var z : i32;
  if (p0.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(wid.z);
  } else {
    let pk = strips0_u[wid.z >> 2u][wid.z & 3u];
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`,de=N?"lid.y * 2u + sg":"row_idx * 2u + sg",Pe=N?`${P}u`:`${x}u`,ke=N?`  let s_bg_base = (${z}u + lid.y) * ${w}u + lid.x;`:`  let row_idx = u32(z) * 256u + u32(y);
  let use_act = u32(z) < 192u;
  let a_row_base = row_idx * ${_}u + x_pad;
  let s_row_base = ((u32(z) & 63u) * 256u + u32(y)) * ${w}u + lid.x;`;return`
@compute @workgroup_size(64, 4, 1)
fn ${W}(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>${X.entryArgs||""}) {
  let sg = lid.x >> 5u;
  let slane = lid.x & 31u;
${X.localHeader}  let x_pad = lid.x + ${Tt}u;
${ue}
  let acc = ${O}(y, z, x_pad);
${ke}
${X.emit({accVar:"acc",cStart:v,cEnd:F,hrExpr:de,storeMode:N?"stage_bg":"conv0_split",momOffExpr:Pe})}}`},ce=T?ge("run_conv0_lo","Conv0AccLo",0,p)+ge("run_conv0_hi","Conv0AccHi",p,t)+Q("main_lo","run_conv0_lo",0,p,!1)+Q("main_hi","run_conv0_hi",p,t,!1)+Q("main_bg_lo","run_conv0_lo",0,p,!0)+Q("main_bg_hi","run_conv0_hi",p,t,!0):ge("run_conv0","Conv0Acc",0,t)+Q("main","run_conv0",0,t,!1)+Q("main_bg","run_conv0",0,t,!0);return`${M}${I}
struct Params0 {
  is_full : u32,
  bg_y0 : u32,
  bg_z0 : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> inp_4 : array<${E}>;
@group(0) @binding(1) var<storage, read_write> act8_0 : array<u32>;
@group(0) @binding(2) var<storage, read_write> act8_1 : array<u32>;
@group(0) @binding(3) var<storage, read_write> act8_2 : array<u32>;
@group(0) @binding(4) var<storage, read_write> act8_3 : array<u32>;
@group(0) @binding(5) var<storage, read_write> stage : array<u32>;
@group(0) @binding(6) var<storage, read> w16_4 : array<${E}>;
@group(0) @binding(7) var<storage, read_write> mom : array<vec4<f32>>;
@group(0) @binding(8) var<uniform> qmeta_u : array<vec4<f32>, ${t}>;
@group(0) @binding(9) var<uniform> strips0_u : array<vec4<u32>, 4096>;
@group(0) @binding(10) var<uniform> p0 : Params0;
${X.decls}${ce}`},j=()=>`${M}
${$n(i)}
struct PrepParams {
  meta_off : u32,
  next_w_vec4_off : u32,
  next_meta_off : u32,
  has_next : u32,
  is_first : u32,
  is_full : u32,
  n_main_strips : u32,
  n_ext_hr : u32,
  ext_weight : f32,
  pad0 : u32,
  pad1 : u32,
  pad2 : u32,
};
@group(0) @binding(0) var<storage, read> w16_4 : array<${E}>;
@group(0) @binding(1) var<storage, read> qmeta : array<f32>;
@group(0) @binding(2) var<storage, read_write> mom : array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> w_eff : array<${E}>;
@group(0) @binding(4) var<storage, read> main_strips : array<u32>;
@group(0) @binding(5) var<uniform> pp : PrepParams;

${a==="gn"?`var<workgroup> fin_s  : array<f32, 256>;
var<workgroup> fin_q  : array<f32, 256>;
var<workgroup> fin_es : array<f32, 256>;
var<workgroup> fin_eq : array<f32, 256>;
`:""}var<workgroup> fin_mn : array<f32, 256>;
var<workgroup> fin_mx : array<f32, 256>;

@compute @workgroup_size(256, 1, 1)
fn moments_finish(@builtin(local_invocation_index) lid : u32,
                  @builtin(workgroup_id) wid : vec3<u32>) {
  let c = wid.x;
${a==="gn"?`  var s : f32 = 0.0;
  var q : f32 = 0.0;
  var es : f32 = 0.0;
  var eq : f32 = 0.0;
`:""}  var mn : f32 = 3.0e38;
  var mx : f32 = -3.0e38;
  if (pp.is_full != 0u) {
    for (var hr : u32 = lid; hr < ${Bn}u; hr = hr + 256u) {
      let v = mom[${x}u + hr * ${t}u + c];
${a==="gn"?`      s  += v.x;
      q  += v.y;
`:""}      mn  = min(mn, v.z);
      mx  = max(mx, v.z + v.w);
    }
  } else {
    for (var si : u32 = lid; si < pp.n_main_strips; si = si + 256u) {
      let pk = main_strips[si];
      let base_hr = ((pk >> 8u) * 256u + (pk & 255u) * 4u) * 2u;
      for (var h : u32 = 0u; h < 8u; h = h + 1u) {
        let v = mom[${x}u + (base_hr + h) * ${t}u + c];
${a==="gn"?`        s  += v.x;
        q  += v.y;
`:""}        mn  = min(mn, v.z);
        mx  = max(mx, v.z + v.w);
      }
    }
    if (pp.is_first != 0u) {
      mn = min(mn, 0.0);
      mx = max(mx, 0.0);
    } else if (pp.n_ext_hr > 0u) {
      for (var e : u32 = lid; e < pp.n_ext_hr; e = e + 256u) {
        let v = mom[${P}u + e * ${t}u + c];
${a==="gn"?`        es += v.x;
        eq += v.y;
`:""}        mn  = min(mn, v.z);
        mx  = max(mx, v.z + v.w);
      }
    }
  }
${a==="gn"?`  fin_s[lid]  = s;
  fin_q[lid]  = q;
  fin_es[lid] = es;
  fin_eq[lid] = eq;
`:""}  fin_mn[lid] = mn;
  fin_mx[lid] = mx;
  workgroupBarrier();
  for (var stride : u32 = 128u; stride > 0u; stride = stride >> 1u) {
    if (lid < stride) {
${a==="gn"?`      fin_s[lid]  += fin_s[lid + stride];
      fin_q[lid]  += fin_q[lid + stride];
      fin_es[lid] += fin_es[lid + stride];
      fin_eq[lid] += fin_eq[lid + stride];
`:""}      fin_mn[lid]  = min(fin_mn[lid], fin_mn[lid + stride]);
      fin_mx[lid]  = max(fin_mx[lid], fin_mx[lid + stride]);
    }
    workgroupBarrier();
  }
  if (lid == 0u) {
    let mbase = pp.meta_off;
    let gamma = qmeta[mbase + c];
    let beta  = qmeta[mbase + ${t}u + c];
    let eps_base = qmeta[mbase + ${2*t}u + c];
    let q_prev = select(mom[${t*2}u].x, 1.0, pp.is_first != 0u);
    let eff_eps = eps_base / (q_prev * q_prev);
${a==="gn"?`    let total_s = fin_s[0] + pp.ext_weight * fin_es[0];
    let total_q = fin_q[0] + pp.ext_weight * fin_eq[0];
    let mean = total_s / 16777216.0;
    let varr = max(total_q / 16777216.0 - mean * mean, 0.0);
    let inv_std = inverseSqrt(varr + eff_eps);
`:`    let mean : f32 = 0.0;
    let inv_std : f32 = 1.0;
`}    let scale = inv_std * gamma;
    let shift = beta - mean * scale;
    let u_lo = fin_mn[0] * scale + shift;
    let u_hi = fin_mx[0] * scale + shift;
    let vmax = max(0.25, max(act(u_lo), act(u_hi)));
    ${i==="gelu_tanh"?`
    let qs = select(max(vmax / 248.0, 0.1705 / 7.0), 1.0, c >= ${n}u);
    `:i==="relu"?`
    let qs = select(max(vmax / 255.0, 1e-6), 1.0, c >= ${n}u);
    `:`
    let qs = select(max(vmax / 223.0, 1.0 / 32.0), 1.0, c >= ${n}u);
    `}
    let sb = c * 2u;
    mom[sb]      = vec4<f32>(mean, inv_std, qs, 1.0 / qs);
    mom[sb + 1u] = vec4<f32>(scale, shift, 0.0, 0.0);
  }
}

@compute @workgroup_size(256, 1, 1)
fn prep_weff(@builtin(local_invocation_index) lid : u32) {
  if (pp.has_next == 0u) { return; }
  var q_ref : f32 = 1e-6;
  for (var ic : u32 = 0u; ic < ${n}u; ic = ic + 1u) {
    let qs = mom[ic * 2u].z;
    q_ref = max(q_ref, ${Z.toFixed(1)} * qs);
  }
  ${a==="none"?"q_ref = 1.0;":""}
  if (lid == 0u) {
    mom[${t*2}u] = vec4<f32>(q_ref, 0.0, 0.0, 0.0);
  }
  let scale_num = ${Z.toFixed(1)} / q_ref;
  for (var idx : u32 = lid; idx < ${C}u; idx = idx + 256u) {
    let ic = (idx / ${3*d}u) % ${t}u;
    let qs = mom[ic * 2u].z;
    w_eff[idx] = w16_4[pp.next_w_vec4_off + idx] * ${q}(qs * scale_num);
  }
  if (lid < ${d}u) {
    ${a==="none"?`
    let mb = pp.next_meta_off + ${3*t}u + lid * 4u;
    w_eff[${S}u + lid] = ${E}(${q}(qmeta[mb]), ${q}(qmeta[mb + 1u]), ${q}(qmeta[mb + 2u]), ${q}(qmeta[mb + 3u]));
    `:`
    w_eff[${S}u + lid] = ${E}(0.0${J});
    `}
  }
}`,le=()=>`
struct BandFlushParams {
  is_full : u32,
  z_start : u32,
  strip_off : u32,
  pad0 : u32,
  pad1 : u32,
  pad2 : u32,
  pad3 : u32,
  pad4 : u32,
};
@group(0) @binding(0) var<storage, read_write> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> act8_2 : array<u32>;
@group(0) @binding(3) var<storage, read_write> act8_3 : array<u32>;
@group(0) @binding(4) var<storage, read> stage : array<u32>;
@group(0) @binding(5) var<storage, read> strips : array<u32>;
@group(0) @binding(6) var<uniform> fp : BandFlushParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let x_pad = x4 + ${Tt}u;
  var y : u32;
  var z : u32;
  if (fp.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = fp.z_start + wid.z;
  } else {
    let pk = strips[fp.strip_off + wid.z] & 0xFFFFu;
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let a_base = (z * 256u + y) * ${_}u + x_pad;
  let s_base = ((z & 63u) * 256u + y) * ${w}u + x4;
  for (var c : u32 = 0u; c < ${c}u; c = c + 1u) {
    let a_off = a_base + c * ${lt}u;
    act8_0[a_off] = stage[s_base + c * ${mt}u];
    act8_1[a_off] = stage[s_base + (${c}u + c) * ${mt}u];
    act8_2[a_off] = stage[s_base + (${2*c}u + c) * ${mt}u];
    act8_3[a_off] = stage[s_base + (${3*c}u + c) * ${mt}u];
  }
}`,te=(X,oe)=>{const V=X*c;return`
  for (var cl : u32 = 0u; cl < ${c}u; cl = cl + 1u) {
    let c = ${V}u + cl;
    let inv_qs = mom[c * 2u].w;
    let st = mom[c * 2u + 1u];
    let rm = mom[mom_base + c];
    let q_word = ${oe?`stage[s_bg_base + c * ${mt}u]`:`select(stage[s_base + c * ${mt}u], act8_${X}[a_base + cl * ${lt}u], use_act)`};
    let yv = unpack4x8unorm(q_word) * rm.w + vec4<f32>(rm.z);
    let a = vec4<f32>(
      act(yv.x * st.x + st.y),
      act(yv.y * st.x + st.y),
      act(yv.z * st.x + st.y),
      act(yv.w * st.x + st.y)
    );
    act8_${X}[a_base + cl * ${lt}u] = pack4x8unorm((a * inv_qs + vec4<f32>(${b.zeroBin.toFixed(1)})) * (1.0 / 255.0));
  }`},D=()=>`${$n(i)}
struct NormParams {
  is_full : u32,
  bg_row : u32,
  halo_off : u32,
  n_halo : u32,
};
@group(0) @binding(0) var<storage, read_write> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read_write> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read_write> act8_2 : array<u32>;
@group(0) @binding(3) var<storage, read_write> act8_3 : array<u32>;
@group(0) @binding(4) var<storage, read> stage : array<u32>;
@group(0) @binding(5) var<storage, read> mom : array<vec4<f32>>;
@group(0) @binding(6) var<storage, read> norm_aux : array<u32>;
@group(0) @binding(7) var<uniform> np : NormParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let x_pad = x4 + ${Tt}u;
  var y : u32;
  var z : u32;
  if (np.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = wid.z;
  } else {
    let pk = norm_aux[wid.z];
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let row_idx = z * 256u + y;
  let use_act = z < 192u;
  let a_base = row_idx * ${_}u + x_pad;
  let s_base = ((z & 63u) * 256u + y) * ${w}u + x4;
  let mom_base = ${x}u + (row_idx * 2u + sg) * ${t}u;
${at(4,X=>te(X,!1))}
}

@compute @workgroup_size(64, 4, 1)
fn norm_halo_fill(@builtin(local_invocation_id) lid : vec3<u32>,
                  @builtin(workgroup_id) wid : vec3<u32>) {
  let idx = wid.y * 4u + lid.y;
  if (idx >= np.n_halo) { return; }
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let x_pad = x4 + ${Tt}u;
  let s_bg_base = ${z}u * ${w}u + x4;
  let mom_base = ${P}u + sg * ${t}u;
  let dst_row = norm_aux[np.halo_off + idx];
  let a_base = dst_row * ${_}u + x_pad;
${at(4,X=>te(X,!0))}
}`,se=()=>{const X=!l&&t>=16,oe=me(l),V=(v,F)=>l?`
          let ${v} = vec4<f16>(vec2<f16>(unpack2x16float(((${F} & 0x00FF00FFu) << 2u) | 0x3C003C00u)), vec2<f16>(unpack2x16float(((${F} >> 6u) & 0x03FC03FCu) | 0x3C003C00u))) - vec4<f16>(${b.sterbenzSub});`:`
          let ${v} = unpack4x8unorm(${F}) - vec4<f32>(${b.uZeroFloat});`,fe=v=>`
          let uL = ${v}[base - off0];
          let uN = ${v}[base - off1];
          let uC = ${v}[base];
          let uP = ${v}[base + off1];
          let uR = ${v}[base + off0];
          let u_neg = (uL >> sh_l) | (uN << sh_r);
          let u_pos = (uP >> sh_r) | (uR << sh_l);`+V("vn","u_neg")+V("vc","uC")+V("vp","u_pos"),ie=(v,F)=>{const N=v/4,ue=F/4;if(A){const de=d/2,Pe=d;let ke="";for(let he=N;he<ue;he+=2){const we=he*4,pe=he/2;ke+=`          {
            let wp0 = w_eff_u[wbu + ${pe}u];
            let wp1 = w_eff_u[wbu + ${de+pe}u];
            let wp2 = w_eff_u[wbu + ${Pe+pe}u];
            let w0a = u4_lo(wp0);
            let w0b = u4_hi(wp0);
            let w1a = u4_lo(wp1);
            let w1b = u4_hi(wp1);
            let w2a = u4_lo(wp2);
            let w2b = u4_hi(wp2);
            a_${we}     = fma(vn, vec4<f16>(w0a.x), fma(vc, vec4<f16>(w1a.x), fma(vp, vec4<f16>(w2a.x), a_${we})));
            a_${we+1} = fma(vn, vec4<f16>(w0a.y), fma(vc, vec4<f16>(w1a.y), fma(vp, vec4<f16>(w2a.y), a_${we+1})));
            a_${we+2} = fma(vn, vec4<f16>(w0a.z), fma(vc, vec4<f16>(w1a.z), fma(vp, vec4<f16>(w2a.z), a_${we+2})));
            a_${we+3} = fma(vn, vec4<f16>(w0a.w), fma(vc, vec4<f16>(w1a.w), fma(vp, vec4<f16>(w2a.w), a_${we+3})));
            a_${we+4} = fma(vn, vec4<f16>(w0b.x), fma(vc, vec4<f16>(w1b.x), fma(vp, vec4<f16>(w2b.x), a_${we+4})));
            a_${we+5} = fma(vn, vec4<f16>(w0b.y), fma(vc, vec4<f16>(w1b.y), fma(vp, vec4<f16>(w2b.y), a_${we+5})));
            a_${we+6} = fma(vn, vec4<f16>(w0b.z), fma(vc, vec4<f16>(w1b.z), fma(vp, vec4<f16>(w2b.z), a_${we+6})));
            a_${we+7} = fma(vn, vec4<f16>(w0b.w), fma(vc, vec4<f16>(w1b.w), fma(vp, vec4<f16>(w2b.w), a_${we+7})));
          }
`}return ke}return at(ue-N,de=>{const Pe=N+de,ke=Pe*4;return`          {
            let w0 = w_eff[wb + ${Pe}u];
            let w1 = w_eff[wb + ${d+Pe}u];
            let w2 = w_eff[wb + ${2*d+Pe}u];
            a_${ke}     = fma(vn, ${E}(w0.x), fma(vc, ${E}(w1.x), fma(vp, ${E}(w2.x), a_${ke})));
            a_${ke+1} = fma(vn, ${E}(w0.y), fma(vc, ${E}(w1.y), fma(vp, ${E}(w2.y), a_${ke+1})));
            a_${ke+2} = fma(vn, ${E}(w0.z), fma(vc, ${E}(w1.z), fma(vp, ${E}(w2.z), a_${ke+2})));
            a_${ke+3} = fma(vn, ${E}(w0.w), fma(vc, ${E}(w1.w), fma(vp, ${E}(w2.w), a_${ke+3})));
          }
`})},ge=(v,F,N)=>{const ue=v*c,de=`(${c}u + cp.pad0)`;return A?`        for (var ic : u32 = 0u; ic < ${de}; ic = ic + 1u) {
          let base = row_off + ic * ${lt}u;
${fe(`act8_${v}`)}
          let wbu = wbu_tap + ${ue?`(${ue}u + ic)`:"ic"} * ${3*d/2}u;
${ie(F,N)}
        }
`:`        for (var ic : u32 = 0u; ic < ${de}; ic = ic + 1u) {
          let base = row_off + ic * ${lt}u;
${fe(`act8_${v}`)}
          let wb = wb_tap + ${ue?`(${ue}u + ic)`:"ic"} * ${3*d}u;
${ie(F,N)}
        }
`},Q=(v,F,N,ue)=>{const de=ue-N,Pe=at(de,pe=>`  v_${pe} : ${E},
`),ke=at(de,pe=>{const L=N+pe;if(a==="none"){const We=L>>>2,Oe=["x","y","z","w"][L&3];if(A){const bt=S+We>>>1,dt=S+We&1?"u4_hi":"u4_lo";return`  var a_${L} = ${E}(${dt}(w_eff_u[${bt}u]).${Oe});
`}return`  var a_${L} = ${E}(w_eff[${S+We}u].${Oe});
`}return`  var a_${L} = ${E}(0.0${J});
`}),he=A?`        let wbu_tap = tap_yz * ${t*3*d/2}u;
`:`        let wb_tap = tap_yz * ${t*3*d}u;
`,we=Array.from({length:de},(pe,L)=>`a_${N+L}`).join(", ");return`struct ${F} {
${Pe}};
fn ${v}(y : i32, z : i32, x_pad : u32, dp : u32) -> ${F} {
${ke}  let d_step = i32(dp & 63u);
  let off0 = (dp >> 6u) & 15u;
  let off1 = (dp >> 10u) & 15u;
  let sh_r = (dp >> 14u) & 31u;
  let sh_l = (dp >> 19u) & 31u;
  var tap_yz : u32 = 0u;
  for (var dz : i32 = -1; dz <= 1; dz = dz + 1) {
    let sz = z + dz * d_step;
    for (var dy : i32 = -1; dy <= 1; dy = dy + 1) {
      let sy = y + dy * d_step;
      if ((u32(sz) | u32(sy)) < 256u) {
        let row_off = (u32(sz) * 256u + u32(sy)) * ${_}u + x_pad;
${he}${at(4,pe=>ge(pe,N,ue))}      }
      tap_yz = tap_yz + 1u;
    }
  }
  return ${F}(${we});
}
`},ce=(v,F,N,ue,de)=>{let Pe="";de==="bg"?Pe=`
  let y = i32(cp.bg_y0 + lid.y);
  let z = i32(cp.bg_z0);`:de==="ext"?Pe=`
  let pk_full = strips[cp.ext_off + wid.z];
  let ext_orig = pk_full >> 16u;
  let pk = pk_full & 0xFFFFu;
  let y = i32((pk & 255u) * 4u + lid.y);
  let z = i32(pk >> 8u);`:Pe=`
  var y : i32;
  var z : i32;
  if (cp.is_full != 0u) {
    y = i32(wid.y * 4u + lid.y);
    z = i32(cp.z_start + wid.z);
  } else {
    let pk = strips[cp.strip_off + wid.z] & 0xFFFFu;
    y = i32((pk & 255u) * 4u + lid.y);
    z = i32(pk >> 8u);
  }`;const ke=de==="bg"?"lid.y * 2u + sg":de==="ext"?"ext_orig * 8u + lid.y * 2u + sg":"row_idx * 2u + sg",he=de==="main"?`${x}u`:`${P}u`,we=de==="bg"?"stage_bg":"stage",pe=de==="main"?"true":"(((dp >> 24u) & 1u) != 0u)",L=de==="bg"?`  let row_idx = u32(z) * 256u + u32(y);
  let s_bg_base = (${z}u + lid.y) * ${w}u + x4;`:`  let row_idx = u32(z) * 256u + u32(y);
  let s_row_base = ((u32(z) & 63u) * 256u + u32(y)) * ${w}u + x4;`;return`
@compute @workgroup_size(64, 4, 1)
fn ${v}(@builtin(local_invocation_id) lid : vec3<u32>,
             @builtin(workgroup_id) wid : vec3<u32>${oe.entryArgs||""}) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  let slane = x4 & 31u;
${oe.localHeader}  let x_pad = x4 + ${Tt}u;
${Pe}
  let dp = cp.d_pack;
  let acc = ${F}(y, z, x_pad, dp);
${L}
${oe.emit({accVar:"acc",cStart:N,cEnd:ue,hrExpr:ke,storeMode:we,momOffExpr:he,alsoWriteMomMain:de!=="main",writeY8Expr:pe})}}`},W=X?Q("run_conv_lo","ConvAccLo",0,p)+Q("run_conv_hi","ConvAccHi",p,t)+ce("main_lo","run_conv_lo",0,p,"main")+ce("main_hi","run_conv_hi",p,t,"main")+ce("main_ext_lo","run_conv_lo",0,p,"ext")+ce("main_ext_hi","run_conv_hi",p,t,"ext")+ce("main_bg_lo","run_conv_lo",0,p,"bg")+ce("main_bg_hi","run_conv_hi",p,t,"bg"):Q("run_conv","ConvAcc",0,t)+ce("main","run_conv",0,t,"main")+ce("main_ext","run_conv",0,t,"ext")+ce("main_bg","run_conv",0,t,"bg"),O=A?`fn u4_lo(u : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(u.x)), vec2<f16>(unpack2x16float(u.y)));
}
fn u4_hi(u : vec4<u32>) -> vec4<f16> {
  return vec4<f16>(vec2<f16>(unpack2x16float(u.z)), vec2<f16>(unpack2x16float(u.w)));
}
@group(0) @binding(6) var<uniform> w_eff_u : array<vec4<u32>, ${Math.ceil(h/2)}>;`:`@group(0) @binding(6) var<storage, read> w_eff : array<${E}>;`;return`${M}${I}
struct BandConvParams {
  is_full : u32,
  z_start : u32,
  strip_off : u32,
  ext_off : u32,
  d_pack : u32,
  bg_y0 : u32,
  bg_z0 : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read> act8_2 : array<u32>;
@group(0) @binding(3) var<storage, read> act8_3 : array<u32>;
@group(0) @binding(4) var<storage, read_write> stage : array<u32>;
@group(0) @binding(5) var<storage, read_write> mom : array<vec4<f32>>;
${O}
@group(0) @binding(7) var<storage, read> strips : array<u32>;
@group(0) @binding(8) var<uniform> cp : BandConvParams;
${oe.decls}${W}`},ae=X=>{const oe=X*c;return`
  for (var cl : u32 = 0u; cl < ${c}u; cl = cl + 1u) {
    let c = ${oe}u + cl;
    if (c < ${n}u) {
      let st = mom[c * 2u + 1u];
      let rm = mom[mom_base + c];
      let q_word = select(stage[s_base + c * ${mt}u], act8_${X}[a_base + cl * ${lt}u], use_act);
      let yv = unpack4x8unorm(q_word) * rm.w + vec4<f32>(rm.z);
      let fv = vec4<f32>(
        act(yv.x * st.x + st.y),
        act(yv.y * st.x + st.y),
        act(yv.z * st.x + st.y),
        act(yv.w * st.x + st.y)
      );
      feat[c] = ${E}(fv);
    }
  }`};return{initActWgsl:be,conv0Wgsl:ee,prepWgsl:j,flushWgsl:le,normWgsl:D,convWgsl:se,clsWgsl:()=>`${M}
${$n(i)}
struct ClsParams {
  w_vec4_off : u32,
  bias_off : u32,
  is_full : u32,
  pad0 : u32,
};
@group(0) @binding(0) var<storage, read> act8_0 : array<u32>;
@group(0) @binding(1) var<storage, read> act8_1 : array<u32>;
@group(0) @binding(2) var<storage, read> act8_2 : array<u32>;
@group(0) @binding(3) var<storage, read> act8_3 : array<u32>;
@group(0) @binding(4) var<storage, read> stage : array<u32>;
@group(0) @binding(5) var<storage, read> w16_4 : array<${E}>;
@group(0) @binding(6) var<storage, read> mom : array<vec4<f32>>;
@group(0) @binding(7) var<storage, read_write> labels8 : array<u32>;
@group(0) @binding(8) var<uniform> qmeta_u : array<vec4<f32>, ${y}>;
@group(0) @binding(9) var<uniform> cls_strips_u : array<vec4<u32>, 4096>;
@group(0) @binding(10) var<uniform> cp : ClsParams;

@compute @workgroup_size(64, 4, 1)
fn main(@builtin(local_invocation_id) lid : vec3<u32>,
        @builtin(workgroup_id) wid : vec3<u32>) {
  let x4 = lid.x;
  let sg = x4 >> 5u;
  var y : u32;
  var z : u32;
  if (cp.is_full != 0u) {
    y = wid.y * 4u + lid.y;
    z = wid.z;
  } else {
    let pk = cls_strips_u[wid.z >> 2u][wid.z & 3u];
    y = (pk & 255u) * 4u + lid.y;
    z = pk >> 8u;
  }
  let row_idx = z * 256u + y;
  let use_act = z < 192u;
  let a_base = row_idx * ${_}u + x4 + ${Tt}u;
  let s_base = ((z & 63u) * 256u + y) * ${w}u + x4;
  let mom_base = ${x}u + (row_idx * 2u + sg) * ${t}u;

  var feat : array<${E}, ${n}>;
${at(4,X=>ae(X))}

  let w_cls = cp.w_vec4_off;
  let b_vec4 = cp.bias_off >> 2u;
${Qo({chan:n,clsK4:o,nclass:r,V4:E,suf:J,readBiasStmt:"    let bv = qmeta_u[b_vec4 + k4];",biasExpr:X=>`bv.${["x","y","z","w"][X]}`,probCfg:m})}
}`,qmetaVec4Len:y,numConvs:f,totalWEffVec4s:h,useUniformWeff:A,csQ:c,halfPass0:T,halfPassConv:!l&&t>=16}}async function Xa(e,t,n,r,o,s,i,a){const l=U*U*U,u=i?l*4:l,f=t.dilations.length,m=t.cs/4,c=U*U*m*lt*4,d=(64*U+4)*t.cs*mt*4,z=(t.cs*2+4+(Bn+Wo)*t.cs)*16,w=e.limits||{},g=Math.min(w.maxStorageBufferBindingSize??1/0,w.maxBufferSize??1/0);if(c>g||d>g||z>g||u>g){const nt=Math.ceil(Math.max(c,d,z,u)/1048576);throw new Error(`meshnet_fast_v4: LowMem128 max buffer (${nt} MiB) exceeds device limit (${g>>>20} MiB)`)}const x=Ha({cs:t.cs,chan:t.chan,nclass:t.nclass,clsK4:n.clsK4,dilations:t.dilations,activation:t.activation,norm:t.norm,hasF16:r,subgroupMode:o,numConvs:f,probCfg:i});console.log(`[WebGPU-V4-128M] ${t.chan}ch(cs=${t.cs})/${t.nclass}cls (${f} convs, ${t.activation}, norm=${t.norm}${i?", prob=3":""}) | ${r?"f16+sterbenz":"f32"} | ${No(o)} | ZYCX-4Q+64slice | maxBuf=${(Math.max(c,d,z,u)/1048576).toFixed(1)} MiB`);const P=GPUBufferUsage.STORAGE,$=GPUBufferUsage.UNIFORM,y=GPUBufferUsage.COPY_DST,C=GPUBufferUsage.COPY_SRC,S=U*U*tn,h=S*(r?2:4),A=r?Math.ceil(x.totalWEffVec4s/2)*16:x.totalWEffVec4s*16,b=!!(i&&c>=u),M=`128|${t.cs}|${r?1:0}|${u}|${b?1:0}`,k=Yo(e,M,()=>{const nt=[],Ke=Dn(e,nt),ht=Ke.alloc,At={inpBuf:ht(h,P|y|C),act8_0:ht(c,P|y|C),act8_1:ht(c,P|y|C),act8_2:ht(c,P|y|C),act8_3:ht(c,P|y|C),stageBuf:ht(d,P),momBuf:ht(z,P),labels8Buf:ht(u,P|y|C),readbackBuf:ht(u,GPUBufferUsage.MAP_READ|y),probPackTmpBuf:b?ht(u,P|y|C):null};return{buffers:nt,named:At,bytes:Ke.getBytes()}}),{inpBuf:I,act8_0:q,act8_1:J,act8_2:E,act8_3:Z,stageBuf:me,momBuf:be,labels8Buf:G,readbackBuf:T,probPackTmpBuf:ee}=k.named,j=[],le=Dn(e,j),te=le.alloc,D=te(r?n.wF16.byteLength:n.wF32.byteLength,P|y),se=te(n.qmetaF32.byteLength,P|$|y),ae=te(A,x.useUniformWeff?P|$:P),ye=t.norm==="gn"&&!s?.disableConeSkip,X=te(Te*4,$|y),oe=te(Te*4,$|y),V=Array.from({length:f},()=>te(ye?Te*4:16,P|y)),fe=Array.from({length:f-1},()=>te(ye?(Te+U*U)*4:16,P|y)),ie=te(16,$|y),ge=te(16,$|y),Q=Array.from({length:f},()=>te(48,$|y)),ce=Array.from({length:f-1},()=>te(16,$|y)),W=Math.max(256,w.minUniformBufferOffsetAlignment||256),O=W>>>2,v=20,F=Math.max(1,(f-1)*v),N=te(F*W,$|y),ue=new Uint32Array(F*O);e.queue.writeBuffer(D,0,r?n.wF16:n.wF32),e.queue.writeBuffer(se,0,n.qmetaF32);let de;try{de=await Oa(e,t,n,r,o,i,x)}catch(nt){for(const Ke of j)Ke.destroy();if(j.length=0,k.pooled)jt.get(e)===k&&kn(e);else{for(const Ke of k.buffers)Ke.destroy();k.buffers.length=0}throw nt}const{pInit:Pe,pMomFin:ke,pPrepW:he,pFlush:we,pNorm:pe,pNormHalo:L,pCls:We,pConv0:Oe,pConv:bt}=de,dt=(nt,Ke)=>e.createBindGroup({layout:nt,entries:Ke.map((ht,At)=>({binding:At,resource:ht&&ht.buffer?ht:{buffer:ht}}))}),Yt=dt(Pe.bgl,[q,J,E,Z]);{const nt=e.createCommandEncoder(),Ke=nt.beginComputePass();Ke.setPipeline(Pe.pipe),Ke.setBindGroup(0,Yt),Ke.dispatchWorkgroups(1,U,U),Ke.end(),e.queue.submit([nt.finish()])}const Kt=(x.halfPass0?Oe.lo:Oe.main).bgl,B=dt(Kt,[I,q,J,E,Z,me,D,be,{buffer:se,offset:0,size:t.cs*16},X,ie]),R=dt(We.bgl,[q,J,E,Z,me,D,be,G,se,oe,ge]),K=b?te(16,$|y):null,ne=b?dt(We.bgl,[q,J,E,Z,me,D,be,G,se,oe,K]):null,ve=Jo({device:e,hasF16:r,nvox:l,outBufBytes:u,inpBuf:I,act8_0:q,labels8Buf:G,readbackBuf:T,pInit:Pe,bgInit:Yt,pCls:We,bgCls:R,clsUbo:ge,packed:n,modelEntry:s,probCfg:i,canGpuProb:b,probSlots:b?{clsUbo1:K,bgCls1:ne,pass0HoldBuf:ee,y0:q,y1:J,b:E,sup:Z}:null,ownedBuffers:j,mkBuf:te}),H=Q.map((nt,Ke)=>dt(ke.bgl,[D,se,be,ae,V[Ke],nt])),Be=ce.map((nt,Ke)=>dt(pe.bgl,[q,J,E,Z,me,be,fe[Ke],nt])),xe={buffer:N,offset:0,size:32},Ee=Array.from({length:f},(nt,Ke)=>Ke===0?null:dt(we.bgl,[q,J,E,Z,me,V[Ke],xe])),Me=x.halfPassConv?bt.lo:bt.main,$e=Array.from({length:f},(nt,Ke)=>Ke===0?null:dt(Me.bgl,[q,J,E,Z,me,be,ae,V[Ke],xe])),je=r?new Uint16Array(S):new Float32Array(S),ct=new Uint8Array(U*U),gt=new Uint32Array(Te),vt=new Uint32Array(Te+U*U),it=new Uint32Array(12),Fn=new Float32Array(it.buffer),ft=new Uint32Array(4),dn=(nt,Ke,ht,At,Ot,Ze,Zt,qe)=>{const Ge=nt*O;ue[Ge]=Ke?1:0,ue[Ge+1]=ht,ue[Ge+2]=At,ue[Ge+3]=Ot,ue[Ge+4]=Ze,ue[Ge+5]=Zt,ue[Ge+6]=qe,ue[Ge+7]=0};async function Bt(nt,Ke){if(nt.length!==l)throw new Error(`meshnet_fast_v4 expected ${l} voxels, got ${nt.length}`);const ht=t.norm==="gn"&&!s?.disableConeSkip,At=await ve.prepareInput({volume:nt,ioOpts:Ke,useCone:ht,padInputHost:je,headRowHost:ct,hasF16Flag:r}),Ot=At.info,Ze=jo(ct,Ot,t.dilations,ht),Zt=new Array(f);for(let _e=0;_e<f;_e++){const Le=Ze.layers[_e],Ae=Le.isFull?Te:Le.mainStrips.length,Ue=Le.isFull||!Le.extStrips?0:Le.extStrips.length,$t=Le.haloRows?Le.haloRows.length:0;if(_e===0){!Le.isFull&&Ae>0&&(gt.set(Le.mainStrips,0),e.queue.writeBuffer(X,0,gt.subarray(0,Ae)),e.queue.writeBuffer(V[0],0,gt.subarray(0,Ae))),Zt[0]={L:Le,nMain:Ae,nExt:Ue,nHalo:$t};continue}const St=new Uint32Array(8),Mt=new Uint32Array(8),De=new Uint32Array(8),Fe=new Uint32Array(8);if(!Le.isFull){if(Ae>0){gt.set(Le.mainStrips,0);for(let ut=0;ut<Ae;ut++)Mt[Le.mainStrips[ut]>>>13]++;let ze=0;for(let ut=0;ut<8;ut++)St[ut]=ze,ze+=Mt[ut]}if(Le.mode==="bwd"&&Ue>0){const ze=Array.from({length:8},()=>[]);for(let Xe=0;Xe<Ue;Xe++){const Se=Le.extStrips[Xe];ze[Se>>>13].push((Xe&65535)<<16|Se)}let ut=Ae;for(let Xe=0;Xe<8;Xe++){De[Xe]=ut;const Se=ze[Xe];Fe[Xe]=Se.length;for(let Ce=0;Ce<Se.length;Ce++)gt[ut++]=Se[Ce]}e.queue.writeBuffer(V[_e],0,gt.subarray(0,Ae+Ue))}else Ae>0&&e.queue.writeBuffer(V[_e],0,gt.subarray(0,Ae))}const Y=Le.mode==="rpure"&&$t>0||Le.mode==="bwd"&&_e+1<f,re=vr(t.dilations[_e],Y),et=(_e-1)*v,Qe=Le.bgStrip?Le.bgStrip.yWg*4:0,rt=Le.bgStrip?Le.bgStrip.z:0;for(let ze=0;ze<8;ze++)dn(et+ze,Le.isFull,ze*32,St[ze],De[ze],re,Qe,rt);for(let ze=0;ze<6;ze++)dn(et+8+ze,Le.isFull,ze*32,St[ze],0,0,0,0),dn(et+14+ze,!1,ze*32,De[ze],0,0,0,0);Zt[_e]={L:Le,nMain:Ae,nExt:Ue,nHalo:$t,mainCount:Mt,extCount:Fe,layerBaseSlot:et}}f>1&&e.queue.writeBuffer(N,0,ue);let qe=a.execMode==="calibrate"&&e.__v4WinCalibrated?e.__v4WinFast?"pipelined":"paced":a.execMode;const Ge=[];if(qe==="single"){const _e=e.createCommandEncoder();At.runPrePasses(_e,Ge),Ze.clsSkipped&&(_e.clearBuffer(G,0,u),Ze.clsStrips.length>0&&e.queue.writeBuffer(oe,0,Ze.clsStrips));for(let Le=0;Le<f;Le++){const Ae=Zt[Le],{L:Ue,nMain:$t,nHalo:St}=Ae,Mt=Ue.nMomExt||0,De=Ue.isFull?Te:Ue.normStrips?Ue.normStrips.length:0;if(Le===0){const Y=Ue.isFull?64:1,re=Ue.isFull?U:$t,et=!!(Ue.bgStrip&&St>0);if(ft[0]=Ue.isFull?1:0,ft[1]=Ue.bgStrip?Ue.bgStrip.yWg*4:0,ft[2]=Ue.bgStrip?Ue.bgStrip.z:0,ft[3]=0,e.queue.writeBuffer(ie,0,ft),x.halfPass0)for(const[Qe,rt]of[[Oe.lo,Oe.bgLo],[Oe.hi,Oe.bgHi]]){const ze=_e.beginComputePass();ze.setBindGroup(0,B),re>0&&(ze.setPipeline(Qe.pipe),ze.dispatchWorkgroups(1,Y,re)),et&&(ze.setPipeline(rt.pipe),ze.dispatchWorkgroups(1,1,1)),ze.end(),Ge.push("conv0")}else{const Qe=_e.beginComputePass();Qe.setBindGroup(0,B),re>0&&(Qe.setPipeline(Oe.main.pipe),Qe.dispatchWorkgroups(1,Y,re)),et&&(Qe.setPipeline(Oe.bg.pipe),Qe.dispatchWorkgroups(1,1,1)),Qe.end(),Ge.push("conv0")}}else{const Y=bt,re=$e[Le],et=Ee[Le],{mainCount:Qe,extCount:rt,layerBaseSlot:ze}=Ae,ut=Ue.mode==="rpure"&&!!Ue.bgStrip;for(let Xe=0;Xe<8;Xe++){if(Xe>=2){const Ye=Xe-2,ot=Ue.isFull||Qe[Ye]>0,Ft=!Ue.isFull&&Ue.mode==="bwd"&&rt[Ye]>0;if(ot||Ft){const wt=_e.beginComputePass();wt.setPipeline(we.pipe),ot&&(wt.setBindGroup(0,et,[(ze+8+Ye)*W]),wt.dispatchWorkgroups(1,Ue.isFull?64:1,Ue.isFull?32:Qe[Ye])),Ft&&(wt.setBindGroup(0,et,[(ze+14+Ye)*W]),wt.dispatchWorkgroups(1,1,rt[Ye])),wt.end(),Ge.push("flushStage")}}const Se=Ue.isFull||Qe[Xe]>0,Ce=!Ue.isFull&&Ue.mode==="bwd"&&rt[Xe]>0,yt=Xe===0&&ut;if(!Se&&!Ce&&!yt)continue;const Re=[(ze+Xe)*W],kt=Ue.isFull?64:1,zt=Ue.isFull?32:Qe[Xe];if(x.halfPassConv)for(const[Ye,ot,Ft]of[[Y.lo,Y.extLo,Y.bgLo],[Y.hi,Y.extHi,Y.bgHi]]){const wt=_e.beginComputePass();wt.setBindGroup(0,re,Re),Se&&(wt.setPipeline(Ye.pipe),wt.dispatchWorkgroups(1,kt,zt)),Ce&&(wt.setPipeline(ot.pipe),wt.dispatchWorkgroups(1,1,rt[Xe])),yt&&(wt.setPipeline(Ft.pipe),wt.dispatchWorkgroups(1,1,1)),wt.end(),Ge.push("convHidden")}else{const Ye=_e.beginComputePass();Ye.setBindGroup(0,re,Re),Se&&(Ye.setPipeline(Y.main.pipe),Ye.dispatchWorkgroups(1,kt,zt)),Ce&&(Ye.setPipeline(Y.ext.pipe),Ye.dispatchWorkgroups(1,1,rt[Xe])),yt&&(Ye.setPipeline(Y.bg.pipe),Ye.dispatchWorkgroups(1,1,1)),Ye.end(),Ge.push("convHidden")}}}const Fe=Le+1<f?n.w0Vec4s+Le*n.hiddenVec4PerLayer:0;it[0]=Le*n.metaStride,it[1]=Fe,it[2]=(Le+1)*n.metaStride,it[3]=Le+1<f?1:0,it[4]=Le===0?1:0,it[5]=Ue.isFull?1:0,it[6]=$t,it[7]=Mt*8,Fn[8]=Ue.extWeight||0,it[9]=0,it[10]=0,it[11]=0,e.queue.writeBuffer(Q[Le],0,it);{const Y=_e.beginComputePass();Y.setBindGroup(0,H[Le]),Y.setPipeline(ke.pipe),Y.dispatchWorkgroups(t.cs,1,1),Y.end(),Ge.push("momentsPrep")}if(Le+1<f){{const re=_e.beginComputePass();re.setBindGroup(0,H[Le]),re.setPipeline(he.pipe),re.dispatchWorkgroups(1,1,1),re.end(),Ge.push("momentsPrep")}const Y=Ue.isFull?0:De;if((Y>0||St>0)&&(Y>0&&vt.set(Ue.normStrips,0),St>0&&vt.set(Ue.haloRows,Y),e.queue.writeBuffer(fe[Le],0,vt.subarray(0,Y+St))),ft[0]=Ue.isFull?1:0,ft[1]=Ue.bgStrip?Ue.bgStrip.z*U+Ue.bgStrip.yWg*4:0,ft[2]=Y,ft[3]=St,e.queue.writeBuffer(ce[Le],0,ft),Ue.isFull||De>0||St>0){const re=_e.beginComputePass();re.setBindGroup(0,Be[Le]),(Ue.isFull||De>0)&&(re.setPipeline(pe.pipe),re.dispatchWorkgroups(1,Ue.isFull?64:1,Ue.isFull?U:De)),St>0&&(re.setPipeline(L.pipe),re.dispatchWorkgroups(1,Math.ceil(St/4),1)),re.end(),Ge.push("normHalo")}}}return Bt.__passCategories=Ge,ve.finishAndReadback({enc:_e,schedule:Ze,passCategories:Ge,u4Tmp:ft,ioOpts:Ke})}const tt=En(e),Ne=typeof Ke?.onProgress=="function"?Ke.onProgress:null,st=Vo(Ze,f);let _t=0,Nt=-1;const pt=_e=>{if(!Ne)return;const Le=Math.min(.99,_t/st);let Ae="";_e>=0&&_e!==Nt&&(Nt=_e,Ae=`Layer ${_e+1}/${f}`),Ne(Le,Ae)},He=Go(e,a.msPerStrip||e.__v4MsPerStrip||.12,pt);let Ie=e.createCommandEncoder();At.runPrePasses(Ie,Ge),Ze.clsSkipped&&(Ie.clearBuffer(G,0,u),Ze.clsStrips.length>0&&e.queue.writeBuffer(oe,0,Ze.clsStrips));for(let _e=0;_e<f;_e++){const Le=Zt[_e],{L:Ae,nMain:Ue,nHalo:$t}=Le,St=Ae.nMomExt||0,Mt=Ae.isFull?Te:Ae.normStrips?Ae.normStrips.length:0,De=Fr(Ae,_e,f);if(_e===0){const Y=Ae.isFull?64:1,re=Ae.isFull?U:Ue,et=!!(Ae.bgStrip&&$t>0);if(ft[0]=Ae.isFull?1:0,ft[1]=Ae.bgStrip?Ae.bgStrip.yWg*4:0,ft[2]=Ae.bgStrip?Ae.bgStrip.z:0,ft[3]=0,e.queue.writeBuffer(ie,0,ft),x.halfPass0)for(const[Qe,rt]of[[Oe.lo,Oe.bgLo],[Oe.hi,Oe.bgHi]]){const ze=Ie.beginComputePass();ze.setBindGroup(0,B),re>0&&(ze.setPipeline(Qe.pipe),ze.dispatchWorkgroups(1,Y,re)),et&&(ze.setPipeline(rt.pipe),ze.dispatchWorkgroups(1,1,1)),ze.end(),Ge.push("conv0")}else{const Qe=Ie.beginComputePass();Qe.setBindGroup(0,B),re>0&&(Qe.setPipeline(Oe.main.pipe),Qe.dispatchWorkgroups(1,Y,re)),et&&(Qe.setPipeline(Oe.bg.pipe),Qe.dispatchWorkgroups(1,1,1)),Qe.end(),Ge.push("conv0")}qe==="calibrate"?(e.queue.submit([Ie.finish()]),Ie=e.createCommandEncoder()):qe==="paced"&&(_t+=De.convWork,Ie=await He.submitChunk(Ie,De.convWork,0,{forceUiYield:!0}))}else{const Y=bt,re=$e[_e],et=Ee[_e],{mainCount:Qe,extCount:rt,layerBaseSlot:ze}=Le,ut=Ae.mode==="rpure"&&!!Ae.bgStrip;let Xe=0;for(let Se=0;Se<8;Se++){if(Se>=2){const kt=Se-2,zt=Ae.isFull||Qe[kt]>0,Ye=!Ae.isFull&&Ae.mode==="bwd"&&rt[kt]>0;if(zt||Ye){const ot=Ie.beginComputePass();ot.setPipeline(we.pipe),zt&&(ot.setBindGroup(0,et,[(ze+8+kt)*W]),ot.dispatchWorkgroups(1,Ae.isFull?64:1,Ae.isFull?32:Qe[kt])),Ye&&(ot.setBindGroup(0,et,[(ze+14+kt)*W]),ot.dispatchWorkgroups(1,1,rt[kt])),ot.end(),Ge.push("flushStage")}}const Ce=Ae.isFull||Qe[Se]>0,yt=!Ae.isFull&&Ae.mode==="bwd"&&rt[Se]>0,Re=Se===0&&ut;if(Ce||yt||Re){const kt=[(ze+Se)*W],zt=Ae.isFull?64:1,Ye=Ae.isFull?32:Qe[Se];if(x.halfPassConv)for(const[ot,Ft,wt]of[[Y.lo,Y.extLo,Y.bgLo],[Y.hi,Y.extHi,Y.bgHi]]){const xt=Ie.beginComputePass();xt.setBindGroup(0,re,kt),Ce&&(xt.setPipeline(ot.pipe),xt.dispatchWorkgroups(1,zt,Ye)),yt&&(xt.setPipeline(Ft.pipe),xt.dispatchWorkgroups(1,1,rt[Se])),Re&&(xt.setPipeline(wt.pipe),xt.dispatchWorkgroups(1,1,1)),xt.end(),Ge.push("convHidden")}else{const ot=Ie.beginComputePass();ot.setBindGroup(0,re,kt),Ce&&(ot.setPipeline(Y.main.pipe),ot.dispatchWorkgroups(1,zt,Ye)),yt&&(ot.setPipeline(Y.ext.pipe),ot.dispatchWorkgroups(1,1,rt[Se])),Re&&(ot.setPipeline(Y.bg.pipe),ot.dispatchWorkgroups(1,1,1)),ot.end(),Ge.push("convHidden")}Xe+=(Ce?Ae.isFull?2048:Qe[Se]:0)+(yt?rt[Se]:0)}if(qe==="calibrate"&&(Xe>=512||Se===7&&Xe>0)){const kt=performance.now();e.queue.submit([Ie.finish()]),await e.queue.onSubmittedWorkDone();const zt=performance.now()-kt;if(Ie=e.createCommandEncoder(),_t+=Xe,Xe>=512){const Ye=zt/Xe,ot=Ye*Te;e.__v4WinCalibrated=!0,He.setMsPerStrip(Ye),!tt.isWindowsSharedIgpu&&ot<qo?(e.__v4WinFast=!0,qe="pipelined",console.log(`[WebGPU-V4-128M] Windows GPU calibration: estFullLayer=${ot.toFixed(1)}ms -> unthrottled pipelined mode`)):(e.__v4WinFast=!1,qe="paced",console.log(`[WebGPU-V4-128M] Windows GPU calibration: estFullLayer=${ot.toFixed(1)}ms -> TDR-safe 2-in-flight paced mode`),pt(_e))}Xe=0}else qe==="paced"&&Xe>0&&(Xe*He.getMsPerStrip()>=Oo*.75||Se===7)&&(_t+=Xe,Ie=await He.submitChunk(Ie,Xe,_e),Xe=0)}}const Fe=_e+1<f?n.w0Vec4s+_e*n.hiddenVec4PerLayer:0;it[0]=_e*n.metaStride,it[1]=Fe,it[2]=(_e+1)*n.metaStride,it[3]=_e+1<f?1:0,it[4]=_e===0?1:0,it[5]=Ae.isFull?1:0,it[6]=Ue,it[7]=St*8,Fn[8]=Ae.extWeight||0,it[9]=0,it[10]=0,it[11]=0,e.queue.writeBuffer(Q[_e],0,it);{const Y=Ie.beginComputePass();Y.setBindGroup(0,H[_e]),Y.setPipeline(ke.pipe),Y.dispatchWorkgroups(t.cs,1,1),Y.end(),Ge.push("momentsPrep")}if(_e+1<f){{const re=Ie.beginComputePass();re.setBindGroup(0,H[_e]),re.setPipeline(he.pipe),re.dispatchWorkgroups(1,1,1),re.end(),Ge.push("momentsPrep")}const Y=Ae.isFull?0:Mt;if((Y>0||$t>0)&&(Y>0&&vt.set(Ae.normStrips,0),$t>0&&vt.set(Ae.haloRows,Y),e.queue.writeBuffer(fe[_e],0,vt.subarray(0,Y+$t))),ft[0]=Ae.isFull?1:0,ft[1]=Ae.bgStrip?Ae.bgStrip.z*U+Ae.bgStrip.yWg*4:0,ft[2]=Y,ft[3]=$t,e.queue.writeBuffer(ce[_e],0,ft),Ae.isFull||Mt>0||$t>0){const re=Ie.beginComputePass();re.setBindGroup(0,Be[_e]),(Ae.isFull||Mt>0)&&(re.setPipeline(pe.pipe),re.dispatchWorkgroups(1,Ae.isFull?64:1,Ae.isFull?U:Mt)),$t>0&&(re.setPipeline(L.pipe),re.dispatchWorkgroups(1,Math.ceil($t/4),1)),re.end(),Ge.push("normHalo")}}qe==="pipelined"?(e.queue.submit([Ie.finish()]),Ie=e.createCommandEncoder()):qe==="calibrate"?(e.queue.submit([Ie.finish()]),await e.queue.onSubmittedWorkDone(),Ie=e.createCommandEncoder(),_t+=(_e===0?De.convWork:0)+De.normWork,_e===f-1&&!e.__v4WinCalibrated&&(e.__v4WinCalibrated=!0,e.__v4WinFast=!tt.isWindowsSharedIgpu)):(_t+=De.normWork,Ie=await He.submitChunk(Ie,De.normWork,_e))}return qe==="paced"&&await He.waitBeforeFinalSubmit(),Bt.__passCategories=Ge,ve.finishAndReadback({enc:Ie,schedule:Ze,passCategories:Ge,u4Tmp:ft,ioOpts:Ke,paced:qe==="paced",onProgress:Ne})}return ve.warmupIoPipelines(),Bt.dispose=({keepSharedWorkspace:nt=!1}={})=>{ve.dispose();for(const Ke of j)Ke.destroy();if(j.length=0,le.resetBytes(),k.pooled)nt?k.inUse=!1:jt.get(e)===k&&kn(e);else{for(const Ke of k.buffers)Ke.destroy();k.buffers.length=0}},Bt.gpuBytes=()=>k.bytes+le.getBytes(),Bt.__passCategories=[],Bt.__coneInfo=()=>({paddedVox:S,actMiB:c/1048576,mode:"LowMem128"}),Bt.__v4Plan=()=>a,Bt.kernels="v4-int8",Bt}async function Ya(e,t,n,r={}){return await Za(e,t,n,r)}async function Za(e,t,n,r={}){const o=t instanceof Uint8Array?t:new Uint8Array(t),s=r?.modelBinModel?va(o,r.modelBinModel):wa(o.buffer.slice(o.byteOffset,o.byteOffset+o.byteLength)),i=ya(s);r?.classifierBias&&i.classifier&&(i.classifier.bias=Float32Array.from(r.classifierBias));const a=Sa(r),l=r?.dilations||a?.dilations||(i.convs.length===25?[16,8,4,2,1,16,8,4,2,1,16,8,4,2,1,16,8,4,2,1,16,8,4,2,1]:i.convs.length===9?[1,2,4,8,16,8,4,2,1]:za),u=r?.activation||a?.activation||(i.affines.length||i.convs.length>=13?"gelu_tanh":"relu"),f=i.convs[0].outC,m=f>8?Math.ceil(f/8)*8:Math.ceil(f/4)*4,c=xa(i,{nx:U,ny:U,nz:U,cs:m,activation:u,dilations:l}),p=Ia(o,i,c,r),d=r?.outputType==="probability"?Pa(r,c.nclass):null,_=!!e.features?.has?.("shader-f16")&&!r?.disableF16,z=Ca(e,r),w=U*U*U,g=d?w*4:w,x=c.cs>=16,P=x?c.cs/2:c.cs,$=U*U*P*lt*4,y=U*U*P*mt*4,C=e.limits||{},S=Math.min(C.maxStorageBufferBindingSize??1/0,C.maxBufferSize??1/0),h=await ra(e,c,r,{actBytes:$,outBufBytes:g,hasF16:_,env:r?.__v4Env||null});if(e.__v4LastPlan=h,console.info(Ro(h,c)),h.layout==="LowMem128"&&c.cs>=8&&c.cs%4===0)return Xa(e,c,p,_,z,r,d,h);if($>S||g>S){const tt=Math.max($,g)>>>20;throw new Error(`meshnet_fast_v4: buffer (${tt} MiB) exceeds device limit (${S>>>20} MiB)`)}const A=h.chunkableStd,b=Va({cs:c.cs,chan:c.chan,nclass:c.nclass,clsK4:p.clsK4,dilations:c.dilations,activation:c.activation,norm:c.norm,hasF16:_,subgroupMode:z,splitHalves:x,probCfg:d,chunkableStd:A});console.log(`[WebGPU-V4] ${c.chan}ch(cs=${c.cs})/${c.nclass}cls (${c.dilations.length} convs, ${c.activation}, norm=${c.norm}${d?", prob=3":""}) | ${_?"f16+sterbenz":"f32"} | ${No(z)} | ZYCX-pad80 | maxBuf=${(Math.max($,g)/1048576).toFixed(1)} MiB`);const M=GPUBufferUsage.STORAGE,k=GPUBufferUsage.COPY_DST,I=GPUBufferUsage.COPY_SRC,q=U*U*tn,J=q*(_?2:4),E=Bn*c.cs*16,Z=Wo*c.cs*16,me=(c.cs*2+4)*16,be=_?Math.ceil(b.totalWEffVec4s/2)*16:b.totalWEffVec4s*16,G=`std|${c.cs}|${x?1:0}|${_?1:0}|${g}`,T=Yo(e,G,()=>{const tt=[],Ne=Dn(e,tt),st=Ne.alloc,_t={inpBuf:st(J,M|k|I),act8_0:st($,M|k|I),act8_1:st(x?$:16,M|k|I),y8_0:st(y,M|k|I),y8_1:st(x?y:16,M|k|I),momMainBuf:st(E,M),momExtBuf:st(Z,M),momStatsBuf:st(me,M),labels8Buf:st(g,M|k|I),readbackBuf:st(g,GPUBufferUsage.MAP_READ|k)};return{buffers:tt,named:_t,bytes:Ne.getBytes()}}),{inpBuf:ee,act8_0:j,act8_1:le,y8_0:te,y8_1:D,momMainBuf:se,momExtBuf:ae,momStatsBuf:ye,labels8Buf:X,readbackBuf:oe}=T.named,V=[],fe=Dn(e,V),ie=fe.alloc,ge=ie(_?p.wF16.byteLength:p.wF32.byteLength,M|k),Q=ie(p.qmetaF32.byteLength,M|k),ce=ie(be,b.useUniformWeff?M|GPUBufferUsage.UNIFORM:M),W=c.dilations.length,O=c.norm==="gn"&&!r?.disableConeSkip,v=Array.from({length:W},()=>ie(O?Te*4:16,M|k)),F=Array.from({length:W-1},()=>ie(O?(Te+U*U)*4:16,M|k)),N=ie(O?Te*4:16,M|k),ue=ie(16,GPUBufferUsage.UNIFORM|k),de=ie(16,GPUBufferUsage.UNIFORM|k),Pe=Array.from({length:W},()=>ie(48,GPUBufferUsage.UNIFORM|k)),ke=Array.from({length:W-1},()=>ie(16,GPUBufferUsage.UNIFORM|k)),he=Math.max(256,C.minUniformBufferOffsetAlignment||256),we=he>>>2,pe=b.chunkableStd?Math.max(1,(W-1)*sr):0,L=b.chunkableStd?ie(pe*he,GPUBufferUsage.UNIFORM|k):null,We=b.chunkableStd?new Uint32Array(pe*we):null,Oe=b.chunkableStd?null:Array.from({length:W},()=>ie(16,GPUBufferUsage.UNIFORM|k));e.queue.writeBuffer(ge,0,_?p.wF16:p.wF32),e.queue.writeBuffer(Q,0,p.qmetaF32);let bt;try{bt=await Na(e,c,p,_,z,x,d,b)}catch(tt){for(const Ne of V)Ne.destroy();if(V.length=0,T.pooled)jt.get(e)===T&&kn(e);else{for(const Ne of T.buffers)Ne.destroy();T.buffers.length=0}throw tt}const{pInit:dt,pMomFin:Yt,pPrepW:Kt,pNorm:B,pNormHalo:R,pCls:K,pConv0:ne,pConv:ve}=bt,H=(tt,Ne)=>e.createBindGroup({layout:tt,entries:Ne.map((st,_t)=>({binding:_t,resource:st&&st.buffer?st:{buffer:st}}))}),Be=H(dt.bgl,[j,le]);{const tt=e.createCommandEncoder(),Ne=tt.beginComputePass();Ne.setPipeline(dt.pipe),Ne.setBindGroup(0,Be),Ne.dispatchWorkgroups(1,U,U),Ne.end(),e.queue.submit([tt.finish()])}const xe=(b.halfPass0?ne.lo:ne.main).bgl,Ee=H(xe,[ee,te,D,ge,Q,se,ae,v[0],ue]),Me=H(K.bgl,[te,D,ge,Q,se,ye,X,N,de]),$e=!!(d&&x&&$>=g&&y>=g),je=$e?ie(16,GPUBufferUsage.UNIFORM|k):null,ct=$e?H(K.bgl,[te,D,ge,Q,se,ye,X,N,je]):null,gt=Jo({device:e,hasF16:_,nvox:w,outBufBytes:g,inpBuf:ee,act8_0:j,labels8Buf:X,readbackBuf:oe,pInit:dt,bgInit:Be,pCls:K,bgCls:Me,clsUbo:de,packed:p,modelEntry:r,probCfg:d,canGpuProb:$e,probSlots:$e?{clsUbo1:je,bgCls1:ct,pass0HoldBuf:j,y0:te,y1:D,b:le,sup:j}:null,ownedBuffers:V,mkBuf:ie}),vt=Pe.map((tt,Ne)=>H(Yt.bgl,[ge,Q,se,ae,ye,ce,v[Ne],tt])),it=ke.map((tt,Ne)=>H(B.bgl,[j,le,te,D,se,ae,ye,F[Ne],tt])),Fn=b.chunkableStd?{buffer:L,offset:0,size:32}:null,ft=b.halfPassConv?ve.lo:ve.main,dn=Array.from({length:W},(tt,Ne)=>Ne===0?null:H(ft.bgl,[j,le,te,D,se,ae,ce,v[Ne],b.chunkableStd?Fn:Oe[Ne]])),Bt=(tt,Ne,st,_t,Nt,pt)=>{const He=tt*we;We[He]=Ne?1:0,We[He+1]=st,We[He+2]=_t,We[He+3]=0,We[He+4]=Nt,We[He+5]=pt,We[He+6]=0,We[He+7]=0},nt=(tt,Ne,st,_t,Nt,pt,He,Ie)=>{if(!(pt<=0&&He<=0))if(b.halfPassConv){{const _e=tt.beginComputePass();_t?_e.setBindGroup(0,st,_t):_e.setBindGroup(0,st),pt>0&&(_e.setPipeline(Ne.lo.pipe),_e.dispatchWorkgroups(1,Nt,pt)),He>0&&(_e.setPipeline(Ne.extLo.pipe),_e.dispatchWorkgroups(1,1,He)),_e.end(),Ie.push("convHidden")}{const _e=tt.beginComputePass();_t?_e.setBindGroup(0,st,_t):_e.setBindGroup(0,st),pt>0&&(_e.setPipeline(Ne.hi.pipe),_e.dispatchWorkgroups(1,Nt,pt)),He>0&&(_e.setPipeline(Ne.extHi.pipe),_e.dispatchWorkgroups(1,1,He)),_e.end(),Ie.push("convHidden")}}else{const _e=tt.beginComputePass();_t?_e.setBindGroup(0,st,_t):_e.setBindGroup(0,st),pt>0&&(_e.setPipeline(Ne.main.pipe),_e.dispatchWorkgroups(1,Nt,pt)),He>0&&(_e.setPipeline(Ne.ext.pipe),_e.dispatchWorkgroups(1,1,He)),_e.end(),Ie.push("convHidden")}},Ke=_?new Uint16Array(q):new Float32Array(q),ht=new Uint8Array(U*U),At=new Uint32Array(Te),Ot=new Uint32Array(Te+U*U),Ze=new Uint32Array(12),Zt=new Float32Array(Ze.buffer),qe=new Uint32Array(4);async function Ge(tt,Ne){if(tt.length!==w)throw new Error(`meshnet_fast_v4 expected ${w} voxels, got ${tt.length}`);const st=c.norm==="gn"&&!r?.disableConeSkip,_t=await gt.prepareInput({volume:tt,ioOpts:Ne,useCone:st,padInputHost:Ke,headRowHost:ht,hasF16Flag:_}),Nt=_t.info,pt=jo(ht,Nt,c.dilations,st);let He=h.execMode==="calibrate"&&e.__v4WinCalibrated?e.__v4WinFast?"pipelined":"paced":h.execMode;const Ie=[];if(He==="single"&&!b.chunkableStd){const Fe=e.createCommandEncoder();_t.runPrePasses(Fe,Ie),pt.clsSkipped&&(Fe.clearBuffer(X,0,g),pt.clsStrips.length>0&&e.queue.writeBuffer(N,0,pt.clsStrips));for(let Y=0;Y<W;Y++){const re=pt.layers[Y],et=re.isFull?Te:re.mainStrips.length,Qe=re.isFull||!re.extStrips?0:re.extStrips.length,rt=re.nMomExt||0,ze=re.haloRows?re.haloRows.length:0,ut=re.isFull?Te:re.normStrips?re.normStrips.length:0;if(!re.isFull&&(et>0||Qe>0)&&(et>0&&At.set(re.mainStrips,0),Qe>0&&At.set(re.extStrips,et),e.queue.writeBuffer(v[Y],0,At.subarray(0,et+Qe))),Y===0){const Se=re.isFull?64:1,Ce=re.isFull?U:et,yt=!!(re.bgStrip&&ze>0);if(qe[0]=re.isFull?1:0,qe[1]=re.bgStrip?re.bgStrip.yWg*4:0,qe[2]=re.bgStrip?re.bgStrip.z:0,qe[3]=0,e.queue.writeBuffer(ue,0,qe),b.halfPass0){{const Re=Fe.beginComputePass();Re.setBindGroup(0,Ee),Ce>0&&(Re.setPipeline(ne.lo.pipe),Re.dispatchWorkgroups(1,Se,Ce)),yt&&(Re.setPipeline(ne.bgLo.pipe),Re.dispatchWorkgroups(1,1,1)),Re.end(),Ie.push("conv0")}{const Re=Fe.beginComputePass();Re.setBindGroup(0,Ee),Ce>0&&(Re.setPipeline(ne.hi.pipe),Re.dispatchWorkgroups(1,Se,Ce)),yt&&(Re.setPipeline(ne.bgHi.pipe),Re.dispatchWorkgroups(1,1,1)),Re.end(),Ie.push("conv0")}}else{const Re=Fe.beginComputePass();Re.setBindGroup(0,Ee),Ce>0&&(Re.setPipeline(ne.main.pipe),Re.dispatchWorkgroups(1,Se,Ce)),yt&&(Re.setPipeline(ne.bg.pipe),Re.dispatchWorkgroups(1,1,1)),Re.end(),Ie.push("conv0")}}else{const Se=c.dilations[Y],Ce=dn[Y],yt=re.isFull?64:1,Re=re.isFull?U:et,kt=re.mode==="rpure"&&ze>0||re.mode==="bwd"&&Y+1<W;qe[0]=re.isFull?1:0,qe[1]=et,qe[2]=vr(Se,kt),qe[3]=0,e.queue.writeBuffer(Oe[Y],0,qe),nt(Fe,ve,Ce,null,yt,Re,Qe,Ie)}const Xe=Y+1<W?p.w0Vec4s+Y*p.hiddenVec4PerLayer:0;Ze[0]=Y*p.metaStride,Ze[1]=Xe,Ze[2]=(Y+1)*p.metaStride,Ze[3]=Y+1<W?1:0,Ze[4]=Y===0?1:0,Ze[5]=re.isFull?1:0,Ze[6]=et,Ze[7]=rt*8,Zt[8]=re.extWeight||0,Ze[9]=0,Ze[10]=0,Ze[11]=0,e.queue.writeBuffer(Pe[Y],0,Ze);{const Se=Fe.beginComputePass();Se.setBindGroup(0,vt[Y]),Se.setPipeline(Yt.pipe),Se.dispatchWorkgroups(c.cs,1,1),Se.end(),Ie.push("momentsPrep")}if(Y+1<W){{const Ce=Fe.beginComputePass();Ce.setBindGroup(0,vt[Y]),Ce.setPipeline(Kt.pipe),Ce.dispatchWorkgroups(1,1,1),Ce.end(),Ie.push("momentsPrep")}const Se=re.isFull?0:ut;if((Se>0||ze>0)&&(Se>0&&Ot.set(re.normStrips,0),ze>0&&Ot.set(re.haloRows,Se),e.queue.writeBuffer(F[Y],0,Ot.subarray(0,Se+ze))),qe[0]=re.isFull?1:0,qe[1]=re.bgStrip?re.bgStrip.z*U+re.bgStrip.yWg*4:0,qe[2]=Se,qe[3]=ze,e.queue.writeBuffer(ke[Y],0,qe),re.isFull||ut>0||ze>0){const Ce=Fe.beginComputePass();Ce.setBindGroup(0,it[Y]),(re.isFull||ut>0)&&(Ce.setPipeline(B.pipe),Ce.dispatchWorkgroups(1,re.isFull?64:1,re.isFull?U:ut)),ze>0&&(Ce.setPipeline(R.pipe),Ce.dispatchWorkgroups(1,Math.ceil(ze/4),1)),Ce.end(),Ie.push("normHalo")}}}return Ge.__passCategories=Ie,gt.finishAndReadback({enc:Fe,schedule:pt,passCategories:Ie,u4Tmp:qe,ioOpts:Ne})}const _e=En(e),Le=typeof Ne?.onProgress=="function"?Ne.onProgress:null,Ae=Vo(pt,W);let Ue=0,$t=-1;const St=Fe=>{if(!Le)return;const Y=Math.min(.99,Ue/Ae);let re="";Fe>=0&&Fe!==$t&&($t=Fe,re=`Layer ${Fe+1}/${W}`),Le(Y,re)},Mt=Go(e,h.msPerStrip||e.__v4MsPerStrip||.12,St);let De=e.createCommandEncoder();_t.runPrePasses(De,Ie),pt.clsSkipped&&(De.clearBuffer(X,0,g),pt.clsStrips.length>0&&e.queue.writeBuffer(N,0,pt.clsStrips));for(let Fe=0;Fe<W;Fe++){const Y=pt.layers[Fe],re=Y.isFull?Te:Y.mainStrips.length,et=Y.isFull||!Y.extStrips?0:Y.extStrips.length,Qe=Y.nMomExt||0,rt=Y.haloRows?Y.haloRows.length:0,ze=Y.isFull?Te:Y.normStrips?Y.normStrips.length:0,ut=Fr(Y,Fe,W);if(!Y.isFull&&(re>0||et>0)&&(re>0&&At.set(Y.mainStrips,0),et>0&&At.set(Y.extStrips,re),e.queue.writeBuffer(v[Fe],0,At.subarray(0,re+et))),Fe===0){const Se=Y.isFull?64:1,Ce=Y.isFull?U:re,yt=!!(Y.bgStrip&&rt>0);if(qe[0]=Y.isFull?1:0,qe[1]=Y.bgStrip?Y.bgStrip.yWg*4:0,qe[2]=Y.bgStrip?Y.bgStrip.z:0,qe[3]=0,e.queue.writeBuffer(ue,0,qe),b.halfPass0){{const Re=De.beginComputePass();Re.setBindGroup(0,Ee),Ce>0&&(Re.setPipeline(ne.lo.pipe),Re.dispatchWorkgroups(1,Se,Ce)),yt&&(Re.setPipeline(ne.bgLo.pipe),Re.dispatchWorkgroups(1,1,1)),Re.end(),Ie.push("conv0")}{const Re=De.beginComputePass();Re.setBindGroup(0,Ee),Ce>0&&(Re.setPipeline(ne.hi.pipe),Re.dispatchWorkgroups(1,Se,Ce)),yt&&(Re.setPipeline(ne.bgHi.pipe),Re.dispatchWorkgroups(1,1,1)),Re.end(),Ie.push("conv0")}}else{const Re=De.beginComputePass();Re.setBindGroup(0,Ee),Ce>0&&(Re.setPipeline(ne.main.pipe),Re.dispatchWorkgroups(1,Se,Ce)),yt&&(Re.setPipeline(ne.bg.pipe),Re.dispatchWorkgroups(1,1,1)),Re.end(),Ie.push("conv0")}He==="calibrate"?(e.queue.submit([De.finish()]),De=e.createCommandEncoder()):He==="paced"&&(Ue+=ut.convWork,De=await Mt.submitChunk(De,ut.convWork,0,{forceUiYield:!0}))}else{const Se=c.dilations[Fe],Ce=dn[Fe],yt=Y.isFull?64:1,Re=Y.isFull?U:re,kt=Y.mode==="rpure"&&rt>0||Y.mode==="bwd"&&Fe+1<W,zt=vr(Se,kt);if(!b.chunkableStd)qe[0]=Y.isFull?1:0,qe[1]=re,qe[2]=zt,qe[3]=0,e.queue.writeBuffer(Oe[Fe],0,qe),nt(De,ve,Ce,null,yt,Re,et,Ie);else if(He==="pipelined"||He==="single"){const Ye=(Fe-1)*sr;Bt(Ye,Y.isFull,re,zt,0,0),e.queue.writeBuffer(L,Ye*he,We.subarray(Ye*we,(Ye+1)*we)),nt(De,ve,Ce,[Ye*he],yt,Re,et,Ie)}else{const Ye=(Fe-1)*sr,ot=He==="calibrate"?1024:Math.max(256,Math.min(4096,Math.round(Oo/Math.max(.005,Mt.getMsPerStrip())))),Ft=[];let wt=0;if(Y.isFull){const Dt=Math.max(4,Math.min(64,Math.round(ot/64)));for(let Lt=0;Lt<U;Lt+=Dt){const Ct=Math.min(Dt,U-Lt),Gt=Ye+wt++;Bt(Gt,!0,re,zt,Lt,0),Ft.push({slotIdx:Gt,mainY:64,mainCountZ:Ct,extCountZ:0,strips:Ct*64})}}else{const Dt=Math.max(256,ot);for(let Ct=0;Ct<re;Ct+=Dt){const Gt=Math.min(Dt,re-Ct),an=Ye+wt++;Bt(an,!1,re,zt,Ct,0),Ft.push({slotIdx:an,mainY:1,mainCountZ:Gt,extCountZ:0,strips:Gt})}const Lt=Math.max(256,ot);for(let Ct=0;Ct<et;Ct+=Lt){const Gt=Math.min(Lt,et-Ct),an=Ye+wt++;Bt(an,!1,re,zt,0,Ct),Ft.push({slotIdx:an,mainY:1,mainCountZ:0,extCountZ:Gt,strips:Gt})}}wt>0&&e.queue.writeBuffer(L,Ye*he,We.subarray(Ye*we,(Ye+wt)*we));let xt=0;for(let Dt=0;Dt<Ft.length;Dt++){const Lt=Ft[Dt];if(nt(De,ve,Ce,[Lt.slotIdx*he],Lt.mainY,Lt.mainCountZ,Lt.extCountZ,Ie),He==="pipelined")continue;xt+=Lt.strips;const Ct=Dt===Ft.length-1;if(He==="calibrate"&&(xt>=512||Ct&&xt>0)){const Gt=performance.now();e.queue.submit([De.finish()]),await e.queue.onSubmittedWorkDone();const an=performance.now()-Gt;if(De=e.createCommandEncoder(),Ue+=xt,xt>=512){const Wr=an/xt,Vn=Wr*Te;e.__v4WinCalibrated=!0,Mt.setMsPerStrip(Wr),!_e.isWindowsSharedIgpu&&Vn<qo?(e.__v4WinFast=!0,He="pipelined",console.log(`[WebGPU-V4] Windows GPU calibration: estFullLayer=${Vn.toFixed(1)}ms -> unthrottled pipelined mode`)):(e.__v4WinFast=!1,He="paced",console.log(`[WebGPU-V4] Windows GPU calibration: estFullLayer=${Vn.toFixed(1)}ms -> TDR-safe 2-in-flight paced mode`),St(Fe))}xt=0}else He==="paced"&&(Ue+=xt,De=await Mt.submitChunk(De,xt,Fe),xt=0)}}}const Xe=Fe+1<W?p.w0Vec4s+Fe*p.hiddenVec4PerLayer:0;Ze[0]=Fe*p.metaStride,Ze[1]=Xe,Ze[2]=(Fe+1)*p.metaStride,Ze[3]=Fe+1<W?1:0,Ze[4]=Fe===0?1:0,Ze[5]=Y.isFull?1:0,Ze[6]=re,Ze[7]=Qe*8,Zt[8]=Y.extWeight||0,Ze[9]=0,Ze[10]=0,Ze[11]=0,e.queue.writeBuffer(Pe[Fe],0,Ze);{const Se=De.beginComputePass();Se.setBindGroup(0,vt[Fe]),Se.setPipeline(Yt.pipe),Se.dispatchWorkgroups(c.cs,1,1),Se.end(),Ie.push("momentsPrep")}if(Fe+1<W){{const Ce=De.beginComputePass();Ce.setBindGroup(0,vt[Fe]),Ce.setPipeline(Kt.pipe),Ce.dispatchWorkgroups(1,1,1),Ce.end(),Ie.push("momentsPrep")}const Se=Y.isFull?0:ze;if((Se>0||rt>0)&&(Se>0&&Ot.set(Y.normStrips,0),rt>0&&Ot.set(Y.haloRows,Se),e.queue.writeBuffer(F[Fe],0,Ot.subarray(0,Se+rt))),qe[0]=Y.isFull?1:0,qe[1]=Y.bgStrip?Y.bgStrip.z*U+Y.bgStrip.yWg*4:0,qe[2]=Se,qe[3]=rt,e.queue.writeBuffer(ke[Fe],0,qe),Y.isFull||ze>0||rt>0){const Ce=De.beginComputePass();Ce.setBindGroup(0,it[Fe]),(Y.isFull||ze>0)&&(Ce.setPipeline(B.pipe),Ce.dispatchWorkgroups(1,Y.isFull?64:1,Y.isFull?U:ze)),rt>0&&(Ce.setPipeline(R.pipe),Ce.dispatchWorkgroups(1,Math.ceil(rt/4),1)),Ce.end(),Ie.push("normHalo")}}if(He==="pipelined")e.queue.submit([De.finish()]),De=e.createCommandEncoder();else if(He==="calibrate")e.queue.submit([De.finish()]),await e.queue.onSubmittedWorkDone(),De=e.createCommandEncoder(),Ue+=(Fe===0||!b.chunkableStd?ut.convWork:0)+ut.normWork,Fe===W-1&&!e.__v4WinCalibrated&&(e.__v4WinCalibrated=!0,e.__v4WinFast=!_e.isWindowsSharedIgpu);else if(He!=="single"){const Se=(!b.chunkableStd&&Fe>0?ut.convWork:0)+ut.normWork;Ue+=Se,De=await Mt.submitChunk(De,Se,Fe)}}return He==="paced"&&await Mt.waitBeforeFinalSubmit(),Ge.__passCategories=Ie,gt.finishAndReadback({enc:De,schedule:pt,passCategories:Ie,u4Tmp:qe,ioOpts:Ne,paced:He==="paced",onProgress:Le})}return gt.warmupIoPipelines(),Ge.dispose=({keepSharedWorkspace:tt=!1}={})=>{gt.dispose();for(const Ne of V)Ne.destroy();if(V.length=0,fe.resetBytes(),T.pooled)tt?T.inUse=!1:jt.get(e)===T&&kn(e);else{for(const Ne of T.buffers)Ne.destroy();T.buffers.length=0}},Ge.gpuBytes=()=>T.bytes+fe.getBytes(),Ge.__passCategories=[],Ge.__coneInfo=()=>({paddedVox:q,actMiB:$/1048576}),Ge.__v4Plan=()=>h,Ge.kernels="v4-int8",Ge}var Pt=256,rn=.1,fn=Pt*Pt*Pt;function ns(e,t){const n=new Array(16);for(let r=0;r<4;r++){const o=r*4;for(let s=0;s<4;s++)n[o+s]=e[o+0]*t[0+s]+e[o+1]*t[4+s]+e[o+2]*t[8+s]+e[o+3]*t[12+s]}return n}function rs(e){const t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],i=e[5],a=e[6],l=e[7],u=e[8],f=e[9],m=e[10],c=e[11],p=i*m-a*f,d=-(s*m-a*u),_=s*f-i*u,z=t*p+n*d+r*_;if(!Number.isFinite(z)||z===0)return null;const w=1/z,g=p*w,x=-(n*m-r*f)*w,P=(n*a-r*i)*w,$=d*w,y=(t*m-r*u)*w,C=-(t*a-r*s)*w,S=_*w,h=-(t*f-n*u)*w,A=(t*i-n*s)*w;return[g,x,P,-(g*o+x*l+P*c),$,y,C,-($*o+y*l+C*c),S,h,A,-(S*o+h*l+A*c),0,0,0,1]}function Rr(e){const t=e.sformCode>0?e.stoXyz:e.qtoXyz;if(!aa(t))throw new Error("brainchomp: the input has no usable spatial transform");return t}function ja(e){const t=e.dims[1],n=e.dims[2],r=e.dims[3];if(t!==Pt||n!==Pt||r!==Pt)return!1;const o=Math.abs(e.pixDims[1]),s=Math.abs(e.pixDims[2]),i=Math.abs(e.pixDims[3]);if(Math.abs(o-rn)>=1e-4||Math.abs(s-rn)>=1e-4||Math.abs(i-rn)>=1e-4)return!1;let a;try{a=Rr(e)}catch{return!1}const l=[-1,-1,1];for(let u=0;u<3;u++){let f=0;for(let m=1;m<3;m++)Math.abs(a[m*4+u])>Math.abs(a[f*4+u])&&(f=m);if(f!==u||(a[f*4+u]>0?1:-1)!==l[u])return!1}return!0}function Ka(e,t){const n=e.length;let r=e[0],o=e[0],s=0;for(let c=0;c<n;c++){const p=e[c];p<r&&(r=p),p>o&&(o=p),Math.abs(p)>=1e-15&&s++}if(t)return{srcMin:r,scale:1};const i=(o-r)/1e3;if(!(i>0))return{srcMin:r,scale:1};const a=new Float64Array(1e3);for(let c=0;c<n;c++){let p=Math.floor((e[c]-r)/i);p>999?p=999:p<0&&(p=0),a[p]++}for(let c=1;c<1e3;c++)a[c]+=a[c-1];const l=n-Math.floor((1-.999)*s);let u=0;for(;u<999&&a[u+1]<l;)u++;const f=u*i+r,m=f!==r?255/(f-r):1;return{srcMin:r,scale:m}}function Qa(e,t,n){const r=e.length,o=new Uint8Array(r);for(let s=0;s<r;s++){let i=n*(e[s]-t);i>0?i>255&&(i=255):i=0,o[s]=Math.floor(i)}return o}function Ja(e){const t=e.length,n=new Uint8Array(t);for(let r=0;r<t;r++){const o=e[r];o>0?o>=255?n[r]=255:n[r]=Math.round(o):n[r]=0}return n}function ei(e,t,n,r){const o=(e-1)/2,s=(t-1)/2,i=(n-1)/2,a=r[0]*o+r[1]*s+r[2]*i+r[3],l=r[4]*o+r[5]*s+r[6]*i+r[7],u=r[8]*o+r[9]*s+r[10]*i+r[11],f=rn,m=(Pt-1)/2;return[-f,0,0,a+f*m,0,-f,0,l+f*m,0,0,f,u-f*m,0,0,0,1]}function ti(e){const{header:t,data:n}=e,r=t.dims[1],o=t.dims[2],s=t.dims[3],i=t.datatypeCode===Je.UINT8,a=Rr(t),l=ja(t),u=(!Number.isFinite(t.sclSlope)||t.sclSlope===0||t.sclSlope===1)&&(!Number.isFinite(t.sclInter)||t.sclInter===0);if(l&&i&&u&&n instanceof Uint8Array){let G=255;for(let T=0;T<n.length&&!(n[T]<G&&(G=n[T],G===0));T++);if(G===0)return{img:n,affine:a.slice(),onGrid:!0}}const f=ma(n,t.sclSlope,t.sclInter),{srcMin:m,scale:c}=Ka(f,i);if(l)return{img:i&&m===0?Ja(f):Qa(f,m,c),affine:a.slice(),onGrid:!0};const p=ei(r,o,s,a),d=rs(a);if(!d)throw new Error("brainchomp: the input has a singular spatial transform");const _=ns(d,p),z=_[0],w=_[1],g=_[2],x=_[3],P=_[4],$=_[5],y=_[6],C=_[7],S=_[8],h=_[9],A=_[10],b=_[11],M=r*o,k=r-.5,I=o-.5,q=s-.5,J=r-1,E=o-1,Z=s-1,me=new Uint8Array(fn);let be=0;for(let G=0;G<Pt;G++){const T=g*G+x,ee=y*G+C,j=A*G+b;for(let le=0;le<Pt;le++){const te=w*le+T,D=$*le+ee,se=h*le+j;for(let ae=0;ae<Pt;ae++,be++){const ye=z*ae+te,X=P*ae+D,oe=S*ae+se;let V=0;if(ye>=-.5&&ye<=k&&X>=-.5&&X<=I&&oe>=-.5&&oe<=q){const ie=ye<0?0:ye>J?J:ye,ge=X<0?0:X>E?E:X,Q=oe<0?0:oe>Z?Z:oe,ce=Math.floor(ie),W=Math.floor(ge),O=Math.floor(Q),v=ce+1<r?ce+1:J,F=W+1<o?W+1:E,N=O+1<s?O+1:Z,ue=ie-ce,de=ge-W,Pe=Q-O,ke=1-ue,he=1-de,we=O*M,pe=N*M,L=W*r,We=F*r,Oe=f[ce+L+we]*ke+f[v+L+we]*ue,bt=f[ce+We+we]*ke+f[v+We+we]*ue,dt=f[ce+L+pe]*ke+f[v+L+pe]*ue,Yt=f[ce+We+pe]*ke+f[v+We+pe]*ue;V=Math.fround((Oe*he+bt*de)*(1-Pe)+(dt*he+Yt*de)*Pe)}let fe=c*(V-m);fe>0?fe>255&&(fe=255):fe=0,me[be]=Math.floor(fe)}}}return{img:me,affine:p,onGrid:!1}}function ni(e,t,n){const r=Rr(n),o=rs(t);if(!o)throw new Error("brainchomp: cannot invert conformed grid affine");const s=ns(o,r),i=s[0],a=s[1],l=s[2],u=s[3],f=s[4],m=s[5],c=s[6],p=s[7],d=s[8],_=s[9],z=s[10],w=s[11],g=new Float64Array(8),x=new Float64Array(8),P=new Float64Array(8);let $=0;for(let b=-1;b<=1;b+=2)for(let M=-1;M<=1;M+=2)for(let k=-1;k<=1;k+=2,$++)g[$]=.25*(b*i+M*a+k*l)+.5,x[$]=.25*(b*f+M*m+k*c)+.5,P[$]=.25*(b*d+M*_+k*z)+.5;const y=n.dims[1],C=n.dims[2],S=n.dims[3],h=new Uint8Array(y*C*S);let A=0;for(let b=0;b<S;b++){const M=l*b+u,k=c*b+p,I=z*b+w;for(let q=0;q<C;q++){const J=a*q+M,E=m*q+k,Z=_*q+I;for(let me=0;me<y;me++,A++){const be=i*me+J,G=f*me+E,T=d*me+Z;let ee=0;for(let j=0;j<8;j++){const le=Math.floor(be+g[j]),te=Math.floor(G+x[j]),D=Math.floor(T+P[j]);le>=0&&le<Pt&&te>=0&&te<Pt&&D>=0&&D<Pt&&e[le+(te+(D<<8)<<8)]>0&&ee++}h[A]=ee>=4?1:0}}}return h}function os(e,t){const n=t[0]*t[1]*t[2],r=new da,[o,s]=r.bwlabel(e,t,6,!0,!1);if(o===0)return e.fill(0),0;const i=new Uint32Array(o+1);for(let u=0;u<n;u++){const f=s[u];f>0&&i[f]++}let a=1,l=0;for(let u=1;u<=o;u++)i[u]>l&&(l=i[u],a=u);for(let u=0;u<n;u++)e[u]=s[u]===a?1:0;return o}function ir(e,t,n,r,o,s,i){const a=n[r],l=r===0?1:r===1?n[0]:n[0]*n[1],f=n[0]*n[1]*n[2]/(a*l),m=o+1,c=s?m:0;for(let p=0;p<f;p++){const d=p*a*l;for(let _=0;_<a;_++){const z=d+_*l,w=z-l;for(let g=0;g<l;g++)if(e[z+g]){const x=_>0?t[w+g]:c;t[z+g]=x+1<m?x+1:m}else t[z+g]=0}i.fill(c,0,l);for(let _=a-1;_>=0;_--){const z=d+_*l;for(let w=0;w<l;w++){let g=0;if(e[z+w]){const x=i[w]+1;g=x<m?x:m}i[w]=g,t[z+w]=t[z+w]===m&&g===m?1:0}}}}function so(e,t,n,r,o,s){ir(e,t,n,0,r,o,s),ir(t,e,n,1,r,o,s),ir(e,t,n,2,r,o,s),e.set(t)}function ri(e,t,n){if(n<=0)return;if(n>253)throw new Error(`brainchomp: mask opening radius ${n} is too large`);const r=t[0]*t[1]*t[2],o=new Uint8Array(r),s=new Uint8Array(r),i=new Uint8Array(t[0]*t[1]);for(let l=0;l<r;l++)o[l]=e[l]>0?1:0;if(so(o,s,t,n,!1,i),os(o,t)>0){for(let l=0;l<r;l++)o[l]=o[l]>0?0:1;so(o,s,t,n,!0,i);for(let l=0;l<r;l++)o[l]&&(e[l]=0)}}function oi(e,t){const n=t[0],r=t[1],o=t[2],s=n*r;let i=n,a=r,l=o,u=-1,f=-1,m=-1,c=0;for(let y=0;y<o;y++)for(let C=0;C<r;C++)for(let S=0;S<n;S++,c++)e[c]!==0&&(S<i&&(i=S),S>u&&(u=S),C<a&&(a=C),C>f&&(f=C),y<l&&(l=y),y>m&&(m=y));if(i>u)return 0;i>0&&i--,a>0&&a--,l>0&&l--,u+1<n&&u++,f+1<r&&f++,m+1<o&&m++;const p=u-i+1,d=f-a+1,_=m-l+1,z=p*d,w=z*_,g=new Uint8Array(w),x=new Int32Array(w);let P=0;for(let y=0;y<_;y++){const C=(l+y)*s,S=y===0||y===_-1;for(let h=0;h<d;h++){const A=y*z+h*p,b=C+(a+h)*n+i,M=S||h===0||h===d-1,k=M?1:p-1;for(let I=0;I<p;I+=I+1===p?1:k){const q=A+I;if(!g[q]&&e[b+I]===0&&(g[q]=1,x[P++]=q),!M&&p===1)break}}}for(let y=0;y<P;y++){const C=x[y],S=Math.floor(C/z),h=C-S*z,A=Math.floor(h/p),b=h-A*p,M=(l+S)*s+(a+A)*n+(i+b);if(b>0){const k=C-1;!g[k]&&e[M-1]===0&&(g[k]=1,x[P++]=k)}if(b+1<p){const k=C+1;!g[k]&&e[M+1]===0&&(g[k]=1,x[P++]=k)}if(A>0){const k=C-p;!g[k]&&e[M-n]===0&&(g[k]=1,x[P++]=k)}if(A+1<d){const k=C+p;!g[k]&&e[M+n]===0&&(g[k]=1,x[P++]=k)}if(S>0){const k=C-z;!g[k]&&e[M-s]===0&&(g[k]=1,x[P++]=k)}if(S+1<_){const k=C+z;!g[k]&&e[M+s]===0&&(g[k]=1,x[P++]=k)}}let $=0;for(let y=0;y<_;y++){const C=(l+y)*s,S=y*z;for(let h=0;h<d;h++){const A=C+(a+h)*n+i,b=S+h*p;for(let M=0;M<p;M++)!g[b+M]&&e[A+M]===0&&(e[A+M]=1,$++)}}return $}var Tn=[Pt,Pt,Pt],Wn=13,si=12e4,ai=12e4,ii=Math.max(1e5,Math.floor(fn/100)),ao=new Map,lr=new Map,pn=null;async function io(){if(pn&&!pn.__isLost)return pn;pn=null;const e=await $o();return pn=e,e}function li(e){if(e){try{kn(e)}catch{}if(!e.__isLost)try{e.destroy()}catch{}pn===e&&(pn=null)}}async function ci(e,t,n){const r=Mr("./rodent.bin",e),o=ao.get(r);if(o)return o;let s=lr.get(r);s||(s=(async()=>{const a=await fetch(r);if(!a.ok)throw new Error(`HTTP ${a.status}: ${a.statusText}`);const l=new Uint8Array(await a.arrayBuffer());return ao.set(r,l),l})().finally(()=>{lr.delete(r)}),lr.set(r,s));let i;try{return await Promise.race([s,new Promise((a,l)=>{i=setTimeout(()=>{l(new Ve("initialization-failed",`fetching rodent weights (${r}) timed out after ${t} ms`,n))},t)})])}catch(a){throw a instanceof Ve?a:new Ve("initialization-failed",`failed to load rodent weights from ${r}: ${a instanceof Error?a.message:String(a)}`,n)}finally{clearTimeout(i)}}function ui(e){let t=0;return(n,r,o)=>{if(!e)return;const s=Math.max(0,Math.min(1,Number.isFinite(r)?r:0)),i=Math.max(t,s);t=i;const a={stage:n,progress:i};o?.layer!==void 0&&(a.layer=o.layer),o?.totalLayers!==void 0&&(a.totalLayers=o.totalLayers),o?.message!==void 0&&(a.message=o.message),e(a)}}function fi(e,t,n){const r={model:"rodent",modelBinModel:"rodent",quantize8Bit:!0,enableTranspose:!0,...n?{__v4Env:n}:{}},o=Gn(t);return e==="low-memory"?(r.forceLowMem128=!0,r.webgpuExecMode=o||"paced",r.__v4PlanReasonOverride="override"):e==="standard"?(r.forceLowMem128=!1,o&&(r.webgpuExecMode=o),r.__v4PlanReasonOverride="override"):e==="recalibrate"?(r.recalibrate=!0,o&&(r.webgpuExecMode=o)):e==="probe"?(r.recalibrate=!0,r.forceProbe=!0,o&&(r.webgpuExecMode=o)):o&&(r.webgpuExecMode=o,r.__v4PlanReasonOverride="override"),r}function lo(e,t,n){const r=Er(t),o=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),s=new Uint8Array(o.byteLength),i=n.length;if(r===1)for(let a=0;a<i;a++)n[a]&&(s[a]=o[a]);else if(r===2&&(o.byteOffset&1)===0){const a=new Uint16Array(o.buffer,o.byteOffset,i),l=new Uint16Array(s.buffer,0,i);for(let u=0;u<i;u++)n[u]&&(l[u]=a[u])}else if(r===4&&(o.byteOffset&3)===0){const a=new Uint32Array(o.buffer,o.byteOffset,i),l=new Uint32Array(s.buffer,0,i);for(let u=0;u<i;u++)n[u]&&(l[u]=a[u])}else for(let a=0;a<i;a++){if(!n[a])continue;const l=a*r;for(let u=0;u<r;u++)s[l+u]=o[l+u]}return s}async function pi(e){const{weightBytes:t,conformedImg:n,normOffset:r,normRange:o,normClamp:s,device:i,webgpuMode:a,webgpuExec:l,v4Env:u,timeoutMs:f,log:m,record:c,reportProgress:p}=e,d=!i,_=i??await io(),z=fi(a,l,u),w=async(g,x)=>{const P=typeof g.pushErrorScope=="function"&&typeof g.popErrorScope=="function";let $=!1,y=null,C;P&&(g.pushErrorScope("out-of-memory"),$=!0);try{const S=(async()=>{p("load",.12,{message:"Setting up WebGPU V4"}),y=await Ya(g,t,void 0,x);const A=typeof y.__v4Plan=="function"?y.__v4Plan():null;A&&c(Ro(A)),p("inference",.28,{layer:0,totalLayers:Wn,message:"Running Skull-strip (WebGPU V4)"});const b=await y(n,{gpuNativeInput:!0,gpuNativeOutput:!0,normOffset:r,normRange:o,normClamp:s,onProgress:(M,k)=>{const I=Math.max(0,Math.min(1,Number(M)||0)),q=typeof k=="string"?/^Layer (\d+)\/(\d+)$/.exec(k):null;p("inference",.28+.57*I,{layer:q?Number(q[1]):void 0,totalLayers:q?Number(q[2]):Wn,message:k||void 0})}});return p("inference",.85,{layer:Wn,totalLayers:Wn,message:"Inference complete"}),b})(),h=await Promise.race([S,new Promise((A,b)=>{C=setTimeout(()=>{b(new Ve("inference-failed",`WebGPU inference did not finish within ${f} ms; the GPU device may have been lost`,m))},f)})]);if($){$=!1;const A=await g.popErrorScope();if(A){const b=new Error(`WebGPU out of memory (${A.message||"allocation failed"})`);throw b.oomError=A,b}}return h}catch(S){if($){$=!1;try{const h=await g.popErrorScope();h&&S&&typeof S=="object"&&!("oomError"in S)&&(S.oomError=h)}catch{}}throw S}finally{clearTimeout(C);const S=y;if(S)try{S.dispose({keepSharedWorkspace:!1})}catch{}try{kn(g)}catch{}}};try{return await sa({device:_,modelEntry:z,runAttempt:(g,x)=>w(g,x),requestFreshDevice:d?async({failedDevice:g})=>{li(g);try{return await io()}catch{return null}}:null,onRetry:({failureKind:g,error:x})=>{const P=`[WebGPU-V4] ${g} during inference (${x instanceof Error?x.message:String(x)}); retrying once in LowMem128 + paced`;c(P),p("load",.14,{message:"Retrying in low-memory WebGPU mode"})},env:u||null})}catch(g){if(g instanceof Ve)throw g;const x=g instanceof Error?g.message:String(g);throw c(`brainchomp: webgpu inference error: ${x}`),new Ve("inference-failed",x,m)}}async function mi(e){const t=performance.now(),n=[],r=b=>{n.push(b),e.onLog?.(b)},o=ui(e.onProgress),s=e.timeoutMs??si,i=Math.min(s,ai),a=e.opening??4,l=e.fillHoles!==!1;o("load",0,{message:"Loading rodent weights"});const u=ci(e.assetPath,i,n);let f;try{f=pa(e.input)}catch(b){throw await u.catch(()=>{}),new Ve("bad-input",b instanceof Error?b.message:String(b),n)}o("conform",.08,{message:"Conforming volume to 256³"});let m;try{m=ti(f),m.onGrid||r(`brainchomp: conforming ${f.header.dims[1]}x${f.header.dims[2]}x${f.header.dims[3]} input to ${Pt}^3 at ${rn} mm`)}catch(b){throw await u.catch(()=>{}),new Ve("bad-input",b instanceof Error?b.message:String(b),n)}o("conform",.18),o("preprocess",.2,{message:"Computing intensity quantiles"});const{qmin:c,qmax:p}=ga(m.img,.02,.98),d=c,_=p-c+.001,z=_>0?_:1,w=!0;o("preprocess",.24);const g=await u,P=(await pi({weightBytes:g,conformedImg:m.img,normOffset:d,normRange:z,normClamp:w,device:e.device,webgpuMode:e.webgpuMode,webgpuExec:e.webgpuExec,v4Env:e.v4Env,timeoutMs:s,log:n,record:r,reportProgress:o}))[0];if(!P||P.length!==fn){const b=`brainchomp: unexpected WebGPU output length (${P?.length??0})`;throw r(b),new Ve("inference-failed",b,n)}const $=P instanceof Uint8Array?P:new Uint8Array(P);for(let b=0;b<fn;b++)$[b]=$[b]>0?1:0;o("postprocess",.86,{message:"Cleaning brain mask"});const y=os($,Tn);if(y>ii){const b=`brainchomp: the webgpu backend produced noise (${y} disconnected regions); the network output is unusable`;throw r(b),new Ve("inference-failed",b,n)}a>0&&ri($,Tn,a),l&&oi($,Tn);let C=0;for(let b=0;b<fn;b++)C+=$[b];C===0&&r("brainchomp: WARNING - the network found no brain; the output will be blank. Check the input's voxel size and contrast."),o("reslice",.93,{message:"Reslicing mask to native space"});let S,h;if(m.onGrid||e.saveConform)if(m.onGrid){const b=lo(f.data,f.header.datatypeCode,$);S=hn(f.header,b,{datatypeCode:f.header.datatypeCode,descrip:"brainchomp"}),h=hn(f.header,$,{datatypeCode:Je.UINT8,sclSlope:1,sclInter:0,calMin:0,calMax:1,intentCode:Jn,descrip:"brainchomp"})}else{const b=new Uint8Array(fn);for(let k=0;k<fn;k++)b[k]=$[k]?m.img[k]:0;const M={dims:Tn,pixDims:[rn,rn,rn],affine:m.affine,datatypeCode:Je.UINT8,sclSlope:1,sclInter:0,descrip:"brainchomp"};S=hn(f.header,b,{...M,calMin:0,calMax:0,intentCode:To}),h=hn(f.header,$,{...M,calMin:0,calMax:1,intentCode:Jn})}else{const b=ni($,m.affine,f.header),M=lo(f.data,f.header.datatypeCode,b);S=hn(f.header,M,{datatypeCode:f.header.datatypeCode,descrip:"brainchomp"}),h=hn(f.header,b,{datatypeCode:Je.UINT8,sclSlope:1,sclInter:0,calMin:0,calMax:1,intentCode:Jn,descrip:"brainchomp"})}const A=performance.now()-t;return o("complete",1,{message:"Done"}),{brain:S,mask:h,elapsedMs:A,log:n}}var di;function gi(){return di}var xr="/mask.nii";function hi(e){const t=["--mask",xr];if(e.opening!==void 0){if(!Number.isInteger(e.opening)||e.opening<0||e.opening>64)throw new Ve("unsupported-option",`opening must be an integer radius from 0 to 64, got ${e.opening}`);t.push("--opening",String(e.opening))}if(e.fillHoles!==void 0&&typeof e.fillHoles!="boolean")throw new Ve("unsupported-option",`fillHoles must be true or false, got ${String(e.fillHoles)}`);return e.fillHoles===!1&&t.push("--no-fill-holes"),e.saveConform&&t.push("--save-conform"),t}function _i(){const e={};try{const t=globalThis.localStorage;if(!t)return e;for(let n=0;n<t.length;n++){const r=t.key(n);if(r&&r.startsWith(Ar)){const o=t.getItem(r);o!==null&&(e[r]=o)}}}catch{}return e}function wi(e){if(!(!e?.key||!String(e.key).startsWith(Ar)))try{const t=globalThis.localStorage;if(!t)return;e.op==="set"?t.setItem(e.key,String(e.value??"")):e.op==="remove"&&t.removeItem(e.key)}catch{}}async function bi(e,t){if(typeof Worker>"u")throw new Ve("unsupported-option","this environment has no Worker; run with worker: false");const n=Mr("worker.js",t.assetPath),r=new Worker(n,{type:"module"}),{device:o,glContext:s,onLog:i,onProgress:a,worker:l,...u}=t;u.assetPath!==void 0&&(u.assetPath=new URL("./",n).href);let f="";try{f=typeof location<"u"&&location.search||""}catch{}const m=_i();let c;try{return await new Promise((p,d)=>{r.onmessage=w=>{const g=w.data;if(g.type==="log"){i?.(g.line);return}if(g.type==="progress"){a?.(g.event);return}if(g.type==="storage"){wi(g);return}if(g.type==="done"){p({brain:g.brain,mask:g.mask,elapsedMs:g.elapsedMs,backend:g.backend});return}d(new Ve(g.code,g.message,g.log))},r.onerror=w=>d(new Ve("inference-failed",`the segmentation worker failed to start or threw: ${w.message??"unknown"}`)),r.onmessageerror=()=>d(new Ve("inference-failed","the segmentation worker sent a message that could not be deserialized"));const _=t.backend&&t.backend!=="auto"?t.backend:null,z=t.timeoutMs??(_&&_!=="cpu"?12e4:Po);c=setTimeout(()=>d(new Ve("inference-failed",`the segmentation did not finish within ${z} ms`)),z),r.postMessage({input:e,options:u,pageSearch:f,profileCache:m})})}finally{clearTimeout(c),r.terminate()}}function ss(e){const t=So();if(t.supported&&t.software===!1)return{backend:"webgl2",glContext:pr(),ownsContext:!0};const n=Ir();if(n.supported)return{backend:"cpu",ownsContext:!1};if(t.supported&&!t.software)return{backend:"webgl2",glContext:pr(),ownsContext:!0};const r="a software rasteriser, too slow and unreliable to run; make the page cross-origin isolated so the cpu backend can";throw new Ve("no-webgpu",`no backend can run here.
  WebGPU: ${e}
  WebGL2: ${t.supported?r:t.reasons.join("; ")}
  CPU:    ${n.reasons.join("; ")}`)}async function vi(e){const t=e.backend&&e.backend!=="auto"?e.backend:null;if(e.device&&t&&t!=="webgpu")throw new Ve("unsupported-option",`backend: '${t}' was requested but a GPUDevice was supplied; a device selects the webgpu backend. Drop the device, or drop the backend.`);if(e.glContext&&t&&t!=="webgl2")throw new Ve("unsupported-option",`backend: '${t}' was requested but a WebGL2RenderingContext was supplied; a context selects the webgl2 backend. Drop the glContext, or drop the backend.`);if(e.device)return Ls(e.device),{backend:"webgpu",device:e.device,ownsContext:!1};if(e.glContext)return{backend:"webgl2",glContext:e.glContext,ownsContext:!1};const n=e.backend??"auto";if(n==="webgpu")return(await fr()).supported||await $o(),{backend:"webgpu",ownsContext:!1};if(n==="webgl2")return{backend:"webgl2",glContext:pr(),ownsContext:!0};if(n==="cpu"){const i=Ir();if(!i.supported)throw new Ve("no-webgpu",`the cpu backend cannot run here: ${i.reasons.join("; ")}`);return{backend:"cpu",ownsContext:!1}}const r=await fr();if(r.supported&&!r.software)return{backend:"webgpu",ownsContext:!1};const s=r.supported?"a software rasteriser, too slow and unreliable to run; make the page cross-origin isolated so the cpu backend can":r.reasons.join("; ");return ss(s)}function Ir(){const e=[];return typeof SharedArrayBuffer>"u"?e.push("this environment has no SharedArrayBuffer"):globalThis.crossOriginIsolated!==!0&&e.push("this page is not cross-origin isolated; serve it with Cross-Origin-Opener-Policy: same-origin and Cross-Origin-Embedder-Policy: require-corp"),{supported:e.length===0,reasons:e}}async function co(e){const{bytes:t,args:n,backend:r,glContext:o,ownsContext:s,options:i,pack:a}=e;i.onProgress?.({stage:"load",progress:0,message:`Loading ${r} module`});let l=!1,u;try{u=await Vs({backend:r,glContext:o,input:t,args:n,extraOutputs:[xr],assetPath:i.assetPath,timeoutMs:i.timeoutMs,onLog:m=>{i.onLog?.(m),!l&&/using\s+(cpu|webgl2)\s+backend/i.test(m)&&(l=!0,i.onProgress?.({stage:"inference",progress:.15,message:`Running Skull-strip (${r})`}))}})}finally{s&&o&&Rs(o)}const f=u.extras.get(xr);if(!f)throw new Ve("inference-failed","the module wrote no brain mask",u.log);return i.onProgress?.({stage:"complete",progress:1,message:"Done"}),{brain:await a(u.image),mask:await a(f),elapsedMs:u.elapsedMs,backend:r,ranInWorker:!1}}async function yi(e,t={}){const n=e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength);if(n.byteLength===0)throw new Ve("bad-input","the input is empty");const r=hi(t);if(t.worker&&(t.device||t.glContext))throw new Ve("unsupported-option","worker cannot be combined with device or glContext: a GPUDevice and a WebGL2RenderingContext belong to the thread that created them and cannot cross into a worker");if(t.worker)return{...await bi(n,t),ranInWorker:!0};const o=Is(n),s=o?await Ts(n):n,i=t.gzipOutput??o,a=async f=>(i?await Ws(f):f).slice().buffer,l=t.backend??"auto",u=await vi(t);if(u.backend==="webgpu")try{const f=gi(),m=await mi({input:s,device:u.device,opening:t.opening,fillHoles:t.fillHoles,saveConform:t.saveConform,assetPath:t.assetPath,timeoutMs:t.timeoutMs,webgpuMode:t.webgpuMode,webgpuExec:t.webgpuExec,v4Env:f,onLog:t.onLog,onProgress:t.onProgress});return{brain:await a(m.brain),mask:await a(m.mask),elapsedMs:m.elapsedMs,backend:"webgpu",ranInWorker:!1}}catch(f){const m=f?.code;if(l!=="auto"||t.device||m==="bad-input")throw f;const c=f instanceof Error?f.message:String(f);t.onLog?.(`[WebGPU-V4] WebGPU failed after safe-mode retry (${c}); attempting WebGL2/CPU fallback`);let p;try{p=ss(c)}catch{throw f}return co({bytes:s,args:r,backend:p.backend,glContext:p.glContext,ownsContext:p.ownsContext,options:t,pack:a})}return co({bytes:s,args:r,backend:u.backend,glContext:u.glContext,ownsContext:u.ownsContext,options:t,pack:a})}const _n=[{id:1,type:"Brain_Extraction",modelName:"Skull-strip",maskOpeningRadius:4,inputWorldRemap:[[-1,0,0],[0,0,-1],[0,1,0]],description:"Extract the rodent brain and save the input intensities with non-brain voxels set to zero."}];async function Tr(){return navigator.userAgent.indexOf("OPR/")>-1?"Opera":navigator.userAgent.indexOf("Edg/")>-1?"Edge":navigator.userAgent.indexOf("Falkon/")>-1?"Falkon":navigator.userAgent.indexOf("Chrome/")>-1?"Chrome":navigator.userAgent.indexOf("Firefox/")>-1?"Firefox":navigator.userAgent.indexOf("Safari/")>-1?"Safari":navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?"IExplorer":"Unknown"}async function xi(){return navigator.userAgent.indexOf("OPR/")>-1?parseInt(navigator.userAgent.split("OPR/")[1]):navigator.userAgent.indexOf("Edg/")>-1?parseInt(navigator.userAgent.split("Edg/")[1]):navigator.userAgent.indexOf("Falkon/")>-1?parseInt(navigator.userAgent.split("Falkon/")[1]):navigator.userAgent.indexOf("Chrome/")>-1?parseInt(navigator.userAgent.split("Chrome/")[1]):navigator.userAgent.indexOf("Firefox/")>-1?parseInt(navigator.userAgent.split("Firefox/")[1]):navigator.userAgent.indexOf("Safari/")>-1?parseInt(navigator.userAgent.split("Safari/")[1]):navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?parseInt(navigator.userAgent.split("MSIE/")[1]):1/0}async function $i(){return navigator.userAgent.indexOf("Win")>-1?"Windows":navigator.userAgent.indexOf("Mac")>-1?"MacOS":navigator.userAgent.indexOf("Linux")>-1?"Linux":navigator.userAgent.indexOf("UNIX")>-1?"UNIX":"Unknown"}async function ki(e){return e?(console.log("WebGl2 is enabled"),!0):(console.log(typeof WebGL2RenderingContext<"u"?"WebGL2 may be disabled. Please try updating video card drivers":"WebGL2 is not supported"),!1)}async function Si(e){let t;if(e&&(t=e.getExtension("WEBGL_debug_renderer_info"),t)){const n=e.getParameter(t.UNMASKED_VENDOR_WEBGL);return n.indexOf("(")>-1&&n.indexOf(")")>-1?n.substring(n.indexOf("(")+1,n.indexOf(")")):n}return null}async function Mi(e){if(e){const t=e.getExtension("WEBGL_debug_renderer_info");return t?e.getParameter(t.UNMASKED_VENDOR_WEBGL):null}else return null}async function Pi(e){if(e){if(Tr()==="Firefox")return e.getParameter(e.RENDERER);const t=e.getExtension("WEBGL_debug_renderer_info");return t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):null}else return null}async function Ai(e){let t;if(e){if(Tr()==="Firefox")return e.getParameter(e.RENDERER);if(t=e.getExtension("WEBGL_debug_renderer_info"),t){let n=e.getParameter(t.UNMASKED_RENDERER_WEBGL);return n.indexOf("(")>-1&&n.indexOf(")")>-1&&n.indexOf("(R)")===-1&&(n=n.substring(n.indexOf("(")+1,n.indexOf(")")),n.split(",").length===3)?n.split(",")[1].trim():n}}return null}async function zi(){return navigator.hardwareConcurrency}async function Bi(){return/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}async function Ci(e,t=null){const n=new Date;if(e.isModelFullVol?e.Brainchop_Ver="FullVolume":e.Brainchop_Ver="SubVolumes",e.Total_t=(Date.now()-e.startTime)/1e3,delete e.startTime,e.Date=parseInt(n.getMonth()+1)+"/"+n.getDate()+"/"+n.getFullYear(),e.Browser=await Tr(),e.Browser_Ver=await xi(),e.OS=await $i(),e.WebGL2=await ki(t),e.GPU_Vendor=await Si(t),e.GPU_Card=await Ai(t),e.GPU_Vendor_Full=await Mi(t),e.GPU_Card_Full=await Pi(t),e.CPU_Cores=await zi(),e.Which_Brainchop="latest",await Bi()&&window.performance?.memory&&(e.Heap_Size_MB=window.performance.memory.totalJSHeapSize/(1024*1024).toFixed(2),e.Used_Heap_MB=window.performance.memory.usedJSHeapSize/(1024*1024).toFixed(2),e.Heap_Limit_MB=window.performance.memory.jsHeapSizeLimit/(1024*1024).toFixed(2)),t){console.log("MAX_TEXTURE_SIZE :",t.getParameter(t.MAX_TEXTURE_SIZE)),console.log("MAX_RENDERBUFFER_SIZE :",t.getParameter(t.MAX_RENDERBUFFER_SIZE));const r=t.getExtension("WEBGL_debug_renderer_info");r&&console.log("VENDOR WEBGL:",t.getParameter(r.UNMASKED_VENDOR_WEBGL)),e.Texture_Size=t.getParameter(t.MAX_TEXTURE_SIZE)}else e.Texture_Size=null;return e}const uo=.5,fo=8,po=(e,t,n)=>Math.min(n,Math.max(t,e)),mo=e=>Math.hypot(e[0].clientX-e[1].clientX,e[0].clientY-e[1].clientY);function as(e){e?.scene&&(e.scene.pan2Dxyzmm=[0,0,0,1],e.scene.volScaleMultiplier=1,e.drawScene()),Ei()}function Ei(){const e=document.querySelector('meta[name="viewport"]');if(!e)return;const t=e.getAttribute("content")||"width=device-width, initial-scale=1.0";/maximum-scale/.test(t)||(e.setAttribute("content",`${t}, maximum-scale=1, user-scalable=no`),requestAnimationFrame(()=>requestAnimationFrame(()=>e.setAttribute("content",t))))}function Fi(){const e=t=>t.preventDefault();for(const t of["gesturestart","gesturechange","gestureend"])document.addEventListener(t,e,{passive:!1});document.addEventListener("touchmove",t=>{t.touches.length>1&&t.preventDefault()},{passive:!1})}function Li(e){const t=e.canvas;if(!t)return;let n=null;const r=s=>{if(s.touches.length!==2){n=null;return}const i=t.getBoundingClientRect(),a=(s.touches[0].clientX+s.touches[1].clientX)/2-i.left,l=(s.touches[0].clientY+s.touches[1].clientY)/2-i.top,u=e.uiData?.dpr||1;n={dist:Math.max(1,mo(s.touches)),zoom:e.scene.pan2Dxyzmm[3]||1,pan:Array.from(e.scene.pan2Dxyzmm).slice(0,3),scale3d:e.scene.volScaleMultiplier||1,inRender:e.inRenderTile?e.inRenderTile(a*u,l*u)>=0:!1}},o=()=>{n=null};t.addEventListener("touchstart",r,{passive:!1}),t.addEventListener("touchend",o,{passive:!1}),t.addEventListener("touchcancel",o,{passive:!1}),e.handlePinchZoom=s=>{if(!n||!s.touches||s.touches.length!==2)return;const i=mo(s.touches)/n.dist;if(!isFinite(i)||i<=0)return;if(n.inRender){e.scene.volScaleMultiplier=po(n.scale3d*i,uo,fo),e.drawScene();return}const a=po(n.zoom*i,uo,fo),l=e.frac2mm(e.scene.crosshairPos),u=n.zoom-a;e.scene.pan2Dxyzmm=[n.pan[0]+u*l[0],n.pan[1]+u*l[1],n.pan[2]+u*l[2],a],e.opts.yoke3Dto2DZoom&&(e.scene.volScaleMultiplier=a),e.drawScene()}}function Ui(e){return Fi(),Li(e),{resetView:()=>as(e)}}const Ri=720,Ii=860;function Ti(){const e=window.visualViewport,t=Math.round(e?.width??window.innerWidth??0),n=Math.round(e?.height??window.innerHeight??0);return t>0&&t<=Ri?!0:!!window.matchMedia?.("(pointer: coarse)")?.matches&&Math.min(t,n)<=Ii}function Pn(e,t,n,r,o,s){const i=n-o,a=r-s;if(!(i>0)||!(a>0)||!(e>0)||!(t>0))return 0;let l=i/e;return t*l>a&&(l=a/t),l}function Wi(e){const t=(e.effectiveCanvasWidth?.()??e.gl?.canvas?.width)||0,n=(e.effectiveCanvasHeight?.()??e.gl?.canvas?.height)||0;if(!t||!n)return null;let r=[1,1,1];try{const w=e.sliceScale();w?.volScale?.length===3&&(r=w.volScale.slice())}catch{}e.opts.multiplanarEqualSize&&(r=[1,1,1]);const[o,s,i]=r,a=Math.max(o,s,i),l=e.uiData?.dpr||1,u=(parseFloat(`${e.opts.multiplanarPadPixels}`)||0)*l;let f=(e.opts.tileMargin||0)*l;f<0&&(f=2*(2+Math.ceil(e.fontPx||0)));const m=w=>(w-1)*u+w*f,c=w=>(w-1)*u+w*f,p=e.opts.multiplanarShowRender===bs.ALWAYS||e.opts.multiplanarForceRender===!0,d=p?Pn(a,s+i+i+a,t,n,m(1),c(4)):Pn(a,s+i+i,t,n,m(1),c(3)),_=p?Pn(o+o+s+a,Math.max(s,i),t,n,m(4),c(1)):Pn(o+o+s,Math.max(s,i),t,n,m(3),c(1)),z=Pn(o+s,s+i,t,n,m(2),c(2));return[{layout:Xn.GRID,name:"grid",scale:z},{layout:Xn.COLUMN,name:"column",scale:d},{layout:Xn.ROW,name:"row",scale:_}]}function qi(e){if(!e?.gl)return null;const t=Wi(e);if(!t)return null;const n=t.reduce((o,s)=>s.scale>o.scale+1e-6?s:o),r=e.opts.multiplanarLayout!==n.layout;return e.opts.multiplanarLayout=n.layout,{...n,changed:r}}function Oi(e){let t="";const n=e.drawScene.bind(e);e.drawScene=function(){if(e.opts.sliceType===wn.MULTIPLANAR&&e.gl){const r=[e.gl.canvas.width,e.gl.canvas.height,e.opts.multiplanarShowRender,e.opts.multiplanarForceRender,e.opts.multiplanarEqualSize,e.volumes?.[0]?.id??""].join("|");r!==t&&(t=r,qi(e))}return n()}}const $r=[{id:"multi",label:"All",title:"All planes",type:wn.MULTIPLANAR},{id:"axial",label:"A",title:"Axial only",type:wn.AXIAL},{id:"coronal",label:"C",title:"Coronal only",type:wn.CORONAL},{id:"sagittal",label:"S",title:"Sagittal only",type:wn.SAGITTAL},{id:"render",label:"3D",title:"3D render only",type:wn.RENDER}];function Ni(e,t){const n=document.createElement("div");n.id="paneSwitcher",n.className="pane-switcher",n.setAttribute("role","group"),n.setAttribute("aria-label","Visible planes");for(const o of $r){const s=document.createElement("button");s.type="button",s.dataset.pane=o.id,s.textContent=o.label,s.title=o.title,s.setAttribute("aria-label",o.title),s.addEventListener("click",()=>is(e,n,o.id)),n.appendChild(s)}const r=document.createElement("button");return r.type="button",r.className="pane-reset",r.textContent="⟲",r.title="Reset zoom and pan",r.setAttribute("aria-label","Reset zoom and pan"),r.addEventListener("click",()=>as(e)),n.appendChild(r),t.appendChild(n),n}function is(e,t,n){const r=$r.find(o=>o.id===n)||$r[0];e.setSliceType(r.type),t.querySelectorAll("button").forEach(o=>o.classList.toggle("active",o.dataset.pane===r.id))}function Di(e){const t=document.getElementById("canvas-container")||document.body,n=Ni(e,t);n.querySelector('button[data-pane="multi"]').classList.add("active"),Oi(e);let r=0;const o=()=>{r=0,document.body.classList.toggle("nv-narrow",Ti());const i=e.canvas,a=e.opts.forceDevicePixelRatio===0?window.devicePixelRatio||1:e.opts.forceDevicePixelRatio<0?1:e.opts.forceDevicePixelRatio;i&&e.opts.isResizeCanvas!==!1&&(Math.abs(i.width-i.offsetWidth*a)>1||Math.abs(i.height-i.offsetHeight*a)>1)?e.resizeListener():e.drawScene()},s=()=>{r||(r=requestAnimationFrame(o))};return window.addEventListener("resize",s),window.addEventListener("orientationchange",s),window.visualViewport?.addEventListener("resize",s),typeof ResizeObserver<"u"&&new ResizeObserver(s).observe(t),o(),{refresh:s,setPane:i=>is(e,n,i)}}let cr=null,on=null;const Cn=new URLSearchParams(window.location.search),ls=["webgpu","webgl2","cpu"].find(e=>e===(Cn.get("backend")||Cn.get("inference")||"").toLowerCase()),en=(Cn.get("webgpuMode")||Cn.get("webgpu")||"").trim().toLowerCase(),Gi=en==="low-memory"||en==="lowmem"||en==="128m"?"low-memory":en==="standard"||en==="std"?"standard":en==="recalibrate"||en==="reset"?"recalibrate":en==="probe"?"probe":void 0,Vi=["single","pipelined","paced","chunked"].find(e=>e===(Cn.get("webgpuExec")||"").trim().toLowerCase()),Hi=new URL("./brainchomp/",window.location.href).href,go={webgpu:"WebGPU",webgl2:"WebGL2",cpu:"CPU"};async function Xi(){const e=await fr().catch(s=>({supported:!1,reasons:[s.message]})),t=!!(e.supported&&!e.software),n=t?null:So(),r=Ir();on={secureContext:window.isSecureContext,webgpu:e,webgl2:n,cpu:r};const o=ls??(t?"webgpu":n?.supported&&n.software===!1?"webgl2":r.supported?"cpu":n?.supported&&!n.software?"webgl2":null);cs(o)}function cs(e){const t=document.getElementById("backendStatus");if(!t)return;const n=on?.webgpu,r=on?.webgl2,o=on?.cpu,s=n?.reasons??[];if(e==="webgpu"){const i=n?.hasShaderF16?" (F16)":"",a=n?.lowMemoryRequired?" · LowMem":"";t.textContent=`WebGPU${i}`,t.style.color="#4CAF50",t.title=`WebGPU V4 8-bit${i}${a} — fastest performance`}else if(e==="webgl2"){t.textContent="WebGL2",t.style.color="#FF9800";let i="WebGL2 WASM backend (fallback)";n?.software?i+=`
WebGPU: software adapter skipped`:s.length&&(i+=`
WebGPU: ${s.join("; ")}`),t.title=i}else if(e==="cpu"){t.textContent="CPU",t.style.color="#60a5fa";let i="Threaded WebAssembly CPU backend (cross-origin isolated fallback)";s.length&&(i+=`
WebGPU: ${s.join("; ")}`),t.title=i}else{t.textContent="No GPU",t.style.color="#F44336";const i=["No supported compute backend detected"];n?.software?i.push("WebGPU: software adapter"):s.length&&i.push(`WebGPU: ${s.join("; ")}`),r?.software?i.push("WebGL2: software rasteriser"):r?.reasons?.length&&i.push(`WebGL2: ${r.reasons.join("; ")}`),o?.reasons?.length&&i.push(`CPU: ${o.reasons.join("; ")}`),window.isSecureContext||i.push("⚠ Not a secure context (HTTPS required)"),t.title=i.join(`
`)}}async function Yi(){let e="",t="",n=!1,r=null,o=null;const s="altKey";let i=null,a=null,l=null;const u=.9,f=document.getElementById("sampleSelect"),m=document.getElementById("maskToggle"),c=document.getElementById("modelRunButton");let p=null,d=null,_=null;function z(){p?.invalidate(),d=null,_=null,p?.updateAvailability(),cr=null,m&&(m.checked=!1,m.disabled=!0)}const w=document.getElementById("dragSegmented");w&&w.querySelectorAll("button").forEach(B=>{B.onclick=()=>{L.opts.dragMode=parseInt(B.dataset.drag,10),w.querySelectorAll("button").forEach(R=>R.classList.toggle("active",R===B))}});const g=document.getElementById("drawBtn"),x=document.getElementById("drawPopover"),P=document.getElementById("penRow"),$=document.getElementById("drawApplyRow");function y(B){x&&(x.hidden=!B,g&&g.setAttribute("aria-expanded",String(B)))}function C(B){L.setDrawingEnabled(B>=0),B>=0&&L.setPenValue(B&7,B>7),P&&P.querySelectorAll(".chip").forEach(R=>R.classList.toggle("active",parseInt(R.dataset.pen,10)===B))}async function S(B){if(L.volumes.length<2){window.alert("No segmentation open (run a model first).");return}if(p?.active)return;if(B===0){L.drawUndo();return}if(!L.drawBitmap){window.alert("Nothing drawn yet — pick a pen and draw on the image first.");return}const R=L.volumes[1].img,K=await L.volumes[0].saveToDisk("",L.drawBitmap),ne=352,ve=R.length;if(B===1)for(let H=0;H<ve;H++)K[ne+H]>0&&(R[H]=1);if(B===2)for(let H=0;H<ve;H++)K[ne+H]>0&&(R[H]=0);if(d&&m?.checked){d.set(R);for(let H=0;H<ve;H++)_[H]=L.volumes[0].img[H]*d[H]}else if(d)for(let H=0;H<ve;H++)K[ne+H]>0&&(d[H]=B===1?1:0,_[H]=L.volumes[0].img[H]*d[H]);p?.invalidate(),L.closeDrawing(),L.updateGLVolume(),L.setDrawingEnabled(!1),C(-1)}g&&(g.onclick=B=>{B.stopPropagation(),y(x.hidden)}),P&&P.querySelectorAll(".chip").forEach(B=>{B.onclick=()=>C(parseInt(B.dataset.pen,10))}),$&&$.querySelectorAll(".chip").forEach(B=>{B.onclick=()=>S(parseInt(B.dataset.apply,10))}),document.addEventListener("click",B=>{!x||x.hidden||B.target.closest(".popover-wrap")||y(!1)}),document.addEventListener("keydown",B=>{B.key==="Escape"&&y(!1)});const h=document.getElementById("appDialog");h&&h.addEventListener("click",B=>{B.target===h&&h.close()}),aboutBtn.onclick=function(){Wt("About Brainchomp",`
      <div style="text-align: left; font-size: 0.95em;">
        <p><strong>🔒 Privacy First</strong><br>
        Brainchomp runs entirely <strong>locally in your browser</strong>. Your imaging data never leaves your device.</p>

        <p><strong>⌨️ Controls</strong><br>
        • <strong>Drag & Drop</strong> a rodent NIfTI file to open.<br>
        • Use the <strong>example selector</strong> to switch between the bundled rodent MRI and mask.<br>
        • Press <strong>C</strong> to cycle the clip-plane.<br>
        • Press <strong>V</strong> to cycle through views.</p>

        <p><strong>🐭 Rodent brain extraction</strong><br>
        Skull-strip runs the 16-channel MeshNet once using our fast WebGPU V4 8-bit engine (with automatic WebGL2 / CPU fallback). Use the <strong>Mask</strong>
        toggle to switch the overlay between the extracted brain and its
        post-processed binary mask. The Save menu offers both outputs.</p>

        <p><strong>🧠 Part of the Brainchop family</strong><br>
        Working with human brain MRI? Try our sibling app <a href="https://brainchop.org/" target="_blank" rel="noopener noreferrer" style="color:#60a5fa">Brainchop</a>.
        Source &amp; feedback: <a href="https://github.com/neuroneural/brainchomp" target="_blank" rel="noopener noreferrer" style="color:#60a5fa">neuroneural/brainchomp</a>.</p>
        
        <p><em>Inputs of any size or orientation are conformed to 256³ at 0.1 mm (LPS) for the model; the mask comes back on the image's own grid.</em></p>
      </div>
    `)},diagnosticsBtn.onclick=function(){let B=e;if(B.length<1&&on){const K=on;B=`:: Startup Diagnostics https://github.com/neuroneural/brainchomp/issues ::
`,B+=`Secure Context: ${K.secureContext}
`,B+=`Cross-Origin Isolated: ${window.crossOriginIsolated}
`,B+=`WebGPU: ${K.webgpu.supported?K.webgpu.software?"software (skipped)":"yes":`no (${K.webgpu.reasons.join("; ")})`}
`,K.webgpu.hasShaderF16!==void 0&&(B+=`WebGPU F16: ${K.webgpu.hasShaderF16}
`),K.webgpu.hasSubgroups!==void 0&&(B+=`WebGPU Subgroups: ${K.webgpu.hasSubgroups}
`),K.webgpu.lowMemoryRequired!==void 0&&(B+=`WebGPU LowMem128: ${K.webgpu.lowMemoryRequired}
`),K.webgl2&&(B+=`WebGL2: ${K.webgl2.supported?K.webgl2.software?"software (skipped)":"yes":`no (${K.webgl2.reasons.join("; ")})`}
`),K.cpu&&(B+=`CPU WASM: ${K.cpu.supported?"yes":`no (${K.cpu.reasons.join("; ")})`}
`),B+=`User Agent: ${navigator.userAgent}
`}if(B.length<1){Wt("Diagnostics","No diagnostic string generated: run a model to create diagnostics");return}let R=B;t=t.slice(0,-2),t!==""&&R.includes("Status: OK")&&(R=R.replace("Status: OK",`Status: ${t}`)),t="",navigator.clipboard.writeText(R).then(()=>{Wt("Diagnostics",`<p>Diagnostics copied to clipboard</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${R}</pre>`)}).catch(K=>{Wt("Diagnostics",`<p>Failed to copy to clipboard.</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${R}</pre>`)})},opacitySlider0.oninput=function(){L.setOpacity(0,opacitySlider0.value/255),L.updateGLVolume()},opacitySlider1.oninput=function(){if(p?.active){L.setDrawOpacity(opacitySlider1.value/255);return}L.setOpacity(1,opacitySlider1.value/255)};async function A(){for(;L.volumes.length>1;)await L.removeVolume(L.volumes[1])}function b(){return L.volumes.length>=2&&L.volumes[1].colormapLabel?L.volumes[1]:null}function M(){i=null,a=null,l=null}function k(){const B=b();if(B){if(a===null&&(a=B.img),i===null)B.img=a,l=null;else{const R=a,K=new R.constructor(R.length);for(let ne=0;ne<R.length;ne++)K[ne]=R[ne]===i?i:0;B.img=K,l=I(i)}L.updateGLVolume()}}function I(B){const R=L.volumes[0],K=a||L.volumes[1]&&L.volumes[1].img;if(!R||!K)return null;const ne=R.hdr.pixDims||[],ve=ne[1]&&ne[2]&&ne[3]?ne[1]*ne[2]*ne[3]:1,H=Q(R.img,K,ve),Be=H.reduce((je,ct)=>je+ct.volume_mm3,0),xe=H.find(je=>je.label===B);if(!xe)return null;const Ee=Be>0?xe.volume_mm3/Be*100:0,Me=[xe.name,`${v(xe.volume_mm3)} cm3   (${Ee.toFixed(1)}% of brain)`,`${xe.voxels.toLocaleString()} voxels`,`intensity  ${xe.mean.toFixed(0)} +/- ${xe.stdev.toFixed(0)}`];let $e=[1,1,1,1];if(o&&o.R&&o.R[B]!=null){const je=ct=>Math.min(255,ct*.55+130)/255;$e=[je(o.R[B]),je(o.G[B]),je(o.B[B]),1]}return{lines:Me,color:$e}}function q(){if(i===null||!l||!b())return;const B=L.screenSlices&&L.screenSlices.find(ct=>ct.axCorSag===4);if(!B)return;const[R,K]=B.leftTopWidthHeight,ne=L.gl;ne.viewport(0,0,ne.canvas.width,ne.canvas.height),ne.enable(ne.BLEND);const H=L.fontPx*u*1.55,Be=L.fontPx*.6,xe=R+Be,Ee=K+Be,Me=[.92,.92,.92,1],{lines:$e,color:je}=l;L.drawText([xe,Ee],$e[0],u,je);for(let ct=1;ct<$e.length;ct++)L.drawText([xe,Ee+ct*H],$e[ct],u,Me)}function J(){const B=b();if(!B)return null;const R=L.frac2mm(L.scene.crosshairPos,0,!0),K=B.mm2vox(R),ne=B.img;a&&(B.img=a);const ve=Math.round(B.getValue(K[0],K[1],K[2],B.frame4D));return B.img=ne,ve}function E(B){p?.active||b()&&(i=B===0||B===i?null:B,k())}function Z(B){if(!B[s]||!b())return;const R=J();R===null||Number.isNaN(R)||(E(R),B.preventDefault())}async function me(){if(!(n||p?.active)){n=!0,p?.updateAvailability(),c&&(c.disabled=!0);try{await G()}catch(B){console.error("Segmentation failed:",B),he("Segmentation failed",0);const R=B?.code==="bad-input"?"Input not supported":"Segmentation failed";Wt(R,`<p>${An(B?.message||String(B))}</p>`+(B?.code?`<p style="font-size:0.88em;color:#9aa4af">Code: ${An(B.code)}. Full details are in the browser console.</p>`:""))}finally{n=!1,p?.updateAvailability(),c&&(c.disabled=!1)}}}function be(B){const R=B.find(xe=>/\[WebGPU-V4\]/.test(xe)&&/layout=/.test(xe));if(!R)return{};const K=xe=>{const Ee=new RegExp(`${xe}=([^\\s,;]+)`).exec(R);return Ee?Ee[1]:null},ne={},ve=K("layout"),H=K("exec"),Be=K("reason");return ve&&(ne.WebGPU_V4_Layout=ve),H&&(ne.WebGPU_V4_Exec=H),Be&&(ne.WebGPU_V4_Reason=Be),ne}async function G(){const B=modelSelect.value;if(B==="-1"||modelSelect.selectedIndex<0)return;await A(),M();const R=_n[B],K=L.volumes[0];he(`${R.modelName}: running…`,0);const ne=Date.now(),ve=[],H=await K.saveToDisk("");R.inputWorldRemap&&T(H,K.hdr.affine,R.inputWorldRemap);const Be=await yi(H,{worker:!0,backend:ls??"auto",webgpuMode:Gi,webgpuExec:Vi,opening:R.maskOpeningRadius,gzipOutput:!1,assetPath:Hi,onLog:$e=>{ve.push($e),console.log("[brainchomp]",$e)},onProgress:$e=>{if($e.stage==="load"&&$e.progress===0&&/webgl2|cpu/i.test($e.message||"")){he(`${R.modelName}: ${$e.message}…`,null);return}if($e.stage==="inference"&&/webgl2|cpu/i.test($e.message||"")){he(`${$e.message}…`,null);return}const je=$e.message?`${R.modelName}: ${$e.message}`:$e.layer!==void 0&&$e.totalLayers?`${R.modelName}: Layer ${$e.layer}/${$e.totalLayers}`:"";he(je,$e.progress)}});if(L.volumes[0]!==K)return;const xe=ee(Be.mask),Ee=K.hdr.dims[1]*K.hdr.dims[2]*K.hdr.dims[3];if(xe.length<Ee)throw new Error(`The returned mask has ${xe.length} voxels; the image has ${Ee}.`);cs(Be.backend),Pe(xe.subarray(0,Ee),R);const Me=(Be.elapsedMs/1e3).toFixed(1);he(`${R.modelName}<br>Segmentation finished (${go[Be.backend]}, ${Me} s)`,1),ke({Model:R.modelName,Backend:go[Be.backend],Worker:Be.ranInWorker,...be(ve),WebGPU_F16:on?.webgpu?.hasShaderF16,WebGPU_Subgroups:on?.webgpu?.hasSubgroups,Cross_Origin_Isolated:window.crossOriginIsolated,Inference_t:Number(Me),Input_Shape:K.hdr.dims.slice(1,4).join("x"),Status:"OK",isModelFullVol:!0,startTime:ne})}function T(B,R,K){const ne=new DataView(B.buffer,B.byteOffset);ne.setInt16(252,0,!0);for(let ve=0;ve<3;ve++)for(let H=0;H<4;H++)ne.setFloat32(280+16*ve+4*H,K[ve][0]*R[0][H]+K[ve][1]*R[1][H]+K[ve][2]*R[2][H],!0)}function ee(B){const R=new DataView(B);for(const K of[!0,!1]){const ne=R.getInt32(0,K);if(ne===348&&R.getInt16(70,K)===2)return new Uint8Array(B,R.getFloat32(108,K));if(ne===540&&R.getInt16(12,K)===2)return new Uint8Array(B,Number(R.getBigInt64(168,K)))}throw new Error("The returned mask is not a uint8 NIfTI file.")}modelSelect.onchange=me,c&&(c.onclick=()=>{modelSelect.value="0",me()}),m&&(m.onchange=()=>{d&&ue().catch(B=>{console.error("Could not switch result overlay:",B),Wt("Overlay error",An(B?.message||String(B)))})});function j(B){const R=b(),K=i!==null&&R&&a;K&&(R.img=a);try{return B()}finally{K&&k()}}async function le(B){if(p?.busy)return;if(!d||!_){window.alert("No result to save (run Skull-strip first).");return}const R=await L.volumes[0].clone();if(R.zeroImage(),Object.assign(R.hdr,{scl_inter:0,scl_slope:1}),B==="mask"){R.img=d,R.hdr.datatypeCode=2,R.hdr.numBitsPerVoxel=8,R.hdr.intent_code=1002,R.saveToDisk("brainmask.nii.gz");return}R.img=_,R.hdr.intent_code=0,R.saveToDisk("skull_stripped_brain.nii.gz")}function te(){if(L.volumes.length<1){window.alert("No image loaded.");return}L.volumes[0].saveToDisk("input.nii.gz")}async function D(){if(L.volumes.length<1){window.alert("No image loaded.");return}await j(async()=>{await L.saveDocument("brainchomp.nvd")})}const se=[{act:()=>le("brain"),title:"Skull-stripped brain",sub:"input intensities with background set to zero",need:"result"},{act:()=>le("mask"),title:"Brain mask",sub:"binary mask, including accepted edits",need:"result"},{act:te,title:"Input volume",sub:"the loaded image, as shown",need:"img"},{act:D,title:"Scene",sub:"everything, as a .nvd document",need:"img"}];function ae(){const B=L.volumes.length>=1,R=!!d,K=H=>H==="result"?R:B,ne=se.map((H,Be)=>{const xe=K(H.need)?"":" disabled";return`<button type="button" class="save-opt${xe}" data-i="${Be}"${xe?" disabled":""}>
        <span class="save-opt-title">${H.title}</span>
        <span class="save-opt-sub">${H.sub}</span>
      </button>`}).join("");Wt("Save",`<div class="save-options">${ne}</div>`,{hideClose:!0,saveMode:!0});const ve=document.getElementById("dialogMessage");ve&&ve.querySelectorAll(".save-opt:not(.disabled)").forEach(H=>{H.onclick=()=>{const Be=se[parseInt(H.dataset.i,10)],xe=document.getElementById("appDialog");xe&&xe.open&&xe.close(),Be.act()}})}const ye=document.getElementById("saveBtn");ye&&(ye.onclick=ae);const X={R:[1,0,0],L:[-1,0,0],A:[0,1,0],P:[0,-1,0],S:[0,0,1],I:[0,0,-1]},oe={R:"Right",L:"Left",A:"Anterior (nose)",P:"Posterior (tail)",S:"Superior (back)",I:"Inferior (belly)"},V=B=>X[B].findIndex(R=>R!==0);function fe(){if(L.volumes.length<1||n||p?.active||(d||L.drawBitmap?.some(Boolean))&&!window.confirm("Reorienting discards the segmentation, its edits and any pending drawing. Continue?"))return;const B=[];Wt("Reorient","",{hideClose:!0,saveMode:!0});const R=document.getElementById("dialogMessage"),K=()=>{const ne=B.map(V),ve=Object.keys(X).filter(xe=>!ne.includes(V(xe))),H=["A","S","L"][B.length],Be=ve.map(xe=>`<button type="button" class="save-opt" data-d="${xe}"><span class="save-opt-title">${oe[xe]}</span></button>`);H==="L"&&Be.push('<button type="button" class="save-opt" data-d="?"><span class="save-opt-title">Not sure</span><span class="save-opt-sub">assume the scan is not mirrored</span></button>'),R.innerHTML=`<p>Step ${B.length+1} of 3: the <b>${H}</b> label actually points toward the animal's</p><div class="save-options">${Be.join("")}</div>`,R.querySelectorAll(".save-opt").forEach(xe=>{xe.onclick=()=>{if(B.push(xe.dataset.d),B.length<3)return K();document.getElementById("appDialog").close(),ie(B)}})};K()}async function ie([B,R,K]){if(B==="A"&&R==="S"&&(K==="L"||K==="?"))return;const ne=X[B],ve=X[R],H=K==="?"?[ne[1]*ve[2]-ne[2]*ve[1],ne[2]*ve[0]-ne[0]*ve[2],ne[0]*ve[1]-ne[1]*ve[0]]:X[K].map(Me=>-Me),Be=[0,1,2].map(Me=>[H[Me],ne[Me],ve[Me]]),xe=L.volumes[0],Ee=await xe.saveToDisk("");for(T(Ee,xe.hdr.affine,Be),z(),M(),L.closeDrawing(),C(-1);L.volumes.length;)await L.removeVolume(L.volumes.at(-1));await L.loadFromArrayBuffer(Ee.buffer,`${xe.name.replace(/(_reoriented)?(\.nii)?(\.gz)?$/i,"")}_reoriented.nii`)}const ge=document.getElementById("reorientBtn");ge&&(ge.onclick=fe);function Q(B,R,K){const ve=new Map,H=R.length;for(let Ee=0;Ee<H;Ee++){const Me=R[Ee];if(Me===0)continue;let $e=ve.get(Me);$e||($e={count:0,sum:0,sumSq:0,hist:new Float64Array(256)},ve.set(Me,$e));const je=B[Ee];$e.count++,$e.sum+=je,$e.sumSq+=je*je,$e.hist[je]++}const Be=(Ee,Me,$e)=>{const je=$e*Me;let ct=0;for(let gt=0;gt<Ee.length;gt++)if(ct+=Ee[gt],ct>=je)return gt;return Ee.length-1},xe=[];for(const[Ee,Me]of[...ve.entries()].sort(($e,je)=>$e[0]-je[0])){const $e=Me.sum/Me.count,je=Math.max(0,Me.sumSq/Me.count-$e*$e);let ct=0,gt=0;for(let vt=0;vt<Me.hist.length;vt++)if(Me.hist[vt]>0){ct=vt;break}for(let vt=Me.hist.length-1;vt>=0;vt--)if(Me.hist[vt]>0){gt=vt;break}xe.push({label:Ee,name:r&&r[Ee]!=null?r[Ee]:`label_${Ee}`,voxels:Me.count,volume_mm3:Me.count*K,min:ct,max:gt,q1:Be(Me.hist,Me.count,.25),median:Be(Me.hist,Me.count,.5),q3:Be(Me.hist,Me.count,.75),mean:$e,stdev:Math.sqrt(je)})}return xe}function ce(B){const R=["label","name","voxels","volume_mm3","min","max","q1","median","q3","mean","stdev"],K=H=>Number.isInteger(H)?String(H):H.toFixed(6),ne=H=>/[",\n]/.test(H)?`"${String(H).replace(/"/g,'""')}"`:String(H),ve=[R.join(",")];for(const H of B)ve.push([H.label,ne(H.name),H.voxels,K(H.volume_mm3),H.min,H.max,H.q1,H.median,H.q3,K(H.mean),K(H.stdev)].join(","));return ve.join(`
`)+`
`}function W(B){const R=new Blob([ce(B)],{type:"text/csv"}),K=URL.createObjectURL(R),ne=document.createElement("a");ne.href=K,ne.download="mask_stats.csv",document.body.appendChild(ne),ne.click(),ne.remove(),URL.revokeObjectURL(K)}const O=B=>String(B).replace(/[&<>"]/g,R=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[R]),v=B=>{const R=B/1e3;return R>=10?Math.round(R).toLocaleString():R.toFixed(1)};function F(B,R){const K=Math.max(...B.map(H=>H.volume_mm3)),ne=H=>o&&o.R&&o.R[H.label]!=null?`rgb(${o.R[H.label]},${o.G[H.label]},${o.B[H.label]})`:"#6b9bd1";let ve="";for(const H of B){const Be=R>0?H.volume_mm3/R*100:0,xe=K>0?H.volume_mm3/K*100:0,Ee=`<span class="stat-val" data-cm3="${v(H.volume_mm3)}" data-pct="${Be.toFixed(1)}%">${v(H.volume_mm3)}</span>`,Me=`<span class="stat-bar" style="width:${xe.toFixed(2)}%;background:${ne(H)}" data-w-abs="${xe.toFixed(2)}" data-w-pct="${Be.toFixed(2)}"></span>`,$e=(ct,gt)=>`<div><span class="k">${ct}</span><span class="v">${gt}</span></div>`,je=$e("min",H.min)+$e("max",H.max)+$e("Q1",H.q1)+$e("Q3",H.q3)+$e("median",H.median)+$e("mean",H.mean.toFixed(2))+$e("SD",H.stdev.toFixed(2))+$e("voxels",H.voxels.toLocaleString());ve+=`
        <div class="stat-row" role="button" tabindex="0" data-label="${H.label}" style="cursor:pointer">
          <div class="stat-line">
            <span class="stat-name">${O(H.name)}</span>
            <span class="stat-track">${Me}</span>
            ${Ee}
            <button type="button" class="stat-iso" title="Show only this region in the viewer">isolate</button>
          </div>
          <div class="stat-detail" style="display:none">${je}</div>
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
          <span class="stat-total" id="statsUnitLabel">total ${v(R)} cm³</span>
        </div>
        <div class="stat-toggle">
          <button type="button" data-mode="cm3" class="active">cm³</button>
          <button type="button" data-mode="pct">% of total</button>
        </div>
        <div id="statsRows">${ve}</div>
        <div class="stat-actions">
          <button type="button" id="statsDownloadBtn">Download CSV</button>
        </div>
      </div>`}saveStatsBtn.onclick=function(){if(L.volumes.length<2){window.alert("No segmentation to measure (run a model first).");return}const B=L.volumes[0].img,R=a||L.volumes[1].img;if(!B||!R||B.length!==R.length){window.alert("Input and segmentation grids do not match.");return}const K=L.volumes[0].hdr.pixDims||[],ne=K[1]&&K[2]&&K[3]?K[1]*K[2]*K[3]:1;let ve=Q(B,R,ne);if(ve.length===0){window.alert("No non-background labels found in the segmentation.");return}ve=ve.slice().sort((xe,Ee)=>Ee.volume_mm3-xe.volume_mm3);const H=ve.reduce((xe,Ee)=>xe+Ee.volume_mm3,0);Wt("Region volumes",F(ve,H));const Be=document.getElementById("statsPanel");Be&&(Be.querySelectorAll(".stat-toggle button").forEach(xe=>{xe.onclick=()=>{const Ee=xe.dataset.mode;Be.querySelectorAll(".stat-toggle button").forEach(Me=>Me.classList.toggle("active",Me===xe)),document.getElementById("statsUnitLabel").textContent=Ee==="pct"?"100% of segmented volume":`total ${v(H)} cm³`,Be.querySelectorAll(".stat-row").forEach(Me=>{const $e=Me.querySelector(".stat-val"),je=Me.querySelector(".stat-bar");$e.textContent=Ee==="pct"?$e.dataset.pct:$e.dataset.cm3,je.style.width=(Ee==="pct"?je.dataset.wPct:je.dataset.wAbs)+"%"})}}),Be.querySelectorAll(".stat-row").forEach(xe=>{const Ee=()=>{const Me=xe.querySelector(".stat-detail");Me.style.display=Me.style.display==="none"?"grid":"none"};xe.onclick=Ee,xe.onkeydown=Me=>{(Me.key==="Enter"||Me.key===" ")&&(Me.preventDefault(),Ee())}}),Be.querySelectorAll(".stat-iso").forEach(xe=>{xe.onclick=Ee=>{Ee.stopPropagation();const Me=parseInt(xe.closest(".stat-row").dataset.label,10);Number.isNaN(Me)||E(Me);const $e=document.getElementById("appDialog");$e&&$e.open&&$e.close()}}),document.getElementById("statsDownloadBtn").onclick=()=>W(ve))};function N(){opacitySlider0.oninput(),modelSelect.value="-1",L.volumes.length===1&&z()}async function ue(){if(!d||!_||!cr)return;await A(),M();const B=await L.volumes[0].clone();if(B.zeroImage(),Object.assign(B.hdr,{scl_inter:0,scl_slope:1}),r=null,o=null,m?.checked){B.img=d;const R=["Background","Brain Mask"];r=R.slice();const K=[0,217],ne=[0,119],ve=[0,33];o={R:K,G:ne,B:ve},B.setColormapLabel({R:K,G:ne,B:ve,labels:R}),B.hdr.datatypeCode=2,B.hdr.numBitsPerVoxel=8,B.hdr.intent_code=1002}else{B.img=_,B.hdr.intent_code=0,B.colormap=L.colormaps().includes("copper2")?"copper2":"actc";const R=de(.98);R>0&&(B.cal_min=0,B.cal_max=R)}B.opacity=opacitySlider1.value/255,await L.addVolume(B)}function de(B){const R=_,K=d;let ne=0;for(let Be=0;Be<K.length;Be++)ne+=K[Be];if(ne===0)return 0;const ve=Math.max(1,Math.floor(ne/2e5)),H=[];for(let Be=0,xe=0;Be<K.length;Be++)K[Be]&&xe++%ve===0&&H.push(R[Be]);return H.sort((Be,xe)=>Be-xe),H[Math.min(H.length-1,Math.floor(B*H.length))]}async function Pe(B,R){p?.invalidate(),cr=R,d=Uint8Array.from(B,ne=>ne?1:0),_=new L.volumes[0].img.constructor(B.length);const K=L.volumes[0].img;for(let ne=0;ne<B.length;ne++)_[ne]=K[ne]*d[ne];m&&(m.disabled=!1),await ue(),p?.updateAvailability()}async function ke(B){if(typeof B=="string")try{B=JSON.parse(B)}catch(R){console.error("Failed to parse telemetry data",R);return}B=await Ci(B,L.gl),e=`:: Diagnostics https://github.com/neuroneural/brainchomp/issues ::
`;for(const R in B)B[R]!==null&&B[R]!==void 0&&(e+=`${R}: ${B[R]}
`)}function he(B="",R=-1,K="",ne=[]){B&&(console.log(B),document.getElementById("location").innerHTML=B),R===null?modelProgress.removeAttribute("value"):isNaN(R)?(memstatus.style.color="red",memstatus.innerHTML="Memory Issue"):R>=0&&(modelProgress.value=R*modelProgress.max),K&&Wt("Message",An(String(K)).replace(/\n/g,"<br>")),ne&&Object.keys(ne).length>0&&ke(ne)}function we(B){n||(document.getElementById("location").innerHTML=B.string.split("   ").map(R=>R.trim()).filter(R=>R!=="").map(R=>`<span class="loc-seg">${R}</span>`).join('<span class="loc-sep">&middot;</span>'))}const pe={backColor:[0,0,0,1],show3Dcrosshair:!0,isOrientCube:!0,onLocationChange:we},L=new vs(pe);await L.attachTo("gl1"),L.setGamma(2),p=Es({nv:L,getState:()=>d?{mask:d,dims:L.volumes[0].hdr.dims.slice(1,4),affine:L.volumes[0].hdr.affine,running:n}:null,prepare:async()=>{M(),m.checked=!0,await ue()},onPatch:({rect:B})=>{const[R,K,ne,ve]=B,[H,Be,xe]=L.volumes[0].hdr.dims.slice(1,4),Ee=L.volumes[0].img;for(let Me=0;Me<xe;Me++)for(let $e=K;$e<=ve;$e++)for(let je=R;je<=ne;je++){const ct=je+H*($e+Be*Me);_[ct]=Ee[ct]*d[ct]}},onError:B=>Wt("Sculpting",An(B.message))}),L.gl.canvas.addEventListener("click",Z),window.addEventListener("keydown",B=>{B.key!=="Escape"||i===null||document.querySelector("dialog[open]")||(i=null,k())});const We=L.gl.uniform4fv.bind(L.gl);L.gl.uniform4fv=function(B,R){if(i!==null){const K=L.orientShaderAtlasU&&L.orientShaderAtlasU.uniforms.xyzaFrac,ne=L.orientShaderAtlasI&&L.orientShaderAtlasI.uniforms.xyzaFrac;if(K&&B===K||ne&&B===ne)return We(B,[0,0,0,R[3]])}return We(B,R)};const Oe=L.drawSceneCore.bind(L);L.drawSceneCore=function(){const B=Oe();try{q()}catch(R){console.warn("isolation HUD draw failed",R)}return B},Object.assign(L.opts,{dragMode:L.dragModes.slicer3D,multiplanarForceRender:!0,yoke3Dto2DZoom:!0,crosshairGap:11});{const B=document.getElementById("dragSegmented");B&&B.querySelectorAll("button").forEach(R=>R.classList.toggle("active",parseInt(R.dataset.drag,10)===L.opts.dragMode))}L.setInterpolation(!0);async function bt(B){for(z();L.volumes.length;)await L.removeVolume(L.volumes[L.volumes.length-1]);M(),await L.loadVolumes([{url:B}])}L.onImageLoaded=N,f&&(f.onchange=()=>bt(f.value),await bt(f.value)),modelSelect.innerHTML="";const dt=document.createElement("option");dt.text="Run Segmentation Model",dt.value="-1",dt.disabled=!0,dt.selected=!0,dt.hidden=!0,modelSelect.appendChild(dt);for(let B=0;B<_n.length;B++){console.log(`Adding model option: ${_n[B].modelName}`);const R=document.createElement("option");R.text=_n[B].modelName,R.value=B,_n[B].type==="Divider"&&(R.disabled=!0),modelSelect.appendChild(R)}Di(L),Ui(L),modelSelect.value="-1",C(-1),await Xi();const Kt=new URLSearchParams(window.location.search).get("model");Kt&&Kt<_n.length&&(modelSelect.value=Kt,me())}function An(e){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function Wt(e,t,n={}){const r=document.getElementById("appDialog"),o=document.getElementById("dialogTitle"),s=document.getElementById("dialogMessage"),i=document.getElementById("dialogCloseBtn");if(!r)return;o.textContent=e,s.innerHTML=t,i.style.display=n.hideClose?"none":"",i.onclick=()=>r.close(),r.classList.toggle("dialog-save",!!n.saveMode);const a=document.getElementById("dialogXBtn");a&&(a.onclick=()=>r.close()),r.showModal()}async function Zi(){try{const e=await fetch("https://api.github.com/repos/neuroneural/brainchomp");if(!e.ok)return;const t=await e.json();typeof t.stargazers_count=="number"&&(document.getElementById("star-count").textContent=String(t.stargazers_count))}catch(e){console.error("Error fetching star count:",e)}}(async function(){await Yi(),await Zi()})();
