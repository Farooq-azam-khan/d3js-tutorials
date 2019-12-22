const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#e8e558"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([50, 30]);

const xPosition = (d, i) => i * 120 + 60;
export const fruitBowlRender = (selection, props) => {
  const { fruits, height } = props;
  const circles = selection.selectAll("circle").data(fruits, d => d.id);

  circles
    .enter()
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .attr("r", 0)
    .merge(circles)
    .attr("fill", d => colorScale(d.type))
    .transition()
    .duration(1000)
    .attr("cx", xPosition)
    .attr("r", d => radiusScale(d.type));

  //   circles
  //     .attr("fill", d => colorScale(d.type))
  //     .attr("r", d => radiusScale(d.type));

  circles
    .exit()
    // .attr("fill", "black")
    .transition()
    .duration(500)
    .attr("r", 0)
    .remove();
};
