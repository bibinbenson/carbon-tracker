import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const ProgressTracker = ({ totalEmissions }) => {
  const progress = totalEmissions ? Math.min(100, Math.max(0, (100 - totalEmissions / 50))) : 0;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={200}
          thickness={4}
          sx={{
            color: '#2e7d32',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4">
            {progress.toFixed(1)}%
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Carbon Reduction
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: '#2e7d32',
          color: 'white',
          py: 1.5,
          px: 4,
          '&:hover': {
            bgcolor: '#1b5e20',
            transform: 'scale(1.05)',
            transition: 'all 0.3s ease',
          }
        }}
      >
        SHARE PROGRESS
      </Button>

      {totalEmissions && (
        <Box sx={{ 
          mt: 4, 
          p: 3, 
          borderRadius: 2,
          bgcolor: 'rgba(46, 125, 50, 0.1)'
        }}>
          <Typography variant="h6" gutterBottom>
            Total Emissions
          </Typography>
          <Typography variant="h5" color="#2e7d32">
            {totalEmissions.toFixed(1)} kg CO₂
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Transport: {(totalEmissions * 0.4).toFixed(1)} kg CO₂
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Energy: {(totalEmissions * 0.35).toFixed(1)} kg CO₂
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Food: {(totalEmissions * 0.25).toFixed(1)} kg CO₂
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProgressTracker;
