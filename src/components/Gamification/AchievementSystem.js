import React from 'react';
import { Box, Typography, Grid, Tooltip, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

const achievements = [
  {
    id: 1,
    icon: '🌱',
    name: 'Eco Novice',
    points: 100,
    description: 'Start your sustainability journey'
  },
  {
    id: 2,
    icon: '🌍',
    name: 'Green Warrior',
    points: 500,
    description: 'Make significant environmental impact'
  },
  {
    id: 3,
    icon: '🏆',
    name: 'Climate Champion',
    points: 1000,
    description: 'Lead the way in sustainability'
  }
];

const AchievementSystem = ({ userPoints = 0 }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Achievements ({userPoints} points)
      </Typography>
      
      <Grid container spacing={2}>
        {achievements.map((achievement) => {
          const progress = Math.min(100, (userPoints / achievement.points) * 100);
          const isEarned = userPoints >= achievement.points;
          
          return (
            <Grid item xs={12} sm={4} key={achievement.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Tooltip title={achievement.description}>
                  <Box
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: isEarned ? 'success.light' : 'grey.100',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      opacity: isEarned ? 1 : 0.7
                    }}
                  >
                    <Typography variant="h3" gutterBottom>
                      {achievement.icon}
                    </Typography>
                    <Typography variant="subtitle1">
                      {achievement.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {achievement.points} points
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress}
                      sx={{ 
                        mt: 1,
                        height: 4,
                        borderRadius: 2,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: isEarned ? 'success.main' : 'primary.main'
                        }
                      }}
                    />
                  </Box>
                </Tooltip>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AchievementSystem;
