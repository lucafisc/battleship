import { player } from "./modules/player-factory";
import { renderBoard } from "./modules/gameboard-render";
import { loadInterface } from "./modules/interface";
import { newGame } from "./modules/game-control";
import { pubsub } from "./modules/pubsub.js";
import { domElements } from "./modules/dom-others";
import "./styles/main.css";
import "./styles/board.css";
import "./styles/content.css";
import "./styles/fleet.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
function init() {
  loadInterface();
  domElements();
  newGame();
}

init();
