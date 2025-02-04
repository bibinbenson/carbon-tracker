import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box, 
  Tooltip, 
  IconButton,
  Alert,
  LinearProgress
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InputForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    distance: '',
    transportMode: 'bus',
    energyUsage: '',
    meatMeals: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const emissions = calculateEmissions(formData);
      onCalculate(emissions, formData);
      
    } catch (err) {
      setError('Failed to calculate emissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateEmissions = (data) => {
    const { distance, transportMode, energyUsage, meatMeals } = data;
    
    const transportFactor = transportMode === 'car' ? 0.2 : 0.1;
    const transportEmissions = distance * transportFactor;
    const energyEmissions = energyUsage * 0.5;
    const foodEmissions = meatMeals * 2.5;
    
    return {
      total: transportEmissions + energyEmissions + foodEmissions,
      transport: transportEmissions,
      energy: energyEmissions,
      food: foodEmissions
    };
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        name="distance"
        label="Distance (km)"
        type="number"
        value={formData.distance}
        onChange={handleChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <Tooltip title="Enter your total travel distance in kilometers">
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )
        }}
      />

      <FormControl fullWidth>
        <InputLabel>Transport Mode</InputLabel>
        <Select
          name="transportMode"
          value={formData.transportMode}
          onChange={handleChange}
        >
          <MenuItem value="bus">Bus</MenuItem>
          <MenuItem value="car">Car</MenuItem>
          <MenuItem value="train">Train</MenuItem>
        </Select>
      </FormControl>

      <TextField
        name="energyUsage"
        label="Energy Usage (kWh)"
        type="number"
        value={formData.energyUsage}
        onChange={handleChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <Tooltip title="Enter your monthly electricity consumption">
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )
        }}
      />

      <TextField
        name="meatMeals"
        label="Meat Meals per Week"
        type="number"
        value={formData.meatMeals}
        onChange={handleChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <Tooltip title="Enter number of meat-containing meals per week">
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )
        }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{
          py: 2,
          bgcolor: 'success.main',
          '&:hover': {
            bgcolor: 'success.dark'
          }
        }}
      >
        {loading ? <LinearProgress /> : 'CALCULATE EMISSIONS'}
      </Button>
    </Box>
  );
};

export default InputForm;
