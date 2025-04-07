import React from 'react';
// Removed ScoreCard, ChartCard imports
import MapCard from "./MapCard";

// Props now include city name and coordinates
const OverviewPage = ({ city, coords, isLoading }) => { // Removed data, helpers. Added isLoading

  // Don't render the map until loading is finished and coords are valid
  if (isLoading || !coords) {
     // You might show a placeholder or nothing while loading/error
    return null; // Or <div className="p-4 text-center">Waiting for location...</div>
  }

  return (
    <div className="space-y-6 mt-4">
      {/* Removed Score Cards section */}

      {/* Keep only the Map */}
      <div className="grid grid-cols-1 gap-4" style={{ minHeight: "500px" }}> {/* Increased height maybe */}
        <div className="h-full">
          {/* Pass the dynamic coordinates */}
          <MapCard city={city} coords={coords} />
        </div>
      </div>

      {/* Removed AI Insights + Recommendations section */}
    </div>
  );
};

export default OverviewPage;