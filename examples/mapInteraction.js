export const createMapInter = () => {
  const width = document.querySelector("#map-interaction").clientWidth;
  const height = document.querySelector("#map-interaction").clientHeight;
  const svg = d3.select("#map-interaction");

  const projection = d3.geoNaturalEarth1();
  projection.translate([width / 2, height / 2]);
  projection.scale(width / 5.5);
  const pathGenerator = d3.geoPath().projection(projection);

  const g = svg.append("g");
  g.append("path")
    .attr("d", pathGenerator({ type: "Sphere" }))
    .attr("class", "sphere-path");

  // zooming
  svg.call(
    d3.zoom().on("zoom", () => {
      g.attr("transform", d3.event.transform);
    })
  );
  // got from: https://unpkg.com/browse/world-atlas@1.1.4/world/
  const detail_value = 50; // 50 or 110
  Promise.all([
    d3.tsv(`https://unpkg.com/world-atlas@1.1.4/world/${detail_value}m.tsv`),
    d3.json(`https://unpkg.com/world-atlas@1.1.4/world/${detail_value}m.json`)
  ]).then(([tsvData, topoJsonData]) => {
    const countries = topojson.feature(
      topoJsonData,
      topoJsonData.objects.countries
    );
    const countryName = tsvData.reduce((acc, d) => {
      acc[d.iso_n3] = d.name;
      return acc;
    }, {});
    const paths = g.selectAll("path").data(countries.features);
    paths
      .enter()
      .append("path")
      .attr("class", "geo-paths")
      .attr("d", pathGenerator)
      .append("title")
      .text(d => countryName[d.id])
      .attr("fill", "brown");
  });
};
