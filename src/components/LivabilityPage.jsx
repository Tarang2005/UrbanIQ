// src/components/LivabilityPage.jsx

import React from 'react';
import ScoreCard from "./ScoreCard"; // Make sure ScoreCard is imported

// Receives city name, data (maybe null for searched cities), and helpers object
const LivabilityPage = ({ city, data, helpers }) => {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-4">
      {/* Correct Title */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Livability Score - {city}</h2>

      {/* Conditionally render based on whether hardcoded data exists */}
      {data ? (
        // If data exists (Delhi, Mumbai, Chennai), show the livability score card
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ScoreCard title="Livability Score" value={data.livability} />
          {/* Placeholder for other potential related cards */}
          <div className="p-4 border rounded-lg text-center text-gray-500">Key Factors...</div>
          <div className="p-4 border rounded-lg text-center text-gray-500">Comparison...</div>
        </div>
      ) : (
        // If data is null (searched city), show placeholder
        <div className="p-4 text-center text-gray-500 border rounded-lg">
          Specific livability score data is currently only available for Delhi, Mumbai, and Chennai. More comprehensive data coming soon.
        </div>
      )}

      {/* Correct description */}
      <p className="mt-4 text-gray-600">
        Detailed livability breakdown (factors like housing, healthcare, environment, safety, etc.) for {city} would go here.
      </p>
    </div>
  );
};

export default LivabilityPage;