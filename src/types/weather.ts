export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
  visibility: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  dt: number;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  pop: number; // Probability of precipitation
}

export interface CityWeather {
  id: number;
  city: string;
  country: string;
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
}

export interface WeatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  visibility: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  timezone: number;
  dt: number;
}

export interface ForecastApiResponse {
  list: Array<{
    dt: number;
    main: {
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: WeatherCondition[];
    wind: {
      speed: number;
    };
    pop: number;
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherState {
  current: CurrentWeather | null;
  forecast: ForecastDay[];
  cities: CityWeather[];
  loading: boolean;
  error: string | null;
}
