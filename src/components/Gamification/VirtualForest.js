import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const treeVariants = {
  healthy: { scale: 1, opacity: 1 },
  damaged: { scale: 0.8, opacity: 0.5 }
};

const VirtualForest = ({ healthStatus }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Your Virtual Forest
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2,
        my: 3 
      }}>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            variants={treeVariants}
            animate={healthStatus > (index + 1) * 20 ? 'healthy' : 'damaged'}
            transition={{ duration: 0.5 }}
          >
            🌳
          </motion.div>
        ))}
      </Box>
      <Typography variant="body2" color="text.secondary">
        Forest Health: {healthStatus.toFixed(1)}%
      </Typography>
    </Box>
  );
};

export default VirtualForest;
