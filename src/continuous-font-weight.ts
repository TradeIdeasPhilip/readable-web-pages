import { getById } from "phil-lib/client-misc";
import "./continuous-font-weight.css";
import { makeLinear } from "phil-lib/misc";

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

{
  const randomGradientDiv = getById("randomGradient", HTMLDivElement);
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
    console.log({
      rowNumber,
      idealWeight,
      roomToChange,
      max: idealWeight + roomToChange,
      min: idealWeight - roomToChange,
    });
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
