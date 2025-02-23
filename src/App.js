import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import "./styles.css";

function App() {
  const [city, setCity] = useState("Biarritz");

  return (
    <div className="app">
      <WeatherCard city={city} setCity={setCity} />
    </div>
  );
}

export default App;
