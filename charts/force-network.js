// import * as d3 from "d3";

// const defaultData = {
//     nodes: [
//       { id: "A", group: 1 },
//       { id: "B", group: 1 },
//       { id: "C", group: 2 },
//       { id: "D", group: 2 },
//       { id: "E", group: 3 },
//       { id: "F", group: 3 },
//       { id: "G", group: 4 },
//       { id: "H", group: 4 },
//       { id: "I", group: 5 },
//       { id: "J", group: 5 },
//       { id: "K", group: 6 },
//       { id: "L", group: 6 },
//       { id: "M", group: 7 },
//       { id: "N", group: 7 },
//       { id: "O", group: 8 },
//       { id: "P", group: 8 },
//       // Add more nodes as needed
//     ],
//     links: [
//       { source: "A", target: "B", value: 1 },
//       { source: "B", target: "C", value: 2 },
//       { source: "C", target: "D", value: 1 },
//       { source: "D", target: "E", value: 3 },
//       { source: "E", target: "A", value: 2 },
//       { source: "A", target: "F", value: 4 },
//       { source: "F", target: "G", value: 1 },
//       { source: "G", target: "H", value: 2 },
//       { source: "H", target: "I", value: 3 },
//       { source: "I", target: "J", value: 1 },
//       { source: "J", target: "K", value: 2 },
//       { source: "K", target: "L", value: 3 },
//       { source: "L", target: "M", value: 1 },
//       { source: "M", target: "N", value: 2 },
//       { source: "N", target: "O", value: 3 },
//       { source: "O", target: "P", value: 1 },
//       // Add more links as needed
//     ]
//   };

// export function createForceNetworkGraph(container, customData = defaultData, { width = 600, height = 400 } = {}) {
//   let data = customData || defaultData;

//   const color = d3.scaleOrdinal(d3.schemeCategory10);

//   // Set up the simulation with forces
//   const simulation = d3.forceSimulation(data.nodes)
//     .force("link", d3.forceLink(data.links).id(d => d.id))
//     .force("charge", d3.forceManyBody())
//     .force("center", d3.forceCenter(width / 2, height / 2));

//   // Create SVG container
//   const svg = d3.create("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("viewBox", [0, 0, width, height])
//     .attr("style", "max-width: 100%; height: auto;");

//   // Add links between nodes
//   let link = svg.append("g")
//     .attr("stroke", "#999")
//     .attr("stroke-opacity", 0.6)
//     .selectAll("line")
//     .data(data.links)
//     .join("line")
//     .attr("stroke-width", d => Math.sqrt(d.value));

//   // Create node groups to contain circles and labels
//   let node = svg.append("g")
//     .selectAll("g")
//     .data(data.nodes)
//     .join("g")
//     .call(drag(simulation));

//   // Add circles to each node
//   node.append("circle")
//     .attr("r", 10)
//     .attr("fill", d => color(d.group));

//   // Add labels to each node
//   node.append("text")
//     .attr("x", 12)
//     .attr("y", 3)
//     .text(d => d.id)
//     .style("font-size", "12px")
//     .style("fill", "#333");

//   // Update simulation on tick
//   simulation.on("tick", () => {
//     link
//       .attr("x1", d => d.source.x)
//       .attr("y1", d => d.source.y)
//       .attr("x2", d => d.target.x)
//       .attr("y2", d => d.target.y);

//     node.attr("transform", d => `translate(${d.x},${d.y})`);
//   });

//   // Drag functionality for nodes
//   function drag(simulation) {
//     function dragstarted(event) {
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       event.subject.fx = event.subject.x;
//       event.subject.fy = event.subject.y;
//     }

//     function dragged(event) {
//       event.subject.fx = event.x;
//       event.subject.fy = event.y;
//     }

//     function dragended(event) {
//       if (!event.active) simulation.alphaTarget(0);
//       event.subject.fx = null;
//       event.subject.fy = null;
//     }

//     return d3.drag()
//       .on("start", dragstarted)
//       .on("drag", dragged)
//       .on("end", dragended);
//   }

//   // Append SVG to container
//   container.appendChild(svg.node());

//   // Update graph data (used to dynamically change the data)
//   function updateData(newData) {
//     data = newData;

