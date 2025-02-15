// Based on GLEC Framework and CodeCarbon standards
export const EMISSION_FACTORS = {
  transport: {
    car: {
      petrol: 0.192,   // kgCO2/km
      diesel: 0.173,
      hybrid: 0.112,
      electric: 0.053
    },
    bus: 0.089,        // kgCO2/km
    train: 0.041,      // kgCO2/km
    plane: {
      shortHaul: 0.242,  // kgCO2/km
      longHaul: 0.151
    }
  },
  energy: {
    electricity: 0.475,  // kgCO2/kWh (US average)
    naturalGas: 0.185,  // kgCO2/kWh
    solar: 0.048,
    wind: 0.011
  },
  food: {
    meat: 5.2,          // kgCO2/meal (beef)
    poultry: 2.7,       // kgCO2/meal
    vegetarian: 1.9,
    vegan: 1.5
  },
  supplyChain: {
    manufacturing: 2.34,   // kgCO2/$ spent
    transportation: 1.12,  // kgCO2/km-ton
    packaging: 0.87        // kgCO2/kg material
  }
};

// IPCC conversion factors
export const CONVERSION_FACTORS = {
  kmToMiles: 0.621371,
  kWhToMJ: 3.6,
  tonsToKg: 1000
};
