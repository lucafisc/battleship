import { gameboard } from "./gameboard";
import { alphabet } from "./board-factory";

export const player = (type) => {
  let board = gameboard();

  const getPlayerBoard = () => {
    return board;
  };

  const attackEnemyBoard = (column, row, who) => {
    let enemyBoard = who.getPlayerBoard();
    enemyBoard.receiveAttack(column, row);
  };

  const randomMove = (enemy) => {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);
    let index = alphabet.findIndex((i) => i === column);
    attackEnemyBoard(index, row, enemy);
  };

  const getPlayerType = () => {
    return type;
  };

  return {
    attackEnemyBoard,
    getPlayerBoard,
    randomMove,
    getPlayerType,
    name,
  };
};