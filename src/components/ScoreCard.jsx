import React from 'react';

const ScoreCard = ({ title, value, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className={`mt-2 text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default ScoreCard;
