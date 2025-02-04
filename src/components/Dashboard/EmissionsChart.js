// frontend/src/components/Dashboard/EmissionsChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Card, CardContent, Typography } from '@mui/material';

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Emissions Over Time'
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Emissions Trend
        </Typography>
        <Box sx={{ height: 300 }}>
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmissionsChart;
