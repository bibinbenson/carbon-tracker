import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box, 
  LinearProgress, 
  Grid, 
  Typography,
  Paper 
} from '@mui/material';
import { EMISSION_FACTORS } from '../utils/emissionFactors';

const InputForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    distance: '',
    transportMode: 'car',
    fuelType: 'petrol',
    energyUsage: '',
    energySource: 'electricity',
    meals: {
      meat: 0,
      poultry: 0,
      vegetarian: 0,
      vegan: 0
    },
    supplyChain: {
      manufacturing: 0,
      transportation: 0,
      packaging: 0
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (path, value) => {
    setFormData(prev => ({
      ...prev,
      [path]: value
    }));
  };

  const handleNestedChange = (parent, child, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: Number(value)
      }
    }));
  };

  const calculateEmissions = () => {
    // Transport calculations
    const transportEmissions = formData.distance * 
      EMISSION_FACTORS.transport[formData.transportMode][formData.fuelType] || 0;

    // Energy calculations
    const energyEmissions = formData.energyUsage * 
      EMISSION_FACTORS.energy[formData.energySource];

    // Food calculations
    const foodEmissions = 
      (formData.meals.meat * EMISSION_FACTORS.food.meat) +
      (formData.meals.poultry * EMISSION_FACTORS.food.poultry) +
      (formData.meals.vegetarian * EMISSION_FACTORS.food.vegetarian) +
      (formData.meals.vegan * EMISSION_FACTORS.food.vegan);

    // Supply chain calculations
    const supplyChainEmissions = 
      (formData.supplyChain.manufacturing * EMISSION_FACTORS.supplyChain.manufacturing) +
      (formData.supplyChain.transportation * EMISSION_FACTORS.supplyChain.transportation) +
      (formData.supplyChain.packaging * EMISSION_FACTORS.supplyChain.packaging);

    return {
      total: transportEmissions + energyEmissions + foodEmissions + supplyChainEmissions,
      breakdown: {
        transport: transportEmissions,
        energy: energyEmissions,
        food: foodEmissions,
        supplyChain: supplyChainEmissions
      },
      intensity: {
        transport: transportEmissions / formData.distance,
        energy: energyEmissions / formData.energyUsage
      }
    };
  };

  const handleSubmit = () => {
    try {
      setLoading(true);
      const emissions = calculateEmissions();
      onCalculate(emissions, formData);
    } catch (err) {
      setError('Calculation error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Detailed Emissions Calculator
      </Typography>

      <Grid container spacing={3}>
        {/* Transport Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              🚗 Transportation
            </Typography>
            <TextField
              fullWidth
              label="Distance (km)"
              type="number"
              value={formData.distance}
              onChange={(e) => handleChange('distance', e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Transport Mode</InputLabel>
              <Select
                value={formData.transportMode}
                onChange={(e) => handleChange('transportMode', e.target.value)}
              >
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="bus">Bus</MenuItem>
                <MenuItem value="train">Train</MenuItem>
              </Select>
            </FormControl>
            {formData.transportMode === 'car' && (
              <FormControl fullWidth>
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  value={formData.fuelType}
                  onChange={(e) => handleChange('fuelType', e.target.value)}
                >
                  <MenuItem value="petrol">Petrol</MenuItem>
                  <MenuItem value="diesel">Diesel</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                  <MenuItem value="electric">Electric</MenuItem>
                </Select>
              </FormControl>
            )}
          </Paper>
        </Grid>

        {/* Energy Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              ⚡ Energy Usage
            </Typography>
            <TextField
              fullWidth
              label="Energy Consumption (kWh)"
              type="number"
              value={formData.energyUsage}
              onChange={(e) => handleChange('energyUsage', e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Energy Source</InputLabel>
              <Select
                value={formData.energySource}
                onChange={(e) => handleChange('energySource', e.target.value)}
              >
                <MenuItem value="electricity">Grid Electricity</MenuItem>
                <MenuItem value="naturalGas">Natural Gas</MenuItem>
                <MenuItem value="solar">Solar</MenuItem>
                <MenuItem value="wind">Wind</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Food Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              🍽️ Weekly Meals
            </Typography>
            {Object.keys(formData.meals).map((mealType) => (
              <TextField
                key={mealType}
                fullWidth
                label={`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Meals`}
                type="number"
                value={formData.meals[mealType]}
                onChange={(e) => handleNestedChange('meals', mealType, e.target.value)}
                sx={{ mb: 2 }}
              />
            ))}
          </Paper>
        </Grid>

        {/* Supply Chain Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              🚚 Supply Chain
            </Typography>
            {Object.keys(formData.supplyChain).map((category) => (
              <TextField
                key={category}
                fullWidth
                label={`${category.charAt(0).toUpperCase() + category.slice(1)} ($)`}
                type="number"
                value={formData.supplyChain[category]}
                onChange={(e) => handleNestedChange('supplyChain', category, e.target.value)}
                sx={{ mb: 2 }}
              />
            ))}
          </Paper>
        </Grid>

        {/* Submit Section */}
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ py: 2 }}
          >
            {loading ? <LinearProgress /> : 'Calculate Detailed Emissions'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputForm;
