import { pubsub } from "./pubsub.js";
import { gameboard, sucessPlacingShip } from "./gameboard.js";
import { player } from "./players";
import { alphabet } from "./board-factory";

let myBoard;
let enemyBoard;
let human;
let cpu;

const shipsArray = [
  "carrier",
  "battleship",
  "destroyer",
  "submarine",
  "patrol boat",
];

export const gameLoad = () => {
  human = player("human");
  cpu = player("cpu");
  myBoard = human.getPlayerBoard();
  enemyBoard = cpu.getPlayerBoard();

  //separate
  //   const shipName = "carrier";
  //   myBoard.placeShip("horizontal", shipName, "F", 3);
  //   myBoard.receiveAttack("A", "3");
  //   myBoard.receiveAttack("H", "3");

  pubsub.publish("render-board", human);
  pubsub.publish("render-board", cpu);
};

export const gameControl = () => {};

//random place ships
pubsub.subscribe("random-place-ships", () => {
  shipsArray.forEach(placeRandomly);
  pubsub.publish("render-board", human);
  pubsub.publish("render-board", cpu);
});
const placeRandomly = (item) => {
  let placed;
  do {
    placed = wasShipPlaced(placed, item, myBoard);
  } while (placed !== true);

  do {
    placed = wasShipPlaced(placed, item, enemyBoard);
  } while (placed !== true);
};
const wasShipPlaced = (placed, item, board) => {
  placed = false;
  let row = Math.floor(Math.random() * 10);
  let column = Math.floor(Math.random() * 10);
  let orientation = Math.round(Math.random());
  if (orientation === 0) {
    orientation = "vertical";
  } else {
    orientation = "horizontal";
  }
  placed = board.placeShip(orientation, item, alphabet[column], row);
  return placed;
};

//start game
pubsub.subscribe("game-start", () => {
  let whoseTurn = "human";
  pubsub.publish("new-current-player", whoseTurn);
  console.log("start!");
});

//receive attack
pubsub.subscribe("new-player-attack", (coordinates) => {
  coordinates = JSON.parse(JSON.stringify(coordinates));
  console.log(coordinates.row);
  enemyBoard.receiveAttack(coordinates.column, coordinates.row);
  pubsub.publish("new-current-player", "cpu");

  pubsub.publish("render-board", human);
  pubsub.publish("render-board", cpu);
});
