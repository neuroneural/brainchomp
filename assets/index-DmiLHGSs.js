var We=Object.defineProperty,$e=Object.defineProperties;var De=Object.getOwnPropertyDescriptors;var ve=Object.getOwnPropertySymbols;var qe=Object.prototype.hasOwnProperty,Ve=Object.prototype.propertyIsEnumerable;var de=(e,l,i)=>l in e?We(e,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[l]=i,Ta=(e,l)=>{for(var i in l||(l={}))qe.call(l,i)&&de(e,i,l[i]);if(ve)for(var i of ve(l))Ve.call(l,i)&&de(e,i,l[i]);return e},Ba=(e,l)=>$e(e,De(l));var N=(e,l,i)=>new Promise((u,n)=>{var t=c=>{try{s(i.next(c))}catch(v){n(v)}},b=c=>{try{s(i.throw(c))}catch(v){n(v)}},s=c=>c.done?u(c.value):Promise.resolve(c.value).then(t,b);s((i=i.apply(e,l)).next())});import{m as je}from"./vendor-gTbkpY2o.js";import{S as Na,a as Ye,M as Qa,N as Xe}from"./vendor-niivue-Czlz1REu.js";import{l as He,t as Va,s as Ze,d as Ca,b as he,a as ga,z as Ke,g as Pe,w as ja,f as Ue,m as Qe,o as Je,c as te,e as at,h as ie,i as Ka,r as _e,j as et,k as me,n as tt,p as lt,q as xe,u as Pa,v as Ce,x as it,y as Ia,A as rt,B as Ja,C as nt,D as ut}from"./vendor-tf-DGuKl8vL.js";import"./vendor-math-CA38DMGy.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const b of t.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&u(b)}).observe(document,{childList:!0,subtree:!0});function i(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(n){if(n.ep)return;n.ep=!0;const t=i(n);fetch(n.href,t)}})();const st={batchSize:1,numOfChan:1,isColorEnable:!0,isAutoColors:!0,bgLabelValue:0,drawBoundingVolume:!1,isGPU:!0,isBrainCropMaskBased:!0,showPhase1Output:!1,isPostProcessEnable:!0,fillSuppressedWithNeighborLabel:!1,diagnoseEnclosedComponents:!1,isContoursViewEnable:!1,browserArrayBufferMaxZDim:30,telemetryFlag:!1,chartXaxisStepPercent:10,uiSampleName:"Brainchomp sample",atlasSelectedColorTable:"Fire"},ft={path:"/models/rodent/model.json",webgpu_safetensor:"./models/rodent/model.safetensors",webgpu_runner:"rodent",forceFP32:!1,webgpuStorageSize:536870912,numClasses:2,preModelId:null,preModelPostProcess:!1,isBatchOverlapEnable:!1,numOverlapBatches:0,enableTranspose:!0,enableCrop:!1,cropPadding:0,autoThreshold:0,enableQuantileNorm:!1,filterOutWithPreMask:!1,enableSeqConv:!0,textureSize:0,isPostProcessEnable:!0,returnMaskForExtraction:!0,inferenceDelay:100,warning:null},wa=[Ba(Ta({},ft),{id:1,type:"Brain_Extraction",modelName:"Skull-strip",description:"Extract the rodent brain and save the input intensities with non-brain voxels set to zero."})];class ot{idx(l,i,u,n){return u*n[0]*n[1]+i*n[0]+l}check_previous_slice(l,i,u,n,t,b,s,c,v,p){let U=0;if(!t)return 0;const y=l[this.idx(u,n,t,b)];if(s>=6){const d=this.idx(u,n,t-1,b);y===l[d]&&(v[U++]=i[d])}if(s>=18){if(u){const d=this.idx(u-1,n,t-1,b);y===l[d]&&(v[U++]=i[d])}if(n){const d=this.idx(u,n-1,t-1,b);y===l[d]&&(v[U++]=i[d])}if(u<b[0]-1){const d=this.idx(u+1,n,t-1,b);y===l[d]&&(v[U++]=i[d])}if(n<b[1]-1){const d=this.idx(u,n+1,t-1,b);y===l[d]&&(v[U++]=i[d])}}if(s===26){if(u&&n){const d=this.idx(u-1,n-1,t-1,b);y===l[d]&&(v[U++]=i[d])}if(u<b[0]-1&&n){const d=this.idx(u+1,n-1,t-1,b);y===l[d]&&(v[U++]=i[d])}if(u&&n<b[1]-1){const d=this.idx(u-1,n+1,t-1,b);y===l[d]&&(v[U++]=i[d])}if(u<b[0]-1&&n<b[1]-1){const d=this.idx(u+1,n+1,t-1,b);y===l[d]&&(v[U++]=i[d])}}return U?(this.fill_tratab(c,v,U,p),v[0]):0}do_initial_labelling(l,i,u){const n=new Uint32Array(32),t=new Uint32Array(32);let b=1;const s=8192;let c=s,v=new Uint32Array(c).fill(0);const p=new Uint32Array(i[0]*i[1]*i[2]).fill(0),U=new Uint32Array(27);for(let y=0;y<i[2];y++)for(let d=0;d<i[1];d++)for(let S=0;S<i[0];S++){let _=0;const C=l[this.idx(S,d,y,i)];if(C!==0){if(U[0]=this.check_previous_slice(l,p,S,d,y,i,u,v,n,t),U[0]&&(_+=1),u>=6){if(S){const x=this.idx(S-1,d,y,i);C===l[x]&&(U[_++]=p[x])}if(d){const x=this.idx(S,d-1,y,i);C===l[x]&&(U[_++]=p[x])}}if(u>=18){if(d&&S){const x=this.idx(S-1,d-1,y,i);C===l[x]&&(U[_++]=p[x])}if(d&&S<i[0]-1){const x=this.idx(S+1,d-1,y,i);C===l[x]&&(U[_++]=p[x])}}if(_)p[this.idx(S,d,y,i)]=U[0],this.fill_tratab(v,U,_,t);else{if(p[this.idx(S,d,y,i)]=b,b>=c){c+=s;const x=new Uint32Array(c);x.set(v),v=x}v[b-1]=b,b++}}}for(let y=0;y<b-1;y++){let d=y;for(;v[d]!==d+1;)d=v[d]-1;v[y]=d+1}return[b-1,v,p]}fill_tratab(l,i,u,n){let b=2147483647;for(let s=0;s<u;s++){let c=i[s];for(;l[c-1]!==c;)c=l[c-1];n[s]=c,b=Math.min(b,c)}for(let s=0;s<u;s++)l[n[s]-1]=b}translate_labels(l,i,u,n){const t=i[0]*i[1]*i[2];let b=0;const s=new Uint32Array(t).fill(0);for(let p=0;p<n;p++)b=Math.max(b,u[p]);const c=new Uint32Array(b).fill(0);let v=0;for(let p=0;p<t;p++)l[p]&&(c[u[l[p]-1]-1]||(v+=1,c[u[l[p]-1]-1]=v),s[p]=c[u[l[p]-1]-1]);return[v,s]}neighbor_winners(l,i,u,n){const t=i[0],b=i[1],s=i[2],c=t*b,v=new Map,p=(y,d)=>{let S=v.get(y);S||(S=new Map,v.set(y,S)),S.set(d,(S.get(d)||0)+1)};for(let y=0;y<s;y++)for(let d=0;d<b;d++)for(let S=0;S<t;S++){const _=y*c+d*t+S,C=l[_];if(C===0||u[C])continue;let x;S>0&&(x=u[l[_-1]])&&p(C,x),S<t-1&&(x=u[l[_+1]])&&p(C,x),d>0&&(x=u[l[_-t]])&&p(C,x),d<b-1&&(x=u[l[_+t]])&&p(C,x),y>0&&(x=u[l[_-c]])&&p(C,x),y<s-1&&(x=u[l[_+c]])&&p(C,x)}const U=new Uint32Array(n+1).fill(0);for(const[y,d]of v){let S=0,_=0;for(const[C,x]of d)(x>_||x===_&&(S===0||C<S))&&(_=x,S=C);U[y]=S}return U}finalize_volume(l,i,u,n,t){const b=l.length,s=new Uint32Array(b).fill(0),c=t?this.neighbor_winners(l,i,u,n):null;let v=0;for(let p=0;p<b;p++){const U=l[p];if(U===0)continue;let y=u[U];!y&&c&&(y=c[U]),y&&(s[p]=y,y>v&&(v=y))}return[v,s]}diagnose_components(l,i,u,n,t={}){var E,g,f;const b=(E=t.topN)!=null?E:50,s=(g=t.minSize)!=null?g:1,c=(f=t.label)!=null?f:"diag",v=n[0],p=n[1],U=n[2],y=v*p,d=new Uint32Array(i+1),S=new Uint32Array(i+1);for(let M=0;M<l.length;M++){const G=u[M];G&&(d[G]=l[M],S[G]++)}const _=new Map,C=new Uint32Array(i+1),x=new Uint32Array(i+1),T=(M,G)=>{let D=_.get(M);D||(D=new Map,_.set(M,D)),D.set(G,(D.get(G)||0)+1)};for(let M=0;M<U;M++)for(let G=0;G<p;G++)for(let D=0;D<v;D++){const I=M*y+G*v+D,W=u[I];if(!W)continue;const R=d[W],Z=ia=>{const H=u[ia];if(H===W)return;x[W]++;const Ua=H?d[H]:0;Ua===0?C[W]++:Ua!==R&&T(W,Ua)};D>0&&Z(I-1),D<v-1&&Z(I+1),G>0&&Z(I-v),G<p-1&&Z(I+v),M>0&&Z(I-y),M<U-1&&Z(I+y)}const B=new Map,F=new Map;for(let M=1;M<=i;M++){const G=d[M];B.set(G,(B.get(G)||0)+1),(!F.has(G)||S[M]>F.get(G))&&F.set(G,S[M])}const $=[];for(let M=1;M<=i;M++){if(S[M]<s)continue;const G=d[M],D=_.get(M);let I=0,W=0,R=0;if(D)for(const[ia,H]of D)R+=H,H>W&&(W=H,I=ia);const Z=x[M]||1;$.push({comp:M,class:G,size:S[M],largestOfClass:S[M]===F.get(G)?"Y":"n",compsInClass:B.get(G),domNeighbor:I,domFracForeign:R?+(W/R).toFixed(2):0,domFracBoundary:+(W/Z).toFixed(2),bgFrac:+(C[M]/Z).toFixed(2)})}$.sort((M,G)=>G.domFracForeign-M.domFracForeign||G.size-M.size);const X=(M,G)=>{const D=G.map(W=>Math.max(W.h.length,...M.map(R=>String(R[W.k]).length))),I=W=>W.map((R,Z)=>String(R).padStart(D[Z])).join("  ");return[I(G.map(W=>W.h)),...M.map(W=>I(G.map(R=>W[R.k])))].join(`
`)},a=[{k:"comp",h:"comp"},{k:"class",h:"class"},{k:"size",h:"size"},{k:"largestOfClass",h:"lrg"},{k:"compsInClass",h:"nComp"},{k:"domNeighbor",h:"domNbr"},{k:"domFracForeign",h:"encF"},{k:"domFracBoundary",h:"encB"},{k:"bgFrac",h:"bgF"}];console.log(`[${c}] total components=${i}, distinct classes=${B.size}
[${c}] island candidates (encF≈1 + small size + lrg=n ⇒ swallowed island):
`+X($.slice(0,b),a));const O=[...B.entries()].map(([M,G])=>({class:M,components:G,maxCompSize:F.get(M)})).sort((M,G)=>G.components-M.components);return console.log(`[${c}] per-class component counts (components=1 ⇒ fully connected):
`+X(O.slice(0,30),[{k:"class",h:"class"},{k:"components",h:"comps"},{k:"maxCompSize",h:"maxSize"}])),$}largest_original_cluster_labels(l,i,u,n=null,t=!1){const b=l.length,s=new Uint32Array(i+1).fill(0),c=new Uint32Array(i+1).fill(0);for(let v=0;v<b;v++){const p=l[v],U=u[v];s[U]=p,c[U]++}for(let v=0;v<i+1;v++){const p=s[v];for(let U=0;U<i+1;U++)U!==v&&p===s[U]&&(c[v]<c[U]||c[v]===c[U]&&v<U)&&(s[v]=0)}return this.finalize_volume(u,n,s,i,t)}filter_clusters(l,i,u,n,t=null,b=!1){const s=l.length,c=new Uint32Array(i+1).fill(0),v=new Uint32Array(i+1).fill(0);for(let y=0;y<s;y++){const d=l[y],S=u[y];S>0&&(c[S]=d,v[S]++)}const p=new Uint8Array(i+1).fill(1);for(let y=1;y<=i;y++){const d=c[y];if(n==="all"||n.has&&n.has(d)){for(let _=1;_<=i;_++)if(y!==_&&c[_]===d){if(v[_]>v[y]){p[y]=0;break}else if(v[_]===v[y]&&_<y){p[y]=0;break}}}}const U=new Uint32Array(i+1).fill(0);for(let y=1;y<=i;y++)p[y]&&(U[y]=c[y]);return this.finalize_volume(u,t,U,i,b)}filter_clusters_by_ratio(l,i,u,n,t=null,b=!1){const s=l.length,c=new Uint32Array(i+1).fill(0),v=new Uint32Array(i+1).fill(0);for(let d=0;d<s;d++){const S=u[d];S>0&&(c[S]===0&&(c[S]=l[d]),v[S]++)}const p=new Map;for(let d=1;d<=i;d++){const S=c[d],_=v[d];(!p.has(S)||_>p.get(S))&&p.set(S,_)}const U=new Uint8Array(i+1).fill(0);for(let d=1;d<=i;d++){const S=c[d],_=v[d],C=p.get(S)||0;_>=C*n&&(U[d]=1)}const y=new Uint32Array(i+1).fill(0);for(let d=1;d<=i;d++)U[d]&&(y[d]=c[d]);return this.finalize_volume(u,t,y,i,b)}bwlabel(l,i,u=26,n=!1,t=!1){const b=Date.now(),s=i[0]*i[1]*i[2],c=new Uint32Array(s).fill(0);if(![6,18,26].includes(u))return console.log("bwlabel: conn must be 6, 18 or 26."),[0,c];if(i[0]<2||i[1]<2||i[2]<1)return console.log("bwlabel: img must be 2 or 3-dimensional"),[0,c];if(n)for(let S=0;S<s;S++)l[S]!==0&&(c[S]=1);else c.set(l);let[v,p,U]=this.do_initial_labelling(c,i,u);p===void 0&&(p=new Uint32Array(0));const[y,d]=this.translate_labels(U,i,p,v);if(console.log(u+" neighbor clustering into "+y+" regions in "+(Date.now()-b)+"ms"),t){const[S,_]=this.largest_original_cluster_labels(c,y,d);return[S,_]}return[y,d]}filter_clusters_by_rank(l,i,u,n,t=0,b=null,s=!1,c=null,v=!1){const p=l.length,U=new Uint32Array(i+1).fill(0),y=new Uint32Array(i+1).fill(0),d=c!=null&&Array.isArray(b)&&b.length===3,S=d?b[0]:0,_=d?b[1]:0,C=d?new Int32Array(i+1).fill(2147483647):null,x=d?new Int32Array(i+1).fill(-1):null,T=d?new Int32Array(i+1).fill(2147483647):null,B=d?new Int32Array(i+1).fill(-1):null,F=d?new Int32Array(i+1).fill(2147483647):null,$=d?new Int32Array(i+1).fill(-1):null;for(let f=0;f<p;f++){const M=u[f];if(M>0&&(U[M]===0&&(U[M]=l[f]),y[M]++,d)){const G=f%S,D=f/S|0,I=D%_,W=D/_|0;G<C[M]&&(C[M]=G),G>x[M]&&(x[M]=G),I<T[M]&&(T[M]=I),I>B[M]&&(B[M]=I),W<F[M]&&(F[M]=W),W>$[M]&&($[M]=W)}}let X=null,a=0;if(d){let f=-1;for(let R=1;R<=i;R++)y[R]>f&&(f=y[R],a=R);const M=Math.max(2,Math.ceil(c)+4),G=S*_,D=new Int16Array(p).fill(-1);let I=[];for(let R=0;R<p;R++)u[R]===a&&(D[R]=0,I.push(R));for(let R=1;R<=M&&I.length;R++){const Z=[];for(let ia=0;ia<I.length;ia++){const H=I[ia],Ua=H%S,_a=(H/S|0)%_;Ua>0&&D[H-1]===-1&&(D[H-1]=R,Z.push(H-1)),Ua<S-1&&D[H+1]===-1&&(D[H+1]=R,Z.push(H+1)),_a>0&&D[H-S]===-1&&(D[H-S]=R,Z.push(H-S)),_a<_-1&&D[H+S]===-1&&(D[H+S]=R,Z.push(H+S)),H-G>=0&&D[H-G]===-1&&(D[H-G]=R,Z.push(H-G)),H+G<p&&D[H+G]===-1&&(D[H+G]=R,Z.push(H+G))}I=Z}const W=M+1;X=new Float64Array(i+1).fill(W);for(let R=0;R<p;R++){const Z=u[R];if(Z>0&&Z!==a){const ia=D[R]>=0?D[R]:W;ia<X[Z]&&(X[Z]=ia)}}v&&console.log(`[rank-filter] brain comp=${a} size=${f} bbox A[${C[a]},${x[a]}] B[${T[a]},${B[a]}] C[${F[a]},${$[a]}] | maxGap=${c} scan=${M}`)}const O=new Map;for(let f=1;f<=i;f++){const M=U[f],G=y[f];O.has(M)||O.set(M,[]),O.get(M).push({i:f,size:G})}const E=new Uint8Array(i+1).fill(0);for(const[f,M]of O.entries()){M.sort((W,R)=>R.size-W.size);const G=M.length?M[0].size:0,D=t>0?G*t:0,I=Math.min(M.length,n);for(let W=0;W<I;W++){const R=M[W];if(R.size<D){v&&W>0&&console.log(`[rank-filter] class ${f} #${W}: size=${R.size} DROP (below ${(t*100).toFixed(0)}% floor)`);break}if(W>0&&d){const Z=X[R.i],ia=Z<=c;if(v&&console.log(`[rank-filter] class ${f} #${W}: size=${R.size} surfDist=${Z} -> ${ia?"KEEP":"DROP (too far)"}`),!ia)continue}E[R.i]=1}}const g=new Uint32Array(i+1).fill(0);for(let f=1;f<=i;f++)E[f]&&(g[f]=U[f]);return this.finalize_volume(u,b,g,i,s)}}function ct(e,l,i){return N(this,null,function*(){const[u,n,t,b,s,c]=yield Ut(l),v=n-u+1,p=b-t+1,U=c-s+1,y=(O,E,g,f)=>{const M=Math.min(O,f),G=Math.min(255-E,f),D=Math.max(0,O-M),I=Math.min(255,E+G);return[D,I]},[d,S]=y(u,n,v,i),[_,C]=y(t,b,p,i),[x,T]=y(s,c,U,i);let B=e.slice([d,_,x],[S-d+1,C-_+1,T-x+1]);const F=B.shape,$=F[0]%2,X=F[1]%2,a=F[2]%2;return $||X||a?(B=B.pad([[0,$],[0,X],[0,a]]),console.log(`Padded to even dims: [${F}] -> [${B.shape}]`)):console.log(`Crop dimensions (already even): [${F}]`),{cropped:B,corner:[d,_,x],padding:[$,X,a]}})}function vt(n,t,b){return N(this,arguments,function*(e,l,i,u=[0,0,0]){const[s,c,v]=l,[p,U,y]=i,[d,S,_]=e.shape,[C,x,T]=u||[0,0,0],B=Math.max(0,s+C),F=Math.max(0,c+x),$=Math.max(0,v+T),X=[[B,Math.max(0,p-d-B)],[F,Math.max(0,U-S-F)],[$,Math.max(0,y-_-$)]],a=e.pad(X);if(a.shape[0]>p||a.shape[1]>U||a.shape[2]>y){const O=a.slice([0,0,0],[p,U,y]);return a.dispose(),O}return a})}function dt(e,l){return N(this,null,function*(){const i=e.max(),u=i.mul(l),n=yield u.data();return i.dispose(),u.dispose(),ga(()=>e.clone().greater(n[0]))})}function gt(e,l=.01,i=.99){return N(this,null,function*(){const u=e.flatten(),n=u.shape[0],t=yield u.data();u.dispose();const b=Math.min(1e5,n);let s;if(b>=n)s=Array.from(t);else{s=new Array(b);for(let d=0;d<b;d++){const S=Math.floor(Math.random()*n);s[d]=t[S]}}s.sort((d,S)=>d-S);const c=s.length,v=Math.floor(c*l),p=Math.ceil(c*i)-1,U=s[v],y=s[p];return{qmin:U,qmax:y}})}function bt(e,l,i,u,n,t,b){return N(this,null,function*(){const s=e.shape[4],c=l.shape[4];let v=null;for(let p=0;p<c;p++){const U=Math.ceil(s/b);let y=null;for(let S=0;S<U;S++){const _=S*b,C=Math.min((S+1)*b,s);if(_<s){const x=ga(()=>{const T=e.slice([0,0,0,0,_],[-1,-1,-1,-1,C-_]),B=l.slice([0,0,0,_,p],[-1,-1,-1,C-_,1]);return Ka(T,B,u,n,"NDHWC",t)});if(y===null)y=x;else{const T=y.add(x);y.dispose(),x.dispose(),y=T}}}let d;if(i){const S=i.slice([p],[1]);d=y.add(S),y.dispose(),S.dispose()}else d=y;if(v==null)v=d;else{const S=yield ie([v,d],4);d.dispose(),v.dispose(),v=S}}return v})}function pt(e,l=1e-5){return ga(()=>{const{mean:i,variance:u}=lt(e,[1,2,3],!0),n=_e(u.add(l));return e.sub(i).mul(n)})}function yt(e,l,i,u,n,t,b){return N(this,null,function*(){const s=e.shape[4],c=l.shape[4];let v=null;for(let p=0;p<c;p++){const U=Math.ceil(s/b);let y=null;for(let _=0;_<U;_++){const C=_*b,x=Math.min((_+1)*b,s);if(C<s){const T=ga(()=>{const B=e.slice([0,0,0,0,C],[-1,-1,-1,-1,x-C]),F=l.slice([0,0,0,C,p],[-1,-1,-1,x-C,1]);return Ka(B,F,u,n,"NDHWC",t)});if(y===null)y=T;else{const B=y.add(T);y.dispose(),T.dispose(),y=B}}}let d;if(i){const _=i.slice([p],[1]);d=y.add(_),y.dispose(),_.dispose()}else d=y;const S=pt(d);if(d.dispose(),v===null)v=S;else{const _=yield ie([v,S],4);S.dispose(),v.dispose(),v=_}}return v})}function Ge(e,l,i,u,n,t,b,s){const c=e.length;return ga(()=>{let v=null;const p=Math.ceil(c/s);for(let U=0;U<p;U++){const y=U*s,d=Math.min((U+1)*s,c),S=d-y,_=S===1?e[y]:ie(e.slice(y,d),4),C=l.slice([0,0,0,y,u],[-1,-1,-1,S,1]),x=Ka(_,C,n,t,"NDHWC",b);v=v===null?x:v.add(x)}return i&&(v=v.add(i.slice([u],[1]))),v})}function ge(e,l,i,u,n,t,b,s=!1){const c=l.shape[4],v=[];for(let p=0;p<c;p++){let U=Ge(e,l,i,p,u,n,t,b);if(s){const y=Me(U);U.dispose(),U=y}v.push(U)}return v}function St(e,l,i,u,n,t){const b=l.shape[3],s=l.shape[4],c=[1,u[0],u[1],u[2],1],v=[];for(let p=0;p<b;p++){const U=ga(()=>{let y=null;for(let d=0;d<s;d++){const S=l.slice([0,0,0,p,d],[-1,-1,-1,1,1]),_=at(e[d],S,c,n,t);y=y===null?_:y.add(_)}return i&&(y=y.add(i.slice([p],[1]))),y});v.push(U)}return v}function ht(e,l,i,u,n,t,b,s=!0){return N(this,null,function*(){const c=l.shape[4],v=3;let p=null,U=null,y=null;for(let d=0;d<c;d++){const S=Ge(e,l,i,d,u,n,t,v);y===null&&(y=[S.shape[1],S.shape[2],S.shape[3]]);const _=ga(()=>S.reshape(y));if(S.dispose(),p===null)p=_,U=Ke(_);else{const[C,x]=ga(()=>{const T=Pe(_,p);return[ja(T,_,p),ja(T,Ue(U.shape,d),U)]});p.dispose(),U.dispose(),_.dispose(),p=C,U=x}b&&b(`Final layer class ${d+1}/${c}`,(d+1)/c),!s&&d%8===0&&(yield new Promise(C=>setTimeout(C,0)))}return p.dispose(),U})}function Pt(e){const l=e.shape[4];if(l===1)return[e];const i=[];for(let u=0;u<l;u++)i.push(e.slice([0,0,0,0,u],[-1,-1,-1,-1,1]));return i}function Me(e,l=1e-5){return ga(()=>{const i=e.shape.length,u=e.shape[i-1],n=e.shape[1]*e.shape[2]*e.shape[3],t=e.transpose([0,4,1,2,3]).reshape([u,n]),b=t.mean(1),c=t.sub(b.reshape([u,1])).square().mean(1),v=_e(et(c,l)),p=b.reshape([1,1,1,1,u]),U=v.reshape([1,1,1,1,u]);return e.sub(p).mul(U)})}function ae(e,l=0){return N(this,null,function*(){let i=[];l===0?i=yield e.max(2).max(1).arraySync():l===1?i=yield e.max(2).max(0).arraySync():i=yield e.max(1).max(0).arraySync();let u=i.length,n=0;for(let t=0;t<i.length;t++)if(i[t]>0){u=t;break}for(let t=i.length-1;t>=0;t--)if(i[t]>0){n=t;break}return[u,n]})}function Ut(e){return N(this,null,function*(){const[l,i]=yield ae(e,0),[u,n]=yield ae(e,1),[t,b]=yield ae(e,2);return console.log("row min and max  :",l,i),console.log("col min and max  :",u,n),console.log("depth min and max  :",t,b),[l,i,u,n,t,b]})}function _t(e,l,i,u,n,t,b,s,c=!0){return N(this,null,function*(){e[0].dtype!=="int32"&&b("",-1,"generateBrainMask assumes int32"),n.preModelPostProcess&&b("",-1,"generateBrainMask assumes BWLabeler instead of preModelPostProcess");const v=e.length,p=e[0].size,U=v*p,y=new Int32Array(U);let d=0;for(let S=0;S<v;S++)y.set(e[S].dataSync(),d),d+=p;for(let S=0;S<U;S++)y[S]=y[S]!==0?1:0;return(c||t.showPhase1Output)&&(s(y,t,n),b("Segmentation finished",0)),Va(y,[l,i,u])})}function mt(e,l,i){return N(this,null,function*(){const u=l.dims[1],n=l.dims[2];let t;if(l.datatypeCode===2)t=new Uint8Array(i);else if(l.datatypeCode===4)t=new Int16Array(i);else if(l.datatypeCode===8)t=new Int32Array(i);else if(l.datatypeCode===16)t=new Float32Array(i);else if(l.datatypeCode===64)t=new Float64Array(i);else if(l.datatypeCode===256)t=new Int8Array(i);else if(l.datatypeCode===512)t=new Uint16Array(i);else if(l.datatypeCode===768)t=new Uint32Array(i);else return;const b=[];let s=0;for(let v=0;v<e;v++){const p=new Array(n*u);let U=0;for(let y=0;y<n;y++)for(let d=0;d<u;d++){const S=t[s++];p[U++]=S&255}b.push(Va(p,[n,u]))}const c=Ze(b);return Ca(b),c})}function Te(e){return N(this,null,function*(){return e.layers.length})}function Ee(e){return N(this,null,function*(){let l=0;for(let i=0;i<e.layers.length;i++)l+=e.layers[i].countParams();return l})}function Ya(e){return N(this,null,function*(){for(let l=0;l<e.layers.length;l++)if(e.layersByDepth[l][0].dataFormat)return e.layersByDepth[l][0].dataFormat==="channelsLast"})}function we(e){return N(this,null,function*(){return yield He(e)})}function re(e){return N(this,null,function*(){const l=e.max(),i=e.min();return yield e.sub(i).div(l.sub(i))})}function xt(e,l,i){const b=e.shape[4],s=Math.ceil(b/i);let c=null;for(let v=0;v<s;v++){const p=v*i,y=Math.min((v+1)*i,b)-p,d=ga(()=>e.slice([0,0,0,0,p],[-1,-1,-1,-1,y])),S=ga(()=>l.slice([0,0,0,p,0],[-1,-1,-1,y,-1])),_=Ka(d,S,1,0,"NDHWC",1);d.dispose(),S.dispose();const C=me(_);if(_.dispose(),c===null)c=C;else{const x=c.add(C);c.dispose(),c!==C&&C.dispose(),c=x}ga(()=>{tt(te([1,1]),te([1,1]))})}return c}function ne(e,l=.05,i=.95){return N(this,null,function*(){const{qmin:u,qmax:n}=yield gt(e,l,i),t=n-u,b=e.sub(u),s=b.div(t);return b.dispose(),s})}class Ct{constructor(l,i,u,n,t=!0){this.model=l,this.outChannels=l.outputLayers[0].kernel.shape[4],this.chunkSize=i,this.isChannelLast=u,this.callbackUI=n,this.isWebWorker=t}apply(l){return N(this,null,function*(){const i=performance.now(),u=this.model.layers[this.model.layers.length-1],n=u.getWeights()[0],t=u.getWeights()[1],b=this.isChannelLast?l.shape.slice(1,-1):l.shape.slice(2);let s=yield Qe(Je(b),-1e4),c=yield te(b);const v=3,p=Math.ceil(this.outChannels/v);for(let d=0;d<p;d++){const S=d*v,_=Math.min((d+1)*v,this.outChannels),[C,x]=yield ga(()=>{let T=s,B=c;for(let F=S;F<_;F++){const $=n.slice([0,0,0,0,F],[-1,-1,-1,-1,1]),X=t.slice([F],[1]),a=xt(l,$,Math.min(this.chunkSize,this.outChannels)).add(X),O=Pe(a,T);T=ja(O,a,T),B=ja(O,Ue(B.shape,F),B)}return[T,B]});Ca([s,c]),s=C,c=x,this.callbackUI(`Processing chunk ${d+1}/${p}`,(d+1)/p),this.isWebWorker||(yield new Promise(T=>setTimeout(T,0)))}const U=c.clone();Ca([s,c]);const y=performance.now();return console.log(`Execution time: ${y-i} milliseconds`),U})}}function Oe(e,l,i,u){return N(this,null,function*(){console.log("Downloading segmentation data from GPU to CPU...");const n=yield e.data(),t=e.shape;if(console.log("Data download complete. Starting CPU processing."),u.isPostProcessEnable){console.log("Applying CPU-based connected-component labeling...");const b=performance.now(),s=new ot,c=[5,14],v=!!u.fillSuppressedWithNeighborLabel||c.includes(i.id),p=t[0]*t[1]*t[2],U=Math.max(1e5,Math.floor(p*.01)),[y,d]=s.bwlabel(n,t,6,!1,!1);if(y>U){const x=`Segmentation produced noise: ${y.toLocaleString()} disconnected regions (cap ${U.toLocaleString()}). The model output is unusable, so post-processing was aborted. Try re-running, switching backend (WebGPU/WebGL2), or another model.`;console.error("[postprocess] "+x);const T=new Error(x);throw T.code="SEGMENTATION_NOISE",T}let S=!1,_=!1;if(i.type==="Brain_Extraction"||i.type==="Brain_Masking"?(S=!0,_=!0):[1,7].includes(i.id)?(S=!1,_=!1):[5,14].includes(i.id)?(S=!1,_=!0):[3,8,9].includes(i.id)?(S=!1,_=!1):(S=!0,_=!0),[1,7].includes(i.id)){const F=y,$=d,[X,a]=s.filter_clusters_by_rank(n,F,$,2,.02,t,v,8,!1);n.set(a)}else if(!_&&[3,8,9].includes(i.id)){const[x,T]=s.bwlabel(n,t,6,!0,!0);for(let O=0;O<n.length;O++)n[O]*=T[O];const[B,F]=s.bwlabel(n,t,6,!1,!1),$=new Set([1,2,5,6,13]),[X,a]=s.filter_clusters(n,B,F,$,t,v);n.set(a)}else if(!S&&_){u.diagnoseEnclosedComponents&&s.diagnose_components(n,y,d,t,{label:`model${i.id}`,topN:60});const[x,T]=s.largest_original_cluster_labels(n,y,d,t,v);n.set(T)}else{const[x,T]=s.bwlabel(n,t,6,S,_);if(S)for(let B=0;B<n.length;B++)n[B]*=T[B];else n.set(T)}const C=((performance.now()-b)/1e3).toFixed(4);console.log(`Connected-component labeling took: ${C} seconds.`)}switch(i.type){case"Brain_Masking":{const b=new Uint8Array(n.length);for(let s=0;s<n.length;s++)b[s]=n[s]!==0?1:0;return b}case"Brain_Extraction":{if(i.returnMaskForExtraction){const s=new Uint8Array(n.length);for(let c=0;c<n.length;c++)s[c]=n[c]!==0?1:0;return s}const b=new l.constructor(n.length);for(let s=0;s<n.length;s++){const c=n[s]!==0?1:0;b[s]=l[s]*c}return b}default:return new Uint8Array(n)}})}function ue(e,l,i){var c;let u=0,n=1;if(i)if(l.length===5)n=l[1]*l[2]*l[3];else for(let v=0;v<l.length;v++)l[v]>1&&(n*=l[v]);else if(l.length===5)n=l[2]*l[3]*l[4];else for(let v=0;v<l.length;v++)l[v]>32&&(n*=l[v]);let t=0,b=0;if(e&&e.layers){const v=e.layers.length;for(let p=0;p<v;p++){const U=e.layers[p],y=p===v-1;let d=0,S=U.outputShape;Array.isArray(S)&&Array.isArray(S[0])&&(S=S[0]),Array.isArray(S)&&(i?d=S[S.length-1]:d=S[1]);let _=0;const C=U.batchInputShape,x=T=>Array.isArray(T)?i?T[T.length-1]:T[1]:0;if(C)if(Array.isArray(C)&&Array.isArray(C[0]))for(const T of C)_+=x(T);else Array.isArray(C)&&(_=x(C));if(_===0&&U.weights&&U.weights.length>0){const T=U.weights[0];T&&T.shape&&(T.shape.length===5?_=T.shape[3]:T.shape.length===4&&(_=T.shape[2]))}if(_===0&&(_=d),typeof d=="number"&&typeof _=="number"){const T=n*(_+d),B=n*d;!y&&T>u&&(u=T);const F=n*Math.max(_,d);!y&&F>b&&(b=F),t=B}}}u===0&&(u=n*32*2),b===0&&(b=n*32);const s=!!(e&&e.layers&&e.layers.some(v=>typeof v.name=="string"&&v.name.endsWith("_gn")));return console.log(`[Estimator] Total Layers: ${(c=e==null?void 0:e.layers)==null?void 0:c.length}, Peak(in+out): ${u}, MaxSingle: ${b}, Final Output: ${t}, unpackedIntermediate: ${s}`),{peak:u,maxSingle:b,maxOutput:t,hasUnpackedIntermediate:s}}function Le(e,l){try{const i=he();if(i&&i.gpgpu&&i.gpgpu.gl){const u=i.gpgpu.gl.getParameter(i.gpgpu.gl.MAX_TEXTURE_SIZE),n=Math.ceil(e/4),t=Math.ceil(Math.sqrt(n)),s=Math.ceil(Math.sqrt(l));if(console.log(`[Memory Check] Peak: ${e}, MaxOutput: ${l}, Packed Dim: ${t}, Unpacked Dim: ${s}, MaxTextureSize: ${u}`),t>u)return console.warn(`Proactive check (PACKED): Tensor size ${e} requires approx ${t}x${t} texture. Exceeds MAX_TEXTURE_SIZE ${u}`),!1;if(s>u)return console.warn(`Proactive check (UNPACKED): Max output ${l} requires approx ${s}x${s} texture. Exceeds MAX_TEXTURE_SIZE ${u}`),!1}}catch(i){console.warn("Could not check texture size limits:",i)}return!0}const Xa={WEBGPU:"webgpu",WEBGL_MAIN:"webgl-main",WEBGL_SEQUENTIAL:"webgl-sequential"};function Be(e,l){return{startTime:Date.now(),Model_Name:(e==null?void 0:e.modelName)||"Unknown",Execution_Mode:l,TF_Backend:l===Xa.WEBGPU?"webgpu":"webgl",isModelFullVol:null,No_SubVolumes:1,Brainchop_Ver:"FullVolume",Input_Shape:null,Output_Shape:null,Channel_Last:null,Model_Param:null,Model_Layers:null,Actual_Labels:null,Expect_Labels:null,NumLabels_Match:null,Missing_Labels:null,Inference_t:null,Postprocess_t:null,Status:null,Error_Type:null,Extra_Err_Info:null}}function Gt(e,l,i,u,n,t){return N(this,null,function*(){var b,s,c;if(l)try{e.Input_Shape=JSON.stringify(i),e.Output_Shape=JSON.stringify(((b=l.output)==null?void 0:b.shape)||((c=(s=l.outputs)==null?void 0:s[0])==null?void 0:c.shape)),e.Channel_Last=u,n&&(e.Model_Param=yield n(l)),t&&(e.Model_Layers=yield t(l))}catch(v){console.warn("Failed to add model info to diagnostics:",v)}})}function se(e,l,i,u=null){e.Expect_Labels=l,e.Actual_Labels=i,e.NumLabels_Match=l===i,u&&u.length>0&&(e.Missing_Labels=u.join(", "))}function fe(e,l,i){e.Inference_t=l,e.Postprocess_t=i,e.Status="OK"}function Fa(e,l,i=null){e.Inference_t=1/0,e.Postprocess_t=1/0,e.Status="Fail",e.Error_Type=(l==null?void 0:l.message)||String(l),i&&(e.Extra_Err_Info=i)}const Mt=!1;function Ha(e,l,i,u,n,t,b,s,c){return N(this,null,function*(){const v=performance.now();console.log(`---- Start FullVolume Inference (SeqConv: ${l.enableSeqConv}) ----`),l.enableQuantileNorm?(console.log("preModel Quantile normalization enabled"),u=yield ne(u)):(console.log("preModel Min Max normalization enabled"),u=yield re(u));let p;if(n==null){const V=l.autoThreshold;V>0&&V<=1?p=yield dt(u,V):p=yield u.greater([0]).asType("bool")}else p=yield n.greater([0]).asType("bool");const U=u.shape,y=l.webglEnableTranspose!==void 0?l.webglEnableTranspose:l.enableTranspose,d=l.cropPadding;let S,_,C;if(l.enableCrop){const V=yield ct(u,p,d);S=V.cropped,_=V.corner,C=V.padding,u.dispose()}else{console.log("Skipping cropping (enableCrop: false)");const V=u.shape,aa=V[0]%2,ua=V[1]%2,ea=V[2]%2;aa||ua||ea?(console.log(`Padding standard input to even: ${V} -> +[${aa}, ${ua}, ${ea}]`),S=u.pad([[0,aa],[0,ua],[0,ea]]),C=[aa,ua,ea],u.dispose()):(S=u,C=null),_=[0,0,0]}p.dispose(),l.inputPermutation?(console.log(`Permuting Input: ${l.inputPermutation}`),S=S.transpose(l.inputPermutation)):y&&(S=S.transpose(),console.log("Input transposed for pre-model"));const x=yield i,T=x.layers.length,B=Ya(x);let F;B?(x.layers[0].batchInputShape[1]=S.shape[0],x.layers[0].batchInputShape[2]=S.shape[1],x.layers[0].batchInputShape[3]=S.shape[2],F=[e.batchSize,x.layers[0].batchInputShape[1],x.layers[0].batchInputShape[2],x.layers[0].batchInputShape[3],e.numOfChan]):(x.layers[0].batchInputShape[2]=S.shape[0],x.layers[0].batchInputShape[3]=S.shape[1],x.layers[0].batchInputShape[4]=S.shape[2],F=[e.batchSize,e.numOfChan,x.layers[0].batchInputShape[2],x.layers[0].batchInputShape[3],x.layers[0].batchInputShape[4]]);let $=S.reshape(F),X=!1;if(!l.enableSeqConv){const{peak:V,maxSingle:aa,maxOutput:ua,hasUnpackedIntermediate:ea}=ue(x,F,B);console.log(`[Centralized Check] Peak (In+Out): ${V}, MaxSingle: ${aa}, Max Output: ${ua}, unpackedIntermediate: ${ea}`);const ta=he(),oa=ta&&ta.gpgpu&&ta.gpgpu.gl?ta.gpgpu.gl.getParameter(ta.gpgpu.gl.MAX_TEXTURE_SIZE):16384;console.log(`[Memory Check] MAX_TEXTURE_SIZE from WebGL context: ${oa}`);const ra=Math.ceil(Math.sqrt(Math.ceil(aa/(ea?1:4)))),Sa=Math.ceil(Math.sqrt(ua));ra>oa?(console.warn(`[Memory Check] PACKED intermediates too large (${ra} > ${oa}). Using full SeqConv.`),l.enableSeqConv=!0):Sa>oa?(console.warn(`[Memory Check] UNPACKED output too large (${Sa} > ${oa}). Using chunkedArgMax.`),X=!0):console.log("[Memory Check] All checks passed. Using fast path.")}const a=l.enableSeqConv?"SeqConv (SLOW: per-channel conv + sync every layer)":X?"fast + chunkedArgMax (final layer only)":"fast (dense)";console.log(`%c[PATH] ${a}  | crop=${S.shape}  | enableCrop=${l.enableCrop} cropPadding=${l.cropPadding}`,"font-weight:bold;color:#0a0");function O(V,aa,ua,ea,ta,oa,da){return N(this,null,function*(){let ra=1,Sa=aa;const Ga=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),ba=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;let ha=Ga||ba?10:15;for(ta.enableSeqConv&&(ha=1),console.log(`Syncing GPU every ${ha} layers.`);ra<=ua;){performance.now();let J="";try{let sa;const Oa=V.layers[ra],va=Oa.activation,pa=Oa.getClassName()==="Conv3D"&&va&&va.getClassName()==="linear";ta.enableSeqConv&&pa?sa=yield(V.layers[ra].name.endsWith("_gn")?yt:bt)(Sa,V.layers[ra].getWeights()[0],V.layers[ra].getWeights()[1],V.layers[ra].strides,V.layers[ra].padding,V.layers[ra].dilationRate,3):Mt&&V.layers[ra].name.endsWith("_gn")||(sa=ga(()=>{let m=V.layers[ra].apply(Sa);return V.layers[ra].name.endsWith("_gn")&&(m=Me(m)),m})),Sa.dispose(),Sa=sa}catch(sa){throw da(sa.message,-1,sa.message),Pa().endScope(),Pa().disposeVariables(),Fa(oa,sa,"Failed while model layer "+ra+" apply"),da("",-1,"",oa),sa}if(ra%ha===0){da("Layer "+ra.toString(),(ra+1)/ea);const sa=Sa.slice([0,0,0,0,0],[1,1,1,1,1]);yield sa.data(),sa.dispose()}else da("Layer "+ra.toString(),(ra+1)/ea);ra++}return Sa})}function E(V,aa,ua,ea,ta,oa,da){return N(this,null,function*(){const ra=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Sa=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,Ga=ra||Sa?4:6;let ba=Pt(aa),ha=1;for(;ha<=ua;){try{const J=V.layers[ha],sa=J.getClassName(),Oa=J.activation;let va;if(sa==="Conv3D"&&Oa&&Oa.getClassName()==="linear"){const pa=J.name.endsWith("_gn");va=ge(ba,J.getWeights()[0],J.getWeights()[1],J.strides,J.padding,J.dilationRate,3,pa)}else if(sa==="Activation")va=ba.map(pa=>ga(()=>J.apply(pa)));else if(sa==="Conv3D"){va=ge(ba,J.getWeights()[0],J.getWeights()[1],J.strides,J.padding,J.dilationRate,3,!1);const pa=va.map(m=>ga(()=>J.activation.apply(m)));Ca(va),va=pa}else if(sa==="Conv3DTranspose"){const pa=[ba[0].shape[1],ba[0].shape[2],ba[0].shape[3]],m=J.computeOutputShape([1,pa[0],pa[1],pa[2],ba.length]),o=[m[1],m[2],m[3]];if(va=St(ba,J.getWeights()[0],J.getWeights()[1],o,J.strides,J.padding),J.activation&&J.activation.getClassName()!=="linear"){const w=va.map(L=>ga(()=>J.activation.apply(L)));Ca(va),va=w}}else throw new Error(`Channel-list path: unsupported layer ${sa} (${J.name})`);Ca(ba),ba=va}catch(J){throw Ca(ba),da(J.message,-1,J.message),Pa().endScope(),Pa().disposeVariables(),Fa(oa,J,"Failed while model layer "+ha+" apply (channel-list)"),da("",-1,"",oa),J}if(da("Layer "+ha.toString(),(ha+1)/ea),ha%Ga===0){const J=ba[0].slice([0,0,0,0,0],[1,1,1,1,1]);yield J.data(),J.dispose()}ha++}return ba})}const g=performance.now(),M=l.enableSeqConv||X?T-2:T-1;let G;if(l.enableSeqConv){l.enableTTA&&console.warn("[channel-list] TTA is not supported on the channel-list path; running a single pass.");const V=yield E(x,$,M,T,l,t,s);S.dispose(),console.log("Applying channel-list final classifier + argmax...");const aa=x.layers[T-1],ua=typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope,ea=yield ht(V,aa.getWeights()[0],aa.getWeights()[1],aa.strides,aa.padding,aa.dilationRate,s,ua);Ca(V),G=ea.asType("int32"),ea.dispose(),console.log("Channel-list argmax output shape:",G.shape)}else{if(l.enableTTA){console.log("--- Running TTA Pass 1 (Original) ---");const aa=yield O(x,$,M,T,l,t,s);if(!aa)throw new Error("TTA Error: logits1 is null or undefined");console.log("--- Running TTA Pass 2 (Flipped) ---");const ua=l.ttaFlipAxis||1,ea=S.clone().reverse(ua).reshape(F),ta=yield O(x,ea,M,T,l,t,s);if(!ta)throw new Error("TTA Error: logits2 is null or undefined");console.log("--- Averaging TTA Results ---");const oa=ga(()=>{const da=ta.shape;return ta.reshape([da[0]*da[1],da[2],da[3],da[4]]).reverse(ua).reshape(da)});$=aa.add(oa).div(2),aa.dispose(),ta.dispose(),oa.dispose(),S.dispose()}else $=yield O(x,$,M,T,l,t,s),S.dispose();if(X){console.log("Applying SequentialConvLayer for final layer only (fast path for layers 1-18)...");const aa=yield new Ct(x,10,B,s).apply($);G=aa.asType("int32"),aa.dispose(),$.dispose(),console.log("SequentialConvLayer (final only) output shape:",G.shape)}else console.log("Applying final ArgMax..."),G=ga(()=>{const aa=xe($,B?-1:1);return me(aa)}),$.dispose(),console.log("ArgMax output shape:",G.shape)}const D=((performance.now()-g)/1e3).toFixed(4);console.log(`---- Inference Time: ${D} seconds ----`),l.outputPermutation?(console.log(`Permuting Output: ${l.outputPermutation}`),G=G.transpose(l.outputPermutation)):y&&(console.log("outLabelVolume transposed"),G=G.transpose());const I=performance.now();if(C&&(C[0]||C[1]||C[2])){const V=G.shape,aa=[V[0]-C[0],V[1]-C[1],V[2]-C[2]],ua=G.slice([0,0,0],aa);G.dispose(),G=ua,console.log(`Removed padding: [${V}] -> [${G.shape}]`)}console.log("outLabelVolume without padding shape: ",G.shape),G=yield vt(G,_,U,l.outputShift),console.log("outLabelVolume final shape after restoration: ",G.shape);const W=((performance.now()-I)/1e3).toFixed(4);console.log(`---- Restoration Time: ${W} seconds ----`);const R=performance.now();let Z;try{Z=yield Oe(G,c,l,e)}catch(V){throw s(V.message,-1,V.message),Fa(t,V,"Failed during segmentation post-processing"),s("",-1,"",t),G.dispose(),Pa().disposeVariables(),V}const ia=((performance.now()-R)/1e3).toFixed(4);console.log(`---- Postprocessing Time: ${ia} seconds ----`),G.dispose(),Pa().disposeVariables();const H=((performance.now()-v)/1e3).toFixed(4);console.log(`---- Total Execution Time: ${H} seconds ----`);const Ma=new Set(Z).size,_a=l.numClasses||Ma;return se(t,_a,Ma),fe(t,D,ia),s(l.modelName+"<br>Segmentation finished",0),s("",-1,"",t),b(Z,e,l),0})}function Tt(e,l,i,u,n,t,b,s,c,v,p,U){return N(this,null,function*(){if(s.No_SubVolumes=1,b.preModelId){const y=yield we(c.rootURL+wa[b.preModelId-1].path),d=wa[b.preModelId-1].enableTranspose,S=wa[b.preModelId-1].enableQuantileNorm;let _=null;S?(console.log("preModel Quantile normalization enabled"),_=yield ne(l)):(console.log("preModel Min Max normalization enabled"),_=yield re(l)),d?(_=yield _.transpose(),console.log("Input transposed for pre-model")):console.log("Transpose not enabled for pre-model"),s.Brainchop_Ver="PreModel_FV";const C=yield y;try{const x=performance.now(),T=C,B=T.layers[0].batchInputShape;if(console.log(" Pre-Model batch input shape : ",B),B.length!==5){const R="The pre-model input shape must be 5D ";return p(R,-1,R),0}const F=Ya(T),$=c.batchSize,X=c.numOfChan;let a,O,E,g;if(F){if(console.log("Pre-Model Channel Last"),isNaN(B[4])||B[4]!==1){const R="The number of channels for pre-model input shape must be 1";return p(R,-1,R),0}a=B[1],O=B[2],E=B[3],g=[$,a,O,E,X]}else{if(console.log("Pre-Model Channel First"),isNaN(B[1])||B[1]!==1){const R="The number of channels for pre-model input shape must be 1";return p(R,-1,R),0}a=B[2],O=B[3],E=B[4],g=[$,X,a,O,E]}s.Input_Shape=JSON.stringify(g),s.Output_Shape=JSON.stringify(T.output.shape),s.Channel_Last=F,s.Model_Param=yield Ee(T),s.Model_Layers=yield Te(T);let f=0;const M=wa[b.preModelId-1].inferenceDelay;let G=1;const D=C.layers.length,I=[];I[0]=_.reshape(g),Ca(_);const W=window.setInterval(function(){return N(this,null,function*(){try{I[G]=yield C.layers[G].apply(I[G-1])}catch(R){const Z="Your graphics card (e.g. Intel) may not be compatible with WebGL. "+R.message;return p(Z,-1,Z),window.clearInterval(W),Pa().endScope(),Pa().disposeVariables(),Fa(s,R,"PreModel Failed while model layer "+G+" apply"),p("",-1,"",s),0}if(C.layers[G].dispose(),I[G-1].dispose(),p("Layer "+G.toString(),(G+1)/D),Ja().unreliable){const R="unreliable reasons :"+Ja().reasons;p(R,NaN,R)}if(G===D-1){window.clearInterval(W);const R=F?-1:1;console.log(" find argmax "),console.log("last Tensor shape : ",I[G].shape);const Z=F?I[G].shape[4]:I[G].shape[1];let ia;try{console.log(" Try tf.argMax for fullVolume .."),ia=yield xe(I[G],R)}catch(ea){if(R===-1)try{const ta=performance.now();console.log(" tf.argMax failed .. try argMaxLarge .."),window.alert("tensor2LightBuffer() is not dead code?"),window.alert("argMaxLarge() is not dead code?"),console.log("argMaxLarge for fullVolume takes : ",((performance.now()-ta)/1e3).toFixed(4))}catch(ta){const oa="argMax buffer couldn't be created due to limited memory resources.";return p(oa,-1,oa),ia.dispose(),window.clearInterval(W),Pa().endScope(),Pa().disposeVariables(),s.Inference_t=1/0,s.Postprocess_t=1/0,s.Status="Fail",s.Error_Type=ta.message,s.Extra_Err_Info="preModel prediction_argmax from argMaxLarge failed",p("",-1,"",s),0}else{const ta="argMax buffer couldn't be created due to limited memory resources.";return p(ta,-1,ta),ia.dispose(),window.clearInterval(W),Pa().endScope(),Pa().disposeVariables(),s.Inference_t=1/0,s.Postprocess_t=1/0,s.Status="Fail",s.Error_Type=ea.message,s.Extra_Err_Info="preModel prediction_argmax from argMaxLarge not support yet channel first",p("",-1,"",s),0}}console.log(" Pre-model prediction_argmax shape : ",ia.shape);const H=((performance.now()-x)/1e3).toFixed(4);Ca(I[G]),console.log(" Pre-model find array max ");const Ua=yield ia.max().dataSync()[0];f<Ua&&(f=Ua);const Ma=f+1;console.log("Pre-model numSegClasses",Ma),se(s,Z,Ma);let _a=yield ia.reshape([i,u,n]);Ca(ia),d&&(console.log("Pre-model outLabelVolume transposed"),_a=_a.transpose());const V=performance.now();console.log("Generating pre-model output");let aa;try{const ea=yield nt(_a);aa=yield _t(ea,i,u,n,b,c,p,v,!1),yield Ca(_a),console.log(" Phase-1 num of tensors after generateBrainMask: ",Ja().numTensors)}catch(ea){Pa().endScope(),Pa().disposeVariables();const ta="Failed while generating pre-model output due to limited browser memory available";return p(ta,-1,ta),s.Inference_t=H,Fa(s,ea,"Pre-model failed while generating output"),s.Inference_t=H,p("",-1,"",s),0}const ua=((performance.now()-V)/1e3).toFixed(4);if(console.log("Pre-model processing the whole brain volume in tfjs tooks for multi-class output mask : ",((performance.now()-x)/1e3).toFixed(4)+"  Seconds"),fe(s,H,ua),p("",-1,"",s),aa==null){const ea="slice_3d_mask failed ...";return p(ea,-1,ea),0}else if(console.log("--- pre-model done ---"),t){if(!b.enableSeqConv){const ea=[1,...l.shape],ta=ue(e,ea);console.log(`Proactive Memory Check (Phase 1): Estimated Max Tensor Size: ${ta} elements`),Le(ta)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),b.enableSeqConv=!0)}return yield Ha(c,b,e,l,aa,s,v,p,U),0}else window.alert("inferenceSubVolumes() is not dead code?")}G++})},M)}catch(x){p(x.message,-1,x.message),console.log('If webgl context is lost, try to restore webgl context by visit the link <a href="https://support.biodigital.com/hc/en-us/articles/218322977-How-to-turn-on-WebGL-in-my-browser">here</a>')}}else console.log("--- No pre-model is selected ---"),console.log("------ Run voxel cropping ------"),t?Ha(c,b,e,l,null,s,v,p,U):window.alert("inferenceSubVolumes() is not dead code?")})}function Et(e=!0){return N(this,null,function*(){yield it(),Ia().set("DEBUG",!1),Ia().set("WEBGL_FORCE_F16_TEXTURES",e),Ia().set("WEBGL_DELETE_TEXTURE_THRESHOLD",-1),yield rt(),console.log("tf env() flags :",Ia().flags),console.log("tf env() features :",Ia().features),console.log("tf env total features: ",Object.keys(Ia().features).length),console.log(Ce())})}function wt(e,l,i,u,n,t){return N(this,null,function*(){const b=l.enableSeqConv?Xa.WEBGL_SEQUENTIAL:Xa.WEBGL_MAIN,s=Be(l,b);t("Segmentation started",0),performance.now();const c=e.batchSize,v=e.numOfChan;if(isNaN(c)||c!==1){const E="The batch Size for input shape must be 1";return t(E,-1,E),0}if(isNaN(v)||v!==1){const E="The number of channels for input shape must be 1";return t(E,-1,E),0}Pa().startScope(),console.log("Batch size: ",c),console.log("Num of Channels: ",v);const p=yield we(e.rootURL+l.path),U=!l.forceFP32;yield Et(U),s.TF_Backend=Ce();const y=p;yield Gt(s,y,y.layers[0].batchInputShape,yield Ya(y),Ee,Te);let d=[];if(d=y.layers[0].batchInputShape,console.log(" Model batch input shape : ",d),d.length!==5){const E="The model input shape must be 5D";return t(E,-1,E),0}let S,_,C;const x=i.dims[1],T=i.dims[2],B=i.dims[3];if(yield Ya(y)){if(console.log("Model Channel Last"),isNaN(d[4])||d[4]!==1){const E="The number of channels for input shape must be 1";return t(E,-1,E),0}S=d[1],_=d[2],C=d[3]}else{if(console.log("Model Channel First"),isNaN(d[1])||d[1]!==1){const E="The number of channels for input shape must be 1";return t(E,-1,E),0}S=d[2],_=d[3],C=d[4]}let $;S===256&&_===256&&C===256?$=!0:$=!1,s.isModelFullVol=$;let X=yield mt(B,i,u);const a=l.enableTranspose,O=l.enableCrop;if($)if(O)yield Tt(p,X,B,T,x,$,l,s,e,n,t,u);else{console.log("Cropping Disabled"),a?(X=X.transpose(),console.log("Input transposed")):console.log("Transpose NOT Enabled");let E=l.enableSeqConv;if(!E){const g=[1,...X.shape],f=ue(p,g);console.log(`Proactive Memory Check: Estimated Max Tensor Size: ${f} elements`),Le(f)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),E=!0,l.enableSeqConv=!0)}E?(console.log("Seq Convoluton Enabled"),Ha(e,l,p,X,null,s,n,t,u)):(console.log("Seq Convoluton Disabled"),Ha(e,l,p,X,null,s,n,t,u))}})}const Ot=(()=>{const e=(a,O)=>a.subarray(...O.data_offsets),l=a=>{const O=Number(new DataView(a.buffer).getBigUint64(0,!0)),E=JSON.parse(new TextDecoder("utf8").decode(a.subarray(8,8+O)));return Object.fromEntries(Object.entries(E).filter(([g,f])=>g!=="__metadata__").map(([g,f])=>[g,Ba(Ta({},f),{data_offsets:f.data_offsets.map(M=>8+O+M)})]))},i=(a,O)=>a.createBuffer({size:O,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),u=a=>{const E=a.createBuffer({mappedAtCreation:!0,size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});return new Float32Array(E.getMappedRange())[0]=1/0,E.unmap(),E},n=(a,O,E)=>{const g=Math.ceil(O/4)*4,f=a.createBuffer({size:g,usage:GPUBufferUsage.STORAGE,mappedAtCreation:!0});return new Uint8Array(f.getMappedRange()).set(E),f.unmap(),f},t=(a,O,E,g,f,M,G)=>{const D=a.createBindGroup({layout:g,entries:[{binding:0,resource:{buffer:f}},...M.map((W,R)=>({binding:R+1,resource:{buffer:W}}))]}),I=O.beginComputePass();I.setPipeline(E),I.setBindGroup(0,D),I.dispatchWorkgroups(...G),I.end()},b=`enable f16;
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
}`,c=`fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
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
}`,p=`enable f16;
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
}`,U=`enable f16;
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
}`,d=`enable f16;
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
}`,S=`enable f16;
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
}`,_=`enable f16;
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
}`,x=`enable f16;
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
}`,F=`enable f16;
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
}`,$=(a,O)=>N(null,null,function*(){const E=l(O),g=u(a),f=[a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]})],M=i(a,33554432),G=n(a,864,e(O,E["m.model.0.weight"])),D=n(a,13824,e(O,E["m.model.3.weight"])),I=n(a,13824,e(O,E["m.model.6.weight"])),W=n(a,13824,e(O,E["m.model.9.weight"])),R=n(a,13824,e(O,E["m.model.12.weight"])),Z=n(a,13824,e(O,E["m.model.15.weight"])),ia=n(a,13824,e(O,E["m.model.18.weight"])),H=n(a,13824,e(O,E["m.model.21.weight"])),Ua=n(a,13824,e(O,E["m.model.24.weight"])),Ma=n(a,13824,e(O,E["m.model.27.weight"])),_a=n(a,13824,e(O,E["m.model.30.weight"])),V=n(a,13824,e(O,E["m.model.33.weight"])),aa=n(a,13824,e(O,E["m.model.36.weight"])),ua=n(a,13824,e(O,E["m.model.39.weight"])),ea=n(a,13824,e(O,E["m.model.42.weight"])),ta=n(a,13824,e(O,E["m.model.45.weight"])),oa=n(a,13824,e(O,E["m.model.48.weight"])),da=n(a,13824,e(O,E["m.model.51.weight"])),ra=n(a,13824,e(O,E["m.model.54.weight"])),Sa=n(a,13824,e(O,E["m.model.57.weight"])),Ga=n(a,13824,e(O,E["m.model.60.weight"])),ba=n(a,13824,e(O,E["m.model.63.weight"])),ha=n(a,13824,e(O,E["m.model.66.weight"])),J=n(a,13824,e(O,E["m.model.69.weight"])),sa=n(a,13824,e(O,E["m.model.72.weight"])),Oa=n(a,64,e(O,E["m.seq_conv_argmax.weight"])),va=n(a,4,e(O,E["m.seq_conv_argmax.bias"])),pa=i(a,67108864),m=i(a,536870912),o=i(a,4194304),w=i(a,536870912),L=i(a,536870912),Aa=a.createBuffer({size:M.size,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.MAP_WRITE}),xa=a.createBuffer({size:pa.size,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),ce=[b,s,c,v,p,c,U,y,s,c,v,p,c,U,d,s,c,v,p,c,U,S,s,c,v,p,c,U,_,s,c,v,p,c,U,C,s,c,v,p,c,U,y,s,c,v,p,c,U,d,s,c,v,p,c,U,S,s,c,v,p,c,U,_,s,c,v,p,c,U,C,s,c,v,p,c,U,y,s,c,v,p,c,U,d,s,c,v,p,c,U,S,s,c,v,p,c,U,_,s,c,v,p,c,U,C,s,c,v,p,c,U,y,s,c,v,p,c,U,d,s,c,v,p,c,U,S,s,c,v,p,c,U,_,s,c,v,p,c,U,C,s,c,v,p,c,U,y,s,c,v,p,c,U,d,s,c,v,p,c,U,S,s,c,v,p,c,U,_,s,c,v,p,c,U,x,T,B,F],h=yield Promise.all(ce.map((P,r)=>N(null,null,function*(){return yield a.createComputePipelineAsync({layout:a.createPipelineLayout({bindGroupLayouts:[f[r]]}),compute:{module:a.createShaderModule({code:P}),entryPoint:"main"}})})));return P=>N(null,null,function*(){let r=a.createCommandEncoder();yield Aa.mapAsync(GPUMapMode.WRITE),new Float16Array(Aa.getMappedRange()).set(P),Aa.unmap(),r.copyBufferToBuffer(Aa,0,M,0,Aa.size),t(a,r,h[0],f[0],g,[m,M,G],[128,256,4]),t(a,r,h[1],f[1],g,[o,m],[8192,1,1]),t(a,r,h[2],f[2],g,[w,o],[32,1,1]),t(a,r,h[3],f[3],g,[o,w],[16,1,1]),t(a,r,h[4],f[4],g,[w,m,o],[1024,2,1]),t(a,r,h[5],f[5],g,[L,w],[32,1,1]),t(a,r,h[6],f[6],g,[w,L],[16,1,1]),t(a,r,h[7],f[7],g,[L,m,o,w,D],[128,256,4]),t(a,r,h[8],f[8],g,[m,L],[8192,1,1]),t(a,r,h[9],f[9],g,[o,m],[32,1,1]),t(a,r,h[10],f[10],g,[m,o],[16,1,1]),t(a,r,h[11],f[11],g,[o,L,m],[1024,2,1]),t(a,r,h[12],f[12],g,[w,o],[32,1,1]),t(a,r,h[13],f[13],g,[o,w],[16,1,1]),t(a,r,h[14],f[14],g,[w,L,m,o,I],[128,256,4]),t(a,r,h[15],f[15],g,[m,w],[8192,1,1]),t(a,r,h[16],f[16],g,[o,m],[32,1,1]),t(a,r,h[17],f[17],g,[m,o],[16,1,1]),t(a,r,h[18],f[18],g,[o,w,m],[1024,2,1]),t(a,r,h[19],f[19],g,[L,o],[32,1,1]),t(a,r,h[20],f[20],g,[o,L],[16,1,1]),t(a,r,h[21],f[21],g,[L,w,m,o,W],[128,256,4]),t(a,r,h[22],f[22],g,[m,L],[8192,1,1]),t(a,r,h[23],f[23],g,[o,m],[32,1,1]),t(a,r,h[24],f[24],g,[m,o],[16,1,1]),t(a,r,h[25],f[25],g,[o,L,m],[1024,2,1]),t(a,r,h[26],f[26],g,[w,o],[32,1,1]),t(a,r,h[27],f[27],g,[o,w],[16,1,1]),t(a,r,h[28],f[28],g,[w,L,m,o,R],[128,256,4]),t(a,r,h[29],f[29],g,[m,w],[8192,1,1]),t(a,r,h[30],f[30],g,[o,m],[32,1,1]),t(a,r,h[31],f[31],g,[m,o],[16,1,1]),t(a,r,h[32],f[32],g,[o,w,m],[1024,2,1]),t(a,r,h[33],f[33],g,[L,o],[32,1,1]),t(a,r,h[34],f[34],g,[o,L],[16,1,1]),t(a,r,h[35],f[35],g,[L,w,m,o,Z],[128,256,4]),t(a,r,h[36],f[36],g,[m,L],[8192,1,1]),t(a,r,h[37],f[37],g,[o,m],[32,1,1]),t(a,r,h[38],f[38],g,[m,o],[16,1,1]),t(a,r,h[39],f[39],g,[o,L,m],[1024,2,1]),t(a,r,h[40],f[40],g,[w,o],[32,1,1]),t(a,r,h[41],f[41],g,[o,w],[16,1,1]),t(a,r,h[42],f[42],g,[w,L,m,o,ia],[128,256,4]),t(a,r,h[43],f[43],g,[m,w],[8192,1,1]),t(a,r,h[44],f[44],g,[o,m],[32,1,1]),t(a,r,h[45],f[45],g,[m,o],[16,1,1]),t(a,r,h[46],f[46],g,[o,w,m],[1024,2,1]),t(a,r,h[47],f[47],g,[L,o],[32,1,1]),t(a,r,h[48],f[48],g,[o,L],[16,1,1]),t(a,r,h[49],f[49],g,[L,w,m,o,H],[128,256,4]),t(a,r,h[50],f[50],g,[m,L],[8192,1,1]),t(a,r,h[51],f[51],g,[o,m],[32,1,1]),t(a,r,h[52],f[52],g,[m,o],[16,1,1]),t(a,r,h[53],f[53],g,[o,L,m],[1024,2,1]),t(a,r,h[54],f[54],g,[w,o],[32,1,1]),t(a,r,h[55],f[55],g,[o,w],[16,1,1]),t(a,r,h[56],f[56],g,[w,L,m,o,Ua],[128,256,4]),t(a,r,h[57],f[57],g,[m,w],[8192,1,1]),t(a,r,h[58],f[58],g,[o,m],[32,1,1]),t(a,r,h[59],f[59],g,[m,o],[16,1,1]),t(a,r,h[60],f[60],g,[o,w,m],[1024,2,1]),t(a,r,h[61],f[61],g,[L,o],[32,1,1]),t(a,r,h[62],f[62],g,[o,L],[16,1,1]),t(a,r,h[63],f[63],g,[L,w,m,o,Ma],[128,256,4]),t(a,r,h[64],f[64],g,[m,L],[8192,1,1]),t(a,r,h[65],f[65],g,[o,m],[32,1,1]),t(a,r,h[66],f[66],g,[m,o],[16,1,1]),t(a,r,h[67],f[67],g,[o,L,m],[1024,2,1]),t(a,r,h[68],f[68],g,[w,o],[32,1,1]),t(a,r,h[69],f[69],g,[o,w],[16,1,1]),t(a,r,h[70],f[70],g,[w,L,m,o,_a],[128,256,4]),t(a,r,h[71],f[71],g,[m,w],[8192,1,1]),t(a,r,h[72],f[72],g,[o,m],[32,1,1]),t(a,r,h[73],f[73],g,[m,o],[16,1,1]),t(a,r,h[74],f[74],g,[o,w,m],[1024,2,1]),t(a,r,h[75],f[75],g,[L,o],[32,1,1]),t(a,r,h[76],f[76],g,[o,L],[16,1,1]),t(a,r,h[77],f[77],g,[L,w,m,o,V],[128,256,4]),t(a,r,h[78],f[78],g,[m,L],[8192,1,1]),t(a,r,h[79],f[79],g,[o,m],[32,1,1]),t(a,r,h[80],f[80],g,[m,o],[16,1,1]),t(a,r,h[81],f[81],g,[o,L,m],[1024,2,1]),t(a,r,h[82],f[82],g,[w,o],[32,1,1]),t(a,r,h[83],f[83],g,[o,w],[16,1,1]),t(a,r,h[84],f[84],g,[w,L,m,o,aa],[128,256,4]),t(a,r,h[85],f[85],g,[m,w],[8192,1,1]),t(a,r,h[86],f[86],g,[o,m],[32,1,1]),t(a,r,h[87],f[87],g,[m,o],[16,1,1]),t(a,r,h[88],f[88],g,[o,w,m],[1024,2,1]),t(a,r,h[89],f[89],g,[L,o],[32,1,1]),t(a,r,h[90],f[90],g,[o,L],[16,1,1]),t(a,r,h[91],f[91],g,[L,w,m,o,ua],[128,256,4]),t(a,r,h[92],f[92],g,[m,L],[8192,1,1]),t(a,r,h[93],f[93],g,[o,m],[32,1,1]),t(a,r,h[94],f[94],g,[m,o],[16,1,1]),t(a,r,h[95],f[95],g,[o,L,m],[1024,2,1]),t(a,r,h[96],f[96],g,[w,o],[32,1,1]),t(a,r,h[97],f[97],g,[o,w],[16,1,1]),t(a,r,h[98],f[98],g,[w,L,m,o,ea],[128,256,4]),t(a,r,h[99],f[99],g,[m,w],[8192,1,1]),t(a,r,h[100],f[100],g,[o,m],[32,1,1]),t(a,r,h[101],f[101],g,[m,o],[16,1,1]),t(a,r,h[102],f[102],g,[o,w,m],[1024,2,1]),t(a,r,h[103],f[103],g,[L,o],[32,1,1]),t(a,r,h[104],f[104],g,[o,L],[16,1,1]),t(a,r,h[105],f[105],g,[L,w,m,o,ta],[128,256,4]),t(a,r,h[106],f[106],g,[m,L],[8192,1,1]),t(a,r,h[107],f[107],g,[o,m],[32,1,1]),t(a,r,h[108],f[108],g,[m,o],[16,1,1]),t(a,r,h[109],f[109],g,[o,L,m],[1024,2,1]),t(a,r,h[110],f[110],g,[w,o],[32,1,1]),t(a,r,h[111],f[111],g,[o,w],[16,1,1]),t(a,r,h[112],f[112],g,[w,L,m,o,oa],[128,256,4]),t(a,r,h[113],f[113],g,[m,w],[8192,1,1]),t(a,r,h[114],f[114],g,[o,m],[32,1,1]),t(a,r,h[115],f[115],g,[m,o],[16,1,1]),t(a,r,h[116],f[116],g,[o,w,m],[1024,2,1]),t(a,r,h[117],f[117],g,[L,o],[32,1,1]),t(a,r,h[118],f[118],g,[o,L],[16,1,1]),t(a,r,h[119],f[119],g,[L,w,m,o,da],[128,256,4]),t(a,r,h[120],f[120],g,[m,L],[8192,1,1]),t(a,r,h[121],f[121],g,[o,m],[32,1,1]),t(a,r,h[122],f[122],g,[m,o],[16,1,1]),t(a,r,h[123],f[123],g,[o,L,m],[1024,2,1]),t(a,r,h[124],f[124],g,[w,o],[32,1,1]),t(a,r,h[125],f[125],g,[o,w],[16,1,1]),t(a,r,h[126],f[126],g,[w,L,m,o,ra],[128,256,4]),t(a,r,h[127],f[127],g,[m,w],[8192,1,1]),t(a,r,h[128],f[128],g,[o,m],[32,1,1]),t(a,r,h[129],f[129],g,[m,o],[16,1,1]),t(a,r,h[130],f[130],g,[o,w,m],[1024,2,1]),t(a,r,h[131],f[131],g,[L,o],[32,1,1]),t(a,r,h[132],f[132],g,[o,L],[16,1,1]),t(a,r,h[133],f[133],g,[L,w,m,o,Sa],[128,256,4]),t(a,r,h[134],f[134],g,[m,L],[8192,1,1]),t(a,r,h[135],f[135],g,[o,m],[32,1,1]),t(a,r,h[136],f[136],g,[m,o],[16,1,1]),t(a,r,h[137],f[137],g,[o,L,m],[1024,2,1]),t(a,r,h[138],f[138],g,[w,o],[32,1,1]),t(a,r,h[139],f[139],g,[o,w],[16,1,1]),t(a,r,h[140],f[140],g,[w,L,m,o,Ga],[128,256,4]),t(a,r,h[141],f[141],g,[m,w],[8192,1,1]),t(a,r,h[142],f[142],g,[o,m],[32,1,1]),t(a,r,h[143],f[143],g,[m,o],[16,1,1]),t(a,r,h[144],f[144],g,[o,w,m],[1024,2,1]),t(a,r,h[145],f[145],g,[L,o],[32,1,1]),t(a,r,h[146],f[146],g,[o,L],[16,1,1]),t(a,r,h[147],f[147],g,[L,w,m,o,ba],[128,256,4]),t(a,r,h[148],f[148],g,[m,L],[8192,1,1]),t(a,r,h[149],f[149],g,[o,m],[32,1,1]),t(a,r,h[150],f[150],g,[m,o],[16,1,1]),t(a,r,h[151],f[151],g,[o,L,m],[1024,2,1]),t(a,r,h[152],f[152],g,[w,o],[32,1,1]),t(a,r,h[153],f[153],g,[o,w],[16,1,1]),t(a,r,h[154],f[154],g,[w,L,m,o,ha],[128,256,4]),t(a,r,h[155],f[155],g,[m,w],[8192,1,1]),t(a,r,h[156],f[156],g,[o,m],[32,1,1]),t(a,r,h[157],f[157],g,[m,o],[16,1,1]),t(a,r,h[158],f[158],g,[o,w,m],[1024,2,1]),t(a,r,h[159],f[159],g,[L,o],[32,1,1]),t(a,r,h[160],f[160],g,[o,L],[16,1,1]),t(a,r,h[161],f[161],g,[L,w,m,o,J],[128,256,4]),t(a,r,h[162],f[162],g,[m,L],[8192,1,1]),t(a,r,h[163],f[163],g,[o,m],[32,1,1]),t(a,r,h[164],f[164],g,[m,o],[16,1,1]),t(a,r,h[165],f[165],g,[o,L,m],[1024,2,1]),t(a,r,h[166],f[166],g,[w,o],[32,1,1]),t(a,r,h[167],f[167],g,[o,w],[16,1,1]),t(a,r,h[168],f[168],g,[w,L,m,o,sa],[128,256,4]),t(a,r,h[169],f[169],g,[m,w],[8192,1,1]),t(a,r,h[170],f[170],g,[o,m],[32,1,1]),t(a,r,h[171],f[171],g,[m,o],[16,1,1]),t(a,r,h[172],f[172],g,[o,w,m],[1024,2,1]),t(a,r,h[173],f[173],g,[L,o],[32,1,1]),t(a,r,h[174],f[174],g,[o,L],[16,1,1]),t(a,r,h[175],f[175],g,[L,w,m,o],[32768,16,1]),t(a,r,h[176],f[176],g,[m,L,Oa,va],[32768,8,1]),t(a,r,h[177],f[177],g,[w,m],[32768,4,1]),t(a,r,h[178],f[178],g,[pa,m,w],[32768,4,1]),r.copyBufferToBuffer(pa,0,xa,0,pa.size),a.queue.submit([r.finish()]),yield xa.mapAsync(GPUMapMode.READ);const k=new Float32Array(xa.size/4);return k.set(new Float32Array(xa.getMappedRange())),xa.unmap(),[k]})});return{load:(a,O)=>N(null,null,function*(){return yield fetch(O).then(E=>E.arrayBuffer()).then(E=>$(a,new Uint8Array(E)))}),setupNet:$}})(),Lt=Object.freeze(Object.defineProperty({__proto__:null,default:Ot},Symbol.toStringTag,{value:"Module"})),ka=Object.assign({"./webgpu_runners/rodent_runner.js":Lt});function Bt(){return Object.keys(ka).map(e=>{const l=e.match(/\/([^\/]+)_runner\.js$/);return l?l[1]:null}).filter(Boolean)}function At(e){const l=`./webgpu_runners/${e}_runner.js`;if(ka[l])return ka[l];const i=e.toLowerCase();for(const[u,n]of Object.entries(ka))if(u.toLowerCase().includes(`/${i}_runner.js`))return n;for(const[u,n]of Object.entries(ka))if(u.includes(e))return n;return null}function Rt(e){const l=`./webgpu_runners/${e}_runner.js`;if(ka[l])return!0;const i=`/${e.toLowerCase()}_runner.js`;return Object.keys(ka).some(u=>u.toLowerCase().endsWith(i))}function kt(e,l){if(typeof Float16Array=="undefined")throw new Error("Float16Array unavailable: cannot cast fp32 master weights to fp16.");const i=new DataView(e.buffer,e.byteOffset,e.byteLength),u=Number(i.getBigUint64(0,!0)),n=JSON.parse(new TextDecoder("utf8").decode(e.subarray(8,8+u))),t=8+u;if(!Object.entries(n).some(([S,_])=>S!=="__metadata__"&&_.dtype==="F32"))return e;const s={},c=[];let v=0;for(const[S,_]of Object.entries(n)){if(S==="__metadata__"){s[S]=_;continue}const[C,x]=_.data_offsets,T=e.subarray(t+C,t+x);let B,F;if(_.dtype==="F32"){const $=new Float32Array(T.slice().buffer),X=new Float16Array($);B=new Uint8Array(X.buffer),F="F16"}else B=T,F=_.dtype;s[S]={dtype:F,shape:_.shape,data_offsets:[v,v+B.byteLength]},c.push(B),v+=B.byteLength}const p=new TextEncoder().encode(JSON.stringify(s)),U=(8-p.byteLength%8)%8,y=new Uint8Array(8+p.byteLength+U+v);new DataView(y.buffer).setBigUint64(0,BigInt(p.byteLength+U),!0),y.set(p,8),y.fill(32,8+p.byteLength,8+p.byteLength+U);let d=8+p.byteLength+U;for(const S of c)y.set(S,d),d+=S.byteLength;return l&&l("Cast fp32 master weights -> fp16 for WebGPU.",.05),y}function It(e,l){try{const i=b=>!!(e.features&&e.features.has&&e.features.has(b)),u=e.limits||{},n=typeof navigator!="undefined"&&navigator.userAgent||"unknown",t=/Safari/.test(n)&&!/Chrome|Chromium|Android/.test(n);console.log("[SAFARI-DEBUG] ===== WebGPU device capabilities ====="),console.log("[SAFARI-DEBUG] model:",(l==null?void 0:l.modelName)||(l==null?void 0:l.webgpu_runner)||"(unknown)"),console.log("[SAFARI-DEBUG] userAgent:",n,"| classified Safari:",t),console.log("[SAFARI-DEBUG] shader-f16:",i("shader-f16")),console.log("[SAFARI-DEBUG] features:",e.features?Array.from(e.features):"(none)"),console.log("[SAFARI-DEBUG] limits:",{maxBufferSize:u.maxBufferSize,maxStorageBufferBindingSize:u.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:u.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:u.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:u.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:u.maxComputeWorkgroupSizeZ,maxComputeWorkgroupsPerDimension:u.maxComputeWorkgroupsPerDimension}),console.log("[SAFARI-DEBUG] BC_WEBGPU_DEBUG (logits readback):",typeof window!="undefined"&&!!window.BC_WEBGPU_DEBUG),console.log("[SAFARI-DEBUG] =======================================")}catch(i){console.warn("[SAFARI-DEBUG] capability dump failed:",i==null?void 0:i.message)}}function Nt(e,l,i){return N(this,null,function*(){var p,U;It(e,l);let u=l.webgpu_runner,n=l.webgpu_safetensor;const t=!!(e.features&&e.features.has&&e.features.has("shader-f16"));let b=!1;l.forceFP32?(b=!0,console.log("[WebGPU] forceFP32: using fp32 runner and weights.")):t||(Rt(`${u}_f32`)?(b=!0,console.log("[WebGPU] shader-f16 not supported on this device -> auto-selecting fp32 runner and weights."),i("fp16 not supported - using fp32 WebGPU runner.",.05)):console.warn(`[WebGPU] shader-f16 not supported and no fp32 runner ('${u}_f32') available; the fp16 runner will likely fail and fall back to WebGL2.`)),b&&(u=`${u}_f32`,n=n.replace(".safetensors","_f32.safetensors")),l.enableTTA&&l.webgpuTTArunner&&(console.log("[WebGPU] TTA Enabled: Switching to TTA runner and weights."),u=`${u}_tta`,n=n.replace(".safetensors","_tta.safetensors"));const s=At(u);if(!s){const y=Bt();throw new Error(`Runner '${u}' not found. Available runners: ${y.join(", ")||"none"}. Looking in: ./webgpu_runners/`)}if(!s.setupNet&&!((p=s.default)!=null&&p.setupNet))throw new Error(`Runner module '${u}' doesn't export 'setupNet'. Exported keys: ${Object.keys(s).join(", ")}`);let c;try{const y=yield fetch(n);if(!y.ok)throw new Error(`HTTP ${y.status}: ${y.statusText}`);c=yield y.arrayBuffer()}catch(y){throw new Error(`Failed to load weights from '${n}': ${y.message}`)}const v=s.setupNet||((U=s.default)==null?void 0:U.setupNet);try{let y=new Uint8Array(c);return b||(y=kt(y,i)),yield v(e,y,i)}catch(y){throw new Error(`Failed to setup network for '${u}': ${y.message}`)}})}function Ft(e,l,i,u,n,t,b){return N(this,null,function*(){var d,S,_;b("Starting WebGPU inference...",0);const s=performance.now(),c=Be(i,Xa.WEBGPU);c.isModelFullVol=!0;let v,p=[],U=null,y=!1;try{if(!e)throw new Error("WebGPU device is required but not provided");if(!(i!=null&&i.webgpu_runner))throw new Error("Model entry must specify webgpu_runner property");if(!(i!=null&&i.webgpu_safetensor))throw new Error("Model entry must specify webgpu_safetensor property");const C=i.webgpuStorageSize||335544320;if(e.limits){const I=Z=>(Z/1048576).toFixed(0),W=(d=e.limits.maxStorageBufferBindingSize)!=null?d:1/0,R=(S=e.limits.maxBufferSize)!=null?S:1/0;if(W<C||R<C){const Z=I(Math.min(W,R)),ia=I(C),H=`[WebGPU] Device buffer limit (${Z} MB) is below the ${ia} MB this model needs - using WebGL2 fallback.`;throw console.warn(H),b(H,.1),new Error(H)}}b("Preparing input data...",.1);let x=Va(n,[256,256,256],"float32");const T=i.enableQuantileNorm?yield ne(x):yield re(x);if(x.dispose(),x=T,i.inputPermutation){console.log(`[WebGPU] Permuting Input: ${i.inputPermutation}`);const I=x.transpose(i.inputPermutation);x.dispose(),x=I}else if(i.enableTranspose){const I=x.transpose();x.dispose(),x=I}const B=yield x.data(),F=x.shape;x.dispose(),b("Input data prepared (full volume).",.3),b("Loading model runner...",.4),e&&(U=e.createBuffer.bind(e),e.createBuffer=I=>{const W=U(I);return p.push(W),W}),e.pushErrorScope("out-of-memory"),y=!0;const $=yield Nt(e,i,b);if(typeof $!="function")throw new Error(`setupNet for '${i.webgpu_runner}' didn't return a function. Returned type: ${typeof $}`);b("Running inference...",.5);const X=yield $(B);y=!1;const a=yield e.popErrorScope();if(a)throw new Error(`WebGPU out of memory (${a.message||"allocation failed"}) - falling back to WebGL2.`);if(!X||!Array.isArray(X))throw new Error(`Inference didn't return expected array format. Returned: ${typeof X}`);const O=((performance.now()-s)/1e3).toFixed(4);b(`WebGPU inference took ${O}s.`,.9),console.log("Inference result shape:",(_=X[0])==null?void 0:_.length),v=ga(()=>{let I=Va(X[0],F,"int32");i.outputPermutation?(console.log(`[WebGPU] Permuting Output: ${i.outputPermutation}`),I=I.transpose(i.outputPermutation)):i.enableTranspose&&(I=I.transpose());const W=ut(I).dataSync()[0];if(console.log("Segmentation volume sum:",W),W===0)throw new Error("Segmentation resulted in all zeros (empty volume).");return I});const E=performance.now(),g=yield Oe(v,n,i,l),f=((performance.now()-E)/1e3).toFixed(4);t(g,l,i);const G=new Set(g).size,D=i.numClasses||G;se(c,D,G),fe(c,O,f),b(i.modelName+"<br>Segmentation finished.",1,"",c)}catch(C){if(console.error("WebGPU Inference Error:",C),y&&e){y=!1;try{yield e.popErrorScope()}catch(T){}}let x=C.message;throw C.message.includes("not found")?x+=". Check that the runner file exists and the name matches.":C.message.includes("fetch")?x+=". Check network connection and file paths.":C.message.includes("binding size")&&(x+=". GPU memory limit exceeded."),Fa(c,x,"WebGPU inference failed"),b("",-1,`WebGPU Error: ${x}`,c),C}finally{if(v&&v.dispose(),U&&e&&(e.createBuffer=U),p&&p.length>0){for(const C of p)C.destroy();p=[]}}})}function oe(){return N(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?"Opera":navigator.userAgent.indexOf("Edg/")>-1?"Edge":navigator.userAgent.indexOf("Falkon/")>-1?"Falkon":navigator.userAgent.indexOf("Chrome/")>-1?"Chrome":navigator.userAgent.indexOf("Firefox/")>-1?"Firefox":navigator.userAgent.indexOf("Safari/")>-1?"Safari":navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?"IExplorer":"Unknown"})}function zt(){return N(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?parseInt(navigator.userAgent.split("OPR/")[1]):navigator.userAgent.indexOf("Edg/")>-1?parseInt(navigator.userAgent.split("Edg/")[1]):navigator.userAgent.indexOf("Falkon/")>-1?parseInt(navigator.userAgent.split("Falkon/")[1]):navigator.userAgent.indexOf("Chrome/")>-1?parseInt(navigator.userAgent.split("Chrome/")[1]):navigator.userAgent.indexOf("Firefox/")>-1?parseInt(navigator.userAgent.split("Firefox/")[1]):navigator.userAgent.indexOf("Safari/")>-1?parseInt(navigator.userAgent.split("Safari/")[1]):navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?parseInt(navigator.userAgent.split("MSIE/")[1]):1/0})}function Wt(){return N(this,null,function*(){return navigator.userAgent.indexOf("Win")>-1?"Windows":navigator.userAgent.indexOf("Mac")>-1?"MacOS":navigator.userAgent.indexOf("Linux")>-1?"Linux":navigator.userAgent.indexOf("UNIX")>-1?"UNIX":"Unknown"})}function $t(e){return N(this,null,function*(){return e?(console.log("WebGl2 is enabled"),!0):(console.log(typeof WebGL2RenderingContext!="undefined"?"WebGL2 may be disabled. Please try updating video card drivers":"WebGL2 is not supported"),!1)})}function Dt(e){return N(this,null,function*(){let l;if(e&&(l=e.getExtension("WEBGL_debug_renderer_info"),l)){const i=e.getParameter(l.UNMASKED_VENDOR_WEBGL);return i.indexOf("(")>-1&&i.indexOf(")")>-1?i.substring(i.indexOf("(")+1,i.indexOf(")")):i}return null})}function qt(e){return N(this,null,function*(){if(e){const l=e.getExtension("WEBGL_debug_renderer_info");return l?e.getParameter(l.UNMASKED_VENDOR_WEBGL):null}else return null})}function Vt(e){return N(this,null,function*(){if(e){if(oe()==="Firefox")return e.getParameter(e.RENDERER);const l=e.getExtension("WEBGL_debug_renderer_info");return l?e.getParameter(l.UNMASKED_RENDERER_WEBGL):null}else return null})}function jt(e){return N(this,null,function*(){let l;if(e){if(oe()==="Firefox")return e.getParameter(e.RENDERER);if(l=e.getExtension("WEBGL_debug_renderer_info"),l){let i=e.getParameter(l.UNMASKED_RENDERER_WEBGL);return i.indexOf("(")>-1&&i.indexOf(")")>-1&&i.indexOf("(R)")===-1&&(i=i.substring(i.indexOf("(")+1,i.indexOf(")")),i.split(",").length===3)?i.split(",")[1].trim():i}}return null})}function Yt(){return N(this,null,function*(){return navigator.hardwareConcurrency})}function Xt(){return N(this,null,function*(){return/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)})}function Ht(e,l=null){return N(this,null,function*(){const i=new Date;if(e.isModelFullVol?e.Brainchop_Ver="FullVolume":e.Brainchop_Ver="SubVolumes",e.Total_t=(Date.now()-e.startTime)/1e3,delete e.startTime,e.Date=parseInt(i.getMonth()+1)+"/"+i.getDate()+"/"+i.getFullYear(),e.Browser=yield oe(),e.Browser_Ver=yield zt(),e.OS=yield Wt(),e.WebGL2=yield $t(l),e.GPU_Vendor=yield Dt(l),e.GPU_Card=yield jt(l),e.GPU_Vendor_Full=yield qt(l),e.GPU_Card_Full=yield Vt(l),e.CPU_Cores=yield Yt(),e.Which_Brainchop="latest",(yield Xt())&&(e.Heap_Size_MB=window.performance.memory.totalJSHeapSize/(1024*1024).toFixed(2),e.Used_Heap_MB=window.performance.memory.usedJSHeapSize/(1024*1024).toFixed(2),e.Heap_Limit_MB=window.performance.memory.jsHeapSizeLimit/(1024*1024).toFixed(2)),l){console.log("MAX_TEXTURE_SIZE :",l.getParameter(l.MAX_TEXTURE_SIZE)),console.log("MAX_RENDERBUFFER_SIZE :",l.getParameter(l.MAX_RENDERBUFFER_SIZE));const u=l.getExtension("WEBGL_debug_renderer_info");console.log("VENDOR WEBGL:",l.getParameter(u.UNMASKED_VENDOR_WEBGL)),e.Texture_Size=l.getParameter(l.MAX_TEXTURE_SIZE)}else e.Texture_Size=null;return e})}function Zt(e){return new Worker(""+new URL("brainchop-webworker-CDV8Q084.js",import.meta.url).href,{name:e==null?void 0:e.name})}const be=.5,pe=8,ye=(e,l,i)=>Math.min(i,Math.max(l,e)),Se=e=>Math.hypot(e[0].clientX-e[1].clientX,e[0].clientY-e[1].clientY);function Ae(e){e!=null&&e.scene&&(e.scene.pan2Dxyzmm=[0,0,0,1],e.scene.volScaleMultiplier=1,e.drawScene()),Kt()}function Kt(){const e=document.querySelector('meta[name="viewport"]');if(!e)return;const l=e.getAttribute("content")||"width=device-width, initial-scale=1.0";/maximum-scale/.test(l)||(e.setAttribute("content",`${l}, maximum-scale=1, user-scalable=no`),requestAnimationFrame(()=>requestAnimationFrame(()=>e.setAttribute("content",l))))}function Qt(){const e=l=>l.preventDefault();for(const l of["gesturestart","gesturechange","gestureend"])document.addEventListener(l,e,{passive:!1});document.addEventListener("touchmove",l=>{l.touches.length>1&&l.preventDefault()},{passive:!1})}function Jt(e){const l=e.canvas;if(!l)return;let i=null;const u=t=>{var p;if(t.touches.length!==2){i=null;return}const b=l.getBoundingClientRect(),s=(t.touches[0].clientX+t.touches[1].clientX)/2-b.left,c=(t.touches[0].clientY+t.touches[1].clientY)/2-b.top,v=((p=e.uiData)==null?void 0:p.dpr)||1;i={dist:Math.max(1,Se(t.touches)),zoom:e.scene.pan2Dxyzmm[3]||1,pan:Array.from(e.scene.pan2Dxyzmm).slice(0,3),scale3d:e.scene.volScaleMultiplier||1,inRender:e.inRenderTile?e.inRenderTile(s*v,c*v)>=0:!1}},n=()=>{i=null};l.addEventListener("touchstart",u,{passive:!1}),l.addEventListener("touchend",n,{passive:!1}),l.addEventListener("touchcancel",n,{passive:!1}),e.handlePinchZoom=t=>{if(!i||!t.touches||t.touches.length!==2)return;const b=Se(t.touches)/i.dist;if(!isFinite(b)||b<=0)return;if(i.inRender){e.scene.volScaleMultiplier=ye(i.scale3d*b,be,pe),e.drawScene();return}const s=ye(i.zoom*b,be,pe),c=e.frac2mm(e.scene.crosshairPos),v=i.zoom-s;e.scene.pan2Dxyzmm=[i.pan[0]+v*c[0],i.pan[1]+v*c[1],i.pan[2]+v*c[2],s],e.opts.yoke3Dto2DZoom&&(e.scene.volScaleMultiplier=s),e.drawScene()}}function al(e){return Qt(),Jt(e),{resetView:()=>Ae(e)}}const el=720,tl=860;function ll(){var n,t,b,s,c,v;const e=window.visualViewport,l=Math.round((t=(n=e==null?void 0:e.width)!=null?n:window.innerWidth)!=null?t:0),i=Math.round((s=(b=e==null?void 0:e.height)!=null?b:window.innerHeight)!=null?s:0);return l>0&&l<=el?!0:!!((v=(c=window.matchMedia)==null?void 0:c.call(window,"(pointer: coarse)"))==null?void 0:v.matches)&&Math.min(l,i)<=tl}function Wa(e,l,i,u,n,t){const b=i-n,s=u-t;if(!(b>0)||!(s>0)||!(e>0)||!(l>0))return 0;let c=b/e;return l*c>s&&(c=s/l),c}function il(e){var x,T,B,F,$,X,a,O,E,g;const l=((F=(x=e.effectiveCanvasWidth)==null?void 0:x.call(e))!=null?F:(B=(T=e.gl)==null?void 0:T.canvas)==null?void 0:B.width)||0,i=((O=($=e.effectiveCanvasHeight)==null?void 0:$.call(e))!=null?O:(a=(X=e.gl)==null?void 0:X.canvas)==null?void 0:a.height)||0;if(!l||!i)return null;let u=[1,1,1];try{const f=e.sliceScale();((E=f==null?void 0:f.volScale)==null?void 0:E.length)===3&&(u=f.volScale.slice())}catch(f){}e.opts.multiplanarEqualSize&&(u=[1,1,1]);const[n,t,b]=u,s=Math.max(n,t,b),c=((g=e.uiData)==null?void 0:g.dpr)||1,v=(parseFloat(`${e.opts.multiplanarPadPixels}`)||0)*c;let p=(e.opts.tileMargin||0)*c;p<0&&(p=2*(2+Math.ceil(e.fontPx||0)));const U=f=>(f-1)*v+f*p,y=f=>(f-1)*v+f*p,d=e.opts.multiplanarShowRender===Ye.ALWAYS||e.opts.multiplanarForceRender===!0,S=d?Wa(s,t+b+b+s,l,i,U(1),y(4)):Wa(s,t+b+b,l,i,U(1),y(3)),_=d?Wa(n+n+t+s,Math.max(t,b),l,i,U(4),y(1)):Wa(n+n+t,Math.max(t,b),l,i,U(3),y(1)),C=Wa(n+t,t+b,l,i,U(2),y(2));return[{layout:Qa.GRID,name:"grid",scale:C},{layout:Qa.COLUMN,name:"column",scale:S},{layout:Qa.ROW,name:"row",scale:_}]}function rl(e){if(!(e!=null&&e.gl))return null;const l=il(e);if(!l)return null;const i=l.reduce((n,t)=>t.scale>n.scale+1e-6?t:n),u=e.opts.multiplanarLayout!==i.layout;return e.opts.multiplanarLayout=i.layout,Ba(Ta({},i),{changed:u})}function nl(e){let l="";const i=e.drawScene.bind(e);e.drawScene=function(){var u,n,t;if(e.opts.sliceType===Na.MULTIPLANAR&&e.gl){const b=[e.gl.canvas.width,e.gl.canvas.height,e.opts.multiplanarShowRender,e.opts.multiplanarForceRender,e.opts.multiplanarEqualSize,(t=(n=(u=e.volumes)==null?void 0:u[0])==null?void 0:n.id)!=null?t:""].join("|");b!==l&&(l=b,rl(e))}return i()}}const le=[{id:"multi",label:"All",title:"All planes",type:Na.MULTIPLANAR},{id:"axial",label:"A",title:"Axial only",type:Na.AXIAL},{id:"coronal",label:"C",title:"Coronal only",type:Na.CORONAL},{id:"sagittal",label:"S",title:"Sagittal only",type:Na.SAGITTAL},{id:"render",label:"3D",title:"3D render only",type:Na.RENDER}];function ul(e,l){const i=document.createElement("div");i.id="paneSwitcher",i.className="pane-switcher",i.setAttribute("role","group"),i.setAttribute("aria-label","Visible planes");for(const n of le){const t=document.createElement("button");t.type="button",t.dataset.pane=n.id,t.textContent=n.label,t.title=n.title,t.setAttribute("aria-label",n.title),t.addEventListener("click",()=>Re(e,i,n.id)),i.appendChild(t)}const u=document.createElement("button");return u.type="button",u.className="pane-reset",u.textContent="⟲",u.title="Reset zoom and pan",u.setAttribute("aria-label","Reset zoom and pan"),u.addEventListener("click",()=>Ae(e)),i.appendChild(u),l.appendChild(i),i}function Re(e,l,i){const u=le.find(n=>n.id===i)||le[0];e.setSliceType(u.type),l.querySelectorAll("button").forEach(n=>n.classList.toggle("active",n.dataset.pane===u.id))}function sl(e){var b;const l=document.getElementById("canvas-container")||document.body,i=ul(e,l);i.querySelector('button[data-pane="multi"]').classList.add("active"),nl(e);let u=0;const n=()=>{u=0,document.body.classList.toggle("nv-narrow",ll());const s=e.canvas,c=e.opts.forceDevicePixelRatio===0?window.devicePixelRatio||1:e.opts.forceDevicePixelRatio<0?1:e.opts.forceDevicePixelRatio;s&&e.opts.isResizeCanvas!==!1&&(Math.abs(s.width-s.offsetWidth*c)>1||Math.abs(s.height-s.offsetHeight*c)>1)?e.resizeListener():e.drawScene()},t=()=>{u||(u=requestAnimationFrame(n))};return window.addEventListener("resize",t),window.addEventListener("orientationchange",t),(b=window.visualViewport)==null||b.addEventListener("resize",t),typeof ResizeObserver!="undefined"&&new ResizeObserver(t).observe(l),n(),{refresh:t,setPane:s=>Re(e,i,s)}}let ke=null,$a=!1,ee=null,Da=!1,Za=[];const Ie=new URLSearchParams(window.location.search).get("backend")==="webgl2";function fl(){return N(this,null,function*(){const e={secureContext:window.isSecureContext,navigatorGpuExists:"gpu"in navigator,adapterObtained:!1,deviceObtained:!1,f16Support:!1,error:null};if(window.isSecureContext||(console.warn("WebGPU requires a secure context (HTTPS or localhost)."),console.warn("Current origin:",window.location.origin)),"gpu"in navigator)try{console.log("Requesting WebGPU adapter...");const l=yield navigator.gpu.requestAdapter();if(l){e.adapterObtained=!0,console.log("WebGPU adapter obtained:",l),l.info&&console.log("Adapter info:",l.info),console.log("Adapter limits:",{maxBufferSize:l.limits.maxBufferSize,maxStorageBufferBindingSize:l.limits.maxStorageBufferBindingSize,maxComputeWorkgroupsPerDimension:l.limits.maxComputeWorkgroupsPerDimension});const i={maxBufferSize:l.limits.maxBufferSize,maxStorageBufferBindingSize:l.limits.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:l.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:l.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:l.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:l.limits.maxComputeWorkgroupSizeZ,maxComputeWorkgroupStorageSize:l.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:l.limits.maxComputeWorkgroupsPerDimension},u=l.features.has("shader-f16");e.f16Support=u;const n=u?["shader-f16"]:[];ke=yield l.requestDevice({requiredLimits:i,requiredFeatures:n}),e.deviceObtained=!0,$a=!0,console.log(`✓ WebGPU initialized successfully. F16: ${u?"enabled":"not available"}`)}else console.warn("WebGPU adapter request returned null."),console.warn("This typically means:"),console.warn("  - Safari: WebGPU feature flags not enabled in Settings > Feature Flags"),console.warn("  - Unsupported GPU hardware"),console.warn("  - GPU drivers need updating"),e.error="Adapter returned null"}catch(l){e.error=l.message,console.error("WebGPU initialization error:",l),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(console.warn("Safari detected. To enable WebGPU:"),console.warn("  1. Open Safari Settings/Preferences"),console.warn('  2. Go to Advanced tab, enable "Show features for web developers"'),console.warn("  3. Go to Feature Flags tab"),console.warn("  4. Enable: WebGPU, GPU Process: DOM Rendering, GPU Process: Canvas Rendering"),console.warn("  5. Restart Safari"))}else console.warn("navigator.gpu not found. WebGPU API is not available in this browser."),e.error="navigator.gpu not found",navigator.userAgent.includes("Firefox")&&(console.warn("Firefox detected. To enable WebGPU in about:config:"),console.warn("  1. Set dom.webgpu.enabled = true"),console.warn("  2. Set gfx.webgpu.ignore-blocklist = true"),console.warn("  3. Restart Firefox"));return ol($a&&!Ie,e),$a||console.log("Falling back to WebGL backend."),window.webgpuDiagnostics=e,e})}function ol(e,l){const i=document.getElementById("backendStatus");if(!i){console.log("Backend status element not found in DOM");return}if(e){const u=l.f16Support?" (F16)":"";i.textContent=`WebGPU${u}`,i.style.color="#4CAF50",i.title="WebGPU backend active - fastest performance"}else{i.textContent="WebGL",i.style.color="#FF9800";let u="WebGL backend (fallback)";l.error&&(u+=`
Reason: ${l.error}`),l.secureContext||(u+=`
⚠ Not a secure context (HTTPS required)`),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(u+=`

