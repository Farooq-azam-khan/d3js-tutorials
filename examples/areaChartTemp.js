import { areaplot } from "../components/areaplot.js";

export const areaPlotTemp = function(props) {
  // areaplot(props);
  const { showStroke, showPoints, strokeWeight } = props;
  const dataSource =
    "https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv";
  const processData = data => {
    return data.map(d => {
      const timestamp = new Date(d.timestamp);
      const temperature = +d.temperature;
      const ret = { timestamp, temperature };
      return ret;
    });
  };
  areaplot({
    dataSource,
    processData,
    svgId: "#area-temp",
    showStroke,
    showPoints,
    strokeWeight,
    title: "Week of Temp in San-Fran",
    xAxisLabel: "Timestamp",
    yAxisLabel: "Temperature",
    margin: { top: 60, bottom: 70, left: 150, right: 50 },
    xColumnData: "timestamp",
    yColumnData: "temperature",
    tickPaddingAmount: 10,
    circleRadius: 4,
    xtickPaddingAmount: 20,
    ytickPaddingAmount: 10
  });
};
