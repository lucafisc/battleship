import { pubsub } from "./pubsub.js";
import { player } from "./player-factory";
import { newShip } from "./ship-factory";
import { freeSpace } from "./check-free-space";
import { wasAlreadyChosen } from "./gameboard-storage";
import { updateFleet } from "./dom-fleet";
let human;
let cpu;
let whoseTurn = "cpu";

const shipsArray = [5, 3, 4, 3, 2, 1, 2, 1];

export const playersStorage = () => {
  return [human, cpu];
};

export const newGame = () => {
  human = player("human");
  cpu = player("cpu");
  const players = playersStorage();
  players.forEach(createShips);
  players.forEach(updateFleet);
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
  pubsub.publish("change-round");
});

//new round
pubsub.subscribe("change-round", () => {
  pubsub.publish("render-boards");
  const players = playersStorage();
  players.forEach(updateFleet);
  whoseTurn = otherPlayer();
  if (whoseTurn === "cpu") {
    pubsub.publish("cpu-attack");
  }

  pubsub.publish("new-current-player", whoseTurn);
});

//same round
pubsub.subscribe("same-round", () => {
  pubsub.publish("render-boards");
  const players = playersStorage();
  players.forEach(updateFleet);
  const opponent = otherPlayer();
  console.log(opponent);
  console.log(eval(opponent).getBoardObject().areAllSunk());
  if (eval(opponent).getBoardObject().areAllSunk()) {
    pubsub.publish("game-over", whoseTurn);
  } else {
    switch (whoseTurn) {
      case "human":
        break;
      case "cpu":
        pubsub.publish("cpu-attack");
        break;
    }
  }
});

//human attack
pubsub.subscribe("human-attack", (cell) => {
  const n = parseInt(cell.getAttribute("data-number"));
  cpu.getBoardObject().getHit(n);
});

//cpu attack
pubsub.subscribe("cpu-attack", () => {
  let n;
  do {
    n = randomNumber(100);
  } while (wasAlreadyChosen(n, human));
  setTimeout(() => {
    human.getBoardObject().getHit(n);
  }, "1000");
});

const otherPlayer = () => {
  switch (whoseTurn) {
    case "human":
      return "cpu";
    case "cpu":
      return "human";
  }
};
