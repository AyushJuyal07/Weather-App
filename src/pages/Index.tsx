"use client";

import { useEffect, useState, useCallback } from 'react';
import { TemperatureUnit } from '@/types/weather';
import { useWeather } from '@/hooks/useWeather';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CurrentWeatherCard } from '@/components/CurrentWeatherCard';
import { ForecastCard } from '@/components/ForecastCard';
import { CitiesTable } from '@/components/CitiesTable';
import { ErrorState } from '@/components/ErrorState';
import {
  CurrentWeatherSkeleton,
  ForecastSkeleton,
  TableSkeleton,
} from '@/components/SkeletonLoader';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [citiesLoading, setCitiesLoading] = useState(true);
  const { toast } = useToast();

  const {
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
  } = useWeather();

  const { loading: geoLoading, getCurrentPosition } = useGeolocation();

  // Initial load
  useEffect(() => {
    const loadInitialData = async () => {
      setCitiesLoading(true);
      await Promise.all([
        fetchCurrentWeather('Dehradun'),
        fetchForecast('Dehradun'),
        fetchCities(),
      ]);
      setCitiesLoading(false);
    };
    loadInitialData();
  }, [fetchCurrentWeather, fetchForecast, fetchCities]);

  const handleSearch = useCallback(
    async (city: string) => {
      await Promise.all([fetchCurrentWeather(city), fetchForecast(city)]);
    },
    [fetchCurrentWeather, fetchForecast]
  );

  const handleLocate = useCallback(async () => {
    try {
      const position = await getCurrentPosition();
      await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      toast({
        title: 'Location detected',
        description: 'Showing weather for your current location.',
      });
    } catch (err) {
      toast({
        title: 'Location error',
        description: err instanceof Error ? err.message : 'Failed to get location',
        variant: 'destructive',
      });
    }
  }, [getCurrentPosition, fetchWeatherByCoords, toast]);

  const handleCityClick = useCallback(
    (city: string) => {
      handleSearch(city);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [handleSearch]
  );

  const handleUnitToggle = useCallback(() => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }, []);

  const handleRetry = useCallback(() => {
    if (current?.city) {
      handleSearch(current.city);
    } else {
      handleSearch('Dehradun');
    }
  }, [current?.city, handleSearch]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        unit={unit}
        onUnitToggle={handleUnitToggle}
      />

      {/* Hero gradient background */}
      <div className="absolute top-0 left-0 right-0 h-96 weather-gradient opacity-20 pointer-events-none" />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Search section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Check the <span className="text-gradient">Weather</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Get accurate weather forecasts for any city around the world
            </p>
          </div>
          <SearchBar
            onSearch={handleSearch}
            onLocate={handleLocate}
            loading={loading}
            locationLoading={geoLoading}
          />
        </section>

        {/* Error state */}
        {error && (
          <section className="mb-8">
            <ErrorState message={error} onRetry={handleRetry} />
          </section>
        )}

        {/* Current weather */}
        <section className="mb-8">
          {loading && !current ? (
            <CurrentWeatherSkeleton />
          ) : current && !error ? (
            <CurrentWeatherCard
              weather={current}
              unit={unit}
              convertTemperature={convertTemperature}
            />
          ) : null}
        </section>

        {/* 5-day forecast */}
        <section className="mb-8">
          {loading && forecast.length === 0 ? (
            <ForecastSkeleton />
          ) : forecast.length > 0 && !error ? (
            <ForecastCard
              forecast={forecast}
              unit={unit}
              convertTemperature={convertTemperature}
            />
          ) : null}
        </section>

        {/* Cities table */}
        <section className="mb-8">
          {citiesLoading ? (
            <TableSkeleton />
          ) : cities.length > 0 ? (
            <CitiesTable
              cities={cities}
              unit={unit}
              convertTemperature={convertTemperature}
              onCityClick={handleCityClick}
            />
          ) : null}
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-muted-foreground">
          <p>
            Weather data powered by{' '}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              OpenWeatherMap
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
