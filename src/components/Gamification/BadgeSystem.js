import React from 'react';
import { Box, Typography } from '@mui/material';

const BadgeSystem = () => {
  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2,
          fontWeight: 400
        }}
      >
        Earned Badges
      </Typography>
      <Box 
        sx={{ 
          display: 'inline-block',
          bgcolor: '#2e7d32',
          color: 'white',
          px: 3,
          py: 1,
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}
      >
        Eco Novice
      </Box>
    </Box>
  );
};

export default BadgeSystem;
