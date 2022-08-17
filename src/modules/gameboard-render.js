import { pubsub } from "./pubsub.js";
import { playersStorage } from "./game-control";
import { player } from "./player-factory.js";
pubsub.subscribe("render-boards", () => getPlayers());

const getPlayers = () => {
  const players = playersStorage();
  players.forEach(renderBoard);
};

const renderBoard = (player) => {
  const container = getDOMContainer(player);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  let boardContainer = makeBoardContainer();
  boardContainer = addCells(player, boardContainer);
  container.append(boardContainer);
};

const getDOMContainer = (player) => {
  const humanPlayer = player.isPlayerHuman();
  let containerID;
  switch (humanPlayer) {
    case true:
      containerID = "#human-board";
      break;
    case false:
      containerID = "#cpu-board";
      break;
    default:
      return "player type not defined";
  }
  return document.querySelector(containerID);
};

const makeBoardContainer = () => {
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("gameboard");
  return boardContainer;
};

const addCells = (player, container) => {
  const boardStorage = player.getBoardObject().getBoardStorage();
  const isHuman = player.isPlayerHuman();
  for (let i = 0; i < boardStorage.length; i++) {
    const cell = makeCell(i, boardStorage[i], isHuman);
    container.append(cell);
  }
  return container;
};

const makeCell = (i, color, human) => {
  const cell = document.createElement("div");
  cell.classList.add("cell", color);
  cell.dataset.number = i;
  if (human === false && (color === "water" || color === "ship")) {
    cell.addEventListener("click", (e) => {
      if (
        !e.target.parentNode.parentNode.classList.contains("not-turn") &&
        (e.target.classList.contains("water") ||
          e.target.classList.contains("ship"))
      ) {
        pubsub.publish("new-player-move", e.target);
      }
    });
  }
  return cell;
};

// import { alphabet } from "./board-factory";
// import { player } from "./players";
// import { pubsub } from "./pubsub.js";
// let existingCoordinates;

// pubsub.subscribe("render-board", (which) => {
//   removeBoard(which);
//   renderBoard(which);
// });

// const renderBoard = (player) => {
//   let board = player.getPlayerBoard().getBoard();
//   let playerType = player.getPlayerType();
//   boardContainer.classList.add("gameboard");
//   for (let i = 0; i < 10; i++) {
//     //board row
//     let boardRow = document.createElement("div");
//     boardRow.classList.add("board-row");
//     //internal loop
//     for (let j = 0; j < 10; j++) {
//       let cell = document.createElement("div");
//       cell.id = "ship";

//       //check for human ships
//       if (board[alphabet[j]][i]["ship"] !== false && playerType === "human") {
//         cell.classList.add("my-ship");
//         cell.draggable = true;
//         cell.addEventListener("mouseup", (event) => {
//           let coordinates = event.target.dataset;
//           pubsub.publish("rotate-ship", coordinates);
//         });
//         cell.addEventListener("dragstart", (event) => {
//           console.log("drag start");
//           existingCoordinates = event.target.dataset;
//           // event.target.classList.add("dragged");
//         });
//         cell.addEventListener("dragend", (event) => {
//           console.log("drag end");
//           // event.target.classList.remove("dragged");
//         });
//       }

//       if (board[alphabet[j]][i]["buffer"].length > 0) {
//         cell.classList.add("buffer");
//       }
//       if (
//         board[alphabet[j]][i]["ship"] !== false &&
//         board[alphabet[j]][i]["hit"] === "hit"
//       ) {
//         //check for hit ships
//         cell.append(makeDot());
//         cell.classList.add("hit-ship");
//       }
//       //check for miss hits
//       else if (board[alphabet[j]][i]["hit"] === "missed") {
//         cell.append(makeDot());
//         cell.classList.add("hit-miss");
//       }
//       //check for empty cells
//       if (board[alphabet[j]][i]["ship"] === false) {
//         cell.addEventListener("dragenter", (e) => {
//           // const coordinates = document.querySelector(".dragged")?.dataset;
//           const newCoordinates = e.target.dataset;
//           console.log({ existingCoordinates, newCoordinates });

//           const data = { existingCoordinates, newCoordinates };
//           pubsub.publish("dragged", data);
//         });
//       }
//       cell.dataset.row = i;
//       cell.dataset.column = alphabet[j];
//       cell.classList.add("cell");

//       if (playerType !== "human") {
//         cell.addEventListener("mouseup", (event) => {
//           let coordinates = event.target.dataset;
//           pubsub.publish("new-player-attack", coordinates);
//         });
//       }
//       boardRow.append(cell);
//     }
//     boardContainer.append(boardRow);
//   }
//   let container;
//   if (playerType === "human") {
//     container = document.querySelector("#human-board");
//     boardContainer.classList.add("human-gameboard");
//   } else {
//     container = document.querySelector("#cpu-board");
//     boardContainer.classList.add("cpu-gameboard");
//   }
//   container.append(boardContainer);
// };

// // const removeBoard = (player) => {
// //   let playerType = player.getPlayerType();
// //   let boardContainer = document.querySelector(`.${playerType}-gameboard`);
// //   if (boardContainer) {
// //     boardContainer.remove();
// //   }
// // };

// // const makeDot = () => {
// //   let dot = document.createElement("div");
// //   dot.classList.add("dot");
// //   return dot;
// // };
