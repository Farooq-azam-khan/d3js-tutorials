const colorScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#e8e558"]);

const radiusScale = d3
  .scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([50, 30]);

const xPosition = (d, i) => i * 120 + 60;
export const fruitBowlRender = (selection, props) => {
  const {
    fruits,
    height,
    onClick,
    selectedFruit,
    setSelectedFruit,
    hoverSelect
  } = props;
  const bowl = selection
    .selectAll("rect")
    .data([null])
    .enter()
    .append("rect")
    .attr("y", 110)
    .attr("width", 900)
    .attr("height", 300)
    .attr("rx", 300 / 2)
    .attr("fill", "#e5ddbc");

  const circles = selection.selectAll("circle").data(fruits, d => d.id);

  circles
    .enter()
    .append("circle")
    .attr("cx", xPosition)
    .attr("cy", height / 2)
    .attr("r", 0)
    .merge(circles)
    .attr("fill", d => colorScale(d.type))
    .on("click", d => {
      onClick(d.id);
    })
    .on("mouseover", d => {
      setSelectedFruit(d.id);
    })
    .on("mouseout", () => {
      setSelectedFruit(null);
    })
    .attr("stroke", d => {
      if (selectedFruit && d.id == selectedFruit) {
        return "black";
      }
      if (hoverSelect && d.id == hoverSelect) {
        return "green";
      }
      return "none";
    })
    .attr("stroke-width", 5)
    .transition()
    .duration(1000)
    .attr("cx", xPosition)
    .attr("r", d => radiusScale(d.type));

  //   circles
  //     .attr("fill", d => colorScale(d.type))
  //     .attr("r", d => radiusScale(d.type));

  circles
    .exit()
    // .attr("fill", "black")
    .transition()
    .duration(500)
    .attr("r", 0)
    .remove();
};

const height = document.querySelector("#interaction").clientHeight;

const makeFruit = type => ({ type, id: Math.random() });

export const fruitInteraction = props => {
  const { startAnimation } = props;
  let fruits = d3.range(5).map(() => makeFruit("apple"));
  const svg = d3.select("#interaction").attr("height", height);

  let selectedFruit;
  const onClick = id => {
    selectedFruit = id;

    render();
  };

  let hoverSelect;

  const setSelectedFruit = id => {
    hoverSelect = id;
    render();
  };

  const render = () => {
    fruitBowlRender(svg, {
      fruits,
      height,
      onClick,
      selectedFruit,
      setSelectedFruit,
      hoverSelect
    });
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
