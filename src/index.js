import { gameboard } from "./modules/gameboard";

let myBoard = gameboard();
const shipName = "battleship";
myBoard.placeShip("horizontal", shipName, "F", 7);
