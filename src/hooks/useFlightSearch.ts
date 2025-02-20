/**
 * Custom hook for handling flight search functionality.
 * Manages flight search state, data fetching, and error handling using React Query.
 * Returns flight data, loading state, error state, and refetch functionality.
 */

import { useQuery } from "@tanstack/react-query";
import { flightsApi } from "../api/flights";
import { FlightApiResponse, FlightContext, FlightFilterStats, FlightItinerary, FlightSearchParams } from "../types/flight";

interface FlightSearchResult {
  flights: FlightItinerary[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  filterStats: FlightApiResponse["data"]["filterStats"] | null;
}

export const useFlightSearch = (params: FlightSearchParams | null): FlightSearchResult => {
  const {
    data: response,
    isLoading,
    error,
    refetch: queryRefetch,
  } = useQuery<FlightApiResponse["data"], Error>({
    queryKey: ["flights", params],
    queryFn: async () => {
      if (!params) {
        return {
          itineraries: [] as FlightItinerary[],
          filterStats: {} as FlightFilterStats,
          context: {
            status: "",
            totalResults: 0,
          } as FlightContext,
          messages: [] as string[],
          flightsSessionId: "",
          destinationImageUrl: "",
        };
      }
      return await flightsApi.searchFlights(params);
    },
    enabled: !!params,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  const flights = response?.itineraries.length ? response?.itineraries : [];

  return {
    flights,
    isLoading,
    error,
    refetch: async () => {
      await queryRefetch();
    },
    filterStats: response?.filterStats || null,
  };
};
