// services/aiService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getEmissionsPrediction = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/ai/predict`, userData);
    return response.data;
  } catch (error) {
    console.error('Error getting predictions:', error);
    throw error;
  }
};

export const getPersonalizedTips = async (userProfile) => {
  try {
    const response = await axios.post(`${API_URL}/ai/tips`, userProfile);
    return response.data;
  } catch (error) {
    console.error('Error getting personalized tips:', error);
    throw error;
  }
};
