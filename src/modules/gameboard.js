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
    let coordinates = [column, row];
    let freeSpace = true;
    let newShip = ship(shipName, coordinates);
    const shipLength = newShip.getLength();

    if (orientation === "vertical") {
      let index = row;
      freeSpace = spaceInBoard(index, shipLength);
      freeSpace = spaceInCellVertical(
        column,
        index,
        shipLength,
        board,
        freeSpace
      );

      if (freeSpace) {
        shipToBoardVertical(column, index, shipLength, board, shipName);
      }
    } else if (orientation === "horizontal") {
      let index = alphabet.findIndex((i) => i === column);
      freeSpace = spaceInBoard(index, shipLength);
      freeSpace = spaceInCellHorizontal(
        index,
        row,
        shipLength,
        board,
        freeSpace
      );
      if (freeSpace) {
        shipToBoardHorizontal(index, row, shipLength, board, shipName);
      }
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
      board[column][row]["buffer"] !== false
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
      board[alphabet[column]][row]["buffer"] !== false
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
        board[alphabet[index + j]][row - 1]["buffer"] = true;
      }

      if (board[alphabet[index + j]][row + length]) {
        board[alphabet[index + j]][row + length]["buffer"] = true;
      }
    }
  }

  //add vertical buffers and ship
  for (let i = 0; i < length; i++) {
    board[column][row]["ship"] = shipName;
    if (board[alphabet[index - 1]]) {
      board[alphabet[index - 1]][row]["buffer"] = true;
    }
    if (board[alphabet[index + 1]]) {
      board[alphabet[index + 1]][row]["buffer"] = true;
    }
    row += 1;
  }
}

function shipToBoardHorizontal(column, row, length, board, shipName) {
  //add vertical buffers
  for (let j = -1; j < 2; j++) {
    if (column + j >= 0 && column + j < 9) {
      if (board[alphabet[column - 1]][row + j]) {
        board[alphabet[column - 1]][row + j]["buffer"] = true;
      }

      if (board[alphabet[column + length]][row + j]) {
        board[alphabet[column + length]][row + j]["buffer"] = true;
      }
    }
  }

  //add horizontal buffers and ship
  for (let i = 0; i < length; i++) {
    board[alphabet[column]][row]["ship"] = shipName;
    if (board[alphabet[column]][row - 1]) {
      board[alphabet[column]][row - 1]["buffer"] = true;
    }
    if (board[alphabet[column]][row + 1]) {
      board[alphabet[column]][row + 1]["buffer"] = true;
    }
    column += 1;
  }
}

function placeHorizontal(board, column, row, shipName, shipLength) {
  let index = alphabet.findIndex((i) => i === column);
  //check if there is space to place ship
  let freeSpace = isEndOfBoard(index, shipLength);
  if (freeSpace) {
    let j = index;
    for (let i = 0; i < shipLength; i++) {
      if (
        board[alphabet[j]][row]["ship"] !== false ||
        board[alphabet[j]][row]["ship"] !== false
      ) {
        freeSpace = false;
      }
      j += 1;
    }
  }

  if (freeSpace) {
    let coordinates = [alphabet[index], row];
    addShipToBoard(coordinates, shipName, shipLength);
  }
}

const alphabet = makeAlphabet();

function newBoard() {
  let cell = {
    hit: false,
    ship: false,
    buffer: false,
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
