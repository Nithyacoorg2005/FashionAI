import { create } from 'zustand';
import { WeatherData, WeatherCondition } from '../types';

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: WeatherData[];
  isLoading: boolean;
  error: string | null;
  fetchWeather: (location: string) => Promise<void>;
}

// Mock weather data for the MVP
const mockWeatherData: WeatherData = {
  temperature: 22,
  condition: WeatherCondition.PartlyCloudy,
  precipitation: 10,
  humidity: 65,
  windSpeed: 12
};

const mockForecast: WeatherData[] = [
  {
    temperature: 24,
    condition: WeatherCondition.Sunny,
    precipitation: 0,
    humidity: 60,
    windSpeed: 10
  },
  {
    temperature: 20,
    condition: WeatherCondition.Rainy,
    precipitation: 70,
    humidity: 80,
    windSpeed: 15
  },
  {
    temperature: 18,
    condition: WeatherCondition.Cloudy,
    precipitation: 30,
    humidity: 75,
    windSpeed: 12
  },
  {
    temperature: 21,
    condition: WeatherCondition.PartlyCloudy,
    precipitation: 20,
    humidity: 65,
    windSpeed: 8
  },
  {
    temperature: 23,
    condition: WeatherCondition.Sunny,
    precipitation: 0,
    humidity: 55,
    windSpeed: 5
  },
];

const useWeatherStore = create<WeatherState>((set) => ({
  currentWeather: mockWeatherData,
  forecast: mockForecast,
  isLoading: false,
  error: null,
  
  fetchWeather: async (location) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would fetch from OpenWeatherMap or another API
      // For now, we'll use mock data
      set({ 
        currentWeather: mockWeatherData,
        forecast: mockForecast,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch weather data',
        isLoading: false
      });
    }
  }
}));

export default useWeatherStore;