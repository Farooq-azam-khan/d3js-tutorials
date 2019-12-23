export const plotLines = props => {
  const { id, lower, upper, title } = props;
  const datas = generateData(props);

  const height = document.getElementById(id.replace("#", "")).clientHeight;
  const width = document.getElementById(id.replace("#", "")).clientWidth;

  const svg = d3
    .select(id)
    .attr("height", height)
    .attr("width", width);

  const margin = { top: 90, bottom: 30, left: 30, right: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("height", innerHeight)
    .attr("width", innerWidth);

  //   g.append("rect")
  //     .attr("height", innerHeight)
  //     .attr("width", innerWidth)
  //     .attr("fill", "white");

  //   x and y values
  const xValue = d => d.x;
  const yValue = d => d.y;

  // x and y scale
  const xScale = d3
    .scaleLinear()
    .domain([lower, upper])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(datas[1], yValue))
    .range([innerHeight, 0]);

  // x and y axis
  const xAxis = d3.axisBottom(xScale).tickPadding(5);
  const yAxis = d3.axisLeft(yScale).tickPadding(5);

  // x andy group axis
  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(${0}, ${innerHeight / 2})`);

  const yAxisG = g
    .append("g")
    .call(yAxis)
    .attr("transform", `translate(${innerWidth / 2}, ${0})`);

  // line generator
  const lineGenerator = d3
    .line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  getLinePath(g, { datas, lineGenerator });
  // title
  svg
    .append("text")
    .text(title)
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("class", "plot-title")
    .attr("y", 50);

  svg.on("click", () => {
    g.selectAll(".to-update").attr("d", "");
    getLinePath(g, { datas, lineGenerator });
  });
};

export const getLinePath = (selection, props) => {
  const { datas, lineGenerator } = props;
  const n_random_colors = getNRandomColors(datas.length);

  for (let i = 0; i < datas.length; i++) {
    const data = datas[i];
    const linePath = selection
      .append("path")
      .attr("class", "to-update")
      .attr("stroke", n_random_colors[i])
      .attr("fill", "none")
      .attr("d", lineGenerator(data));
  }
};

const generateData = props => {
  const { lower, upper, dt, funcs } = props;

  const xs = d3.range(lower, upper, dt);
  let datas = [];
  for (let j = 0; j < funcs.length; j++) {
    const func = funcs[j];
    datas.push(
      xs.map(d => {
        return { x: d, y: func(d) };
      })
    );
  }
  return datas;
};

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const getNRandomColors = n => {
  const randCols = [];
  for (let i = 0; i < n; i++) {
    const col = getRandomColor();
    if (!randCols.includes(col)) {
      randCols[i] = col;
    }
  }
  return randCols;
};
