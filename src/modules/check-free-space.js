export const freeSpace = (props, board) => {
  let freeSpace = true;

  //horizontal
  if (props.direction === 0) {
    if (isShipTooLongH(props)) {
      freeSpace = false;
    } else if (isThereShipH(props, board)) {
      freeSpace = false;
    } else if (isThereShipAroundH(props, board)) {
      freeSpace = false;
    } else if (isThereShipOnEdgesH(props, board)) {
      freeSpace = false;
    }
  } else {
    if (isShipTooLongV(props)) {
      freeSpace = false;
    } else if (isThereShipV(props, board)) {
      freeSpace = false;
    } else if (isThereShipAroundV(props, board)) {
      freeSpace = false;
    } else if (isThereShipOnEdgesV(props, board)) {
      freeSpace = false;
    }
  }

  return freeSpace;
};

function isShipTooLongH(props) {
  const lastCellDigitStr = String(props.cell).slice(-1);
  const lastCellDigitNum = Number(lastCellDigitStr);
  if (lastCellDigitNum + props.length > 9) {
    return true;
  } else {
    return false;
  }
}

function isShipTooLongV(props) {
  const lastCell = (props.length - 1) * 10 + props.cell;
  if (lastCell >= 100) {
    return true;
  } else {
    return false;
  }
}

function isThereShipH(props, board) {
  let isThereShip = false;

  for (let i = 0; i < props.length; i++) {
    if (board[props.cell + i] !== "water") {
      isThereShip = true;
    }
  }
  return isThereShip;
}

function isThereShipV(props, board) {
  let isThereShip = false;
  let shipCell = props.cell;
  for (let i = 0; i < props.length; i++) {
    if (board[shipCell] !== "water") {
      isThereShip = true;
    }
    shipCell += 10;
  }
  return isThereShip;
}

function isThereShipAroundV(props, board) {
  let isThereShip = false;
  let shipCell = props.cell;
  const lastCellDigitStr = String(shipCell).slice(-1);
  const lastCellDigitNum = Number(lastCellDigitStr);

  for (let i = 0; i < props.length; i++) {
    if (lastCellDigitNum > 0) {
      if (board[shipCell - 1] !== "water") {
        isThereShip = true;
      }
    }
    if (lastCellDigitNum < 9) {
      if (board[shipCell + 1] !== "water") {
        isThereShip = true;
      }
    }

    shipCell += 10;
  }
  return isThereShip;
}

function isThereShipAroundH(props, board) {
  let isThereShip = false;

  for (let i = 0; i < props.length; i++) {
    if (props.cell >= 10) {
      if (board[props.cell + i - 10] !== "water") {
        isThereShip = true;
      }
    }
    if (props.cell < 90) {
      if (board[props.cell + i + 10] !== "water") {
        isThereShip = true;
      }
    }
  }
  return isThereShip;
}

function isThereShipOnEdgesH(props, board) {
  let isThereShip = false;
  let shipCell = props.cell;
  const lastCellDigitStr = String(shipCell).slice(-1);
  const lastCellDigitNum = Number(lastCellDigitStr);

  if (lastCellDigitNum > 0) {
    const modififer = -1;
    isThereShip = checkEdgesH(props, board, isThereShip, modififer);
  }

  if (lastCellDigitNum < 9) {
    const modififer = props.length;
    isThereShip = checkEdgesH(props, board, isThereShip, modififer);
  }

  return isThereShip;
}

function checkEdgesH(props, board, isThereShip, j) {
  if (props.cell >= 10) {
    if (board[props.cell + j - 10] !== "water") {
      isThereShip = true;
    }
  }
  if (board[props.cell + j] !== "water") {
    isThereShip = true;
  }
  if (props.cell < 90) {
    if (board[props.cell + j + 10] !== "water") {
      isThereShip = true;
    }
  }
  return isThereShip;
}

function isThereShipOnEdgesV(props, board) {
  let isThereShip = false;
  let shipCell = props.cell;
  const lastCellDigitStr = String(shipCell).slice(-1);
  const lastCellDigitNum = Number(lastCellDigitStr);

  if (props.cell >= 10) {
    const modififer = -10;
    isThereShip = checkEdgesV(
      lastCellDigitNum,
      board,
      props,
      isThereShip,
      modififer
    );
  }

  if (props.cell < 90) {
    const modififer = props.length * 10;
    isThereShip = checkEdgesV(
      lastCellDigitNum,
      board,
      props,
      isThereShip,
      modififer
    );
  }

  return isThereShip;
}

function checkEdgesV(lastCellDigitNum, board, props, isThereShip, j) {
  if (lastCellDigitNum > 0) {
    if (board[props.cell - 1 + j] !== "water") {
      isThereShip = true;
    }
  }
  if (board[props.cell - 10] !== "water") {
    isThereShip = true;
  }
  if (lastCellDigitNum < 9) {
    if (board[props.cell + 1 + j] !== "water") {
      isThereShip = true;
    }
  }
  return isThereShip;
}
