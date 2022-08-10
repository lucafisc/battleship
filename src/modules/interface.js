import ship from "../img/ship.png";
import refreshSrc from "../img/refresh.png";
import checkSrc from "../img/check.png";

export const loadInterface = () => {
  const refreshContainer = document.querySelector(".refresh-container");
  const refresh = document.createElement("img");
  refresh.classList.add("button");
  refresh.src = refreshSrc;
  refreshContainer.append(refresh);

  const confirmContainer = document.querySelector(".confirm-container");
  const check = document.createElement("img");
  check.classList.add("button");
  check.src = checkSrc;
  confirmContainer.append(check);
};
