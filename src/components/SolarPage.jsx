import React from 'react';
import ScoreCard from "./ScoreCard";

const SolarPage = ({ city, data, helpers }) => {
  // Using getCrimeStatus helper based on original Dashboard mapping
  const crime = helpers.getCrimeStatus(data.crimeIndex);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Solar/Other Index - {city}</h2> {/* Adjust Title */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ScoreCard title="Index Value" value={data.crimeIndex} /> {/* Update if data changes */}
          <ScoreCard title="Status" value={crime.label} color={crime.color} />
          {/* Placeholder */}
         <div className="p-4 border rounded-lg text-center">Solar Potential...</div>
       </div>
      <p className="text-gray-600">
        Details about solar energy potential, installation data, or whatever this metric represents for {city} would go here. (Currently mapped to crime index: {data.crimeIndex}).
      </p>
    </div>
  );
};

export default SolarPage;