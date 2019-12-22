export const areaplot = props => {
  const { dataSource, processData } = props;
  d3.csv(dataSource).then(data => {
    // process data
    const processedData = processData(data);
    render(processedData, props);
  });
};
const render = (data, props) => {
  const {
    svgId,
    showStroke,
    showPoints,
    strokeWeight,
    title,
    xAxisLabel,
    yAxisLabel,
    margin,
    yColumnData,
    xColumnData,
    xtickPaddingAmount,
    ytickPaddingAmount,
    circleRadius
  } = props;

  const width = document.querySelector(svgId).clientWidth;
  const height = document.querySelector(svgId).clientHeight;

  const svg = d3.select(svgId);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xValue = d => d[xColumnData];
  const yValue = d => d[yColumnData];
  // get the range for x range
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  // x axis
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(9)
    .tickSize(-innerHeight)
    .tickPadding(xtickPaddingAmount);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
    .nice();
  // y axis
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickFormat(d3.format(".3s"))
    .tickPadding(ytickPaddingAmount);

  //   yAxis(g.append("g"));
  // short hand for above

  // Add the axis
  const yAxisG = g.append("g").call(yAxis);

  yAxisG
    .append("text")
    .attr("class", "axis-label-scatterplot")
    .attr("y", -50)
    .attr("x", -(innerHeight / 2))
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text(yAxisLabel);

  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(${0}, ${innerHeight})`);

  xAxisG
    .append("text")
    .attr("class", "axis-label-scatterplot")
    .attr("y", 60)
    .attr("x", innerWidth / 2)
    .text(xAxisLabel);

  const areaGenerator = d3
    .area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  const linePath = g
    .append("path")
    .attr("class", "area-plot")
    .attr("d", areaGenerator(data))
    .attr("fill", "#688BAB")
    .attr("stroke", showStroke ? "black" : "none")
    .attr("stroke-width", showStroke ? strokeWeight : 0);

  if (showPoints) {
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "scatterplot-circle")
      // returns the y value for each rectangle
      .attr("cy", d => yScale(yValue(d)))
      // gets the range for the xScale
      .attr("cx", d => xScale(xValue(d)))
      // keeps track of width of the bandwidth on the y scale
      .attr("r", circleRadius);
  }
  svg
    .append("text")
    .text(title)
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("class", "plot-title")
    .attr("y", 50);
};
