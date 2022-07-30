import { shipFactory } from "../modules/ship";

//first test
test("new ship", () => {
  expect(shipFactory(3, [], false)).toEqual({
    length: 3,
    whereHit: [],
    sunk: true,
  });
});
