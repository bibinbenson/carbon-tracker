import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar,
  Grid 
} from '@mui/material';

const CommunityHub = () => {
  const [communityStats] = useState({
    totalUsers: 150,
    totalEmissionsReduced: 2500,
    activeUsers: 89
  });

  const [topContributors] = useState([
    { id: 1, name: 'Alice Green', avatar: '', reductions: 450 },
    { id: 2, name: 'Bob Smith', avatar: '', reductions: 380 },
    { id: 3, name: 'Charlie Brown', avatar: '', reductions: 310 }
  ]);

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
              {topContributors.map((contributor) => (
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
