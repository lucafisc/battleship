import { ship } from "../modules/ship";

export const gameboard = () => {
  let board = newBoard();
  const getBoard = () => {
    return board;
  };

  const placeShip = (orientation, shipName, column, row) => {
    const newShip = ship(shipName);
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
  if (index + shipLength > 10) {
    return;
  } else {
    for (let i = 0; i < shipLength; i++) {
      board[column][index]["ship"] = true;
      index += 1;
    }
  }
}

function placeHorizontal(shipLength, board, column, row) {
  const alphabet = makeAlphabet();
  let index = alphabet.findIndex((i) => i === column);
  console.log(index);
  console.log(alphabet[index]);
  console.log(shipLength);
  console.log(index + shipLength);
  if (index + shipLength > 10) {
    return;
  } else {
    for (let i = 0; i < shipLength; i++) {
      board[alphabet[index]][row]["ship"] = true;
      index += 1;
    }
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
