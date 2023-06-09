import { getById } from "phil-lib/client-misc";
import "./continuous-font-weight.css";
import {
  assertClass,
  initializedArray,
  makeBoundedLinear,
  makeLinear,
} from "phil-lib/misc";

{
  // Static samples.  No animation.
  const insertSamplesHere = getById("insertSamplesHere", HTMLDivElement);
  for (let fontWeight = 200; fontWeight <= 900; fontWeight += 50) {
    const div = document.createElement("div");
    const realWeight = (fontWeight || 1).toString();
    div.style.fontWeight = realWeight;
    div.innerText = `font-weight: ${realWeight}; * \\-/| The quick brown fox jumps over the lazy dog!`;
    insertSamplesHere.appendChild(div);
  }
}

function drawGradient() {
  const randomGradientDiv = getById("randomGradient", HTMLDivElement);
  randomGradientDiv.innerText = "";
  const width = 70;
  const height = 30;
  /**
   * This comes from the font.  TODO make this a global variable.
   */
  const minWeight = 200;
  /**
   * This comes from the font.  TODO make this a global variable.
   */
  const maxWeight = 900;
  /**
   * How many lines to skip at the top and bottom.
   * If this is 0, the rows near the top and bottom won't have room to do anything interesting.
   */
  const padding = 7;
  const rowToWeight = makeLinear(
    0 - padding,
    minWeight,
    height - 1 + padding,
    maxWeight
  );
  for (let rowNumber = 0; rowNumber < height; rowNumber++) {
    const div = document.createElement("div");
    randomGradientDiv.appendChild(div);
    const idealWeight = rowToWeight(rowNumber);
    const roomToChange = Math.min(
      idealWeight - minWeight,
      maxWeight - idealWeight
    );
    /*
    console.log({
      rowNumber,
      idealWeight,
      roomToChange,
      max: idealWeight + roomToChange,
      min: idealWeight - roomToChange,
    });
    */
    /**
     * Pick a font-weight.  The input is the _ideal_ font weight.
     * This adds some randomness.  This returns a random value with
     * an average matching the input.  But the value will never be out of range.
     */
    const randomToWeight = makeLinear(
      0,
      idealWeight - roomToChange,
      1,
      idealWeight + roomToChange
    );
    for (let columnNumber = 0; columnNumber < width; columnNumber++) {
      const span = document.createElement("span");
      div.appendChild(span);
      span.innerText = String.fromCharCode((65 + Math.random() * 26) | 0);
      span.style.fontWeight = randomToWeight(Math.random()).toString();
    }
  }
}

drawGradient();

getById("redrawGradient", HTMLButtonElement).addEventListener("click", () =>
  drawGradient()
);

