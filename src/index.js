import { player } from "./modules/player-factory";
import { renderBoard } from "./modules/gameboard-render";
import { loadInterface } from "./modules/interface";
import { newGame } from "./modules/game-control";
import { pubsub } from "./modules/pubsub.js";
import { domElements } from "./modules/dom-others";
import "./styles/main.css";
import "./styles/board.css";

// function init() {
//   loadInterface();
//   pubsub.publish("random-place-ships");
//   domElements();
//   gameLoad();
// }

// init();

function init() {
  loadInterface();
  newGame();
}

init();
