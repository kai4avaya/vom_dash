import * as Plot from "@observablehq/plot";

export function createAnimatedAreaGraph(container, chaosLevel = 1) {
  const numPoints = 60;
  const now = new Date();
  let data = Array(numPoints).fill().map((_, i) => ({
    date: new Date(now.getTime() - (numPoints - 1 - i) * 1000),
    value: 5 + (i * 0.2) + (Math.random() - 0.5) * 0.5
  }));

  function formatTime(date) {
    return date.toTimeString().split(' ')[0];
  }

  function updateData() {
    const now = new Date();
    const newValue = 5 + 
                     ((data.length - 1) * 0.2) + // Slight increase trend
                     (Math.sin(now.getTime() / 1000) * 0.2 * chaosLevel) + 
                     (Math.sin(now.getTime() / 2000) * 0.1 * chaosLevel) +
                     (Math.random() - 0.5) * 0.2 * chaosLevel;
    data = [
      ...data.slice(1),
      {
        date: now,
        value: Math.max(1, Math.min(20, newValue)) // Increased upper limit to allow for more variation
      }
    ];
  }
  
  function calculateYDomain() {
    const maxValue = Math.max(...data.map(d => d.value));
    const minYDomain = Math.max(2, maxValue + 1); // Ensure minimum y-axis is at least 2
    const maxYDomain = Math.max(minYDomain, 2 + chaosLevel); // Scale with chaos level
    return [0, maxYDomain];
  }

  function renderChart() {
    const yDomain = calculateYDomain();
    const chart = Plot.plot({
      title: "Agent Well-being",
      width: container.clientWidth,
      height: 400,
      y: {
        domain: yDomain,
        label: "Stress Level (sentiment analysis)",
        grid: true
      },
      x: {
        type: "time",
        label: "Time",
        tickFormat: formatTime,
        domain: [data[0].date, data[data.length - 1].date]
      },
      marks: [
        Plot.areaY(data, {
          x: "date",
          y: "value",
          fill: "black",
          fillOpacity: 1,
          stroke: "black",
          strokeWidth: 2,
          curve: "natural"
        }),
      ]
    });
    
    container.innerHTML = '';
    container.appendChild(chart);
  }
  
  function animate() {
    updateData();
    renderChart();
    requestAnimationFrame(animate);
  }
  
  // Initial render
  renderChart();
  
  // Start animation
  animate();
  
  // Function to update chaos level
  return function updateChaosLevel(newLevel) {
    chaosLevel = newLevel;
  };
}