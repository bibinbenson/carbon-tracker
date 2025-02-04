import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Tooltip, 
  IconButton 
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const SmartRecommendations = ({ userData, totalEmissions }) => {
  const recommendations = [
    {
      category: 'Transport',
      tip: 'Consider using public transport more frequently',
      impact: 'Potential saving: 20kg CO2/month'
    },
    {
      category: 'Energy',
      tip: 'Switch to LED bulbs and energy-efficient appliances',
      impact: 'Potential saving: 15kg CO2/month'
    },
    {
      category: 'Lifestyle',
      tip: 'Reduce meat consumption by one day per week',
      impact: 'Potential saving: 10kg CO2/month'
    }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Smart Recommendations
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {recommendations.map((rec, index) => (
          <Card key={index} sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="primary">
                  {rec.category}
                </Typography>
                <Tooltip title="Based on your usage patterns">
                  <IconButton size="small">
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {rec.tip}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                {rec.impact}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SmartRecommendations;
