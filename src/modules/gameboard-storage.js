import {
  shipToBoardVertical,
  removeVerticalShip,
  shipToBoardHorizontal,
  removeHorizontalShip,
  spaceInCellVertical,
  spaceInCellHorizontal,
  spaceInBoard,
} from "./place-remove";
import { newBoard, alphabet, newBoardStorage } from "./gameboard-factory";
import { pubsub } from "./pubsub";

export const gameBoard = () => {
  let boardStorage = newBoardStorage();
  const getBoardStorage = () => boardStorage;
  let ships = [];
  const getShips = () => ships;
  const addToShipArray = (ship) => {
    ships.push(ship);
    ships.forEach(updateBoard);
  };
  const updateBoard = (ship) => {
    const cells = ship.getCells();
    for (let i = 0; i < cells.length; i++) {
      boardStorage[cells[i].position] = cells[i].ship;
    }
  };

  const getHit = (n) => {
    if (boardStorage[n] === "water") {
      boardStorage[n] = "miss";
      pubsub.publish("change-round");
    } else {
      const indexes = findShip(ships, n);
      const hitShip = ships[indexes.index1];
      hitShip.hit(indexes.index2);
      updateBoard(hitShip);
      pubsub.publish("same-round");
    }
  };

  const areAllSunk = () => ships.every(checkShips);

  return {
    getBoardStorage,
    getShips,
    addToShipArray,
    getHit,
    areAllSunk,
  };
};

function findShip(array1, value) {
  let index1;
  let index2;
  for (let i = 0; i < array1.length; i++) {
    let array2 = array1[i].getCells();
    for (let j = 0; j < array2.length; j++) {
      if (array2[j].position === value) {
        index1 = i;
        index2 = j;
        return { index1, index2 };
      }
    }
  }
}

export const wasAlreadyChosen = (value, player) => {
  const board = player.getBoardObject().getBoardStorage();
  if (
    board[value] === "hit" ||
    board[value] === "miss" ||
    board[value] === "sunk"
  ) {
    return true;
  } else {
    return false;
  }
};

function checkShips(ship) {
  return ship.isSunk() === true;
}

// export const gameboard = () => {
//   let board = newBoard();
//   let ships = [];
//   const getBoard = () => {
//     return board;
//   };

// const placeShip = (orientation, shipName, column, row) => {
//   let freeSpace = true;
//   let newShip = ship(shipName, column, row);
//   const shipLength = newShip.getLength();

//   let existingShip = false;
//   let existingCoordinates;
//   let or;
//   let existingShipIndex = ships.findIndex(
//     (ship) => ship.getName() === shipName
//   );
//   if (existingShipIndex !== -1) {
//     existingShip = true;
//     let existingOrientation = ships[existingShipIndex].getOrientation();
//     or = existingOrientation;
//     existingCoordinates = ships[existingShipIndex].getCoordinates();
//     ships.splice(existingShipIndex, 1);

//     if (existingOrientation === "vertical") {
//       removeVerticalShip(
//         existingCoordinates[0],
//         existingCoordinates[1],
//         shipLength,
//         board,
//         shipName
//       );
//     } else if (existingOrientation === "horizontal") {
//       let index = alphabet.findIndex((i) => i === existingCoordinates[0]);
//       removeHorizontalShip(
//         index,
//         existingCoordinates[1],
//         shipLength,
//         board,
//         shipName
//       );
//     }
//   }
//   if (orientation === "vertical") {
//     let index = row;
//     freeSpace = spaceInBoard(index, shipLength);
//     if (freeSpace) {
//       freeSpace = spaceInCellVertical(
//         column,
//         index,
//         shipLength,
//         board,
//         freeSpace
//       );
//     }
//     if (freeSpace) {
//       board = shipToBoardVertical(column, index, shipLength, board, shipName);
//     }
//   } else if (orientation === "horizontal") {
//     let index = alphabet.findIndex((i) => i === column);
//     freeSpace = spaceInBoard(index, shipLength);
//     if (freeSpace) {
//       freeSpace = spaceInCellHorizontal(
//         index,
//         row,
//         shipLength,
//         board,
//         freeSpace
//       );
//     }
//     if (freeSpace) {
//       shipToBoardHorizontal(index, row, shipLength, board, shipName);
//     }
//   }

//   if (freeSpace) {
//     newShip.updateOrientation(orientation);
//     ships.push(newShip);
//     return true;
//   } else if (existingShip) {
//     placeShip(or, shipName, existingCoordinates[0], existingCoordinates[1]);
//   }
// };

// const receiveAttack = (column, row) => {
//   if (board[column][row]["ship"] !== false) {
//     board[column][row]["hit"] = "hit";
//     let name = board[column][row]["ship"];
//     let index = ships.findIndex((element) => element.getName() === name);
//     ships[index].getHit(column, row);
//   } else {
//     board[column][row]["hit"] = "missed";
//   }
// };

// const getShipByName = (name) => {
//   let index = ships.findIndex((i) => i.getName() === name);
//   return ships[index];
// };

// const areAllSunk = () => {
//   return ships.every((item) => item.isSunk());
// };

//   return {
//     receiveAttack,
//     getBoard,
//     placeShip,
//     getShipByName,
//     areAllSunk,
//   };
// };

export const resetGameboard = (thisBoard) => {
  thisBoard = "";
  thisBoard = newBoard();
};

export const wasAlreadyHit = (which, column, row) => {
  let board = which.getPlayerBoard().getBoard();
  return board[column][row]["hit"];
};
