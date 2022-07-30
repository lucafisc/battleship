export const ship = (name, length) => {
  let sunk = false;
  let whereHit = new Array(length).fill(false);
  const isSunk = () => {
    return whereHit.every(wasHit);
  };
  const hit = (n) => {
    whereHit.fill(true, n, n + 1);
  };
  return {
    isSunk,
    hit,
  };
};

function wasHit(position) {
  return position === true;
}
