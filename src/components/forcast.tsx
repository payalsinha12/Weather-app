import React from 'react';
import { motion } from 'framer-motion';

export const Forecast = ({ data }: { data: any }) => {
  const daily = data.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 5);

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {daily.map((item: any, idx: number) => (
        <div
          key={idx}
          className="rounded-xl p-4 shadow-md bg-white/40 dark:bg-white/10 text-center backdrop-blur-md hover:scale-105 transition-transform"
        >
          <p className="font-bold text-lg">{new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}</p>
          <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt=""
            className="mx-auto"
          />
          <p className="text-xl">{Math.round(item.main.temp)}°C</p>
          <p className="text-sm capitalize">{item.weather[0].description}</p>
        </div>
      ))}
    </motion.div>
  );
};
