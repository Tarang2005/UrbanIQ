// src/components/MapCard.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const cityCoordinates = {
  delhi: [28.6139, 77.2090],
  mumbai: [19.0760, 72.8777],
  bangalore: [12.9716, 77.5946],
  chennai: [13.0827, 80.2707],
  kolkata: [22.5726, 88.3639],
};

const MapCard = ({ city = "delhi" }) => {
  const position = cityCoordinates[city.toLowerCase()] || cityCoordinates["delhi"];

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 h-full">
      <h2 className="text-lg font-semibold mb-2">Interactive City Map</h2>
      <div className="h-full rounded-xl overflow-hidden">
        <MapContainer
          center={position}
          zoom={11}
          key={city} // 🧠 ensures map resets when city changes
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{city.charAt(0).toUpperCase() + city.slice(1)}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapCard;
