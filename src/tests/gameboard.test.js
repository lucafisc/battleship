import { gameboard } from "../modules/gameboard";

test("test receive attack", () => {
  let enemyBoard = gameboard();
  enemyBoard.receiveAttack("F", "4");
  let board = enemyBoard.getBoard();
  expect(board["F"]["4"]["hit"]).toBeTruthy();
  expect(board["G"]["4"]["hit"]).toBeFalsy();
});

test("place ships vertically", () => {
  let myBoard = gameboard();
  const shipName = "destroyer";
  myBoard.placeShip("vertical", shipName, "B", 3);
  let board = myBoard.getBoard();

  expect(board["B"]["2"]["ship"]).toBeFalsy();
  expect(board["B"]["3"]["ship"]).toBeTruthy();
  expect(board["B"]["4"]["ship"]).toBeTruthy();
  expect(board["B"]["5"]["ship"]).toBeTruthy();
  expect(board["B"]["6"]["ship"]).toBeFalsy();
});

// test("place ships horizontally", () => {
//   let myBoard = gameboard();
//   myBoard.placeShip("horizontal", "battleship", "F", "7");
//   let board = myBoard.getBoard();
//   expect(board["E"]["7"]["ship"]).toBeFalsy();
//   expect(board["F"]["7"]["ship"]).toBeTruthy();
//   expect(board["G"]["7"]["ship"]).toBeTruthy();
//   expect(board["H"]["7"]["ship"]).toBeTruthy();
//   expect(board["I"]["7"]["ship"]).toBeFalsy();
// });
