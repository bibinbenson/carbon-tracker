import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const Leaderboard = () => {
  const leaders = [
    { id: 1, name: "Alice", points: "1200 pts" },
    { id: 2, name: "Bob", points: "1100 pts" },
    { id: 3, name: "Charlie", points: "1000 pts" }
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Leaderboard
      </Typography>
      
      {leaders.map((leader) => (
        <Box
          key={leader.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Avatar
            sx={{
              bgcolor: '#2e7d32',
              width: 32,
              height: 32,
              mr: 2,
              fontSize: '0.875rem'
            }}
          >
            {leader.id}
          </Avatar>
          <Typography>
            {leader.name} - {leader.points}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Leaderboard;
