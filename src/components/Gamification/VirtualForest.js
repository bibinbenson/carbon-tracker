import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

const TREE_STAGES = {
  SEED: '🌱',
  SAPLING: '🌿',
  YOUNG: '🌳',
  MATURE: '🌲',
  FLOWERING: '🌸'
};

const VirtualForest = ({ healthStatus }) => {
  const [trees, setTrees] = useState([]);

  // Fallback logic to prevent NaN
  const forestHealth = typeof healthStatus === 'number' && !isNaN(healthStatus) ? healthStatus : 0;

  useEffect(() => {
    const treeCount = Math.ceil(forestHealth / 20); // Divide health into stages
    const newTrees = Array(5).fill(null).map((_, index) => ({
      id: index,
      stage: index < treeCount ? getTreeStage(forestHealth) : 'SEED',
      active: index < treeCount
    }));
    setTrees(newTrees);
  }, [forestHealth]);

  const getTreeStage = (health) => {
    if (health >= 90) return 'MATURE';
    if (health >= 70) return 'YOUNG';
    if (health >= 50) return 'SAPLING';
    return 'SEED';
  };

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Virtual Forest
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Forest Health
        </Typography>
        <LinearProgress
          variant="determinate"
          value={forestHealth}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor:
                forestHealth > 70 ? 'success.main' :
                forestHealth > 40 ? 'warning.main' : 'error.main',
              borderRadius: 5,
            }
          }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {forestHealth.toFixed(1)}%
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2,
          flexWrap: 'wrap'
        }}
      >
        {trees.map((tree) => (
          <motion.div
            key={tree.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: tree.active ? 1 : 0.5, 
              opacity: tree.active ? 1 : 0.3 
            }}
            whileHover={{ scale: tree.active ? 1.1 : 0.5 }}
          >
            <Tooltip 
              title={`Tree ${tree.id + 1}: ${tree.active ? 'Healthy' : 'Inactive'}`}
              arrow
            >
              <Box
                sx={{
                  fontSize: '2rem',
                  cursor: 'pointer',
                  filter: tree.active ? 'none' : 'grayscale(100%)',
                  transition: 'all .3s ease'
                }}
              >
                {TREE_STAGES[tree.stage]}
              </Box>
            </Tooltip>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default VirtualForest;
