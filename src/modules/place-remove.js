import { alphabet } from "./board-factory";

export const shipToBoardVertical = (column, row, length, board, shipName) => {
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
};

export const removeVerticalShip = (column, row, length, board, shipName) => {
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
};

export const shipToBoardHorizontal = (column, row, length, board, shipName) => {
  //add vertical buffers
  for (let j = -1; j < 2; j++) {
    if (column + j >= 0 && column + length < 9) {
      if (column > 0 && board[alphabet[column - 1]][row + j]) {
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
      board[alphabet[column]][row - 1]["buffer"].push(shipName);
    }
    if (board[alphabet[column]][row + 1]) {
      board[alphabet[column]][row + 1]["buffer"].push(shipName);
    }
    column += 1;
  }
};

export const removeHorizontalShip = (column, row, length, board, shipName) => {
  //remove vertical buffers
  for (let j = -1; j < 2; j++) {
    if (column - 1 >= 0 && column + j < 9) {
      if (board[alphabet[column - 1]][row + j]) {
        board[alphabet[column - 1]][row + j]["buffer"] = removeFromArray(
          board[alphabet[column - 1]][row + j]["buffer"],
          shipName
        );
      }

      if (column + length < 10 && board[alphabet[column + length]][row + j]) {
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
};

export const spaceInCellVertical = (column, row, length, board, freeSpace) => {
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
};

export const spaceInCellHorizontal = (
  column,
  row,
  length,
  board,
  freeSpace
) => {
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
};

export const spaceInBoard = (index, shipLength) => {
  if (index + shipLength > 10) {
    return false;
  } else {
    return true;
  }
};

function removeFromArray(array, item) {
  let arr = Array.from(array);
  let x = arr.indexOf(item);
  arr.splice(x, 1);
  return arr;
}
