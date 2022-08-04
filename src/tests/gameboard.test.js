import { gameboard } from "../modules/gameboard";

test("test receive attack", () => {
  let enemyBoard = gameboard();
  enemyBoard.receiveAttack("F", "4");
  let board = enemyBoard.getBoard();
  expect(board["F"]["4"]["hit"]).toBeTruthy();
  expect(board["G"]["4"]["hit"]).toBeFalsy();
});

test.only("place ships vertically", () => {
  let myBoard = gameboard();
  const shipName = "destroyer";
  myBoard.placeShip("vertical", shipName, "A", 3);
  let board = myBoard.getBoard();

  expect(board["A"]["2"]["ship"]).toBeFalsy();
  expect(board["A"]["3"]["ship"]).toBeTruthy();
  expect(board["A"]["4"]["ship"]).toBeTruthy();
  expect(board["A"]["5"]["ship"]).toBeTruthy();
  expect(board["A"]["6"]["ship"]).toBeFalsy();
});

test("place ships vertically that do not fit board", () => {
  let myBoard = gameboard();
  const shipName = "submarine";
  myBoard.placeShip("vertical", shipName, "B", 8);
  let board = myBoard.getBoard();

  expect(board["B"]["7"]["ship"]).toBeFalsy();
  expect(board["B"]["8"]["ship"]).toBeFalsy();
  expect(board["B"]["9"]["ship"]).toBeFalsy();
});

test("place ships horizontally", () => {
  let myBoard = gameboard();
  const shipName = "battleship";
  myBoard.placeShip("horizontal", shipName, "F", 7);
  let board = myBoard.getBoard();

  expect(board["E"]["7"]["ship"]).toBeFalsy();
  expect(board["F"]["7"]["ship"]).toBeTruthy();
  expect(board["G"]["7"]["ship"]).toBeTruthy();
  expect(board["H"]["7"]["ship"]).toBeTruthy();
  expect(board["I"]["7"]["ship"]).toBeTruthy();
  expect(board["J"]["7"]["ship"]).toBeFalsy();
});

test("place ships horizontally that do not fit board", () => {
  let myBoard = gameboard();
  const shipName = "carrier";
  myBoard.placeShip("horizontal", shipName, "G", 1);
  let board = myBoard.getBoard();

  expect(board["F"]["1"]["ship"]).toBeFalsy();
  expect(board["G"]["1"]["ship"]).toBeFalsy();
  expect(board["H"]["1"]["ship"]).toBeFalsy();
  expect(board["I"]["1"]["ship"]).toBeFalsy();
  expect(board["J"]["1"]["ship"]).toBeFalsy();
});

test("does not place ships in same location", () => {
  let myBoard = gameboard();
  let shipName1 = "carrier";
  let shipName2 = "submarine";

  myBoard.placeShip("horizontal", shipName1, "B", 4);
  myBoard.placeShip("vertical", shipName2, "D", 3);

  let board = myBoard.getBoard();

  expect(board["B"]["4"]["ship"]).toBeTruthy();
  expect(board["C"]["4"]["ship"]).toBeTruthy();
  expect(board["D"]["4"]["ship"]).toBeTruthy();
  expect(board["E"]["4"]["ship"]).toBeTruthy();
  expect(board["F"]["4"]["ship"]).toBeTruthy();

  expect(board["D"]["3"]["ship"]).toBeFalsy();
  expect(board["D"]["5"]["ship"]).toBeFalsy();
});

test("change ship location", () => {
  let myBoard = gameboard();
  const shipName = "carrier";
  myBoard.placeShip("horizontal", shipName, "B", 6);
  myBoard.placeShip("vertical", shipName, "H", 3);

  let board = myBoard.getBoard();

  expect(board["H"]["3"]["ship"]).toBeTruthy();
  expect(board["H"]["4"]["ship"]).toBeTruthy();
  expect(board["H"]["5"]["ship"]).toBeTruthy();
  expect(board["H"]["6"]["ship"]).toBeTruthy();
  expect(board["H"]["7"]["ship"]).toBeTruthy();
  expect(board["B"]["6"]["ship"]).toBeFalsy();
  expect(board["C"]["6"]["ship"]).toBeFalsy();
  expect(board["D"]["6"]["ship"]).toBeFalsy();
  expect(board["E"]["6"]["ship"]).toBeFalsy();
  expect(board["F"]["6"]["ship"]).toBeFalsy();
});

test("hit ship", () => {});
