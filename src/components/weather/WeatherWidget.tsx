import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, Sun, CloudSun } from 'lucide-react';
import { WeatherCondition } from '../../types';
import useWeatherStore from '../../store/weatherStore';

const WeatherWidget: React.FC = () => {
  const { currentWeather, isLoading, error, fetchWeather } = useWeatherStore();
  
  useEffect(() => {
    // In a real app, we would get the user's location
    fetchWeather('New York');
  }, [fetchWeather]);
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-red-600 dark:text-red-400">
        <p>Error loading weather data</p>
      </div>
    );
  }
  
  if (!currentWeather) {
    return null;
  }
  
  const getWeatherIcon = (condition: WeatherCondition) => {
    switch (condition) {
      case WeatherCondition.Sunny:
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case WeatherCondition.PartlyCloudy:
        return <CloudSun className="w-8 h-8 text-gray-500" />;
      case WeatherCondition.Cloudy:
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case WeatherCondition.Rainy:
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case WeatherCondition.Stormy:
        return <CloudLightning className="w-8 h-8 text-purple-500" />;
      case WeatherCondition.Snowy:
        return <CloudSnow className="w-8 h-8 text-blue-300" />;
      case WeatherCondition.Foggy:
        return <CloudFog className="w-8 h-8 text-gray-400" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };
  
  const getWeatherText = (condition: WeatherCondition) => {
    return condition.replace(/-/g, ' ');
  };
  
  const getWeatherGradient = (condition: WeatherCondition) => {
    switch (condition) {
      case WeatherCondition.Sunny:
        return 'from-yellow-400 to-orange-300';
      case WeatherCondition.PartlyCloudy:
        return 'from-blue-400 to-gray-300';
      case WeatherCondition.Cloudy:
        return 'from-gray-400 to-gray-300';
      case WeatherCondition.Rainy:
        return 'from-blue-400 to-blue-300';
      case WeatherCondition.Stormy:
        return 'from-purple-500 to-gray-700';
      case WeatherCondition.Snowy:
        return 'from-blue-100 to-gray-100';
      case WeatherCondition.Foggy:
        return 'from-gray-300 to-gray-200';
      default:
        return 'from-blue-400 to-blue-300';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
    >
      <div className={`bg-gradient-to-r ${getWeatherGradient(currentWeather.condition)} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">Current Weather</p>
            <h3 className="text-2xl font-bold mt-1">
              {currentWeather.temperature}°C
            </h3>
            <p className="text-sm mt-1 capitalize">
              {getWeatherText(currentWeather.condition)}
            </p>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
          >
            {getWeatherIcon(currentWeather.condition)}
          </motion.div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
              {currentWeather.humidity}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Precipitation</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
              {currentWeather.precipitation}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Wind</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
              {currentWeather.windSpeed} km/h
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;