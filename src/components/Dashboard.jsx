// If you're not using them anymore:
import ScoreCard from "./ScoreCard";
import ChartCard from "./ChartCard";
import MapCard from "./MapCard";
// Utility functions to derive labels + colors
const getSentimentStatus = (score) => {
  if (score > 0.5) return { label: "Positive", color: "text-green-600" };
  if (score < -0.2) return { label: "Negative", color: "text-red-600" };
  return { label: "Neutral", color: "text-gray-500" };
};

const getPollutionStatus = (index) => {
  if (index < 40) return { label: "Low", color: "text-blue-600" };
  if (index < 70) return { label: "Moderate", color: "text-yellow-500" };
  return { label: "High", color: "text-red-600" };
};

const getTrafficStatus = (index) => {
  if (index < 40) return { label: "Low", color: "text-blue-600" };
  if (index < 70) return { label: "Medium", color: "text-yellow-500" };
  return { label: "High", color: "text-red-600" };
};

const getWaterPollutionStatus = (index) => {
  if (index < 40) return { label: "Low", color: "text-blue-600" };
  if (index < 70) return { label: "Moderate", color: "text-yellow-500" };
  return { label: "High", color: "text-red-600" };
};

const getCrimeStatus = (index) => {
  if (index < 30) return { label: "Low", color: "text-green-600" };
  if (index < 60) return { label: "Moderate", color: "text-yellow-500" };
  return { label: "High", color: "text-red-600" };
};

const cityData = {
  Delhi: {
    livability: 78,
    sentimentScore: 0.7,      // Range: -1 to 1
    pollutionIndex: 62,       // Example: 0–100
    trafficIndex: 80,
    waterPollutionIndex: 45,
    crimeIndex: 35
  },
  Mumbai: {
    livability: 72,
    sentimentScore: 0.2,
    pollutionIndex: 75,
    trafficIndex: 90,
    waterPollutionIndex: 55,
    crimeIndex: 50
  },
  Chennai: {
    livability: 80,
    sentimentScore: 0.5,
    pollutionIndex: 50,
    trafficIndex: 65,
    waterPollutionIndex: 40,
    crimeIndex: 30,
  }
};

const Dashboard = ({ city }) => {
  const data = cityData[city] || cityData["Delhi"];
  const sentiment = getSentimentStatus(data.sentimentScore);
  const pollution = getPollutionStatus(data.pollutionIndex);
  const traffic = getTrafficStatus(data.trafficIndex);
  const waterPollution = getWaterPollutionStatus(data.waterPollutionIndex);
  const crime = getCrimeStatus(data.crimeIndex);

  return (
    <div className="space-y-6">
      {/* Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <ScoreCard title="Livability Score" value={data.livability} />
        <ScoreCard title="Weather" value={sentiment.label} color={sentiment.color} />
        <ScoreCard title="Pollution Level" value={pollution.label} color={pollution.color} />
        <ScoreCard title="Traffic Congestion" value={traffic.label} color={traffic.color} />
        <ScoreCard title="Solar" value={crime.label} color={crime.color} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ height: "400px" }}>
        <div className="h-full">
          <ChartCard city={city} livability={data.livability} />
        </div>
        <div className="h-full">
          <MapCard city={city} />
        </div>
      </div>

      {/* AI Insights + Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-md font-semibold text-gray-700 mb-2">AI Insights</h2>
          <p className="text-gray-600 text-sm">
            Air quality improved by <strong>12%</strong> in the past 3 months. Sentiment is trending positive in {city}'s residential zones.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-md font-semibold text-gray-700 mb-2">Recommendations</h2>
          <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1">
            <li>Try cycling in green zones to avoid traffic stress</li>
            <li>Peak hours to avoid: 8AM–10AM, 6PM–8PM</li>
            <li>Use metro routes for better air quality travel</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
