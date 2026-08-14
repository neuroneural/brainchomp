var jH=Object.defineProperty;var tw=Object.getOwnPropertySymbols;var YH=Object.prototype.hasOwnProperty,ZH=Object.prototype.propertyIsEnumerable;var Sp=Math.pow,ew=(Sn,Qe,Ee)=>Qe in Sn?jH(Sn,Qe,{enumerable:!0,configurable:!0,writable:!0,value:Ee}):Sn[Qe]=Ee,Wc=(Sn,Qe)=>{for(var Ee in Qe||(Qe={}))YH.call(Qe,Ee)&&ew(Sn,Ee,Qe[Ee]);if(tw)for(var Ee of tw(Qe))ZH.call(Qe,Ee)&&ew(Sn,Ee,Qe[Ee]);return Sn};var Q=(Sn,Qe,Ee)=>new Promise((ra,Ro)=>{var Le=Nn=>{try{qs(Ee.next(Nn))}catch(zn){Ro(zn)}},Uc=Nn=>{try{qs(Ee.throw(Nn))}catch(zn){Ro(zn)}},qs=Nn=>Nn.done?ra(Nn.value):Promise.resolve(Nn.value).then(Le,Uc);qs((Ee=Ee.apply(Sn,Qe)).next())});(function(){"use strict";function Sn(n,t){return t.forEach(function(e){e&&typeof e!="string"&&!Array.isArray(e)&&Object.keys(e).forEach(function(s){if(s!=="default"&&!(s in n)){var o=Object.getOwnPropertyDescriptor(e,s);Object.defineProperty(n,s,o.get?o:{enumerable:!0,get:function(){return e[s]}})}})}),Object.freeze(n)}const Qe=1e-7,Ee=1e-4;class ra{constructor(t,e){this.backend=t,this.dataMover=e,this.data=new WeakMap,this.dataIdsCount=0}get(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)}set(t,e){this.dataIdsCount++,this.data.set(t,e)}has(t){return this.data.has(t)}delete(t){return this.dataIdsCount--,this.data.delete(t)}numDataIds(){return this.dataIdsCount}}class Ro{refCount(t){return Le("refCount")}incRef(t){return Le("incRef")}timerAvailable(){return!0}time(t){return Le("time")}read(t){return Le("read")}readSync(t){return Le("readSync")}readToGPU(t,e){return Le("readToGPU")}numDataIds(){return Le("numDataIds")}disposeData(t,e){return Le("disposeData")}write(t,e,s){return Le("write")}move(t,e,s,o,r){return Le("move")}createTensorFromGPUData(t,e,s){return Le("createTensorFromGPUData")}memory(){return Le("memory")}floatPrecision(){return Le("floatPrecision")}epsilon(){return this.floatPrecision()===32?Qe:Ee}dispose(){return Le("dispose")}}function Le(n){throw new Error(`'${n}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}function Uc(n){let t=n.length,e=0;for(;t>0;)e=Math.random()*t|0,t--,zn(n,t,e)}function qs(n,t,e){return Math.max(n,Math.min(t,e))}function Nn(n){return n%2===0?n:n+1}function zn(n,t,e){const s=n[t];n[t]=n[e],n[e]=s}function nw(n){let t=0;for(let e=0;e<n.length;e++)t+=n[e];return t}function k(n,t){if(!n)throw new Error(typeof t=="string"?t:t())}function Gc(n,t,e=""){k(Lt(n,t),()=>e+` Shapes ${n} and ${t} must match`)}function Np(n){k(n!=null,()=>"The input to the tensor constructor must be a non-null value.")}function X(n){if(n.length===0)return 1;let t=n[0];for(let e=1;e<n.length;e++)t*=n[e];return t}function Lt(n,t){if(n===t)return!0;if(n==null||t==null||n.length!==t.length)return!1;for(let e=0;e<n.length;e++)if(n[e]!==t[e])return!1;return!0}function Ao(n){return n%1===0}function Hc(n){const t=Math.ceil(Math.sqrt(n));return[t,Math.ceil(n/t)]}function Do(n,t){return t<=n.length?n:n+" ".repeat(t-n.length)}function Tp(n,t=o=>0,e,s){return new Promise((o,r)=>{let i=0;const a=()=>{if(n()){o();return}i++;const l=t(i);if(e!=null&&i>=e){r();return}s!=null?s(a,l):setTimeout(a,l)};a()})}function Ep(n,t){let e=1,s=-1;for(let r=0;r<n.length;++r)if(n[r]>=0)e*=n[r];else if(n[r]===-1){if(s!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${s} and dim ${r}`);s=r}else if(n[r]<0)throw Error(`Shapes can not be < 0. Found ${n[r]} at dim ${r}`);if(s===-1){if(t>0&&t!==e)throw Error(`Size(${t}) must match the product of shape ${n}`);return n}if(e===0)throw Error(`Cannot infer the missing size in [${n}] when there are 0 elements`);if(t%e!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${e}`);const o=n.slice();return o[s]=t/e,o}function $t(n,t){const e=t.length;return n=n==null?t.map((s,o)=>o):[].concat(n),k(n.every(s=>s>=-e&&s<e),()=>`All values in axis param must be in range [-${e}, ${e}) but got axis ${n}`),k(n.every(s=>Ao(s)),()=>`All values in axis param must be integers but got axis ${n}`),n.map(s=>s<0?e+s:s)}function xs(n,t){const e=[],s=[],o=t!=null&&Array.isArray(t)&&t.length===0,r=t==null||o?null:$t(t,n).sort();let i=0;for(let a=0;a<n.length;++a){if(r!=null){if(r[i]===a&&n[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${n[a]}' is not 1`);(r[i]==null||r[i]>a)&&n[a]===1&&(e.push(n[a]),s.push(a)),r[i]<=a&&i++}n[a]!==1&&(e.push(n[a]),s.push(a))}return{newShape:e,keptDims:s}}function Re(n,t){return ee(n,t)}function ee(n,t){let e=null;if(n==null||n==="float32")e=new Float32Array(t);else if(n==="int32")e=new Int32Array(t);else if(n==="bool")e=new Uint8Array(t);else if(n==="string")e=new Array(t);else throw new Error(`Unknown data type ${n}`);return e}function sw(n,t){for(let e=0;e<n.length;e++){const s=n[e];if(isNaN(s)||!isFinite(s))throw Error(`A tensor of type ${t} being uploaded contains ${s}.`)}}function ow(n){return n==="bool"||n==="complex64"||n==="float32"||n==="int32"||n==="string"}function Rp(n,t){return!(t==="complex64"||t==="float32"&&n!=="complex64"||t==="int32"&&n!=="float32"&&n!=="complex64"||t==="bool"&&n==="bool")}function ia(n){if(n==="float32"||n==="int32")return 4;if(n==="complex64")return 8;if(n==="bool")return 1;throw new Error(`Unknown dtype ${n}`)}function rw(n){if(n==null)return 0;let t=0;return n.forEach(e=>t+=e.length),t}function mr(n){return typeof n=="string"||n instanceof String}function iw(n){return typeof n=="boolean"}function qc(n){return typeof n=="number"}function Fo(n){return Array.isArray(n)?Fo(n[0]):n instanceof Float32Array?"float32":n instanceof Int32Array||n instanceof Uint8Array||n instanceof Uint8ClampedArray?"int32":qc(n)?"float32":mr(n)?"string":iw(n)?"bool":"float32"}function Xc(n){return!!(n&&n.constructor&&n.call&&n.apply)}function Kc(n,t){for(let e=t;e<n;++e)if(n%e===0)return e;return n}function dt(n){const t=n.length;if(t<2)return[];const e=new Array(t-1);e[t-2]=n[t-1];for(let s=t-3;s>=0;--s)e[s]=e[s+1]*n[s+1];return e}function Ap(n,t,e,s=!1){const o=new Array;if(t.length===1){const r=t[0]*(s?2:1);for(let i=0;i<r;i++)o[i]=e[n+i]}else{const r=t[0],i=t.slice(1),a=i.reduce((l,c)=>l*c)*(s?2:1);for(let l=0;l<r;l++)o[l]=Ap(n+l*a,i,e,s)}return o}function Tn(n,t,e=!1){if(n.length===0)return t[0];const s=n.reduce((o,r)=>o*r)*(e?2:1);if(s===0)return[];if(s!==t.length)throw new Error(`[${n}] does not match the input size ${t.length}${e?" for a complex tensor":""}.`);return Ap(0,n,t,e)}function aw(n,t){if(Array.isArray(n))return n;if(t==="float32")return n instanceof Float32Array?n:new Float32Array(n);if(t==="int32")return n instanceof Int32Array?n:new Int32Array(n);if(t==="bool"||t==="string")return Uint8Array.from(new Int32Array(n));throw new Error(`Unknown dtype ${t}`)}function jc(n,t){const e=Ae(n,t);for(let s=0;s<e.length;s++)e[s]=1;return e}function Ae(n,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(n);if(t==="int32")return new Int32Array(n);if(t==="bool")return new Uint8Array(n);throw new Error(`Unknown data type ${t}`)}function Dp(n,t){const e=n.reduce((s,o)=>s*o,1);if(t==null||t==="float32")return Tn(n,new Float32Array(e));if(t==="int32")return Tn(n,new Int32Array(e));if(t==="bool")return Tn(n,new Uint8Array(e));throw new Error(`Unknown data type ${t}`)}function rs(n){n.forEach(t=>{k(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${n}].`)})}function Vn(n,t,e){if(t===0)return 0;if(t===1)return n[0];let s=n[n.length-1];for(let o=0;o<n.length-1;++o)s+=e[o]*n[o];return s}function _o(n,t,e){if(t===0)return[];if(t===1)return[n];const s=new Array(t);for(let o=0;o<s.length-1;++o)s[o]=Math.floor(n/e[o]),n-=s[o]*e[o];return s[s.length-1]=n,s}function Yc(n){return n&&n.then&&typeof n.then=="function"}const Fp="tfjsflags";class lw{constructor(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=cw,this.populateURLFlags()}setPlatform(t,e){this.platform!=null&&(U().getBool("IS_TEST")||U().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${t}.`)),this.platformName=t,this.platform=e}registerFlag(t,e,s){if(this.flagRegistry[t]={evaluationFn:e,setHook:s},this.urlFlags[t]!=null){const o=this.urlFlags[t];U().getBool("IS_TEST")||U().getBool("PROD")||console.warn(`Setting feature override from URL ${t}: ${o}.`),this.set(t,o)}}getAsync(t){return Q(this,null,function*(){return t in this.flags?this.flags[t]:(this.flags[t]=yield this.evaluateFlag(t),this.flags[t])})}get(t){if(t in this.flags)return this.flags[t];const e=this.evaluateFlag(t);if(Yc(e))throw new Error(`Flag ${t} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[t]=e,this.flags[t]}getNumber(t){return this.get(t)}getBool(t){return this.get(t)}getString(t){return this.get(t)}getFlags(){return this.flags}get features(){return this.flags}set(t,e){if(this.flagRegistry[t]==null)throw new Error(`Cannot set flag ${t} as it has not been registered.`);this.flags[t]=e,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(e)}evaluateFlag(t){if(this.flagRegistry[t]==null)throw new Error(`Cannot evaluate flag '${t}': no evaluation function found.`);return this.flagRegistry[t].evaluationFn()}setFlags(t){this.flags=Object.assign({},t)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global=="undefined"||typeof this.global.location=="undefined"||typeof this.global.location.search=="undefined")return;const t=this.getQueryParams(this.global.location.search);Fp in t&&t[Fp].split(",").forEach(s=>{const[o,r]=s.split(":");this.urlFlags[o]=hw(o,r)})}}function cw(n){const t={};return n.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...s)=>(uw(t,s[0],s[1]),s.join("="))),t}function uw(n,t,e){n[decodeURIComponent(t)]=decodeURIComponent(e||"")}function hw(n,t){const e=t.toLowerCase();return e==="true"||e==="false"?e==="true":`${+e}`===e?+e:t}function U(){return _p}let _p=null;function dw(n){_p=n}let Zc;function Op(){if(Zc==null){let n;if(typeof window!="undefined")n=window;else if(typeof global!="undefined")n=global;else if(typeof process!="undefined")n=process;else if(typeof self!="undefined")n=self;else throw new Error("Could not find a global object");Zc=n}return Zc}function pw(){const n=Op();return n._tfGlobals==null&&(n._tfGlobals=new Map),n._tfGlobals}function Qc(n,t){const e=pw();if(e.has(n))return e.get(n);{const s=t();return e.set(n,s),e.get(n)}}const aa="Abs",gr="Acos",xr="Acosh",Oo="Add",Jc="AddN",tu="All",eu="Any",la="ArgMax",ca="ArgMin",br="Asin",yr="Asinh",wr="Atan",Cr="Atanh",$r="Atan2",ua="AvgPool",nu="AvgPoolGrad",ha="AvgPool3D",su="AvgPool3DGrad",da="BatchMatMul",pa="BatchToSpaceND",ou="Bincount",ru="BitwiseAnd",fw="BroadcastTo",Lp="BroadcastArgs",Ir="Cast",vr="Ceil",kr="ClipByValue",iu="Complex",fa="ComplexAbs",ma="Concat",ga="Conv2D",au="Conv2DBackpropFilter",xa="Conv2DBackpropInput",ba="Conv3D",lu="Conv3DBackpropFilterV2",cu="Conv3DBackpropInputV2",Sr="Cos",Nr="Cosh",uu="Cumprod",ya="Cumsum",hu="CropAndResize",du="DenseBincount",pu="DepthToSpace",wa="DepthwiseConv2dNative",fu="DepthwiseConv2dNativeBackpropFilter",mu="DepthwiseConv2dNativeBackpropInput",Mp="Diag",Ca="Dilation2D",gu="Dilation2DBackpropInput",xu="Dilation2DBackpropFilter",mw="Draw",Tr="RealDiv",bu="Einsum",Er="Elu",yu="EluGrad",Rr="Erf",$a="Equal",Ar="Exp",Ia="ExpandDims",Dr="Expm1",wu="FFT",Cu="Fill",$u="FlipLeftRight",Fr="Floor",_r="FloorDiv",va="FusedBatchNorm",ka="GatherV2",Pp="GatherNd",Sa="Greater",Or="GreaterEqual",Lr="Identity",Iu="IFFT",vu="Imag",Mr="IsFinite",Pr="IsInf",Br="IsNan",Na="LeakyRelu",Ta="Less",Ea="LessEqual",Bp="LinSpace",zr="Log",Vr="Log1p",Ra="LogicalAnd",Aa="LogicalNot",Da="LogicalOr",gw="LogSoftmax",Fa="LRN",ku="LRNGrad",_a="Max",Wr="Maximum",Oa="MaxPool",Su="MaxPoolGrad",La="MaxPool3D",Nu="MaxPool3DGrad",zp="MaxPoolWithArgmax",Ma="Mean",Pa="Min",Ur="Minimum",Ba="MirrorPad",Gr="Mod",Vp="Multinomial",Hr="Multiply",za="Neg",Va="NotEqual",Tu="NonMaxSuppressionV3",Eu="NonMaxSuppressionV4",Ru="NonMaxSuppressionV5",Wa="OnesLike",Ua="OneHot",Ga="Pack",Ha="PadV2",qr="Pow",qa="Prelu",Xa="Prod",Wp="RaggedGather",Up="RaggedRange",Gp="RaggedTensorToTensor",Au="Range",Du="Real",Xr="Reciprocal",Kr="Relu",Ka="Reshape",ja="ResizeNearestNeighbor",Fu="ResizeNearestNeighborGrad",Ya="ResizeBilinear",_u="ResizeBilinearGrad",jr="Relu6",Za="Reverse",Yr="Round",Zr="Rsqrt",Hp="ScatterNd",qp="TensorScatterUpdate",Xp="SearchSorted",Qa="Select",Qr="Selu",Ja="Slice",Jr="Sin",ti="Sinh",ei="Sign",ni="Sigmoid",si="Softplus",oi="Sqrt",tl="Sum",el="SpaceToBatchND",nl="SplitV",sl="Softmax",Kp="SparseFillEmptyRows",jp="SparseReshape",Yp="SparseSegmentMean",Zp="SparseSegmentSum",Qp="SparseToDense",ri="SquaredDifference",Ou="Square",Lu="StaticRegexReplace",Mu="StridedSlice",Jp="StringNGrams",tf="StringSplit",ef="StringToHashBucketFast",ii="Sub",ai="Tan",li="Tanh",ci="Tile",Pu="TopK",Bu="Transform",Lo="Transpose",zu="Unique",ol="Unpack",rl="UnsortedSegmentSum",il="ZerosLike",ui="Step",xw="FromPixels",Vu="RotateWithOffset",al="_FusedMatMul",ll="FusedConv2D",nf="FusedDepthwiseConv2D";function on(...n){U().getBool("IS_TEST")||U().getBool("PROD")||console.warn(...n)}const cl=Qc("kernelRegistry",()=>new Map),Wu=Qc("gradRegistry",()=>new Map);function sf(n,t){const e=lf(n,t);return cl.get(e)}function of(n){return Wu.get(n)}function rf(n){const t=cl.entries(),e=[];for(;;){const{done:s,value:o}=t.next();if(s)break;const[r,i]=o,[a]=r.split("_");a===n&&e.push(i)}return e}function af(n){const{kernelName:t,backendName:e}=n,s=lf(t,e);cl.has(s)&&on(`The kernel '${t}' for backend '${e}' is already registered`),cl.set(s,n)}function bw(n){const{kernelName:t}=n;Wu.has(t)&&U().getBool("DEBUG")&&on(`Overriding the gradient for '${t}'`),Wu.set(t,n)}function lf(n,t){return`${t}_${n}`}function cf(n){return n instanceof Float32Array||n instanceof Int32Array||n instanceof Uint8Array||n instanceof Uint8ClampedArray}function yw(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function ww(n){if(Object.prototype.hasOwnProperty.call(n,"__esModule"))return n;var t=n.default;if(typeof t=="function"){var e=function s(){var o=!1;try{o=this instanceof s}catch(r){}return o?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};e.prototype=t.prototype}else e={};return Object.defineProperty(e,"__esModule",{value:!0}),Object.keys(n).forEach(function(s){var o=Object.getOwnPropertyDescriptor(n,s);Object.defineProperty(e,s,o.get?o:{enumerable:!0,get:function(){return n[s]}})}),e}var Uu,uf;function Cw(){if(uf)return Uu;uf=1,Uu=t;var n=null;try{n=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(N){}function t(N,C,E){this.low=N|0,this.high=C|0,this.unsigned=!!E}t.prototype.__isLong__,Object.defineProperty(t.prototype,"__isLong__",{value:!0});function e(N){return(N&&N.__isLong__)===!0}t.isLong=e;var s={},o={};function r(N,C){var E,R,D;return C?(N>>>=0,(D=0<=N&&N<256)&&(R=o[N],R)?R:(E=a(N,(N|0)<0?-1:0,!0),D&&(o[N]=E),E)):(N|=0,(D=-128<=N&&N<128)&&(R=s[N],R)?R:(E=a(N,N<0?-1:0,!1),D&&(s[N]=E),E))}t.fromInt=r;function i(N,C){if(isNaN(N))return C?b:x;if(C){if(N<0)return b;if(N>=f)return v}else{if(N<=-m)return T;if(N+1>=m)return I}return N<0?i(-N,C).neg():a(N%p|0,N/p|0,C)}t.fromNumber=i;function a(N,C,E){return new t(N,C,E)}t.fromBits=a;var l=Math.pow;function c(N,C,E){if(N.length===0)throw Error("empty string");if(N==="NaN"||N==="Infinity"||N==="+Infinity"||N==="-Infinity")return x;if(typeof C=="number"?(E=C,C=!1):C=!!C,E=E||10,E<2||36<E)throw RangeError("radix");var R;if((R=N.indexOf("-"))>0)throw Error("interior hyphen");if(R===0)return c(N.substring(1),C,E).neg();for(var D=i(l(E,8)),F=x,O=0;O<N.length;O+=8){var P=Math.min(8,N.length-O),B=parseInt(N.substring(O,O+P),E);if(P<8){var H=i(l(E,P));F=F.mul(H).add(i(B))}else F=F.mul(D),F=F.add(i(B))}return F.unsigned=C,F}t.fromString=c;function u(N,C){return typeof N=="number"?i(N,C):typeof N=="string"?c(N,C):a(N.low,N.high,typeof C=="boolean"?C:N.unsigned)}t.fromValue=u;var h=65536,d=1<<24,p=h*h,f=p*p,m=f/2,g=r(d),x=r(0);t.ZERO=x;var b=r(0,!0);t.UZERO=b;var w=r(1);t.ONE=w;var y=r(1,!0);t.UONE=y;var $=r(-1);t.NEG_ONE=$;var I=a(-1,2147483647,!1);t.MAX_VALUE=I;var v=a(-1,-1,!0);t.MAX_UNSIGNED_VALUE=v;var T=a(0,-2147483648,!1);t.MIN_VALUE=T;var S=t.prototype;return S.toInt=function(){return this.unsigned?this.low>>>0:this.low},S.toNumber=function(){return this.unsigned?(this.high>>>0)*p+(this.low>>>0):this.high*p+(this.low>>>0)},S.toString=function(C){if(C=C||10,C<2||36<C)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(T)){var E=i(C),R=this.div(E),D=R.mul(E).sub(this);return R.toString(C)+D.toInt().toString(C)}else return"-"+this.neg().toString(C);for(var F=i(l(C,6),this.unsigned),O=this,P="";;){var B=O.div(F),H=O.sub(B.mul(F)).toInt()>>>0,G=H.toString(C);if(O=B,O.isZero())return G+P;for(;G.length<6;)G="0"+G;P=""+G+P}},S.getHighBits=function(){return this.high},S.getHighBitsUnsigned=function(){return this.high>>>0},S.getLowBits=function(){return this.low},S.getLowBitsUnsigned=function(){return this.low>>>0},S.getNumBitsAbs=function(){if(this.isNegative())return this.eq(T)?64:this.neg().getNumBitsAbs();for(var C=this.high!=0?this.high:this.low,E=31;E>0&&(C&1<<E)==0;E--);return this.high!=0?E+33:E+1},S.isZero=function(){return this.high===0&&this.low===0},S.eqz=S.isZero,S.isNegative=function(){return!this.unsigned&&this.high<0},S.isPositive=function(){return this.unsigned||this.high>=0},S.isOdd=function(){return(this.low&1)===1},S.isEven=function(){return(this.low&1)===0},S.equals=function(C){return e(C)||(C=u(C)),this.unsigned!==C.unsigned&&this.high>>>31===1&&C.high>>>31===1?!1:this.high===C.high&&this.low===C.low},S.eq=S.equals,S.notEquals=function(C){return!this.eq(C)},S.neq=S.notEquals,S.ne=S.notEquals,S.lessThan=function(C){return this.comp(C)<0},S.lt=S.lessThan,S.lessThanOrEqual=function(C){return this.comp(C)<=0},S.lte=S.lessThanOrEqual,S.le=S.lessThanOrEqual,S.greaterThan=function(C){return this.comp(C)>0},S.gt=S.greaterThan,S.greaterThanOrEqual=function(C){return this.comp(C)>=0},S.gte=S.greaterThanOrEqual,S.ge=S.greaterThanOrEqual,S.compare=function(C){if(e(C)||(C=u(C)),this.eq(C))return 0;var E=this.isNegative(),R=C.isNegative();return E&&!R?-1:!E&&R?1:this.unsigned?C.high>>>0>this.high>>>0||C.high===this.high&&C.low>>>0>this.low>>>0?-1:1:this.sub(C).isNegative()?-1:1},S.comp=S.compare,S.negate=function(){return!this.unsigned&&this.eq(T)?T:this.not().add(w)},S.neg=S.negate,S.add=function(C){e(C)||(C=u(C));var E=this.high>>>16,R=this.high&65535,D=this.low>>>16,F=this.low&65535,O=C.high>>>16,P=C.high&65535,B=C.low>>>16,H=C.low&65535,G=0,K=0,j=0,Y=0;return Y+=F+H,j+=Y>>>16,Y&=65535,j+=D+B,K+=j>>>16,j&=65535,K+=R+P,G+=K>>>16,K&=65535,G+=E+O,G&=65535,a(j<<16|Y,G<<16|K,this.unsigned)},S.subtract=function(C){return e(C)||(C=u(C)),this.add(C.neg())},S.sub=S.subtract,S.multiply=function(C){if(this.isZero())return x;if(e(C)||(C=u(C)),n){var E=n.mul(this.low,this.high,C.low,C.high);return a(E,n.get_high(),this.unsigned)}if(C.isZero())return x;if(this.eq(T))return C.isOdd()?T:x;if(C.eq(T))return this.isOdd()?T:x;if(this.isNegative())return C.isNegative()?this.neg().mul(C.neg()):this.neg().mul(C).neg();if(C.isNegative())return this.mul(C.neg()).neg();if(this.lt(g)&&C.lt(g))return i(this.toNumber()*C.toNumber(),this.unsigned);var R=this.high>>>16,D=this.high&65535,F=this.low>>>16,O=this.low&65535,P=C.high>>>16,B=C.high&65535,H=C.low>>>16,G=C.low&65535,K=0,j=0,Y=0,nt=0;return nt+=O*G,Y+=nt>>>16,nt&=65535,Y+=F*G,j+=Y>>>16,Y&=65535,Y+=O*H,j+=Y>>>16,Y&=65535,j+=D*G,K+=j>>>16,j&=65535,j+=F*H,K+=j>>>16,j&=65535,j+=O*B,K+=j>>>16,j&=65535,K+=R*G+D*H+F*B+O*P,K&=65535,a(Y<<16|nt,K<<16|j,this.unsigned)},S.mul=S.multiply,S.divide=function(C){if(e(C)||(C=u(C)),C.isZero())throw Error("division by zero");if(n){if(!this.unsigned&&this.high===-2147483648&&C.low===-1&&C.high===-1)return this;var E=(this.unsigned?n.div_u:n.div_s)(this.low,this.high,C.low,C.high);return a(E,n.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?b:x;var R,D,F;if(this.unsigned){if(C.unsigned||(C=C.toUnsigned()),C.gt(this))return b;if(C.gt(this.shru(1)))return y;F=b}else{if(this.eq(T)){if(C.eq(w)||C.eq($))return T;if(C.eq(T))return w;var O=this.shr(1);return R=O.div(C).shl(1),R.eq(x)?C.isNegative()?w:$:(D=this.sub(C.mul(R)),F=R.add(D.div(C)),F)}else if(C.eq(T))return this.unsigned?b:x;if(this.isNegative())return C.isNegative()?this.neg().div(C.neg()):this.neg().div(C).neg();if(C.isNegative())return this.div(C.neg()).neg();F=x}for(D=this;D.gte(C);){R=Math.max(1,Math.floor(D.toNumber()/C.toNumber()));for(var P=Math.ceil(Math.log(R)/Math.LN2),B=P<=48?1:l(2,P-48),H=i(R),G=H.mul(C);G.isNegative()||G.gt(D);)R-=B,H=i(R,this.unsigned),G=H.mul(C);H.isZero()&&(H=w),F=F.add(H),D=D.sub(G)}return F},S.div=S.divide,S.modulo=function(C){if(e(C)||(C=u(C)),n){var E=(this.unsigned?n.rem_u:n.rem_s)(this.low,this.high,C.low,C.high);return a(E,n.get_high(),this.unsigned)}return this.sub(this.div(C).mul(C))},S.mod=S.modulo,S.rem=S.modulo,S.not=function(){return a(~this.low,~this.high,this.unsigned)},S.and=function(C){return e(C)||(C=u(C)),a(this.low&C.low,this.high&C.high,this.unsigned)},S.or=function(C){return e(C)||(C=u(C)),a(this.low|C.low,this.high|C.high,this.unsigned)},S.xor=function(C){return e(C)||(C=u(C)),a(this.low^C.low,this.high^C.high,this.unsigned)},S.shiftLeft=function(C){return e(C)&&(C=C.toInt()),(C&=63)===0?this:C<32?a(this.low<<C,this.high<<C|this.low>>>32-C,this.unsigned):a(0,this.low<<C-32,this.unsigned)},S.shl=S.shiftLeft,S.shiftRight=function(C){return e(C)&&(C=C.toInt()),(C&=63)===0?this:C<32?a(this.low>>>C|this.high<<32-C,this.high>>C,this.unsigned):a(this.high>>C-32,this.high>=0?0:-1,this.unsigned)},S.shr=S.shiftRight,S.shiftRightUnsigned=function(C){if(e(C)&&(C=C.toInt()),C&=63,C===0)return this;var E=this.high;if(C<32){var R=this.low;return a(R>>>C|E<<32-C,E>>>C,this.unsigned)}else return C===32?a(E,0,this.unsigned):a(E>>>C-32,0,this.unsigned)},S.shru=S.shiftRightUnsigned,S.shr_u=S.shiftRightUnsigned,S.toSigned=function(){return this.unsigned?a(this.low,this.high,!1):this},S.toUnsigned=function(){return this.unsigned?this:a(this.low,this.high,!0)},S.toBytes=function(C){return C?this.toBytesLE():this.toBytesBE()},S.toBytesLE=function(){var C=this.high,E=this.low;return[E&255,E>>>8&255,E>>>16&255,E>>>24,C&255,C>>>8&255,C>>>16&255,C>>>24]},S.toBytesBE=function(){var C=this.high,E=this.low;return[C>>>24,C>>>16&255,C>>>8&255,C&255,E>>>24,E>>>16&255,E>>>8&255,E&255]},t.fromBytes=function(C,E,R){return R?t.fromBytesLE(C,E):t.fromBytesBE(C,E)},t.fromBytesLE=function(C,E){return new t(C[0]|C[1]<<8|C[2]<<16|C[3]<<24,C[4]|C[5]<<8|C[6]<<16|C[7]<<24,E)},t.fromBytesBE=function(C,E){return new t(C[4]<<24|C[5]<<16|C[6]<<8|C[7],C[0]<<24|C[1]<<16|C[2]<<8|C[3],E)},Uu}var hf=Cw(),df=yw(hf),$w=Sn({__proto__:null,default:df},[hf]);const Xs=df||$w;function ul(n){return Xs.fromString(n,!0,16)}const pf=ul("c3a5c85c97cb3127"),Ks=ul("b492b66fbe98f273"),Me=ul("9ae16a3b2f90404f");function Gu(n){return n.xor(n.shru(47))}function ff(n,t,e){const s=n.slice(t,t+e);return Xs.fromBytes(Array.from(s),!0,!0)}function Ht(n,t){return ff(n,t,8)}function mf(n,t){return ff(n,t,4)}function ye(n,t){return t===0?n:n.shru(t).or(n.shl(64-t))}function bs(n,t,e=ul("9ddfea08eb382d69")){let s=n.xor(t).mul(e);s=s.xor(s.shru(47));let o=t.xor(s).mul(e);return o=o.xor(o.shru(47)),o=o.mul(e),o}function Iw(n,t,e,s,o,r){o=o.add(n),r=ye(r.add(o).add(s),21);const i=o;return o=o.add(t),o=o.add(e),r=r.add(ye(o,44)),[o.add(s),r.add(i)]}function hl(n,t,e,s){return Iw(Ht(n,t),Ht(n,t+8),Ht(n,t+16),Ht(n,t+24),e,s)}function vw(n,t=n.length){if(t>=8){const e=Me.add(t*2),s=Ht(n,0).add(Me),o=Ht(n,t-8),r=ye(o,37).mul(e).add(s),i=ye(s,25).add(o).mul(e);return bs(r,i,e)}if(t>=4){const e=Me.add(t*2),s=mf(n,0);return bs(s.shl(3).add(t),mf(n,t-4),e)}if(t>0){const e=n[0],s=n[t>>1],o=n[t-1],r=e+(s<<8),i=t+(o<<2);return Gu(Me.mul(r).xor(pf.mul(i))).mul(Me)}return Me}function kw(n,t=n.length){const e=Me.add(t*2),s=Ht(n,0).mul(Ks),o=Ht(n,8),r=Ht(n,t-8).mul(e),i=Ht(n,t-16).mul(Me);return bs(ye(s.add(o),43).add(ye(r,30)).add(i),s.add(ye(o.add(Me),18)).add(r),e)}function Sw(n,t=n.length){const e=Me.add(t*2),s=Ht(n,0).mul(Me),o=Ht(n,8),r=Ht(n,t-8).mul(e),i=Ht(n,t-16).mul(Me),a=ye(s.add(o),43).add(ye(r,30)).add(i),l=bs(a,s.add(ye(o.add(Me),18)).add(r),e),c=Ht(n,16).mul(e),u=Ht(n,24),h=a.add(Ht(n,t-32)).mul(e),d=l.add(Ht(n,t-24)).mul(e);return bs(ye(c.add(u),43).add(ye(h,30)).add(d),c.add(ye(u.add(s),18)).add(h),e)}function Nw(n,t=n.length){const e=Xs.fromNumber(81,!0);if(t<=32)return t<=16?vw(n,t):kw(n,t);if(t<=64)return Sw(n,t);let s=e,o=e.mul(Ks).add(113),r=Gu(o.mul(Me).add(113)).mul(Me),i=[Xs.UZERO,Xs.UZERO],a=[Xs.UZERO,Xs.UZERO];s=s.mul(Me).add(Ht(n,0));let l=0;const c=(t-1>>6)*64,u=c+(t-1&63)-63;do s=ye(s.add(o).add(i[0]).add(Ht(n,l+8)),37).mul(Ks),o=ye(o.add(i[1]).add(Ht(n,l+48)),42).mul(Ks),s=s.xor(a[1]),o=o.add(i[0]).add(Ht(n,l+40)),r=ye(r.add(a[0]),33).mul(Ks),i=hl(n,l,i[1].mul(Ks),s.add(a[0])),a=hl(n,l+32,r.add(a[1]),o.add(Ht(n,l+16))),[r,s]=[s,r],l+=64;while(l!==c);const h=Ks.add(r.and(255).shl(1));return l=u,a[0]=a[0].add(t-1&63),i[0]=i[0].add(a[0]),a[0]=a[0].add(i[0]),s=ye(s.add(o).add(i[0]).add(Ht(n,l+8)),37).mul(h),o=ye(o.add(i[1]).add(Ht(n,l+48)),42).mul(h),s=s.xor(a[1].mul(9)),o=o.add(i[0].mul(9).add(Ht(n,l+40))),r=ye(r.add(a[0]),33).mul(h),i=hl(n,l,i[1].mul(h),s.add(a[0])),a=hl(n,l+32,r.add(a[1]),o.add(Ht(n,l+16))),[r,s]=[s,r],bs(bs(i[0],a[0],h).add(Gu(o).mul(pf)).add(r),bs(i[1],a[1],h).add(s),h)}function ys(n,t){return t==="string"?ws(n):js([n],t)}function Tw(n,t){return n instanceof Float32Array&&t==="float32"||n instanceof Int32Array&&t==="int32"||n instanceof Uint8Array&&t==="bool"}function js(n,t){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(n)&&(n=Ys(n)),U().getBool("DEBUG")&&sw(n,t),Tw(n,t))return n;if(t==null||t==="float32"||t==="complex64")return new Float32Array(n);if(t==="int32")return new Int32Array(n);if(t==="bool"){const e=new Uint8Array(n.length);for(let s=0;s<e.length;++s)Math.round(n[s])!==0&&(e[s]=1);return e}else throw new Error(`Unknown data type ${t}`)}function He(){return U().platform.now()}function ws(n,t="utf-8"){return t=t||"utf-8",U().platform.encode(n,t)}function Cs(n,t="utf-8"){return t=t||"utf-8",U().platform.decode(n,t)}function dn(n){return U().platform.isTypedArray!=null?U().platform.isTypedArray(n):cf(n)}function Ys(n,t=[],e=!1){if(t==null&&(t=[]),typeof n=="boolean"||typeof n=="number"||typeof n=="string"||Yc(n)||n==null||dn(n)&&e)t.push(n);else if(Array.isArray(n)||dn(n))for(let s=0;s<n.length;++s)Ys(n[s],t,e);else{let s=-1;for(const o of Object.keys(n))/^([1-9]+[0-9]*|0)$/.test(o)&&(s=Math.max(s,Number(o)));for(let o=0;o<=s;o++)Ys(n[o],t,e)}return t}class Ew{constructor(t,e){this.backendTimer=t,this.logger=e,e==null&&(this.logger=new Aw)}profileKernel(t,e,s){let o;const r=()=>{o=s()};let i;const a=He();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(r);else{r();for(const c of o)c.dataSync();i=Promise.resolve({kernelMs:He()-a})}if(U().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let c=0;c<o.length;c++){const u=o[c];u.data().then(h=>{Rw(h,u.dtype,t)})}return{kernelName:t,outputs:o,inputs:e,timeMs:i.then(c=>c.kernelMs),extraInfo:i.then(c=>c.getExtraProfileInfo!=null?c.getExtraProfileInfo():"")}}logKernelProfile(t){const{kernelName:e,outputs:s,timeMs:o,inputs:r,extraInfo:i}=t;s.forEach(a=>{Promise.all([a.data(),o,i]).then(l=>{this.logger.logKernelProfile(e,a,l[0],l[1],r,l[2])})})}}function Rw(n,t,e){if(t!=="float32")return!1;for(let s=0;s<n.length;s++){const o=n[s];if(isNaN(o)||!isFinite(o))return console.warn(`Found ${o} in the result of '${e}'`),!0}return!1}class Aw{logKernelProfile(t,e,s,o,r,i){const a=typeof o=="number"?Do(`${o}ms`,9):o.error,l=Do(t,25),c=e.rank,u=e.size,h=Do(e.shape.toString(),14);let d="";for(const p in r){const f=r[p];if(f!=null){const m=f.shape||e.shape,g=m.length;d+=`${p}: ${g}D ${g>0?m:""} `}}console.log(`%c${l}	%c${a}	%c${c}D ${h}	%c${u}	%c${d}	%c${i}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}function Dw(n,t,e){const s={},o={};for(let l=0;l<t.length;l++)s[t[l].id]=!0;for(let l=0;l<n.length;l++){const c=n[l],u=c.inputs;for(const h in u){const d=u[h];let p=!1;for(let f=0;f<t.length;f++)if(s[d.id]){c.outputs.forEach(m=>s[m.id]=!0),p=!0,o[c.id]=!0;break}if(p)break}}const r={};r[e.id]=!0;const i={};for(let l=n.length-1;l>=0;l--){const c=n[l],u=c.inputs;for(let h=0;h<c.outputs.length;h++)if(r[c.outputs[h].id]){for(const d in u)r[u[d].id]=!0,i[c.id]=!0;break}}const a=[];for(let l=0;l<n.length;l++){const c=n[l];if(o[c.id]&&i[c.id]){const u={};for(const d in c.inputs){const p=c.inputs[d];s[p.id]&&(u[d]=p)}const h=Object.assign({},c);h.inputs=u,h.outputs=c.outputs,a.push(h)}}return a}function Fw(n,t,e,s){for(let o=t.length-1;o>=0;o--){const r=t[o],i=[];if(r.outputs.forEach(l=>{const c=n[l.id];c!=null?i.push(c):i.push(null)}),r.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${r.kernelName}.`);const a=r.gradient(i);for(const l in r.inputs){if(!(l in a))throw new Error(`Cannot backprop through input ${l}. Available gradients found: ${Object.keys(a)}.`);const c=e(()=>a[l]());if(c.dtype!=="float32")throw new Error(`Error in gradient for op ${r.kernelName}. The gradient of input ${l} must have 'float32' dtype, but has '${c.dtype}'`);const u=r.inputs[l];if(!Lt(c.shape,u.shape))throw new Error(`Error in gradient for op ${r.kernelName}. The gradient of input '${l}' has shape '${c.shape}', which does not match the shape of the input '${u.shape}'`);if(n[u.id]==null)n[u.id]=c;else{const h=n[u.id];n[u.id]=s(h,c),h.dispose()}}}}const gf=20,hi=3,Hu=7;function _w(n,t,e,s){const o=dt(t),r=Ow(n,t,e,o),i=t.length,a=dl(n,t,e,o,r),l=["Tensor"];return s&&(l.push(`  dtype: ${e}`),l.push(`  rank: ${i}`),l.push(`  shape: [${t}]`),l.push("  values:")),l.push(a.map(c=>"    "+c).join(`
`)),l.join(`
`)}function Ow(n,t,e,s){const o=X(t),r=s[s.length-1],i=new Array(r).fill(0),a=t.length,l=e==="complex64"?pi(n):n;if(a>1)for(let c=0;c<o/r;c++){const u=c*r;for(let h=0;h<r;h++)i[h]=Math.max(i[h],di(l[u+h],0,e).length)}return i}function di(n,t,e){let s;return Array.isArray(n)?s=`${parseFloat(n[0].toFixed(Hu))} + ${parseFloat(n[1].toFixed(Hu))}j`:mr(n)?s=`'${n}'`:e==="bool"?s=xf(n):s=parseFloat(n.toFixed(Hu)).toString(),Do(s,t)}function xf(n){return n===0?"false":"true"}function dl(n,t,e,s,o,r=!0){const i=e==="complex64"?2:1,a=t[0],l=t.length;if(l===0){if(e==="complex64"){const m=pi(n);return[di(m[0],0,e)]}return e==="bool"?[xf(n[0])]:[n[0].toString()]}if(l===1){if(a>gf){const g=hi*i;let x=Array.from(n.slice(0,g)),b=Array.from(n.slice((a-hi)*i,a*i));return e==="complex64"&&(x=pi(x),b=pi(b)),["["+x.map((w,y)=>di(w,o[y],e)).join(", ")+", ..., "+b.map((w,y)=>di(w,o[a-hi+y],e)).join(", ")+"]"]}return["["+(e==="complex64"?pi(n):Array.from(n)).map((g,x)=>di(g,o[x],e)).join(", ")+"]"]}const c=t.slice(1),u=s.slice(1),h=s[0]*i,d=[];if(a>gf){for(let m=0;m<hi;m++){const g=m*h,x=g+h;d.push(...dl(n.slice(g,x),c,e,u,o,!1))}d.push("...");for(let m=a-hi;m<a;m++){const g=m*h,x=g+h;d.push(...dl(n.slice(g,x),c,e,u,o,m===a-1))}}else for(let m=0;m<a;m++){const g=m*h,x=g+h;d.push(...dl(n.slice(g,x),c,e,u,o,m===a-1))}const p=l===2?",":"";d[0]="["+(a>0?d[0]+p:"");for(let m=1;m<d.length-1;m++)d[m]=" "+d[m]+p;let f=`,
`;for(let m=2;m<l;m++)f+=`
`;return d[d.length-1]=" "+d[d.length-1]+"]"+(r?"":f),d}function pi(n){const t=[];for(let e=0;e<n.length;e+=2)t.push([n[e],n[e+1]]);return t}class ve{constructor(t,e,s){if(this.dtype=e,this.shape=t.slice(),this.size=X(t),s!=null){const o=s.length;k(o===this.size,()=>`Length of values '${o}' does not match the size inferred by the shape '${this.size}'.`)}if(e==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=s||ee(e,this.size),this.strides=dt(t)}set(t,...e){e.length===0&&(e=[0]),k(e.length===this.rank,()=>`The number of provided coordinates (${e.length}) must match the rank (${this.rank})`);const s=this.locToIndex(e);this.values[s]=t}get(...t){t.length===0&&(t=[0]);let e=0;for(const o of t){if(o<0||o>=this.shape[e]){const r=`Requested out of range element at ${t}.   Buffer shape=${this.shape}`;throw new Error(r)}e++}let s=t[t.length-1];for(let o=0;o<t.length-1;++o)s+=this.strides[o]*t[o];return this.values[s]}locToIndex(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];let e=t[t.length-1];for(let s=0;s<t.length-1;++s)e+=this.strides[s]*t[s];return e}indexToLoc(t){if(this.rank===0)return[];if(this.rank===1)return[t];const e=new Array(this.shape.length);for(let s=0;s<e.length-1;++s)e[s]=Math.floor(t/this.strides[s]),t-=e[s]*this.strides[s];return e[e.length-1]=t,e}get rank(){return this.shape.length}toTensor(){return En().makeTensor(this.values,this.shape,this.dtype)}}let En=null,Mo=null;function Lw(n){En=n}function Mw(n){Mo=n}class ue{constructor(t,e,s,o){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=e||"float32",this.size=X(t),this.strides=dt(t),this.dataId=s,this.id=o,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}buffer(){return Q(this,null,function*(){const t=yield this.data();return Mo.buffer(this.shape,this.dtype,t)})}bufferSync(){return Mo.buffer(this.shape,this.dtype,this.dataSync())}array(){return Q(this,null,function*(){const t=yield this.data();return Tn(this.shape,t,this.dtype==="complex64")})}arraySync(){return Tn(this.shape,this.dataSync(),this.dtype==="complex64")}data(){return Q(this,null,function*(){this.throwIfDisposed();const t=En().read(this.dataId);if(this.dtype==="string"){const e=yield t;try{return e.map(s=>Cs(s))}catch(s){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return t})}dataToGPU(t){return this.throwIfDisposed(),En().readToGPU(this.dataId,t)}dataSync(){this.throwIfDisposed();const t=En().readSync(this.dataId);if(this.dtype==="string")try{return t.map(e=>Cs(e))}catch(e){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t}bytes(){return Q(this,null,function*(){this.throwIfDisposed();const t=yield En().read(this.dataId);return this.dtype==="string"?t:new Uint8Array(t.buffer)})}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),En().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(t=!1){return Mo.print(this,t)}clone(){return this.throwIfDisposed(),Mo.clone(this)}toString(t=!1){const e=this.dataSync();return _w(e,this.shape,this.dtype,t)}cast(t){return this.throwIfDisposed(),Mo.cast(this,t)}variable(t=!0,e,s){return this.throwIfDisposed(),En().makeVariable(this,t,e,s)}}Object.defineProperty(ue,Symbol.hasInstance,{value:n=>!!n&&n.data!=null&&n.dataSync!=null&&n.throwIfDisposed!=null});function q(){return Qc("Tensor",()=>ue)}q();class pl extends ue{constructor(t,e,s,o){super(t.shape,t.dtype,t.dataId,o),this.trainable=e,this.name=s}assign(t){if(t.dtype!==this.dtype)throw new Error(`dtype of the new value (${t.dtype}) and previous value (${this.dtype}) must match`);if(!Lt(t.shape,this.shape))throw new Error(`shape of the new value (${t.shape}) and previous value (${this.shape}) must match`);En().disposeTensor(this),this.dataId=t.dataId,En().incRef(this,null)}dispose(){En().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(pl,Symbol.hasInstance,{value:n=>n instanceof ue&&n.assign!=null&&n.assign instanceof Function});var bf;(function(n){n.R0="R0",n.R1="R1",n.R2="R2",n.R3="R3",n.R4="R4",n.R5="R5",n.R6="R6"})(bf||(bf={}));var qu;(function(n){n.float32="float32",n.int32="int32",n.bool="int32",n.complex64="complex64"})(qu||(qu={}));var Xu;(function(n){n.float32="float32",n.int32="int32",n.bool="bool",n.complex64="complex64"})(Xu||(Xu={}));var Ku;(function(n){n.float32="float32",n.int32="float32",n.bool="float32",n.complex64="complex64"})(Ku||(Ku={}));var ju;(function(n){n.float32="complex64",n.int32="complex64",n.bool="complex64",n.complex64="complex64"})(ju||(ju={}));const Pw={float32:Ku,int32:qu,bool:Xu,complex64:ju};function Je(n,t){if(n==="string"||t==="string"){if(n==="string"&&t==="string")return"string";throw new Error(`Can not upcast ${n} with ${t}`)}return Pw[n][t]}function Yu(n){return Je(n,"int32")}function yf(n){return n!=null&&typeof n=="object"&&"texture"in n&&n.texture instanceof WebGLTexture}function wf(n){return typeof GPUBuffer!="undefined"&&n!=null&&typeof n=="object"&&"buffer"in n&&n.buffer instanceof GPUBuffer}function ne(n,t){if(n.dtype===t.dtype)return[n,t];const e=Je(n.dtype,t.dtype);return[n.cast(e),t.cast(e)]}function Cf(n){const t=[];return $f(n,t,new Set),t}function $f(n,t,e){if(n==null)return;if(n instanceof ue){t.push(n);return}if(!Bw(n))return;const s=n;for(const o in s){const r=s[o];e.has(r)||(e.add(r),$f(r,t,e))}}function Bw(n){return Array.isArray(n)||typeof n=="object"}function Zu(n){return n.kernelName!=null}class If{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(t=>t.name)))}}}dispose(){for(const t in this.registeredVariables)this.registeredVariables[t].dispose()}}class Po{constructor(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new If}ready(){return Q(this,null,function*(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;const t=this.getSortedBackends();for(let e=0;e<t.length;e++){const s=t[e];if(yield this.initializeBackend(s).success){yield this.setBackend(s);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")})}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){const{name:t,asyncInit:e}=this.initializeBackendsAndReturnBest();if(e)throw new Error(`The highest priority backend '${t}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(t)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(t){if(!(t in this.registry))if(t in this.registryFactory){const{asyncInit:e}=this.initializeBackend(t);if(e)return null}else return null;return this.registry[t]}findBackendFactory(t){return t in this.registryFactory?this.registryFactory[t].factory:null}registerBackend(t,e,s=1){return t in this.registryFactory?(on(`${t} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[t]={factory:e,priority:s},!0)}setBackend(t){return Q(this,null,function*(){if(this.registryFactory[t]==null)throw new Error(`Backend name '${t}' not found in registry`);if(this.backendName=t,this.registry[t]==null){this.backendInstance=null;const{success:e,asyncInit:s}=this.initializeBackend(t);if(!(s?yield e:e))return!1}return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new Ew(this.backendInstance),!0})}setupRegisteredKernels(){rf(this.backendName).forEach(e=>{e.setupFunc!=null&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(t){rf(t).forEach(s=>{s.disposeFunc!=null&&s.disposeFunc(this.registry[t])})}initializeBackend(t){const e=this.registryFactory[t];if(e==null)throw new Error(`Cannot initialize backend ${t}, no registration found.`);try{const s=e.factory();if(s&&!(s instanceof Ro)&&typeof s.then=="function"){const o=++this.pendingBackendInitId,r=s.then(i=>o<this.pendingBackendInitId?!1:(this.registry[t]=i,this.pendingBackendInit=null,!0)).catch(i=>(o<this.pendingBackendInitId||(this.pendingBackendInit=null,on(`Initialization of backend ${t} failed`),on(i.stack||i.message)),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}else return this.registry[t]=s,{success:!0,asyncInit:!1}}catch(s){return on(`Initialization of backend ${t} failed`),on(s.stack||s.message),{success:!1,asyncInit:!1}}}removeBackend(t){if(!(t in this.registryFactory))throw new Error(`${t} backend not found in registry`);this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((t,e)=>this.registryFactory[e].priority-this.registryFactory[t].priority)}initializeBackendsAndReturnBest(){const t=this.getSortedBackends();for(let e=0;e<t.length;e++){const s=t[e],{success:o,asyncInit:r}=this.initializeBackend(s);if(r||o)return{name:s,asyncInit:r}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(t,e){const s=this.state.tensorInfo.get(e),o=s.backend,r=this.readSync(e),i=o.refCount(e);o.disposeData(e,!0),s.backend=t,t.move(e,r,s.shape,s.dtype,i),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(t,e){let s=null;if(e==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");e=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof e!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");s=t}let o;return this.scopedRun(()=>this.startScope(s),()=>this.endScope(o),()=>(o=e(),o instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),o))}scopedRun(t,e,s){t();try{const o=s();return e(),o}catch(o){throw e(),o}}nextTensorId(){return Po.nextTensorId++}nextVariableId(){return Po.nextVariableId++}clone(t){const e=M.runKernel(Lr,{x:t}),s={x:t},o=i=>({x:()=>{const a="float32",l={x:i},c={dtype:a};return M.runKernel(Ir,l,c)}}),r=[];return this.addTapeNode(this.state.activeScope.name,s,[e],o,r,{}),e}runKernel(t,e,s){if(this.backendName==null&&this.backend,!(sf(t,this.backendName)!=null))throw new Error(`Kernel '${t}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:t,inputs:e,attrs:s})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(t,e,s){const o=this.backend.numDataIds();let r=0;s.forEach(l=>{r+=l.dtype==="complex64"?3:1});const i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],a=o-e-r-i;if(a>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${a} data ids) after running '${t}'`)}runKernelFunc(t){let e,s=[];const o=this.isTapeOn(),r=this.state.numBytes,i=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let a;this.backendName==null&&this.backend;let l;const c=Zu(t)?t.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(Zu(t)){const{kernelName:f,inputs:m,attrs:g}=t;this.backendName==null&&this.backend;const x=sf(f,this.backendName);k(x!=null,()=>`Cannot find registered kernel '${f}' for backend '${this.backendName}'`),a=()=>{const b=this.backend.numDataIds();l=x.kernelFunc({inputs:m,attrs:g,backend:this.backend});const w=Array.isArray(l)?l:[l];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(f,b,w);const y=w.map($=>$.rank!=null?$:this.makeTensorFromTensorInfo($));if(o){const $=this.getTensorsForGradient(f,m,y);s=this.saveTensorsForBackwardMode($)}return y}}else{const{forwardFunc:f}=t,m=g=>{o&&(s=g.map(x=>this.keep(this.clone(x))))};a=()=>{const g=this.backend.numDataIds();l=this.tidy(()=>f(this.backend,m));const x=Array.isArray(l)?l:[l];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,g,x),x}}const{inputs:u,attrs:h}=t,d=Zu(t)?null:t.backwardsFunc;let p;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?e=a():(p=this.profiler.profileKernel(c,u,()=>a()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(p),e=p.outputs)}),o&&this.addTapeNode(c,u,e,d,s,h),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-r,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-i,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(u).map(f=>u[f]!=null?u[f].shape:null),outputShapes:e.map(f=>f.shape),kernelTimeMs:p.timeMs,extraInfo:p.extraInfo}),Array.isArray(l)?e:e[0]}saveTensorsForBackwardMode(t){return t.map(s=>this.keep(this.clone(s)))}getTensorsForGradient(t,e,s){const o=of(t);if(o!=null){const r=o.inputsToSave||[],i=o.outputsToSave||[];let a;o.saveAllInputs?(k(Array.isArray(e),()=>"saveAllInputs is true, expected inputs to be an array."),a=Object.keys(e).map(c=>e[c])):a=r.map(c=>e[c]);const l=s.filter((c,u)=>i[u]);return a.concat(l)}return[]}makeTensor(t,e,s,o){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");s=s||"float32",o=o||this.backend;let r=t;s==="string"&&mr(t[0])&&(r=t.map(l=>ws(l)));const i=o.write(r,e,s),a=new ue(e,s,i,this.nextTensorId());if(this.trackTensor(a,o),s==="string"){const l=this.state.tensorInfo.get(i),c=rw(r);this.state.numBytes+=c-l.bytes,l.bytes=c}return a}makeTensorFromDataId(t,e,s,o){s=s||"float32";const r={dataId:t,shape:e,dtype:s};return this.makeTensorFromTensorInfo(r,o)}makeTensorFromTensorInfo(t,e){const{dataId:s,shape:o,dtype:r}=t,i=new ue(o,r,s,this.nextTensorId());return this.trackTensor(i,e),i}makeVariable(t,e=!0,s,o){s=s||this.nextVariableId().toString(),o!=null&&o!==t.dtype&&(t=t.cast(o));const r=new pl(t,e,s,this.nextTensorId());if(this.state.registeredVariables[r.name]!=null)throw new Error(`Variable with name ${r.name} was already registered`);return this.state.registeredVariables[r.name]=r,this.incRef(r,this.backend),r}trackTensor(t,e){this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++;let s=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(s=t.size*ia(t.dtype)),this.state.numBytes+=s,this.state.tensorInfo.has(t.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(t.dataId,{backend:e||this.backend,dtype:t.dtype,shape:t.shape,bytes:s})),t instanceof pl||this.track(t)}incRef(t,e){this.trackTensor(t,e),this.backend.incRef(t.dataId)}removeDataId(t,e){this.state.tensorInfo.has(t)&&this.state.tensorInfo.get(t).backend===e&&(this.state.tensorInfo.delete(t),this.state.numDataBuffers--)}disposeTensor(t){if(!this.state.tensorInfo.has(t.dataId))return;const e=this.state.tensorInfo.get(t.dataId);if(this.state.numTensors--,t.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=e.bytes),t.dtype!=="complex64"&&t.dtype!=="string"){const s=t.size*ia(t.dtype);this.state.numBytes-=s}e.backend.disposeData(t.dataId)&&this.removeDataId(t.dataId,e.backend)}disposeVariables(){for(const t in this.state.registeredVariables){const e=this.state.registeredVariables[t];this.disposeVariable(e)}}disposeVariable(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]}memory(){const t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t}profile(t){return Q(this,null,function*(){this.state.profiling=!0;const e=this.state.numBytes,s=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=yield t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(o=>o.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-e,this.state.activeProfile.newTensors=this.state.numTensors-s;for(const o of this.state.activeProfile.kernels)o.kernelTimeMs=yield o.kernelTimeMs,o.extraInfo=yield o.extraInfo;return this.state.activeProfile})}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(t,e,s,o,r,i){const a={id:this.state.nextTapeNodeId++,kernelName:t,inputs:e,outputs:s,saved:r},l=of(t);l!=null&&(o=l.gradFunc),o!=null&&(a.gradient=c=>(c=c.map((u,h)=>{if(u==null){const d=s[h],p=Ae(d.size,d.dtype);return this.makeTensor(p,d.shape,d.dtype)}return u}),o(c.length>1?c:c[0],r,i))),this.state.activeTape.push(a)}keep(t){return t.kept=!0,t}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(t){const e={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(e.name=t),this.state.scopeStack.push(e),this.state.activeScope=e}endScope(t){const e=Cf(t),s=new Set(e.map(r=>r.id));for(let r=0;r<this.state.activeScope.track.length;r++){const i=this.state.activeScope.track[r];!i.kept&&!s.has(i.id)&&i.dispose()}const o=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],e.forEach(r=>{!r.kept&&r.scopeId===o.id&&this.track(r)})}gradients(t,e,s,o=!1){if(k(e.length>0,()=>"gradients() received an empty list of xs."),s!=null&&s.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${s.dtype}'`);const r=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",t));k(r instanceof ue,()=>"The result y returned by f() must be a tensor.");const i=Dw(this.state.activeTape,e,r);if(!o&&i.length===0&&e.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const a={};a[r.id]=s==null?zw(r.shape):s,Fw(a,i,c=>this.tidy(c),Vw);const l=e.map(c=>a[c.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(c=>{for(const u of c.saved)u.dispose()}),this.state.activeTape=null),{value:r,grads:l}})}customGrad(t){return k(Xc(t),()=>"The f passed in customGrad(f) must be a function."),(...e)=>{k(e.every(a=>a instanceof ue),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let s;const o={};e.forEach((a,l)=>{o[l]=a});const r=(a,l)=>(s=t(...e,l),k(s.value instanceof ue,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),k(Xc(s.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),s.value),i=(a,l)=>{const c=s.gradFunc(a,l),u=Array.isArray(c)?c:[c];k(u.length===e.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),k(u.every(d=>d instanceof ue),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const h={};return u.forEach((d,p)=>{h[p]=()=>d}),h};return this.runKernelFunc({forwardFunc:r,backwardsFunc:i,inputs:o})}}readSync(t){return this.state.tensorInfo.get(t).backend.readSync(t)}read(t){return this.state.tensorInfo.get(t).backend.read(t)}readToGPU(t,e){return this.state.tensorInfo.get(t).backend.readToGPU(t,e)}time(t){return Q(this,null,function*(){const e=He(),s=yield this.backend.time(t);return s.wallMs=He()-e,s})}track(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new If;for(const t in this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}Po.nextTensorId=0,Po.nextVariableId=0;function zw(n){const t=jc(X(n),"float32");return M.makeTensor(t,n,"float32")}function vf(){const n=Op();if(n._tfengine==null){const t=new lw(n);n._tfengine=new Po(t)}return dw(n._tfengine.ENV),Lw(()=>n._tfengine),n._tfengine}const M=vf();function Vw(n,t){const e={a:n,b:t};return M.runKernel(Oo,e)}function Ww(){return typeof navigator!="undefined"&&navigator!=null}function kf(n){if(n||Ww()){if(n||(n=navigator),n.product==="ReactNative")return!0;const t=n.userAgent||n.vendor||(typeof window!="undefined"?window.opera:"");if(!t){const e=n;return e.userAgentData&&e.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function Sf(){return typeof window!="undefined"&&window.document!=null||typeof WorkerGlobalScope!="undefined"}const qe=U();qe.registerFlag("DEBUG",()=>!1,n=>{n&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),qe.registerFlag("IS_BROWSER",()=>Sf()),qe.registerFlag("IS_NODE",()=>typeof process!="undefined"&&typeof process.versions!="undefined"&&typeof process.versions.node!="undefined"),qe.registerFlag("IS_CHROME",()=>typeof navigator!="undefined"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),qe.registerFlag("IS_SAFARI",()=>typeof navigator!="undefined"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),qe.registerFlag("PROD",()=>!1),qe.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>qe.getBool("DEBUG")),qe.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0),qe.registerFlag("IS_TEST",()=>!1),qe.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>qe.getBool("DEBUG")),qe.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1),qe.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1),qe.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);function fl(n,t){let e=n;if(dn(n))return t==="string"?[]:[n.length];if(yf(n)){const o=n.channels||"RGBA";return[n.height,n.width*o.length]}else if(wf(n))return[n.buffer.size/(t==null?4:ia(t))];if(!Array.isArray(n))return[];const s=[];for(;Array.isArray(e)||dn(e)&&t!=="string";)s.push(e.length),e=e[0];return Array.isArray(n)&&U().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&Nf(n,s,[]),s}function Nf(n,t,e){if(e=e||[],!Array.isArray(n)&&!dn(n)){k(t.length===0,()=>`Element arr[${e.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}k(t.length>0,()=>`Element arr[${e.join("][")}] should be a primitive, but is an array of ${n.length} elements`),k(n.length===t[0],()=>`Element arr[${e.join("][")}] should have ${t[0]} elements, but has ${n.length} elements`);const s=t.slice(1);for(let o=0;o<n.length;++o)Nf(n[o],s,e.concat(o))}function Tf(n,t,e,s){if(n!=="string_or_numeric"){if(n==null)throw new Error("Expected dtype cannot be null.");if(n!=="numeric"&&n!==t||n==="numeric"&&t==="string")throw new Error(`Argument '${e}' passed to '${s}' must be ${n} tensor, but got ${t} tensor`)}}function A(n,t,e,s="numeric"){if(n instanceof q())return Tf(s,n.dtype,t,e),n;let o=Fo(n);if(o!=="string"&&["bool","int32","float32"].indexOf(s)>=0&&(o=s),Tf(s,o,t,e),n==null||!dn(n)&&!Array.isArray(n)&&typeof n!="number"&&typeof n!="boolean"&&typeof n!="string"){const l=n==null?"null":n.constructor.name;throw new Error(`Argument '${t}' passed to '${e}' must be a Tensor or TensorLike, but got '${l}'`)}const r=fl(n,o);!dn(n)&&!Array.isArray(n)&&(n=[n]);const a=o!=="string"?js(n,o):Ys(n,[],!0);return M.makeTensor(a,r,o)}function Ef(n,t,e,s="numeric"){if(!Array.isArray(n))throw new Error(`Argument ${t} passed to ${e} must be a \`Tensor[]\` or \`TensorLike[]\``);return n.map((r,i)=>A(r,`${t}[${i}]`,e,s))}const Uw="__op";function V(n){const t=Object.keys(n);if(t.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let e=t[0];const s=n[e];e.endsWith("_")&&(e=e.substring(0,e.length-1)),e=e+Uw;const o=(...r)=>{M.startScope(e);try{const i=s(...r);return Yc(i)&&console.error("Cannot return a Promise inside of tidy."),M.endScope(i),i}catch(i){throw M.endScope(null),i}};return Object.defineProperty(o,"name",{value:e,configurable:!0}),o}function Gw(n,t){const e=A(n,"real","complex"),s=A(t,"imag","complex");Gc(e.shape,s.shape,`real and imag shapes, ${e.shape} and ${s.shape}, must match in call to tf.complex().`);const o={real:e,imag:s};return M.runKernel(iu,o)}const Bo=V({complex_:Gw});function ml(n,t,e,s){if(s==null)s=Fo(n);else if(s==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(wf(n)||yf(n)){if(s!=="float32"&&s!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${s}.`);return M.backend.createTensorFromGPUData(n,t||e,s)}if(!dn(n)&&!Array.isArray(n)&&typeof n!="number"&&typeof n!="boolean"&&typeof n!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){rs(t);const o=X(t),r=X(e);k(o===r,()=>`Based on the provided shape, [${t}], the tensor should have ${o} values but has ${r}`);for(let i=0;i<e.length;++i){const a=e[i],l=i===e.length-1?a!==X(t.slice(i)):!0;k(e[i]===t[i]||!l,()=>`Error creating a new Tensor. Inferred shape (${e}) does not match the provided shape (${t}). `)}}return!dn(n)&&!Array.isArray(n)&&(n=[n]),t=t||e,n=s!=="string"?js(n,s):Ys(n,[],!0),M.makeTensor(n,t,s)}function gl(n,t,e){const s=fl(n,e);return ml(n,t,s,e)}class $s{static join(t){return new $s(t).slice()}constructor(t){if(this.shards=[],this.previousShardIndex=0,t==null||(t instanceof Array||(t=[t]),t=t.map(s=>dn(s)?s.buffer:s),t.length===0))return;this.bufferUniformSize=t[0].byteLength;let e=0;for(let s=0;s<t.length;s++){const o=t[s];s!==t.length-1&&o.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);const r=e+o.byteLength;this.shards.push({buffer:o,start:e,end:r}),e=r}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(t=0,e=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(t=isNaN(Number(t))?0:t,e=isNaN(Number(e))?0:e,t=Math.max(0,t),e=Math.min(this.byteLength,e),e<=t)return new ArrayBuffer(0);const s=this.findShardForByte(t);if(s===-1)throw new Error(`Could not find start shard for byte ${t}`);const o=e-t,r=new ArrayBuffer(o),i=new Uint8Array(r);let a=0;for(let l=s;l<this.shards.length;l++){const c=this.shards[l],h=t+a-c.start,d=a,f=Math.min(e,c.end)-c.start,m=new Uint8Array(c.buffer,h,f-h);if(i.set(m,d),a+=m.length,e<c.end)break}return r}findShardForByte(t){if(this.shards.length===0||t<0||t>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(t/this.bufferUniformSize),this.previousShardIndex;function e(o){return t<o.start?-1:t>=o.end?1:0}if(e(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;const s=Hw(this.shards,e);return s===-1?-1:(this.previousShardIndex=s,this.previousShardIndex)}}function Hw(n,t){let e=0,s=n.length;for(;e<=s;){const o=Math.floor((s-e)/2)+e,r=t(n[o]);if(r===0)return o;r<0?s=o:e=o+1}return-1}function rn(){return M}function Rf(){return M.memory()}function W(n,t){return M.tidy(n,t)}function kt(n){Cf(n).forEach(e=>e.dispose())}function Wn(n){return M.keep(n)}function Af(n){return M.setBackend(n)}function Df(n,t,e=1){return M.registerBackend(n,t,e)}function qw(){return M.backend}const Ff=4;function _f(n,t){return Q(this,null,function*(){const e=[],s=[],o=Array.isArray(n)?n.map(i=>i.name):Object.keys(n);for(let i=0;i<o.length;++i){const a=o[i],l=Array.isArray(n)?n[i].tensor:n[a];if(l.dtype!=="float32"&&l.dtype!=="int32"&&l.dtype!=="bool"&&l.dtype!=="string"&&l.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${a}': ${l.dtype}`);const c={name:a,shape:l.shape,dtype:l.dtype};if(l.dtype==="string"){const u=new Promise(h=>Q(null,null,function*(){const d=yield l.bytes(),p=d.reduce((g,x)=>g+x.length,0)+Ff*d.length,f=new Uint8Array(p);let m=0;for(let g=0;g<d.length;g++){const x=d[g],b=new Uint8Array(new Uint32Array([x.length]).buffer);f.set(b,m),m+=Ff,f.set(x,m),m+=x.length}h(f)}));s.push(u)}else s.push(l.data());t!=null&&(c.group=t),e.push(c)}const r=yield Promise.all(s);return{data:Xw(r),specs:e}})}function Xw(n){if(n===null)throw new Error(`Invalid input value: ${JSON.stringify(n)}`);let t=0;const e=[];n.forEach(r=>{if(t+=r.byteLength,e.push(r.byteLength===r.buffer.byteLength?r:new r.constructor(r)),!(r instanceof Float32Array||r instanceof Int32Array||r instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${r.constructor.name}`)});const s=new Uint8Array(t);let o=0;return e.forEach(r=>{s.set(new Uint8Array(r.buffer),o),o+=r.byteLength}),s.buffer}const Qu=typeof Buffer!="undefined"&&(typeof Blob=="undefined"||typeof atob=="undefined"||typeof btoa=="undefined");function Of(n){return Qu?Buffer.byteLength(n,"utf8"):new Blob([n]).size}function Kw(n){if(Qu)return Buffer.from(n).toString("base64");const t=new Uint8Array(n);let e="";for(let s=0,o=t.length;s<o;s++)e+=String.fromCharCode(t[s]);return btoa(e)}function jw(n){if(Qu){const s=Buffer.from(n,"base64");return s.buffer.slice(s.byteOffset,s.byteOffset+s.byteLength)}const t=atob(n),e=new Uint8Array(t.length);for(let s=0;s<t.length;++s)e.set([t.charCodeAt(s)],s);return e.buffer}function Yw(n){return $s.join(n)}function Lf(n,t){const e={modelTopology:n.modelTopology,format:n.format,generatedBy:n.generatedBy,convertedBy:n.convertedBy,weightsManifest:t};return n.signature!=null&&(e.signature=n.signature),n.userDefinedMetadata!=null&&(e.userDefinedMetadata=n.userDefinedMetadata),n.modelInitializer!=null&&(e.modelInitializer=n.modelInitializer),n.initializerSignature!=null&&(e.initializerSignature=n.initializerSignature),n.trainingConfig!=null&&(e.trainingConfig=n.trainingConfig),e}function Zw(n,t,e){const s={modelTopology:n.modelTopology,format:n.format,generatedBy:n.generatedBy,convertedBy:n.convertedBy};if(n.trainingConfig!=null&&(s.trainingConfig=n.trainingConfig),n.weightsManifest!=null){if(!t)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!e)throw new Error("modelJSON has weightsManifest but weightData is null");s.weightSpecs=t,s.weightData=e}return n.signature!=null&&(s.signature=n.signature),n.userDefinedMetadata!=null&&(s.userDefinedMetadata=n.userDefinedMetadata),n.modelInitializer!=null&&(s.modelInitializer=n.modelInitializer),n.initializerSignature!=null&&(s.initializerSignature=n.initializerSignature),s}function Qw(n,t){return Q(this,null,function*(){let e,s;return n.weightsManifest!=null&&([e,s]=yield t(n.weightsManifest)),Zw(n,e,s)})}function xl(n){if(n.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:n.modelTopology==null?0:Of(JSON.stringify(n.modelTopology)),weightSpecsBytes:n.weightSpecs==null?0:Of(JSON.stringify(n.weightSpecs)),weightDataBytes:n.weightData==null?0:new $s(n.weightData).byteLength}}function Mf(n){const t=[];for(const e of n)t.push(...e.weights);return t}class we{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return we.instance==null&&(we.instance=new we),we.instance}static registerSaveRouter(t){we.getInstance().saveRouters.push(t)}static registerLoadRouter(t){we.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return we.getHandlers(t,"save")}static getLoadHandlers(t,e){return we.getHandlers(t,"load",e)}static getHandlers(t,e,s){const o=[];return(e==="load"?we.getInstance().loadRouters:we.getInstance().saveRouters).forEach(i=>{const a=i(t,s);a!==null&&o.push(a)}),o}}const Jw=n=>we.getSaveHandlers(n);const Ju="tensorflowjs",th=1,Zs="models_store",Is="model_info_store";function Pf(){if(!U().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const n=typeof window=="undefined"?self:window,t=n.indexedDB||n.mozIndexedDB||n.webkitIndexedDB||n.msIndexedDB||n.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function eh(n){const t=n.result;t.createObjectStore(Zs,{keyPath:"modelPath"}),t.createObjectStore(Is,{keyPath:"modelPath"})}class Qs{constructor(t){if(this.indexedDB=Pf(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}save(t){return Q(this,null,function*(){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,t)})}load(){return Q(this,null,function*(){return this.databaseAction(this.modelPath)})}databaseAction(t,e){return new Promise((s,o)=>{const r=this.indexedDB.open(Ju,th);r.onupgradeneeded=()=>eh(r),r.onsuccess=()=>{const i=r.result;if(e==null){const a=i.transaction(Zs,"readonly"),c=a.objectStore(Zs).get(this.modelPath);c.onsuccess=()=>{if(c.result==null)return i.close(),o(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));s(c.result.modelArtifacts)},c.onerror=u=>(i.close(),o(c.error)),a.oncomplete=()=>i.close()}else{e.weightData=$s.join(e.weightData);const a=xl(e),l=i.transaction(Is,"readwrite");let c=l.objectStore(Is),u;try{u=c.put({modelPath:this.modelPath,modelArtifactsInfo:a})}catch(d){return o(d)}let h;u.onsuccess=()=>{h=i.transaction(Zs,"readwrite");const d=h.objectStore(Zs);let p;try{p=d.put({modelPath:this.modelPath,modelArtifacts:e,modelArtifactsInfo:a})}catch(f){return o(f)}p.onsuccess=()=>s({modelArtifactsInfo:a}),p.onerror=f=>{c=l.objectStore(Is);const m=c.delete(this.modelPath);m.onsuccess=()=>(i.close(),o(p.error)),m.onerror=g=>(i.close(),o(p.error))}},u.onerror=d=>(i.close(),o(u.error)),l.oncomplete=()=>{h==null?i.close():h.oncomplete=()=>i.close()}}},r.onerror=i=>o(r.error)})}}Qs.URL_SCHEME="indexeddb://";const Bf=n=>U().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(Qs.URL_SCHEME)?tC(n.slice(Qs.URL_SCHEME.length)):null;we.registerSaveRouter(Bf),we.registerLoadRouter(Bf);function tC(n){return new Qs(n)}function eC(n){return n.startsWith(Qs.URL_SCHEME)?n.slice(Qs.URL_SCHEME.length):n}class nC{constructor(){this.indexedDB=Pf()}listModels(){return Q(this,null,function*(){return new Promise((t,e)=>{const s=this.indexedDB.open(Ju,th);s.onupgradeneeded=()=>eh(s),s.onsuccess=()=>{const o=s.result,r=o.transaction(Is,"readonly"),a=r.objectStore(Is).getAll();a.onsuccess=()=>{const l={};for(const c of a.result)l[c.modelPath]=c.modelArtifactsInfo;t(l)},a.onerror=l=>(o.close(),e(a.error)),r.oncomplete=()=>o.close()},s.onerror=o=>e(s.error)})})}removeModel(t){return Q(this,null,function*(){return t=eC(t),new Promise((e,s)=>{const o=this.indexedDB.open(Ju,th);o.onupgradeneeded=()=>eh(o),o.onsuccess=()=>{const r=o.result,i=r.transaction(Is,"readwrite"),a=i.objectStore(Is),l=a.get(t);let c;l.onsuccess=()=>{if(l.result==null)return r.close(),s(new Error(`Cannot find model with path '${t}' in IndexedDB.`));{const u=a.delete(t),h=()=>{c=r.transaction(Zs,"readwrite");const p=c.objectStore(Zs).delete(t);p.onsuccess=()=>e(l.result.modelArtifactsInfo),p.onerror=f=>s(l.error)};u.onsuccess=h,u.onerror=d=>(h(),r.close(),s(l.error))}},l.onerror=u=>(r.close(),s(l.error)),i.oncomplete=()=>{c==null?r.close():c.oncomplete=()=>r.close()}},o.onerror=r=>s(o.error)})})}}const is="/",zo="tensorflowjs_models",zf="info",sC="model_topology",oC="weight_specs",rC="weight_data",iC="model_metadata";function Vf(n){return{info:[zo,n,zf].join(is),topology:[zo,n,sC].join(is),weightSpecs:[zo,n,oC].join(is),weightData:[zo,n,rC].join(is),modelMetadata:[zo,n,iC].join(is)}}function Wf(n){for(const t of Object.values(n))window.localStorage.removeItem(t)}function aC(n){const t=n.split(is);if(t.length<3)throw new Error(`Invalid key format: ${n}`);return t.slice(1,t.length-1).join(is)}function lC(n){return n.startsWith(Js.URL_SCHEME)?n.slice(Js.URL_SCHEME.length):n}class Js{constructor(t){if(!U().getBool("IS_BROWSER")||typeof window=="undefined"||typeof window.localStorage=="undefined")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=Vf(this.modelPath)}save(t){return Q(this,null,function*(){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const e=JSON.stringify(t.modelTopology),s=JSON.stringify(t.weightSpecs),o=xl(t),r=$s.join(t.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(o)),this.LS.setItem(this.keys.topology,e),this.LS.setItem(this.keys.weightSpecs,s),this.LS.setItem(this.keys.weightData,Kw(r));const i={format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,signature:t.signature!=null?t.signature:void 0,userDefinedMetadata:t.userDefinedMetadata!=null?t.userDefinedMetadata:void 0,modelInitializer:t.modelInitializer!=null?t.modelInitializer:void 0,initializerSignature:t.initializerSignature!=null?t.initializerSignature:void 0,trainingConfig:t.trainingConfig!=null?t.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(i)),{modelArtifactsInfo:o}}catch(i){throw Wf(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${o.modelTopologyBytes}, weightSpecsBytes=${o.weightSpecsBytes}, weightDataBytes=${o.weightDataBytes}.`)}}})}load(){return Q(this,null,function*(){const t=JSON.parse(this.LS.getItem(this.keys.info));if(t==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const e={},s=JSON.parse(this.LS.getItem(this.keys.topology));if(s==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);e.modelTopology=s;const o=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(o==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);e.weightSpecs=o;const r=this.LS.getItem(this.keys.modelMetadata);if(r!=null){const a=JSON.parse(r);e.format=a.format,e.generatedBy=a.generatedBy,e.convertedBy=a.convertedBy,a.signature!=null&&(e.signature=a.signature),a.userDefinedMetadata!=null&&(e.userDefinedMetadata=a.userDefinedMetadata),a.modelInitializer!=null&&(e.modelInitializer=a.modelInitializer),a.initializerSignature!=null&&(e.initializerSignature=a.initializerSignature),a.trainingConfig!=null&&(e.trainingConfig=a.trainingConfig)}const i=this.LS.getItem(this.keys.weightData);if(i==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return e.weightData=jw(i),e})}}Js.URL_SCHEME="localstorage://";const Uf=n=>U().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(Js.URL_SCHEME)?cC(n.slice(Js.URL_SCHEME.length)):null;we.registerSaveRouter(Uf),we.registerLoadRouter(Uf);function cC(n){return new Js(n)}class uC{constructor(){k(U().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),k(typeof window=="undefined"||typeof window.localStorage!="undefined",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}listModels(){return Q(this,null,function*(){const t={},e=zo+is,s=is+zf;for(let o=0;o<this.LS.length;++o){const r=this.LS.key(o);if(r.startsWith(e)&&r.endsWith(s)){const i=aC(r);t[i]=JSON.parse(this.LS.getItem(r))}}return t})}removeModel(t){return Q(this,null,function*(){t=lC(t);const e=Vf(t);if(this.LS.getItem(e.info)==null)throw new Error(`Cannot find model at path '${t}'`);const s=JSON.parse(this.LS.getItem(e.info));return Wf(e),s})}}const Gf="://";class Un{constructor(){this.managers={}}static getInstance(){return Un.instance==null&&(Un.instance=new Un),Un.instance}static registerManager(t,e){k(t!=null,()=>"scheme must not be undefined or null."),t.endsWith(Gf)&&(t=t.slice(0,t.indexOf(Gf))),k(t.length>0,()=>"scheme must not be an empty string.");const s=Un.getInstance();k(s.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),s.managers[t]=e}static getManager(t){const e=Un.getInstance().managers[t];if(e==null)throw new Error(`Cannot find model manager for scheme '${t}'`);return e}static getSchemes(){return Object.keys(Un.getInstance().managers)}}class hC{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(t,e){return fetch(t,e)}now(){return performance.now()}encode(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${e}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)}decode(t,e){return new TextDecoder(e).decode(t)}setTimeoutCustom(t,e){if(typeof window=="undefined"||!U().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(t,e);return}this.functionRefs.push(t),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},e),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",s=>{if(s.source===window&&s.data.name===this.messageName){s.stopPropagation();const o=this.functionRefs[s.data.index];o(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(t){return cf(t)}}if(U().get("IS_BROWSER")){U().setPlatform("browser",new hC);try{Un.registerManager(Js.URL_SCHEME,new uC)}catch(n){}try{Un.registerManager(Qs.URL_SCHEME,new nC)}catch(n){}}const dC={importFetch:()=>require("node-fetch")};let nh;class pC{constructor(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}fetch(t,e){return U().global.fetch!=null?U().global.fetch(t,e):(nh==null&&(nh=dC.importFetch()),nh(t,e))}now(){const t=process.hrtime();return t[0]*1e3+t[1]/1e6}encode(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${e}`);return this.textEncoder.encode(t)}decode(t,e){return t.length===0?"":new this.util.TextDecoder(e).decode(t)}isTypedArray(t){return this.util.types.isFloat32Array(t)||this.util.types.isInt32Array(t)||this.util.types.isUint8Array(t)||this.util.types.isUint8ClampedArray(t)}}U().get("IS_NODE")&&!U().get("IS_BROWSER")&&U().setPlatform("node",new pC);function It(n,t="float32",e){return t=t||"float32",rs(n),new ve(n,t,e)}function fC(n,t){const e=A(n,"x","cast");if(!ow(t))throw new Error(`Failed to cast to unknown dtype ${t}`);if(t==="string"&&e.dtype!=="string"||t!=="string"&&e.dtype==="string")throw new Error("Only strings can be casted to strings");const s={x:e},o={dtype:t};return M.runKernel(Ir,s,o)}const rt=V({cast_:fC});function mC(n){const e={x:A(n,"x","clone","string_or_numeric")};return M.runKernel(Lr,e)}const to=V({clone_:mC});function gC(n,t=!1){console.log(n.toString(t))}vf(),Mw({buffer:It,cast:rt,clone:to,print:gC});function xC(n,t){let e=A(n,"a","add"),s=A(t,"b","add");[e,s]=ne(e,s);const o={a:e,b:s};return M.runKernel(Oo,o)}const J=V({add_:xC});function bC(n,t){let e=A(n,"a","floorDiv"),s=A(t,"b","floorDiv");[e,s]=ne(e,s);const o={a:e,b:s};return M.runKernel(_r,o)}const Hf=V({floorDiv_:bC});function yC(n,t){let e=A(n,"a","div"),s=A(t,"b","div");if([e,s]=ne(e,s),e.dtype==="int32"&&s.dtype==="int32")return Hf(e,s);const o={a:e,b:s},r={};return M.runKernel(Tr,o,r)}const ft=V({div_:yC});function wC(n,t){let e=A(n,"a","mul"),s=A(t,"b","mul");[e,s]=ne(e,s);const o={a:e,b:s};return M.runKernel(Hr,o)}const L=V({mul_:wC});function CC(n){const t=A(n,"x","abs");if(t.dtype==="complex64"){const e={x:t};return M.runKernel(fa,e)}else{const e={x:t};return M.runKernel(aa,e)}}const Pe=V({abs_:CC});function $C(n){const e={x:A(n,"x","acos")};return M.runKernel(gr,e)}const IC=V({acos_:$C});function vC(n){const e={x:A(n,"x","acosh")};return M.runKernel(xr,e)}const kC=V({acosh_:vC});function SC(n,t=null,e=!1){const o={x:A(n,"x","all","bool")},r={axis:t,keepDims:e};return M.runKernel(tu,o,r)}const qf=V({all_:SC});function NC(n,t=null,e=!1){const o={x:A(n,"x","any","bool")},r={axis:t,keepDims:e};return M.runKernel(eu,o,r)}const sh=V({any_:NC});function TC(n,t=0){const s={x:A(n,"x","argMax")},o={axis:t};return M.runKernel(la,s,o)}const fi=V({argMax_:TC});function EC(n,t=0){const s={x:A(n,"x","argMin")},o={axis:t};return M.runKernel(ca,s,o)}const RC=V({argMin_:EC});function AC(n){const e={x:A(n,"x","asin")};return M.runKernel(br,e)}const DC=V({asin_:AC});function FC(n){const e={x:A(n,"x","asinh")};return M.runKernel(yr,e)}const _C=V({asinh_:FC});function OC(n){const e={x:A(n,"x","atan")};return M.runKernel(wr,e)}const LC=V({atan_:OC});function MC(n,t){let e=A(n,"a","atan2"),s=A(t,"b","atan2");[e,s]=ne(e,s);const o={a:e,b:s};return M.runKernel($r,o)}const PC=V({atan2_:MC});function BC(n){const e={x:A(n,"x","atanh")};return M.runKernel(Cr,e)}const zC=V({atanh_:BC});function mi(n,t,e,s,o="NHWC",r){const i=n[3],a=[...t,i],l=ls(o);return ke(n,a,e,r,s,null,null,l)}function pn(n,t,e,s,o,r,i="channelsLast"){const[a,l]=gi(t);let c;if(i==="channelsLast")c=[a,l,n[3],n[3]];else if(i==="channelsFirst")c=[a,l,n[1],n[1]];else throw new Error(`Unknown dataFormat ${i}`);return ke(n,c,e,s,o,r,!1,i)}function as(n,t,e,s,o,r,i="NDHWC"){const[a,l,c]=rh(t);let u,h;if(i==="NDHWC")h="channelsLast",u=[a,l,c,n[4],n[4]];else if(i==="NCDHW")h="channelsFirst",u=[a,l,c,n[1],n[1]];else throw new Error(`Unknown dataFormat ${i}`);return vs(n,u,e,s,o,!1,h,r)}function ke(n,t,e,s,o,r,i=!1,a="channelsLast"){let[l,c,u,h]=[-1,-1,-1,-1];if(a==="channelsLast")[l,c,u,h]=n;else if(a==="channelsFirst")[l,h,c,u]=n;else throw new Error(`Unknown dataFormat ${a}`);const[d,p,,f]=t,[m,g]=gi(e),[x,b]=gi(s),w=Vo(d,x),y=Vo(p,b),{padInfo:$,outHeight:I,outWidth:v}=UC(o,c,u,m,g,w,y,r,a),T=i?f*h:f;let S;return a==="channelsFirst"?S=[l,T,I,v]:a==="channelsLast"&&(S=[l,I,v,T]),{batchSize:l,dataFormat:a,inHeight:c,inWidth:u,inChannels:h,outHeight:I,outWidth:v,outChannels:T,padInfo:$,strideHeight:m,strideWidth:g,filterHeight:d,filterWidth:p,effectiveFilterHeight:w,effectiveFilterWidth:y,dilationHeight:x,dilationWidth:b,inShape:n,outShape:S,filterShape:t}}function vs(n,t,e,s,o,r=!1,i="channelsLast",a){let[l,c,u,h,d]=[-1,-1,-1,-1,-1];if(i==="channelsLast")[l,c,u,h,d]=n;else if(i==="channelsFirst")[l,d,c,u,h]=n;else throw new Error(`Unknown dataFormat ${i}`);const[p,f,m,,g]=t,[x,b,w]=rh(e),[y,$,I]=rh(s),v=Vo(p,y),T=Vo(f,$),S=Vo(m,I),{padInfo:N,outDepth:C,outHeight:E,outWidth:R}=GC(o,c,u,h,x,b,w,v,T,S,a),D=r?g*d:g;let F;return i==="channelsFirst"?F=[l,D,C,E,R]:i==="channelsLast"&&(F=[l,C,E,R,D]),{batchSize:l,dataFormat:i,inDepth:c,inHeight:u,inWidth:h,inChannels:d,outDepth:C,outHeight:E,outWidth:R,outChannels:D,padInfo:N,strideDepth:x,strideHeight:b,strideWidth:w,filterDepth:p,filterHeight:f,filterWidth:m,effectiveFilterDepth:v,effectiveFilterHeight:T,effectiveFilterWidth:S,dilationDepth:y,dilationHeight:$,dilationWidth:I,inShape:n,outShape:F,filterShape:t}}function VC(n,t,e,s,o){s==null&&(s=oh(n,t,e));const r=n[0],i=n[1],a=xi((r-t+2*s)/e+1,o),l=xi((i-t+2*s)/e+1,o);return[a,l]}function WC(n,t,e,s,o,r){o==null&&(o=oh(n,t[0],s[0]));const i=[0,0,0,e];for(let a=0;a<3;a++)n[a]+2*o>=t[a]&&(i[a]=xi((n[a]-t[a]+2*o)/s[a]+1,r));return i}function oh(n,t,e,s=1){const o=Vo(t,s);return Math.floor((n[0]*(e-1)-e+o)/2)}function gi(n){return typeof n=="number"?[n,n,n]:n.length===2?[n[0],n[1],1]:n}function rh(n){return typeof n=="number"?[n,n,n]:n}function Vo(n,t){return t<=1?n:n+(n-1)*(t-1)}function UC(n,t,e,s,o,r,i,a,l){let c,u,h;if(typeof n=="number"){c={top:n,bottom:n,left:n,right:n,type:n===0?"VALID":"NUMBER"};const p=VC([t,e],r,s,n,a);u=p[0],h=p[1]}else if(n==="same"){u=Math.ceil(t/s),h=Math.ceil(e/o);const d=Math.max(0,(u-1)*s+r-t),p=Math.max(0,(h-1)*o+i-e),f=Math.floor(d/2),m=d-f,g=Math.floor(p/2),x=p-g;c={top:f,bottom:m,left:g,right:x,type:"SAME"}}else if(n==="valid")c={top:0,bottom:0,left:0,right:0,type:"VALID"},u=Math.ceil((t-r+1)/s),h=Math.ceil((e-i+1)/o);else if(typeof n=="object"){const d=l==="channelsLast"?n[1][0]:n[2][0],p=l==="channelsLast"?n[1][1]:n[2][1],f=l==="channelsLast"?n[2][0]:n[3][0],m=l==="channelsLast"?n[2][1]:n[3][1];c={top:d,bottom:p,left:f,right:m,type:d===0&&p===0&&f===0&&m===0?"VALID":"EXPLICIT"},u=xi((t-r+d+p)/s+1,a),h=xi((e-i+f+m)/o+1,a)}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:c,outHeight:u,outWidth:h}}function GC(n,t,e,s,o,r,i,a,l,c,u){let h,d,p,f;if(n==="valid"&&(n=0),typeof n=="number"){h={top:n,bottom:n,left:n,right:n,front:n,back:n,type:n===0?"VALID":"NUMBER"};const g=WC([t,e,s,1],[a,l,c],1,[o,r,i],n,u);d=g[0],p=g[1],f=g[2]}else if(n==="same"){d=Math.ceil(t/o),p=Math.ceil(e/r),f=Math.ceil(s/i);const m=(d-1)*o+a-t,g=(p-1)*r+l-e,x=(f-1)*i+c-s,b=Math.floor(m/2),w=m-b,y=Math.floor(g/2),$=g-y,I=Math.floor(x/2),v=x-I;h={top:y,bottom:$,left:I,right:v,front:b,back:w,type:"SAME"}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:h,outDepth:d,outHeight:p,outWidth:f}}function xi(n,t){if(!t)return Math.trunc(n);switch(t){case"round":return Math.round(n);case"ceil":return Math.ceil(n);case"floor":return Math.floor(n);default:throw new Error(`Unknown roundingMode ${t}`)}}function eo(n){const[t,e,s]=gi(n);return t===1&&e===1&&s===1}function De(n,t){return eo(n)||eo(t)}function no(n){return gi(n).every(t=>t>0)}function ls(n){if(n==="NHWC")return"channelsLast";if(n==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${n}`)}function Xe(n,t,e){if(e!=null){if(typeof t=="string")throw Error(`Error in ${n}: pad must be an integer when using dimRoundingMode ${e} but got pad ${t}.`);if(typeof t=="number")k(Ao(t),()=>`Error in ${n}: pad must be an integer when using dimRoundingMode ${e} but got pad ${t}.`);else if(typeof t=="object")t.forEach(s=>{s.forEach(o=>{k(Ao(o),()=>`Error in ${n}: pad must be an integer when using dimRoundingMode ${e} but got pad ${o}.`)})});else throw Error(`Error in ${n}: Unknown padding parameter: ${t}`)}}function HC(n,t){const s={x:A(n,"x","reshape","string_or_numeric")},o={shape:t};return M.runKernel(Ka,s,o)}const z=V({reshape_:HC});function qC(n,t,e,s,o){const r=A(n,"x","avgPool","float32"),i=1;k(De(e,i),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${e} and dilations '${i}'`);let a=r,l=!1;r.rank===3&&(l=!0,a=z(r,[1,r.shape[0],r.shape[1],r.shape[2]])),k(a.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${a.rank}.`),Xe("avgPool",s,o);const c={x:a},u={filterSize:t,strides:e,pad:s,dimRoundingMode:o};let h=M.runKernel(ua,c,u);return h=rt(h,r.dtype),l?z(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const ih=V({avgPool_:qC});function XC(n,t,e,s,o,r="NDHWC"){const i=A(n,"x","avgPool3d","float32");let a=i,l=!1;i.rank===4&&(l=!0,a=z(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),k(a.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${a.rank}.`),k(r==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${r}`),k(typeof e=="number"&&e>0||Array.isArray(e)&&e[0]>0&&e[1]>0&&e[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${e}'`),Xe("avgPool3d",s,o);const c={x:a},u={filterSize:t,strides:e,pad:s,dimRoundingMode:o,dataFormat:r};let h=M.runKernel(ha,c,u);return h=rt(h,a.dtype),l?z(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}const KC=V({avgPool3d_:XC});function jC(n,t=0){k(n.length>=1,()=>"Pass at least one tensor to concat");const e=Ef(n,"tensors","concat","string_or_numeric");if(e[0].dtype==="complex64"&&e.forEach(r=>{if(r.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${r.dtype}. `)}),e.length===1)return to(e[0]);const s=e,o={axis:t};return M.runKernel(ma,s,o)}const Ke=V({concat_:jC});function YC(n,t,e=!1,s=!1){let o=A(n,"a","matMul"),r=A(t,"b","matMul");[o,r]=ne(o,r);const i={a:o,b:r},a={transposeA:e,transposeB:s};return M.runKernel(da,i,a)}const Mt=V({matMul_:YC});function ZC(n){const e={x:A(n,"x","sigmoid","float32")};return M.runKernel(ni,e)}const Wo=V({sigmoid_:ZC});function QC(n,t,e){const s=A(n,"x","slice","string_or_numeric");if(s.rank===0)throw new Error("Slicing scalar is not possible");const o={x:s},r={begin:t,size:e};return M.runKernel(Ja,o,r)}const qt=V({slice_:QC});function JC(n){const e={x:A(n,"x","tanh","float32")};return M.runKernel(li,e)}const bl=V({tanh_:JC});function t$(n,t,e){const s=A(n,"x","batchToSpaceND"),o=t.reduce((a,l)=>a*l);k(s.rank>=1+t.length,()=>`input rank is ${s.rank} but should be > than blockShape.length ${t.length}`),k(e.length===t.length,()=>`crops.length is ${e.length} but should be equal to blockShape.length  ${t.length}`),k(s.shape[0]%o===0,()=>`input tensor batch is ${s.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${o}`);const r={x:s},i={blockShape:t,crops:e};return M.runKernel(pa,r,i)}const ah=V({batchToSpaceND_:t$});function e$(n){let t;return n.rank===0||n.rank===1?t=z(n,[1,1,1,n.size]):n.rank===2?t=z(n,[1,1,n.shape[0],n.shape[1]]):n.rank===3?t=z(n,[1,n.shape[0],n.shape[1],n.shape[2]]):t=n,t}function n$(n,t,e,s,o,r){r==null&&(r=.001);const i=A(n,"x","batchNorm"),a=A(t,"mean","batchNorm"),l=A(e,"variance","batchNorm");let c;o!=null&&(c=A(o,"scale","batchNorm"));let u;s!=null&&(u=A(s,"offset","batchNorm")),k(a.rank===l.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),k(u==null||a.rank===u.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),k(c==null||a.rank===c.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");const d={x:e$(i),scale:c,offset:u,mean:a,variance:l},p={varianceEpsilon:r},f=M.runKernel(va,d,p);return z(f,i.shape)}const yl=V({batchNorm_:n$});function s$(n,t,e,s,o,r){const i=A(n,"x","batchNorm"),a=A(t,"mean","batchNorm"),l=A(e,"variance","batchNorm");let c;o!=null&&(c=A(o,"scale","batchNorm"));let u;return s!=null&&(u=A(s,"offset","batchNorm")),k(i.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${i.rank}.`),k(a.rank===2||a.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${a.rank}.`),k(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${l.rank}.`),c!=null&&k(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${c.rank}.`),u!=null&&k(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),yl(i,a,l,u,c,r)}const o$=V({batchNorm2d_:s$});function r$(n,t,e,s,o,r){const i=A(n,"x","batchNorm"),a=A(t,"mean","batchNorm"),l=A(e,"variance","batchNorm");let c;o!=null&&(c=A(o,"scale","batchNorm"));let u;return s!=null&&(u=A(s,"offset","batchNorm")),k(i.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${i.rank}.`),k(a.rank===3||a.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${a.rank}.`),k(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${l.rank}.`),c!=null&&k(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${c.rank}.`),u!=null&&k(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),yl(i,a,l,u,c,r)}const i$=V({batchNorm3d_:r$});function a$(n,t,e,s,o,r){const i=A(n,"x","batchNorm"),a=A(t,"mean","batchNorm"),l=A(e,"variance","batchNorm");let c;o!=null&&(c=A(o,"scale","batchNorm"));let u;return s!=null&&(u=A(s,"offset","batchNorm")),k(i.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${i.rank}.`),k(a.rank===4||a.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${a.rank}.`),k(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${l.rank}.`),c!=null&&k(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${c.rank}.`),u!=null&&k(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),yl(i,a,l,u,c,r)}const l$=V({batchNorm4d_:a$});function c$(n,t,e){const s=A(n,"x","bincount"),o=A(t,"weights","bincount");k(s.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${s.dtype}`),k(e>=0,()=>`size must be non-negative, but got ${e}.`),k(o.size===s.size||o.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${s.shape}, weights shape: ${o.shape}.`);const r={x:s,weights:o},i={size:e};return M.runKernel(ou,r,i)}const u$=V({bincount_:c$});function h$(n,t){let e=A(n,"broadcastTo","x");const s=e.shape;if(rs(t),t.length<e.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${e.rank}.`);if(t.length>e.rank){const c=e.shape.slice();for(;c.length<t.length;)c.unshift(1);e=z(e,c)}const o=e.shape,r=Array.from(t);for(let c=t.length-1;c>=0;c--)if(o[c]===t[c])r[c]=1;else if(e.shape[c]!==1)throw new Error(`broadcastTo(): [${s}] cannot be broadcast to [${t}].`);if(r.map((c,u)=>c>1?u:-1).filter(c=>c>=0).length===0)return to(e);const a={x:e},l={reps:r};return M.runKernel(ci,a,l)}const bi=V({broadcastTo_:h$});function d$(n){const e={x:A(n,"x","ceil","float32")};return M.runKernel(vr,e)}const p$=V({ceil_:d$});function wl(n,t,e){rs(n),e=e||Fo(t);const s={shape:n,value:t,dtype:e};return M.runKernel(Cu,{},s)}function f$(n,t,e){const s=A(n,"x","clipByValue");if(k(t<=e,()=>`Error in clip: min (${t}) must be less than or equal to max (${e}).`),t===e)return wl(s.shape,t,s.dtype);const o={x:s},r={clipValueMin:t,clipValueMax:e};return M.runKernel(kr,o,r)}const an=V({clipByValue_:f$});function m$(n){return Ke(n,0)}const g$=V({concat1d_:m$});function x$(n,t){return Ke(n,t)}const b$=V({concat2d_:x$});function y$(n,t){return Ke(n,t)}const w$=V({concat3d_:y$});function C$(n,t){return Ke(n,t)}const $$=V({concat4d_:C$});function I$(n,t,e,s,o="NHWC",r=[1,1],i){const a=A(n,"x","conv2d","float32"),l=A(t,"filter","conv2d","float32");let c=a,u=!1;a.rank===3&&(u=!0,c=z(a,[1,a.shape[0],a.shape[1],a.shape[2]])),k(c.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${c.rank}.`),k(l.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${l.rank}.`),Xe("conv2d",s,i);const h=o==="NHWC"?c.shape[3]:c.shape[1];k(h===l.shape[2],()=>`Error in conv2d: depth of input (${h}) must match input depth for filter ${l.shape[2]}.`),k(De(e,r),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${e} and dilations '${r}'`),k(no(r),()=>"Error in conv2D: Dilated rates should be larger than 0."),k(no(e),()=>"Error in conv2D: Strides should be larger than 0.");const d={x:c,filter:l},p={strides:e,pad:s,dataFormat:o,dilations:r,dimRoundingMode:i},f=M.runKernel(ga,d,p);return u?z(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const so=V({conv2d_:I$});function v$(n,t,e,s,o="NWC",r=1,i){const a=A(n,"x","conv1d"),l=A(t,"filter","conv1d");let c=a,u=!1;a.rank===2&&(u=!0,c=z(a,[1,a.shape[0],a.shape[1]])),k(c.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${c.rank}.`),k(l.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${l.rank}.`),Xe("conv1d",s,i),k(c.shape[2]===l.shape[1],()=>`Error in conv1d: depth of input (${c.shape[2]}) must match input depth for filter ${l.shape[1]}.`),k(De(e,r),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${e} and dilation '${r}'`),k(no(r),()=>"Error in conv1D: Dilated rates should be larger than 0."),k(no(e),()=>"Error in conv1D: Stride should be larger than 0."),k(o==="NWC",()=>`Error in conv1d: got dataFormat of ${o} but only NWC is currently supported.`);const h=z(l,[1,l.shape[0],l.shape[1],l.shape[2]]),d=z(c,[c.shape[0],1,c.shape[1],c.shape[2]]),g=so(d,h,[1,e],s,"NHWC",[1,r],i);return u?z(g,[g.shape[2],g.shape[3]]):z(g,[g.shape[0],g.shape[2],g.shape[3]])}const Xf=V({conv1d_:v$});function k$(n,t,e,s,o,r="NHWC",i){k(n.length===t.rank,()=>`Length of inShape (${n.length}) and rank of dy (${t.rank}) must match`);let a=n,l=t,c=!1;t.rank===3&&(c=!0,l=z(t,[1,t.shape[0],t.shape[1],t.shape[2]]),a=[1,n[0],n[1],n[2]]),k(a.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${a.length}.`),k(l.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${l.rank}`),k(e.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${e.rank}`);const u=r==="NHWC"?a[3]:a[1],h=r==="NHWC"?l.shape[3]:l.shape[1];k(u===e.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${e.shape[2]}.`),k(h===e.shape[3],()=>`Error in conv2dDerInput: depth of output (${h}) must match output depth for filter ${e.shape[3]}.`),Xe("conv2dDerInput",o,i);const d={dy:l,filter:e},p={strides:s,pad:o,dataFormat:r,dimRoundingMode:i,inputShape:a},f=M.runKernel(xa,d,p);return c?z(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const lh=V({conv2DBackpropInput_:k$});function S$(n,t,e,s,o,r){const i=A(n,"x","conv2dTranspose"),a=A(t,"filter","conv2dTranspose");return lh(e,i,a,s,o,"NHWC",r)}const Kf=V({conv2dTranspose_:S$});function N$(n,t,e,s,o="NDHWC",r=[1,1,1]){const i=A(n,"x","conv3d"),a=A(t,"filter","conv3d");let l=i,c=!1;i.rank===4&&(c=!0,l=z(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),k(l.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${l.rank}.`),k(a.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${a.rank}.`),k(l.shape[4]===a.shape[3],()=>`Error in conv3d: depth of input (${l.shape[4]}) must match input depth for filter ${a.shape[3]}.`),k(De(e,r),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${e} and dilations '${r}'`),k(o==="NDHWC",()=>`Error in conv3d: got dataFormat of ${o} but only NDHWC is currently supported.`),k(no(r),()=>"Error in conv3D: Dilated rates should be larger than 0."),k(no(e),()=>"Error in conv3D: Strides should be larger than 0.");const u={x:l,filter:a},h={strides:e,pad:s,dataFormat:o,dilations:r},d=M.runKernel(ba,u,h);return c?z(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}const T$=V({conv3d_:N$});function E$(n,t,e,s,o){k(n.length===t.rank,()=>`Length of inShape (${n.length}) and rank of dy (${t.rank}) must match`);let r=n,i=t,a=!1;t.rank===4&&(a=!0,i=z(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),r=[1,n[0],n[1],n[2],n[3]]);const l=r[4],c=i.shape[4];k(r.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${r.length}.`),k(i.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${i.rank}`),k(e.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${e.rank}`),k(l===e.shape[3],()=>`Error in conv3dDerInput: depth of input (${l}) must match input depth for filter ${e.shape[3]}.`),k(c===e.shape[4],()=>`Error in conv3dDerInput: depth of output (${c}) must match output depth for filter ${e.shape[4]}.`);const u={dy:i,filter:e},h={pad:o,strides:s,inputShape:r},d=M.runKernel(cu,u,h);return a?z(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}const jf=V({conv3DBackpropInput_:E$});function R$(n,t,e,s,o){const r=A(n,"x","conv3dTranspose"),i=A(t,"filter","conv3dTranspose");return jf(e,r,i,s,o)}const A$=V({conv3dTranspose_:R$});function D$(n){const e={x:A(n,"x","cos","float32")};return M.runKernel(Sr,e)}const ch=V({cos_:D$});function F$(n){const e={x:A(n,"x","cosh","float32")};return M.runKernel(Nr,e)}const Yf=V({cosh_:F$});function _$(n,t=0,e=!1,s=!1){const r={x:A(n,"x","cumprod")},i={axis:t,exclusive:e,reverse:s};return M.runKernel(uu,r,i)}const uh=V({cumprod_:_$});function O$(n,t=0,e=!1,s=!1){const r={x:A(n,"x","cumsum")},i={axis:t,exclusive:e,reverse:s};return M.runKernel(ya,r,i)}const Zf=V({cumsum_:O$});function L$(n,t,e,s=!1){const o=A(n,"x","denseBincount"),r=A(t,"weights","denseBincount");k(o.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${o.dtype}`),k(o.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${o.rank}.`),k(e>=0,()=>`size must be non-negative, but got ${e}.`),k(r.size===o.size||r.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${o.shape}, weights shape: ${r.shape}.`);const i={x:o,weights:r},a={size:e,binaryOutput:s};return M.runKernel(du,i,a)}const Qf=V({denseBincount_:L$});function M$(n,t,e="NHWC"){const s=A(n,"x","depthToSpace","float32"),o=e==="NHWC"?s.shape[1]:s.shape[2],r=e==="NHWC"?s.shape[2]:s.shape[3],i=e==="NHWC"?s.shape[3]:s.shape[1];k(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),k(o*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${o} and ${t}  for depthToSpace with input shape
    ${s.shape}`),k(r*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${r} and ${t} for depthToSpace with input shape
        ${s.shape}`),k(i%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${i} for depthToSpace with input shape ${s.shape}`);const a={x:s},l={blockSize:t,dataFormat:e};return M.runKernel(pu,a,l)}const P$=V({depthToSpace_:M$});function B$(n,t,e,s,o="NHWC",r=[1,1],i){const a=A(n,"x","depthwiseConv2d","float32"),l=A(t,"filter","depthwiseConv2d","float32");let c=a,u=!1;a.rank===3&&(u=!0,c=z(a,[1,a.shape[0],a.shape[1],a.shape[2]])),k(c.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${c.rank}.`),k(l.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${l.rank}.`);const h=o==="NHWC"?c.shape[3]:c.shape[1];k(h===l.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${h}) must match the inChannels dimension in filter ${l.shape[2]}.`),Xe("depthwiseConv2d",s,i);const d={x:c,filter:l},p={strides:e,pad:s,dataFormat:o,dilations:r,dimRoundingMode:i},f=M.runKernel(wa,d,p);return u?z(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const hh=V({depthwiseConv2d_:B$});function z$(n,t,e,s,o=[1,1],r="NHWC"){const i=A(n,"x","dilation2d"),a=A(t,"filter","dilation2d");k(i.rank===3||i.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${i.rank}.`),k(a.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${a.rank}.`),k(r==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${r}`);let l=i,c=!1;i.rank===3&&(l=z(i,[1,i.shape[0],i.shape[1],i.shape[2]]),c=!0),k(l.shape[3]===a.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${l.shape[3]} vs ${a.shape[2]}`);const u={x:l,filter:a},h={strides:e,pad:s,dilations:o},d=M.runKernel(Ca,u,h);return c?z(d,[d.shape[1],d.shape[2],d.shape[3]]):d}const V$=V({dilation2d_:z$});function Uo(n,t){const e=n.length,s=[];for(let o=0;o<e;o++){const r=e-1-o,i=n[r]||1;(t[t.length-1-o]||1)>1&&i===1&&s.unshift(r)}return s}function he(n,t){const e=[];for(let s=0;s<t.length;s++){const o=n[n.length-s-1],r=t.length-s-1,i=t[r];(o==null||o===1&&i>1)&&e.unshift(r)}return e}function yt(n,t){const e=Math.max(n.length,t.length),s=new Array(e);for(let o=0;o<e;o++){let r=n[n.length-o-1];r==null&&(r=1);let i=t[t.length-o-1];if(i==null&&(i=1),r===1)s[e-o-1]=i;else if(i===1)s[e-o-1]=r;else if(r!==i){const a=`Operands could not be broadcast together with shapes ${n} and ${t}.`;throw Error(a)}else s[e-o-1]=r}return s}function W$(n,t){let e=A(n,"a","equal","string_or_numeric"),s=A(t,"b","equal","string_or_numeric");[e,s]=ne(e,s),yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel($a,o)}const Gn=V({equal_:W$});function U$(n,t,e){const s=A(t,"a","where"),o=A(e,"b","where"),r=A(n,"condition","where","bool"),i=yt(yt(r.shape,s.shape),o.shape),a=bi(r,i),l=bi(s,i),c=bi(o,i),u={condition:a,t:l,e:c};return M.runKernel(Qa,u)}const Be=V({where_:U$});function G$(n){const e={x:A(n,"x","zerosLike")};return M.runKernel(il,e)}const Tt=V({zerosLike_:G$});function H$(n,t){let e=A(n,"a","div"),s=A(t,"b","div");[e,s]=ne(e,s);const o=ft(e,s),r=Tt(o),i=Gn(s,r);return Be(i,r,o)}const q$=V({divNoNan_:H$});function X$(n,t){const e=A(n,"t1","dot"),s=A(t,"t2","dot");k((e.rank===1||e.rank===2)&&(s.rank===1||s.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${e.rank} and ${s.rank}.`);const o=e.rank===1?e.size:e.shape[1],r=s.rank===1?s.size:s.shape[0];if(k(o===r,()=>`Error in dot: inner dimensions of inputs must match, but got ${o} and ${r}.`),e.rank===1&&s.rank===1){const i=z(e,[1,-1]),a=z(s,[-1,1]),l=Mt(i,a);return z(l,[])}else if(e.rank===1&&s.rank===2){const i=z(e,[1,-1]),a=z(s,[s.shape[0],s.shape[1]]),l=Mt(i,a);return z(l,[l.size])}else if(e.rank===2&&s.rank===1){const i=z(s,[-1,1]),a=Mt(e,i);return z(a,[a.size])}else{const i=z(s,[s.shape[0],s.shape[1]]);return Mt(e,i)}}const K$=V({dot_:X$});function j$(n,...t){const e=t.map((o,r)=>A(o,`tensors${r}`,"einsum")),s={equation:n};return M.runKernel(bu,e,s)}const yi=V({einsum_:j$});function Y$(n){const e={x:A(n,"x","elu","float32")};return M.runKernel(Er,e)}const Cl=V({elu_:Y$});function Z$(n){let t=A(n,"x","erf");k(t.dtype==="int32"||t.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),t.dtype==="int32"&&(t=rt(t,"float32"));const e={x:t};return M.runKernel(Rr,e)}const Jf=V({erf_:Z$});function dh(n,t){for(let e=0;e<n.length;++e)if(n[n.length-e-1]!==t-1-e)return!1;return!0}function tm(n,t,e){const s=n.length+t.length,o=[];let r=0,i=0;for(let a=0;a<s;a++)e.indexOf(a)===-1?o.push(n[r++]):o.push(t[i++]);return o}function Ce(n,t){const e=[],s=n.length;for(let r=0;r<s;r++)t.indexOf(r)===-1&&e.push(n[r]);const o=t.map(r=>n[r]);return[e,o]}function le(n,t){const e=t.map(s=>1);return tm(n,e,t)}function Se(n,t,e){k(dh(t,e),()=>`${n} supports only inner-most axes for now. Got axes ${t} and rank-${e} input.`)}function Qt(n,t){if(dh(n,t))return null;const e=[];for(let s=0;s<t;++s)n.indexOf(s)===-1&&e.push(s);return n.forEach(s=>e.push(s)),e}function ks(n){return n.map((t,e)=>[e,t]).sort((t,e)=>t[1]-e[1]).map(t=>t[0])}function se(n,t){const e=[];for(let s=t-n;s<t;++s)e.push(s);return e}function Q$(n,t=null,e=!1){const o={x:A(n,"x","max")},r={reductionIndices:t,keepDims:e};return M.runKernel(_a,o,r)}const Rn=V({max_:Q$});function J$(n,t=null,e=!1){const o={x:A(n,"x","min")},r={axis:t,keepDims:e};return M.runKernel(Pa,o,r)}const $l=V({min_:J$});function tI(n,t){let e=A(n,"base","pow"),s=A(t,"exp","pow");[e,s]=ne(e,s);const o={a:e,b:s};return M.runKernel(qr,o)}const oo=V({pow_:tI});function Pt(n,t){if((dn(n)&&t!=="string"||Array.isArray(n))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&dn(n)&&!(n instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return ml(n,[],[],t)}function eI(n){const e={x:A(n,"x","sqrt","float32")};return M.runKernel(oi,e)}const Fe=V({sqrt_:eI});function nI(n){const t=A(n,"x","square"),e={};return M.runKernel("Square",{x:t},e)}const jt=V({square_:nI});function sI(n,t=null,e=!1){let s=A(n,"x","sum");s.dtype==="bool"&&(s=rt(s,"int32"));const o={x:s},r={axis:t,keepDims:e};return M.runKernel(tl,o,r)}const pt=V({sum_:sI});function oI(n,t="euclidean",e=null,s=!1){n=A(n,"x","norm");const o=em(n,t,e);let r=o.shape;if(s){const i=$t(e,n.shape);r=le(o.shape,i)}return z(o,r)}function em(n,t,e=null){if(n.rank===0)return Pe(n);if(n.rank!==1&&e===null)return em(z(n,[-1]),t,e);if(n.rank===1||typeof e=="number"||Array.isArray(e)&&e.length===1){if(t===1)return pt(Pe(n),e);if(t===1/0)return Rn(Pe(n),e);if(t===-1/0)return $l(Pe(n),e);if(t==="euclidean"||t===2)return Fe(pt(oo(Pe(n),Pt(2,"int32")),e));throw new Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(e)&&e.length===2){if(t===1)return Rn(pt(Pe(n),e[0]),e[1]-1);if(t===1/0)return Rn(pt(Pe(n),e[1]),e[0]);if(t===-1/0)return $l(pt(Pe(n),e[1]),e[0]);if(t==="fro"||t==="euclidean")return Fe(pt(jt(n),e));throw new Error(`Error in norm: invalid ord value: ${t}`)}throw new Error(`Error in norm: invalid axis: ${e}`)}const Il=V({norm_:oI});function rI(n,t=null,e=!1){return Il(n,"euclidean",t,e)}const iI=V({euclideanNorm_:rI});function aI(n){const e={x:A(n,"x","exp")};return M.runKernel(Ar,e)}const Hn=V({exp_:aI});function lI(n,t=0){const e=A(n,"x","expandDims","string_or_numeric");k(t<=e.rank,()=>"Axis must be <= rank of the tensor");const s={input:e},o={dim:t};return M.runKernel(Ia,s,o)}const je=V({expandDims_:lI});function cI(n){const e={x:A(n,"x","expm1")};return M.runKernel(Dr,e)}const uI=V({expm1_:cI});function hI(n,t){const e=A(n,"x","tile","string_or_numeric");k(e.rank===t.length,()=>`Error in transpose: rank of input ${e.rank} must match length of reps ${t}.`);const s={x:e},o={reps:t};return M.runKernel(ci,s,o)}const An=V({tile_:hI});function dI(n,t,e,s="float32"){t==null&&(t=n);const o=It([n,t],s),r=n<=t?n:t;for(let a=0;a<r;++a)o.set(1,a,a);const i=z(o.toTensor(),[n,t]);if(e==null)return i;if(e.length===1)return An(je(i,0),[e[0],1,1]);if(e.length===2)return An(je(je(i,0),0),[e[0],e[1],1,1]);if(e.length===3)return An(je(je(je(i,0),0),0),[e[0],e[1],e[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${e.length}D.`)}const nm=V({eye_:dI});function pI(n){const e={x:A(n,"x","floor","float32")};return M.runKernel(Fr,e)}const vl=V({floor_:pI});function fI(n,t,e=0,s=0){const o=A(n,"x","gather"),r=A(t,"indices","gather","int32"),i={x:o,indices:r},a={axis:e,batchDims:s};return M.runKernel(ka,i,a)}const ph=V({gather_:fI});function mI(n,t){let e=A(n,"a","greater","string_or_numeric"),s=A(t,"b","greater","string_or_numeric");[e,s]=ne(e,s),yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Sa,o)}const ln=V({greater_:mI});function gI(n,t){let e=A(n,"a","greaterEqual","string_or_numeric"),s=A(t,"b","greaterEqual","string_or_numeric");[e,s]=ne(e,s),yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Or,o)}const ro=V({greaterEqual_:gI});function xI(n){const e={input:A(n,"input","imag")};return M.runKernel(vu,e)}const fh=V({imag_:xI});function bI(n){const e={x:A(n,"x","isFinite")};return M.runKernel(Mr,e)}const yI=V({isFinite_:bI});function wI(n){const e={x:A(n,"x","isInf")};return M.runKernel(Pr,e)}const CI=V({isInf_:wI});function $I(n){const e={x:A(n,"x","isNaN")};return M.runKernel(Br,e)}const II=V({isNaN_:$I});function vI(n,t=.2){const s={x:A(n,"x","leakyRelu")},o={alpha:t};return M.runKernel(Na,s,o)}const mh=V({leakyRelu_:vI});function kI(n,t){let e=A(n,"a","less","string_or_numeric"),s=A(t,"b","less","string_or_numeric");[e,s]=ne(e,s),yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Ta,o)}const kl=V({less_:kI});function SI(n,t){let e=A(n,"a","lessEqual","string_or_numeric"),s=A(t,"b","lessEqual","string_or_numeric");[e,s]=ne(e,s),yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Ea,o)}const Go=V({lessEqual_:SI});function NI(n,t=5,e=1,s=1,o=.5){const r=A(n,"x","localResponseNormalization");k(r.rank===4||r.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${r.rank}.`),k(Ao(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let i=r,a=!1;r.rank===3&&(a=!0,i=z(r,[1,r.shape[0],r.shape[1],r.shape[2]]));const l={x:i},c={depthRadius:t,bias:e,alpha:s,beta:o},u=M.runKernel(Fa,l,c);return a?z(u,[u.shape[1],u.shape[2],u.shape[3]]):u}const TI=V({localResponseNormalization_:NI});function EI(n){const e={x:A(n,"x","log","float32")};return M.runKernel(zr,e)}const qn=V({log_:EI});function RI(n){const e={x:A(n,"x","log1p")};return M.runKernel(Vr,e)}const sm=V({log1p_:RI});function AI(n,t){k(Xc(n),()=>"The f passed in variableGrads(f) must be a function"),k(t==null||Array.isArray(t)&&t.every(c=>c instanceof pl),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");const e=t!=null;if(!e){t=[];for(const c in M.registeredVariables)t.push(M.registeredVariables[c])}const s=e?t.filter(c=>!c.trainable):null,o=t.length;t=t.filter(c=>c.trainable),k(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${o} variables is trainable.`);const r=!0,{value:i,grads:a}=M.gradients(n,t,null,r);k(a.some(c=>c!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),k(i.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${i.rank} tensor`);const l={};return t.forEach((c,u)=>{a[u]!=null&&(l[c.name]=a[u])}),s!=null&&s.forEach(c=>l[c.name]=null),{value:i,grads:l}}function Ho(n){return M.customGrad(n)}function DI(n){const e={x:A(n,"x","neg")};return M.runKernel(za,e)}const oe=V({neg_:DI});function FI(n){const e={x:A(n,"x","softplus")};return M.runKernel(si,e)}const wi=V({softplus_:FI});function _I(n){const t=A(n,"x","logSigmoid");return Ho(s=>({value:oe(wi(oe(s))),gradFunc:i=>L(i,Wo(oe(s)))}))(t)}const OI=V({logSigmoid_:_I});function LI(n,t){let e=A(n,"a","sub"),s=A(t,"b","sub");[e,s]=ne(e,s);const o={a:e,b:s};return M.runKernel(ii,o)}const gt=V({sub_:LI});function MI(n,t=-1){const e=A(n,"logits","logSoftmax");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${e.rank} and axis was ${t}`);return Ho((o,r)=>{const a=Rn(o,t,!0),l=gt(o,a),c=gt(rt(l,"float32"),qn(pt(Hn(l),t,!0)));return r([c]),{value:c,gradFunc:(h,d)=>{const[p]=d,f=!0,m=Hn(p);return gt(h,L(pt(h,t,f),m))}}})(e)}const om=V({logSoftmax_:MI});function PI(n,t=null,e=!1){const s=A(n,"x","logSumExp"),o=$t(t,s.shape),r=Rn(s,o,!0),i=gt(s,r),a=Hn(i),l=pt(a,o),c=qn(l),u=J(z(r,c.shape),c);if(e){const h=le(u.shape,o);return z(u,h)}return u}const rm=V({logSumExp_:PI});function BI(n,t){const e=A(n,"a","logicalAnd","bool"),s=A(t,"b","logicalAnd","bool");yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Ra,o)}const cs=V({logicalAnd_:BI});function zI(n){const e={x:A(n,"x","logicalNot","bool")};return M.runKernel(Aa,e)}const gh=V({logicalNot_:zI});function VI(n,t){const e=A(n,"a","logicalOr","bool"),s=A(t,"b","logicalOr","bool");yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Da,o)}const im=V({logicalOr_:VI});function WI(n,t){const e=A(n,"a","logicalXor","bool"),s=A(t,"b","logicalXor","bool");return yt(e.shape,s.shape),cs(im(n,t),gh(cs(n,t)))}const UI=V({logicalXor_:WI});function GI(n,t,e,s,o){const r=A(n,"x","maxPool"),i=1;let a=r,l=!1;r.rank===3&&(l=!0,a=z(r,[1,r.shape[0],r.shape[1],r.shape[2]])),k(a.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${a.rank}.`),k(De(e,i),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${e} and dilations '${i}'`),Xe("maxPool",s,o);const c={x:a},u={filterSize:t,strides:e,pad:s,dimRoundingMode:o},h=M.runKernel(Oa,c,u);return l?z(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const xh=V({maxPool_:GI});function HI(n,t=[1,1,1],e,s,o,r="NDHWC"){const i=A(n,"x","maxPool3d");let a=i,l=!1;i.rank===4&&(l=!0,a=z(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),k(a.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${a.rank}.`),k(r==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${r}`),Xe("maxPool3d",s,o);const c={x:a},u={filterSize:t,strides:e,pad:s,dimRoundingMode:o,dataFormat:r},h=M.runKernel(La,c,u);return l?z(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}const qI=V({maxPool3d_:HI});function XI(n,t){let e=A(n,"a","maximum"),s=A(t,"b","maximum");[e,s]=ne(e,s),e.dtype==="bool"&&(e=rt(e,"int32"),s=rt(s,"int32")),yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Wr,o)}const Ss=V({maximum_:XI});function KI(n,t=null,e=!1){const o={x:A(n,"x","mean")},r={axis:t,keepDims:e};return M.runKernel(Ma,o,r)}const ce=V({mean_:KI});function $e(n,t="float32"){if(rs(n),t==="complex64"){const s=$e(n,"float32"),o=$e(n,"float32");return Bo(s,o)}const e=Ae(X(n),t);return M.makeTensor(e,n,t)}function Ns(n,t="float32"){if(rs(n),t==="complex64"){const s=Ns(n,"float32"),o=$e(n,"float32");return Bo(s,o)}const e=jc(X(n),t);return M.makeTensor(e,n,t)}function jI(n,t){let e=A(n,"a","minimum"),s=A(t,"b","minimum");[e,s]=ne(e,s),e.dtype==="bool"&&(e=rt(e,"int32"),s=rt(s,"int32")),yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Ur,o)}const Ci=V({minimum_:jI});function YI(n,t,e){k(e==="reflect"||e==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${e}.`);const s=A(n,"x","mirrorPad");if(s.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");k(t.length===s.rank,()=>`Padding doesn't match input. Must be ${s.rank}. Got ${t.length}.`);const o=e==="reflect"?1:0;for(let a=0;a<s.rank;a++)k(t[a].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),k(t[a][0]>=0&&t[a][0]<=s.shape[a]-o&&t[a][1]>=0&&t[a][1]<=s.shape[a]-o,()=>`Padding in dimension ${a} cannot be greater than or equal to ${s.shape[a]-o} or less than 0 for input of shape ${s.shape}`);const r={paddings:t,mode:e},i={x:s};return M.runKernel(Ba,i,r)}const ZI=V({mirrorPad_:YI});function QI(n,t){let e=A(n,"a","mod"),s=A(t,"b","mod");[e,s]=ne(e,s);const o={a:e,b:s};return M.runKernel(Gr,o)}const JI=V({mod_:QI});function tv(n,t=null,e=!1){n=A(n,"x","moments");const s=$t(t,n.shape),o=ce(n,s,e);let r=o.shape;e||(r=le(o.shape,s));const i=jt(gt(rt(n,"float32"),z(o,r))),a=ce(i,s,e);return{mean:o,variance:a}}const bh=V({moments_:tv});function ev(n,t){let e=A(n,"a","notEqual","string_or_numeric"),s=A(t,"b","notEqual","string_or_numeric");[e,s]=ne(e,s),yt(e.shape,s.shape);const o={a:e,b:s};return M.runKernel(Va,o)}const Sl=V({notEqual_:ev});function nv(n,t,e=1,s=0,o="int32"){if(t<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${t}`);const i={indices:A(n,"indices","oneHot","int32")},a={dtype:o,depth:t,onValue:e,offValue:s};return M.runKernel(Ua,i,a)}const am=V({oneHot_:nv});function sv(n){const e={x:A(n,"x","onesLike")};return M.runKernel(Wa,e)}const fn=V({onesLike_:sv});function ov(n,t,e=0){const s=A(n,"x","pad");if(s.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");const o={paddings:t,constantValue:e},r={x:s};return M.runKernel(Ha,r,o)}const yh=V({pad_:ov});function rv(n,t,e){const s=A(n,"x","spaceToBatchND");k(s.rank>=1+t.length,()=>`input rank ${s.rank} should be > than [blockShape] ${t.length}`),k(e.length===t.length,()=>`paddings.shape[0] ${e.length} must be equal to [blockShape] ${t.length}`),k(s.shape.reduce((i,a,l)=>l>0&&l<=t.length?i&&(a+e[l-1][0]+e[l-1][1])%t[l-1]===0:i,!0),()=>`input spatial dimensions ${s.shape.slice(1)} with paddings ${e.toString()} must be divisible by blockShapes ${t.toString()}`);const o={x:s},r={blockShape:t,paddings:e};return M.runKernel(el,o,r)}const wh=V({spaceToBatchND_:rv});function iv(n,t,e,s,o,r,i){o==null&&(o=[1,1]),r==null&&(r=1),s===0&&(s="valid");const a=A(n,"x","maxPool");let l=a,c=!1;a.rank===3&&(c=!0,l=z(a,[1,a.shape[0],a.shape[1],a.shape[2]])),k(De(r,o),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${r} and dilations '${o}'`);const u=pn(l.shape,t,r,o,s),h=[u.dilationHeight,u.dilationWidth];let d;s==="same"?d=lv([u.filterHeight,u.filterWidth],h):d=[[0,0],[0,0]];const p=h[0]===1&&h[1]===1,[f,m]=av([u.inHeight,u.inWidth],h,d),g=p?s:"valid",x=p?l:wh(l,h,f),w=(e==="avg"?()=>ih(x,t,r,g,i):()=>xh(x,t,r,g,i))(),y=p?w:ah(w,h,m);return c?z(y,[y.shape[1],y.shape[2],y.shape[3]]):y}function av(n,t,e){const s=e.map(u=>u[0]),o=e.map(u=>u[1]),r=n.concat(s,o),i=t.map((u,h)=>(u-r[h]%u)%u),a=o.map((u,h)=>u+i[h]),l=t.map((u,h)=>[s[h],a[h]]),c=t.map((u,h)=>[0,i[h]]);return[l,c]}function lv(n,t){const s=n.map((i,a)=>i+(i-1)*(t[a]-1)).map(i=>i-1),o=s.map(i=>Math.floor(i/2)),r=s.map((i,a)=>i-o[a]);return s.map((i,a)=>[o[a],r[a]])}const cv=V({pool_:iv});function uv(n,t){const e=A(n,"x","prelu"),s=A(t,"alpha","prelu"),o={x:e,alpha:s};return M.runKernel(qa,o)}const Ch=V({prelu_:uv});function hv(n,t=null,e=!1){let s=A(n,"x","prod");s.dtype==="bool"&&(s=rt(s,"int32"));const o={x:s},r={axis:t,keepDims:e};return M.runKernel(Xa,o,r)}const dv=V({prod_:hv});var Nl={exports:{}},pv=Nl.exports,lm;function fv(){return lm||(lm=1,(function(n){(function(t,e,s){function o(l){var c=this,u=a();c.next=function(){var h=2091639*c.s0+c.c*23283064365386963e-26;return c.s0=c.s1,c.s1=c.s2,c.s2=h-(c.c=h|0)},c.c=1,c.s0=u(" "),c.s1=u(" "),c.s2=u(" "),c.s0-=u(l),c.s0<0&&(c.s0+=1),c.s1-=u(l),c.s1<0&&(c.s1+=1),c.s2-=u(l),c.s2<0&&(c.s2+=1),u=null}function r(l,c){return c.c=l.c,c.s0=l.s0,c.s1=l.s1,c.s2=l.s2,c}function i(l,c){var u=new o(l),h=c&&c.state,d=u.next;return d.int32=function(){return u.next()*4294967296|0},d.double=function(){return d()+(d()*2097152|0)*11102230246251565e-32},d.quick=d,h&&(typeof h=="object"&&r(h,u),d.state=function(){return r(u,{})}),d}function a(){var l=4022871197,c=function(u){u=String(u);for(var h=0;h<u.length;h++){l+=u.charCodeAt(h);var d=.02519603282416938*l;l=d>>>0,d-=l,d*=l,l=d>>>0,d-=l,l+=d*4294967296}return(l>>>0)*23283064365386963e-26};return c}e&&e.exports?e.exports=i:this.alea=i})(pv,n)})(Nl)),Nl.exports}var Tl={exports:{}},mv=Tl.exports,cm;function gv(){return cm||(cm=1,(function(n){(function(t,e,s){function o(a){var l=this,c="";l.x=0,l.y=0,l.z=0,l.w=0,l.next=function(){var h=l.x^l.x<<11;return l.x=l.y,l.y=l.z,l.z=l.w,l.w^=l.w>>>19^h^h>>>8},a===(a|0)?l.x=a:c+=a;for(var u=0;u<c.length+64;u++)l.x^=c.charCodeAt(u)|0,l.next()}function r(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l}function i(a,l){var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(typeof u=="object"&&r(u,c),h.state=function(){return r(c,{})}),h}e&&e.exports?e.exports=i:this.xor128=i})(mv,n)})(Tl)),Tl.exports}var El={exports:{}},xv=El.exports,um;function bv(){return um||(um=1,(function(n){(function(t,e,s){function o(a){var l=this,c="";l.next=function(){var h=l.x^l.x>>>2;return l.x=l.y,l.y=l.z,l.z=l.w,l.w=l.v,(l.d=l.d+362437|0)+(l.v=l.v^l.v<<4^(h^h<<1))|0},l.x=0,l.y=0,l.z=0,l.w=0,l.v=0,a===(a|0)?l.x=a:c+=a;for(var u=0;u<c.length+64;u++)l.x^=c.charCodeAt(u)|0,u==c.length&&(l.d=l.x<<10^l.x>>>4),l.next()}function r(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l.v=a.v,l.d=a.d,l}function i(a,l){var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(typeof u=="object"&&r(u,c),h.state=function(){return r(c,{})}),h}e&&e.exports?e.exports=i:this.xorwow=i})(xv,n)})(El)),El.exports}var Rl={exports:{}},yv=Rl.exports,hm;function wv(){return hm||(hm=1,(function(n){(function(t,e,s){function o(a){var l=this;l.next=function(){var u=l.x,h=l.i,d,p;return d=u[h],d^=d>>>7,p=d^d<<24,d=u[h+1&7],p^=d^d>>>10,d=u[h+3&7],p^=d^d>>>3,d=u[h+4&7],p^=d^d<<7,d=u[h+7&7],d=d^d<<13,p^=d^d<<9,u[h]=p,l.i=h+1&7,p};function c(u,h){var d,p=[];if(h===(h|0))p[0]=h;else for(h=""+h,d=0;d<h.length;++d)p[d&7]=p[d&7]<<15^h.charCodeAt(d)+p[d+1&7]<<13;for(;p.length<8;)p.push(0);for(d=0;d<8&&p[d]===0;++d);for(d==8?p[7]=-1:p[d],u.x=p,u.i=0,d=256;d>0;--d)u.next()}c(l,a)}function r(a,l){return l.x=a.x.slice(),l.i=a.i,l}function i(a,l){a==null&&(a=+new Date);var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(u.x&&r(u,c),h.state=function(){return r(c,{})}),h}e&&e.exports?e.exports=i:this.xorshift7=i})(yv,n)})(Rl)),Rl.exports}var Al={exports:{}},Cv=Al.exports,dm;function $v(){return dm||(dm=1,(function(n){(function(t,e,s){function o(a){var l=this;l.next=function(){var u=l.w,h=l.X,d=l.i,p,f;return l.w=u=u+1640531527|0,f=h[d+34&127],p=h[d=d+1&127],f^=f<<13,p^=p<<17,f^=f>>>15,p^=p>>>12,f=h[d]=f^p,l.i=d,f+(u^u>>>16)|0};function c(u,h){var d,p,f,m,g,x=[],b=128;for(h===(h|0)?(p=h,h=null):(h=h+"\0",p=0,b=Math.max(b,h.length)),f=0,m=-32;m<b;++m)h&&(p^=h.charCodeAt((m+32)%h.length)),m===0&&(g=p),p^=p<<10,p^=p>>>15,p^=p<<4,p^=p>>>13,m>=0&&(g=g+1640531527|0,d=x[m&127]^=p+g,f=d==0?f+1:0);for(f>=128&&(x[(h&&h.length||0)&127]=-1),f=127,m=512;m>0;--m)p=x[f+34&127],d=x[f=f+1&127],p^=p<<13,d^=d<<17,p^=p>>>15,d^=d>>>12,x[f]=p^d;u.w=g,u.X=x,u.i=f}c(l,a)}function r(a,l){return l.i=a.i,l.w=a.w,l.X=a.X.slice(),l}function i(a,l){a==null&&(a=+new Date);var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(u.X&&r(u,c),h.state=function(){return r(c,{})}),h}e&&e.exports?e.exports=i:this.xor4096=i})(Cv,n)})(Al)),Al.exports}var Dl={exports:{}},Iv=Dl.exports,pm;function vv(){return pm||(pm=1,(function(n){(function(t,e,s){function o(a){var l=this,c="";l.next=function(){var h=l.b,d=l.c,p=l.d,f=l.a;return h=h<<25^h>>>7^d,d=d-p|0,p=p<<24^p>>>8^f,f=f-h|0,l.b=h=h<<20^h>>>12^d,l.c=d=d-p|0,l.d=p<<16^d>>>16^f,l.a=f-h|0},l.a=0,l.b=0,l.c=-1640531527,l.d=1367130551,a===Math.floor(a)?(l.a=a/4294967296|0,l.b=a|0):c+=a;for(var u=0;u<c.length+20;u++)l.b^=c.charCodeAt(u)|0,l.next()}function r(a,l){return l.a=a.a,l.b=a.b,l.c=a.c,l.d=a.d,l}function i(a,l){var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(typeof u=="object"&&r(u,c),h.state=function(){return r(c,{})}),h}e&&e.exports?e.exports=i:this.tychei=i})(Iv,n)})(Dl)),Dl.exports}var Fl={exports:{}},kv={},Sv=Object.freeze({__proto__:null,default:kv}),Nv=ww(Sv),Tv=Fl.exports,fm;function Ev(){return fm||(fm=1,(function(n){(function(t,e,s){var o=256,r=6,i=52,a="random",l=s.pow(o,r),c=s.pow(2,i),u=c*2,h=o-1,d;function p(y,$,I){var v=[];$=$==!0?{entropy:!0}:$||{};var T=x(g($.entropy?[y,w(e)]:y==null?b():y,3),v),S=new f(v),N=function(){for(var C=S.g(r),E=l,R=0;C<c;)C=(C+R)*o,E*=o,R=S.g(1);for(;C>=u;)C/=2,E/=2,R>>>=1;return(C+R)/E};return N.int32=function(){return S.g(4)|0},N.quick=function(){return S.g(4)/4294967296},N.double=N,x(w(S.S),e),($.pass||I||function(C,E,R,D){return D&&(D.S&&m(D,S),C.state=function(){return m(S,{})}),R?(s[a]=C,E):C})(N,T,"global"in $?$.global:this==s,$.state)}function f(y){var $,I=y.length,v=this,T=0,S=v.i=v.j=0,N=v.S=[];for(I||(y=[I++]);T<o;)N[T]=T++;for(T=0;T<o;T++)N[T]=N[S=h&S+y[T%I]+($=N[T])],N[S]=$;(v.g=function(C){for(var E,R=0,D=v.i,F=v.j,O=v.S;C--;)E=O[D=h&D+1],R=R*o+O[h&(O[D]=O[F=h&F+E])+(O[F]=E)];return v.i=D,v.j=F,R})(o)}function m(y,$){return $.i=y.i,$.j=y.j,$.S=y.S.slice(),$}function g(y,$){var I=[],v=typeof y,T;if($&&v=="object")for(T in y)try{I.push(g(y[T],$-1))}catch(S){}return I.length?I:v=="string"?y:y+"\0"}function x(y,$){for(var I=y+"",v,T=0;T<I.length;)$[h&T]=h&(v^=$[h&T]*19)+I.charCodeAt(T++);return w($)}function b(){try{var y;return d&&(y=d.randomBytes)?y=y(o):(y=new Uint8Array(o),(t.crypto||t.msCrypto).getRandomValues(y)),w(y)}catch(v){var $=t.navigator,I=$&&$.plugins;return[+new Date,t,I,t.screen,w(e)]}}function w(y){return String.fromCharCode.apply(0,y)}if(x(s.random(),e),n.exports){n.exports=p;try{d=Nv}catch(y){}}else s["seed"+a]=p})(typeof self!="undefined"?self:Tv,[],Math)})(Fl)),Fl.exports}var $h,mm;function Rv(){if(mm)return $h;mm=1;var n=fv(),t=gv(),e=bv(),s=wv(),o=$v(),r=vv(),i=Ev();return i.alea=n,i.xor128=t,i.xorwow=e,i.xorshift7=s,i.xor4096=o,i.tychei=r,$h=i,$h}var Ih=Rv();class gm{constructor(t,e,s,o,r){this.mean=t,this.stdDev=e,this.dtype=s,this.nextVal=NaN,this.truncated=o,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);const i=r||Math.random();this.random=Ih.alea(i.toString())}nextValue(){if(!isNaN(this.nextVal)){const o=this.nextVal;return this.nextVal=NaN,o}let t,e,s=!1;for(;!s;){let o,r,i;do o=2*this.random()-1,r=2*this.random()-1,i=o*o+r*r;while(i>=1||i===0);const a=Math.sqrt(-2*Math.log(i)/i);t=this.mean+this.stdDev*o*a,e=this.mean+this.stdDev*r*a,(!this.truncated||this.isValidTruncated(t))&&(s=!0)}return(!this.truncated||this.isValidTruncated(e))&&(this.nextVal=this.convertValue(e)),this.convertValue(t)}convertValue(t){return this.dtype==null||this.dtype==="float32"?t:Math.round(t)}isValidTruncated(t){return t<=this.upper&&t>=this.lower}}class Av{constructor(t=0,e=1,s,o){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=t,this.range=e-t,this.dtype=s,o==null&&(o=Math.random()),typeof o=="number"&&(o=o.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${t} - ${e} <= 1 and dtype is not float`);this.random=Ih.alea(o)}convertValue(t){return this.canReturnFloat()?t:Math.round(t)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}function Dv(n,t=0,e=1,s,o){if(rs(n),s!=null&&s==="bool")throw new Error(`Unsupported data type ${s}`);const r=new gm(t,e,s,!1,o),i=It(n,s);for(let a=0;a<i.values.length;a++)i.values[a]=r.nextValue();return i.toTensor()}const Fv=V({randomNormal_:Dv});function _v(n,t=0,e=1,s="float32",o){rs(n);const r=It(n,s),i=new Av(t,e,null,o);for(let a=0;a<r.values.length;a++)r.values[a]=i.nextValue();return r.toTensor()}const $i=V({randomUniform_:_v});function Ii(n,t,e=1,s="float32"){if(e===0)throw new Error("Cannot have a step of zero");const o={start:n,stop:t,step:e,dtype:s};return M.runKernel(Au,{},o)}function Ov(n){const e={input:A(n,"input","real")};return M.runKernel(Du,e)}const _l=V({real_:Ov});function Lv(n){const e={x:A(n,"x","reciprocal")};return M.runKernel(Xr,e)}const Mv=V({reciprocal_:Lv});function Pv(n){const e={x:A(n,"x","relu")};return M.runKernel(Kr,e)}const io=V({relu_:Pv});function Bv(n){const e={x:A(n,"x","relu6")};return M.runKernel(jr,e)}const xm=V({relu6_:Bv});function zv(n,t){const s={x:A(n,"x","reverse")},o={dims:t};return M.runKernel(Za,s,o)}const ao=V({reverse_:zv});function Vv(n){const e={x:A(n,"x","round")};return M.runKernel(Yr,e)}const bm=V({round_:Vv});function Wv(n){const e={x:A(n,"x","rsqrt","float32")};return M.runKernel(Zr,e)}const ym=V({rsqrt_:Wv});function Uv(n){const e={x:A(n,"x","selu")};return M.runKernel(Qr,e)}const wm=V({selu_:Uv});function Gv(n,t,e,s,o,r=[1,1],i="NHWC"){const a=A(n,"x","separableConv2d"),l=A(t,"depthwiseFilter","separableConv2d"),c=A(e,"pointwiseFilter","separableConv2d");let u=a,h=!1;if(a.rank===3&&(h=!0,u=z(a,[1,a.shape[0],a.shape[1],a.shape[2]])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");k(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),k(l.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${l.rank}.`),k(c.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${l.rank}.`),k(c.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${c.shape[0]}.`),k(c.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${c.shape[1]}.`);const d=l.shape[2],p=l.shape[3];k(c.shape[2]===d*p,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${d*p}, but got ${c.shape[2]}.`);const f=hh(u,l,s,o,i,r),g=so(f,c,1,"valid",i);return h?z(g,[g.shape[1],g.shape[2],g.shape[3]]):g}const Cm=V({separableConv2d_:Gv});function Hv(n){const e={x:A(n,"x","sign")};return M.runKernel(ei,e)}const qv=V({sign_:Hv});function Xv(n){const e={x:A(n,"x","sin","float32")};return M.runKernel(Jr,e)}const $m=V({sin_:Xv});function Kv(n){const e={x:A(n,"x","sinh")};return M.runKernel(ti,e)}const Im=V({sinh_:Kv});function jv(n,t,e){const s=A(n,"x","slice1d");return k(s.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${s.rank} tensor`),qt(s,[t],[e])}const vh=V({slice1d_:jv});function Yv(n,t,e){const s=A(n,"x","slice2d");return k(s.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${s.rank} tensor`),qt(s,t,e)}const vm=V({slice2d_:Yv});function Zv(n,t,e){const s=A(n,"x","slice3d");return k(s.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${s.rank} tensor`),qt(s,t,e)}const kh=V({slice3d_:Zv});function Qv(n,t,e){const s=A(n,"x","slice4d");return k(s.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${s.rank} tensor`),qt(s,t,e)}const Ol=V({slice4d_:Qv});function Jv(n,t=-1){const e=A(n,"logits","softmax","float32");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${e.rank} and dim was ${t}`);const s={logits:e},o={dim:t};return M.runKernel(sl,s,o)}const Sh=V({softmax_:Jv});function tk(n){k(n.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${n.dtype}.`);const t={input:n};return M.runKernel(wu,t)}const km=V({fft_:tk});function ek(n){k(n.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${n.dtype}.`);const t={input:n};return M.runKernel(Iu,t)}const Nh=V({ifft_:ek});function nk(n){const t=n.shape[n.shape.length-1],e=n.size/t;let s;if(t<=2){const o=z(n,[e,t]);s=Nh(o)}else{const o=[e,2*(t-1)],r=z(_l(n),[e,t]),i=z(fh(n),[e,t]),a=ao(qt(r,[0,1],[e,t-2]),1),l=L(ao(qt(i,[0,1],[e,t-2]),1),Pt(-1)),c=Ke([r,a],1),u=Ke([i,l],1),h=z(Bo(c,u),[o[0],o[1]]);s=Nh(h)}if(s=_l(s),n.rank===3&&n.shape[0]!==0){const o=s,r=n.shape[0];s=z(s,[r,s.shape[0]/r,s.shape[1]]),o.dispose()}return s}const sk=V({irfft_:nk});function ok(n,t,e=0){const o={x:A(n,"x","split")},r={numOrSizeSplits:t,axis:e};return M.runKernel(nl,o,r)}const cn=V({split_:ok});function rk(n,t){k(n.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${n.dtype}`);let e=n.shape[n.shape.length-1];const s=n.size/e;let o;if(t!=null&&t<e){const f=n.shape.map(g=>0),m=n.shape.map(g=>g);m[n.shape.length-1]=t,o=qt(n,f,m),e=t}else if(t!=null&&t>e){const f=n.shape.map(m=>m);f[n.shape.length-1]=t-e,o=Ke([n,$e(f)],n.shape.length-1),e=t}else o=n;const r=Tt(o),i=z(Bo(o,r),[s,e]),a=km(i),l=Math.floor(e/2)+1,c=_l(a),u=fh(a),h=cn(c,[l,e-l],c.shape.length-1),d=cn(u,[l,e-l],u.shape.length-1),p=o.shape.slice();return p[o.shape.length-1]=l,z(Bo(h[0],d[0]),p)}const ik=V({rfft_:rk});function ak(n,t){let e=A(n,"a","squaredDifference"),s=A(t,"b","squaredDifference");[e,s]=ne(e,s),yt(e.shape,s.shape);const o={a:e,b:s},r={};return M.runKernel(ri,o,r)}const lk=V({squaredDifference_:ak});function ck(n,t){const e=A(n,"x","squeeze","string_or_numeric");return z(e,xs(e.shape,t).newShape)}const vi=V({squeeze_:ck});function uk(n,t=0){const e=Ef(n,"tensors","stack","string_or_numeric");k(e.length>=1,()=>"Pass at least one tensor to tf.stack"),e.length>0&&k(t<=e[0].rank,()=>"Axis must be <= rank of the tensor");const s=e,o={axis:t};return M.runKernel(Ga,s,o)}const us=V({stack_:uk});function hk(n,t=0){const s={x:A(n,"x","step")},o={alpha:t};return M.runKernel(ui,s,o)}const ki=V({step_:hk});function dk(n,t,e,s,o=0,r=0,i=0,a=0,l=0){const u={x:A(n,"x","stridedSlice","string_or_numeric")},h={begin:t,end:e,strides:s,beginMask:o,endMask:r,ellipsisMask:i,newAxisMask:a,shrinkAxisMask:l};return M.runKernel(Mu,u,h)}const pk=V({stridedSlice_:dk});function fk(n){const e={x:A(n,"x","tan","float32")};return M.runKernel(ai,e)}const mk=V({tan_:fk});function tn(n,t){Np(n);const e=fl(n,t);if(e.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return ml(n,null,e,t)}function Th(n,t,e){if(Np(n),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");const s=fl(n,e);if(s.length!==2&&s.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return ml(n,t,s,e)}function lo(n,t,e){const s=t.shape.length,o=s>1?t.shape[s-1]:1,r=e.length;let i=1;for(let h=o;h<r;++h)i*=e[h];const a=o<1?1:o,l=X(t.shape)/a,c=[...dt(e.slice(0,o)),1],u=X(e);return{sliceRank:o,numUpdates:l,sliceSize:i,strides:c,outputSize:u}}function gk(n,t=1,e=!0){const s=A(n,"x","topk");if(s.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");const o=s.shape[s.shape.length-1];if(t<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>o)throw new Error(`'k' passed to topk() must be <= the last dimension (${o}) but got ${t}`);const r={x:s},i={k:t,sorted:e},[a,l]=M.runKernel(Pu,r,i);return{values:a,indices:l}}const xk=V({topk_:gk});function bk(n,t=0,e=1,s,o){if(rs(n),s!=null&&s==="bool")throw new Error("Unsupported data type $ { dtype }");const r=new gm(t,e,s,!0,o),i=It(n,s);for(let a=0;a<i.values.length;a++)i.values[a]=r.nextValue();return i.toTensor()}const Sm=V({truncatedNormal_:bk});function yk(n,t=0){const e=A(n,"x","unique","string_or_numeric");k(e.rank>0,()=>"The input tensor must be at least 1D");const s={x:e},o={axis:t},[r,i]=M.runKernel(zu,s,o);return{values:r,indices:i}}const wk=V({unique_:yk});function Ck(n,t,e){const s=A(n,"x","unsortedSegmentSum"),o=A(t,"segmentIds","unsortedSegmentSum","int32");k(Ao(e),()=>"numSegments must be of dtype int");const r={x:s,segmentIds:o},i={numSegments:e};return M.runKernel(rl,r,i)}const Nm=V({unsortedSegmentSum_:Ck});function $k(n,t=0){const e=A(n,"x","unstack","string_or_numeric");k(t>=-e.shape.length&&t<e.shape.length,()=>`Axis = ${t} is not in [-${e.shape.length}, ${e.shape.length})`);const s={value:e},o={axis:t};return M.runKernel(ol,s,o)}const co=V({unstack_:$k});function Ik(n,t=!0,e,s){return M.makeVariable(n,t,e,s)}function Tm(n,t){const e=[];for(let r=0;r<t.length;r++)t[r]&&e.push(r);const s=It(n,"int32"),o=It([e.length,n.length],"int32");for(let r=0;r<e.length;r++){const i=s.indexToLoc(e[r]),a=r*n.length;o.values.set(i,a)}return o.toTensor()}function vk(n,t,e){const s=A(n,"x","transpose");if(t==null&&(t=s.shape.map((i,a)=>a).reverse()),k(s.rank===t.length,()=>`Error in transpose: rank of input ${s.rank} must match length of perm ${t}.`),t.forEach(i=>{k(i>=0&&i<s.rank,()=>`All entries in 'perm' must be between 0 and ${s.rank-1} but got ${t}`)}),s.rank<=1)return s.clone();const o={x:s},r={perm:t};return s.dtype==="complex64"?W(()=>{let i=_l(s),a=fh(s);return i=M.runKernel(Lo,{x:i},r),a=M.runKernel(Lo,{x:a},r),e&&(a=oe(a)),Bo(i,a)}):M.runKernel(Lo,o,r)}const Et=V({transpose_:vk});function kk(n,t){if(t==null)return n.shape.slice();if(Lt(n.shape,t))return t;if(n.shape.length===t.length){const e=[];for(let s=0;s<n.shape.length;s++)t[s]==null&&n.shape[s]!=null?e.push(n.shape[s]):e.push(t[s]);return e}return t}function Sk(n,t,e,s){const o=A(n,"x","dropout");if(k(o.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${o.dtype} tensor instead.`),k(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),t===0)return n instanceof ue?o.clone():o;const r=kk(o,e),i=1-t,a=ft(vl(J($i(r,0,1,"float32",s),i)),i);return L(o,a)}const Nk=V({dropout_:Sk});function Tk(n,t,e,s,o,r="NHWC",i){let a=n;n.rank===3&&(a=z(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let l=t;l.rank===3&&(l=z(t,[1,t.shape[0],t.shape[1],t.shape[2]])),k(a.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${a.shape}.`),k(l.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${l.shape}.`),k(e.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${e}.`);const c=r==="NHWC"?a.shape[3]:a.shape[1],u=r==="NHWC"?l.shape[3]:l.shape[1];k(c===e[2],()=>`Error in conv2dDerFilter: depth of input ${c}) must match input depth in filter (${e[2]}.`),k(u===e[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${e[3]}).`),Xe("conv2dDerFilter",o,i);const h={x:a,dy:l},d={strides:s,pad:o,dataFormat:r,dimRoundingMode:i,filterShape:e};return M.runKernel(au,h,d)}const Eh=V({conv2DBackpropFilter_:Tk});function Rh(n,t,e){if(e==null||e==="linear")return n;if(e==="relu")return L(n,ki(t));throw new Error(`Cannot compute gradient for fused activation ${e}.`)}function Ah(n,t){let e=t;const s=he(n.shape,t.shape);return s.length>0&&(e=pt(e,s)),z(e,n.shape)}function Dh(n,t,e,s){if(t==="linear")return n;if(t==="relu")return io(n);if(t==="elu")return Cl(n);if(t==="relu6")return xm(n);if(t==="prelu")return Ch(n,e);if(t==="leakyrelu")return mh(n,s);if(t==="sigmoid")return Wo(n);throw new Error(`Unknown fused activation ${t}.`)}const Fh=(n,t)=>!(n>0)||t==="linear";function Ek({x:n,filter:t,strides:e,pad:s,dataFormat:o="NHWC",dilations:r=[1,1],dimRoundingMode:i,bias:a,activation:l="linear",preluActivationWeights:c,leakyreluAlpha:u}){if(l=l||"linear",Fh(M.state.gradientDepth,l)===!1){k(o==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${o} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let I=so(n,t,e,s,o,r,i);return a!=null&&(I=J(I,a)),Dh(I,l,c,u)}const h=A(n,"x","conv2d","float32"),d=A(t,"filter","conv2d","float32");let p=h,f=!1;h.rank===3&&(f=!0,p=z(h,[1,h.shape[0],h.shape[1],h.shape[2]])),k(p.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${p.rank}.`),k(d.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${d.rank}.`),Xe("fused conv2d",s,i);const m=o==="NHWC"?p.shape[3]:p.shape[1];k(d.shape[2]===m,()=>`Error in conv2d: depth of input (${m}) must match input depth for filter ${d.shape[2]}.`),k(De(e,r),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${e} and dilations '${r}'`);const g=ke(p.shape,d.shape,e,r,s,i);let x;a!=null&&(x=A(a,"bias","fused conv2d"),[x]=ne(x,h),o==="NHWC"?yt(g.outShape,x.shape):(k(x.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${x.shape.length}.`),k(x.shape.length===0||x.shape[0]===g.outChannels||x.shape[0]===1,()=>`Error in fused conv2d: bias shape (${x.shape}) is not compatible with the number of output channels (${g.outChannels})`)));let b;if(c!=null){const I=c.shape;if(k(I.length<=1||I.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${I.length}.`),I.length===1)k(I[0]===1||I[0]===g.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${I}) is not compatible with the number of output channels (${g.outChannels}).`);else if(I.length===3)try{yt(I,g.outShape)}catch(v){const T=`Error in fused conv2d: PReLU activation weights (${I}) is not compatible with the output shape of the conv2d (${g.outShape}).`;throw Error(T)}b=A(c,"prelu weights","fused conv2d")}const w=(I,v)=>{k(o==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${o} but only NHWC is currently supported.`);const[T,S,N,C]=v,E=Rh(I,N,l);k(eo(r),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${r}'`);const R=lh(S.shape,E,T,e,s),D=Eh(S,E,T.shape,e,s),F=[R,D];if(C!=null){const O=Ah(C,E);F.push(O)}return F},y={x:p,filter:d,bias:x,preluActivationWeights:b},$={strides:e,pad:s,dataFormat:o,dilations:r,dimRoundingMode:i,activation:l,leakyreluAlpha:u};return a==null?Ho((v,T,S)=>{let N=M.runKernel(ll,y,$);return S([T,v,N]),f&&(N=z(N,[N.shape[1],N.shape[2],N.shape[3]])),{value:N,gradFunc:w}})(p,d):Ho((v,T,S,N)=>{let C=M.runKernel(ll,y,$);return N([T,v,C,S]),f&&(C=z(C,[C.shape[1],C.shape[2],C.shape[3]])),{value:C,gradFunc:w}})(p,d,x)}const Rk=V({fusedConv2d_:Ek});function Ak(n,t,e,s,o,r=[1,1],i){let a=n;n.rank===3&&(a=z(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let l=t;l.rank===3&&(l=z(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const c={x:a,dy:l},u={strides:s,pad:o,dimRoundingMode:i,dilations:r,filterShape:e};return M.runKernel(fu,c,u)}const Dk=V({depthwiseConv2dNativeBackpropFilter_:Ak});function Fk(n,t,e,s,o,r=[1,1],i){let a=t,l=!1;t.rank===3&&(l=!0,a=z(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const c={dy:a,filter:e},u={strides:s,pad:o,dimRoundingMode:i,dilations:r,inputShape:n},h=M.runKernel(mu,c,u);return l?z(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const _k=V({depthwiseConv2dNativeBackpropInput_:Fk});function Ok({a:n,b:t,transposeA:e=!1,transposeB:s=!1,bias:o,activation:r="linear",preluActivationWeights:i,leakyreluAlpha:a=.2}){if(Fh(M.state.gradientDepth,r)===!1){let C=Mt(n,t,e,s);return o!=null&&(C=J(C,o)),Dh(C,r,i,a)}let l=A(n,"a","fused matMul"),c=A(t,"b","fused matMul");[l,c]=ne(l,c);const u=e?l.shape[l.rank-2]:l.shape[l.rank-1],h=s?c.shape[c.rank-1]:c.shape[c.rank-2],d=e?l.shape[l.rank-1]:l.shape[l.rank-2],p=s?c.shape[c.rank-2]:c.shape[c.rank-1],f=l.shape.slice(0,-2),m=c.shape.slice(0,-2),g=X(f),x=X(m);k(u===h,()=>`Error in fused matMul: inner shapes (${u}) and (${h}) of Tensors with shapes ${l.shape} and ${c.shape} and transposeA=${e} and transposeB=${s} must match.`);const w=yt(l.shape.slice(0,-2),c.shape.slice(0,-2)).concat([d,p]),y=e?z(l,[g,u,d]):z(l,[g,d,u]),$=s?z(c,[x,p,h]):z(c,[x,h,p]);let I;o!=null&&(I=A(o,"bias","fused matMul"),[I]=ne(I,l),yt(w,I.shape));let v;i!=null&&(v=A(i,"prelu weights","fused matMul"));const T=(C,E)=>{const[R,D,F,O]=E,P=Rh(z(C,F.shape),F,r);let B,H;if(!e&&!s?(B=Mt(P,D,!1,!0),H=Mt(R,P,!0,!1)):!e&&s?(B=Mt(P,D,!1,!1),H=Mt(P,R,!0,!1)):e&&!s?(B=Mt(D,P,!1,!0),H=Mt(R,P,!1,!1)):(B=Mt(D,P,!0,!0),H=Mt(P,R,!0,!0)),o!=null){const G=Ah(O,P);return[B,H,G]}else return[B,H]},S={a:y,b:$,bias:I,preluActivationWeights:v},N={transposeA:e,transposeB:s,activation:r,leakyreluAlpha:a};return o==null?Ho((E,R,D)=>{const F=M.runKernel(al,S,N);return D([E,R,F]),{value:z(F,w),gradFunc:T}})(y,$):Ho((E,R,D,F)=>{const O=M.runKernel(al,S,N);return F([E,R,O,D]),{value:z(O,w),gradFunc:T}})(y,$,I)}const Em=V({fusedMatMul_:Ok});function Lk(n,t,e,s,o="bilinear",r=0){const i=A(n,"image","cropAndResize"),a=A(t,"boxes","cropAndResize","float32"),l=A(e,"boxInd","cropAndResize","int32"),c=a.shape[0];k(i.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${i.rank}.`),k(a.rank===2&&a.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${c},4] but had shape ${a.shape}.`),k(l.rank===1&&l.shape[0]===c,()=>`Error in cropAndResize: boxInd must be have size [${c}] but had shape ${a.shape}.`),k(s.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${s.length}.`),k(s[0]>=1&&s[1]>=1,()=>`cropSize must be atleast [1,1], but was ${s}`),k(o==="bilinear"||o==="nearest",()=>`method must be bilinear or nearest, but was ${o}`);const u={image:i,boxes:a,boxInd:l},h={method:o,extrapolationValue:r,cropSize:s};return M.runKernel(hu,u,h)}const Mk=V({cropAndResize_:Lk});function Pk(n){const t=A(n,"image","flipLeftRight","float32");k(t.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);const e={image:t};return M.runKernel($u,e,{})}const Bk=V({flipLeftRight_:Pk});function zk(n){const t=A(n,"image","grayscaleToRGB"),e=t.rank-1,s=t.shape[e];k(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),k(s===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${s}.`);const o=new Array(t.rank);return o.fill(1,0,e),o[e]=3,An(t,o)}const Vk=V({grayscaleToRGB_:zk});function Wk(n){const t=A(n,"image","RGBToGrayscale"),e=t.rank-1,s=t.shape[e];k(t.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${t.rank}.`),k(s===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${s}.`);const o=t.dtype,r=rt(t,"float32"),i=tn([.2989,.587,.114]);let a;switch(t.rank){case 2:a=yi("ij,j->i",r,i);break;case 3:a=yi("ijk,k->ij",r,i);break;case 4:a=yi("ijkl,l->ijk",r,i);break;case 5:a=yi("ijklm,m->ijkl",r,i);break;case 6:a=yi("ijklmn,n->ijklm",r,i);break;default:throw new Error("Not a valid tensor rank.")}return a=je(a,-1),rt(a,o)}const Uk=V({rgbToGrayscale_:Wk});function Gk(n,t,e=0,s=.5){const o=A(n,"image","rotateWithOffset","float32");k(o.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${o.rank}.`);const r={image:o},i={radians:t,fillValue:e,center:s};return M.runKernel(Vu,r,i)}const Hk=V({rotateWithOffset_:Gk});function qo(n,t,e,s,o,r){s==null&&(s=.5),o==null&&(o=Number.NEGATIVE_INFINITY),r==null&&(r=0);const i=n.shape[0];return e=Math.min(e,i),k(0<=s&&s<=1,()=>`iouThreshold must be in [0, 1], but was '${s}'`),k(n.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${n.rank}'`),k(n.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${n.shape[1]}`),k(t.rank===1,()=>"scores must be a 1D tensor"),k(t.shape[0]===i,()=>`scores has incompatible shape with boxes. Expected ${i}, but was ${t.shape[0]}`),k(0<=r&&r<=1,()=>`softNmsSigma must be in [0, 1], but was '${r}'`),{maxOutputSize:e,iouThreshold:s,scoreThreshold:o,softNmsSigma:r}}function qk(n,t,e,s=.5,o=Number.NEGATIVE_INFINITY){const r=A(n,"boxes","nonMaxSuppression","float32"),i=A(t,"scores","nonMaxSuppression","float32"),a=qo(r,i,e,s,o);e=a.maxOutputSize,s=a.iouThreshold,o=a.scoreThreshold;const l={maxOutputSize:e,iouThreshold:s,scoreThreshold:o};return M.runKernel(Tu,{boxes:r,scores:i},l)}const Xk=V({nonMaxSuppression_:qk});function Kk(n,t,e){const s=jk(n,t,e),o=s<0?-(s+1):s;n.splice(o,0,t)}function jk(n,t,e){return Zk(n,t,e||Yk)}function Yk(n,t){return n>t?1:n<t?-1:0}function Zk(n,t,e){let s=0,o=n.length,r=0,i=!1;for(;s<o;){r=s+(o-s>>>1);const a=e(t,n[r]);a>0?s=r+1:(o=r,i=!a)}return i?s:-s-1}function _h(n,t,e,s,o){return Mh(n,t,e,s,o,0)}function Oh(n,t,e,s,o,r){return Mh(n,t,e,s,o,0,!1,r,!0)}function Lh(n,t,e,s,o,r){return Mh(n,t,e,s,o,r,!0)}function Mh(n,t,e,s,o,r,i=!1,a=!1,l=!1){const c=[];for(let g=0;g<t.length;g++)t[g]>o&&c.push({score:t[g],boxIndex:g,suppressBeginIndex:0});c.sort(Rm);const u=r>0?-.5/r:0,h=[],d=[];for(;h.length<e&&c.length>0;){const g=c.pop(),{score:x,boxIndex:b,suppressBeginIndex:w}=g;if(x<o)break;let y=!1;for(let $=h.length-1;$>=w;--$){const I=Qk(n,b,h[$]);if(I>=s){y=!0;break}if(g.score=g.score*Jk(s,u,I),g.score<=o)break}g.suppressBeginIndex=h.length,y||(g.score===x?(h.push(b),d.push(g.score)):g.score>o&&Kk(c,g,Rm))}const p=h.length,f=e-p;a&&f>0&&(h.push(...new Array(f).fill(0)),d.push(...new Array(f).fill(0)));const m={selectedIndices:h};return i&&(m.selectedScores=d),l&&(m.validOutputs=p),m}function Qk(n,t,e){const s=n.subarray(t*4,t*4+4),o=n.subarray(e*4,e*4+4),r=Math.min(s[0],s[2]),i=Math.min(s[1],s[3]),a=Math.max(s[0],s[2]),l=Math.max(s[1],s[3]),c=Math.min(o[0],o[2]),u=Math.min(o[1],o[3]),h=Math.max(o[0],o[2]),d=Math.max(o[1],o[3]),p=(a-r)*(l-i),f=(h-c)*(d-u);if(p<=0||f<=0)return 0;const m=Math.max(r,c),g=Math.max(i,u),x=Math.min(a,h),b=Math.min(l,d),w=Math.max(x-m,0)*Math.max(b-g,0);return w/(p+f-w)}function Jk(n,t,e){const s=Math.exp(t*e*e);return e<=n?s:0}function Rm(n,t){return n.score-t.score||n.score===t.score&&t.boxIndex-n.boxIndex}function tS(r,i,a){return Q(this,arguments,function*(n,t,e,s=.5,o=Number.NEGATIVE_INFINITY){const l=A(n,"boxes","nonMaxSuppressionAsync"),c=A(t,"scores","nonMaxSuppressionAsync"),u=qo(l,c,e,s,o);e=u.maxOutputSize,s=u.iouThreshold,o=u.scoreThreshold;const h=yield Promise.all([l.data(),c.data()]),d=h[0],p=h[1],{selectedIndices:f}=_h(d,p,e,s,o);return l!==n&&l.dispose(),c!==t&&c.dispose(),tn(f,"int32")})}const eS=tS;function nS(n,t,e,s=.5,o=Number.NEGATIVE_INFINITY,r=0){const i=A(n,"boxes","nonMaxSuppression"),a=A(t,"scores","nonMaxSuppression"),l=qo(i,a,e,s,o,r);e=l.maxOutputSize,s=l.iouThreshold,o=l.scoreThreshold,r=l.softNmsSigma;const c={boxes:i,scores:a},u={maxOutputSize:e,iouThreshold:s,scoreThreshold:o,softNmsSigma:r},h=M.runKernel(Ru,c,u);return{selectedIndices:h[0],selectedScores:h[1]}}const sS=V({nonMaxSuppressionWithScore_:nS});function oS(i,a,l){return Q(this,arguments,function*(n,t,e,s=.5,o=Number.NEGATIVE_INFINITY,r=0){const c=A(n,"boxes","nonMaxSuppressionAsync"),u=A(t,"scores","nonMaxSuppressionAsync"),h=qo(c,u,e,s,o,r);e=h.maxOutputSize,s=h.iouThreshold,o=h.scoreThreshold,r=h.softNmsSigma;const d=yield Promise.all([c.data(),u.data()]),p=d[0],f=d[1],{selectedIndices:m,selectedScores:g}=Lh(p,f,e,s,o,r);return c!==n&&c.dispose(),u!==t&&u.dispose(),{selectedIndices:tn(m,"int32"),selectedScores:tn(g)}})}const rS=oS;function iS(n,t,e,s=.5,o=Number.NEGATIVE_INFINITY,r=!1){const i=A(n,"boxes","nonMaxSuppression"),a=A(t,"scores","nonMaxSuppression"),l=qo(i,a,e,s,o,null),c=l.maxOutputSize,u=l.iouThreshold,h=l.scoreThreshold,d={boxes:i,scores:a},p={maxOutputSize:c,iouThreshold:u,scoreThreshold:h,padToMaxOutputSize:r},f=M.runKernel(Eu,d,p);return{selectedIndices:f[0],validOutputs:f[1]}}const aS=V({nonMaxSuppressionPadded_:iS});function lS(i,a,l){return Q(this,arguments,function*(n,t,e,s=.5,o=Number.NEGATIVE_INFINITY,r=!1){const c=A(n,"boxes","nonMaxSuppressionAsync"),u=A(t,"scores","nonMaxSuppressionAsync"),h=qo(c,u,e,s,o,null),d=h.maxOutputSize,p=h.iouThreshold,f=h.scoreThreshold,[m,g]=yield Promise.all([c.data(),u.data()]),{selectedIndices:x,validOutputs:b}=Oh(m,g,d,p,f,r);return c!==n&&c.dispose(),u!==t&&u.dispose(),{selectedIndices:tn(x,"int32"),validOutputs:Pt(b,"int32")}})}const cS=lS;function uS(n,t,e=!1,s=!1){const o=A(n,"images","resizeBilinear");k(o.rank===3||o.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${o.rank}.`),k(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),k(s===!1||e===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let r=o,i=!1;o.rank===3&&(i=!0,r=z(o,[1,o.shape[0],o.shape[1],o.shape[2]]));const a={images:r},l={alignCorners:e,halfPixelCenters:s,size:t},c=M.runKernel(Ya,a,l);return i?z(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const Am=V({resizeBilinear_:uS});function hS(n,t,e=!1,s=!1){const o=A(n,"images","resizeNearestNeighbor");k(o.rank===3||o.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${o.rank}.`),k(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),k(o.dtype==="float32"||o.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),k(s===!1||e===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let r=o,i=!1;o.rank===3&&(i=!0,r=z(o,[1,o.shape[0],o.shape[1],o.shape[2]]));const a={images:r},l={alignCorners:e,halfPixelCenters:s,size:t},c=M.runKernel(ja,a,l);return i?z(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const Dm=V({resizeNearestNeighbor_:hS});function dS(n,t="binary",e=!1,s=.5){const o=A(n,"image","threshold"),r=.2989,i=.587,a=.114,l=o.shape[0]*o.shape[1];let c=L(tn([s]),255),u,h,d,p;if(k(o.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${o.rank}.`),k(o.shape[2]===3||o.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${o.shape[2]}.`),k(o.dtype==="int32"||o.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${o.dtype}.`),k(t==="otsu"||t==="binary",()=>`Method must be binary or otsu, but was ${t}`),o.shape[2]===3){[u,h,d]=cn(o,[1,1,1],-1);const g=L(u,r),x=L(h,i),b=L(d,a);p=J(J(g,x),b)}else p=n;if(t==="otsu"){const g=u$(rt(bm(p),"int32"),gl([]),256);c=pS(g,l)}const f=e?Go(p,c):ln(p,c);return rt(L(f,255),"int32")}function pS(n,t){let e=tn([-1]),s=tn([0]),o=tn([0]),r,i,a,l,c,u;for(let h=0;h<n.size-1;h++){r=qt(n,0,h+1),i=qt(n,h+1),c=ft(pt(r),t),u=ft(pt(i),t);const d=pt(L(r,Ii(0,r.size)));a=ft(d,pt(r));const p=wl(i.shape,r.size),f=J(Ii(0,i.size),p),m=L(i,f);l=ft(pt(m),pt(i));const g=gt(a,l),x=gt(a,l),b=L(c,u);o=L(L(b,g),x);const w=ln(o,s);s=Be(w,o,s),e=Be(w,tn([h]),e)}return e}const fS=V({threshold_:dS});function mS(n,t,e="nearest",s="constant",o=0,r){const i=A(n,"image","transform","float32"),a=A(t,"transforms","transform","float32");k(i.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${i.rank}.`),k(a.rank===2&&(a.shape[0]===i.shape[0]||a.shape[0]===1)&&a.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),k(r==null||r.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${r}.`);const l={image:i,transforms:a},c={interpolation:e,fillMode:s,fillValue:o,outputShape:r};return M.runKernel(Bu,l,c)}const gS=V({transform_:mS});function xS(n,t,e){const s=A(n,"a","bandPart");k(s.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${s.rank}.`);const o=s.shape,[r,i]=s.shape.slice(-2);let a,l;typeof t=="number"?(k(t%1===0,()=>`bandPart(): numLower must be an integer, got ${t}.`),k(t<=r,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${r}).`),a=A(t<0?r:t,"numLower","bandPart")):(k(t.dtype==="int32",()=>"bandPart(): numLower's dtype must be an int32."),a=Be(kl(t,0),r,Ci(t,r))),typeof e=="number"?(k(e%1===0,()=>`bandPart(): numUpper must be an integer, got ${e}.`),k(e<=i,()=>`bandPart(): numUpper (${e}) must not be greater than the number of columns (${i}).`),l=A(e<0?i:e,"numUpper","bandPart")):(k(e.dtype==="int32",()=>"bandPart(): numUpper's dtype must be an int32."),l=Be(kl(e,0),i,Ci(e,i)));const c=z(Ii(0,r,1,"int32"),[-1,1]),u=Ii(0,i,1,"int32"),h=gt(c,u),d=cs(Go(h,a),ro(h,oe(l))),p=$e([r,i],s.dtype);return z(us(co(z(s,[-1,r,i])).map(f=>Be(d,f,p))),o)}const bS=V({bandPart_:xS});function yS(n){let t;if(Array.isArray(n)){t=!1,k(n!=null&&n.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const o=n[0].shape[0];for(let r=1;r<n.length;++r)k(n[r].shape[0]===o,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${n[r].shape[0]} vs. ${o})`)}else t=!0,n=cn(n,n.shape[0],0).map(o=>vi(o,[0]));k(n.length<=n[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${n.length}) exceeds number of dimensions (${n[0].shape[0]}).`);const e=[],s=n;for(let o=0;o<n.length;++o)e.push(M.tidy(()=>{let r=s[o];if(o>0)for(let i=0;i<o;++i){const a=L(pt(L(e[i],r)),e[i]);r=gt(r,a)}return ft(r,Il(r,"euclidean"))}));return t?us(e,0):e}const wS=V({gramSchmidt_:yS});function CS(n,t=!1){if(k(n.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${n.rank}`),n.rank===2)return Fm(n,t);{const e=n.shape.slice(0,n.shape.length-2).reduce((l,c)=>l*c),s=co(z(n,[e,n.shape[n.shape.length-2],n.shape[n.shape.length-1]]),0),o=[],r=[];s.forEach(l=>{const[c,u]=Fm(l,t);o.push(c),r.push(u)});const i=z(us(o,0),n.shape),a=z(us(r,0),n.shape);return[i,a]}}function Fm(n,t=!1){return M.tidy(()=>{k(n.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${n.shape.length}D Tensor.`);const e=n.shape[0],s=n.shape[1];let o=nm(e),r=to(n);const i=Th([[1]],[1,1]);let a=to(i);const l=e>=s?s:e;for(let c=0;c<l;++c){const u=r,h=a,d=o;[a,r,o]=M.tidy(()=>{const p=qt(r,[c,c],[e-c,1]),f=Il(p),m=qt(r,[c,c],[1,1]),g=Be(ln(m,0),Th([[-1]]),Th([[1]])),x=gt(m,L(g,f)),b=ft(p,x);b.shape[0]===1?a=to(i):a=Ke([i,qt(b,[1,0],[b.shape[0]-1,b.shape[1]])],0);const w=oe(ft(Mt(g,x),f)),y=qt(r,[c,0],[e-c,s]),$=L(w,a),I=Et(a);if(c===0)r=gt(y,Mt($,Mt(I,y)));else{const S=gt(y,Mt($,Mt(I,y)));r=Ke([qt(r,[0,0],[c,s]),S],0)}const v=Et($),T=qt(o,[0,c],[e,o.shape[1]-c]);if(c===0)o=gt(T,Mt(Mt(T,a),v));else{const S=gt(T,Mt(Mt(T,a),v));o=Ke([qt(o,[0,0],[e,c]),S],1)}return[a,r,o]}),kt([u,h,d])}return!t&&e>s&&(o=qt(o,[0,0],[e,s]),r=qt(r,[0,0],[s,s])),[o,r]})}const $S=V({qr_:CS});const hs={flipLeftRight:Bk,grayscaleToRGB:Vk,resizeNearestNeighbor:Dm,resizeBilinear:Am,rgbToGrayscale:Uk,rotateWithOffset:Hk,cropAndResize:Mk,nonMaxSuppression:Xk,nonMaxSuppressionAsync:eS,nonMaxSuppressionWithScore:sS,nonMaxSuppressionWithScoreAsync:rS,nonMaxSuppressionPadded:aS,nonMaxSuppressionPaddedAsync:cS,threshold:fS,transform:gS},IS={bandPart:bS,gramSchmidt:wS,qr:$S};const vS=new Map,kS=new Map;class Xo{getClassName(){return this.constructor.className}static fromConfig(t,e){return new t(e)}}class mn{constructor(){this.classNameMap={}}static getMap(){return mn.instance==null&&(mn.instance=new mn),mn.instance}static register(t){mn.getMap().classNameMap[t.className]=[t,t.fromConfig]}}function Z(n,t,e){k(n.className!=null,()=>"Class being registered does not have the static className property defined."),k(typeof n.className=="string",()=>"className is required to be a string, but got type "+typeof n.className),k(n.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof t=="undefined"&&(t="Custom"),typeof e=="undefined"&&(e=n.className);const s=e,o=t+">"+s;return mn.register(n),vS.set(o,n),kS.set(n,o),n}class Ts extends Xo{minimize(t,e=!1,s){const{value:o,grads:r}=this.computeGradients(t,s);if(s!=null){const i=s.map(a=>({name:a.name,tensor:r[a.name]}));this.applyGradients(i)}else this.applyGradients(r);return kt(r),e?o:(o.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(t,e){return AI(t,e)}dispose(){this.iterations_!=null&&kt(this.iterations_)}saveIterations(){return Q(this,null,function*(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:Pt(this.iterations_,"int32")}})}getWeights(){return Q(this,null,function*(){throw new Error("getWeights() is not implemented for this optimizer yet.")})}setWeights(t){return Q(this,null,function*(){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)})}extractIterations(t){return Q(this,null,function*(){return this.iterations_=(yield t[0].tensor.data())[0],t.slice(1)})}}Object.defineProperty(Ts,Symbol.hasInstance,{value:n=>n.minimize!=null&&n.computeGradients!=null&&n.applyGradients!=null});class _m extends Ts{static get className(){return"Adadelta"}constructor(t,e,s=null){super(),this.learningRate=t,this.rho=e,this.epsilon=s,this.accumulatedGrads=[],this.accumulatedUpdates=[],s==null&&(this.epsilon=M.backend.epsilon())}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,o)=>{const r=M.registeredVariables[s],i=!1;this.accumulatedGrads[o]==null&&(this.accumulatedGrads[o]={originalName:`${s}/accum_grad`,variable:W(()=>Tt(r).variable(i))}),this.accumulatedUpdates[o]==null&&(this.accumulatedUpdates[o]={originalName:`${s}/accum_var`,variable:W(()=>Tt(r).variable(i))});const a=Array.isArray(t)?t[o].tensor:t[s];if(a==null)return;const l=this.accumulatedGrads[o].variable,c=this.accumulatedUpdates[o].variable;W(()=>{const u=J(L(l,this.rho),L(jt(a),1-this.rho)),h=L(ft(Fe(J(c,this.epsilon)),Fe(J(l,this.epsilon))),a),d=J(L(c,this.rho),L(jt(h),1-this.rho));l.assign(u),c.assign(d);const p=J(L(h,-this.learningRate),r);r.assign(p)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(kt(this.accumulatedGrads.map(t=>t.variable)),kt(this.accumulatedUpdates.map(t=>t.variable)))}getWeights(){return Q(this,null,function*(){const t=[...this.accumulatedGrads,...this.accumulatedUpdates];return[yield this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))})}setWeights(t){return Q(this,null,function*(){t=yield this.extractIterations(t);const e=t.length/2,s=!1;this.accumulatedGrads=t.slice(0,e).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})),this.accumulatedUpdates=t.slice(e,e*2).map(o=>({originalName:o.name,variable:o.tensor.variable(s)}))})}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(t,e){return new t(e.learningRate,e.rho,e.epsilon)}}class Om extends Ts{static get className(){return"Adagrad"}constructor(t,e=.1){super(),this.learningRate=t,this.initialAccumulatorValue=e,this.accumulatedGrads=[]}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,o)=>{const r=M.registeredVariables[s];this.accumulatedGrads[o]==null&&(this.accumulatedGrads[o]={originalName:`${s}/accumulator`,variable:W(()=>wl(r.shape,this.initialAccumulatorValue).variable(!1))});const i=Array.isArray(t)?t[o].tensor:t[s];if(i==null)return;const a=this.accumulatedGrads[o].variable;W(()=>{const l=J(a,jt(i));a.assign(l);const c=J(L(ft(i,Fe(J(l,M.backend.epsilon()))),-this.learningRate),r);r.assign(c)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&kt(this.accumulatedGrads.map(t=>t.variable))}getWeights(){return Q(this,null,function*(){return[yield this.saveIterations()].concat(this.accumulatedGrads.map(t=>({name:t.originalName,tensor:t.variable})))})}setWeights(t){return Q(this,null,function*(){t=yield this.extractIterations(t);const e=!1;this.accumulatedGrads=t.map(s=>({originalName:s.name,variable:s.tensor.variable(e)}))})}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(t,e){return new t(e.learningRate,e.initialAccumulatorValue)}}class Lm extends Ts{static get className(){return"Adam"}constructor(t,e,s,o=null){super(),this.learningRate=t,this.beta1=e,this.beta2=s,this.epsilon=o,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],W(()=>{this.accBeta1=Pt(e).variable(),this.accBeta2=Pt(s).variable()}),o==null&&(this.epsilon=M.backend.epsilon())}applyGradients(t){const e=Array.isArray(t)?t.map(s=>s.name):Object.keys(t);W(()=>{const s=gt(1,this.accBeta1),o=gt(1,this.accBeta2);e.forEach((r,i)=>{const a=M.registeredVariables[r],l=!1;this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${r}/m`,variable:W(()=>Tt(a).variable(l))}),this.accumulatedSecondMoment[i]==null&&(this.accumulatedSecondMoment[i]={originalName:`${r}/v`,variable:W(()=>Tt(a).variable(l))});const c=Array.isArray(t)?t[i].tensor:t[r];if(c==null)return;const u=this.accumulatedFirstMoment[i].variable,h=this.accumulatedSecondMoment[i].variable,d=J(L(u,this.beta1),L(c,1-this.beta1)),p=J(L(h,this.beta2),L(jt(c),1-this.beta2)),f=ft(d,s),m=ft(p,o);u.assign(d),h.assign(p);const g=J(L(ft(f,J(Fe(m),this.epsilon)),-this.learningRate),a);a.assign(g)}),this.accBeta1.assign(L(this.accBeta1,this.beta1)),this.accBeta2.assign(L(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&kt(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedSecondMoment!=null&&kt(this.accumulatedSecondMoment.map(t=>t.variable))}getWeights(){return Q(this,null,function*(){const t=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[yield this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))})}setWeights(t){return Q(this,null,function*(){t=yield this.extractIterations(t),W(()=>{this.accBeta1.assign(oo(this.beta1,this.iterations_+1)),this.accBeta2.assign(oo(this.beta2,this.iterations_+1))});const e=t.length/2,s=!1;this.accumulatedFirstMoment=t.slice(0,e).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})),this.accumulatedSecondMoment=t.slice(e,e*2).map(o=>({originalName:o.name,variable:o.tensor.variable(s)}))})}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon)}}class Mm extends Ts{static get className(){return"Adamax"}constructor(t,e,s,o=null,r=0){super(),this.learningRate=t,this.beta1=e,this.beta2=s,this.epsilon=o,this.decay=r,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],W(()=>{this.iteration=Pt(0).variable(),this.accBeta1=Pt(e).variable()}),o==null&&(this.epsilon=M.backend.epsilon())}applyGradients(t){const e=Array.isArray(t)?t.map(s=>s.name):Object.keys(t);W(()=>{const s=gt(1,this.accBeta1),o=ft(-this.learningRate,J(L(this.iteration,this.decay),1));e.forEach((r,i)=>{const a=M.registeredVariables[r],l=!1;this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${r}/m`,variable:Tt(a).variable(l)}),this.accumulatedWeightedInfNorm[i]==null&&(this.accumulatedWeightedInfNorm[i]={originalName:`${r}/v`,variable:Tt(a).variable(l)});const c=Array.isArray(t)?t[i].tensor:t[r];if(c==null)return;const u=this.accumulatedFirstMoment[i].variable,h=this.accumulatedWeightedInfNorm[i].variable,d=J(L(u,this.beta1),L(c,1-this.beta1)),p=L(h,this.beta2),f=Pe(c),m=Ss(p,f);u.assign(d),h.assign(m);const g=J(L(ft(o,s),ft(d,J(m,this.epsilon))),a);a.assign(g)}),this.iteration.assign(J(this.iteration,1)),this.accBeta1.assign(L(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&kt(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedWeightedInfNorm!=null&&kt(this.accumulatedWeightedInfNorm.map(t=>t.variable))}getWeights(){return Q(this,null,function*(){throw new Error("getWeights() is not implemented for Adamax yet.")})}setWeights(t){return Q(this,null,function*(){throw new Error("setWeights() is not implemented for Adamax yet.")})}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon,e.decay)}}class Ph extends Ts{static get className(){return"SGD"}constructor(t){super(),this.learningRate=t,this.setLearningRate(t)}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,o)=>{const r=Array.isArray(t)?t[o].tensor:t[s];if(r==null)return;const i=M.registeredVariables[s];W(()=>{const a=J(L(this.c,r),i);i.assign(a)})}),this.incrementIterations()}setLearningRate(t){this.learningRate=t,this.c!=null&&this.c.dispose(),this.c=Wn(Pt(-t))}dispose(){this.c.dispose()}getWeights(){return Q(this,null,function*(){return[yield this.saveIterations()]})}setWeights(t){return Q(this,null,function*(){if(t=yield this.extractIterations(t),t.length!==0)throw new Error("SGD optimizer does not have settable weights.")})}getConfig(){return{learningRate:this.learningRate}}static fromConfig(t,e){return new t(e.learningRate)}}class Pm extends Ph{static get className(){return"Momentum"}constructor(t,e,s=!1){super(t),this.learningRate=t,this.momentum=e,this.useNesterov=s,this.accumulations=[],this.m=Pt(this.momentum)}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,o)=>{const r=M.registeredVariables[s];this.accumulations[o]==null&&(this.accumulations[o]={originalName:`${s}/momentum`,variable:W(()=>Tt(r).variable(!1))});const i=this.accumulations[o].variable,a=Array.isArray(t)?t[o].tensor:t[s];a!=null&&W(()=>{let l;const c=J(L(this.m,i),a);this.useNesterov?l=J(L(this.c,J(a,L(c,this.m))),r):l=J(L(this.c,c),r),i.assign(c),r.assign(l)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&kt(this.accumulations.map(t=>t.variable))}setMomentum(t){this.momentum=t}getWeights(){return Q(this,null,function*(){return[yield this.saveIterations()].concat(this.accumulations.map(t=>({name:t.originalName,tensor:t.variable})))})}setWeights(t){return Q(this,null,function*(){t=yield this.extractIterations(t);const e=!1;this.accumulations=t.map(s=>({originalName:s.name,variable:s.tensor.variable(e)}))})}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(t,e){return new t(e.learningRate,e.momentum,e.useNesterov)}}class Bm extends Ts{static get className(){return"RMSProp"}constructor(t,e=.9,s=0,o=null,r=!1){if(super(),this.learningRate=t,this.decay=e,this.momentum=s,this.epsilon=o,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=r,o==null&&(this.epsilon=M.backend.epsilon()),t==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,o)=>{const r=M.registeredVariables[s],i=!1;this.accumulatedMeanSquares[o]==null&&(this.accumulatedMeanSquares[o]={originalName:`${s}/rms`,variable:W(()=>Tt(r).variable(i))}),this.accumulatedMoments[o]==null&&(this.accumulatedMoments[o]={originalName:`${s}/momentum`,variable:W(()=>Tt(r).variable(i))}),this.accumulatedMeanGrads[o]==null&&this.centered&&(this.accumulatedMeanGrads[o]={originalName:`${s}/mg`,variable:W(()=>Tt(r).variable(i))});const a=Array.isArray(t)?t[o].tensor:t[s];if(a==null)return;const l=this.accumulatedMeanSquares[o].variable,c=this.accumulatedMoments[o].variable;W(()=>{const u=J(L(l,this.decay),L(jt(a),1-this.decay));if(this.centered){const h=this.accumulatedMeanGrads[o].variable,d=J(L(h,this.decay),L(a,1-this.decay)),p=ft(L(a,this.learningRate),Fe(gt(u,J(jt(d),this.epsilon)))),f=J(L(c,this.momentum),p);l.assign(u),h.assign(d),c.assign(f);const m=gt(r,f);r.assign(m)}else{const h=J(L(l,this.decay),L(jt(a),1-this.decay)),d=J(L(c,this.momentum),ft(L(a,this.learningRate),Fe(J(h,this.epsilon))));l.assign(h),c.assign(d);const p=gt(r,d);r.assign(p)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&kt(this.accumulatedMeanSquares.map(t=>t.variable)),this.accumulatedMeanGrads!=null&&this.centered&&kt(this.accumulatedMeanGrads.map(t=>t.variable)),this.accumulatedMoments!=null&&kt(this.accumulatedMoments.map(t=>t.variable))}getWeights(){return Q(this,null,function*(){const t=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&t.push(...this.accumulatedMeanGrads),[yield this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))})}setWeights(t){return Q(this,null,function*(){t=yield this.extractIterations(t);const e=this.centered?t.length/3:t.length/2,s=!1;this.accumulatedMeanSquares=t.slice(0,e).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})),this.accumulatedMoments=t.slice(e,e*2).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})),this.centered&&(this.accumulatedMeanGrads=t.slice(e*2,e*3).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})))})}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(t,e){return new t(e.learningRate,e.decay,e.momentum,e.epsilon,e.centered)}}const SS=[_m,Om,Lm,Mm,Pm,Bm,Ph];function NS(){for(const n of SS)Z(n)}const TS="model",ES=".json",RS=".weights.bin";function zm(n){return new Promise(t=>setTimeout(t)).then(n)}class uo{constructor(t){if(!U().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(uo.URL_SCHEME)&&(t=t.slice(uo.URL_SCHEME.length)),(t==null||t.length===0)&&(t=TS),this.modelJsonFileName=t+ES,this.weightDataFileName=t+RS}save(t){return Q(this,null,function*(){if(typeof document=="undefined")throw new Error("Browser downloads are not supported in this environment since `document` is not present");const e=$s.join(t.weightData),s=window.URL.createObjectURL(new Blob([e],{type:"application/octet-stream"}));if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const o=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],r=Lf(t,o),i=window.URL.createObjectURL(new Blob([JSON.stringify(r)],{type:"application/json"})),a=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(a.download=this.modelJsonFileName,a.href=i,yield zm(()=>a.dispatchEvent(new MouseEvent("click"))),t.weightData!=null){const l=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;l.download=this.weightDataFileName,l.href=s,yield zm(()=>l.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:xl(t)}}})}}uo.URL_SCHEME="downloads://";const AS=n=>U().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(uo.URL_SCHEME)?DS(n.slice(uo.URL_SCHEME.length)):null;we.registerSaveRouter(AS);function DS(n="model"){return new uo(n)}function Vm(n,t,e,s){i(n),e=e==null?0:e,s=s==null?1:s,a(e,s);let o=0;const r=l=>(l.then(c=>{const u=e+ ++o/n.length*(s-e);return t(u),c}),l);function i(l){k(l!=null&&Array.isArray(l)&&l.length>0,()=>"promises must be a none empty array")}function a(l,c){k(l>=0&&l<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${l}`),k(c>=0&&c<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${c}`),k(c>=l,()=>`startFraction must be no more than endFraction, but got startFraction ${l} and endFraction ${c}`)}return Promise.all(n.map(r))}function FS(n,t){return Q(this,null,function*(){t==null&&(t={});const e=t.fetchFunc==null?U().platform.fetch:t.fetchFunc,s=n.map(h=>e(h,t.requestInit,{isBinary:!0})),a=(t.onProgress==null?yield Promise.all(s):yield Vm(s,t.onProgress,0,.5)).map(h=>h.arrayBuffer());return t.onProgress==null?yield Promise.all(a):yield Vm(a,t.onProgress,.5,1)})}function _S(n,t){var e;const s=t.fetchFunc==null?U().platform.fetch:t.fetchFunc;let o=0,r;return(e=t.onProgress)===null||e===void 0||e.call(t,0),new ReadableStream({pull:i=>Q(null,null,function*(){for(var a;o<n.length;){r||(r=(yield s(n[o],t.requestInit,{isBinary:!0})).body.getReader());const{done:l,value:c}=yield r.read();if(l){o++,r=void 0,(a=t.onProgress)===null||a===void 0||a.call(t,o/n.length);continue}i.enqueue(c);return}i.close()})})}const OS="application/octet-stream",LS="application/json";class Bh{constructor(t,e){if(this.DEFAULT_METHOD="POST",e==null&&(e={}),this.weightPathPrefix=e.weightPathPrefix,this.weightUrlConverter=e.weightUrlConverter,e.fetchFunc!=null?(k(typeof e.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=e.fetchFunc):this.fetch=U().platform.fetch,k(t!=null&&t.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(t)&&k(t.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${t.length}).`),this.path=t,e.requestInit!=null&&e.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=e.requestInit||{},this.loadOptions=e}save(t){return Q(this,null,function*(){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const e=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);e.body=new FormData;const s=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],o=Lf(t,s);if(e.body.append("model.json",new Blob([JSON.stringify(o)],{type:LS}),"model.json"),t.weightData!=null){const i=$s.join(t.weightData);e.body.append("model.weights.bin",new Blob([i],{type:OS}),"model.weights.bin")}const r=yield this.fetch(this.path,e);if(r.ok)return{modelArtifactsInfo:xl(t),responses:[r]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${r.status}.`)})}loadModelJSON(){return Q(this,null,function*(){const t=yield this.fetch(this.path,this.requestInit);if(!t.ok)throw new Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);let e;try{e=yield t.json()}catch(r){let i=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?i+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":i+=" Please make sure the server is serving valid JSON for this request.",new Error(i)}const s=e.modelTopology,o=e.weightsManifest;if(s==null&&o==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return e})}load(){return Q(this,null,function*(){if(this.loadOptions.streamWeights)return this.loadStream();const t=yield this.loadModelJSON();return Qw(t,e=>this.loadWeights(e))})}loadStream(){return Q(this,null,function*(){const t=yield this.loadModelJSON(),e=yield this.getWeightUrls(t.weightsManifest),s=Mf(t.weightsManifest),o=()=>_S(e,this.loadOptions);return Object.assign(Object.assign({},t),{weightSpecs:s,getWeightStream:o})})}getWeightUrls(t){return Q(this,null,function*(){const e=Array.isArray(this.path)?this.path[1]:this.path,[s,o]=MS(e),r=this.weightPathPrefix||s,i=[],a=[];for(const l of t)for(const c of l.paths)this.weightUrlConverter!=null?a.push(this.weightUrlConverter(c)):i.push(r+c+o);return this.weightUrlConverter&&i.push(...yield Promise.all(a)),i})}loadWeights(t){return Q(this,null,function*(){const e=yield this.getWeightUrls(t),s=Mf(t),o=yield FS(e,this.loadOptions);return[s,o]})}}Bh.URL_SCHEME_REGEX=/^https?:\/\//;function MS(n){const t=n.lastIndexOf("/"),e=n.lastIndexOf("?"),s=n.substring(0,t),o=e>t?n.substring(e):"";return[s+"/",o]}function Wm(n){return n.match(Bh.URL_SCHEME_REGEX)!=null}const Um=(n,t)=>{if(typeof fetch=="undefined"&&(t==null||t.fetchFunc==null))return null;{let e=!0;if(Array.isArray(n)?e=n.every(s=>Wm(s)):e=Wm(n),e)return PS(n,t)}return null};we.registerSaveRouter(Um),we.registerLoadRouter(Um);function PS(n,t){return new Bh(n,t)}function zh(n,t){const e=n.shape.length,s=t.shape.length;if(e<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${e}.`);if(s<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${s}.`);if(t.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[s-1]>e)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[s-1]} vs. ${e}`);if(X(n.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${n.shape}.`);const o=t.shape,r=o[o.length-1];let i=1;for(let h=0;h<o.length-1;++h)i*=o[h];const a=n.shape,l=o.slice();l.pop();let c=1;for(let h=r;h<e;++h)c*=a[h],l.push(a[h]);const u=[...dt(n.shape).map(h=>h/c),1].slice(0,r);return[l,i,c,u]}const Vh=-2,BS=-1;function Gm(n,t,e){const s=n.shape.length;k(s===t.length,()=>`Error in slice${s}D: Length of begin ${t} must match the rank of the array (${s}).`),k(s===e.length,()=>`Error in slice${s}D: Length of size ${e} must match the rank of the array (${s}).`);for(let o=0;o<s;++o)k(t[o]+e[o]<=n.shape[o],()=>`Error in slice${s}D: begin[${o}] + size[${o}] (${t[o]+e[o]}) would overflow input.shape[${o}] (${n.shape[o]})`)}function Hm(n,t,e){const s=[];for(let o=0;o<n.length;o++)s[o]=Math.ceil((t[o]-n[o])/e[o]);return s}function qm(n,t,e){let s=e.length;for(let o=0;o<e.length;o++)if(e[o]>1){s=o;break}for(let o=s+1;o<e.length;o++)if(t[o]>0||e[o]!==n[o])return!1;return!0}function Xm(n,t){let e=n.length>0?n[n.length-1]:1;for(let s=0;s<n.length-1;s++)e+=n[s]*t[s];return e}function Wh(n,t,e){let s;const o=n.shape.length;typeof t=="number"?s=[t,...new Array(o-1).fill(0)]:t.length<o?s=t.concat(new Array(o-t.length).fill(0)):s=t.slice(),s.forEach(i=>{k(i!==-1,()=>"slice() does not support negative begin indexing.")});let r;return e==null?r=new Array(o).fill(-1):typeof e=="number"?r=[e,...new Array(o-1).fill(-1)]:e.length<o?r=e.concat(new Array(o-e.length).fill(-1)):r=e,r=r.map((i,a)=>i>=0?i:(k(i===-1,()=>`Negative size values should be exactly -1 but got ${i} for the slice() size at index ${a}.`),n.shape[a]-s[a])),[s,r]}function Km(n,t,e,s,o,r,i,a,l){let c;if(s==null?(c=new Array(t.length),c.fill(1)):c=s,i!=null&&(i&i-1)!==0)throw new Error("Multiple ellipses in slice is not allowed.");let u=!1;const h={dims:c.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:e.slice(),strides:c.slice(),beginMask:o,endMask:r,ellipsisMask:i,newAxisMask:a,shrinkAxisMask:l};for(let w=0;w<h.dims;w++)u&&(1<<w&a)!==0&&h.numAddAxisAfterEllipsis++,1<<w&i&&(u=!0);u||(h.ellipsisMask|=1<<h.dims,h.dims++);const d={dims:n.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};zS(h,d);let p=!0,f=!0,m=!0;const g=[],x=[];for(let w=0;w<n.length;++w){if(d.strides[w]===0)throw Error(`strides[${w}] must be non-zero`);const y=!!(d.shrinkAxisMask&1<<w),$=n[w];if($===-1){g.push(y?1:-1);continue}const I=[d.beginMask&1<<w,d.endMask&1<<w],v=[d.strides[w]>0?0:-1,d.strides[w]>0?$:$-1];if(y&&d.strides[w]<=0)throw Error("only stride 1 allowed on non-range indexing.");m=m&&d.strides[w]===1;const T=!!(d.beginMask&1<<w&&d.endMask&1<<w);if(d.beginValid&&d.endValid){if(y){const E=d.begin[w]<0?$+d.begin[w]:d.begin[w];if(d.begin[w]=E,d.end[w]=d.begin[w]+1,E<0||E>=$)throw Error(`slice index ${d.begin[w]} of dimension ${w} out of bounds.`)}else d.begin[w]=jm(d.begin[w],0,d.strides[w],$,I,v),d.end[w]=jm(d.end[w],1,d.strides[w],$,I,v);const C=d.strides[w]===1&&d.begin[w]===0&&d.end[w]===$;p=p&&C,f=f&&(w===0&&d.strides[w]===1||C)}else p=p&&d.strides[w]===1&&T,f=f&&(w===0&&d.strides[w]===1||T);let S,N=!1;if(d.beginValid&&d.endValid?(S=d.end[w]-d.begin[w],N=!0):y?(S=1,N=!0):T&&$>=0&&(d.strides[w]<0?S=-$:S=$,N=!0),N){let C;S===0||S<0!=d.strides[w]<0?C=0:C=Math.trunc(S/d.strides[w])+(S%d.strides[w]!==0?1:0),g.push(C)}else g.push(-1)}for(let w=0;w<d.finalShapeGatherIndices.length;++w){const y=d.finalShapeGatherIndices[w];y>=0?x.push(g[y]):y===Vh&&x.push(1)}return{finalShapeSparse:x.filter((w,y)=>d.finalShapeGatherIndices[y]!==Vh),finalShape:x,isIdentity:p,sliceDim0:f,isSimpleSlice:m,begin:d.begin,end:d.end,strides:d.strides}}function zS(n,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let e=0;t.beginValid=n.begin!=null,t.endValid=n.end!=null,t.begin=new Array(t.dims),t.end=new Array(t.dims),t.strides=new Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=new Array(t.dims);for(let s=0;s<n.dims;s++)if(1<<s&n.ellipsisMask){const o=Math.min(t.dims-(n.dims-s)+1+n.numAddAxisAfterEllipsis,t.dims);for(;e<o;e++)t.begin[e]=0,t.end[e]=0,t.strides[e]=1,t.beginMask|=1<<e,t.endMask|=1<<e,t.finalShapeGatherIndices.push(e),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[e]=s}else if(1<<s&n.newAxisMask)t.finalShapeGatherIndices.push(Vh),t.finalShapeGatherIndicesSparse.push(-1);else{if(e===t.begin.length)throw Error(`Index out of range using input dim ${e}; input has only ${t.dims} dims, ${t.begin.length}.`);n.begin!=null&&(t.begin[e]=n.begin[s]),n.end!=null&&(t.end[e]=n.end[s]),t.strides[e]=n.strides[s],n.beginMask&1<<s&&(t.beginMask|=1<<e),n.endMask&1<<s&&(t.endMask|=1<<e),n.shrinkAxisMask&1<<s?(t.finalShapeGatherIndices.push(BS),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<e):(t.finalShapeGatherIndices.push(e),t.finalShapeGatherIndicesSparse.push(s)),t.inputShapeGatherIndicesSparse[e]=s,e++}}function jm(n,t,e,s,o,r){if(o[t])return e>0?r[t]:r[t+1&1];{const i=n<0?s+n:n;return i<r[0]?r[0]:i>r[1]?r[1]:i}}class VS{static sgd(t){return new Ph(t)}static momentum(t,e,s=!1){return new Pm(t,e,s)}static rmsprop(t,e=.9,s=0,o=null,r=!1){return new Bm(t,e,s,o,r)}static adam(t=.001,e=.9,s=.999,o=null){return new Lm(t,e,s,o)}static adadelta(t=.001,e=.95,s=null){return new _m(t,e,s)}static adamax(t=.002,e=.9,s=.999,o=null,r=0){return new Mm(t,e,s,o,r)}static adagrad(t,e=.1){return new Om(t,e)}}const Ko=VS;const WS=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:typeof setImmediate!="undefined"?setImmediate:n=>n();function Ym(){return new Promise(n=>WS(()=>n()))}function Uh(n,t){const e=n[0].length;n.forEach((o,r)=>{k(o.length===e,()=>`Error in concat${e}D: rank of tensors[${r}] must be the same as the rank of the rest (${e})`)}),k(t>=0&&t<e,()=>`Error in concat${e}D: axis must be between 0 and ${e-1}.`);const s=n[0];n.forEach((o,r)=>{for(let i=0;i<e;i++)k(i===t||o[i]===s[i],()=>`Error in concat${e}D: Shape of tensors[${r}] (${o}) does not match the shape of the rest (${s}) along the non-concatenated axis ${r}.`)})}function Xn(n,t){const e=n[0].slice();for(let s=1;s<n.length;s++)e[t]+=n[s][t];return e}var Dn;(function(n){n[n.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",n[n.VALUE_ROWIDS=1]="VALUE_ROWIDS",n[n.ROW_LENGTHS=2]="ROW_LENGTHS",n[n.ROW_SPLITS=3]="ROW_SPLITS",n[n.ROW_LIMITS=4]="ROW_LIMITS",n[n.ROW_STARTS=5]="ROW_STARTS"})(Dn||(Dn={}));function Zm(n,t,e){let s=new Array;if(e==null&&t==null)return s;if(t==null)for(;s.length<n+e.length;)s.push(-1);else s=t.slice();if(e==null)return s;if(n+e.length!==s.length)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${n+e.length}, but shape.rank = ${s.length}`);for(let o=1;o<e.length;++o){const r=e[o],i=s[s.length-e.length+o],a=s[i];if(r>=0)if(a>=0){if(a!==r)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${o+n}] = ${r} but shape[${o+n}] = ${a}`)}else s[i]=r}return s}function Qm(n){const t={FIRST_DIM_SIZE:Dn.FIRST_DIM_SIZE,VALUE_ROWIDS:Dn.VALUE_ROWIDS,ROW_LENGTHS:Dn.ROW_LENGTHS,ROW_SPLITS:Dn.ROW_SPLITS,ROW_LIMITS:Dn.ROW_LIMITS,ROW_STARTS:Dn.ROW_STARTS},e=[];for(const s of n)if(s in t)e.push(t[s]);else break;return e}function Jm(n){return n.length===0?0:n[0]===Dn.FIRST_DIM_SIZE?n.length-1:n.length}function tg(n,t){if(n==null||t==null)return;const e=n.length,s=t.length;if(e>=s)throw new Error(`defaultValue.shape=${n} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${e} must be less than ragged tensor input flatValues.rank = ${s})`);for(let o=0;o<Math.min(e,s-1);++o){const r=n[o],i=t[o+1];if(r>=0&&i>=0&&r!==1&&r!==i)throw new Error(`defaultValue.shape=${n}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${o-n.length}] = ${r} but ragged tensor input.flatValues.shape[${o-n.length}] = ${i}`)}}const Gh=30;function Ll(n){return n<=Gh?n:Kc(n,Math.floor(Math.sqrt(n)))}function Hh(n,t,e){const s=e*(typeof n=="number"?n:n[0]),o=t*(typeof n=="number"?n:n[1]);return[s,o]}function Si(n,t,e,s=!0){let o=[];if(s)o=o.concat(t.slice(0)),o.push(n[0]/e),o=o.concat(n.slice(1));else{o=o.concat(n[0]);const r=t.length;for(let i=0;i<r;++i)o=o.concat([n[i+1]/t[i],t[i]]);o=o.concat(n.slice(r+1))}return o}function Ni(n,t,e=!0){const s=[];if(e){s.push(t);for(let o=t+1;o<n;++o)o<=2*t?(s.push(o),s.push(o-(t+1))):s.push(o)}else{const o=[],r=[];for(let i=1;i<n;++i)i>=t*2+1||i%2===1?r.push(i):o.push(i);s.push(...o),s.push(0),s.push(...r)}return s}function Ti(n,t,e,s=!0){const o=[];s?o.push(n[0]/e):o.push(n[0]*e);for(let r=1;r<n.length;++r)r<=t.length?s?o.push(t[r-1]*n[r]):o.push(n[r]/t[r-1]):o.push(n[r]);return o}function qh(n,t){const e=[0];for(let s=0;s<t;++s)e.push(n[s][0]);return e}function Xh(n,t,e){const s=n.slice(0,1);for(let o=0;o<e;++o)s.push(n[o+1]-t[o][0]-t[o][1]);return s}const Ml=1.7580993408473768,Pl=1.0507009873554805;const Kh=.3275911,jh=.254829592,Yh=-.284496736,Zh=1.421413741,Qh=-1.453152027,Jh=1.061405429;function ds(n,t){if(n.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${n.length}, imag: ${t.length}.`);const e=new Float32Array(n.length*2);for(let s=0;s<e.length;s+=2)e[s]=n[s/2],e[s+1]=t[s/2];return e}function eg(n){const t=new Float32Array(n.length/2),e=new Float32Array(n.length/2);for(let s=0;s<n.length;s+=2)t[s/2]=n[s],e[s/2]=n[s+1];return{real:t,imag:e}}function ng(n){const t=Math.ceil(n.length/4),e=new Float32Array(t),s=new Float32Array(t);for(let o=0;o<n.length;o+=4)e[Math.floor(o/4)]=n[o],s[Math.floor(o/4)]=n[o+1];return{real:e,imag:s}}function sg(n){const t=Math.floor(n.length/4),e=new Float32Array(t),s=new Float32Array(t);for(let o=2;o<n.length;o+=4)e[Math.floor(o/4)]=n[o],s[Math.floor(o/4)]=n[o+1];return{real:e,imag:s}}function td(n,t){const e=n[t*2],s=n[t*2+1];return{real:e,imag:s}}function og(n,t,e,s){n[s*2]=t,n[s*2+1]=e}function rg(n,t){const e=new Float32Array(n/2),s=new Float32Array(n/2);for(let o=0;o<Math.ceil(n/2);o++){const r=(t?2:-2)*Math.PI*(o/n);e[o]=Math.cos(r),s[o]=Math.sin(r)}return{real:e,imag:s}}function ig(n,t,e){const s=(e?2:-2)*Math.PI*(n/t),o=Math.cos(s),r=Math.sin(s);return{real:o,imag:r}}const ed="->",US=/->/g,ag=",",lg="...";function nd(n,t){n=n.replace(/\s/g,"");const e=(n.length-n.replace(US,"").length)/ed.length;if(e<1)throw new Error("Equations without an arrow are not supported.");if(e>1)throw new Error(`Equation must contain exactly one arrow ("${ed}").`);const[s,o]=n.split(ed);k(s.indexOf(lg)===-1,()=>`The ellipsis notation ("${lg}") is not supported yet.`);const r=s.split(ag),i=r.length;if(t!==i)throw new Error(`Expected ${i} input tensors, received ${t}`);if(i>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");const a=[];for(let d=0;d<o.length;++d){const p=o[d];if(!r.some(f=>f.indexOf(p)!==-1))throw new Error(`Output subscripts contain the label ${p} not present in the input subscripts.`);a.indexOf(p)===-1&&a.push(p)}for(let d=0;d<s.length;++d){const p=s[d];a.indexOf(p)===-1&&p!==ag&&a.push(p)}const l=new Array(r.length);for(let d=0;d<i;++d){if(new Set(r[d].split("")).size!==r[d].length)throw new Error(`Found duplicate axes in input component ${r[d]}. Support for duplicate axes in input is not implemented yet.`);l[d]=[];for(let p=0;p<r[d].length;++p)l[d].push(a.indexOf(r[d][p]))}const c=a.length,u=o.length,h=[];for(let d=u;d<c;++d)h.push(d);return{allDims:a,summedDims:h,idDims:l}}function sd(n,t){let e=new Array(n);e.fill(-1);for(let o=0;o<t.length;++o)e[t[o]]=o;const s=[];for(let o=0;o<n;++o)e[o]===-1&&s.push(o);return e=e.filter(o=>o!==-1),{permutationIndices:e,expandDims:s}}function od(n,t,e){const s=new Array(n);for(let o=0;o<e.length;++o){const r=e[o].shape;for(let i=0;i<t[o].length;++i)s[t[o][i]]===void 0?s[t[o][i]]=r[i]:k(s[t[o][i]]===r[i],()=>`Expected dimension ${s[t[o][i]]} at axis ${i} of input shaped ${JSON.stringify(r)}, but got dimension ${r[i]}`)}}function rd(n,t){const e=n,s=[];let o=0;n.length===0&&e.push(-1),o=n.length+1;for(let i=0;i<o;++i)s.push([]);const r=[];for(let i=0;i<e.length;++i){const a=e[i],l=GS(t,a);for(const c of l)r.indexOf(c)===-1&&(s[i].push(c),r.push(c))}return{path:e,steps:s}}function id(n){return n.every((t,e)=>t===e)}function GS(n,t){const e=[];for(let s=0;s<n.length;++s)(n[s].length===0||n[s].indexOf(t)!==-1||t===-1)&&e.push(s);return e}function ad(n,t,e=0){let s=[];if(typeof t=="number")k(n.shape[e]%t===0,()=>"Number of splits must evenly divide the axis."),s=new Array(t).fill(n.shape[e]/t);else{const o=t.reduce((i,a)=>(a===-1&&(i+=1),i),0);k(o<=1,()=>"There should be only one negative value in split array.");const r=t.indexOf(-1);if(r!==-1){const i=t.reduce((a,l)=>l>0?a+l:a);t[r]=n.shape[e]-i}k(n.shape[e]===t.reduce((i,a)=>i+a),()=>"The sum of sizes must match the size of the axis dimension."),s=t}return s}function cg(n){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${n}`}function ug(n,t){return`indices(${n}, 0) is invalid: ${t} < 0`}function hg(n,t,e){return`indices(${n}, 0) is invalid: ${t} >= ${e}`}function dg(n,t){return`only one output dimension may be -1, not both ${n} and ${t}`}function pg(n,t){return`size ${n} must be non-negative, not ${t}`}function fg(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function mg(n,t){const e=X(n),s=X(t);return`Input to reshape is a SparseTensor with ${e}
  dense values, but the requested shape requires a multiple of ${s}. inputShape=${n} outputShape= ${t}`}function gg(n,t){const e=X(n),s=X(t);return`Input to reshape is a tensor with ${e} dense values, but the requested shape has ${s}. inputShape=${n} outputShape=${t}`}function ld(){return"segment ids must be >= 0"}function xg(){return"segment ids are not increasing"}function bg(n,t){return`Segment id ${n} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function yg(n,t,e){return`Bad: indices[${n}] == ${t} out of range [0, ${e})`}function HS(n,t){let e=!1,s;for(n<=Gh?(s=n,e=!0):s=Kc(n,Math.floor(Math.sqrt(n)));!e;)s>t||s===n?e=!0:s=Kc(n,s+1);return s}function qS(n,t,e){const s=[],o=n.length;for(let r=0;r<o;r++)r!==t?s.push(n[r]):s.push(e);return s}function wg(n,t,e,s){const o=t.shape.length,r=n.shape.length;if(s!==0&&(s<-o||s>o))throw new Error(`Expect batchDims in the range of [-${o}, ${o}], but got ${s}`);if(s<0&&(s+=o),s>r)throw new Error(`batchDims (${s}) must be less than rank(x) (
    ${r}).`);if(e<s)throw new Error(`batchDims (${s}) must be less than or equal to axis (${e}).`);for(let h=0;h<s;++h)if(n.shape[h]!==t.shape[h])throw new Error(`x.shape[${h}]: ${n.shape[h]} should be equal to indices.shape[${h}]: ${t.shape[h]}.`);const i=n.shape[e],a=[];let l=1,c=1,u=1;for(let h=0;h<s;++h)a.push(n.shape[h]),l*=n.shape[h];for(let h=s;h<e;h++)a.push(n.shape[h]),c*=n.shape[h];for(let h=s;h<o;h++)a.push(t.shape[h]);for(let h=e+1;h<r;h++)a.push(n.shape[h]),u*=n.shape[h];return{batchSize:l,sliceSize:u,outerSize:c,dimSize:i,outputShape:a}}function ps(n){try{return n.map(t=>Cs(t))}catch(t){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${t}`)}}function Cg(n){return n.map(t=>ws(t))}var XS=Object.freeze({__proto__:null,ERF_A1:jh,ERF_A2:Yh,ERF_A3:Zh,ERF_A4:Qh,ERF_A5:Jh,ERF_P:Kh,PARALLELIZE_THRESHOLD:Gh,get RowPartitionType(){return Dn},SELU_SCALE:Pl,SELU_SCALEALPHA:Ml,applyActivation:Dh,assertAndGetBroadcastShape:yt,assertAxesAreInnerMostDims:Se,assertParamsConsistent:Uh,assignToTypedArray:og,axesAreInnerMostDims:dh,calculateShapes:lo,checkEinsumDimSizes:od,checkPadOnDimRoundingMode:Xe,combineLocations:tm,combineRaggedTensorToTensorShapes:Zm,complexWithEvenIndex:ng,complexWithOddIndex:sg,computeConv2DInfo:ke,computeConv3DInfo:vs,computeDefaultPad:oh,computeDilation2DInfo:mi,computeOptimalWindowSize:Ll,computeOutAndReduceShapes:Ce,computeOutShape:Xn,computePool2DInfo:pn,computePool3DInfo:as,convertConv2DDataFormat:ls,decodeEinsumEquation:nd,eitherStridesOrDilationsAreOne:De,expandShapeToKeepDim:le,exponent:ig,exponents:rg,fromStringArrayToUint8:Cg,fromUint8ToStringArray:ps,getAxesPermutation:Qt,getBroadcastDims:Uo,getComplexWithIndex:td,getEinsumComputePath:rd,getEinsumPermutation:sd,getFusedBiasGradient:Ah,getFusedDyActivation:Rh,getImageCenter:Hh,getInnerMostAxes:se,getPermuted:Ni,getRaggedRank:Jm,getReductionAxes:he,getReshaped:Si,getReshapedPermuted:Ti,getRowPartitionTypesHelper:Qm,getSliceBeginCoords:qh,getSliceSize:Xh,getSparseFillEmptyRowsIndicesDenseShapeMismatch:cg,getSparseFillEmptyRowsNegativeIndexErrorMessage:ug,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:hg,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:fg,getSparseReshapeInputOutputMismatchErrorMessage:gg,getSparseReshapeInputOutputMultipleErrorMessage:mg,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:dg,getSparseReshapeNegativeOutputDimErrorMessage:pg,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:yg,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:ld,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:xg,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:bg,getUndoAxesPermutation:ks,isIdentityPermutation:id,mergeRealAndImagArrays:ds,prepareAndValidate:zh,prepareSplitSize:ad,shouldFuse:Fh,splitRealAndImagArrays:eg,stridesOrDilationsArePositive:no,tupleValuesAreOne:eo,upcastType:Je,validateDefaultValueShape:tg,warn:on});NS();const $g={kernelName:aa,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(n,ki(rt(e,"float32"),-1))}}};const KS={kernelName:gr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>{const s=jt(rt(e,"float32")),o=Fe(gt(Pt(1),s));return oe(ft(n,o))}}}};const jS={kernelName:xr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>{const s=Fe(gt(jt(rt(e,"float32")),1));return ft(n,s)}}}};const YS={kernelName:Oo,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t,o=yt(e.shape,s.shape);return{a:()=>{let a=n;const l=he(e.shape,o);return l.length>0&&(a=pt(a,l)),z(a,e.shape)},b:()=>{let a=n;const l=he(s.shape,o);return l.length>0&&(a=pt(a,l)),z(a,s.shape)}}}};const ZS={kernelName:Jc,saveAllInputs:!0,gradFunc:(n,t)=>{const e={};return t.forEach((s,o)=>{e[o]=()=>n.clone()}),e}};const QS={kernelName:la,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>Tt(e)}}};const JS={kernelName:ca,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>Tt(e)}}};const t2={kernelName:br,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>ft(n,Fe(gt(Pt(1),jt(rt(e,"float32")))))}}};const e2={kernelName:yr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>{const s=Fe(J(Pt(1),jt(rt(e,"float32"))));return ft(n,s)}}}};const n2={kernelName:$r,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t,o=yt(e.shape,s.shape);return{a:()=>{const a=J(jt(e),jt(s));let l=L(n,ft(s,a));const c=he(e.shape,o);return c.length>0&&(l=pt(l,c)),z(l,e.shape)},b:()=>{const a=J(jt(e),jt(s));let l=oe(L(n,ft(e,a)));const c=he(s.shape,o);return c.length>0&&(l=pt(l,c)),z(l,s.shape)}}}};const s2={kernelName:wr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>ft(n,J(jt(rt(e,"float32")),1))}}};const o2={kernelName:Cr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>ft(n,gt(Pt(1),jt(rt(e,"float32"))))}}};function r2(n,t,e,s,o,r){const i=A(n,"dy","avgPool3dGrad"),a=A(t,"input","avgPool3dGrad");let l=i,c=a,u=!1;a.rank===4&&(u=!0,l=z(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]]),c=z(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),k(l.rank===5,()=>`Error in avgPool3dGrad: dy must be rank 5 but got rank ${l.rank}.`),k(c.rank===5,()=>`Error in avgPool3dGrad: input must be rank 5 but got rank ${c.rank}.`),Xe("avgPool3dGrad",o,r);const h={dy:l,input:c},d={filterSize:e,strides:s,pad:o,dimRoundingMode:r},p=M.runKernel(su,h,d);return u?z(p,[p.shape[1],p.shape[2],p.shape[3],p.shape[4]]):p}const i2=V({avgPool3dGrad_:r2});const a2={kernelName:ha,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{filterSize:o,strides:r,pad:i,dimRoundingMode:a}=e;return{x:()=>i2(n,s,o,r,i,a)}}};function l2(n,t,e,s,o){const r=A(n,"dy","avgPoolGrad"),i=A(t,"input","avgPoolGrad");k(i.rank===r.rank,()=>`Rank of input (${i.rank}) does not match rank of dy (${r.rank})`);let a=i,l=r,c=!1;i.rank===3&&(c=!0,a=z(i,[1,i.shape[0],i.shape[1],i.shape[2]]),l=z(r,[1,r.shape[0],r.shape[1],r.shape[2]])),k(l.rank===4,()=>`Error in avgPoolGrad: dy must be rank 4 but got rank ${l.rank}.`),k(a.rank===4,()=>`Error in avgPoolGrad: input must be rank 4 but got rank ${a.rank}.`);const u={dy:l,input:a},h={filterSize:e,strides:s,pad:o},d=M.runKernel(nu,u,h);return c?z(d,[d.shape[1],d.shape[2],d.shape[3]]):d}const c2=V({avgPoolGrad_:l2});const u2={kernelName:ua,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{filterSize:o,strides:r,pad:i}=e;return{x:()=>c2(n,s,o,r,i)}}};const h2={kernelName:da,inputsToSave:["a","b"],gradFunc:(n,t,e)=>{const[s,o]=t,{transposeA:r,transposeB:i}=e;return!r&&!i?{a:()=>Mt(n,o,!1,!0),b:()=>Mt(s,n,!0,!1)}:!r&&i?{a:()=>Mt(n,o,!1,!1),b:()=>Mt(n,s,!0,!1)}:r&&!i?{a:()=>Mt(o,n,!1,!0),b:()=>Mt(s,n,!1,!1)}:{a:()=>Mt(o,n,!0,!0),b:()=>Mt(n,s,!0,!0)}}};const d2={kernelName:pa,gradFunc:(n,t,e)=>{const{blockShape:s,crops:o}=e;return{x:()=>wh(n,s,o)}}};const p2={kernelName:fw,gradFunc:(n,t,e)=>{const s=e,o=s.inputShape,r=s.shape,i=Array.from(r);for(let l=o.length-1;l>=0;l--)if(o[l]===r[l])i[l]=1;else if(o[l]!==1)throw new Error(`broadcastTo(): [${o}] cannot be broadcast to [${r}].`);const a=[];for(let l=0;l<i.length;l++)i[l]>1&&a.push(l);return{x:()=>pt(n,a,!0)}}};const f2={kernelName:Ir,gradFunc:n=>({x:()=>n.clone()})};const m2={kernelName:vr,gradFunc:n=>({x:()=>Tt(n)})};const g2={kernelName:kr,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{clipValueMin:o,clipValueMax:r}=e;return{x:()=>Be(cs(ro(s,o),Go(s,r)),n,Tt(n))}}};const x2={kernelName:fa,inputsToSave:["x"],gradFunc:$g.gradFunc};const b2={kernelName:ma,saveAllInputs:!0,gradFunc:(n,t,e)=>{const s=t.map(l=>l.shape),{axis:o}=e,r=$t(o,t[0].shape)[0],i=s.map(l=>l[r]);return cn(n,i,r).map(l=>()=>l)}};const y2={kernelName:ga,inputsToSave:["x","filter"],gradFunc:(n,t,e)=>{const[s,o]=t,{dilations:r,strides:i,pad:a,dataFormat:l}=e;return k(eo(r),()=>`Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${r}'`),{x:()=>lh(s.shape,n,o,i,a,l),filter:()=>Eh(s,n,o.shape,i,a,l)}}};const w2={kernelName:xa,inputsToSave:["dy","filter"],gradFunc:(n,t,e)=>{const[s,o]=t,{strides:r,pad:i,dataFormat:a,dimRoundingMode:l}=e;return{dy:()=>so(n,o,r,i,a,1,l),filter:()=>Eh(n,s,o.shape,r,i,a,l)}}};function C2(n,t,e,s,o){let r=n;n.rank===4&&(r=z(n,[1,n.shape[0],n.shape[1],n.shape[2],n.shape[3]]));let i=t;i.rank===4&&(i=z(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]])),k(r.rank===5,()=>`Error in conv3dDerFilter: input must be rank 5, but got shape ${r.shape}.`),k(i.rank===5,()=>`Error in conv3dDerFilter: dy must be rank 5, but got shape ${i.shape}.`),k(e.length===5,()=>`Error in conv3dDerFilter: filterShape must be length 5, but got ${e}.`),k(r.shape[4]===e[3],()=>`Error in conv3dDerFilter: depth of input ${r.shape[4]}) must match input depth in filter (${e[3]}.`),k(i.shape[4]===e[4],()=>`Error in conv3dDerFilter: depth of dy (${i.shape[4]}) must match output depth for filter (${e[4]}).`);const a={x:r,dy:i},l={strides:s,pad:o,filterShape:e};return M.runKernel(lu,a,l)}const $2=V({conv3DBackpropFilter_:C2});const I2={kernelName:ba,inputsToSave:["x","filter"],gradFunc:(n,t,e)=>{const{dilations:s,strides:o,pad:r}=e;k(eo(s),()=>`Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${s}'`);const[i,a]=t;return{x:()=>jf(i.shape,n,a,o,r),filter:()=>$2(i,n,a.shape,o,r)}}};const v2={kernelName:Sr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(oe($m(rt(e,"float32"))),n)}}};const k2={kernelName:Nr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(Im(rt(e,"float32")),n)}}};const S2={kernelName:ya,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{axis:o,exclusive:r,reverse:i}=e;return{x:()=>{const a=Qt([o],s.rank);let l=Zf(n,o,r,!i);return a!=null&&(l=Et(l,a)),l}}}};const N2={kernelName:wa,inputsToSave:["x","filter"],gradFunc:(n,t,e)=>{const{dilations:s,strides:o,pad:r,dimRoundingMode:i}=e,a=s==null?[1,1]:s;k(eo(a),()=>`Error in gradient of depthwiseConv2dNative: dilation rates greater than 1 are not yet supported. Got dilations '${a}'`);const[l,c]=t;return k(l.rank===4,()=>`Error in gradient of depthwiseConv2dNative: input must be rank 4, but got rank ${l.rank}.`),k(c.rank===4,()=>`Error in gradient of depthwiseConv2dNative: filter must be rank 4, but got rank ${c.rank}.`),k(l.shape[3]===c.shape[2],()=>`Error in gradient of depthwiseConv2d: number of input channels (${l.shape[3]}) must match the inChannels dimension in filter ${c.shape[2]}.`),k(De(o,a),()=>`Error in gradient of depthwiseConv2d: Either strides or dilations must be  1. Got strides ${o} and dilations '${a}'.`),Xe("depthwiseConv2d",r,i),{x:()=>_k(l.shape,n,c,o,r,a,i),filter:()=>Dk(l,n,c.shape,o,r,a,i)}}};const T2={kernelName:Ca,inputsToSave:["x","filter"],gradFunc:(n,t,e)=>{const[s,o]=t,r={x:s,filter:o,dy:n},i={x:s,filter:o,dy:n};return{x:()=>M.runKernel(gu,r,e),filter:()=>M.runKernel(xu,i,e)}}};const E2={kernelName:Er,outputsToSave:[!0],gradFunc:(n,t)=>{const[e]=t,s={dy:n,y:e};return{x:()=>M.runKernel(yu,s)}}};const R2={kernelName:Rr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t,s=L(Hn(oe(jt(e))),2/Math.sqrt(Math.PI));return{x:()=>L(n,s)}}};const A2={kernelName:Ar,outputsToSave:[!0],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(n,e)}}};const D2={kernelName:Ia,inputsToSave:["input"],gradFunc:(n,t)=>{const[e]=t;return{input:()=>z(n,e.shape)}}};const F2={kernelName:Dr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(n,Hn(e))}}};const _2={kernelName:Fr,gradFunc:n=>({x:()=>Tt(n)})};const O2={kernelName:_r,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t,o=yt(e.shape,s.shape);return{a:()=>{const a=ft(n,rt(s,"float32")),l=he(e.shape,o);return l.length>0?z(pt(a,l),e.shape):a},b:()=>{let a=L(n,rt(e,"float32"));const l=he(s.shape,o);l.length>0&&(a=z(pt(a,l),s.shape));const c=jt(s);return oe(ft(a,rt(c,"float32")))}}}};const L2={kernelName:va,inputsToSave:["x","mean","variance","scale"],gradFunc:(n,t,e)=>{const{varianceEpsilon:s}=e,[o,r,i,a]=t,l=a==null?Pt(1):a,c=he(r.shape,o.shape),u=[];if(r.rank===1){for(let y=0;y<o.shape.length-1;++y)u.push(o.shape[y]);u.push(1)}const h=gt(o,r),d=L(n,l),p=ym(J(i,Pt(s))),f=L(L(L(p,p),p),Pt(-.5));return{x:()=>r.rank===1?z(L(L(n,An(z(p,[1,1,1,r.shape[0]]),u)),l),o.shape):z(L(L(n,p),l),o.shape),mean:()=>{let y=L(L(p,Pt(-1)),d);return r.rank===1&&(y=pt(y,c)),z(y,r.shape)},variance:()=>{let y=L(L(f,h),d);return r.rank===1&&(y=pt(y,c)),z(y,r.shape)},scale:()=>{const y=L(h,p);let $=L(n,y);return r.rank===1&&($=pt($,c)),z($,r.shape)},offset:()=>{let y=n;return r.rank===1&&(y=pt(y,c)),z(y,r.shape)}}}};const M2={kernelName:ka,inputsToSave:["x","indices"],gradFunc:(n,t,e)=>{const[s,o]=t,{axis:r,batchDims:i}=e,a=$t(r,s.shape)[0],l=(c,u,h)=>()=>{const d=c.shape,p=u.size,f=d.slice(0,a),m=f.length,g=d.slice(r,d.length).slice(1),x=g.length,b=Ig(0,m),w=Ig(m+1,m+1+x),y=vg([f,[p],g]),$=z(h,y),I=z(u,[p]),v=vg([[m],b,w]),T=Et($,v);let S=Nm(T,I,c.shape[a]);const N=ks(v);return S=Et(S,N),S};if(i===1){const c=s.shape[0],u=s.split(c,0);return{x:()=>us(u.map((p,f)=>l(p,o.slice(f,1),n.slice(f,1))())).reshape(s.shape),indices:()=>o}}else return{x:l(s,o,n),indices:()=>o}}};function Ig(n,t){const e=[];for(let s=n;s<t;++s)e.push(s);return e}function vg(n){const t=[];for(let e=0;e<n.length;++e)for(let s=0;s<n[e].length;++s)t.push(n[e][s]);return t}const P2={kernelName:Or,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t;return{a:()=>Tt(e),b:()=>Tt(s)}}};const B2={kernelName:Lr,gradFunc:n=>({x:()=>rt(n,"float32")})};const z2={kernelName:Mr,gradFunc:n=>({x:()=>Tt(n)})};const V2={kernelName:Pr,gradFunc:n=>({x:()=>Tt(n)})};const W2={kernelName:Br,gradFunc:n=>({x:()=>Tt(n)})};const U2={kernelName:Na,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{alpha:o}=e,r=ln(s,0);return{x:()=>Be(r,n,L(n,o))}}};const G2={kernelName:Vr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>ft(n,J(e,1))}}};const H2={kernelName:zr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>ft(n,rt(e,"float32"))}}};const q2={kernelName:gw,inputsToSave:[],outputsToSave:[!0],gradFunc:(n,t,e)=>{const[s]=t,{axis:o}=e;return{logits:()=>{const i=Hn(s);return gt(n,L(pt(n,o,!0),i))}}}};function X2(n,t,e,s=5,o=1,r=1,i=.5){const a={x:n,y:t,dy:e},l={depthRadius:s,bias:o,alpha:r,beta:i};return M.runKernel(ku,a,l)}const K2=V({localResponseNormalizationBackprop_:X2});const j2={kernelName:Fa,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,t,e)=>{const[s,o]=t,{depthRadius:r,bias:i,alpha:a,beta:l}=e;return{x:()=>K2(s,o,n,r,i,a,l)}}};function kg(n,t,e,s){return t.rank<e.rank&&(t=z(t,le(t.shape,s))),n.rank<e.rank&&(n=z(n,le(n.shape,s))),{x:()=>L(n,rt(Gn(e,t),n.dtype))}}const Sg={kernelName:_a,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,t,e)=>{const s=e,{reductionIndices:o}=s,r=t[0],i=t[1],a=$t(o,r.shape),l=kg(n,i,r,a);return{x:()=>l.x()}}};const Y2={kernelName:Wr,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t;return{a:()=>L(n,rt(ro(e,s),"float32")),b:()=>L(n,rt(kl(e,s),"float32"))}}};function Z2(n,t,e,s,o,r,i){const a=A(n,"dy","maxPool3dGrad"),l=A(t,"input","maxPool3dGrad"),c=A(e,"output","maxPool3dGrad");let u=a,h=l,d=c,p=!1;l.rank===4&&(p=!0,u=z(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]]),h=z(l,[1,l.shape[0],l.shape[1],l.shape[2],l.shape[3]]),d=z(c,[1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]])),k(u.rank===5,()=>`Error in maxPool3dGrad: dy must be rank 5 but got rank ${u.rank}.`),k(h.rank===5,()=>`Error in maxPool3dGrad: input must be rank 5 but got rank ${h.rank}.`),k(d.rank===5,()=>`Error in maxPool3dGrad: output must be rank 5 but got rank ${d.rank}.`),Xe("maxPool3dGrad",r,i);const f={dy:u,input:h,output:d},m={filterSize:s,strides:o,pad:r,dimRoundingMode:i},g=M.runKernel(Nu,f,m);return p?z(g,[g.shape[1],g.shape[2],g.shape[3],g.shape[4]]):g}const Q2=V({maxPool3dGrad_:Z2});const J2={kernelName:La,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,t,e)=>{const[s,o]=t,{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=e;return{x:()=>Q2(n,s,o,r,i,a,l)}}};function tN(n,t,e,s,o,r,i){const a=A(n,"dy","maxPoolGrad"),l=A(t,"input","maxPoolGrad"),c=A(e,"output","maxPoolGrad");k(l.rank===a.rank,()=>`Rank of input (${l.rank}) does not match rank of dy (${a.rank})`),k(a.rank===4,()=>`Error in maxPoolGrad: dy must be rank 4 but got rank ${a.rank}.`),k(l.rank===4,()=>`Error in maxPoolGrad: input must be rank 4 but got rank ${l.rank}.`),Xe("maxPoolGrad",r,i);const u={dy:a,input:l,output:c},h={filterSize:s,strides:o,pad:r,dimRoundingMode:i};return M.runKernel(Su,u,h)}const eN=V({maxPoolGrad_:tN});const nN={kernelName:Oa,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,t,e)=>{const[s,o]=t,{filterSize:r,strides:i,pad:a}=e;return{x:()=>eN(n,s,o,r,i,a)}}};const sN={kernelName:Ma,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{axis:o}=e,r=$t(o,s.shape),a=Ce(s.shape,r)[1],l=X(a);return{x:()=>{const u=s.shape.slice();r.forEach(p=>{u[p]=1});const h=z(n,u);return ft(L(h,Ns(s.shape,"float32")),l)}}}};const oN={kernelName:Pa,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,t,e)=>{const s=e,{axis:o}=s,[r,i]=t,a=$t(o,r.shape),l=kg(n,i,r,a);return{x:()=>l.x()}}};const rN={kernelName:Ur,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t;return{a:()=>L(n,rt(Go(e,s),"float32")),b:()=>L(n,rt(ln(e,s),"float32"))}}};const iN={kernelName:Ba,inputsToSave:["x"],gradFunc:(n,t,e)=>{const s=t[0],{paddings:o}=e,r=o.map(i=>i[0]);return{x:()=>qt(n,r,s.shape)}}};const aN={kernelName:Gr,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t,o=yt(e.shape,s.shape);return{a:()=>{const a=he(e.shape,o);return a.length>0?z(pt(n,a),e.shape):n},b:()=>{const a=L(n,oe(vl(ft(e,s)))),l=he(s.shape,o);return l.length>0?z(pt(a,l),s.shape):a}}}};const lN={kernelName:Hr,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t,o=yt(e.shape,s.shape);return{a:()=>{const a=L(n,rt(s,"float32")),l=he(e.shape,o);return l.length>0?z(pt(a,l),e.shape):a},b:()=>{const a=L(n,rt(e,"float32")),l=he(s.shape,o);return l.length>0?z(pt(a,l),s.shape):a}}}};const cN={kernelName:za,gradFunc:n=>({x:()=>oe(n)})};const uN={kernelName:Ua,inputsToSave:["indices"],gradFunc:(n,t)=>{const e=t[0];return{indices:()=>$e(e.shape,"float32")}}};const hN={kernelName:Wa,gradFunc:n=>({x:()=>Tt(n)})};const dN={kernelName:Ga,saveAllInputs:!0,gradFunc:(n,t,e)=>{const{axis:s}=e;return co(n,s).map(r=>()=>r)}};const Ng={kernelName:Ha,inputsToSave:["x"],gradFunc:(n,t,e)=>{const s=t[0],{paddings:o}=e,r=o.map(i=>i[0]);return{x:()=>qt(n,r,s.shape)}}};const pN={kernelName:qr,inputsToSave:["a","b"],outputsToSave:[!0],gradFunc:(n,t)=>{const[e,s,o]=t,r=e,i=s,a=yt(r.shape,i.shape);return{a:()=>{const u=rt(i,"float32");let h=L(n,L(u,oo(r,gt(u,Pt(1)))));const d=he(r.shape,a);return d.length>0&&(h=pt(h,d)),z(h,r.shape)},b:()=>{const u=ln(r,0),h=Be(u,qn(r),Tt(r));let d=L(n,L(o,h));const p=he(i.shape,a);return p.length>0&&(d=pt(d,p)),z(d,i.shape)}}}};const fN={kernelName:qa,inputsToSave:["x","alpha"],gradFunc:(n,t)=>{const[e,s]=t,o=ln(e,0);return{x:()=>Be(o,n,L(n,s)),alpha:()=>{let r=Be(o,Tt(n),L(n,e));const i=he(s.shape,n.shape);return i.length>0&&(r=pt(r,i)),z(r,s.shape)}}}};function mN(n,t,e){const s=n.shape.slice();s[e]=1;const o=z(t,s),r=uh(n,e,!0,!1),i=uh(n,e,!0,!0),a=L(r,i);return L(o,a)}function gN(n,t,e){const s=n.shape.length,o=s-e.length,r=Qt(e,s);let i=n;r!=null&&(i=Et(n,r));const a=i.shape.slice(),c=a.splice(s-e.length,e.length).reduce((d,p)=>d*p,1);a.push(c);const u=i.reshape(a);let h=mN(u,t,o);if(h=h.reshape(i.shape),r!=null){const d=ks(r);h=Et(h,d)}return h}const xN={kernelName:Xa,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{axis:o}=e;let r=[];return o==null?r=s.shape.map((i,a)=>a):typeof o=="number"?r=[o]:r=o,{x:()=>gN(s,n,r)}}};const bN={kernelName:Tr,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t,o=yt(e.shape,s.shape);return{a:()=>{const a=ft(n,rt(s,"float32")),l=he(e.shape,o);return l.length>0?z(pt(a,l),e.shape):a},b:()=>{let a=L(n,rt(e,"float32"));const l=he(s.shape,o);l.length>0&&(a=z(pt(a,l),s.shape));const c=jt(s);return oe(ft(a,rt(c,"float32")))}}}};const yN={kernelName:Xr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>ft(n,oe(jt(e)))}}};const wN={kernelName:jr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t,s=L(Go(e,6),ki(e));return{x:()=>L(n,rt(s,"float32"))}}};const CN={kernelName:Kr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(n,rt(ki(e),"float32"))}}};const $N={kernelName:Ka,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>z(n,e.shape)}}};const IN={kernelName:Ya,inputsToSave:["images"],gradFunc:(n,t,e)=>{const[s]=t,o={dy:n,images:s};return{images:()=>M.runKernel(_u,o,e)}}};const vN={kernelName:ja,inputsToSave:["images"],gradFunc:(n,t,e)=>{const[s]=t,o={dy:n,images:s};return{images:()=>M.runKernel(Fu,o,e)}}};const kN={kernelName:Za,gradFunc:(n,t,e)=>{const{dims:s}=e,o=$t(s,n.shape);return{x:()=>ao(n,o)}}};const SN={kernelName:Yr,gradFunc:n=>({x:()=>Tt(n)})};const NN={kernelName:Zr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>oe(ft(n,L(oo(e,1.5),2)))}}};const TN={kernelName:Qa,inputsToSave:["condition"],gradFunc:(n,t)=>{const[e]=t;return{condition:()=>rt(Tt(e),"float32"),t:()=>L(n,rt(e,n.dtype)),e:()=>L(n,rt(gh(e),n.dtype))}}};const EN={kernelName:Qr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>{const s=ln(e,Pt(0)),o=Pt(Ml),r=Pt(Pl),i=L(n,r),a=L(L(n,o),Hn(rt(e,"float32")));return Be(s,i,a)}}}};const RN={kernelName:ni,outputsToSave:[!0],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(n,L(e,gt(Pt(1),e)))}}};const AN={kernelName:ei,gradFunc:n=>({x:()=>Tt(n)})};const DN={kernelName:Jr,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(ch(rt(e,"float32")),n)}}};const FN={kernelName:ti,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(Yf(rt(e,"float32")),n)}}};const _N={kernelName:Ja,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{begin:o,size:r}=e,i=s.shape,[a,l]=Wh(s,o,r),c=[];for(let u=0;u<n.rank;u++)c.push([a[u],i[u]-a[u]-l[u]]);return{x:()=>yh(n,c)}}};const ON={kernelName:sl,outputsToSave:[!0],gradFunc:(n,t,e)=>{const[s]=t,{dim:o}=e,r=!0,i=L(n,s);return{logits:()=>gt(i,L(pt(i,[o],r),s))}}};const LN={kernelName:si,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(n,Wo(e))}}};const Tg={kernelName:el,gradFunc:(n,t,e)=>{const{blockShape:s,paddings:o}=e;return{x:()=>ah(n,s,o)}}};const Eg={kernelName:nl,gradFunc:(n,t,e)=>{const{axis:s}=e;return{x:()=>Ke(n,s)}}};const MN={kernelName:oi,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>ft(n,L(Fe(rt(e,"float32")),2))}}};const PN={kernelName:Ou,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(n,L(rt(e,"float32"),2))}}};const BN={kernelName:ri,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t,o=Pt(2);return{a:()=>L(n,L(o,gt(e,s))),b:()=>L(n,L(o,gt(s,e)))}}};const zN={kernelName:ui,gradFunc:n=>({x:()=>Tt(n)})};const VN={kernelName:ii,inputsToSave:["a","b"],gradFunc:(n,t)=>{const[e,s]=t,o=yt(e.shape,s.shape);return{a:()=>{let a=n;const l=he(e.shape,o);return l.length>0&&(a=pt(a,l)),z(a,e.shape)},b:()=>{let a=n;const l=he(s.shape,o);return l.length>0&&(a=pt(a,l)),z(oe(a),s.shape)}}}};const WN={kernelName:tl,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,o=s.shape.slice(),{axis:r}=e;$t(r,s.shape).forEach(c=>{o[c]=1});const a=z(n,o),l=L(a,Ns(s.shape,"float32"));return{x:()=>l}}};const UN={kernelName:ai,inputsToSave:["x"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>ft(n,jt(ch(e)))}}};const GN={kernelName:li,outputsToSave:[!0],gradFunc:(n,t)=>{const[e]=t;return{x:()=>L(gt(Pt(1),jt(e)),n)}}};const HN={kernelName:ci,inputsToSave:["x"],gradFunc:(n,t,e)=>{const[s]=t,{reps:o}=e;return{x:()=>{let i=Tt(s);if(s.rank===1)for(let a=0;a<o[0];++a)i=J(i,qt(n,[a*s.shape[0]],[s.shape[0]]));else if(s.rank===2)for(let a=0;a<o[0];++a)for(let l=0;l<o[1];++l)i=J(i,qt(n,[a*s.shape[0],l*s.shape[1]],[s.shape[0],s.shape[1]]));else if(s.rank===3)for(let a=0;a<o[0];++a)for(let l=0;l<o[1];++l)for(let c=0;c<o[2];++c)i=J(i,qt(n,[a*s.shape[0],l*s.shape[1],c*s.shape[2]],[s.shape[0],s.shape[1],s.shape[2]]));else if(s.rank===4)for(let a=0;a<o[0];++a)for(let l=0;l<o[1];++l)for(let c=0;c<o[2];++c)for(let u=0;u<o[3];++u)i=J(i,qt(n,[a*s.shape[0],l*s.shape[1],c*s.shape[2],u*s.shape[3]],[s.shape[0],s.shape[1],s.shape[2],s.shape[3]]));else throw new Error(`Gradient for tile operation is not implemented for rank-${s.rank} tensors yet.`);return i}}}};const qN={kernelName:Lo,gradFunc:(n,t,e)=>{const s=e,{perm:o}=s,r=ks(o);return{x:()=>Et(n,r)}}};const XN={kernelName:ol,gradFunc:(n,t,e)=>{const s=e,{axis:o}=s;return{value:()=>us(n,o)}}};const KN={kernelName:rl,inputsToSave:["segmentIds"],gradFunc:(n,t)=>{const[e]=t;return{x:()=>jN(n,e)}}};function jN(n,t){const e=Ss(t,Tt(t)),s=ph(n,e);let o=ro(t,Pt(0,"int32"));const r=s.rank-o.rank;for(let a=0;a<r;++a)o=je(o,a+1);o=cs(o,Ns(s.shape,"bool"));const i=Tt(s);return Be(o,s,i)}const YN={kernelName:il,gradFunc:n=>({x:()=>Tt(n)})};const ZN=[$g,KS,jS,YS,ZS,QS,JS,t2,e2,n2,s2,o2,a2,u2,h2,d2,p2,f2,m2,g2,x2,b2,w2,y2,I2,v2,k2,S2,N2,T2,bN,E2,R2,A2,D2,F2,O2,_2,L2,M2,P2,B2,z2,V2,W2,U2,G2,H2,q2,j2,Sg,Sg,Y2,J2,nN,sN,oN,rN,iN,aN,lN,cN,uN,hN,dN,Ng,Ng,pN,fN,xN,yN,wN,CN,$N,IN,vN,kN,SN,NN,TN,EN,RN,AN,DN,FN,_N,ON,LN,Tg,Tg,Eg,Eg,MN,BN,PN,zN,VN,WN,UN,GN,HN,qN,XN,KN,YN];for(const n of ZN)bw(n);q().prototype.abs=function(){return this.throwIfDisposed(),Pe(this)};q().prototype.acos=function(){return this.throwIfDisposed(),IC(this)};q().prototype.acosh=function(){return this.throwIfDisposed(),kC(this)};q().prototype.add=function(n){return this.throwIfDisposed(),J(this,n)};q().prototype.all=function(n,t){return this.throwIfDisposed(),qf(this,n,t)};q().prototype.any=function(n,t){return this.throwIfDisposed(),sh(this,n,t)};q().prototype.argMax=function(n){return this.throwIfDisposed(),fi(this,n)};q().prototype.argMin=function(n){return this.throwIfDisposed(),RC(this,n)};q().prototype.asScalar=function(){return this.throwIfDisposed(),k(this.size===1,()=>"The array must have only 1 element."),z(this,[])};q().prototype.asType=function(n){return this.throwIfDisposed(),rt(this,n)};q().prototype.as1D=function(){return this.throwIfDisposed(),z(this,[this.size])};q().prototype.as2D=function(n,t){return this.throwIfDisposed(),z(this,[n,t])};q().prototype.as3D=function(n,t,e){return this.throwIfDisposed(),z(this,[n,t,e])};q().prototype.as4D=function(n,t,e,s){return this.throwIfDisposed(),z(this,[n,t,e,s])};q().prototype.as5D=function(n,t,e,s,o){return this.throwIfDisposed(),z(this,[n,t,e,s,o])};q().prototype.asin=function(){return this.throwIfDisposed(),DC(this)};q().prototype.asinh=function(){return this.throwIfDisposed(),_C(this)};q().prototype.atan=function(){return this.throwIfDisposed(),LC(this)};q().prototype.atan2=function(n){return this.throwIfDisposed(),PC(this,n)};q().prototype.atanh=function(){return this.throwIfDisposed(),zC(this)},q().prototype.avgPool=function(n,t,e,s){return this.throwIfDisposed(),ih(this,n,t,e,s)};q().prototype.batchToSpaceND=function(n,t){return this.throwIfDisposed(),ah(this,n,t)};q().prototype.batchNorm=function(n,t,e,s,o){return this.throwIfDisposed(),yl(this,n,t,e,s,o)};q().prototype.broadcastTo=function(n){return this.throwIfDisposed(),bi(this,n)};q().prototype.cast=function(n){return this.throwIfDisposed(),rt(this,n)};q().prototype.ceil=function(){return this.throwIfDisposed(),p$(this)};q().prototype.clipByValue=function(n,t){return this.throwIfDisposed(),an(this,n,t)};q().prototype.concat=function(n,t){return this.throwIfDisposed(),n instanceof ue&&(n=[n]),Ke([this,...n],t)};q().prototype.conv1d=function(n,t,e,s,o,r){return this.throwIfDisposed(),Xf(this,n,t,e,s,o,r)};q().prototype.conv2dTranspose=function(n,t,e,s,o){return this.throwIfDisposed(),Kf(this,n,t,e,s,o)};q().prototype.conv2d=function(n,t,e,s,o,r){return this.throwIfDisposed(),so(this,n,t,e,s,o,r)};q().prototype.cos=function(){return this.throwIfDisposed(),ch(this)};q().prototype.cosh=function(){return this.throwIfDisposed(),Yf(this)};q().prototype.cumprod=function(n,t,e){return this.throwIfDisposed(),uh(this,n,t,e)};q().prototype.cumsum=function(n,t,e){return this.throwIfDisposed(),Zf(this,n,t,e)};q().prototype.depthToSpace=function(n,t){return this.throwIfDisposed(),P$(this,n,t)};q().prototype.depthwiseConv2d=function(n,t,e,s,o,r){return this.throwIfDisposed(),hh(this,n,t,e,s,o,r)};q().prototype.dilation2d=function(n,t,e,s,o){return this.throwIfDisposed(),V$(this,n,t,e,s,o)};q().prototype.divNoNan=function(n){return this.throwIfDisposed(),q$(this,n)};q().prototype.div=function(n){return this.throwIfDisposed(),ft(this,n)};q().prototype.dot=function(n){return this.throwIfDisposed(),K$(this,n)};q().prototype.elu=function(){return this.throwIfDisposed(),Cl(this)};q().prototype.equal=function(n){return this.throwIfDisposed(),Gn(this,n)};q().prototype.erf=function(){return this.throwIfDisposed(),Jf(this)};q().prototype.euclideanNorm=function(n,t){return this.throwIfDisposed(),iI(this,n,t)};q().prototype.exp=function(){return this.throwIfDisposed(),Hn(this)};q().prototype.expandDims=function(n){return this.throwIfDisposed(),je(this,n)};q().prototype.expm1=function(){return this.throwIfDisposed(),uI(this)};q().prototype.fft=function(){return this.throwIfDisposed(),km(this)};q().prototype.flatten=function(){return this.throwIfDisposed(),z(this,[this.size])};q().prototype.floor=function(){return this.throwIfDisposed(),vl(this)};q().prototype.floorDiv=function(n){return this.throwIfDisposed(),Hf(this,n)};q().prototype.gather=function(n,t,e){return this.throwIfDisposed(),ph(this,n,t,e)};q().prototype.greaterEqual=function(n){return this.throwIfDisposed(),ro(this,n)};q().prototype.greater=function(n){return this.throwIfDisposed(),ln(this,n)};q().prototype.ifft=function(){return this.throwIfDisposed(),Nh(this)};q().prototype.irfft=function(){return this.throwIfDisposed(),sk(this)};q().prototype.isFinite=function(){return this.throwIfDisposed(),yI(this)};q().prototype.isInf=function(){return this.throwIfDisposed(),CI(this)};q().prototype.isNaN=function(){return this.throwIfDisposed(),II(this)};q().prototype.leakyRelu=function(n){return this.throwIfDisposed(),mh(this,n)};q().prototype.lessEqual=function(n){return this.throwIfDisposed(),Go(this,n)};q().prototype.less=function(n){return this.throwIfDisposed(),kl(this,n)};q().prototype.localResponseNormalization=function(n,t,e,s){return this.throwIfDisposed(),TI(this,n,t,e,s)};q().prototype.logSigmoid=function(){return this.throwIfDisposed(),OI(this)};q().prototype.logSoftmax=function(n){return this.throwIfDisposed(),om(this,n)};q().prototype.logSumExp=function(n,t){return this.throwIfDisposed(),rm(this,n,t)};q().prototype.log=function(){return this.throwIfDisposed(),qn(this)};q().prototype.log1p=function(){return this.throwIfDisposed(),sm(this)};q().prototype.logicalAnd=function(n){return this.throwIfDisposed(),cs(this,n)};q().prototype.logicalNot=function(){return this.throwIfDisposed(),gh(this)};q().prototype.logicalOr=function(n){return this.throwIfDisposed(),im(this,n)};q().prototype.logicalXor=function(n){return this.throwIfDisposed(),UI(this,n)};q().prototype.matMul=function(n,t,e){return this.throwIfDisposed(),Mt(this,n,t,e)},q().prototype.maxPool=function(n,t,e,s){return this.throwIfDisposed(),xh(this,n,t,e,s)};q().prototype.max=function(n,t){return this.throwIfDisposed(),Rn(this,n,t)};q().prototype.maximum=function(n){return this.throwIfDisposed(),Ss(this,n)};q().prototype.mean=function(n,t){return this.throwIfDisposed(),ce(this,n,t)};q().prototype.min=function(n,t){return this.throwIfDisposed(),$l(this,n,t)};q().prototype.minimum=function(n){return this.throwIfDisposed(),Ci(this,n)};q().prototype.mirrorPad=function(n,t){return this.throwIfDisposed(),ZI(this,n,t)};q().prototype.mod=function(n){return this.throwIfDisposed(),JI(this,n)};q().prototype.mul=function(n){return this.throwIfDisposed(),L(this,n)};q().prototype.neg=function(){return this.throwIfDisposed(),oe(this)};q().prototype.norm=function(n,t,e){return this.throwIfDisposed(),Il(this,n,t,e)};q().prototype.notEqual=function(n){return this.throwIfDisposed(),Sl(this,n)};q().prototype.oneHot=function(n,t=1,e=0){return this.throwIfDisposed(),am(this,n,t,e)};q().prototype.onesLike=function(){return this.throwIfDisposed(),fn(this)};q().prototype.pad=function(n,t){return this.throwIfDisposed(),yh(this,n,t)},q().prototype.pool=function(n,t,e,s,o,r){return this.throwIfDisposed(),cv(this,n,t,e,s,o,r)};q().prototype.pow=function(n){return this.throwIfDisposed(),oo(this,n)};q().prototype.prelu=function(n){return this.throwIfDisposed(),Ch(this,n)};q().prototype.prod=function(n,t){return this.throwIfDisposed(),dv(this,n,t)};q().prototype.reciprocal=function(){return this.throwIfDisposed(),Mv(this)};q().prototype.relu=function(){return this.throwIfDisposed(),io(this)};q().prototype.relu6=function(){return this.throwIfDisposed(),xm(this)};q().prototype.reshapeAs=function(n){return this.throwIfDisposed(),z(this,n.shape)};q().prototype.reshape=function(n){return this.throwIfDisposed(),z(this,n)};q().prototype.resizeBilinear=function(n,t,e){return this.throwIfDisposed(),Am(this,n,t,e)};q().prototype.resizeNearestNeighbor=function(n,t,e){return this.throwIfDisposed(),Dm(this,n,t,e)};q().prototype.reverse=function(n){return this.throwIfDisposed(),ao(this,n)};q().prototype.rfft=function(){return this.throwIfDisposed(),ik(this)};q().prototype.round=function(){return this.throwIfDisposed(),bm(this)};q().prototype.rsqrt=function(){return this.throwIfDisposed(),ym(this)};q().prototype.selu=function(){return this.throwIfDisposed(),wm(this)};q().prototype.separableConv2d=function(n,t,e,s,o,r){return this.throwIfDisposed(),Cm(this,n,t,e,s,o,r)};q().prototype.sigmoid=function(){return this.throwIfDisposed(),Wo(this)};q().prototype.sign=function(){return this.throwIfDisposed(),qv(this)};q().prototype.sin=function(){return this.throwIfDisposed(),$m(this)};q().prototype.sinh=function(){return this.throwIfDisposed(),Im(this)};q().prototype.slice=function(n,t){return this.throwIfDisposed(),qt(this,n,t)};q().prototype.softmax=function(n){return this.throwIfDisposed(),Sh(this,n)};q().prototype.softplus=function(){return this.throwIfDisposed(),wi(this)};q().prototype.spaceToBatchND=function(n,t){return this.throwIfDisposed(),wh(this,n,t)};q().prototype.split=function(n,t){return this.throwIfDisposed(),cn(this,n,t)};q().prototype.sqrt=function(){return this.throwIfDisposed(),Fe(this)};q().prototype.square=function(){return this.throwIfDisposed(),jt(this)};q().prototype.squaredDifference=function(n){return this.throwIfDisposed(),lk(this,n)};q().prototype.squeeze=function(n){return this.throwIfDisposed(),vi(this,n)};q().prototype.stack=function(n,t){this.throwIfDisposed();const e=n instanceof ue?[this,n]:[this,...n];return us(e,t)};q().prototype.step=function(n){return this.throwIfDisposed(),ki(this,n)};q().prototype.stridedSlice=function(n,t,e,s,o,r,i,a){return this.throwIfDisposed(),pk(this,n,t,e,s,o,r,i,a)};q().prototype.sub=function(n){return this.throwIfDisposed(),gt(this,n)};q().prototype.sum=function(n,t){return this.throwIfDisposed(),pt(this,n,t)};q().prototype.tan=function(){return this.throwIfDisposed(),mk(this)};q().prototype.tanh=function(){return this.throwIfDisposed(),bl(this)};q().prototype.tile=function(n){return this.throwIfDisposed(),An(this,n)};q().prototype.toBool=function(){return this.throwIfDisposed(),rt(this,"bool")};q().prototype.toFloat=function(){return this.throwIfDisposed(),rt(this,"float32")};q().prototype.toInt=function(){return this.throwIfDisposed(),rt(this,"int32")};q().prototype.topk=function(n,t){return this.throwIfDisposed(),xk(this,n,t)};q().prototype.transpose=function(n){return this.throwIfDisposed(),Et(this,n)};q().prototype.unique=function(n){return this.throwIfDisposed(),wk(this,n)};q().prototype.unsortedSegmentSum=function(n,t){return this.throwIfDisposed(),Nm(this,n,t)};q().prototype.unstack=function(n){return this.throwIfDisposed(),co(this,n)};q().prototype.where=function(n,t){return this.throwIfDisposed(),Be(n,this,t)};q().prototype.zerosLike=function(){return this.throwIfDisposed(),Tt(this)};class Kn extends Error{constructor(t){super(t),Object.setPrototypeOf(this,Kn.prototype)}}class gn extends Error{constructor(t){super(t),Object.setPrototypeOf(this,gn.prototype)}}class _ extends Error{constructor(t){super(t),Object.setPrototypeOf(this,_.prototype)}}class wt extends Error{constructor(t){super(t),Object.setPrototypeOf(this,wt.prototype)}}class cd extends Error{constructor(t){super(t),Object.setPrototypeOf(this,cd.prototype)}}class Rg{constructor(t){this.maxEntries=t||100,this.cache=new Map}get(t){let e;return this.cache.has(t)&&(e=this.cache.get(t),this.cache.delete(t),this.cache.set(t,e)),e}put(t,e){if(this.cache.has(t))this.cache.delete(t);else if(this.cache.size>=this.maxEntries){const s=this.cache.keys().next().value;this.cache.delete(s)}this.cache.set(t,e)}getMaxEntries(){return this.maxEntries}setMaxEntries(t){if(t<0)throw new Error(`The maxEntries of LRU caches must be at least 0, but got ${t}.`);if(this.maxEntries>t)for(let e=0;e<this.maxEntries-t;e++){const s=this.cache.keys().next().value;this.cache.delete(s)}this.maxEntries=t}}function ho(n,t){if(Array.isArray(n)){let e=[];for(let s=0;s<t;s++)e=e.concat(n);return e}else{const e=new Array(t);return e.fill(n),e}}function jn(n,t){if(!n)throw new cd(t)}function Ag(n,t){let e=0;for(const s of n)s===t&&e++;return e}function Ye(n){return n.length===1?n[0]:n}function Vt(n){return Array.isArray(n)?n:[n]}function fs(n){const e=n.replace(/(.)([A-Z][a-z0-9]+)/g,"$1_$2").replace(/([a-z])([A-Z])/g,"$1_$2").toLowerCase();return e[0]!=="_"?e:"private"+e}function po(n){return n.length<=1||n.indexOf("_")===-1?n:n.replace(/[_]+(\w|$)/g,(t,e)=>e.toUpperCase())}let xn={};function ud(n){if(n==null)return null;const t={};return t.className=n.getClassName(),t.config=n.getConfig(),t}function hd(n){if(!(n==null||typeof n!="object"))if(Array.isArray(n))n.forEach(t=>hd(t));else{const t=Object.keys(n);for(const e of t){const s=n[e];s!=null&&typeof s=="object"&&(!Array.isArray(s)&&s.type==="ndarray"&&typeof s.value=="number"?n[e]=s.value:hd(s))}}}function Ei(n,t={},e={},s="object",o=!1){if(typeof n=="string"){const r=n;let i;if(r in e)i=e[r];else if(r in xn)i=xn[r];else if(i=t[r],i==null)throw new _(`Unknown ${s}: ${n}. This may be due to one of the following reasons:
1. The ${s} is defined in Python, in which case it needs to be ported to TensorFlow.js or your JavaScript code.
2. The custom ${s} is defined in JavaScript, but is not registered properly with tf.serialization.registerClass().`);return i}else{const r=n;if(r.className==null||r.config==null)throw new _(`${s}: Improper config format: ${JSON.stringify(r)}.
'className' and 'config' must set.`);const i=r.className;let a,l;if(i in e?[a,l]=e[i]:i in xn?[a,l]=xn.className:i in t&&([a,l]=t[i]),a==null)throw new _(`Unknown ${s}: ${i}. This may be due to one of the following reasons:
1. The ${s} is defined in Python, in which case it needs to be ported to TensorFlow.js or your JavaScript code.
2. The custom ${s} is defined in JavaScript, but is not registered properly with tf.serialization.registerClass().`);if(l!=null){const c={};for(const p of Object.keys(xn))c[p]=xn[p];for(const p of Object.keys(e))c[p]=e[p];const u=r.config;u.customObjects=c;const h=Object.assign({},xn);for(const p of Object.keys(e))xn[p]=e[p];hd(r.config);const d=l(a,r.config,e,o);return xn=Object.assign({},h),d}else{const c=Object.assign({},xn);for(const h of Object.keys(e))xn[h]=e[h];const u=new a(r.config);return xn=Object.assign({},c),u}}}function QN(n,t){return n<t?-1:n>t?1:0}function Bl(n,t){return-1*QN(n,t)}function Es(n){if(n==null)return n;const t=[];for(const e of n)t.indexOf(e)===-1&&t.push(e);return t}function JN(n){if(n==null)throw new _(`Invalid value in obj: ${JSON.stringify(n)}`);for(const t in n)if(n.hasOwnProperty(t))return!1;return!0}function fo(n,t,e){if(e!=null&&n.indexOf(e)<0)throw new _(`${e} is not a valid ${t}.  Valid values are ${n} or null/undefined.`)}function dd(n,t,e=0,s=1/0){return jn(e>=0),jn(s>=e),Array.isArray(n)&&n.length>=e&&n.length<=s&&n.every(o=>typeof o===t)}function Ie(n,t){Array.isArray(n)?(k(n.length>0,()=>`${t} is unexpectedly an empty array.`),n.forEach((e,s)=>Ie(e,`element ${s+1} of ${t}`))):k(Number.isInteger(n)&&n>0,()=>`Expected ${t} to be a positive integer, but got ${Dg(n)}.`)}function Dg(n){return n===null?"null":Array.isArray(n)?"["+n.map(t=>Dg(t)).join(",")+"]":typeof n=="string"?`"${n}"`:`${n}`}function tT(n,t,e){let s=e!=null?e():He(),o;return(...i)=>{const a=e!=null?e():He();return a-s<t||(s=a,o=n(...i)),o}}function Fg(n){return n==="relu"?"relu":n==="linear"?"linear":n==="elu"?"elu":null}let eT=0;function _g(){return eT++}const zl={};function Vl(n=""){return n in zl||(zl[n]=0),zl[n]+=1,n+zl[n].toString()}const nT=["channelsFirst","channelsLast"],sT=["nearest","bilinear"],oT=["valid","same","causal"],rT=["max","avg"],iT=["sum","mul","concat","ave"];const jo=new Map;function re(n){fo(nT,"DataFormat",n)}function aT(n){fo(sT,"InterpolationFormat",n)}function un(n){fo(oT,"PaddingMode",n)}function Og(n){fo(rT,"PoolMode",n)}const Ri=[],Lg="/";function mo(n,t){Ri.push(n);try{const e=t();return Ri.pop(),e}catch(e){throw Ri.pop(),e}}function lT(){return Ri.length===0?"":Ri.join(Lg)+Lg}function Mg(n){if(!Bg(n))throw new Error("Not a valid tensor name: '"+n+"'");return lT()+n}function Pg(n){if(!Bg(n))throw new Error("Not a valid tensor name: '"+n+"'");jo.has(n)||jo.set(n,0);const t=jo.get(n);if(jo.set(n,jo.get(n)+1),t>0){const e=`${n}_${t}`;return jo.set(e,1),e}else return n}const cT=new RegExp(/^[A-Za-z0-9][-A-Za-z0-9\._\/]*$/);function Bg(n){return!!n.match(cT)}function uT(n){return n===parseInt(n.toString(),10)}function Rs(n,t,e){t==null&&(t=0),e==null&&(e=n.length);let s=1;for(let o=t;o<e;++o)s*=n[o];return s}function Yo(n){if(n.length===0)return Number.NaN;let t=Number.POSITIVE_INFINITY;for(let e=0;e<n.length;e++){const s=n[e];s<t&&(t=s)}return t}function As(n){if(n.length===0)return Number.NaN;let t=Number.NEGATIVE_INFINITY;for(let e=0;e<n.length;e++){const s=n[e];s>t&&(t=s)}return t}function Fn(n,t){if(t<n)throw new _(`end (${t}) < begin (${n}) is forbidden.`);const e=[];for(let s=n;s<t;++s)e.push(s);return e}let pd;function de(){return pd==null&&(pd=qw().epsilon()),pd}function _n(){return"channelsLast"}function Yn(n,t){return rt(n,t)}function Ai(n,t=-1){const e=n.shape.slice();return t<0&&(t=e.length+t+1),e.splice(t,0,1),z(n,e)}function hT(n,t){return W(()=>{if(n.shape.length!==2)throw new _(`repeat() expects a rank-2 tensor, but received a rank-${n.shape.length} tensor.`);const e=Ai(n,1);return gd(e,[1,t,1])})}function dT(n){const t=[Rs(n.shape)];return z(n,t)}function pT(n){if(n.rank<=1)throw new _(`batchFlatten requires a minimum rank of 2. Got rank: ${n.rank}.`);const t=[n.shape[0],Rs(n.shape,1)];return z(n,t)}function go(n,t,e){return W(()=>{switch(n.rank){case 1:return vh(n,t,e);case 2:return vm(n,[t,0],[e,n.shape[1]]);case 3:return kh(n,[t,0,0],[e,n.shape[1],n.shape[2]]);case 4:return Ol(n,[t,0,0,0],[e,n.shape[1],n.shape[2],n.shape[3]]);case 5:return qt(n,[t,0,0,0,0],[e,n.shape[1],n.shape[2],n.shape[3],n.shape[4]]);case 6:return qt(n,[t,0,0,0,0,0],[e,n.shape[1],n.shape[2],n.shape[3],n.shape[4],n.shape[5]]);default:throw new _(`sliceAlongFirstAxis() received an unsupported tensor rank: ${n.rank}`)}})}function fd(n,t,e){return W(()=>{switch(n.rank){case 1:return vh(n,t,e);case 2:return vm(n,[0,t],[n.shape[0],e]);case 3:return kh(n,[0,0,t],[n.shape[0],n.shape[1],e]);case 4:return Ol(n,[0,0,0,t],[n.shape[0],n.shape[1],n.shape[2],e]);default:throw new _(`sliceAlongLastAxis() received an unsupported tensor rank: ${n.rank}`)}})}function Wl(n,t,e,s){return W(()=>{switch(n.rank){case 1:return vh(n,t,e);case 2:switch(s){case 1:return go(n,t,e);case 2:return fd(n,t,e);default:throw new _(`The axis is not within the rank of the tensor ${s}`)}case 3:switch(s){case 1:return go(n,t,e);case 2:return kh(n,[0,t,0],[n.shape[0],e,n.shape[2]]);case 3:return fd(n,t,e);default:throw new _(`The axis is not within the rank of the tensor ${s}`)}case 4:switch(s){case 1:return go(n,t,e);case 2:return Ol(n,[0,t,0,0],[n.shape[0],e,n.shape[2],n.shape[3]]);case 3:return Ol(n,[0,0,t,0],[n.shape[0],n.shape[1],e,n.shape[3]]);case 4:return fd(n,t,e);default:throw new _(`The axis is not within the rank of the tensor ${s}`)}default:throw new _(`sliceAlongLastAxis() received an unsupported tensor rank: ${n.rank}`)}})}function md(n,t=-1){let e;return t<0&&(e=n[0].rank,e!==0?t=e:t=0),t===n[0].rank&&(t=-1),Ke(n,t)}function zg(n,t){switch(n.rank){case 1:return g$([n,t]);case 2:return b$([n,t],0);case 3:return w$([n,t],0);case 4:return $$([n,t],0);default:throw new _(`concatAlongFirstAxis() received an unsupported tensor rank: ${n.rank}`)}}function gd(n,t){if(Array.isArray(t)||(t=[t]),n.rank!==t.length)throw new _(`The length of input n (${t.length}) does not match the number of dimensions in input x (${n.rank})`);return An(n,t)}function Ul(n,t=0,e=1,s,o){return Fv(n,t,e,s,o)}function Zn(n,t,e,s){if(n.rank<2||t.rank<2)throw new wt(`dot requires both inputs to be rank >= 2 but got x shape = ${n.shape} and y shape = ${t.shape}`);if(t.rank>=3){const o=n.shape.slice(-1)[0],r=t.shape.slice(-2)[0];if(o!==r)throw new wt(`If rank y >= 3, then the second last dim of y must equal the last dim of x but got x shape = ${n.shape} and  y shape = ${t.shape}`)}if(n.rank===2&&t.rank===2)return Em({a:n,b:t,transposeA:!1,transposeB:!1,bias:s?xd(n.rank,s,_n()):null,activation:e});{const o=n.shape.slice(),r=o.pop();n=z(n,[-1,r]);const i=t.shape.slice(),a=i.pop(),l=i.pop(),c=[...i,a],u=Array.from({length:t.rank},(f,m)=>m===0?t.rank-2:m<=t.rank-2?m-1:m);t=z(Et(t,u),[l,-1]);const h=[...o,...c];return z(Em({a:n,b:t,transposeA:!1,transposeB:!1,bias:s?xd(n.rank,s,_n()):null,activation:e}),h)}}function Vg(n,t,e){return W(()=>(Array.isArray(t)?t=tn(t,"int32"):t=rt(t,"int32"),ph(n,t,e)))}function Di(n){return L(n,n)}function xd(n,t,e){const s=t.shape;if(t.rank!==1&&t.rank!==n)throw new _(`Unexpected bias dimensions: ${t.rank}; expected it to be 1 or ${n}`);if(n===5){if(e==="channelsFirst")return s.length===1?z(t,[1,s[0],1,1,1]):z(t,[1,s[3],s[0],s[1],s[2]]);if(e==="channelsLast")return s.length===1?z(t,[1,1,1,1,s[0]]):z(t,[1].concat(s))}else if(n===4){if(e==="channelsFirst")return s.length===1?z(t,[1,s[0],1,1]):z(t,[1,s[2],s[0],s[1]]);if(e==="channelsLast")return s.length===1?z(t,[1,1,1,s[0]]):z(t,[1].concat(s))}else if(n===3){if(e==="channelsFirst")return s.length===1?z(t,[1,s[0],1]):z(t,[1,s[1],s[0]]);if(e==="channelsLast")return s.length===1?z(t,[1,1,s[0]]):z(t,[1].concat(s))}else if(n<3)return t;throw new _(`Unsupported input rank by biasAdd: ${t.rank}`)}function On(n,t,e){return W(()=>(e==null&&(e=_n()),re(e),J(n,xd(n.rank,t,e))))}function fT(n,t=1){if(t!==1)throw new wt(`Support for alpha values other than 1 (${t}) is not implemented yet.`);return Cl(n)}function mT(n){return W(()=>ft(n,J(Pe(n),1)))}function Wg(n,t,e,s){return W(()=>Nk(n,t,e,s))}function gT(n){return W(()=>{const t=J(.5,L(.2,n));return an(t,0,1)})}function Fi(n,t,e=!1){return e?n():t()}const xT=["fanIn","fanOut","fanAvg"],bT=["normal","uniform","truncatedNormal"];function yT(n){fo(xT,"FanMode",n)}function wT(n){fo(bT,"Distribution",n)}class bn extends Xo{fromConfigUsesCustomObjects(){return!1}getConfig(){return{}}}class Ug extends bn{apply(t,e){return $e(t,e)}}Ug.className="Zeros",Z(Ug);class bd extends bn{apply(t,e){return Ns(t,e)}}bd.className="Ones",Z(bd);class Gg extends bn{constructor(t){if(super(),typeof t!="object")throw new _(`Expected argument of type ConstantConfig but got ${t}`);if(t.value===void 0)throw new _(`config must have value set but got ${t}`);this.value=t.value}apply(t,e){return W(()=>L(Pt(this.value),Ns(t,e)))}getConfig(){return{value:this.value}}}Gg.className="Constant",Z(Gg);class Hg extends bn{constructor(t){super(),this.DEFAULT_MINVAL=-.05,this.DEFAULT_MAXVAL=.05,this.minval=t.minval||this.DEFAULT_MINVAL,this.maxval=t.maxval||this.DEFAULT_MAXVAL,this.seed=t.seed}apply(t,e){return $i(t,this.minval,this.maxval,e,this.seed)}getConfig(){return{minval:this.minval,maxval:this.maxval,seed:this.seed}}}Hg.className="RandomUniform",Z(Hg);class qg extends bn{constructor(t){super(),this.DEFAULT_MEAN=0,this.DEFAULT_STDDEV=.05,this.mean=t.mean||this.DEFAULT_MEAN,this.stddev=t.stddev||this.DEFAULT_STDDEV,this.seed=t.seed}apply(t,e){if(e=e||"float32",e!=="float32"&&e!=="int32")throw new wt(`randomNormal does not support dType ${e}.`);return Ul(t,this.mean,this.stddev,e,this.seed)}getConfig(){return{mean:this.mean,stddev:this.stddev,seed:this.seed}}}qg.className="RandomNormal",Z(qg);class Xg extends bn{constructor(t){super(),this.DEFAULT_MEAN=0,this.DEFAULT_STDDEV=.05,this.mean=t.mean||this.DEFAULT_MEAN,this.stddev=t.stddev||this.DEFAULT_STDDEV,this.seed=t.seed}apply(t,e){if(e=e||"float32",e!=="float32"&&e!=="int32")throw new wt(`truncatedNormal does not support dType ${e}.`);return Sm(t,this.mean,this.stddev,e,this.seed)}getConfig(){return{mean:this.mean,stddev:this.stddev,seed:this.seed}}}Xg.className="TruncatedNormal",Z(Xg);class Kg extends bn{constructor(t){super(),this.gain=t.gain!=null?t.gain:1}apply(t,e){return W(()=>{if(t.length!==2||t[0]!==t[1])throw new _("Identity matrix initializer can only be used for 2D square matrices.");return L(this.gain,nm(t[0]))})}getConfig(){return{gain:this.gain}}}Kg.className="Identity",Z(Kg);function CT(n,t="channelsLast"){let e,s;if(re(t),n.length===2)e=n[0],s=n[1];else if([3,4,5].indexOf(n.length)!==-1){if(t==="channelsFirst"){const o=Rs(n,2);e=n[1]*o,s=n[0]*o}else if(t==="channelsLast"){const o=Rs(n,0,n.length-2);e=n[n.length-2]*o,s=n[n.length-1]*o}}else{const o=Rs(n);e=Math.sqrt(o),s=Math.sqrt(o)}return[e,s]}class en extends bn{constructor(t){if(super(),t.scale<0)throw new _(`scale must be a positive float. Got: ${t.scale}`);this.scale=t.scale==null?1:t.scale,this.mode=t.mode==null?"fanIn":t.mode,yT(this.mode),this.distribution=t.distribution==null?"normal":t.distribution,wT(this.distribution),this.seed=t.seed}apply(t,e){const s=CT(t),o=s[0],r=s[1];let i=this.scale;if(this.mode==="fanIn"?i/=Math.max(1,o):this.mode==="fanOut"?i/=Math.max(1,r):i/=Math.max(1,(o+r)/2),this.distribution==="normal"){const a=Math.sqrt(i);if(e=e||"float32",e!=="float32"&&e!=="int32")throw new wt(`${this.getClassName()} does not support dType ${e}.`);return Sm(t,0,a,e,this.seed)}else{const a=Math.sqrt(3*i);return $i(t,-a,a,e,this.seed)}}getConfig(){return{scale:this.scale,mode:this.mode,distribution:this.distribution,seed:this.seed}}}en.className="VarianceScaling",Z(en);class yd extends en{constructor(t){super({scale:1,mode:"fanAvg",distribution:"uniform",seed:t==null?null:t.seed})}getClassName(){return en.className}}yd.className="GlorotUniform",Z(yd);class wd extends en{constructor(t){super({scale:1,mode:"fanAvg",distribution:"normal",seed:t==null?null:t.seed})}getClassName(){return en.className}}wd.className="GlorotNormal",Z(wd);class Cd extends en{constructor(t){super({scale:2,mode:"fanIn",distribution:"normal",seed:t==null?null:t.seed})}getClassName(){return en.className}}Cd.className="HeNormal",Z(Cd);class $d extends en{constructor(t){super({scale:2,mode:"fanIn",distribution:"uniform",seed:t==null?null:t.seed})}getClassName(){return en.className}}$d.className="HeUniform",Z($d);class Id extends en{constructor(t){super({scale:1,mode:"fanIn",distribution:"normal",seed:t==null?null:t.seed})}getClassName(){return en.className}}Id.className="LeCunNormal",Z(Id);class vd extends en{constructor(t){super({scale:1,mode:"fanIn",distribution:"uniform",seed:t==null?null:t.seed})}getClassName(){return en.className}}vd.className="LeCunUniform",Z(vd);class jg extends bn{constructor(t){super(),this.DEFAULT_GAIN=1,this.ELEMENTS_WARN_SLOW=2e3,this.gain=t.gain==null?this.DEFAULT_GAIN:t.gain,this.seed=t.seed}apply(t,e){return W(()=>{if(t.length<2)throw new wt("Shape must be at least 2D.");if(e!=="int32"&&e!=="float32"&&e!==void 0)throw new TypeError(`Unsupported data type ${e}.`);e=e;const s=X(t.slice(0,-1)),o=t[t.length-1],r=s*o;r>this.ELEMENTS_WARN_SLOW&&console.warn(`Orthogonal initializer is being called on a matrix with more than ${this.ELEMENTS_WARN_SLOW} (${r}) elements: Slowness may result.`);const i=[Math.max(o,s),Math.min(o,s)],a=Ul(i,0,1,e,this.seed),l=IS.qr(a,!1);let c=l[0];const h=l[1].flatten().stridedSlice([0],[Math.min(o,s)*Math.min(o,s)],[Math.min(o,s)+1]);return c=L(c,h.sign()),s<o&&(c=c.transpose()),L(Pt(this.gain),c.reshape(t))})}getConfig(){return{gain:this.gain,seed:this.seed}}}jg.className="Orthogonal",Z(jg);const Yg={constant:"Constant",glorotNormal:"GlorotNormal",glorotUniform:"GlorotUniform",heNormal:"HeNormal",heUniform:"HeUniform",identity:"Identity",leCunNormal:"LeCunNormal",leCunUniform:"LeCunUniform",ones:"Ones",orthogonal:"Orthogonal",randomNormal:"RandomNormal",randomUniform:"RandomUniform",truncatedNormal:"TruncatedNormal",varianceScaling:"VarianceScaling",zeros:"Zeros"};function Zg(n,t={}){return Ei(n,mn.getMap().classNameMap,t,"initializer")}function Jt(n){return ud(n)}function Yt(n){if(typeof n=="string"){const t=n in Yg?Yg[n]:n;if(t==="GlorotNormal")return new wd;if(t==="GlorotUniform")return new yd;if(t==="HeNormal")return new Cd;if(t==="HeUniform")return new $d;if(t==="LeCunNormal")return new Id;if(t==="LeCunUniform")return new vd;{const e={};return e.className=t,e.config={},Zg(e)}}else return n instanceof bn?n:Zg(n)}function kd(n){return Array.isArray(n)&&Array.isArray(n[0])}function Gl(n){return n.length===0?[]:Array.isArray(n[0])?n:[n]}function bt(n){let t;if(Array.isArray(n)){if(n.length!==1)throw new _(`Expected Tensor length to be 1; got ${n.length}`);t=n[0]}else t=n;return t}function At(n){if(Array.isArray(n)&&Array.isArray(n[0])){if(n.length===1)return n=n,n[0];throw new _(`Expected exactly 1 Shape; got ${n.length}`)}else return n}function Hl(n){let t=0;for(const e of n)e.shape.length===0?t+=1:t+=e.shape.reduce((s,o)=>s*o);return t}const Qg="Variable";class $T{constructor(t,e="float32",s=Qg,o=!0,r=null){this.dtype=e==null?"float32":e,this.shape=t.shape,this.id=_g(),s=s==null?Qg:s,this.originalName=Mg(s),this.name=Pg(this.originalName),this.trainable_=o,this.constraint=r,this.val=Ik(t,this.trainable_,this.name,this.dtype)}read(){return this.assertNotDisposed(),this.val}write(t){return this.assertNotDisposed(),IT(this.val,t),this.val.id!==t.id&&(this.val.assign(t),this.constraint!=null&&this.val.assign(this.constraint.apply(this.val))),this}dispose(){this.assertNotDisposed(),this.val.dispose()}assertNotDisposed(){if(this.val.isDisposed)throw new Error(`LayersVariable ${this.name} is already disposed.`)}get trainable(){return this.trainable_}set trainable(t){this.trainable_=t,this.val.trainable=t}}function IT(n,t){if(n.shape.toString()!==t.shape.toString())throw new Error("Shape mismatch: "+JSON.stringify(n.shape)+" vs. "+JSON.stringify(t.shape))}function Sd(n){return n.map(t=>t.read())}function Nd(n){n.forEach(t=>{t[0].write(t[1])})}class pe{constructor(t){this.dtype=t.dtype,this.shape=t.shape,t.shape!=null?this.ndim=t.shape.length:this.ndim=t.ndim,this.maxNDim=t.maxNDim,this.minNDim=t.minNDim,this.axes=t.axes||{}}}class Qn{constructor(t,e,s,o,r,i,a){this.dtype=t,this.shape=e,this.sourceLayer=s,this.inputs=o,this.callArgs=r,this.outputTensorIndex=a,this.id=_g(),i!=null&&(this.originalName=Mg(i),this.name=Pg(this.originalName)),this.rank=e.length}}let vT=0;class ql{constructor(t,e){this.callArgs=e,this.id=vT++,this.outboundLayer=t.outboundLayer,this.inboundLayers=t.inboundLayers,this.nodeIndices=t.nodeIndices,this.tensorIndices=t.tensorIndices,this.inputTensors=t.inputTensors,this.outputTensors=t.outputTensors,this.inputMasks=t.inputMasks,this.outputMasks=t.outputMasks,this.inputShapes=t.inputShapes,this.outputShapes=t.outputShapes;for(const s of t.inboundLayers)s!=null&&s.outboundNodes.push(this);t.outboundLayer.inboundNodes.push(this)}getConfig(){const t=[];for(const e of this.inboundLayers)e!=null?t.push(e.name):t.push(null);return{outboundLayer:this.outboundLayer?this.outboundLayer.name:null,inboundLayers:t,nodeIndices:this.nodeIndices,tensorIndices:this.tensorIndices}}}let kT=0;class vt extends Xo{constructor(t={}){super(),this._callHook=null,this._addedWeightNames=[],this._stateful=!1,this.id=kT++,this.activityRegularizer=null,this.inputSpec=null,this.supportsMasking=!1,this._trainableWeights=[],this._nonTrainableWeights=[],this._losses=[],this._updates=[],this._built=!1,this.inboundNodes=[],this.outboundNodes=[];let e=t.name;if(!e){const s=this.getClassName();e=fs(s)+"_"+Vl(s)}if(this.name=e,this.trainable_=t.trainable==null?!0:t.trainable,t.inputShape!=null||t.batchInputShape!=null){let s;if(t.batchInputShape!=null)s=t.batchInputShape;else if(t.inputShape!=null){let r=null;t.batchSize!=null&&(r=t.batchSize),s=[r].concat(t.inputShape)}this.batchInputShape=s;let o=t.dtype;o==null&&(o=t.inputDType),o==null&&(o="float32"),this.dtype=o}t.weights!=null?this.initialWeights=t.weights:this.initialWeights=null,this._refCount=null,this.fastWeightInitDuringBuild=!1}static nodeKey(t,e){return t.name+"_ib-"+e.toString()}getNodeAtIndex(t,e){if(this.inboundNodes.length===0)throw new gn(`The layer has never been called and thus has no defined ${e}.`);if(this.inboundNodes.length<=t)throw new _(`Asked to get ${e} at node ${t}, but the layer has only ${this.inboundNodes.length} inbound nodes.`);return this.inboundNodes[t]}getInputAt(t){return Ye(this.getNodeAtIndex(t,"input").inputTensors)}getOutputAt(t){return Ye(this.getNodeAtIndex(t,"output").outputTensors)}get input(){if(this.inboundNodes.length>1)throw new Kn(`Layer ${this.name} has multiple inbound nodes, hence the notion of "layer input" is ill-defined. Use \`getInputAt(nodeIndex)\` instead.`);if(this.inboundNodes.length===0)throw new Kn(`Layer ${this.name} is not connected, no input to return.`);return Ye(this.getNodeAtIndex(0,"input").inputTensors)}get output(){if(this.inboundNodes.length===0)throw new Kn(`Layer ${this.name} has no inbound nodes.`);if(this.inboundNodes.length>1)throw new Kn(`Layer ${this.name} has multiple inbound nodes, hence the notion of "layer output" is ill-defined. Use \`getOutputAt(nodeIndex)\` instead.`);return Ye(this.getNodeAtIndex(0,"output").outputTensors)}get losses(){return this._losses}calculateLosses(){return this.losses.map(t=>t())}get updates(){return this._updates}get built(){return this._built}set built(t){this._built=t}get trainable(){return this.trainable_}set trainable(t){this._trainableWeights.forEach(e=>e.trainable=t),this.trainable_=t}get trainableWeights(){return this.trainable_?this._trainableWeights.filter(t=>t.trainable):[]}set trainableWeights(t){this._trainableWeights=t}get nonTrainableWeights(){return this.trainable?this._trainableWeights.filter(t=>!t.trainable).concat(this._nonTrainableWeights):this._trainableWeights.concat(this._nonTrainableWeights)}set nonTrainableWeights(t){this._nonTrainableWeights=t}get weights(){return this.trainableWeights.concat(this.nonTrainableWeights)}get stateful(){return this._stateful}resetStates(){if(!this.stateful)throw new Error("Cannot call the resetStates() method of a non-stateful Layer object.")}assertInputCompatibility(t){const e=Vt(t);if(this.inputSpec==null||this.inputSpec.length===0)return;const s=Vt(this.inputSpec);if(e.length!==s.length)throw new _(`Layer ${this.name} expects ${s.length} inputs, but it received ${e.length} input tensors. Input received: ${t}`);for(let o=0;o<e.length;o++){const r=e[o],i=s[o];if(i==null)continue;const a=r.rank;if(i.ndim!=null&&a!==i.ndim)throw new _(`Input ${o} is incompatible with layer ${this.name}: expected ndim=${i.ndim}, found ndim=${a}`);if(i.maxNDim!=null&&a>i.maxNDim)throw new _(`Input ${o} is incompatible with layer ${this.name}: expected max_ndim=${i.maxNDim}, found ndim=${a}`);if(i.minNDim!=null&&a<i.minNDim)throw new _(`Input ${o} is incompatible with layer ${this.name}: expected min_ndim=${i.minNDim}, found ndim=${a}.`);if(i.dtype!=null&&r.dtype!==i.dtype)throw new _(`Input ${o} is incompatible with layer ${this.name} : expected dtype=${i.dtype}, found dtype=${r.dtype}.`);if(i.axes){const l=r.shape;for(const c in i.axes){const u=Number(c),h=i.axes[c],d=u>=0?l[u]:l[l.length+u];if(h!=null&&[h,null].indexOf(d)===-1)throw new _(`Input ${o} is incompatible with layer ${this.name}: expected axis ${u} of input shape to have value ${h} but got shape ${l}.`)}}if(i.shape!=null)for(let l=0;l<i.shape.length;++l){const c=i.shape[l],u=r.shape[l];if(c!=null&&u!=null&&c!==u)throw new _(`Input ${o} is incompatible with layer ${this.name}: expected shape=${i.shape}, found shape=${r.shape}.`)}}}call(t,e){return t}invokeCallHook(t,e){this._callHook!=null&&this._callHook(t,e)}setCallHook(t){this._callHook=t}clearCallHook(){this._callHook=null}apply(t,e){e=e||{},this.assertNotDisposed();const s=Vt(t),o=TT(t),r=ET(t);if(o===r)throw new _("Arguments to apply() must be all SymbolicTensors or all Tensors");return mo(this.name,()=>{if(!this.built){this.assertInputCompatibility(t);const i=[];for(const a of Vt(t))i.push(a.shape);this.build(Ye(i)),this.built=!0,this.initialWeights&&this.setWeights(this.initialWeights),this._refCount===null&&r&&(this._refCount=1)}if(this.assertInputCompatibility(t),r){let i=this.call(t,e);this.supportsMasking&&this.setMaskMetadata(t,i);const a=Vt(i),l=[];for(let c of a)s.indexOf(c)!==-1&&(c=c.clone()),l.push(c);if(i=Ye(l),this.activityRegularizer!=null)throw new wt("Layer invocation in the presence of activity regularizer(s) is not supported yet.");return i}else{const i=ST(t),a=this.computeOutputShape(i);let l;const c=NT(t);if(this.warnOnIncompatibleInputShape(Array.isArray(t)?i[0]:i),a!=null&&a.length>0&&Array.isArray(a[0])?l=a.map((u,h)=>new Qn(c,u,this,Vt(t),e,this.name,h)):l=new Qn(c,a,this,Vt(t),e,this.name),this.addInboundNode(t,l,null,null,i,a,e),this._refCount++,this.activityRegularizer!=null)throw new wt("Layer invocation in the presence of activity regularizer(s) is not supported yet.");return l}})}warnOnIncompatibleInputShape(t){if(this.batchInputShape!=null)if(t.length!==this.batchInputShape.length)console.warn(`The rank of the input tensor provided (shape: ${JSON.stringify(t)}) does not match that of the batchInputShape (${JSON.stringify(this.batchInputShape)}) of the layer ${this.name}`);else{let e=!1;this.batchInputShape.forEach((s,o)=>{s!=null&&t[o]!=null&&t[o]!==s&&(e=!0)}),e&&console.warn(`The shape of the input tensor (${JSON.stringify(t)}) does not match the expectation of layer ${this.name}: ${JSON.stringify(this.batchInputShape)}`)}}get outputShape(){if(this.inboundNodes==null||this.inboundNodes.length===0)throw new Kn(`The layer ${this.name} has never been called and thus has no defined output shape.`);const t=[];for(const e of this.inboundNodes){const s=JSON.stringify(e.outputShapes);t.indexOf(s)===-1&&t.push(s)}if(t.length===1){const e=this.inboundNodes[0].outputShapes;return Array.isArray(e)&&Array.isArray(e[0])&&e.length===1?e[0]:e}else throw new Kn(`The layer ${this.name} has multiple inbound nodes with different output shapes. Hence the notion of "output shape" is ill-defined for the layer.`)}countParams(){if(!this.built)throw new gn(`You tried to call countParams() on ${this.name}, but the layer is not built yet. Build it first by calling build(batchInputShape).`);return Hl(this.weights)}build(t){this.built=!0}getWeights(t=!1){return Sd(t?this.trainableWeights:this.weights)}setWeights(t){W(()=>{const e=this.weights;if(e.length!==t.length)throw new _(`You called setWeights(weights) on layer "${this.name}" with a weight list of length ${t.length}, but the layer was expecting ${e.length} weights. Provided weights: ${t}...`);if(e.length===0)return;const s=[],o=Sd(e);for(let r=0;r<o.length;++r){const i=o[r],a=e[r],l=t[r];if(!Lt(i.shape,l.shape))throw new _(`Layer weight shape ${i.shape} not compatible with provided weight shape ${l.shape}`);s.push([a,l])}Nd(s)})}addWeight(t,e,s,o,r,i,a,l){if(this._addedWeightNames.indexOf(t)!==-1)throw new _(`Duplicate weight name ${t} for layer ${this.name}`);this._addedWeightNames.push(t),s==null&&(s="float32"),this.fastWeightInitDuringBuild&&(o=l!=null?l():Yt("zeros"));const c=o.apply(e,s),u=new $T(c,s,t,i,a);return c.dispose(),r!=null&&this.addLoss(()=>r.apply(u.read())),i==null&&(i=!0),i?this._trainableWeights.push(u):this._nonTrainableWeights.push(u),u}setFastWeightInitDuringBuild(t){this.fastWeightInitDuringBuild=t}addLoss(t){t==null||Array.isArray(t)&&t.length===0||(t=Vt(t),this._losses!==void 0&&this._losses!==null&&this.losses.push(...t))}computeOutputShape(t){return t}computeMask(t,e){if(!this.supportsMasking){if(e!=null)if(Array.isArray(e))e.forEach(s=>{if(s!=null)throw new TypeError(`Layer ${this.name} does not support masking, but was passed an inputMask.`)});else throw new TypeError(`Layer ${this.name} does not support masking, but was passed an inputMask.`);return null}return e}setMaskMetadata(t,e,s){if(!this.supportsMasking)return;const o=this.computeMask(t,s),r=Vt(e),i=Vt(o);if(r.length!==i.length)throw new Error(`${this.name} outputs ${r.length} tensors but ${r.length} masks for those tensors`);for(let a=0;a<r.length;a++)r[a].kerasMask=i[a]}addInboundNode(t,e,s,o,r,i,a=null){const l=Vt(t);e=Vt(e),s=Vt(s),o=Vt(o),r=Gl(r),i=Gl(i);const c=[],u=[],h=[];for(const d of l)c.push(d.sourceLayer),u.push(d.nodeIndex),h.push(d.tensorIndex);new ql({outboundLayer:this,inboundLayers:c,nodeIndices:u,tensorIndices:h,inputTensors:l,outputTensors:e,inputMasks:s,outputMasks:o,inputShapes:r,outputShapes:i},a);for(let d=0;d<e.length;d++)e[d].sourceLayer=this,e[d].nodeIndex=this.inboundNodes.length-1,e[d].tensorIndex=d}getConfig(){const t={name:this.name,trainable:this.trainable};return this.batchInputShape!=null&&(t.batchInputShape=this.batchInputShape),this.dtype!=null&&(t.dtype=this.dtype),t}disposeWeights(){return this.weights.forEach(t=>t.dispose()),this.weights.length}assertNotDisposed(){if(this._refCount===0)throw new Error(`Layer '${this.name}' is already disposed.`)}dispose(){if(!this.built)throw new Error(`Cannot dispose Layer ${this.name} because it has not been built yet.`);if(this._refCount===null)throw new Error(`Cannot dispose Layer ${this.name} because it has not been used yet.`);this.assertNotDisposed();let t=0;return--this._refCount===0&&(t=this.disposeWeights()),{refCountAfterDispose:this._refCount,numDisposedVariables:t}}}function ST(n){n=Vt(n);const t=[];for(const e of n)t.push(e.shape);return Ye(t)}function NT(n){return"float32"}function Jg(n,t,e){if((t==null||e!=null&&e>0)&&(t=n.sourceLayer,e=n.nodeIndex),t.inboundNodes.length===0)return[n];{const s=t.inboundNodes[e];if(s.inboundLayers.length===0)return s.inputTensors;{const o=[];for(let r=0;r<s.inboundLayers.length;r++){const i=s.inputTensors[r],a=s.inboundLayers[r],l=s.nodeIndices[r],c=Jg(i,a,l);for(const u of c)o.indexOf(u)===-1&&o.push(u)}return o}}}function TT(n){let t=!0;for(const e of Vt(n))if(!(e instanceof Qn)){t=!1;break}return t}function ET(n){let t=!0;for(const e of Vt(n))if(e instanceof Qn){t=!1;break}return t}class _i extends vt{constructor(t){if(super({dtype:t.dtype,name:t.name!=null?t.name:Vl("input").toString()}),t.batchSize==null&&(t.batchSize=null),t.sparse==null&&(t.sparse=!1),this.trainable=!1,this.built=!0,this.sparse=t.sparse,t.inputShape!=null&&t.batchInputShape!=null)throw new _("Only provide the inputShape OR batchInputShape argument to inputLayer, not both at the same time.");let e=t.batchInputShape;if(e==null){if(t.inputShape==null)throw new _("An InputLayer should be passed either a `batchInputShape` or an `inputShape`.");e=[t.batchSize].concat(t.inputShape)}else if(t.batchSize!=null)throw new _("Cannot specify batchSize if batchInputShape is specified when creating an InputLayer.");const s=t.dtype||"float32";this.batchInputShape=e,this.dtype=s,this.inputSpec=[{shape:e}];const o=new Qn(this.dtype,this.batchInputShape,this,[],{},this.name);o.nodeIndex=0,o.tensorIndex=0,new ql({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:[o],outputTensors:[o],inputMasks:[null],outputMasks:[null],inputShapes:[e],outputShapes:[e]})}apply(t,e){throw new _(`Cannot pass any input to an InputLayer's apply() method. InputLayer name: ${this.name}`)}dispose(){return{refCountAfterDispose:this._refCount,numDisposedVariables:0}}getConfig(){return{batchInputShape:this.batchInputShape,dtype:this.dtype,sparse:this.sparse,name:this.name}}}_i.className="InputLayer",Z(_i);function RT(n){if(n.batchShape==null&&n.shape==null)throw new Error("Please provide to Input either a `shape` or a `batchShape` argument. Note that `shape` does not include the batch dimension.");if(n.batchShape!=null&&n.shape!=null)throw new _("Please provide either a `shape` or `batchShape` argument to Input, but not both.");let t=n.batchShape;n.shape!=null&&t==null&&(t=[null].concat(n.shape));let e=n.dtype;return e==null&&(e="float32"),new _i({batchInputShape:t,name:n.name,dtype:e,sparse:n.sparse}).inboundNodes[0].outputTensors[0]}function AT(n,t){if(n.dtype==null||n.dtype===t.dtype)return t;try{return rt(t,n.dtype)}catch(e){throw new _(`The dtype of the feed (${t.dtype}) can not be cast to the dtype of the key '${n.name}' (${n.dtype}).`)}}class Ds{constructor(t){if(this.id2Value={},this.id2Mask={},this.name2Id={},t instanceof Ds)for(const e in t.id2Value)this.id2Value[e]=t.id2Value[e],e in t.id2Mask&&(this.id2Mask[e]=t.id2Mask[e]);else{if(t==null)return;for(const e of t)this.add(e.key,e.value)}}add(t,e,s){if(this.id2Value[t.id]==null)this.id2Value[t.id]=AT(t,e),this.name2Id[t.name]=t.id,s!=null&&(this.id2Mask[t.id]=s);else throw new _(`Duplicate key: name=${t.name}, id=${t.id}`);return this}addFeed(t){this.add(t.key,t.value)}hasKey(t){return this.id2Value[t.id]!=null}names(){return Object.keys(this.name2Id)}getValue(t){if(t instanceof Qn){if(this.id2Value[t.id]==null)throw new _(`Nonexistent key: ${t.name}`);return this.id2Value[t.id]}else{const e=this.name2Id[t];if(e==null)throw new _(`Feed dict has no SymbolicTensor name: ${t}`);return this.id2Value[e]}}getMask(t){if(t instanceof Qn){if(this.id2Value[t.id]==null)throw new _(`Nonexistent key: ${t.name}`);return this.id2Mask[t.id]}else{const e=this.name2Id[t];if(e==null)throw new _(`Feed dict has no SymbolicTensor name: ${t}`);return this.id2Mask[e]}}disposeMasks(){this.id2Mask!=null&&kt(this.id2Mask)}}const Xl=new Rg,Kl=new Rg;function DT(n){Xl!=null&&Xl.setMaxEntries(n),Kl!=null&&Kl.setMaxEntries(n)}function Oi(n,t,e,s){const o=e==null?!1:e.training,r=Array.isArray(n),i=r?n:[n],a=i.map(f=>f.name),l=[],c=t.names();for(const f of a)c.indexOf(f)!==-1?l.push(t.getValue(f)):l.push(null);const u=a.join(",")+"|"+t.names().sort().join(",");let h=Xl.get(u),d;if(h==null){const f=FT(i,t);h=f.sorted,d=f.recipientCounts,Xl.put(u,h),Kl.put(u,d)}d={},o||Object.assign(d,Kl.get(u));const p=new Ds(t);for(let f=0;f<h.length;++f){const m=h[f],g=m.sourceLayer;if(g instanceof _i)continue;const x=[],b=[],w=[];let y=!1;for(const S of m.inputs){const N=p.getValue(S),C=p.getMask(S);x.push(N),b.push(C),C!=null&&(y=!0),o||(d[S.name]--,d[S.name]===0&&!t.hasKey(S)&&a.indexOf(S.name)===-1&&!N.isDisposed&&S.sourceLayer.stateful!==!0&&w.push(N))}y&&(e=e||{},e.mask=b[0]);const $=Vt(g.apply(x,e));let I=null;g.supportsMasking&&(I=g.computeMask(x,b));const v=OT(m),T=Array.isArray(v)?v:[v];for(let S=0;S<T.length;++S){p.hasKey(T[S])||p.add(T[S],$[S],Array.isArray(I)?I[0]:I);const N=a.indexOf(T[S].name);N!==-1&&(l[N]=$[S])}o||kt(w)}return p.disposeMasks(),r?l:l[0]}function FT(n,t){k(n!=null&&n.length>0,()=>"Expected at least one fetch, got none");let e=[],s={};if(n.length===1){const o=tx(n[0],t);e=o.sorted,s=o.recipientMap}else{const o=new Set;for(const r of n){const{sorted:i,recipientMap:a}=tx(r,t);for(const l of i)o.has(l.name)||(e.push(l),o.add(l.name));for(const l in a)s[l]==null&&(s[l]=new Set),a[l].forEach(c=>s[l].add(c))}}return{sorted:e,recipientCounts:_T(s)}}function _T(n){const t={};for(const e in n)t[e]=n[e].size;return t}function tx(n,t){const e=new Set,s=[],o={};for(const a of t.names())e.add(a);const r=[],i=[];for(r.push(n);r.length>0;){const a=r[r.length-1];if(e.has(a.name)){r.pop();continue}const l=i[i.length-1]===r.length-1;if(a.inputs.length===0||l)r.pop(),s.push(a),e.add(a.name),l&&i.pop();else{i.push(r.length-1);for(const c of a.inputs)o[c.name]==null&&(o[c.name]=new Set),o[c.name].add(a.name),!e.has(c.name)&&r.push(c)}}return{sorted:s,recipientMap:o}}function OT(n){let t;if(n.sourceLayer.inboundNodes.length===1)t=n.sourceLayer.output;else{let e=null;for(let s=0;s<n.sourceLayer.inboundNodes.length;++s)for(const o of n.sourceLayer.inboundNodes[s].outputTensors)if(o.id===n.id){e=s;break}t=n.sourceLayer.getOutputAt(e)}return t}U().registerFlag("TOPOLOGICAL_SORT_CACHE_MAX_ENTRIES",()=>100,DT);function Td(n,t){return W(()=>Fe(pt(L(n,n),t,!0)))}class Li extends Xo{getConfig(){return{}}}class ex extends Li{constructor(t){super(),this.defaultMaxValue=2,this.defaultAxis=0,this.maxValue=t.maxValue!=null?t.maxValue:this.defaultMaxValue,this.axis=t.axis!=null?t.axis:this.defaultAxis}apply(t){return W(()=>{const e=Td(t,this.axis),s=an(e,0,this.maxValue);return L(t,ft(s,J(de(),e)))})}getConfig(){return{maxValue:this.maxValue,axis:this.axis}}}ex.className="MaxNorm",Z(ex);class nx extends Li{constructor(t){super(),this.defaultAxis=0,this.axis=t.axis!=null?t.axis:this.defaultAxis}apply(t){return W(()=>ft(t,J(de(),Td(t,this.axis))))}getConfig(){return{axis:this.axis}}}nx.className="UnitNorm",Z(nx);class sx extends Li{apply(t){return io(t)}}sx.className="NonNeg",Z(sx);class ox extends Li{constructor(t){super(),this.defaultMinValue=0,this.defaultMaxValue=1,this.defaultRate=1,this.defaultAxis=0,this.minValue=t.minValue!=null?t.minValue:this.defaultMinValue,this.maxValue=t.maxValue!=null?t.maxValue:this.defaultMaxValue,this.rate=t.rate!=null?t.rate:this.defaultRate,this.axis=t.axis!=null?t.axis:this.defaultAxis}apply(t){return W(()=>{const e=Td(t,this.axis),s=J(L(this.rate,an(e,this.minValue,this.maxValue)),L(1-this.rate,e));return L(t,ft(s,J(de(),e)))})}getConfig(){return{minValue:this.minValue,maxValue:this.maxValue,rate:this.rate,axis:this.axis}}}ox.className="MinMaxNorm",Z(ox);const rx={maxNorm:"MaxNorm",minMaxNorm:"MinMaxNorm",nonNeg:"NonNeg",unitNorm:"UnitNorm"};function fe(n){return ud(n)}function ix(n,t={}){return Ei(n,mn.getMap().classNameMap,t,"constraint")}function me(n){if(n==null)return null;if(typeof n=="string"){const e={className:n in rx?rx[n]:n,config:{}};return ix(e)}else return n instanceof Li?n:ix(n)}function xo(n){return Q(this,null,function*(){if(n==null)return;const t=[],e=[],s=[];for(const o in n){const r=n[o];if(typeof r!="number"){const i=r;t.push(i.data()),e.push(o),s.push(i)}}if(t.length>0){const o=yield Promise.all(t);for(let r=0;r<o.length;++r)n[e[r]]=o[r][0];kt(s)}})}function ax(n){if(n!=null)for(const t in n){const e=n[t];typeof e!="number"&&e.dispose()}}var lx;(function(n){n[n.SILENT=0]="SILENT",n[n.VERBOSE=1]="VERBOSE"})(lx||(lx={}));const LT=125;class Mi{constructor(){this.validationData=null}setParams(t){this.params=t}onEpochBegin(t,e){return Q(this,null,function*(){})}onEpochEnd(t,e){return Q(this,null,function*(){})}onBatchBegin(t,e){return Q(this,null,function*(){})}onBatchEnd(t,e){return Q(this,null,function*(){})}onTrainBegin(t){return Q(this,null,function*(){})}onTrainEnd(t){return Q(this,null,function*(){})}setModel(t){}}class MT{constructor(t,e=10){t==null&&(t=[]),this.callbacks=t,this.queueLength=e}append(t){this.callbacks.push(t)}setParams(t){for(const e of this.callbacks)e.setParams(t)}setModel(t){for(const e of this.callbacks)e.setModel(t)}onEpochBegin(t,e){return Q(this,null,function*(){e==null&&(e={});for(const s of this.callbacks)yield s.onEpochBegin(t,e)})}onEpochEnd(t,e){return Q(this,null,function*(){e==null&&(e={});for(const s of this.callbacks)yield s.onEpochEnd(t,e)})}onBatchBegin(t,e){return Q(this,null,function*(){e==null&&(e={});for(const s of this.callbacks)yield s.onBatchBegin(t,e)})}onBatchEnd(t,e){return Q(this,null,function*(){e==null&&(e={});for(const s of this.callbacks)yield s.onBatchEnd(t,e)})}onTrainBegin(t){return Q(this,null,function*(){t==null&&(t={});for(const e of this.callbacks)yield e.onTrainBegin(t)})}onTrainEnd(t){return Q(this,null,function*(){t==null&&(t={});for(const e of this.callbacks)yield e.onTrainEnd(t)})}}class PT extends Mi{constructor(){super()}onEpochBegin(t){return Q(this,null,function*(){this.seen=0,this.totals={}})}onBatchEnd(t,e){return Q(this,null,function*(){e==null&&(e={});const s=e.size==null?0:e.size;this.seen+=s;for(const o in e){const r=e[o];if(typeof r=="number")this.totals.hasOwnProperty(o)||(this.totals[o]=0),this.totals[o]=this.totals[o]+r*s;else{let i;o in this.totals?i=this.totals[o]:this.totals[o]=0;const a=W(()=>J(this.totals[o],L(r,s)));this.totals[o]=a,i!=null&&i.dispose()}}})}onEpochEnd(t,e){return Q(this,null,function*(){if(e!=null)for(const s of this.params.metrics)this.totals[s]!=null&&(typeof this.totals[s]=="number"?e[s]=this.totals[s]/this.seen:W(()=>{const o=L(ft(1,this.seen),this.totals[s]);e[s]=o,this.totals[s].dispose(),Wn(e[s])}))})}}class BT extends Mi{onTrainBegin(t){return Q(this,null,function*(){this.epoch=[],this.history={}})}onEpochEnd(t,e){return Q(this,null,function*(){e==null&&(e={}),this.epoch.push(t);for(const s in e)this.history[s]==null&&(this.history[s]=[]),this.history[s].push(e[s])})}syncData(){return Q(this,null,function*(){const t=[],e=[],s=[];for(const r in this.history){const i=this.history[r];for(let a=0;a<i.length;++a)if(typeof i[a]!="number"){const l=i[a];t.push(l.data()),e.push(r),s.push(a)}}const o=yield Promise.all(t);for(let r=0;r<o.length;++r)this.history[e[r]][s[r]].dispose(),this.history[e[r]][s[r]]=o[r][0]})}}class zT extends Mi{constructor(t,e){if(super(),this.currentEpoch=0,this.nowFunc=t.nowFunc,this.nextFrameFunc=t.nextFrameFunc||Ym,this.yieldEvery=e||"auto",this.yieldEvery==="auto"&&(this.yieldEvery=LT),this.yieldEvery==="never"&&t.onYield!=null)throw new Error("yieldEvery is `never` but you provided an `onYield` callback. Either change `yieldEvery` or remove the callback");qc(this.yieldEvery)&&(this.maybeWait=tT(this.maybeWait.bind(this),this.yieldEvery,this.nowFunc)),this.trainBegin=t.onTrainBegin,this.trainEnd=t.onTrainEnd,this.epochBegin=t.onEpochBegin,this.epochEnd=t.onEpochEnd,this.batchBegin=t.onBatchBegin,this.batchEnd=t.onBatchEnd,this.yield=t.onYield}maybeWait(t,e,s){return Q(this,null,function*(){const o=[];this.yield!=null&&(yield xo(s),o.push(this.yield(t,e,s))),o.push(this.nextFrameFunc()),yield Promise.all(o)})}onEpochBegin(t,e){return Q(this,null,function*(){this.currentEpoch=t,this.epochBegin!=null&&(yield xo(e),yield this.epochBegin(t,e))})}onEpochEnd(t,e){return Q(this,null,function*(){const s=[];this.epochEnd!=null&&(yield xo(e),s.push(this.epochEnd(t,e))),this.yieldEvery==="epoch"&&s.push(this.nextFrameFunc()),yield Promise.all(s)})}onBatchBegin(t,e){return Q(this,null,function*(){this.batchBegin!=null&&(yield xo(e),yield this.batchBegin(t,e))})}onBatchEnd(t,e){return Q(this,null,function*(){const s=[];this.batchEnd!=null&&(yield xo(e),s.push(this.batchEnd(t,e))),this.yieldEvery==="batch"?s.push(this.nextFrameFunc()):qc(this.yieldEvery)&&s.push(this.maybeWait(this.currentEpoch,t,e)),yield Promise.all(s)})}onTrainBegin(t){return Q(this,null,function*(){this.trainBegin!=null&&(yield xo(t),yield this.trainBegin(t))})}onTrainEnd(t){return Q(this,null,function*(){this.trainEnd!=null&&(yield xo(t),yield this.trainEnd(t))})}}function cx(n,t){return n==null&&(n={}),n instanceof Mi?[n]:Array.isArray(n)&&n[0]instanceof Mi?n:Vt(n).map(s=>new zT(s,t))}class yn{constructor(){}static registerCallbackConstructor(t,e){k(t>=0&&Number.isInteger(t),()=>`Verbosity level is expected to be an integer >= 0, but got ${t}`),yn.checkForDuplicate(e),yn.constructors[t]==null&&(yn.constructors[t]=[]),yn.constructors[t].push(e)}static checkForDuplicate(t){for(const e in yn.constructors)yn.constructors[+e].forEach(o=>{if(o===t)throw new _("Duplicate callback constructor.")})}static clear(){yn.constructors={}}static createCallbacks(t){const e=[];for(const s in yn.constructors){const o=+s;t>=o&&e.push(...yn.constructors[o])}return e.map(s=>new s)}}yn.constructors={};function ux(n,t,e,s,o,r,i,a,l){const c=new BT,u=[new PT,...yn.createCallbacks(t)];n!=null&&u.push(...n),u.push(c);const h=new MT(u);return h.setParams({epochs:e,initialEpoch:s,samples:o,steps:r,batchSize:i,verbose:t,doValidation:a,metrics:l}),{callbackList:h,history:c}}function ms(n,t={},e=!1){return Ei(n,mn.getMap().classNameMap,t,"layer",e)}function jl(n,t){return W(()=>{n.dtype!=="float32"&&(n=rt(n,"float32"));const e=pt(Di(n),t,!0),s=wl(e.shape,de()),o=Fe(Ss(e,s));return ft(n,o)})}function Yl(n,t){return W(()=>ce(Di(gt(t,n)),-1))}function Ed(n,t){return W(()=>ce(Pe(gt(t,n)),-1))}function Rd(n,t){return W(()=>{const e=gt(n,t),s=an(Pe(n),de(),Number.MAX_VALUE),o=Pe(ft(e,s));return L(100,ce(o,-1))})}function VT(n,t){return W(()=>{const e=an(t,de(),Number.MAX_VALUE),s=qn(J(1,e)),o=an(n,de(),Number.MAX_VALUE),r=qn(J(1,o));return ce(Di(gt(s,r)),-1)})}function WT(n,t){return W(()=>{const e=Ss(0,gt(1,L(n,t)));return ce(Di(e),-1)})}function UT(n,t){return W(()=>{const e=Ss(0,gt(1,L(n,t)));return ce(e,-1)})}function GT(n,t){return W(()=>{const e=pt(L(n,t),-1),s=Rn(L(gt(1,n),t),-1);return Ss(0,J(1,gt(s,e)))})}function HT(n,t){return W(()=>{const e=Math.log(2),s=gt(t,n),o=gt(J(s,wi(L(-2,s))),e);return ce(o,-1)})}function Pi(n,t,e=!1){return W(()=>{if(e)t=Sh(t);else{const s=pt(t,t.shape.length-1,!0);t=ft(t,s)}return t=an(t,de(),1-de()),oe(pt(L(rt(n,"float32"),qn(t)),t.shape.length-1))})}function Zl(n,t,e=!1){return W(()=>{const s=rt(vl(dT(n)),"int32");t=an(t,de(),1-de());const o=t.shape,r=z(am(s,o[o.length-1]),o);return Pi(r,t,e)})}function qT(n,t){if(!Lt(n.shape,t.shape))throw new _(`logits and labels must have the same shape, but got shapes ${JSON.stringify(n.shape)} and ${JSON.stringify(t.shape)}`);return W(()=>{const e=io(t),s=oe(Pe(t));return J(gt(e,L(t,n)),sm(Hn(s)))})}function Ql(n,t){return W(()=>{let e;return e=an(t,de(),1-de()),e=qn(ft(e,gt(1,e))),ce(qT(n,e),-1)})}function XT(n,t){return W(()=>{const e=an(n,de(),1),s=an(t,de(),1);return pt(L(n,qn(ft(e,s))),-1)})}function KT(n,t){return W(()=>{const e=qn(J(de(),t));return ce(gt(t,L(n,e)),-1)})}function hx(n,t){return W(()=>{const e=jl(n,-1),s=jl(t,-1),o=L(e,s);return oe(pt(o,-1))})}const Jl={meanSquaredError:Yl,meanAbsoluteError:Ed,meanAbsolutePercentageError:Rd,meanSquaredLogarithmicError:VT,squaredHinge:WT,hinge:UT,categoricalHinge:GT,logcosh:HT,categoricalCrossentropy:Pi,sparseCategoricalCrossentropy:Zl,binaryCrossentropy:Ql,kullbackLeiblerDivergence:XT,poisson:KT,cosineProximity:hx};function Ad(n){if(typeof n=="string"){if(n in Jl)return Jl[n];let t=`Unknown loss ${n}`;throw n.toLowerCase().includes("softmaxcrossentropy")&&(t=`Unknown loss ${n}. Use "categoricalCrossentropy" as the string name for tf.losses.softmaxCrossEntropy`),new _(t)}else return n}function dx(n,t){return W(()=>{const e=L(.5,fn(t)),s=Yn(ln(t,e),n.dtype);return ce(Gn(n,s),-1)})}function px(n,t){return W(()=>Yn(Gn(fi(n,-1),fi(t,-1)),"float32"))}function jT(n,t){return W(()=>rt(pt(cs(Gn(n,1),Gn(t,1))),"float32"))}function YT(n,t){return W(()=>rt(pt(cs(Gn(n,0),Gn(t,1))),"float32"))}function ZT(n,t){return W(()=>{const e=jT(n,t),s=YT(n,t),o=J(e,s);return rt(Be(ln(o,0),ft(e,o),0),"float32")})}function QT(n,t){return Ql(n,t)}function JT(n,t){return n.rank===t.rank&&(n=vi(n,[n.rank-1])),t=fi(t,-1),t.dtype!==n.dtype&&(t=rt(t,n.dtype)),rt(Gn(n,t),"float32")}const tE=Yl,eE=Yl,nE=Ed,sE=Ed,oE=Rd,rE=Rd,fx=Pi,iE=hx,mx=Zl,tc={binaryAccuracy:dx,categoricalAccuracy:px,precision:ZT,categoricalCrossentropy:fx,sparseCategoricalCrossentropy:mx,mse:tE,MSE:eE,mae:nE,MAE:sE,mape:oE,MAPE:rE,cosine:iE};function aE(n){if(typeof n=="string"&&n in tc)return tc[n];if(typeof n!="string"&&n!=null)return n;throw new _(`Unknown metric ${n}`)}function ec(n){if(jn(n!==null,`Unknown LossOrMetricFn ${n}`),typeof n=="string")return n;{let t;for(const e of Object.keys(Jl))if(Jl[e]===n){t=e;break}if(t!==void 0)return t;for(const e of Object.keys(tc))if(tc[e]===n){t=e;break}return t!==void 0?t:n.name}}function lE(n){const t={Adagrad:()=>Ko.adagrad(.01),Adadelta:()=>Ko.adadelta(1,.95,de()),Adam:()=>Ko.adam(.001,.9,.999,de()),Adamax:()=>Ko.adamax(.002,.9,.999,de(),0),RMSProp:()=>Ko.rmsprop(.001,.9,0,de()),SGD:()=>Ko.sgd(.01)};if(t.adagrad=t.Adagrad,t.adadelta=t.Adadelta,t.adam=t.Adam,t.adamax=t.Adamax,t.rmsprop=t.RMSProp,t.sgd=t.SGD,n in t)return t[n]();throw new _(`Unknown Optimizer ${n}`)}const gx=1*1024*1024;function xx(n,t,e=!1){if(n==null||typeof n!="object"||Object.getPrototypeOf(n)!==Object.prototype||!Dd(n))throw new Error("User-defined metadata is expected to be a JSON object, but is not.");if(e){const s=JSON.stringify(n);s.length>gx&&console.warn(`User-defined metadata of model "${t}" is too large in size (length=${s.length} when serialized). It is not recommended to store such large objects in user-defined metadata. Please make sure its serialized length is <= ${gx}.`)}}function Dd(n){if(n===null)return!0;if(typeof n=="object")if(Object.getPrototypeOf(n)===Object.prototype){const t=Object.keys(n);for(const e of t)if(typeof e!="string"||!Dd(n[e]))return!1;return!0}else if(Array.isArray(n)){for(const t of n)if(!Dd(t))return!1;return!0}else return!1;else{const t=typeof n;return t==="string"||t==="number"||t==="boolean"}}function cE(n,t,e,s=console.log){const o=hE(n),r=["Layer (type)","Input Shape","Output shape","Param #"];o?(t=t||90,e=e||[.32,.61,.89,1]):(t=t||115,e=e||[.24,.48,.7,.8,1]),e[e.length-1]<=1&&(e=e.map(u=>Math.floor(t*u)));let i;if(!o){r.push("Receives inputs"),i=[];for(const u in n.nodesByDepth)i.push(...n.nodesByDepth[u])}s("_".repeat(t)),nc(r,e,s),s("=".repeat(t));const a=n.layers;for(let u=0;u<a.length;++u)o?dE(a[u],e,s):pE(a[u],e,i,s),s((u===a.length-1?"=":"_").repeat(t));n.checkTrainableWeightsConsistency();const l=uE(n),c=Hl(n.nonTrainableWeights);s(`Total params: ${l+c}`),s(`Trainable params: ${l}`),s(`Non-trainable params: ${c}`),s("_".repeat(t))}function uE(n){let t;return n.collectedTrainableWeights!=null?t=Hl(n.collectedTrainableWeights):t=Hl(n.trainableWeights),t}function hE(n){let t=!0;const e=[],s=[];for(const o in n.nodesByDepth)e.push(n.nodesByDepth[o]);for(const o of e){if(o.length>1||o.length===1&&o[0].inboundLayers.length>1){t=!1;break}s.push(...o)}if(t)for(const o of n.layers){let r=!1;for(const i of o.inboundNodes)if(s.indexOf(i)!==-1)if(r){t=!1;break}else r=!0;if(!t)break}return t}function nc(n,t,e=console.log){let s="";for(let o=0;o<n.length;++o)o>0&&(s=s.slice(0,s.length-1)+" "),s+=n[o],s=s.slice(0,t[o]),s+=" ".repeat(t[o]-s.length);e(s)}function dE(n,t,e){let s,o;try{o=n.inboundNodes.map(l=>JSON.stringify(l.inputShapes)).join(",")}catch(l){o="multiple"}try{s=JSON.stringify(n.outputShape)}catch(l){s="multiple"}const r=n.name,i=n.getClassName(),a=[`${r} (${i})`,o,s,n.countParams().toString()];nc(a,t,e)}function pE(n,t,e,s){let o,r;try{r=n.inboundNodes.map(h=>JSON.stringify(h.inputShapes)).join(",")}catch(h){r="multiple"}try{o=JSON.stringify(n.outputShape)}catch(h){o="multiple"}const i=[];for(const h of n.inboundNodes)if(!(e!=null&&e.length>0&&e.indexOf(h)===-1))for(let d=0;d<h.inboundLayers.length;++d){const p=h.inboundLayers[d].name,f=h.nodeIndices[d],m=h.tensorIndices[d];i.push(`${p}[${f}][${m}]`)}const a=n.name,l=n.getClassName(),c=i.length===0?"":i[0],u=[`${a} (${l})`,r,o,n.countParams().toString(),c];nc(u,t,s);for(let h=1;h<i.length;++h)nc(["","","","",i[h]],t,s)}function bx(n,t,e){return(n==="inboundNodes"||n==="outputLayers"||n==="inputLayers")&&t===0&&typeof e=="string"}function Fd(n,t){if(n===null)return null;if(typeof n=="string")return po(n);if(typeof n=="number"||typeof n=="boolean")return n;if(n instanceof Array){const e=[],s=n.length;for(let o=0;o<s;++o){const r=n[o];bx(t,o,r)?e.push(r):e.push(Fd(r,t))}return e}else{const e={};for(const s of Object.keys(n)){const o=n[s];if(s==="name"&&typeof o=="string")e[s]=o;else{const r=po(s);e[r]=Fd(o,r)}}return e}}function _d(n,t){if(n==null)return null;if(typeof n=="string")return fs(n);if(typeof n=="number"||typeof n=="boolean")return n;if(n instanceof Array){const e=[],s=n.length;for(let o=0;o<s;++o){const r=n[o];bx(t,o,r)?e.push(r):e.push(_d(r,t))}return e}else{const e={};for(const s of Object.keys(n)){const o=n[s],r=fs(s);(s==="name"||s==="className")&&typeof o=="string"?e[r]=o:e[r]=_d(o,s)}return e}}const yx="4.20.0";const fE=n=>{const t=Object.keys(n);if(t.length===0)return!1;const e=t[0].split("/");return!isNaN(parseInt(e[e.length-1],10))};class Ln extends vt{constructor(t){if(super({}),this.containerNodes=new Set,this.name=t.name,this.name==null){const b=this.getClassName().toLowerCase();this.name=Vl(b)}if(this.supportsMasking=!1,this.trainable_=!0,Array.isArray(t.inputs)?this.inputs=t.inputs.slice():this.inputs=[t.inputs],Array.isArray(t.outputs)?this.outputs=t.outputs.slice():this.outputs=[t.outputs],Es(this.inputs).length!==this.inputs.length)throw new _(`The list of inputs passed to the model is redundant. All inputs should only appear once. Found: ${this.inputs.map(b=>b.name)}`);Es(this.outputs).length!==this.outputs.length&&console.warn(`The list of outputs passed to the model is redundant. All outputs should only appear once. Found: ${this.outputs.map(b=>b.name)}`),this.inputLayers=[],this.inputLayersNodeIndices=[],this.inputLayersTensorIndices=[],this.outputLayers=[],this.outputLayersNodeIndices=[],this.outputLayersTensorIndices=[],this.layers=[],this.internalContainerRefs=[];for(const b of this.outputs){const w=b.sourceLayer,y=b.nodeIndex,$=b.tensorIndex;this.outputLayers.push(w),this.outputLayersNodeIndices.push(y),this.outputLayersTensorIndices.push($)}for(const b of this.inputs){const w=b.sourceLayer,y=b.nodeIndex,$=b.tensorIndex;jn(y===0,"input layer has >1 nodes"),jn($===0,"input layer has >1 tensors"),this.inputLayers.push(w),this.inputLayersNodeIndices.push(y),this.inputLayersTensorIndices.push($)}this.inputNames=[],this.outputNames=[],this.feedInputShapes=[],this.feedInputNames=[],this.feedOutputNames=[];for(let b=0;b<this.inputLayers.length;b++){const w=this.inputLayers[b];if(!(w instanceof _i))throw new TypeError(`Input layers to a LayersModel must be InputLayer objects. Received inputs: ${t.inputs}. Input ${b} (0-based) originates from layer type ${w.getClassName()}.`);this.inputNames.push(w.name),this.feedInputShapes.push(w.batchInputShape),this.feedInputNames.push(w.name)}for(const b of this.outputLayers)this.outputNames.push(b.name);this.internalInputShapes=this.inputs.map(b=>b.shape),this.internalOutputShapes=this.outputs.map(b=>b.shape);const e={},s={},o={},r={},i={},a=[],l=(b,w,y,$,I,v)=>{($==null||I==null||v==null)&&($=b.sourceLayer,I=b.nodeIndex,v=b.tensorIndex);const T=$.inboundNodes[I];if(y.indexOf(T)!==-1)throw new gn(`The tensor ${b.name} at layer "${$.name}" is part of a cycle.`);if(w.indexOf(T)!==-1)return;this.containerNodes.add(Ln.nodeKey($,I)),$.id in i||(i[$.id]=Object.keys(i).length),y.indexOf(T)===-1&&y.push(T);const S=T.inboundLayers.length;for(let N=0;N<S;N++){const C=T.inputTensors[N],E=T.inboundLayers[N],R=T.nodeIndices[N],D=T.tensorIndices[N];l(C,w,y,E,R,D)}for(w.push(T);y.indexOf(T)>=0;)y.splice(y.indexOf(T),1);a.push(T)},c=[],u=[];for(const b of this.outputs)l(b,c,u);const h=a.slice().reverse();for(const b of h){s[b.id]=b,b.id in e||(e[b.id]=0);let w=e[b.id];const y=o[b.outboundLayer.id]==null?0:o[b.outboundLayer.id];w=Math.max(w,y),o[b.outboundLayer.id]=w,r[b.outboundLayer.id]=b.outboundLayer,e[b.id]=w;for(let $=0;$<b.inboundLayers.length;$++){const I=b.inboundLayers[$],v=b.nodeIndices[$],T=I.inboundNodes[v],S=e[T.id]==null?0:e[T.id];e[T.id]=Math.max(w+1,S),s[T.id]=T}}const d={};for(const b in e){const w=e[b];w in d||(d[w]=[]),d[w].push(s[b])}const p={};for(const b in o){const w=o[b];w in p||(p[w]=[]),p[w].push(r[b])}let f=Object.keys(p).map(b=>parseInt(b,10)).sort(Bl);this.layers=[];for(const b of f){const w=p[b];w.sort((y,$)=>{const I=i[y.id],v=i[$.id];return I<v?-1:I>v?1:0});for(const y of w)y instanceof Ln&&this.internalContainerRefs.push(y),this.layers.push(y)}this.layersByDepth=p,f=Object.keys(d).map(b=>parseInt(b,10)).sort(Bl);const m=this.inputs.slice(),g=[];for(const b of f)for(const w of d[b]){const y=w.outboundLayer;if(y!=null){for(const $ of w.inputTensors)if(m.indexOf($)===-1)throw new gn(`Graph disconnected: cannot obtain value for tensor ${$} at layer "${y.name}". The following previous layers were accessed without issue: ${g}`);for(const $ of w.outputTensors)m.push($);g.push(y.name)}}this.nodesByDepth=d;const x=this.layers.map(b=>b.name);for(const b of x){const w=x.filter(y=>y===b).length;if(w!==1)throw new gn(`The name "${b}" is used ${w} times in the model. All layer names should be unique. Layer names: `+JSON.stringify(x))}this.outboundNodes=[],this.inboundNodes=[],new ql({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:this.inputs,outputTensors:this.outputs,inputMasks:this.inputs.map(b=>null),outputMasks:this.outputs.map(b=>null),inputShapes:this.inputs.map(b=>b.shape),outputShapes:this.outputs.map(b=>b.shape)}),this.built=!0,this._refCount=1}assertNotDisposed(){if(this._refCount===0)throw new Error(`Container '${this.name}' is already disposed.`)}dispose(){this.assertNotDisposed();const t={refCountAfterDispose:null,numDisposedVariables:0};if(--this._refCount===0){for(const e of this.layers)t.numDisposedVariables+=e.dispose().numDisposedVariables;for(const e of this.internalContainerRefs)t.numDisposedVariables+=e.dispose().numDisposedVariables}return t.refCountAfterDispose=this._refCount,t}get trainable(){return this.trainable_}set trainable(t){this.layers.forEach(e=>{e._trainableWeights.forEach(s=>s.trainable=t)}),this.trainable_=t}get trainableWeights(){if(this._trainableWeights.length>0)throw new _("Container instance unexpectedly contains _trainableWeights.The trainable weights of a Container are a union of the trainable weights of its consituent Layers. Its own _trainableWeights must remain an empty Array.");if(!this.trainable)return[];let t=[];for(const e of this.layers)t=t.concat(e.trainableWeights);return t}get nonTrainableWeights(){const t=[];for(const e of this.layers)t.push(...e.nonTrainableWeights);if(!this.trainable){const e=[];for(const s of this.layers)e.push(...s.trainableWeights);return e.concat(t)}return t}get weights(){return this.trainableWeights.concat(this.nonTrainableWeights)}loadWeights(t,e=!0){const s={};let o=0;const r=fE(t);r&&this.parseWeights(t);for(const a of this.layers)for(const[l,c]of a.weights.entries()){const u=r?`${c.name.split("/").slice(0,-1).join("/")+"/"}${l}`:c.originalName;if(s[u]!=null)throw new _(`Duplicate weight name: ${u}`);s[u]=c,o++}const i=[];for(const a in t){let l=a;if(s[a]==null){const c=a.split("/");l=c.slice(0,-2).concat([c[c.length-1]]).join("/")}if(s[l]!=null)i.push([s[l],t[a]]);else if(e)throw new _(`Provided weight data has no target variable: ${a}`);delete s[l]}if(e){const a=[];for(const l in s)a.push(l);if(a.length>0)throw new _(`${a.length} of ${o} weights are not set: ${a}`)}Nd(i)}parseWeights(t){for(const e in Object.keys(t)){const s=e.split("/"),o=["vars","layer_checkpoint_dependencies"],r=s.map(i=>i.startsWith("_")?i.slice(1):i).filter(i=>!o.includes(i)).join("/");r!==e&&(t[r]=t[e],delete t[e])}}updatedConfig(){const t=this.getConfig(),e={};return e.className=this.getClassName(),e.config=t,e.kerasVersion=`tfjs-layers ${yx}`,e.backend="TensorFlow.js",e}toJSON(t,e=!0){const s=_d(this.updatedConfig());return e?JSON.stringify(s):s}call(t,e){return W(()=>{t=Vt(t);const s=new Ds;for(let o=0;o<this.inputs.length;++o)s.add(this.inputs[o],t[o]);return Oi(this.outputs,s,e)})}computeMask(t,e){return W(()=>{t=Vt(t);let s;return e==null?s=ho(null,t.length):s=Vt(e),this.runInternalGraph(t,s)[1]})}computeOutputShape(t){const e=Gl(t);if(e.length!==this.inputLayers.length)throw new _(`Invalid inputShape argument ${t}: model has ${this.inputLayers.length} tensor inputs.`);const s={};for(let a=0;a<e.length;a++){const l=this.inputLayers[a],c=e[a],u=l.name+"_0_0";s[u]=c}const o=Object.keys(this.nodesByDepth).map(a=>parseInt(a,10)).sort(Bl);if(o.length>1)for(const a of o){const l=this.nodesByDepth[a];for(const c of l){const u=c.outboundLayer;if(this.inputLayers.map(m=>m.id).indexOf(u.id)!==-1)continue;const h=[];for(let m=0;m<c.inboundLayers.length;m++){const g=c.inboundLayers[m],x=c.nodeIndices[m],b=c.tensorIndices[m],w=`${g.name}_${x}_${b}`,y=s[w];h.push(y)}const d=u.computeOutputShape(Ye(h)),p=Gl(d),f=u.inboundNodes.indexOf(c);for(let m=0;m<p.length;m++){const g=`${u.name}_${f}_${m}`;s[g]=p[m]}}}const r=[],i=[];for(let a=0;a<this.outputLayers.length;a++){const l=this.outputLayers[a],c=this.outputLayersNodeIndices[a],u=this.outputLayersTensorIndices[a],h=`${l.name}_${c}_${u}`;i.push(h)}for(let a=0;a<i.length;a++){const l=i[a];jn(l in s),r.push(s[l])}return Ye(r)}runInternalGraph(t,e){e==null&&(e=ho(null,t.length));const s={};for(let l=0;l<this.inputs.length;++l){const c=this.inputs[l],u=t[l],h=e[l];s[c.id]=[u,h]}const o=Object.keys(this.nodesByDepth).map(l=>parseInt(l,10)).sort(Bl);for(const l of o){const c=this.nodesByDepth[l];for(const u of c){const h=u.outboundLayer,d=u.inputTensors,p=u.outputTensors,f=new Array;for(const m of d)m.id in s&&f.push(s[m.id]);if(f.length===d.length){let m={},g,x,b,w;if(u.callArgs!=null&&(m=u.callArgs),f.length===1){const[y,$]=f[0];m.mask==null&&(m.mask=$),b=Vt(h.call(y,m)),w=Vt(h.computeMask(y,$)),g=[y],x=[$]}else g=f.map(y=>y[0]),x=f.map(y=>y[1]),m.mask==null&&(m.mask=x),b=Vt(h.call(g,m)),w=Vt(h.computeMask(g,x));if(h.activityRegularizer)throw new wt("LayersModel invocation with concrete Tensor value(s) in the presence of activity regularizer(s) is not supported yet.");for(let y=0;y<p.length;++y){const $=p[y],I=b[y],v=w[y];s[$.id]=[I,v]}}}}const r=[],i=[],a=[];for(const l of this.outputs){jn(l.id in s,`Could not compute output ${l.name} : ${l.id}`);const[c,u]=s[l.id];a.push(c.shape),r.push(c),i.push(u)}return[r,i,a]}buildNodeConversionMap(t){const e={};let s;for(const o of this.layers){s=o instanceof Ln?1:0;for(let r=0;r<o.inboundNodes.length;r++){const i=Ln.nodeKey(o,r);this.containerNodes.has(i)&&(e[i]=s,s+=1)}}return e}getLayer(t,e){if(e!=null)return this.findLayer(e);if(t==null)throw new _("Provide either a layer name or layer index");if(typeof t=="number")return this.findLayer(t);for(const s of this.layers)if(s.name===t)return s;throw new _(`No such layer: ${t}`)}findLayer(t){if(this.layers.length<=t)throw new _(`Was asked to retrieve layer at index ${t}, but model only has ${this.layers.length} layer(s).`);return this.layers[t]}calculateLosses(){return W(()=>{const t=[];for(const e of this.layers)for(let s=0;s<e.inboundNodes.length;++s){const o=Ln.nodeKey(e,s);this.containerNodes.has(o)&&t.push(...e.calculateLosses())}return t})}getConfig(){const t={name:this.name},e=this.buildNodeConversionMap(this.layers),s=[];for(const i of this.layers){const a=i.getClassName(),l=i.getConfig(),c=[];for(let h=0;h<i.inboundNodes.length;h++){const d=i.inboundNodes[h],p=Ln.nodeKey(i,h);let f={};if(this.containerNodes.has(p)){if(d.callArgs)try{JSON.stringify(d.callArgs),f=d.callArgs}catch(m){console.warn(`Layer ${i.name} was passed non-serializable keyword arguments: ${d.callArgs}. They will not be included in the serialized model (and thus will be missing at deserialization time).`),f={}}if(d.inboundLayers.length>0){const m=[];for(let g=0;g<d.inboundLayers.length;g++){const x=d.inboundLayers[g],b=d.nodeIndices[g],w=d.tensorIndices[g],y=Ln.nodeKey(x,b);let $=e[y];$==null&&($=0),m.push([x.name,$,w,f])}c.push(m)}}}const u={};u.name=i.name,u.className=a,u.config=l,u.inboundNodes=c,s.push(u)}t.layers=s;const o=[];for(let i=0;i<this.inputLayers.length;i++){const a=this.inputLayers[i],l=this.inputLayersNodeIndices[i],c=Ln.nodeKey(a,l);if(!this.containerNodes.has(c))continue;let u=e[c];u==null&&(u=0);const h=this.inputLayersTensorIndices[i];o.push([a.name,u,h])}t.inputLayers=o;const r=[];for(let i=0;i<this.outputLayers.length;i++){const a=this.outputLayers[i],l=this.outputLayersNodeIndices[i],c=Ln.nodeKey(a,l);if(!this.containerNodes.has(c))continue;let u=e[c];u==null&&(u=0);const h=this.outputLayersTensorIndices[i];r.push([a.name,u,h])}return t.outputLayers=r,t}static fromConfig(t,e,s={},o=!1){const r={},i={};function a(g,x){g.name in i?i[g.name].push(x):i[g.name]=[x]}function l(g,x){const b=[];let w;for(const y of x){const $=y[0],I=y[1],v=y[2];if(w=y[3]==null?{}:y[3],!($ in r)){a(g,x);return}const T=r[$];if(T.inboundNodes.length<=I){a(g,x);return}const S=T.inboundNodes[I];b.push(S.outputTensors[v])}b.length>0&&g.apply(Ye(b),w)}function c(g){const x=g.name,b=ms(g,e.customObjects!=null?e.customObjects:{});b.setFastWeightInitDuringBuild(o),r[x]=b,g.inboundNodes.forEach(y=>{if(!(y instanceof Array))throw new _(`Corrupted configuration, expected array for nodeData: ${y}`);a(b,y)})}const u=e.name,h=e.layers;for(const g of h)c(g);for(;!JN(i);)for(const g of h){const x=r[g.name];if(x.name in i){const b=i[x.name];delete i[x.name];for(const w of b)l(x,w)}}const d=[],p=[],f=e.inputLayers;for(const g of f){const x=g[0],b=g[1],w=g[2];jn(x in r);const $=r[x].inboundNodes[b].outputTensors;d.push($[w])}const m=e.outputLayers;for(const g of m){const x=g[0],b=g[1],w=g[2];jn(x in r);const $=r[x].inboundNodes[b].outputTensors;p.push($[w])}return new t({inputs:d,outputs:p,name:u})}get stateful(){if(this._stateful)throw new _("Container instance unexpectedly has _stateful = true. The statefulness of a Container is determined by the Layers it contains. Its _stateful property must remain the default false.");for(const t of this.layers)if(t.stateful)return!0;return!1}resetStates(){W(()=>{this.layers.forEach(t=>{t.stateful&&t.resetStates()})})}}function mE(n,t,e){const s=t.length;if(n==null||Array.isArray(n)&&n.length===0)return t.map(o=>null);if(s===1)return Array.isArray(n)&&n.length===1?n:typeof n=="object"&&t[0]in n?[n[t[0]]]:[n];if(Array.isArray(n)){if(n.length!==s)throw new Error(`Provided ${e} is an array of ${n.length} element(s), but the model has ${s} outputs. Make sure a set of weights is provided for each model output.`);return n}else if(typeof n=="object"&&Object.keys(n).length>0&&typeof n[Object.keys(n)[0]]=="object"){const o=[];return t.forEach(r=>{r in n?o.push(n[r]):o.push(null)}),o}else throw new Error(`The model has multiple (${s}) outputs, so ${e} must be either an array with ${s} elements or an object with ${t} keys. Provided ${e} not understood: ${JSON.stringify(n)}`)}function wx(n,t){return mE(n,t,"classWeight")}function Cx(n,t,e,s){return Q(this,null,function*(){if(e!=null){const o=W(()=>{if(n.shape.length===1)return to(n);if(n.shape.length===2){if(n.shape[1]>1)return fi(n,1);if(n.shape[1]===1)return z(n,[n.shape[0]]);throw new Error(`Encountered unexpected last-dimension size (${n.shape[1]}) during handling of class weights. The size is expected to be >= 1.`)}else throw new Error(`Unexpected rank of target (y) tensor (${n.rank}) during handling of class weights. The rank is expected to be 1 or 2.`)}),r=Array.from(yield o.data());kt(o);const i=[];return r.forEach(a=>{if(e[a]==null)throw new Error(`classWeight must contain all classes in the training data. The class ${a} exists in the data but not in classWeight`);i.push(e[a])}),tn(i,"float32")}else return null})}function gE(n,t){return L(n,t)}const xE=32;function $x(n,t){let e,s;const o=t;e=o.xs,s=o.ys,k(e!=null&&s!=null,()=>`A Dataset iterator for fitDataset() is expected to generate objects of the form \`{xs: xVal, ys: yVal}\`, where the two values may be \`tf.Tensor\`, an array of Tensors, or a map of string to Tensor.  The provided Dataset instead generates ${t}`);const r=Ix("input",n.inputNames,e),i=Ix("output",n.outputNames,s),a=r[0].shape[0];k(r.length===n.inputs.length,()=>`LayersModel has ${n.inputs.length} inputs, but the dataset provides ${r.length} inputs.  (Expected input keys: ${JSON.stringify(n.inputNames)})`),k(i.length===n.outputs.length,()=>`LayersModel has ${n.outputs.length} outputs, but the dataset provides ${i.length} outputs.  (Expected output keys: ${JSON.stringify(n.outputNames)})`);for(let l=0;l<r.length;l++)k(r[l].shape[0]===a,()=>`Batch size mismatch: input ${n.inputNames[l]} has ${r[l].shape[0]}; expected  ${a} based on input ${n.inputNames[0]}.`);for(let l=0;l<i.length;l++)k(i[l].shape[0]===a,()=>`Batch size mismatch: output ${n.outputNames[l]} has ${i[l].shape[0]}; expected  ${a} based on input ${n.inputNames[0]}.`);return{xs:r,ys:i}}function Ix(n,t,e){if(e instanceof ue)return[e];if(Array.isArray(e))return k(e.length===t.length,()=>`Received an array of ${e.length} Tensors, but expected ${t.length} to match the ${n} keys ${t}.`),e;{const s=[];for(const o of t){if(e[o]==null)throw new _(`The feature data generated by the dataset lacks the required ${n} key '${o}'.`);s.push(e[o])}return s}}function bE(n){if(n.length===3)throw new wt("Validation with sample weights is not implemented yet.");return{xs:n[0],ys:n[1]}}function yE(n,t,e){return Q(this,null,function*(){const s=e.batchesPerEpoch!=null;if(k(n.optimizer!=null,()=>"You must compile a model before training/testing. Use LayersModel.compile(modelCompileConfig)."),k(e!=null,()=>"For fitDataset(), the 2nd argument (config) is required, but it is not provided in this call."),k(e.epochs!=null&&e.epochs>0&&Number.isInteger(e.epochs),()=>`For fitDataset(), config.epochs is expected to be a positive integer, but got ${e.epochs}`),k(!s||e.batchesPerEpoch>0&&Number.isInteger(e.batchesPerEpoch),()=>`For fitDataset(), config.batchesPerEpoch is expected to be a positive integer if specified, but got ${e.batchesPerEpoch}`),k(e.validationSplit==null,()=>"`validationSplit` is not supported by `fitDataset()`. Use validationData instead."),n.isTraining)throw new Error("Cannot start training because another fit() call is ongoing.");n.isTraining=!0;try{const o=e.validationData!=null;let r,i;if(o)if(vx(e.validationData))k(e.validationBatches==null||e.validationBatches>0&&Number.isInteger(e.validationBatches),()=>`For fitDataset() with dataset-based validation, config.validationBatches is expected not to be provided, or to be a positive integer, but got ${e.validationBatches}`);else{const g=bE(e.validationData);r=g.xs,i=g.ys}const a=n.makeTrainFunction(),l=n.getDedupedMetricsNames();let c;o?c=l.slice().concat(l.map(g=>"val_"+g)):c=l.slice();const u=cx(e.callbacks,e.yieldEvery),h=e.verbose==null?1:e.verbose,{callbackList:d,history:p}=ux(u,h,e.epochs,null,null,wE(t,e),null,o,c);d.setModel(n),n.history=p,yield d.onTrainBegin(),n.stopTraining_=!1;let f=e.initialEpoch==null?0:e.initialEpoch,m=yield t.iterator();for(;f<e.epochs;){const g={};yield d.onEpochBegin(f);let x=0,b=0;for(s||(m=yield t.iterator());!s||x<e.batchesPerEpoch;){const w=yield m.next();if(s&&w.done){console.warn(`You provided \`batchesPerEpoch\` as ${e.batchesPerEpoch}, but your dataset iterator ran out of data after ${x} batches; interrupting training. Make sure that your dataset can generate at least \`batchesPerEpoch * epochs\` batches (in this case, ${e.batchesPerEpoch*e.epochs} batches). You may need to use the repeat() function when building your dataset.`);break}if(w.value!=null){const{xs:y,ys:$}=$x(n,w.value),I={};I.batch=b,I.size=y[0].shape[0],yield d.onBatchBegin(b,I);const v=[];if(e.classWeight!=null){const N=wx(e.classWeight,n.outputNames);for(let C=0;C<N.length;++C)v.push(yield Cx($[C],null,N[C]))}const T=y.concat($).concat(v),S=a(T);kt(T);for(let N=0;N<l.length;++N){const C=l[N],E=S[N];I[C]=E,Wn(E)}yield d.onBatchEnd(b,I),ax(I),b++,x++}if(s?x>=e.batchesPerEpoch:w.done){if(o){let y;vx(e.validationData)?y=Vt(yield n.evaluateDataset(e.validationData,{batches:e.validationBatches})):y=Vt(n.evaluate(r,i,{batchSize:e.validationBatchSize==null?xE:e.validationBatchSize,verbose:0}));for(let $=0;$<n.metricsNames.length;++$)g[`val_${n.metricsNames[$]}`]=y[$]}break}if(n.stopTraining_)break}if(yield d.onEpochEnd(f,g),f++,n.stopTraining_)break}return yield d.onTrainEnd(),yield n.history.syncData(),n.history}finally{n.isTraining=!1}})}function wE(n,t){let e=null;return t.batchesPerEpoch!=null?e=t.batchesPerEpoch:Number.isFinite(n.size)&&(e=n.size),e}function vx(n){return typeof n.iterator=="function"}function CE(n){return typeof n.next=="function"}function $E(n,t,e){return Q(this,null,function*(){e=e||{};const s=e.batches!=null,o=n.testFunction;let r=[];if(e.verbose>0)throw new wt("Verbose mode is not implemented yet.");k(!s||e.batches>0&&Number.isInteger(e.batches),()=>`Test loop expects \`batches\` to be a positive integer, but received ${JSON.stringify(e.batches)}`);const i=CE(t)?t:yield t.iterator();let a=0,l=0;for(;!s||l<e.batches;){const c=yield i.next();if(r=W(()=>{if(c.value){const{xs:u,ys:h}=$x(n,c.value),d=u.concat(h),p=W(()=>o(d));if(kt(d),l===0)for(let m=0;m<p.length;++m)r.push(Pt(0));const f=d[0].shape[0];for(let m=0;m<p.length;++m){const g=p[m],x=r[m];r[m]=W(()=>J(r[m],L(f,g))),l>0&&kt(x)}kt(p),a+=f,++l}return r}),c.done){s&&console.warn(`Your dataset iterator ran out of data during evaluateDataset(). Interrupting evalution. Make sure that your dataset can generate at least \`batches\` batches (in this case, ${e.batches} batches). You may need to use the repeat() function when building your dataset.`);break}}for(let c=0;c<r.length;++c){const u=r[c];r[c]=ft(r[c],a),kt(u)}return Ye(r)})}function Od(n){k(n>0&&Number.isInteger(n),()=>`batchSize is required to be a positive integer, but got ${n}`)}function Bi(n,t,e){return n==null?[null]:Array.isArray(n)?n.map(s=>go(s,t,e-t)):go(n,t,e-t)}function Ld(n,t){return W(()=>n==null?null:Array.isArray(n)?n.map(e=>Ld(e,t)):Vg(n,t.dtype==="int32"?t:rt(t,"int32")))}function Md(n,t){const e=[];let s=0,o=null;for(;s<n;)o=s+t,o>=n&&(o=n),e.push([s,o]),s=o;return e}function kx(n){const t=[];n instanceof ue&&(n=[n]);for(let e=0;e<n.length;++e){const s=n[e];if(s.rank===1)t.push(Ai(s,1));else{if(s.rank===0)throw new Error("Expected tensor to be at least 1D, but received a 0D tensor (scalar).");t.push(s)}}return t}function Mn(n,t){if(n==null)return;const e=[];if(t instanceof ue)e.push(t.id);else if(Array.isArray(t))t.forEach(o=>e.push(o.id));else if(t!=null)for(const o in t){const r=t[o];e.push(r.id)}const s=[];if(n instanceof ue)e.indexOf(n.id)===-1&&s.push(n);else if(Array.isArray(n))n.forEach(o=>{e.indexOf(o.id)===-1&&s.push(o)});else if(n!=null)for(const o in n){const r=n[o];e.indexOf(r.id)===-1&&s.push(r)}s.forEach(o=>{o.isDisposed||o.dispose()})}function IE(n){return n instanceof ue}function Pd(n){return Array.isArray(n)}function Sx(n){return!IE(n)&&!Pd(n)}function Nx(n,t,e,s=!0,o=""){if(t==null||t.length===0){if(n!=null){let i=!1;if(Pd(n)&&n.length>0)i=!0;else if(Sx(n)){for(const a in n)if(n.hasOwnProperty(a)){i=!0;break}}else i=!0;if(i)throw new _(`Error when checking model ${o} expected no data, but got ${n}`)}return[]}if(n==null)return t.map(i=>null);let r;if(Sx(n)){n=n,r=[];for(const i of t){if(n[i]==null)throw new _(`No data provided for "${i}". Need data for each key in: ${t}`);r.push(n[i])}}else if(Pd(n)){if(n=n,n.length!==t.length)throw new _(`Error when checking model ${o}: the Array of Tensors that you are passing to your model is not the size the model expected. Expected to see ${t.length} Tensor(s), but instead got the following list of Tensor(s): ${n}`);r=n}else{if(n=n,t.length>1)throw new _(`The model ${o} expects ${t.length} Tensor(s), but only received one Tensor. Found: Tensor with shape ${n.shape}`);r=[n]}if(r=kx(r),e!=null)for(let i=0;i<t.length;++i){if(e[i]==null)continue;const a=r[i];if(a.shape.length!==e[i].length)throw new _(`Error when checking ${o}: expected ${t[i]} to have ${e[i].length} dimension(s). but got array with shape ${a.shape}`);for(let l=0;l<e[i].length;++l){if(l===0&&!s)continue;const c=a.shape[l],u=e[i][l];if(u!=null&&u>=0&&c!==u)throw new _(`${o} expected a batch of elements where each example has shape [${e[i].slice(1,e[i].length)}] (i.e.,tensor shape [*,${e[i].slice(1,e[i].length)}]) but the ${o} received an input with ${a.shape[0]} examples, each with shape [${a.shape.slice(1,a.shape.length)}] (tensor shape [${a.shape}])`)}}return r}function vE(n,t,e){const s=Es(n.map(r=>r.shape[0]));s.sort();const o=Es(t.map(r=>r.shape[0]));if(o.sort(),s.length>1)throw new _(`All input Tensors (x) should have the same number of samples. Got array shapes: ${JSON.stringify(n.map(r=>r.shape))}`);if(o.length>1)throw new _(`All target Tensors (y) should have the same number of samples. Got array shapes: ${JSON.stringify(t.map(r=>r.shape))}`);if(s.length>0&&o.length>0&&!Lt(s,o))throw new _(`Input Tensors should have the same number of samples as target Tensors. Found ${s[0]} input sample(s) and ${o[0]} target sample(s).`)}function kE(n,t,e){const s=[Yl,Ql,Pi];for(let o=0;o<n.length;++o){const r=n[o],i=t[o],a=e[o];if(i!=null){if(i===Pi&&r.shape[r.shape.length-1]===1)throw new _(`You are passing a target array of shape ${r.shape} while using a loss 'categorical_crossentropy'. 'categorical_crossentropy'expects targets to be binary matrices (1s and 0s) of shape [samples, classes].`);if(s.indexOf(i)!==-1){const l=r.shape.slice(1),c=a.slice(1);for(let u=0;u<l.length;++u){const h=l[u],d=c[u];if(d!=null&&h!==d)throw new _(`A target Tensor with shape ${r.shape} was passed for an output of shape ${a}, while using a loss function that expects targets to have the same shape as the output.`)}}}}}function Tx(n,t,e,s=!0,o=""){let r;if(Array.isArray(n)){if(n.length!==t.length)throw new _(`Error when checking model ${o}: the Array of Tensors that you are passing to your model is not the size the the model expected. Expected to see ${t.length} Tensor(s), but instead got ${n.length} Tensors(s).`);r=n}else{if(t.length>1)throw new _(`The model expects ${t.length} ${o} Tensors, but only received one Tensor. Found: array with shape ${JSON.stringify(n.shape)}.`);r=[n]}if(e!=null)for(let i=0;i<t.length;++i){if(e[i]==null)continue;const a=r[i];if(a.shape.length!==e[i].length)throw new _(`Error when checking ${o}: expected ${t[i]} to have ${e[i].length} dimension(s), but got array with shape ${JSON.stringify(a.shape)}`);for(let l=0;l<e[i].length;++l){if(l===0&&!s)continue;const c=a.shape[l],u=e[i][l];if(u!=null&&u!==c)throw new _(`Error when checking ${o}: expected ${t[i]} to have shape ${JSON.stringify(e[i])} but got array with shape ${JSON.stringify(a.shape)}.`)}}}function SE(n,t){if(n==null||Array.isArray(n)&&n.length===0)return t.map(s=>[]);let e;if(typeof n=="string"||typeof n=="function")e=[n];else if(Array.isArray(n)||typeof n=="object")e=n;else throw new TypeError(`Type of metrics argument not understood. Expected an string,function, Array, or Object, found: ${n}`);if(Array.isArray(e))return t.map(s=>e);{const s=[];for(const o of t){let r=e.hasOwnProperty(o)?e[o]:[];Array.isArray(r)||(r=[r]),s.push(r)}return s}}const NE="layers-model";class Zo extends Ln{constructor(t){super(t),this.isTraining=!1}summary(t,e,s=console.log){if(!this.built)throw new _("This model has never been called, thus its weights have not been created yet. So no summary can be displayed. Build the model first (e.g., by calling it on some test data).");cE(this,t,e,s)}compile(t){if(t.loss==null&&(t.loss=[]),this.loss=t.loss,typeof t.optimizer=="string")this.optimizer_=lE(t.optimizer),this.isOptimizerOwned=!0;else{if(!(t.optimizer instanceof Ts))throw new _("User-defined optimizer must be an instance of tf.Optimizer.");this.optimizer_=t.optimizer,this.isOptimizerOwned=!1}let e=[];if(!Array.isArray(t.loss)&&typeof t.loss!="string"&&typeof t.loss!="function"){t.loss=t.loss;for(const i in t.loss)if(this.outputNames.indexOf(i)===-1)throw new _(`Unknown entry in loss dictionary: "${i}". Only expected the following keys: ${this.outputNames}`);for(const i of this.outputNames)t.loss[i]==null&&console.warn(`Output "${i}" is missing from loss dictionary. We assume this was done on purpose, and we will not be expecting data to be passed to ${i} during training`),e.push(Ad(t.loss[i]))}else if(Array.isArray(t.loss)){if(t.loss.length!==this.outputs.length)throw new _(`When passing an Array as loss, it should have one entry per model output. The model has ${this.outputs.length} output(s), but you passed loss=${t.loss}.`);e=t.loss.map(a=>Ad(a))}else{const i=Ad(t.loss);this.outputs.forEach(a=>{e.push(i)})}this.lossFunctions=e,this.feedOutputNames=[],this.feedOutputShapes=[],this.feedLossFns=[];for(let i=0;i<this.outputs.length;++i){const a=this.internalOutputShapes[i],l=this.outputNames[i];this.feedOutputNames.push(l),this.feedOutputShapes.push(a),this.feedLossFns.push(this.lossFunctions[i])}const s=[];this.metrics=t.metrics,this.metricsNames=["loss"],this.metricsTensors=[],mo("loss",()=>{for(let i=0;i<this.outputs.length;++i){if(s.indexOf(i)!==-1)continue;const a=this.lossFunctions[i];this.outputs.length>1&&(this.metricsTensors.push([a,i]),this.metricsNames.push(this.outputNames[i]+"_loss"))}});const o=SE(t.metrics,this.outputNames),r=(i,a,l)=>{this.outputNames.length>1&&(a=this.outputNames[i]+"_"+a),this.metricsNames.push(a),this.metricsTensors.push([l,i])};mo("metric",()=>{for(let i=0;i<this.outputs.length;++i){if(s.indexOf(i)!==-1)continue;const a=o[i];(c=>{let h,d,p;for(const f of c){if(typeof f=="string"&&["accuracy","acc","crossentropy","ce"].indexOf(f)!==-1){const g=this.internalOutputShapes[i];g[g.length-1]===1||this.lossFunctions[i]===Ql?["accuracy","acc"].indexOf(f)!==-1?d=dx:["crossentropy","ce"].indexOf(f)!==-1&&(d=QT):this.lossFunctions[i]===Zl?["accuracy","acc"].indexOf(f)!==-1?d=JT:["crossentropy","ce"].indexOf(f)!==-1&&(d=mx):["accuracy","acc"].indexOf(f)!==-1?d=px:["crossentropy","ce"].indexOf(f)!==-1&&(d=fx);let x;["accuracy","acc"].indexOf(f)!==-1?x="acc":["crossentropy","ce"].indexOf(f)!==-1&&(x="ce"),p=d,h=""+x}else p=aE(f),h=""+ec(f);let m;mo(h,()=>{m=p}),r(i,h,m)}})(a)}}),this.collectedTrainableWeights=this.trainableWeights}checkTrainableWeightsConsistency(){this.collectedTrainableWeights!=null&&this.trainableWeights.length!==this.collectedTrainableWeights.length&&console.warn("Discrepancy between trainableweights and collected trainable weights. Did you set `model.trainable` without calling `model.compile()` afterwards?")}evaluate(t,e,s={}){const o=s.batchSize==null?32:s.batchSize;Od(o);const i=this.standardizeUserDataXY(t,e,!0,o);try{const a=i[0].concat(i[1]);this.makeTestFunction();const l=this.testFunction,c=this.testLoop(l,a,o,s.verbose,s.steps);return Ye(c)}finally{Mn(i[0],t),Mn(i[1],e)}}evaluateDataset(t,e){return Q(this,null,function*(){return this.makeTestFunction(),$E(this,t,e)})}checkNumSamples(t,e,s,o="steps"){let r;if(s!=null){if(r=null,e!=null)throw new _(`If ${o} is set, batchSize must be null or undefined.Got batchSize = ${e}`)}else if(t!=null)Array.isArray(t)?r=t[0].shape[0]:r=t.shape[0];else throw new _(`Either the input data should have a defined shape, or ${o} shoud be specified.`);return r}execute(t,e){if(Array.isArray(e)&&e.length===0)throw new _("`outputs` is an empty Array, which is not allowed.");const s=Array.isArray(e),o=s?e:[e],r=this.retrieveSymbolicTensors(o),i=new Ds;if(t instanceof ue&&(t=[t]),Array.isArray(t)){if(t.length!==this.inputs.length)throw new _(`The number of inputs provided (${t.length}) does not match the number of inputs of this model (${this.inputs.length}).`);for(let l=0;l<this.inputs.length;++l)i.add(this.inputs[l],t[l])}else for(const l of this.inputs){const c=t[l.name];if(c==null)throw new _(`No value is provided for the model's input ${l.name}`);i.add(l,c)}const a=Oi(r,i);return s?a:a[0]}retrieveSymbolicTensors(t){const e=ho(null,t.length);let s=t.length;for(const o of this.layers){const r=Array.isArray(o.output)?o.output:[o.output],i=r.map(a=>a.name);for(let a=0;a<t.length;++a){const l=i.indexOf(t[a]);if(l!==-1&&(e[a]=r[l],s--),s===0)break}if(s===0)break}if(s>0){const o=[];throw e.forEach((r,i)=>{r==null&&o.push(t[i])}),new _(`Cannot find SymbolicTensors for output name(s): ${JSON.stringify(o)}`)}return e}predictLoop(t,e=32,s=!1){return W(()=>{const o=this.checkNumSamples(t);if(s)throw new wt("Verbose predictLoop() is not implemented yet.");const r=Md(o,e),i=this.outputs.map(a=>[]);for(let a=0;a<r.length;++a)W(()=>{const c=r[a][0],u=r[a][1],h=Bi(t,c,u),d=[];if(Array.isArray(h))for(let f=0;f<h.length;++f)d.push({key:this.inputs[f],value:h[f]});else d.push({key:this.inputs[0],value:h});const p=new Ds(d);return Oi(this.outputs,p)}).forEach((c,u)=>i[u].push(c));return Ye(i.map(a=>Ke(a,0)))})}predict(t,e={}){const s=kx(t);Tx(s,this.inputNames,this.feedInputShapes,!1);try{const o=e.batchSize==null?32:e.batchSize;return Od(o),this.predictLoop(s,o)}finally{Mn(s,t)}}predictOnBatch(t){Tx(t,this.inputNames,this.feedInputShapes,!0);const e=(Array.isArray(t)?t[0]:t).shape[0];return this.predictLoop(t,e)}standardizeUserDataXY(t,e,s=!0,o){if(this.optimizer_==null)throw new gn("You must compile a model before training/testing. Use LayersModel.compile(modelCompileArgs).");const r=[];for(let i=0;i<this.feedOutputShapes.length;++i){const a=this.feedOutputShapes[i];this.feedLossFns[i]===Zl?r.push(a.slice(0,a.length-1).concat([1])):r.push(a)}if(t=Nx(t,this.feedInputNames,this.feedInputShapes,!1,"input"),e=Nx(e,this.feedOutputNames,r,!1,"target"),vE(t,e),kE(e,this.feedLossFns,this.feedOutputShapes),this.stateful&&o!=null&&o>0&&t[0].shape[0]%o!==0)throw new _(`In a stateful network, you should only pass inputs with a number of samples that is divisible by the batch size ${o}. Found: ${t[0].shape[0]} sample(s).`);return[t,e]}standardizeUserData(t,e,s,o,r=!0,i){return Q(this,null,function*(){const[a,l]=this.standardizeUserDataXY(t,e,r,i);if(s!=null)throw new Error("sample weight is not supported yet.");let c=null;if(o!=null){const u=wx(o,this.outputNames);c=[];for(let h=0;h<u.length;++h)c.push(yield Cx(l[h],null,u[h]))}return[a,l,c]})}testLoop(t,e,s,o=0,r){return W(()=>{const i=this.checkNumSamples(e,s,r,"steps"),a=[];if(o>0)throw new wt("Verbose mode is not implemented yet.");if(r!=null)throw new wt("steps mode in testLoop() is not implemented yet");{const l=Md(i,s),c=tn(Fn(0,i));for(let u=0;u<l.length;++u){const h=l[u][0],d=l[u][1],p=go(c,h,d-h),f=Ld(e,p),m=t(f);if(u===0)for(let g=0;g<m.length;++g)a.push(Pt(0));for(let g=0;g<m.length;++g){const x=m[g];a[g]=J(a[g],L(d-h,x))}}for(let u=0;u<a.length;++u)a[u]=ft(a[u],i)}return a})}getDedupedMetricsNames(){const t=this.metricsNames,e=[];for(let s=0;s<t.length;++s){const o=t[s];let r=o;if(Ag(t,o)>1){const i=Ag(t.slice(0,s),o);r+=`_${i}`}e.push(r)}return e}makeTrainFunction(){return t=>{const e=[],s=t.slice(0,this.inputs.length),o=t.slice(this.inputs.length,this.inputs.length+this.outputs.length),r=t.slice(this.inputs.length+this.outputs.length,this.inputs.length+this.outputs.length*2),i=[],a=()=>{const h=[];for(let m=0;m<this.inputs.length;++m)h.push({key:this.inputs[m],value:s[m]});const d=new Ds(h),p=Oi(this.outputs,d,{training:!0});let f;for(let m=0;m<this.lossFunctions.length;++m){const g=this.lossFunctions[m];let x=g(o[m],p[m]);r[m]!=null&&(x=gE(x,r[m]));const b=ce(x);e.push(b),m===0?f=x:f=J(f,x)}for(let m=0;m<this.metricsTensors.length;++m){let g;if(this.outputs.length>1&&m<this.outputs.length)g=e[m];else{const x=this.metricsTensors[m][0],b=this.metricsTensors[m][1];g=ce(x(o[b],p[b]))}Wn(g),i.push(g)}return f=ce(f),this.calculateLosses().forEach(m=>{f=J(f,m)}),f},l=this.collectedTrainableWeights.map(h=>h.read());return[this.optimizer_.minimize(a,!0,l)].concat(i)}}makeTestFunction(){this.testFunction=t=>W(()=>{const e=[];let s;const o=t.slice(0,this.inputs.length),r=t.slice(this.inputs.length,this.inputs.length+this.outputs.length),i=[];for(let c=0;c<this.inputs.length;++c)i.push({key:this.inputs[c],value:o[c]});const a=new Ds(i),l=Oi(this.outputs,a);for(let c=0;c<this.lossFunctions.length;++c){const u=this.lossFunctions[c],h=ce(u(r[c],l[c]));c===0?s=h:s=J(s,h),e.push(s)}for(let c=0;c<this.metricsTensors.length;++c){const u=this.metricsTensors[c][0],h=this.metricsTensors[c][1],d=ce(u(r[h],l[h]));e.push(d)}return e})}fit(o,r){return Q(this,arguments,function*(t,e,s={}){if(this.isTraining)throw new Error("Cannot start training because another fit() call is ongoing.");this.isTraining=!0;let i,a,l,c,u,h,d,p,f;try{const m=s.batchSize==null?32:s.batchSize;Od(m);const x=yield this.standardizeUserData(t,e,s.sampleWeight,s.classWeight,!1,m);i=x[0],a=x[1],f=x[2];let b=!1,w;if(s.validationData!=null&&s.validationData.length>0){if(b=!0,s.validationData.length===2)u=s.validationData[0],h=s.validationData[1];else throw s.validationData.length===3?new wt("validationData including sample weights is not supported yet."):new _(`When passing validation data, it must contain 2 (valX, valY) or 3 (valX, valY, valSampleWeight) items; ${s.validationData} is invalid.`);const E=yield this.standardizeUserData(u,h,null,null,!0,m);d=E[0],p=E[1],w=d.concat(p)}else if(s.validationSplit!=null&&s.validationSplit>0&&s.validationSplit<1){b=!0;const C=Math.floor(i[0].shape[0]*(1-s.validationSplit)),E=i[0].shape[0];d=Bi(i,C,E),l=i,i=Bi(i,0,C),p=Bi(a,C,E),c=a,a=Bi(a,0,C),w=d.concat(p)}else s.validationSteps!=null&&(b=!0);const y=i.concat(a).concat(f);this.checkTrainableWeightsConsistency();const $=this.makeTrainFunction(),I=this.getDedupedMetricsNames();let v,T;b?(this.makeTestFunction(),v=this.testFunction,T=I.slice().concat(I.map(C=>"val_"+C))):(v=null,w=[],T=I.slice());const S=cx(s.callbacks,s.yieldEvery);return yield this.fitLoop($,y,I,m,s.epochs,s.verbose,S,v,w,s.shuffle,T,s.initialEpoch,null,null)}finally{this.isTraining=!1,Mn(i,t),Mn(a,e),Mn(l,t),Mn(c,e),Mn(d,u),Mn(p,h),f!=null&&kt(f)}})}fitLoop(t,e,s,o,r,i,a,l,c,u,h,d,p,f){return Q(this,null,function*(){o==null&&(o=32),r==null&&(r=1),u==null&&(u=!0),d==null&&(d=0);let m=!1;if(l!=null&&c!=null&&(m=!0),f!=null&&(m=!0,p==null))throw new _("Can only use `validationSteps` when doing step-wise training, i.e., `stepsPerEpoch` must be set.");const g=this.checkNumSamples(e,o,p,"steps_per_epoch");let x;g!=null&&(x=Fn(0,g)),i==null&&(i=1);const{callbackList:b,history:w}=ux(a,i,r,d,g,p,o,m,h);b.setModel(this),this.history=w,yield b.onTrainBegin(),this.stopTraining_=!1;for(let y=d;y<r;++y){yield b.onEpochBegin(y);const $={};if(p!=null)throw new wt("stepsPerEpoch mode is not implemented yet.");{if(u==="batch")throw new wt("batch shuffling is not implemneted yet");u&&Uc(x);const I=tn(x),v=Md(g,o);for(let T=0;T<v.length;++T){const S={};if(yield b.onBatchBegin(T,S),W(()=>{const N=v[T][0],C=v[T][1],E=go(I,N,C-N);S.batch=T,S.size=C-N;const R=Ld(e,E),D=t(R);for(let F=0;F<s.length;++F){const O=s[F],P=D[F];S[O]=P,Wn(P)}if(T===v.length-1&&m){const F=this.testLoop(l,c,o);for(let O=0;O<s.length;++O){const P=s[O],B=F[O];Wn(B),$["val_"+P]=B}}}),yield b.onBatchEnd(T,S),ax(S),this.stopTraining_)break}I.dispose()}if(yield b.onEpochEnd(y,$),this.stopTraining_)break}return yield b.onTrainEnd(),yield this.history.syncData(),this.history})}fitDataset(t,e){return Q(this,null,function*(){return yE(this,t,e)})}trainOnBatch(t,e){return Q(this,null,function*(){const s=yield this.standardizeUserData(t,e),o=s[0],r=s[1],a=this.makeTrainFunction()(o.concat(r)),l=[];for(const c of a){const u=yield c.data();l.push(u[0])}return kt(a),Mn(s[0],t),Mn(s[1],e),Ye(l)})}getNamedWeights(t){const e=[],s=t!=null&&t.trainableOnly,o=s?this.trainableWeights:this.weights,r=this.getWeights(s);for(let i=0;i<o.length;++i)s&&!o[i].trainable||e.push({name:o[i].originalName,tensor:r[i]});return e}set stopTraining(t){this.stopTraining_=t}get stopTraining(){return this.stopTraining_}get optimizer(){return this.optimizer_}set optimizer(t){this.optimizer_!==t&&(this.optimizer_=t,this.isOptimizerOwned=!1)}dispose(){const t=super.dispose();if(t.refCountAfterDispose===0&&this.optimizer!=null&&this.isOptimizerOwned){const e=Rf().numTensors;this.optimizer_.dispose(),t.numDisposedVariables+=e-Rf().numTensors}return t}getLossIdentifiers(){let t;if(typeof this.loss=="string")t=fs(this.loss);else if(Array.isArray(this.loss)){for(const e of this.loss)if(typeof e!="string")throw new Error("Serialization of non-string loss is not supported.");t=this.loss.map(e=>fs(e))}else{const e=Object.keys(this.loss);t={};const s=this.loss;for(const o of e)if(typeof s[o]=="string")t[o]=fs(s[o]);else throw new Error("Serialization of non-string loss is not supported.")}return t}getMetricIdentifiers(){if(typeof this.metrics=="string"||typeof this.metrics=="function")return[fs(ec(this.metrics))];if(Array.isArray(this.metrics))return this.metrics.map(t=>fs(ec(t)));{const t={};for(const e in this.metrics)t[e]=fs(ec(this.metrics[e]));return t}}getTrainingConfig(){return{loss:this.getLossIdentifiers(),metrics:this.getMetricIdentifiers(),optimizer_config:{class_name:this.optimizer.getClassName(),config:this.optimizer.getConfig()}}}loadTrainingConfig(t){if(t.weighted_metrics!=null)throw new Error("Loading weight_metrics is not supported yet.");if(t.loss_weights!=null)throw new Error("Loading loss_weights is not supported yet.");if(t.sample_weight_mode!=null)throw new Error("Loading sample_weight_mode is not supported yet.");const e=Fd(t.optimizer_config),s=ms(e);let o;if(typeof t.loss=="string")o=po(t.loss);else if(Array.isArray(t.loss))o=t.loss.map(i=>po(i));else if(t.loss!=null){o={};for(const i in t.loss)o[i]=po(t.loss[i])}let r;if(Array.isArray(t.metrics))r=t.metrics.map(i=>po(i));else if(t.metrics!=null){r={};for(const i in t.metrics)r[i]=po(t.metrics[i])}this.compile({loss:o,metrics:r,optimizer:s})}save(t,e){return Q(this,null,function*(){if(typeof t=="string"){const c=Jw(t);if(c.length===0)throw new _(`Cannot find any save handlers for URL '${t}'`);if(c.length>1)throw new _(`Found more than one (${c.length}) save handlers for URL '${t}'`);t=c[0]}if(t.save==null)throw new _("LayersModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");const s=yield _f(this.getNamedWeights(e)),a={modelTopology:this.toJSON(null,!1),format:NE,generatedBy:`TensorFlow.js tfjs-layers v${yx}`,convertedBy:null};if((e==null?!1:e.includeOptimizer)&&this.optimizer!=null){a.trainingConfig=this.getTrainingConfig();const c="optimizer",{data:u,specs:h}=yield _f(yield this.optimizer.getWeights(),c);s.specs.push(...h),s.data=Yw([s.data,u])}return this.userDefinedMetadata!=null&&(xx(this.userDefinedMetadata,this.name,!0),a.userDefinedMetadata=this.userDefinedMetadata),a.weightData=s.data,a.weightSpecs=s.specs,t.save(a)})}setUserDefinedMetadata(t){xx(t,this.name),this.userDefinedMetadata=t}getUserDefinedMetadata(){return this.userDefinedMetadata}}Zo.className="Model",Z(Zo);class Ex extends Zo{}Ex.className="Functional",Z(Ex);class zi extends Zo{constructor(t){if(super({inputs:[],outputs:[]}),t=t||{},this.trainable=!0,this.built=!1,this.name=t.name!=null?t.name:Vl("sequential_"),t.layers!=null)for(const e of t.layers)this.add(e)}checkShape(t){if(t.inboundNodes[0].outputTensors[0].shape.some(s=>s<0))throw new _(`Negative dimension size caused by adding layer ${t.name} with input shape [${t.inboundNodes[0].inputTensors[0].shape}]`)}add(t){const e=t instanceof zi||t instanceof Zo;let s;if(e){if(s=t,s.outputs.length!==1)throw new _("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");if(s.inputs.length!==1)throw new _("All layers in a Sequential model should have a single input tensor. For multi-input layers, use the functional API.")}if(this.outputs.length===0){if(t.inboundNodes.length===0){if(t.batchInputShape==null)throw new _("The first layer in a Sequential model must get an `inputShape` or `batchInputShape` argument.");const o=RT({batchShape:t.batchInputShape,dtype:t.dtype,name:t.name+"_input"});t.apply(o)}if(e)this.outputs=s.outputs,this.inputs=s.inputs;else{if(t.inboundNodes.length!==1)throw new _(`A layer added to a Sequential model must not already be connected somewhere else. LayersModel received layer ${t.name} which has ${t.inboundNodes.length} pre-existing inbound connections.`);if(t.inboundNodes[0].outputTensors.length!==1)throw new _("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");this.checkShape(t),this.outputs=[t.inboundNodes[0].outputTensors[0]],this.inputs=Jg(this.outputs[0])}this.inboundNodes=[],new ql({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:this.inputs,outputTensors:this.outputs,inputMasks:ho(null,this.inputs.length),outputMasks:[null],inputShapes:this.inputs.map(o=>o.shape),outputShapes:this.outputs[0].shape})}else{const o=t.apply(this.outputs[0]);if(Array.isArray(o))throw new TypeError("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");this.checkShape(t),this.outputs=[o],this.inboundNodes[0].outputTensors=this.outputs,this.inboundNodes[0].outputShapes=[this.outputs[0].shape]}this.layers.push(t),this.built=!1}pop(){if(this.layers.length===0)throw new TypeError("There are no layers in the model.");if(this.layers.pop(),this.layers.length===0)this.outputs=[],this.inboundNodes=[],this.outboundNodes=[];else{const t=this.layers.length-1;this.layers[t].outboundNodes=[],this.outputs=[this.layers[t].output],this.inboundNodes[0].outputTensors=this.outputs,this.inboundNodes[0].outputShapes=[this.outputs[0].shape]}}call(t,e){return this.model==null&&this.build(),this.model.call(t,e)}build(t){if(At(t),this.inputs.length===0||this.outputs.length===0)throw new TypeError("Sequential model cannot be built: model is empty. Add some layers first.");this.model=new Zo({inputs:this.inputs,outputs:this.outputs[0],name:this.name+"_model"}),this.model.trainable=this.trainable,this.supportsMasking=this.model.supportsMasking,this.inputLayers=this.model.inputLayers,this.inputLayersNodeIndices=this.model.inputLayersNodeIndices,this.inputLayersTensorIndices=this.model.inputLayersTensorIndices,this.outputLayers=this.model.outputLayers,this.outputLayersNodeIndices=this.model.outputLayersNodeIndices,this.outputLayersTensorIndices=this.model.outputLayersTensorIndices,this.nodesByDepth=this.model.nodesByDepth,this.containerNodes=this.model.containerNodes,this.outputNames=this.model.outputNames,this.inputNames=this.model.inputNames,this.built=!0}countParams(){return this.built||this.build(),super.countParams()}summary(t,e,s=console.log){this.built||this.build(),super.summary(t,e,s)}setWeights(t){this.model==null&&this.build(),this.model.setWeights(t)}evaluate(t,e,s={}){if(!this.built)throw new gn("The model needs to be compiled before being used.");return this.model.evaluate(t,e,s)}evaluateDataset(t,e){return Q(this,null,function*(){if(!this.built)throw new gn("The model needs to be compiled before being used.");return this.model.evaluateDataset(t,e)})}predict(t,e={}){return this.model==null&&this.build(),this.model.predict(t,e)}predictOnBatch(t){return this.model==null&&this.build(),this.model.predictOnBatch(t)}compile(t){this.build(),this.model.compile(t),this.optimizer_=this.model.optimizer,this.isOptimizerOwned=this.model.isOptimizerOwned,this.loss=this.model.loss,this.metrics=this.model.metrics,this.metricsTensors=this.model.metricsTensors,this.metricsNames=this.model.metricsNames}get optimizer(){return this.model==null?void 0:this.model.optimizer}set optimizer(t){this.model.optimizer=t}fit(o,r){return Q(this,arguments,function*(t,e,s={}){if(!this.built)throw new gn("The model needs to be compiled before being used.");return this.model.fit(t,e,s)})}fitDataset(t,e){return Q(this,null,function*(){if(!this.built)throw new gn("The model needs to be compiled before being used.");return this.model.fitDataset(t,e)})}trainOnBatch(t,e){return Q(this,null,function*(){return this.model.trainOnBatch(t,e)})}static fromConfig(t,e,s={},o=!1){let r,i={};if(e instanceof Array){if(e[0].className==null||e[0].className==="Merge")throw new _("Legacy serialization format not supported yet.");r=e}else k(e.layers!=null,()=>"When the config data for a Sequential model is not an Array, it must be an Object that contains the 'layers' field."),r=e.layers,delete e.layers,i=e;const a=new t(i);if(!(a instanceof zi))throw new wt(`Sequential.fromConfig called on non-Sequential input: ${a}`);for(const l of r){const u=ms(l,void 0,o);o&&u.setFastWeightInitDuringBuild(!0),a.add(u)}return a}set stopTraining(t){if(this.model==null)throw new _("Cannot set the stopTraining property of a sequential model before it is compiled.");this.model.stopTraining=t}get stopTraining(){if(this.model==null)throw new _("Cannot get the stopTraining property of a sequential model before it is compiled.");return this.model.stopTraining}getConfig(){const t=[];for(const e of this.layers){const s={};s.className=e.getClassName(),s.config=e.getConfig(),t.push(s)}return{name:this.name,layers:t}}}zi.className="Sequential",Z(zi);let _e=class extends Xo{getConfig(){return{}}};class Rx extends _e{apply(t,e=1){return fT(t,e)}}Rx.className="elu",Z(Rx);class Ax extends _e{apply(t){return wm(t)}}Ax.className="selu",Z(Ax);class Dx extends _e{apply(t){return io(t)}}Dx.className="relu",Z(Dx);class Fx extends _e{apply(t){return W(()=>Ci(6,io(t)))}}Fx.className="relu6",Z(Fx);class _x extends _e{apply(t){return t}}_x.className="linear",Z(_x);class Ox extends _e{apply(t){return Wo(t)}}Ox.className="sigmoid",Z(Ox);class Lx extends _e{apply(t){return gT(t)}}Lx.className="hardSigmoid",Z(Lx);class Mx extends _e{apply(t){return wi(t)}}Mx.className="softplus",Z(Mx);class Px extends _e{apply(t){return mT(t)}}Px.className="softsign",Z(Px);class Bx extends _e{apply(t){return bl(t)}}Bx.className="tanh",Z(Bx);let Bd=class extends _e{apply(t,e=-1){return Sh(t,e)}};Bd.className="softmax",Z(Bd);class zx extends _e{apply(t,e=-1){return om(t,e)}}zx.className="logSoftmax",Z(zx);class Vx extends _e{apply(t){return W(()=>W(()=>{const e=Math.sqrt(2),s=L(.5,J(1,Jf(ft(t,e))));return L(t,s)}))}}Vx.className="gelu",Z(Vx);class Wx extends _e{apply(t){return W(()=>L(.5,L(t,J(1,bl(L(Fe(ft(2,Math.PI)),J(t,L(.044715,oo(t,3)))))))))}}Wx.className="gelu_new",Z(Wx);class Ux extends _e{apply(t){return W(()=>L(t,bl(wi(t))))}}Ux.className="mish",Z(Ux);class Gx extends _e{apply(t,e=1){return W(()=>L(Wo(L(t,e)),t))}}Gx.className="swish",Z(Gx);function Fs(n){return n.getClassName()}function zd(n,t={}){return Ei(n,mn.getMap().classNameMap,t,"activation")}function _s(n){if(n==null){const t={};return t.className="linear",t.config={},zd(t)}if(typeof n=="string"){const t={};return t.className=n,t.config={},zd(t)}else return n instanceof _e?n:zd(n)}function TE(n){if(n!=null&&typeof n!="object")throw new Error(`Argument to L1L2 regularizer's constructor is expected to be an object, but received: ${n}`)}class Hx extends Xo{}class qx extends Hx{constructor(t){super(),TE(t),this.l1=t==null||t.l1==null?.01:t.l1,this.l2=t==null||t.l2==null?.01:t.l2,this.hasL1=this.l1!==0,this.hasL2=this.l2!==0}apply(t){return W(()=>{let e=$e([1]);return this.hasL1&&(e=J(e,pt(L(this.l1,Pe(t))))),this.hasL2&&(e=J(e,pt(L(this.l2,Di(t))))),z(e,[])})}getConfig(){return{l1:this.l1,l2:this.l2}}static fromConfig(t,e){return new t({l1:e.l1,l2:e.l2})}}qx.className="L1L2",Z(qx);const Xx={l1l2:"L1L2"};function Gt(n){return ud(n)}function Kx(n,t={}){return Ei(n,mn.getMap().classNameMap,t,"regularizer")}function Zt(n){if(n==null)return null;if(typeof n=="string"){const e={className:n in Xx?Xx[n]:n,config:{}};return Kx(e)}else return n instanceof Hx?n:Kx(n)}class jx extends vt{constructor(t){super(t==null?{}:t),this.supportsMasking=!0,t!=null&&(this.maxValue=t.maxValue)}call(t,e){t=bt(t);let s=io(t);return this.maxValue!=null&&(s=an(s,0,this.maxValue)),s}computeOutputShape(t){return t}getConfig(){const t={maxValue:this.maxValue},e=super.getConfig();return Object.assign(t,e),t}}jx.className="ReLU",Z(jx);class Yx extends vt{constructor(t){super(t==null?{}:t),this.DEFAULT_ALPHA=.3,t==null&&(t={}),this.alpha=t.alpha==null?this.DEFAULT_ALPHA:t.alpha}call(t,e){const s=bt(t);return mh(s,this.alpha)}computeOutputShape(t){return t}getConfig(){const t={alpha:this.alpha},e=super.getConfig();return Object.assign(t,e),t}}Yx.className="LeakyReLU",Z(Yx);class Zx extends vt{constructor(t){if(super(t==null?{}:t),this.DEFAULT_ALPHA_INITIALIZER="zeros",t==null&&(t={}),this.supportsMasking=!0,this.alphaInitializer=Yt(t.alphaInitializer||this.DEFAULT_ALPHA_INITIALIZER),this.alphaRegularizer=Zt(t.alphaRegularizer),this.alphaConstraint=me(t.alphaConstraint),t.sharedAxes==null)this.sharedAxes=null;else if(Array.isArray(t.sharedAxes))this.sharedAxes=t.sharedAxes;else if(typeof t.sharedAxes=="number")this.sharedAxes=[t.sharedAxes];else throw new _(`Expected sharedAxes to be a number or an array of numbers, but got ${t.sharedAxes}`)}build(t){t=At(t);const e=t.slice(1);if(this.sharedAxes!=null)for(const o of this.sharedAxes)e[o-1]=1;this.alpha=this.addWeight("alpha",e,"float32",this.alphaInitializer,this.alphaRegularizer,!0,this.alphaConstraint);const s={};if(this.sharedAxes!=null)for(let o=1;o<t.length;++o)s[o]=t[o];this.inputSpec=[new pe({ndim:t.length,axes:s})],this.built=!0}call(t,e){return t=bt(t),Ch(t,this.alpha.read())}getConfig(){const t={alphaInitializer:Jt(this.alphaInitializer),alphaRegularizer:Gt(this.alphaRegularizer),alphaConstraint:fe(this.alphaConstraint),sharedAxes:this.sharedAxes},e=super.getConfig();return Object.assign(t,e),t}}Zx.className="PReLU",Z(Zx);let Qx=class extends vt{constructor(t){if(super(t==null?{}:t),this.DEFAULT_ALPHA=1,t==null&&(t={}),t.alpha!=null&&t.alpha!==this.DEFAULT_ALPHA)throw new wt(`Non-default alpha value (${t.alpha}) is not supported by the ELU layer yet.`);this.alpha=t.alpha==null?this.DEFAULT_ALPHA:t.alpha}call(t,e){const s=bt(t);return Cl(s)}computeOutputShape(t){return t}getConfig(){const t={alpha:this.alpha},e=super.getConfig();return Object.assign(t,e),t}};Qx.className="ELU",Z(Qx);class Jx extends vt{constructor(t){super(t==null?{}:t),this.DEFAULT_THETA=1,t==null&&(t={}),this.theta=t.theta==null?this.DEFAULT_THETA:t.theta}call(t,e){const s=bt(t);return L(s,rt(ln(s,this.theta),"float32"))}computeOutputShape(t){return t}getConfig(){const t={theta:this.theta},e=super.getConfig();return Object.assign(t,e),t}}Jx.className="ThresholdedReLU",Z(Jx);class tb extends vt{constructor(t){super(t==null?{}:t),this.DEFAULT_AXIS=1,t==null&&(t={}),this.softmax=new Bd().apply,this.axis=t.axis==null?this.DEFAULT_AXIS:t.axis}call(t,e){return W(()=>{let s=bt(t);const o=e.mask;if(o!=null){const r=L(gt(Ns(s.shape),rt(o,s.dtype)),Pt(-1e9));s=J(s,r)}return this.axis instanceof Array?this.axis.length>1?Hn(gt(s,rm(s,this.axis,!0))):this.softmax(s,this.axis[0]):this.softmax(s,this.axis)})}computeOutputShape(t){return t}getConfig(){const t={axis:this.axis},e=super.getConfig();return Object.assign(t,e),t}}tb.className="Softmax",Z(tb);function Qo(n,t,e){if(typeof n=="number")return ho(n,t);if(n.length!==t)throw new _(`The ${e} argument must be an integer or tuple of ${t} integers. Received: ${n.length} elements.`);for(let s=0;s<t;++s){const o=n[s];if(!uT(o))throw new _(`The ${e} argument must be an integer or tuple of ${t} integers. Received: ${JSON.stringify(n)} including a non-integer number ${o}`)}return n}function Pn(n,t,e,s,o=1){if(n==null)return n;const r=t+(t-1)*(o-1);let i;return e==="same"?i=n:i=n-r+1,Math.floor((i+s-1)/s)}function Jn(n,t,e,s){if(n==null)return null;if(s==="valid")n=n*t+As([e-t,0]);else if(s==="same")n=n*t;else throw new _(`Unsupport padding mode: ${s}.`);return n}function Vd(n,t){return W(()=>(re(t),t==="channelsFirst"?Et(n,[0,2,3,1]):n))}function eb(n,t){return W(()=>(re(t),t==="channelsFirst"?Et(n,[0,2,3,4,1]):n))}function EE(n,t,e,s=1,o="valid",r,i=1){return W(()=>{if(r==null&&(r=_n()),re(r),n.shape.length!==3)throw new _(`The input of a conv1dWithBias operation should be 3, but is ${n.shape.length} instead.`);if(t.shape.length!==3)throw new _(`The kernel for a conv1dWithBias operation should be 3, but is ${t.shape.length} instead`);if(e!=null&&e.shape.length!==1)throw new _(`The bias for a conv1dWithBias operation should be 1, but is ${e.shape.length} instead`);if(r==="channelsFirst"&&(n=Et(n,[0,2,1])),o==="causal")throw new wt("The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.");let a=Xf(n,t,s,o==="same"?"same":"valid","NWC",i);return e!=null&&(a=On(a,e)),a})}function nb(n,t,e,s=[1,1],o="valid",r,i,a=null){return W(()=>{if(r==null&&(r=_n()),re(r),n.rank!==3&&n.rank!==4)throw new _(`conv2dWithBiasActivation expects input to be of rank 3 or 4, but received ${n.rank}.`);if(t.rank!==3&&t.rank!==4)throw new _(`conv2dWithBiasActivation expects kernel to be of rank 3 or 4, but received ${n.rank}.`);let l=Vd(n,r);if(o==="causal")throw new wt("The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.");return l=Rk({x:l,filter:t,strides:s,pad:o==="same"?"same":"valid",dilations:i,dataFormat:"NHWC",bias:e,activation:a}),r==="channelsFirst"&&(l=Et(l,[0,3,1,2])),l})}function RE(n,t,e,s=[1,1,1],o="valid",r,i){return W(()=>{if(r==null&&(r=_n()),re(r),n.rank!==4&&n.rank!==5)throw new _(`conv3dWithBias expects input to be of rank 4 or 5, but received ${n.rank}.`);if(t.rank!==4&&t.rank!==5)throw new _(`conv3dWithBias expects kernel to be of rank 4 or 5, but received ${n.rank}.`);let a=eb(n,r);if(o==="causal")throw new wt("The support for CAUSAL padding mode in conv3dWithBias is not implemented yet.");return a=T$(a,t,s,o==="same"?"same":"valid","NDHWC",i),e!=null&&(a=On(a,e)),r==="channelsFirst"&&(a=Et(a,[0,4,1,2,3])),a})}class sc extends vt{constructor(t,e){if(super(e),this.bias=null,this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_BIAS_INITIALIZER="zeros",sc.verifyArgs(e),this.rank=t,Ie(this.rank,"rank"),this.rank!==1&&this.rank!==2&&this.rank!==3)throw new wt(`Convolution layer for rank other than 1, 2, or 3 (${this.rank}) is not implemented yet.`);if(this.kernelSize=Qo(e.kernelSize,t,"kernelSize"),this.strides=Qo(e.strides==null?1:e.strides,t,"strides"),this.padding=e.padding==null?"valid":e.padding,un(this.padding),this.dataFormat=e.dataFormat==null?"channelsLast":e.dataFormat,re(this.dataFormat),this.activation=_s(e.activation),this.useBias=e.useBias==null?!0:e.useBias,this.biasInitializer=Yt(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.biasConstraint=me(e.biasConstraint),this.biasRegularizer=Zt(e.biasRegularizer),this.activityRegularizer=Zt(e.activityRegularizer),this.dilationRate=Qo(e.dilationRate==null?1:e.dilationRate,t,"dilationRate"),this.rank===1&&Array.isArray(this.dilationRate)&&this.dilationRate.length!==1)throw new _(`dilationRate must be a number or an array of a single number for 1D convolution, but received ${JSON.stringify(this.dilationRate)}`);if(this.rank===2){if(typeof this.dilationRate=="number")this.dilationRate=[this.dilationRate,this.dilationRate];else if(this.dilationRate.length!==2)throw new _(`dilationRate must be a number or array of two numbers for 2D convolution, but received ${JSON.stringify(this.dilationRate)}`)}else if(this.rank===3){if(typeof this.dilationRate=="number")this.dilationRate=[this.dilationRate,this.dilationRate,this.dilationRate];else if(this.dilationRate.length!==3)throw new _(`dilationRate must be a number or array of three numbers for 3D convolution, but received ${JSON.stringify(this.dilationRate)}`)}}static verifyArgs(t){if(jn("kernelSize"in t,"required key 'kernelSize' not in config"),typeof t.kernelSize!="number"&&!dd(t.kernelSize,"number",1,3))throw new _(`BaseConv expects config.kernelSize to be number or number[] with length 1, 2, or 3, but received ${JSON.stringify(t.kernelSize)}.`)}getConfig(){const t={kernelSize:this.kernelSize,strides:this.strides,padding:this.padding,dataFormat:this.dataFormat,dilationRate:this.dilationRate,activation:Fs(this.activation),useBias:this.useBias,biasInitializer:Jt(this.biasInitializer),biasRegularizer:Gt(this.biasRegularizer),activityRegularizer:Gt(this.activityRegularizer),biasConstraint:fe(this.biasConstraint)},e=super.getConfig();return Object.assign(t,e),t}}class Jo extends sc{constructor(t,e){super(t,e),this.kernel=null,Jo.verifyArgs(e),this.filters=e.filters,Ie(this.filters,"filters"),this.kernelInitializer=Yt(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.kernelConstraint=me(e.kernelConstraint),this.kernelRegularizer=Zt(e.kernelRegularizer)}build(t){t=At(t);const e=this.dataFormat==="channelsFirst"?1:t.length-1;if(t[e]==null)throw new _(`The channel dimension of the input should be defined. Found ${t[e]}`);const s=t[e],o=this.kernelSize.concat([s,this.filters]);this.kernel=this.addWeight("kernel",o,null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight("bias",[this.filters],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[{ndim:this.rank+2,axes:{[e]:s}}],this.built=!0}call(t,e){return W(()=>{t=bt(t);let s;const o=this.bias==null?null:this.bias.read(),r=Fg(this.activation.getClassName());if(r!=null&&this.rank===2)s=nb(t,this.kernel.read(),o,this.strides,this.padding,this.dataFormat,this.dilationRate,r);else{if(this.rank===1)s=EE(t,this.kernel.read(),o,this.strides[0],this.padding,this.dataFormat,this.dilationRate[0]);else if(this.rank===2)s=nb(t,this.kernel.read(),o,this.strides,this.padding,this.dataFormat,this.dilationRate);else if(this.rank===3)s=RE(t,this.kernel.read(),o,this.strides,this.padding,this.dataFormat,this.dilationRate);else throw new wt("convolutions greater than 3D are not implemented yet.");this.activation!=null&&(s=this.activation.apply(s))}return s})}computeOutputShape(t){t=At(t);const e=[],s=this.dataFormat==="channelsLast"?t.slice(1,t.length-1):t.slice(2);for(let r=0;r<s.length;++r){const i=Pn(s[r],this.kernelSize[r],this.padding,this.strides[r],typeof this.dilationRate=="number"?this.dilationRate:this.dilationRate[r]);e.push(i)}let o=[t[0]];return this.dataFormat==="channelsLast"?(o=o.concat(e),o.push(this.filters)):(o.push(this.filters),o=o.concat(e)),o}getConfig(){const t={filters:this.filters,kernelInitializer:Jt(this.kernelInitializer),kernelRegularizer:Gt(this.kernelRegularizer),kernelConstraint:fe(this.kernelConstraint)},e=super.getConfig();return Object.assign(t,e),t}static verifyArgs(t){if(!("filters"in t)||typeof t.filters!="number"||t.filters<1)throw new _(`Convolution layer expected config.filters to be a 'number' > 0 but got ${JSON.stringify(t.filters)}`)}}class Vi extends Jo{constructor(t){super(2,t),Vi.verifyArgs(t)}getConfig(){const t=super.getConfig();return delete t.rank,t}static verifyArgs(t){if(typeof t.kernelSize!="number"&&!dd(t.kernelSize,"number",1,2))throw new _(`Conv2D expects config.kernelSize to be number or number[] with length 1 or 2, but received ${JSON.stringify(t.kernelSize)}.`)}}Vi.className="Conv2D",Z(Vi);class Wi extends Jo{constructor(t){super(3,t),Wi.verifyArgs(t)}getConfig(){const t=super.getConfig();return delete t.rank,t}static verifyArgs(t){if(typeof t.kernelSize!="number"&&!(Array.isArray(t.kernelSize)&&(t.kernelSize.length===1||t.kernelSize.length===3)))throw new _(`Conv3D expects config.kernelSize to be number or [number, number, number], but received ${JSON.stringify(t.kernelSize)}.`)}}Wi.className="Conv3D",Z(Wi);class sb extends Vi{constructor(t){if(super(t),this.inputSpec=[new pe({ndim:4})],this.padding!=="same"&&this.padding!=="valid")throw new _(`Conv2DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode ${this.padding}`)}build(t){if(t=At(t),t.length!==4)throw new _("Input should have rank 4; Received input shape: "+JSON.stringify(t));const e=this.dataFormat==="channelsFirst"?1:t.length-1;if(t[e]==null)throw new _("The channel dimension of the inputs should be defined. Found `None`.");const s=t[e],o=this.kernelSize.concat([this.filters,s]);this.kernel=this.addWeight("kernel",o,"float32",this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight("bias",[this.filters],"float32",this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[new pe({ndim:4,axes:{[e]:s}})],this.built=!0}call(t,e){return W(()=>{let s=bt(t);if(s.shape.length!==4)throw new _(`Conv2DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-${s.shape.length}`);const o=s.shape,r=o[0];let i,a;this.dataFormat==="channelsFirst"?(i=2,a=3):(i=1,a=2);const l=o[i],c=o[a],u=this.kernelSize[0],h=this.kernelSize[1],d=this.strides[0],p=this.strides[1],f=Jn(l,d,u,this.padding),m=Jn(c,p,h,this.padding),g=[r,f,m,this.filters];this.dataFormat!=="channelsLast"&&(s=Et(s,[0,2,3,1]));let x=Kf(s,this.kernel.read(),g,this.strides,this.padding);return this.dataFormat!=="channelsLast"&&(x=Et(x,[0,3,1,2])),this.bias!=null&&(x=On(x,this.bias.read(),this.dataFormat)),this.activation!=null&&(x=this.activation.apply(x)),x})}computeOutputShape(t){t=At(t);const e=t.slice();let s,o,r;this.dataFormat==="channelsFirst"?(s=1,o=2,r=3):(s=3,o=1,r=2);const i=this.kernelSize[0],a=this.kernelSize[1],l=this.strides[0],c=this.strides[1];return e[s]=this.filters,e[o]=Jn(e[o],l,i,this.padding),e[r]=Jn(e[r],c,a,this.padding),e}getConfig(){const t=super.getConfig();return delete t.dilationRate,t}}sb.className="Conv2DTranspose",Z(sb);class ob extends Wi{constructor(t){if(super(t),this.inputSpec=[new pe({ndim:5})],this.padding!=="same"&&this.padding!=="valid")throw new _(`Conv3DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode ${this.padding}`)}build(t){if(t=At(t),t.length!==5)throw new _("Input should have rank 5; Received input shape: "+JSON.stringify(t));const e=this.dataFormat==="channelsFirst"?1:t.length-1;if(t[e]==null)throw new _("The channel dimension of the inputs should be defined. Found `None`.");const s=t[e],o=this.kernelSize.concat([this.filters,s]);this.kernel=this.addWeight("kernel",o,"float32",this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight("bias",[this.filters],"float32",this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[new pe({ndim:5,axes:{[e]:s}})],this.built=!0}call(t,e){return W(()=>{let s=bt(t);if(s.shape.length!==5)throw new _(`Conv3DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-${s.shape.length}`);const o=s.shape,r=o[0];let i,a,l;this.dataFormat==="channelsFirst"?(l=2,i=3,a=4):(l=1,i=2,a=3);const c=o[l],u=o[i],h=o[a],d=this.kernelSize[0],p=this.kernelSize[1],f=this.kernelSize[2],m=this.strides[0],g=this.strides[1],x=this.strides[2],b=Jn(c,m,d,this.padding),w=Jn(u,g,p,this.padding),y=Jn(h,x,f,this.padding),$=[r,b,w,y,this.filters];this.dataFormat!=="channelsLast"&&(s=Et(s,[0,2,3,4,1]));let I=A$(s,this.kernel.read(),$,this.strides,this.padding);return this.dataFormat!=="channelsLast"&&(I=Et(I,[0,4,1,2,3])),this.bias!==null&&(I=On(I,this.bias.read(),this.dataFormat)),this.activation!==null&&(I=this.activation.apply(I)),I})}computeOutputShape(t){t=At(t);const e=t.slice();let s,o,r,i;this.dataFormat==="channelsFirst"?(s=1,o=2,r=3,i=4):(s=4,o=1,r=2,i=3);const a=this.kernelSize[0],l=this.kernelSize[1],c=this.kernelSize[2],u=this.strides[0],h=this.strides[1],d=this.strides[2];return e[s]=this.filters,e[o]=Jn(e[o],u,a,this.padding),e[r]=Jn(e[r],h,l,this.padding),e[i]=Jn(e[i],d,c,this.padding),e}getConfig(){const t=super.getConfig();return delete t.dilationRate,t}}ob.className="Conv3DTranspose",Z(ob);class rb extends Jo{constructor(t,e){if(super(t,e),this.DEFAULT_DEPTHWISE_INITIALIZER="glorotUniform",this.DEFAULT_POINTWISE_INITIALIZER="glorotUniform",this.depthwiseKernel=null,this.pointwiseKernel=null,e.filters==null)throw new _("The `filters` configuration field is required by SeparableConv, but is unspecified.");if(e.kernelInitializer!=null||e.kernelRegularizer!=null||e.kernelConstraint!=null)throw new _("Fields kernelInitializer, kernelRegularizer and kernelConstraint are invalid for SeparableConv2D. Use depthwiseInitializer, depthwiseRegularizer, depthwiseConstraint, pointwiseInitializer, pointwiseRegularizer and pointwiseConstraint instead.");if(e.padding!=null&&e.padding!=="same"&&e.padding!=="valid")throw new _(`SeparableConv${this.rank}D supports only padding modes: 'same' and 'valid', but received ${JSON.stringify(e.padding)}`);this.depthMultiplier=e.depthMultiplier==null?1:e.depthMultiplier,this.depthwiseInitializer=Yt(e.depthwiseInitializer||this.DEFAULT_DEPTHWISE_INITIALIZER),this.depthwiseRegularizer=Zt(e.depthwiseRegularizer),this.depthwiseConstraint=me(e.depthwiseConstraint),this.pointwiseInitializer=Yt(e.depthwiseInitializer||this.DEFAULT_POINTWISE_INITIALIZER),this.pointwiseRegularizer=Zt(e.pointwiseRegularizer),this.pointwiseConstraint=me(e.pointwiseConstraint)}build(t){if(t=At(t),t.length<this.rank+2)throw new _(`Inputs to SeparableConv${this.rank}D should have rank ${this.rank+2}, but received input shape: ${JSON.stringify(t)}`);const e=this.dataFormat==="channelsFirst"?1:t.length-1;if(t[e]==null||t[e]<0)throw new _(`The channel dimension of the inputs should be defined, but found ${JSON.stringify(t[e])}`);const s=t[e],o=this.kernelSize.concat([s,this.depthMultiplier]),r=[];for(let a=0;a<this.rank;++a)r.push(1);r.push(s*this.depthMultiplier,this.filters);const i=!0;this.depthwiseKernel=this.addWeight("depthwise_kernel",o,"float32",this.depthwiseInitializer,this.depthwiseRegularizer,i,this.depthwiseConstraint),this.pointwiseKernel=this.addWeight("pointwise_kernel",r,"float32",this.pointwiseInitializer,this.pointwiseRegularizer,i,this.pointwiseConstraint),this.useBias?this.bias=this.addWeight("bias",[this.filters],"float32",this.biasInitializer,this.biasRegularizer,i,this.biasConstraint):this.bias=null,this.inputSpec=[new pe({ndim:this.rank+2,axes:{[e]:s}})],this.built=!0}call(t,e){return W(()=>{t=bt(t);let s;if(this.rank===1)throw new wt("1D separable convolution is not implemented yet.");return this.rank===2&&(this.dataFormat==="channelsFirst"&&(t=Et(t,[0,2,3,1])),s=Cm(t,this.depthwiseKernel.read(),this.pointwiseKernel.read(),this.strides,this.padding,this.dilationRate,"NHWC")),this.useBias&&(s=On(s,this.bias.read(),this.dataFormat)),this.activation!=null&&(s=this.activation.apply(s)),this.dataFormat==="channelsFirst"&&(s=Et(s,[0,3,1,2])),s})}getConfig(){const t=super.getConfig();return delete t.rank,delete t.kernelInitializer,delete t.kernelRegularizer,delete t.kernelConstraint,t.depthwiseInitializer=Jt(this.depthwiseInitializer),t.pointwiseInitializer=Jt(this.pointwiseInitializer),t.depthwiseRegularizer=Gt(this.depthwiseRegularizer),t.pointwiseRegularizer=Gt(this.pointwiseRegularizer),t.depthwiseConstraint=fe(this.depthwiseConstraint),t.pointwiseConstraint=fe(this.pointwiseConstraint),t}}rb.className="SeparableConv";class ib extends rb{constructor(t){super(2,t)}}ib.className="SeparableConv2D",Z(ib);class oc extends Jo{constructor(t){super(1,t),oc.verifyArgs(t),this.inputSpec=[{ndim:3}]}getConfig(){const t=super.getConfig();return delete t.rank,delete t.dataFormat,t}static verifyArgs(t){if(typeof t.kernelSize!="number"&&!dd(t.kernelSize,"number",1,1))throw new _(`Conv1D expects config.kernelSize to be number or number[] with length 1, but received ${JSON.stringify(t.kernelSize)}.`)}}oc.className="Conv1D",Z(oc);class ab extends vt{constructor(t){super(t),typeof t.cropping=="number"?this.cropping=[[t.cropping,t.cropping],[t.cropping,t.cropping]]:typeof t.cropping[0]=="number"?this.cropping=[[t.cropping[0],t.cropping[0]],[t.cropping[1],t.cropping[1]]]:this.cropping=t.cropping,this.dataFormat=t.dataFormat===void 0?"channelsLast":t.dataFormat,this.inputSpec=[{ndim:4}]}computeOutputShape(t){return this.dataFormat==="channelsFirst"?[t[0],t[1],t[2]-this.cropping[0][0]-this.cropping[0][1],t[3]-this.cropping[1][0]-this.cropping[1][1]]:[t[0],t[1]-this.cropping[0][0]-this.cropping[0][1],t[2]-this.cropping[1][0]-this.cropping[1][1],t[3]]}call(t,e){return W(()=>{if(t=bt(t),this.dataFormat==="channelsLast"){const s=Wl(t,this.cropping[0][0],t.shape[1]-this.cropping[0][0]-this.cropping[0][1],2);return Wl(s,this.cropping[1][0],t.shape[2]-this.cropping[1][1]-this.cropping[1][0],3)}else{const s=Wl(t,this.cropping[0][0],t.shape[2]-this.cropping[0][0]-this.cropping[0][1],3);return Wl(s,this.cropping[1][0],t.shape[3]-this.cropping[1][1]-this.cropping[1][0],4)}})}getConfig(){const t={cropping:this.cropping,dataFormat:this.dataFormat},e=super.getConfig();return Object.assign(t,e),t}}ab.className="Cropping2D",Z(ab);class lb extends vt{constructor(t){super(t),this.DEFAULT_SIZE=[2,2],this.inputSpec=[{ndim:4}],this.size=t.size==null?this.DEFAULT_SIZE:t.size,this.dataFormat=t.dataFormat==null?"channelsLast":t.dataFormat,re(this.dataFormat),this.interpolation=t.interpolation==null?"nearest":t.interpolation,aT(this.interpolation)}computeOutputShape(t){if(this.dataFormat==="channelsFirst"){const e=t[2]==null?null:this.size[0]*t[2],s=t[3]==null?null:this.size[1]*t[3];return[t[0],t[1],e,s]}else{const e=t[1]==null?null:this.size[0]*t[1],s=t[2]==null?null:this.size[1]*t[2];return[t[0],e,s,t[3]]}}call(t,e){return W(()=>{let s=bt(t);const o=s.shape;if(this.dataFormat==="channelsFirst"){s=Et(s,[0,2,3,1]);const r=this.size[0]*o[2],i=this.size[1]*o[3],a=this.interpolation==="nearest"?hs.resizeNearestNeighbor(s,[r,i]):hs.resizeBilinear(s,[r,i]);return Et(a,[0,3,1,2])}else{const r=this.size[0]*o[1],i=this.size[1]*o[2];return this.interpolation==="nearest"?hs.resizeNearestNeighbor(s,[r,i]):hs.resizeBilinear(s,[r,i])}})}getConfig(){const t={size:this.size,dataFormat:this.dataFormat,interpolation:this.interpolation},e=super.getConfig();return Object.assign(t,e),t}}lb.className="UpSampling2D",Z(lb);function AE(n,t,e=[1,1],s="valid",o,r){return W(()=>{o==null&&(o=_n()),re(o);let i=Vd(n,o);if(n.rank!==4)throw new _(`Input for depthwiseConv2d is required to be 4-D, but is instead ${n.rank}-D`);if(t.rank!==4)throw new _(`depthwiseKernel is required to be 4-D, but is instead ${t.rank}-D`);return i=hh(i,t,e,s==="same"?"same":"valid","NHWC",r),o==="channelsFirst"&&(i=Et(i,[0,3,1,2])),i})}class cb extends sc{constructor(t){super(2,t),this.depthwiseKernel=null,this.depthMultiplier=t.depthMultiplier==null?1:t.depthMultiplier,this.depthwiseInitializer=Yt(t.depthwiseInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.depthwiseConstraint=me(t.depthwiseConstraint),this.depthwiseRegularizer=Zt(t.depthwiseRegularizer)}build(t){if(t=At(t),t.length<4)throw new _(`Inputs to DepthwiseConv2D should have rank 4. Received input shape: ${JSON.stringify(t)}.`);const e=this.dataFormat==="channelsFirst"?1:3;if(t[e]==null||t[e]<0)throw new _(`The channel dimension of the inputs to DepthwiseConv2D should be defined, but is not (${t[e]}).`);const s=t[e],o=[this.kernelSize[0],this.kernelSize[1],s,this.depthMultiplier];this.depthwiseKernel=this.addWeight("depthwise_kernel",o,null,this.depthwiseInitializer,this.depthwiseRegularizer,!0,this.depthwiseConstraint),this.useBias?this.bias=this.addWeight("bias",[s*this.depthMultiplier],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(t,e){return W(()=>{t=bt(t);let s=AE(t,this.depthwiseKernel.read(),this.strides,this.padding,this.dataFormat,null);return this.useBias&&(s=On(s,this.bias.read(),this.dataFormat)),this.activation!=null&&(s=this.activation.apply(s)),s})}computeOutputShape(t){t=At(t);const e=this.dataFormat==="channelsFirst"?t[2]:t[1],s=this.dataFormat==="channelsFirst"?t[3]:t[2],o=this.dataFormat==="channelsFirst"?t[1]*this.depthMultiplier:t[3]*this.depthMultiplier,r=Pn(e,this.kernelSize[0],this.padding,this.strides[0]),i=Pn(s,this.kernelSize[1],this.padding,this.strides[1]);return this.dataFormat==="channelsFirst"?[t[0],o,r,i]:[t[0],r,i,o]}getConfig(){const t=super.getConfig();return t.depthMultiplier=this.depthMultiplier,t.depthwiseInitializer=Jt(this.depthwiseInitializer),t.depthwiseRegularizer=Gt(this.depthwiseRegularizer),t.depthwiseConstraint=fe(this.depthwiseRegularizer),t}}cb.className="DepthwiseConv2D",Z(cb);function ub(n,t,e,s){if(Array.isArray(n)){if(t!=null||e!=null)throw new _("When inputs is an array, neither initialState or constants should be provided");s!=null&&(e=n.slice(n.length-s,n.length),n=n.slice(0,n.length-s)),n.length>1&&(t=n.slice(1,n.length)),n=n[0]}function o(r){return r==null||Array.isArray(r)?r:[r]}return t=o(t),e=o(e),{inputs:n,initialState:t,constants:e}}function hb(n,t,e,s=!1,o,r,i=!1,a=!1){return W(()=>{const l=t.shape.length;if(l<3)throw new _(`Input should be at least 3D, but is ${l}D.`);const c=[1,0].concat(Fn(2,l));t=Et(t,c),i&&console.warn("Backend rnn(): the unroll = true option is not applicable to the imperative deeplearn.js backend."),o!=null&&(o=rt(rt(o,"bool"),"float32"),o.rank===l-1&&(o=je(o,-1)),o=Et(o,c)),s&&(t=ao(t,0),o!=null&&(o=ao(o,0)));const u=[];let h,d=e;const p=t.shape[0],f=co(t);let m;o!=null&&(m=co(o));for(let x=0;x<p;++x){const b=f[x],w=W(()=>n(b,d));if(o==null)h=w[0],d=w[1];else{const y=W(()=>{const $=m[x],I=gt(fn($),$),v=J(L(w[0],$),L(d[0],I)),T=d.map((S,N)=>J(L(w[1][N],$),L(S,I)));return{output:v,newStates:T}});h=y.output,d=y.newStates}a&&u.push(h)}let g;return a&&(g=us(u,1)),[h,g,d]})}class Os extends vt{constructor(t){super(t);let e;if(t.cell==null)throw new _("cell property is missing for the constructor of RNN.");if(Array.isArray(t.cell)?e=new Gd({cells:t.cell}):e=t.cell,e.stateSize==null)throw new _("The RNN cell should have an attribute `stateSize` (tuple of integers, one integer per RNN state).");this.cell=e,this.returnSequences=t.returnSequences==null?!1:t.returnSequences,this.returnState=t.returnState==null?!1:t.returnState,this.goBackwards=t.goBackwards==null?!1:t.goBackwards,this._stateful=t.stateful==null?!1:t.stateful,this.unroll=t.unroll==null?!1:t.unroll,this.supportsMasking=!0,this.inputSpec=[new pe({ndim:3})],this.stateSpec=null,this.states_=null,this.numConstants=null,this.keptStates=[]}getStates(){if(this.states_==null){const t=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;return Fn(0,t).map(e=>null)}else return this.states_}setStates(t){this.states_=t}computeOutputShape(t){kd(t)&&(t=t[0]),t=t;let e=this.cell.stateSize;Array.isArray(e)||(e=[e]);const s=e[0];let o;if(this.returnSequences?o=[t[0],t[1],s]:o=[t[0],s],this.returnState){const r=[];for(const i of e)r.push([t[0],i]);return[o].concat(r)}else return o}computeMask(t,e){return W(()=>{Array.isArray(e)&&(e=e[0]);const s=this.returnSequences?e:null;if(this.returnState){const o=this.states.map(r=>null);return[s].concat(o)}else return s})}get states(){if(this.states_==null){const t=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1,e=[];for(let s=0;s<t;++s)e.push(null);return e}else return this.states_}set states(t){this.states_=t}build(t){if(this.numConstants!=null)throw new wt("Constants support is not implemented in RNN yet.");kd(t)&&(t=t[0]),t=t;const e=this.stateful?t[0]:null,s=t.slice(2);this.inputSpec[0]=new pe({shape:[e,null,...s]});const o=[t[0]].concat(t.slice(2));this.cell.build(o);let r;if(Array.isArray(this.cell.stateSize)?r=this.cell.stateSize:r=[this.cell.stateSize],this.stateSpec!=null){if(!Lt(this.stateSpec.map(i=>i.shape[i.shape.length-1]),r))throw new _(`An initialState was passed that is not compatible with cell.stateSize. Received stateSpec=${this.stateSpec}; However cell.stateSize is ${this.cell.stateSize}`)}else this.stateSpec=r.map(i=>new pe({shape:[null,i]}));this.stateful&&this.resetStates()}resetStates(t,e=!1){W(()=>{if(!this.stateful)throw new Kn("Cannot call resetStates() on an RNN Layer that is not stateful.");const s=this.inputSpec[0].shape[0];if(s==null)throw new _("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(this.states_==null)Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(o=>$e([s,o])):this.states_=[$e([s,this.cell.stateSize])];else if(t==null)kt(this.states_),this.keptStates!=null&&(kt(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(o=>$e([s,o])):this.states_[0]=$e([s,this.cell.stateSize]);else{if(Array.isArray(t)||(t=[t]),t.length!==this.states_.length)throw new _(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${t.length} state value(s). Input received: ${t}`);e===!0?this.keptStates.push(this.states_.slice()):kt(this.states_);for(let o=0;o<this.states_.length;++o){const r=t[o],i=Array.isArray(this.cell.stateSize)?this.cell.stateSize[o]:this.cell.stateSize,a=[s,i];if(!Lt(r.shape,a))throw new _(`State ${o} is incompatible with layer ${this.name}: expected shape=${a}, received shape=${r.shape}`);this.states_[o]=r}}this.states_=this.states_.map(o=>Wn(o.clone()))})}apply(t,e){let s=e==null?null:e.initialState,o=e==null?null:e.constants;e==null&&(e={});const r=ub(t,s,o,this.numConstants);t=r.inputs,s=r.initialState,o=r.constants;let i=[],a=[];if(s!=null){e.initialState=s,i=i.concat(s),this.stateSpec=[];for(const c of s)this.stateSpec.push(new pe({shape:c.shape}));a=a.concat(this.stateSpec)}if(o!=null&&(e.constants=o,i=i.concat(o),this.numConstants=o.length),i[0]instanceof Qn){const c=[t].concat(i),u=this.inputSpec.concat(a),h=this.inputSpec;this.inputSpec=u;const d=super.apply(c,e);return this.inputSpec=h,d}else return super.apply(t,e)}call(t,e){return W(()=>{const s=e==null?null:e.mask,o=e==null?null:e.training;let r=e==null?null:e.initialState;t=bt(t),r==null&&(this.stateful?r=this.states_:r=this.getInitialState(t));const i=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;if(r.length!==i)throw new _(`RNN Layer has ${i} state(s) but was passed ${r.length} initial state(s).`);this.unroll&&console.warn("Ignoring unroll = true for RNN layer, due to imperative backend.");const a={training:o},c=hb((f,m)=>{const g=this.cell.call([f].concat(m),a);return[g[0],g.slice(1)]},t,r,this.goBackwards,s,null,this.unroll,this.returnSequences),u=c[0],h=c[1],d=c[2];this.stateful&&this.resetStates(d,o);const p=this.returnSequences?h:u;return this.returnState?[p].concat(d):p})}getInitialState(t){return W(()=>{let e=$e(t.shape);return e=pt(e,[1,2]),e=Ai(e),Array.isArray(this.cell.stateSize)?this.cell.stateSize.map(s=>s>1?gd(e,[1,s]):e):this.cell.stateSize>1?[gd(e,[1,this.cell.stateSize])]:[e]})}get trainableWeights(){return this.trainable?this.cell.trainableWeights:[]}get nonTrainableWeights(){return this.trainable?this.cell.nonTrainableWeights:this.cell.weights}setFastWeightInitDuringBuild(t){super.setFastWeightInitDuringBuild(t),this.cell!=null&&this.cell.setFastWeightInitDuringBuild(t)}getConfig(){const t=super.getConfig(),e={returnSequences:this.returnSequences,returnState:this.returnState,goBackwards:this.goBackwards,stateful:this.stateful,unroll:this.unroll};this.numConstants!=null&&(e.numConstants=this.numConstants);const s=this.cell.getConfig();return this.getClassName()===Os.className&&(e.cell={className:this.cell.getClassName(),config:s}),Object.assign(Object.assign(Object.assign({},s),t),e)}static fromConfig(t,e,s={}){const o=e.cell,r=ms(o,s);return new t(Object.assign(e,{cell:r}))}}Os.className="RNN",Z(Os);class rc extends vt{}class Wd extends rc{constructor(t){super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",this.units=t.units,Ie(this.units,"units"),this.activation=_s(t.activation==null?this.DEFAULT_ACTIVATION:t.activation),this.useBias=t.useBias==null?!0:t.useBias,this.kernelInitializer=Yt(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=Yt(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=Yt(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=Zt(t.kernelRegularizer),this.recurrentRegularizer=Zt(t.recurrentRegularizer),this.biasRegularizer=Zt(t.biasRegularizer),this.kernelConstraint=me(t.kernelConstraint),this.recurrentConstraint=me(t.recurrentConstraint),this.biasConstraint=me(t.biasConstraint),this.dropout=Yo([1,As([0,t.dropout==null?0:t.dropout])]),this.recurrentDropout=Yo([1,As([0,t.recurrentDropout==null?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){t=At(t),this.kernel=this.addWeight("kernel",[t[t.length-1],this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight("bias",[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(t,e){return W(()=>{if(t=t,t.length!==2)throw new _(`SimpleRNNCell expects 2 input Tensors, got ${t.length}.`);let s=t[1];t=t[0];const o=e.training==null?!1:e.training;0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=Ls({ones:()=>fn(t),rate:this.dropout,training:o,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=Ls({ones:()=>fn(s),rate:this.recurrentDropout,training:o,dropoutFunc:this.dropoutFunc}));let r;const i=this.dropoutMask,a=this.recurrentDropoutMask;i!=null?r=Zn(L(t,i),this.kernel.read()):r=Zn(t,this.kernel.read()),this.bias!=null&&(r=On(r,this.bias.read())),a!=null&&(s=L(s,a));let l=J(r,Zn(s,this.recurrentKernel.read()));return this.activation!=null&&(l=this.activation.apply(l)),[l,l]})}getConfig(){const t=super.getConfig(),e={units:this.units,activation:Fs(this.activation),useBias:this.useBias,kernelInitializer:Jt(this.kernelInitializer),recurrentInitializer:Jt(this.recurrentInitializer),biasInitializer:Jt(this.biasInitializer),kernelRegularizer:Gt(this.kernelRegularizer),recurrentRegularizer:Gt(this.recurrentRegularizer),biasRegularizer:Gt(this.biasRegularizer),activityRegularizer:Gt(this.activityRegularizer),kernelConstraint:fe(this.kernelConstraint),recurrentConstraint:fe(this.recurrentConstraint),biasConstraint:fe(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout};return Object.assign(Object.assign({},t),e)}}Wd.className="SimpleRNNCell",Z(Wd);class db extends Os{constructor(t){t.cell=new Wd(t),super(t)}call(t,e){return W(()=>{this.cell.dropoutMask!=null&&(kt(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(kt(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);const s=e==null?null:e.mask,o=e==null?null:e.training,r=e==null?null:e.initialState;return super.call(t,{mask:s,training:o,initialState:r})})}static fromConfig(t,e){return new t(e)}}db.className="SimpleRNN",Z(db);class Ud extends rc{constructor(t){if(super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_RECURRENT_ACTIVATION="hardSigmoid",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",t.resetAfter)throw new _("GRUCell does not support reset_after parameter set to true.");this.units=t.units,Ie(this.units,"units"),this.activation=_s(t.activation===void 0?this.DEFAULT_ACTIVATION:t.activation),this.recurrentActivation=_s(t.recurrentActivation===void 0?this.DEFAULT_RECURRENT_ACTIVATION:t.recurrentActivation),this.useBias=t.useBias==null?!0:t.useBias,this.kernelInitializer=Yt(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=Yt(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=Yt(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=Zt(t.kernelRegularizer),this.recurrentRegularizer=Zt(t.recurrentRegularizer),this.biasRegularizer=Zt(t.biasRegularizer),this.kernelConstraint=me(t.kernelConstraint),this.recurrentConstraint=me(t.recurrentConstraint),this.biasConstraint=me(t.biasConstraint),this.dropout=Yo([1,As([0,t.dropout==null?0:t.dropout])]),this.recurrentDropout=Yo([1,As([0,t.recurrentDropout==null?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.implementation=t.implementation,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){t=At(t);const e=t[t.length-1];this.kernel=this.addWeight("kernel",[e,this.units*3],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,this.units*3],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight("bias",[this.units*3],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(t,e){return W(()=>{if(t=t,t.length!==2)throw new _(`GRUCell expects 2 input Tensors (inputs, h, c), got ${t.length}.`);const s=e.training==null?!1:e.training;let o=t[1];t=t[0],0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=Ls({ones:()=>fn(t),rate:this.dropout,training:s,count:3,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=Ls({ones:()=>fn(o),rate:this.recurrentDropout,training:s,count:3,dropoutFunc:this.dropoutFunc}));const r=this.dropoutMask,i=this.recurrentDropoutMask;let a,l,c;0<this.dropout&&this.dropout<1&&(t=L(t,r[0]));let u=Zn(t,this.kernel.read());this.useBias&&(u=On(u,this.bias.read())),0<this.recurrentDropout&&this.recurrentDropout<1&&(o=L(o,i[0]));const h=this.recurrentKernel.read(),[d,p]=cn(h,[2*this.units,this.units],h.rank-1),f=Zn(o,d),[m,g,x]=cn(u,3,u.rank-1),[b,w]=cn(f,2,f.rank-1);a=this.recurrentActivation.apply(J(m,b)),l=this.recurrentActivation.apply(J(g,w));const y=Zn(L(l,o),p);c=this.activation.apply(J(x,y));const $=J(L(a,o),L(J(1,oe(a)),c));return[$,$]})}getConfig(){const t=super.getConfig(),e={units:this.units,activation:Fs(this.activation),recurrentActivation:Fs(this.recurrentActivation),useBias:this.useBias,kernelInitializer:Jt(this.kernelInitializer),recurrentInitializer:Jt(this.recurrentInitializer),biasInitializer:Jt(this.biasInitializer),kernelRegularizer:Gt(this.kernelRegularizer),recurrentRegularizer:Gt(this.recurrentRegularizer),biasRegularizer:Gt(this.biasRegularizer),activityRegularizer:Gt(this.activityRegularizer),kernelConstraint:fe(this.kernelConstraint),recurrentConstraint:fe(this.recurrentConstraint),biasConstraint:fe(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation,resetAfter:!1};return Object.assign(Object.assign({},t),e)}}Ud.className="GRUCell",Z(Ud);class pb extends Os{constructor(t){t.implementation===0&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),t.cell=new Ud(t),super(t)}call(t,e){return W(()=>{this.cell.dropoutMask!=null&&(kt(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(kt(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);const s=e==null?null:e.mask,o=e==null?null:e.training,r=e==null?null:e.initialState;return super.call(t,{mask:s,training:o,initialState:r})})}static fromConfig(t,e){return e.implmentation===0&&(e.implementation=1),new t(e)}}pb.className="GRU",Z(pb);class ic extends rc{constructor(t){super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_RECURRENT_ACTIVATION="hardSigmoid",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",this.units=t.units,Ie(this.units,"units"),this.activation=_s(t.activation===void 0?this.DEFAULT_ACTIVATION:t.activation),this.recurrentActivation=_s(t.recurrentActivation===void 0?this.DEFAULT_RECURRENT_ACTIVATION:t.recurrentActivation),this.useBias=t.useBias==null?!0:t.useBias,this.kernelInitializer=Yt(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=Yt(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=Yt(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.unitForgetBias=t.unitForgetBias,this.kernelRegularizer=Zt(t.kernelRegularizer),this.recurrentRegularizer=Zt(t.recurrentRegularizer),this.biasRegularizer=Zt(t.biasRegularizer),this.kernelConstraint=me(t.kernelConstraint),this.recurrentConstraint=me(t.recurrentConstraint),this.biasConstraint=me(t.biasConstraint),this.dropout=Yo([1,As([0,t.dropout==null?0:t.dropout])]),this.recurrentDropout=Yo([1,As([0,t.recurrentDropout==null?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.implementation=t.implementation,this.stateSize=[this.units,this.units],this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){var e;t=At(t);const s=t[t.length-1];this.kernel=this.addWeight("kernel",[s,this.units*4],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,this.units*4],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint);let o;if(this.useBias){if(this.unitForgetBias){const r=this.biasInitializer,i=this.units;o=new(e=class extends bn{apply(l,c){const u=r.apply([i]),h=new bd().apply([i]),d=r.apply([i*2]);return zg(zg(u,h),d)}},e.className="CustomInit",e)}else o=this.biasInitializer;this.bias=this.addWeight("bias",[this.units*4],null,o,this.biasRegularizer,!0,this.biasConstraint)}else this.bias=null;this.built=!0}call(t,e){return W(()=>{const s=e.training==null?!1:e.training;if(t=t,t.length!==3)throw new _(`LSTMCell expects 3 input Tensors (inputs, h, c), got ${t.length}.`);let o=t[1];const r=t[2];t=t[0],0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=Ls({ones:()=>fn(t),rate:this.dropout,training:s,count:4,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=Ls({ones:()=>fn(o),rate:this.recurrentDropout,training:s,count:4,dropoutFunc:this.dropoutFunc}));const i=this.dropoutMask,a=this.recurrentDropoutMask;let l,c,u,h;0<this.dropout&&this.dropout<1&&(t=L(t,i[0]));let d=Zn(t,this.kernel.read());0<this.recurrentDropout&&this.recurrentDropout<1&&(o=L(o,a[0])),d=J(d,Zn(o,this.recurrentKernel.read())),this.useBias&&(d=On(d,this.bias.read()));const[p,f,m,g]=cn(d,4,d.rank-1);l=this.recurrentActivation.apply(p),c=this.recurrentActivation.apply(f),u=J(L(c,r),L(l,this.activation.apply(m))),h=this.recurrentActivation.apply(g);const x=L(h,this.activation.apply(u));return[x,x,u]})}getConfig(){const t=super.getConfig(),e={units:this.units,activation:Fs(this.activation),recurrentActivation:Fs(this.recurrentActivation),useBias:this.useBias,kernelInitializer:Jt(this.kernelInitializer),recurrentInitializer:Jt(this.recurrentInitializer),biasInitializer:Jt(this.biasInitializer),unitForgetBias:this.unitForgetBias,kernelRegularizer:Gt(this.kernelRegularizer),recurrentRegularizer:Gt(this.recurrentRegularizer),biasRegularizer:Gt(this.biasRegularizer),activityRegularizer:Gt(this.activityRegularizer),kernelConstraint:fe(this.kernelConstraint),recurrentConstraint:fe(this.recurrentConstraint),biasConstraint:fe(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation};return Object.assign(Object.assign({},t),e)}}ic.className="LSTMCell",Z(ic);class fb extends Os{constructor(t){t.implementation===0&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),t.cell=new ic(t),super(t)}call(t,e){return W(()=>{this.cell.dropoutMask!=null&&(kt(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(kt(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);const s=e==null?null:e.mask,o=e==null?null:e.training,r=e==null?null:e.initialState;return super.call(t,{mask:s,training:o,initialState:r})})}static fromConfig(t,e){return e.implmentation===0&&(e.implementation=1),new t(e)}}fb.className="LSTM",Z(fb);class Gd extends rc{constructor(t){super(t),this.cells=t.cells}get stateSize(){const t=[];for(const e of this.cells.slice().reverse())Array.isArray(e.stateSize)?t.push(...e.stateSize):t.push(e.stateSize);return t}call(t,e){return W(()=>{t=t;let s=t.slice(1);const o=[];for(const a of this.cells.slice().reverse())Array.isArray(a.stateSize)?o.push(s.splice(0,a.stateSize.length)):o.push(s.splice(0,1));o.reverse();const r=[];let i;for(let a=0;a<this.cells.length;++a){const l=this.cells[a];s=o[a],a===0?i=[t[0]].concat(s):i=[i[0]].concat(s),i=l.call(i,e),r.push(i.slice(1))}s=[];for(const a of r.slice().reverse())s.push(...a);return[i[0]].concat(s)})}build(t){kd(t)&&(t=t[0]),t=t;let e;this.cells.forEach((s,o)=>{mo(`RNNCell_${o}`,()=>{s.build(t),Array.isArray(s.stateSize)?e=s.stateSize[0]:e=s.stateSize,t=[t[0],e]})}),this.built=!0}getConfig(){const t=super.getConfig(),e=r=>({className:r.getClassName(),config:r.getConfig()}),o={cells:this.cells.map(e)};return Object.assign(Object.assign({},t),o)}static fromConfig(t,e,s={}){const o=[];for(const r of e.cells)o.push(ms(r,s));return new t({cells:o})}get trainableWeights(){if(!this.trainable)return[];const t=[];for(const e of this.cells)t.push(...e.trainableWeights);return t}get nonTrainableWeights(){const t=[];for(const e of this.cells)t.push(...e.nonTrainableWeights);if(!this.trainable){const e=[];for(const s of this.cells)e.push(...s.trainableWeights);return e.concat(t)}return t}getWeights(){const t=[];for(const e of this.cells)t.push(...e.weights);return Sd(t)}setWeights(t){const e=[];for(const s of this.cells){const o=s.weights.length,r=t.splice(o);for(let i=0;i<s.weights.length;++i)e.push([s.weights[i],r[i]])}Nd(e)}}Gd.className="StackedRNNCells",Z(Gd);function Ls(n){const{ones:t,rate:e,training:s=!1,count:o=1,dropoutFunc:r}=n,i=()=>r!=null?r(t(),e):Wg(t(),e),a=()=>Fi(i,t,s);return!o||o<=1?Wn(a().clone()):Array(o).fill(void 0).map(a).map(c=>Wn(c.clone()))}var DE=function(n,t){var e={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&t.indexOf(s)<0&&(e[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,s=Object.getOwnPropertySymbols(n);o<s.length;o++)t.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(n,s[o])&&(e[s[o]]=n[s[o]]);return e};class mb extends Os{constructor(t){if(t.unroll)throw new wt("Unrolling is not possible with convolutional RNNs.");if(Array.isArray(t.cell))throw new wt("It is not possible at the moment to stack convolutional cells.");super(t),this.inputSpec=[new pe({ndim:5})]}call(t,e){return W(()=>{if(this.cell.dropoutMask!=null&&(kt(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(kt(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null),e&&e.constants)throw new _("ConvRNN2D cell does not support constants");const s=e==null?null:e.mask,o=e==null?null:e.training,r=e==null?null:e.initialState;return super.call(t,{mask:s,training:o,initialState:r})})}computeOutputShape(t){let e=this.computeSingleOutputShape(t);return this.returnSequences||(e=[e[0],...e.slice(2)]),this.returnState&&(e=[e,...Array(2).fill([t[0],...e.slice(-3)])]),e}getInitialState(t){return W(()=>{const{stateSize:e}=this.cell,s=t.shape,o=this.computeSingleOutputShape(s),r=[o[0],...o.slice(2)],i=$e(r);return Array.isArray(e)?Array(e.length).fill(i):[i]})}resetStates(t,e=!1){W(()=>{if(!this.stateful)throw new Kn("Cannot call resetStates() on an RNN Layer that is not stateful.");const s=this.inputSpec[0].shape,o=this.computeSingleOutputShape(s),r=[o[0],...o.slice(2)];if(s[0]==null)throw new _("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(this.getStates()==null)Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(()=>$e(r)):this.states_=[$e(r)];else if(t==null)kt(this.states_),this.keptStates!=null&&(kt(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(()=>$e(r)):this.states_[0]=$e(r);else{if(Array.isArray(t)||(t=[t]),t.length!==this.states_.length)throw new _(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${t.length} state value(s). Input received: ${t}`);e?this.keptStates.push(this.states_.slice()):kt(this.states_);for(let a=0;a<this.states_.length;++a){const l=t[a],c=r;if(!Lt(l.shape,c))throw new _(`State ${a} is incompatible with layer ${this.name}: expected shape=${c}, received shape=${l.shape}`);this.states_[a]=l}}this.states_=this.states_.map(a=>Wn(a.clone()))})}computeSingleOutputShape(t){const{dataFormat:e,filters:s,kernelSize:o,padding:r,strides:i,dilationRate:a}=this.cell,l=e==="channelsFirst",c=t[l?3:2],u=t[l?4:3],h=Pn(c,o[0],r,i[0],a[0]),d=Pn(u,o[1],r,i[1],a[1]);return[...t.slice(0,2),...l?[s,h,d]:[h,d,s]]}}mb.className="ConvRNN2D";class Hd extends ic{constructor(t){const{filters:e,kernelSize:s,strides:o,padding:r,dataFormat:i,dilationRate:a}=t;super(Object.assign(Object.assign({},t),{units:e})),this.filters=e,Ie(this.filters,"filters"),this.kernelSize=Qo(s,2,"kernelSize"),this.kernelSize.forEach(l=>Ie(l,"kernelSize")),this.strides=Qo(o||1,2,"strides"),this.strides.forEach(l=>Ie(l,"strides")),this.padding=r||"valid",un(this.padding),this.dataFormat=i||"channelsLast",re(this.dataFormat),this.dilationRate=Qo(a||1,2,"dilationRate"),this.dilationRate.forEach(l=>Ie(l,"dilationRate"))}build(t){var e;t=At(t);const s=this.dataFormat==="channelsFirst"?1:t.length-1;if(t[s]==null)throw new _(`The channel dimension of the input should be defined. Found ${t[s]}`);const o=t[s],r=4,i=this.kernelSize.concat([o,this.filters*r]);this.kernel=this.addWeight("kernel",i,null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint);const a=this.kernelSize.concat([this.filters,this.filters*r]);if(this.recurrentKernel=this.addWeight("recurrent_kernel",a,null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias){let l;if(this.unitForgetBias){const c=this.biasInitializer,u=this.filters;l=new(e=class extends bn{apply(d,p){const f=c.apply([u]),m=Ns([u]),g=c.apply([u*2]);return md([f,m,g])}},e.className="CustomInit",e)}else l=this.biasInitializer;this.bias=this.addWeight("bias",[this.filters*r],null,l,this.biasRegularizer,!0,this.biasConstraint)}this.built=!0}call(t,e){return W(()=>{if(t.length!==3)throw new _(`ConvLSTM2DCell expects 3 input Tensors (inputs, h, c), got ${t.length}.`);const s=e.training||!1,o=t[0],r=t[1],i=t[2],a=4;0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=Ls({ones:()=>fn(o),rate:this.dropout,training:s,count:a,dropoutFunc:this.dropoutFunc}));const l=this.dropoutMask,c=(G,K,j)=>!K||!K[j]?G:L(K[j],G);let u=c(o,l,0),h=c(o,l,1),d=c(o,l,2),p=c(o,l,3);0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=Ls({ones:()=>fn(r),rate:this.recurrentDropout,training:s,count:a,dropoutFunc:this.dropoutFunc}));const f=this.recurrentDropoutMask;let m=c(r,f,0),g=c(r,f,1),x=c(r,f,2),b=c(r,f,3);const w=3,[y,$,I,v]=cn(this.kernel.read(),a,w),[T,S,N,C]=this.useBias?cn(this.bias.read(),a):[null,null,null,null];u=this.inputConv(u,y,T,this.padding),h=this.inputConv(h,$,S,this.padding),d=this.inputConv(d,I,N,this.padding),p=this.inputConv(p,v,C,this.padding);const[E,R,D,F]=cn(this.recurrentKernel.read(),a,w);m=this.recurrentConv(m,E),g=this.recurrentConv(g,R),x=this.recurrentConv(x,D),b=this.recurrentConv(b,F);const O=this.recurrentActivation.apply(J(u,m)),P=this.recurrentActivation.apply(J(h,g)),B=J(L(P,i),L(O,this.activation.apply(J(d,x)))),H=L(this.recurrentActivation.apply(J(p,b)),this.activation.apply(B));return[H,H,B]})}getConfig(){const t=super.getConfig(),{units:e}=t,s=DE(t,["units"]),o={filters:this.filters,kernelSize:this.kernelSize,padding:this.padding,dataFormat:this.dataFormat,dilationRate:this.dilationRate,strides:this.strides};return Object.assign(Object.assign({},s),o)}inputConv(t,e,s,o){const r=so(t,e,this.strides,o||"valid",this.dataFormat==="channelsFirst"?"NCHW":"NHWC",this.dilationRate);return s?On(r,s,this.dataFormat):r}recurrentConv(t,e){return so(t,e,1,"same",this.dataFormat==="channelsFirst"?"NCHW":"NHWC")}}Hd.className="ConvLSTM2DCell",Z(Hd);class gb extends mb{constructor(t){const e=new Hd(t);super(Object.assign(Object.assign({},t),{cell:e}))}static fromConfig(t,e){return new t(e)}}gb.className="ConvLSTM2D",Z(gb);class qd extends vt{constructor(t){super(t),this.rate=Math.max(Math.min(t.rate,1),0),this.noiseShape=t.noiseShape,this.seed=t.seed,this.supportsMasking=!0}getNoiseShape(t){if(this.noiseShape==null)return this.noiseShape;const e=t.shape,s=[];for(let o=0;o<this.noiseShape.length;++o)s.push(this.noiseShape[o]==null?e[o]:this.noiseShape[o]);return s}call(t,e){return W(()=>{this.invokeCallHook(t,e);const s=bt(t);if(0<this.rate&&this.rate<1){const o=e.training==null?!1:e.training,r=this.getNoiseShape(s);return Fi(()=>Wg(s,this.rate,r,this.seed),()=>s,o)}return t})}getConfig(){const t={rate:this.rate,noiseShape:this.noiseShape,seed:this.seed},e=super.getConfig();return Object.assign(t,e),t}dispose(){return super.dispose()}}qd.className="Dropout",Z(qd);class xb extends qd{constructor(t){super(t),this.inputSpec=[{ndim:3}]}getNoiseShape(t){const e=t.shape;return[e[0],1,e[2]]}}xb.className="SpatialDropout1D",Z(xb);class bb extends vt{constructor(t){if(super(t),this.activation=null,this.useBias=!0,this.kernel=null,this.bias=null,this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_BIAS_INITIALIZER="zeros",t.batchInputShape==null&&t.inputShape==null&&t.inputDim!=null){let e=null;t.batchSize!=null&&(e=t.batchSize),this.batchInputShape=[e,t.inputDim]}this.units=t.units,Ie(this.units,"units"),this.activation=_s(t.activation),t.useBias!=null&&(this.useBias=t.useBias),this.kernelInitializer=Yt(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.biasInitializer=Yt(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelConstraint=me(t.kernelConstraint),this.biasConstraint=me(t.biasConstraint),this.kernelRegularizer=Zt(t.kernelRegularizer),this.biasRegularizer=Zt(t.biasRegularizer),this.activityRegularizer=Zt(t.activityRegularizer),this.supportsMasking=!0,this.inputSpec=[{minNDim:2}]}build(t){t=At(t);const e=t[t.length-1];this.kernel==null&&(this.kernel=this.addWeight("kernel",[e,this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight("bias",[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint))),this.inputSpec=[{minNDim:2,axes:{[-1]:e}}],this.built=!0}computeOutputShape(t){t=At(t);const e=t.slice();return e[e.length-1]=this.units,e}call(t,e){return W(()=>{this.invokeCallHook(t,e);const s=bt(t),o=Fg(this.activation.getClassName());let r;return o!=null?r=Zn(s,this.kernel.read(),o,this.bias?this.bias.read():null):(r=Zn(s,this.kernel.read()),this.bias!=null&&(r=On(r,this.bias.read())),this.activation!=null&&(r=this.activation.apply(r))),r})}getConfig(){const t={units:this.units,activation:Fs(this.activation),useBias:this.useBias,kernelInitializer:Jt(this.kernelInitializer),biasInitializer:Jt(this.biasInitializer),kernelRegularizer:Gt(this.kernelRegularizer),biasRegularizer:Gt(this.biasRegularizer),activityRegularizer:Gt(this.activityRegularizer),kernelConstraint:fe(this.kernelConstraint),biasConstraint:fe(this.biasConstraint)},e=super.getConfig();return Object.assign(t,e),t}}bb.className="Dense",Z(bb);class yb extends vt{constructor(t){t=t||{},super(t),this.inputSpec=[{minNDim:3}],this.dataFormat=t.dataFormat}computeOutputShape(t){t=At(t);for(const e of t.slice(1))if(e==null)throw new _(`The shape of the input to "Flatten" is not fully defined (got ${t.slice(1)}). Make sure to pass a complete "input_shape" or "batch_input_shape" argument to the first layer in your model.`);return[t[0],Rs(t,1)]}call(t,e){return W(()=>{this.invokeCallHook(t,e);let s=bt(t);if(this.dataFormat==="channelsFirst"&&s.rank>1){const o=[0];for(let r=2;r<s.rank;++r)o.push(r);o.push(1),s=Et(s,o)}return pT(s)})}getConfig(){const t={};this.dataFormat!=null&&(t.dataFormat=this.dataFormat);const e=super.getConfig();return Object.assign(t,e),t}}yb.className="Flatten",Z(yb);class wb extends vt{constructor(t){super(t),this.supportsMasking=!0,this.activation=_s(t.activation)}call(t,e){return W(()=>{this.invokeCallHook(t,e);const s=bt(t);return this.activation.apply(s)})}getConfig(){const t={activation:Fs(this.activation)},e=super.getConfig();return Object.assign(t,e),t}}wb.className="Activation",Z(wb);class Cb extends vt{constructor(t){super(t),this.n=t.n,this.inputSpec=[{ndim:2}]}computeOutputShape(t){return[t[0],this.n,t[1]]}call(t,e){return W(()=>(t=bt(t),hT(t,this.n)))}getConfig(){const t={n:this.n},e=super.getConfig();return Object.assign(t,e),t}}Cb.className="RepeatVector",Z(Cb);class $b extends vt{constructor(t){super(t),this.targetShape=t.targetShape;for(let e=0;e<this.targetShape.length;++e)this.isUnknown(this.targetShape[e])&&(this.targetShape[e]=null)}isUnknown(t){return t<0||t==null}fixUnknownDimension(t,e){const s="Total size of new array must be unchanged.",o=e.slice();let r=1,i=null;for(let l=0;l<o.length;++l){const c=o[l];if(this.isUnknown(c))if(i===null)i=l;else throw new _("Can only specifiy one unknown dimension.");else r*=c}const a=Rs(t);if(i!==null){if(r===0||a%r!==0)throw new _(s);o[i]=a/r}else if(a!==r)throw new _(s);return o}computeOutputShape(t){let e=!1;for(let s=0;s<t.length;++s)if(this.isUnknown(t[s])){e=!0;break}return e?t.slice(0,1).concat(this.targetShape):t.slice(0,1).concat(this.fixUnknownDimension(t.slice(1),this.targetShape))}call(t,e){return W(()=>{this.invokeCallHook(t,e);const s=bt(t),o=s.shape,r=o.slice(0,1).concat(this.fixUnknownDimension(o.slice(1),this.targetShape));return z(s,r)})}getConfig(){const t={targetShape:this.targetShape},e=super.getConfig();return Object.assign(t,e),t}}$b.className="Reshape",Z($b);class Ib extends vt{constructor(t){if(super(t),t.dims==null)throw new Error("Required configuration field `dims` is missing during Permute constructor call.");if(!Array.isArray(t.dims))throw new Error(`Permute constructor requires \`dims\` to be an Array, but received ${t.dims} instead.`);const e=Fn(1,t.dims.length+1);if(!Lt(t.dims.slice().sort(),e))throw new Error("Invalid permutation `dims`: "+JSON.stringify(t.dims)+" `dims` must contain consecutive integers starting from 1.");this.dims=t.dims,this.dimsIncludingBatch=[0].concat(this.dims),this.inputSpec=[new pe({ndim:this.dims.length+1})]}computeOutputShape(t){t=At(t);const e=t.slice();return this.dims.forEach((s,o)=>{e[o+1]=t[s]}),e}call(t,e){return Et(bt(t),this.dimsIncludingBatch)}getConfig(){const t={dims:this.dims},e=super.getConfig();return Object.assign(t,e),t}}Ib.className="Permute",Z(Ib);class vb extends vt{constructor(t){super(t==null?{}:t),this.supportsMasking=!0,t!=null?this.maskValue=t.maskValue==null?0:t.maskValue:this.maskValue=0}computeOutputShape(t){return t}getConfig(){const t=super.getConfig(),e={maskValue:this.maskValue};return Object.assign(e,t),e}computeMask(t,e){const s=bt(t);return sh(Sl(s,this.maskValue),-1)}call(t,e){return W(()=>{this.invokeCallHook(t,e);const s=bt(t),i=sh(Sl(s,this.maskValue),-1,!0);return L(s,rt(i,s.dtype))})}}vb.className="Masking",Z(vb);class kb extends vt{constructor(t){if(super(t),this.embeddings=null,this.DEFAULT_EMBEDDINGS_INITIALIZER="randomUniform",t.batchInputShape==null&&t.inputShape==null){let e=null;t.batchSize!=null&&(e=t.batchSize),t.inputLength==null?this.batchInputShape=[e,null]:this.batchInputShape=[e].concat(Vt(t.inputLength))}this.inputDim=t.inputDim,Ie(this.inputDim,"inputDim"),this.outputDim=t.outputDim,Ie(this.outputDim,"outputDim"),this.embeddingsInitializer=Yt(t.embeddingsInitializer||this.DEFAULT_EMBEDDINGS_INITIALIZER),this.embeddingsRegularizer=Zt(t.embeddingsRegularizer),this.activityRegularizer=Zt(t.activityRegularizer),this.embeddingsConstraint=me(t.embeddingsConstraint),this.maskZero=t.maskZero,this.supportsMasking=t.maskZero,this.inputLength=t.inputLength}build(t){this.embeddings=this.addWeight("embeddings",[this.inputDim,this.outputDim],this.dtype,this.embeddingsInitializer,this.embeddingsRegularizer,!0,this.embeddingsConstraint),this.built=!0}warnOnIncompatibleInputShape(t){}computeMask(t,e){return W(()=>this.maskZero?(t=bt(t),Sl(t,Tt(t))):null)}computeOutputShape(t){if(t=At(t),this.inputLength==null)return[...t,this.outputDim];const e=Vt(this.inputLength);if(e.length!==t.length-1)throw new _(`"inputLength" is ${this.inputLength}, but received input shape has shape ${t}`);{let s=0;for(let o=0;o<e.length;++o){const r=e[o],i=t[o+1];if(r!=null&&i!=null&&r!==i)throw new _(`"inputLength" is ${this.inputLength}, but received input shape has shape ${t}`);r==null&&(e[s]=i),s++}}return[t[0],...e,this.outputDim]}call(t,e){return W(()=>{this.invokeCallHook(t,e);let s=bt(t);s.dtype!=="int32"&&(s=Yn(s,"int32"));const o=Vg(this.embeddings.read(),z(s,[s.size]));return z(o,At(this.computeOutputShape(s.shape)))})}getConfig(){const t={inputDim:this.inputDim,outputDim:this.outputDim,embeddingsInitializer:Jt(this.embeddingsInitializer),embeddingsRegularizer:Gt(this.embeddingsRegularizer),activityRegularizer:Gt(this.activityRegularizer),embeddingsConstraint:fe(this.embeddingsConstraint),maskZero:this.maskZero,inputLength:this.inputLength},e=super.getConfig();return Object.assign(t,e),t}}kb.className="Embedding",Z(kb);class bo extends vt{constructor(t){super(t||{}),this.supportsMasking=!0}mergeFunction(t){throw new wt}computeElementwiseOpOutputShape(t,e){if(t==null||e==null)return null;if(t.length<e.length)return this.computeElementwiseOpOutputShape(e,t);if(e.length===0)return t;const s=t.slice(0,t.length-e.length);for(let o=0;o<e.length;++o){const r=t[t.length-e.length+o],i=e[o];if(r==null||i==null||r<0||i<0)s.push(null);else if(r===1)s.push(i);else if(i===1)s.push(r);else{if(r!==i)throw new _("Operands could not be broadcast together with shapes "+JSON.stringify(t)+" "+JSON.stringify(e));s.push(r)}}return s}build(t){if(Array.isArray(t)&&!Array.isArray(t[0])&&(t=[At(t)]),t=t,t.length<2)throw new _(`A merge layer should be called on an Array of at least 2 inputs. Got ${t.length} input(s).`);let e=[];for(const r of t)r!=null&&r[0]!==null&&e.push(r[0]);if(e=Es(e),e.length>1)throw new _(`Can not merge tensors with different batch sizes. Got tensors with shapes: ${JSON.stringify(t)}.`);let s=t[0]==null?null:t[0].slice(1);for(let r=1;r<t.length;++r){const i=t[r]==null?null:t[r].slice(1);s=this.computeElementwiseOpOutputShape(s,i)}const o=t.map(r=>r.length);t.indexOf(null)===-1&&Es(o).length===1?this.reshapeRequired=!1:this.reshapeRequired=!0}call(t,e){return W(()=>{if(t=t,this.reshapeRequired){const s=[],o=t.map(r=>r.rank);if(o.indexOf(null)===-1){const r=As(o);for(let i of t){const a=i.rank;for(let l=0;l<r-a;++l)i=Ai(i,1);s.push(i)}return this.mergeFunction(s)}else{let r=!1;for(const l of t){const c=l.rank;if(c==null){const u=l.shape,h=u[0],d=u.slice(1).concat([h]);let p=z(l,[h].concat(Rs(u.slice(1))));p=Et(p,[1,0]),p=z(p,d),s.push(p),r=!0}else if(c>1){const u=Fn(1,c).concat([0]);s.push(Et(l,u)),r=!0}else s.push(l)}let i=this.mergeFunction(s);const a=i.rank;if(r){if(a==null){const l=i.shape,c=l.length,u=l[c-1],h=[u].concat(l.slice(0,l.length-1));i=z(Et(z(i,[-1,u]),[1,0]),h)}else if(a>1){const l=[a-1].concat(Fn(0,a-1));i=Et(i,l)}}return i}}else return this.mergeFunction(t)})}computeOutputShape(t){t=t;let e;t[0]==null?e=null:e=t[0].slice(1);for(let o=1;o<t.length;++o){const r=t[o]==null?null:t[o].slice(1);e=this.computeElementwiseOpOutputShape(e,r)}let s=[];for(const o of t)o!=null&&o[0]!==null&&s.push(o[0]);return s=Es(s),s.length===1?e=s.concat(e):e=[null].concat(e),e}computeMask(t,e){return W(()=>{if(e==null)return null;if(!Array.isArray(e))throw new _("`mask` should be an Array");if(!Array.isArray(t))throw new _("`inputs` should be an Array");if(e.length!==t.length)throw new _(`The Array 'inputs' and 'mask' are expected to have the same length, but have different lengths (${t.length} vs ${e.length})`);if(e.every(o=>o==null))return null;e=e.map(o=>o==null?o:je(o,0));let s=e[0];for(let o=1;o<e.length-1;++o)s=cs(s,e[o]);return s})}}class Sb extends bo{constructor(t){super(t)}mergeFunction(t){return W(()=>{let e=t[0].clone();for(let s=1;s<t.length;++s)e=J(e,t[s]);return e})}}Sb.className="Add",Z(Sb);class Nb extends bo{constructor(t){super(t)}mergeFunction(t){return W(()=>{let e=t[0].clone();for(let s=1;s<t.length;++s)e=L(e,t[s]);return e})}}Nb.className="Multiply",Z(Nb);class Tb extends bo{constructor(t){super(t)}mergeFunction(t){return W(()=>{let e=t[0].clone();for(let s=1;s<t.length;++s)e=J(e,t[s]);return L(1/t.length,e)})}}Tb.className="Average",Z(Tb);class Eb extends bo{constructor(t){super(t)}mergeFunction(t){return W(()=>{let e=t[0];for(let s=1;s<t.length;++s)e=Ss(e,t[s]);return e})}}Eb.className="Maximum",Z(Eb);class Rb extends bo{constructor(t){super(t)}mergeFunction(t){return W(()=>{let e=t[0];for(let s=1;s<t.length;++s)e=Ci(e,t[s]);return e})}}Rb.className="Minimum",Z(Rb);class Ab extends bo{constructor(t){super(t),this.DEFAULT_AXIS=-1,t==null&&(t={}),this.axis=t.axis==null?this.DEFAULT_AXIS:t.axis,this.supportsMasking=!0,this.reshapeRequired=!1}build(t){if(!(Array.isArray(t)&&Array.isArray(t[0]))||t.length===1)throw new _("A `Concatenate` layer should be called on a list of at least 2 inputs");t=t;let e=!0;for(const o of t)if(o!=null){e=!1;break}if(e)return;const s=[];for(let o=0;o<t.length;++o){const r=t[o].slice();r.splice(this.axis,1);let i=!1;for(const a of s)if(Lt(a,r)){i=!0;break}i||s.push(r)}if(s.length>1)throw new _("A `Concatenate` layer requires inputs with matching shapes except for the concat axis. Got input shapes: "+JSON.stringify(t))}mergeFunction(t){return W(()=>md(t,this.axis))}computeOutputShape(t){if(!(Array.isArray(t)&&Array.isArray(t[0])))throw new _("A `Concatenate` layer should be called on a list of inputs.");const e=t,s=e[0].slice(),o=this.axis<0?s.length+this.axis:this.axis;for(const r of e.slice(1)){if(s[o]==null||r[o]==null){s[o]=null;break}s[o]+=r[o]}return s}computeMask(t,e){if(e==null)return null;if(!Array.isArray(e))throw new _("`mask` should be an array for Concatenate");if(!Array.isArray(t))throw new _("`inputs` should be an array for Concatenate");if(e.length!==t.length)throw new _(`Mismatch in the length of mask (${e.length}) and the legnth of inputs (${t.length})`);return W(()=>{let s=!0;if(e.forEach(i=>{if(i!=null){s=!1;return}}),s)return null;const o=[];for(let i=0;i<t.length;++i)e[i]==null?o.push(rt(fn(t[i]),"bool")):e[i].rank<t[i].rank?o.push(je(e[i],-1)):o.push(e[i]);const r=Ke(o,this.axis);return qf(r,-1,!1)})}getConfig(){const t={axis:this.axis},e=super.getConfig();return Object.assign(t,e),t}}Ab.className="Concatenate",Z(Ab);function Ui(n,t){for(;n<0;)n+=t;return n}function FE(n,t,e){if(n.shape.length>3||t.shape.length>3)throw new wt("batchDot is not implemented for tensors of 4D or higher rank yet");if(k(n.shape.length>=2,()=>`batchDot requires the rank of x to be >= 2, but got ${n.shape.length}`),k(n.shape.length>=2,()=>`batchDot requires the rank of y to be >= 2, but got ${t.shape.length}`),typeof e=="number"&&(e=[e,e]),n.dtype==="complex64"||t.dtype==="complex64")throw new wt("batchDot is not implemented for complex64-type Tensors yet.");const s=n.shape.length,o=t.shape.length;e==null&&(e=[s-1,o-2]);const r=e;return W(()=>{let i;if(s>o){i=s-o;const l=[];for(let c=0;c<i;++c)l.push(1);t=z(t,t.shape.concat(l))}else if(o>s){i=o-s;const l=[];for(let c=0;c<i;++c)l.push(1);n=z(n,n.shape.concat(l))}else i=0;let a;if(n.shape.length===2&&t.shape.length===2)r[0]===r[1]?a=pt(L(n,t),r[0]):a=pt(L(Et(n,[1,0]),t),r[1]);else{const l=r[0]!==n.shape.length-1,c=r[1]===t.shape.length-1;a=Mt(n,t,l,c)}if(i>0){let l;s>o?l=s+o-3:l=s-1;const c=[];for(let u=l;u<l+i;++u)c.push(u);a=vi(a,c)}return a.shape.length===1&&(a=je(a,1)),a})}class Db extends bo{constructor(t){super(t),this.axes=t.axes,this.normalize=t.normalize==null?!1:t.normalize,this.supportsMasking=!0,this.reshapeRequired=!1}build(t){k(Array.isArray(t)&&t.length===2&&Array.isArray(t[0])&&Array.isArray(t[1]),()=>"A `Dot` layer should be called on a list of exactly 2 inputs.");const e=t[0],s=t[1];if(e.length>3||s.length>3)throw new wt("Dot layer does not support tensors of 4D or higher rank yet.");const o=this.interpretAxes(e,s);if(e[o[0]]!==s[o[1]])throw new _(`Dimension incompatibility: ${e[o[0]]} !== ${s[o[1]]}`)}mergeFunction(t){if(t.length!==2)throw new _(`A \`Dot\` layer must be called on exactly 2 inputs, but received ${t.length} input(s).`);let e=t[0],s=t[1],o;return Array.isArray(this.axes)?o=this.axes.map((r,i)=>Ui(r,t[i].shape.length)):o=[Ui(this.axes,e.shape.length),Ui(this.axes,s.shape.length)],this.normalize&&(e=jl(e,o[0]),s=jl(s,o[1])),FE(e,s,o)}interpretAxes(t,e){let s;return Array.isArray(this.axes)?s=this.axes:s=[Ui(this.axes,t.length),Ui(this.axes,e.length)],s}computeOutputShape(t){k(Array.isArray(t)&&t.length===2&&Array.isArray(t[0])&&Array.isArray(t[1]),()=>"A `Dot` layer should be called on a list of exactly 2 inputs.");const e=t[0].slice(),s=t[1].slice();if(e.length>3||s.length>3)throw new wt("Dot layer does not support tensors of 4D or higher rank yet.");const o=this.interpretAxes(e,s);e.splice(o[0],1),s.splice(o[1],1),s.splice(0,1);const r=e.concat(s);return r.length===1&&r.push(1),r}computeMask(t,e){return null}getConfig(){const t={axes:this.axes,normalize:this.normalize},e=super.getConfig();return Object.assign(t,e),t}}Db.className="Dot",Z(Db);class Fb extends vt{constructor(t){super(t),this.supportsMasking=!0,this.stddev=t.stddev}computeOutputShape(t){return t}getConfig(){const t=super.getConfig(),e={stddev:this.stddev};return Object.assign(e,t),e}call(t,e){return W(()=>{this.invokeCallHook(t,e);const s=bt(t);return Fi(()=>J(Ul(s.shape,0,this.stddev),s),()=>s,e.training||!1)})}}Fb.className="GaussianNoise",Z(Fb);class _b extends vt{constructor(t){super(t),this.supportsMasking=!0,this.rate=t.rate}computeOutputShape(t){return t}getConfig(){const t=super.getConfig(),e={rate:this.rate};return Object.assign(e,t),e}call(t,e){return W(()=>{this.invokeCallHook(t,e);const s=bt(t);return this.rate>0&&this.rate<1?Fi(()=>{const r=Math.sqrt(this.rate/(1-this.rate));return L(s,Ul(s.shape,1,r))},()=>s,e.training||!1):s})}}_b.className="GaussianDropout",Z(_b);class Ob extends vt{constructor(t){super(t),this.supportsMasking=!0,this.rate=t.rate,this.noiseShape=t.noiseShape}_getNoiseShape(t){return this.noiseShape||bt(t).shape}computeOutputShape(t){return t}getConfig(){const t=super.getConfig(),e={rate:this.rate};return Object.assign(e,t),e}call(t,e){return W(()=>{if(this.rate<1&&this.rate>0){const s=this._getNoiseShape(t);return Fi(()=>{const r=bt(t),a=-1.6732632423543772*1.0507009873554805;let l=ro($i(s),this.rate);l=Yn(l,"float32");const c=Sp((1-this.rate)*(1+this.rate*Sp(a,2)),-.5),u=-c*a*this.rate,h=J(L(r,l),L(J(l,-1),a));return J(L(h,c),u)},()=>bt(t),e.training||!1)}return t})}}Ob.className="AlphaDropout",Z(Ob);function Gi(n,t,e,s,o,r=.001){let i;if(n.rank===2)i=o$(n,t,e,s,o,r);else if(n.rank===3)i=i$(n,t,e,s,o,r);else if(n.rank===4)i=l$(n,t,e,s,o,r);else throw new wt(`batchNormalization is not implemented for array of rank ${n.rank} yet`);return i}function _E(n,t,e,s,o=.001){return W(()=>{const r=bh(n,s),i=r.mean,a=r.variance;return[Gi(n,i,a,e,t,o),i,a]})}function OE(n,t,e,s,o=.001){return W(()=>{const r=bh(n,s),i=r.mean,a=r.variance,l=[];for(const f of Fn(0,n.rank))s.indexOf(f)!==-1?l.push(1):l.push(n.shape[f]);const c=z(i,l),u=z(a,l),h=t==null?null:z(t,l),d=e==null?null:z(e,l);return[Gi(n,c,u,d,h,o),i,a]})}function LE(n,t,e,s,o=.001){return Lt(s.slice().sort(),Fn(0,n.rank-1))?_E(n,t,e,s,o):OE(n,t,e,s,o)}class Lb extends vt{constructor(t){t==null&&(t={}),super(t),this.supportsMasking=!0,this.axis=t.axis==null?-1:t.axis,this.momentum=t.momentum==null?.99:t.momentum,this.epsilon=t.epsilon==null?.001:t.epsilon,this.center=t.center==null?!0:t.center,this.scale=t.scale==null?!0:t.scale,this.betaInitializer=Yt(t.betaInitializer||"zeros"),this.gammaInitializer=Yt(t.gammaInitializer||"ones"),this.movingMeanInitializer=Yt(t.movingMeanInitializer||"zeros"),this.movingVarianceInitializer=Yt(t.movingVarianceInitializer||"ones"),this.betaConstraint=me(t.betaConstraint),this.gammaConstraint=me(t.gammaConstraint),this.betaRegularizer=Zt(t.betaRegularizer),this.gammaRegularizer=Zt(t.gammaRegularizer)}build(t){t=At(t);const e=this.axis>=0?this.axis:this.axis+t.length,s=t[e];if(s==null)throw new _(`Axis ${e} of input tensor should have a defined dimension but the layer received an input with shape ${JSON.stringify(t)}.`);this.inputSpec=[new pe({ndim:t.length,axes:{[e]:s}})];const o=[s];this.scale&&(this.gamma=this.addWeight("gamma",o,null,this.gammaInitializer,this.gammaRegularizer,!0,this.gammaConstraint)),this.center&&(this.beta=this.addWeight("beta",o,null,this.betaInitializer,this.betaRegularizer,!0,this.betaConstraint)),this.movingMean=this.addWeight("moving_mean",o,null,this.movingMeanInitializer,null,!1),this.movingVariance=this.addWeight("moving_variance",o,null,this.movingVarianceInitializer,null,!1),this.built=!0}call(t,e){return W(()=>{const s=e.training==null?!1:e.training,o=bt(t),r=o.shape,i=r.length,a=Fn(0,i),l=this.axis>=0?this.axis:this.axis+i;a.splice(l,1);const c=ho(1,i);c[l]=r[l];const u=a.slice();u.sort();const h=!Lt(u,Fn(0,i).slice(0,i-1)),d=()=>{if(h){const b=z(this.movingMean.read(),c),w=z(this.movingVariance.read(),c),y=this.center?z(this.beta.read(),c):null,$=this.scale?z(this.gamma.read(),c):null;return Gi(o,b,w,y,$,this.epsilon)}else return Gi(o,this.movingMean.read(),this.movingVariance.read(),this.beta==null?null:this.beta.read(),this.gamma==null?null:this.gamma.read(),this.epsilon)};if(!s)return d();const[p,f,m]=LE(o,this.gamma.read(),this.beta.read(),a,this.epsilon),g=(b,w,y)=>{W(()=>{const $=1-y,I=b.read(),v=L(gt(I,w),$);b.write(gt(I,v))})};return g(this.movingMean,f,this.momentum),g(this.movingVariance,m,this.momentum),p})}getConfig(){const t={axis:this.axis,momentum:this.momentum,epsilon:this.epsilon,center:this.center,scale:this.scale,betaInitializer:Jt(this.betaInitializer),gammaInitializer:Jt(this.gammaInitializer),movingMeanInitializer:Jt(this.movingMeanInitializer),movingVarianceInitializer:Jt(this.movingVarianceInitializer),betaRegularizer:Gt(this.betaRegularizer),gammaRegularizer:Gt(this.gammaRegularizer),betaConstraint:fe(this.betaConstraint),gammaConstraint:fe(this.gammaConstraint)},e=super.getConfig();return Object.assign(t,e),t}}Lb.className="BatchNormalization",Z(Lb);class Mb extends vt{constructor(t){if(t==null&&(t={}),super(t),this.axis=t.axis==null?-1:t.axis,typeof this.axis=="number"){if(!Number.isInteger(this.axis))throw new Error(`Expected axis to be an integer, but received ${this.axis}`)}else if(Array.isArray(this.axis)){for(const e of this.axis)if(!Number.isInteger(e))throw new Error(`Expected axis to be an array of integers, but received ${JSON.stringify(this.axis)}`)}else throw new Error(`Expected axis to be an integer or an array of integers, but received ${JSON.stringify(this.axis)}`);this.epsilon=t.epsilon==null?.001:t.epsilon,this.center=t.center==null?!0:t.center,this.scale=t.scale==null?!0:t.scale,this.betaInitializer=Yt(t.betaInitializer||"zeros"),this.gammaInitializer=Yt(t.gammaInitializer||"ones"),this.betaRegularizer=Zt(t.betaRegularizer),this.gammaRegularizer=Zt(t.gammaRegularizer),this.supportsMasking=!0}build(t){t=At(t);const e=t.length;typeof this.axis=="number"&&(this.axis=[this.axis]);for(let r=0;r<this.axis.length;++r)this.axis[r]<0&&(this.axis[r]+=e);for(const r of this.axis)if(r<0||r>=e)throw new Error(`Invalid axis: ${r}`);if(this.axis.length!==Es(this.axis).length)throw new Error(`Found duplicate axes in: ${this.axis}`);const s=this.axis.map(r=>t[r]),o=!0;this.scale?this.gamma=this.addWeight("gamma",s,"float32",this.gammaInitializer,this.gammaRegularizer,o):this.gamma=null,this.center?this.beta=this.addWeight("beta",s,"float32",this.betaInitializer,this.betaRegularizer,o):this.beta=null,this.built=!0}call(t,e){const s=bt(t),o=s.shape,r=o.length;return W(()=>{let{mean:a,variance:l}=bh(s,this.axis,!0);const c=ho(1,r);for(const m of this.axis)c[m]=o[m];const u=m=>m!=null&&m.shape.length!==r?z(m,c):m;let h=this.scale?u(this.gamma.read()):null,d=this.center?u(this.beta.read()):null;const p=[],f=[];for(let m=0;m<r;++m)this.axis.indexOf(m)!==-1?(p.push(o[m]),f.push(1)):(p.push(1),f.push(o[m]));return a=An(a,p),l=An(l,p),h!=null&&(h=An(h,f)),d!=null&&(d=An(d,f)),Gi(s,a,l,d,h,this.epsilon)})}getConfig(){const t={axis:this.axis,epsilon:this.epsilon,center:this.center,scale:this.scale,betaInitializer:Jt(this.betaInitializer),gammaInitializer:Jt(this.gammaInitializer),betaRegularizer:Gt(this.betaRegularizer),gammaRegularizer:Gt(this.gammaRegularizer)},e=super.getConfig();return Object.assign(t,e),t}}Mb.className="LayerNormalization",Z(Mb);function ME(n,t,e){return W(()=>{if(n.rank!==4)throw new _(`temporalPadding expects input tensor to be 4-D, but received a ${n.rank}-D tensor.`);if(t==null&&(t=[[1,1],[1,1]]),t.length!==2||t[0].length!==2||t[1].length!==2)throw new _("spatial2dPadding expects `padding` to be an Array of two Arrays, each of which is an Array of two integers.");if(e==null&&(e=_n()),e!=="channelsLast"&&e!=="channelsFirst")throw new _(`Unknown data format: ${e}. Supported data formats are 'channelsLast' and 'channelsFirst.`);let s;return e==="channelsFirst"?s=[[0,0],[0,0],t[0],t[1]]:s=[[0,0],t[0],t[1],[0,0]],yh(n,s)})}class Pb extends vt{constructor(t){if(t==null&&(t={}),super(t),this.dataFormat=t.dataFormat==null?_n():t.dataFormat,t.padding==null)this.padding=[[1,1],[1,1]];else if(typeof t.padding=="number")this.padding=[[t.padding,t.padding],[t.padding,t.padding]];else{if(t.padding=t.padding,t.padding.length!==2)throw new _(`ZeroPadding2D expects padding to be a length-2 array, but received a length-${t.padding.length} array.`);let e,s;if(typeof t.padding[0]=="number")e=[t.padding[0],t.padding[0]],s=[t.padding[1],t.padding[1]];else{if(t.padding=t.padding,t.padding[0].length!==2)throw new _(`ZeroPadding2D expects height padding to be a length-2 array, but received a length-${t.padding[0].length} array.`);if(e=t.padding[0],t.padding[1].length!==2)throw new _(`ZeroPadding2D expects width padding to be a length-2 array, but received a length-${t.padding[1].length} array.`);s=t.padding[1]}this.padding=[e,s]}this.inputSpec=[new pe({ndim:4})]}computeOutputShape(t){t=At(t);let e,s;return this.dataFormat==="channelsFirst"?(t[2]!=null&&t[2]>=0?e=t[2]+this.padding[0][0]+this.padding[0][1]:e=null,t[3]!=null&&t[3]>=0?s=t[3]+this.padding[1][0]+this.padding[1][1]:s=null,[t[0],t[1],e,s]):(t[1]!=null&&t[1]>=0?e=t[1]+this.padding[0][0]+this.padding[0][1]:e=null,t[2]!=null&&t[2]>=0?s=t[2]+this.padding[1][0]+this.padding[1][1]:s=null,[t[0],e,s,t[3]])}call(t,e){return W(()=>ME(bt(t),this.padding,this.dataFormat))}getConfig(){const t={padding:this.padding,dataFormat:this.dataFormat},e=super.getConfig();return Object.assign(t,e),t}}Pb.className="ZeroPadding2D",Z(Pb);function ac(n,t,e,s,o,r){return W(()=>{re(o),Og(r),un(s),e==null&&(e=[1,1]),s==null&&(s="valid"),o==null&&(o=_n()),r==null&&(r="max"),n=Vd(n,o);let i;const a=s==="same"?"same":"valid";return r==="max"?i=xh(n,t,e,a):i=ih(n,t,e,a),o==="channelsFirst"&&(i=Et(i,[0,3,1,2])),i})}function Bb(n,t,e,s,o,r){return W(()=>{re(o),Og(r),un(s),e==null&&(e=[1,1,1]),s==null&&(s="valid"),o==null&&(o=_n()),r==null&&(r="max"),n=eb(n,o);let i;const a=s==="same"?"same":"valid";return r==="max"?i=qI(n,t,e,a):i=KC(n,t,e,a),o==="channelsFirst"&&(i=Et(i,[0,4,1,2,3])),i})}class zb extends vt{constructor(t){if(t.poolSize==null&&(t.poolSize=2),super(t),typeof t.poolSize=="number")this.poolSize=[t.poolSize];else if(Array.isArray(t.poolSize)&&t.poolSize.length===1&&typeof t.poolSize[0]=="number")this.poolSize=t.poolSize;else throw new _(`poolSize for 1D convolutional layer must be a number or an Array of a single number, but received ${JSON.stringify(t.poolSize)}`);if(Ie(this.poolSize,"poolSize"),t.strides==null)this.strides=this.poolSize;else if(typeof t.strides=="number")this.strides=[t.strides];else if(Array.isArray(t.strides)&&t.strides.length===1&&typeof t.strides[0]=="number")this.strides=t.strides;else throw new _(`strides for 1D convolutional layer must be a number or an Array of a single number, but received ${JSON.stringify(t.strides)}`);Ie(this.strides,"strides"),this.padding=t.padding==null?"valid":t.padding,un(this.padding),this.inputSpec=[new pe({ndim:3})]}computeOutputShape(t){t=At(t);const e=Pn(t[1],this.poolSize[0],this.padding,this.strides[0]);return[t[0],e,t[2]]}call(t,e){return W(()=>{this.invokeCallHook(t,e),t=Ai(bt(t),2);const s=this.poolingFunction(bt(t),[this.poolSize[0],1],[this.strides[0],1],this.padding,"channelsLast");return vi(s,[2])})}getConfig(){const t={poolSize:this.poolSize,padding:this.padding,strides:this.strides},e=super.getConfig();return Object.assign(t,e),t}}class Vb extends zb{constructor(t){super(t)}poolingFunction(t,e,s,o,r){return re(r),un(o),ac(t,e,s,o,r,"max")}}Vb.className="MaxPooling1D",Z(Vb);class Wb extends zb{constructor(t){super(t)}poolingFunction(t,e,s,o,r){return re(r),un(o),ac(t,e,s,o,r,"avg")}}Wb.className="AveragePooling1D",Z(Wb);class Ub extends vt{constructor(t){if(t.poolSize==null&&(t.poolSize=[2,2]),super(t),this.poolSize=Array.isArray(t.poolSize)?t.poolSize:[t.poolSize,t.poolSize],t.strides==null)this.strides=this.poolSize;else if(Array.isArray(t.strides)){if(t.strides.length!==2)throw new _(`If the strides property of a 2D pooling layer is an Array, it is expected to have a length of 2, but received length ${t.strides.length}.`);this.strides=t.strides}else this.strides=[t.strides,t.strides];Ie(this.poolSize,"poolSize"),Ie(this.strides,"strides"),this.padding=t.padding==null?"valid":t.padding,this.dataFormat=t.dataFormat==null?"channelsLast":t.dataFormat,re(this.dataFormat),un(this.padding),this.inputSpec=[new pe({ndim:4})]}computeOutputShape(t){t=At(t);let e=this.dataFormat==="channelsFirst"?t[2]:t[1],s=this.dataFormat==="channelsFirst"?t[3]:t[2];return e=Pn(e,this.poolSize[0],this.padding,this.strides[0]),s=Pn(s,this.poolSize[1],this.padding,this.strides[1]),this.dataFormat==="channelsFirst"?[t[0],t[1],e,s]:[t[0],e,s,t[3]]}call(t,e){return W(()=>(this.invokeCallHook(t,e),this.poolingFunction(bt(t),this.poolSize,this.strides,this.padding,this.dataFormat)))}getConfig(){const t={poolSize:this.poolSize,padding:this.padding,strides:this.strides,dataFormat:this.dataFormat},e=super.getConfig();return Object.assign(t,e),t}}class Gb extends Ub{constructor(t){super(t)}poolingFunction(t,e,s,o,r){return re(r),un(o),ac(t,e,s,o,r,"max")}}Gb.className="MaxPooling2D",Z(Gb);class Hb extends Ub{constructor(t){super(t)}poolingFunction(t,e,s,o,r){return re(r),un(o),ac(t,e,s,o,r,"avg")}}Hb.className="AveragePooling2D",Z(Hb);class qb extends vt{constructor(t){if(t.poolSize==null&&(t.poolSize=[2,2,2]),super(t),this.poolSize=Array.isArray(t.poolSize)?t.poolSize:[t.poolSize,t.poolSize,t.poolSize],t.strides==null)this.strides=this.poolSize;else if(Array.isArray(t.strides)){if(t.strides.length!==3)throw new _(`If the strides property of a 3D pooling layer is an Array, it is expected to have a length of 3, but received length ${t.strides.length}.`);this.strides=t.strides}else this.strides=[t.strides,t.strides,t.strides];Ie(this.poolSize,"poolSize"),Ie(this.strides,"strides"),this.padding=t.padding==null?"valid":t.padding,this.dataFormat=t.dataFormat==null?"channelsLast":t.dataFormat,re(this.dataFormat),un(this.padding),this.inputSpec=[new pe({ndim:5})]}computeOutputShape(t){t=At(t);let e=this.dataFormat==="channelsFirst"?t[2]:t[1],s=this.dataFormat==="channelsFirst"?t[3]:t[2],o=this.dataFormat==="channelsFirst"?t[4]:t[3];return e=Pn(e,this.poolSize[0],this.padding,this.strides[0]),s=Pn(s,this.poolSize[1],this.padding,this.strides[1]),o=Pn(o,this.poolSize[2],this.padding,this.strides[2]),this.dataFormat==="channelsFirst"?[t[0],t[1],e,s,o]:[t[0],e,s,o,t[4]]}call(t,e){return W(()=>(this.invokeCallHook(t,e),this.poolingFunction(bt(t),this.poolSize,this.strides,this.padding,this.dataFormat)))}getConfig(){const t={poolSize:this.poolSize,padding:this.padding,strides:this.strides,dataFormat:this.dataFormat},e=super.getConfig();return Object.assign(t,e),t}}class Xb extends qb{constructor(t){super(t)}poolingFunction(t,e,s,o,r){return re(r),un(o),Bb(t,e,s,o,r,"max")}}Xb.className="MaxPooling3D",Z(Xb);class Kb extends qb{constructor(t){super(t)}poolingFunction(t,e,s,o,r){return re(r),un(o),Bb(t,e,s,o,r,"avg")}}Kb.className="AveragePooling3D",Z(Kb);class jb extends vt{constructor(t){super(t),this.inputSpec=[new pe({ndim:3})]}computeOutputShape(t){return[t[0],t[2]]}call(t,e){throw new wt}}class Yb extends jb{constructor(t){super(t||{})}call(t,e){return W(()=>{const s=bt(t);return ce(s,1)})}}Yb.className="GlobalAveragePooling1D",Z(Yb);class Zb extends jb{constructor(t){super(t||{})}call(t,e){return W(()=>{const s=bt(t);return Rn(s,1)})}}Zb.className="GlobalMaxPooling1D",Z(Zb);class Qb extends vt{constructor(t){super(t),this.dataFormat=t.dataFormat==null?"channelsLast":t.dataFormat,re(this.dataFormat),this.inputSpec=[new pe({ndim:4})]}computeOutputShape(t){return t=t,this.dataFormat==="channelsLast"?[t[0],t[3]]:[t[0],t[1]]}call(t,e){throw new wt}getConfig(){const t={dataFormat:this.dataFormat},e=super.getConfig();return Object.assign(t,e),t}}class Jb extends Qb{call(t,e){return W(()=>{const s=bt(t);return this.dataFormat==="channelsLast"?ce(s,[1,2]):ce(s,[2,3])})}}Jb.className="GlobalAveragePooling2D",Z(Jb);class t0 extends Qb{call(t,e){return W(()=>{const s=bt(t);return this.dataFormat==="channelsLast"?Rn(s,[1,2]):Rn(s,[2,3])})}}t0.className="GlobalMaxPooling2D",Z(t0);class e0 extends vt{constructor(t){super(t),this.layer=t.layer}build(t){this.built=!0}get trainable(){return this.layer!=null?this.layer.trainable:!1}set trainable(t){this.layer!=null&&(this.layer.trainable=t)}get trainableWeights(){return this.layer.trainableWeights}get nonTrainableWeights(){return this.layer.nonTrainableWeights}get updates(){return this.layer._updates}get losses(){return this.layer.losses}getWeights(){return this.layer.getWeights()}setWeights(t){this.layer.setWeights(t)}getConfig(){const t={layer:{className:this.layer.getClassName(),config:this.layer.getConfig()}},e=super.getConfig();return Object.assign(t,e),t}setFastWeightInitDuringBuild(t){super.setFastWeightInitDuringBuild(t),this.layer!=null&&this.layer.setFastWeightInitDuringBuild(t)}static fromConfig(t,e,s={}){const o=e.layer,r=ms(o,s);delete e.layer;const i={layer:r};return Object.assign(i,e),new t(i)}}class n0 extends e0{constructor(t){super(t),this.supportsMasking=!0}build(t){if(t=At(t),t.length<3)throw new _(`TimeDistributed layer expects an input shape >= 3D, but received input shape ${JSON.stringify(t)}`);this.inputSpec=[{shape:t}];const e=[t[0]].concat(t.slice(2));this.layer.built||(this.layer.build(e),this.layer.built=!0),super.build(t)}computeOutputShape(t){t=At(t);const e=[t[0]].concat(t.slice(2)),s=this.layer.computeOutputShape(e),o=t[1];return[s[0],o].concat(s.slice(1))}call(t,e){return W(()=>(t=bt(t),hb((i,a)=>[bt(this.layer.call(i,e)),[]],t,[],!1,null,null,!1,!0)[1]))}}n0.className="TimeDistributed",Z(n0);function PE(n){fo(iT,"BidirectionalMergeMode",n)}const BE="concat";class s0 extends e0{constructor(t){super(t);const e=t.layer.getConfig(),s={};s.className=t.layer.getClassName(),s.config=e,this.forwardLayer=ms(s),e.goBackwards=e.goBackwards!==!0;const o={};if(o.className=t.layer.getClassName(),o.config=e,this.backwardLayer=ms(o),this.forwardLayer.name="forward_"+this.forwardLayer.name,this.backwardLayer.name="backward_"+this.backwardLayer.name,this.mergeMode=t.mergeMode===void 0?BE:t.mergeMode,PE(this.mergeMode),t.weights)throw new wt("weights support is not implemented for Bidirectional layer yet.");this._stateful=t.layer.stateful,this.returnSequences=t.layer.returnSequences,this.returnState=t.layer.returnState,this.supportsMasking=!0,this._trainable=!0,this.inputSpec=t.layer.inputSpec,this.numConstants=null}get trainable(){return this._trainable}set trainable(t){this._trainable=t,this.forwardLayer!=null&&(this.forwardLayer.trainable=t),this.backwardLayer!=null&&(this.backwardLayer.trainable=t)}getWeights(){return this.forwardLayer.getWeights().concat(this.backwardLayer.getWeights())}setWeights(t){const e=t.length,s=Math.floor(e/2);this.forwardLayer.setWeights(t.slice(0,s)),this.backwardLayer.setWeights(t.slice(s))}computeOutputShape(t){let e=this.forwardLayer.computeOutputShape(t);Array.isArray(e)&&Array.isArray(e[0])||(e=[e]),e=e;let s,o,r;return this.returnState&&(r=e.slice(1)),s=e[0],s=s,this.mergeMode==="concat"?(s[s.length-1]*=2,o=[s]):this.mergeMode==null?o=[s,s.slice()]:o=[s],this.returnState?this.mergeMode==null?o.concat(r).concat(r.slice()):[s].concat(r).concat(r.slice()):Ye(o)}apply(t,e){let s=e==null?null:e.initialState,o=e==null?null:e.constants;e==null&&(e={});const r=ub(t,s,o,this.numConstants);if(t=r.inputs,s=r.initialState,o=r.constants,Array.isArray(t)&&(s=t.slice(1),t=t[0]),(s==null||s.length===0)&&o==null)return super.apply(t,e);const i=[],a=[];if(s!=null){const c=s.length;if(c%2>0)throw new _("When passing `initialState` to a Bidrectional RNN, the state should be an Array containing the states of the underlying RNNs.");e.initialState=s,i.push(...s);const u=s.map(h=>new pe({shape:h.shape}));this.forwardLayer.stateSpec=u.slice(0,c/2),this.backwardLayer.stateSpec=u.slice(c/2),a.push(...u)}if(o!=null)throw new wt("Support for constants in Bidirectional layers is not implemented yet.");const l=i[0]instanceof Qn;for(const c of i)if(c instanceof Qn!==l)throw new _("The initial state of a Bidirectional layer cannot be specified as a mix of symbolic and non-symbolic tensors");if(l){const c=[t].concat(i),u=this.inputSpec.concat(a),h=this.inputSpec;this.inputSpec=u;const d=super.apply(c,e);return this.inputSpec=h,d}else return super.apply(t,e)}call(t,e){return W(()=>{const s=e.initialState;let o,r;if(s==null)o=this.forwardLayer.call(t,e),r=this.backwardLayer.call(t,e);else{const l=s.slice(0,s.length/2),c=s.slice(s.length/2);o=this.forwardLayer.call(t,Object.assign(e,{initialState:l})),r=this.backwardLayer.call(t,Object.assign(e,{initialState:c}))}let i;this.returnState&&(Array.isArray(o)&&(i=o.slice(1).concat(r.slice(1))),o=o[0],r=r[0]),this.returnSequences&&(r=ao(r,1));let a;return this.mergeMode==="concat"?a=md([o,r]):this.mergeMode==="sum"?a=J(o,r):this.mergeMode==="ave"?a=L(.5,J(o,r)):this.mergeMode==="mul"?a=L(o,r):this.mergeMode==null&&(a=[o,r]),this.returnState?this.mergeMode==null?a.concat(i):[a].concat(i):a})}resetStates(t){this.forwardLayer.resetStates(),this.backwardLayer.resetStates()}build(t){mo(this.forwardLayer.name,()=>{this.forwardLayer.build(t)}),mo(this.backwardLayer.name,()=>{this.backwardLayer.build(t)}),this.built=!0}computeMask(t,e){Array.isArray(e)&&(e=e[0]);let s;if(this.returnSequences?this.mergeMode==null?s=[e,e]:s=e:this.mergeMode==null?s=[null,null]:s=null,this.returnState){const r=this.forwardLayer.states.map(i=>null);return Array.isArray(s)?s.concat(r).concat(r):[s].concat(r).concat(r)}else return s}get trainableWeights(){return this.forwardLayer.trainableWeights.concat(this.backwardLayer.trainableWeights)}get nonTrainableWeights(){return this.forwardLayer.nonTrainableWeights.concat(this.backwardLayer.nonTrainableWeights)}setFastWeightInitDuringBuild(t){super.setFastWeightInitDuringBuild(t),this.forwardLayer!=null&&this.forwardLayer.setFastWeightInitDuringBuild(t),this.backwardLayer!=null&&this.backwardLayer.setFastWeightInitDuringBuild(t)}getConfig(){const t={mergeMode:this.mergeMode},e=super.getConfig();return Object.assign(t,e),t}static fromConfig(t,e){const s=ms(e.layer);if(delete e.layer,e.numConstants!=null)throw new wt("Deserialization of a Bidirectional layer with numConstants present is not supported yet.");const o=e;return o.layer=s,new t(o)}}s0.className="Bidirectional",Z(s0);class o0 extends vt{constructor(t){super(t),this.scale=t.scale,t.offset?this.offset=t.offset:this.offset=0}getConfig(){const t={scale:this.scale,offset:this.offset},e=super.getConfig();return Object.assign(t,e),t}call(t,e){return W(()=>(t=bt(t),t.dtype!=="float32"&&(t=Yn(t,"float32")),J(L(t,this.scale),this.offset)))}}o0.className="Rescaling",Z(o0);const{resizeBilinear:zE,cropAndResize:VE}=hs;class r0 extends vt{constructor(t){super(t),this.height=t.height,this.width=t.width}centerCrop(t,e,s,o,r,i,a,l){return W(()=>{let c,u=!1;const h=e/i,d=s/a,p=(o+e)/i,f=(r+s)/a,m=[h,d,p,f],g=[];t.rank===3?(u=!0,c=us([t])):c=t;for(let $=0;$<c.shape[0];$++)g.push(m);const x=gl(g,[g.length,4]),b=Ii(0,g.length,1,"int32"),y=VE(c,x,b,[o,r],"nearest");return Yn(u?bt(co(y)):y,l)})}upsize(t,e,s,o){return W(()=>{const r=zE(t,[e,s]);return Yn(r,o)})}call(t,e){return W(()=>{const s=bt(t),o=s.dtype,r=s.shape,i=r[r.length-3],a=r[r.length-2];let l=0;i!==this.height&&(l=Math.floor((i-this.height)/2));let c=0;return a!==this.width&&(c=Math.floor((a-this.width)/2),c===0&&(c=1)),l>=0&&c>=0?this.centerCrop(s,l,c,this.height,this.width,i,a,o):this.upsize(t,this.height,this.width,o)})}getConfig(){const t={height:this.height,width:this.width},e=super.getConfig();return Object.assign(t,e),t}computeOutputShape(t){t=At(t);const e=t.length-3,s=t.length-2;return t[e]=this.height,t[s]=this.width,t}}r0.className="CenterCrop",Z(r0);function WE(n,t,e,s){let o=bt(n);if(o.dtype!=="int32"&&(o=Yn(o,"int32")),t==="int")return o;const r=o.shape;if(o.rank===0&&(o=je(o,-1)),t==="oneHot"&&o.shape[o.shape.length-1]!==1&&(o=je(o,-1)),o.rank>2)throw new _(`When outputMode is not int, maximum output rank is 2 Received outputMode ${t} and input shape ${r} which would result in output rank ${o.rank}.`);const i=["multiHot","oneHot"].includes(t),a=o;let l;if(typeof s!="undefined"&&t==="count"?l=Qf(a,s,e,i):l=Qf(a,[],e,i),t!=="tfIdf")return l;if(s)return L(l,s);throw new _("When outputMode is 'tfIdf', weights must be provided.")}class i0 extends vt{constructor(t){super(t),this.numTokens=t.numTokens,t.outputMode?this.outputMode=t.outputMode:this.outputMode="multiHot"}getConfig(){const t={numTokens:this.numTokens,outputMode:this.outputMode},e=super.getConfig();return Object.assign(t,e),t}computeOutputShape(t){return t=At(t),t==null?[this.numTokens]:this.outputMode==="oneHot"&&t[t.length-1]!==1?(t.push(this.numTokens),t):(t[t.length-1]=this.numTokens,t)}call(t,e){return W(()=>{t=bt(t),t.dtype!=="int32"&&(t=Yn(t,"int32"));let s;if(typeof e.countWeights!="undefined"){if(this.outputMode!=="count")throw new _(`countWeights is not used when outputMode !== count.
              Received countWeights=${e.countWeights}`);s=bt(e.countWeights)}const o=Rn(t),r=$l(t),i=ln(this.numTokens,o).bufferSync().get(0),a=ro(r,0).bufferSync().get(0);if(!(i&&a))throw new _(`Input values must be between 0 < values <= numTokens with numTokens=${this.numTokens}`);return WE(t,this.outputMode,this.numTokens,s)})}}i0.className="CategoryEncoding",Z(i0);const UE=["bilinear","nearest"],a0=new Set(UE);class l0 extends vt{constructor(t){if(super(t),this.height=t.height,this.width=t.width,t.interpolation)if(a0.has(t.interpolation))this.interpolation=t.interpolation;else throw new _(`Invalid interpolation parameter: ${t.interpolation} is not implemented`);else this.interpolation="bilinear";this.cropToAspectRatio=!!t.cropToAspectRatio}computeOutputShape(t){t=At(t);const e=t[2];return[this.height,this.width,e]}getConfig(){const t={height:this.height,width:this.width,interpolation:this.interpolation,cropToAspectRatio:this.cropToAspectRatio},e=super.getConfig();return Object.assign(t,e),t}call(t,e){return W(()=>{const s=[this.height,this.width];if(this.interpolation==="bilinear")return hs.resizeBilinear(t,s,!this.cropToAspectRatio);if(this.interpolation==="nearest")return hs.resizeNearestNeighbor(t,s,!this.cropToAspectRatio);throw new Error(`Interpolation is ${this.interpolation} but only ${[...a0]} are supported`)})}}l0.className="Resizing",Z(l0);class c0{constructor(t){this.seed=t}next(){if(this.seed!==void 0)return this.seed++}}c0.className="RandomSeed";class u0 extends vt{constructor(t){super(t),this.randomGenerator=new c0(t.seed)}getConfig(){const t={seed:this.randomGenerator.seed},e=super.getConfig();return Object.assign(t,e),t}}u0.className="BaseRandomLayer";const GE=["bilinear","nearest"],h0=new Set(GE);class d0 extends u0{constructor(t){super(t);const{factor:e,interpolation:s="bilinear"}=t;if(this.factor=e,Array.isArray(this.factor)&&this.factor.length===2)this.widthLower=this.factor[0],this.widthUpper=this.factor[1];else if(!Array.isArray(this.factor)&&this.factor>0)this.widthLower=-this.factor,this.widthUpper=this.factor;else throw new _(`Invalid factor: ${this.factor}. Must be positive number or tuple of 2 numbers`);if(this.widthLower<-1||this.widthUpper<-1)throw new _(`factor must have values larger than -1. Got: ${this.factor}`);if(this.widthUpper<this.widthLower)throw new _(`factor cannot have upper bound less than lower bound.
        Got upper bound: ${this.widthUpper}.
        Got lower bound: ${this.widthLower}
      `);if(s)if(h0.has(s))this.interpolation=s;else throw new _(`Invalid interpolation parameter: ${s} is not implemented`)}getConfig(){const t={factor:this.factor,interpolation:this.interpolation},e=super.getConfig();return Object.assign(t,e),t}computeOutputShape(t){t=At(t);const e=t[2];return[this.imgHeight,-1,e]}call(t,e){return W(()=>{const s=bt(t);this.imgHeight=s.shape[s.shape.length-3];const o=s.shape[s.shape.length-2];this.widthFactor=$i([1],1+this.widthLower,1+this.widthUpper,"float32",this.randomGenerator.next());let r=this.widthFactor.dataSync()[0]*o;r=Math.round(r);const i=[this.imgHeight,r];switch(this.interpolation){case"bilinear":return hs.resizeBilinear(t,i);case"nearest":return hs.resizeNearestNeighbor(t,i);default:throw new Error(`Interpolation is ${this.interpolation}
          but only ${[...h0]} are supported`)}})}}d0.className="RandomWidth",Z(d0);U().registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,n=>{n&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});var p0;(function(n){n[n.DT_INVALID=0]="DT_INVALID",n[n.DT_FLOAT=1]="DT_FLOAT",n[n.DT_DOUBLE=2]="DT_DOUBLE",n[n.DT_INT32=3]="DT_INT32",n[n.DT_UINT8=4]="DT_UINT8",n[n.DT_INT16=5]="DT_INT16",n[n.DT_INT8=6]="DT_INT8",n[n.DT_STRING=7]="DT_STRING",n[n.DT_COMPLEX64=8]="DT_COMPLEX64",n[n.DT_INT64=9]="DT_INT64",n[n.DT_BOOL=10]="DT_BOOL",n[n.DT_QINT8=11]="DT_QINT8",n[n.DT_QUINT8=12]="DT_QUINT8",n[n.DT_QINT32=13]="DT_QINT32",n[n.DT_BFLOAT16=14]="DT_BFLOAT16",n[n.DT_QINT16=15]="DT_QINT16",n[n.DT_QUINT16=16]="DT_QUINT16",n[n.DT_UINT16=17]="DT_UINT16",n[n.DT_COMPLEX128=18]="DT_COMPLEX128",n[n.DT_HALF=19]="DT_HALF",n[n.DT_RESOURCE=20]="DT_RESOURCE",n[n.DT_VARIANT=21]="DT_VARIANT",n[n.DT_UINT32=22]="DT_UINT32",n[n.DT_UINT64=23]="DT_UINT64",n[n.DT_FLOAT_REF=101]="DT_FLOAT_REF",n[n.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",n[n.DT_INT32_REF=103]="DT_INT32_REF",n[n.DT_UINT8_REF=104]="DT_UINT8_REF",n[n.DT_INT16_REF=105]="DT_INT16_REF",n[n.DT_INT8_REF=106]="DT_INT8_REF",n[n.DT_STRING_REF=107]="DT_STRING_REF",n[n.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",n[n.DT_INT64_REF=109]="DT_INT64_REF",n[n.DT_BOOL_REF=110]="DT_BOOL_REF",n[n.DT_QINT8_REF=111]="DT_QINT8_REF",n[n.DT_QUINT8_REF=112]="DT_QUINT8_REF",n[n.DT_QINT32_REF=113]="DT_QINT32_REF",n[n.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",n[n.DT_QINT16_REF=115]="DT_QINT16_REF",n[n.DT_QUINT16_REF=116]="DT_QUINT16_REF",n[n.DT_UINT16_REF=117]="DT_UINT16_REF",n[n.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",n[n.DT_HALF_REF=119]="DT_HALF_REF",n[n.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",n[n.DT_VARIANT_REF=121]="DT_VARIANT_REF",n[n.DT_UINT32_REF=122]="DT_UINT32_REF",n[n.DT_UINT64_REF=123]="DT_UINT64_REF"})(p0||(p0={}));var f0;(function(n){(function(t){t[t.LEGACY=0]="LEGACY",t[t.V1=1]="V1",t[t.V2=2]="V2"})(n.CheckpointFormatVersion||(n.CheckpointFormatVersion={}))})(f0||(f0={}));var m0;(function(n){n[n.FAIL=0]="FAIL",n[n.SHORTEST=1]="SHORTEST",n[n.LONGEST=2]="LONGEST"})(m0||(m0={}));function ct(n,t){Array.isArray(n)||(n=[n]),n.forEach(e=>{e!=null&&k(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the CPU backend.`)})}const HE=Tm;class lc extends Ro{nextDataId(){return lc.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new ra(this,rn())}write(t,e,s){this.firstUse&&(this.firstUse=!1,U().get("IS_NODE")&&on(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));const o={id:this.nextDataId()};return this.data.set(o,{values:t,dtype:s,refCount:1}),o}makeTensorInfo(t,e,s){let o;if(e==="string"&&s!=null&&s.length>0&&mr(s[0])){const r=s.map(i=>ws(i));o=this.write(r,t,e)}else o=this.write(s,t,e);return{dataId:o,shape:t,dtype:e}}refCount(t){return this.data.has(t)?this.data.get(t).refCount:0}incRef(t){const e=this.data.get(t);e.refCount++}decRef(t){if(this.data.has(t)){const e=this.data.get(t);e.refCount--}}move(t,e,s,o,r){this.data.set(t,{values:e,dtype:o,refCount:r})}numDataIds(){return this.data.numDataIds()}read(t){return Q(this,null,function*(){return this.readSync(t)})}readSync(t){const{dtype:e,complexTensorInfos:s}=this.data.get(t);if(e==="complex64"){const o=this.readSync(s.real.dataId),r=this.readSync(s.imag.dataId);return ds(o,r)}return aw(this.data.get(t).values,e)}bufferSync(t){const e=this.readSync(t.dataId);if(t.dtype==="string")try{const s=e.map(o=>Cs(o));return It(t.shape,t.dtype,s)}catch(s){throw new Error("Failed to decode encoded string bytes into utf-8")}return It(t.shape,t.dtype,e)}makeOutput(t,e,s){return rn().makeTensorFromTensorInfo(this.makeTensorInfo(e,s,t),this)}disposeData(t,e=!1){if(this.data.has(t)){if(this.data.get(t).refCount--,!e&&this.data.get(t).refCount>0)return!1;const{complexTensorInfos:s}=this.data.get(t);s!=null&&(this.disposeData(s.real.dataId,!0),this.disposeData(s.imag.dataId,!0)),this.data.delete(t)}return!0}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}time(t){return Q(this,null,function*(){const e=He();return t(),{kernelMs:He()-e}})}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(t){ct([t],"where");const e=this.readSync(t.dataId);return HE(t.shape,e)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}}lc.nextDataId=0;function g0(n){const t=new Float32Array(n.length);for(let e=0;e<n.length;++e)t[e]=Math.abs(n[e]);return t}const qE={kernelName:aa,backendName:"cpu",kernelFunc:n=>{const{x:t}=n.inputs,e=n.backend;ct(t,"abs");let s=new Float32Array(X(t.shape));const o=e.data.get(t.dataId).values;return s=g0(o),e.makeOutput(s,t.shape,t.dtype)}};function ie(n){return(t,e,s,o,r)=>{const i=yt(t,e),a=i.length,l=dt(i),c=X(i),u=Re(r,c),h=t.length,d=e.length,p=dt(t),f=dt(e),m=Uo(t,i),g=Uo(e,i);if(m.length+g.length===0)for(let x=0;x<u.length;++x)u[x]=n(s[x%s.length],o[x%o.length]);else for(let x=0;x<u.length;++x){const b=_o(x,a,l),w=b.slice(-h);m.forEach(v=>w[v]=0);const y=Vn(w,h,p),$=b.slice(-d);g.forEach(v=>$[v]=0);const I=Vn($,d,f);u[x]=n(s[y],o[I])}return[u,i]}}function nn(n){const{inputs:t,backend:e}=n,{real:s,imag:o}=t,r=e.data.get(s.dataId).values,i=e.data.get(o.dataId).values,a=e.makeTensorInfo(s.shape,"complex64"),l=e.data.get(a.dataId);return l.complexTensorInfos={real:e.makeTensorInfo(s.shape,"float32",r),imag:e.makeTensorInfo(o.shape,"float32",i)},a}const XE={kernelName:iu,backendName:"cpu",kernelFunc:nn};function cc(n,t,e="float32"){if(e==="complex64"){const o=cc(n,t,"float32"),r=cc(n,t,"float32");return nn({inputs:{real:o,imag:r},backend:n})}const s=Ae(X(t),e);return n.makeTensorInfo(t,e,s)}function ts(n){const{inputs:t,backend:e}=n,{x:s}=t;return e.incRef(s.dataId),{dataId:s.dataId,shape:s.shape,dtype:s.dtype}}const KE={kernelName:Lr,backendName:"cpu",kernelFunc:ts};function yo(n){const{inputs:t,backend:e}=n,{input:s}=t,o=e.data.get(s.dataId).complexTensorInfos.real,r=e.data.get(o.dataId).values;return e.makeTensorInfo(o.shape,o.dtype,r)}const jE={kernelName:Du,backendName:"cpu",kernelFunc:yo};function x0(n,t,e,s){if(s==="int32"){const o=Int32Array.from(n);return[t,"int32",o]}if(s==="bool"){const o=js([0],e),[r,i]=ie((a,l)=>a!==l?1:0)(t,[],n,o,"bool");return[i,"bool",r]}throw new Error(`Error in Cast: failed to cast ${e} to ${s}`)}function Ms(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{dtype:r}=s;if(r==="complex64"){if(o.dtype==="complex64")return ts({inputs:{x:o},backend:e});const u=cc(e,o.shape,o.dtype),h=Ms({inputs:{x:o},backend:e,attrs:{dtype:"float32"}}),d=nn({inputs:{real:h,imag:u},backend:e});return e.disposeIntermediateTensorInfo(u),e.disposeIntermediateTensorInfo(h),d}if(o.dtype==="complex64"){const u=yo({inputs:{input:o},backend:e}),h=Ms({inputs:{x:u},backend:e,attrs:{dtype:r}});return e.disposeIntermediateTensorInfo(u),h}if(!Rp(o.dtype,r)){const u=ts({inputs:{x:o},backend:e});return{dataId:u.dataId,shape:u.shape,dtype:r}}const i=e.data.get(o.dataId).values,[a,l,c]=x0(i,o.shape,o.dtype,r);return e.makeTensorInfo(a,l,c)}const YE={kernelName:Ir,backendName:"cpu",kernelFunc:Ms};function ge(n,t,e,s){return e==null?({inputs:o,backend:r})=>{const{a:i,b:a}=o,l=r;ct([i,a],n);const c=l.data.get(i.dataId).values,u=l.data.get(a.dataId).values,h=i.dtype==="string"?ps(c):c,d=i.dtype==="string"?ps(u):u,p=s||i.dtype,[f,m]=t(i.shape,a.shape,h,d,p);return l.makeTensorInfo(m,p,f)}:({inputs:o,backend:r})=>{const{a:i,b:a}=o,l=r;if(i.dtype==="complex64"||a.dtype==="complex64"){const c=Ms({inputs:{x:i},backend:l,attrs:{dtype:"complex64"}}),u=l.data.get(c.dataId),h=u.complexTensorInfos.real,d=u.complexTensorInfos.imag,p=l.data.get(h.dataId).values,f=l.data.get(d.dataId).values,m=Ms({inputs:{x:a},backend:l,attrs:{dtype:"complex64"}}),g=l.data.get(m.dataId),x=g.complexTensorInfos.real,b=g.complexTensorInfos.imag,w=l.data.get(x.dataId).values,y=l.data.get(b.dataId).values,[$,I,v]=e(i.shape,a.shape,p,f,w,y),T=l.makeTensorInfo(v,"float32",$),S=l.makeTensorInfo(v,"float32",I),N=nn({inputs:{real:T,imag:S},backend:l});return l.disposeIntermediateTensorInfo(c),l.disposeIntermediateTensorInfo(m),l.disposeIntermediateTensorInfo(T),l.disposeIntermediateTensorInfo(S),N}else{const c=l.data.get(i.dataId).values,u=l.data.get(a.dataId).values,h=s||i.dtype,[d,p]=t(i.shape,a.shape,c,u,h);return l.makeTensorInfo(p,h,d)}}}function Xd(n){return(t,e,s,o,r,i)=>{const a=yt(t,e),l=X(a),c=a.length,u=dt(a),h=Re("float32",l),d=Re("float32",l),p=Uo(t,a),f=Uo(e,a),m=ds(s,o),g=ds(r,i),x=t.length,b=dt(t),w=e.length,y=dt(e);if(p.length+f.length===0)for(let $=0;$<h.length;$++){const I=$%m.length,v=$%g.length,T=n(m[I*2],m[I*2+1],g[v*2],g[v*2+1]);h[$]=T.real,d[$]=T.imag}else for(let $=0;$<h.length;$++){const I=_o($,c,u),v=I.slice(-x);p.forEach(E=>v[E]=0);const T=Vn(v,x,b),S=I.slice(-w);f.forEach(E=>S[E]=0);const N=Vn(S,w,y),C=n(m[T*2],m[T*2+1],g[N*2],g[N*2+1]);h[$]=C.real,d[$]=C.imag}return[h,d,a]}}const b0=ie(((n,t)=>n+t)),ZE=Xd(((n,t,e,s)=>({real:n+e,imag:t+s}))),tr=ge(Oo,b0,ZE),QE={kernelName:Oo,backendName:"cpu",kernelFunc:tr};function Kd(n,t,e,s,o){const r=X(s),i=Ae(o,e);for(let a=0;a<n.length;a++){const l=n[a];if(l<0)throw new Error("Input x must be non-negative!");l>=o||(r>0?i[l]+=t[a]:i[l]+=1)}return i}function y0(n,t,e,s=!1){const o=n.shape[0],r=n.shape[1],i=It([o,e],t.dtype);for(let a=0;a<o;a++)for(let l=0;l<r;l++){const c=n.get(a,l);if(c<0)throw new Error("Input x must be non-negative!");c>=e||(s?i.set(1,a,c):t.size>0?i.set(i.get(a,c)+t.get(a,l),a,c):i.set(i.get(a,c)+1,a,c))}return i}const w0=ie(((n,t)=>n&t)),JE=ge(ru,w0),tR={kernelName:ru,backendName:"cpu",kernelFunc:JE};function es(n){return(t,e,s)=>{const o=ee(e,t.length);for(let r=0;r<t.length;++r)o[r]=n(t[r],s);return o}}function Wt(n,t,e){const s=es(t);return Ps(n,s,e)}function Ps(n,t,e){return({inputs:s,attrs:o,backend:r})=>{const{x:i}=s;ct(i,n);const a=r,l=a.data.get(i.dataId).values;let c;if(i.dtype==="string"){if(!Array.isArray(l))throw new Error("String tensor's value was not an instance of Array");c=ps(l)}else c=l;const u=e||i.dtype,h=t(c,u,o);return a.makeTensorInfo(i.shape,u,h)}}const C0=es(n=>Math.ceil(n)),eR=Ps(vr,C0),nR={kernelName:vr,backendName:"cpu",kernelFunc:eR};function $0(n,t,e,s){const o=ee(e,X(t));if(s&&e!=="string"){let r=0;n.forEach(i=>{const a=X(i.shape);o.set(i.vals,r),r+=a})}else{let r=0;n.forEach(i=>{const a=e==="string"?ps(i.vals):i.vals;let l=0;for(let c=0;c<i.shape[0];++c){const u=c*t[1]+r;for(let h=0;h<i.shape[1];++h)o[u+h]=a[l++]}r+=i.shape[1]})}return o}const I0=ie((n,t)=>n===t?1:0),v0=ge($a,I0,null,"bool"),sR={kernelName:$a,backendName:"cpu",kernelFunc:v0};const k0=es(n=>Math.exp(n)),S0=Ps(Ar,k0,"float32"),oR={kernelName:Ar,backendName:"cpu",kernelFunc:S0};const N0=es(n=>Math.expm1(n)),rR=Ps(Dr,N0),iR={kernelName:Dr,backendName:"cpu",kernelFunc:rR};const T0=es(n=>Math.floor(n)),aR=Ps(Fr,T0),lR={kernelName:Fr,backendName:"cpu",kernelFunc:aR};const E0=ie((n,t)=>Math.floor(n/t)),cR=ge(_r,E0,null,"int32"),uR={kernelName:_r,backendName:"cpu",kernelFunc:cR};function R0(n,t,e,s,o,r,i,a,l){const c=It([s,r],e);for(let u=0;u<s;u++){const h=[];let d=0;for(let p=0;p<o;p++){const f=n[u*o+p];d+=f*i[p],h.push(f)}if(d<0||d>=l/r)throw new Error(`Invalid indices: ${h} does not index into ${a}`);for(let p=0;p<r;p++)c.values[u*r+p]=t.get(...t.indexToLoc(d*r+p))}return c}function A0(n,t,e){const s=It(e,n.dtype);for(let o=0;o<s.size;++o){const i=s.indexToLoc(o).slice(),a=i[0],l=i[2],c=t.locToIndex([a,l]);i[2]=t.values[c];const u=n.locToIndex(i);0<=u&&u<n.values.length&&(s.values[o]=n.values[u])}return s}const D0=ie((n,t)=>n>t?1:0),hR=ge(Sa,D0,null,"bool"),dR={kernelName:Sa,backendName:"cpu",kernelFunc:hR};const F0=ie((n,t)=>n>=t?1:0),pR=ge(Or,F0,null,"bool"),fR={kernelName:Or,backendName:"cpu",kernelFunc:pR};const _0=ie((n,t)=>n<t?1:0),mR=ge(Ta,_0,null,"bool"),gR={kernelName:Ta,backendName:"cpu",kernelFunc:mR};const O0=ie((n,t)=>n<=t?1:0),xR=ge(Ea,O0,null,"bool"),bR={kernelName:Ea,backendName:"cpu",kernelFunc:xR};function L0(n,t,e){const s=(t-n)/(e-1),o=Ae(e,"float32");o[0]=n;for(let r=1;r<o.length;r++)o[r]=o[r-1]+s;return o}const M0=es(n=>Math.log(n)),yR=Ps(zr,M0),wR={kernelName:zr,backendName:"cpu",kernelFunc:yR};function P0(n,t,e,s){const o=Re(s,X(e));for(let r=0;r<o.length;++r){const i=r*t;let a=n[i];for(let l=0;l<t;++l){const c=n[i+l];(Number.isNaN(c)||c>a)&&(a=c)}o[r]=a}return o}const B0=ie(((n,t)=>Math.max(n,t))),CR=ge(Wr,B0),$R={kernelName:Wr,backendName:"cpu",kernelFunc:CR};const z0=ie(((n,t)=>Math.min(n,t))),IR=ge(Ur,z0),vR={kernelName:Ur,backendName:"cpu",kernelFunc:IR};const jd=ie(((n,t)=>n*t)),kR=Xd(((n,t,e,s)=>({real:n*e-t*s,imag:n*s+t*e}))),uc=ge(Hr,jd,kR),SR={kernelName:Hr,backendName:"cpu",kernelFunc:uc};function V0(n,t,e){const s=ys(-1,e);return jd([],t,s,n,e)}function NR(n){const{inputs:t,backend:e}=n,{x:s}=t;ct(s,"neg");const o=e.data.get(s.dataId).values,[r,i]=V0(o,s.shape,s.dtype);return e.makeTensorInfo(i,s.dtype,r)}const TR={kernelName:za,backendName:"cpu",kernelFunc:NR};const W0=ie(((n,t)=>n!==t?1:0)),ER=ge(Va,W0,null,"bool"),RR={kernelName:Va,backendName:"cpu",kernelFunc:ER};function Yd(n,t,e,s,o){const r=t.length,i=X(t),a=dt(t),l=dt(o),c=Re(e,X(o));for(let u=0;u<i;++u){const h=_o(u,r,a),d=new Array(h.length);for(let f=0;f<d.length;f++)d[f]=h[s[f]];const p=Vn(d,r,l);c[p]=n[u]}return c}function Ze(n){const{inputs:t,attrs:e,backend:s}=n,{x:o}=t,{perm:r}=e;ct(o,"transpose");const i=o.shape.length,a=new Array(i);for(let h=0;h<a.length;h++)a[h]=o.shape[r[h]];const l=s.data.get(o.dataId).values,c=Yd(l,o.shape,o.dtype,r,a);return{dataId:s.write(c,a,o.dtype),shape:a,dtype:o.dtype}}const AR={kernelName:Lo,backendName:"cpu",kernelFunc:Ze};function U0(n,t,e,s){const[o,r]=Ce(n,s),i=Je(t,"int32"),a=Ae(X(o),i),l=X(r);for(let c=0;c<a.length;++c){const u=c*l;let h=1;for(let d=0;d<l;++d)h*=e[u+d];a[c]=h}return{outVals:a,outShape:o,outDtype:i}}function DR(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s;ct(o,"prod");const a=o.shape.length,l=$t(r,o.shape),c=Qt(l,a);let u=l,h=o;const d=[];c!=null&&(h=Ze({inputs:{x:o},backend:e,attrs:{perm:c}}),d.push(h),u=se(u.length,a));const p=e.data.get(h.dataId).values,{outVals:f,outShape:m,outDtype:g}=U0(h.shape,h.dtype,p,u);let x=m;return i&&(x=le(m,l)),d.forEach(b=>e.disposeIntermediateTensorInfo(b)),e.makeTensorInfo(x,g,f)}const FR={kernelName:Xa,backendName:"cpu",kernelFunc:DR};function _R(n,t,e){n.forEach((s,o)=>{if(s<0||s>=e){const r=_o(o,t.length,dt(t)).join(",");throw new Error(`indices[${r}] = ${s} is not in [0, ${e})`)}})}function OR(n,t){for(let e=0;e<n.length;++e){const s=n[e],o=e===n.length-1?t:n[e+1].length;if(s.length===0)throw new Error("Ragged splits may not be empty");if(s[0]<0)throw new Error("Ragged splits must be non-negative");if(s[s.length-1]>o)throw new Error("Ragged splits must not point past values");for(let r=1;r<s.length;++r)if(s[r-1]>s[r])throw new Error("Ragged splits must be sorted in ascending order")}}function LR(n,t,e,s){const o=[];let r=0;const i=t.length-1+e.length,a=new Array(i).fill(null).map(()=>[0]);OR(e,s);let l=1;for(let c=0;c<t.length-1;++c){l*=t[c];const u=t[c+1];for(let h=1;h<l+1;++h)a[c].push(h*u)}for(let c=0;c<n.length;++c){let u=n[c],h=n[c]+1;for(let d=0;d<e.length;++d){const p=e[d],f=d+t.length-1;if(f>=0){const m=a[f],g=m[m.length-1]-p[u];for(let x=u;x<h;++x)a[f].push(p[x+1]+g)}u=p[u],h=p[h]}h!==u&&(o.push([u,h]),r+=h-u)}return{outSplits:a,valueSlices:o,numValues:r}}function MR(n){const t=[];for(let e=0;e<n.length;++e){const s=n[e].length,o=ee("int32",s);t.push(o),n[e].forEach((r,i)=>o[i]=r)}return t}function G0(n,t){const e=n.slice(0,t);for(;e.length<t;)e.push(1);for(let s=t;s<n.length;s++)e[t-1]*=n[s];return e}function PR(n,t,e,s,o,r){const i=G0(t,2)[1],a=G0(r,2)[1];let l=0;for(const c of e)for(let u=c[0];u<c[1];++u){for(let h=0;h<s;++h)o[l*a+h]=n[u*i+h];++l}}function BR(n,t,e,s,o){const r=t.slice();r[0]=o;const i=ee(e,X(r)),a=n.length,l=a===0?0:a/t[0];return PR(n,t,s,l,i,r),[i,r]}function H0(n,t,e,s,o,r,i,a){if(n.length===0)throw new Error("paramsNestedSplits must be non empty");if(t[0].length===0)throw new Error("Split tensors must not be scalars");const l=t[0][0]-1;if(_R(r,i,l),s.length===0)throw new Error("params.rank must be nonzero");const c=s[0],{outSplits:u,valueSlices:h,numValues:d}=LR(r,i,n,c),p=MR(u),f=BR(e,s,o,h,d);return[p,f[0],f[1]]}const q0=2147483647;function X0(n,t,e,s,o,r,i){if(t.length>1)throw new Error("starts must be a scalar or vector");if(o.length>1)throw new Error("limits must be a scalar or vector");if(i.length>1)throw new Error("deltas must be a scalar or vector");const a=t.length===0,l=o.length===0,c=i.length===0,u=[];a||u.push(t[0]),l||u.push(o[0]),c||u.push(i[0]);for(let g=1;g<u.length;++g)if(u[g]!==u[g-1])throw new Error("starts, limits, and deltas must have the same shape");const h=u.length===0?1:u[0],d=ee("int32",h+1);d[0]=0;for(let g=0;g<h;++g){const x=a?n[0]:n[g],b=l?s[0]:s[g],w=c?r[0]:r[g];if(w===0)throw new Error("Requires delta != 0");let y;if(w>0&&b<x||w<0&&b>x)y=0;else if(y=Math.ceil(Math.abs((b-x)/w)),y>q0)throw new Error(`Requires ((limit - start) / delta) <= ${q0}`);d[g+1]=d[g]+y}const p=d[h],f=ee(e,p);let m=0;for(let g=0;g<h;++g){const x=d[g+1]-d[g];let b=a?n[0]:n[g];const w=c?r[0]:r[g];for(let y=0;y<x;++y)f[m++]=b,b+=w}return[d,f]}var wn=Dn;class hc{constructor(t,e,s,o,r,i,a,l,c,u){this.shape=t,this.shapeShape=e,this.values=s,this.valuesShape=o,this.valuesDType=r,this.defaultValue=i,this.defaultValueShape=a,this.rowPartitionValues=l,this.rowPartitionValuesShapes=c,this.rowPartitionTypes=Qm(u),this.raggedRank=Jm(this.rowPartitionTypes)}getRowPartitionTypeByDimension(t){return this.rowPartitionTypes[0]===wn.FIRST_DIM_SIZE?this.rowPartitionTypes[t+1]:this.rowPartitionTypes[t]}getRowPartitionTensor(t){return this.rowPartitionTypes[0]===wn.FIRST_DIM_SIZE?this.rowPartitionValues[t+1]:this.rowPartitionValues[t]}getMaxWidth(t){const e=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case wn.VALUE_ROWIDS:return hc.getMaxWidthValueRowID(e);case wn.ROW_SPLITS:return hc.getMaxWidthRowSplit(e);default:throw new Error(`Cannot handle partition type ${wn[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(t){const e=t.length;if(e===0||e===1)return 0;let s=0;for(let o=0;o<e-1;++o){const r=t[o+1]-t[o];r>s&&(s=r)}return s}static getMaxWidthValueRowID(t){const e=t.length;if(e===0)return 0;let s=0,o=t[0],r=0;for(let i=1;i<e;++i){const a=t[i];a!==o&&(o=a,r=Math.max(i-s,r),s=i)}return Math.max(e-s,r)}tensorShapeFromTensor(t,e,s=!0){if(e.length===0){if(t[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return j0(t,s)}calculateOutputSize(t){const e=this.valuesShape,s=this.defaultValueShape;tg(s,e);const o=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=Zm(this.raggedRank,o,e);i[0]<0&&(i[0]=t);for(let a=1;a<=this.raggedRank;++a)i[a]<0&&(i[a]=this.getMaxWidth(a));return i}calculateFirstParentOutputIndex(t,e,s){const o=Math.min(t,s),r=[];let i=0;for(let a=0;a<o;++a,i+=e)r.push(i);for(let a=o;a<t;++a)r.push(-1);return k(r.length===t,()=>"Final length of result must be equal to firstDimension."),r}calculateOutputIndexRowSplit(t,e,s,o){const r=t.length,i=[];for(let a=0;a<r-1;++a){const l=t[a+1]-t[a];let c=Math.min(o,l),u=e[a];u===-1&&(c=0);for(let h=0;h<c;++h)i.push(u),u+=s;for(let h=0;h<l-c;++h)i.push(-1)}if(r>0&&i.length!==t[r-1])throw new Error("Invalid row split size.");return i}calculateOutputIndexValueRowID(t,e,s,o){const r=t.length,i=[];if(r===0)return[];let a=0,l=t[0];if(l>=e.length)throw new Error(`Got currentValueRowId=${l}, which is not less than ${e.length}`);let c=e[l];i.push(c);for(let u=1;u<r;++u){const h=t[u];if(h===l)c>=0&&(++a,a<o?c+=s:c=-1);else{if(a=0,l=h,h>=e.length)throw new Error(`Got nextValueRowId=${h} which is not less than ${e.length}`);c=e[h]}i.push(c)}if(i.length!==t.length)throw new Error("Invalid row ids.");return i}calculateOutputIndex(t,e,s,o){const r=this.getRowPartitionTensor(t),i=this.getRowPartitionTypeByDimension(t);switch(i){case wn.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(r,e,s,o);case wn.ROW_SPLITS:if(r.length-1>e.length)throw new Error(`Row partition size is greater than output size: ${r.length-1} > ${e.length}`);return this.calculateOutputIndexRowSplit(r,e,s,o);default:throw new Error(`Unsupported partition type: ${wn[i]}`)}}getFirstDimensionSize(){const t=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");const e=this.rowPartitionTypes[0];switch(e){case wn.FIRST_DIM_SIZE:return t[0];case wn.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case wn.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${wn[e]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");const e=this.getFirstDimensionSize(),s=this.calculateOutputSize(e),o=new Array(this.raggedRank+1);o[o.length-1]=1;for(let l=o.length-2;l>=0;--l)o[l]=o[l+1]*s[l+1];const r=j0(s,!1),i=ee(this.valuesDType,X(r));if(o[0]*s[0]>0){let l=this.calculateFirstParentOutputIndex(e,o[0],s[0]);for(let c=1;c<=this.raggedRank;++c)l=this.calculateOutputIndex(c-1,l,o[c],s[c]);this.setOutput(this.raggedRank,l,i,r)}return[r,i]}setOutput(t,e,s,o){if(s.length===0)return;const r=this.values,i=s;let a=o.slice();a=a.slice(t+1);const l=X(a),c=e.length;let u=this.defaultValue;if(u.length!==l&&u.length!==1){const f=this.defaultValueShape;W(()=>{const m=z(u,f);u=bi(m,a).dataSync()})}let h=0,d=0,p=0;for(let f=0;f<=c;++f){let m=f<c?e[f]:-1;if(m===p){++p;continue}if(d<p){const g=r.subarray(h*l),x=i.subarray(d*l),b=(p-d)*l;K0(x,g,b)}if(f>=c){const g=s.length;m=Math.floor(g/l)}if(m>p)if(this.defaultValue.length===1)i.subarray(p*l,m*l).fill(this.defaultValue[0]),p=m;else for(;m>p;){const g=i.slice(p*l);K0(g,u,l),++p}m<0?(h=f+1,d=p):(h=f,d=p,p=d+1)}}}function K0(n,t,e){for(let s=0;s<e;s++)n[s]=t[s]}function j0(n,t){const e=[];for(let s of n){if(s<0){if(!t)throw new Error(`Dimension ${s} must be >= 0`);if(s<-1)throw new Error(`Dimension ${s} must be >= -1`);s=-1}e.push(s)}return e}function Y0(n,t,e,s,o,r,i,a,l,c){return new hc(n,t,e,s,o,r,i,a,l,c).compute()}function Z0(n,t,e,s){const o=n===t,r=n<t&&e<0,i=t<n&&e>1;if(o||r||i)return Ae(0,s);const a=Math.abs(Math.ceil((t-n)/e)),l=Ae(a,s);t<n&&e===1&&(e=-1),l[0]=n;for(let c=1;c<l.length;c++)l[c]=l[c-1]+e;return l}const Q0=es(n=>1/Math.sqrt(n)),zR=Ps(Zr,Q0),VR={kernelName:Zr,backendName:"cpu",kernelFunc:zR};function wo(n,t,e,s,o,r,i,a,l,c){const u=[s/o,o],h=n.values,d=t.values;if(s===0)return It(e,t.dtype);const p=l instanceof ve?l:It(u,t.dtype);typeof l=="string"||typeof l=="number"?p.values.fill(l):typeof l=="boolean"&&p.values.fill(+l);for(let f=0;f<r;f++){const m=[];let g=0;for(let x=0;x<i;x++){const b=h[f*i+x];m.push(b),g+=b*a[x]}if(g<0||g>=s/o)throw new Error(`Invalid indices: ${m} does not index into ${e}`);for(let x=0;x<o;x++)c?p.values[g*o+x]+=d[f*o+x]:p.values[g*o+x]=t.rank===0?d[0]:d[f*o+x]}return p}const WR=es(n=>1/(1+Math.exp(-n))),J0=Wt(ni,n=>1/(1+Math.exp(-n))),UR={kernelName:ni,backendName:"cpu",kernelFunc:J0};function t1(n,t,e,s,o){const r=qm(s,t,e),i=X(e),a=dt(s);if(r){const h=Xm(t,a);return o==="string"?n.slice(h,h+i):n.subarray(h,h+i)}const l=o==="string"?ps(n):n,c=It(s,o,l),u=It(e,o);for(let h=0;h<u.size;++h){const d=u.indexToLoc(h),p=d.map((f,m)=>f+t[m]);u.set(c.get(...p),...d)}return o==="string"?Cg(u.values):u.values}function Co(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{begin:r,size:i}=s;ct(o,"slice");const[a,l]=Wh(o,r,i);Gm(o,a,l);const c=e.data.get(o.dataId).values,u=t1(c,a,l,o.shape,o.dtype);return e.makeTensorInfo(l,o.dtype,u)}const GR={kernelName:Ja,backendName:"cpu",kernelFunc:Co};function e1(n,t,e,s,o,r,i){const a=t[0],l=r[0],c=new Array(l),u=new Array(a),h=t[1];if(l===0){if(a!==0)throw new Error(cg(a));const g=ee(e,0),x=ee(o,0);return[g,[0,h],x,c,u]}let d=!0,p=0;const f=new Array(l).fill(0);for(let g=0;g<a;++g){const x=n[g*h];if(x<0)throw new Error(ug(g,x));if(x>=l)throw new Error(hg(g,x,l));++f[x],d=d&&x>=p,p=x}let m=!0;for(let g=0;g<l;++g){const x=f[g]===0;c[g]=x,m=m&&!x,f[g]=Math.max(f[g],1),g>0&&(f[g]+=f[g-1])}if(m&&d){const g=n,x=s;for(let b=0;b<a;++b)u[b]=b;return[g,[a,h],x,c,u]}else{const g=f[l-1],x=ee(e,g*h),b=ee(o,g),w=new Array(l).fill(0);for(let y=0;y<a;++y){const $=n[y*h],I=w[$],v=($===0?0:f[$-1])+I;w[$]++;for(let T=0;T<h;++T)x[v*h+T]=n[y*h+T];b[v]=s[y],u[y]=v}for(let y=0;y<l;++y)if(w[y]===0){const I=y===0?0:f[y-1];x[I*h+0]=y;for(let v=1;v<h;++v)x[I*h+v]=0;b[I]=i}return[x,[g,h],b,c,u]}}function n1(n,t,e,s,o){const r=X(s),i=t[0],a=o.length,l=[];let c=1,u=-1;for(let g=0;g<a;++g){const x=o[g];if(x===-1){if(u!==-1)throw new Error(dg(u,g));u=g,l.push(1)}else{if(x<0)throw new Error(pg(g,x));c*=x,l.push(x)}}if(u!==-1){if(c<=0)throw new Error(fg());const g=Math.trunc(r/c);if(c*g!==r)throw new Error(mg(s,l));l[u]=g}if(X(l)!==r)throw new Error(gg(s,l));const d=s.length,p=[];if(d>0){p[d-1]=1;for(let g=d-2;g>=0;--g)p[g]=p[g+1]*s[g+1]}const f=[];if(a>0){f[a-1]=1;for(let g=a-2;g>=0;--g)f[g]=f[g+1]*l[g+1]}const m=ee(e,i*a);for(let g=0;g<i;++g){let x=0;for(let b=0;b<d;++b)x+=n[g*d+b]*p[b];for(let b=0;b<a;++b)m[g*a+b]=Math.trunc(x/f[b]),x%=f[b]}return[m,[i,a],l]}function Zd(n,t,e,s,o,r=!1,i=0){const a=s.length,l=[t[0],n.length/t[0]],c=l[1],h=a>0?o[a-1]+1:0;if(h<0)throw new Error(ld());const d=t.slice();d[0]=h;const p=d.reduce((w,y)=>w*y,1),f=ee(e,p);if(a===0)return h>0&&f.fill(i),[f,d];if(h<=0)throw new Error(ld());let m=0,g=1,x=0,b=o[m];for(;;){let w=0;if(g<a){if(w=o[g],b===w){++g;continue}if(b>=w)throw new Error(xg())}if(b<0||b>=h)throw new Error(bg(b,h));b>x&&f.fill(i,x*c,b*c);for(let y=m;y<g;++y){const $=s[y];if($<0||$>=l[0])throw new Error(yg(y,s[y],l[0]));for(let I=0;I<c;I++)f[b*c+I]+=n[$*c+I]}if(r)for(let y=0;y<c;y++)f[b*c+y]/=g-m;if(m=g,++g,x=b+1,b=w,g>a)break}return x<h&&f.fill(i,x*c,h*c),[f,d]}const HR=es(n=>Math.sqrt(n)),qR=Wt(oi,n=>Math.sqrt(n)),XR={kernelName:oi,backendName:"cpu",kernelFunc:qR};const s1=ie(((n,t)=>{const e=n-t;return e*e})),KR=ge(ri,s1),jR={kernelName:ri,backendName:"cpu",kernelFunc:KR};const o1=es((n,t)=>{const{pattern:e,replaceGlobal:s,rewrite:o}=t;return n.replace(new RegExp(e,s?"g":""),o)}),YR=Ps(Lu,o1),ZR={kernelName:Lu,backendName:"cpu",kernelFunc:YR};function r1(n,t,e,s){const o=It(n,t.dtype);for(let r=0;r<o.size;r++){const i=o.indexToLoc(r),a=new Array(i.length);for(let l=0;l<a.length;l++)a[l]=i[l]*e[l]+s[l];o.set(t.get(...a),...i)}return o}class QR{constructor(t,e,s,o,r,i){this.separator=ws(t),this.nGramWidths=e,this.leftPad=ws(s),this.rightPad=ws(o),this.padWidth=r,this.preserveShort=i}getPadWidth(t){return Math.min(this.padWidth<0?t-1:this.padWidth,t-1)}getNumNGrams(t,e){const s=this.getPadWidth(e);return Math.max(0,t+2*s-e+1)}createNGrams(t,e,s,o,r,i){for(let a=0;a<r;++a){const l=this.getPadWidth(i),c=Math.max(0,l-a),u=Math.max(0,l-(r-(a+1))),h=i-(c+u),d=e+(c>0?0:a-l);let p=0;p+=c*this.leftPad.length;for(let b=0;b<h;++b)p+=t[d+b].length;p+=u*this.rightPad.length;const f=c+u+h-1;p+=f*this.separator.length,s[o+a]=new Uint8Array(p);const m=s[o+a];let g=0;const x=b=>b.forEach(w=>m[g++]=w);for(let b=0;b<c;++b)x(this.leftPad),x(this.separator);for(let b=0;b<h-1;++b)x(t[d+b]),x(this.separator);if(h>0){x(t[d+h-1]);for(let b=0;b<u;++b)x(this.separator),x(this.rightPad)}else{for(let b=0;b<u-1;++b)x(this.rightPad),x(this.separator);x(this.rightPad)}}}compute(t,e){const s=t.length,o=e.length;if(o>0){let l=e[0];if(l!==0)throw new Error(`First split value must be 0, got ${l}`);for(let c=1;c<o;++c){let u=e[c]>=l;if(u=u&&e[c]<=s,!u)throw new Error(`Invalid split value ${e[c]}, must be in [${l}, ${s}]`);l=e[c]}if(l!==s)throw new Error(`Last split value must be data size. Expected ${s}, got ${l}`)}const r=o-1,i=ee("int32",o);if(s===0||o===0){const l=new Array(s);for(let c=0;c<=r;++c)i[c]=0;return[l,i]}i[0]=0;for(let l=1;l<=r;++l){const c=e[l]-e[l-1];let u=0;this.nGramWidths.forEach(h=>{u+=this.getNumNGrams(c,h)}),this.preserveShort&&c>0&&u===0&&(u=1),i[l]=i[l-1]+u}const a=new Array(i[r]);for(let l=0;l<r;++l){const c=e[l];let u=i[l];if(this.nGramWidths.forEach(h=>{const d=e[l+1]-e[l],p=this.getNumNGrams(d,h);this.createNGrams(t,c,a,u,p,h),u+=p}),this.preserveShort&&u===i[l]){const h=e[l+1]-e[l];if(h===0)continue;const d=h+2*this.padWidth;this.createNGrams(t,c,a,u,1,d)}}return[a,i]}}function i1(n,t,e,s,o,r,i,a){return new QR(e,s,o,r,i,a).compute(n,t)}function JR(n,t,e,s){if(!n.length)return;if(t.length===0){for(let r=0;r<n.length;++r)s.push(n.subarray(r,r+1));return}if(t.length===1){const r=t[0];let i=n.indexOf(r);for(;i!==-1;){const a=n.subarray(0,i);(!e||a.length!==0)&&s.push(a),n=n.subarray(i+1),i=n.indexOf(r)}(!e||n.length!==0)&&s.push(n);return}let o=0;for(let r=0;r<n.length+1;r++)if(r===n.length||t.indexOf(n[r])!==-1){const i=n.subarray(o,r);(!e||i.length!==0)&&s.push(i),o=r+1}}function a1(n,t,e){const s=n.length,o=[];let r=0,i=0;const a=new Array(s);for(let d=0;d<s;++d){const p=o.length;JR(n[d],t,e,o);const f=o.length-p;a[d]=f,r+=f,i=Math.max(i,f)}const l=ee("int32",r*2),c=new Array(r),u=[s,i];let h=0;for(let d=0;d<s;++d)for(let p=0;p<a[d];++p)l[h*2]=d,l[h*2+1]=p,c[h]=o[h],++h;return[l,c,u]}function l1(n,t){const e=ee("int32",n.length);for(let s=0;s<n.length;++s)e[s]=Nw(n[s]).modulo(t).getLowBitsUnsigned();return e}const c1=ie(((n,t)=>n-t)),tA=Xd(((n,t,e,s)=>({real:n-e,imag:t-s}))),Qd=ge(ii,c1,tA),eA={kernelName:ii,backendName:"cpu",kernelFunc:Qd};function u1(n,t){const e=new Array(n.rank);for(let o=0;o<e.length;o++)e[o]=n.shape[o]*t[o];const s=It(e,n.dtype);for(let o=0;o<s.values.length;++o){const r=s.indexToLoc(o),i=new Array(n.rank);for(let l=0;l<i.length;l++)i[l]=r[l]%n.shape[l];const a=n.locToIndex(i);s.values[o]=n.values[a]}return s}const Hi=(n,t)=>{const e=t.value-n.value;return e===0?n.index-t.index:e};function h1(n,t,e=0,s=n.length-1){for(;s>e;){if(s-e>600){const a=s-e+1,l=t-e+1,c=Math.log(a),u=.5*Math.exp(2*c/3),h=.5*Math.sqrt(c*u*(a-u)/a)*Math.sign(l-a/2),d=Math.max(e,Math.floor(t-l*u/a+h)),p=Math.min(s,Math.floor(t+(a-l)*u/a+h));h1(n,t,d,p)}const o=n[t];let r=e,i=s;for(zn(n,e,t),Hi(n[s],o)>0&&zn(n,e,s);r<i;){for(zn(n,r,i),r++,i--;Hi(n[r],o)<0;)r=r+1;for(;Hi(n[i],o)>0;)i=i-1}Hi(n[e],o)===0?zn(n,e,i):(i=i+1,zn(n,i,s)),i<=t&&(e=i+1),t<=i&&(s=i-1)}}function d1(n,t,e,s,o){const r=t[t.length-1],[i,a]=[n.length/r,r],l=Re(e,i*s),c=Re("int32",i*s);for(let h=0;h<i;h++){const d=h*a,p=n.subarray(d,d+a);let f=new Array(p.length);p.forEach((b,w)=>f[w]={value:b,index:w}),s<f.length&&(h1(f,s),f=f.slice(0,s)),o&&f.sort(Hi);const m=h*s,g=l.subarray(m,m+s),x=c.subarray(m,m+s);for(let b=0;b<s;b++)g[b]=f[b].value,x[b]=f[b].index}const u=t.slice();return u[u.length-1]=s,[It(u,e,l),It(u,"int32",c)]}function p1(n,t,e,s){const o=$t(t,e)[0],r=[1,e[0],1];for(let f=0;f<o;f++)r[0]*=e[f];r[1]=e[o];for(let f=o+1;f<e.length;f++)r[2]*=e[f];const i=new Map,a=new Int32Array(e[o]),l=new ve(r,s,n),c=[],u=r[0]===1&&r[2]===1;for(let f=0;f<e[o];f++){let m;if(u)m=n[f].toString();else{const x=[];for(let b=0;b<r[0];b++)for(let w=0;w<r[2];w++)x.push(l.get(b,f,w));m=x.join(",")}const g=i.get(m);if(g!=null)a[f]=g;else{const x=i.size;i.set(m,x),a[f]=x,c.push(f)}}const h=r.slice();h[1]=i.size;const d=new ve(h,s);c.forEach((f,m)=>{for(let g=0;g<r[0];g++)for(let x=0;x<r[2];x++)d.set(l.get(g,f,x),g,m,x)});const p=e.slice();return p[o]=h[1],{outputValues:d.values,outputShape:p,indices:a}}var nA=Object.freeze({__proto__:null,addImpl:b0,bincountImpl:Kd,bincountReduceImpl:y0,bitwiseAndImpl:w0,castImpl:x0,ceilImpl:C0,concatImpl:$0,equalImpl:I0,expImpl:k0,expm1Impl:N0,floorDivImpl:E0,floorImpl:T0,gatherNdImpl:R0,gatherV2Impl:A0,greaterEqualImpl:F0,greaterImpl:D0,lessEqualImpl:O0,lessImpl:_0,linSpaceImpl:L0,logImpl:M0,maxImpl:P0,maximumImpl:B0,minimumImpl:z0,multiplyImpl:jd,negImpl:V0,notEqualImpl:W0,prodImpl:U0,raggedGatherImpl:H0,raggedRangeImpl:X0,raggedTensorToTensorImpl:Y0,rangeImpl:Z0,rsqrtImpl:Q0,scatterImpl:wo,sigmoidImpl:WR,simpleAbsImpl:g0,sliceImpl:t1,sparseFillEmptyRowsImpl:e1,sparseReshapeImpl:n1,sparseSegmentReductionImpl:Zd,sqrtImpl:HR,squaredDifferenceImpl:s1,staticRegexReplaceImpl:o1,stridedSliceImpl:r1,stringNGramsImpl:i1,stringSplitImpl:a1,stringToHashBucketFastImpl:l1,subImpl:c1,tileImpl:u1,topKImpl:d1,transposeImpl:Yd,uniqueImpl:p1});Df("cpu",()=>new lc,1);const f1=Wt(Er,n=>n>=0?n:Math.exp(n)-1),sA={kernelName:Er,backendName:"cpu",kernelFunc:f1};function m1(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{alpha:r}=s;ct([o],"leakyRelu");const i=X(o.shape),a=e.data.get(o.dataId).values,l=Re("float32",i);for(let c=0;c<a.length;c++)l[c]=a[c]<0?r*a[c]:a[c];return e.makeTensorInfo(o.shape,"float32",l)}const oA={kernelName:Na,backendName:"cpu",kernelFunc:m1};const rA=ie((n,t)=>n<0?t*n:n);function g1(n){const{inputs:t,backend:e}=n,{x:s,alpha:o}=t;ct([s,o],"prelu");const r=e.data.get(s.dataId).values,i=e.data.get(o.dataId).values,[a,l]=rA(s.shape,o.shape,r,i,"float32");return e.makeTensorInfo(l,"float32",a)}const iA={kernelName:qa,backendName:"cpu",kernelFunc:g1};const x1=Wt(Kr,n=>Math.max(0,n)),aA={kernelName:Kr,backendName:"cpu",kernelFunc:x1};const b1=Wt(jr,n=>Math.min(Math.max(0,n),6)),lA={kernelName:jr,backendName:"cpu",kernelFunc:b1};function dc(n,t,e,s,o){if(e==="linear")return ts({inputs:{x:t},backend:n});if(e==="relu")return x1({inputs:{x:t},backend:n});if(e==="elu")return f1({inputs:{x:t},backend:n});if(e==="relu6")return b1({inputs:{x:t},backend:n});if(e==="prelu")return g1({inputs:{x:t,alpha:s},backend:n});if(e==="leakyrelu")return m1({inputs:{x:t},backend:n,attrs:{alpha:o}});if(e==="sigmoid")return J0({inputs:{x:t},backend:n});throw new Error(`Activation ${e} has not been implemented for the CPU backend.`)}function Xt(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{shape:r}=s,i=X(o.shape),a=Ep(r,i),l=X(a);k(i===l,()=>`The new shape (${a}) has ${l} elements and the old shape (${o.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`),e.incRef(o.dataId);const c=e.data.get(o.dataId);if(c.complexTensorInfos!=null){const u=c.complexTensorInfos.real,h=c.complexTensorInfos.imag;u.shape=a,h.shape=a}return{dataId:o.dataId,shape:a,dtype:o.dtype}}const cA={kernelName:Ka,backendName:"cpu",kernelFunc:Xt};function y1(n){const{inputs:t,backend:e,attrs:s}=n,{a:o,b:r}=t,{transposeA:i,transposeB:a}=s;ct([o,r],"matMul");const l=o.shape.length,c=r.shape.length,u=i?o.shape[l-2]:o.shape[l-1],h=a?r.shape[c-1]:r.shape[c-2],d=i?o.shape[l-1]:o.shape[l-2],p=a?r.shape[c-2]:r.shape[c-1],f=o.shape.slice(0,-2),m=r.shape.slice(0,-2),g=X(f),x=X(m),w=yt(o.shape.slice(0,-2),r.shape.slice(0,-2)).concat([d,p]);k(u===h,()=>`Error in matMul: inner shapes (${u}) and (${h}) of Tensors with shapes ${o.shape} and ${r.shape} and transposeA=${i} and transposeB=${a} must match.`);const y=i?[g,u,d]:[g,d,u],$=a?[x,p,h]:[x,h,p],I=Xt({inputs:{x:o},backend:e,attrs:{shape:y}}),v=Xt({inputs:{x:r},backend:e,attrs:{shape:$}}),T=i?I.shape[1]:I.shape[2],S=i?I.shape[2]:I.shape[1],N=a?v.shape[1]:v.shape[2],C=Math.max(g,x),E=e.data.get(I.dataId).values,R=e.data.get(v.dataId).values,D=dt(I.shape),F=dt(v.shape),[O,P,B]=i?[D[0],1,D[1]]:[D[0],D[1],1],[H,G,K]=a?[1,F[1],F[0]]:[F[1],1,F[0]],j=S*N,Y=It([C,S,N],I.dtype),nt=Y.values,et=e.blockSize;for(let at=0;at<C;at++){const ht=at%g,mt=at%x;for(let tt=0;tt<S;tt+=et){const xt=Math.min(tt+et,S);for(let lt=0;lt<N;lt+=et){const Dt=Math.min(lt+et,N);for(let _t=0;_t<T;_t+=et){const Ft=Math.min(_t+et,T);for(let St=tt;St<xt;St++)for(let Nt=lt;Nt<Dt;Nt++){let zt=0;for(let Ot=_t;Ot<Ft;Ot++){const Ue=E[ht*O+St*P+Ot*B],Kt=R[Ot*H+Nt*G+mt*K];zt+=Ue*Kt}nt[at*j+(St*N+Nt)]+=zt}}}}}return e.disposeIntermediateTensorInfo(I),e.disposeIntermediateTensorInfo(v),e.makeTensorInfo(w,Y.dtype,Y.values)}const uA={kernelName:da,backendName:"cpu",kernelFunc:y1};function hA(n){const{inputs:t,backend:e,attrs:s}=n,{a:o,b:r,bias:i,preluActivationWeights:a}=t,{transposeA:l,transposeB:c,activation:u,leakyreluAlpha:h}=s;let d,p,f;const m=[];d=y1({inputs:{a:o,b:r},attrs:{transposeA:l,transposeB:c},backend:e}),i&&(p=tr({inputs:{a:d,b:i},backend:e}),m.push(d),d=p),u&&(f=dc(e,d,u,a,h),m.push(d),d=f);for(const x of m)e.disposeIntermediateTensorInfo(x);return d}const dA={kernelName:al,backendName:"cpu",kernelFunc:hA};const pA=Wt(gr,n=>Math.acos(n)),fA={kernelName:gr,backendName:"cpu",kernelFunc:pA};const mA=Wt(xr,n=>Math.acosh(n)),gA={kernelName:xr,backendName:"cpu",kernelFunc:mA};function xA(n){const{inputs:t,backend:e}=n,s=t;ct(t,"addN");const o=s.map(a=>e.data.get(a.dataId).values),r=It(s[0].shape,s[0].dtype),i=r.values;for(let a=0;a<s.length;a++){const l=o[a];for(let c=0;c<i.length;c++)i[c]+=l[c]}return e.makeTensorInfo(r.shape,r.dtype,r.values)}const bA={kernelName:Jc,backendName:"cpu",kernelFunc:xA};function yA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s;ct(o,"all");const a=$t(r,o.shape);let l=a;const c=Qt(l,o.shape.length);let u=o;c!=null&&(u=Ze({inputs:{x:o},backend:e,attrs:{perm:c}}),l=se(l.length,o.shape.length)),Se("all",l,u.shape.length);const[h,d]=Ce(u.shape,l),p=X(d),f=Ae(X(h),u.dtype),m=e.data.get(u.dataId).values;for(let x=0;x<f.length;++x){const b=x*p;let w=m[b];for(let y=0;y<p;++y){const $=m[b+y];w=w&&$}f[x]=w}c!=null&&e.disposeIntermediateTensorInfo(u);const g=e.makeTensorInfo(h,u.dtype,f);if(i){const x=le(h,a),b=Xt({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}const wA={kernelName:tu,backendName:"cpu",kernelFunc:yA};function CA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s;ct(o,"any");const a=$t(r,o.shape);let l=a;const c=Qt(l,o.shape.length);let u=o;c!=null&&(u=Ze({inputs:{x:o},backend:e,attrs:{perm:c}}),l=se(l.length,o.shape.length)),Se("any",l,u.shape.length);const[h,d]=Ce(u.shape,l),p=X(d),f=Ae(X(h),u.dtype),m=e.data.get(u.dataId).values;for(let x=0;x<f.length;++x){const b=x*p;let w=m[b];for(let y=0;y<p;++y){const $=m[b+y];w=w||$}f[x]=w}c!=null&&e.disposeIntermediateTensorInfo(u);const g=e.makeTensorInfo(h,u.dtype,f);if(i){const x=le(h,a),b=Xt({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}const $A={kernelName:eu,backendName:"cpu",kernelFunc:CA};function IA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r}=s;ct(o,"argMax");let i=$t(r,o.shape);const a=Qt(i,o.shape.length);let l=o;const c=[];a!=null&&(l=Ze({inputs:{x:o},backend:e,attrs:{perm:a}}),c.push(l),i=se(i.length,l.shape.length)),i=[i[0]],Se("argMax",i,l.shape.length);const[u,h]=Ce(l.shape,i),d=X(u),p=Ae(d,"int32"),f=X(h),m=e.data.get(l.dataId).values;for(let g=0;g<p.length;++g){const x=g*f;let b=m[x],w=0;for(let y=0;y<f;++y){const $=m[x+y];$>b&&(b=$,w=y)}p[g]=w}return c.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.makeTensorInfo(u,"int32",p)}const vA={kernelName:la,backendName:"cpu",kernelFunc:IA};function kA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r}=s;ct(o,"argMin");let i=$t(r,o.shape);const a=Qt(i,o.shape.length);let l=o;const c=[];a!=null&&(l=Ze({inputs:{x:o},backend:e,attrs:{perm:a}}),c.push(l),i=se(i.length,l.shape.length)),i=[i[0]],Se("argMin",i,l.shape.length);const[u,h]=Ce(l.shape,i),d=X(u),p=Ae(d,"int32"),f=X(h),m=e.data.get(l.dataId).values;for(let g=0;g<p.length;++g){const x=g*f;let b=m[x],w=0;for(let y=0;y<f;++y){const $=m[x+y];$<b&&(b=$,w=y)}p[g]=w}return c.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.makeTensorInfo(u,"int32",p)}const SA={kernelName:ca,backendName:"cpu",kernelFunc:kA};const NA=Wt(br,n=>Math.asin(n)),TA={kernelName:br,backendName:"cpu",kernelFunc:NA};const EA=Wt(yr,n=>Math.asinh(n)),RA={kernelName:yr,backendName:"cpu",kernelFunc:EA};const AA=Wt(wr,n=>Math.atan(n)),DA={kernelName:wr,backendName:"cpu",kernelFunc:AA};const FA=ie((n,t)=>Math.atan2(n,t)),_A=ge($r,FA),OA={kernelName:$r,backendName:"cpu",kernelFunc:_A};const LA=Wt(Cr,n=>Math.atanh(n)),MA={kernelName:Cr,backendName:"cpu",kernelFunc:LA};function Jd(n,t,e,s,o,r){const i=o.strideHeight,a=o.strideWidth,l=o.dilationHeight,c=o.dilationWidth,u=o.effectiveFilterHeight,h=o.effectiveFilterWidth,d=o.padInfo.top,p=o.padInfo.left,f=r==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,m=It(o.outShape,e),g=m.values,x=o.outShape[1]*o.outShape[2]*o.outShape[3],b=o.outShape[2]*o.outShape[3],w=o.outShape[3];for(let y=0;y<o.batchSize;++y){const $=y*x,I=y*s[0];for(let v=0;v<o.inChannels;++v)for(let T=0;T<o.outHeight;++T){const S=T*i-d,N=Math.max(0,S),C=Math.min(o.inHeight,u+S),E=$+T*b;for(let R=0;R<o.outWidth;++R){const D=R*a-p,F=Math.max(0,D),O=Math.min(o.inWidth,h+D);let P=f,B=0,H=0;for(let K=N;K<C;K+=l){const j=I+K*s[1];for(let Y=F;Y<O;Y+=c){const nt=j+Y*s[2],et=n[nt+v];r==="max"&&et>P?P=et:r==="avg"&&(B+=et,H++)}if(isNaN(P))break}const G=E+R*w+v;g[G]=r==="avg"?B/H:P}}}return m}function w1(n,t,e,s,o=!1,r=!1){const i=It(s.outShape,"int32"),a=s.strideHeight,l=s.strideWidth,c=s.dilationHeight,u=s.dilationWidth,h=s.effectiveFilterHeight,d=s.effectiveFilterWidth,p=s.padInfo.top,f=s.padInfo.left,m=It(t,e,n);for(let g=0;g<s.batchSize;++g)for(let x=0;x<s.inChannels;++x)for(let b=0;b<s.outHeight;++b){const w=b*a-p;let y=w;for(;y<0;)y+=c;const $=Math.min(s.inHeight,h+w);for(let I=0;I<s.outWidth;++I){const v=I*l-f;let T=v;for(;T<0;)T+=u;const S=Math.min(s.inWidth,d+v);let N=Number.NEGATIVE_INFINITY,C=-1;for(let E=y;E<$;E+=c){const R=E-w;for(let D=T;D<S;D+=u){const F=D-v,O=m.get(g,E,D,x);O>N&&(N=O,o?C=r?((g*s.inHeight+E)*s.inWidth+D)*s.inChannels+x:(E*s.inWidth+D)*s.inChannels+x:C=R*d+F)}}i.set(C,g,b,I,x)}}return i}function C1(n,t,e,s,o,r){const i=o.strideDepth,a=o.strideHeight,l=o.strideWidth,c=o.dilationDepth,u=o.dilationHeight,h=o.dilationWidth,d=o.effectiveFilterDepth,p=o.effectiveFilterHeight,f=o.effectiveFilterWidth,m=o.padInfo.front,g=o.padInfo.top,x=o.padInfo.left,b=r==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,w=It(o.outShape,e),y=w.values,$=o.outShape[1]*o.outShape[2]*o.outShape[3]*o.outShape[4],I=o.outShape[2]*o.outShape[3]*o.outShape[4],v=o.outShape[3]*o.outShape[4],T=o.outShape[4];for(let S=0;S<o.batchSize;++S){const N=S*$,C=S*s[0];for(let E=0;E<o.inChannels;++E)for(let R=0;R<o.outDepth;++R){const D=R*i-m;let F=D;for(;F<0;)F+=c;const O=Math.min(o.inDepth,d+D),P=N+R*I;for(let B=0;B<o.outHeight;++B){const H=B*a-g;let G=H;for(;G<0;)G+=u;const K=Math.min(o.inHeight,p+H),j=P+B*v;for(let Y=0;Y<o.outWidth;++Y){const nt=Y*l-x;let et=nt;for(;et<0;)et+=h;const at=Math.min(o.inWidth,f+nt),ht=j+Y*T;let mt=b,tt=0,xt=0;for(let Dt=F;Dt<O;Dt+=c){const _t=C+Dt*s[1];for(let Ft=G;Ft<K;Ft+=u){const St=_t+Ft*s[2];for(let Nt=et;Nt<at;Nt+=h){const zt=St+Nt*s[3],Ot=n[zt+E];if(r==="max"&&Ot>mt?mt=Ot:r==="avg"&&(tt+=Ot,xt++),isNaN(mt))break}if(isNaN(mt))break}if(isNaN(mt))break}const lt=ht+E;y[lt]=r==="avg"?tt/Math.max(xt,1):mt}}}}return w}function PA(n,t){const e=It(t.outShape,"int32"),s=t.strideDepth,o=t.strideHeight,r=t.strideWidth,i=t.dilationDepth,a=t.dilationHeight,l=t.dilationWidth,c=t.effectiveFilterDepth,u=t.effectiveFilterHeight,h=t.effectiveFilterWidth,d=t.padInfo.front,p=t.padInfo.top,f=t.padInfo.left;for(let m=0;m<t.batchSize;++m)for(let g=0;g<t.inChannels;++g)for(let x=0;x<t.outDepth;++x){const b=x*s-d;let w=b;for(;w<0;)w+=i;const y=Math.min(t.inDepth,c+b);for(let $=0;$<t.outHeight;++$){const I=$*o-p;let v=I;for(;v<0;)v+=a;const T=Math.min(t.inHeight,u+I);for(let S=0;S<t.outWidth;++S){const N=S*r-f;let C=N;for(;C<0;)C+=l;const E=Math.min(t.inWidth,h+N);let R=Number.NEGATIVE_INFINITY,D=-1;for(let F=w;F<y;F+=i){const O=F-b;for(let P=v;P<T;P+=a){const B=P-I;for(let H=C;H<E;H+=l){const G=H-N,K=n.get(m,F,P,H,g);K>=R&&(R=K,D=O*u*h+B*u+G)}}}e.set(D,m,x,$,S,g)}}}return e}function BA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t;ct(o,"avgPool");const{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=s,c=1;k(De(i,c),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=pn(o.shape,r,i,c,a,l);let h;if(u.filterWidth===1&&u.filterHeight===1&&Lt(u.inShape,u.outShape))h=ts({inputs:{x:o},backend:e});else{const d=e.data.get(o.dataId).values,p=dt(o.shape),f=Jd(d,o.shape,o.dtype,p,u,"avg");h=e.makeTensorInfo(u.outShape,o.dtype,f.values)}return h}const zA={kernelName:ua,backendName:"cpu",kernelFunc:BA};function VA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{filterSize:r,strides:i,pad:a,dimRoundingMode:l,dataFormat:c}=s;ct(o,"avgPool3d");const u=as(o.shape,r,i,1,a,l,c),h=e.data.get(o.dataId).values,d=C1(h,o.shape,o.dtype,dt(o.shape),u,"avg");return e.makeTensorInfo(d.shape,"float32",d.values)}const WA={kernelName:ha,backendName:"cpu",kernelFunc:VA};function UA(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,input:r}=t,{filterSize:i,strides:a,pad:l,dimRoundingMode:c}=s;ct([o,r],"avgPool3DGrad");const u=as(r.shape,i,a,1,l,c),h=u.strideDepth,d=u.strideHeight,p=u.strideWidth,f=u.filterDepth,m=u.filterHeight,g=u.filterWidth,x=u.dilationDepth,b=u.dilationHeight,w=u.dilationWidth,y=u.effectiveFilterDepth,$=u.effectiveFilterHeight,I=u.effectiveFilterWidth,v=y-1-u.padInfo.front,T=I-1-u.padInfo.left,S=$-1-u.padInfo.top,N=It(r.shape,"float32"),C=1/(f*m*g),E=e.bufferSync(o);for(let R=0;R<u.batchSize;++R)for(let D=0;D<u.inChannels;++D)for(let F=0;F<u.inDepth;++F)for(let O=0;O<u.inHeight;++O)for(let P=0;P<u.inWidth;++P){const B=F-v,H=O-S,G=P-T;let K=0;for(let j=0;j<y;j+=x){const Y=(B+j)/h;if(!(Y<0||Y>=u.outDepth||Math.floor(Y)!==Y))for(let nt=0;nt<$;nt+=b){const et=(H+nt)/d;if(!(et<0||et>=u.outHeight||Math.floor(et)!==et))for(let at=0;at<I;at+=w){const ht=(G+at)/p;if(ht<0||ht>=u.outWidth||Math.floor(ht)!==ht)continue;const mt=E.get(R,Y,et,ht,D);K+=mt}}}N.set(K*C,R,F,O,P,D)}return e.makeTensorInfo(N.shape,N.dtype,N.values)}const GA={kernelName:su,backendName:"cpu",kernelFunc:UA};function HA(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,input:r}=t,i=r;ct([o,r],"avgPoolGrad");const{filterSize:a,strides:l,pad:c}=s,u=pn(i.shape,a,l,1,c),h=u.strideHeight,d=u.strideWidth,p=u.filterHeight,f=u.filterWidth,m=u.dilationHeight,g=u.dilationWidth,x=u.effectiveFilterHeight,b=u.effectiveFilterWidth,w=b-1-u.padInfo.left,y=x-1-u.padInfo.top,$=It(i.shape,"float32"),I=1/(p*f),v=e.data.get(o.dataId).values,T=It(o.shape,"float32",v);for(let S=0;S<u.batchSize;++S)for(let N=0;N<u.inChannels;++N)for(let C=0;C<u.inHeight;++C)for(let E=0;E<u.inWidth;++E){const R=C-y,D=E-w;let F=0;for(let O=0;O<x;O+=m){const P=(R+O)/h;if(!(P<0||P>=u.outHeight||Math.floor(P)!==P))for(let B=0;B<b;B+=g){const H=(D+B)/d;if(H<0||H>=u.outWidth||Math.floor(H)!==H)continue;const G=T.get(S,P,H,N);F+=G}}$.set(F*I,S,C,E,N)}return e.makeTensorInfo($.shape,$.dtype,$.values)}const qA={kernelName:nu,backendName:"cpu",kernelFunc:HA};function XA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,scale:r,offset:i,mean:a,variance:l}=t;k(a.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),k(i==null||a.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),k(r==null||a.shape.length===r.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),ct([o,a,l,r,i],"batchNorm");let{varianceEpsilon:c}=s;c==null&&(c=.001);const u=e.data.get(o.dataId).values,h=e.data.get(a.dataId).values,d=e.data.get(l.dataId).values,p=r?e.data.get(r.dataId).values:new Float32Array([1]),f=i?e.data.get(i.dataId).values:new Float32Array([0]),m=new Float32Array(u.length),g=f.length,x=p.length,b=d.length,w=h.length;let y=0,$=0,I=0,v=0;for(let T=0;T<u.length;++T)m[T]=f[y++]+(u[T]-h[$++])*p[I++]/Math.sqrt(d[v++]+c),y>=g&&(y=0),$>=w&&($=0),I>=x&&(I=0),v>=b&&(v=0);return e.makeTensorInfo(o.shape,o.dtype,m)}const KA={kernelName:va,backendName:"cpu",kernelFunc:XA};function jA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{blockShape:r,crops:i}=s;ct([o],"batchToSpaceND");const a=r.reduce((x,b)=>x*b),l=Si(o.shape,r,a),c=Ni(l.length,r.length),u=Ti(o.shape,r,a),h=qh(i,r.length),d=Xh(u,i,r.length),p=Xt({inputs:{x:o},backend:e,attrs:{shape:l}}),f=Ze({inputs:{x:p},backend:e,attrs:{perm:c}}),m=Xt({inputs:{x:f},backend:e,attrs:{shape:u}}),g=Co({inputs:{x:m},backend:e,attrs:{begin:h,size:d}});return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(m),g}const YA={kernelName:pa,backendName:"cpu",kernelFunc:jA};function ZA(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,weights:r}=t,{size:i}=s,a=e.data.get(o.dataId).values,l=e.data.get(r.dataId).values,c=Kd(a,l,r.dtype,r.shape,i);return e.makeTensorInfo([i],r.dtype,c)}const QA={kernelName:ou,backendName:"cpu",kernelFunc:ZA};function JA(n){const{inputs:t,backend:e}=n,{s0:s,s1:o}=t,r=e.data.get(s.dataId).values,i=e.data.get(o.dataId).values,a=yt(Array.from(r),Array.from(i));return e.makeTensorInfo([a.length],"int32",Int32Array.from(a))}const tD={kernelName:Lp,backendName:"cpu",kernelFunc:JA};const eD=Wt(kr,(n,t)=>{const e=t;return n>e.clipValueMax?e.clipValueMax:n<e.clipValueMin?e.clipValueMin:n}),nD={kernelName:kr,backendName:"cpu",kernelFunc:eD};const sD={kernelName:fa,backendName:"cpu",kernelFunc:n=>{const{x:t}=n.inputs,e=n.backend,s=new Float32Array(X(t.shape)),o=e.data.get(t.dataId),r=o.complexTensorInfos.real,i=o.complexTensorInfos.imag,a=e.data.get(r.dataId).values,l=e.data.get(i.dataId).values;for(let c=0;c<a.length;c++){const u=a[c],h=l[c];s[c]=Math.hypot(u,h)}return e.makeOutput(s,t.shape,"float32")}};function er(n){const{inputs:t,backend:e}=n,{input:s}=t,o=e.data.get(s.dataId).complexTensorInfos.imag,r=e.data.get(o.dataId).values;return e.makeTensorInfo(o.shape,o.dtype,r)}const oD={kernelName:vu,backendName:"cpu",kernelFunc:er};function nr(n){const{inputs:t,backend:e,attrs:s}=n,{axis:o}=s,r=$t(o,t[0].shape)[0],i=t.map(m=>m.shape);Uh(i,r);let a=Xn(t.map(m=>m.shape),r);if(X(a)===0)return e.makeTensorInfo(a,t[0].dtype,[]);const l=t.filter(m=>X(m.shape)>0);if(l.length===1)return ts({inputs:{x:l[0]},backend:e});if(l[0].dtype==="complex64"){const m=l.map(y=>yo({inputs:{input:y},backend:e})),g=l.map(y=>er({inputs:{input:y},backend:e})),x=nr({inputs:m,backend:e,attrs:{axis:r}}),b=nr({inputs:g,backend:e,attrs:{axis:r}}),w=nn({inputs:{real:x,imag:b},backend:e});return m.forEach(y=>e.disposeIntermediateTensorInfo(y)),g.forEach(y=>e.disposeIntermediateTensorInfo(y)),e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(b),w}const c=l.map(m=>{const x=[-1,X(m.shape.slice(r))];return Xt({inputs:{x:m},backend:e,attrs:{shape:x}})}),u=c.map(m=>({vals:e.data.get(m.dataId).values,shape:m.shape}));a=Xn(c.map(m=>m.shape),1);const h=c[0].shape[0]===1,d=$0(u,a,t[0].dtype,h),p=Xn(l.map(m=>m.shape),r),f=e.makeTensorInfo(p,t[0].dtype,d);return c.forEach(m=>e.disposeIntermediateTensorInfo(m)),f}const rD={kernelName:ma,backendName:"cpu",kernelFunc:nr};function $1(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r}=t,{strides:i,pad:a,dataFormat:l,dilations:c,dimRoundingMode:u}=s;ct([o,r],"conv2d");const h=ls(l),d=ke(o.shape,r.shape,i,c,a,u,!1,h),p=d.filterHeight,f=d.filterWidth,m=d.dilationHeight,g=d.dilationWidth,x=d.padInfo.left,b=d.padInfo.top,w=d.dataFormat==="channelsLast",y=new ve(d.outShape,o.dtype),$=dt(o.shape),I=dt(r.shape),v=$[0],T=w?$[1]:$[2],S=w?$[2]:1,N=w?1:$[1],C=y.strides[0],E=w?y.strides[1]:y.strides[2],R=w?y.strides[2]:1,D=w?1:y.strides[1],F=e.data.get(o.dataId).values,O=e.data.get(r.dataId).values,P=y.values;for(let B=0;B<d.batchSize;++B){const H=B*v,G=B*C;for(let K=0;K<d.outHeight;++K){const j=G+K*E,Y=K*d.strideHeight-b;for(let nt=0;nt<p;++nt){const et=Y+nt*m;if(et<0||et>=d.inHeight)continue;const at=nt*I[0],ht=H+et*T;for(let mt=0;mt<d.outWidth;++mt){const tt=j+mt*R,xt=mt*d.strideWidth-x;for(let lt=0;lt<f;++lt){const Dt=xt+lt*g;if(Dt<0||Dt>=d.inWidth)continue;const _t=at+lt*I[1],Ft=ht+Dt*S;let St=_t;for(let Nt=0;Nt<d.inChannels;++Nt){const zt=F[Ft+Nt*N];for(let Ot=0;Ot<d.outChannels;++Ot)P[tt+Ot*D]+=zt*O[St+Ot];St+=d.outChannels}}}}}}return e.makeTensorInfo(y.shape,y.dtype,P)}const iD={kernelName:ga,backendName:"cpu",kernelFunc:$1};function aD(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,dy:r}=t,{strides:i,pad:a,dataFormat:l,dimRoundingMode:c,filterShape:u}=s;ct([o,r],"conv2dBackpropFilter");const h=ls(l),d=ke(o.shape,u,i,1,a,c,!1,h),{strideHeight:p,strideWidth:f,filterHeight:m,filterWidth:g}=d,x=d.dataFormat==="channelsLast",b=new ve(d.filterShape,"float32"),w=d.padInfo.left,y=d.padInfo.top,$=e.data.get(o.dataId).values,I=e.data.get(r.dataId).values,v=new ve(o.shape,o.dtype,$),T=new ve(r.shape,r.dtype,I);for(let S=0;S<m;++S){const N=Math.max(0,Math.ceil((y-S)/p)),C=Math.min(d.outHeight,(d.inHeight+y-S)/p);for(let E=0;E<g;++E){const R=Math.max(0,Math.ceil((w-E)/f)),D=Math.min(d.outWidth,(d.inWidth+w-E)/f);for(let F=0;F<d.inChannels;++F)for(let O=0;O<d.outChannels;++O){let P=0;for(let B=0;B<d.batchSize;++B)for(let H=N;H<C;++H){const G=S+H*p-y;for(let K=R;K<D;++K){const j=E+K*f-w;x?P+=v.get(B,G,j,F)*T.get(B,H,K,O):P+=v.get(B,F,G,j)*T.get(B,O,H,K)}}b.set(P,S,E,F,O)}}}return e.makeTensorInfo(b.shape,b.dtype,b.values)}const lD={kernelName:au,backendName:"cpu",kernelFunc:aD};function cD(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,filter:r}=t,{inputShape:i,strides:a,pad:l,dataFormat:c,dimRoundingMode:u}=s;ct([o,r],"conv2dBackpropInput");const h=dt(r.shape),d=dt(o.shape);let p=ls(c);const f=ke(i,r.shape,a,1,l,u,!1,p),m=new ve(f.inShape,"float32"),g=m.values,x=e.data.get(o.dataId).values,b=e.data.get(r.dataId).values,[w,y,$]=h,{batchSize:I,filterHeight:v,filterWidth:T,inChannels:S,inHeight:N,inWidth:C,outChannels:E,outHeight:R,outWidth:D,strideHeight:F,strideWidth:O}=f;p=f.dataFormat;const P=v-1-f.padInfo.top,B=T-1-f.padInfo.left,H=p==="channelsLast",G=m.strides[0],K=H?m.strides[1]:m.strides[2],j=H?m.strides[2]:1,Y=H?1:m.strides[1],nt=d[0],et=H?d[1]:d[2],at=H?d[2]:1,ht=H?1:d[1];for(let mt=0;mt<I;++mt)for(let tt=0;tt<S;++tt)for(let xt=0;xt<N;++xt){const lt=xt-P,Dt=Math.max(0,Math.ceil(lt/F)),_t=Math.min(R,(v+lt)/F);for(let Ft=0;Ft<C;++Ft){const St=Ft-B,Nt=Math.max(0,Math.ceil(St/O)),zt=Math.min(D,(T+St)/O);let Ot=0;for(let Kt=Dt;Kt<_t;++Kt){const vn=Kt*F-lt;for(let Ge=Nt;Ge<zt;++Ge){const ss=Ge*O-St,ae=nt*mt+et*Kt+at*Ge,kn=w*(v-1-vn)+y*(T-1-ss)+$*tt;for(let os=0;os<E;++os){const ot=x[ae+ht*os],Ct=b[kn+os];Ot+=ot*Ct}}}const Ue=G*mt+K*xt+j*Ft+Y*tt;g[Ue]=Ot}}return e.makeTensorInfo(m.shape,m.dtype,m.values)}const uD={kernelName:xa,backendName:"cpu",kernelFunc:cD};function hD(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r}=t,{strides:i,pad:a,dilations:l}=s;ct([o,r],"conv3d");const c=vs(o.shape,r.shape,i,l,a),{filterDepth:u,filterHeight:h,filterWidth:d,dilationDepth:p,dilationHeight:f,dilationWidth:m,padInfo:g}=c,x=g.front,b=g.left,w=g.top,y=new ve(c.outShape,o.dtype),$=e.data.get(o.dataId).values,I=e.data.get(r.dataId).values,v=y.values,T=dt(o.shape),S=dt(r.shape);for(let N=0;N<c.batchSize;++N){const C=N*T[0],E=N*y.strides[0];for(let R=0;R<c.outDepth;++R){const D=E+R*y.strides[1],F=R*c.strideDepth-x;for(let O=0;O<u;++O){const P=F+O*p;if(P<0||P>=c.inDepth)continue;const B=O*S[0],H=C+P*T[1];for(let G=0;G<c.outHeight;++G){const K=D+G*y.strides[2],j=G*c.strideHeight-w;for(let Y=0;Y<h;++Y){const nt=j+Y*f;if(nt<0||nt>=c.inHeight)continue;const et=B+Y*S[1],at=H+nt*T[2];for(let ht=0;ht<c.outWidth;++ht){const mt=K+ht*c.outChannels,tt=ht*c.strideWidth-b;for(let xt=0;xt<d;++xt){const lt=tt+xt*m;if(lt<0||lt>=c.inWidth)continue;const Dt=et+xt*S[2],_t=at+lt*c.inChannels;let Ft=Dt;for(let St=0;St<c.inChannels;++St){const Nt=$[_t+St];for(let zt=0;zt<c.outChannels;++zt)v[mt+zt]+=Nt*I[Ft+zt];Ft+=c.outChannels}}}}}}}}return e.makeTensorInfo(y.shape,y.dtype,y.values)}const dD={kernelName:ba,backendName:"cpu",kernelFunc:hD};function pD(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,dy:r}=t,{strides:i,pad:a,filterShape:l}=s;ct([o,r],"conv3dBackpropFilterV2");const c=dt(o.shape),u=dt(r.shape),h=vs(o.shape,l,i,1,a),d=h.strideDepth,p=h.strideHeight,f=h.strideWidth,m=h.filterDepth,g=h.filterHeight,x=h.filterWidth,b=new ve(h.filterShape,"float32"),w=b.values,[y,$,I,v]=b.strides,T=e.data.get(r.dataId).values,[S,N,C,E]=u,R=e.data.get(o.dataId).values,[D,F,O,P]=c,B=h.padInfo.front,H=h.padInfo.left,G=h.padInfo.top;for(let K=0;K<m;++K){const j=Math.max(0,Math.ceil((B-K)/d)),Y=Math.min(h.outDepth,(h.inDepth+B-K)/d),nt=K*y;for(let et=0;et<g;++et){const at=Math.max(0,Math.ceil((G-et)/p)),ht=Math.min(h.outHeight,(h.inHeight+G-et)/p),mt=et*$+nt;for(let tt=0;tt<x;++tt){const xt=Math.max(0,Math.ceil((H-tt)/f)),lt=Math.min(h.outWidth,(h.inWidth+H-tt)/f),Dt=tt*I+mt;for(let _t=0;_t<h.inChannels;++_t){const Ft=_t*v+Dt;for(let St=0;St<h.outChannels;++St){let Nt=0;for(let zt=0;zt<h.batchSize;++zt){const Ot=zt*D,Ue=zt*S;for(let Kt=j;Kt<Y;++Kt){const Ge=(K+Kt*d-B)*F+Ot,ss=Kt*N+Ue;for(let ae=at;ae<ht;++ae){const os=(et+ae*p-G)*O+Ge,ot=ae*C+ss;for(let Ct=xt;Ct<lt;++Ct){const Hs=(tt+Ct*f-H)*P+os,te=Ct*E+ot;Nt+=R[Hs+_t]*T[te+St]}}}}w[Ft+St]=Nt}}}}}return e.makeTensorInfo(b.shape,b.dtype,b.values)}const fD={kernelName:lu,backendName:"cpu",kernelFunc:pD};function mD(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,filter:r}=t,{pad:i,strides:a,inputShape:l}=s;ct([o],"conv3dBackpropInputV2");const c=dt(o.shape),u=dt(r.shape),h=vs(l,r.shape,a,1,i),d=new ve(h.inShape,"float32"),p=d.values,[f,m,g,x]=d.strides,b=e.data.get(o.dataId).values,[w,y,$,I]=c,v=e.data.get(r.dataId).values,[T,S,N,C]=u,{batchSize:E,filterDepth:R,filterHeight:D,filterWidth:F,inChannels:O,inDepth:P,inHeight:B,inWidth:H,outChannels:G,outDepth:K,outHeight:j,outWidth:Y,strideDepth:nt,strideHeight:et,strideWidth:at}=h,ht=R-1-h.padInfo.front,mt=D-1-h.padInfo.top,tt=F-1-h.padInfo.left;for(let xt=0;xt<E;++xt)for(let lt=0;lt<O;++lt)for(let Dt=0;Dt<P;++Dt){const _t=Dt-ht,Ft=Math.max(0,Math.ceil(_t/nt)),St=Math.min(K,(R+_t)/nt);for(let Nt=0;Nt<B;++Nt){const zt=Nt-mt,Ot=Math.max(0,Math.ceil(zt/et)),Ue=Math.min(j,(D+zt)/et);for(let Kt=0;Kt<H;++Kt){const vn=Kt-tt,Ge=Math.max(0,Math.ceil(vn/at)),ss=Math.min(Y,(F+vn)/at);let ae=0;for(let kn=Ft;kn<St;++kn){const os=kn*nt-_t;for(let ot=Ot;ot<Ue;++ot){const Ct=ot*et-zt;for(let Bt=Ge;Bt<ss;++Bt){const Hs=Bt*at-vn,te=w*xt+y*kn+$*ot+I*Bt,kp=T*(R-1-os)+S*(D-1-Ct)+N*(F-1-Hs)+C*lt;for(let be=0;be<G;++be){const XH=b[te+be],KH=v[kp+be];ae+=XH*KH}}}}p[f*xt+m*Dt+g*Nt+x*Kt+lt]=ae}}}return e.makeTensorInfo(d.shape,d.dtype,d.values)}const gD={kernelName:cu,backendName:"cpu",kernelFunc:mD};const xD=Wt(Sr,n=>Math.cos(n)),bD={kernelName:Sr,backendName:"cpu",kernelFunc:xD};const yD=Wt(Nr,n=>Math.cosh(n)),wD={kernelName:Nr,backendName:"cpu",kernelFunc:yD};function CD(n){const{inputs:t,backend:e,attrs:s}=n,{image:o,boxes:r,boxInd:i}=t,{cropSize:a,method:l,extrapolationValue:c}=s,[u,h,d,p]=o.shape,f=r.shape[0],[m,g]=a,x=It([f,m,g,p],"float32"),b=e.data.get(r.dataId).values,w=e.data.get(i.dataId).values,y=e.data.get(o.dataId).values,$=dt(o.shape),I=dt(x.shape);for(let v=0;v<f;v++){const T=v*4,S=b[T],N=b[T+1],C=b[T+2],E=b[T+3],R=w[v];if(R>=u)continue;const D=m>1?(C-S)*(h-1)/(m-1):0,F=g>1?(E-N)*(d-1)/(g-1):0;for(let O=0;O<m;O++){const P=m>1?S*(h-1)+O*D:.5*(S+C)*(h-1);if(P<0||P>h-1){for(let B=0;B<g;B++)for(let H=0;H<p;H++){const G=H+B*I[2]+O*I[1]+v*I[0];x.values[G]=c}continue}if(l==="bilinear"){const B=Math.floor(P),H=Math.ceil(P),G=P-B;for(let K=0;K<g;K++){const j=g>1?N*(d-1)+K*F:.5*(N+E)*(d-1);if(j<0||j>d-1){for(let at=0;at<p;at++){const ht=at+K*I[2]+O*I[1]+v*I[0];x.values[ht]=c}continue}const Y=Math.floor(j),nt=Math.ceil(j),et=j-Y;for(let at=0;at<p;at++){let ht=at+Y*$[2]+B*$[1]+R*$[0];const mt=y[ht];ht=at+nt*$[2]+B*$[1]+R*$[0];const tt=y[ht];ht=at+Y*$[2]+H*$[1]+R*$[0];const xt=y[ht];ht=at+nt*$[2]+H*$[1]+R*$[0];const lt=y[ht],Dt=mt+(tt-mt)*et,_t=xt+(lt-xt)*et;ht=at+K*I[2]+O*I[1]+v*I[0],x.values[ht]=Dt+(_t-Dt)*G}}}else for(let B=0;B<g;++B){const H=g>1?N*(d-1)+B*F:.5*(N+E)*(d-1);if(H<0||H>d-1){for(let j=0;j<p;j++){const Y=j+B*I[2]+O*I[1]+v*I[0];x.values[Y]=c}continue}const G=Math.round(H),K=Math.round(P);for(let j=0;j<p;j++){const Y=j+G*$[2]+K*$[1]+R*$[0],nt=j+B*I[2]+O*I[1]+v*I[0];x.values[nt]=y[Y]}}}}return e.makeTensorInfo(x.shape,x.dtype,x.values)}const $D={kernelName:hu,backendName:"cpu",kernelFunc:CD};function ID(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,exclusive:i,reverse:a}=s;ct(o,"cumprod");const l=Qt([r],o.shape.length);let c=o;l!=null&&(c=Ze({inputs:{x:o},backend:e,attrs:{perm:l}}));const u=se(1,o.shape.length)[0];if(u!==c.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${u}`);const h=Je(c.dtype,"int32"),d=jc(X(c.shape),h),p=e.data.get(c.dataId).values,f=c.shape[c.shape.length-1],m=a?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<p.length;x+=f)for(let b=0;b<f;b++){const w=m(x,b);if(b===0)d[w]=i?1:p[w];else{const y=m(x,b-1);d[w]=i?p[y]*d[y]:p[w]*d[y]}}const g=e.makeTensorInfo(c.shape,h,d);if(l!=null){const x=ks(l),b=Ze({inputs:{x:g},backend:e,attrs:{perm:x}});return e.disposeIntermediateTensorInfo(g),e.disposeIntermediateTensorInfo(c),b}return g}const vD={kernelName:uu,backendName:"cpu",kernelFunc:ID};function kD(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,exclusive:i,reverse:a}=s;ct(o,"cumsum");const l=Qt([r],o.shape.length);let c=o;l!=null&&(c=Ze({inputs:{x:o},backend:e,attrs:{perm:l}}));const u=se(1,o.shape.length)[0];if(u!==c.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${u}`);const h=Je(c.dtype,"int32"),d=Ae(X(c.shape),h),p=e.data.get(c.dataId).values,f=c.shape[c.shape.length-1],m=a?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<p.length;x+=f)for(let b=0;b<f;b++){const w=m(x,b);if(b===0)d[w]=i?0:p[w];else{const y=m(x,b-1);d[w]=i?p[y]+d[y]:p[w]+d[y]}}const g=e.makeTensorInfo(c.shape,h,d);if(l!=null){const x=ks(l),b=Ze({inputs:{x:g},backend:e,attrs:{perm:x}});return e.disposeIntermediateTensorInfo(g),e.disposeIntermediateTensorInfo(c),b}return g}const SD={kernelName:ya,backendName:"cpu",kernelFunc:kD};function ND(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,weights:r}=t,{size:i,binaryOutput:a}=s;if(o.shape.length===1){const l=e.data.get(o.dataId).values,c=e.data.get(r.dataId).values,u=Kd(l,c,r.dtype,r.shape,i);return e.makeTensorInfo([i],r.dtype,u)}else if(o.shape.length===2){const l=e.bufferSync(o),c=e.bufferSync(r),u=y0(l,c,i,a);return e.makeTensorInfo(u.shape,r.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${o.shape.length}.`)}const TD={kernelName:du,backendName:"cpu",kernelFunc:ND};function ED(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{blockSize:r,dataFormat:i}=s;k(i==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${i}`);const a=o.shape[0],l=o.shape[1],c=o.shape[2],u=o.shape[3],h=l*r,d=c*r,p=u/(r*r),f=e.data.get(o.dataId).values,m=new Float32Array(a*h*d*p);let g=0;for(let x=0;x<a;++x)for(let b=0;b<h;++b){const w=Math.floor(b/r),y=b%r;for(let $=0;$<d;++$){const I=Math.floor($/r),v=$%r,T=(y*r+v)*p;for(let S=0;S<p;++S){const C=S+T+u*(I+c*(w+l*x));m[g++]=f[C]}}}return e.makeTensorInfo([a,h,d,p],o.dtype,m)}const RD={kernelName:pu,backendName:"cpu",kernelFunc:ED};function I1(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r}=t,{strides:i,pad:a,dilations:l,dimRoundingMode:c}=s;ct([o,r],"depthwiseConv2DNative");const u=dt(o.shape),h=dt(r.shape);let d=l;d==null&&(d=[1,1]),k(De(i,d),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${d}'`);const p=ke(o.shape,r.shape,i,d,a,c,!0),{filterHeight:f,filterWidth:m,dilationHeight:g,dilationWidth:x,padInfo:b}=p,w=b.left,y=b.top,$=p.outChannels/p.inChannels,I=new ve(p.outShape,o.dtype),v=e.data.get(o.dataId).values,T=e.data.get(r.dataId).values,S=I.values;for(let N=0;N<p.batchSize;++N){const C=N*u[0],E=N*I.strides[0];for(let R=0;R<p.outHeight;++R){const D=E+R*I.strides[1],F=R*p.strideHeight-y;for(let O=0;O<f;++O){const P=F+O*g;if(P<0||P>=p.inHeight)continue;const B=O*h[0],H=C+P*u[1];for(let G=0;G<p.outWidth;++G){const K=D+G*I.strides[2],j=G*p.strideWidth-w;for(let Y=0;Y<m;++Y){const nt=j+Y*x;if(nt<0||nt>=p.inWidth)continue;const et=B+Y*h[1],at=H+nt*p.inChannels;let ht=K,mt=et;for(let tt=0;tt<p.inChannels;++tt){const xt=v[at+tt];for(let lt=0;lt<$;++lt)S[ht+lt]+=xt*T[mt+lt];ht+=$,mt+=$}}}}}}return e.makeTensorInfo(I.shape,I.dtype,I.values)}const AD={kernelName:wa,backendName:"cpu",kernelFunc:I1};function DD(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,dy:r}=t,{strides:i,dilations:a,pad:l,dimRoundingMode:c,filterShape:u}=s;ct([o,r],"depthwiseConv2dNativeBackpropFilter");const h=ke(o.shape,u,i,a,l,c,!0),{strideHeight:d,strideWidth:p,filterHeight:f,filterWidth:m}=h,g=new ve(h.filterShape,"float32"),x=h.padInfo.left,b=h.padInfo.top,w=h.outChannels/h.inChannels,y=e.data.get(o.dataId).values,$=new ve(o.shape,o.dtype,y),I=e.data.get(r.dataId).values,v=new ve(r.shape,r.dtype,I);for(let T=0;T<f;++T){const S=Math.max(0,Math.ceil((b-T)/d)),N=Math.min(h.outHeight,(h.inHeight+b-T)/d);for(let C=0;C<m;++C){const E=Math.max(0,Math.ceil((x-C)/p)),R=Math.min(h.outWidth,(h.inWidth+x-C)/p);for(let D=0;D<h.outChannels;++D){const F=Math.trunc(D/w),O=D%w;let P=0;for(let B=0;B<h.batchSize;++B)for(let H=S;H<N;++H){const G=T+H*d-b;for(let K=E;K<R;++K){const j=C+K*p-x;P+=$.get(B,G,j,F)*v.get(B,H,K,D)}}g.set(P,T,C,F,O)}}}return e.makeTensorInfo(g.shape,g.dtype,g.values)}const FD={kernelName:fu,backendName:"cpu",kernelFunc:DD};function _D(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,filter:r}=t,{strides:i,dilations:a,pad:l,dimRoundingMode:c,inputShape:u}=s;ct([o,r],"depthwiseConv2DNativeBackpropInput");const h=dt(o.shape),d=dt(r.shape),p=ke(u,r.shape,i,a,l,c,!0),f=new ve(p.inShape,"float32"),m=f.values,[g,x,b]=f.strides,w=e.data.get(o.dataId).values,[y,$,I]=h,v=e.data.get(r.dataId).values,[T,S,N]=d,{batchSize:C,filterHeight:E,filterWidth:R,inChannels:D,inHeight:F,inWidth:O,outChannels:P,outHeight:B,outWidth:H,strideHeight:G,strideWidth:K}=p,j=E-1-p.padInfo.top,Y=R-1-p.padInfo.left,nt=P/D;for(let et=0;et<C;++et)for(let at=0;at<D;++at)for(let ht=0;ht<F;++ht){const mt=ht-j,tt=Math.max(0,Math.ceil(mt/G)),xt=Math.min(B,(E+mt)/G);for(let lt=0;lt<O;++lt){const Dt=lt-Y,_t=Math.max(0,Math.ceil(Dt/K)),Ft=Math.min(H,(R+Dt)/K);let St=0;for(let Nt=tt;Nt<xt;++Nt){const zt=Nt*G-mt;for(let Ot=_t;Ot<Ft;++Ot){const Ue=Ot*K-Dt,Kt=y*et+$*Nt+I*Ot,vn=T*(E-1-zt)+S*(R-1-Ue)+N*at;for(let Ge=0;Ge<nt;++Ge){const ss=at*nt+Ge,ae=w[Kt+ss],kn=v[vn+Ge];St+=ae*kn}}}m[g*et+x*ht+b*lt+at]=St}}return e.makeTensorInfo(f.shape,f.dtype,f.values)}const OD={kernelName:mu,backendName:"cpu",kernelFunc:_D};function LD(n){const{inputs:t,backend:e}=n,{x:s}=t,o=X(s.shape),r=e.data.get(s.dataId).values,i=It([o,o],s.dtype),a=i.values;for(let c=0;c<r.length;c++)a[c*o+c]=r[c];const l=[...s.shape,...s.shape];return e.makeTensorInfo(l,i.dtype,i.values)}const MD={kernelName:Mp,backendName:"cpu",kernelFunc:LD};const PD={kernelName:Ca,backendName:"cpu",kernelFunc:({inputs:n,backend:t,attrs:e})=>{const{x:s,filter:o}=n,{strides:r,pad:i,dilations:a}=e,l=t,c=l.data.get(s.dataId).values,u=s.shape.length,h=l.data.get(o.dataId).values,d=o.shape.length,{batchSize:p,inHeight:f,inWidth:m,inChannels:g,outHeight:x,outWidth:b,padInfo:w,strideHeight:y,strideWidth:$,filterHeight:I,filterWidth:v,dilationHeight:T,dilationWidth:S,outShape:N}=mi(s.shape,o.shape,r,i,"NHWC",a),C=X(N),E=N.length,R=ee(s.dtype,C);for(let F=0;F<p;++F)for(let O=0;O<x;++O){const P=O*y-w.top;for(let B=0;B<b;++B){const H=B*$-w.left;for(let G=0;G<g;++G){let K=Number.MIN_SAFE_INTEGER;for(let Y=0;Y<I;++Y){const nt=P+Y*T;if(nt>=0&&nt<f)for(let et=0;et<v;++et){const at=H+et*S;if(at>=0&&at<m){const ht=Vn([F,nt,at,G],u,dt(s.shape)),mt=Vn([Y,et,G],d,dt(o.shape)),tt=c[ht]+h[mt];tt>K&&(K=tt)}}}const j=Vn([F,O,B,G],E,dt(N));R[j]=K}}}return{dataId:l.write(js(R,s.dtype),N,s.dtype),shape:N,dtype:s.dtype}}};const BD={kernelName:xu,backendName:"cpu",kernelFunc:({inputs:n,backend:t,attrs:e})=>{const{x:s,filter:o,dy:r}=n,{strides:i,pad:a,dilations:l}=e,c=t,u=Tn(s.shape,c.data.get(s.dataId).values),h=Tn(o.shape,c.data.get(o.dataId).values),{batchSize:d,inHeight:p,inWidth:f,inChannels:m,outHeight:g,outWidth:x,padInfo:b,strideHeight:w,strideWidth:y,filterHeight:$,filterWidth:I,dilationHeight:v,dilationWidth:T,outShape:S}=mi(s.shape,o.shape,i,a,"NHWC",l);k(r.rank===S.length,()=>`Error in ${xu}, dy must have the same rank as output ${S.length}, but got ${r.rank}`);const N=Tn(S,c.data.get(r.dataId).values),C=Dp(o.shape,o.dtype);for(let R=0;R<d;++R)for(let D=0;D<g;++D){const F=D*w-b.top;for(let O=0;O<x;++O){const P=O*y-b.left;for(let B=0;B<m;++B){let H=Number.MIN_SAFE_INTEGER,G=0,K=0;for(let j=0;j<$;++j){const Y=F+j*v;if(Y>=0&&Y<p)for(let nt=0;nt<I;++nt){const et=P+nt*T;if(et>=0&&et<f){const at=u[R][Y][et][B]+h[j][nt][B];at>H&&(H=at,G=j,K=nt)}}}C[G][K][B]+=N[R][D][O][B]}}}return{dataId:c.write(js(C,s.dtype),o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};const zD={kernelName:gu,backendName:"cpu",kernelFunc:({inputs:n,backend:t,attrs:e})=>{const{x:s,filter:o,dy:r}=n,{strides:i,pad:a,dilations:l}=e,c=t,u=Tn(s.shape,c.data.get(s.dataId).values),h=Tn(o.shape,c.data.get(o.dataId).values),{batchSize:d,inHeight:p,inWidth:f,inChannels:m,outHeight:g,outWidth:x,padInfo:b,strideHeight:w,strideWidth:y,filterHeight:$,filterWidth:I,dilationHeight:v,dilationWidth:T,outShape:S}=mi(s.shape,o.shape,i,a,"NHWC",l);k(r.rank===S.length,()=>`Error in ${gu}, dy must have the same rank as output ${S.length}, but got ${r.rank}`);const N=Tn(S,c.data.get(r.dataId).values),C=Dp(s.shape,s.dtype);for(let R=0;R<d;++R)for(let D=0;D<g;++D){const F=D*w-b.top;for(let O=0;O<x;++O){const P=O*y-b.left;for(let B=0;B<m;++B){let H=Number.MIN_SAFE_INTEGER,G=F<0?0:F,K=P<0?0:P;for(let j=0;j<$;++j){const Y=F+j*v;if(Y>=0&&Y<p)for(let nt=0;nt<I;++nt){const et=P+nt*T;if(et>=0&&et<f){const at=u[R][Y][et][B]+h[j][nt][B];at>H&&(H=at,G=Y,K=et)}}}C[R][G][K][B]+=N[R][D][O][B]}}}return{dataId:c.write(js(C,s.dtype),s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};function VD(n){const{inputs:t,backend:e,attrs:s}=n,{image:o}=t,{canvas:r,options:i}=s,{contextOptions:a,imageOptions:l}=i||{},c=(l==null?void 0:l.alpha)||1,u=(a==null?void 0:a.contextType)||"2d";if(u!=="2d")throw new Error(`Context type ${a.contextType} is not supported by the CPU backend.`);const h=r.getContext(u,(a==null?void 0:a.contextAttributes)||{});if(h==null)throw new Error(`Could not get the context with ${u} type.`);const[d,p]=o.shape.slice(0,2),f=o.shape.length===2?1:o.shape[2],m=e.data.get(o.dataId).values,g=o.dtype==="float32"?255:1,x=new Uint8ClampedArray(p*d*4);for(let w=0;w<d*p;++w){const y=[0,0,0,255*c];for(let I=0;I<f;I++){const v=m[w*f+I];if(o.dtype==="float32"){if(v<0||v>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${v}.`)}else if(o.dtype==="int32"&&(v<0||v>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${v}.`);f===1?(y[0]=v*g,y[1]=v*g,y[2]=v*g):y[I]=v*g}const $=w*4;x[$+0]=Math.round(y[0]),x[$+1]=Math.round(y[1]),x[$+2]=Math.round(y[2]),x[$+3]=Math.round(y[3])}r.width=p,r.height=d;const b=new ImageData(x,p,d);return h.putImageData(b,0,0),o}const WD={kernelName:mw,backendName:"cpu",kernelFunc:VD};function qi(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s;ct(o,"sum");let a;o.dtype==="bool"?a=Ms({inputs:{x:o},backend:e,attrs:{dtype:"int32"}}):a=ts({inputs:{x:o},backend:e});const l=a.shape.length,c=$t(r,a.shape),u=Qt(c,l);let h=c,d=a;u!=null&&(d=Ze({inputs:{x:a},backend:e,attrs:{perm:u}}),h=se(h.length,l)),Se("sum",h,d.shape.length);const[p,f]=Ce(d.shape,h),m=Je(d.dtype,"int32");let g=cc(e,p,m);const x=X(f),b=e.data.get(g.dataId).values,w=e.data.get(d.dataId).values;for(let y=0;y<b.length;++y){const $=y*x;let I=0;for(let v=0;v<x;++v)I+=w[$+v];b[y]=I}if(i){const y=le(g.shape,c),$=g;g=Xt({inputs:{x:g},backend:e,attrs:{shape:y}}),e.disposeIntermediateTensorInfo($)}return e.disposeIntermediateTensorInfo(a),u!=null&&e.disposeIntermediateTensorInfo(d),g}const UD={kernelName:tl,backendName:"cpu",kernelFunc:qi};function GD(n){const{inputs:t,backend:e,attrs:s}=n,{equation:o}=s,r=t,{allDims:i,summedDims:a,idDims:l}=nd(o,r.length);od(i.length,l,r);const{path:c,steps:u}=rd(a,l),h=u.length;let d=null,p=i.length;const f=[];for(let m=0;m<h;++m){for(const g of u[m]){const{permutationIndices:x,expandDims:b}=sd(p,l[g]);let w;id(x)?w=r[g]:(w=Ze({inputs:{x:r[g]},backend:e,attrs:{perm:x}}),f.push(w));const y=w.shape.slice();for(let $=0;$<b.length;++$)y.splice(b[$],0,1);Lt(w.shape,y)||(w=Xt({inputs:{x:w},backend:e,attrs:{shape:y}}),f.push(w)),d===null?d=w:(d=uc({inputs:{a:w,b:d},backend:e}),f.push(d))}m<h-1&&(c[m]>=0&&(d=qi({inputs:{x:d},backend:e,attrs:{axis:c[m]-(i.length-p),keepDims:!1}}),f.push(d)),p--)}for(const m of f)m!==d&&e.disposeIntermediateTensorInfo(m);return d}const HD={kernelName:bu,backendName:"cpu",kernelFunc:GD};function qD(n){const{inputs:t,backend:e}=n,{dy:s,y:o}=t;ct([s,o],"eluGrad");const r=new Float32Array(X(o.shape)),i=e.data.get(o.dataId).values,a=e.data.get(s.dataId).values;for(let l=0;l<i.length;++l){const c=i[l];c>=0?r[l]=a[l]:r[l]=a[l]*(c+1)}return e.makeTensorInfo(o.shape,"float32",r)}const XD={kernelName:yu,backendName:"cpu",kernelFunc:qD};const KD=Kh,jD=jh,YD=Yh,ZD=Zh,QD=Qh,JD=Jh,tF=Wt(Rr,n=>{const t=Math.sign(n),e=Math.abs(n),s=1/(1+KD*e);return t*(1-((((JD*s+QD)*s+ZD)*s+YD)*s+jD)*s*Math.exp(-e*e))}),eF={kernelName:Rr,backendName:"cpu",kernelFunc:tF};function pc(n){const{inputs:t,backend:e,attrs:s}=n,{input:o}=t,{dim:r}=s,i=o.shape.length,a=o.shape.slice();let l=r;return r<0&&(k(-(i+1)<=r,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),l=i+r+1),a.splice(l,0,1),Xt({inputs:{x:o},backend:e,attrs:{shape:a}})}const nF={kernelName:Ia,backendName:"cpu",kernelFunc:pc};const sF=ie((n,t)=>n/t),tp=ge(Tr,sF),ep={kernelName:Tr,backendName:"cpu",kernelFunc:tp};function v1(n,t,e){const s=n.shape,o=s[0],r=s[1],i=e.data.get(n.dataId),a=i.complexTensorInfos.real,l=i.complexTensorInfos.imag,c=[o,r],u=X(c),h=Re("float32",u),d=Re("float32",u);for(let g=0;g<o;g++){const x=Co({inputs:{x:a},backend:e,attrs:{begin:[g,0],size:[1,r]}}),b=Co({inputs:{x:l},backend:e,attrs:{begin:[g,0],size:[1,r]}}),w=nn({inputs:{real:x,imag:b},backend:e}),{real:y,imag:$}=oF(w,t,e),I=ds(y,$);for(let v=0;v<r;v++){const T=td(I,v);h[g*r+v]=T.real,d[g*r+v]=T.imag}e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(b),e.disposeIntermediateTensorInfo(w)}const p=e.makeTensorInfo(c,"float32",h),f=e.makeTensorInfo(c,"float32",d),m=nn({inputs:{real:p,imag:f},backend:e});return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(f),m}function oF(n,t,e){const s=X(n.shape),o=e.data.get(n.dataId),r=e.data.get(o.complexTensorInfos.real.dataId).values,i=e.data.get(o.complexTensorInfos.imag.dataId).values;if(rF(s)){const a=np(r,i,s,t,e),l=[n.shape[0],n.shape[1]];if(t){const c=e.makeTensorInfo(l,"float32",a.real),u=e.makeTensorInfo(l,"float32",a.imag),h=e.makeTensorInfo([],"float32",ys(s,"float32")),d=ts({inputs:{x:h},backend:e}),p=ep.kernelFunc({inputs:{a:c,b:h},backend:e}),f=ep.kernelFunc({inputs:{a:u,b:d},backend:e}),m=e.data.get(p.dataId).values,g=e.data.get(f.dataId).values;return e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(u),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(f),{real:m,imag:g}}return a}else{const a=ds(r,i),l=iF(a,s,t);return eg(l)}}function rF(n){return(n&n-1)===0}function np(n,t,e,s,o){if(e===1)return{real:n,imag:t};const r=ds(n,t),i=e/2,a=ng(r),l=a.real,c=a.imag,u=[l.length],h=o.makeTensorInfo(u,"float32",l),d=o.makeTensorInfo(u,"float32",c),p=nn({inputs:{real:h,imag:d},backend:o}),f=sg(r),m=f.real,g=f.imag,x=[m.length],b=o.makeTensorInfo(x,"float32",m),w=o.makeTensorInfo(x,"float32",g),y=nn({inputs:{real:b,imag:w},backend:o}),$=np(l,c,i,s,o),I=$.real,v=$.imag,T=[I.length],S=o.makeTensorInfo(T,"float32",I),N=o.makeTensorInfo(T,"float32",v),C=nn({inputs:{real:S,imag:N},backend:o}),E=np(m,g,i,s,o),R=E.real,D=E.imag,F=[R.length],O=o.makeTensorInfo(F,"float32",R),P=o.makeTensorInfo(F,"float32",D),B=nn({inputs:{real:O,imag:P},backend:o}),H=rg(e,s),G=[H.real.length],K=o.makeTensorInfo(G,"float32",H.real),j=o.makeTensorInfo(G,"float32",H.imag),Y=nn({inputs:{real:K,imag:j},backend:o}),nt=uc({inputs:{a:Y,b:B},backend:o}),et=tr({inputs:{a:C,b:nt},backend:o}),at=Qd({inputs:{a:C,b:nt},backend:o}),ht=yo({inputs:{input:et},backend:o}),mt=yo({inputs:{input:at},backend:o}),tt=er({inputs:{input:et},backend:o}),xt=er({inputs:{input:at},backend:o}),lt=nr({inputs:[ht,mt],backend:o,attrs:{axis:0}}),Dt=nr({inputs:[tt,xt],backend:o,attrs:{axis:0}}),_t=o.data.get(lt.dataId).values,Ft=o.data.get(Dt.dataId).values;return o.disposeIntermediateTensorInfo(h),o.disposeIntermediateTensorInfo(d),o.disposeIntermediateTensorInfo(p),o.disposeIntermediateTensorInfo(b),o.disposeIntermediateTensorInfo(w),o.disposeIntermediateTensorInfo(y),o.disposeIntermediateTensorInfo(S),o.disposeIntermediateTensorInfo(N),o.disposeIntermediateTensorInfo(C),o.disposeIntermediateTensorInfo(O),o.disposeIntermediateTensorInfo(P),o.disposeIntermediateTensorInfo(B),o.disposeIntermediateTensorInfo(K),o.disposeIntermediateTensorInfo(j),o.disposeIntermediateTensorInfo(Y),o.disposeIntermediateTensorInfo(nt),o.disposeIntermediateTensorInfo(et),o.disposeIntermediateTensorInfo(at),o.disposeIntermediateTensorInfo(ht),o.disposeIntermediateTensorInfo(tt),o.disposeIntermediateTensorInfo(mt),o.disposeIntermediateTensorInfo(xt),o.disposeIntermediateTensorInfo(lt),o.disposeIntermediateTensorInfo(Dt),{real:_t,imag:Ft}}function iF(n,t,e){const s=new Float32Array(t*2);for(let o=0;o<t;o++){let r=0,i=0;for(let a=0;a<t;a++){const l=ig(o*a,t,e),c=td(n,a);r+=c.real*l.real-c.imag*l.imag,i+=c.real*l.imag+c.imag*l.real}e&&(r/=t,i/=t),og(s,r,i,o)}return s}function aF(n){const{inputs:t,backend:e}=n,{input:s}=t,o=X(s.shape),r=s.shape[s.shape.length-1],i=o/r,a=Xt({inputs:{x:s},backend:e,attrs:{shape:[i,r]}}),l=v1(a,!1,e),c=Xt({inputs:{x:l},backend:e,attrs:{shape:s.shape}});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(l),c}const lF={kernelName:wu,backendName:"cpu",kernelFunc:aF};function sp(n){const{backend:t,attrs:e}=n,{shape:s,value:o,dtype:r}=e,i=r||Fo(o),a=ee(i,X(s));return uF(a,o,i),t.makeTensorInfo(s,i,a)}const cF={kernelName:Cu,backendName:"cpu",kernelFunc:sp};function uF(n,t,e){n.fill(t)}const hF={kernelName:$u,backendName:"cpu",kernelFunc:({inputs:n,attrs:t,backend:e})=>{const{image:s}=n,o=e,r=Re(s.dtype,X(s.shape)),[i,a,l,c]=s.shape,u=o.data.get(s.dataId).values;for(let d=0;d<i;d++){const p=d*l*a*c;for(let f=0;f<a;f++){const m=f*(l*c);for(let g=0;g<l;g++){const x=g*c;for(let b=0;b<c;b++){const w=Math.round(l-g-1),y=p+m+x+b;let $=u[y];if(w>=0&&w<l){const I=w*c,v=p+m+I+b;$=u[v]}r[y]=$}}}}return{dataId:o.write(r,s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};function dF(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r,bias:i,preluActivationWeights:a}=t,{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d,activation:p,leakyreluAlpha:f}=s;let m=$1({inputs:{x:o,filter:r},backend:e,attrs:{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d}});if(i){const g=m;if(u==="NCHW"&&i.shape.length===1&&i.shape[0]!==1){const x=Xt({inputs:{x:i},backend:e,attrs:{shape:[i.shape[0],1,1]}});m=tr({inputs:{a:m,b:x},backend:e}),e.disposeIntermediateTensorInfo(x)}else m=tr({inputs:{a:m,b:i},backend:e});e.disposeIntermediateTensorInfo(g)}if(p){const g=m;if(u==="NCHW"&&p==="prelu"&&a.shape.length===1&&a.shape[0]!==1){const x=Xt({inputs:{x:a},backend:e,attrs:{shape:[a.shape[0],1,1]}});m=dc(e,m,p,x,f),e.disposeIntermediateTensorInfo(x)}else m=dc(e,m,p,a,f);e.disposeIntermediateTensorInfo(g)}return m}const pF={kernelName:ll,backendName:"cpu",kernelFunc:dF};function fF(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r,bias:i,preluActivationWeights:a}=t,{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d,activation:p,leakyreluAlpha:f}=s;let m=I1({inputs:{x:o,filter:r},backend:e,attrs:{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d}});if(i){const g=m;m=tr({inputs:{a:m,b:i},backend:e}),e.disposeIntermediateTensorInfo(g)}if(p){const g=m;m=dc(e,m,p,a,f),e.disposeIntermediateTensorInfo(g)}return m}const mF={kernelName:nf,backendName:"cpu",kernelFunc:fF};function gF(n){const{inputs:t,backend:e}=n,{params:s,indices:o}=t,r=X(s.shape),i=o.shape,a=i[i.length-1],[l,c,u,h]=zh(s,o);if(c===0)return e.makeTensorInfo(l,s.dtype,[]);const d=e.data.get(o.dataId).values,p=e.bufferSync(s),f=R0(d,p,s.dtype,c,a,u,h,s.shape,r);return e.makeTensorInfo(l,s.dtype,f.values)}const xF={kernelName:Pp,backendName:"cpu",kernelFunc:gF};function bF(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,indices:r}=t,{axis:i,batchDims:a}=s;ct([o,r],"gatherV2");const l=$t(i,o.shape)[0],c=e.data.get(r.dataId).values,u=o.shape[l];for(let y=0;y<c.length;++y){const $=c[y];k($<=u-1&&$>=0,()=>`GatherV2: the index value ${$} is not in [0, ${u-1}]`)}let h=a;a==null&&(h=0);const d=X(r.shape),p=wg(o,r,l,h),f=Xt({inputs:{x:o},backend:e,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),m=Xt({inputs:{x:r},backend:e,attrs:{shape:[p.batchSize,d/p.batchSize]}}),g=[p.batchSize,p.outerSize,d/p.batchSize,p.sliceSize],x=e.bufferSync(m),b=e.bufferSync(f),w=A0(b,x,g);return e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(m),e.makeTensorInfo(p.outputShape,w.dtype,w.values)}const yF={kernelName:ka,backendName:"cpu",kernelFunc:bF};function wF(n){const{inputs:t,backend:e}=n,{input:s}=t,o=X(s.shape),r=s.shape[s.shape.length-1],i=o/r,a=Xt({inputs:{x:s},backend:e,attrs:{shape:[i,r]}}),l=v1(a,!0,e),c=Xt({inputs:{x:l},backend:e,attrs:{shape:s.shape}});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(l),c}const CF={kernelName:Iu,backendName:"cpu",kernelFunc:wF};const $F=Wt(Mr,n=>Number.isFinite(n)?1:0,"bool"),IF={kernelName:Mr,backendName:"cpu",kernelFunc:$F};const vF=Wt(Pr,n=>Math.abs(n)===1/0?1:0,"bool"),kF={kernelName:Pr,backendName:"cpu",kernelFunc:vF};const SF=Wt(Br,n=>Number.isNaN(n)?1:0,"bool"),NF={kernelName:Br,backendName:"cpu",kernelFunc:SF};function TF(n){const{backend:t,attrs:e}=n,{start:s,stop:o,num:r}=e,i=L0(s,o,r);return t.makeTensorInfo([i.length],"float32",i)}const EF={kernelName:Bp,backendName:"cpu",kernelFunc:TF};const RF=Wt(Vr,n=>Math.log1p(n)),AF={kernelName:Vr,backendName:"cpu",kernelFunc:RF};const DF=ie((n,t)=>n&&t),FF=ge(Ra,DF,null,"bool"),_F={kernelName:Ra,backendName:"cpu",kernelFunc:FF};const OF=Wt(Aa,n=>n?0:1,"bool"),LF={kernelName:Aa,backendName:"cpu",kernelFunc:OF};const MF=ie((n,t)=>n||t),PF=ge(Da,MF,null,"bool"),BF={kernelName:Da,backendName:"cpu",kernelFunc:PF};function zF(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{depthRadius:r,bias:i,alpha:a,beta:l}=s;ct(o,"LRN");const c=o.shape[3],u=c-1,h=e.data.get(o.dataId).values,d=X(o.shape),p=new Float32Array(d);function f(m){const g=m%c;let x=m-g+Math.max(0,g-r);const b=m-g+Math.min(g+r,u);let w=0;for(;x<=b;x++){const y=h[x];w+=y*y}return w}for(let m=0;m<d;m++){const g=f(m),x=h[m]*Math.pow(i+a*g,-l);p[m]=x}return e.makeTensorInfo(o.shape,o.dtype,p)}const VF={kernelName:Fa,backendName:"cpu",kernelFunc:zF};function WF(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,y:r,dy:i}=t,{depthRadius:a,bias:l,alpha:c,beta:u}=s;ct(i,"LRNGrad");const h=X(i.shape),d=i.shape[3],p=e.data.get(i.dataId).values,f=e.data.get(o.dataId).values,m=e.data.get(r.dataId).values,g=new Float32Array(h),x=h;for(let b=0;b<x;b++){const w=b%d,y=b-w+Math.max(0,w-a),$=b-w+Math.min(d,w+a+1);let I=0;for(let v=y;v<$;v++)I+=Math.pow(f[v],2);I=c*I+l;for(let v=y;v<$;v++){let T=-2*c*u*f[v]*m[b]/I;b===v&&(T+=Math.pow(I,-u)),T*=p[b],g[v]+=T}}return e.makeTensorInfo(i.shape,o.dtype,g)}const UF={kernelName:ku,backendName:"cpu",kernelFunc:WF};function k1(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{reductionIndices:r,keepDims:i}=s,a=e;let l=o.shape;const c=l.length,u=$t(r,l);let h=u;const d=Qt(h,c);let p=a.data.get(o.dataId).values;if(d!=null){const y=new Array(c);for(let $=0;$<y.length;$++)y[$]=l[d[$]];p=Yd(p,l,o.dtype,d,y),h=se(h.length,c),l=y}ct(o,"max"),Se("max",h,c);const[f,m]=Ce(l,h),g=X(m),x=P0(p,g,f,o.dtype),b=a.write(x,f,o.dtype);let w=f;return i&&(w=le(f,u)),{dataId:b,shape:w,dtype:o.dtype}}const GF={kernelName:_a,backendName:"cpu",kernelFunc:k1};function HF(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t;ct(o,"maxPool");const{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=s,c=1;k(De(i,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=pn(o.shape,r,i,c,a,l);let h;if(u.filterWidth===1&&u.filterHeight===1&&Lt(u.inShape,u.outShape))h=ts({inputs:{x:o},backend:e});else{const d=e.data.get(o.dataId).values,p=dt(o.shape),f=Jd(d,o.shape,o.dtype,p,u,"max");h=e.makeTensorInfo(u.outShape,o.dtype,f.values)}return h}const qF={kernelName:Oa,backendName:"cpu",kernelFunc:HF};function XF(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{filterSize:r,strides:i,pad:a,dimRoundingMode:l,dataFormat:c}=s;ct(o,"maxPool3d");const u=as(o.shape,r,i,1,a,l,c),h=e.data.get(o.dataId).values,d=C1(h,o.shape,o.dtype,dt(o.shape),u,"max");return e.makeTensorInfo(d.shape,"float32",d.values)}const KF={kernelName:La,backendName:"cpu",kernelFunc:XF};function jF(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,input:r}=t,{filterSize:i,strides:a,pad:l,dimRoundingMode:c}=s;ct([o,r],"maxPool3DGrad");const u=as(r.shape,i,a,1,l,c),h=e.bufferSync(r),d=PA(h,u),p=u.strideDepth,f=u.strideHeight,m=u.strideWidth,g=u.dilationDepth,x=u.dilationHeight,b=u.dilationWidth,w=u.effectiveFilterDepth,y=u.effectiveFilterHeight,$=u.effectiveFilterWidth,I=w-1-u.padInfo.front,v=$-1-u.padInfo.left,T=y-1-u.padInfo.top,S=It(r.shape,"float32"),N=e.bufferSync(o);for(let C=0;C<u.batchSize;++C)for(let E=0;E<u.inChannels;++E)for(let R=0;R<u.inDepth;++R)for(let D=0;D<u.inHeight;++D)for(let F=0;F<u.inWidth;++F){const O=R-I,P=D-T,B=F-v;let H=0;for(let G=0;G<w;G+=g){const K=(O+G)/p;if(!(K<0||K>=u.outDepth||Math.floor(K)!==K))for(let j=0;j<y;j+=x){const Y=(P+j)/f;if(!(Y<0||Y>=u.outHeight||Math.floor(Y)!==Y))for(let nt=0;nt<$;nt+=b){const et=(B+nt)/m;if(et<0||et>=u.outWidth||Math.floor(et)!==et)continue;const at=w*y*$-1-d.get(C,K,Y,et,E),ht=G*y*$+j*$+nt,mt=at===ht?1:0;if(mt===0)continue;const tt=N.get(C,K,Y,et,E);H+=tt*mt}}}S.set(H,C,R,D,F,E)}return e.makeTensorInfo(S.shape,S.dtype,S.values)}const YF={kernelName:Nu,backendName:"cpu",kernelFunc:jF};function ZF(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,input:r,output:i}=t,a=r;ct([r,i],"maxPoolGrad");const{filterSize:l,strides:c,pad:u,dimRoundingMode:h}=s,d=pn(a.shape,l,c,1,u,h),p=e.data.get(a.dataId).values,f=It(d.outShape,a.dtype,w1(p,a.shape,a.dtype,d).values),m=d.strideHeight,g=d.strideWidth,x=d.dilationHeight,b=d.dilationWidth,w=d.effectiveFilterHeight,y=d.effectiveFilterWidth,$=y-1-d.padInfo.left,I=w-1-d.padInfo.top,v=It(a.shape,"float32"),T=e.data.get(o.dataId).values,S=It(o.shape,"float32",T);for(let N=0;N<d.batchSize;++N)for(let C=0;C<d.inChannels;++C)for(let E=0;E<d.inHeight;++E)for(let R=0;R<d.inWidth;++R){const D=E-I,F=R-$;let O=0;for(let P=0;P<w;P+=x){const B=(D+P)/m;if(!(B<0||B>=d.outHeight||Math.floor(B)!==B))for(let H=0;H<y;H+=b){const G=(F+H)/g;if(G<0||G>=d.outWidth||Math.floor(G)!==G)continue;const K=w*y-1-f.get(N,B,G,C),j=P*y+H,Y=K===j?1:0;if(Y===0)continue;const nt=S.get(N,B,G,C);O+=nt*Y}}v.set(O,N,E,R,C)}return e.makeTensorInfo(v.shape,v.dtype,v.values)}const QF={kernelName:Su,backendName:"cpu",kernelFunc:ZF};function JF(n,t,e,s,o){const r=dt(t),i=Jd(n,t,e,r,o,"max"),a=w1(n,t,e,o,!0,s);return[i.values,a.values]}const t_={kernelName:zp,backendName:"cpu",kernelFunc:({inputs:n,attrs:t,backend:e})=>{const{x:s}=n,{filterSize:o,strides:r,pad:i,includeBatchInIndex:a}=t,l=e;ct(s,"MaxPoolWithArgmax");const c=l.data.get(s.dataId).values,u=pn(s.shape,o,r,[1,1],i),[h,d]=JF(c,s.shape,s.dtype,a,u),p=l.write(h,u.outShape,s.dtype),f=l.write(d,u.outShape,s.dtype);return[{dataId:p,shape:u.outShape,dtype:s.dtype},{dataId:f,shape:u.outShape,dtype:"int32"}]}};function e_(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s,a=$t(r,o.shape),c=Ce(o.shape,a)[1],u=X(c),h=[],d=e.makeTensorInfo([],"float32",new Float32Array([u]));h.push(d);const p=Ms({inputs:{x:o},backend:e,attrs:{dtype:"float32"}});h.push(p);const f=tp({inputs:{a:p,b:d},backend:e});h.push(f);const m=qi({inputs:{x:f},backend:e,attrs:{axis:r,keepDims:i}});return h.forEach(g=>e.disposeIntermediateTensorInfo(g)),m}const n_={kernelName:Ma,backendName:"cpu",kernelFunc:e_};function s_(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s;ct(o,"min");const a=$t(r,o.shape);let l=a;const c=Qt(l,o.shape.length);let u=o;c!=null&&(u=Ze({inputs:{x:o},backend:e,attrs:{perm:c}}),l=se(l.length,o.shape.length)),Se("min",l,u.shape.length);const[h,d]=Ce(u.shape,l),p=X(d),f=Ae(X(h),u.dtype),m=e.data.get(u.dataId).values;for(let x=0;x<f.length;++x){const b=x*p;let w=m[b];for(let y=0;y<p;++y){const $=m[b+y];(Number.isNaN($)||$<w)&&(w=$)}f[x]=w}c!=null&&e.disposeIntermediateTensorInfo(u);const g=e.makeTensorInfo(h,u.dtype,f);if(i){const x=le(h,a),b=Xt({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}const o_={kernelName:Pa,backendName:"cpu",kernelFunc:s_};function r_(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{paddings:r,mode:i}=s;ct(o,"mirrorPad");const a=r.map((w,y)=>w[0]+o.shape[y]+w[1]),l=r.map(w=>w[0]),c=r.map((w,y)=>w[0]+o.shape[y]),u=i==="reflect"?0:1,h=e.data.get(o.dataId).values,d=o.shape.length,p=dt(o.shape),f=X(a),m=a.length,g=dt(a),x=Re(o.dtype,f);for(let w=0;w<f;w++){let y=_o(w,m,g);for(let I=0;I<m;I++)y[I]<l[I]?y[I]=l[I]*2-y[I]-u:y[I]>=c[I]&&(y[I]=(c[I]-1)*2-y[I]+u);y=y.map((I,v)=>I-l[v]);const $=Vn(y,d,p);x[w]=h[$]}return{dataId:e.write(x,a,o.dtype),shape:a,dtype:o.dtype}}const i_={kernelName:Ba,backendName:"cpu",kernelFunc:r_};const a_=ie(((n,t)=>{const e=n%t;return n<0&&t<0||n>=0&&t>=0?e:(e+t)%t})),l_=ge(Gr,a_),c_={kernelName:Gr,backendName:"cpu",kernelFunc:l_};function S1(n){const{inputs:t,backend:e,attrs:s}=n,{logits:o}=t,{dim:r}=s,i=o.shape.length;let a=r;if(a===-1&&(a=i-1),a!==i-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${i} and dim was ${a}`);const l=$t([a],o.shape),c=k1({inputs:{x:o},backend:e,attrs:{reductionIndices:l,keepDims:!1}}),u=le(c.shape,l),h=Xt({inputs:{x:c},backend:e,attrs:{shape:u}}),d=Qd({inputs:{a:o,b:h},backend:e}),p=S0({inputs:{x:d},backend:e}),f=qi({inputs:{x:p},backend:e,attrs:{axis:l,keepDims:!1}}),m=Xt({inputs:{x:f},backend:e,attrs:{shape:u}}),g=tp({inputs:{a:p,b:m},backend:e});return e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(m),g}const u_={kernelName:sl,backendName:"cpu",kernelFunc:S1};function h_(n){const{inputs:t,backend:e,attrs:s}=n,{logits:o}=t,{numSamples:r,seed:i,normalized:a}=s;ct(o,"multinomial");const l=a?o:S1({inputs:{logits:o},backend:e,attrs:{dim:-1}}),c=l.shape[0],u=l.shape[1],h=e.data.get(l.dataId).values,d=[c,r],p=Ae(X(d),"int32");for(let f=0;f<c;++f){const m=f*u,g=new Float32Array(u-1);g[0]=h[m];for(let w=1;w<g.length;++w)g[w]=g[w-1]+h[m+w];const x=Ih.alea(i.toString()),b=f*r;for(let w=0;w<r;++w){const y=x();p[b+w]=g.length;for(let $=0;$<g.length;$++)if(y<g[$]){p[b+w]=$;break}}}return a||e.disposeIntermediateTensorInfo(l),e.makeTensorInfo(d,"int32",p)}const d_={kernelName:Vp,backendName:"cpu",kernelFunc:h_};const p_=_h;function f_(n){const{inputs:t,backend:e,attrs:s}=n,{boxes:o,scores:r}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l}=s;ct(o,"NonMaxSuppression");const c=e.data.get(o.dataId).values,u=e.data.get(r.dataId).values,{selectedIndices:h}=p_(c,u,i,a,l);return e.makeTensorInfo([h.length],"int32",new Int32Array(h))}const m_={kernelName:Tu,backendName:"cpu",kernelFunc:f_};const g_=Oh;function x_(n){const{inputs:t,backend:e,attrs:s}=n,{boxes:o,scores:r}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,padToMaxOutputSize:c}=s;ct(o,"NonMaxSuppressionPadded");const u=e.data.get(o.dataId).values,h=e.data.get(r.dataId).values,{selectedIndices:d,validOutputs:p}=g_(u,h,i,a,l,c);return[e.makeTensorInfo([d.length],"int32",new Int32Array(d)),e.makeTensorInfo([],"int32",new Int32Array([p]))]}const b_={kernelName:Eu,backendName:"cpu",kernelFunc:x_};const y_=Lh;function w_(n){const{inputs:t,backend:e,attrs:s}=n,{boxes:o,scores:r}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,softNmsSigma:c}=s;ct(o,"NonMaxSuppressionWithScore");const u=e.data.get(o.dataId).values,h=e.data.get(r.dataId).values,d=i,p=a,f=l,m=c,{selectedIndices:g,selectedScores:x}=y_(u,h,d,p,f,m);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}const C_={kernelName:Ru,backendName:"cpu",kernelFunc:w_};function $_(n){const{inputs:t,backend:e,attrs:s}=n,{indices:o}=t,{dtype:r,depth:i,onValue:a,offValue:l}=s;ct(o,"oneHot");const c=X(o.shape),u=new Float32Array(c*i);u.fill(l);const h=e.data.get(o.dataId).values;for(let d=0;d<c;++d)h[d]>=0&&h[d]<i&&(u[d*i+h[d]]=a);return e.makeTensorInfo([...o.shape,i],r,u)}const I_={kernelName:Ua,backendName:"cpu",kernelFunc:$_};function fc(n){const{inputs:t,backend:e}=n,{x:s}=t;if(s.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(s.dtype==="complex64"){const o=yo({inputs:{input:s},backend:e}),r=fc({inputs:{x:o},backend:e}),i=er({inputs:{input:s},backend:e}),a=fc({inputs:{x:i},backend:e}),l=nn({inputs:{real:r,imag:a},backend:e});return e.disposeIntermediateTensorInfo(o),e.disposeIntermediateTensorInfo(r),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(a),l}else return sp({backend:e,attrs:{shape:s.shape,value:0,dtype:s.dtype}})}const v_={kernelName:il,backendName:"cpu",kernelFunc:fc};function N1(n){const{inputs:t,backend:e}=n,{x:s}=t;if(s.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(s.dtype==="complex64"){const o=yo({inputs:{input:s},backend:e}),r=N1({inputs:{x:o},backend:e}),i=er({inputs:{input:s},backend:e}),a=fc({inputs:{x:i},backend:e}),l=nn({inputs:{real:r,imag:a},backend:e});return e.disposeIntermediateTensorInfo(o),e.disposeIntermediateTensorInfo(r),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(a),l}else return sp({backend:e,attrs:{shape:s.shape,value:1,dtype:s.dtype}})}const k_={kernelName:Wa,backendName:"cpu",kernelFunc:N1};function T1(n){const{inputs:t,backend:e,attrs:s}=n,{axis:o}=s;if(t.length===1)return pc({inputs:{input:t[0]},backend:e,attrs:{dim:o}});const r=t[0].shape,i=t[0].dtype;t.forEach(u=>{Gc(r,u.shape,"All tensors passed to stack must have matching shapes"),k(i===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});const a=[],l=t.map(u=>{const h=pc({inputs:{input:u},backend:e,attrs:{dim:o}});return a.push(h),h}),c=nr({inputs:l,backend:e,attrs:{axis:o}});return a.forEach(u=>e.disposeIntermediateTensorInfo(u)),c}const S_={kernelName:Ga,backendName:"cpu",kernelFunc:T1};function N_(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{paddings:r,constantValue:i}=s;ct(o,"pad");const a=r.map((b,w)=>b[0]+o.shape[w]+b[1]),l=r.map(b=>b[0]),c=e.data.get(o.dataId).values,u=X(o.shape),h=o.shape.length,d=dt(o.shape),p=X(a),f=a.length,m=dt(a),g=Re(o.dtype,p);i!==0&&g.fill(i);for(let b=0;b<u;b++){const y=_o(b,h,d).map((I,v)=>I+l[v]),$=Vn(y,f,m);g[$]=c[b]}return{dataId:e.write(g,a,o.dtype),shape:a,dtype:o.dtype}}const E1={kernelName:Ha,backendName:"cpu",kernelFunc:N_};const T_=ie((n,t)=>Math.pow(n,t)),E_=ge(qr,T_),R_={kernelName:qr,backendName:"cpu",kernelFunc:E_};function A_(n){const{inputs:t,backend:e,attrs:s}=n,{paramsNestedSplits:o,paramsDenseValues:r,indices:i}=t,{outputRaggedRank:a}=s,l=o.map(x=>e.data.get(x.dataId).values),c=o.map(x=>x.shape),u=e.data.get(r.dataId).values,h=e.data.get(i.dataId).values,[d,p,f]=H0(l,c,u,r.shape,r.dtype,h,i.shape),m=d.map(x=>e.makeTensorInfo([x.length],"int32",x)),g=e.makeTensorInfo(f,r.dtype,p);return m.concat([g])}const D_={kernelName:Wp,backendName:"cpu",kernelFunc:A_};function F_(n){const{inputs:t,backend:e}=n,{starts:s,limits:o,deltas:r}=t,i=e.data.get(s.dataId).values,a=e.data.get(o.dataId).values,l=e.data.get(r.dataId).values,[c,u]=X0(i,s.shape,s.dtype,a,o.shape,l,r.shape),h=e.makeTensorInfo([c.length],"int32",c),d=e.makeTensorInfo([u.length],s.dtype,u);return[h,d]}const __={kernelName:Up,backendName:"cpu",kernelFunc:F_};function O_(n){const{inputs:t,backend:e,attrs:s}=n,{shape:o,values:r,defaultValue:i,rowPartitionTensors:a}=t,{rowPartitionTypes:l}=s,c=e.data.get(o.dataId).values,u=e.data.get(r.dataId).values,h=e.data.get(i.dataId).values,d=a.map(g=>e.data.get(g.dataId).values),p=a.map(g=>g.shape),[f,m]=Y0(c,o.shape,u,r.shape,r.dtype,h,i.shape,d,p,l);return e.makeTensorInfo(f,r.dtype,m)}const L_={kernelName:Gp,backendName:"cpu",kernelFunc:O_};function M_(n){const{backend:t,attrs:e}=n,{start:s,stop:o,dtype:r,step:i}=e,a=Z0(s,o,i,r);return t.makeTensorInfo([a.length],r,a)}const P_={kernelName:Au,backendName:"cpu",kernelFunc:M_};const B_=Wt(Xr,n=>1/n),z_={kernelName:Xr,backendName:"cpu",kernelFunc:B_};function V_(n){const{inputs:t,backend:e,attrs:s}=n,{images:o}=t,{alignCorners:r,halfPixelCenters:i,size:a}=s;ct(o,"resizeBilinear");const l=dt(o.shape),[c,u]=a,[h,d,p,f]=o.shape,m=e.data.get(o.dataId).values,g=new Float32Array(X([h,c,u,f])),x=[r&&c>1?d-1:d,r&&u>1?p-1:p],b=[r&&c>1?c-1:c,r&&u>1?u-1:u];let w=0;const y=x[0]/b[0],$=x[1]/b[1];for(let I=0;I<h;I++)for(let v=0;v<c;v++){let T;i?T=y*(v+.5)-.5:T=y*v;const S=Math.max(0,Math.floor(T)),N=T-S,C=Math.min(d-1,Math.ceil(T)),E=I*l[0]+S*l[1],R=I*l[0]+C*l[1];for(let D=0;D<u;D++){let F;i?F=$*(D+.5)-.5:F=$*D;const O=Math.max(0,Math.floor(F)),P=F-O,B=Math.min(p-1,Math.ceil(F)),H=E+O*l[2],G=R+O*l[2],K=E+B*l[2],j=R+B*l[2];for(let Y=0;Y<f;Y++){const nt=m[H+Y],et=m[G+Y],at=m[K+Y],ht=m[j+Y],mt=nt+(at-nt)*P,tt=et+(ht-et)*P,xt=mt+(tt-mt)*N;g[w++]=xt}}}return e.makeTensorInfo([h,c,u,f],"float32",g)}const W_={kernelName:Ya,backendName:"cpu",kernelFunc:V_};function U_(n){const{inputs:t,backend:e,attrs:s}=n,{images:o,dy:r}=t,{alignCorners:i}=s;ct([r,o],"resizeBilinearGrad");const a=dt(o.shape),[l,c,u,h]=o.shape,[,d,p]=r.shape,f=new Float32Array(l*c*u*h),m=[i&&d>1?c-1:c,i&&p>1?u-1:u],g=[i&&d>1?d-1:d,i&&p>1?p-1:p],x=m[0]/g[0],b=m[1]/g[1],w=e.data.get(r.dataId).values;let y=0;for(let $=0;$<l;$++){const I=$*a[0];for(let v=0;v<d;v++){const T=v*x,S=Math.floor(T),N=Math.min(Math.ceil(T),c-1),C=I+S*a[1],E=I+N*a[1],R=T-S,D=1-R;for(let F=0;F<p;F++){const O=F*b,P=Math.floor(O),B=Math.min(Math.ceil(O),u-1),H=O-P,G=1-H,K=C+P*a[2],j=C+B*a[2],Y=E+P*a[2],nt=E+B*a[2],et=D*G,at=D*H,ht=R*G,mt=R*H;for(let tt=0;tt<h;tt++){const xt=w[y++];f[K+tt]+=xt*et,f[j+tt]+=xt*at,f[Y+tt]+=xt*ht,f[nt+tt]+=xt*mt}}}}return e.makeTensorInfo([l,u,c,h],"float32",f)}const G_={kernelName:_u,backendName:"cpu",kernelFunc:U_};function H_(n){const{inputs:t,backend:e,attrs:s}=n,{images:o}=t,{alignCorners:r,halfPixelCenters:i,size:a}=s;ct(o,"resizeNearestNeighbor");const l=dt(o.shape),[c,u]=a,[h,d,p,f]=o.shape,m=e.data.get(o.dataId).values,g=new Float32Array(h*c*u*f),x=[r&&c>1?d-1:d,r&&u>1?p-1:p],b=[r&&c>1?c-1:c,r&&u>1?u-1:u],w=x[0]/b[0],y=x[1]/b[1];let $=0;for(let I=0;I<h;I++){const v=I*l[0];for(let T=0;T<c;T++){const S=i?w*(T+.5):w*T;let N=Math.min(d-1,r?Math.round(S):Math.floor(S));i&&(N=Math.max(0,N));const C=v+N*l[1];for(let E=0;E<u;E++){const R=i?y*(E+.5):y*E;let D=Math.min(p-1,r?Math.round(R):Math.floor(R));i&&(D=Math.max(0,D));const F=C+D*l[2];for(let O=0;O<f;O++){const P=m[F+O];g[$++]=P}}}}return e.makeTensorInfo([h,c,u,f],o.dtype,g)}const q_={kernelName:ja,backendName:"cpu",kernelFunc:H_};function X_(n){const{inputs:t,backend:e,attrs:s}=n,{images:o,dy:r}=t,{alignCorners:i}=s;ct([r,o],"resizeNearestNeighborGrad");const a=dt(o.shape),l=dt(r.shape),[c,u,h,d]=o.shape,[,p,f]=r.shape,m=new Float32Array(c*u*h*d),g=e.data.get(r.dataId).values,x=[i&&p>1?u-1:u,i&&f>1?h-1:h],b=[i&&p>1?p-1:p,i&&f>1?f-1:f],w=x[0]/b[0],y=x[1]/b[1],$=1/w,I=1/y,v=Math.ceil($)*2+2,T=Math.ceil(I)*2+2;for(let S=0;S<c;S++){const N=S*a[0];for(let C=0;C<u;C++){const E=N+C*a[1],R=Math.floor(C*$),D=Math.floor(R-v/2);for(let F=0;F<h;F++){const O=E+F*a[2],P=Math.floor(F*I),B=Math.floor(P-T/2);for(let H=0;H<d;H++){let G=0;for(let K=0;K<v;K++){const j=K+D;if(j<0||j>=p)continue;const Y=N+j*l[1],nt=j*w,et=Math.min(u-1,i?Math.round(nt):Math.floor(nt));if(C===et)for(let at=0;at<T;at++){const ht=at+B;if(ht<0||ht>=f)continue;const mt=Y+ht*l[2],tt=ht*y,xt=Math.min(h-1,i?Math.round(tt):Math.floor(tt));F===xt&&(G+=g[mt+H])}}m[O+H]=G}}}}return e.makeTensorInfo(o.shape,o.dtype,m)}const K_={kernelName:Fu,backendName:"cpu",kernelFunc:X_};function j_(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{dims:r}=s;ct(o,"reverse");const i=o.shape.length,a=$t(r,o.shape);if(i===0)return ts({inputs:{x:o},backend:e});const l=new ve(o.shape,o.dtype),c=e.bufferSync(o);for(let u=0;u<l.size;u++){const h=l.indexToLoc(u),d=h.slice();a.forEach(p=>d[p]=o.shape[p]-1-d[p]),l.set(c.get(...d),...h)}return e.makeTensorInfo(l.shape,l.dtype,l.values)}const Y_={kernelName:Za,backendName:"cpu",kernelFunc:j_};const Z_={kernelName:Vu,backendName:"cpu",kernelFunc:({inputs:n,attrs:t,backend:e})=>{const{image:s}=n,{radians:o,fillValue:r,center:i}=t,a=e,l=Re(s.dtype,X(s.shape)),[c,u,h,d]=s.shape,[p,f]=Hh(i,u,h),m=255,g=Math.sin(o),x=Math.cos(o),b=a.data.get(s.dataId).values;for(let y=0;y<c;y++){const $=y*h*u*d;for(let I=0;I<u;I++){const v=I*(h*d);for(let T=0;T<h;T++){const S=T*d;for(let N=0;N<d;N++){const C=[c,I,T,N],E=C[2],R=C[1];let D=(E-p)*x-(R-f)*g,F=(E-p)*g+(R-f)*x;D=Math.round(D+p),F=Math.round(F+f);let O=r;if(typeof r!="number"&&(N===3?O=m:O=r[N]),D>=0&&D<h&&F>=0&&F<u){const B=F*(h*d),H=D*d,G=$+B+H+N;O=b[G]}const P=$+v+S+N;l[P]=O}}}}return{dataId:a.write(l,s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};const Q_=Wt(Yr,n=>{const t=Math.floor(n);return n-t<.5?Math.floor(n):n-t>.5?Math.ceil(n):t%2===0?t:t+1}),J_={kernelName:Yr,backendName:"cpu",kernelFunc:Q_};function tO(n){const{inputs:t,backend:e,attrs:s}=n,{indices:o,updates:r}=t,{shape:i}=s,{sliceRank:a,numUpdates:l,sliceSize:c,strides:u,outputSize:h}=lo(r,o,i),d=!0,p=e.bufferSync(o),f=e.bufferSync(r),m=wo(p,f,i,h,c,l,a,u,0,d);return e.makeTensorInfo(i,m.dtype,m.values)}const eO={kernelName:Hp,backendName:"cpu",kernelFunc:tO};function nO(n,t){let e=0,s=n.length,o=0;for(;e<s;)o=Math.floor((e+s)/2),n[o]<t?e=o+1:s=o;return s}function sO(n,t){let e=0,s=n.length,o=0;for(;e<s;)o=Math.floor((e+s)/2),n[o]<=t?e=o+1:s=o;return s}function oO(n,t,e,s,o,r){const i=ee("int32",e*o);for(let a=0;a<e;++a){const l=n.slice(a*s,(a+1)*s),c=a*o;for(let u=0;u<o;++u)i[c+u]=r==="left"?nO(l,t[u+c]):sO(l,t[u+c])}return i}function rO(n){const{inputs:t,backend:e,attrs:s}=n,{sortedSequence:o,values:r}=t,{side:i}=s,a=e.data.get(o.dataId).values,l=e.data.get(r.dataId).values,c=oO(a,l,o.shape[0],o.shape[1],r.shape[1],i);return e.makeTensorInfo(r.shape,"int32",c)}const iO={kernelName:Xp,backendName:"cpu",kernelFunc:rO};function aO(n){const{inputs:t,backend:e}=n,{condition:s,t:o,e:r}=t;ct([s,o,r],"select");const i=s.shape.length,a=e.data.get(s.dataId).values,l=e.data.get(o.dataId).values,c=e.data.get(r.dataId).values,u=Je(o.dtype,r.dtype),h=Ae(X(o.shape),u);let d=0;const p=i===0||i>1||o.shape.length===1?1:X(o.shape.slice(1));for(let f=0;f<a.length;f++)for(let m=0;m<p;m++)a[f]===1?h[d++]=l[f]:h[d++]=c[f];return e.makeTensorInfo(o.shape,u,h)}const lO={kernelName:Qa,backendName:"cpu",kernelFunc:aO};const cO=Ml,uO=Pl,hO=Wt(Qr,n=>n>=0?uO*n:cO*(Math.exp(n)-1)),dO={kernelName:Qr,backendName:"cpu",kernelFunc:hO};const pO=Wt(ei,n=>n<0?-1:n>0?1:0),fO={kernelName:ei,backendName:"cpu",kernelFunc:pO};const mO=Wt(Jr,n=>Math.sin(n)),gO={kernelName:Jr,backendName:"cpu",kernelFunc:mO};const xO=Wt(ti,n=>Math.sinh(n)),bO={kernelName:ti,backendName:"cpu",kernelFunc:xO};const R1=Math.log(11920928955078125e-23)+2,yO=Wt(si,n=>{const t=n>-R1,e=n<R1,s=Math.exp(n);let o;return e?o=s:t?o=n:o=Math.log(1+s),o}),wO={kernelName:si,backendName:"cpu",kernelFunc:yO};function CO(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{blockShape:r,paddings:i}=s;ct([o],"spaceToBatchND");const a=X(r),l=[[0,0]];l.push(...i);for(let I=1+r.length;I<o.shape.length;++I)l.push([0,0]);const c=E1.kernelFunc({inputs:{x:o},backend:e,attrs:{paddings:l,constantValue:0}}),u=Si(c.shape,r,a,!1),h=Ni(u.length,r.length,!1),d=Ti(c.shape,r,a,!1),m=Xt({inputs:{x:c},backend:e,attrs:{shape:u}}),b=Ze({inputs:{x:m},backend:e,attrs:{perm:h}}),$=Xt({inputs:{x:b},backend:e,attrs:{shape:d}});return e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(b),$}const $O={kernelName:el,backendName:"cpu",kernelFunc:CO};function IO(n){const{inputs:t,backend:e}=n,{indices:s,values:o,denseShape:r,defaultValue:i}=t;if(r.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${r.shape}`);if(s.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${s.shape}`);if(o.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${o.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);const a=e.data.get(s.dataId).values,l=e.data.get(o.dataId).values,c=e.data.get(r.dataId).values,u=e.data.get(i.dataId).values[0],[h,d,p,f,m]=e1(a,s.shape,s.dtype,l,o.dtype,c,u);return[e.makeTensorInfo(d,s.dtype,h),e.makeTensorInfo([d[0]],o.dtype,p),e.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(g=>Number(g)))),e.makeTensorInfo([m.length],s.dtype,new Int32Array(m))]}const vO={kernelName:Kp,backendName:"cpu",kernelFunc:IO};function kO(n){const{inputs:t,backend:e}=n,{inputIndices:s,inputShape:o,newShape:r}=t;if(s.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${s.shape}`);if(o.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${o.shape}`);if(r.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${r.shape}`);const i=Array.from(e.data.get(o.dataId).values),a=e.data.get(s.dataId).values,l=Array.from(e.data.get(r.dataId).values),[c,u,h]=n1(a,s.shape,s.dtype,i,l);return[e.makeTensorInfo(u,s.dtype,c),e.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}const SO={kernelName:jp,backendName:"cpu",kernelFunc:kO};function NO(n){const{inputs:t,backend:e}=n,{data:s,indices:o,segmentIds:r}=t;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(o.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${o.shape}`);if(r.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${r.shape}`);if(o.shape[0]!==r.shape[0])throw new Error("segmentIds and indices should have same size.");const i=e.data.get(s.dataId).values,a=e.data.get(o.dataId).values,l=e.data.get(r.dataId).values,[c,u]=Zd(i,s.shape,s.dtype,a,l,!0);return e.makeTensorInfo(u,s.dtype,c)}const TO={kernelName:Yp,backendName:"cpu",kernelFunc:NO};function EO(n){const{inputs:t,backend:e}=n,{data:s,indices:o,segmentIds:r}=t;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(o.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${o.shape}`);if(r.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${r.shape}`);if(o.shape[0]!==r.shape[0])throw new Error("segmentIds and indices should have same size.");const i=e.data.get(s.dataId).values,a=e.data.get(o.dataId).values,l=e.data.get(r.dataId).values,[c,u]=Zd(i,s.shape,s.dtype,a,l);return e.makeTensorInfo(u,s.dtype,c)}const RO={kernelName:Zp,backendName:"cpu",kernelFunc:EO};function AO(n){const{inputs:t,backend:e,attrs:s}=n,{sparseIndices:o,sparseValues:r,defaultValue:i}=t,{outputShape:a}=s,{sliceRank:l,numUpdates:c,sliceSize:u,strides:h,outputSize:d}=lo(r,o,a),p=!1,f=e.bufferSync(o);let m;switch(r.dtype){case"bool":{const g=e.bufferSync(r),x=!!e.data.get(i.dataId).values[0];m=wo(f,g,a,d,u,c,l,h,x,p);break}case"float32":{const g=e.bufferSync(r),x=e.data.get(i.dataId).values[0];m=wo(f,g,a,d,u,c,l,h,x,p);break}case"int32":{const g=e.bufferSync(r),x=e.data.get(i.dataId).values[0];m=wo(f,g,a,d,u,c,l,h,x,p);break}case"string":{const g=e.bufferSync(r),x=Cs(e.data.get(i.dataId).values[0]);m=wo(f,g,a,d,u,c,l,h,x,p);break}default:throw new Error(`Unsupported type ${r.dtype}`)}return e.makeTensorInfo(a,m.dtype,m.values)}const DO={kernelName:Qp,backendName:"cpu",kernelFunc:AO};function FO(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{numOrSizeSplits:r,axis:i}=s,a=$t(i,o.shape)[0],l=ad(o,r,a),c=new Array(o.shape.length).fill(0),u=o.shape.slice();return l.map(h=>{const d=[...u];d[a]=h;const p=Co({inputs:{x:o},backend:e,attrs:{begin:c,size:d}});return c[a]+=h,p})}const _O={kernelName:nl,backendName:"cpu",kernelFunc:FO};const OO={kernelName:Ou,backendName:"cpu",kernelFunc:({inputs:n,backend:t})=>{const{x:e}=n,s=t;ct(e,"square");const o=s.data.get(e.dataId).values,r=new Float32Array(o.length);for(let a=0;a<o.length;++a){const l=o[a];r[a]=l*l}return{dataId:s.write(r,e.shape,e.dtype),shape:e.shape,dtype:e.dtype}}};const LO=Wt(ui,(n,t)=>{const e=t;return isNaN(n)?NaN:n>0?1:e.alpha}),MO={kernelName:ui,backendName:"cpu",kernelFunc:LO};function PO(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{begin:r,end:i,strides:a,beginMask:l,endMask:c,ellipsisMask:u,newAxisMask:h,shrinkAxisMask:d}=s;ct(o,"stridedSlice");const{finalShapeSparse:p,finalShape:f,isIdentity:m,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:y}=Km(o.shape,r,i,a,l,c,u,h,d);let $;if(m)$=Xt({inputs:{x:o},backend:e,attrs:{shape:f}});else if(g||x){k(o.shape.length>=1,()=>`Input must have rank at least 1, got: ${o.shape.length}`);const I=Hm(b,w,y),v=Co({inputs:{x:o},backend:e,attrs:{begin:b,size:I}});$=Xt({inputs:{x:v},backend:e,attrs:{shape:f}}),e.disposeIntermediateTensorInfo(v)}else{const I=e.bufferSync(o),v=r1(p,I,y,b);$=e.makeTensorInfo(f,v.dtype,v.values)}return $}const BO={kernelName:Mu,backendName:"cpu",kernelFunc:PO};function zO(n){const{inputs:t,backend:e,attrs:s}=n,{separator:o,nGramWidths:r,leftPad:i,rightPad:a,padWidth:l,preserveShortSequences:c}=s,{data:u,dataSplits:h}=t,d=e.data.get(u.dataId).values,p=e.data.get(h.dataId).values,[f,m]=i1(d,p,o,r,i,a,l,c);return[e.makeTensorInfo([f.length],"string",f),e.makeTensorInfo(h.shape,"int32",m)]}const VO={kernelName:Jp,backendName:"cpu",kernelFunc:zO};function WO(n){const{inputs:t,backend:e,attrs:s}=n,{skipEmpty:o}=s,{input:r,delimiter:i}=t;if(r.dtype!=="string")throw new Error("Input must be of datatype string");if(r.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${r.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);const a=e.data.get(r.dataId).values,l=e.data.get(i.dataId).values[0],[c,u,h]=a1(a,l,o),d=u.length;return[e.makeTensorInfo([d,2],"int32",c),e.makeTensorInfo([d],"string",u),e.makeTensorInfo([2],"int32",new Int32Array(h))]}const UO={kernelName:tf,backendName:"cpu",kernelFunc:WO};function GO(n){const{inputs:t,backend:e,attrs:s}=n,{numBuckets:o}=s,{input:r}=t;if(r.dtype!=="string")throw new Error("Input must be of datatype string");if(o<=0)throw new Error("Number of buckets must be at least 1");const i=e.data.get(r.dataId).values,a=l1(i,o);return e.makeTensorInfo(r.shape,"int32",a)}const HO={kernelName:ef,backendName:"cpu",kernelFunc:GO};const qO=Wt(ai,n=>Math.tan(n)),XO={kernelName:ai,backendName:"cpu",kernelFunc:qO};const KO=Wt(li,n=>Math.tanh(n)),jO={kernelName:li,backendName:"cpu",kernelFunc:KO};function YO(n){const{inputs:t,backend:e}=n,{tensor:s,indices:o,updates:r}=t,{sliceRank:i,numUpdates:a,sliceSize:l,strides:c,outputSize:u}=lo(r,o,s.shape),h=!1,d=e.bufferSync(o),p=e.bufferSync(r),f=e.bufferSync(s),m=wo(d,p,s.shape,u,l,a,i,c,f,h);return e.makeTensorInfo(s.shape,m.dtype,m.values)}const ZO={kernelName:qp,backendName:"cpu",kernelFunc:YO};function QO(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{reps:r}=s;ct(o,"tile");const i=u1(e.bufferSync(o),r);return e.makeTensorInfo(i.shape,i.dtype,i.values)}const JO={kernelName:ci,backendName:"cpu",kernelFunc:QO};function tL(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{k:r,sorted:i}=s;ct(o,"topk");const a=e.data.get(o.dataId).values,[l,c]=d1(a,o.shape,o.dtype,r,i);return[e.makeTensorInfo(l.shape,l.dtype,l.values),e.makeTensorInfo(c.shape,c.dtype,c.values)]}const eL={kernelName:Pu,backendName:"cpu",kernelFunc:tL};function nL(n){const{inputs:t,attrs:e,backend:s}=n,{image:o,transforms:r}=t,{interpolation:i,fillMode:a,fillValue:l,outputShape:c}=e,[u,h,d,p]=o.shape,[f,m]=c!=null?c:[h,d],g=[u,f,m,p],x=dt(o.shape),b=x[0],w=x[1],y=x[2],$=dt(g),I=$[0],v=$[1],T=$[2],S=Re(o.dtype,X(g));S.fill(l);const N=s.data.get(o.dataId).values,C=s.data.get(r.dataId).values;for(let R=0;R<u;++R){const D=r.shape[0]===1?C:C.subarray(R*8,R*8+8);for(let F=0;F<f;++F)for(let O=0;O<m;++O)for(let P=0;P<p;++P){let B;const H=D[6]*O+D[7]*F+1;if(H===0)continue;const G=(D[0]*O+D[1]*F+D[2])/H,K=(D[3]*O+D[4]*F+D[5])/H,j=A1(G,d,a),Y=A1(K,h,a);switch(i){case"nearest":B=lL(N,h,d,b,w,y,R,Y,j,P,l);break;case"bilinear":B=cL(N,h,d,b,w,y,R,Y,j,P,l);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${i}`)}const nt=R*I+F*v+O*T+P;S[nt]=B}return s.makeTensorInfo(g,o.dtype,S)}return{dataId:s.write(S,g,o.dtype),shape:o.shape,dtype:o.dtype}}const sL={kernelName:Bu,backendName:"cpu",kernelFunc:nL};function A1(n,t,e){switch(e){case"reflect":return oL(n,t);case"wrap":return rL(n,t);case"nearest":return aL(n,t);default:return iL(n)}}function oL(n,t){let e=n;if(e<0)if(t<=1)e=0;else{const s=2*t;e<s&&(e=s*Math.trunc(-e/s)+e),e=e<-t?e+s:-e-1}else if(e>t-1)if(t<=1)e=0;else{const s=2*t;e-=s*Math.trunc(e/s),e>=t&&(e=s-e-1)}return qs(0,e,t-1)}function rL(n,t){let e=n;if(e<0)if(t<=1)e=0;else{const s=t-1;e+=t*(Math.trunc(-e/s)+1)}else if(e>t-1)if(t<=1)e=0;else{const s=t-1;e-=t*Math.trunc(e/s)}return qs(0,e,t-1)}function iL(n,t){return n}function aL(n,t){return qs(0,n,t-1)}function Xi(n,t,e,s,o,r,i,a,l,c,u){const h=i*s+a*o+l*r+c;return 0<=a&&a<t&&0<=l&&l<e?n[h]:u}function lL(n,t,e,s,o,r,i,a,l,c,u){const h=Math.round(a),d=Math.round(l);return Xi(n,t,e,s,o,r,i,h,d,c,u)}function cL(n,t,e,s,o,r,i,a,l,c,u){const h=Math.floor(a),d=Math.floor(l),p=h+1,f=d+1,m=(f-l)*Xi(n,t,e,s,o,r,i,h,d,c,u)+(l-d)*Xi(n,t,e,s,o,r,i,h,f,c,u),g=(f-l)*Xi(n,t,e,s,o,r,i,p,d,c,u)+(l-d)*Xi(n,t,e,s,o,r,i,p,f,c,u);return(p-a)*m+(a-h)*g}function uL(n){const{inputs:t,attrs:e,backend:s}=n,{axis:o}=e,{x:r}=t;ct(r,"unique");const i=s.data.get(r.dataId).values,{outputValues:a,outputShape:l,indices:c}=p1(i,o,r.shape,r.dtype);return[s.makeTensorInfo(l,r.dtype,a),s.makeTensorInfo([c.length],"int32",c)]}const hL={kernelName:zu,backendName:"cpu",kernelFunc:uL};function dL(n){const{inputs:t,backend:e,attrs:s}=n,{value:o}=t;let{axis:r}=s;r<0&&(r+=o.shape.length);const i=o.shape.length,a=o.shape[r],l=new Array(i-1);let c=0;for(let p=0;p<i;p++)p!==r&&(l[c++]=o.shape[p]);const u=new Array(i).fill(0),h=o.shape.slice();h[r]=1;const d=new Array(a);for(let p=0;p<d.length;p++){u[r]=p;const f=Co({inputs:{x:o},backend:e,attrs:{begin:u,size:h}});d[p]=Xt({inputs:{x:f},backend:e,attrs:{shape:l}}),e.disposeIntermediateTensorInfo(f)}return d}const pL={kernelName:ol,backendName:"cpu",kernelFunc:dL};function fL(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,segmentIds:r}=t,{numSegments:i}=s;ct(o,"unsortedSegmentSum");const a=o.shape.length,l=r.shape.length,c=[],u=[],h=a-l;let d=r;for(let f=0;f<h;++f){const m=pc({inputs:{input:d},backend:e,attrs:{dim:f+1}});d=m,u.push(m)}for(let f=0;f<i;++f){const m=ys(f,"int32"),g=e.makeTensorInfo([],"int32",m),x=v0({inputs:{a:g,b:d},backend:e}),b=Ms({inputs:{x},backend:e,attrs:{dtype:"float32"}}),w=uc({inputs:{a:b,b:o},backend:e}),y=qi({inputs:{x:w},backend:e,attrs:{axis:0,keepDims:!1}});c.push(y),u.push(g),u.push(x),u.push(b),u.push(w),u.push(y)}const p=T1({inputs:c,backend:e,attrs:{axis:0}});return u.forEach(f=>e.disposeIntermediateTensorInfo(f)),p}const mL={kernelName:rl,backendName:"cpu",kernelFunc:fL};const gL=[dA,qE,fA,gA,QE,bA,wA,$A,vA,SA,TA,RA,DA,OA,MA,zA,WA,GA,qA,uA,KA,YA,QA,tR,tD,YE,nR,nD,XE,sD,rD,iD,lD,uD,dD,fD,gD,bD,wD,$D,vD,SD,TD,RD,AD,FD,OD,MD,PD,BD,zD,WD,HD,sA,XD,sR,eF,oR,nF,iR,lF,cF,hF,lR,uR,pF,mF,xF,yF,dR,fR,KE,CF,oD,IF,kF,NF,oA,gR,bR,EF,wR,AF,_F,LF,BF,VF,UF,GF,$R,qF,KF,YF,QF,t_,n_,o_,vR,i_,c_,d_,SR,TR,m_,b_,C_,RR,I_,k_,S_,E1,R_,iA,FR,D_,__,L_,P_,jE,ep,z_,aA,lA,cA,W_,G_,q_,K_,Y_,Z_,J_,VR,eO,iO,lO,dO,UR,fO,gO,bO,GR,u_,wO,$O,vO,SO,TO,RO,DO,_O,XR,OO,jR,ZR,MO,BO,VO,UO,HO,eA,UD,XO,jO,ZO,JO,eL,sL,AR,hL,pL,mL,v_];for(const n of gL)af(n);const $o={},mc={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function xL(n,t){$o[n]=t}function Bn(n,t){if(!(n in $o)||t!=null){const s=yL(n,t);if(s!==null)$o[n]=s;else return console.log("Could not get context for WebGL version",n),null}const e=$o[n];return e==null||e.isContextLost()?(delete $o[n],Bn(n)):(e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.disable(e.DITHER),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SAMPLE_COVERAGE),e.enable(e.SCISSOR_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),$o[n])}function bL(n){if(!U().getBool("IS_SAFARI")&&typeof OffscreenCanvas!="undefined"&&n===2)return new OffscreenCanvas(300,150);if(typeof document!="undefined")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}function yL(n,t){if(n!==1&&n!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");const e=t==null?bL(n):t;return e.addEventListener("webglcontextlost",s=>{s.preventDefault(),delete $o[n]},!1),U().getBool("SOFTWARE_WEBGL_ENABLED")&&(mc.failIfMajorPerformanceCaveat=!1),n===1?e.getContext("webgl",mc)||e.getContext("experimental-webgl",mc):e.getContext("webgl2",mc)}var Ki;(function(n){n[n.DENSE=0]="DENSE",n[n.SHARED_BATCH=1]="SHARED_BATCH"})(Ki||(Ki={}));var hn;(function(n){n[n.RENDER=0]="RENDER",n[n.UPLOAD=1]="UPLOAD",n[n.PIXELS=2]="PIXELS",n[n.DOWNLOAD=3]="DOWNLOAD"})(hn||(hn={}));var Ne;(function(n){n[n.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",n[n.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",n[n.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",n[n.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",n[n.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(Ne||(Ne={}));function ji(n,t){return[t,n]}function wL(n,t){return n*t}function gc(n){const t=X(n),e=Math.ceil(t/4);return Hc(e)}function sr(n,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(n/2))]}function CL(n,t){const[e,s]=sr(n,t);return e*s*4}function op(n,t){const e=n;let s,o,r,i,a,l,c,u,h,d;return U().getNumber("WEBGL_VERSION")===2?(s=e.R32F,o=e.R16F,r=e.RGBA16F,i=e.RGBA32F,a=e.RED,c=4,u=1,h=e.HALF_FLOAT,d=e.FLOAT,l=e.RGBA8):(s=n.RGBA,o=n.RGBA,r=n.RGBA,i=e.RGBA,a=n.RGBA,c=4,u=4,h=t!=null?t.HALF_FLOAT_OES:null,d=n.FLOAT,l=n.RGBA),{internalFormatFloat:s,internalFormatHalfFloat:o,internalFormatPackedHalfFloat:r,internalFormatPackedFloat:i,textureFormatFloat:a,downloadTextureFormat:l,downloadUnpackNumChannels:c,defaultNumChannels:u,textureTypeHalfFloat:h,textureTypeFloat:d}}function it(n,t){const e=t();return U().getBool("DEBUG")&&$L(n),e}function $L(n){const t=n.getError();if(t!==n.NO_ERROR)throw new Error("WebGL Error: "+SL(n,t))}const IL=596e-10,vL=65504;function kL(n){return!!(U().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||n===0||IL<Math.abs(n)&&Math.abs(n)<vL)}function SL(n,t){switch(t){case n.NO_ERROR:return"NO_ERROR";case n.INVALID_ENUM:return"INVALID_ENUM";case n.INVALID_VALUE:return"INVALID_VALUE";case n.INVALID_OPERATION:return"INVALID_OPERATION";case n.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case n.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case n.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${t}`}}function xc(n,t){return gs(n,()=>n.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function NL(n,t){const e=gs(n,()=>n.createShader(n.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(it(n,()=>n.shaderSource(e,t)),it(n,()=>n.compileShader(e)),n.getShaderParameter(e,n.COMPILE_STATUS)===!1)throw console.log(n.getShaderInfoLog(e)),new Error("Failed to compile vertex shader.");return e}function TL(n,t){const e=gs(n,()=>n.createShader(n.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(it(n,()=>n.shaderSource(e,t)),it(n,()=>n.compileShader(e)),U().get("ENGINE_COMPILE_ONLY"))return e;if(n.getShaderParameter(e,n.COMPILE_STATUS)===!1)throw D1(t,n.getShaderInfoLog(e)),new Error("Failed to compile fragment shader.");return e}const EL=/ERROR: [0-9]+:([0-9]+):/g;function D1(n,t){const e=EL.exec(t);if(e==null){console.log(`Couldn't parse line number in error: ${t}`),console.log(n);return}const s=+e[1],o=n.split(`
`),r=o.length.toString().length+2,i=o.map((h,d)=>Do((d+1).toString(),r)+h);let a=0;for(let h=0;h<i.length;h++)a=Math.max(i[h].length,a);const l=i.slice(0,s-1),c=i.slice(s-1,s),u=i.slice(s);console.log(l.join(`
`)),console.log(t.split(`
`)[0]),console.log(`%c ${Do(c[0],a)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(u.join(`
`))}function RL(n){return gs(n,()=>n.createProgram(),"Unable to create WebGLProgram.")}function AL(n,t){if(it(n,()=>n.linkProgram(t)),!U().get("ENGINE_COMPILE_ONLY")&&n.getProgramParameter(t,n.LINK_STATUS)===!1)throw console.log(n.getProgramInfoLog(t)),new Error("Failed to link vertex and fragment shaders.")}function rp(n,t){if(it(n,()=>n.validateProgram(t)),n.getProgramParameter(t,n.VALIDATE_STATUS)===!1)throw console.log(n.getProgramInfoLog(t)),new Error("Shader program validation failed.")}function DL(n,t){const e=gs(n,()=>n.createBuffer(),"Unable to create WebGLBuffer");return it(n,()=>n.bindBuffer(n.ARRAY_BUFFER,e)),it(n,()=>n.bufferData(n.ARRAY_BUFFER,t,n.STATIC_DRAW)),e}function FL(n,t){const e=gs(n,()=>n.createBuffer(),"Unable to create WebGLBuffer");return it(n,()=>n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e)),it(n,()=>n.bufferData(n.ELEMENT_ARRAY_BUFFER,t,n.STATIC_DRAW)),e}function _L(n){return gs(n,()=>n.createTexture(),"Unable to create WebGLTexture.")}function OL(n,t){const e=U().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(n<=0||t<=0){const s=`[${n}x${t}]`;throw new Error("Requested texture size "+s+" is invalid.")}if(n>e||t>e){const s=`[${n}x${t}]`,o=`[${e}x${e}]`;throw new Error("Requested texture size "+s+" greater than WebGL maximum on this browser / GPU "+o+".")}}function LL(n){return gs(n,()=>n.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function F1(n,t,e,s,o,r,i){const a=n.getAttribLocation(t,e);return a===-1?!1:(it(n,()=>n.bindBuffer(n.ARRAY_BUFFER,s)),it(n,()=>n.vertexAttribPointer(a,o,n.FLOAT,!1,r,i)),it(n,()=>n.enableVertexAttribArray(a)),!0)}function ML(n,t,e){WL(n,e),it(n,()=>n.activeTexture(n.TEXTURE0+e)),it(n,()=>n.bindTexture(n.TEXTURE_2D,t))}function PL(n,t,e){return gs(n,()=>n.getUniformLocation(t,e),'uniform "'+e+'" not present in program.')}function BL(n,t,e){return n.getUniformLocation(t,e)}function zL(n,t,e,s){it(n,()=>ML(n,t,s)),it(n,()=>n.uniform1i(e,s))}function ip(n,t,e){it(n,()=>n.bindFramebuffer(n.FRAMEBUFFER,e)),it(n,()=>n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0))}function _1(n,t){it(n,()=>n.bindFramebuffer(n.FRAMEBUFFER,t)),it(n,()=>n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0))}function bc(n){const t=n.checkFramebufferStatus(n.FRAMEBUFFER);if(t!==n.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+VL(n,t))}function VL(n,t){switch(t){case n.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case n.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case n.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case n.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${t}`}}function gs(n,t,e){const s=it(n,()=>t());if(s==null)throw new Error(e);return s}function WL(n,t){const e=n.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,s=t+n.TEXTURE0;if(s<n.TEXTURE0||s>e){const o=`[gl.TEXTURE0, gl.TEXTURE${e}]`;throw new Error(`textureUnit must be in ${o}.`)}}function or(n,t=2){return X(n.slice(0,n.length-t))}function rr(n){if(n.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[n.length>1?n[n.length-2]:1,n[n.length-1]]}function yc(n){let t=[1,1,1];return n.length===0||n.length===1&&n[0]===1||(t=[or(n),...rr(n)]),t}function UL(n,t=!1){let e=U().getNumber("WEBGL_MAX_TEXTURE_SIZE"),s=U().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");s===1/0&&U().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(s=e/2),t&&(e=e*2,s=s*2,n=n.map((a,l)=>l>=n.length-2?Nn(n[l]):n[l]),n.length===1&&(n=[2,n[0]])),n.length!==2&&(n=xs(n).newShape);let o=X(n),r=null;n.length<=1&&o<=e?r=[1,o]:n.length===2&&n[0]<=e&&n[1]<=e?r=n:n.length===3&&n[0]*n[1]<=e&&n[2]<=e?r=[n[0]*n[1],n[2]]:n.length===3&&n[0]<=e&&n[1]*n[2]<=e?r=[n[0],n[1]*n[2]]:n.length===4&&n[0]*n[1]*n[2]<=e&&n[3]<=e?r=[n[0]*n[1]*n[2],n[3]]:n.length===4&&n[0]<=e&&n[1]*n[2]*n[3]<=e&&(r=[n[0],n[1]*n[2]*n[3]]);const i=r!=null&&Math.max(...r)>s&&Math.min(...r)<=(t?2:1)&&Math.min(...r)>0;if(r==null||i)if(t){const a=or(n);let l=2,c=2;n.length&&([l,c]=rr(n)),o=a*(l/2)*(c/2),r=Hc(o).map(u=>u*2)}else r=Hc(o);return r}function wc(n){return n%2===0}function Cc(n,t){if(n=n.slice(-2),t=t.slice(-2),Lt(n,t)||!n.length||!t.length||n[0]===0||n[1]===0||t[0]===0||t[1]===0)return!0;if(n.length!==t.length){const e=n[n.length-1],s=t[t.length-1];if(e===s||wc(e)&&wc(s)&&(n[0]===1||t[0]===1))return!0}return n[1]===t[1]&&wc(n[0])&&wc(t[0])}let ap,lp;function GL(n){if(ap==null){const t=Bn(n);ap=t.getParameter(t.MAX_TEXTURE_SIZE)}return ap}function HL(n){if(lp==null){const t=Bn(n);lp=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,lp)}function qL(n){if(n===0)return 0;let t;const e=Bn(n);return Cn(e,"EXT_disjoint_timer_query_webgl2")&&n===2?t=2:Cn(e,"EXT_disjoint_timer_query")?t=1:t=0,t}function Cn(n,t){return n.getExtension(t)!=null}function O1(n){try{if(Bn(n)!=null)return!0}catch(t){return console.log("Error when getting WebGL context: ",t),!1}return!1}function XL(n){if(n===0)return!1;const t=Bn(n);if(n===1){if(!Cn(t,"OES_texture_float"))return!1}else if(!Cn(t,"EXT_color_buffer_float"))return!1;return cp(t)}function KL(n){if(n===0)return!1;const t=Bn(n);if(n===1){if(!Cn(t,"OES_texture_float")||!Cn(t,"WEBGL_color_buffer_float"))return!1}else{if(Cn(t,"EXT_color_buffer_float"))return cp(t);const s="EXT_color_buffer_half_float";if(Cn(t,s)){const o=t.getExtension(s);return jL(t,o)}return!1}return cp(t)}function cp(n){const t=op(n),e=n.createTexture();n.bindTexture(n.TEXTURE_2D,e),n.texImage2D(n.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);const r=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,r),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0);const i=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(e),n.deleteFramebuffer(r),i}function jL(n,t){const e=op(n,t),s=n.createTexture();n.bindTexture(n.TEXTURE_2D,s),n.texImage2D(n.TEXTURE_2D,0,e.internalFormatHalfFloat,1,1,0,e.textureFormatFloat,e.textureTypeHalfFloat,null);const i=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,s,0);const a=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(s),n.deleteFramebuffer(i),a}function YL(n){return n!==2?!1:Bn(n).fenceSync!=null}function Yi(n,t){Array.isArray(n)||(n=[n]),n.forEach(e=>{e!=null&&k(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}const ut=U();ut.registerFlag("HAS_WEBGL",()=>ut.getNumber("WEBGL_VERSION")>0),ut.registerFlag("WEBGL_VERSION",()=>O1(2)?2:O1(1)?1:0),ut.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1),ut.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>ut.get("WEBGL_VERSION")===2),ut.registerFlag("WEBGL_CPU_FORWARD",()=>!0),ut.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1),ut.registerFlag("WEBGL_PACK",()=>ut.getBool("HAS_WEBGL")),ut.registerFlag("WEBGL_PACK_NORMALIZATION",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_PACK_CLIP",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_PACK_REDUCE",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_LAZILY_UNPACK",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_CONV_IM2COL",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>ut.getBool("WEBGL_PACK")),ut.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>GL(ut.getNumber("WEBGL_VERSION"))),ut.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>HL(ut.getNumber("WEBGL_VERSION"))),ut.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{const n=ut.getNumber("WEBGL_VERSION");return n===0?0:qL(n)}),ut.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>ut.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!kf()),ut.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>XL(ut.getNumber("WEBGL_VERSION"))),ut.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>ut.getBool("WEBGL_FORCE_F16_TEXTURES")?!1:ut.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")),ut.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>KL(ut.getNumber("WEBGL_VERSION"))),ut.registerFlag("WEBGL_FENCE_API_ENABLED",()=>YL(ut.getNumber("WEBGL_VERSION"))),ut.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>ut.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0),ut.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,n=>{if(typeof n!="number")throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${n}.`);if(n<0&&n!==-1)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${n}.`)}),ut.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>kf()?1:-1,n=>{if(typeof n!="number")throw new Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${n}.`);if(n<0&&n!==-1)throw new Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${n}.`)}),ut.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128),ut.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1),ut.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5),ut.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128),ut.registerFlag("WEBGL_EXP_CONV",()=>!1),ut.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>ut.getBool("IS_TEST")),ut.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0),ut.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1),ut.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1),ut.registerFlag("ENGINE_COMPILE_ONLY",()=>!1);function ze(){let n,t,e,s,o,r,i,a,l,c;return U().getNumber("WEBGL_VERSION")===2?(n="#version 300 es",t="in",e="out",s="in",o="texture",r="outputColor",i="out vec4 outputColor;",a=U().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",l="",c=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(n="",t="attribute",e="varying",s="varying",o="texture2D",r="gl_FragColor",i="",a=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,l=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,c=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:n,attribute:t,varyingVs:e,varyingFs:s,texture2D:o,output:r,defineOutput:i,defineSpecialNaN:a,defineSpecialInf:l,defineRound:c}}function Io(n,t,e="index"){const s=dt(t);return s.map((o,r)=>{const i=`int ${n[r]} = ${e} / ${o}`,a=r===s.length-1?`int ${n[r+1]} = ${e} - ${n[r]} * ${o}`:`index -= ${n[r]} * ${o}`;return`${i}; ${a};`}).join("")}function $c(n,t,e="index"){const s=dt(t);return s.map((o,r)=>{const i=`int ${n[r]} = ${e} / outShapeStrides[${r}]`,a=r===s.length-1?`int ${n[r+1]} = ${e} - ${n[r]} * outShapeStrides[${r}]`:`index -= ${n[r]} * outShapeStrides[${r}]`;return`${i}; ${a};`}).join("")}function ZL(n,t){const e=n.length,s=n.map(r=>`${t}[${r}]`),o=new Array(e-1);o[e-2]=s[e-1];for(let r=e-3;r>=0;--r)o[r]=`(${o[r+1]} * ${s[r+1]})`;return o}function QL(n,t,e="index"){const s=n.map((r,i)=>i),o=ZL(s,t);return o.map((r,i)=>{const a=`int ${n[i]} = ${e} / ${o[i]}`,l=i===o.length-1?`int ${n[i+1]} = ${e} - ${n[i]} * ${o[i]}`:`index -= ${n[i]} * ${o[i]}`;return`${a}; ${l};`}).join("")}function up(n){const t=dt(n).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function hp(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}const L1=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;const{getBroadcastDims:M1}=XS;function JL(n,t,e){const s=[];if(n.forEach(p=>{const f=X(p.shapeInfo.logicalShape);if(p.shapeInfo.isUniform?s.push(`uniform float ${p.name}${f>1?`[${f}]`:""};`):(s.push(`uniform sampler2D ${p.name};`),s.push(`uniform int offset${p.name};`)),e.enableShapeUniforms){const{uniformShape:m}=dp(e.packedInputs,p.shapeInfo.logicalShape,p.shapeInfo.texShape);switch(m.length){case 1:s.push(`uniform int ${p.name}Shape;`);break;case 2:s.push(`uniform ivec2 ${p.name}Shape;`);break;case 3:s.push(`uniform ivec3 ${p.name}Shape;`);break;case 4:s.push(`uniform ivec4 ${p.name}Shape;`);break}s.push(`uniform ivec2 ${p.name}TexShape;`)}}),e.enableShapeUniforms){switch(t.logicalShape.length){case 1:s.push("uniform int outShape;");break;case 2:s.push("uniform ivec2 outShape;"),s.push("uniform int outShapeStrides;");break;case 3:s.push("uniform ivec3 outShape;"),s.push("uniform ivec2 outShapeStrides;");break;case 4:s.push("uniform ivec4 outShape;"),s.push("uniform ivec3 outShapeStrides;");break}s.push("uniform ivec2 outTexShape;")}e.customUniforms&&e.customUniforms.forEach(p=>{s.push(`uniform ${p.type} ${p.name}${p.arrayIndex?`[${p.arrayIndex}]`:""};`)});const o=s.join(`
`),r=n.map(p=>tM(p,t,e.packedInputs,e.enableShapeUniforms)).join(`
`),i=t.texShape,a=ze(),l=sM(a);let c,u,h=iM(a);return t.isPacked?(c=eM(t.logicalShape,i,e.enableShapeUniforms),u=rM(a)):(c=nM(t.logicalShape,i,e.enableShapeUniforms),u=oM(a)),e.packedInputs&&(h+=uM),[h,l,u,o,c,r,e.userCode].join(`
`)}function ir(n,t=!1){const e=n.shapeInfo.logicalShape;switch(e.length){case 0:return $M(n,t);case 1:return vM(n,t);case 2:return SM(n,t);case 3:return TM(n,t);case 4:return RM(n,t);case 5:return AM(n);case 6:return DM(n);default:throw new Error(`${e.length}-D input sampling is not yet supported`)}}function P1(n,t){switch(n.shapeInfo.logicalShape.length){case 0:return CM(n);case 1:return IM(n,t);case 2:return kM(n,t);case 3:return NM(n,t);default:return EM(n,t)}}function tM(n,t,e=!1,s){let o="";e?o+=P1(n,s):o+=ir(n,s);const r=n.shapeInfo.logicalShape,i=t.logicalShape;return r.length<=i.length&&(e?o+=FM(n,t):o+=_M(n,t)),o}function eM(n,t,e){switch(n.length){case 0:return B1();case 1:return hM(n,t,e);case 2:return yM(n,t,e);case 3:return pM(n,t,e);default:return mM(n,t,e)}}function nM(n,t,e){switch(n.length){case 0:return B1();case 1:return dM(n,t,e);case 2:return wM(n,t,e);case 3:return fM(n,t,e);case 4:return gM(n,t,e);case 5:return xM(n,t);case 6:return bM(n,t);default:throw new Error(`${n.length}-D output sampling is not yet supported`)}}function sM(n){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${n.texture2D}(textureSampler, uv).r;
    }
  `}function oM(n){return`
    void setOutput(float val) {
      ${n.output} = vec4(val, 0, 0, 0);
    }
  `}function rM(n){return`
    void setOutput(vec4 val) {
      ${n.output} = val;
    }
  `}function iM(n){return`${n.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${n.varyingFs} vec2 resultUV;
    ${n.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${n.defineSpecialNaN}
    ${n.defineSpecialInf}
    ${n.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${aM}
    ${lM}
    ${cM}
  `}const aM=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,lM=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,cM=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,uM=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function B1(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function hM(n,t,e){const s=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];return s[0]===1?e?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${s[1]}.0);
      }
    `:s[1]===1?e?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${s[0]}.0);
      }
    `:e?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${s[0]}, ${s[1]}));
      return 2 * (resTexRC.x * ${s[1]} + resTexRC.y);
    }
  `}function dM(n,t,e){return t[0]===1?e?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${t[1]}.0);
      }
    `:t[1]===1?e?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${t[0]}.0);
      }
    `:e?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      return resTexRC.x * ${t[1]} + resTexRC.y;
    }
  `}function pM(n,t,e){if(e)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;const s=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],o=Math.ceil(n[2]/2),r=o*Math.ceil(n[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${s[0]}, ${s[1]}));
      int index = resTexRC.x * ${s[1]} + resTexRC.y;

      int b = index / ${r};
      index -= b * ${r};

      int r = 2 * (index / ${o});
      int c = imod(index, ${o}) * 2;

      return ivec3(b, r, c);
    }
  `}function fM(n,t,e){if(e)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${$c(["r","c","d"],n)}
    return ivec3(r, c, d);
  }
`;const s=Io(["r","c","d"],n);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${s}
      return ivec3(r, c, d);
    }
  `}function mM(n,t,e){if(e)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;const s=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],o=Math.ceil(n[n.length-1]/2),r=o*Math.ceil(n[n.length-2]/2);let i=r,a="",l="b, r, c";for(let c=2;c<n.length-1;c++)i*=n[n.length-c-1],a=`
      int b${c} = index / ${i};
      index -= b${c} * ${i};
    `+a,l=`b${c}, `+l;return`
    ivec${n.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${s[0]}, ${s[1]}));
      int index = resTexRC.x * ${s[1]} + resTexRC.y;

      ${a}

      int b = index / ${r};
      index -= b * ${r};

      int r = 2 * (index / ${o});
      int c = imod(index, ${o}) * 2;

      return ivec${n.length}(${l});
    }
  `}function gM(n,t,e){if(e)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${$c(["r","c","d","d2"],n)}
      return ivec4(r, c, d, d2);
    }
  `;const s=Io(["r","c","d","d2"],n);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${s}
      return ivec4(r, c, d, d2);
    }
  `}function xM(n,t){const e=Io(["r","c","d","d2","d3"],n);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},
                             ${t[1]}));

      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${e}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function bM(n,t){const e=Io(["r","c","d","d2","d3","d4"],n);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${e}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function yM(n,t,e){const s=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(Lt(n,t))return e?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${s[0]}, ${s[1]}));
      }
    `;const o=Math.ceil(n[1]/2);return e?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${s[0]}, ${s[1]}));

      int index = resTexRC.x * ${s[1]} + resTexRC.y;
      int r = 2 * (index / ${o});
      int c = imod(index, ${o}) * 2;

      return ivec2(r, c);
    }
  `}function wM(n,t,e){return Lt(n,t)?e?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));
      }
    `:n[1]===1?e?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:n[0]===1?e?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:e?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      int r = index / ${n[1]};
      int c = index - r * ${n[1]};
      return ivec2(r, c);
    }
  `}function vo(n){return`offset${n}`}function CM(n){const t=n.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),s=ze();return`
    vec4 ${e}() {
      return ${s.texture2D}(${t}, halfCR);
    }
  `}function $M(n,t){const e=n.name,s="get"+e.charAt(0).toUpperCase()+e.slice(1);if(n.shapeInfo.isUniform)return`float ${s}() {return ${e};}`;const[o,r]=n.shapeInfo.texShape;if(o===1&&r===1)return`
      float ${s}() {
        return sampleTexture(${e}, halfCR);
      }
    `;const i=vo(e);if(t)return`
    float ${s}() {
      vec2 uv = uvFromFlat(${e}TexShape[0], ${e}TexShape[1], ${i});
      return sampleTexture(${e}, uv);
    }
  `;const[a,l]=n.shapeInfo.texShape;return`
    float ${s}() {
      vec2 uv = uvFromFlat(${a}, ${l}, ${i});
      return sampleTexture(${e}, uv);
    }
  `}function IM(n,t){const e=n.name,s="get"+e.charAt(0).toUpperCase()+e.slice(1),o=n.shapeInfo.texShape,r=ze();if(t)return`
    vec4 ${s}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${e}TexShape[0]) / 2.0), ceil(float(${e}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${r.texture2D}(${e}, uv);
    }
  `;const i=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];return`
    vec4 ${s}(int index) {
      vec2 uv = packedUVfrom1D(
        ${i[0]}, ${i[1]}, index);
      return ${r.texture2D}(${e}, uv);
    }
  `}function vM(n,t){const e=n.name,s="get"+e.charAt(0).toUpperCase()+e.slice(1);if(n.shapeInfo.isUniform)return`
      float ${s}(int index) {
        ${ar(n)}
      }
    `;const o=n.shapeInfo.texShape,r=o[0],i=o[1];if(i===1&&r===1)return`
      float ${s}(int index) {
        return sampleTexture(${e}, halfCR);
      }
    `;const a=vo(e);return i===1?t?`
      float ${s}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${a}) + 0.5) / float(${e}TexShape[0]));
        return sampleTexture(${e}, uv);
      }
    `:`
      float ${s}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${a}) + 0.5) / ${r}.0);
        return sampleTexture(${e}, uv);
      }
    `:r===1?t?`
      float ${s}(int index) {
        vec2 uv = vec2((float(index + ${a}) + 0.5) / float(${e}TexShape[1]), 0.5);
        return sampleTexture(${e}, uv);
      }
    `:`
      float ${s}(int index) {
        vec2 uv = vec2((float(index + ${a}) + 0.5) / ${i}.0, 0.5);
        return sampleTexture(${e}, uv);
      }
    `:t?`
    float ${s}(int index) {
      vec2 uv = uvFromFlat(${e}TexShape[0], ${e}TexShape[1], index + ${a});
      return sampleTexture(${e}, uv);
    }
  `:`
    float ${s}(int index) {
      vec2 uv = uvFromFlat(${r}, ${i}, index + ${a});
      return sampleTexture(${e}, uv);
    }
  `}function kM(n,t){const e=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=n.shapeInfo.texShape,i=r[0],a=r[1],l=ze();if(r!=null&&Lt(e,r))return t?`
      vec4 ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}TexShape[1], ${s}TexShape[0]);

        return ${l.texture2D}(${s}, uv);
      }
    `:`
      vec4 ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${a}.0, ${i}.0);

        return ${l.texture2D}(${s}, uv);
      }
    `;if(t)return`
    vec4 ${o}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${s}TexShape[0]) / 2.0), ceil(float(${s}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${s}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${l.texture2D}(${s}, uv);
    }
  `;const c=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)],u=Math.ceil(e[1]/2);return`
    vec4 ${o}(int row, int col) {
      vec2 uv = packedUVfrom2D(${u}, ${c[0]}, ${c[1]}, row, col);
      return ${l.texture2D}(${s}, uv);
    }
  `}function SM(n,t){const e=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=n.shapeInfo.texShape;if(r!=null&&Lt(e,r)){if(t)return`
      float ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}TexShape[1], ${s}TexShape[0]);
        return sampleTexture(${s}, uv);
      }
    `;const d=r[0],p=r[1];return`
    float ${o}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${p}.0, ${d}.0);
      return sampleTexture(${s}, uv);
    }
  `}const{newShape:i,keptDims:a}=xs(e),l=i;if(l.length<e.length){const d=lr(n,l),p=["row","col"];return`
      ${ir(d,t)}
      float ${o}(int row, int col) {
        return ${o}(${cr(p,a)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${o}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${e[1]}, 1)));
        ${ar(n)}
      }
    `;const c=r[0],u=r[1],h=vo(s);return u===1?t?`
      float ${o}(int row, int col) {
        float index = dot(vec3(row, col, ${h}), vec3(${s}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${s}TexShape[0]));
        return sampleTexture(${s}, uv);
      }
    `:`
    float ${o}(int row, int col) {
      float index = dot(vec3(row, col, ${h}), vec3(${e[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
      return sampleTexture(${s}, uv);
    }
  `:c===1?t?`
      float ${o}(int row, int col) {
        float index = dot(vec3(row, col, ${h}), vec3(${s}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${s}TexShape[1]), 0.5);
        return sampleTexture(${s}, uv);
      }
    `:`
    float ${o}(int row, int col) {
      float index = dot(vec3(row, col, ${h}), vec3(${e[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${u}.0, 0.5);
      return sampleTexture(${s}, uv);
    }
  `:t?`
      float ${o}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${s}Shape[1] + col + ${h};
        vec2 uv = uvFromFlat(${s}TexShape[0], ${s}TexShape[1], index);
        return sampleTexture(${s}, uv);
      }
    `:`
  float ${o}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${e[1]} + col + ${h};
    vec2 uv = uvFromFlat(${c}, ${u}, index);
    return sampleTexture(${s}, uv);
  }
`}function NM(n,t){const e=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=n.shapeInfo.texShape,i=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)];if(e[0]===1){const d=e.slice(1),p=[1,2],f=lr(n,d),m=["b","row","col"];return`
        ${P1(f,t)}
        vec4 ${o}(int b, int row, int col) {
          return ${o}(${cr(m,p)});
        }
      `}const a=ze();if(t)return`
    vec4 ${o}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${s}TexShape[0]) / 2.0), ceil(float(${s}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${s}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${s}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${a.texture2D}(${s}, uv);
    }
  `;const l=i[0],c=i[1],u=Math.ceil(e[2]/2),h=u*Math.ceil(e[1]/2);return`
    vec4 ${o}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${c}, ${h}, ${u}, b, row, col);
      return ${a.texture2D}(${s}, uv);
    }
  `}function TM(n,t){const e=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=e[1]*e[2],i=e[2],{newShape:a,keptDims:l}=xs(e),c=a;if(c.length<e.length){const m=lr(n,c),g=["row","col","depth"];return`
        ${ir(m,t)}
        float ${o}(int row, int col, int depth) {
          return ${o}(${cr(g,l)});
        }
      `}if(n.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${r}, ${i}, 1)));
        ${ar(n)}
      }
    `;const u=n.shapeInfo.texShape,h=u[0],d=u[1],p=n.shapeInfo.flatOffset;if(d===r&&p==null)return t?`
      float ${o}(int row, int col, int depth) {
        int stride1 = ${s}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${s}TexShape[1], ${s}TexShape[0]);
        return sampleTexture(${s}, uv);
      }
    `:`
        float ${o}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${i}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${d}.0, ${h}.0);
          return sampleTexture(${s}, uv);
        }
      `;if(d===i&&p==null)return t?`
      float ${o}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${s}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${s}TexShape[1], ${s}TexShape[0]);
        return sampleTexture(${s}, uv);
      }
    `:`
    float ${o}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${e[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}.0, ${h}.0);
      return sampleTexture(${s}, uv);
    }
  `;const f=vo(s);return t?`
    float ${o}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${s}Shape[1] * ${s}Shape[2];
      int stride1 = ${s}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${f};
      vec2 uv = uvFromFlat(${s}TexShape[0], ${s}TexShape[1], index);
      return sampleTexture(${s}, uv);
    }
    `:`
      float ${o}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${r} + col * ${i} + depth + ${f};
        vec2 uv = uvFromFlat(${h}, ${d}, index);
        return sampleTexture(${s}, uv);
      }
  `}function EM(n,t){const e=n.name,s="get"+e.charAt(0).toUpperCase()+e.slice(1),o=ze();if(t)return`
    vec4 ${s}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${e}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${e}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${e}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${e}TexShape[0]) / 2.0), ceil(float(${e}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${o.texture2D}(${e}, uv);
    }
  `;const r=n.shapeInfo.logicalShape,i=r.length,a=n.shapeInfo.texShape,l=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)],c=l[0],u=l[1],h=Math.ceil(r[i-1]/2);let d=h*Math.ceil(r[i-2]/2),p="int b, int row, int col",f=`b * ${d} + (row / 2) * ${h} + (col / 2)`;for(let m=2;m<i-1;m++)p=`int b${m}, `+p,d*=r[i-m-1],f=`b${m} * ${d} + `+f;return`
    vec4 ${s}(${p}) {
      int index = ${f};
      int texR = index / ${u};
      int texC = index - texR * ${u};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${u}, ${c});
      return ${o.texture2D}(${e}, uv);
    }
  `}function RM(n,t){const e=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=e[3],i=e[2]*r,a=e[1]*i,{newShape:l,keptDims:c}=xs(e);if(l.length<e.length){const b=lr(n,l),w=["row","col","depth","depth2"];return`
      ${ir(b,t)}
      float ${o}(int row, int col, int depth, int depth2) {
        return ${o}(${cr(w,c)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${a}, ${i}, ${r}, 1)));
        ${ar(n)}
      }
    `;const u=n.shapeInfo.flatOffset,h=n.shapeInfo.texShape,d=h[0],p=h[1],f=`int stride2 = ${s}Shape[3];`,m=`int stride1 = ${s}Shape[2] * stride2;`,g=`int stride0 = ${s}Shape[1] * stride1;`;if(p===a&&u==null)return t?`
      float ${o}(int row, int col, int depth, int depth2) {
        ${f}
        ${m}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${s}TexShape[1], ${s}TexShape[0]);
        return sampleTexture(${s}, uv);
      }
    `:`
      float ${o}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${i}, ${r}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${p}.0, ${d}.0);
        return sampleTexture(${s}, uv);
      }
    `;if(p===r&&u==null)return t?`
      float ${o}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${s}Shape[1] * ${s}Shape[2], ${s}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${s}TexShape[1], ${s}TexShape[0]);
        return sampleTexture(${s}, uv);
      }
    `:`
      float ${o}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${e[1]*e[2]}, ${e[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${d}.0);
        return sampleTexture(${s}, uv);
      }
    `;const x=vo(s);return t?`
    float ${o}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${f}
      ${m}
      ${g}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${s}TexShape[0], ${s}TexShape[1], index + ${x});
      return sampleTexture(${s}, uv);
    }
  `:`
    float ${o}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${a} + col * ${i} +
          depth * ${r} + depth2;
      vec2 uv = uvFromFlat(${d}, ${p}, index + ${x});
      return sampleTexture(${s}, uv);
    }
  `}function AM(n){const t=n.shapeInfo.logicalShape,e=n.name,s="get"+e.charAt(0).toUpperCase()+e.slice(1),o=t[4],r=t[3]*o,i=t[2]*r,a=t[1]*i,{newShape:l,keptDims:c}=xs(t);if(l.length<t.length){const m=lr(n,l),g=["row","col","depth","depth2","depth3"];return`
      ${ir(m)}
      float ${s}(int row, int col, int depth, int depth2, int depth3) {
        return ${s}(${cr(g,c)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${s}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${a}, ${i}, ${r}, ${o})) +
          depth3;
        ${ar(n)}
      }
    `;const u=n.shapeInfo.flatOffset,h=n.shapeInfo.texShape,d=h[0],p=h[1];if(p===a&&u==null)return`
      float ${s}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${i}, ${r}, ${o}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${p}.0, ${d}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(p===o&&u==null)return`
      float ${s}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]},
               ${t[2]*t[3]}, ${t[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${d}.0);
        return sampleTexture(${e}, uv);
      }
    `;const f=vo(e);return`
    float ${s}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${a} + col * ${i} + depth * ${r} +
          depth2 * ${o} + depth3 + ${f};
      vec2 uv = uvFromFlat(${d}, ${p}, index);
      return sampleTexture(${e}, uv);
    }
  `}function DM(n){const t=n.shapeInfo.logicalShape,e=n.name,s="get"+e.charAt(0).toUpperCase()+e.slice(1),{newShape:o,keptDims:r}=xs(t);if(o.length<t.length){const g=lr(n,o),x=["row","col","depth","depth2","depth3","depth4"];return`
      ${ir(g)}
      float ${s}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${s}(${cr(x,r)});
      }
    `}const i=t[5],a=t[4]*i,l=t[3]*a,c=t[2]*l,u=t[1]*c;if(n.shapeInfo.isUniform)return`
      float ${s}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${c}, ${l}, ${a})) +
          dot(
            vec2(depth3, depth4),
            vec2(${i}, 1)));
        ${ar(n)}
      }
    `;const h=n.shapeInfo.flatOffset,d=n.shapeInfo.texShape,p=d[0],f=d[1];if(f===u&&h==null)return`
      float ${s}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${c}, ${l}, ${a}, ${i})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${p}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(f===i&&h==null)return`
      float ${s}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]*t[4]},
               ${t[2]*t[3]*t[4]},
               ${t[3]*t[4]},
               ${t[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${p}.0);
        return sampleTexture(${e}, uv);
      }
    `;const m=vo(e);return`
    float ${s}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${c} + depth * ${l} +
          depth2 * ${a} + depth3 * ${i} + depth4 + ${m};
      vec2 uv = uvFromFlat(${p}, ${f}, index);
      return sampleTexture(${e}, uv);
    }
  `}function ar(n){const t=n.name,e=X(n.shapeInfo.logicalShape);return e<2?`return ${t};`:`
    for (int i = 0; i < ${e}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function FM(n,t){const e=n.name,s=e.charAt(0).toUpperCase()+e.slice(1),o="get"+s+"AtOutCoords",r=n.shapeInfo.logicalShape.length,i=t.logicalShape.length,a=M1(n.shapeInfo.logicalShape,t.logicalShape),l=Ut(i),c=i-r;let u;const h=["x","y","z","w","u","v"];r===0?u="":i<2&&a.length>=1?u="coords = 0;":u=a.map(b=>`coords.${h[b+c]} = 0;`).join(`
`);let d="";i<2&&r>0?d="coords":d=n.shapeInfo.logicalShape.map((b,w)=>`coords.${h[w+c]}`).join(", ");let p="return outputValue;";const m=X(n.shapeInfo.logicalShape)===1,x=X(t.logicalShape)===1;if(r===1&&!m&&!x)p=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(m&&!x)i===1?p=`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:p=`
        return vec4(outputValue.x);
      `;else if(a.length){const b=r-2,w=r-1;a.indexOf(b)>-1&&a.indexOf(w)>-1?p="return vec4(outputValue.x);":a.indexOf(b)>-1?p="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":a.indexOf(w)>-1&&(p="return vec4(outputValue.xx, outputValue.zz);")}return`
    vec4 ${o}() {
      ${l} coords = getOutputCoords();
      ${u}
      vec4 outputValue = get${s}(${d});
      ${p}
    }
  `}function _M(n,t){const e=n.name,s=e.charAt(0).toUpperCase()+e.slice(1),o="get"+s+"AtOutCoords",r=t.texShape,i=n.shapeInfo.texShape,a=n.shapeInfo.logicalShape.length,l=t.logicalShape.length;if(!n.shapeInfo.isUniform&&a===l&&n.shapeInfo.flatOffset==null&&Lt(i,r))return`
      float ${o}() {
        return sampleTexture(${e}, resultUV);
      }
    `;const c=Ut(l),u=M1(n.shapeInfo.logicalShape,t.logicalShape),h=l-a;let d;const p=["x","y","z","w","u","v"];a===0?d="":l<2&&u.length>=1?d="coords = 0;":d=u.map(m=>`coords.${p[m+h]} = 0;`).join(`
`);let f="";return l<2&&a>0?f="coords":f=n.shapeInfo.logicalShape.map((m,g)=>`coords.${p[g+h]}`).join(", "),`
    float ${o}() {
      ${c} coords = getOutputCoords();
      ${d}
      return get${s}(${f});
    }
  `}function Ut(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function dp(n,t,e){const{newShape:s,keptDims:o}=xs(t),r=t.length,i=n&&r===3&&t[0]===1,a=i?t.slice(1):s,l=!n&&r>1&&!Lt(t,e)&&s.length<r||i;return{useSqueezeShape:l,uniformShape:l?a:t,keptDims:o}}function lr(n,t){const e=JSON.parse(JSON.stringify(n));return e.shapeInfo.logicalShape=t,e}function cr(n,t){return t.map(e=>n[e]).join(", ")}function OM(n,t,e,s){const o=e.map((u,h)=>{const d={logicalShape:u.shape,texShape:u.isUniform?null:u.texData.texShape,isUniform:u.isUniform,isPacked:u.isUniform?!1:u.texData.isPacked,flatOffset:null};return u.texData!=null&&u.texData.slice!=null&&u.texData.slice.flatOffset>0&&(d.flatOffset=u.texData.slice.flatOffset),{name:t.variableNames[h],shapeInfo:d}}),r=o.map(u=>u.shapeInfo),i={logicalShape:s.shape,texShape:s.texData.texShape,isUniform:!1,isPacked:s.texData.isPacked,flatOffset:null},a=JL(o,i,t),l=TL(n.gl,a),c=n.createProgram(l);return U().get("ENGINE_COMPILE_ONLY")?{program:t,fragmentShader:l,source:a,webGLProgram:c,inShapeInfos:r,outShapeInfo:i,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(n.buildVao(c),Object.assign({program:t,fragmentShader:l,source:a,webGLProgram:c,inShapeInfos:r,outShapeInfo:i},z1(n,t,c)))}function z1(n,t,e){const s=[],o=[];let r,i,a,l=null,c=null;c=n.getUniformLocation(e,"NAN",!1),U().getNumber("WEBGL_VERSION")===1&&(l=n.getUniformLocation(e,"INFINITY",!1));const u=!1;for(const h of t.variableNames){const d={name:h,uniform:n.getUniformLocation(e,h,u),offset:n.getUniformLocation(e,`offset${h}`,u)};t.enableShapeUniforms&&(d.shape=n.getUniformLocation(e,`${h}Shape`,u),d.texShape=n.getUniformLocation(e,`${h}TexShape`,u)),s.push(d)}if(t.enableShapeUniforms&&(r=n.getUniformLocation(e,"outShape",u),a=n.getUniformLocation(e,"outShapeStrides",u),i=n.getUniformLocation(e,"outTexShape",u)),t.customUniforms)for(const h of t.customUniforms)o.push(n.getUniformLocation(e,h.name,u));return{variablesLocations:s,customUniformLocations:o,infLoc:l,nanLoc:c,outShapeLocation:r,outShapeStridesLocation:a,outTexShapeLocation:i}}function V1(n,t){if(n.length!==t.length)throw Error(`Binary was compiled with ${n.length} inputs, but was executed with ${t.length} inputs`);n.forEach((e,s)=>{const o=e.logicalShape,r=t[s],i=r.shape;if(!Lt(o,i))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${o} and ${i} must match`);if(e.isUniform&&r.isUniform)return;const a=e.texShape,l=r.isUniform?null:r.texData.texShape;if(!Lt(a,l))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${a} and ${l} must match`)})}function LM(n,t,e,s,o){t.program.enableShapeUniforms||(V1(t.inShapeInfos,e),V1([t.outShapeInfo],[s]));const r=s.texData.texture,i=s.texData.texShape;s.texData.isPacked?n.setOutputPackedMatrixTexture(r.texture,i[0],i[1]):n.setOutputMatrixTexture(r.texture,i[0],i[1]),n.setProgram(t.webGLProgram),n.bindVertexArray(t.webGLProgram.vao),U().getNumber("WEBGL_VERSION")===1&&t.infLoc!==null&&n.gl.uniform1f(t.infLoc,1/0),t.nanLoc!==null&&n.gl.uniform1f(t.nanLoc,NaN);for(let l=0;l<e.length;++l){const c=e[l],{uniform:u,offset:h,shape:d,texShape:p}=t.variablesLocations[l];if(d){const{uniformShape:f}=dp(t.program.packedInputs,c.shape,c.texData.texShape);switch(f.length){case 1:n.gl.uniform1iv(d,new Int32Array(f));break;case 2:n.gl.uniform2iv(d,new Int32Array(f));break;case 3:n.gl.uniform3iv(d,new Int32Array(f));break;case 4:n.gl.uniform4iv(d,new Int32Array(f));break}}if(p&&n.gl.uniform2i(p,c.texData.texShape[0],c.texData.texShape[1]),u!=null){if(c.isUniform){if(X(c.shape)<2)n.gl.uniform1f(u,c.uniformValues[0]);else{let f=c.uniformValues;f instanceof Float32Array||(f=new Float32Array(f)),n.gl.uniform1fv(u,f)}continue}c.texData.slice!=null&&h!=null&&n.gl.uniform1i(h,c.texData.slice.flatOffset),n.setInputMatrixTexture(c.texData.texture.texture,u,l)}}const a=t.outShapeLocation;if(a)switch(s.shape.length){case 1:n.gl.uniform1iv(a,new Int32Array(s.shape));break;case 2:n.gl.uniform2iv(a,new Int32Array(s.shape));break;case 3:n.gl.uniform3iv(a,new Int32Array(s.shape));break;case 4:n.gl.uniform4iv(a,new Int32Array(s.shape));break}if(t.outShapeStridesLocation){const l=dt(s.shape);switch(s.shape.length){case 2:n.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(l));break;case 3:n.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(l));break;case 4:n.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(l));break}}if(t.outTexShapeLocation&&n.gl.uniform2i(t.outTexShapeLocation,s.texData.texShape[0],s.texData.texShape[1]),t.program.customUniforms&&o)for(let l=0;l<t.program.customUniforms.length;++l){const c=t.program.customUniforms[l],u=t.customUniformLocations[l],h=o[l];if(c.type==="float")n.gl.uniform1fv(u,h);else if(c.type==="vec2")n.gl.uniform2fv(u,h);else if(c.type==="vec3")n.gl.uniform3fv(u,h);else if(c.type==="vec4")n.gl.uniform4fv(u,h);else if(c.type==="int")n.gl.uniform1iv(u,h);else if(c.type==="ivec2")n.gl.uniform2iv(u,h);else if(c.type==="ivec3")n.gl.uniform3iv(u,h);else if(c.type==="ivec4")n.gl.uniform4iv(u,h);else throw Error(`uniform type ${c.type} is not supported yet.`)}n.executeProgram()}function MM(n,t,e){let s="";t.concat(e).forEach(i=>{const a=i.texData!=null&&i.texData.slice!=null&&i.texData.slice.flatOffset>0;if(n.enableShapeUniforms&&!i.isUniform){const l=i.texData.texShape,{useSqueezeShape:c,uniformShape:u,keptDims:h}=dp(n.packedInputs,i.shape,l);let d="",p="",f="";if(u.length===1&&n.packedInputs){const $=[Math.ceil(l[0]/2),Math.ceil(l[1]/2)];d=`${$[0]>1}_${$[1]>1}`}else if(u.length===2&&!n.packedInputs)p=`${u[0]>1}_${u[1]>1}`;else if(u.length>2&&!n.packedInputs){const $=dt(u);f=`${$[0]===l[1]}_${$[$.length-1]===l[1]}`}const m=i.shape.length,g=u.length===2&&Lt(i.shape,l),x=X(i.shape)===1,b=Uo(i.shape,e.shape),w=!n.packedInputs&&m===e.shape.length&&Lt(l,e.texData.texShape),y=n.packedInputs||u.length>2?"":`${l[0]>1}_${l[1]>1}`;s+=`${m}_${w}_${c?h:""}_${u.length}_${x}_${b}_${g}_${d}_${p}_${f}_${y}_${a}`}else{const l=i.isUniform?"uniform":i.texData.texShape;s+=`${i.shape}_${l}_${a}`}});const o=n.userCode;let r=n.constructor.name;return r+="_"+s+"_"+o+`${U().getNumber("WEBGL_VERSION")}`,r}function Oe(n){return U().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&n<=4}class PM{constructor(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=Ki.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];const e=ze();this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?$c(["r","c","d"],t):Io(["r","c","d"],t)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${e.output} = result;
      }
    `}}class BM{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=Ki.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];const e=ze();this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?$c(["r","c","d"],t):Io(["r","c","d"],t)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${e.output} = result;
      }
    `}}class zM{constructor(t){this.variableNames=["A"],this.outTexUsage=hn.DOWNLOAD;const e=ze();this.outputShape=t,this.userCode=`
      ${L1}

      void main() {
        float x = getAAtOutCoords();
        ${e.output} = encode_float(x);
      }
    `}}class VM{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=hn.DOWNLOAD;const e=ze();this.outputShape=t,this.userCode=`
      ${L1}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${e.output} = encode_float(x);
      }
    `}}const WM={R:0,G:1,B:2,A:3};class W1{constructor(t,e=!1,s="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];const o=ze();this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length);let r="result";e&&(r="floor(result * 255. + 0.5)");let i="";for(let a=0;a<s.length;a++){const l=s[a];i+=`
          if(offset == ${a}) {
            result = values[${WM[l]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?hp():up(t)}

      void main() {
        ivec3 coords = getOutputCoords();
        int flatIndex = getFlatIndex(coords);
        float result = 0.;
        int offset = imod(flatIndex, ${s.length});

        flatIndex = idiv(flatIndex, ${s.length}, 1.);

        int r = flatIndex / texShape[1];
        if (r < texShape[0]) {
          int c = imod(flatIndex, texShape[1]);
          vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
          vec4 values = ${o.texture2D}(A, uv);
          ${i}
        }
        ${o.output} = vec4(${r}, 0., 0., 0.);
      }
    `}}class UM{constructor(t,e=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];const s=ze();this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length);let o="",r="result";e&&(r="floor(result * 255. + 0.5)");for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){const l=i*2+a;o+=`
          localCoords = coords;
          if(localCoords[2] + ${a} < ${this.enableShapeUniforms?"outShape[2]":`${t[2]}`}) {
          localCoords[2] += ${a};
          if (localCoords[1] + ${i} < ${this.enableShapeUniforms?"outShape[1]":`${t[1]}`}) {
            localCoords[1] += ${i};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${s.texture2D}(A, uv);

            if (offset == 0) {
              result[${l}] = values[0];
            } else if (offset == 1) {
              result[${l}] = values[1];
            } else if (offset == 2) {
              result[${l}] = values[2];
            } else {
              result[${l}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?hp():up(t)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${o}

          ${s.output} = ${r};
        }
    `}}function GM(n){const t=ze(),e=`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return NL(n,e)}function HM(n){const t=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return DL(n,t)}function qM(n){const t=new Uint16Array([0,1,2,2,1,3]);return FL(n,t)}function Zi(n,t,e,s,o,r){OL(t,e);const i=_L(n),a=n.TEXTURE_2D;return it(n,()=>n.bindTexture(a,i)),it(n,()=>n.texParameteri(a,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE)),it(n,()=>n.texParameteri(a,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)),it(n,()=>n.texParameteri(a,n.TEXTURE_MIN_FILTER,n.NEAREST)),it(n,()=>n.texParameteri(a,n.TEXTURE_MAG_FILTER,n.NEAREST)),U().getNumber("WEBGL_VERSION")===1?it(n,()=>n.texImage2D(a,0,s,t,e,0,o,r,null)):it(n,()=>n.texStorage2D(a,1,s,t,e)),it(n,()=>n.bindTexture(n.TEXTURE_2D,null)),{texture:i,texShape:[e,t]}}function U1(n){return n.internalFormatFloat}function XM(n,t,e,s){const[o,r]=ji(t,e);return Zi(n,o,r,U1(s),s.textureFormatFloat,n.FLOAT)}function G1(n){return n.internalFormatHalfFloat}function KM(n,t,e,s){const[o,r]=ji(t,e);return Zi(n,o,r,G1(s),s.textureFormatFloat,s.textureTypeHalfFloat)}function H1(n){return n.downloadTextureFormat}function jM(n,t,e,s){const[o,r]=ji(t,e);return Zi(n,o,r,H1(s),n.RGBA,n.UNSIGNED_BYTE)}function q1(n){return n.internalFormatPackedFloat}function YM(n,t,e,s){const[o,r]=sr(t,e);return Zi(n,o,r,q1(s),n.RGBA,n.FLOAT)}function X1(n){return n.internalFormatPackedHalfFloat}function ZM(n,t,e,s){const[o,r]=sr(t,e);return Zi(n,o,r,X1(s),n.RGBA,s.textureTypeHalfFloat)}function QM(n,t,e){return it(n,()=>n.bindBuffer(n.ARRAY_BUFFER,e)),F1(n,t,"clipSpacePos",e,3,20,0)&&F1(n,t,"uv",e,2,20,12)}function JM(n,t,e,s,o,r){it(n,()=>n.bindTexture(n.TEXTURE_2D,t));let i,a,l;o instanceof Uint8Array?(i=new Uint8Array(e*s*4),a=n.UNSIGNED_BYTE,l=n.RGBA):(i=new Float32Array(e*s*4),a=n.FLOAT,l=r.internalFormatPackedFloat),i.set(o),U().getNumber("WEBGL_VERSION")===2?it(n,()=>n.texSubImage2D(n.TEXTURE_2D,0,0,0,e,s,n.RGBA,a,i)):it(n,()=>n.texImage2D(n.TEXTURE_2D,0,l,e,s,0,n.RGBA,a,i)),it(n,()=>n.bindTexture(n.TEXTURE_2D,null))}function tP(n,t,e){it(n,()=>n.bindTexture(n.TEXTURE_2D,t)),e.data instanceof Uint8Array?U().getNumber("WEBGL_VERSION")===2?it(n,()=>n.texSubImage2D(n.TEXTURE_2D,0,0,0,e.width,e.height,n.RGBA,n.UNSIGNED_BYTE,e.data)):it(n,()=>n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e.width,e.height,0,n.RGBA,n.UNSIGNED_BYTE,e.data)):U().getNumber("WEBGL_VERSION")===2?it(n,()=>n.texSubImage2D(n.TEXTURE_2D,0,0,0,n.RGBA,n.UNSIGNED_BYTE,e)):it(n,()=>n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e)),it(n,()=>n.bindTexture(n.TEXTURE_2D,null))}function eP(n,t,e,s){const o=n.createBuffer();it(n,()=>n.bindBuffer(n.PIXEL_PACK_BUFFER,o));const a=4*4*t*e;return it(n,()=>n.bufferData(n.PIXEL_PACK_BUFFER,a,n.STREAM_READ)),it(n,()=>n.readPixels(0,0,e,t,n.RGBA,n.FLOAT,0)),it(n,()=>n.bindBuffer(n.PIXEL_PACK_BUFFER,null)),o}function nP(n,t,e){const s=n,o=new Float32Array(e);return s.bindBuffer(s.PIXEL_PACK_BUFFER,t),s.getBufferSubData(s.PIXEL_PACK_BUFFER,0,o),s.bindBuffer(s.PIXEL_PACK_BUFFER,null),o}function sP(n,t,e,s){const[o,r]=ji(t,e),i=4,a=new Uint8Array(wL(t*e,i));return it(n,()=>n.readPixels(0,0,o,r,s.downloadTextureFormat,n.UNSIGNED_BYTE,a)),new Float32Array(a.buffer)}function oP(n,t,e,s,o,r,i,a){const l=n,c=new Float32Array(CL(r,i));return l.bindBuffer(l.PIXEL_PACK_BUFFER,t),l.getBufferSubData(l.PIXEL_PACK_BUFFER,0,c),l.bindBuffer(l.PIXEL_PACK_BUFFER,null),c}function rP(n,t,e){const s=new Float32Array(t*e*4);return it(n,()=>n.readPixels(0,0,e,t,n.RGBA,n.FLOAT,s)),s}class pp{constructor(t){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];const e=U().getNumber("WEBGL_VERSION");if(t!=null?(this.gl=t,xL(e,t)):this.gl=Bn(e),t=this.gl,U().getNumber("WEBGL_VERSION")===2){const r=t;this.createVertexArray=()=>it(r,()=>r.createVertexArray()),this.bindVertexArray=i=>it(r,()=>r.bindVertexArray(i)),this.deleteVertexArray=i=>it(r,()=>r.deleteVertexArray(i)),this.getVertexArray=()=>it(r,()=>r.getParameter(r.VERTEX_ARRAY_BINDING))}else if(t!=null){const r=t.getExtension("OES_vertex_array_object");if(r==null)throw new Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>it(t,()=>r.createVertexArrayOES()),this.bindVertexArray=i=>it(t,()=>r.bindVertexArrayOES(i)),this.deleteVertexArray=i=>it(t,()=>r.deleteVertexArrayOES(i)),this.getVertexArray=()=>it(t,()=>t.getParameter(r.VERTEX_ARRAY_BINDING_OES))}let s="WEBGL_color_buffer_float";const o="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),U().getNumber("WEBGL_VERSION")===1){const r="OES_texture_float",i="OES_texture_half_float";if(this.textureFloatExtension=xc(this.gl,r),Cn(this.gl,i))this.textureHalfFloatExtension=xc(this.gl,i);else if(U().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(s),Cn(this.gl,o))this.colorBufferHalfFloatExtension=xc(this.gl,o);else if(U().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(s="EXT_color_buffer_float",Cn(this.gl,s))this.colorBufferFloatExtension=this.gl.getExtension(s);else if(Cn(this.gl,o))this.colorBufferHalfFloatExtension=this.gl.getExtension(o);else throw new Error("GL context does not support color renderable floats");this.vertexBuffer=HM(this.gl),this.indexBuffer=qM(this.gl),this.framebuffer=LL(this.gl),this.textureConfig=op(this.gl,this.textureHalfFloatExtension)}get debug(){return U().getBool("DEBUG")}dispose(){if(this.disposed)return;this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");const t=this.gl;it(t,()=>t.finish()),it(t,()=>t.bindFramebuffer(t.FRAMEBUFFER,null)),it(t,()=>t.deleteFramebuffer(this.framebuffer)),it(t,()=>t.bindBuffer(t.ARRAY_BUFFER,null)),it(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null)),it(t,()=>t.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(t,e){return this.throwIfDisposed(),XM(this.gl,t,e,this.textureConfig)}createFloat16MatrixTexture(t,e){return this.throwIfDisposed(),KM(this.gl,t,e,this.textureConfig)}createUnsignedBytesMatrixTexture(t,e){return this.throwIfDisposed(),jM(this.gl,t,e,this.textureConfig)}uploadPixelDataToTexture(t,e){this.throwIfDisposed(),tP(this.gl,t,e)}uploadDenseMatrixToTexture(t,e,s,o){this.throwIfDisposed(),JM(this.gl,t,e,s,o,this.textureConfig)}createFloat16PackedMatrixTexture(t,e){return this.throwIfDisposed(),ZM(this.gl,t,e,this.textureConfig)}createPackedMatrixTexture(t,e){return this.throwIfDisposed(),YM(this.gl,t,e,this.textureConfig)}deleteMatrixTexture(t){this.throwIfDisposed(),this.outputTexture===t&&(_1(this.gl,this.framebuffer),this.outputTexture=null),it(this.gl,()=>this.gl.deleteTexture(t))}downloadByteEncodedFloatMatrixFromOutputTexture(t,e,s){return this.downloadMatrixDriver(t,()=>sP(this.gl,e,s,this.textureConfig))}downloadPackedMatrixFromBuffer(t,e,s,o,r,i){return oP(this.gl,t,e,s,o,r,i,this.textureConfig)}downloadFloat32MatrixFromBuffer(t,e){return nP(this.gl,t,e)}createBufferFromTexture(t,e,s){this.bindTextureToFrameBuffer(t);const o=eP(this.gl,e,s,this.textureConfig);return this.unbindTextureToFrameBuffer(),o}createAndWaitForFence(){const t=this.createFence(this.gl);return this.pollFence(t)}createFence(t){let e,s;if(U().getBool("WEBGL_FENCE_API_ENABLED")){const o=t,r=o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE,0);t.flush(),s=()=>{const i=o.clientWaitSync(r,0,0);return i===o.ALREADY_SIGNALED||i===o.CONDITION_SATISFIED},e=r}else U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(e=this.beginQuery(),this.endQuery(),s=()=>this.isQueryAvailable(e,U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):s=()=>!0;return{query:e,isFencePassed:s}}downloadMatrixFromPackedTexture(t,e,s){return this.downloadMatrixDriver(t,()=>rP(this.gl,e,s))}createProgram(t){this.throwIfDisposed();const e=this.gl;this.vertexShader==null&&(this.vertexShader=GM(e));const s=RL(e);it(e,()=>e.attachShader(s,this.vertexShader)),it(e,()=>e.attachShader(s,t)),AL(e,s);const o=Object.assign(s,{vao:this.createVertexArray()});return this.debug&&rp(e,o),o}buildVao(t){this.setProgram(t),this.bindVertexArray(t.vao);const e=this.gl;it(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),QM(e,t,this.vertexBuffer)}deleteProgram(t){this.throwIfDisposed(),t===this.program&&(this.program=null),t!=null&&(it(this.gl,()=>this.gl.deleteProgram(t)),this.deleteVertexArray(t.vao))}setProgram(t){this.throwIfDisposed(),this.program=t,this.program!=null&&this.debug&&rp(this.gl,this.program),it(this.gl,()=>this.gl.useProgram(t))}getUniformLocation(t,e,s=!0){return this.throwIfDisposed(),s?PL(this.gl,t,e):BL(this.gl,t,e)}getAttributeLocation(t,e){return this.throwIfDisposed(),it(this.gl,()=>this.gl.getAttribLocation(t,e))}getUniformLocationNoThrow(t,e){return this.throwIfDisposed(),this.gl.getUniformLocation(t,e)}setInputMatrixTexture(t,e,s){this.throwIfDisposed(),this.throwIfNoProgram(),zL(this.gl,t,e,s)}setOutputMatrixTexture(t,e,s){this.setOutputMatrixTextureDriver(t,s,e)}setOutputPackedMatrixTexture(t,e,s){this.throwIfDisposed();const[o,r]=sr(e,s);this.setOutputMatrixTextureDriver(t,o,r)}setOutputMatrixWriteRegion(t,e,s,o){this.setOutputMatrixWriteRegionDriver(s,t,o,e)}setOutputPackedMatrixWriteRegion(t,e,s,o){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){this.program!=null&&rp(this.gl,this.program),bc(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();const t=this.gl;if(this.debug){const e=this.getVertexArray();console.assert(e===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()}it(t,()=>t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),it(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=xc(this.gl,U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){const s=this.gl,o=this.getQueryTimerExtensionWebGL2(),r=s.createQuery();return s.beginQuery(o.TIME_ELAPSED_EXT,r),r}const t=this.getQueryTimerExtensionWebGL1(),e=t.createQueryEXT();return t.beginQueryEXT(t.TIME_ELAPSED_EXT,e),e}endQuery(){if(U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){const e=this.gl,s=this.getQueryTimerExtensionWebGL2();e.endQuery(s.TIME_ELAPSED_EXT);return}const t=this.getQueryTimerExtensionWebGL1();t.endQueryEXT(t.TIME_ELAPSED_EXT)}waitForQueryAndGetTime(t){return Q(this,null,function*(){return yield Tp(()=>this.disposed||this.isQueryAvailable(t,U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(t,U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))})}getQueryTime(t,e){if(e===0)return null;if(e===2){const s=this.gl;return s.getQueryParameter(t,s.QUERY_RESULT)/1e6}else{const s=this.getQueryTimerExtensionWebGL1();return s.getQueryObjectEXT(t,s.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(t,e){if(e===0)return!0;if(e===2){const s=this.gl,o=this.getQueryTimerExtensionWebGL2(),r=s.getQueryParameter(t,s.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),r&&!this.disjoint}else{const s=this.getQueryTimerExtensionWebGL1(),o=s.getQueryObjectEXT(t,s.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(s.GPU_DISJOINT_EXT)),o&&!this.disjoint}}pollFence(t){return new Promise(e=>{this.addItemToPoll(()=>t.isFencePassed(),()=>e())})}pollItems(){const t=iP(this.itemsToPoll.map(e=>e.isDoneFn));for(let e=0;e<=t;++e){const{resolveFn:s}=this.itemsToPoll[e];s()}this.itemsToPoll=this.itemsToPoll.slice(t+1)}addItemToPoll(t,e){if(this.itemsToPoll.push({isDoneFn:t,resolveFn:e}),this.itemsToPoll.length>1)return;let s;"setTimeoutCustom"in U().platform&&(s=U().platform.setTimeoutCustom.bind(U().platform)),Tp(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,s)}bindTextureToFrameBuffer(t){this.throwIfDisposed(),ip(this.gl,t,this.framebuffer),this.debug&&bc(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture!=null?(ip(this.gl,this.outputTexture,this.framebuffer),this.debug&&bc(this.gl)):_1(this.gl,this.framebuffer)}downloadMatrixDriver(t,e){this.bindTextureToFrameBuffer(t);const s=e();return this.unbindTextureToFrameBuffer(),s}setOutputMatrixTextureDriver(t,e,s){this.throwIfDisposed();const o=this.gl;ip(o,t,this.framebuffer),this.debug&&bc(o),this.outputTexture=t,it(o,()=>o.viewport(0,0,e,s)),it(o,()=>o.scissor(0,0,e,s))}setOutputMatrixWriteRegionDriver(t,e,s,o){this.throwIfDisposed(),it(this.gl,()=>this.gl.scissor(t,e,s,o))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(this.program==null)throw new Error("No GPU program is currently set.")}}function iP(n){let t=0;for(;t<n.length&&n[t]();++t);return t-1}const{addImpl:aP,bincountImpl:K1,bincountReduceImpl:lP,bitwiseAndImpl:cP,castImpl:uP,ceilImpl:hP,concatImpl:dP,equalImpl:pP,expImpl:fP,expm1Impl:mP,floorImpl:gP,gatherNdImpl:xP,gatherV2Impl:bP,greaterImpl:yP,greaterEqualImpl:wP,lessImpl:CP,lessEqualImpl:$P,linSpaceImpl:IP,logImpl:vP,maxImpl:kP,maximumImpl:SP,minimumImpl:NP,multiplyImpl:TP,negImpl:EP,notEqualImpl:RP,prodImpl:AP,raggedGatherImpl:DP,raggedRangeImpl:FP,raggedTensorToTensorImpl:_P,rangeImpl:OP,rsqrtImpl:LP,scatterImpl:MP,sigmoidImpl:PP,simpleAbsImpl:j1,sliceImpl:BP,sparseFillEmptyRowsImpl:zP,sparseReshapeImpl:VP,sparseSegmentReductionImpl:Y1,sqrtImpl:WP,staticRegexReplaceImpl:UP,stridedSliceImpl:GP,stringNGramsImpl:HP,stringSplitImpl:qP,stringToHashBucketFastImpl:XP,subImpl:KP,tileImpl:jP,topKImpl:YP,transposeImpl:fp,uniqueImpl:ZP}=nA;function Z1(n,t){return["x","y","z","w","u","v"].slice(0,t).map(e=>`${n}.${e}`)}function Ve(n,t){return t===1?[n]:Z1(n,t)}function QP(n,t){if(n===1)return"rc";let e="";for(let s=0;s<n;s++)e+=t[s],s<n-1&&(e+=",");return e}class JP{constructor(t){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=t,this.rank=t.length,this.enableShapeUniforms=Oe(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{const e=Ve("rc",this.rank),s=Ut(this.rank),o=this.getOutOfBoundsCondition(e),r=this.getSetup(e),i=this.getOutput(e);this.userCode=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${o}) {
            setOutput(vec4(0));
          } else {
            ${r}

            setOutput(vec4(${i}));
          }
        }
      `}}getSourceCoordsArr(t){const e=[];for(let s=0;s<=1;s++)for(let o=0;o<=1;o++){let r=`${s===0?"r":"rp1"}, ${o===0?"c":"cp1"}`;for(let i=2;i<this.rank;i++)r=`${t[t.length-1-i]},`+r;e.push(r)}return e}getOutOfBoundsCondition(t){if(this.rank===1)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let e="";for(let s=this.rank-2;s<this.rank;s++)e+=`${t[s]} >= ${this.enableShapeUniforms?`outShape[${s}]`:this.outputShape[s]}`,s<this.rank-1&&(e+="||");return e}getSetup(t){if(this.rank===1)return"";const e=t.slice(-2),s=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],o=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${e[0]};
      int c = ${e[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${s};
      bool rEdge = rp1 >= ${o};
    `}getOutput(t){const e=this.getSourceCoordsArr(t);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?"outShape":this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${e[0]}),
            cEdge ? 0. : getA(${e[1]}),
            rEdge ? 0. : getA(${e[2]}),
            rEdge || cEdge ? 0. : getA(${e[3]})`}}class Q1{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length);let s="";for(let o=0;o<4;o++){let r="thisRC = rc;";o%2===1&&(r+="thisRC.z += 1;"),o>1&&(r+="thisRC.y += 1;"),s+=`
        ${r}
        ${o>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${o}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${o>0?"}":""}
      `}this.userCode=`
      ${t3(e,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?hp():up(t)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":t[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":t[2]};

        ${s}

        setOutput(result);
      }
    `}}function t3(n,t){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t?QL(["r","c","d"],"inputShape"):Io(["r","c","d"],n)}
      return ivec3(r, c, d);
    }
  `}class e3{constructor(t){this.gpgpu=t,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(t,e,s){const o=ty(e,s),r=ey(t,o,s);r in this.freeTextures||(this.freeTextures[r]=[]),r in this.usedTextures||(this.usedTextures[r]=[]);const i=J1(t,o,this.gpgpu.gl,this.gpgpu.textureConfig,s);if(this.freeTextures[r].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=i,this.log();const l=this.freeTextures[r].pop();return this.usedTextures[r].push(l),l}let a;return o===Ne.PACKED_2X2_FLOAT32?a=this.gpgpu.createPackedMatrixTexture(t[0],t[1]):o===Ne.PACKED_2X2_FLOAT16?a=this.gpgpu.createFloat16PackedMatrixTexture(t[0],t[1]):o===Ne.UNPACKED_FLOAT32?a=this.gpgpu.createFloat32MatrixTexture(t[0],t[1]):o===Ne.UNPACKED_FLOAT16?a=this.gpgpu.createFloat16MatrixTexture(t[0],t[1]):o===Ne.PACKED_4X1_UNSIGNED_BYTE&&(a=this.gpgpu.createUnsignedBytesMatrixTexture(t[0],t[1])),this.usedTextures[r].push(a),this.numUsedTextures++,this._numBytesAllocated+=i,this.log(),a}releaseTexture(t,e,s,o){if(this.freeTextures==null)return;const r=ty(s,o),i=ey(e,r,o);i in this.freeTextures||(this.freeTextures[i]=[]);const a=J1(e,r,this.gpgpu.gl,this.gpgpu.textureConfig,o),l=U().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");l!==-1&&this._numBytesAllocated>l?(this.gpgpu.deleteMatrixTexture(t.texture),this._numBytesAllocated-=a):(this.freeTextures[i].push(t),this.numFreeTextures++,this._numBytesFree+=a),this.numUsedTextures--;const c=this.usedTextures[i],u=c&&c.indexOf(t);if(u==null||u<0)throw new Error("Cannot release a texture that was never provided by this texture manager");c[u]=c[c.length-1],c.pop(),this.log()}log(){if(!this.logEnabled)return;const t=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${t})`);const e=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*e)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(const t in this.freeTextures)this.freeTextures[t].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(const t in this.usedTextures)this.usedTextures[t].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}}function n3(n,t){const e=n;if(t===e.R32F)return 4;if(t===e.R16F)return 2;if(t===e.RGBA32F)return 16;if(t===n.RGBA)return 16;if(t===e.RGBA16F)return 8;if(t===e.RGBA8)return 4;throw new Error(`Unknown internal format ${t}`)}function J1(n,t,e,s,o){const r=s3(t,s);let i;if(o){const[l,c]=sr(n[0],n[1]);i=l*c}else{const[l,c]=ji(n[0],n[1]);i=l*c}const a=n3(e,r);return i*a}function s3(n,t){switch(n){case Ne.PACKED_2X2_FLOAT32:return q1(t);case Ne.PACKED_2X2_FLOAT16:return X1(t);case Ne.UNPACKED_FLOAT32:return U1(t);case Ne.UNPACKED_FLOAT16:return G1(t);case Ne.PACKED_4X1_UNSIGNED_BYTE:return H1(t);default:throw new Error(`Unknown physical texture type ${n}`)}}function o3(n){return U().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?n?Ne.PACKED_2X2_FLOAT32:Ne.UNPACKED_FLOAT32:n?Ne.PACKED_2X2_FLOAT16:Ne.UNPACKED_FLOAT16}function ty(n,t){if(n===hn.UPLOAD)return Ne.PACKED_2X2_FLOAT32;if(n===hn.RENDER||n==null)return o3(t);if(n===hn.DOWNLOAD||n===hn.PIXELS)return Ne.PACKED_4X1_UNSIGNED_BYTE;throw new Error(`Unknown logical texture type ${n}`)}function ey(n,t,e){return`${n[0]}_${n[1]}_${t}_${e}`}class ns{constructor(t,e){this.variableNames=["A"],this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${e}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}}const $n="if (isnan(x)) return x;",r3="return x;",ny="return abs(x);",i3="return (x >= 0.0) ? x : (exp(x) - 1.0);",a3=$n+`
  return (x < 0.0) ? 0.0 : x;
`,l3=$n+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,Bs="return x;",c3="return 1.0 / (1.0 + exp(-1.0 * x));";const u3="return x;",h3=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,d3=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,p3=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,f3="return 1.0 / (1.0 + exp(-1.0 * x));";class zs{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${e}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}}class m3{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length);const e=t.length,s=Ve("rc",e),o=Ut(e),r=QP(e,s),i=s.slice(-2),a=e<=1?"rc":`vec2(${i.join(",")})`;this.userCode=`
      void main() {
        ${o} rc = getOutputCoords();
        vec4 packedInput = getA(${r});

        setOutput(getChannel(packedInput, ${a}));
      }
    `}}const g3=Tm,x3=1e-7,b3=1e-4,Ic={};function y3(n){return n in Ic||(Ic[n]={}),Ic[n]}const w3=U().getNumber("CPU_HANDOFF_SIZE_THRESHOLD"),C3=600;function $3(){return U().global.screen==null?1024:U().global.screen.height*U().global.screen.width*window.devicePixelRatio*C3/1024/1024}class vc extends Ro{nextDataId(){return vc.nextDataId++}constructor(t){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!U().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");let e;if(t!=null){if(t instanceof pp)e=t;else{const s=Bn(U().getNumber("WEBGL_VERSION"),t);e=new pp(s)}this.binaryCache={},this.gpgpuCreatedLocally=!1}else{const s=Bn(U().getNumber("WEBGL_VERSION"));e=new pp(s),this.binaryCache=y3(U().getNumber("WEBGL_VERSION")),this.gpgpuCreatedLocally=!0}this.gpgpu=e,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new e3(this.gpgpu),this.numMBBeforeWarning=$3(),this.texData=new ra(this,rn())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(t,e,s,o,r,i){const a=this.makeTensorInfo(e,s),l=this.texData.get(a.dataId);l.isPacked=!1,l.texture={texture:t,texShape:[o,r]},l.texShape=[o,r];const c=yc(e),u=new W1(c,!1,i),h=this.runWebGLProgram(u,[a],s,[[o,r]]);return h.shape=e,l.texture=null,this.disposeIntermediateTensorInfo(a),h.dataId}write(t,e,s){if((U().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||U().getBool("DEBUG"))&&this.checkNumericalProblems(t),s==="complex64"&&t!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");const o={id:this.nextDataId()};return this.texData.set(o,{shape:e,dtype:s,values:t,usage:hn.UPLOAD,refCount:1}),o}refCount(t){return this.texData.has(t)?this.texData.get(t).refCount:0}incRef(t){const e=this.texData.get(t);e.refCount++}decRef(t){if(this.texData.has(t)){const e=this.texData.get(t);e.refCount--}}move(t,e,s,o,r){if(U().getBool("DEBUG")&&this.checkNumericalProblems(e),o==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(t,{shape:s,dtype:o,values:e,usage:hn.UPLOAD,refCount:r})}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}readSync(t){const e=this.texData.get(t),{values:s,dtype:o,complexTensorInfos:r,slice:i,shape:a,isPacked:l}=e;if(i!=null){let d;l?d=new zs(a,Bs):d=new ns(a,Bs);const p=this.runWebGLProgram(d,[{dataId:t,shape:a,dtype:o}],o),f=this.readSync(p.dataId);return this.disposeIntermediateTensorInfo(p),f}if(s!=null)return this.convertAndCacheOnCPU(t);if(o==="string")return s;const c=this.activeTimers!=null;let u;c&&(u=He());let h;if(o==="complex64"){const d=this.readSync(r.real.dataId),p=this.readSync(r.imag.dataId);h=ds(d,p)}else h=this.getValuesFromTexture(t);return c&&(this.downloadWaitMs+=He()-u),this.convertAndCacheOnCPU(t,h)}read(t){return Q(this,null,function*(){if(this.pendingRead.has(t)){const f=this.pendingRead.get(t);return new Promise(m=>f.push(m))}const e=this.texData.get(t),{values:s,shape:o,slice:r,dtype:i,complexTensorInfos:a,isPacked:l}=e;if(r!=null){let f;l?f=new zs(o,Bs):f=new ns(o,Bs);const m=this.runWebGLProgram(f,[{dataId:t,shape:o,dtype:i}],i),g=this.read(m.dataId);return this.disposeIntermediateTensorInfo(m),g}if(s!=null)return this.convertAndCacheOnCPU(t);if(U().getBool("DEBUG")&&!U().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&U().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let c=null,u;if(i!=="complex64"&&U().get("WEBGL_BUFFER_SUPPORTED")){u=this.decode(t);const f=this.texData.get(u.dataId);c=this.gpgpu.createBufferFromTexture(f.texture.texture,...gc(o))}this.pendingRead.set(t,[]),i!=="complex64"&&(yield this.gpgpu.createAndWaitForFence());let h;if(i==="complex64"){const f=yield Promise.all([this.read(a.real.dataId),this.read(a.imag.dataId)]),m=f[0],g=f[1];h=ds(m,g)}else if(c==null)h=this.getValuesFromTexture(t);else{const f=X(o);h=this.gpgpu.downloadFloat32MatrixFromBuffer(c,f)}if(u!=null&&this.disposeIntermediateTensorInfo(u),c!=null){const f=this.gpgpu.gl;it(f,()=>f.deleteBuffer(c))}const d=this.convertAndCacheOnCPU(t,h),p=this.pendingRead.get(t);return this.pendingRead.delete(t),p.forEach(f=>f(d)),this.pendingDisposal.has(t)&&(this.pendingDisposal.delete(t),this.disposeData(t)&&rn().removeDataId(t,this),this.pendingDeletes--),d})}readToGPU(t,e={}){const s=this.texData.get(t),{values:o,shape:r,slice:i,dtype:a,isPacked:l,texture:c}=s;if(a==="complex64")throw new Error("Does not support reading texture for complex64 dtype.");if(i!=null){let p;l?p=new zs(r,Bs):p=new ns(r,Bs);const f=this.runWebGLProgram(p,[{dataId:t,shape:r,dtype:a}],a),m=this.readToGPU(f,e);return this.disposeIntermediateTensorInfo(f),m}if(c==null)throw o!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");const u=this.decode(t,e.customTexShape),h=rn().makeTensorFromTensorInfo(u),d=this.texData.get(u.dataId);return Object.assign({tensorRef:h},d.texture)}bufferSync(t){const e=this.readSync(t.dataId);if(t.dtype==="string")try{const s=e.map(o=>Cs(o));return It(t.shape,t.dtype,s)}catch(s){throw new Error("Failed to decode encoded string bytes into utf-8")}return It(t.shape,t.dtype,e)}checkNumericalProblems(t){if(t!=null)for(let e=0;e<t.length;e++){const s=t[e];if(!kL(s))throw U().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error(`The value ${s} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${s} cannot be represented on this device.`)}}getValuesFromTexture(t){const{shape:e,dtype:s,isPacked:o}=this.texData.get(t),r=X(e);if(U().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){const d=this.decode(t),p=this.texData.get(d.dataId),f=this.gpgpu.downloadMatrixFromPackedTexture(p.texture.texture,...gc(e)).subarray(0,r);return this.disposeIntermediateTensorInfo(d),f}const i=U().getBool("WEBGL_PACK")&&o===!0,a=i?yc(e):e,l=i?new VM(a):new zM(a),c=this.runWebGLProgram(l,[{shape:a,dtype:s,dataId:t}],"float32"),u=this.texData.get(c.dataId),h=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(u.texture.texture,u.texShape[0],u.texShape[1]).subarray(0,r);return this.disposeIntermediateTensorInfo(c),h}timerAvailable(){return U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(t){const e=this.activeTimers,s=[];let o=!1;this.programTimersStack==null?(this.programTimersStack=s,o=!0):this.activeTimers.push(s),this.activeTimers=s,t();const r=Ys(this.activeTimers.map(l=>l.query)).filter(l=>l!=null),i=Ys(this.activeTimers.map(l=>l.name)).filter(l=>l!=null);this.activeTimers=e,o&&(this.programTimersStack=null);const a={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return Q(this,null,function*(){if(U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){const l=yield Promise.all(r);a.kernelMs=nw(l),a.getExtraProfileInfo=()=>l.map((c,u)=>({name:i[u],ms:c})).map(c=>`${c.name}: ${c.ms}`).join(", ")}else a.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,a})}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:He(),endMs:null}}endTimer(t){return U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),t):(t.endMs=He(),t)}getQueryTime(t){return Q(this,null,function*(){if(U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(t);const e=t;return e.endMs-e.startMs})}disposeData(t,e=!1){if(this.pendingDisposal.has(t))return!1;if(!this.texData.has(t))return!0;if(e?this.texData.get(t).refCount=0:this.texData.get(t).refCount--,!e&&this.texData.get(t).refCount>0)return!1;if(this.pendingRead.has(t))return this.pendingDisposal.add(t),this.pendingDeletes++,!1;this.releaseGPUData(t);const{complexTensorInfos:s}=this.texData.get(t);return s!=null&&(this.disposeData(s.real.dataId,e),this.disposeData(s.imag.dataId,e)),this.texData.delete(t),!0}releaseGPUData(t){const{texture:e,dtype:s,texShape:o,usage:r,isPacked:i,slice:a}=this.texData.get(t),l=a&&a.origDataId||t,c=this.dataRefCount.get(l);c>1?this.dataRefCount.set(l,c-1):(this.dataRefCount.delete(l),e!=null&&(this.numBytesInGPU-=this.computeBytes(o,s),this.textureManager.releaseTexture(e,o,r,i)));const u=this.texData.get(t);u.texture=null,u.texShape=null,u.isPacked=!1,u.slice=null}getTexture(t){return this.uploadToGPU(t),this.texData.get(t).texture.texture}getDataInfo(t){return this.texData.get(t)}shouldExecuteOnCPU(t,e=w3){return U().getBool("WEBGL_CPU_FORWARD")&&t.every(s=>this.texData.get(s.dataId).texture==null&&X(s.shape)<e)}getGPGPUContext(){return this.gpgpu}where(t){on("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");const e=t.dataSync();return g3(t.shape,e)}packedUnaryOp(t,e,s){const o=new zs(t.shape,e),r=this.compileAndRun(o,[t],s);return rn().makeTensorFromTensorInfo(r)}abs(t){if(this.shouldExecuteOnCPU([t])&&t.dtype!=="complex64"){const o=j1(this.texData.get(t.dataId).values);return this.makeOutput(t.shape,t.dtype,o)}if(U().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,ny,t.dtype);const e=new ns(t.shape,ny),s=this.compileAndRun(e,[t]);return rn().makeTensorFromTensorInfo(s)}makeTensorInfo(t,e,s){let o;if(e==="string"&&s!=null&&s.length>0&&mr(s[0])){const r=s.map(i=>ws(i));o=this.write(r,t,e)}else o=this.write(s,t,e);return this.texData.get(o).usage=null,{dataId:o,shape:t,dtype:e}}makeOutput(t,e,s){return rn().makeTensorFromTensorInfo(this.makeTensorInfo(t,e,s),this)}unpackTensor(t){const e=new m3(t.shape);return this.runWebGLProgram(e,[t],t.dtype)}packTensor(t){const e=new JP(t.shape);return this.runWebGLProgram(e,[t],t.dtype,null,!0)}packedReshape(t,e){const s=[or(t.shape),...rr(t.shape)],o={dtype:t.dtype,shape:s,dataId:t.dataId},r=[or(e),...rr(e)],i=new Q1(r,s),a=!0,l=[s],c=this.runWebGLProgram(i,[o],t.dtype,l,a);return{dataId:c.dataId,shape:e,dtype:c.dtype}}decode(t,e){const s=this.texData.get(t),{isPacked:o,shape:r,dtype:i}=s;if(e!=null){const d=X(r),p=e[0]*e[1]*4;k(d<=p,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}const a=yc(r);let l;o?l=new BM(a):l=new PM(a);const c=!0,u=[e!=null?e:gc(a)],h=this.runWebGLProgram(l,[{shape:a,dtype:i,dataId:t}],i,u,c,e);return{dtype:i,shape:r,dataId:h.dataId}}runWebGLProgram(t,e,s,o,r=!1,i){const a=this.makeTensorInfo(t.outputShape,s),l=this.texData.get(a.dataId);if(t.packedOutput&&(l.isPacked=!0),t.outPackingScheme===Ki.DENSE){const x=i!=null?i:gc(t.outputShape);l.texShape=x.map(b=>b*2)}if(t.outTexUsage!=null&&(l.usage=t.outTexUsage),X(a.shape)===0)return l.values=Re(a.dtype,0),a;const c=[],u=e.map(x=>{if(x.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let b=this.texData.get(x.dataId);if(b.texture==null){if(!t.packedInputs&&X(x.shape)<=U().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:x.shape,texData:null,isUniform:!0,uniformValues:b.values};t.packedInputs&&(b.isPacked=!0,b.shape=x.shape)}if(this.uploadToGPU(x.dataId),!!b.isPacked!=!!t.packedInputs)x=b.isPacked?this.unpackTensor(x):this.packTensor(x),c.push(x),b=this.texData.get(x.dataId);else if(b.isPacked&&!Cc(b.shape,x.shape)){const w=x,y=x.shape;x.shape=b.shape,x=this.packedReshape(x,y),c.push(x),b=this.texData.get(x.dataId),w.shape=y}return{shape:x.shape,texData:b,isUniform:!1}});this.uploadToGPU(a.dataId);const h={shape:a.shape,texData:l,isUniform:!1},d=MM(t,u,h),p=this.getAndSaveBinary(d,()=>OM(this.gpgpu,t,u,h)),f=this.activeTimers!=null;let m;f&&(m=this.startTimer()),U().get("ENGINE_COMPILE_ONLY")||LM(this.gpgpu,p,u,h,o),c.forEach(x=>this.disposeIntermediateTensorInfo(x)),f&&(m=this.endTimer(m),this.activeTimers.push({name:t.constructor.name,query:this.getQueryTime(m)}));const g=U().getNumber("WEBGL_FLUSH_THRESHOLD");if(g>0){const x=He();x-this.lastGlFlushTime>g&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=x)}if(!U().getBool("WEBGL_LAZILY_UNPACK")&&l.isPacked&&r===!1){const x=this.unpackTensor(a);return this.disposeIntermediateTensorInfo(a),x}return a}compileAndRun(t,e,s,o,r=!1){return s=s||e[0].dtype,this.runWebGLProgram(t,e,s,o,r)}getAndSaveBinary(t,e){return t in this.binaryCache||(this.binaryCache[t]=e()),this.binaryCache[t]}getTextureManager(){return this.textureManager}dispose(){this.disposed||(U().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement!="undefined"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return this.floatPrecisionValue==null&&(this.floatPrecisionValue=W(()=>{if(!U().get("WEBGL_RENDER_FLOAT32_ENABLED")){const t=U().getBool("DEBUG");U().set("DEBUG",!1);const e=this.abs(Pt(1e-8)).dataSync()[0];if(U().set("DEBUG",t),e>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?x3:b3}uploadToGPU(t){const e=this.texData.get(t),{shape:s,dtype:o,values:r,texture:i,usage:a,isPacked:l}=e;if(i!=null)return;const c=this.activeTimers!=null;let u;c&&(u=He());let h=e.texShape;if(h==null&&(h=UL(s,l),e.texShape=h),r!=null){const d=yc(s);let p,f=h[1],m=h[0];const g=r instanceof Uint8Array||r instanceof Uint8ClampedArray;(l||!g)&&([f,m]=sr(h[0],h[1])),l?p=new UM(d,g):p=new W1(d,g);const x=g?[m,f]:h,b=this.makeTensorInfo(x,o),w=this.texData.get(b.dataId);g?w.usage=hn.PIXELS:w.usage=hn.UPLOAD,w.texShape=x,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),f,m,r);const y=[[m,f]],I=this.runWebGLProgram(p,[b],o,y,!0),v=this.texData.get(I.dataId);e.texShape=v.texShape,e.isPacked=v.isPacked,e.usage=v.usage,U().get("ENGINE_COMPILE_ONLY")?this.disposeData(I.dataId):(e.texture=v.texture,e.values=null,this.texData.delete(I.dataId)),this.disposeIntermediateTensorInfo(b),c&&(this.uploadWaitMs+=He()-u)}else{const d=this.acquireTexture(h,a,o,l);e.texture=d}}convertAndCacheOnCPU(t,e){const s=this.texData.get(t),{dtype:o}=s;return e!=null&&(s.values=I3(e,o)),s.values}acquireTexture(t,e,s,o){if(this.numBytesInGPU+=this.computeBytes(t,s),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){const r=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${r} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(t,e,o)}computeBytes(t,e){return t[0]*t[1]*ia(e)}checkCompileCompletion(){for(const[,t]of Object.entries(this.binaryCache))this.checkCompletion_(t)}checkCompileCompletionAsync(){return Q(this,null,function*(){const t=[];if(this.gpgpu.parallelCompilationExtension){for(const[,e]of Object.entries(this.binaryCache))t.push(this.checkCompletionAsync_(e));return Promise.all(t)}else{for(const[,e]of Object.entries(this.binaryCache)){const s=new Promise(o=>{try{this.checkCompletion_(e),o(!0)}catch(r){throw r}});t.push(s)}return Promise.all(t)}})}checkCompletionAsync_(t){return Q(this,null,function*(){return this.gpgpu.gl.getProgramParameter(t.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(t):(yield Ym(),this.checkCompletionAsync_(t))})}checkCompletion_(t){if(this.gpgpu.gl.getProgramParameter(t.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(t.webGLProgram)),this.gpgpu.gl.getShaderParameter(t.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(D1(t.source,this.gpgpu.gl.getShaderInfoLog(t.fragmentShader)),new Error("Failed to compile fragment shader.")):new Error("Failed to link vertex and fragment shaders.");return!0}getUniformLocations(){for(const t of Object.values(this.binaryCache)){this.gpgpu.buildVao(t.webGLProgram);const{variablesLocations:e,customUniformLocations:s,infLoc:o,nanLoc:r,outShapeLocation:i,outShapeStridesLocation:a,outTexShapeLocation:l}=z1(this.gpgpu,t.program,t.webGLProgram);t.variablesLocations=e,t.customUniformLocations=s,t.infLoc=o,t.nanLoc=r,t.outShapeLocation=i,t.outShapeStridesLocation=a,t.outTexShapeLocation=l}}createTensorFromGPUData(t,e,s){t.channels=t.channels||"RGBA";const{texture:o,height:r,width:i,channels:a}=t,l=rn().backend;if(!l.gpgpu.gl.isTexture(o))throw new Error("The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.");const c=l.writeTexture(o,e,s,r,i,a);return rn().makeTensorFromDataId(c,e,s,l)}}vc.nextDataId=0;function I3(n,t){if(t==="float32"||t==="complex64")return n;if(t==="int32"||t==="bool"){const e=t==="int32"?new Int32Array(n.length):new Uint8Array(n.length);for(let s=0;s<e.length;++s)e[s]=Math.round(n[s]);return e}else throw new Error(`Unknown dtype ${t}`)}Sf()&&Df("webgl",()=>new vc,2);const mp=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;class ko{constructor(t,e,s){this.variableNames=["A","B"],this.outputShape=yt(e,s),this.enableShapeUniforms=Oe(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${t}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}}const So=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;class ur{constructor(t,e,s,o=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=yt(e,s);const r=this.outputShape.length;this.enableShapeUniforms=Oe(r);let i="";if(o)if(r===0||X(this.outputShape)===1)i=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(i=`
          ${Ut(r)} coords = getOutputCoords();
        `,r===1)this.enableShapeUniforms?i+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:i+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{const l=Ve("coords",r);this.enableShapeUniforms?i+=`
            bool nextRowOutOfBounds =
              (${l[r-2]} + 1) >= outShape[${r} - 2];
            bool nextColOutOfBounds =
              (${l[r-1]} + 1) >= outShape[${r} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:i+=`
            bool nextRowOutOfBounds =
              (${l[r-2]} + 1) >= ${this.outputShape[r-2]};
            bool nextColOutOfBounds =
              (${l[r-1]} + 1) >= ${this.outputShape[r-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${t}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${i}

        setOutput(result);
      }
    `}}function sn(n){const{inputs:t,backend:e}=n,{x:s}=t;return e.incRef(s.dataId),{dataId:s.dataId,shape:s.shape,dtype:s.dtype}}const v3={kernelName:Lr,backendName:"webgl",kernelFunc:sn};function Vs(n){const{inputs:t,backend:e}=n,{real:s,imag:o}=t,r=e.makeTensorInfo(s.shape,"complex64"),i=e.texData.get(r.dataId),a=sn({inputs:{x:s},backend:e}),l=sn({inputs:{x:o},backend:e});return i.complexTensorInfos={real:a,imag:l},r}const k3={kernelName:iu,backendName:"webgl",kernelFunc:Vs};const sy="return (a < 0.) ? b * a : a;",oy=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function S3(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{alpha:r}=s,i=e.makeTensorInfo([],"float32",ys(r,"float32")),a=U().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ur(oy,o.shape,i.shape):new ko(sy,o.shape,i.shape),l=e.runWebGLProgram(a,[o,i],"float32");return e.disposeIntermediateTensorInfo(i),l}const N3={kernelName:Na,backendName:"webgl",kernelFunc:S3};const ry="return (a < 0.) ? b * a : a;",iy=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function T3(n){const{inputs:t,backend:e}=n,{x:s,alpha:o}=t,r=U().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ur(iy,s.shape,o.shape):new ko(ry,s.shape,o.shape);return e.runWebGLProgram(r,[s,o],"float32")}const E3={kernelName:qa,backendName:"webgl",kernelFunc:T3};const hr="if (isnan(x)) return x;";function Rt({opSnippet:n,packedOpSnippet:t,cpuKernelImpl:e,dtype:s}){return({inputs:o,backend:r})=>{const{x:i}=o,a=r,l=s||i.dtype;if(a.shouldExecuteOnCPU([i])&&e!=null){const h=a.texData.get(i.dataId),d=e(h.values,l);return a.makeTensorInfo(i.shape,l,d)}const c=U().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&t!=null;let u;return c?u=new zs(i.shape,t):u=new ns(i.shape,n),a.runWebGLProgram(u,[i],l)}}function Te({opSnippet:n,packedOpSnippet:t,checkOutOfBounds:e=!1,supportsComplex:s=!1,cpuKernelImpl:o,dtype:r}){return({inputs:i,backend:a})=>{const{a:l,b:c}=i,u=a;if(s&&l.dtype==="complex64"){const f=u.texData.get(l.dataId),m=u.texData.get(c.dataId),[g,x]=[[f.complexTensorInfos.real,m.complexTensorInfos.real],[f.complexTensorInfos.imag,m.complexTensorInfos.imag]].map(w=>{const[y,$]=w,I={dataId:y.dataId,dtype:y.dtype,shape:l.shape},v={dataId:$.dataId,dtype:$.dtype,shape:c.shape},T=new ko(n,l.shape,c.shape);return u.runWebGLProgram(T,[I,v],Je(y.dtype,$.dtype))}),b=Vs({inputs:{real:g,imag:x},backend:u});return u.disposeIntermediateTensorInfo(g),u.disposeIntermediateTensorInfo(x),b}const h=r||Je(l.dtype,c.dtype);if((l.dtype==="string"||c.dtype==="string"||u.shouldExecuteOnCPU([l,c]))&&o!=null){const f=u.texData.get(l.dataId).values,m=u.texData.get(c.dataId).values,g=l.dtype==="string"?ps(f):f,x=l.dtype==="string"?ps(m):m,[b,w]=o(l.shape,c.shape,g,x,h),y=u.makeTensorInfo(w,h),$=u.texData.get(y.dataId);return $.values=b,y}const d=U().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&t!=null;let p;return d?p=new ur(t,l.shape,c.shape,e):p=new ko(n,l.shape,c.shape),u.runWebGLProgram(p,[l,c],h)}}function Qi(n,t=!1){if(n==="linear")return t?u3:r3;if(n==="relu")return t?d3:a3;if(n==="elu")return t?h3:i3;if(n==="relu6")return t?p3:l3;if(n==="prelu")return t?iy:ry;if(n==="leakyrelu")return t?oy:sy;if(n==="sigmoid")return t?f3:c3;throw new Error(`Activation ${n} has not been implemented for the WebGL backend.`)}class ay{constructor(t,e,s,o=!1,r=!1,i=!1,a=null,l=!1,c=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=s,this.enableShapeUniforms=Oe(this.outputShape.length);const u=o?t[1]:t[2],h=Math.ceil(u/2),d=o?"i * 2, rc.y":"rc.y, i * 2",p=r?"rc.z, i * 2":"i * 2, rc.z",f=o?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],m=r?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"];let g="",x="";a&&(l?g=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${a}
        }`:c?g=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${a}
        }`:g=`vec4 activation(vec4 x) {
          ${a}
        }`,x="result = activation(result);");const b=i?"result += getBiasAtOutCoords();":"";i&&this.variableNames.push("bias"),l&&this.variableNames.push("preluActivationWeights"),c&&this.variableNames.push("leakyreluAlpha");let w="rc.x",y="rc.x";t[0]<e[0]?w=`imod(rc.x, ${t[0]})`:e[0]<t[0]&&(y=`imod(rc.x, ${e[0]})`),this.userCode=`
      ${g}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${h}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        int batchA = ${w};
        int batchB = ${y};
        for (int i = 0; i < ${h}; i++) {
          vec4 a = getMatrixA(batchA, ${d});
          vec4 b = getMatrixB(batchB, ${p});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${f[0]} * ${m[0]});
          result += (${f[1]} * ${m[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${b}

        ${x}

        setOutput(result);
      }
    `}}const ly={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"};class cy{constructor(t,e,s){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=yt(e,s),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${t}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}}const uy="return a * b;";function gp(n){const{inputs:t,backend:e}=n,{a:s,b:o}=t,r=Je(s.dtype,o.dtype);if(s.dtype==="complex64"){const a=e.texData.get(s.dataId),l=e.texData.get(o.dataId),c=new cy(ly.REAL,s.shape,o.shape),u=new cy(ly.IMAG,s.shape,o.shape),h=[{dataId:a.complexTensorInfos.real.dataId,dtype:a.complexTensorInfos.real.dtype,shape:s.shape},{dataId:a.complexTensorInfos.imag.dataId,dtype:a.complexTensorInfos.imag.dtype,shape:s.shape},{dataId:l.complexTensorInfos.real.dataId,dtype:l.complexTensorInfos.real.dtype,shape:o.shape},{dataId:l.complexTensorInfos.imag.dataId,dtype:l.complexTensorInfos.imag.dtype,shape:o.shape}],d=e.runWebGLProgram(c,h,"float32"),p=e.runWebGLProgram(u,h,"float32"),f=Vs({inputs:{real:d,imag:p},backend:e});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(p),f}if(e.shouldExecuteOnCPU([s,o])){const a=e.texData.get(s.dataId),l=e.texData.get(o.dataId),[c,u]=TP(s.shape,o.shape,a.values,l.values,r),h=e.makeTensorInfo(u,r),d=e.texData.get(h.dataId);return d.values=c,h}let i;return U().getBool("WEBGL_PACK_BINARY_OPERATIONS")?i=new ur(uy,s.shape,o.shape):i=new ko(uy,s.shape,o.shape),e.runWebGLProgram(i,[s,o],r)}const R3={kernelName:Hr,backendName:"webgl",kernelFunc:gp};function A3(n,t,e){const s=[or(n.shape),...rr(n.shape)],o={dtype:n.dtype,shape:s,dataId:n.dataId},r=[or(t),...rr(t)],i=new Q1(r,s),a=!0,l=[s],c=e.runWebGLProgram(i,[o],n.dtype,l,a);return{dataId:c.dataId,shape:t,dtype:c.dtype}}function st(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{shape:r}=s,i=e,a=X(o.shape),l=Ep(r,a),c=X(l);k(a===c,()=>`The new shape (${l}) has ${c} elements and the old shape (${o.shape}) has ${a} elements. The new shape and old shape must have the same number of elements.`);const u=i.texData.get(o.dataId);return u.isPacked&&!Cc(o.shape,l)&&!(u.texture!==null&&Cc(u.shape,l))?A3(o,l,i):(i.incRef(o.dataId),{dataId:o.dataId,shape:l,dtype:o.dtype})}const D3={kernelName:Ka,backendName:"webgl",kernelFunc:st};class hy{constructor(t,e){this.variableNames=["x"];const{windowSize:s,batchSize:o,inSize:r,outSize:i}=t;this.outputShape=[o,i];const a=Math.floor(s/4)*4,l=s%4;let c="sumValue += dot(values, ones);";if(e!=null){const h=1/e;c=`sumValue += dot(values * ${Ao(h)?h.toPrecision(2):h}, ones);`}let u="";r%s>0&&(u=`
        if (inIdx < 0 || inIdx >= ${r}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${u}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${s};

        float sumValue = 0.0;

        for (int i = 0; i < ${a}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${c}
        }

        int inIdx = inOffset + ${a};
        if (${l===1}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${c}
        } else if (${l===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${c}
        } else if (${l===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${c}
        }
        setOutput(sumValue);
      }
    `}}class F3{constructor(t,e){this.variableNames=["x"];const{windowSize:s,batchSize:o,inSize:r,outSize:i}=t;this.outputShape=[o,i];let a="0.0",l="";e==="prod"?a="1.0":e==="min"?(a="1.0 / 1e-20",l="min"):e==="max"&&(a="-1.0 / 1e-20",l="max");let c=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="sum"?c="sumValue":e==="prod"?c="prodValue":e==="all"?c="allValue":e==="any"&&(c="anyValue");const u=Math.floor(s/4)*4,h=s%4;let d=`
      if (${e==="sum"}) {
        sumValue += dot(values, ones);
      } else if (${e==="prod"}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${l}(values, minMaxValue);
        if (${e==="min"} || ${e==="max"}) {
          minMaxValue = ${l}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,p="vec4";e==="all"?(a="1.0",d=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,p="bvec4"):e==="any"&&(a="0.0",d=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,p="bvec4");let f="";r%s>0&&(f=`
        if (inIdx < 0 || inIdx >= ${r}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${a};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${f}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${s};

        vec4 minMaxValue = vec4(${a});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${u}; i += 4) {
          int inIdx = inOffset + i;
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${d}
        }

        int inIdx = inOffset + ${u};
        if (${h===1}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${h===2}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${d}
        } else if (${h===3}) {
          ${p} values = ${p}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${d}
        }
        setOutput(${c});
      }
    `}}function _3(n){const t=[];for(;t.length===0||t[t.length-1].outSize!==1;){const e=t.length?t[t.length-1].outSize:n[1],s=Ll(e);t.push({inSize:e,windowSize:s,outSize:Math.ceil(e/s)})}return t}function No(n,t,e,s){const o=_3(n.shape);let r=n;for(let i=0;i<o.length;i++){const{inSize:a,windowSize:l,outSize:c}=o[i];let u,h;e==="mean"?u=i===0?new hy({windowSize:l,inSize:a,batchSize:n.shape[0],outSize:c},a):new hy({windowSize:l,inSize:a,batchSize:n.shape[0],outSize:c}):u=new F3({windowSize:l,inSize:a,batchSize:n.shape[0],outSize:c},e),h=r,r=s.runWebGLProgram(u,[r],t),h.dataId!==n.dataId&&s.disposeIntermediateTensorInfo(h)}return r}class O3{constructor(t,e){this.variableNames=["A"];const s=new Array(t.length);for(let i=0;i<s.length;i++)s[i]=t[e[i]];this.outputShape=s,this.rank=s.length;const o=Ut(this.rank),r=L3(e);this.userCode=`
    void main() {
      ${o} resRC = getOutputCoords();
      setOutput(getA(${r}));
    }
    `}}function L3(n){const t=n.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);const e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],s=new Array(t);for(let o=0;o<n.length;o++)s[n[o]]=e[o];return s.join()}class M3{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;const s=new Array(t.length);for(let u=0;u<s.length;u++)s[u]=t[e[u]];if(this.outputShape=s,this.rank=s.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);const o=Ut(this.rank),r=Z1("rc",this.rank),i=new Array(this.rank);for(let u=0;u<e.length;u++)i[e[u]]=r[u];const a=`vec2(${i.slice(-2).join()})`,l=`++${r[this.rank-1]} < ${s[this.rank-1]}`,c=`getChannel(getA(${i.join()}), ${a})`;this.userCode=`
    void main() {
      ${o} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${c};
      if(${l}) {
        result[1] = ${c};
      }
      --${r[this.rank-1]};
      if(++${r[this.rank-2]} < ${s[this.rank-2]}) {
        result[2] = ${c};
        if(${l}) {
          result[3] = ${c};
        }
      }
      setOutput(result);
    }
    `}}function kc(n,t,e){const s=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new M3(n.shape,t):new O3(n.shape,t);return e.runWebGLProgram(s,[n],n.dtype)}function P3(n,t,e,s){const o=t,r=n.shape.length,i=$t(o,n.shape);let a=i;const l=Qt(a,r),c=l!=null;let u=n;c&&(u=kc(n,l,s),a=se(a.length,r)),Se("sum",a,r);const[h,d]=Ce(u.shape,a);let p=h;e&&(p=le(h,i));const f=X(d),g=X(n.shape)/f,x=st({inputs:{x:u},attrs:{shape:[g,f]},backend:s}),b=Yu(n.dtype),w=No(x,b,"sum",s),y=st({inputs:{x:w},attrs:{shape:p},backend:s});return s.disposeIntermediateTensorInfo(x),s.disposeIntermediateTensorInfo(w),c&&s.disposeIntermediateTensorInfo(u),y}function Sc(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s;return P3(o,r,i,e)}const B3={kernelName:tl,backendName:"webgl",kernelFunc:Sc};function We(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{perm:r}=s,i=e,a=o.shape.length,l=new Array(a);for(let u=0;u<l.length;u++)l[u]=o.shape[r[u]];let c;if(i.shouldExecuteOnCPU([o])){const h=i.texData.get(o.dataId).values,d=fp(h,o.shape,o.dtype,r,l);c=i.makeTensorInfo(l,o.dtype);const p=i.texData.get(c.dataId);p.values=d}else c=kc(o,r,i);return c}const z3={kernelName:Lo,backendName:"webgl",kernelFunc:We};const dy=1e3;function Nc({a:n,b:t,transposeA:e,transposeB:s,backend:o,bias:r=null,preluActivationWeights:i=null,leakyreluAlpha:a=0,activation:l=null}){const c=n.shape.length,u=t.shape.length,h=e?n.shape[c-2]:n.shape[c-1],d=s?t.shape[u-1]:t.shape[u-2],p=e?n.shape[c-1]:n.shape[c-2],f=s?t.shape[u-2]:t.shape[u-1],m=n.shape.slice(0,-2),g=t.shape.slice(0,-2),x=X(m),b=X(g),y=yt(n.shape.slice(0,-2),t.shape.slice(0,-2)).concat([p,f]);k(h===d,()=>`Error in matMul: inner shapes (${h}) and (${d}) of Tensors with shapes ${n.shape} and ${t.shape} and transposeA=${e} and transposeB=${s} must match.`);const $=e?[x,h,p]:[x,p,h],I=s?[b,f,d]:[b,d,f],v=st({inputs:{x:n},backend:o,attrs:{shape:$}}),T=st({inputs:{x:t},backend:o,attrs:{shape:I}}),S=[v,T],N=Math.max(x,b),C=e?v.shape[1]:v.shape[2],E=r!=null,R=i!=null,D=l==="leakyrelu",F=l!=null?Qi(l,!0):null,O=E||R||D||F!=null;let P;if((p===1||f===1)&&C>dy&&O===!1){let H=v,G=T;e&&(H=We({inputs:{x:v},backend:o,attrs:{perm:[0,2,1]}}),S.push(H)),s&&(G=We({inputs:{x:T},backend:o,attrs:{perm:[0,2,1]}}),S.push(G));const K=f!==1,j=f===1;let Y=H;K&&(Y=st({inputs:{x:H},backend:o,attrs:{shape:[N,C,1]}}),S.push(Y));const nt=f===1?2:1;let et=G;j&&(et=st({inputs:{x:G},backend:o,attrs:{shape:[N,1,C]}}),S.push(et));const at=gp({inputs:{a:Y,b:et},backend:o});P=Sc({inputs:{x:at},backend:o,attrs:{axis:nt,keepDims:!0}}),S.push(at)}else{const H=Je(n.dtype,t.dtype),G=new ay($,I,[N,p,f],e,s,E,F,R,D),K=[v,T];if(r!=null&&K.push(r),R&&K.push(i),D){const j=o.makeTensorInfo([],"float32",ys(a,"float32"));K.push(j),S.push(j)}P=o.runWebGLProgram(G,K,H)}const B=st({inputs:{x:P},backend:o,attrs:{shape:y}});S.push(P);for(const H of S)o.disposeIntermediateTensorInfo(H);return B}function V3(n){const{inputs:t,backend:e,attrs:s}=n,{a:o,b:r,bias:i,preluActivationWeights:a}=t,{transposeA:l,transposeB:c,activation:u,leakyreluAlpha:h}=s;return Nc({a:o,b:r,transposeA:l,transposeB:c,backend:e,bias:i,preluActivationWeights:a,leakyreluAlpha:h,activation:u})}const W3={kernelName:al,backendName:"webgl",kernelFunc:V3};const py="return abs(x);";function U3(n){const{inputs:t,backend:e}=n,{x:s}=t;if(e.shouldExecuteOnCPU([s])&&s.dtype!=="complex64"){const r=e.texData.get(s.dataId),i=j1(r.values);return e.makeTensorInfo(s.shape,s.dtype,i)}let o;return U().getBool("WEBGL_PACK_UNARY_OPERATIONS")?o=new zs(s.shape,py):o=new ns(s.shape,py),e.runWebGLProgram(o,[s],s.dtype)}const G3={kernelName:aa,backendName:"webgl",kernelFunc:U3};const H3=$n+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,q3=Rt({opSnippet:H3}),X3={kernelName:gr,backendName:"webgl",kernelFunc:q3};const K3=$n+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,j3=Rt({opSnippet:K3}),Y3={kernelName:xr,backendName:"webgl",kernelFunc:j3};const fy="return a + b;",Z3=Te({opSnippet:fy,packedOpSnippet:fy,supportsComplex:!0,cpuKernelImpl:aP}),Q3={kernelName:Oo,backendName:"webgl",kernelFunc:Z3};class J3{constructor(t,e){this.outputShape=[],this.outputShape=t,this.variableNames=e.map((r,i)=>`T${i}`);const s=[];this.variableNames.forEach(r=>{s.push(`float v${r} = get${r}AtOutCoords();`)});const o=this.variableNames.map(r=>`v${r}`).join(" + ");this.userCode=`
      void main() {
        ${s.join(`
        `)}

        float result = ${o};
        setOutput(result);
      }
    `}}class tB{constructor(t,e){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.variableNames=e.map((r,i)=>`T${i}`);const s=[];this.variableNames.forEach(r=>{s.push(`vec4 v${r} = get${r}AtOutCoords();`)});const o=this.variableNames.map(r=>`v${r}`).join(" + ");this.userCode=`
      void main() {
        ${s.join(`
        `)}

        vec4 result = ${o};
        setOutput(result);
      }
    `}}function Tc(n){const{inputs:t,backend:e}=n,s=t;if(s.length===1)return sn({inputs:{x:s[0]},backend:e});if(s.length>U().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){const l=Math.floor(s.length/2),c=Tc({inputs:s.slice(0,l),backend:e}),u=Tc({inputs:s.slice(l),backend:e});return Tc({inputs:[c,u],backend:e})}const o=s.map(l=>l.dtype).reduce((l,c)=>Je(l,c)),r=s.map(l=>l.shape),a=U().getBool("WEBGL_PACK")?new tB(s[0].shape,r):new J3(s[0].shape,r);return e.runWebGLProgram(a,s,o)}const eB={kernelName:Jc,backendName:"webgl",kernelFunc:Tc};function nB(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s,a=o.shape.length,l=$t(r,o.shape);let c=l;const u=Qt(c,a);let h=o;u!=null&&(h=We({inputs:{x:o},backend:e,attrs:{perm:u}}),c=se(c.length,a)),Se("all",c,a);const[d,p]=Ce(h.shape,c),f=X(p),m=st({inputs:{x:h},backend:e,attrs:{shape:[-1,f]}}),g=No(m,m.dtype,"all",e);let x;if(i){const b=le(d,l);x=st({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=st({inputs:{x:g},backend:e,attrs:{shape:d}});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(g),u!=null&&e.disposeIntermediateTensorInfo(h),x}const sB={kernelName:tu,backendName:"webgl",kernelFunc:nB};function oB(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s,a=o.shape.length,l=$t(r,o.shape);let c=l;const u=Qt(c,a);let h=o;u!=null&&(h=We({inputs:{x:o},backend:e,attrs:{perm:u}}),c=se(c.length,a)),Se("any",c,a);const[d,p]=Ce(h.shape,c),f=X(p),m=st({inputs:{x:h},backend:e,attrs:{shape:[-1,f]}}),g=No(m,m.dtype,"any",e);let x;if(i){const b=le(d,l);x=st({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=st({inputs:{x:g},backend:e,attrs:{shape:d}});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(g),u!=null&&e.disposeIntermediateTensorInfo(h),x}const rB={kernelName:eu,backendName:"webgl",kernelFunc:oB};class iB{constructor(t,e,s){this.variableNames=["A"];const{windowSize:o,batchSize:r,outSize:i}=t;s||this.variableNames.push("bestIndicesA"),this.outputShape=[r,i];const a=e==="max"?">":"<",l=s?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${o};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${o}; i++) {
          int inIdx = ${l};
          float candidate = getA(batch, inIdx);
          if (candidate ${a} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}}class aB{constructor(t,e,s,o){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,k(t.length>2,()=>`Packed arg${s.charAt(0).toUpperCase()+s.slice(1)} supports only inputs with rank above 2.`);const r=t[t.length-1],i=Math.ceil(r/e);this.outputShape=t.slice(0,-1),i>1&&this.outputShape.push(i),o||this.variableNames.push("bestIndicesA");const a=this.outputShape,l=a.length,c=Ut(l),u=Ve("coords",l);let h,d;if(i===1){d=l+1;const T=Ut(d);h=`
        ${T} sourceLocR = ${T}(${u.join()}, 0);
        ++${u[l-1]};
        ${T} sourceLocG = ${T}(${u.join()}, 0);
        ++${u[l-2]};
        ${T} sourceLocA = ${T}(${u.join()}, 0);
        --${u[l-1]};
        ${T} sourceLocB = ${T}(${u.join()}, 0);
        --${u[l-2]};`}else d=l,h=`
        ${c} sourceLocR = coords;
        ++${u[l-1]};
        ${c} sourceLocG = coords;
        ++${u[l-2]};
        ${c} sourceLocA = coords;
        --${u[l-1]};
        ${c} sourceLocB = coords;
        --${u[l-2]};`;const p=["x","y","z","w","u","v"].slice(0,d),f="."+p[d-1],m=p.map(T=>"int "+T),g=Ve("sourceLocR",d-1).concat("inIdx.r"),x=Ve("sourceLocG",d-1).concat("inIdx.g"),b=Ve("sourceLocB",d-1).concat("inIdx.b"),w=Ve("sourceLocA",d-1).concat("inIdx.a"),y=s==="max"?"greaterThan":"lessThan",$=o?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${b.join()}),
                             getBestIndicesAChannel(${w.join()})));`,I=`vec4(
            getAChannel(${g.join()}),
            hasNextCol ? getAChannel(${x.join()}) : 0.,
            hasNextRow ? getAChannel(${b.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${w.join()}) : 0.)`,v=o?"":`
      float getBestIndicesAChannel(${m.join()}) {
        return getChannel(getBestIndicesA(${p.join()}),
                                          vec2(${p.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${m.join()}) {
        return getChannel(getA(${p.join()}),
                               vec2(${p.slice(-2).join()}));
      }
      ${v}
      void main() {
        ${c} coords = getOutputCoords();
        bool hasNextCol = ${u[l-1]} < ${a[l-1]-1};
        bool hasNextRow = ${u[l-2]} < ${a[l-2]-1};
        ${h}
        ivec4 srcIdx = ivec4(sourceLocR${f}, sourceLocG${f},
          sourceLocB${f}, sourceLocA${f}) * ${e};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${I};

        for (int i = 0; i < ${e}; i++) {
          inIdx = srcIdx;
          ${$}
          vec4 candidate = ${I};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${y}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}}function my(n,t,e,s=null){let o=t.shape[0],r=t.shape[1];s!=null&&(o=s.shape[0],r=s.shape[1]);const i=Ll(r),a={windowSize:i,inSize:r,batchSize:o,outSize:Math.ceil(r/i)},l=new iB(a,e,s==null),c=[t];s!=null&&c.push(s);const u=n.runWebGLProgram(l,c,"int32");if(u.shape[1]===1)return u;const h=my(n,t,e,u);return n.disposeIntermediateTensorInfo(u),h}function gy(n,t,e,s=null){const o=s!=null?s.shape:t.shape,r=o[o.length-1],i=Ll(r),a=new aB(o,i,e,s==null),l=s==null?[t]:[t,s],c=n.runWebGLProgram(a,l,"int32");if(c.shape.length===t.shape.length){const u=gy(n,t,e,c);return n.disposeIntermediateTensorInfo(c),u}return c}function xy(n,t,e,s){const o=[e];if(Se("arg"+s.charAt(0).toUpperCase()+s.slice(1),o,t.shape.length),!U().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){const r=[],i=n.texData.get(t.dataId),a=i!==null&&i.isPacked;let l=t;a&&(l=n.unpackTensor(t),r.push(l));const[c,u]=Ce(l.shape,o),h=X(u),d=st({inputs:{x:l},backend:n,attrs:{shape:[-1,h]}});r.push(d);const p=my(n,d,s);r.push(p);const f=st({inputs:{x:p},backend:n,attrs:{shape:c}});return r.forEach(m=>n.disposeIntermediateTensorInfo(m)),f}return gy(n,t,s)}function lB(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r}=s;let i=$t(r,o.shape);const a=Qt(i,o.shape.length);let l=o;const c=[];a!=null&&(l=We({inputs:{x:o},backend:e,attrs:{perm:a}}),c.push(l),i=se(i.length,l.shape.length)),Se("argMax",[i[0]],l.shape.length);const u=xy(e,l,i[0],"max");return c.forEach(h=>e.disposeIntermediateTensorInfo(h)),u}const cB={kernelName:la,backendName:"webgl",kernelFunc:lB};function uB(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r}=s;let i=$t(r,o.shape);const a=Qt(i,o.shape.length);let l=o;const c=[];a!=null&&(l=We({inputs:{x:o},backend:e,attrs:{perm:a}}),c.push(l),i=se(i.length,l.shape.length)),Se("argMin",[i[0]],l.shape.length);const u=xy(e,l,i[0],"min");return c.forEach(h=>e.disposeIntermediateTensorInfo(h)),u}const hB={kernelName:ca,backendName:"webgl",kernelFunc:uB};const dB=$n+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,pB=Rt({opSnippet:dB}),fB={kernelName:br,backendName:"webgl",kernelFunc:pB};const mB=$n+"return log(x + sqrt(x * x + 1.0));",gB=Rt({opSnippet:mB}),xB={kernelName:yr,backendName:"webgl",kernelFunc:gB};const bB=$n+`
  return atan(x);
`,yB=Rt({opSnippet:bB}),wB={kernelName:wr,backendName:"webgl",kernelFunc:yB};const CB=mp+`
  return atan(a, b);
`,$B=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+So+`
  return result;
`,IB=Te({opSnippet:CB,packedOpSnippet:$B}),vB={kernelName:$r,backendName:"webgl",kernelFunc:IB};const kB=$n+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,SB=Rt({opSnippet:kB}),NB={kernelName:Cr,backendName:"webgl",kernelFunc:SB};class Ji{constructor(t,e,s,o=!1,r=!1){if(this.variableNames=["x"],e==="avg"&&s)throw new Error("Cannot compute positions for average pool.");const i=t.filterWidth,a=t.strideHeight,l=t.strideWidth,c=t.dilationHeight,u=t.dilationWidth,h=t.effectiveFilterHeight,d=t.effectiveFilterWidth,p=t.padInfo.top,f=t.padInfo.left;this.outputShape=t.outShape;const m=e==="avg",g=`((batch  * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + d`,x=`(xR * ${t.inWidth} + xC) * ${t.inChannels} + d`;let b="0.0";if(m||(b="-1.0 / 1e-20"),s){this.userCode=`
        const ivec2 strides = ivec2(${a}, ${l});
        const ivec2 pads = ivec2(${p}, ${f});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${h};
              wR += ${c}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d};
                wC += ${u}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${o?r?g:x:`wR * ${d} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}const w="max";let y=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="avg"&&(y="avgValue / max(count, 1.0)");const $=Math.floor(i/4)*4,I=i%4,v=`
      if (${m}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${w}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${a}, ${l});
      const ivec2 pads = ivec2(${p}, ${f});
      const float initializationValue = ${b};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${t.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${b});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${h};
            wR += ${c}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${t.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${$}; wC += 4) {
            int xC = xCCorner + wC * ${u};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              getValue(batch, xR, xC + 3 * ${u}, d)
            );

            ${v}
          }

          int xC = xCCorner + ${$};
          if (${I===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${v}
          } else if (${I===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              initializationValue,
              initializationValue
            );

            ${v}
          } else if (${I===3}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              initializationValue
            );

            ${v}
          }
        }
        setOutput(${y});
      }
    `}}class xp{constructor(t,e,s,o=!1,r=!1){if(this.variableNames=["x"],e==="avg"&&s)throw new Error("Cannot compute positions for average pool.");const i=t.filterWidth,a=t.strideDepth,l=t.strideHeight,c=t.strideWidth,u=t.dilationDepth,h=t.dilationHeight,d=t.dilationWidth,p=t.effectiveFilterDepth,f=t.effectiveFilterHeight,m=t.effectiveFilterWidth,g=t.padInfo.front,x=t.padInfo.top,b=t.padInfo.left;this.outputShape=t.outShape;const w=e==="avg";let y="0.0";if(w||(y="-1.0 / 1e-20"),s){this.userCode=`
        const ivec3 strides =
            ivec3(${a}, ${l}, ${c});
        const ivec3 pads = ivec3(${g}, ${x}, ${b});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${p};
              wD += ${u}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${t.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${f};
                wR += ${h}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${t.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${m};
                  wC += ${d}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${t.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${o?r?`(((batch * ${t.inDepth} + xD) * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + ch`:`((xD * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + ch`:`wD * ${f} * ${m} +
                      wR * ${m} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}const $="max";let I=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="avg"&&(I="avgValue / max(count, 1.0)");const v=Math.floor(i/4)*4,T=i%4,S=`
      if (${w}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${$}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${a}, ${l}, ${c});
      const ivec3 pads = ivec3(${g}, ${x}, ${b});
      const float initializationValue = ${y};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${t.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${y});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${p};
            wD += ${u}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${t.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${f};
            wR += ${h}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${v}; wC += 4) {
              int xC = xCCorner + wC * ${d};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                getValue(batch, xD, xR, xC + 3 * ${d}, ch)
              );

              ${S}
            }

            int xC = xCCorner + ${v};
            if (${T===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${S}
            } else if (${T===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                initializationValue,
                initializationValue
              );

              ${S}
            } else if (${T===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                initializationValue
              );

              ${S}
            }
          }
        }
        setOutput(${I});
      }
    `}}function TB(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t;Yi(o,"avgPool");const{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=s,c=1;k(De(i,c),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=pn(o.shape,r,i,c,a,l);if(u.filterWidth===1&&u.filterHeight===1&&Lt(u.inShape,u.outShape))return sn({inputs:{x:o},backend:e});const h=new Ji(u,"avg",!1);return e.runWebGLProgram(h,[o],"float32")}const EB={kernelName:ua,backendName:"webgl",kernelFunc:TB};function RB(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{filterSize:r,strides:i,pad:a,dimRoundingMode:l,dataFormat:c}=s,u=[1,1,1],h=as(o.shape,r,i,u,a,l,c),d=new xp(h,"avg",!1);return e.runWebGLProgram(d,[o],"float32")}const AB={kernelName:ha,backendName:"webgl",kernelFunc:RB};class DB{constructor(t){this.variableNames=["dy"],this.outputShape=t.inShape;const e=t.filterHeight,s=t.filterWidth,o=t.strideHeight,r=t.strideWidth,i=t.dilationHeight,a=t.dilationWidth,l=t.effectiveFilterHeight,c=t.effectiveFilterWidth,u=l-1-t.padInfo.top,h=c-1-t.padInfo.left,d=1/(e*s);this.userCode=`
      const ivec2 pads = ivec2(${u}, ${h});
      const float avgMultiplier = float(${d});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${l};
            wR += ${i}) {
          float dyR = float(dyRCorner + wR) / ${o}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${c};
            wC+= ${a}) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}}class FB{constructor(t){this.variableNames=["dy"],this.outputShape=t.inShape;const e=t.filterDepth,s=t.filterHeight,o=t.filterWidth,r=t.strideDepth,i=t.strideHeight,a=t.strideWidth,l=t.dilationDepth,c=t.dilationHeight,u=t.dilationWidth,h=t.effectiveFilterDepth,d=t.effectiveFilterHeight,p=t.effectiveFilterWidth,f=h-1-t.padInfo.front,m=d-1-t.padInfo.top,g=p-1-t.padInfo.left,x=1/(e*s*o);this.userCode=`
      const ivec3 pads = ivec3(${f}, ${m}, ${g});
      const float avgMultiplier = float(${x});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${h};
            wD += ${l}) {
          float dyD = float(dyDCorner + wD) / ${r}.0;

          if (dyD < 0.0 || dyD >= ${t.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${d};
              wR += ${c}) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${p};
                wC += ${u}) {
              float dyC = float(dyCCorner + wC) / ${a}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}function _B(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,input:r}=t,i=r,{filterSize:a,strides:l,pad:c,dimRoundingMode:u}=s,h=[1,1,1],d=as(i.shape,a,l,h,c,u),p=new FB(d);return e.runWebGLProgram(p,[o],i.dtype)}const OB={kernelName:su,backendName:"webgl",kernelFunc:_B};function LB(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,input:r}=t,i=r;Yi([o,r],"avgPoolGrad");const{filterSize:a,strides:l,pad:c}=s,u=pn(i.shape,a,l,1,c),h=new DB(u);return e.runWebGLProgram(h,[o],i.dtype)}const MB={kernelName:nu,backendName:"webgl",kernelFunc:LB};function PB(n){const{inputs:t,backend:e,attrs:s}=n,{a:o,b:r}=t,{transposeA:i,transposeB:a}=s;return Nc({a:o,b:r,transposeA:i,transposeB:a,backend:e})}const BB={kernelName:da,backendName:"webgl",kernelFunc:PB};class zB{constructor(t,e,s,o,r,i){this.outputShape=[],this.variableNames=["x","mean","variance"],yt(t,e),yt(t,s);let a="0.0";o!=null&&(yt(t,o),this.variableNames.push("offset"),a="getOffsetAtOutCoords()");let l="1.0";r!=null&&(yt(t,r),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=t,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${a};
        float scale = ${l};
        float inv = scale * inversesqrt(variance + float(${i}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}}class VB{constructor(t,e,s,o,r,i){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],yt(t,e),yt(t,s);let a="vec4(0.0)";o!=null&&(yt(t,o),this.variableNames.push("offset"),a="getOffsetAtOutCoords()");let l="vec4(1.0)";r!=null&&(yt(t,r),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=t,this.userCode=`
      void main() {
        vec4 offset = ${a};
        vec4 scale = ${l};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${i}));

        setOutput((x - mean) * inv + offset);
      }
    `}}const WB={kernelName:va,backendName:"webgl",kernelFunc:({inputs:n,backend:t,attrs:e})=>{const{x:s,mean:o,variance:r,offset:i,scale:a}=n;k(o.shape.length===r.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),k(i==null||o.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),k(a==null||o.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:l}=e;l==null&&(l=.001);const c=[s,o,r];let u=null;i!=null&&(u=i.shape,c.push(i));let h=null;a!=null&&(h=a.shape,c.push(a));const d=U().getBool("WEBGL_PACK_NORMALIZATION")?new VB(s.shape,o.shape,r.shape,u,h,l):new zB(s.shape,o.shape,r.shape,u,h,l);return t.runWebGLProgram(d,c,c[0].dtype)}};class UB{constructor(t){this.variableNames=["source"],this.outputShape=t,this.rank=t.length;const e=Ut(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];const s=GB(this.rank);let o;const r=t.map((i,a)=>`sourceLoc.${bp[a]} = start[${a}] + coords.${bp[a]};`);o=`
        ${e} sourceLoc;
        ${e} coords = getOutputCoords();
        ${r.join(`
`)}
      `,this.userCode=`
      void main() {
        ${o}
        setOutput(getSource(${s}));
      }
    `}}const bp=["x","y","z","w","u","v"];function GB(n){if(n===1)return"sourceLoc";if(n<=6)return bp.slice(0,n).map(t=>"sourceLoc."+t).join(",");throw Error(`Slicing for rank ${n} is not yet supported`)}class HB{constructor(t){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.rank=t.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];const e=Ut(this.rank),s=Ve("coords",this.rank),o=Ve("sourceLoc",this.rank),r=this.rank===1?"sourceLoc":`vec2(${o.slice(-2).join()})`,i=`getChannel(getSource(${o.join()}), ${r})`,a=`
      result.x = ${i};
      if (++${s[this.rank-1]} < ${t[this.rank-1]}) {
        ++${o[this.rank-1]};
        result.y = ${i};
        --${o[this.rank-1]};
      }
    `,l=this.rank===1?"":`
      --${s[this.rank-1]};
      if (++${s[this.rank-2]} < ${t[this.rank-2]}) {
        ++${o[this.rank-2]};
        result.z = ${i};
        if (++${s[this.rank-1]} < ${t[this.rank-1]}) {
          ++${o[this.rank-1]};
          result.w = ${i};
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            ${e}(${t.map((u,h)=>`start[${h}]`).join()});`:t.map((u,h)=>`${o[h]} = ${s[h]} + start[${h}];`).join(`
`);this.userCode=`
      void main() {
        ${e} coords = getOutputCoords();
        ${e} sourceLoc;
        ${c}
        vec4 result = vec4(0.);
        ${a}
        ${l}
        setOutput(result);
      }
    `}}function qB(n,t,e,s){const o=s.texData.get(n.dataId),r=s.makeTensorInfo(e,n.dtype),i=s.texData.get(r.dataId);Object.assign(i,o),i.refCount=1,i.shape=e,i.dtype=n.dtype;let a=Xm(t,dt(n.shape));o.slice&&(a+=o.slice.flatOffset),i.slice={flatOffset:a,origDataId:o.slice&&o.slice.origDataId||n.dataId};const l=s.dataRefCount.get(i.slice.origDataId)||1;return s.dataRefCount.set(i.slice.origDataId,l+1),r}function dr(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{begin:r,size:i}=s,[a,l]=Wh(o,r,i);if(Gm(o,a,l),X(l)===0)return e.makeTensorInfo(l,o.dtype,[]);if(e.shouldExecuteOnCPU([o])||o.dtype==="string"){const h=e.texData.get(o.dataId),d=BP(h.values,a,l,o.shape,o.dtype);return e.makeTensorInfo(l,o.dtype,d)}const{isPacked:c}=e.texData.get(o.dataId),u=qm(o.shape,a,l);if(c||!u){const h=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new HB(l):new UB(l),d=[a];return e.runWebGLProgram(h,[o],o.dtype,d)}return e.uploadToGPU(o.dataId),qB(o,a,l,e)}const XB={kernelName:Ja,backendName:"webgl",kernelFunc:dr};const KB={kernelName:pa,backendName:"webgl",kernelFunc:n=>{const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{blockShape:r,crops:i}=s;k(o.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");const a=r.reduce((b,w)=>b*w),l=Si(o.shape,r,a),c=Ni(l.length,r.length),u=Ti(o.shape,r,a),h=qh(i,r.length),d=Xh(u,i,r.length),p=[],f=st({inputs:{x:o},backend:e,attrs:{shape:l}}),m=We({inputs:{x:f},backend:e,attrs:{perm:c}}),g=st({inputs:{x:m},backend:e,attrs:{shape:u}}),x=dr({inputs:{x:g},backend:e,attrs:{begin:h,size:d}});return p.push(f),p.push(m),p.push(g),p.forEach(b=>e.disposeIntermediateTensorInfo(b)),x}};function jB(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,weights:r}=t,{size:i}=s,a=e.readSync(o.dataId),l=e.readSync(r.dataId),c=K1(a,l,r.dtype,r.shape,i);return e.makeTensorInfo([i],r.dtype,c)}const YB={kernelName:ou,backendName:"webgl",kernelFunc:jB};const ZB=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,QB=`
  return float(int(a.r) & int(b.r));
`;function JB(n){const{inputs:t,backend:e}=n,{a:s,b:o}=t,r=U().getBool("WEBGL_PACK_BINARY_OPERATIONS"),i=U().getNumber("WEBGL_VERSION");if(e.shouldExecuteOnCPU([s,o])||i===1){const l=e.texData.get(s.dataId).values,c=e.texData.get(o.dataId).values,[u,h]=cP(s.shape,o.shape,l,c,s.dtype),d=e.makeTensorInfo(h,s.dtype),p=e.texData.get(d.dataId);return p.values=u,d}let a;return r?a=new ur(ZB,s.shape,o.shape,!1):a=new ko(QB,s.shape,o.shape),e.runWebGLProgram(a,[s,o],s.dtype)}const tz={kernelName:ru,backendName:"webgl",kernelFunc:JB};function ez(n){const{inputs:t,backend:e}=n,{s0:s,s1:o}=t,r=e.readSync(s.dataId),i=e.readSync(o.dataId),a=yt(Array.from(r),Array.from(i));return e.makeTensorInfo([a.length],"int32",Int32Array.from(a))}const nz={kernelName:Lp,backendName:"webgl",kernelFunc:ez};const by=Te({opSnippet:"return float(a != b);",cpuKernelImpl:RP,dtype:"bool"}),sz={kernelName:Va,backendName:"webgl",kernelFunc:by};function ta(n){const{inputs:t,backend:e}=n,{input:s}=t,o=e.texData.get(s.dataId);return sn({inputs:{x:o.complexTensorInfos.real},backend:e})}const oz={kernelName:Du,backendName:"webgl",kernelFunc:ta};const rz="return float(int(x));";function iz(n,t){const e=new ns(n.shape,rz),s=t.runWebGLProgram(e,[n],"int32");return{dataId:s.dataId,shape:s.shape,dtype:s.dtype}}function yp(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{dtype:r}=s;if(r==="complex64"){if(o.dtype==="complex64")return sn({inputs:{x:o},backend:e});const i=$e(o.shape),a=yp({inputs:{x:o},backend:e,attrs:{dtype:"float32"}}),l=Vs({inputs:{real:a,imag:i},backend:e});return i.dispose(),e.disposeIntermediateTensorInfo(a),l}if(o.dtype==="complex64"){const i=ta({inputs:{input:o},backend:e}),a=yp({inputs:{x:i},backend:e,attrs:{dtype:r}});return e.disposeIntermediateTensorInfo(i),a}if(!Rp(o.dtype,r)){const i=sn({inputs:{x:o},backend:e});return{dataId:i.dataId,shape:i.shape,dtype:r}}if(e.shouldExecuteOnCPU([o])){const i=e.texData.get(o.dataId).values,[a,l,c]=uP(i,o.shape,o.dtype,r);return e.makeTensorInfo(a,l,c)}if(r==="int32")return iz(o,e);if(r==="bool"){const i=e.makeTensorInfo([],"bool",Re("bool",1)),l=by({inputs:{a:o,b:i},backend:e});return e.disposeIntermediateTensorInfo(i),l}throw new Error(`Error in Cast: failed to cast ${o.dtype} to ${r}`)}const az={kernelName:Ir,backendName:"webgl",kernelFunc:yp};const yy="return ceil(x);",lz=Rt({opSnippet:yy,packedOpSnippet:yy,cpuKernelImpl:hP}),cz={kernelName:vr,backendName:"webgl",kernelFunc:lz};class uz{constructor(t){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=t,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}}class hz{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=t,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}}function dz(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{clipValueMin:r,clipValueMax:i}=s;let a;U().getBool("WEBGL_PACK_CLIP")?a=new hz(o.shape):a=new uz(o.shape);const l=[[r],[i]];return e.runWebGLProgram(a,[o],o.dtype,l)}const pz={kernelName:kr,backendName:"webgl",kernelFunc:dz};class fz{constructor(t){this.variableNames=["real","imag"],this.outputShape=t,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}}function wy(n,t){return{dataId:t.dataId,dtype:t.dtype,shape:n.shape}}function mz(n){const{inputs:t,backend:e}=n,{x:s}=t,o=e.texData.get(s.dataId),r=new fz(s.shape),i=[wy(s,o.complexTensorInfos.real),wy(s,o.complexTensorInfos.imag)];return e.runWebGLProgram(r,i,i[0].dtype)}const gz={kernelName:fa,backendName:"webgl",kernelFunc:mz};class xz{constructor(t){this.outputShape=[],this.outputShape=Xn(t,1),this.variableNames=t.map((i,a)=>`T${a}`);const e=new Array(t.length-1);e[0]=t[0][1];for(let i=1;i<e.length;i++)e[i]=e[i-1]+t[i][1];const s=[`if (yC < ${e[0]}) setOutput(getT0(yR, yC));`];for(let i=1;i<e.length;i++){const a=e[i-1];s.push(`else if (yC < ${e[i]}) setOutput(getT${i}(yR, yC-${a}));`)}const o=e.length,r=e[e.length-1];s.push(`else setOutput(getT${o}(yR, yC-${r}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${s.join(`
        `)}
      }
    `}}class bz{constructor(t,e){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=Xn(t,e);const s=this.outputShape,o=s.length,r=Ut(o),i=Ve("coords",o),a=["x","y","z","w","u","v"].slice(0,o);this.variableNames=t.map((m,g)=>`T${g}`);const l=new Array(t.length-1);l[0]=t[0][e];for(let m=1;m<l.length;m++)l[m]=l[m-1]+t[m][e];const c=a[e],u=a.slice(-2),h=a.join();let d=`if (${c} < ${l[0]}) {
        return getChannel(
            getT0(${h}), vec2(${u.join()}));
        }`;for(let m=1;m<l.length;m++){const g=l[m-1];d+=`
        if (${c} < ${l[m]}  && ${c} >= ${l[m-1]}) {
          return getChannel(
            getT${m}(${Ec(a,c,g)}),
            vec2(${Ec(u,c,g)}));
        }`}const p=l.length,f=l[l.length-1];d+=`
        return getChannel(
          getT${p}(${Ec(a,c,f)}),
          vec2(${Ec(u,c,f)}));`,this.userCode=`
      float getValue(${a.map(m=>"int "+m)}) {
        ${d}
      }

      void main() {
        ${r} coords = getOutputCoords();
        vec4 result = vec4(getValue(${i}), 0., 0., 0.);

        ${i[o-1]} = ${i[o-1]} + 1;
        if (${i[o-1]} < ${s[o-1]}) {
          result.g = getValue(${i});
        }

        ${i[o-2]} = ${i[o-2]} + 1;
        if (${i[o-2]} < ${s[o-2]}) {
          result.a = getValue(${i});
        }

        ${i[o-1]} = ${i[o-1]} - 1;
        if (${i[o-2]} < ${s[o-2]} &&
            ${i[o-1]} < ${s[o-1]}) {
          result.b = getValue(${i});
        }
        setOutput(result);
      }
    `}}function Ec(n,t,e){const s=n.indexOf(t);return n.map((r,i)=>i===s?`${r} - ${e}`:r).join()}function Rc(n){const{inputs:t,backend:e}=n,{input:s}=t,o=e.texData.get(s.dataId);return sn({inputs:{x:o.complexTensorInfos.imag},backend:e})}const yz={kernelName:vu,backendName:"webgl",kernelFunc:Rc};function ea(n,t,e){const s=n[0].dtype;if(s==="complex64"){const p=n.map(b=>ta({inputs:{input:b},backend:e})),f=n.map(b=>Rc({inputs:{input:b},backend:e})),m=ea(p,t,e),g=ea(f,t,e),x=Vs({inputs:{real:m,imag:g},backend:e});return p.forEach(b=>e.disposeIntermediateTensorInfo(b)),f.forEach(b=>e.disposeIntermediateTensorInfo(b)),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(g),x}let o=e.shouldExecuteOnCPU(n);if(s==="string"&&(o=!0),o){const p=n.map(y=>{const I=[-1,X(y.shape.slice(t))];return st({inputs:{x:y},backend:e,attrs:{shape:I}})}),f=p.map(y=>({vals:e.readSync(y.dataId),shape:y.shape})),m=Xn(p.map(y=>y.shape),1),g=p[0].shape[0]===1,x=dP(f,m,s,g),b=Xn(n.map(y=>y.shape),t),w=e.makeTensorInfo(b,s,x);return p.forEach(y=>e.disposeIntermediateTensorInfo(y)),w}const r=n.filter(p=>X(p.shape)>0),i=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&r[0].shape.length>1;if(r.length===1){const p=i?new ns(n[0].shape,Bs):new zs(n[0].shape,Bs);return e.runWebGLProgram(p,n,s)}const a=U().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(r.length>a){const p=[];for(let m=0;m<r.length;m+=a){const g=r.slice(m,m+a);p.push(ea(g,t,e))}const f=ea(p,t,e);for(const m of p)e.disposeIntermediateTensorInfo(m);return f}if(i){const p=new bz(r.map(f=>f.shape),t);return e.runWebGLProgram(p,r,s)}const{tensors2D:l,outShape:c}=wz(r,t,e),u=new xz(l.map(p=>p.shape)),h=e.runWebGLProgram(u,l,s);l.forEach(p=>e.disposeIntermediateTensorInfo(p));const d=st({inputs:{x:h},attrs:{shape:c},backend:e});return e.disposeIntermediateTensorInfo(h),d}function wz(n,t,e){const s=Xn(n.map(r=>r.shape),t);return{tensors2D:n.map(r=>st({inputs:{x:r},attrs:{shape:[-1,X(r.shape.slice(t))]},backend:e})),outShape:s}}function Cy(n){const{inputs:t,backend:e,attrs:s}=n,{axis:o}=s,r=$t(o,t[0].shape)[0],i=t.map(c=>c.shape);Uh(i,r);const a=Xn(t.map(c=>c.shape),r);if(X(a)===0)return e.makeTensorInfo(a,t[0].dtype,[]);const l=t.filter(c=>X(c.shape)>0);return l.length===1?sn({inputs:{x:l[0]},backend:e}):ea(l,r,e)}const Cz={kernelName:ma,backendName:"webgl",kernelFunc:Cy};class $y{constructor(t,e=!1,s=null,o=!1,r=!1){this.variableNames=["x","W"],this.outputShape=t.outShape;const i=t.padInfo.top,a=t.padInfo.left,l=t.strideHeight,c=t.strideWidth,u=t.dilationHeight,h=t.dilationWidth,d=t.filterHeight,p=t.filterWidth,f=Math.floor(t.inChannels/4)*4,m=t.inChannels%4,g=t.dataFormat==="channelsLast",x=g?1:2,b=g?2:3,w=g?3:1;let y="",$="";s&&(o?y=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${s}
        }`:r?y=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${s}
        }`:y=`
          float activation(float x) {
            ${s}
          }
        `,$="result = activation(result);");const I=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),r&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${y}

      const ivec2 strides = ivec2(${l}, ${c});
      const ivec2 pads = ivec2(${i}, ${a});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${w}];

        ivec2 xRCCorner =
            ivec2(coords[${x}], coords[${b}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${d}; wR++) {
          int xR = xRCorner + wR * ${u};

          if (xR < 0 || xR >= ${t.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${p}; wC++) {
            int xC = xCCorner + wC * ${h};

            if (xC < 0 || xC >= ${t.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${f}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${g}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${m===1}) {

              if (${g}) {
                dotProd +=
                    getX(batch, xR, xC, ${f}) *
                    getW(wR, wC, ${f}, d2);
              } else {
                dotProd +=
                    getX(batch, ${f}, xR, xC) *
                    getW(wR, wC, ${f}, d2);
              }

            } else if (${m===2}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2)
              );

              if (${g}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${m===3}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${f}, d2),
                getW(wR, wC, ${f} + 1, d2),
                getW(wR, wC, ${f} + 2, d2)
              );

              if (${g}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${f}),
                  getX(batch, xR, xC, ${f} + 1),
                  getX(batch, xR, xC, ${f} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${f}, xR, xC),
                  getX(batch, ${f} + 1, xR, xC),
                  getX(batch, ${f} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${I}
        ${$}
        setOutput(result);
      }
    `}}class $z{constructor(t){this.variableNames=["x","W"],this.outputShape=t.outShape;const e=t.padInfo.front,s=t.padInfo.top,o=t.padInfo.left,r=t.strideDepth,i=t.strideHeight,a=t.strideWidth,l=t.dilationDepth,c=t.dilationHeight,u=t.dilationWidth,h=t.filterDepth,d=t.filterHeight,p=t.filterWidth,f=Math.floor(t.inChannels/4)*4,m=t.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${r}, ${i}, ${a});
      const ivec3 pads = ivec3(${e}, ${s}, ${o});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${h}; wF++) {
          int xF = xFCorner + wF * ${l};

          if (xF < 0 || xF >= ${t.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${d}; wR++) {
            int xR = xRCorner + wR * ${c};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${p}; wC++) {
              int xC = xCCorner + wC * ${u};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${f}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${m===1}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${f}) *
                  getW(wF, wR, wC, ${f}, d2);
              } else if (${m===2}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${m===3}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${f}),
                  getX(batch, xF, xR, xC, ${f} + 1),
                  getX(batch, xF, xR, xC, ${f} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${f}, d2),
                  getW(wF, wR, wC, ${f} + 1, d2),
                  getW(wF, wR, wC, ${f} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class Iy{constructor(t,e=!1,s=null,o=!1,r=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=Oe(this.outputShape.length);const i=t.padInfo.left,a=t.strideWidth,l=t.dilationWidth,c=t.filterHeight,u=t.filterWidth,h=u;let d=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let g=0;g<u;g++)d+=`
           vec4 xTexelC${g*2};
           int xTexelC${g*2}Ready;
           vec4 xTexelC${g*2+1};
           int xTexelC${g*2+1}Ready;
           vec4 xC${g};`;d+=`
     for (int r = 0; r < ${c}; r++) {
      for (int d1 = 0; d1 < ${t.inChannels}; d1 += 2) {
       `;for(let g=0;g<u;g++)d+=`
           xTexelC${g*2} = vec4(0.0);
           xTexelC${g*2}Ready = 0;
           xTexelC${g*2+1} = vec4(0.0);
           xTexelC${g*2+1}Ready = 0;
           xC${g} = vec4(0.0);`;d+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let g=0;g<(h+1)/2;g++){const x=g*2;if(d+=`
           xC = xCCorner + ${x*l};
           `,a===1){if(x<u&&(i%2===1?(d+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }
               `,l===1&&x>0?d+=`
                 xC${x} = vec4(xTexelC${x-2}.zw, xTexelC${x}.xy);
                 `:d+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${x} = vec4(previous.zw, xTexelC${x}.xy);
                   } else {
                     xC${x} = vec4(0.0, 0.0, xTexelC${x}.xy);
                   }
                   `):d+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xC${x} = xTexelC${x};
                 `,x+1<u)){const b=i%2===0?Nn(l):l;l%2===0&&i%2===1||l%2!==0&&i%2!==1?(d+=`
                   xCOffset = xC + imod(pads[1], 2) + ${b};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                     xTexelC${x+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${x+1}.zw = vec2(0.0);
                     }
                     xTexelC${x+1}Ready = 1;
                   }
                   `,l>1?d+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${x+1} = vec4(previous.zw, xTexelC${x+1}.xy);
                     } else {
                      xC${x+1} = vec4(0.0, 0.0, xTexelC${x+1}.xy);
                     }
                     `:d+=`
                     xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.xy);
                     `):b===1?d+=`
                     xC${x+1} = xTexelC${x};
                     `:d+=`
                     xCOffset = xC + ${b};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                       xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${x+1}.zw = vec2(0.0);
                       }
                       xTexelC${x+1}Ready = 1;
                     }

                     xC${x+1} = xTexelC${x+1};
                     `}}else x<u&&(i%2===1?(d+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.0);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
               `,x+1<u&&(d+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${x+1} = vec4(xTexelC${x+1}.xy, final.xy);
                 `)):(d+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(
                   xTexelC${x}.xy, xTexelC${x+1}.xy);
               `,x+1<u&&(d+=`
                   xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
                 `)));x<u&&(d+=`
             wTexel = getW(r, ${x}, d1, d2);
             dotProd += xC${x}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${t.inChannels}) {
               dotProd += xC${x}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,x+1<u&&(d+=`
               wTexel = getW(r, ${x+1}, d1, d2);
               dotProd += xC${x+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${t.inChannels}) {
                 dotProd += xC${x+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}d+=`
     }
   `,d+=`
     }
   `,d+=`
     }
   `;let p="",f="";s&&(o?p=`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${s}
         }`:r?p=`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${s}
         }`:p=`vec4 activation(vec4 x) {
           ${s}
         }`,f="result = activation(result);");const m=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),r&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${p}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${d}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${m}
         ${f}
         setOutput(result);
       }
     `}}class Iz{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=t,this.enableShapeUniforms=Oe(this.outputShape.length);const{dataFormat:s}=e,o=ze(),r=s==="channelsLast",i=r?1:2,a=r?2:3,l=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${t[2]} && pos < ${t[1]}) {`;let c="";for(let u=0;u<=1;u++)for(let h=0;h<=1;h++)c+=`
          blockIndex = rc.z + ${h};
          pos = rc.y + ${u};

          ${l}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${i}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${a}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${r}) {
                  innerDims = vec2(d1, ch);
                  result[${u*2+h}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${u*2+h}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${c}

        ${o.output} = result;
      }
    `}}function Ac(n,t){const e=n.length;return e>=3?t?[...n.slice(0,-3),n[e-3]*n[e-2],n[e-1]]:[...n.slice(0,-3),n[e-3],n[e-2]*n[e-1]]:!t&&e===1&&n[0]>1?[n[0],1]:null}function vy({x:n,filter:t,convInfo:e,backend:s,bias:o=null,preluActivationWeights:r=null,leakyreluAlpha:i=0,activation:a=null}){const l=n.shape,c=s.texData.get(n.dataId),u=e.inChannels,h=l[0]*l[1]*l[2],d=e.outChannels,p=e.dataFormat==="channelsLast",f=!1,m=!1;let g;const x=[];if(r!=null){const y=Ac(r.shape,p);y!=null&&(r=st({inputs:{x:r},backend:s,attrs:{shape:y}}),x.push(r))}if(o!=null){const y=Ac(o.shape,p);y!=null&&(o=st({inputs:{x:o},backend:s,attrs:{shape:y}}),x.push(o))}if(!((h===1||d===1)&&u>dy)&&c.isPacked&&p&&c.texture!=null&&l[2]%2!==0&&Lt(c.shape.slice(-3),l.slice(-3))){const y=l[0]*l[1]*(l[2]+1),$={dataId:n.dataId,shape:[1,y,e.inChannels],dtype:n.dtype},I=c.shape;c.shape=c.shape.slice(),c.shape[c.shape.length-2]++,k(Cc(c.shape,$.shape),()=>`packed reshape ${c.shape} to ${$.shape} isn't free`);const v=st({inputs:{x:t},backend:s,attrs:{shape:[1,e.inChannels,e.outChannels]}});x.push(v);const T=Nc({a:$,b:v,backend:s,transposeA:f,transposeB:m,bias:o,activation:a,preluActivationWeights:r,leakyreluAlpha:i}),S=s.texData.get(T.dataId);k(S.isPacked,()=>"batchMatMul result is expected to be packed"),c.shape=I,S.shape=e.outShape,g=sn({inputs:{x:T},backend:s}),g.shape=e.outShape,x.push(T)}else{const y=e.outHeight*e.outWidth,$=st({inputs:{x:n},backend:s,attrs:{shape:p?[e.batchSize,y,e.inChannels]:[e.batchSize,e.inChannels,y]}}),I=st({inputs:{x:t},backend:s,attrs:{shape:[1,e.inChannels,e.outChannels]}}),v=Nc({a:p?$:I,b:p?I:$,transposeA:!p,transposeB:m,backend:s,bias:o,activation:a,preluActivationWeights:r,leakyreluAlpha:i});g=st({inputs:{x:v},backend:s,attrs:{shape:e.outShape}}),x.push($),x.push(I),x.push(v)}for(const y of x)s.disposeIntermediateTensorInfo(y);return g}function ky({x:n,filter:t,convInfo:e,backend:s,bias:o=null,preluActivationWeights:r=null,leakyreluAlpha:i=0,activation:a=null}){const{filterWidth:l,filterHeight:c,inChannels:u,outWidth:h,outHeight:d,dataFormat:p}=e,f=p==="channelsLast",m=l*c*u,g=d*h,x=[e.batchSize,m,g],b=!0,w=!1,y=[];if(r!=null){const B=Ac(r.shape,f);B!=null&&(r=st({inputs:{x:r},backend:s,attrs:{shape:B}}),y.push(r))}if(o!=null){const B=Ac(o.shape,f);B!=null&&(o=st({inputs:{x:o},backend:s,attrs:{shape:B}}),y.push(o))}const $=st({inputs:{x:t},backend:s,attrs:{shape:[1,m,X(t.shape)/m]}});y.push($);const I=new Iz(x,e),v=[n.shape,[e.padInfo.top,e.padInfo.left],[e.strideHeight,e.strideWidth],[e.dilationHeight,e.dilationWidth],[e.inChannels],[e.filterWidth*e.inChannels],[e.outWidth]],T=s.runWebGLProgram(I,[n],"float32",v),S=st({inputs:{x:T},backend:s,attrs:{shape:x}});y.push(T),y.push(S);const N=o!=null,C=r!=null,E=a==="leakyrelu",R=a?Qi(a,!0):null,D=new ay(f?S.shape:$.shape,f?$.shape:S.shape,f?[e.batchSize,g,e.outChannels]:[e.batchSize,e.outChannels,g],b,w,N,R,C,E),F=f?[S,$]:[$,S];if(o&&F.push(o),C&&F.push(r),E){const B=s.makeTensorInfo([],"float32",ys(i,"float32"));F.push(B),y.push(B)}const O=s.runWebGLProgram(D,F,"float32"),P=st({inputs:{x:O},backend:s,attrs:{shape:e.outShape}});y.push(O);for(const B of y)s.disposeIntermediateTensorInfo(B);return P}function vz(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r}=t,{strides:i,pad:a,dataFormat:l,dilations:c,dimRoundingMode:u}=s,h=ls(l),d=ke(o.shape,r.shape,i,c,a,u,!1,h);let p;if(d.filterHeight===1&&d.filterWidth===1&&d.dilationHeight===1&&d.dilationWidth===1&&d.strideHeight===1&&d.strideWidth===1&&(d.padInfo.type==="SAME"||d.padInfo.type==="VALID"))p=vy({x:o,filter:r,convInfo:d,backend:e});else if(d.strideWidth<=2&&h==="channelsLast"&&U().getBool("WEBGL_EXP_CONV")){const m=new Iy(d),g=[[d.padInfo.top,d.padInfo.left],[d.strideHeight,d.strideWidth],[d.dilationHeight,d.dilationWidth],[d.inHeight,d.inWidth]];p=e.runWebGLProgram(m,[o,r],"float32",g)}else if(U().getBool("WEBGL_CONV_IM2COL"))p=ky({x:o,filter:r,convInfo:d,backend:e});else{const m=new $y(d);p=e.runWebGLProgram(m,[o,r],"float32")}const f=st({inputs:{x:p},backend:e,attrs:{shape:d.outShape}});return e.disposeIntermediateTensorInfo(p),f}const kz={kernelName:ga,backendName:"webgl",kernelFunc:vz};class Sz{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;const e=t.strideHeight,s=t.strideWidth,o=t.padInfo.top,r=t.padInfo.left,i=t.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yR = 0; yR < ${t.outHeight}; yR++) {
            int xR = wR + yR * ${e} - ${o};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${t.outWidth}; yC++) {
              int xC = wC + yC * ${s} - ${r};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              ${i?`float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);`:`float dyValue = getDy(b, d2, yR, yC);
              float xValue = getX(b, d1, xR, xC);
              dotProd += (xValue * dyValue);`}
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class Nz{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;const e=t.filterHeight,s=t.filterWidth,o=t.strideHeight,r=t.strideWidth,i=t.dataFormat==="channelsLast",a=e-1-t.padInfo.top,l=s-1-t.padInfo.left,c=i?1:2,u=i?2:3,h=i?3:1;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${l});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${h}];

        ivec2 dyCorner = ivec2(coords[${c}], coords[${u}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / ${o}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${s}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${s} - 1 - wC;

            for (int d2 = 0; d2 < ${t.outChannels}; d2++) {

              if (${i}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}}class Tz{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;const e=t.strideDepth,s=t.strideHeight,o=t.strideWidth,r=t.padInfo.front,i=t.padInfo.top,a=t.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yF = 0; yF < ${t.outDepth}; yF++) {
            int xF = wF + yF * ${e} - ${r};

            if (xF < 0 || xF >= ${t.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${t.outHeight}; yR++) {
              int xR = wR + yR * ${s} - ${i};

              if (xR < 0 || xR >= ${t.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${t.outWidth}; yC++) {
                int xC = wC + yC * ${o} - ${a};

                if (xC < 0 || xC >= ${t.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class Ez{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;const e=t.filterDepth,s=t.filterHeight,o=t.filterWidth,r=t.strideDepth,i=t.strideHeight,a=t.strideWidth,l=e-1-t.padInfo.front,c=s-1-t.padInfo.top,u=o-1-t.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${l}, ${c}, ${u});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${e}; wF++) {
          float dyF = float(dyFCorner + wF) / ${r}.0;

          if (dyF < 0.0 || dyF >= ${t.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${e} - 1 - wF;

          for (int wR = 0; wR < ${s}; wR++) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${s} - 1 - wR;

            for (int wC = 0; wC < ${o}; wC++) {
              float dyC = float(dyCCorner + wC) / ${a}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${o} - 1 - wC;

              for (int d2 = 0; d2 < ${t.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}function Rz(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,dy:r}=t,{strides:i,pad:a,dataFormat:l,dimRoundingMode:c,filterShape:u}=s,h=ls(l),d=ke(o.shape,u,i,1,a,c,!1,h),p=new Sz(d);return e.runWebGLProgram(p,[o,r],"float32")}const Az={kernelName:au,backendName:"webgl",kernelFunc:Rz};class Dz{constructor(t){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=t.inShape,this.enableShapeUniforms=Oe(this.outputShape.length);const e=t.filterHeight,s=t.filterWidth,o=e-1-t.padInfo.top,r=s-1-t.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${r});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${s}; wC++) {
            int wCPerm = ${s} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${t.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${t.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec4 dySample2 = (idyC / 2 == idyC2 / 2) ?
                  dySample : getDy(batch, idyR, idyC2, d2);

                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));

                dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample2.xy : dySample2.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${t.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC2, d2);
                vec2 dyValue = mod(float(idyC2), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.zw += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            }
          }
        }
        setOutput(result);
      }
    `}}function Fz(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,filter:r}=t,{inputShape:i,strides:a,pad:l,dataFormat:c,dimRoundingMode:u}=s,h=ls(c),d=ke(i,r.shape,a,1,l,u,!1,h);if(U().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&h==="channelsLast"){const p=[[d.strideHeight,d.strideWidth]],f=new Dz(d);return e.runWebGLProgram(f,[o,r],"float32",p)}else{const p=new Nz(d);return e.runWebGLProgram(p,[o,r],"float32")}}const _z={kernelName:xa,backendName:"webgl",kernelFunc:Fz};function Oz(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r}=t,{strides:i,pad:a,dilations:l}=s,c=vs(o.shape,r.shape,i,l,a),u=new $z(c);return e.runWebGLProgram(u,[o,r],"float32")}const Lz={kernelName:ba,backendName:"webgl",kernelFunc:Oz};function Mz(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,dy:r}=t,{strides:i,pad:a,filterShape:l}=s,c=vs(o.shape,l,i,1,a),u=new Tz(c);return e.runWebGLProgram(u,[o,r],"float32")}const Pz={kernelName:lu,backendName:"webgl",kernelFunc:Mz};function Bz(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,filter:r}=t,{pad:i,strides:a,inputShape:l}=s,c=vs(l,r.shape,a,1,i),u=new Ez(c);return e.runWebGLProgram(u,[o,r],"float32")}const zz={kernelName:cu,backendName:"webgl",kernelFunc:Bz};const Vz=hr+`
  return cos(x);
`,Wz=`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${So}
  return result;
`,Uz=Rt({opSnippet:Vz,packedOpSnippet:Wz}),Gz={kernelName:Sr,backendName:"webgl",kernelFunc:Uz};const Hz=Rt({opSnippet:`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`}),qz={kernelName:Nr,backendName:"webgl",kernelFunc:Hz};class Xz{constructor(t,e,s,o,r){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];const[i,a,l,c]=t,[u]=e,[h,d]=s;this.outputShape=[u,h,d,c];const p=o==="bilinear"?1:0,[f,m]=[`${a-1}.0`,`${l-1}.0`],[g,x,b]=h>1?[`${(a-1)/(h-1)}`,"(y2-y1) * height_ratio",`y1*${f} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${f}`],[w,y,$]=d>1?[`${(l-1)/(d-1)}`,"(x2-x1) * width_ratio",`x1*${m} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${m}`];this.userCode=`
      const float height_ratio = float(${g});
      const float width_ratio = float(${w});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${i}) {
          return;
        }

        float height_scale = ${x};
        float width_scale = ${y};

        float in_y = ${b};
        if( in_y < 0.0 || in_y > ${f} ) {
          setOutput(float(${r}));
          return;
        }
        float in_x = ${$};
        if( in_x < 0.0 || in_x > ${m} ) {
          setOutput(float(${r}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${p} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}}const Kz={kernelName:hu,backendName:"webgl",kernelFunc:n=>{const{inputs:t,backend:e,attrs:s}=n,{image:o,boxes:r,boxInd:i}=t,{cropSize:a,method:l,extrapolationValue:c}=s,u=new Xz(o.shape,r.shape,a,l,c);return e.runWebGLProgram(u,[o,r,i],"float32")}};var na;(function(n){n.Prod="*",n.Sum="+"})(na||(na={}));class Sy{constructor(t,e,s,o){this.op=t,this.outputShape=e,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];const r=this.outputShape.length,i=this.op===na.Prod?"1.0":"0.0",a=s?i:`getX(${Ny(r,"coords",this.op)})`,l=this.outputShape[this.outputShape.length-1];let c="",u="";s?(c=o?`end != ${l-1}`:"end != 0",u=o?"end + 1":"end - 1"):(c=o?`end + pow2 < ${l}`:"end >= pow2",u=o?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${Ut(r)} coords = getOutputCoords();
        int end = ${Ty(r,"coords",this.op)};
        float val = ${a};
        int pow2 = int(pow(2.0, index));
        if (${c}) {
          int idx = ${u};
          ${Ty(r,"coords",this.op)} = idx;
          val ${this.op}= getX(${Ny(r,"coords",this.op)});
        }
        setOutput(val);
      }
    `}}function Ny(n,t,e){if(n===1)return`${t}`;if(n===2)return`${t}.x, ${t}.y`;if(n===3)return`${t}.x, ${t}.y, ${t}.z`;if(n===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw new Error(`Cumulative ${e} for rank ${n} is not yet supported`)}function Ty(n,t,e){if(n===1)return`${t}`;if(n===2)return`${t}.y`;if(n===3)return`${t}.z`;if(n===4)return`${t}.w`;throw new Error(`Cumulative ${e} for rank ${n} is not yet supported`)}function Ey(n,t,e,s,o,r){const i=t.shape.length,a=Qt([s],i);let l=t;a!=null&&(l=We({inputs:{x:t},backend:e,attrs:{perm:a}}));const c=se(1,i)[0];if(c!==i-1)throw new Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${s}`);const u=l.shape[c];let h=sn({inputs:{x:l},backend:e});for(let d=0;d<=Math.ceil(Math.log2(u))-1;d++){const p=new Sy(n,l.shape,!1,r),f=[[d]],m=h;h=e.runWebGLProgram(p,[h],h.dtype,f),e.disposeIntermediateTensorInfo(m)}if(o){const d=new Sy(n,l.shape,o,r),p=h;h=e.runWebGLProgram(d,[h],h.dtype),e.disposeIntermediateTensorInfo(p)}if(a!=null){const d=ks(a),p=We({inputs:{x:h},backend:e,attrs:{perm:d}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(l),p}return h}function jz(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,exclusive:i,reverse:a}=s;return Ey(na.Prod,o,e,r,i,a)}const Yz={kernelName:uu,backendName:"webgl",kernelFunc:jz};function Zz(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,exclusive:i,reverse:a}=s;return Ey(na.Sum,o,e,r,i,a)}const Qz={kernelName:ya,backendName:"webgl",kernelFunc:Zz};function Jz(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,weights:r}=t,{size:i,binaryOutput:a}=s;if(o.shape.length===1){const l=e.readSync(o.dataId),c=e.readSync(r.dataId),u=K1(l,c,r.dtype,r.shape,i);return e.makeTensorInfo([i],r.dtype,u)}else if(o.shape.length===2){const l=e.bufferSync(o),c=e.bufferSync(r),u=lP(l,c,i,a);return e.makeTensorInfo(u.shape,r.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${o.shape.length}.`)}const tV={kernelName:du,backendName:"webgl",kernelFunc:Jz};class eV{constructor(t,e,s){this.variableNames=["x"],this.outputShape=[],this.outputShape=t,this.blockSize=e,this.dataFormat=s,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${e};
      int offset_h = imod(h, ${e});
      int in_w = w / ${e};
      int offset_w = imod(w, ${e});
      int offset_d = (offset_h * ${e} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}}function nV(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{blockSize:r,dataFormat:i}=s,a=o.shape[0],l=i==="NHWC"?o.shape[1]:o.shape[2],c=i==="NHWC"?o.shape[2]:o.shape[3],u=i==="NHWC"?o.shape[3]:o.shape[1],h=l*r,d=c*r,p=u/(r*r),f=i==="NHWC"?[a,h,d,p]:[a,p,h,d],m=new eV(f,r,i);return e.runWebGLProgram(m,[o],o.dtype)}const sV={kernelName:pu,backendName:"webgl",kernelFunc:nV};class Ry{constructor(t,e=!1,s=null,o=!1,r=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=Oe(this.outputShape.length);const i=t.filterHeight,a=t.filterWidth,l=t.outChannels/t.inChannels;let c="",u="";s&&(o?c=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${s}
        }`:r?c=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${s}
        }`:c=`
          float activation(float x) {
            ${s}
          }
        `,u="result = activation(result);");const h=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),r&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${c}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${l};
        int q = d2 - d1 * ${l};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${i}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${a}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${h}
        ${u}
        setOutput(result);
      }
    `}}class Ay{constructor(t,e=!1,s=null,o=!1,r=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=Oe(this.outputShape.length);const i=t.outChannels/t.inChannels,a=t.padInfo.left,l=t.strideWidth,c=t.dilationWidth,u=t.filterHeight,h=t.filterWidth,d=h;let p=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let x=0;x<h;x++)p+=`
          vec4 xTexelC${x*2};
          int xTexelC${x*2}Ready;
          vec4 xTexelC${x*2+1};
          int xTexelC${x*2+1}Ready;
          vec4 xC${x};`;p+=`
    for (int r = 0; r < ${u}; r++) {
      `;for(let x=0;x<h;x++)p+=`
          xTexelC${x*2} = vec4(0.0);
          xTexelC${x*2}Ready = 0;
          xTexelC${x*2+1} = vec4(0.0);
          xTexelC${x*2+1}Ready = 0;
          xC${x} = vec4(0.0);`;p+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let x=0;x<(d+1)/2;x++){const b=x*2;if(p+=`
          xC = xCCorner + ${b*c};
          `,l===1){if(b<h&&(a%2===1?(p+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }
              `,c===1&&b>0?p+=`
                xC${b} = vec4(xTexelC${b-2}.zw, xTexelC${b}.xy);
                `:p+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${b} = vec4(previous.zw, xTexelC${b}.xy);
                  } else {
                    xC${b} = vec4(0.0, 0.0, xTexelC${b}.xy);
                  }
                  `):p+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                xC${b} = xTexelC${b};
                `,b+1<h)){const w=a%2===0?Nn(c):c;c%2===0&&a%2===1||c%2!==0&&a%2!==1?(p+=`
                  xCOffset = xC + imod(pads[1], 2) + ${w};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                    xTexelC${b+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${b+1}.zw = vec2(0.0);
                    }
                    xTexelC${b+1}Ready = 1;
                  }
                  `,c>1?p+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${b+1} = vec4(previous.zw, xTexelC${b+1}.xy);
                    } else {
                     xC${b+1} = vec4(0.0, 0.0, xTexelC${b+1}.xy);
                    }
                    `:p+=`
                    xC${b+1} = vec4(xTexelC${b}.zw, xTexelC${b+1}.xy);
                    `):w===1?p+=`
                    xC${b+1} = xTexelC${b};
                    `:p+=`
                    xCOffset = xC + ${w};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                      xTexelC${b+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${b+1}.zw = vec2(0.0);
                      }
                      xTexelC${b+1}Ready = 1;
                    }

                    xC${b+1} = xTexelC${b+1};
                    `}}else b<h&&(a%2===1?(p+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${b+1}Ready == 0) {
                  xTexelC${b+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${b+1}.zw = vec2(0.0);
                  }
                  xTexelC${b+1}Ready = 1;
                }

                xC${b} = vec4(xTexelC${b}.zw, xTexelC${b+1}.zw);
              `,b+1<h&&(p+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${b+1} = vec4(xTexelC${b+1}.xy, final.xy);
                `)):(p+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                  xTexelC${b+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b+1}.zw = vec2(0.);
                  }
                  xTexelC${b+1}Ready = 1;
                }

                xC${b} = vec4(
                  xTexelC${b}.xy, xTexelC${b+1}.xy);
              `,b+1<h&&(p+=`
                  xC${b+1} = vec4(xTexelC${b}.zw, xTexelC${b+1}.zw);
                `)));b<h&&(p+=`
            wTexel = getW(r, ${b}, d1, q);
            dotProd += xC${b} * vec4(wTexel.xz, wTexel.xz);
          `,b+1<h&&(p+=`
              wTexel = getW(r, ${b+1}, d1, q);
              dotProd += xC${b+1} * vec4(wTexel.xz, wTexel.xz);
            `))}p+=`
    }
  `,p+=`
      }
    `;let f="",m="";s&&(o?f=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${s}
        }`:r?f=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${s}
        }`:f=`vec4 activation(vec4 x) {
          ${s}
        }`,m="result = activation(result);");const g=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),r&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${f}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${i};
        int q = d2 - d1 * ${i};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${p}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${g}
        ${m}
        setOutput(result);
      }
    `}}function oV(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r}=t,{strides:i,pad:a,dilations:l,dimRoundingMode:c}=s;let u=l;u==null&&(u=[1,1]),k(De(i,u),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${u}'`);const h=ke(o.shape,r.shape,i,u,a,c,!0);let d;U().getBool("WEBGL_PACK_DEPTHWISECONV")&&h.strideWidth<=2&&h.outChannels/h.inChannels===1?d=new Ay(h):d=new Ry(h);const p=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]];return e.runWebGLProgram(d,[o,r],"float32",p)}const rV={kernelName:wa,backendName:"webgl",kernelFunc:oV};class iV{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;const e=t.strideHeight,s=t.strideWidth,o=t.padInfo.top,r=t.padInfo.left,i=t.outChannels/t.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${i} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yR = 0; yR < ${t.outHeight}; yR++) {
            int xR = wR + yR * ${e} - ${o};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${t.outWidth}; yC++) {
              int xC = wC + yC * ${s} - ${r};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}}class aV{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;const e=t.filterHeight,s=t.filterWidth,o=t.strideHeight,r=t.strideWidth,i=e-1-t.padInfo.top,a=s-1-t.padInfo.left,l=t.outChannels/t.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${a});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / ${o}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${s}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${s} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${l}; dm++) {
              int d2 = d1 * ${l} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}function lV(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,dy:r}=t,{strides:i,dilations:a,pad:l,dimRoundingMode:c,filterShape:u}=s,h=ke(o.shape,u,i,a,l,c,!0),d=new iV(h);return e.runWebGLProgram(d,[o,r],"float32")}const cV={kernelName:fu,backendName:"webgl",kernelFunc:lV};function uV(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,filter:r}=t,{strides:i,dilations:a,pad:l,dimRoundingMode:c,inputShape:u}=s,h=ke(u,r.shape,i,a,l,c,!0),d=new aV(h);return e.runWebGLProgram(d,[o,r],"float32")}const hV={kernelName:mu,backendName:"webgl",kernelFunc:uV};class dV{constructor(t){this.variableNames=["X"],this.outputShape=[t,t],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}}function pV(n){const{inputs:t,backend:e}=n,{x:s}=t,o=[...s.shape,...s.shape],r=X(s.shape),i=st({inputs:{x:s},backend:e,attrs:{shape:[r]}}),a=new dV(r),l=e.runWebGLProgram(a,[i],i.dtype),c=st({inputs:{x:l},backend:e,attrs:{shape:o}});return e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(l),c}const fV={kernelName:Mp,backendName:"webgl",kernelFunc:pV};class mV{constructor(t){this.variableNames=["x","W"],this.outputShape=t.outShape;const{inHeight:e,inWidth:s,padInfo:o,strideHeight:r,strideWidth:i,filterHeight:a,filterWidth:l,dilationHeight:c,dilationWidth:u}=t,{top:h,left:d}=o;this.userCode=`
      const ivec2 strides = ivec2(${r}, ${i});
      const ivec2 pads = ivec2(${h}, ${d});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${a}; h++) {
          int hIn = hBeg + h * ${c};

          if (hIn >= 0 && hIn < ${e}) {
            for (int w = 0; w < ${l}; w++) {
              int wIn = wBeg + w * ${u};

              if (wIn >= 0 && wIn < ${s}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}}function gV(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r}=t,{strides:i,pad:a,dilations:l}=s,c=mi(o.shape,r.shape,i,a,"NHWC",l);let u;const h=new mV(c);u=e.runWebGLProgram(h,[o,r],"float32");const d=st({inputs:{x:u},backend:e,attrs:{shape:c.outShape}});return e.disposeIntermediateTensorInfo(u),d}const xV={kernelName:Ca,backendName:"webgl",kernelFunc:gV};function bV(n){const{inputs:t,backend:e,attrs:s}=n,{equation:o}=s,r=t,{allDims:i,summedDims:a,idDims:l}=nd(o,r.length);od(i.length,l,r);const{path:c,steps:u}=rd(a,l),h=u.length;let d=null,p=i.length;const f=[];for(let m=0;m<h;++m){for(const g of u[m]){const{permutationIndices:x,expandDims:b}=sd(p,l[g]);let w;id(x)?w=r[g]:(w=We({inputs:{x:r[g]},backend:e,attrs:{perm:x}}),f.push(w));const y=w.shape.slice();for(let $=0;$<b.length;++$)y.splice(b[$],0,1);Lt(w.shape,y)||(w=st({inputs:{x:w},backend:e,attrs:{shape:y}}),f.push(w)),d===null?d=w:(d=gp({inputs:{a:w,b:d},backend:e}),f.push(d))}m<h-1&&(c[m]>=0&&(d=Sc({inputs:{x:d},backend:e,attrs:{axis:c[m]-(i.length-p),keepDims:!1}}),f.push(d)),p--)}for(const m of f)m!==d&&e.disposeIntermediateTensorInfo(m);return d}const yV={kernelName:bu,backendName:"webgl",kernelFunc:bV};const wV=Rt({opSnippet:"return (x >= 0.0) ? x : (exp(x) - 1.0);",packedOpSnippet:`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`}),CV={kernelName:Er,backendName:"webgl",kernelFunc:wV};const $V="return (b >= 0.0) ? a : a * (b + 1.0);",IV=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,vV={kernelName:yu,backendName:"webgl",kernelFunc:n=>{const{inputs:t,backend:e}=n,{dy:s,y:o}=t,r=U().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ur(IV,s.shape,o.shape):new ko($V,s.shape,o.shape);return e.runWebGLProgram(r,[s,o],s.dtype)}};const kV=Te({opSnippet:"return float(a == b);",packedOpSnippet:`
  return vec4(equal(a, b));
`,dtype:"bool",cpuKernelImpl:pP}),SV={kernelName:$a,backendName:"webgl",kernelFunc:kV};const NV=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${Kh};
  float a1 = ${jh};
  float a2 = ${Yh};
  float a3 = ${Zh};
  float a4 = ${Qh};
  float a5 = ${Jh};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,TV=Rt({opSnippet:NV}),EV={kernelName:Rr,backendName:"webgl",kernelFunc:TV};const RV=hr+`
  return exp(x);
`,Dy=Rt({opSnippet:RV,packedOpSnippet:`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:fP,dtype:"float32"}),AV={kernelName:Ar,backendName:"webgl",kernelFunc:Dy};function wp(n){const{inputs:t,attrs:e,backend:s}=n,{dim:o}=e,{input:r}=t,i=r.shape.length,a=r.shape.slice();let l=o;return o<0&&(k(-(i+1)<=o,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),l=i+o+1),a.splice(l,0,1),st({inputs:{x:r},backend:s,attrs:{shape:a}})}const DV={kernelName:Ia,backendName:"webgl",kernelFunc:wp};const Fy="return exp(x) - 1.0;",FV=Rt({opSnippet:Fy,packedOpSnippet:Fy,cpuKernelImpl:mP}),_V={kernelName:Dr,backendName:"webgl",kernelFunc:FV};class _y{constructor(t,e,s){this.variableNames=["real","imag"];const o=e[1];this.outputShape=e;const r=s?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,i=s?`${o}.0`:"1.0";let a;if(t==="real")a="return real * expR - imag * expI;";else if(t==="imag")a="return real * expI + imag * expR;";else throw new Error(`FFT component must be either "real" or "imag", got ${t}.`);this.userCode=`
      const float exponentMultiplier = ${r};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${a}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${o});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${o}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${i};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}}function Oy(n,t,e){const s=e.texData.get(n.dataId),o=X(n.shape),r=n.shape[n.shape.length-1],i=o/r,a=st({inputs:{x:n},backend:e,attrs:{shape:[i,r]}}),l=a.shape,c=new _y("real",l,t),u=new _y("imag",l,t),h=[{dataId:s.complexTensorInfos.real.dataId,dtype:s.complexTensorInfos.real.dtype,shape:l},{dataId:s.complexTensorInfos.imag.dataId,dtype:s.complexTensorInfos.imag.dtype,shape:l}],d=e.runWebGLProgram(c,h,"float32"),p=e.runWebGLProgram(u,h,"float32"),f=Vs({inputs:{real:d,imag:p},backend:e});e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(p);const m=st({inputs:{x:f},backend:e,attrs:{shape:n.shape}});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(f),m}function OV(n){const{inputs:t,backend:e}=n,{input:s}=t;return Oy(s,!1,e)}const LV={kernelName:wu,backendName:"webgl",kernelFunc:OV};class MV{constructor(t,e){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=t,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}}function sa(n){const{backend:t,attrs:e}=n,{shape:s,value:o}=e;let{dtype:r}=e;if(r=r||Fo(o),r==="string"){const i=ee(r,X(s));return i.fill(o),t.makeTensorInfo(s,r,i)}else{const i=new MV(s,o),a=[[o]];return t.runWebGLProgram(i,[],r,a)}}const PV={kernelName:Cu,backendName:"webgl",kernelFunc:sa};class BV{constructor(t){this.variableNames=["Image"],this.outputShape=[];const e=t[2];this.outputShape=t,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${e} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${e}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}}const zV={kernelName:$u,backendName:"webgl",kernelFunc:({inputs:n,backend:t})=>{const{image:e}=n,s=t,o=new BV(e.shape);return s.runWebGLProgram(o,[e],e.dtype)}};const Ly="return floor(x);",VV=Rt({opSnippet:Ly,packedOpSnippet:Ly,cpuKernelImpl:gP}),WV={kernelName:Fr,backendName:"webgl",kernelFunc:VV};const UV=Te({opSnippet:`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,packedOpSnippet:`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,dtype:"int32"}),GV={kernelName:_r,backendName:"webgl",kernelFunc:UV};class HV{constructor(t){this.variableNames=["A"];const e=ze(),[s,o]=t;this.outputShape=t,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${o}.0, ${s}.0);

        vec4 values = ${e.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}}class qV{constructor(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;const e=ze(),[s,o]=t;this.outputShape=t,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${o}.0, ${s}.0);
            vec4 values = ${e.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${e.output} = result;
      }
    `}}const XV={kernelName:xw,backendName:"webgl",kernelFunc:KV};let pr,Cp=U().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function KV(n){const{inputs:t,backend:e,attrs:s}=n;let{pixels:o}=t;const{numChannels:r}=s,i=typeof HTMLVideoElement!="undefined"&&o instanceof HTMLVideoElement,a=typeof HTMLImageElement!="undefined"&&o instanceof HTMLImageElement,[l,c]=i?[o.videoWidth,o.videoHeight]:[o.width,o.height],u=[c,l],h=[c,l,r];if(a||i){const m=U().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(pr==null||m!==Cp)&&(Cp=m,pr=document.createElement("canvas").getContext("2d",{willReadFrequently:Cp})),pr.canvas.width=l,pr.canvas.height=c,pr.drawImage(o,0,0,l,c),o=pr.canvas}const d=e.makeTensorInfo(u,"int32");e.texData.get(d.dataId).usage=hn.PIXELS,e.gpgpu.uploadPixelDataToTexture(e.getTexture(d.dataId),o);const p=U().getBool("WEBGL_PACK")?new qV(h):new HV(h),f=e.runWebGLProgram(p,[d],"int32");return e.disposeData(d.dataId),f}function jV(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r,bias:i,preluActivationWeights:a}=t,{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d,activation:p,leakyreluAlpha:f}=s,m=ls(u),g=ke(o.shape,r.shape,l,h,c,d,!1,m);let x;const b=[],w=i!=null,y=a!=null,$=p==="leakyrelu",I=()=>{const T=[o,r],S=(N,C)=>{if(C==="NCHW"&&N.shape.length===1&&N.shape[0]!==1){const E=st({inputs:{x:N},backend:e,attrs:{shape:[N.shape[0],1,1]}});return b.push(E),E}return N};if(w&&T.push(S(i,u)),y&&T.push(S(a,u)),$){const N=e.makeTensorInfo([],"float32",ys(f,"float32"));T.push(N),b.push(N)}return T};if(g.filterHeight===1&&g.filterWidth===1&&g.dilationHeight===1&&g.dilationWidth===1&&g.strideHeight===1&&g.strideWidth===1&&(g.padInfo.type==="SAME"||g.padInfo.type==="VALID"))x=vy({x:o,filter:r,convInfo:g,backend:e,bias:i,activation:p,preluActivationWeights:a,leakyreluAlpha:f});else if(g.strideWidth<=2&&m==="channelsLast"&&U().getBool("WEBGL_EXP_CONV")){const T=p?Qi(p,!0):null,S=new Iy(g,w,T,y,$),N=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],C=I();x=e.runWebGLProgram(S,C,"float32",N)}else if(U().getBool("WEBGL_CONV_IM2COL"))x=ky({x:o,filter:r,convInfo:g,backend:e,bias:i,activation:p,preluActivationWeights:a,leakyreluAlpha:f});else{const T=p?Qi(p,!1):null,S=new $y(g,w,T,y,$),N=I();x=e.runWebGLProgram(S,N,"float32")}const v=st({inputs:{x},backend:e,attrs:{shape:g.outShape}});return b.push(x),b.forEach(T=>e.disposeIntermediateTensorInfo(T)),v}const YV={kernelName:ll,backendName:"webgl",kernelFunc:jV};function ZV(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,filter:r,bias:i,preluActivationWeights:a}=t,{strides:l,pad:c,dilations:u,dimRoundingMode:h,activation:d,leakyreluAlpha:p}=s,f=[];let m=u;m==null&&(m=[1,1]),k(De(l,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${l} and dilations '${m}'`);const g=ke(o.shape,r.shape,l,m,c,h,!0),x=U().getBool("WEBGL_PACK_DEPTHWISECONV")&&g.strideWidth<=2&&g.outChannels/g.inChannels===1,b=d?Qi(d,x):null,w=[o,r],y=i!=null,$=a!=null,I=d==="leakyrelu";if(y&&w.push(i),$&&w.push(a),I){const N=e.makeTensorInfo([],"float32",ys(p,"float32"));w.push(N),f.push(N)}let v;x?v=new Ay(g,y,b,$,I):v=new Ry(g,y,b,$,I);const T=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],S=e.runWebGLProgram(v,w,"float32",T);return f.forEach(N=>e.disposeIntermediateTensorInfo(N)),S}const QV={kernelName:nf,backendName:"webgl",kernelFunc:ZV};class JV{constructor(t,e,s,o){this.sliceDim=t,this.strides=e,this.paramsShape=o,this.variableNames=["x","indices"],this.outputShape=s;const r=Ut(s.length);let i=`
    int index;`;for(let a=0;a<this.sliceDim;a++)i+=`
          index = round(getIndices(coords[0], ${a}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[a]};
          flattenIndex += index * ${this.strides[a]};`;this.userCode=`
         void main() {
          ${r} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${i}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}}function t4(n){const{inputs:t,backend:e}=n,{params:s,indices:o}=t,r=o.shape,i=r[r.length-1],a=X(s.shape),[l,c,u,h]=zh(s,o),d=st({inputs:{x:o},backend:e,attrs:{shape:[c,i]}}),p=st({inputs:{x:s},backend:e,attrs:{shape:[X(s.shape)/u,u]}});if(e.shouldExecuteOnCPU([s,o])||s.dtype==="string"){const x=e.readSync(o.dataId),b=e.bufferSync(s),w=xP(x,b,s.dtype,c,i,u,h,s.shape,a);return e.makeTensorInfo(l,s.dtype,w.values)}const f=new JV(i,h,[c,u],s.shape),m=e.runWebGLProgram(f,[p,d],p.dtype),g=st({inputs:{x:m},backend:e,attrs:{shape:l}});return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(m),g}const e4={kernelName:Pp,backendName:"webgl",kernelFunc:t4};class n4{constructor(t,e){this.variableNames=["A","indices"],this.outputShape=e,this.rank=e.length;const s=Ut(this.rank),o=s4(t);this.userCode=`
      void main() {
        ${s} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${t[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${o}));
      }
    `}}function s4(n,t){const e=["resRC.x","resRC.y","resRC.z","resRC.w"],s=[];for(let o=0;o<n.length;o++)o===2?s.push("index"):s.push(`${e[o]}`);return s.join()}function My(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,indices:r}=t,{axis:i,batchDims:a}=s,l=$t(i,o.shape)[0];if(U().get("DEBUG")){const b=e.readSync(r.dataId),w=o.shape[l];for(let y=0;y<b.length;++y){const $=b[y];k($<=w-1&&$>=0,()=>`GatherV2: the index value ${$} is not in [0, ${w-1}]`)}}const c=wg(o,r,l,a),u=X(r.shape),h=[],d=st({inputs:{x:o},backend:e,attrs:{shape:[c.batchSize,c.outerSize,c.dimSize,c.sliceSize]}}),p=st({inputs:{x:r},backend:e,attrs:{shape:[c.batchSize,u/c.batchSize]}});h.push(d),h.push(p);const f=[c.batchSize,c.outerSize,u/c.batchSize,c.sliceSize];if(e.shouldExecuteOnCPU([o,r])||o.dtype==="string"){const b=e.bufferSync(p),w=e.bufferSync(d),y=bP(w,b,f);return h.forEach($=>e.disposeIntermediateTensorInfo($)),e.makeTensorInfo(c.outputShape,y.dtype,y.values)}const m=new n4(d.shape,f),g=e.runWebGLProgram(m,[d,p],d.dtype);h.push(g);const x=st({inputs:{x:g},backend:e,attrs:{shape:c.outputShape}});return h.forEach(b=>e.disposeIntermediateTensorInfo(b)),x}const o4={kernelName:ka,backendName:"webgl",kernelFunc:My};const r4=Te({opSnippet:"return float(a > b);",packedOpSnippet:`
  return vec4(greaterThan(a, b));
`,cpuKernelImpl:yP,dtype:"bool"}),i4={kernelName:Sa,backendName:"webgl",kernelFunc:r4};const a4=Te({opSnippet:"return float(a >= b);",packedOpSnippet:`
  return vec4(greaterThanEqual(a, b));
`,dtype:"bool",cpuKernelImpl:wP}),l4={kernelName:Or,backendName:"webgl",kernelFunc:a4};function c4(n){const{inputs:t,backend:e}=n,{input:s}=t;return Oy(s,!0,e)}const u4={kernelName:Iu,backendName:"webgl",kernelFunc:c4};const h4=Rt({opSnippet:"return float(!isnan(x) && !isinf(x));",dtype:"bool"}),d4={kernelName:Mr,backendName:"webgl",kernelFunc:h4};const p4=Rt({opSnippet:"return float(isinf(x));",dtype:"bool"}),f4={kernelName:Pr,backendName:"webgl",kernelFunc:p4};const m4=Rt({opSnippet:"return float(isnan(x));",dtype:"bool"}),g4={kernelName:Br,backendName:"webgl",kernelFunc:m4};const x4=Te({opSnippet:"return float(a < b);",packedOpSnippet:`
  return vec4(lessThan(a, b));
`,cpuKernelImpl:CP,dtype:"bool"}),b4={kernelName:Ta,backendName:"webgl",kernelFunc:x4};const y4=Te({opSnippet:"return float(a <= b);",packedOpSnippet:`
  return vec4(lessThanEqual(a, b));
`,cpuKernelImpl:$P,dtype:"bool"}),w4={kernelName:Ea,backendName:"webgl",kernelFunc:y4};function C4(n){const{backend:t,attrs:e}=n,{start:s,stop:o,num:r}=e,i=IP(s,o,r);return t.makeTensorInfo([i.length],"float32",i)}const $4={kernelName:Bp,backendName:"webgl",kernelFunc:C4};const I4=hr+`
  return x < 0.0 ? 0./0. : log(x);
`,v4=Rt({opSnippet:I4,packedOpSnippet:`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,cpuKernelImpl:vP}),k4={kernelName:zr,backendName:"webgl",kernelFunc:v4};const S4=hr+`
  return log(1.0 + x);
`,N4=Rt({opSnippet:S4}),T4={kernelName:Vr,backendName:"webgl",kernelFunc:N4};const E4=Te({opSnippet:"return float(a >= 1.0 && b >= 1.0);",packedOpSnippet:`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,dtype:"bool"}),R4={kernelName:Ra,backendName:"webgl",kernelFunc:E4};const A4=Rt({opSnippet:"return float(!(x >= 1.0));"}),D4={kernelName:Aa,backendName:"webgl",kernelFunc:A4};const F4=Te({opSnippet:"return float(a >= 1.0 || b >= 1.0);",packedOpSnippet:`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,dtype:"bool"}),_4={kernelName:Da,backendName:"webgl",kernelFunc:F4};class O4{constructor(t,e,s,o,r){this.variableNames=["x"],this.outputShape=[];const i=e,a=t[3]-1;this.outputShape=t;let l;const c=`float(${s}) + float(${o}) * sum`;r===.5?l=`inversesqrt(${c})`:r===1?l=`1.0/(${c})`:l=`exp(log(${c}) * float(-${r}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${i}; j <= ${i}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${a}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${l};
        setOutput(val);
      }
    `}}class L4{constructor(t,e,s,o,r){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;const i=e,a=t[3]-1;this.outputShape=t;let l;const c=`float(${s}) + float(${o}) * sum`;r===.5?l=`inversesqrt(${c})`:r===1?l=`1.0/(${c})`:l=`exp(log(${c}) * float(-${r}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${i};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${i}; j <= ${i}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${a}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${l};
        setOutput(result);
      }
    `}}const M4={kernelName:Fa,backendName:"webgl",kernelFunc:n=>{const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{depthRadius:r,bias:i,alpha:a,beta:l}=s,c=U().getBool("WEBGL_PACK_NORMALIZATION")?new L4(o.shape,r,i,a,l):new O4(o.shape,r,i,a,l);return e.runWebGLProgram(c,[o],o.dtype)}};class P4{constructor(t,e,s,o,r){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=t,this.depth=t[3],this.depthRadius=e,this.bias=s,this.alpha=o,this.beta=r,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${e})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${e} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${o}) * norm + float(${s});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${o})
                * float(${r})
                * getInputImage(b, r, c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${r});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}}const B4={kernelName:ku,backendName:"webgl",kernelFunc:n=>{const{inputs:t,backend:e,attrs:s}=n,{x:o,y:r,dy:i}=t,{depthRadius:a,bias:l,alpha:c,beta:u}=s,h=new P4(o.shape,a,l,c,u);return e.runWebGLProgram(h,[o,r,i],o.dtype)}};function z4(n,t,e,s){const o=X(t),i=X(n.shape)/o,a=st({inputs:{x:n},attrs:{shape:[i,o]},backend:s}),l=No(a,n.dtype,"max",s),c=st({inputs:{x:l},attrs:{shape:e},backend:s});return s.disposeIntermediateTensorInfo(a),s.disposeIntermediateTensorInfo(l),c}function Py(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{reductionIndices:r,keepDims:i}=s,a=o.shape.length,l=$t(r,o.shape);let c=l;const u=Qt(c,a),h=u!=null,d=e.shouldExecuteOnCPU([o]);let p=o;if(h){if(d){const w=e.texData.get(p.dataId).values,y=new Array(a);for(let v=0;v<y.length;v++)y[v]=o.shape[u[v]];const $=fp(w,o.shape,o.dtype,u,y);p=e.makeTensorInfo(y,o.dtype);const I=e.texData.get(p.dataId);I.values=$}else p=kc(o,u,e);c=se(c.length,a)}Se("max",c,a);const[f,m]=Ce(p.shape,c);let g=f;i&&(g=le(f,l));let x;if(d){const w=e.texData.get(p.dataId).values,y=kP(w,X(m),g,o.dtype);x=e.makeTensorInfo(g,o.dtype);const $=e.texData.get(x.dataId);$.values=y}else x=z4(p,m,g,e);return h&&e.disposeIntermediateTensorInfo(p),x}const V4={kernelName:_a,backendName:"webgl",kernelFunc:Py};const W4=mp+`
  return max(a, b);
`,U4=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+So+`
  return result;
`,G4=Te({opSnippet:W4,packedOpSnippet:U4,cpuKernelImpl:SP}),H4={kernelName:Wr,backendName:"webgl",kernelFunc:G4};function q4(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t;Yi(o,"maxPool");const{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=s,c=1;k(De(i,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=pn(o.shape,r,i,c,a,l);if(u.filterWidth===1&&u.filterHeight===1&&Lt(u.inShape,u.outShape))return sn({inputs:{x:o},backend:e});const h=new Ji(u,"max",!1);return e.runWebGLProgram(h,[o],o.dtype)}const X4={kernelName:Oa,backendName:"webgl",kernelFunc:q4};function K4(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{filterSize:r,strides:i,pad:a,dataFormat:l,dimRoundingMode:c}=s,u=[1,1,1],h=as(o.shape,r,i,u,a,c,l),d=new xp(h,"max",!1);return e.runWebGLProgram(d,[o],o.dtype)}const j4={kernelName:La,backendName:"webgl",kernelFunc:K4};class Y4{constructor(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;const e=t.strideHeight,s=t.strideWidth,o=t.dilationHeight,r=t.effectiveFilterHeight,i=t.effectiveFilterWidth,a=r-1-t.padInfo.top,l=i-1-t.padInfo.left,c=r*i-1;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${l});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${r};
          wR += ${o}) {
          float dyR = float(dyRCorner + wR) / ${e}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${i}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${c} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${i} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}}class Z4{constructor(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;const e=t.strideDepth,s=t.strideHeight,o=t.strideWidth,r=t.dilationDepth,i=t.dilationHeight,a=t.dilationWidth,l=t.effectiveFilterDepth,c=t.effectiveFilterHeight,u=t.effectiveFilterWidth,h=l-1-t.padInfo.front,d=c-1-t.padInfo.top,p=u-1-t.padInfo.left,f=l*c*u-1;this.userCode=`
      const ivec3 pads = ivec3(${h}, ${d}, ${p});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${l};
           wD += ${r}) {
          float dyD = float(dyDCorner + wD) / ${e}.0;

          if (dyD < 0.0 || dyD >= ${t.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${c};
              wR += ${i}) {
            float dyR = float(dyRCorner + wR) / ${s}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${u};
                wC += ${a}) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${f} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${c} * ${u} +
                  wR * ${u} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}}function Q4(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,input:r}=t,i=r,{filterSize:a,strides:l,pad:c,dimRoundingMode:u}=s,h=[1,1,1],d=as(i.shape,a,l,h,c,u),p=new xp(d,"max",!0),f=e.runWebGLProgram(p,[i],i.dtype),m=new Z4(d),g=e.runWebGLProgram(m,[o,f],i.dtype);return e.disposeIntermediateTensorInfo(f),g}const J4={kernelName:Nu,backendName:"webgl",kernelFunc:Q4};function tW(n){const{inputs:t,backend:e,attrs:s}=n,{dy:o,input:r,output:i}=t,a=r;Yi([r,i],"maxPoolGrad");const{filterSize:l,strides:c,pad:u,dimRoundingMode:h}=s,d=pn(a.shape,l,c,1,u,h),p=!0,f=new Ji(d,"max",p),m=e.runWebGLProgram(f,[a],a.dtype),g=new Y4(d),x=e.runWebGLProgram(g,[o,m],a.dtype);return e.disposeIntermediateTensorInfo(m),x}const eW={kernelName:Su,backendName:"webgl",kernelFunc:tW};function nW(n,t,e,s){let o=new Ji(e,"max",!1);const r=s.runWebGLProgram(o,[n],"float32");o=new Ji(e,"max",!0,!0,t);const i=s.runWebGLProgram(o,[n],"float32");return[r,i]}const sW={kernelName:zp,backendName:"webgl",kernelFunc:({inputs:n,attrs:t,backend:e})=>{const{x:s}=n,{filterSize:o,strides:r,pad:i,includeBatchInIndex:a}=t,l=e;k(s.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${s.shape.length}.`);const c=[1,1];k(De(r,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${r} and dilations '${c}'`);const u=pn(s.shape,o,r,c,i),[h,d]=nW(s,a,u,l);return[h,d]}};function oW(n,t,e,s){const o=X(t),i=X(n.shape)/o,a=st({inputs:{x:n},attrs:{shape:[i,o]},backend:s}),l=No(a,"float32","mean",s),c=st({inputs:{x:l},attrs:{shape:e},backend:s});return s.disposeIntermediateTensorInfo(a),s.disposeIntermediateTensorInfo(l),c}const rW={kernelName:Ma,backendName:"webgl",kernelFunc:({inputs:n,attrs:t,backend:e})=>{const{x:s}=n,{keepDims:o,axis:r}=t,i=e,a=s.shape.length,l=$t(r,s.shape);let c=l;const u=Qt(c,a),h=u!=null,d=i.shouldExecuteOnCPU([s]),p=[];let f=s;if(h){if(d){const y=i.texData.get(f.dataId).values,$=new Array(a);for(let T=0;T<$.length;T++)$[T]=s.shape[u[T]];const I=fp(y,s.shape,s.dtype,u,$);f=i.makeTensorInfo($,s.dtype);const v=i.texData.get(f.dataId);v.values=I}else f=kc(s,u,i);p.push(f),c=se(c.length,a)}Se("sum",c,a);const[m,g]=Ce(f.shape,c);let x=m;o&&(x=le(m,l));const b=oW(f,g,x,i);for(const w of p)i.disposeIntermediateTensorInfo(w);return b}};function iW(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s,a=o.shape.length,l=$t(r,o.shape);let c=l;const u=Qt(c,a);let h=o;u!=null&&(h=We({inputs:{x:o},backend:e,attrs:{perm:u}}),c=se(c.length,o.shape.length)),Se("min",c,a);const[d,p]=Ce(h.shape,c),f=X(p),m=st({inputs:{x:h},backend:e,attrs:{shape:[-1,f]}}),g=No(m,m.dtype,"min",e);let x;if(i){const b=le(d,l);x=st({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=st({inputs:{x:g},backend:e,attrs:{shape:d}});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(g),u!=null&&e.disposeIntermediateTensorInfo(h),x}const aW={kernelName:Pa,backendName:"webgl",kernelFunc:iW};const lW=mp+`
  return min(a, b);
`,cW=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+So+`
  return result;
`,uW=Te({opSnippet:lW,packedOpSnippet:cW,cpuKernelImpl:NP}),hW={kernelName:Ur,backendName:"webgl",kernelFunc:uW};class dW{constructor(t,e,s){this.variableNames=["x"],this.outputShape=e.map((u,h)=>u[0]+t[h]+u[1]);const o=t.length,r=Ut(o),i=e.map(u=>u[0]).join(","),a=e.map((u,h)=>u[0]+t[h]).join(","),l=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,o),c=s==="reflect"?0:1;if(o===1){this.userCode=`
        int start = ${i};
        int end = ${a};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${c};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${c};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${r} start = ${r}(${i});
      ${r} end = ${r}(${a});

      void main() {
        ${r} outC = getOutputCoords();
        for (int i = 0; i < ${o}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${c};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${c};
          }
        }
        ${r} coords = outC - start;
        setOutput(getX(${l}));
      }
    `}}class pW{constructor(t,e,s){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.map((f,m)=>f[0]+t[m]+f[1]);const o=t.length,r=Ut(o),i=e.map(f=>f[0]).join(","),a=e.map((f,m)=>f[0]+t[m]).join(","),l=Ve("rc",o),c=Ve("source",o),u=`${l[o-1]} < ${this.outputShape[o-1]}`,h=o===1?"source":`vec2(${c.slice(-2).join()})`,d=s==="reflect"?0:1;let p="";if(o===1){const f=`
        ${r} source = rc;
        if (source < start) {
          source = start * 2 - source - ${d};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${d};
        }
        source -= start;
      `;p=`
        ${r} rc = outputLoc;
        ${f}
        result[0] = getChannel(getX(${c.join()}), ${h});
        ${l[o-1]} += 1;
        if(${u}) {
          ${f}
          result[1] = getChannel(getX(${c.join()}), ${h});
        }
      `}else{const f=`
        ${r} source = rc;
        ${r} lt = ${r}(lessThan(source, start));
        ${r} gte = ${r}(greaterThanEqual(source, end));
        ${r} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${d}) +
                gte * ((end - 1) * 2 - source + ${d});
        source -= start;
      `;p=`
        ${r} rc = outputLoc;
        ${f}
        result[0] = getChannel(getX(${c.join()}), ${h});
        ${l[o-1]} += 1;
        if(${u}) {
          ${f}
          result[1] = getChannel(getX(${c.join()}), ${h});
        }
        rc = outputLoc;
        ${l[o-2]} += 1;
        if(${l[o-2]} < ${this.outputShape[o-2]}) {
          ${f}
          result[2] = getChannel(getX(${c.join()}), ${h});
          ${l[o-1]} += 1;
          if(${u}) {
            ${f}
            result[3] = getChannel(getX(${c.join()}), ${h});
          }
        }
      `}this.userCode=`
      const ${r} start = ${r}(${i});
      const ${r} end = ${r}(${a});

      void main() {
        ${r} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${p}
        setOutput(result);
      }
    `}}const fW={kernelName:Ba,backendName:"webgl",kernelFunc:({inputs:n,backend:t,attrs:e})=>{const{x:s}=n,{paddings:o,mode:r}=e,i=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new pW(s.shape,o,r):new dW(s.shape,o,r);return t.runWebGLProgram(i,[s],s.dtype)}};const mW=`if (b == 0.0) return NAN;
  return mod(a, b);`,gW=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+So+`
  return result;
`,xW=Te({opSnippet:mW,packedOpSnippet:gW}),bW={kernelName:Gr,backendName:"webgl",kernelFunc:xW};class yW{constructor(t,e,s){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[t,s],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${e-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${e-1}));
      }
    `}}const By=Te({opSnippet:`
if (a == b) {
  return 1.0;
};
return a / b;`,packedOpSnippet:`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,checkOutOfBounds:!0}),wW={kernelName:Tr,backendName:"webgl",kernelFunc:By};const zy="return a - b;",Vy=Te({opSnippet:zy,packedOpSnippet:zy,supportsComplex:!0,cpuKernelImpl:KP}),CW={kernelName:ii,backendName:"webgl",kernelFunc:Vy};function Wy(n){const{inputs:t,backend:e,attrs:s}=n,{logits:o}=t,{dim:r}=s,i=$t([r],o.shape),a=Py({inputs:{x:o},backend:e,attrs:{reductionIndices:i,keepDims:!1}}),l=le(a.shape,i),c=st({inputs:{x:a},backend:e,attrs:{shape:l}}),u=Vy({inputs:{a:o,b:c},backend:e}),h=Dy({inputs:{x:u},backend:e}),d=Sc({inputs:{x:h},backend:e,attrs:{axis:i,keepDims:!1}}),p=st({inputs:{x:d},backend:e,attrs:{shape:l}}),f=By({inputs:{a:h,b:p},backend:e});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(c),e.disposeIntermediateTensorInfo(u),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(p),f}const $W={kernelName:sl,backendName:"webgl",kernelFunc:Wy};function IW(n){const{inputs:t,backend:e,attrs:s}=n,{logits:o}=t,{numSamples:r,seed:i,normalized:a}=s,l=a?o:Wy({inputs:{logits:o},backend:e,attrs:{dim:o.shape.length-1}}),c=l.shape[0],u=l.shape[1],h=new yW(c,u,r),d=[[i]],p=e.runWebGLProgram(h,[l],"int32",d);return a||e.disposeIntermediateTensorInfo(l),p}const vW={kernelName:Vp,backendName:"webgl",kernelFunc:IW};const kW=$n+`
  return -x;
`,SW=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function NW(n){const{inputs:t,backend:e}=n,{x:s}=t;if(e.shouldExecuteOnCPU([s])){const r=e.texData.get(s.dataId),[i,a]=EP(r.values,s.shape,s.dtype);return e.makeTensorInfo(a,s.dtype,i)}let o;return U().getBool("WEBGL_PACK_UNARY_OPERATIONS")?o=new zs(s.shape,SW):o=new ns(s.shape,kW),e.runWebGLProgram(o,[s],s.dtype)}const TW={kernelName:za,backendName:"webgl",kernelFunc:NW};const EW=_h;function RW(n){on("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:t,backend:e,attrs:s}=n,{boxes:o,scores:r}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l}=s,c=e.readSync(o.dataId),u=e.readSync(r.dataId),{selectedIndices:h}=EW(c,u,i,a,l);return e.makeTensorInfo([h.length],"int32",new Int32Array(h))}const AW={kernelName:Tu,backendName:"webgl",kernelFunc:RW};const DW=Oh;function FW(n){on("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:t,backend:e,attrs:s}=n,{boxes:o,scores:r}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,padToMaxOutputSize:c}=s,u=e.readSync(o.dataId),h=e.readSync(r.dataId),{selectedIndices:d,validOutputs:p}=DW(u,h,i,a,l,c);return[e.makeTensorInfo([d.length],"int32",new Int32Array(d)),e.makeTensorInfo([],"int32",new Int32Array([p]))]}const _W={kernelName:Eu,backendName:"webgl",kernelFunc:FW};const OW=Lh;function LW(n){on("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:t,backend:e,attrs:s}=n,{boxes:o,scores:r}=t,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,softNmsSigma:c}=s,u=e.readSync(o.dataId),h=e.readSync(r.dataId),d=i,p=a,f=l,m=c,{selectedIndices:g,selectedScores:x}=OW(u,h,d,p,f,m);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}const MW={kernelName:Ru,backendName:"webgl",kernelFunc:LW};class PW{constructor(t,e,s,o){this.variableNames=["indices"],this.outputShape=[t,e],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${o}), float(${s}),
                      float(index == coords.y)));
      }
    `}}const BW={kernelName:Ua,backendName:"webgl",kernelFunc:n=>{const{inputs:t,backend:e,attrs:s}=n,{indices:o}=t,{dtype:r,depth:i,onValue:a,offValue:l}=s,c=X(o.shape),u=new PW(c,i,a,l),h=st({inputs:{x:o},backend:e,attrs:{shape:[c]}}),d=e.runWebGLProgram(u,[h],r);e.disposeIntermediateTensorInfo(h);const p=[...o.shape,i],f=st({inputs:{x:d},backend:e,attrs:{shape:p}});return e.disposeIntermediateTensorInfo(d),f}};function Dc(n){const{inputs:t,backend:e}=n,{x:s}=t;if(s.dtype==="complex64"){const o=ta({inputs:{input:s},backend:e}),r=Dc({inputs:{x:o},backend:e}),i=Rc({inputs:{input:s},backend:e}),a=Dc({inputs:{x:i},backend:e}),l=Vs({inputs:{real:r,imag:a},backend:e});return e.disposeIntermediateTensorInfo(o),e.disposeIntermediateTensorInfo(r),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(a),l}else return sa({attrs:{shape:s.shape,dtype:s.dtype,value:s.dtype==="string"?"":0},backend:e})}const zW={kernelName:il,backendName:"webgl",kernelFunc:Dc};function Uy(n){const{inputs:t,backend:e}=n,{x:s}=t;if(s.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(s.dtype==="complex64"){const o=ta({inputs:{input:s},backend:e}),r=Uy({inputs:{x:o},backend:e}),i=Rc({inputs:{input:s},backend:e}),a=Dc({inputs:{x:i},backend:e}),l=Vs({inputs:{real:r,imag:a},backend:e});return e.disposeIntermediateTensorInfo(o),e.disposeIntermediateTensorInfo(r),e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(a),l}else return sa({attrs:{shape:s.shape,dtype:s.dtype,value:1},backend:e})}const VW={kernelName:Wa,backendName:"webgl",kernelFunc:Uy};function WW(n){const{inputs:t,backend:e,attrs:s}=n,{axis:o}=s;if(t.length===1)return wp({inputs:{input:t[0]},backend:e,attrs:{dim:o}});const r=t[0].shape,i=t[0].dtype;t.forEach(u=>{Gc(r,u.shape,"All tensors passed to stack must have matching shapes"),k(i===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});const a=[],l=t.map(u=>{const h=wp({inputs:{input:u},backend:e,attrs:{dim:o}});return a.push(h),h}),c=Cy({inputs:l,backend:e,attrs:{axis:o}});return a.forEach(u=>e.disposeIntermediateTensorInfo(u)),c}const UW={kernelName:Ga,backendName:"webgl",kernelFunc:WW};class GW{constructor(t,e,s){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=e.map((c,u)=>c[0]+t[u]+c[1]);const o=t.length,r=Ut(o),i=e.map(c=>c[0]).join(","),a=e.map((c,u)=>c[0]+t[u]).join(","),l=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,o);if(o===1){this.userCode=`
        int start = ${i};
        int end = ${a};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${r} start = ${r}(${i});
      ${r} end = ${r}(${a});

      void main() {
        ${r} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${r} coords = outC - start;
          setOutput(getX(${l}));
        }
      }
    `}}class HW{constructor(t,e,s){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=e.map((m,g)=>m[0]+t[g]+m[1]);const o=t.length,r=Ut(o),i=e.map(m=>m[0]).join(","),a=e.map((m,g)=>m[0]+t[g]).join(","),l=Ve("rc",o),c=Ve("source",o),u=`${l[o-1]} < ${this.outputShape[o-1]}`,h=o===1?"source":`vec2(${c.slice(-2).join()})`,d=[`${r} rc = outputLoc;`,`${l[o-1]} += 1;
       if(${u}) {
      `,o===1?"":`}
       rc = outputLoc;
       ${l[o-2]} += 1;
       if(${l[o-2]} < ${this.outputShape[o-2]}) {`,o===1?"":`  ${l[o-1]} += 1;
         if(${u}) {`],p=o===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))";let f="";for(let m=0,g=o===1?2:4;m<g;m++)f+=`
        ${d[m]}
        if (${p}) {
          result[${m}] = float(value);
        } else {
          ${r} source = rc - start;
          result[${m}] = getChannel(getX(${c.join()}), ${h});
        }
      `;f+=o===1?"} ":"}}",this.userCode=`
      const ${r} start = ${r}(${i});
      const ${r} end = ${r}(${a});

      void main() {
        ${r} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${f}
        setOutput(result);
      }
    `}}const Gy=n=>{const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{paddings:r,constantValue:i}=s;if(X(o.shape)===0){const c=r.map((u,h)=>u[0]+o.shape[h]+u[1]);return sa({backend:e,attrs:{shape:c,value:i,dtype:o.dtype}})}const a=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new HW(o.shape,r,i):new GW(o.shape,r,i),l=[[i]];return e.runWebGLProgram(a,[o],o.dtype,l)},qW={kernelName:Ha,backendName:"webgl",kernelFunc:Gy};const XW=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,KW=`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+So+`
  return result;
`,jW=Te({opSnippet:XW,packedOpSnippet:KW}),YW={kernelName:qr,backendName:"webgl",kernelFunc:jW};function ZW(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{axis:r,keepDims:i}=s,a=o.shape.length,l=[],c=$t(r,o.shape);let u=c;const h=Qt(u,a);let d=o;h!=null&&(d=We({inputs:{x:o},backend:e,attrs:{perm:h}}),u=se(u.length,a),l.push(d)),Se("prod",u,a);let p;if(e.shouldExecuteOnCPU([d])){const f=e.texData.get(d.dataId).values,{outVals:m,outShape:g,outDtype:x}=AP(d.shape,d.dtype,f,u);p=e.makeTensorInfo(g,x,m)}else{const[f,m]=Ce(d.shape,u),g=X(m),x=st({inputs:{x:d},backend:e,attrs:{shape:[-1,g]}}),b=Yu(o.dtype),w=No(x,b,"prod",e);p=st({inputs:{x:w},backend:e,attrs:{shape:f}}),l.push(x),l.push(w)}if(i){l.push(p);const f=le(p.shape,c);p=st({inputs:{x:p},backend:e,attrs:{shape:f}})}return l.forEach(f=>e.disposeIntermediateTensorInfo(f)),p}const QW={kernelName:Xa,backendName:"webgl",kernelFunc:ZW};function JW(n){const{inputs:t,backend:e,attrs:s}=n,{paramsNestedSplits:o,paramsDenseValues:r,indices:i}=t,{outputRaggedRank:a}=s,l=o.map(x=>e.readSync(x.dataId)),c=o.map(x=>x.shape),u=e.readSync(r.dataId),h=e.readSync(i.dataId),[d,p,f]=DP(l,c,u,r.shape,r.dtype,h,i.shape,a),m=d.map(x=>e.makeTensorInfo([x.length],"int32",x)),g=e.makeTensorInfo(f,r.dtype,p);return m.concat([g])}const tU={kernelName:Wp,backendName:"webgl",kernelFunc:JW};function eU(n){const{inputs:t,backend:e}=n,{starts:s,limits:o,deltas:r}=t,i=e.readSync(s.dataId),a=e.readSync(o.dataId),l=e.readSync(r.dataId),[c,u]=FP(i,s.shape,s.dtype,a,o.shape,l,r.shape),h=e.makeTensorInfo([c.length],"int32",c),d=e.makeTensorInfo([u.length],s.dtype,u);return[h,d]}const nU={kernelName:Up,backendName:"webgl",kernelFunc:eU};function sU(n){const{inputs:t,backend:e,attrs:s}=n,{shape:o,values:r,defaultValue:i,rowPartitionTensors:a}=t,{rowPartitionTypes:l}=s,c=e.readSync(o.dataId),u=e.readSync(r.dataId),h=e.readSync(i.dataId),d=a.map(g=>e.readSync(g.dataId)),p=a.map(g=>g.shape),[f,m]=_P(c,o.shape,u,r.shape,r.dtype,h,i.shape,d,p,l);return e.makeTensorInfo(f,r.dtype,m)}const oU={kernelName:Gp,backendName:"webgl",kernelFunc:sU};const Hy=n=>{const{backend:t,attrs:e}=n,{start:s,stop:o,step:r,dtype:i}=e,a=OP(s,o,r,i);return t.makeTensorInfo([a.length],i,a)},rU={kernelName:Au,backendName:"webgl",kernelFunc:Hy};const iU=Rt({opSnippet:"return 1.0 / x;"}),aU={kernelName:Xr,backendName:"webgl",kernelFunc:iU};const lU=$n+`
  return (x < 0.0) ? 0.0 : x;
`,cU=Rt({opSnippet:lU,packedOpSnippet:`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),uU={kernelName:Kr,backendName:"webgl",kernelFunc:cU};const hU=$n+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,dU=Rt({opSnippet:hU,packedOpSnippet:`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),pU={kernelName:jr,backendName:"webgl",kernelFunc:dU};class fU{constructor(t,e,s,o,r){this.variableNames=["A"],this.outputShape=[];const[i,a,l,c]=t;this.outputShape=[i,e,s,c];const u=[o&&e>1?a-1:a,o&&s>1?l-1:l],h=[o&&e>1?e-1:e,o&&s>1?s-1:s];let d;r?d="(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":d="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/h[0]},
          ${u[1]/h[1]});
      const vec2 inputShapeRC = vec2(${a}.0, ${l}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${d};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}}class mU{constructor(t,e,s,o,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];const[i,a,l,c]=t;this.outputShape=[i,e,s,c];const u=[o&&e>1?a-1:a,o&&s>1?l-1:l],h=[o&&e>1?e-1:e,o&&s>1?s-1:s];let d;r?d="(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":d="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/h[0]},
          ${u[1]/h[1]},
          ${u[1]/h[1]});
      const vec3 inputShapeRC = vec3(${a}.0, ${l}.0,
                                     ${l}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${d};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${c-1};
        bool hasNextRow = coords.z < ${s-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}}function gU(n){const{inputs:t,backend:e,attrs:s}=n,{images:o}=t,{alignCorners:r,halfPixelCenters:i,size:a}=s,[l,c]=a,u=U().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new mU(o.shape,l,c,r,i):new fU(o.shape,l,c,r,i);return e.runWebGLProgram(u,[o],"float32")}const xU={kernelName:Ya,backendName:"webgl",kernelFunc:gU};class bU{constructor(t,e,s){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e;const[,o,r]=e,[,i,a]=t,l=[s&&i>1?o-1:o,s&&a>1?r-1:r],c=[s&&i>1?i-1:i,s&&a>1?a-1:a],u=l[0]/c[0],h=l[1]/c[1],d=1/u,p=1/h,f=Math.ceil(d)*2+2,m=Math.ceil(p)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${h});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${p});

        const int winHeight = int(${f});
        const int winWidth = int(${m});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${a}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${o-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${r-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}}function yU(n){const{inputs:t,backend:e,attrs:s}=n,{images:o,dy:r}=t,{alignCorners:i}=s,a=new bU(r.shape,o.shape,i);return e.runWebGLProgram(a,[r],r.dtype)}const wU={kernelName:_u,backendName:"webgl",kernelFunc:yU};class CU{constructor(t,e,s,o,r){this.variableNames=["A"],this.outputShape=[];const[i,a,l,c]=t;this.outputShape=[i,e,s,c];const u=[o&&e>1?a-1:a,o&&s>1?l-1:l],h=[o&&e>1?e-1:e,o&&s>1?s-1:s],d=o?"0.5":"0.0";let p;r?p="max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":p="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${u[0]/h[0]},
          ${u[1]/h[1]});
      const vec2 inputShapeRC = vec2(${a}.0, ${l}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${p};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${d})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}}class $U{constructor(t,e,s,o,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];const[i,a,l,c]=t;this.outputShape=[i,e,s,c];const u=[o&&e>1?a-1:a,o&&s>1?l-1:l],h=[o&&e>1?e-1:e,o&&s>1?s-1:s],d=o?"0.5":"0.0";let p;r?p="max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":p="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${u[0]/h[0]},
          ${u[1]/h[1]},
          ${u[1]/h[1]});
      const vec3 inputShapeRC = vec3(${a}.0, ${l}.0,
                                     ${l}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${p};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${d})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${c-1};
        bool hasNextRow = coords.z < ${s-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}}function IU(n){const{inputs:t,backend:e,attrs:s}=n,{images:o}=t,{alignCorners:r,halfPixelCenters:i,size:a}=s,[l,c]=a,u=U().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new $U(o.shape,l,c,r,i):new CU(o.shape,l,c,r,i);return e.runWebGLProgram(u,[o],o.dtype)}const vU={kernelName:ja,backendName:"webgl",kernelFunc:IU};class kU{constructor(t,e,s){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e;const[,o,r]=e,[,i,a]=t,l=[s&&i>1?o-1:o,s&&a>1?r-1:r],c=[s&&i>1?i-1:i,s&&a>1?a-1:a],u=l[0]/c[0],h=l[1]/c[1],d=1/u,p=1/h,f=Math.ceil(d)*2+2,m=Math.ceil(p)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${u});
        const float widthScale = float(${h});

        const float invHeightScale = float(${d});
        const float invWidthScale = float(${p});

        const int winHeight = int(${f});
        const int winWidth = int(${m});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${i}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${a}) {
              continue;
            }

            float sourceFracRow =
              float(${l[0]}) *
                (float(dyR) / float(${c[0]}));

            float sourceFracCol =
                float(${l[1]}) *
                  (float(dyC) / float(${c[1]}));

            int sourceNearestRow = int(min(
                float(int(${o}) - 1),
                ${s} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${r}) - 1),
                ${s} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}}function SU(n){const{inputs:t,backend:e,attrs:s}=n,{images:o,dy:r}=t,{alignCorners:i}=s,a=new kU(r.shape,o.shape,i);return e.runWebGLProgram(a,[r],r.dtype)}const NU={kernelName:Fu,backendName:"webgl",kernelFunc:SU};class TU{constructor(t,e){this.variableNames=["x"];const s=t.length;if(s>4)throw new Error(`WebGL backend: Reverse of rank-${s} tensor is not yet supported`);if(this.outputShape=t,s===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${t[0]} - coord - 1));
        }
      `;return}const o=a=>e.indexOf(a)!==-1&&t[a]!==1?`${t[a]} - coords[${a}] - 1`:`coords[${a}]`,r=t.map((a,l)=>o(l)).join(","),i=Ut(s);this.userCode=`
      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${r}));
      }
    `}}class EU{constructor(t,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;const s=t.length;if(s>4)throw new Error(`WebGL backend: Reverse of rank-${s} tensor is not yet supported`);this.outputShape=t;const o=Ve("rc",s),r=`${o[s-1]} + 1 < ${this.outputShape[s-1]}`,i=`${o[s-2]} + 1 < ${this.outputShape[s-2]}`,a=Ut(s);s===1?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${t[0]} - rc - 1),
            ${t[0]} - rc - 1);
          if(${r}){
              result.g = getChannel(getX(${t[0]} - (rc  + 1) - 1),
                ${t[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${a} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${l(o.slice())};
          if(${r}){
            result.g = ${c(o.slice())};
          }
          if(${i}) {
            result.b = ${u(o.slice())};
            if(${r}) {
              result.a = ${h(o.slice())};
            }
          }
          setOutput(result);
        }
    `;function l(f){return d(f)}function c(f){return f[s-1]="("+f[s-1]+" + 1)",d(f)}function u(f){return f[s-2]="("+f[s-2]+" + 1)",d(f)}function h(f){return f[s-1]="("+f[s-1]+" + 1)",f[s-2]="("+f[s-2]+" + 1)",d(f)}function d(f){const m=t.map((b,w)=>p(w,f)),g=m.join(","),x=m.slice(-2).join(",");return`getChannel(getX(${g}), vec2(${x}))`}function p(f,m){return e.indexOf(f)!==-1&&t[f]!==1?`${t[f]} - ${m[f]} - 1`:`${m[f]}`}}}function RU(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{dims:r}=s,i=o.shape.length,a=$t(r,o.shape);if(i===0)return sn({inputs:{x:o},backend:e});const l=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new EU(o.shape,a):new TU(o.shape,a);return e.runWebGLProgram(l,[o],o.dtype)}const AU={kernelName:Za,backendName:"webgl",kernelFunc:RU};class DU{constructor(t,e){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];const s=t[1],o=t[2];this.outputShape=t;let r="";typeof e=="number"?r=`float outputValue = ${e.toFixed(2)};`:r=`
        vec3 fill = vec3(${e.join(",")});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${r}
          if(coordX >= 0 && coordX < ${o} && coordY >= 0 && coordY < ${s}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}}const FU={kernelName:Vu,backendName:"webgl",kernelFunc:({inputs:n,attrs:t,backend:e})=>{const{image:s}=n,{radians:o,fillValue:r,center:i}=t,a=e,l=new DU(s.shape,r),[c,u]=Hh(i,s.shape[1],s.shape[2]),h=[[c,u,Math.sin(o),Math.cos(o)]];return a.runWebGLProgram(l,[s],s.dtype,h)}};const _U=Rt({opSnippet:`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`}),OU={kernelName:Yr,backendName:"webgl",kernelFunc:_U};const LU=Rt({opSnippet:"return inversesqrt(x);",cpuKernelImpl:LP}),MU={kernelName:Zr,backendName:"webgl",kernelFunc:LU};class $p{constructor(t,e,s,o,r,i,a=!0,l=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=i;const c=Ut(r.length),u=Ut(i.length);let h="";s===1?h="i":s===2&&(h="i, j");const d=`getIndices(${h})`;let p="";o===1?p="i":o===2&&(p="i, coords[1]");const f=`getUpdates(${p})`;let m="";l&&(m="coords[0], coords[1]");const g=`getDefaultValue(${m})`,x=e>1?"strides[j]":"strides";this.userCode=`
        ${c} strides = ${c}(${r});

        void main() {
          ${u} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${t}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${e}; j++) {
              int index = round(${d});
              flattenedIndex += index * ${x};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${f};
              found = true;
            }
          }
          setOutput(mix(${g}, sum, float(found)));
        }
      `}}class PU{constructor(t,e,s,o,r,i,a=!0,l=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=i;const c=Ut(r.length),u=Ut(i.length);let h="";s===1?h="i":s===2&&(h="i, j");const d=`getIndices(${h})`;let p="";o===1?p="i":o===2&&(p="i, coords[1]");const f=`getUpdates(${p})`;let m="";l&&(m="coords[0], coords[1]");const g=`getDefaultValue(${m})`,x=e>1?"strides[j]":"strides",b=e>1?"strides[j + 1]":"strides";this.userCode=`
        ${c} strides = ${c}(${r});

        void main() {
          ${u} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${t}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${e}; j+=2) {
              ivec4 index = round(${d});
              flattenedIndex += index.xz * ${x};
              if (j + 1 < ${e}) {
                flattenedIndex += index.yw * ${b};
              }
            }
            if (flattenedIndex[0] == coords[0] || flattenedIndex[1] == coords[0] ||
                flattenedIndex[0] == coords[0] + 1 || flattenedIndex[1] == coords[0] + 1) {
              vec4 updVals = ${f};
              if (flattenedIndex[0] == coords[0]) {
                sum.xy += updVals.xy;
                found.xy = vec2(1.);
              } else if (flattenedIndex[0] == coords[0] + 1) {
                sum.zw += updVals.xy;
                found.zw = vec2(1.);
              }
              if (flattenedIndex[1] == coords[0]) {
                sum.xy += updVals.zw;
                found.xy = vec2(1.);
              } else if (flattenedIndex[1] == coords[0] + 1) {
                sum.zw += updVals.zw;
                found.zw = vec2(1.);
              }
            }
          }
          setOutput(mix(${g}, sum, found));
        }
      `}}function BU(n){const{inputs:t,backend:e,attrs:s}=n,{indices:o,updates:r}=t,{shape:i}=s,{sliceRank:a,numUpdates:l,sliceSize:c,strides:u,outputSize:h}=lo(r,o,i),d=[h/c,c];if(h===0)return e.makeTensorInfo(i,o.dtype);const p=st({inputs:{x:o},backend:e,attrs:{shape:[l,a]}}),f=st({inputs:{x:r},backend:e,attrs:{shape:[l,c]}}),m=e.makeTensorInfo([],"float32",new Float32Array([0]));let g;U().getBool("WEBGL_PACK")?g=new PU(l,a,p.shape.length,f.shape.length,u,d):g=new $p(l,a,p.shape.length,f.shape.length,u,d);const x=e.runWebGLProgram(g,[f,p,m],f.dtype),b=st({inputs:{x},backend:e,attrs:{shape:i}});return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(m),b}const zU={kernelName:Hp,backendName:"webgl",kernelFunc:BU};class VU{constructor(t,e,s,o){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[t,s];const r="while (left < right) {",i=`for (int i = 0; i < ${Math.ceil(Math.log2(e+1))}; ++i) { if (left >= right) break;`,a=U().getNumber("WEBGL_VERSION")===2?r:i,l=o==="left"?"<":"<=";this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${a}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${l} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}}function WU(n){const{inputs:t,backend:e,attrs:s}=n,{sortedSequence:o,values:r}=t,{side:i}=s,a=new VU(o.shape[0],o.shape[1],r.shape[1],i),l=[[o.shape[1]]];return e.runWebGLProgram(a,[o,r],"int32",l)}const UU={kernelName:Xp,backendName:"webgl",kernelFunc:WU};class GU{constructor(t,e,s){this.variableNames=["c","a","b"],this.outputShape=e;let o,r;if(s>4)throw Error(`Where for rank ${s} is not yet supported`);if(s===1)r="resRC",o="resRC";else{const a=["resRC.x","resRC.y","resRC.z","resRC.w"],l=[],c=[];for(let u=0;u<e.length;u++)c.push(`${a[u]}`),u<t&&l.push(`${a[u]}`);o=l.join(),r=c.join()}const i=Ut(s);this.userCode=`
      void main() {
        ${i} resRC = getOutputCoords();
        float cVal = getC(${o});
        if (cVal >= 1.0) {
          setOutput(getA(${r}));
        } else {
          setOutput(getB(${r}));
        }
      }
    `}}function HU(n){const{inputs:t,backend:e}=n,{condition:s,t:o,e:r}=t,i=new GU(s.shape.length,o.shape,o.shape.length);return e.runWebGLProgram(i,[s,o,r],Je(o.dtype,r.dtype))}const qU={kernelName:Qa,backendName:"webgl",kernelFunc:HU};const XU=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${Ml};
  float scale = ${Pl};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,KU=Rt({opSnippet:XU}),jU={kernelName:Qr,backendName:"webgl",kernelFunc:KU};const YU=hr+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,ZU=Rt({opSnippet:YU,packedOpSnippet:`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:PP}),QU={kernelName:ni,backendName:"webgl",kernelFunc:ZU};const JU=Rt({opSnippet:`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`}),tG={kernelName:ei,backendName:"webgl",kernelFunc:JU};const eG=hr+`
  return sin(x);
`,nG=`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${So}
  return result;
`,sG=Rt({opSnippet:eG,packedOpSnippet:nG}),oG={kernelName:Jr,backendName:"webgl",kernelFunc:sG};const rG=Rt({opSnippet:`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`}),iG={kernelName:ti,backendName:"webgl",kernelFunc:rG};const aG=Rt({opSnippet:`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`}),lG={kernelName:si,backendName:"webgl",kernelFunc:aG};const cG={kernelName:el,backendName:"webgl",kernelFunc:n=>{const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{blockShape:r,paddings:i}=s;k(o.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");const a=r.reduce((x,b)=>x*b),l=[[0,0]];l.push(...i);for(let x=1+r.length;x<o.shape.length;++x)l.push([0,0]);const c=[],u=Gy({inputs:{x:o},backend:e,attrs:{paddings:l,constantValue:0}}),h=Si(u.shape,r,a,!1),d=Ni(h.length,r.length,!1),p=Ti(u.shape,r,a,!1),f=st({inputs:{x:u},backend:e,attrs:{shape:h}}),m=We({inputs:{x:f},backend:e,attrs:{perm:d}}),g=st({inputs:{x:m},backend:e,attrs:{shape:p}});return c.push(u),c.push(f),c.push(m),c.forEach(x=>e.disposeIntermediateTensorInfo(x)),g}};function uG(n){const{inputs:t,backend:e}=n,{indices:s,values:o,denseShape:r,defaultValue:i}=t;if(r.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
         ${r.shape}`);if(s.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
         ${s.shape}`);if(o.shape.length!==1)throw new Error(`Values must be a vector, saw:
         ${o.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);const a=e.readSync(s.dataId),l=e.readSync(o.dataId),c=e.readSync(r.dataId),u=e.readSync(i.dataId)[0],[h,d,p,f,m]=zP(a,s.shape,s.dtype,l,o.dtype,c,u);return[e.makeTensorInfo(d,s.dtype,h),e.makeTensorInfo([d[0]],o.dtype,p),e.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(g=>Number(g)))),e.makeTensorInfo([m.length],s.dtype,new Int32Array(m))]}const hG={kernelName:Kp,backendName:"webgl",kernelFunc:uG};function dG(n){const{inputs:t,backend:e}=n,{inputIndices:s,inputShape:o,newShape:r}=t;if(s.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape ${s.shape}`);if(o.shape.length!==1)throw new Error(`Input shape should be a vector but received shape ${o.shape}`);if(r.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${r.shape}`);const i=Array.from(e.readSync(o.dataId)),a=e.readSync(s.dataId),l=Array.from(e.readSync(r.dataId)),[c,u,h]=VP(a,s.shape,s.dtype,i,l);return[e.makeTensorInfo(u,s.dtype,c),e.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}const pG={kernelName:jp,backendName:"webgl",kernelFunc:dG};function fG(n){const{inputs:t,backend:e}=n,{data:s,indices:o,segmentIds:r}=t;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(o.shape.length!==1)throw new Error(`Indices should be a vector but received shape
              ${o.shape}`);if(r.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
              ${r.shape}`);const i=e.readSync(s.dataId),a=e.readSync(o.dataId),l=e.readSync(r.dataId),[c,u]=Y1(i,s.shape,s.dtype,a,l,!0);return e.makeTensorInfo(u,s.dtype,c)}const mG={kernelName:Yp,backendName:"webgl",kernelFunc:fG};function gG(n){const{inputs:t,backend:e}=n,{data:s,indices:o,segmentIds:r}=t;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(o.shape.length!==1)throw new Error(`Indices should be a vector but received shape
             ${o.shape}`);if(r.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
             ${r.shape}`);const i=e.readSync(s.dataId),a=e.readSync(o.dataId),l=e.readSync(r.dataId),[c,u]=Y1(i,s.shape,s.dtype,a,l);return e.makeTensorInfo(u,s.dtype,c)}const xG={kernelName:Zp,backendName:"webgl",kernelFunc:gG};function bG(n){const{inputs:t,backend:e,attrs:s}=n,{sparseIndices:o,sparseValues:r,defaultValue:i}=t,{outputShape:a}=s,{sliceRank:l,numUpdates:c,sliceSize:u,strides:h,outputSize:d}=lo(r,o,a),p=!1;if(r.dtype==="string"){const x=e.bufferSync(o),b=e.bufferSync(r),w=Cs(e.readSync(i.dataId)[0]),y=MP(x,b,a,d,u,c,l,h,w,p);return e.makeTensorInfo(a,y.dtype,y.values)}const f=new $p(c,l,o.shape.length,r.shape.length,h,[d,1],p),m=e.runWebGLProgram(f,[r,o,i],r.dtype),g=st({inputs:{x:m},backend:e,attrs:{shape:a}});return e.disposeIntermediateTensorInfo(m),g}const yG={kernelName:Qp,backendName:"webgl",kernelFunc:bG};function wG(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{numOrSizeSplits:r,axis:i}=s,a=$t(i,o.shape)[0],l=ad(o,r,a),c=o.shape.length,u=new Array(c).fill(0),h=o.shape.slice();return l.map(d=>{const p=[...h];p[a]=d;const f=dr({inputs:{x:o},backend:e,attrs:{begin:u,size:p}});return u[a]+=d,f})}const CG={kernelName:nl,backendName:"webgl",kernelFunc:wG};const qy="return sqrt(x);",$G=Rt({opSnippet:qy,packedOpSnippet:qy,cpuKernelImpl:WP}),IG={kernelName:oi,backendName:"webgl",kernelFunc:$G};const vG=Rt({opSnippet:"return x * x;"}),kG={kernelName:Ou,backendName:"webgl",kernelFunc:vG};const Xy="return (a - b) * (a - b);",SG=Te({opSnippet:Xy,packedOpSnippet:Xy}),NG={kernelName:ri,backendName:"webgl",kernelFunc:SG};function TG(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t;if(o.dtype!=="string")throw new Error("Input must be of datatype string");const r=e.readSync(o.dataId),i=ps(r),a=UP(i,"string",s);return e.makeTensorInfo(o.shape,"string",a)}const EG={kernelName:Lu,backendName:"webgl",kernelFunc:TG};function RG({inputs:n,attrs:t,backend:e}){const{x:s}=n,o=$n+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,r=new ns(s.shape,o);return e.runWebGLProgram(r,[s],s.dtype)}const AG={kernelName:ui,backendName:"webgl",kernelFunc:RG};class DG{constructor(t,e,s){this.variableNames=["x"],this.outputShape=s;const o=s.length,r=Ut(s.length),i=Ut(s.length);let a="";if(o===1)a="coords * strides + begin";else{let l=0;a=s.map((c,u)=>(l++,s.length===1?`coords * strides[${u}] + begin[${u}]`:`coords[${l-1}] * strides[${u}] + begin[${u}]`)).join(",")}this.userCode=`
      ${r} begin = ${r}(${t});
      ${r} strides = ${r}(${e});

      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${a}));
      }
    `}}function FG(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{begin:r,end:i,strides:a,beginMask:l,endMask:c,ellipsisMask:u,newAxisMask:h,shrinkAxisMask:d}=s,{finalShapeSparse:p,finalShape:f,isIdentity:m,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:y}=Km(o.shape,r,i,a,l,c,u,h,d);let $;if(m)$=st({inputs:{x:o},backend:e,attrs:{shape:f}});else if(g||x){k(o.shape.length>=1,()=>`Input must have rank at least 1, got: ${o.shape.length}`);const v=Hm(b,w,y),T=dr({inputs:{x:o},backend:e,attrs:{begin:b,size:v}});$=st({inputs:{x:T},backend:e,attrs:{shape:f}}),e.disposeIntermediateTensorInfo(T)}else if(e.shouldExecuteOnCPU([o])){const T=e.readSync(o.dataId),S=It(o.shape,o.dtype,T),N=GP(p,S,y,b);$=e.makeTensorInfo(f,o.dtype,N.values)}else{const T=new DG(b,y,p);$=e.runWebGLProgram(T,[o],o.dtype)}const I=st({inputs:{x:$},backend:e,attrs:{shape:f}});return e.disposeIntermediateTensorInfo($),I}const _G={kernelName:Mu,backendName:"webgl",kernelFunc:FG};function OG(n){const{inputs:t,backend:e,attrs:s}=n,{separator:o,nGramWidths:r,leftPad:i,rightPad:a,padWidth:l,preserveShortSequences:c}=s,{data:u,dataSplits:h}=t,d=e.readSync(u.dataId),p=e.readSync(h.dataId),[f,m]=HP(d,p,o,r,i,a,l,c);return[e.makeTensorInfo([f.length],"string",f),e.makeTensorInfo(h.shape,"int32",m)]}const LG={kernelName:Jp,backendName:"webgl",kernelFunc:OG};function MG(n){const{inputs:t,backend:e,attrs:s}=n,{skipEmpty:o}=s,{input:r,delimiter:i}=t;if(r.dtype!=="string")throw new Error("Input must be of datatype string");if(r.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${r.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);const a=e.readSync(r.dataId),l=e.readSync(i.dataId)[0],[c,u,h]=qP(a,l,o),d=u.length;return[e.makeTensorInfo([d,2],"int32",c),e.makeTensorInfo([d],"string",u),e.makeTensorInfo([2],"int32",new Int32Array(h))]}const PG={kernelName:tf,backendName:"webgl",kernelFunc:MG};function BG(n){const{inputs:t,backend:e,attrs:s}=n,{numBuckets:o}=s,{input:r}=t;if(r.dtype!=="string")throw new Error("Input must be of datatype string");if(o<=0)throw new Error("Number of buckets must be at least 1");const i=e.readSync(r.dataId),a=XP(i,o);return e.makeTensorInfo(r.shape,"int32",a)}const zG={kernelName:ef,backendName:"webgl",kernelFunc:BG};const VG=Rt({opSnippet:"return tan(x);"}),WG={kernelName:ai,backendName:"webgl",kernelFunc:VG};const UG=Rt({opSnippet:`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`}),GG={kernelName:li,backendName:"webgl",kernelFunc:UG};function HG(n){const{inputs:t,backend:e,attrs:s}=n,{tensor:o,indices:r,updates:i}=t,{sliceRank:a,numUpdates:l,sliceSize:c,strides:u,outputSize:h}=lo(i,r,o.shape),d=[h/c,c];if(h===0)return e.makeTensorInfo(o.shape,r.dtype);const p=st({inputs:{x:r},backend:e,attrs:{shape:[l,a]}}),f=st({inputs:{x:i},backend:e,attrs:{shape:[l,c]}}),m=st({inputs:{x:o},backend:e,attrs:{shape:d}}),g=new $p(l,a,p.shape.length,f.shape.length,u,d,!1,!0),x=e.runWebGLProgram(g,[f,p,m],m.dtype),b=st({inputs:{x},backend:e,attrs:{shape:o.shape}});return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(x),b}const qG={kernelName:qp,backendName:"webgl",kernelFunc:HG};class XG{constructor(t,e){this.variableNames=["A"];const s=new Array(t.length);for(let i=0;i<s.length;i++)s[i]=t[i]*e[i];this.outputShape=s,this.rank=s.length;const o=Ut(this.rank),r=KG(t);this.userCode=`
      void main() {
        ${o} resRC = getOutputCoords();
        setOutput(getA(${r}));
      }
    `}}function KG(n){const t=n.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(t===1)return`imod(resRC, ${n[0]})`;const e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],s=[];for(let o=0;o<n.length;o++)s.push(`imod(${e[o]}, ${n[o]})`);return s.join()}function Ky(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{reps:r}=s;if(o.dtype==="string"||o.shape.length>5){const l=e.readSync(o.dataId),c=o.dtype==="string"?l.map(d=>Cs(d)):l,u=It(o.shape,o.dtype,c),h=jP(u,r);return e.makeTensorInfo(h.shape,h.dtype,h.values)}const i=new XG(o.shape,r);return e.runWebGLProgram(i,[o],o.dtype)}const jG={kernelName:ci,backendName:"webgl",kernelFunc:Ky};class YG{constructor(t){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=t,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}}class ZG{constructor(t){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=t,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}}function To(n,t){t!==null&&n.disposeIntermediateTensorInfo(t)}function jy(n){let t=1;for(;t<n;)t*=2;return t}function QG(n){const{inputs:t,backend:e,attrs:s}=n,{x:o}=t,{k:r,sorted:i}=s,a=U().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),l=U().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),c=o.shape,u=c[c.length-1];if(e.shouldExecuteOnCPU([o])||u<a||r>l){const N=e.readSync(o.dataId),[C,E]=YP(N,c,o.dtype,r,i);return[e.makeTensorInfo(C.shape,C.dtype,C.values),e.makeTensorInfo(E.shape,E.dtype,E.values)]}if(r===0)return c[c.length-1]=0,[e.makeTensorInfo(c,o.dtype,[]),e.makeTensorInfo(c,"int32",[])];if(u===1)return[o,sa({attrs:{shape:c,dtype:"int32",value:0},backend:e})];const h=e.texData.get(o.dataId),d=h!==null&&h.isPacked,p=d?e.unpackTensor(o):o,m=X(c)/u,g=st({inputs:{x:p},attrs:{shape:[m,u]},backend:e});d&&To(e,p);const x=jy(r),b=jy(u);let w=null;const y=()=>w===null?[g,g]:[g,w],$=(N,C,E)=>{const R=y(),D=new YG(E),O=[[u],[w===null?1:0],[Number.NEGATIVE_INFINITY],[N],[C]],P=w;w=e.runWebGLProgram(D,R,"int32",O),To(e,P)};for(let N=1;N<x;N*=2){const C=N*2;for(let E=N;E>=1;E/=2)$(C,E,[m,b])}for(let N=b;N>x;N/=2){const C=y(),E=new ZG([m,N/2]),D=[[u],[w===null?1:0],[x]],F=w;w=e.runWebGLProgram(E,C,"int32",D),To(e,F);const O=x/2,P=O*2;for(let B=O;B>=1;B/=2)$(P,B,w.shape)}let I=w;w=dr({inputs:{x:w},backend:e,attrs:{begin:0,size:[m,r]}}),To(e,I);let v=My({inputs:{x:g,indices:w},backend:e,attrs:{axis:1,batchDims:1}});To(e,g);const T=c.slice(0,-1);T.push(r),I=w,w=st({inputs:{x:w},attrs:{shape:T},backend:e}),To(e,I);const S=v;return v=st({inputs:{x:v},attrs:{shape:T},backend:e}),To(e,S),[v,w]}const JG={kernelName:Pu,backendName:"webgl",kernelFunc:QG};class tH{constructor(t,e,s,o,r,i){this.variableNames=["Image","Transforms"],this.outputShape=i;const a=s==="nearest"?1:2;let l;switch(o){case"constant":l=1;break;case"reflect":l=2;break;case"wrap":l=3;break;case"nearest":l=4;break;default:l=1;break}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${l} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${l} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${l} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${t} && 0 <= coordX && coordX < ${e}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${r});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${r});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${e}));
                float mapY = mapCoord(inY, float(${t}));

                if (${a} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}}function eH(n){const{inputs:t,backend:e,attrs:s}=n,{image:o,transforms:r}=t,{interpolation:i,fillMode:a,fillValue:l,outputShape:c}=s,[u,h,d,p]=o.shape,[f,m]=c!=null?c:[h,d],g=[u,f,m,p],x=new tH(h,d,i,a,l,g);return e.runWebGLProgram(x,[o,r],"float32")}const nH={kernelName:Bu,backendName:"webgl",kernelFunc:eH};function sH(n){const{inputs:t,attrs:e,backend:s}=n,{axis:o}=e,{x:r}=t;Yi(r,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");const i=s.readSync(r.dataId),{outputValues:a,outputShape:l,indices:c}=ZP(i,o,r.shape,r.dtype);return[s.makeTensorInfo(l,r.dtype,a),s.makeTensorInfo([c.length],"int32",c)]}const oH={kernelName:zu,backendName:"webgl",kernelFunc:sH};function rH(n){const{inputs:t,backend:e,attrs:s}=n,{value:o}=t;let{axis:r}=s;r<0&&(r+=o.shape.length);const i=o,a=i.shape.length,l=o.shape[r],c=new Array(a-1);let u=0;for(let m=0;m<a;m++)m!==r&&(c[u++]=i.shape[m]);const h=[],d=new Array(a).fill(0),p=i.shape.slice();p[r]=1;const f=new Array(l);for(let m=0;m<f.length;m++){d[r]=m;const g=dr({inputs:{x:i},backend:e,attrs:{begin:d,size:p}}),x=st({inputs:{x:g},backend:e,attrs:{shape:c}});f[m]=x,h.push(g)}return h.forEach(m=>e.disposeIntermediateTensorInfo(m)),f}const iH={kernelName:ol,backendName:"webgl",kernelFunc:rH};class aH{constructor(t,e){this.variableNames=["x","segmentIds"];const s=t.windowSize,o=t.batchSize,r=t.inSize,i=t.numSegments,a=i*Math.ceil(r/s);this.outputShape=[o,a];const l="0.0",c="sumValue",u=Math.floor(s/4)*4,h=s%4,d=`
        sumValue += dot(values, segFilter);
    `;let p="";r%s>0&&(p=`
        if (inIdx < 0 || inIdx >= ${r}) {
          return initializationValue;
        }
      `);let f="";r%s>0&&(f=`
        if (inIdx < 0 || inIdx >= ${r}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = ${l};

      float getValue(int batch, int inIdx) {
        ${p}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${f}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${i})) * float(${s}));
        int currentSeg = int(mod(float(outIdx), float(${i})));

        float sumValue = 0.0;

        for (int i = 0; i < ${u}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${d}
        }

        int inIdx = inOffset + ${u};
        if (${h===1}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${d}
        } else if (${h===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${d}
        } else if (${h===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${d}
        }
        setOutput(${c});
      }
    `}}function lH(n){const{inputs:t,backend:e,attrs:s}=n,{x:o,segmentIds:r}=t,{numSegments:i}=s,a=o.shape.length,l=[];let c=0;const u=Qt([c],a);let h=o;u!=null&&(h=We({inputs:{x:o},backend:e,attrs:{perm:u}}),l.push(h),c=se(1,a)[0]);const d=qS(h.shape,c,i),p=X([h.shape[c]]),f=st({inputs:{x:h},backend:e,attrs:{shape:[-1,p]}});l.push(f);const m=Yu(o.dtype),g=(y,$,I,v,T)=>{const S=y.shape[0],N=y.shape[1],C=HS(N,T),E={windowSize:C,inSize:N,batchSize:S,numSegments:T},R=new aH(E,$),D=e.compileAndRun(R,[y,I],v);if(l.push(D),D.shape[1]===T)return D;const F=Hy({backend:e,attrs:{start:0,stop:T,step:1,dtype:"float32"}}),O=Ky({inputs:{x:F},backend:e,attrs:{reps:[N/C]}});return l.push(F),l.push(O),g(D,$,O,v,T)},x=g(f,"unsortedSegmentSum",r,m,i),b=st({inputs:{x},backend:e,attrs:{shape:d}});let w=b;if(u!=null){l.push(b);const y=ks(u);w=We({inputs:{x:w},backend:e,attrs:{perm:y}})}return l.forEach(y=>e.disposeIntermediateTensorInfo(y)),w}const cH={kernelName:rl,backendName:"webgl",kernelFunc:lH};const uH=[W3,G3,X3,Y3,Q3,eB,sB,rB,cB,hB,fB,xB,wB,vB,NB,EB,AB,OB,MB,BB,WB,KB,YB,tz,nz,az,cz,pz,k3,gz,Cz,kz,Az,_z,Lz,Pz,zz,Gz,qz,Kz,Yz,Qz,tV,sV,rV,cV,hV,fV,xV,yV,CV,vV,SV,EV,AV,DV,_V,LV,PV,zV,WV,GV,XV,YV,QV,e4,o4,i4,l4,v3,u4,yz,d4,f4,g4,N3,b4,w4,$4,k4,T4,R4,D4,_4,M4,B4,V4,H4,X4,j4,J4,eW,sW,rW,aW,hW,fW,bW,vW,R3,TW,AW,_W,MW,sz,BW,VW,UW,qW,YW,E3,QW,tU,nU,oU,rU,oz,wW,aU,uU,pU,D3,xU,wU,vU,NU,AU,FU,OU,MU,zU,UU,qU,jU,QU,tG,oG,iG,XB,$W,lG,cG,hG,pG,mG,xG,yG,CG,IG,kG,NG,EG,AG,_G,LG,PG,zG,CW,B3,WG,GG,qG,jG,JG,nH,z3,oH,iH,cH,zW];for(const n of uH)af(n);class hH{idx(t,e,s,o){return s*o[0]*o[1]+e*o[0]+t}check_previous_slice(t,e,s,o,r,i,a,l,c,u){let h=0;if(!r)return 0;const d=t[this.idx(s,o,r,i)];if(a>=6){const p=this.idx(s,o,r-1,i);d===t[p]&&(c[h++]=e[p])}if(a>=18){if(s){const p=this.idx(s-1,o,r-1,i);d===t[p]&&(c[h++]=e[p])}if(o){const p=this.idx(s,o-1,r-1,i);d===t[p]&&(c[h++]=e[p])}if(s<i[0]-1){const p=this.idx(s+1,o,r-1,i);d===t[p]&&(c[h++]=e[p])}if(o<i[1]-1){const p=this.idx(s,o+1,r-1,i);d===t[p]&&(c[h++]=e[p])}}if(a===26){if(s&&o){const p=this.idx(s-1,o-1,r-1,i);d===t[p]&&(c[h++]=e[p])}if(s<i[0]-1&&o){const p=this.idx(s+1,o-1,r-1,i);d===t[p]&&(c[h++]=e[p])}if(s&&o<i[1]-1){const p=this.idx(s-1,o+1,r-1,i);d===t[p]&&(c[h++]=e[p])}if(s<i[0]-1&&o<i[1]-1){const p=this.idx(s+1,o+1,r-1,i);d===t[p]&&(c[h++]=e[p])}}return h?(this.fill_tratab(l,c,h,u),c[0]):0}do_initial_labelling(t,e,s){const o=new Uint32Array(32),r=new Uint32Array(32);let i=1;const a=8192;let l=a,c=new Uint32Array(l).fill(0);const u=new Uint32Array(e[0]*e[1]*e[2]).fill(0),h=new Uint32Array(27);for(let d=0;d<e[2];d++)for(let p=0;p<e[1];p++)for(let f=0;f<e[0];f++){let m=0;const g=t[this.idx(f,p,d,e)];if(g!==0){if(h[0]=this.check_previous_slice(t,u,f,p,d,e,s,c,o,r),h[0]&&(m+=1),s>=6){if(f){const x=this.idx(f-1,p,d,e);g===t[x]&&(h[m++]=u[x])}if(p){const x=this.idx(f,p-1,d,e);g===t[x]&&(h[m++]=u[x])}}if(s>=18){if(p&&f){const x=this.idx(f-1,p-1,d,e);g===t[x]&&(h[m++]=u[x])}if(p&&f<e[0]-1){const x=this.idx(f+1,p-1,d,e);g===t[x]&&(h[m++]=u[x])}}if(m)u[this.idx(f,p,d,e)]=h[0],this.fill_tratab(c,h,m,r);else{if(u[this.idx(f,p,d,e)]=i,i>=l){l+=a;const x=new Uint32Array(l);x.set(c),c=x}c[i-1]=i,i++}}}for(let d=0;d<i-1;d++){let p=d;for(;c[p]!==p+1;)p=c[p]-1;c[d]=p+1}return[i-1,c,u]}fill_tratab(t,e,s,o){let i=2147483647;for(let a=0;a<s;a++){let l=e[a];for(;t[l-1]!==l;)l=t[l-1];o[a]=l,i=Math.min(i,l)}for(let a=0;a<s;a++)t[o[a]-1]=i}translate_labels(t,e,s,o){const r=e[0]*e[1]*e[2];let i=0;const a=new Uint32Array(r).fill(0);for(let u=0;u<o;u++)i=Math.max(i,s[u]);const l=new Uint32Array(i).fill(0);let c=0;for(let u=0;u<r;u++)t[u]&&(l[s[t[u]-1]-1]||(c+=1,l[s[t[u]-1]-1]=c),a[u]=l[s[t[u]-1]-1]);return[c,a]}neighbor_winners(t,e,s,o){const r=e[0],i=e[1],a=e[2],l=r*i,c=new Map,u=(d,p)=>{let f=c.get(d);f||(f=new Map,c.set(d,f)),f.set(p,(f.get(p)||0)+1)};for(let d=0;d<a;d++)for(let p=0;p<i;p++)for(let f=0;f<r;f++){const m=d*l+p*r+f,g=t[m];if(g===0||s[g])continue;let x;f>0&&(x=s[t[m-1]])&&u(g,x),f<r-1&&(x=s[t[m+1]])&&u(g,x),p>0&&(x=s[t[m-r]])&&u(g,x),p<i-1&&(x=s[t[m+r]])&&u(g,x),d>0&&(x=s[t[m-l]])&&u(g,x),d<a-1&&(x=s[t[m+l]])&&u(g,x)}const h=new Uint32Array(o+1).fill(0);for(const[d,p]of c){let f=0,m=0;for(const[g,x]of p)(x>m||x===m&&(f===0||g<f))&&(m=x,f=g);h[d]=f}return h}finalize_volume(t,e,s,o,r){const i=t.length,a=new Uint32Array(i).fill(0),l=r?this.neighbor_winners(t,e,s,o):null;let c=0;for(let u=0;u<i;u++){const h=t[u];if(h===0)continue;let d=s[h];!d&&l&&(d=l[h]),d&&(a[u]=d,d>c&&(c=d))}return[c,a]}diagnose_components(t,e,s,o,r={}){var S,N,C;const i=(S=r.topN)!=null?S:50,a=(N=r.minSize)!=null?N:1,l=(C=r.label)!=null?C:"diag",c=o[0],u=o[1],h=o[2],d=c*u,p=new Uint32Array(e+1),f=new Uint32Array(e+1);for(let E=0;E<t.length;E++){const R=s[E];R&&(p[R]=t[E],f[R]++)}const m=new Map,g=new Uint32Array(e+1),x=new Uint32Array(e+1),b=(E,R)=>{let D=m.get(E);D||(D=new Map,m.set(E,D)),D.set(R,(D.get(R)||0)+1)};for(let E=0;E<h;E++)for(let R=0;R<u;R++)for(let D=0;D<c;D++){const F=E*d+R*c+D,O=s[F];if(!O)continue;const P=p[O],B=H=>{const G=s[H];if(G===O)return;x[O]++;const K=G?p[G]:0;K===0?g[O]++:K!==P&&b(O,K)};D>0&&B(F-1),D<c-1&&B(F+1),R>0&&B(F-c),R<u-1&&B(F+c),E>0&&B(F-d),E<h-1&&B(F+d)}const w=new Map,y=new Map;for(let E=1;E<=e;E++){const R=p[E];w.set(R,(w.get(R)||0)+1),(!y.has(R)||f[E]>y.get(R))&&y.set(R,f[E])}const $=[];for(let E=1;E<=e;E++){if(f[E]<a)continue;const R=p[E],D=m.get(E);let F=0,O=0,P=0;if(D)for(const[H,G]of D)P+=G,G>O&&(O=G,F=H);const B=x[E]||1;$.push({comp:E,class:R,size:f[E],largestOfClass:f[E]===y.get(R)?"Y":"n",compsInClass:w.get(R),domNeighbor:F,domFracForeign:P?+(O/P).toFixed(2):0,domFracBoundary:+(O/B).toFixed(2),bgFrac:+(g[E]/B).toFixed(2)})}$.sort((E,R)=>R.domFracForeign-E.domFracForeign||R.size-E.size);const I=(E,R)=>{const D=R.map(O=>Math.max(O.h.length,...E.map(P=>String(P[O.k]).length))),F=O=>O.map((P,B)=>String(P).padStart(D[B])).join("  ");return[F(R.map(O=>O.h)),...E.map(O=>F(R.map(P=>O[P.k])))].join(`
`)},v=[{k:"comp",h:"comp"},{k:"class",h:"class"},{k:"size",h:"size"},{k:"largestOfClass",h:"lrg"},{k:"compsInClass",h:"nComp"},{k:"domNeighbor",h:"domNbr"},{k:"domFracForeign",h:"encF"},{k:"domFracBoundary",h:"encB"},{k:"bgFrac",h:"bgF"}];console.log(`[${l}] total components=${e}, distinct classes=${w.size}
[${l}] island candidates (encF≈1 + small size + lrg=n ⇒ swallowed island):
`+I($.slice(0,i),v));const T=[...w.entries()].map(([E,R])=>({class:E,components:R,maxCompSize:y.get(E)})).sort((E,R)=>R.components-E.components);return console.log(`[${l}] per-class component counts (components=1 ⇒ fully connected):
`+I(T.slice(0,30),[{k:"class",h:"class"},{k:"components",h:"comps"},{k:"maxCompSize",h:"maxSize"}])),$}largest_original_cluster_labels(t,e,s,o=null,r=!1){const i=t.length,a=new Uint32Array(e+1).fill(0),l=new Uint32Array(e+1).fill(0);for(let c=0;c<i;c++){const u=t[c],h=s[c];a[h]=u,l[h]++}for(let c=0;c<e+1;c++){const u=a[c];for(let h=0;h<e+1;h++)h!==c&&u===a[h]&&(l[c]<l[h]||l[c]===l[h]&&c<h)&&(a[c]=0)}return this.finalize_volume(s,o,a,e,r)}filter_clusters(t,e,s,o,r=null,i=!1){const a=t.length,l=new Uint32Array(e+1).fill(0),c=new Uint32Array(e+1).fill(0);for(let d=0;d<a;d++){const p=t[d],f=s[d];f>0&&(l[f]=p,c[f]++)}const u=new Uint8Array(e+1).fill(1);for(let d=1;d<=e;d++){const p=l[d];if(o==="all"||o.has&&o.has(p)){for(let m=1;m<=e;m++)if(d!==m&&l[m]===p){if(c[m]>c[d]){u[d]=0;break}else if(c[m]===c[d]&&m<d){u[d]=0;break}}}}const h=new Uint32Array(e+1).fill(0);for(let d=1;d<=e;d++)u[d]&&(h[d]=l[d]);return this.finalize_volume(s,r,h,e,i)}filter_clusters_by_ratio(t,e,s,o,r=null,i=!1){const a=t.length,l=new Uint32Array(e+1).fill(0),c=new Uint32Array(e+1).fill(0);for(let p=0;p<a;p++){const f=s[p];f>0&&(l[f]===0&&(l[f]=t[p]),c[f]++)}const u=new Map;for(let p=1;p<=e;p++){const f=l[p],m=c[p];(!u.has(f)||m>u.get(f))&&u.set(f,m)}const h=new Uint8Array(e+1).fill(0);for(let p=1;p<=e;p++){const f=l[p],m=c[p],g=u.get(f)||0;m>=g*o&&(h[p]=1)}const d=new Uint32Array(e+1).fill(0);for(let p=1;p<=e;p++)h[p]&&(d[p]=l[p]);return this.finalize_volume(s,r,d,e,i)}bwlabel(t,e,s=26,o=!1,r=!1){const i=Date.now(),a=e[0]*e[1]*e[2],l=new Uint32Array(a).fill(0);if(![6,18,26].includes(s))return console.log("bwlabel: conn must be 6, 18 or 26."),[0,l];if(e[0]<2||e[1]<2||e[2]<1)return console.log("bwlabel: img must be 2 or 3-dimensional"),[0,l];if(o)for(let f=0;f<a;f++)t[f]!==0&&(l[f]=1);else l.set(t);let[c,u,h]=this.do_initial_labelling(l,e,s);u===void 0&&(u=new Uint32Array(0));const[d,p]=this.translate_labels(h,e,u,c);if(console.log(s+" neighbor clustering into "+d+" regions in "+(Date.now()-i)+"ms"),r){const[f,m]=this.largest_original_cluster_labels(l,d,p);return[f,m]}return[d,p]}filter_clusters_by_rank(t,e,s,o,r=0,i=null,a=!1,l=null,c=!1){const u=t.length,h=new Uint32Array(e+1).fill(0),d=new Uint32Array(e+1).fill(0),p=l!=null&&Array.isArray(i)&&i.length===3,f=p?i[0]:0,m=p?i[1]:0,g=p?new Int32Array(e+1).fill(2147483647):null,x=p?new Int32Array(e+1).fill(-1):null,b=p?new Int32Array(e+1).fill(2147483647):null,w=p?new Int32Array(e+1).fill(-1):null,y=p?new Int32Array(e+1).fill(2147483647):null,$=p?new Int32Array(e+1).fill(-1):null;for(let C=0;C<u;C++){const E=s[C];if(E>0&&(h[E]===0&&(h[E]=t[C]),d[E]++,p)){const R=C%f,D=C/f|0,F=D%m,O=D/m|0;R<g[E]&&(g[E]=R),R>x[E]&&(x[E]=R),F<b[E]&&(b[E]=F),F>w[E]&&(w[E]=F),O<y[E]&&(y[E]=O),O>$[E]&&($[E]=O)}}let I=null,v=0;if(p){let C=-1;for(let P=1;P<=e;P++)d[P]>C&&(C=d[P],v=P);const E=Math.max(2,Math.ceil(l)+4),R=f*m,D=new Int16Array(u).fill(-1);let F=[];for(let P=0;P<u;P++)s[P]===v&&(D[P]=0,F.push(P));for(let P=1;P<=E&&F.length;P++){const B=[];for(let H=0;H<F.length;H++){const G=F[H],K=G%f,Y=(G/f|0)%m;K>0&&D[G-1]===-1&&(D[G-1]=P,B.push(G-1)),K<f-1&&D[G+1]===-1&&(D[G+1]=P,B.push(G+1)),Y>0&&D[G-f]===-1&&(D[G-f]=P,B.push(G-f)),Y<m-1&&D[G+f]===-1&&(D[G+f]=P,B.push(G+f)),G-R>=0&&D[G-R]===-1&&(D[G-R]=P,B.push(G-R)),G+R<u&&D[G+R]===-1&&(D[G+R]=P,B.push(G+R))}F=B}const O=E+1;I=new Float64Array(e+1).fill(O);for(let P=0;P<u;P++){const B=s[P];if(B>0&&B!==v){const H=D[P]>=0?D[P]:O;H<I[B]&&(I[B]=H)}}c&&console.log(`[rank-filter] brain comp=${v} size=${C} bbox A[${g[v]},${x[v]}] B[${b[v]},${w[v]}] C[${y[v]},${$[v]}] | maxGap=${l} scan=${E}`)}const T=new Map;for(let C=1;C<=e;C++){const E=h[C],R=d[C];T.has(E)||T.set(E,[]),T.get(E).push({i:C,size:R})}const S=new Uint8Array(e+1).fill(0);for(const[C,E]of T.entries()){E.sort((O,P)=>P.size-O.size);const R=E.length?E[0].size:0,D=r>0?R*r:0,F=Math.min(E.length,o);for(let O=0;O<F;O++){const P=E[O];if(P.size<D){c&&O>0&&console.log(`[rank-filter] class ${C} #${O}: size=${P.size} DROP (below ${(r*100).toFixed(0)}% floor)`);break}if(O>0&&p){const B=I[P.i],H=B<=l;if(c&&console.log(`[rank-filter] class ${C} #${O}: size=${P.size} surfDist=${B} -> ${H?"KEEP":"DROP (too far)"}`),!H)continue}S[P.i]=1}}const N=new Uint32Array(e+1).fill(0);for(let C=1;C<=e;C++)S[C]&&(N[C]=h[C]);return this.finalize_volume(s,i,N,e,a)}}function Yy(n,t,e){const s=(t-1)*e,o=Math.floor(s),r=Math.ceil(s);let i=0,a=0,l=0,c=!1;for(let u=0;u<n.length;u++)if(i+=n[u],!c&&i>o&&(a=u,c=!0),i>r){l=u;break}return a+(l-a)*(s-o)}function dH(n,t=.02,e=.98){return Q(this,null,function*(){const s=n.flatten(),o=s.shape[0],r=yield s.data();s.dispose();const i=new Uint32Array(256);let a=!0;for(let f=0;f<o;f++){const m=r[f];if(!Number.isFinite(m))throw new Error("Cannot percentile-normalize a volume containing NaN or Infinity");m<0||m>255||m!==Math.trunc(m)?a=!1:i[m]++}if(a)return{qmin:Yy(i,o,t),qmax:Yy(i,o,e)};const l=Math.min(1e5,o),c=new Float32Array(l),u=l>1?(o-1)/(l-1):0;for(let f=0;f<l;f++){const m=r[Math.round(f*u)];if(!Number.isFinite(m))throw new Error("Cannot percentile-normalize a volume containing NaN or Infinity");c[f]=m}c.sort();const h=f=>{const m=(l-1)*f,g=Math.floor(m),x=Math.ceil(m);return c[g]+(c[x]-c[g])*(m-g)},d=h(t),p=h(e);return{qmin:d,qmax:p}})}function pH(n){return Q(this,null,function*(){const t=n.max(),e=n.min();return yield n.sub(e).div(t.sub(e))})}function fH(n,t=.02,e=.98,s=.001){return Q(this,null,function*(){if(!(t>=0&&t<e&&e<=1))throw new Error(`Invalid normalization percentiles: ${t}, ${e}`);const{qmin:o,qmax:r}=yield dH(n,t,e);console.log(`[Normalization] ${t*100}-${e*100} percentiles: low=${o}, high=${r}, epsilon=${s}, clip=[0,1]`);const i=r-o+s,a=n.sub(o),l=a.div(i),c=l.clipByValue(0,1);return a.dispose(),l.dispose(),c})}function mH(n,t,e,s){return Q(this,null,function*(){console.log("Downloading segmentation data from GPU to CPU...");const o=yield n.data(),r=n.shape;if(console.log("Data download complete. Starting CPU processing."),s.isPostProcessEnable){console.log("Applying CPU-based connected-component labeling...");const i=performance.now(),a=new hH,l=[5,14],c=!!s.fillSuppressedWithNeighborLabel||l.includes(e.id),u=r[0]*r[1]*r[2],h=Math.max(1e5,Math.floor(u*.01)),[d,p]=a.bwlabel(o,r,6,!1,!1);if(d>h){const x=`Segmentation produced noise: ${d.toLocaleString()} disconnected regions (cap ${h.toLocaleString()}). The model output is unusable, so post-processing was aborted. Try re-running, switching backend (WebGPU/WebGL2), or another model.`;console.error("[postprocess] "+x);const b=new Error(x);throw b.code="SEGMENTATION_NOISE",b}let f=!1,m=!1;if(e.type==="Brain_Extraction"||e.type==="Brain_Masking"?(f=!0,m=!0):[1,7].includes(e.id)?(f=!1,m=!1):[5,14].includes(e.id)?(f=!1,m=!0):[3,8,9].includes(e.id)?(f=!1,m=!1):(f=!0,m=!0),[1,7].includes(e.id)){const y=d,$=p,[I,v]=a.filter_clusters_by_rank(o,y,$,2,.02,r,c,8,!1);o.set(v)}else if(!m&&[3,8,9].includes(e.id)){const[x,b]=a.bwlabel(o,r,6,!0,!0);for(let T=0;T<o.length;T++)o[T]*=b[T];const[w,y]=a.bwlabel(o,r,6,!1,!1),$=new Set([1,2,5,6,13]),[I,v]=a.filter_clusters(o,w,y,$,r,c);o.set(v)}else if(!f&&m){s.diagnoseEnclosedComponents&&a.diagnose_components(o,d,p,r,{label:`model${e.id}`,topN:60});const[x,b]=a.largest_original_cluster_labels(o,d,p,r,c);o.set(b)}else{const[x,b]=a.bwlabel(o,r,6,f,m);if(f)for(let w=0;w<o.length;w++)o[w]*=b[w];else o.set(b)}const g=((performance.now()-i)/1e3).toFixed(4);console.log(`Connected-component labeling took: ${g} seconds.`)}switch(e.type){case"Brain_Masking":{const i=new Uint8Array(o.length);for(let a=0;a<o.length;a++)i[a]=o[a]!==0?1:0;return i}case"Brain_Extraction":{if(e.returnMaskForExtraction){const a=new Uint8Array(o.length);for(let l=0;l<o.length;l++)a[l]=o[l]!==0?1:0;return a}const i=new t.constructor(o.length);for(let a=0;a<o.length;a++){const l=o[a]!==0?1:0;i[a]=t[a]*l}return i}default:return new Uint8Array(o)}})}const Zy={WEBGPU:"webgpu",WEBGL_WEBWORKER:"webgl-webworker"};function Qy(n,t){return{startTime:Date.now(),Model_Name:(n==null?void 0:n.modelName)||"Unknown",Execution_Mode:t,TF_Backend:t===Zy.WEBGPU?"webgpu":"webgl",isModelFullVol:null,No_SubVolumes:1,Brainchop_Ver:"FullVolume",Input_Shape:null,Output_Shape:null,Channel_Last:null,Model_Param:null,Model_Layers:null,Actual_Labels:null,Expect_Labels:null,NumLabels_Match:null,Missing_Labels:null,Inference_t:null,Postprocess_t:null,Status:null,Error_Type:null,Extra_Err_Info:null}}function gH(n,t,e,s=null){n.Expect_Labels=t,n.Actual_Labels=e,n.NumLabels_Match=t===e,s&&s.length>0&&(n.Missing_Labels=s.join(", "))}function xH(n,t,e){n.Inference_t=t,n.Postprocess_t=e,n.Status="OK"}function bH(n,t,e=null){n.Inference_t=1/0,n.Postprocess_t=1/0,n.Status="Fail",n.Error_Type=(t==null?void 0:t.message)||String(t),e&&(n.Extra_Err_Info=e)}const yH={rodent:{dilations:[16,8,4,2,1,16,8,4,2,1,16,8,4,2,1,16,8,4,2,1,16,8,4,2,1],activation:"gelu_tanh",fullVolume:!0}};function wH(n){const t=String(n.path||"").match(/\/models\/([^/]+)\//);return t?t[1]:null}function CH(n){const t=wH(n);if(!t)return null;const e=yH[t];return e?Wc({name:t},e):null}function $H(n){const t=n&32768?-1:1,e=(n&31744)>>10,s=n&1023;return e===0?t*Math.pow(2,-14)*(s/1024):e===31?s?NaN:t*(1/0):t*Math.pow(2,e-15)*(1+s/1024)}function IH(n){const t=new DataView(n),e=Number(t.getBigUint64(0,!0)),s=JSON.parse(new TextDecoder().decode(new Uint8Array(n,8,e))),o=8+e,r={};for(const[i,a]of Object.entries(s)){if(i==="__metadata__"){r.__metadata__=a;continue}const[l,c]=a.data_offsets,u=a.shape.reduce((d,p)=>d*p,1);let h;if(a.dtype==="F32")h=new Float32Array(n.slice(o+l,o+c));else if(a.dtype==="F16"){const d=new Uint16Array(n.slice(o+l,o+c));h=new Float32Array(u);for(let p=0;p<u;p++)h[p]=$H(d[p])}else if(a.dtype==="BF16"){const d=new Uint16Array(n.slice(o+l,o+c));h=new Float32Array(u);const p=new Uint32Array(1),f=new Float32Array(p.buffer);for(let m=0;m<u;m++)p[0]=d[m]<<16,h[m]=f[0]}else throw new Error(`safetensors: unsupported dtype ${a.dtype} for tensor '${i}'`);if(h.length!==u)throw new Error(`safetensors: tensor '${i}' has ${h.length} values, shape says ${u}`);r[i]={dtype:a.dtype,shape:a.shape,data:h}}return r}function vH(n){const t=[],e=[],s=[];for(const[r,i]of Object.entries(n)){if(r==="__metadata__")continue;const a=r.match(/^m\.model\.(\d+)\.(weight|bias)$/);if(!a)continue;const l=Number(a[1]),c=a[2]==="weight";if(i.shape.length===5){const[u,h,d,p,f]=i.shape,g={idx:l,outC:u,inC:h,kd:d,kh:p,kw:f,is1x1:d===1&&p===1&&f===1,w:i.data,bias:null},x=t.find(b=>b.idx===l);x?Object.assign(x,g):t.push(g)}else i.shape.length===1&&s.push({idx:l,isW:c,data:i.data,len:i.shape[0]})}t.sort((r,i)=>r.idx-i.idx);for(const r of s){const i=t.find(l=>l.idx===r.idx);if(i&&!r.isW){i.bias=r.data;continue}if(i&&r.isW)continue;let a=e.find(l=>l.idx===r.idx);a||(a={idx:r.idx,scale:null,bias:null},e.push(a)),r.isW?a.scale=r.data:a.bias=r.data}e.sort((r,i)=>r.idx-i.idx);let o=null;return t.length&&t[t.length-1].is1x1&&(o=t.pop()),{convs:t,affines:e,classifier:o}}function kH(n,t){const e=t.cs,s=t.chan,{convs:o,affines:r,classifier:i}=n,a=p=>27*p*e;let l=0;const c=[];o.forEach((p,f)=>{const m=f===0?1:e,g={wq:l/4,inCS:m};l+=a(m),p.bias&&(g.biasQ=l/4,l+=e),c.push(g)}),r.forEach((p,f)=>{c[f]=c[f]||{},c[f].affQ=l/4,l+=e,c[f].affBiasQ=l/4,l+=e});let u=-1,h=-1;i&&(u=l,l+=s*t.nclass,l=Math.ceil(l/4)*4,i.bias&&(h=l,l+=t.nclass),l=Math.ceil(l/4)*4);const d=new Float32Array(l);if(o.forEach((p,f)=>{const m=c[f],g=m.inCS,x=m.wq*4,b=p.kd*p.kh*p.kw;if(p.outC>s||f>0&&p.inC>s)throw new Error(`layer ${f}: shape ${p.outC}x${p.inC} exceeds CHAN ${s}`);for(let w=0;w<p.outC;w++){for(let y=0;y<p.inC;y++)for(let $=0;$<p.kd;$++)for(let I=0;I<p.kh;I++)for(let v=0;v<p.kw;v++){const T=p.kd===3?$*9+I*3+v:0,S=(((w*p.inC+y)*p.kd+$)*p.kh+I)*p.kw+v;d[x+(T*g+y)*e+w]=p.w[S]}p.bias&&(d[m.biasQ*4+w]=p.bias[w])}if(b!==27&&b!==1)throw new Error(`layer ${f}: kernel ${p.kd}x${p.kh}x${p.kw} unsupported`)}),r.forEach((p,f)=>{const m=c[f];for(let g=0;g<s;g++)d[m.affQ*4+g]=p.scale?p.scale[g]:0,d[m.affBiasQ*4+g]=p.bias?p.bias[g]:0}),i)for(let p=0;p<t.nclass;p++){for(let f=0;f<s;f++)d[u+f*t.nclass+p]=i.w[p*i.inC+f];i.bias&&(d[h+p]=i.bias[p])}return{data:d,offsets:{layers:c,clsFloat:u,clsBiasFloat:h}}}function SH(n,t={}){const{convs:e,affines:s,classifier:o}=n,r=e[0].outC,i=Math.ceil(r/4)*4,a=e.some(c=>c.bias),l=Wc({chan:r,cs:i,planes:i/4,nclass:o?o.outC:0,nhidden:e.length-1,norm:s.length?"gn":a?"none":"gn",affine:s.length>0,convBias:a,classifierBias:!!(o&&o.bias),centeredVariance:!1,eps:1e-5},t);if(l.nclass>256)throw new Error(`classifier has ${l.nclass} classes; the RGBA8 label texture holds at most 256`);if(!l.activation)throw new Error("descriptor needs an explicit `activation`");if(!l.dilations)throw new Error("descriptor needs an explicit `dilations` array");if(l.dilations.length!==e.length)throw new Error(`descriptor has ${l.dilations.length} dilations for ${e.length} convs`);return l}const Fc=256,NH=8,TH=255,Ws=2048,EH=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,Us=n=>{var t;return`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
const int NX = ${n.nx};
const int NY = ${n.ny};
const int NZ = ${n.nz};
const int CS = ${n.cs};
const int P = ${n.planes};
const int CHAN = ${n.chan};
const int NCLASS = ${n.nclass};
const float EPS = ${(t=n.eps)!=null?t:1e-5};
`},oa=`uniform highp sampler2D wts;
vec4 wf(int q) {
  return texelFetch(wts, ivec2(q & ${TH}, q >> ${NH}), 0);
}
float ws(int i) { return wf(i >> 2)[i & 3]; }
`,xe=(n,t)=>Array.from({length:n},(e,s)=>t(s)).join(""),_c=(n,t)=>xe(n,e=>`layout(location = ${e}) out vec4 ${t}${e};
`),Oc=n=>`uniform highp sampler3D ${xe(n,t=>(t?", ":"")+"s"+t)};
`,Lc=(n,t)=>`  vec4 ${xe(n,e=>(e?", ":"")+t+e+" = vec4(0.0)")};
`,Mc=(n,t,e)=>xe(n,s=>`  ${t}${s} = ${e}${s};
`);function Pc(n){switch(n){case"gelu_tanh":return`float act(float x) {
  float u = clamp(0.7978845608028654 * (x + 0.044715 * x * x * x), -9.0, 9.0);
  return 0.5 * x * (1.0 + tanh(u));
}
`;case"gelu_tanh_approx":return`float mn_tanh(float x_in) {
  float x = clamp(x_in, -9.0, 9.0);
  float u = x * x;
  float p = -8.29118133e-14;
  p = p * u + 5.19263868e-11;
  p = p * u - 2.00294448e-08;
  p = p * u + 1.11017944e-05;
  p = p * u + 0.00309865153;
  p = p * u + 0.130791619;
  p = p * u + 0.99999994;
  float q = 0.000253859733;
  q = q * u + 0.024473751;
  q = q * u + 0.464124829;
  q = q * u + 1.0;
  return x * p / q;
}
float act(float x) {
  float u = 0.797884583 * (x + 0.044715 * (x * x * x));
  return (0.5 * x) * (1.0 + mn_tanh(u));
}
`;case"gelu_exp2_approx":return`float mn_fast_exp2(float x_in) {
  float x = x_in;
  if (!(x > -126.0)) x = -126.0;
  if (x > 126.0) x = 126.0;
  float f = floor(x);
  float r = x - f;
  float p = 0.000216128448;
  p = p * r + 0.00124678648;
  p = p * r + 0.0096754498;
  p = p * r + 0.0554852814;
  p = p * r + 0.240229305;
  p = p * r + 0.693147044;
  p = p * r + 1.0;
  float scale = uintBitsToFloat(uint((int(f) + 127) << 23));
  return p * scale;
}
float act(float x) {
  float u = x + 0.044715 * x * x * x;
  return x / (1.0 + mn_fast_exp2(-2.302208198144325 * u));
}
`;case"relu":return`float act(float x) { return max(x, 0.0); }
`;case"elu":return`float act(float x) { return x > 0.0 ? x : (exp(x) - 1.0); }
`;default:throw new Error(`webgl2 kernels: unknown activation '${n}'. Add it here deliberately -- do NOT fall back to a default; brainchopC records that silently substituting a GELU flavour ran the wrong function on four backends without erroring.`)}}const Bc=`vec4 act4(vec4 v) { return vec4(act(v.x), act(v.y), act(v.z), act(v.w)); }
`;function RH(n){const t=n.planes,e=n.norm==="none";return Us(n)+`uniform highp sampler3D src;
`+oa+`uniform int uZ;
uniform int uDil;
uniform int uWQ0;
`+(e?`uniform int uBiasQ;
`+Pc(n.activation)+Bc:"")+_c(t,"o")+`void main() {
  ivec3 p = ivec3(int(gl_FragCoord.x), int(gl_FragCoord.y), uZ);
`+Lc(t,"a")+`  int tap = 0;
  for (int dz = -1; dz <= 1; ++dz) {
  for (int dy = -1; dy <= 1; ++dy) {
  for (int dx = -1; dx <= 1; ++dx) {
    ivec3 s = p + ivec3(dx, dy, dz) * uDil;
    bool ok = all(greaterThanEqual(s, ivec3(0))) &&
              s.x < NX && s.y < NY && s.z < NZ;
    float v = texelFetch(src, clamp(s, ivec3(0), ivec3(NX - 1, NY - 1, NZ - 1)), 0).r *
              (ok ? 1.0 : 0.0);
    int w = uWQ0 + tap * P;
`+xe(t,s=>`    a${s} += wf(w + ${s}) * v;
`)+`    ++tap;
  }}}
`+(e?xe(t,s=>`  a${s} = act4(a${s} + wf(uBiasQ + ${s}));
`):"")+Mc(t,"o","a")+`}
`}function AH(n){const t=n.planes,e=n.norm==="none",s=o=>`  { for (int i = 0; i < 4; ++i) {
      float v = q${o}[i];
      int w = b + (${o*4} + i) * P;
`+xe(t,r=>`      a${r} += wf(w + ${r}) * v;
`)+`    } }
`;return Us(n)+Oc(t)+oa+`uniform int uZ;
uniform int uDil;
uniform int uWQ0;
`+(e?`uniform int uBiasQ;
`+Pc(n.activation)+Bc:"")+_c(t,"o")+`void main() {
  ivec3 p = ivec3(int(gl_FragCoord.x), int(gl_FragCoord.y), uZ);
`+Lc(t,"a")+`  int tap = 0;
  for (int dz = -1; dz <= 1; ++dz) {
  for (int dy = -1; dy <= 1; ++dy) {
  for (int dx = -1; dx <= 1; ++dx) {
    ivec3 s = p + ivec3(dx, dy, dz) * uDil;
    float m = (all(greaterThanEqual(s, ivec3(0))) &&
               s.x < NX && s.y < NY && s.z < NZ) ? 1.0 : 0.0;
    ivec3 sc = clamp(s, ivec3(0), ivec3(NX - 1, NY - 1, NZ - 1));
`+xe(t,o=>`    vec4 q${o} = texelFetch(s${o}, sc, 0) * m;
`)+`    int b = uWQ0 + tap * CS * P;
`+xe(t,s)+`    ++tap;
  }}}
`+(e?xe(t,o=>`  a${o} = act4(a${o} + wf(uBiasQ + ${o}));
`):"")+Mc(t,"o","a")+`}
`}function DH(n){const t=n.planes,e=n.norm==="none",s=o=>`  { for (int i = 0; i < 4; ++i) {
      float v = q${o}[i];
      float u = r${o}[i];
      int w = b + (${o*4} + i) * P;
`+xe(t,r=>`      vec4 W${r} = wf(w + ${r}); a${r} += W${r} * v; b${r} += W${r} * u;
`)+`    } }
`;return Us(n)+Oc(t)+oa+`uniform int uZ;
uniform int uDil;
uniform int uWQ0;
`+(e?`uniform int uBiasQ;
`+Pc(n.activation)+Bc:"")+_c(t,"o")+xe(t,o=>`layout(location = ${t+o}) out vec4 n${o};
`)+`void main() {
  int x = int(gl_FragCoord.x);
  int y = int(gl_FragCoord.y);
`+Lc(t,"a")+Lc(t,"b")+`  int tap = 0;
  for (int dz = -1; dz <= 1; ++dz) {
  for (int dy = -1; dy <= 1; ++dy) {
  for (int dx = -1; dx <= 1; ++dx) {
    int sx = x + dx * uDil;
    int sy = y + dy * uDil;
    int za = uZ + dz * uDil;
    int zb = za + 1;
    bool okxy = sx >= 0 && sx < NX && sy >= 0 && sy < NY;
    float ma = (okxy && za >= 0 && za < NZ) ? 1.0 : 0.0;
    float mb = (okxy && zb >= 0 && zb < NZ) ? 1.0 : 0.0;
    int cx = clamp(sx, 0, NX - 1);
    int cy = clamp(sy, 0, NY - 1);
    ivec3 ca = ivec3(cx, cy, clamp(za, 0, NZ - 1));
    ivec3 cb = ivec3(cx, cy, clamp(zb, 0, NZ - 1));
`+xe(t,o=>`    vec4 q${o} = texelFetch(s${o}, ca, 0) * ma;
`)+xe(t,o=>`    vec4 r${o} = texelFetch(s${o}, cb, 0) * mb;
`)+`    int b = uWQ0 + tap * CS * P;
`+xe(t,s)+`    ++tap;
  }}}
`+(e?xe(t,o=>`  a${o} = act4(a${o} + wf(uBiasQ + ${o}));
  b${o} = act4(b${o} + wf(uBiasQ + ${o}));
`):"")+Mc(t,"o","a")+Mc(t,"n","b")+`}
`}const FH=n=>Us(n)+`uniform highp sampler3D src;
uniform int uRowBase;
layout(location = 0) out vec4 oSum;
layout(location = 1) out vec4 oSq;
void main() {
  int x = int(gl_FragCoord.x);
  int y = int(gl_FragCoord.y) - uRowBase;
  vec4 s = vec4(0.0), q = vec4(0.0);
  for (int z = 0; z < NZ; ++z) {
    vec4 v = texelFetch(src, ivec3(x, y, z), 0);
    s += v;
    q += v * v;
  }
  oSum = s; oSq = q;
}
`,_H=n=>Us(n)+`uniform highp sampler2D pSum, pSq;
layout(location = 0) out vec4 oSum;
layout(location = 1) out vec4 oSq;
void main() {
  int x = int(gl_FragCoord.x);
  int g = int(gl_FragCoord.y);
  vec4 s = vec4(0.0), q = vec4(0.0);
  for (int y = 0; y < NY; ++y) {
    s += texelFetch(pSum, ivec2(x, g * NY + y), 0);
    q += texelFetch(pSq,  ivec2(x, g * NY + y), 0);
  }
  oSum = s; oSq = q;
}
`,OH=n=>Us(n)+`uniform highp sampler2D pSum, pSq;
layout(location = 0) out vec4 oMean;
layout(location = 1) out vec4 oInv;
void main() {
  int g = int(gl_FragCoord.y);
  vec4 s = vec4(0.0), q = vec4(0.0);
  for (int x = 0; x < NX; ++x) {
    s += texelFetch(pSum, ivec2(x, g), 0);
    q += texelFetch(pSq,  ivec2(x, g), 0);
  }
  float n = float(NX) * float(NY) * float(NZ);
  vec4 mean = s / n;
  vec4 varr = max(q / n - mean * mean, vec4(0.0));
  oMean = mean;
  oInv = inversesqrt(varr + EPS);
}
`;function LH(n){const t=n.planes,e=s=>`  vec4 v${s} = (texelFetch(s${s}, p, 0) - texelFetch(pMean, ivec2(0, ${s}), 0))
              * texelFetch(pInv, ivec2(0, ${s}), 0);
`+(n.affine?`  v${s} = v${s} * wf(uAffQ + ${s}) + wf(uBiasQ + ${s});
`:"");return Us(n)+Oc(t)+`uniform highp sampler2D pMean, pInv;
`+oa+(n.affine?`uniform int uAffQ;
uniform int uBiasQ;
`:"")+`uniform int uZ;
`+Pc(n.activation)+Bc+_c(t,"o")+`void main() {
  ivec3 p = ivec3(int(gl_FragCoord.x), int(gl_FragCoord.y), uZ);
`+xe(t,e)+xe(t,s=>`  o${s} = act4(v${s});
`)+`}
`}function MH(n){const t=n.planes,e=xe(t,s=>s===0?`      float sv = c0[c];
`:`      if (c >= ${s*4}) sv = c${s}[c - ${s*4}];
`);return Us(n)+Oc(t)+oa+`uniform int uWCls;
uniform int uWBias;
uniform int uHasBias;
out vec4 outColor;
void main() {
  int t = int(gl_FragCoord.y) * ${Ws} + int(gl_FragCoord.x);
  vec4 lab = vec4(0.0);
  for (int j = 0; j < 4; ++j) {
    int v = t * 4 + j;
    if (v >= NX * NY * NZ) break;
    ivec3 p = ivec3(v % NX, (v / NX) % NY, v / (NX * NY));
`+xe(t,s=>`    vec4 c${s} = texelFetch(s${s}, p, 0);
`)+`    float bestv = -3.0e38;
    int best = 0;
    for (int k = 0; k < NCLASS; ++k) {
      float acc = uHasBias != 0 ? ws(uWBias + k) : 0.0;
      for (int c = 0; c < CHAN; ++c) {
`+e+`        acc += sv * ws(uWCls + c * NCLASS + k);
      }
      if (acc > bestv) { bestv = acc; best = k; }
    }
    lab[j] = float(best) / 255.0;
  }
  outColor = lab;
}
`}function PH(n,t=8){if(n.planes>t)throw new Error(`${n.chan} channels need ${n.planes} draw buffers; this device has ${t}. This model cannot run on the native WebGL2 path here -- fall back to the tfjs channel-list path.`);const e={vertex:EH,convFirst:RH(n),convHidden:AH(n),classify:n.nclass>0?MH(n):null};return n.norm==="gn"&&n.planes*2<=t&&(e.convHiddenVox2=DH(n)),n.norm==="gn"&&(e.momentsA=FH(n),e.momentsB=_H(n),e.momentsFinish=OH(n),e.norm=LH(n)),e}function BH(n,t,e=null){var c;const s=[],[o,r,i]=t;let a=e,l=null;try{if(!a){if(typeof OffscreenCanvas=="undefined")return{supported:!1,reasons:["OffscreenCanvas is unavailable in this context"]};l=new OffscreenCanvas(1,1),a=l.getContext("webgl2",{antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"})}if(!a)return{supported:!1,reasons:["no webgl2 context could be created"]};a.getExtension("EXT_color_buffer_float")||s.push("EXT_color_buffer_float is not available (no renderable float textures)");const h=a.getParameter(a.MAX_3D_TEXTURE_SIZE),d=a.getParameter(a.MAX_TEXTURE_SIZE),p=a.getParameter(a.MAX_DRAW_BUFFERS),f=a.getParameter(a.MAX_COLOR_ATTACHMENTS),m=Math.max(o,r,i);h<m&&s.push(`MAX_3D_TEXTURE_SIZE is ${h}, this volume needs ${m}`),p<n.planes&&s.push(`MAX_DRAW_BUFFERS is ${p}, ${n.chan} channels need ${n.planes}`),f<n.planes&&s.push(`MAX_COLOR_ATTACHMENTS is ${f}, ${n.chan} channels need ${n.planes}`),d<Ws&&s.push(`MAX_TEXTURE_SIZE is ${d}, the label texture needs ${Ws}`);let g=!1;const x=[];if(!s.length){for(;a.getError()!==a.NO_ERROR;);g=!0;for(let w=0;w<2*n.planes&&g;w++){const y=a.createTexture();x.push(y),a.bindTexture(a.TEXTURE_3D,y),a.texStorage3D(a.TEXTURE_3D,1,a.RGBA16F,o,r,i),(a.getError()!==a.NO_ERROR||a.isContextLost())&&(g=!1)}for(const w of x)a.deleteTexture(w);if(!g){const w=Math.round(2*n.planes*o*r*i*8/1048576);s.push(`could not allocate this model's ${w} MB activation working set (${2*n.planes} x RGBA16F ${o}x${r}x${i} 3D textures)`)}}const b=2*n.planes*o*r*i*8;return{supported:s.length===0,reasons:s,vox2:p>=2*n.planes&&f>=2*n.planes,renderer:zH(a),limits:{max3d:h,maxTex:d,maxDraw:p,maxAttach:f},activationBytes:b,allocates:g}}catch(u){return{supported:!1,reasons:[`probe threw: ${u.message}`]}}finally{l&&a&&((c=a.getExtension("WEBGL_lose_context"))==null||c.loseContext())}}function zH(n){const t=n.getExtension("WEBGL_debug_renderer_info");return t?n.getParameter(t.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER)}function Jy(n,t,e,s){const o=n.createShader(t);if(n.shaderSource(o,e),n.compileShader(o),!n.getShaderParameter(o,n.COMPILE_STATUS)){const r=n.getShaderInfoLog(o);throw n.deleteShader(o),new Error(`${s}: shader compile failed: ${r}`)}return o}function VH(n,t,e,s){const o=Jy(n,n.VERTEX_SHADER,t,`${s}/vs`),r=Jy(n,n.FRAGMENT_SHADER,e,`${s}/fs`),i=n.createProgram();if(n.attachShader(i,o),n.attachShader(i,r),n.linkProgram(i),n.deleteShader(o),n.deleteShader(r),!n.getProgramParameter(i,n.LINK_STATUS)){const a=n.getProgramInfoLog(i);throw n.deleteProgram(i),new Error(`${s}: program link failed: ${a}`)}return i}function Ip(n,t,e,s,o){const r=n.createTexture();return n.bindTexture(n.TEXTURE_3D,r),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),n.texStorage3D(n.TEXTURE_3D,1,o,t,e,s),r}function Gs(n,t,e,s){const o=n.createTexture();return n.bindTexture(n.TEXTURE_2D,o),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texStorage2D(n.TEXTURE_2D,1,s,t,e),o}const zc=(n,t)=>n.COLOR_ATTACHMENT0+t;function vp(n,t,e,s){const o=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,o);const r=[];for(let a=0;a<s;a++){const l=t[a%t.length],c=e+Math.floor(a/t.length);n.framebufferTextureLayer(n.FRAMEBUFFER,zc(n,a),l,0,c),r.push(zc(n,a))}n.drawBuffers(r);const i=n.checkFramebufferStatus(n.FRAMEBUFFER);if(i!==n.FRAMEBUFFER_COMPLETE)throw new Error(`framebuffer for z=${e} incomplete: 0x${i.toString(16)}`);for(;n.getError()!==n.NO_ERROR;);return o}function Vc(n,t){const e=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,e);const s=t.map((r,i)=>(n.framebufferTexture2D(n.FRAMEBUFFER,zc(n,i),n.TEXTURE_2D,r,0),zc(n,i)));n.drawBuffers(s);const o=n.checkFramebufferStatus(n.FRAMEBUFFER);if(o!==n.FRAMEBUFFER_COMPLETE)throw new Error(`2D framebuffer incomplete: 0x${o.toString(16)}`);for(;n.getError()!==n.NO_ERROR;);return e}function WH(n,t){n.bindFramebuffer(n.READ_FRAMEBUFFER,t);const e=new Uint8Array(4);n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,e)}function UH(n,t,e,s){try{const o=Math.min(8,e,s),r=new Float32Array(o*o*4);for(n.bindFramebuffer(n.READ_FRAMEBUFFER,t),n.readBuffer(n.COLOR_ATTACHMENT0);n.getError()!==n.NO_ERROR;);const i=Math.max(0,Math.floor(e/2)-o),a=Math.max(0,Math.floor(s/2)-o);if(n.readPixels(i,a,o,o,n.RGBA,n.FLOAT,r),n.getError()!==n.NO_ERROR)return null;let l=0,c=0,u=0,h=1/0,d=-1/0;for(let p=0;p<r.length;p++){const f=r[p];if(Number.isNaN(f)){l++;continue}if(!Number.isFinite(f)){c++;continue}f!==0&&u++,f<h&&(h=f),f>d&&(d=f)}return{nan:l,inf:c,nonZero:u,total:r.length,min:h,max:d}}catch(o){return null}}function In(n,t){if(n.isContextLost())throw new Error(`the WebGL context was lost at ${t} (most likely the activation set did not fit)`);const e=n.getError();if(e!==n.NO_ERROR)throw new Error(`GL error 0x${e.toString(16)} at ${t}`)}function GH(n){var m,g,x,b;const t=n.descriptor,{nx:e,ny:s,nz:o,planes:r,cs:i}=t,a=e*s*o,l=(typeof performance!="undefined"?performance:Date).now();if(n.input.length!==a)throw new Error(`input has ${n.input.length} voxels, descriptor says ${a}`);let c=null,u=n.gl||null;const h={textures:[],fbos:[],programs:[]},d=w=>(h.textures.push(w),w),p=w=>(h.fbos.push(w),w),f=w=>(h.programs.push(w),w);try{if(!u){if(c=new OffscreenCanvas(1,1),u=c.getContext("webgl2",{antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"}),!u)throw new Error("no webgl2 context");(m=c.addEventListener)==null||m.call(c,"webglcontextlost",ot=>{var Ct,Bt;(Ct=ot.preventDefault)==null||Ct.call(ot),(Bt=n.onLog)==null||Bt.call(n,"[webgl2] webglcontextlost fired (the run has already been aborted by isContextLost)")})}if(!u.getExtension("EXT_color_buffer_float"))throw new Error("EXT_color_buffer_float unavailable; float textures are not renderable here");const w=Math.min(u.getParameter(u.MAX_DRAW_BUFFERS),u.getParameter(u.MAX_COLOR_ATTACHMENTS));if(w<r)throw new Error(`need ${r} draw buffers, device has ${w}`);const y=!!n.vox2&&w>=2*r&&o>=2&&o%2===0&&t.norm==="gn";u.disable(u.DEPTH_TEST),u.disable(u.BLEND),u.disable(u.SCISSOR_TEST),u.bindVertexArray(u.createVertexArray());const $=d(Ip(u,e,s,o,u.R16F));u.bindTexture(u.TEXTURE_3D,$),u.texSubImage3D(u.TEXTURE_3D,0,0,0,0,e,s,o,u.RED,u.FLOAT,n.input),In(u,"input upload");const I=[],v=[];for(let ot=0;ot<r;ot++)I.push(d(Ip(u,e,s,o,u.RGBA16F)));for(let ot=0;ot<r;ot++)v.push(d(Ip(u,e,s,o,u.RGBA16F)));In(u,"activation allocation");const T=Math.ceil(n.packed.length/4),S=Math.ceil(T/Fc);if(S>u.getParameter(u.MAX_TEXTURE_SIZE))throw new Error(`weight texture needs ${S} rows, MAX_TEXTURE_SIZE is ${u.getParameter(u.MAX_TEXTURE_SIZE)}`);const N=d(Gs(u,Fc,S,u.RGBA16F)),C=new Float32Array(Fc*S*4);C.set(n.packed),u.bindTexture(u.TEXTURE_2D,N),u.texSubImage2D(u.TEXTURE_2D,0,0,0,Fc,S,u.RGBA,u.FLOAT,C),In(u,"weight upload");let E=null,R=null,D=null,F=null,O=null,P=null,B=null,H=null,G=null;t.norm==="gn"&&(E=d(Gs(u,e,s*r,u.RGBA32F)),R=d(Gs(u,e,s*r,u.RGBA32F)),D=d(Gs(u,e,r,u.RGBA32F)),F=d(Gs(u,e,r,u.RGBA32F)),O=d(Gs(u,1,r,u.RGBA32F)),P=d(Gs(u,1,r,u.RGBA32F)),B=p(Vc(u,[E,R])),H=p(Vc(u,[D,F])),G=p(Vc(u,[O,P])));const K=Math.ceil(a/4),j=Math.ceil(K/Ws),Y=d(Gs(u,Ws,j,u.RGBA8)),nt=p(Vc(u,[Y]));In(u,"aux textures");const et=[],at=[],ht=[];for(let ot=0;ot<o;ot++)et.push(p(vp(u,I,ot,r))),at.push(p(vp(u,v,ot,r)));if(y)for(let ot=0;ot+1<o;ot+=2)ht.push(p(vp(u,v,ot,2*r)));In(u,"framebuffer creation");const mt=PH(t,w),tt={},xt=(ot,Ct,Bt)=>{mt[Ct]&&(tt[ot]=f(VH(u,mt.vertex,mt[Ct],Bt)))};xt("convFirst","convFirst","conv_first"),xt("convHidden","convHidden","conv_hidden"),y&&xt("convHidden2","convHiddenVox2","conv_hidden_vox2"),t.norm==="gn"&&(xt("momentsA","momentsA","moments_a"),xt("momentsB","momentsB","moments_b"),xt("momentsF","momentsFinish","moments_finish"),xt("norm","norm","norm")),t.nclass>0&&xt("classify","classify","classify"),In(u,"program link");const lt=(ot,Ct)=>u.getUniformLocation(ot,Ct),Dt=Array.from({length:r},(ot,Ct)=>`s${Ct}`);u.useProgram(tt.convFirst),u.uniform1i(lt(tt.convFirst,"src"),0),u.uniform1i(lt(tt.convFirst,"wts"),1);for(const ot of[tt.convHidden,tt.convHidden2].filter(Boolean))u.useProgram(ot),Dt.forEach((Ct,Bt)=>u.uniform1i(lt(ot,Ct),Bt)),u.uniform1i(lt(ot,"wts"),r);tt.norm&&(u.useProgram(tt.norm),Dt.forEach((ot,Ct)=>u.uniform1i(lt(tt.norm,ot),Ct)),u.uniform1i(lt(tt.norm,"pMean"),r),u.uniform1i(lt(tt.norm,"pInv"),r+1),u.uniform1i(lt(tt.norm,"wts"),r+2)),tt.momentsA&&(u.useProgram(tt.momentsA),u.uniform1i(lt(tt.momentsA,"src"),0)),tt.momentsB&&(u.useProgram(tt.momentsB),u.uniform1i(lt(tt.momentsB,"pSum"),0),u.uniform1i(lt(tt.momentsB,"pSq"),1)),tt.momentsF&&(u.useProgram(tt.momentsF),u.uniform1i(lt(tt.momentsF,"pSum"),0),u.uniform1i(lt(tt.momentsF,"pSq"),1)),tt.classify&&(u.useProgram(tt.classify),Dt.forEach((ot,Ct)=>u.uniform1i(lt(tt.classify,ot),Ct)),u.uniform1i(lt(tt.classify,"wts"),r)),In(u,"uniform setup");const _t=(ot,Ct)=>{u.activeTexture(u.TEXTURE0+ot),u.bindTexture(u.TEXTURE_3D,Ct)},Ft=(ot,Ct)=>{u.activeTexture(u.TEXTURE0+ot),u.bindTexture(u.TEXTURE_2D,Ct)},St=()=>u.drawArrays(u.TRIANGLES,0,3);let Nt=I,zt=v,Ot=et,Ue=at;const Kt=n.offsets.layers,vn=t.dilations.length,Ge=ot=>{var Ct;return(Ct=n.onProgress)==null?void 0:Ct.call(n,(ot+1)/(vn+1),`Layer ${ot+1}/${vn}`)};{const ot=tt.convFirst;u.useProgram(ot),u.viewport(0,0,e,s),_t(0,$),Ft(1,N),u.uniform1i(lt(ot,"uDil"),t.dilations[0]),u.uniform1i(lt(ot,"uWQ0"),Kt[0].wq),Kt[0].biasQ!==void 0&&u.uniform1i(lt(ot,"uBiasQ"),Kt[0].biasQ);const Ct=lt(ot,"uZ");for(let Bt=0;Bt<o;Bt++)u.bindFramebuffer(u.FRAMEBUFFER,Ue[Bt]),u.uniform1i(Ct,Bt),St();In(u,"conv_first")}const ss=(ot,Ct,Bt)=>{u.useProgram(tt.momentsA),u.bindFramebuffer(u.FRAMEBUFFER,B);const Hs=lt(tt.momentsA,"uRowBase");for(let be=0;be<r;be++)_t(0,ot[be]),u.uniform1i(Hs,be*s),u.viewport(0,be*s,e,s),St();u.useProgram(tt.momentsB),u.bindFramebuffer(u.FRAMEBUFFER,H),Ft(0,E),Ft(1,R),u.viewport(0,0,e,r),St(),u.useProgram(tt.momentsF),u.bindFramebuffer(u.FRAMEBUFFER,G),Ft(0,D),Ft(1,F),u.viewport(0,0,1,r),St();const te=tt.norm;u.useProgram(te);for(let be=0;be<r;be++)_t(be,ot[be]);Ft(r,O),Ft(r+1,P),Ft(r+2,N),t.affine&&(u.uniform1i(lt(te,"uAffQ"),Kt[Bt].affQ),u.uniform1i(lt(te,"uBiasQ"),Kt[Bt].affBiasQ)),u.viewport(0,0,e,s);const kp=lt(te,"uZ");for(let be=0;be<o;be++)u.bindFramebuffer(u.FRAMEBUFFER,Ct[be]),u.uniform1i(kp,be),St();In(u,`norm layer ${Bt}`)};t.norm==="gn"?ss(zt,Ot,0):([Nt,zt]=[zt,Nt],[Ot,Ue]=[Ue,Ot]),Ge(0);const ae=UH(u,Ot[o>>1],e,s);if(ae){const ot=`min=${ae.min.toPrecision(4)} max=${ae.max.toPrecision(4)} nonzero=${ae.nonZero}/${ae.total} nan=${ae.nan} inf=${ae.inf}`;if(ae.nan||ae.inf)throw new Error(`layer 1 activations are not finite (${ot}). The usual cause is the activation flavour: an unclamped tanh overflows to Inf/Inf = NaN. Check descriptor.activation ('${t.activation}').`);if(ae.nonZero===0)throw new Error(`layer 1 activations are all zero at the volume centre (${ot}). Suspect the input upload, the weight packing, or a wrong dilation.`);(g=n.onLog)==null||g.call(n,`[webgl2] layer 1 sample: ${ot}`)}for(let ot=1;ot<vn;ot++){const Ct=y&&!!tt.convHidden2,Bt=Ct?tt.convHidden2:tt.convHidden;u.useProgram(Bt),u.viewport(0,0,e,s);for(let te=0;te<r;te++)_t(te,Nt[te]);Ft(r,N),u.uniform1i(lt(Bt,"uDil"),t.dilations[ot]),u.uniform1i(lt(Bt,"uWQ0"),Kt[ot].wq),Kt[ot].biasQ!==void 0&&u.uniform1i(lt(Bt,"uBiasQ"),Kt[ot].biasQ);const Hs=lt(Bt,"uZ");if(Ct)for(let te=0;te<ht.length;te++)u.bindFramebuffer(u.FRAMEBUFFER,ht[te]),u.uniform1i(Hs,te*2),St();else for(let te=0;te<o;te++)u.bindFramebuffer(u.FRAMEBUFFER,Ue[te]),u.uniform1i(Hs,te),St();In(u,`conv layer ${ot}`),t.norm==="gn"?ss(zt,Ot,ot):([Nt,zt]=[zt,Nt],[Ot,Ue]=[Ue,Ot]),ot%8===0&&WH(u,nt),Ge(ot)}let kn;if(t.nclass>0){const ot=tt.classify;u.useProgram(ot);for(let Bt=0;Bt<r;Bt++)_t(Bt,Nt[Bt]);Ft(r,N),u.uniform1i(lt(ot,"uWCls"),n.offsets.clsFloat),u.uniform1i(lt(ot,"uWBias"),Math.max(n.offsets.clsBiasFloat,0)),u.uniform1i(lt(ot,"uHasBias"),n.offsets.clsBiasFloat>=0?1:0),u.bindFramebuffer(u.FRAMEBUFFER,nt),u.viewport(0,0,Ws,j),St(),In(u,"classify");const Ct=new Uint8Array(Ws*j*4);u.bindFramebuffer(u.READ_FRAMEBUFFER,nt),u.readPixels(0,0,Ws,j,u.RGBA,u.UNSIGNED_BYTE,Ct),In(u,"readback"),kn=Ct.subarray(0,a)}else throw new Error("descriptor has no classifier; a raw-activation readback path is not implemented");const os=(typeof performance!="undefined"?performance:Date).now()-l;return{labels:kn,ms:os,path:`webgl2-native P=${r}${y?" vox2":""} ${e}x${s}x${o}`}}finally{if(u){for(const w of h.fbos)u.deleteFramebuffer(w);for(const w of h.textures)u.deleteTexture(w);for(const w of h.programs)u.deleteProgram(w);c&&((x=n.onLog)==null||x.call(n,'[webgl2] releasing our own GL context (the "context was lost" notice below is expected)'),(b=u.getExtension("WEBGL_lose_context"))==null||b.loseContext())}}}function Eo(n="",t=-1,e="",s=[]){let o=[];s&&Object.keys(s).length>0&&(o=JSON.stringify(Wc({},s))),self.postMessage({cmd:"ui",message:n,progressFrac:t,modalMessage:e,statData:o})}function HH(n,t,e){self.postMessage({cmd:"img",img:n,opts:t,modelEntry:e})}function fr(n){self.postMessage({cmd:"unsupported",reason:n})}function qH(n,t,e,s){return Q(this,null,function*(){const o=CH(t);if(!o){fr(`no native WebGL2 descriptor for ${t.path} (needs a webgl2_runners/descriptors.js entry and a model.safetensors)`);return}if(!o.fullVolume){fr(`${o.name} needs cropping on this path, which is not implemented yet`);return}const r=Qy(t,Zy.WEBGL_WEBWORKER);r.TF_Backend="webgl2-native",Eo("Segmentation started",0);const i=256,a=[i,i,i];Eo("Loading weights...",.05);const l=`${n.rootURL}${t.webgpu_safetensor.replace(/^\.\//,"/")}`,c=yield fetch(l);if(!c.ok){fr(`could not fetch ${l}: ${c.status}`);return}const u=yield c.arrayBuffer(),h=IH(u),d=vH(h),p=SH(d,{nx:i,ny:i,nz:i,activation:o.activation,dilations:o.dilations}),f=BH(p,a);if(console.log(`[webgl2-native] ${o.name}: ${p.chan}ch P=${p.planes} ${p.nclass}cls norm=${p.norm} affine=${p.affine} act=${p.activation} | ${Math.round(f.activationBytes/1048576)} MB activations | ${f.renderer}`),!f.supported){fr(f.reasons.join("; "));return}const m=kH(d,p);Eo("Preparing input data...",.1),yield Af("webgl"),U().set("WEBGL_DELETE_TEXTURE_THRESHOLD",0);let g,x;{let C=gl(s,a,"float32");const E=t.enableQuantileNorm?yield fH(C):yield pH(C);if(C.dispose(),C=E,t.inputPermutation){const R=C.transpose(t.inputPermutation);C.dispose(),C=R}else if(t.enableTranspose){const R=C.transpose();C.dispose(),C=R}x=C.shape,g=new Float32Array(yield C.data()),C.dispose()}rn().disposeVariables(),rn().reset(),Eo("Running inference...",.2);const b=performance.now(),w=GH({descriptor:p,packed:m.data,offsets:m.offsets,input:g,vox2:f.vox2,onProgress:(C,E)=>Eo(E,.2+.7*C),onLog:C=>console.log(C)}),y=((performance.now()-b)/1e3).toFixed(4);console.log(`[webgl2-native] ---- Inference Time: ${y} s ---- (${w.path})`),yield Af("webgl");let $=W(()=>{let C=gl(new Int32Array(w.labels),x,"int32");return t.outputPermutation?C=C.transpose(t.outputPermutation):t.enableTranspose&&(C=C.transpose()),C});if(W(()=>pt($).dataSync()[0])===0){$.dispose(),fr("native WebGL2 produced an all-zero volume");return}const v=performance.now(),T=yield mH($,s,t,n),S=((performance.now()-v)/1e3).toFixed(4);$.dispose(),rn().disposeVariables();const N=new Set(T);gH(r,t.numClasses||N.size,N.size),xH(r,y,S),Eo(t.modelName+"<br>Segmentation finished",0),Eo("",-1,"",r),HH(T,n,t)})}self.addEventListener("message",n=>Q(null,null,function*(){const{opts:t,modelEntry:e,niftiHeader:s,niftiImage:o}=n.data;try{yield qH(t,e,s,o)}catch(r){console.error("[webgl2-native] failed",r);try{const i=Qy(e,"webgl2-native");bH(i,r,"native WebGL2 runner")}catch(i){}fr((r==null?void 0:r.message)||String(r))}}))})();
