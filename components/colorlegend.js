export const colorLegend = (selection, props) => {
  const {
    colorScale,
    circleRadius,
    spacing,
    textOffset,
    backgroundRectWidth,
    textsize
  } = props;

  const diameter = circleRadius * 2;
  const backgroundRect = selection.selectAll("rect").data([null]);
  const domainLength = colorScale.domain().length;
  backgroundRect
    .enter()
    .append("rect")
    .merge(backgroundRect)
    .attr("width", backgroundRectWidth)
    .attr("height", spacing * domainLength + diameter)
    .attr("fill", "white")
    .attr("x", -diameter)
    .attr("rx", 10)
    .attr("opacity", 0.8)
    .attr("y", -diameter);
  const domain = colorScale.domain();

  const groups = selection.selectAll("g").data(domain);
  const groupsEnter = groups.enter().append("g");
  groupsEnter.merge(groups).attr("transform", (d, i) => {
    return `translate(${0}, ${i * spacing})`;
  });

  //   todo add a rect
  //   groupsEnter
  //     .merge(groups)
  //     .append("rect")
  //     .attr("x", -circleRadius - 10)
  //     .attr("y", -circleRadius - 10)
  //     .attr("fill", "white")
  //     .attr("height", circleRadius * 3 + 10)
  //     .attr("width", circleRadius * 3 + textOffset );

  const circle = groups.select("circle");
  groupsEnter
    .append("circle")
    .attr("r", circleRadius)
    .merge(circle)
    .attr("fill", colorScale);

  const text = groups.select("text");
  groupsEnter
    .append("text")
    .attr("class", "legend-tick-text")
    .style("font-size", textsize)
    .merge(text)
    .text(d => d)
    .attr("x", textOffset)
    .attr("dy", "0.32em");

  groups.exit().remove();
};
