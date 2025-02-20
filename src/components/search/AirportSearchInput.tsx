/**
 * AirportSearchInput component provides an autocomplete input field for airport search.
 * It displays a loading indicator while searching and shows a dropdown list of matching airports.
 * Each airport result shows the city name, IATA code, and full airport name.
 */
import { useState } from "react";
import { useAirportSearch } from "../../hooks/useAirportSearch";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import type { Airport } from "../../types/airport";

interface AirportSearchInputProps {
  value: string;
  onChange: (value: string, airport?: Airport) => void;
  placeholder: string;
}

export function AirportSearchInput({ value, onChange, placeholder }: AirportSearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { airports, isLoading } = useAirportSearch(value);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      
      {isLoading && (
        <div className="absolute right-3 top-3">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}

      {isFocused && value && airports.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <ul className="max-h-60 overflow-auto py-1">
            {airports.map((airport) => (
              <li
                key={airport.iataCode}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => onChange(`${airport.cityName} (${airport.iataCode})`, airport)}
              >
                <div className="text-sm">{airport.cityName} ({airport.iataCode})</div>
                <div className="text-xs text-gray-500">{airport.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
