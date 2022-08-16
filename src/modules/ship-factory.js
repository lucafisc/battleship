export const newShip = (props) => {
  let shipCells = new Array(props.length).fill([]);

  if (props.direction === 0) {
    let position = props.cell;
    for (let i = 0; i < shipCells.length; i++) {
      shipCells[i] = { position };
      shipCells[i].ship = "ship";
      position += 1;
    }
  } else if (props.direction === 1) {
    let position = props.cell;
    for (let i = 0; i < props.length; i++) {
      shipCells[i] = { position };
      shipCells[i].ship = "ship";
      position += 10;
    }
  }

  const hit = (n) => {
    shipCells.fill(true, n, n + 1);
  };
  const isSunk = () => shipCells.every((position) => position !== "ship");

  const getCells = () => {
    return shipCells;
  };

  return {
    hit,
    isSunk,
    getCells,
  };
};

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
