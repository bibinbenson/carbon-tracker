import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Button, Chip } from '@mui/material';

const ChallengeSystem = ({ onComplete }) => {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [progress, setProgress] = useState(0);

  const challenges = [
    {
      id: 1,
      title: "Meat-Free Week",
      description: "Avoid meat for a week",
      points: 200
    },
    {
      id: 2,
      title: "Public Transport Hero",
      description: "Use public transport for all trips",
      points: 300
    },
    {
      id: 3,
      title: "Energy Saver",
      description: "Reduce energy usage by 20%",
      points: 250
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Weekly Challenges
      </Typography>
      
      {challenges.map((challenge) => (
        <Box 
          key={challenge.id} 
          sx={{ 
            mb: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 1
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle1">
              {challenge.title}
            </Typography>
            <Chip 
              label={`${challenge.points} points`}
              color="success"
              size="small"
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {challenge.description}
          </Typography>

          {activeChallenge?.id === challenge.id && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ mb: 1 }}
              />
              <Typography variant="caption">
                {progress}% Complete
              </Typography>
            </Box>
          )}

          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => setActiveChallenge(challenge)}
            sx={{ mt: 2 }}
          >
            {activeChallenge?.id === challenge.id ? 'IN PROGRESS' : 'ACCEPT'}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ChallengeSystem;
