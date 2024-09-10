import * as Plot from "@observablehq/plot";

export function createAnimatedAreaGraph(container, chaosLevel = 1) {
  const numPoints = 10;
  let data = Array(numPoints).fill().map((_, i) => ({
    x: i + 1,
    y: 5 + (i * 0.2) + (Math.random() - 0.5) * 0.5
  }));
  let time = 0;
  
  function updateData() {
    time += 0.05;
    const newValue = 5 + 
                     ((data.length - 1) * 0.2) + // Slight increase trend
                     (Math.sin(time) * 0.2 * chaosLevel) + 
                     (Math.sin(time * 0.5) * 0.1 * chaosLevel) +
                     (Math.random() - 0.5) * 0.2 * chaosLevel;
    data = [...data.slice(1), { x: 10, y: Math.max(1, Math.min(10, newValue)) }];
    data = data.map((d, i) => ({ ...d, x: i + 1 }));
  }
  
  function renderChart() {
    const chart = Plot.plot({
      title: "Agent Well-being",
      width: container.clientWidth,
      height: 400,
      y: {
        domain: [0, 10],
        label: "Stress Level (sentiment analysis)",
        grid: true
      },
      x: {
        domain: [1, 10],
        label: "Number of Engagements",
        grid: true
      },
      marks: [
        Plot.areaY(data, {
          x: "x",
          y: "y",
          fill: "magenta",
          fillOpacity: 1,
          // stroke: "black",
          fill: "black",
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
    setTimeout(() => requestAnimationFrame(animate), 200); // Slowed down to ~5 fps
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