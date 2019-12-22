export const createMapBeg = () => {
  const width = document.querySelector("#map-beg").clientWidth;
  const height = document.querySelector("#map-beg").clientHeight;
  const svg = d3.select("#map-beg");

  const projection = d3.geoNaturalEarth1(); //geoEquirectangular(); // d3.geoMercator();
  projection.scale(width / 6.3);
  projection.translate([width / 2, height / 2]);

  const pathGenerator = d3.geoPath().projection(projection);

  svg
    .append("path")
    .attr("d", pathGenerator({ type: "Sphere" }))
    .attr("class", "sphere-path");

  d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(data => {
    const countries = topojson.feature(data, data.objects.countries);
    const paths = svg.selectAll("path").data(countries.features);
    paths
      .enter()
      .append("path")
      .attr("class", "geo-paths")
      .attr("d", pathGenerator);

    const tweakSvg = d3.select("#map-tweaks");
    const favProjec = d3.geoOrthographic(); //geoBerghaus(); //geoBromley();
    const favPathGen = d3.geoPath().projection(favProjec);

    tweakSvg
      .append("path")
      .attr("d", favPathGen({ type: "Sphere" }))
      .attr("fill", "skyblue");
    const tweaksPaths = tweakSvg.selectAll("path").data(countries.features);
    tweaksPaths
      .enter()
      .append("path")
      .attr("d", d => favPathGen(d));
  });
};
