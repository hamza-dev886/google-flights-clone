/**
 * SearchForm component for flight search functionality.
 * Handles one-way and round-trip flight searches with options for
 * origin, destination, dates, passengers, and cabin class selection.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { DatePicker } from "./DatePicker";
import { PassengerSelector } from "./PassengerSelector";
import { AirportSearchInput } from "./AirportSearchInput";
import { CabinClassSelector, type CabinClass } from "./CabinClassSelector";
import type { Airport } from "../../types/airport";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface SearchFormProps {
  initialValues?: {
    origin?: string;
    destination?: string;
    passengers?: {
      adults: number;
      children: number;
      infants: number;
    };
    date?: string;
    originEntityId?: string;
    destinationEntityId?: string;
    cabinClass?: CabinClass;
    tripType?: "oneWay" | "roundTrip";
    returnDate?: string;
  };
  onBack?: () => void;
  showBackButton?: boolean;
}

export function SearchForm({ initialValues, onBack, showBackButton }: SearchFormProps) {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState(initialValues?.origin || "");
  const [destination, setDestination] = useState(initialValues?.destination || "");
  const [selectedOrigin, setSelectedOrigin] = useState<Airport>();
  const [selectedDestination, setSelectedDestination] = useState<Airport>();
  const [passengers, setPassengers] = useState(
    initialValues?.passengers || {
      adults: 1,
      children: 0,
      infants: 0,
    }
  );
  const [departureDate, setDepartureDate] = useState<Date | undefined>(initialValues?.date ? new Date(initialValues.date) : undefined);
  const [cabinClass, setCabinClass] = useState<CabinClass>(initialValues?.cabinClass || "economy");
  const [tripType, setTripType] = useState<"oneWay" | "roundTrip">(initialValues?.tripType || "oneWay");
  const [returnDate, setReturnDate] = useState<Date | undefined>(initialValues?.returnDate ? new Date(initialValues.returnDate) : undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams({
      tripType,
      origin: selectedOrigin?.iataCode || "",
      destination: selectedDestination?.iataCode || "",
      date: departureDate ? departureDate.toISOString().split("T")[0] : "",
      adults: passengers.adults.toString(),
      children: passengers.children.toString(),
      infants: passengers.infants.toString(),
      originEntityId: selectedOrigin?.id.toString() || "",
      destinationEntityId: selectedDestination?.id.toString() || "",
      cabinClass: cabinClass,
    });

    if (tripType === "roundTrip" && returnDate) {
      params.append("returnDate", returnDate.toISOString().split("T")[0]);
    }

    console.log("URL params:", params.toString());
    navigate(`/search-results?${params.toString()}`);
  };

  return (
    <div>
      {showBackButton && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back to Search
        </Button>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup defaultValue={tripType} onValueChange={(value) => setTripType(value as "oneWay" | "roundTrip")} className="flex space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oneWay" id="oneWay" />
            <Label htmlFor="oneWay">One-way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="roundTrip" id="roundTrip" />
            <Label htmlFor="roundTrip">Round-trip</Label>
          </div>
        </RadioGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AirportSearchInput
            placeholder="From where?"
            value={origin}
            onChange={(value, airport) => {
              setOrigin(value);
              setSelectedOrigin(airport);
            }}
          />
          <AirportSearchInput
            placeholder="To where?"
            value={destination}
            onChange={(value, airport) => {
              setDestination(value);
              setSelectedDestination(airport);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex space-x-4">
            <DatePicker selected={departureDate} onChange={setDepartureDate} label="Departure" />
            {tripType === "roundTrip" && <DatePicker selected={returnDate} onChange={setReturnDate} label="Return" minDate={departureDate} />}
          </div>
          <PassengerSelector value={passengers} onChange={setPassengers} />
          <CabinClassSelector value={cabinClass} onChange={setCabinClass} />
        </div>

        <Button type="submit" className="w-full">
          Search Flights
        </Button>
      </form>
    </div>
  );
}
