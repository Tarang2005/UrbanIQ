import React from 'react';
import MapCard from "./MapCard"; // Import MapCard

// OverviewPage primarily wraps MapCard
const OverviewPage = ({ city, coords, isLoading }) => {

  // Don't render anything specific here if map handles its own loading state
  if (isLoading) {
    // Optionally show a general loading state for the page if desired
    // return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading overview...</div>;
  }

  return (
    <div className="space-y-6 mt-4">
      {/* Container for the map, ensures it takes height */}
      <div className="grid grid-cols-1 gap-4" style={{ minHeight: "60vh" }}> {/* Use vh or fixed height */}
        <div className="h-full">
           {/* MapCard will have its own dark mode styling */}
           <MapCard city={city} coords={coords} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;