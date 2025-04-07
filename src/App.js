// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api"; // Import LoadScript
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import OverviewPage from "./components/OverviewPage";
import LivabilityPage from "./components/LivabilityPage";
import WeatherPage from "./components/WeatherPage";
import PollutionPage from "./components/PollutionPage";
import TrafficPage from "./components/TrafficPage";
import SolarPage from "./components/SolarPage";
import "./index.css";

// Hardcoded data for specific cities
const cityData = {
  Delhi: { livability: 78, sentimentScore: 0.7, pollutionIndex: 62, trafficIndex: 80, crimeIndex: 35 },
  Mumbai: { livability: 72, sentimentScore: 0.2, pollutionIndex: 75, trafficIndex: 90, crimeIndex: 50 },
  Chennai: { livability: 80, sentimentScore: 0.5, pollutionIndex: 50, trafficIndex: 65, crimeIndex: 30 },
};

// Coordinates for specific cities and initial default
const cityCoordsData = {
  DelhiCoords: { lat: 28.6139, lng: 77.2090 }, // Use lng for Google Maps
  MumbaiCoords: { lat: 19.0760, lng: 72.8777 },
  ChennaiCoords: { lat: 13.0827, lng: 80.2707 },
};

const initialCoords = cityCoordsData.DelhiCoords; // Default coordinates

// Helper functions (remain the same)
const getSentimentStatus = (score) => {
  if (score === undefined || score === null) return { label: "N/A", color: "text-gray-500"};
  if (score > 0.5) return { label: "Positive", color: "text-green-600" };
  if (score < -0.2) return { label: "Negative", color: "text-red-600" };
  return { label: "Neutral", color: "text-gray-500" };
};
const getPollutionStatus = (index) => {
  if (index === undefined || index === null) return { label: "N/A", color: "text-gray-500"};
  if (index < 40) return { label: "Low", color: "text-blue-600" };
  if (index < 70) return { label: "Moderate", color: "text-yellow-500" };
  return { label: "High", color: "text-red-600" };
};
const getTrafficStatus = (index) => {
  if (index === undefined || index === null) return { label: "N/A", color: "text-gray-500"};
  if (index < 40) return { label: "Low", color: "text-blue-600" };
  if (index < 70) return { label: "Medium", color: "text-yellow-500" };
  return { label: "High", color: "text-red-600" };
};
const getCrimeStatus = (index) => {
  if (index === undefined || index === null) return { label: "N/A", color: "text-gray-500"};
  if (index < 30) return { label: "Low", color: "text-green-600" };
  if (index < 60) return { label: "Moderate", color: "text-yellow-500" };
  return { label: "High", color: "text-red-600" };
};
const helpers = { getSentimentStatus, getPollutionStatus, getTrafficStatus, getCrimeStatus };

// Libraries needed for Google Maps script loading
const libraries = ["places"];

function App() {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [cityCoordinates, setCityCoordinates] = useState(initialCoords); // Note: Google Maps uses { lat: ..., lng: ... }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Geocoding function
  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    // Using OpenStreetMap Nominatim for Geocoding still - It's free and suitable here.
    // Google Geocoding API is an alternative but costs money after free tier.
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&format=json&addressdetails=1&countrycodes=in&limit=1&viewbox=68,8,97,37&bounded=1`;

    try {
      const response = await fetch(apiUrl, {
        headers: { 'User-Agent': 'UrbanIQApp/1.0 (your-contact@example.com)' } // CHANGE THIS
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        // ** IMPORTANT: Use lng for Google Maps compatibility **
        const newCoords = {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon) // Changed lon to lng
        };
        const displayName = result.address?.city || result.address?.town || result.address?.state_district || result.address?.state || result.display_name.split(',')[0];
        setSelectedCity(displayName);
        setCityCoordinates(newCoords);
      } else {
        setError(`Could not find location: ${searchTerm}`);
      }
    } catch (err) {
      console.error("Geocoding API error:", err);
      setError("Failed to fetch location data.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentHardcodedData = cityData[selectedCity] || null;
  const currentCoords = cityCoordsData[`${selectedCity}Coords`] || cityCoordinates;

  // Check if the Google Maps API key is provided
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    // Display a prominent error message if the API key is missing
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Configuration Error!</strong>
          <span className="block sm:inline"> Google Maps API Key is missing. Please add it to your .env file as REACT_APP_GOOGLE_MAPS_API_KEY.</span>
        </div>
      </div>
    );
  }

  return (
    // Load the Google Maps script with your API key
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={libraries} // Optional: load additional libraries like places, drawing, etc.
    >
      <Router>
        <div className="min-h-screen bg-gray-100 p-6">
          <Header
            selectedCity={selectedCity}
            // No handleSearch passed to Header anymore
          />

           {isLoading && <div className="text-center p-4 text-blue-600">Loading location data...</div>}
           {error && <div className="text-center p-4 text-red-600 bg-red-100 rounded-md my-2">{error}</div>}

          <Routes>
            <Route
              path="/"
              element={<LandingPage handleSearch={handleSearch} />}
            />
            <Route
              path="/overview"
              // Pass coordinates adjusted for Google Maps (lat/lng)
              element={<OverviewPage city={selectedCity} coords={currentCoords} isLoading={isLoading} />}
            />
            {/* Specific Metric Pages remain the same logically */}
            <Route
              path="/livability"
              element={<LivabilityPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />}
            />
            <Route
              path="/weather"
              element={<WeatherPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />}
            />
            <Route
              path="/pollution"
              element={<PollutionPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />}
            />
             <Route
              path="/traffic"
              element={<TrafficPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />}
            />
             <Route
              path="/solar"
              element={<SolarPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />}
            />
          </Routes>
        </div>
      </Router>
    </LoadScript>
  );
}

export default App;