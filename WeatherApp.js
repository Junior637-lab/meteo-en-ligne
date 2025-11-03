import React, { useState, useEffect } from "react";

const API_KEY = "62053c19d7917f6d3a47d2a4d07d8373";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // Charger la dernière recherche au démarrage
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}&lang=fr`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        localStorage.setItem("lastCity", cityName);
      } else {
        setWeather(null);
        alert("Ville non trouvée !");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchWeather(city);
  };

  return (
    <div className="weather-container">
      <h1>🌤️ WeatherNow</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Entrez une ville..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icône météo"
          />
          <h3>{Math.round(weather.main.temp)}°C</h3>
        </div>
      )}
    </div>
  );
}
