/**
 * Flights API module
 * Contains API methods for flight-related operations including flight search and airport search.
 * Handles API responses and error cases with custom ApiError class.
 */

import { AirportSearchResponse } from "../types/airport";
import { FlightApiResponse, FlightSearchParams } from "../types/flight";
import { apiClient } from "./client";

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export const flightsApi = {
  /**
   * Search for flights based on given parameters
   * @param params - Flight search parameters including origin, destination, dates
   * @returns Promise containing flight search results
   * @throws ApiError if the request fails or returns invalid response
   */
  searchFlights: async (params: FlightSearchParams): Promise<FlightApiResponse["data"]> => {
    try {
      const { data } = await apiClient.get<FlightApiResponse>("/v2/flights/searchFlights", {
        params,
      });

      if (!data.status) {
        throw new ApiError("Failed to fetch flights", 400);
      }

      return data.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Network error occurred", 500);
    }
  },

  /**
   * Search for airports based on a query string
   * @param query - Search term for airport lookup (city name, airport code, etc.)
   * @returns Promise containing matching airport results
   * @throws ApiError if the request fails or returns invalid response
   */
  searchAirports: async (query: string): Promise<AirportSearchResponse["data"]> => {
    try {
      const { data } = await apiClient.get<AirportSearchResponse>("/v1/flights/searchAirport", {
        params: {
          query,
          locale: "en-US",
        },
      });

      if (!data.status) {
        throw new ApiError("Failed to fetch airports", 400);
      }

      return data.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Network error occurred", 500);
    }
  },
};
