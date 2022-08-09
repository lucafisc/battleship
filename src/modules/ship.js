// import { alphabet } from "./board-factory";

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

// function lengthByName(name) {
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
