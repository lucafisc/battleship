import { pubsub } from "./pubsub.js";
import { gameboard, sucessPlacingShip } from "./gameboard-storage.js";
import { player } from "./player-factory";
import { newShip } from "./ship-factory";
let human;
let cpu;
const shipsArray = [5, 4, 3, 3, 2];

export const playersStorage = () => {
  return [human, cpu];
};

export const newGame = () => {
  human = player("human");
  cpu = player("cpu");
  const players = playersStorage();
  players.forEach(createShips);

  // console.log(human.getBoardObject().getBoardStorage());
  pubsub.publish("render-boards");
};

const createShips = (player) => {
  const boardObject = player.getBoardObject();
  for (let i = 0; i < shipsArray.length; i++) {
    let props = randomPlace(boardObject, shipsArray[i]);
    // let ship = newShip(props.length, props.cell, props.direction);
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

const freeSpace = (props, board) => {
  let freeSpace = true;

  //horizontal
  if (props.direction === 0) {
    if (isShipTooLongH(props)) {
      freeSpace = false;
    } else if (isThereShipH(props, board)) {
      freeSpace = false;
    }
  } else {
    if (isShipTooLongV(props)) {
      freeSpace = false;
    } else if (isThereShipV(props, board)) {
      freeSpace = false;
    }
  }

  return freeSpace;
};

const gameRound = () => {
  //event listener changes ship
  //board loops trhoug ships array and updates board array
  //render dom
};

function isShipTooLongH(props) {
  const lastCellDigitStr = String(props.cell).slice(-1);
  const lastCellDigitNum = Number(lastCellDigitStr);
  if (lastCellDigitNum + props.length > 9) {
    return true;
  } else {
    return false;
  }
}

function isShipTooLongV(props) {
  const lastCell = (props.length - 1) * 10 + props.cell;
  if (lastCell >= 100) {
    return true;
  } else {
    return false;
  }
}

function isThereShipH(props, board) {
  let isThereShip = false;

  for (let i = 0; i < props.length; i++) {
    if (board[props.cell + i] !== "water") {
      isThereShip = true;
    }
  }
  return isThereShip;
}

function isThereShipV(props, board) {
  let isThereShip = false;
  let shipCell = props.cell;
  for (let i = 0; i < props.length; i++) {
    if (board[shipCell] !== "water") {
      isThereShip = true;
    }
    shipCell += 10;
  }
  return isThereShip;
}
// const shipsArray = [
//   "carrier",
//   "battleship",
//   "destroyer",
//   "submarine",
//   "patrol boat",
// ];

// export const gameControl = () => {};

// //random place ships
// pubsub.subscribe("random-place-ships", () => {
//   shipsArray.forEach(placeRandomly);
//   pubsub.publish("render-board", human);
//   pubsub.publish("render-board", cpu);
// });
// const placeRandomly = (item) => {
//   let placed;
//   do {
//     placed = wasShipPlaced(placed, item, myBoard);
//   } while (placed !== true);

//   do {
//     placed = wasShipPlaced(placed, item, enemyBoard);
//   } while (placed !== true);
// };
// const wasShipPlaced = (placed, item, board) => {
//   placed = false;
//   let row = Math.floor(Math.random() * 10);
//   let column = Math.floor(Math.random() * 10);
//   let orientation = Math.round(Math.random());
//   if (orientation === 0) {
//     orientation = "vertical";
//   } else {
//     orientation = "horizontal";
//   }
//   placed = board.placeShip(orientation, item, alphabet[column], row);
//   return placed;
// };

// //start game
// pubsub.subscribe("game-start", () => {
//   let whoseTurn = "human";
//   pubsub.publish("new-current-player", whoseTurn);
// });

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
