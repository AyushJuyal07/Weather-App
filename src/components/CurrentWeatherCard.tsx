import { CurrentWeather, TemperatureUnit } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  unit: TemperatureUnit;
  convertTemperature: (temp: number, unit: TemperatureUnit) => number;
}

export const CurrentWeatherCard = ({ weather, unit, convertTemperature }: CurrentWeatherCardProps) => {
  const formatTime = (timestamp: number) => {
    const date = new Date((timestamp + weather.timezone) * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
  };

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  return (
    <div className="glass-card p-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Main weather info */}
        <div className="flex items-center gap-6">
          <WeatherIcon condition={weather.condition} size={80} />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-bold tracking-tight">
                {convertTemperature(weather.temperature, unit)}
              </span>
              <span className="text-3xl font-medium text-muted-foreground">{unitSymbol}</span>
            </div>
            <p className="text-xl text-muted-foreground capitalize mt-1">
              {weather.condition.description}
            </p>
          </div>
        </div>

        {/* Location and feels like */}
        <div className="text-right">
          <h2 className="text-3xl font-bold">
            {weather.city}, {weather.country}
          </h2>
          <p className="text-lg text-muted-foreground mt-1">
            Feels like {convertTemperature(weather.feelsLike, unit)}{unitSymbol}
          </p>
        </div>
      </div>

      {/* Weather details grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 pt-8 border-t border-border/50">
        <WeatherDetail
          icon={<Droplets className="h-5 w-5 text-primary" />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />
        <WeatherDetail
          icon={<Wind className="h-5 w-5 text-primary" />}
          label="Wind Speed"
          value={`${weather.windSpeed} km/h`}
        />
        <WeatherDetail
          icon={<Eye className="h-5 w-5 text-primary" />}
          label="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
        />
        <WeatherDetail
          icon={<Gauge className="h-5 w-5 text-primary" />}
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />
        <WeatherDetail
          icon={<Sunrise className="h-5 w-5 text-accent" />}
          label="Sunrise"
          value={formatTime(weather.sunrise)}
        />
        <WeatherDetail
          icon={<Sunset className="h-5 w-5 text-accent" />}
          label="Sunset"
          value={formatTime(weather.sunset)}
        />
      </div>
    </div>
  );
};

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const WeatherDetail = ({ icon, label, value }: WeatherDetailProps) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
    {icon}
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
