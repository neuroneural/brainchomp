var Fe=Object.defineProperty,ze=Object.defineProperties;var We=Object.getOwnPropertyDescriptors;var fe=Object.getOwnPropertySymbols;var $e=Object.prototype.hasOwnProperty,De=Object.prototype.propertyIsEnumerable;var oe=(e,l,i)=>l in e?Fe(e,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[l]=i,xa=(e,l)=>{for(var i in l||(l={}))$e.call(l,i)&&oe(e,i,l[i]);if(fe)for(var i of fe(l))De.call(l,i)&&oe(e,i,l[i]);return e},Ga=(e,l)=>ze(e,We(l));var z=(e,l,i)=>new Promise((r,n)=>{var t=c=>{try{s(i.next(c))}catch(v){n(v)}},b=c=>{try{s(i.throw(c))}catch(v){n(v)}},s=c=>c.done?r(c.value):Promise.resolve(c.value).then(t,b);s((i=i.apply(e,l)).next())});import{m as qe}from"./vendor-gTbkpY2o.js";import{S as ka,a as Ve,M as Za,N as je}from"./vendor-niivue-Czlz1REu.js";import{l as Ye,t as Da,s as Xe,d as ma,b as ye,a as ga,z as He,g as Se,w as qa,f as he,m as Ze,o as Ke,c as Qa,e as Je,h as te,i as Ha,r as Pe,j as Qe,k as Ue,n as at,p as et,q as _e,u as Pa,v as me,x as tt,y as Ra,A as lt,B as Ka,C as it,D as rt}from"./vendor-tf-DGuKl8vL.js";import"./vendor-math-CA38DMGy.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const b of t.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&r(b)}).observe(document,{childList:!0,subtree:!0});function i(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(n){if(n.ep)return;n.ep=!0;const t=i(n);fetch(n.href,t)}})();const nt={batchSize:1,numOfChan:1,isColorEnable:!0,isAutoColors:!0,bgLabelValue:0,drawBoundingVolume:!1,isGPU:!0,isBrainCropMaskBased:!0,showPhase1Output:!1,isPostProcessEnable:!0,fillSuppressedWithNeighborLabel:!1,diagnoseEnclosedComponents:!1,isContoursViewEnable:!1,browserArrayBufferMaxZDim:30,telemetryFlag:!1,chartXaxisStepPercent:10,uiSampleName:"Brainchomp sample",atlasSelectedColorTable:"Fire"},ce={path:"/models/rodent/model.json",webgpu_safetensor:"./models/rodent/model.safetensors",webgpu_runner:"rodent",forceFP32:!1,webgpuStorageSize:536870912,numClasses:2,preModelId:null,preModelPostProcess:!1,isBatchOverlapEnable:!1,numOverlapBatches:0,enableTranspose:!0,enableCrop:!1,cropPadding:0,autoThreshold:0,enableQuantileNorm:!1,filterOutWithPreMask:!1,enableSeqConv:!0,textureSize:0,isPostProcessEnable:!0,inferenceDelay:100,warning:null},Ma=[Ga(xa({},ce),{id:1,type:"Brain_Extraction",modelName:"Skull-strip",description:"Extract the rodent brain and save the input intensities with non-brain voxels set to zero."}),Ga(xa({},ce),{id:2,type:"Brain_Masking",modelName:"Brainmask",description:"Extract the rodent brain and save the post-processed binary foreground mask."})];class ut{idx(l,i,r,n){return r*n[0]*n[1]+i*n[0]+l}check_previous_slice(l,i,r,n,t,b,s,c,v,p){let P=0;if(!t)return 0;const y=l[this.idx(r,n,t,b)];if(s>=6){const d=this.idx(r,n,t-1,b);y===l[d]&&(v[P++]=i[d])}if(s>=18){if(r){const d=this.idx(r-1,n,t-1,b);y===l[d]&&(v[P++]=i[d])}if(n){const d=this.idx(r,n-1,t-1,b);y===l[d]&&(v[P++]=i[d])}if(r<b[0]-1){const d=this.idx(r+1,n,t-1,b);y===l[d]&&(v[P++]=i[d])}if(n<b[1]-1){const d=this.idx(r,n+1,t-1,b);y===l[d]&&(v[P++]=i[d])}}if(s===26){if(r&&n){const d=this.idx(r-1,n-1,t-1,b);y===l[d]&&(v[P++]=i[d])}if(r<b[0]-1&&n){const d=this.idx(r+1,n-1,t-1,b);y===l[d]&&(v[P++]=i[d])}if(r&&n<b[1]-1){const d=this.idx(r-1,n+1,t-1,b);y===l[d]&&(v[P++]=i[d])}if(r<b[0]-1&&n<b[1]-1){const d=this.idx(r+1,n+1,t-1,b);y===l[d]&&(v[P++]=i[d])}}return P?(this.fill_tratab(c,v,P,p),v[0]):0}do_initial_labelling(l,i,r){const n=new Uint32Array(32),t=new Uint32Array(32);let b=1;const s=8192;let c=s,v=new Uint32Array(c).fill(0);const p=new Uint32Array(i[0]*i[1]*i[2]).fill(0),P=new Uint32Array(27);for(let y=0;y<i[2];y++)for(let d=0;d<i[1];d++)for(let S=0;S<i[0];S++){let _=0;const G=l[this.idx(S,d,y,i)];if(G!==0){if(P[0]=this.check_previous_slice(l,p,S,d,y,i,r,v,n,t),P[0]&&(_+=1),r>=6){if(S){const x=this.idx(S-1,d,y,i);G===l[x]&&(P[_++]=p[x])}if(d){const x=this.idx(S,d-1,y,i);G===l[x]&&(P[_++]=p[x])}}if(r>=18){if(d&&S){const x=this.idx(S-1,d-1,y,i);G===l[x]&&(P[_++]=p[x])}if(d&&S<i[0]-1){const x=this.idx(S+1,d-1,y,i);G===l[x]&&(P[_++]=p[x])}}if(_)p[this.idx(S,d,y,i)]=P[0],this.fill_tratab(v,P,_,t);else{if(p[this.idx(S,d,y,i)]=b,b>=c){c+=s;const x=new Uint32Array(c);x.set(v),v=x}v[b-1]=b,b++}}}for(let y=0;y<b-1;y++){let d=y;for(;v[d]!==d+1;)d=v[d]-1;v[y]=d+1}return[b-1,v,p]}fill_tratab(l,i,r,n){let b=2147483647;for(let s=0;s<r;s++){let c=i[s];for(;l[c-1]!==c;)c=l[c-1];n[s]=c,b=Math.min(b,c)}for(let s=0;s<r;s++)l[n[s]-1]=b}translate_labels(l,i,r,n){const t=i[0]*i[1]*i[2];let b=0;const s=new Uint32Array(t).fill(0);for(let p=0;p<n;p++)b=Math.max(b,r[p]);const c=new Uint32Array(b).fill(0);let v=0;for(let p=0;p<t;p++)l[p]&&(c[r[l[p]-1]-1]||(v+=1,c[r[l[p]-1]-1]=v),s[p]=c[r[l[p]-1]-1]);return[v,s]}neighbor_winners(l,i,r,n){const t=i[0],b=i[1],s=i[2],c=t*b,v=new Map,p=(y,d)=>{let S=v.get(y);S||(S=new Map,v.set(y,S)),S.set(d,(S.get(d)||0)+1)};for(let y=0;y<s;y++)for(let d=0;d<b;d++)for(let S=0;S<t;S++){const _=y*c+d*t+S,G=l[_];if(G===0||r[G])continue;let x;S>0&&(x=r[l[_-1]])&&p(G,x),S<t-1&&(x=r[l[_+1]])&&p(G,x),d>0&&(x=r[l[_-t]])&&p(G,x),d<b-1&&(x=r[l[_+t]])&&p(G,x),y>0&&(x=r[l[_-c]])&&p(G,x),y<s-1&&(x=r[l[_+c]])&&p(G,x)}const P=new Uint32Array(n+1).fill(0);for(const[y,d]of v){let S=0,_=0;for(const[G,x]of d)(x>_||x===_&&(S===0||G<S))&&(_=x,S=G);P[y]=S}return P}finalize_volume(l,i,r,n,t){const b=l.length,s=new Uint32Array(b).fill(0),c=t?this.neighbor_winners(l,i,r,n):null;let v=0;for(let p=0;p<b;p++){const P=l[p];if(P===0)continue;let y=r[P];!y&&c&&(y=c[P]),y&&(s[p]=y,y>v&&(v=y))}return[v,s]}diagnose_components(l,i,r,n,t={}){var B,g,f;const b=(B=t.topN)!=null?B:50,s=(g=t.minSize)!=null?g:1,c=(f=t.label)!=null?f:"diag",v=n[0],p=n[1],P=n[2],y=v*p,d=new Uint32Array(i+1),S=new Uint32Array(i+1);for(let E=0;E<l.length;E++){const M=r[E];M&&(d[M]=l[E],S[M]++)}const _=new Map,G=new Uint32Array(i+1),x=new Uint32Array(i+1),L=(E,M)=>{let V=_.get(E);V||(V=new Map,_.set(E,V)),V.set(M,(V.get(M)||0)+1)};for(let E=0;E<P;E++)for(let M=0;M<p;M++)for(let V=0;V<v;V++){const F=E*y+M*v+V,D=r[F];if(!D)continue;const k=d[D],K=ra=>{const J=r[ra];if(J===D)return;x[D]++;const ya=J?d[J]:0;ya===0?G[D]++:ya!==k&&L(D,ya)};V>0&&K(F-1),V<v-1&&K(F+1),M>0&&K(F-v),M<p-1&&K(F+v),E>0&&K(F-y),E<P-1&&K(F+y)}const I=new Map,W=new Map;for(let E=1;E<=i;E++){const M=d[E];I.set(M,(I.get(M)||0)+1),(!W.has(M)||S[E]>W.get(M))&&W.set(M,S[E])}const q=[];for(let E=1;E<=i;E++){if(S[E]<s)continue;const M=d[E],V=_.get(E);let F=0,D=0,k=0;if(V)for(const[ra,J]of V)k+=J,J>D&&(D=J,F=ra);const K=x[E]||1;q.push({comp:E,class:M,size:S[E],largestOfClass:S[E]===W.get(M)?"Y":"n",compsInClass:I.get(M),domNeighbor:F,domFracForeign:k?+(D/k).toFixed(2):0,domFracBoundary:+(D/K).toFixed(2),bgFrac:+(G[E]/K).toFixed(2)})}q.sort((E,M)=>M.domFracForeign-E.domFracForeign||M.size-E.size);const Z=(E,M)=>{const V=M.map(D=>Math.max(D.h.length,...E.map(k=>String(k[D.k]).length))),F=D=>D.map((k,K)=>String(k).padStart(V[K])).join("  ");return[F(M.map(D=>D.h)),...E.map(D=>F(M.map(k=>D[k.k])))].join(`
`)},a=[{k:"comp",h:"comp"},{k:"class",h:"class"},{k:"size",h:"size"},{k:"largestOfClass",h:"lrg"},{k:"compsInClass",h:"nComp"},{k:"domNeighbor",h:"domNbr"},{k:"domFracForeign",h:"encF"},{k:"domFracBoundary",h:"encB"},{k:"bgFrac",h:"bgF"}];console.log(`[${c}] total components=${i}, distinct classes=${I.size}
[${c}] island candidates (encF≈1 + small size + lrg=n ⇒ swallowed island):
`+Z(q.slice(0,b),a));const A=[...I.entries()].map(([E,M])=>({class:E,components:M,maxCompSize:W.get(E)})).sort((E,M)=>M.components-E.components);return console.log(`[${c}] per-class component counts (components=1 ⇒ fully connected):
`+Z(A.slice(0,30),[{k:"class",h:"class"},{k:"components",h:"comps"},{k:"maxCompSize",h:"maxSize"}])),q}largest_original_cluster_labels(l,i,r,n=null,t=!1){const b=l.length,s=new Uint32Array(i+1).fill(0),c=new Uint32Array(i+1).fill(0);for(let v=0;v<b;v++){const p=l[v],P=r[v];s[P]=p,c[P]++}for(let v=0;v<i+1;v++){const p=s[v];for(let P=0;P<i+1;P++)P!==v&&p===s[P]&&(c[v]<c[P]||c[v]===c[P]&&v<P)&&(s[v]=0)}return this.finalize_volume(r,n,s,i,t)}filter_clusters(l,i,r,n,t=null,b=!1){const s=l.length,c=new Uint32Array(i+1).fill(0),v=new Uint32Array(i+1).fill(0);for(let y=0;y<s;y++){const d=l[y],S=r[y];S>0&&(c[S]=d,v[S]++)}const p=new Uint8Array(i+1).fill(1);for(let y=1;y<=i;y++){const d=c[y];if(n==="all"||n.has&&n.has(d)){for(let _=1;_<=i;_++)if(y!==_&&c[_]===d){if(v[_]>v[y]){p[y]=0;break}else if(v[_]===v[y]&&_<y){p[y]=0;break}}}}const P=new Uint32Array(i+1).fill(0);for(let y=1;y<=i;y++)p[y]&&(P[y]=c[y]);return this.finalize_volume(r,t,P,i,b)}filter_clusters_by_ratio(l,i,r,n,t=null,b=!1){const s=l.length,c=new Uint32Array(i+1).fill(0),v=new Uint32Array(i+1).fill(0);for(let d=0;d<s;d++){const S=r[d];S>0&&(c[S]===0&&(c[S]=l[d]),v[S]++)}const p=new Map;for(let d=1;d<=i;d++){const S=c[d],_=v[d];(!p.has(S)||_>p.get(S))&&p.set(S,_)}const P=new Uint8Array(i+1).fill(0);for(let d=1;d<=i;d++){const S=c[d],_=v[d],G=p.get(S)||0;_>=G*n&&(P[d]=1)}const y=new Uint32Array(i+1).fill(0);for(let d=1;d<=i;d++)P[d]&&(y[d]=c[d]);return this.finalize_volume(r,t,y,i,b)}bwlabel(l,i,r=26,n=!1,t=!1){const b=Date.now(),s=i[0]*i[1]*i[2],c=new Uint32Array(s).fill(0);if(![6,18,26].includes(r))return console.log("bwlabel: conn must be 6, 18 or 26."),[0,c];if(i[0]<2||i[1]<2||i[2]<1)return console.log("bwlabel: img must be 2 or 3-dimensional"),[0,c];if(n)for(let S=0;S<s;S++)l[S]!==0&&(c[S]=1);else c.set(l);let[v,p,P]=this.do_initial_labelling(c,i,r);p===void 0&&(p=new Uint32Array(0));const[y,d]=this.translate_labels(P,i,p,v);if(console.log(r+" neighbor clustering into "+y+" regions in "+(Date.now()-b)+"ms"),t){const[S,_]=this.largest_original_cluster_labels(c,y,d);return[S,_]}return[y,d]}filter_clusters_by_rank(l,i,r,n,t=0,b=null,s=!1,c=null,v=!1){const p=l.length,P=new Uint32Array(i+1).fill(0),y=new Uint32Array(i+1).fill(0),d=c!=null&&Array.isArray(b)&&b.length===3,S=d?b[0]:0,_=d?b[1]:0,G=d?new Int32Array(i+1).fill(2147483647):null,x=d?new Int32Array(i+1).fill(-1):null,L=d?new Int32Array(i+1).fill(2147483647):null,I=d?new Int32Array(i+1).fill(-1):null,W=d?new Int32Array(i+1).fill(2147483647):null,q=d?new Int32Array(i+1).fill(-1):null;for(let f=0;f<p;f++){const E=r[f];if(E>0&&(P[E]===0&&(P[E]=l[f]),y[E]++,d)){const M=f%S,V=f/S|0,F=V%_,D=V/_|0;M<G[E]&&(G[E]=M),M>x[E]&&(x[E]=M),F<L[E]&&(L[E]=F),F>I[E]&&(I[E]=F),D<W[E]&&(W[E]=D),D>q[E]&&(q[E]=D)}}let Z=null,a=0;if(d){let f=-1;for(let k=1;k<=i;k++)y[k]>f&&(f=y[k],a=k);const E=Math.max(2,Math.ceil(c)+4),M=S*_,V=new Int16Array(p).fill(-1);let F=[];for(let k=0;k<p;k++)r[k]===a&&(V[k]=0,F.push(k));for(let k=1;k<=E&&F.length;k++){const K=[];for(let ra=0;ra<F.length;ra++){const J=F[ra],ya=J%S,Ua=(J/S|0)%_;ya>0&&V[J-1]===-1&&(V[J-1]=k,K.push(J-1)),ya<S-1&&V[J+1]===-1&&(V[J+1]=k,K.push(J+1)),Ua>0&&V[J-S]===-1&&(V[J-S]=k,K.push(J-S)),Ua<_-1&&V[J+S]===-1&&(V[J+S]=k,K.push(J+S)),J-M>=0&&V[J-M]===-1&&(V[J-M]=k,K.push(J-M)),J+M<p&&V[J+M]===-1&&(V[J+M]=k,K.push(J+M))}F=K}const D=E+1;Z=new Float64Array(i+1).fill(D);for(let k=0;k<p;k++){const K=r[k];if(K>0&&K!==a){const ra=V[k]>=0?V[k]:D;ra<Z[K]&&(Z[K]=ra)}}v&&console.log(`[rank-filter] brain comp=${a} size=${f} bbox A[${G[a]},${x[a]}] B[${L[a]},${I[a]}] C[${W[a]},${q[a]}] | maxGap=${c} scan=${E}`)}const A=new Map;for(let f=1;f<=i;f++){const E=P[f],M=y[f];A.has(E)||A.set(E,[]),A.get(E).push({i:f,size:M})}const B=new Uint8Array(i+1).fill(0);for(const[f,E]of A.entries()){E.sort((D,k)=>k.size-D.size);const M=E.length?E[0].size:0,V=t>0?M*t:0,F=Math.min(E.length,n);for(let D=0;D<F;D++){const k=E[D];if(k.size<V){v&&D>0&&console.log(`[rank-filter] class ${f} #${D}: size=${k.size} DROP (below ${(t*100).toFixed(0)}% floor)`);break}if(D>0&&d){const K=Z[k.i],ra=K<=c;if(v&&console.log(`[rank-filter] class ${f} #${D}: size=${k.size} surfDist=${K} -> ${ra?"KEEP":"DROP (too far)"}`),!ra)continue}B[k.i]=1}}const g=new Uint32Array(i+1).fill(0);for(let f=1;f<=i;f++)B[f]&&(g[f]=P[f]);return this.finalize_volume(r,b,g,i,s)}}function st(e,l,i){return z(this,null,function*(){const[r,n,t,b,s,c]=yield St(l),v=n-r+1,p=b-t+1,P=c-s+1,y=(A,B,g,f)=>{const E=Math.min(A,f),M=Math.min(255-B,f),V=Math.max(0,A-E),F=Math.min(255,B+M);return[V,F]},[d,S]=y(r,n,v,i),[_,G]=y(t,b,p,i),[x,L]=y(s,c,P,i);let I=e.slice([d,_,x],[S-d+1,G-_+1,L-x+1]);const W=I.shape,q=W[0]%2,Z=W[1]%2,a=W[2]%2;return q||Z||a?(I=I.pad([[0,q],[0,Z],[0,a]]),console.log(`Padded to even dims: [${W}] -> [${I.shape}]`)):console.log(`Crop dimensions (already even): [${W}]`),{cropped:I,corner:[d,_,x],padding:[q,Z,a]}})}function ft(n,t,b){return z(this,arguments,function*(e,l,i,r=[0,0,0]){const[s,c,v]=l,[p,P,y]=i,[d,S,_]=e.shape,[G,x,L]=r||[0,0,0],I=Math.max(0,s+G),W=Math.max(0,c+x),q=Math.max(0,v+L),Z=[[I,Math.max(0,p-d-I)],[W,Math.max(0,P-S-W)],[q,Math.max(0,y-_-q)]],a=e.pad(Z);if(a.shape[0]>p||a.shape[1]>P||a.shape[2]>y){const A=a.slice([0,0,0],[p,P,y]);return a.dispose(),A}return a})}function ot(e,l){return z(this,null,function*(){const i=e.max(),r=i.mul(l),n=yield r.data();return i.dispose(),r.dispose(),ga(()=>e.clone().greater(n[0]))})}function ct(e,l=.01,i=.99){return z(this,null,function*(){const r=e.flatten(),n=r.shape[0],t=yield r.data();r.dispose();const b=Math.min(1e5,n);let s;if(b>=n)s=Array.from(t);else{s=new Array(b);for(let d=0;d<b;d++){const S=Math.floor(Math.random()*n);s[d]=t[S]}}s.sort((d,S)=>d-S);const c=s.length,v=Math.floor(c*l),p=Math.ceil(c*i)-1,P=s[v],y=s[p];return{qmin:P,qmax:y}})}function vt(e,l,i,r,n,t,b){return z(this,null,function*(){const s=e.shape[4],c=l.shape[4];let v=null;for(let p=0;p<c;p++){const P=Math.ceil(s/b);let y=null;for(let S=0;S<P;S++){const _=S*b,G=Math.min((S+1)*b,s);if(_<s){const x=ga(()=>{const L=e.slice([0,0,0,0,_],[-1,-1,-1,-1,G-_]),I=l.slice([0,0,0,_,p],[-1,-1,-1,G-_,1]);return Ha(L,I,r,n,"NDHWC",t)});if(y===null)y=x;else{const L=y.add(x);y.dispose(),x.dispose(),y=L}}}let d;if(i){const S=i.slice([p],[1]);d=y.add(S),y.dispose(),S.dispose()}else d=y;if(v==null)v=d;else{const S=yield te([v,d],4);d.dispose(),v.dispose(),v=S}}return v})}function dt(e,l=1e-5){return ga(()=>{const{mean:i,variance:r}=et(e,[1,2,3],!0),n=Pe(r.add(l));return e.sub(i).mul(n)})}function gt(e,l,i,r,n,t,b){return z(this,null,function*(){const s=e.shape[4],c=l.shape[4];let v=null;for(let p=0;p<c;p++){const P=Math.ceil(s/b);let y=null;for(let _=0;_<P;_++){const G=_*b,x=Math.min((_+1)*b,s);if(G<s){const L=ga(()=>{const I=e.slice([0,0,0,0,G],[-1,-1,-1,-1,x-G]),W=l.slice([0,0,0,G,p],[-1,-1,-1,x-G,1]);return Ha(I,W,r,n,"NDHWC",t)});if(y===null)y=L;else{const I=y.add(L);y.dispose(),L.dispose(),y=I}}}let d;if(i){const _=i.slice([p],[1]);d=y.add(_),y.dispose(),_.dispose()}else d=y;const S=dt(d);if(d.dispose(),v===null)v=S;else{const _=yield te([v,S],4);S.dispose(),v.dispose(),v=_}}return v})}function xe(e,l,i,r,n,t,b,s){const c=e.length;return ga(()=>{let v=null;const p=Math.ceil(c/s);for(let P=0;P<p;P++){const y=P*s,d=Math.min((P+1)*s,c),S=d-y,_=S===1?e[y]:te(e.slice(y,d),4),G=l.slice([0,0,0,y,r],[-1,-1,-1,S,1]),x=Ha(_,G,n,t,"NDHWC",b);v=v===null?x:v.add(x)}return i&&(v=v.add(i.slice([r],[1]))),v})}function ve(e,l,i,r,n,t,b,s=!1){const c=l.shape[4],v=[];for(let p=0;p<c;p++){let P=xe(e,l,i,p,r,n,t,b);if(s){const y=Ce(P);P.dispose(),P=y}v.push(P)}return v}function bt(e,l,i,r,n,t){const b=l.shape[3],s=l.shape[4],c=[1,r[0],r[1],r[2],1],v=[];for(let p=0;p<b;p++){const P=ga(()=>{let y=null;for(let d=0;d<s;d++){const S=l.slice([0,0,0,p,d],[-1,-1,-1,1,1]),_=Je(e[d],S,c,n,t);y=y===null?_:y.add(_)}return i&&(y=y.add(i.slice([p],[1]))),y});v.push(P)}return v}function pt(e,l,i,r,n,t,b,s=!0){return z(this,null,function*(){const c=l.shape[4],v=3;let p=null,P=null,y=null;for(let d=0;d<c;d++){const S=xe(e,l,i,d,r,n,t,v);y===null&&(y=[S.shape[1],S.shape[2],S.shape[3]]);const _=ga(()=>S.reshape(y));if(S.dispose(),p===null)p=_,P=He(_);else{const[G,x]=ga(()=>{const L=Se(_,p);return[qa(L,_,p),qa(L,he(P.shape,d),P)]});p.dispose(),P.dispose(),_.dispose(),p=G,P=x}b&&b(`Final layer class ${d+1}/${c}`,(d+1)/c),!s&&d%8===0&&(yield new Promise(G=>setTimeout(G,0)))}return p.dispose(),P})}function yt(e){const l=e.shape[4];if(l===1)return[e];const i=[];for(let r=0;r<l;r++)i.push(e.slice([0,0,0,0,r],[-1,-1,-1,-1,1]));return i}function Ce(e,l=1e-5){return ga(()=>{const i=e.shape.length,r=e.shape[i-1],n=e.shape[1]*e.shape[2]*e.shape[3],t=e.transpose([0,4,1,2,3]).reshape([r,n]),b=t.mean(1),c=t.sub(b.reshape([r,1])).square().mean(1),v=Pe(Qe(c,l)),p=b.reshape([1,1,1,1,r]),P=v.reshape([1,1,1,1,r]);return e.sub(p).mul(P)})}function Ja(e,l=0){return z(this,null,function*(){let i=[];l===0?i=yield e.max(2).max(1).arraySync():l===1?i=yield e.max(2).max(0).arraySync():i=yield e.max(1).max(0).arraySync();let r=i.length,n=0;for(let t=0;t<i.length;t++)if(i[t]>0){r=t;break}for(let t=i.length-1;t>=0;t--)if(i[t]>0){n=t;break}return[r,n]})}function St(e){return z(this,null,function*(){const[l,i]=yield Ja(e,0),[r,n]=yield Ja(e,1),[t,b]=yield Ja(e,2);return console.log("row min and max  :",l,i),console.log("col min and max  :",r,n),console.log("depth min and max  :",t,b),[l,i,r,n,t,b]})}function ht(e,l,i,r,n,t,b,s,c=!0){return z(this,null,function*(){e[0].dtype!=="int32"&&b("",-1,"generateBrainMask assumes int32"),n.preModelPostProcess&&b("",-1,"generateBrainMask assumes BWLabeler instead of preModelPostProcess");const v=e.length,p=e[0].size,P=v*p,y=new Int32Array(P);let d=0;for(let S=0;S<v;S++)y.set(e[S].dataSync(),d),d+=p;for(let S=0;S<P;S++)y[S]=y[S]!==0?1:0;return(c||t.showPhase1Output)&&(s(y,t,n),b("Segmentation finished",0)),Da(y,[l,i,r])})}function Pt(e,l,i){return z(this,null,function*(){const r=l.dims[1],n=l.dims[2];let t;if(l.datatypeCode===2)t=new Uint8Array(i);else if(l.datatypeCode===4)t=new Int16Array(i);else if(l.datatypeCode===8)t=new Int32Array(i);else if(l.datatypeCode===16)t=new Float32Array(i);else if(l.datatypeCode===64)t=new Float64Array(i);else if(l.datatypeCode===256)t=new Int8Array(i);else if(l.datatypeCode===512)t=new Uint16Array(i);else if(l.datatypeCode===768)t=new Uint32Array(i);else return;const b=[];let s=0;for(let v=0;v<e;v++){const p=new Array(n*r);let P=0;for(let y=0;y<n;y++)for(let d=0;d<r;d++){const S=t[s++];p[P++]=S&255}b.push(Da(p,[n,r]))}const c=Xe(b);return ma(b),c})}function Ge(e){return z(this,null,function*(){return e.layers.length})}function Me(e){return z(this,null,function*(){let l=0;for(let i=0;i<e.layers.length;i++)l+=e.layers[i].countParams();return l})}function Va(e){return z(this,null,function*(){for(let l=0;l<e.layers.length;l++)if(e.layersByDepth[l][0].dataFormat)return e.layersByDepth[l][0].dataFormat==="channelsLast"})}function Te(e){return z(this,null,function*(){return yield Ye(e)})}function le(e){return z(this,null,function*(){const l=e.max(),i=e.min();return yield e.sub(i).div(l.sub(i))})}function Ut(e,l,i){const b=e.shape[4],s=Math.ceil(b/i);let c=null;for(let v=0;v<s;v++){const p=v*i,y=Math.min((v+1)*i,b)-p,d=ga(()=>e.slice([0,0,0,0,p],[-1,-1,-1,-1,y])),S=ga(()=>l.slice([0,0,0,p,0],[-1,-1,-1,y,-1])),_=Ha(d,S,1,0,"NDHWC",1);d.dispose(),S.dispose();const G=Ue(_);if(_.dispose(),c===null)c=G;else{const x=c.add(G);c.dispose(),c!==G&&G.dispose(),c=x}ga(()=>{at(Qa([1,1]),Qa([1,1]))})}return c}function ie(e,l=.05,i=.95){return z(this,null,function*(){const{qmin:r,qmax:n}=yield ct(e,l,i),t=n-r,b=e.sub(r),s=b.div(t);return b.dispose(),s})}class _t{constructor(l,i,r,n,t=!0){this.model=l,this.outChannels=l.outputLayers[0].kernel.shape[4],this.chunkSize=i,this.isChannelLast=r,this.callbackUI=n,this.isWebWorker=t}apply(l){return z(this,null,function*(){const i=performance.now(),r=this.model.layers[this.model.layers.length-1],n=r.getWeights()[0],t=r.getWeights()[1],b=this.isChannelLast?l.shape.slice(1,-1):l.shape.slice(2);let s=yield Ze(Ke(b),-1e4),c=yield Qa(b);const v=3,p=Math.ceil(this.outChannels/v);for(let d=0;d<p;d++){const S=d*v,_=Math.min((d+1)*v,this.outChannels),[G,x]=yield ga(()=>{let L=s,I=c;for(let W=S;W<_;W++){const q=n.slice([0,0,0,0,W],[-1,-1,-1,-1,1]),Z=t.slice([W],[1]),a=Ut(l,q,Math.min(this.chunkSize,this.outChannels)).add(Z),A=Se(a,L);L=qa(A,a,L),I=qa(A,he(I.shape,W),I)}return[L,I]});ma([s,c]),s=G,c=x,this.callbackUI(`Processing chunk ${d+1}/${p}`,(d+1)/p),this.isWebWorker||(yield new Promise(L=>setTimeout(L,0)))}const P=c.clone();ma([s,c]);const y=performance.now();return console.log(`Execution time: ${y-i} milliseconds`),P})}}function Ee(e,l,i,r){return z(this,null,function*(){console.log("Downloading segmentation data from GPU to CPU...");const n=yield e.data(),t=e.shape;if(console.log("Data download complete. Starting CPU processing."),r.isPostProcessEnable){console.log("Applying CPU-based connected-component labeling...");const b=performance.now(),s=new ut,c=[5,14],v=!!r.fillSuppressedWithNeighborLabel||c.includes(i.id),p=t[0]*t[1]*t[2],P=Math.max(1e5,Math.floor(p*.01)),[y,d]=s.bwlabel(n,t,6,!1,!1);if(y>P){const x=`Segmentation produced noise: ${y.toLocaleString()} disconnected regions (cap ${P.toLocaleString()}). The model output is unusable, so post-processing was aborted. Try re-running, switching backend (WebGPU/WebGL2), or another model.`;console.error("[postprocess] "+x);const L=new Error(x);throw L.code="SEGMENTATION_NOISE",L}let S=!1,_=!1;if(i.type==="Brain_Extraction"||i.type==="Brain_Masking"?(S=!0,_=!0):[1,7].includes(i.id)?(S=!1,_=!1):[5,14].includes(i.id)?(S=!1,_=!0):[3,8,9].includes(i.id)?(S=!1,_=!1):(S=!0,_=!0),[1,7].includes(i.id)){const W=y,q=d,[Z,a]=s.filter_clusters_by_rank(n,W,q,2,.02,t,v,8,!1);n.set(a)}else if(!_&&[3,8,9].includes(i.id)){const[x,L]=s.bwlabel(n,t,6,!0,!0);for(let A=0;A<n.length;A++)n[A]*=L[A];const[I,W]=s.bwlabel(n,t,6,!1,!1),q=new Set([1,2,5,6,13]),[Z,a]=s.filter_clusters(n,I,W,q,t,v);n.set(a)}else if(!S&&_){r.diagnoseEnclosedComponents&&s.diagnose_components(n,y,d,t,{label:`model${i.id}`,topN:60});const[x,L]=s.largest_original_cluster_labels(n,y,d,t,v);n.set(L)}else{const[x,L]=s.bwlabel(n,t,6,S,_);if(S)for(let I=0;I<n.length;I++)n[I]*=L[I];else n.set(L)}const G=((performance.now()-b)/1e3).toFixed(4);console.log(`Connected-component labeling took: ${G} seconds.`)}switch(i.type){case"Brain_Masking":{const b=new Uint8Array(n.length);for(let s=0;s<n.length;s++)b[s]=n[s]!==0?1:0;return b}case"Brain_Extraction":{const b=new l.constructor(n.length);for(let s=0;s<n.length;s++){const c=n[s]!==0?1:0;b[s]=l[s]*c}return b}default:return new Uint8Array(n)}})}function re(e,l,i){var c;let r=0,n=1;if(i)if(l.length===5)n=l[1]*l[2]*l[3];else for(let v=0;v<l.length;v++)l[v]>1&&(n*=l[v]);else if(l.length===5)n=l[2]*l[3]*l[4];else for(let v=0;v<l.length;v++)l[v]>32&&(n*=l[v]);let t=0,b=0;if(e&&e.layers){const v=e.layers.length;for(let p=0;p<v;p++){const P=e.layers[p],y=p===v-1;let d=0,S=P.outputShape;Array.isArray(S)&&Array.isArray(S[0])&&(S=S[0]),Array.isArray(S)&&(i?d=S[S.length-1]:d=S[1]);let _=0;const G=P.batchInputShape,x=L=>Array.isArray(L)?i?L[L.length-1]:L[1]:0;if(G)if(Array.isArray(G)&&Array.isArray(G[0]))for(const L of G)_+=x(L);else Array.isArray(G)&&(_=x(G));if(_===0&&P.weights&&P.weights.length>0){const L=P.weights[0];L&&L.shape&&(L.shape.length===5?_=L.shape[3]:L.shape.length===4&&(_=L.shape[2]))}if(_===0&&(_=d),typeof d=="number"&&typeof _=="number"){const L=n*(_+d),I=n*d;!y&&L>r&&(r=L);const W=n*Math.max(_,d);!y&&W>b&&(b=W),t=I}}}r===0&&(r=n*32*2),b===0&&(b=n*32);const s=!!(e&&e.layers&&e.layers.some(v=>typeof v.name=="string"&&v.name.endsWith("_gn")));return console.log(`[Estimator] Total Layers: ${(c=e==null?void 0:e.layers)==null?void 0:c.length}, Peak(in+out): ${r}, MaxSingle: ${b}, Final Output: ${t}, unpackedIntermediate: ${s}`),{peak:r,maxSingle:b,maxOutput:t,hasUnpackedIntermediate:s}}function we(e,l){try{const i=ye();if(i&&i.gpgpu&&i.gpgpu.gl){const r=i.gpgpu.gl.getParameter(i.gpgpu.gl.MAX_TEXTURE_SIZE),n=Math.ceil(e/4),t=Math.ceil(Math.sqrt(n)),s=Math.ceil(Math.sqrt(l));if(console.log(`[Memory Check] Peak: ${e}, MaxOutput: ${l}, Packed Dim: ${t}, Unpacked Dim: ${s}, MaxTextureSize: ${r}`),t>r)return console.warn(`Proactive check (PACKED): Tensor size ${e} requires approx ${t}x${t} texture. Exceeds MAX_TEXTURE_SIZE ${r}`),!1;if(s>r)return console.warn(`Proactive check (UNPACKED): Max output ${l} requires approx ${s}x${s} texture. Exceeds MAX_TEXTURE_SIZE ${r}`),!1}}catch(i){console.warn("Could not check texture size limits:",i)}return!0}const ja={WEBGPU:"webgpu",WEBGL_MAIN:"webgl-main",WEBGL_SEQUENTIAL:"webgl-sequential"};function Oe(e,l){return{startTime:Date.now(),Model_Name:(e==null?void 0:e.modelName)||"Unknown",Execution_Mode:l,TF_Backend:l===ja.WEBGPU?"webgpu":"webgl",isModelFullVol:null,No_SubVolumes:1,Brainchop_Ver:"FullVolume",Input_Shape:null,Output_Shape:null,Channel_Last:null,Model_Param:null,Model_Layers:null,Actual_Labels:null,Expect_Labels:null,NumLabels_Match:null,Missing_Labels:null,Inference_t:null,Postprocess_t:null,Status:null,Error_Type:null,Extra_Err_Info:null}}function mt(e,l,i,r,n,t){return z(this,null,function*(){var b,s,c;if(l)try{e.Input_Shape=JSON.stringify(i),e.Output_Shape=JSON.stringify(((b=l.output)==null?void 0:b.shape)||((c=(s=l.outputs)==null?void 0:s[0])==null?void 0:c.shape)),e.Channel_Last=r,n&&(e.Model_Param=yield n(l)),t&&(e.Model_Layers=yield t(l))}catch(v){console.warn("Failed to add model info to diagnostics:",v)}})}function ne(e,l,i,r=null){e.Expect_Labels=l,e.Actual_Labels=i,e.NumLabels_Match=l===i,r&&r.length>0&&(e.Missing_Labels=r.join(", "))}function ue(e,l,i){e.Inference_t=l,e.Postprocess_t=i,e.Status="OK"}function Ia(e,l,i=null){e.Inference_t=1/0,e.Postprocess_t=1/0,e.Status="Fail",e.Error_Type=(l==null?void 0:l.message)||String(l),i&&(e.Extra_Err_Info=i)}const xt=!1;function Ya(e,l,i,r,n,t,b,s,c){return z(this,null,function*(){const v=performance.now();console.log(`---- Start FullVolume Inference (SeqConv: ${l.enableSeqConv}) ----`),l.enableQuantileNorm?(console.log("preModel Quantile normalization enabled"),r=yield ie(r)):(console.log("preModel Min Max normalization enabled"),r=yield le(r));let p;if(n==null){const Y=l.autoThreshold;Y>0&&Y<=1?p=yield ot(r,Y):p=yield r.greater([0]).asType("bool")}else p=yield n.greater([0]).asType("bool");const P=r.shape,y=l.webglEnableTranspose!==void 0?l.webglEnableTranspose:l.enableTranspose,d=l.cropPadding;let S,_,G;if(l.enableCrop){const Y=yield st(r,p,d);S=Y.cropped,_=Y.corner,G=Y.padding,r.dispose()}else{console.log("Skipping cropping (enableCrop: false)");const Y=r.shape,ea=Y[0]%2,ua=Y[1]%2,la=Y[2]%2;ea||ua||la?(console.log(`Padding standard input to even: ${Y} -> +[${ea}, ${ua}, ${la}]`),S=r.pad([[0,ea],[0,ua],[0,la]]),G=[ea,ua,la],r.dispose()):(S=r,G=null),_=[0,0,0]}p.dispose(),l.inputPermutation?(console.log(`Permuting Input: ${l.inputPermutation}`),S=S.transpose(l.inputPermutation)):y&&(S=S.transpose(),console.log("Input transposed for pre-model"));const x=yield i,L=x.layers.length,I=Va(x);let W;I?(x.layers[0].batchInputShape[1]=S.shape[0],x.layers[0].batchInputShape[2]=S.shape[1],x.layers[0].batchInputShape[3]=S.shape[2],W=[e.batchSize,x.layers[0].batchInputShape[1],x.layers[0].batchInputShape[2],x.layers[0].batchInputShape[3],e.numOfChan]):(x.layers[0].batchInputShape[2]=S.shape[0],x.layers[0].batchInputShape[3]=S.shape[1],x.layers[0].batchInputShape[4]=S.shape[2],W=[e.batchSize,e.numOfChan,x.layers[0].batchInputShape[2],x.layers[0].batchInputShape[3],x.layers[0].batchInputShape[4]]);let q=S.reshape(W),Z=!1;if(!l.enableSeqConv){const{peak:Y,maxSingle:ea,maxOutput:ua,hasUnpackedIntermediate:la}=re(x,W,I);console.log(`[Centralized Check] Peak (In+Out): ${Y}, MaxSingle: ${ea}, Max Output: ${ua}, unpackedIntermediate: ${la}`);const ta=ye(),ca=ta&&ta.gpgpu&&ta.gpgpu.gl?ta.gpgpu.gl.getParameter(ta.gpgpu.gl.MAX_TEXTURE_SIZE):16384;console.log(`[Memory Check] MAX_TEXTURE_SIZE from WebGL context: ${ca}`);const na=Math.ceil(Math.sqrt(Math.ceil(ea/(la?1:4)))),Sa=Math.ceil(Math.sqrt(ua));na>ca?(console.warn(`[Memory Check] PACKED intermediates too large (${na} > ${ca}). Using full SeqConv.`),l.enableSeqConv=!0):Sa>ca?(console.warn(`[Memory Check] UNPACKED output too large (${Sa} > ${ca}). Using chunkedArgMax.`),Z=!0):console.log("[Memory Check] All checks passed. Using fast path.")}const a=l.enableSeqConv?"SeqConv (SLOW: per-channel conv + sync every layer)":Z?"fast + chunkedArgMax (final layer only)":"fast (dense)";console.log(`%c[PATH] ${a}  | crop=${S.shape}  | enableCrop=${l.enableCrop} cropPadding=${l.cropPadding}`,"font-weight:bold;color:#0a0");function A(Y,ea,ua,la,ta,ca,da){return z(this,null,function*(){let na=1,Sa=ea;const La=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),fa=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;let ha=La||fa?10:15;for(ta.enableSeqConv&&(ha=1),console.log(`Syncing GPU every ${ha} layers.`);na<=ua;){performance.now();let Q="";try{let va;const Ta=Y.layers[na],T=Ta.activation,ba=Ta.getClassName()==="Conv3D"&&T&&T.getClassName()==="linear";ta.enableSeqConv&&ba?va=yield(Y.layers[na].name.endsWith("_gn")?gt:vt)(Sa,Y.layers[na].getWeights()[0],Y.layers[na].getWeights()[1],Y.layers[na].strides,Y.layers[na].padding,Y.layers[na].dilationRate,3):xt&&Y.layers[na].name.endsWith("_gn")||(va=ga(()=>{let m=Y.layers[na].apply(Sa);return Y.layers[na].name.endsWith("_gn")&&(m=Ce(m)),m})),Sa.dispose(),Sa=va}catch(va){throw da(va.message,-1,va.message),Pa().endScope(),Pa().disposeVariables(),Ia(ca,va,"Failed while model layer "+na+" apply"),da("",-1,"",ca),va}if(na%ha===0){da("Layer "+na.toString(),(na+1)/la);const va=Sa.slice([0,0,0,0,0],[1,1,1,1,1]);yield va.data(),va.dispose()}else da("Layer "+na.toString(),(na+1)/la);na++}return Sa})}function B(Y,ea,ua,la,ta,ca,da){return z(this,null,function*(){const na=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Sa=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,La=na||Sa?4:6;let fa=yt(ea),ha=1;for(;ha<=ua;){try{const Q=Y.layers[ha],va=Q.getClassName(),Ta=Q.activation;let T;if(va==="Conv3D"&&Ta&&Ta.getClassName()==="linear"){const ba=Q.name.endsWith("_gn");T=ve(fa,Q.getWeights()[0],Q.getWeights()[1],Q.strides,Q.padding,Q.dilationRate,3,ba)}else if(va==="Activation")T=fa.map(ba=>ga(()=>Q.apply(ba)));else if(va==="Conv3D"){T=ve(fa,Q.getWeights()[0],Q.getWeights()[1],Q.strides,Q.padding,Q.dilationRate,3,!1);const ba=T.map(m=>ga(()=>Q.activation.apply(m)));ma(T),T=ba}else if(va==="Conv3DTranspose"){const ba=[fa[0].shape[1],fa[0].shape[2],fa[0].shape[3]],m=Q.computeOutputShape([1,ba[0],ba[1],ba[2],fa.length]),U=[m[1],m[2],m[3]];if(T=bt(fa,Q.getWeights()[0],Q.getWeights()[1],U,Q.strides,Q.padding),Q.activation&&Q.activation.getClassName()!=="linear"){const O=T.map(R=>ga(()=>Q.activation.apply(R)));ma(T),T=O}}else throw new Error(`Channel-list path: unsupported layer ${va} (${Q.name})`);ma(fa),fa=T}catch(Q){throw ma(fa),da(Q.message,-1,Q.message),Pa().endScope(),Pa().disposeVariables(),Ia(ca,Q,"Failed while model layer "+ha+" apply (channel-list)"),da("",-1,"",ca),Q}if(da("Layer "+ha.toString(),(ha+1)/la),ha%La===0){const Q=fa[0].slice([0,0,0,0,0],[1,1,1,1,1]);yield Q.data(),Q.dispose()}ha++}return fa})}const g=performance.now(),E=l.enableSeqConv||Z?L-2:L-1;let M;if(l.enableSeqConv){l.enableTTA&&console.warn("[channel-list] TTA is not supported on the channel-list path; running a single pass.");const Y=yield B(x,q,E,L,l,t,s);S.dispose(),console.log("Applying channel-list final classifier + argmax...");const ea=x.layers[L-1],ua=typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope,la=yield pt(Y,ea.getWeights()[0],ea.getWeights()[1],ea.strides,ea.padding,ea.dilationRate,s,ua);ma(Y),M=la.asType("int32"),la.dispose(),console.log("Channel-list argmax output shape:",M.shape)}else{if(l.enableTTA){console.log("--- Running TTA Pass 1 (Original) ---");const ea=yield A(x,q,E,L,l,t,s);if(!ea)throw new Error("TTA Error: logits1 is null or undefined");console.log("--- Running TTA Pass 2 (Flipped) ---");const ua=l.ttaFlipAxis||1,la=S.clone().reverse(ua).reshape(W),ta=yield A(x,la,E,L,l,t,s);if(!ta)throw new Error("TTA Error: logits2 is null or undefined");console.log("--- Averaging TTA Results ---");const ca=ga(()=>{const da=ta.shape;return ta.reshape([da[0]*da[1],da[2],da[3],da[4]]).reverse(ua).reshape(da)});q=ea.add(ca).div(2),ea.dispose(),ta.dispose(),ca.dispose(),S.dispose()}else q=yield A(x,q,E,L,l,t,s),S.dispose();if(Z){console.log("Applying SequentialConvLayer for final layer only (fast path for layers 1-18)...");const ea=yield new _t(x,10,I,s).apply(q);M=ea.asType("int32"),ea.dispose(),q.dispose(),console.log("SequentialConvLayer (final only) output shape:",M.shape)}else console.log("Applying final ArgMax..."),M=ga(()=>{const ea=_e(q,I?-1:1);return Ue(ea)}),q.dispose(),console.log("ArgMax output shape:",M.shape)}const V=((performance.now()-g)/1e3).toFixed(4);console.log(`---- Inference Time: ${V} seconds ----`),l.outputPermutation?(console.log(`Permuting Output: ${l.outputPermutation}`),M=M.transpose(l.outputPermutation)):y&&(console.log("outLabelVolume transposed"),M=M.transpose());const F=performance.now();if(G&&(G[0]||G[1]||G[2])){const Y=M.shape,ea=[Y[0]-G[0],Y[1]-G[1],Y[2]-G[2]],ua=M.slice([0,0,0],ea);M.dispose(),M=ua,console.log(`Removed padding: [${Y}] -> [${M.shape}]`)}console.log("outLabelVolume without padding shape: ",M.shape),M=yield ft(M,_,P,l.outputShift),console.log("outLabelVolume final shape after restoration: ",M.shape);const D=((performance.now()-F)/1e3).toFixed(4);console.log(`---- Restoration Time: ${D} seconds ----`);const k=performance.now();let K;try{K=yield Ee(M,c,l,e)}catch(Y){throw s(Y.message,-1,Y.message),Ia(t,Y,"Failed during segmentation post-processing"),s("",-1,"",t),M.dispose(),Pa().disposeVariables(),Y}const ra=((performance.now()-k)/1e3).toFixed(4);console.log(`---- Postprocessing Time: ${ra} seconds ----`),M.dispose(),Pa().disposeVariables();const J=((performance.now()-v)/1e3).toFixed(4);console.log(`---- Total Execution Time: ${J} seconds ----`);const Ca=new Set(K).size,Ua=l.numClasses||Ca;return ne(t,Ua,Ca),ue(t,V,ra),s(l.modelName+"<br>Segmentation finished",0),s("",-1,"",t),b(K,e,l),0})}function Ct(e,l,i,r,n,t,b,s,c,v,p,P){return z(this,null,function*(){if(s.No_SubVolumes=1,b.preModelId){const y=yield Te(c.rootURL+Ma[b.preModelId-1].path),d=Ma[b.preModelId-1].enableTranspose,S=Ma[b.preModelId-1].enableQuantileNorm;let _=null;S?(console.log("preModel Quantile normalization enabled"),_=yield ie(l)):(console.log("preModel Min Max normalization enabled"),_=yield le(l)),d?(_=yield _.transpose(),console.log("Input transposed for pre-model")):console.log("Transpose not enabled for pre-model"),s.Brainchop_Ver="PreModel_FV";const G=yield y;try{const x=performance.now(),L=G,I=L.layers[0].batchInputShape;if(console.log(" Pre-Model batch input shape : ",I),I.length!==5){const k="The pre-model input shape must be 5D ";return p(k,-1,k),0}const W=Va(L),q=c.batchSize,Z=c.numOfChan;let a,A,B,g;if(W){if(console.log("Pre-Model Channel Last"),isNaN(I[4])||I[4]!==1){const k="The number of channels for pre-model input shape must be 1";return p(k,-1,k),0}a=I[1],A=I[2],B=I[3],g=[q,a,A,B,Z]}else{if(console.log("Pre-Model Channel First"),isNaN(I[1])||I[1]!==1){const k="The number of channels for pre-model input shape must be 1";return p(k,-1,k),0}a=I[2],A=I[3],B=I[4],g=[q,Z,a,A,B]}s.Input_Shape=JSON.stringify(g),s.Output_Shape=JSON.stringify(L.output.shape),s.Channel_Last=W,s.Model_Param=yield Me(L),s.Model_Layers=yield Ge(L);let f=0;const E=Ma[b.preModelId-1].inferenceDelay;let M=1;const V=G.layers.length,F=[];F[0]=_.reshape(g),ma(_);const D=window.setInterval(function(){return z(this,null,function*(){try{F[M]=yield G.layers[M].apply(F[M-1])}catch(k){const K="Your graphics card (e.g. Intel) may not be compatible with WebGL. "+k.message;return p(K,-1,K),window.clearInterval(D),Pa().endScope(),Pa().disposeVariables(),Ia(s,k,"PreModel Failed while model layer "+M+" apply"),p("",-1,"",s),0}if(G.layers[M].dispose(),F[M-1].dispose(),p("Layer "+M.toString(),(M+1)/V),Ka().unreliable){const k="unreliable reasons :"+Ka().reasons;p(k,NaN,k)}if(M===V-1){window.clearInterval(D);const k=W?-1:1;console.log(" find argmax "),console.log("last Tensor shape : ",F[M].shape);const K=W?F[M].shape[4]:F[M].shape[1];let ra;try{console.log(" Try tf.argMax for fullVolume .."),ra=yield _e(F[M],k)}catch(la){if(k===-1)try{const ta=performance.now();console.log(" tf.argMax failed .. try argMaxLarge .."),window.alert("tensor2LightBuffer() is not dead code?"),window.alert("argMaxLarge() is not dead code?"),console.log("argMaxLarge for fullVolume takes : ",((performance.now()-ta)/1e3).toFixed(4))}catch(ta){const ca="argMax buffer couldn't be created due to limited memory resources.";return p(ca,-1,ca),ra.dispose(),window.clearInterval(D),Pa().endScope(),Pa().disposeVariables(),s.Inference_t=1/0,s.Postprocess_t=1/0,s.Status="Fail",s.Error_Type=ta.message,s.Extra_Err_Info="preModel prediction_argmax from argMaxLarge failed",p("",-1,"",s),0}else{const ta="argMax buffer couldn't be created due to limited memory resources.";return p(ta,-1,ta),ra.dispose(),window.clearInterval(D),Pa().endScope(),Pa().disposeVariables(),s.Inference_t=1/0,s.Postprocess_t=1/0,s.Status="Fail",s.Error_Type=la.message,s.Extra_Err_Info="preModel prediction_argmax from argMaxLarge not support yet channel first",p("",-1,"",s),0}}console.log(" Pre-model prediction_argmax shape : ",ra.shape);const J=((performance.now()-x)/1e3).toFixed(4);ma(F[M]),console.log(" Pre-model find array max ");const ya=yield ra.max().dataSync()[0];f<ya&&(f=ya);const Ca=f+1;console.log("Pre-model numSegClasses",Ca),ne(s,K,Ca);let Ua=yield ra.reshape([i,r,n]);ma(ra),d&&(console.log("Pre-model outLabelVolume transposed"),Ua=Ua.transpose());const Y=performance.now();console.log("Generating pre-model output");let ea;try{const la=yield it(Ua);ea=yield ht(la,i,r,n,b,c,p,v,!1),yield ma(Ua),console.log(" Phase-1 num of tensors after generateBrainMask: ",Ka().numTensors)}catch(la){Pa().endScope(),Pa().disposeVariables();const ta="Failed while generating pre-model output due to limited browser memory available";return p(ta,-1,ta),s.Inference_t=J,Ia(s,la,"Pre-model failed while generating output"),s.Inference_t=J,p("",-1,"",s),0}const ua=((performance.now()-Y)/1e3).toFixed(4);if(console.log("Pre-model processing the whole brain volume in tfjs tooks for multi-class output mask : ",((performance.now()-x)/1e3).toFixed(4)+"  Seconds"),ue(s,J,ua),p("",-1,"",s),ea==null){const la="slice_3d_mask failed ...";return p(la,-1,la),0}else if(console.log("--- pre-model done ---"),t){if(!b.enableSeqConv){const la=[1,...l.shape],ta=re(e,la);console.log(`Proactive Memory Check (Phase 1): Estimated Max Tensor Size: ${ta} elements`),we(ta)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),b.enableSeqConv=!0)}return yield Ya(c,b,e,l,ea,s,v,p,P),0}else window.alert("inferenceSubVolumes() is not dead code?")}M++})},E)}catch(x){p(x.message,-1,x.message),console.log('If webgl context is lost, try to restore webgl context by visit the link <a href="https://support.biodigital.com/hc/en-us/articles/218322977-How-to-turn-on-WebGL-in-my-browser">here</a>')}}else console.log("--- No pre-model is selected ---"),console.log("------ Run voxel cropping ------"),t?Ya(c,b,e,l,null,s,v,p,P):window.alert("inferenceSubVolumes() is not dead code?")})}function Gt(e=!0){return z(this,null,function*(){yield tt(),Ra().set("DEBUG",!1),Ra().set("WEBGL_FORCE_F16_TEXTURES",e),Ra().set("WEBGL_DELETE_TEXTURE_THRESHOLD",-1),yield lt(),console.log("tf env() flags :",Ra().flags),console.log("tf env() features :",Ra().features),console.log("tf env total features: ",Object.keys(Ra().features).length),console.log(me())})}function Mt(e,l,i,r,n,t){return z(this,null,function*(){const b=l.enableSeqConv?ja.WEBGL_SEQUENTIAL:ja.WEBGL_MAIN,s=Oe(l,b);t("Segmentation started",0),performance.now();const c=e.batchSize,v=e.numOfChan;if(isNaN(c)||c!==1){const B="The batch Size for input shape must be 1";return t(B,-1,B),0}if(isNaN(v)||v!==1){const B="The number of channels for input shape must be 1";return t(B,-1,B),0}Pa().startScope(),console.log("Batch size: ",c),console.log("Num of Channels: ",v);const p=yield Te(e.rootURL+l.path),P=!l.forceFP32;yield Gt(P),s.TF_Backend=me();const y=p;yield mt(s,y,y.layers[0].batchInputShape,yield Va(y),Me,Ge);let d=[];if(d=y.layers[0].batchInputShape,console.log(" Model batch input shape : ",d),d.length!==5){const B="The model input shape must be 5D";return t(B,-1,B),0}let S,_,G;const x=i.dims[1],L=i.dims[2],I=i.dims[3];if(yield Va(y)){if(console.log("Model Channel Last"),isNaN(d[4])||d[4]!==1){const B="The number of channels for input shape must be 1";return t(B,-1,B),0}S=d[1],_=d[2],G=d[3]}else{if(console.log("Model Channel First"),isNaN(d[1])||d[1]!==1){const B="The number of channels for input shape must be 1";return t(B,-1,B),0}S=d[2],_=d[3],G=d[4]}let q;S===256&&_===256&&G===256?q=!0:q=!1,s.isModelFullVol=q;let Z=yield Pt(I,i,r);const a=l.enableTranspose,A=l.enableCrop;if(q)if(A)yield Ct(p,Z,I,L,x,q,l,s,e,n,t,r);else{console.log("Cropping Disabled"),a?(Z=Z.transpose(),console.log("Input transposed")):console.log("Transpose NOT Enabled");let B=l.enableSeqConv;if(!B){const g=[1,...Z.shape],f=re(p,g);console.log(`Proactive Memory Check: Estimated Max Tensor Size: ${f} elements`),we(f)||(console.warn("Proactive memory check failed. Switching to enableSeqConv: true"),B=!0,l.enableSeqConv=!0)}B?(console.log("Seq Convoluton Enabled"),Ya(e,l,p,Z,null,s,n,t,r)):(console.log("Seq Convoluton Disabled"),Ya(e,l,p,Z,null,s,n,t,r))}})}const Tt=(()=>{const e=(a,A)=>a.subarray(...A.data_offsets),l=a=>{const A=Number(new DataView(a.buffer).getBigUint64(0,!0)),B=JSON.parse(new TextDecoder("utf8").decode(a.subarray(8,8+A)));return Object.fromEntries(Object.entries(B).filter(([g,f])=>g!=="__metadata__").map(([g,f])=>[g,Ga(xa({},f),{data_offsets:f.data_offsets.map(E=>8+A+E)})]))},i=(a,A)=>a.createBuffer({size:A,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),r=a=>{const B=a.createBuffer({mappedAtCreation:!0,size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});return new Float32Array(B.getMappedRange())[0]=1/0,B.unmap(),B},n=(a,A,B)=>{const g=Math.ceil(A/4)*4,f=a.createBuffer({size:g,usage:GPUBufferUsage.STORAGE,mappedAtCreation:!0});return new Uint8Array(f.getMappedRange()).set(B),f.unmap(),f},t=(a,A,B,g,f,E,M)=>{const V=a.createBindGroup({layout:g,entries:[{binding:0,resource:{buffer:f}},...E.map((D,k)=>({binding:k+1,resource:{buffer:D}}))]}),F=A.beginComputePass();F.setPipeline(B),F.setBindGroup(0,V),F.dispatchWorkgroups(...M),F.end()},b=`enable f16;
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
}`,G=`enable f16;
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
}`,L=`enable f16;
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
}`,I=`enable f16;
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
}`,W=`enable f16;
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
}`,q=(a,A)=>z(null,null,function*(){const B=l(A),g=r(a),f=[a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]})],E=i(a,33554432),M=n(a,864,e(A,B["m.model.0.weight"])),V=n(a,13824,e(A,B["m.model.3.weight"])),F=n(a,13824,e(A,B["m.model.6.weight"])),D=n(a,13824,e(A,B["m.model.9.weight"])),k=n(a,13824,e(A,B["m.model.12.weight"])),K=n(a,13824,e(A,B["m.model.15.weight"])),ra=n(a,13824,e(A,B["m.model.18.weight"])),J=n(a,13824,e(A,B["m.model.21.weight"])),ya=n(a,13824,e(A,B["m.model.24.weight"])),Ca=n(a,13824,e(A,B["m.model.27.weight"])),Ua=n(a,13824,e(A,B["m.model.30.weight"])),Y=n(a,13824,e(A,B["m.model.33.weight"])),ea=n(a,13824,e(A,B["m.model.36.weight"])),ua=n(a,13824,e(A,B["m.model.39.weight"])),la=n(a,13824,e(A,B["m.model.42.weight"])),ta=n(a,13824,e(A,B["m.model.45.weight"])),ca=n(a,13824,e(A,B["m.model.48.weight"])),da=n(a,13824,e(A,B["m.model.51.weight"])),na=n(a,13824,e(A,B["m.model.54.weight"])),Sa=n(a,13824,e(A,B["m.model.57.weight"])),La=n(a,13824,e(A,B["m.model.60.weight"])),fa=n(a,13824,e(A,B["m.model.63.weight"])),ha=n(a,13824,e(A,B["m.model.66.weight"])),Q=n(a,13824,e(A,B["m.model.69.weight"])),va=n(a,13824,e(A,B["m.model.72.weight"])),Ta=n(a,64,e(A,B["m.seq_conv_argmax.weight"])),T=n(a,4,e(A,B["m.seq_conv_argmax.bias"])),ba=i(a,67108864),m=i(a,536870912),U=i(a,4194304),O=i(a,536870912),R=i(a,536870912),Ea=a.createBuffer({size:E.size,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.MAP_WRITE}),h=a.createBuffer({size:ba.size,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),C=[b,s,c,v,p,c,P,y,s,c,v,p,c,P,d,s,c,v,p,c,P,S,s,c,v,p,c,P,_,s,c,v,p,c,P,G,s,c,v,p,c,P,y,s,c,v,p,c,P,d,s,c,v,p,c,P,S,s,c,v,p,c,P,_,s,c,v,p,c,P,G,s,c,v,p,c,P,y,s,c,v,p,c,P,d,s,c,v,p,c,P,S,s,c,v,p,c,P,_,s,c,v,p,c,P,G,s,c,v,p,c,P,y,s,c,v,p,c,P,d,s,c,v,p,c,P,S,s,c,v,p,c,P,_,s,c,v,p,c,P,G,s,c,v,p,c,P,y,s,c,v,p,c,P,d,s,c,v,p,c,P,S,s,c,v,p,c,P,_,s,c,v,p,c,P,x,L,I,W],u=yield Promise.all(C.map((N,o)=>z(null,null,function*(){return yield a.createComputePipelineAsync({layout:a.createPipelineLayout({bindGroupLayouts:[f[o]]}),compute:{module:a.createShaderModule({code:N}),entryPoint:"main"}})})));return N=>z(null,null,function*(){let o=a.createCommandEncoder();yield Ea.mapAsync(GPUMapMode.WRITE),new Float16Array(Ea.getMappedRange()).set(N),Ea.unmap(),o.copyBufferToBuffer(Ea,0,E,0,Ea.size),t(a,o,u[0],f[0],g,[m,E,M],[128,256,4]),t(a,o,u[1],f[1],g,[U,m],[8192,1,1]),t(a,o,u[2],f[2],g,[O,U],[32,1,1]),t(a,o,u[3],f[3],g,[U,O],[16,1,1]),t(a,o,u[4],f[4],g,[O,m,U],[1024,2,1]),t(a,o,u[5],f[5],g,[R,O],[32,1,1]),t(a,o,u[6],f[6],g,[O,R],[16,1,1]),t(a,o,u[7],f[7],g,[R,m,U,O,V],[128,256,4]),t(a,o,u[8],f[8],g,[m,R],[8192,1,1]),t(a,o,u[9],f[9],g,[U,m],[32,1,1]),t(a,o,u[10],f[10],g,[m,U],[16,1,1]),t(a,o,u[11],f[11],g,[U,R,m],[1024,2,1]),t(a,o,u[12],f[12],g,[O,U],[32,1,1]),t(a,o,u[13],f[13],g,[U,O],[16,1,1]),t(a,o,u[14],f[14],g,[O,R,m,U,F],[128,256,4]),t(a,o,u[15],f[15],g,[m,O],[8192,1,1]),t(a,o,u[16],f[16],g,[U,m],[32,1,1]),t(a,o,u[17],f[17],g,[m,U],[16,1,1]),t(a,o,u[18],f[18],g,[U,O,m],[1024,2,1]),t(a,o,u[19],f[19],g,[R,U],[32,1,1]),t(a,o,u[20],f[20],g,[U,R],[16,1,1]),t(a,o,u[21],f[21],g,[R,O,m,U,D],[128,256,4]),t(a,o,u[22],f[22],g,[m,R],[8192,1,1]),t(a,o,u[23],f[23],g,[U,m],[32,1,1]),t(a,o,u[24],f[24],g,[m,U],[16,1,1]),t(a,o,u[25],f[25],g,[U,R,m],[1024,2,1]),t(a,o,u[26],f[26],g,[O,U],[32,1,1]),t(a,o,u[27],f[27],g,[U,O],[16,1,1]),t(a,o,u[28],f[28],g,[O,R,m,U,k],[128,256,4]),t(a,o,u[29],f[29],g,[m,O],[8192,1,1]),t(a,o,u[30],f[30],g,[U,m],[32,1,1]),t(a,o,u[31],f[31],g,[m,U],[16,1,1]),t(a,o,u[32],f[32],g,[U,O,m],[1024,2,1]),t(a,o,u[33],f[33],g,[R,U],[32,1,1]),t(a,o,u[34],f[34],g,[U,R],[16,1,1]),t(a,o,u[35],f[35],g,[R,O,m,U,K],[128,256,4]),t(a,o,u[36],f[36],g,[m,R],[8192,1,1]),t(a,o,u[37],f[37],g,[U,m],[32,1,1]),t(a,o,u[38],f[38],g,[m,U],[16,1,1]),t(a,o,u[39],f[39],g,[U,R,m],[1024,2,1]),t(a,o,u[40],f[40],g,[O,U],[32,1,1]),t(a,o,u[41],f[41],g,[U,O],[16,1,1]),t(a,o,u[42],f[42],g,[O,R,m,U,ra],[128,256,4]),t(a,o,u[43],f[43],g,[m,O],[8192,1,1]),t(a,o,u[44],f[44],g,[U,m],[32,1,1]),t(a,o,u[45],f[45],g,[m,U],[16,1,1]),t(a,o,u[46],f[46],g,[U,O,m],[1024,2,1]),t(a,o,u[47],f[47],g,[R,U],[32,1,1]),t(a,o,u[48],f[48],g,[U,R],[16,1,1]),t(a,o,u[49],f[49],g,[R,O,m,U,J],[128,256,4]),t(a,o,u[50],f[50],g,[m,R],[8192,1,1]),t(a,o,u[51],f[51],g,[U,m],[32,1,1]),t(a,o,u[52],f[52],g,[m,U],[16,1,1]),t(a,o,u[53],f[53],g,[U,R,m],[1024,2,1]),t(a,o,u[54],f[54],g,[O,U],[32,1,1]),t(a,o,u[55],f[55],g,[U,O],[16,1,1]),t(a,o,u[56],f[56],g,[O,R,m,U,ya],[128,256,4]),t(a,o,u[57],f[57],g,[m,O],[8192,1,1]),t(a,o,u[58],f[58],g,[U,m],[32,1,1]),t(a,o,u[59],f[59],g,[m,U],[16,1,1]),t(a,o,u[60],f[60],g,[U,O,m],[1024,2,1]),t(a,o,u[61],f[61],g,[R,U],[32,1,1]),t(a,o,u[62],f[62],g,[U,R],[16,1,1]),t(a,o,u[63],f[63],g,[R,O,m,U,Ca],[128,256,4]),t(a,o,u[64],f[64],g,[m,R],[8192,1,1]),t(a,o,u[65],f[65],g,[U,m],[32,1,1]),t(a,o,u[66],f[66],g,[m,U],[16,1,1]),t(a,o,u[67],f[67],g,[U,R,m],[1024,2,1]),t(a,o,u[68],f[68],g,[O,U],[32,1,1]),t(a,o,u[69],f[69],g,[U,O],[16,1,1]),t(a,o,u[70],f[70],g,[O,R,m,U,Ua],[128,256,4]),t(a,o,u[71],f[71],g,[m,O],[8192,1,1]),t(a,o,u[72],f[72],g,[U,m],[32,1,1]),t(a,o,u[73],f[73],g,[m,U],[16,1,1]),t(a,o,u[74],f[74],g,[U,O,m],[1024,2,1]),t(a,o,u[75],f[75],g,[R,U],[32,1,1]),t(a,o,u[76],f[76],g,[U,R],[16,1,1]),t(a,o,u[77],f[77],g,[R,O,m,U,Y],[128,256,4]),t(a,o,u[78],f[78],g,[m,R],[8192,1,1]),t(a,o,u[79],f[79],g,[U,m],[32,1,1]),t(a,o,u[80],f[80],g,[m,U],[16,1,1]),t(a,o,u[81],f[81],g,[U,R,m],[1024,2,1]),t(a,o,u[82],f[82],g,[O,U],[32,1,1]),t(a,o,u[83],f[83],g,[U,O],[16,1,1]),t(a,o,u[84],f[84],g,[O,R,m,U,ea],[128,256,4]),t(a,o,u[85],f[85],g,[m,O],[8192,1,1]),t(a,o,u[86],f[86],g,[U,m],[32,1,1]),t(a,o,u[87],f[87],g,[m,U],[16,1,1]),t(a,o,u[88],f[88],g,[U,O,m],[1024,2,1]),t(a,o,u[89],f[89],g,[R,U],[32,1,1]),t(a,o,u[90],f[90],g,[U,R],[16,1,1]),t(a,o,u[91],f[91],g,[R,O,m,U,ua],[128,256,4]),t(a,o,u[92],f[92],g,[m,R],[8192,1,1]),t(a,o,u[93],f[93],g,[U,m],[32,1,1]),t(a,o,u[94],f[94],g,[m,U],[16,1,1]),t(a,o,u[95],f[95],g,[U,R,m],[1024,2,1]),t(a,o,u[96],f[96],g,[O,U],[32,1,1]),t(a,o,u[97],f[97],g,[U,O],[16,1,1]),t(a,o,u[98],f[98],g,[O,R,m,U,la],[128,256,4]),t(a,o,u[99],f[99],g,[m,O],[8192,1,1]),t(a,o,u[100],f[100],g,[U,m],[32,1,1]),t(a,o,u[101],f[101],g,[m,U],[16,1,1]),t(a,o,u[102],f[102],g,[U,O,m],[1024,2,1]),t(a,o,u[103],f[103],g,[R,U],[32,1,1]),t(a,o,u[104],f[104],g,[U,R],[16,1,1]),t(a,o,u[105],f[105],g,[R,O,m,U,ta],[128,256,4]),t(a,o,u[106],f[106],g,[m,R],[8192,1,1]),t(a,o,u[107],f[107],g,[U,m],[32,1,1]),t(a,o,u[108],f[108],g,[m,U],[16,1,1]),t(a,o,u[109],f[109],g,[U,R,m],[1024,2,1]),t(a,o,u[110],f[110],g,[O,U],[32,1,1]),t(a,o,u[111],f[111],g,[U,O],[16,1,1]),t(a,o,u[112],f[112],g,[O,R,m,U,ca],[128,256,4]),t(a,o,u[113],f[113],g,[m,O],[8192,1,1]),t(a,o,u[114],f[114],g,[U,m],[32,1,1]),t(a,o,u[115],f[115],g,[m,U],[16,1,1]),t(a,o,u[116],f[116],g,[U,O,m],[1024,2,1]),t(a,o,u[117],f[117],g,[R,U],[32,1,1]),t(a,o,u[118],f[118],g,[U,R],[16,1,1]),t(a,o,u[119],f[119],g,[R,O,m,U,da],[128,256,4]),t(a,o,u[120],f[120],g,[m,R],[8192,1,1]),t(a,o,u[121],f[121],g,[U,m],[32,1,1]),t(a,o,u[122],f[122],g,[m,U],[16,1,1]),t(a,o,u[123],f[123],g,[U,R,m],[1024,2,1]),t(a,o,u[124],f[124],g,[O,U],[32,1,1]),t(a,o,u[125],f[125],g,[U,O],[16,1,1]),t(a,o,u[126],f[126],g,[O,R,m,U,na],[128,256,4]),t(a,o,u[127],f[127],g,[m,O],[8192,1,1]),t(a,o,u[128],f[128],g,[U,m],[32,1,1]),t(a,o,u[129],f[129],g,[m,U],[16,1,1]),t(a,o,u[130],f[130],g,[U,O,m],[1024,2,1]),t(a,o,u[131],f[131],g,[R,U],[32,1,1]),t(a,o,u[132],f[132],g,[U,R],[16,1,1]),t(a,o,u[133],f[133],g,[R,O,m,U,Sa],[128,256,4]),t(a,o,u[134],f[134],g,[m,R],[8192,1,1]),t(a,o,u[135],f[135],g,[U,m],[32,1,1]),t(a,o,u[136],f[136],g,[m,U],[16,1,1]),t(a,o,u[137],f[137],g,[U,R,m],[1024,2,1]),t(a,o,u[138],f[138],g,[O,U],[32,1,1]),t(a,o,u[139],f[139],g,[U,O],[16,1,1]),t(a,o,u[140],f[140],g,[O,R,m,U,La],[128,256,4]),t(a,o,u[141],f[141],g,[m,O],[8192,1,1]),t(a,o,u[142],f[142],g,[U,m],[32,1,1]),t(a,o,u[143],f[143],g,[m,U],[16,1,1]),t(a,o,u[144],f[144],g,[U,O,m],[1024,2,1]),t(a,o,u[145],f[145],g,[R,U],[32,1,1]),t(a,o,u[146],f[146],g,[U,R],[16,1,1]),t(a,o,u[147],f[147],g,[R,O,m,U,fa],[128,256,4]),t(a,o,u[148],f[148],g,[m,R],[8192,1,1]),t(a,o,u[149],f[149],g,[U,m],[32,1,1]),t(a,o,u[150],f[150],g,[m,U],[16,1,1]),t(a,o,u[151],f[151],g,[U,R,m],[1024,2,1]),t(a,o,u[152],f[152],g,[O,U],[32,1,1]),t(a,o,u[153],f[153],g,[U,O],[16,1,1]),t(a,o,u[154],f[154],g,[O,R,m,U,ha],[128,256,4]),t(a,o,u[155],f[155],g,[m,O],[8192,1,1]),t(a,o,u[156],f[156],g,[U,m],[32,1,1]),t(a,o,u[157],f[157],g,[m,U],[16,1,1]),t(a,o,u[158],f[158],g,[U,O,m],[1024,2,1]),t(a,o,u[159],f[159],g,[R,U],[32,1,1]),t(a,o,u[160],f[160],g,[U,R],[16,1,1]),t(a,o,u[161],f[161],g,[R,O,m,U,Q],[128,256,4]),t(a,o,u[162],f[162],g,[m,R],[8192,1,1]),t(a,o,u[163],f[163],g,[U,m],[32,1,1]),t(a,o,u[164],f[164],g,[m,U],[16,1,1]),t(a,o,u[165],f[165],g,[U,R,m],[1024,2,1]),t(a,o,u[166],f[166],g,[O,U],[32,1,1]),t(a,o,u[167],f[167],g,[U,O],[16,1,1]),t(a,o,u[168],f[168],g,[O,R,m,U,va],[128,256,4]),t(a,o,u[169],f[169],g,[m,O],[8192,1,1]),t(a,o,u[170],f[170],g,[U,m],[32,1,1]),t(a,o,u[171],f[171],g,[m,U],[16,1,1]),t(a,o,u[172],f[172],g,[U,O,m],[1024,2,1]),t(a,o,u[173],f[173],g,[R,U],[32,1,1]),t(a,o,u[174],f[174],g,[U,R],[16,1,1]),t(a,o,u[175],f[175],g,[R,O,m,U],[32768,16,1]),t(a,o,u[176],f[176],g,[m,R,Ta,T],[32768,8,1]),t(a,o,u[177],f[177],g,[O,m],[32768,4,1]),t(a,o,u[178],f[178],g,[ba,m,O],[32768,4,1]),o.copyBufferToBuffer(ba,0,h,0,ba.size),a.queue.submit([o.finish()]),yield h.mapAsync(GPUMapMode.READ);const w=new Float32Array(h.size/4);return w.set(new Float32Array(h.getMappedRange())),h.unmap(),[w]})});return{load:(a,A)=>z(null,null,function*(){return yield fetch(A).then(B=>B.arrayBuffer()).then(B=>q(a,new Uint8Array(B)))}),setupNet:q}})(),Et=Object.freeze(Object.defineProperty({__proto__:null,default:Tt},Symbol.toStringTag,{value:"Module"})),Aa=Object.assign({"./webgpu_runners/rodent_runner.js":Et});function wt(){return Object.keys(Aa).map(e=>{const l=e.match(/\/([^\/]+)_runner\.js$/);return l?l[1]:null}).filter(Boolean)}function Ot(e){const l=`./webgpu_runners/${e}_runner.js`;if(Aa[l])return Aa[l];const i=e.toLowerCase();for(const[r,n]of Object.entries(Aa))if(r.toLowerCase().includes(`/${i}_runner.js`))return n;for(const[r,n]of Object.entries(Aa))if(r.includes(e))return n;return null}function Lt(e){const l=`./webgpu_runners/${e}_runner.js`;if(Aa[l])return!0;const i=`/${e.toLowerCase()}_runner.js`;return Object.keys(Aa).some(r=>r.toLowerCase().endsWith(i))}function Bt(e,l){if(typeof Float16Array=="undefined")throw new Error("Float16Array unavailable: cannot cast fp32 master weights to fp16.");const i=new DataView(e.buffer,e.byteOffset,e.byteLength),r=Number(i.getBigUint64(0,!0)),n=JSON.parse(new TextDecoder("utf8").decode(e.subarray(8,8+r))),t=8+r;if(!Object.entries(n).some(([S,_])=>S!=="__metadata__"&&_.dtype==="F32"))return e;const s={},c=[];let v=0;for(const[S,_]of Object.entries(n)){if(S==="__metadata__"){s[S]=_;continue}const[G,x]=_.data_offsets,L=e.subarray(t+G,t+x);let I,W;if(_.dtype==="F32"){const q=new Float32Array(L.slice().buffer),Z=new Float16Array(q);I=new Uint8Array(Z.buffer),W="F16"}else I=L,W=_.dtype;s[S]={dtype:W,shape:_.shape,data_offsets:[v,v+I.byteLength]},c.push(I),v+=I.byteLength}const p=new TextEncoder().encode(JSON.stringify(s)),P=(8-p.byteLength%8)%8,y=new Uint8Array(8+p.byteLength+P+v);new DataView(y.buffer).setBigUint64(0,BigInt(p.byteLength+P),!0),y.set(p,8),y.fill(32,8+p.byteLength,8+p.byteLength+P);let d=8+p.byteLength+P;for(const S of c)y.set(S,d),d+=S.byteLength;return l&&l("Cast fp32 master weights -> fp16 for WebGPU.",.05),y}function At(e,l){try{const i=b=>!!(e.features&&e.features.has&&e.features.has(b)),r=e.limits||{},n=typeof navigator!="undefined"&&navigator.userAgent||"unknown",t=/Safari/.test(n)&&!/Chrome|Chromium|Android/.test(n);console.log("[SAFARI-DEBUG] ===== WebGPU device capabilities ====="),console.log("[SAFARI-DEBUG] model:",(l==null?void 0:l.modelName)||(l==null?void 0:l.webgpu_runner)||"(unknown)"),console.log("[SAFARI-DEBUG] userAgent:",n,"| classified Safari:",t),console.log("[SAFARI-DEBUG] shader-f16:",i("shader-f16")),console.log("[SAFARI-DEBUG] features:",e.features?Array.from(e.features):"(none)"),console.log("[SAFARI-DEBUG] limits:",{maxBufferSize:r.maxBufferSize,maxStorageBufferBindingSize:r.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:r.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.maxComputeWorkgroupSizeZ,maxComputeWorkgroupsPerDimension:r.maxComputeWorkgroupsPerDimension}),console.log("[SAFARI-DEBUG] BC_WEBGPU_DEBUG (logits readback):",typeof window!="undefined"&&!!window.BC_WEBGPU_DEBUG),console.log("[SAFARI-DEBUG] =======================================")}catch(i){console.warn("[SAFARI-DEBUG] capability dump failed:",i==null?void 0:i.message)}}function Rt(e,l,i){return z(this,null,function*(){var p,P;At(e,l);let r=l.webgpu_runner,n=l.webgpu_safetensor;const t=!!(e.features&&e.features.has&&e.features.has("shader-f16"));let b=!1;l.forceFP32?(b=!0,console.log("[WebGPU] forceFP32: using fp32 runner and weights.")):t||(Lt(`${r}_f32`)?(b=!0,console.log("[WebGPU] shader-f16 not supported on this device -> auto-selecting fp32 runner and weights."),i("fp16 not supported - using fp32 WebGPU runner.",.05)):console.warn(`[WebGPU] shader-f16 not supported and no fp32 runner ('${r}_f32') available; the fp16 runner will likely fail and fall back to WebGL2.`)),b&&(r=`${r}_f32`,n=n.replace(".safetensors","_f32.safetensors")),l.enableTTA&&l.webgpuTTArunner&&(console.log("[WebGPU] TTA Enabled: Switching to TTA runner and weights."),r=`${r}_tta`,n=n.replace(".safetensors","_tta.safetensors"));const s=Ot(r);if(!s){const y=wt();throw new Error(`Runner '${r}' not found. Available runners: ${y.join(", ")||"none"}. Looking in: ./webgpu_runners/`)}if(!s.setupNet&&!((p=s.default)!=null&&p.setupNet))throw new Error(`Runner module '${r}' doesn't export 'setupNet'. Exported keys: ${Object.keys(s).join(", ")}`);let c;try{const y=yield fetch(n);if(!y.ok)throw new Error(`HTTP ${y.status}: ${y.statusText}`);c=yield y.arrayBuffer()}catch(y){throw new Error(`Failed to load weights from '${n}': ${y.message}`)}const v=s.setupNet||((P=s.default)==null?void 0:P.setupNet);try{let y=new Uint8Array(c);return b||(y=Bt(y,i)),yield v(e,y,i)}catch(y){throw new Error(`Failed to setup network for '${r}': ${y.message}`)}})}function kt(e,l,i,r,n,t,b){return z(this,null,function*(){var d,S,_;b("Starting WebGPU inference...",0);const s=performance.now(),c=Oe(i,ja.WEBGPU);c.isModelFullVol=!0;let v,p=[],P=null,y=!1;try{if(!e)throw new Error("WebGPU device is required but not provided");if(!(i!=null&&i.webgpu_runner))throw new Error("Model entry must specify webgpu_runner property");if(!(i!=null&&i.webgpu_safetensor))throw new Error("Model entry must specify webgpu_safetensor property");const G=i.webgpuStorageSize||335544320;if(e.limits){const F=K=>(K/1048576).toFixed(0),D=(d=e.limits.maxStorageBufferBindingSize)!=null?d:1/0,k=(S=e.limits.maxBufferSize)!=null?S:1/0;if(D<G||k<G){const K=F(Math.min(D,k)),ra=F(G),J=`[WebGPU] Device buffer limit (${K} MB) is below the ${ra} MB this model needs - using WebGL2 fallback.`;throw console.warn(J),b(J,.1),new Error(J)}}b("Preparing input data...",.1);let x=Da(n,[256,256,256],"float32");const L=i.enableQuantileNorm?yield ie(x):yield le(x);if(x.dispose(),x=L,i.inputPermutation){console.log(`[WebGPU] Permuting Input: ${i.inputPermutation}`);const F=x.transpose(i.inputPermutation);x.dispose(),x=F}else if(i.enableTranspose){const F=x.transpose();x.dispose(),x=F}const I=yield x.data(),W=x.shape;x.dispose(),b("Input data prepared (full volume).",.3),b("Loading model runner...",.4),e&&(P=e.createBuffer.bind(e),e.createBuffer=F=>{const D=P(F);return p.push(D),D}),e.pushErrorScope("out-of-memory"),y=!0;const q=yield Rt(e,i,b);if(typeof q!="function")throw new Error(`setupNet for '${i.webgpu_runner}' didn't return a function. Returned type: ${typeof q}`);b("Running inference...",.5);const Z=yield q(I);y=!1;const a=yield e.popErrorScope();if(a)throw new Error(`WebGPU out of memory (${a.message||"allocation failed"}) - falling back to WebGL2.`);if(!Z||!Array.isArray(Z))throw new Error(`Inference didn't return expected array format. Returned: ${typeof Z}`);const A=((performance.now()-s)/1e3).toFixed(4);b(`WebGPU inference took ${A}s.`,.9),console.log("Inference result shape:",(_=Z[0])==null?void 0:_.length),v=ga(()=>{let F=Da(Z[0],W,"int32");i.outputPermutation?(console.log(`[WebGPU] Permuting Output: ${i.outputPermutation}`),F=F.transpose(i.outputPermutation)):i.enableTranspose&&(F=F.transpose());const D=rt(F).dataSync()[0];if(console.log("Segmentation volume sum:",D),D===0)throw new Error("Segmentation resulted in all zeros (empty volume).");return F});const B=performance.now(),g=yield Ee(v,n,i,l),f=((performance.now()-B)/1e3).toFixed(4);t(g,l,i);const M=new Set(g).size,V=i.numClasses||M;ne(c,V,M),ue(c,A,f),b(i.modelName+"<br>Segmentation finished.",1,"",c)}catch(G){if(console.error("WebGPU Inference Error:",G),y&&e){y=!1;try{yield e.popErrorScope()}catch(L){}}let x=G.message;throw G.message.includes("not found")?x+=". Check that the runner file exists and the name matches.":G.message.includes("fetch")?x+=". Check network connection and file paths.":G.message.includes("binding size")&&(x+=". GPU memory limit exceeded."),Ia(c,x,"WebGPU inference failed"),b("",-1,`WebGPU Error: ${x}`,c),G}finally{if(v&&v.dispose(),P&&e&&(e.createBuffer=P),p&&p.length>0){for(const G of p)G.destroy();p=[]}}})}function se(){return z(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?"Opera":navigator.userAgent.indexOf("Edg/")>-1?"Edge":navigator.userAgent.indexOf("Falkon/")>-1?"Falkon":navigator.userAgent.indexOf("Chrome/")>-1?"Chrome":navigator.userAgent.indexOf("Firefox/")>-1?"Firefox":navigator.userAgent.indexOf("Safari/")>-1?"Safari":navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?"IExplorer":"Unknown"})}function It(){return z(this,null,function*(){return navigator.userAgent.indexOf("OPR/")>-1?parseInt(navigator.userAgent.split("OPR/")[1]):navigator.userAgent.indexOf("Edg/")>-1?parseInt(navigator.userAgent.split("Edg/")[1]):navigator.userAgent.indexOf("Falkon/")>-1?parseInt(navigator.userAgent.split("Falkon/")[1]):navigator.userAgent.indexOf("Chrome/")>-1?parseInt(navigator.userAgent.split("Chrome/")[1]):navigator.userAgent.indexOf("Firefox/")>-1?parseInt(navigator.userAgent.split("Firefox/")[1]):navigator.userAgent.indexOf("Safari/")>-1?parseInt(navigator.userAgent.split("Safari/")[1]):navigator.userAgent.indexOf("MSIE/")>-1||navigator.userAgent.indexOf("rv:")>-1?parseInt(navigator.userAgent.split("MSIE/")[1]):1/0})}function Nt(){return z(this,null,function*(){return navigator.userAgent.indexOf("Win")>-1?"Windows":navigator.userAgent.indexOf("Mac")>-1?"MacOS":navigator.userAgent.indexOf("Linux")>-1?"Linux":navigator.userAgent.indexOf("UNIX")>-1?"UNIX":"Unknown"})}function Ft(e){return z(this,null,function*(){return e?(console.log("WebGl2 is enabled"),!0):(console.log(typeof WebGL2RenderingContext!="undefined"?"WebGL2 may be disabled. Please try updating video card drivers":"WebGL2 is not supported"),!1)})}function zt(e){return z(this,null,function*(){let l;if(e&&(l=e.getExtension("WEBGL_debug_renderer_info"),l)){const i=e.getParameter(l.UNMASKED_VENDOR_WEBGL);return i.indexOf("(")>-1&&i.indexOf(")")>-1?i.substring(i.indexOf("(")+1,i.indexOf(")")):i}return null})}function Wt(e){return z(this,null,function*(){if(e){const l=e.getExtension("WEBGL_debug_renderer_info");return l?e.getParameter(l.UNMASKED_VENDOR_WEBGL):null}else return null})}function $t(e){return z(this,null,function*(){if(e){if(se()==="Firefox")return e.getParameter(e.RENDERER);const l=e.getExtension("WEBGL_debug_renderer_info");return l?e.getParameter(l.UNMASKED_RENDERER_WEBGL):null}else return null})}function Dt(e){return z(this,null,function*(){let l;if(e){if(se()==="Firefox")return e.getParameter(e.RENDERER);if(l=e.getExtension("WEBGL_debug_renderer_info"),l){let i=e.getParameter(l.UNMASKED_RENDERER_WEBGL);return i.indexOf("(")>-1&&i.indexOf(")")>-1&&i.indexOf("(R)")===-1&&(i=i.substring(i.indexOf("(")+1,i.indexOf(")")),i.split(",").length===3)?i.split(",")[1].trim():i}}return null})}function qt(){return z(this,null,function*(){return navigator.hardwareConcurrency})}function Vt(){return z(this,null,function*(){return/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)})}function jt(e,l=null){return z(this,null,function*(){const i=new Date;if(e.isModelFullVol?e.Brainchop_Ver="FullVolume":e.Brainchop_Ver="SubVolumes",e.Total_t=(Date.now()-e.startTime)/1e3,delete e.startTime,e.Date=parseInt(i.getMonth()+1)+"/"+i.getDate()+"/"+i.getFullYear(),e.Browser=yield se(),e.Browser_Ver=yield It(),e.OS=yield Nt(),e.WebGL2=yield Ft(l),e.GPU_Vendor=yield zt(l),e.GPU_Card=yield Dt(l),e.GPU_Vendor_Full=yield Wt(l),e.GPU_Card_Full=yield $t(l),e.CPU_Cores=yield qt(),e.Which_Brainchop="latest",(yield Vt())&&(e.Heap_Size_MB=window.performance.memory.totalJSHeapSize/(1024*1024).toFixed(2),e.Used_Heap_MB=window.performance.memory.usedJSHeapSize/(1024*1024).toFixed(2),e.Heap_Limit_MB=window.performance.memory.jsHeapSizeLimit/(1024*1024).toFixed(2)),l){console.log("MAX_TEXTURE_SIZE :",l.getParameter(l.MAX_TEXTURE_SIZE)),console.log("MAX_RENDERBUFFER_SIZE :",l.getParameter(l.MAX_RENDERBUFFER_SIZE));const r=l.getExtension("WEBGL_debug_renderer_info");console.log("VENDOR WEBGL:",l.getParameter(r.UNMASKED_VENDOR_WEBGL)),e.Texture_Size=l.getParameter(l.MAX_TEXTURE_SIZE)}else e.Texture_Size=null;return e})}function Yt(e){return new Worker(""+new URL("brainchop-webworker-8W4IWIcP.js",import.meta.url).href,{name:e==null?void 0:e.name})}const de=.5,ge=8,be=(e,l,i)=>Math.min(i,Math.max(l,e)),pe=e=>Math.hypot(e[0].clientX-e[1].clientX,e[0].clientY-e[1].clientY);function Le(e){e!=null&&e.scene&&(e.scene.pan2Dxyzmm=[0,0,0,1],e.scene.volScaleMultiplier=1,e.drawScene()),Xt()}function Xt(){const e=document.querySelector('meta[name="viewport"]');if(!e)return;const l=e.getAttribute("content")||"width=device-width, initial-scale=1.0";/maximum-scale/.test(l)||(e.setAttribute("content",`${l}, maximum-scale=1, user-scalable=no`),requestAnimationFrame(()=>requestAnimationFrame(()=>e.setAttribute("content",l))))}function Ht(){const e=l=>l.preventDefault();for(const l of["gesturestart","gesturechange","gestureend"])document.addEventListener(l,e,{passive:!1});document.addEventListener("touchmove",l=>{l.touches.length>1&&l.preventDefault()},{passive:!1})}function Zt(e){const l=e.canvas;if(!l)return;let i=null;const r=t=>{var p;if(t.touches.length!==2){i=null;return}const b=l.getBoundingClientRect(),s=(t.touches[0].clientX+t.touches[1].clientX)/2-b.left,c=(t.touches[0].clientY+t.touches[1].clientY)/2-b.top,v=((p=e.uiData)==null?void 0:p.dpr)||1;i={dist:Math.max(1,pe(t.touches)),zoom:e.scene.pan2Dxyzmm[3]||1,pan:Array.from(e.scene.pan2Dxyzmm).slice(0,3),scale3d:e.scene.volScaleMultiplier||1,inRender:e.inRenderTile?e.inRenderTile(s*v,c*v)>=0:!1}},n=()=>{i=null};l.addEventListener("touchstart",r,{passive:!1}),l.addEventListener("touchend",n,{passive:!1}),l.addEventListener("touchcancel",n,{passive:!1}),e.handlePinchZoom=t=>{if(!i||!t.touches||t.touches.length!==2)return;const b=pe(t.touches)/i.dist;if(!isFinite(b)||b<=0)return;if(i.inRender){e.scene.volScaleMultiplier=be(i.scale3d*b,de,ge),e.drawScene();return}const s=be(i.zoom*b,de,ge),c=e.frac2mm(e.scene.crosshairPos),v=i.zoom-s;e.scene.pan2Dxyzmm=[i.pan[0]+v*c[0],i.pan[1]+v*c[1],i.pan[2]+v*c[2],s],e.opts.yoke3Dto2DZoom&&(e.scene.volScaleMultiplier=s),e.drawScene()}}function Kt(e){return Ht(),Zt(e),{resetView:()=>Le(e)}}const Jt=720,Qt=860;function al(){var n,t,b,s,c,v;const e=window.visualViewport,l=Math.round((t=(n=e==null?void 0:e.width)!=null?n:window.innerWidth)!=null?t:0),i=Math.round((s=(b=e==null?void 0:e.height)!=null?b:window.innerHeight)!=null?s:0);return l>0&&l<=Jt?!0:!!((v=(c=window.matchMedia)==null?void 0:c.call(window,"(pointer: coarse)"))==null?void 0:v.matches)&&Math.min(l,i)<=Qt}function Fa(e,l,i,r,n,t){const b=i-n,s=r-t;if(!(b>0)||!(s>0)||!(e>0)||!(l>0))return 0;let c=b/e;return l*c>s&&(c=s/l),c}function el(e){var x,L,I,W,q,Z,a,A,B,g;const l=((W=(x=e.effectiveCanvasWidth)==null?void 0:x.call(e))!=null?W:(I=(L=e.gl)==null?void 0:L.canvas)==null?void 0:I.width)||0,i=((A=(q=e.effectiveCanvasHeight)==null?void 0:q.call(e))!=null?A:(a=(Z=e.gl)==null?void 0:Z.canvas)==null?void 0:a.height)||0;if(!l||!i)return null;let r=[1,1,1];try{const f=e.sliceScale();((B=f==null?void 0:f.volScale)==null?void 0:B.length)===3&&(r=f.volScale.slice())}catch(f){}e.opts.multiplanarEqualSize&&(r=[1,1,1]);const[n,t,b]=r,s=Math.max(n,t,b),c=((g=e.uiData)==null?void 0:g.dpr)||1,v=(parseFloat(`${e.opts.multiplanarPadPixels}`)||0)*c;let p=(e.opts.tileMargin||0)*c;p<0&&(p=2*(2+Math.ceil(e.fontPx||0)));const P=f=>(f-1)*v+f*p,y=f=>(f-1)*v+f*p,d=e.opts.multiplanarShowRender===Ve.ALWAYS||e.opts.multiplanarForceRender===!0,S=d?Fa(s,t+b+b+s,l,i,P(1),y(4)):Fa(s,t+b+b,l,i,P(1),y(3)),_=d?Fa(n+n+t+s,Math.max(t,b),l,i,P(4),y(1)):Fa(n+n+t,Math.max(t,b),l,i,P(3),y(1)),G=Fa(n+t,t+b,l,i,P(2),y(2));return[{layout:Za.GRID,name:"grid",scale:G},{layout:Za.COLUMN,name:"column",scale:S},{layout:Za.ROW,name:"row",scale:_}]}function tl(e){if(!(e!=null&&e.gl))return null;const l=el(e);if(!l)return null;const i=l.reduce((n,t)=>t.scale>n.scale+1e-6?t:n),r=e.opts.multiplanarLayout!==i.layout;return e.opts.multiplanarLayout=i.layout,Ga(xa({},i),{changed:r})}function ll(e){let l="";const i=e.drawScene.bind(e);e.drawScene=function(){var r,n,t;if(e.opts.sliceType===ka.MULTIPLANAR&&e.gl){const b=[e.gl.canvas.width,e.gl.canvas.height,e.opts.multiplanarShowRender,e.opts.multiplanarForceRender,e.opts.multiplanarEqualSize,(t=(n=(r=e.volumes)==null?void 0:r[0])==null?void 0:n.id)!=null?t:""].join("|");b!==l&&(l=b,tl(e))}return i()}}const ae=[{id:"multi",label:"All",title:"All planes",type:ka.MULTIPLANAR},{id:"axial",label:"A",title:"Axial only",type:ka.AXIAL},{id:"coronal",label:"C",title:"Coronal only",type:ka.CORONAL},{id:"sagittal",label:"S",title:"Sagittal only",type:ka.SAGITTAL},{id:"render",label:"3D",title:"3D render only",type:ka.RENDER}];function il(e,l){const i=document.createElement("div");i.id="paneSwitcher",i.className="pane-switcher",i.setAttribute("role","group"),i.setAttribute("aria-label","Visible planes");for(const n of ae){const t=document.createElement("button");t.type="button",t.dataset.pane=n.id,t.textContent=n.label,t.title=n.title,t.setAttribute("aria-label",n.title),t.addEventListener("click",()=>Be(e,i,n.id)),i.appendChild(t)}const r=document.createElement("button");return r.type="button",r.className="pane-reset",r.textContent="⟲",r.title="Reset zoom and pan",r.setAttribute("aria-label","Reset zoom and pan"),r.addEventListener("click",()=>Le(e)),i.appendChild(r),l.appendChild(i),i}function Be(e,l,i){const r=ae.find(n=>n.id===i)||ae[0];e.setSliceType(r.type),l.querySelectorAll("button").forEach(n=>n.classList.toggle("active",n.dataset.pane===r.id))}function rl(e){var b;const l=document.getElementById("canvas-container")||document.body,i=il(e,l);i.querySelector('button[data-pane="multi"]').classList.add("active"),ll(e);let r=0;const n=()=>{r=0,document.body.classList.toggle("nv-narrow",al());const s=e.canvas,c=e.opts.forceDevicePixelRatio===0?window.devicePixelRatio||1:e.opts.forceDevicePixelRatio<0?1:e.opts.forceDevicePixelRatio;s&&e.opts.isResizeCanvas!==!1&&(Math.abs(s.width-s.offsetWidth*c)>1||Math.abs(s.height-s.offsetHeight*c)>1)?e.resizeListener():e.drawScene()},t=()=>{r||(r=requestAnimationFrame(n))};return window.addEventListener("resize",t),window.addEventListener("orientationchange",t),(b=window.visualViewport)==null||b.addEventListener("resize",t),typeof ResizeObserver!="undefined"&&new ResizeObserver(t).observe(l),n(),{refresh:t,setPane:s=>Be(e,i,s)}}let Ae=null,Wa=!1,za=null,$a=!1,Xa=[];const Re=new URLSearchParams(window.location.search).get("backend")==="webgl2";function nl(){return z(this,null,function*(){const e={secureContext:window.isSecureContext,navigatorGpuExists:"gpu"in navigator,adapterObtained:!1,deviceObtained:!1,f16Support:!1,error:null};if(window.isSecureContext||(console.warn("WebGPU requires a secure context (HTTPS or localhost)."),console.warn("Current origin:",window.location.origin)),"gpu"in navigator)try{console.log("Requesting WebGPU adapter...");const l=yield navigator.gpu.requestAdapter();if(l){e.adapterObtained=!0,console.log("WebGPU adapter obtained:",l),l.info&&console.log("Adapter info:",l.info),console.log("Adapter limits:",{maxBufferSize:l.limits.maxBufferSize,maxStorageBufferBindingSize:l.limits.maxStorageBufferBindingSize,maxComputeWorkgroupsPerDimension:l.limits.maxComputeWorkgroupsPerDimension});const i={maxBufferSize:l.limits.maxBufferSize,maxStorageBufferBindingSize:l.limits.maxStorageBufferBindingSize,maxComputeInvocationsPerWorkgroup:l.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:l.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:l.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:l.limits.maxComputeWorkgroupSizeZ,maxComputeWorkgroupStorageSize:l.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:l.limits.maxComputeWorkgroupsPerDimension},r=l.features.has("shader-f16");e.f16Support=r;const n=r?["shader-f16"]:[];Ae=yield l.requestDevice({requiredLimits:i,requiredFeatures:n}),e.deviceObtained=!0,Wa=!0,console.log(`✓ WebGPU initialized successfully. F16: ${r?"enabled":"not available"}`)}else console.warn("WebGPU adapter request returned null."),console.warn("This typically means:"),console.warn("  - Safari: WebGPU feature flags not enabled in Settings > Feature Flags"),console.warn("  - Unsupported GPU hardware"),console.warn("  - GPU drivers need updating"),e.error="Adapter returned null"}catch(l){e.error=l.message,console.error("WebGPU initialization error:",l),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(console.warn("Safari detected. To enable WebGPU:"),console.warn("  1. Open Safari Settings/Preferences"),console.warn('  2. Go to Advanced tab, enable "Show features for web developers"'),console.warn("  3. Go to Feature Flags tab"),console.warn("  4. Enable: WebGPU, GPU Process: DOM Rendering, GPU Process: Canvas Rendering"),console.warn("  5. Restart Safari"))}else console.warn("navigator.gpu not found. WebGPU API is not available in this browser."),e.error="navigator.gpu not found",navigator.userAgent.includes("Firefox")&&(console.warn("Firefox detected. To enable WebGPU in about:config:"),console.warn("  1. Set dom.webgpu.enabled = true"),console.warn("  2. Set gfx.webgpu.ignore-blocklist = true"),console.warn("  3. Restart Firefox"));return ul(Wa&&!Re,e),Wa||console.log("Falling back to WebGL backend."),window.webgpuDiagnostics=e,e})}function ul(e,l){const i=document.getElementById("backendStatus");if(!i){console.log("Backend status element not found in DOM");return}if(e){const r=l.f16Support?" (F16)":"";i.textContent=`WebGPU${r}`,i.style.color="#4CAF50",i.title="WebGPU backend active - fastest performance"}else{i.textContent="WebGL",i.style.color="#FF9800";let r="WebGL backend (fallback)";l.error&&(r+=`
Reason: ${l.error}`),l.secureContext||(r+=`
⚠ Not a secure context (HTTPS required)`),navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(r+=`

