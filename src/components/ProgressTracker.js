import React from 'react';
import { Box, Typography, LinearProgress, Grid, Paper } from '@mui/material';

const formatValue = (value) =>
isNaN(value) ? '0.00' : Math.abs(value).toFixed(2);

const ProgressTracker = ({ totalEmissions, intensityMetrics }) => {
const emissionStats = [
{ label: 'Transport', value: totalEmissions?.breakdown?.transport || 0 },
{ label: 'Energy', value: totalEmissions?.breakdown?.energy || 0 },
{ label: 'Food', value: totalEmissions?.breakdown?.food || 0 },
{ label: 'Supply Chain', value: totalEmissions?.breakdown?.supplyChain || 0 }
];

const intensityStats = [
{ label: 'Transport Intensity', value: intensityMetrics?.transport || 0, unit: 'kgCO2/km' },
{ label: 'Energy Intensity', value: intensityMetrics?.energy || 0, unit: 'kgCO2/kWh' }
];

return (
<Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
<Typography variant="h6" gutterBottom>
Emissions Breakdown
</Typography>

<Grid container spacing={3}>
{emissionStats.map((stat, index) => (
<Grid item xs={12} md={3} key={index}>
<Paper sx={{ p: 2, textAlign: 'center' }}>
<Typography variant="subtitle2" gutterBottom>
{stat.label}
</Typography>
<Typography variant="h5" color="primary">
{formatValue(stat.value)} kg
</Typography>
<LinearProgress
variant="determinate"
value={(stat.value / (totalEmissions?.total || 1)) * 100}
sx={{ mt: 1, height: 8 }}
/>
</Paper>
</Grid>
))}

{intensityStats.map((stat, index) => (
<Grid item xs={12} md={6} key={index}>
<Paper sx={{ p: 2 }}>
<Typography variant="subtitle2" gutterBottom>
{stat.label}
</Typography>
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
<Typography variant="h6" color="secondary">
{formatValue(stat.value)}
</Typography>
<Typography variant="body2" color="text.secondary">
{stat.unit}
</Typography>
</Box>
</Paper>
</Grid>
))}
</Grid>
</Box>
);
};

export default ProgressTracker;
