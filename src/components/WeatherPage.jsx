import React from 'react';
import ScoreCard from "./ScoreCard";

const WeatherPage = ({ city, data, helpers }) => {
  const sentiment = data ? helpers.getSentimentStatus(data.sentimentScore) : helpers.getSentimentStatus(null);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-slate-700/50 p-6 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Weather Sentiment - {city}</h2>

      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ScoreCard title="Sentiment Score" value={data.sentimentScore.toFixed(2)} />
          <ScoreCard title="Overall Sentiment" value={sentiment.label} color={sentiment.color} />
          <div className="p-4 border border-gray-300 dark:border-slate-600 rounded-lg text-center text-gray-500 dark:text-gray-400">Live Weather Feed...</div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          Specific weather sentiment data is currently only available for Delhi, Mumbai, and Chennai.
        </div>
      )}

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Detailed weather forecasts, temperature, humidity, etc., for {city} could be shown here.
      </p>
    </div>
  );
};

export default WeatherPage;