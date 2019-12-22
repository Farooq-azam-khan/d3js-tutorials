export const loadAndProcessData = function(props) {
  const { dataSource, processData } = props;
  let processedData;
  return d3.csv(dataSource).then(data => {
    // process data
    processedData = processData(data);
  });
};
