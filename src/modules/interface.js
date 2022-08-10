import ship from "../img/ship.png";
import refreshSrc from "../img/refresh.png";
import checkSrc from "../img/check.png";
import ziZagSrc from "../img/zigzag.svg";

export const loadInterface = () => {
  const fleetContainers = document.querySelectorAll(".fleet-container");
  fleetContainers.forEach((container) => {
    container.prepend(makeZigZag());
    container.append(makeZigZag());
  });
};
function makeZigZag() {
  const zigZag = document.createElement("img");
  zigZag.src = ziZagSrc;
  zigZag.classList.add("zigzag");
  return zigZag;
}
