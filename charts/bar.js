import * as Plot from "@observablehq/plot";

// Sample data (used if no data is provided)
const sampleBarData = [
  { category: "A", value: 20 },
  { category: "B", value: 35 },
  { category: "C", value: 15 },
  { category: "D", value: 40 },
  { category: "E", value: 30 }
];

export function createBarChart(dataN = sampleBarData, { width = 500, height = 300 } = {}) {
  let data = dataN.map(d => ({ ...d }));

  function updateChart() {
    return Plot.plot({
      width,
      height,
      marginLeft: 60,
      marginBottom: 30,
      grid: true,
      x: { label: "Category" },
      y: { label: "Value", domain: [0, Math.max(...data.map(d => d.value)) * 1.2] },
      marks: [
        Plot.barY(data, {
          x: "category",
          y: "value",
          fill: "steelblue",
          title: d => `${d.category}: ${d.value.toFixed(2)}`
        }),
        Plot.ruleY([0])
      ]
    });
  }

  function animate() {
    data = data.map(d => ({
      ...d,
      value: Math.max(0, d.value + (Math.random() - 0.5) * 2)
    }));

    const updatedChart = updateChart();
    chart.replaceWith(updatedChart);
    Object.assign(chart, updatedChart);

    requestAnimationFrame(animate);
  }

  let chart = updateChart();
  requestAnimationFrame(animate);

  return chart;
}
