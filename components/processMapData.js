// got from: https://unpkg.com/browse/world-atlas@1.1.4/world/
const detail_value = 50; // 50 or 110

export const loadAndProcessData = () =>
  Promise.all([
    d3.tsv(`https://unpkg.com/world-atlas@1.1.4/world/${detail_value}m.tsv`),
    d3.json(`https://unpkg.com/world-atlas@1.1.4/world/${detail_value}m.json`)
  ]).then(([tsvData, topoJsonData]) => {
    const countries = topojson.feature(
      topoJsonData,
      topoJsonData.objects.countries
    );

    const countryRowById = tsvData.reduce((acc, d) => {
      acc[d.iso_n3] = d;
      return acc;
    }, {});

    countries.features.forEach(d => {
      Object.assign(d.properties, countryRowById[d.id]);
    });
    return countries;
  });
