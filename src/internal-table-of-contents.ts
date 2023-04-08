export {};

import { getById } from "phil-lib/client-misc";
import "./internal-table-of-contents.css";

const tocDiv = getById("toc", HTMLDivElement);
const mainDiv = getById("main", HTMLDivElement);

Array.from(mainDiv.querySelectorAll(".section, .article, .heading")).forEach(
  (element) => {
    if (!(element instanceof HTMLElement)) {
      console.warn("unexpected", element);
    } else {
      const tocName = element.innerText.replaceAll(/\./g, "");
      const tocClass = element.classList.contains("section")
        ? "toc-2"
        : "toc-1";
      const tocA = document.createElement("a");
      tocA.innerText = tocName;
      tocA.classList.add(tocClass);
      const name = element.dataset.name ?? tocName.replaceAll(/ /g, "_");
      const href = "#" + name;
      tocA.href = href;
      tocDiv.appendChild(tocA);
      const destinationA = document.createElement("a");
      destinationA.id = name;
      destinationA.href = href;
      destinationA.className = "self-pointer";
      element.parentElement!.insertBefore(destinationA, element);
      destinationA.appendChild(element);
    }
  }
);
