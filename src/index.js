import { gameboard } from "./modules/gameboard";
import { player } from "./modules/players";
import { renderBoard } from "./modules/dom";
import "./styles/main.css";
import "./styles/board.css";

const human = player("human");
const cpu = player("cpu");

let myBoard = human.getPlayerBoard();
let enemyBoard = cpu.getPlayerBoard();
const shipName = "carrier";

myBoard.placeShip("horizontal", shipName, "F", 3);

myBoard.receiveAttack("A", "3");
myBoard.receiveAttack("H", "3");

console.log(myBoard);

console.log(myBoard.getBoard());
renderBoard(human);
renderBoard(cpu);
