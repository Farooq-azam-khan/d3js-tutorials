const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#e8e558"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([50, 30]);

export const fruitBowlRender = (selection, props) => {
  const { fruits, height } = props;

  const groups = selection
    .selectAll("g")
    .data(fruits, d => d.id)
    .attr("class", "bowl-group");

  const groupsEnter = groups.enter().append("g");
  groupsEnter
    .attr("transform", (d, i) => `translate(${i * 120 + 100},${height / 2})`)

    .merge(groups)
    .transition()
    .duration(1000)
    .attr("transform", (d, i) => `translate(${i * 120 + 100},${height / 2})`);

  groups.exit().remove();

  const circles = groups.select("circle");
  groupsEnter
    .append("circle")
    .attr("r", 0)
    .merge(circles)
    .attr("fill", d => colorScale(d.type))
    .transition()
    .duration(1000)
    .attr("r", d => radiusScale(d.type));

  // .transition()
  // .attr("r", 0);

  const text = groups.select("text");

  groupsEnter
    .append("text")
    .attr("class", "label")
    .attr("y", 100)
    .merge(text)
    .text(d => d.type)
    .attr("text-anchor", "middle");
};

const height = document.querySelector("#bowl-of-fruit").clientHeight;

const makeFruit = type => ({ type, id: Math.random() });

export const nestedBowlOfFruit = props => {
  const { startAnimation } = props;
  let fruits = d3.range(5).map(() => makeFruit("apple"));
  const svg = d3.select("#nested-bowl-of-fruit").attr("height", height);

  const render = () => {
    fruitBowlRender(svg, { fruits, height });
  };
  // eat an apple
  if (startAnimation) {
    render();

    // eat the apple
    setTimeout(() => {
      fruits.pop();
      render(svg, { fruits });
    }, 1500);

    // replace apple with lemon
    setTimeout(() => {
      fruits[2].type = "lemon";
      render(svg, { fruits });
    }, 2000);

    setTimeout(() => {
      fruits = fruits.filter((d, i) => i !== 1);
      render();
    }, 3000);
  }
};
