const eyeRadius = 30;
const eyeHeight = 60;
const eyeOffset = 80;
const mouthOffset = 10;
const eyeBrowAngleOffset = Math.PI / 6;
const eyeBrowXOffset = eyeOffset;
const eyeBrowYOffset = 60;
const timeTranstion = 2000;
const width = document.querySelector("#face").clientWidth;
const height = document.querySelector("#face").clientHeight;
export const createFace = function() {
  // const width = 960;
  // const height = 520;

  // console.log({ width, height });
  const svg = d3.select("#face").attr("height", height);
  const face = svg
    .append("circle")
    .attr("r", 200)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("fill", "yellow")
    .attr("stroke", "black");

  const eyeGroup = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`)
    .attr("fill", "black");

  eyeGroup
    .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", -eyeOffset) // 350
    .attr("cy", -60)
    .attr("fill", "black");

  eyeGroup
    .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", eyeOffset)
    .attr("cy", -eyeHeight)
    .attr("fill", "black");

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2 + mouthOffset})`);
  const arc = d3.arc();
  const mouth = g.append("path").attr(
    "d",
    arc({
      innerRadius: 130,
      outerRadius: 150,
      startAngle: Math.PI / 2,
      endAngle: (3 * Math.PI) / 2
    })
  );

  const eyebrowGroup = svg
    .append("g")
    .attr("id", "eye-brow-group")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
  eyebrowGroup
    .append("path")
    .attr("transform", `translate(${-eyeBrowXOffset}, ${-eyeBrowYOffset})`)
    .attr(
      "d",
      arc({
        innerRadius: 40,
        outerRadius: 50,
        startAngle: Math.PI / 2 - eyeBrowAngleOffset,
        endAngle: -Math.PI / 2 + eyeBrowAngleOffset
      })
    );

  const rightEyebrow = eyebrowGroup
    .append("path")
    .attr("id", "right-eyebrow")
    .attr("transform", `translate(${eyeBrowXOffset}, ${-eyeBrowYOffset})`)
    .attr(
      "d",
      arc({
        innerRadius: 40,
        outerRadius: 50,
        startAngle: Math.PI / 2 - eyeBrowAngleOffset,
        endAngle: -Math.PI / 2 + eyeBrowAngleOffset
      })
    );
};

export const animateFace = () => {
  d3.select("#right-eyebrow")
    .transition()
    .duration(timeTranstion)
    .attr("transform", `translate(${eyeBrowXOffset}, ${-1.4 * eyeBrowYOffset})`)
    .transition()
    .duration(timeTranstion)
    .attr("transform", `translate(${eyeBrowXOffset}, ${-eyeBrowYOffset})`);
  const eyebrowGroup = d3.select("#eye-brow-group");
  console.log(eyebrowGroup);
  eyebrowGroup
    .transition()
    .delay(timeTranstion * 2)
    .duration(timeTranstion)
    .attr("transform", `translate(${width / 2}, ${height / 2 - 10})`);

  eyebrowGroup
    .transition()
    .delay(timeTranstion * 3)
    .duration(timeTranstion)
    .attr("transform", `translate(${0}, ${0})`);
};
