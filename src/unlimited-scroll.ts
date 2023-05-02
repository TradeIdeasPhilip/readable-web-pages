export {};

import { getById } from "phil-lib/client-misc";
import "./unlimited-scroll.css";

/**
 * Place the table of contents and the buttons in this control.
 * This control does __not__ have its own scrollbar.
 * It will be inside the same scrolling control as the main body.
 */
const tocInternalDiv = getById("toc-internal", HTMLDivElement);

/**
 * This is the control that contains the main body, and sometimes the table of contents.
 * This is the top level part that includes all the scrolling options.
 */
const mainDiv = getById("main", HTMLDivElement);

/**
 * This control handles the scrolling for the independent version of the the table of contents, `tocIndependentBody`.
 */
const tocIndependentDiv = getById("toc-independent", HTMLDivElement);

/**
 * Place the table of contents and the buttons in this control.
 * This control will be inside `tocIndependentDiv`, which handles the scrolling.
 */
const tocIndependentBody = getById("toc-independent-body", HTMLDivElement);

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
       * I think "name" was the name of an attribute of an anchor in html 4, but now you use the id attribute instead.
       *
       * This will be the value of the fragment, the part of the url found after the #.
       */
      let anchorId = element.dataset.name;
      if (!anchorId) {
        anchorId = tocName.replaceAll(/ /g, "_");
        if (isSection) {
          // Section names repeat.  So prefix the name with the name of the most recent article.
          // This will produce a name like "Article_II_Section_1"
          anchorId = hashPrefix + "_" + anchorId;
        } else {
          // Save this name in case.  hasPrefix will have a value like "Article_II".
          hashPrefix = anchorId;
        }
      }
      /**
       * Something like "#Article_II_Section_1".
       */
      const href = "#" + anchorId;
      for (const container of [tocInternalDiv, tocIndependentBody]) {
        /**
         * This is the anchor element we are creating and adding to the table of contents.
         */
        const tocA = document.createElement("a");
        tocA.innerText = tocName;
        tocA.classList.add(tocClass);
        tocA.href = href;
        container.appendChild(tocA);
        const destinationA = document.createElement("a");
        destinationA.id = anchorId;
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
  }
);

function updateTocSelection() {
  const hash = location.hash;
  [tocInternalDiv, tocIndependentBody].forEach((container) => {
    const shouldScrollToc = container == tocIndependentBody;
    Array.from(container.querySelectorAll("a")).forEach((anchor) => {
      // Note:  anchor.href returns a string with an absolute url.
      // getAttribute() returns the original value we stored into that field, which will start with a #.
      const isSelected = anchor.getAttribute("href") == hash;
      const action = isSelected ? "add" : "remove";
      anchor.classList[action]("toc-selected");
      if (isSelected && shouldScrollToc) {
        anchor.scrollIntoView();
      }
    });
  });
}

window.addEventListener("hashchange", () => updateTocSelection());

updateTocSelection();

let fontSize = 0;

function findButtons(id: string): HTMLButtonElement[] {
  const result: HTMLButtonElement[] = [];
  document
    .querySelectorAll("button[data-phil-button-action]")
    .forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) {
        // The selector should not allow this.  But TypeScript doesn't know that,
        // so I'm adding test for it.
        throw new Error("wtf");
      }
      // I could have done this test as part of the CSS selector, but then
      // I'd have to think about escaping special characters!  This way is
      // just easier.
      if (button.dataset["philButtonAction"] === id) {
        result.push(button);
      }
    });
  if (result.length != 2) {
    // The intent is to have one in each copy of the table of contents.
    console.warn("expecting 2 buttons", id, result);
  }
  return result;
}

const defaultFontSizeButtons = findButtons("defaultFont");

function setFontSize() {
  const percent = Math.pow(1.15, fontSize) * 100;
  const size = percent + "%";
  document.body.style.fontSize = size;
  const disable = fontSize == 0;
  defaultFontSizeButtons.forEach((button) => (button.disabled = disable));
}
setFontSize();

defaultFontSizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    fontSize = 0;
    setFontSize();
  });
});

findButtons("biggerFont").forEach((button) => {
  button.addEventListener("click", () => {
    fontSize++;
    setFontSize();
  });
});

findButtons("smallerFont").forEach((button) => {
  button.addEventListener("click", () => {
    fontSize--;
    setFontSize();
  });
});

const verticalScrollButtons = findButtons("verticalScroll");
const horizontalScrollButtons = findButtons("horizontalScroll");

/**
 * The control to add scrollbars to.  This should be a `<div>` that contains
 * another `<div>` that contains a third `<div>`.  The innermost `<div>` has whatever you want to display in the scroller.
 * The other two `<div>`'s each have exactly one child.
 *
 * This will eventually be an input to setScroll()
 */
const scrollerTop = getById("main", HTMLDivElement);

function isValidScrollType(
  input: string | undefined
): input is "vertical" | "horizontal" {
  return input == "vertical" || input == "horizontal";
}

/**
 * Change the scroll type of the control.
 * @param type Which scrollbar to add.
 * The default will be some reasonable value.  Perhaps it will be the last value
 * that the user selected, or something like that.
 */
function setScrollType(type?: "vertical" | "horizontal") {
  if (!isValidScrollType(type)) {
    const current = scrollerTop.dataset["philScrollType"];
    if (isValidScrollType(current)) {
      type = current;
    } else {
      type = "vertical";
    }
  }
  scrollerTop.dataset["philScrollType"] = type;
  verticalScrollButtons.forEach((button) => {
    button.disabled = type == "vertical";
  });
  horizontalScrollButtons.forEach((button) => {
    button.disabled = type == "horizontal";
  });
}

verticalScrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setScrollType("vertical");
  });
});

horizontalScrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setScrollType("horizontal");
  });
});

// Ensure that we are in decent shape.
// The html file currently has a value set for the scroll type,
// and currently setScrollType() with no arguments will use that
// if it is valid.
setScrollType();

/**
 * Make the table of contents scroll with the main body.
 */
function chooseOneScrollBar() {
  tocInternalDiv.style.display = "";
  tocIndependentDiv.style.display = "none";
}

/**
 * Make the table of contents scroll independently of the main body.
 */
function chooseTwoScrollBars() {
  tocInternalDiv.style.display = "none";
  tocIndependentDiv.style.display = "";
}

getById("oneScrollBar", HTMLButtonElement).addEventListener("click", () => {
  chooseOneScrollBar();
});

getById("twoScrollBars", HTMLButtonElement).addEventListener("click", () => {
  chooseTwoScrollBars();
});

// set a default, so we don't see both copies of the table of contents!
// Ideally this should change with the size of the document.
// In some cases the window is so narrow we don't have room for a separate TOC, so we always use the one scroll bar option.
// In other cases there is room and we let the user choose.
chooseOneScrollBar();
