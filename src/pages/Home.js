import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Carbon Footprint Tracker</h1>
      <p>Track your carbon emissions and make more eco-friendly decisions.</p>
      <Link to="/progress">Track your progress</Link>
    </div>
  );
}

export default Home;
