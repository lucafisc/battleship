export const ship = (name) => {
  let sunk = false;
  const length = getLength(name);
  let whereHit = new Array(length).fill(false);
  const hit = (n) => {
    whereHit.fill(true, n, n + 1);
  };
  const isSunk = () => {
    return whereHit.every(wasHit);
  };

  return {
    isSunk,
    hit,
  };
};

function wasHit(position) {
  return position === true;
}

function getLength(name) {
  switch (name) {
    case "carrier":
      return 5;
    case "battleship":
      return 4;
    case "destroyer":
      return 3;
    case "submarine":
      return 3;
    case "patrol boat":
      return 2;
  }
}
