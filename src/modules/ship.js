export const shipFactory = (length, whereHit, sunk) => {
  const hit = (n) => {
    console.log("hit");
  };
  const isSunk = () => {
    console.log("sunk");
  };
  return { length, whereHit, sunk };
};
