import { pubsub } from "./pubsub.js";

export const domElements = () => {
  //event listeners
  const refreshBtn = document.querySelector(".refresh-container");
  refreshBtn.addEventListener("mouseup", (event) => {
    pubsub.publish("random-place-ships");
  });

  const confirmBtn = document.querySelector(".confirm-container");
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
    humanBoard.classList.remove("not-turn");
    cpuBoard.classList.remove("not-turn");

    if (player === "human") {
      humanBoard.classList.add("not-turn");
    } else {
      cpuBoard.classList.add("not-turn");
    }
  });
};
