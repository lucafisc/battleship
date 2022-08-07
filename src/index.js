import { player } from "./modules/players";
import { renderBoard } from "./modules/dom";
import { loadInterface } from "./modules/interface";
import { gameLoad } from "./modules/game";
import { pubsub } from "./modules/pubsub.js";
import { domElements } from "./modules/dom-others";
import "./styles/main.css";
import "./styles/board.css";

function init() {
  loadInterface();
  pubsub.publish("random-place-ships");
  domElements();
  gameLoad();
}

init();
