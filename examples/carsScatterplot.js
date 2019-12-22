const width = document.querySelector("#face").clientWidth;
const height = document.querySelector("#face").clientHeight;

export const carsScatterPlot = function() {
  d3.csv("../data/auto-mpg.csv").then(data => {
    // process data
    console.log({ data });
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;
    });
    render(data);
  });
};

const render = data => {
  const svg = d3.select("#cars-scatter-plot");
  const title = "Top 10 Most Populous Countries";
  const xAxisLabel = "Horsepower";
  const yAxisLabel = "Weight";
  const margin = { top: 60, bottom: 70, left: 150, right: 50 };
  const circleRadius = 10;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xValue = d => d.weight;
  const yValue = d => d.horsepower;

  // get the range for x range
  const xScale = d3
    .scaleLinear()
    // .domain([d3.min(data, xValue), d3.max(data, xValue)])
    // alternative
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  // x axis
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.format(".3s"))
    .tickSize(-innerHeight)
    .tickPadding(20);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight])
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

  g.append("text")
    .text(title)
    .attr("class", "plot-title")
    .attr("y", -10);
};
