/**
 * FlightList component displays a list of flight itineraries.
 * If no flights are found, it shows a "No flights found" message.
 * Otherwise, it renders a list of FlightCard components for each flight itinerary.
 */
import { FlightItinerary } from "../../types/flight";
import { FlightCard } from "./FlightCard";

interface FlightListProps {
  flights: FlightItinerary[];
}

export function FlightList({ flights }: FlightListProps) {
  if (flights.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No flights found for this route</div>;
  }

  return (
    <div className="space-y-4 mt-5">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
