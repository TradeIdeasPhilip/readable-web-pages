import"./modulepreload-polyfill-3cfb730f.js";import{g as i}from"./client-misc-6b99d9da.js";const f=i("toc",HTMLDivElement),p=i("main",HTMLDivElement),u=location.hash;let d="";Array.from(p.querySelectorAll(".section, .article, .heading")).forEach(e=>{if(!(e instanceof HTMLElement))console.warn("unexpected",e);else{const t=e.innerText.replaceAll(/\./g,""),c=e.classList.contains("section"),a=c?"toc-2":"toc-1",s=document.createElement("a");s.innerText=t,s.classList.add(a);let n=e.dataset.name;n||(n=t.replaceAll(/ /g,"_"),c?n=d+"_"+n:d=n);const l="#"+n;s.href=l,f.appendChild(s);const o=document.createElement("a");o.id=n,o.href=l,o.className="self-pointer",e.parentElement.insertBefore(o,e),o.appendChild(e),l==u&&o.scrollIntoView()}});const E=!1;function h(){const e=location.hash;Array.from(f.querySelectorAll("a")).forEach(t=>{const c=t.getAttribute("href")==e,a=c?"add":"remove";t.classList[a]("toc-selected"),c&&E&&t.scrollIntoView()})}window.addEventListener("hashchange",()=>h());h();let r=0;function m(){const t=Math.pow(1.15,r)*100+"%";document.body.style.fontSize=t}i("biggerFont",HTMLButtonElement).addEventListener("click",()=>{r++,m()});i("smallerFont",HTMLButtonElement).addEventListener("click",()=>{r--,m()});