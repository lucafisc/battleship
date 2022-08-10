import { shipToBoardVertical } from "../modules/place-remove";

describe("shipToBoardVertical", () => {
    test("when moving ship into available space it should return correct coordinates", () => {
      
        expect(shipToBoardVertical(column, row, length, board, shipName));
  });
});
