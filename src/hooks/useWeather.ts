// import { useState, useCallback } from 'react';
// import { 
//   CurrentWeather, 
//   ForecastDay, 
//   CityWeather, 
//   WeatherApiResponse, 
//   ForecastApiResponse,
//   TemperatureUnit 
// } from '@/types/weather';

// const API_KEY = 'demo'; // Replace with actual API key
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// // Demo data for when API is not configured
// const DEMO_CURRENT_WEATHER: CurrentWeather = {
//   city: 'New York',
//   country: 'US',
//   temperature: 22,
//   feelsLike: 24,
//   humidity: 65,
//   windSpeed: 12,
//   condition: {
//     id: 800,
//     main: 'Clear',
//     description: 'clear sky',
//     icon: '01d',
//   },
//   visibility: 10000,
//   pressure: 1013,
//   sunrise: Date.now() / 1000 - 21600,
//   sunset: Date.now() / 1000 + 21600,
//   timezone: -18000,
//   dt: Date.now() / 1000,
// };

// const DEMO_FORECAST: ForecastDay[] = [
//   { date: '2024-01-15', dayName: 'Mon', temperature: { min: 18, max: 24 }, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 60, windSpeed: 10, pop: 0 },
//   { date: '2024-01-16', dayName: 'Tue', temperature: { min: 16, max: 22 }, condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }, humidity: 65, windSpeed: 12, pop: 10 },
//   { date: '2024-01-17', dayName: 'Wed', temperature: { min: 14, max: 19 }, condition: { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }, humidity: 80, windSpeed: 15, pop: 70 },
//   { date: '2024-01-18', dayName: 'Thu', temperature: { min: 15, max: 21 }, condition: { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }, humidity: 70, windSpeed: 8, pop: 20 },
//   { date: '2024-01-19', dayName: 'Fri', temperature: { min: 17, max: 25 }, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 55, windSpeed: 6, pop: 0 },
// ];

// const DEMO_CITIES: CityWeather[] = [
//   { id: 1, city: 'London', country: 'GB', temperature: 12, condition: { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }, humidity: 78, windSpeed: 18 },
//   { id: 2, city: 'Paris', country: 'FR', temperature: 15, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 62, windSpeed: 10 },
//   { id: 3, city: 'Tokyo', country: 'JP', temperature: 8, condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }, humidity: 45, windSpeed: 8 },
//   { id: 4, city: 'Sydney', country: 'AU', temperature: 28, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 55, windSpeed: 15 },
//   { id: 5, city: 'Dubai', country: 'AE', temperature: 32, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 40, windSpeed: 12 },
//   { id: 6, city: 'Singapore', country: 'SG', temperature: 30, condition: { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }, humidity: 85, windSpeed: 8 },
//   { id: 7, city: 'Mumbai', country: 'IN', temperature: 31, condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }, humidity: 70, windSpeed: 14 },
//   { id: 8, city: 'Berlin', country: 'DE', temperature: 10, condition: { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }, humidity: 72, windSpeed: 20 },
//   { id: 9, city: 'Moscow', country: 'RU', temperature: -5, condition: { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }, humidity: 88, windSpeed: 25 },
//   { id: 10, city: 'Cairo', country: 'EG', temperature: 25, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 35, windSpeed: 10 },
//   { id: 11, city: 'Toronto', country: 'CA', temperature: 5, condition: { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }, humidity: 65, windSpeed: 22 },
//   { id: 12, city: 'Los Angeles', country: 'US', temperature: 24, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 50, windSpeed: 8 },
//   { id: 13, city: 'São Paulo', country: 'BR', temperature: 26, condition: { id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }, humidity: 78, windSpeed: 12 },
//   { id: 14, city: 'Hong Kong', country: 'HK', temperature: 22, condition: { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }, humidity: 72, windSpeed: 16 },
//   { id: 15, city: 'Amsterdam', country: 'NL', temperature: 11, condition: { id: 500, main: 'Rain', description: 'light rain', icon: '10d' }, humidity: 82, windSpeed: 28 },
//   { id: 16, city: 'Seoul', country: 'KR', temperature: 6, condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }, humidity: 55, windSpeed: 10 },
//   { id: 17, city: 'Bangkok', country: 'TH', temperature: 33, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 65, windSpeed: 6 },
//   { id: 18, city: 'Istanbul', country: 'TR', temperature: 14, condition: { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }, humidity: 68, windSpeed: 18 },
//   { id: 19, city: 'Rome', country: 'IT', temperature: 16, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 58, windSpeed: 12 },
//   { id: 20, city: 'Barcelona', country: 'ES', temperature: 18, condition: { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }, humidity: 60, windSpeed: 14 },
//   { id: 21, city: 'Vienna', country: 'AT', temperature: 9, condition: { id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' }, humidity: 75, windSpeed: 15 },
//   { id: 22, city: 'Prague', country: 'CZ', temperature: 7, condition: { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }, humidity: 70, windSpeed: 12 },
//   { id: 23, city: 'Stockholm', country: 'SE', temperature: 3, condition: { id: 600, main: 'Snow', description: 'light snow', icon: '13d' }, humidity: 85, windSpeed: 20 },
//   { id: 24, city: 'Oslo', country: 'NO', temperature: 1, condition: { id: 601, main: 'Snow', description: 'snow', icon: '13d' }, humidity: 90, windSpeed: 18 },
//   { id: 25, city: 'Athens', country: 'GR', temperature: 17, condition: { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }, humidity: 52, windSpeed: 10 },
// ];

