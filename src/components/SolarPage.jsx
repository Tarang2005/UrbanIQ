import React from 'react';
import ScoreCard from "./ScoreCard";

const SolarPage = ({ city, data, helpers }) => {
  // Assuming 'Solar' uses crime index based on original structure
  const crime = data ? helpers.getCrimeStatus(data.crimeIndex) : helpers.getCrimeStatus(null);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-slate-700/50 p-6 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Solar/Other Index - {city}</h2>

       {data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
           <ScoreCard title="Index Value" value={data.crimeIndex} />
           <ScoreCard title="Status" value={crime.label} color={crime.color} />
          <div className="p-4 border border-gray-300 dark:border-slate-600 rounded-lg text-center text-gray-500 dark:text-gray-400">Solar Potential...</div>
        </div>
       ) : (
         <div className="p-4 text-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
           Specific index data is currently only available for Delhi, Mumbai, and Chennai.
         </div>
       )}

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Details about solar energy potential, installation data, or whatever this metric represents for {city}. (Currently mapped to crime index: {data ? data.crimeIndex : 'N/A'}).
      </p>
    </div>
  );
};

export default SolarPage;