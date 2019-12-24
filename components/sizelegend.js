export const sizeLegend = (selection, props) => {
  const {
    sizeScale,
    textOffset,
    spacing,
    tickAmount,
    circleColor,
    ascending,
    textsize
  } = props;

  const tickData = sizeScale.ticks(tickAmount).filter(d => d != 0);
  if (ascending) {
    tickData.reverse();
  }
  const groups = selection.selectAll("g").data(tickData);

  const groupsEnter = groups.enter().append("g");
  groupsEnter.merge(groups).attr("transform", (d, i) => {
    return `translate(${0}, ${i * spacing})`;
  });

  const circle = groups.select("circle");
  groupsEnter
    .append("circle")
    .attr("fill", circleColor)
    .attr("opacity", 0.7)
    .merge(circle)
    .attr("r", sizeScale);

  const text = groups.select("text");
  groupsEnter
    .append("text")
    .attr("class", "legend-tick-text")
    .style("font-size", textsize)
    .merge(text)
    .text(d => d)
    .attr("x", d => sizeScale(d) + textOffset)
    .attr("dy", "0.32em");
};
