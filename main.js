

import { createBarChart } from './charts/bar.js';
import { createLineGraph  } from './charts/linegraph.js';
import { createAnimatedLineGraph } from './charts/animatedline.js';
import { createAnimatedAreaGraph } from './charts/animatedArea.js';
import {initializeCounters} from './charts/counters.js';
import { createEarthquakeGlobe } from './charts/earhquakeGlobe.js';
import {typeWriter} from './charts/animatedText.js';
import { createInteractiveScatterPlot } from './charts/animatedDots.js'
import { createAnimatedPieChart } from './charts/pieCircle.js';
import { createForceNetworkGraph } from './charts/force-network.js';
import { createSensorLineGraph,generateSensorData } from './charts/sensorGraph.js';
import { createWorldMapLinks } from './charts/travelGlobe.js';
// Function to initialize charts
export function initializeCharts() {
  initializeCounters()
  typeWriter(); 
  const earthquakeGlobeContainer = document.getElementById('earthquake-globe-panel');
  createEarthquakeGlobe(earthquakeGlobeContainer);
  
  const lineGraphContainer = document.getElementById('animated-line-graph-panel');
  createAnimatedLineGraph(lineGraphContainer);

  const areaGraphContainer = document.getElementById('animated-area-graph-panel');
  const updateChaos = createAnimatedAreaGraph(areaGraphContainer, {chaosLevel: 0.5});
  updateChaos(1)
  
  // Create and append bar chart
  const barChart = createBarChart();
  document.querySelector("#bar-chart-panel").appendChild(barChart);

  // Create and append line graph
  const lineGraph = createLineGraph();
  document.querySelector("#line-graph-panel").appendChild(lineGraph);

  const scatterPlotContainer = document.getElementById('dot-panel');
  const addRedDots = createInteractiveScatterPlot(scatterPlotContainer, 10);

  const pieChartContainer = document.getElementById('pie-panel');
  const updatePieChart = createAnimatedPieChart(pieChartContainer );

  const forceGraphContainer = document.getElementById('force-graph-panel');
  // const updateForceGraph = createForceNetworkGraph(forceGraphContainer);

  const sensorGraphContainer = document.getElementById('sensor-graph-panel');
  console.log("I AM SENSOR GRAPH CONTAINER", sensorGraphContainer)
  const initialSensorData = generateSensorData();
  const updateSensorGraph = createSensorLineGraph(sensorGraphContainer, initialSensorData);

  const worldMapContainer = document.getElementById('world-map-panel');
  const worldMapChart = createWorldMapLinks(worldMapContainer);

  // Example of updating world map links after 10 seconds
  setTimeout(() => {
    const newConnections = [
      {name: "Berlin to Buenos Aires", x1: 13.4050, y1: 52.5200, x2: -58.3816, y2: -34.6037},
      {name: "Cape Town to Bangkok", x1: 18.4241, y1: -33.9249, x2: 100.5018, y2: 13.7563},
      {name: "Mexico City to Mumbai", x1: -99.1332, y1: 19.4326, x2: 72.8777, y2: 19.0760}
    ];
    createWorldMapLinks(worldMapContainer, newConnections);
  }, 10000);


  // Example of updating sensor data after 10 seconds
  setTimeout(() => {
    const newSensorData = generateSensorData(5, 30);  // Generate new data with 5 sensors for 30 hours
    updateSensorGraph(newSensorData);
  }, 10000);


  // Example of updating force graph with custom data after 10 seconds
  setTimeout(() => {
   const customData = '';
   // Create the graph
const updateGraph = createForceNetworkGraph(forceGraphContainer, customData);

  }, 10000);
 



  // Example: Add more red dots every 5 seconds
  setInterval(() => {
    addRedDots(5); // Add 5 red dots every 5 seconds
  }, 5000);



}

// Function to update charts with new data
export function updateCharts(newBarData, newLineData) {
  // Remove old charts
  document.querySelector("#bar-chart-panel").innerHTML = '';
  document.querySelector("#line-graph-panel").innerHTML = '';

  // Create and append new bar chart with new data
  const barChart = createBarChart(newBarData);
  document.querySelector("#bar-chart-panel").appendChild(barChart);

  // Create and append new line graph with new data
  const lineGraph = createLineGraph(newLineData);
  document.querySelector("#line-graph-panel").appendChild(lineGraph);
}

// window.addEventListener('load', initializeCharts);

// Ensure the charts resize when the window is resized
window.addEventListener('resize', initializeCharts);