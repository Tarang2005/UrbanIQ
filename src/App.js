import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import OverviewPage from "./components/OverviewPage";
import LivabilityPage from "./components/LivabilityPage";
import WeatherPage from "./components/WeatherPage";
import PollutionPage from "./components/PollutionPage";
import TrafficPage from "./components/TrafficPage";
import SolarPage from "./components/SolarPage";
import "./index.css"; // Your global styles

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

// Helper functions
const getSentimentStatus = (score) => {
  if (score === undefined || score === null) return { label: "N/A", color: "text-gray-500 dark:text-gray-400"}; // Added dark variant
  if (score > 0.5) return { label: "Positive", color: "text-green-600 dark:text-green-400" };
  if (score < -0.2) return { label: "Negative", color: "text-red-600 dark:text-red-400" };
  return { label: "Neutral", color: "text-gray-500 dark:text-gray-400" };
};
const getPollutionStatus = (index) => {
  if (index === undefined || index === null) return { label: "N/A", color: "text-gray-500 dark:text-gray-400"};
  if (index < 40) return { label: "Low", color: "text-blue-600 dark:text-blue-400" };
  if (index < 70) return { label: "Moderate", color: "text-yellow-500 dark:text-yellow-400" };
  return { label: "High", color: "text-red-600 dark:text-red-400" };
};
const getTrafficStatus = (index) => {
  if (index === undefined || index === null) return { label: "N/A", color: "text-gray-500 dark:text-gray-400"};
  if (index < 40) return { label: "Low", color: "text-blue-600 dark:text-blue-400" };
  if (index < 70) return { label: "Medium", color: "text-yellow-500 dark:text-yellow-400" };
  return { label: "High", color: "text-red-600 dark:text-red-400" };
};
const getCrimeStatus = (index) => { // Used for Solar page
  if (index === undefined || index === null) return { label: "N/A", color: "text-gray-500 dark:text-gray-400"};
  if (index < 30) return { label: "Low", color: "text-green-600 dark:text-green-400" };
  if (index < 60) return { label: "Moderate", color: "text-yellow-500 dark:text-yellow-400" };
  return { label: "High", color: "text-red-600 dark:text-red-400" };
};
const helpers = { getSentimentStatus, getPollutionStatus, getTrafficStatus, getCrimeStatus };

const libraries = ["places"];

function App() {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [cityCoordinates, setCityCoordinates] = useState(initialCoords);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const newTheme = isDarkMode ? 'dark' : 'light';
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&format=json&addressdetails=1&countrycodes=in&limit=1&viewbox=68,8,97,37&bounded=1`;
    try {
      const response = await fetch(apiUrl, { headers: { 'User-Agent': 'UrbanIQApp/1.0 (your-contact@example.com)' }}); // CHANGE EMAIL
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const result = data[0];
        const newCoords = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) }; // lng for Google Maps
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
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Configuration Error!</strong>
          <span className="block sm:inline"> Google Maps API Key is missing. Please add it to your .env file as REACT_APP_GOOGLE_MAPS_API_KEY.</span>
        </div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-100 p-6 transition-colors duration-200">
          <Header
            selectedCity={selectedCity}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />

           {isLoading && <div className="text-center p-4 text-blue-600 dark:text-blue-400">Loading location data...</div>}
           {error && <div className="text-center p-4 text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/50 rounded-md my-2">{error}</div>}

          <Routes>
            <Route path="/" element={<LandingPage handleSearch={handleSearch} />} />
            <Route path="/overview" element={<OverviewPage city={selectedCity} coords={currentCoords} isLoading={isLoading} />} />
            <Route path="/livability" element={<LivabilityPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />} />
            <Route path="/weather" element={<WeatherPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />} />
            <Route path="/pollution" element={<PollutionPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />} />
            <Route path="/traffic" element={<TrafficPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />} />
            <Route path="/solar" element={<SolarPage city={selectedCity} data={currentHardcodedData} helpers={helpers} />} />
          </Routes>
        </div>
      </Router>
    </LoadScript>
  );
}

export default App;