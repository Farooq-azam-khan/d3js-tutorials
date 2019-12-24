import { colorLegend } from "../components/colorlegend.js";
import { sizeLegend } from "../components/sizelegend.js";

const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon", "lime", "orange"])
  .range(["#c11d1d", "#e8e558", "green", "orange"]);

const sizeScale = d3
  .scaleSqrt()
  .domain([0, 10]) // area
  .range([0, 50]); // radius

export const makeLegend = () => {
  const svg = d3.select("#legend");

  const height = 520;

  const translateY = height / 5;
  const translateX = 150;
  const circleRadius = 40;
  const textOffset = 50;
  const spacing = 110;

  const colorG = svg
    .append("g")
    .attr("transform", `translate(${translateX}, ${translateY})`);

  const sizeG = svg
    .append("g")
    .attr("transform", `translate(${600}, ${translateY})`);

  const render = () => {
    colorG.call(colorLegend, {
      colorScale,
      circleRadius,
      textOffset,
      spacing,
      textsize: "2rem",
      backgroundRectWidth: 250
    });

    sizeG.call(sizeLegend, {
      sizeScale,
      textOffset: 20,
      spacing: 90,
      tickAmount: 5,
      circleColor: "steelblue",
      ascending: true,
      textsize: "2rem"
    });
  };
  render();
};
