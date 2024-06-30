import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = '50d70ae9e0394b46be5124215243006';

    const fetchWeatherData = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
            );
            setWeatherData(response.data);
        } catch (error) {
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={fetchWeatherData}>Search</button>
            {loading && <p className="loading">Loading data...</p>}
            {error && (
                <div className="error">
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>OK</button>
                </div>
            )}
            {weatherData && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <h3>Temperature</h3>
                        <p>{weatherData.current.temp_c}°C</p>
                    </div>
                    <div className="weather-card">
                        <h3>Humidity</h3>
                        <p>{weatherData.current.humidity}%</p>
                    </div>
                    <div className="weather-card">
                        <h3>Condition</h3>
                        <p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="weather-card">
                        <h3>Wind Speed</h3>
                        <p>{weatherData.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
