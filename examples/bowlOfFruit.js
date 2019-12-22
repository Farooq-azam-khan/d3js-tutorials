import { fruitBowlRender } from "../components/fruitBowl.js";

const height = document.querySelector("#bowl-of-fruit").clientHeight;

const makeFruit = type => ({ type, id: Math.random() });

export const bowloffruit = props => {
  const { startAnimation } = props;
  let fruits = d3.range(5).map(() => makeFruit("apple"));
  const svg = d3.select("#bowl-of-fruit").attr("height", height);

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