To enable WebGPU in Safari:
1. Settings > Feature Flags
2. Enable WebGPU flags
3. Restart Safari`),navigator.userAgent.includes("Firefox")&&(r+=`

To enable WebGPU in Firefox:
1. about:config > dom.webgpu.enabled = true
2. gfx.webgpu.ignore-blocklist = true
3. Restart Firefox`),i.title=r}}function sl(){return z(this,null,function*(){let e="",l="",i,r=null,n=null;const t="altKey";let b=null,s=null,c=null;const v=.9;let p=null;const P=document.getElementById("sampleSelect"),y=document.getElementById("dragSegmented");y&&y.querySelectorAll("button").forEach(h=>{h.onclick=()=>{T.opts.dragMode=parseInt(h.dataset.drag,10),y.querySelectorAll("button").forEach(C=>C.classList.toggle("active",C===h))}});const d=document.getElementById("drawBtn"),S=document.getElementById("drawPopover"),_=document.getElementById("penRow"),G=document.getElementById("drawApplyRow");function x(h){S&&(S.hidden=!h,d&&d.setAttribute("aria-expanded",String(h)))}function L(h){T.setDrawingEnabled(h>=0),h>=0&&T.setPenValue(h&7,h>7),_&&_.querySelectorAll(".chip").forEach(C=>C.classList.toggle("active",parseInt(C.dataset.pen,10)===h))}function I(h){return z(this,null,function*(){if(T.volumes.length<2){window.alert("No segmentation open (run a model first).");return}if(h===0){T.drawUndo();return}if(!T.drawBitmap){window.alert("Nothing drawn yet — pick a pen and draw on the image first.");return}const C=T.volumes[1].img,u=yield T.saveImage({filename:"",isSaveDrawing:!0}),N=352,o=C.length;if(h===1)for(let w=0;w<o;w++)u[N+w]>0&&(C[w]=1);if(h===2)for(let w=0;w<o;w++)u[N+w]>0&&(C[w]=0);T.closeDrawing(),T.updateGLVolume(),T.setDrawingEnabled(!1),L(-1)})}d&&(d.onclick=h=>{h.stopPropagation(),x(S.hidden)}),_&&_.querySelectorAll(".chip").forEach(h=>{h.onclick=()=>L(parseInt(h.dataset.pen,10))}),G&&G.querySelectorAll(".chip").forEach(h=>{h.onclick=()=>I(parseInt(h.dataset.apply,10))}),document.addEventListener("click",h=>{!S||S.hidden||h.target.closest(".popover-wrap")||x(!1)}),document.addEventListener("keydown",h=>{h.key==="Escape"&&x(!1)});const W=document.getElementById("appDialog");W&&W.addEventListener("click",h=>{h.target===W&&W.close()}),aboutBtn.onclick=function(){Oa("About Brainchomp",`
      <div style="text-align: left; font-size: 0.95em;">
        <p><strong>🔒 Privacy First</strong><br>
        Brainchomp runs entirely <strong>locally in your browser</strong>. Your imaging data never leaves your device.</p>

        <p><strong>⌨️ Controls</strong><br>
        • <strong>Drag & Drop</strong> a pre-conformed 256³ NIfTI file to open.<br>
        • Use the <strong>example selector</strong> to switch between the bundled rodent MRI and mask.<br>
        • Press <strong>C</strong> to cycle the clip-plane.<br>
        • Press <strong>V</strong> to cycle through views.</p>

        <p><strong>🐭 Rodent brain extraction</strong><br>
        Both menu entries run the same 16-channel MeshNet. Skull-strip returns
        the input intensities inside the extracted brain; Brainmask returns the
        post-processed binary mask.</p>
        
        <p><em>Inputs must already be 256 × 256 × 256. This version does not resample or conform them.</em></p>
      </div>
    `)},diagnosticsBtn.onclick=function(){let h=e;if(h.length<1&&window.webgpuDiagnostics){const u=window.webgpuDiagnostics;h=`:: Startup Diagnostics ::