To enable WebGPU in Safari:
1. Settings > Feature Flags
2. Enable WebGPU flags
3. Restart Safari`),navigator.userAgent.includes("Firefox")&&(u+=`

To enable WebGPU in Firefox:
1. about:config > dom.webgpu.enabled = true
2. gfx.webgpu.ignore-blocklist = true
3. Restart Firefox`),i.title=u}}function cl(){return N(this,null,function*(){let e="",l="",i,u=null,n=null;const t="altKey";let b=null,s=null,c=null;const v=.9;let p=null;const U=document.getElementById("sampleSelect"),y=document.getElementById("maskToggle"),d=document.getElementById("modelRunButton");let S=null,_=null;function C(){S=null,_=null,ee=null,y&&(y.checked=!1,y.disabled=!0)}const x=document.getElementById("dragSegmented");x&&x.querySelectorAll("button").forEach(P=>{P.onclick=()=>{o.opts.dragMode=parseInt(P.dataset.drag,10),x.querySelectorAll("button").forEach(r=>r.classList.toggle("active",r===P))}});const T=document.getElementById("drawBtn"),B=document.getElementById("drawPopover"),F=document.getElementById("penRow"),$=document.getElementById("drawApplyRow");function X(P){B&&(B.hidden=!P,T&&T.setAttribute("aria-expanded",String(P)))}function a(P){o.setDrawingEnabled(P>=0),P>=0&&o.setPenValue(P&7,P>7),F&&F.querySelectorAll(".chip").forEach(r=>r.classList.toggle("active",parseInt(r.dataset.pen,10)===P))}function O(P){return N(this,null,function*(){if(o.volumes.length<2){window.alert("No segmentation open (run a model first).");return}if(P===0){o.drawUndo();return}if(!o.drawBitmap){window.alert("Nothing drawn yet — pick a pen and draw on the image first.");return}const r=o.volumes[1].img,k=yield o.saveImage({filename:"",isSaveDrawing:!0}),q=352,K=r.length;if(P===1)for(let A=0;A<K;A++)k[q+A]>0&&(r[A]=1);if(P===2)for(let A=0;A<K;A++)k[q+A]>0&&(r[A]=0);o.closeDrawing(),o.updateGLVolume(),o.setDrawingEnabled(!1),a(-1)})}T&&(T.onclick=P=>{P.stopPropagation(),X(B.hidden)}),F&&F.querySelectorAll(".chip").forEach(P=>{P.onclick=()=>a(parseInt(P.dataset.pen,10))}),$&&$.querySelectorAll(".chip").forEach(P=>{P.onclick=()=>O(parseInt(P.dataset.apply,10))}),document.addEventListener("click",P=>{!B||B.hidden||P.target.closest(".popover-wrap")||X(!1)}),document.addEventListener("keydown",P=>{P.key==="Escape"&&X(!1)});const E=document.getElementById("appDialog");E&&E.addEventListener("click",P=>{P.target===E&&E.close()}),aboutBtn.onclick=function(){Ea("About Brainchomp",`
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
    `)},diagnosticsBtn.onclick=function(){let P=e;if(P.length<1&&window.webgpuDiagnostics){const k=window.webgpuDiagnostics;P=`:: Startup Diagnostics ::
