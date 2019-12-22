const width = document.querySelector("#face").clientWidth;
const height = document.querySelector("#face").clientHeight;

export const areaPlotPop = function() {
  d3.csv(
    "https://vizhub.com/curran/datasets/world-population-by-year-2015.csv"
  ).then(data => {
    // process data
    data.forEach(d => {
      d.year = new Date(d.year);
      d.population = +d.population;
    });
    render(data);
  });
};

const render = data => {
  const svg = d3.select("#area-population");
  const title = "World Population";
  const xAxisLabel = "Year";
  const yAxisLabel = "Population";
  const margin = { top: 60, bottom: 70, left: 100, right: 50 };
  const circleRadius = 3;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const addPoints = false;
  const showFill = false;
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xValue = d => d.year;
  const yValue = d => d.population;

  // get the range for x range
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  // x axis
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(13)
    .tickSize(-innerHeight)
    .tickPadding(20);

  const yScale = d3
    .scaleLinear()

    .domain([0, d3.max(data, yValue)])
    .range([innerHeight, 0])
    .nice();
  // y axis
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickFormat(d3.format(".2s"))
    .tickPadding(10);

  //   yAxis(g.append("g"));
  // short hand for above

  const areaGenerator = d3
    .area()
    .x(d => xScale(xValue(d)))
    .y0(innerHeight)
    .y1(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  const linePath = g
    .append("path")
    .attr("class", "area-plot")
    .attr("d", areaGenerator(data));

  if (showFill) {
    linePath.attr("fill", "#688BAB");
  } else {
    linePath.attr("fill", "none");
  }
  if (addPoints) {
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
  // Add the axis
  const yAxisG = g.append("g").call(yAxis);

  yAxisG
    .append("text")
    .attr("class", "axis-label-scatterplot")
    .attr("y", -70)
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

  svg
    .append("text")
    .text(title)
    .attr("x", width / 2)
    .attr("class", "plot-title")
    .attr("y", 50);
};
