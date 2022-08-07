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
  human.attackEnemyBoard(coordinates.column, coordinates.row, cpu);
  pubsub.publish("new-current-player", "cpu");

  setTimeout(() => {
    pubsub.publish("cpu-round");
  }, "1000");
  pubsub.publish("render-board", human);
  pubsub.publish("render-board", cpu);
});

//cpu round
pubsub.subscribe("cpu-round", () => {
  cpu.randomMoveOn(human);
  pubsub.publish("render-board", human);
  pubsub.publish("render-board", cpu);
  pubsub.publish("new-current-player", "human");
});
