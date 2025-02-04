// frontend/src/components/Notifications/AchievementNotification.js
import React from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const AchievementNotification = ({ achievement, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            bgcolor: 'success.light',
            color: 'success.contrastText'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h1" sx={{ mr: 2, fontSize: '2rem' }}>
              {achievement.icon}
            </Typography>
            <Box>
              <Typography variant="subtitle1">
                New Achievement Unlocked!
              </Typography>
              <Typography variant="body2">
                {achievement.name} - {achievement.points} points
              </Typography>
            </Box>
          </Box>
        </Alert>
      </motion.div>
    </Snackbar>
  );
};

export default AchievementNotification;
