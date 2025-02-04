// frontend/src/components/Community/CommunityHub.js
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Button,
  Grid,
  Divider 
} from '@mui/material';

const CommunityHub = () => {
  const [communityStats, setCommunityStats] = useState({
    totalUsers: 0,
    totalEmissionsReduced: 0,
    activeUsers: 0
  });

  const [topContributors, setTopContributors] = useState([]);

  // Fetch community data
  useEffect(() => {
    // Add API call here
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Community Impact
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Total CO₂ Reduced
              </Typography>
              <Typography variant="h4" color="success.main">
                {communityStats.totalEmissionsReduced.toFixed(1)} kg
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Contributors
              </Typography>
              {topContributors.map((contributor, index) => (
                <Box
                  key={contributor.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <Avatar src={contributor.avatar} />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1">
                      {contributor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reduced {contributor.reductions} kg CO₂
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommunityHub;
