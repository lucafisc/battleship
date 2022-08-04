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
      freeSpace = spaceInCell(index, column, shipLength, board, freeSpace);

      if (freeSpace) {
        shipToBoardVertical(column, index, shipLength, board, shipName);
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

function spaceInCell(row, column, length, board, freeSpace) {
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
    if (board[alphabet[index + j]][row - 1]) {
      board[alphabet[index + j]][row - 1]["buffer"] = true;
    }
    if (board[alphabet[index + j]][row + length]) {
      board[alphabet[index + j]][row + length]["buffer"] = true;
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
