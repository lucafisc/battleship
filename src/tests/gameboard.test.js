import { gameboard } from "../modules/gameboard";

test("test receive attack", () => {
  let enemyBoard = gameboard();
  enemyBoard.receiveAttack("F", "4");
  let board = enemyBoard.getBoard();
  expect(board["F"]["4"]["hit"]).toBeTruthy();
  expect(board["G"]["4"]["hit"]).toBeFalsy();
});

test("place ships", () => {
  let myBoard = gameboard();
  myBoard.placeShip("B", "3");
  let board = myBoard.getBoard();
  expect(board["B"]["3"]["ship"]).toBeTruthy;
});
