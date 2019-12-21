import { formatCar, filterByPrice } from "./components/car.js";
import { createReplica } from "./examples/replica.js";
import { createFace } from "./examples/createface.js";
// cars basic js
d3.json("./data/cars.json").then(displayToDOM);

function displayToDOM(data) {
  document.getElementById("carsData").innerText = JSON.stringify(data, null, 4);

  document.getElementById("formatCar").innerText = data.map(formatCar);
  document.getElementById("filterCarPrice").innerText = JSON.stringify(
    filterByPrice(data, 2000)
  );
}

// replica
createReplica();
// face
createFace();
