import * as Plot from "@observablehq/plot";


// Sample data for call center inbound calls
// Dataset 1: Very low-level data
const sampleCallData1 = [
  { category: "Chat", value: 130, avgValue: 120 },
  { category: "Messaging", value: 170, avgValue: 180 },
  { category: "Voice", value: 230, avgValue: 250 },
  { category: "Video", value: 90, avgValue: 80 },
  { category: "Email", value: 210, avgValue: 220 }
];

// Dataset 2: Slightly higher deviations
const sampleCallData2 = [
  { category: "Chat", value: 110, avgValue: 120 },
  { category: "Messaging", value: 190, avgValue: 180 },
  { category: "Voice", value: 270, avgValue: 250 },
  { category: "Video", value: 70, avgValue: 80 },
  { category: "Email", value: 230, avgValue: 220 }
];

// Dataset 3: Moderate deviations
const sampleCallData3 = [
  { category: "Chat", value: 100, avgValue: 120 },
  { category: "Messaging", value: 200, avgValue: 180 },
  { category: "Voice", value: 300, avgValue: 250 },
  { category: "Video", value: 60, avgValue: 80 },
  { category: "Email", value: 250, avgValue: 220 }
];

// Dataset 4: High deviations
const sampleCallData4 = [
  { category: "Chat", value: 80, avgValue: 120 },
  { category: "Messaging", value: 210, avgValue: 180 },
  { category: "Voice", value: 320, avgValue: 250 },
  { category: "Video", value: 50, avgValue: 80 },
  { category: "Email", value: 270, avgValue: 220 }
];

// Dataset 5: Very high deviations
const sampleCallData5 = [
  { category: "Chat", value: 60, avgValue: 120 },
  { category: "Messaging", value: 220, avgValue: 180 },
  { category: "Voice", value: 350, avgValue: 250 },
  { category: "Video", value: 40, avgValue: 80 },
  { category: "Email", value: 300, avgValue: 220 }
];


export function createBarChart(data = sampleCallData1, { width = 700, height = 400 } = {}) {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

  function updateChart() {
    return Plot.plot({
      width,
      height,
      marginLeft: 60,
      marginRight: 20,
      marginBottom: 50,
      marginTop: 20,
      grid: true,
      x: {
        label: null,
        tickRotate: 0
      },
      y: {
        label: "Number of Calls",
        domain: [0, Math.max(...data.map(d => Math.max(d.value, d.avgValue))) * 1.2]
      },
      marks: [
        Plot.barY(data, {
          x: d => d.category + "1",
          y: "value",
          fill: (d, i) => colors[i],
          title: d => `${d.category}: ${d.value.toFixed(0)}`,
          width: 20
        }),
        Plot.barY(data, {
          x: d => d.category + "2",
          y: "avgValue",
          fill: "gray",
          fillOpacity: 0.7,
          title: d => `Avg ${d.category}: ${d.avgValue.toFixed(0)}`,
          width: 20
        }),
        Plot.ruleY([0]),
        Plot.text(data, {
          x: d => d.category + "1",
          y: "value",
          text: d => d.value.toFixed(0),
          dy: -10
        }),
        Plot.text(data, {
          x: d => d.category + "2",
          y: "avgValue",
          text: d => d.avgValue.toFixed(0),
          dy: -10
        }),
        Plot.axisX({
          tickFormat: d => d.replace(/[12]$/, ""),
          ticks: data.flatMap(d => [d.category + "1", d.category + "2"]),
          tickSize: 0
        })
      ],
      style: {
        backgroundColor: "white",
        color: "black",
        fontFamily: "sans-serif"
      }
    });
  }

  let chart = updateChart();
  return chart;
}