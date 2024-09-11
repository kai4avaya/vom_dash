// import * as Plot from "@observablehq/plot";

// export function createAnimatedLineGraph(container,chaosLevel=1) {
//   const numPoints = 10;
//   let data = Array(numPoints).fill().map(() => 5 + Math.random());
//   let time = 0;
  
//   function updateData() {
//     time += 0.05;
//     const newValue = 5 + 
//                      (Math.sin(time) * 0.1 * chaosLevel) + 
//                      (Math.sin(time * 0.5) * 0.05 * chaosLevel) +
//                      (Math.random() - 0.5) * 0.1 * chaosLevel;
//     data = [...data.slice(1), Math.max(1, Math.min(10, newValue))];
//   }
  
//   function renderChart() {
//     const chart = Plot.plot({
//       title: "Wait-time per Engagement",
//       width: container.clientWidth,
//       height: 400,
//       y: {
//         domain: [1, 10],
//         label: "Wait-time (minutes)",
//         grid: true
//       },
//       x: {
//         domain: [1, 10],
//         label: "Number of Engagements",
//         grid: true
//       },
//       marks: [
//         Plot.lineY(data.map((y, i) => ({x: i + 1, y})), {
//           x: "x",
//           y: "y",
//           curve: "natural",
//           stroke: "black",
//           strokeWidth: 2
//         }),

//       ]
//     });
    
//     container.innerHTML = '';
//     container.appendChild(chart);
//   }
  
//   function animate() {
//     updateData();
//     renderChart();
//     setTimeout(() => requestAnimationFrame(animate), 200); // Slowed down to ~5 fps
//   }
  
//   // Initial render
//   renderChart();
  
//   // Start animation
//   animate();
  
//   // Function to update chaos level
//   return function updateChaosLevel(newLevel) {
//     chaosLevel = newLevel;
//   };
// }

import * as Plot from "@observablehq/plot";

export function createAnimatedLineGraph(container, chaosLevel = 1) {
  const numPoints = 60; // Increased to match the example
  const now = new Date();
  let data = Array(numPoints).fill().map((_, i) => ({
    date: new Date(now.getTime() - (numPoints - 1 - i) * 1000),
    value: 5 + Math.random()
  }));

  function formatTime(date) {
    return date.toTimeString().split(' ')[0];
  }

  function updateData() {
    const now = new Date();
    const newValue = 5 +
      (Math.sin(now.getTime() / 1000) * 0.1 * chaosLevel) +
      (Math.sin(now.getTime() / 2000) * 0.05 * chaosLevel) +
      (Math.random() - 0.5) * 0.1 * chaosLevel;
    data = [
      ...data.slice(1),
      {
        date: now,
        value: Math.max(1, Math.min(10, newValue))
      }
    ];
  }

  function renderChart() {
    const chart = Plot.plot({
      title: "Wait-time per Engagement",
      width: container.clientWidth,
      height: 400,
      y: {
        domain: [1, 10],
        label: "Wait-time (minutes)",
        grid: true
      },
      x: {
        type: "time",
        label: "Time",
        tickFormat: formatTime,
        domain: [data[0].date, data[data.length - 1].date]
      },
      marks: [
        Plot.line(data, {
          x: "date",
          y: "value",
          curve: "natural",
          stroke: "black",
          strokeWidth: 2
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