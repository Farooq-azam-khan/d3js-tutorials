export const blankCanvas = function(props) {
  const { id } = props;
  const width = document.querySelector(id).clientWidth;
  const height = document.querySelector(id).clientHeight;

  const svg = d3
    .select(id)
    .attr("width", width)
    .attr("height", height);
  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("rx", 40);
};