`,h+=`Secure Context: ${u.secureContext}
`,h+=`WebGPU Enabled: ${Wa}
`,h+=`F16 Support: ${u.f16Support}
`,u.error&&(h+=`Error: ${u.error}
`),h+=`User Agent: ${navigator.userAgent}
`}if(h.length<1&&window.webgpuDiagnostics,h.length<1){Oa("Diagnostics","No diagnostic string generated: run a model to create diagnostics");return}let C=h;l=l.slice(0,-2),l!==""&&C.includes("Status: OK")&&(C=C.replace("Status: OK",`Status: ${l}`)),l="",navigator.clipboard.writeText(C).then(()=>{Oa("Diagnostics",`<p>Diagnostics copied to clipboard</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${C}</pre>`)}).catch(u=>{Oa("Diagnostics",`<p>Failed to copy to clipboard.</p><pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9em; overflow-x: auto;">${C}</pre>`)})},opacitySlider0.oninput=function(){T.setOpacity(0,opacitySlider0.value/255),T.updateGLVolume()},opacitySlider1.oninput=function(){T.setOpacity(1,opacitySlider1.value/255)};function q(){return z(this,null,function*(){const h=T.volumes[0],C=256*256*256;if(!(h.dims[1]===256&&h.dims[2]===256&&h.dims[3]===256&&h.img.length===C))throw new Error(`Brainchomp currently requires a pre-conformed 256 × 256 × 256 NIfTI; received ${h.dims[1]} × ${h.dims[2]} × ${h.dims[3]}.`)})}function Z(){return z(this,null,function*(){for(;T.volumes.length>1;)yield T.removeVolume(T.volumes[1])})}function a(){return T.volumes.length>=2&&T.volumes[1].colormapLabel?T.volumes[1]:null}function A(){b=null,s=null,c=null}function B(){const h=a();if(h){if(s===null&&(s=h.img),b===null)h.img=s,c=null;else{const C=s,u=new C.constructor(C.length);for(let N=0;N<C.length;N++)u[N]=C[N]===b?b:0;h.img=u,c=g(b)}T.updateGLVolume()}}function g(h){const C=T.volumes[0],u=s||T.volumes[1]&&T.volumes[1].img;if(!C||!u)return null;const N=C.hdr.pixDims||[],o=N[1]&&N[2]&&N[3]?N[1]*N[2]*N[3]:1,w=Y(C.img,u,o),aa=w.reduce((ia,oa)=>ia+oa.volume_mm3,0),H=w.find(ia=>ia.label===h);if(!H)return null;const j=aa>0?H.volume_mm3/aa*100:0,$=[H.name,`${ta(H.volume_mm3)} cm3   (${j.toFixed(1)}% of brain)`,`${H.voxels.toLocaleString()} voxels`,`intensity  ${H.mean.toFixed(0)} +/- ${H.stdev.toFixed(0)}`];let X=[1,1,1,1];if(n&&n.R&&n.R[h]!=null){const ia=oa=>Math.min(255,oa*.55+130)/255;X=[ia(n.R[h]),ia(n.G[h]),ia(n.B[h]),1]}return{lines:$,color:X}}function f(){if(b===null||!c||!a())return;const h=T.screenSlices&&T.screenSlices.find(oa=>oa.axCorSag===4);if(!h)return;const[C,u]=h.leftTopWidthHeight,N=T.gl;N.viewport(0,0,N.canvas.width,N.canvas.height),N.enable(N.BLEND);const w=T.fontPx*v*1.55,aa=T.fontPx*.6,H=C+aa,j=u+aa,$=[.92,.92,.92,1],{lines:X,color:ia}=c;T.drawText([H,j],X[0],v,ia);for(let oa=1;oa<X.length;oa++)T.drawText([H,j+oa*w],X[oa],v,$)}function E(){const h=a();if(!h)return null;const C=T.frac2mm(T.scene.crosshairPos,0,!0),u=h.mm2vox(C),N=h.img;s&&(h.img=s);const o=Math.round(h.getValue(u[0],u[1],u[2],h.frame4D));return h.img=N,o}function M(h){a()&&(b=h===0||h===b?null:h,B())}function V(h){if(!h[t]||!a())return;const C=E();C===null||Number.isNaN(C)||(M(C),h.preventDefault())}function F(){return z(this,null,function*(){if(!$a){$a=!0,Xa=[];try{yield D()}catch(h){console.error("Inference could not start:",h),Oa("Input not supported",ee((h==null?void 0:h.message)||String(h)))}finally{$a=!1}}})}function D(){return z(this,null,function*(){const h=modelSelect.value;if(h==="-1"||modelSelect.selectedIndex<0)return;yield Z(),A(),yield q();const C=Ma[h],u=xa({},nt),N=new URL("./",window.location.href).href;u.rootURL=N.endsWith("/")?N.slice(0,-1):N;const o=T.volumes[0].img;if(Wa&&!Re&&C.webgpu_safetensor){console.log("Attempting WebGPU backend...");const j=Ga(xa({},C),{enableTTA:!1});try{yield kt(Ae,u,j,T.volumes[0].hdr,o,fa,Q);return}catch($){console.error("WebGPU inference failed, falling back to WebWorker.",$)}}if(C.webgpu_safetensor)try{const{runInferenceWebGl2:j,nativeWebgl2Available:$}=yield qe(()=>z(null,null,function*(){const{runInferenceWebGl2:X,nativeWebgl2Available:ia}=yield import("./inference-webgl2-D7BVejPJ.js");return{runInferenceWebGl2:X,nativeWebgl2Available:ia}}),[],import.meta.url);if($()){console.log("Attempting native WebGL2 runner..."),yield j(u,C,T.volumes[0].hdr,o,fa,Q);return}console.log("Native WebGL2 unavailable here (no OffscreenCanvas/webgl2); using the tfjs worker.")}catch(j){console.warn("Native WebGL2 declined or failed, falling back to the tfjs worker.",j.message)}if(console.log("Attempting WebWorker backend..."),typeof i!="undefined"){console.log("Worker is busy. Please wait.");return}const w={dims:T.volumes[0].hdr.dims,datatypeCode:T.volumes[0].hdr.datatypeCode},aa=j=>new Promise(($,X)=>{const ia=Ga(xa({},u),{enableSeqConv:j}),oa=Ga(xa({},C),{enableSeqConv:j,enableTTA:!1});i=new Yt({}),i.postMessage({opts:ia,modelEntry:oa,niftiHeader:w,niftiImage:o}),i.onmessage=function(pa){const{cmd:_a,message:Ba,progressFrac:Na,modalMessage:sa,statData:wa,img:ke,opts:Ie,modelEntry:Ne}=pa.data;if(_a==="ui"){if(sa){if(i.terminate(),i=void 0,wa&&wa.Status==="Fail"){X(new Error(wa.Error_Type||sa));return}if(typeof sa=="string"&&(sa.toLowerCase().includes("fail")||sa.toLowerCase().includes("error")||sa.toLowerCase().includes("compatible")||sa.toLowerCase().includes("texture")||sa.toLowerCase().includes("maximum"))){X(new Error(sa));return}}Q(Ba,Na,sa,wa)}_a==="img"&&(i.terminate(),i=void 0,fa(ke,Ie,Ne),$())},i.onerror=function(pa){console.error("WebWorker failed",pa),i.terminate(),i=void 0,X(pa)}});try{console.log("Attempting WebWorker with enableSeqConv: false"),yield aa(!1);return}catch(j){console.warn("WebWorker (fast) failed, retrying with enableSeqConv: true",j),typeof i!="undefined"&&(i.terminate(),i=void 0),console.log("Waiting 1000ms for WebGL context cleanup..."),yield new Promise($=>setTimeout($,1e3));try{console.log("Attempting WebWorker with enableSeqConv: true"),yield aa(!0);return}catch($){console.error("WebWorker (slow) failed, falling back to Main Thread.",$)}}console.log("Attempting Main Thread backend...");const H=j=>new Promise(($,X)=>{const ia=Ga(xa({},u),{enableSeqConv:j}),oa=Ga(xa({},C),{enableSeqConv:j}),pa=(Ba,Na,sa,wa)=>{wa&&wa.Status==="Fail"?X(new Error(wa.Error_Type||sa||"Inference Failed")):sa&&typeof sa=="string"&&(sa.toLowerCase().includes("fail")||sa.toLowerCase().includes("error")||sa.toLowerCase().includes("compatible")||sa.toLowerCase().includes("texture")||sa.toLowerCase().includes("maximum"))&&X(new Error(sa)),Q(Ba,Na,sa,wa)},_a=(Ba,Na,sa)=>{fa(Ba,Na,sa),$()};Mt(ia,oa,T.volumes[0].hdr,o,_a,pa).catch(Ba=>X(Ba))});try{console.log("Attempting Main Thread with enableSeqConv: false"),yield H(!1)}catch(j){console.warn("Main Thread (fast) failed, retrying with enableSeqConv: true",j),yield new Promise($=>setTimeout($,100));try{console.log("Attempting Main Thread with enableSeqConv: true"),yield H(!0)}catch($){console.error("Main Thread (slow) failed.",$),fl($)}}})}modelSelect.onchange=F;function k(h){const C=a(),u=b!==null&&C&&s;u&&(C.img=s);try{return h()}finally{u&&B()}}function K(){if(T.volumes.length<2){window.alert("No segmentation to save (run a model first).");return}const h=(za==null?void 0:za.type)==="Brain_Masking"?"brainmask.nii.gz":"skull_stripped_brain.nii.gz";k(()=>T.volumes[1].saveToDisk(h))}function ra(){if(T.volumes.length<1){window.alert("No image loaded.");return}T.volumes[0].saveToDisk("input.nii.gz")}function J(){return z(this,null,function*(){if(T.volumes.length<1){window.alert("No image loaded.");return}yield k(()=>z(null,null,function*(){yield T.saveDocument("brainchomp.nvd")}))})}const ya=[{act:K,title:"Model output",sub:"skull-stripped image or binary mask",need:"seg"},{act:ra,title:"Input volume",sub:"the currently loaded 256³ NIfTI",need:"img"},{act:J,title:"Scene",sub:"everything, as a .nvd document",need:"img"}];function Ca(){const h=T.volumes.length>=1,C=T.volumes.length>=2,u=w=>w==="seg"?C:h,N=ya.map((w,aa)=>{const H=u(w.need)?"":" disabled";return`<button type="button" class="save-opt${H}" data-i="${aa}"${H?" disabled":""}>
        <span class="save-opt-title">${w.title}</span>
        <span class="save-opt-sub">${w.sub}</span>
      </button>`}).join("");Oa("Save",`<div class="save-options">${N}</div>`,{hideClose:!0,saveMode:!0});const o=document.getElementById("dialogMessage");o&&o.querySelectorAll(".save-opt:not(.disabled)").forEach(w=>{w.onclick=()=>{const aa=ya[parseInt(w.dataset.i,10)],H=document.getElementById("appDialog");H&&H.open&&H.close(),aa.act()}})}const Ua=document.getElementById("saveBtn");Ua&&(Ua.onclick=Ca);function Y(h,C,u){const o=new Map,w=C.length;for(let j=0;j<w;j++){const $=C[j];if($===0)continue;let X=o.get($);X||(X={count:0,sum:0,sumSq:0,hist:new Float64Array(256)},o.set($,X));const ia=h[j];X.count++,X.sum+=ia,X.sumSq+=ia*ia,X.hist[ia]++}const aa=(j,$,X)=>{const ia=X*$;let oa=0;for(let pa=0;pa<j.length;pa++)if(oa+=j[pa],oa>=ia)return pa;return j.length-1},H=[];for(const[j,$]of[...o.entries()].sort((X,ia)=>X[0]-ia[0])){const X=$.sum/$.count,ia=Math.max(0,$.sumSq/$.count-X*X);let oa=0,pa=0;for(let _a=0;_a<$.hist.length;_a++)if($.hist[_a]>0){oa=_a;break}for(let _a=$.hist.length-1;_a>=0;_a--)if($.hist[_a]>0){pa=_a;break}H.push({label:j,name:r&&r[j]!=null?r[j]:`label_${j}`,voxels:$.count,volume_mm3:$.count*u,min:oa,max:pa,q1:aa($.hist,$.count,.25),median:aa($.hist,$.count,.5),q3:aa($.hist,$.count,.75),mean:X,stdev:Math.sqrt(ia)})}return H}function ea(h){const C=["label","name","voxels","volume_mm3","min","max","q1","median","q3","mean","stdev"],u=w=>Number.isInteger(w)?String(w):w.toFixed(6),N=w=>/[",\n]/.test(w)?`"${String(w).replace(/"/g,'""')}"`:String(w),o=[C.join(",")];for(const w of h)o.push([w.label,N(w.name),w.voxels,u(w.volume_mm3),w.min,w.max,w.q1,w.median,w.q3,u(w.mean),u(w.stdev)].join(","));return o.join(`
