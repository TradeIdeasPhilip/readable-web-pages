var a={},i={};Object.defineProperty(i,"__esModule",{value:!0});i.permutations=i.polarToRectangular=R=i.makeBoundedLinear=P=i.makeLinear=i.sum=i.countMap=N=i.initializedArray=i.count=i.zip=b=i.FIGURE_SPACE=i.NON_BREAKING_SPACE=i.dateIsValid=i.MIN_DATE=i.MAX_DATE=i.makePromise=i.filterMap=i.pick=i.pickAny=i.csvStringToArray=i.parseTimeT=i.parseIntX=i.parseFloatX=i.getAttribute=i.followPath=i.parseXml=i.testXml=i.sleep=g=i.assertClass=void 0;function h(e,n,t="Assertion Failed."){const r=o=>{throw new Error(`${t}  Expected type:  ${n.name}.  Found type:  ${o}.`)};if(e===null)r("null");else if(typeof e!="object")r(typeof e);else if(!(e instanceof n))r(e.constructor.name);else return e;throw new Error("wtf")}var g=i.assertClass=h;function A(e){return new Promise(n=>setTimeout(n,e))}i.sleep=A;function l(e){const t=new DOMParser().parseFromString(e,"application/xml");for(const r of Array.from(t.querySelectorAll("parsererror")))if(r instanceof HTMLElement)return{error:r};return{parsed:t}}i.testXml=l;function v(e){if(e!==void 0)return l(e)?.parsed?.documentElement}i.parseXml=v;function u(e,...n){for(const t of n){if(e===void 0)return;if(typeof t=="number")e=e.children[t];else{const r=e.getElementsByTagName(t);if(r.length!=1)return;e=r[0]}}return e}i.followPath=u;function w(e,n,...t){if(n=u(n,...t),n!==void 0&&n.hasAttribute(e))return n.getAttribute(e)??void 0}i.getAttribute=w;function c(e){if(e==null)return;const n=parseFloat(e);if(isFinite(n))return n}i.parseFloatX=c;function d(e){const n=c(e);if(n!==void 0)return n>Number.MAX_SAFE_INTEGER||n<Number.MIN_SAFE_INTEGER||n!=Math.floor(n)?void 0:n}i.parseIntX=d;function M(e){if(typeof e=="string"&&(e=d(e)),e!=null&&!(e<=0))return new Date(e*1e3)}i.parseTimeT=M;const I=e=>{const n=/(,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^,\r\n]*))/gi,t=[[]];let r;for(;r=n.exec(e);)r[1].length&&r[1]!==","&&t.push([]),t[t.length-1].push(r[2]!==void 0?r[2].replace(/""/g,'"'):r[3]);return t};i.csvStringToArray=I;function T(e){const n=e.values().next();if(!n.done)return n.value}i.pickAny=T;function k(e){return e[Math.random()*e.length|0]}i.pick=k;function _(e,n){const t=[];return e.forEach((r,o)=>{const s=n(r,o);s!==void 0&&t.push(s)}),t}i.filterMap=_;function y(){let e,n;return{promise:new Promise((r,o)=>{e=r,n=o}),resolve:e,reject:n}}i.makePromise=y;i.MAX_DATE=new Date(864e13);i.MIN_DATE=new Date(-864e13);function C(e){return isFinite(e.getTime())}i.dateIsValid=C;i.NON_BREAKING_SPACE=" ";var b=i.FIGURE_SPACE=" ";function*F(...e){const n=e.map(t=>t[Symbol.iterator]());for(;;){const t=n.map(r=>r.next());if(t.some(({done:r})=>r))break;yield t.map(({value:r})=>r)}}i.zip=F;function*B(e=0,n=1/0,t=1){for(let r=e;r<n;r+=t)yield r}i.count=B;function f(e,n){const t=[];for(let r=0;r<e;r++)t.push(n(r));return t}var N=i.initializedArray=f;i.countMap=f;function S(e){return e.reduce((n,t)=>n+t,0)}i.sum=S;function L(e,n,t,r){const o=(r-n)/(t-e);return function(s){return(s-e)*o+n}}var P=i.makeLinear=L;function X(e,n,t,r){t<e&&([e,n,t,r]=[t,r,e,n]);const o=(r-n)/(t-e);return function(s){return s<=e?n:s>=t?r:(s-e)*o+n}}var R=i.makeBoundedLinear=X;function D(e,n){return{x:Math.sin(n)*e,y:Math.cos(n)*e}}i.polarToRectangular=D;function*p(e,n=[]){if(e.length==0)yield n;else for(let t=0;t<e.length;t++){const r=e[t],o=[...n,r],s=[...e.slice(0,t),...e.slice(t+1)];yield*p(s,o)}}i.permutations=p;Object.defineProperty(a,"__esModule",{value:!0});a.download=a.createElementFromHTML=a.getHashInfo=a.getAudioBalanceControl=a.getBlobFromCanvas=a.loadDateTimeLocal=z=a.getById=void 0;const m=i;function H(e,n){const t=document.getElementById(e);if(!t)throw new Error("Could not find element with id "+e+".  Expected type:  "+n.name);if(t instanceof n)return t;throw new Error("Element with id "+e+" has type "+t.constructor.name+".  Expected type:  "+n.name)}var z=a.getById=H;function G(e,n,t="milliseconds"){let r;switch(t){case"minutes":{r=n.getSeconds()*1e3+n.getMilliseconds();break}case"seconds":{r=n.getMilliseconds();break}case"milliseconds":{r=0;break}default:throw new Error("wtf")}e.valueAsNumber=+n-n.getTimezoneOffset()*6e4-r}a.loadDateTimeLocal=G;function j(e){const{reject:n,resolve:t,promise:r}=(0,m.makePromise)();return e.toBlob(o=>{o?t(o):n(new Error("blob is null!"))}),r}a.getBlobFromCanvas=j;function O(e){const n=new AudioContext,t=n.createMediaElementSource(e),r=new StereoPannerNode(n,{pan:0});return t.connect(r).connect(n.destination),o=>{r.pan.value=o}}a.getAudioBalanceControl=O;function U(){const e=new Map;return/^#?(.*)$/.exec(location.hash.replace("+","%20"))[1].split("&").forEach(r=>{const o=r.split("=",2);if(o.length==2){const s=decodeURIComponent(o[0]),E=decodeURIComponent(o[1]);e.set(s,E)}}),e}a.getHashInfo=U;function x(e,n){var t=document.createElement("div");return t.innerHTML=e.trim(),(0,m.assertClass)(t.firstChild,n,"createElementFromHTML:")}a.createElementFromHTML=x;function $(e,n){var t=document.createElement("a");if(t.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(n)),t.setAttribute("download",e),document.createEvent){var r=document.createEvent("MouseEvents");r.initEvent("click",!0,!0),t.dispatchEvent(r)}else t.click()}a.download=$;export{b as F,g as a,P as b,z as g,N as i,R as m};
