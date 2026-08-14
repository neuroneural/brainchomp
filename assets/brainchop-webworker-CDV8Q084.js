var XH=Object.defineProperty,YH=Object.defineProperties;var ZH=Object.getOwnPropertyDescriptors;var Jy=Object.getOwnPropertySymbols;var JH=Object.prototype.hasOwnProperty,QH=Object.prototype.propertyIsEnumerable;var yp=Math.pow,Qy=(tn,Ot,Tt)=>Ot in tn?XH(tn,Ot,{enumerable:!0,configurable:!0,writable:!0,value:Tt}):tn[Ot]=Tt,ew=(tn,Ot)=>{for(var Tt in Ot||(Ot={}))JH.call(Ot,Tt)&&Qy(tn,Tt,Ot[Tt]);if(Jy)for(var Tt of Jy(Ot))QH.call(Ot,Tt)&&Qy(tn,Tt,Ot[Tt]);return tn},tw=(tn,Ot)=>YH(tn,ZH(Ot));var X=(tn,Ot,Tt)=>new Promise((ta,ko)=>{var Lt=wn=>{try{zs(Tt.next(wn))}catch(Fn){ko(Fn)}},Oc=wn=>{try{zs(Tt.throw(wn))}catch(Fn){ko(Fn)}},zs=wn=>wn.done?ta(wn.value):Promise.resolve(wn.value).then(Lt,Oc);zs((Tt=Tt.apply(tn,Ot)).next())});(function(){"use strict";function tn(n,e){return e.forEach(function(t){t&&typeof t!="string"&&!Array.isArray(t)&&Object.keys(t).forEach(function(s){if(s!=="default"&&!(s in n)){var o=Object.getOwnPropertyDescriptor(t,s);Object.defineProperty(n,s,o.get?o:{enumerable:!0,get:function(){return t[s]}})}})}),Object.freeze(n)}const Ot=1e-7,Tt=1e-4;class ta{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}}class ko{refCount(e){return Lt("refCount")}incRef(e){return Lt("incRef")}timerAvailable(){return!0}time(e){return Lt("time")}read(e){return Lt("read")}readSync(e){return Lt("readSync")}readToGPU(e,t){return Lt("readToGPU")}numDataIds(){return Lt("numDataIds")}disposeData(e,t){return Lt("disposeData")}write(e,t,s){return Lt("write")}move(e,t,s,o,r){return Lt("move")}createTensorFromGPUData(e,t,s){return Lt("createTensorFromGPUData")}memory(){return Lt("memory")}floatPrecision(){return Lt("floatPrecision")}epsilon(){return this.floatPrecision()===32?Ot:Tt}dispose(){return Lt("dispose")}}function Lt(n){throw new Error(`'${n}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}function Oc(n){let e=n.length,t=0;for(;e>0;)t=Math.random()*e|0,e--,Fn(n,e,t)}function zs(n,e,t){return Math.max(n,Math.min(e,t))}function wn(n){return n%2===0?n:n+1}function Fn(n,e,t){const s=n[e];n[e]=n[t],n[t]=s}function nw(n){let e=0;for(let t=0;t<n.length;t++)e+=n[t];return e}function S(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Lc(n,e,t=""){S(_e(n,e),()=>t+` Shapes ${n} and ${e} must match`)}function wp(n){S(n!=null,()=>"The input to the tensor constructor must be a non-null value.")}function K(n){if(n.length===0)return 1;let e=n[0];for(let t=1;t<n.length;t++)e*=n[t];return e}function _e(n,e){if(n===e)return!0;if(n==null||e==null||n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function So(n){return n%1===0}function Mc(n){const e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}function No(n,e){return e<=n.length?n:n+" ".repeat(e-n.length)}function Cp(n,e=o=>0,t,s){return new Promise((o,r)=>{let i=0;const a=()=>{if(n()){o();return}i++;const l=e(i);if(t!=null&&i>=t){r();return}s!=null?s(a,l):setTimeout(a,l)};a()})}function Ip(n,e){let t=1,s=-1;for(let r=0;r<n.length;++r)if(n[r]>=0)t*=n[r];else if(n[r]===-1){if(s!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${s} and dim ${r}`);s=r}else if(n[r]<0)throw Error(`Shapes can not be < 0. Found ${n[r]} at dim ${r}`);if(s===-1){if(e>0&&e!==t)throw Error(`Size(${e}) must match the product of shape ${n}`);return n}if(t===0)throw Error(`Cannot infer the missing size in [${n}] when there are 0 elements`);if(e%t!==0)throw Error(`The implicit shape can't be a fractional number. Got ${e} / ${t}`);const o=n.slice();return o[s]=e/t,o}function ve(n,e){const t=e.length;return n=n==null?e.map((s,o)=>o):[].concat(n),S(n.every(s=>s>=-t&&s<t),()=>`All values in axis param must be in range [-${t}, ${t}) but got axis ${n}`),S(n.every(s=>So(s)),()=>`All values in axis param must be integers but got axis ${n}`),n.map(s=>s<0?t+s:s)}function ds(n,e){const t=[],s=[],o=e!=null&&Array.isArray(e)&&e.length===0,r=e==null||o?null:ve(e,n).sort();let i=0;for(let a=0;a<n.length;++a){if(r!=null){if(r[i]===a&&n[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${n[a]}' is not 1`);(r[i]==null||r[i]>a)&&n[a]===1&&(t.push(n[a]),s.push(a)),r[i]<=a&&i++}n[a]!==1&&(t.push(n[a]),s.push(a))}return{newShape:t,keptDims:s}}function Et(n,e){return et(n,e)}function et(n,e){let t=null;if(n==null||n==="float32")t=new Float32Array(e);else if(n==="int32")t=new Int32Array(e);else if(n==="bool")t=new Uint8Array(e);else if(n==="string")t=new Array(e);else throw new Error(`Unknown data type ${n}`);return t}function sw(n,e){for(let t=0;t<n.length;t++){const s=n[t];if(isNaN(s)||!isFinite(s))throw Error(`A tensor of type ${e} being uploaded contains ${s}.`)}}function ow(n){return n==="bool"||n==="complex64"||n==="float32"||n==="int32"||n==="string"}function $p(n,e){return!(e==="complex64"||e==="float32"&&n!=="complex64"||e==="int32"&&n!=="float32"&&n!=="complex64"||e==="bool"&&n==="bool")}function na(n){if(n==="float32"||n==="int32")return 4;if(n==="complex64")return 8;if(n==="bool")return 1;throw new Error(`Unknown dtype ${n}`)}function rw(n){if(n==null)return 0;let e=0;return n.forEach(t=>e+=t.length),e}function ur(n){return typeof n=="string"||n instanceof String}function iw(n){return typeof n=="boolean"}function Pc(n){return typeof n=="number"}function To(n){return Array.isArray(n)?To(n[0]):n instanceof Float32Array?"float32":n instanceof Int32Array||n instanceof Uint8Array||n instanceof Uint8ClampedArray?"int32":Pc(n)?"float32":ur(n)?"string":iw(n)?"bool":"float32"}function zc(n){return!!(n&&n.constructor&&n.call&&n.apply)}function Bc(n,e){for(let t=e;t<n;++t)if(n%t===0)return t;return n}function fe(n){const e=n.length;if(e<2)return[];const t=new Array(e-1);t[e-2]=n[e-1];for(let s=e-3;s>=0;--s)t[s]=t[s+1]*n[s+1];return t}function vp(n,e,t,s=!1){const o=new Array;if(e.length===1){const r=e[0]*(s?2:1);for(let i=0;i<r;i++)o[i]=t[n+i]}else{const r=e[0],i=e.slice(1),a=i.reduce((l,c)=>l*c)*(s?2:1);for(let l=0;l<r;l++)o[l]=vp(n+l*a,i,t,s)}return o}function Cn(n,e,t=!1){if(n.length===0)return e[0];const s=n.reduce((o,r)=>o*r)*(t?2:1);if(s===0)return[];if(s!==e.length)throw new Error(`[${n}] does not match the input size ${e.length}${t?" for a complex tensor":""}.`);return vp(0,n,e,t)}function aw(n,e){if(Array.isArray(n))return n;if(e==="float32")return n instanceof Float32Array?n:new Float32Array(n);if(e==="int32")return n instanceof Int32Array?n:new Int32Array(n);if(e==="bool"||e==="string")return Uint8Array.from(new Int32Array(n));throw new Error(`Unknown dtype ${e}`)}function Vc(n,e){const t=Rt(n,e);for(let s=0;s<t.length;s++)t[s]=1;return t}function Rt(n,e){if(e==null||e==="float32"||e==="complex64")return new Float32Array(n);if(e==="int32")return new Int32Array(n);if(e==="bool")return new Uint8Array(n);throw new Error(`Unknown data type ${e}`)}function kp(n,e){const t=n.reduce((s,o)=>s*o,1);if(e==null||e==="float32")return Cn(n,new Float32Array(t));if(e==="int32")return Cn(n,new Int32Array(t));if(e==="bool")return Cn(n,new Uint8Array(t));throw new Error(`Unknown data type ${e}`)}function Jn(n){n.forEach(e=>{S(Number.isInteger(e)&&e>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${n}].`)})}function _n(n,e,t){if(e===0)return 0;if(e===1)return n[0];let s=n[n.length-1];for(let o=0;o<n.length-1;++o)s+=t[o]*n[o];return s}function Eo(n,e,t){if(e===0)return[];if(e===1)return[n];const s=new Array(e);for(let o=0;o<s.length-1;++o)s[o]=Math.floor(n/t[o]),n-=s[o]*t[o];return s[s.length-1]=n,s}function Wc(n){return n&&n.then&&typeof n.then=="function"}const Sp="tfjsflags";class lw{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=cw,this.populateURLFlags()}setPlatform(e,t){this.platform!=null&&(U().getBool("IS_TEST")||U().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`)),this.platformName=e,this.platform=t}registerFlag(e,t,s){if(this.flagRegistry[e]={evaluationFn:t,setHook:s},this.urlFlags[e]!=null){const o=this.urlFlags[e];U().getBool("IS_TEST")||U().getBool("PROD")||console.warn(`Setting feature override from URL ${e}: ${o}.`),this.set(e,o)}}getAsync(e){return X(this,null,function*(){return e in this.flags?this.flags[e]:(this.flags[e]=yield this.evaluateFlag(e),this.flags[e])})}get(e){if(e in this.flags)return this.flags[e];const t=this.evaluateFlag(e);if(Wc(t))throw new Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(this.flagRegistry[e]==null)throw new Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(this.flagRegistry[e]==null)throw new Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global=="undefined"||typeof this.global.location=="undefined"||typeof this.global.location.search=="undefined")return;const e=this.getQueryParams(this.global.location.search);Sp in e&&e[Sp].split(",").forEach(s=>{const[o,r]=s.split(":");this.urlFlags[o]=hw(o,r)})}}function cw(n){const e={};return n.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(t,...s)=>(uw(e,s[0],s[1]),s.join("="))),e}function uw(n,e,t){n[decodeURIComponent(e)]=decodeURIComponent(t||"")}function hw(n,e){const t=e.toLowerCase();return t==="true"||t==="false"?t==="true":`${+t}`===t?+t:e}function U(){return Np}let Np=null;function dw(n){Np=n}let Uc;function Tp(){if(Uc==null){let n;if(typeof window!="undefined")n=window;else if(typeof global!="undefined")n=global;else if(typeof process!="undefined")n=process;else if(typeof self!="undefined")n=self;else throw new Error("Could not find a global object");Uc=n}return Uc}function pw(){const n=Tp();return n._tfGlobals==null&&(n._tfGlobals=new Map),n._tfGlobals}function Gc(n,e){const t=pw();if(t.has(n))return t.get(n);{const s=e();return t.set(n,s),t.get(n)}}const sa="Abs",hr="Acos",dr="Acosh",Ro="Add",Hc="AddN",qc="All",Kc="Any",oa="ArgMax",ra="ArgMin",pr="Asin",fr="Asinh",mr="Atan",gr="Atanh",xr="Atan2",ia="AvgPool",jc="AvgPoolGrad",aa="AvgPool3D",Xc="AvgPool3DGrad",la="BatchMatMul",ca="BatchToSpaceND",Yc="Bincount",Zc="BitwiseAnd",fw="BroadcastTo",Ep="BroadcastArgs",br="Cast",yr="Ceil",wr="ClipByValue",Jc="Complex",ua="ComplexAbs",ha="Concat",da="Conv2D",Qc="Conv2DBackpropFilter",pa="Conv2DBackpropInput",fa="Conv3D",eu="Conv3DBackpropFilterV2",tu="Conv3DBackpropInputV2",Cr="Cos",Ir="Cosh",nu="Cumprod",ma="Cumsum",su="CropAndResize",ou="DenseBincount",ru="DepthToSpace",ga="DepthwiseConv2dNative",iu="DepthwiseConv2dNativeBackpropFilter",au="DepthwiseConv2dNativeBackpropInput",Rp="Diag",xa="Dilation2D",lu="Dilation2DBackpropInput",cu="Dilation2DBackpropFilter",mw="Draw",$r="RealDiv",uu="Einsum",vr="Elu",hu="EluGrad",kr="Erf",ba="Equal",Sr="Exp",ya="ExpandDims",Nr="Expm1",du="FFT",pu="Fill",fu="FlipLeftRight",Tr="Floor",Er="FloorDiv",wa="FusedBatchNorm",Ca="GatherV2",Ap="GatherNd",Ia="Greater",Rr="GreaterEqual",Ar="Identity",mu="IFFT",gu="Imag",Dr="IsFinite",Fr="IsInf",_r="IsNan",$a="LeakyRelu",va="Less",ka="LessEqual",Dp="LinSpace",Or="Log",Lr="Log1p",Sa="LogicalAnd",Na="LogicalNot",Ta="LogicalOr",gw="LogSoftmax",Ea="LRN",xu="LRNGrad",Ra="Max",Mr="Maximum",Aa="MaxPool",bu="MaxPoolGrad",Da="MaxPool3D",yu="MaxPool3DGrad",Fp="MaxPoolWithArgmax",Fa="Mean",_a="Min",Pr="Minimum",Oa="MirrorPad",zr="Mod",_p="Multinomial",Br="Multiply",La="Neg",Ma="NotEqual",wu="NonMaxSuppressionV3",Cu="NonMaxSuppressionV4",Iu="NonMaxSuppressionV5",Pa="OnesLike",za="OneHot",Ba="Pack",Va="PadV2",Vr="Pow",Wa="Prelu",Ua="Prod",Op="RaggedGather",Lp="RaggedRange",Mp="RaggedTensorToTensor",$u="Range",vu="Real",Wr="Reciprocal",Ur="Relu",Ga="Reshape",Ha="ResizeNearestNeighbor",ku="ResizeNearestNeighborGrad",qa="ResizeBilinear",Su="ResizeBilinearGrad",Gr="Relu6",Ka="Reverse",Hr="Round",qr="Rsqrt",Pp="ScatterNd",zp="TensorScatterUpdate",Bp="SearchSorted",ja="Select",Kr="Selu",Xa="Slice",jr="Sin",Xr="Sinh",Yr="Sign",Zr="Sigmoid",Jr="Softplus",Qr="Sqrt",Ya="Sum",Za="SpaceToBatchND",Ja="SplitV",Qa="Softmax",Vp="SparseFillEmptyRows",Wp="SparseReshape",Up="SparseSegmentMean",Gp="SparseSegmentSum",Hp="SparseToDense",ei="SquaredDifference",Nu="Square",Tu="StaticRegexReplace",Eu="StridedSlice",qp="StringNGrams",Kp="StringSplit",jp="StringToHashBucketFast",ti="Sub",ni="Tan",si="Tanh",oi="Tile",Ru="TopK",Au="Transform",Ao="Transpose",Du="Unique",el="Unpack",tl="UnsortedSegmentSum",nl="ZerosLike",ri="Step",xw="FromPixels",Fu="RotateWithOffset",sl="_FusedMatMul",ol="FusedConv2D",Xp="FusedDepthwiseConv2D";function nn(...n){U().getBool("IS_TEST")||U().getBool("PROD")||console.warn(...n)}const rl=Gc("kernelRegistry",()=>new Map),_u=Gc("gradRegistry",()=>new Map);function Yp(n,e){const t=ef(n,e);return rl.get(t)}function Zp(n){return _u.get(n)}function Jp(n){const e=rl.entries(),t=[];for(;;){const{done:s,value:o}=e.next();if(s)break;const[r,i]=o,[a]=r.split("_");a===n&&t.push(i)}return t}function Qp(n){const{kernelName:e,backendName:t}=n,s=ef(e,t);rl.has(s)&&nn(`The kernel '${e}' for backend '${t}' is already registered`),rl.set(s,n)}function bw(n){const{kernelName:e}=n;_u.has(e)&&U().getBool("DEBUG")&&nn(`Overriding the gradient for '${e}'`),_u.set(e,n)}function ef(n,e){return`${e}_${n}`}function tf(n){return n instanceof Float32Array||n instanceof Int32Array||n instanceof Uint8Array||n instanceof Uint8ClampedArray}function yw(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function ww(n){if(Object.prototype.hasOwnProperty.call(n,"__esModule"))return n;var e=n.default;if(typeof e=="function"){var t=function s(){var o=!1;try{o=this instanceof s}catch(r){}return o?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(n).forEach(function(s){var o=Object.getOwnPropertyDescriptor(n,s);Object.defineProperty(t,s,o.get?o:{enumerable:!0,get:function(){return n[s]}})}),t}var Ou,nf;function Cw(){if(nf)return Ou;nf=1,Ou=e;var n=null;try{n=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(T){}function e(T,I,E){this.low=T|0,this.high=I|0,this.unsigned=!!E}e.prototype.__isLong__,Object.defineProperty(e.prototype,"__isLong__",{value:!0});function t(T){return(T&&T.__isLong__)===!0}e.isLong=t;var s={},o={};function r(T,I){var E,R,D;return I?(T>>>=0,(D=0<=T&&T<256)&&(R=o[T],R)?R:(E=a(T,(T|0)<0?-1:0,!0),D&&(o[T]=E),E)):(T|=0,(D=-128<=T&&T<128)&&(R=s[T],R)?R:(E=a(T,T<0?-1:0,!1),D&&(s[T]=E),E))}e.fromInt=r;function i(T,I){if(isNaN(T))return I?b:x;if(I){if(T<0)return b;if(T>=f)return v}else{if(T<=-m)return k;if(T+1>=m)return $}return T<0?i(-T,I).neg():a(T%p|0,T/p|0,I)}e.fromNumber=i;function a(T,I,E){return new e(T,I,E)}e.fromBits=a;var l=Math.pow;function c(T,I,E){if(T.length===0)throw Error("empty string");if(T==="NaN"||T==="Infinity"||T==="+Infinity"||T==="-Infinity")return x;if(typeof I=="number"?(E=I,I=!1):I=!!I,E=E||10,E<2||36<E)throw RangeError("radix");var R;if((R=T.indexOf("-"))>0)throw Error("interior hyphen");if(R===0)return c(T.substring(1),I,E).neg();for(var D=i(l(E,8)),F=x,_=0;_<T.length;_+=8){var P=Math.min(8,T.length-_),z=parseInt(T.substring(_,_+P),E);if(P<8){var H=i(l(E,P));F=F.mul(H).add(i(z))}else F=F.mul(D),F=F.add(i(z))}return F.unsigned=I,F}e.fromString=c;function u(T,I){return typeof T=="number"?i(T,I):typeof T=="string"?c(T,I):a(T.low,T.high,typeof I=="boolean"?I:T.unsigned)}e.fromValue=u;var h=65536,d=1<<24,p=h*h,f=p*p,m=f/2,g=r(d),x=r(0);e.ZERO=x;var b=r(0,!0);e.UZERO=b;var w=r(1);e.ONE=w;var y=r(1,!0);e.UONE=y;var C=r(-1);e.NEG_ONE=C;var $=a(-1,2147483647,!1);e.MAX_VALUE=$;var v=a(-1,-1,!0);e.MAX_UNSIGNED_VALUE=v;var k=a(0,-2147483648,!1);e.MIN_VALUE=k;var N=e.prototype;return N.toInt=function(){return this.unsigned?this.low>>>0:this.low},N.toNumber=function(){return this.unsigned?(this.high>>>0)*p+(this.low>>>0):this.high*p+(this.low>>>0)},N.toString=function(I){if(I=I||10,I<2||36<I)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(k)){var E=i(I),R=this.div(E),D=R.mul(E).sub(this);return R.toString(I)+D.toInt().toString(I)}else return"-"+this.neg().toString(I);for(var F=i(l(I,6),this.unsigned),_=this,P="";;){var z=_.div(F),H=_.sub(z.mul(F)).toInt()>>>0,G=H.toString(I);if(_=z,_.isZero())return G+P;for(;G.length<6;)G="0"+G;P=""+G+P}},N.getHighBits=function(){return this.high},N.getHighBitsUnsigned=function(){return this.high>>>0},N.getLowBits=function(){return this.low},N.getLowBitsUnsigned=function(){return this.low>>>0},N.getNumBitsAbs=function(){if(this.isNegative())return this.eq(k)?64:this.neg().getNumBitsAbs();for(var I=this.high!=0?this.high:this.low,E=31;E>0&&(I&1<<E)==0;E--);return this.high!=0?E+33:E+1},N.isZero=function(){return this.high===0&&this.low===0},N.eqz=N.isZero,N.isNegative=function(){return!this.unsigned&&this.high<0},N.isPositive=function(){return this.unsigned||this.high>=0},N.isOdd=function(){return(this.low&1)===1},N.isEven=function(){return(this.low&1)===0},N.equals=function(I){return t(I)||(I=u(I)),this.unsigned!==I.unsigned&&this.high>>>31===1&&I.high>>>31===1?!1:this.high===I.high&&this.low===I.low},N.eq=N.equals,N.notEquals=function(I){return!this.eq(I)},N.neq=N.notEquals,N.ne=N.notEquals,N.lessThan=function(I){return this.comp(I)<0},N.lt=N.lessThan,N.lessThanOrEqual=function(I){return this.comp(I)<=0},N.lte=N.lessThanOrEqual,N.le=N.lessThanOrEqual,N.greaterThan=function(I){return this.comp(I)>0},N.gt=N.greaterThan,N.greaterThanOrEqual=function(I){return this.comp(I)>=0},N.gte=N.greaterThanOrEqual,N.ge=N.greaterThanOrEqual,N.compare=function(I){if(t(I)||(I=u(I)),this.eq(I))return 0;var E=this.isNegative(),R=I.isNegative();return E&&!R?-1:!E&&R?1:this.unsigned?I.high>>>0>this.high>>>0||I.high===this.high&&I.low>>>0>this.low>>>0?-1:1:this.sub(I).isNegative()?-1:1},N.comp=N.compare,N.negate=function(){return!this.unsigned&&this.eq(k)?k:this.not().add(w)},N.neg=N.negate,N.add=function(I){t(I)||(I=u(I));var E=this.high>>>16,R=this.high&65535,D=this.low>>>16,F=this.low&65535,_=I.high>>>16,P=I.high&65535,z=I.low>>>16,H=I.low&65535,G=0,Z=0,J=0,Q=0;return Q+=F+H,J+=Q>>>16,Q&=65535,J+=D+z,Z+=J>>>16,J&=65535,Z+=R+P,G+=Z>>>16,Z&=65535,G+=E+_,G&=65535,a(J<<16|Q,G<<16|Z,this.unsigned)},N.subtract=function(I){return t(I)||(I=u(I)),this.add(I.neg())},N.sub=N.subtract,N.multiply=function(I){if(this.isZero())return x;if(t(I)||(I=u(I)),n){var E=n.mul(this.low,this.high,I.low,I.high);return a(E,n.get_high(),this.unsigned)}if(I.isZero())return x;if(this.eq(k))return I.isOdd()?k:x;if(I.eq(k))return this.isOdd()?k:x;if(this.isNegative())return I.isNegative()?this.neg().mul(I.neg()):this.neg().mul(I).neg();if(I.isNegative())return this.mul(I.neg()).neg();if(this.lt(g)&&I.lt(g))return i(this.toNumber()*I.toNumber(),this.unsigned);var R=this.high>>>16,D=this.high&65535,F=this.low>>>16,_=this.low&65535,P=I.high>>>16,z=I.high&65535,H=I.low>>>16,G=I.low&65535,Z=0,J=0,Q=0,j=0;return j+=_*G,Q+=j>>>16,j&=65535,Q+=F*G,J+=Q>>>16,Q&=65535,Q+=_*H,J+=Q>>>16,Q&=65535,J+=D*G,Z+=J>>>16,J&=65535,J+=F*H,Z+=J>>>16,J&=65535,J+=_*z,Z+=J>>>16,J&=65535,Z+=R*G+D*H+F*z+_*P,Z&=65535,a(Q<<16|j,Z<<16|J,this.unsigned)},N.mul=N.multiply,N.divide=function(I){if(t(I)||(I=u(I)),I.isZero())throw Error("division by zero");if(n){if(!this.unsigned&&this.high===-2147483648&&I.low===-1&&I.high===-1)return this;var E=(this.unsigned?n.div_u:n.div_s)(this.low,this.high,I.low,I.high);return a(E,n.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?b:x;var R,D,F;if(this.unsigned){if(I.unsigned||(I=I.toUnsigned()),I.gt(this))return b;if(I.gt(this.shru(1)))return y;F=b}else{if(this.eq(k)){if(I.eq(w)||I.eq(C))return k;if(I.eq(k))return w;var _=this.shr(1);return R=_.div(I).shl(1),R.eq(x)?I.isNegative()?w:C:(D=this.sub(I.mul(R)),F=R.add(D.div(I)),F)}else if(I.eq(k))return this.unsigned?b:x;if(this.isNegative())return I.isNegative()?this.neg().div(I.neg()):this.neg().div(I).neg();if(I.isNegative())return this.div(I.neg()).neg();F=x}for(D=this;D.gte(I);){R=Math.max(1,Math.floor(D.toNumber()/I.toNumber()));for(var P=Math.ceil(Math.log(R)/Math.LN2),z=P<=48?1:l(2,P-48),H=i(R),G=H.mul(I);G.isNegative()||G.gt(D);)R-=z,H=i(R,this.unsigned),G=H.mul(I);H.isZero()&&(H=w),F=F.add(H),D=D.sub(G)}return F},N.div=N.divide,N.modulo=function(I){if(t(I)||(I=u(I)),n){var E=(this.unsigned?n.rem_u:n.rem_s)(this.low,this.high,I.low,I.high);return a(E,n.get_high(),this.unsigned)}return this.sub(this.div(I).mul(I))},N.mod=N.modulo,N.rem=N.modulo,N.not=function(){return a(~this.low,~this.high,this.unsigned)},N.and=function(I){return t(I)||(I=u(I)),a(this.low&I.low,this.high&I.high,this.unsigned)},N.or=function(I){return t(I)||(I=u(I)),a(this.low|I.low,this.high|I.high,this.unsigned)},N.xor=function(I){return t(I)||(I=u(I)),a(this.low^I.low,this.high^I.high,this.unsigned)},N.shiftLeft=function(I){return t(I)&&(I=I.toInt()),(I&=63)===0?this:I<32?a(this.low<<I,this.high<<I|this.low>>>32-I,this.unsigned):a(0,this.low<<I-32,this.unsigned)},N.shl=N.shiftLeft,N.shiftRight=function(I){return t(I)&&(I=I.toInt()),(I&=63)===0?this:I<32?a(this.low>>>I|this.high<<32-I,this.high>>I,this.unsigned):a(this.high>>I-32,this.high>=0?0:-1,this.unsigned)},N.shr=N.shiftRight,N.shiftRightUnsigned=function(I){if(t(I)&&(I=I.toInt()),I&=63,I===0)return this;var E=this.high;if(I<32){var R=this.low;return a(R>>>I|E<<32-I,E>>>I,this.unsigned)}else return I===32?a(E,0,this.unsigned):a(E>>>I-32,0,this.unsigned)},N.shru=N.shiftRightUnsigned,N.shr_u=N.shiftRightUnsigned,N.toSigned=function(){return this.unsigned?a(this.low,this.high,!1):this},N.toUnsigned=function(){return this.unsigned?this:a(this.low,this.high,!0)},N.toBytes=function(I){return I?this.toBytesLE():this.toBytesBE()},N.toBytesLE=function(){var I=this.high,E=this.low;return[E&255,E>>>8&255,E>>>16&255,E>>>24,I&255,I>>>8&255,I>>>16&255,I>>>24]},N.toBytesBE=function(){var I=this.high,E=this.low;return[I>>>24,I>>>16&255,I>>>8&255,I&255,E>>>24,E>>>16&255,E>>>8&255,E&255]},e.fromBytes=function(I,E,R){return R?e.fromBytesLE(I,E):e.fromBytesBE(I,E)},e.fromBytesLE=function(I,E){return new e(I[0]|I[1]<<8|I[2]<<16|I[3]<<24,I[4]|I[5]<<8|I[6]<<16|I[7]<<24,E)},e.fromBytesBE=function(I,E){return new e(I[4]<<24|I[5]<<16|I[6]<<8|I[7],I[0]<<24|I[1]<<16|I[2]<<8|I[3],E)},Ou}var sf=Cw(),of=yw(sf),Iw=tn({__proto__:null,default:of},[sf]);const Bs=of||Iw;function il(n){return Bs.fromString(n,!0,16)}const rf=il("c3a5c85c97cb3127"),Vs=il("b492b66fbe98f273"),Mt=il("9ae16a3b2f90404f");function Lu(n){return n.xor(n.shru(47))}function af(n,e,t){const s=n.slice(e,e+t);return Bs.fromBytes(Array.from(s),!0,!0)}function Ge(n,e){return af(n,e,8)}function lf(n,e){return af(n,e,4)}function bt(n,e){return e===0?n:n.shru(e).or(n.shl(64-e))}function ps(n,e,t=il("9ddfea08eb382d69")){let s=n.xor(e).mul(t);s=s.xor(s.shru(47));let o=e.xor(s).mul(t);return o=o.xor(o.shru(47)),o=o.mul(t),o}function $w(n,e,t,s,o,r){o=o.add(n),r=bt(r.add(o).add(s),21);const i=o;return o=o.add(e),o=o.add(t),r=r.add(bt(o,44)),[o.add(s),r.add(i)]}function al(n,e,t,s){return $w(Ge(n,e),Ge(n,e+8),Ge(n,e+16),Ge(n,e+24),t,s)}function vw(n,e=n.length){if(e>=8){const t=Mt.add(e*2),s=Ge(n,0).add(Mt),o=Ge(n,e-8),r=bt(o,37).mul(t).add(s),i=bt(s,25).add(o).mul(t);return ps(r,i,t)}if(e>=4){const t=Mt.add(e*2),s=lf(n,0);return ps(s.shl(3).add(e),lf(n,e-4),t)}if(e>0){const t=n[0],s=n[e>>1],o=n[e-1],r=t+(s<<8),i=e+(o<<2);return Lu(Mt.mul(r).xor(rf.mul(i))).mul(Mt)}return Mt}function kw(n,e=n.length){const t=Mt.add(e*2),s=Ge(n,0).mul(Vs),o=Ge(n,8),r=Ge(n,e-8).mul(t),i=Ge(n,e-16).mul(Mt);return ps(bt(s.add(o),43).add(bt(r,30)).add(i),s.add(bt(o.add(Mt),18)).add(r),t)}function Sw(n,e=n.length){const t=Mt.add(e*2),s=Ge(n,0).mul(Mt),o=Ge(n,8),r=Ge(n,e-8).mul(t),i=Ge(n,e-16).mul(Mt),a=bt(s.add(o),43).add(bt(r,30)).add(i),l=ps(a,s.add(bt(o.add(Mt),18)).add(r),t),c=Ge(n,16).mul(t),u=Ge(n,24),h=a.add(Ge(n,e-32)).mul(t),d=l.add(Ge(n,e-24)).mul(t);return ps(bt(c.add(u),43).add(bt(h,30)).add(d),c.add(bt(u.add(s),18)).add(h),t)}function Nw(n,e=n.length){const t=Bs.fromNumber(81,!0);if(e<=32)return e<=16?vw(n,e):kw(n,e);if(e<=64)return Sw(n,e);let s=t,o=t.mul(Vs).add(113),r=Lu(o.mul(Mt).add(113)).mul(Mt),i=[Bs.UZERO,Bs.UZERO],a=[Bs.UZERO,Bs.UZERO];s=s.mul(Mt).add(Ge(n,0));let l=0;const c=(e-1>>6)*64,u=c+(e-1&63)-63;do s=bt(s.add(o).add(i[0]).add(Ge(n,l+8)),37).mul(Vs),o=bt(o.add(i[1]).add(Ge(n,l+48)),42).mul(Vs),s=s.xor(a[1]),o=o.add(i[0]).add(Ge(n,l+40)),r=bt(r.add(a[0]),33).mul(Vs),i=al(n,l,i[1].mul(Vs),s.add(a[0])),a=al(n,l+32,r.add(a[1]),o.add(Ge(n,l+16))),[r,s]=[s,r],l+=64;while(l!==c);const h=Vs.add(r.and(255).shl(1));return l=u,a[0]=a[0].add(e-1&63),i[0]=i[0].add(a[0]),a[0]=a[0].add(i[0]),s=bt(s.add(o).add(i[0]).add(Ge(n,l+8)),37).mul(h),o=bt(o.add(i[1]).add(Ge(n,l+48)),42).mul(h),s=s.xor(a[1].mul(9)),o=o.add(i[0].mul(9).add(Ge(n,l+40))),r=bt(r.add(a[0]),33).mul(h),i=al(n,l,i[1].mul(h),s.add(a[0])),a=al(n,l+32,r.add(a[1]),o.add(Ge(n,l+16))),[r,s]=[s,r],ps(ps(i[0],a[0],h).add(Lu(o).mul(rf)).add(r),ps(i[1],a[1],h).add(s),h)}function fs(n,e){return e==="string"?ms(n):Ws([n],e)}function Tw(n,e){return n instanceof Float32Array&&e==="float32"||n instanceof Int32Array&&e==="int32"||n instanceof Uint8Array&&e==="bool"}function Ws(n,e){if(e==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(n)&&(n=Us(n)),U().getBool("DEBUG")&&sw(n,e),Tw(n,e))return n;if(e==null||e==="float32"||e==="complex64")return new Float32Array(n);if(e==="int32")return new Int32Array(n);if(e==="bool"){const t=new Uint8Array(n.length);for(let s=0;s<t.length;++s)Math.round(n[s])!==0&&(t[s]=1);return t}else throw new Error(`Unknown data type ${e}`)}function Wt(){return U().platform.now()}function ms(n,e="utf-8"){return e=e||"utf-8",U().platform.encode(n,e)}function gs(n,e="utf-8"){return e=e||"utf-8",U().platform.decode(n,e)}function cn(n){return U().platform.isTypedArray!=null?U().platform.isTypedArray(n):tf(n)}function Us(n,e=[],t=!1){if(e==null&&(e=[]),typeof n=="boolean"||typeof n=="number"||typeof n=="string"||Wc(n)||n==null||cn(n)&&t)e.push(n);else if(Array.isArray(n)||cn(n))for(let s=0;s<n.length;++s)Us(n[s],e,t);else{let s=-1;for(const o of Object.keys(n))/^([1-9]+[0-9]*|0)$/.test(o)&&(s=Math.max(s,Number(o)));for(let o=0;o<=s;o++)Us(n[o],e,t)}return e}class Ew{constructor(e,t){this.backendTimer=e,this.logger=t,t==null&&(this.logger=new Aw)}profileKernel(e,t,s){let o;const r=()=>{o=s()};let i;const a=Wt();if(this.backendTimer.timerAvailable())i=this.backendTimer.time(r);else{r();for(const c of o)c.dataSync();i=Promise.resolve({kernelMs:Wt()-a})}if(U().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let c=0;c<o.length;c++){const u=o[c];u.data().then(h=>{Rw(h,u.dtype,e)})}return{kernelName:e,outputs:o,inputs:t,timeMs:i.then(c=>c.kernelMs),extraInfo:i.then(c=>c.getExtraProfileInfo!=null?c.getExtraProfileInfo():"")}}logKernelProfile(e){const{kernelName:t,outputs:s,timeMs:o,inputs:r,extraInfo:i}=e;s.forEach(a=>{Promise.all([a.data(),o,i]).then(l=>{this.logger.logKernelProfile(t,a,l[0],l[1],r,l[2])})})}}function Rw(n,e,t){if(e!=="float32")return!1;for(let s=0;s<n.length;s++){const o=n[s];if(isNaN(o)||!isFinite(o))return console.warn(`Found ${o} in the result of '${t}'`),!0}return!1}class Aw{logKernelProfile(e,t,s,o,r,i){const a=typeof o=="number"?No(`${o}ms`,9):o.error,l=No(e,25),c=t.rank,u=t.size,h=No(t.shape.toString(),14);let d="";for(const p in r){const f=r[p];if(f!=null){const m=f.shape||t.shape,g=m.length;d+=`${p}: ${g}D ${g>0?m:""} `}}console.log(`%c${l}	%c${a}	%c${c}D ${h}	%c${u}	%c${d}	%c${i}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}function Dw(n,e,t){const s={},o={};for(let l=0;l<e.length;l++)s[e[l].id]=!0;for(let l=0;l<n.length;l++){const c=n[l],u=c.inputs;for(const h in u){const d=u[h];let p=!1;for(let f=0;f<e.length;f++)if(s[d.id]){c.outputs.forEach(m=>s[m.id]=!0),p=!0,o[c.id]=!0;break}if(p)break}}const r={};r[t.id]=!0;const i={};for(let l=n.length-1;l>=0;l--){const c=n[l],u=c.inputs;for(let h=0;h<c.outputs.length;h++)if(r[c.outputs[h].id]){for(const d in u)r[u[d].id]=!0,i[c.id]=!0;break}}const a=[];for(let l=0;l<n.length;l++){const c=n[l];if(o[c.id]&&i[c.id]){const u={};for(const d in c.inputs){const p=c.inputs[d];s[p.id]&&(u[d]=p)}const h=Object.assign({},c);h.inputs=u,h.outputs=c.outputs,a.push(h)}}return a}function Fw(n,e,t,s){for(let o=e.length-1;o>=0;o--){const r=e[o],i=[];if(r.outputs.forEach(l=>{const c=n[l.id];c!=null?i.push(c):i.push(null)}),r.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${r.kernelName}.`);const a=r.gradient(i);for(const l in r.inputs){if(!(l in a))throw new Error(`Cannot backprop through input ${l}. Available gradients found: ${Object.keys(a)}.`);const c=t(()=>a[l]());if(c.dtype!=="float32")throw new Error(`Error in gradient for op ${r.kernelName}. The gradient of input ${l} must have 'float32' dtype, but has '${c.dtype}'`);const u=r.inputs[l];if(!_e(c.shape,u.shape))throw new Error(`Error in gradient for op ${r.kernelName}. The gradient of input '${l}' has shape '${c.shape}', which does not match the shape of the input '${u.shape}'`);if(n[u.id]==null)n[u.id]=c;else{const h=n[u.id];n[u.id]=s(h,c),h.dispose()}}}}const cf=20,ii=3,Mu=7;function _w(n,e,t,s){const o=fe(e),r=Ow(n,e,t,o),i=e.length,a=ll(n,e,t,o,r),l=["Tensor"];return s&&(l.push(`  dtype: ${t}`),l.push(`  rank: ${i}`),l.push(`  shape: [${e}]`),l.push("  values:")),l.push(a.map(c=>"    "+c).join(`
`)),l.join(`
`)}function Ow(n,e,t,s){const o=K(e),r=s[s.length-1],i=new Array(r).fill(0),a=e.length,l=t==="complex64"?li(n):n;if(a>1)for(let c=0;c<o/r;c++){const u=c*r;for(let h=0;h<r;h++)i[h]=Math.max(i[h],ai(l[u+h],0,t).length)}return i}function ai(n,e,t){let s;return Array.isArray(n)?s=`${parseFloat(n[0].toFixed(Mu))} + ${parseFloat(n[1].toFixed(Mu))}j`:ur(n)?s=`'${n}'`:t==="bool"?s=uf(n):s=parseFloat(n.toFixed(Mu)).toString(),No(s,e)}function uf(n){return n===0?"false":"true"}function ll(n,e,t,s,o,r=!0){const i=t==="complex64"?2:1,a=e[0],l=e.length;if(l===0){if(t==="complex64"){const m=li(n);return[ai(m[0],0,t)]}return t==="bool"?[uf(n[0])]:[n[0].toString()]}if(l===1){if(a>cf){const g=ii*i;let x=Array.from(n.slice(0,g)),b=Array.from(n.slice((a-ii)*i,a*i));return t==="complex64"&&(x=li(x),b=li(b)),["["+x.map((w,y)=>ai(w,o[y],t)).join(", ")+", ..., "+b.map((w,y)=>ai(w,o[a-ii+y],t)).join(", ")+"]"]}return["["+(t==="complex64"?li(n):Array.from(n)).map((g,x)=>ai(g,o[x],t)).join(", ")+"]"]}const c=e.slice(1),u=s.slice(1),h=s[0]*i,d=[];if(a>cf){for(let m=0;m<ii;m++){const g=m*h,x=g+h;d.push(...ll(n.slice(g,x),c,t,u,o,!1))}d.push("...");for(let m=a-ii;m<a;m++){const g=m*h,x=g+h;d.push(...ll(n.slice(g,x),c,t,u,o,m===a-1))}}else for(let m=0;m<a;m++){const g=m*h,x=g+h;d.push(...ll(n.slice(g,x),c,t,u,o,m===a-1))}const p=l===2?",":"";d[0]="["+(a>0?d[0]+p:"");for(let m=1;m<d.length-1;m++)d[m]=" "+d[m]+p;let f=`,
`;for(let m=2;m<l;m++)f+=`
`;return d[d.length-1]=" "+d[d.length-1]+"]"+(r?"":f),d}function li(n){const e=[];for(let t=0;t<n.length;t+=2)e.push([n[t],n[t+1]]);return e}class It{constructor(e,t,s){if(this.dtype=t,this.shape=e.slice(),this.size=K(e),s!=null){const o=s.length;S(o===this.size,()=>`Length of values '${o}' does not match the size inferred by the shape '${this.size}'.`)}if(t==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=s||et(t,this.size),this.strides=fe(e)}set(e,...t){t.length===0&&(t=[0]),S(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);const s=this.locToIndex(t);this.values[s]=e}get(...e){e.length===0&&(e=[0]);let t=0;for(const o of e){if(o<0||o>=this.shape[t]){const r=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw new Error(r)}t++}let s=e[e.length-1];for(let o=0;o<e.length-1;++o)s+=this.strides[o]*e[o];return this.values[s]}locToIndex(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];let t=e[e.length-1];for(let s=0;s<e.length-1;++s)t+=this.strides[s]*e[s];return t}indexToLoc(e){if(this.rank===0)return[];if(this.rank===1)return[e];const t=new Array(this.shape.length);for(let s=0;s<t.length-1;++s)t[s]=Math.floor(e/this.strides[s]),e-=t[s]*this.strides[s];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return In().makeTensor(this.values,this.shape,this.dtype)}}let In=null,Do=null;function Lw(n){In=n}function Mw(n){Do=n}class ct{constructor(e,t,s,o){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=K(e),this.strides=fe(e),this.dataId=s,this.id=o,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}buffer(){return X(this,null,function*(){const e=yield this.data();return Do.buffer(this.shape,this.dtype,e)})}bufferSync(){return Do.buffer(this.shape,this.dtype,this.dataSync())}array(){return X(this,null,function*(){const e=yield this.data();return Cn(this.shape,e,this.dtype==="complex64")})}arraySync(){return Cn(this.shape,this.dataSync(),this.dtype==="complex64")}data(){return X(this,null,function*(){this.throwIfDisposed();const e=In().read(this.dataId);if(this.dtype==="string"){const t=yield e;try{return t.map(s=>gs(s))}catch(s){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e})}dataToGPU(e){return this.throwIfDisposed(),In().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();const e=In().readSync(this.dataId);if(this.dtype==="string")try{return e.map(t=>gs(t))}catch(t){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}bytes(){return X(this,null,function*(){this.throwIfDisposed();const e=yield In().read(this.dataId);return this.dtype==="string"?e:new Uint8Array(e.buffer)})}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),In().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(e=!1){return Do.print(this,e)}clone(){return this.throwIfDisposed(),Do.clone(this)}toString(e=!1){const t=this.dataSync();return _w(t,this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),Do.cast(this,e)}variable(e=!0,t,s){return this.throwIfDisposed(),In().makeVariable(this,e,t,s)}}Object.defineProperty(ct,Symbol.hasInstance,{value:n=>!!n&&n.data!=null&&n.dataSync!=null&&n.throwIfDisposed!=null});function q(){return Gc("Tensor",()=>ct)}q();class cl extends ct{constructor(e,t,s,o){super(e.shape,e.dtype,e.dataId,o),this.trainable=t,this.name=s}assign(e){if(e.dtype!==this.dtype)throw new Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!_e(e.shape,this.shape))throw new Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);In().disposeTensor(this),this.dataId=e.dataId,In().incRef(this,null)}dispose(){In().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(cl,Symbol.hasInstance,{value:n=>n instanceof ct&&n.assign!=null&&n.assign instanceof Function});var hf;(function(n){n.R0="R0",n.R1="R1",n.R2="R2",n.R3="R3",n.R4="R4",n.R5="R5",n.R6="R6"})(hf||(hf={}));var Pu;(function(n){n.float32="float32",n.int32="int32",n.bool="int32",n.complex64="complex64"})(Pu||(Pu={}));var zu;(function(n){n.float32="float32",n.int32="int32",n.bool="bool",n.complex64="complex64"})(zu||(zu={}));var Bu;(function(n){n.float32="float32",n.int32="float32",n.bool="float32",n.complex64="complex64"})(Bu||(Bu={}));var Vu;(function(n){n.float32="complex64",n.int32="complex64",n.bool="complex64",n.complex64="complex64"})(Vu||(Vu={}));const Pw={float32:Bu,int32:Pu,bool:zu,complex64:Vu};function Yt(n,e){if(n==="string"||e==="string"){if(n==="string"&&e==="string")return"string";throw new Error(`Can not upcast ${n} with ${e}`)}return Pw[n][e]}function Wu(n){return Yt(n,"int32")}function df(n){return n!=null&&typeof n=="object"&&"texture"in n&&n.texture instanceof WebGLTexture}function pf(n){return typeof GPUBuffer!="undefined"&&n!=null&&typeof n=="object"&&"buffer"in n&&n.buffer instanceof GPUBuffer}function tt(n,e){if(n.dtype===e.dtype)return[n,e];const t=Yt(n.dtype,e.dtype);return[n.cast(t),e.cast(t)]}function ff(n){const e=[];return mf(n,e,new Set),e}function mf(n,e,t){if(n==null)return;if(n instanceof ct){e.push(n);return}if(!zw(n))return;const s=n;for(const o in s){const r=s[o];t.has(r)||(t.add(r),mf(r,e,t))}}function zw(n){return Array.isArray(n)||typeof n=="object"}function Uu(n){return n.kernelName!=null}class gf{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(const e in this.registeredVariables)this.registeredVariables[e].dispose()}}class Fo{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new gf}ready(){return X(this,null,function*(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;const e=this.getSortedBackends();for(let t=0;t<e.length;t++){const s=e[t];if(yield this.initializeBackend(s).success){yield this.setBackend(s);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")})}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){const{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw new Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry))if(e in this.registryFactory){const{asyncInit:t}=this.initializeBackend(e);if(t)return null}else return null;return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,s=1){return e in this.registryFactory?(nn(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:t,priority:s},!0)}setBackend(e){return X(this,null,function*(){if(this.registryFactory[e]==null)throw new Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,this.registry[e]==null){this.backendInstance=null;const{success:t,asyncInit:s}=this.initializeBackend(e);if(!(s?yield t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Ew(this.backendInstance),!0})}setupRegisteredKernels(){Jp(this.backendName).forEach(t=>{t.setupFunc!=null&&t.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Jp(e).forEach(s=>{s.disposeFunc!=null&&s.disposeFunc(this.registry[e])})}initializeBackend(e){const t=this.registryFactory[e];if(t==null)throw new Error(`Cannot initialize backend ${e}, no registration found.`);try{const s=t.factory();if(s&&!(s instanceof ko)&&typeof s.then=="function"){const o=++this.pendingBackendInitId,r=s.then(i=>o<this.pendingBackendInitId?!1:(this.registry[e]=i,this.pendingBackendInit=null,!0)).catch(i=>(o<this.pendingBackendInitId||(this.pendingBackendInit=null,nn(`Initialization of backend ${e} failed`),nn(i.stack||i.message)),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}else return this.registry[e]=s,{success:!0,asyncInit:!1}}catch(s){return nn(`Initialization of backend ${e} failed`),nn(s.stack||s.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw new Error(`${e} backend not found in registry`);this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){const e=this.getSortedBackends();for(let t=0;t<e.length;t++){const s=e[t],{success:o,asyncInit:r}=this.initializeBackend(s);if(r||o)return{name:s,asyncInit:r}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){const s=this.state.tensorInfo.get(t),o=s.backend,r=this.readSync(t),i=o.refCount(t);o.disposeData(t,!0),s.backend=e,e.move(t,r,s.shape,s.dtype,i),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let s=null;if(t==null){if(typeof e!="function")throw new Error("Please provide a function to tidy()");t=e}else{if(typeof e!="string"&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof t!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");s=e}let o;return this.scopedRun(()=>this.startScope(s),()=>this.endScope(o),()=>(o=t(),o instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),o))}scopedRun(e,t,s){e();try{const o=s();return t(),o}catch(o){throw t(),o}}nextTensorId(){return Fo.nextTensorId++}nextVariableId(){return Fo.nextVariableId++}clone(e){const t=M.runKernel(Ar,{x:e}),s={x:e},o=i=>({x:()=>{const a="float32",l={x:i},c={dtype:a};return M.runKernel(br,l,c)}}),r=[];return this.addTapeNode(this.state.activeScope.name,s,[t],o,r,{}),t}runKernel(e,t,s){if(this.backendName==null&&this.backend,!(Yp(e,this.backendName)!=null))throw new Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:s})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,s){const o=this.backend.numDataIds();let r=0;s.forEach(l=>{r+=l.dtype==="complex64"?3:1});const i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],a=o-t-r-i;if(a>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${a} data ids) after running '${e}'`)}runKernelFunc(e){let t,s=[];const o=this.isTapeOn(),r=this.state.numBytes,i=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let a;this.backendName==null&&this.backend;let l;const c=Uu(e)?e.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(Uu(e)){const{kernelName:f,inputs:m,attrs:g}=e;this.backendName==null&&this.backend;const x=Yp(f,this.backendName);S(x!=null,()=>`Cannot find registered kernel '${f}' for backend '${this.backendName}'`),a=()=>{const b=this.backend.numDataIds();l=x.kernelFunc({inputs:m,attrs:g,backend:this.backend});const w=Array.isArray(l)?l:[l];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(f,b,w);const y=w.map(C=>C.rank!=null?C:this.makeTensorFromTensorInfo(C));if(o){const C=this.getTensorsForGradient(f,m,y);s=this.saveTensorsForBackwardMode(C)}return y}}else{const{forwardFunc:f}=e,m=g=>{o&&(s=g.map(x=>this.keep(this.clone(x))))};a=()=>{const g=this.backend.numDataIds();l=this.tidy(()=>f(this.backend,m));const x=Array.isArray(l)?l:[l];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,g,x),x}}const{inputs:u,attrs:h}=e,d=Uu(e)?null:e.backwardsFunc;let p;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?t=a():(p=this.profiler.profileKernel(c,u,()=>a()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(p),t=p.outputs)}),o&&this.addTapeNode(c,u,t,d,s,h),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-r,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-i,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(u).map(f=>u[f]!=null?u[f].shape:null),outputShapes:t.map(f=>f.shape),kernelTimeMs:p.timeMs,extraInfo:p.extraInfo}),Array.isArray(l)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(s=>this.keep(this.clone(s)))}getTensorsForGradient(e,t,s){const o=Zp(e);if(o!=null){const r=o.inputsToSave||[],i=o.outputsToSave||[];let a;o.saveAllInputs?(S(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),a=Object.keys(t).map(c=>t[c])):a=r.map(c=>t[c]);const l=s.filter((c,u)=>i[u]);return a.concat(l)}return[]}makeTensor(e,t,s,o){if(e==null)throw new Error("Values passed to engine.makeTensor() are null");s=s||"float32",o=o||this.backend;let r=e;s==="string"&&ur(e[0])&&(r=e.map(l=>ms(l)));const i=o.write(r,t,s),a=new ct(t,s,i,this.nextTensorId());if(this.trackTensor(a,o),s==="string"){const l=this.state.tensorInfo.get(i),c=rw(r);this.state.numBytes+=c-l.bytes,l.bytes=c}return a}makeTensorFromDataId(e,t,s,o){s=s||"float32";const r={dataId:e,shape:t,dtype:s};return this.makeTensorFromTensorInfo(r,o)}makeTensorFromTensorInfo(e,t){const{dataId:s,shape:o,dtype:r}=e,i=new ct(o,r,s,this.nextTensorId());return this.trackTensor(i,t),i}makeVariable(e,t=!0,s,o){s=s||this.nextVariableId().toString(),o!=null&&o!==e.dtype&&(e=e.cast(o));const r=new cl(e,t,s,this.nextTensorId());if(this.state.registeredVariables[r.name]!=null)throw new Error(`Variable with name ${r.name} was already registered`);return this.state.registeredVariables[r.name]=r,this.incRef(r,this.backend),r}trackTensor(e,t){this.state.numTensors++,e.dtype==="string"&&this.state.numStringTensors++;let s=0;e.dtype!=="complex64"&&e.dtype!=="string"&&(s=e.size*na(e.dtype)),this.state.numBytes+=s,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:s})),e instanceof cl||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;const t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,e.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),e.dtype!=="complex64"&&e.dtype!=="string"){const s=e.size*na(e.dtype);this.state.numBytes-=s}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(const e in this.state.registeredVariables){const t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]}memory(){const e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons==null&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}profile(e){return X(this,null,function*(){this.state.profiling=!0;const t=this.state.numBytes,s=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=yield e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(o=>o.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-s;for(const o of this.state.activeProfile.kernels)o.kernelTimeMs=yield o.kernelTimeMs,o.extraInfo=yield o.extraInfo;return this.state.activeProfile})}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(e,t,s,o,r,i){const a={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:s,saved:r},l=Zp(e);l!=null&&(o=l.gradFunc),o!=null&&(a.gradient=c=>(c=c.map((u,h)=>{if(u==null){const d=s[h],p=Rt(d.size,d.dtype);return this.makeTensor(p,d.shape,d.dtype)}return u}),o(c.length>1?c:c[0],r,i))),this.state.activeTape.push(a)}keep(e){return e.kept=!0,e}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){const t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){const t=ff(e),s=new Set(t.map(r=>r.id));for(let r=0;r<this.state.activeScope.track.length;r++){const i=this.state.activeScope.track[r];!i.kept&&!s.has(i.id)&&i.dispose()}const o=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(r=>{!r.kept&&r.scopeId===o.id&&this.track(r)})}gradients(e,t,s,o=!1){if(S(t.length>0,()=>"gradients() received an empty list of xs."),s!=null&&s.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${s.dtype}'`);const r=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));S(r instanceof ct,()=>"The result y returned by f() must be a tensor.");const i=Dw(this.state.activeTape,t,r);if(!o&&i.length===0&&t.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const a={};a[r.id]=s==null?Bw(r.shape):s,Fw(a,i,c=>this.tidy(c),Vw);const l=t.map(c=>a[c.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(c=>{for(const u of c.saved)u.dispose()}),this.state.activeTape=null),{value:r,grads:l}})}customGrad(e){return S(zc(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{S(t.every(a=>a instanceof ct),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let s;const o={};t.forEach((a,l)=>{o[l]=a});const r=(a,l)=>(s=e(...t,l),S(s.value instanceof ct,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),S(zc(s.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),s.value),i=(a,l)=>{const c=s.gradFunc(a,l),u=Array.isArray(c)?c:[c];S(u.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),S(u.every(d=>d instanceof ct),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const h={};return u.forEach((d,p)=>{h[p]=()=>d}),h};return this.runKernelFunc({forwardFunc:r,backwardsFunc:i,inputs:o})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)}time(e){return X(this,null,function*(){const t=Wt(),s=yield this.backend.time(e);return s.wallMs=Wt()-t,s})}track(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new gf;for(const e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}Fo.nextTensorId=0,Fo.nextVariableId=0;function Bw(n){const e=Vc(K(n),"float32");return M.makeTensor(e,n,"float32")}function xf(){const n=Tp();if(n._tfengine==null){const e=new lw(n);n._tfengine=new Fo(e)}return dw(n._tfengine.ENV),Lw(()=>n._tfengine),n._tfengine}const M=xf();function Vw(n,e){const t={a:n,b:e};return M.runKernel(Ro,t)}function Ww(){return typeof navigator!="undefined"&&navigator!=null}function bf(n){if(n||Ww()){if(n||(n=navigator),n.product==="ReactNative")return!0;const e=n.userAgent||n.vendor||(typeof window!="undefined"?window.opera:"");if(!e){const t=n;return t.userAgentData&&t.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}return!1}function yf(){return typeof window!="undefined"&&window.document!=null||typeof WorkerGlobalScope!="undefined"}const Ut=U();Ut.registerFlag("DEBUG",()=>!1,n=>{n&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),Ut.registerFlag("IS_BROWSER",()=>yf()),Ut.registerFlag("IS_NODE",()=>typeof process!="undefined"&&typeof process.versions!="undefined"&&typeof process.versions.node!="undefined"),Ut.registerFlag("IS_CHROME",()=>typeof navigator!="undefined"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),Ut.registerFlag("IS_SAFARI",()=>typeof navigator!="undefined"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),Ut.registerFlag("PROD",()=>!1),Ut.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>Ut.getBool("DEBUG")),Ut.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0),Ut.registerFlag("IS_TEST",()=>!1),Ut.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>Ut.getBool("DEBUG")),Ut.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1),Ut.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1),Ut.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);function ul(n,e){let t=n;if(cn(n))return e==="string"?[]:[n.length];if(df(n)){const o=n.channels||"RGBA";return[n.height,n.width*o.length]}else if(pf(n))return[n.buffer.size/(e==null?4:na(e))];if(!Array.isArray(n))return[];const s=[];for(;Array.isArray(t)||cn(t)&&e!=="string";)s.push(t.length),t=t[0];return Array.isArray(n)&&U().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&wf(n,s,[]),s}function wf(n,e,t){if(t=t||[],!Array.isArray(n)&&!cn(n)){S(e.length===0,()=>`Element arr[${t.join("][")}] is a primitive, but should be an array/TypedArray of ${e[0]} elements`);return}S(e.length>0,()=>`Element arr[${t.join("][")}] should be a primitive, but is an array of ${n.length} elements`),S(n.length===e[0],()=>`Element arr[${t.join("][")}] should have ${e[0]} elements, but has ${n.length} elements`);const s=e.slice(1);for(let o=0;o<n.length;++o)wf(n[o],s,t.concat(o))}function Cf(n,e,t,s){if(n!=="string_or_numeric"){if(n==null)throw new Error("Expected dtype cannot be null.");if(n!=="numeric"&&n!==e||n==="numeric"&&e==="string")throw new Error(`Argument '${t}' passed to '${s}' must be ${n} tensor, but got ${e} tensor`)}}function A(n,e,t,s="numeric"){if(n instanceof q())return Cf(s,n.dtype,e,t),n;let o=To(n);if(o!=="string"&&["bool","int32","float32"].indexOf(s)>=0&&(o=s),Cf(s,o,e,t),n==null||!cn(n)&&!Array.isArray(n)&&typeof n!="number"&&typeof n!="boolean"&&typeof n!="string"){const l=n==null?"null":n.constructor.name;throw new Error(`Argument '${e}' passed to '${t}' must be a Tensor or TensorLike, but got '${l}'`)}const r=ul(n,o);!cn(n)&&!Array.isArray(n)&&(n=[n]);const a=o!=="string"?Ws(n,o):Us(n,[],!0);return M.makeTensor(a,r,o)}function If(n,e,t,s="numeric"){if(!Array.isArray(n))throw new Error(`Argument ${e} passed to ${t} must be a \`Tensor[]\` or \`TensorLike[]\``);return n.map((r,i)=>A(r,`${e}[${i}]`,t,s))}const Uw="__op";function W(n){const e=Object.keys(n);if(e.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${e.length} keys.`);let t=e[0];const s=n[t];t.endsWith("_")&&(t=t.substring(0,t.length-1)),t=t+Uw;const o=(...r)=>{M.startScope(t);try{const i=s(...r);return Wc(i)&&console.error("Cannot return a Promise inside of tidy."),M.endScope(i),i}catch(i){throw M.endScope(null),i}};return Object.defineProperty(o,"name",{value:t,configurable:!0}),o}function Gw(n,e){const t=A(n,"real","complex"),s=A(e,"imag","complex");Lc(t.shape,s.shape,`real and imag shapes, ${t.shape} and ${s.shape}, must match in call to tf.complex().`);const o={real:t,imag:s};return M.runKernel(Jc,o)}const Gs=W({complex_:Gw});function hl(n,e,t,s){if(s==null)s=To(n);else if(s==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(pf(n)||df(n)){if(s!=="float32"&&s!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${s}.`);return M.backend.createTensorFromGPUData(n,e||t,s)}if(!cn(n)&&!Array.isArray(n)&&typeof n!="number"&&typeof n!="boolean"&&typeof n!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(e!=null){Jn(e);const o=K(e),r=K(t);S(o===r,()=>`Based on the provided shape, [${e}], the tensor should have ${o} values but has ${r}`);for(let i=0;i<t.length;++i){const a=t[i],l=i===t.length-1?a!==K(e.slice(i)):!0;S(t[i]===e[i]||!l,()=>`Error creating a new Tensor. Inferred shape (${t}) does not match the provided shape (${e}). `)}}return!cn(n)&&!Array.isArray(n)&&(n=[n]),e=e||t,n=s!=="string"?Ws(n,s):Us(n,[],!0),M.makeTensor(n,e,s)}function Hs(n,e,t){const s=ul(n,t);return hl(n,e,s,t)}const dl={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};class Qn{static join(e){return new Qn(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,e==null||(e instanceof Array||(e=[e]),e=e.map(s=>cn(s)?s.buffer:s),e.length===0))return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let s=0;s<e.length;s++){const o=e[s];s!==e.length-1&&o.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);const r=t+o.byteLength;this.shards.push({buffer:o,start:t,end:r}),t=r}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),t=Math.min(this.byteLength,t),t<=e)return new ArrayBuffer(0);const s=this.findShardForByte(e);if(s===-1)throw new Error(`Could not find start shard for byte ${e}`);const o=t-e,r=new ArrayBuffer(o),i=new Uint8Array(r);let a=0;for(let l=s;l<this.shards.length;l++){const c=this.shards[l],h=e+a-c.start,d=a,f=Math.min(t,c.end)-c.start,m=new Uint8Array(c.buffer,h,f-h);if(i.set(m,d),a+=m.length,t<c.end)break}return r}findShardForByte(e){if(this.shards.length===0||e<0||e>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function t(o){return e<o.start?-1:e>=o.end?1:0}if(t(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;const s=Hw(this.shards,t);return s===-1?-1:(this.previousShardIndex=s,this.previousShardIndex)}}function Hw(n,e){let t=0,s=n.length;for(;t<=s;){const o=Math.floor((s-t)/2)+t,r=e(n[o]);if(r===0)return o;r<0?s=o:t=o+1}return-1}function qw(){U().set("PROD",!0)}function Ke(){return M}function ci(){return M.memory()}function B(n,e){return M.tidy(n,e)}function xe(n){ff(n).forEach(t=>t.dispose())}function On(n){return M.keep(n)}function Kw(n){return M.setBackend(n)}function jw(){return M.ready()}function Gu(){return M.backendName}function $f(n,e,t=1){return M.registerBackend(n,e,t)}function vf(){return M.backend}const _o=4;function kf(n,e){return X(this,null,function*(){const t=[],s=[],o=Array.isArray(n)?n.map(i=>i.name):Object.keys(n);for(let i=0;i<o.length;++i){const a=o[i],l=Array.isArray(n)?n[i].tensor:n[a];if(l.dtype!=="float32"&&l.dtype!=="int32"&&l.dtype!=="bool"&&l.dtype!=="string"&&l.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${a}': ${l.dtype}`);const c={name:a,shape:l.shape,dtype:l.dtype};if(l.dtype==="string"){const u=new Promise(h=>X(null,null,function*(){const d=yield l.bytes(),p=d.reduce((g,x)=>g+x.length,0)+_o*d.length,f=new Uint8Array(p);let m=0;for(let g=0;g<d.length;g++){const x=d[g],b=new Uint8Array(new Uint32Array([x.length]).buffer);f.set(b,m),m+=_o,f.set(x,m),m+=x.length}h(f)}));s.push(u)}else s.push(l.data());e!=null&&(c.group=e),t.push(c)}const r=yield Promise.all(s);return{data:Jw(r),specs:t}})}function Xw(n,e){const t=new Qn(n),s={};let o=0;for(const r of e){const i=Yw(r,(a,l)=>t.slice(o+a,o+l));s[r.name]=Zw(r,t.slice(o,o+i)),o+=i}return s}function Yw(n,e){const t=K(n.shape);let s;if("quantization"in n){const o=n.quantization;s=dl[o.dtype]}else if(n.dtype==="string"){let o=0;for(let r=0;r<t;r++)o+=_o+new Uint32Array(e(o,o+_o))[0];return o}else s=dl[n.dtype];return t*s}function Zw(n,e){const t=n.name,s=n.dtype,o=n.shape,r=K(o);let i,a=0;if("quantization"in n){const l=n.quantization;if(l.dtype==="uint8"||l.dtype==="uint16"){if(!("min"in l&&"scale"in l))throw new Error(`Weight ${n.name} with quantization ${l.dtype} doesn't have corresponding metadata min and scale.`)}else if(l.dtype==="float16"){if(s!=="float32")throw new Error(`Weight ${n.name} is quantized with ${l.dtype} which only supports weights of type float32 not ${s}.`)}else throw new Error(`Weight ${n.name} has unknown quantization dtype ${l.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);const c=dl[l.dtype],u=l.dtype==="uint8"?new Uint8Array(e):new Uint16Array(e);if(s==="float32")if(l.dtype==="uint8"||l.dtype==="uint16"){i=new Float32Array(u.length);for(let h=0;h<u.length;h++){const d=u[h];i[h]=d*l.scale+l.min}}else if(l.dtype==="float16")i=aC()(u);else throw new Error(`Unsupported quantization type ${l.dtype} for weight type float32.`);else if(s==="int32"){if(l.dtype!=="uint8"&&l.dtype!=="uint16")throw new Error(`Unsupported quantization type ${l.dtype} for weight type int32.`);i=new Int32Array(u.length);for(let h=0;h<u.length;h++){const d=u[h];i[h]=Math.round(d*l.scale+l.min)}}else throw new Error(`Unsupported dtype in weight '${t}': ${s}`);a+=r*c}else if(s==="string"){const l=K(n.shape);i=[];for(let c=0;c<l;c++){const u=new Uint32Array(e.slice(a,a+_o))[0];a+=_o;const h=new Uint8Array(e.slice(a,a+u));i.push(h),a+=u}}else{const l=dl[s];if(s==="float32")i=new Float32Array(e);else if(s==="int32")i=new Int32Array(e);else if(s==="bool")i=new Uint8Array(e);else if(s==="complex64"){i=new Float32Array(e);const c=new Float32Array(i.length/2),u=new Float32Array(i.length/2);for(let f=0;f<c.length;f++)c[f]=i[f*2],u[f]=i[f*2+1];const h=Hs(c,o,"float32"),d=Hs(u,o,"float32"),p=Gs(h,d);return h.dispose(),d.dispose(),p}else throw new Error(`Unsupported dtype in weight '${t}': ${s}`);a+=r*l}return Hs(i,o,s)}function Jw(n){if(n===null)throw new Error(`Invalid input value: ${JSON.stringify(n)}`);let e=0;const t=[];n.forEach(r=>{if(e+=r.byteLength,t.push(r.byteLength===r.buffer.byteLength?r:new r.constructor(r)),!(r instanceof Float32Array||r instanceof Int32Array||r instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${r.constructor.name}`)});const s=new Uint8Array(e);let o=0;return t.forEach(r=>{s.set(new Uint8Array(r.buffer),o),o+=r.byteLength}),s.buffer}const Hu=typeof Buffer!="undefined"&&(typeof Blob=="undefined"||typeof atob=="undefined"||typeof btoa=="undefined");function Sf(n){return Hu?Buffer.byteLength(n,"utf8"):new Blob([n]).size}function Qw(n){if(Hu)return Buffer.from(n).toString("base64");const e=new Uint8Array(n);let t="";for(let s=0,o=e.length;s<o;s++)t+=String.fromCharCode(e[s]);return btoa(t)}function eC(n){if(Hu){const s=Buffer.from(n,"base64");return s.buffer.slice(s.byteOffset,s.byteOffset+s.byteLength)}const e=atob(n),t=new Uint8Array(e.length);for(let s=0;s<e.length;++s)t.set([e.charCodeAt(s)],s);return t.buffer}function tC(n){return Qn.join(n)}function Nf(n,e){const t={modelTopology:n.modelTopology,format:n.format,generatedBy:n.generatedBy,convertedBy:n.convertedBy,weightsManifest:e};return n.signature!=null&&(t.signature=n.signature),n.userDefinedMetadata!=null&&(t.userDefinedMetadata=n.userDefinedMetadata),n.modelInitializer!=null&&(t.modelInitializer=n.modelInitializer),n.initializerSignature!=null&&(t.initializerSignature=n.initializerSignature),n.trainingConfig!=null&&(t.trainingConfig=n.trainingConfig),t}function nC(n,e,t){const s={modelTopology:n.modelTopology,format:n.format,generatedBy:n.generatedBy,convertedBy:n.convertedBy};if(n.trainingConfig!=null&&(s.trainingConfig=n.trainingConfig),n.weightsManifest!=null){if(!e)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!t)throw new Error("modelJSON has weightsManifest but weightData is null");s.weightSpecs=e,s.weightData=t}return n.signature!=null&&(s.signature=n.signature),n.userDefinedMetadata!=null&&(s.userDefinedMetadata=n.userDefinedMetadata),n.modelInitializer!=null&&(s.modelInitializer=n.modelInitializer),n.initializerSignature!=null&&(s.initializerSignature=n.initializerSignature),s}function sC(n,e){return X(this,null,function*(){let t,s;return n.weightsManifest!=null&&([t,s]=yield e(n.weightsManifest)),nC(n,t,s)})}function pl(n){if(n.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:n.modelTopology==null?0:Sf(JSON.stringify(n.modelTopology)),weightSpecsBytes:n.weightSpecs==null?0:Sf(JSON.stringify(n.weightSpecs)),weightDataBytes:n.weightData==null?0:new Qn(n.weightData).byteLength}}function Tf(n){const e=[];for(const t of n)e.push(...t.weights);return e}function oC(){const n=t=>{let s=t<<13,o=0;for(;(s&8388608)===0;)o-=8388608,s<<=1;return s&=-8388609,o+=947912704,s|o},e=new Uint32Array(2048);e[0]=0;for(let t=1;t<1024;t++)e[t]=n(t);for(let t=1024;t<2048;t++)e[t]=939524096+(t-1024<<13);return e}function rC(){const n=new Uint32Array(64);n[0]=0,n[31]=1199570944,n[32]=2147483648,n[63]=3347054592;for(let e=1;e<31;e++)n[e]=e<<23;for(let e=33;e<63;e++)n[e]=2147483648+(e-32<<23);return n}function iC(){const n=new Uint32Array(64);for(let e=0;e<64;e++)n[e]=1024;return n[0]=n[32]=0,n}function aC(){const n=oC(),e=rC(),t=iC();return s=>{const o=new ArrayBuffer(4*s.length),r=new Uint32Array(o);for(let i=0;i<s.length;i++){const a=s[i],l=n[t[a>>10]+(a&1023)]+e[a>>10];r[i]=l}return new Float32Array(o)}}class ut{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return ut.instance==null&&(ut.instance=new ut),ut.instance}static registerSaveRouter(e){ut.getInstance().saveRouters.push(e)}static registerLoadRouter(e){ut.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return ut.getHandlers(e,"save")}static getLoadHandlers(e,t){return ut.getHandlers(e,"load",t)}static getHandlers(e,t,s){const o=[];return(t==="load"?ut.getInstance().loadRouters:ut.getInstance().saveRouters).forEach(i=>{const a=i(e,s);a!==null&&o.push(a)}),o}}const lC=n=>ut.getSaveHandlers(n),cC=(n,e)=>ut.getLoadHandlers(n,e);const qu="tensorflowjs",Ku=1,qs="models_store",xs="model_info_store";function Ef(){if(!U().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const n=typeof window=="undefined"?self:window,e=n.indexedDB||n.mozIndexedDB||n.webkitIndexedDB||n.msIndexedDB||n.shimIndexedDB;if(e==null)throw new Error("The current browser does not appear to support IndexedDB.");return e}function ju(n){const e=n.result;e.createObjectStore(qs,{keyPath:"modelPath"}),e.createObjectStore(xs,{keyPath:"modelPath"})}class Ks{constructor(e){if(this.indexedDB=Ef(),e==null||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}save(e){return X(this,null,function*(){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)})}load(){return X(this,null,function*(){return this.databaseAction(this.modelPath)})}databaseAction(e,t){return new Promise((s,o)=>{const r=this.indexedDB.open(qu,Ku);r.onupgradeneeded=()=>ju(r),r.onsuccess=()=>{const i=r.result;if(t==null){const a=i.transaction(qs,"readonly"),c=a.objectStore(qs).get(this.modelPath);c.onsuccess=()=>{if(c.result==null)return i.close(),o(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));s(c.result.modelArtifacts)},c.onerror=u=>(i.close(),o(c.error)),a.oncomplete=()=>i.close()}else{t.weightData=Qn.join(t.weightData);const a=pl(t),l=i.transaction(xs,"readwrite");let c=l.objectStore(xs),u;try{u=c.put({modelPath:this.modelPath,modelArtifactsInfo:a})}catch(d){return o(d)}let h;u.onsuccess=()=>{h=i.transaction(qs,"readwrite");const d=h.objectStore(qs);let p;try{p=d.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:a})}catch(f){return o(f)}p.onsuccess=()=>s({modelArtifactsInfo:a}),p.onerror=f=>{c=l.objectStore(xs);const m=c.delete(this.modelPath);m.onsuccess=()=>(i.close(),o(p.error)),m.onerror=g=>(i.close(),o(p.error))}},u.onerror=d=>(i.close(),o(u.error)),l.oncomplete=()=>{h==null?i.close():h.oncomplete=()=>i.close()}}},r.onerror=i=>o(r.error)})}}Ks.URL_SCHEME="indexeddb://";const Rf=n=>U().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(Ks.URL_SCHEME)?uC(n.slice(Ks.URL_SCHEME.length)):null;ut.registerSaveRouter(Rf),ut.registerLoadRouter(Rf);function uC(n){return new Ks(n)}function hC(n){return n.startsWith(Ks.URL_SCHEME)?n.slice(Ks.URL_SCHEME.length):n}class dC{constructor(){this.indexedDB=Ef()}listModels(){return X(this,null,function*(){return new Promise((e,t)=>{const s=this.indexedDB.open(qu,Ku);s.onupgradeneeded=()=>ju(s),s.onsuccess=()=>{const o=s.result,r=o.transaction(xs,"readonly"),a=r.objectStore(xs).getAll();a.onsuccess=()=>{const l={};for(const c of a.result)l[c.modelPath]=c.modelArtifactsInfo;e(l)},a.onerror=l=>(o.close(),t(a.error)),r.oncomplete=()=>o.close()},s.onerror=o=>t(s.error)})})}removeModel(e){return X(this,null,function*(){return e=hC(e),new Promise((t,s)=>{const o=this.indexedDB.open(qu,Ku);o.onupgradeneeded=()=>ju(o),o.onsuccess=()=>{const r=o.result,i=r.transaction(xs,"readwrite"),a=i.objectStore(xs),l=a.get(e);let c;l.onsuccess=()=>{if(l.result==null)return r.close(),s(new Error(`Cannot find model with path '${e}' in IndexedDB.`));{const u=a.delete(e),h=()=>{c=r.transaction(qs,"readwrite");const p=c.objectStore(qs).delete(e);p.onsuccess=()=>t(l.result.modelArtifactsInfo),p.onerror=f=>s(l.error)};u.onsuccess=h,u.onerror=d=>(h(),r.close(),s(l.error))}},l.onerror=u=>(r.close(),s(l.error)),i.oncomplete=()=>{c==null?r.close():c.oncomplete=()=>r.close()}},o.onerror=r=>s(o.error)})})}}const es="/",Oo="tensorflowjs_models",Af="info",pC="model_topology",fC="weight_specs",mC="weight_data",gC="model_metadata";function Df(n){return{info:[Oo,n,Af].join(es),topology:[Oo,n,pC].join(es),weightSpecs:[Oo,n,fC].join(es),weightData:[Oo,n,mC].join(es),modelMetadata:[Oo,n,gC].join(es)}}function Ff(n){for(const e of Object.values(n))window.localStorage.removeItem(e)}function xC(n){const e=n.split(es);if(e.length<3)throw new Error(`Invalid key format: ${n}`);return e.slice(1,e.length-1).join(es)}function bC(n){return n.startsWith(js.URL_SCHEME)?n.slice(js.URL_SCHEME.length):n}class js{constructor(e){if(!U().getBool("IS_BROWSER")||typeof window=="undefined"||typeof window.localStorage=="undefined")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,e==null||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=Df(this.modelPath)}save(e){return X(this,null,function*(){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const t=JSON.stringify(e.modelTopology),s=JSON.stringify(e.weightSpecs),o=pl(e),r=Qn.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(o)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,s),this.LS.setItem(this.keys.weightData,Qw(r));const i={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:e.signature!=null?e.signature:void 0,userDefinedMetadata:e.userDefinedMetadata!=null?e.userDefinedMetadata:void 0,modelInitializer:e.modelInitializer!=null?e.modelInitializer:void 0,initializerSignature:e.initializerSignature!=null?e.initializerSignature:void 0,trainingConfig:e.trainingConfig!=null?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(i)),{modelArtifactsInfo:o}}catch(i){throw Ff(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${o.modelTopologyBytes}, weightSpecsBytes=${o.weightSpecsBytes}, weightDataBytes=${o.weightDataBytes}.`)}}})}load(){return X(this,null,function*(){const e=JSON.parse(this.LS.getItem(this.keys.info));if(e==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(e.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const t={},s=JSON.parse(this.LS.getItem(this.keys.topology));if(s==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=s;const o=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(o==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=o;const r=this.LS.getItem(this.keys.modelMetadata);if(r!=null){const a=JSON.parse(r);t.format=a.format,t.generatedBy=a.generatedBy,t.convertedBy=a.convertedBy,a.signature!=null&&(t.signature=a.signature),a.userDefinedMetadata!=null&&(t.userDefinedMetadata=a.userDefinedMetadata),a.modelInitializer!=null&&(t.modelInitializer=a.modelInitializer),a.initializerSignature!=null&&(t.initializerSignature=a.initializerSignature),a.trainingConfig!=null&&(t.trainingConfig=a.trainingConfig)}const i=this.LS.getItem(this.keys.weightData);if(i==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=eC(i),t})}}js.URL_SCHEME="localstorage://";const _f=n=>U().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(js.URL_SCHEME)?yC(n.slice(js.URL_SCHEME.length)):null;ut.registerSaveRouter(_f),ut.registerLoadRouter(_f);function yC(n){return new js(n)}class wC{constructor(){S(U().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),S(typeof window=="undefined"||typeof window.localStorage!="undefined",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}listModels(){return X(this,null,function*(){const e={},t=Oo+es,s=es+Af;for(let o=0;o<this.LS.length;++o){const r=this.LS.key(o);if(r.startsWith(t)&&r.endsWith(s)){const i=xC(r);e[i]=JSON.parse(this.LS.getItem(r))}}return e})}removeModel(e){return X(this,null,function*(){e=bC(e);const t=Df(e);if(this.LS.getItem(t.info)==null)throw new Error(`Cannot find model at path '${e}'`);const s=JSON.parse(this.LS.getItem(t.info));return Ff(t),s})}}const Of="://";class Ln{constructor(){this.managers={}}static getInstance(){return Ln.instance==null&&(Ln.instance=new Ln),Ln.instance}static registerManager(e,t){S(e!=null,()=>"scheme must not be undefined or null."),e.endsWith(Of)&&(e=e.slice(0,e.indexOf(Of))),S(e.length>0,()=>"scheme must not be an empty string.");const s=Ln.getInstance();S(s.managers[e]==null,()=>`A model store manager is already registered for scheme '${e}'.`),s.managers[e]=t}static getManager(e){const t=Ln.getInstance().managers[e];if(t==null)throw new Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(Ln.getInstance().managers)}}class CC{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${t}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){if(typeof window=="undefined"||!U().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,t);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",s=>{if(s.source===window&&s.data.name===this.messageName){s.stopPropagation();const o=this.functionRefs[s.data.index];o(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return tf(e)}}if(U().get("IS_BROWSER")){U().setPlatform("browser",new CC);try{Ln.registerManager(js.URL_SCHEME,new wC)}catch(n){}try{Ln.registerManager(Ks.URL_SCHEME,new dC)}catch(n){}}const IC={importFetch:()=>require("node-fetch")};let Xu;class $C{constructor(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return U().global.fetch!=null?U().global.fetch(e,t):(Xu==null&&(Xu=IC.importFetch()),Xu(e,t))}now(){const e=process.hrtime();return e[0]*1e3+e[1]/1e6}encode(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return e.length===0?"":new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}}U().get("IS_NODE")&&!U().get("IS_BROWSER")&&U().setPlatform("node",new $C);function ke(n,e="float32",t){return e=e||"float32",Jn(n),new It(n,e,t)}function vC(n,e){const t=A(n,"x","cast");if(!ow(e))throw new Error(`Failed to cast to unknown dtype ${e}`);if(e==="string"&&t.dtype!=="string"||e!=="string"&&t.dtype==="string")throw new Error("Only strings can be casted to strings");const s={x:t},o={dtype:e};return M.runKernel(br,s,o)}const re=W({cast_:vC});function kC(n){const t={x:A(n,"x","clone","string_or_numeric")};return M.runKernel(Ar,t)}const Xs=W({clone_:kC});function SC(n,e=!1){console.log(n.toString(e))}xf(),Mw({buffer:ke,cast:re,clone:Xs,print:SC});function NC(n,e){let t=A(n,"a","add"),s=A(e,"b","add");[t,s]=tt(t,s);const o={a:t,b:s};return M.runKernel(Ro,o)}const te=W({add_:NC});function TC(n,e){let t=A(n,"a","floorDiv"),s=A(e,"b","floorDiv");[t,s]=tt(t,s);const o={a:t,b:s};return M.runKernel(Er,o)}const Lf=W({floorDiv_:TC});function EC(n,e){let t=A(n,"a","div"),s=A(e,"b","div");if([t,s]=tt(t,s),t.dtype==="int32"&&s.dtype==="int32")return Lf(t,s);const o={a:t,b:s},r={};return M.runKernel($r,o,r)}const ge=W({div_:EC});function RC(n,e){let t=A(n,"a","mul"),s=A(e,"b","mul");[t,s]=tt(t,s);const o={a:t,b:s};return M.runKernel(Br,o)}const L=W({mul_:RC});function AC(n){const e=A(n,"x","abs");if(e.dtype==="complex64"){const t={x:e};return M.runKernel(ua,t)}else{const t={x:e};return M.runKernel(sa,t)}}const Pt=W({abs_:AC});function DC(n){const t={x:A(n,"x","acos")};return M.runKernel(hr,t)}const FC=W({acos_:DC});function _C(n){const t={x:A(n,"x","acosh")};return M.runKernel(dr,t)}const OC=W({acosh_:_C});function LC(n,e=null,t=!1){const o={x:A(n,"x","all","bool")},r={axis:e,keepDims:t};return M.runKernel(qc,o,r)}const Mf=W({all_:LC});function MC(n,e=null,t=!1){const o={x:A(n,"x","any","bool")},r={axis:e,keepDims:t};return M.runKernel(Kc,o,r)}const Yu=W({any_:MC});function PC(n,e=0){const s={x:A(n,"x","argMax")},o={axis:e};return M.runKernel(oa,s,o)}const Ys=W({argMax_:PC});function zC(n,e=0){const s={x:A(n,"x","argMin")},o={axis:e};return M.runKernel(ra,s,o)}const BC=W({argMin_:zC});function VC(n){const t={x:A(n,"x","asin")};return M.runKernel(pr,t)}const WC=W({asin_:VC});function UC(n){const t={x:A(n,"x","asinh")};return M.runKernel(fr,t)}const GC=W({asinh_:UC});function HC(n){const t={x:A(n,"x","atan")};return M.runKernel(mr,t)}const qC=W({atan_:HC});function KC(n,e){let t=A(n,"a","atan2"),s=A(e,"b","atan2");[t,s]=tt(t,s);const o={a:t,b:s};return M.runKernel(xr,o)}const jC=W({atan2_:KC});function XC(n){const t={x:A(n,"x","atanh")};return M.runKernel(gr,t)}const YC=W({atanh_:XC});function ui(n,e,t,s,o="NHWC",r){const i=n[3],a=[...e,i],l=ns(o);return $t(n,a,t,r,s,null,null,l)}function un(n,e,t,s,o,r,i="channelsLast"){const[a,l]=hi(e);let c;if(i==="channelsLast")c=[a,l,n[3],n[3]];else if(i==="channelsFirst")c=[a,l,n[1],n[1]];else throw new Error(`Unknown dataFormat ${i}`);return $t(n,c,t,s,o,r,!1,i)}function ts(n,e,t,s,o,r,i="NDHWC"){const[a,l,c]=Ju(e);let u,h;if(i==="NDHWC")h="channelsLast",u=[a,l,c,n[4],n[4]];else if(i==="NCDHW")h="channelsFirst",u=[a,l,c,n[1],n[1]];else throw new Error(`Unknown dataFormat ${i}`);return bs(n,u,t,s,o,!1,h,r)}function $t(n,e,t,s,o,r,i=!1,a="channelsLast"){let[l,c,u,h]=[-1,-1,-1,-1];if(a==="channelsLast")[l,c,u,h]=n;else if(a==="channelsFirst")[l,h,c,u]=n;else throw new Error(`Unknown dataFormat ${a}`);const[d,p,,f]=e,[m,g]=hi(t),[x,b]=hi(s),w=Lo(d,x),y=Lo(p,b),{padInfo:C,outHeight:$,outWidth:v}=QC(o,c,u,m,g,w,y,r,a),k=i?f*h:f;let N;return a==="channelsFirst"?N=[l,k,$,v]:a==="channelsLast"&&(N=[l,$,v,k]),{batchSize:l,dataFormat:a,inHeight:c,inWidth:u,inChannels:h,outHeight:$,outWidth:v,outChannels:k,padInfo:C,strideHeight:m,strideWidth:g,filterHeight:d,filterWidth:p,effectiveFilterHeight:w,effectiveFilterWidth:y,dilationHeight:x,dilationWidth:b,inShape:n,outShape:N,filterShape:e}}function bs(n,e,t,s,o,r=!1,i="channelsLast",a){let[l,c,u,h,d]=[-1,-1,-1,-1,-1];if(i==="channelsLast")[l,c,u,h,d]=n;else if(i==="channelsFirst")[l,d,c,u,h]=n;else throw new Error(`Unknown dataFormat ${i}`);const[p,f,m,,g]=e,[x,b,w]=Ju(t),[y,C,$]=Ju(s),v=Lo(p,y),k=Lo(f,C),N=Lo(m,$),{padInfo:T,outDepth:I,outHeight:E,outWidth:R}=eI(o,c,u,h,x,b,w,v,k,N,a),D=r?g*d:g;let F;return i==="channelsFirst"?F=[l,D,I,E,R]:i==="channelsLast"&&(F=[l,I,E,R,D]),{batchSize:l,dataFormat:i,inDepth:c,inHeight:u,inWidth:h,inChannels:d,outDepth:I,outHeight:E,outWidth:R,outChannels:D,padInfo:T,strideDepth:x,strideHeight:b,strideWidth:w,filterDepth:p,filterHeight:f,filterWidth:m,effectiveFilterDepth:v,effectiveFilterHeight:k,effectiveFilterWidth:N,dilationDepth:y,dilationHeight:C,dilationWidth:$,inShape:n,outShape:F,filterShape:e}}function ZC(n,e,t,s,o){s==null&&(s=Zu(n,e,t));const r=n[0],i=n[1],a=di((r-e+2*s)/t+1,o),l=di((i-e+2*s)/t+1,o);return[a,l]}function JC(n,e,t,s,o,r){o==null&&(o=Zu(n,e[0],s[0]));const i=[0,0,0,t];for(let a=0;a<3;a++)n[a]+2*o>=e[a]&&(i[a]=di((n[a]-e[a]+2*o)/s[a]+1,r));return i}function Zu(n,e,t,s=1){const o=Lo(e,s);return Math.floor((n[0]*(t-1)-t+o)/2)}function hi(n){return typeof n=="number"?[n,n,n]:n.length===2?[n[0],n[1],1]:n}function Ju(n){return typeof n=="number"?[n,n,n]:n}function Lo(n,e){return e<=1?n:n+(n-1)*(e-1)}function QC(n,e,t,s,o,r,i,a,l){let c,u,h;if(typeof n=="number"){c={top:n,bottom:n,left:n,right:n,type:n===0?"VALID":"NUMBER"};const p=ZC([e,t],r,s,n,a);u=p[0],h=p[1]}else if(n==="same"){u=Math.ceil(e/s),h=Math.ceil(t/o);const d=Math.max(0,(u-1)*s+r-e),p=Math.max(0,(h-1)*o+i-t),f=Math.floor(d/2),m=d-f,g=Math.floor(p/2),x=p-g;c={top:f,bottom:m,left:g,right:x,type:"SAME"}}else if(n==="valid")c={top:0,bottom:0,left:0,right:0,type:"VALID"},u=Math.ceil((e-r+1)/s),h=Math.ceil((t-i+1)/o);else if(typeof n=="object"){const d=l==="channelsLast"?n[1][0]:n[2][0],p=l==="channelsLast"?n[1][1]:n[2][1],f=l==="channelsLast"?n[2][0]:n[3][0],m=l==="channelsLast"?n[2][1]:n[3][1];c={top:d,bottom:p,left:f,right:m,type:d===0&&p===0&&f===0&&m===0?"VALID":"EXPLICIT"},u=di((e-r+d+p)/s+1,a),h=di((t-i+f+m)/o+1,a)}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:c,outHeight:u,outWidth:h}}function eI(n,e,t,s,o,r,i,a,l,c,u){let h,d,p,f;if(n==="valid"&&(n=0),typeof n=="number"){h={top:n,bottom:n,left:n,right:n,front:n,back:n,type:n===0?"VALID":"NUMBER"};const g=JC([e,t,s,1],[a,l,c],1,[o,r,i],n,u);d=g[0],p=g[1],f=g[2]}else if(n==="same"){d=Math.ceil(e/o),p=Math.ceil(t/r),f=Math.ceil(s/i);const m=(d-1)*o+a-e,g=(p-1)*r+l-t,x=(f-1)*i+c-s,b=Math.floor(m/2),w=m-b,y=Math.floor(g/2),C=g-y,$=Math.floor(x/2),v=x-$;h={top:y,bottom:C,left:$,right:v,front:b,back:w,type:"SAME"}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:h,outDepth:d,outHeight:p,outWidth:f}}function di(n,e){if(!e)return Math.trunc(n);switch(e){case"round":return Math.round(n);case"ceil":return Math.ceil(n);case"floor":return Math.floor(n);default:throw new Error(`Unknown roundingMode ${e}`)}}function Zs(n){const[e,t,s]=hi(n);return e===1&&t===1&&s===1}function At(n,e){return Zs(n)||Zs(e)}function Js(n){return hi(n).every(e=>e>0)}function ns(n){if(n==="NHWC")return"channelsLast";if(n==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${n}`)}function Gt(n,e,t){if(t!=null){if(typeof e=="string")throw Error(`Error in ${n}: pad must be an integer when using dimRoundingMode ${t} but got pad ${e}.`);if(typeof e=="number")S(So(e),()=>`Error in ${n}: pad must be an integer when using dimRoundingMode ${t} but got pad ${e}.`);else if(typeof e=="object")e.forEach(s=>{s.forEach(o=>{S(So(o),()=>`Error in ${n}: pad must be an integer when using dimRoundingMode ${t} but got pad ${o}.`)})});else throw Error(`Error in ${n}: Unknown padding parameter: ${e}`)}}function tI(n,e){const s={x:A(n,"x","reshape","string_or_numeric")},o={shape:e};return M.runKernel(Ga,s,o)}const V=W({reshape_:tI});function nI(n,e,t,s,o){const r=A(n,"x","avgPool","float32"),i=1;S(At(t,i),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${t} and dilations '${i}'`);let a=r,l=!1;r.rank===3&&(l=!0,a=V(r,[1,r.shape[0],r.shape[1],r.shape[2]])),S(a.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${a.rank}.`),Gt("avgPool",s,o);const c={x:a},u={filterSize:e,strides:t,pad:s,dimRoundingMode:o};let h=M.runKernel(ia,c,u);return h=re(h,r.dtype),l?V(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const Qu=W({avgPool_:nI});function sI(n,e,t,s,o,r="NDHWC"){const i=A(n,"x","avgPool3d","float32");let a=i,l=!1;i.rank===4&&(l=!0,a=V(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),S(a.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${a.rank}.`),S(r==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${r}`),S(typeof t=="number"&&t>0||Array.isArray(t)&&t[0]>0&&t[1]>0&&t[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${t}'`),Gt("avgPool3d",s,o);const c={x:a},u={filterSize:e,strides:t,pad:s,dimRoundingMode:o,dataFormat:r};let h=M.runKernel(aa,c,u);return h=re(h,a.dtype),l?V(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}const oI=W({avgPool3d_:sI});function rI(n,e=0){S(n.length>=1,()=>"Pass at least one tensor to concat");const t=If(n,"tensors","concat","string_or_numeric");if(t[0].dtype==="complex64"&&t.forEach(r=>{if(r.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${r.dtype}. `)}),t.length===1)return Xs(t[0]);const s=t,o={axis:e};return M.runKernel(ha,s,o)}const vt=W({concat_:rI});function iI(n,e,t=!1,s=!1){let o=A(n,"a","matMul"),r=A(e,"b","matMul");[o,r]=tt(o,r);const i={a:o,b:r},a={transposeA:t,transposeB:s};return M.runKernel(la,i,a)}const Fe=W({matMul_:iI});function aI(n){const t={x:A(n,"x","sigmoid","float32")};return M.runKernel(Zr,t)}const Mo=W({sigmoid_:aI});function lI(n,e,t){const s=A(n,"x","slice","string_or_numeric");if(s.rank===0)throw new Error("Slicing scalar is not possible");const o={x:s},r={begin:e,size:t};return M.runKernel(Xa,o,r)}const He=W({slice_:lI});function cI(n){const t={x:A(n,"x","tanh","float32")};return M.runKernel(si,t)}const fl=W({tanh_:cI});function uI(n,e,t){const s=A(n,"x","batchToSpaceND"),o=e.reduce((a,l)=>a*l);S(s.rank>=1+e.length,()=>`input rank is ${s.rank} but should be > than blockShape.length ${e.length}`),S(t.length===e.length,()=>`crops.length is ${t.length} but should be equal to blockShape.length  ${e.length}`),S(s.shape[0]%o===0,()=>`input tensor batch is ${s.shape[0]} but is not divisible by the product of the elements of blockShape ${e.join(" * ")} === ${o}`);const r={x:s},i={blockShape:e,crops:t};return M.runKernel(ca,r,i)}const eh=W({batchToSpaceND_:uI});function hI(n){let e;return n.rank===0||n.rank===1?e=V(n,[1,1,1,n.size]):n.rank===2?e=V(n,[1,1,n.shape[0],n.shape[1]]):n.rank===3?e=V(n,[1,n.shape[0],n.shape[1],n.shape[2]]):e=n,e}function dI(n,e,t,s,o,r){r==null&&(r=.001);const i=A(n,"x","batchNorm"),a=A(e,"mean","batchNorm"),l=A(t,"variance","batchNorm");let c;o!=null&&(c=A(o,"scale","batchNorm"));let u;s!=null&&(u=A(s,"offset","batchNorm")),S(a.rank===l.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),S(u==null||a.rank===u.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),S(c==null||a.rank===c.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");const d={x:hI(i),scale:c,offset:u,mean:a,variance:l},p={varianceEpsilon:r},f=M.runKernel(wa,d,p);return V(f,i.shape)}const ml=W({batchNorm_:dI});function pI(n,e,t,s,o,r){const i=A(n,"x","batchNorm"),a=A(e,"mean","batchNorm"),l=A(t,"variance","batchNorm");let c;o!=null&&(c=A(o,"scale","batchNorm"));let u;return s!=null&&(u=A(s,"offset","batchNorm")),S(i.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${i.rank}.`),S(a.rank===2||a.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${a.rank}.`),S(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${l.rank}.`),c!=null&&S(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${c.rank}.`),u!=null&&S(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),ml(i,a,l,u,c,r)}const fI=W({batchNorm2d_:pI});function mI(n,e,t,s,o,r){const i=A(n,"x","batchNorm"),a=A(e,"mean","batchNorm"),l=A(t,"variance","batchNorm");let c;o!=null&&(c=A(o,"scale","batchNorm"));let u;return s!=null&&(u=A(s,"offset","batchNorm")),S(i.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${i.rank}.`),S(a.rank===3||a.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${a.rank}.`),S(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${l.rank}.`),c!=null&&S(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${c.rank}.`),u!=null&&S(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),ml(i,a,l,u,c,r)}const gI=W({batchNorm3d_:mI});function xI(n,e,t,s,o,r){const i=A(n,"x","batchNorm"),a=A(e,"mean","batchNorm"),l=A(t,"variance","batchNorm");let c;o!=null&&(c=A(o,"scale","batchNorm"));let u;return s!=null&&(u=A(s,"offset","batchNorm")),S(i.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${i.rank}.`),S(a.rank===4||a.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${a.rank}.`),S(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${l.rank}.`),c!=null&&S(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${c.rank}.`),u!=null&&S(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),ml(i,a,l,u,c,r)}const bI=W({batchNorm4d_:xI});function yI(n,e,t){const s=A(n,"x","bincount"),o=A(e,"weights","bincount");S(s.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${s.dtype}`),S(t>=0,()=>`size must be non-negative, but got ${t}.`),S(o.size===s.size||o.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${s.shape}, weights shape: ${o.shape}.`);const r={x:s,weights:o},i={size:t};return M.runKernel(Yc,r,i)}const wI=W({bincount_:yI});function CI(n,e){let t=A(n,"broadcastTo","x");const s=t.shape;if(Jn(e),e.length<t.rank)throw new Error(`broadcastTo(): shape.length=${e.length} < input.rank=${t.rank}.`);if(e.length>t.rank){const c=t.shape.slice();for(;c.length<e.length;)c.unshift(1);t=V(t,c)}const o=t.shape,r=Array.from(e);for(let c=e.length-1;c>=0;c--)if(o[c]===e[c])r[c]=1;else if(t.shape[c]!==1)throw new Error(`broadcastTo(): [${s}] cannot be broadcast to [${e}].`);if(r.map((c,u)=>c>1?u:-1).filter(c=>c>=0).length===0)return Xs(t);const a={x:t},l={reps:r};return M.runKernel(oi,a,l)}const pi=W({broadcastTo_:CI});function II(n){const t={x:A(n,"x","ceil","float32")};return M.runKernel(yr,t)}const $I=W({ceil_:II});function Po(n,e,t){Jn(n),t=t||To(e);const s={shape:n,value:e,dtype:t};return M.runKernel(pu,{},s)}function vI(n,e,t){const s=A(n,"x","clipByValue");if(S(e<=t,()=>`Error in clip: min (${e}) must be less than or equal to max (${t}).`),e===t)return Po(s.shape,e,s.dtype);const o={x:s},r={clipValueMin:e,clipValueMax:t};return M.runKernel(wr,o,r)}const sn=W({clipByValue_:vI});function kI(n){return vt(n,0)}const SI=W({concat1d_:kI});function NI(n,e){return vt(n,e)}const TI=W({concat2d_:NI});function EI(n,e){return vt(n,e)}const RI=W({concat3d_:EI});function AI(n,e){return vt(n,e)}const DI=W({concat4d_:AI});function FI(n,e,t,s,o="NHWC",r=[1,1],i){const a=A(n,"x","conv2d","float32"),l=A(e,"filter","conv2d","float32");let c=a,u=!1;a.rank===3&&(u=!0,c=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),S(c.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${c.rank}.`),S(l.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${l.rank}.`),Gt("conv2d",s,i);const h=o==="NHWC"?c.shape[3]:c.shape[1];S(h===l.shape[2],()=>`Error in conv2d: depth of input (${h}) must match input depth for filter ${l.shape[2]}.`),S(At(t,r),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${t} and dilations '${r}'`),S(Js(r),()=>"Error in conv2D: Dilated rates should be larger than 0."),S(Js(t),()=>"Error in conv2D: Strides should be larger than 0.");const d={x:c,filter:l},p={strides:t,pad:s,dataFormat:o,dilations:r,dimRoundingMode:i},f=M.runKernel(da,d,p);return u?V(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const Qs=W({conv2d_:FI});function _I(n,e,t,s,o="NWC",r=1,i){const a=A(n,"x","conv1d"),l=A(e,"filter","conv1d");let c=a,u=!1;a.rank===2&&(u=!0,c=V(a,[1,a.shape[0],a.shape[1]])),S(c.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${c.rank}.`),S(l.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${l.rank}.`),Gt("conv1d",s,i),S(c.shape[2]===l.shape[1],()=>`Error in conv1d: depth of input (${c.shape[2]}) must match input depth for filter ${l.shape[1]}.`),S(At(t,r),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${t} and dilation '${r}'`),S(Js(r),()=>"Error in conv1D: Dilated rates should be larger than 0."),S(Js(t),()=>"Error in conv1D: Stride should be larger than 0."),S(o==="NWC",()=>`Error in conv1d: got dataFormat of ${o} but only NWC is currently supported.`);const h=V(l,[1,l.shape[0],l.shape[1],l.shape[2]]),d=V(c,[c.shape[0],1,c.shape[1],c.shape[2]]),g=Qs(d,h,[1,t],s,"NHWC",[1,r],i);return u?V(g,[g.shape[2],g.shape[3]]):V(g,[g.shape[0],g.shape[2],g.shape[3]])}const Pf=W({conv1d_:_I});function OI(n,e,t,s,o,r="NHWC",i){S(n.length===e.rank,()=>`Length of inShape (${n.length}) and rank of dy (${e.rank}) must match`);let a=n,l=e,c=!1;e.rank===3&&(c=!0,l=V(e,[1,e.shape[0],e.shape[1],e.shape[2]]),a=[1,n[0],n[1],n[2]]),S(a.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${a.length}.`),S(l.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${l.rank}`),S(t.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${t.rank}`);const u=r==="NHWC"?a[3]:a[1],h=r==="NHWC"?l.shape[3]:l.shape[1];S(u===t.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${t.shape[2]}.`),S(h===t.shape[3],()=>`Error in conv2dDerInput: depth of output (${h}) must match output depth for filter ${t.shape[3]}.`),Gt("conv2dDerInput",o,i);const d={dy:l,filter:t},p={strides:s,pad:o,dataFormat:r,dimRoundingMode:i,inputShape:a},f=M.runKernel(pa,d,p);return c?V(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const th=W({conv2DBackpropInput_:OI});function LI(n,e,t,s,o,r){const i=A(n,"x","conv2dTranspose"),a=A(e,"filter","conv2dTranspose");return th(t,i,a,s,o,"NHWC",r)}const zf=W({conv2dTranspose_:LI});function MI(n,e,t,s,o="NDHWC",r=[1,1,1]){const i=A(n,"x","conv3d"),a=A(e,"filter","conv3d");let l=i,c=!1;i.rank===4&&(c=!0,l=V(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),S(l.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${l.rank}.`),S(a.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${a.rank}.`),S(l.shape[4]===a.shape[3],()=>`Error in conv3d: depth of input (${l.shape[4]}) must match input depth for filter ${a.shape[3]}.`),S(At(t,r),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${t} and dilations '${r}'`),S(o==="NDHWC",()=>`Error in conv3d: got dataFormat of ${o} but only NDHWC is currently supported.`),S(Js(r),()=>"Error in conv3D: Dilated rates should be larger than 0."),S(Js(t),()=>"Error in conv3D: Strides should be larger than 0.");const u={x:l,filter:a},h={strides:t,pad:s,dataFormat:o,dilations:r},d=M.runKernel(fa,u,h);return c?V(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}const fi=W({conv3d_:MI});function PI(n,e,t,s,o){S(n.length===e.rank,()=>`Length of inShape (${n.length}) and rank of dy (${e.rank}) must match`);let r=n,i=e,a=!1;e.rank===4&&(a=!0,i=V(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]]),r=[1,n[0],n[1],n[2],n[3]]);const l=r[4],c=i.shape[4];S(r.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${r.length}.`),S(i.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${i.rank}`),S(t.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${t.rank}`),S(l===t.shape[3],()=>`Error in conv3dDerInput: depth of input (${l}) must match input depth for filter ${t.shape[3]}.`),S(c===t.shape[4],()=>`Error in conv3dDerInput: depth of output (${c}) must match output depth for filter ${t.shape[4]}.`);const u={dy:i,filter:t},h={pad:o,strides:s,inputShape:r},d=M.runKernel(tu,u,h);return a?V(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}const Bf=W({conv3DBackpropInput_:PI});function zI(n,e,t,s,o){const r=A(n,"x","conv3dTranspose"),i=A(e,"filter","conv3dTranspose");return Bf(t,r,i,s,o)}const Vf=W({conv3dTranspose_:zI});function BI(n){const t={x:A(n,"x","cos","float32")};return M.runKernel(Cr,t)}const nh=W({cos_:BI});function VI(n){const t={x:A(n,"x","cosh","float32")};return M.runKernel(Ir,t)}const Wf=W({cosh_:VI});function WI(n,e=0,t=!1,s=!1){const r={x:A(n,"x","cumprod")},i={axis:e,exclusive:t,reverse:s};return M.runKernel(nu,r,i)}const sh=W({cumprod_:WI});function UI(n,e=0,t=!1,s=!1){const r={x:A(n,"x","cumsum")},i={axis:e,exclusive:t,reverse:s};return M.runKernel(ma,r,i)}const Uf=W({cumsum_:UI});function GI(n,e,t,s=!1){const o=A(n,"x","denseBincount"),r=A(e,"weights","denseBincount");S(o.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${o.dtype}`),S(o.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${o.rank}.`),S(t>=0,()=>`size must be non-negative, but got ${t}.`),S(r.size===o.size||r.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${o.shape}, weights shape: ${r.shape}.`);const i={x:o,weights:r},a={size:t,binaryOutput:s};return M.runKernel(ou,i,a)}const Gf=W({denseBincount_:GI});function HI(n,e,t="NHWC"){const s=A(n,"x","depthToSpace","float32"),o=t==="NHWC"?s.shape[1]:s.shape[2],r=t==="NHWC"?s.shape[2]:s.shape[3],i=t==="NHWC"?s.shape[3]:s.shape[1];S(e>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${e}`),S(o*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${o} and ${e}  for depthToSpace with input shape
    ${s.shape}`),S(r*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${r} and ${e} for depthToSpace with input shape
        ${s.shape}`),S(i%(e*e)===0,()=>`Dimension size must be evenly divisible by ${e*e} but is ${i} for depthToSpace with input shape ${s.shape}`);const a={x:s},l={blockSize:e,dataFormat:t};return M.runKernel(ru,a,l)}const qI=W({depthToSpace_:HI});function KI(n,e,t,s,o="NHWC",r=[1,1],i){const a=A(n,"x","depthwiseConv2d","float32"),l=A(e,"filter","depthwiseConv2d","float32");let c=a,u=!1;a.rank===3&&(u=!0,c=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),S(c.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${c.rank}.`),S(l.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${l.rank}.`);const h=o==="NHWC"?c.shape[3]:c.shape[1];S(h===l.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${h}) must match the inChannels dimension in filter ${l.shape[2]}.`),Gt("depthwiseConv2d",s,i);const d={x:c,filter:l},p={strides:t,pad:s,dataFormat:o,dilations:r,dimRoundingMode:i},f=M.runKernel(ga,d,p);return u?V(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const oh=W({depthwiseConv2d_:KI});function jI(n,e,t,s,o=[1,1],r="NHWC"){const i=A(n,"x","dilation2d"),a=A(e,"filter","dilation2d");S(i.rank===3||i.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${i.rank}.`),S(a.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${a.rank}.`),S(r==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${r}`);let l=i,c=!1;i.rank===3&&(l=V(i,[1,i.shape[0],i.shape[1],i.shape[2]]),c=!0),S(l.shape[3]===a.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${l.shape[3]} vs ${a.shape[2]}`);const u={x:l,filter:a},h={strides:t,pad:s,dilations:o},d=M.runKernel(xa,u,h);return c?V(d,[d.shape[1],d.shape[2],d.shape[3]]):d}const XI=W({dilation2d_:jI});function zo(n,e){const t=n.length,s=[];for(let o=0;o<t;o++){const r=t-1-o,i=n[r]||1;(e[e.length-1-o]||1)>1&&i===1&&s.unshift(r)}return s}function ht(n,e){const t=[];for(let s=0;s<e.length;s++){const o=n[n.length-s-1],r=e.length-s-1,i=e[r];(o==null||o===1&&i>1)&&t.unshift(r)}return t}function we(n,e){const t=Math.max(n.length,e.length),s=new Array(t);for(let o=0;o<t;o++){let r=n[n.length-o-1];r==null&&(r=1);let i=e[e.length-o-1];if(i==null&&(i=1),r===1)s[t-o-1]=i;else if(i===1)s[t-o-1]=r;else if(r!==i){const a=`Operands could not be broadcast together with shapes ${n} and ${e}.`;throw Error(a)}else s[t-o-1]=r}return s}function YI(n,e){let t=A(n,"a","equal","string_or_numeric"),s=A(e,"b","equal","string_or_numeric");[t,s]=tt(t,s),we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(ba,o)}const Mn=W({equal_:YI});function ZI(n,e,t){const s=A(e,"a","where"),o=A(t,"b","where"),r=A(n,"condition","where","bool"),i=we(we(r.shape,s.shape),o.shape),a=pi(r,i),l=pi(s,i),c=pi(o,i),u={condition:a,t:l,e:c};return M.runKernel(ja,u)}const dt=W({where_:ZI});function JI(n){const t={x:A(n,"x","zerosLike")};return M.runKernel(nl,t)}const Ee=W({zerosLike_:JI});function QI(n,e){let t=A(n,"a","div"),s=A(e,"b","div");[t,s]=tt(t,s);const o=ge(t,s),r=Ee(o),i=Mn(s,r);return dt(i,r,o)}const e$=W({divNoNan_:QI});function t$(n,e){const t=A(n,"t1","dot"),s=A(e,"t2","dot");S((t.rank===1||t.rank===2)&&(s.rank===1||s.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${t.rank} and ${s.rank}.`);const o=t.rank===1?t.size:t.shape[1],r=s.rank===1?s.size:s.shape[0];if(S(o===r,()=>`Error in dot: inner dimensions of inputs must match, but got ${o} and ${r}.`),t.rank===1&&s.rank===1){const i=V(t,[1,-1]),a=V(s,[-1,1]),l=Fe(i,a);return V(l,[])}else if(t.rank===1&&s.rank===2){const i=V(t,[1,-1]),a=V(s,[s.shape[0],s.shape[1]]),l=Fe(i,a);return V(l,[l.size])}else if(t.rank===2&&s.rank===1){const i=V(s,[-1,1]),a=Fe(t,i);return V(a,[a.size])}else{const i=V(s,[s.shape[0],s.shape[1]]);return Fe(t,i)}}const n$=W({dot_:t$});function s$(n,...e){const t=e.map((o,r)=>A(o,`tensors${r}`,"einsum")),s={equation:n};return M.runKernel(uu,t,s)}const mi=W({einsum_:s$});function o$(n){const t={x:A(n,"x","elu","float32")};return M.runKernel(vr,t)}const gl=W({elu_:o$});function r$(n){let e=A(n,"x","erf");S(e.dtype==="int32"||e.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),e.dtype==="int32"&&(e=re(e,"float32"));const t={x:e};return M.runKernel(kr,t)}const Hf=W({erf_:r$});function rh(n,e){for(let t=0;t<n.length;++t)if(n[n.length-t-1]!==e-1-t)return!1;return!0}function qf(n,e,t){const s=n.length+e.length,o=[];let r=0,i=0;for(let a=0;a<s;a++)t.indexOf(a)===-1?o.push(n[r++]):o.push(e[i++]);return o}function yt(n,e){const t=[],s=n.length;for(let r=0;r<s;r++)e.indexOf(r)===-1&&t.push(n[r]);const o=e.map(r=>n[r]);return[t,o]}function at(n,e){const t=e.map(s=>1);return qf(n,t,e)}function kt(n,e,t){S(rh(e,t),()=>`${n} supports only inner-most axes for now. Got axes ${e} and rank-${t} input.`)}function Ze(n,e){if(rh(n,e))return null;const t=[];for(let s=0;s<e;++s)n.indexOf(s)===-1&&t.push(s);return n.forEach(s=>t.push(s)),t}function ys(n){return n.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function nt(n,e){const t=[];for(let s=e-n;s<e;++s)t.push(s);return t}function i$(n,e=null,t=!1){const o={x:A(n,"x","max")},r={reductionIndices:e,keepDims:t};return M.runKernel(Ra,o,r)}const $n=W({max_:i$});function a$(n,e=null,t=!1){const o={x:A(n,"x","min")},r={axis:e,keepDims:t};return M.runKernel(_a,o,r)}const xl=W({min_:a$});function l$(n,e){let t=A(n,"base","pow"),s=A(e,"exp","pow");[t,s]=tt(t,s);const o={a:t,b:s};return M.runKernel(Vr,o)}const eo=W({pow_:l$});function Oe(n,e){if((cn(n)&&e!=="string"||Array.isArray(n))&&e!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(e==="string"&&cn(n)&&!(n instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return hl(n,[],[],e)}function c$(n){const t={x:A(n,"x","sqrt","float32")};return M.runKernel(Qr,t)}const Dt=W({sqrt_:c$});function u$(n){const e=A(n,"x","square"),t={};return M.runKernel("Square",{x:e},t)}const je=W({square_:u$});function h$(n,e=null,t=!1){let s=A(n,"x","sum");s.dtype==="bool"&&(s=re(s,"int32"));const o={x:s},r={axis:e,keepDims:t};return M.runKernel(Ya,o,r)}const me=W({sum_:h$});function d$(n,e="euclidean",t=null,s=!1){n=A(n,"x","norm");const o=Kf(n,e,t);let r=o.shape;if(s){const i=ve(t,n.shape);r=at(o.shape,i)}return V(o,r)}function Kf(n,e,t=null){if(n.rank===0)return Pt(n);if(n.rank!==1&&t===null)return Kf(V(n,[-1]),e,t);if(n.rank===1||typeof t=="number"||Array.isArray(t)&&t.length===1){if(e===1)return me(Pt(n),t);if(e===1/0)return $n(Pt(n),t);if(e===-1/0)return xl(Pt(n),t);if(e==="euclidean"||e===2)return Dt(me(eo(Pt(n),Oe(2,"int32")),t));throw new Error(`Error in norm: invalid ord value: ${e}`)}if(Array.isArray(t)&&t.length===2){if(e===1)return $n(me(Pt(n),t[0]),t[1]-1);if(e===1/0)return $n(me(Pt(n),t[1]),t[0]);if(e===-1/0)return xl(me(Pt(n),t[1]),t[0]);if(e==="fro"||e==="euclidean")return Dt(me(je(n),t));throw new Error(`Error in norm: invalid ord value: ${e}`)}throw new Error(`Error in norm: invalid axis: ${t}`)}const bl=W({norm_:d$});function p$(n,e=null,t=!1){return bl(n,"euclidean",e,t)}const f$=W({euclideanNorm_:p$});function m$(n){const t={x:A(n,"x","exp")};return M.runKernel(Sr,t)}const Pn=W({exp_:m$});function g$(n,e=0){const t=A(n,"x","expandDims","string_or_numeric");S(e<=t.rank,()=>"Axis must be <= rank of the tensor");const s={input:t},o={dim:e};return M.runKernel(ya,s,o)}const Ht=W({expandDims_:g$});function x$(n){const t={x:A(n,"x","expm1")};return M.runKernel(Nr,t)}const b$=W({expm1_:x$});function y$(n,e){const t=A(n,"x","tile","string_or_numeric");S(t.rank===e.length,()=>`Error in transpose: rank of input ${t.rank} must match length of reps ${e}.`);const s={x:t},o={reps:e};return M.runKernel(oi,s,o)}const vn=W({tile_:y$});function w$(n,e,t,s="float32"){e==null&&(e=n);const o=ke([n,e],s),r=n<=e?n:e;for(let a=0;a<r;++a)o.set(1,a,a);const i=V(o.toTensor(),[n,e]);if(t==null)return i;if(t.length===1)return vn(Ht(i,0),[t[0],1,1]);if(t.length===2)return vn(Ht(Ht(i,0),0),[t[0],t[1],1,1]);if(t.length===3)return vn(Ht(Ht(Ht(i,0),0),0),[t[0],t[1],t[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${t.length}D.`)}const jf=W({eye_:w$});function C$(n){const t={x:A(n,"x","floor","float32")};return M.runKernel(Tr,t)}const yl=W({floor_:C$});function I$(n,e,t=0,s=0){const o=A(n,"x","gather"),r=A(e,"indices","gather","int32"),i={x:o,indices:r},a={axis:t,batchDims:s};return M.runKernel(Ca,i,a)}const ih=W({gather_:I$});function $$(n,e){let t=A(n,"a","greater","string_or_numeric"),s=A(e,"b","greater","string_or_numeric");[t,s]=tt(t,s),we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(Ia,o)}const qt=W({greater_:$$});function v$(n,e){let t=A(n,"a","greaterEqual","string_or_numeric"),s=A(e,"b","greaterEqual","string_or_numeric");[t,s]=tt(t,s),we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(Rr,o)}const to=W({greaterEqual_:v$});function k$(n){const t={input:A(n,"input","imag")};return M.runKernel(gu,t)}const ah=W({imag_:k$});function S$(n){const t={x:A(n,"x","isFinite")};return M.runKernel(Dr,t)}const N$=W({isFinite_:S$});function T$(n){const t={x:A(n,"x","isInf")};return M.runKernel(Fr,t)}const E$=W({isInf_:T$});function R$(n){const t={x:A(n,"x","isNaN")};return M.runKernel(_r,t)}const A$=W({isNaN_:R$});function D$(n,e=.2){const s={x:A(n,"x","leakyRelu")},o={alpha:e};return M.runKernel($a,s,o)}const lh=W({leakyRelu_:D$});function F$(n,e){let t=A(n,"a","less","string_or_numeric"),s=A(e,"b","less","string_or_numeric");[t,s]=tt(t,s),we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(va,o)}const wl=W({less_:F$});function _$(n,e){let t=A(n,"a","lessEqual","string_or_numeric"),s=A(e,"b","lessEqual","string_or_numeric");[t,s]=tt(t,s),we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(ka,o)}const Bo=W({lessEqual_:_$});function O$(n,e=5,t=1,s=1,o=.5){const r=A(n,"x","localResponseNormalization");S(r.rank===4||r.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${r.rank}.`),S(So(e),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${e}.`);let i=r,a=!1;r.rank===3&&(a=!0,i=V(r,[1,r.shape[0],r.shape[1],r.shape[2]]));const l={x:i},c={depthRadius:e,bias:t,alpha:s,beta:o},u=M.runKernel(Ea,l,c);return a?V(u,[u.shape[1],u.shape[2],u.shape[3]]):u}const L$=W({localResponseNormalization_:O$});function M$(n){const t={x:A(n,"x","log","float32")};return M.runKernel(Or,t)}const zn=W({log_:M$});function P$(n){const t={x:A(n,"x","log1p")};return M.runKernel(Lr,t)}const Xf=W({log1p_:P$});function z$(n,e){S(zc(n),()=>"The f passed in variableGrads(f) must be a function"),S(e==null||Array.isArray(e)&&e.every(c=>c instanceof cl),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");const t=e!=null;if(!t){e=[];for(const c in M.registeredVariables)e.push(M.registeredVariables[c])}const s=t?e.filter(c=>!c.trainable):null,o=e.length;e=e.filter(c=>c.trainable),S(e.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${o} variables is trainable.`);const r=!0,{value:i,grads:a}=M.gradients(n,e,null,r);S(a.some(c=>c!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),S(i.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${i.rank} tensor`);const l={};return e.forEach((c,u)=>{a[u]!=null&&(l[c.name]=a[u])}),s!=null&&s.forEach(c=>l[c.name]=null),{value:i,grads:l}}function Vo(n){return M.customGrad(n)}function B$(n){const t={x:A(n,"x","neg")};return M.runKernel(La,t)}const st=W({neg_:B$});function V$(n){const t={x:A(n,"x","softplus")};return M.runKernel(Jr,t)}const gi=W({softplus_:V$});function W$(n){const e=A(n,"x","logSigmoid");return Vo(s=>({value:st(gi(st(s))),gradFunc:i=>L(i,Mo(st(s)))}))(e)}const U$=W({logSigmoid_:W$});function G$(n,e){let t=A(n,"a","sub"),s=A(e,"b","sub");[t,s]=tt(t,s);const o={a:t,b:s};return M.runKernel(ti,o)}const be=W({sub_:G$});function H$(n,e=-1){const t=A(n,"logits","logSoftmax");if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${t.rank} and axis was ${e}`);return Vo((o,r)=>{const a=$n(o,e,!0),l=be(o,a),c=be(re(l,"float32"),zn(me(Pn(l),e,!0)));return r([c]),{value:c,gradFunc:(h,d)=>{const[p]=d,f=!0,m=Pn(p);return be(h,L(me(h,e,f),m))}}})(t)}const Yf=W({logSoftmax_:H$});function q$(n,e=null,t=!1){const s=A(n,"x","logSumExp"),o=ve(e,s.shape),r=$n(s,o,!0),i=be(s,r),a=Pn(i),l=me(a,o),c=zn(l),u=te(V(r,c.shape),c);if(t){const h=at(u.shape,o);return V(u,h)}return u}const Zf=W({logSumExp_:q$});function K$(n,e){const t=A(n,"a","logicalAnd","bool"),s=A(e,"b","logicalAnd","bool");we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(Sa,o)}const ss=W({logicalAnd_:K$});function j$(n){const t={x:A(n,"x","logicalNot","bool")};return M.runKernel(Na,t)}const ch=W({logicalNot_:j$});function X$(n,e){const t=A(n,"a","logicalOr","bool"),s=A(e,"b","logicalOr","bool");we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(Ta,o)}const Jf=W({logicalOr_:X$});function Y$(n,e){const t=A(n,"a","logicalXor","bool"),s=A(e,"b","logicalXor","bool");return we(t.shape,s.shape),ss(Jf(n,e),ch(ss(n,e)))}const Z$=W({logicalXor_:Y$});function J$(n,e,t,s,o){const r=A(n,"x","maxPool"),i=1;let a=r,l=!1;r.rank===3&&(l=!0,a=V(r,[1,r.shape[0],r.shape[1],r.shape[2]])),S(a.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${a.rank}.`),S(At(t,i),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${t} and dilations '${i}'`),Gt("maxPool",s,o);const c={x:a},u={filterSize:e,strides:t,pad:s,dimRoundingMode:o},h=M.runKernel(Aa,c,u);return l?V(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const uh=W({maxPool_:J$});function Q$(n,e=[1,1,1],t,s,o,r="NDHWC"){const i=A(n,"x","maxPool3d");let a=i,l=!1;i.rank===4&&(l=!0,a=V(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]])),S(a.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${a.rank}.`),S(r==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${r}`),Gt("maxPool3d",s,o);const c={x:a},u={filterSize:e,strides:t,pad:s,dimRoundingMode:o,dataFormat:r},h=M.runKernel(Da,c,u);return l?V(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}const ev=W({maxPool3d_:Q$});function tv(n,e){let t=A(n,"a","maximum"),s=A(e,"b","maximum");[t,s]=tt(t,s),t.dtype==="bool"&&(t=re(t,"int32"),s=re(s,"int32")),we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(Mr,o)}const ws=W({maximum_:tv});function nv(n,e=null,t=!1){const o={x:A(n,"x","mean")},r={axis:e,keepDims:t};return M.runKernel(Fa,o,r)}const lt=W({mean_:nv});function ot(n,e="float32"){if(Jn(n),e==="complex64"){const s=ot(n,"float32"),o=ot(n,"float32");return Gs(s,o)}const t=Rt(K(n),e);return M.makeTensor(t,n,e)}function os(n,e="float32"){if(Jn(n),e==="complex64"){const s=os(n,"float32"),o=ot(n,"float32");return Gs(s,o)}const t=Vc(K(n),e);return M.makeTensor(t,n,e)}function sv(n,e){let t=A(n,"a","minimum"),s=A(e,"b","minimum");[t,s]=tt(t,s),t.dtype==="bool"&&(t=re(t,"int32"),s=re(s,"int32")),we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(Pr,o)}const xi=W({minimum_:sv});function ov(n,e,t){S(t==="reflect"||t==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${t}.`);const s=A(n,"x","mirrorPad");if(s.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");S(e.length===s.rank,()=>`Padding doesn't match input. Must be ${s.rank}. Got ${e.length}.`);const o=t==="reflect"?1:0;for(let a=0;a<s.rank;a++)S(e[a].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),S(e[a][0]>=0&&e[a][0]<=s.shape[a]-o&&e[a][1]>=0&&e[a][1]<=s.shape[a]-o,()=>`Padding in dimension ${a} cannot be greater than or equal to ${s.shape[a]-o} or less than 0 for input of shape ${s.shape}`);const r={paddings:e,mode:t},i={x:s};return M.runKernel(Oa,i,r)}const rv=W({mirrorPad_:ov});function iv(n,e){let t=A(n,"a","mod"),s=A(e,"b","mod");[t,s]=tt(t,s);const o={a:t,b:s};return M.runKernel(zr,o)}const av=W({mod_:iv});function lv(n,e=null,t=!1){n=A(n,"x","moments");const s=ve(e,n.shape),o=lt(n,s,t);let r=o.shape;t||(r=at(o.shape,s));const i=je(be(re(n,"float32"),V(o,r))),a=lt(i,s,t);return{mean:o,variance:a}}const Cl=W({moments_:lv});function cv(n,e){let t=A(n,"a","notEqual","string_or_numeric"),s=A(e,"b","notEqual","string_or_numeric");[t,s]=tt(t,s),we(t.shape,s.shape);const o={a:t,b:s};return M.runKernel(Ma,o)}const Il=W({notEqual_:cv});function uv(n,e,t=1,s=0,o="int32"){if(e<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${e}`);const i={indices:A(n,"indices","oneHot","int32")},a={dtype:o,depth:e,onValue:t,offValue:s};return M.runKernel(za,i,a)}const Qf=W({oneHot_:uv});function hv(n){const t={x:A(n,"x","onesLike")};return M.runKernel(Pa,t)}const hn=W({onesLike_:hv});function dv(n,e,t=0){const s=A(n,"x","pad");if(s.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");const o={paddings:e,constantValue:t},r={x:s};return M.runKernel(Va,r,o)}const hh=W({pad_:dv});function pv(n,e,t){const s=A(n,"x","spaceToBatchND");S(s.rank>=1+e.length,()=>`input rank ${s.rank} should be > than [blockShape] ${e.length}`),S(t.length===e.length,()=>`paddings.shape[0] ${t.length} must be equal to [blockShape] ${e.length}`),S(s.shape.reduce((i,a,l)=>l>0&&l<=e.length?i&&(a+t[l-1][0]+t[l-1][1])%e[l-1]===0:i,!0),()=>`input spatial dimensions ${s.shape.slice(1)} with paddings ${t.toString()} must be divisible by blockShapes ${e.toString()}`);const o={x:s},r={blockShape:e,paddings:t};return M.runKernel(Za,o,r)}const dh=W({spaceToBatchND_:pv});function fv(n,e,t,s,o,r,i){o==null&&(o=[1,1]),r==null&&(r=1),s===0&&(s="valid");const a=A(n,"x","maxPool");let l=a,c=!1;a.rank===3&&(c=!0,l=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),S(At(r,o),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${r} and dilations '${o}'`);const u=un(l.shape,e,r,o,s),h=[u.dilationHeight,u.dilationWidth];let d;s==="same"?d=gv([u.filterHeight,u.filterWidth],h):d=[[0,0],[0,0]];const p=h[0]===1&&h[1]===1,[f,m]=mv([u.inHeight,u.inWidth],h,d),g=p?s:"valid",x=p?l:dh(l,h,f),w=(t==="avg"?()=>Qu(x,e,r,g,i):()=>uh(x,e,r,g,i))(),y=p?w:eh(w,h,m);return c?V(y,[y.shape[1],y.shape[2],y.shape[3]]):y}function mv(n,e,t){const s=t.map(u=>u[0]),o=t.map(u=>u[1]),r=n.concat(s,o),i=e.map((u,h)=>(u-r[h]%u)%u),a=o.map((u,h)=>u+i[h]),l=e.map((u,h)=>[s[h],a[h]]),c=e.map((u,h)=>[0,i[h]]);return[l,c]}function gv(n,e){const s=n.map((i,a)=>i+(i-1)*(e[a]-1)).map(i=>i-1),o=s.map(i=>Math.floor(i/2)),r=s.map((i,a)=>i-o[a]);return s.map((i,a)=>[o[a],r[a]])}const xv=W({pool_:fv});function bv(n,e){const t=A(n,"x","prelu"),s=A(e,"alpha","prelu"),o={x:t,alpha:s};return M.runKernel(Wa,o)}const ph=W({prelu_:bv});function yv(n,e=null,t=!1){let s=A(n,"x","prod");s.dtype==="bool"&&(s=re(s,"int32"));const o={x:s},r={axis:e,keepDims:t};return M.runKernel(Ua,o,r)}const wv=W({prod_:yv});var $l={exports:{}},Cv=$l.exports,em;function Iv(){return em||(em=1,(function(n){(function(e,t,s){function o(l){var c=this,u=a();c.next=function(){var h=2091639*c.s0+c.c*23283064365386963e-26;return c.s0=c.s1,c.s1=c.s2,c.s2=h-(c.c=h|0)},c.c=1,c.s0=u(" "),c.s1=u(" "),c.s2=u(" "),c.s0-=u(l),c.s0<0&&(c.s0+=1),c.s1-=u(l),c.s1<0&&(c.s1+=1),c.s2-=u(l),c.s2<0&&(c.s2+=1),u=null}function r(l,c){return c.c=l.c,c.s0=l.s0,c.s1=l.s1,c.s2=l.s2,c}function i(l,c){var u=new o(l),h=c&&c.state,d=u.next;return d.int32=function(){return u.next()*4294967296|0},d.double=function(){return d()+(d()*2097152|0)*11102230246251565e-32},d.quick=d,h&&(typeof h=="object"&&r(h,u),d.state=function(){return r(u,{})}),d}function a(){var l=4022871197,c=function(u){u=String(u);for(var h=0;h<u.length;h++){l+=u.charCodeAt(h);var d=.02519603282416938*l;l=d>>>0,d-=l,d*=l,l=d>>>0,d-=l,l+=d*4294967296}return(l>>>0)*23283064365386963e-26};return c}t&&t.exports?t.exports=i:this.alea=i})(Cv,n)})($l)),$l.exports}var vl={exports:{}},$v=vl.exports,tm;function vv(){return tm||(tm=1,(function(n){(function(e,t,s){function o(a){var l=this,c="";l.x=0,l.y=0,l.z=0,l.w=0,l.next=function(){var h=l.x^l.x<<11;return l.x=l.y,l.y=l.z,l.z=l.w,l.w^=l.w>>>19^h^h>>>8},a===(a|0)?l.x=a:c+=a;for(var u=0;u<c.length+64;u++)l.x^=c.charCodeAt(u)|0,l.next()}function r(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l}function i(a,l){var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(typeof u=="object"&&r(u,c),h.state=function(){return r(c,{})}),h}t&&t.exports?t.exports=i:this.xor128=i})($v,n)})(vl)),vl.exports}var kl={exports:{}},kv=kl.exports,nm;function Sv(){return nm||(nm=1,(function(n){(function(e,t,s){function o(a){var l=this,c="";l.next=function(){var h=l.x^l.x>>>2;return l.x=l.y,l.y=l.z,l.z=l.w,l.w=l.v,(l.d=l.d+362437|0)+(l.v=l.v^l.v<<4^(h^h<<1))|0},l.x=0,l.y=0,l.z=0,l.w=0,l.v=0,a===(a|0)?l.x=a:c+=a;for(var u=0;u<c.length+64;u++)l.x^=c.charCodeAt(u)|0,u==c.length&&(l.d=l.x<<10^l.x>>>4),l.next()}function r(a,l){return l.x=a.x,l.y=a.y,l.z=a.z,l.w=a.w,l.v=a.v,l.d=a.d,l}function i(a,l){var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(typeof u=="object"&&r(u,c),h.state=function(){return r(c,{})}),h}t&&t.exports?t.exports=i:this.xorwow=i})(kv,n)})(kl)),kl.exports}var Sl={exports:{}},Nv=Sl.exports,sm;function Tv(){return sm||(sm=1,(function(n){(function(e,t,s){function o(a){var l=this;l.next=function(){var u=l.x,h=l.i,d,p;return d=u[h],d^=d>>>7,p=d^d<<24,d=u[h+1&7],p^=d^d>>>10,d=u[h+3&7],p^=d^d>>>3,d=u[h+4&7],p^=d^d<<7,d=u[h+7&7],d=d^d<<13,p^=d^d<<9,u[h]=p,l.i=h+1&7,p};function c(u,h){var d,p=[];if(h===(h|0))p[0]=h;else for(h=""+h,d=0;d<h.length;++d)p[d&7]=p[d&7]<<15^h.charCodeAt(d)+p[d+1&7]<<13;for(;p.length<8;)p.push(0);for(d=0;d<8&&p[d]===0;++d);for(d==8?p[7]=-1:p[d],u.x=p,u.i=0,d=256;d>0;--d)u.next()}c(l,a)}function r(a,l){return l.x=a.x.slice(),l.i=a.i,l}function i(a,l){a==null&&(a=+new Date);var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(u.x&&r(u,c),h.state=function(){return r(c,{})}),h}t&&t.exports?t.exports=i:this.xorshift7=i})(Nv,n)})(Sl)),Sl.exports}var Nl={exports:{}},Ev=Nl.exports,om;function Rv(){return om||(om=1,(function(n){(function(e,t,s){function o(a){var l=this;l.next=function(){var u=l.w,h=l.X,d=l.i,p,f;return l.w=u=u+1640531527|0,f=h[d+34&127],p=h[d=d+1&127],f^=f<<13,p^=p<<17,f^=f>>>15,p^=p>>>12,f=h[d]=f^p,l.i=d,f+(u^u>>>16)|0};function c(u,h){var d,p,f,m,g,x=[],b=128;for(h===(h|0)?(p=h,h=null):(h=h+"\0",p=0,b=Math.max(b,h.length)),f=0,m=-32;m<b;++m)h&&(p^=h.charCodeAt((m+32)%h.length)),m===0&&(g=p),p^=p<<10,p^=p>>>15,p^=p<<4,p^=p>>>13,m>=0&&(g=g+1640531527|0,d=x[m&127]^=p+g,f=d==0?f+1:0);for(f>=128&&(x[(h&&h.length||0)&127]=-1),f=127,m=512;m>0;--m)p=x[f+34&127],d=x[f=f+1&127],p^=p<<13,d^=d<<17,p^=p>>>15,d^=d>>>12,x[f]=p^d;u.w=g,u.X=x,u.i=f}c(l,a)}function r(a,l){return l.i=a.i,l.w=a.w,l.X=a.X.slice(),l}function i(a,l){a==null&&(a=+new Date);var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(u.X&&r(u,c),h.state=function(){return r(c,{})}),h}t&&t.exports?t.exports=i:this.xor4096=i})(Ev,n)})(Nl)),Nl.exports}var Tl={exports:{}},Av=Tl.exports,rm;function Dv(){return rm||(rm=1,(function(n){(function(e,t,s){function o(a){var l=this,c="";l.next=function(){var h=l.b,d=l.c,p=l.d,f=l.a;return h=h<<25^h>>>7^d,d=d-p|0,p=p<<24^p>>>8^f,f=f-h|0,l.b=h=h<<20^h>>>12^d,l.c=d=d-p|0,l.d=p<<16^d>>>16^f,l.a=f-h|0},l.a=0,l.b=0,l.c=-1640531527,l.d=1367130551,a===Math.floor(a)?(l.a=a/4294967296|0,l.b=a|0):c+=a;for(var u=0;u<c.length+20;u++)l.b^=c.charCodeAt(u)|0,l.next()}function r(a,l){return l.a=a.a,l.b=a.b,l.c=a.c,l.d=a.d,l}function i(a,l){var c=new o(a),u=l&&l.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var d=c.next()>>>11,p=(c.next()>>>0)/4294967296,f=(d+p)/(1<<21);while(f===0);return f},h.int32=c.next,h.quick=h,u&&(typeof u=="object"&&r(u,c),h.state=function(){return r(c,{})}),h}t&&t.exports?t.exports=i:this.tychei=i})(Av,n)})(Tl)),Tl.exports}var El={exports:{}},Fv={},_v=Object.freeze({__proto__:null,default:Fv}),Ov=ww(_v),Lv=El.exports,im;function Mv(){return im||(im=1,(function(n){(function(e,t,s){var o=256,r=6,i=52,a="random",l=s.pow(o,r),c=s.pow(2,i),u=c*2,h=o-1,d;function p(y,C,$){var v=[];C=C==!0?{entropy:!0}:C||{};var k=x(g(C.entropy?[y,w(t)]:y==null?b():y,3),v),N=new f(v),T=function(){for(var I=N.g(r),E=l,R=0;I<c;)I=(I+R)*o,E*=o,R=N.g(1);for(;I>=u;)I/=2,E/=2,R>>>=1;return(I+R)/E};return T.int32=function(){return N.g(4)|0},T.quick=function(){return N.g(4)/4294967296},T.double=T,x(w(N.S),t),(C.pass||$||function(I,E,R,D){return D&&(D.S&&m(D,N),I.state=function(){return m(N,{})}),R?(s[a]=I,E):I})(T,k,"global"in C?C.global:this==s,C.state)}function f(y){var C,$=y.length,v=this,k=0,N=v.i=v.j=0,T=v.S=[];for($||(y=[$++]);k<o;)T[k]=k++;for(k=0;k<o;k++)T[k]=T[N=h&N+y[k%$]+(C=T[k])],T[N]=C;(v.g=function(I){for(var E,R=0,D=v.i,F=v.j,_=v.S;I--;)E=_[D=h&D+1],R=R*o+_[h&(_[D]=_[F=h&F+E])+(_[F]=E)];return v.i=D,v.j=F,R})(o)}function m(y,C){return C.i=y.i,C.j=y.j,C.S=y.S.slice(),C}function g(y,C){var $=[],v=typeof y,k;if(C&&v=="object")for(k in y)try{$.push(g(y[k],C-1))}catch(N){}return $.length?$:v=="string"?y:y+"\0"}function x(y,C){for(var $=y+"",v,k=0;k<$.length;)C[h&k]=h&(v^=C[h&k]*19)+$.charCodeAt(k++);return w(C)}function b(){try{var y;return d&&(y=d.randomBytes)?y=y(o):(y=new Uint8Array(o),(e.crypto||e.msCrypto).getRandomValues(y)),w(y)}catch(v){var C=e.navigator,$=C&&C.plugins;return[+new Date,e,$,e.screen,w(t)]}}function w(y){return String.fromCharCode.apply(0,y)}if(x(s.random(),t),n.exports){n.exports=p;try{d=Ov}catch(y){}}else s["seed"+a]=p})(typeof self!="undefined"?self:Lv,[],Math)})(El)),El.exports}var fh,am;function Pv(){if(am)return fh;am=1;var n=Iv(),e=vv(),t=Sv(),s=Tv(),o=Rv(),r=Dv(),i=Mv();return i.alea=n,i.xor128=e,i.xorwow=t,i.xorshift7=s,i.xor4096=o,i.tychei=r,fh=i,fh}var mh=Pv();class lm{constructor(e,t,s,o,r){this.mean=e,this.stdDev=t,this.dtype=s,this.nextVal=NaN,this.truncated=o,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);const i=r||Math.random();this.random=mh.alea(i.toString())}nextValue(){if(!isNaN(this.nextVal)){const o=this.nextVal;return this.nextVal=NaN,o}let e,t,s=!1;for(;!s;){let o,r,i;do o=2*this.random()-1,r=2*this.random()-1,i=o*o+r*r;while(i>=1||i===0);const a=Math.sqrt(-2*Math.log(i)/i);e=this.mean+this.stdDev*o*a,t=this.mean+this.stdDev*r*a,(!this.truncated||this.isValidTruncated(e))&&(s=!0)}return(!this.truncated||this.isValidTruncated(t))&&(this.nextVal=this.convertValue(t)),this.convertValue(e)}convertValue(e){return this.dtype==null||this.dtype==="float32"?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}}class zv{constructor(e=0,t=1,s,o){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=e,this.range=t-e,this.dtype=s,o==null&&(o=Math.random()),typeof o=="number"&&(o=o.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=mh.alea(o)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}function Bv(n,e=0,t=1,s,o){if(Jn(n),s!=null&&s==="bool")throw new Error(`Unsupported data type ${s}`);const r=new lm(e,t,s,!1,o),i=ke(n,s);for(let a=0;a<i.values.length;a++)i.values[a]=r.nextValue();return i.toTensor()}const Vv=W({randomNormal_:Bv});function Wv(n,e=0,t=1,s="float32",o){Jn(n);const r=ke(n,s),i=new zv(e,t,null,o);for(let a=0;a<r.values.length;a++)r.values[a]=i.nextValue();return r.toTensor()}const bi=W({randomUniform_:Wv});function yi(n,e,t=1,s="float32"){if(t===0)throw new Error("Cannot have a step of zero");const o={start:n,stop:e,step:t,dtype:s};return M.runKernel($u,{},o)}function Uv(n){const t={input:A(n,"input","real")};return M.runKernel(vu,t)}const Rl=W({real_:Uv});function Gv(n){const t={x:A(n,"x","reciprocal")};return M.runKernel(Wr,t)}const Hv=W({reciprocal_:Gv});function qv(n){const t={x:A(n,"x","relu")};return M.runKernel(Ur,t)}const no=W({relu_:qv});function Kv(n){const t={x:A(n,"x","relu6")};return M.runKernel(Gr,t)}const cm=W({relu6_:Kv});function jv(n,e){const s={x:A(n,"x","reverse")},o={dims:e};return M.runKernel(Ka,s,o)}const so=W({reverse_:jv});function Xv(n){const t={x:A(n,"x","round")};return M.runKernel(Hr,t)}const um=W({round_:Xv});function Yv(n){const t={x:A(n,"x","rsqrt","float32")};return M.runKernel(qr,t)}const Al=W({rsqrt_:Yv});function Zv(n){const t={x:A(n,"x","selu")};return M.runKernel(Kr,t)}const hm=W({selu_:Zv});function Jv(n,e,t,s,o,r=[1,1],i="NHWC"){const a=A(n,"x","separableConv2d"),l=A(e,"depthwiseFilter","separableConv2d"),c=A(t,"pointwiseFilter","separableConv2d");let u=a,h=!1;if(a.rank===3&&(h=!0,u=V(a,[1,a.shape[0],a.shape[1],a.shape[2]])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");S(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),S(l.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${l.rank}.`),S(c.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${l.rank}.`),S(c.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${c.shape[0]}.`),S(c.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${c.shape[1]}.`);const d=l.shape[2],p=l.shape[3];S(c.shape[2]===d*p,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${d*p}, but got ${c.shape[2]}.`);const f=oh(u,l,s,o,i,r),g=Qs(f,c,1,"valid",i);return h?V(g,[g.shape[1],g.shape[2],g.shape[3]]):g}const dm=W({separableConv2d_:Jv});function Qv(n){const t={x:A(n,"x","sign")};return M.runKernel(Yr,t)}const ek=W({sign_:Qv});function tk(n){const t={x:A(n,"x","sin","float32")};return M.runKernel(jr,t)}const pm=W({sin_:tk});function nk(n){const t={x:A(n,"x","sinh")};return M.runKernel(Xr,t)}const fm=W({sinh_:nk});function sk(n,e,t){const s=A(n,"x","slice1d");return S(s.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${s.rank} tensor`),He(s,[e],[t])}const gh=W({slice1d_:sk});function ok(n,e,t){const s=A(n,"x","slice2d");return S(s.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${s.rank} tensor`),He(s,e,t)}const mm=W({slice2d_:ok});function rk(n,e,t){const s=A(n,"x","slice3d");return S(s.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${s.rank} tensor`),He(s,e,t)}const xh=W({slice3d_:rk});function ik(n,e,t){const s=A(n,"x","slice4d");return S(s.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${s.rank} tensor`),He(s,e,t)}const Dl=W({slice4d_:ik});function ak(n,e=-1){const t=A(n,"logits","softmax","float32");if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${t.rank} and dim was ${e}`);const s={logits:t},o={dim:e};return M.runKernel(Qa,s,o)}const bh=W({softmax_:ak});function lk(n){S(n.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${n.dtype}.`);const e={input:n};return M.runKernel(du,e)}const gm=W({fft_:lk});function ck(n){S(n.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${n.dtype}.`);const e={input:n};return M.runKernel(mu,e)}const yh=W({ifft_:ck});function uk(n){const e=n.shape[n.shape.length-1],t=n.size/e;let s;if(e<=2){const o=V(n,[t,e]);s=yh(o)}else{const o=[t,2*(e-1)],r=V(Rl(n),[t,e]),i=V(ah(n),[t,e]),a=so(He(r,[0,1],[t,e-2]),1),l=L(so(He(i,[0,1],[t,e-2]),1),Oe(-1)),c=vt([r,a],1),u=vt([i,l],1),h=V(Gs(c,u),[o[0],o[1]]);s=yh(h)}if(s=Rl(s),n.rank===3&&n.shape[0]!==0){const o=s,r=n.shape[0];s=V(s,[r,s.shape[0]/r,s.shape[1]]),o.dispose()}return s}const hk=W({irfft_:uk});function dk(n,e,t=0){const o={x:A(n,"x","split")},r={numOrSizeSplits:e,axis:t};return M.runKernel(Ja,o,r)}const on=W({split_:dk});function pk(n,e){S(n.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${n.dtype}`);let t=n.shape[n.shape.length-1];const s=n.size/t;let o;if(e!=null&&e<t){const f=n.shape.map(g=>0),m=n.shape.map(g=>g);m[n.shape.length-1]=e,o=He(n,f,m),t=e}else if(e!=null&&e>t){const f=n.shape.map(m=>m);f[n.shape.length-1]=e-t,o=vt([n,ot(f)],n.shape.length-1),t=e}else o=n;const r=Ee(o),i=V(Gs(o,r),[s,t]),a=gm(i),l=Math.floor(t/2)+1,c=Rl(a),u=ah(a),h=on(c,[l,t-l],c.shape.length-1),d=on(u,[l,t-l],u.shape.length-1),p=o.shape.slice();return p[o.shape.length-1]=l,V(Gs(h[0],d[0]),p)}const fk=W({rfft_:pk});function mk(n,e){let t=A(n,"a","squaredDifference"),s=A(e,"b","squaredDifference");[t,s]=tt(t,s),we(t.shape,s.shape);const o={a:t,b:s},r={};return M.runKernel(ei,o,r)}const gk=W({squaredDifference_:mk});function xk(n,e){const t=A(n,"x","squeeze","string_or_numeric");return V(t,ds(t.shape,e).newShape)}const oo=W({squeeze_:xk});function bk(n,e=0){const t=If(n,"tensors","stack","string_or_numeric");S(t.length>=1,()=>"Pass at least one tensor to tf.stack"),t.length>0&&S(e<=t[0].rank,()=>"Axis must be <= rank of the tensor");const s=t,o={axis:e};return M.runKernel(Ba,s,o)}const Bn=W({stack_:bk});function yk(n,e=0){const s={x:A(n,"x","step")},o={alpha:e};return M.runKernel(ri,s,o)}const wi=W({step_:yk});function wk(n,e,t,s,o=0,r=0,i=0,a=0,l=0){const u={x:A(n,"x","stridedSlice","string_or_numeric")},h={begin:e,end:t,strides:s,beginMask:o,endMask:r,ellipsisMask:i,newAxisMask:a,shrinkAxisMask:l};return M.runKernel(Eu,u,h)}const Ck=W({stridedSlice_:wk});function Ik(n){const t={x:A(n,"x","tan","float32")};return M.runKernel(ni,t)}const $k=W({tan_:Ik});function Zt(n,e){wp(n);const t=ul(n,e);if(t.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return hl(n,null,t,e)}function wh(n,e,t){if(wp(n),e!=null&&e.length!==2)throw new Error("tensor2d() requires shape to have two numbers");const s=ul(n,t);if(s.length!==2&&s.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(s.length===1&&e==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return hl(n,e,s,t)}function ro(n,e,t){const s=e.shape.length,o=s>1?e.shape[s-1]:1,r=t.length;let i=1;for(let h=o;h<r;++h)i*=t[h];const a=o<1?1:o,l=K(e.shape)/a,c=[...fe(t.slice(0,o)),1],u=K(t);return{sliceRank:o,numUpdates:l,sliceSize:i,strides:c,outputSize:u}}function vk(n,e=1,t=!0){const s=A(n,"x","topk");if(s.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");const o=s.shape[s.shape.length-1];if(e<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${e}`);if(e>o)throw new Error(`'k' passed to topk() must be <= the last dimension (${o}) but got ${e}`);const r={x:s},i={k:e,sorted:t},[a,l]=M.runKernel(Ru,r,i);return{values:a,indices:l}}const kk=W({topk_:vk});function Sk(n,e=0,t=1,s,o){if(Jn(n),s!=null&&s==="bool")throw new Error("Unsupported data type $ { dtype }");const r=new lm(e,t,s,!0,o),i=ke(n,s);for(let a=0;a<i.values.length;a++)i.values[a]=r.nextValue();return i.toTensor()}const xm=W({truncatedNormal_:Sk});function Nk(n,e=0){const t=A(n,"x","unique","string_or_numeric");S(t.rank>0,()=>"The input tensor must be at least 1D");const s={x:t},o={axis:e},[r,i]=M.runKernel(Du,s,o);return{values:r,indices:i}}const Tk=W({unique_:Nk});function Ek(n,e,t){const s=A(n,"x","unsortedSegmentSum"),o=A(e,"segmentIds","unsortedSegmentSum","int32");S(So(t),()=>"numSegments must be of dtype int");const r={x:s,segmentIds:o},i={numSegments:t};return M.runKernel(tl,r,i)}const bm=W({unsortedSegmentSum_:Ek});function Rk(n,e=0){const t=A(n,"x","unstack","string_or_numeric");S(e>=-t.shape.length&&e<t.shape.length,()=>`Axis = ${e} is not in [-${t.shape.length}, ${t.shape.length})`);const s={value:t},o={axis:e};return M.runKernel(el,s,o)}const Cs=W({unstack_:Rk});function Ak(n,e=!0,t,s){return M.makeVariable(n,e,t,s)}function ym(n,e){const t=[];for(let r=0;r<e.length;r++)e[r]&&t.push(r);const s=ke(n,"int32"),o=ke([t.length,n.length],"int32");for(let r=0;r<t.length;r++){const i=s.indexToLoc(t[r]),a=r*n.length;o.values.set(i,a)}return o.toTensor()}function Dk(n,e,t){const s=A(n,"x","transpose");if(e==null&&(e=s.shape.map((i,a)=>a).reverse()),S(s.rank===e.length,()=>`Error in transpose: rank of input ${s.rank} must match length of perm ${e}.`),e.forEach(i=>{S(i>=0&&i<s.rank,()=>`All entries in 'perm' must be between 0 and ${s.rank-1} but got ${e}`)}),s.rank<=1)return s.clone();const o={x:s},r={perm:e};return s.dtype==="complex64"?B(()=>{let i=Rl(s),a=ah(s);return i=M.runKernel(Ao,{x:i},r),a=M.runKernel(Ao,{x:a},r),t&&(a=st(a)),Gs(i,a)}):M.runKernel(Ao,o,r)}const Re=W({transpose_:Dk});function Fk(n,e){if(e==null)return n.shape.slice();if(_e(n.shape,e))return e;if(n.shape.length===e.length){const t=[];for(let s=0;s<n.shape.length;s++)e[s]==null&&n.shape[s]!=null?t.push(n.shape[s]):t.push(e[s]);return t}return e}function _k(n,e,t,s){const o=A(n,"x","dropout");if(S(o.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${o.dtype} tensor instead.`),S(e>=0&&e<1,()=>`rate must be a float in the range [0, 1), but got ${e}.`),e===0)return n instanceof ct?o.clone():o;const r=Fk(o,t),i=1-e,a=ge(yl(te(bi(r,0,1,"float32",s),i)),i);return L(o,a)}const Ok=W({dropout_:_k});function Lk(n,e,t,s,o,r="NHWC",i){let a=n;n.rank===3&&(a=V(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let l=e;l.rank===3&&(l=V(e,[1,e.shape[0],e.shape[1],e.shape[2]])),S(a.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${a.shape}.`),S(l.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${l.shape}.`),S(t.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${t}.`);const c=r==="NHWC"?a.shape[3]:a.shape[1],u=r==="NHWC"?l.shape[3]:l.shape[1];S(c===t[2],()=>`Error in conv2dDerFilter: depth of input ${c}) must match input depth in filter (${t[2]}.`),S(u===t[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${t[3]}).`),Gt("conv2dDerFilter",o,i);const h={x:a,dy:l},d={strides:s,pad:o,dataFormat:r,dimRoundingMode:i,filterShape:t};return M.runKernel(Qc,h,d)}const Ch=W({conv2DBackpropFilter_:Lk});function Ih(n,e,t){if(t==null||t==="linear")return n;if(t==="relu")return L(n,wi(e));throw new Error(`Cannot compute gradient for fused activation ${t}.`)}function $h(n,e){let t=e;const s=ht(n.shape,e.shape);return s.length>0&&(t=me(t,s)),V(t,n.shape)}function vh(n,e,t,s){if(e==="linear")return n;if(e==="relu")return no(n);if(e==="elu")return gl(n);if(e==="relu6")return cm(n);if(e==="prelu")return ph(n,t);if(e==="leakyrelu")return lh(n,s);if(e==="sigmoid")return Mo(n);throw new Error(`Unknown fused activation ${e}.`)}const kh=(n,e)=>!(n>0)||e==="linear";function Mk({x:n,filter:e,strides:t,pad:s,dataFormat:o="NHWC",dilations:r=[1,1],dimRoundingMode:i,bias:a,activation:l="linear",preluActivationWeights:c,leakyreluAlpha:u}){if(l=l||"linear",kh(M.state.gradientDepth,l)===!1){S(o==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${o} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let $=Qs(n,e,t,s,o,r,i);return a!=null&&($=te($,a)),vh($,l,c,u)}const h=A(n,"x","conv2d","float32"),d=A(e,"filter","conv2d","float32");let p=h,f=!1;h.rank===3&&(f=!0,p=V(h,[1,h.shape[0],h.shape[1],h.shape[2]])),S(p.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${p.rank}.`),S(d.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${d.rank}.`),Gt("fused conv2d",s,i);const m=o==="NHWC"?p.shape[3]:p.shape[1];S(d.shape[2]===m,()=>`Error in conv2d: depth of input (${m}) must match input depth for filter ${d.shape[2]}.`),S(At(t,r),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${t} and dilations '${r}'`);const g=$t(p.shape,d.shape,t,r,s,i);let x;a!=null&&(x=A(a,"bias","fused conv2d"),[x]=tt(x,h),o==="NHWC"?we(g.outShape,x.shape):(S(x.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${x.shape.length}.`),S(x.shape.length===0||x.shape[0]===g.outChannels||x.shape[0]===1,()=>`Error in fused conv2d: bias shape (${x.shape}) is not compatible with the number of output channels (${g.outChannels})`)));let b;if(c!=null){const $=c.shape;if(S($.length<=1||$.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${$.length}.`),$.length===1)S($[0]===1||$[0]===g.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${$}) is not compatible with the number of output channels (${g.outChannels}).`);else if($.length===3)try{we($,g.outShape)}catch(v){const k=`Error in fused conv2d: PReLU activation weights (${$}) is not compatible with the output shape of the conv2d (${g.outShape}).`;throw Error(k)}b=A(c,"prelu weights","fused conv2d")}const w=($,v)=>{S(o==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${o} but only NHWC is currently supported.`);const[k,N,T,I]=v,E=Ih($,T,l);S(Zs(r),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${r}'`);const R=th(N.shape,E,k,t,s),D=Ch(N,E,k.shape,t,s),F=[R,D];if(I!=null){const _=$h(I,E);F.push(_)}return F},y={x:p,filter:d,bias:x,preluActivationWeights:b},C={strides:t,pad:s,dataFormat:o,dilations:r,dimRoundingMode:i,activation:l,leakyreluAlpha:u};return a==null?Vo((v,k,N)=>{let T=M.runKernel(ol,y,C);return N([k,v,T]),f&&(T=V(T,[T.shape[1],T.shape[2],T.shape[3]])),{value:T,gradFunc:w}})(p,d):Vo((v,k,N,T)=>{let I=M.runKernel(ol,y,C);return T([k,v,I,N]),f&&(I=V(I,[I.shape[1],I.shape[2],I.shape[3]])),{value:I,gradFunc:w}})(p,d,x)}const Pk=W({fusedConv2d_:Mk});function zk(n,e,t,s,o,r=[1,1],i){let a=n;n.rank===3&&(a=V(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let l=e;l.rank===3&&(l=V(e,[1,e.shape[0],e.shape[1],e.shape[2]]));const c={x:a,dy:l},u={strides:s,pad:o,dimRoundingMode:i,dilations:r,filterShape:t};return M.runKernel(iu,c,u)}const Bk=W({depthwiseConv2dNativeBackpropFilter_:zk});function Vk(n,e,t,s,o,r=[1,1],i){let a=e,l=!1;e.rank===3&&(l=!0,a=V(e,[1,e.shape[0],e.shape[1],e.shape[2]]));const c={dy:a,filter:t},u={strides:s,pad:o,dimRoundingMode:i,dilations:r,inputShape:n},h=M.runKernel(au,c,u);return l?V(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const Wk=W({depthwiseConv2dNativeBackpropInput_:Vk});function Uk({a:n,b:e,transposeA:t=!1,transposeB:s=!1,bias:o,activation:r="linear",preluActivationWeights:i,leakyreluAlpha:a=.2}){if(kh(M.state.gradientDepth,r)===!1){let I=Fe(n,e,t,s);return o!=null&&(I=te(I,o)),vh(I,r,i,a)}let l=A(n,"a","fused matMul"),c=A(e,"b","fused matMul");[l,c]=tt(l,c);const u=t?l.shape[l.rank-2]:l.shape[l.rank-1],h=s?c.shape[c.rank-1]:c.shape[c.rank-2],d=t?l.shape[l.rank-1]:l.shape[l.rank-2],p=s?c.shape[c.rank-2]:c.shape[c.rank-1],f=l.shape.slice(0,-2),m=c.shape.slice(0,-2),g=K(f),x=K(m);S(u===h,()=>`Error in fused matMul: inner shapes (${u}) and (${h}) of Tensors with shapes ${l.shape} and ${c.shape} and transposeA=${t} and transposeB=${s} must match.`);const w=we(l.shape.slice(0,-2),c.shape.slice(0,-2)).concat([d,p]),y=t?V(l,[g,u,d]):V(l,[g,d,u]),C=s?V(c,[x,p,h]):V(c,[x,h,p]);let $;o!=null&&($=A(o,"bias","fused matMul"),[$]=tt($,l),we(w,$.shape));let v;i!=null&&(v=A(i,"prelu weights","fused matMul"));const k=(I,E)=>{const[R,D,F,_]=E,P=Ih(V(I,F.shape),F,r);let z,H;if(!t&&!s?(z=Fe(P,D,!1,!0),H=Fe(R,P,!0,!1)):!t&&s?(z=Fe(P,D,!1,!1),H=Fe(P,R,!0,!1)):t&&!s?(z=Fe(D,P,!1,!0),H=Fe(R,P,!1,!1)):(z=Fe(D,P,!0,!0),H=Fe(P,R,!0,!0)),o!=null){const G=$h(_,P);return[z,H,G]}else return[z,H]},N={a:y,b:C,bias:$,preluActivationWeights:v},T={transposeA:t,transposeB:s,activation:r,leakyreluAlpha:a};return o==null?Vo((E,R,D)=>{const F=M.runKernel(sl,N,T);return D([E,R,F]),{value:V(F,w),gradFunc:k}})(y,C):Vo((E,R,D,F)=>{const _=M.runKernel(sl,N,T);return F([E,R,_,D]),{value:V(_,w),gradFunc:k}})(y,C,$)}const wm=W({fusedMatMul_:Uk});function Gk(n,e,t,s,o="bilinear",r=0){const i=A(n,"image","cropAndResize"),a=A(e,"boxes","cropAndResize","float32"),l=A(t,"boxInd","cropAndResize","int32"),c=a.shape[0];S(i.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${i.rank}.`),S(a.rank===2&&a.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${c},4] but had shape ${a.shape}.`),S(l.rank===1&&l.shape[0]===c,()=>`Error in cropAndResize: boxInd must be have size [${c}] but had shape ${a.shape}.`),S(s.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${s.length}.`),S(s[0]>=1&&s[1]>=1,()=>`cropSize must be atleast [1,1], but was ${s}`),S(o==="bilinear"||o==="nearest",()=>`method must be bilinear or nearest, but was ${o}`);const u={image:i,boxes:a,boxInd:l},h={method:o,extrapolationValue:r,cropSize:s};return M.runKernel(su,u,h)}const Hk=W({cropAndResize_:Gk});function qk(n){const e=A(n,"image","flipLeftRight","float32");S(e.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${e.rank}.`);const t={image:e};return M.runKernel(fu,t,{})}const Kk=W({flipLeftRight_:qk});function jk(n){const e=A(n,"image","grayscaleToRGB"),t=e.rank-1,s=e.shape[t];S(e.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${e.rank}.`),S(s===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${s}.`);const o=new Array(e.rank);return o.fill(1,0,t),o[t]=3,vn(e,o)}const Xk=W({grayscaleToRGB_:jk});function Yk(n){const e=A(n,"image","RGBToGrayscale"),t=e.rank-1,s=e.shape[t];S(e.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${e.rank}.`),S(s===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${s}.`);const o=e.dtype,r=re(e,"float32"),i=Zt([.2989,.587,.114]);let a;switch(e.rank){case 2:a=mi("ij,j->i",r,i);break;case 3:a=mi("ijk,k->ij",r,i);break;case 4:a=mi("ijkl,l->ijk",r,i);break;case 5:a=mi("ijklm,m->ijkl",r,i);break;case 6:a=mi("ijklmn,n->ijklm",r,i);break;default:throw new Error("Not a valid tensor rank.")}return a=Ht(a,-1),re(a,o)}const Zk=W({rgbToGrayscale_:Yk});function Jk(n,e,t=0,s=.5){const o=A(n,"image","rotateWithOffset","float32");S(o.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${o.rank}.`);const r={image:o},i={radians:e,fillValue:t,center:s};return M.runKernel(Fu,r,i)}const Qk=W({rotateWithOffset_:Jk});function Wo(n,e,t,s,o,r){s==null&&(s=.5),o==null&&(o=Number.NEGATIVE_INFINITY),r==null&&(r=0);const i=n.shape[0];return t=Math.min(t,i),S(0<=s&&s<=1,()=>`iouThreshold must be in [0, 1], but was '${s}'`),S(n.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${n.rank}'`),S(n.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${n.shape[1]}`),S(e.rank===1,()=>"scores must be a 1D tensor"),S(e.shape[0]===i,()=>`scores has incompatible shape with boxes. Expected ${i}, but was ${e.shape[0]}`),S(0<=r&&r<=1,()=>`softNmsSigma must be in [0, 1], but was '${r}'`),{maxOutputSize:t,iouThreshold:s,scoreThreshold:o,softNmsSigma:r}}function eS(n,e,t,s=.5,o=Number.NEGATIVE_INFINITY){const r=A(n,"boxes","nonMaxSuppression","float32"),i=A(e,"scores","nonMaxSuppression","float32"),a=Wo(r,i,t,s,o);t=a.maxOutputSize,s=a.iouThreshold,o=a.scoreThreshold;const l={maxOutputSize:t,iouThreshold:s,scoreThreshold:o};return M.runKernel(wu,{boxes:r,scores:i},l)}const tS=W({nonMaxSuppression_:eS});function nS(n,e,t){const s=sS(n,e,t),o=s<0?-(s+1):s;n.splice(o,0,e)}function sS(n,e,t){return rS(n,e,t||oS)}function oS(n,e){return n>e?1:n<e?-1:0}function rS(n,e,t){let s=0,o=n.length,r=0,i=!1;for(;s<o;){r=s+(o-s>>>1);const a=t(e,n[r]);a>0?s=r+1:(o=r,i=!a)}return i?s:-s-1}function Sh(n,e,t,s,o){return Eh(n,e,t,s,o,0)}function Nh(n,e,t,s,o,r){return Eh(n,e,t,s,o,0,!1,r,!0)}function Th(n,e,t,s,o,r){return Eh(n,e,t,s,o,r,!0)}function Eh(n,e,t,s,o,r,i=!1,a=!1,l=!1){const c=[];for(let g=0;g<e.length;g++)e[g]>o&&c.push({score:e[g],boxIndex:g,suppressBeginIndex:0});c.sort(Cm);const u=r>0?-.5/r:0,h=[],d=[];for(;h.length<t&&c.length>0;){const g=c.pop(),{score:x,boxIndex:b,suppressBeginIndex:w}=g;if(x<o)break;let y=!1;for(let C=h.length-1;C>=w;--C){const $=iS(n,b,h[C]);if($>=s){y=!0;break}if(g.score=g.score*aS(s,u,$),g.score<=o)break}g.suppressBeginIndex=h.length,y||(g.score===x?(h.push(b),d.push(g.score)):g.score>o&&nS(c,g,Cm))}const p=h.length,f=t-p;a&&f>0&&(h.push(...new Array(f).fill(0)),d.push(...new Array(f).fill(0)));const m={selectedIndices:h};return i&&(m.selectedScores=d),l&&(m.validOutputs=p),m}function iS(n,e,t){const s=n.subarray(e*4,e*4+4),o=n.subarray(t*4,t*4+4),r=Math.min(s[0],s[2]),i=Math.min(s[1],s[3]),a=Math.max(s[0],s[2]),l=Math.max(s[1],s[3]),c=Math.min(o[0],o[2]),u=Math.min(o[1],o[3]),h=Math.max(o[0],o[2]),d=Math.max(o[1],o[3]),p=(a-r)*(l-i),f=(h-c)*(d-u);if(p<=0||f<=0)return 0;const m=Math.max(r,c),g=Math.max(i,u),x=Math.min(a,h),b=Math.min(l,d),w=Math.max(x-m,0)*Math.max(b-g,0);return w/(p+f-w)}function aS(n,e,t){const s=Math.exp(e*t*t);return t<=n?s:0}function Cm(n,e){return n.score-e.score||n.score===e.score&&e.boxIndex-n.boxIndex}function lS(r,i,a){return X(this,arguments,function*(n,e,t,s=.5,o=Number.NEGATIVE_INFINITY){const l=A(n,"boxes","nonMaxSuppressionAsync"),c=A(e,"scores","nonMaxSuppressionAsync"),u=Wo(l,c,t,s,o);t=u.maxOutputSize,s=u.iouThreshold,o=u.scoreThreshold;const h=yield Promise.all([l.data(),c.data()]),d=h[0],p=h[1],{selectedIndices:f}=Sh(d,p,t,s,o);return l!==n&&l.dispose(),c!==e&&c.dispose(),Zt(f,"int32")})}const cS=lS;function uS(n,e,t,s=.5,o=Number.NEGATIVE_INFINITY,r=0){const i=A(n,"boxes","nonMaxSuppression"),a=A(e,"scores","nonMaxSuppression"),l=Wo(i,a,t,s,o,r);t=l.maxOutputSize,s=l.iouThreshold,o=l.scoreThreshold,r=l.softNmsSigma;const c={boxes:i,scores:a},u={maxOutputSize:t,iouThreshold:s,scoreThreshold:o,softNmsSigma:r},h=M.runKernel(Iu,c,u);return{selectedIndices:h[0],selectedScores:h[1]}}const hS=W({nonMaxSuppressionWithScore_:uS});function dS(i,a,l){return X(this,arguments,function*(n,e,t,s=.5,o=Number.NEGATIVE_INFINITY,r=0){const c=A(n,"boxes","nonMaxSuppressionAsync"),u=A(e,"scores","nonMaxSuppressionAsync"),h=Wo(c,u,t,s,o,r);t=h.maxOutputSize,s=h.iouThreshold,o=h.scoreThreshold,r=h.softNmsSigma;const d=yield Promise.all([c.data(),u.data()]),p=d[0],f=d[1],{selectedIndices:m,selectedScores:g}=Th(p,f,t,s,o,r);return c!==n&&c.dispose(),u!==e&&u.dispose(),{selectedIndices:Zt(m,"int32"),selectedScores:Zt(g)}})}const pS=dS;function fS(n,e,t,s=.5,o=Number.NEGATIVE_INFINITY,r=!1){const i=A(n,"boxes","nonMaxSuppression"),a=A(e,"scores","nonMaxSuppression"),l=Wo(i,a,t,s,o,null),c=l.maxOutputSize,u=l.iouThreshold,h=l.scoreThreshold,d={boxes:i,scores:a},p={maxOutputSize:c,iouThreshold:u,scoreThreshold:h,padToMaxOutputSize:r},f=M.runKernel(Cu,d,p);return{selectedIndices:f[0],validOutputs:f[1]}}const mS=W({nonMaxSuppressionPadded_:fS});function gS(i,a,l){return X(this,arguments,function*(n,e,t,s=.5,o=Number.NEGATIVE_INFINITY,r=!1){const c=A(n,"boxes","nonMaxSuppressionAsync"),u=A(e,"scores","nonMaxSuppressionAsync"),h=Wo(c,u,t,s,o,null),d=h.maxOutputSize,p=h.iouThreshold,f=h.scoreThreshold,[m,g]=yield Promise.all([c.data(),u.data()]),{selectedIndices:x,validOutputs:b}=Nh(m,g,d,p,f,r);return c!==n&&c.dispose(),u!==e&&u.dispose(),{selectedIndices:Zt(x,"int32"),validOutputs:Oe(b,"int32")}})}const xS=gS;function bS(n,e,t=!1,s=!1){const o=A(n,"images","resizeBilinear");S(o.rank===3||o.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${o.rank}.`),S(e.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${e}.`),S(s===!1||t===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let r=o,i=!1;o.rank===3&&(i=!0,r=V(o,[1,o.shape[0],o.shape[1],o.shape[2]]));const a={images:r},l={alignCorners:t,halfPixelCenters:s,size:e},c=M.runKernel(qa,a,l);return i?V(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const Im=W({resizeBilinear_:bS});function yS(n,e,t=!1,s=!1){const o=A(n,"images","resizeNearestNeighbor");S(o.rank===3||o.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${o.rank}.`),S(e.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${e}.`),S(o.dtype==="float32"||o.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),S(s===!1||t===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let r=o,i=!1;o.rank===3&&(i=!0,r=V(o,[1,o.shape[0],o.shape[1],o.shape[2]]));const a={images:r},l={alignCorners:t,halfPixelCenters:s,size:e},c=M.runKernel(Ha,a,l);return i?V(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const $m=W({resizeNearestNeighbor_:yS});function wS(n,e="binary",t=!1,s=.5){const o=A(n,"image","threshold"),r=.2989,i=.587,a=.114,l=o.shape[0]*o.shape[1];let c=L(Zt([s]),255),u,h,d,p;if(S(o.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${o.rank}.`),S(o.shape[2]===3||o.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${o.shape[2]}.`),S(o.dtype==="int32"||o.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${o.dtype}.`),S(e==="otsu"||e==="binary",()=>`Method must be binary or otsu, but was ${e}`),o.shape[2]===3){[u,h,d]=on(o,[1,1,1],-1);const g=L(u,r),x=L(h,i),b=L(d,a);p=te(te(g,x),b)}else p=n;if(e==="otsu"){const g=wI(re(um(p),"int32"),Hs([]),256);c=CS(g,l)}const f=t?Bo(p,c):qt(p,c);return re(L(f,255),"int32")}function CS(n,e){let t=Zt([-1]),s=Zt([0]),o=Zt([0]),r,i,a,l,c,u;for(let h=0;h<n.size-1;h++){r=He(n,0,h+1),i=He(n,h+1),c=ge(me(r),e),u=ge(me(i),e);const d=me(L(r,yi(0,r.size)));a=ge(d,me(r));const p=Po(i.shape,r.size),f=te(yi(0,i.size),p),m=L(i,f);l=ge(me(m),me(i));const g=be(a,l),x=be(a,l),b=L(c,u);o=L(L(b,g),x);const w=qt(o,s);s=dt(w,o,s),t=dt(w,Zt([h]),t)}return t}const IS=W({threshold_:wS});function $S(n,e,t="nearest",s="constant",o=0,r){const i=A(n,"image","transform","float32"),a=A(e,"transforms","transform","float32");S(i.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${i.rank}.`),S(a.rank===2&&(a.shape[0]===i.shape[0]||a.shape[0]===1)&&a.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),S(r==null||r.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${r}.`);const l={image:i,transforms:a},c={interpolation:t,fillMode:s,fillValue:o,outputShape:r};return M.runKernel(Au,l,c)}const vS=W({transform_:$S});function kS(n,e,t){const s=A(n,"a","bandPart");S(s.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${s.rank}.`);const o=s.shape,[r,i]=s.shape.slice(-2);let a,l;typeof e=="number"?(S(e%1===0,()=>`bandPart(): numLower must be an integer, got ${e}.`),S(e<=r,()=>`bandPart(): numLower (${e}) must not be greater than the number of rows (${r}).`),a=A(e<0?r:e,"numLower","bandPart")):(S(e.dtype==="int32",()=>"bandPart(): numLower's dtype must be an int32."),a=dt(wl(e,0),r,xi(e,r))),typeof t=="number"?(S(t%1===0,()=>`bandPart(): numUpper must be an integer, got ${t}.`),S(t<=i,()=>`bandPart(): numUpper (${t}) must not be greater than the number of columns (${i}).`),l=A(t<0?i:t,"numUpper","bandPart")):(S(t.dtype==="int32",()=>"bandPart(): numUpper's dtype must be an int32."),l=dt(wl(t,0),i,xi(t,i)));const c=V(yi(0,r,1,"int32"),[-1,1]),u=yi(0,i,1,"int32"),h=be(c,u),d=ss(Bo(h,a),to(h,st(l))),p=ot([r,i],s.dtype);return V(Bn(Cs(V(s,[-1,r,i])).map(f=>dt(d,f,p))),o)}const SS=W({bandPart_:kS});function NS(n){let e;if(Array.isArray(n)){e=!1,S(n!=null&&n.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const o=n[0].shape[0];for(let r=1;r<n.length;++r)S(n[r].shape[0]===o,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${n[r].shape[0]} vs. ${o})`)}else e=!0,n=on(n,n.shape[0],0).map(o=>oo(o,[0]));S(n.length<=n[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${n.length}) exceeds number of dimensions (${n[0].shape[0]}).`);const t=[],s=n;for(let o=0;o<n.length;++o)t.push(M.tidy(()=>{let r=s[o];if(o>0)for(let i=0;i<o;++i){const a=L(me(L(t[i],r)),t[i]);r=be(r,a)}return ge(r,bl(r,"euclidean"))}));return e?Bn(t,0):t}const TS=W({gramSchmidt_:NS});function ES(n,e=!1){if(S(n.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${n.rank}`),n.rank===2)return vm(n,e);{const t=n.shape.slice(0,n.shape.length-2).reduce((l,c)=>l*c),s=Cs(V(n,[t,n.shape[n.shape.length-2],n.shape[n.shape.length-1]]),0),o=[],r=[];s.forEach(l=>{const[c,u]=vm(l,e);o.push(c),r.push(u)});const i=V(Bn(o,0),n.shape),a=V(Bn(r,0),n.shape);return[i,a]}}function vm(n,e=!1){return M.tidy(()=>{S(n.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${n.shape.length}D Tensor.`);const t=n.shape[0],s=n.shape[1];let o=jf(t),r=Xs(n);const i=wh([[1]],[1,1]);let a=Xs(i);const l=t>=s?s:t;for(let c=0;c<l;++c){const u=r,h=a,d=o;[a,r,o]=M.tidy(()=>{const p=He(r,[c,c],[t-c,1]),f=bl(p),m=He(r,[c,c],[1,1]),g=dt(qt(m,0),wh([[-1]]),wh([[1]])),x=be(m,L(g,f)),b=ge(p,x);b.shape[0]===1?a=Xs(i):a=vt([i,He(b,[1,0],[b.shape[0]-1,b.shape[1]])],0);const w=st(ge(Fe(g,x),f)),y=He(r,[c,0],[t-c,s]),C=L(w,a),$=Re(a);if(c===0)r=be(y,Fe(C,Fe($,y)));else{const N=be(y,Fe(C,Fe($,y)));r=vt([He(r,[0,0],[c,s]),N],0)}const v=Re(C),k=He(o,[0,c],[t,o.shape[1]-c]);if(c===0)o=be(k,Fe(Fe(k,a),v));else{const N=be(k,Fe(Fe(k,a),v));o=vt([He(o,[0,0],[t,c]),N],1)}return[a,r,o]}),xe([u,h,d])}return!e&&t>s&&(o=He(o,[0,0],[t,s]),r=He(r,[0,0],[s,s])),[o,r]})}const RS=W({qr_:ES});const rs={flipLeftRight:Kk,grayscaleToRGB:Xk,resizeNearestNeighbor:$m,resizeBilinear:Im,rgbToGrayscale:Zk,rotateWithOffset:Qk,cropAndResize:Hk,nonMaxSuppression:tS,nonMaxSuppressionAsync:cS,nonMaxSuppressionWithScore:hS,nonMaxSuppressionWithScoreAsync:pS,nonMaxSuppressionPadded:mS,nonMaxSuppressionPaddedAsync:xS,threshold:IS,transform:vS},AS={bandPart:SS,gramSchmidt:TS,qr:RS};const DS=new Map,FS=new Map;class Uo{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}}class dn{constructor(){this.classNameMap={}}static getMap(){return dn.instance==null&&(dn.instance=new dn),dn.instance}static register(e){dn.getMap().classNameMap[e.className]=[e,e.fromConfig]}}function ee(n,e,t){S(n.className!=null,()=>"Class being registered does not have the static className property defined."),S(typeof n.className=="string",()=>"className is required to be a string, but got type "+typeof n.className),S(n.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof e=="undefined"&&(e="Custom"),typeof t=="undefined"&&(t=n.className);const s=t,o=e+">"+s;return dn.register(n),DS.set(o,n),FS.set(n,o),n}class Is extends Uo{minimize(e,t=!1,s){const{value:o,grads:r}=this.computeGradients(e,s);if(s!=null){const i=s.map(a=>({name:a.name,tensor:r[a.name]}));this.applyGradients(i)}else this.applyGradients(r);return xe(r),t?o:(o.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return z$(e,t)}dispose(){this.iterations_!=null&&xe(this.iterations_)}saveIterations(){return X(this,null,function*(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:Oe(this.iterations_,"int32")}})}getWeights(){return X(this,null,function*(){throw new Error("getWeights() is not implemented for this optimizer yet.")})}setWeights(e){return X(this,null,function*(){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)})}extractIterations(e){return X(this,null,function*(){return this.iterations_=(yield e[0].tensor.data())[0],e.slice(1)})}}Object.defineProperty(Is,Symbol.hasInstance,{value:n=>n.minimize!=null&&n.computeGradients!=null&&n.applyGradients!=null});class km extends Is{static get className(){return"Adadelta"}constructor(e,t,s=null){super(),this.learningRate=e,this.rho=t,this.epsilon=s,this.accumulatedGrads=[],this.accumulatedUpdates=[],s==null&&(this.epsilon=M.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(s=>s.name):Object.keys(e)).forEach((s,o)=>{const r=M.registeredVariables[s],i=!1;this.accumulatedGrads[o]==null&&(this.accumulatedGrads[o]={originalName:`${s}/accum_grad`,variable:B(()=>Ee(r).variable(i))}),this.accumulatedUpdates[o]==null&&(this.accumulatedUpdates[o]={originalName:`${s}/accum_var`,variable:B(()=>Ee(r).variable(i))});const a=Array.isArray(e)?e[o].tensor:e[s];if(a==null)return;const l=this.accumulatedGrads[o].variable,c=this.accumulatedUpdates[o].variable;B(()=>{const u=te(L(l,this.rho),L(je(a),1-this.rho)),h=L(ge(Dt(te(c,this.epsilon)),Dt(te(l,this.epsilon))),a),d=te(L(c,this.rho),L(je(h),1-this.rho));l.assign(u),c.assign(d);const p=te(L(h,-this.learningRate),r);r.assign(p)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(xe(this.accumulatedGrads.map(e=>e.variable)),xe(this.accumulatedUpdates.map(e=>e.variable)))}getWeights(){return X(this,null,function*(){const e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[yield this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))})}setWeights(e){return X(this,null,function*(){e=yield this.extractIterations(e);const t=e.length/2,s=!1;this.accumulatedGrads=e.slice(0,t).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})),this.accumulatedUpdates=e.slice(t,t*2).map(o=>({originalName:o.name,variable:o.tensor.variable(s)}))})}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}}class Sm extends Is{static get className(){return"Adagrad"}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(s=>s.name):Object.keys(e)).forEach((s,o)=>{const r=M.registeredVariables[s];this.accumulatedGrads[o]==null&&(this.accumulatedGrads[o]={originalName:`${s}/accumulator`,variable:B(()=>Po(r.shape,this.initialAccumulatorValue).variable(!1))});const i=Array.isArray(e)?e[o].tensor:e[s];if(i==null)return;const a=this.accumulatedGrads[o].variable;B(()=>{const l=te(a,je(i));a.assign(l);const c=te(L(ge(i,Dt(te(l,M.backend.epsilon()))),-this.learningRate),r);r.assign(c)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&xe(this.accumulatedGrads.map(e=>e.variable))}getWeights(){return X(this,null,function*(){return[yield this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))})}setWeights(e){return X(this,null,function*(){e=yield this.extractIterations(e);const t=!1;this.accumulatedGrads=e.map(s=>({originalName:s.name,variable:s.tensor.variable(t)}))})}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}}class Nm extends Is{static get className(){return"Adam"}constructor(e,t,s,o=null){super(),this.learningRate=e,this.beta1=t,this.beta2=s,this.epsilon=o,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],B(()=>{this.accBeta1=Oe(t).variable(),this.accBeta2=Oe(s).variable()}),o==null&&(this.epsilon=M.backend.epsilon())}applyGradients(e){const t=Array.isArray(e)?e.map(s=>s.name):Object.keys(e);B(()=>{const s=be(1,this.accBeta1),o=be(1,this.accBeta2);t.forEach((r,i)=>{const a=M.registeredVariables[r],l=!1;this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${r}/m`,variable:B(()=>Ee(a).variable(l))}),this.accumulatedSecondMoment[i]==null&&(this.accumulatedSecondMoment[i]={originalName:`${r}/v`,variable:B(()=>Ee(a).variable(l))});const c=Array.isArray(e)?e[i].tensor:e[r];if(c==null)return;const u=this.accumulatedFirstMoment[i].variable,h=this.accumulatedSecondMoment[i].variable,d=te(L(u,this.beta1),L(c,1-this.beta1)),p=te(L(h,this.beta2),L(je(c),1-this.beta2)),f=ge(d,s),m=ge(p,o);u.assign(d),h.assign(p);const g=te(L(ge(f,te(Dt(m),this.epsilon)),-this.learningRate),a);a.assign(g)}),this.accBeta1.assign(L(this.accBeta1,this.beta1)),this.accBeta2.assign(L(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&xe(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedSecondMoment!=null&&xe(this.accumulatedSecondMoment.map(e=>e.variable))}getWeights(){return X(this,null,function*(){const e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[yield this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))})}setWeights(e){return X(this,null,function*(){e=yield this.extractIterations(e),B(()=>{this.accBeta1.assign(eo(this.beta1,this.iterations_+1)),this.accBeta2.assign(eo(this.beta2,this.iterations_+1))});const t=e.length/2,s=!1;this.accumulatedFirstMoment=e.slice(0,t).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})),this.accumulatedSecondMoment=e.slice(t,t*2).map(o=>({originalName:o.name,variable:o.tensor.variable(s)}))})}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}}class Tm extends Is{static get className(){return"Adamax"}constructor(e,t,s,o=null,r=0){super(),this.learningRate=e,this.beta1=t,this.beta2=s,this.epsilon=o,this.decay=r,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],B(()=>{this.iteration=Oe(0).variable(),this.accBeta1=Oe(t).variable()}),o==null&&(this.epsilon=M.backend.epsilon())}applyGradients(e){const t=Array.isArray(e)?e.map(s=>s.name):Object.keys(e);B(()=>{const s=be(1,this.accBeta1),o=ge(-this.learningRate,te(L(this.iteration,this.decay),1));t.forEach((r,i)=>{const a=M.registeredVariables[r],l=!1;this.accumulatedFirstMoment[i]==null&&(this.accumulatedFirstMoment[i]={originalName:`${r}/m`,variable:Ee(a).variable(l)}),this.accumulatedWeightedInfNorm[i]==null&&(this.accumulatedWeightedInfNorm[i]={originalName:`${r}/v`,variable:Ee(a).variable(l)});const c=Array.isArray(e)?e[i].tensor:e[r];if(c==null)return;const u=this.accumulatedFirstMoment[i].variable,h=this.accumulatedWeightedInfNorm[i].variable,d=te(L(u,this.beta1),L(c,1-this.beta1)),p=L(h,this.beta2),f=Pt(c),m=ws(p,f);u.assign(d),h.assign(m);const g=te(L(ge(o,s),ge(d,te(m,this.epsilon))),a);a.assign(g)}),this.iteration.assign(te(this.iteration,1)),this.accBeta1.assign(L(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&xe(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedWeightedInfNorm!=null&&xe(this.accumulatedWeightedInfNorm.map(e=>e.variable))}getWeights(){return X(this,null,function*(){throw new Error("getWeights() is not implemented for Adamax yet.")})}setWeights(e){return X(this,null,function*(){throw new Error("setWeights() is not implemented for Adamax yet.")})}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}}class Rh extends Is{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(s=>s.name):Object.keys(e)).forEach((s,o)=>{const r=Array.isArray(e)?e[o].tensor:e[s];if(r==null)return;const i=M.registeredVariables[s];B(()=>{const a=te(L(this.c,r),i);i.assign(a)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=On(Oe(-e))}dispose(){this.c.dispose()}getWeights(){return X(this,null,function*(){return[yield this.saveIterations()]})}setWeights(e){return X(this,null,function*(){if(e=yield this.extractIterations(e),e.length!==0)throw new Error("SGD optimizer does not have settable weights.")})}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}}class Em extends Rh{static get className(){return"Momentum"}constructor(e,t,s=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=s,this.accumulations=[],this.m=Oe(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(s=>s.name):Object.keys(e)).forEach((s,o)=>{const r=M.registeredVariables[s];this.accumulations[o]==null&&(this.accumulations[o]={originalName:`${s}/momentum`,variable:B(()=>Ee(r).variable(!1))});const i=this.accumulations[o].variable,a=Array.isArray(e)?e[o].tensor:e[s];a!=null&&B(()=>{let l;const c=te(L(this.m,i),a);this.useNesterov?l=te(L(this.c,te(a,L(c,this.m))),r):l=te(L(this.c,c),r),i.assign(c),r.assign(l)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&xe(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}getWeights(){return X(this,null,function*(){return[yield this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))})}setWeights(e){return X(this,null,function*(){e=yield this.extractIterations(e);const t=!1;this.accumulations=e.map(s=>({originalName:s.name,variable:s.tensor.variable(t)}))})}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}}class Rm extends Is{static get className(){return"RMSProp"}constructor(e,t=.9,s=0,o=null,r=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=s,this.epsilon=o,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=r,o==null&&(this.epsilon=M.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){(Array.isArray(e)?e.map(s=>s.name):Object.keys(e)).forEach((s,o)=>{const r=M.registeredVariables[s],i=!1;this.accumulatedMeanSquares[o]==null&&(this.accumulatedMeanSquares[o]={originalName:`${s}/rms`,variable:B(()=>Ee(r).variable(i))}),this.accumulatedMoments[o]==null&&(this.accumulatedMoments[o]={originalName:`${s}/momentum`,variable:B(()=>Ee(r).variable(i))}),this.accumulatedMeanGrads[o]==null&&this.centered&&(this.accumulatedMeanGrads[o]={originalName:`${s}/mg`,variable:B(()=>Ee(r).variable(i))});const a=Array.isArray(e)?e[o].tensor:e[s];if(a==null)return;const l=this.accumulatedMeanSquares[o].variable,c=this.accumulatedMoments[o].variable;B(()=>{const u=te(L(l,this.decay),L(je(a),1-this.decay));if(this.centered){const h=this.accumulatedMeanGrads[o].variable,d=te(L(h,this.decay),L(a,1-this.decay)),p=ge(L(a,this.learningRate),Dt(be(u,te(je(d),this.epsilon)))),f=te(L(c,this.momentum),p);l.assign(u),h.assign(d),c.assign(f);const m=be(r,f);r.assign(m)}else{const h=te(L(l,this.decay),L(je(a),1-this.decay)),d=te(L(c,this.momentum),ge(L(a,this.learningRate),Dt(te(h,this.epsilon))));l.assign(h),c.assign(d);const p=be(r,d);r.assign(p)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&xe(this.accumulatedMeanSquares.map(e=>e.variable)),this.accumulatedMeanGrads!=null&&this.centered&&xe(this.accumulatedMeanGrads.map(e=>e.variable)),this.accumulatedMoments!=null&&xe(this.accumulatedMoments.map(e=>e.variable))}getWeights(){return X(this,null,function*(){const e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[yield this.saveIterations()].concat(e.map(t=>({name:t.originalName,tensor:t.variable})))})}setWeights(e){return X(this,null,function*(){e=yield this.extractIterations(e);const t=this.centered?e.length/3:e.length/2,s=!1;this.accumulatedMeanSquares=e.slice(0,t).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})),this.accumulatedMoments=e.slice(t,t*2).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})),this.centered&&(this.accumulatedMeanGrads=e.slice(t*2,t*3).map(o=>({originalName:o.name,variable:o.tensor.variable(s)})))})}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}}const _S=[km,Sm,Nm,Tm,Em,Rm,Rh];function OS(){for(const n of _S)ee(n)}const LS="model",MS=".json",PS=".weights.bin";function Am(n){return new Promise(e=>setTimeout(e)).then(n)}class io{constructor(e){if(!U().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(io.URL_SCHEME)&&(e=e.slice(io.URL_SCHEME.length)),(e==null||e.length===0)&&(e=LS),this.modelJsonFileName=e+MS,this.weightDataFileName=e+PS}save(e){return X(this,null,function*(){if(typeof document=="undefined")throw new Error("Browser downloads are not supported in this environment since `document` is not present");const t=Qn.join(e.weightData),s=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const o=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],r=Nf(e,o),i=window.URL.createObjectURL(new Blob([JSON.stringify(r)],{type:"application/json"})),a=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(a.download=this.modelJsonFileName,a.href=i,yield Am(()=>a.dispatchEvent(new MouseEvent("click"))),e.weightData!=null){const l=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;l.download=this.weightDataFileName,l.href=s,yield Am(()=>l.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:pl(e)}}})}}io.URL_SCHEME="downloads://";const zS=n=>U().getBool("IS_BROWSER")&&!Array.isArray(n)&&n.startsWith(io.URL_SCHEME)?BS(n.slice(io.URL_SCHEME.length)):null;ut.registerSaveRouter(zS);function BS(n="model"){return new io(n)}function Dm(n,e,t,s){i(n),t=t==null?0:t,s=s==null?1:s,a(t,s);let o=0;const r=l=>(l.then(c=>{const u=t+ ++o/n.length*(s-t);return e(u),c}),l);function i(l){S(l!=null&&Array.isArray(l)&&l.length>0,()=>"promises must be a none empty array")}function a(l,c){S(l>=0&&l<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${l}`),S(c>=0&&c<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${c}`),S(c>=l,()=>`startFraction must be no more than endFraction, but got startFraction ${l} and endFraction ${c}`)}return Promise.all(n.map(r))}function VS(n,e){return X(this,null,function*(){e==null&&(e={});const t=e.fetchFunc==null?U().platform.fetch:e.fetchFunc,s=n.map(h=>t(h,e.requestInit,{isBinary:!0})),a=(e.onProgress==null?yield Promise.all(s):yield Dm(s,e.onProgress,0,.5)).map(h=>h.arrayBuffer());return e.onProgress==null?yield Promise.all(a):yield Dm(a,e.onProgress,.5,1)})}function WS(n,e){var t;const s=e.fetchFunc==null?U().platform.fetch:e.fetchFunc;let o=0,r;return(t=e.onProgress)===null||t===void 0||t.call(e,0),new ReadableStream({pull:i=>X(null,null,function*(){for(var a;o<n.length;){r||(r=(yield s(n[o],e.requestInit,{isBinary:!0})).body.getReader());const{done:l,value:c}=yield r.read();if(l){o++,r=void 0,(a=e.onProgress)===null||a===void 0||a.call(e,o/n.length);continue}i.enqueue(c);return}i.close()})})}const US="application/octet-stream",GS="application/json";class Ah{constructor(e,t){if(this.DEFAULT_METHOD="POST",t==null&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,t.fetchFunc!=null?(S(typeof t.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=U().platform.fetch,S(e!=null&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&S(e.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,t.requestInit!=null&&t.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}save(e){return X(this,null,function*(){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;const s=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],o=Nf(e,s);if(t.body.append("model.json",new Blob([JSON.stringify(o)],{type:GS}),"model.json"),e.weightData!=null){const i=Qn.join(e.weightData);t.body.append("model.weights.bin",new Blob([i],{type:US}),"model.weights.bin")}const r=yield this.fetch(this.path,t);if(r.ok)return{modelArtifactsInfo:pl(e),responses:[r]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${r.status}.`)})}loadModelJSON(){return X(this,null,function*(){const e=yield this.fetch(this.path,this.requestInit);if(!e.ok)throw new Error(`Request to ${this.path} failed with status code ${e.status}. Please verify this URL points to the model JSON of the model to load.`);let t;try{t=yield e.json()}catch(r){let i=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?i+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":i+=" Please make sure the server is serving valid JSON for this request.",new Error(i)}const s=t.modelTopology,o=t.weightsManifest;if(s==null&&o==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return t})}load(){return X(this,null,function*(){if(this.loadOptions.streamWeights)return this.loadStream();const e=yield this.loadModelJSON();return sC(e,t=>this.loadWeights(t))})}loadStream(){return X(this,null,function*(){const e=yield this.loadModelJSON(),t=yield this.getWeightUrls(e.weightsManifest),s=Tf(e.weightsManifest),o=()=>WS(t,this.loadOptions);return Object.assign(Object.assign({},e),{weightSpecs:s,getWeightStream:o})})}getWeightUrls(e){return X(this,null,function*(){const t=Array.isArray(this.path)?this.path[1]:this.path,[s,o]=HS(t),r=this.weightPathPrefix||s,i=[],a=[];for(const l of e)for(const c of l.paths)this.weightUrlConverter!=null?a.push(this.weightUrlConverter(c)):i.push(r+c+o);return this.weightUrlConverter&&i.push(...yield Promise.all(a)),i})}loadWeights(e){return X(this,null,function*(){const t=yield this.getWeightUrls(e),s=Tf(e),o=yield VS(t,this.loadOptions);return[s,o]})}}Ah.URL_SCHEME_REGEX=/^https?:\/\//;function HS(n){const e=n.lastIndexOf("/"),t=n.lastIndexOf("?"),s=n.substring(0,e),o=t>e?n.substring(t):"";return[s+"/",o]}function Fm(n){return n.match(Ah.URL_SCHEME_REGEX)!=null}const _m=(n,e)=>{if(typeof fetch=="undefined"&&(e==null||e.fetchFunc==null))return null;{let t=!0;if(Array.isArray(n)?t=n.every(s=>Fm(s)):t=Fm(n),t)return Om(n,e)}return null};ut.registerSaveRouter(_m),ut.registerLoadRouter(_m);function Om(n,e){return new Ah(n,e)}function qS(n,e){return Om(n,e)}function Dh(n,e){const t=n.shape.length,s=e.shape.length;if(t<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${t}.`);if(s<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${s}.`);if(e.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.shape[s-1]>t)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${e.shape[s-1]} vs. ${t}`);if(K(n.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${n.shape}.`);const o=e.shape,r=o[o.length-1];let i=1;for(let h=0;h<o.length-1;++h)i*=o[h];const a=n.shape,l=o.slice();l.pop();let c=1;for(let h=r;h<t;++h)c*=a[h],l.push(a[h]);const u=[...fe(n.shape).map(h=>h/c),1].slice(0,r);return[l,i,c,u]}const Fh=-2,KS=-1;function Lm(n,e,t){const s=n.shape.length;S(s===e.length,()=>`Error in slice${s}D: Length of begin ${e} must match the rank of the array (${s}).`),S(s===t.length,()=>`Error in slice${s}D: Length of size ${t} must match the rank of the array (${s}).`);for(let o=0;o<s;++o)S(e[o]+t[o]<=n.shape[o],()=>`Error in slice${s}D: begin[${o}] + size[${o}] (${e[o]+t[o]}) would overflow input.shape[${o}] (${n.shape[o]})`)}function Mm(n,e,t){const s=[];for(let o=0;o<n.length;o++)s[o]=Math.ceil((e[o]-n[o])/t[o]);return s}function Pm(n,e,t){let s=t.length;for(let o=0;o<t.length;o++)if(t[o]>1){s=o;break}for(let o=s+1;o<t.length;o++)if(e[o]>0||t[o]!==n[o])return!1;return!0}function zm(n,e){let t=n.length>0?n[n.length-1]:1;for(let s=0;s<n.length-1;s++)t+=n[s]*e[s];return t}function _h(n,e,t){let s;const o=n.shape.length;typeof e=="number"?s=[e,...new Array(o-1).fill(0)]:e.length<o?s=e.concat(new Array(o-e.length).fill(0)):s=e.slice(),s.forEach(i=>{S(i!==-1,()=>"slice() does not support negative begin indexing.")});let r;return t==null?r=new Array(o).fill(-1):typeof t=="number"?r=[t,...new Array(o-1).fill(-1)]:t.length<o?r=t.concat(new Array(o-t.length).fill(-1)):r=t,r=r.map((i,a)=>i>=0?i:(S(i===-1,()=>`Negative size values should be exactly -1 but got ${i} for the slice() size at index ${a}.`),n.shape[a]-s[a])),[s,r]}function Bm(n,e,t,s,o,r,i,a,l){let c;if(s==null?(c=new Array(e.length),c.fill(1)):c=s,i!=null&&(i&i-1)!==0)throw new Error("Multiple ellipses in slice is not allowed.");let u=!1;const h={dims:c.length,numAddAxisAfterEllipsis:0,begin:e.slice(),end:t.slice(),strides:c.slice(),beginMask:o,endMask:r,ellipsisMask:i,newAxisMask:a,shrinkAxisMask:l};for(let w=0;w<h.dims;w++)u&&(1<<w&a)!==0&&h.numAddAxisAfterEllipsis++,1<<w&i&&(u=!0);u||(h.ellipsisMask|=1<<h.dims,h.dims++);const d={dims:n.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};jS(h,d);let p=!0,f=!0,m=!0;const g=[],x=[];for(let w=0;w<n.length;++w){if(d.strides[w]===0)throw Error(`strides[${w}] must be non-zero`);const y=!!(d.shrinkAxisMask&1<<w),C=n[w];if(C===-1){g.push(y?1:-1);continue}const $=[d.beginMask&1<<w,d.endMask&1<<w],v=[d.strides[w]>0?0:-1,d.strides[w]>0?C:C-1];if(y&&d.strides[w]<=0)throw Error("only stride 1 allowed on non-range indexing.");m=m&&d.strides[w]===1;const k=!!(d.beginMask&1<<w&&d.endMask&1<<w);if(d.beginValid&&d.endValid){if(y){const E=d.begin[w]<0?C+d.begin[w]:d.begin[w];if(d.begin[w]=E,d.end[w]=d.begin[w]+1,E<0||E>=C)throw Error(`slice index ${d.begin[w]} of dimension ${w} out of bounds.`)}else d.begin[w]=Vm(d.begin[w],0,d.strides[w],C,$,v),d.end[w]=Vm(d.end[w],1,d.strides[w],C,$,v);const I=d.strides[w]===1&&d.begin[w]===0&&d.end[w]===C;p=p&&I,f=f&&(w===0&&d.strides[w]===1||I)}else p=p&&d.strides[w]===1&&k,f=f&&(w===0&&d.strides[w]===1||k);let N,T=!1;if(d.beginValid&&d.endValid?(N=d.end[w]-d.begin[w],T=!0):y?(N=1,T=!0):k&&C>=0&&(d.strides[w]<0?N=-C:N=C,T=!0),T){let I;N===0||N<0!=d.strides[w]<0?I=0:I=Math.trunc(N/d.strides[w])+(N%d.strides[w]!==0?1:0),g.push(I)}else g.push(-1)}for(let w=0;w<d.finalShapeGatherIndices.length;++w){const y=d.finalShapeGatherIndices[w];y>=0?x.push(g[y]):y===Fh&&x.push(1)}return{finalShapeSparse:x.filter((w,y)=>d.finalShapeGatherIndices[y]!==Fh),finalShape:x,isIdentity:p,sliceDim0:f,isSimpleSlice:m,begin:d.begin,end:d.end,strides:d.strides}}function jS(n,e){e.beginMask=0,e.endMask=0,e.shrinkAxisMask=0;let t=0;e.beginValid=n.begin!=null,e.endValid=n.end!=null,e.begin=new Array(e.dims),e.end=new Array(e.dims),e.strides=new Array(e.dims),e.finalShapeGatherIndices=[],e.finalShapeGatherIndicesSparse=[],e.inputShapeGatherIndicesSparse=new Array(e.dims);for(let s=0;s<n.dims;s++)if(1<<s&n.ellipsisMask){const o=Math.min(e.dims-(n.dims-s)+1+n.numAddAxisAfterEllipsis,e.dims);for(;t<o;t++)e.begin[t]=0,e.end[t]=0,e.strides[t]=1,e.beginMask|=1<<t,e.endMask|=1<<t,e.finalShapeGatherIndices.push(t),e.finalShapeGatherIndicesSparse.push(-1),e.inputShapeGatherIndicesSparse[t]=s}else if(1<<s&n.newAxisMask)e.finalShapeGatherIndices.push(Fh),e.finalShapeGatherIndicesSparse.push(-1);else{if(t===e.begin.length)throw Error(`Index out of range using input dim ${t}; input has only ${e.dims} dims, ${e.begin.length}.`);n.begin!=null&&(e.begin[t]=n.begin[s]),n.end!=null&&(e.end[t]=n.end[s]),e.strides[t]=n.strides[s],n.beginMask&1<<s&&(e.beginMask|=1<<t),n.endMask&1<<s&&(e.endMask|=1<<t),n.shrinkAxisMask&1<<s?(e.finalShapeGatherIndices.push(KS),e.finalShapeGatherIndicesSparse.push(-1),e.shrinkAxisMask|=1<<t):(e.finalShapeGatherIndices.push(t),e.finalShapeGatherIndicesSparse.push(s)),e.inputShapeGatherIndicesSparse[t]=s,t++}}function Vm(n,e,t,s,o,r){if(o[e])return t>0?r[e]:r[e+1&1];{const i=n<0?s+n:n;return i<r[0]?r[0]:i>r[1]?r[1]:i}}class XS{static sgd(e){return new Rh(e)}static momentum(e,t,s=!1){return new Em(e,t,s)}static rmsprop(e,t=.9,s=0,o=null,r=!1){return new Rm(e,t,s,o,r)}static adam(e=.001,t=.9,s=.999,o=null){return new Nm(e,t,s,o)}static adadelta(e=.001,t=.95,s=null){return new km(e,t,s)}static adamax(e=.002,t=.9,s=.999,o=null,r=0){return new Tm(e,t,s,o,r)}static adagrad(e,t=.1){return new Sm(e,t)}}const Go=XS;const YS=typeof requestAnimationFrame!="undefined"?requestAnimationFrame:typeof setImmediate!="undefined"?setImmediate:n=>n();function Wm(){return new Promise(n=>YS(()=>n()))}function Oh(n,e){const t=n[0].length;n.forEach((o,r)=>{S(o.length===t,()=>`Error in concat${t}D: rank of tensors[${r}] must be the same as the rank of the rest (${t})`)}),S(e>=0&&e<t,()=>`Error in concat${t}D: axis must be between 0 and ${t-1}.`);const s=n[0];n.forEach((o,r)=>{for(let i=0;i<t;i++)S(i===e||o[i]===s[i],()=>`Error in concat${t}D: Shape of tensors[${r}] (${o}) does not match the shape of the rest (${s}) along the non-concatenated axis ${r}.`)})}function Vn(n,e){const t=n[0].slice();for(let s=1;s<n.length;s++)t[e]+=n[s][e];return t}var kn;(function(n){n[n.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",n[n.VALUE_ROWIDS=1]="VALUE_ROWIDS",n[n.ROW_LENGTHS=2]="ROW_LENGTHS",n[n.ROW_SPLITS=3]="ROW_SPLITS",n[n.ROW_LIMITS=4]="ROW_LIMITS",n[n.ROW_STARTS=5]="ROW_STARTS"})(kn||(kn={}));function Um(n,e,t){let s=new Array;if(t==null&&e==null)return s;if(e==null)for(;s.length<n+t.length;)s.push(-1);else s=e.slice();if(t==null)return s;if(n+t.length!==s.length)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.rank = ${n+t.length}, but shape.rank = ${s.length}`);for(let o=1;o<t.length;++o){const r=t[o],i=s[s.length-t.length+o],a=s[i];if(r>=0)if(a>=0){if(a!==r)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.shape[${o+n}] = ${r} but shape[${o+n}] = ${a}`)}else s[i]=r}return s}function Gm(n){const e={FIRST_DIM_SIZE:kn.FIRST_DIM_SIZE,VALUE_ROWIDS:kn.VALUE_ROWIDS,ROW_LENGTHS:kn.ROW_LENGTHS,ROW_SPLITS:kn.ROW_SPLITS,ROW_LIMITS:kn.ROW_LIMITS,ROW_STARTS:kn.ROW_STARTS},t=[];for(const s of n)if(s in e)t.push(e[s]);else break;return t}function Hm(n){return n.length===0?0:n[0]===kn.FIRST_DIM_SIZE?n.length-1:n.length}function qm(n,e){if(n==null||e==null)return;const t=n.length,s=e.length;if(t>=s)throw new Error(`defaultValue.shape=${n} and ragged tensor flatValues.shape=${e}, are incompatible: defaultValue.rank = ${t} must be less than ragged tensor input flatValues.rank = ${s})`);for(let o=0;o<Math.min(t,s-1);++o){const r=n[o],i=e[o+1];if(r>=0&&i>=0&&r!==1&&r!==i)throw new Error(`defaultValue.shape=${n}, and ragged tensor input flatValues.shape=${e} are incompatible: defaultValue.shape[${o-n.length}] = ${r} but ragged tensor input.flatValues.shape[${o-n.length}] = ${i}`)}}const Lh=30;function Fl(n){return n<=Lh?n:Bc(n,Math.floor(Math.sqrt(n)))}function Mh(n,e,t){const s=t*(typeof n=="number"?n:n[0]),o=e*(typeof n=="number"?n:n[1]);return[s,o]}function Ci(n,e,t,s=!0){let o=[];if(s)o=o.concat(e.slice(0)),o.push(n[0]/t),o=o.concat(n.slice(1));else{o=o.concat(n[0]);const r=e.length;for(let i=0;i<r;++i)o=o.concat([n[i+1]/e[i],e[i]]);o=o.concat(n.slice(r+1))}return o}function Ii(n,e,t=!0){const s=[];if(t){s.push(e);for(let o=e+1;o<n;++o)o<=2*e?(s.push(o),s.push(o-(e+1))):s.push(o)}else{const o=[],r=[];for(let i=1;i<n;++i)i>=e*2+1||i%2===1?r.push(i):o.push(i);s.push(...o),s.push(0),s.push(...r)}return s}function $i(n,e,t,s=!0){const o=[];s?o.push(n[0]/t):o.push(n[0]*t);for(let r=1;r<n.length;++r)r<=e.length?s?o.push(e[r-1]*n[r]):o.push(n[r]/e[r-1]):o.push(n[r]);return o}function Ph(n,e){const t=[0];for(let s=0;s<e;++s)t.push(n[s][0]);return t}function zh(n,e,t){const s=n.slice(0,1);for(let o=0;o<t;++o)s.push(n[o+1]-e[o][0]-e[o][1]);return s}const _l=1.7580993408473768,Ol=1.0507009873554805;const Bh=.3275911,Vh=.254829592,Wh=-.284496736,Uh=1.421413741,Gh=-1.453152027,Hh=1.061405429;function is(n,e){if(n.length!==e.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${n.length}, imag: ${e.length}.`);const t=new Float32Array(n.length*2);for(let s=0;s<t.length;s+=2)t[s]=n[s/2],t[s+1]=e[s/2];return t}function Km(n){const e=new Float32Array(n.length/2),t=new Float32Array(n.length/2);for(let s=0;s<n.length;s+=2)e[s/2]=n[s],t[s/2]=n[s+1];return{real:e,imag:t}}function jm(n){const e=Math.ceil(n.length/4),t=new Float32Array(e),s=new Float32Array(e);for(let o=0;o<n.length;o+=4)t[Math.floor(o/4)]=n[o],s[Math.floor(o/4)]=n[o+1];return{real:t,imag:s}}function Xm(n){const e=Math.floor(n.length/4),t=new Float32Array(e),s=new Float32Array(e);for(let o=2;o<n.length;o+=4)t[Math.floor(o/4)]=n[o],s[Math.floor(o/4)]=n[o+1];return{real:t,imag:s}}function qh(n,e){const t=n[e*2],s=n[e*2+1];return{real:t,imag:s}}function Ym(n,e,t,s){n[s*2]=e,n[s*2+1]=t}function Zm(n,e){const t=new Float32Array(n/2),s=new Float32Array(n/2);for(let o=0;o<Math.ceil(n/2);o++){const r=(e?2:-2)*Math.PI*(o/n);t[o]=Math.cos(r),s[o]=Math.sin(r)}return{real:t,imag:s}}function Jm(n,e,t){const s=(t?2:-2)*Math.PI*(n/e),o=Math.cos(s),r=Math.sin(s);return{real:o,imag:r}}const Kh="->",ZS=/->/g,Qm=",",eg="...";function jh(n,e){n=n.replace(/\s/g,"");const t=(n.length-n.replace(ZS,"").length)/Kh.length;if(t<1)throw new Error("Equations without an arrow are not supported.");if(t>1)throw new Error(`Equation must contain exactly one arrow ("${Kh}").`);const[s,o]=n.split(Kh);S(s.indexOf(eg)===-1,()=>`The ellipsis notation ("${eg}") is not supported yet.`);const r=s.split(Qm),i=r.length;if(e!==i)throw new Error(`Expected ${i} input tensors, received ${e}`);if(i>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");const a=[];for(let d=0;d<o.length;++d){const p=o[d];if(!r.some(f=>f.indexOf(p)!==-1))throw new Error(`Output subscripts contain the label ${p} not present in the input subscripts.`);a.indexOf(p)===-1&&a.push(p)}for(let d=0;d<s.length;++d){const p=s[d];a.indexOf(p)===-1&&p!==Qm&&a.push(p)}const l=new Array(r.length);for(let d=0;d<i;++d){if(new Set(r[d].split("")).size!==r[d].length)throw new Error(`Found duplicate axes in input component ${r[d]}. Support for duplicate axes in input is not implemented yet.`);l[d]=[];for(let p=0;p<r[d].length;++p)l[d].push(a.indexOf(r[d][p]))}const c=a.length,u=o.length,h=[];for(let d=u;d<c;++d)h.push(d);return{allDims:a,summedDims:h,idDims:l}}function Xh(n,e){let t=new Array(n);t.fill(-1);for(let o=0;o<e.length;++o)t[e[o]]=o;const s=[];for(let o=0;o<n;++o)t[o]===-1&&s.push(o);return t=t.filter(o=>o!==-1),{permutationIndices:t,expandDims:s}}function Yh(n,e,t){const s=new Array(n);for(let o=0;o<t.length;++o){const r=t[o].shape;for(let i=0;i<e[o].length;++i)s[e[o][i]]===void 0?s[e[o][i]]=r[i]:S(s[e[o][i]]===r[i],()=>`Expected dimension ${s[e[o][i]]} at axis ${i} of input shaped ${JSON.stringify(r)}, but got dimension ${r[i]}`)}}function Zh(n,e){const t=n,s=[];let o=0;n.length===0&&t.push(-1),o=n.length+1;for(let i=0;i<o;++i)s.push([]);const r=[];for(let i=0;i<t.length;++i){const a=t[i],l=JS(e,a);for(const c of l)r.indexOf(c)===-1&&(s[i].push(c),r.push(c))}return{path:t,steps:s}}function Jh(n){return n.every((e,t)=>e===t)}function JS(n,e){const t=[];for(let s=0;s<n.length;++s)(n[s].length===0||n[s].indexOf(e)!==-1||e===-1)&&t.push(s);return t}function Qh(n,e,t=0){let s=[];if(typeof e=="number")S(n.shape[t]%e===0,()=>"Number of splits must evenly divide the axis."),s=new Array(e).fill(n.shape[t]/e);else{const o=e.reduce((i,a)=>(a===-1&&(i+=1),i),0);S(o<=1,()=>"There should be only one negative value in split array.");const r=e.indexOf(-1);if(r!==-1){const i=e.reduce((a,l)=>l>0?a+l:a);e[r]=n.shape[t]-i}S(n.shape[t]===e.reduce((i,a)=>i+a),()=>"The sum of sizes must match the size of the axis dimension."),s=e}return s}function tg(n){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${n}`}function ng(n,e){return`indices(${n}, 0) is invalid: ${e} < 0`}function sg(n,e,t){return`indices(${n}, 0) is invalid: ${e} >= ${t}`}function og(n,e){return`only one output dimension may be -1, not both ${n} and ${e}`}function rg(n,e){return`size ${n} must be non-negative, not ${e}`}function ig(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function ag(n,e){const t=K(n),s=K(e);return`Input to reshape is a SparseTensor with ${t}
  dense values, but the requested shape requires a multiple of ${s}. inputShape=${n} outputShape= ${e}`}function lg(n,e){const t=K(n),s=K(e);return`Input to reshape is a tensor with ${t} dense values, but the requested shape has ${s}. inputShape=${n} outputShape=${e}`}function ed(){return"segment ids must be >= 0"}function cg(){return"segment ids are not increasing"}function ug(n,e){return`Segment id ${n} out of range [0, ${e}), possibly because segmentIds input is not sorted.`}function hg(n,e,t){return`Bad: indices[${n}] == ${e} out of range [0, ${t})`}function QS(n,e){let t=!1,s;for(n<=Lh?(s=n,t=!0):s=Bc(n,Math.floor(Math.sqrt(n)));!t;)s>e||s===n?t=!0:s=Bc(n,s+1);return s}function e2(n,e,t){const s=[],o=n.length;for(let r=0;r<o;r++)r!==e?s.push(n[r]):s.push(t);return s}function dg(n,e,t,s){const o=e.shape.length,r=n.shape.length;if(s!==0&&(s<-o||s>o))throw new Error(`Expect batchDims in the range of [-${o}, ${o}], but got ${s}`);if(s<0&&(s+=o),s>r)throw new Error(`batchDims (${s}) must be less than rank(x) (
    ${r}).`);if(t<s)throw new Error(`batchDims (${s}) must be less than or equal to axis (${t}).`);for(let h=0;h<s;++h)if(n.shape[h]!==e.shape[h])throw new Error(`x.shape[${h}]: ${n.shape[h]} should be equal to indices.shape[${h}]: ${e.shape[h]}.`);const i=n.shape[t],a=[];let l=1,c=1,u=1;for(let h=0;h<s;++h)a.push(n.shape[h]),l*=n.shape[h];for(let h=s;h<t;h++)a.push(n.shape[h]),c*=n.shape[h];for(let h=s;h<o;h++)a.push(e.shape[h]);for(let h=t+1;h<r;h++)a.push(n.shape[h]),u*=n.shape[h];return{batchSize:l,sliceSize:u,outerSize:c,dimSize:i,outputShape:a}}function as(n){try{return n.map(e=>gs(e))}catch(e){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function pg(n){return n.map(e=>ms(e))}var t2=Object.freeze({__proto__:null,ERF_A1:Vh,ERF_A2:Wh,ERF_A3:Uh,ERF_A4:Gh,ERF_A5:Hh,ERF_P:Bh,PARALLELIZE_THRESHOLD:Lh,get RowPartitionType(){return kn},SELU_SCALE:Ol,SELU_SCALEALPHA:_l,applyActivation:vh,assertAndGetBroadcastShape:we,assertAxesAreInnerMostDims:kt,assertParamsConsistent:Oh,assignToTypedArray:Ym,axesAreInnerMostDims:rh,calculateShapes:ro,checkEinsumDimSizes:Yh,checkPadOnDimRoundingMode:Gt,combineLocations:qf,combineRaggedTensorToTensorShapes:Um,complexWithEvenIndex:jm,complexWithOddIndex:Xm,computeConv2DInfo:$t,computeConv3DInfo:bs,computeDefaultPad:Zu,computeDilation2DInfo:ui,computeOptimalWindowSize:Fl,computeOutAndReduceShapes:yt,computeOutShape:Vn,computePool2DInfo:un,computePool3DInfo:ts,convertConv2DDataFormat:ns,decodeEinsumEquation:jh,eitherStridesOrDilationsAreOne:At,expandShapeToKeepDim:at,exponent:Jm,exponents:Zm,fromStringArrayToUint8:pg,fromUint8ToStringArray:as,getAxesPermutation:Ze,getBroadcastDims:zo,getComplexWithIndex:qh,getEinsumComputePath:Zh,getEinsumPermutation:Xh,getFusedBiasGradient:$h,getFusedDyActivation:Ih,getImageCenter:Mh,getInnerMostAxes:nt,getPermuted:Ii,getRaggedRank:Hm,getReductionAxes:ht,getReshaped:Ci,getReshapedPermuted:$i,getRowPartitionTypesHelper:Gm,getSliceBeginCoords:Ph,getSliceSize:zh,getSparseFillEmptyRowsIndicesDenseShapeMismatch:tg,getSparseFillEmptyRowsNegativeIndexErrorMessage:ng,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:sg,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:ig,getSparseReshapeInputOutputMismatchErrorMessage:lg,getSparseReshapeInputOutputMultipleErrorMessage:ag,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:og,getSparseReshapeNegativeOutputDimErrorMessage:rg,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:hg,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:ed,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:cg,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:ug,getUndoAxesPermutation:ys,isIdentityPermutation:Jh,mergeRealAndImagArrays:is,prepareAndValidate:Dh,prepareSplitSize:Qh,shouldFuse:kh,splitRealAndImagArrays:Km,stridesOrDilationsArePositive:Js,tupleValuesAreOne:Zs,upcastType:Yt,validateDefaultValueShape:qm,warn:nn});OS();const fg={kernelName:sa,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(n,wi(re(t,"float32"),-1))}}};const n2={kernelName:hr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>{const s=je(re(t,"float32")),o=Dt(be(Oe(1),s));return st(ge(n,o))}}}};const s2={kernelName:dr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>{const s=Dt(be(je(re(t,"float32")),1));return ge(n,s)}}}};const o2={kernelName:Ro,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e,o=we(t.shape,s.shape);return{a:()=>{let a=n;const l=ht(t.shape,o);return l.length>0&&(a=me(a,l)),V(a,t.shape)},b:()=>{let a=n;const l=ht(s.shape,o);return l.length>0&&(a=me(a,l)),V(a,s.shape)}}}};const r2={kernelName:Hc,saveAllInputs:!0,gradFunc:(n,e)=>{const t={};return e.forEach((s,o)=>{t[o]=()=>n.clone()}),t}};const i2={kernelName:oa,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>Ee(t)}}};const a2={kernelName:ra,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>Ee(t)}}};const l2={kernelName:pr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>ge(n,Dt(be(Oe(1),je(re(t,"float32")))))}}};const c2={kernelName:fr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>{const s=Dt(te(Oe(1),je(re(t,"float32"))));return ge(n,s)}}}};const u2={kernelName:xr,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e,o=we(t.shape,s.shape);return{a:()=>{const a=te(je(t),je(s));let l=L(n,ge(s,a));const c=ht(t.shape,o);return c.length>0&&(l=me(l,c)),V(l,t.shape)},b:()=>{const a=te(je(t),je(s));let l=st(L(n,ge(t,a)));const c=ht(s.shape,o);return c.length>0&&(l=me(l,c)),V(l,s.shape)}}}};const h2={kernelName:mr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>ge(n,te(je(re(t,"float32")),1))}}};const d2={kernelName:gr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>ge(n,be(Oe(1),je(re(t,"float32"))))}}};function p2(n,e,t,s,o,r){const i=A(n,"dy","avgPool3dGrad"),a=A(e,"input","avgPool3dGrad");let l=i,c=a,u=!1;a.rank===4&&(u=!0,l=V(i,[1,i.shape[0],i.shape[1],i.shape[2],i.shape[3]]),c=V(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),S(l.rank===5,()=>`Error in avgPool3dGrad: dy must be rank 5 but got rank ${l.rank}.`),S(c.rank===5,()=>`Error in avgPool3dGrad: input must be rank 5 but got rank ${c.rank}.`),Gt("avgPool3dGrad",o,r);const h={dy:l,input:c},d={filterSize:t,strides:s,pad:o,dimRoundingMode:r},p=M.runKernel(Xc,h,d);return u?V(p,[p.shape[1],p.shape[2],p.shape[3],p.shape[4]]):p}const f2=W({avgPool3dGrad_:p2});const m2={kernelName:aa,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{filterSize:o,strides:r,pad:i,dimRoundingMode:a}=t;return{x:()=>f2(n,s,o,r,i,a)}}};function g2(n,e,t,s,o){const r=A(n,"dy","avgPoolGrad"),i=A(e,"input","avgPoolGrad");S(i.rank===r.rank,()=>`Rank of input (${i.rank}) does not match rank of dy (${r.rank})`);let a=i,l=r,c=!1;i.rank===3&&(c=!0,a=V(i,[1,i.shape[0],i.shape[1],i.shape[2]]),l=V(r,[1,r.shape[0],r.shape[1],r.shape[2]])),S(l.rank===4,()=>`Error in avgPoolGrad: dy must be rank 4 but got rank ${l.rank}.`),S(a.rank===4,()=>`Error in avgPoolGrad: input must be rank 4 but got rank ${a.rank}.`);const u={dy:l,input:a},h={filterSize:t,strides:s,pad:o},d=M.runKernel(jc,u,h);return c?V(d,[d.shape[1],d.shape[2],d.shape[3]]):d}const x2=W({avgPoolGrad_:g2});const b2={kernelName:ia,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{filterSize:o,strides:r,pad:i}=t;return{x:()=>x2(n,s,o,r,i)}}};const y2={kernelName:la,inputsToSave:["a","b"],gradFunc:(n,e,t)=>{const[s,o]=e,{transposeA:r,transposeB:i}=t;return!r&&!i?{a:()=>Fe(n,o,!1,!0),b:()=>Fe(s,n,!0,!1)}:!r&&i?{a:()=>Fe(n,o,!1,!1),b:()=>Fe(n,s,!0,!1)}:r&&!i?{a:()=>Fe(o,n,!1,!0),b:()=>Fe(s,n,!1,!1)}:{a:()=>Fe(o,n,!0,!0),b:()=>Fe(n,s,!0,!0)}}};const w2={kernelName:ca,gradFunc:(n,e,t)=>{const{blockShape:s,crops:o}=t;return{x:()=>dh(n,s,o)}}};const C2={kernelName:fw,gradFunc:(n,e,t)=>{const s=t,o=s.inputShape,r=s.shape,i=Array.from(r);for(let l=o.length-1;l>=0;l--)if(o[l]===r[l])i[l]=1;else if(o[l]!==1)throw new Error(`broadcastTo(): [${o}] cannot be broadcast to [${r}].`);const a=[];for(let l=0;l<i.length;l++)i[l]>1&&a.push(l);return{x:()=>me(n,a,!0)}}};const I2={kernelName:br,gradFunc:n=>({x:()=>n.clone()})};const $2={kernelName:yr,gradFunc:n=>({x:()=>Ee(n)})};const v2={kernelName:wr,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{clipValueMin:o,clipValueMax:r}=t;return{x:()=>dt(ss(to(s,o),Bo(s,r)),n,Ee(n))}}};const k2={kernelName:ua,inputsToSave:["x"],gradFunc:fg.gradFunc};const S2={kernelName:ha,saveAllInputs:!0,gradFunc:(n,e,t)=>{const s=e.map(l=>l.shape),{axis:o}=t,r=ve(o,e[0].shape)[0],i=s.map(l=>l[r]);return on(n,i,r).map(l=>()=>l)}};const N2={kernelName:da,inputsToSave:["x","filter"],gradFunc:(n,e,t)=>{const[s,o]=e,{dilations:r,strides:i,pad:a,dataFormat:l}=t;return S(Zs(r),()=>`Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${r}'`),{x:()=>th(s.shape,n,o,i,a,l),filter:()=>Ch(s,n,o.shape,i,a,l)}}};const T2={kernelName:pa,inputsToSave:["dy","filter"],gradFunc:(n,e,t)=>{const[s,o]=e,{strides:r,pad:i,dataFormat:a,dimRoundingMode:l}=t;return{dy:()=>Qs(n,o,r,i,a,1,l),filter:()=>Ch(n,s,o.shape,r,i,a,l)}}};function E2(n,e,t,s,o){let r=n;n.rank===4&&(r=V(n,[1,n.shape[0],n.shape[1],n.shape[2],n.shape[3]]));let i=e;i.rank===4&&(i=V(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]])),S(r.rank===5,()=>`Error in conv3dDerFilter: input must be rank 5, but got shape ${r.shape}.`),S(i.rank===5,()=>`Error in conv3dDerFilter: dy must be rank 5, but got shape ${i.shape}.`),S(t.length===5,()=>`Error in conv3dDerFilter: filterShape must be length 5, but got ${t}.`),S(r.shape[4]===t[3],()=>`Error in conv3dDerFilter: depth of input ${r.shape[4]}) must match input depth in filter (${t[3]}.`),S(i.shape[4]===t[4],()=>`Error in conv3dDerFilter: depth of dy (${i.shape[4]}) must match output depth for filter (${t[4]}).`);const a={x:r,dy:i},l={strides:s,pad:o,filterShape:t};return M.runKernel(eu,a,l)}const R2=W({conv3DBackpropFilter_:E2});const A2={kernelName:fa,inputsToSave:["x","filter"],gradFunc:(n,e,t)=>{const{dilations:s,strides:o,pad:r}=t;S(Zs(s),()=>`Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${s}'`);const[i,a]=e;return{x:()=>Bf(i.shape,n,a,o,r),filter:()=>R2(i,n,a.shape,o,r)}}};const D2={kernelName:Cr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(st(pm(re(t,"float32"))),n)}}};const F2={kernelName:Ir,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(fm(re(t,"float32")),n)}}};const _2={kernelName:ma,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{axis:o,exclusive:r,reverse:i}=t;return{x:()=>{const a=Ze([o],s.rank);let l=Uf(n,o,r,!i);return a!=null&&(l=Re(l,a)),l}}}};const O2={kernelName:ga,inputsToSave:["x","filter"],gradFunc:(n,e,t)=>{const{dilations:s,strides:o,pad:r,dimRoundingMode:i}=t,a=s==null?[1,1]:s;S(Zs(a),()=>`Error in gradient of depthwiseConv2dNative: dilation rates greater than 1 are not yet supported. Got dilations '${a}'`);const[l,c]=e;return S(l.rank===4,()=>`Error in gradient of depthwiseConv2dNative: input must be rank 4, but got rank ${l.rank}.`),S(c.rank===4,()=>`Error in gradient of depthwiseConv2dNative: filter must be rank 4, but got rank ${c.rank}.`),S(l.shape[3]===c.shape[2],()=>`Error in gradient of depthwiseConv2d: number of input channels (${l.shape[3]}) must match the inChannels dimension in filter ${c.shape[2]}.`),S(At(o,a),()=>`Error in gradient of depthwiseConv2d: Either strides or dilations must be  1. Got strides ${o} and dilations '${a}'.`),Gt("depthwiseConv2d",r,i),{x:()=>Wk(l.shape,n,c,o,r,a,i),filter:()=>Bk(l,n,c.shape,o,r,a,i)}}};const L2={kernelName:xa,inputsToSave:["x","filter"],gradFunc:(n,e,t)=>{const[s,o]=e,r={x:s,filter:o,dy:n},i={x:s,filter:o,dy:n};return{x:()=>M.runKernel(lu,r,t),filter:()=>M.runKernel(cu,i,t)}}};const M2={kernelName:vr,outputsToSave:[!0],gradFunc:(n,e)=>{const[t]=e,s={dy:n,y:t};return{x:()=>M.runKernel(hu,s)}}};const P2={kernelName:kr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e,s=L(Pn(st(je(t))),2/Math.sqrt(Math.PI));return{x:()=>L(n,s)}}};const z2={kernelName:Sr,outputsToSave:[!0],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(n,t)}}};const B2={kernelName:ya,inputsToSave:["input"],gradFunc:(n,e)=>{const[t]=e;return{input:()=>V(n,t.shape)}}};const V2={kernelName:Nr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(n,Pn(t))}}};const W2={kernelName:Tr,gradFunc:n=>({x:()=>Ee(n)})};const U2={kernelName:Er,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e,o=we(t.shape,s.shape);return{a:()=>{const a=ge(n,re(s,"float32")),l=ht(t.shape,o);return l.length>0?V(me(a,l),t.shape):a},b:()=>{let a=L(n,re(t,"float32"));const l=ht(s.shape,o);l.length>0&&(a=V(me(a,l),s.shape));const c=je(s);return st(ge(a,re(c,"float32")))}}}};const G2={kernelName:wa,inputsToSave:["x","mean","variance","scale"],gradFunc:(n,e,t)=>{const{varianceEpsilon:s}=t,[o,r,i,a]=e,l=a==null?Oe(1):a,c=ht(r.shape,o.shape),u=[];if(r.rank===1){for(let y=0;y<o.shape.length-1;++y)u.push(o.shape[y]);u.push(1)}const h=be(o,r),d=L(n,l),p=Al(te(i,Oe(s))),f=L(L(L(p,p),p),Oe(-.5));return{x:()=>r.rank===1?V(L(L(n,vn(V(p,[1,1,1,r.shape[0]]),u)),l),o.shape):V(L(L(n,p),l),o.shape),mean:()=>{let y=L(L(p,Oe(-1)),d);return r.rank===1&&(y=me(y,c)),V(y,r.shape)},variance:()=>{let y=L(L(f,h),d);return r.rank===1&&(y=me(y,c)),V(y,r.shape)},scale:()=>{const y=L(h,p);let C=L(n,y);return r.rank===1&&(C=me(C,c)),V(C,r.shape)},offset:()=>{let y=n;return r.rank===1&&(y=me(y,c)),V(y,r.shape)}}}};const H2={kernelName:Ca,inputsToSave:["x","indices"],gradFunc:(n,e,t)=>{const[s,o]=e,{axis:r,batchDims:i}=t,a=ve(r,s.shape)[0],l=(c,u,h)=>()=>{const d=c.shape,p=u.size,f=d.slice(0,a),m=f.length,g=d.slice(r,d.length).slice(1),x=g.length,b=mg(0,m),w=mg(m+1,m+1+x),y=gg([f,[p],g]),C=V(h,y),$=V(u,[p]),v=gg([[m],b,w]),k=Re(C,v);let N=bm(k,$,c.shape[a]);const T=ys(v);return N=Re(N,T),N};if(i===1){const c=s.shape[0],u=s.split(c,0);return{x:()=>Bn(u.map((p,f)=>l(p,o.slice(f,1),n.slice(f,1))())).reshape(s.shape),indices:()=>o}}else return{x:l(s,o,n),indices:()=>o}}};function mg(n,e){const t=[];for(let s=n;s<e;++s)t.push(s);return t}function gg(n){const e=[];for(let t=0;t<n.length;++t)for(let s=0;s<n[t].length;++s)e.push(n[t][s]);return e}const q2={kernelName:Rr,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e;return{a:()=>Ee(t),b:()=>Ee(s)}}};const K2={kernelName:Ar,gradFunc:n=>({x:()=>re(n,"float32")})};const j2={kernelName:Dr,gradFunc:n=>({x:()=>Ee(n)})};const X2={kernelName:Fr,gradFunc:n=>({x:()=>Ee(n)})};const Y2={kernelName:_r,gradFunc:n=>({x:()=>Ee(n)})};const Z2={kernelName:$a,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{alpha:o}=t,r=qt(s,0);return{x:()=>dt(r,n,L(n,o))}}};const J2={kernelName:Lr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>ge(n,te(t,1))}}};const Q2={kernelName:Or,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>ge(n,re(t,"float32"))}}};const eN={kernelName:gw,inputsToSave:[],outputsToSave:[!0],gradFunc:(n,e,t)=>{const[s]=e,{axis:o}=t;return{logits:()=>{const i=Pn(s);return be(n,L(me(n,o,!0),i))}}}};function tN(n,e,t,s=5,o=1,r=1,i=.5){const a={x:n,y:e,dy:t},l={depthRadius:s,bias:o,alpha:r,beta:i};return M.runKernel(xu,a,l)}const nN=W({localResponseNormalizationBackprop_:tN});const sN={kernelName:Ea,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,e,t)=>{const[s,o]=e,{depthRadius:r,bias:i,alpha:a,beta:l}=t;return{x:()=>nN(s,o,n,r,i,a,l)}}};function xg(n,e,t,s){return e.rank<t.rank&&(e=V(e,at(e.shape,s))),n.rank<t.rank&&(n=V(n,at(n.shape,s))),{x:()=>L(n,re(Mn(t,e),n.dtype))}}const bg={kernelName:Ra,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,e,t)=>{const s=t,{reductionIndices:o}=s,r=e[0],i=e[1],a=ve(o,r.shape),l=xg(n,i,r,a);return{x:()=>l.x()}}};const oN={kernelName:Mr,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e;return{a:()=>L(n,re(to(t,s),"float32")),b:()=>L(n,re(wl(t,s),"float32"))}}};function rN(n,e,t,s,o,r,i){const a=A(n,"dy","maxPool3dGrad"),l=A(e,"input","maxPool3dGrad"),c=A(t,"output","maxPool3dGrad");let u=a,h=l,d=c,p=!1;l.rank===4&&(p=!0,u=V(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]]),h=V(l,[1,l.shape[0],l.shape[1],l.shape[2],l.shape[3]]),d=V(c,[1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]])),S(u.rank===5,()=>`Error in maxPool3dGrad: dy must be rank 5 but got rank ${u.rank}.`),S(h.rank===5,()=>`Error in maxPool3dGrad: input must be rank 5 but got rank ${h.rank}.`),S(d.rank===5,()=>`Error in maxPool3dGrad: output must be rank 5 but got rank ${d.rank}.`),Gt("maxPool3dGrad",r,i);const f={dy:u,input:h,output:d},m={filterSize:s,strides:o,pad:r,dimRoundingMode:i},g=M.runKernel(yu,f,m);return p?V(g,[g.shape[1],g.shape[2],g.shape[3],g.shape[4]]):g}const iN=W({maxPool3dGrad_:rN});const aN={kernelName:Da,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,e,t)=>{const[s,o]=e,{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=t;return{x:()=>iN(n,s,o,r,i,a,l)}}};function lN(n,e,t,s,o,r,i){const a=A(n,"dy","maxPoolGrad"),l=A(e,"input","maxPoolGrad"),c=A(t,"output","maxPoolGrad");S(l.rank===a.rank,()=>`Rank of input (${l.rank}) does not match rank of dy (${a.rank})`),S(a.rank===4,()=>`Error in maxPoolGrad: dy must be rank 4 but got rank ${a.rank}.`),S(l.rank===4,()=>`Error in maxPoolGrad: input must be rank 4 but got rank ${l.rank}.`),Gt("maxPoolGrad",r,i);const u={dy:a,input:l,output:c},h={filterSize:s,strides:o,pad:r,dimRoundingMode:i};return M.runKernel(bu,u,h)}const cN=W({maxPoolGrad_:lN});const uN={kernelName:Aa,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,e,t)=>{const[s,o]=e,{filterSize:r,strides:i,pad:a}=t;return{x:()=>cN(n,s,o,r,i,a)}}};const hN={kernelName:Fa,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{axis:o}=t,r=ve(o,s.shape),a=yt(s.shape,r)[1],l=K(a);return{x:()=>{const u=s.shape.slice();r.forEach(p=>{u[p]=1});const h=V(n,u);return ge(L(h,os(s.shape,"float32")),l)}}}};const dN={kernelName:_a,inputsToSave:["x"],outputsToSave:[!0],gradFunc:(n,e,t)=>{const s=t,{axis:o}=s,[r,i]=e,a=ve(o,r.shape),l=xg(n,i,r,a);return{x:()=>l.x()}}};const pN={kernelName:Pr,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e;return{a:()=>L(n,re(Bo(t,s),"float32")),b:()=>L(n,re(qt(t,s),"float32"))}}};const fN={kernelName:Oa,inputsToSave:["x"],gradFunc:(n,e,t)=>{const s=e[0],{paddings:o}=t,r=o.map(i=>i[0]);return{x:()=>He(n,r,s.shape)}}};const mN={kernelName:zr,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e,o=we(t.shape,s.shape);return{a:()=>{const a=ht(t.shape,o);return a.length>0?V(me(n,a),t.shape):n},b:()=>{const a=L(n,st(yl(ge(t,s)))),l=ht(s.shape,o);return l.length>0?V(me(a,l),s.shape):a}}}};const gN={kernelName:Br,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e,o=we(t.shape,s.shape);return{a:()=>{const a=L(n,re(s,"float32")),l=ht(t.shape,o);return l.length>0?V(me(a,l),t.shape):a},b:()=>{const a=L(n,re(t,"float32")),l=ht(s.shape,o);return l.length>0?V(me(a,l),s.shape):a}}}};const xN={kernelName:La,gradFunc:n=>({x:()=>st(n)})};const bN={kernelName:za,inputsToSave:["indices"],gradFunc:(n,e)=>{const t=e[0];return{indices:()=>ot(t.shape,"float32")}}};const yN={kernelName:Pa,gradFunc:n=>({x:()=>Ee(n)})};const wN={kernelName:Ba,saveAllInputs:!0,gradFunc:(n,e,t)=>{const{axis:s}=t;return Cs(n,s).map(r=>()=>r)}};const yg={kernelName:Va,inputsToSave:["x"],gradFunc:(n,e,t)=>{const s=e[0],{paddings:o}=t,r=o.map(i=>i[0]);return{x:()=>He(n,r,s.shape)}}};const CN={kernelName:Vr,inputsToSave:["a","b"],outputsToSave:[!0],gradFunc:(n,e)=>{const[t,s,o]=e,r=t,i=s,a=we(r.shape,i.shape);return{a:()=>{const u=re(i,"float32");let h=L(n,L(u,eo(r,be(u,Oe(1)))));const d=ht(r.shape,a);return d.length>0&&(h=me(h,d)),V(h,r.shape)},b:()=>{const u=qt(r,0),h=dt(u,zn(r),Ee(r));let d=L(n,L(o,h));const p=ht(i.shape,a);return p.length>0&&(d=me(d,p)),V(d,i.shape)}}}};const IN={kernelName:Wa,inputsToSave:["x","alpha"],gradFunc:(n,e)=>{const[t,s]=e,o=qt(t,0);return{x:()=>dt(o,n,L(n,s)),alpha:()=>{let r=dt(o,Ee(n),L(n,t));const i=ht(s.shape,n.shape);return i.length>0&&(r=me(r,i)),V(r,s.shape)}}}};function $N(n,e,t){const s=n.shape.slice();s[t]=1;const o=V(e,s),r=sh(n,t,!0,!1),i=sh(n,t,!0,!0),a=L(r,i);return L(o,a)}function vN(n,e,t){const s=n.shape.length,o=s-t.length,r=Ze(t,s);let i=n;r!=null&&(i=Re(n,r));const a=i.shape.slice(),c=a.splice(s-t.length,t.length).reduce((d,p)=>d*p,1);a.push(c);const u=i.reshape(a);let h=$N(u,e,o);if(h=h.reshape(i.shape),r!=null){const d=ys(r);h=Re(h,d)}return h}const kN={kernelName:Ua,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{axis:o}=t;let r=[];return o==null?r=s.shape.map((i,a)=>a):typeof o=="number"?r=[o]:r=o,{x:()=>vN(s,n,r)}}};const SN={kernelName:$r,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e,o=we(t.shape,s.shape);return{a:()=>{const a=ge(n,re(s,"float32")),l=ht(t.shape,o);return l.length>0?V(me(a,l),t.shape):a},b:()=>{let a=L(n,re(t,"float32"));const l=ht(s.shape,o);l.length>0&&(a=V(me(a,l),s.shape));const c=je(s);return st(ge(a,re(c,"float32")))}}}};const NN={kernelName:Wr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>ge(n,st(je(t)))}}};const TN={kernelName:Gr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e,s=L(Bo(t,6),wi(t));return{x:()=>L(n,re(s,"float32"))}}};const EN={kernelName:Ur,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(n,re(wi(t),"float32"))}}};const RN={kernelName:Ga,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>V(n,t.shape)}}};const AN={kernelName:qa,inputsToSave:["images"],gradFunc:(n,e,t)=>{const[s]=e,o={dy:n,images:s};return{images:()=>M.runKernel(Su,o,t)}}};const DN={kernelName:Ha,inputsToSave:["images"],gradFunc:(n,e,t)=>{const[s]=e,o={dy:n,images:s};return{images:()=>M.runKernel(ku,o,t)}}};const FN={kernelName:Ka,gradFunc:(n,e,t)=>{const{dims:s}=t,o=ve(s,n.shape);return{x:()=>so(n,o)}}};const _N={kernelName:Hr,gradFunc:n=>({x:()=>Ee(n)})};const ON={kernelName:qr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>st(ge(n,L(eo(t,1.5),2)))}}};const LN={kernelName:ja,inputsToSave:["condition"],gradFunc:(n,e)=>{const[t]=e;return{condition:()=>re(Ee(t),"float32"),t:()=>L(n,re(t,n.dtype)),e:()=>L(n,re(ch(t),n.dtype))}}};const MN={kernelName:Kr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>{const s=qt(t,Oe(0)),o=Oe(_l),r=Oe(Ol),i=L(n,r),a=L(L(n,o),Pn(re(t,"float32")));return dt(s,i,a)}}}};const PN={kernelName:Zr,outputsToSave:[!0],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(n,L(t,be(Oe(1),t)))}}};const zN={kernelName:Yr,gradFunc:n=>({x:()=>Ee(n)})};const BN={kernelName:jr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(nh(re(t,"float32")),n)}}};const VN={kernelName:Xr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(Wf(re(t,"float32")),n)}}};const WN={kernelName:Xa,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{begin:o,size:r}=t,i=s.shape,[a,l]=_h(s,o,r),c=[];for(let u=0;u<n.rank;u++)c.push([a[u],i[u]-a[u]-l[u]]);return{x:()=>hh(n,c)}}};const UN={kernelName:Qa,outputsToSave:[!0],gradFunc:(n,e,t)=>{const[s]=e,{dim:o}=t,r=!0,i=L(n,s);return{logits:()=>be(i,L(me(i,[o],r),s))}}};const GN={kernelName:Jr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(n,Mo(t))}}};const wg={kernelName:Za,gradFunc:(n,e,t)=>{const{blockShape:s,paddings:o}=t;return{x:()=>eh(n,s,o)}}};const Cg={kernelName:Ja,gradFunc:(n,e,t)=>{const{axis:s}=t;return{x:()=>vt(n,s)}}};const HN={kernelName:Qr,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>ge(n,L(Dt(re(t,"float32")),2))}}};const qN={kernelName:Nu,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(n,L(re(t,"float32"),2))}}};const KN={kernelName:ei,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e,o=Oe(2);return{a:()=>L(n,L(o,be(t,s))),b:()=>L(n,L(o,be(s,t)))}}};const jN={kernelName:ri,gradFunc:n=>({x:()=>Ee(n)})};const XN={kernelName:ti,inputsToSave:["a","b"],gradFunc:(n,e)=>{const[t,s]=e,o=we(t.shape,s.shape);return{a:()=>{let a=n;const l=ht(t.shape,o);return l.length>0&&(a=me(a,l)),V(a,t.shape)},b:()=>{let a=n;const l=ht(s.shape,o);return l.length>0&&(a=me(a,l)),V(st(a),s.shape)}}}};const YN={kernelName:Ya,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,o=s.shape.slice(),{axis:r}=t;ve(r,s.shape).forEach(c=>{o[c]=1});const a=V(n,o),l=L(a,os(s.shape,"float32"));return{x:()=>l}}};const ZN={kernelName:ni,inputsToSave:["x"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>ge(n,je(nh(t)))}}};const JN={kernelName:si,outputsToSave:[!0],gradFunc:(n,e)=>{const[t]=e;return{x:()=>L(be(Oe(1),je(t)),n)}}};const QN={kernelName:oi,inputsToSave:["x"],gradFunc:(n,e,t)=>{const[s]=e,{reps:o}=t;return{x:()=>{let i=Ee(s);if(s.rank===1)for(let a=0;a<o[0];++a)i=te(i,He(n,[a*s.shape[0]],[s.shape[0]]));else if(s.rank===2)for(let a=0;a<o[0];++a)for(let l=0;l<o[1];++l)i=te(i,He(n,[a*s.shape[0],l*s.shape[1]],[s.shape[0],s.shape[1]]));else if(s.rank===3)for(let a=0;a<o[0];++a)for(let l=0;l<o[1];++l)for(let c=0;c<o[2];++c)i=te(i,He(n,[a*s.shape[0],l*s.shape[1],c*s.shape[2]],[s.shape[0],s.shape[1],s.shape[2]]));else if(s.rank===4)for(let a=0;a<o[0];++a)for(let l=0;l<o[1];++l)for(let c=0;c<o[2];++c)for(let u=0;u<o[3];++u)i=te(i,He(n,[a*s.shape[0],l*s.shape[1],c*s.shape[2],u*s.shape[3]],[s.shape[0],s.shape[1],s.shape[2],s.shape[3]]));else throw new Error(`Gradient for tile operation is not implemented for rank-${s.rank} tensors yet.`);return i}}}};const eT={kernelName:Ao,gradFunc:(n,e,t)=>{const s=t,{perm:o}=s,r=ys(o);return{x:()=>Re(n,r)}}};const tT={kernelName:el,gradFunc:(n,e,t)=>{const s=t,{axis:o}=s;return{value:()=>Bn(n,o)}}};const nT={kernelName:tl,inputsToSave:["segmentIds"],gradFunc:(n,e)=>{const[t]=e;return{x:()=>sT(n,t)}}};function sT(n,e){const t=ws(e,Ee(e)),s=ih(n,t);let o=to(e,Oe(0,"int32"));const r=s.rank-o.rank;for(let a=0;a<r;++a)o=Ht(o,a+1);o=ss(o,os(s.shape,"bool"));const i=Ee(s);return dt(o,s,i)}const oT={kernelName:nl,gradFunc:n=>({x:()=>Ee(n)})};const rT=[fg,n2,s2,o2,r2,i2,a2,l2,c2,u2,h2,d2,m2,b2,y2,w2,C2,I2,$2,v2,k2,S2,T2,N2,A2,D2,F2,_2,O2,L2,SN,M2,P2,z2,B2,V2,U2,W2,G2,H2,q2,K2,j2,X2,Y2,Z2,J2,Q2,eN,sN,bg,bg,oN,aN,uN,hN,dN,pN,fN,mN,gN,xN,bN,yN,wN,yg,yg,CN,IN,kN,NN,TN,EN,RN,AN,DN,FN,_N,ON,LN,MN,PN,zN,BN,VN,WN,UN,GN,wg,wg,Cg,Cg,HN,KN,qN,jN,XN,YN,ZN,JN,QN,eT,tT,nT,oT];for(const n of rT)bw(n);q().prototype.abs=function(){return this.throwIfDisposed(),Pt(this)};q().prototype.acos=function(){return this.throwIfDisposed(),FC(this)};q().prototype.acosh=function(){return this.throwIfDisposed(),OC(this)};q().prototype.add=function(n){return this.throwIfDisposed(),te(this,n)};q().prototype.all=function(n,e){return this.throwIfDisposed(),Mf(this,n,e)};q().prototype.any=function(n,e){return this.throwIfDisposed(),Yu(this,n,e)};q().prototype.argMax=function(n){return this.throwIfDisposed(),Ys(this,n)};q().prototype.argMin=function(n){return this.throwIfDisposed(),BC(this,n)};q().prototype.asScalar=function(){return this.throwIfDisposed(),S(this.size===1,()=>"The array must have only 1 element."),V(this,[])};q().prototype.asType=function(n){return this.throwIfDisposed(),re(this,n)};q().prototype.as1D=function(){return this.throwIfDisposed(),V(this,[this.size])};q().prototype.as2D=function(n,e){return this.throwIfDisposed(),V(this,[n,e])};q().prototype.as3D=function(n,e,t){return this.throwIfDisposed(),V(this,[n,e,t])};q().prototype.as4D=function(n,e,t,s){return this.throwIfDisposed(),V(this,[n,e,t,s])};q().prototype.as5D=function(n,e,t,s,o){return this.throwIfDisposed(),V(this,[n,e,t,s,o])};q().prototype.asin=function(){return this.throwIfDisposed(),WC(this)};q().prototype.asinh=function(){return this.throwIfDisposed(),GC(this)};q().prototype.atan=function(){return this.throwIfDisposed(),qC(this)};q().prototype.atan2=function(n){return this.throwIfDisposed(),jC(this,n)};q().prototype.atanh=function(){return this.throwIfDisposed(),YC(this)},q().prototype.avgPool=function(n,e,t,s){return this.throwIfDisposed(),Qu(this,n,e,t,s)};q().prototype.batchToSpaceND=function(n,e){return this.throwIfDisposed(),eh(this,n,e)};q().prototype.batchNorm=function(n,e,t,s,o){return this.throwIfDisposed(),ml(this,n,e,t,s,o)};q().prototype.broadcastTo=function(n){return this.throwIfDisposed(),pi(this,n)};q().prototype.cast=function(n){return this.throwIfDisposed(),re(this,n)};q().prototype.ceil=function(){return this.throwIfDisposed(),$I(this)};q().prototype.clipByValue=function(n,e){return this.throwIfDisposed(),sn(this,n,e)};q().prototype.concat=function(n,e){return this.throwIfDisposed(),n instanceof ct&&(n=[n]),vt([this,...n],e)};q().prototype.conv1d=function(n,e,t,s,o,r){return this.throwIfDisposed(),Pf(this,n,e,t,s,o,r)};q().prototype.conv2dTranspose=function(n,e,t,s,o){return this.throwIfDisposed(),zf(this,n,e,t,s,o)};q().prototype.conv2d=function(n,e,t,s,o,r){return this.throwIfDisposed(),Qs(this,n,e,t,s,o,r)};q().prototype.cos=function(){return this.throwIfDisposed(),nh(this)};q().prototype.cosh=function(){return this.throwIfDisposed(),Wf(this)};q().prototype.cumprod=function(n,e,t){return this.throwIfDisposed(),sh(this,n,e,t)};q().prototype.cumsum=function(n,e,t){return this.throwIfDisposed(),Uf(this,n,e,t)};q().prototype.depthToSpace=function(n,e){return this.throwIfDisposed(),qI(this,n,e)};q().prototype.depthwiseConv2d=function(n,e,t,s,o,r){return this.throwIfDisposed(),oh(this,n,e,t,s,o,r)};q().prototype.dilation2d=function(n,e,t,s,o){return this.throwIfDisposed(),XI(this,n,e,t,s,o)};q().prototype.divNoNan=function(n){return this.throwIfDisposed(),e$(this,n)};q().prototype.div=function(n){return this.throwIfDisposed(),ge(this,n)};q().prototype.dot=function(n){return this.throwIfDisposed(),n$(this,n)};q().prototype.elu=function(){return this.throwIfDisposed(),gl(this)};q().prototype.equal=function(n){return this.throwIfDisposed(),Mn(this,n)};q().prototype.erf=function(){return this.throwIfDisposed(),Hf(this)};q().prototype.euclideanNorm=function(n,e){return this.throwIfDisposed(),f$(this,n,e)};q().prototype.exp=function(){return this.throwIfDisposed(),Pn(this)};q().prototype.expandDims=function(n){return this.throwIfDisposed(),Ht(this,n)};q().prototype.expm1=function(){return this.throwIfDisposed(),b$(this)};q().prototype.fft=function(){return this.throwIfDisposed(),gm(this)};q().prototype.flatten=function(){return this.throwIfDisposed(),V(this,[this.size])};q().prototype.floor=function(){return this.throwIfDisposed(),yl(this)};q().prototype.floorDiv=function(n){return this.throwIfDisposed(),Lf(this,n)};q().prototype.gather=function(n,e,t){return this.throwIfDisposed(),ih(this,n,e,t)};q().prototype.greaterEqual=function(n){return this.throwIfDisposed(),to(this,n)};q().prototype.greater=function(n){return this.throwIfDisposed(),qt(this,n)};q().prototype.ifft=function(){return this.throwIfDisposed(),yh(this)};q().prototype.irfft=function(){return this.throwIfDisposed(),hk(this)};q().prototype.isFinite=function(){return this.throwIfDisposed(),N$(this)};q().prototype.isInf=function(){return this.throwIfDisposed(),E$(this)};q().prototype.isNaN=function(){return this.throwIfDisposed(),A$(this)};q().prototype.leakyRelu=function(n){return this.throwIfDisposed(),lh(this,n)};q().prototype.lessEqual=function(n){return this.throwIfDisposed(),Bo(this,n)};q().prototype.less=function(n){return this.throwIfDisposed(),wl(this,n)};q().prototype.localResponseNormalization=function(n,e,t,s){return this.throwIfDisposed(),L$(this,n,e,t,s)};q().prototype.logSigmoid=function(){return this.throwIfDisposed(),U$(this)};q().prototype.logSoftmax=function(n){return this.throwIfDisposed(),Yf(this,n)};q().prototype.logSumExp=function(n,e){return this.throwIfDisposed(),Zf(this,n,e)};q().prototype.log=function(){return this.throwIfDisposed(),zn(this)};q().prototype.log1p=function(){return this.throwIfDisposed(),Xf(this)};q().prototype.logicalAnd=function(n){return this.throwIfDisposed(),ss(this,n)};q().prototype.logicalNot=function(){return this.throwIfDisposed(),ch(this)};q().prototype.logicalOr=function(n){return this.throwIfDisposed(),Jf(this,n)};q().prototype.logicalXor=function(n){return this.throwIfDisposed(),Z$(this,n)};q().prototype.matMul=function(n,e,t){return this.throwIfDisposed(),Fe(this,n,e,t)},q().prototype.maxPool=function(n,e,t,s){return this.throwIfDisposed(),uh(this,n,e,t,s)};q().prototype.max=function(n,e){return this.throwIfDisposed(),$n(this,n,e)};q().prototype.maximum=function(n){return this.throwIfDisposed(),ws(this,n)};q().prototype.mean=function(n,e){return this.throwIfDisposed(),lt(this,n,e)};q().prototype.min=function(n,e){return this.throwIfDisposed(),xl(this,n,e)};q().prototype.minimum=function(n){return this.throwIfDisposed(),xi(this,n)};q().prototype.mirrorPad=function(n,e){return this.throwIfDisposed(),rv(this,n,e)};q().prototype.mod=function(n){return this.throwIfDisposed(),av(this,n)};q().prototype.mul=function(n){return this.throwIfDisposed(),L(this,n)};q().prototype.neg=function(){return this.throwIfDisposed(),st(this)};q().prototype.norm=function(n,e,t){return this.throwIfDisposed(),bl(this,n,e,t)};q().prototype.notEqual=function(n){return this.throwIfDisposed(),Il(this,n)};q().prototype.oneHot=function(n,e=1,t=0){return this.throwIfDisposed(),Qf(this,n,e,t)};q().prototype.onesLike=function(){return this.throwIfDisposed(),hn(this)};q().prototype.pad=function(n,e){return this.throwIfDisposed(),hh(this,n,e)},q().prototype.pool=function(n,e,t,s,o,r){return this.throwIfDisposed(),xv(this,n,e,t,s,o,r)};q().prototype.pow=function(n){return this.throwIfDisposed(),eo(this,n)};q().prototype.prelu=function(n){return this.throwIfDisposed(),ph(this,n)};q().prototype.prod=function(n,e){return this.throwIfDisposed(),wv(this,n,e)};q().prototype.reciprocal=function(){return this.throwIfDisposed(),Hv(this)};q().prototype.relu=function(){return this.throwIfDisposed(),no(this)};q().prototype.relu6=function(){return this.throwIfDisposed(),cm(this)};q().prototype.reshapeAs=function(n){return this.throwIfDisposed(),V(this,n.shape)};q().prototype.reshape=function(n){return this.throwIfDisposed(),V(this,n)};q().prototype.resizeBilinear=function(n,e,t){return this.throwIfDisposed(),Im(this,n,e,t)};q().prototype.resizeNearestNeighbor=function(n,e,t){return this.throwIfDisposed(),$m(this,n,e,t)};q().prototype.reverse=function(n){return this.throwIfDisposed(),so(this,n)};q().prototype.rfft=function(){return this.throwIfDisposed(),fk(this)};q().prototype.round=function(){return this.throwIfDisposed(),um(this)};q().prototype.rsqrt=function(){return this.throwIfDisposed(),Al(this)};q().prototype.selu=function(){return this.throwIfDisposed(),hm(this)};q().prototype.separableConv2d=function(n,e,t,s,o,r){return this.throwIfDisposed(),dm(this,n,e,t,s,o,r)};q().prototype.sigmoid=function(){return this.throwIfDisposed(),Mo(this)};q().prototype.sign=function(){return this.throwIfDisposed(),ek(this)};q().prototype.sin=function(){return this.throwIfDisposed(),pm(this)};q().prototype.sinh=function(){return this.throwIfDisposed(),fm(this)};q().prototype.slice=function(n,e){return this.throwIfDisposed(),He(this,n,e)};q().prototype.softmax=function(n){return this.throwIfDisposed(),bh(this,n)};q().prototype.softplus=function(){return this.throwIfDisposed(),gi(this)};q().prototype.spaceToBatchND=function(n,e){return this.throwIfDisposed(),dh(this,n,e)};q().prototype.split=function(n,e){return this.throwIfDisposed(),on(this,n,e)};q().prototype.sqrt=function(){return this.throwIfDisposed(),Dt(this)};q().prototype.square=function(){return this.throwIfDisposed(),je(this)};q().prototype.squaredDifference=function(n){return this.throwIfDisposed(),gk(this,n)};q().prototype.squeeze=function(n){return this.throwIfDisposed(),oo(this,n)};q().prototype.stack=function(n,e){this.throwIfDisposed();const t=n instanceof ct?[this,n]:[this,...n];return Bn(t,e)};q().prototype.step=function(n){return this.throwIfDisposed(),wi(this,n)};q().prototype.stridedSlice=function(n,e,t,s,o,r,i,a){return this.throwIfDisposed(),Ck(this,n,e,t,s,o,r,i,a)};q().prototype.sub=function(n){return this.throwIfDisposed(),be(this,n)};q().prototype.sum=function(n,e){return this.throwIfDisposed(),me(this,n,e)};q().prototype.tan=function(){return this.throwIfDisposed(),$k(this)};q().prototype.tanh=function(){return this.throwIfDisposed(),fl(this)};q().prototype.tile=function(n){return this.throwIfDisposed(),vn(this,n)};q().prototype.toBool=function(){return this.throwIfDisposed(),re(this,"bool")};q().prototype.toFloat=function(){return this.throwIfDisposed(),re(this,"float32")};q().prototype.toInt=function(){return this.throwIfDisposed(),re(this,"int32")};q().prototype.topk=function(n,e){return this.throwIfDisposed(),kk(this,n,e)};q().prototype.transpose=function(n){return this.throwIfDisposed(),Re(this,n)};q().prototype.unique=function(n){return this.throwIfDisposed(),Tk(this,n)};q().prototype.unsortedSegmentSum=function(n,e){return this.throwIfDisposed(),bm(this,n,e)};q().prototype.unstack=function(n){return this.throwIfDisposed(),Cs(this,n)};q().prototype.where=function(n,e){return this.throwIfDisposed(),dt(n,this,e)};q().prototype.zerosLike=function(){return this.throwIfDisposed(),Ee(this)};class Wn extends Error{constructor(e){super(e),Object.setPrototypeOf(this,Wn.prototype)}}class pn extends Error{constructor(e){super(e),Object.setPrototypeOf(this,pn.prototype)}}class O extends Error{constructor(e){super(e),Object.setPrototypeOf(this,O.prototype)}}class Ce extends Error{constructor(e){super(e),Object.setPrototypeOf(this,Ce.prototype)}}class td extends Error{constructor(e){super(e),Object.setPrototypeOf(this,td.prototype)}}class Ig{constructor(e){this.maxEntries=e||100,this.cache=new Map}get(e){let t;return this.cache.has(e)&&(t=this.cache.get(e),this.cache.delete(e),this.cache.set(e,t)),t}put(e,t){if(this.cache.has(e))this.cache.delete(e);else if(this.cache.size>=this.maxEntries){const s=this.cache.keys().next().value;this.cache.delete(s)}this.cache.set(e,t)}getMaxEntries(){return this.maxEntries}setMaxEntries(e){if(e<0)throw new Error(`The maxEntries of LRU caches must be at least 0, but got ${e}.`);if(this.maxEntries>e)for(let t=0;t<this.maxEntries-e;t++){const s=this.cache.keys().next().value;this.cache.delete(s)}this.maxEntries=e}}function ao(n,e){if(Array.isArray(n)){let t=[];for(let s=0;s<e;s++)t=t.concat(n);return t}else{const t=new Array(e);return t.fill(n),t}}function Un(n,e){if(!n)throw new td(e)}function $g(n,e){let t=0;for(const s of n)s===e&&t++;return t}function Kt(n){return n.length===1?n[0]:n}function Pe(n){return Array.isArray(n)?n:[n]}function ls(n){const t=n.replace(/(.)([A-Z][a-z0-9]+)/g,"$1_$2").replace(/([a-z])([A-Z])/g,"$1_$2").toLowerCase();return t[0]!=="_"?t:"private"+t}function lo(n){return n.length<=1||n.indexOf("_")===-1?n:n.replace(/[_]+(\w|$)/g,(e,t)=>t.toUpperCase())}let fn={};function nd(n){if(n==null)return null;const e={};return e.className=n.getClassName(),e.config=n.getConfig(),e}function sd(n){if(!(n==null||typeof n!="object"))if(Array.isArray(n))n.forEach(e=>sd(e));else{const e=Object.keys(n);for(const t of e){const s=n[t];s!=null&&typeof s=="object"&&(!Array.isArray(s)&&s.type==="ndarray"&&typeof s.value=="number"?n[t]=s.value:sd(s))}}}function vi(n,e={},t={},s="object",o=!1){if(typeof n=="string"){const r=n;let i;if(r in t)i=t[r];else if(r in fn)i=fn[r];else if(i=e[r],i==null)throw new O(`Unknown ${s}: ${n}. This may be due to one of the following reasons:
1. The ${s} is defined in Python, in which case it needs to be ported to TensorFlow.js or your JavaScript code.
2. The custom ${s} is defined in JavaScript, but is not registered properly with tf.serialization.registerClass().`);return i}else{const r=n;if(r.className==null||r.config==null)throw new O(`${s}: Improper config format: ${JSON.stringify(r)}.
'className' and 'config' must set.`);const i=r.className;let a,l;if(i in t?[a,l]=t[i]:i in fn?[a,l]=fn.className:i in e&&([a,l]=e[i]),a==null)throw new O(`Unknown ${s}: ${i}. This may be due to one of the following reasons:
1. The ${s} is defined in Python, in which case it needs to be ported to TensorFlow.js or your JavaScript code.
2. The custom ${s} is defined in JavaScript, but is not registered properly with tf.serialization.registerClass().`);if(l!=null){const c={};for(const p of Object.keys(fn))c[p]=fn[p];for(const p of Object.keys(t))c[p]=t[p];const u=r.config;u.customObjects=c;const h=Object.assign({},fn);for(const p of Object.keys(t))fn[p]=t[p];sd(r.config);const d=l(a,r.config,t,o);return fn=Object.assign({},h),d}else{const c=Object.assign({},fn);for(const h of Object.keys(t))fn[h]=t[h];const u=new a(r.config);return fn=Object.assign({},c),u}}}function iT(n,e){return n<e?-1:n>e?1:0}function Ll(n,e){return-1*iT(n,e)}function $s(n){if(n==null)return n;const e=[];for(const t of n)e.indexOf(t)===-1&&e.push(t);return e}function aT(n){if(n==null)throw new O(`Invalid value in obj: ${JSON.stringify(n)}`);for(const e in n)if(n.hasOwnProperty(e))return!1;return!0}function co(n,e,t){if(t!=null&&n.indexOf(t)<0)throw new O(`${t} is not a valid ${e}.  Valid values are ${n} or null/undefined.`)}function od(n,e,t=0,s=1/0){return Un(t>=0),Un(s>=t),Array.isArray(n)&&n.length>=t&&n.length<=s&&n.every(o=>typeof o===e)}function wt(n,e){Array.isArray(n)?(S(n.length>0,()=>`${e} is unexpectedly an empty array.`),n.forEach((t,s)=>wt(t,`element ${s+1} of ${e}`))):S(Number.isInteger(n)&&n>0,()=>`Expected ${e} to be a positive integer, but got ${vg(n)}.`)}function vg(n){return n===null?"null":Array.isArray(n)?"["+n.map(e=>vg(e)).join(",")+"]":typeof n=="string"?`"${n}"`:`${n}`}function lT(n,e,t){let s=t!=null?t():Wt(),o;return(...i)=>{const a=t!=null?t():Wt();return a-s<e||(s=a,o=n(...i)),o}}function kg(n){return n==="relu"?"relu":n==="linear"?"linear":n==="elu"?"elu":null}let cT=0;function Sg(){return cT++}const Ml={};function Pl(n=""){return n in Ml||(Ml[n]=0),Ml[n]+=1,n+Ml[n].toString()}const uT=["channelsFirst","channelsLast"],hT=["nearest","bilinear"],dT=["valid","same","causal"],pT=["max","avg"],fT=["sum","mul","concat","ave"];const Ho=new Map;function rt(n){co(uT,"DataFormat",n)}function mT(n){co(hT,"InterpolationFormat",n)}function rn(n){co(dT,"PaddingMode",n)}function Ng(n){co(pT,"PoolMode",n)}const ki=[],Tg="/";function uo(n,e){ki.push(n);try{const t=e();return ki.pop(),t}catch(t){throw ki.pop(),t}}function gT(){return ki.length===0?"":ki.join(Tg)+Tg}function Eg(n){if(!Ag(n))throw new Error("Not a valid tensor name: '"+n+"'");return gT()+n}function Rg(n){if(!Ag(n))throw new Error("Not a valid tensor name: '"+n+"'");Ho.has(n)||Ho.set(n,0);const e=Ho.get(n);if(Ho.set(n,Ho.get(n)+1),e>0){const t=`${n}_${e}`;return Ho.set(t,1),t}else return n}const xT=new RegExp(/^[A-Za-z0-9][-A-Za-z0-9\._\/]*$/);function Ag(n){return!!n.match(xT)}function bT(n){return n===parseInt(n.toString(),10)}function vs(n,e,t){e==null&&(e=0),t==null&&(t=n.length);let s=1;for(let o=e;o<t;++o)s*=n[o];return s}function qo(n){if(n.length===0)return Number.NaN;let e=Number.POSITIVE_INFINITY;for(let t=0;t<n.length;t++){const s=n[t];s<e&&(e=s)}return e}function ks(n){if(n.length===0)return Number.NaN;let e=Number.NEGATIVE_INFINITY;for(let t=0;t<n.length;t++){const s=n[t];s>e&&(e=s)}return e}function Sn(n,e){if(e<n)throw new O(`end (${e}) < begin (${n}) is forbidden.`);const t=[];for(let s=n;s<e;++s)t.push(s);return t}let rd;function pt(){return rd==null&&(rd=vf().epsilon()),rd}function Nn(){return"channelsLast"}function Gn(n,e){return re(n,e)}function Si(n,e=-1){const t=n.shape.slice();return e<0&&(e=t.length+e+1),t.splice(e,0,1),V(n,t)}function yT(n,e){return B(()=>{if(n.shape.length!==2)throw new O(`repeat() expects a rank-2 tensor, but received a rank-${n.shape.length} tensor.`);const t=Si(n,1);return ld(t,[1,e,1])})}function wT(n){const e=[vs(n.shape)];return V(n,e)}function CT(n){if(n.rank<=1)throw new O(`batchFlatten requires a minimum rank of 2. Got rank: ${n.rank}.`);const e=[n.shape[0],vs(n.shape,1)];return V(n,e)}function ho(n,e,t){return B(()=>{switch(n.rank){case 1:return gh(n,e,t);case 2:return mm(n,[e,0],[t,n.shape[1]]);case 3:return xh(n,[e,0,0],[t,n.shape[1],n.shape[2]]);case 4:return Dl(n,[e,0,0,0],[t,n.shape[1],n.shape[2],n.shape[3]]);case 5:return He(n,[e,0,0,0,0],[t,n.shape[1],n.shape[2],n.shape[3],n.shape[4]]);case 6:return He(n,[e,0,0,0,0,0],[t,n.shape[1],n.shape[2],n.shape[3],n.shape[4],n.shape[5]]);default:throw new O(`sliceAlongFirstAxis() received an unsupported tensor rank: ${n.rank}`)}})}function id(n,e,t){return B(()=>{switch(n.rank){case 1:return gh(n,e,t);case 2:return mm(n,[0,e],[n.shape[0],t]);case 3:return xh(n,[0,0,e],[n.shape[0],n.shape[1],t]);case 4:return Dl(n,[0,0,0,e],[n.shape[0],n.shape[1],n.shape[2],t]);default:throw new O(`sliceAlongLastAxis() received an unsupported tensor rank: ${n.rank}`)}})}function zl(n,e,t,s){return B(()=>{switch(n.rank){case 1:return gh(n,e,t);case 2:switch(s){case 1:return ho(n,e,t);case 2:return id(n,e,t);default:throw new O(`The axis is not within the rank of the tensor ${s}`)}case 3:switch(s){case 1:return ho(n,e,t);case 2:return xh(n,[0,e,0],[n.shape[0],t,n.shape[2]]);case 3:return id(n,e,t);default:throw new O(`The axis is not within the rank of the tensor ${s}`)}case 4:switch(s){case 1:return ho(n,e,t);case 2:return Dl(n,[0,e,0,0],[n.shape[0],t,n.shape[2],n.shape[3]]);case 3:return Dl(n,[0,0,e,0],[n.shape[0],n.shape[1],t,n.shape[3]]);case 4:return id(n,e,t);default:throw new O(`The axis is not within the rank of the tensor ${s}`)}default:throw new O(`sliceAlongLastAxis() received an unsupported tensor rank: ${n.rank}`)}})}function ad(n,e=-1){let t;return e<0&&(t=n[0].rank,t!==0?e=t:e=0),e===n[0].rank&&(e=-1),vt(n,e)}function Dg(n,e){switch(n.rank){case 1:return SI([n,e]);case 2:return TI([n,e],0);case 3:return RI([n,e],0);case 4:return DI([n,e],0);default:throw new O(`concatAlongFirstAxis() received an unsupported tensor rank: ${n.rank}`)}}function ld(n,e){if(Array.isArray(e)||(e=[e]),n.rank!==e.length)throw new O(`The length of input n (${e.length}) does not match the number of dimensions in input x (${n.rank})`);return vn(n,e)}function Bl(n,e=0,t=1,s,o){return Vv(n,e,t,s,o)}function Hn(n,e,t,s){if(n.rank<2||e.rank<2)throw new Ce(`dot requires both inputs to be rank >= 2 but got x shape = ${n.shape} and y shape = ${e.shape}`);if(e.rank>=3){const o=n.shape.slice(-1)[0],r=e.shape.slice(-2)[0];if(o!==r)throw new Ce(`If rank y >= 3, then the second last dim of y must equal the last dim of x but got x shape = ${n.shape} and  y shape = ${e.shape}`)}if(n.rank===2&&e.rank===2)return wm({a:n,b:e,transposeA:!1,transposeB:!1,bias:s?cd(n.rank,s,Nn()):null,activation:t});{const o=n.shape.slice(),r=o.pop();n=V(n,[-1,r]);const i=e.shape.slice(),a=i.pop(),l=i.pop(),c=[...i,a],u=Array.from({length:e.rank},(f,m)=>m===0?e.rank-2:m<=e.rank-2?m-1:m);e=V(Re(e,u),[l,-1]);const h=[...o,...c];return V(wm({a:n,b:e,transposeA:!1,transposeB:!1,bias:s?cd(n.rank,s,Nn()):null,activation:t}),h)}}function Fg(n,e,t){return B(()=>(Array.isArray(e)?e=Zt(e,"int32"):e=re(e,"int32"),ih(n,e,t)))}function Ni(n){return L(n,n)}function cd(n,e,t){const s=e.shape;if(e.rank!==1&&e.rank!==n)throw new O(`Unexpected bias dimensions: ${e.rank}; expected it to be 1 or ${n}`);if(n===5){if(t==="channelsFirst")return s.length===1?V(e,[1,s[0],1,1,1]):V(e,[1,s[3],s[0],s[1],s[2]]);if(t==="channelsLast")return s.length===1?V(e,[1,1,1,1,s[0]]):V(e,[1].concat(s))}else if(n===4){if(t==="channelsFirst")return s.length===1?V(e,[1,s[0],1,1]):V(e,[1,s[2],s[0],s[1]]);if(t==="channelsLast")return s.length===1?V(e,[1,1,1,s[0]]):V(e,[1].concat(s))}else if(n===3){if(t==="channelsFirst")return s.length===1?V(e,[1,s[0],1]):V(e,[1,s[1],s[0]]);if(t==="channelsLast")return s.length===1?V(e,[1,1,s[0]]):V(e,[1].concat(s))}else if(n<3)return e;throw new O(`Unsupported input rank by biasAdd: ${e.rank}`)}function Tn(n,e,t){return B(()=>(t==null&&(t=Nn()),rt(t),te(n,cd(n.rank,e,t))))}function IT(n,e=1){if(e!==1)throw new Ce(`Support for alpha values other than 1 (${e}) is not implemented yet.`);return gl(n)}function $T(n){return B(()=>ge(n,te(Pt(n),1)))}function _g(n,e,t,s){return B(()=>Ok(n,e,t,s))}function vT(n){return B(()=>{const e=te(.5,L(.2,n));return sn(e,0,1)})}function Ti(n,e,t=!1){return t?n():e()}const kT=["fanIn","fanOut","fanAvg"],ST=["normal","uniform","truncatedNormal"];function NT(n){co(kT,"FanMode",n)}function TT(n){co(ST,"Distribution",n)}class mn extends Uo{fromConfigUsesCustomObjects(){return!1}getConfig(){return{}}}class Og extends mn{apply(e,t){return ot(e,t)}}Og.className="Zeros",ee(Og);class ud extends mn{apply(e,t){return os(e,t)}}ud.className="Ones",ee(ud);class Lg extends mn{constructor(e){if(super(),typeof e!="object")throw new O(`Expected argument of type ConstantConfig but got ${e}`);if(e.value===void 0)throw new O(`config must have value set but got ${e}`);this.value=e.value}apply(e,t){return B(()=>L(Oe(this.value),os(e,t)))}getConfig(){return{value:this.value}}}Lg.className="Constant",ee(Lg);class Mg extends mn{constructor(e){super(),this.DEFAULT_MINVAL=-.05,this.DEFAULT_MAXVAL=.05,this.minval=e.minval||this.DEFAULT_MINVAL,this.maxval=e.maxval||this.DEFAULT_MAXVAL,this.seed=e.seed}apply(e,t){return bi(e,this.minval,this.maxval,t,this.seed)}getConfig(){return{minval:this.minval,maxval:this.maxval,seed:this.seed}}}Mg.className="RandomUniform",ee(Mg);class Pg extends mn{constructor(e){super(),this.DEFAULT_MEAN=0,this.DEFAULT_STDDEV=.05,this.mean=e.mean||this.DEFAULT_MEAN,this.stddev=e.stddev||this.DEFAULT_STDDEV,this.seed=e.seed}apply(e,t){if(t=t||"float32",t!=="float32"&&t!=="int32")throw new Ce(`randomNormal does not support dType ${t}.`);return Bl(e,this.mean,this.stddev,t,this.seed)}getConfig(){return{mean:this.mean,stddev:this.stddev,seed:this.seed}}}Pg.className="RandomNormal",ee(Pg);class zg extends mn{constructor(e){super(),this.DEFAULT_MEAN=0,this.DEFAULT_STDDEV=.05,this.mean=e.mean||this.DEFAULT_MEAN,this.stddev=e.stddev||this.DEFAULT_STDDEV,this.seed=e.seed}apply(e,t){if(t=t||"float32",t!=="float32"&&t!=="int32")throw new Ce(`truncatedNormal does not support dType ${t}.`);return xm(e,this.mean,this.stddev,t,this.seed)}getConfig(){return{mean:this.mean,stddev:this.stddev,seed:this.seed}}}zg.className="TruncatedNormal",ee(zg);class Bg extends mn{constructor(e){super(),this.gain=e.gain!=null?e.gain:1}apply(e,t){return B(()=>{if(e.length!==2||e[0]!==e[1])throw new O("Identity matrix initializer can only be used for 2D square matrices.");return L(this.gain,jf(e[0]))})}getConfig(){return{gain:this.gain}}}Bg.className="Identity",ee(Bg);function ET(n,e="channelsLast"){let t,s;if(rt(e),n.length===2)t=n[0],s=n[1];else if([3,4,5].indexOf(n.length)!==-1){if(e==="channelsFirst"){const o=vs(n,2);t=n[1]*o,s=n[0]*o}else if(e==="channelsLast"){const o=vs(n,0,n.length-2);t=n[n.length-2]*o,s=n[n.length-1]*o}}else{const o=vs(n);t=Math.sqrt(o),s=Math.sqrt(o)}return[t,s]}class Jt extends mn{constructor(e){if(super(),e.scale<0)throw new O(`scale must be a positive float. Got: ${e.scale}`);this.scale=e.scale==null?1:e.scale,this.mode=e.mode==null?"fanIn":e.mode,NT(this.mode),this.distribution=e.distribution==null?"normal":e.distribution,TT(this.distribution),this.seed=e.seed}apply(e,t){const s=ET(e),o=s[0],r=s[1];let i=this.scale;if(this.mode==="fanIn"?i/=Math.max(1,o):this.mode==="fanOut"?i/=Math.max(1,r):i/=Math.max(1,(o+r)/2),this.distribution==="normal"){const a=Math.sqrt(i);if(t=t||"float32",t!=="float32"&&t!=="int32")throw new Ce(`${this.getClassName()} does not support dType ${t}.`);return xm(e,0,a,t,this.seed)}else{const a=Math.sqrt(3*i);return bi(e,-a,a,t,this.seed)}}getConfig(){return{scale:this.scale,mode:this.mode,distribution:this.distribution,seed:this.seed}}}Jt.className="VarianceScaling",ee(Jt);class hd extends Jt{constructor(e){super({scale:1,mode:"fanAvg",distribution:"uniform",seed:e==null?null:e.seed})}getClassName(){return Jt.className}}hd.className="GlorotUniform",ee(hd);class dd extends Jt{constructor(e){super({scale:1,mode:"fanAvg",distribution:"normal",seed:e==null?null:e.seed})}getClassName(){return Jt.className}}dd.className="GlorotNormal",ee(dd);class pd extends Jt{constructor(e){super({scale:2,mode:"fanIn",distribution:"normal",seed:e==null?null:e.seed})}getClassName(){return Jt.className}}pd.className="HeNormal",ee(pd);class fd extends Jt{constructor(e){super({scale:2,mode:"fanIn",distribution:"uniform",seed:e==null?null:e.seed})}getClassName(){return Jt.className}}fd.className="HeUniform",ee(fd);class md extends Jt{constructor(e){super({scale:1,mode:"fanIn",distribution:"normal",seed:e==null?null:e.seed})}getClassName(){return Jt.className}}md.className="LeCunNormal",ee(md);class gd extends Jt{constructor(e){super({scale:1,mode:"fanIn",distribution:"uniform",seed:e==null?null:e.seed})}getClassName(){return Jt.className}}gd.className="LeCunUniform",ee(gd);class Vg extends mn{constructor(e){super(),this.DEFAULT_GAIN=1,this.ELEMENTS_WARN_SLOW=2e3,this.gain=e.gain==null?this.DEFAULT_GAIN:e.gain,this.seed=e.seed}apply(e,t){return B(()=>{if(e.length<2)throw new Ce("Shape must be at least 2D.");if(t!=="int32"&&t!=="float32"&&t!==void 0)throw new TypeError(`Unsupported data type ${t}.`);t=t;const s=K(e.slice(0,-1)),o=e[e.length-1],r=s*o;r>this.ELEMENTS_WARN_SLOW&&console.warn(`Orthogonal initializer is being called on a matrix with more than ${this.ELEMENTS_WARN_SLOW} (${r}) elements: Slowness may result.`);const i=[Math.max(o,s),Math.min(o,s)],a=Bl(i,0,1,t,this.seed),l=AS.qr(a,!1);let c=l[0];const h=l[1].flatten().stridedSlice([0],[Math.min(o,s)*Math.min(o,s)],[Math.min(o,s)+1]);return c=L(c,h.sign()),s<o&&(c=c.transpose()),L(Oe(this.gain),c.reshape(e))})}getConfig(){return{gain:this.gain,seed:this.seed}}}Vg.className="Orthogonal",ee(Vg);const Wg={constant:"Constant",glorotNormal:"GlorotNormal",glorotUniform:"GlorotUniform",heNormal:"HeNormal",heUniform:"HeUniform",identity:"Identity",leCunNormal:"LeCunNormal",leCunUniform:"LeCunUniform",ones:"Ones",orthogonal:"Orthogonal",randomNormal:"RandomNormal",randomUniform:"RandomUniform",truncatedNormal:"TruncatedNormal",varianceScaling:"VarianceScaling",zeros:"Zeros"};function Ug(n,e={}){return vi(n,dn.getMap().classNameMap,e,"initializer")}function Je(n){return nd(n)}function Xe(n){if(typeof n=="string"){const e=n in Wg?Wg[n]:n;if(e==="GlorotNormal")return new dd;if(e==="GlorotUniform")return new hd;if(e==="HeNormal")return new pd;if(e==="HeUniform")return new fd;if(e==="LeCunNormal")return new md;if(e==="LeCunUniform")return new gd;{const t={};return t.className=e,t.config={},Ug(t)}}else return n instanceof mn?n:Ug(n)}function xd(n){return Array.isArray(n)&&Array.isArray(n[0])}function Vl(n){return n.length===0?[]:Array.isArray(n[0])?n:[n]}function ye(n){let e;if(Array.isArray(n)){if(n.length!==1)throw new O(`Expected Tensor length to be 1; got ${n.length}`);e=n[0]}else e=n;return e}function De(n){if(Array.isArray(n)&&Array.isArray(n[0])){if(n.length===1)return n=n,n[0];throw new O(`Expected exactly 1 Shape; got ${n.length}`)}else return n}function Wl(n){let e=0;for(const t of n)t.shape.length===0?e+=1:e+=t.shape.reduce((s,o)=>s*o);return e}const Gg="Variable";class RT{constructor(e,t="float32",s=Gg,o=!0,r=null){this.dtype=t==null?"float32":t,this.shape=e.shape,this.id=Sg(),s=s==null?Gg:s,this.originalName=Eg(s),this.name=Rg(this.originalName),this.trainable_=o,this.constraint=r,this.val=Ak(e,this.trainable_,this.name,this.dtype)}read(){return this.assertNotDisposed(),this.val}write(e){return this.assertNotDisposed(),AT(this.val,e),this.val.id!==e.id&&(this.val.assign(e),this.constraint!=null&&this.val.assign(this.constraint.apply(this.val))),this}dispose(){this.assertNotDisposed(),this.val.dispose()}assertNotDisposed(){if(this.val.isDisposed)throw new Error(`LayersVariable ${this.name} is already disposed.`)}get trainable(){return this.trainable_}set trainable(e){this.trainable_=e,this.val.trainable=e}}function AT(n,e){if(n.shape.toString()!==e.shape.toString())throw new Error("Shape mismatch: "+JSON.stringify(n.shape)+" vs. "+JSON.stringify(e.shape))}function bd(n){return n.map(e=>e.read())}function yd(n){n.forEach(e=>{e[0].write(e[1])})}class ft{constructor(e){this.dtype=e.dtype,this.shape=e.shape,e.shape!=null?this.ndim=e.shape.length:this.ndim=e.ndim,this.maxNDim=e.maxNDim,this.minNDim=e.minNDim,this.axes=e.axes||{}}}class qn{constructor(e,t,s,o,r,i,a){this.dtype=e,this.shape=t,this.sourceLayer=s,this.inputs=o,this.callArgs=r,this.outputTensorIndex=a,this.id=Sg(),i!=null&&(this.originalName=Eg(i),this.name=Rg(this.originalName)),this.rank=t.length}}let DT=0;class Ul{constructor(e,t){this.callArgs=t,this.id=DT++,this.outboundLayer=e.outboundLayer,this.inboundLayers=e.inboundLayers,this.nodeIndices=e.nodeIndices,this.tensorIndices=e.tensorIndices,this.inputTensors=e.inputTensors,this.outputTensors=e.outputTensors,this.inputMasks=e.inputMasks,this.outputMasks=e.outputMasks,this.inputShapes=e.inputShapes,this.outputShapes=e.outputShapes;for(const s of e.inboundLayers)s!=null&&s.outboundNodes.push(this);e.outboundLayer.inboundNodes.push(this)}getConfig(){const e=[];for(const t of this.inboundLayers)t!=null?e.push(t.name):e.push(null);return{outboundLayer:this.outboundLayer?this.outboundLayer.name:null,inboundLayers:e,nodeIndices:this.nodeIndices,tensorIndices:this.tensorIndices}}}let FT=0;class Se extends Uo{constructor(e={}){super(),this._callHook=null,this._addedWeightNames=[],this._stateful=!1,this.id=FT++,this.activityRegularizer=null,this.inputSpec=null,this.supportsMasking=!1,this._trainableWeights=[],this._nonTrainableWeights=[],this._losses=[],this._updates=[],this._built=!1,this.inboundNodes=[],this.outboundNodes=[];let t=e.name;if(!t){const s=this.getClassName();t=ls(s)+"_"+Pl(s)}if(this.name=t,this.trainable_=e.trainable==null?!0:e.trainable,e.inputShape!=null||e.batchInputShape!=null){let s;if(e.batchInputShape!=null)s=e.batchInputShape;else if(e.inputShape!=null){let r=null;e.batchSize!=null&&(r=e.batchSize),s=[r].concat(e.inputShape)}this.batchInputShape=s;let o=e.dtype;o==null&&(o=e.inputDType),o==null&&(o="float32"),this.dtype=o}e.weights!=null?this.initialWeights=e.weights:this.initialWeights=null,this._refCount=null,this.fastWeightInitDuringBuild=!1}static nodeKey(e,t){return e.name+"_ib-"+t.toString()}getNodeAtIndex(e,t){if(this.inboundNodes.length===0)throw new pn(`The layer has never been called and thus has no defined ${t}.`);if(this.inboundNodes.length<=e)throw new O(`Asked to get ${t} at node ${e}, but the layer has only ${this.inboundNodes.length} inbound nodes.`);return this.inboundNodes[e]}getInputAt(e){return Kt(this.getNodeAtIndex(e,"input").inputTensors)}getOutputAt(e){return Kt(this.getNodeAtIndex(e,"output").outputTensors)}get input(){if(this.inboundNodes.length>1)throw new Wn(`Layer ${this.name} has multiple inbound nodes, hence the notion of "layer input" is ill-defined. Use \`getInputAt(nodeIndex)\` instead.`);if(this.inboundNodes.length===0)throw new Wn(`Layer ${this.name} is not connected, no input to return.`);return Kt(this.getNodeAtIndex(0,"input").inputTensors)}get output(){if(this.inboundNodes.length===0)throw new Wn(`Layer ${this.name} has no inbound nodes.`);if(this.inboundNodes.length>1)throw new Wn(`Layer ${this.name} has multiple inbound nodes, hence the notion of "layer output" is ill-defined. Use \`getOutputAt(nodeIndex)\` instead.`);return Kt(this.getNodeAtIndex(0,"output").outputTensors)}get losses(){return this._losses}calculateLosses(){return this.losses.map(e=>e())}get updates(){return this._updates}get built(){return this._built}set built(e){this._built=e}get trainable(){return this.trainable_}set trainable(e){this._trainableWeights.forEach(t=>t.trainable=e),this.trainable_=e}get trainableWeights(){return this.trainable_?this._trainableWeights.filter(e=>e.trainable):[]}set trainableWeights(e){this._trainableWeights=e}get nonTrainableWeights(){return this.trainable?this._trainableWeights.filter(e=>!e.trainable).concat(this._nonTrainableWeights):this._trainableWeights.concat(this._nonTrainableWeights)}set nonTrainableWeights(e){this._nonTrainableWeights=e}get weights(){return this.trainableWeights.concat(this.nonTrainableWeights)}get stateful(){return this._stateful}resetStates(){if(!this.stateful)throw new Error("Cannot call the resetStates() method of a non-stateful Layer object.")}assertInputCompatibility(e){const t=Pe(e);if(this.inputSpec==null||this.inputSpec.length===0)return;const s=Pe(this.inputSpec);if(t.length!==s.length)throw new O(`Layer ${this.name} expects ${s.length} inputs, but it received ${t.length} input tensors. Input received: ${e}`);for(let o=0;o<t.length;o++){const r=t[o],i=s[o];if(i==null)continue;const a=r.rank;if(i.ndim!=null&&a!==i.ndim)throw new O(`Input ${o} is incompatible with layer ${this.name}: expected ndim=${i.ndim}, found ndim=${a}`);if(i.maxNDim!=null&&a>i.maxNDim)throw new O(`Input ${o} is incompatible with layer ${this.name}: expected max_ndim=${i.maxNDim}, found ndim=${a}`);if(i.minNDim!=null&&a<i.minNDim)throw new O(`Input ${o} is incompatible with layer ${this.name}: expected min_ndim=${i.minNDim}, found ndim=${a}.`);if(i.dtype!=null&&r.dtype!==i.dtype)throw new O(`Input ${o} is incompatible with layer ${this.name} : expected dtype=${i.dtype}, found dtype=${r.dtype}.`);if(i.axes){const l=r.shape;for(const c in i.axes){const u=Number(c),h=i.axes[c],d=u>=0?l[u]:l[l.length+u];if(h!=null&&[h,null].indexOf(d)===-1)throw new O(`Input ${o} is incompatible with layer ${this.name}: expected axis ${u} of input shape to have value ${h} but got shape ${l}.`)}}if(i.shape!=null)for(let l=0;l<i.shape.length;++l){const c=i.shape[l],u=r.shape[l];if(c!=null&&u!=null&&c!==u)throw new O(`Input ${o} is incompatible with layer ${this.name}: expected shape=${i.shape}, found shape=${r.shape}.`)}}}call(e,t){return e}invokeCallHook(e,t){this._callHook!=null&&this._callHook(e,t)}setCallHook(e){this._callHook=e}clearCallHook(){this._callHook=null}apply(e,t){t=t||{},this.assertNotDisposed();const s=Pe(e),o=LT(e),r=MT(e);if(o===r)throw new O("Arguments to apply() must be all SymbolicTensors or all Tensors");return uo(this.name,()=>{if(!this.built){this.assertInputCompatibility(e);const i=[];for(const a of Pe(e))i.push(a.shape);this.build(Kt(i)),this.built=!0,this.initialWeights&&this.setWeights(this.initialWeights),this._refCount===null&&r&&(this._refCount=1)}if(this.assertInputCompatibility(e),r){let i=this.call(e,t);this.supportsMasking&&this.setMaskMetadata(e,i);const a=Pe(i),l=[];for(let c of a)s.indexOf(c)!==-1&&(c=c.clone()),l.push(c);if(i=Kt(l),this.activityRegularizer!=null)throw new Ce("Layer invocation in the presence of activity regularizer(s) is not supported yet.");return i}else{const i=_T(e),a=this.computeOutputShape(i);let l;const c=OT(e);if(this.warnOnIncompatibleInputShape(Array.isArray(e)?i[0]:i),a!=null&&a.length>0&&Array.isArray(a[0])?l=a.map((u,h)=>new qn(c,u,this,Pe(e),t,this.name,h)):l=new qn(c,a,this,Pe(e),t,this.name),this.addInboundNode(e,l,null,null,i,a,t),this._refCount++,this.activityRegularizer!=null)throw new Ce("Layer invocation in the presence of activity regularizer(s) is not supported yet.");return l}})}warnOnIncompatibleInputShape(e){if(this.batchInputShape!=null)if(e.length!==this.batchInputShape.length)console.warn(`The rank of the input tensor provided (shape: ${JSON.stringify(e)}) does not match that of the batchInputShape (${JSON.stringify(this.batchInputShape)}) of the layer ${this.name}`);else{let t=!1;this.batchInputShape.forEach((s,o)=>{s!=null&&e[o]!=null&&e[o]!==s&&(t=!0)}),t&&console.warn(`The shape of the input tensor (${JSON.stringify(e)}) does not match the expectation of layer ${this.name}: ${JSON.stringify(this.batchInputShape)}`)}}get outputShape(){if(this.inboundNodes==null||this.inboundNodes.length===0)throw new Wn(`The layer ${this.name} has never been called and thus has no defined output shape.`);const e=[];for(const t of this.inboundNodes){const s=JSON.stringify(t.outputShapes);e.indexOf(s)===-1&&e.push(s)}if(e.length===1){const t=this.inboundNodes[0].outputShapes;return Array.isArray(t)&&Array.isArray(t[0])&&t.length===1?t[0]:t}else throw new Wn(`The layer ${this.name} has multiple inbound nodes with different output shapes. Hence the notion of "output shape" is ill-defined for the layer.`)}countParams(){if(!this.built)throw new pn(`You tried to call countParams() on ${this.name}, but the layer is not built yet. Build it first by calling build(batchInputShape).`);return Wl(this.weights)}build(e){this.built=!0}getWeights(e=!1){return bd(e?this.trainableWeights:this.weights)}setWeights(e){B(()=>{const t=this.weights;if(t.length!==e.length)throw new O(`You called setWeights(weights) on layer "${this.name}" with a weight list of length ${e.length}, but the layer was expecting ${t.length} weights. Provided weights: ${e}...`);if(t.length===0)return;const s=[],o=bd(t);for(let r=0;r<o.length;++r){const i=o[r],a=t[r],l=e[r];if(!_e(i.shape,l.shape))throw new O(`Layer weight shape ${i.shape} not compatible with provided weight shape ${l.shape}`);s.push([a,l])}yd(s)})}addWeight(e,t,s,o,r,i,a,l){if(this._addedWeightNames.indexOf(e)!==-1)throw new O(`Duplicate weight name ${e} for layer ${this.name}`);this._addedWeightNames.push(e),s==null&&(s="float32"),this.fastWeightInitDuringBuild&&(o=l!=null?l():Xe("zeros"));const c=o.apply(t,s),u=new RT(c,s,e,i,a);return c.dispose(),r!=null&&this.addLoss(()=>r.apply(u.read())),i==null&&(i=!0),i?this._trainableWeights.push(u):this._nonTrainableWeights.push(u),u}setFastWeightInitDuringBuild(e){this.fastWeightInitDuringBuild=e}addLoss(e){e==null||Array.isArray(e)&&e.length===0||(e=Pe(e),this._losses!==void 0&&this._losses!==null&&this.losses.push(...e))}computeOutputShape(e){return e}computeMask(e,t){if(!this.supportsMasking){if(t!=null)if(Array.isArray(t))t.forEach(s=>{if(s!=null)throw new TypeError(`Layer ${this.name} does not support masking, but was passed an inputMask.`)});else throw new TypeError(`Layer ${this.name} does not support masking, but was passed an inputMask.`);return null}return t}setMaskMetadata(e,t,s){if(!this.supportsMasking)return;const o=this.computeMask(e,s),r=Pe(t),i=Pe(o);if(r.length!==i.length)throw new Error(`${this.name} outputs ${r.length} tensors but ${r.length} masks for those tensors`);for(let a=0;a<r.length;a++)r[a].kerasMask=i[a]}addInboundNode(e,t,s,o,r,i,a=null){const l=Pe(e);t=Pe(t),s=Pe(s),o=Pe(o),r=Vl(r),i=Vl(i);const c=[],u=[],h=[];for(const d of l)c.push(d.sourceLayer),u.push(d.nodeIndex),h.push(d.tensorIndex);new Ul({outboundLayer:this,inboundLayers:c,nodeIndices:u,tensorIndices:h,inputTensors:l,outputTensors:t,inputMasks:s,outputMasks:o,inputShapes:r,outputShapes:i},a);for(let d=0;d<t.length;d++)t[d].sourceLayer=this,t[d].nodeIndex=this.inboundNodes.length-1,t[d].tensorIndex=d}getConfig(){const e={name:this.name,trainable:this.trainable};return this.batchInputShape!=null&&(e.batchInputShape=this.batchInputShape),this.dtype!=null&&(e.dtype=this.dtype),e}disposeWeights(){return this.weights.forEach(e=>e.dispose()),this.weights.length}assertNotDisposed(){if(this._refCount===0)throw new Error(`Layer '${this.name}' is already disposed.`)}dispose(){if(!this.built)throw new Error(`Cannot dispose Layer ${this.name} because it has not been built yet.`);if(this._refCount===null)throw new Error(`Cannot dispose Layer ${this.name} because it has not been used yet.`);this.assertNotDisposed();let e=0;return--this._refCount===0&&(e=this.disposeWeights()),{refCountAfterDispose:this._refCount,numDisposedVariables:e}}}function _T(n){n=Pe(n);const e=[];for(const t of n)e.push(t.shape);return Kt(e)}function OT(n){return"float32"}function Hg(n,e,t){if((e==null||t!=null&&t>0)&&(e=n.sourceLayer,t=n.nodeIndex),e.inboundNodes.length===0)return[n];{const s=e.inboundNodes[t];if(s.inboundLayers.length===0)return s.inputTensors;{const o=[];for(let r=0;r<s.inboundLayers.length;r++){const i=s.inputTensors[r],a=s.inboundLayers[r],l=s.nodeIndices[r],c=Hg(i,a,l);for(const u of c)o.indexOf(u)===-1&&o.push(u)}return o}}}function LT(n){let e=!0;for(const t of Pe(n))if(!(t instanceof qn)){e=!1;break}return e}function MT(n){let e=!0;for(const t of Pe(n))if(t instanceof qn){e=!1;break}return e}class Ei extends Se{constructor(e){if(super({dtype:e.dtype,name:e.name!=null?e.name:Pl("input").toString()}),e.batchSize==null&&(e.batchSize=null),e.sparse==null&&(e.sparse=!1),this.trainable=!1,this.built=!0,this.sparse=e.sparse,e.inputShape!=null&&e.batchInputShape!=null)throw new O("Only provide the inputShape OR batchInputShape argument to inputLayer, not both at the same time.");let t=e.batchInputShape;if(t==null){if(e.inputShape==null)throw new O("An InputLayer should be passed either a `batchInputShape` or an `inputShape`.");t=[e.batchSize].concat(e.inputShape)}else if(e.batchSize!=null)throw new O("Cannot specify batchSize if batchInputShape is specified when creating an InputLayer.");const s=e.dtype||"float32";this.batchInputShape=t,this.dtype=s,this.inputSpec=[{shape:t}];const o=new qn(this.dtype,this.batchInputShape,this,[],{},this.name);o.nodeIndex=0,o.tensorIndex=0,new Ul({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:[o],outputTensors:[o],inputMasks:[null],outputMasks:[null],inputShapes:[t],outputShapes:[t]})}apply(e,t){throw new O(`Cannot pass any input to an InputLayer's apply() method. InputLayer name: ${this.name}`)}dispose(){return{refCountAfterDispose:this._refCount,numDisposedVariables:0}}getConfig(){return{batchInputShape:this.batchInputShape,dtype:this.dtype,sparse:this.sparse,name:this.name}}}Ei.className="InputLayer",ee(Ei);function PT(n){if(n.batchShape==null&&n.shape==null)throw new Error("Please provide to Input either a `shape` or a `batchShape` argument. Note that `shape` does not include the batch dimension.");if(n.batchShape!=null&&n.shape!=null)throw new O("Please provide either a `shape` or `batchShape` argument to Input, but not both.");let e=n.batchShape;n.shape!=null&&e==null&&(e=[null].concat(n.shape));let t=n.dtype;return t==null&&(t="float32"),new Ei({batchInputShape:e,name:n.name,dtype:t,sparse:n.sparse}).inboundNodes[0].outputTensors[0]}function zT(n,e){if(n.dtype==null||n.dtype===e.dtype)return e;try{return re(e,n.dtype)}catch(t){throw new O(`The dtype of the feed (${e.dtype}) can not be cast to the dtype of the key '${n.name}' (${n.dtype}).`)}}class Ss{constructor(e){if(this.id2Value={},this.id2Mask={},this.name2Id={},e instanceof Ss)for(const t in e.id2Value)this.id2Value[t]=e.id2Value[t],t in e.id2Mask&&(this.id2Mask[t]=e.id2Mask[t]);else{if(e==null)return;for(const t of e)this.add(t.key,t.value)}}add(e,t,s){if(this.id2Value[e.id]==null)this.id2Value[e.id]=zT(e,t),this.name2Id[e.name]=e.id,s!=null&&(this.id2Mask[e.id]=s);else throw new O(`Duplicate key: name=${e.name}, id=${e.id}`);return this}addFeed(e){this.add(e.key,e.value)}hasKey(e){return this.id2Value[e.id]!=null}names(){return Object.keys(this.name2Id)}getValue(e){if(e instanceof qn){if(this.id2Value[e.id]==null)throw new O(`Nonexistent key: ${e.name}`);return this.id2Value[e.id]}else{const t=this.name2Id[e];if(t==null)throw new O(`Feed dict has no SymbolicTensor name: ${e}`);return this.id2Value[t]}}getMask(e){if(e instanceof qn){if(this.id2Value[e.id]==null)throw new O(`Nonexistent key: ${e.name}`);return this.id2Mask[e.id]}else{const t=this.name2Id[e];if(t==null)throw new O(`Feed dict has no SymbolicTensor name: ${e}`);return this.id2Mask[t]}}disposeMasks(){this.id2Mask!=null&&xe(this.id2Mask)}}const Gl=new Ig,Hl=new Ig;function BT(n){Gl!=null&&Gl.setMaxEntries(n),Hl!=null&&Hl.setMaxEntries(n)}function Ri(n,e,t,s){const o=t==null?!1:t.training,r=Array.isArray(n),i=r?n:[n],a=i.map(f=>f.name),l=[],c=e.names();for(const f of a)c.indexOf(f)!==-1?l.push(e.getValue(f)):l.push(null);const u=a.join(",")+"|"+e.names().sort().join(",");let h=Gl.get(u),d;if(h==null){const f=VT(i,e);h=f.sorted,d=f.recipientCounts,Gl.put(u,h),Hl.put(u,d)}d={},o||Object.assign(d,Hl.get(u));const p=new Ss(e);for(let f=0;f<h.length;++f){const m=h[f],g=m.sourceLayer;if(g instanceof Ei)continue;const x=[],b=[],w=[];let y=!1;for(const N of m.inputs){const T=p.getValue(N),I=p.getMask(N);x.push(T),b.push(I),I!=null&&(y=!0),o||(d[N.name]--,d[N.name]===0&&!e.hasKey(N)&&a.indexOf(N.name)===-1&&!T.isDisposed&&N.sourceLayer.stateful!==!0&&w.push(T))}y&&(t=t||{},t.mask=b[0]);const C=Pe(g.apply(x,t));let $=null;g.supportsMasking&&($=g.computeMask(x,b));const v=UT(m),k=Array.isArray(v)?v:[v];for(let N=0;N<k.length;++N){p.hasKey(k[N])||p.add(k[N],C[N],Array.isArray($)?$[0]:$);const T=a.indexOf(k[N].name);T!==-1&&(l[T]=C[N])}o||xe(w)}return p.disposeMasks(),r?l:l[0]}function VT(n,e){S(n!=null&&n.length>0,()=>"Expected at least one fetch, got none");let t=[],s={};if(n.length===1){const o=qg(n[0],e);t=o.sorted,s=o.recipientMap}else{const o=new Set;for(const r of n){const{sorted:i,recipientMap:a}=qg(r,e);for(const l of i)o.has(l.name)||(t.push(l),o.add(l.name));for(const l in a)s[l]==null&&(s[l]=new Set),a[l].forEach(c=>s[l].add(c))}}return{sorted:t,recipientCounts:WT(s)}}function WT(n){const e={};for(const t in n)e[t]=n[t].size;return e}function qg(n,e){const t=new Set,s=[],o={};for(const a of e.names())t.add(a);const r=[],i=[];for(r.push(n);r.length>0;){const a=r[r.length-1];if(t.has(a.name)){r.pop();continue}const l=i[i.length-1]===r.length-1;if(a.inputs.length===0||l)r.pop(),s.push(a),t.add(a.name),l&&i.pop();else{i.push(r.length-1);for(const c of a.inputs)o[c.name]==null&&(o[c.name]=new Set),o[c.name].add(a.name),!t.has(c.name)&&r.push(c)}}return{sorted:s,recipientMap:o}}function UT(n){let e;if(n.sourceLayer.inboundNodes.length===1)e=n.sourceLayer.output;else{let t=null;for(let s=0;s<n.sourceLayer.inboundNodes.length;++s)for(const o of n.sourceLayer.inboundNodes[s].outputTensors)if(o.id===n.id){t=s;break}e=n.sourceLayer.getOutputAt(t)}return e}U().registerFlag("TOPOLOGICAL_SORT_CACHE_MAX_ENTRIES",()=>100,BT);function wd(n,e){return B(()=>Dt(me(L(n,n),e,!0)))}class Ai extends Uo{getConfig(){return{}}}class Kg extends Ai{constructor(e){super(),this.defaultMaxValue=2,this.defaultAxis=0,this.maxValue=e.maxValue!=null?e.maxValue:this.defaultMaxValue,this.axis=e.axis!=null?e.axis:this.defaultAxis}apply(e){return B(()=>{const t=wd(e,this.axis),s=sn(t,0,this.maxValue);return L(e,ge(s,te(pt(),t)))})}getConfig(){return{maxValue:this.maxValue,axis:this.axis}}}Kg.className="MaxNorm",ee(Kg);class jg extends Ai{constructor(e){super(),this.defaultAxis=0,this.axis=e.axis!=null?e.axis:this.defaultAxis}apply(e){return B(()=>ge(e,te(pt(),wd(e,this.axis))))}getConfig(){return{axis:this.axis}}}jg.className="UnitNorm",ee(jg);class Xg extends Ai{apply(e){return no(e)}}Xg.className="NonNeg",ee(Xg);class Yg extends Ai{constructor(e){super(),this.defaultMinValue=0,this.defaultMaxValue=1,this.defaultRate=1,this.defaultAxis=0,this.minValue=e.minValue!=null?e.minValue:this.defaultMinValue,this.maxValue=e.maxValue!=null?e.maxValue:this.defaultMaxValue,this.rate=e.rate!=null?e.rate:this.defaultRate,this.axis=e.axis!=null?e.axis:this.defaultAxis}apply(e){return B(()=>{const t=wd(e,this.axis),s=te(L(this.rate,sn(t,this.minValue,this.maxValue)),L(1-this.rate,t));return L(e,ge(s,te(pt(),t)))})}getConfig(){return{minValue:this.minValue,maxValue:this.maxValue,rate:this.rate,axis:this.axis}}}Yg.className="MinMaxNorm",ee(Yg);const Zg={maxNorm:"MaxNorm",minMaxNorm:"MinMaxNorm",nonNeg:"NonNeg",unitNorm:"UnitNorm"};function mt(n){return nd(n)}function Jg(n,e={}){return vi(n,dn.getMap().classNameMap,e,"constraint")}function gt(n){if(n==null)return null;if(typeof n=="string"){const t={className:n in Zg?Zg[n]:n,config:{}};return Jg(t)}else return n instanceof Ai?n:Jg(n)}function po(n){return X(this,null,function*(){if(n==null)return;const e=[],t=[],s=[];for(const o in n){const r=n[o];if(typeof r!="number"){const i=r;e.push(i.data()),t.push(o),s.push(i)}}if(e.length>0){const o=yield Promise.all(e);for(let r=0;r<o.length;++r)n[t[r]]=o[r][0];xe(s)}})}function Qg(n){if(n!=null)for(const e in n){const t=n[e];typeof t!="number"&&t.dispose()}}var ex;(function(n){n[n.SILENT=0]="SILENT",n[n.VERBOSE=1]="VERBOSE"})(ex||(ex={}));const GT=125;class Di{constructor(){this.validationData=null}setParams(e){this.params=e}onEpochBegin(e,t){return X(this,null,function*(){})}onEpochEnd(e,t){return X(this,null,function*(){})}onBatchBegin(e,t){return X(this,null,function*(){})}onBatchEnd(e,t){return X(this,null,function*(){})}onTrainBegin(e){return X(this,null,function*(){})}onTrainEnd(e){return X(this,null,function*(){})}setModel(e){}}class HT{constructor(e,t=10){e==null&&(e=[]),this.callbacks=e,this.queueLength=t}append(e){this.callbacks.push(e)}setParams(e){for(const t of this.callbacks)t.setParams(e)}setModel(e){for(const t of this.callbacks)t.setModel(e)}onEpochBegin(e,t){return X(this,null,function*(){t==null&&(t={});for(const s of this.callbacks)yield s.onEpochBegin(e,t)})}onEpochEnd(e,t){return X(this,null,function*(){t==null&&(t={});for(const s of this.callbacks)yield s.onEpochEnd(e,t)})}onBatchBegin(e,t){return X(this,null,function*(){t==null&&(t={});for(const s of this.callbacks)yield s.onBatchBegin(e,t)})}onBatchEnd(e,t){return X(this,null,function*(){t==null&&(t={});for(const s of this.callbacks)yield s.onBatchEnd(e,t)})}onTrainBegin(e){return X(this,null,function*(){e==null&&(e={});for(const t of this.callbacks)yield t.onTrainBegin(e)})}onTrainEnd(e){return X(this,null,function*(){e==null&&(e={});for(const t of this.callbacks)yield t.onTrainEnd(e)})}}class qT extends Di{constructor(){super()}onEpochBegin(e){return X(this,null,function*(){this.seen=0,this.totals={}})}onBatchEnd(e,t){return X(this,null,function*(){t==null&&(t={});const s=t.size==null?0:t.size;this.seen+=s;for(const o in t){const r=t[o];if(typeof r=="number")this.totals.hasOwnProperty(o)||(this.totals[o]=0),this.totals[o]=this.totals[o]+r*s;else{let i;o in this.totals?i=this.totals[o]:this.totals[o]=0;const a=B(()=>te(this.totals[o],L(r,s)));this.totals[o]=a,i!=null&&i.dispose()}}})}onEpochEnd(e,t){return X(this,null,function*(){if(t!=null)for(const s of this.params.metrics)this.totals[s]!=null&&(typeof this.totals[s]=="number"?t[s]=this.totals[s]/this.seen:B(()=>{const o=L(ge(1,this.seen),this.totals[s]);t[s]=o,this.totals[s].dispose(),On(t[s])}))})}}class KT extends Di{onTrainBegin(e){return X(this,null,function*(){this.epoch=[],this.history={}})}onEpochEnd(e,t){return X(this,null,function*(){t==null&&(t={}),this.epoch.push(e);for(const s in t)this.history[s]==null&&(this.history[s]=[]),this.history[s].push(t[s])})}syncData(){return X(this,null,function*(){const e=[],t=[],s=[];for(const r in this.history){const i=this.history[r];for(let a=0;a<i.length;++a)if(typeof i[a]!="number"){const l=i[a];e.push(l.data()),t.push(r),s.push(a)}}const o=yield Promise.all(e);for(let r=0;r<o.length;++r)this.history[t[r]][s[r]].dispose(),this.history[t[r]][s[r]]=o[r][0]})}}class jT extends Di{constructor(e,t){if(super(),this.currentEpoch=0,this.nowFunc=e.nowFunc,this.nextFrameFunc=e.nextFrameFunc||Wm,this.yieldEvery=t||"auto",this.yieldEvery==="auto"&&(this.yieldEvery=GT),this.yieldEvery==="never"&&e.onYield!=null)throw new Error("yieldEvery is `never` but you provided an `onYield` callback. Either change `yieldEvery` or remove the callback");Pc(this.yieldEvery)&&(this.maybeWait=lT(this.maybeWait.bind(this),this.yieldEvery,this.nowFunc)),this.trainBegin=e.onTrainBegin,this.trainEnd=e.onTrainEnd,this.epochBegin=e.onEpochBegin,this.epochEnd=e.onEpochEnd,this.batchBegin=e.onBatchBegin,this.batchEnd=e.onBatchEnd,this.yield=e.onYield}maybeWait(e,t,s){return X(this,null,function*(){const o=[];this.yield!=null&&(yield po(s),o.push(this.yield(e,t,s))),o.push(this.nextFrameFunc()),yield Promise.all(o)})}onEpochBegin(e,t){return X(this,null,function*(){this.currentEpoch=e,this.epochBegin!=null&&(yield po(t),yield this.epochBegin(e,t))})}onEpochEnd(e,t){return X(this,null,function*(){const s=[];this.epochEnd!=null&&(yield po(t),s.push(this.epochEnd(e,t))),this.yieldEvery==="epoch"&&s.push(this.nextFrameFunc()),yield Promise.all(s)})}onBatchBegin(e,t){return X(this,null,function*(){this.batchBegin!=null&&(yield po(t),yield this.batchBegin(e,t))})}onBatchEnd(e,t){return X(this,null,function*(){const s=[];this.batchEnd!=null&&(yield po(t),s.push(this.batchEnd(e,t))),this.yieldEvery==="batch"?s.push(this.nextFrameFunc()):Pc(this.yieldEvery)&&s.push(this.maybeWait(this.currentEpoch,e,t)),yield Promise.all(s)})}onTrainBegin(e){return X(this,null,function*(){this.trainBegin!=null&&(yield po(e),yield this.trainBegin(e))})}onTrainEnd(e){return X(this,null,function*(){this.trainEnd!=null&&(yield po(e),yield this.trainEnd(e))})}}function tx(n,e){return n==null&&(n={}),n instanceof Di?[n]:Array.isArray(n)&&n[0]instanceof Di?n:Pe(n).map(s=>new jT(s,e))}class gn{constructor(){}static registerCallbackConstructor(e,t){S(e>=0&&Number.isInteger(e),()=>`Verbosity level is expected to be an integer >= 0, but got ${e}`),gn.checkForDuplicate(t),gn.constructors[e]==null&&(gn.constructors[e]=[]),gn.constructors[e].push(t)}static checkForDuplicate(e){for(const t in gn.constructors)gn.constructors[+t].forEach(o=>{if(o===e)throw new O("Duplicate callback constructor.")})}static clear(){gn.constructors={}}static createCallbacks(e){const t=[];for(const s in gn.constructors){const o=+s;e>=o&&t.push(...gn.constructors[o])}return t.map(s=>new s)}}gn.constructors={};function nx(n,e,t,s,o,r,i,a,l){const c=new KT,u=[new qT,...gn.createCallbacks(e)];n!=null&&u.push(...n),u.push(c);const h=new HT(u);return h.setParams({epochs:t,initialEpoch:s,samples:o,steps:r,batchSize:i,verbose:e,doValidation:a,metrics:l}),{callbackList:h,history:c}}function Kn(n,e={},t=!1){return vi(n,dn.getMap().classNameMap,e,"layer",t)}function ql(n,e){return B(()=>{n.dtype!=="float32"&&(n=re(n,"float32"));const t=me(Ni(n),e,!0),s=Po(t.shape,pt()),o=Dt(ws(t,s));return ge(n,o)})}function Kl(n,e){return B(()=>lt(Ni(be(e,n)),-1))}function Cd(n,e){return B(()=>lt(Pt(be(e,n)),-1))}function Id(n,e){return B(()=>{const t=be(n,e),s=sn(Pt(n),pt(),Number.MAX_VALUE),o=Pt(ge(t,s));return L(100,lt(o,-1))})}function XT(n,e){return B(()=>{const t=sn(e,pt(),Number.MAX_VALUE),s=zn(te(1,t)),o=sn(n,pt(),Number.MAX_VALUE),r=zn(te(1,o));return lt(Ni(be(s,r)),-1)})}function YT(n,e){return B(()=>{const t=ws(0,be(1,L(n,e)));return lt(Ni(t),-1)})}function ZT(n,e){return B(()=>{const t=ws(0,be(1,L(n,e)));return lt(t,-1)})}function JT(n,e){return B(()=>{const t=me(L(n,e),-1),s=$n(L(be(1,n),e),-1);return ws(0,te(1,be(s,t)))})}function QT(n,e){return B(()=>{const t=Math.log(2),s=be(e,n),o=be(te(s,gi(L(-2,s))),t);return lt(o,-1)})}function Fi(n,e,t=!1){return B(()=>{if(t)e=bh(e);else{const s=me(e,e.shape.length-1,!0);e=ge(e,s)}return e=sn(e,pt(),1-pt()),st(me(L(re(n,"float32"),zn(e)),e.shape.length-1))})}function jl(n,e,t=!1){return B(()=>{const s=re(yl(wT(n)),"int32");e=sn(e,pt(),1-pt());const o=e.shape,r=V(Qf(s,o[o.length-1]),o);return Fi(r,e,t)})}function eE(n,e){if(!_e(n.shape,e.shape))throw new O(`logits and labels must have the same shape, but got shapes ${JSON.stringify(n.shape)} and ${JSON.stringify(e.shape)}`);return B(()=>{const t=no(e),s=st(Pt(e));return te(be(t,L(e,n)),Xf(Pn(s)))})}function Xl(n,e){return B(()=>{let t;return t=sn(e,pt(),1-pt()),t=zn(ge(t,be(1,t))),lt(eE(n,t),-1)})}function tE(n,e){return B(()=>{const t=sn(n,pt(),1),s=sn(e,pt(),1);return me(L(n,zn(ge(t,s))),-1)})}function nE(n,e){return B(()=>{const t=zn(te(pt(),e));return lt(be(e,L(n,t)),-1)})}function sx(n,e){return B(()=>{const t=ql(n,-1),s=ql(e,-1),o=L(t,s);return st(me(o,-1))})}const Yl={meanSquaredError:Kl,meanAbsoluteError:Cd,meanAbsolutePercentageError:Id,meanSquaredLogarithmicError:XT,squaredHinge:YT,hinge:ZT,categoricalHinge:JT,logcosh:QT,categoricalCrossentropy:Fi,sparseCategoricalCrossentropy:jl,binaryCrossentropy:Xl,kullbackLeiblerDivergence:tE,poisson:nE,cosineProximity:sx};function $d(n){if(typeof n=="string"){if(n in Yl)return Yl[n];let e=`Unknown loss ${n}`;throw n.toLowerCase().includes("softmaxcrossentropy")&&(e=`Unknown loss ${n}. Use "categoricalCrossentropy" as the string name for tf.losses.softmaxCrossEntropy`),new O(e)}else return n}function ox(n,e){return B(()=>{const t=L(.5,hn(e)),s=Gn(qt(e,t),n.dtype);return lt(Mn(n,s),-1)})}function rx(n,e){return B(()=>Gn(Mn(Ys(n,-1),Ys(e,-1)),"float32"))}function sE(n,e){return B(()=>re(me(ss(Mn(n,1),Mn(e,1))),"float32"))}function oE(n,e){return B(()=>re(me(ss(Mn(n,0),Mn(e,1))),"float32"))}function rE(n,e){return B(()=>{const t=sE(n,e),s=oE(n,e),o=te(t,s);return re(dt(qt(o,0),ge(t,o),0),"float32")})}function iE(n,e){return Xl(n,e)}function aE(n,e){return n.rank===e.rank&&(n=oo(n,[n.rank-1])),e=Ys(e,-1),e.dtype!==n.dtype&&(e=re(e,n.dtype)),re(Mn(n,e),"float32")}const lE=Kl,cE=Kl,uE=Cd,hE=Cd,dE=Id,pE=Id,ix=Fi,fE=sx,ax=jl,Zl={binaryAccuracy:ox,categoricalAccuracy:rx,precision:rE,categoricalCrossentropy:ix,sparseCategoricalCrossentropy:ax,mse:lE,MSE:cE,mae:uE,MAE:hE,mape:dE,MAPE:pE,cosine:fE};function mE(n){if(typeof n=="string"&&n in Zl)return Zl[n];if(typeof n!="string"&&n!=null)return n;throw new O(`Unknown metric ${n}`)}function Jl(n){if(Un(n!==null,`Unknown LossOrMetricFn ${n}`),typeof n=="string")return n;{let e;for(const t of Object.keys(Yl))if(Yl[t]===n){e=t;break}if(e!==void 0)return e;for(const t of Object.keys(Zl))if(Zl[t]===n){e=t;break}return e!==void 0?e:n.name}}function gE(n){const e={Adagrad:()=>Go.adagrad(.01),Adadelta:()=>Go.adadelta(1,.95,pt()),Adam:()=>Go.adam(.001,.9,.999,pt()),Adamax:()=>Go.adamax(.002,.9,.999,pt(),0),RMSProp:()=>Go.rmsprop(.001,.9,0,pt()),SGD:()=>Go.sgd(.01)};if(e.adagrad=e.Adagrad,e.adadelta=e.Adadelta,e.adam=e.Adam,e.adamax=e.Adamax,e.rmsprop=e.RMSProp,e.sgd=e.SGD,n in e)return e[n]();throw new O(`Unknown Optimizer ${n}`)}const lx=1*1024*1024;function cx(n,e,t=!1){if(n==null||typeof n!="object"||Object.getPrototypeOf(n)!==Object.prototype||!vd(n))throw new Error("User-defined metadata is expected to be a JSON object, but is not.");if(t){const s=JSON.stringify(n);s.length>lx&&console.warn(`User-defined metadata of model "${e}" is too large in size (length=${s.length} when serialized). It is not recommended to store such large objects in user-defined metadata. Please make sure its serialized length is <= ${lx}.`)}}function vd(n){if(n===null)return!0;if(typeof n=="object")if(Object.getPrototypeOf(n)===Object.prototype){const e=Object.keys(n);for(const t of e)if(typeof t!="string"||!vd(n[t]))return!1;return!0}else if(Array.isArray(n)){for(const e of n)if(!vd(e))return!1;return!0}else return!1;else{const e=typeof n;return e==="string"||e==="number"||e==="boolean"}}function xE(n,e,t,s=console.log){const o=yE(n),r=["Layer (type)","Input Shape","Output shape","Param #"];o?(e=e||90,t=t||[.32,.61,.89,1]):(e=e||115,t=t||[.24,.48,.7,.8,1]),t[t.length-1]<=1&&(t=t.map(u=>Math.floor(e*u)));let i;if(!o){r.push("Receives inputs"),i=[];for(const u in n.nodesByDepth)i.push(...n.nodesByDepth[u])}s("_".repeat(e)),Ql(r,t,s),s("=".repeat(e));const a=n.layers;for(let u=0;u<a.length;++u)o?wE(a[u],t,s):CE(a[u],t,i,s),s((u===a.length-1?"=":"_").repeat(e));n.checkTrainableWeightsConsistency();const l=bE(n),c=Wl(n.nonTrainableWeights);s(`Total params: ${l+c}`),s(`Trainable params: ${l}`),s(`Non-trainable params: ${c}`),s("_".repeat(e))}function bE(n){let e;return n.collectedTrainableWeights!=null?e=Wl(n.collectedTrainableWeights):e=Wl(n.trainableWeights),e}function yE(n){let e=!0;const t=[],s=[];for(const o in n.nodesByDepth)t.push(n.nodesByDepth[o]);for(const o of t){if(o.length>1||o.length===1&&o[0].inboundLayers.length>1){e=!1;break}s.push(...o)}if(e)for(const o of n.layers){let r=!1;for(const i of o.inboundNodes)if(s.indexOf(i)!==-1)if(r){e=!1;break}else r=!0;if(!e)break}return e}function Ql(n,e,t=console.log){let s="";for(let o=0;o<n.length;++o)o>0&&(s=s.slice(0,s.length-1)+" "),s+=n[o],s=s.slice(0,e[o]),s+=" ".repeat(e[o]-s.length);t(s)}function wE(n,e,t){let s,o;try{o=n.inboundNodes.map(l=>JSON.stringify(l.inputShapes)).join(",")}catch(l){o="multiple"}try{s=JSON.stringify(n.outputShape)}catch(l){s="multiple"}const r=n.name,i=n.getClassName(),a=[`${r} (${i})`,o,s,n.countParams().toString()];Ql(a,e,t)}function CE(n,e,t,s){let o,r;try{r=n.inboundNodes.map(h=>JSON.stringify(h.inputShapes)).join(",")}catch(h){r="multiple"}try{o=JSON.stringify(n.outputShape)}catch(h){o="multiple"}const i=[];for(const h of n.inboundNodes)if(!(t!=null&&t.length>0&&t.indexOf(h)===-1))for(let d=0;d<h.inboundLayers.length;++d){const p=h.inboundLayers[d].name,f=h.nodeIndices[d],m=h.tensorIndices[d];i.push(`${p}[${f}][${m}]`)}const a=n.name,l=n.getClassName(),c=i.length===0?"":i[0],u=[`${a} (${l})`,r,o,n.countParams().toString(),c];Ql(u,e,s);for(let h=1;h<i.length;++h)Ql(["","","","",i[h]],e,s)}function ux(n,e,t){return(n==="inboundNodes"||n==="outputLayers"||n==="inputLayers")&&e===0&&typeof t=="string"}function ec(n,e){if(n===null)return null;if(typeof n=="string")return lo(n);if(typeof n=="number"||typeof n=="boolean")return n;if(n instanceof Array){const t=[],s=n.length;for(let o=0;o<s;++o){const r=n[o];ux(e,o,r)?t.push(r):t.push(ec(r,e))}return t}else{const t={};for(const s of Object.keys(n)){const o=n[s];if(s==="name"&&typeof o=="string")t[s]=o;else{const r=lo(s);t[r]=ec(o,r)}}return t}}function kd(n,e){if(n==null)return null;if(typeof n=="string")return ls(n);if(typeof n=="number"||typeof n=="boolean")return n;if(n instanceof Array){const t=[],s=n.length;for(let o=0;o<s;++o){const r=n[o];ux(e,o,r)?t.push(r):t.push(kd(r,e))}return t}else{const t={};for(const s of Object.keys(n)){const o=n[s],r=ls(s);(s==="name"||s==="className")&&typeof o=="string"?t[r]=o:t[r]=kd(o,s)}return t}}const hx="4.20.0";const IE=n=>{const e=Object.keys(n);if(e.length===0)return!1;const t=e[0].split("/");return!isNaN(parseInt(t[t.length-1],10))};class En extends Se{constructor(e){if(super({}),this.containerNodes=new Set,this.name=e.name,this.name==null){const b=this.getClassName().toLowerCase();this.name=Pl(b)}if(this.supportsMasking=!1,this.trainable_=!0,Array.isArray(e.inputs)?this.inputs=e.inputs.slice():this.inputs=[e.inputs],Array.isArray(e.outputs)?this.outputs=e.outputs.slice():this.outputs=[e.outputs],$s(this.inputs).length!==this.inputs.length)throw new O(`The list of inputs passed to the model is redundant. All inputs should only appear once. Found: ${this.inputs.map(b=>b.name)}`);$s(this.outputs).length!==this.outputs.length&&console.warn(`The list of outputs passed to the model is redundant. All outputs should only appear once. Found: ${this.outputs.map(b=>b.name)}`),this.inputLayers=[],this.inputLayersNodeIndices=[],this.inputLayersTensorIndices=[],this.outputLayers=[],this.outputLayersNodeIndices=[],this.outputLayersTensorIndices=[],this.layers=[],this.internalContainerRefs=[];for(const b of this.outputs){const w=b.sourceLayer,y=b.nodeIndex,C=b.tensorIndex;this.outputLayers.push(w),this.outputLayersNodeIndices.push(y),this.outputLayersTensorIndices.push(C)}for(const b of this.inputs){const w=b.sourceLayer,y=b.nodeIndex,C=b.tensorIndex;Un(y===0,"input layer has >1 nodes"),Un(C===0,"input layer has >1 tensors"),this.inputLayers.push(w),this.inputLayersNodeIndices.push(y),this.inputLayersTensorIndices.push(C)}this.inputNames=[],this.outputNames=[],this.feedInputShapes=[],this.feedInputNames=[],this.feedOutputNames=[];for(let b=0;b<this.inputLayers.length;b++){const w=this.inputLayers[b];if(!(w instanceof Ei))throw new TypeError(`Input layers to a LayersModel must be InputLayer objects. Received inputs: ${e.inputs}. Input ${b} (0-based) originates from layer type ${w.getClassName()}.`);this.inputNames.push(w.name),this.feedInputShapes.push(w.batchInputShape),this.feedInputNames.push(w.name)}for(const b of this.outputLayers)this.outputNames.push(b.name);this.internalInputShapes=this.inputs.map(b=>b.shape),this.internalOutputShapes=this.outputs.map(b=>b.shape);const t={},s={},o={},r={},i={},a=[],l=(b,w,y,C,$,v)=>{(C==null||$==null||v==null)&&(C=b.sourceLayer,$=b.nodeIndex,v=b.tensorIndex);const k=C.inboundNodes[$];if(y.indexOf(k)!==-1)throw new pn(`The tensor ${b.name} at layer "${C.name}" is part of a cycle.`);if(w.indexOf(k)!==-1)return;this.containerNodes.add(En.nodeKey(C,$)),C.id in i||(i[C.id]=Object.keys(i).length),y.indexOf(k)===-1&&y.push(k);const N=k.inboundLayers.length;for(let T=0;T<N;T++){const I=k.inputTensors[T],E=k.inboundLayers[T],R=k.nodeIndices[T],D=k.tensorIndices[T];l(I,w,y,E,R,D)}for(w.push(k);y.indexOf(k)>=0;)y.splice(y.indexOf(k),1);a.push(k)},c=[],u=[];for(const b of this.outputs)l(b,c,u);const h=a.slice().reverse();for(const b of h){s[b.id]=b,b.id in t||(t[b.id]=0);let w=t[b.id];const y=o[b.outboundLayer.id]==null?0:o[b.outboundLayer.id];w=Math.max(w,y),o[b.outboundLayer.id]=w,r[b.outboundLayer.id]=b.outboundLayer,t[b.id]=w;for(let C=0;C<b.inboundLayers.length;C++){const $=b.inboundLayers[C],v=b.nodeIndices[C],k=$.inboundNodes[v],N=t[k.id]==null?0:t[k.id];t[k.id]=Math.max(w+1,N),s[k.id]=k}}const d={};for(const b in t){const w=t[b];w in d||(d[w]=[]),d[w].push(s[b])}const p={};for(const b in o){const w=o[b];w in p||(p[w]=[]),p[w].push(r[b])}let f=Object.keys(p).map(b=>parseInt(b,10)).sort(Ll);this.layers=[];for(const b of f){const w=p[b];w.sort((y,C)=>{const $=i[y.id],v=i[C.id];return $<v?-1:$>v?1:0});for(const y of w)y instanceof En&&this.internalContainerRefs.push(y),this.layers.push(y)}this.layersByDepth=p,f=Object.keys(d).map(b=>parseInt(b,10)).sort(Ll);const m=this.inputs.slice(),g=[];for(const b of f)for(const w of d[b]){const y=w.outboundLayer;if(y!=null){for(const C of w.inputTensors)if(m.indexOf(C)===-1)throw new pn(`Graph disconnected: cannot obtain value for tensor ${C} at layer "${y.name}". The following previous layers were accessed without issue: ${g}`);for(const C of w.outputTensors)m.push(C);g.push(y.name)}}this.nodesByDepth=d;const x=this.layers.map(b=>b.name);for(const b of x){const w=x.filter(y=>y===b).length;if(w!==1)throw new pn(`The name "${b}" is used ${w} times in the model. All layer names should be unique. Layer names: `+JSON.stringify(x))}this.outboundNodes=[],this.inboundNodes=[],new Ul({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:this.inputs,outputTensors:this.outputs,inputMasks:this.inputs.map(b=>null),outputMasks:this.outputs.map(b=>null),inputShapes:this.inputs.map(b=>b.shape),outputShapes:this.outputs.map(b=>b.shape)}),this.built=!0,this._refCount=1}assertNotDisposed(){if(this._refCount===0)throw new Error(`Container '${this.name}' is already disposed.`)}dispose(){this.assertNotDisposed();const e={refCountAfterDispose:null,numDisposedVariables:0};if(--this._refCount===0){for(const t of this.layers)e.numDisposedVariables+=t.dispose().numDisposedVariables;for(const t of this.internalContainerRefs)e.numDisposedVariables+=t.dispose().numDisposedVariables}return e.refCountAfterDispose=this._refCount,e}get trainable(){return this.trainable_}set trainable(e){this.layers.forEach(t=>{t._trainableWeights.forEach(s=>s.trainable=e)}),this.trainable_=e}get trainableWeights(){if(this._trainableWeights.length>0)throw new O("Container instance unexpectedly contains _trainableWeights.The trainable weights of a Container are a union of the trainable weights of its consituent Layers. Its own _trainableWeights must remain an empty Array.");if(!this.trainable)return[];let e=[];for(const t of this.layers)e=e.concat(t.trainableWeights);return e}get nonTrainableWeights(){const e=[];for(const t of this.layers)e.push(...t.nonTrainableWeights);if(!this.trainable){const t=[];for(const s of this.layers)t.push(...s.trainableWeights);return t.concat(e)}return e}get weights(){return this.trainableWeights.concat(this.nonTrainableWeights)}loadWeights(e,t=!0){const s={};let o=0;const r=IE(e);r&&this.parseWeights(e);for(const a of this.layers)for(const[l,c]of a.weights.entries()){const u=r?`${c.name.split("/").slice(0,-1).join("/")+"/"}${l}`:c.originalName;if(s[u]!=null)throw new O(`Duplicate weight name: ${u}`);s[u]=c,o++}const i=[];for(const a in e){let l=a;if(s[a]==null){const c=a.split("/");l=c.slice(0,-2).concat([c[c.length-1]]).join("/")}if(s[l]!=null)i.push([s[l],e[a]]);else if(t)throw new O(`Provided weight data has no target variable: ${a}`);delete s[l]}if(t){const a=[];for(const l in s)a.push(l);if(a.length>0)throw new O(`${a.length} of ${o} weights are not set: ${a}`)}yd(i)}parseWeights(e){for(const t in Object.keys(e)){const s=t.split("/"),o=["vars","layer_checkpoint_dependencies"],r=s.map(i=>i.startsWith("_")?i.slice(1):i).filter(i=>!o.includes(i)).join("/");r!==t&&(e[r]=e[t],delete e[t])}}updatedConfig(){const e=this.getConfig(),t={};return t.className=this.getClassName(),t.config=e,t.kerasVersion=`tfjs-layers ${hx}`,t.backend="TensorFlow.js",t}toJSON(e,t=!0){const s=kd(this.updatedConfig());return t?JSON.stringify(s):s}call(e,t){return B(()=>{e=Pe(e);const s=new Ss;for(let o=0;o<this.inputs.length;++o)s.add(this.inputs[o],e[o]);return Ri(this.outputs,s,t)})}computeMask(e,t){return B(()=>{e=Pe(e);let s;return t==null?s=ao(null,e.length):s=Pe(t),this.runInternalGraph(e,s)[1]})}computeOutputShape(e){const t=Vl(e);if(t.length!==this.inputLayers.length)throw new O(`Invalid inputShape argument ${e}: model has ${this.inputLayers.length} tensor inputs.`);const s={};for(let a=0;a<t.length;a++){const l=this.inputLayers[a],c=t[a],u=l.name+"_0_0";s[u]=c}const o=Object.keys(this.nodesByDepth).map(a=>parseInt(a,10)).sort(Ll);if(o.length>1)for(const a of o){const l=this.nodesByDepth[a];for(const c of l){const u=c.outboundLayer;if(this.inputLayers.map(m=>m.id).indexOf(u.id)!==-1)continue;const h=[];for(let m=0;m<c.inboundLayers.length;m++){const g=c.inboundLayers[m],x=c.nodeIndices[m],b=c.tensorIndices[m],w=`${g.name}_${x}_${b}`,y=s[w];h.push(y)}const d=u.computeOutputShape(Kt(h)),p=Vl(d),f=u.inboundNodes.indexOf(c);for(let m=0;m<p.length;m++){const g=`${u.name}_${f}_${m}`;s[g]=p[m]}}}const r=[],i=[];for(let a=0;a<this.outputLayers.length;a++){const l=this.outputLayers[a],c=this.outputLayersNodeIndices[a],u=this.outputLayersTensorIndices[a],h=`${l.name}_${c}_${u}`;i.push(h)}for(let a=0;a<i.length;a++){const l=i[a];Un(l in s),r.push(s[l])}return Kt(r)}runInternalGraph(e,t){t==null&&(t=ao(null,e.length));const s={};for(let l=0;l<this.inputs.length;++l){const c=this.inputs[l],u=e[l],h=t[l];s[c.id]=[u,h]}const o=Object.keys(this.nodesByDepth).map(l=>parseInt(l,10)).sort(Ll);for(const l of o){const c=this.nodesByDepth[l];for(const u of c){const h=u.outboundLayer,d=u.inputTensors,p=u.outputTensors,f=new Array;for(const m of d)m.id in s&&f.push(s[m.id]);if(f.length===d.length){let m={},g,x,b,w;if(u.callArgs!=null&&(m=u.callArgs),f.length===1){const[y,C]=f[0];m.mask==null&&(m.mask=C),b=Pe(h.call(y,m)),w=Pe(h.computeMask(y,C)),g=[y],x=[C]}else g=f.map(y=>y[0]),x=f.map(y=>y[1]),m.mask==null&&(m.mask=x),b=Pe(h.call(g,m)),w=Pe(h.computeMask(g,x));if(h.activityRegularizer)throw new Ce("LayersModel invocation with concrete Tensor value(s) in the presence of activity regularizer(s) is not supported yet.");for(let y=0;y<p.length;++y){const C=p[y],$=b[y],v=w[y];s[C.id]=[$,v]}}}}const r=[],i=[],a=[];for(const l of this.outputs){Un(l.id in s,`Could not compute output ${l.name} : ${l.id}`);const[c,u]=s[l.id];a.push(c.shape),r.push(c),i.push(u)}return[r,i,a]}buildNodeConversionMap(e){const t={};let s;for(const o of this.layers){s=o instanceof En?1:0;for(let r=0;r<o.inboundNodes.length;r++){const i=En.nodeKey(o,r);this.containerNodes.has(i)&&(t[i]=s,s+=1)}}return t}getLayer(e,t){if(t!=null)return this.findLayer(t);if(e==null)throw new O("Provide either a layer name or layer index");if(typeof e=="number")return this.findLayer(e);for(const s of this.layers)if(s.name===e)return s;throw new O(`No such layer: ${e}`)}findLayer(e){if(this.layers.length<=e)throw new O(`Was asked to retrieve layer at index ${e}, but model only has ${this.layers.length} layer(s).`);return this.layers[e]}calculateLosses(){return B(()=>{const e=[];for(const t of this.layers)for(let s=0;s<t.inboundNodes.length;++s){const o=En.nodeKey(t,s);this.containerNodes.has(o)&&e.push(...t.calculateLosses())}return e})}getConfig(){const e={name:this.name},t=this.buildNodeConversionMap(this.layers),s=[];for(const i of this.layers){const a=i.getClassName(),l=i.getConfig(),c=[];for(let h=0;h<i.inboundNodes.length;h++){const d=i.inboundNodes[h],p=En.nodeKey(i,h);let f={};if(this.containerNodes.has(p)){if(d.callArgs)try{JSON.stringify(d.callArgs),f=d.callArgs}catch(m){console.warn(`Layer ${i.name} was passed non-serializable keyword arguments: ${d.callArgs}. They will not be included in the serialized model (and thus will be missing at deserialization time).`),f={}}if(d.inboundLayers.length>0){const m=[];for(let g=0;g<d.inboundLayers.length;g++){const x=d.inboundLayers[g],b=d.nodeIndices[g],w=d.tensorIndices[g],y=En.nodeKey(x,b);let C=t[y];C==null&&(C=0),m.push([x.name,C,w,f])}c.push(m)}}}const u={};u.name=i.name,u.className=a,u.config=l,u.inboundNodes=c,s.push(u)}e.layers=s;const o=[];for(let i=0;i<this.inputLayers.length;i++){const a=this.inputLayers[i],l=this.inputLayersNodeIndices[i],c=En.nodeKey(a,l);if(!this.containerNodes.has(c))continue;let u=t[c];u==null&&(u=0);const h=this.inputLayersTensorIndices[i];o.push([a.name,u,h])}e.inputLayers=o;const r=[];for(let i=0;i<this.outputLayers.length;i++){const a=this.outputLayers[i],l=this.outputLayersNodeIndices[i],c=En.nodeKey(a,l);if(!this.containerNodes.has(c))continue;let u=t[c];u==null&&(u=0);const h=this.outputLayersTensorIndices[i];r.push([a.name,u,h])}return e.outputLayers=r,e}static fromConfig(e,t,s={},o=!1){const r={},i={};function a(g,x){g.name in i?i[g.name].push(x):i[g.name]=[x]}function l(g,x){const b=[];let w;for(const y of x){const C=y[0],$=y[1],v=y[2];if(w=y[3]==null?{}:y[3],!(C in r)){a(g,x);return}const k=r[C];if(k.inboundNodes.length<=$){a(g,x);return}const N=k.inboundNodes[$];b.push(N.outputTensors[v])}b.length>0&&g.apply(Kt(b),w)}function c(g){const x=g.name,b=Kn(g,t.customObjects!=null?t.customObjects:{});b.setFastWeightInitDuringBuild(o),r[x]=b,g.inboundNodes.forEach(y=>{if(!(y instanceof Array))throw new O(`Corrupted configuration, expected array for nodeData: ${y}`);a(b,y)})}const u=t.name,h=t.layers;for(const g of h)c(g);for(;!aT(i);)for(const g of h){const x=r[g.name];if(x.name in i){const b=i[x.name];delete i[x.name];for(const w of b)l(x,w)}}const d=[],p=[],f=t.inputLayers;for(const g of f){const x=g[0],b=g[1],w=g[2];Un(x in r);const C=r[x].inboundNodes[b].outputTensors;d.push(C[w])}const m=t.outputLayers;for(const g of m){const x=g[0],b=g[1],w=g[2];Un(x in r);const C=r[x].inboundNodes[b].outputTensors;p.push(C[w])}return new e({inputs:d,outputs:p,name:u})}get stateful(){if(this._stateful)throw new O("Container instance unexpectedly has _stateful = true. The statefulness of a Container is determined by the Layers it contains. Its _stateful property must remain the default false.");for(const e of this.layers)if(e.stateful)return!0;return!1}resetStates(){B(()=>{this.layers.forEach(e=>{e.stateful&&e.resetStates()})})}}function $E(n,e,t){const s=e.length;if(n==null||Array.isArray(n)&&n.length===0)return e.map(o=>null);if(s===1)return Array.isArray(n)&&n.length===1?n:typeof n=="object"&&e[0]in n?[n[e[0]]]:[n];if(Array.isArray(n)){if(n.length!==s)throw new Error(`Provided ${t} is an array of ${n.length} element(s), but the model has ${s} outputs. Make sure a set of weights is provided for each model output.`);return n}else if(typeof n=="object"&&Object.keys(n).length>0&&typeof n[Object.keys(n)[0]]=="object"){const o=[];return e.forEach(r=>{r in n?o.push(n[r]):o.push(null)}),o}else throw new Error(`The model has multiple (${s}) outputs, so ${t} must be either an array with ${s} elements or an object with ${e} keys. Provided ${t} not understood: ${JSON.stringify(n)}`)}function dx(n,e){return $E(n,e,"classWeight")}function px(n,e,t,s){return X(this,null,function*(){if(t!=null){const o=B(()=>{if(n.shape.length===1)return Xs(n);if(n.shape.length===2){if(n.shape[1]>1)return Ys(n,1);if(n.shape[1]===1)return V(n,[n.shape[0]]);throw new Error(`Encountered unexpected last-dimension size (${n.shape[1]}) during handling of class weights. The size is expected to be >= 1.`)}else throw new Error(`Unexpected rank of target (y) tensor (${n.rank}) during handling of class weights. The rank is expected to be 1 or 2.`)}),r=Array.from(yield o.data());xe(o);const i=[];return r.forEach(a=>{if(t[a]==null)throw new Error(`classWeight must contain all classes in the training data. The class ${a} exists in the data but not in classWeight`);i.push(t[a])}),Zt(i,"float32")}else return null})}function vE(n,e){return L(n,e)}const kE=32;function fx(n,e){let t,s;const o=e;t=o.xs,s=o.ys,S(t!=null&&s!=null,()=>`A Dataset iterator for fitDataset() is expected to generate objects of the form \`{xs: xVal, ys: yVal}\`, where the two values may be \`tf.Tensor\`, an array of Tensors, or a map of string to Tensor.  The provided Dataset instead generates ${e}`);const r=mx("input",n.inputNames,t),i=mx("output",n.outputNames,s),a=r[0].shape[0];S(r.length===n.inputs.length,()=>`LayersModel has ${n.inputs.length} inputs, but the dataset provides ${r.length} inputs.  (Expected input keys: ${JSON.stringify(n.inputNames)})`),S(i.length===n.outputs.length,()=>`LayersModel has ${n.outputs.length} outputs, but the dataset provides ${i.length} outputs.  (Expected output keys: ${JSON.stringify(n.outputNames)})`);for(let l=0;l<r.length;l++)S(r[l].shape[0]===a,()=>`Batch size mismatch: input ${n.inputNames[l]} has ${r[l].shape[0]}; expected  ${a} based on input ${n.inputNames[0]}.`);for(let l=0;l<i.length;l++)S(i[l].shape[0]===a,()=>`Batch size mismatch: output ${n.outputNames[l]} has ${i[l].shape[0]}; expected  ${a} based on input ${n.inputNames[0]}.`);return{xs:r,ys:i}}function mx(n,e,t){if(t instanceof ct)return[t];if(Array.isArray(t))return S(t.length===e.length,()=>`Received an array of ${t.length} Tensors, but expected ${e.length} to match the ${n} keys ${e}.`),t;{const s=[];for(const o of e){if(t[o]==null)throw new O(`The feature data generated by the dataset lacks the required ${n} key '${o}'.`);s.push(t[o])}return s}}function SE(n){if(n.length===3)throw new Ce("Validation with sample weights is not implemented yet.");return{xs:n[0],ys:n[1]}}function NE(n,e,t){return X(this,null,function*(){const s=t.batchesPerEpoch!=null;if(S(n.optimizer!=null,()=>"You must compile a model before training/testing. Use LayersModel.compile(modelCompileConfig)."),S(t!=null,()=>"For fitDataset(), the 2nd argument (config) is required, but it is not provided in this call."),S(t.epochs!=null&&t.epochs>0&&Number.isInteger(t.epochs),()=>`For fitDataset(), config.epochs is expected to be a positive integer, but got ${t.epochs}`),S(!s||t.batchesPerEpoch>0&&Number.isInteger(t.batchesPerEpoch),()=>`For fitDataset(), config.batchesPerEpoch is expected to be a positive integer if specified, but got ${t.batchesPerEpoch}`),S(t.validationSplit==null,()=>"`validationSplit` is not supported by `fitDataset()`. Use validationData instead."),n.isTraining)throw new Error("Cannot start training because another fit() call is ongoing.");n.isTraining=!0;try{const o=t.validationData!=null;let r,i;if(o)if(gx(t.validationData))S(t.validationBatches==null||t.validationBatches>0&&Number.isInteger(t.validationBatches),()=>`For fitDataset() with dataset-based validation, config.validationBatches is expected not to be provided, or to be a positive integer, but got ${t.validationBatches}`);else{const g=SE(t.validationData);r=g.xs,i=g.ys}const a=n.makeTrainFunction(),l=n.getDedupedMetricsNames();let c;o?c=l.slice().concat(l.map(g=>"val_"+g)):c=l.slice();const u=tx(t.callbacks,t.yieldEvery),h=t.verbose==null?1:t.verbose,{callbackList:d,history:p}=nx(u,h,t.epochs,null,null,TE(e,t),null,o,c);d.setModel(n),n.history=p,yield d.onTrainBegin(),n.stopTraining_=!1;let f=t.initialEpoch==null?0:t.initialEpoch,m=yield e.iterator();for(;f<t.epochs;){const g={};yield d.onEpochBegin(f);let x=0,b=0;for(s||(m=yield e.iterator());!s||x<t.batchesPerEpoch;){const w=yield m.next();if(s&&w.done){console.warn(`You provided \`batchesPerEpoch\` as ${t.batchesPerEpoch}, but your dataset iterator ran out of data after ${x} batches; interrupting training. Make sure that your dataset can generate at least \`batchesPerEpoch * epochs\` batches (in this case, ${t.batchesPerEpoch*t.epochs} batches). You may need to use the repeat() function when building your dataset.`);break}if(w.value!=null){const{xs:y,ys:C}=fx(n,w.value),$={};$.batch=b,$.size=y[0].shape[0],yield d.onBatchBegin(b,$);const v=[];if(t.classWeight!=null){const T=dx(t.classWeight,n.outputNames);for(let I=0;I<T.length;++I)v.push(yield px(C[I],null,T[I]))}const k=y.concat(C).concat(v),N=a(k);xe(k);for(let T=0;T<l.length;++T){const I=l[T],E=N[T];$[I]=E,On(E)}yield d.onBatchEnd(b,$),Qg($),b++,x++}if(s?x>=t.batchesPerEpoch:w.done){if(o){let y;gx(t.validationData)?y=Pe(yield n.evaluateDataset(t.validationData,{batches:t.validationBatches})):y=Pe(n.evaluate(r,i,{batchSize:t.validationBatchSize==null?kE:t.validationBatchSize,verbose:0}));for(let C=0;C<n.metricsNames.length;++C)g[`val_${n.metricsNames[C]}`]=y[C]}break}if(n.stopTraining_)break}if(yield d.onEpochEnd(f,g),f++,n.stopTraining_)break}return yield d.onTrainEnd(),yield n.history.syncData(),n.history}finally{n.isTraining=!1}})}function TE(n,e){let t=null;return e.batchesPerEpoch!=null?t=e.batchesPerEpoch:Number.isFinite(n.size)&&(t=n.size),t}function gx(n){return typeof n.iterator=="function"}function EE(n){return typeof n.next=="function"}function RE(n,e,t){return X(this,null,function*(){t=t||{};const s=t.batches!=null,o=n.testFunction;let r=[];if(t.verbose>0)throw new Ce("Verbose mode is not implemented yet.");S(!s||t.batches>0&&Number.isInteger(t.batches),()=>`Test loop expects \`batches\` to be a positive integer, but received ${JSON.stringify(t.batches)}`);const i=EE(e)?e:yield e.iterator();let a=0,l=0;for(;!s||l<t.batches;){const c=yield i.next();if(r=B(()=>{if(c.value){const{xs:u,ys:h}=fx(n,c.value),d=u.concat(h),p=B(()=>o(d));if(xe(d),l===0)for(let m=0;m<p.length;++m)r.push(Oe(0));const f=d[0].shape[0];for(let m=0;m<p.length;++m){const g=p[m],x=r[m];r[m]=B(()=>te(r[m],L(f,g))),l>0&&xe(x)}xe(p),a+=f,++l}return r}),c.done){s&&console.warn(`Your dataset iterator ran out of data during evaluateDataset(). Interrupting evalution. Make sure that your dataset can generate at least \`batches\` batches (in this case, ${t.batches} batches). You may need to use the repeat() function when building your dataset.`);break}}for(let c=0;c<r.length;++c){const u=r[c];r[c]=ge(r[c],a),xe(u)}return Kt(r)})}function Sd(n){S(n>0&&Number.isInteger(n),()=>`batchSize is required to be a positive integer, but got ${n}`)}function _i(n,e,t){return n==null?[null]:Array.isArray(n)?n.map(s=>ho(s,e,t-e)):ho(n,e,t-e)}function Nd(n,e){return B(()=>n==null?null:Array.isArray(n)?n.map(t=>Nd(t,e)):Fg(n,e.dtype==="int32"?e:re(e,"int32")))}function Td(n,e){const t=[];let s=0,o=null;for(;s<n;)o=s+e,o>=n&&(o=n),t.push([s,o]),s=o;return t}function xx(n){const e=[];n instanceof ct&&(n=[n]);for(let t=0;t<n.length;++t){const s=n[t];if(s.rank===1)e.push(Si(s,1));else{if(s.rank===0)throw new Error("Expected tensor to be at least 1D, but received a 0D tensor (scalar).");e.push(s)}}return e}function Rn(n,e){if(n==null)return;const t=[];if(e instanceof ct)t.push(e.id);else if(Array.isArray(e))e.forEach(o=>t.push(o.id));else if(e!=null)for(const o in e){const r=e[o];t.push(r.id)}const s=[];if(n instanceof ct)t.indexOf(n.id)===-1&&s.push(n);else if(Array.isArray(n))n.forEach(o=>{t.indexOf(o.id)===-1&&s.push(o)});else if(n!=null)for(const o in n){const r=n[o];t.indexOf(r.id)===-1&&s.push(r)}s.forEach(o=>{o.isDisposed||o.dispose()})}function AE(n){return n instanceof ct}function Ed(n){return Array.isArray(n)}function bx(n){return!AE(n)&&!Ed(n)}function yx(n,e,t,s=!0,o=""){if(e==null||e.length===0){if(n!=null){let i=!1;if(Ed(n)&&n.length>0)i=!0;else if(bx(n)){for(const a in n)if(n.hasOwnProperty(a)){i=!0;break}}else i=!0;if(i)throw new O(`Error when checking model ${o} expected no data, but got ${n}`)}return[]}if(n==null)return e.map(i=>null);let r;if(bx(n)){n=n,r=[];for(const i of e){if(n[i]==null)throw new O(`No data provided for "${i}". Need data for each key in: ${e}`);r.push(n[i])}}else if(Ed(n)){if(n=n,n.length!==e.length)throw new O(`Error when checking model ${o}: the Array of Tensors that you are passing to your model is not the size the model expected. Expected to see ${e.length} Tensor(s), but instead got the following list of Tensor(s): ${n}`);r=n}else{if(n=n,e.length>1)throw new O(`The model ${o} expects ${e.length} Tensor(s), but only received one Tensor. Found: Tensor with shape ${n.shape}`);r=[n]}if(r=xx(r),t!=null)for(let i=0;i<e.length;++i){if(t[i]==null)continue;const a=r[i];if(a.shape.length!==t[i].length)throw new O(`Error when checking ${o}: expected ${e[i]} to have ${t[i].length} dimension(s). but got array with shape ${a.shape}`);for(let l=0;l<t[i].length;++l){if(l===0&&!s)continue;const c=a.shape[l],u=t[i][l];if(u!=null&&u>=0&&c!==u)throw new O(`${o} expected a batch of elements where each example has shape [${t[i].slice(1,t[i].length)}] (i.e.,tensor shape [*,${t[i].slice(1,t[i].length)}]) but the ${o} received an input with ${a.shape[0]} examples, each with shape [${a.shape.slice(1,a.shape.length)}] (tensor shape [${a.shape}])`)}}return r}function DE(n,e,t){const s=$s(n.map(r=>r.shape[0]));s.sort();const o=$s(e.map(r=>r.shape[0]));if(o.sort(),s.length>1)throw new O(`All input Tensors (x) should have the same number of samples. Got array shapes: ${JSON.stringify(n.map(r=>r.shape))}`);if(o.length>1)throw new O(`All target Tensors (y) should have the same number of samples. Got array shapes: ${JSON.stringify(e.map(r=>r.shape))}`);if(s.length>0&&o.length>0&&!_e(s,o))throw new O(`Input Tensors should have the same number of samples as target Tensors. Found ${s[0]} input sample(s) and ${o[0]} target sample(s).`)}function FE(n,e,t){const s=[Kl,Xl,Fi];for(let o=0;o<n.length;++o){const r=n[o],i=e[o],a=t[o];if(i!=null){if(i===Fi&&r.shape[r.shape.length-1]===1)throw new O(`You are passing a target array of shape ${r.shape} while using a loss 'categorical_crossentropy'. 'categorical_crossentropy'expects targets to be binary matrices (1s and 0s) of shape [samples, classes].`);if(s.indexOf(i)!==-1){const l=r.shape.slice(1),c=a.slice(1);for(let u=0;u<l.length;++u){const h=l[u],d=c[u];if(d!=null&&h!==d)throw new O(`A target Tensor with shape ${r.shape} was passed for an output of shape ${a}, while using a loss function that expects targets to have the same shape as the output.`)}}}}}function wx(n,e,t,s=!0,o=""){let r;if(Array.isArray(n)){if(n.length!==e.length)throw new O(`Error when checking model ${o}: the Array of Tensors that you are passing to your model is not the size the the model expected. Expected to see ${e.length} Tensor(s), but instead got ${n.length} Tensors(s).`);r=n}else{if(e.length>1)throw new O(`The model expects ${e.length} ${o} Tensors, but only received one Tensor. Found: array with shape ${JSON.stringify(n.shape)}.`);r=[n]}if(t!=null)for(let i=0;i<e.length;++i){if(t[i]==null)continue;const a=r[i];if(a.shape.length!==t[i].length)throw new O(`Error when checking ${o}: expected ${e[i]} to have ${t[i].length} dimension(s), but got array with shape ${JSON.stringify(a.shape)}`);for(let l=0;l<t[i].length;++l){if(l===0&&!s)continue;const c=a.shape[l],u=t[i][l];if(u!=null&&u!==c)throw new O(`Error when checking ${o}: expected ${e[i]} to have shape ${JSON.stringify(t[i])} but got array with shape ${JSON.stringify(a.shape)}.`)}}}function _E(n,e){if(n==null||Array.isArray(n)&&n.length===0)return e.map(s=>[]);let t;if(typeof n=="string"||typeof n=="function")t=[n];else if(Array.isArray(n)||typeof n=="object")t=n;else throw new TypeError(`Type of metrics argument not understood. Expected an string,function, Array, or Object, found: ${n}`);if(Array.isArray(t))return e.map(s=>t);{const s=[];for(const o of e){let r=t.hasOwnProperty(o)?t[o]:[];Array.isArray(r)||(r=[r]),s.push(r)}return s}}const OE="layers-model";class Ko extends En{constructor(e){super(e),this.isTraining=!1}summary(e,t,s=console.log){if(!this.built)throw new O("This model has never been called, thus its weights have not been created yet. So no summary can be displayed. Build the model first (e.g., by calling it on some test data).");xE(this,e,t,s)}compile(e){if(e.loss==null&&(e.loss=[]),this.loss=e.loss,typeof e.optimizer=="string")this.optimizer_=gE(e.optimizer),this.isOptimizerOwned=!0;else{if(!(e.optimizer instanceof Is))throw new O("User-defined optimizer must be an instance of tf.Optimizer.");this.optimizer_=e.optimizer,this.isOptimizerOwned=!1}let t=[];if(!Array.isArray(e.loss)&&typeof e.loss!="string"&&typeof e.loss!="function"){e.loss=e.loss;for(const i in e.loss)if(this.outputNames.indexOf(i)===-1)throw new O(`Unknown entry in loss dictionary: "${i}". Only expected the following keys: ${this.outputNames}`);for(const i of this.outputNames)e.loss[i]==null&&console.warn(`Output "${i}" is missing from loss dictionary. We assume this was done on purpose, and we will not be expecting data to be passed to ${i} during training`),t.push($d(e.loss[i]))}else if(Array.isArray(e.loss)){if(e.loss.length!==this.outputs.length)throw new O(`When passing an Array as loss, it should have one entry per model output. The model has ${this.outputs.length} output(s), but you passed loss=${e.loss}.`);t=e.loss.map(a=>$d(a))}else{const i=$d(e.loss);this.outputs.forEach(a=>{t.push(i)})}this.lossFunctions=t,this.feedOutputNames=[],this.feedOutputShapes=[],this.feedLossFns=[];for(let i=0;i<this.outputs.length;++i){const a=this.internalOutputShapes[i],l=this.outputNames[i];this.feedOutputNames.push(l),this.feedOutputShapes.push(a),this.feedLossFns.push(this.lossFunctions[i])}const s=[];this.metrics=e.metrics,this.metricsNames=["loss"],this.metricsTensors=[],uo("loss",()=>{for(let i=0;i<this.outputs.length;++i){if(s.indexOf(i)!==-1)continue;const a=this.lossFunctions[i];this.outputs.length>1&&(this.metricsTensors.push([a,i]),this.metricsNames.push(this.outputNames[i]+"_loss"))}});const o=_E(e.metrics,this.outputNames),r=(i,a,l)=>{this.outputNames.length>1&&(a=this.outputNames[i]+"_"+a),this.metricsNames.push(a),this.metricsTensors.push([l,i])};uo("metric",()=>{for(let i=0;i<this.outputs.length;++i){if(s.indexOf(i)!==-1)continue;const a=o[i];(c=>{let h,d,p;for(const f of c){if(typeof f=="string"&&["accuracy","acc","crossentropy","ce"].indexOf(f)!==-1){const g=this.internalOutputShapes[i];g[g.length-1]===1||this.lossFunctions[i]===Xl?["accuracy","acc"].indexOf(f)!==-1?d=ox:["crossentropy","ce"].indexOf(f)!==-1&&(d=iE):this.lossFunctions[i]===jl?["accuracy","acc"].indexOf(f)!==-1?d=aE:["crossentropy","ce"].indexOf(f)!==-1&&(d=ax):["accuracy","acc"].indexOf(f)!==-1?d=rx:["crossentropy","ce"].indexOf(f)!==-1&&(d=ix);let x;["accuracy","acc"].indexOf(f)!==-1?x="acc":["crossentropy","ce"].indexOf(f)!==-1&&(x="ce"),p=d,h=""+x}else p=mE(f),h=""+Jl(f);let m;uo(h,()=>{m=p}),r(i,h,m)}})(a)}}),this.collectedTrainableWeights=this.trainableWeights}checkTrainableWeightsConsistency(){this.collectedTrainableWeights!=null&&this.trainableWeights.length!==this.collectedTrainableWeights.length&&console.warn("Discrepancy between trainableweights and collected trainable weights. Did you set `model.trainable` without calling `model.compile()` afterwards?")}evaluate(e,t,s={}){const o=s.batchSize==null?32:s.batchSize;Sd(o);const i=this.standardizeUserDataXY(e,t,!0,o);try{const a=i[0].concat(i[1]);this.makeTestFunction();const l=this.testFunction,c=this.testLoop(l,a,o,s.verbose,s.steps);return Kt(c)}finally{Rn(i[0],e),Rn(i[1],t)}}evaluateDataset(e,t){return X(this,null,function*(){return this.makeTestFunction(),RE(this,e,t)})}checkNumSamples(e,t,s,o="steps"){let r;if(s!=null){if(r=null,t!=null)throw new O(`If ${o} is set, batchSize must be null or undefined.Got batchSize = ${t}`)}else if(e!=null)Array.isArray(e)?r=e[0].shape[0]:r=e.shape[0];else throw new O(`Either the input data should have a defined shape, or ${o} shoud be specified.`);return r}execute(e,t){if(Array.isArray(t)&&t.length===0)throw new O("`outputs` is an empty Array, which is not allowed.");const s=Array.isArray(t),o=s?t:[t],r=this.retrieveSymbolicTensors(o),i=new Ss;if(e instanceof ct&&(e=[e]),Array.isArray(e)){if(e.length!==this.inputs.length)throw new O(`The number of inputs provided (${e.length}) does not match the number of inputs of this model (${this.inputs.length}).`);for(let l=0;l<this.inputs.length;++l)i.add(this.inputs[l],e[l])}else for(const l of this.inputs){const c=e[l.name];if(c==null)throw new O(`No value is provided for the model's input ${l.name}`);i.add(l,c)}const a=Ri(r,i);return s?a:a[0]}retrieveSymbolicTensors(e){const t=ao(null,e.length);let s=e.length;for(const o of this.layers){const r=Array.isArray(o.output)?o.output:[o.output],i=r.map(a=>a.name);for(let a=0;a<e.length;++a){const l=i.indexOf(e[a]);if(l!==-1&&(t[a]=r[l],s--),s===0)break}if(s===0)break}if(s>0){const o=[];throw t.forEach((r,i)=>{r==null&&o.push(e[i])}),new O(`Cannot find SymbolicTensors for output name(s): ${JSON.stringify(o)}`)}return t}predictLoop(e,t=32,s=!1){return B(()=>{const o=this.checkNumSamples(e);if(s)throw new Ce("Verbose predictLoop() is not implemented yet.");const r=Td(o,t),i=this.outputs.map(a=>[]);for(let a=0;a<r.length;++a)B(()=>{const c=r[a][0],u=r[a][1],h=_i(e,c,u),d=[];if(Array.isArray(h))for(let f=0;f<h.length;++f)d.push({key:this.inputs[f],value:h[f]});else d.push({key:this.inputs[0],value:h});const p=new Ss(d);return Ri(this.outputs,p)}).forEach((c,u)=>i[u].push(c));return Kt(i.map(a=>vt(a,0)))})}predict(e,t={}){const s=xx(e);wx(s,this.inputNames,this.feedInputShapes,!1);try{const o=t.batchSize==null?32:t.batchSize;return Sd(o),this.predictLoop(s,o)}finally{Rn(s,e)}}predictOnBatch(e){wx(e,this.inputNames,this.feedInputShapes,!0);const t=(Array.isArray(e)?e[0]:e).shape[0];return this.predictLoop(e,t)}standardizeUserDataXY(e,t,s=!0,o){if(this.optimizer_==null)throw new pn("You must compile a model before training/testing. Use LayersModel.compile(modelCompileArgs).");const r=[];for(let i=0;i<this.feedOutputShapes.length;++i){const a=this.feedOutputShapes[i];this.feedLossFns[i]===jl?r.push(a.slice(0,a.length-1).concat([1])):r.push(a)}if(e=yx(e,this.feedInputNames,this.feedInputShapes,!1,"input"),t=yx(t,this.feedOutputNames,r,!1,"target"),DE(e,t),FE(t,this.feedLossFns,this.feedOutputShapes),this.stateful&&o!=null&&o>0&&e[0].shape[0]%o!==0)throw new O(`In a stateful network, you should only pass inputs with a number of samples that is divisible by the batch size ${o}. Found: ${e[0].shape[0]} sample(s).`);return[e,t]}standardizeUserData(e,t,s,o,r=!0,i){return X(this,null,function*(){const[a,l]=this.standardizeUserDataXY(e,t,r,i);if(s!=null)throw new Error("sample weight is not supported yet.");let c=null;if(o!=null){const u=dx(o,this.outputNames);c=[];for(let h=0;h<u.length;++h)c.push(yield px(l[h],null,u[h]))}return[a,l,c]})}testLoop(e,t,s,o=0,r){return B(()=>{const i=this.checkNumSamples(t,s,r,"steps"),a=[];if(o>0)throw new Ce("Verbose mode is not implemented yet.");if(r!=null)throw new Ce("steps mode in testLoop() is not implemented yet");{const l=Td(i,s),c=Zt(Sn(0,i));for(let u=0;u<l.length;++u){const h=l[u][0],d=l[u][1],p=ho(c,h,d-h),f=Nd(t,p),m=e(f);if(u===0)for(let g=0;g<m.length;++g)a.push(Oe(0));for(let g=0;g<m.length;++g){const x=m[g];a[g]=te(a[g],L(d-h,x))}}for(let u=0;u<a.length;++u)a[u]=ge(a[u],i)}return a})}getDedupedMetricsNames(){const e=this.metricsNames,t=[];for(let s=0;s<e.length;++s){const o=e[s];let r=o;if($g(e,o)>1){const i=$g(e.slice(0,s),o);r+=`_${i}`}t.push(r)}return t}makeTrainFunction(){return e=>{const t=[],s=e.slice(0,this.inputs.length),o=e.slice(this.inputs.length,this.inputs.length+this.outputs.length),r=e.slice(this.inputs.length+this.outputs.length,this.inputs.length+this.outputs.length*2),i=[],a=()=>{const h=[];for(let m=0;m<this.inputs.length;++m)h.push({key:this.inputs[m],value:s[m]});const d=new Ss(h),p=Ri(this.outputs,d,{training:!0});let f;for(let m=0;m<this.lossFunctions.length;++m){const g=this.lossFunctions[m];let x=g(o[m],p[m]);r[m]!=null&&(x=vE(x,r[m]));const b=lt(x);t.push(b),m===0?f=x:f=te(f,x)}for(let m=0;m<this.metricsTensors.length;++m){let g;if(this.outputs.length>1&&m<this.outputs.length)g=t[m];else{const x=this.metricsTensors[m][0],b=this.metricsTensors[m][1];g=lt(x(o[b],p[b]))}On(g),i.push(g)}return f=lt(f),this.calculateLosses().forEach(m=>{f=te(f,m)}),f},l=this.collectedTrainableWeights.map(h=>h.read());return[this.optimizer_.minimize(a,!0,l)].concat(i)}}makeTestFunction(){this.testFunction=e=>B(()=>{const t=[];let s;const o=e.slice(0,this.inputs.length),r=e.slice(this.inputs.length,this.inputs.length+this.outputs.length),i=[];for(let c=0;c<this.inputs.length;++c)i.push({key:this.inputs[c],value:o[c]});const a=new Ss(i),l=Ri(this.outputs,a);for(let c=0;c<this.lossFunctions.length;++c){const u=this.lossFunctions[c],h=lt(u(r[c],l[c]));c===0?s=h:s=te(s,h),t.push(s)}for(let c=0;c<this.metricsTensors.length;++c){const u=this.metricsTensors[c][0],h=this.metricsTensors[c][1],d=lt(u(r[h],l[h]));t.push(d)}return t})}fit(o,r){return X(this,arguments,function*(e,t,s={}){if(this.isTraining)throw new Error("Cannot start training because another fit() call is ongoing.");this.isTraining=!0;let i,a,l,c,u,h,d,p,f;try{const m=s.batchSize==null?32:s.batchSize;Sd(m);const x=yield this.standardizeUserData(e,t,s.sampleWeight,s.classWeight,!1,m);i=x[0],a=x[1],f=x[2];let b=!1,w;if(s.validationData!=null&&s.validationData.length>0){if(b=!0,s.validationData.length===2)u=s.validationData[0],h=s.validationData[1];else throw s.validationData.length===3?new Ce("validationData including sample weights is not supported yet."):new O(`When passing validation data, it must contain 2 (valX, valY) or 3 (valX, valY, valSampleWeight) items; ${s.validationData} is invalid.`);const E=yield this.standardizeUserData(u,h,null,null,!0,m);d=E[0],p=E[1],w=d.concat(p)}else if(s.validationSplit!=null&&s.validationSplit>0&&s.validationSplit<1){b=!0;const I=Math.floor(i[0].shape[0]*(1-s.validationSplit)),E=i[0].shape[0];d=_i(i,I,E),l=i,i=_i(i,0,I),p=_i(a,I,E),c=a,a=_i(a,0,I),w=d.concat(p)}else s.validationSteps!=null&&(b=!0);const y=i.concat(a).concat(f);this.checkTrainableWeightsConsistency();const C=this.makeTrainFunction(),$=this.getDedupedMetricsNames();let v,k;b?(this.makeTestFunction(),v=this.testFunction,k=$.slice().concat($.map(I=>"val_"+I))):(v=null,w=[],k=$.slice());const N=tx(s.callbacks,s.yieldEvery);return yield this.fitLoop(C,y,$,m,s.epochs,s.verbose,N,v,w,s.shuffle,k,s.initialEpoch,null,null)}finally{this.isTraining=!1,Rn(i,e),Rn(a,t),Rn(l,e),Rn(c,t),Rn(d,u),Rn(p,h),f!=null&&xe(f)}})}fitLoop(e,t,s,o,r,i,a,l,c,u,h,d,p,f){return X(this,null,function*(){o==null&&(o=32),r==null&&(r=1),u==null&&(u=!0),d==null&&(d=0);let m=!1;if(l!=null&&c!=null&&(m=!0),f!=null&&(m=!0,p==null))throw new O("Can only use `validationSteps` when doing step-wise training, i.e., `stepsPerEpoch` must be set.");const g=this.checkNumSamples(t,o,p,"steps_per_epoch");let x;g!=null&&(x=Sn(0,g)),i==null&&(i=1);const{callbackList:b,history:w}=nx(a,i,r,d,g,p,o,m,h);b.setModel(this),this.history=w,yield b.onTrainBegin(),this.stopTraining_=!1;for(let y=d;y<r;++y){yield b.onEpochBegin(y);const C={};if(p!=null)throw new Ce("stepsPerEpoch mode is not implemented yet.");{if(u==="batch")throw new Ce("batch shuffling is not implemneted yet");u&&Oc(x);const $=Zt(x),v=Td(g,o);for(let k=0;k<v.length;++k){const N={};if(yield b.onBatchBegin(k,N),B(()=>{const T=v[k][0],I=v[k][1],E=ho($,T,I-T);N.batch=k,N.size=I-T;const R=Nd(t,E),D=e(R);for(let F=0;F<s.length;++F){const _=s[F],P=D[F];N[_]=P,On(P)}if(k===v.length-1&&m){const F=this.testLoop(l,c,o);for(let _=0;_<s.length;++_){const P=s[_],z=F[_];On(z),C["val_"+P]=z}}}),yield b.onBatchEnd(k,N),Qg(N),this.stopTraining_)break}$.dispose()}if(yield b.onEpochEnd(y,C),this.stopTraining_)break}return yield b.onTrainEnd(),yield this.history.syncData(),this.history})}fitDataset(e,t){return X(this,null,function*(){return NE(this,e,t)})}trainOnBatch(e,t){return X(this,null,function*(){const s=yield this.standardizeUserData(e,t),o=s[0],r=s[1],a=this.makeTrainFunction()(o.concat(r)),l=[];for(const c of a){const u=yield c.data();l.push(u[0])}return xe(a),Rn(s[0],e),Rn(s[1],t),Kt(l)})}getNamedWeights(e){const t=[],s=e!=null&&e.trainableOnly,o=s?this.trainableWeights:this.weights,r=this.getWeights(s);for(let i=0;i<o.length;++i)s&&!o[i].trainable||t.push({name:o[i].originalName,tensor:r[i]});return t}set stopTraining(e){this.stopTraining_=e}get stopTraining(){return this.stopTraining_}get optimizer(){return this.optimizer_}set optimizer(e){this.optimizer_!==e&&(this.optimizer_=e,this.isOptimizerOwned=!1)}dispose(){const e=super.dispose();if(e.refCountAfterDispose===0&&this.optimizer!=null&&this.isOptimizerOwned){const t=ci().numTensors;this.optimizer_.dispose(),e.numDisposedVariables+=t-ci().numTensors}return e}getLossIdentifiers(){let e;if(typeof this.loss=="string")e=ls(this.loss);else if(Array.isArray(this.loss)){for(const t of this.loss)if(typeof t!="string")throw new Error("Serialization of non-string loss is not supported.");e=this.loss.map(t=>ls(t))}else{const t=Object.keys(this.loss);e={};const s=this.loss;for(const o of t)if(typeof s[o]=="string")e[o]=ls(s[o]);else throw new Error("Serialization of non-string loss is not supported.")}return e}getMetricIdentifiers(){if(typeof this.metrics=="string"||typeof this.metrics=="function")return[ls(Jl(this.metrics))];if(Array.isArray(this.metrics))return this.metrics.map(e=>ls(Jl(e)));{const e={};for(const t in this.metrics)e[t]=ls(Jl(this.metrics[t]));return e}}getTrainingConfig(){return{loss:this.getLossIdentifiers(),metrics:this.getMetricIdentifiers(),optimizer_config:{class_name:this.optimizer.getClassName(),config:this.optimizer.getConfig()}}}loadTrainingConfig(e){if(e.weighted_metrics!=null)throw new Error("Loading weight_metrics is not supported yet.");if(e.loss_weights!=null)throw new Error("Loading loss_weights is not supported yet.");if(e.sample_weight_mode!=null)throw new Error("Loading sample_weight_mode is not supported yet.");const t=ec(e.optimizer_config),s=Kn(t);let o;if(typeof e.loss=="string")o=lo(e.loss);else if(Array.isArray(e.loss))o=e.loss.map(i=>lo(i));else if(e.loss!=null){o={};for(const i in e.loss)o[i]=lo(e.loss[i])}let r;if(Array.isArray(e.metrics))r=e.metrics.map(i=>lo(i));else if(e.metrics!=null){r={};for(const i in e.metrics)r[i]=lo(e.metrics[i])}this.compile({loss:o,metrics:r,optimizer:s})}save(e,t){return X(this,null,function*(){if(typeof e=="string"){const c=lC(e);if(c.length===0)throw new O(`Cannot find any save handlers for URL '${e}'`);if(c.length>1)throw new O(`Found more than one (${c.length}) save handlers for URL '${e}'`);e=c[0]}if(e.save==null)throw new O("LayersModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");const s=yield kf(this.getNamedWeights(t)),a={modelTopology:this.toJSON(null,!1),format:OE,generatedBy:`TensorFlow.js tfjs-layers v${hx}`,convertedBy:null};if((t==null?!1:t.includeOptimizer)&&this.optimizer!=null){a.trainingConfig=this.getTrainingConfig();const c="optimizer",{data:u,specs:h}=yield kf(yield this.optimizer.getWeights(),c);s.specs.push(...h),s.data=tC([s.data,u])}return this.userDefinedMetadata!=null&&(cx(this.userDefinedMetadata,this.name,!0),a.userDefinedMetadata=this.userDefinedMetadata),a.weightData=s.data,a.weightSpecs=s.specs,e.save(a)})}setUserDefinedMetadata(e){cx(e,this.name),this.userDefinedMetadata=e}getUserDefinedMetadata(){return this.userDefinedMetadata}}Ko.className="Model",ee(Ko);class Cx extends Ko{}Cx.className="Functional",ee(Cx);function LE(n,e){return X(this,null,function*(){if(e==null&&(e={}),typeof n=="string"){const t=cC(n,e);if(t.length===0)t.push(qS(n,e));else if(t.length>1)throw new O(`Found more than one (${t.length}) load handlers for URL '${n}'`);n=t[0]}return ME(n,void 0,e)})}function ME(n,e,t){return X(this,null,function*(){if(t==null&&(t={}),n.load==null)throw new O("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const s=yield n.load();let o=s.modelTopology;o.model_config!=null&&(o=o.model_config);const r=t.strict==null?!0:t.strict,i=s.weightData!=null&&s.weightSpecs!=null&&r,a=Kn(ec(o),e,i),l=s.trainingConfig;if(l!=null&&a.loadTrainingConfig(l),s.userDefinedMetadata!=null&&a.setUserDefinedMetadata(s.userDefinedMetadata),s.weightData!=null){if(s.weightSpecs==null)throw new O("LayersModel artifacts contains weight data, but not weight specs. Therefore loading of weights cannot proceed.");const{modelWeights:c,optimizerWeights:u}=PE(s.weightData,s.weightSpecs);a.loadWeights(c,r),a.optimizer!=null&&u.length>0&&(yield a.optimizer.setWeights(u)),xe(c),xe(u.map(h=>h.tensor))}return a})}function PE(n,e){const t=Xw(n,e),s={},o=[];return e.forEach(r=>{r.group==="optimizer"?o.push({name:r.name,tensor:t[r.name]}):s[r.name]=t[r.name]}),{modelWeights:s,optimizerWeights:o}}class Oi extends Ko{constructor(e){if(super({inputs:[],outputs:[]}),e=e||{},this.trainable=!0,this.built=!1,this.name=e.name!=null?e.name:Pl("sequential_"),e.layers!=null)for(const t of e.layers)this.add(t)}checkShape(e){if(e.inboundNodes[0].outputTensors[0].shape.some(s=>s<0))throw new O(`Negative dimension size caused by adding layer ${e.name} with input shape [${e.inboundNodes[0].inputTensors[0].shape}]`)}add(e){const t=e instanceof Oi||e instanceof Ko;let s;if(t){if(s=e,s.outputs.length!==1)throw new O("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");if(s.inputs.length!==1)throw new O("All layers in a Sequential model should have a single input tensor. For multi-input layers, use the functional API.")}if(this.outputs.length===0){if(e.inboundNodes.length===0){if(e.batchInputShape==null)throw new O("The first layer in a Sequential model must get an `inputShape` or `batchInputShape` argument.");const o=PT({batchShape:e.batchInputShape,dtype:e.dtype,name:e.name+"_input"});e.apply(o)}if(t)this.outputs=s.outputs,this.inputs=s.inputs;else{if(e.inboundNodes.length!==1)throw new O(`A layer added to a Sequential model must not already be connected somewhere else. LayersModel received layer ${e.name} which has ${e.inboundNodes.length} pre-existing inbound connections.`);if(e.inboundNodes[0].outputTensors.length!==1)throw new O("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");this.checkShape(e),this.outputs=[e.inboundNodes[0].outputTensors[0]],this.inputs=Hg(this.outputs[0])}this.inboundNodes=[],new Ul({outboundLayer:this,inboundLayers:[],nodeIndices:[],tensorIndices:[],inputTensors:this.inputs,outputTensors:this.outputs,inputMasks:ao(null,this.inputs.length),outputMasks:[null],inputShapes:this.inputs.map(o=>o.shape),outputShapes:this.outputs[0].shape})}else{const o=e.apply(this.outputs[0]);if(Array.isArray(o))throw new TypeError("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");this.checkShape(e),this.outputs=[o],this.inboundNodes[0].outputTensors=this.outputs,this.inboundNodes[0].outputShapes=[this.outputs[0].shape]}this.layers.push(e),this.built=!1}pop(){if(this.layers.length===0)throw new TypeError("There are no layers in the model.");if(this.layers.pop(),this.layers.length===0)this.outputs=[],this.inboundNodes=[],this.outboundNodes=[];else{const e=this.layers.length-1;this.layers[e].outboundNodes=[],this.outputs=[this.layers[e].output],this.inboundNodes[0].outputTensors=this.outputs,this.inboundNodes[0].outputShapes=[this.outputs[0].shape]}}call(e,t){return this.model==null&&this.build(),this.model.call(e,t)}build(e){if(De(e),this.inputs.length===0||this.outputs.length===0)throw new TypeError("Sequential model cannot be built: model is empty. Add some layers first.");this.model=new Ko({inputs:this.inputs,outputs:this.outputs[0],name:this.name+"_model"}),this.model.trainable=this.trainable,this.supportsMasking=this.model.supportsMasking,this.inputLayers=this.model.inputLayers,this.inputLayersNodeIndices=this.model.inputLayersNodeIndices,this.inputLayersTensorIndices=this.model.inputLayersTensorIndices,this.outputLayers=this.model.outputLayers,this.outputLayersNodeIndices=this.model.outputLayersNodeIndices,this.outputLayersTensorIndices=this.model.outputLayersTensorIndices,this.nodesByDepth=this.model.nodesByDepth,this.containerNodes=this.model.containerNodes,this.outputNames=this.model.outputNames,this.inputNames=this.model.inputNames,this.built=!0}countParams(){return this.built||this.build(),super.countParams()}summary(e,t,s=console.log){this.built||this.build(),super.summary(e,t,s)}setWeights(e){this.model==null&&this.build(),this.model.setWeights(e)}evaluate(e,t,s={}){if(!this.built)throw new pn("The model needs to be compiled before being used.");return this.model.evaluate(e,t,s)}evaluateDataset(e,t){return X(this,null,function*(){if(!this.built)throw new pn("The model needs to be compiled before being used.");return this.model.evaluateDataset(e,t)})}predict(e,t={}){return this.model==null&&this.build(),this.model.predict(e,t)}predictOnBatch(e){return this.model==null&&this.build(),this.model.predictOnBatch(e)}compile(e){this.build(),this.model.compile(e),this.optimizer_=this.model.optimizer,this.isOptimizerOwned=this.model.isOptimizerOwned,this.loss=this.model.loss,this.metrics=this.model.metrics,this.metricsTensors=this.model.metricsTensors,this.metricsNames=this.model.metricsNames}get optimizer(){return this.model==null?void 0:this.model.optimizer}set optimizer(e){this.model.optimizer=e}fit(o,r){return X(this,arguments,function*(e,t,s={}){if(!this.built)throw new pn("The model needs to be compiled before being used.");return this.model.fit(e,t,s)})}fitDataset(e,t){return X(this,null,function*(){if(!this.built)throw new pn("The model needs to be compiled before being used.");return this.model.fitDataset(e,t)})}trainOnBatch(e,t){return X(this,null,function*(){return this.model.trainOnBatch(e,t)})}static fromConfig(e,t,s={},o=!1){let r,i={};if(t instanceof Array){if(t[0].className==null||t[0].className==="Merge")throw new O("Legacy serialization format not supported yet.");r=t}else S(t.layers!=null,()=>"When the config data for a Sequential model is not an Array, it must be an Object that contains the 'layers' field."),r=t.layers,delete t.layers,i=t;const a=new e(i);if(!(a instanceof Oi))throw new Ce(`Sequential.fromConfig called on non-Sequential input: ${a}`);for(const l of r){const u=Kn(l,void 0,o);o&&u.setFastWeightInitDuringBuild(!0),a.add(u)}return a}set stopTraining(e){if(this.model==null)throw new O("Cannot set the stopTraining property of a sequential model before it is compiled.");this.model.stopTraining=e}get stopTraining(){if(this.model==null)throw new O("Cannot get the stopTraining property of a sequential model before it is compiled.");return this.model.stopTraining}getConfig(){const e=[];for(const t of this.layers){const s={};s.className=t.getClassName(),s.config=t.getConfig(),e.push(s)}return{name:this.name,layers:e}}}Oi.className="Sequential",ee(Oi);let Ft=class extends Uo{getConfig(){return{}}};class Ix extends Ft{apply(e,t=1){return IT(e,t)}}Ix.className="elu",ee(Ix);class $x extends Ft{apply(e){return hm(e)}}$x.className="selu",ee($x);class vx extends Ft{apply(e){return no(e)}}vx.className="relu",ee(vx);class kx extends Ft{apply(e){return B(()=>xi(6,no(e)))}}kx.className="relu6",ee(kx);class Sx extends Ft{apply(e){return e}}Sx.className="linear",ee(Sx);class Nx extends Ft{apply(e){return Mo(e)}}Nx.className="sigmoid",ee(Nx);class Tx extends Ft{apply(e){return vT(e)}}Tx.className="hardSigmoid",ee(Tx);class Ex extends Ft{apply(e){return gi(e)}}Ex.className="softplus",ee(Ex);class Rx extends Ft{apply(e){return $T(e)}}Rx.className="softsign",ee(Rx);class Ax extends Ft{apply(e){return fl(e)}}Ax.className="tanh",ee(Ax);let Rd=class extends Ft{apply(e,t=-1){return bh(e,t)}};Rd.className="softmax",ee(Rd);class Dx extends Ft{apply(e,t=-1){return Yf(e,t)}}Dx.className="logSoftmax",ee(Dx);class Fx extends Ft{apply(e){return B(()=>B(()=>{const t=Math.sqrt(2),s=L(.5,te(1,Hf(ge(e,t))));return L(e,s)}))}}Fx.className="gelu",ee(Fx);class _x extends Ft{apply(e){return B(()=>L(.5,L(e,te(1,fl(L(Dt(ge(2,Math.PI)),te(e,L(.044715,eo(e,3)))))))))}}_x.className="gelu_new",ee(_x);class Ox extends Ft{apply(e){return B(()=>L(e,fl(gi(e))))}}Ox.className="mish",ee(Ox);class Lx extends Ft{apply(e,t=1){return B(()=>L(Mo(L(e,t)),e))}}Lx.className="swish",ee(Lx);function Ns(n){return n.getClassName()}function Ad(n,e={}){return vi(n,dn.getMap().classNameMap,e,"activation")}function Ts(n){if(n==null){const e={};return e.className="linear",e.config={},Ad(e)}if(typeof n=="string"){const e={};return e.className=n,e.config={},Ad(e)}else return n instanceof Ft?n:Ad(n)}function zE(n){if(n!=null&&typeof n!="object")throw new Error(`Argument to L1L2 regularizer's constructor is expected to be an object, but received: ${n}`)}class Mx extends Uo{}class Px extends Mx{constructor(e){super(),zE(e),this.l1=e==null||e.l1==null?.01:e.l1,this.l2=e==null||e.l2==null?.01:e.l2,this.hasL1=this.l1!==0,this.hasL2=this.l2!==0}apply(e){return B(()=>{let t=ot([1]);return this.hasL1&&(t=te(t,me(L(this.l1,Pt(e))))),this.hasL2&&(t=te(t,me(L(this.l2,Ni(e))))),V(t,[])})}getConfig(){return{l1:this.l1,l2:this.l2}}static fromConfig(e,t){return new e({l1:t.l1,l2:t.l2})}}Px.className="L1L2",ee(Px);const zx={l1l2:"L1L2"};function Ue(n){return nd(n)}function Bx(n,e={}){return vi(n,dn.getMap().classNameMap,e,"regularizer")}function Ye(n){if(n==null)return null;if(typeof n=="string"){const t={className:n in zx?zx[n]:n,config:{}};return Bx(t)}else return n instanceof Mx?n:Bx(n)}class Vx extends Se{constructor(e){super(e==null?{}:e),this.supportsMasking=!0,e!=null&&(this.maxValue=e.maxValue)}call(e,t){e=ye(e);let s=no(e);return this.maxValue!=null&&(s=sn(s,0,this.maxValue)),s}computeOutputShape(e){return e}getConfig(){const e={maxValue:this.maxValue},t=super.getConfig();return Object.assign(e,t),e}}Vx.className="ReLU",ee(Vx);class Wx extends Se{constructor(e){super(e==null?{}:e),this.DEFAULT_ALPHA=.3,e==null&&(e={}),this.alpha=e.alpha==null?this.DEFAULT_ALPHA:e.alpha}call(e,t){const s=ye(e);return lh(s,this.alpha)}computeOutputShape(e){return e}getConfig(){const e={alpha:this.alpha},t=super.getConfig();return Object.assign(e,t),e}}Wx.className="LeakyReLU",ee(Wx);class Ux extends Se{constructor(e){if(super(e==null?{}:e),this.DEFAULT_ALPHA_INITIALIZER="zeros",e==null&&(e={}),this.supportsMasking=!0,this.alphaInitializer=Xe(e.alphaInitializer||this.DEFAULT_ALPHA_INITIALIZER),this.alphaRegularizer=Ye(e.alphaRegularizer),this.alphaConstraint=gt(e.alphaConstraint),e.sharedAxes==null)this.sharedAxes=null;else if(Array.isArray(e.sharedAxes))this.sharedAxes=e.sharedAxes;else if(typeof e.sharedAxes=="number")this.sharedAxes=[e.sharedAxes];else throw new O(`Expected sharedAxes to be a number or an array of numbers, but got ${e.sharedAxes}`)}build(e){e=De(e);const t=e.slice(1);if(this.sharedAxes!=null)for(const o of this.sharedAxes)t[o-1]=1;this.alpha=this.addWeight("alpha",t,"float32",this.alphaInitializer,this.alphaRegularizer,!0,this.alphaConstraint);const s={};if(this.sharedAxes!=null)for(let o=1;o<e.length;++o)s[o]=e[o];this.inputSpec=[new ft({ndim:e.length,axes:s})],this.built=!0}call(e,t){return e=ye(e),ph(e,this.alpha.read())}getConfig(){const e={alphaInitializer:Je(this.alphaInitializer),alphaRegularizer:Ue(this.alphaRegularizer),alphaConstraint:mt(this.alphaConstraint),sharedAxes:this.sharedAxes},t=super.getConfig();return Object.assign(e,t),e}}Ux.className="PReLU",ee(Ux);let Gx=class extends Se{constructor(e){if(super(e==null?{}:e),this.DEFAULT_ALPHA=1,e==null&&(e={}),e.alpha!=null&&e.alpha!==this.DEFAULT_ALPHA)throw new Ce(`Non-default alpha value (${e.alpha}) is not supported by the ELU layer yet.`);this.alpha=e.alpha==null?this.DEFAULT_ALPHA:e.alpha}call(e,t){const s=ye(e);return gl(s)}computeOutputShape(e){return e}getConfig(){const e={alpha:this.alpha},t=super.getConfig();return Object.assign(e,t),e}};Gx.className="ELU",ee(Gx);class Hx extends Se{constructor(e){super(e==null?{}:e),this.DEFAULT_THETA=1,e==null&&(e={}),this.theta=e.theta==null?this.DEFAULT_THETA:e.theta}call(e,t){const s=ye(e);return L(s,re(qt(s,this.theta),"float32"))}computeOutputShape(e){return e}getConfig(){const e={theta:this.theta},t=super.getConfig();return Object.assign(e,t),e}}Hx.className="ThresholdedReLU",ee(Hx);class qx extends Se{constructor(e){super(e==null?{}:e),this.DEFAULT_AXIS=1,e==null&&(e={}),this.softmax=new Rd().apply,this.axis=e.axis==null?this.DEFAULT_AXIS:e.axis}call(e,t){return B(()=>{let s=ye(e);const o=t.mask;if(o!=null){const r=L(be(os(s.shape),re(o,s.dtype)),Oe(-1e9));s=te(s,r)}return this.axis instanceof Array?this.axis.length>1?Pn(be(s,Zf(s,this.axis,!0))):this.softmax(s,this.axis[0]):this.softmax(s,this.axis)})}computeOutputShape(e){return e}getConfig(){const e={axis:this.axis},t=super.getConfig();return Object.assign(e,t),e}}qx.className="Softmax",ee(qx);function jo(n,e,t){if(typeof n=="number")return ao(n,e);if(n.length!==e)throw new O(`The ${t} argument must be an integer or tuple of ${e} integers. Received: ${n.length} elements.`);for(let s=0;s<e;++s){const o=n[s];if(!bT(o))throw new O(`The ${t} argument must be an integer or tuple of ${e} integers. Received: ${JSON.stringify(n)} including a non-integer number ${o}`)}return n}function An(n,e,t,s,o=1){if(n==null)return n;const r=e+(e-1)*(o-1);let i;return t==="same"?i=n:i=n-r+1,Math.floor((i+s-1)/s)}function jn(n,e,t,s){if(n==null)return null;if(s==="valid")n=n*e+ks([t-e,0]);else if(s==="same")n=n*e;else throw new O(`Unsupport padding mode: ${s}.`);return n}function Dd(n,e){return B(()=>(rt(e),e==="channelsFirst"?Re(n,[0,2,3,1]):n))}function Kx(n,e){return B(()=>(rt(e),e==="channelsFirst"?Re(n,[0,2,3,4,1]):n))}function BE(n,e,t,s=1,o="valid",r,i=1){return B(()=>{if(r==null&&(r=Nn()),rt(r),n.shape.length!==3)throw new O(`The input of a conv1dWithBias operation should be 3, but is ${n.shape.length} instead.`);if(e.shape.length!==3)throw new O(`The kernel for a conv1dWithBias operation should be 3, but is ${e.shape.length} instead`);if(t!=null&&t.shape.length!==1)throw new O(`The bias for a conv1dWithBias operation should be 1, but is ${t.shape.length} instead`);if(r==="channelsFirst"&&(n=Re(n,[0,2,1])),o==="causal")throw new Ce("The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.");let a=Pf(n,e,s,o==="same"?"same":"valid","NWC",i);return t!=null&&(a=Tn(a,t)),a})}function jx(n,e,t,s=[1,1],o="valid",r,i,a=null){return B(()=>{if(r==null&&(r=Nn()),rt(r),n.rank!==3&&n.rank!==4)throw new O(`conv2dWithBiasActivation expects input to be of rank 3 or 4, but received ${n.rank}.`);if(e.rank!==3&&e.rank!==4)throw new O(`conv2dWithBiasActivation expects kernel to be of rank 3 or 4, but received ${n.rank}.`);let l=Dd(n,r);if(o==="causal")throw new Ce("The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.");return l=Pk({x:l,filter:e,strides:s,pad:o==="same"?"same":"valid",dilations:i,dataFormat:"NHWC",bias:t,activation:a}),r==="channelsFirst"&&(l=Re(l,[0,3,1,2])),l})}function VE(n,e,t,s=[1,1,1],o="valid",r,i){return B(()=>{if(r==null&&(r=Nn()),rt(r),n.rank!==4&&n.rank!==5)throw new O(`conv3dWithBias expects input to be of rank 4 or 5, but received ${n.rank}.`);if(e.rank!==4&&e.rank!==5)throw new O(`conv3dWithBias expects kernel to be of rank 4 or 5, but received ${n.rank}.`);let a=Kx(n,r);if(o==="causal")throw new Ce("The support for CAUSAL padding mode in conv3dWithBias is not implemented yet.");return a=fi(a,e,s,o==="same"?"same":"valid","NDHWC",i),t!=null&&(a=Tn(a,t)),r==="channelsFirst"&&(a=Re(a,[0,4,1,2,3])),a})}class tc extends Se{constructor(e,t){if(super(t),this.bias=null,this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_BIAS_INITIALIZER="zeros",tc.verifyArgs(t),this.rank=e,wt(this.rank,"rank"),this.rank!==1&&this.rank!==2&&this.rank!==3)throw new Ce(`Convolution layer for rank other than 1, 2, or 3 (${this.rank}) is not implemented yet.`);if(this.kernelSize=jo(t.kernelSize,e,"kernelSize"),this.strides=jo(t.strides==null?1:t.strides,e,"strides"),this.padding=t.padding==null?"valid":t.padding,rn(this.padding),this.dataFormat=t.dataFormat==null?"channelsLast":t.dataFormat,rt(this.dataFormat),this.activation=Ts(t.activation),this.useBias=t.useBias==null?!0:t.useBias,this.biasInitializer=Xe(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.biasConstraint=gt(t.biasConstraint),this.biasRegularizer=Ye(t.biasRegularizer),this.activityRegularizer=Ye(t.activityRegularizer),this.dilationRate=jo(t.dilationRate==null?1:t.dilationRate,e,"dilationRate"),this.rank===1&&Array.isArray(this.dilationRate)&&this.dilationRate.length!==1)throw new O(`dilationRate must be a number or an array of a single number for 1D convolution, but received ${JSON.stringify(this.dilationRate)}`);if(this.rank===2){if(typeof this.dilationRate=="number")this.dilationRate=[this.dilationRate,this.dilationRate];else if(this.dilationRate.length!==2)throw new O(`dilationRate must be a number or array of two numbers for 2D convolution, but received ${JSON.stringify(this.dilationRate)}`)}else if(this.rank===3){if(typeof this.dilationRate=="number")this.dilationRate=[this.dilationRate,this.dilationRate,this.dilationRate];else if(this.dilationRate.length!==3)throw new O(`dilationRate must be a number or array of three numbers for 3D convolution, but received ${JSON.stringify(this.dilationRate)}`)}}static verifyArgs(e){if(Un("kernelSize"in e,"required key 'kernelSize' not in config"),typeof e.kernelSize!="number"&&!od(e.kernelSize,"number",1,3))throw new O(`BaseConv expects config.kernelSize to be number or number[] with length 1, 2, or 3, but received ${JSON.stringify(e.kernelSize)}.`)}getConfig(){const e={kernelSize:this.kernelSize,strides:this.strides,padding:this.padding,dataFormat:this.dataFormat,dilationRate:this.dilationRate,activation:Ns(this.activation),useBias:this.useBias,biasInitializer:Je(this.biasInitializer),biasRegularizer:Ue(this.biasRegularizer),activityRegularizer:Ue(this.activityRegularizer),biasConstraint:mt(this.biasConstraint)},t=super.getConfig();return Object.assign(e,t),e}}class Xo extends tc{constructor(e,t){super(e,t),this.kernel=null,Xo.verifyArgs(t),this.filters=t.filters,wt(this.filters,"filters"),this.kernelInitializer=Xe(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.kernelConstraint=gt(t.kernelConstraint),this.kernelRegularizer=Ye(t.kernelRegularizer)}build(e){e=De(e);const t=this.dataFormat==="channelsFirst"?1:e.length-1;if(e[t]==null)throw new O(`The channel dimension of the input should be defined. Found ${e[t]}`);const s=e[t],o=this.kernelSize.concat([s,this.filters]);this.kernel=this.addWeight("kernel",o,null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight("bias",[this.filters],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[{ndim:this.rank+2,axes:{[t]:s}}],this.built=!0}call(e,t){return B(()=>{e=ye(e);let s;const o=this.bias==null?null:this.bias.read(),r=kg(this.activation.getClassName());if(r!=null&&this.rank===2)s=jx(e,this.kernel.read(),o,this.strides,this.padding,this.dataFormat,this.dilationRate,r);else{if(this.rank===1)s=BE(e,this.kernel.read(),o,this.strides[0],this.padding,this.dataFormat,this.dilationRate[0]);else if(this.rank===2)s=jx(e,this.kernel.read(),o,this.strides,this.padding,this.dataFormat,this.dilationRate);else if(this.rank===3)s=VE(e,this.kernel.read(),o,this.strides,this.padding,this.dataFormat,this.dilationRate);else throw new Ce("convolutions greater than 3D are not implemented yet.");this.activation!=null&&(s=this.activation.apply(s))}return s})}computeOutputShape(e){e=De(e);const t=[],s=this.dataFormat==="channelsLast"?e.slice(1,e.length-1):e.slice(2);for(let r=0;r<s.length;++r){const i=An(s[r],this.kernelSize[r],this.padding,this.strides[r],typeof this.dilationRate=="number"?this.dilationRate:this.dilationRate[r]);t.push(i)}let o=[e[0]];return this.dataFormat==="channelsLast"?(o=o.concat(t),o.push(this.filters)):(o.push(this.filters),o=o.concat(t)),o}getConfig(){const e={filters:this.filters,kernelInitializer:Je(this.kernelInitializer),kernelRegularizer:Ue(this.kernelRegularizer),kernelConstraint:mt(this.kernelConstraint)},t=super.getConfig();return Object.assign(e,t),e}static verifyArgs(e){if(!("filters"in e)||typeof e.filters!="number"||e.filters<1)throw new O(`Convolution layer expected config.filters to be a 'number' > 0 but got ${JSON.stringify(e.filters)}`)}}class Li extends Xo{constructor(e){super(2,e),Li.verifyArgs(e)}getConfig(){const e=super.getConfig();return delete e.rank,e}static verifyArgs(e){if(typeof e.kernelSize!="number"&&!od(e.kernelSize,"number",1,2))throw new O(`Conv2D expects config.kernelSize to be number or number[] with length 1 or 2, but received ${JSON.stringify(e.kernelSize)}.`)}}Li.className="Conv2D",ee(Li);class Mi extends Xo{constructor(e){super(3,e),Mi.verifyArgs(e)}getConfig(){const e=super.getConfig();return delete e.rank,e}static verifyArgs(e){if(typeof e.kernelSize!="number"&&!(Array.isArray(e.kernelSize)&&(e.kernelSize.length===1||e.kernelSize.length===3)))throw new O(`Conv3D expects config.kernelSize to be number or [number, number, number], but received ${JSON.stringify(e.kernelSize)}.`)}}Mi.className="Conv3D",ee(Mi);class Xx extends Li{constructor(e){if(super(e),this.inputSpec=[new ft({ndim:4})],this.padding!=="same"&&this.padding!=="valid")throw new O(`Conv2DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode ${this.padding}`)}build(e){if(e=De(e),e.length!==4)throw new O("Input should have rank 4; Received input shape: "+JSON.stringify(e));const t=this.dataFormat==="channelsFirst"?1:e.length-1;if(e[t]==null)throw new O("The channel dimension of the inputs should be defined. Found `None`.");const s=e[t],o=this.kernelSize.concat([this.filters,s]);this.kernel=this.addWeight("kernel",o,"float32",this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight("bias",[this.filters],"float32",this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[new ft({ndim:4,axes:{[t]:s}})],this.built=!0}call(e,t){return B(()=>{let s=ye(e);if(s.shape.length!==4)throw new O(`Conv2DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-${s.shape.length}`);const o=s.shape,r=o[0];let i,a;this.dataFormat==="channelsFirst"?(i=2,a=3):(i=1,a=2);const l=o[i],c=o[a],u=this.kernelSize[0],h=this.kernelSize[1],d=this.strides[0],p=this.strides[1],f=jn(l,d,u,this.padding),m=jn(c,p,h,this.padding),g=[r,f,m,this.filters];this.dataFormat!=="channelsLast"&&(s=Re(s,[0,2,3,1]));let x=zf(s,this.kernel.read(),g,this.strides,this.padding);return this.dataFormat!=="channelsLast"&&(x=Re(x,[0,3,1,2])),this.bias!=null&&(x=Tn(x,this.bias.read(),this.dataFormat)),this.activation!=null&&(x=this.activation.apply(x)),x})}computeOutputShape(e){e=De(e);const t=e.slice();let s,o,r;this.dataFormat==="channelsFirst"?(s=1,o=2,r=3):(s=3,o=1,r=2);const i=this.kernelSize[0],a=this.kernelSize[1],l=this.strides[0],c=this.strides[1];return t[s]=this.filters,t[o]=jn(t[o],l,i,this.padding),t[r]=jn(t[r],c,a,this.padding),t}getConfig(){const e=super.getConfig();return delete e.dilationRate,e}}Xx.className="Conv2DTranspose",ee(Xx);class Yx extends Mi{constructor(e){if(super(e),this.inputSpec=[new ft({ndim:5})],this.padding!=="same"&&this.padding!=="valid")throw new O(`Conv3DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode ${this.padding}`)}build(e){if(e=De(e),e.length!==5)throw new O("Input should have rank 5; Received input shape: "+JSON.stringify(e));const t=this.dataFormat==="channelsFirst"?1:e.length-1;if(e[t]==null)throw new O("The channel dimension of the inputs should be defined. Found `None`.");const s=e[t],o=this.kernelSize.concat([this.filters,s]);this.kernel=this.addWeight("kernel",o,"float32",this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight("bias",[this.filters],"float32",this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint)),this.inputSpec=[new ft({ndim:5,axes:{[t]:s}})],this.built=!0}call(e,t){return B(()=>{let s=ye(e);if(s.shape.length!==5)throw new O(`Conv3DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-${s.shape.length}`);const o=s.shape,r=o[0];let i,a,l;this.dataFormat==="channelsFirst"?(l=2,i=3,a=4):(l=1,i=2,a=3);const c=o[l],u=o[i],h=o[a],d=this.kernelSize[0],p=this.kernelSize[1],f=this.kernelSize[2],m=this.strides[0],g=this.strides[1],x=this.strides[2],b=jn(c,m,d,this.padding),w=jn(u,g,p,this.padding),y=jn(h,x,f,this.padding),C=[r,b,w,y,this.filters];this.dataFormat!=="channelsLast"&&(s=Re(s,[0,2,3,4,1]));let $=Vf(s,this.kernel.read(),C,this.strides,this.padding);return this.dataFormat!=="channelsLast"&&($=Re($,[0,4,1,2,3])),this.bias!==null&&($=Tn($,this.bias.read(),this.dataFormat)),this.activation!==null&&($=this.activation.apply($)),$})}computeOutputShape(e){e=De(e);const t=e.slice();let s,o,r,i;this.dataFormat==="channelsFirst"?(s=1,o=2,r=3,i=4):(s=4,o=1,r=2,i=3);const a=this.kernelSize[0],l=this.kernelSize[1],c=this.kernelSize[2],u=this.strides[0],h=this.strides[1],d=this.strides[2];return t[s]=this.filters,t[o]=jn(t[o],u,a,this.padding),t[r]=jn(t[r],h,l,this.padding),t[i]=jn(t[i],d,c,this.padding),t}getConfig(){const e=super.getConfig();return delete e.dilationRate,e}}Yx.className="Conv3DTranspose",ee(Yx);class Zx extends Xo{constructor(e,t){if(super(e,t),this.DEFAULT_DEPTHWISE_INITIALIZER="glorotUniform",this.DEFAULT_POINTWISE_INITIALIZER="glorotUniform",this.depthwiseKernel=null,this.pointwiseKernel=null,t.filters==null)throw new O("The `filters` configuration field is required by SeparableConv, but is unspecified.");if(t.kernelInitializer!=null||t.kernelRegularizer!=null||t.kernelConstraint!=null)throw new O("Fields kernelInitializer, kernelRegularizer and kernelConstraint are invalid for SeparableConv2D. Use depthwiseInitializer, depthwiseRegularizer, depthwiseConstraint, pointwiseInitializer, pointwiseRegularizer and pointwiseConstraint instead.");if(t.padding!=null&&t.padding!=="same"&&t.padding!=="valid")throw new O(`SeparableConv${this.rank}D supports only padding modes: 'same' and 'valid', but received ${JSON.stringify(t.padding)}`);this.depthMultiplier=t.depthMultiplier==null?1:t.depthMultiplier,this.depthwiseInitializer=Xe(t.depthwiseInitializer||this.DEFAULT_DEPTHWISE_INITIALIZER),this.depthwiseRegularizer=Ye(t.depthwiseRegularizer),this.depthwiseConstraint=gt(t.depthwiseConstraint),this.pointwiseInitializer=Xe(t.depthwiseInitializer||this.DEFAULT_POINTWISE_INITIALIZER),this.pointwiseRegularizer=Ye(t.pointwiseRegularizer),this.pointwiseConstraint=gt(t.pointwiseConstraint)}build(e){if(e=De(e),e.length<this.rank+2)throw new O(`Inputs to SeparableConv${this.rank}D should have rank ${this.rank+2}, but received input shape: ${JSON.stringify(e)}`);const t=this.dataFormat==="channelsFirst"?1:e.length-1;if(e[t]==null||e[t]<0)throw new O(`The channel dimension of the inputs should be defined, but found ${JSON.stringify(e[t])}`);const s=e[t],o=this.kernelSize.concat([s,this.depthMultiplier]),r=[];for(let a=0;a<this.rank;++a)r.push(1);r.push(s*this.depthMultiplier,this.filters);const i=!0;this.depthwiseKernel=this.addWeight("depthwise_kernel",o,"float32",this.depthwiseInitializer,this.depthwiseRegularizer,i,this.depthwiseConstraint),this.pointwiseKernel=this.addWeight("pointwise_kernel",r,"float32",this.pointwiseInitializer,this.pointwiseRegularizer,i,this.pointwiseConstraint),this.useBias?this.bias=this.addWeight("bias",[this.filters],"float32",this.biasInitializer,this.biasRegularizer,i,this.biasConstraint):this.bias=null,this.inputSpec=[new ft({ndim:this.rank+2,axes:{[t]:s}})],this.built=!0}call(e,t){return B(()=>{e=ye(e);let s;if(this.rank===1)throw new Ce("1D separable convolution is not implemented yet.");return this.rank===2&&(this.dataFormat==="channelsFirst"&&(e=Re(e,[0,2,3,1])),s=dm(e,this.depthwiseKernel.read(),this.pointwiseKernel.read(),this.strides,this.padding,this.dilationRate,"NHWC")),this.useBias&&(s=Tn(s,this.bias.read(),this.dataFormat)),this.activation!=null&&(s=this.activation.apply(s)),this.dataFormat==="channelsFirst"&&(s=Re(s,[0,3,1,2])),s})}getConfig(){const e=super.getConfig();return delete e.rank,delete e.kernelInitializer,delete e.kernelRegularizer,delete e.kernelConstraint,e.depthwiseInitializer=Je(this.depthwiseInitializer),e.pointwiseInitializer=Je(this.pointwiseInitializer),e.depthwiseRegularizer=Ue(this.depthwiseRegularizer),e.pointwiseRegularizer=Ue(this.pointwiseRegularizer),e.depthwiseConstraint=mt(this.depthwiseConstraint),e.pointwiseConstraint=mt(this.pointwiseConstraint),e}}Zx.className="SeparableConv";class Jx extends Zx{constructor(e){super(2,e)}}Jx.className="SeparableConv2D",ee(Jx);class nc extends Xo{constructor(e){super(1,e),nc.verifyArgs(e),this.inputSpec=[{ndim:3}]}getConfig(){const e=super.getConfig();return delete e.rank,delete e.dataFormat,e}static verifyArgs(e){if(typeof e.kernelSize!="number"&&!od(e.kernelSize,"number",1,1))throw new O(`Conv1D expects config.kernelSize to be number or number[] with length 1, but received ${JSON.stringify(e.kernelSize)}.`)}}nc.className="Conv1D",ee(nc);class Qx extends Se{constructor(e){super(e),typeof e.cropping=="number"?this.cropping=[[e.cropping,e.cropping],[e.cropping,e.cropping]]:typeof e.cropping[0]=="number"?this.cropping=[[e.cropping[0],e.cropping[0]],[e.cropping[1],e.cropping[1]]]:this.cropping=e.cropping,this.dataFormat=e.dataFormat===void 0?"channelsLast":e.dataFormat,this.inputSpec=[{ndim:4}]}computeOutputShape(e){return this.dataFormat==="channelsFirst"?[e[0],e[1],e[2]-this.cropping[0][0]-this.cropping[0][1],e[3]-this.cropping[1][0]-this.cropping[1][1]]:[e[0],e[1]-this.cropping[0][0]-this.cropping[0][1],e[2]-this.cropping[1][0]-this.cropping[1][1],e[3]]}call(e,t){return B(()=>{if(e=ye(e),this.dataFormat==="channelsLast"){const s=zl(e,this.cropping[0][0],e.shape[1]-this.cropping[0][0]-this.cropping[0][1],2);return zl(s,this.cropping[1][0],e.shape[2]-this.cropping[1][1]-this.cropping[1][0],3)}else{const s=zl(e,this.cropping[0][0],e.shape[2]-this.cropping[0][0]-this.cropping[0][1],3);return zl(s,this.cropping[1][0],e.shape[3]-this.cropping[1][1]-this.cropping[1][0],4)}})}getConfig(){const e={cropping:this.cropping,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}}Qx.className="Cropping2D",ee(Qx);class eb extends Se{constructor(e){super(e),this.DEFAULT_SIZE=[2,2],this.inputSpec=[{ndim:4}],this.size=e.size==null?this.DEFAULT_SIZE:e.size,this.dataFormat=e.dataFormat==null?"channelsLast":e.dataFormat,rt(this.dataFormat),this.interpolation=e.interpolation==null?"nearest":e.interpolation,mT(this.interpolation)}computeOutputShape(e){if(this.dataFormat==="channelsFirst"){const t=e[2]==null?null:this.size[0]*e[2],s=e[3]==null?null:this.size[1]*e[3];return[e[0],e[1],t,s]}else{const t=e[1]==null?null:this.size[0]*e[1],s=e[2]==null?null:this.size[1]*e[2];return[e[0],t,s,e[3]]}}call(e,t){return B(()=>{let s=ye(e);const o=s.shape;if(this.dataFormat==="channelsFirst"){s=Re(s,[0,2,3,1]);const r=this.size[0]*o[2],i=this.size[1]*o[3],a=this.interpolation==="nearest"?rs.resizeNearestNeighbor(s,[r,i]):rs.resizeBilinear(s,[r,i]);return Re(a,[0,3,1,2])}else{const r=this.size[0]*o[1],i=this.size[1]*o[2];return this.interpolation==="nearest"?rs.resizeNearestNeighbor(s,[r,i]):rs.resizeBilinear(s,[r,i])}})}getConfig(){const e={size:this.size,dataFormat:this.dataFormat,interpolation:this.interpolation},t=super.getConfig();return Object.assign(e,t),e}}eb.className="UpSampling2D",ee(eb);function WE(n,e,t=[1,1],s="valid",o,r){return B(()=>{o==null&&(o=Nn()),rt(o);let i=Dd(n,o);if(n.rank!==4)throw new O(`Input for depthwiseConv2d is required to be 4-D, but is instead ${n.rank}-D`);if(e.rank!==4)throw new O(`depthwiseKernel is required to be 4-D, but is instead ${e.rank}-D`);return i=oh(i,e,t,s==="same"?"same":"valid","NHWC",r),o==="channelsFirst"&&(i=Re(i,[0,3,1,2])),i})}class tb extends tc{constructor(e){super(2,e),this.depthwiseKernel=null,this.depthMultiplier=e.depthMultiplier==null?1:e.depthMultiplier,this.depthwiseInitializer=Xe(e.depthwiseInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.depthwiseConstraint=gt(e.depthwiseConstraint),this.depthwiseRegularizer=Ye(e.depthwiseRegularizer)}build(e){if(e=De(e),e.length<4)throw new O(`Inputs to DepthwiseConv2D should have rank 4. Received input shape: ${JSON.stringify(e)}.`);const t=this.dataFormat==="channelsFirst"?1:3;if(e[t]==null||e[t]<0)throw new O(`The channel dimension of the inputs to DepthwiseConv2D should be defined, but is not (${e[t]}).`);const s=e[t],o=[this.kernelSize[0],this.kernelSize[1],s,this.depthMultiplier];this.depthwiseKernel=this.addWeight("depthwise_kernel",o,null,this.depthwiseInitializer,this.depthwiseRegularizer,!0,this.depthwiseConstraint),this.useBias?this.bias=this.addWeight("bias",[s*this.depthMultiplier],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(e,t){return B(()=>{e=ye(e);let s=WE(e,this.depthwiseKernel.read(),this.strides,this.padding,this.dataFormat,null);return this.useBias&&(s=Tn(s,this.bias.read(),this.dataFormat)),this.activation!=null&&(s=this.activation.apply(s)),s})}computeOutputShape(e){e=De(e);const t=this.dataFormat==="channelsFirst"?e[2]:e[1],s=this.dataFormat==="channelsFirst"?e[3]:e[2],o=this.dataFormat==="channelsFirst"?e[1]*this.depthMultiplier:e[3]*this.depthMultiplier,r=An(t,this.kernelSize[0],this.padding,this.strides[0]),i=An(s,this.kernelSize[1],this.padding,this.strides[1]);return this.dataFormat==="channelsFirst"?[e[0],o,r,i]:[e[0],r,i,o]}getConfig(){const e=super.getConfig();return e.depthMultiplier=this.depthMultiplier,e.depthwiseInitializer=Je(this.depthwiseInitializer),e.depthwiseRegularizer=Ue(this.depthwiseRegularizer),e.depthwiseConstraint=mt(this.depthwiseRegularizer),e}}tb.className="DepthwiseConv2D",ee(tb);function nb(n,e,t,s){if(Array.isArray(n)){if(e!=null||t!=null)throw new O("When inputs is an array, neither initialState or constants should be provided");s!=null&&(t=n.slice(n.length-s,n.length),n=n.slice(0,n.length-s)),n.length>1&&(e=n.slice(1,n.length)),n=n[0]}function o(r){return r==null||Array.isArray(r)?r:[r]}return e=o(e),t=o(t),{inputs:n,initialState:e,constants:t}}function sb(n,e,t,s=!1,o,r,i=!1,a=!1){return B(()=>{const l=e.shape.length;if(l<3)throw new O(`Input should be at least 3D, but is ${l}D.`);const c=[1,0].concat(Sn(2,l));e=Re(e,c),i&&console.warn("Backend rnn(): the unroll = true option is not applicable to the imperative deeplearn.js backend."),o!=null&&(o=re(re(o,"bool"),"float32"),o.rank===l-1&&(o=Ht(o,-1)),o=Re(o,c)),s&&(e=so(e,0),o!=null&&(o=so(o,0)));const u=[];let h,d=t;const p=e.shape[0],f=Cs(e);let m;o!=null&&(m=Cs(o));for(let x=0;x<p;++x){const b=f[x],w=B(()=>n(b,d));if(o==null)h=w[0],d=w[1];else{const y=B(()=>{const C=m[x],$=be(hn(C),C),v=te(L(w[0],C),L(d[0],$)),k=d.map((N,T)=>te(L(w[1][T],C),L(N,$)));return{output:v,newStates:k}});h=y.output,d=y.newStates}a&&u.push(h)}let g;return a&&(g=Bn(u,1)),[h,g,d]})}class Es extends Se{constructor(e){super(e);let t;if(e.cell==null)throw new O("cell property is missing for the constructor of RNN.");if(Array.isArray(e.cell)?t=new Od({cells:e.cell}):t=e.cell,t.stateSize==null)throw new O("The RNN cell should have an attribute `stateSize` (tuple of integers, one integer per RNN state).");this.cell=t,this.returnSequences=e.returnSequences==null?!1:e.returnSequences,this.returnState=e.returnState==null?!1:e.returnState,this.goBackwards=e.goBackwards==null?!1:e.goBackwards,this._stateful=e.stateful==null?!1:e.stateful,this.unroll=e.unroll==null?!1:e.unroll,this.supportsMasking=!0,this.inputSpec=[new ft({ndim:3})],this.stateSpec=null,this.states_=null,this.numConstants=null,this.keptStates=[]}getStates(){if(this.states_==null){const e=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;return Sn(0,e).map(t=>null)}else return this.states_}setStates(e){this.states_=e}computeOutputShape(e){xd(e)&&(e=e[0]),e=e;let t=this.cell.stateSize;Array.isArray(t)||(t=[t]);const s=t[0];let o;if(this.returnSequences?o=[e[0],e[1],s]:o=[e[0],s],this.returnState){const r=[];for(const i of t)r.push([e[0],i]);return[o].concat(r)}else return o}computeMask(e,t){return B(()=>{Array.isArray(t)&&(t=t[0]);const s=this.returnSequences?t:null;if(this.returnState){const o=this.states.map(r=>null);return[s].concat(o)}else return s})}get states(){if(this.states_==null){const e=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1,t=[];for(let s=0;s<e;++s)t.push(null);return t}else return this.states_}set states(e){this.states_=e}build(e){if(this.numConstants!=null)throw new Ce("Constants support is not implemented in RNN yet.");xd(e)&&(e=e[0]),e=e;const t=this.stateful?e[0]:null,s=e.slice(2);this.inputSpec[0]=new ft({shape:[t,null,...s]});const o=[e[0]].concat(e.slice(2));this.cell.build(o);let r;if(Array.isArray(this.cell.stateSize)?r=this.cell.stateSize:r=[this.cell.stateSize],this.stateSpec!=null){if(!_e(this.stateSpec.map(i=>i.shape[i.shape.length-1]),r))throw new O(`An initialState was passed that is not compatible with cell.stateSize. Received stateSpec=${this.stateSpec}; However cell.stateSize is ${this.cell.stateSize}`)}else this.stateSpec=r.map(i=>new ft({shape:[null,i]}));this.stateful&&this.resetStates()}resetStates(e,t=!1){B(()=>{if(!this.stateful)throw new Wn("Cannot call resetStates() on an RNN Layer that is not stateful.");const s=this.inputSpec[0].shape[0];if(s==null)throw new O("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(this.states_==null)Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(o=>ot([s,o])):this.states_=[ot([s,this.cell.stateSize])];else if(e==null)xe(this.states_),this.keptStates!=null&&(xe(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(o=>ot([s,o])):this.states_[0]=ot([s,this.cell.stateSize]);else{if(Array.isArray(e)||(e=[e]),e.length!==this.states_.length)throw new O(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${e.length} state value(s). Input received: ${e}`);t===!0?this.keptStates.push(this.states_.slice()):xe(this.states_);for(let o=0;o<this.states_.length;++o){const r=e[o],i=Array.isArray(this.cell.stateSize)?this.cell.stateSize[o]:this.cell.stateSize,a=[s,i];if(!_e(r.shape,a))throw new O(`State ${o} is incompatible with layer ${this.name}: expected shape=${a}, received shape=${r.shape}`);this.states_[o]=r}}this.states_=this.states_.map(o=>On(o.clone()))})}apply(e,t){let s=t==null?null:t.initialState,o=t==null?null:t.constants;t==null&&(t={});const r=nb(e,s,o,this.numConstants);e=r.inputs,s=r.initialState,o=r.constants;let i=[],a=[];if(s!=null){t.initialState=s,i=i.concat(s),this.stateSpec=[];for(const c of s)this.stateSpec.push(new ft({shape:c.shape}));a=a.concat(this.stateSpec)}if(o!=null&&(t.constants=o,i=i.concat(o),this.numConstants=o.length),i[0]instanceof qn){const c=[e].concat(i),u=this.inputSpec.concat(a),h=this.inputSpec;this.inputSpec=u;const d=super.apply(c,t);return this.inputSpec=h,d}else return super.apply(e,t)}call(e,t){return B(()=>{const s=t==null?null:t.mask,o=t==null?null:t.training;let r=t==null?null:t.initialState;e=ye(e),r==null&&(this.stateful?r=this.states_:r=this.getInitialState(e));const i=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;if(r.length!==i)throw new O(`RNN Layer has ${i} state(s) but was passed ${r.length} initial state(s).`);this.unroll&&console.warn("Ignoring unroll = true for RNN layer, due to imperative backend.");const a={training:o},c=sb((f,m)=>{const g=this.cell.call([f].concat(m),a);return[g[0],g.slice(1)]},e,r,this.goBackwards,s,null,this.unroll,this.returnSequences),u=c[0],h=c[1],d=c[2];this.stateful&&this.resetStates(d,o);const p=this.returnSequences?h:u;return this.returnState?[p].concat(d):p})}getInitialState(e){return B(()=>{let t=ot(e.shape);return t=me(t,[1,2]),t=Si(t),Array.isArray(this.cell.stateSize)?this.cell.stateSize.map(s=>s>1?ld(t,[1,s]):t):this.cell.stateSize>1?[ld(t,[1,this.cell.stateSize])]:[t]})}get trainableWeights(){return this.trainable?this.cell.trainableWeights:[]}get nonTrainableWeights(){return this.trainable?this.cell.nonTrainableWeights:this.cell.weights}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.cell!=null&&this.cell.setFastWeightInitDuringBuild(e)}getConfig(){const e=super.getConfig(),t={returnSequences:this.returnSequences,returnState:this.returnState,goBackwards:this.goBackwards,stateful:this.stateful,unroll:this.unroll};this.numConstants!=null&&(t.numConstants=this.numConstants);const s=this.cell.getConfig();return this.getClassName()===Es.className&&(t.cell={className:this.cell.getClassName(),config:s}),Object.assign(Object.assign(Object.assign({},s),e),t)}static fromConfig(e,t,s={}){const o=t.cell,r=Kn(o,s);return new e(Object.assign(t,{cell:r}))}}Es.className="RNN",ee(Es);class sc extends Se{}class Fd extends sc{constructor(e){super(e),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",this.units=e.units,wt(this.units,"units"),this.activation=Ts(e.activation==null?this.DEFAULT_ACTIVATION:e.activation),this.useBias=e.useBias==null?!0:e.useBias,this.kernelInitializer=Xe(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=Xe(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=Xe(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=Ye(e.kernelRegularizer),this.recurrentRegularizer=Ye(e.recurrentRegularizer),this.biasRegularizer=Ye(e.biasRegularizer),this.kernelConstraint=gt(e.kernelConstraint),this.recurrentConstraint=gt(e.recurrentConstraint),this.biasConstraint=gt(e.biasConstraint),this.dropout=qo([1,ks([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=qo([1,ks([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){e=De(e),this.kernel=this.addWeight("kernel",[e[e.length-1],this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight("bias",[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(e,t){return B(()=>{if(e=e,e.length!==2)throw new O(`SimpleRNNCell expects 2 input Tensors, got ${e.length}.`);let s=e[1];e=e[0];const o=t.training==null?!1:t.training;0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=Rs({ones:()=>hn(e),rate:this.dropout,training:o,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=Rs({ones:()=>hn(s),rate:this.recurrentDropout,training:o,dropoutFunc:this.dropoutFunc}));let r;const i=this.dropoutMask,a=this.recurrentDropoutMask;i!=null?r=Hn(L(e,i),this.kernel.read()):r=Hn(e,this.kernel.read()),this.bias!=null&&(r=Tn(r,this.bias.read())),a!=null&&(s=L(s,a));let l=te(r,Hn(s,this.recurrentKernel.read()));return this.activation!=null&&(l=this.activation.apply(l)),[l,l]})}getConfig(){const e=super.getConfig(),t={units:this.units,activation:Ns(this.activation),useBias:this.useBias,kernelInitializer:Je(this.kernelInitializer),recurrentInitializer:Je(this.recurrentInitializer),biasInitializer:Je(this.biasInitializer),kernelRegularizer:Ue(this.kernelRegularizer),recurrentRegularizer:Ue(this.recurrentRegularizer),biasRegularizer:Ue(this.biasRegularizer),activityRegularizer:Ue(this.activityRegularizer),kernelConstraint:mt(this.kernelConstraint),recurrentConstraint:mt(this.recurrentConstraint),biasConstraint:mt(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout};return Object.assign(Object.assign({},e),t)}}Fd.className="SimpleRNNCell",ee(Fd);class ob extends Es{constructor(e){e.cell=new Fd(e),super(e)}call(e,t){return B(()=>{this.cell.dropoutMask!=null&&(xe(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(xe(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);const s=t==null?null:t.mask,o=t==null?null:t.training,r=t==null?null:t.initialState;return super.call(e,{mask:s,training:o,initialState:r})})}static fromConfig(e,t){return new e(t)}}ob.className="SimpleRNN",ee(ob);class _d extends sc{constructor(e){if(super(e),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_RECURRENT_ACTIVATION="hardSigmoid",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",e.resetAfter)throw new O("GRUCell does not support reset_after parameter set to true.");this.units=e.units,wt(this.units,"units"),this.activation=Ts(e.activation===void 0?this.DEFAULT_ACTIVATION:e.activation),this.recurrentActivation=Ts(e.recurrentActivation===void 0?this.DEFAULT_RECURRENT_ACTIVATION:e.recurrentActivation),this.useBias=e.useBias==null?!0:e.useBias,this.kernelInitializer=Xe(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=Xe(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=Xe(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=Ye(e.kernelRegularizer),this.recurrentRegularizer=Ye(e.recurrentRegularizer),this.biasRegularizer=Ye(e.biasRegularizer),this.kernelConstraint=gt(e.kernelConstraint),this.recurrentConstraint=gt(e.recurrentConstraint),this.biasConstraint=gt(e.biasConstraint),this.dropout=qo([1,ks([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=qo([1,ks([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.implementation=e.implementation,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){e=De(e);const t=e[e.length-1];this.kernel=this.addWeight("kernel",[t,this.units*3],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,this.units*3],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight("bias",[this.units*3],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(e,t){return B(()=>{if(e=e,e.length!==2)throw new O(`GRUCell expects 2 input Tensors (inputs, h, c), got ${e.length}.`);const s=t.training==null?!1:t.training;let o=e[1];e=e[0],0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=Rs({ones:()=>hn(e),rate:this.dropout,training:s,count:3,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=Rs({ones:()=>hn(o),rate:this.recurrentDropout,training:s,count:3,dropoutFunc:this.dropoutFunc}));const r=this.dropoutMask,i=this.recurrentDropoutMask;let a,l,c;0<this.dropout&&this.dropout<1&&(e=L(e,r[0]));let u=Hn(e,this.kernel.read());this.useBias&&(u=Tn(u,this.bias.read())),0<this.recurrentDropout&&this.recurrentDropout<1&&(o=L(o,i[0]));const h=this.recurrentKernel.read(),[d,p]=on(h,[2*this.units,this.units],h.rank-1),f=Hn(o,d),[m,g,x]=on(u,3,u.rank-1),[b,w]=on(f,2,f.rank-1);a=this.recurrentActivation.apply(te(m,b)),l=this.recurrentActivation.apply(te(g,w));const y=Hn(L(l,o),p);c=this.activation.apply(te(x,y));const C=te(L(a,o),L(te(1,st(a)),c));return[C,C]})}getConfig(){const e=super.getConfig(),t={units:this.units,activation:Ns(this.activation),recurrentActivation:Ns(this.recurrentActivation),useBias:this.useBias,kernelInitializer:Je(this.kernelInitializer),recurrentInitializer:Je(this.recurrentInitializer),biasInitializer:Je(this.biasInitializer),kernelRegularizer:Ue(this.kernelRegularizer),recurrentRegularizer:Ue(this.recurrentRegularizer),biasRegularizer:Ue(this.biasRegularizer),activityRegularizer:Ue(this.activityRegularizer),kernelConstraint:mt(this.kernelConstraint),recurrentConstraint:mt(this.recurrentConstraint),biasConstraint:mt(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation,resetAfter:!1};return Object.assign(Object.assign({},e),t)}}_d.className="GRUCell",ee(_d);class rb extends Es{constructor(e){e.implementation===0&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),e.cell=new _d(e),super(e)}call(e,t){return B(()=>{this.cell.dropoutMask!=null&&(xe(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(xe(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);const s=t==null?null:t.mask,o=t==null?null:t.training,r=t==null?null:t.initialState;return super.call(e,{mask:s,training:o,initialState:r})})}static fromConfig(e,t){return t.implmentation===0&&(t.implementation=1),new e(t)}}rb.className="GRU",ee(rb);class oc extends sc{constructor(e){super(e),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_RECURRENT_ACTIVATION="hardSigmoid",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",this.units=e.units,wt(this.units,"units"),this.activation=Ts(e.activation===void 0?this.DEFAULT_ACTIVATION:e.activation),this.recurrentActivation=Ts(e.recurrentActivation===void 0?this.DEFAULT_RECURRENT_ACTIVATION:e.recurrentActivation),this.useBias=e.useBias==null?!0:e.useBias,this.kernelInitializer=Xe(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=Xe(e.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=Xe(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.unitForgetBias=e.unitForgetBias,this.kernelRegularizer=Ye(e.kernelRegularizer),this.recurrentRegularizer=Ye(e.recurrentRegularizer),this.biasRegularizer=Ye(e.biasRegularizer),this.kernelConstraint=gt(e.kernelConstraint),this.recurrentConstraint=gt(e.recurrentConstraint),this.biasConstraint=gt(e.biasConstraint),this.dropout=qo([1,ks([0,e.dropout==null?0:e.dropout])]),this.recurrentDropout=qo([1,ks([0,e.recurrentDropout==null?0:e.recurrentDropout])]),this.dropoutFunc=e.dropoutFunc,this.implementation=e.implementation,this.stateSize=[this.units,this.units],this.dropoutMask=null,this.recurrentDropoutMask=null}build(e){var t;e=De(e);const s=e[e.length-1];this.kernel=this.addWeight("kernel",[s,this.units*4],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,this.units*4],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint);let o;if(this.useBias){if(this.unitForgetBias){const r=this.biasInitializer,i=this.units;o=new(t=class extends mn{apply(l,c){const u=r.apply([i]),h=new ud().apply([i]),d=r.apply([i*2]);return Dg(Dg(u,h),d)}},t.className="CustomInit",t)}else o=this.biasInitializer;this.bias=this.addWeight("bias",[this.units*4],null,o,this.biasRegularizer,!0,this.biasConstraint)}else this.bias=null;this.built=!0}call(e,t){return B(()=>{const s=t.training==null?!1:t.training;if(e=e,e.length!==3)throw new O(`LSTMCell expects 3 input Tensors (inputs, h, c), got ${e.length}.`);let o=e[1];const r=e[2];e=e[0],0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=Rs({ones:()=>hn(e),rate:this.dropout,training:s,count:4,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=Rs({ones:()=>hn(o),rate:this.recurrentDropout,training:s,count:4,dropoutFunc:this.dropoutFunc}));const i=this.dropoutMask,a=this.recurrentDropoutMask;let l,c,u,h;0<this.dropout&&this.dropout<1&&(e=L(e,i[0]));let d=Hn(e,this.kernel.read());0<this.recurrentDropout&&this.recurrentDropout<1&&(o=L(o,a[0])),d=te(d,Hn(o,this.recurrentKernel.read())),this.useBias&&(d=Tn(d,this.bias.read()));const[p,f,m,g]=on(d,4,d.rank-1);l=this.recurrentActivation.apply(p),c=this.recurrentActivation.apply(f),u=te(L(c,r),L(l,this.activation.apply(m))),h=this.recurrentActivation.apply(g);const x=L(h,this.activation.apply(u));return[x,x,u]})}getConfig(){const e=super.getConfig(),t={units:this.units,activation:Ns(this.activation),recurrentActivation:Ns(this.recurrentActivation),useBias:this.useBias,kernelInitializer:Je(this.kernelInitializer),recurrentInitializer:Je(this.recurrentInitializer),biasInitializer:Je(this.biasInitializer),unitForgetBias:this.unitForgetBias,kernelRegularizer:Ue(this.kernelRegularizer),recurrentRegularizer:Ue(this.recurrentRegularizer),biasRegularizer:Ue(this.biasRegularizer),activityRegularizer:Ue(this.activityRegularizer),kernelConstraint:mt(this.kernelConstraint),recurrentConstraint:mt(this.recurrentConstraint),biasConstraint:mt(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation};return Object.assign(Object.assign({},e),t)}}oc.className="LSTMCell",ee(oc);class ib extends Es{constructor(e){e.implementation===0&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),e.cell=new oc(e),super(e)}call(e,t){return B(()=>{this.cell.dropoutMask!=null&&(xe(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(xe(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);const s=t==null?null:t.mask,o=t==null?null:t.training,r=t==null?null:t.initialState;return super.call(e,{mask:s,training:o,initialState:r})})}static fromConfig(e,t){return t.implmentation===0&&(t.implementation=1),new e(t)}}ib.className="LSTM",ee(ib);class Od extends sc{constructor(e){super(e),this.cells=e.cells}get stateSize(){const e=[];for(const t of this.cells.slice().reverse())Array.isArray(t.stateSize)?e.push(...t.stateSize):e.push(t.stateSize);return e}call(e,t){return B(()=>{e=e;let s=e.slice(1);const o=[];for(const a of this.cells.slice().reverse())Array.isArray(a.stateSize)?o.push(s.splice(0,a.stateSize.length)):o.push(s.splice(0,1));o.reverse();const r=[];let i;for(let a=0;a<this.cells.length;++a){const l=this.cells[a];s=o[a],a===0?i=[e[0]].concat(s):i=[i[0]].concat(s),i=l.call(i,t),r.push(i.slice(1))}s=[];for(const a of r.slice().reverse())s.push(...a);return[i[0]].concat(s)})}build(e){xd(e)&&(e=e[0]),e=e;let t;this.cells.forEach((s,o)=>{uo(`RNNCell_${o}`,()=>{s.build(e),Array.isArray(s.stateSize)?t=s.stateSize[0]:t=s.stateSize,e=[e[0],t]})}),this.built=!0}getConfig(){const e=super.getConfig(),t=r=>({className:r.getClassName(),config:r.getConfig()}),o={cells:this.cells.map(t)};return Object.assign(Object.assign({},e),o)}static fromConfig(e,t,s={}){const o=[];for(const r of t.cells)o.push(Kn(r,s));return new e({cells:o})}get trainableWeights(){if(!this.trainable)return[];const e=[];for(const t of this.cells)e.push(...t.trainableWeights);return e}get nonTrainableWeights(){const e=[];for(const t of this.cells)e.push(...t.nonTrainableWeights);if(!this.trainable){const t=[];for(const s of this.cells)t.push(...s.trainableWeights);return t.concat(e)}return e}getWeights(){const e=[];for(const t of this.cells)e.push(...t.weights);return bd(e)}setWeights(e){const t=[];for(const s of this.cells){const o=s.weights.length,r=e.splice(o);for(let i=0;i<s.weights.length;++i)t.push([s.weights[i],r[i]])}yd(t)}}Od.className="StackedRNNCells",ee(Od);function Rs(n){const{ones:e,rate:t,training:s=!1,count:o=1,dropoutFunc:r}=n,i=()=>r!=null?r(e(),t):_g(e(),t),a=()=>Ti(i,e,s);return!o||o<=1?On(a().clone()):Array(o).fill(void 0).map(a).map(c=>On(c.clone()))}var UE=function(n,e){var t={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&e.indexOf(s)<0&&(t[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,s=Object.getOwnPropertySymbols(n);o<s.length;o++)e.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(n,s[o])&&(t[s[o]]=n[s[o]]);return t};class ab extends Es{constructor(e){if(e.unroll)throw new Ce("Unrolling is not possible with convolutional RNNs.");if(Array.isArray(e.cell))throw new Ce("It is not possible at the moment to stack convolutional cells.");super(e),this.inputSpec=[new ft({ndim:5})]}call(e,t){return B(()=>{if(this.cell.dropoutMask!=null&&(xe(this.cell.dropoutMask),this.cell.dropoutMask=null),this.cell.recurrentDropoutMask!=null&&(xe(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null),t&&t.constants)throw new O("ConvRNN2D cell does not support constants");const s=t==null?null:t.mask,o=t==null?null:t.training,r=t==null?null:t.initialState;return super.call(e,{mask:s,training:o,initialState:r})})}computeOutputShape(e){let t=this.computeSingleOutputShape(e);return this.returnSequences||(t=[t[0],...t.slice(2)]),this.returnState&&(t=[t,...Array(2).fill([e[0],...t.slice(-3)])]),t}getInitialState(e){return B(()=>{const{stateSize:t}=this.cell,s=e.shape,o=this.computeSingleOutputShape(s),r=[o[0],...o.slice(2)],i=ot(r);return Array.isArray(t)?Array(t.length).fill(i):[i]})}resetStates(e,t=!1){B(()=>{if(!this.stateful)throw new Wn("Cannot call resetStates() on an RNN Layer that is not stateful.");const s=this.inputSpec[0].shape,o=this.computeSingleOutputShape(s),r=[o[0],...o.slice(2)];if(s[0]==null)throw new O("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(this.getStates()==null)Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(()=>ot(r)):this.states_=[ot(r)];else if(e==null)xe(this.states_),this.keptStates!=null&&(xe(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(()=>ot(r)):this.states_[0]=ot(r);else{if(Array.isArray(e)||(e=[e]),e.length!==this.states_.length)throw new O(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${e.length} state value(s). Input received: ${e}`);t?this.keptStates.push(this.states_.slice()):xe(this.states_);for(let a=0;a<this.states_.length;++a){const l=e[a],c=r;if(!_e(l.shape,c))throw new O(`State ${a} is incompatible with layer ${this.name}: expected shape=${c}, received shape=${l.shape}`);this.states_[a]=l}}this.states_=this.states_.map(a=>On(a.clone()))})}computeSingleOutputShape(e){const{dataFormat:t,filters:s,kernelSize:o,padding:r,strides:i,dilationRate:a}=this.cell,l=t==="channelsFirst",c=e[l?3:2],u=e[l?4:3],h=An(c,o[0],r,i[0],a[0]),d=An(u,o[1],r,i[1],a[1]);return[...e.slice(0,2),...l?[s,h,d]:[h,d,s]]}}ab.className="ConvRNN2D";class Ld extends oc{constructor(e){const{filters:t,kernelSize:s,strides:o,padding:r,dataFormat:i,dilationRate:a}=e;super(Object.assign(Object.assign({},e),{units:t})),this.filters=t,wt(this.filters,"filters"),this.kernelSize=jo(s,2,"kernelSize"),this.kernelSize.forEach(l=>wt(l,"kernelSize")),this.strides=jo(o||1,2,"strides"),this.strides.forEach(l=>wt(l,"strides")),this.padding=r||"valid",rn(this.padding),this.dataFormat=i||"channelsLast",rt(this.dataFormat),this.dilationRate=jo(a||1,2,"dilationRate"),this.dilationRate.forEach(l=>wt(l,"dilationRate"))}build(e){var t;e=De(e);const s=this.dataFormat==="channelsFirst"?1:e.length-1;if(e[s]==null)throw new O(`The channel dimension of the input should be defined. Found ${e[s]}`);const o=e[s],r=4,i=this.kernelSize.concat([o,this.filters*r]);this.kernel=this.addWeight("kernel",i,null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint);const a=this.kernelSize.concat([this.filters,this.filters*r]);if(this.recurrentKernel=this.addWeight("recurrent_kernel",a,null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias){let l;if(this.unitForgetBias){const c=this.biasInitializer,u=this.filters;l=new(t=class extends mn{apply(d,p){const f=c.apply([u]),m=os([u]),g=c.apply([u*2]);return ad([f,m,g])}},t.className="CustomInit",t)}else l=this.biasInitializer;this.bias=this.addWeight("bias",[this.filters*r],null,l,this.biasRegularizer,!0,this.biasConstraint)}this.built=!0}call(e,t){return B(()=>{if(e.length!==3)throw new O(`ConvLSTM2DCell expects 3 input Tensors (inputs, h, c), got ${e.length}.`);const s=t.training||!1,o=e[0],r=e[1],i=e[2],a=4;0<this.dropout&&this.dropout<1&&this.dropoutMask==null&&(this.dropoutMask=Rs({ones:()=>hn(o),rate:this.dropout,training:s,count:a,dropoutFunc:this.dropoutFunc}));const l=this.dropoutMask,c=(G,Z,J)=>!Z||!Z[J]?G:L(Z[J],G);let u=c(o,l,0),h=c(o,l,1),d=c(o,l,2),p=c(o,l,3);0<this.recurrentDropout&&this.recurrentDropout<1&&this.recurrentDropoutMask==null&&(this.recurrentDropoutMask=Rs({ones:()=>hn(r),rate:this.recurrentDropout,training:s,count:a,dropoutFunc:this.dropoutFunc}));const f=this.recurrentDropoutMask;let m=c(r,f,0),g=c(r,f,1),x=c(r,f,2),b=c(r,f,3);const w=3,[y,C,$,v]=on(this.kernel.read(),a,w),[k,N,T,I]=this.useBias?on(this.bias.read(),a):[null,null,null,null];u=this.inputConv(u,y,k,this.padding),h=this.inputConv(h,C,N,this.padding),d=this.inputConv(d,$,T,this.padding),p=this.inputConv(p,v,I,this.padding);const[E,R,D,F]=on(this.recurrentKernel.read(),a,w);m=this.recurrentConv(m,E),g=this.recurrentConv(g,R),x=this.recurrentConv(x,D),b=this.recurrentConv(b,F);const _=this.recurrentActivation.apply(te(u,m)),P=this.recurrentActivation.apply(te(h,g)),z=te(L(P,i),L(_,this.activation.apply(te(d,x)))),H=L(this.recurrentActivation.apply(te(p,b)),this.activation.apply(z));return[H,H,z]})}getConfig(){const e=super.getConfig(),{units:t}=e,s=UE(e,["units"]),o={filters:this.filters,kernelSize:this.kernelSize,padding:this.padding,dataFormat:this.dataFormat,dilationRate:this.dilationRate,strides:this.strides};return Object.assign(Object.assign({},s),o)}inputConv(e,t,s,o){const r=Qs(e,t,this.strides,o||"valid",this.dataFormat==="channelsFirst"?"NCHW":"NHWC",this.dilationRate);return s?Tn(r,s,this.dataFormat):r}recurrentConv(e,t){return Qs(e,t,1,"same",this.dataFormat==="channelsFirst"?"NCHW":"NHWC")}}Ld.className="ConvLSTM2DCell",ee(Ld);class lb extends ab{constructor(e){const t=new Ld(e);super(Object.assign(Object.assign({},e),{cell:t}))}static fromConfig(e,t){return new e(t)}}lb.className="ConvLSTM2D",ee(lb);class Md extends Se{constructor(e){super(e),this.rate=Math.max(Math.min(e.rate,1),0),this.noiseShape=e.noiseShape,this.seed=e.seed,this.supportsMasking=!0}getNoiseShape(e){if(this.noiseShape==null)return this.noiseShape;const t=e.shape,s=[];for(let o=0;o<this.noiseShape.length;++o)s.push(this.noiseShape[o]==null?t[o]:this.noiseShape[o]);return s}call(e,t){return B(()=>{this.invokeCallHook(e,t);const s=ye(e);if(0<this.rate&&this.rate<1){const o=t.training==null?!1:t.training,r=this.getNoiseShape(s);return Ti(()=>_g(s,this.rate,r,this.seed),()=>s,o)}return e})}getConfig(){const e={rate:this.rate,noiseShape:this.noiseShape,seed:this.seed},t=super.getConfig();return Object.assign(e,t),e}dispose(){return super.dispose()}}Md.className="Dropout",ee(Md);class cb extends Md{constructor(e){super(e),this.inputSpec=[{ndim:3}]}getNoiseShape(e){const t=e.shape;return[t[0],1,t[2]]}}cb.className="SpatialDropout1D",ee(cb);class ub extends Se{constructor(e){if(super(e),this.activation=null,this.useBias=!0,this.kernel=null,this.bias=null,this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_BIAS_INITIALIZER="zeros",e.batchInputShape==null&&e.inputShape==null&&e.inputDim!=null){let t=null;e.batchSize!=null&&(t=e.batchSize),this.batchInputShape=[t,e.inputDim]}this.units=e.units,wt(this.units,"units"),this.activation=Ts(e.activation),e.useBias!=null&&(this.useBias=e.useBias),this.kernelInitializer=Xe(e.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.biasInitializer=Xe(e.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelConstraint=gt(e.kernelConstraint),this.biasConstraint=gt(e.biasConstraint),this.kernelRegularizer=Ye(e.kernelRegularizer),this.biasRegularizer=Ye(e.biasRegularizer),this.activityRegularizer=Ye(e.activityRegularizer),this.supportsMasking=!0,this.inputSpec=[{minNDim:2}]}build(e){e=De(e);const t=e[e.length-1];this.kernel==null&&(this.kernel=this.addWeight("kernel",[t,this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.useBias&&(this.bias=this.addWeight("bias",[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint))),this.inputSpec=[{minNDim:2,axes:{[-1]:t}}],this.built=!0}computeOutputShape(e){e=De(e);const t=e.slice();return t[t.length-1]=this.units,t}call(e,t){return B(()=>{this.invokeCallHook(e,t);const s=ye(e),o=kg(this.activation.getClassName());let r;return o!=null?r=Hn(s,this.kernel.read(),o,this.bias?this.bias.read():null):(r=Hn(s,this.kernel.read()),this.bias!=null&&(r=Tn(r,this.bias.read())),this.activation!=null&&(r=this.activation.apply(r))),r})}getConfig(){const e={units:this.units,activation:Ns(this.activation),useBias:this.useBias,kernelInitializer:Je(this.kernelInitializer),biasInitializer:Je(this.biasInitializer),kernelRegularizer:Ue(this.kernelRegularizer),biasRegularizer:Ue(this.biasRegularizer),activityRegularizer:Ue(this.activityRegularizer),kernelConstraint:mt(this.kernelConstraint),biasConstraint:mt(this.biasConstraint)},t=super.getConfig();return Object.assign(e,t),e}}ub.className="Dense",ee(ub);class hb extends Se{constructor(e){e=e||{},super(e),this.inputSpec=[{minNDim:3}],this.dataFormat=e.dataFormat}computeOutputShape(e){e=De(e);for(const t of e.slice(1))if(t==null)throw new O(`The shape of the input to "Flatten" is not fully defined (got ${e.slice(1)}). Make sure to pass a complete "input_shape" or "batch_input_shape" argument to the first layer in your model.`);return[e[0],vs(e,1)]}call(e,t){return B(()=>{this.invokeCallHook(e,t);let s=ye(e);if(this.dataFormat==="channelsFirst"&&s.rank>1){const o=[0];for(let r=2;r<s.rank;++r)o.push(r);o.push(1),s=Re(s,o)}return CT(s)})}getConfig(){const e={};this.dataFormat!=null&&(e.dataFormat=this.dataFormat);const t=super.getConfig();return Object.assign(e,t),e}}hb.className="Flatten",ee(hb);class db extends Se{constructor(e){super(e),this.supportsMasking=!0,this.activation=Ts(e.activation)}call(e,t){return B(()=>{this.invokeCallHook(e,t);const s=ye(e);return this.activation.apply(s)})}getConfig(){const e={activation:Ns(this.activation)},t=super.getConfig();return Object.assign(e,t),e}}db.className="Activation",ee(db);class pb extends Se{constructor(e){super(e),this.n=e.n,this.inputSpec=[{ndim:2}]}computeOutputShape(e){return[e[0],this.n,e[1]]}call(e,t){return B(()=>(e=ye(e),yT(e,this.n)))}getConfig(){const e={n:this.n},t=super.getConfig();return Object.assign(e,t),e}}pb.className="RepeatVector",ee(pb);class fb extends Se{constructor(e){super(e),this.targetShape=e.targetShape;for(let t=0;t<this.targetShape.length;++t)this.isUnknown(this.targetShape[t])&&(this.targetShape[t]=null)}isUnknown(e){return e<0||e==null}fixUnknownDimension(e,t){const s="Total size of new array must be unchanged.",o=t.slice();let r=1,i=null;for(let l=0;l<o.length;++l){const c=o[l];if(this.isUnknown(c))if(i===null)i=l;else throw new O("Can only specifiy one unknown dimension.");else r*=c}const a=vs(e);if(i!==null){if(r===0||a%r!==0)throw new O(s);o[i]=a/r}else if(a!==r)throw new O(s);return o}computeOutputShape(e){let t=!1;for(let s=0;s<e.length;++s)if(this.isUnknown(e[s])){t=!0;break}return t?e.slice(0,1).concat(this.targetShape):e.slice(0,1).concat(this.fixUnknownDimension(e.slice(1),this.targetShape))}call(e,t){return B(()=>{this.invokeCallHook(e,t);const s=ye(e),o=s.shape,r=o.slice(0,1).concat(this.fixUnknownDimension(o.slice(1),this.targetShape));return V(s,r)})}getConfig(){const e={targetShape:this.targetShape},t=super.getConfig();return Object.assign(e,t),e}}fb.className="Reshape",ee(fb);class mb extends Se{constructor(e){if(super(e),e.dims==null)throw new Error("Required configuration field `dims` is missing during Permute constructor call.");if(!Array.isArray(e.dims))throw new Error(`Permute constructor requires \`dims\` to be an Array, but received ${e.dims} instead.`);const t=Sn(1,e.dims.length+1);if(!_e(e.dims.slice().sort(),t))throw new Error("Invalid permutation `dims`: "+JSON.stringify(e.dims)+" `dims` must contain consecutive integers starting from 1.");this.dims=e.dims,this.dimsIncludingBatch=[0].concat(this.dims),this.inputSpec=[new ft({ndim:this.dims.length+1})]}computeOutputShape(e){e=De(e);const t=e.slice();return this.dims.forEach((s,o)=>{t[o+1]=e[s]}),t}call(e,t){return Re(ye(e),this.dimsIncludingBatch)}getConfig(){const e={dims:this.dims},t=super.getConfig();return Object.assign(e,t),e}}mb.className="Permute",ee(mb);class gb extends Se{constructor(e){super(e==null?{}:e),this.supportsMasking=!0,e!=null?this.maskValue=e.maskValue==null?0:e.maskValue:this.maskValue=0}computeOutputShape(e){return e}getConfig(){const e=super.getConfig(),t={maskValue:this.maskValue};return Object.assign(t,e),t}computeMask(e,t){const s=ye(e);return Yu(Il(s,this.maskValue),-1)}call(e,t){return B(()=>{this.invokeCallHook(e,t);const s=ye(e),i=Yu(Il(s,this.maskValue),-1,!0);return L(s,re(i,s.dtype))})}}gb.className="Masking",ee(gb);class xb extends Se{constructor(e){if(super(e),this.embeddings=null,this.DEFAULT_EMBEDDINGS_INITIALIZER="randomUniform",e.batchInputShape==null&&e.inputShape==null){let t=null;e.batchSize!=null&&(t=e.batchSize),e.inputLength==null?this.batchInputShape=[t,null]:this.batchInputShape=[t].concat(Pe(e.inputLength))}this.inputDim=e.inputDim,wt(this.inputDim,"inputDim"),this.outputDim=e.outputDim,wt(this.outputDim,"outputDim"),this.embeddingsInitializer=Xe(e.embeddingsInitializer||this.DEFAULT_EMBEDDINGS_INITIALIZER),this.embeddingsRegularizer=Ye(e.embeddingsRegularizer),this.activityRegularizer=Ye(e.activityRegularizer),this.embeddingsConstraint=gt(e.embeddingsConstraint),this.maskZero=e.maskZero,this.supportsMasking=e.maskZero,this.inputLength=e.inputLength}build(e){this.embeddings=this.addWeight("embeddings",[this.inputDim,this.outputDim],this.dtype,this.embeddingsInitializer,this.embeddingsRegularizer,!0,this.embeddingsConstraint),this.built=!0}warnOnIncompatibleInputShape(e){}computeMask(e,t){return B(()=>this.maskZero?(e=ye(e),Il(e,Ee(e))):null)}computeOutputShape(e){if(e=De(e),this.inputLength==null)return[...e,this.outputDim];const t=Pe(this.inputLength);if(t.length!==e.length-1)throw new O(`"inputLength" is ${this.inputLength}, but received input shape has shape ${e}`);{let s=0;for(let o=0;o<t.length;++o){const r=t[o],i=e[o+1];if(r!=null&&i!=null&&r!==i)throw new O(`"inputLength" is ${this.inputLength}, but received input shape has shape ${e}`);r==null&&(t[s]=i),s++}}return[e[0],...t,this.outputDim]}call(e,t){return B(()=>{this.invokeCallHook(e,t);let s=ye(e);s.dtype!=="int32"&&(s=Gn(s,"int32"));const o=Fg(this.embeddings.read(),V(s,[s.size]));return V(o,De(this.computeOutputShape(s.shape)))})}getConfig(){const e={inputDim:this.inputDim,outputDim:this.outputDim,embeddingsInitializer:Je(this.embeddingsInitializer),embeddingsRegularizer:Ue(this.embeddingsRegularizer),activityRegularizer:Ue(this.activityRegularizer),embeddingsConstraint:mt(this.embeddingsConstraint),maskZero:this.maskZero,inputLength:this.inputLength},t=super.getConfig();return Object.assign(e,t),e}}xb.className="Embedding",ee(xb);class fo extends Se{constructor(e){super(e||{}),this.supportsMasking=!0}mergeFunction(e){throw new Ce}computeElementwiseOpOutputShape(e,t){if(e==null||t==null)return null;if(e.length<t.length)return this.computeElementwiseOpOutputShape(t,e);if(t.length===0)return e;const s=e.slice(0,e.length-t.length);for(let o=0;o<t.length;++o){const r=e[e.length-t.length+o],i=t[o];if(r==null||i==null||r<0||i<0)s.push(null);else if(r===1)s.push(i);else if(i===1)s.push(r);else{if(r!==i)throw new O("Operands could not be broadcast together with shapes "+JSON.stringify(e)+" "+JSON.stringify(t));s.push(r)}}return s}build(e){if(Array.isArray(e)&&!Array.isArray(e[0])&&(e=[De(e)]),e=e,e.length<2)throw new O(`A merge layer should be called on an Array of at least 2 inputs. Got ${e.length} input(s).`);let t=[];for(const r of e)r!=null&&r[0]!==null&&t.push(r[0]);if(t=$s(t),t.length>1)throw new O(`Can not merge tensors with different batch sizes. Got tensors with shapes: ${JSON.stringify(e)}.`);let s=e[0]==null?null:e[0].slice(1);for(let r=1;r<e.length;++r){const i=e[r]==null?null:e[r].slice(1);s=this.computeElementwiseOpOutputShape(s,i)}const o=e.map(r=>r.length);e.indexOf(null)===-1&&$s(o).length===1?this.reshapeRequired=!1:this.reshapeRequired=!0}call(e,t){return B(()=>{if(e=e,this.reshapeRequired){const s=[],o=e.map(r=>r.rank);if(o.indexOf(null)===-1){const r=ks(o);for(let i of e){const a=i.rank;for(let l=0;l<r-a;++l)i=Si(i,1);s.push(i)}return this.mergeFunction(s)}else{let r=!1;for(const l of e){const c=l.rank;if(c==null){const u=l.shape,h=u[0],d=u.slice(1).concat([h]);let p=V(l,[h].concat(vs(u.slice(1))));p=Re(p,[1,0]),p=V(p,d),s.push(p),r=!0}else if(c>1){const u=Sn(1,c).concat([0]);s.push(Re(l,u)),r=!0}else s.push(l)}let i=this.mergeFunction(s);const a=i.rank;if(r){if(a==null){const l=i.shape,c=l.length,u=l[c-1],h=[u].concat(l.slice(0,l.length-1));i=V(Re(V(i,[-1,u]),[1,0]),h)}else if(a>1){const l=[a-1].concat(Sn(0,a-1));i=Re(i,l)}}return i}}else return this.mergeFunction(e)})}computeOutputShape(e){e=e;let t;e[0]==null?t=null:t=e[0].slice(1);for(let o=1;o<e.length;++o){const r=e[o]==null?null:e[o].slice(1);t=this.computeElementwiseOpOutputShape(t,r)}let s=[];for(const o of e)o!=null&&o[0]!==null&&s.push(o[0]);return s=$s(s),s.length===1?t=s.concat(t):t=[null].concat(t),t}computeMask(e,t){return B(()=>{if(t==null)return null;if(!Array.isArray(t))throw new O("`mask` should be an Array");if(!Array.isArray(e))throw new O("`inputs` should be an Array");if(t.length!==e.length)throw new O(`The Array 'inputs' and 'mask' are expected to have the same length, but have different lengths (${e.length} vs ${t.length})`);if(t.every(o=>o==null))return null;t=t.map(o=>o==null?o:Ht(o,0));let s=t[0];for(let o=1;o<t.length-1;++o)s=ss(s,t[o]);return s})}}class bb extends fo{constructor(e){super(e)}mergeFunction(e){return B(()=>{let t=e[0].clone();for(let s=1;s<e.length;++s)t=te(t,e[s]);return t})}}bb.className="Add",ee(bb);class yb extends fo{constructor(e){super(e)}mergeFunction(e){return B(()=>{let t=e[0].clone();for(let s=1;s<e.length;++s)t=L(t,e[s]);return t})}}yb.className="Multiply",ee(yb);class wb extends fo{constructor(e){super(e)}mergeFunction(e){return B(()=>{let t=e[0].clone();for(let s=1;s<e.length;++s)t=te(t,e[s]);return L(1/e.length,t)})}}wb.className="Average",ee(wb);class Cb extends fo{constructor(e){super(e)}mergeFunction(e){return B(()=>{let t=e[0];for(let s=1;s<e.length;++s)t=ws(t,e[s]);return t})}}Cb.className="Maximum",ee(Cb);class Ib extends fo{constructor(e){super(e)}mergeFunction(e){return B(()=>{let t=e[0];for(let s=1;s<e.length;++s)t=xi(t,e[s]);return t})}}Ib.className="Minimum",ee(Ib);class $b extends fo{constructor(e){super(e),this.DEFAULT_AXIS=-1,e==null&&(e={}),this.axis=e.axis==null?this.DEFAULT_AXIS:e.axis,this.supportsMasking=!0,this.reshapeRequired=!1}build(e){if(!(Array.isArray(e)&&Array.isArray(e[0]))||e.length===1)throw new O("A `Concatenate` layer should be called on a list of at least 2 inputs");e=e;let t=!0;for(const o of e)if(o!=null){t=!1;break}if(t)return;const s=[];for(let o=0;o<e.length;++o){const r=e[o].slice();r.splice(this.axis,1);let i=!1;for(const a of s)if(_e(a,r)){i=!0;break}i||s.push(r)}if(s.length>1)throw new O("A `Concatenate` layer requires inputs with matching shapes except for the concat axis. Got input shapes: "+JSON.stringify(e))}mergeFunction(e){return B(()=>ad(e,this.axis))}computeOutputShape(e){if(!(Array.isArray(e)&&Array.isArray(e[0])))throw new O("A `Concatenate` layer should be called on a list of inputs.");const t=e,s=t[0].slice(),o=this.axis<0?s.length+this.axis:this.axis;for(const r of t.slice(1)){if(s[o]==null||r[o]==null){s[o]=null;break}s[o]+=r[o]}return s}computeMask(e,t){if(t==null)return null;if(!Array.isArray(t))throw new O("`mask` should be an array for Concatenate");if(!Array.isArray(e))throw new O("`inputs` should be an array for Concatenate");if(t.length!==e.length)throw new O(`Mismatch in the length of mask (${t.length}) and the legnth of inputs (${e.length})`);return B(()=>{let s=!0;if(t.forEach(i=>{if(i!=null){s=!1;return}}),s)return null;const o=[];for(let i=0;i<e.length;++i)t[i]==null?o.push(re(hn(e[i]),"bool")):t[i].rank<e[i].rank?o.push(Ht(t[i],-1)):o.push(t[i]);const r=vt(o,this.axis);return Mf(r,-1,!1)})}getConfig(){const e={axis:this.axis},t=super.getConfig();return Object.assign(e,t),e}}$b.className="Concatenate",ee($b);function Pi(n,e){for(;n<0;)n+=e;return n}function GE(n,e,t){if(n.shape.length>3||e.shape.length>3)throw new Ce("batchDot is not implemented for tensors of 4D or higher rank yet");if(S(n.shape.length>=2,()=>`batchDot requires the rank of x to be >= 2, but got ${n.shape.length}`),S(n.shape.length>=2,()=>`batchDot requires the rank of y to be >= 2, but got ${e.shape.length}`),typeof t=="number"&&(t=[t,t]),n.dtype==="complex64"||e.dtype==="complex64")throw new Ce("batchDot is not implemented for complex64-type Tensors yet.");const s=n.shape.length,o=e.shape.length;t==null&&(t=[s-1,o-2]);const r=t;return B(()=>{let i;if(s>o){i=s-o;const l=[];for(let c=0;c<i;++c)l.push(1);e=V(e,e.shape.concat(l))}else if(o>s){i=o-s;const l=[];for(let c=0;c<i;++c)l.push(1);n=V(n,n.shape.concat(l))}else i=0;let a;if(n.shape.length===2&&e.shape.length===2)r[0]===r[1]?a=me(L(n,e),r[0]):a=me(L(Re(n,[1,0]),e),r[1]);else{const l=r[0]!==n.shape.length-1,c=r[1]===e.shape.length-1;a=Fe(n,e,l,c)}if(i>0){let l;s>o?l=s+o-3:l=s-1;const c=[];for(let u=l;u<l+i;++u)c.push(u);a=oo(a,c)}return a.shape.length===1&&(a=Ht(a,1)),a})}class vb extends fo{constructor(e){super(e),this.axes=e.axes,this.normalize=e.normalize==null?!1:e.normalize,this.supportsMasking=!0,this.reshapeRequired=!1}build(e){S(Array.isArray(e)&&e.length===2&&Array.isArray(e[0])&&Array.isArray(e[1]),()=>"A `Dot` layer should be called on a list of exactly 2 inputs.");const t=e[0],s=e[1];if(t.length>3||s.length>3)throw new Ce("Dot layer does not support tensors of 4D or higher rank yet.");const o=this.interpretAxes(t,s);if(t[o[0]]!==s[o[1]])throw new O(`Dimension incompatibility: ${t[o[0]]} !== ${s[o[1]]}`)}mergeFunction(e){if(e.length!==2)throw new O(`A \`Dot\` layer must be called on exactly 2 inputs, but received ${e.length} input(s).`);let t=e[0],s=e[1],o;return Array.isArray(this.axes)?o=this.axes.map((r,i)=>Pi(r,e[i].shape.length)):o=[Pi(this.axes,t.shape.length),Pi(this.axes,s.shape.length)],this.normalize&&(t=ql(t,o[0]),s=ql(s,o[1])),GE(t,s,o)}interpretAxes(e,t){let s;return Array.isArray(this.axes)?s=this.axes:s=[Pi(this.axes,e.length),Pi(this.axes,t.length)],s}computeOutputShape(e){S(Array.isArray(e)&&e.length===2&&Array.isArray(e[0])&&Array.isArray(e[1]),()=>"A `Dot` layer should be called on a list of exactly 2 inputs.");const t=e[0].slice(),s=e[1].slice();if(t.length>3||s.length>3)throw new Ce("Dot layer does not support tensors of 4D or higher rank yet.");const o=this.interpretAxes(t,s);t.splice(o[0],1),s.splice(o[1],1),s.splice(0,1);const r=t.concat(s);return r.length===1&&r.push(1),r}computeMask(e,t){return null}getConfig(){const e={axes:this.axes,normalize:this.normalize},t=super.getConfig();return Object.assign(e,t),e}}vb.className="Dot",ee(vb);class kb extends Se{constructor(e){super(e),this.supportsMasking=!0,this.stddev=e.stddev}computeOutputShape(e){return e}getConfig(){const e=super.getConfig(),t={stddev:this.stddev};return Object.assign(t,e),t}call(e,t){return B(()=>{this.invokeCallHook(e,t);const s=ye(e);return Ti(()=>te(Bl(s.shape,0,this.stddev),s),()=>s,t.training||!1)})}}kb.className="GaussianNoise",ee(kb);class Sb extends Se{constructor(e){super(e),this.supportsMasking=!0,this.rate=e.rate}computeOutputShape(e){return e}getConfig(){const e=super.getConfig(),t={rate:this.rate};return Object.assign(t,e),t}call(e,t){return B(()=>{this.invokeCallHook(e,t);const s=ye(e);return this.rate>0&&this.rate<1?Ti(()=>{const r=Math.sqrt(this.rate/(1-this.rate));return L(s,Bl(s.shape,1,r))},()=>s,t.training||!1):s})}}Sb.className="GaussianDropout",ee(Sb);class Nb extends Se{constructor(e){super(e),this.supportsMasking=!0,this.rate=e.rate,this.noiseShape=e.noiseShape}_getNoiseShape(e){return this.noiseShape||ye(e).shape}computeOutputShape(e){return e}getConfig(){const e=super.getConfig(),t={rate:this.rate};return Object.assign(t,e),t}call(e,t){return B(()=>{if(this.rate<1&&this.rate>0){const s=this._getNoiseShape(e);return Ti(()=>{const r=ye(e),a=-1.6732632423543772*1.0507009873554805;let l=to(bi(s),this.rate);l=Gn(l,"float32");const c=yp((1-this.rate)*(1+this.rate*yp(a,2)),-.5),u=-c*a*this.rate,h=te(L(r,l),L(te(l,-1),a));return te(L(h,c),u)},()=>ye(e),t.training||!1)}return e})}}Nb.className="AlphaDropout",ee(Nb);function zi(n,e,t,s,o,r=.001){let i;if(n.rank===2)i=fI(n,e,t,s,o,r);else if(n.rank===3)i=gI(n,e,t,s,o,r);else if(n.rank===4)i=bI(n,e,t,s,o,r);else throw new Ce(`batchNormalization is not implemented for array of rank ${n.rank} yet`);return i}function HE(n,e,t,s,o=.001){return B(()=>{const r=Cl(n,s),i=r.mean,a=r.variance;return[zi(n,i,a,t,e,o),i,a]})}function qE(n,e,t,s,o=.001){return B(()=>{const r=Cl(n,s),i=r.mean,a=r.variance,l=[];for(const f of Sn(0,n.rank))s.indexOf(f)!==-1?l.push(1):l.push(n.shape[f]);const c=V(i,l),u=V(a,l),h=e==null?null:V(e,l),d=t==null?null:V(t,l);return[zi(n,c,u,d,h,o),i,a]})}function KE(n,e,t,s,o=.001){return _e(s.slice().sort(),Sn(0,n.rank-1))?HE(n,e,t,s,o):qE(n,e,t,s,o)}class Tb extends Se{constructor(e){e==null&&(e={}),super(e),this.supportsMasking=!0,this.axis=e.axis==null?-1:e.axis,this.momentum=e.momentum==null?.99:e.momentum,this.epsilon=e.epsilon==null?.001:e.epsilon,this.center=e.center==null?!0:e.center,this.scale=e.scale==null?!0:e.scale,this.betaInitializer=Xe(e.betaInitializer||"zeros"),this.gammaInitializer=Xe(e.gammaInitializer||"ones"),this.movingMeanInitializer=Xe(e.movingMeanInitializer||"zeros"),this.movingVarianceInitializer=Xe(e.movingVarianceInitializer||"ones"),this.betaConstraint=gt(e.betaConstraint),this.gammaConstraint=gt(e.gammaConstraint),this.betaRegularizer=Ye(e.betaRegularizer),this.gammaRegularizer=Ye(e.gammaRegularizer)}build(e){e=De(e);const t=this.axis>=0?this.axis:this.axis+e.length,s=e[t];if(s==null)throw new O(`Axis ${t} of input tensor should have a defined dimension but the layer received an input with shape ${JSON.stringify(e)}.`);this.inputSpec=[new ft({ndim:e.length,axes:{[t]:s}})];const o=[s];this.scale&&(this.gamma=this.addWeight("gamma",o,null,this.gammaInitializer,this.gammaRegularizer,!0,this.gammaConstraint)),this.center&&(this.beta=this.addWeight("beta",o,null,this.betaInitializer,this.betaRegularizer,!0,this.betaConstraint)),this.movingMean=this.addWeight("moving_mean",o,null,this.movingMeanInitializer,null,!1),this.movingVariance=this.addWeight("moving_variance",o,null,this.movingVarianceInitializer,null,!1),this.built=!0}call(e,t){return B(()=>{const s=t.training==null?!1:t.training,o=ye(e),r=o.shape,i=r.length,a=Sn(0,i),l=this.axis>=0?this.axis:this.axis+i;a.splice(l,1);const c=ao(1,i);c[l]=r[l];const u=a.slice();u.sort();const h=!_e(u,Sn(0,i).slice(0,i-1)),d=()=>{if(h){const b=V(this.movingMean.read(),c),w=V(this.movingVariance.read(),c),y=this.center?V(this.beta.read(),c):null,C=this.scale?V(this.gamma.read(),c):null;return zi(o,b,w,y,C,this.epsilon)}else return zi(o,this.movingMean.read(),this.movingVariance.read(),this.beta==null?null:this.beta.read(),this.gamma==null?null:this.gamma.read(),this.epsilon)};if(!s)return d();const[p,f,m]=KE(o,this.gamma.read(),this.beta.read(),a,this.epsilon),g=(b,w,y)=>{B(()=>{const C=1-y,$=b.read(),v=L(be($,w),C);b.write(be($,v))})};return g(this.movingMean,f,this.momentum),g(this.movingVariance,m,this.momentum),p})}getConfig(){const e={axis:this.axis,momentum:this.momentum,epsilon:this.epsilon,center:this.center,scale:this.scale,betaInitializer:Je(this.betaInitializer),gammaInitializer:Je(this.gammaInitializer),movingMeanInitializer:Je(this.movingMeanInitializer),movingVarianceInitializer:Je(this.movingVarianceInitializer),betaRegularizer:Ue(this.betaRegularizer),gammaRegularizer:Ue(this.gammaRegularizer),betaConstraint:mt(this.betaConstraint),gammaConstraint:mt(this.gammaConstraint)},t=super.getConfig();return Object.assign(e,t),e}}Tb.className="BatchNormalization",ee(Tb);class Eb extends Se{constructor(e){if(e==null&&(e={}),super(e),this.axis=e.axis==null?-1:e.axis,typeof this.axis=="number"){if(!Number.isInteger(this.axis))throw new Error(`Expected axis to be an integer, but received ${this.axis}`)}else if(Array.isArray(this.axis)){for(const t of this.axis)if(!Number.isInteger(t))throw new Error(`Expected axis to be an array of integers, but received ${JSON.stringify(this.axis)}`)}else throw new Error(`Expected axis to be an integer or an array of integers, but received ${JSON.stringify(this.axis)}`);this.epsilon=e.epsilon==null?.001:e.epsilon,this.center=e.center==null?!0:e.center,this.scale=e.scale==null?!0:e.scale,this.betaInitializer=Xe(e.betaInitializer||"zeros"),this.gammaInitializer=Xe(e.gammaInitializer||"ones"),this.betaRegularizer=Ye(e.betaRegularizer),this.gammaRegularizer=Ye(e.gammaRegularizer),this.supportsMasking=!0}build(e){e=De(e);const t=e.length;typeof this.axis=="number"&&(this.axis=[this.axis]);for(let r=0;r<this.axis.length;++r)this.axis[r]<0&&(this.axis[r]+=t);for(const r of this.axis)if(r<0||r>=t)throw new Error(`Invalid axis: ${r}`);if(this.axis.length!==$s(this.axis).length)throw new Error(`Found duplicate axes in: ${this.axis}`);const s=this.axis.map(r=>e[r]),o=!0;this.scale?this.gamma=this.addWeight("gamma",s,"float32",this.gammaInitializer,this.gammaRegularizer,o):this.gamma=null,this.center?this.beta=this.addWeight("beta",s,"float32",this.betaInitializer,this.betaRegularizer,o):this.beta=null,this.built=!0}call(e,t){const s=ye(e),o=s.shape,r=o.length;return B(()=>{let{mean:a,variance:l}=Cl(s,this.axis,!0);const c=ao(1,r);for(const m of this.axis)c[m]=o[m];const u=m=>m!=null&&m.shape.length!==r?V(m,c):m;let h=this.scale?u(this.gamma.read()):null,d=this.center?u(this.beta.read()):null;const p=[],f=[];for(let m=0;m<r;++m)this.axis.indexOf(m)!==-1?(p.push(o[m]),f.push(1)):(p.push(1),f.push(o[m]));return a=vn(a,p),l=vn(l,p),h!=null&&(h=vn(h,f)),d!=null&&(d=vn(d,f)),zi(s,a,l,d,h,this.epsilon)})}getConfig(){const e={axis:this.axis,epsilon:this.epsilon,center:this.center,scale:this.scale,betaInitializer:Je(this.betaInitializer),gammaInitializer:Je(this.gammaInitializer),betaRegularizer:Ue(this.betaRegularizer),gammaRegularizer:Ue(this.gammaRegularizer)},t=super.getConfig();return Object.assign(e,t),e}}Eb.className="LayerNormalization",ee(Eb);function jE(n,e,t){return B(()=>{if(n.rank!==4)throw new O(`temporalPadding expects input tensor to be 4-D, but received a ${n.rank}-D tensor.`);if(e==null&&(e=[[1,1],[1,1]]),e.length!==2||e[0].length!==2||e[1].length!==2)throw new O("spatial2dPadding expects `padding` to be an Array of two Arrays, each of which is an Array of two integers.");if(t==null&&(t=Nn()),t!=="channelsLast"&&t!=="channelsFirst")throw new O(`Unknown data format: ${t}. Supported data formats are 'channelsLast' and 'channelsFirst.`);let s;return t==="channelsFirst"?s=[[0,0],[0,0],e[0],e[1]]:s=[[0,0],e[0],e[1],[0,0]],hh(n,s)})}class Rb extends Se{constructor(e){if(e==null&&(e={}),super(e),this.dataFormat=e.dataFormat==null?Nn():e.dataFormat,e.padding==null)this.padding=[[1,1],[1,1]];else if(typeof e.padding=="number")this.padding=[[e.padding,e.padding],[e.padding,e.padding]];else{if(e.padding=e.padding,e.padding.length!==2)throw new O(`ZeroPadding2D expects padding to be a length-2 array, but received a length-${e.padding.length} array.`);let t,s;if(typeof e.padding[0]=="number")t=[e.padding[0],e.padding[0]],s=[e.padding[1],e.padding[1]];else{if(e.padding=e.padding,e.padding[0].length!==2)throw new O(`ZeroPadding2D expects height padding to be a length-2 array, but received a length-${e.padding[0].length} array.`);if(t=e.padding[0],e.padding[1].length!==2)throw new O(`ZeroPadding2D expects width padding to be a length-2 array, but received a length-${e.padding[1].length} array.`);s=e.padding[1]}this.padding=[t,s]}this.inputSpec=[new ft({ndim:4})]}computeOutputShape(e){e=De(e);let t,s;return this.dataFormat==="channelsFirst"?(e[2]!=null&&e[2]>=0?t=e[2]+this.padding[0][0]+this.padding[0][1]:t=null,e[3]!=null&&e[3]>=0?s=e[3]+this.padding[1][0]+this.padding[1][1]:s=null,[e[0],e[1],t,s]):(e[1]!=null&&e[1]>=0?t=e[1]+this.padding[0][0]+this.padding[0][1]:t=null,e[2]!=null&&e[2]>=0?s=e[2]+this.padding[1][0]+this.padding[1][1]:s=null,[e[0],t,s,e[3]])}call(e,t){return B(()=>jE(ye(e),this.padding,this.dataFormat))}getConfig(){const e={padding:this.padding,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}}Rb.className="ZeroPadding2D",ee(Rb);function rc(n,e,t,s,o,r){return B(()=>{rt(o),Ng(r),rn(s),t==null&&(t=[1,1]),s==null&&(s="valid"),o==null&&(o=Nn()),r==null&&(r="max"),n=Dd(n,o);let i;const a=s==="same"?"same":"valid";return r==="max"?i=uh(n,e,t,a):i=Qu(n,e,t,a),o==="channelsFirst"&&(i=Re(i,[0,3,1,2])),i})}function Ab(n,e,t,s,o,r){return B(()=>{rt(o),Ng(r),rn(s),t==null&&(t=[1,1,1]),s==null&&(s="valid"),o==null&&(o=Nn()),r==null&&(r="max"),n=Kx(n,o);let i;const a=s==="same"?"same":"valid";return r==="max"?i=ev(n,e,t,a):i=oI(n,e,t,a),o==="channelsFirst"&&(i=Re(i,[0,4,1,2,3])),i})}class Db extends Se{constructor(e){if(e.poolSize==null&&(e.poolSize=2),super(e),typeof e.poolSize=="number")this.poolSize=[e.poolSize];else if(Array.isArray(e.poolSize)&&e.poolSize.length===1&&typeof e.poolSize[0]=="number")this.poolSize=e.poolSize;else throw new O(`poolSize for 1D convolutional layer must be a number or an Array of a single number, but received ${JSON.stringify(e.poolSize)}`);if(wt(this.poolSize,"poolSize"),e.strides==null)this.strides=this.poolSize;else if(typeof e.strides=="number")this.strides=[e.strides];else if(Array.isArray(e.strides)&&e.strides.length===1&&typeof e.strides[0]=="number")this.strides=e.strides;else throw new O(`strides for 1D convolutional layer must be a number or an Array of a single number, but received ${JSON.stringify(e.strides)}`);wt(this.strides,"strides"),this.padding=e.padding==null?"valid":e.padding,rn(this.padding),this.inputSpec=[new ft({ndim:3})]}computeOutputShape(e){e=De(e);const t=An(e[1],this.poolSize[0],this.padding,this.strides[0]);return[e[0],t,e[2]]}call(e,t){return B(()=>{this.invokeCallHook(e,t),e=Si(ye(e),2);const s=this.poolingFunction(ye(e),[this.poolSize[0],1],[this.strides[0],1],this.padding,"channelsLast");return oo(s,[2])})}getConfig(){const e={poolSize:this.poolSize,padding:this.padding,strides:this.strides},t=super.getConfig();return Object.assign(e,t),e}}class Fb extends Db{constructor(e){super(e)}poolingFunction(e,t,s,o,r){return rt(r),rn(o),rc(e,t,s,o,r,"max")}}Fb.className="MaxPooling1D",ee(Fb);class _b extends Db{constructor(e){super(e)}poolingFunction(e,t,s,o,r){return rt(r),rn(o),rc(e,t,s,o,r,"avg")}}_b.className="AveragePooling1D",ee(_b);class Ob extends Se{constructor(e){if(e.poolSize==null&&(e.poolSize=[2,2]),super(e),this.poolSize=Array.isArray(e.poolSize)?e.poolSize:[e.poolSize,e.poolSize],e.strides==null)this.strides=this.poolSize;else if(Array.isArray(e.strides)){if(e.strides.length!==2)throw new O(`If the strides property of a 2D pooling layer is an Array, it is expected to have a length of 2, but received length ${e.strides.length}.`);this.strides=e.strides}else this.strides=[e.strides,e.strides];wt(this.poolSize,"poolSize"),wt(this.strides,"strides"),this.padding=e.padding==null?"valid":e.padding,this.dataFormat=e.dataFormat==null?"channelsLast":e.dataFormat,rt(this.dataFormat),rn(this.padding),this.inputSpec=[new ft({ndim:4})]}computeOutputShape(e){e=De(e);let t=this.dataFormat==="channelsFirst"?e[2]:e[1],s=this.dataFormat==="channelsFirst"?e[3]:e[2];return t=An(t,this.poolSize[0],this.padding,this.strides[0]),s=An(s,this.poolSize[1],this.padding,this.strides[1]),this.dataFormat==="channelsFirst"?[e[0],e[1],t,s]:[e[0],t,s,e[3]]}call(e,t){return B(()=>(this.invokeCallHook(e,t),this.poolingFunction(ye(e),this.poolSize,this.strides,this.padding,this.dataFormat)))}getConfig(){const e={poolSize:this.poolSize,padding:this.padding,strides:this.strides,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}}class Lb extends Ob{constructor(e){super(e)}poolingFunction(e,t,s,o,r){return rt(r),rn(o),rc(e,t,s,o,r,"max")}}Lb.className="MaxPooling2D",ee(Lb);class Mb extends Ob{constructor(e){super(e)}poolingFunction(e,t,s,o,r){return rt(r),rn(o),rc(e,t,s,o,r,"avg")}}Mb.className="AveragePooling2D",ee(Mb);class Pb extends Se{constructor(e){if(e.poolSize==null&&(e.poolSize=[2,2,2]),super(e),this.poolSize=Array.isArray(e.poolSize)?e.poolSize:[e.poolSize,e.poolSize,e.poolSize],e.strides==null)this.strides=this.poolSize;else if(Array.isArray(e.strides)){if(e.strides.length!==3)throw new O(`If the strides property of a 3D pooling layer is an Array, it is expected to have a length of 3, but received length ${e.strides.length}.`);this.strides=e.strides}else this.strides=[e.strides,e.strides,e.strides];wt(this.poolSize,"poolSize"),wt(this.strides,"strides"),this.padding=e.padding==null?"valid":e.padding,this.dataFormat=e.dataFormat==null?"channelsLast":e.dataFormat,rt(this.dataFormat),rn(this.padding),this.inputSpec=[new ft({ndim:5})]}computeOutputShape(e){e=De(e);let t=this.dataFormat==="channelsFirst"?e[2]:e[1],s=this.dataFormat==="channelsFirst"?e[3]:e[2],o=this.dataFormat==="channelsFirst"?e[4]:e[3];return t=An(t,this.poolSize[0],this.padding,this.strides[0]),s=An(s,this.poolSize[1],this.padding,this.strides[1]),o=An(o,this.poolSize[2],this.padding,this.strides[2]),this.dataFormat==="channelsFirst"?[e[0],e[1],t,s,o]:[e[0],t,s,o,e[4]]}call(e,t){return B(()=>(this.invokeCallHook(e,t),this.poolingFunction(ye(e),this.poolSize,this.strides,this.padding,this.dataFormat)))}getConfig(){const e={poolSize:this.poolSize,padding:this.padding,strides:this.strides,dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}}class zb extends Pb{constructor(e){super(e)}poolingFunction(e,t,s,o,r){return rt(r),rn(o),Ab(e,t,s,o,r,"max")}}zb.className="MaxPooling3D",ee(zb);class Bb extends Pb{constructor(e){super(e)}poolingFunction(e,t,s,o,r){return rt(r),rn(o),Ab(e,t,s,o,r,"avg")}}Bb.className="AveragePooling3D",ee(Bb);class Vb extends Se{constructor(e){super(e),this.inputSpec=[new ft({ndim:3})]}computeOutputShape(e){return[e[0],e[2]]}call(e,t){throw new Ce}}class Wb extends Vb{constructor(e){super(e||{})}call(e,t){return B(()=>{const s=ye(e);return lt(s,1)})}}Wb.className="GlobalAveragePooling1D",ee(Wb);class Ub extends Vb{constructor(e){super(e||{})}call(e,t){return B(()=>{const s=ye(e);return $n(s,1)})}}Ub.className="GlobalMaxPooling1D",ee(Ub);class Gb extends Se{constructor(e){super(e),this.dataFormat=e.dataFormat==null?"channelsLast":e.dataFormat,rt(this.dataFormat),this.inputSpec=[new ft({ndim:4})]}computeOutputShape(e){return e=e,this.dataFormat==="channelsLast"?[e[0],e[3]]:[e[0],e[1]]}call(e,t){throw new Ce}getConfig(){const e={dataFormat:this.dataFormat},t=super.getConfig();return Object.assign(e,t),e}}class Hb extends Gb{call(e,t){return B(()=>{const s=ye(e);return this.dataFormat==="channelsLast"?lt(s,[1,2]):lt(s,[2,3])})}}Hb.className="GlobalAveragePooling2D",ee(Hb);class qb extends Gb{call(e,t){return B(()=>{const s=ye(e);return this.dataFormat==="channelsLast"?$n(s,[1,2]):$n(s,[2,3])})}}qb.className="GlobalMaxPooling2D",ee(qb);class Kb extends Se{constructor(e){super(e),this.layer=e.layer}build(e){this.built=!0}get trainable(){return this.layer!=null?this.layer.trainable:!1}set trainable(e){this.layer!=null&&(this.layer.trainable=e)}get trainableWeights(){return this.layer.trainableWeights}get nonTrainableWeights(){return this.layer.nonTrainableWeights}get updates(){return this.layer._updates}get losses(){return this.layer.losses}getWeights(){return this.layer.getWeights()}setWeights(e){this.layer.setWeights(e)}getConfig(){const e={layer:{className:this.layer.getClassName(),config:this.layer.getConfig()}},t=super.getConfig();return Object.assign(e,t),e}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.layer!=null&&this.layer.setFastWeightInitDuringBuild(e)}static fromConfig(e,t,s={}){const o=t.layer,r=Kn(o,s);delete t.layer;const i={layer:r};return Object.assign(i,t),new e(i)}}class jb extends Kb{constructor(e){super(e),this.supportsMasking=!0}build(e){if(e=De(e),e.length<3)throw new O(`TimeDistributed layer expects an input shape >= 3D, but received input shape ${JSON.stringify(e)}`);this.inputSpec=[{shape:e}];const t=[e[0]].concat(e.slice(2));this.layer.built||(this.layer.build(t),this.layer.built=!0),super.build(e)}computeOutputShape(e){e=De(e);const t=[e[0]].concat(e.slice(2)),s=this.layer.computeOutputShape(t),o=e[1];return[s[0],o].concat(s.slice(1))}call(e,t){return B(()=>(e=ye(e),sb((i,a)=>[ye(this.layer.call(i,t)),[]],e,[],!1,null,null,!1,!0)[1]))}}jb.className="TimeDistributed",ee(jb);function XE(n){co(fT,"BidirectionalMergeMode",n)}const YE="concat";class Xb extends Kb{constructor(e){super(e);const t=e.layer.getConfig(),s={};s.className=e.layer.getClassName(),s.config=t,this.forwardLayer=Kn(s),t.goBackwards=t.goBackwards!==!0;const o={};if(o.className=e.layer.getClassName(),o.config=t,this.backwardLayer=Kn(o),this.forwardLayer.name="forward_"+this.forwardLayer.name,this.backwardLayer.name="backward_"+this.backwardLayer.name,this.mergeMode=e.mergeMode===void 0?YE:e.mergeMode,XE(this.mergeMode),e.weights)throw new Ce("weights support is not implemented for Bidirectional layer yet.");this._stateful=e.layer.stateful,this.returnSequences=e.layer.returnSequences,this.returnState=e.layer.returnState,this.supportsMasking=!0,this._trainable=!0,this.inputSpec=e.layer.inputSpec,this.numConstants=null}get trainable(){return this._trainable}set trainable(e){this._trainable=e,this.forwardLayer!=null&&(this.forwardLayer.trainable=e),this.backwardLayer!=null&&(this.backwardLayer.trainable=e)}getWeights(){return this.forwardLayer.getWeights().concat(this.backwardLayer.getWeights())}setWeights(e){const t=e.length,s=Math.floor(t/2);this.forwardLayer.setWeights(e.slice(0,s)),this.backwardLayer.setWeights(e.slice(s))}computeOutputShape(e){let t=this.forwardLayer.computeOutputShape(e);Array.isArray(t)&&Array.isArray(t[0])||(t=[t]),t=t;let s,o,r;return this.returnState&&(r=t.slice(1)),s=t[0],s=s,this.mergeMode==="concat"?(s[s.length-1]*=2,o=[s]):this.mergeMode==null?o=[s,s.slice()]:o=[s],this.returnState?this.mergeMode==null?o.concat(r).concat(r.slice()):[s].concat(r).concat(r.slice()):Kt(o)}apply(e,t){let s=t==null?null:t.initialState,o=t==null?null:t.constants;t==null&&(t={});const r=nb(e,s,o,this.numConstants);if(e=r.inputs,s=r.initialState,o=r.constants,Array.isArray(e)&&(s=e.slice(1),e=e[0]),(s==null||s.length===0)&&o==null)return super.apply(e,t);const i=[],a=[];if(s!=null){const c=s.length;if(c%2>0)throw new O("When passing `initialState` to a Bidrectional RNN, the state should be an Array containing the states of the underlying RNNs.");t.initialState=s,i.push(...s);const u=s.map(h=>new ft({shape:h.shape}));this.forwardLayer.stateSpec=u.slice(0,c/2),this.backwardLayer.stateSpec=u.slice(c/2),a.push(...u)}if(o!=null)throw new Ce("Support for constants in Bidirectional layers is not implemented yet.");const l=i[0]instanceof qn;for(const c of i)if(c instanceof qn!==l)throw new O("The initial state of a Bidirectional layer cannot be specified as a mix of symbolic and non-symbolic tensors");if(l){const c=[e].concat(i),u=this.inputSpec.concat(a),h=this.inputSpec;this.inputSpec=u;const d=super.apply(c,t);return this.inputSpec=h,d}else return super.apply(e,t)}call(e,t){return B(()=>{const s=t.initialState;let o,r;if(s==null)o=this.forwardLayer.call(e,t),r=this.backwardLayer.call(e,t);else{const l=s.slice(0,s.length/2),c=s.slice(s.length/2);o=this.forwardLayer.call(e,Object.assign(t,{initialState:l})),r=this.backwardLayer.call(e,Object.assign(t,{initialState:c}))}let i;this.returnState&&(Array.isArray(o)&&(i=o.slice(1).concat(r.slice(1))),o=o[0],r=r[0]),this.returnSequences&&(r=so(r,1));let a;return this.mergeMode==="concat"?a=ad([o,r]):this.mergeMode==="sum"?a=te(o,r):this.mergeMode==="ave"?a=L(.5,te(o,r)):this.mergeMode==="mul"?a=L(o,r):this.mergeMode==null&&(a=[o,r]),this.returnState?this.mergeMode==null?a.concat(i):[a].concat(i):a})}resetStates(e){this.forwardLayer.resetStates(),this.backwardLayer.resetStates()}build(e){uo(this.forwardLayer.name,()=>{this.forwardLayer.build(e)}),uo(this.backwardLayer.name,()=>{this.backwardLayer.build(e)}),this.built=!0}computeMask(e,t){Array.isArray(t)&&(t=t[0]);let s;if(this.returnSequences?this.mergeMode==null?s=[t,t]:s=t:this.mergeMode==null?s=[null,null]:s=null,this.returnState){const r=this.forwardLayer.states.map(i=>null);return Array.isArray(s)?s.concat(r).concat(r):[s].concat(r).concat(r)}else return s}get trainableWeights(){return this.forwardLayer.trainableWeights.concat(this.backwardLayer.trainableWeights)}get nonTrainableWeights(){return this.forwardLayer.nonTrainableWeights.concat(this.backwardLayer.nonTrainableWeights)}setFastWeightInitDuringBuild(e){super.setFastWeightInitDuringBuild(e),this.forwardLayer!=null&&this.forwardLayer.setFastWeightInitDuringBuild(e),this.backwardLayer!=null&&this.backwardLayer.setFastWeightInitDuringBuild(e)}getConfig(){const e={mergeMode:this.mergeMode},t=super.getConfig();return Object.assign(e,t),e}static fromConfig(e,t){const s=Kn(t.layer);if(delete t.layer,t.numConstants!=null)throw new Ce("Deserialization of a Bidirectional layer with numConstants present is not supported yet.");const o=t;return o.layer=s,new e(o)}}Xb.className="Bidirectional",ee(Xb);class Yb extends Se{constructor(e){super(e),this.scale=e.scale,e.offset?this.offset=e.offset:this.offset=0}getConfig(){const e={scale:this.scale,offset:this.offset},t=super.getConfig();return Object.assign(e,t),e}call(e,t){return B(()=>(e=ye(e),e.dtype!=="float32"&&(e=Gn(e,"float32")),te(L(e,this.scale),this.offset)))}}Yb.className="Rescaling",ee(Yb);const{resizeBilinear:ZE,cropAndResize:JE}=rs;class Zb extends Se{constructor(e){super(e),this.height=e.height,this.width=e.width}centerCrop(e,t,s,o,r,i,a,l){return B(()=>{let c,u=!1;const h=t/i,d=s/a,p=(o+t)/i,f=(r+s)/a,m=[h,d,p,f],g=[];e.rank===3?(u=!0,c=Bn([e])):c=e;for(let C=0;C<c.shape[0];C++)g.push(m);const x=Hs(g,[g.length,4]),b=yi(0,g.length,1,"int32"),y=JE(c,x,b,[o,r],"nearest");return Gn(u?ye(Cs(y)):y,l)})}upsize(e,t,s,o){return B(()=>{const r=ZE(e,[t,s]);return Gn(r,o)})}call(e,t){return B(()=>{const s=ye(e),o=s.dtype,r=s.shape,i=r[r.length-3],a=r[r.length-2];let l=0;i!==this.height&&(l=Math.floor((i-this.height)/2));let c=0;return a!==this.width&&(c=Math.floor((a-this.width)/2),c===0&&(c=1)),l>=0&&c>=0?this.centerCrop(s,l,c,this.height,this.width,i,a,o):this.upsize(e,this.height,this.width,o)})}getConfig(){const e={height:this.height,width:this.width},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){e=De(e);const t=e.length-3,s=e.length-2;return e[t]=this.height,e[s]=this.width,e}}Zb.className="CenterCrop",ee(Zb);function QE(n,e,t,s){let o=ye(n);if(o.dtype!=="int32"&&(o=Gn(o,"int32")),e==="int")return o;const r=o.shape;if(o.rank===0&&(o=Ht(o,-1)),e==="oneHot"&&o.shape[o.shape.length-1]!==1&&(o=Ht(o,-1)),o.rank>2)throw new O(`When outputMode is not int, maximum output rank is 2 Received outputMode ${e} and input shape ${r} which would result in output rank ${o.rank}.`);const i=["multiHot","oneHot"].includes(e),a=o;let l;if(typeof s!="undefined"&&e==="count"?l=Gf(a,s,t,i):l=Gf(a,[],t,i),e!=="tfIdf")return l;if(s)return L(l,s);throw new O("When outputMode is 'tfIdf', weights must be provided.")}class Jb extends Se{constructor(e){super(e),this.numTokens=e.numTokens,e.outputMode?this.outputMode=e.outputMode:this.outputMode="multiHot"}getConfig(){const e={numTokens:this.numTokens,outputMode:this.outputMode},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){return e=De(e),e==null?[this.numTokens]:this.outputMode==="oneHot"&&e[e.length-1]!==1?(e.push(this.numTokens),e):(e[e.length-1]=this.numTokens,e)}call(e,t){return B(()=>{e=ye(e),e.dtype!=="int32"&&(e=Gn(e,"int32"));let s;if(typeof t.countWeights!="undefined"){if(this.outputMode!=="count")throw new O(`countWeights is not used when outputMode !== count.
              Received countWeights=${t.countWeights}`);s=ye(t.countWeights)}const o=$n(e),r=xl(e),i=qt(this.numTokens,o).bufferSync().get(0),a=to(r,0).bufferSync().get(0);if(!(i&&a))throw new O(`Input values must be between 0 < values <= numTokens with numTokens=${this.numTokens}`);return QE(e,this.outputMode,this.numTokens,s)})}}Jb.className="CategoryEncoding",ee(Jb);const eR=["bilinear","nearest"],Qb=new Set(eR);class e0 extends Se{constructor(e){if(super(e),this.height=e.height,this.width=e.width,e.interpolation)if(Qb.has(e.interpolation))this.interpolation=e.interpolation;else throw new O(`Invalid interpolation parameter: ${e.interpolation} is not implemented`);else this.interpolation="bilinear";this.cropToAspectRatio=!!e.cropToAspectRatio}computeOutputShape(e){e=De(e);const t=e[2];return[this.height,this.width,t]}getConfig(){const e={height:this.height,width:this.width,interpolation:this.interpolation,cropToAspectRatio:this.cropToAspectRatio},t=super.getConfig();return Object.assign(e,t),e}call(e,t){return B(()=>{const s=[this.height,this.width];if(this.interpolation==="bilinear")return rs.resizeBilinear(e,s,!this.cropToAspectRatio);if(this.interpolation==="nearest")return rs.resizeNearestNeighbor(e,s,!this.cropToAspectRatio);throw new Error(`Interpolation is ${this.interpolation} but only ${[...Qb]} are supported`)})}}e0.className="Resizing",ee(e0);class t0{constructor(e){this.seed=e}next(){if(this.seed!==void 0)return this.seed++}}t0.className="RandomSeed";class n0 extends Se{constructor(e){super(e),this.randomGenerator=new t0(e.seed)}getConfig(){const e={seed:this.randomGenerator.seed},t=super.getConfig();return Object.assign(e,t),e}}n0.className="BaseRandomLayer";const tR=["bilinear","nearest"],s0=new Set(tR);class o0 extends n0{constructor(e){super(e);const{factor:t,interpolation:s="bilinear"}=e;if(this.factor=t,Array.isArray(this.factor)&&this.factor.length===2)this.widthLower=this.factor[0],this.widthUpper=this.factor[1];else if(!Array.isArray(this.factor)&&this.factor>0)this.widthLower=-this.factor,this.widthUpper=this.factor;else throw new O(`Invalid factor: ${this.factor}. Must be positive number or tuple of 2 numbers`);if(this.widthLower<-1||this.widthUpper<-1)throw new O(`factor must have values larger than -1. Got: ${this.factor}`);if(this.widthUpper<this.widthLower)throw new O(`factor cannot have upper bound less than lower bound.
        Got upper bound: ${this.widthUpper}.
        Got lower bound: ${this.widthLower}
      `);if(s)if(s0.has(s))this.interpolation=s;else throw new O(`Invalid interpolation parameter: ${s} is not implemented`)}getConfig(){const e={factor:this.factor,interpolation:this.interpolation},t=super.getConfig();return Object.assign(e,t),e}computeOutputShape(e){e=De(e);const t=e[2];return[this.imgHeight,-1,t]}call(e,t){return B(()=>{const s=ye(e);this.imgHeight=s.shape[s.shape.length-3];const o=s.shape[s.shape.length-2];this.widthFactor=bi([1],1+this.widthLower,1+this.widthUpper,"float32",this.randomGenerator.next());let r=this.widthFactor.dataSync()[0]*o;r=Math.round(r);const i=[this.imgHeight,r];switch(this.interpolation){case"bilinear":return rs.resizeBilinear(e,i);case"nearest":return rs.resizeNearestNeighbor(e,i);default:throw new Error(`Interpolation is ${this.interpolation}
          but only ${[...s0]} are supported`)}})}}o0.className="RandomWidth",ee(o0);U().registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,n=>{n&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});var r0;(function(n){n[n.DT_INVALID=0]="DT_INVALID",n[n.DT_FLOAT=1]="DT_FLOAT",n[n.DT_DOUBLE=2]="DT_DOUBLE",n[n.DT_INT32=3]="DT_INT32",n[n.DT_UINT8=4]="DT_UINT8",n[n.DT_INT16=5]="DT_INT16",n[n.DT_INT8=6]="DT_INT8",n[n.DT_STRING=7]="DT_STRING",n[n.DT_COMPLEX64=8]="DT_COMPLEX64",n[n.DT_INT64=9]="DT_INT64",n[n.DT_BOOL=10]="DT_BOOL",n[n.DT_QINT8=11]="DT_QINT8",n[n.DT_QUINT8=12]="DT_QUINT8",n[n.DT_QINT32=13]="DT_QINT32",n[n.DT_BFLOAT16=14]="DT_BFLOAT16",n[n.DT_QINT16=15]="DT_QINT16",n[n.DT_QUINT16=16]="DT_QUINT16",n[n.DT_UINT16=17]="DT_UINT16",n[n.DT_COMPLEX128=18]="DT_COMPLEX128",n[n.DT_HALF=19]="DT_HALF",n[n.DT_RESOURCE=20]="DT_RESOURCE",n[n.DT_VARIANT=21]="DT_VARIANT",n[n.DT_UINT32=22]="DT_UINT32",n[n.DT_UINT64=23]="DT_UINT64",n[n.DT_FLOAT_REF=101]="DT_FLOAT_REF",n[n.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",n[n.DT_INT32_REF=103]="DT_INT32_REF",n[n.DT_UINT8_REF=104]="DT_UINT8_REF",n[n.DT_INT16_REF=105]="DT_INT16_REF",n[n.DT_INT8_REF=106]="DT_INT8_REF",n[n.DT_STRING_REF=107]="DT_STRING_REF",n[n.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",n[n.DT_INT64_REF=109]="DT_INT64_REF",n[n.DT_BOOL_REF=110]="DT_BOOL_REF",n[n.DT_QINT8_REF=111]="DT_QINT8_REF",n[n.DT_QUINT8_REF=112]="DT_QUINT8_REF",n[n.DT_QINT32_REF=113]="DT_QINT32_REF",n[n.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",n[n.DT_QINT16_REF=115]="DT_QINT16_REF",n[n.DT_QUINT16_REF=116]="DT_QUINT16_REF",n[n.DT_UINT16_REF=117]="DT_UINT16_REF",n[n.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",n[n.DT_HALF_REF=119]="DT_HALF_REF",n[n.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",n[n.DT_VARIANT_REF=121]="DT_VARIANT_REF",n[n.DT_UINT32_REF=122]="DT_UINT32_REF",n[n.DT_UINT64_REF=123]="DT_UINT64_REF"})(r0||(r0={}));var i0;(function(n){(function(e){e[e.LEGACY=0]="LEGACY",e[e.V1=1]="V1",e[e.V2=2]="V2"})(n.CheckpointFormatVersion||(n.CheckpointFormatVersion={}))})(i0||(i0={}));var a0;(function(n){n[n.FAIL=0]="FAIL",n[n.SHORTEST=1]="SHORTEST",n[n.LONGEST=2]="LONGEST"})(a0||(a0={}));function ce(n,e){Array.isArray(n)||(n=[n]),n.forEach(t=>{t!=null&&S(t.dtype!=="complex64",()=>`${e} does not support complex64 tensors in the CPU backend.`)})}const nR=ym;class ic extends ko{nextDataId(){return ic.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new ta(this,Ke())}write(e,t,s){this.firstUse&&(this.firstUse=!1,U().get("IS_NODE")&&nn(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));const o={id:this.nextDataId()};return this.data.set(o,{values:e,dtype:s,refCount:1}),o}makeTensorInfo(e,t,s){let o;if(t==="string"&&s!=null&&s.length>0&&ur(s[0])){const r=s.map(i=>ms(i));o=this.write(r,e,t)}else o=this.write(s,e,t);return{dataId:o,shape:e,dtype:t}}refCount(e){return this.data.has(e)?this.data.get(e).refCount:0}incRef(e){const t=this.data.get(e);t.refCount++}decRef(e){if(this.data.has(e)){const t=this.data.get(e);t.refCount--}}move(e,t,s,o,r){this.data.set(e,{values:t,dtype:o,refCount:r})}numDataIds(){return this.data.numDataIds()}read(e){return X(this,null,function*(){return this.readSync(e)})}readSync(e){const{dtype:t,complexTensorInfos:s}=this.data.get(e);if(t==="complex64"){const o=this.readSync(s.real.dataId),r=this.readSync(s.imag.dataId);return is(o,r)}return aw(this.data.get(e).values,t)}bufferSync(e){const t=this.readSync(e.dataId);if(e.dtype==="string")try{const s=t.map(o=>gs(o));return ke(e.shape,e.dtype,s)}catch(s){throw new Error("Failed to decode encoded string bytes into utf-8")}return ke(e.shape,e.dtype,t)}makeOutput(e,t,s){return Ke().makeTensorFromTensorInfo(this.makeTensorInfo(t,s,e),this)}disposeData(e,t=!1){if(this.data.has(e)){if(this.data.get(e).refCount--,!t&&this.data.get(e).refCount>0)return!1;const{complexTensorInfos:s}=this.data.get(e);s!=null&&(this.disposeData(s.real.dataId,!0),this.disposeData(s.imag.dataId,!0)),this.data.delete(e)}return!0}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}time(e){return X(this,null,function*(){const t=Wt();return e(),{kernelMs:Wt()-t}})}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(e){ce([e],"where");const t=this.readSync(e.dataId);return nR(e.shape,t)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}}ic.nextDataId=0;function l0(n){const e=new Float32Array(n.length);for(let t=0;t<n.length;++t)e[t]=Math.abs(n[t]);return e}const sR={kernelName:sa,backendName:"cpu",kernelFunc:n=>{const{x:e}=n.inputs,t=n.backend;ce(e,"abs");let s=new Float32Array(K(e.shape));const o=t.data.get(e.dataId).values;return s=l0(o),t.makeOutput(s,e.shape,e.dtype)}};function it(n){return(e,t,s,o,r)=>{const i=we(e,t),a=i.length,l=fe(i),c=K(i),u=Et(r,c),h=e.length,d=t.length,p=fe(e),f=fe(t),m=zo(e,i),g=zo(t,i);if(m.length+g.length===0)for(let x=0;x<u.length;++x)u[x]=n(s[x%s.length],o[x%o.length]);else for(let x=0;x<u.length;++x){const b=Eo(x,a,l),w=b.slice(-h);m.forEach(v=>w[v]=0);const y=_n(w,h,p),C=b.slice(-d);g.forEach(v=>C[v]=0);const $=_n(C,d,f);u[x]=n(s[y],o[$])}return[u,i]}}function Qt(n){const{inputs:e,backend:t}=n,{real:s,imag:o}=e,r=t.data.get(s.dataId).values,i=t.data.get(o.dataId).values,a=t.makeTensorInfo(s.shape,"complex64"),l=t.data.get(a.dataId);return l.complexTensorInfos={real:t.makeTensorInfo(s.shape,"float32",r),imag:t.makeTensorInfo(o.shape,"float32",i)},a}const oR={kernelName:Jc,backendName:"cpu",kernelFunc:Qt};function ac(n,e,t="float32"){if(t==="complex64"){const o=ac(n,e,"float32"),r=ac(n,e,"float32");return Qt({inputs:{real:o,imag:r},backend:n})}const s=Rt(K(e),t);return n.makeTensorInfo(e,t,s)}function Xn(n){const{inputs:e,backend:t}=n,{x:s}=e;return t.incRef(s.dataId),{dataId:s.dataId,shape:s.shape,dtype:s.dtype}}const rR={kernelName:Ar,backendName:"cpu",kernelFunc:Xn};function mo(n){const{inputs:e,backend:t}=n,{input:s}=e,o=t.data.get(s.dataId).complexTensorInfos.real,r=t.data.get(o.dataId).values;return t.makeTensorInfo(o.shape,o.dtype,r)}const iR={kernelName:vu,backendName:"cpu",kernelFunc:mo};function c0(n,e,t,s){if(s==="int32"){const o=Int32Array.from(n);return[e,"int32",o]}if(s==="bool"){const o=Ws([0],t),[r,i]=it((a,l)=>a!==l?1:0)(e,[],n,o,"bool");return[i,"bool",r]}throw new Error(`Error in Cast: failed to cast ${t} to ${s}`)}function As(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{dtype:r}=s;if(r==="complex64"){if(o.dtype==="complex64")return Xn({inputs:{x:o},backend:t});const u=ac(t,o.shape,o.dtype),h=As({inputs:{x:o},backend:t,attrs:{dtype:"float32"}}),d=Qt({inputs:{real:h,imag:u},backend:t});return t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(h),d}if(o.dtype==="complex64"){const u=mo({inputs:{input:o},backend:t}),h=As({inputs:{x:u},backend:t,attrs:{dtype:r}});return t.disposeIntermediateTensorInfo(u),h}if(!$p(o.dtype,r)){const u=Xn({inputs:{x:o},backend:t});return{dataId:u.dataId,shape:u.shape,dtype:r}}const i=t.data.get(o.dataId).values,[a,l,c]=c0(i,o.shape,o.dtype,r);return t.makeTensorInfo(a,l,c)}const aR={kernelName:br,backendName:"cpu",kernelFunc:As};function xt(n,e,t,s){return t==null?({inputs:o,backend:r})=>{const{a:i,b:a}=o,l=r;ce([i,a],n);const c=l.data.get(i.dataId).values,u=l.data.get(a.dataId).values,h=i.dtype==="string"?as(c):c,d=i.dtype==="string"?as(u):u,p=s||i.dtype,[f,m]=e(i.shape,a.shape,h,d,p);return l.makeTensorInfo(m,p,f)}:({inputs:o,backend:r})=>{const{a:i,b:a}=o,l=r;if(i.dtype==="complex64"||a.dtype==="complex64"){const c=As({inputs:{x:i},backend:l,attrs:{dtype:"complex64"}}),u=l.data.get(c.dataId),h=u.complexTensorInfos.real,d=u.complexTensorInfos.imag,p=l.data.get(h.dataId).values,f=l.data.get(d.dataId).values,m=As({inputs:{x:a},backend:l,attrs:{dtype:"complex64"}}),g=l.data.get(m.dataId),x=g.complexTensorInfos.real,b=g.complexTensorInfos.imag,w=l.data.get(x.dataId).values,y=l.data.get(b.dataId).values,[C,$,v]=t(i.shape,a.shape,p,f,w,y),k=l.makeTensorInfo(v,"float32",C),N=l.makeTensorInfo(v,"float32",$),T=Qt({inputs:{real:k,imag:N},backend:l});return l.disposeIntermediateTensorInfo(c),l.disposeIntermediateTensorInfo(m),l.disposeIntermediateTensorInfo(k),l.disposeIntermediateTensorInfo(N),T}else{const c=l.data.get(i.dataId).values,u=l.data.get(a.dataId).values,h=s||i.dtype,[d,p]=e(i.shape,a.shape,c,u,h);return l.makeTensorInfo(p,h,d)}}}function Pd(n){return(e,t,s,o,r,i)=>{const a=we(e,t),l=K(a),c=a.length,u=fe(a),h=Et("float32",l),d=Et("float32",l),p=zo(e,a),f=zo(t,a),m=is(s,o),g=is(r,i),x=e.length,b=fe(e),w=t.length,y=fe(t);if(p.length+f.length===0)for(let C=0;C<h.length;C++){const $=C%m.length,v=C%g.length,k=n(m[$*2],m[$*2+1],g[v*2],g[v*2+1]);h[C]=k.real,d[C]=k.imag}else for(let C=0;C<h.length;C++){const $=Eo(C,c,u),v=$.slice(-x);p.forEach(E=>v[E]=0);const k=_n(v,x,b),N=$.slice(-w);f.forEach(E=>N[E]=0);const T=_n(N,w,y),I=n(m[k*2],m[k*2+1],g[T*2],g[T*2+1]);h[C]=I.real,d[C]=I.imag}return[h,d,a]}}const u0=it(((n,e)=>n+e)),lR=Pd(((n,e,t,s)=>({real:n+t,imag:e+s}))),Yo=xt(Ro,u0,lR),cR={kernelName:Ro,backendName:"cpu",kernelFunc:Yo};function zd(n,e,t,s,o){const r=K(s),i=Rt(o,t);for(let a=0;a<n.length;a++){const l=n[a];if(l<0)throw new Error("Input x must be non-negative!");l>=o||(r>0?i[l]+=e[a]:i[l]+=1)}return i}function h0(n,e,t,s=!1){const o=n.shape[0],r=n.shape[1],i=ke([o,t],e.dtype);for(let a=0;a<o;a++)for(let l=0;l<r;l++){const c=n.get(a,l);if(c<0)throw new Error("Input x must be non-negative!");c>=t||(s?i.set(1,a,c):e.size>0?i.set(i.get(a,c)+e.get(a,l),a,c):i.set(i.get(a,c)+1,a,c))}return i}const d0=it(((n,e)=>n&e)),uR=xt(Zc,d0),hR={kernelName:Zc,backendName:"cpu",kernelFunc:uR};function Yn(n){return(e,t,s)=>{const o=et(t,e.length);for(let r=0;r<e.length;++r)o[r]=n(e[r],s);return o}}function ze(n,e,t){const s=Yn(e);return Ds(n,s,t)}function Ds(n,e,t){return({inputs:s,attrs:o,backend:r})=>{const{x:i}=s;ce(i,n);const a=r,l=a.data.get(i.dataId).values;let c;if(i.dtype==="string"){if(!Array.isArray(l))throw new Error("String tensor's value was not an instance of Array");c=as(l)}else c=l;const u=t||i.dtype,h=e(c,u,o);return a.makeTensorInfo(i.shape,u,h)}}const p0=Yn(n=>Math.ceil(n)),dR=Ds(yr,p0),pR={kernelName:yr,backendName:"cpu",kernelFunc:dR};function f0(n,e,t,s){const o=et(t,K(e));if(s&&t!=="string"){let r=0;n.forEach(i=>{const a=K(i.shape);o.set(i.vals,r),r+=a})}else{let r=0;n.forEach(i=>{const a=t==="string"?as(i.vals):i.vals;let l=0;for(let c=0;c<i.shape[0];++c){const u=c*e[1]+r;for(let h=0;h<i.shape[1];++h)o[u+h]=a[l++]}r+=i.shape[1]})}return o}const m0=it((n,e)=>n===e?1:0),g0=xt(ba,m0,null,"bool"),fR={kernelName:ba,backendName:"cpu",kernelFunc:g0};const x0=Yn(n=>Math.exp(n)),b0=Ds(Sr,x0,"float32"),mR={kernelName:Sr,backendName:"cpu",kernelFunc:b0};const y0=Yn(n=>Math.expm1(n)),gR=Ds(Nr,y0),xR={kernelName:Nr,backendName:"cpu",kernelFunc:gR};const w0=Yn(n=>Math.floor(n)),bR=Ds(Tr,w0),yR={kernelName:Tr,backendName:"cpu",kernelFunc:bR};const C0=it((n,e)=>Math.floor(n/e)),wR=xt(Er,C0,null,"int32"),CR={kernelName:Er,backendName:"cpu",kernelFunc:wR};function I0(n,e,t,s,o,r,i,a,l){const c=ke([s,r],t);for(let u=0;u<s;u++){const h=[];let d=0;for(let p=0;p<o;p++){const f=n[u*o+p];d+=f*i[p],h.push(f)}if(d<0||d>=l/r)throw new Error(`Invalid indices: ${h} does not index into ${a}`);for(let p=0;p<r;p++)c.values[u*r+p]=e.get(...e.indexToLoc(d*r+p))}return c}function $0(n,e,t){const s=ke(t,n.dtype);for(let o=0;o<s.size;++o){const i=s.indexToLoc(o).slice(),a=i[0],l=i[2],c=e.locToIndex([a,l]);i[2]=e.values[c];const u=n.locToIndex(i);0<=u&&u<n.values.length&&(s.values[o]=n.values[u])}return s}const v0=it((n,e)=>n>e?1:0),IR=xt(Ia,v0,null,"bool"),$R={kernelName:Ia,backendName:"cpu",kernelFunc:IR};const k0=it((n,e)=>n>=e?1:0),vR=xt(Rr,k0,null,"bool"),kR={kernelName:Rr,backendName:"cpu",kernelFunc:vR};const S0=it((n,e)=>n<e?1:0),SR=xt(va,S0,null,"bool"),NR={kernelName:va,backendName:"cpu",kernelFunc:SR};const N0=it((n,e)=>n<=e?1:0),TR=xt(ka,N0,null,"bool"),ER={kernelName:ka,backendName:"cpu",kernelFunc:TR};function T0(n,e,t){const s=(e-n)/(t-1),o=Rt(t,"float32");o[0]=n;for(let r=1;r<o.length;r++)o[r]=o[r-1]+s;return o}const E0=Yn(n=>Math.log(n)),RR=Ds(Or,E0),AR={kernelName:Or,backendName:"cpu",kernelFunc:RR};function R0(n,e,t,s){const o=Et(s,K(t));for(let r=0;r<o.length;++r){const i=r*e;let a=n[i];for(let l=0;l<e;++l){const c=n[i+l];(Number.isNaN(c)||c>a)&&(a=c)}o[r]=a}return o}const A0=it(((n,e)=>Math.max(n,e))),DR=xt(Mr,A0),FR={kernelName:Mr,backendName:"cpu",kernelFunc:DR};const D0=it(((n,e)=>Math.min(n,e))),_R=xt(Pr,D0),OR={kernelName:Pr,backendName:"cpu",kernelFunc:_R};const Bd=it(((n,e)=>n*e)),LR=Pd(((n,e,t,s)=>({real:n*t-e*s,imag:n*s+e*t}))),lc=xt(Br,Bd,LR),MR={kernelName:Br,backendName:"cpu",kernelFunc:lc};function F0(n,e,t){const s=fs(-1,t);return Bd([],e,s,n,t)}function PR(n){const{inputs:e,backend:t}=n,{x:s}=e;ce(s,"neg");const o=t.data.get(s.dataId).values,[r,i]=F0(o,s.shape,s.dtype);return t.makeTensorInfo(i,s.dtype,r)}const zR={kernelName:La,backendName:"cpu",kernelFunc:PR};const _0=it(((n,e)=>n!==e?1:0)),BR=xt(Ma,_0,null,"bool"),VR={kernelName:Ma,backendName:"cpu",kernelFunc:BR};function Vd(n,e,t,s,o){const r=e.length,i=K(e),a=fe(e),l=fe(o),c=Et(t,K(o));for(let u=0;u<i;++u){const h=Eo(u,r,a),d=new Array(h.length);for(let f=0;f<d.length;f++)d[f]=h[s[f]];const p=_n(d,r,l);c[p]=n[u]}return c}function jt(n){const{inputs:e,attrs:t,backend:s}=n,{x:o}=e,{perm:r}=t;ce(o,"transpose");const i=o.shape.length,a=new Array(i);for(let h=0;h<a.length;h++)a[h]=o.shape[r[h]];const l=s.data.get(o.dataId).values,c=Vd(l,o.shape,o.dtype,r,a);return{dataId:s.write(c,a,o.dtype),shape:a,dtype:o.dtype}}const WR={kernelName:Ao,backendName:"cpu",kernelFunc:jt};function O0(n,e,t,s){const[o,r]=yt(n,s),i=Yt(e,"int32"),a=Rt(K(o),i),l=K(r);for(let c=0;c<a.length;++c){const u=c*l;let h=1;for(let d=0;d<l;++d)h*=t[u+d];a[c]=h}return{outVals:a,outShape:o,outDtype:i}}function UR(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s;ce(o,"prod");const a=o.shape.length,l=ve(r,o.shape),c=Ze(l,a);let u=l,h=o;const d=[];c!=null&&(h=jt({inputs:{x:o},backend:t,attrs:{perm:c}}),d.push(h),u=nt(u.length,a));const p=t.data.get(h.dataId).values,{outVals:f,outShape:m,outDtype:g}=O0(h.shape,h.dtype,p,u);let x=m;return i&&(x=at(m,l)),d.forEach(b=>t.disposeIntermediateTensorInfo(b)),t.makeTensorInfo(x,g,f)}const GR={kernelName:Ua,backendName:"cpu",kernelFunc:UR};function HR(n,e,t){n.forEach((s,o)=>{if(s<0||s>=t){const r=Eo(o,e.length,fe(e)).join(",");throw new Error(`indices[${r}] = ${s} is not in [0, ${t})`)}})}function qR(n,e){for(let t=0;t<n.length;++t){const s=n[t],o=t===n.length-1?e:n[t+1].length;if(s.length===0)throw new Error("Ragged splits may not be empty");if(s[0]<0)throw new Error("Ragged splits must be non-negative");if(s[s.length-1]>o)throw new Error("Ragged splits must not point past values");for(let r=1;r<s.length;++r)if(s[r-1]>s[r])throw new Error("Ragged splits must be sorted in ascending order")}}function KR(n,e,t,s){const o=[];let r=0;const i=e.length-1+t.length,a=new Array(i).fill(null).map(()=>[0]);qR(t,s);let l=1;for(let c=0;c<e.length-1;++c){l*=e[c];const u=e[c+1];for(let h=1;h<l+1;++h)a[c].push(h*u)}for(let c=0;c<n.length;++c){let u=n[c],h=n[c]+1;for(let d=0;d<t.length;++d){const p=t[d],f=d+e.length-1;if(f>=0){const m=a[f],g=m[m.length-1]-p[u];for(let x=u;x<h;++x)a[f].push(p[x+1]+g)}u=p[u],h=p[h]}h!==u&&(o.push([u,h]),r+=h-u)}return{outSplits:a,valueSlices:o,numValues:r}}function jR(n){const e=[];for(let t=0;t<n.length;++t){const s=n[t].length,o=et("int32",s);e.push(o),n[t].forEach((r,i)=>o[i]=r)}return e}function L0(n,e){const t=n.slice(0,e);for(;t.length<e;)t.push(1);for(let s=e;s<n.length;s++)t[e-1]*=n[s];return t}function XR(n,e,t,s,o,r){const i=L0(e,2)[1],a=L0(r,2)[1];let l=0;for(const c of t)for(let u=c[0];u<c[1];++u){for(let h=0;h<s;++h)o[l*a+h]=n[u*i+h];++l}}function YR(n,e,t,s,o){const r=e.slice();r[0]=o;const i=et(t,K(r)),a=n.length,l=a===0?0:a/e[0];return XR(n,e,s,l,i,r),[i,r]}function M0(n,e,t,s,o,r,i,a){if(n.length===0)throw new Error("paramsNestedSplits must be non empty");if(e[0].length===0)throw new Error("Split tensors must not be scalars");const l=e[0][0]-1;if(HR(r,i,l),s.length===0)throw new Error("params.rank must be nonzero");const c=s[0],{outSplits:u,valueSlices:h,numValues:d}=KR(r,i,n,c),p=jR(u),f=YR(t,s,o,h,d);return[p,f[0],f[1]]}const P0=2147483647;function z0(n,e,t,s,o,r,i){if(e.length>1)throw new Error("starts must be a scalar or vector");if(o.length>1)throw new Error("limits must be a scalar or vector");if(i.length>1)throw new Error("deltas must be a scalar or vector");const a=e.length===0,l=o.length===0,c=i.length===0,u=[];a||u.push(e[0]),l||u.push(o[0]),c||u.push(i[0]);for(let g=1;g<u.length;++g)if(u[g]!==u[g-1])throw new Error("starts, limits, and deltas must have the same shape");const h=u.length===0?1:u[0],d=et("int32",h+1);d[0]=0;for(let g=0;g<h;++g){const x=a?n[0]:n[g],b=l?s[0]:s[g],w=c?r[0]:r[g];if(w===0)throw new Error("Requires delta != 0");let y;if(w>0&&b<x||w<0&&b>x)y=0;else if(y=Math.ceil(Math.abs((b-x)/w)),y>P0)throw new Error(`Requires ((limit - start) / delta) <= ${P0}`);d[g+1]=d[g]+y}const p=d[h],f=et(t,p);let m=0;for(let g=0;g<h;++g){const x=d[g+1]-d[g];let b=a?n[0]:n[g];const w=c?r[0]:r[g];for(let y=0;y<x;++y)f[m++]=b,b+=w}return[d,f]}var xn=kn;class cc{constructor(e,t,s,o,r,i,a,l,c,u){this.shape=e,this.shapeShape=t,this.values=s,this.valuesShape=o,this.valuesDType=r,this.defaultValue=i,this.defaultValueShape=a,this.rowPartitionValues=l,this.rowPartitionValuesShapes=c,this.rowPartitionTypes=Gm(u),this.raggedRank=Hm(this.rowPartitionTypes)}getRowPartitionTypeByDimension(e){return this.rowPartitionTypes[0]===xn.FIRST_DIM_SIZE?this.rowPartitionTypes[e+1]:this.rowPartitionTypes[e]}getRowPartitionTensor(e){return this.rowPartitionTypes[0]===xn.FIRST_DIM_SIZE?this.rowPartitionValues[e+1]:this.rowPartitionValues[e]}getMaxWidth(e){const t=this.getRowPartitionTensor(e-1);switch(this.getRowPartitionTypeByDimension(e-1)){case xn.VALUE_ROWIDS:return cc.getMaxWidthValueRowID(t);case xn.ROW_SPLITS:return cc.getMaxWidthRowSplit(t);default:throw new Error(`Cannot handle partition type ${xn[this.getRowPartitionTypeByDimension(e-1)]}`)}}static getMaxWidthRowSplit(e){const t=e.length;if(t===0||t===1)return 0;let s=0;for(let o=0;o<t-1;++o){const r=e[o+1]-e[o];r>s&&(s=r)}return s}static getMaxWidthValueRowID(e){const t=e.length;if(t===0)return 0;let s=0,o=e[0],r=0;for(let i=1;i<t;++i){const a=e[i];a!==o&&(o=a,r=Math.max(i-s,r),s=i)}return Math.max(t-s,r)}tensorShapeFromTensor(e,t,s=!0){if(t.length===0){if(e[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return V0(e,s)}calculateOutputSize(e){const t=this.valuesShape,s=this.defaultValueShape;qm(s,t);const o=this.tensorShapeFromTensor(this.shape,this.shapeShape),i=Um(this.raggedRank,o,t);i[0]<0&&(i[0]=e);for(let a=1;a<=this.raggedRank;++a)i[a]<0&&(i[a]=this.getMaxWidth(a));return i}calculateFirstParentOutputIndex(e,t,s){const o=Math.min(e,s),r=[];let i=0;for(let a=0;a<o;++a,i+=t)r.push(i);for(let a=o;a<e;++a)r.push(-1);return S(r.length===e,()=>"Final length of result must be equal to firstDimension."),r}calculateOutputIndexRowSplit(e,t,s,o){const r=e.length,i=[];for(let a=0;a<r-1;++a){const l=e[a+1]-e[a];let c=Math.min(o,l),u=t[a];u===-1&&(c=0);for(let h=0;h<c;++h)i.push(u),u+=s;for(let h=0;h<l-c;++h)i.push(-1)}if(r>0&&i.length!==e[r-1])throw new Error("Invalid row split size.");return i}calculateOutputIndexValueRowID(e,t,s,o){const r=e.length,i=[];if(r===0)return[];let a=0,l=e[0];if(l>=t.length)throw new Error(`Got currentValueRowId=${l}, which is not less than ${t.length}`);let c=t[l];i.push(c);for(let u=1;u<r;++u){const h=e[u];if(h===l)c>=0&&(++a,a<o?c+=s:c=-1);else{if(a=0,l=h,h>=t.length)throw new Error(`Got nextValueRowId=${h} which is not less than ${t.length}`);c=t[h]}i.push(c)}if(i.length!==e.length)throw new Error("Invalid row ids.");return i}calculateOutputIndex(e,t,s,o){const r=this.getRowPartitionTensor(e),i=this.getRowPartitionTypeByDimension(e);switch(i){case xn.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(r,t,s,o);case xn.ROW_SPLITS:if(r.length-1>t.length)throw new Error(`Row partition size is greater than output size: ${r.length-1} > ${t.length}`);return this.calculateOutputIndexRowSplit(r,t,s,o);default:throw new Error(`Unsupported partition type: ${xn[i]}`)}}getFirstDimensionSize(){const e=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");const t=this.rowPartitionTypes[0];switch(t){case xn.FIRST_DIM_SIZE:return e[0];case xn.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case xn.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${xn[t]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");const t=this.getFirstDimensionSize(),s=this.calculateOutputSize(t),o=new Array(this.raggedRank+1);o[o.length-1]=1;for(let l=o.length-2;l>=0;--l)o[l]=o[l+1]*s[l+1];const r=V0(s,!1),i=et(this.valuesDType,K(r));if(o[0]*s[0]>0){let l=this.calculateFirstParentOutputIndex(t,o[0],s[0]);for(let c=1;c<=this.raggedRank;++c)l=this.calculateOutputIndex(c-1,l,o[c],s[c]);this.setOutput(this.raggedRank,l,i,r)}return[r,i]}setOutput(e,t,s,o){if(s.length===0)return;const r=this.values,i=s;let a=o.slice();a=a.slice(e+1);const l=K(a),c=t.length;let u=this.defaultValue;if(u.length!==l&&u.length!==1){const f=this.defaultValueShape;B(()=>{const m=V(u,f);u=pi(m,a).dataSync()})}let h=0,d=0,p=0;for(let f=0;f<=c;++f){let m=f<c?t[f]:-1;if(m===p){++p;continue}if(d<p){const g=r.subarray(h*l),x=i.subarray(d*l),b=(p-d)*l;B0(x,g,b)}if(f>=c){const g=s.length;m=Math.floor(g/l)}if(m>p)if(this.defaultValue.length===1)i.subarray(p*l,m*l).fill(this.defaultValue[0]),p=m;else for(;m>p;){const g=i.slice(p*l);B0(g,u,l),++p}m<0?(h=f+1,d=p):(h=f,d=p,p=d+1)}}}function B0(n,e,t){for(let s=0;s<t;s++)n[s]=e[s]}function V0(n,e){const t=[];for(let s of n){if(s<0){if(!e)throw new Error(`Dimension ${s} must be >= 0`);if(s<-1)throw new Error(`Dimension ${s} must be >= -1`);s=-1}t.push(s)}return t}function W0(n,e,t,s,o,r,i,a,l,c){return new cc(n,e,t,s,o,r,i,a,l,c).compute()}function U0(n,e,t,s){const o=n===e,r=n<e&&t<0,i=e<n&&t>1;if(o||r||i)return Rt(0,s);const a=Math.abs(Math.ceil((e-n)/t)),l=Rt(a,s);e<n&&t===1&&(t=-1),l[0]=n;for(let c=1;c<l.length;c++)l[c]=l[c-1]+t;return l}const G0=Yn(n=>1/Math.sqrt(n)),ZR=Ds(qr,G0),JR={kernelName:qr,backendName:"cpu",kernelFunc:ZR};function go(n,e,t,s,o,r,i,a,l,c){const u=[s/o,o],h=n.values,d=e.values;if(s===0)return ke(t,e.dtype);const p=l instanceof It?l:ke(u,e.dtype);typeof l=="string"||typeof l=="number"?p.values.fill(l):typeof l=="boolean"&&p.values.fill(+l);for(let f=0;f<r;f++){const m=[];let g=0;for(let x=0;x<i;x++){const b=h[f*i+x];m.push(b),g+=b*a[x]}if(g<0||g>=s/o)throw new Error(`Invalid indices: ${m} does not index into ${t}`);for(let x=0;x<o;x++)c?p.values[g*o+x]+=d[f*o+x]:p.values[g*o+x]=e.rank===0?d[0]:d[f*o+x]}return p}const QR=Yn(n=>1/(1+Math.exp(-n))),H0=ze(Zr,n=>1/(1+Math.exp(-n))),eA={kernelName:Zr,backendName:"cpu",kernelFunc:H0};function q0(n,e,t,s,o){const r=Pm(s,e,t),i=K(t),a=fe(s);if(r){const h=zm(e,a);return o==="string"?n.slice(h,h+i):n.subarray(h,h+i)}const l=o==="string"?as(n):n,c=ke(s,o,l),u=ke(t,o);for(let h=0;h<u.size;++h){const d=u.indexToLoc(h),p=d.map((f,m)=>f+e[m]);u.set(c.get(...p),...d)}return o==="string"?pg(u.values):u.values}function xo(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{begin:r,size:i}=s;ce(o,"slice");const[a,l]=_h(o,r,i);Lm(o,a,l);const c=t.data.get(o.dataId).values,u=q0(c,a,l,o.shape,o.dtype);return t.makeTensorInfo(l,o.dtype,u)}const tA={kernelName:Xa,backendName:"cpu",kernelFunc:xo};function K0(n,e,t,s,o,r,i){const a=e[0],l=r[0],c=new Array(l),u=new Array(a),h=e[1];if(l===0){if(a!==0)throw new Error(tg(a));const g=et(t,0),x=et(o,0);return[g,[0,h],x,c,u]}let d=!0,p=0;const f=new Array(l).fill(0);for(let g=0;g<a;++g){const x=n[g*h];if(x<0)throw new Error(ng(g,x));if(x>=l)throw new Error(sg(g,x,l));++f[x],d=d&&x>=p,p=x}let m=!0;for(let g=0;g<l;++g){const x=f[g]===0;c[g]=x,m=m&&!x,f[g]=Math.max(f[g],1),g>0&&(f[g]+=f[g-1])}if(m&&d){const g=n,x=s;for(let b=0;b<a;++b)u[b]=b;return[g,[a,h],x,c,u]}else{const g=f[l-1],x=et(t,g*h),b=et(o,g),w=new Array(l).fill(0);for(let y=0;y<a;++y){const C=n[y*h],$=w[C],v=(C===0?0:f[C-1])+$;w[C]++;for(let k=0;k<h;++k)x[v*h+k]=n[y*h+k];b[v]=s[y],u[y]=v}for(let y=0;y<l;++y)if(w[y]===0){const $=y===0?0:f[y-1];x[$*h+0]=y;for(let v=1;v<h;++v)x[$*h+v]=0;b[$]=i}return[x,[g,h],b,c,u]}}function j0(n,e,t,s,o){const r=K(s),i=e[0],a=o.length,l=[];let c=1,u=-1;for(let g=0;g<a;++g){const x=o[g];if(x===-1){if(u!==-1)throw new Error(og(u,g));u=g,l.push(1)}else{if(x<0)throw new Error(rg(g,x));c*=x,l.push(x)}}if(u!==-1){if(c<=0)throw new Error(ig());const g=Math.trunc(r/c);if(c*g!==r)throw new Error(ag(s,l));l[u]=g}if(K(l)!==r)throw new Error(lg(s,l));const d=s.length,p=[];if(d>0){p[d-1]=1;for(let g=d-2;g>=0;--g)p[g]=p[g+1]*s[g+1]}const f=[];if(a>0){f[a-1]=1;for(let g=a-2;g>=0;--g)f[g]=f[g+1]*l[g+1]}const m=et(t,i*a);for(let g=0;g<i;++g){let x=0;for(let b=0;b<d;++b)x+=n[g*d+b]*p[b];for(let b=0;b<a;++b)m[g*a+b]=Math.trunc(x/f[b]),x%=f[b]}return[m,[i,a],l]}function Wd(n,e,t,s,o,r=!1,i=0){const a=s.length,l=[e[0],n.length/e[0]],c=l[1],h=a>0?o[a-1]+1:0;if(h<0)throw new Error(ed());const d=e.slice();d[0]=h;const p=d.reduce((w,y)=>w*y,1),f=et(t,p);if(a===0)return h>0&&f.fill(i),[f,d];if(h<=0)throw new Error(ed());let m=0,g=1,x=0,b=o[m];for(;;){let w=0;if(g<a){if(w=o[g],b===w){++g;continue}if(b>=w)throw new Error(cg())}if(b<0||b>=h)throw new Error(ug(b,h));b>x&&f.fill(i,x*c,b*c);for(let y=m;y<g;++y){const C=s[y];if(C<0||C>=l[0])throw new Error(hg(y,s[y],l[0]));for(let $=0;$<c;$++)f[b*c+$]+=n[C*c+$]}if(r)for(let y=0;y<c;y++)f[b*c+y]/=g-m;if(m=g,++g,x=b+1,b=w,g>a)break}return x<h&&f.fill(i,x*c,h*c),[f,d]}const nA=Yn(n=>Math.sqrt(n)),sA=ze(Qr,n=>Math.sqrt(n)),oA={kernelName:Qr,backendName:"cpu",kernelFunc:sA};const X0=it(((n,e)=>{const t=n-e;return t*t})),rA=xt(ei,X0),iA={kernelName:ei,backendName:"cpu",kernelFunc:rA};const Y0=Yn((n,e)=>{const{pattern:t,replaceGlobal:s,rewrite:o}=e;return n.replace(new RegExp(t,s?"g":""),o)}),aA=Ds(Tu,Y0),lA={kernelName:Tu,backendName:"cpu",kernelFunc:aA};function Z0(n,e,t,s){const o=ke(n,e.dtype);for(let r=0;r<o.size;r++){const i=o.indexToLoc(r),a=new Array(i.length);for(let l=0;l<a.length;l++)a[l]=i[l]*t[l]+s[l];o.set(e.get(...a),...i)}return o}class cA{constructor(e,t,s,o,r,i){this.separator=ms(e),this.nGramWidths=t,this.leftPad=ms(s),this.rightPad=ms(o),this.padWidth=r,this.preserveShort=i}getPadWidth(e){return Math.min(this.padWidth<0?e-1:this.padWidth,e-1)}getNumNGrams(e,t){const s=this.getPadWidth(t);return Math.max(0,e+2*s-t+1)}createNGrams(e,t,s,o,r,i){for(let a=0;a<r;++a){const l=this.getPadWidth(i),c=Math.max(0,l-a),u=Math.max(0,l-(r-(a+1))),h=i-(c+u),d=t+(c>0?0:a-l);let p=0;p+=c*this.leftPad.length;for(let b=0;b<h;++b)p+=e[d+b].length;p+=u*this.rightPad.length;const f=c+u+h-1;p+=f*this.separator.length,s[o+a]=new Uint8Array(p);const m=s[o+a];let g=0;const x=b=>b.forEach(w=>m[g++]=w);for(let b=0;b<c;++b)x(this.leftPad),x(this.separator);for(let b=0;b<h-1;++b)x(e[d+b]),x(this.separator);if(h>0){x(e[d+h-1]);for(let b=0;b<u;++b)x(this.separator),x(this.rightPad)}else{for(let b=0;b<u-1;++b)x(this.rightPad),x(this.separator);x(this.rightPad)}}}compute(e,t){const s=e.length,o=t.length;if(o>0){let l=t[0];if(l!==0)throw new Error(`First split value must be 0, got ${l}`);for(let c=1;c<o;++c){let u=t[c]>=l;if(u=u&&t[c]<=s,!u)throw new Error(`Invalid split value ${t[c]}, must be in [${l}, ${s}]`);l=t[c]}if(l!==s)throw new Error(`Last split value must be data size. Expected ${s}, got ${l}`)}const r=o-1,i=et("int32",o);if(s===0||o===0){const l=new Array(s);for(let c=0;c<=r;++c)i[c]=0;return[l,i]}i[0]=0;for(let l=1;l<=r;++l){const c=t[l]-t[l-1];let u=0;this.nGramWidths.forEach(h=>{u+=this.getNumNGrams(c,h)}),this.preserveShort&&c>0&&u===0&&(u=1),i[l]=i[l-1]+u}const a=new Array(i[r]);for(let l=0;l<r;++l){const c=t[l];let u=i[l];if(this.nGramWidths.forEach(h=>{const d=t[l+1]-t[l],p=this.getNumNGrams(d,h);this.createNGrams(e,c,a,u,p,h),u+=p}),this.preserveShort&&u===i[l]){const h=t[l+1]-t[l];if(h===0)continue;const d=h+2*this.padWidth;this.createNGrams(e,c,a,u,1,d)}}return[a,i]}}function J0(n,e,t,s,o,r,i,a){return new cA(t,s,o,r,i,a).compute(n,e)}function uA(n,e,t,s){if(!n.length)return;if(e.length===0){for(let r=0;r<n.length;++r)s.push(n.subarray(r,r+1));return}if(e.length===1){const r=e[0];let i=n.indexOf(r);for(;i!==-1;){const a=n.subarray(0,i);(!t||a.length!==0)&&s.push(a),n=n.subarray(i+1),i=n.indexOf(r)}(!t||n.length!==0)&&s.push(n);return}let o=0;for(let r=0;r<n.length+1;r++)if(r===n.length||e.indexOf(n[r])!==-1){const i=n.subarray(o,r);(!t||i.length!==0)&&s.push(i),o=r+1}}function Q0(n,e,t){const s=n.length,o=[];let r=0,i=0;const a=new Array(s);for(let d=0;d<s;++d){const p=o.length;uA(n[d],e,t,o);const f=o.length-p;a[d]=f,r+=f,i=Math.max(i,f)}const l=et("int32",r*2),c=new Array(r),u=[s,i];let h=0;for(let d=0;d<s;++d)for(let p=0;p<a[d];++p)l[h*2]=d,l[h*2+1]=p,c[h]=o[h],++h;return[l,c,u]}function e1(n,e){const t=et("int32",n.length);for(let s=0;s<n.length;++s)t[s]=Nw(n[s]).modulo(e).getLowBitsUnsigned();return t}const t1=it(((n,e)=>n-e)),hA=Pd(((n,e,t,s)=>({real:n-t,imag:e-s}))),Ud=xt(ti,t1,hA),dA={kernelName:ti,backendName:"cpu",kernelFunc:Ud};function n1(n,e){const t=new Array(n.rank);for(let o=0;o<t.length;o++)t[o]=n.shape[o]*e[o];const s=ke(t,n.dtype);for(let o=0;o<s.values.length;++o){const r=s.indexToLoc(o),i=new Array(n.rank);for(let l=0;l<i.length;l++)i[l]=r[l]%n.shape[l];const a=n.locToIndex(i);s.values[o]=n.values[a]}return s}const Bi=(n,e)=>{const t=e.value-n.value;return t===0?n.index-e.index:t};function s1(n,e,t=0,s=n.length-1){for(;s>t;){if(s-t>600){const a=s-t+1,l=e-t+1,c=Math.log(a),u=.5*Math.exp(2*c/3),h=.5*Math.sqrt(c*u*(a-u)/a)*Math.sign(l-a/2),d=Math.max(t,Math.floor(e-l*u/a+h)),p=Math.min(s,Math.floor(e+(a-l)*u/a+h));s1(n,e,d,p)}const o=n[e];let r=t,i=s;for(Fn(n,t,e),Bi(n[s],o)>0&&Fn(n,t,s);r<i;){for(Fn(n,r,i),r++,i--;Bi(n[r],o)<0;)r=r+1;for(;Bi(n[i],o)>0;)i=i-1}Bi(n[t],o)===0?Fn(n,t,i):(i=i+1,Fn(n,i,s)),i<=e&&(t=i+1),e<=i&&(s=i-1)}}function o1(n,e,t,s,o){const r=e[e.length-1],[i,a]=[n.length/r,r],l=Et(t,i*s),c=Et("int32",i*s);for(let h=0;h<i;h++){const d=h*a,p=n.subarray(d,d+a);let f=new Array(p.length);p.forEach((b,w)=>f[w]={value:b,index:w}),s<f.length&&(s1(f,s),f=f.slice(0,s)),o&&f.sort(Bi);const m=h*s,g=l.subarray(m,m+s),x=c.subarray(m,m+s);for(let b=0;b<s;b++)g[b]=f[b].value,x[b]=f[b].index}const u=e.slice();return u[u.length-1]=s,[ke(u,t,l),ke(u,"int32",c)]}function r1(n,e,t,s){const o=ve(e,t)[0],r=[1,t[0],1];for(let f=0;f<o;f++)r[0]*=t[f];r[1]=t[o];for(let f=o+1;f<t.length;f++)r[2]*=t[f];const i=new Map,a=new Int32Array(t[o]),l=new It(r,s,n),c=[],u=r[0]===1&&r[2]===1;for(let f=0;f<t[o];f++){let m;if(u)m=n[f].toString();else{const x=[];for(let b=0;b<r[0];b++)for(let w=0;w<r[2];w++)x.push(l.get(b,f,w));m=x.join(",")}const g=i.get(m);if(g!=null)a[f]=g;else{const x=i.size;i.set(m,x),a[f]=x,c.push(f)}}const h=r.slice();h[1]=i.size;const d=new It(h,s);c.forEach((f,m)=>{for(let g=0;g<r[0];g++)for(let x=0;x<r[2];x++)d.set(l.get(g,f,x),g,m,x)});const p=t.slice();return p[o]=h[1],{outputValues:d.values,outputShape:p,indices:a}}var pA=Object.freeze({__proto__:null,addImpl:u0,bincountImpl:zd,bincountReduceImpl:h0,bitwiseAndImpl:d0,castImpl:c0,ceilImpl:p0,concatImpl:f0,equalImpl:m0,expImpl:x0,expm1Impl:y0,floorDivImpl:C0,floorImpl:w0,gatherNdImpl:I0,gatherV2Impl:$0,greaterEqualImpl:k0,greaterImpl:v0,lessEqualImpl:N0,lessImpl:S0,linSpaceImpl:T0,logImpl:E0,maxImpl:R0,maximumImpl:A0,minimumImpl:D0,multiplyImpl:Bd,negImpl:F0,notEqualImpl:_0,prodImpl:O0,raggedGatherImpl:M0,raggedRangeImpl:z0,raggedTensorToTensorImpl:W0,rangeImpl:U0,rsqrtImpl:G0,scatterImpl:go,sigmoidImpl:QR,simpleAbsImpl:l0,sliceImpl:q0,sparseFillEmptyRowsImpl:K0,sparseReshapeImpl:j0,sparseSegmentReductionImpl:Wd,sqrtImpl:nA,squaredDifferenceImpl:X0,staticRegexReplaceImpl:Y0,stridedSliceImpl:Z0,stringNGramsImpl:J0,stringSplitImpl:Q0,stringToHashBucketFastImpl:e1,subImpl:t1,tileImpl:n1,topKImpl:o1,transposeImpl:Vd,uniqueImpl:r1});$f("cpu",()=>new ic,1);const i1=ze(vr,n=>n>=0?n:Math.exp(n)-1),fA={kernelName:vr,backendName:"cpu",kernelFunc:i1};function a1(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{alpha:r}=s;ce([o],"leakyRelu");const i=K(o.shape),a=t.data.get(o.dataId).values,l=Et("float32",i);for(let c=0;c<a.length;c++)l[c]=a[c]<0?r*a[c]:a[c];return t.makeTensorInfo(o.shape,"float32",l)}const mA={kernelName:$a,backendName:"cpu",kernelFunc:a1};const gA=it((n,e)=>n<0?e*n:n);function l1(n){const{inputs:e,backend:t}=n,{x:s,alpha:o}=e;ce([s,o],"prelu");const r=t.data.get(s.dataId).values,i=t.data.get(o.dataId).values,[a,l]=gA(s.shape,o.shape,r,i,"float32");return t.makeTensorInfo(l,"float32",a)}const xA={kernelName:Wa,backendName:"cpu",kernelFunc:l1};const c1=ze(Ur,n=>Math.max(0,n)),bA={kernelName:Ur,backendName:"cpu",kernelFunc:c1};const u1=ze(Gr,n=>Math.min(Math.max(0,n),6)),yA={kernelName:Gr,backendName:"cpu",kernelFunc:u1};function uc(n,e,t,s,o){if(t==="linear")return Xn({inputs:{x:e},backend:n});if(t==="relu")return c1({inputs:{x:e},backend:n});if(t==="elu")return i1({inputs:{x:e},backend:n});if(t==="relu6")return u1({inputs:{x:e},backend:n});if(t==="prelu")return l1({inputs:{x:e,alpha:s},backend:n});if(t==="leakyrelu")return a1({inputs:{x:e},backend:n,attrs:{alpha:o}});if(t==="sigmoid")return H0({inputs:{x:e},backend:n});throw new Error(`Activation ${t} has not been implemented for the CPU backend.`)}function qe(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{shape:r}=s,i=K(o.shape),a=Ip(r,i),l=K(a);S(i===l,()=>`The new shape (${a}) has ${l} elements and the old shape (${o.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`),t.incRef(o.dataId);const c=t.data.get(o.dataId);if(c.complexTensorInfos!=null){const u=c.complexTensorInfos.real,h=c.complexTensorInfos.imag;u.shape=a,h.shape=a}return{dataId:o.dataId,shape:a,dtype:o.dtype}}const wA={kernelName:Ga,backendName:"cpu",kernelFunc:qe};function h1(n){const{inputs:e,backend:t,attrs:s}=n,{a:o,b:r}=e,{transposeA:i,transposeB:a}=s;ce([o,r],"matMul");const l=o.shape.length,c=r.shape.length,u=i?o.shape[l-2]:o.shape[l-1],h=a?r.shape[c-1]:r.shape[c-2],d=i?o.shape[l-1]:o.shape[l-2],p=a?r.shape[c-2]:r.shape[c-1],f=o.shape.slice(0,-2),m=r.shape.slice(0,-2),g=K(f),x=K(m),w=we(o.shape.slice(0,-2),r.shape.slice(0,-2)).concat([d,p]);S(u===h,()=>`Error in matMul: inner shapes (${u}) and (${h}) of Tensors with shapes ${o.shape} and ${r.shape} and transposeA=${i} and transposeB=${a} must match.`);const y=i?[g,u,d]:[g,d,u],C=a?[x,p,h]:[x,h,p],$=qe({inputs:{x:o},backend:t,attrs:{shape:y}}),v=qe({inputs:{x:r},backend:t,attrs:{shape:C}}),k=i?$.shape[1]:$.shape[2],N=i?$.shape[2]:$.shape[1],T=a?v.shape[1]:v.shape[2],I=Math.max(g,x),E=t.data.get($.dataId).values,R=t.data.get(v.dataId).values,D=fe($.shape),F=fe(v.shape),[_,P,z]=i?[D[0],1,D[1]]:[D[0],D[1],1],[H,G,Z]=a?[1,F[1],F[0]]:[F[1],1,F[0]],J=N*T,Q=ke([I,N,T],$.dtype),j=Q.values,Y=t.blockSize;for(let ne=0;ne<I;ne++){const oe=ne%g,le=ne%x;for(let ae=0;ae<N;ae+=Y){const pe=Math.min(ae+Y,N);for(let ue=0;ue<T;ue+=Y){const Ie=Math.min(ue+Y,T);for(let Le=0;Le<k;Le+=Y){const Ne=Math.min(Le+Y,k);for(let Te=ae;Te<pe;Te++)for(let de=ue;de<Ie;de++){let $e=0;for(let Me=Le;Me<Ne;Me++){const Qe=E[oe*_+Te*P+Me*z],Ve=R[Me*H+de*G+le*Z];$e+=Qe*Ve}j[ne*J+(Te*T+de)]+=$e}}}}}return t.disposeIntermediateTensorInfo($),t.disposeIntermediateTensorInfo(v),t.makeTensorInfo(w,Q.dtype,Q.values)}const CA={kernelName:la,backendName:"cpu",kernelFunc:h1};function IA(n){const{inputs:e,backend:t,attrs:s}=n,{a:o,b:r,bias:i,preluActivationWeights:a}=e,{transposeA:l,transposeB:c,activation:u,leakyreluAlpha:h}=s;let d,p,f;const m=[];d=h1({inputs:{a:o,b:r},attrs:{transposeA:l,transposeB:c},backend:t}),i&&(p=Yo({inputs:{a:d,b:i},backend:t}),m.push(d),d=p),u&&(f=uc(t,d,u,a,h),m.push(d),d=f);for(const x of m)t.disposeIntermediateTensorInfo(x);return d}const $A={kernelName:sl,backendName:"cpu",kernelFunc:IA};const vA=ze(hr,n=>Math.acos(n)),kA={kernelName:hr,backendName:"cpu",kernelFunc:vA};const SA=ze(dr,n=>Math.acosh(n)),NA={kernelName:dr,backendName:"cpu",kernelFunc:SA};function TA(n){const{inputs:e,backend:t}=n,s=e;ce(e,"addN");const o=s.map(a=>t.data.get(a.dataId).values),r=ke(s[0].shape,s[0].dtype),i=r.values;for(let a=0;a<s.length;a++){const l=o[a];for(let c=0;c<i.length;c++)i[c]+=l[c]}return t.makeTensorInfo(r.shape,r.dtype,r.values)}const EA={kernelName:Hc,backendName:"cpu",kernelFunc:TA};function RA(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s;ce(o,"all");const a=ve(r,o.shape);let l=a;const c=Ze(l,o.shape.length);let u=o;c!=null&&(u=jt({inputs:{x:o},backend:t,attrs:{perm:c}}),l=nt(l.length,o.shape.length)),kt("all",l,u.shape.length);const[h,d]=yt(u.shape,l),p=K(d),f=Rt(K(h),u.dtype),m=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){const b=x*p;let w=m[b];for(let y=0;y<p;++y){const C=m[b+y];w=w&&C}f[x]=w}c!=null&&t.disposeIntermediateTensorInfo(u);const g=t.makeTensorInfo(h,u.dtype,f);if(i){const x=at(h,a),b=qe({inputs:{x:g},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(g),b}return g}const AA={kernelName:qc,backendName:"cpu",kernelFunc:RA};function DA(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s;ce(o,"any");const a=ve(r,o.shape);let l=a;const c=Ze(l,o.shape.length);let u=o;c!=null&&(u=jt({inputs:{x:o},backend:t,attrs:{perm:c}}),l=nt(l.length,o.shape.length)),kt("any",l,u.shape.length);const[h,d]=yt(u.shape,l),p=K(d),f=Rt(K(h),u.dtype),m=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){const b=x*p;let w=m[b];for(let y=0;y<p;++y){const C=m[b+y];w=w||C}f[x]=w}c!=null&&t.disposeIntermediateTensorInfo(u);const g=t.makeTensorInfo(h,u.dtype,f);if(i){const x=at(h,a),b=qe({inputs:{x:g},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(g),b}return g}const FA={kernelName:Kc,backendName:"cpu",kernelFunc:DA};function _A(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r}=s;ce(o,"argMax");let i=ve(r,o.shape);const a=Ze(i,o.shape.length);let l=o;const c=[];a!=null&&(l=jt({inputs:{x:o},backend:t,attrs:{perm:a}}),c.push(l),i=nt(i.length,l.shape.length)),i=[i[0]],kt("argMax",i,l.shape.length);const[u,h]=yt(l.shape,i),d=K(u),p=Rt(d,"int32"),f=K(h),m=t.data.get(l.dataId).values;for(let g=0;g<p.length;++g){const x=g*f;let b=m[x],w=0;for(let y=0;y<f;++y){const C=m[x+y];C>b&&(b=C,w=y)}p[g]=w}return c.forEach(g=>t.disposeIntermediateTensorInfo(g)),t.makeTensorInfo(u,"int32",p)}const OA={kernelName:oa,backendName:"cpu",kernelFunc:_A};function LA(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r}=s;ce(o,"argMin");let i=ve(r,o.shape);const a=Ze(i,o.shape.length);let l=o;const c=[];a!=null&&(l=jt({inputs:{x:o},backend:t,attrs:{perm:a}}),c.push(l),i=nt(i.length,l.shape.length)),i=[i[0]],kt("argMin",i,l.shape.length);const[u,h]=yt(l.shape,i),d=K(u),p=Rt(d,"int32"),f=K(h),m=t.data.get(l.dataId).values;for(let g=0;g<p.length;++g){const x=g*f;let b=m[x],w=0;for(let y=0;y<f;++y){const C=m[x+y];C<b&&(b=C,w=y)}p[g]=w}return c.forEach(g=>t.disposeIntermediateTensorInfo(g)),t.makeTensorInfo(u,"int32",p)}const MA={kernelName:ra,backendName:"cpu",kernelFunc:LA};const PA=ze(pr,n=>Math.asin(n)),zA={kernelName:pr,backendName:"cpu",kernelFunc:PA};const BA=ze(fr,n=>Math.asinh(n)),VA={kernelName:fr,backendName:"cpu",kernelFunc:BA};const WA=ze(mr,n=>Math.atan(n)),UA={kernelName:mr,backendName:"cpu",kernelFunc:WA};const GA=it((n,e)=>Math.atan2(n,e)),HA=xt(xr,GA),qA={kernelName:xr,backendName:"cpu",kernelFunc:HA};const KA=ze(gr,n=>Math.atanh(n)),jA={kernelName:gr,backendName:"cpu",kernelFunc:KA};function Gd(n,e,t,s,o,r){const i=o.strideHeight,a=o.strideWidth,l=o.dilationHeight,c=o.dilationWidth,u=o.effectiveFilterHeight,h=o.effectiveFilterWidth,d=o.padInfo.top,p=o.padInfo.left,f=r==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,m=ke(o.outShape,t),g=m.values,x=o.outShape[1]*o.outShape[2]*o.outShape[3],b=o.outShape[2]*o.outShape[3],w=o.outShape[3];for(let y=0;y<o.batchSize;++y){const C=y*x,$=y*s[0];for(let v=0;v<o.inChannels;++v)for(let k=0;k<o.outHeight;++k){const N=k*i-d,T=Math.max(0,N),I=Math.min(o.inHeight,u+N),E=C+k*b;for(let R=0;R<o.outWidth;++R){const D=R*a-p,F=Math.max(0,D),_=Math.min(o.inWidth,h+D);let P=f,z=0,H=0;for(let Z=T;Z<I;Z+=l){const J=$+Z*s[1];for(let Q=F;Q<_;Q+=c){const j=J+Q*s[2],Y=n[j+v];r==="max"&&Y>P?P=Y:r==="avg"&&(z+=Y,H++)}if(isNaN(P))break}const G=E+R*w+v;g[G]=r==="avg"?z/H:P}}}return m}function d1(n,e,t,s,o=!1,r=!1){const i=ke(s.outShape,"int32"),a=s.strideHeight,l=s.strideWidth,c=s.dilationHeight,u=s.dilationWidth,h=s.effectiveFilterHeight,d=s.effectiveFilterWidth,p=s.padInfo.top,f=s.padInfo.left,m=ke(e,t,n);for(let g=0;g<s.batchSize;++g)for(let x=0;x<s.inChannels;++x)for(let b=0;b<s.outHeight;++b){const w=b*a-p;let y=w;for(;y<0;)y+=c;const C=Math.min(s.inHeight,h+w);for(let $=0;$<s.outWidth;++$){const v=$*l-f;let k=v;for(;k<0;)k+=u;const N=Math.min(s.inWidth,d+v);let T=Number.NEGATIVE_INFINITY,I=-1;for(let E=y;E<C;E+=c){const R=E-w;for(let D=k;D<N;D+=u){const F=D-v,_=m.get(g,E,D,x);_>T&&(T=_,o?I=r?((g*s.inHeight+E)*s.inWidth+D)*s.inChannels+x:(E*s.inWidth+D)*s.inChannels+x:I=R*d+F)}}i.set(I,g,b,$,x)}}return i}function p1(n,e,t,s,o,r){const i=o.strideDepth,a=o.strideHeight,l=o.strideWidth,c=o.dilationDepth,u=o.dilationHeight,h=o.dilationWidth,d=o.effectiveFilterDepth,p=o.effectiveFilterHeight,f=o.effectiveFilterWidth,m=o.padInfo.front,g=o.padInfo.top,x=o.padInfo.left,b=r==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,w=ke(o.outShape,t),y=w.values,C=o.outShape[1]*o.outShape[2]*o.outShape[3]*o.outShape[4],$=o.outShape[2]*o.outShape[3]*o.outShape[4],v=o.outShape[3]*o.outShape[4],k=o.outShape[4];for(let N=0;N<o.batchSize;++N){const T=N*C,I=N*s[0];for(let E=0;E<o.inChannels;++E)for(let R=0;R<o.outDepth;++R){const D=R*i-m;let F=D;for(;F<0;)F+=c;const _=Math.min(o.inDepth,d+D),P=T+R*$;for(let z=0;z<o.outHeight;++z){const H=z*a-g;let G=H;for(;G<0;)G+=u;const Z=Math.min(o.inHeight,p+H),J=P+z*v;for(let Q=0;Q<o.outWidth;++Q){const j=Q*l-x;let Y=j;for(;Y<0;)Y+=h;const ne=Math.min(o.inWidth,f+j),oe=J+Q*k;let le=b,ae=0,pe=0;for(let Ie=F;Ie<_;Ie+=c){const Le=I+Ie*s[1];for(let Ne=G;Ne<Z;Ne+=u){const Te=Le+Ne*s[2];for(let de=Y;de<ne;de+=h){const $e=Te+de*s[3],Me=n[$e+E];if(r==="max"&&Me>le?le=Me:r==="avg"&&(ae+=Me,pe++),isNaN(le))break}if(isNaN(le))break}if(isNaN(le))break}const ue=oe+E;y[ue]=r==="avg"?ae/Math.max(pe,1):le}}}}return w}function XA(n,e){const t=ke(e.outShape,"int32"),s=e.strideDepth,o=e.strideHeight,r=e.strideWidth,i=e.dilationDepth,a=e.dilationHeight,l=e.dilationWidth,c=e.effectiveFilterDepth,u=e.effectiveFilterHeight,h=e.effectiveFilterWidth,d=e.padInfo.front,p=e.padInfo.top,f=e.padInfo.left;for(let m=0;m<e.batchSize;++m)for(let g=0;g<e.inChannels;++g)for(let x=0;x<e.outDepth;++x){const b=x*s-d;let w=b;for(;w<0;)w+=i;const y=Math.min(e.inDepth,c+b);for(let C=0;C<e.outHeight;++C){const $=C*o-p;let v=$;for(;v<0;)v+=a;const k=Math.min(e.inHeight,u+$);for(let N=0;N<e.outWidth;++N){const T=N*r-f;let I=T;for(;I<0;)I+=l;const E=Math.min(e.inWidth,h+T);let R=Number.NEGATIVE_INFINITY,D=-1;for(let F=w;F<y;F+=i){const _=F-b;for(let P=v;P<k;P+=a){const z=P-$;for(let H=I;H<E;H+=l){const G=H-T,Z=n.get(m,F,P,H,g);Z>=R&&(R=Z,D=_*u*h+z*u+G)}}}t.set(D,m,x,C,N,g)}}}return t}function YA(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e;ce(o,"avgPool");const{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=s,c=1;S(At(i,c),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=un(o.shape,r,i,c,a,l);let h;if(u.filterWidth===1&&u.filterHeight===1&&_e(u.inShape,u.outShape))h=Xn({inputs:{x:o},backend:t});else{const d=t.data.get(o.dataId).values,p=fe(o.shape),f=Gd(d,o.shape,o.dtype,p,u,"avg");h=t.makeTensorInfo(u.outShape,o.dtype,f.values)}return h}const ZA={kernelName:ia,backendName:"cpu",kernelFunc:YA};function JA(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{filterSize:r,strides:i,pad:a,dimRoundingMode:l,dataFormat:c}=s;ce(o,"avgPool3d");const u=ts(o.shape,r,i,1,a,l,c),h=t.data.get(o.dataId).values,d=p1(h,o.shape,o.dtype,fe(o.shape),u,"avg");return t.makeTensorInfo(d.shape,"float32",d.values)}const QA={kernelName:aa,backendName:"cpu",kernelFunc:JA};function eD(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,input:r}=e,{filterSize:i,strides:a,pad:l,dimRoundingMode:c}=s;ce([o,r],"avgPool3DGrad");const u=ts(r.shape,i,a,1,l,c),h=u.strideDepth,d=u.strideHeight,p=u.strideWidth,f=u.filterDepth,m=u.filterHeight,g=u.filterWidth,x=u.dilationDepth,b=u.dilationHeight,w=u.dilationWidth,y=u.effectiveFilterDepth,C=u.effectiveFilterHeight,$=u.effectiveFilterWidth,v=y-1-u.padInfo.front,k=$-1-u.padInfo.left,N=C-1-u.padInfo.top,T=ke(r.shape,"float32"),I=1/(f*m*g),E=t.bufferSync(o);for(let R=0;R<u.batchSize;++R)for(let D=0;D<u.inChannels;++D)for(let F=0;F<u.inDepth;++F)for(let _=0;_<u.inHeight;++_)for(let P=0;P<u.inWidth;++P){const z=F-v,H=_-N,G=P-k;let Z=0;for(let J=0;J<y;J+=x){const Q=(z+J)/h;if(!(Q<0||Q>=u.outDepth||Math.floor(Q)!==Q))for(let j=0;j<C;j+=b){const Y=(H+j)/d;if(!(Y<0||Y>=u.outHeight||Math.floor(Y)!==Y))for(let ne=0;ne<$;ne+=w){const oe=(G+ne)/p;if(oe<0||oe>=u.outWidth||Math.floor(oe)!==oe)continue;const le=E.get(R,Q,Y,oe,D);Z+=le}}}T.set(Z*I,R,F,_,P,D)}return t.makeTensorInfo(T.shape,T.dtype,T.values)}const tD={kernelName:Xc,backendName:"cpu",kernelFunc:eD};function nD(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,input:r}=e,i=r;ce([o,r],"avgPoolGrad");const{filterSize:a,strides:l,pad:c}=s,u=un(i.shape,a,l,1,c),h=u.strideHeight,d=u.strideWidth,p=u.filterHeight,f=u.filterWidth,m=u.dilationHeight,g=u.dilationWidth,x=u.effectiveFilterHeight,b=u.effectiveFilterWidth,w=b-1-u.padInfo.left,y=x-1-u.padInfo.top,C=ke(i.shape,"float32"),$=1/(p*f),v=t.data.get(o.dataId).values,k=ke(o.shape,"float32",v);for(let N=0;N<u.batchSize;++N)for(let T=0;T<u.inChannels;++T)for(let I=0;I<u.inHeight;++I)for(let E=0;E<u.inWidth;++E){const R=I-y,D=E-w;let F=0;for(let _=0;_<x;_+=m){const P=(R+_)/h;if(!(P<0||P>=u.outHeight||Math.floor(P)!==P))for(let z=0;z<b;z+=g){const H=(D+z)/d;if(H<0||H>=u.outWidth||Math.floor(H)!==H)continue;const G=k.get(N,P,H,T);F+=G}}C.set(F*$,N,I,E,T)}return t.makeTensorInfo(C.shape,C.dtype,C.values)}const sD={kernelName:jc,backendName:"cpu",kernelFunc:nD};function oD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,scale:r,offset:i,mean:a,variance:l}=e;S(a.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),S(i==null||a.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),S(r==null||a.shape.length===r.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),ce([o,a,l,r,i],"batchNorm");let{varianceEpsilon:c}=s;c==null&&(c=.001);const u=t.data.get(o.dataId).values,h=t.data.get(a.dataId).values,d=t.data.get(l.dataId).values,p=r?t.data.get(r.dataId).values:new Float32Array([1]),f=i?t.data.get(i.dataId).values:new Float32Array([0]),m=new Float32Array(u.length),g=f.length,x=p.length,b=d.length,w=h.length;let y=0,C=0,$=0,v=0;for(let k=0;k<u.length;++k)m[k]=f[y++]+(u[k]-h[C++])*p[$++]/Math.sqrt(d[v++]+c),y>=g&&(y=0),C>=w&&(C=0),$>=x&&($=0),v>=b&&(v=0);return t.makeTensorInfo(o.shape,o.dtype,m)}const rD={kernelName:wa,backendName:"cpu",kernelFunc:oD};function iD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{blockShape:r,crops:i}=s;ce([o],"batchToSpaceND");const a=r.reduce((x,b)=>x*b),l=Ci(o.shape,r,a),c=Ii(l.length,r.length),u=$i(o.shape,r,a),h=Ph(i,r.length),d=zh(u,i,r.length),p=qe({inputs:{x:o},backend:t,attrs:{shape:l}}),f=jt({inputs:{x:p},backend:t,attrs:{perm:c}}),m=qe({inputs:{x:f},backend:t,attrs:{shape:u}}),g=xo({inputs:{x:m},backend:t,attrs:{begin:h,size:d}});return t.disposeIntermediateTensorInfo(p),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(m),g}const aD={kernelName:ca,backendName:"cpu",kernelFunc:iD};function lD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,weights:r}=e,{size:i}=s,a=t.data.get(o.dataId).values,l=t.data.get(r.dataId).values,c=zd(a,l,r.dtype,r.shape,i);return t.makeTensorInfo([i],r.dtype,c)}const cD={kernelName:Yc,backendName:"cpu",kernelFunc:lD};function uD(n){const{inputs:e,backend:t}=n,{s0:s,s1:o}=e,r=t.data.get(s.dataId).values,i=t.data.get(o.dataId).values,a=we(Array.from(r),Array.from(i));return t.makeTensorInfo([a.length],"int32",Int32Array.from(a))}const hD={kernelName:Ep,backendName:"cpu",kernelFunc:uD};const dD=ze(wr,(n,e)=>{const t=e;return n>t.clipValueMax?t.clipValueMax:n<t.clipValueMin?t.clipValueMin:n}),pD={kernelName:wr,backendName:"cpu",kernelFunc:dD};const fD={kernelName:ua,backendName:"cpu",kernelFunc:n=>{const{x:e}=n.inputs,t=n.backend,s=new Float32Array(K(e.shape)),o=t.data.get(e.dataId),r=o.complexTensorInfos.real,i=o.complexTensorInfos.imag,a=t.data.get(r.dataId).values,l=t.data.get(i.dataId).values;for(let c=0;c<a.length;c++){const u=a[c],h=l[c];s[c]=Math.hypot(u,h)}return t.makeOutput(s,e.shape,"float32")}};function Zo(n){const{inputs:e,backend:t}=n,{input:s}=e,o=t.data.get(s.dataId).complexTensorInfos.imag,r=t.data.get(o.dataId).values;return t.makeTensorInfo(o.shape,o.dtype,r)}const mD={kernelName:gu,backendName:"cpu",kernelFunc:Zo};function Jo(n){const{inputs:e,backend:t,attrs:s}=n,{axis:o}=s,r=ve(o,e[0].shape)[0],i=e.map(m=>m.shape);Oh(i,r);let a=Vn(e.map(m=>m.shape),r);if(K(a)===0)return t.makeTensorInfo(a,e[0].dtype,[]);const l=e.filter(m=>K(m.shape)>0);if(l.length===1)return Xn({inputs:{x:l[0]},backend:t});if(l[0].dtype==="complex64"){const m=l.map(y=>mo({inputs:{input:y},backend:t})),g=l.map(y=>Zo({inputs:{input:y},backend:t})),x=Jo({inputs:m,backend:t,attrs:{axis:r}}),b=Jo({inputs:g,backend:t,attrs:{axis:r}}),w=Qt({inputs:{real:x,imag:b},backend:t});return m.forEach(y=>t.disposeIntermediateTensorInfo(y)),g.forEach(y=>t.disposeIntermediateTensorInfo(y)),t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(b),w}const c=l.map(m=>{const x=[-1,K(m.shape.slice(r))];return qe({inputs:{x:m},backend:t,attrs:{shape:x}})}),u=c.map(m=>({vals:t.data.get(m.dataId).values,shape:m.shape}));a=Vn(c.map(m=>m.shape),1);const h=c[0].shape[0]===1,d=f0(u,a,e[0].dtype,h),p=Vn(l.map(m=>m.shape),r),f=t.makeTensorInfo(p,e[0].dtype,d);return c.forEach(m=>t.disposeIntermediateTensorInfo(m)),f}const gD={kernelName:ha,backendName:"cpu",kernelFunc:Jo};function f1(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r}=e,{strides:i,pad:a,dataFormat:l,dilations:c,dimRoundingMode:u}=s;ce([o,r],"conv2d");const h=ns(l),d=$t(o.shape,r.shape,i,c,a,u,!1,h),p=d.filterHeight,f=d.filterWidth,m=d.dilationHeight,g=d.dilationWidth,x=d.padInfo.left,b=d.padInfo.top,w=d.dataFormat==="channelsLast",y=new It(d.outShape,o.dtype),C=fe(o.shape),$=fe(r.shape),v=C[0],k=w?C[1]:C[2],N=w?C[2]:1,T=w?1:C[1],I=y.strides[0],E=w?y.strides[1]:y.strides[2],R=w?y.strides[2]:1,D=w?1:y.strides[1],F=t.data.get(o.dataId).values,_=t.data.get(r.dataId).values,P=y.values;for(let z=0;z<d.batchSize;++z){const H=z*v,G=z*I;for(let Z=0;Z<d.outHeight;++Z){const J=G+Z*E,Q=Z*d.strideHeight-b;for(let j=0;j<p;++j){const Y=Q+j*m;if(Y<0||Y>=d.inHeight)continue;const ne=j*$[0],oe=H+Y*k;for(let le=0;le<d.outWidth;++le){const ae=J+le*R,pe=le*d.strideWidth-x;for(let ue=0;ue<f;++ue){const Ie=pe+ue*g;if(Ie<0||Ie>=d.inWidth)continue;const Le=ne+ue*$[1],Ne=oe+Ie*N;let Te=Le;for(let de=0;de<d.inChannels;++de){const $e=F[Ne+de*T];for(let Me=0;Me<d.outChannels;++Me)P[ae+Me*D]+=$e*_[Te+Me];Te+=d.outChannels}}}}}}return t.makeTensorInfo(y.shape,y.dtype,P)}const xD={kernelName:da,backendName:"cpu",kernelFunc:f1};function bD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,dy:r}=e,{strides:i,pad:a,dataFormat:l,dimRoundingMode:c,filterShape:u}=s;ce([o,r],"conv2dBackpropFilter");const h=ns(l),d=$t(o.shape,u,i,1,a,c,!1,h),{strideHeight:p,strideWidth:f,filterHeight:m,filterWidth:g}=d,x=d.dataFormat==="channelsLast",b=new It(d.filterShape,"float32"),w=d.padInfo.left,y=d.padInfo.top,C=t.data.get(o.dataId).values,$=t.data.get(r.dataId).values,v=new It(o.shape,o.dtype,C),k=new It(r.shape,r.dtype,$);for(let N=0;N<m;++N){const T=Math.max(0,Math.ceil((y-N)/p)),I=Math.min(d.outHeight,(d.inHeight+y-N)/p);for(let E=0;E<g;++E){const R=Math.max(0,Math.ceil((w-E)/f)),D=Math.min(d.outWidth,(d.inWidth+w-E)/f);for(let F=0;F<d.inChannels;++F)for(let _=0;_<d.outChannels;++_){let P=0;for(let z=0;z<d.batchSize;++z)for(let H=T;H<I;++H){const G=N+H*p-y;for(let Z=R;Z<D;++Z){const J=E+Z*f-w;x?P+=v.get(z,G,J,F)*k.get(z,H,Z,_):P+=v.get(z,F,G,J)*k.get(z,_,H,Z)}}b.set(P,N,E,F,_)}}}return t.makeTensorInfo(b.shape,b.dtype,b.values)}const yD={kernelName:Qc,backendName:"cpu",kernelFunc:bD};function wD(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,filter:r}=e,{inputShape:i,strides:a,pad:l,dataFormat:c,dimRoundingMode:u}=s;ce([o,r],"conv2dBackpropInput");const h=fe(r.shape),d=fe(o.shape);let p=ns(c);const f=$t(i,r.shape,a,1,l,u,!1,p),m=new It(f.inShape,"float32"),g=m.values,x=t.data.get(o.dataId).values,b=t.data.get(r.dataId).values,[w,y,C]=h,{batchSize:$,filterHeight:v,filterWidth:k,inChannels:N,inHeight:T,inWidth:I,outChannels:E,outHeight:R,outWidth:D,strideHeight:F,strideWidth:_}=f;p=f.dataFormat;const P=v-1-f.padInfo.top,z=k-1-f.padInfo.left,H=p==="channelsLast",G=m.strides[0],Z=H?m.strides[1]:m.strides[2],J=H?m.strides[2]:1,Q=H?1:m.strides[1],j=d[0],Y=H?d[1]:d[2],ne=H?d[2]:1,oe=H?1:d[1];for(let le=0;le<$;++le)for(let ae=0;ae<N;++ae)for(let pe=0;pe<T;++pe){const ue=pe-P,Ie=Math.max(0,Math.ceil(ue/F)),Le=Math.min(R,(v+ue)/F);for(let Ne=0;Ne<I;++Ne){const Te=Ne-z,de=Math.max(0,Math.ceil(Te/_)),$e=Math.min(D,(k+Te)/_);let Me=0;for(let Ve=Ie;Ve<Le;++Ve){const Ct=Ve*F-ue;for(let Xt=de;Xt<$e;++Xt){const us=Xt*_-Te,ln=j*le+Y*Ve+ne*Xt,hs=w*(v-1-Ct)+y*(k-1-us)+C*ae;for(let Ls=0;Ls<E;++Ls){const Ms=x[ln+oe*Ls],Ps=b[hs+Ls];Me+=Ms*Ps}}}const Qe=G*le+Z*pe+J*Ne+Q*ae;g[Qe]=Me}}return t.makeTensorInfo(m.shape,m.dtype,m.values)}const CD={kernelName:pa,backendName:"cpu",kernelFunc:wD};function ID(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r}=e,{strides:i,pad:a,dilations:l}=s;ce([o,r],"conv3d");const c=bs(o.shape,r.shape,i,l,a),{filterDepth:u,filterHeight:h,filterWidth:d,dilationDepth:p,dilationHeight:f,dilationWidth:m,padInfo:g}=c,x=g.front,b=g.left,w=g.top,y=new It(c.outShape,o.dtype),C=t.data.get(o.dataId).values,$=t.data.get(r.dataId).values,v=y.values,k=fe(o.shape),N=fe(r.shape);for(let T=0;T<c.batchSize;++T){const I=T*k[0],E=T*y.strides[0];for(let R=0;R<c.outDepth;++R){const D=E+R*y.strides[1],F=R*c.strideDepth-x;for(let _=0;_<u;++_){const P=F+_*p;if(P<0||P>=c.inDepth)continue;const z=_*N[0],H=I+P*k[1];for(let G=0;G<c.outHeight;++G){const Z=D+G*y.strides[2],J=G*c.strideHeight-w;for(let Q=0;Q<h;++Q){const j=J+Q*f;if(j<0||j>=c.inHeight)continue;const Y=z+Q*N[1],ne=H+j*k[2];for(let oe=0;oe<c.outWidth;++oe){const le=Z+oe*c.outChannels,ae=oe*c.strideWidth-b;for(let pe=0;pe<d;++pe){const ue=ae+pe*m;if(ue<0||ue>=c.inWidth)continue;const Ie=Y+pe*N[2],Le=ne+ue*c.inChannels;let Ne=Ie;for(let Te=0;Te<c.inChannels;++Te){const de=C[Le+Te];for(let $e=0;$e<c.outChannels;++$e)v[le+$e]+=de*$[Ne+$e];Ne+=c.outChannels}}}}}}}}return t.makeTensorInfo(y.shape,y.dtype,y.values)}const $D={kernelName:fa,backendName:"cpu",kernelFunc:ID};function vD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,dy:r}=e,{strides:i,pad:a,filterShape:l}=s;ce([o,r],"conv3dBackpropFilterV2");const c=fe(o.shape),u=fe(r.shape),h=bs(o.shape,l,i,1,a),d=h.strideDepth,p=h.strideHeight,f=h.strideWidth,m=h.filterDepth,g=h.filterHeight,x=h.filterWidth,b=new It(h.filterShape,"float32"),w=b.values,[y,C,$,v]=b.strides,k=t.data.get(r.dataId).values,[N,T,I,E]=u,R=t.data.get(o.dataId).values,[D,F,_,P]=c,z=h.padInfo.front,H=h.padInfo.left,G=h.padInfo.top;for(let Z=0;Z<m;++Z){const J=Math.max(0,Math.ceil((z-Z)/d)),Q=Math.min(h.outDepth,(h.inDepth+z-Z)/d),j=Z*y;for(let Y=0;Y<g;++Y){const ne=Math.max(0,Math.ceil((G-Y)/p)),oe=Math.min(h.outHeight,(h.inHeight+G-Y)/p),le=Y*C+j;for(let ae=0;ae<x;++ae){const pe=Math.max(0,Math.ceil((H-ae)/f)),ue=Math.min(h.outWidth,(h.inWidth+H-ae)/f),Ie=ae*$+le;for(let Le=0;Le<h.inChannels;++Le){const Ne=Le*v+Ie;for(let Te=0;Te<h.outChannels;++Te){let de=0;for(let $e=0;$e<h.batchSize;++$e){const Me=$e*D,Qe=$e*N;for(let Ve=J;Ve<Q;++Ve){const Xt=(Z+Ve*d-z)*F+Me,us=Ve*T+Qe;for(let ln=ne;ln<oe;++ln){const Ls=(Y+ln*p-G)*_+Xt,Ms=ln*I+us;for(let Ps=pe;Ps<ue;++Ps){const xp=(ae+Ps*f-H)*P+Ls,bp=Ps*E+Ms;de+=R[xp+Le]*k[bp+Te]}}}}w[Ne+Te]=de}}}}}return t.makeTensorInfo(b.shape,b.dtype,b.values)}const kD={kernelName:eu,backendName:"cpu",kernelFunc:vD};function SD(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,filter:r}=e,{pad:i,strides:a,inputShape:l}=s;ce([o],"conv3dBackpropInputV2");const c=fe(o.shape),u=fe(r.shape),h=bs(l,r.shape,a,1,i),d=new It(h.inShape,"float32"),p=d.values,[f,m,g,x]=d.strides,b=t.data.get(o.dataId).values,[w,y,C,$]=c,v=t.data.get(r.dataId).values,[k,N,T,I]=u,{batchSize:E,filterDepth:R,filterHeight:D,filterWidth:F,inChannels:_,inDepth:P,inHeight:z,inWidth:H,outChannels:G,outDepth:Z,outHeight:J,outWidth:Q,strideDepth:j,strideHeight:Y,strideWidth:ne}=h,oe=R-1-h.padInfo.front,le=D-1-h.padInfo.top,ae=F-1-h.padInfo.left;for(let pe=0;pe<E;++pe)for(let ue=0;ue<_;++ue)for(let Ie=0;Ie<P;++Ie){const Le=Ie-oe,Ne=Math.max(0,Math.ceil(Le/j)),Te=Math.min(Z,(R+Le)/j);for(let de=0;de<z;++de){const $e=de-le,Me=Math.max(0,Math.ceil($e/Y)),Qe=Math.min(J,(D+$e)/Y);for(let Ve=0;Ve<H;++Ve){const Ct=Ve-ae,Xt=Math.max(0,Math.ceil(Ct/ne)),us=Math.min(Q,(F+Ct)/ne);let ln=0;for(let hs=Ne;hs<Te;++hs){const Ls=hs*j-Le;for(let Ms=Me;Ms<Qe;++Ms){const Ps=Ms*Y-$e;for(let ea=Xt;ea<us;++ea){const xp=ea*ne-Ct,bp=w*pe+y*hs+C*Ms+$*ea,qH=k*(R-1-Ls)+N*(D-1-Ps)+T*(F-1-xp)+I*ue;for(let _c=0;_c<G;++_c){const KH=b[bp+_c],jH=v[qH+_c];ln+=KH*jH}}}}p[f*pe+m*Ie+g*de+x*Ve+ue]=ln}}}return t.makeTensorInfo(d.shape,d.dtype,d.values)}const ND={kernelName:tu,backendName:"cpu",kernelFunc:SD};const TD=ze(Cr,n=>Math.cos(n)),ED={kernelName:Cr,backendName:"cpu",kernelFunc:TD};const RD=ze(Ir,n=>Math.cosh(n)),AD={kernelName:Ir,backendName:"cpu",kernelFunc:RD};function DD(n){const{inputs:e,backend:t,attrs:s}=n,{image:o,boxes:r,boxInd:i}=e,{cropSize:a,method:l,extrapolationValue:c}=s,[u,h,d,p]=o.shape,f=r.shape[0],[m,g]=a,x=ke([f,m,g,p],"float32"),b=t.data.get(r.dataId).values,w=t.data.get(i.dataId).values,y=t.data.get(o.dataId).values,C=fe(o.shape),$=fe(x.shape);for(let v=0;v<f;v++){const k=v*4,N=b[k],T=b[k+1],I=b[k+2],E=b[k+3],R=w[v];if(R>=u)continue;const D=m>1?(I-N)*(h-1)/(m-1):0,F=g>1?(E-T)*(d-1)/(g-1):0;for(let _=0;_<m;_++){const P=m>1?N*(h-1)+_*D:.5*(N+I)*(h-1);if(P<0||P>h-1){for(let z=0;z<g;z++)for(let H=0;H<p;H++){const G=H+z*$[2]+_*$[1]+v*$[0];x.values[G]=c}continue}if(l==="bilinear"){const z=Math.floor(P),H=Math.ceil(P),G=P-z;for(let Z=0;Z<g;Z++){const J=g>1?T*(d-1)+Z*F:.5*(T+E)*(d-1);if(J<0||J>d-1){for(let ne=0;ne<p;ne++){const oe=ne+Z*$[2]+_*$[1]+v*$[0];x.values[oe]=c}continue}const Q=Math.floor(J),j=Math.ceil(J),Y=J-Q;for(let ne=0;ne<p;ne++){let oe=ne+Q*C[2]+z*C[1]+R*C[0];const le=y[oe];oe=ne+j*C[2]+z*C[1]+R*C[0];const ae=y[oe];oe=ne+Q*C[2]+H*C[1]+R*C[0];const pe=y[oe];oe=ne+j*C[2]+H*C[1]+R*C[0];const ue=y[oe],Ie=le+(ae-le)*Y,Le=pe+(ue-pe)*Y;oe=ne+Z*$[2]+_*$[1]+v*$[0],x.values[oe]=Ie+(Le-Ie)*G}}}else for(let z=0;z<g;++z){const H=g>1?T*(d-1)+z*F:.5*(T+E)*(d-1);if(H<0||H>d-1){for(let J=0;J<p;J++){const Q=J+z*$[2]+_*$[1]+v*$[0];x.values[Q]=c}continue}const G=Math.round(H),Z=Math.round(P);for(let J=0;J<p;J++){const Q=J+G*C[2]+Z*C[1]+R*C[0],j=J+z*$[2]+_*$[1]+v*$[0];x.values[j]=y[Q]}}}}return t.makeTensorInfo(x.shape,x.dtype,x.values)}const FD={kernelName:su,backendName:"cpu",kernelFunc:DD};function _D(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,exclusive:i,reverse:a}=s;ce(o,"cumprod");const l=Ze([r],o.shape.length);let c=o;l!=null&&(c=jt({inputs:{x:o},backend:t,attrs:{perm:l}}));const u=nt(1,o.shape.length)[0];if(u!==c.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${u}`);const h=Yt(c.dtype,"int32"),d=Vc(K(c.shape),h),p=t.data.get(c.dataId).values,f=c.shape[c.shape.length-1],m=a?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<p.length;x+=f)for(let b=0;b<f;b++){const w=m(x,b);if(b===0)d[w]=i?1:p[w];else{const y=m(x,b-1);d[w]=i?p[y]*d[y]:p[w]*d[y]}}const g=t.makeTensorInfo(c.shape,h,d);if(l!=null){const x=ys(l),b=jt({inputs:{x:g},backend:t,attrs:{perm:x}});return t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(c),b}return g}const OD={kernelName:nu,backendName:"cpu",kernelFunc:_D};function LD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,exclusive:i,reverse:a}=s;ce(o,"cumsum");const l=Ze([r],o.shape.length);let c=o;l!=null&&(c=jt({inputs:{x:o},backend:t,attrs:{perm:l}}));const u=nt(1,o.shape.length)[0];if(u!==c.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${u}`);const h=Yt(c.dtype,"int32"),d=Rt(K(c.shape),h),p=t.data.get(c.dataId).values,f=c.shape[c.shape.length-1],m=a?(x,b)=>x+f-b-1:(x,b)=>x+b;for(let x=0;x<p.length;x+=f)for(let b=0;b<f;b++){const w=m(x,b);if(b===0)d[w]=i?0:p[w];else{const y=m(x,b-1);d[w]=i?p[y]+d[y]:p[w]+d[y]}}const g=t.makeTensorInfo(c.shape,h,d);if(l!=null){const x=ys(l),b=jt({inputs:{x:g},backend:t,attrs:{perm:x}});return t.disposeIntermediateTensorInfo(g),t.disposeIntermediateTensorInfo(c),b}return g}const MD={kernelName:ma,backendName:"cpu",kernelFunc:LD};function PD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,weights:r}=e,{size:i,binaryOutput:a}=s;if(o.shape.length===1){const l=t.data.get(o.dataId).values,c=t.data.get(r.dataId).values,u=zd(l,c,r.dtype,r.shape,i);return t.makeTensorInfo([i],r.dtype,u)}else if(o.shape.length===2){const l=t.bufferSync(o),c=t.bufferSync(r),u=h0(l,c,i,a);return t.makeTensorInfo(u.shape,r.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${o.shape.length}.`)}const zD={kernelName:ou,backendName:"cpu",kernelFunc:PD};function BD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{blockSize:r,dataFormat:i}=s;S(i==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${i}`);const a=o.shape[0],l=o.shape[1],c=o.shape[2],u=o.shape[3],h=l*r,d=c*r,p=u/(r*r),f=t.data.get(o.dataId).values,m=new Float32Array(a*h*d*p);let g=0;for(let x=0;x<a;++x)for(let b=0;b<h;++b){const w=Math.floor(b/r),y=b%r;for(let C=0;C<d;++C){const $=Math.floor(C/r),v=C%r,k=(y*r+v)*p;for(let N=0;N<p;++N){const I=N+k+u*($+c*(w+l*x));m[g++]=f[I]}}}return t.makeTensorInfo([a,h,d,p],o.dtype,m)}const VD={kernelName:ru,backendName:"cpu",kernelFunc:BD};function m1(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r}=e,{strides:i,pad:a,dilations:l,dimRoundingMode:c}=s;ce([o,r],"depthwiseConv2DNative");const u=fe(o.shape),h=fe(r.shape);let d=l;d==null&&(d=[1,1]),S(At(i,d),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${d}'`);const p=$t(o.shape,r.shape,i,d,a,c,!0),{filterHeight:f,filterWidth:m,dilationHeight:g,dilationWidth:x,padInfo:b}=p,w=b.left,y=b.top,C=p.outChannels/p.inChannels,$=new It(p.outShape,o.dtype),v=t.data.get(o.dataId).values,k=t.data.get(r.dataId).values,N=$.values;for(let T=0;T<p.batchSize;++T){const I=T*u[0],E=T*$.strides[0];for(let R=0;R<p.outHeight;++R){const D=E+R*$.strides[1],F=R*p.strideHeight-y;for(let _=0;_<f;++_){const P=F+_*g;if(P<0||P>=p.inHeight)continue;const z=_*h[0],H=I+P*u[1];for(let G=0;G<p.outWidth;++G){const Z=D+G*$.strides[2],J=G*p.strideWidth-w;for(let Q=0;Q<m;++Q){const j=J+Q*x;if(j<0||j>=p.inWidth)continue;const Y=z+Q*h[1],ne=H+j*p.inChannels;let oe=Z,le=Y;for(let ae=0;ae<p.inChannels;++ae){const pe=v[ne+ae];for(let ue=0;ue<C;++ue)N[oe+ue]+=pe*k[le+ue];oe+=C,le+=C}}}}}}return t.makeTensorInfo($.shape,$.dtype,$.values)}const WD={kernelName:ga,backendName:"cpu",kernelFunc:m1};function UD(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,dy:r}=e,{strides:i,dilations:a,pad:l,dimRoundingMode:c,filterShape:u}=s;ce([o,r],"depthwiseConv2dNativeBackpropFilter");const h=$t(o.shape,u,i,a,l,c,!0),{strideHeight:d,strideWidth:p,filterHeight:f,filterWidth:m}=h,g=new It(h.filterShape,"float32"),x=h.padInfo.left,b=h.padInfo.top,w=h.outChannels/h.inChannels,y=t.data.get(o.dataId).values,C=new It(o.shape,o.dtype,y),$=t.data.get(r.dataId).values,v=new It(r.shape,r.dtype,$);for(let k=0;k<f;++k){const N=Math.max(0,Math.ceil((b-k)/d)),T=Math.min(h.outHeight,(h.inHeight+b-k)/d);for(let I=0;I<m;++I){const E=Math.max(0,Math.ceil((x-I)/p)),R=Math.min(h.outWidth,(h.inWidth+x-I)/p);for(let D=0;D<h.outChannels;++D){const F=Math.trunc(D/w),_=D%w;let P=0;for(let z=0;z<h.batchSize;++z)for(let H=N;H<T;++H){const G=k+H*d-b;for(let Z=E;Z<R;++Z){const J=I+Z*p-x;P+=C.get(z,G,J,F)*v.get(z,H,Z,D)}}g.set(P,k,I,F,_)}}}return t.makeTensorInfo(g.shape,g.dtype,g.values)}const GD={kernelName:iu,backendName:"cpu",kernelFunc:UD};function HD(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,filter:r}=e,{strides:i,dilations:a,pad:l,dimRoundingMode:c,inputShape:u}=s;ce([o,r],"depthwiseConv2DNativeBackpropInput");const h=fe(o.shape),d=fe(r.shape),p=$t(u,r.shape,i,a,l,c,!0),f=new It(p.inShape,"float32"),m=f.values,[g,x,b]=f.strides,w=t.data.get(o.dataId).values,[y,C,$]=h,v=t.data.get(r.dataId).values,[k,N,T]=d,{batchSize:I,filterHeight:E,filterWidth:R,inChannels:D,inHeight:F,inWidth:_,outChannels:P,outHeight:z,outWidth:H,strideHeight:G,strideWidth:Z}=p,J=E-1-p.padInfo.top,Q=R-1-p.padInfo.left,j=P/D;for(let Y=0;Y<I;++Y)for(let ne=0;ne<D;++ne)for(let oe=0;oe<F;++oe){const le=oe-J,ae=Math.max(0,Math.ceil(le/G)),pe=Math.min(z,(E+le)/G);for(let ue=0;ue<_;++ue){const Ie=ue-Q,Le=Math.max(0,Math.ceil(Ie/Z)),Ne=Math.min(H,(R+Ie)/Z);let Te=0;for(let de=ae;de<pe;++de){const $e=de*G-le;for(let Me=Le;Me<Ne;++Me){const Qe=Me*Z-Ie,Ve=y*Y+C*de+$*Me,Ct=k*(E-1-$e)+N*(R-1-Qe)+T*ne;for(let Xt=0;Xt<j;++Xt){const us=ne*j+Xt,ln=w[Ve+us],hs=v[Ct+Xt];Te+=ln*hs}}}m[g*Y+x*oe+b*ue+ne]=Te}}return t.makeTensorInfo(f.shape,f.dtype,f.values)}const qD={kernelName:au,backendName:"cpu",kernelFunc:HD};function KD(n){const{inputs:e,backend:t}=n,{x:s}=e,o=K(s.shape),r=t.data.get(s.dataId).values,i=ke([o,o],s.dtype),a=i.values;for(let c=0;c<r.length;c++)a[c*o+c]=r[c];const l=[...s.shape,...s.shape];return t.makeTensorInfo(l,i.dtype,i.values)}const jD={kernelName:Rp,backendName:"cpu",kernelFunc:KD};const XD={kernelName:xa,backendName:"cpu",kernelFunc:({inputs:n,backend:e,attrs:t})=>{const{x:s,filter:o}=n,{strides:r,pad:i,dilations:a}=t,l=e,c=l.data.get(s.dataId).values,u=s.shape.length,h=l.data.get(o.dataId).values,d=o.shape.length,{batchSize:p,inHeight:f,inWidth:m,inChannels:g,outHeight:x,outWidth:b,padInfo:w,strideHeight:y,strideWidth:C,filterHeight:$,filterWidth:v,dilationHeight:k,dilationWidth:N,outShape:T}=ui(s.shape,o.shape,r,i,"NHWC",a),I=K(T),E=T.length,R=et(s.dtype,I);for(let F=0;F<p;++F)for(let _=0;_<x;++_){const P=_*y-w.top;for(let z=0;z<b;++z){const H=z*C-w.left;for(let G=0;G<g;++G){let Z=Number.MIN_SAFE_INTEGER;for(let Q=0;Q<$;++Q){const j=P+Q*k;if(j>=0&&j<f)for(let Y=0;Y<v;++Y){const ne=H+Y*N;if(ne>=0&&ne<m){const oe=_n([F,j,ne,G],u,fe(s.shape)),le=_n([Q,Y,G],d,fe(o.shape)),ae=c[oe]+h[le];ae>Z&&(Z=ae)}}}const J=_n([F,_,z,G],E,fe(T));R[J]=Z}}}return{dataId:l.write(Ws(R,s.dtype),T,s.dtype),shape:T,dtype:s.dtype}}};const YD={kernelName:cu,backendName:"cpu",kernelFunc:({inputs:n,backend:e,attrs:t})=>{const{x:s,filter:o,dy:r}=n,{strides:i,pad:a,dilations:l}=t,c=e,u=Cn(s.shape,c.data.get(s.dataId).values),h=Cn(o.shape,c.data.get(o.dataId).values),{batchSize:d,inHeight:p,inWidth:f,inChannels:m,outHeight:g,outWidth:x,padInfo:b,strideHeight:w,strideWidth:y,filterHeight:C,filterWidth:$,dilationHeight:v,dilationWidth:k,outShape:N}=ui(s.shape,o.shape,i,a,"NHWC",l);S(r.rank===N.length,()=>`Error in ${cu}, dy must have the same rank as output ${N.length}, but got ${r.rank}`);const T=Cn(N,c.data.get(r.dataId).values),I=kp(o.shape,o.dtype);for(let R=0;R<d;++R)for(let D=0;D<g;++D){const F=D*w-b.top;for(let _=0;_<x;++_){const P=_*y-b.left;for(let z=0;z<m;++z){let H=Number.MIN_SAFE_INTEGER,G=0,Z=0;for(let J=0;J<C;++J){const Q=F+J*v;if(Q>=0&&Q<p)for(let j=0;j<$;++j){const Y=P+j*k;if(Y>=0&&Y<f){const ne=u[R][Q][Y][z]+h[J][j][z];ne>H&&(H=ne,G=J,Z=j)}}}I[G][Z][z]+=T[R][D][_][z]}}}return{dataId:c.write(Ws(I,s.dtype),o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};const ZD={kernelName:lu,backendName:"cpu",kernelFunc:({inputs:n,backend:e,attrs:t})=>{const{x:s,filter:o,dy:r}=n,{strides:i,pad:a,dilations:l}=t,c=e,u=Cn(s.shape,c.data.get(s.dataId).values),h=Cn(o.shape,c.data.get(o.dataId).values),{batchSize:d,inHeight:p,inWidth:f,inChannels:m,outHeight:g,outWidth:x,padInfo:b,strideHeight:w,strideWidth:y,filterHeight:C,filterWidth:$,dilationHeight:v,dilationWidth:k,outShape:N}=ui(s.shape,o.shape,i,a,"NHWC",l);S(r.rank===N.length,()=>`Error in ${lu}, dy must have the same rank as output ${N.length}, but got ${r.rank}`);const T=Cn(N,c.data.get(r.dataId).values),I=kp(s.shape,s.dtype);for(let R=0;R<d;++R)for(let D=0;D<g;++D){const F=D*w-b.top;for(let _=0;_<x;++_){const P=_*y-b.left;for(let z=0;z<m;++z){let H=Number.MIN_SAFE_INTEGER,G=F<0?0:F,Z=P<0?0:P;for(let J=0;J<C;++J){const Q=F+J*v;if(Q>=0&&Q<p)for(let j=0;j<$;++j){const Y=P+j*k;if(Y>=0&&Y<f){const ne=u[R][Q][Y][z]+h[J][j][z];ne>H&&(H=ne,G=Q,Z=Y)}}}I[R][G][Z][z]+=T[R][D][_][z]}}}return{dataId:c.write(Ws(I,s.dtype),s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};function JD(n){const{inputs:e,backend:t,attrs:s}=n,{image:o}=e,{canvas:r,options:i}=s,{contextOptions:a,imageOptions:l}=i||{},c=(l==null?void 0:l.alpha)||1,u=(a==null?void 0:a.contextType)||"2d";if(u!=="2d")throw new Error(`Context type ${a.contextType} is not supported by the CPU backend.`);const h=r.getContext(u,(a==null?void 0:a.contextAttributes)||{});if(h==null)throw new Error(`Could not get the context with ${u} type.`);const[d,p]=o.shape.slice(0,2),f=o.shape.length===2?1:o.shape[2],m=t.data.get(o.dataId).values,g=o.dtype==="float32"?255:1,x=new Uint8ClampedArray(p*d*4);for(let w=0;w<d*p;++w){const y=[0,0,0,255*c];for(let $=0;$<f;$++){const v=m[w*f+$];if(o.dtype==="float32"){if(v<0||v>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${v}.`)}else if(o.dtype==="int32"&&(v<0||v>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${v}.`);f===1?(y[0]=v*g,y[1]=v*g,y[2]=v*g):y[$]=v*g}const C=w*4;x[C+0]=Math.round(y[0]),x[C+1]=Math.round(y[1]),x[C+2]=Math.round(y[2]),x[C+3]=Math.round(y[3])}r.width=p,r.height=d;const b=new ImageData(x,p,d);return h.putImageData(b,0,0),o}const QD={kernelName:mw,backendName:"cpu",kernelFunc:JD};function Vi(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s;ce(o,"sum");let a;o.dtype==="bool"?a=As({inputs:{x:o},backend:t,attrs:{dtype:"int32"}}):a=Xn({inputs:{x:o},backend:t});const l=a.shape.length,c=ve(r,a.shape),u=Ze(c,l);let h=c,d=a;u!=null&&(d=jt({inputs:{x:a},backend:t,attrs:{perm:u}}),h=nt(h.length,l)),kt("sum",h,d.shape.length);const[p,f]=yt(d.shape,h),m=Yt(d.dtype,"int32");let g=ac(t,p,m);const x=K(f),b=t.data.get(g.dataId).values,w=t.data.get(d.dataId).values;for(let y=0;y<b.length;++y){const C=y*x;let $=0;for(let v=0;v<x;++v)$+=w[C+v];b[y]=$}if(i){const y=at(g.shape,c),C=g;g=qe({inputs:{x:g},backend:t,attrs:{shape:y}}),t.disposeIntermediateTensorInfo(C)}return t.disposeIntermediateTensorInfo(a),u!=null&&t.disposeIntermediateTensorInfo(d),g}const eF={kernelName:Ya,backendName:"cpu",kernelFunc:Vi};function tF(n){const{inputs:e,backend:t,attrs:s}=n,{equation:o}=s,r=e,{allDims:i,summedDims:a,idDims:l}=jh(o,r.length);Yh(i.length,l,r);const{path:c,steps:u}=Zh(a,l),h=u.length;let d=null,p=i.length;const f=[];for(let m=0;m<h;++m){for(const g of u[m]){const{permutationIndices:x,expandDims:b}=Xh(p,l[g]);let w;Jh(x)?w=r[g]:(w=jt({inputs:{x:r[g]},backend:t,attrs:{perm:x}}),f.push(w));const y=w.shape.slice();for(let C=0;C<b.length;++C)y.splice(b[C],0,1);_e(w.shape,y)||(w=qe({inputs:{x:w},backend:t,attrs:{shape:y}}),f.push(w)),d===null?d=w:(d=lc({inputs:{a:w,b:d},backend:t}),f.push(d))}m<h-1&&(c[m]>=0&&(d=Vi({inputs:{x:d},backend:t,attrs:{axis:c[m]-(i.length-p),keepDims:!1}}),f.push(d)),p--)}for(const m of f)m!==d&&t.disposeIntermediateTensorInfo(m);return d}const nF={kernelName:uu,backendName:"cpu",kernelFunc:tF};function sF(n){const{inputs:e,backend:t}=n,{dy:s,y:o}=e;ce([s,o],"eluGrad");const r=new Float32Array(K(o.shape)),i=t.data.get(o.dataId).values,a=t.data.get(s.dataId).values;for(let l=0;l<i.length;++l){const c=i[l];c>=0?r[l]=a[l]:r[l]=a[l]*(c+1)}return t.makeTensorInfo(o.shape,"float32",r)}const oF={kernelName:hu,backendName:"cpu",kernelFunc:sF};const rF=Bh,iF=Vh,aF=Wh,lF=Uh,cF=Gh,uF=Hh,hF=ze(kr,n=>{const e=Math.sign(n),t=Math.abs(n),s=1/(1+rF*t);return e*(1-((((uF*s+cF)*s+lF)*s+aF)*s+iF)*s*Math.exp(-t*t))}),dF={kernelName:kr,backendName:"cpu",kernelFunc:hF};function hc(n){const{inputs:e,backend:t,attrs:s}=n,{input:o}=e,{dim:r}=s,i=o.shape.length,a=o.shape.slice();let l=r;return r<0&&(S(-(i+1)<=r,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),l=i+r+1),a.splice(l,0,1),qe({inputs:{x:o},backend:t,attrs:{shape:a}})}const pF={kernelName:ya,backendName:"cpu",kernelFunc:hc};const fF=it((n,e)=>n/e),Hd=xt($r,fF),qd={kernelName:$r,backendName:"cpu",kernelFunc:Hd};function g1(n,e,t){const s=n.shape,o=s[0],r=s[1],i=t.data.get(n.dataId),a=i.complexTensorInfos.real,l=i.complexTensorInfos.imag,c=[o,r],u=K(c),h=Et("float32",u),d=Et("float32",u);for(let g=0;g<o;g++){const x=xo({inputs:{x:a},backend:t,attrs:{begin:[g,0],size:[1,r]}}),b=xo({inputs:{x:l},backend:t,attrs:{begin:[g,0],size:[1,r]}}),w=Qt({inputs:{real:x,imag:b},backend:t}),{real:y,imag:C}=mF(w,e,t),$=is(y,C);for(let v=0;v<r;v++){const k=qh($,v);h[g*r+v]=k.real,d[g*r+v]=k.imag}t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(b),t.disposeIntermediateTensorInfo(w)}const p=t.makeTensorInfo(c,"float32",h),f=t.makeTensorInfo(c,"float32",d),m=Qt({inputs:{real:p,imag:f},backend:t});return t.disposeIntermediateTensorInfo(p),t.disposeIntermediateTensorInfo(f),m}function mF(n,e,t){const s=K(n.shape),o=t.data.get(n.dataId),r=t.data.get(o.complexTensorInfos.real.dataId).values,i=t.data.get(o.complexTensorInfos.imag.dataId).values;if(gF(s)){const a=Kd(r,i,s,e,t),l=[n.shape[0],n.shape[1]];if(e){const c=t.makeTensorInfo(l,"float32",a.real),u=t.makeTensorInfo(l,"float32",a.imag),h=t.makeTensorInfo([],"float32",fs(s,"float32")),d=Xn({inputs:{x:h},backend:t}),p=qd.kernelFunc({inputs:{a:c,b:h},backend:t}),f=qd.kernelFunc({inputs:{a:u,b:d},backend:t}),m=t.data.get(p.dataId).values,g=t.data.get(f.dataId).values;return t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(h),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(p),t.disposeIntermediateTensorInfo(f),{real:m,imag:g}}return a}else{const a=is(r,i),l=xF(a,s,e);return Km(l)}}function gF(n){return(n&n-1)===0}function Kd(n,e,t,s,o){if(t===1)return{real:n,imag:e};const r=is(n,e),i=t/2,a=jm(r),l=a.real,c=a.imag,u=[l.length],h=o.makeTensorInfo(u,"float32",l),d=o.makeTensorInfo(u,"float32",c),p=Qt({inputs:{real:h,imag:d},backend:o}),f=Xm(r),m=f.real,g=f.imag,x=[m.length],b=o.makeTensorInfo(x,"float32",m),w=o.makeTensorInfo(x,"float32",g),y=Qt({inputs:{real:b,imag:w},backend:o}),C=Kd(l,c,i,s,o),$=C.real,v=C.imag,k=[$.length],N=o.makeTensorInfo(k,"float32",$),T=o.makeTensorInfo(k,"float32",v),I=Qt({inputs:{real:N,imag:T},backend:o}),E=Kd(m,g,i,s,o),R=E.real,D=E.imag,F=[R.length],_=o.makeTensorInfo(F,"float32",R),P=o.makeTensorInfo(F,"float32",D),z=Qt({inputs:{real:_,imag:P},backend:o}),H=Zm(t,s),G=[H.real.length],Z=o.makeTensorInfo(G,"float32",H.real),J=o.makeTensorInfo(G,"float32",H.imag),Q=Qt({inputs:{real:Z,imag:J},backend:o}),j=lc({inputs:{a:Q,b:z},backend:o}),Y=Yo({inputs:{a:I,b:j},backend:o}),ne=Ud({inputs:{a:I,b:j},backend:o}),oe=mo({inputs:{input:Y},backend:o}),le=mo({inputs:{input:ne},backend:o}),ae=Zo({inputs:{input:Y},backend:o}),pe=Zo({inputs:{input:ne},backend:o}),ue=Jo({inputs:[oe,le],backend:o,attrs:{axis:0}}),Ie=Jo({inputs:[ae,pe],backend:o,attrs:{axis:0}}),Le=o.data.get(ue.dataId).values,Ne=o.data.get(Ie.dataId).values;return o.disposeIntermediateTensorInfo(h),o.disposeIntermediateTensorInfo(d),o.disposeIntermediateTensorInfo(p),o.disposeIntermediateTensorInfo(b),o.disposeIntermediateTensorInfo(w),o.disposeIntermediateTensorInfo(y),o.disposeIntermediateTensorInfo(N),o.disposeIntermediateTensorInfo(T),o.disposeIntermediateTensorInfo(I),o.disposeIntermediateTensorInfo(_),o.disposeIntermediateTensorInfo(P),o.disposeIntermediateTensorInfo(z),o.disposeIntermediateTensorInfo(Z),o.disposeIntermediateTensorInfo(J),o.disposeIntermediateTensorInfo(Q),o.disposeIntermediateTensorInfo(j),o.disposeIntermediateTensorInfo(Y),o.disposeIntermediateTensorInfo(ne),o.disposeIntermediateTensorInfo(oe),o.disposeIntermediateTensorInfo(ae),o.disposeIntermediateTensorInfo(le),o.disposeIntermediateTensorInfo(pe),o.disposeIntermediateTensorInfo(ue),o.disposeIntermediateTensorInfo(Ie),{real:Le,imag:Ne}}function xF(n,e,t){const s=new Float32Array(e*2);for(let o=0;o<e;o++){let r=0,i=0;for(let a=0;a<e;a++){const l=Jm(o*a,e,t),c=qh(n,a);r+=c.real*l.real-c.imag*l.imag,i+=c.real*l.imag+c.imag*l.real}t&&(r/=e,i/=e),Ym(s,r,i,o)}return s}function bF(n){const{inputs:e,backend:t}=n,{input:s}=e,o=K(s.shape),r=s.shape[s.shape.length-1],i=o/r,a=qe({inputs:{x:s},backend:t,attrs:{shape:[i,r]}}),l=g1(a,!1,t),c=qe({inputs:{x:l},backend:t,attrs:{shape:s.shape}});return t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(l),c}const yF={kernelName:du,backendName:"cpu",kernelFunc:bF};function jd(n){const{backend:e,attrs:t}=n,{shape:s,value:o,dtype:r}=t,i=r||To(o),a=et(i,K(s));return CF(a,o,i),e.makeTensorInfo(s,i,a)}const wF={kernelName:pu,backendName:"cpu",kernelFunc:jd};function CF(n,e,t){n.fill(e)}const IF={kernelName:fu,backendName:"cpu",kernelFunc:({inputs:n,attrs:e,backend:t})=>{const{image:s}=n,o=t,r=Et(s.dtype,K(s.shape)),[i,a,l,c]=s.shape,u=o.data.get(s.dataId).values;for(let d=0;d<i;d++){const p=d*l*a*c;for(let f=0;f<a;f++){const m=f*(l*c);for(let g=0;g<l;g++){const x=g*c;for(let b=0;b<c;b++){const w=Math.round(l-g-1),y=p+m+x+b;let C=u[y];if(w>=0&&w<l){const $=w*c,v=p+m+$+b;C=u[v]}r[y]=C}}}}return{dataId:o.write(r,s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};function $F(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r,bias:i,preluActivationWeights:a}=e,{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d,activation:p,leakyreluAlpha:f}=s;let m=f1({inputs:{x:o,filter:r},backend:t,attrs:{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d}});if(i){const g=m;if(u==="NCHW"&&i.shape.length===1&&i.shape[0]!==1){const x=qe({inputs:{x:i},backend:t,attrs:{shape:[i.shape[0],1,1]}});m=Yo({inputs:{a:m,b:x},backend:t}),t.disposeIntermediateTensorInfo(x)}else m=Yo({inputs:{a:m,b:i},backend:t});t.disposeIntermediateTensorInfo(g)}if(p){const g=m;if(u==="NCHW"&&p==="prelu"&&a.shape.length===1&&a.shape[0]!==1){const x=qe({inputs:{x:a},backend:t,attrs:{shape:[a.shape[0],1,1]}});m=uc(t,m,p,x,f),t.disposeIntermediateTensorInfo(x)}else m=uc(t,m,p,a,f);t.disposeIntermediateTensorInfo(g)}return m}const vF={kernelName:ol,backendName:"cpu",kernelFunc:$F};function kF(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r,bias:i,preluActivationWeights:a}=e,{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d,activation:p,leakyreluAlpha:f}=s;let m=m1({inputs:{x:o,filter:r},backend:t,attrs:{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d}});if(i){const g=m;m=Yo({inputs:{a:m,b:i},backend:t}),t.disposeIntermediateTensorInfo(g)}if(p){const g=m;m=uc(t,m,p,a,f),t.disposeIntermediateTensorInfo(g)}return m}const SF={kernelName:Xp,backendName:"cpu",kernelFunc:kF};function NF(n){const{inputs:e,backend:t}=n,{params:s,indices:o}=e,r=K(s.shape),i=o.shape,a=i[i.length-1],[l,c,u,h]=Dh(s,o);if(c===0)return t.makeTensorInfo(l,s.dtype,[]);const d=t.data.get(o.dataId).values,p=t.bufferSync(s),f=I0(d,p,s.dtype,c,a,u,h,s.shape,r);return t.makeTensorInfo(l,s.dtype,f.values)}const TF={kernelName:Ap,backendName:"cpu",kernelFunc:NF};function EF(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,indices:r}=e,{axis:i,batchDims:a}=s;ce([o,r],"gatherV2");const l=ve(i,o.shape)[0],c=t.data.get(r.dataId).values,u=o.shape[l];for(let y=0;y<c.length;++y){const C=c[y];S(C<=u-1&&C>=0,()=>`GatherV2: the index value ${C} is not in [0, ${u-1}]`)}let h=a;a==null&&(h=0);const d=K(r.shape),p=dg(o,r,l,h),f=qe({inputs:{x:o},backend:t,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),m=qe({inputs:{x:r},backend:t,attrs:{shape:[p.batchSize,d/p.batchSize]}}),g=[p.batchSize,p.outerSize,d/p.batchSize,p.sliceSize],x=t.bufferSync(m),b=t.bufferSync(f),w=$0(b,x,g);return t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(m),t.makeTensorInfo(p.outputShape,w.dtype,w.values)}const RF={kernelName:Ca,backendName:"cpu",kernelFunc:EF};function AF(n){const{inputs:e,backend:t}=n,{input:s}=e,o=K(s.shape),r=s.shape[s.shape.length-1],i=o/r,a=qe({inputs:{x:s},backend:t,attrs:{shape:[i,r]}}),l=g1(a,!0,t),c=qe({inputs:{x:l},backend:t,attrs:{shape:s.shape}});return t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(l),c}const DF={kernelName:mu,backendName:"cpu",kernelFunc:AF};const FF=ze(Dr,n=>Number.isFinite(n)?1:0,"bool"),_F={kernelName:Dr,backendName:"cpu",kernelFunc:FF};const OF=ze(Fr,n=>Math.abs(n)===1/0?1:0,"bool"),LF={kernelName:Fr,backendName:"cpu",kernelFunc:OF};const MF=ze(_r,n=>Number.isNaN(n)?1:0,"bool"),PF={kernelName:_r,backendName:"cpu",kernelFunc:MF};function zF(n){const{backend:e,attrs:t}=n,{start:s,stop:o,num:r}=t,i=T0(s,o,r);return e.makeTensorInfo([i.length],"float32",i)}const BF={kernelName:Dp,backendName:"cpu",kernelFunc:zF};const VF=ze(Lr,n=>Math.log1p(n)),WF={kernelName:Lr,backendName:"cpu",kernelFunc:VF};const UF=it((n,e)=>n&&e),GF=xt(Sa,UF,null,"bool"),HF={kernelName:Sa,backendName:"cpu",kernelFunc:GF};const qF=ze(Na,n=>n?0:1,"bool"),KF={kernelName:Na,backendName:"cpu",kernelFunc:qF};const jF=it((n,e)=>n||e),XF=xt(Ta,jF,null,"bool"),YF={kernelName:Ta,backendName:"cpu",kernelFunc:XF};function ZF(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{depthRadius:r,bias:i,alpha:a,beta:l}=s;ce(o,"LRN");const c=o.shape[3],u=c-1,h=t.data.get(o.dataId).values,d=K(o.shape),p=new Float32Array(d);function f(m){const g=m%c;let x=m-g+Math.max(0,g-r);const b=m-g+Math.min(g+r,u);let w=0;for(;x<=b;x++){const y=h[x];w+=y*y}return w}for(let m=0;m<d;m++){const g=f(m),x=h[m]*Math.pow(i+a*g,-l);p[m]=x}return t.makeTensorInfo(o.shape,o.dtype,p)}const JF={kernelName:Ea,backendName:"cpu",kernelFunc:ZF};function QF(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,y:r,dy:i}=e,{depthRadius:a,bias:l,alpha:c,beta:u}=s;ce(i,"LRNGrad");const h=K(i.shape),d=i.shape[3],p=t.data.get(i.dataId).values,f=t.data.get(o.dataId).values,m=t.data.get(r.dataId).values,g=new Float32Array(h),x=h;for(let b=0;b<x;b++){const w=b%d,y=b-w+Math.max(0,w-a),C=b-w+Math.min(d,w+a+1);let $=0;for(let v=y;v<C;v++)$+=Math.pow(f[v],2);$=c*$+l;for(let v=y;v<C;v++){let k=-2*c*u*f[v]*m[b]/$;b===v&&(k+=Math.pow($,-u)),k*=p[b],g[v]+=k}}return t.makeTensorInfo(i.shape,o.dtype,g)}const e_={kernelName:xu,backendName:"cpu",kernelFunc:QF};function x1(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{reductionIndices:r,keepDims:i}=s,a=t;let l=o.shape;const c=l.length,u=ve(r,l);let h=u;const d=Ze(h,c);let p=a.data.get(o.dataId).values;if(d!=null){const y=new Array(c);for(let C=0;C<y.length;C++)y[C]=l[d[C]];p=Vd(p,l,o.dtype,d,y),h=nt(h.length,c),l=y}ce(o,"max"),kt("max",h,c);const[f,m]=yt(l,h),g=K(m),x=R0(p,g,f,o.dtype),b=a.write(x,f,o.dtype);let w=f;return i&&(w=at(f,u)),{dataId:b,shape:w,dtype:o.dtype}}const t_={kernelName:Ra,backendName:"cpu",kernelFunc:x1};function n_(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e;ce(o,"maxPool");const{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=s,c=1;S(At(i,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=un(o.shape,r,i,c,a,l);let h;if(u.filterWidth===1&&u.filterHeight===1&&_e(u.inShape,u.outShape))h=Xn({inputs:{x:o},backend:t});else{const d=t.data.get(o.dataId).values,p=fe(o.shape),f=Gd(d,o.shape,o.dtype,p,u,"max");h=t.makeTensorInfo(u.outShape,o.dtype,f.values)}return h}const s_={kernelName:Aa,backendName:"cpu",kernelFunc:n_};function o_(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{filterSize:r,strides:i,pad:a,dimRoundingMode:l,dataFormat:c}=s;ce(o,"maxPool3d");const u=ts(o.shape,r,i,1,a,l,c),h=t.data.get(o.dataId).values,d=p1(h,o.shape,o.dtype,fe(o.shape),u,"max");return t.makeTensorInfo(d.shape,"float32",d.values)}const r_={kernelName:Da,backendName:"cpu",kernelFunc:o_};function i_(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,input:r}=e,{filterSize:i,strides:a,pad:l,dimRoundingMode:c}=s;ce([o,r],"maxPool3DGrad");const u=ts(r.shape,i,a,1,l,c),h=t.bufferSync(r),d=XA(h,u),p=u.strideDepth,f=u.strideHeight,m=u.strideWidth,g=u.dilationDepth,x=u.dilationHeight,b=u.dilationWidth,w=u.effectiveFilterDepth,y=u.effectiveFilterHeight,C=u.effectiveFilterWidth,$=w-1-u.padInfo.front,v=C-1-u.padInfo.left,k=y-1-u.padInfo.top,N=ke(r.shape,"float32"),T=t.bufferSync(o);for(let I=0;I<u.batchSize;++I)for(let E=0;E<u.inChannels;++E)for(let R=0;R<u.inDepth;++R)for(let D=0;D<u.inHeight;++D)for(let F=0;F<u.inWidth;++F){const _=R-$,P=D-k,z=F-v;let H=0;for(let G=0;G<w;G+=g){const Z=(_+G)/p;if(!(Z<0||Z>=u.outDepth||Math.floor(Z)!==Z))for(let J=0;J<y;J+=x){const Q=(P+J)/f;if(!(Q<0||Q>=u.outHeight||Math.floor(Q)!==Q))for(let j=0;j<C;j+=b){const Y=(z+j)/m;if(Y<0||Y>=u.outWidth||Math.floor(Y)!==Y)continue;const ne=w*y*C-1-d.get(I,Z,Q,Y,E),oe=G*y*C+J*C+j,le=ne===oe?1:0;if(le===0)continue;const ae=T.get(I,Z,Q,Y,E);H+=ae*le}}}N.set(H,I,R,D,F,E)}return t.makeTensorInfo(N.shape,N.dtype,N.values)}const a_={kernelName:yu,backendName:"cpu",kernelFunc:i_};function l_(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,input:r,output:i}=e,a=r;ce([r,i],"maxPoolGrad");const{filterSize:l,strides:c,pad:u,dimRoundingMode:h}=s,d=un(a.shape,l,c,1,u,h),p=t.data.get(a.dataId).values,f=ke(d.outShape,a.dtype,d1(p,a.shape,a.dtype,d).values),m=d.strideHeight,g=d.strideWidth,x=d.dilationHeight,b=d.dilationWidth,w=d.effectiveFilterHeight,y=d.effectiveFilterWidth,C=y-1-d.padInfo.left,$=w-1-d.padInfo.top,v=ke(a.shape,"float32"),k=t.data.get(o.dataId).values,N=ke(o.shape,"float32",k);for(let T=0;T<d.batchSize;++T)for(let I=0;I<d.inChannels;++I)for(let E=0;E<d.inHeight;++E)for(let R=0;R<d.inWidth;++R){const D=E-$,F=R-C;let _=0;for(let P=0;P<w;P+=x){const z=(D+P)/m;if(!(z<0||z>=d.outHeight||Math.floor(z)!==z))for(let H=0;H<y;H+=b){const G=(F+H)/g;if(G<0||G>=d.outWidth||Math.floor(G)!==G)continue;const Z=w*y-1-f.get(T,z,G,I),J=P*y+H,Q=Z===J?1:0;if(Q===0)continue;const j=N.get(T,z,G,I);_+=j*Q}}v.set(_,T,E,R,I)}return t.makeTensorInfo(v.shape,v.dtype,v.values)}const c_={kernelName:bu,backendName:"cpu",kernelFunc:l_};function u_(n,e,t,s,o){const r=fe(e),i=Gd(n,e,t,r,o,"max"),a=d1(n,e,t,o,!0,s);return[i.values,a.values]}const h_={kernelName:Fp,backendName:"cpu",kernelFunc:({inputs:n,attrs:e,backend:t})=>{const{x:s}=n,{filterSize:o,strides:r,pad:i,includeBatchInIndex:a}=e,l=t;ce(s,"MaxPoolWithArgmax");const c=l.data.get(s.dataId).values,u=un(s.shape,o,r,[1,1],i),[h,d]=u_(c,s.shape,s.dtype,a,u),p=l.write(h,u.outShape,s.dtype),f=l.write(d,u.outShape,s.dtype);return[{dataId:p,shape:u.outShape,dtype:s.dtype},{dataId:f,shape:u.outShape,dtype:"int32"}]}};function d_(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s,a=ve(r,o.shape),c=yt(o.shape,a)[1],u=K(c),h=[],d=t.makeTensorInfo([],"float32",new Float32Array([u]));h.push(d);const p=As({inputs:{x:o},backend:t,attrs:{dtype:"float32"}});h.push(p);const f=Hd({inputs:{a:p,b:d},backend:t});h.push(f);const m=Vi({inputs:{x:f},backend:t,attrs:{axis:r,keepDims:i}});return h.forEach(g=>t.disposeIntermediateTensorInfo(g)),m}const p_={kernelName:Fa,backendName:"cpu",kernelFunc:d_};function f_(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s;ce(o,"min");const a=ve(r,o.shape);let l=a;const c=Ze(l,o.shape.length);let u=o;c!=null&&(u=jt({inputs:{x:o},backend:t,attrs:{perm:c}}),l=nt(l.length,o.shape.length)),kt("min",l,u.shape.length);const[h,d]=yt(u.shape,l),p=K(d),f=Rt(K(h),u.dtype),m=t.data.get(u.dataId).values;for(let x=0;x<f.length;++x){const b=x*p;let w=m[b];for(let y=0;y<p;++y){const C=m[b+y];(Number.isNaN(C)||C<w)&&(w=C)}f[x]=w}c!=null&&t.disposeIntermediateTensorInfo(u);const g=t.makeTensorInfo(h,u.dtype,f);if(i){const x=at(h,a),b=qe({inputs:{x:g},backend:t,attrs:{shape:x}});return t.disposeIntermediateTensorInfo(g),b}return g}const m_={kernelName:_a,backendName:"cpu",kernelFunc:f_};function g_(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{paddings:r,mode:i}=s;ce(o,"mirrorPad");const a=r.map((w,y)=>w[0]+o.shape[y]+w[1]),l=r.map(w=>w[0]),c=r.map((w,y)=>w[0]+o.shape[y]),u=i==="reflect"?0:1,h=t.data.get(o.dataId).values,d=o.shape.length,p=fe(o.shape),f=K(a),m=a.length,g=fe(a),x=Et(o.dtype,f);for(let w=0;w<f;w++){let y=Eo(w,m,g);for(let $=0;$<m;$++)y[$]<l[$]?y[$]=l[$]*2-y[$]-u:y[$]>=c[$]&&(y[$]=(c[$]-1)*2-y[$]+u);y=y.map(($,v)=>$-l[v]);const C=_n(y,d,p);x[w]=h[C]}return{dataId:t.write(x,a,o.dtype),shape:a,dtype:o.dtype}}const x_={kernelName:Oa,backendName:"cpu",kernelFunc:g_};const b_=it(((n,e)=>{const t=n%e;return n<0&&e<0||n>=0&&e>=0?t:(t+e)%e})),y_=xt(zr,b_),w_={kernelName:zr,backendName:"cpu",kernelFunc:y_};function b1(n){const{inputs:e,backend:t,attrs:s}=n,{logits:o}=e,{dim:r}=s,i=o.shape.length;let a=r;if(a===-1&&(a=i-1),a!==i-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${i} and dim was ${a}`);const l=ve([a],o.shape),c=x1({inputs:{x:o},backend:t,attrs:{reductionIndices:l,keepDims:!1}}),u=at(c.shape,l),h=qe({inputs:{x:c},backend:t,attrs:{shape:u}}),d=Ud({inputs:{a:o,b:h},backend:t}),p=b0({inputs:{x:d},backend:t}),f=Vi({inputs:{x:p},backend:t,attrs:{axis:l,keepDims:!1}}),m=qe({inputs:{x:f},backend:t,attrs:{shape:u}}),g=Hd({inputs:{a:p,b:m},backend:t});return t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(h),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(p),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(m),g}const C_={kernelName:Qa,backendName:"cpu",kernelFunc:b1};function I_(n){const{inputs:e,backend:t,attrs:s}=n,{logits:o}=e,{numSamples:r,seed:i,normalized:a}=s;ce(o,"multinomial");const l=a?o:b1({inputs:{logits:o},backend:t,attrs:{dim:-1}}),c=l.shape[0],u=l.shape[1],h=t.data.get(l.dataId).values,d=[c,r],p=Rt(K(d),"int32");for(let f=0;f<c;++f){const m=f*u,g=new Float32Array(u-1);g[0]=h[m];for(let w=1;w<g.length;++w)g[w]=g[w-1]+h[m+w];const x=mh.alea(i.toString()),b=f*r;for(let w=0;w<r;++w){const y=x();p[b+w]=g.length;for(let C=0;C<g.length;C++)if(y<g[C]){p[b+w]=C;break}}}return a||t.disposeIntermediateTensorInfo(l),t.makeTensorInfo(d,"int32",p)}const $_={kernelName:_p,backendName:"cpu",kernelFunc:I_};const v_=Sh;function k_(n){const{inputs:e,backend:t,attrs:s}=n,{boxes:o,scores:r}=e,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l}=s;ce(o,"NonMaxSuppression");const c=t.data.get(o.dataId).values,u=t.data.get(r.dataId).values,{selectedIndices:h}=v_(c,u,i,a,l);return t.makeTensorInfo([h.length],"int32",new Int32Array(h))}const S_={kernelName:wu,backendName:"cpu",kernelFunc:k_};const N_=Nh;function T_(n){const{inputs:e,backend:t,attrs:s}=n,{boxes:o,scores:r}=e,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,padToMaxOutputSize:c}=s;ce(o,"NonMaxSuppressionPadded");const u=t.data.get(o.dataId).values,h=t.data.get(r.dataId).values,{selectedIndices:d,validOutputs:p}=N_(u,h,i,a,l,c);return[t.makeTensorInfo([d.length],"int32",new Int32Array(d)),t.makeTensorInfo([],"int32",new Int32Array([p]))]}const E_={kernelName:Cu,backendName:"cpu",kernelFunc:T_};const R_=Th;function A_(n){const{inputs:e,backend:t,attrs:s}=n,{boxes:o,scores:r}=e,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,softNmsSigma:c}=s;ce(o,"NonMaxSuppressionWithScore");const u=t.data.get(o.dataId).values,h=t.data.get(r.dataId).values,d=i,p=a,f=l,m=c,{selectedIndices:g,selectedScores:x}=R_(u,h,d,p,f,m);return[t.makeTensorInfo([g.length],"int32",new Int32Array(g)),t.makeTensorInfo([x.length],"float32",new Float32Array(x))]}const D_={kernelName:Iu,backendName:"cpu",kernelFunc:A_};function F_(n){const{inputs:e,backend:t,attrs:s}=n,{indices:o}=e,{dtype:r,depth:i,onValue:a,offValue:l}=s;ce(o,"oneHot");const c=K(o.shape),u=new Float32Array(c*i);u.fill(l);const h=t.data.get(o.dataId).values;for(let d=0;d<c;++d)h[d]>=0&&h[d]<i&&(u[d*i+h[d]]=a);return t.makeTensorInfo([...o.shape,i],r,u)}const __={kernelName:za,backendName:"cpu",kernelFunc:F_};function dc(n){const{inputs:e,backend:t}=n,{x:s}=e;if(s.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(s.dtype==="complex64"){const o=mo({inputs:{input:s},backend:t}),r=dc({inputs:{x:o},backend:t}),i=Zo({inputs:{input:s},backend:t}),a=dc({inputs:{x:i},backend:t}),l=Qt({inputs:{real:r,imag:a},backend:t});return t.disposeIntermediateTensorInfo(o),t.disposeIntermediateTensorInfo(r),t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(a),l}else return jd({backend:t,attrs:{shape:s.shape,value:0,dtype:s.dtype}})}const O_={kernelName:nl,backendName:"cpu",kernelFunc:dc};function y1(n){const{inputs:e,backend:t}=n,{x:s}=e;if(s.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(s.dtype==="complex64"){const o=mo({inputs:{input:s},backend:t}),r=y1({inputs:{x:o},backend:t}),i=Zo({inputs:{input:s},backend:t}),a=dc({inputs:{x:i},backend:t}),l=Qt({inputs:{real:r,imag:a},backend:t});return t.disposeIntermediateTensorInfo(o),t.disposeIntermediateTensorInfo(r),t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(a),l}else return jd({backend:t,attrs:{shape:s.shape,value:1,dtype:s.dtype}})}const L_={kernelName:Pa,backendName:"cpu",kernelFunc:y1};function w1(n){const{inputs:e,backend:t,attrs:s}=n,{axis:o}=s;if(e.length===1)return hc({inputs:{input:e[0]},backend:t,attrs:{dim:o}});const r=e[0].shape,i=e[0].dtype;e.forEach(u=>{Lc(r,u.shape,"All tensors passed to stack must have matching shapes"),S(i===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});const a=[],l=e.map(u=>{const h=hc({inputs:{input:u},backend:t,attrs:{dim:o}});return a.push(h),h}),c=Jo({inputs:l,backend:t,attrs:{axis:o}});return a.forEach(u=>t.disposeIntermediateTensorInfo(u)),c}const M_={kernelName:Ba,backendName:"cpu",kernelFunc:w1};function P_(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{paddings:r,constantValue:i}=s;ce(o,"pad");const a=r.map((b,w)=>b[0]+o.shape[w]+b[1]),l=r.map(b=>b[0]),c=t.data.get(o.dataId).values,u=K(o.shape),h=o.shape.length,d=fe(o.shape),p=K(a),f=a.length,m=fe(a),g=Et(o.dtype,p);i!==0&&g.fill(i);for(let b=0;b<u;b++){const y=Eo(b,h,d).map(($,v)=>$+l[v]),C=_n(y,f,m);g[C]=c[b]}return{dataId:t.write(g,a,o.dtype),shape:a,dtype:o.dtype}}const C1={kernelName:Va,backendName:"cpu",kernelFunc:P_};const z_=it((n,e)=>Math.pow(n,e)),B_=xt(Vr,z_),V_={kernelName:Vr,backendName:"cpu",kernelFunc:B_};function W_(n){const{inputs:e,backend:t,attrs:s}=n,{paramsNestedSplits:o,paramsDenseValues:r,indices:i}=e,{outputRaggedRank:a}=s,l=o.map(x=>t.data.get(x.dataId).values),c=o.map(x=>x.shape),u=t.data.get(r.dataId).values,h=t.data.get(i.dataId).values,[d,p,f]=M0(l,c,u,r.shape,r.dtype,h,i.shape),m=d.map(x=>t.makeTensorInfo([x.length],"int32",x)),g=t.makeTensorInfo(f,r.dtype,p);return m.concat([g])}const U_={kernelName:Op,backendName:"cpu",kernelFunc:W_};function G_(n){const{inputs:e,backend:t}=n,{starts:s,limits:o,deltas:r}=e,i=t.data.get(s.dataId).values,a=t.data.get(o.dataId).values,l=t.data.get(r.dataId).values,[c,u]=z0(i,s.shape,s.dtype,a,o.shape,l,r.shape),h=t.makeTensorInfo([c.length],"int32",c),d=t.makeTensorInfo([u.length],s.dtype,u);return[h,d]}const H_={kernelName:Lp,backendName:"cpu",kernelFunc:G_};function q_(n){const{inputs:e,backend:t,attrs:s}=n,{shape:o,values:r,defaultValue:i,rowPartitionTensors:a}=e,{rowPartitionTypes:l}=s,c=t.data.get(o.dataId).values,u=t.data.get(r.dataId).values,h=t.data.get(i.dataId).values,d=a.map(g=>t.data.get(g.dataId).values),p=a.map(g=>g.shape),[f,m]=W0(c,o.shape,u,r.shape,r.dtype,h,i.shape,d,p,l);return t.makeTensorInfo(f,r.dtype,m)}const K_={kernelName:Mp,backendName:"cpu",kernelFunc:q_};function j_(n){const{backend:e,attrs:t}=n,{start:s,stop:o,dtype:r,step:i}=t,a=U0(s,o,i,r);return e.makeTensorInfo([a.length],r,a)}const X_={kernelName:$u,backendName:"cpu",kernelFunc:j_};const Y_=ze(Wr,n=>1/n),Z_={kernelName:Wr,backendName:"cpu",kernelFunc:Y_};function J_(n){const{inputs:e,backend:t,attrs:s}=n,{images:o}=e,{alignCorners:r,halfPixelCenters:i,size:a}=s;ce(o,"resizeBilinear");const l=fe(o.shape),[c,u]=a,[h,d,p,f]=o.shape,m=t.data.get(o.dataId).values,g=new Float32Array(K([h,c,u,f])),x=[r&&c>1?d-1:d,r&&u>1?p-1:p],b=[r&&c>1?c-1:c,r&&u>1?u-1:u];let w=0;const y=x[0]/b[0],C=x[1]/b[1];for(let $=0;$<h;$++)for(let v=0;v<c;v++){let k;i?k=y*(v+.5)-.5:k=y*v;const N=Math.max(0,Math.floor(k)),T=k-N,I=Math.min(d-1,Math.ceil(k)),E=$*l[0]+N*l[1],R=$*l[0]+I*l[1];for(let D=0;D<u;D++){let F;i?F=C*(D+.5)-.5:F=C*D;const _=Math.max(0,Math.floor(F)),P=F-_,z=Math.min(p-1,Math.ceil(F)),H=E+_*l[2],G=R+_*l[2],Z=E+z*l[2],J=R+z*l[2];for(let Q=0;Q<f;Q++){const j=m[H+Q],Y=m[G+Q],ne=m[Z+Q],oe=m[J+Q],le=j+(ne-j)*P,ae=Y+(oe-Y)*P,pe=le+(ae-le)*T;g[w++]=pe}}}return t.makeTensorInfo([h,c,u,f],"float32",g)}const Q_={kernelName:qa,backendName:"cpu",kernelFunc:J_};function eO(n){const{inputs:e,backend:t,attrs:s}=n,{images:o,dy:r}=e,{alignCorners:i}=s;ce([r,o],"resizeBilinearGrad");const a=fe(o.shape),[l,c,u,h]=o.shape,[,d,p]=r.shape,f=new Float32Array(l*c*u*h),m=[i&&d>1?c-1:c,i&&p>1?u-1:u],g=[i&&d>1?d-1:d,i&&p>1?p-1:p],x=m[0]/g[0],b=m[1]/g[1],w=t.data.get(r.dataId).values;let y=0;for(let C=0;C<l;C++){const $=C*a[0];for(let v=0;v<d;v++){const k=v*x,N=Math.floor(k),T=Math.min(Math.ceil(k),c-1),I=$+N*a[1],E=$+T*a[1],R=k-N,D=1-R;for(let F=0;F<p;F++){const _=F*b,P=Math.floor(_),z=Math.min(Math.ceil(_),u-1),H=_-P,G=1-H,Z=I+P*a[2],J=I+z*a[2],Q=E+P*a[2],j=E+z*a[2],Y=D*G,ne=D*H,oe=R*G,le=R*H;for(let ae=0;ae<h;ae++){const pe=w[y++];f[Z+ae]+=pe*Y,f[J+ae]+=pe*ne,f[Q+ae]+=pe*oe,f[j+ae]+=pe*le}}}}return t.makeTensorInfo([l,u,c,h],"float32",f)}const tO={kernelName:Su,backendName:"cpu",kernelFunc:eO};function nO(n){const{inputs:e,backend:t,attrs:s}=n,{images:o}=e,{alignCorners:r,halfPixelCenters:i,size:a}=s;ce(o,"resizeNearestNeighbor");const l=fe(o.shape),[c,u]=a,[h,d,p,f]=o.shape,m=t.data.get(o.dataId).values,g=new Float32Array(h*c*u*f),x=[r&&c>1?d-1:d,r&&u>1?p-1:p],b=[r&&c>1?c-1:c,r&&u>1?u-1:u],w=x[0]/b[0],y=x[1]/b[1];let C=0;for(let $=0;$<h;$++){const v=$*l[0];for(let k=0;k<c;k++){const N=i?w*(k+.5):w*k;let T=Math.min(d-1,r?Math.round(N):Math.floor(N));i&&(T=Math.max(0,T));const I=v+T*l[1];for(let E=0;E<u;E++){const R=i?y*(E+.5):y*E;let D=Math.min(p-1,r?Math.round(R):Math.floor(R));i&&(D=Math.max(0,D));const F=I+D*l[2];for(let _=0;_<f;_++){const P=m[F+_];g[C++]=P}}}}return t.makeTensorInfo([h,c,u,f],o.dtype,g)}const sO={kernelName:Ha,backendName:"cpu",kernelFunc:nO};function oO(n){const{inputs:e,backend:t,attrs:s}=n,{images:o,dy:r}=e,{alignCorners:i}=s;ce([r,o],"resizeNearestNeighborGrad");const a=fe(o.shape),l=fe(r.shape),[c,u,h,d]=o.shape,[,p,f]=r.shape,m=new Float32Array(c*u*h*d),g=t.data.get(r.dataId).values,x=[i&&p>1?u-1:u,i&&f>1?h-1:h],b=[i&&p>1?p-1:p,i&&f>1?f-1:f],w=x[0]/b[0],y=x[1]/b[1],C=1/w,$=1/y,v=Math.ceil(C)*2+2,k=Math.ceil($)*2+2;for(let N=0;N<c;N++){const T=N*a[0];for(let I=0;I<u;I++){const E=T+I*a[1],R=Math.floor(I*C),D=Math.floor(R-v/2);for(let F=0;F<h;F++){const _=E+F*a[2],P=Math.floor(F*$),z=Math.floor(P-k/2);for(let H=0;H<d;H++){let G=0;for(let Z=0;Z<v;Z++){const J=Z+D;if(J<0||J>=p)continue;const Q=T+J*l[1],j=J*w,Y=Math.min(u-1,i?Math.round(j):Math.floor(j));if(I===Y)for(let ne=0;ne<k;ne++){const oe=ne+z;if(oe<0||oe>=f)continue;const le=Q+oe*l[2],ae=oe*y,pe=Math.min(h-1,i?Math.round(ae):Math.floor(ae));F===pe&&(G+=g[le+H])}}m[_+H]=G}}}}return t.makeTensorInfo(o.shape,o.dtype,m)}const rO={kernelName:ku,backendName:"cpu",kernelFunc:oO};function iO(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{dims:r}=s;ce(o,"reverse");const i=o.shape.length,a=ve(r,o.shape);if(i===0)return Xn({inputs:{x:o},backend:t});const l=new It(o.shape,o.dtype),c=t.bufferSync(o);for(let u=0;u<l.size;u++){const h=l.indexToLoc(u),d=h.slice();a.forEach(p=>d[p]=o.shape[p]-1-d[p]),l.set(c.get(...d),...h)}return t.makeTensorInfo(l.shape,l.dtype,l.values)}const aO={kernelName:Ka,backendName:"cpu",kernelFunc:iO};const lO={kernelName:Fu,backendName:"cpu",kernelFunc:({inputs:n,attrs:e,backend:t})=>{const{image:s}=n,{radians:o,fillValue:r,center:i}=e,a=t,l=Et(s.dtype,K(s.shape)),[c,u,h,d]=s.shape,[p,f]=Mh(i,u,h),m=255,g=Math.sin(o),x=Math.cos(o),b=a.data.get(s.dataId).values;for(let y=0;y<c;y++){const C=y*h*u*d;for(let $=0;$<u;$++){const v=$*(h*d);for(let k=0;k<h;k++){const N=k*d;for(let T=0;T<d;T++){const I=[c,$,k,T],E=I[2],R=I[1];let D=(E-p)*x-(R-f)*g,F=(E-p)*g+(R-f)*x;D=Math.round(D+p),F=Math.round(F+f);let _=r;if(typeof r!="number"&&(T===3?_=m:_=r[T]),D>=0&&D<h&&F>=0&&F<u){const z=F*(h*d),H=D*d,G=C+z+H+T;_=b[G]}const P=C+v+N+T;l[P]=_}}}}return{dataId:a.write(l,s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};const cO=ze(Hr,n=>{const e=Math.floor(n);return n-e<.5?Math.floor(n):n-e>.5?Math.ceil(n):e%2===0?e:e+1}),uO={kernelName:Hr,backendName:"cpu",kernelFunc:cO};function hO(n){const{inputs:e,backend:t,attrs:s}=n,{indices:o,updates:r}=e,{shape:i}=s,{sliceRank:a,numUpdates:l,sliceSize:c,strides:u,outputSize:h}=ro(r,o,i),d=!0,p=t.bufferSync(o),f=t.bufferSync(r),m=go(p,f,i,h,c,l,a,u,0,d);return t.makeTensorInfo(i,m.dtype,m.values)}const dO={kernelName:Pp,backendName:"cpu",kernelFunc:hO};function pO(n,e){let t=0,s=n.length,o=0;for(;t<s;)o=Math.floor((t+s)/2),n[o]<e?t=o+1:s=o;return s}function fO(n,e){let t=0,s=n.length,o=0;for(;t<s;)o=Math.floor((t+s)/2),n[o]<=e?t=o+1:s=o;return s}function mO(n,e,t,s,o,r){const i=et("int32",t*o);for(let a=0;a<t;++a){const l=n.slice(a*s,(a+1)*s),c=a*o;for(let u=0;u<o;++u)i[c+u]=r==="left"?pO(l,e[u+c]):fO(l,e[u+c])}return i}function gO(n){const{inputs:e,backend:t,attrs:s}=n,{sortedSequence:o,values:r}=e,{side:i}=s,a=t.data.get(o.dataId).values,l=t.data.get(r.dataId).values,c=mO(a,l,o.shape[0],o.shape[1],r.shape[1],i);return t.makeTensorInfo(r.shape,"int32",c)}const xO={kernelName:Bp,backendName:"cpu",kernelFunc:gO};function bO(n){const{inputs:e,backend:t}=n,{condition:s,t:o,e:r}=e;ce([s,o,r],"select");const i=s.shape.length,a=t.data.get(s.dataId).values,l=t.data.get(o.dataId).values,c=t.data.get(r.dataId).values,u=Yt(o.dtype,r.dtype),h=Rt(K(o.shape),u);let d=0;const p=i===0||i>1||o.shape.length===1?1:K(o.shape.slice(1));for(let f=0;f<a.length;f++)for(let m=0;m<p;m++)a[f]===1?h[d++]=l[f]:h[d++]=c[f];return t.makeTensorInfo(o.shape,u,h)}const yO={kernelName:ja,backendName:"cpu",kernelFunc:bO};const wO=_l,CO=Ol,IO=ze(Kr,n=>n>=0?CO*n:wO*(Math.exp(n)-1)),$O={kernelName:Kr,backendName:"cpu",kernelFunc:IO};const vO=ze(Yr,n=>n<0?-1:n>0?1:0),kO={kernelName:Yr,backendName:"cpu",kernelFunc:vO};const SO=ze(jr,n=>Math.sin(n)),NO={kernelName:jr,backendName:"cpu",kernelFunc:SO};const TO=ze(Xr,n=>Math.sinh(n)),EO={kernelName:Xr,backendName:"cpu",kernelFunc:TO};const I1=Math.log(11920928955078125e-23)+2,RO=ze(Jr,n=>{const e=n>-I1,t=n<I1,s=Math.exp(n);let o;return t?o=s:e?o=n:o=Math.log(1+s),o}),AO={kernelName:Jr,backendName:"cpu",kernelFunc:RO};function DO(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{blockShape:r,paddings:i}=s;ce([o],"spaceToBatchND");const a=K(r),l=[[0,0]];l.push(...i);for(let $=1+r.length;$<o.shape.length;++$)l.push([0,0]);const c=C1.kernelFunc({inputs:{x:o},backend:t,attrs:{paddings:l,constantValue:0}}),u=Ci(c.shape,r,a,!1),h=Ii(u.length,r.length,!1),d=$i(c.shape,r,a,!1),m=qe({inputs:{x:c},backend:t,attrs:{shape:u}}),b=jt({inputs:{x:m},backend:t,attrs:{perm:h}}),C=qe({inputs:{x:b},backend:t,attrs:{shape:d}});return t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(b),C}const FO={kernelName:Za,backendName:"cpu",kernelFunc:DO};function _O(n){const{inputs:e,backend:t}=n,{indices:s,values:o,denseShape:r,defaultValue:i}=e;if(r.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${r.shape}`);if(s.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${s.shape}`);if(o.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${o.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);const a=t.data.get(s.dataId).values,l=t.data.get(o.dataId).values,c=t.data.get(r.dataId).values,u=t.data.get(i.dataId).values[0],[h,d,p,f,m]=K0(a,s.shape,s.dtype,l,o.dtype,c,u);return[t.makeTensorInfo(d,s.dtype,h),t.makeTensorInfo([d[0]],o.dtype,p),t.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(g=>Number(g)))),t.makeTensorInfo([m.length],s.dtype,new Int32Array(m))]}const OO={kernelName:Vp,backendName:"cpu",kernelFunc:_O};function LO(n){const{inputs:e,backend:t}=n,{inputIndices:s,inputShape:o,newShape:r}=e;if(s.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${s.shape}`);if(o.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${o.shape}`);if(r.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${r.shape}`);const i=Array.from(t.data.get(o.dataId).values),a=t.data.get(s.dataId).values,l=Array.from(t.data.get(r.dataId).values),[c,u,h]=j0(a,s.shape,s.dtype,i,l);return[t.makeTensorInfo(u,s.dtype,c),t.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}const MO={kernelName:Wp,backendName:"cpu",kernelFunc:LO};function PO(n){const{inputs:e,backend:t}=n,{data:s,indices:o,segmentIds:r}=e;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(o.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${o.shape}`);if(r.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${r.shape}`);if(o.shape[0]!==r.shape[0])throw new Error("segmentIds and indices should have same size.");const i=t.data.get(s.dataId).values,a=t.data.get(o.dataId).values,l=t.data.get(r.dataId).values,[c,u]=Wd(i,s.shape,s.dtype,a,l,!0);return t.makeTensorInfo(u,s.dtype,c)}const zO={kernelName:Up,backendName:"cpu",kernelFunc:PO};function BO(n){const{inputs:e,backend:t}=n,{data:s,indices:o,segmentIds:r}=e;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(o.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${o.shape}`);if(r.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${r.shape}`);if(o.shape[0]!==r.shape[0])throw new Error("segmentIds and indices should have same size.");const i=t.data.get(s.dataId).values,a=t.data.get(o.dataId).values,l=t.data.get(r.dataId).values,[c,u]=Wd(i,s.shape,s.dtype,a,l);return t.makeTensorInfo(u,s.dtype,c)}const VO={kernelName:Gp,backendName:"cpu",kernelFunc:BO};function WO(n){const{inputs:e,backend:t,attrs:s}=n,{sparseIndices:o,sparseValues:r,defaultValue:i}=e,{outputShape:a}=s,{sliceRank:l,numUpdates:c,sliceSize:u,strides:h,outputSize:d}=ro(r,o,a),p=!1,f=t.bufferSync(o);let m;switch(r.dtype){case"bool":{const g=t.bufferSync(r),x=!!t.data.get(i.dataId).values[0];m=go(f,g,a,d,u,c,l,h,x,p);break}case"float32":{const g=t.bufferSync(r),x=t.data.get(i.dataId).values[0];m=go(f,g,a,d,u,c,l,h,x,p);break}case"int32":{const g=t.bufferSync(r),x=t.data.get(i.dataId).values[0];m=go(f,g,a,d,u,c,l,h,x,p);break}case"string":{const g=t.bufferSync(r),x=gs(t.data.get(i.dataId).values[0]);m=go(f,g,a,d,u,c,l,h,x,p);break}default:throw new Error(`Unsupported type ${r.dtype}`)}return t.makeTensorInfo(a,m.dtype,m.values)}const UO={kernelName:Hp,backendName:"cpu",kernelFunc:WO};function GO(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{numOrSizeSplits:r,axis:i}=s,a=ve(i,o.shape)[0],l=Qh(o,r,a),c=new Array(o.shape.length).fill(0),u=o.shape.slice();return l.map(h=>{const d=[...u];d[a]=h;const p=xo({inputs:{x:o},backend:t,attrs:{begin:c,size:d}});return c[a]+=h,p})}const HO={kernelName:Ja,backendName:"cpu",kernelFunc:GO};const qO={kernelName:Nu,backendName:"cpu",kernelFunc:({inputs:n,backend:e})=>{const{x:t}=n,s=e;ce(t,"square");const o=s.data.get(t.dataId).values,r=new Float32Array(o.length);for(let a=0;a<o.length;++a){const l=o[a];r[a]=l*l}return{dataId:s.write(r,t.shape,t.dtype),shape:t.shape,dtype:t.dtype}}};const KO=ze(ri,(n,e)=>{const t=e;return isNaN(n)?NaN:n>0?1:t.alpha}),jO={kernelName:ri,backendName:"cpu",kernelFunc:KO};function XO(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{begin:r,end:i,strides:a,beginMask:l,endMask:c,ellipsisMask:u,newAxisMask:h,shrinkAxisMask:d}=s;ce(o,"stridedSlice");const{finalShapeSparse:p,finalShape:f,isIdentity:m,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:y}=Bm(o.shape,r,i,a,l,c,u,h,d);let C;if(m)C=qe({inputs:{x:o},backend:t,attrs:{shape:f}});else if(g||x){S(o.shape.length>=1,()=>`Input must have rank at least 1, got: ${o.shape.length}`);const $=Mm(b,w,y),v=xo({inputs:{x:o},backend:t,attrs:{begin:b,size:$}});C=qe({inputs:{x:v},backend:t,attrs:{shape:f}}),t.disposeIntermediateTensorInfo(v)}else{const $=t.bufferSync(o),v=Z0(p,$,y,b);C=t.makeTensorInfo(f,v.dtype,v.values)}return C}const YO={kernelName:Eu,backendName:"cpu",kernelFunc:XO};function ZO(n){const{inputs:e,backend:t,attrs:s}=n,{separator:o,nGramWidths:r,leftPad:i,rightPad:a,padWidth:l,preserveShortSequences:c}=s,{data:u,dataSplits:h}=e,d=t.data.get(u.dataId).values,p=t.data.get(h.dataId).values,[f,m]=J0(d,p,o,r,i,a,l,c);return[t.makeTensorInfo([f.length],"string",f),t.makeTensorInfo(h.shape,"int32",m)]}const JO={kernelName:qp,backendName:"cpu",kernelFunc:ZO};function QO(n){const{inputs:e,backend:t,attrs:s}=n,{skipEmpty:o}=s,{input:r,delimiter:i}=e;if(r.dtype!=="string")throw new Error("Input must be of datatype string");if(r.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${r.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);const a=t.data.get(r.dataId).values,l=t.data.get(i.dataId).values[0],[c,u,h]=Q0(a,l,o),d=u.length;return[t.makeTensorInfo([d,2],"int32",c),t.makeTensorInfo([d],"string",u),t.makeTensorInfo([2],"int32",new Int32Array(h))]}const eL={kernelName:Kp,backendName:"cpu",kernelFunc:QO};function tL(n){const{inputs:e,backend:t,attrs:s}=n,{numBuckets:o}=s,{input:r}=e;if(r.dtype!=="string")throw new Error("Input must be of datatype string");if(o<=0)throw new Error("Number of buckets must be at least 1");const i=t.data.get(r.dataId).values,a=e1(i,o);return t.makeTensorInfo(r.shape,"int32",a)}const nL={kernelName:jp,backendName:"cpu",kernelFunc:tL};const sL=ze(ni,n=>Math.tan(n)),oL={kernelName:ni,backendName:"cpu",kernelFunc:sL};const rL=ze(si,n=>Math.tanh(n)),iL={kernelName:si,backendName:"cpu",kernelFunc:rL};function aL(n){const{inputs:e,backend:t}=n,{tensor:s,indices:o,updates:r}=e,{sliceRank:i,numUpdates:a,sliceSize:l,strides:c,outputSize:u}=ro(r,o,s.shape),h=!1,d=t.bufferSync(o),p=t.bufferSync(r),f=t.bufferSync(s),m=go(d,p,s.shape,u,l,a,i,c,f,h);return t.makeTensorInfo(s.shape,m.dtype,m.values)}const lL={kernelName:zp,backendName:"cpu",kernelFunc:aL};function cL(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{reps:r}=s;ce(o,"tile");const i=n1(t.bufferSync(o),r);return t.makeTensorInfo(i.shape,i.dtype,i.values)}const uL={kernelName:oi,backendName:"cpu",kernelFunc:cL};function hL(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{k:r,sorted:i}=s;ce(o,"topk");const a=t.data.get(o.dataId).values,[l,c]=o1(a,o.shape,o.dtype,r,i);return[t.makeTensorInfo(l.shape,l.dtype,l.values),t.makeTensorInfo(c.shape,c.dtype,c.values)]}const dL={kernelName:Ru,backendName:"cpu",kernelFunc:hL};function pL(n){const{inputs:e,attrs:t,backend:s}=n,{image:o,transforms:r}=e,{interpolation:i,fillMode:a,fillValue:l,outputShape:c}=t,[u,h,d,p]=o.shape,[f,m]=c!=null?c:[h,d],g=[u,f,m,p],x=fe(o.shape),b=x[0],w=x[1],y=x[2],C=fe(g),$=C[0],v=C[1],k=C[2],N=Et(o.dtype,K(g));N.fill(l);const T=s.data.get(o.dataId).values,I=s.data.get(r.dataId).values;for(let R=0;R<u;++R){const D=r.shape[0]===1?I:I.subarray(R*8,R*8+8);for(let F=0;F<f;++F)for(let _=0;_<m;++_)for(let P=0;P<p;++P){let z;const H=D[6]*_+D[7]*F+1;if(H===0)continue;const G=(D[0]*_+D[1]*F+D[2])/H,Z=(D[3]*_+D[4]*F+D[5])/H,J=$1(G,d,a),Q=$1(Z,h,a);switch(i){case"nearest":z=yL(T,h,d,b,w,y,R,Q,J,P,l);break;case"bilinear":z=wL(T,h,d,b,w,y,R,Q,J,P,l);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${i}`)}const j=R*$+F*v+_*k+P;N[j]=z}return s.makeTensorInfo(g,o.dtype,N)}return{dataId:s.write(N,g,o.dtype),shape:o.shape,dtype:o.dtype}}const fL={kernelName:Au,backendName:"cpu",kernelFunc:pL};function $1(n,e,t){switch(t){case"reflect":return mL(n,e);case"wrap":return gL(n,e);case"nearest":return bL(n,e);default:return xL(n)}}function mL(n,e){let t=n;if(t<0)if(e<=1)t=0;else{const s=2*e;t<s&&(t=s*Math.trunc(-t/s)+t),t=t<-e?t+s:-t-1}else if(t>e-1)if(e<=1)t=0;else{const s=2*e;t-=s*Math.trunc(t/s),t>=e&&(t=s-t-1)}return zs(0,t,e-1)}function gL(n,e){let t=n;if(t<0)if(e<=1)t=0;else{const s=e-1;t+=e*(Math.trunc(-t/s)+1)}else if(t>e-1)if(e<=1)t=0;else{const s=e-1;t-=e*Math.trunc(t/s)}return zs(0,t,e-1)}function xL(n,e){return n}function bL(n,e){return zs(0,n,e-1)}function Wi(n,e,t,s,o,r,i,a,l,c,u){const h=i*s+a*o+l*r+c;return 0<=a&&a<e&&0<=l&&l<t?n[h]:u}function yL(n,e,t,s,o,r,i,a,l,c,u){const h=Math.round(a),d=Math.round(l);return Wi(n,e,t,s,o,r,i,h,d,c,u)}function wL(n,e,t,s,o,r,i,a,l,c,u){const h=Math.floor(a),d=Math.floor(l),p=h+1,f=d+1,m=(f-l)*Wi(n,e,t,s,o,r,i,h,d,c,u)+(l-d)*Wi(n,e,t,s,o,r,i,h,f,c,u),g=(f-l)*Wi(n,e,t,s,o,r,i,p,d,c,u)+(l-d)*Wi(n,e,t,s,o,r,i,p,f,c,u);return(p-a)*m+(a-h)*g}function CL(n){const{inputs:e,attrs:t,backend:s}=n,{axis:o}=t,{x:r}=e;ce(r,"unique");const i=s.data.get(r.dataId).values,{outputValues:a,outputShape:l,indices:c}=r1(i,o,r.shape,r.dtype);return[s.makeTensorInfo(l,r.dtype,a),s.makeTensorInfo([c.length],"int32",c)]}const IL={kernelName:Du,backendName:"cpu",kernelFunc:CL};function $L(n){const{inputs:e,backend:t,attrs:s}=n,{value:o}=e;let{axis:r}=s;r<0&&(r+=o.shape.length);const i=o.shape.length,a=o.shape[r],l=new Array(i-1);let c=0;for(let p=0;p<i;p++)p!==r&&(l[c++]=o.shape[p]);const u=new Array(i).fill(0),h=o.shape.slice();h[r]=1;const d=new Array(a);for(let p=0;p<d.length;p++){u[r]=p;const f=xo({inputs:{x:o},backend:t,attrs:{begin:u,size:h}});d[p]=qe({inputs:{x:f},backend:t,attrs:{shape:l}}),t.disposeIntermediateTensorInfo(f)}return d}const vL={kernelName:el,backendName:"cpu",kernelFunc:$L};function kL(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,segmentIds:r}=e,{numSegments:i}=s;ce(o,"unsortedSegmentSum");const a=o.shape.length,l=r.shape.length,c=[],u=[],h=a-l;let d=r;for(let f=0;f<h;++f){const m=hc({inputs:{input:d},backend:t,attrs:{dim:f+1}});d=m,u.push(m)}for(let f=0;f<i;++f){const m=fs(f,"int32"),g=t.makeTensorInfo([],"int32",m),x=g0({inputs:{a:g,b:d},backend:t}),b=As({inputs:{x},backend:t,attrs:{dtype:"float32"}}),w=lc({inputs:{a:b,b:o},backend:t}),y=Vi({inputs:{x:w},backend:t,attrs:{axis:0,keepDims:!1}});c.push(y),u.push(g),u.push(x),u.push(b),u.push(w),u.push(y)}const p=w1({inputs:c,backend:t,attrs:{axis:0}});return u.forEach(f=>t.disposeIntermediateTensorInfo(f)),p}const SL={kernelName:tl,backendName:"cpu",kernelFunc:kL};const NL=[$A,sR,kA,NA,cR,EA,AA,FA,OA,MA,zA,VA,UA,qA,jA,ZA,QA,tD,sD,CA,rD,aD,cD,hR,hD,aR,pR,pD,oR,fD,gD,xD,yD,CD,$D,kD,ND,ED,AD,FD,OD,MD,zD,VD,WD,GD,qD,jD,XD,YD,ZD,QD,nF,fA,oF,fR,dF,mR,pF,xR,yF,wF,IF,yR,CR,vF,SF,TF,RF,$R,kR,rR,DF,mD,_F,LF,PF,mA,NR,ER,BF,AR,WF,HF,KF,YF,JF,e_,t_,FR,s_,r_,a_,c_,h_,p_,m_,OR,x_,w_,$_,MR,zR,S_,E_,D_,VR,__,L_,M_,C1,V_,xA,GR,U_,H_,K_,X_,iR,qd,Z_,bA,yA,wA,Q_,tO,sO,rO,aO,lO,uO,JR,dO,xO,yO,$O,eA,kO,NO,EO,tA,C_,AO,FO,OO,MO,zO,VO,UO,HO,oA,qO,iA,lA,jO,YO,JO,eL,nL,dA,eF,oL,iL,lL,uL,dL,fL,WR,IL,vL,SL,O_];for(const n of NL)Qp(n);const bo={},pc={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function TL(n,e){bo[n]=e}function Dn(n,e){if(!(n in bo)||e!=null){const s=RL(n,e);if(s!==null)bo[n]=s;else return console.log("Could not get context for WebGL version",n),null}const t=bo[n];return t==null||t.isContextLost()?(delete bo[n],Dn(n)):(t.disable(t.DEPTH_TEST),t.disable(t.STENCIL_TEST),t.disable(t.BLEND),t.disable(t.DITHER),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_COVERAGE),t.enable(t.SCISSOR_TEST),t.enable(t.CULL_FACE),t.cullFace(t.BACK),bo[n])}function EL(n){if(!U().getBool("IS_SAFARI")&&typeof OffscreenCanvas!="undefined"&&n===2)return new OffscreenCanvas(300,150);if(typeof document!="undefined")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}function RL(n,e){if(n!==1&&n!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");const t=e==null?EL(n):e;return t.addEventListener("webglcontextlost",s=>{s.preventDefault(),delete bo[n]},!1),U().getBool("SOFTWARE_WEBGL_ENABLED")&&(pc.failIfMajorPerformanceCaveat=!1),n===1?t.getContext("webgl",pc)||t.getContext("experimental-webgl",pc):t.getContext("webgl2",pc)}var Ui;(function(n){n[n.DENSE=0]="DENSE",n[n.SHARED_BATCH=1]="SHARED_BATCH"})(Ui||(Ui={}));var an;(function(n){n[n.RENDER=0]="RENDER",n[n.UPLOAD=1]="UPLOAD",n[n.PIXELS=2]="PIXELS",n[n.DOWNLOAD=3]="DOWNLOAD"})(an||(an={}));var St;(function(n){n[n.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",n[n.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",n[n.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",n[n.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",n[n.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(St||(St={}));function Gi(n,e){return[e,n]}function AL(n,e){return n*e}function fc(n){const e=K(n),t=Math.ceil(e/4);return Mc(t)}function Qo(n,e){return[Math.max(1,Math.ceil(e/2)),Math.max(1,Math.ceil(n/2))]}function DL(n,e){const[t,s]=Qo(n,e);return t*s*4}function Xd(n,e){const t=n;let s,o,r,i,a,l,c,u,h,d;return U().getNumber("WEBGL_VERSION")===2?(s=t.R32F,o=t.R16F,r=t.RGBA16F,i=t.RGBA32F,a=t.RED,c=4,u=1,h=t.HALF_FLOAT,d=t.FLOAT,l=t.RGBA8):(s=n.RGBA,o=n.RGBA,r=n.RGBA,i=t.RGBA,a=n.RGBA,c=4,u=4,h=e!=null?e.HALF_FLOAT_OES:null,d=n.FLOAT,l=n.RGBA),{internalFormatFloat:s,internalFormatHalfFloat:o,internalFormatPackedHalfFloat:r,internalFormatPackedFloat:i,textureFormatFloat:a,downloadTextureFormat:l,downloadUnpackNumChannels:c,defaultNumChannels:u,textureTypeHalfFloat:h,textureTypeFloat:d}}function ie(n,e){const t=e();return U().getBool("DEBUG")&&FL(n),t}function FL(n){const e=n.getError();if(e!==n.NO_ERROR)throw new Error("WebGL Error: "+ML(n,e))}const _L=596e-10,OL=65504;function LL(n){return!!(U().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||n===0||_L<Math.abs(n)&&Math.abs(n)<OL)}function ML(n,e){switch(e){case n.NO_ERROR:return"NO_ERROR";case n.INVALID_ENUM:return"INVALID_ENUM";case n.INVALID_VALUE:return"INVALID_VALUE";case n.INVALID_OPERATION:return"INVALID_OPERATION";case n.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case n.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case n.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${e}`}}function mc(n,e){return cs(n,()=>n.getExtension(e),'Extension "'+e+'" not supported on this browser.')}function PL(n,e){const t=cs(n,()=>n.createShader(n.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(ie(n,()=>n.shaderSource(t,e)),ie(n,()=>n.compileShader(t)),n.getShaderParameter(t,n.COMPILE_STATUS)===!1)throw console.log(n.getShaderInfoLog(t)),new Error("Failed to compile vertex shader.");return t}function zL(n,e){const t=cs(n,()=>n.createShader(n.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(ie(n,()=>n.shaderSource(t,e)),ie(n,()=>n.compileShader(t)),U().get("ENGINE_COMPILE_ONLY"))return t;if(n.getShaderParameter(t,n.COMPILE_STATUS)===!1)throw v1(e,n.getShaderInfoLog(t)),new Error("Failed to compile fragment shader.");return t}const BL=/ERROR: [0-9]+:([0-9]+):/g;function v1(n,e){const t=BL.exec(e);if(t==null){console.log(`Couldn't parse line number in error: ${e}`),console.log(n);return}const s=+t[1],o=n.split(`
`),r=o.length.toString().length+2,i=o.map((h,d)=>No((d+1).toString(),r)+h);let a=0;for(let h=0;h<i.length;h++)a=Math.max(i[h].length,a);const l=i.slice(0,s-1),c=i.slice(s-1,s),u=i.slice(s);console.log(l.join(`
`)),console.log(e.split(`
`)[0]),console.log(`%c ${No(c[0],a)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(u.join(`
`))}function VL(n){return cs(n,()=>n.createProgram(),"Unable to create WebGLProgram.")}function WL(n,e){if(ie(n,()=>n.linkProgram(e)),!U().get("ENGINE_COMPILE_ONLY")&&n.getProgramParameter(e,n.LINK_STATUS)===!1)throw console.log(n.getProgramInfoLog(e)),new Error("Failed to link vertex and fragment shaders.")}function Yd(n,e){if(ie(n,()=>n.validateProgram(e)),n.getProgramParameter(e,n.VALIDATE_STATUS)===!1)throw console.log(n.getProgramInfoLog(e)),new Error("Shader program validation failed.")}function UL(n,e){const t=cs(n,()=>n.createBuffer(),"Unable to create WebGLBuffer");return ie(n,()=>n.bindBuffer(n.ARRAY_BUFFER,t)),ie(n,()=>n.bufferData(n.ARRAY_BUFFER,e,n.STATIC_DRAW)),t}function GL(n,e){const t=cs(n,()=>n.createBuffer(),"Unable to create WebGLBuffer");return ie(n,()=>n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t)),ie(n,()=>n.bufferData(n.ELEMENT_ARRAY_BUFFER,e,n.STATIC_DRAW)),t}function HL(n){return cs(n,()=>n.createTexture(),"Unable to create WebGLTexture.")}function qL(n,e){const t=U().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(n<=0||e<=0){const s=`[${n}x${e}]`;throw new Error("Requested texture size "+s+" is invalid.")}if(n>t||e>t){const s=`[${n}x${e}]`,o=`[${t}x${t}]`;throw new Error("Requested texture size "+s+" greater than WebGL maximum on this browser / GPU "+o+".")}}function KL(n){return cs(n,()=>n.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function k1(n,e,t,s,o,r,i){const a=n.getAttribLocation(e,t);return a===-1?!1:(ie(n,()=>n.bindBuffer(n.ARRAY_BUFFER,s)),ie(n,()=>n.vertexAttribPointer(a,o,n.FLOAT,!1,r,i)),ie(n,()=>n.enableVertexAttribArray(a)),!0)}function jL(n,e,t){QL(n,t),ie(n,()=>n.activeTexture(n.TEXTURE0+t)),ie(n,()=>n.bindTexture(n.TEXTURE_2D,e))}function XL(n,e,t){return cs(n,()=>n.getUniformLocation(e,t),'uniform "'+t+'" not present in program.')}function YL(n,e,t){return n.getUniformLocation(e,t)}function ZL(n,e,t,s){ie(n,()=>jL(n,e,s)),ie(n,()=>n.uniform1i(t,s))}function Zd(n,e,t){ie(n,()=>n.bindFramebuffer(n.FRAMEBUFFER,t)),ie(n,()=>n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0))}function S1(n,e){ie(n,()=>n.bindFramebuffer(n.FRAMEBUFFER,e)),ie(n,()=>n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,null,0))}function gc(n){const e=n.checkFramebufferStatus(n.FRAMEBUFFER);if(e!==n.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+JL(n,e))}function JL(n,e){switch(e){case n.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case n.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case n.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case n.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${e}`}}function cs(n,e,t){const s=ie(n,()=>e());if(s==null)throw new Error(t);return s}function QL(n,e){const t=n.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,s=e+n.TEXTURE0;if(s<n.TEXTURE0||s>t){const o=`[gl.TEXTURE0, gl.TEXTURE${t}]`;throw new Error(`textureUnit must be in ${o}.`)}}function er(n,e=2){return K(n.slice(0,n.length-e))}function tr(n){if(n.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[n.length>1?n[n.length-2]:1,n[n.length-1]]}function xc(n){let e=[1,1,1];return n.length===0||n.length===1&&n[0]===1||(e=[er(n),...tr(n)]),e}function eM(n,e=!1){let t=U().getNumber("WEBGL_MAX_TEXTURE_SIZE"),s=U().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");s===1/0&&U().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(s=t/2),e&&(t=t*2,s=s*2,n=n.map((a,l)=>l>=n.length-2?wn(n[l]):n[l]),n.length===1&&(n=[2,n[0]])),n.length!==2&&(n=ds(n).newShape);let o=K(n),r=null;n.length<=1&&o<=t?r=[1,o]:n.length===2&&n[0]<=t&&n[1]<=t?r=n:n.length===3&&n[0]*n[1]<=t&&n[2]<=t?r=[n[0]*n[1],n[2]]:n.length===3&&n[0]<=t&&n[1]*n[2]<=t?r=[n[0],n[1]*n[2]]:n.length===4&&n[0]*n[1]*n[2]<=t&&n[3]<=t?r=[n[0]*n[1]*n[2],n[3]]:n.length===4&&n[0]<=t&&n[1]*n[2]*n[3]<=t&&(r=[n[0],n[1]*n[2]*n[3]]);const i=r!=null&&Math.max(...r)>s&&Math.min(...r)<=(e?2:1)&&Math.min(...r)>0;if(r==null||i)if(e){const a=er(n);let l=2,c=2;n.length&&([l,c]=tr(n)),o=a*(l/2)*(c/2),r=Mc(o).map(u=>u*2)}else r=Mc(o);return r}function bc(n){return n%2===0}function yc(n,e){if(n=n.slice(-2),e=e.slice(-2),_e(n,e)||!n.length||!e.length||n[0]===0||n[1]===0||e[0]===0||e[1]===0)return!0;if(n.length!==e.length){const t=n[n.length-1],s=e[e.length-1];if(t===s||bc(t)&&bc(s)&&(n[0]===1||e[0]===1))return!0}return n[1]===e[1]&&bc(n[0])&&bc(e[0])}let Jd,Qd;function tM(n){if(Jd==null){const e=Dn(n);Jd=e.getParameter(e.MAX_TEXTURE_SIZE)}return Jd}function nM(n){if(Qd==null){const e=Dn(n);Qd=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,Qd)}function sM(n){if(n===0)return 0;let e;const t=Dn(n);return bn(t,"EXT_disjoint_timer_query_webgl2")&&n===2?e=2:bn(t,"EXT_disjoint_timer_query")?e=1:e=0,e}function bn(n,e){return n.getExtension(e)!=null}function N1(n){try{if(Dn(n)!=null)return!0}catch(e){return console.log("Error when getting WebGL context: ",e),!1}return!1}function oM(n){if(n===0)return!1;const e=Dn(n);if(n===1){if(!bn(e,"OES_texture_float"))return!1}else if(!bn(e,"EXT_color_buffer_float"))return!1;return ep(e)}function rM(n){if(n===0)return!1;const e=Dn(n);if(n===1){if(!bn(e,"OES_texture_float")||!bn(e,"WEBGL_color_buffer_float"))return!1}else{if(bn(e,"EXT_color_buffer_float"))return ep(e);const s="EXT_color_buffer_half_float";if(bn(e,s)){const o=e.getExtension(s);return iM(e,o)}return!1}return ep(e)}function ep(n){const e=Xd(n),t=n.createTexture();n.bindTexture(n.TEXTURE_2D,t),n.texImage2D(n.TEXTURE_2D,0,e.internalFormatFloat,1,1,0,e.textureFormatFloat,e.textureTypeFloat,null);const r=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,r),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0);const i=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(t),n.deleteFramebuffer(r),i}function iM(n,e){const t=Xd(n,e),s=n.createTexture();n.bindTexture(n.TEXTURE_2D,s),n.texImage2D(n.TEXTURE_2D,0,t.internalFormatHalfFloat,1,1,0,t.textureFormatFloat,t.textureTypeHalfFloat,null);const i=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,s,0);const a=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(s),n.deleteFramebuffer(i),a}function aM(n){return n!==2?!1:Dn(n).fenceSync!=null}function Hi(n,e){Array.isArray(n)||(n=[n]),n.forEach(t=>{t!=null&&S(t.dtype!=="complex64",()=>`${e} does not support complex64 tensors in the WebGL backend.`)})}const he=U();he.registerFlag("HAS_WEBGL",()=>he.getNumber("WEBGL_VERSION")>0),he.registerFlag("WEBGL_VERSION",()=>N1(2)?2:N1(1)?1:0),he.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1),he.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>he.get("WEBGL_VERSION")===2),he.registerFlag("WEBGL_CPU_FORWARD",()=>!0),he.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1),he.registerFlag("WEBGL_PACK",()=>he.getBool("HAS_WEBGL")),he.registerFlag("WEBGL_PACK_NORMALIZATION",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_PACK_CLIP",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_PACK_REDUCE",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_LAZILY_UNPACK",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_CONV_IM2COL",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_PACK_CONV2DTRANSPOSE",()=>he.getBool("WEBGL_PACK")),he.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>tM(he.getNumber("WEBGL_VERSION"))),he.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>nM(he.getNumber("WEBGL_VERSION"))),he.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{const n=he.getNumber("WEBGL_VERSION");return n===0?0:sM(n)}),he.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>he.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!bf()),he.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>oM(he.getNumber("WEBGL_VERSION"))),he.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>he.getBool("WEBGL_FORCE_F16_TEXTURES")?!1:he.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")),he.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>rM(he.getNumber("WEBGL_VERSION"))),he.registerFlag("WEBGL_FENCE_API_ENABLED",()=>aM(he.getNumber("WEBGL_VERSION"))),he.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>he.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0),he.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,n=>{if(typeof n!="number")throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be a number but got ${n}.`);if(n<0&&n!==-1)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${n}.`)}),he.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>bf()?1:-1,n=>{if(typeof n!="number")throw new Error(`WEBGL_FLUSH_THRESHOLD must be a number but got ${n}.`);if(n<0&&n!==-1)throw new Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${n}.`)}),he.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128),he.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1),he.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5),he.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128),he.registerFlag("WEBGL_EXP_CONV",()=>!1),he.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>he.getBool("IS_TEST")),he.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0),he.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1),he.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1),he.registerFlag("ENGINE_COMPILE_ONLY",()=>!1);function zt(){let n,e,t,s,o,r,i,a,l,c;return U().getNumber("WEBGL_VERSION")===2?(n="#version 300 es",e="in",t="out",s="in",o="texture",r="outputColor",i="out vec4 outputColor;",a=U().getBool("WEBGL2_ISNAN_CUSTOM")?`
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
    `):(n="",e="attribute",t="varying",s="varying",o="texture2D",r="gl_FragColor",i="",a=`
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
    `),{version:n,attribute:e,varyingVs:t,varyingFs:s,texture2D:o,output:r,defineOutput:i,defineSpecialNaN:a,defineSpecialInf:l,defineRound:c}}function yo(n,e,t="index"){const s=fe(e);return s.map((o,r)=>{const i=`int ${n[r]} = ${t} / ${o}`,a=r===s.length-1?`int ${n[r+1]} = ${t} - ${n[r]} * ${o}`:`index -= ${n[r]} * ${o}`;return`${i}; ${a};`}).join("")}function wc(n,e,t="index"){const s=fe(e);return s.map((o,r)=>{const i=`int ${n[r]} = ${t} / outShapeStrides[${r}]`,a=r===s.length-1?`int ${n[r+1]} = ${t} - ${n[r]} * outShapeStrides[${r}]`:`index -= ${n[r]} * outShapeStrides[${r}]`;return`${i}; ${a};`}).join("")}function lM(n,e){const t=n.length,s=n.map(r=>`${e}[${r}]`),o=new Array(t-1);o[t-2]=s[t-1];for(let r=t-3;r>=0;--r)o[r]=`(${o[r+1]} * ${s[r+1]})`;return o}function cM(n,e,t="index"){const s=n.map((r,i)=>i),o=lM(s,e);return o.map((r,i)=>{const a=`int ${n[i]} = ${t} / ${o[i]}`,l=i===o.length-1?`int ${n[i+1]} = ${t} - ${n[i]} * ${o[i]}`:`index -= ${n[i]} * ${o[i]}`;return`${a}; ${l};`}).join("")}function tp(n){const e=fe(n).map(t=>t.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${e[0]} + coords.y * ${e[1]} + coords.z;
  }
`}function np(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}const T1=`
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
`;const{getBroadcastDims:E1}=t2;function uM(n,e,t){const s=[];if(n.forEach(p=>{const f=K(p.shapeInfo.logicalShape);if(p.shapeInfo.isUniform?s.push(`uniform float ${p.name}${f>1?`[${f}]`:""};`):(s.push(`uniform sampler2D ${p.name};`),s.push(`uniform int offset${p.name};`)),t.enableShapeUniforms){const{uniformShape:m}=sp(t.packedInputs,p.shapeInfo.logicalShape,p.shapeInfo.texShape);switch(m.length){case 1:s.push(`uniform int ${p.name}Shape;`);break;case 2:s.push(`uniform ivec2 ${p.name}Shape;`);break;case 3:s.push(`uniform ivec3 ${p.name}Shape;`);break;case 4:s.push(`uniform ivec4 ${p.name}Shape;`);break}s.push(`uniform ivec2 ${p.name}TexShape;`)}}),t.enableShapeUniforms){switch(e.logicalShape.length){case 1:s.push("uniform int outShape;");break;case 2:s.push("uniform ivec2 outShape;"),s.push("uniform int outShapeStrides;");break;case 3:s.push("uniform ivec3 outShape;"),s.push("uniform ivec2 outShapeStrides;");break;case 4:s.push("uniform ivec4 outShape;"),s.push("uniform ivec3 outShapeStrides;");break}s.push("uniform ivec2 outTexShape;")}t.customUniforms&&t.customUniforms.forEach(p=>{s.push(`uniform ${p.type} ${p.name}${p.arrayIndex?`[${p.arrayIndex}]`:""};`)});const o=s.join(`
`),r=n.map(p=>hM(p,e,t.packedInputs,t.enableShapeUniforms)).join(`
`),i=e.texShape,a=zt(),l=fM(a);let c,u,h=xM(a);return e.isPacked?(c=dM(e.logicalShape,i,t.enableShapeUniforms),u=gM(a)):(c=pM(e.logicalShape,i,t.enableShapeUniforms),u=mM(a)),t.packedInputs&&(h+=CM),[h,l,u,o,c,r,t.userCode].join(`
`)}function nr(n,e=!1){const t=n.shapeInfo.logicalShape;switch(t.length){case 0:return FM(n,e);case 1:return OM(n,e);case 2:return MM(n,e);case 3:return zM(n,e);case 4:return VM(n,e);case 5:return WM(n);case 6:return UM(n);default:throw new Error(`${t.length}-D input sampling is not yet supported`)}}function R1(n,e){switch(n.shapeInfo.logicalShape.length){case 0:return DM(n);case 1:return _M(n,e);case 2:return LM(n,e);case 3:return PM(n,e);default:return BM(n,e)}}function hM(n,e,t=!1,s){let o="";t?o+=R1(n,s):o+=nr(n,s);const r=n.shapeInfo.logicalShape,i=e.logicalShape;return r.length<=i.length&&(t?o+=GM(n,e):o+=HM(n,e)),o}function dM(n,e,t){switch(n.length){case 0:return A1();case 1:return IM(n,e,t);case 2:return RM(n,e,t);case 3:return vM(n,e,t);default:return SM(n,e,t)}}function pM(n,e,t){switch(n.length){case 0:return A1();case 1:return $M(n,e,t);case 2:return AM(n,e,t);case 3:return kM(n,e,t);case 4:return NM(n,e,t);case 5:return TM(n,e);case 6:return EM(n,e);default:throw new Error(`${n.length}-D output sampling is not yet supported`)}}function fM(n){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${n.texture2D}(textureSampler, uv).r;
    }
  `}function mM(n){return`
    void setOutput(float val) {
      ${n.output} = vec4(val, 0, 0, 0);
    }
  `}function gM(n){return`
    void setOutput(vec4 val) {
      ${n.output} = val;
    }
  `}function xM(n){return`${n.version}
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

    ${bM}
    ${yM}
    ${wM}
  `}const bM=`
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
`,yM=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,wM=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,CM=`
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
`;function A1(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function IM(n,e,t){const s=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)];return s[0]===1?t?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${s[1]}.0);
      }
    `:s[1]===1?t?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${s[0]}.0);
      }
    `:t?`
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
  `}function $M(n,e,t){return e[0]===1?t?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${e[1]}.0);
      }
    `:e[1]===1?t?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${e[0]}.0);
      }
    `:t?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      return resTexRC.x * ${e[1]} + resTexRC.y;
    }
  `}function vM(n,e,t){if(t)return`
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
  `;const s=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)],o=Math.ceil(n[2]/2),r=o*Math.ceil(n[1]/2);return`
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
  `}function kM(n,e,t){if(t)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${wc(["r","c","d"],n)}
    return ivec3(r, c, d);
  }
`;const s=yo(["r","c","d"],n);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      ${s}
      return ivec3(r, c, d);
    }
  `}function SM(n,e,t){if(t)return`
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
  `;const s=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)],o=Math.ceil(n[n.length-1]/2),r=o*Math.ceil(n[n.length-2]/2);let i=r,a="",l="b, r, c";for(let c=2;c<n.length-1;c++)i*=n[n.length-c-1],a=`
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
  `}function NM(n,e,t){if(t)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${wc(["r","c","d","d2"],n)}
      return ivec4(r, c, d, d2);
    }
  `;const s=yo(["r","c","d","d2"],n);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      ${s}
      return ivec4(r, c, d, d2);
    }
  `}function TM(n,e){const t=yo(["r","c","d","d2","d3"],n);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${e[0]},
                             ${e[1]}));

      int index = resTexRC.x * ${e[1]} + resTexRC.y;

      ${t}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function EM(n,e){const t=yo(["r","c","d","d2","d3","d4"],n);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;

      ${t}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function RM(n,e,t){const s=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)];if(_e(n,e))return t?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${s[0]}, ${s[1]}));
      }
    `;const o=Math.ceil(n[1]/2);return t?`
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
  `}function AM(n,e,t){return _e(n,e)?t?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${e[0]}, ${e[1]}));
      }
    `:n[1]===1?t?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${e[0]}, ${e[1]}));
        int index = resTexRC.x * ${e[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:n[0]===1?t?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${e[0]}, ${e[1]}));
        int index = resTexRC.x * ${e[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:t?`
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
                             vec2(${e[0]}, ${e[1]}));
      int index = resTexRC.x * ${e[1]} + resTexRC.y;
      int r = index / ${n[1]};
      int c = index - r * ${n[1]};
      return ivec2(r, c);
    }
  `}function wo(n){return`offset${n}`}function DM(n){const e=n.name,t="get"+e.charAt(0).toUpperCase()+e.slice(1),s=zt();return`
    vec4 ${t}() {
      return ${s.texture2D}(${e}, halfCR);
    }
  `}function FM(n,e){const t=n.name,s="get"+t.charAt(0).toUpperCase()+t.slice(1);if(n.shapeInfo.isUniform)return`float ${s}() {return ${t};}`;const[o,r]=n.shapeInfo.texShape;if(o===1&&r===1)return`
      float ${s}() {
        return sampleTexture(${t}, halfCR);
      }
    `;const i=wo(t);if(e)return`
    float ${s}() {
      vec2 uv = uvFromFlat(${t}TexShape[0], ${t}TexShape[1], ${i});
      return sampleTexture(${t}, uv);
    }
  `;const[a,l]=n.shapeInfo.texShape;return`
    float ${s}() {
      vec2 uv = uvFromFlat(${a}, ${l}, ${i});
      return sampleTexture(${t}, uv);
    }
  `}function _M(n,e){const t=n.name,s="get"+t.charAt(0).toUpperCase()+t.slice(1),o=n.shapeInfo.texShape,r=zt();if(e)return`
    vec4 ${s}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${t}TexShape[0]) / 2.0), ceil(float(${t}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${r.texture2D}(${t}, uv);
    }
  `;const i=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];return`
    vec4 ${s}(int index) {
      vec2 uv = packedUVfrom1D(
        ${i[0]}, ${i[1]}, index);
      return ${r.texture2D}(${t}, uv);
    }
  `}function OM(n,e){const t=n.name,s="get"+t.charAt(0).toUpperCase()+t.slice(1);if(n.shapeInfo.isUniform)return`
      float ${s}(int index) {
        ${sr(n)}
      }
    `;const o=n.shapeInfo.texShape,r=o[0],i=o[1];if(i===1&&r===1)return`
      float ${s}(int index) {
        return sampleTexture(${t}, halfCR);
      }
    `;const a=wo(t);return i===1?e?`
      float ${s}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${a}) + 0.5) / float(${t}TexShape[0]));
        return sampleTexture(${t}, uv);
      }
    `:`
      float ${s}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${a}) + 0.5) / ${r}.0);
        return sampleTexture(${t}, uv);
      }
    `:r===1?e?`
      float ${s}(int index) {
        vec2 uv = vec2((float(index + ${a}) + 0.5) / float(${t}TexShape[1]), 0.5);
        return sampleTexture(${t}, uv);
      }
    `:`
      float ${s}(int index) {
        vec2 uv = vec2((float(index + ${a}) + 0.5) / ${i}.0, 0.5);
        return sampleTexture(${t}, uv);
      }
    `:e?`
    float ${s}(int index) {
      vec2 uv = uvFromFlat(${t}TexShape[0], ${t}TexShape[1], index + ${a});
      return sampleTexture(${t}, uv);
    }
  `:`
    float ${s}(int index) {
      vec2 uv = uvFromFlat(${r}, ${i}, index + ${a});
      return sampleTexture(${t}, uv);
    }
  `}function LM(n,e){const t=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=n.shapeInfo.texShape,i=r[0],a=r[1],l=zt();if(r!=null&&_e(t,r))return e?`
      vec4 ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}TexShape[1], ${s}TexShape[0]);

        return ${l.texture2D}(${s}, uv);
      }
    `:`
      vec4 ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${a}.0, ${i}.0);

        return ${l.texture2D}(${s}, uv);
      }
    `;if(e)return`
    vec4 ${o}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${s}TexShape[0]) / 2.0), ceil(float(${s}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${s}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${l.texture2D}(${s}, uv);
    }
  `;const c=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)],u=Math.ceil(t[1]/2);return`
    vec4 ${o}(int row, int col) {
      vec2 uv = packedUVfrom2D(${u}, ${c[0]}, ${c[1]}, row, col);
      return ${l.texture2D}(${s}, uv);
    }
  `}function MM(n,e){const t=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=n.shapeInfo.texShape;if(r!=null&&_e(t,r)){if(e)return`
      float ${o}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${s}TexShape[1], ${s}TexShape[0]);
        return sampleTexture(${s}, uv);
      }
    `;const d=r[0],p=r[1];return`
    float ${o}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${p}.0, ${d}.0);
      return sampleTexture(${s}, uv);
    }
  `}const{newShape:i,keptDims:a}=ds(t),l=i;if(l.length<t.length){const d=or(n,l),p=["row","col"];return`
      ${nr(d,e)}
      float ${o}(int row, int col) {
        return ${o}(${rr(p,a)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${o}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${t[1]}, 1)));
        ${sr(n)}
      }
    `;const c=r[0],u=r[1],h=wo(s);return u===1?e?`
      float ${o}(int row, int col) {
        float index = dot(vec3(row, col, ${h}), vec3(${s}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${s}TexShape[0]));
        return sampleTexture(${s}, uv);
      }
    `:`
    float ${o}(int row, int col) {
      float index = dot(vec3(row, col, ${h}), vec3(${t[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
      return sampleTexture(${s}, uv);
    }
  `:c===1?e?`
      float ${o}(int row, int col) {
        float index = dot(vec3(row, col, ${h}), vec3(${s}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${s}TexShape[1]), 0.5);
        return sampleTexture(${s}, uv);
      }
    `:`
    float ${o}(int row, int col) {
      float index = dot(vec3(row, col, ${h}), vec3(${t[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${u}.0, 0.5);
      return sampleTexture(${s}, uv);
    }
  `:e?`
      float ${o}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${s}Shape[1] + col + ${h};
        vec2 uv = uvFromFlat(${s}TexShape[0], ${s}TexShape[1], index);
        return sampleTexture(${s}, uv);
      }
    `:`
  float ${o}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${t[1]} + col + ${h};
    vec2 uv = uvFromFlat(${c}, ${u}, index);
    return sampleTexture(${s}, uv);
  }
`}function PM(n,e){const t=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=n.shapeInfo.texShape,i=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)];if(t[0]===1){const d=t.slice(1),p=[1,2],f=or(n,d),m=["b","row","col"];return`
        ${R1(f,e)}
        vec4 ${o}(int b, int row, int col) {
          return ${o}(${rr(m,p)});
        }
      `}const a=zt();if(e)return`
    vec4 ${o}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${s}TexShape[0]) / 2.0), ceil(float(${s}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${s}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${s}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${a.texture2D}(${s}, uv);
    }
  `;const l=i[0],c=i[1],u=Math.ceil(t[2]/2),h=u*Math.ceil(t[1]/2);return`
    vec4 ${o}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${c}, ${h}, ${u}, b, row, col);
      return ${a.texture2D}(${s}, uv);
    }
  `}function zM(n,e){const t=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=t[1]*t[2],i=t[2],{newShape:a,keptDims:l}=ds(t),c=a;if(c.length<t.length){const m=or(n,c),g=["row","col","depth"];return`
        ${nr(m,e)}
        float ${o}(int row, int col, int depth) {
          return ${o}(${rr(g,l)});
        }
      `}if(n.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${r}, ${i}, 1)));
        ${sr(n)}
      }
    `;const u=n.shapeInfo.texShape,h=u[0],d=u[1],p=n.shapeInfo.flatOffset;if(d===r&&p==null)return e?`
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
      `;if(d===i&&p==null)return e?`
      float ${o}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${s}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${s}TexShape[1], ${s}TexShape[0]);
        return sampleTexture(${s}, uv);
      }
    `:`
    float ${o}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${t[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}.0, ${h}.0);
      return sampleTexture(${s}, uv);
    }
  `;const f=wo(s);return e?`
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
  `}function BM(n,e){const t=n.name,s="get"+t.charAt(0).toUpperCase()+t.slice(1),o=zt();if(e)return`
    vec4 ${s}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${t}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${t}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${t}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${t}TexShape[0]) / 2.0), ceil(float(${t}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${o.texture2D}(${t}, uv);
    }
  `;const r=n.shapeInfo.logicalShape,i=r.length,a=n.shapeInfo.texShape,l=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)],c=l[0],u=l[1],h=Math.ceil(r[i-1]/2);let d=h*Math.ceil(r[i-2]/2),p="int b, int row, int col",f=`b * ${d} + (row / 2) * ${h} + (col / 2)`;for(let m=2;m<i-1;m++)p=`int b${m}, `+p,d*=r[i-m-1],f=`b${m} * ${d} + `+f;return`
    vec4 ${s}(${p}) {
      int index = ${f};
      int texR = index / ${u};
      int texC = index - texR * ${u};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${u}, ${c});
      return ${o.texture2D}(${t}, uv);
    }
  `}function VM(n,e){const t=n.shapeInfo.logicalShape,s=n.name,o="get"+s.charAt(0).toUpperCase()+s.slice(1),r=t[3],i=t[2]*r,a=t[1]*i,{newShape:l,keptDims:c}=ds(t);if(l.length<t.length){const b=or(n,l),w=["row","col","depth","depth2"];return`
      ${nr(b,e)}
      float ${o}(int row, int col, int depth, int depth2) {
        return ${o}(${rr(w,c)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${a}, ${i}, ${r}, 1)));
        ${sr(n)}
      }
    `;const u=n.shapeInfo.flatOffset,h=n.shapeInfo.texShape,d=h[0],p=h[1],f=`int stride2 = ${s}Shape[3];`,m=`int stride1 = ${s}Shape[2] * stride2;`,g=`int stride0 = ${s}Shape[1] * stride1;`;if(p===a&&u==null)return e?`
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
    `;if(p===r&&u==null)return e?`
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
                         vec3(${t[1]*t[2]}, ${t[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${d}.0);
        return sampleTexture(${s}, uv);
      }
    `;const x=wo(s);return e?`
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
  `}function WM(n){const e=n.shapeInfo.logicalShape,t=n.name,s="get"+t.charAt(0).toUpperCase()+t.slice(1),o=e[4],r=e[3]*o,i=e[2]*r,a=e[1]*i,{newShape:l,keptDims:c}=ds(e);if(l.length<e.length){const m=or(n,l),g=["row","col","depth","depth2","depth3"];return`
      ${nr(m)}
      float ${s}(int row, int col, int depth, int depth2, int depth3) {
        return ${s}(${rr(g,c)});
      }
    `}if(n.shapeInfo.isUniform)return`
      float ${s}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${a}, ${i}, ${r}, ${o})) +
          depth3;
        ${sr(n)}
      }
    `;const u=n.shapeInfo.flatOffset,h=n.shapeInfo.texShape,d=h[0],p=h[1];if(p===a&&u==null)return`
      float ${s}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${i}, ${r}, ${o}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${p}.0, ${d}.0);
        return sampleTexture(${t}, uv);
      }
    `;if(p===o&&u==null)return`
      float ${s}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${e[1]*e[2]*e[3]},
               ${e[2]*e[3]}, ${e[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${p}.0, ${d}.0);
        return sampleTexture(${t}, uv);
      }
    `;const f=wo(t);return`
    float ${s}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${a} + col * ${i} + depth * ${r} +
          depth2 * ${o} + depth3 + ${f};
      vec2 uv = uvFromFlat(${d}, ${p}, index);
      return sampleTexture(${t}, uv);
    }
  `}function UM(n){const e=n.shapeInfo.logicalShape,t=n.name,s="get"+t.charAt(0).toUpperCase()+t.slice(1),{newShape:o,keptDims:r}=ds(e);if(o.length<e.length){const g=or(n,o),x=["row","col","depth","depth2","depth3","depth4"];return`
      ${nr(g)}
      float ${s}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${s}(${rr(x,r)});
      }
    `}const i=e[5],a=e[4]*i,l=e[3]*a,c=e[2]*l,u=e[1]*c;if(n.shapeInfo.isUniform)return`
      float ${s}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${c}, ${l}, ${a})) +
          dot(
            vec2(depth3, depth4),
            vec2(${i}, 1)));
        ${sr(n)}
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
        return sampleTexture(${t}, uv);
      }
    `;if(f===i&&h==null)return`
      float ${s}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${e[1]*e[2]*e[3]*e[4]},
               ${e[2]*e[3]*e[4]},
               ${e[3]*e[4]},
               ${e[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${p}.0);
        return sampleTexture(${t}, uv);
      }
    `;const m=wo(t);return`
    float ${s}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${c} + depth * ${l} +
          depth2 * ${a} + depth3 * ${i} + depth4 + ${m};
      vec2 uv = uvFromFlat(${p}, ${f}, index);
      return sampleTexture(${t}, uv);
    }
  `}function sr(n){const e=n.name,t=K(n.shapeInfo.logicalShape);return t<2?`return ${e};`:`
    for (int i = 0; i < ${t}; i++) {
      if (i == index) {
        return ${e}[i];
      }
    }
  `}function GM(n,e){const t=n.name,s=t.charAt(0).toUpperCase()+t.slice(1),o="get"+s+"AtOutCoords",r=n.shapeInfo.logicalShape.length,i=e.logicalShape.length,a=E1(n.shapeInfo.logicalShape,e.logicalShape),l=We(i),c=i-r;let u;const h=["x","y","z","w","u","v"];r===0?u="":i<2&&a.length>=1?u="coords = 0;":u=a.map(b=>`coords.${h[b+c]} = 0;`).join(`
`);let d="";i<2&&r>0?d="coords":d=n.shapeInfo.logicalShape.map((b,w)=>`coords.${h[w+c]}`).join(", ");let p="return outputValue;";const m=K(n.shapeInfo.logicalShape)===1,x=K(e.logicalShape)===1;if(r===1&&!m&&!x)p=`
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
  `}function HM(n,e){const t=n.name,s=t.charAt(0).toUpperCase()+t.slice(1),o="get"+s+"AtOutCoords",r=e.texShape,i=n.shapeInfo.texShape,a=n.shapeInfo.logicalShape.length,l=e.logicalShape.length;if(!n.shapeInfo.isUniform&&a===l&&n.shapeInfo.flatOffset==null&&_e(i,r))return`
      float ${o}() {
        return sampleTexture(${t}, resultUV);
      }
    `;const c=We(l),u=E1(n.shapeInfo.logicalShape,e.logicalShape),h=l-a;let d;const p=["x","y","z","w","u","v"];a===0?d="":l<2&&u.length>=1?d="coords = 0;":d=u.map(m=>`coords.${p[m+h]} = 0;`).join(`
`);let f="";return l<2&&a>0?f="coords":f=n.shapeInfo.logicalShape.map((m,g)=>`coords.${p[g+h]}`).join(", "),`
    float ${o}() {
      ${c} coords = getOutputCoords();
      ${d}
      return get${s}(${f});
    }
  `}function We(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function sp(n,e,t){const{newShape:s,keptDims:o}=ds(e),r=e.length,i=n&&r===3&&e[0]===1,a=i?e.slice(1):s,l=!n&&r>1&&!_e(e,t)&&s.length<r||i;return{useSqueezeShape:l,uniformShape:l?a:e,keptDims:o}}function or(n,e){const t=JSON.parse(JSON.stringify(n));return t.shapeInfo.logicalShape=e,t}function rr(n,e){return e.map(t=>n[t]).join(", ")}function qM(n,e,t,s){const o=t.map((u,h)=>{const d={logicalShape:u.shape,texShape:u.isUniform?null:u.texData.texShape,isUniform:u.isUniform,isPacked:u.isUniform?!1:u.texData.isPacked,flatOffset:null};return u.texData!=null&&u.texData.slice!=null&&u.texData.slice.flatOffset>0&&(d.flatOffset=u.texData.slice.flatOffset),{name:e.variableNames[h],shapeInfo:d}}),r=o.map(u=>u.shapeInfo),i={logicalShape:s.shape,texShape:s.texData.texShape,isUniform:!1,isPacked:s.texData.isPacked,flatOffset:null},a=uM(o,i,e),l=zL(n.gl,a),c=n.createProgram(l);return U().get("ENGINE_COMPILE_ONLY")?{program:e,fragmentShader:l,source:a,webGLProgram:c,inShapeInfos:r,outShapeInfo:i,variablesLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:(n.buildVao(c),Object.assign({program:e,fragmentShader:l,source:a,webGLProgram:c,inShapeInfos:r,outShapeInfo:i},D1(n,e,c)))}function D1(n,e,t){const s=[],o=[];let r,i,a,l=null,c=null;c=n.getUniformLocation(t,"NAN",!1),U().getNumber("WEBGL_VERSION")===1&&(l=n.getUniformLocation(t,"INFINITY",!1));const u=!1;for(const h of e.variableNames){const d={name:h,uniform:n.getUniformLocation(t,h,u),offset:n.getUniformLocation(t,`offset${h}`,u)};e.enableShapeUniforms&&(d.shape=n.getUniformLocation(t,`${h}Shape`,u),d.texShape=n.getUniformLocation(t,`${h}TexShape`,u)),s.push(d)}if(e.enableShapeUniforms&&(r=n.getUniformLocation(t,"outShape",u),a=n.getUniformLocation(t,"outShapeStrides",u),i=n.getUniformLocation(t,"outTexShape",u)),e.customUniforms)for(const h of e.customUniforms)o.push(n.getUniformLocation(t,h.name,u));return{variablesLocations:s,customUniformLocations:o,infLoc:l,nanLoc:c,outShapeLocation:r,outShapeStridesLocation:a,outTexShapeLocation:i}}function F1(n,e){if(n.length!==e.length)throw Error(`Binary was compiled with ${n.length} inputs, but was executed with ${e.length} inputs`);n.forEach((t,s)=>{const o=t.logicalShape,r=e[s],i=r.shape;if(!_e(o,i))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${o} and ${i} must match`);if(t.isUniform&&r.isUniform)return;const a=t.texShape,l=r.isUniform?null:r.texData.texShape;if(!_e(a,l))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${a} and ${l} must match`)})}function KM(n,e,t,s,o){e.program.enableShapeUniforms||(F1(e.inShapeInfos,t),F1([e.outShapeInfo],[s]));const r=s.texData.texture,i=s.texData.texShape;s.texData.isPacked?n.setOutputPackedMatrixTexture(r.texture,i[0],i[1]):n.setOutputMatrixTexture(r.texture,i[0],i[1]),n.setProgram(e.webGLProgram),n.bindVertexArray(e.webGLProgram.vao),U().getNumber("WEBGL_VERSION")===1&&e.infLoc!==null&&n.gl.uniform1f(e.infLoc,1/0),e.nanLoc!==null&&n.gl.uniform1f(e.nanLoc,NaN);for(let l=0;l<t.length;++l){const c=t[l],{uniform:u,offset:h,shape:d,texShape:p}=e.variablesLocations[l];if(d){const{uniformShape:f}=sp(e.program.packedInputs,c.shape,c.texData.texShape);switch(f.length){case 1:n.gl.uniform1iv(d,new Int32Array(f));break;case 2:n.gl.uniform2iv(d,new Int32Array(f));break;case 3:n.gl.uniform3iv(d,new Int32Array(f));break;case 4:n.gl.uniform4iv(d,new Int32Array(f));break}}if(p&&n.gl.uniform2i(p,c.texData.texShape[0],c.texData.texShape[1]),u!=null){if(c.isUniform){if(K(c.shape)<2)n.gl.uniform1f(u,c.uniformValues[0]);else{let f=c.uniformValues;f instanceof Float32Array||(f=new Float32Array(f)),n.gl.uniform1fv(u,f)}continue}c.texData.slice!=null&&h!=null&&n.gl.uniform1i(h,c.texData.slice.flatOffset),n.setInputMatrixTexture(c.texData.texture.texture,u,l)}}const a=e.outShapeLocation;if(a)switch(s.shape.length){case 1:n.gl.uniform1iv(a,new Int32Array(s.shape));break;case 2:n.gl.uniform2iv(a,new Int32Array(s.shape));break;case 3:n.gl.uniform3iv(a,new Int32Array(s.shape));break;case 4:n.gl.uniform4iv(a,new Int32Array(s.shape));break}if(e.outShapeStridesLocation){const l=fe(s.shape);switch(s.shape.length){case 2:n.gl.uniform1iv(e.outShapeStridesLocation,new Int32Array(l));break;case 3:n.gl.uniform2iv(e.outShapeStridesLocation,new Int32Array(l));break;case 4:n.gl.uniform3iv(e.outShapeStridesLocation,new Int32Array(l));break}}if(e.outTexShapeLocation&&n.gl.uniform2i(e.outTexShapeLocation,s.texData.texShape[0],s.texData.texShape[1]),e.program.customUniforms&&o)for(let l=0;l<e.program.customUniforms.length;++l){const c=e.program.customUniforms[l],u=e.customUniformLocations[l],h=o[l];if(c.type==="float")n.gl.uniform1fv(u,h);else if(c.type==="vec2")n.gl.uniform2fv(u,h);else if(c.type==="vec3")n.gl.uniform3fv(u,h);else if(c.type==="vec4")n.gl.uniform4fv(u,h);else if(c.type==="int")n.gl.uniform1iv(u,h);else if(c.type==="ivec2")n.gl.uniform2iv(u,h);else if(c.type==="ivec3")n.gl.uniform3iv(u,h);else if(c.type==="ivec4")n.gl.uniform4iv(u,h);else throw Error(`uniform type ${c.type} is not supported yet.`)}n.executeProgram()}function jM(n,e,t){let s="";e.concat(t).forEach(i=>{const a=i.texData!=null&&i.texData.slice!=null&&i.texData.slice.flatOffset>0;if(n.enableShapeUniforms&&!i.isUniform){const l=i.texData.texShape,{useSqueezeShape:c,uniformShape:u,keptDims:h}=sp(n.packedInputs,i.shape,l);let d="",p="",f="";if(u.length===1&&n.packedInputs){const C=[Math.ceil(l[0]/2),Math.ceil(l[1]/2)];d=`${C[0]>1}_${C[1]>1}`}else if(u.length===2&&!n.packedInputs)p=`${u[0]>1}_${u[1]>1}`;else if(u.length>2&&!n.packedInputs){const C=fe(u);f=`${C[0]===l[1]}_${C[C.length-1]===l[1]}`}const m=i.shape.length,g=u.length===2&&_e(i.shape,l),x=K(i.shape)===1,b=zo(i.shape,t.shape),w=!n.packedInputs&&m===t.shape.length&&_e(l,t.texData.texShape),y=n.packedInputs||u.length>2?"":`${l[0]>1}_${l[1]>1}`;s+=`${m}_${w}_${c?h:""}_${u.length}_${x}_${b}_${g}_${d}_${p}_${f}_${y}_${a}`}else{const l=i.isUniform?"uniform":i.texData.texShape;s+=`${i.shape}_${l}_${a}`}});const o=n.userCode;let r=n.constructor.name;return r+="_"+s+"_"+o+`${U().getNumber("WEBGL_VERSION")}`,r}function _t(n){return U().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&n<=4}class XM{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=Ui.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];const t=zt();this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?wc(["r","c","d"],e):yo(["r","c","d"],e)}
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

        ${t.output} = result;
      }
    `}}class YM{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=Ui.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];const t=zt();this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?wc(["r","c","d"],e):yo(["r","c","d"],e)}
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

        ${t.output} = result;
      }
    `}}class ZM{constructor(e){this.variableNames=["A"],this.outTexUsage=an.DOWNLOAD;const t=zt();this.outputShape=e,this.userCode=`
      ${T1}

      void main() {
        float x = getAAtOutCoords();
        ${t.output} = encode_float(x);
      }
    `}}class JM{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=an.DOWNLOAD;const t=zt();this.outputShape=e,this.userCode=`
      ${T1}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${t.output} = encode_float(x);
      }
    `}}const QM={R:0,G:1,B:2,A:3};class _1{constructor(e,t=!1,s="RGBA"){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];const o=zt();this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length);let r="result";t&&(r="floor(result * 255. + 0.5)");let i="";for(let a=0;a<s.length;a++){const l=s[a];i+=`
          if(offset == ${a}) {
            result = values[${QM[l]}];
          }`}this.userCode=`
      ${this.enableShapeUniforms?np():tp(e)}

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
    `}}class eP{constructor(e,t=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];const s=zt();this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length);let o="",r="result";t&&(r="floor(result * 255. + 0.5)");for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){const l=i*2+a;o+=`
          localCoords = coords;
          if(localCoords[2] + ${a} < ${this.enableShapeUniforms?"outShape[2]":`${e[2]}`}) {
          localCoords[2] += ${a};
          if (localCoords[1] + ${i} < ${this.enableShapeUniforms?"outShape[1]":`${e[1]}`}) {
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
        ${this.enableShapeUniforms?np():tp(e)}

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
    `}}function tP(n){const e=zt(),t=`${e.version}
    precision highp float;
    ${e.attribute} vec3 clipSpacePos;
    ${e.attribute} vec2 uv;
    ${e.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return PL(n,t)}function nP(n){const e=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return UL(n,e)}function sP(n){const e=new Uint16Array([0,1,2,2,1,3]);return GL(n,e)}function qi(n,e,t,s,o,r){qL(e,t);const i=HL(n),a=n.TEXTURE_2D;return ie(n,()=>n.bindTexture(a,i)),ie(n,()=>n.texParameteri(a,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE)),ie(n,()=>n.texParameteri(a,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)),ie(n,()=>n.texParameteri(a,n.TEXTURE_MIN_FILTER,n.NEAREST)),ie(n,()=>n.texParameteri(a,n.TEXTURE_MAG_FILTER,n.NEAREST)),U().getNumber("WEBGL_VERSION")===1?ie(n,()=>n.texImage2D(a,0,s,e,t,0,o,r,null)):ie(n,()=>n.texStorage2D(a,1,s,e,t)),ie(n,()=>n.bindTexture(n.TEXTURE_2D,null)),{texture:i,texShape:[t,e]}}function O1(n){return n.internalFormatFloat}function oP(n,e,t,s){const[o,r]=Gi(e,t);return qi(n,o,r,O1(s),s.textureFormatFloat,n.FLOAT)}function L1(n){return n.internalFormatHalfFloat}function rP(n,e,t,s){const[o,r]=Gi(e,t);return qi(n,o,r,L1(s),s.textureFormatFloat,s.textureTypeHalfFloat)}function M1(n){return n.downloadTextureFormat}function iP(n,e,t,s){const[o,r]=Gi(e,t);return qi(n,o,r,M1(s),n.RGBA,n.UNSIGNED_BYTE)}function P1(n){return n.internalFormatPackedFloat}function aP(n,e,t,s){const[o,r]=Qo(e,t);return qi(n,o,r,P1(s),n.RGBA,n.FLOAT)}function z1(n){return n.internalFormatPackedHalfFloat}function lP(n,e,t,s){const[o,r]=Qo(e,t);return qi(n,o,r,z1(s),n.RGBA,s.textureTypeHalfFloat)}function cP(n,e,t){return ie(n,()=>n.bindBuffer(n.ARRAY_BUFFER,t)),k1(n,e,"clipSpacePos",t,3,20,0)&&k1(n,e,"uv",t,2,20,12)}function uP(n,e,t,s,o,r){ie(n,()=>n.bindTexture(n.TEXTURE_2D,e));let i,a,l;o instanceof Uint8Array?(i=new Uint8Array(t*s*4),a=n.UNSIGNED_BYTE,l=n.RGBA):(i=new Float32Array(t*s*4),a=n.FLOAT,l=r.internalFormatPackedFloat),i.set(o),U().getNumber("WEBGL_VERSION")===2?ie(n,()=>n.texSubImage2D(n.TEXTURE_2D,0,0,0,t,s,n.RGBA,a,i)):ie(n,()=>n.texImage2D(n.TEXTURE_2D,0,l,t,s,0,n.RGBA,a,i)),ie(n,()=>n.bindTexture(n.TEXTURE_2D,null))}function hP(n,e,t){ie(n,()=>n.bindTexture(n.TEXTURE_2D,e)),t.data instanceof Uint8Array?U().getNumber("WEBGL_VERSION")===2?ie(n,()=>n.texSubImage2D(n.TEXTURE_2D,0,0,0,t.width,t.height,n.RGBA,n.UNSIGNED_BYTE,t.data)):ie(n,()=>n.texImage2D(n.TEXTURE_2D,0,n.RGBA,t.width,t.height,0,n.RGBA,n.UNSIGNED_BYTE,t.data)):U().getNumber("WEBGL_VERSION")===2?ie(n,()=>n.texSubImage2D(n.TEXTURE_2D,0,0,0,n.RGBA,n.UNSIGNED_BYTE,t)):ie(n,()=>n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t)),ie(n,()=>n.bindTexture(n.TEXTURE_2D,null))}function dP(n,e,t,s){const o=n.createBuffer();ie(n,()=>n.bindBuffer(n.PIXEL_PACK_BUFFER,o));const a=4*4*e*t;return ie(n,()=>n.bufferData(n.PIXEL_PACK_BUFFER,a,n.STREAM_READ)),ie(n,()=>n.readPixels(0,0,t,e,n.RGBA,n.FLOAT,0)),ie(n,()=>n.bindBuffer(n.PIXEL_PACK_BUFFER,null)),o}function pP(n,e,t){const s=n,o=new Float32Array(t);return s.bindBuffer(s.PIXEL_PACK_BUFFER,e),s.getBufferSubData(s.PIXEL_PACK_BUFFER,0,o),s.bindBuffer(s.PIXEL_PACK_BUFFER,null),o}function fP(n,e,t,s){const[o,r]=Gi(e,t),i=4,a=new Uint8Array(AL(e*t,i));return ie(n,()=>n.readPixels(0,0,o,r,s.downloadTextureFormat,n.UNSIGNED_BYTE,a)),new Float32Array(a.buffer)}function mP(n,e,t,s,o,r,i,a){const l=n,c=new Float32Array(DL(r,i));return l.bindBuffer(l.PIXEL_PACK_BUFFER,e),l.getBufferSubData(l.PIXEL_PACK_BUFFER,0,c),l.bindBuffer(l.PIXEL_PACK_BUFFER,null),c}function gP(n,e,t){const s=new Float32Array(e*t*4);return ie(n,()=>n.readPixels(0,0,t,e,n.RGBA,n.FLOAT,s)),s}class op{constructor(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.itemsToPoll=[];const t=U().getNumber("WEBGL_VERSION");if(e!=null?(this.gl=e,TL(t,e)):this.gl=Dn(t),e=this.gl,U().getNumber("WEBGL_VERSION")===2){const r=e;this.createVertexArray=()=>ie(r,()=>r.createVertexArray()),this.bindVertexArray=i=>ie(r,()=>r.bindVertexArray(i)),this.deleteVertexArray=i=>ie(r,()=>r.deleteVertexArray(i)),this.getVertexArray=()=>ie(r,()=>r.getParameter(r.VERTEX_ARRAY_BINDING))}else if(e!=null){const r=e.getExtension("OES_vertex_array_object");if(r==null)throw new Error("All WebGL1 implementations are expected to offer OES_vertex_array_object.");this.createVertexArray=()=>ie(e,()=>r.createVertexArrayOES()),this.bindVertexArray=i=>ie(e,()=>r.bindVertexArrayOES(i)),this.deleteVertexArray=i=>ie(e,()=>r.deleteVertexArrayOES(i)),this.getVertexArray=()=>ie(e,()=>e.getParameter(r.VERTEX_ARRAY_BINDING_OES))}let s="WEBGL_color_buffer_float";const o="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),U().getNumber("WEBGL_VERSION")===1){const r="OES_texture_float",i="OES_texture_half_float";if(this.textureFloatExtension=mc(this.gl,r),bn(this.gl,i))this.textureHalfFloatExtension=mc(this.gl,i);else if(U().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(s),bn(this.gl,o))this.colorBufferHalfFloatExtension=mc(this.gl,o);else if(U().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(s="EXT_color_buffer_float",bn(this.gl,s))this.colorBufferFloatExtension=this.gl.getExtension(s);else if(bn(this.gl,o))this.colorBufferHalfFloatExtension=this.gl.getExtension(o);else throw new Error("GL context does not support color renderable floats");this.vertexBuffer=nP(this.gl),this.indexBuffer=sP(this.gl),this.framebuffer=KL(this.gl),this.textureConfig=Xd(this.gl,this.textureHalfFloatExtension)}get debug(){return U().getBool("DEBUG")}dispose(){if(this.disposed)return;this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");const e=this.gl;ie(e,()=>e.finish()),ie(e,()=>e.bindFramebuffer(e.FRAMEBUFFER,null)),ie(e,()=>e.deleteFramebuffer(this.framebuffer)),ie(e,()=>e.bindBuffer(e.ARRAY_BUFFER,null)),ie(e,()=>e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)),ie(e,()=>e.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(e,t){return this.throwIfDisposed(),oP(this.gl,e,t,this.textureConfig)}createFloat16MatrixTexture(e,t){return this.throwIfDisposed(),rP(this.gl,e,t,this.textureConfig)}createUnsignedBytesMatrixTexture(e,t){return this.throwIfDisposed(),iP(this.gl,e,t,this.textureConfig)}uploadPixelDataToTexture(e,t){this.throwIfDisposed(),hP(this.gl,e,t)}uploadDenseMatrixToTexture(e,t,s,o){this.throwIfDisposed(),uP(this.gl,e,t,s,o,this.textureConfig)}createFloat16PackedMatrixTexture(e,t){return this.throwIfDisposed(),lP(this.gl,e,t,this.textureConfig)}createPackedMatrixTexture(e,t){return this.throwIfDisposed(),aP(this.gl,e,t,this.textureConfig)}deleteMatrixTexture(e){this.throwIfDisposed(),this.outputTexture===e&&(S1(this.gl,this.framebuffer),this.outputTexture=null),ie(this.gl,()=>this.gl.deleteTexture(e))}downloadByteEncodedFloatMatrixFromOutputTexture(e,t,s){return this.downloadMatrixDriver(e,()=>fP(this.gl,t,s,this.textureConfig))}downloadPackedMatrixFromBuffer(e,t,s,o,r,i){return mP(this.gl,e,t,s,o,r,i,this.textureConfig)}downloadFloat32MatrixFromBuffer(e,t){return pP(this.gl,e,t)}createBufferFromTexture(e,t,s){this.bindTextureToFrameBuffer(e);const o=dP(this.gl,t,s,this.textureConfig);return this.unbindTextureToFrameBuffer(),o}createAndWaitForFence(){const e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let t,s;if(U().getBool("WEBGL_FENCE_API_ENABLED")){const o=e,r=o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),s=()=>{const i=o.clientWaitSync(r,0,0);return i===o.ALREADY_SIGNALED||i===o.CONDITION_SATISFIED},t=r}else U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),s=()=>this.isQueryAvailable(t,U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):s=()=>!0;return{query:t,isFencePassed:s}}downloadMatrixFromPackedTexture(e,t,s){return this.downloadMatrixDriver(e,()=>gP(this.gl,t,s))}createProgram(e){this.throwIfDisposed();const t=this.gl;this.vertexShader==null&&(this.vertexShader=tP(t));const s=VL(t);ie(t,()=>t.attachShader(s,this.vertexShader)),ie(t,()=>t.attachShader(s,e)),WL(t,s);const o=Object.assign(s,{vao:this.createVertexArray()});return this.debug&&Yd(t,o),o}buildVao(e){this.setProgram(e),this.bindVertexArray(e.vao);const t=this.gl;ie(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer)),cP(t,e,this.vertexBuffer)}deleteProgram(e){this.throwIfDisposed(),e===this.program&&(this.program=null),e!=null&&(ie(this.gl,()=>this.gl.deleteProgram(e)),this.deleteVertexArray(e.vao))}setProgram(e){this.throwIfDisposed(),this.program=e,this.program!=null&&this.debug&&Yd(this.gl,this.program),ie(this.gl,()=>this.gl.useProgram(e))}getUniformLocation(e,t,s=!0){return this.throwIfDisposed(),s?XL(this.gl,e,t):YL(this.gl,e,t)}getAttributeLocation(e,t){return this.throwIfDisposed(),ie(this.gl,()=>this.gl.getAttribLocation(e,t))}getUniformLocationNoThrow(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)}setInputMatrixTexture(e,t,s){this.throwIfDisposed(),this.throwIfNoProgram(),ZL(this.gl,e,t,s)}setOutputMatrixTexture(e,t,s){this.setOutputMatrixTextureDriver(e,s,t)}setOutputPackedMatrixTexture(e,t,s){this.throwIfDisposed();const[o,r]=Qo(t,s);this.setOutputMatrixTextureDriver(e,o,r)}setOutputMatrixWriteRegion(e,t,s,o){this.setOutputMatrixWriteRegionDriver(s,e,o,t)}setOutputPackedMatrixWriteRegion(e,t,s,o){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){this.program!=null&&Yd(this.gl,this.program),gc(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();const e=this.gl;if(this.debug){const t=this.getVertexArray();console.assert(t===this.program.vao,"VAO changed between setProgram and executeProgram!"),this.debugValidate()}ie(e,()=>e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),ie(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=mc(this.gl,U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){const s=this.gl,o=this.getQueryTimerExtensionWebGL2(),r=s.createQuery();return s.beginQuery(o.TIME_ELAPSED_EXT,r),r}const e=this.getQueryTimerExtensionWebGL1(),t=e.createQueryEXT();return e.beginQueryEXT(e.TIME_ELAPSED_EXT,t),t}endQuery(){if(U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){const t=this.gl,s=this.getQueryTimerExtensionWebGL2();t.endQuery(s.TIME_ELAPSED_EXT);return}const e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}waitForQueryAndGetTime(e){return X(this,null,function*(){return yield Cp(()=>this.disposed||this.isQueryAvailable(e,U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(e,U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))})}getQueryTime(e,t){if(t===0)return null;if(t===2){const s=this.gl;return s.getQueryParameter(e,s.QUERY_RESULT)/1e6}else{const s=this.getQueryTimerExtensionWebGL1();return s.getQueryObjectEXT(e,s.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(e,t){if(t===0)return!0;if(t===2){const s=this.gl,o=this.getQueryTimerExtensionWebGL2(),r=s.getQueryParameter(e,s.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),r&&!this.disjoint}else{const s=this.getQueryTimerExtensionWebGL1(),o=s.getQueryObjectEXT(e,s.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(s.GPU_DISJOINT_EXT)),o&&!this.disjoint}}pollFence(e){return new Promise(t=>{this.addItemToPoll(()=>e.isFencePassed(),()=>t())})}pollItems(){const e=xP(this.itemsToPoll.map(t=>t.isDoneFn));for(let t=0;t<=e;++t){const{resolveFn:s}=this.itemsToPoll[t];s()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}addItemToPoll(e,t){if(this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1)return;let s;"setTimeoutCustom"in U().platform&&(s=U().platform.setTimeoutCustom.bind(U().platform)),Cp(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,s)}bindTextureToFrameBuffer(e){this.throwIfDisposed(),Zd(this.gl,e,this.framebuffer),this.debug&&gc(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture!=null?(Zd(this.gl,this.outputTexture,this.framebuffer),this.debug&&gc(this.gl)):S1(this.gl,this.framebuffer)}downloadMatrixDriver(e,t){this.bindTextureToFrameBuffer(e);const s=t();return this.unbindTextureToFrameBuffer(),s}setOutputMatrixTextureDriver(e,t,s){this.throwIfDisposed();const o=this.gl;Zd(o,e,this.framebuffer),this.debug&&gc(o),this.outputTexture=e,ie(o,()=>o.viewport(0,0,t,s)),ie(o,()=>o.scissor(0,0,t,s))}setOutputMatrixWriteRegionDriver(e,t,s,o){this.throwIfDisposed(),ie(this.gl,()=>this.gl.scissor(e,t,s,o))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(this.program==null)throw new Error("No GPU program is currently set.")}}function xP(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}const{addImpl:bP,bincountImpl:B1,bincountReduceImpl:yP,bitwiseAndImpl:wP,castImpl:CP,ceilImpl:IP,concatImpl:$P,equalImpl:vP,expImpl:kP,expm1Impl:SP,floorImpl:NP,gatherNdImpl:TP,gatherV2Impl:EP,greaterImpl:RP,greaterEqualImpl:AP,lessImpl:DP,lessEqualImpl:FP,linSpaceImpl:_P,logImpl:OP,maxImpl:LP,maximumImpl:MP,minimumImpl:PP,multiplyImpl:zP,negImpl:BP,notEqualImpl:VP,prodImpl:WP,raggedGatherImpl:UP,raggedRangeImpl:GP,raggedTensorToTensorImpl:HP,rangeImpl:qP,rsqrtImpl:KP,scatterImpl:jP,sigmoidImpl:XP,simpleAbsImpl:V1,sliceImpl:YP,sparseFillEmptyRowsImpl:ZP,sparseReshapeImpl:JP,sparseSegmentReductionImpl:W1,sqrtImpl:QP,staticRegexReplaceImpl:e3,stridedSliceImpl:t3,stringNGramsImpl:n3,stringSplitImpl:s3,stringToHashBucketFastImpl:o3,subImpl:r3,tileImpl:i3,topKImpl:a3,transposeImpl:rp,uniqueImpl:l3}=pA;function U1(n,e){return["x","y","z","w","u","v"].slice(0,e).map(t=>`${n}.${t}`)}function Bt(n,e){return e===1?[n]:U1(n,e)}function c3(n,e){if(n===1)return"rc";let t="";for(let s=0;s<n;s++)t+=e[s],s<n-1&&(t+=",");return t}class u3{constructor(e){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.enableShapeUniforms=_t(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{const t=Bt("rc",this.rank),s=We(this.rank),o=this.getOutOfBoundsCondition(t),r=this.getSetup(t),i=this.getOutput(t);this.userCode=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${o}) {
            setOutput(vec4(0));
          } else {
            ${r}

            setOutput(vec4(${i}));
          }
        }
      `}}getSourceCoordsArr(e){const t=[];for(let s=0;s<=1;s++)for(let o=0;o<=1;o++){let r=`${s===0?"r":"rp1"}, ${o===0?"c":"cp1"}`;for(let i=2;i<this.rank;i++)r=`${e[e.length-1-i]},`+r;t.push(r)}return t}getOutOfBoundsCondition(e){if(this.rank===1)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let t="";for(let s=this.rank-2;s<this.rank;s++)t+=`${e[s]} >= ${this.enableShapeUniforms?`outShape[${s}]`:this.outputShape[s]}`,s<this.rank-1&&(t+="||");return t}getSetup(e){if(this.rank===1)return"";const t=e.slice(-2),s=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],o=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${t[0]};
      int c = ${t[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${s};
      bool rEdge = rp1 >= ${o};
    `}getOutput(e){const t=this.getSourceCoordsArr(e);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?"outShape":this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${t[0]}),
            cEdge ? 0. : getA(${t[1]}),
            rEdge ? 0. : getA(${t[2]}),
            rEdge || cEdge ? 0. : getA(${t[3]})`}}class G1{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length);let s="";for(let o=0;o<4;o++){let r="thisRC = rc;";o%2===1&&(r+="thisRC.z += 1;"),o>1&&(r+="thisRC.y += 1;"),s+=`
        ${r}
        ${o>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${o}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${o>0?"}":""}
      `}this.userCode=`
      ${h3(t,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?np():tp(e)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":e[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":e[2]};

        ${s}

        setOutput(result);
      }
    `}}function h3(n,e){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e?cM(["r","c","d"],"inputShape"):yo(["r","c","d"],n)}
      return ivec3(r, c, d);
    }
  `}class d3{constructor(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.usedTextures={},this.logEnabled=!1}acquireTexture(e,t,s){const o=q1(t,s),r=K1(e,o,s);r in this.freeTextures||(this.freeTextures[r]=[]),r in this.usedTextures||(this.usedTextures[r]=[]);const i=H1(e,o,this.gpgpu.gl,this.gpgpu.textureConfig,s);if(this.freeTextures[r].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=i,this.log();const l=this.freeTextures[r].pop();return this.usedTextures[r].push(l),l}let a;return o===St.PACKED_2X2_FLOAT32?a=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):o===St.PACKED_2X2_FLOAT16?a=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):o===St.UNPACKED_FLOAT32?a=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):o===St.UNPACKED_FLOAT16?a=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):o===St.PACKED_4X1_UNSIGNED_BYTE&&(a=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[r].push(a),this.numUsedTextures++,this._numBytesAllocated+=i,this.log(),a}releaseTexture(e,t,s,o){if(this.freeTextures==null)return;const r=q1(s,o),i=K1(t,r,o);i in this.freeTextures||(this.freeTextures[i]=[]);const a=H1(t,r,this.gpgpu.gl,this.gpgpu.textureConfig,o),l=U().getNumber("WEBGL_DELETE_TEXTURE_THRESHOLD");l!==-1&&this._numBytesAllocated>l?(this.gpgpu.deleteMatrixTexture(e.texture),this._numBytesAllocated-=a):(this.freeTextures[i].push(e),this.numFreeTextures++,this._numBytesFree+=a),this.numUsedTextures--;const c=this.usedTextures[i],u=c&&c.indexOf(e);if(u==null||u<0)throw new Error("Cannot release a texture that was never provided by this texture manager");c[u]=c[c.length-1],c.pop(),this.log()}log(){if(!this.logEnabled)return;const e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${e})`);const t=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*t)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(const e in this.freeTextures)this.freeTextures[e].forEach(t=>{this.gpgpu.deleteMatrixTexture(t.texture)});for(const e in this.usedTextures)this.usedTextures[e].forEach(t=>{this.gpgpu.deleteMatrixTexture(t.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}}function p3(n,e){const t=n;if(e===t.R32F)return 4;if(e===t.R16F)return 2;if(e===t.RGBA32F)return 16;if(e===n.RGBA)return 16;if(e===t.RGBA16F)return 8;if(e===t.RGBA8)return 4;throw new Error(`Unknown internal format ${e}`)}function H1(n,e,t,s,o){const r=f3(e,s);let i;if(o){const[l,c]=Qo(n[0],n[1]);i=l*c}else{const[l,c]=Gi(n[0],n[1]);i=l*c}const a=p3(t,r);return i*a}function f3(n,e){switch(n){case St.PACKED_2X2_FLOAT32:return P1(e);case St.PACKED_2X2_FLOAT16:return z1(e);case St.UNPACKED_FLOAT32:return O1(e);case St.UNPACKED_FLOAT16:return L1(e);case St.PACKED_4X1_UNSIGNED_BYTE:return M1(e);default:throw new Error(`Unknown physical texture type ${n}`)}}function m3(n){return U().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?n?St.PACKED_2X2_FLOAT32:St.UNPACKED_FLOAT32:n?St.PACKED_2X2_FLOAT16:St.UNPACKED_FLOAT16}function q1(n,e){if(n===an.UPLOAD)return St.PACKED_2X2_FLOAT32;if(n===an.RENDER||n==null)return m3(e);if(n===an.DOWNLOAD||n===an.PIXELS)return St.PACKED_4X1_UNSIGNED_BYTE;throw new Error(`Unknown logical texture type ${n}`)}function K1(n,e,t){return`${n[0]}_${n[1]}_${e}_${t}`}class Zn{constructor(e,t){this.variableNames=["A"],this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${t}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}}const yn="if (isnan(x)) return x;",g3="return x;",j1="return abs(x);",x3="return (x >= 0.0) ? x : (exp(x) - 1.0);",b3=yn+`
  return (x < 0.0) ? 0.0 : x;
`,y3=yn+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,Fs="return x;",w3="return 1.0 / (1.0 + exp(-1.0 * x));";const C3="return x;",I3=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,$3=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,v3=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,k3="return 1.0 / (1.0 + exp(-1.0 * x));";class _s{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${t}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}}class S3{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length);const t=e.length,s=Bt("rc",t),o=We(t),r=c3(t,s),i=s.slice(-2),a=t<=1?"rc":`vec2(${i.join(",")})`;this.userCode=`
      void main() {
        ${o} rc = getOutputCoords();
        vec4 packedInput = getA(${r});

        setOutput(getChannel(packedInput, ${a}));
      }
    `}}const N3=ym,T3=1e-7,E3=1e-4,Cc={};function R3(n){return n in Cc||(Cc[n]={}),Cc[n]}const A3=U().getNumber("CPU_HANDOFF_SIZE_THRESHOLD"),D3=600;function F3(){return U().global.screen==null?1024:U().global.screen.height*U().global.screen.width*window.devicePixelRatio*D3/1024/1024}class Ic extends ko{nextDataId(){return Ic.nextDataId++}constructor(e){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!U().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");let t;if(e!=null){if(e instanceof op)t=e;else{const s=Dn(U().getNumber("WEBGL_VERSION"),e);t=new op(s)}this.binaryCache={},this.gpgpuCreatedLocally=!1}else{const s=Dn(U().getNumber("WEBGL_VERSION"));t=new op(s),this.binaryCache=R3(U().getNumber("WEBGL_VERSION")),this.gpgpuCreatedLocally=!0}this.gpgpu=t,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new d3(this.gpgpu),this.numMBBeforeWarning=F3(),this.texData=new ta(this,Ke())}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}writeTexture(e,t,s,o,r,i){const a=this.makeTensorInfo(t,s),l=this.texData.get(a.dataId);l.isPacked=!1,l.texture={texture:e,texShape:[o,r]},l.texShape=[o,r];const c=xc(t),u=new _1(c,!1,i),h=this.runWebGLProgram(u,[a],s,[[o,r]]);return h.shape=t,l.texture=null,this.disposeIntermediateTensorInfo(a),h.dataId}write(e,t,s){if((U().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||U().getBool("DEBUG"))&&this.checkNumericalProblems(e),s==="complex64"&&e!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");const o={id:this.nextDataId()};return this.texData.set(o,{shape:t,dtype:s,values:e,usage:an.UPLOAD,refCount:1}),o}refCount(e){return this.texData.has(e)?this.texData.get(e).refCount:0}incRef(e){const t=this.texData.get(e);t.refCount++}decRef(e){if(this.texData.has(e)){const t=this.texData.get(e);t.refCount--}}move(e,t,s,o,r){if(U().getBool("DEBUG")&&this.checkNumericalProblems(t),o==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(e,{shape:s,dtype:o,values:t,usage:an.UPLOAD,refCount:r})}disposeIntermediateTensorInfo(e){this.disposeData(e.dataId)}readSync(e){const t=this.texData.get(e),{values:s,dtype:o,complexTensorInfos:r,slice:i,shape:a,isPacked:l}=t;if(i!=null){let d;l?d=new _s(a,Fs):d=new Zn(a,Fs);const p=this.runWebGLProgram(d,[{dataId:e,shape:a,dtype:o}],o),f=this.readSync(p.dataId);return this.disposeIntermediateTensorInfo(p),f}if(s!=null)return this.convertAndCacheOnCPU(e);if(o==="string")return s;const c=this.activeTimers!=null;let u;c&&(u=Wt());let h;if(o==="complex64"){const d=this.readSync(r.real.dataId),p=this.readSync(r.imag.dataId);h=is(d,p)}else h=this.getValuesFromTexture(e);return c&&(this.downloadWaitMs+=Wt()-u),this.convertAndCacheOnCPU(e,h)}read(e){return X(this,null,function*(){if(this.pendingRead.has(e)){const f=this.pendingRead.get(e);return new Promise(m=>f.push(m))}const t=this.texData.get(e),{values:s,shape:o,slice:r,dtype:i,complexTensorInfos:a,isPacked:l}=t;if(r!=null){let f;l?f=new _s(o,Fs):f=new Zn(o,Fs);const m=this.runWebGLProgram(f,[{dataId:e,shape:o,dtype:i}],i),g=this.read(m.dataId);return this.disposeIntermediateTensorInfo(m),g}if(s!=null)return this.convertAndCacheOnCPU(e);if(U().getBool("DEBUG")&&!U().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&U().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let c=null,u;if(i!=="complex64"&&U().get("WEBGL_BUFFER_SUPPORTED")){u=this.decode(e);const f=this.texData.get(u.dataId);c=this.gpgpu.createBufferFromTexture(f.texture.texture,...fc(o))}this.pendingRead.set(e,[]),i!=="complex64"&&(yield this.gpgpu.createAndWaitForFence());let h;if(i==="complex64"){const f=yield Promise.all([this.read(a.real.dataId),this.read(a.imag.dataId)]),m=f[0],g=f[1];h=is(m,g)}else if(c==null)h=this.getValuesFromTexture(e);else{const f=K(o);h=this.gpgpu.downloadFloat32MatrixFromBuffer(c,f)}if(u!=null&&this.disposeIntermediateTensorInfo(u),c!=null){const f=this.gpgpu.gl;ie(f,()=>f.deleteBuffer(c))}const d=this.convertAndCacheOnCPU(e,h),p=this.pendingRead.get(e);return this.pendingRead.delete(e),p.forEach(f=>f(d)),this.pendingDisposal.has(e)&&(this.pendingDisposal.delete(e),this.disposeData(e)&&Ke().removeDataId(e,this),this.pendingDeletes--),d})}readToGPU(e,t={}){const s=this.texData.get(e),{values:o,shape:r,slice:i,dtype:a,isPacked:l,texture:c}=s;if(a==="complex64")throw new Error("Does not support reading texture for complex64 dtype.");if(i!=null){let p;l?p=new _s(r,Fs):p=new Zn(r,Fs);const f=this.runWebGLProgram(p,[{dataId:e,shape:r,dtype:a}],a),m=this.readToGPU(f,t);return this.disposeIntermediateTensorInfo(f),m}if(c==null)throw o!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");const u=this.decode(e,t.customTexShape),h=Ke().makeTensorFromTensorInfo(u),d=this.texData.get(u.dataId);return Object.assign({tensorRef:h},d.texture)}bufferSync(e){const t=this.readSync(e.dataId);if(e.dtype==="string")try{const s=t.map(o=>gs(o));return ke(e.shape,e.dtype,s)}catch(s){throw new Error("Failed to decode encoded string bytes into utf-8")}return ke(e.shape,e.dtype,t)}checkNumericalProblems(e){if(e!=null)for(let t=0;t<e.length;t++){const s=e[t];if(!LL(s))throw U().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error(`The value ${s} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${s} cannot be represented on this device.`)}}getValuesFromTexture(e){const{shape:t,dtype:s,isPacked:o}=this.texData.get(e),r=K(t);if(U().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){const d=this.decode(e),p=this.texData.get(d.dataId),f=this.gpgpu.downloadMatrixFromPackedTexture(p.texture.texture,...fc(t)).subarray(0,r);return this.disposeIntermediateTensorInfo(d),f}const i=U().getBool("WEBGL_PACK")&&o===!0,a=i?xc(t):t,l=i?new JM(a):new ZM(a),c=this.runWebGLProgram(l,[{shape:a,dtype:s,dataId:e}],"float32"),u=this.texData.get(c.dataId),h=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(u.texture.texture,u.texShape[0],u.texShape[1]).subarray(0,r);return this.disposeIntermediateTensorInfo(c),h}timerAvailable(){return U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(e){const t=this.activeTimers,s=[];let o=!1;this.programTimersStack==null?(this.programTimersStack=s,o=!0):this.activeTimers.push(s),this.activeTimers=s,e();const r=Us(this.activeTimers.map(l=>l.query)).filter(l=>l!=null),i=Us(this.activeTimers.map(l=>l.name)).filter(l=>l!=null);this.activeTimers=t,o&&(this.programTimersStack=null);const a={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return X(this,null,function*(){if(U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){const l=yield Promise.all(r);a.kernelMs=nw(l),a.getExtraProfileInfo=()=>l.map((c,u)=>({name:i[u],ms:c})).map(c=>`${c.name}: ${c.ms}`).join(", ")}else a.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,a})}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:Wt(),endMs:null}}endTimer(e){return U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),e):(e.endMs=Wt(),e)}getQueryTime(e){return X(this,null,function*(){if(U().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(e);const t=e;return t.endMs-t.startMs})}disposeData(e,t=!1){if(this.pendingDisposal.has(e))return!1;if(!this.texData.has(e))return!0;if(t?this.texData.get(e).refCount=0:this.texData.get(e).refCount--,!t&&this.texData.get(e).refCount>0)return!1;if(this.pendingRead.has(e))return this.pendingDisposal.add(e),this.pendingDeletes++,!1;this.releaseGPUData(e);const{complexTensorInfos:s}=this.texData.get(e);return s!=null&&(this.disposeData(s.real.dataId,t),this.disposeData(s.imag.dataId,t)),this.texData.delete(e),!0}releaseGPUData(e){const{texture:t,dtype:s,texShape:o,usage:r,isPacked:i,slice:a}=this.texData.get(e),l=a&&a.origDataId||e,c=this.dataRefCount.get(l);c>1?this.dataRefCount.set(l,c-1):(this.dataRefCount.delete(l),t!=null&&(this.numBytesInGPU-=this.computeBytes(o,s),this.textureManager.releaseTexture(t,o,r,i)));const u=this.texData.get(e);u.texture=null,u.texShape=null,u.isPacked=!1,u.slice=null}getTexture(e){return this.uploadToGPU(e),this.texData.get(e).texture.texture}getDataInfo(e){return this.texData.get(e)}shouldExecuteOnCPU(e,t=A3){return U().getBool("WEBGL_CPU_FORWARD")&&e.every(s=>this.texData.get(s.dataId).texture==null&&K(s.shape)<t)}getGPGPUContext(){return this.gpgpu}where(e){nn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");const t=e.dataSync();return N3(e.shape,t)}packedUnaryOp(e,t,s){const o=new _s(e.shape,t),r=this.compileAndRun(o,[e],s);return Ke().makeTensorFromTensorInfo(r)}abs(e){if(this.shouldExecuteOnCPU([e])&&e.dtype!=="complex64"){const o=V1(this.texData.get(e.dataId).values);return this.makeOutput(e.shape,e.dtype,o)}if(U().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(e,j1,e.dtype);const t=new Zn(e.shape,j1),s=this.compileAndRun(t,[e]);return Ke().makeTensorFromTensorInfo(s)}makeTensorInfo(e,t,s){let o;if(t==="string"&&s!=null&&s.length>0&&ur(s[0])){const r=s.map(i=>ms(i));o=this.write(r,e,t)}else o=this.write(s,e,t);return this.texData.get(o).usage=null,{dataId:o,shape:e,dtype:t}}makeOutput(e,t,s){return Ke().makeTensorFromTensorInfo(this.makeTensorInfo(e,t,s),this)}unpackTensor(e){const t=new S3(e.shape);return this.runWebGLProgram(t,[e],e.dtype)}packTensor(e){const t=new u3(e.shape);return this.runWebGLProgram(t,[e],e.dtype,null,!0)}packedReshape(e,t){const s=[er(e.shape),...tr(e.shape)],o={dtype:e.dtype,shape:s,dataId:e.dataId},r=[er(t),...tr(t)],i=new G1(r,s),a=!0,l=[s],c=this.runWebGLProgram(i,[o],e.dtype,l,a);return{dataId:c.dataId,shape:t,dtype:c.dtype}}decode(e,t){const s=this.texData.get(e),{isPacked:o,shape:r,dtype:i}=s;if(t!=null){const d=K(r),p=t[0]*t[1]*4;S(d<=p,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}const a=xc(r);let l;o?l=new YM(a):l=new XM(a);const c=!0,u=[t!=null?t:fc(a)],h=this.runWebGLProgram(l,[{shape:a,dtype:i,dataId:e}],i,u,c,t);return{dtype:i,shape:r,dataId:h.dataId}}runWebGLProgram(e,t,s,o,r=!1,i){const a=this.makeTensorInfo(e.outputShape,s),l=this.texData.get(a.dataId);if(e.packedOutput&&(l.isPacked=!0),e.outPackingScheme===Ui.DENSE){const x=i!=null?i:fc(e.outputShape);l.texShape=x.map(b=>b*2)}if(e.outTexUsage!=null&&(l.usage=e.outTexUsage),K(a.shape)===0)return l.values=Et(a.dtype,0),a;const c=[],u=t.map(x=>{if(x.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let b=this.texData.get(x.dataId);if(b.texture==null){if(!e.packedInputs&&K(x.shape)<=U().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:x.shape,texData:null,isUniform:!0,uniformValues:b.values};e.packedInputs&&(b.isPacked=!0,b.shape=x.shape)}if(this.uploadToGPU(x.dataId),!!b.isPacked!=!!e.packedInputs)x=b.isPacked?this.unpackTensor(x):this.packTensor(x),c.push(x),b=this.texData.get(x.dataId);else if(b.isPacked&&!yc(b.shape,x.shape)){const w=x,y=x.shape;x.shape=b.shape,x=this.packedReshape(x,y),c.push(x),b=this.texData.get(x.dataId),w.shape=y}return{shape:x.shape,texData:b,isUniform:!1}});this.uploadToGPU(a.dataId);const h={shape:a.shape,texData:l,isUniform:!1},d=jM(e,u,h),p=this.getAndSaveBinary(d,()=>qM(this.gpgpu,e,u,h)),f=this.activeTimers!=null;let m;f&&(m=this.startTimer()),U().get("ENGINE_COMPILE_ONLY")||KM(this.gpgpu,p,u,h,o),c.forEach(x=>this.disposeIntermediateTensorInfo(x)),f&&(m=this.endTimer(m),this.activeTimers.push({name:e.constructor.name,query:this.getQueryTime(m)}));const g=U().getNumber("WEBGL_FLUSH_THRESHOLD");if(g>0){const x=Wt();x-this.lastGlFlushTime>g&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=x)}if(!U().getBool("WEBGL_LAZILY_UNPACK")&&l.isPacked&&r===!1){const x=this.unpackTensor(a);return this.disposeIntermediateTensorInfo(a),x}return a}compileAndRun(e,t,s,o,r=!1){return s=s||t[0].dtype,this.runWebGLProgram(e,t,s,o,r)}getAndSaveBinary(e,t){return e in this.binaryCache||(this.binaryCache[e]=t()),this.binaryCache[e]}getTextureManager(){return this.textureManager}dispose(){this.disposed||(U().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(t=>{this.gpgpu.deleteProgram(this.binaryCache[t].webGLProgram),delete this.binaryCache[t]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement!="undefined"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return this.floatPrecisionValue==null&&(this.floatPrecisionValue=B(()=>{if(!U().get("WEBGL_RENDER_FLOAT32_ENABLED")){const e=U().getBool("DEBUG");U().set("DEBUG",!1);const t=this.abs(Oe(1e-8)).dataSync()[0];if(U().set("DEBUG",e),t>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?T3:E3}uploadToGPU(e){const t=this.texData.get(e),{shape:s,dtype:o,values:r,texture:i,usage:a,isPacked:l}=t;if(i!=null)return;const c=this.activeTimers!=null;let u;c&&(u=Wt());let h=t.texShape;if(h==null&&(h=eM(s,l),t.texShape=h),r!=null){const d=xc(s);let p,f=h[1],m=h[0];const g=r instanceof Uint8Array||r instanceof Uint8ClampedArray;(l||!g)&&([f,m]=Qo(h[0],h[1])),l?p=new eP(d,g):p=new _1(d,g);const x=g?[m,f]:h,b=this.makeTensorInfo(x,o),w=this.texData.get(b.dataId);g?w.usage=an.PIXELS:w.usage=an.UPLOAD,w.texShape=x,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),f,m,r);const y=[[m,f]],$=this.runWebGLProgram(p,[b],o,y,!0),v=this.texData.get($.dataId);t.texShape=v.texShape,t.isPacked=v.isPacked,t.usage=v.usage,U().get("ENGINE_COMPILE_ONLY")?this.disposeData($.dataId):(t.texture=v.texture,t.values=null,this.texData.delete($.dataId)),this.disposeIntermediateTensorInfo(b),c&&(this.uploadWaitMs+=Wt()-u)}else{const d=this.acquireTexture(h,a,o,l);t.texture=d}}convertAndCacheOnCPU(e,t){const s=this.texData.get(e),{dtype:o}=s;return t!=null&&(s.values=_3(t,o)),s.values}acquireTexture(e,t,s,o){if(this.numBytesInGPU+=this.computeBytes(e,s),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){const r=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${r} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(e,t,o)}computeBytes(e,t){return e[0]*e[1]*na(t)}checkCompileCompletion(){for(const[,e]of Object.entries(this.binaryCache))this.checkCompletion_(e)}checkCompileCompletionAsync(){return X(this,null,function*(){const e=[];if(this.gpgpu.parallelCompilationExtension){for(const[,t]of Object.entries(this.binaryCache))e.push(this.checkCompletionAsync_(t));return Promise.all(e)}else{for(const[,t]of Object.entries(this.binaryCache)){const s=new Promise(o=>{try{this.checkCompletion_(t),o(!0)}catch(r){throw r}});e.push(s)}return Promise.all(e)}})}checkCompletionAsync_(e){return X(this,null,function*(){return this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(e):(yield Wm(),this.checkCompletionAsync_(e))})}checkCompletion_(e){if(this.gpgpu.gl.getProgramParameter(e.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(e.webGLProgram)),this.gpgpu.gl.getShaderParameter(e.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(v1(e.source,this.gpgpu.gl.getShaderInfoLog(e.fragmentShader)),new Error("Failed to compile fragment shader.")):new Error("Failed to link vertex and fragment shaders.");return!0}getUniformLocations(){for(const e of Object.values(this.binaryCache)){this.gpgpu.buildVao(e.webGLProgram);const{variablesLocations:t,customUniformLocations:s,infLoc:o,nanLoc:r,outShapeLocation:i,outShapeStridesLocation:a,outTexShapeLocation:l}=D1(this.gpgpu,e.program,e.webGLProgram);e.variablesLocations=t,e.customUniformLocations=s,e.infLoc=o,e.nanLoc=r,e.outShapeLocation=i,e.outShapeStridesLocation=a,e.outTexShapeLocation=l}}createTensorFromGPUData(e,t,s){e.channels=e.channels||"RGBA";const{texture:o,height:r,width:i,channels:a}=e,l=Ke().backend;if(!l.gpgpu.gl.isTexture(o))throw new Error("The texture is invalid. Also, please make sure the texture and the TFJS WebGL backend are using the same canvas. If you want to use your own custom canvas, you have to create and use the custom TFJS WebGL backend created from the canvas through 'new tf.MathBackendWebGL(customCanvas)'.");const c=l.writeTexture(o,t,s,r,i,a);return Ke().makeTensorFromDataId(c,t,s,l)}}Ic.nextDataId=0;function _3(n,e){if(e==="float32"||e==="complex64")return n;if(e==="int32"||e==="bool"){const t=e==="int32"?new Int32Array(n.length):new Uint8Array(n.length);for(let s=0;s<t.length;++s)t[s]=Math.round(n[s]);return t}else throw new Error(`Unknown dtype ${e}`)}yf()&&$f("webgl",()=>new Ic,2);const ip=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;class Co{constructor(e,t,s){this.variableNames=["A","B"],this.outputShape=we(t,s),this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${e}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}}const Io=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;class ir{constructor(e,t,s,o=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=we(t,s);const r=this.outputShape.length;this.enableShapeUniforms=_t(r);let i="";if(o)if(r===0||K(this.outputShape)===1)i=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(i=`
          ${We(r)} coords = getOutputCoords();
        `,r===1)this.enableShapeUniforms?i+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:i+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{const l=Bt("coords",r);this.enableShapeUniforms?i+=`
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
        ${e}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${i}

        setOutput(result);
      }
    `}}function en(n){const{inputs:e,backend:t}=n,{x:s}=e;return t.incRef(s.dataId),{dataId:s.dataId,shape:s.shape,dtype:s.dtype}}const O3={kernelName:Ar,backendName:"webgl",kernelFunc:en};function Os(n){const{inputs:e,backend:t}=n,{real:s,imag:o}=e,r=t.makeTensorInfo(s.shape,"complex64"),i=t.texData.get(r.dataId),a=en({inputs:{x:s},backend:t}),l=en({inputs:{x:o},backend:t});return i.complexTensorInfos={real:a,imag:l},r}const L3={kernelName:Jc,backendName:"webgl",kernelFunc:Os};const X1="return (a < 0.) ? b * a : a;",Y1=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function M3(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{alpha:r}=s,i=t.makeTensorInfo([],"float32",fs(r,"float32")),a=U().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ir(Y1,o.shape,i.shape):new Co(X1,o.shape,i.shape),l=t.runWebGLProgram(a,[o,i],"float32");return t.disposeIntermediateTensorInfo(i),l}const P3={kernelName:$a,backendName:"webgl",kernelFunc:M3};const Z1="return (a < 0.) ? b * a : a;",J1=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function z3(n){const{inputs:e,backend:t}=n,{x:s,alpha:o}=e,r=U().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ir(J1,s.shape,o.shape):new Co(Z1,s.shape,o.shape);return t.runWebGLProgram(r,[s,o],"float32")}const B3={kernelName:Wa,backendName:"webgl",kernelFunc:z3};const ar="if (isnan(x)) return x;";function Ae({opSnippet:n,packedOpSnippet:e,cpuKernelImpl:t,dtype:s}){return({inputs:o,backend:r})=>{const{x:i}=o,a=r,l=s||i.dtype;if(a.shouldExecuteOnCPU([i])&&t!=null){const h=a.texData.get(i.dataId),d=t(h.values,l);return a.makeTensorInfo(i.shape,l,d)}const c=U().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&e!=null;let u;return c?u=new _s(i.shape,e):u=new Zn(i.shape,n),a.runWebGLProgram(u,[i],l)}}function Nt({opSnippet:n,packedOpSnippet:e,checkOutOfBounds:t=!1,supportsComplex:s=!1,cpuKernelImpl:o,dtype:r}){return({inputs:i,backend:a})=>{const{a:l,b:c}=i,u=a;if(s&&l.dtype==="complex64"){const f=u.texData.get(l.dataId),m=u.texData.get(c.dataId),[g,x]=[[f.complexTensorInfos.real,m.complexTensorInfos.real],[f.complexTensorInfos.imag,m.complexTensorInfos.imag]].map(w=>{const[y,C]=w,$={dataId:y.dataId,dtype:y.dtype,shape:l.shape},v={dataId:C.dataId,dtype:C.dtype,shape:c.shape},k=new Co(n,l.shape,c.shape);return u.runWebGLProgram(k,[$,v],Yt(y.dtype,C.dtype))}),b=Os({inputs:{real:g,imag:x},backend:u});return u.disposeIntermediateTensorInfo(g),u.disposeIntermediateTensorInfo(x),b}const h=r||Yt(l.dtype,c.dtype);if((l.dtype==="string"||c.dtype==="string"||u.shouldExecuteOnCPU([l,c]))&&o!=null){const f=u.texData.get(l.dataId).values,m=u.texData.get(c.dataId).values,g=l.dtype==="string"?as(f):f,x=l.dtype==="string"?as(m):m,[b,w]=o(l.shape,c.shape,g,x,h),y=u.makeTensorInfo(w,h),C=u.texData.get(y.dataId);return C.values=b,y}const d=U().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&e!=null;let p;return d?p=new ir(e,l.shape,c.shape,t):p=new Co(n,l.shape,c.shape),u.runWebGLProgram(p,[l,c],h)}}function Ki(n,e=!1){if(n==="linear")return e?C3:g3;if(n==="relu")return e?$3:b3;if(n==="elu")return e?I3:x3;if(n==="relu6")return e?v3:y3;if(n==="prelu")return e?J1:Z1;if(n==="leakyrelu")return e?Y1:X1;if(n==="sigmoid")return e?k3:w3;throw new Error(`Activation ${n} has not been implemented for the WebGL backend.`)}class Q1{constructor(e,t,s,o=!1,r=!1,i=!1,a=null,l=!1,c=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=s,this.enableShapeUniforms=_t(this.outputShape.length);const u=o?e[1]:e[2],h=Math.ceil(u/2),d=o?"i * 2, rc.y":"rc.y, i * 2",p=r?"rc.z, i * 2":"i * 2, rc.z",f=o?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],m=r?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"];let g="",x="";a&&(l?g=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${a}
        }`:c?g=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${a}
        }`:g=`vec4 activation(vec4 x) {
          ${a}
        }`,x="result = activation(result);");const b=i?"result += getBiasAtOutCoords();":"";i&&this.variableNames.push("bias"),l&&this.variableNames.push("preluActivationWeights"),c&&this.variableNames.push("leakyreluAlpha");let w="rc.x",y="rc.x";e[0]<t[0]?w=`imod(rc.x, ${e[0]})`:t[0]<e[0]&&(y=`imod(rc.x, ${t[0]})`),this.userCode=`
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
    `}}const ey={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"};class ty{constructor(e,t,s){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=we(t,s),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${e}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}}const ny="return a * b;";function ap(n){const{inputs:e,backend:t}=n,{a:s,b:o}=e,r=Yt(s.dtype,o.dtype);if(s.dtype==="complex64"){const a=t.texData.get(s.dataId),l=t.texData.get(o.dataId),c=new ty(ey.REAL,s.shape,o.shape),u=new ty(ey.IMAG,s.shape,o.shape),h=[{dataId:a.complexTensorInfos.real.dataId,dtype:a.complexTensorInfos.real.dtype,shape:s.shape},{dataId:a.complexTensorInfos.imag.dataId,dtype:a.complexTensorInfos.imag.dtype,shape:s.shape},{dataId:l.complexTensorInfos.real.dataId,dtype:l.complexTensorInfos.real.dtype,shape:o.shape},{dataId:l.complexTensorInfos.imag.dataId,dtype:l.complexTensorInfos.imag.dtype,shape:o.shape}],d=t.runWebGLProgram(c,h,"float32"),p=t.runWebGLProgram(u,h,"float32"),f=Os({inputs:{real:d,imag:p},backend:t});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(p),f}if(t.shouldExecuteOnCPU([s,o])){const a=t.texData.get(s.dataId),l=t.texData.get(o.dataId),[c,u]=zP(s.shape,o.shape,a.values,l.values,r),h=t.makeTensorInfo(u,r),d=t.texData.get(h.dataId);return d.values=c,h}let i;return U().getBool("WEBGL_PACK_BINARY_OPERATIONS")?i=new ir(ny,s.shape,o.shape):i=new Co(ny,s.shape,o.shape),t.runWebGLProgram(i,[s,o],r)}const V3={kernelName:Br,backendName:"webgl",kernelFunc:ap};function W3(n,e,t){const s=[er(n.shape),...tr(n.shape)],o={dtype:n.dtype,shape:s,dataId:n.dataId},r=[er(e),...tr(e)],i=new G1(r,s),a=!0,l=[s],c=t.runWebGLProgram(i,[o],n.dtype,l,a);return{dataId:c.dataId,shape:e,dtype:c.dtype}}function se(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{shape:r}=s,i=t,a=K(o.shape),l=Ip(r,a),c=K(l);S(a===c,()=>`The new shape (${l}) has ${c} elements and the old shape (${o.shape}) has ${a} elements. The new shape and old shape must have the same number of elements.`);const u=i.texData.get(o.dataId);return u.isPacked&&!yc(o.shape,l)&&!(u.texture!==null&&yc(u.shape,l))?W3(o,l,i):(i.incRef(o.dataId),{dataId:o.dataId,shape:l,dtype:o.dtype})}const U3={kernelName:Ga,backendName:"webgl",kernelFunc:se};class sy{constructor(e,t){this.variableNames=["x"];const{windowSize:s,batchSize:o,inSize:r,outSize:i}=e;this.outputShape=[o,i];const a=Math.floor(s/4)*4,l=s%4;let c="sumValue += dot(values, ones);";if(t!=null){const h=1/t;c=`sumValue += dot(values * ${So(h)?h.toPrecision(2):h}, ones);`}let u="";r%s>0&&(u=`
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
    `}}class G3{constructor(e,t){this.variableNames=["x"];const{windowSize:s,batchSize:o,inSize:r,outSize:i}=e;this.outputShape=[o,i];let a="0.0",l="";t==="prod"?a="1.0":t==="min"?(a="1.0 / 1e-20",l="min"):t==="max"&&(a="-1.0 / 1e-20",l="max");let c=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="sum"?c="sumValue":t==="prod"?c="prodValue":t==="all"?c="allValue":t==="any"&&(c="anyValue");const u=Math.floor(s/4)*4,h=s%4;let d=`
      if (${t==="sum"}) {
        sumValue += dot(values, ones);
      } else if (${t==="prod"}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${l}(values, minMaxValue);
        if (${t==="min"} || ${t==="max"}) {
          minMaxValue = ${l}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,p="vec4";t==="all"?(a="1.0",d=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,p="bvec4"):t==="any"&&(a="0.0",d=`
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
    `}}function H3(n){const e=[];for(;e.length===0||e[e.length-1].outSize!==1;){const t=e.length?e[e.length-1].outSize:n[1],s=Fl(t);e.push({inSize:t,windowSize:s,outSize:Math.ceil(t/s)})}return e}function $o(n,e,t,s){const o=H3(n.shape);let r=n;for(let i=0;i<o.length;i++){const{inSize:a,windowSize:l,outSize:c}=o[i];let u,h;t==="mean"?u=i===0?new sy({windowSize:l,inSize:a,batchSize:n.shape[0],outSize:c},a):new sy({windowSize:l,inSize:a,batchSize:n.shape[0],outSize:c}):u=new G3({windowSize:l,inSize:a,batchSize:n.shape[0],outSize:c},t),h=r,r=s.runWebGLProgram(u,[r],e),h.dataId!==n.dataId&&s.disposeIntermediateTensorInfo(h)}return r}class q3{constructor(e,t){this.variableNames=["A"];const s=new Array(e.length);for(let i=0;i<s.length;i++)s[i]=e[t[i]];this.outputShape=s,this.rank=s.length;const o=We(this.rank),r=K3(t);this.userCode=`
    void main() {
      ${o} resRC = getOutputCoords();
      setOutput(getA(${r}));
    }
    `}}function K3(n){const e=n.length;if(e>6)throw Error(`Transpose for rank ${e} is not yet supported`);const t=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],s=new Array(e);for(let o=0;o<n.length;o++)s[n[o]]=t[o];return s.join()}class j3{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;const s=new Array(e.length);for(let u=0;u<s.length;u++)s[u]=e[t[u]];if(this.outputShape=s,this.rank=s.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);const o=We(this.rank),r=U1("rc",this.rank),i=new Array(this.rank);for(let u=0;u<t.length;u++)i[t[u]]=r[u];const a=`vec2(${i.slice(-2).join()})`,l=`++${r[this.rank-1]} < ${s[this.rank-1]}`,c=`getChannel(getA(${i.join()}), ${a})`;this.userCode=`
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
    `}}function $c(n,e,t){const s=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new j3(n.shape,e):new q3(n.shape,e);return t.runWebGLProgram(s,[n],n.dtype)}function X3(n,e,t,s){const o=e,r=n.shape.length,i=ve(o,n.shape);let a=i;const l=Ze(a,r),c=l!=null;let u=n;c&&(u=$c(n,l,s),a=nt(a.length,r)),kt("sum",a,r);const[h,d]=yt(u.shape,a);let p=h;t&&(p=at(h,i));const f=K(d),g=K(n.shape)/f,x=se({inputs:{x:u},attrs:{shape:[g,f]},backend:s}),b=Wu(n.dtype),w=$o(x,b,"sum",s),y=se({inputs:{x:w},attrs:{shape:p},backend:s});return s.disposeIntermediateTensorInfo(x),s.disposeIntermediateTensorInfo(w),c&&s.disposeIntermediateTensorInfo(u),y}function vc(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s;return X3(o,r,i,t)}const Y3={kernelName:Ya,backendName:"webgl",kernelFunc:vc};function Vt(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{perm:r}=s,i=t,a=o.shape.length,l=new Array(a);for(let u=0;u<l.length;u++)l[u]=o.shape[r[u]];let c;if(i.shouldExecuteOnCPU([o])){const h=i.texData.get(o.dataId).values,d=rp(h,o.shape,o.dtype,r,l);c=i.makeTensorInfo(l,o.dtype);const p=i.texData.get(c.dataId);p.values=d}else c=$c(o,r,i);return c}const Z3={kernelName:Ao,backendName:"webgl",kernelFunc:Vt};const oy=1e3;function kc({a:n,b:e,transposeA:t,transposeB:s,backend:o,bias:r=null,preluActivationWeights:i=null,leakyreluAlpha:a=0,activation:l=null}){const c=n.shape.length,u=e.shape.length,h=t?n.shape[c-2]:n.shape[c-1],d=s?e.shape[u-1]:e.shape[u-2],p=t?n.shape[c-1]:n.shape[c-2],f=s?e.shape[u-2]:e.shape[u-1],m=n.shape.slice(0,-2),g=e.shape.slice(0,-2),x=K(m),b=K(g),y=we(n.shape.slice(0,-2),e.shape.slice(0,-2)).concat([p,f]);S(h===d,()=>`Error in matMul: inner shapes (${h}) and (${d}) of Tensors with shapes ${n.shape} and ${e.shape} and transposeA=${t} and transposeB=${s} must match.`);const C=t?[x,h,p]:[x,p,h],$=s?[b,f,d]:[b,d,f],v=se({inputs:{x:n},backend:o,attrs:{shape:C}}),k=se({inputs:{x:e},backend:o,attrs:{shape:$}}),N=[v,k],T=Math.max(x,b),I=t?v.shape[1]:v.shape[2],E=r!=null,R=i!=null,D=l==="leakyrelu",F=l!=null?Ki(l,!0):null,_=E||R||D||F!=null;let P;if((p===1||f===1)&&I>oy&&_===!1){let H=v,G=k;t&&(H=Vt({inputs:{x:v},backend:o,attrs:{perm:[0,2,1]}}),N.push(H)),s&&(G=Vt({inputs:{x:k},backend:o,attrs:{perm:[0,2,1]}}),N.push(G));const Z=f!==1,J=f===1;let Q=H;Z&&(Q=se({inputs:{x:H},backend:o,attrs:{shape:[T,I,1]}}),N.push(Q));const j=f===1?2:1;let Y=G;J&&(Y=se({inputs:{x:G},backend:o,attrs:{shape:[T,1,I]}}),N.push(Y));const ne=ap({inputs:{a:Q,b:Y},backend:o});P=vc({inputs:{x:ne},backend:o,attrs:{axis:j,keepDims:!0}}),N.push(ne)}else{const H=Yt(n.dtype,e.dtype),G=new Q1(C,$,[T,p,f],t,s,E,F,R,D),Z=[v,k];if(r!=null&&Z.push(r),R&&Z.push(i),D){const J=o.makeTensorInfo([],"float32",fs(a,"float32"));Z.push(J),N.push(J)}P=o.runWebGLProgram(G,Z,H)}const z=se({inputs:{x:P},backend:o,attrs:{shape:y}});N.push(P);for(const H of N)o.disposeIntermediateTensorInfo(H);return z}function J3(n){const{inputs:e,backend:t,attrs:s}=n,{a:o,b:r,bias:i,preluActivationWeights:a}=e,{transposeA:l,transposeB:c,activation:u,leakyreluAlpha:h}=s;return kc({a:o,b:r,transposeA:l,transposeB:c,backend:t,bias:i,preluActivationWeights:a,leakyreluAlpha:h,activation:u})}const Q3={kernelName:sl,backendName:"webgl",kernelFunc:J3};const ry="return abs(x);";function ez(n){const{inputs:e,backend:t}=n,{x:s}=e;if(t.shouldExecuteOnCPU([s])&&s.dtype!=="complex64"){const r=t.texData.get(s.dataId),i=V1(r.values);return t.makeTensorInfo(s.shape,s.dtype,i)}let o;return U().getBool("WEBGL_PACK_UNARY_OPERATIONS")?o=new _s(s.shape,ry):o=new Zn(s.shape,ry),t.runWebGLProgram(o,[s],s.dtype)}const tz={kernelName:sa,backendName:"webgl",kernelFunc:ez};const nz=yn+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,sz=Ae({opSnippet:nz}),oz={kernelName:hr,backendName:"webgl",kernelFunc:sz};const rz=yn+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,iz=Ae({opSnippet:rz}),az={kernelName:dr,backendName:"webgl",kernelFunc:iz};const iy="return a + b;",lz=Nt({opSnippet:iy,packedOpSnippet:iy,supportsComplex:!0,cpuKernelImpl:bP}),cz={kernelName:Ro,backendName:"webgl",kernelFunc:lz};class uz{constructor(e,t){this.outputShape=[],this.outputShape=e,this.variableNames=t.map((r,i)=>`T${i}`);const s=[];this.variableNames.forEach(r=>{s.push(`float v${r} = get${r}AtOutCoords();`)});const o=this.variableNames.map(r=>`v${r}`).join(" + ");this.userCode=`
      void main() {
        ${s.join(`
        `)}

        float result = ${o};
        setOutput(result);
      }
    `}}class hz{constructor(e,t){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.variableNames=t.map((r,i)=>`T${i}`);const s=[];this.variableNames.forEach(r=>{s.push(`vec4 v${r} = get${r}AtOutCoords();`)});const o=this.variableNames.map(r=>`v${r}`).join(" + ");this.userCode=`
      void main() {
        ${s.join(`
        `)}

        vec4 result = ${o};
        setOutput(result);
      }
    `}}function Sc(n){const{inputs:e,backend:t}=n,s=e;if(s.length===1)return en({inputs:{x:s[0]},backend:t});if(s.length>U().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){const l=Math.floor(s.length/2),c=Sc({inputs:s.slice(0,l),backend:t}),u=Sc({inputs:s.slice(l),backend:t});return Sc({inputs:[c,u],backend:t})}const o=s.map(l=>l.dtype).reduce((l,c)=>Yt(l,c)),r=s.map(l=>l.shape),a=U().getBool("WEBGL_PACK")?new hz(s[0].shape,r):new uz(s[0].shape,r);return t.runWebGLProgram(a,s,o)}const dz={kernelName:Hc,backendName:"webgl",kernelFunc:Sc};function pz(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s,a=o.shape.length,l=ve(r,o.shape);let c=l;const u=Ze(c,a);let h=o;u!=null&&(h=Vt({inputs:{x:o},backend:t,attrs:{perm:u}}),c=nt(c.length,a)),kt("all",c,a);const[d,p]=yt(h.shape,c),f=K(p),m=se({inputs:{x:h},backend:t,attrs:{shape:[-1,f]}}),g=$o(m,m.dtype,"all",t);let x;if(i){const b=at(d,l);x=se({inputs:{x:g},backend:t,attrs:{shape:b}})}else x=se({inputs:{x:g},backend:t,attrs:{shape:d}});return t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(g),u!=null&&t.disposeIntermediateTensorInfo(h),x}const fz={kernelName:qc,backendName:"webgl",kernelFunc:pz};function mz(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s,a=o.shape.length,l=ve(r,o.shape);let c=l;const u=Ze(c,a);let h=o;u!=null&&(h=Vt({inputs:{x:o},backend:t,attrs:{perm:u}}),c=nt(c.length,a)),kt("any",c,a);const[d,p]=yt(h.shape,c),f=K(p),m=se({inputs:{x:h},backend:t,attrs:{shape:[-1,f]}}),g=$o(m,m.dtype,"any",t);let x;if(i){const b=at(d,l);x=se({inputs:{x:g},backend:t,attrs:{shape:b}})}else x=se({inputs:{x:g},backend:t,attrs:{shape:d}});return t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(g),u!=null&&t.disposeIntermediateTensorInfo(h),x}const gz={kernelName:Kc,backendName:"webgl",kernelFunc:mz};class xz{constructor(e,t,s){this.variableNames=["A"];const{windowSize:o,batchSize:r,outSize:i}=e;s||this.variableNames.push("bestIndicesA"),this.outputShape=[r,i];const a=t==="max"?">":"<",l=s?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
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
    `}}class bz{constructor(e,t,s,o){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,S(e.length>2,()=>`Packed arg${s.charAt(0).toUpperCase()+s.slice(1)} supports only inputs with rank above 2.`);const r=e[e.length-1],i=Math.ceil(r/t);this.outputShape=e.slice(0,-1),i>1&&this.outputShape.push(i),o||this.variableNames.push("bestIndicesA");const a=this.outputShape,l=a.length,c=We(l),u=Bt("coords",l);let h,d;if(i===1){d=l+1;const k=We(d);h=`
        ${k} sourceLocR = ${k}(${u.join()}, 0);
        ++${u[l-1]};
        ${k} sourceLocG = ${k}(${u.join()}, 0);
        ++${u[l-2]};
        ${k} sourceLocA = ${k}(${u.join()}, 0);
        --${u[l-1]};
        ${k} sourceLocB = ${k}(${u.join()}, 0);
        --${u[l-2]};`}else d=l,h=`
        ${c} sourceLocR = coords;
        ++${u[l-1]};
        ${c} sourceLocG = coords;
        ++${u[l-2]};
        ${c} sourceLocA = coords;
        --${u[l-1]};
        ${c} sourceLocB = coords;
        --${u[l-2]};`;const p=["x","y","z","w","u","v"].slice(0,d),f="."+p[d-1],m=p.map(k=>"int "+k),g=Bt("sourceLocR",d-1).concat("inIdx.r"),x=Bt("sourceLocG",d-1).concat("inIdx.g"),b=Bt("sourceLocB",d-1).concat("inIdx.b"),w=Bt("sourceLocA",d-1).concat("inIdx.a"),y=s==="max"?"greaterThan":"lessThan",C=o?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${b.join()}),
                             getBestIndicesAChannel(${w.join()})));`,$=`vec4(
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
          sourceLocB${f}, sourceLocA${f}) * ${t};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${$};

        for (int i = 0; i < ${t}; i++) {
          inIdx = srcIdx;
          ${C}
          vec4 candidate = ${$};
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
    `}}function ay(n,e,t,s=null){let o=e.shape[0],r=e.shape[1];s!=null&&(o=s.shape[0],r=s.shape[1]);const i=Fl(r),a={windowSize:i,inSize:r,batchSize:o,outSize:Math.ceil(r/i)},l=new xz(a,t,s==null),c=[e];s!=null&&c.push(s);const u=n.runWebGLProgram(l,c,"int32");if(u.shape[1]===1)return u;const h=ay(n,e,t,u);return n.disposeIntermediateTensorInfo(u),h}function ly(n,e,t,s=null){const o=s!=null?s.shape:e.shape,r=o[o.length-1],i=Fl(r),a=new bz(o,i,t,s==null),l=s==null?[e]:[e,s],c=n.runWebGLProgram(a,l,"int32");if(c.shape.length===e.shape.length){const u=ly(n,e,t,c);return n.disposeIntermediateTensorInfo(c),u}return c}function cy(n,e,t,s){const o=[t];if(kt("arg"+s.charAt(0).toUpperCase()+s.slice(1),o,e.shape.length),!U().getBool("WEBGL_PACK_REDUCE")||e.shape.length<=2){const r=[],i=n.texData.get(e.dataId),a=i!==null&&i.isPacked;let l=e;a&&(l=n.unpackTensor(e),r.push(l));const[c,u]=yt(l.shape,o),h=K(u),d=se({inputs:{x:l},backend:n,attrs:{shape:[-1,h]}});r.push(d);const p=ay(n,d,s);r.push(p);const f=se({inputs:{x:p},backend:n,attrs:{shape:c}});return r.forEach(m=>n.disposeIntermediateTensorInfo(m)),f}return ly(n,e,s)}function yz(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r}=s;let i=ve(r,o.shape);const a=Ze(i,o.shape.length);let l=o;const c=[];a!=null&&(l=Vt({inputs:{x:o},backend:t,attrs:{perm:a}}),c.push(l),i=nt(i.length,l.shape.length)),kt("argMax",[i[0]],l.shape.length);const u=cy(t,l,i[0],"max");return c.forEach(h=>t.disposeIntermediateTensorInfo(h)),u}const wz={kernelName:oa,backendName:"webgl",kernelFunc:yz};function Cz(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r}=s;let i=ve(r,o.shape);const a=Ze(i,o.shape.length);let l=o;const c=[];a!=null&&(l=Vt({inputs:{x:o},backend:t,attrs:{perm:a}}),c.push(l),i=nt(i.length,l.shape.length)),kt("argMin",[i[0]],l.shape.length);const u=cy(t,l,i[0],"min");return c.forEach(h=>t.disposeIntermediateTensorInfo(h)),u}const Iz={kernelName:ra,backendName:"webgl",kernelFunc:Cz};const $z=yn+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,vz=Ae({opSnippet:$z}),kz={kernelName:pr,backendName:"webgl",kernelFunc:vz};const Sz=yn+"return log(x + sqrt(x * x + 1.0));",Nz=Ae({opSnippet:Sz}),Tz={kernelName:fr,backendName:"webgl",kernelFunc:Nz};const Ez=yn+`
  return atan(x);
`,Rz=Ae({opSnippet:Ez}),Az={kernelName:mr,backendName:"webgl",kernelFunc:Rz};const Dz=ip+`
  return atan(a, b);
`,Fz=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Io+`
  return result;
`,_z=Nt({opSnippet:Dz,packedOpSnippet:Fz}),Oz={kernelName:xr,backendName:"webgl",kernelFunc:_z};const Lz=yn+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,Mz=Ae({opSnippet:Lz}),Pz={kernelName:gr,backendName:"webgl",kernelFunc:Mz};class ji{constructor(e,t,s,o=!1,r=!1){if(this.variableNames=["x"],t==="avg"&&s)throw new Error("Cannot compute positions for average pool.");const i=e.filterWidth,a=e.strideHeight,l=e.strideWidth,c=e.dilationHeight,u=e.dilationWidth,h=e.effectiveFilterHeight,d=e.effectiveFilterWidth,p=e.padInfo.top,f=e.padInfo.left;this.outputShape=e.outShape;const m=t==="avg",g=`((batch  * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + d`,x=`(xR * ${e.inWidth} + xC) * ${e.inChannels} + d`;let b="0.0";if(m||(b="-1.0 / 1e-20"),s){this.userCode=`
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

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${d};
                wC += ${u}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${e.inWidth}) {
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
      `;return}const w="max";let y=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="avg"&&(y="avgValue / max(count, 1.0)");const C=Math.floor(i/4)*4,$=i%4,v=`
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
        if (xC < 0 || xC >= ${e.inWidth}) {
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

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${C}; wC += 4) {
            int xC = xCCorner + wC * ${u};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              getValue(batch, xR, xC + 2 * ${u}, d),
              getValue(batch, xR, xC + 3 * ${u}, d)
            );

            ${v}
          }

          int xC = xCCorner + ${C};
          if (${$===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${v}
          } else if (${$===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${u}, d),
              initializationValue,
              initializationValue
            );

            ${v}
          } else if (${$===3}) {
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
    `}}class lp{constructor(e,t,s,o=!1,r=!1){if(this.variableNames=["x"],t==="avg"&&s)throw new Error("Cannot compute positions for average pool.");const i=e.filterWidth,a=e.strideDepth,l=e.strideHeight,c=e.strideWidth,u=e.dilationDepth,h=e.dilationHeight,d=e.dilationWidth,p=e.effectiveFilterDepth,f=e.effectiveFilterHeight,m=e.effectiveFilterWidth,g=e.padInfo.front,x=e.padInfo.top,b=e.padInfo.left;this.outputShape=e.outShape;const w=t==="avg";let y="0.0";if(w||(y="-1.0 / 1e-20"),s){this.userCode=`
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

            if (xD < 0 || xD >= ${e.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${f};
                wR += ${h}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${m};
                  wC += ${d}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${e.inWidth}) {
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
                  minMaxPosition = ${o?r?`(((batch * ${e.inDepth} + xD) * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`((xD * ${e.inHeight} + xR) * ${e.inWidth} + xC) * ${e.inChannels} + ch`:`wD * ${f} * ${m} +
                      wR * ${m} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}const C="max";let $=`${t}(${t}(${t}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;t==="avg"&&($="avgValue / max(count, 1.0)");const v=Math.floor(i/4)*4,k=i%4,N=`
      if (${w}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${C}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${a}, ${l}, ${c});
      const ivec3 pads = ivec3(${g}, ${x}, ${b});
      const float initializationValue = ${y};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${e.inWidth}) {
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

          if (xD < 0 || xD >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${f};
            wR += ${h}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${e.inHeight}) {
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

              ${N}
            }

            int xC = xCCorner + ${v};
            if (${k===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${N}
            } else if (${k===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                initializationValue,
                initializationValue
              );

              ${N}
            } else if (${k===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${d}, ch),
                getValue(batch, xD, xR, xC + 2 * ${d}, ch),
                initializationValue
              );

              ${N}
            }
          }
        }
        setOutput(${$});
      }
    `}}function zz(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e;Hi(o,"avgPool");const{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=s,c=1;S(At(i,c),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=un(o.shape,r,i,c,a,l);if(u.filterWidth===1&&u.filterHeight===1&&_e(u.inShape,u.outShape))return en({inputs:{x:o},backend:t});const h=new ji(u,"avg",!1);return t.runWebGLProgram(h,[o],"float32")}const Bz={kernelName:ia,backendName:"webgl",kernelFunc:zz};function Vz(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{filterSize:r,strides:i,pad:a,dimRoundingMode:l,dataFormat:c}=s,u=[1,1,1],h=ts(o.shape,r,i,u,a,l,c),d=new lp(h,"avg",!1);return t.runWebGLProgram(d,[o],"float32")}const Wz={kernelName:aa,backendName:"webgl",kernelFunc:Vz};class Uz{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;const t=e.filterHeight,s=e.filterWidth,o=e.strideHeight,r=e.strideWidth,i=e.dilationHeight,a=e.dilationWidth,l=e.effectiveFilterHeight,c=e.effectiveFilterWidth,u=l-1-e.padInfo.top,h=c-1-e.padInfo.left,d=1/(t*s);this.userCode=`
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

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${c};
            wC+= ${a}) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
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
    `}}class Gz{constructor(e){this.variableNames=["dy"],this.outputShape=e.inShape;const t=e.filterDepth,s=e.filterHeight,o=e.filterWidth,r=e.strideDepth,i=e.strideHeight,a=e.strideWidth,l=e.dilationDepth,c=e.dilationHeight,u=e.dilationWidth,h=e.effectiveFilterDepth,d=e.effectiveFilterHeight,p=e.effectiveFilterWidth,f=h-1-e.padInfo.front,m=d-1-e.padInfo.top,g=p-1-e.padInfo.left,x=1/(t*s*o);this.userCode=`
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

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${d};
              wR += ${c}) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${p};
                wC += ${u}) {
              float dyC = float(dyCCorner + wC) / ${a}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
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
    `}}function Hz(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,input:r}=e,i=r,{filterSize:a,strides:l,pad:c,dimRoundingMode:u}=s,h=[1,1,1],d=ts(i.shape,a,l,h,c,u),p=new Gz(d);return t.runWebGLProgram(p,[o],i.dtype)}const qz={kernelName:Xc,backendName:"webgl",kernelFunc:Hz};function Kz(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,input:r}=e,i=r;Hi([o,r],"avgPoolGrad");const{filterSize:a,strides:l,pad:c}=s,u=un(i.shape,a,l,1,c),h=new Uz(u);return t.runWebGLProgram(h,[o],i.dtype)}const jz={kernelName:jc,backendName:"webgl",kernelFunc:Kz};function Xz(n){const{inputs:e,backend:t,attrs:s}=n,{a:o,b:r}=e,{transposeA:i,transposeB:a}=s;return kc({a:o,b:r,transposeA:i,transposeB:a,backend:t})}const Yz={kernelName:la,backendName:"webgl",kernelFunc:Xz};class Zz{constructor(e,t,s,o,r,i){this.outputShape=[],this.variableNames=["x","mean","variance"],we(e,t),we(e,s);let a="0.0";o!=null&&(we(e,o),this.variableNames.push("offset"),a="getOffsetAtOutCoords()");let l="1.0";r!=null&&(we(e,r),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${a};
        float scale = ${l};
        float inv = scale * inversesqrt(variance + float(${i}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}}class Jz{constructor(e,t,s,o,r,i){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],we(e,t),we(e,s);let a="vec4(0.0)";o!=null&&(we(e,o),this.variableNames.push("offset"),a="getOffsetAtOutCoords()");let l="vec4(1.0)";r!=null&&(we(e,r),this.variableNames.push("scale"),l="getScaleAtOutCoords()"),this.outputShape=e,this.userCode=`
      void main() {
        vec4 offset = ${a};
        vec4 scale = ${l};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${i}));

        setOutput((x - mean) * inv + offset);
      }
    `}}const Qz={kernelName:wa,backendName:"webgl",kernelFunc:({inputs:n,backend:e,attrs:t})=>{const{x:s,mean:o,variance:r,offset:i,scale:a}=n;S(o.shape.length===r.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),S(i==null||o.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),S(a==null||o.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:l}=t;l==null&&(l=.001);const c=[s,o,r];let u=null;i!=null&&(u=i.shape,c.push(i));let h=null;a!=null&&(h=a.shape,c.push(a));const d=U().getBool("WEBGL_PACK_NORMALIZATION")?new Jz(s.shape,o.shape,r.shape,u,h,l):new Zz(s.shape,o.shape,r.shape,u,h,l);return e.runWebGLProgram(d,c,c[0].dtype)}};class eB{constructor(e){this.variableNames=["source"],this.outputShape=e,this.rank=e.length;const t=We(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];const s=tB(this.rank);let o;const r=e.map((i,a)=>`sourceLoc.${cp[a]} = start[${a}] + coords.${cp[a]};`);o=`
        ${t} sourceLoc;
        ${t} coords = getOutputCoords();
        ${r.join(`
`)}
      `,this.userCode=`
      void main() {
        ${o}
        setOutput(getSource(${s}));
      }
    `}}const cp=["x","y","z","w","u","v"];function tB(n){if(n===1)return"sourceLoc";if(n<=6)return cp.slice(0,n).map(e=>"sourceLoc."+e).join(",");throw Error(`Slicing for rank ${n} is not yet supported`)}class nB{constructor(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];const t=We(this.rank),s=Bt("coords",this.rank),o=Bt("sourceLoc",this.rank),r=this.rank===1?"sourceLoc":`vec2(${o.slice(-2).join()})`,i=`getChannel(getSource(${o.join()}), ${r})`,a=`
      result.x = ${i};
      if (++${s[this.rank-1]} < ${e[this.rank-1]}) {
        ++${o[this.rank-1]};
        result.y = ${i};
        --${o[this.rank-1]};
      }
    `,l=this.rank===1?"":`
      --${s[this.rank-1]};
      if (++${s[this.rank-2]} < ${e[this.rank-2]}) {
        ++${o[this.rank-2]};
        result.z = ${i};
        if (++${s[this.rank-1]} < ${e[this.rank-1]}) {
          ++${o[this.rank-1]};
          result.w = ${i};
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            ${t}(${e.map((u,h)=>`start[${h}]`).join()});`:e.map((u,h)=>`${o[h]} = ${s[h]} + start[${h}];`).join(`
`);this.userCode=`
      void main() {
        ${t} coords = getOutputCoords();
        ${t} sourceLoc;
        ${c}
        vec4 result = vec4(0.);
        ${a}
        ${l}
        setOutput(result);
      }
    `}}function sB(n,e,t,s){const o=s.texData.get(n.dataId),r=s.makeTensorInfo(t,n.dtype),i=s.texData.get(r.dataId);Object.assign(i,o),i.refCount=1,i.shape=t,i.dtype=n.dtype;let a=zm(e,fe(n.shape));o.slice&&(a+=o.slice.flatOffset),i.slice={flatOffset:a,origDataId:o.slice&&o.slice.origDataId||n.dataId};const l=s.dataRefCount.get(i.slice.origDataId)||1;return s.dataRefCount.set(i.slice.origDataId,l+1),r}function lr(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{begin:r,size:i}=s,[a,l]=_h(o,r,i);if(Lm(o,a,l),K(l)===0)return t.makeTensorInfo(l,o.dtype,[]);if(t.shouldExecuteOnCPU([o])||o.dtype==="string"){const h=t.texData.get(o.dataId),d=YP(h.values,a,l,o.shape,o.dtype);return t.makeTensorInfo(l,o.dtype,d)}const{isPacked:c}=t.texData.get(o.dataId),u=Pm(o.shape,a,l);if(c||!u){const h=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new nB(l):new eB(l),d=[a];return t.runWebGLProgram(h,[o],o.dtype,d)}return t.uploadToGPU(o.dataId),sB(o,a,l,t)}const oB={kernelName:Xa,backendName:"webgl",kernelFunc:lr};const rB={kernelName:ca,backendName:"webgl",kernelFunc:n=>{const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{blockShape:r,crops:i}=s;S(o.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");const a=r.reduce((b,w)=>b*w),l=Ci(o.shape,r,a),c=Ii(l.length,r.length),u=$i(o.shape,r,a),h=Ph(i,r.length),d=zh(u,i,r.length),p=[],f=se({inputs:{x:o},backend:t,attrs:{shape:l}}),m=Vt({inputs:{x:f},backend:t,attrs:{perm:c}}),g=se({inputs:{x:m},backend:t,attrs:{shape:u}}),x=lr({inputs:{x:g},backend:t,attrs:{begin:h,size:d}});return p.push(f),p.push(m),p.push(g),p.forEach(b=>t.disposeIntermediateTensorInfo(b)),x}};function iB(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,weights:r}=e,{size:i}=s,a=t.readSync(o.dataId),l=t.readSync(r.dataId),c=B1(a,l,r.dtype,r.shape,i);return t.makeTensorInfo([i],r.dtype,c)}const aB={kernelName:Yc,backendName:"webgl",kernelFunc:iB};const lB=`
  int r = int(a.r) & int(b.r);
  int g = int(a.g) & int(b.g);
  int rb = int(a.b) & int(b.b);
  int ra = int(a.a) & int(b.a);
  return vec4(r, g, rb, ra);
`,cB=`
  return float(int(a.r) & int(b.r));
`;function uB(n){const{inputs:e,backend:t}=n,{a:s,b:o}=e,r=U().getBool("WEBGL_PACK_BINARY_OPERATIONS"),i=U().getNumber("WEBGL_VERSION");if(t.shouldExecuteOnCPU([s,o])||i===1){const l=t.texData.get(s.dataId).values,c=t.texData.get(o.dataId).values,[u,h]=wP(s.shape,o.shape,l,c,s.dtype),d=t.makeTensorInfo(h,s.dtype),p=t.texData.get(d.dataId);return p.values=u,d}let a;return r?a=new ir(lB,s.shape,o.shape,!1):a=new Co(cB,s.shape,o.shape),t.runWebGLProgram(a,[s,o],s.dtype)}const hB={kernelName:Zc,backendName:"webgl",kernelFunc:uB};function dB(n){const{inputs:e,backend:t}=n,{s0:s,s1:o}=e,r=t.readSync(s.dataId),i=t.readSync(o.dataId),a=we(Array.from(r),Array.from(i));return t.makeTensorInfo([a.length],"int32",Int32Array.from(a))}const pB={kernelName:Ep,backendName:"webgl",kernelFunc:dB};const uy=Nt({opSnippet:"return float(a != b);",cpuKernelImpl:VP,dtype:"bool"}),fB={kernelName:Ma,backendName:"webgl",kernelFunc:uy};function Xi(n){const{inputs:e,backend:t}=n,{input:s}=e,o=t.texData.get(s.dataId);return en({inputs:{x:o.complexTensorInfos.real},backend:t})}const mB={kernelName:vu,backendName:"webgl",kernelFunc:Xi};const gB="return float(int(x));";function xB(n,e){const t=new Zn(n.shape,gB),s=e.runWebGLProgram(t,[n],"int32");return{dataId:s.dataId,shape:s.shape,dtype:s.dtype}}function up(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{dtype:r}=s;if(r==="complex64"){if(o.dtype==="complex64")return en({inputs:{x:o},backend:t});const i=ot(o.shape),a=up({inputs:{x:o},backend:t,attrs:{dtype:"float32"}}),l=Os({inputs:{real:a,imag:i},backend:t});return i.dispose(),t.disposeIntermediateTensorInfo(a),l}if(o.dtype==="complex64"){const i=Xi({inputs:{input:o},backend:t}),a=up({inputs:{x:i},backend:t,attrs:{dtype:r}});return t.disposeIntermediateTensorInfo(i),a}if(!$p(o.dtype,r)){const i=en({inputs:{x:o},backend:t});return{dataId:i.dataId,shape:i.shape,dtype:r}}if(t.shouldExecuteOnCPU([o])){const i=t.texData.get(o.dataId).values,[a,l,c]=CP(i,o.shape,o.dtype,r);return t.makeTensorInfo(a,l,c)}if(r==="int32")return xB(o,t);if(r==="bool"){const i=t.makeTensorInfo([],"bool",Et("bool",1)),l=uy({inputs:{a:o,b:i},backend:t});return t.disposeIntermediateTensorInfo(i),l}throw new Error(`Error in Cast: failed to cast ${o.dtype} to ${r}`)}const bB={kernelName:br,backendName:"webgl",kernelFunc:up};const hy="return ceil(x);",yB=Ae({opSnippet:hy,packedOpSnippet:hy,cpuKernelImpl:IP}),wB={kernelName:yr,backendName:"webgl",kernelFunc:yB};class CB{constructor(e){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}}class IB{constructor(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=e,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}}function $B(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{clipValueMin:r,clipValueMax:i}=s;let a;U().getBool("WEBGL_PACK_CLIP")?a=new IB(o.shape):a=new CB(o.shape);const l=[[r],[i]];return t.runWebGLProgram(a,[o],o.dtype,l)}const vB={kernelName:wr,backendName:"webgl",kernelFunc:$B};class kB{constructor(e){this.variableNames=["real","imag"],this.outputShape=e,this.userCode=`
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
    `}}function dy(n,e){return{dataId:e.dataId,dtype:e.dtype,shape:n.shape}}function SB(n){const{inputs:e,backend:t}=n,{x:s}=e,o=t.texData.get(s.dataId),r=new kB(s.shape),i=[dy(s,o.complexTensorInfos.real),dy(s,o.complexTensorInfos.imag)];return t.runWebGLProgram(r,i,i[0].dtype)}const NB={kernelName:ua,backendName:"webgl",kernelFunc:SB};class TB{constructor(e){this.outputShape=[],this.outputShape=Vn(e,1),this.variableNames=e.map((i,a)=>`T${a}`);const t=new Array(e.length-1);t[0]=e[0][1];for(let i=1;i<t.length;i++)t[i]=t[i-1]+e[i][1];const s=[`if (yC < ${t[0]}) setOutput(getT0(yR, yC));`];for(let i=1;i<t.length;i++){const a=t[i-1];s.push(`else if (yC < ${t[i]}) setOutput(getT${i}(yR, yC-${a}));`)}const o=t.length,r=t[t.length-1];s.push(`else setOutput(getT${o}(yR, yC-${r}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${s.join(`
        `)}
      }
    `}}class EB{constructor(e,t){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=Vn(e,t);const s=this.outputShape,o=s.length,r=We(o),i=Bt("coords",o),a=["x","y","z","w","u","v"].slice(0,o);this.variableNames=e.map((m,g)=>`T${g}`);const l=new Array(e.length-1);l[0]=e[0][t];for(let m=1;m<l.length;m++)l[m]=l[m-1]+e[m][t];const c=a[t],u=a.slice(-2),h=a.join();let d=`if (${c} < ${l[0]}) {
        return getChannel(
            getT0(${h}), vec2(${u.join()}));
        }`;for(let m=1;m<l.length;m++){const g=l[m-1];d+=`
        if (${c} < ${l[m]}  && ${c} >= ${l[m-1]}) {
          return getChannel(
            getT${m}(${Nc(a,c,g)}),
            vec2(${Nc(u,c,g)}));
        }`}const p=l.length,f=l[l.length-1];d+=`
        return getChannel(
          getT${p}(${Nc(a,c,f)}),
          vec2(${Nc(u,c,f)}));`,this.userCode=`
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
    `}}function Nc(n,e,t){const s=n.indexOf(e);return n.map((r,i)=>i===s?`${r} - ${t}`:r).join()}function Tc(n){const{inputs:e,backend:t}=n,{input:s}=e,o=t.texData.get(s.dataId);return en({inputs:{x:o.complexTensorInfos.imag},backend:t})}const RB={kernelName:gu,backendName:"webgl",kernelFunc:Tc};function Yi(n,e,t){const s=n[0].dtype;if(s==="complex64"){const p=n.map(b=>Xi({inputs:{input:b},backend:t})),f=n.map(b=>Tc({inputs:{input:b},backend:t})),m=Yi(p,e,t),g=Yi(f,e,t),x=Os({inputs:{real:m,imag:g},backend:t});return p.forEach(b=>t.disposeIntermediateTensorInfo(b)),f.forEach(b=>t.disposeIntermediateTensorInfo(b)),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(g),x}let o=t.shouldExecuteOnCPU(n);if(s==="string"&&(o=!0),o){const p=n.map(y=>{const $=[-1,K(y.shape.slice(e))];return se({inputs:{x:y},backend:t,attrs:{shape:$}})}),f=p.map(y=>({vals:t.readSync(y.dataId),shape:y.shape})),m=Vn(p.map(y=>y.shape),1),g=p[0].shape[0]===1,x=$P(f,m,s,g),b=Vn(n.map(y=>y.shape),e),w=t.makeTensorInfo(b,s,x);return p.forEach(y=>t.disposeIntermediateTensorInfo(y)),w}const r=n.filter(p=>K(p.shape)>0),i=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&r[0].shape.length>1;if(r.length===1){const p=i?new Zn(n[0].shape,Fs):new _s(n[0].shape,Fs);return t.runWebGLProgram(p,n,s)}const a=U().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(r.length>a){const p=[];for(let m=0;m<r.length;m+=a){const g=r.slice(m,m+a);p.push(Yi(g,e,t))}const f=Yi(p,e,t);for(const m of p)t.disposeIntermediateTensorInfo(m);return f}if(i){const p=new EB(r.map(f=>f.shape),e);return t.runWebGLProgram(p,r,s)}const{tensors2D:l,outShape:c}=AB(r,e,t),u=new TB(l.map(p=>p.shape)),h=t.runWebGLProgram(u,l,s);l.forEach(p=>t.disposeIntermediateTensorInfo(p));const d=se({inputs:{x:h},attrs:{shape:c},backend:t});return t.disposeIntermediateTensorInfo(h),d}function AB(n,e,t){const s=Vn(n.map(r=>r.shape),e);return{tensors2D:n.map(r=>se({inputs:{x:r},attrs:{shape:[-1,K(r.shape.slice(e))]},backend:t})),outShape:s}}function py(n){const{inputs:e,backend:t,attrs:s}=n,{axis:o}=s,r=ve(o,e[0].shape)[0],i=e.map(c=>c.shape);Oh(i,r);const a=Vn(e.map(c=>c.shape),r);if(K(a)===0)return t.makeTensorInfo(a,e[0].dtype,[]);const l=e.filter(c=>K(c.shape)>0);return l.length===1?en({inputs:{x:l[0]},backend:t}):Yi(l,r,t)}const DB={kernelName:ha,backendName:"webgl",kernelFunc:py};class fy{constructor(e,t=!1,s=null,o=!1,r=!1){this.variableNames=["x","W"],this.outputShape=e.outShape;const i=e.padInfo.top,a=e.padInfo.left,l=e.strideHeight,c=e.strideWidth,u=e.dilationHeight,h=e.dilationWidth,d=e.filterHeight,p=e.filterWidth,f=Math.floor(e.inChannels/4)*4,m=e.inChannels%4,g=e.dataFormat==="channelsLast",x=g?1:2,b=g?2:3,w=g?3:1;let y="",C="";s&&(o?y=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${s}
        }`:r?y=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${s}
        }`:y=`
          float activation(float x) {
            ${s}
          }
        `,C="result = activation(result);");const $=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),r&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
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

          if (xR < 0 || xR >= ${e.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${p}; wC++) {
            int xC = xCCorner + wC * ${h};

            if (xC < 0 || xC >= ${e.inWidth}) {
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
        ${$}
        ${C}
        setOutput(result);
      }
    `}}class FB{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;const t=e.padInfo.front,s=e.padInfo.top,o=e.padInfo.left,r=e.strideDepth,i=e.strideHeight,a=e.strideWidth,l=e.dilationDepth,c=e.dilationHeight,u=e.dilationWidth,h=e.filterDepth,d=e.filterHeight,p=e.filterWidth,f=Math.floor(e.inChannels/4)*4,m=e.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${r}, ${i}, ${a});
      const ivec3 pads = ivec3(${t}, ${s}, ${o});

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

          if (xF < 0 || xF >= ${e.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${d}; wR++) {
            int xR = xRCorner + wR * ${c};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${p}; wC++) {
              int xC = xCCorner + wC * ${u};

              if (xC < 0 || xC >= ${e.inWidth}) {
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
    `}}class my{constructor(e,t=!1,s=null,o=!1,r=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=_t(this.outputShape.length);const i=e.padInfo.left,a=e.strideWidth,l=e.dilationWidth,c=e.filterHeight,u=e.filterWidth,h=u;let d=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let g=0;g<u;g++)d+=`
           vec4 xTexelC${g*2};
           int xTexelC${g*2}Ready;
           vec4 xTexelC${g*2+1};
           int xTexelC${g*2+1}Ready;
           vec4 xC${g};`;d+=`
     for (int r = 0; r < ${c}; r++) {
      for (int d1 = 0; d1 < ${e.inChannels}; d1 += 2) {
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
                 `,x+1<u)){const b=i%2===0?wn(l):l;l%2===0&&i%2===1||l%2!==0&&i%2!==1?(d+=`
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
             if(d1 + 1 < ${e.inChannels}) {
               dotProd += xC${x}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,x+1<u&&(d+=`
               wTexel = getW(r, ${x+1}, d1, d2);
               dotProd += xC${x+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${e.inChannels}) {
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
         }`,f="result = activation(result);");const m=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),r&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
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
     `}}class _B{constructor(e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=e,this.enableShapeUniforms=_t(this.outputShape.length);const{dataFormat:s}=t,o=zt(),r=s==="channelsLast",i=r?1:2,a=r?2:3,l=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${e[2]} && pos < ${e[1]}) {`;let c="";for(let u=0;u<=1;u++)for(let h=0;h<=1;h++)c+=`
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
    `}}function Ec(n,e){const t=n.length;return t>=3?e?[...n.slice(0,-3),n[t-3]*n[t-2],n[t-1]]:[...n.slice(0,-3),n[t-3],n[t-2]*n[t-1]]:!e&&t===1&&n[0]>1?[n[0],1]:null}function gy({x:n,filter:e,convInfo:t,backend:s,bias:o=null,preluActivationWeights:r=null,leakyreluAlpha:i=0,activation:a=null}){const l=n.shape,c=s.texData.get(n.dataId),u=t.inChannels,h=l[0]*l[1]*l[2],d=t.outChannels,p=t.dataFormat==="channelsLast",f=!1,m=!1;let g;const x=[];if(r!=null){const y=Ec(r.shape,p);y!=null&&(r=se({inputs:{x:r},backend:s,attrs:{shape:y}}),x.push(r))}if(o!=null){const y=Ec(o.shape,p);y!=null&&(o=se({inputs:{x:o},backend:s,attrs:{shape:y}}),x.push(o))}if(!((h===1||d===1)&&u>oy)&&c.isPacked&&p&&c.texture!=null&&l[2]%2!==0&&_e(c.shape.slice(-3),l.slice(-3))){const y=l[0]*l[1]*(l[2]+1),C={dataId:n.dataId,shape:[1,y,t.inChannels],dtype:n.dtype},$=c.shape;c.shape=c.shape.slice(),c.shape[c.shape.length-2]++,S(yc(c.shape,C.shape),()=>`packed reshape ${c.shape} to ${C.shape} isn't free`);const v=se({inputs:{x:e},backend:s,attrs:{shape:[1,t.inChannels,t.outChannels]}});x.push(v);const k=kc({a:C,b:v,backend:s,transposeA:f,transposeB:m,bias:o,activation:a,preluActivationWeights:r,leakyreluAlpha:i}),N=s.texData.get(k.dataId);S(N.isPacked,()=>"batchMatMul result is expected to be packed"),c.shape=$,N.shape=t.outShape,g=en({inputs:{x:k},backend:s}),g.shape=t.outShape,x.push(k)}else{const y=t.outHeight*t.outWidth,C=se({inputs:{x:n},backend:s,attrs:{shape:p?[t.batchSize,y,t.inChannels]:[t.batchSize,t.inChannels,y]}}),$=se({inputs:{x:e},backend:s,attrs:{shape:[1,t.inChannels,t.outChannels]}}),v=kc({a:p?C:$,b:p?$:C,transposeA:!p,transposeB:m,backend:s,bias:o,activation:a,preluActivationWeights:r,leakyreluAlpha:i});g=se({inputs:{x:v},backend:s,attrs:{shape:t.outShape}}),x.push(C),x.push($),x.push(v)}for(const y of x)s.disposeIntermediateTensorInfo(y);return g}function xy({x:n,filter:e,convInfo:t,backend:s,bias:o=null,preluActivationWeights:r=null,leakyreluAlpha:i=0,activation:a=null}){const{filterWidth:l,filterHeight:c,inChannels:u,outWidth:h,outHeight:d,dataFormat:p}=t,f=p==="channelsLast",m=l*c*u,g=d*h,x=[t.batchSize,m,g],b=!0,w=!1,y=[];if(r!=null){const z=Ec(r.shape,f);z!=null&&(r=se({inputs:{x:r},backend:s,attrs:{shape:z}}),y.push(r))}if(o!=null){const z=Ec(o.shape,f);z!=null&&(o=se({inputs:{x:o},backend:s,attrs:{shape:z}}),y.push(o))}const C=se({inputs:{x:e},backend:s,attrs:{shape:[1,m,K(e.shape)/m]}});y.push(C);const $=new _B(x,t),v=[n.shape,[t.padInfo.top,t.padInfo.left],[t.strideHeight,t.strideWidth],[t.dilationHeight,t.dilationWidth],[t.inChannels],[t.filterWidth*t.inChannels],[t.outWidth]],k=s.runWebGLProgram($,[n],"float32",v),N=se({inputs:{x:k},backend:s,attrs:{shape:x}});y.push(k),y.push(N);const T=o!=null,I=r!=null,E=a==="leakyrelu",R=a?Ki(a,!0):null,D=new Q1(f?N.shape:C.shape,f?C.shape:N.shape,f?[t.batchSize,g,t.outChannels]:[t.batchSize,t.outChannels,g],b,w,T,R,I,E),F=f?[N,C]:[C,N];if(o&&F.push(o),I&&F.push(r),E){const z=s.makeTensorInfo([],"float32",fs(i,"float32"));F.push(z),y.push(z)}const _=s.runWebGLProgram(D,F,"float32"),P=se({inputs:{x:_},backend:s,attrs:{shape:t.outShape}});y.push(_);for(const z of y)s.disposeIntermediateTensorInfo(z);return P}function OB(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r}=e,{strides:i,pad:a,dataFormat:l,dilations:c,dimRoundingMode:u}=s,h=ns(l),d=$t(o.shape,r.shape,i,c,a,u,!1,h);let p;if(d.filterHeight===1&&d.filterWidth===1&&d.dilationHeight===1&&d.dilationWidth===1&&d.strideHeight===1&&d.strideWidth===1&&(d.padInfo.type==="SAME"||d.padInfo.type==="VALID"))p=gy({x:o,filter:r,convInfo:d,backend:t});else if(d.strideWidth<=2&&h==="channelsLast"&&U().getBool("WEBGL_EXP_CONV")){const m=new my(d),g=[[d.padInfo.top,d.padInfo.left],[d.strideHeight,d.strideWidth],[d.dilationHeight,d.dilationWidth],[d.inHeight,d.inWidth]];p=t.runWebGLProgram(m,[o,r],"float32",g)}else if(U().getBool("WEBGL_CONV_IM2COL"))p=xy({x:o,filter:r,convInfo:d,backend:t});else{const m=new fy(d);p=t.runWebGLProgram(m,[o,r],"float32")}const f=se({inputs:{x:p},backend:t,attrs:{shape:d.outShape}});return t.disposeIntermediateTensorInfo(p),f}const LB={kernelName:da,backendName:"webgl",kernelFunc:OB};class MB{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideHeight,s=e.strideWidth,o=e.padInfo.top,r=e.padInfo.left,i=e.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${o};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${s} - ${r};

              if (xC < 0 || xC >= ${e.inWidth}) {
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
    `}}class PB{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterHeight,s=e.filterWidth,o=e.strideHeight,r=e.strideWidth,i=e.dataFormat==="channelsLast",a=t-1-e.padInfo.top,l=s-1-e.padInfo.left,c=i?1:2,u=i?2:3,h=i?3:1;this.userCode=`
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
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${o}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${s}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${s} - 1 - wC;

            for (int d2 = 0; d2 < ${e.outChannels}; d2++) {

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
    `}}class zB{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideDepth,s=e.strideHeight,o=e.strideWidth,r=e.padInfo.front,i=e.padInfo.top,a=e.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yF = 0; yF < ${e.outDepth}; yF++) {
            int xF = wF + yF * ${t} - ${r};

            if (xF < 0 || xF >= ${e.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${e.outHeight}; yR++) {
              int xR = wR + yR * ${s} - ${i};

              if (xR < 0 || xR >= ${e.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${e.outWidth}; yC++) {
                int xC = wC + yC * ${o} - ${a};

                if (xC < 0 || xC >= ${e.inWidth}) {
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
    `}}class BB{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterDepth,s=e.filterHeight,o=e.filterWidth,r=e.strideDepth,i=e.strideHeight,a=e.strideWidth,l=t-1-e.padInfo.front,c=s-1-e.padInfo.top,u=o-1-e.padInfo.left;this.userCode=`
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
        for (int wF = 0; wF < ${t}; wF++) {
          float dyF = float(dyFCorner + wF) / ${r}.0;

          if (dyF < 0.0 || dyF >= ${e.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${t} - 1 - wF;

          for (int wR = 0; wR < ${s}; wR++) {
            float dyR = float(dyRCorner + wR) / ${i}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${s} - 1 - wR;

            for (int wC = 0; wC < ${o}; wC++) {
              float dyC = float(dyCCorner + wC) / ${a}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${o} - 1 - wC;

              for (int d2 = 0; d2 < ${e.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}}function VB(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,dy:r}=e,{strides:i,pad:a,dataFormat:l,dimRoundingMode:c,filterShape:u}=s,h=ns(l),d=$t(o.shape,u,i,1,a,c,!1,h),p=new MB(d);return t.runWebGLProgram(p,[o,r],"float32")}const WB={kernelName:Qc,backendName:"webgl",kernelFunc:VB};class UB{constructor(e){this.variableNames=["dy","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"strides",type:"vec2"}],this.outputShape=e.inShape,this.enableShapeUniforms=_t(this.outputShape.length);const t=e.filterHeight,s=e.filterWidth,o=t-1-e.padInfo.top,r=s-1-e.padInfo.left;this.userCode=`
      const ivec2 pads = ivec2(${o}, ${r});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];

        ivec2 dyCorner = ivec2(coords[1], coords[2]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        vec4 result = vec4(0.);
        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / strides[0];
          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);
          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${s}; wC++) {
            int wCPerm = ${s} - 1 - wC;

            float dyC = float(dyCCorner + wC) / strides[1];
            bool idyCVal = (dyC >= 0.0) && (dyC < ${e.outWidth}.0)
              && (fract(dyC) == 0.0);
            int idyC = int(dyC);

            float dyC2 = float(dyCCorner + wC + 1) / strides[1];
            bool idyCVal2 = (dyC2 >= 0.0) && (dyC2 < ${e.outWidth}.0)
              && (fract(dyC2) == 0.0);
            int idyC2 = int(dyC2);

            if (idyCVal && idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
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
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
                vec4 wValue = getW(wRPerm, wCPerm, d1, d2);
                vec4 dySample = getDy(batch, idyR, idyC, d2);
                vec2 dyValue = mod(float(idyC), 2.) == 0. ?
                  dySample.xy : dySample.zw;
                result.xy += vec2(dot(dyValue, wValue.xy),
                  dot(dyValue, wValue.zw));
              }
            } else if (idyCVal2) {
              for (int d2 = 0; d2 < ${e.outChannels}; d2 += 2) {
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
    `}}function GB(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,filter:r}=e,{inputShape:i,strides:a,pad:l,dataFormat:c,dimRoundingMode:u}=s,h=ns(c),d=$t(i,r.shape,a,1,l,u,!1,h);if(U().getBool("WEBGL_PACK_CONV2DTRANSPOSE")&&h==="channelsLast"){const p=[[d.strideHeight,d.strideWidth]],f=new UB(d);return t.runWebGLProgram(f,[o,r],"float32",p)}else{const p=new PB(d);return t.runWebGLProgram(p,[o,r],"float32")}}const HB={kernelName:pa,backendName:"webgl",kernelFunc:GB};function qB(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r}=e,{strides:i,pad:a,dilations:l}=s,c=bs(o.shape,r.shape,i,l,a),u=new FB(c);return t.runWebGLProgram(u,[o,r],"float32")}const KB={kernelName:fa,backendName:"webgl",kernelFunc:qB};function jB(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,dy:r}=e,{strides:i,pad:a,filterShape:l}=s,c=bs(o.shape,l,i,1,a),u=new zB(c);return t.runWebGLProgram(u,[o,r],"float32")}const XB={kernelName:eu,backendName:"webgl",kernelFunc:jB};function YB(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,filter:r}=e,{pad:i,strides:a,inputShape:l}=s,c=bs(l,r.shape,a,1,i),u=new BB(c);return t.runWebGLProgram(u,[o,r],"float32")}const ZB={kernelName:tu,backendName:"webgl",kernelFunc:YB};const JB=ar+`
  return cos(x);
`,QB=`
  vec4 result = cos(x);
  bvec4 isNaN = isnan(x);
  ${Io}
  return result;
`,eV=Ae({opSnippet:JB,packedOpSnippet:QB}),tV={kernelName:Cr,backendName:"webgl",kernelFunc:eV};const nV=Ae({opSnippet:`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`}),sV={kernelName:Ir,backendName:"webgl",kernelFunc:nV};class oV{constructor(e,t,s,o,r){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];const[i,a,l,c]=e,[u]=t,[h,d]=s;this.outputShape=[u,h,d,c];const p=o==="bilinear"?1:0,[f,m]=[`${a-1}.0`,`${l-1}.0`],[g,x,b]=h>1?[`${(a-1)/(h-1)}`,"(y2-y1) * height_ratio",`y1*${f} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${f}`],[w,y,C]=d>1?[`${(l-1)/(d-1)}`,"(x2-x1) * width_ratio",`x1*${m} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${m}`];this.userCode=`
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
        float in_x = ${C};
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
    `}}const rV={kernelName:su,backendName:"webgl",kernelFunc:n=>{const{inputs:e,backend:t,attrs:s}=n,{image:o,boxes:r,boxInd:i}=e,{cropSize:a,method:l,extrapolationValue:c}=s,u=new oV(o.shape,r.shape,a,l,c);return t.runWebGLProgram(u,[o,r,i],"float32")}};var Zi;(function(n){n.Prod="*",n.Sum="+"})(Zi||(Zi={}));class by{constructor(e,t,s,o){this.op=e,this.outputShape=t,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];const r=this.outputShape.length,i=this.op===Zi.Prod?"1.0":"0.0",a=s?i:`getX(${yy(r,"coords",this.op)})`,l=this.outputShape[this.outputShape.length-1];let c="",u="";s?(c=o?`end != ${l-1}`:"end != 0",u=o?"end + 1":"end - 1"):(c=o?`end + pow2 < ${l}`:"end >= pow2",u=o?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${We(r)} coords = getOutputCoords();
        int end = ${wy(r,"coords",this.op)};
        float val = ${a};
        int pow2 = int(pow(2.0, index));
        if (${c}) {
          int idx = ${u};
          ${wy(r,"coords",this.op)} = idx;
          val ${this.op}= getX(${yy(r,"coords",this.op)});
        }
        setOutput(val);
      }
    `}}function yy(n,e,t){if(n===1)return`${e}`;if(n===2)return`${e}.x, ${e}.y`;if(n===3)return`${e}.x, ${e}.y, ${e}.z`;if(n===4)return`${e}.x, ${e}.y, ${e}.z, ${e}.w`;throw new Error(`Cumulative ${t} for rank ${n} is not yet supported`)}function wy(n,e,t){if(n===1)return`${e}`;if(n===2)return`${e}.y`;if(n===3)return`${e}.z`;if(n===4)return`${e}.w`;throw new Error(`Cumulative ${t} for rank ${n} is not yet supported`)}function Cy(n,e,t,s,o,r){const i=e.shape.length,a=Ze([s],i);let l=e;a!=null&&(l=Vt({inputs:{x:e},backend:t,attrs:{perm:a}}));const c=nt(1,i)[0];if(c!==i-1)throw new Error(`WebGL cumprod shader expects an inner-most axis=${e.shape.length-1} but got axis=${s}`);const u=l.shape[c];let h=en({inputs:{x:l},backend:t});for(let d=0;d<=Math.ceil(Math.log2(u))-1;d++){const p=new by(n,l.shape,!1,r),f=[[d]],m=h;h=t.runWebGLProgram(p,[h],h.dtype,f),t.disposeIntermediateTensorInfo(m)}if(o){const d=new by(n,l.shape,o,r),p=h;h=t.runWebGLProgram(d,[h],h.dtype),t.disposeIntermediateTensorInfo(p)}if(a!=null){const d=ys(a),p=Vt({inputs:{x:h},backend:t,attrs:{perm:d}});return t.disposeIntermediateTensorInfo(h),t.disposeIntermediateTensorInfo(l),p}return h}function iV(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,exclusive:i,reverse:a}=s;return Cy(Zi.Prod,o,t,r,i,a)}const aV={kernelName:nu,backendName:"webgl",kernelFunc:iV};function lV(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,exclusive:i,reverse:a}=s;return Cy(Zi.Sum,o,t,r,i,a)}const cV={kernelName:ma,backendName:"webgl",kernelFunc:lV};function uV(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,weights:r}=e,{size:i,binaryOutput:a}=s;if(o.shape.length===1){const l=t.readSync(o.dataId),c=t.readSync(r.dataId),u=B1(l,c,r.dtype,r.shape,i);return t.makeTensorInfo([i],r.dtype,u)}else if(o.shape.length===2){const l=t.bufferSync(o),c=t.bufferSync(r),u=yP(l,c,i,a);return t.makeTensorInfo(u.shape,r.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${o.shape.length}.`)}const hV={kernelName:ou,backendName:"webgl",kernelFunc:uV};class dV{constructor(e,t,s){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=s,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${t};
      int offset_h = imod(h, ${t});
      int in_w = w / ${t};
      int offset_w = imod(w, ${t});
      int offset_d = (offset_h * ${t} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}}function pV(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{blockSize:r,dataFormat:i}=s,a=o.shape[0],l=i==="NHWC"?o.shape[1]:o.shape[2],c=i==="NHWC"?o.shape[2]:o.shape[3],u=i==="NHWC"?o.shape[3]:o.shape[1],h=l*r,d=c*r,p=u/(r*r),f=i==="NHWC"?[a,h,d,p]:[a,p,h,d],m=new dV(f,r,i);return t.runWebGLProgram(m,[o],o.dtype)}const fV={kernelName:ru,backendName:"webgl",kernelFunc:pV};class Iy{constructor(e,t=!1,s=null,o=!1,r=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=_t(this.outputShape.length);const i=e.filterHeight,a=e.filterWidth,l=e.outChannels/e.inChannels;let c="",u="";s&&(o?c=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${s}
        }`:r?c=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${s}
        }`:c=`
          float activation(float x) {
            ${s}
          }
        `,u="result = activation(result);");const h=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),r&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
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
    `}}class $y{constructor(e,t=!1,s=null,o=!1,r=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=e.outShape,this.enableShapeUniforms=_t(this.outputShape.length);const i=e.outChannels/e.inChannels,a=e.padInfo.left,l=e.strideWidth,c=e.dilationWidth,u=e.filterHeight,h=e.filterWidth,d=h;let p=`
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
                `,b+1<h)){const w=a%2===0?wn(c):c;c%2===0&&a%2===1||c%2!==0&&a%2!==1?(p+=`
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
        }`,m="result = activation(result);");const g=t?"result += getBiasAtOutCoords();":"";t&&this.variableNames.push("bias"),o&&this.variableNames.push("preluActivationWeights"),r&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
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
    `}}function mV(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r}=e,{strides:i,pad:a,dilations:l,dimRoundingMode:c}=s;let u=l;u==null&&(u=[1,1]),S(At(i,u),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${i} and dilations '${u}'`);const h=$t(o.shape,r.shape,i,u,a,c,!0);let d;U().getBool("WEBGL_PACK_DEPTHWISECONV")&&h.strideWidth<=2&&h.outChannels/h.inChannels===1?d=new $y(h):d=new Iy(h);const p=[[h.padInfo.top,h.padInfo.left],[h.strideHeight,h.strideWidth],[h.dilationHeight,h.dilationWidth],[h.inHeight,h.inWidth]];return t.runWebGLProgram(d,[o,r],"float32",p)}const gV={kernelName:ga,backendName:"webgl",kernelFunc:mV};class xV{constructor(e){this.variableNames=["x","dy"],this.outputShape=e.filterShape;const t=e.strideHeight,s=e.strideWidth,o=e.padInfo.top,r=e.padInfo.left,i=e.outChannels/e.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${i} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${e.batchSize}; b++) {
          for (int yR = 0; yR < ${e.outHeight}; yR++) {
            int xR = wR + yR * ${t} - ${o};

            if (xR < 0 || xR >= ${e.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${e.outWidth}; yC++) {
              int xC = wC + yC * ${s} - ${r};

              if (xC < 0 || xC >= ${e.inWidth}) {
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
    `}}class bV{constructor(e){this.variableNames=["dy","W"],this.outputShape=e.inShape;const t=e.filterHeight,s=e.filterWidth,o=e.strideHeight,r=e.strideWidth,i=t-1-e.padInfo.top,a=s-1-e.padInfo.left,l=e.outChannels/e.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${a});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${t}; wR++) {
          float dyR = float(dyRCorner + wR) / ${o}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${t} - 1 - wR;

          for (int wC = 0; wC < ${s}; wC++) {
            float dyC = float(dyCCorner + wC) / ${r}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
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
    `}}function yV(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,dy:r}=e,{strides:i,dilations:a,pad:l,dimRoundingMode:c,filterShape:u}=s,h=$t(o.shape,u,i,a,l,c,!0),d=new xV(h);return t.runWebGLProgram(d,[o,r],"float32")}const wV={kernelName:iu,backendName:"webgl",kernelFunc:yV};function CV(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,filter:r}=e,{strides:i,dilations:a,pad:l,dimRoundingMode:c,inputShape:u}=s,h=$t(u,r.shape,i,a,l,c,!0),d=new bV(h);return t.runWebGLProgram(d,[o,r],"float32")}const IV={kernelName:au,backendName:"webgl",kernelFunc:CV};class $V{constructor(e){this.variableNames=["X"],this.outputShape=[e,e],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}}function vV(n){const{inputs:e,backend:t}=n,{x:s}=e,o=[...s.shape,...s.shape],r=K(s.shape),i=se({inputs:{x:s},backend:t,attrs:{shape:[r]}}),a=new $V(r),l=t.runWebGLProgram(a,[i],i.dtype),c=se({inputs:{x:l},backend:t,attrs:{shape:o}});return t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(l),c}const kV={kernelName:Rp,backendName:"webgl",kernelFunc:vV};class SV{constructor(e){this.variableNames=["x","W"],this.outputShape=e.outShape;const{inHeight:t,inWidth:s,padInfo:o,strideHeight:r,strideWidth:i,filterHeight:a,filterWidth:l,dilationHeight:c,dilationWidth:u}=e,{top:h,left:d}=o;this.userCode=`
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

          if (hIn >= 0 && hIn < ${t}) {
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
    `}}function NV(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r}=e,{strides:i,pad:a,dilations:l}=s,c=ui(o.shape,r.shape,i,a,"NHWC",l);let u;const h=new SV(c);u=t.runWebGLProgram(h,[o,r],"float32");const d=se({inputs:{x:u},backend:t,attrs:{shape:c.outShape}});return t.disposeIntermediateTensorInfo(u),d}const TV={kernelName:xa,backendName:"webgl",kernelFunc:NV};function EV(n){const{inputs:e,backend:t,attrs:s}=n,{equation:o}=s,r=e,{allDims:i,summedDims:a,idDims:l}=jh(o,r.length);Yh(i.length,l,r);const{path:c,steps:u}=Zh(a,l),h=u.length;let d=null,p=i.length;const f=[];for(let m=0;m<h;++m){for(const g of u[m]){const{permutationIndices:x,expandDims:b}=Xh(p,l[g]);let w;Jh(x)?w=r[g]:(w=Vt({inputs:{x:r[g]},backend:t,attrs:{perm:x}}),f.push(w));const y=w.shape.slice();for(let C=0;C<b.length;++C)y.splice(b[C],0,1);_e(w.shape,y)||(w=se({inputs:{x:w},backend:t,attrs:{shape:y}}),f.push(w)),d===null?d=w:(d=ap({inputs:{a:w,b:d},backend:t}),f.push(d))}m<h-1&&(c[m]>=0&&(d=vc({inputs:{x:d},backend:t,attrs:{axis:c[m]-(i.length-p),keepDims:!1}}),f.push(d)),p--)}for(const m of f)m!==d&&t.disposeIntermediateTensorInfo(m);return d}const RV={kernelName:uu,backendName:"webgl",kernelFunc:EV};const AV=Ae({opSnippet:"return (x >= 0.0) ? x : (exp(x) - 1.0);",packedOpSnippet:`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`}),DV={kernelName:vr,backendName:"webgl",kernelFunc:AV};const FV="return (b >= 0.0) ? a : a * (b + 1.0);",_V=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,OV={kernelName:hu,backendName:"webgl",kernelFunc:n=>{const{inputs:e,backend:t}=n,{dy:s,y:o}=e,r=U().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ir(_V,s.shape,o.shape):new Co(FV,s.shape,o.shape);return t.runWebGLProgram(r,[s,o],s.dtype)}};const LV=Nt({opSnippet:"return float(a == b);",packedOpSnippet:`
  return vec4(equal(a, b));
`,dtype:"bool",cpuKernelImpl:vP}),MV={kernelName:ba,backendName:"webgl",kernelFunc:LV};const PV=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${Bh};
  float a1 = ${Vh};
  float a2 = ${Wh};
  float a3 = ${Uh};
  float a4 = ${Gh};
  float a5 = ${Hh};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,zV=Ae({opSnippet:PV}),BV={kernelName:kr,backendName:"webgl",kernelFunc:zV};const VV=ar+`
  return exp(x);
`,vy=Ae({opSnippet:VV,packedOpSnippet:`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:kP,dtype:"float32"}),WV={kernelName:Sr,backendName:"webgl",kernelFunc:vy};function hp(n){const{inputs:e,attrs:t,backend:s}=n,{dim:o}=t,{input:r}=e,i=r.shape.length,a=r.shape.slice();let l=o;return o<0&&(S(-(i+1)<=o,()=>`Axis must be in the interval [${-(i+1)}, ${i}]`),l=i+o+1),a.splice(l,0,1),se({inputs:{x:r},backend:s,attrs:{shape:a}})}const UV={kernelName:ya,backendName:"webgl",kernelFunc:hp};const ky="return exp(x) - 1.0;",GV=Ae({opSnippet:ky,packedOpSnippet:ky,cpuKernelImpl:SP}),HV={kernelName:Nr,backendName:"webgl",kernelFunc:GV};class Sy{constructor(e,t,s){this.variableNames=["real","imag"];const o=t[1];this.outputShape=t;const r=s?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,i=s?`${o}.0`:"1.0";let a;if(e==="real")a="return real * expR - imag * expI;";else if(e==="imag")a="return real * expI + imag * expR;";else throw new Error(`FFT component must be either "real" or "imag", got ${e}.`);this.userCode=`
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
    `}}function Ny(n,e,t){const s=t.texData.get(n.dataId),o=K(n.shape),r=n.shape[n.shape.length-1],i=o/r,a=se({inputs:{x:n},backend:t,attrs:{shape:[i,r]}}),l=a.shape,c=new Sy("real",l,e),u=new Sy("imag",l,e),h=[{dataId:s.complexTensorInfos.real.dataId,dtype:s.complexTensorInfos.real.dtype,shape:l},{dataId:s.complexTensorInfos.imag.dataId,dtype:s.complexTensorInfos.imag.dtype,shape:l}],d=t.runWebGLProgram(c,h,"float32"),p=t.runWebGLProgram(u,h,"float32"),f=Os({inputs:{real:d,imag:p},backend:t});t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(p);const m=se({inputs:{x:f},backend:t,attrs:{shape:n.shape}});return t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(f),m}function qV(n){const{inputs:e,backend:t}=n,{input:s}=e;return Ny(s,!1,t)}const KV={kernelName:du,backendName:"webgl",kernelFunc:qV};class jV{constructor(e,t){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=e,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}}function Ji(n){const{backend:e,attrs:t}=n,{shape:s,value:o}=t;let{dtype:r}=t;if(r=r||To(o),r==="string"){const i=et(r,K(s));return i.fill(o),e.makeTensorInfo(s,r,i)}else{const i=new jV(s,o),a=[[o]];return e.runWebGLProgram(i,[],r,a)}}const XV={kernelName:pu,backendName:"webgl",kernelFunc:Ji};class YV{constructor(e){this.variableNames=["Image"],this.outputShape=[];const t=e[2];this.outputShape=e,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${t} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${t}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}}const ZV={kernelName:fu,backendName:"webgl",kernelFunc:({inputs:n,backend:e})=>{const{image:t}=n,s=e,o=new YV(t.shape);return s.runWebGLProgram(o,[t],t.dtype)}};const Ty="return floor(x);",JV=Ae({opSnippet:Ty,packedOpSnippet:Ty,cpuKernelImpl:NP}),QV={kernelName:Tr,backendName:"webgl",kernelFunc:JV};const eW=Nt({opSnippet:`
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
`,dtype:"int32"}),tW={kernelName:Er,backendName:"webgl",kernelFunc:eW};class nW{constructor(e){this.variableNames=["A"];const t=zt(),[s,o]=e;this.outputShape=e,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${o}.0, ${s}.0);

        vec4 values = ${t.texture2D}(A, uv);
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
    `}}class sW{constructor(e){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;const t=zt(),[s,o]=e;this.outputShape=e,this.userCode=`
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
            vec4 values = ${t.texture2D}(A, uv);
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

        ${t.output} = result;
      }
    `}}const oW={kernelName:xw,backendName:"webgl",kernelFunc:rW};let cr,dp=U().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function rW(n){const{inputs:e,backend:t,attrs:s}=n;let{pixels:o}=e;const{numChannels:r}=s,i=typeof HTMLVideoElement!="undefined"&&o instanceof HTMLVideoElement,a=typeof HTMLImageElement!="undefined"&&o instanceof HTMLImageElement,[l,c]=i?[o.videoWidth,o.videoHeight]:[o.width,o.height],u=[c,l],h=[c,l,r];if(a||i){const m=U().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(cr==null||m!==dp)&&(dp=m,cr=document.createElement("canvas").getContext("2d",{willReadFrequently:dp})),cr.canvas.width=l,cr.canvas.height=c,cr.drawImage(o,0,0,l,c),o=cr.canvas}const d=t.makeTensorInfo(u,"int32");t.texData.get(d.dataId).usage=an.PIXELS,t.gpgpu.uploadPixelDataToTexture(t.getTexture(d.dataId),o);const p=U().getBool("WEBGL_PACK")?new sW(h):new nW(h),f=t.runWebGLProgram(p,[d],"int32");return t.disposeData(d.dataId),f}function iW(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r,bias:i,preluActivationWeights:a}=e,{strides:l,pad:c,dataFormat:u,dilations:h,dimRoundingMode:d,activation:p,leakyreluAlpha:f}=s,m=ns(u),g=$t(o.shape,r.shape,l,h,c,d,!1,m);let x;const b=[],w=i!=null,y=a!=null,C=p==="leakyrelu",$=()=>{const k=[o,r],N=(T,I)=>{if(I==="NCHW"&&T.shape.length===1&&T.shape[0]!==1){const E=se({inputs:{x:T},backend:t,attrs:{shape:[T.shape[0],1,1]}});return b.push(E),E}return T};if(w&&k.push(N(i,u)),y&&k.push(N(a,u)),C){const T=t.makeTensorInfo([],"float32",fs(f,"float32"));k.push(T),b.push(T)}return k};if(g.filterHeight===1&&g.filterWidth===1&&g.dilationHeight===1&&g.dilationWidth===1&&g.strideHeight===1&&g.strideWidth===1&&(g.padInfo.type==="SAME"||g.padInfo.type==="VALID"))x=gy({x:o,filter:r,convInfo:g,backend:t,bias:i,activation:p,preluActivationWeights:a,leakyreluAlpha:f});else if(g.strideWidth<=2&&m==="channelsLast"&&U().getBool("WEBGL_EXP_CONV")){const k=p?Ki(p,!0):null,N=new my(g,w,k,y,C),T=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],I=$();x=t.runWebGLProgram(N,I,"float32",T)}else if(U().getBool("WEBGL_CONV_IM2COL"))x=xy({x:o,filter:r,convInfo:g,backend:t,bias:i,activation:p,preluActivationWeights:a,leakyreluAlpha:f});else{const k=p?Ki(p,!1):null,N=new fy(g,w,k,y,C),T=$();x=t.runWebGLProgram(N,T,"float32")}const v=se({inputs:{x},backend:t,attrs:{shape:g.outShape}});return b.push(x),b.forEach(k=>t.disposeIntermediateTensorInfo(k)),v}const aW={kernelName:ol,backendName:"webgl",kernelFunc:iW};function lW(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,filter:r,bias:i,preluActivationWeights:a}=e,{strides:l,pad:c,dilations:u,dimRoundingMode:h,activation:d,leakyreluAlpha:p}=s,f=[];let m=u;m==null&&(m=[1,1]),S(At(l,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${l} and dilations '${m}'`);const g=$t(o.shape,r.shape,l,m,c,h,!0),x=U().getBool("WEBGL_PACK_DEPTHWISECONV")&&g.strideWidth<=2&&g.outChannels/g.inChannels===1,b=d?Ki(d,x):null,w=[o,r],y=i!=null,C=a!=null,$=d==="leakyrelu";if(y&&w.push(i),C&&w.push(a),$){const T=t.makeTensorInfo([],"float32",fs(p,"float32"));w.push(T),f.push(T)}let v;x?v=new $y(g,y,b,C,$):v=new Iy(g,y,b,C,$);const k=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],N=t.runWebGLProgram(v,w,"float32",k);return f.forEach(T=>t.disposeIntermediateTensorInfo(T)),N}const cW={kernelName:Xp,backendName:"webgl",kernelFunc:lW};class uW{constructor(e,t,s,o){this.sliceDim=e,this.strides=t,this.paramsShape=o,this.variableNames=["x","indices"],this.outputShape=s;const r=We(s.length);let i=`
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
      `}}function hW(n){const{inputs:e,backend:t}=n,{params:s,indices:o}=e,r=o.shape,i=r[r.length-1],a=K(s.shape),[l,c,u,h]=Dh(s,o),d=se({inputs:{x:o},backend:t,attrs:{shape:[c,i]}}),p=se({inputs:{x:s},backend:t,attrs:{shape:[K(s.shape)/u,u]}});if(t.shouldExecuteOnCPU([s,o])||s.dtype==="string"){const x=t.readSync(o.dataId),b=t.bufferSync(s),w=TP(x,b,s.dtype,c,i,u,h,s.shape,a);return t.makeTensorInfo(l,s.dtype,w.values)}const f=new uW(i,h,[c,u],s.shape),m=t.runWebGLProgram(f,[p,d],p.dtype),g=se({inputs:{x:m},backend:t,attrs:{shape:l}});return t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(p),t.disposeIntermediateTensorInfo(m),g}const dW={kernelName:Ap,backendName:"webgl",kernelFunc:hW};class pW{constructor(e,t){this.variableNames=["A","indices"],this.outputShape=t,this.rank=t.length;const s=We(this.rank),o=fW(e);this.userCode=`
      void main() {
        ${s} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${e[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${o}));
      }
    `}}function fW(n,e){const t=["resRC.x","resRC.y","resRC.z","resRC.w"],s=[];for(let o=0;o<n.length;o++)o===2?s.push("index"):s.push(`${t[o]}`);return s.join()}function Ey(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,indices:r}=e,{axis:i,batchDims:a}=s,l=ve(i,o.shape)[0];if(U().get("DEBUG")){const b=t.readSync(r.dataId),w=o.shape[l];for(let y=0;y<b.length;++y){const C=b[y];S(C<=w-1&&C>=0,()=>`GatherV2: the index value ${C} is not in [0, ${w-1}]`)}}const c=dg(o,r,l,a),u=K(r.shape),h=[],d=se({inputs:{x:o},backend:t,attrs:{shape:[c.batchSize,c.outerSize,c.dimSize,c.sliceSize]}}),p=se({inputs:{x:r},backend:t,attrs:{shape:[c.batchSize,u/c.batchSize]}});h.push(d),h.push(p);const f=[c.batchSize,c.outerSize,u/c.batchSize,c.sliceSize];if(t.shouldExecuteOnCPU([o,r])||o.dtype==="string"){const b=t.bufferSync(p),w=t.bufferSync(d),y=EP(w,b,f);return h.forEach(C=>t.disposeIntermediateTensorInfo(C)),t.makeTensorInfo(c.outputShape,y.dtype,y.values)}const m=new pW(d.shape,f),g=t.runWebGLProgram(m,[d,p],d.dtype);h.push(g);const x=se({inputs:{x:g},backend:t,attrs:{shape:c.outputShape}});return h.forEach(b=>t.disposeIntermediateTensorInfo(b)),x}const mW={kernelName:Ca,backendName:"webgl",kernelFunc:Ey};const gW=Nt({opSnippet:"return float(a > b);",packedOpSnippet:`
  return vec4(greaterThan(a, b));
`,cpuKernelImpl:RP,dtype:"bool"}),xW={kernelName:Ia,backendName:"webgl",kernelFunc:gW};const bW=Nt({opSnippet:"return float(a >= b);",packedOpSnippet:`
  return vec4(greaterThanEqual(a, b));
`,dtype:"bool",cpuKernelImpl:AP}),yW={kernelName:Rr,backendName:"webgl",kernelFunc:bW};function wW(n){const{inputs:e,backend:t}=n,{input:s}=e;return Ny(s,!0,t)}const CW={kernelName:mu,backendName:"webgl",kernelFunc:wW};const IW=Ae({opSnippet:"return float(!isnan(x) && !isinf(x));",dtype:"bool"}),$W={kernelName:Dr,backendName:"webgl",kernelFunc:IW};const vW=Ae({opSnippet:"return float(isinf(x));",dtype:"bool"}),kW={kernelName:Fr,backendName:"webgl",kernelFunc:vW};const SW=Ae({opSnippet:"return float(isnan(x));",dtype:"bool"}),NW={kernelName:_r,backendName:"webgl",kernelFunc:SW};const TW=Nt({opSnippet:"return float(a < b);",packedOpSnippet:`
  return vec4(lessThan(a, b));
`,cpuKernelImpl:DP,dtype:"bool"}),EW={kernelName:va,backendName:"webgl",kernelFunc:TW};const RW=Nt({opSnippet:"return float(a <= b);",packedOpSnippet:`
  return vec4(lessThanEqual(a, b));
`,cpuKernelImpl:FP,dtype:"bool"}),AW={kernelName:ka,backendName:"webgl",kernelFunc:RW};function DW(n){const{backend:e,attrs:t}=n,{start:s,stop:o,num:r}=t,i=_P(s,o,r);return e.makeTensorInfo([i.length],"float32",i)}const FW={kernelName:Dp,backendName:"webgl",kernelFunc:DW};const _W=ar+`
  return x < 0.0 ? 0./0. : log(x);
`,OW=Ae({opSnippet:_W,packedOpSnippet:`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,cpuKernelImpl:OP}),LW={kernelName:Or,backendName:"webgl",kernelFunc:OW};const MW=ar+`
  return log(1.0 + x);
`,PW=Ae({opSnippet:MW}),zW={kernelName:Lr,backendName:"webgl",kernelFunc:PW};const BW=Nt({opSnippet:"return float(a >= 1.0 && b >= 1.0);",packedOpSnippet:`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,dtype:"bool"}),VW={kernelName:Sa,backendName:"webgl",kernelFunc:BW};const WW=Ae({opSnippet:"return float(!(x >= 1.0));"}),UW={kernelName:Na,backendName:"webgl",kernelFunc:WW};const GW=Nt({opSnippet:"return float(a >= 1.0 || b >= 1.0);",packedOpSnippet:`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,dtype:"bool"}),HW={kernelName:Ta,backendName:"webgl",kernelFunc:GW};class qW{constructor(e,t,s,o,r){this.variableNames=["x"],this.outputShape=[];const i=t,a=e[3]-1;this.outputShape=e;let l;const c=`float(${s}) + float(${o}) * sum`;r===.5?l=`inversesqrt(${c})`:r===1?l=`1.0/(${c})`:l=`exp(log(${c}) * float(-${r}));`,this.userCode=`
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
    `}}class KW{constructor(e,t,s,o,r){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;const i=t,a=e[3]-1;this.outputShape=e;let l;const c=`float(${s}) + float(${o}) * sum`;r===.5?l=`inversesqrt(${c})`:r===1?l=`1.0/(${c})`:l=`exp(log(${c}) * float(-${r}));`,this.userCode=`
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
    `}}const jW={kernelName:Ea,backendName:"webgl",kernelFunc:n=>{const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{depthRadius:r,bias:i,alpha:a,beta:l}=s,c=U().getBool("WEBGL_PACK_NORMALIZATION")?new KW(o.shape,r,i,a,l):new qW(o.shape,r,i,a,l);return t.runWebGLProgram(c,[o],o.dtype)}};class XW{constructor(e,t,s,o,r){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=e,this.depth=e[3],this.depthRadius=t,this.bias=s,this.alpha=o,this.beta=r,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${t})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${t} + 1)));

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
    `}}const YW={kernelName:xu,backendName:"webgl",kernelFunc:n=>{const{inputs:e,backend:t,attrs:s}=n,{x:o,y:r,dy:i}=e,{depthRadius:a,bias:l,alpha:c,beta:u}=s,h=new XW(o.shape,a,l,c,u);return t.runWebGLProgram(h,[o,r,i],o.dtype)}};function ZW(n,e,t,s){const o=K(e),i=K(n.shape)/o,a=se({inputs:{x:n},attrs:{shape:[i,o]},backend:s}),l=$o(a,n.dtype,"max",s),c=se({inputs:{x:l},attrs:{shape:t},backend:s});return s.disposeIntermediateTensorInfo(a),s.disposeIntermediateTensorInfo(l),c}function Ry(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{reductionIndices:r,keepDims:i}=s,a=o.shape.length,l=ve(r,o.shape);let c=l;const u=Ze(c,a),h=u!=null,d=t.shouldExecuteOnCPU([o]);let p=o;if(h){if(d){const w=t.texData.get(p.dataId).values,y=new Array(a);for(let v=0;v<y.length;v++)y[v]=o.shape[u[v]];const C=rp(w,o.shape,o.dtype,u,y);p=t.makeTensorInfo(y,o.dtype);const $=t.texData.get(p.dataId);$.values=C}else p=$c(o,u,t);c=nt(c.length,a)}kt("max",c,a);const[f,m]=yt(p.shape,c);let g=f;i&&(g=at(f,l));let x;if(d){const w=t.texData.get(p.dataId).values,y=LP(w,K(m),g,o.dtype);x=t.makeTensorInfo(g,o.dtype);const C=t.texData.get(x.dataId);C.values=y}else x=ZW(p,m,g,t);return h&&t.disposeIntermediateTensorInfo(p),x}const JW={kernelName:Ra,backendName:"webgl",kernelFunc:Ry};const QW=ip+`
  return max(a, b);
`,e4=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Io+`
  return result;
`,t4=Nt({opSnippet:QW,packedOpSnippet:e4,cpuKernelImpl:MP}),n4={kernelName:Mr,backendName:"webgl",kernelFunc:t4};function s4(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e;Hi(o,"maxPool");const{filterSize:r,strides:i,pad:a,dimRoundingMode:l}=s,c=1;S(At(i,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${i} and dilations '${c}'`);const u=un(o.shape,r,i,c,a,l);if(u.filterWidth===1&&u.filterHeight===1&&_e(u.inShape,u.outShape))return en({inputs:{x:o},backend:t});const h=new ji(u,"max",!1);return t.runWebGLProgram(h,[o],o.dtype)}const o4={kernelName:Aa,backendName:"webgl",kernelFunc:s4};function r4(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{filterSize:r,strides:i,pad:a,dataFormat:l,dimRoundingMode:c}=s,u=[1,1,1],h=ts(o.shape,r,i,u,a,c,l),d=new lp(h,"max",!1);return t.runWebGLProgram(d,[o],o.dtype)}const i4={kernelName:Da,backendName:"webgl",kernelFunc:r4};class a4{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;const t=e.strideHeight,s=e.strideWidth,o=e.dilationHeight,r=e.effectiveFilterHeight,i=e.effectiveFilterWidth,a=r-1-e.padInfo.top,l=i-1-e.padInfo.left,c=r*i-1;this.userCode=`
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
          float dyR = float(dyRCorner + wR) / ${t}.0;

          if (dyR < 0.0 || dyR >= ${e.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${i}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
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
    `}}class l4{constructor(e){this.variableNames=["dy","maxPos"],this.outputShape=e.inShape;const t=e.strideDepth,s=e.strideHeight,o=e.strideWidth,r=e.dilationDepth,i=e.dilationHeight,a=e.dilationWidth,l=e.effectiveFilterDepth,c=e.effectiveFilterHeight,u=e.effectiveFilterWidth,h=l-1-e.padInfo.front,d=c-1-e.padInfo.top,p=u-1-e.padInfo.left,f=l*c*u-1;this.userCode=`
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
          float dyD = float(dyDCorner + wD) / ${t}.0;

          if (dyD < 0.0 || dyD >= ${e.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${c};
              wR += ${i}) {
            float dyR = float(dyRCorner + wR) / ${s}.0;

            if (dyR < 0.0 || dyR >= ${e.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${u};
                wC += ${a}) {
              float dyC = float(dyCCorner + wC) / ${o}.0;

              if (dyC < 0.0 || dyC >= ${e.outWidth}.0 ||
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
    `}}function c4(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,input:r}=e,i=r,{filterSize:a,strides:l,pad:c,dimRoundingMode:u}=s,h=[1,1,1],d=ts(i.shape,a,l,h,c,u),p=new lp(d,"max",!0),f=t.runWebGLProgram(p,[i],i.dtype),m=new l4(d),g=t.runWebGLProgram(m,[o,f],i.dtype);return t.disposeIntermediateTensorInfo(f),g}const u4={kernelName:yu,backendName:"webgl",kernelFunc:c4};function h4(n){const{inputs:e,backend:t,attrs:s}=n,{dy:o,input:r,output:i}=e,a=r;Hi([r,i],"maxPoolGrad");const{filterSize:l,strides:c,pad:u,dimRoundingMode:h}=s,d=un(a.shape,l,c,1,u,h),p=!0,f=new ji(d,"max",p),m=t.runWebGLProgram(f,[a],a.dtype),g=new a4(d),x=t.runWebGLProgram(g,[o,m],a.dtype);return t.disposeIntermediateTensorInfo(m),x}const d4={kernelName:bu,backendName:"webgl",kernelFunc:h4};function p4(n,e,t,s){let o=new ji(t,"max",!1);const r=s.runWebGLProgram(o,[n],"float32");o=new ji(t,"max",!0,!0,e);const i=s.runWebGLProgram(o,[n],"float32");return[r,i]}const f4={kernelName:Fp,backendName:"webgl",kernelFunc:({inputs:n,attrs:e,backend:t})=>{const{x:s}=n,{filterSize:o,strides:r,pad:i,includeBatchInIndex:a}=e,l=t;S(s.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${s.shape.length}.`);const c=[1,1];S(At(r,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${r} and dilations '${c}'`);const u=un(s.shape,o,r,c,i),[h,d]=p4(s,a,u,l);return[h,d]}};function m4(n,e,t,s){const o=K(e),i=K(n.shape)/o,a=se({inputs:{x:n},attrs:{shape:[i,o]},backend:s}),l=$o(a,"float32","mean",s),c=se({inputs:{x:l},attrs:{shape:t},backend:s});return s.disposeIntermediateTensorInfo(a),s.disposeIntermediateTensorInfo(l),c}const g4={kernelName:Fa,backendName:"webgl",kernelFunc:({inputs:n,attrs:e,backend:t})=>{const{x:s}=n,{keepDims:o,axis:r}=e,i=t,a=s.shape.length,l=ve(r,s.shape);let c=l;const u=Ze(c,a),h=u!=null,d=i.shouldExecuteOnCPU([s]),p=[];let f=s;if(h){if(d){const y=i.texData.get(f.dataId).values,C=new Array(a);for(let k=0;k<C.length;k++)C[k]=s.shape[u[k]];const $=rp(y,s.shape,s.dtype,u,C);f=i.makeTensorInfo(C,s.dtype);const v=i.texData.get(f.dataId);v.values=$}else f=$c(s,u,i);p.push(f),c=nt(c.length,a)}kt("sum",c,a);const[m,g]=yt(f.shape,c);let x=m;o&&(x=at(m,l));const b=m4(f,g,x,i);for(const w of p)i.disposeIntermediateTensorInfo(w);return b}};function x4(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s,a=o.shape.length,l=ve(r,o.shape);let c=l;const u=Ze(c,a);let h=o;u!=null&&(h=Vt({inputs:{x:o},backend:t,attrs:{perm:u}}),c=nt(c.length,o.shape.length)),kt("min",c,a);const[d,p]=yt(h.shape,c),f=K(p),m=se({inputs:{x:h},backend:t,attrs:{shape:[-1,f]}}),g=$o(m,m.dtype,"min",t);let x;if(i){const b=at(d,l);x=se({inputs:{x:g},backend:t,attrs:{shape:b}})}else x=se({inputs:{x:g},backend:t,attrs:{shape:d}});return t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(g),u!=null&&t.disposeIntermediateTensorInfo(h),x}const b4={kernelName:_a,backendName:"webgl",kernelFunc:x4};const y4=ip+`
  return min(a, b);
`,w4=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+Io+`
  return result;
`,C4=Nt({opSnippet:y4,packedOpSnippet:w4,cpuKernelImpl:PP}),I4={kernelName:Pr,backendName:"webgl",kernelFunc:C4};class $4{constructor(e,t,s){this.variableNames=["x"],this.outputShape=t.map((u,h)=>u[0]+e[h]+u[1]);const o=e.length,r=We(o),i=t.map(u=>u[0]).join(","),a=t.map((u,h)=>u[0]+e[h]).join(","),l=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,o),c=s==="reflect"?0:1;if(o===1){this.userCode=`
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
    `}}class v4{constructor(e,t,s){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.map((f,m)=>f[0]+e[m]+f[1]);const o=e.length,r=We(o),i=t.map(f=>f[0]).join(","),a=t.map((f,m)=>f[0]+e[m]).join(","),l=Bt("rc",o),c=Bt("source",o),u=`${l[o-1]} < ${this.outputShape[o-1]}`,h=o===1?"source":`vec2(${c.slice(-2).join()})`,d=s==="reflect"?0:1;let p="";if(o===1){const f=`
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
    `}}const k4={kernelName:Oa,backendName:"webgl",kernelFunc:({inputs:n,backend:e,attrs:t})=>{const{x:s}=n,{paddings:o,mode:r}=t,i=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new v4(s.shape,o,r):new $4(s.shape,o,r);return e.runWebGLProgram(i,[s],s.dtype)}};const S4=`if (b == 0.0) return NAN;
  return mod(a, b);`,N4=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+Io+`
  return result;
`,T4=Nt({opSnippet:S4,packedOpSnippet:N4}),E4={kernelName:zr,backendName:"webgl",kernelFunc:T4};class R4{constructor(e,t,s){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[e,s],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${t-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${t-1}));
      }
    `}}const Ay=Nt({opSnippet:`
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
`,checkOutOfBounds:!0}),A4={kernelName:$r,backendName:"webgl",kernelFunc:Ay};const Dy="return a - b;",Fy=Nt({opSnippet:Dy,packedOpSnippet:Dy,supportsComplex:!0,cpuKernelImpl:r3}),D4={kernelName:ti,backendName:"webgl",kernelFunc:Fy};function _y(n){const{inputs:e,backend:t,attrs:s}=n,{logits:o}=e,{dim:r}=s,i=ve([r],o.shape),a=Ry({inputs:{x:o},backend:t,attrs:{reductionIndices:i,keepDims:!1}}),l=at(a.shape,i),c=se({inputs:{x:a},backend:t,attrs:{shape:l}}),u=Fy({inputs:{a:o,b:c},backend:t}),h=vy({inputs:{x:u},backend:t}),d=vc({inputs:{x:h},backend:t,attrs:{axis:i,keepDims:!1}}),p=se({inputs:{x:d},backend:t,attrs:{shape:l}}),f=Ay({inputs:{a:h,b:p},backend:t});return t.disposeIntermediateTensorInfo(a),t.disposeIntermediateTensorInfo(c),t.disposeIntermediateTensorInfo(u),t.disposeIntermediateTensorInfo(h),t.disposeIntermediateTensorInfo(d),t.disposeIntermediateTensorInfo(p),f}const F4={kernelName:Qa,backendName:"webgl",kernelFunc:_y};function _4(n){const{inputs:e,backend:t,attrs:s}=n,{logits:o}=e,{numSamples:r,seed:i,normalized:a}=s,l=a?o:_y({inputs:{logits:o},backend:t,attrs:{dim:o.shape.length-1}}),c=l.shape[0],u=l.shape[1],h=new R4(c,u,r),d=[[i]],p=t.runWebGLProgram(h,[l],"int32",d);return a||t.disposeIntermediateTensorInfo(l),p}const O4={kernelName:_p,backendName:"webgl",kernelFunc:_4};const L4=yn+`
  return -x;
`,M4=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function P4(n){const{inputs:e,backend:t}=n,{x:s}=e;if(t.shouldExecuteOnCPU([s])){const r=t.texData.get(s.dataId),[i,a]=BP(r.values,s.shape,s.dtype);return t.makeTensorInfo(a,s.dtype,i)}let o;return U().getBool("WEBGL_PACK_UNARY_OPERATIONS")?o=new _s(s.shape,M4):o=new Zn(s.shape,L4),t.runWebGLProgram(o,[s],s.dtype)}const z4={kernelName:La,backendName:"webgl",kernelFunc:P4};const B4=Sh;function V4(n){nn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:e,backend:t,attrs:s}=n,{boxes:o,scores:r}=e,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l}=s,c=t.readSync(o.dataId),u=t.readSync(r.dataId),{selectedIndices:h}=B4(c,u,i,a,l);return t.makeTensorInfo([h.length],"int32",new Int32Array(h))}const W4={kernelName:wu,backendName:"webgl",kernelFunc:V4};const U4=Nh;function G4(n){nn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:e,backend:t,attrs:s}=n,{boxes:o,scores:r}=e,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,padToMaxOutputSize:c}=s,u=t.readSync(o.dataId),h=t.readSync(r.dataId),{selectedIndices:d,validOutputs:p}=U4(u,h,i,a,l,c);return[t.makeTensorInfo([d.length],"int32",new Int32Array(d)),t.makeTensorInfo([],"int32",new Int32Array([p]))]}const H4={kernelName:Cu,backendName:"webgl",kernelFunc:G4};const q4=Th;function K4(n){nn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");const{inputs:e,backend:t,attrs:s}=n,{boxes:o,scores:r}=e,{maxOutputSize:i,iouThreshold:a,scoreThreshold:l,softNmsSigma:c}=s,u=t.readSync(o.dataId),h=t.readSync(r.dataId),d=i,p=a,f=l,m=c,{selectedIndices:g,selectedScores:x}=q4(u,h,d,p,f,m);return[t.makeTensorInfo([g.length],"int32",new Int32Array(g)),t.makeTensorInfo([x.length],"float32",new Float32Array(x))]}const j4={kernelName:Iu,backendName:"webgl",kernelFunc:K4};class X4{constructor(e,t,s,o){this.variableNames=["indices"],this.outputShape=[e,t],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${o}), float(${s}),
                      float(index == coords.y)));
      }
    `}}const Y4={kernelName:za,backendName:"webgl",kernelFunc:n=>{const{inputs:e,backend:t,attrs:s}=n,{indices:o}=e,{dtype:r,depth:i,onValue:a,offValue:l}=s,c=K(o.shape),u=new X4(c,i,a,l),h=se({inputs:{x:o},backend:t,attrs:{shape:[c]}}),d=t.runWebGLProgram(u,[h],r);t.disposeIntermediateTensorInfo(h);const p=[...o.shape,i],f=se({inputs:{x:d},backend:t,attrs:{shape:p}});return t.disposeIntermediateTensorInfo(d),f}};function Rc(n){const{inputs:e,backend:t}=n,{x:s}=e;if(s.dtype==="complex64"){const o=Xi({inputs:{input:s},backend:t}),r=Rc({inputs:{x:o},backend:t}),i=Tc({inputs:{input:s},backend:t}),a=Rc({inputs:{x:i},backend:t}),l=Os({inputs:{real:r,imag:a},backend:t});return t.disposeIntermediateTensorInfo(o),t.disposeIntermediateTensorInfo(r),t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(a),l}else return Ji({attrs:{shape:s.shape,dtype:s.dtype,value:s.dtype==="string"?"":0},backend:t})}const Z4={kernelName:nl,backendName:"webgl",kernelFunc:Rc};function Oy(n){const{inputs:e,backend:t}=n,{x:s}=e;if(s.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(s.dtype==="complex64"){const o=Xi({inputs:{input:s},backend:t}),r=Oy({inputs:{x:o},backend:t}),i=Tc({inputs:{input:s},backend:t}),a=Rc({inputs:{x:i},backend:t}),l=Os({inputs:{real:r,imag:a},backend:t});return t.disposeIntermediateTensorInfo(o),t.disposeIntermediateTensorInfo(r),t.disposeIntermediateTensorInfo(i),t.disposeIntermediateTensorInfo(a),l}else return Ji({attrs:{shape:s.shape,dtype:s.dtype,value:1},backend:t})}const J4={kernelName:Pa,backendName:"webgl",kernelFunc:Oy};function Q4(n){const{inputs:e,backend:t,attrs:s}=n,{axis:o}=s;if(e.length===1)return hp({inputs:{input:e[0]},backend:t,attrs:{dim:o}});const r=e[0].shape,i=e[0].dtype;e.forEach(u=>{Lc(r,u.shape,"All tensors passed to stack must have matching shapes"),S(i===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});const a=[],l=e.map(u=>{const h=hp({inputs:{input:u},backend:t,attrs:{dim:o}});return a.push(h),h}),c=py({inputs:l,backend:t,attrs:{axis:o}});return a.forEach(u=>t.disposeIntermediateTensorInfo(u)),c}const eU={kernelName:Ba,backendName:"webgl",kernelFunc:Q4};class tU{constructor(e,t,s){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((c,u)=>c[0]+e[u]+c[1]);const o=e.length,r=We(o),i=t.map(c=>c[0]).join(","),a=t.map((c,u)=>c[0]+e[u]).join(","),l=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,o);if(o===1){this.userCode=`
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
    `}}class nU{constructor(e,t,s){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=t.map((m,g)=>m[0]+e[g]+m[1]);const o=e.length,r=We(o),i=t.map(m=>m[0]).join(","),a=t.map((m,g)=>m[0]+e[g]).join(","),l=Bt("rc",o),c=Bt("source",o),u=`${l[o-1]} < ${this.outputShape[o-1]}`,h=o===1?"source":`vec2(${c.slice(-2).join()})`,d=[`${r} rc = outputLoc;`,`${l[o-1]} += 1;
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
    `}}const Ly=n=>{const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{paddings:r,constantValue:i}=s;if(K(o.shape)===0){const c=r.map((u,h)=>u[0]+o.shape[h]+u[1]);return Ji({backend:t,attrs:{shape:c,value:i,dtype:o.dtype}})}const a=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new nU(o.shape,r,i):new tU(o.shape,r,i),l=[[i]];return t.runWebGLProgram(a,[o],o.dtype,l)},sU={kernelName:Va,backendName:"webgl",kernelFunc:Ly};const oU=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,rU=`
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
  `+Io+`
  return result;
`,iU=Nt({opSnippet:oU,packedOpSnippet:rU}),aU={kernelName:Vr,backendName:"webgl",kernelFunc:iU};function lU(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{axis:r,keepDims:i}=s,a=o.shape.length,l=[],c=ve(r,o.shape);let u=c;const h=Ze(u,a);let d=o;h!=null&&(d=Vt({inputs:{x:o},backend:t,attrs:{perm:h}}),u=nt(u.length,a),l.push(d)),kt("prod",u,a);let p;if(t.shouldExecuteOnCPU([d])){const f=t.texData.get(d.dataId).values,{outVals:m,outShape:g,outDtype:x}=WP(d.shape,d.dtype,f,u);p=t.makeTensorInfo(g,x,m)}else{const[f,m]=yt(d.shape,u),g=K(m),x=se({inputs:{x:d},backend:t,attrs:{shape:[-1,g]}}),b=Wu(o.dtype),w=$o(x,b,"prod",t);p=se({inputs:{x:w},backend:t,attrs:{shape:f}}),l.push(x),l.push(w)}if(i){l.push(p);const f=at(p.shape,c);p=se({inputs:{x:p},backend:t,attrs:{shape:f}})}return l.forEach(f=>t.disposeIntermediateTensorInfo(f)),p}const cU={kernelName:Ua,backendName:"webgl",kernelFunc:lU};function uU(n){const{inputs:e,backend:t,attrs:s}=n,{paramsNestedSplits:o,paramsDenseValues:r,indices:i}=e,{outputRaggedRank:a}=s,l=o.map(x=>t.readSync(x.dataId)),c=o.map(x=>x.shape),u=t.readSync(r.dataId),h=t.readSync(i.dataId),[d,p,f]=UP(l,c,u,r.shape,r.dtype,h,i.shape,a),m=d.map(x=>t.makeTensorInfo([x.length],"int32",x)),g=t.makeTensorInfo(f,r.dtype,p);return m.concat([g])}const hU={kernelName:Op,backendName:"webgl",kernelFunc:uU};function dU(n){const{inputs:e,backend:t}=n,{starts:s,limits:o,deltas:r}=e,i=t.readSync(s.dataId),a=t.readSync(o.dataId),l=t.readSync(r.dataId),[c,u]=GP(i,s.shape,s.dtype,a,o.shape,l,r.shape),h=t.makeTensorInfo([c.length],"int32",c),d=t.makeTensorInfo([u.length],s.dtype,u);return[h,d]}const pU={kernelName:Lp,backendName:"webgl",kernelFunc:dU};function fU(n){const{inputs:e,backend:t,attrs:s}=n,{shape:o,values:r,defaultValue:i,rowPartitionTensors:a}=e,{rowPartitionTypes:l}=s,c=t.readSync(o.dataId),u=t.readSync(r.dataId),h=t.readSync(i.dataId),d=a.map(g=>t.readSync(g.dataId)),p=a.map(g=>g.shape),[f,m]=HP(c,o.shape,u,r.shape,r.dtype,h,i.shape,d,p,l);return t.makeTensorInfo(f,r.dtype,m)}const mU={kernelName:Mp,backendName:"webgl",kernelFunc:fU};const My=n=>{const{backend:e,attrs:t}=n,{start:s,stop:o,step:r,dtype:i}=t,a=qP(s,o,r,i);return e.makeTensorInfo([a.length],i,a)},gU={kernelName:$u,backendName:"webgl",kernelFunc:My};const xU=Ae({opSnippet:"return 1.0 / x;"}),bU={kernelName:Wr,backendName:"webgl",kernelFunc:xU};const yU=yn+`
  return (x < 0.0) ? 0.0 : x;
`,wU=Ae({opSnippet:yU,packedOpSnippet:`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),CU={kernelName:Ur,backendName:"webgl",kernelFunc:wU};const IU=yn+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,$U=Ae({opSnippet:IU,packedOpSnippet:`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`}),vU={kernelName:Gr,backendName:"webgl",kernelFunc:$U};class kU{constructor(e,t,s,o,r){this.variableNames=["A"],this.outputShape=[];const[i,a,l,c]=e;this.outputShape=[i,t,s,c];const u=[o&&t>1?a-1:a,o&&s>1?l-1:l],h=[o&&t>1?t-1:t,o&&s>1?s-1:s];let d;r?d="(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":d="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
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
    `}}class SU{constructor(e,t,s,o,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];const[i,a,l,c]=e;this.outputShape=[i,t,s,c];const u=[o&&t>1?a-1:a,o&&s>1?l-1:l],h=[o&&t>1?t-1:t,o&&s>1?s-1:s];let d;r?d="(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":d="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
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
    `}}function NU(n){const{inputs:e,backend:t,attrs:s}=n,{images:o}=e,{alignCorners:r,halfPixelCenters:i,size:a}=s,[l,c]=a,u=U().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new SU(o.shape,l,c,r,i):new kU(o.shape,l,c,r,i);return t.runWebGLProgram(u,[o],"float32")}const TU={kernelName:qa,backendName:"webgl",kernelFunc:NU};class EU{constructor(e,t,s){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;const[,o,r]=t,[,i,a]=e,l=[s&&i>1?o-1:o,s&&a>1?r-1:r],c=[s&&i>1?i-1:i,s&&a>1?a-1:a],u=l[0]/c[0],h=l[1]/c[1],d=1/u,p=1/h,f=Math.ceil(d)*2+2,m=Math.ceil(p)*2+2;this.userCode=`
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
    `}}function RU(n){const{inputs:e,backend:t,attrs:s}=n,{images:o,dy:r}=e,{alignCorners:i}=s,a=new EU(r.shape,o.shape,i);return t.runWebGLProgram(a,[r],r.dtype)}const AU={kernelName:Su,backendName:"webgl",kernelFunc:RU};class DU{constructor(e,t,s,o,r){this.variableNames=["A"],this.outputShape=[];const[i,a,l,c]=e;this.outputShape=[i,t,s,c];const u=[o&&t>1?a-1:a,o&&s>1?l-1:l],h=[o&&t>1?t-1:t,o&&s>1?s-1:s],d=o?"0.5":"0.0";let p;r?p="max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":p="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
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
    `}}class FU{constructor(e,t,s,o,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];const[i,a,l,c]=e;this.outputShape=[i,t,s,c];const u=[o&&t>1?a-1:a,o&&s>1?l-1:l],h=[o&&t>1?t-1:t,o&&s>1?s-1:s],d=o?"0.5":"0.0";let p;r?p="max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":p="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
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
    `}}function _U(n){const{inputs:e,backend:t,attrs:s}=n,{images:o}=e,{alignCorners:r,halfPixelCenters:i,size:a}=s,[l,c]=a,u=U().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new FU(o.shape,l,c,r,i):new DU(o.shape,l,c,r,i);return t.runWebGLProgram(u,[o],o.dtype)}const OU={kernelName:Ha,backendName:"webgl",kernelFunc:_U};class LU{constructor(e,t,s){this.variableNames=["dy"],this.outputShape=[],this.outputShape=t;const[,o,r]=t,[,i,a]=e,l=[s&&i>1?o-1:o,s&&a>1?r-1:r],c=[s&&i>1?i-1:i,s&&a>1?a-1:a],u=l[0]/c[0],h=l[1]/c[1],d=1/u,p=1/h,f=Math.ceil(d)*2+2,m=Math.ceil(p)*2+2;this.userCode=`
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
    `}}function MU(n){const{inputs:e,backend:t,attrs:s}=n,{images:o,dy:r}=e,{alignCorners:i}=s,a=new LU(r.shape,o.shape,i);return t.runWebGLProgram(a,[r],r.dtype)}const PU={kernelName:ku,backendName:"webgl",kernelFunc:MU};class zU{constructor(e,t){this.variableNames=["x"];const s=e.length;if(s>4)throw new Error(`WebGL backend: Reverse of rank-${s} tensor is not yet supported`);if(this.outputShape=e,s===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${e[0]} - coord - 1));
        }
      `;return}const o=a=>t.indexOf(a)!==-1&&e[a]!==1?`${e[a]} - coords[${a}] - 1`:`coords[${a}]`,r=e.map((a,l)=>o(l)).join(","),i=We(s);this.userCode=`
      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${r}));
      }
    `}}class BU{constructor(e,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;const s=e.length;if(s>4)throw new Error(`WebGL backend: Reverse of rank-${s} tensor is not yet supported`);this.outputShape=e;const o=Bt("rc",s),r=`${o[s-1]} + 1 < ${this.outputShape[s-1]}`,i=`${o[s-2]} + 1 < ${this.outputShape[s-2]}`,a=We(s);s===1?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${e[0]} - rc - 1),
            ${e[0]} - rc - 1);
          if(${r}){
              result.g = getChannel(getX(${e[0]} - (rc  + 1) - 1),
                ${e[0]} - (rc  + 1) - 1);
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
    `;function l(f){return d(f)}function c(f){return f[s-1]="("+f[s-1]+" + 1)",d(f)}function u(f){return f[s-2]="("+f[s-2]+" + 1)",d(f)}function h(f){return f[s-1]="("+f[s-1]+" + 1)",f[s-2]="("+f[s-2]+" + 1)",d(f)}function d(f){const m=e.map((b,w)=>p(w,f)),g=m.join(","),x=m.slice(-2).join(",");return`getChannel(getX(${g}), vec2(${x}))`}function p(f,m){return t.indexOf(f)!==-1&&e[f]!==1?`${e[f]} - ${m[f]} - 1`:`${m[f]}`}}}function VU(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{dims:r}=s,i=o.shape.length,a=ve(r,o.shape);if(i===0)return en({inputs:{x:o},backend:t});const l=U().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new BU(o.shape,a):new zU(o.shape,a);return t.runWebGLProgram(l,[o],o.dtype)}const WU={kernelName:Ka,backendName:"webgl",kernelFunc:VU};class UU{constructor(e,t){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];const s=e[1],o=e[2];this.outputShape=e;let r="";typeof t=="number"?r=`float outputValue = ${t.toFixed(2)};`:r=`
        vec3 fill = vec3(${t.join(",")});
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
    `}}const GU={kernelName:Fu,backendName:"webgl",kernelFunc:({inputs:n,attrs:e,backend:t})=>{const{image:s}=n,{radians:o,fillValue:r,center:i}=e,a=t,l=new UU(s.shape,r),[c,u]=Mh(i,s.shape[1],s.shape[2]),h=[[c,u,Math.sin(o),Math.cos(o)]];return a.runWebGLProgram(l,[s],s.dtype,h)}};const HU=Ae({opSnippet:`
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
`}),qU={kernelName:Hr,backendName:"webgl",kernelFunc:HU};const KU=Ae({opSnippet:"return inversesqrt(x);",cpuKernelImpl:KP}),jU={kernelName:qr,backendName:"webgl",kernelFunc:KU};class pp{constructor(e,t,s,o,r,i,a=!0,l=!1){this.variableNames=["updates","indices","defaultValue"],this.outputShape=i;const c=We(r.length),u=We(i.length);let h="";s===1?h="i":s===2&&(h="i, j");const d=`getIndices(${h})`;let p="";o===1?p="i":o===2&&(p="i, coords[1]");const f=`getUpdates(${p})`;let m="";l&&(m="coords[0], coords[1]");const g=`getDefaultValue(${m})`,x=t>1?"strides[j]":"strides";this.userCode=`
        ${c} strides = ${c}(${r});

        void main() {
          ${u} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${e}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${t}; j++) {
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
      `}}class XU{constructor(e,t,s,o,r,i,a=!0,l=!1){this.variableNames=["updates","indices","defaultValue"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=i;const c=We(r.length),u=We(i.length);let h="";s===1?h="i":s===2&&(h="i, j");const d=`getIndices(${h})`;let p="";o===1?p="i":o===2&&(p="i, coords[1]");const f=`getUpdates(${p})`;let m="";l&&(m="coords[0], coords[1]");const g=`getDefaultValue(${m})`,x=t>1?"strides[j]":"strides",b=t>1?"strides[j + 1]":"strides";this.userCode=`
        ${c} strides = ${c}(${r});

        void main() {
          ${u} coords = getOutputCoords();
          vec4 sum = vec4(0.);
          vec4 found = vec4(0.);
          for (int i = 0; i < ${e}; i+=2) {
            ivec2 flattenedIndex = ivec2(0);
            for (int j = 0; j < ${t}; j+=2) {
              ivec4 index = round(${d});
              flattenedIndex += index.xz * ${x};
              if (j + 1 < ${t}) {
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
      `}}function YU(n){const{inputs:e,backend:t,attrs:s}=n,{indices:o,updates:r}=e,{shape:i}=s,{sliceRank:a,numUpdates:l,sliceSize:c,strides:u,outputSize:h}=ro(r,o,i),d=[h/c,c];if(h===0)return t.makeTensorInfo(i,o.dtype);const p=se({inputs:{x:o},backend:t,attrs:{shape:[l,a]}}),f=se({inputs:{x:r},backend:t,attrs:{shape:[l,c]}}),m=t.makeTensorInfo([],"float32",new Float32Array([0]));let g;U().getBool("WEBGL_PACK")?g=new XU(l,a,p.shape.length,f.shape.length,u,d):g=new pp(l,a,p.shape.length,f.shape.length,u,d);const x=t.runWebGLProgram(g,[f,p,m],f.dtype),b=se({inputs:{x},backend:t,attrs:{shape:i}});return t.disposeIntermediateTensorInfo(p),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(x),t.disposeIntermediateTensorInfo(m),b}const ZU={kernelName:Pp,backendName:"webgl",kernelFunc:YU};class JU{constructor(e,t,s,o){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[e,s];const r="while (left < right) {",i=`for (int i = 0; i < ${Math.ceil(Math.log2(t+1))}; ++i) { if (left >= right) break;`,a=U().getNumber("WEBGL_VERSION")===2?r:i,l=o==="left"?"<":"<=";this.userCode=`
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
     `}}function QU(n){const{inputs:e,backend:t,attrs:s}=n,{sortedSequence:o,values:r}=e,{side:i}=s,a=new JU(o.shape[0],o.shape[1],r.shape[1],i),l=[[o.shape[1]]];return t.runWebGLProgram(a,[o,r],"int32",l)}const eG={kernelName:Bp,backendName:"webgl",kernelFunc:QU};class tG{constructor(e,t,s){this.variableNames=["c","a","b"],this.outputShape=t;let o,r;if(s>4)throw Error(`Where for rank ${s} is not yet supported`);if(s===1)r="resRC",o="resRC";else{const a=["resRC.x","resRC.y","resRC.z","resRC.w"],l=[],c=[];for(let u=0;u<t.length;u++)c.push(`${a[u]}`),u<e&&l.push(`${a[u]}`);o=l.join(),r=c.join()}const i=We(s);this.userCode=`
      void main() {
        ${i} resRC = getOutputCoords();
        float cVal = getC(${o});
        if (cVal >= 1.0) {
          setOutput(getA(${r}));
        } else {
          setOutput(getB(${r}));
        }
      }
    `}}function nG(n){const{inputs:e,backend:t}=n,{condition:s,t:o,e:r}=e,i=new tG(s.shape.length,o.shape,o.shape.length);return t.runWebGLProgram(i,[s,o,r],Yt(o.dtype,r.dtype))}const sG={kernelName:ja,backendName:"webgl",kernelFunc:nG};const oG=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${_l};
  float scale = ${Ol};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,rG=Ae({opSnippet:oG}),iG={kernelName:Kr,backendName:"webgl",kernelFunc:rG};const aG=ar+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,lG=Ae({opSnippet:aG,packedOpSnippet:`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,cpuKernelImpl:XP}),cG={kernelName:Zr,backendName:"webgl",kernelFunc:lG};const uG=Ae({opSnippet:`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`}),hG={kernelName:Yr,backendName:"webgl",kernelFunc:uG};const dG=ar+`
  return sin(x);
`,pG=`
  vec4 result = sin(x);
  bvec4 isNaN = isnan(x);
  ${Io}
  return result;
`,fG=Ae({opSnippet:dG,packedOpSnippet:pG}),mG={kernelName:jr,backendName:"webgl",kernelFunc:fG};const gG=Ae({opSnippet:`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`}),xG={kernelName:Xr,backendName:"webgl",kernelFunc:gG};const bG=Ae({opSnippet:`
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
`}),yG={kernelName:Jr,backendName:"webgl",kernelFunc:bG};const wG={kernelName:Za,backendName:"webgl",kernelFunc:n=>{const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{blockShape:r,paddings:i}=s;S(o.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");const a=r.reduce((x,b)=>x*b),l=[[0,0]];l.push(...i);for(let x=1+r.length;x<o.shape.length;++x)l.push([0,0]);const c=[],u=Ly({inputs:{x:o},backend:t,attrs:{paddings:l,constantValue:0}}),h=Ci(u.shape,r,a,!1),d=Ii(h.length,r.length,!1),p=$i(u.shape,r,a,!1),f=se({inputs:{x:u},backend:t,attrs:{shape:h}}),m=Vt({inputs:{x:f},backend:t,attrs:{perm:d}}),g=se({inputs:{x:m},backend:t,attrs:{shape:p}});return c.push(u),c.push(f),c.push(m),c.forEach(x=>t.disposeIntermediateTensorInfo(x)),g}};function CG(n){const{inputs:e,backend:t}=n,{indices:s,values:o,denseShape:r,defaultValue:i}=e;if(r.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
         ${r.shape}`);if(s.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
         ${s.shape}`);if(o.shape.length!==1)throw new Error(`Values must be a vector, saw:
         ${o.shape}`);if(i.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${i.shape}`);const a=t.readSync(s.dataId),l=t.readSync(o.dataId),c=t.readSync(r.dataId),u=t.readSync(i.dataId)[0],[h,d,p,f,m]=ZP(a,s.shape,s.dtype,l,o.dtype,c,u);return[t.makeTensorInfo(d,s.dtype,h),t.makeTensorInfo([d[0]],o.dtype,p),t.makeTensorInfo([f.length],"bool",new Uint8Array(f.map(g=>Number(g)))),t.makeTensorInfo([m.length],s.dtype,new Int32Array(m))]}const IG={kernelName:Vp,backendName:"webgl",kernelFunc:CG};function $G(n){const{inputs:e,backend:t}=n,{inputIndices:s,inputShape:o,newShape:r}=e;if(s.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape ${s.shape}`);if(o.shape.length!==1)throw new Error(`Input shape should be a vector but received shape ${o.shape}`);if(r.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${r.shape}`);const i=Array.from(t.readSync(o.dataId)),a=t.readSync(s.dataId),l=Array.from(t.readSync(r.dataId)),[c,u,h]=JP(a,s.shape,s.dtype,i,l);return[t.makeTensorInfo(u,s.dtype,c),t.makeTensorInfo([h.length],r.dtype,new Int32Array(h))]}const vG={kernelName:Wp,backendName:"webgl",kernelFunc:$G};function kG(n){const{inputs:e,backend:t}=n,{data:s,indices:o,segmentIds:r}=e;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(o.shape.length!==1)throw new Error(`Indices should be a vector but received shape
              ${o.shape}`);if(r.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
              ${r.shape}`);const i=t.readSync(s.dataId),a=t.readSync(o.dataId),l=t.readSync(r.dataId),[c,u]=W1(i,s.shape,s.dtype,a,l,!0);return t.makeTensorInfo(u,s.dtype,c)}const SG={kernelName:Up,backendName:"webgl",kernelFunc:kG};function NG(n){const{inputs:e,backend:t}=n,{data:s,indices:o,segmentIds:r}=e;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(o.shape.length!==1)throw new Error(`Indices should be a vector but received shape
             ${o.shape}`);if(r.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
             ${r.shape}`);const i=t.readSync(s.dataId),a=t.readSync(o.dataId),l=t.readSync(r.dataId),[c,u]=W1(i,s.shape,s.dtype,a,l);return t.makeTensorInfo(u,s.dtype,c)}const TG={kernelName:Gp,backendName:"webgl",kernelFunc:NG};function EG(n){const{inputs:e,backend:t,attrs:s}=n,{sparseIndices:o,sparseValues:r,defaultValue:i}=e,{outputShape:a}=s,{sliceRank:l,numUpdates:c,sliceSize:u,strides:h,outputSize:d}=ro(r,o,a),p=!1;if(r.dtype==="string"){const x=t.bufferSync(o),b=t.bufferSync(r),w=gs(t.readSync(i.dataId)[0]),y=jP(x,b,a,d,u,c,l,h,w,p);return t.makeTensorInfo(a,y.dtype,y.values)}const f=new pp(c,l,o.shape.length,r.shape.length,h,[d,1],p),m=t.runWebGLProgram(f,[r,o,i],r.dtype),g=se({inputs:{x:m},backend:t,attrs:{shape:a}});return t.disposeIntermediateTensorInfo(m),g}const RG={kernelName:Hp,backendName:"webgl",kernelFunc:EG};function AG(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{numOrSizeSplits:r,axis:i}=s,a=ve(i,o.shape)[0],l=Qh(o,r,a),c=o.shape.length,u=new Array(c).fill(0),h=o.shape.slice();return l.map(d=>{const p=[...h];p[a]=d;const f=lr({inputs:{x:o},backend:t,attrs:{begin:u,size:p}});return u[a]+=d,f})}const DG={kernelName:Ja,backendName:"webgl",kernelFunc:AG};const Py="return sqrt(x);",FG=Ae({opSnippet:Py,packedOpSnippet:Py,cpuKernelImpl:QP}),_G={kernelName:Qr,backendName:"webgl",kernelFunc:FG};const OG=Ae({opSnippet:"return x * x;"}),LG={kernelName:Nu,backendName:"webgl",kernelFunc:OG};const zy="return (a - b) * (a - b);",MG=Nt({opSnippet:zy,packedOpSnippet:zy}),PG={kernelName:ei,backendName:"webgl",kernelFunc:MG};function zG(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e;if(o.dtype!=="string")throw new Error("Input must be of datatype string");const r=t.readSync(o.dataId),i=as(r),a=e3(i,"string",s);return t.makeTensorInfo(o.shape,"string",a)}const BG={kernelName:Tu,backendName:"webgl",kernelFunc:zG};function VG({inputs:n,attrs:e,backend:t}){const{x:s}=n,o=yn+`
    return x > 0.0 ? 1.0 : float(${e.alpha});
  `,r=new Zn(s.shape,o);return t.runWebGLProgram(r,[s],s.dtype)}const WG={kernelName:ri,backendName:"webgl",kernelFunc:VG};class UG{constructor(e,t,s){this.variableNames=["x"],this.outputShape=s;const o=s.length,r=We(s.length),i=We(s.length);let a="";if(o===1)a="coords * strides + begin";else{let l=0;a=s.map((c,u)=>(l++,s.length===1?`coords * strides[${u}] + begin[${u}]`:`coords[${l-1}] * strides[${u}] + begin[${u}]`)).join(",")}this.userCode=`
      ${r} begin = ${r}(${e});
      ${r} strides = ${r}(${t});

      void main() {
        ${i} coords = getOutputCoords();
        setOutput(getX(${a}));
      }
    `}}function GG(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{begin:r,end:i,strides:a,beginMask:l,endMask:c,ellipsisMask:u,newAxisMask:h,shrinkAxisMask:d}=s,{finalShapeSparse:p,finalShape:f,isIdentity:m,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:y}=Bm(o.shape,r,i,a,l,c,u,h,d);let C;if(m)C=se({inputs:{x:o},backend:t,attrs:{shape:f}});else if(g||x){S(o.shape.length>=1,()=>`Input must have rank at least 1, got: ${o.shape.length}`);const v=Mm(b,w,y),k=lr({inputs:{x:o},backend:t,attrs:{begin:b,size:v}});C=se({inputs:{x:k},backend:t,attrs:{shape:f}}),t.disposeIntermediateTensorInfo(k)}else if(t.shouldExecuteOnCPU([o])){const k=t.readSync(o.dataId),N=ke(o.shape,o.dtype,k),T=t3(p,N,y,b);C=t.makeTensorInfo(f,o.dtype,T.values)}else{const k=new UG(b,y,p);C=t.runWebGLProgram(k,[o],o.dtype)}const $=se({inputs:{x:C},backend:t,attrs:{shape:f}});return t.disposeIntermediateTensorInfo(C),$}const HG={kernelName:Eu,backendName:"webgl",kernelFunc:GG};function qG(n){const{inputs:e,backend:t,attrs:s}=n,{separator:o,nGramWidths:r,leftPad:i,rightPad:a,padWidth:l,preserveShortSequences:c}=s,{data:u,dataSplits:h}=e,d=t.readSync(u.dataId),p=t.readSync(h.dataId),[f,m]=n3(d,p,o,r,i,a,l,c);return[t.makeTensorInfo([f.length],"string",f),t.makeTensorInfo(h.shape,"int32",m)]}const KG={kernelName:qp,backendName:"webgl",kernelFunc:qG};function jG(n){const{inputs:e,backend:t,attrs:s}=n,{skipEmpty:o}=s,{input:r,delimiter:i}=e;if(r.dtype!=="string")throw new Error("Input must be of datatype string");if(r.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${r.shape}`);if(i.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${i.shape}`);const a=t.readSync(r.dataId),l=t.readSync(i.dataId)[0],[c,u,h]=s3(a,l,o),d=u.length;return[t.makeTensorInfo([d,2],"int32",c),t.makeTensorInfo([d],"string",u),t.makeTensorInfo([2],"int32",new Int32Array(h))]}const XG={kernelName:Kp,backendName:"webgl",kernelFunc:jG};function YG(n){const{inputs:e,backend:t,attrs:s}=n,{numBuckets:o}=s,{input:r}=e;if(r.dtype!=="string")throw new Error("Input must be of datatype string");if(o<=0)throw new Error("Number of buckets must be at least 1");const i=t.readSync(r.dataId),a=o3(i,o);return t.makeTensorInfo(r.shape,"int32",a)}const ZG={kernelName:jp,backendName:"webgl",kernelFunc:YG};const JG=Ae({opSnippet:"return tan(x);"}),QG={kernelName:ni,backendName:"webgl",kernelFunc:JG};const eH=Ae({opSnippet:`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`}),tH={kernelName:si,backendName:"webgl",kernelFunc:eH};function nH(n){const{inputs:e,backend:t,attrs:s}=n,{tensor:o,indices:r,updates:i}=e,{sliceRank:a,numUpdates:l,sliceSize:c,strides:u,outputSize:h}=ro(i,r,o.shape),d=[h/c,c];if(h===0)return t.makeTensorInfo(o.shape,r.dtype);const p=se({inputs:{x:r},backend:t,attrs:{shape:[l,a]}}),f=se({inputs:{x:i},backend:t,attrs:{shape:[l,c]}}),m=se({inputs:{x:o},backend:t,attrs:{shape:d}}),g=new pp(l,a,p.shape.length,f.shape.length,u,d,!1,!0),x=t.runWebGLProgram(g,[f,p,m],m.dtype),b=se({inputs:{x},backend:t,attrs:{shape:o.shape}});return t.disposeIntermediateTensorInfo(p),t.disposeIntermediateTensorInfo(f),t.disposeIntermediateTensorInfo(m),t.disposeIntermediateTensorInfo(x),b}const sH={kernelName:zp,backendName:"webgl",kernelFunc:nH};class oH{constructor(e,t){this.variableNames=["A"];const s=new Array(e.length);for(let i=0;i<s.length;i++)s[i]=e[i]*t[i];this.outputShape=s,this.rank=s.length;const o=We(this.rank),r=rH(e);this.userCode=`
      void main() {
        ${o} resRC = getOutputCoords();
        setOutput(getA(${r}));
      }
    `}}function rH(n){const e=n.length;if(e>5)throw Error(`Tile for rank ${e} is not yet supported`);if(e===1)return`imod(resRC, ${n[0]})`;const t=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],s=[];for(let o=0;o<n.length;o++)s.push(`imod(${t[o]}, ${n[o]})`);return s.join()}function By(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{reps:r}=s;if(o.dtype==="string"||o.shape.length>5){const l=t.readSync(o.dataId),c=o.dtype==="string"?l.map(d=>gs(d)):l,u=ke(o.shape,o.dtype,c),h=i3(u,r);return t.makeTensorInfo(h.shape,h.dtype,h.values)}const i=new oH(o.shape,r);return t.runWebGLProgram(i,[o],o.dtype)}const iH={kernelName:oi,backendName:"webgl",kernelFunc:By};class aH{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=e,this.userCode=`
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
     `}}class lH{constructor(e){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=e,this.userCode=`
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
     `}}function vo(n,e){e!==null&&n.disposeIntermediateTensorInfo(e)}function Vy(n){let e=1;for(;e<n;)e*=2;return e}function cH(n){const{inputs:e,backend:t,attrs:s}=n,{x:o}=e,{k:r,sorted:i}=s,a=U().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),l=U().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),c=o.shape,u=c[c.length-1];if(t.shouldExecuteOnCPU([o])||u<a||r>l){const T=t.readSync(o.dataId),[I,E]=a3(T,c,o.dtype,r,i);return[t.makeTensorInfo(I.shape,I.dtype,I.values),t.makeTensorInfo(E.shape,E.dtype,E.values)]}if(r===0)return c[c.length-1]=0,[t.makeTensorInfo(c,o.dtype,[]),t.makeTensorInfo(c,"int32",[])];if(u===1)return[o,Ji({attrs:{shape:c,dtype:"int32",value:0},backend:t})];const h=t.texData.get(o.dataId),d=h!==null&&h.isPacked,p=d?t.unpackTensor(o):o,m=K(c)/u,g=se({inputs:{x:p},attrs:{shape:[m,u]},backend:t});d&&vo(t,p);const x=Vy(r),b=Vy(u);let w=null;const y=()=>w===null?[g,g]:[g,w],C=(T,I,E)=>{const R=y(),D=new aH(E),_=[[u],[w===null?1:0],[Number.NEGATIVE_INFINITY],[T],[I]],P=w;w=t.runWebGLProgram(D,R,"int32",_),vo(t,P)};for(let T=1;T<x;T*=2){const I=T*2;for(let E=T;E>=1;E/=2)C(I,E,[m,b])}for(let T=b;T>x;T/=2){const I=y(),E=new lH([m,T/2]),D=[[u],[w===null?1:0],[x]],F=w;w=t.runWebGLProgram(E,I,"int32",D),vo(t,F);const _=x/2,P=_*2;for(let z=_;z>=1;z/=2)C(P,z,w.shape)}let $=w;w=lr({inputs:{x:w},backend:t,attrs:{begin:0,size:[m,r]}}),vo(t,$);let v=Ey({inputs:{x:g,indices:w},backend:t,attrs:{axis:1,batchDims:1}});vo(t,g);const k=c.slice(0,-1);k.push(r),$=w,w=se({inputs:{x:w},attrs:{shape:k},backend:t}),vo(t,$);const N=v;return v=se({inputs:{x:v},attrs:{shape:k},backend:t}),vo(t,N),[v,w]}const uH={kernelName:Ru,backendName:"webgl",kernelFunc:cH};class hH{constructor(e,t,s,o,r,i){this.variableNames=["Image","Transforms"],this.outputShape=i;const a=s==="nearest"?1:2;let l;switch(o){case"constant":l=1;break;case"reflect":l=2;break;case"wrap":l=3;break;case"nearest":l=4;break;default:l=1;break}this.userCode=`
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
              if (0 <= coordY && coordY < ${e} && 0 <= coordX && coordX < ${t}) {
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
                float mapX = mapCoord(inX, float(${t}));
                float mapY = mapCoord(inY, float(${e}));

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
        `}}function dH(n){const{inputs:e,backend:t,attrs:s}=n,{image:o,transforms:r}=e,{interpolation:i,fillMode:a,fillValue:l,outputShape:c}=s,[u,h,d,p]=o.shape,[f,m]=c!=null?c:[h,d],g=[u,f,m,p],x=new hH(h,d,i,a,l,g);return t.runWebGLProgram(x,[o,r],"float32")}const pH={kernelName:Au,backendName:"webgl",kernelFunc:dH};function fH(n){const{inputs:e,attrs:t,backend:s}=n,{axis:o}=t,{x:r}=e;Hi(r,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");const i=s.readSync(r.dataId),{outputValues:a,outputShape:l,indices:c}=l3(i,o,r.shape,r.dtype);return[s.makeTensorInfo(l,r.dtype,a),s.makeTensorInfo([c.length],"int32",c)]}const mH={kernelName:Du,backendName:"webgl",kernelFunc:fH};function gH(n){const{inputs:e,backend:t,attrs:s}=n,{value:o}=e;let{axis:r}=s;r<0&&(r+=o.shape.length);const i=o,a=i.shape.length,l=o.shape[r],c=new Array(a-1);let u=0;for(let m=0;m<a;m++)m!==r&&(c[u++]=i.shape[m]);const h=[],d=new Array(a).fill(0),p=i.shape.slice();p[r]=1;const f=new Array(l);for(let m=0;m<f.length;m++){d[r]=m;const g=lr({inputs:{x:i},backend:t,attrs:{begin:d,size:p}}),x=se({inputs:{x:g},backend:t,attrs:{shape:c}});f[m]=x,h.push(g)}return h.forEach(m=>t.disposeIntermediateTensorInfo(m)),f}const xH={kernelName:el,backendName:"webgl",kernelFunc:gH};class bH{constructor(e,t){this.variableNames=["x","segmentIds"];const s=e.windowSize,o=e.batchSize,r=e.inSize,i=e.numSegments,a=i*Math.ceil(r/s);this.outputShape=[o,a];const l="0.0",c="sumValue",u=Math.floor(s/4)*4,h=s%4,d=`
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
    `}}function yH(n){const{inputs:e,backend:t,attrs:s}=n,{x:o,segmentIds:r}=e,{numSegments:i}=s,a=o.shape.length,l=[];let c=0;const u=Ze([c],a);let h=o;u!=null&&(h=Vt({inputs:{x:o},backend:t,attrs:{perm:u}}),l.push(h),c=nt(1,a)[0]);const d=e2(h.shape,c,i),p=K([h.shape[c]]),f=se({inputs:{x:h},backend:t,attrs:{shape:[-1,p]}});l.push(f);const m=Wu(o.dtype),g=(y,C,$,v,k)=>{const N=y.shape[0],T=y.shape[1],I=QS(T,k),E={windowSize:I,inSize:T,batchSize:N,numSegments:k},R=new bH(E,C),D=t.compileAndRun(R,[y,$],v);if(l.push(D),D.shape[1]===k)return D;const F=My({backend:t,attrs:{start:0,stop:k,step:1,dtype:"float32"}}),_=By({inputs:{x:F},backend:t,attrs:{reps:[T/I]}});return l.push(F),l.push(_),g(D,C,_,v,k)},x=g(f,"unsortedSegmentSum",r,m,i),b=se({inputs:{x},backend:t,attrs:{shape:d}});let w=b;if(u!=null){l.push(b);const y=ys(u);w=Vt({inputs:{x:w},backend:t,attrs:{perm:y}})}return l.forEach(y=>t.disposeIntermediateTensorInfo(y)),w}const wH={kernelName:tl,backendName:"webgl",kernelFunc:yH};const CH=[Q3,tz,oz,az,cz,dz,fz,gz,wz,Iz,kz,Tz,Az,Oz,Pz,Bz,Wz,qz,jz,Yz,Qz,rB,aB,hB,pB,bB,wB,vB,L3,NB,DB,LB,WB,HB,KB,XB,ZB,tV,sV,rV,aV,cV,hV,fV,gV,wV,IV,kV,TV,RV,DV,OV,MV,BV,WV,UV,HV,KV,XV,ZV,QV,tW,oW,aW,cW,dW,mW,xW,yW,O3,CW,RB,$W,kW,NW,P3,EW,AW,FW,LW,zW,VW,UW,HW,jW,YW,JW,n4,o4,i4,u4,d4,f4,g4,b4,I4,k4,E4,O4,V3,z4,W4,H4,j4,fB,Y4,J4,eU,sU,aU,B3,cU,hU,pU,mU,gU,mB,A4,bU,CU,vU,U3,TU,AU,OU,PU,WU,GU,qU,jU,ZU,eG,sG,iG,cG,hG,mG,xG,oB,F4,yG,wG,IG,vG,SG,TG,RG,DG,_G,LG,PG,BG,WG,HG,KG,XG,ZG,D4,Y3,QG,tH,sH,iH,uH,pH,Z3,mH,xH,wH,Z4];for(const n of CH)Qp(n);const fp=[tw(ew({},{path:"/models/rodent/model.json",webgpu_safetensor:"./models/rodent/model.safetensors",webgpu_runner:"rodent",forceFP32:!1,webgpuStorageSize:536870912,numClasses:2,preModelId:null,preModelPostProcess:!1,isBatchOverlapEnable:!1,numOverlapBatches:0,enableTranspose:!0,enableCrop:!1,cropPadding:0,autoThreshold:0,enableQuantileNorm:!1,filterOutWithPreMask:!1,enableSeqConv:!0,textureSize:0,isPostProcessEnable:!0,returnMaskForExtraction:!0,inferenceDelay:100,warning:null}),{id:1,type:"Brain_Extraction",modelName:"Skull-strip",description:"Extract the rodent brain and save the input intensities with non-brain voxels set to zero."})];class IH{idx(e,t,s,o){return s*o[0]*o[1]+t*o[0]+e}check_previous_slice(e,t,s,o,r,i,a,l,c,u){let h=0;if(!r)return 0;const d=e[this.idx(s,o,r,i)];if(a>=6){const p=this.idx(s,o,r-1,i);d===e[p]&&(c[h++]=t[p])}if(a>=18){if(s){const p=this.idx(s-1,o,r-1,i);d===e[p]&&(c[h++]=t[p])}if(o){const p=this.idx(s,o-1,r-1,i);d===e[p]&&(c[h++]=t[p])}if(s<i[0]-1){const p=this.idx(s+1,o,r-1,i);d===e[p]&&(c[h++]=t[p])}if(o<i[1]-1){const p=this.idx(s,o+1,r-1,i);d===e[p]&&(c[h++]=t[p])}}if(a===26){if(s&&o){const p=this.idx(s-1,o-1,r-1,i);d===e[p]&&(c[h++]=t[p])}if(s<i[0]-1&&o){const p=this.idx(s+1,o-1,r-1,i);d===e[p]&&(c[h++]=t[p])}if(s&&o<i[1]-1){const p=this.idx(s-1,o+1,r-1,i);d===e[p]&&(c[h++]=t[p])}if(s<i[0]-1&&o<i[1]-1){const p=this.idx(s+1,o+1,r-1,i);d===e[p]&&(c[h++]=t[p])}}return h?(this.fill_tratab(l,c,h,u),c[0]):0}do_initial_labelling(e,t,s){const o=new Uint32Array(32),r=new Uint32Array(32);let i=1;const a=8192;let l=a,c=new Uint32Array(l).fill(0);const u=new Uint32Array(t[0]*t[1]*t[2]).fill(0),h=new Uint32Array(27);for(let d=0;d<t[2];d++)for(let p=0;p<t[1];p++)for(let f=0;f<t[0];f++){let m=0;const g=e[this.idx(f,p,d,t)];if(g!==0){if(h[0]=this.check_previous_slice(e,u,f,p,d,t,s,c,o,r),h[0]&&(m+=1),s>=6){if(f){const x=this.idx(f-1,p,d,t);g===e[x]&&(h[m++]=u[x])}if(p){const x=this.idx(f,p-1,d,t);g===e[x]&&(h[m++]=u[x])}}if(s>=18){if(p&&f){const x=this.idx(f-1,p-1,d,t);g===e[x]&&(h[m++]=u[x])}if(p&&f<t[0]-1){const x=this.idx(f+1,p-1,d,t);g===e[x]&&(h[m++]=u[x])}}if(m)u[this.idx(f,p,d,t)]=h[0],this.fill_tratab(c,h,m,r);else{if(u[this.idx(f,p,d,t)]=i,i>=l){l+=a;const x=new Uint32Array(l);x.set(c),c=x}c[i-1]=i,i++}}}for(let d=0;d<i-1;d++){let p=d;for(;c[p]!==p+1;)p=c[p]-1;c[d]=p+1}return[i-1,c,u]}fill_tratab(e,t,s,o){let i=2147483647;for(let a=0;a<s;a++){let l=t[a];for(;e[l-1]!==l;)l=e[l-1];o[a]=l,i=Math.min(i,l)}for(let a=0;a<s;a++)e[o[a]-1]=i}translate_labels(e,t,s,o){const r=t[0]*t[1]*t[2];let i=0;const a=new Uint32Array(r).fill(0);for(let u=0;u<o;u++)i=Math.max(i,s[u]);const l=new Uint32Array(i).fill(0);let c=0;for(let u=0;u<r;u++)e[u]&&(l[s[e[u]-1]-1]||(c+=1,l[s[e[u]-1]-1]=c),a[u]=l[s[e[u]-1]-1]);return[c,a]}neighbor_winners(e,t,s,o){const r=t[0],i=t[1],a=t[2],l=r*i,c=new Map,u=(d,p)=>{let f=c.get(d);f||(f=new Map,c.set(d,f)),f.set(p,(f.get(p)||0)+1)};for(let d=0;d<a;d++)for(let p=0;p<i;p++)for(let f=0;f<r;f++){const m=d*l+p*r+f,g=e[m];if(g===0||s[g])continue;let x;f>0&&(x=s[e[m-1]])&&u(g,x),f<r-1&&(x=s[e[m+1]])&&u(g,x),p>0&&(x=s[e[m-r]])&&u(g,x),p<i-1&&(x=s[e[m+r]])&&u(g,x),d>0&&(x=s[e[m-l]])&&u(g,x),d<a-1&&(x=s[e[m+l]])&&u(g,x)}const h=new Uint32Array(o+1).fill(0);for(const[d,p]of c){let f=0,m=0;for(const[g,x]of p)(x>m||x===m&&(f===0||g<f))&&(m=x,f=g);h[d]=f}return h}finalize_volume(e,t,s,o,r){const i=e.length,a=new Uint32Array(i).fill(0),l=r?this.neighbor_winners(e,t,s,o):null;let c=0;for(let u=0;u<i;u++){const h=e[u];if(h===0)continue;let d=s[h];!d&&l&&(d=l[h]),d&&(a[u]=d,d>c&&(c=d))}return[c,a]}diagnose_components(e,t,s,o,r={}){var N,T,I;const i=(N=r.topN)!=null?N:50,a=(T=r.minSize)!=null?T:1,l=(I=r.label)!=null?I:"diag",c=o[0],u=o[1],h=o[2],d=c*u,p=new Uint32Array(t+1),f=new Uint32Array(t+1);for(let E=0;E<e.length;E++){const R=s[E];R&&(p[R]=e[E],f[R]++)}const m=new Map,g=new Uint32Array(t+1),x=new Uint32Array(t+1),b=(E,R)=>{let D=m.get(E);D||(D=new Map,m.set(E,D)),D.set(R,(D.get(R)||0)+1)};for(let E=0;E<h;E++)for(let R=0;R<u;R++)for(let D=0;D<c;D++){const F=E*d+R*c+D,_=s[F];if(!_)continue;const P=p[_],z=H=>{const G=s[H];if(G===_)return;x[_]++;const Z=G?p[G]:0;Z===0?g[_]++:Z!==P&&b(_,Z)};D>0&&z(F-1),D<c-1&&z(F+1),R>0&&z(F-c),R<u-1&&z(F+c),E>0&&z(F-d),E<h-1&&z(F+d)}const w=new Map,y=new Map;for(let E=1;E<=t;E++){const R=p[E];w.set(R,(w.get(R)||0)+1),(!y.has(R)||f[E]>y.get(R))&&y.set(R,f[E])}const C=[];for(let E=1;E<=t;E++){if(f[E]<a)continue;const R=p[E],D=m.get(E);let F=0,_=0,P=0;if(D)for(const[H,G]of D)P+=G,G>_&&(_=G,F=H);const z=x[E]||1;C.push({comp:E,class:R,size:f[E],largestOfClass:f[E]===y.get(R)?"Y":"n",compsInClass:w.get(R),domNeighbor:F,domFracForeign:P?+(_/P).toFixed(2):0,domFracBoundary:+(_/z).toFixed(2),bgFrac:+(g[E]/z).toFixed(2)})}C.sort((E,R)=>R.domFracForeign-E.domFracForeign||R.size-E.size);const $=(E,R)=>{const D=R.map(_=>Math.max(_.h.length,...E.map(P=>String(P[_.k]).length))),F=_=>_.map((P,z)=>String(P).padStart(D[z])).join("  ");return[F(R.map(_=>_.h)),...E.map(_=>F(R.map(P=>_[P.k])))].join(`
`)},v=[{k:"comp",h:"comp"},{k:"class",h:"class"},{k:"size",h:"size"},{k:"largestOfClass",h:"lrg"},{k:"compsInClass",h:"nComp"},{k:"domNeighbor",h:"domNbr"},{k:"domFracForeign",h:"encF"},{k:"domFracBoundary",h:"encB"},{k:"bgFrac",h:"bgF"}];console.log(`[${l}] total components=${t}, distinct classes=${w.size}
[${l}] island candidates (encF≈1 + small size + lrg=n ⇒ swallowed island):
`+$(C.slice(0,i),v));const k=[...w.entries()].map(([E,R])=>({class:E,components:R,maxCompSize:y.get(E)})).sort((E,R)=>R.components-E.components);return console.log(`[${l}] per-class component counts (components=1 ⇒ fully connected):
`+$(k.slice(0,30),[{k:"class",h:"class"},{k:"components",h:"comps"},{k:"maxCompSize",h:"maxSize"}])),C}largest_original_cluster_labels(e,t,s,o=null,r=!1){const i=e.length,a=new Uint32Array(t+1).fill(0),l=new Uint32Array(t+1).fill(0);for(let c=0;c<i;c++){const u=e[c],h=s[c];a[h]=u,l[h]++}for(let c=0;c<t+1;c++){const u=a[c];for(let h=0;h<t+1;h++)h!==c&&u===a[h]&&(l[c]<l[h]||l[c]===l[h]&&c<h)&&(a[c]=0)}return this.finalize_volume(s,o,a,t,r)}filter_clusters(e,t,s,o,r=null,i=!1){const a=e.length,l=new Uint32Array(t+1).fill(0),c=new Uint32Array(t+1).fill(0);for(let d=0;d<a;d++){const p=e[d],f=s[d];f>0&&(l[f]=p,c[f]++)}const u=new Uint8Array(t+1).fill(1);for(let d=1;d<=t;d++){const p=l[d];if(o==="all"||o.has&&o.has(p)){for(let m=1;m<=t;m++)if(d!==m&&l[m]===p){if(c[m]>c[d]){u[d]=0;break}else if(c[m]===c[d]&&m<d){u[d]=0;break}}}}const h=new Uint32Array(t+1).fill(0);for(let d=1;d<=t;d++)u[d]&&(h[d]=l[d]);return this.finalize_volume(s,r,h,t,i)}filter_clusters_by_ratio(e,t,s,o,r=null,i=!1){const a=e.length,l=new Uint32Array(t+1).fill(0),c=new Uint32Array(t+1).fill(0);for(let p=0;p<a;p++){const f=s[p];f>0&&(l[f]===0&&(l[f]=e[p]),c[f]++)}const u=new Map;for(let p=1;p<=t;p++){const f=l[p],m=c[p];(!u.has(f)||m>u.get(f))&&u.set(f,m)}const h=new Uint8Array(t+1).fill(0);for(let p=1;p<=t;p++){const f=l[p],m=c[p],g=u.get(f)||0;m>=g*o&&(h[p]=1)}const d=new Uint32Array(t+1).fill(0);for(let p=1;p<=t;p++)h[p]&&(d[p]=l[p]);return this.finalize_volume(s,r,d,t,i)}bwlabel(e,t,s=26,o=!1,r=!1){const i=Date.now(),a=t[0]*t[1]*t[2],l=new Uint32Array(a).fill(0);if(![6,18,26].includes(s))return console.log("bwlabel: conn must be 6, 18 or 26."),[0,l];if(t[0]<2||t[1]<2||t[2]<1)return console.log("bwlabel: img must be 2 or 3-dimensional"),[0,l];if(o)for(let f=0;f<a;f++)e[f]!==0&&(l[f]=1);else l.set(e);let[c,u,h]=this.do_initial_labelling(l,t,s);u===void 0&&(u=new Uint32Array(0));const[d,p]=this.translate_labels(h,t,u,c);if(console.log(s+" neighbor clustering into "+d+" regions in "+(Date.now()-i)+"ms"),r){const[f,m]=this.largest_original_cluster_labels(l,d,p);return[f,m]}return[d,p]}filter_clusters_by_rank(e,t,s,o,r=0,i=null,a=!1,l=null,c=!1){const u=e.length,h=new Uint32Array(t+1).fill(0),d=new Uint32Array(t+1).fill(0),p=l!=null&&Array.isArray(i)&&i.length===3,f=p?i[0]:0,m=p?i[1]:0,g=p?new Int32Array(t+1).fill(2147483647):null,x=p?new Int32Array(t+1).fill(-1):null,b=p?new Int32Array(t+1).fill(2147483647):null,w=p?new Int32Array(t+1).fill(-1):null,y=p?new Int32Array(t+1).fill(2147483647):null,C=p?new Int32Array(t+1).fill(-1):null;for(let I=0;I<u;I++){const E=s[I];if(E>0&&(h[E]===0&&(h[E]=e[I]),d[E]++,p)){const R=I%f,D=I/f|0,F=D%m,_=D/m|0;R<g[E]&&(g[E]=R),R>x[E]&&(x[E]=R),F<b[E]&&(b[E]=F),F>w[E]&&(w[E]=F),_<y[E]&&(y[E]=_),_>C[E]&&(C[E]=_)}}let $=null,v=0;if(p){let I=-1;for(let P=1;P<=t;P++)d[P]>I&&(I=d[P],v=P);const E=Math.max(2,Math.ceil(l)+4),R=f*m,D=new Int16Array(u).fill(-1);let F=[];for(let P=0;P<u;P++)s[P]===v&&(D[P]=0,F.push(P));for(let P=1;P<=E&&F.length;P++){const z=[];for(let H=0;H<F.length;H++){const G=F[H],Z=G%f,Q=(G/f|0)%m;Z>0&&D[G-1]===-1&&(D[G-1]=P,z.push(G-1)),Z<f-1&&D[G+1]===-1&&(D[G+1]=P,z.push(G+1)),Q>0&&D[G-f]===-1&&(D[G-f]=P,z.push(G-f)),Q<m-1&&D[G+f]===-1&&(D[G+f]=P,z.push(G+f)),G-R>=0&&D[G-R]===-1&&(D[G-R]=P,z.push(G-R)),G+R<u&&D[G+R]===-1&&(D[G+R]=P,z.push(G+R))}F=z}const _=E+1;$=new Float64Array(t+1).fill(_);for(let P=0;P<u;P++){const z=s[P];if(z>0&&z!==v){const H=D[P]>=0?D[P]:_;H<$[z]&&($[z]=H)}}c&&console.log(`[rank-filter] brain comp=${v} size=${I} bbox A[${g[v]},${x[v]}] B[${b[v]},${w[v]}] C[${y[v]},${C[v]}] | maxGap=${l} scan=${E}`)}const k=new Map;for(let I=1;I<=t;I++){const E=h[I],R=d[I];k.has(E)||k.set(E,[]),k.get(E).push({i:I,size:R})}const N=new Uint8Array(t+1).fill(0);for(const[I,E]of k.entries()){E.sort((_,P)=>P.size-_.size);const R=E.length?E[0].size:0,D=r>0?R*r:0,F=Math.min(E.length,o);for(let _=0;_<F;_++){const P=E[_];if(P.size<D){c&&_>0&&console.log(`[rank-filter] class ${I} #${_}: size=${P.size} DROP (below ${(r*100).toFixed(0)}% floor)`);break}if(_>0&&p){const z=$[P.i],H=z<=l;if(c&&console.log(`[rank-filter] class ${I} #${_}: size=${P.size} surfDist=${z} -> ${H?"KEEP":"DROP (too far)"}`),!H)continue}N[P.i]=1}}const T=new Uint32Array(t+1).fill(0);for(let I=1;I<=t;I++)N[I]&&(T[I]=h[I]);return this.finalize_volume(s,i,T,t,a)}}function $H(n,e,t){return X(this,null,function*(){const[s,o,r,i,a,l]=yield FH(e),c=o-s+1,u=i-r+1,h=l-a+1,d=(k,N,T,I)=>{const E=Math.min(k,I),R=Math.min(255-N,I),D=Math.max(0,k-E),F=Math.min(255,N+R);return[D,F]},[p,f]=d(s,o,c,t),[m,g]=d(r,i,u,t),[x,b]=d(a,l,h,t);let w=n.slice([p,m,x],[f-p+1,g-m+1,b-x+1]);const y=w.shape,C=y[0]%2,$=y[1]%2,v=y[2]%2;return C||$||v?(w=w.pad([[0,C],[0,$],[0,v]]),console.log(`Padded to even dims: [${y}] -> [${w.shape}]`)):console.log(`Crop dimensions (already even): [${y}]`),{cropped:w,corner:[p,m,x],padding:[C,$,v]}})}function vH(o,r,i){return X(this,arguments,function*(n,e,t,s=[0,0,0]){const[a,l,c]=e,[u,h,d]=t,[p,f,m]=n.shape,[g,x,b]=s||[0,0,0],w=Math.max(0,a+g),y=Math.max(0,l+x),C=Math.max(0,c+b),$=[[w,Math.max(0,u-p-w)],[y,Math.max(0,h-f-y)],[C,Math.max(0,d-m-C)]],v=n.pad($);if(v.shape[0]>u||v.shape[1]>h||v.shape[2]>d){const k=v.slice([0,0,0],[u,h,d]);return v.dispose(),k}return v})}function kH(n,e){return X(this,null,function*(){const t=n.max(),s=t.mul(e),o=yield s.data();return t.dispose(),s.dispose(),B(()=>n.clone().greater(o[0]))})}function SH(n,e=.01,t=.99){return X(this,null,function*(){const s=n.flatten(),o=s.shape[0],r=yield s.data();s.dispose();const i=Math.min(1e5,o);let a;if(i>=o)a=Array.from(r);else{a=new Array(i);for(let p=0;p<i;p++){const f=Math.floor(Math.random()*o);a[p]=r[f]}}a.sort((p,f)=>p-f);const l=a.length,c=Math.floor(l*e),u=Math.ceil(l*t)-1,h=a[c],d=a[u];return{qmin:h,qmax:d}})}function NH(n,e,t,s,o,r,i){return X(this,null,function*(){const a=n.shape[4],l=e.shape[4];let c=null;for(let u=0;u<l;u++){const h=Math.ceil(a/i);let d=null;for(let f=0;f<h;f++){const m=f*i,g=Math.min((f+1)*i,a);if(m<a){const x=B(()=>{const b=n.slice([0,0,0,0,m],[-1,-1,-1,-1,g-m]),w=e.slice([0,0,0,m,u],[-1,-1,-1,g-m,1]);return fi(b,w,s,o,"NDHWC",r)});if(d===null)d=x;else{const b=d.add(x);d.dispose(),x.dispose(),d=b}}}let p;if(t){const f=t.slice([u],[1]);p=d.add(f),d.dispose(),f.dispose()}else p=d;if(c==null)c=p;else{const f=yield vt([c,p],4);p.dispose(),c.dispose(),c=f}}return c})}function TH(n,e=1e-5){return B(()=>{const{mean:t,variance:s}=Cl(n,[1,2,3],!0),o=Al(s.add(e));return n.sub(t).mul(o)})}function EH(n,e,t,s,o,r,i){return X(this,null,function*(){const a=n.shape[4],l=e.shape[4];let c=null;for(let u=0;u<l;u++){const h=Math.ceil(a/i);let d=null;for(let m=0;m<h;m++){const g=m*i,x=Math.min((m+1)*i,a);if(g<a){const b=B(()=>{const w=n.slice([0,0,0,0,g],[-1,-1,-1,-1,x-g]),y=e.slice([0,0,0,g,u],[-1,-1,-1,x-g,1]);return fi(w,y,s,o,"NDHWC",r)});if(d===null)d=b;else{const w=d.add(b);d.dispose(),b.dispose(),d=w}}}let p;if(t){const m=t.slice([u],[1]);p=d.add(m),d.dispose(),m.dispose()}else p=d;const f=TH(p);if(p.dispose(),c===null)c=f;else{const m=yield vt([c,f],4);f.dispose(),c.dispose(),c=m}}return c})}function Wy(n,e,t,s,o,r,i,a){const l=n.length;return B(()=>{let c=null;const u=Math.ceil(l/a);for(let h=0;h<u;h++){const d=h*a,p=Math.min((h+1)*a,l),f=p-d,m=f===1?n[d]:vt(n.slice(d,p),4),g=e.slice([0,0,0,d,s],[-1,-1,-1,f,1]),x=fi(m,g,o,r,"NDHWC",i);c=c===null?x:c.add(x)}return t&&(c=c.add(t.slice([s],[1]))),c})}function Uy(n,e,t,s,o,r,i,a=!1){const l=e.shape[4],c=[];for(let u=0;u<l;u++){let h=Wy(n,e,t,u,s,o,r,i);if(a){const d=Gy(h);h.dispose(),h=d}c.push(h)}return c}function RH(n,e,t,s,o,r){const i=e.shape[3],a=e.shape[4],l=[1,s[0],s[1],s[2],1],c=[];for(let u=0;u<i;u++){const h=B(()=>{let d=null;for(let p=0;p<a;p++){const f=e.slice([0,0,0,u,p],[-1,-1,-1,1,1]),m=Vf(n[p],f,l,o,r);d=d===null?m:d.add(m)}return t&&(d=d.add(t.slice([u],[1]))),d});c.push(h)}return c}function AH(n,e,t,s,o,r,i,a=!0){return X(this,null,function*(){const l=e.shape[4],c=3;let u=null,h=null,d=null;for(let p=0;p<l;p++){const f=Wy(n,e,t,p,s,o,r,c);d===null&&(d=[f.shape[1],f.shape[2],f.shape[3]]);const m=B(()=>f.reshape(d));if(f.dispose(),u===null)u=m,h=Ee(m);else{const[g,x]=B(()=>{const b=qt(m,u);return[dt(b,m,u),dt(b,Po(h.shape,p),h)]});u.dispose(),h.dispose(),m.dispose(),u=g,h=x}i&&i(`Final layer class ${p+1}/${l}`,(p+1)/l),!a&&p%8===0&&(yield new Promise(g=>setTimeout(g,0)))}return u.dispose(),h})}function DH(n){const e=n.shape[4];if(e===1)return[n];const t=[];for(let s=0;s<e;s++)t.push(n.slice([0,0,0,0,s],[-1,-1,-1,-1,1]));return t}function Gy(n,e=1e-5){return B(()=>{const t=n.shape.length,s=n.shape[t-1],o=n.shape[1]*n.shape[2]*n.shape[3],r=n.transpose([0,4,1,2,3]).reshape([s,o]),i=r.mean(1),l=r.sub(i.reshape([s,1])).square().mean(1),c=Al(te(l,e)),u=i.reshape([1,1,1,1,s]),h=c.reshape([1,1,1,1,s]);return n.sub(u).mul(h)})}function mp(n,e=0){return X(this,null,function*(){let t=[];e===0?t=yield n.max(2).max(1).arraySync():e===1?t=yield n.max(2).max(0).arraySync():t=yield n.max(1).max(0).arraySync();let s=t.length,o=0;for(let r=0;r<t.length;r++)if(t[r]>0){s=r;break}for(let r=t.length-1;r>=0;r--)if(t[r]>0){o=r;break}return[s,o]})}function FH(n){return X(this,null,function*(){const[e,t]=yield mp(n,0),[s,o]=yield mp(n,1),[r,i]=yield mp(n,2);return console.log("row min and max  :",e,t),console.log("col min and max  :",s,o),console.log("depth min and max  :",r,i),[e,t,s,o,r,i]})}function _H(n,e,t,s,o,r,i,a,l=!0){return X(this,null,function*(){n[0].dtype!=="int32"&&i("",-1,"generateBrainMask assumes int32"),o.preModelPostProcess&&i("",-1,"generateBrainMask assumes BWLabeler instead of preModelPostProcess");const c=n.length,u=n[0].size,h=c*u,d=new Int32Array(h);let p=0;for(let f=0;f<c;f++)d.set(n[f].dataSync(),p),p+=u;for(let f=0;f<h;f++)d[f]=d[f]!==0?1:0;return(l||r.showPhase1Output)&&(a(d,r,o),i("Segmentation finished",0)),Hs(d,[e,t,s])})}function OH(n,e,t){return X(this,null,function*(){const s=e.dims[1],o=e.dims[2];let r;if(e.datatypeCode===2)r=new Uint8Array(t);else if(e.datatypeCode===4)r=new Int16Array(t);else if(e.datatypeCode===8)r=new Int32Array(t);else if(e.datatypeCode===16)r=new Float32Array(t);else if(e.datatypeCode===64)r=new Float64Array(t);else if(e.datatypeCode===256)r=new Int8Array(t);else if(e.datatypeCode===512)r=new Uint16Array(t);else if(e.datatypeCode===768)r=new Uint32Array(t);else return;const i=[];let a=0;for(let c=0;c<n;c++){const u=new Array(o*s);let h=0;for(let d=0;d<o;d++)for(let p=0;p<s;p++){const f=r[a++];u[h++]=f&255}i.push(Hs(u,[o,s]))}const l=Bn(i);return xe(i),l})}function Hy(n){return X(this,null,function*(){return n.layers.length})}function qy(n){return X(this,null,function*(){let e=0;for(let t=0;t<n.layers.length;t++)e+=n.layers[t].countParams();return e})}function Ac(n){return X(this,null,function*(){for(let e=0;e<n.layers.length;e++)if(n.layersByDepth[e][0].dataFormat)return n.layersByDepth[e][0].dataFormat==="channelsLast"})}function Ky(n){return X(this,null,function*(){return yield LE(n)})}function jy(n){return X(this,null,function*(){const e=n.max(),t=n.min();return yield n.sub(t).div(e.sub(t))})}function LH(n,e,t){const i=n.shape[4],a=Math.ceil(i/t);let l=null;for(let c=0;c<a;c++){const u=c*t,d=Math.min((c+1)*t,i)-u,p=B(()=>n.slice([0,0,0,0,u],[-1,-1,-1,-1,d])),f=B(()=>e.slice([0,0,0,u,0],[-1,-1,-1,d,-1])),m=fi(p,f,1,0,"NDHWC",1);p.dispose(),f.dispose();const g=oo(m);if(m.dispose(),l===null)l=g;else{const x=l.add(g);l.dispose(),l!==g&&g.dispose(),l=x}B(()=>{Fe(ot([1,1]),ot([1,1]))})}return l}function Xy(n,e=.05,t=.95){return X(this,null,function*(){const{qmin:s,qmax:o}=yield SH(n,e,t),r=o-s,i=n.sub(s),a=i.div(r);return i.dispose(),a})}class MH{constructor(e,t,s,o,r=!0){this.model=e,this.outChannels=e.outputLayers[0].kernel.shape[4],this.chunkSize=t,this.isChannelLast=s,this.callbackUI=o,this.isWebWorker=r}apply(e){return X(this,null,function*(){const t=performance.now(),s=this.model.layers[this.model.layers.length-1],o=s.getWeights()[0],r=s.getWeights()[1],i=this.isChannelLast?e.shape.slice(1,-1):e.shape.slice(2);let a=yield L(os(i),-1e4),l=yield ot(i);const c=3,u=Math.ceil(this.outChannels/c);for(let p=0;p<u;p++){const f=p*c,m=Math.min((p+1)*c,this.outChannels),[g,x]=yield B(()=>{let b=a,w=l;for(let y=f;y<m;y++){const C=o.slice([0,0,0,0,y],[-1,-1,-1,-1,1]),$=r.slice([y],[1]),v=LH(e,C,Math.min(this.chunkSize,this.outChannels)).add($),k=qt(v,b);b=dt(k,v,b),w=dt(k,Po(w.shape,y),w)}return[b,w]});xe([a,l]),a=g,l=x,this.callbackUI(`Processing chunk ${p+1}/${u}`,(p+1)/u),this.isWebWorker||(yield new Promise(b=>setTimeout(b,0)))}const h=l.clone();xe([a,l]);const d=performance.now();return console.log(`Execution time: ${d-t} milliseconds`),h})}}function PH(n,e,t,s){return X(this,null,function*(){console.log("Downloading segmentation data from GPU to CPU...");const o=yield n.data(),r=n.shape;if(console.log("Data download complete. Starting CPU processing."),s.isPostProcessEnable){console.log("Applying CPU-based connected-component labeling...");const i=performance.now(),a=new IH,l=[5,14],c=!!s.fillSuppressedWithNeighborLabel||l.includes(t.id),u=r[0]*r[1]*r[2],h=Math.max(1e5,Math.floor(u*.01)),[d,p]=a.bwlabel(o,r,6,!1,!1);if(d>h){const x=`Segmentation produced noise: ${d.toLocaleString()} disconnected regions (cap ${h.toLocaleString()}). The model output is unusable, so post-processing was aborted. Try re-running, switching backend (WebGPU/WebGL2), or another model.`;console.error("[postprocess] "+x);const b=new Error(x);throw b.code="SEGMENTATION_NOISE",b}let f=!1,m=!1;if(t.type==="Brain_Extraction"||t.type==="Brain_Masking"?(f=!0,m=!0):[1,7].includes(t.id)?(f=!1,m=!1):[5,14].includes(t.id)?(f=!1,m=!0):[3,8,9].includes(t.id)?(f=!1,m=!1):(f=!0,m=!0),[1,7].includes(t.id)){const y=d,C=p,[$,v]=a.filter_clusters_by_rank(o,y,C,2,.02,r,c,8,!1);o.set(v)}else if(!m&&[3,8,9].includes(t.id)){const[x,b]=a.bwlabel(o,r,6,!0,!0);for(let k=0;k<o.length;k++)o[k]*=b[k];const[w,y]=a.bwlabel(o,r,6,!1,!1),C=new Set([1,2,5,6,13]),[$,v]=a.filter_clusters(o,w,y,C,r,c);o.set(v)}else if(!f&&m){s.diagnoseEnclosedComponents&&a.diagnose_components(o,d,p,r,{label:`model${t.id}`,topN:60});const[x,b]=a.largest_original_cluster_labels(o,d,p,r,c);o.set(b)}else{const[x,b]=a.bwlabel(o,r,6,f,m);if(f)for(let w=0;w<o.length;w++)o[w]*=b[w];else o.set(b)}const g=((performance.now()-i)/1e3).toFixed(4);console.log(`Connected-component labeling took: ${g} seconds.`)}switch(t.type){case"Brain_Masking":{const i=new Uint8Array(o.length);for(let a=0;a<o.length;a++)i[a]=o[a]!==0?1:0;return i}case"Brain_Extraction":{if(t.returnMaskForExtraction){const a=new Uint8Array(o.length);for(let l=0;l<o.length;l++)a[l]=o[l]!==0?1:0;return a}const i=new e.constructor(o.length);for(let a=0;a<o.length;a++){const l=o[a]!==0?1:0;i[a]=e[a]*l}return i}default:return new Uint8Array(o)}})}function zH(n,e,t){var l;let s=0,o=1;if(t)if(e.length===5)o=e[1]*e[2]*e[3];else for(let c=0;c<e.length;c++)e[c]>1&&(o*=e[c]);else if(e.length===5)o=e[2]*e[3]*e[4];else for(let c=0;c<e.length;c++)e[c]>32&&(o*=e[c]);let r=0,i=0;if(n&&n.layers){const c=n.layers.length;for(let u=0;u<c;u++){const h=n.layers[u],d=u===c-1;let p=0,f=h.outputShape;Array.isArray(f)&&Array.isArray(f[0])&&(f=f[0]),Array.isArray(f)&&(t?p=f[f.length-1]:p=f[1]);let m=0;const g=h.batchInputShape,x=b=>Array.isArray(b)?t?b[b.length-1]:b[1]:0;if(g)if(Array.isArray(g)&&Array.isArray(g[0]))for(const b of g)m+=x(b);else Array.isArray(g)&&(m=x(g));if(m===0&&h.weights&&h.weights.length>0){const b=h.weights[0];b&&b.shape&&(b.shape.length===5?m=b.shape[3]:b.shape.length===4&&(m=b.shape[2]))}if(m===0&&(m=p),typeof p=="number"&&typeof m=="number"){const b=o*(m+p),w=o*p;!d&&b>s&&(s=b);const y=o*Math.max(m,p);!d&&y>i&&(i=y),r=w}}}s===0&&(s=o*32*2),i===0&&(i=o*32);const a=!!(n&&n.layers&&n.layers.some(c=>typeof c.name=="string"&&c.name.endsWith("_gn")));return console.log(`[Estimator] Total Layers: ${(l=n==null?void 0:n.layers)==null?void 0:l.length}, Peak(in+out): ${s}, MaxSingle: ${i}, Final Output: ${r}, unpackedIntermediate: ${a}`),{peak:s,maxSingle:i,maxOutput:r,hasUnpackedIntermediate:a}}const gp={WEBGPU:"webgpu",WEBGL_WEBWORKER:"webgl-webworker",WEBGL_SEQUENTIAL:"webgl-sequential"};function BH(n,e){return{startTime:Date.now(),Model_Name:(n==null?void 0:n.modelName)||"Unknown",Execution_Mode:e,TF_Backend:e===gp.WEBGPU?"webgpu":"webgl",isModelFullVol:null,No_SubVolumes:1,Brainchop_Ver:"FullVolume",Input_Shape:null,Output_Shape:null,Channel_Last:null,Model_Param:null,Model_Layers:null,Actual_Labels:null,Expect_Labels:null,NumLabels_Match:null,Missing_Labels:null,Inference_t:null,Postprocess_t:null,Status:null,Error_Type:null,Extra_Err_Info:null}}function VH(n,e,t,s,o,r){return X(this,null,function*(){var i,a,l;if(e)try{n.Input_Shape=JSON.stringify(t),n.Output_Shape=JSON.stringify(((i=e.output)==null?void 0:i.shape)||((l=(a=e.outputs)==null?void 0:a[0])==null?void 0:l.shape)),n.Channel_Last=s,o&&(n.Model_Param=yield o(e)),r&&(n.Model_Layers=yield r(e))}catch(c){console.warn("Failed to add model info to diagnostics:",c)}})}function Yy(n,e,t,s=null){n.Expect_Labels=e,n.Actual_Labels=t,n.NumLabels_Match=e===t,s&&s.length>0&&(n.Missing_Labels=s.join(", "))}function Zy(n,e,t){n.Inference_t=e,n.Postprocess_t=t,n.Status="OK"}function Qi(n,e,t=null){n.Inference_t=1/0,n.Postprocess_t=1/0,n.Status="Fail",n.Error_Type=(e==null?void 0:e.message)||String(e),t&&(n.Extra_Err_Info=t)}const WH=!1;function Dc(n,e,t,s,o,r,i,a,l){return X(this,null,function*(){const c=performance.now();console.log(`---- Start FullVolume Inference (SeqConv: ${e.enableSeqConv}) ----`),e.enableQuantileNorm?(console.log("preModel Quantile normalization enabled"),s=yield Xy(s)):(console.log("preModel Min Max normalization enabled"),s=yield jy(s));let u;if(o==null){const j=e.autoThreshold;j>0&&j<=1?u=yield kH(s,j):u=yield s.greater([0]).asType("bool")}else u=yield o.greater([0]).asType("bool");const h=s.shape,d=e.webglEnableTranspose!==void 0?e.webglEnableTranspose:e.enableTranspose,p=e.cropPadding;let f,m,g;if(e.enableCrop){const j=yield $H(s,u,p);f=j.cropped,m=j.corner,g=j.padding,s.dispose()}else{console.log("Skipping cropping (enableCrop: false)");const j=s.shape,Y=j[0]%2,ne=j[1]%2,oe=j[2]%2;Y||ne||oe?(console.log(`Padding standard input to even: ${j} -> +[${Y}, ${ne}, ${oe}]`),f=s.pad([[0,Y],[0,ne],[0,oe]]),g=[Y,ne,oe],s.dispose()):(f=s,g=null),m=[0,0,0]}u.dispose(),e.inputPermutation?(console.log(`Permuting Input: ${e.inputPermutation}`),f=f.transpose(e.inputPermutation)):d&&(f=f.transpose(),console.log("Input transposed for pre-model"));const x=yield t,b=x.layers.length,w=Ac(x);let y;w?(x.layers[0].batchInputShape[1]=f.shape[0],x.layers[0].batchInputShape[2]=f.shape[1],x.layers[0].batchInputShape[3]=f.shape[2],y=[n.batchSize,x.layers[0].batchInputShape[1],x.layers[0].batchInputShape[2],x.layers[0].batchInputShape[3],n.numOfChan]):(x.layers[0].batchInputShape[2]=f.shape[0],x.layers[0].batchInputShape[3]=f.shape[1],x.layers[0].batchInputShape[4]=f.shape[2],y=[n.batchSize,n.numOfChan,x.layers[0].batchInputShape[2],x.layers[0].batchInputShape[3],x.layers[0].batchInputShape[4]]);let C=f.reshape(y),$=!1;if(!e.enableSeqConv){const{peak:j,maxSingle:Y,maxOutput:ne,hasUnpackedIntermediate:oe}=zH(x,y,w);console.log(`[Centralized Check] Peak (In+Out): ${j}, MaxSingle: ${Y}, Max Output: ${ne}, unpackedIntermediate: ${oe}`);const le=vf(),ae=le&&le.gpgpu&&le.gpgpu.gl?le.gpgpu.gl.getParameter(le.gpgpu.gl.MAX_TEXTURE_SIZE):16384;console.log(`[Memory Check] MAX_TEXTURE_SIZE from WebGL context: ${ae}`);const ue=Math.ceil(Math.sqrt(Math.ceil(Y/(oe?1:4)))),Ie=Math.ceil(Math.sqrt(ne));ue>ae?(console.warn(`[Memory Check] PACKED intermediates too large (${ue} > ${ae}). Using full SeqConv.`),e.enableSeqConv=!0):Ie>ae?(console.warn(`[Memory Check] UNPACKED output too large (${Ie} > ${ae}). Using chunkedArgMax.`),$=!0):console.log("[Memory Check] All checks passed. Using fast path.")}const v=e.enableSeqConv?"SeqConv (SLOW: per-channel conv + sync every layer)":$?"fast + chunkedArgMax (final layer only)":"fast (dense)";console.log(`%c[PATH] ${v}  | crop=${f.shape}  | enableCrop=${e.enableCrop} cropPadding=${e.cropPadding}`,"font-weight:bold;color:#0a0");function k(j,Y,ne,oe,le,ae,pe){return X(this,null,function*(){let ue=1,Ie=Y;const Le=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Ne=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;let Te=Le||Ne?10:15;for(le.enableSeqConv&&(Te=1),console.log(`Syncing GPU every ${Te} layers.`);ue<=ne;){performance.now();let de="";try{let $e;const Me=j.layers[ue],Qe=Me.activation,Ve=Me.getClassName()==="Conv3D"&&Qe&&Qe.getClassName()==="linear";le.enableSeqConv&&Ve?$e=yield(j.layers[ue].name.endsWith("_gn")?EH:NH)(Ie,j.layers[ue].getWeights()[0],j.layers[ue].getWeights()[1],j.layers[ue].strides,j.layers[ue].padding,j.layers[ue].dilationRate,3):WH&&j.layers[ue].name.endsWith("_gn")||($e=B(()=>{let Ct=j.layers[ue].apply(Ie);return j.layers[ue].name.endsWith("_gn")&&(Ct=Gy(Ct)),Ct})),Ie.dispose(),Ie=$e}catch($e){throw pe($e.message,-1,$e.message),Ke().endScope(),Ke().disposeVariables(),Qi(ae,$e,"Failed while model layer "+ue+" apply"),pe("",-1,"",ae),$e}if(ue%Te===0){pe("Layer "+ue.toString(),(ue+1)/oe);const $e=Ie.slice([0,0,0,0,0],[1,1,1,1,1]);yield $e.data(),$e.dispose()}else pe("Layer "+ue.toString(),(ue+1)/oe);ue++}return Ie})}function N(j,Y,ne,oe,le,ae,pe){return X(this,null,function*(){const ue=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Ie=navigator.userAgent.toLowerCase().indexOf("firefox")>-1,Le=ue||Ie?4:6;let Ne=DH(Y),Te=1;for(;Te<=ne;){try{const de=j.layers[Te],$e=de.getClassName(),Me=de.activation;let Qe;if($e==="Conv3D"&&Me&&Me.getClassName()==="linear"){const Ve=de.name.endsWith("_gn");Qe=Uy(Ne,de.getWeights()[0],de.getWeights()[1],de.strides,de.padding,de.dilationRate,3,Ve)}else if($e==="Activation")Qe=Ne.map(Ve=>B(()=>de.apply(Ve)));else if($e==="Conv3D"){Qe=Uy(Ne,de.getWeights()[0],de.getWeights()[1],de.strides,de.padding,de.dilationRate,3,!1);const Ve=Qe.map(Ct=>B(()=>de.activation.apply(Ct)));xe(Qe),Qe=Ve}else if($e==="Conv3DTranspose"){const Ve=[Ne[0].shape[1],Ne[0].shape[2],Ne[0].shape[3]],Ct=de.computeOutputShape([1,Ve[0],Ve[1],Ve[2],Ne.length]),Xt=[Ct[1],Ct[2],Ct[3]];if(Qe=RH(Ne,de.getWeights()[0],de.getWeights()[1],Xt,de.strides,de.padding),de.activation&&de.activation.getClassName()!=="linear"){const us=Qe.map(ln=>B(()=>de.activation.apply(ln)));xe(Qe),Qe=us}}else throw new Error(`Channel-list path: unsupported layer ${$e} (${de.name})`);xe(Ne),Ne=Qe}catch(de){throw xe(Ne),pe(de.message,-1,de.message),Ke().endScope(),Ke().disposeVariables(),Qi(ae,de,"Failed while model layer "+Te+" apply (channel-list)"),pe("",-1,"",ae),de}if(pe("Layer "+Te.toString(),(Te+1)/oe),Te%Le===0){const de=Ne[0].slice([0,0,0,0,0],[1,1,1,1,1]);yield de.data(),de.dispose()}Te++}return Ne})}const T=performance.now(),E=e.enableSeqConv||$?b-2:b-1;let R;if(e.enableSeqConv){e.enableTTA&&console.warn("[channel-list] TTA is not supported on the channel-list path; running a single pass.");const j=yield N(x,C,E,b,e,r,a);f.dispose(),console.log("Applying channel-list final classifier + argmax...");const Y=x.layers[b-1],ne=typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope,oe=yield AH(j,Y.getWeights()[0],Y.getWeights()[1],Y.strides,Y.padding,Y.dilationRate,a,ne);xe(j),R=oe.asType("int32"),oe.dispose(),console.log("Channel-list argmax output shape:",R.shape)}else{if(e.enableTTA){console.log("--- Running TTA Pass 1 (Original) ---");const Y=yield k(x,C,E,b,e,r,a);if(!Y)throw new Error("TTA Error: logits1 is null or undefined");console.log("--- Running TTA Pass 2 (Flipped) ---");const ne=e.ttaFlipAxis||1,oe=f.clone().reverse(ne).reshape(y),le=yield k(x,oe,E,b,e,r,a);if(!le)throw new Error("TTA Error: logits2 is null or undefined");console.log("--- Averaging TTA Results ---");const ae=B(()=>{const pe=le.shape;return le.reshape([pe[0]*pe[1],pe[2],pe[3],pe[4]]).reverse(ne).reshape(pe)});C=Y.add(ae).div(2),Y.dispose(),le.dispose(),ae.dispose(),f.dispose()}else C=yield k(x,C,E,b,e,r,a),f.dispose();if($){console.log("Applying SequentialConvLayer for final layer only (fast path for layers 1-18)...");const Y=yield new MH(x,10,w,a).apply(C);R=Y.asType("int32"),Y.dispose(),C.dispose(),console.log("SequentialConvLayer (final only) output shape:",R.shape)}else console.log("Applying final ArgMax..."),R=B(()=>{const Y=Ys(C,w?-1:1);return oo(Y)}),C.dispose(),console.log("ArgMax output shape:",R.shape)}const D=((performance.now()-T)/1e3).toFixed(4);console.log(`---- Inference Time: ${D} seconds ----`),e.outputPermutation?(console.log(`Permuting Output: ${e.outputPermutation}`),R=R.transpose(e.outputPermutation)):d&&(console.log("outLabelVolume transposed"),R=R.transpose());const F=performance.now();if(g&&(g[0]||g[1]||g[2])){const j=R.shape,Y=[j[0]-g[0],j[1]-g[1],j[2]-g[2]],ne=R.slice([0,0,0],Y);R.dispose(),R=ne,console.log(`Removed padding: [${j}] -> [${R.shape}]`)}console.log("outLabelVolume without padding shape: ",R.shape),R=yield vH(R,m,h,e.outputShift),console.log("outLabelVolume final shape after restoration: ",R.shape);const _=((performance.now()-F)/1e3).toFixed(4);console.log(`---- Restoration Time: ${_} seconds ----`);const P=performance.now();let z;try{z=yield PH(R,l,e,n)}catch(j){throw a(j.message,-1,j.message),Qi(r,j,"Failed during segmentation post-processing"),a("",-1,"",r),R.dispose(),Ke().disposeVariables(),j}const H=((performance.now()-P)/1e3).toFixed(4);console.log(`---- Postprocessing Time: ${H} seconds ----`),R.dispose(),Ke().disposeVariables();const G=((performance.now()-c)/1e3).toFixed(4);console.log(`---- Total Execution Time: ${G} seconds ----`);const J=new Set(z).size,Q=e.numClasses||J;return Yy(r,Q,J),Zy(r,D,H),a(e.modelName+"<br>Segmentation finished",0),a("",-1,"",r),i(z,n,e),0})}function Be(n="",e=-1,t="",s=[]){let o=[];Object.keys(s).length>0&&(o=function(){const i={};for(const a in s)i[a]=s[a];return JSON.stringify(i)}()),self.postMessage({cmd:"ui",message:n,progressFrac:e,modalMessage:t,statData:o})}function Fc(n,e,t){self.postMessage({cmd:"img",img:n,opts:e,modelEntry:t})}function UH(n,e,t,s,o,r,i,a,l,c,u){return X(this,null,function*(){if(a.No_SubVolumes=1,i.preModelId){const h=yield Ky(l.rootURL+fp[i.preModelId-1].path),d=fp[i.preModelId-1].enableTranspose,p=fp[i.preModelId-1].enableQuantileNorm;let f=null;p?(console.log("preModel Quantile normalization enabled"),f=yield Xy(e)):(console.log("preModel Min Max normalization enabled"),f=yield jy(e)),d?(f=f.transpose(),console.log("Input transposed for pre-model")):console.log("Transpose not enabled for pre-model"),a.Brainchop_Ver="PreModel_FV";const m=yield h;try{const g=performance.now(),x=m,b=x.layers[0].batchInputShape;if(console.log(" Pre-Model batch input shape : ",b),b.length!==5){const D="The pre-model input shape must be 5D ";return Be(D,-1,D),0}const w=yield Ac(x),y=l.batchSize,C=l.numOfChan;let $,v,k,N;if(w){if(console.log("Pre-Model Channel Last"),isNaN(b[4])||b[4]!==1){const D="The number of channels for pre-model input shape must be 1";return Be(D,-1,D),0}$=b[1],v=b[2],k=b[3],N=[y,$,v,k,C]}else{if(console.log("Pre-Model Channel First"),isNaN(b[1])||b[1]!==1){const D="The number of channels for pre-model input shape must be 1";return Be(D,-1,D),0}$=b[2],v=b[3],k=b[4],N=[y,C,$,v,k]}a.Input_Shape=JSON.stringify(N),a.Output_Shape=JSON.stringify(x.output.shape),a.Channel_Last=yield w,a.Model_Param=yield qy(x),a.Model_Layers=yield Hy(x);let T=0,I=1;const E=m.layers.length,R=[];for(R[0]=f.reshape(N),xe(f);;){try{R[I]=m.layers[I].apply(R[I-1])}catch(D){const F="Your graphics card (e.g. Intel) may not be compatible with WebGL. "+D.message;return Be(F,-1,F),Ke().endScope(),Ke().disposeVariables(),Qi(a,D,"PreModel Failed while model layer "+I+" apply"),Be("",-1,"",a),0}if(m.layers[I].dispose(),R[I-1].dispose(),Be("Layer "+I.toString(),(I+1)/E),ci().unreliable){const D="unreliable reasons :"+ci().reasons;Be(D,NaN,D)}if(I===E-1){const D=w?-1:1;console.log(" find argmax "),console.log("last Tensor shape : ",R[I].shape);const F=w?R[I].shape[4]:R[I].shape[1];let _;try{console.log(" Try tf.argMax for fullVolume .."),_=yield Ys(R[I],D)}catch(j){if(D===-1)try{const Y=performance.now();console.log(" tf.argMax failed .. try argMaxLarge .."),Be("",-1,"tensor2LightBuffer() is not dead code?"),Be("",-1,"argMaxLarge() is not dead code?"),console.log("argMaxLarge for fullVolume takes : ",((performance.now()-Y)/1e3).toFixed(4))}catch(Y){const ne="argMax buffer couldn't be created due to limited memory resources.";return Be(ne,-1,ne),_.dispose(),Ke().endScope(),Ke().disposeVariables(),a.Inference_t=1/0,a.Postprocess_t=1/0,a.Status="Fail",a.Error_Type=Y.message,a.Extra_Err_Info="preModel prediction_argmax from argMaxLarge failed",Be("",-1,"",a),0}else{const Y="argMax buffer couldn't be created due to limited memory resources.";return Be(Y,-1,Y),_.dispose(),Ke().endScope(),Ke().disposeVariables(),a.Inference_t=1/0,a.Postprocess_t=1/0,a.Status="Fail",a.Error_Type=j.message,a.Extra_Err_Info="preModel prediction_argmax from argMaxLarge not support yet channel first",Be("",-1,"",a),0}}console.log(" Pre-model prediction_argmax shape : ",_.shape);const P=((performance.now()-g)/1e3).toFixed(4);xe(R[I]),console.log(" Pre-model find array max ");const z=yield _.max().dataSync()[0];T<z&&(T=z);const H=T+1;console.log("Pre-model numSegClasses",H),Yy(a,F,H);let G=yield _.reshape([t,s,o]);xe(_),d&&(console.log("Pre-model outLabelVolume transposed"),G=G.transpose());const Z=performance.now();console.log("Generating pre-model output");let J;try{const j=yield Cs(G);J=yield _H(j,t,s,o,i,l,c,u,!1),yield xe(G),console.log(" Phase-1 num of tensors after generateBrainMask: ",ci().numTensors)}catch(j){Ke().endScope(),Ke().disposeVariables();const Y="Failed while generating pre-model output due to limited browser memory available";return Be(Y,-1,Y),a.Inference_t=P,Qi(a,j,"Pre-model failed while generating output"),a.Inference_t=P,Be("",-1,"",a),0}const Q=((performance.now()-Z)/1e3).toFixed(4);if(console.log("Pre-model processing the whole brain volume in tfjs tooks for multi-class output mask : ",((performance.now()-g)/1e3).toFixed(4)+"  Seconds"),Zy(a,P,Q),Be("",-1,"",a),J==null){const j="slice_3d_mask failed ...";return Be(j,-1,j),0}else{if(console.log("--- pre-model done ---"),r)return yield Dc(l,i,n,e,J,a,Fc,Be,u),0;Be("",-1,"inferenceSubVolumes() is not dead code?")}}I++}}catch(g){Be(g.message,-1,g.message),console.log('If webgl context is lost, try to restore webgl context by visit the link <a href="https://support.biodigital.com/hc/en-us/articles/218322977-How-to-turn-on-WebGL-in-my-browser">here</a>')}}else console.log("--- No pre-model is selected ---"),console.log("------ Run voxel cropping ------"),r?yield Dc(l,i,n,e,null,a,Fc,Be,u):Be("",-1,"inferenceSubVolumes() is not dead code?")})}function GH(n=!0){return X(this,null,function*(){Kw("webgl"),yield qw(),U().set("DEBUG",!1),U().set("WEBGL_FORCE_F16_TEXTURES",n),U().set("WEBGL_DELETE_TEXTURE_THRESHOLD",-1),U().set("WEBGL_FLUSH_THRESHOLD",1),yield jw(),console.log("tf env() flags :",U().flags),console.log("tf env() features :",U().features),console.log("tf env total features: ",Object.keys(U().features).length),console.log("tf backend: ",Gu())})}function HH(n,e,t,s){return X(this,null,function*(){const o=e.enableSeqConv?gp.WEBGL_SEQUENTIAL:gp.WEBGL_WEBWORKER,r=BH(e,o);Be("Segmentation started",0);const i=n.batchSize,a=n.numOfChan;if(isNaN(i)||i!==1){const $="The batch Size for input shape must be 1";return Be($,-1,$),0}if(isNaN(a)||a!==1){const $="The number of channels for input shape must be 1";return Be($,-1,$),0}Ke().startScope(),console.log("Batch size: ",i),console.log("Num of Channels: ",a);const l=yield Ky(n.rootURL+e.path),c=!e.forceFP32;yield GH(c);try{const $=U();console.log(`[fp16 check] backend=${Gu()} | requested useF16=${c} (modelEntry.forceFP32=${!!e.forceFP32}) | WEBGL_FORCE_F16_TEXTURES=${$.getBool("WEBGL_FORCE_F16_TEXTURES")} | WEBGL_RENDER_FLOAT32_ENABLED=${$.getBool("WEBGL_RENDER_FLOAT32_ENABLED")} | WEBGL_RENDER_FLOAT32_CAPABLE=${$.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")}`)}catch($){console.warn("[fp16 check] could not read WebGL flags",$)}r.TF_Backend=Gu();const u=l;yield VH(r,u,u.layers[0].batchInputShape,yield Ac(u),qy,Hy);let h=[];if(h=u.layers[0].batchInputShape,console.log(" Model batch input shape : ",h),h.length!==5){const $="The model input shape must be 5D";return Be($,-1,$),0}let d,p,f;const m=t.dims[1],g=t.dims[2],x=t.dims[3];if(yield Ac(u)){if(console.log("Model Channel Last"),isNaN(h[4])||h[4]!==1){const $="The number of channels for input shape must be 1";return Be($,-1,$),0}d=h[1],p=h[2],f=h[3]}else{if(console.log("Model Channel First"),isNaN(h[1])||h[1]!==1){const $="The number of channels for input shape must be 1";return Be($,-1,$),0}d=h[2],p=h[3],f=h[4]}let w;d===256&&p===256&&f===256?w=!0:w=!1,r.isModelFullVol=w;let y=yield OH(x,t,s);e.enableTranspose;const C=e.enableCrop;w&&(C?yield UH(l,y,x,g,m,w,e,r,n,t,s):(console.log("Cropping Disabled"),e.enableSeqConv?yield Dc(n,e,l,y,null,r,Fc,Be,s):yield Dc(n,e,l,y,null,r,Fc,Be,s))),Ke().endScope()})}self.addEventListener("message",function(n){HH(n.data.opts,n.data.modelEntry,n.data.niftiHeader,n.data.niftiImage)},!1)})();
