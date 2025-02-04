import React from 'react';

function Badge({ achievements }) {
  return (
    <div className="badge-container">
      <h3>Achievements</h3>
      <ul>
        {achievements?.map((badge, index) => (
          <li key={index}>
            <span>{badge.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Badge;