`,P+=`Secure Context: ${k.secureContext}
`,P+=`WebGPU Enabled: ${$a}
`,P+=`F16 Support: ${k.f16Support}
`,k.error&&(P+=`Error: ${k.error}
`),P+=`User Agent: ${navigator.userAgent}
`}if(P.length<1&&window.webgpuDiagnostics,P.length<1){Ea("Diagnostics","No diagnostic string generated: run a model to create diagnostics");return}let r=P;l=l.slice(0,-2),l!==""&&r.includes("Status: OK")&&(r=r.replace("Status: OK",`Status: ${l}`)),l="",navigator.clipboard.writeText(r).then(()=>{Ea("Diagnostics",`<p>Diagnostics copied to clipboard</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${r}</pre>`)}).catch(k=>{Ea("Diagnostics",`<p>Failed to copy to clipboard.</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${r}</pre>`)})},opacitySlider0.oninput=function(){o.setOpacity(0,opacitySlider0.value/255),o.updateGLVolume()},opacitySlider1.oninput=function(){o.setOpacity(1,opacitySlider1.value/255)};function g(){return N(this,null,function*(){const P=o.volumes[0],r=256*256*256;if(!(P.dims[1]===256&&P.dims[2]===256&&P.dims[3]===256&&P.img.length===r))throw new Error(`Brainchomp currently requires a pre-conformed 256 × 256 × 256 NIfTI; received ${P.dims[1]} × ${P.dims[2]} × ${P.dims[3]}.`)})}function f(){return N(this,null,function*(){for(;o.volumes.length>1;)yield o.removeVolume(o.volumes[1])})}function M(){return o.volumes.length>=2&&o.volumes[1].colormapLabel?o.volumes[1]:null}function G(){b=null,s=null,c=null}function D(){const P=M();if(P){if(s===null&&(s=P.img),b===null)P.img=s,c=null;else{const r=s,k=new r.constructor(r.length);for(let q=0;q<r.length;q++)k[q]=r[q]===b?b:0;P.img=k,c=I(b)}o.updateGLVolume()}}function I(P){const r=o.volumes[0],k=s||o.volumes[1]&&o.volumes[1].img;if(!r||!k)return null;const q=r.hdr.pixDims||[],K=q[1]&&q[2]&&q[3]?q[1]*q[2]*q[3]:1,A=oa(r.img,k,K),na=A.reduce((la,ca)=>la+ca.volume_mm3,0),Q=A.find(la=>la.label===P);if(!Q)return null;const j=na>0?Q.volume_mm3/na*100:0,z=[Q.name,`${Ga(Q.volume_mm3)} cm3   (${j.toFixed(1)}% of brain)`,`${Q.voxels.toLocaleString()} voxels`,`intensity  ${Q.mean.toFixed(0)} +/- ${Q.stdev.toFixed(0)}`];let Y=[1,1,1,1];if(n&&n.R&&n.R[P]!=null){const la=ca=>Math.min(255,ca*.55+130)/255;Y=[la(n.R[P]),la(n.G[P]),la(n.B[P]),1]}return{lines:z,color:Y}}function W(){if(b===null||!c||!M())return;const P=o.screenSlices&&o.screenSlices.find(ca=>ca.axCorSag===4);if(!P)return;const[r,k]=P.leftTopWidthHeight,q=o.gl;q.viewport(0,0,q.canvas.width,q.canvas.height),q.enable(q.BLEND);const A=o.fontPx*v*1.55,na=o.fontPx*.6,Q=r+na,j=k+na,z=[.92,.92,.92,1],{lines:Y,color:la}=c;o.drawText([Q,j],Y[0],v,la);for(let ca=1;ca<Y.length;ca++)o.drawText([Q,j+ca*A],Y[ca],v,z)}function R(){const P=M();if(!P)return null;const r=o.frac2mm(o.scene.crosshairPos,0,!0),k=P.mm2vox(r),q=P.img;s&&(P.img=s);const K=Math.round(P.getValue(k[0],k[1],k[2],P.frame4D));return P.img=q,K}function Z(P){M()&&(b=P===0||P===b?null:P,D())}function ia(P){if(!P[t]||!M())return;const r=R();r===null||Number.isNaN(r)||(Z(r),P.preventDefault())}function H(){return N(this,null,function*(){if(!Da){Da=!0,d&&(d.disabled=!0),Za=[];try{yield Ua()}catch(P){console.error("Inference could not start:",P),Ea("Input not supported",qa((P==null?void 0:P.message)||String(P)))}finally{Da=!1,d&&(d.disabled=!1)}}})}function Ua(){return N(this,null,function*(){const P=modelSelect.value;if(P==="-1"||modelSelect.selectedIndex<0)return;yield f(),G(),yield g();const r=wa[P],k=Ta({},st),q=new URL("./",window.location.href).href;k.rootURL=q.endsWith("/")?q.slice(0,-1):q;const K=o.volumes[0].img;if($a&&!Ie&&r.webgpu_safetensor){console.log("Attempting WebGPU backend...");const j=Ba(Ta({},r),{enableTTA:!1});try{yield Ft(ke,k,j,o.volumes[0].hdr,K,sa,va);return}catch(z){console.error("WebGPU inference failed, falling back to WebWorker.",z)}}if(r.webgpu_safetensor)try{const{runInferenceWebGl2:j,nativeWebgl2Available:z}=yield je(()=>N(null,null,function*(){const{runInferenceWebGl2:Y,nativeWebgl2Available:la}=yield import("./inference-webgl2-BmaBQJ4A.js");return{runInferenceWebGl2:Y,nativeWebgl2Available:la}}),[],import.meta.url);if(z()){console.log("Attempting native WebGL2 runner..."),yield j(k,r,o.volumes[0].hdr,K,sa,va);return}console.log("Native WebGL2 unavailable here (no OffscreenCanvas/webgl2); using the tfjs worker.")}catch(j){console.warn("Native WebGL2 declined or failed, falling back to the tfjs worker.",j.message)}if(console.log("Attempting WebWorker backend..."),typeof i!="undefined"){console.log("Worker is busy. Please wait.");return}const A={dims:o.volumes[0].hdr.dims,datatypeCode:o.volumes[0].hdr.datatypeCode},na=j=>new Promise((z,Y)=>{const la=Ba(Ta({},k),{enableSeqConv:j}),ca=Ba(Ta({},r),{enableSeqConv:j,enableTTA:!1});i=new Zt({}),i.postMessage({opts:la,modelEntry:ca,niftiHeader:A,niftiImage:K}),i.onmessage=function(ya){const{cmd:ma,message:Ra,progressFrac:za,modalMessage:fa,statData:La,img:Ne,opts:Fe,modelEntry:ze}=ya.data;if(ma==="ui"){if(fa){if(i.terminate(),i=void 0,La&&La.Status==="Fail"){Y(new Error(La.Error_Type||fa));return}if(typeof fa=="string"&&(fa.toLowerCase().includes("fail")||fa.toLowerCase().includes("error")||fa.toLowerCase().includes("compatible")||fa.toLowerCase().includes("texture")||fa.toLowerCase().includes("maximum"))){Y(new Error(fa));return}}va(Ra,za,fa,La)}ma==="img"&&(i.terminate(),i=void 0,sa(Ne,Fe,ze),z())},i.onerror=function(ya){console.error("WebWorker failed",ya),i.terminate(),i=void 0,Y(ya)}});try{console.log("Attempting WebWorker with enableSeqConv: false"),yield na(!1);return}catch(j){console.warn("WebWorker (fast) failed, retrying with enableSeqConv: true",j),typeof i!="undefined"&&(i.terminate(),i=void 0),console.log("Waiting 1000ms for WebGL context cleanup..."),yield new Promise(z=>setTimeout(z,1e3));try{console.log("Attempting WebWorker with enableSeqConv: true"),yield na(!0);return}catch(z){console.error("WebWorker (slow) failed, falling back to Main Thread.",z)}}console.log("Attempting Main Thread backend...");const Q=j=>new Promise((z,Y)=>{const la=Ba(Ta({},k),{enableSeqConv:j}),ca=Ba(Ta({},r),{enableSeqConv:j}),ya=(Ra,za,fa,La)=>{La&&La.Status==="Fail"?Y(new Error(La.Error_Type||fa||"Inference Failed")):fa&&typeof fa=="string"&&(fa.toLowerCase().includes("fail")||fa.toLowerCase().includes("error")||fa.toLowerCase().includes("compatible")||fa.toLowerCase().includes("texture")||fa.toLowerCase().includes("maximum"))&&Y(new Error(fa)),va(Ra,za,fa,La)},ma=(Ra,za,fa)=>{sa(Ra,za,fa),z()};wt(la,ca,o.volumes[0].hdr,K,ma,ya).catch(Ra=>Y(Ra))});try{console.log("Attempting Main Thread with enableSeqConv: false"),yield Q(!1)}catch(j){console.warn("Main Thread (fast) failed, retrying with enableSeqConv: true",j),yield new Promise(z=>setTimeout(z,100));try{console.log("Attempting Main Thread with enableSeqConv: true"),yield Q(!0)}catch(z){console.error("Main Thread (slow) failed.",z),vl(z)}}})}modelSelect.onchange=H,d&&(d.onclick=()=>{modelSelect.value="0",H()}),y&&(y.onchange=()=>{S&&J().catch(P=>{console.error("Could not switch result overlay:",P),Ea("Overlay error",qa((P==null?void 0:P.message)||String(P)))})});function Ma(P){const r=M(),k=b!==null&&r&&s;k&&(r.img=s);try{return P()}finally{k&&D()}}function _a(P){return N(this,null,function*(){if(!S||!_){window.alert("No result to save (run Skull-strip first).");return}const r=yield o.volumes[0].clone();if(r.zeroImage(),Object.assign(r.hdr,{scl_inter:0,scl_slope:1}),P==="mask"){r.img=S,r.hdr.datatypeCode=2,r.hdr.numBitsPerVoxel=8,r.hdr.intent_code=1002,r.saveToDisk("brainmask.nii.gz");return}r.img=_,r.hdr.intent_code=0,r.saveToDisk("skull_stripped_brain.nii.gz")})}function V(){if(o.volumes.length<1){window.alert("No image loaded.");return}o.volumes[0].saveToDisk("input.nii.gz")}function aa(){return N(this,null,function*(){if(o.volumes.length<1){window.alert("No image loaded.");return}yield Ma(()=>N(null,null,function*(){yield o.saveDocument("brainchomp.nvd")}))})}const ua=[{act:()=>_a("brain"),title:"Skull-stripped brain",sub:"input intensities with background set to zero",need:"result"},{act:()=>_a("mask"),title:"Brain mask",sub:"binary largest-component mask",need:"result"},{act:V,title:"Input volume",sub:"the currently loaded 256³ NIfTI",need:"img"},{act:aa,title:"Scene",sub:"everything, as a .nvd document",need:"img"}];function ea(){const P=o.volumes.length>=1,r=!!S,k=A=>A==="result"?r:P,q=ua.map((A,na)=>{const Q=k(A.need)?"":" disabled";return`<button type="button" class="save-opt${Q}" data-i="${na}"${Q?" disabled":""}>
        <span class="save-opt-title">${A.title}</span>
        <span class="save-opt-sub">${A.sub}</span>
      </button>`}).join("");Ea("Save",`<div class="save-options">${q}</div>`,{hideClose:!0,saveMode:!0});const K=document.getElementById("dialogMessage");K&&K.querySelectorAll(".save-opt:not(.disabled)").forEach(A=>{A.onclick=()=>{const na=ua[parseInt(A.dataset.i,10)],Q=document.getElementById("appDialog");Q&&Q.open&&Q.close(),na.act()}})}const ta=document.getElementById("saveBtn");ta&&(ta.onclick=ea);function oa(P,r,k){const K=new Map,A=r.length;for(let j=0;j<A;j++){const z=r[j];if(z===0)continue;let Y=K.get(z);Y||(Y={count:0,sum:0,sumSq:0,hist:new Float64Array(256)},K.set(z,Y));const la=P[j];Y.count++,Y.sum+=la,Y.sumSq+=la*la,Y.hist[la]++}const na=(j,z,Y)=>{const la=Y*z;let ca=0;for(let ya=0;ya<j.length;ya++)if(ca+=j[ya],ca>=la)return ya;return j.length-1},Q=[];for(const[j,z]of[...K.entries()].sort((Y,la)=>Y[0]-la[0])){const Y=z.sum/z.count,la=Math.max(0,z.sumSq/z.count-Y*Y);let ca=0,ya=0;for(let ma=0;ma<z.hist.length;ma++)if(z.hist[ma]>0){ca=ma;break}for(let ma=z.hist.length-1;ma>=0;ma--)if(z.hist[ma]>0){ya=ma;break}Q.push({label:j,name:u&&u[j]!=null?u[j]:`label_${j}`,voxels:z.count,volume_mm3:z.count*k,min:ca,max:ya,q1:na(z.hist,z.count,.25),median:na(z.hist,z.count,.5),q3:na(z.hist,z.count,.75),mean:Y,stdev:Math.sqrt(la)})}return Q}function da(P){const r=["label","name","voxels","volume_mm3","min","max","q1","median","q3","mean","stdev"],k=A=>Number.isInteger(A)?String(A):A.toFixed(6),q=A=>/[",\n]/.test(A)?`"${String(A).replace(/"/g,'""')}"`:String(A),K=[r.join(",")];for(const A of P)K.push([A.label,q(A.name),A.voxels,k(A.volume_mm3),A.min,A.max,A.q1,A.median,A.q3,k(A.mean),k(A.stdev)].join(","));return K.join(`
