import React from 'react';
import { Box, Typography, LinearProgress, Grid, Paper } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const ProgressTracker = ({ totalEmissions, userPoints }) => {
  const formatNumber = (value) => {
    if (typeof value !== 'number') {
      value = Number(value);
    }
    return isNaN(value) ? '0.00' : value.toFixed(2);
  };

  const calculateProgress = (current) => {
    const target = 100; // Example target
    return Math.min((current / target) * 100, 100);
  };

  const getEmissionLevel = (emissions) => {
    if (!emissions) return { color: 'success.main', text: 'No Data' };
    if (emissions < 50) return { color: 'success.main', text: 'Low' };
    if (emissions < 100) return { color: 'warning.main', text: 'Moderate' };
    return { color: 'error.main', text: 'High' };
  };

  const emissionStats = {
    transport: totalEmissions ? totalEmissions.transport : 0,
    energy: totalEmissions ? totalEmissions.energy : 0,
    food: totalEmissions ? totalEmissions.food : 0
  };

  const total = Object.values(emissionStats).reduce((sum, val) => sum + val, 0);
  const emissionLevel = getEmissionLevel(total);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Emissions Overview
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Total CO₂ Emissions
            </Typography>
            <Typography variant="h4" color={emissionLevel.color}>
              {formatNumber(total)} kg
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {emissionLevel.text}
            </Typography>
          </Paper>
        </Grid>

        {[
          { icon: DirectionsCarIcon, label: 'Transport', value: emissionStats.transport },
          { icon: ElectricBoltIcon, label: 'Energy', value: emissionStats.energy },
          { icon: RestaurantIcon, label: 'Food', value: emissionStats.food }
        ].map(({ icon: Icon, label, value }) => (
          <Grid item xs={12} md={4} key={label}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Icon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{label}</Typography>
              </Box>
              <Typography variant="h6">
                {formatNumber(value)} kg
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress(value)}
                sx={{ mt: 1 }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Achievement Points
        </Typography>
        <Typography variant="h5" color="primary">
          {userPoints} pts
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={calculateProgress(userPoints)}
          color="success"
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};

export default ProgressTracker;
