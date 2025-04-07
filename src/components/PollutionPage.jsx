import React from 'react';
import ScoreCard from "./ScoreCard";

const PollutionPage = ({ city, data, helpers }) => {
  const pollution = data ? helpers.getPollutionStatus(data.pollutionIndex) : helpers.getPollutionStatus(null);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-slate-700/50 p-6 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Pollution Level - {city}</h2>

      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ScoreCard title="Pollution Index" value={data.pollutionIndex} />
            <ScoreCard title="Status" value={pollution.label} color={pollution.color} />
            <div className="p-4 border border-gray-300 dark:border-slate-600 rounded-lg text-center text-gray-500 dark:text-gray-400">AQI Details...</div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          Specific pollution index data is currently only available for Delhi, Mumbai, and Chennai.
        </div>
      )}

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Detailed pollution breakdown (PM2.5, AQI sources, historical trends) for {city} would go here.
      </p>
    </div>
  );
};

export default PollutionPage;