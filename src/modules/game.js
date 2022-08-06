import { pubsub } from "./pubsub.js";
import { gameboard } from "./gameboard.js";
import { player } from "./players";
import { alphabet } from "./board-factory";

let myBoard;
let enemyBoard;
let human;
let cpu;

let sucessPlacingShip = false;

const shipsArray = [
  "carrier",
  //   "carrier",
  //   "battleship",
  //   "destroyer",
  //   "submarine",
  //   "patrol boat",
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

pubsub.subscribe("random-place-ships", () => {
  shipsArray.forEach(placeRandomly);

  pubsub.publish("render-board", human);
});

const placeRandomly = (item) => {
  sucessPlacingShip = false;

  let row = Math.floor(Math.random() * 10);
  let column = Math.floor(Math.random() * 10);
  let orientation = Math.round(Math.random());
  if (orientation === 0) {
    orientation = "vertical";
  } else {
    orientation = "horizontal";
  }

  console.log(alphabet[column]);
  console.log(row);
  console.log(orientation);

  myBoard.placeShip(orientation, item, alphabet[column], row);
};

pubsub.subscribe("sucess-placing-ship", () => (sucessPlacingShip = true));
