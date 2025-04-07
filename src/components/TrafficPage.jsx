import React from 'react';
import ScoreCard from "./ScoreCard";

const TrafficPage = ({ city, data, helpers }) => {
  const traffic = helpers.getTrafficStatus(data.trafficIndex);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Traffic Congestion - {city}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <ScoreCard title="Traffic Index" value={data.trafficIndex} />
         <ScoreCard title="Congestion Level" value={traffic.label} color={traffic.color} />
         {/* Placeholder for live traffic map or delay info */}
         <div className="p-4 border rounded-lg text-center">Live Delay Info...</div>
      </div>
      <p className="text-gray-600">
        Detailed traffic information, bottleneck areas, average commute times for {city} would go here.
      </p>
    </div>
  );
};

export default TrafficPage;