const width = document.querySelector("#face").clientWidth;
const height = document.querySelector("#face").clientHeight;

export const barchartPopulation = function() {
  d3.csv("../data/population_by_country.csv").then(data => {
    // console.log(data);
    // process data
    data.forEach(d => {
      d.population = +d.population * 1000;
    });
    render(data);
  });
};

const render = data => {
  const svg = d3.select("#barchart-population");
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
    .range([0, innerWidth]);

  // x axis
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.format(".3s"))
    .tickSize(-innerHeight);

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);
  console.log(yScale.range());

  // y axis
  const yAxis = d3.axisLeft(yScale);

  //   yAxis(g.append("g"));
  // short hand for above

  // Add the axis
  g.append("g")
    .call(yAxis)
    // remove the dick from the y axis (removing doms after rendering them)
    // selecting multiple with comma and sub values with space
    .selectAll(".domain, .tick line")
    .remove();

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

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "barplot-rect")
    // returns the y value for each rectangle
    .attr("y", d => yScale(yValue(d)))
    // gets the range for the xScale
    .attr("width", d => xScale(xValue(d)))
    // keeps track of width of the bandwidth on the y scale
    .attr("height", yScale.bandwidth());

  g.append("text")
    .text(title)
    .attr("class", "plot-title")
    .attr("y", -10);
};
