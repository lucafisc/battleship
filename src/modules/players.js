import { gameboard, wasAlreadyHit } from "./gameboard";
import { alphabet } from "./board-factory";

export const player = (type) => {
  let board = gameboard();

  const getPlayerBoard = () => {
    return board;
  };

  const attackEnemyBoard = (column, row, who) => {
    let enemyBoard = who.getPlayerBoard();
    enemyBoard.receiveAttack(column, row);
    let board = enemyBoard.getBoard();
    if (board[column][row]["ship"] !== false) {
      return true;
    } else {
      return false;
    }
  };

  const randomMoveOn = (enemy) => {
    let row;
    let column;
    do {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    } while (wasAlreadyHit(enemy, alphabet[column], row) !== false);
    return attackEnemyBoard(alphabet[column], row, enemy);
  };

  const getPlayerType = () => {
    return type;
  };

  return {
    attackEnemyBoard,
    getPlayerBoard,
    randomMoveOn,
    getPlayerType,
    name,
  };
};
