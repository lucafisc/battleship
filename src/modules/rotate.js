import { pubsub } from "./pubsub.js";

//rotate ship
pubsub.subscribe("rotate-ship", (coordinates) => {
  coordinates = JSON.parse(JSON.stringify(coordinates));
  let shipname =
    myBoard.getBoard()[coordinates.column][coordinates.row]["ship"];
  let ship = myBoard.getShipByName(shipname);
  coordinates = ship.getCoordinates();
  let orientation = ship.getOrientation();
  if (orientation === "vertical") {
    orientation = "horizontal";
  } else {
    orientation = "vertical";
  }
  console.log("rotate");
  myBoard.placeShip(orientation, shipname, coordinates[0], coordinates[1]);
  pubsub.publish("render-board", human);
});
