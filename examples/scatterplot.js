const width = document.querySelector("#face").clientWidth;
const height = document.querySelector("#face").clientHeight;

export const scatterPlot = function() {
  d3.csv("data/population_by_country.csv").then(data => {
    // process data
    data.forEach(d => {
      d.population = +d.population * 1000;
    });
    render(data);
  });
};

const render = data => {
  const svg = d3.select("#scatterplot");
  const title = "Top 10 Most Populous Countries";
  const margin = { top: 60, bottom: 70, left: 150, right: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xValue = d => d.population;
  const yValue = d => d.country;

  // get the range for x range
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  // x axis
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.format(".3s"))
    .tickSize(-innerHeight);

  const yScale = d3
    .scalePoint()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.5);
  // y axis
  const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth);

  //   yAxis(g.append("g"));
  // short hand for above

  // Add the axis
  g.append("g").call(yAxis);

  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(${0}, ${innerHeight})`);

  xAxisG
    .append("text")
    .attr("y", 60)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .text("Population");

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
    .attr("r", 18);

  svg
    .append("text")
    .text(title)
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("class", "plot-title")
    .attr("y", 50);
};
