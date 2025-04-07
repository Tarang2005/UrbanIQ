import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%' // Takes height from parent
};

// Basic dark mode map style from Google Docs examples (Snazzy Maps has more)
const mapStyleDark = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];


const MapCard = ({ city, coords }) => {
  const [map, setMap] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const isDarkMode = document.documentElement.classList.contains('dark'); // Check current mode

  const center = coords;

  const onLoad = useCallback(mapInstance => setMap(mapInstance), []);
  const onUnmount = useCallback(mapInstance => setMap(null), []);

  useEffect(() => {
    if (map && center) {
        map.panTo(center); map.setZoom(13); setShowInfoWindow(true);
    }
  }, [center, map]);

  const handleMarkerClick = () => setShowInfoWindow(true);
  const handleInfoWindowClose = () => setShowInfoWindow(false);

  return (
    // Add dark styles to card container
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-slate-700/50 p-4 h-full flex flex-col">
      {/* Add dark style to title */}
      <h2 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Interactive City Map: {city}</h2>
      <div className="flex-grow h-full">
        {coords ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false, mapTypeControl: false, fullscreenControl: false,
                styles: isDarkMode ? mapStyleDark : [] // Apply dark style conditionally
            }}
          >
            <MarkerF position={center} title={city} onClick={handleMarkerClick}>
             {showInfoWindow && (
                <InfoWindowF position={center} onCloseClick={handleInfoWindowClose}>
                    {/* Style info window content if needed */}
                    <div> <h3 className="font-semibold text-gray-900">{city}</h3> </div>
                </InfoWindowF>
              )}
            </MarkerF>
          </GoogleMap>
        ) : (
           <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Loading map...</div>
        )}
      </div>
    </div>
  );
};

export default MapCard;