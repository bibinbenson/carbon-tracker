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
  Collapse,
  LinearProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const InputForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    distance: '',
    transportMode: 'bus',
    energyUsage: '',
    meatMeals: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validationRules = {
    distance: {
      min: 0,
      max: 50000,
      message: 'Enter a value between 0 and 50,000 km'
    },
    energyUsage: {
      min: 0,
      max: 10000,
      message: 'Enter a value between 0 and 10,000 kWh'
    },
    meatMeals: {
      min: 0,
      max: 21,
      message: 'Enter a value between 0 and 21 meals per week'
    }
  };

  const validateField = (name, value) => {
    if (!validationRules[name]) return '';
    
    const numValue = parseFloat(value);
    const rule = validationRules[name];
    
    if (isNaN(numValue) || numValue < rule.min || numValue > rule.max) {
      return rule.message;
    }
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const calculateEmissions = async () => {
    if (Object.values(errors).some(error => error)) return;

    setLoading(true);
    try {
      const { distance, transportMode, energyUsage, meatMeals } = formData;
      const transportFactor = transportMode === 'car' ? 0.2 : 0.1;
      const total = (parseFloat(distance) * transportFactor) + 
                   (parseFloat(energyUsage) * 0.5) + 
                   (parseFloat(meatMeals) * 2.5);

      onCalculate(total, formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component={motion.div} layout>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert severity="success" sx={{ mb: 2 }}>
              Emissions calculated successfully!
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {[
          {
            name: 'distance',
            label: 'Distance (km)',
            tooltip: 'Enter your total travel distance in kilometers'
          },
          {
            name: 'energyUsage',
            label: 'Energy Usage (kWh)',
            tooltip: 'Enter your monthly electricity consumption'
          },
          {
            name: 'meatMeals',
            label: 'Meat Meals per Week',
            tooltip: 'Enter number of meat-containing meals per week'
          }
        ].map((field) => (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type="number"
            value={formData[field.name]}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            fullWidth
            InputProps={{
              endAdornment: (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {formData[field.name] && !errors[field.name] && (
                    <CheckCircleIcon color="success" />
                  )}
                  {errors[field.name] && (
                    <ErrorIcon color="error" />
                  )}
                  <Tooltip title={field.tooltip}>
                    <IconButton size="small">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )
            }}
          />
        ))}

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

        <Button
          variant="contained"
          onClick={calculateEmissions}
          disabled={loading || Object.values(errors).some(error => error)}
          sx={{
            py: 2,
            bgcolor: '#2e7d32',
            '&:hover': {
              bgcolor: '#1b5e20',
              transform: 'scale(1.02)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          {loading ? (
            <LinearProgress 
              sx={{ 
                width: '100%', 
                bgcolor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'white'
                }
              }} 
            />
          ) : (
            'CALCULATE EMISSIONS'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default InputForm;
