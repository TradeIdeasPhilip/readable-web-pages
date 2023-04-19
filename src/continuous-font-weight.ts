import { getById } from "phil-lib/client-misc";
import "./continuous-font-weight.css";

const insertSamplesHere = getById("insertSamplesHere", HTMLDivElement);

for (let fontWeight = 200; fontWeight <= 900; fontWeight += 50) {
  const div = document.createElement("div");
  const realWeight = (fontWeight || 1).toString();
  div.style.fontWeight = realWeight;
  div.innerText = `font-weight: ${realWeight}; * \\-/| The quick brown fox jumps over the lazy dog!`;
  insertSamplesHere.appendChild(div);
}
