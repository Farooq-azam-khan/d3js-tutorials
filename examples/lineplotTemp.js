const width = document.querySelector("#face").clientWidth;
const height = document.querySelector("#face").clientHeight;

export const linePlotTemp = function(props) {
  d3.csv(
    "https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv"
  ).then(data => {
    // process data
    data.forEach(d => {
      d.timestamp = new Date(d.timestamp);
      d.temperature = +d.temperature;
    });
    render(data, props);
  });
};

const render = (data, props) => {
  let { showFill, showPoints } = props;

  const svg = d3.select("#lineplot-temp");
  const title = "Week of Temp in San-Fran";
  const xAxisLabel = "TimeStamp";
  const yAxisLabel = "Temperature";
  const margin = { top: 60, bottom: 70, left: 150, right: 50 };
  const circleRadius = 3;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xValue = d => d.timestamp;
  const yValue = d => d.temperature;

  // get the range for x range
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  // x axis
  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(20);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();
  // y axis
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

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

  const lineGenerator = d3
    .line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  const linePath = g
    .append("path")
    .attr("class", "line-plot")
    .attr("d", lineGenerator(data));

  if (showFill) {
    linePath.attr("fill", "#688BAB");
  } else {
    linePath.attr("fill", "none");
  }
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
