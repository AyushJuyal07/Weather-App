import { CloudSun } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { UnitToggle } from './UnitToggle';
import { TemperatureUnit } from '@/types/weather';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  unit: TemperatureUnit;
  onUnitToggle: () => void;
}

export const Header = ({ theme, onThemeToggle, unit, onUnitToggle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <CloudSun className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">WeatherApp</h1>
            <p className="text-xs text-muted-foreground">Real-time forecasts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UnitToggle unit={unit} onToggle={onUnitToggle} />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </header>
  );
};
