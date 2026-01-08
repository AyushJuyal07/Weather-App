import { TemperatureUnit } from '@/types/weather';
import { Button } from '@/components/ui/button';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <div className="glass-card p-1 flex rounded-full">
      <Button
        variant={unit === 'celsius' ? 'default' : 'ghost'}
        size="sm"
        onClick={onToggle}
        className="rounded-full h-8 px-3 text-sm font-semibold"
        disabled={unit === 'celsius'}
      >
        °C
      </Button>
      <Button
        variant={unit === 'fahrenheit' ? 'default' : 'ghost'}
        size="sm"
        onClick={onToggle}
        className="rounded-full h-8 px-3 text-sm font-semibold"
        disabled={unit === 'fahrenheit'}
      >
        °F
      </Button>
    </div>
  );
};
