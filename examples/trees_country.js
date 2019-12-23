export const treeByCountry = function(props) {
  const { id } = props;
  const width = document.querySelector(id).clientWidth;
  const height = document.querySelector(id).clientHeight;

  const treeLayout = d3.tree().size([height, width]);

  const svg = d3
    .select(id)
    .attr("width", width)
    .attr("height", height);

  // load tree data
  d3.json("data/tree.json").then(data => {
    const treeRoot = d3.hierarchy(data);
    const links = treeLayout(treeRoot).links();
    const linkPathGenerator = d3
      .linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    svg
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", linkPathGenerator);
  });
};
