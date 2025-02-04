import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress,
  Grid 
} from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const EmissionsPredictions = ({ predictions, loading }) => {
  if (!predictions && !loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        sx={{ 
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Emissions Forecast
          </Typography>

          {loading ? (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress color="success" />
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card 
                  sx={{ 
                    bgcolor: 'success.light',
                    color: 'success.contrastText',
                    p: 2
                  }}
                >
                  <Typography variant="subtitle2">
                    Current Trend
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {predictions.trend === 'increasing' ? (
                      <TrendingUpIcon color="error" />
                    ) : (
                      <TrendingDownIcon color="success" />
                    )}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {predictions.projected.toFixed(1)} kg CO₂
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card 
                  sx={{ 
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    p: 2
                  }}
                >
                  <Typography variant="subtitle2">
                    Potential Savings
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {predictions.potentialReduction.toFixed(1)}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={predictions.potentialReduction} 
                    sx={{ mt: 1 }}
                  />
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Recommendations
                  </Typography>
                  {predictions.recommendations.map((rec, index) => (
                    <Typography 
                      key={index} 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      • {rec}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmissionsPredictions;
