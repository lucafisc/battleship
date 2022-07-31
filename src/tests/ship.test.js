import { ship } from "../modules/ship";

test("test isSunk function", () => {
  const destroyer = ship("carrier");
  expect(destroyer.isSunk()).toBeFalsy();
});

test("one hit does not sink", () => {
  const destroyer = ship("destroyer");
  destroyer.hit(0);
  expect(destroyer.isSunk()).toBeFalsy();
});

test("several hits sink", () => {
  const submarine = ship("submarine");
  submarine.hit(2);
  submarine.hit(1);
  submarine.hit(0);

  expect(submarine.isSunk()).toBeTruthy();
});
