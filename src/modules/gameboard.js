import { ship } from "../modules/ship";

export const resetGameboard = (thisBoard) => {
  thisBoard = "";
  thisBoard = newBoard();
};

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
      console.log("existing");
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
        console.log("hsadhsajdhkas");
        let index = alphabet.findIndex((i) => i === existingCoordinates[0]);
        console.log("sjould be 1");
        console.log(index);
        console.log(row);

        removeHorizontalShip(
          index,
          existingCoordinates[1],
          shipLength,
          board,
          shipName
        );
      }
      //remove ship from board
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

  const updateShipsArray = (shipName, column, row) => {};

  const receiveAttack = (column, row) => {
    board[column][row]["hit"] = true;
    if (board[column][row]["ship"]) {
      console.log("there is a ship");
    } else {
      console.log("no ship");
    }
  };

  return {
    receiveAttack,
    getBoard,
    placeShip,
  };
};

function spaceInCellVertical(column, row, length, board, freeSpace) {
  for (let i = 0; i < length; i++) {
    if (
      board[column][row]["ship"] !== false ||
      board[column][row]["buffer"].length > 0
    ) {
      freeSpace = false;
    }
    row += 1;
  }
  return freeSpace;
}

function spaceInCellHorizontal(column, row, length, board, freeSpace) {
  for (let i = 0; i < length; i++) {
    if (
      board[alphabet[column]][row]["ship"] !== false ||
      board[alphabet[column]][row]["buffer"].length > 0
    ) {
      freeSpace = false;
    }
    column += 1;
  }
  return freeSpace;
}

function spaceInBoard(index, shipLength) {
  if (index + shipLength > 10) {
    return false;
  } else {
    return true;
  }
}

function shipToBoardVertical(column, row, length, board, shipName) {
  let index = alphabet.findIndex((i) => i === column);

  //add horizontal buffers
  for (let j = -1; j < 2; j++) {
    if (index + j >= 0 && index + j < 9) {
      if (board[alphabet[index + j]][row - 1]) {
        board[alphabet[index + j]][row - 1]["buffer"].push(shipName);
      }

      if (board[alphabet[index + j]][row + length]) {
        board[alphabet[index + j]][row + length]["buffer"].push(shipName);
      }
    }
  }

  //add vertical buffers and ship
  for (let i = 0; i < length; i++) {
    board[column][row]["ship"] = shipName;
    if (board[alphabet[index - 1]]) {
      board[alphabet[index - 1]][row]["buffer"].push(shipName);
    }
    if (board[alphabet[index + 1]]) {
      board[alphabet[index + 1]][row]["buffer"].push(shipName);
    }
    row += 1;
  }
}

function removeVerticalShip(column, row, length, board, shipName) {
  let index = alphabet.findIndex((i) => i === column);

  //remove horizontal buffers
  for (let j = -1; j < 2; j++) {
    if (index + j >= 0 && index + j < 9) {
      if (board[alphabet[index + j]][row - 1]) {
        board[alphabet[index + j]][row - 1]["buffer"] = removeFromArray(
          board[alphabet[index + j]][row - 1]["buffer"],
          shipName
        );
      }

      if (board[alphabet[index + j]][row + length]) {
        board[alphabet[index + j]][row + length]["buffer"] = removeFromArray(
          board[alphabet[index + j]][row + length]["buffer"],
          shipName
        );
      }
    }
  }

  //remove vertical buffers and ship
  for (let i = 0; i < length; i++) {
    console.log([row]);
    board[column][row]["ship"] = false;
    if (board[alphabet[index - 1]]) {
      board[alphabet[index - 1]][row]["buffer"] = removeFromArray(
        board[alphabet[index - 1]][row]["buffer"],
        shipName
      );
    }
    if (board[alphabet[index + 1]]) {
      board[alphabet[index + 1]][row]["buffer"] = removeFromArray(
        board[alphabet[index + 1]][row]["buffer"],
        shipName
      );
    }
    row += 1;
  }
}

function shipToBoardHorizontal(column, row, length, board, shipName) {
  console.log(column);

  //add vertical buffers
  for (let j = -1; j < 2; j++) {
    if (column + j >= 0 && column + j < 9) {
      if (board[alphabet[column - 1]][row + j]) {
        board[alphabet[column - 1]][row + j]["buffer"].push(shipName);
      }

      if (board[alphabet[column + length]][row + j]) {
        board[alphabet[column + length]][row + j]["buffer"].push(shipName);
      }
    }
  }

  //add horizontal buffers and ship
  for (let i = 0; i < length; i++) {
    board[alphabet[column]][row]["ship"] = shipName;
    if (board[alphabet[column]][row - 1]) {
      board[alphabet[column]][row - 1]["buffer"] += shipName;
    }
    if (board[alphabet[column]][row + 1]) {
      board[alphabet[column]][row + 1]["buffer"] += shipName;
    }
    column += 1;
  }
}

function removeHorizontalShip(column, row, length, board, shipName) {
  console.log(column);
  //remove vertical buffers
  for (let j = -1; j < 2; j++) {
    if (column + j >= 0 && column + j < 9) {
      if (board[alphabet[column - 1]][row + j]) {
        board[alphabet[column - 1]][row + j]["buffer"] = removeFromArray(
          board[alphabet[column - 1]][row + j]["buffer"],
          shipName
        );
      }

      if (board[alphabet[column + length]][row + j]) {
        board[alphabet[column + length]][row + j]["buffer"] = removeFromArray(
          board[alphabet[column + length]][row + j]["buffer"],
          shipName
        );
      }
    }
  }

  //remove horizontal buffers and ship
  for (let i = 0; i < length; i++) {
    board[alphabet[column]][row]["ship"] = false;
    if (board[alphabet[column]][row - 1]) {
      board[alphabet[column]][row - 1]["buffer"] = removeFromArray(
        board[alphabet[column]][row - 1]["buffer"],
        shipName
      );
    }
    if (board[alphabet[column]][row + 1]) {
      board[alphabet[column]][row + 1]["buffer"] = removeFromArray(
        board[alphabet[column]][row + 1]["buffer"],
        shipName
      );
    }
    column += 1;
  }
}

function removeFromArray(array, item) {
  let arr = Array.from(array);
  let x = arr.indexOf(item);
  arr.splice(x, 1);
  return arr;
}

const alphabet = makeAlphabet();

function newBoard() {
  let cell = {
    hit: false,
    ship: false,
    buffer: [],
  };

  const emptyColumn = Array.from(Array(10)).map((e, i) => i);
  let column = {};
  emptyColumn.forEach((element, index) => {
    column[element] = Object.assign({}, cell);
  });
  const board = {};
  alphabet.forEach((element, index) => {
    board[element] = JSON.parse(JSON.stringify(column));
  });
  return board;
}
function makeAlphabet() {
  const alpha = Array.from(Array(10)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  return alphabet;
}