/**
 * This section draws a couple of animated examples which use the font-weight to render a
 * grayscale image.  I'm using anti-aliasing as a simple way to create a series of images.
 */
{
  /** This is the animation that the user selected with a radio button. */
  let animationName = "";
  document.querySelectorAll('input[name="antiAliasing"]').forEach((element) => {
    const input = assertClass(element, HTMLInputElement);
    // Change the animationName whenever a user clicks a radio button.
    input.addEventListener("click", () => {
      animationName = input.id;
    });
    // And read the initial value from the HTML file to initialize animationName.
    if (input.checked) {
      animationName = input.id;
    }
  });

  const antiAliasingDiv = getById("antiAliasing", HTMLDivElement);
  /** How many X's across. */
  const width = 70;
  /** How many X's high. */
  const height = 30;
  /**
   * The first index is column number.  The second index is the row number.
   */
  const cells = initializedArray(width, () => [] as HTMLSpanElement[]);
  for (let rowNumber = 0; rowNumber < height; rowNumber++) {
    const div = document.createElement("div");
    antiAliasingDiv.appendChild(div);
    for (let columnNumber = 0; columnNumber < width; columnNumber++) {
      const span = document.createElement("span");
      div.appendChild(span);
      cells[columnNumber].push(span);
      span.innerText = "X";
    }
  }
  /**
   * Internally we use a value of 0 for white and 1 for black.
   * The Source Code Pro font supports values from 200 to 900.
   * (The standard allows for values from 1 to 1,000, but this font will not draw anything interesting at those extremes.)
   * This function converts from the internal value to the font-weight value.
   */
  const getFontWeight = makeBoundedLinear(0, 200, 1, 900);
  /**
   * Draw a single frame of the "Wave" demo.
   * @param leftHeight Where the line hits the left wall.  The range [0, 1] covers the entire visible area, however you can set this higher or lower.
   * @param rightHeight Where the line hits the right wall.  The range [0, 1] covers the entire visible area, however you can set this higher or lower.
   */
  function drawWaveSample(leftHeight: number, rightHeight: number) {
    leftHeight *= height;
    rightHeight *= height;
    const getColumnHeight = makeLinear(0, leftHeight, width - 1, rightHeight);
    for (let columnNumber = 0; columnNumber < width; columnNumber++) {
      const columnHeight = getColumnHeight(columnNumber);
      //console.log({columnNumber, columnHeight})
      for (let rowNumber = 0; rowNumber < height; rowNumber++) {
        cells[columnNumber][rowNumber].style.fontWeight = getFontWeight(
          rowNumber - columnHeight + 1
        ).toString();
      }
    }
  }
  (window as any).drawAntiAliasing = drawWaveSample;
  const antiAliasingMainCanvas = getById(
    "antiAliasingMainCanvas",
    HTMLCanvasElement
  );
  const antiAliasingDuplicateCanvas = getById(
    "antiAliasingDuplicateCanvas",
    HTMLCanvasElement
  );
  antiAliasingMainCanvas.getContext("2d")!.imageSmoothingEnabled = false;
  antiAliasingDuplicateCanvas.getContext("2d")!.imageSmoothingEnabled = false;
  /**
   * Draw a circle in the center of the sample.
   * @param radius 0 for nothing.  1 for the largest circle that will fit.
   * Fractions are allowed.  Larger values are allowed, but part of the circle
   * will be cut off.
   */
  function drawCircle(radius: number) {
    const centerX = width / 2;
    const centerY = height / 2;
    /**
     * antiAliasingDiv.offsetWidth doesn't always give me what I want.  If the window is too
     * small or the font zoom is too big, I only see the width of the part that's visible on
     * the screen.
     */
    const lastSpanOnTheRight = assertClass(
      antiAliasingDiv.firstElementChild!.lastElementChild!,
      HTMLSpanElement
    );
    const containerWidthInPixels =
      lastSpanOnTheRight.offsetLeft + lastSpanOnTheRight.offsetWidth;
    const containerHeightInPixels = antiAliasingDiv.offsetHeight;
    /**
     * The input radius should always be in a range from 0 to 1.  1 means as big as the container.
     *  If the container is not a square I'm (somewhat arbitrarily) picking the smaller of the two
     * dimensions.  TODO this is currently unused.  For simplicity I'm drawing an ellipse as big as
     * the container in both dimensions.
     */
    const maxRadiusInPixels =
      Math.min(containerHeightInPixels, containerWidthInPixels) / 2;
    maxRadiusInPixels;

    const characterWidthInPixels = containerWidthInPixels / width;
    const characterHeightInPixels = containerHeightInPixels / height;
    const canvasScaleFactor = 6;
    antiAliasingMainCanvas.width = width;
    antiAliasingMainCanvas.height = height;
    antiAliasingMainCanvas.style.width = width * canvasScaleFactor + "px";
    antiAliasingMainCanvas.style.height = height * canvasScaleFactor + "px";
    antiAliasingDuplicateCanvas.width = width;
    antiAliasingDuplicateCanvas.height = height;
    antiAliasingDuplicateCanvas.style.height =
      height * canvasScaleFactor + "px";
    antiAliasingDuplicateCanvas.style.width =
      ((width * canvasScaleFactor) / characterHeightInPixels) *
        characterWidthInPixels +
      "px";

    const mainContext = antiAliasingMainCanvas.getContext("2d")!;
    mainContext.fillStyle = "#ffffff";
    mainContext.fillRect(0, 0, width, height);
    mainContext.beginPath();
    mainContext.ellipse(
      centerX,
      centerY,
      (width * radius) / 2,
      (height * radius) / 2,
      0,
      0,
      2 * Math.PI
    );
    mainContext.fillStyle = "#000000";
    mainContext.fill();
    antiAliasingDuplicateCanvas
      .getContext("2d")!
      .drawImage(antiAliasingMainCanvas, 0, 0);
    // I get the following warning at the next line:
    // continuous-font-weight.ts:222 Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true. See: https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
    const pixelValues = mainContext.getImageData(0, 0, width, height).data;
    let pixelValueIndex = 0;
    const pixelValueToFontWeight = makeLinear(0, 900, 255, 200);
    for (const row of Array.from(antiAliasingDiv.children)) {
      for (const cell of Array.from(row.children)) {
        (cell as HTMLElement).style.fontWeight = pixelValueToFontWeight(
          pixelValues[pixelValueIndex]
        ).toString();
        pixelValueIndex += 4;
      }
    }
    /*
    //const characterAspectRatio = characterWidth / characterHeight;
    for (let columnNumber = 0; columnNumber < width; columnNumber++) {
      for (let rowNumber = 0; rowNumber < height; rowNumber++) {
        const distanceFromCenter = Math.hypot(
          (columnNumber - centerX) * characterWidthInPixels,
          (rowNumber - centerY) * characterHeightInPixels
        );
        const span = cells[columnNumber][rowNumber];
        const distanceOutsideInPixels =
          radius * maxRadiusInPixels - distanceFromCenter;
        span.style.fontWeight = getFontWeight(
          distanceOutsideInPixels / characterSizeInPixels
        ).toString();
      }
    }
    */
  }
  (window as any).drawCircle = drawCircle;
  function startAnimation() {
    requestAnimationFrame((ms) => {
      startAnimation();
      switch (animationName) {
        case "Waves": {
          drawWaveSample(
            Math.sin(ms / 1000) / 2 + 0.5,
            Math.cos(ms / 1000) / 2 + 0.5
          );
          break;
        }
        case "Circles": {
          const numberOfCycles = ms / 3000;
          const numberOfCompleteCycles = Math.floor(numberOfCycles);
          const partOfCurrentCycle = numberOfCycles - numberOfCompleteCycles;
          if (numberOfCompleteCycles % 2) {
            // The circle is growing
            drawCircle(partOfCurrentCycle);
          } else {
            // The circle is shrinking.
            drawCircle(1 - partOfCurrentCycle);
          }
          break;
        }
      }
    });
  }
  startAnimation();
  const newTextInput = getById("newText", HTMLInputElement);
  const loadNowButton = getById("loadNow", HTMLButtonElement);
  let backgroundString = "X";
  const updateLoadNowButtonStatus = () =>
    (loadNowButton.disabled =
      newTextInput.value == backgroundString || newTextInput.value == "");
  newTextInput.addEventListener("input", updateLoadNowButtonStatus);
  loadNowButton.addEventListener("click", () => {
    backgroundString = newTextInput.value;
    updateLoadNowButtonStatus();
    /**
     * If you try to use [] or .length directly on a string,
     * some characters, like 🤠, will be split into two pieces.
     * Array.from() fixes that.
     */
    const asArray = Array.from(backgroundString);
    let stringIndex = 0;
    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        cells[column][row].innerText = asArray[stringIndex];
        stringIndex++;
        if (stringIndex == asArray.length) {
          stringIndex = 0;
        }
      }
    }
  });
  updateLoadNowButtonStatus();
}

