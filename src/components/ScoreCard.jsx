import React from 'react';

// ScoreCard component now applies dark mode styles
const ScoreCard = ({ title, value, color = "text-gray-900 dark:text-white" }) => { // Default color adapts
  return (
    // Add dark styles to card background
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md dark:shadow-slate-700/50 text-center transition-colors duration-200">
      {/* Add dark style to title text */}
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
      {/* Ensure the color prop passed in includes dark variants where needed */}
      {/* The helpers in App.js already provide dark variants for dynamic colors */}
      <p className={`text-2xl font-semibold ${color}`}>{value ?? 'N/A'}</p>
    </div>
  );
};

export default ScoreCard;