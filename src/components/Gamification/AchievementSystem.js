import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const achievements = [
  { icon: '🌱', name: 'Eco Novice', points: 100 },
  { icon: '🌍', name: 'Green Warrior', points: 500 },
  { icon: '🏆', name: 'Climate Champion', points: 1000 }
];

const AchievementSystem = ({ points = 0 }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Achievements ({points} points)
      </Typography>
      
      <Grid container spacing={2}>
        {achievements.map((achievement) => (
          <Grid item xs={4} key={achievement.name}>
            <Box sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: 'grey.100',
              borderRadius: 1,
              opacity: 0.7
            }}>
              <Typography variant="h5" gutterBottom>
                {achievement.icon}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {achievement.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {achievement.points} points
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AchievementSystem;
