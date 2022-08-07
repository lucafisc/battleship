import { alphabet } from "./board-factory";
import { player } from "./players";
import { pubsub } from "./pubsub.js";

pubsub.subscribe("render-board", (which) => {
  removeBoard(which);
  renderBoard(which);
});

const renderBoard = (player) => {
  let board = player.getPlayerBoard().getBoard();
  let playerType = player.getPlayerType();
  let boardContainer = document.createElement("div");
  boardContainer.classList.add("gameboard");
  for (let i = 0; i < 10; i++) {
    let boardRow = document.createElement("div");
    boardRow.classList.add("board-row");
    //internal loop
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement("div");
      //check for human ships
      if (board[alphabet[j]][i]["ship"] !== false && playerType === "human") {
        cell.classList.add("my-ship");
      }
      //check for hit ships
      if (
        board[alphabet[j]][i]["ship"] !== false &&
        board[alphabet[j]][i]["hit"] === "hit"
      ) {
        cell.append(makeDot());
        cell.classList.add("hit-ship");
      }
      //check for miss hits
      else if (board[alphabet[j]][i]["hit"] === "missed") {
        cell.append(makeDot());
        cell.classList.add("hit-miss");
      }
      cell.dataset.row = i;
      cell.dataset.column = alphabet[j];

      cell.classList.add("cell");

      if (playerType !== "human") {
        cell.addEventListener("mouseup", (event) => {
          let coordinates = event.target.dataset;
          pubsub.publish("new-player-attack", coordinates);
        });
      }
      boardRow.append(cell);
    }
    boardContainer.append(boardRow);
  }
  let container;
  if (playerType === "human") {
    container = document.querySelector("#human-board");
    boardContainer.classList.add("human-gameboard");
  } else {
    container = document.querySelector("#cpu-board");
    boardContainer.classList.add("cpu-gameboard");
  }
  container.append(boardContainer);
};

const removeBoard = (player) => {
  let playerType = player.getPlayerType();
  let boardContainer = document.querySelector(`.${playerType}-gameboard`);
  if (boardContainer) {
    boardContainer.remove();
  }
};

const makeDot = () => {
  let dot = document.createElement("div");
  dot.classList.add("dot");
  return dot;
};
