import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const TREE_STAGES = {
  SEED: '🌱',
  SAPLING: '🌿',
  YOUNG: '🌳',
  MATURE: '🌲',
  FLOWERING: '🌸'
};

const VirtualForest = ({ healthStatus }) => {
  const [trees, setTrees] = useState([]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const treeCount = Math.ceil(healthStatus / 20); // 1-5 trees based on health
    const newTrees = Array(5).fill(null).map((_, index) => ({
      id: index,
      stage: index < treeCount ? getTreeStage(healthStatus) : 'SEED',
      active: index < treeCount
    }));
    setAnimating(true);
    setTrees(newTrees);
    setTimeout(() => setAnimating(false), 500);
  }, [healthStatus]);

  const getTreeStage = (health) => {
    if (health >= 90) return 'MATURE';
    if (health >= 70) return 'YOUNG';
    if (health >= 50) return 'SAPLING';
    return 'SEED';
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Your Virtual Forest
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Forest Health
        </Typography>
        <LinearProgress
          variant="determinate"
          value={healthStatus}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: healthStatus > 70 ? 'success.main' : 
                      healthStatus > 40 ? 'warning.main' : 'error.main',
              borderRadius: 5,
            }
          }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {healthStatus.toFixed(1)}%
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
        <AnimatePresence>
          {trees.map((tree, index) => (
            <motion.div
              key={tree.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: tree.active ? 1 : 0.5, 
                opacity: tree.active ? 1 : 0.3 
              }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: tree.active ? 1.1 : 0.5 }}
            >
              <Tooltip 
                title={`Tree ${index + 1}: ${tree.active ? 'Healthy' : 'Inactive'}`}
                arrow
              >
                <Box
                  sx={{
                    fontSize: '2rem',
                    cursor: 'pointer',
                    filter: tree.active ? 'none' : 'grayscale(100%)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {TREE_STAGES[tree.stage]}
                </Box>
              </Tooltip>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="caption" color="text.secondary">
          {healthStatus >= 80 ? '🌟 Thriving Forest!' : 
           healthStatus >= 50 ? '🌱 Growing Strong' : 
           '💪 Keep Going!'}
        </Typography>
      </Box>
    </Box>
  );
};

export default VirtualForest;
