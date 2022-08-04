import { gameboard } from "./modules/gameboard";

let myBoard = gameboard();
const shipName = "carrier";
myBoard.placeShip("horizontal", shipName, "B", 6);
myBoard.placeShip("vertical", shipName, "H", 3);
