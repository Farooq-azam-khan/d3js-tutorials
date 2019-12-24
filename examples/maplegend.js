import { loadAndProcessData } from "../components/processMapData.js";
import { colorLegend } from "../components/colorlegend.js";

export const mapLegend = () => {
  const width = document.querySelector("#map-legend").clientWidth;
  const height = document.querySelector("#map-legend").clientHeight;
  const svg = d3.select("#map-legend");

  const projection = d3.geoNaturalEarth1();
  projection.translate([width / 2, height / 2]);
  projection.scale(width / 5.5);
  const pathGenerator = d3.geoPath().projection(projection);

  const g = svg.append("g");
  g.append("path")
    .attr("d", pathGenerator({ type: "Sphere" }))
    .attr("class", "sphere-path");

  // zooming
  svg.call(
    d3.zoom().on("zoom", () => {
      g.attr("transform", d3.event.transform);
    })
  );
  //   color legend
  const colorLegendG = svg
    .append("g")
    .attr("transform", `translate(${30}, ${330})`);

  const colorScale = d3.scaleOrdinal();

  const colorValue = d => d.properties.economy;

  loadAndProcessData().then(countries => {
    colorScale
      .domain(countries.features.map(colorValue))
      .domain(
        colorScale
          .domain()
          .sort()
          .reverse()
      )
      .range(d3.schemeSpectral[colorScale.domain().length]);

    colorLegendG.call(colorLegend, {
      colorScale,
      circleRadius: 10,
      textOffset: 40,
      spacing: 25,
      textsize: "1rem",
      backgroundRectWidth: 260
    });

    const paths = g.selectAll("path").data(countries.features);
    paths
      .enter()
      .append("path")
      .attr("class", "geo-paths2")
      .attr("fill", d => colorScale(colorValue(d)))
      .attr("d", pathGenerator)
      .append("title")
      .text(d => d.properties.name + "\n" + colorValue(d))
      .attr("fill", "brown");
  });
};