// export const useWeather = () => {
//   const [current, setCurrent] = useState<CurrentWeather | null>(null);
//   const [forecast, setForecast] = useState<ForecastDay[]>([]);
//   const [cities, setCities] = useState<CityWeather[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const convertTemperature = (temp: number, unit: TemperatureUnit): number => {
//     if (unit === 'fahrenheit') {
//       return Math.round((temp * 9) / 5 + 32);
//     }
//     return Math.round(temp);
//   };

//   const fetchCurrentWeather = useCallback(async (city: string): Promise<void> => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Simulate API delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));
      
//       if (API_KEY === 'demo') {
//         // Use demo data with searched city name
//         setCurrent({
//           ...DEMO_CURRENT_WEATHER,
//           city: city.charAt(0).toUpperCase() + city.slice(1),
//           temperature: Math.floor(Math.random() * 20) + 10,
//         });
//         return;
//       }

//       const response = await fetch(
//         `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
//       );

//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error('City not found. Please check the spelling and try again.');
//         }
//         throw new Error('Failed to fetch weather data. Please try again.');
//       }

//       const data: WeatherApiResponse = await response.json();

//       setCurrent({
//         city: data.name,
//         country: data.sys.country,
//         temperature: Math.round(data.main.temp),
//         feelsLike: Math.round(data.main.feels_like),
//         humidity: data.main.humidity,
//         windSpeed: Math.round(data.wind.speed * 3.6),
//         condition: data.weather[0],
//         visibility: data.visibility,
//         pressure: data.main.pressure,
//         sunrise: data.sys.sunrise,
//         sunset: data.sys.sunset,
//         timezone: data.timezone,
//         dt: data.dt,
//       });
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unexpected error occurred');
//       setCurrent(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchForecast = useCallback(async (city: string): Promise<void> => {
//     try {
//       // Simulate API delay
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       if (API_KEY === 'demo') {
//         setForecast(DEMO_FORECAST);
//         return;
//       }

//       const response = await fetch(
//         `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch forecast data');
//       }

//       const data: ForecastApiResponse = await response.json();

//       // Group by day and get daily summary
//       const dailyData: Map<string, ForecastDay> = new Map();

//       data.list.forEach((item) => {
//         const date = item.dt_txt.split(' ')[0];
//         const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

//         if (!dailyData.has(date)) {
//           dailyData.set(date, {
//             date,
//             dayName,
//             temperature: { min: item.main.temp_min, max: item.main.temp_max },
//             condition: item.weather[0],
//             humidity: item.main.humidity,
//             windSpeed: Math.round(item.wind.speed * 3.6),
//             pop: Math.round(item.pop * 100),
//           });
//         } else {
//           const existing = dailyData.get(date)!;
//           existing.temperature.min = Math.min(existing.temperature.min, item.main.temp_min);
//           existing.temperature.max = Math.max(existing.temperature.max, item.main.temp_max);
//         }
//       });

//       setForecast(Array.from(dailyData.values()).slice(0, 5));
//     } catch (err) {
//       console.error('Forecast fetch error:', err);
//     }
//   }, []);

//   const fetchCities = useCallback(async (): Promise<void> => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1200));
//       setCities(DEMO_CITIES);
//     } catch (err) {
//       console.error('Cities fetch error:', err);
//     }
//   }, []);

//   const fetchWeatherByCoords = useCallback(async (lat: number, lon: number): Promise<void> => {
//     setLoading(true);
//     setError(null);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       if (API_KEY === 'demo') {
//         setCurrent(DEMO_CURRENT_WEATHER);
//         setForecast(DEMO_FORECAST);
//         return;
//       }

//       const response = await fetch(
//         `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch weather for your location');
//       }

//       const data: WeatherApiResponse = await response.json();

//       setCurrent({
//         city: data.name,
//         country: data.sys.country,
//         temperature: Math.round(data.main.temp),
//         feelsLike: Math.round(data.main.feels_like),
//         humidity: data.main.humidity,
//         windSpeed: Math.round(data.wind.speed * 3.6),
//         condition: data.weather[0],
//         visibility: data.visibility,
//         pressure: data.main.pressure,
//         sunrise: data.sys.sunrise,
//         sunset: data.sys.sunset,
//         timezone: data.timezone,
//         dt: data.dt,
//       });

//       // Also fetch forecast
//       const forecastResponse = await fetch(
//         `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
//       );

//       if (forecastResponse.ok) {
//         const forecastData: ForecastApiResponse = await forecastResponse.json();
//         const dailyData: Map<string, ForecastDay> = new Map();

//         forecastData.list.forEach((item) => {
//           const date = item.dt_txt.split(' ')[0];
//           const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

//           if (!dailyData.has(date)) {
//             dailyData.set(date, {
//               date,
//               dayName,
//               temperature: { min: item.main.temp_min, max: item.main.temp_max },
//               condition: item.weather[0],
//               humidity: item.main.humidity,
//               windSpeed: Math.round(item.wind.speed * 3.6),
//               pop: Math.round(item.pop * 100),
//             });
//           } else {
//             const existing = dailyData.get(date)!;
//             existing.temperature.min = Math.min(existing.temperature.min, item.main.temp_min);
//             existing.temperature.max = Math.max(existing.temperature.max, item.main.temp_max);
//           }
//         });

//         setForecast(Array.from(dailyData.values()).slice(0, 5));
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to get weather for your location');
//       setCurrent(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return {
//     current,
//     forecast,
//     cities,
//     loading,
//     error,
//     fetchCurrentWeather,
//     fetchForecast,
//     fetchCities,
//     fetchWeatherByCoords,
//     convertTemperature,
//   };
// };

import { useState, useCallback } from "react";
import {
  CurrentWeather,
  ForecastDay,
  CityWeather,
  WeatherApiResponse,
  ForecastApiResponse,
  TemperatureUnit,
} from "@/types/weather";

/* ===========================
   ENV + CONSTANTS (VITE)
=========================== */

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;
const DEFAULT_COUNTRY = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || "IN";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


/* ===========================
   STATIC CITY LIST
=========================== */

const INDIAN_CITIES = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Lucknow",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
  "Kanpur",
  "Patna",
  "Ranchi",
  "Jamshedpur",
  "Dhanbad",
  "Bokaro",
  "Gaya",
  "Muzaffarpur",
];

