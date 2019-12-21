import { formatCar, filterByPrice } from "./components/car.js";

d3.json("./data/cars.json").then(displayToDOM);

function displayToDOM(data) {
  document.getElementById("carsData").innerText = JSON.stringify(data, null, 4);

  document.getElementById("formatCar").innerText = data.map(formatCar);
  document.getElementById("filterCarPrice").innerText = JSON.stringify(
    filterByPrice(data, 2000)
  );
}