`)+`
`}function ua(h){const C=new Blob([ea(h)],{type:"text/csv"}),u=URL.createObjectURL(C),N=document.createElement("a");N.href=u,N.download="mask_stats.csv",document.body.appendChild(N),N.click(),N.remove(),URL.revokeObjectURL(u)}const la=h=>String(h).replace(/[&<>"]/g,C=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[C]),ta=h=>{const C=h/1e3;return C>=10?Math.round(C).toLocaleString():C.toFixed(1)};function ca(h,C){const u=Math.max(...h.map(w=>w.volume_mm3)),N=w=>n&&n.R&&n.R[w.label]!=null?`rgb(${n.R[w.label]},${n.G[w.label]},${n.B[w.label]})`:"#6b9bd1";let o="";for(const w of h){const aa=C>0?w.volume_mm3/C*100:0,H=u>0?w.volume_mm3/u*100:0,j=`<span class="stat-val" data-cm3="${ta(w.volume_mm3)}" data-pct="${aa.toFixed(1)}%">${ta(w.volume_mm3)}</span>`,$=`<span class="stat-bar" style="width:${H.toFixed(2)}%;background:${N(w)}" data-w-abs="${H.toFixed(2)}" data-w-pct="${aa.toFixed(2)}"></span>`,X=(oa,pa)=>`<div><span class="k">${oa}</span><span class="v">${pa}</span></div>`,ia=X("min",w.min)+X("max",w.max)+X("Q1",w.q1)+X("Q3",w.q3)+X("median",w.median)+X("mean",w.mean.toFixed(2))+X("SD",w.stdev.toFixed(2))+X("voxels",w.voxels.toLocaleString());o+=`
        <div class="stat-row" role="button" tabindex="0" data-label="${w.label}" style="cursor:pointer">
          <div class="stat-line">
            <span class="stat-name">${la(w.name)}</span>
            <span class="stat-track">${$}</span>
            ${j}
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
          <span class="stat-total" id="statsUnitLabel">total ${ta(C)} cm³</span>
        </div>
        <div class="stat-toggle">
          <button type="button" data-mode="cm3" class="active">cm³</button>
          <button type="button" data-mode="pct">% of total</button>
        </div>
        <div id="statsRows">${o}</div>
        <div class="stat-actions">
          <button type="button" id="statsDownloadBtn">Download CSV</button>
        </div>
      </div>`}saveStatsBtn.onclick=function(){if(T.volumes.length<2){window.alert("No segmentation to measure (run a model first).");return}const h=T.volumes[0].img,C=s||T.volumes[1].img;if(!h||!C||h.length!==C.length){window.alert("Input and segmentation grids do not match.");return}const u=T.volumes[0].hdr.pixDims||[],N=u[1]&&u[2]&&u[3]?u[1]*u[2]*u[3]:1;let o=Y(h,C,N);if(o.length===0){window.alert("No non-background labels found in the segmentation.");return}o=o.slice().sort((H,j)=>j.volume_mm3-H.volume_mm3);const w=o.reduce((H,j)=>H+j.volume_mm3,0);Oa("Region volumes",ca(o,w));const aa=document.getElementById("statsPanel");aa&&(aa.querySelectorAll(".stat-toggle button").forEach(H=>{H.onclick=()=>{const j=H.dataset.mode;aa.querySelectorAll(".stat-toggle button").forEach($=>$.classList.toggle("active",$===H)),document.getElementById("statsUnitLabel").textContent=j==="pct"?"100% of segmented volume":`total ${ta(w)} cm³`,aa.querySelectorAll(".stat-row").forEach($=>{const X=$.querySelector(".stat-val"),ia=$.querySelector(".stat-bar");X.textContent=j==="pct"?X.dataset.pct:X.dataset.cm3,ia.style.width=(j==="pct"?ia.dataset.wPct:ia.dataset.wAbs)+"%"})}}),aa.querySelectorAll(".stat-row").forEach(H=>{const j=()=>{const $=H.querySelector(".stat-detail");$.style.display=$.style.display==="none"?"grid":"none"};H.onclick=j,H.onkeydown=$=>{($.key==="Enter"||$.key===" ")&&($.preventDefault(),j())}}),aa.querySelectorAll(".stat-iso").forEach(H=>{H.onclick=j=>{j.stopPropagation();const $=parseInt(H.closest(".stat-row").dataset.label,10);Number.isNaN($)||M($);const X=document.getElementById("appDialog");X&&X.open&&X.close()}}),document.getElementById("statsDownloadBtn").onclick=()=>ua(o))};function da(){p=T.volumes[0]||null,p&&p.name&&p.name,opacitySlider0.oninput(),modelSelect.value="-1"}function na(h){return z(this,null,function*(){return yield(yield fetch(h)).json()})}function Sa(h){return z(this,null,function*(){const C=new Map;for(const u of h)C.set(u,(C.get(u)||0)+1);return Array.from(C,([u,N])=>({value:u,count:N}))})}function La(h,C,u=1){return z(this,null,function*(){return(!C||h.length!==C.length)&&(l="Failed to Predict Some Labels - "),C.map((N,o)=>{const w=h.find(H=>H.value===o),aa=w?`${ta(w.count*u)} cm3`:"Missing";return aa==="Missing"&&(l+=`${N}, `),`${N}   ${aa}`})})}function fa(h,C,u){return z(this,null,function*(){za=u,yield Z(),A();const N=yield T.volumes[0].clone();if(N.zeroImage(),Object.assign(N.hdr,{scl_inter:0,scl_slope:1}),N.img=h,r=null,n=null,u.type==="Brain_Masking"){const o=["Background","Brain Mask"];r=o.slice();const w=[0,217],aa=[0,119],H=[0,33];n={R:w,G:aa,B:H},N.setColormapLabel({R:w,G:aa,B:H,labels:o}),N.hdr.datatypeCode=2,N.hdr.numBitsPerVoxel=8,N.hdr.intent_code=1002}else if(u.colormapPath){const o=yield Sa(N.img),w=yield na(u.colormapPath);r=w.labels?w.labels.slice():null,n={R:w.R,G:w.G,B:w.B};const aa=T.volumes[0].hdr.pixDims||[],H=aa[1]&&aa[2]&&aa[3]?aa[1]*aa[2]*aa[3]:1,j=yield La(o,w.labels,H);N.setColormapLabel({R:w.R,G:w.G,B:w.B,labels:j}),N.hdr.intent_code=1002}else{let o=C.atlasSelectedColorTable.toLowerCase();u.type==="Brain_Extraction"&&(o="copper2"),T.colormaps().includes(o)||(o="actc"),N.colormap=o}if(N.opacity=opacitySlider1.value/255,yield T.addVolume(N),a()&&r&&r.length>2){const o=document.getElementById("location");o&&(o.innerHTML='<p style="font-size:14px;margin:0;opacity:.75;">Tip: Option/Alt-click a region to show only it — Esc restores all</p>')}})}function ha(h){return z(this,null,function*(){if(typeof h=="string")try{h=JSON.parse(h)}catch(C){console.error("Failed to parse telemetry data",C);return}h=yield jt(h,T.gl),e=`:: Diagnostics https://github.com/neuroneural/brainchop/issues ::
