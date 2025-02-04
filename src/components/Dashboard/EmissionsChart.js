import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EmissionsChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: 'CO2 Emissions',
      data: data.map(d => d.emissions),
      fill: false,
      borderColor: '#2e7d32',
      tension: 0.1
    }]
  };

  return (
    <div>
      <h2>Emissions Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default EmissionsChart;
