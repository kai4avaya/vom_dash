import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const defaultData = [
    {name: "North America", "Call Volume": 0.8, "Customer Satisfaction": 0.75, "Response Time": 0.7, "Issue Resolution": 0.82, "Cost Efficiency": 0.65},
    {name: "Europe", "Call Volume": 0.6, "Customer Satisfaction": 0.8, "Response Time": 0.75, "Issue Resolution": 0.78, "Cost Efficiency": 0.7},
    {name: "Asia", "Call Volume": 0.9, "Customer Satisfaction": 0.7, "Response Time": 0.65, "Issue Resolution": 0.75, "Cost Efficiency": 0.8},
    {name: "South America", "Call Volume": 0.5, "Customer Satisfaction": 0.72, "Response Time": 0.68, "Issue Resolution": 0.7, "Cost Efficiency": 0.75},
    {name: "Africa", "Call Volume": 0.4, "Customer Satisfaction": 0.65, "Response Time": 0.6, "Issue Resolution": 0.65, "Cost Efficiency": 0.85}
  ];


const newData = [
    {name: "North America", "Call Volume": 0.85, "Customer Satisfaction": 0.8, "Response Time": 0.75, "Issue Resolution": 0.85, "Cost Efficiency": 0.7},
    {name: "Europe", "Call Volume": 0.65, "Customer Satisfaction": 0.85, "Response Time": 0.8, "Issue Resolution": 0.8, "Cost Efficiency": 0.75},
    {name: "Asia", "Call Volume": 0.95, "Customer Satisfaction": 0.75, "Response Time": 0.7, "Issue Resolution": 0.8, "Cost Efficiency": 0.85},
    {name: "South America", "Call Volume": 0.55, "Customer Satisfaction": 0.75, "Response Time": 0.7, "Issue Resolution": 0.75, "Cost Efficiency": 0.8},
    {name: "Africa", "Call Volume": 0.45, "Customer Satisfaction": 0.7, "Response Time": 0.65, "Issue Resolution": 0.7, "Cost Efficiency": 0.9}
  ];

