import { gameboard } from "./modules/gameboard";

let myBoard = gameboard();
const shipName = "carrier";
myBoard.placeShip("vertical", shipName, "B", 5);
myBoard.placeShip("horizontal", shipName, "F", 3);
