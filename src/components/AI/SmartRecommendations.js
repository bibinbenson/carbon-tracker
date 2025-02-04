import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CircularProgress,
  Alert,
  LinearProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { getEmissionsPrediction, getPersonalizedTips } from '../../services/aiService';

const SmartRecommendations = ({ userData, totalEmissions }) => {
  const [predictions, setPredictions] = useState(null);
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userData || !totalEmissions) return;
      
      try {
        setLoading(true);
        const [predictionData, tipsData] = await Promise.all([
          getEmissionsPrediction(userData),
          getPersonalizedTips({
            ...userData,
            totalEmissions
          })
        ]);

        setPredictions(predictionData);
        setTips(tipsData);
      } catch (err) {
        setError('Failed to load recommendations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userData, totalEmissions]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Analyzing your data...
        </Typography>
        <LinearProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Smart Insights
      </Typography>

      {predictions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card 
            sx={{ 
              mb: 2, 
              background: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
              color: 'white'
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Emissions Forecast
              </Typography>
              <Typography variant="body1">
                Projected monthly emissions: {predictions.projected.toFixed(1)} kg CO₂
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Potential reduction: {predictions.potentialReduction.toFixed(1)}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={predictions.potentialReduction} 
                  sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)' }}
                />
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Personalized Recommendations
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              sx={{ 
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
            >
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {tip.content}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="success.main"
                  sx={{ display: 'block', mt: 1 }}
                >
                  Potential impact: {tip.impact} kg CO₂ reduction
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default SmartRecommendations;
