import { formatCar, filterByPrice } from "./components/car.js";
import { createReplica } from "./examples/replica.js";
import { createFace } from "./examples/createface.js";
import { barchartPopulation } from "./examples/barchartPopulation.js";
import { scatterPlot } from "./examples/scatterplot.js";
import { carsScatterPlot } from "./examples/carsScatterplot.js";
import { temperatureScatterPlot } from "./examples/temperatureScatterplot.js";
import { linePlotTemp } from "./examples/lineplotTemp.js";
import { areaPlotTemp } from "./examples/areaChartTemp.js";
import { areaPlotPop } from "./examples/areaChartPopulation.js";
import { bowloffruit } from "./examples/bowlOfFruit.js";
import { nestedBowlOfFruit } from "./examples/nestedElementsGeneralUpdatePattern.js";
import { fruitInteraction } from "./examples/interactionUniDirection.js";
import { createMapBeg } from "./examples/mapexample.js";
import { createMapInter } from "./examples/mapInteraction.js";
// import { blankCanvas } from "./components/blank_canvas.js";
import { treeByCountry } from "./examples/trees_country.js";
import { treeByCountry2 } from "./examples/tree_country_2.js";
import { lineplotCosine } from "./examples/cosineFunc.js";
import { plotLines } from "./components/multiLinePlot.js";
// import the state
import {
  lineplotTempState,
  generalPatternState,
  tempAreaPlot,
  fruitState
} from "./js/state.js";
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

document.getElementById("bowl-animation").addEventListener("click", () => {
  fruitState.startAnimation = true;
  bowloffruit(fruitState);
  document.getElementById("bowl-animation").disabled = true;
  setTimeout(() => {
    document.getElementById("bowl-animation").disabled = false;
  }, 3000);
});

document
  .getElementById("general-pattern-bowl-animation")
  .addEventListener("click", () => {
    generalPatternState.startAnimation = true;
    nestedBowlOfFruit(generalPatternState);
    document.getElementById("general-pattern-bowl-animation").disabled = true;
    setTimeout(() => {
      document.getElementById(
        "general-pattern-bowl-animation"
      ).disabled = false;
    }, 3000);
  });

function displayToDOM(data) {
  document.getElementById("carsData").innerText = JSON.stringify(data, null, 4);

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

window.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("pre code").forEach(block => {
    hljs.highlightBlock(block);
  });
  // TODO: get a state base approach for interatcion
  // cars basic js
  d3.json("./data/cars.json").then(displayToDOM);

  // replica
  createReplica();
  // face
  createFace();

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

  // draw cosine
  lineplotCosine({
    id: "#cosine",
    lower: -Math.PI,
    upper: Math.PI,
    dt: 0.01,
    func: Math.cos,
    title: "Sine(x)"
  });

  // multiline plots
  plotLines({
    id: "#sine-cosine",
    lower: -Math.PI,
    upper: Math.PI,
    dt: 0.01,
    title: "Sine(x) and Cosine(x)",
    funcs: [Math.cos, Math.sin]
  });

  // area plot for temp
  areaPlotTemp(tempAreaPlot);
  // population area plot
  areaPlotPop();

  // bowl of fruit: general update pattern
  bowloffruit(fruitState);

  // nested elements
  nestedBowlOfFruit(generalPatternState);
  // fruit interaction
  // interatcionState
  fruitInteraction({ startAnimation: true });

  // map with d3
  createMapBeg();
  // map interaction d3
  createMapInter();

  // blank canvas
  // blankCanvas({ id: "#blank-canvas" });
  treeByCountry({ id: "#tree-country" });
  treeByCountry2({ id: "#tree-country-2" });
});
