export interface Airport {
  id: string;
  name: string;
  cityName: string;
  countryName: string;
  iataCode: string;
}

export interface AirportSearchResponse {
  status: boolean;
  timestamp: number;
  data: AirportData[];
}

export interface AirportData {
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
}
