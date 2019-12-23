export const lineplotCosine = props => {
  const { id, title, lower, upper } = props;

  // generate data for cosine ([{x,y}])
  const data = generateData(props);

  const xAxisLabel = "time";
  const yAxisLabel = "amplitude";

  const margin = { top: 100, bottom: 75, left: 60, right: 50 };
  const height = 512; //document.getElementById(id.replace("#", "")).clientHeight;
  const width = document.getElementById(id.replace("#", "")).clientWidth;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const svg = d3
    .select(id)
    .attr("height", height)
    .attr("width", width);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("width", innerWidth)
    .attr("height", innerHeight);

  const xValue = d => d.x;
  const yValue = d => d.y;

  //   x and y scales
  const xScale = d3
    .scaleLinear()
    .domain([lower, upper])
    .range([0, innerWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  // x and y axis
  const xAxis = d3
    .axisBottom(xScale)
    // .tickSize(-innerHeight/2)
    .tickPadding(5);

  const yAxis = d3
    .axisLeft(yScale)
    // .tickSize(-innerWidth)
    .tickPadding(5);

  // x axis and y axis groups
  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(${0}, ${innerHeight / 2})`);

  xAxisG
    .append("text")
    .attr("class", "axis-label-scatterplot")
    .attr("y", innerHeight - 100)
    .attr("x", innerWidth / 2)
    .text(xAxisLabel);

  const yAxisG = g
    .append("g")
    .call(yAxis)
    .attr("transform", `translate(${innerWidth / 2}, ${0})`);

  yAxisG
    .append("text")
    .attr("class", "axis-label-scatterplot")
    .attr("y", -innerWidth / 1.9)
    .attr("x", -(innerHeight / 2))
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text(yAxisLabel);

  const lineGenerator = d3
    .line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  const linePath = g
    .append("path")
    .attr("class", "line-plot")
    .attr("fill", "none")
    .attr("d", lineGenerator(data));

  svg
    .append("text")
    .text(title)
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("class", "plot-title")
    .attr("y", 50);
};

const generateData = props => {
  const { lower, upper, dt, func } = props;
  const xs = d3.range(lower, upper, dt);
  const ys = xs.map(func);

  let data = [];
  for (let i = 0; i < xs.length; i++) {
    data.push({
      x: xs[i],
      y: ys[i]
    });
  }

  //   console.log({ xs, ys, data });
  return data;
};
