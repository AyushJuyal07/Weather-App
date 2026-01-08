import { useState, FormEvent } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocate: () => void;
  loading: boolean;
  locationLoading: boolean;
}

export const SearchBar = ({ onSearch, onLocate, loading, locationLoading }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-14 text-lg glass-card border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
          disabled={loading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={loading || !query.trim()}
        className="h-14 px-6 text-base font-medium"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Search className="h-5 w-5 mr-2" />
            Search
          </>
        )}
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={onLocate}
        disabled={locationLoading || loading}
        className="h-14 px-4"
        title="Use my location"
      >
        {locationLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <MapPin className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
};
