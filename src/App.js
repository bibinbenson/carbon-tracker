import React, { useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import InputForm from './components/InputForm';
import ProgressTracker from './components/ProgressTracker';
import SmartRecommendations from './components/AI/SmartRecommendations';
import AchievementSystem from './components/Gamification/AchievementSystem';
import ChallengeSystem from './components/Gamification/ChallengeSystem';
import VirtualForest from './components/Gamification/VirtualForest';
import EmissionsChart from './components/Dashboard/EmissionsChart';
import CommunityHub from './components/Community/CommunityHub';
import SustainabilityTips from './components/Education/SustainabilityTips';
import Leaderboard from './components/Gamification/Leaderboard';
import AchievementNotification from './components/Notifications/AchievementNotification';

const App = () => {
  const [totalEmissions, setTotalEmissions] = useState(null);
  const [userData, setUserData] = useState({
    emissionsHistory: [
      { date: '2024-01', emissions: 150 },
      { date: '2024-02', emissions: 130 },
      { date: '2024-03', emissions: 140 }
    ]
  });
  const [userPoints, setUserPoints] = useState(0);
  const [achievementNotification, setAchievementNotification] = useState({
  icon: '🏆',
  name: 'Initial Achievement',
  points: 0
});

  const handleEmissionsCalculated = (emissions, data) => {
    setTotalEmissions(emissions);
    // Update emissions history when new calculation is made
    setUserData(prev => ({
      ...prev,
      emissionsHistory: [
        ...prev.emissionsHistory,
        { date: new Date().toISOString().slice(0, 7), emissions }
      ]
    }));
  };

  const handleNewAchievement = (achievement) => {
    setAchievementNotification(achievement);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: 6 }}>
        Carbon Footprint Tracker
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <InputForm onCalculate={handleEmissionsCalculated} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <ProgressTracker 
              totalEmissions={totalEmissions}
              userPoints={userPoints}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <EmissionsChart data={userData.emissionsHistory} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <SmartRecommendations 
              userData={userData}
              totalEmissions={totalEmissions}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <AchievementSystem 
              userPoints={userPoints}
              onNewAchievement={handleNewAchievement}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <ChallengeSystem 
              onComplete={(points) => setUserPoints(prev => prev + points)}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <VirtualForest 
              healthStatus={totalEmissions ? 100 - (totalEmissions / 50) : 100}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <CommunityHub />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <SustainabilityTips totalEmissions={totalEmissions} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Leaderboard userPoints={userPoints} />
          </Paper>
        </Grid>
      </Grid>

      <AchievementNotification 
        achievement={achievementNotification}
        open={!!achievementNotification}
        onClose={() => setAchievementNotification(null)}
      />
    </Container>
  );
};

export default App;