//     // Update links
//     link = link.data(data.links, d => `${d.source.id}-${d.target.id}`);
//     link.exit().remove();
//     link = link.enter().append("line")
//       .attr("stroke", "#999")
//       .attr("stroke-opacity", 0.6)
//       .attr("stroke-width", d => Math.sqrt(d.value))
//       .merge(link);

//     // Update nodes
//     node = node.data(data.nodes, d => d.id);
//     node.exit().remove();
    
//     const nodeEnter = node.enter().append("g").call(drag(simulation));

//     // Add circles and labels to new nodes
//     nodeEnter.append("circle")
//       .attr("r", 10)
//       .attr("fill", d => color(d.group));

//     nodeEnter.append("text")
//       .attr("x", 12)
//       .attr("y", 3)
//       .text(d => d.id)
//       .style("font-size", "12px")
//       .style("fill", "#333");

//     node = nodeEnter.merge(node);

//     // Restart the simulation
//     simulation.nodes(data.nodes);
//     simulation.force("link").links(data.links);
//     simulation.alpha(1).restart();
//   }

//   return updateData;
// }


import * as d3 from "d3";

const defaultData = {
    nodes: [
      { id: "Main HQ", group: 1, size: 20 },
      { id: "North Region", group: 2, size: 15 },
      { id: "South Region", group: 2, size: 15 },
      { id: "East Region", group: 2, size: 15 },
      { id: "West Region", group: 2, size: 15 },
      { id: "North CC 1", group: 3, size: 10 },
      { id: "North CC 2", group: 3, size: 10 },
      { id: "South CC 1", group: 3, size: 10 },
      { id: "South CC 2", group: 3, size: 10 },
      { id: "East CC 1", group: 3, size: 10 },
      { id: "East CC 2", group: 3, size: 10 },
      { id: "West CC 1", group: 3, size: 10 },
      { id: "West CC 2", group: 3, size: 10 },
    ],
    links: [
      { source: "Main HQ", target: "North Region", value: 4 },
      { source: "Main HQ", target: "South Region", value: 4 },
      { source: "Main HQ", target: "East Region", value: 4 },
      { source: "Main HQ", target: "West Region", value: 4 },
      { source: "North Region", target: "North CC 1", value: 2 },
      { source: "North Region", target: "North CC 2", value: 2 },
      { source: "South Region", target: "South CC 1", value: 2 },
      { source: "South Region", target: "South CC 2", value: 2 },
      { source: "East Region", target: "East CC 1", value: 2 },
      { source: "East Region", target: "East CC 2", value: 2 },
      { source: "West Region", target: "West CC 1", value: 2 },
      { source: "West Region", target: "West CC 2", value: 2 },
    ]
};

export function createForceNetworkGraph(container, customData = defaultData, { width = 800, height = 600 } = {}) {
  let data = customData || defaultData;

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Set up the simulation with forces
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.size + 5));

  // Create SVG container
  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add links between nodes
  let link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(data.links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

  // Create node groups to contain circles and labels
  let node = svg.append("g")
    .selectAll("g")
    .data(data.nodes)
    .join("g")
    .call(drag(simulation));

  // Add circles to each node
  node.append("circle")
    .attr("r", d => d.size)
    .attr("fill", d => color(d.group));

  // Add labels to each node
  node.append("text")
    .attr("x", d => d.size + 5)
    .attr("y", 3)
    .text(d => d.id)
    .style("font-size", "12px")
    .style("fill", "#333");

  // Update simulation on tick
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });

  // Drag functionality for nodes
  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  // Append SVG to container
  container.appendChild(svg.node());

  // Update graph data (used to dynamically change the data)
  function updateData(newData) {
    data = newData;

    // Update links
    link = link.data(data.links, d => `${d.source.id}-${d.target.id}`);
    link.exit().remove();
    link = link.enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value))
      .merge(link);

    // Update nodes
    node = node.data(data.nodes, d => d.id);
    node.exit().remove();
    
    const nodeEnter = node.enter().append("g").call(drag(simulation));

    // Add circles and labels to new nodes
    nodeEnter.append("circle")
      .attr("r", d => d.size)
      .attr("fill", d => color(d.group));

    nodeEnter.append("text")
      .attr("x", d => d.size + 5)
      .attr("y", 3)
      .text(d => d.id)
      .style("font-size", "12px")
      .style("fill", "#333");

    node = nodeEnter.merge(node);

    // Restart the simulation
    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links);
    simulation.alpha(1).restart();
  }

  return updateData;
}