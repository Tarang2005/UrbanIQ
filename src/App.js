import React, { useState } from "react";
import Header from "./components/Hearder";
import Dashboard from "./components/Dashboard";
import "./index.css";

function App() {
  const [selectedCity, setSelectedCity] = useState("Delhi");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <Dashboard city={selectedCity} />
    </div>
  );
}

export default App;
