import * as d3 from "d3";

const initialPieData = [
  { category: "Category A", value: 30 },
  { category: "Category B", value: 50 },
  { category: "Category C", value: 20 },
];

export function createAnimatedPieChart(container, customData, {width = 400, height = 400} = {}) {
  let data = customData || [...initialPieData];
  const colors = d3.schemeCategory10;

  function createPieChart(t) {
    const radius = Math.min(width, height) / 2 * t;
    
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const labelArc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.8);

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const g = svg.append("g");

    const arcs = g.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("fill", (d, i) => colors[i % colors.length])
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.category}: ${d.data.value}`);

    arcs.append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "white")
      .text(d => d.data.category);

    return svg.node();
  }

  function updateChart() {
    const duration = 1000;
    const interpolate = d3.interpolate(0, 1);

    const animate = (time) => {
      const t = Math.min(1, interpolate(time / duration));
      container.innerHTML = '';
      container.appendChild(createPieChart(t));
      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  function updateData(newData) {
    data = newData;
    updateChart();
  }

  // Initial chart creation
  updateChart();

  // Set up interval for automatic updates
  setInterval(() => {
    const newData = data.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 100) + 1
    }));
    updateData(newData);
  }, 5000);

  return updateData;
}