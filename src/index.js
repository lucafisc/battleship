import { gameboard } from "./modules/gameboard";

let myBoard = gameboard();
const shipName = "carrier";
myBoard.placeShip("vertical", shipName, "B", 2);

myBoard.receiveAttack("B", 2);
myBoard.receiveAttack("B", 3);
myBoard.receiveAttack("B", 4);
myBoard.receiveAttack("B", 5);
myBoard.receiveAttack("B", 6);
myBoard.receiveAttack("A", 8);
