import { pubsub } from "./pubsub.js";
import { gameboard, sucessPlacingShip } from "./gameboard-storage.js";
import { player } from "./player-factory";
import { newShip } from "./ship-factory";
import { freeSpace } from "./check-free-space";
let human;
let cpu;
let whoseTurn = "cpu";

const shipsArray = [5, 4, 3, 3, 2, 2, 1, 1];

export const playersStorage = () => {
  return [human, cpu];
};

export const newGame = () => {
  human = player("human");
  cpu = player("cpu");
  const players = playersStorage();
  players.forEach(createShips);
  pubsub.publish("render-boards");
  pubsub.publish("new-current-player", "cpu");
};

const createShips = (player) => {
  const boardObject = player.getBoardObject();
  for (let i = 0; i < shipsArray.length; i++) {
    let props = randomPlace(boardObject, shipsArray[i]);
    let ship = newShip(props);
    boardObject.addToShipArray(ship);
  }
};

const randomPlace = (boardObject, length) => {
  let props;
  let cell;
  let direction;
  let board = boardObject.getBoardStorage();
  do {
    cell = randomNumber(100);
    direction = randomNumber(2);
    props = { length, cell, direction };
  } while (freeSpace(props, board) === false);

  return props;
};

const randomNumber = (range) => {
  return Math.floor(Math.random() * range);
};

//start game
pubsub.subscribe("game-start", () => {
  console.log("hello");
  pubsub.publish("change-round");
});

//new round
pubsub.subscribe("change-round", () => {
  pubsub.publish("render-boards");
  switch (whoseTurn) {
    case "human":
      whoseTurn = "cpu";
      pubsub.publish("cpu-attack");
      break;
    case "cpu":
      whoseTurn = "human";
      break;
  }

  pubsub.publish("new-current-player", whoseTurn);
});

//human attack
pubsub.subscribe("human-attack", (cell) => {
  const n = parseInt(cell.getAttribute("data-number"));
  cpu.getBoardObject().getHit(n);
});

//cpu attack
pubsub.subscribe("cpu-attack", () => {
  const n = randomNumber(99);
  setTimeout(() => {
    human.getBoardObject().getHit(n);
  }, "1000");
});

const gameRound = () => {
  //event listener changes ship
  //board loops trhoug ships array and updates board array
  //render dom
};

// //cpu round
// pubsub.subscribe("cpu-round", () => {
//   let hitShip = cpu.randomMoveOn(human);
//   pubsub.publish("render-board", human);
//   pubsub.publish("render-board", cpu);

//   if (hitShip) {
//     setTimeout(() => {
//       pubsub.publish("cpu-round");
//     }, "1000");
//   } else {
//     pubsub.publish("new-current-player", "human");
//   }
// });
