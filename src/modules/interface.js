import ship from "../img/ship.png";

export const loadInterface = () => {
  let navBar = document.querySelector(".nav");
  const logo = document.createElement("img");
  logo.classList.add("logo");
  logo.src = ship;
  navBar.prepend(logo);
};
