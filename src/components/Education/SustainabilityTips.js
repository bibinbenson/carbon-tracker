import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  IconButton, 
  Tooltip,
  CircularProgress,
  Fade
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = {
  TRANSPORT: {
    icon: '🚌',
    color: '#2196f3'
  },
  ENERGY: {
    icon: '⚡',
    color: '#ff9800'
  },
  FOOD: {
    icon: '🥗',
    color: '#4caf50'
  }
};

const DEFAULT_TIPS = {
  TRANSPORT: [
    "Use public transportation when possible",
    "Consider carpooling with colleagues",
    "Walk or cycle for short distances",
    "Maintain proper tire pressure",
    "Combine multiple errands into one trip"
  ],
  ENERGY: [
    "Use natural light when possible",
    "Switch to LED bulbs",
    "Unplug devices when not in use",
    "Use a programmable thermostat",
    "Air dry clothes when possible"
  ],
  FOOD: [
    "Plan meals to reduce food waste",
    "Buy local and seasonal produce",
    "Start composting kitchen waste",
    "Reduce meat consumption",
    "Use reusable containers"
  ]
};

const SustainabilityTips = ({ totalEmissions }) => {
  const [tips, setTips] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const getRandomTip = useCallback((category) => {
    const categoryTips = DEFAULT_TIPS[category];
    return categoryTips[Math.floor(Math.random() * categoryTips.length)];
  }, []);

  const refreshTips = useCallback(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newTips = Object.keys(CATEGORIES).reduce((acc, category) => ({
        ...acc,
        [category]: getRandomTip(category)
      }), {});
      
      setTips(newTips);
      setLoading(false);
    }, 1000);
  }, [getRandomTip]);

  useEffect(() => {
    refreshTips();
  }, [refreshTips, refreshKey]);

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
        <Tooltip title="Get new tips">
          <IconButton 
            onClick={() => setRefreshKey(prev => prev + 1)}
            disabled={loading}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'rotate(180deg)'
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <RefreshIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        flexWrap: { xs: 'wrap', md: 'nowrap' }
      }}>
        <AnimatePresence mode="wait">
          {Object.entries(CATEGORIES).map(([category, { icon, color }]) => (
            <motion.div
              key={`${category}-${refreshKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ flex: 1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  bgcolor: `${color}15`,
                  borderLeft: `4px solid ${color}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ mr: 1 }}>{icon}</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {category}
                    </Typography>
                  </Box>
                  <Fade in={!loading}>
                    <Typography variant="body2">
                      {tips[category]}
                    </Typography>
                  </Fade>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default SustainabilityTips;
