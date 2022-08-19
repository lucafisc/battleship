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

  //game over
  pubsub.subscribe("game-over", (whoseTurn) => {
    const humanBoard = document.querySelector("#human-board");
    const cpuBoard = document.querySelector("#cpu-board");
    removeChildren(humanBoard);
    removeChildren(cpuBoard);

    const message = makeGameOverMsg(whoseTurn);
    const replayBtn = makeReplayBtn();

    humanBoard.append(message);
    cpuBoard.append(replayBtn);
  });

  pubsub.subscribe("enable-btns", () => {
    const btns = document.querySelectorAll(".disabled");
    btns.forEach((btn) => {
      btn.classList.remove("disabled");
    });
  });
};

const removeChildren = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const makeGameOverMsg = (whoseTurn) => {
  const title = document.createElement("h1");
  title.classList.add("gameover-msg");
  let text;
  if (whoseTurn === "human") {
    text = "you won!";
  } else {
    text = "you lost!";
  }
  title.textContent = text;
  return title;
};

const makeReplayBtn = () => {
  const btn = document.createElement("div");
  btn.classList.add("replay-btn");
  btn.addEventListener("click", (event) => {
    newGame();
  });
  return btn;
};
