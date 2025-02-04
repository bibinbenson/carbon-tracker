import api from './api';

export const fetchChallenges = async () => {
  try {
    return await api.get('/gamification/challenges');
  } catch (error) {
    throw new Error('Failed to fetch challenges');
  }
};

export const updateUserProgress = async (userId, progressData) => {
  try {
    return await api.post(`/gamification/users/${userId}/progress`, progressData);
  } catch (error) {
    throw new Error('Progress update failed');
  }
};
