import { alphabet } from "./board-factory";
import { player } from "./players";
const boardContainer = document.getElementById("board-container");

export const renderBoard = (player) => {
  let board = player.getPlayerBoard().getBoard();
  for (let i = 0; i < 10; i++) {
    let boardRow = document.createElement("div");
    boardRow.classList.add("board-row");
    //internal loop
    for (let j = 0; j < 10; j++) {
      console.log(j);
      console.log(i);
      let cell = document.createElement("div");
      //check for human ships
      if (
        player.getPlayerType() === "human" &&
        board[alphabet[j]][i]["ship"] !== false
      ) {
        cell.classList.add("my-ship");
      }
      //check for hit ships
      if (
        board[alphabet[j]][i]["ship"] !== false &&
        board[alphabet[j]][i]["hit"] === "hit"
      ) {
        cell.classList.add("hit-ship");
      }
      //check for miss hits
      else if (board[alphabet[j]][i]["hit"] === "missed") {
        let dot = document.createElement("div");
        dot.classList.add("dot");
        cell.append(dot);
        cell.classList.add("hit-miss");
      }
      cell.dataset.row = i;
      cell.dataset.column = alphabet[j];

      cell.classList.add("cell");
      boardRow.append(cell);
    }
    boardContainer.append(boardRow);
  }
};
