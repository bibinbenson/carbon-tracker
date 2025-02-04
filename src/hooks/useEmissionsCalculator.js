import { useState, useEffect } from 'react';

const useEmissionsCalculator = (distance, energyUsage, transportMode) => {
  const [emissions, setEmissions] = useState(0);

  useEffect(() => {
    const calculateEmissions = () => {
      const transportFactor = transportMode === 'car' ? 0.2 : 0.1;
      const calculated = (distance * transportFactor) + (energyUsage * 0.5);
      setEmissions(Number(calculated.toFixed(2)));
    };

    if (distance > 0 && energyUsage > 0) {
      calculateEmissions();
    }
  }, [distance, energyUsage, transportMode]);

  return emissions;
};

export default useEmissionsCalculator;
