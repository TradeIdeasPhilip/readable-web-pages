import"./modulepreload-polyfill-3cfb730f.js";var s={},o={};Object.defineProperty(o,"__esModule",{value:!0});o.permutations=o.polarToRectangular=o.makeBoundedLinear=o.makeLinear=o.sum=o.countMap=o.initializedArray=o.count=o.zip=p=o.FIGURE_SPACE=o.NON_BREAKING_SPACE=o.dateIsValid=o.MIN_DATE=o.MAX_DATE=o.makePromise=o.filterMap=o.pick=o.pickAny=o.csvStringToArray=o.parseTimeT=o.parseIntX=o.parseFloatX=o.getAttribute=o.followPath=o.parseXml=o.testXml=o.sleep=o.assertClass=void 0;function M(e,n,t="Assertion Failed."){const r=i=>{throw new Error(`${t}  Expected type:  ${n.name}.  Found type:  ${i}.`)};if(e===null)r("null");else if(typeof e!="object")r(typeof e);else if(!(e instanceof n))r(e.constructor.name);else return e;throw new Error("wtf")}o.assertClass=M;function I(e){return new Promise(n=>setTimeout(n,e))}o.sleep=I;function c(e){const t=new DOMParser().parseFromString(e,"application/xml");for(const r of Array.from(t.querySelectorAll("parsererror")))if(r instanceof HTMLElement)return{error:r};return{parsed:t}}o.testXml=c;function T(e){if(e!==void 0)return c(e)?.parsed?.documentElement}o.parseXml=T;function d(e,...n){for(const t of n){if(e===void 0)return;if(typeof t=="number")e=e.children[t];else{const r=e.getElementsByTagName(t);if(r.length!=1)return;e=r[0]}}return e}o.followPath=d;function k(e,n,...t){if(n=d(n,...t),n!==void 0&&n.hasAttribute(e))return n.getAttribute(e)??void 0}o.getAttribute=k;function f(e){if(e==null)return;const n=parseFloat(e);if(isFinite(n))return n}o.parseFloatX=f;function m(e){const n=f(e);if(n!==void 0)return n>Number.MAX_SAFE_INTEGER||n<Number.MIN_SAFE_INTEGER||n!=Math.floor(n)?void 0:n}o.parseIntX=m;function y(e){if(typeof e=="string"&&(e=m(e)),e!=null&&!(e<=0))return new Date(e*1e3)}o.parseTimeT=y;const C=e=>{const n=/(,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^,\r\n]*))/gi,t=[[]];let r;for(;r=n.exec(e);)r[1].length&&r[1]!==","&&t.push([]),t[t.length-1].push(r[2]!==void 0?r[2].replace(/""/g,'"'):r[3]);return t};o.csvStringToArray=C;function b(e){const n=e.values().next();if(!n.done)return n.value}o.pickAny=b;function B(e){return e[Math.random()*e.length|0]}o.pick=B;function L(e,n){const t=[];return e.forEach((r,i)=>{const a=n(r,i);a!==void 0&&t.push(a)}),t}o.filterMap=L;function _(){let e,n;return{promise:new Promise((r,i)=>{e=r,n=i}),resolve:e,reject:n}}o.makePromise=_;o.MAX_DATE=new Date(864e13);o.MIN_DATE=new Date(-864e13);function F(e){return isFinite(e.getTime())}o.dateIsValid=F;o.NON_BREAKING_SPACE=" ";var p=o.FIGURE_SPACE=" ";function*S(...e){const n=e.map(t=>t[Symbol.iterator]());for(;;){const t=n.map(r=>r.next());if(t.some(({done:r})=>r))break;yield t.map(({value:r})=>r)}}o.zip=S;function*N(e=0,n=1/0,t=1){for(let r=e;r<n;r+=t)yield r}o.count=N;function h(e,n){const t=[];for(let r=0;r<e;r++)t.push(n(r));return t}o.initializedArray=h;o.countMap=h;function D(e){return e.reduce((n,t)=>n+t,0)}o.sum=D;function P(e,n,t,r){const i=(r-n)/(t-e);return function(a){return(a-e)*i+n}}o.makeLinear=P;function X(e,n,t,r){t<e&&([e,n,t,r]=[t,r,e,n]);const i=(r-n)/(t-e);return function(a){return a<=e?n:a>=t?r:(a-e)*i+n}}o.makeBoundedLinear=X;function H(e,n){return{x:Math.sin(n)*e,y:Math.cos(n)*e}}o.polarToRectangular=H;function*E(e,n=[]){if(e.length==0)yield n;else for(let t=0;t<e.length;t++){const r=e[t],i=[...n,r],a=[...e.slice(0,t),...e.slice(t+1)];yield*E(a,i)}}o.permutations=E;Object.defineProperty(s,"__esModule",{value:!0});s.download=s.createElementFromHTML=s.getHashInfo=s.getAudioBalanceControl=s.getBlobFromCanvas=s.loadDateTimeLocal=l=s.getById=void 0;const g=o;function R(e,n){const t=document.getElementById(e);if(!t)throw new Error("Could not find element with id "+e+".  Expected type:  "+n.name);if(t instanceof n)return t;throw new Error("Element with id "+e+" has type "+t.constructor.name+".  Expected type:  "+n.name)}var l=s.getById=R;function z(e,n,t="milliseconds"){let r;switch(t){case"minutes":{r=n.getSeconds()*1e3+n.getMilliseconds();break}case"seconds":{r=n.getMilliseconds();break}case"milliseconds":{r=0;break}default:throw new Error("wtf")}e.valueAsNumber=+n-n.getTimezoneOffset()*6e4-r}s.loadDateTimeLocal=z;function G(e){const{reject:n,resolve:t,promise:r}=(0,g.makePromise)();return e.toBlob(i=>{i?t(i):n(new Error("blob is null!"))}),r}s.getBlobFromCanvas=G;function j(e){const n=new AudioContext,t=n.createMediaElementSource(e),r=new StereoPannerNode(n,{pan:0});return t.connect(r).connect(n.destination),i=>{r.pan.value=i}}s.getAudioBalanceControl=j;function O(){const e=new Map;return/^#?(.*)$/.exec(location.hash.replace("+","%20"))[1].split("&").forEach(r=>{const i=r.split("=",2);if(i.length==2){const a=decodeURIComponent(i[0]),A=decodeURIComponent(i[1]);e.set(a,A)}}),e}s.getHashInfo=O;function U(e,n){var t=document.createElement("div");return t.innerHTML=e.trim(),(0,g.assertClass)(t.firstChild,n,"createElementFromHTML:")}s.createElementFromHTML=U;function W(e,n){var t=document.createElement("a");if(t.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(n)),t.setAttribute("download",e),document.createEvent){var r=document.createEvent("MouseEvents");r.initEvent("click",!0,!0),t.dispatchEvent(r)}else t.click()}s.download=W;const v=l("columnWidthInput",HTMLInputElement),x=l("columnWidthDiv",HTMLDivElement),$=l("column-sizer",HTMLDivElement);function w(){const e=v.value+"em";x.innerText=p+e,$.style.width=e}v.addEventListener("input",()=>w());w();const u=l("showBorders",HTMLInputElement);u.addEventListener("input",()=>{const n=u.checked?"remove":"add";document.querySelectorAll(".can-hide-border").forEach(r=>{r.classList[n]("hide-border")})});