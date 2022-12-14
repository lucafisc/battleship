import { pubsub } from "./pubsub.js";
import { newGame } from "./game-control.js";
export const domElements = () => {
  //event listeners
  const refreshBtn = document.querySelector(".refresh");
  refreshBtn.addEventListener("mouseup", (event) => {
    newGame();
  });

  const confirmBtn = document.querySelector(".confirm");
  confirmBtn.addEventListener("mouseup", (event) => {
    pubsub.publish("game-start");
  });

  //start game
  pubsub.subscribe("game-start", () => {
    refreshBtn.classList.add("disabled");
    confirmBtn.classList.add("disabled");
  });

  //new current player
  pubsub.subscribe("new-current-player", (player) => {
    const humanBoard = document.querySelector("#human-board");
    const cpuBoard = document.querySelector("#cpu-board");
    const humanTitle = document.querySelector(".human-title");
    const cpuTitle = document.querySelector(".cpu-title");
    humanBoard.classList.remove("not-turn");
    cpuBoard.classList.remove("not-turn");
    humanTitle.classList.remove("not-turn");
    cpuTitle.classList.remove("not-turn");

    if (player === "human") {
      humanBoard.classList.add("not-turn");
      humanTitle.classList.add("not-turn");
    } else {
      cpuBoard.classList.add("not-turn");
      cpuTitle.classList.add("not-turn");
    }
  });
};
