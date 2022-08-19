export const newShip = (props) => {
  let shipCells = defineCells(props);

  const hit = (n) => {
    shipCells[n].ship = "hit";
    if (isSunk()) {
      shipCells.forEach(sink);
    }
  };
  const isSunk = () => shipCells.every(checkShips);
  const getCells = () => {
    return shipCells;
  };

  return {
    hit,
    isSunk,
    getCells,
  };
};

function checkShips(n) {
  return n.ship !== "ship";
}

function sink(n) {
  n.ship = "sunk";
}

function defineCells(props) {
  let array = new Array(props.length).fill([]);
  if (props.direction === 0) {
    let position = props.cell;
    for (let i = 0; i < array.length; i++) {
      array[i] = { position };
      array[i].ship = "ship";
      position += 1;
    }
  } else if (props.direction === 1) {
    let position = props.cell;
    for (let i = 0; i < props.length; i++) {
      array[i] = { position };
      array[i].ship = "ship";
      position += 10;
    }
  }
  return array;
}
// function getShipLength(name) {
//   switch (name) {
//     case "carrier":
//       return 5;
//     case "battleship":
//       return 4;
//     case "destroyer":
//       return 3;
//     case "submarine":
//       return 3;
//     case "patrol boat":
//       return 2;
//   }
// }

// export const ship = (name, column, row) => {
//   let orientation;
//   let sunk = false;
//   const getName = () => {
//     return name;
//   };
//   const getCoordinates = () => {
//     return [column, row];
//   };
//   const length = lengthByName(name);
//   const getLength = () => {
//     return length;
//   };
//   let whereHit = new Array(length).fill(false);
//   const hit = (n) => {
//     whereHit.fill(true, n, n + 1);
//   };
//   const isSunk = () => {
//     return whereHit.every((position) => position === true);
//   };

//   const updateOrientation = (value) => {
//     orientation = value;
//   };

//   const getOrientation = () => {
//     return orientation;
//   };

//   const getHit = (hitColumn, hitRow) => {
//     let position;
//     if (orientation === "vertical") {
//       let index = hitRow;
//       let initial = row;
//       position = index - initial;
//     } else if (orientation === "horizontal") {
//       let index = alphabet.findIndex((i) => i === hitColumn);
//       let initial = alphabet.findIndex((i) => i === column);
//       position = index - initial;
//     }

//     whereHit[position] = true;
//   };

//   return {
//     getName,
//     getCoordinates,
//     getLength,
//     isSunk,
//     hit,
//     updateOrientation,
//     getOrientation,
//     getHit,
//   };
// };
