import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash.debounce';

const LandingPage = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]); setIsSuggestionsVisible(false); return;
    }
    setIsSuggestionsLoading(true); setIsSuggestionsVisible(true);
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&countrycodes=in&limit=10`;
    try {
      const response = await fetch(apiUrl, { headers: { 'User-Agent': 'UrbanIQApp/1.0 (your-contact@example.com)' }}); // CHANGE EMAIL
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      data.sort((a, b) => b.importance - a.importance);
      setSuggestions(data.slice(0, 5).map(item => ({ id: item.place_id, name: item.display_name })));
    } catch (error) {
      console.error("Error fetching suggestions:", error); setSuggestions([]);
    } finally {
      setIsSuggestionsLoading(false);
    }
  };

  // eslint-disable-next-line
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 400), []);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedFetchSuggestions(newSearchTerm);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name); setSuggestions([]); setIsSuggestionsVisible(false);
    handleSearchSubmit(suggestion.name);
  };

  const handleSearchSubmit = async (query) => {
    if (typeof query !== 'string') { query.preventDefault && query.preventDefault(); query = searchTerm; }
    if (query.trim()) {
        setSuggestions([]); setIsSuggestionsVisible(false);
        await handleSearch(query.trim());
        navigate('/overview');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) { setIsSuggestionsVisible(false); }
    };
    if (isSuggestionsVisible) { document.addEventListener("mousedown", handleClickOutside); }
    else { document.removeEventListener("mousedown", handleClickOutside); }
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, [isSuggestionsVisible]);

  return (
    // Main container - keeping gradient, adding dark shadow variant
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]
                    bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700
                    text-white rounded-2xl shadow-xl dark:shadow-indigo-900/40 p-10 mt-4 relative">

        {/* Map Pin Icon - already contrasts */}
        <MapPinIcon className="h-16 w-16 text-indigo-200 mb-4" />
        {/* Title - already contrasts */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-center">Welcome to UrbanIQ</h1>
        {/* Subtitle - already contrasts */}
        <p className="text-lg sm:text-xl text-indigo-100 mb-8 text-center max-w-2xl">
            Your modern dashboard for exploring city insights.
            Enter a city in India below to view its map and metrics.
        </p>

        {/* Search Form Container */}
        <div className="w-full max-w-xl relative">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Input with dark styles */}
              <input
                  type="text" value={searchTerm} onChange={handleInputChange}
                  onFocus={() => {if(suggestions.length > 0) setIsSuggestionsVisible(true)}}
                  placeholder="Enter city name (e.g., Mumbai, Jaipur...)" autoComplete="off"
                  className="w-full sm:w-auto flex-grow px-5 py-3 text-lg text-gray-800 dark:text-gray-100 bg-white/90 dark:bg-slate-800/90
                            border border-transparent dark:border-slate-700 rounded-lg shadow-md
                            focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 focus:border-transparent
                            placeholder-gray-500 dark:placeholder-gray-400"
              />
              {/* Button with dark styles */}
              <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-white text-indigo-600 dark:bg-indigo-500 dark:text-white rounded-lg shadow-md
                            hover:bg-indigo-100 dark:hover:bg-indigo-400 hover:text-indigo-700 dark:hover:text-white
                            transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
              >
                  Search
              </button>
          </form>

          {/* Suggestions List with dark styles */}
          {isSuggestionsVisible && (
            <ul
              ref={suggestionsRef}
              className="absolute z-10 w-full left-0 right-0 mt-1 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto"
            >
              {isSuggestionsLoading ? (
                <li className="px-4 py-2 text-gray-500 dark:text-gray-400 italic">Loading suggestions...</li>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-indigo-100 dark:hover:bg-slate-600 cursor-pointer"
                  >
                    {suggestion.name}
                  </li>
                ))
              ) : (
                searchTerm.length >= 3 && <li className="px-4 py-2 text-gray-500 dark:text-gray-400 italic">No suggestions found.</li>
              )}
            </ul>
          )}
        </div>

        {/* Footer text - already contrasts */}
        <p className="text-sm text-indigo-200 mt-8">
            Currently displaying map data via OpenStreetMap & Google Maps.
        </p>
    </div>
  );
};

export default LandingPage;