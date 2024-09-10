import { createBarChart } from "../charts/bar.js";
import { createLineGraph } from "../charts/linegraph.js";
import { createAnimatedLineGraph } from "../charts/animatedline.js";
import { createAnimatedAreaGraph } from "../charts/animatedArea.js";
import { manualUpdate } from "../charts/counters.js";
import { createEarthquakeGlobe } from "../charts/earhquakeGlobe.js";
import { typeWriter } from "../charts/animatedText.js";
import { createInteractiveScatterPlot } from "../charts/animatedDots.js";
// import { createAnimatedPieChart } from './charts/pieCircle.js';
import { createCallCenterRadarChart } from "../charts/radar.js";
import { createForceNetworkGraph } from "../charts/force-network.js";
import {
  createSensorLineGraph,
  generateSensorData,
} from "../charts/sensorGraph.js";
import { createHexabin } from "../charts/hexabinUS.js";
import { createWorldMapLinks } from "../charts/travelGlobe.js";
import { createAnimatedPieChart } from "../charts/pieCircle.js";
import {orchestrateScrolling, stopScrolling} from "./scroller" 
import {configs} from '../configs/configs'

let isScroll = localStorage.getItem('isScroll') !== 'false';

const scrollListener = document.getElementById('scroll-switch');

// Set initial checkbox state
scrollListener.checked = isScroll;

scrollListener.addEventListener('change', function() {
  isScroll = this.checked;
  localStorage.setItem('isScroll', isScroll);

  if (isScroll) {
    // If scrolling is enabled, reinitialize charts with current data
    initializeCharts(currentData); // Make sure currentData is defined and contains your current chart data
  } else {
    stopScrolling();
  }
});
  
  function scrollHelper(curatedData, interval = 5000) {
    if (!curatedData || !curatedData.scrollToElements || !Array.isArray(curatedData.scrollToElements)) {
      console.error("Invalid data structure provided");
      return;
    }
  
    const elementIds = [];
    const messages = [];
  
    curatedData.scrollToElements.forEach(item => {
      if (item.elementId && item.message) {
        elementIds.push(item.elementId);
        messages.push(item.message);
      }
    });
  
    if (elementIds.length === 0 || messages.length === 0) {
      console.error("No valid elements or messages found in the data");
      return;
    }
  
    orchestrateScrolling(elementIds, interval, messages);
  }

export function initializeCharts(data = null) {

    if (data && isScroll){
        scrollHelper(data, configs.scrollInterval );
    }
  manualUpdate(data?.counters || 1);
  typeWriter(data?.antimatedText);
  const earthquakeGlobeContainer = document.getElementById(
    "earthquake-globe-panel"
  );
  createEarthquakeGlobe(earthquakeGlobeContainer, data?.earthquakeGlobe);

  const lineGraphContainer = document.getElementById(
    "animated-line-graph-panel"
  );
  createAnimatedLineGraph(lineGraphContainer, data?.animatedLine);

  const areaGraphContainer = document.getElementById(
    "animated-area-graph-panel"
  );
  createAnimatedAreaGraph(areaGraphContainer, data?.animatedArea || 0.5);
  //   updateChaos(1)

  // Create and append bar chart
  const barChart = createBarChart(data?.bar);
  const barPanel = document.querySelector("#bar-chart-panel");
  barPanel.innerHTML = "";
  barPanel.appendChild(barChart);

  // Create and append line graph
  const lineGraph = createLineGraph(data?.lineChart);
  const linePanel = document.querySelector("#line-graph-panel");
  linePanel.innerHTML = "";
  linePanel.appendChild(lineGraph);

  const scatterPlotContainer = document.getElementById("dot-panel");
  const addRedDots = createInteractiveScatterPlot(
    scatterPlotContainer,
    data?.animatedDots || 3
  );

  const pieChartContReal = document.getElementById("piechart-panel");
  const pieChartCont = createAnimatedPieChart(
    pieChartContReal,
    data?.pieChart || 1
  );

  const pieChartContainer = document.getElementById("pie-panel");
  createCallCenterRadarChart(pieChartContainer);

  // Example of updating radar chart with new data after 10 seconds
  const forceGraphContainer = document.getElementById("force-graph-panel");
  forceGraphContainer.innerHTML = "";
  // const updateForceGraph = createForceNetworkGraph(forceGraphContainer);

  const sensorGraphContainer = document.getElementById("sensor-graph-panel");
  const initialSensorData = generateSensorData(3);
  const updateSensorGraph = createSensorLineGraph(
    sensorGraphContainer,
    initialSensorData
  );

  const worldMapContainer = document.getElementById("world-map-panel");
  const worldMapChart = createWorldMapLinks(worldMapContainer);

  const hexabinContainer = document.getElementById("hexabin-panel");
  hexabinContainer.innerHTML = "";
  createHexabin(hexabinContainer, data?.hexabinUS);

  // Example of updating force graph with custom data after 10 seconds
  createForceNetworkGraph(forceGraphContainer);

  // Example of updating world map links after 10 seconds
  setTimeout(() => {
    const newConnections = [
      {
        name: "Berlin to Buenos Aires",
        x1: 13.405,
        y1: 52.52,
        x2: -58.3816,
        y2: -34.6037,
      },
      {
        name: "Cape Town to Bangkok",
        x1: 18.4241,
        y1: -33.9249,
        x2: 100.5018,
        y2: 13.7563,
      },
      {
        name: "Mexico City to Mumbai",
        x1: -99.1332,
        y1: 19.4326,
        x2: 72.8777,
        y2: 19.076,
      },
    ];
    createWorldMapLinks(worldMapContainer, newConnections);
  }, 10000);

  // Example of updating sensor data after 10 seconds
  setTimeout(() => {
    const newSensorData = generateSensorData(3, 30); // Generate new data with 5 sensors for 30 hours
    updateSensorGraph(newSensorData);
  }, 10000);

  // Example: Add more red dots every 5 seconds
  setInterval(() => {
    addRedDots(5); // Add 5 red dots every 5 seconds
  }, 5000);
}
