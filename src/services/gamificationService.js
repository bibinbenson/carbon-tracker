// frontend/src/services/gamificationService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const gamificationService = {
  async updatePoints(userId, points) {
    const response = await axios.post(`${API_URL}/users/update-points`, {
      userId,
      points
    });
    return response.data;
  },

  async checkAchievements(userId, stats) {
    const response = await axios.post(`${API_URL}/users/check-achievements`, {
      userId,
      stats
    });
    return response.data;
  },

  async getChallenges() {
    const response = await axios.get(`${API_URL}/challenges/active`);
    return response.data;
  },

  async acceptChallenge(userId, challengeId) {
    const response = await axios.post(`${API_URL}/challenges/accept`, {
      userId,
      challengeId
    });
    return response.data;
  },

  async updateChallengeProgress(challengeId, progress) {
    const response = await axios.post(`${API_URL}/challenges/update-progress`, {
      challengeId,
      progress
    });
    return response.data;
  }
};
