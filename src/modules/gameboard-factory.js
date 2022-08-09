export const newBoardStorage = () => {
  let boardStorage = new Array(100).fill("gray");
  return boardStorage;
};

// function makeAlphabet() {
//   const alpha = Array.from(Array(10)).map((e, i) => i + 65);
//   const alphabet = alpha.map((x) => String.fromCharCode(x));
//   return alphabet;
// }

// export const alphabet = makeAlphabet();

// export const newBoard = () => {
//   let cell = {
//     hit: false,
//     ship: false,
//     buffer: [],
//   };

//   const emptyColumn = Array.from(Array(10)).map((e, i) => i);
//   let column = {};
//   emptyColumn.forEach((element, index) => {
//     column[element] = Object.assign({}, cell);
//   });
//   const board = {};
//   alphabet.forEach((element, index) => {
//     board[element] = JSON.parse(JSON.stringify(column));
//   });
//   return board;
// };
