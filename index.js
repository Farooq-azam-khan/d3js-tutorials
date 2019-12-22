import { formatCar, filterByPrice } from "./components/car.js";
import { createReplica } from "./examples/replica.js";
import { createFace, animateFace } from "./examples/createface.js";
import { barchartPopulation } from "./examples/barchartPopulation.js";
window.addEventListener("DOMContentLoaded", function() {
  // cars basic js
  d3.json("./data/cars.json").then(displayToDOM);

  function displayToDOM(data) {
    document.getElementById("carsData").innerText = JSON.stringify(
      data,
      null,
      4
    );

    document.getElementById("formatCar").innerText = data.reduce((acc, d) => {
      acc += formatCar(d) + "\n";
      return acc;
    }, "");
    document.getElementById("filterCarPrice").innerText = JSON.stringify(
      filterByPrice(data, 2000),
      null,
      4
    );
  }

  // replica
  createReplica();
  // face
  createFace();
  // reset animation for face
  document
    .querySelector("#face-animation-btn")
    .addEventListener("click", () => {
      animateFace();
    });

  // bar chart
  barchartPopulation();
});
