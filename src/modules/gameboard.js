import { ship } from "../modules/ship";

export const gameboard = () => {
  let board = newBoard();
  const getBoard = () => {
    return board;
  };

  const placeShip = (column, row, shipName) => {
    const newShip = ship(shipName, 5);

    console.log("placed!");
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

  const alpha = Array.from(Array(10)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  const board = {};
  alphabet.forEach((element, index) => {
    board[element] = JSON.parse(JSON.stringify(column));
  });
  return board;
}
