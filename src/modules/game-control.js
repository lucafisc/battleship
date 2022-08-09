import { pubsub } from "./pubsub.js";
import { gameboard, sucessPlacingShip } from "./gameboard-storage.js";
import { player } from "./player-factory";
import { alphabet } from "./gameboard-factory";

let myBoard;
let enemyBoard;
let human;
let cpu;

export const gameLoad = () => {
  human = player("human");
  cpu = player("cpu");

  console.log(human.getBoardObject().getBoardStorage());

  // pubsub.publish("render-board", human);
  // pubsub.publish("render-board", cpu);
};

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
