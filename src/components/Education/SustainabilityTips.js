import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, IconButton, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

// Move defaultTips outside the component
const DEFAULT_TIPS = {
  TRANSPORT: [
    "Use public transportation when possible",
    "Consider carpooling with colleagues",
    "Walk or cycle for short distances",
    "Maintain proper tire pressure for better fuel efficiency",
    "Plan your trips to combine multiple errands"
  ],
  ENERGY: [
    "Use natural light when possible",
    "Switch to LED light bulbs",
    "Unplug devices when not in use",
    "Use a programmable thermostat",
    "Air dry clothes when weather permits"
  ],
  FOOD: [
    "Plan meals to reduce food waste",
    "Buy local and seasonal produce",
    "Start composting kitchen waste",
    "Reduce meat consumption",
    "Use reusable containers for storage"
  ]
};

const SustainabilityTips = ({ totalEmissions }) => {
  const [tips, setTips] = useState({
    TRANSPORT: '',
    ENERGY: '',
    FOOD: ''
  });
  const [loading, setLoading] = useState(false);

  const getRandomTip = useCallback((category) => {
    const categoryTips = DEFAULT_TIPS[category];
    return categoryTips[Math.floor(Math.random() * categoryTips.length)];
  }, []); // No dependencies needed as DEFAULT_TIPS is now constant

  const refreshTips = useCallback(() => {
    setLoading(true);
    
    const newTips = {
      TRANSPORT: getRandomTip('TRANSPORT'),
      ENERGY: getRandomTip('ENERGY'),
      FOOD: getRandomTip('FOOD')
    };
    
    setTips(newTips);
    setLoading(false);
  }, [getRandomTip]);

  useEffect(() => {
    refreshTips();
  }, [refreshTips]);

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h6">
          Sustainability Tips
        </Typography>
        <IconButton 
          onClick={refreshTips} 
          disabled={loading}
          sx={{
            '&:hover': {
              transform: 'rotate(180deg)',
              transition: 'transform 0.3s ease-in-out'
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <RefreshIcon />
          )}
        </IconButton>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexWrap: { xs: 'wrap', md: 'nowrap' }
      }}>
        {Object.entries(tips).map(([category, tip]) => (
          <Paper
            key={category}
            elevation={3}
            sx={{
              flex: 1,
              p: 2,
              minWidth: { xs: '100%', md: '30%' },
              bgcolor: '#4caf50',
              color: 'white',
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <Typography 
              variant="subtitle2" 
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              {category}
            </Typography>
            <Typography variant="body2">
              {tip}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default SustainabilityTips;
