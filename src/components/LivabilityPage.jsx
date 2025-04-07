import React from 'react';
import ScoreCard from "./ScoreCard";

const LivabilityPage = ({ city, data, helpers }) => {
  return (
    // Add dark styles to page container
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-slate-700/50 p-6 mt-4">
      {/* Add dark style to title */}
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Livability Score - {city}</h2>

      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* ScoreCard component needs its own dark styles (see below) */}
          <ScoreCard title="Livability Score" value={data.livability} />
          {/* Dark styles for placeholders */}
          <div className="p-4 border border-gray-300 dark:border-slate-600 rounded-lg text-center text-gray-500 dark:text-gray-400">Key Factors...</div>
          <div className="p-4 border border-gray-300 dark:border-slate-600 rounded-lg text-center text-gray-500 dark:text-gray-400">Comparison...</div>
        </div>
      ) : (
        // Dark styles for placeholder text/background
        <div className="p-4 text-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          Specific livability score data is currently only available for Delhi, Mumbai, and Chennai. More comprehensive data coming soon.
        </div>
      )}

      {/* Add dark style to description */}
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Detailed livability breakdown (factors like housing, healthcare, environment, safety, etc.) for {city} would go here.
      </p>
    </div>
  );
};

export default LivabilityPage;