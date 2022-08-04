export const ship = (name, column, row) => {
  let orientation;
  let sunk = false;
  const getName = () => {
    return name;
  };
  const getCoordinates = () => {
    return [column, row];
  };
  const length = lengthByName(name);
  const getLength = () => {
    return length;
  };
  let whereHit = new Array(length).fill(false);
  const hit = (n) => {
    whereHit.fill(true, n, n + 1);
  };
  const isSunk = () => {
    return whereHit.every(wasHit);
  };

  const updateOrientation = (value) => {
    orientation = value;
  };

  const getOrientation = () => {
    return orientation;
  };

  return {
    getName,
    getCoordinates,
    getLength,
    isSunk,
    hit,
    updateOrientation,
    getOrientation,
  };
};

function wasHit(position) {
  return position === true;
}

function lengthByName(name) {
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
