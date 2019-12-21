export const createReplica = function() {
  const replica = d3.select("#d3-test");
  replica.attr("height", 520);
  replica
    .append("circle")
    .attr("r", 100)
    .attr("cx", 100)
    .attr("cy", 100);

  replica
    .append("rect")
    .attr("x", 250)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 200);

  replica
    .append("circle")
    .attr("r", 100)
    .attr("cx", 100)
    .attr("cy", 350)
    .attr("fill", "#fabfab");

  replica
    .append("rect")
    .attr("x", 250)
    .attr("y", 250)
    .attr("width", 100)
    .attr("height", 200)
    .attr("fill", "#fabfab");

  const groupCR = replica
    .append("g")
    .attr("fill", "#2afbaf")
    .attr("stroke", "#345345");

  groupCR
    .append("circle")
    .attr("r", 100)
    .attr("cx", 500)
    .attr("cy", 100)
    .attr("stroke-width", 2);
  groupCR
    .append("rect")
    .attr("x", 650)
    .attr("y", 0)
    .attr("width", 100)
    .attr("height", 200);

  replica
    .append("line")
    .attr("x1", 380)
    .attr("y1", 0)
    .attr("x2", 380)
    .attr("y2", 520)
    .attr("stroke", "red")
    .attr("stroke-weight", 2);

  replica
    .append("path")
    .attr("stroke", "orange")
    .attr("stroke-width", 3)
    .attr("fill", "none")
    .attr("d", "M 0,220 L 900,220 L 900,510 L 380,510 L 900, 220");

  replica
    .append("path")
    .attr("stroke", "green")
    .attr("stroke-width", 1)
    .attr("fill", "#ab5ab5")
    .attr("d", "M 900,220 L 900,510 L 380,510 L 900, 220");
};
