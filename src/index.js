import { gameboard } from "./modules/gameboard";
import { player } from "./modules/players";
import { renderBoard } from "./modules/dom";
import { loadInterface } from "./modules/interface";
import { gameLoad } from "./modules/game";
import "./styles/main.css";
import "./styles/board.css";

function init() {
  loadInterface();
  gameLoad();
}

init();
