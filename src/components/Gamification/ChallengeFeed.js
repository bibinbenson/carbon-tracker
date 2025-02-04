import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ChallengeFeed = () => {
  const challenges = [
    {
      title: "Meat-Free Week",
      description: "Avoid meat for a week — Reward: 200 points"
    },
    {
      title: "Public Transport Challenge",
      description: "Use public transport for all trips this week — Reward: 300 points"
    }
  ];

  return (
    <Box>
      {challenges.map((challenge, index) => (
        <Box 
          key={index} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            mb: 3 
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>
              {challenge.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                mt: 0.5
              }}
            >
              {challenge.description}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{
              color: '#2e7d32',
              borderColor: '#2e7d32',
              '&:hover': {
                borderColor: '#1b5e20',
                bgcolor: 'transparent'
              }
            }}
          >
            ACCEPT
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ChallengeFeed;
