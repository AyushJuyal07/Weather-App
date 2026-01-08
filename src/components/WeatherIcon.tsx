import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog, 
  Wind,
  Moon,
  CloudSun,
  CloudMoon
} from 'lucide-react';
import { WeatherCondition } from '@/types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}

export const WeatherIcon = ({ condition, size = 48, className = '' }: WeatherIconProps) => {
  const isNight = condition.icon.includes('n');
  
  const getIcon = () => {
    const mainCondition = condition.main.toLowerCase();
    
    switch (mainCondition) {
      case 'clear':
        return isNight ? (
          <Moon size={size} className={`text-yellow-300 ${className}`} />
        ) : (
          <Sun size={size} className={`text-accent ${className}`} />
        );
      case 'clouds':
        if (condition.description.includes('few') || condition.description.includes('scattered')) {
          return isNight ? (
            <CloudMoon size={size} className={`text-muted-foreground ${className}`} />
          ) : (
            <CloudSun size={size} className={`text-muted-foreground ${className}`} />
          );
        }
        return <Cloud size={size} className={`text-weather-cloudy ${className}`} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain size={size} className={`text-weather-rainy ${className}`} />;
      case 'thunderstorm':
        return <CloudLightning size={size} className={`text-weather-stormy ${className}`} />;
      case 'snow':
        return <CloudSnow size={size} className={`text-weather-snowy ${className}`} />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudFog size={size} className={`text-muted-foreground ${className}`} />;
      case 'wind':
        return <Wind size={size} className={`text-muted-foreground ${className}`} />;
      default:
        return <Cloud size={size} className={`text-muted-foreground ${className}`} />;
    }
  };

  return (
    <div className="animate-float">
      {getIcon()}
    </div>
  );
};
