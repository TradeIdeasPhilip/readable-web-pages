import"./modulepreload-polyfill-3cfb730f.js";import{g as i}from"./client-misc-6b99d9da.js";const h=i("toc",HTMLDivElement),p=i("main",HTMLDivElement),E=location.hash;let f="";Array.from(p.querySelectorAll(".section, .article, .heading")).forEach(t=>{if(!(t instanceof HTMLElement))console.warn("unexpected",t);else{const e=t.innerText.replaceAll(/\./g,""),c=t.classList.contains("section"),r=c?"toc-2":"toc-1",a=document.createElement("a");a.innerText=e,a.classList.add(r);let n=t.dataset.name;n||(n=e.replaceAll(/ /g,"_"),c?n=f+"_"+n:f=n);const d="#"+n;a.href=d,h.appendChild(a);const o=document.createElement("a");o.id=n,o.href=d,o.className="self-pointer",t.parentElement.insertBefore(o,t),o.appendChild(t),d==E&&o.scrollIntoView()}});const L=!1;function m(){const t=location.hash;Array.from(h.querySelectorAll("a")).forEach(e=>{const c=e.getAttribute("href")==t,r=c?"add":"remove";e.classList[r]("toc-selected"),c&&L&&e.scrollIntoView()})}window.addEventListener("hashchange",()=>m());m();let s=0;const u=i("defaultFont",HTMLButtonElement);function l(){const e=Math.pow(1.15,s)*100+"%";document.body.style.fontSize=e,u.disabled=s==0}l();u.addEventListener("click",()=>{s=0,l()});i("biggerFont",HTMLButtonElement).addEventListener("click",()=>{s++,l()});i("smallerFont",HTMLButtonElement).addEventListener("click",()=>{s--,l()});
