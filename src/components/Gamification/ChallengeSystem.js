import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  LinearProgress, 
  Chip,
  IconButton,
  Collapse
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const challenges = [
  {
    id: 1,
    title: "Meat-Free Week",
    description: "Avoid meat consumption for an entire week",
    points: 200,
    duration: 7,
    tips: [
      "Try plant-based alternatives",
      "Explore vegetarian recipes",
      "Track your progress daily"
    ]
  },
  {
    id: 2,
    title: "Public Transport Hero",
    description: "Use public transport for all your trips this week",
    points: 300,
    duration: 7,
    tips: [
      "Plan your routes in advance",
      "Get a weekly transport pass",
      "Track your carbon savings"
    ]
  },
  {
    id: 3,
    title: "Energy Saver",
    description: "Reduce your energy consumption by 20%",
    points: 250,
    duration: 7,
    tips: [
      "Use natural light when possible",
      "Unplug unused devices",
      "Monitor your usage daily"
    ]
  }
];

const ChallengeSystem = ({ onComplete }) => {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [progress, setProgress] = useState({});

  const handleAcceptChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setProgress(prev => ({
      ...prev,
      [challenge.id]: 0
    }));
  };

  const handleProgress = (challengeId) => {
    const newProgress = Math.min(100, (progress[challengeId] || 0) + 14.29);
    setProgress(prev => ({
      ...prev,
      [challengeId]: newProgress
    }));

    if (newProgress >= 100) {
      onComplete(challenges.find(c => c.id === challengeId).points);
      setActiveChallenge(null);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Weekly Challenges
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card 
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">
                    {challenge.title}
                  </Typography>
                  <Chip 
                    icon={<EmojiEventsIcon />}
                    label={`${challenge.points} points`}
                    color="success"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {challenge.description}
                </Typography>

                {activeChallenge?.id === challenge.id && (
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress[challenge.id] || 0}
                      sx={{ 
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'success.main'
                        }
                      }}
                    />
                    <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                      {Math.round(progress[challenge.id] || 0)}% Complete
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {activeChallenge?.id === challenge.id ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleProgress(challenge.id)}
                      sx={{ mr: 1 }}
                    >
                      Update Progress
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleAcceptChallenge(challenge)}
                      disabled={!!activeChallenge}
                    >
                      Accept Challenge
                    </Button>
                  )}

                  <IconButton
                    onClick={() => setExpandedId(expandedId === challenge.id ? null : challenge.id)}
                    sx={{
                      transform: expandedId === challenge.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>

                <Collapse in={expandedId === challenge.id}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tips:
                    </Typography>
                    {challenge.tips.map((tip, index) => (
                      <Typography key={index} variant="body2" color="text.secondary">
                        • {tip}
                      </Typography>
                    ))}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default ChallengeSystem;
