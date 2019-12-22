import { areaplot } from "../components/areaplot.js";

export const areaPlotPop = function(props) {
  const dataSource =
    "https://vizhub.com/curran/datasets/world-population-by-year-2015.csv";
  const processData = data => {
    return data.map(d => {
      const year = new Date(d.year);
      const population = +d.population;
      const ret = { year, population };
      return ret;
    });
  };
  areaplot({
    dataSource,
    processData,
    svgId: "#area-population",
    showStroke: false,
    showPoints: false,
    strokeWeight: 1,
    title: "World Population",
    xAxisLabel: "Year",
    yAxisLabel: "Population",
    margin: { top: 60, bottom: 70, left: 100, right: 50 },
    xColumnData: "year",
    yColumnData: "population",
    tickPaddingAmount: 10,
    circleRadius: 3,
    xtickPaddingAmount: 20,
    ytickPaddingAmount: 5
  });
};
