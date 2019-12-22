import { formatCar, filterByPrice } from "./components/car.js";
import { createReplica } from "./examples/replica.js";
import { createFace, animateFace } from "./examples/createface.js";
import { barchartPopulation } from "./examples/barchartPopulation.js";
import { scatterPlot } from "./examples/scatterplot.js";
import { carsScatterPlot } from "./examples/carsScatterplot.js";
import { temperatureScatterPlot } from "./examples/temperatureScatterplot.js";
import { linePlotTemp } from "./examples/lineplotTemp.js";
import { areaPlotTemp } from "./examples/areaChartTemp.js";
import { areaPlotPop } from "./examples/areaChartPopulation.js";

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
  // scatter plot
  scatterPlot();
  // cars scatterplot
  carsScatterPlot();
  // temperature scatterplot
  temperatureScatterPlot();

  // temp lin plot;
  linePlotTemp();

  // area plot for temp
  areaPlotTemp();
  // population area plot
  areaPlotPop();
});
