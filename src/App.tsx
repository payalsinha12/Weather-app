import React, { useEffect, useState } from 'react';
import { Cloud, Moon, Sun, RotateCw } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { RecentSearches } from './components/RecentSearches';
import { ErrorMessage } from './components/ErrorMessage';
import { Forecast } from './components/forcast';
import type { WeatherData } from './types/weather';
import type { ForecastData } from './types/forcast';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addToRecentSearches = (city: string) => {
    setRecentSearches((prev) => {
      const newSearches = [city, ...prev.filter((s) => s !== city)].slice(0, 5);
      return newSearches;
    });
  };

  const fetchForecast = async (city: string) => {
    try {
      const res = await axios.get(FORECAST_URL, {
        params: { q: city, appid: API_KEY, units: 'metric' },
      });
      setForecast(res.data);
    } catch {
      setForecast(null);
    }
  };
/*fething the weather*/
  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API_URL, {
        params: { q: city, appid: API_KEY, units: 'metric' },
      });
      setWeather(res.data);
      await fetchForecast(city);
      addToRecentSearches(city);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('City not found. Please try again.');
      } else if (err.response?.status === 401) {
        setError('Invalid or unauthorized API key.');
      } else {
        setError('Failed to fetch weather data.');
      }
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };
/* lets see the animations and UI*/
  return (
    <div
      className={`min-h-screen transition-all duration-700 px-4 py-10 font-baloo ${
        darkMode
          ? 'text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black'
          : 'text-black bg-gradient-to-br from-blue-200 via-pink-100 to-blue-100'
      }`}
    >
      <div className="max-w-5xl mx-auto">
      
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 animate-pulse">
            <Cloud className="text-blue-600 dark:text-blue-400" size={36} />
            <h1 className="text-4xl font-extrabold tracking-wide">
              {'Weather Dashboard'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="inline-block transition-transform hover:-translate-y-1 hover:scale-105 duration-200"
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>
         
          <div className="flex gap-3">
            {weather && (
              <button
                onClick={() => fetchWeather(weather.name)}
                className="p-2 rounded-full bg-white/40 dark:bg-gray-700 hover:rotate-180 transition-transform"
              >
                <RotateCw className="text-blue-600 dark:text-white" />
              </button>
            )}
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/40 dark:bg-gray-700 backdrop-blur-md hover:scale-110 transition-transform"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-black" />}
            </button>
          </div>
        </div>

        {/* amazing Quote */}
        <p className="text-center text-lg italic font-medium mb-10 animate-fade-in-up">
          “Wherever you go, no matter what the weather, always bring your own sunshine.” ☀️
        </p>

        {/* Main Part */}
        <div className="flex flex-col items-center gap-8">
          <SearchBar onSearch={fetchWeather} isLoading={loading} />
          <RecentSearches searches={recentSearches} onSelect={fetchWeather} />

          {loading && (
            <div className="flex items-center justify-center mt-6">
              <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && <ErrorMessage message={error} />}

          {weather && !loading && !error && (
            <>
              <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] transition-all duration-500 transform hover:scale-105 backdrop-blur-lg bg-white/30 dark:bg-white/10 rounded-2xl shadow-xl p-1">
                <WeatherCard data={weather} />
              </div>

              {/* 5-day forecast */}
              {forecast && (
                <div className="w-full">
                  <Forecast data={forecast} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