const callCenterData = [
    { continent: "North America", key: "Call Handling Efficiency", value: 0.85 },
    { continent: "North America", key: "Customer Satisfaction", value: 0.9 },
    { continent: "North America", key: "Average Response Time", value: 0.75 },
    { continent: "North America", key: "Resolution Time", value: 0.8 },
    { continent: "North America", key: "Agent Availability", value: 0.78 },
  
    { continent: "Europe", key: "Call Handling Efficiency", value: 0.8 },
    { continent: "Europe", key: "Customer Satisfaction", value: 0.85 },
    { continent: "Europe", key: "Average Response Time", value: 0.7 },
    { continent: "Europe", key: "Resolution Time", value: 0.75 },
    { continent: "Europe", key: "Agent Availability", value: 0.82 },
  
    { continent: "Asia", key: "Call Handling Efficiency", value: 0.88 },
    { continent: "Asia", key: "Customer Satisfaction", value: 0.92 },
    { continent: "Asia", key: "Average Response Time", value: 0.78 },
    { continent: "Asia", key: "Resolution Time", value: 0.85 },
    { continent: "Asia", key: "Agent Availability", value: 0.83 },
  
    { continent: "South America", key: "Call Handling Efficiency", value: 0.78 },
    { continent: "South America", key: "Customer Satisfaction", value: 0.82 },
    { continent: "South America", key: "Average Response Time", value: 0.68 },
    { continent: "South America", key: "Resolution Time", value: 0.72 },
    { continent: "South America", key: "Agent Availability", value: 0.76 },
  
    { continent: "Africa", key: "Call Handling Efficiency", value: 0.75 },
    { continent: "Africa", key: "Customer Satisfaction", value: 0.8 },
    { continent: "Africa", key: "Average Response Time", value: 0.65 },
    { continent: "Africa", key: "Resolution Time", value: 0.7 },
    { continent: "Africa", key: "Agent Availability", value: 0.73 }
  ];
  
  const dataPoints = [
    {name: "iPhone", key: "Battery Life", value: 0.22},
    {name: "iPhone", key: "Brand", value: 0.28},
    {name: "iPhone", key: "Contract Cost", value: 0.29},
    {name: "iPhone", key: "Design And Quality", value: 0.17},
    {name: "iPhone", key: "Have Internet Connectivity", value: 0.22},
    {name: "iPhone", key: "Large Screen", value: 0.02},
    {name: "iPhone", key: "Price Of Device", value: 0.21},
    {name: "iPhone", key: "To Be A Smartphone", value: 0.5},
    
    {name: "Samsung", key: "Battery Life", value: 0.27},
    {name: "Samsung", key: "Brand", value: 0.16},
    {name: "Samsung", key: "Contract Cost", value: 0.35},
    {name: "Samsung", key: "Design And Quality", value: 0.13},
    {name: "Samsung", key: "Have Internet Connectivity", value: 0.2},
    {name: "Samsung", key: "Large Screen", value: 0.13},
    {name: "Samsung", key: "Price Of Device", value: 0.35},
    {name: "Samsung", key: "To Be A Smartphone", value: 0.38},
  
    {name: "Nokia", key: "Battery Life", value: 0.26},
    {name: "Nokia", key: "Brand", value: 0.1},
    {name: "Nokia", key: "Contract Cost", value: 0.3},
    {name: "Nokia", key: "Design And Quality", value: 0.14},
    {name: "Nokia", key: "Have Internet Connectivity", value: 0.22},
    {name: "Nokia", key: "Large Screen", value: 0.04},
    {name: "Nokia", key: "Price Of Device", value: 0.41},
    {name: "Nokia", key: "To Be A Smartphone", value: 0.3}
  ];
  
  
  export function createCallCenterRadarChart(container, customData, {width = 450, height = 450} = {}) {
   
    const data = customData || dataPoints;
    
    // Determine if we're using callCenterData or dataPoints
    const isCallCenterData = data[0].hasOwnProperty('continent');
    
    // Get unique keys and names/continents
    const keys = [...new Set(data.map(d => d.key))];
    const categories = [...new Set(data.map(d => isCallCenterData ? d.continent : d.name))];
    
    // Create a scale for the radial axes
    const longitude = d3.scalePoint(keys, [180, -180]).padding(0.5).align(1);
  
    container.appendChild(Plot.plot({
      width,
      height,
      projection: {
        type: "azimuthal-equidistant",
        rotate: [0, -90],
        domain: d3.geoCircle().center([0, 90]).radius(0.625)()
      },
      color: { 
        legend: true,
        domain: categories
      },
      marks: [
        // Grey discs
        Plot.geo([0.5, 0.4, 0.3, 0.2, 0.1], {
          geometry: (r) => d3.geoCircle().center([0, 90]).radius(r)(),
          stroke: "black",
          fill: "black",
          strokeOpacity: 0.3,
          fillOpacity: 0.03,
          strokeWidth: 0.5
        }),
        // White axes
        Plot.link(keys, {
          x1: longitude,
          y1: 90 - 0.57,
          x2: 0,
          y2: 90,
          stroke: "white",
          strokeOpacity: 0.5,
          strokeWidth: 2.5
        }),
        // Tick labels
        Plot.text([0.3, 0.4, 0.5], {
          x: 180,
          y: (d) => 90 - d,
          dx: 2,
          textAnchor: "start",
          text: (d) => `${100 * d}%`,
          fill: "currentColor",
          stroke: "white",
          fontSize: 8
        }),
        // Axes labels
        Plot.text(keys, {
          x: longitude,
          y: 90 - 0.57,
          text: Plot.identity,
          lineWidth: 5
        }),
        // Areas
        Plot.areaY(data, {
          x: ({ key }) => longitude(key),
          y: ({ value }) => 90 - value,
          z: isCallCenterData ? "continent" : "name",
          fill: isCallCenterData ? "continent" : "name",
          fillOpacity: 0.2,
          stroke: isCallCenterData ? "continent" : "name",
          curve: "cardinal-closed"
        }),
        // Points
        Plot.dot(data, {
          x: ({ key }) => longitude(key),
          y: ({ value }) => 90 - value,
          fill: isCallCenterData ? "continent" : "name",
          stroke: "white"
        }),
        // Interactive labels
        Plot.text(
          data,
          Plot.pointer({
            x: ({ key }) => longitude(key),
            y: ({ value }) => 90 - value,
            text: (d) => `${isCallCenterData ? d.continent : d.name}: ${(100 * d.value).toFixed(0)}%`,
            textAnchor: "start",
            dx: 4,
            fill: "currentColor",
            stroke: "white",
            strokeWidth: 3,
            fontSize: 10
          })
        )
      ]
    }));
  
    // Add interactive styles
    const style = document.createElement('style');
    style.textContent = `
      g[aria-label=area] path {fill-opacity: 0.2; transition: fill-opacity .2s;}
      g[aria-label=area]:hover path:not(:hover) {fill-opacity: 0.1; transition: fill-opacity .2s;}
      g[aria-label=area] path:hover {fill-opacity: 0.4; transition: fill-opacity .2s;}
    `;
    container.appendChild(style);
  }