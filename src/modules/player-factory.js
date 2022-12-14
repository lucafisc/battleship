// import { gameboard, wasAlreadyHit } from "./gameboard";
// import { alphabet } from "./board-factory";

import { gameBoard } from "./gameboard-storage";

export const player = (type) => {
  const boardObject = gameBoard();
  const getBoardObject = () => boardObject;
  const isPlayerHuman = () => {
    switch (type) {
      case "human":
        return true;
      case "cpu":
        return false;
      default:
        return "player type not defined";
    }
  };
  return {
    getBoardObject,
    isPlayerHuman,
  };
};

// export const player = (type) => {
//   let board = gameboard();

//   const getBoard = () => {
//     return board;
//   };

//   const attackEnemyBoard = (column, row, who) => {
//     let enemyBoard = who.getPlayerBoard();
//     enemyBoard.receiveAttack(column, row);
//     let board = enemyBoard.getBoard();
//     if (board[column][row]["ship"] !== false) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const randomMoveOn = (enemy) => {
//     let row;
//     let column;
//     do {
//       row = Math.floor(Math.random() * 10);
//       column = Math.floor(Math.random() * 10);
//     } while (wasAlreadyHit(enemy, alphabet[column], row) !== false);
//     return attackEnemyBoard(alphabet[column], row, enemy);
//   };

//   const getPlayerType = () => {
//     return type;
//   };

//   return {
//     attackEnemyBoard,
//     getPlayerBoard,
//     randomMoveOn,
//     getPlayerType,
//     name,
//   };
// };
