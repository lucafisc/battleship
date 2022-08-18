export const updateFleet = (player) => {
  const board = player.getBoardObject();
  const ships = board.getShips();
  const container = getContainer(player);
  appendShips(ships, container);
};

const getContainer = (player) => {
  let container;
  if (player.isPlayerHuman()) {
    container = document.querySelector(".human-fleet");
  } else {
    container = document.querySelector(".cpu-fleet");
  }
  return container;
};

const appendShips = (ships, container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let i = 0; i < ships.length; i++) {
    const cells = ships[i].getCells();
    const isSunk = ships[i].isSunk();
    console.log(cells.length);
    console.log(isSunk);
    const ship = renderShip(cells.length, isSunk);

    container.append(ship);
  }
};

const renderShip = (length, sunk) => {
  const ship = document.createElement("div");
  ship.classList.add("whole-ship");
  for (let i = 0; i < length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    let color;
    if (sunk) {
      color = "sunk";
    } else {
      color = "ship";
    }
    cell.classList.add("cell", color);

    ship.append(cell);
  }
  return ship;
};
