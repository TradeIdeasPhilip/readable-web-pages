import "./continuous-font-weight.css";

for (let fontWeight = 200; fontWeight <= 900; fontWeight += 50) {
  const div = document.createElement("div");
  const realWeight = (fontWeight || 1).toString();
  div.style.fontWeight = realWeight;
  div.style.fontSize = "50%";
  div.innerText = `* \\-/| div.style.fontWeight = ${realWeight}`;
  document.body.appendChild(div);
}
