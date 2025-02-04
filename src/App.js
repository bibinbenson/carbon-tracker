import React, { useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import InputForm from './components/InputForm';
import ProgressTracker from './components/ProgressTracker';
import AchievementSystem from './components/Gamification/AchievementSystem';
import ChallengeSystem from './components/Gamification/ChallengeSystem';
import VirtualForest from './components/Gamification/VirtualForest';
import SustainabilityTips from './components/Education/SustainabilityTips';
import Leaderboard from './components/Gamification/Leaderboard';

const App = () => {
  const [totalEmissions, setTotalEmissions] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h1" 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          fontSize: '2.5rem',
          fontWeight: 400
        }}
      >
        Carbon Footprint Tracker
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'background.paper'
            }}
          >
            <InputForm setTotalEmissions={setTotalEmissions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'background.paper'
            }}
          >
            <ProgressTracker totalEmissions={totalEmissions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={1} 
            sx={{ p: 3, borderRadius: 2 }}
          >
            <AchievementSystem points={userPoints} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={1} 
            sx={{ p: 3, borderRadius: 2 }}
          >
            <ChallengeSystem onComplete={points => setUserPoints(prev => prev + points)} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={1} 
            sx={{ p: 3, borderRadius: 2 }}
          >
            <VirtualForest healthStatus={totalEmissions ? 100 - (totalEmissions / 50) : 100} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={1} 
            sx={{ p: 3, borderRadius: 2 }}
          >
            <SustainabilityTips />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={1} 
            sx={{ p: 3, borderRadius: 2 }}
          >
            <Leaderboard />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
