import * as Plot from "@observablehq/plot";

const chaosLevel = 1;  // You can change this value to increase/decrease fluctuation

// Generate synthetic data for multiple sensors
export function generateSensorData(numSensors = 10, hours = 50) {
  const data = [];
  for (let sensor = 0; sensor < numSensors; sensor++) {
    for (let hour = 0; hour <= hours; hour++) {
      data.push({
        hour: hour,
        value: Math.random() * 10,  // Random initial values
        sensor: `Sensor ${sensor + 1}`
      });
    }
  }
  return data;
}

// Fluctuate the data slightly based on the chaos level
function fluctuateData(data, chaos) {
  return data.map(d => ({
    ...d,
    value: Math.max(0, d.value + (Math.random() - 0.5) * chaos)  // Random fluctuation
  }));
}

// Function to create and update the line chart
export function createSensorLineGraph(container, initialData = null, { width = 500, height = 300, chaos = chaosLevel } = {}) {
  let data = initialData && Array.isArray(initialData) ? [...initialData] : generateSensorData();

  function updateChart() {
    const chart = Plot.plot({
      width,
      height,
      marginLeft: 60,
      marginBottom: 30,
      grid: true,
      x: { label: "Hour" },
      y: { label: "Sensor Value", domain: [0, 20] },
      color: { legend: true },
      marks: [
        Plot.lineY(data, { x: "hour", y: "value", stroke: "sensor", strokeWidth: 2 }),
        Plot.ruleY([0])  // Baseline
      ]
    });

    container.innerHTML = '';
    container.appendChild(chart);
  }

  function animate() {
    data = fluctuateData(data, chaos);
    data = data.map(d => ({ ...d, hour: d.hour + 1 }));  // Shift to the right

    updateChart();

    requestAnimationFrame(animate);  // Continue the animation
  }

  // Initial chart creation
  updateChart();

  // Start animation
  requestAnimationFrame(animate);

  // Return a function to update the data if needed
  return (newData) => {
    if (newData && Array.isArray(newData)) {
      data = newData;
      updateChart();
    } else {
      console.error("Invalid data provided to update the sensor graph");
    }
  };
}