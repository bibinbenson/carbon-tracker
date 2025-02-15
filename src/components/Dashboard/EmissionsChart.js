import React from 'react';
import { Box } from '@mui/material';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
Filler
);

const EmissionsChart = ({ data }) => {
const chartData = {
labels: data?.map(d => d.date) || [],
datasets: [
{
label: 'Transport Emissions',
data: data?.map(d => d.breakdown?.transport) || [],
borderColor: '#ff6384',
backgroundColor: 'rgba(255, 99, 132, 0.2)',
fill: true
},
{
label: 'Energy Emissions',
data: data?.map(d => d.breakdown?.energy) || [],
borderColor: '#36a2eb',
backgroundColor: 'rgba(54, 162, 235, 0.2)',
fill: true
},
{
label: 'Food Emissions',
data: data?.map(d => d.breakdown?.food) || [],
borderColor: '#4bc0c0',
backgroundColor: 'rgba(75, 192, 192, 0.2)',
fill: true
},
{
label: 'Supply Chain',
data: data?.map(d => d.breakdown?.supplyChain) || [],
borderColor: '#ff9f40',
backgroundColor: 'rgba(255, 159, 64, 0.2)',
fill: true
}
]
};

const options = {
responsive: true,
maintainAspectRatio: false,
plugins: {
title: {
display: true,
text: 'Detailed Emissions Over Time'
},
tooltip: {
mode: 'index',
intersect: false
}
},
scales: {
y: {
stacked: true,
title: {
display: true,
text: 'kgCO2e'
}
}
}
};

return (
<Box sx={{ height: 400 }}>
<Line data={chartData} options={options} />
</Box>
);
};

export default EmissionsChart;