`)+`
`}function ra(P){const r=new Blob([da(P)],{type:"text/csv"}),k=URL.createObjectURL(r),q=document.createElement("a");q.href=k,q.download="mask_stats.csv",document.body.appendChild(q),q.click(),q.remove(),URL.revokeObjectURL(k)}const Sa=P=>String(P).replace(/[&<>"]/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[r]),Ga=P=>{const r=P/1e3;return r>=10?Math.round(r).toLocaleString():r.toFixed(1)};function ba(P,r){const k=Math.max(...P.map(A=>A.volume_mm3)),q=A=>n&&n.R&&n.R[A.label]!=null?`rgb(${n.R[A.label]},${n.G[A.label]},${n.B[A.label]})`:"#6b9bd1";let K="";for(const A of P){const na=r>0?A.volume_mm3/r*100:0,Q=k>0?A.volume_mm3/k*100:0,j=`<span class="stat-val" data-cm3="${Ga(A.volume_mm3)}" data-pct="${na.toFixed(1)}%">${Ga(A.volume_mm3)}</span>`,z=`<span class="stat-bar" style="width:${Q.toFixed(2)}%;background:${q(A)}" data-w-abs="${Q.toFixed(2)}" data-w-pct="${na.toFixed(2)}"></span>`,Y=(ca,ya)=>`<div><span class="k">${ca}</span><span class="v">${ya}</span></div>`,la=Y("min",A.min)+Y("max",A.max)+Y("Q1",A.q1)+Y("Q3",A.q3)+Y("median",A.median)+Y("mean",A.mean.toFixed(2))+Y("SD",A.stdev.toFixed(2))+Y("voxels",A.voxels.toLocaleString());K+=`
        <div class="stat-row" role="button" tabindex="0" data-label="${A.label}" style="cursor:pointer">
          <div class="stat-line">
            <span class="stat-name">${Sa(A.name)}</span>
            <span class="stat-track">${z}</span>
            ${j}
            <button type="button" class="stat-iso" title="Show only this region in the viewer">isolate</button>
          </div>
          <div class="stat-detail" style="display:none">${la}</div>
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
          <span class="stat-total" id="statsUnitLabel">total ${Ga(r)} cm³</span>
        </div>
        <div class="stat-toggle">
          <button type="button" data-mode="cm3" class="active">cm³</button>
          <button type="button" data-mode="pct">% of total</button>
        </div>
        <div id="statsRows">${K}</div>
        <div class="stat-actions">
          <button type="button" id="statsDownloadBtn">Download CSV</button>
        </div>
      </div>`}saveStatsBtn.onclick=function(){if(o.volumes.length<2){window.alert("No segmentation to measure (run a model first).");return}const P=o.volumes[0].img,r=s||o.volumes[1].img;if(!P||!r||P.length!==r.length){window.alert("Input and segmentation grids do not match.");return}const k=o.volumes[0].hdr.pixDims||[],q=k[1]&&k[2]&&k[3]?k[1]*k[2]*k[3]:1;let K=oa(P,r,q);if(K.length===0){window.alert("No non-background labels found in the segmentation.");return}K=K.slice().sort((Q,j)=>j.volume_mm3-Q.volume_mm3);const A=K.reduce((Q,j)=>Q+j.volume_mm3,0);Ea("Region volumes",ba(K,A));const na=document.getElementById("statsPanel");na&&(na.querySelectorAll(".stat-toggle button").forEach(Q=>{Q.onclick=()=>{const j=Q.dataset.mode;na.querySelectorAll(".stat-toggle button").forEach(z=>z.classList.toggle("active",z===Q)),document.getElementById("statsUnitLabel").textContent=j==="pct"?"100% of segmented volume":`total ${Ga(A)} cm³`,na.querySelectorAll(".stat-row").forEach(z=>{const Y=z.querySelector(".stat-val"),la=z.querySelector(".stat-bar");Y.textContent=j==="pct"?Y.dataset.pct:Y.dataset.cm3,la.style.width=(j==="pct"?la.dataset.wPct:la.dataset.wAbs)+"%"})}}),na.querySelectorAll(".stat-row").forEach(Q=>{const j=()=>{const z=Q.querySelector(".stat-detail");z.style.display=z.style.display==="none"?"grid":"none"};Q.onclick=j,Q.onkeydown=z=>{(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),j())}}),na.querySelectorAll(".stat-iso").forEach(Q=>{Q.onclick=j=>{j.stopPropagation();const z=parseInt(Q.closest(".stat-row").dataset.label,10);Number.isNaN(z)||Z(z);const Y=document.getElementById("appDialog");Y&&Y.open&&Y.close()}}),document.getElementById("statsDownloadBtn").onclick=()=>ra(K))};function ha(){p=o.volumes[0]||null,p&&p.name&&p.name,opacitySlider0.oninput(),modelSelect.value="-1",o.volumes.length===1&&C()}function J(){return N(this,null,function*(){if(!S||!_||!ee)return;yield f(),G();const P=yield o.volumes[0].clone();if(P.zeroImage(),Object.assign(P.hdr,{scl_inter:0,scl_slope:1}),u=null,n=null,y!=null&&y.checked){P.img=S;const r=["Background","Brain Mask"];u=r.slice();const k=[0,217],q=[0,119],K=[0,33];n={R:k,G:q,B:K},P.setColormapLabel({R:k,G:q,B:K,labels:r}),P.hdr.datatypeCode=2,P.hdr.numBitsPerVoxel=8,P.hdr.intent_code=1002}else P.img=_,P.hdr.intent_code=0,P.colormap=o.colormaps().includes("copper2")?"copper2":"actc";P.opacity=opacitySlider1.value/255,yield o.addVolume(P)})}function sa(P,r,k){return N(this,null,function*(){ee=k,S=new Uint8Array(P.length),_=new o.volumes[0].img.constructor(P.length);const q=o.volumes[0].img;for(let K=0;K<P.length;K++){const A=P[K]!==0?1:0;S[K]=A,_[K]=q[K]*A}y&&(y.disabled=!1),yield J()})}function Oa(P){return N(this,null,function*(){if(typeof P=="string")try{P=JSON.parse(P)}catch(r){console.error("Failed to parse telemetry data",r);return}P=yield Ht(P,o.gl),e=`:: Diagnostics https://github.com/neuroneural/brainchop/issues ::
