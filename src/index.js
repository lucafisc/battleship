import { gameboard } from "./modules/gameboard";

let myBoard = gameboard();
let board = myBoard.getBoard();
const shipName = "carrier";
myBoard.placeShip("vertical", shipName, "B", 2);
myBoard.receiveAttack("B", 2);
myBoard.receiveAttack("A", 8);
