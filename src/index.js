import { gameboard } from "./modules/gameboard";
import { player } from "./modules/players";
import { renderBoard } from "./modules/dom";
import "./styles/main.css";
import "./styles/board.css";

const human = player("human");
const cpu = player("cpu");

let board = human.getPlayerBoard();
board.receiveAttack("A", "1");
console.log(board.getBoard());
renderBoard(human);
