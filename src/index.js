import { gameboard } from "./modules/gameboard";

let myBoard = gameboard();
const shipName = "destroyer";
myBoard.placeShip("vertical", shipName, "B", 0);
