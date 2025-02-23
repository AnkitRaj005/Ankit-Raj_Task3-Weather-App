import React, { useState, useEffect } from "react";
import axios from "axios";
import { WiDaySunny, WiRain, WiCloudy } from "react-icons/wi";
import "./WeatherCard.css";

const API_KEY = "68ac330cd6a516a3eb771e3d18011024"; // Replace with your API Key

const WeatherCard = ({ city, setCity }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError("City not found");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setCity(event.target.value);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="weather-container">
      {/* Left Card */}
      <div className="left-card">
        <h2>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</h2>
        <p className="date">{new Date().toLocaleDateString()}</p>
        <p className="location">📍 {weather.name}, {weather.sys.country}</p>
        <div className="weather-icon">
          {weather.weather[0].main === "Clear" ? (
            <WiDaySunny size={50} color="#fff" />
          ) : weather.weather[0].main === "Clouds" ? (
            <WiCloudy size={50} color="#fff" />
          ) : (
            <WiRain size={50} color="#fff" />
          )}
        </div>
        <h1>{Math.round(weather.main.temp)}°C</h1>
        <p>{weather.weather[0].description}</p>
      </div>

      {/* Right Card */}
      <div className="right-card">
        <p className="details"><strong>PRECIPITATION:</strong> {weather.clouds.all}%</p>
        <p className="details"><strong>HUMIDITY:</strong> {weather.main.humidity}%</p>
        <p className="details"><strong>WIND:</strong> {weather.wind.speed} km/h</p>

        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="Enter city..." 
          onKeyDown={handleSearch}
          className="search-input"
        />

        {/* Button */}
        <button className="change-location">📍 Change Location</button>
      </div>
    </div>
  );
};

export default WeatherCard;
