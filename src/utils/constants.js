export const EMISSION_FACTORS = {
  CAR: 0.2,       // kg CO2 per km
  BUS: 0.1,       // kg CO2 per km
  ENERGY: 0.5,    // kg CO2 per kWh
  MEAT: 2.5       // kg CO2 per meal
};

export const ACHIEVEMENTS = {
  NOVICE: { threshold: 500, badge: '🌱 Novice' },
  ADVOCATE: { threshold: 1000, badge: '🌍 Eco Advocate' },
  CHAMPION: { threshold: 5000, badge: '🏆 Climate Champion' }
};

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  POSTAL_CODE: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/i
};
