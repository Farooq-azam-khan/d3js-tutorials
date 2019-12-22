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

let lineplotTempState = {
  showFill: false,
  showPoints: false
};

const clearPlot = function(id) {
  const groups = document.getElementById(id).querySelectorAll("g");
  groups.forEach(val => {
    val.innerHTML = "";
  });
};
document.getElementById("show-points").addEventListener("click", () => {
  clearPlot("lineplot-temp");
  lineplotTempState.showPoints = !lineplotTempState.showPoints;

  linePlotTemp(lineplotTempState);
});
document.getElementById("show-fill").addEventListener("click", () => {
  clearPlot("lineplot-temp");
  lineplotTempState.showFill = !lineplotTempState.showFill;

  linePlotTemp(lineplotTempState);
});

let tempAreaPlot = {
  showStroke: false,
  strokeWeight: 2,
  showPoints: false
};

document.getElementById("show-stroke").addEventListener("click", () => {
  clearPlot("area-temp");
  tempAreaPlot.showStroke = !tempAreaPlot.showStroke;
  areaPlotTemp(tempAreaPlot);
});
document
  .getElementById("show-points-areaplot")
  .addEventListener("click", () => {
    clearPlot("area-temp");
    tempAreaPlot.showPoints = !tempAreaPlot.showPoints;
    areaPlotTemp(tempAreaPlot);
  });
document
  .getElementById("adjust-stroke-weight-area-temp")
  .addEventListener("change", () => {
    if (tempAreaPlot.showStroke) {
      clearPlot("area-temp");
      tempAreaPlot.strokeWeight = document.getElementById(
        "adjust-stroke-weight-area-temp"
      ).value;
      areaPlotTemp(tempAreaPlot);
    }
  });

window.addEventListener("DOMContentLoaded", function() {
  // TODO: get a state base approach for interatcion
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
  // listen for actions

  linePlotTemp(lineplotTempState);

  // area plot for temp
  areaPlotTemp(tempAreaPlot);
  // population area plot
  areaPlotPop();
});
