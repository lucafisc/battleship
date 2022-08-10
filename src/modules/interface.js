import ship from "../img/ship.png";
import refreshSrc from "../img/refresh.png";
import checkSrc from "../img/check.png";
import ziZagSrc from "../img/zigzag.svg";
import zigZagLogoSrc from "../img/zizag-nav.svg";

export const loadInterface = () => {
  const nav = document.querySelector("nav");
  nav.append(makeNavZigZag());
  const fleetContainers = document.querySelectorAll(".fleet-container");
  fleetContainers.forEach((container) => {
    container.prepend(makeZigZag());
    container.append(makeZigZag());
  });
};
function makeNavZigZag() {
  const zigZag = document.createElement("img");
  zigZag.src = zigZagLogoSrc;
  zigZag.classList.add("nav-zigzag");
  return zigZag;
}

function makeZigZag() {
  const zigZag = document.createElement("img");
  zigZag.src = ziZagSrc;
  zigZag.classList.add("zigzag");
  return zigZag;
}