`;for(const r in P)P[r]!==null&&P[r]!==void 0&&(e+=`${r}: ${P[r]}
`)})}function va(P="",r=-1,k="",q=[]){P&&(console.log(P),document.getElementById("location").innerHTML=P),isNaN(r)?(memstatus.style.color="red",memstatus.innerHTML="Memory Issue"):r>=0&&(modelProgress.value=r*modelProgress.max),k&&(Da?(Za.push(String(k)),console.warn("[backend]",k)):Ea("Message",qa(String(k)).replace(/\n/g,"<br>"))),q&&Object.keys(q).length>0&&Oa(q)}function pa(P){document.getElementById("location").innerHTML=P.string.split("   ").map(r=>r.trim()).filter(r=>r!=="").map(r=>`<span class="loc-seg">${r}</span>`).join('<span class="loc-sep">&middot;</span>')}const m={backColor:[0,0,0,1],show3Dcrosshair:!0,onLocationChange:pa},o=new Xe(m);yield o.attachTo("gl1"),o.gl.canvas.addEventListener("click",ia),window.addEventListener("keydown",P=>{P.key!=="Escape"||b===null||document.querySelector("dialog[open]")||(b=null,D())});const w=o.gl.uniform4fv.bind(o.gl);o.gl.uniform4fv=function(P,r){if(b!==null){const k=o.orientShaderAtlasU&&o.orientShaderAtlasU.uniforms.xyzaFrac,q=o.orientShaderAtlasI&&o.orientShaderAtlasI.uniforms.xyzaFrac;if(k&&P===k||q&&P===q)return w(P,[0,0,0,r[3]])}return w(P,r)};const L=o.drawSceneCore.bind(o);o.drawSceneCore=function(){const P=L();try{W()}catch(r){console.warn("isolation HUD draw failed",r)}return P},Object.assign(o.opts,{dragMode:o.dragModes.slicer3D,multiplanarForceRender:!0,yoke3Dto2DZoom:!0,crosshairGap:11});{const P=document.getElementById("dragSegmented");P&&P.querySelectorAll("button").forEach(r=>r.classList.toggle("active",parseInt(r.dataset.drag,10)===o.opts.dragMode))}o.setInterpolation(!0);function Aa(P){return N(this,null,function*(){for(C();o.volumes.length;)yield o.removeVolume(o.volumes[o.volumes.length-1]);G(),yield o.loadVolumes([{url:P}])})}o.onImageLoaded=ha,U&&(U.onchange=()=>Aa(U.value),yield Aa(U.value)),modelSelect.innerHTML="";const xa=document.createElement("option");xa.text="Run Segmentation Model",xa.value="-1",xa.disabled=!0,xa.selected=!0,xa.hidden=!0,modelSelect.appendChild(xa);for(let P=0;P<wa.length;P++){console.log(`Adding model option: ${wa[P].modelName}`);const r=document.createElement("option");r.text=wa[P].modelName,r.value=P,wa[P].type==="Divider"&&(r.disabled=!0),modelSelect.appendChild(r)}sl(o),al(o),modelSelect.value="-1",a(-1),yield fl();const h=new URLSearchParams(window.location.search).get("model");h&&h<wa.length&&(modelSelect.value=h,H())})}function qa(e){return String(e).replace(/[&<>"']/g,l=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[l])}function vl(e){const i=(Za.length?Za:[e&&e.message?e.message:String(e||"unknown error")]).map(u=>`<li>${qa(u)}</li>`).join("");Ea("Segmentation failed",`<p>No available backend could run this model on this device.</p>
     <ul style="margin:0 0 4px 1.1em;padding:0;font-size:0.92em;line-height:1.45">${i}</ul>
     <p style="font-size:0.88em;color:#9aa4af">Full details are in the browser console and under Diagnostics.</p>`)}function Ea(e,l,i={}){const u=document.getElementById("appDialog"),n=document.getElementById("dialogTitle"),t=document.getElementById("dialogMessage"),b=document.getElementById("dialogCloseBtn");if(!u)return;n.textContent=e,t.innerHTML=l,b.style.display=i.hideClose?"none":"",b.onclick=()=>u.close(),u.classList.toggle("dialog-save",!!i.saveMode);const s=document.getElementById("dialogXBtn");s&&(s.onclick=()=>u.close()),u.showModal()}function dl(){return N(this,null,function*(){try{const l=yield(yield fetch("https://api.github.com/repos/neuroneural/brainchop")).json();document.getElementById("star-count").textContent=l.stargazers_count}catch(e){console.error("Error fetching star count:",e)}})}(function(){return N(this,null,function*(){yield cl(),yield dl()})})();
