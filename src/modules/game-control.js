import { pubsub } from "./pubsub.js";
import { gameboard, sucessPlacingShip } from "./gameboard-storage.js";
import { player } from "./player-factory";
import { newShip } from "./ship-factory";
import { freeSpace } from "./check-free-space";
let human;
let cpu;
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
  let whoseTurn = "human";
  console.log("hello");
  pubsub.publish("new-current-player", whoseTurn);
});

//new player move
pubsub.subscribe("new-player-move", (cell) => {
  console.log(cell);
});
const gameRound = () => {
  //event listener changes ship
  //board loops trhoug ships array and updates board array
  //render dom
};

// //rotate ship
// pubsub.subscribe("rotate-ship", (coordinates) => {
//   coordinates = JSON.parse(JSON.stringify(coordinates));

//   let shipname =
//     myBoard.getBoard()[coordinates.column][coordinates.row]["ship"];
//   let ship = myBoard.getShipByName(shipname);
//   coordinates = ship.getCoordinates();
//   let orientation = ship.getOrientation();
//   if (orientation === "vertical") {
//     orientation = "horizontal";
//   } else {
//     orientation = "vertical";
//   }
//   myBoard.placeShip(orientation, shipname, coordinates[0], coordinates[1]);
//   pubsub.publish("render-board", human);
// });

// //drag ship
// pubsub.subscribe("dragged", (data) => {
//   const newData = JSON.parse(JSON.stringify(data));

//   let shipname =
//     myBoard.getBoard()[newData.existingCoordinates.column][
//       newData.existingCoordinates.row
//     ]["ship"];

//   let ship = myBoard.getShipByName(shipname);
//   console.log({ ship, shipname });

//   let orientation = ship.getOrientation();

//   myBoard.placeShip(
//     orientation,
//     shipname,
//     newData.newCoordinates.column,
//     newData.newCoordinates.row
//   );
//   pubsub.publish("render-board", human);
// });

// //receive attack
// pubsub.subscribe("new-player-attack", (coordinates) => {
//   coordinates = JSON.parse(JSON.stringify(coordinates));
//   let hitShip = human.attackEnemyBoard(
//     coordinates.column,
//     coordinates.row,
//     cpu
//   );
//   pubsub.publish("render-board", human);
//   pubsub.publish("render-board", cpu);
//   if (hitShip) {
//     pubsub.publish("new-current-player", "human");
//   } else {
//     pubsub.publish("new-current-player", "cpu");
//     setTimeout(() => {
//       pubsub.publish("cpu-round");
//     }, "1000");
//   }
// });

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
