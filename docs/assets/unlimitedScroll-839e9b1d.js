import"./modulepreload-polyfill-3cfb730f.js";import{g as n}from"./client-misc-6b99d9da.js";const E=n("toc",HTMLDivElement),p=n("main",HTMLDivElement),z=location.hash;let h="";Array.from(p.querySelectorAll(".section, .article, .heading")).forEach(t=>{if(!(t instanceof HTMLElement))console.warn("unexpected",t);else{const e=t.innerText.replaceAll(/\./g,""),c=t.classList.contains("section"),r=c?"toc-2":"toc-1",s=document.createElement("a");s.innerText=e,s.classList.add(r);let o=t.dataset.name;o||(o=e.replaceAll(/ /g,"_"),c?o=h+"_"+o:h=o);const d="#"+o;s.href=d,E.appendChild(s);const l=document.createElement("a");l.id=o,l.href=d,l.className="self-pointer",t.parentElement.insertBefore(l,t),l.appendChild(t),d==z&&l.scrollIntoView()}});const B=!1;function S(){const t=location.hash;Array.from(E.querySelectorAll("a")).forEach(e=>{const c=e.getAttribute("href")==t,r=c?"add":"remove";e.classList[r]("toc-selected"),c&&B&&e.scrollIntoView()})}window.addEventListener("hashchange",()=>S());S();let i=0;const v=n("defaultFont",HTMLButtonElement);function a(){const e=Math.pow(1.15,i)*100+"%";document.body.style.fontSize=e,v.disabled=i==0}a();v.addEventListener("click",()=>{i=0,a()});n("biggerFont",HTMLButtonElement).addEventListener("click",()=>{i++,a()});n("smallerFont",HTMLButtonElement).addEventListener("click",()=>{i--,a()});const L=n("verticalScroll",HTMLButtonElement),T=n("horizontalScroll",HTMLButtonElement),u=n("main",HTMLDivElement);function m(t){return t=="vertical"||t=="horizontal"}function f(t){if(!m(t)){const e=u.dataset.philScrollType;m(e)?t=e:t="vertical"}u.dataset.philScrollType=t,L.disabled=t=="vertical",T.disabled=t=="horizontal"}L.addEventListener("click",()=>{f("vertical")});T.addEventListener("click",()=>{f("horizontal")});f();