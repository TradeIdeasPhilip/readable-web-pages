import"./modulepreload-polyfill-3cfb730f.js";import{g as e,F as r}from"./client-misc-6b99d9da.js";const o=e("columnWidthInput",HTMLInputElement),c=e("columnWidthDiv",HTMLDivElement),l=e("column-sizer",HTMLDivElement);function s(){const t=o.value+"em";c.innerText=r+t,l.style.width=t}o.addEventListener("input",()=>s());s();const n=e("showBorders",HTMLInputElement);n.addEventListener("input",()=>{const d=n.checked?"remove":"add";document.querySelectorAll(".can-hide-border").forEach(i=>{i.classList[d]("hide-border")})});