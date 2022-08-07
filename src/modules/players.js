import { gameboard, wasAlreadyHit } from "./gameboard";
import { alphabet } from "./board-factory";

export const player = (type) => {
  let board = gameboard();

  const getPlayerBoard = () => {
    return board;
  };

  const attackEnemyBoard = (column, row, who) => {
    console.log("attack!");

    let enemyBoard = who.getPlayerBoard();
    enemyBoard.receiveAttack(column, row);
  };

  const randomMoveOn = (enemy) => {
    let row;
    let column;
    do {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    } while (wasAlreadyHit(enemy, alphabet[column], row) !== false);
    attackEnemyBoard(alphabet[column], row, enemy);
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
