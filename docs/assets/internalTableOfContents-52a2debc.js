import"./modulepreload-polyfill-3cfb730f.js";import{g as s}from"./client-misc-b2f58c4c.js";const r=s("toc",HTMLDivElement),l=s("main",HTMLDivElement);Array.from(l.querySelectorAll(".section, .article, .heading")).forEach(t=>{if(!(t instanceof HTMLElement))console.warn("unexpected",t);else{const c=t.innerText.replaceAll(/\./g,""),i=t.classList.contains("section")?"toc-2":"toc-1",n=document.createElement("a");n.innerText=c,n.classList.add(i);const o=t.dataset.name??c.replaceAll(/ /g,"_"),a="#"+o;n.href=a,r.appendChild(n);const e=document.createElement("a");e.id=o,e.href=a,e.className="self-pointer",t.parentElement.insertBefore(e,t),e.appendChild(t)}});
