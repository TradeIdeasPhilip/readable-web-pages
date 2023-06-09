export {};

import { getById } from "phil-lib/client-misc";
import "./internal-table-of-contents.css";

const tocDiv = getById("toc", HTMLDivElement);
const mainDiv = getById("main", HTMLDivElement);

/*
  I never quite got this to work.  I've done similar things in the past,
  and I copied this off stack overflow.  There's probably something specific about
  this css file or something that's breaking this.
  
  The goal is to automatically get rid of the address bar on a mobile browser.
  Normally the user can drag up, like scrolling the document up, and that will
  also remove the address bar.  If you're clever sometimes you can simulate
  that action with JavaScript so the user doesn't have to do anything.

  One promising suggestion on the web was to look into the full screen API
  https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  TODO look into that.

  For now I'm making the body 100vh tall and setting the body's scroll-y to auto.
  So the scroll bar will disappear and be disabled most of the time.  But if the
  address bar is present, then the user can scroll to get rid of it.

  It's not perfect.  Especially when mixed with other scrolling elements.
  (sometimes I have to try to grab the margin between the table of contents and
  the main panel to make the <body> scroll.)  But it should be good enough for
  now.

  A copied a lot of this code from here:
  https://codepen.io/akikoo/pen/AWXrOP?editors=1111

// DEBUG/ugly
tocDiv.append(`window.pageYOffset = ${window.pageYOffset}`);
setTimeout(() => {
  tocDiv.append(`window.pageYOffset = ${window.pageYOffset}`);
}, 1000);
setTimeout(() => {
  window.scrollTo(0, 0);
  tocDiv.append(`window.pageYOffset = ${window.pageYOffset}`);
}, 2000);
setTimeout(() => {
  window.scrollTo(0, 1);
  tocDiv.append(`window.pageYOffset = ${window.pageYOffset}`);
}, 3000);
setTimeout(() => {
  window.scrollTo(0, 0);
  tocDiv.append(`window.pageYOffset = ${window.pageYOffset}`);
}, 4000);
*/

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

let fontSize = 0;

function setFontSize() {
  const percent = Math.pow(1.15, fontSize) * 100;
  const size = percent + "%";
  document.body.style.fontSize = size;
}

getById("biggerFont", HTMLButtonElement).addEventListener("click", () => {
  fontSize++;
  setFontSize();
});

getById("smallerFont", HTMLButtonElement).addEventListener("click", () => {
  fontSize--;
  setFontSize();
});
