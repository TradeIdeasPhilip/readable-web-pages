import { getById } from "phil-lib/client-misc";
import "./continuous-font-weight.css";
import {
  assertClass,
  initializedArray,
  makeBoundedLinear,
  makeLinear,
} from "phil-lib/misc";

{
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
  const minWeight = 200;
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

{
  let animationName = "";
  document.querySelectorAll('input[name="antiAliasing"]').forEach((element) => {
    const input = assertClass(element, HTMLInputElement);
    input.addEventListener("click", () => {
      animationName = input.id;
    });
    if (input.checked) {
      animationName = input.id;
    }
  });

  const antiAliasingDiv = getById("antiAliasing", HTMLDivElement);
  const width = 70;
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
  const getFontWeight = makeBoundedLinear(0, 200, 1, 900);
  function drawAntiAliasing(leftHeight: number, rightHeight: number) {
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
  (window as any).drawAntiAliasing = drawAntiAliasing;
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
          drawAntiAliasing(
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
            drawCircle(partOfCurrentCycle);
          } else {
            drawCircle(1 - partOfCurrentCycle);
          }
          break;
        }
      }
    });
  }
  startAnimation();
}
