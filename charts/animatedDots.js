import * as Plot from "@observablehq/plot";

export function createInteractiveScatterPlot(container, initialRedDots = 10, {width = 600, height = 400} = {}) {
  // Generate synthetic data
  const generateData = (count, isRed = false) => Array.from({length: count}, () => ({
    weight: Math.random() * 100 + 40,
    height: Math.random() * 0.9 + 1.3,
    sex: Math.random() > 0.5 ? "male" : "female",
    name: `Athlete ${Math.floor(Math.random() * 1000)}`,
    sport: ["Swimming", "Running", "Gymnastics", "Weightlifting"][Math.floor(Math.random() * 4)],
    isRed
  }));

  let data = [...generateData(100), ...generateData(initialRedDots, true)];

  function updateChart() {
    const chart = Plot.plot({
      width,
      height,
      x: {label: "Weight (kg)", domain: [40, 140]},
      y: {label: "Height (m)", domain: [1.3, 2.2]},
      color: {
        domain: ["male", "female", true],
        range: ["blue", "green", "red"]
      },
      marks: [
        Plot.dot(data, {
          x: "weight",
          y: "height",
          stroke: d => d.isRed ? "red" : d.sex,
          fill: d => d.isRed ? "red" : d.sex,
          fillOpacity: 0.5,
          r: 4,
          channels: {name: "name", sport: "sport"},
          tip: true
        })
      ]
    });

    container.innerHTML = '';
    container.appendChild(chart);
  }

  updateChart();

  // Function to add more red dots
  function addRedDots(count) {
    const newRedDots = generateData(count, true);
    data = [...data, ...newRedDots];
    updateChart();
  }

  return addRedDots; // Return the function to add more red dots
}