import { ship } from "../modules/ship";

export const gameboard = () => {
  let board = newBoard();
  let ships = [];
  const getBoard = () => {
    return board;
  };

  const placeShip = (orientation, shipName, column, row) => {
    let newShip = ship(shipName);

    if (ships.includes(shipName)) {
      let index = ships.findIndex((i) => i === newShip);
      console.log("indluds!");
    } else {
      ships.push(shipName);
    }

    // Object.keys(board).forEach(function (key, index) {
    //   console.log(key);
    // });

    //use map to reset ship location
    const shipLength = newShip.getLength();
    switch (orientation) {
      case "vertical":
        placeVertical(shipLength, board, column, row);
        break;
      case "horizontal":
        placeHorizontal(shipLength, board, column, row);
        break;
    }
  };

  const receiveAttack = (column, row) => {
    board[column][row]["hit"] = true;
  };

  return {
    receiveAttack,
    getBoard,
    placeShip,
  };
};

function placeVertical(shipLength, board, column, row) {
  let index = row;
  let freeSpace = isEndOfBoard(index, shipLength);
  if (freeSpace) {
    let j = index;
    for (let i = 0; i < shipLength; i++) {
      if (board[column][j]["ship"] === true) {
        freeSpace = false;
      }
      j += 1;
    }
  }

  if (freeSpace) {
    let j = index;
    for (let i = 0; i < shipLength; i++) {
      board[column][j]["ship"] = true;
      j += 1;
    }
  }
}

function placeHorizontal(shipLength, board, column, row) {
  const alphabet = makeAlphabet();
  let index = alphabet.findIndex((i) => i === column);

  //check if there is space to place ship
  let freeSpace = isEndOfBoard(index, shipLength);

  if (freeSpace) {
    let j = index;
    for (let i = 0; i < shipLength; i++) {
      if (board[alphabet[j]][row]["ship"] === true) {
        freeSpace = false;
      }
      j += 1;
    }
  }
  if (freeSpace) {
    for (let i = 0; i < shipLength; i++) {
      board[alphabet[index]][row]["ship"] = true;
      index += 1;
    }
  }
}

function isEndOfBoard(index, shipLength) {
  if (index + shipLength > 10) {
    return false;
  } else {
    return true;
  }
}

function newBoard() {
  let cell = {
    hit: false,
    ship: false,
  };

  const emptyColumn = Array.from(Array(10)).map((e, i) => i);
  let column = {};
  emptyColumn.forEach((element, index) => {
    column[element] = Object.assign({}, cell);
  });

  const alphabet = makeAlphabet();
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
