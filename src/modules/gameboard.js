import { ship } from "../modules/ship";
import {
  shipToBoardVertical,
  removeVerticalShip,
  shipToBoardHorizontal,
  removeHorizontalShip,
  spaceInCellVertical,
  spaceInCellHorizontal,
  spaceInBoard,
} from "./place-remove";
import { newBoard, alphabet } from "./board-factory";

export const gameboard = () => {
  let board = newBoard();
  let ships = [];
  const getBoard = () => {
    return board;
  };

  const placeShip = (orientation, shipName, column, row) => {
    let freeSpace = true;
    let newShip = ship(shipName, column, row);
    const shipLength = newShip.getLength();

    let existingShip = false;
    let existingCoordinates;
    let existingShipIndex = ships.findIndex(
      (ship) => ship.getName() === shipName
    );
    if (existingShipIndex !== -1) {
      existingShip = true;
      let existingOrientation = ships[existingShipIndex].getOrientation();
      existingCoordinates = ships[existingShipIndex].getCoordinates();
      ships.splice(existingShipIndex, 1);

      if (existingOrientation === "vertical") {
        removeVerticalShip(
          existingCoordinates[0],
          existingCoordinates[1],
          shipLength,
          board,
          shipName
        );
      } else if (existingOrientation === "horizontal") {
        let index = alphabet.findIndex((i) => i === existingCoordinates[0]);
        removeHorizontalShip(
          index,
          existingCoordinates[1],
          shipLength,
          board,
          shipName
        );
      }
    }
    if (orientation === "vertical") {
      let index = row;
      freeSpace = spaceInBoard(index, shipLength);
      if (freeSpace) {
        freeSpace = spaceInCellVertical(
          column,
          index,
          shipLength,
          board,
          freeSpace
        );
      }
      if (freeSpace) {
        shipToBoardVertical(column, index, shipLength, board, shipName);
      }
    } else if (orientation === "horizontal") {
      let index = alphabet.findIndex((i) => i === column);
      freeSpace = spaceInBoard(index, shipLength);
      if (freeSpace) {
        freeSpace = spaceInCellHorizontal(
          index,
          row,
          shipLength,
          board,
          freeSpace
        );
      }
      if (freeSpace) {
        shipToBoardHorizontal(index, row, shipLength, board, shipName);
      }
    }

    if (freeSpace) {
      newShip.updateOrientation(orientation);
      ships.push(newShip);
    } else if (existingShip) {
      placeShip(
        orientation,
        shipName,
        existingCoordinates[0],
        existingCoordinates[1]
      );
    }
    console.log(board);
  };

  const receiveAttack = (column, row) => {
    if (board[column][row]["ship"] !== false) {
      board[column][row]["hit"] = "hit";
      let name = board[column][row]["ship"];
      let index = ships.findIndex((element) => element.getName() === name);
      ships[index].getHit(column, row);
    } else {
      board[column][row]["hit"] = "missed";
    }
  };

  const areAllSunk = () => {
    return ships.every((item) => item.isSunk());
  };

  return {
    receiveAttack,
    getBoard,
    placeShip,
    areAllSunk,
  };
};

export const resetGameboard = (thisBoard) => {
  thisBoard = "";
  thisBoard = newBoard();
};