/* ===========================
   HOOK
=========================== */

export const useWeather = () => {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ===========================
     UTILS
  =========================== */

  const ensureApiKey = () => {
    if (!API_KEY) {
      setError("Missing OpenWeather API key");
      return false;
    }
    return true;
  };

  const convertTemperature = (
    temp: number,
    unit: TemperatureUnit
  ): number => {
    return unit === "fahrenheit"
      ? Math.round((temp * 9) / 5 + 32)
      : Math.round(temp);
  };

  /* ===========================
     CURRENT WEATHER
  =========================== */

  const fetchCurrentWeather = useCallback(async (city: string) => {
    if (!ensureApiKey()) return;

    setLoading(true);
    setError(null);

    try {
      const query = `${city},${DEFAULT_COUNTRY}`;

      const res = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(
          query
        )}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        if (res.status === 404) throw new Error("City not found");
        throw new Error("Failed to fetch weather");
      }

      const data: WeatherApiResponse = await res.json();

      setCurrent({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        condition: data.weather[0],
        visibility: data.visibility,
        pressure: data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
        dt: data.dt,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setCurrent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ===========================
     5 DAY FORECAST
  =========================== */

  const fetchForecast = useCallback(async (city: string) => {
    if (!ensureApiKey()) return;

    try {
      const query = `${city},${DEFAULT_COUNTRY}`;

      const res = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(
          query
        )}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) throw new Error("Forecast fetch failed");

      const data: ForecastApiResponse = await res.json();
      const dailyMap = new Map<string, ForecastDay>();

      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        const dayName = new Date(date).toLocaleDateString("en-IN", {
          weekday: "short",
        });

        if (!dailyMap.has(date)) {
          dailyMap.set(date, {
            date,
            dayName,
            temperature: {
              min: item.main.temp_min,
              max: item.main.temp_max,
            },
            condition: item.weather[0],
            humidity: item.main.humidity,
            windSpeed: Math.round(item.wind.speed * 3.6),
            pop: Math.round(item.pop * 100),
          });
        } else {
          const existing = dailyMap.get(date)!;
          existing.temperature.min = Math.min(
            existing.temperature.min,
            item.main.temp_min
          );
          existing.temperature.max = Math.max(
            existing.temperature.max,
            item.main.temp_max
          );
        }
      });

      setForecast(Array.from(dailyMap.values()).slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  }, []);

  /* ===========================
     CITY TABLE DATA
  =========================== */

  const fetchCities = useCallback(async () => {
    if (!ensureApiKey()) return;

    try {
      const results = await Promise.all(
        INDIAN_CITIES.map(async (city, index) => {
          const res = await fetch(
            `${BASE_URL}/weather?q=${city},IN&units=metric&appid=${API_KEY}`
          );
          const data: WeatherApiResponse = await res.json();

          return {
            id: index + 1,
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            condition: data.weather[0],
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6),
          };
        })
      );

      setCities(results);
    } catch (err) {
      console.error("City list error", err);
    }
  }, []);

  /* ===========================
     GEOLOCATION WEATHER
  =========================== */

  const fetchWeatherByCoords = useCallback(
    async (lat: number, lon: number) => {
      if (!ensureApiKey()) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!res.ok)
          throw new Error("Failed to fetch location weather");

        const data: WeatherApiResponse = await res.json();

        setCurrent({
          city: data.name,
          country: data.sys.country,
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6),
          condition: data.weather[0],
          visibility: data.visibility,
          pressure: data.main.pressure,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone,
          dt: data.dt,
        });

        fetchForecast(data.name);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Location error");
      } finally {
        setLoading(false);
      }
    },
    [fetchForecast]
  );

  /* ===========================
     RETURN
  =========================== */

  return {
    current,
    forecast,
    cities,
    loading,
    error,
    fetchCurrentWeather,
    fetchForecast,
    fetchCities,
    fetchWeatherByCoords,
    convertTemperature,
  };
};
