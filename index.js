import { formatCar } from "./components/car.js";

d3.json("./data/cars.json").then(
  data => (document.getElementById("carsData").innerText = JSON.stringify(data))
);

d3.json("./data/cars.json").then(
  data => (document.getElementById("formatCar").innerText = data.map(formatCar))
);
