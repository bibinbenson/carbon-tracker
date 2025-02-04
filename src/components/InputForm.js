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
  IconButton
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const InputForm = ({ setTotalEmissions }) => {
  const [formData, setFormData] = useState({
    distance: '',
    transportMode: 'bus',
    energyUsage: '',
    meatMeals: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'distance':
        return value <= 0 || value > 50000 ? 'Enter a value between 0 and 50,000 km' : '';
      case 'energyUsage':
        return value <= 0 || value > 10000 ? 'Enter a value between 0 and 10,000 kWh' : '';
      case 'meatMeals':
        return value < 0 || value > 21 ? 'Enter a value between 0 and 21 meals' : '';
      default:
        return '';
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name !== 'transportMode') {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const calculateEmissions = () => {
    if (Object.values(errors).some(error => error)) {
      return;
    }

    const { distance, transportMode, energyUsage, meatMeals } = formData;
    const transportFactor = transportMode === 'car' ? 0.2 : 0.1;
    const total = (parseFloat(distance) * transportFactor) + 
                 (parseFloat(energyUsage) * 0.5) + 
                 (parseFloat(meatMeals) * 2.5);
    setTotalEmissions(total || 0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Distance (km)"
        name="distance"
        type="number"
        value={formData.distance}
        onChange={handleChange}
        error={!!errors.distance}
        helperText={errors.distance}
        fullWidth
        InputProps={{
          endAdornment: (
            <>
              {formData.distance && !errors.distance && (
                <CheckCircleIcon sx={{ color: '#2e7d32' }} />
              )}
              {errors.distance && (
                <ErrorIcon color="error" />
              )}
              <Tooltip 
                title="Enter your total travel distance in kilometers (0-50,000 km)"
                arrow
                placement="top"
              >
                <IconButton size="small">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </>
          )
        }}
      />

      <FormControl fullWidth>
        <InputLabel>Transport Mode</InputLabel>
        <Select
          name="transportMode"
          value={formData.transportMode}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="bus">Bus</MenuItem>
          <MenuItem value="car">Car</MenuItem>
          <MenuItem value="train">Train</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Energy Usage (kWh)"
        name="energyUsage"
        type="number"
        value={formData.energyUsage}
        onChange={handleChange}
        error={!!errors.energyUsage}
        helperText={errors.energyUsage}
        fullWidth
        InputProps={{
          endAdornment: (
            <>
              {formData.energyUsage && !errors.energyUsage && (
                <CheckCircleIcon sx={{ color: '#2e7d32' }} />
              )}
              {errors.energyUsage && (
                <ErrorIcon color="error" />
              )}
              <Tooltip 
                title="Enter your monthly electricity consumption (0-10,000 kWh)"
                arrow
                placement="top"
              >
                <IconButton size="small">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </>
          )
        }}
      />

      <TextField
        label="Meat Meals per Week"
        name="meatMeals"
        type="number"
        value={formData.meatMeals}
        onChange={handleChange}
        error={!!errors.meatMeals}
        helperText={errors.meatMeals}
        fullWidth
        InputProps={{
          endAdornment: (
            <>
              {formData.meatMeals && !errors.meatMeals && (
                <CheckCircleIcon sx={{ color: '#2e7d32' }} />
              )}
              {errors.meatMeals && (
                <ErrorIcon color="error" />
              )}
              <Tooltip 
                title="Enter number of meat-containing meals per week (0-21)"
                arrow
                placement="top"
              >
                <IconButton size="small">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </>
          )
        }}
      />

      <Button
        variant="contained"
        onClick={calculateEmissions}
        disabled={Object.values(errors).some(error => error)}
        sx={{
          bgcolor: '#2e7d32',
          color: 'white',
          py: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: '#1b5e20',
            transform: 'scale(1.05)'
          },
          '&:disabled': {
            bgcolor: '#cccccc'
          }
        }}
      >
        CALCULATE EMISSIONS
      </Button>
    </Box>
  );
};

export default InputForm;
