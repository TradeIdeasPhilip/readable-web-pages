import { getById } from "phil-lib/client-misc";
import "./continuous-font-weight.css";
import { initializedArray, makeBoundedLinear, makeLinear } from "phil-lib/misc";

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
  function startAnimation() {
    requestAnimationFrame((ms) => {
      startAnimation();
      drawAntiAliasing(
        Math.sin(ms / 1000) / 2 + 0.5,
        Math.cos(ms / 1000) / 2 + 0.5
      );
    });
  }
  startAnimation();
}
