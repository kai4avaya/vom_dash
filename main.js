
import {initializeCharts} from './orchestration/initializeCharts.js';
import { initializeWebSocket } from './serverConnectors/websocketListener.js';

initializeCharts();

initializeWebSocket() 
    // Example of updating charts after 5 seconds with new data
// setTimeout(() => {
//       const newBarData = [
//         { category: "A", value: 45 },
//         { category: "B", value: 20 },
//         { category: "C", value: 30 },
//         { category: "D", value: 55 },
//         { category: "E", value: 25 }
//       ];
//       const newLineData = Array.from({ length: 20 }, (_, i) => ({
//         date: new Date(2023, 1, i + 1),
//         value: Math.random() * 75 + 25
//       }));
//       updateCharts(newBarData, newLineData);
//     }, 5000);