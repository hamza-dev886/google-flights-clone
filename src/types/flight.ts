export interface Carrier {
  id: string;
  name: string;
  logoUrl: string;
}

export interface FlightSegment {
  id: string;
  departure: string;
  arrival: string;
  flightNumber: string;
  carrier: Carrier;
}

export interface Flight {
  id: string;
  price: {
    amount: number;
    currency: string;
    displayAmount: string;
  };
  segments: FlightSegment[];
  totalDuration: {
    hours: number;
    minutes: number;
  };
  stopCount: number;
  carriers: Carrier[];
}

export interface FlightSearchParams{
  originSkyId: string;
  destinationSkyId: string;
  date?: string;
  adults?: number;
  childrens?: number;
  infants?: number;
  originEntityId: number;
  destinationEntityId: number;
  cabinClass?: string;
  returnDate?: string;
  limit?: number;
}

export interface Airport {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface FlightContext {
  status: string;
  totalResults: number;
}

export interface FlightFilterStats {
  duration: {
    min: number;
    max: number;
    multiCityMin: number;
    multiCityMax: number;
  };
  airports: {
    city: string;
    airports: {
      id: string;
      entityId: string;
      name: string;
    }[];
  }[];
  carriers: Carrier[];
  stopPrices: {
    direct: { isPresent: boolean };
    one: { isPresent: boolean; formattedPrice?: string };
    twoOrMore: { isPresent: boolean; formattedPrice?: string };
  };
}

export interface FlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
    pricingOptionId: string;
  };
  legs: FlightLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  fareAttributes: Record<string, unknown>;
  tags?: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface FlightLeg {
  id: string;
  origin: Airport;
  destination: Airport;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: {
    marketing: Carrier[];
    operationType: string;
  };
  segments: FlightSegment[];
}

export interface FlightApiResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: FlightContext;
    itineraries: FlightItinerary[];
    messages: string[];
    filterStats: FlightFilterStats;
    flightsSessionId: string;
    destinationImageUrl: string;
  };
}