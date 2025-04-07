import React from 'react';
import ScoreCard from "./ScoreCard";

const WeatherPage = ({ city, data, helpers }) => {
  // Use the getSentimentStatus helper, as weather was linked to sentiment
  const sentiment = helpers.getSentimentStatus(data.sentimentScore);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Weather Sentiment - {city}</h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ScoreCard title="Sentiment Score" value={data.sentimentScore.toFixed(2)} /> {/* Display raw score */}
          <ScoreCard title="Overall Sentiment" value={sentiment.label} color={sentiment.color} />
          <div className="p-4 border rounded-lg text-center">Live Weather Feed...</div> {/* Placeholder */}
       </div>
      <p className="text-gray-600">
        Detailed weather forecasts, temperature, humidity, etc., for {city} could be shown here.
      </p>
    </div>
  );
};

export default WeatherPage;