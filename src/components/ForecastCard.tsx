import { ForecastDay, TemperatureUnit } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Droplets } from 'lucide-react';

interface ForecastCardProps {
  forecast: ForecastDay[];
  unit: TemperatureUnit;
  convertTemperature: (temp: number, unit: TemperatureUnit) => number;
}

export const ForecastCard = ({ forecast, unit, convertTemperature }: ForecastCardProps) => {
  const unitSymbol = unit === 'celsius' ? '°' : '°';

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-xl font-bold mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="flex flex-col items-center p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <p className="font-semibold text-lg">{day.dayName}</p>
            <p className="text-sm text-muted-foreground mb-3">
              {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <WeatherIcon condition={day.condition} size={40} />
            <div className="mt-3 text-center">
              <p className="font-bold text-lg">
                {convertTemperature(day.temperature.max, unit)}{unitSymbol}
              </p>
              <p className="text-sm text-muted-foreground">
                {convertTemperature(day.temperature.min, unit)}{unitSymbol}
              </p>
            </div>
            {day.pop > 0 && (
              <div className="flex items-center gap-1 mt-2 text-primary text-sm">
                <Droplets className="h-3 w-3" />
                <span>{day.pop}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
