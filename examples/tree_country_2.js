export const treeByCountry2 = function(props) {
  const { id } = props;
  const width = document.querySelector(id).clientWidth;
  const height = 700; //document.querySelector(id).clientHeight;
  const margin = { top: 10, bottom: 0, left: 80, right: 150 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const treeLayout = d3.tree().size([innerWidth, innerHeight]);

  const svg = d3
    .select(id)
    .attr("width", width)
    .attr("height", height);

  const zoomG = svg
    .append("g")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //   g.append("rect")
  //     .attr("height", innerHeight)
  //     .attr("width", innerWidth)
  //     .attr("fill", "white");

  const g = zoomG.append("g");
  svg.call(
    d3.zoom().on("zoom", () => {
      zoomG.attr("transform", d3.event.transform);
    })
  );
  // load tree data
  d3.json("data/tree.json").then(data => {
    const treeRoot = d3.hierarchy(data);
    const links = treeLayout(treeRoot).links();
    const linkPathGenerator = d3
      .linkHorizontal() //.linkVertical()
      .x(d => d.y)
      .y(d => d.x);

    g.selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "tree-links")
      .attr("d", linkPathGenerator);

    g.selectAll("text")
      .data(treeRoot.descendants())
      .enter()
      .append("text")
      //   .attr("class", "")
      .attr("x", d => d.y)
      .attr("y", d => d.x)
      .attr("dy", "0.32em")
      .attr("class", d => `tree-text depth-${d.depth}`)
      .attr("text-anchor", d => (d.children ? "middle" : "start"))
      .text(d => d.data.data.id);
  });
};
