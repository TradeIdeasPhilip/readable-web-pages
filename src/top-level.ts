export {}

import { getById} from "phil-lib/client-misc";
import { FIGURE_SPACE } from "phil-lib/misc";

const columnWidthInput = getById("columnWidthInput", HTMLInputElement);
const columnWidthDiv = getById("columnWidthDiv", HTMLDivElement);
const columnSizerDiv = getById("column-sizer",  HTMLDivElement);

function updateColumnWidth() {
  const requestedWidth = columnWidthInput.value + "em";
  columnWidthDiv.innerText = FIGURE_SPACE + requestedWidth;
  columnSizerDiv.style.width = requestedWidth;
}

columnWidthInput.addEventListener("input", () => updateColumnWidth());

updateColumnWidth();