`;for(const C in h)h[C]!==null&&h[C]!==void 0&&(e+=`${C}: ${h[C]}
`)})}function Q(h="",C=-1,u="",N=[]){h&&(console.log(h),document.getElementById("location").innerHTML=h),isNaN(C)?(memstatus.style.color="red",memstatus.innerHTML="Memory Issue"):C>=0&&(modelProgress.value=C*modelProgress.max),u&&($a?(Xa.push(String(u)),console.warn("[backend]",u)):Oa("Message",ee(String(u)).replace(/\n/g,"<br>"))),N&&Object.keys(N).length>0&&ha(N)}function va(h){document.getElementById("location").innerHTML=h.string.split("   ").map(C=>C.trim()).filter(C=>C!=="").map(C=>`<span class="loc-seg">${C}</span>`).join('<span class="loc-sep">&middot;</span>')}const Ta={backColor:[0,0,0,1],show3Dcrosshair:!0,onLocationChange:va},T=new je(Ta);yield T.attachTo("gl1"),T.gl.canvas.addEventListener("click",V),window.addEventListener("keydown",h=>{h.key!=="Escape"||b===null||document.querySelector("dialog[open]")||(b=null,B())});const ba=T.gl.uniform4fv.bind(T.gl);T.gl.uniform4fv=function(h,C){if(b!==null){const u=T.orientShaderAtlasU&&T.orientShaderAtlasU.uniforms.xyzaFrac,N=T.orientShaderAtlasI&&T.orientShaderAtlasI.uniforms.xyzaFrac;if(u&&h===u||N&&h===N)return ba(h,[0,0,0,C[3]])}return ba(h,C)};const m=T.drawSceneCore.bind(T);T.drawSceneCore=function(){const h=m();try{f()}catch(C){console.warn("isolation HUD draw failed",C)}return h},Object.assign(T.opts,{dragMode:T.dragModes.slicer3D,multiplanarForceRender:!0,yoke3Dto2DZoom:!0,crosshairGap:11});{const h=document.getElementById("dragSegmented");h&&h.querySelectorAll("button").forEach(C=>C.classList.toggle("active",parseInt(C.dataset.drag,10)===T.opts.dragMode))}T.setInterpolation(!0);function U(h){return z(this,null,function*(){for(za=null;T.volumes.length;)yield T.removeVolume(T.volumes[T.volumes.length-1]);A(),yield T.loadVolumes([{url:h}])})}T.onImageLoaded=da,P&&(P.onchange=()=>U(P.value),yield U(P.value)),modelSelect.innerHTML="";const O=document.createElement("option");O.text="Run Segmentation Model",O.value="-1",O.disabled=!0,O.selected=!0,O.hidden=!0,modelSelect.appendChild(O);for(let h=0;h<Ma.length;h++){console.log(`Adding model option: ${Ma[h].modelName}`);const C=document.createElement("option");C.text=Ma[h].modelName,C.value=h,Ma[h].type==="Divider"&&(C.disabled=!0),modelSelect.appendChild(C)}rl(T),Kt(T),modelSelect.value="-1",L(-1),yield nl();const Ea=new URLSearchParams(window.location.search).get("model");Ea&&Ea<Ma.length&&(modelSelect.value=Ea,F())})}function ee(e){return String(e).replace(/[&<>"']/g,l=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[l])}function fl(e){const i=(Xa.length?Xa:[e&&e.message?e.message:String(e||"unknown error")]).map(r=>`<li>${ee(r)}</li>`).join("");Oa("Segmentation failed",`<p>No available backend could run this model on this device.</p>
     <ul style="margin:0 0 4px 1.1em;padding:0;font-size:0.92em;line-height:1.45">${i}</ul>
     <p style="font-size:0.88em;color:#9aa4af">Full details are in the browser console and under Diagnostics.</p>`)}function Oa(e,l,i={}){const r=document.getElementById("appDialog"),n=document.getElementById("dialogTitle"),t=document.getElementById("dialogMessage"),b=document.getElementById("dialogCloseBtn");if(!r)return;n.textContent=e,t.innerHTML=l,b.style.display=i.hideClose?"none":"",b.onclick=()=>r.close(),r.classList.toggle("dialog-save",!!i.saveMode);const s=document.getElementById("dialogXBtn");s&&(s.onclick=()=>r.close()),r.showModal()}function ol(){return z(this,null,function*(){try{const l=yield(yield fetch("https://api.github.com/repos/neuroneural/brainchop")).json();document.getElementById("star-count").textContent=l.stargazers_count}catch(e){console.error("Error fetching star count:",e)}})}(function(){return z(this,null,function*(){yield sl(),yield ol()})})();
