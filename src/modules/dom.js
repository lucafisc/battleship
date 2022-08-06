import { alphabet } from "./board-factory";
import { player } from "./players";

export const renderBoard = (player) => {
  let board = player.getPlayerBoard().getBoard();
  let boardContainer = document.createElement("div");
  boardContainer.classList.add("gameboard");
  for (let i = 0; i < 10; i++) {
    let boardRow = document.createElement("div");
    boardRow.classList.add("board-row");
    //internal loop
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement("div");
      //check for human ships
      if (
        board[alphabet[j]][i]["ship"] !== false &&
        player.getPlayerType() === "human"
      ) {
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
      boardRow.append(cell);
    }
    boardContainer.append(boardRow);
  }
  let container;
  if (player.getPlayerType() === "human") {
    container = document.querySelector("#human-board");
  } else {
    container = document.querySelector("#cpu-board");
  }
  container.append(boardContainer);
};
function makeDot() {
  let dot = document.createElement("div");
  dot.classList.add("dot");
  return dot;
}
