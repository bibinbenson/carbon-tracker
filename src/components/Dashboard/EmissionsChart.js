import React from 'react';
import { Box, Typography } from '@mui/material';
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
  console.log('Chart Data:', data); // Debugging line

  const chartData = {
    labels: data?.map(d => d.date) || [],
    datasets: [{
      label: 'CO2 Emissions (kg)',
      data: data?.map(d => d.emissions) || [],
      fill: false,
      borderColor: '#2e7d32',
      backgroundColor: '#4caf50',
      tension: 0.1,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Emissions Over Time'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'CO2 Emissions (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Emissions Trend
      </Typography>
      <Box sx={{ height: 400, p: 2 }}>
        {data && data.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <Typography color="textSecondary" sx={{ textAlign: 'center', mt: 10 }}>
            No emissions data available yet. Start tracking to see your progress!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default EmissionsChart;
