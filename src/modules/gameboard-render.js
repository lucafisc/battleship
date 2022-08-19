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
        pubsub.publish("human-attack", e.target);
      }
    });
  }
  return cell;
};
