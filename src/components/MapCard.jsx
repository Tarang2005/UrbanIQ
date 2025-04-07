// src/components/MapCard.jsx

import React, { useState, useCallback, useRef, useEffect } from 'react';
// Import Google Maps components
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%' // Ensure container takes available height
};

// Props: city (string name), coords ({ lat: number, lng: number })
const MapCard = ({ city, coords }) => {
  const [map, setMap] = useState(null); // State to hold the map instance
  const [showInfoWindow, setShowInfoWindow] = useState(true); // State to control info window visibility

  const center = coords; // Use coords directly { lat: ..., lng: ... }

  // Callback when the map loads
  const onLoad = useCallback(function callback(mapInstance) {
    // Optionally: Adjust bounds or do something with the map instance
    // const bounds = new window.google.maps.LatLngBounds(center);
    // mapInstance.fitBounds(bounds);
    setMap(mapInstance);
  }, [center]); // Recalculate onLoad if center changes (though typically center is stable once loaded)

  // Callback when the map is unmounted
  const onUnmount = useCallback(function callback(mapInstance) {
    setMap(null);
  }, []);

  // Use effect to pan the map when coordinates change after initial load
  useEffect(() => {
      if (map && center) {
          map.panTo(center);
          map.setZoom(13); // Reset zoom level on new search
          setShowInfoWindow(true); // Show info window for new location
      }
  }, [center, map]); // Re-run effect if coords (center) or map instance change

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 h-full flex flex-col">
      <h2 className="text-md font-semibold text-gray-700 mb-2">Interactive City Map: {city}</h2>
      <div className="flex-grow h-full"> {/* Ensure this div takes up space */}
        {/* Render GoogleMap only if coords are valid */}
        {coords ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13} // Initial zoom level
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ // Optional: Disable some controls
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
          >
            {/* Child components, like markers, info windows, etc. */}
            <MarkerF
              position={center}
              title={city}
              onClick={handleMarkerClick} // Show info window on click
            >
             {/* Conditionally render InfoWindow based on state */}
             {showInfoWindow && (
                <InfoWindowF
                    position={center}
                    onCloseClick={handleInfoWindowClose} // Allow closing
                >
                    <div>
                        <h3 className="font-semibold">{city}</h3>
                        {/* Add more info if available */}
                    </div>
                </InfoWindowF>
              )}
            </MarkerF>
          </GoogleMap>
        ) : (
           <div className="flex items-center justify-center h-full text-gray-500">Loading map...</div>
        )}
      </div>
    </div>
  );
};

export default MapCard;