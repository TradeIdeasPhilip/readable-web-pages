import"./modulepreload-polyfill-3cfb730f.js";import{g as a}from"./client-misc-b2f58c4c.js";const i=a("toc",HTMLDivElement),r=a("main",HTMLDivElement);Array.from(r.querySelectorAll(".section, .article, .heading")).forEach(t=>{if(!(t instanceof HTMLElement))console.warn("unexpected",t);else{const e=t.innerText.replaceAll(/\./g,"");console.log(e);const s=t.classList.contains("section")?"toc-2":"toc-1",n=document.createElement("a");n.innerText=e,n.classList.add(s);const c=t.dataset.name??e.replaceAll(/ /g,"_");n.href="#"+c,i.appendChild(n);const o=document.createElement("a");o.id=c,t.parentElement.insertBefore(o,t),o.appendChild(t)}});
