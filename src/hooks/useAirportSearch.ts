/**
 * Custom hook for searching airports with debounced input.
 * Fetches airport data based on search term and transforms response into Airport objects.
 */

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { flightsApi } from "../api/flights";
import { Airport, AirportData } from "../types/airport";

export const useAirportSearch = (searchTerm: string) => {
  const debouncedSearch = useDebounce(searchTerm, 2000);

  const {
    data: airports,
    isLoading,
    error,
  } = useQuery<Airport[]>({
    queryKey: ["airports", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.length < 2) return [];

      const response = (await flightsApi.searchAirports(debouncedSearch)) as AirportData[];
      return response.map((airport) => ({
        id: airport.navigation.entityId,
        name: airport.presentation.title,
        cityName: airport.presentation.suggestionTitle,
        countryName: airport.presentation.subtitle,
        iataCode: airport.navigation.relevantFlightParams.skyId,
      }));
    },
    enabled: debouncedSearch.length >= 2,
    staleTime: 10 * 60 * 1000,
  });

  return {
    airports: airports || [],
    isLoading,
    error,
  };
};

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