{
  // This is the karaoke example.
  const lyricsDiv = getById("lyricsDiv", HTMLDivElement);
  // You could make the gradient smoother by doing it letter by letter instead of word by word.
  const words = lyricsDiv.innerText.split(/\s+/g);
  lyricsDiv.innerText = "";
  /**
   * One of these per word.  Index 0 is the first word.
   */
  const spans: HTMLSpanElement[] = [];
  words.forEach((word) => {
    if (word == "¶" || word == "§") {
      lyricsDiv.appendChild(document.createElement("br"));
    } else {
      lyricsDiv.append(" ");
      const span = document.createElement("span");
      span.innerText = word;
      spans.push(span);
      lyricsDiv.appendChild(span);
    }
  });
  (window as any).spans = spans;
  const needsCleanup: HTMLSpanElement[] = [];
  const lyricsSlider = getById("lyricsSlider", HTMLInputElement);
  lyricsSlider.min = "0";
  lyricsSlider.value = lyricsSlider.max = (spans.length - 1).toString();
  const numberOfWordsToHighlight = 7;
  const offsetToWeight = makeBoundedLinear(
    0,
    900,
    numberOfWordsToHighlight,
    200
  ); // TODO see note above about using constants instead of 900 and 200.
  const updateCurrent = () => {
    needsCleanup.forEach((span) => (span.style.fontWeight = ""));
    needsCleanup.length = 0;
    const selectedIndex = spans.length - +lyricsSlider.value - 1;
    for (let offset = 0; offset < numberOfWordsToHighlight; offset++) {
      const current = spans[selectedIndex + offset];
      if (!current) {
        // Past the end of the document.  This is not an error.
        break;
      }
      needsCleanup.push(current);
      current.style.fontWeight = offsetToWeight(offset).toString();
    }
  };
  lyricsSlider.addEventListener("input", updateCurrent);
  updateCurrent();
}
