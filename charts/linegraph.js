import * as Plot from "@observablehq/plot";

// Sample data (used if no data is provided)
const sampleLineData = Array.from({ length: 20 }, (_, i) => ({
  date: new Date(2023, 0, i + 1),
  value: Math.random() * 50 + 25
}));

export function createLineGraph(initialData = sampleLineData, { width = 500, height = 300 } = {}) {
  // Normalize the data structure
  let data = Array.isArray(initialData) && initialData.length > 0 && 'name' in initialData[0]
    ? initialData // It's already in the correct format
    : [{ name: "Series 1", values: initialData }]; // Wrap single series in an array

  function updateChart() {
    const flattenedData = data.flatMap(d => {
      if (!d.values || !Array.isArray(d.values)) {
        console.error("Invalid series data:", d);
        return [];
      }
      return d.values.map(v => ({ ...v, name: d.name }));
    });

    if (flattenedData.length === 0) {
      console.error("No valid data to display");
      return document.createElement('div'); // Return an empty div if no data
    }

    const chart = Plot.plot({
      width,
      height,
      marginLeft: 60,
      marginBottom: 30,
      grid: true,
      x: { type: "time", label: "Date" },
      y: { label: "Value" },
      color: { legend: true },
      marks: [
        Plot.line(flattenedData, {
          x: "date",
          y: "value",
          stroke: "name",
          strokeWidth: 2,
          curve: "natural"
        }),
        Plot.ruleY([0])
      ]
    });

    return chart;
  }

  function animate() {
    data = data.map(series => ({
      name: series.name,
      values: (series.values || []).map(d => ({
        date: d.date,
        value: Math.max(0, d.value + (Math.random() - 0.5) * 5)
      }))
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
