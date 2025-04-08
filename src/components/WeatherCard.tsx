import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto p-6 rounded-3xl shadow-2xl border border-white/20 bg-white/20 backdrop-blur-lg dark:bg-gray-800/30 dark:border-gray-700/30 animate-float transition-all duration-500">
      {/* Decorative wave blur at the bottom */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-4 w-3/4 bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300 rounded-full blur-2xl opacity-40 pointer-events-none" />

      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{data.name}</h2>

        <div className="flex items-center justify-center mt-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-24 h-24"
          />
          <div className="text-6xl font-extrabold text-blue-700 dark:text-blue-200 ml-4">
            {Math.round(data.main.temp)}°C
          </div>
        </div>

        <p className="text-xl text-gray-600 dark:text-gray-300 capitalize mt-2">
          {data.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 text-center text-gray-800 dark:text-gray-100">
        <div className="flex flex-col items-center justify-center p-4 bg-blue-100/30 dark:bg-blue-900/30 rounded-xl shadow-md">
          <Droplets className="text-blue-600 dark:text-blue-300 mb-1" size={28} />
          <p className="text-sm">Humidity</p>
          <p className="text-xl font-semibold">{data.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-blue-100/30 dark:bg-blue-900/30 rounded-xl shadow-md">
          <Wind className="text-blue-600 dark:text-blue-300 mb-1" size={28} />
          <p className="text-sm">Wind Speed</p>
          <p className="text-xl font-semibold">{Math.round(data.wind.speed)} km/h</p>
        </div>
      </div>
    </div>
  );
}
