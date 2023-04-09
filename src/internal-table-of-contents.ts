export {};

import { getById } from "phil-lib/client-misc";
import "./internal-table-of-contents.css";

const tocDiv = getById("toc", HTMLDivElement);
const mainDiv = getById("main", HTMLDivElement);

// DEBUG/ugly
tocDiv.append(`document.body.scrollTop = ${document.body.scrollTop}`);

const initiallyRequestedHash = location.hash;
let hashPrefix = "";
Array.from(mainDiv.querySelectorAll(".section, .article, .heading")).forEach(
  (element) => {
    if (!(element instanceof HTMLElement)) {
      console.warn("unexpected", element);
    } else {
      /**
       * Get rid of the odd dots.  I left them in the body of the text.  But I removed the dots
       * before adding the name to the table of contents.
       */
      const tocName = element.innerText.replaceAll(/\./g, "");
      const isSection = element.classList.contains("section");
      const tocClass = isSection ? "toc-2" : "toc-1";
      /**
       * This is the anchor element we are creating and adding to the table of contents.
       */
      const tocA = document.createElement("a");
      tocA.innerText = tocName;
      tocA.classList.add(tocClass);
      /**
       * I think "name" was the name of an attribute of an anchor in html 4, but now you use the id attribute instead.
       * 
       * This will be the value of the fragment, the part of the url found after the #.
       */
      let name = element.dataset.name;
      if (!name) {
        name = tocName.replaceAll(/ /g, "_");
        if (isSection) {
          // Section names repeat.  So prefix the name with the name of the most recent article.
          // This will produce a name like "Article_II_Section_1"
          name = hashPrefix + "_" + name;
        } else {
          // Save this name in case.  hasPrefix will have a value like "Article_II".
          hashPrefix = name;
        }
      }
      /**
       * Something like "#Article_II_Section_1".
       */
      const href = "#" + name;
      tocA.href = href;
      tocDiv.appendChild(tocA);
      const destinationA = document.createElement("a");
      destinationA.id = name;
      destinationA.href = href;
      destinationA.className = "self-pointer";
      element.parentElement!.insertBefore(destinationA, element);
      destinationA.appendChild(element);
      if (href == initiallyRequestedHash) {
        // This is not automatic because the browser tries to scroll into view before we've created the <a>.
        // We simulate it and the user won't know the difference.
        destinationA.scrollIntoView();
      }
    }
  }
);

function updateTocSelection() {
  const hash = location.hash;
  Array.from(tocDiv.querySelectorAll("a")).forEach((anchor) => {
    // Note:  anchor.href returns a string with an absolute url.
    // getAttribute() returns the original value we stored into that field, which will start with a #.
    const isSelected = anchor.getAttribute("href") == hash;
    const action = isSelected ? "add" : "remove";
    anchor.classList[action]("toc-selected");
    if (isSelected) {
      anchor.scrollIntoView();
    }
  });
}

window.addEventListener("hashchange", () => updateTocSelection());

updateTocSelection();
