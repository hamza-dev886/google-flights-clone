/**
 * FlightCard component displays detailed flight information in a collapsible card format.
 * It shows flight details including airline, departure/arrival times, duration, stops,
 * and pricing. The card can be expanded to show additional details about each leg of
 * the journey including airport information and flight numbers.
 */

import { ChevronDown, Clock, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { FlightItinerary } from "../../types/flight";
import { Card } from "../ui/card";

interface FlightCardProps {
  flight: FlightItinerary;
}

export function FlightCard({ flight }: FlightCardProps) {
  const firstLeg = flight.legs[0];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-2 sm:p-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        {/* Left section - Airline and times */}
        <div className="flex items-center gap-3 w-full sm:w-[250px]">
          <img src={firstLeg.carriers.marketing[0].logoUrl} alt={firstLeg.carriers.marketing[0].name} className="h-6 w-6 sm:h-7 sm:w-7 object-contain" />
          <div className="flex flex-col flex-1 sm:flex-none">
            <div className="flex items-baseline gap-1">
              <time className="text-sm font-medium">{new Date(firstLeg.departure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
              <span className="text-xs text-muted-foreground">-</span>
              <time className="text-sm font-medium">{new Date(firstLeg.arrival).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
            </div>
            <span className="text-xs text-muted-foreground">{firstLeg.carriers.marketing[0].name}</span>
          </div>

          {/* Price section - Moved here for mobile */}
          <div className="flex sm:hidden items-center gap-2 ml-auto">
            <span className="text-base font-semibold">{flight.price.formatted}</span>
            <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "transform rotate-180")} />
          </div>
        </div>

        {/* Middle section - Duration and stops */}
        <div className="flex flex-col w-full sm:w-auto sm:flex-1 min-w-0 sm:min-w-[180px]">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span>{`${Math.floor(firstLeg.durationInMinutes / 60)}h ${firstLeg.durationInMinutes % 60}m`}</span>
            <span>·</span>
            <span>{firstLeg.stopCount === 0 ? "Nonstop" : `${firstLeg.stopCount} stop${firstLeg.stopCount > 1 ? "s" : ""}`}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium">
              {firstLeg.origin.displayCode}-{firstLeg.destination.displayCode}
            </span>
          </div>
        </div>

        {/* Right section - Price (desktop only) */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex flex-col items-end min-w-[90px]">
            <span className="text-base font-semibold">{flight.price.formatted}</span>
            <span className="text-[11px] text-muted-foreground">round trip</span>
          </div>
          <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "transform rotate-180")} />
        </div>
      </div>

      {/* Expandable Details Section */}
      <div className={cn("grid transition-all duration-200", isExpanded ? "grid-rows-[1fr] mt-3 sm:mt-4" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="pt-3 sm:pt-4 border-t">
            {flight.legs.map((leg, legIndex) => (
              <div key={leg.id} className="py-3 sm:py-4 first:pt-0 border-b last:border-b-0">
                <div className="flex flex-col gap-3">
                  {/* Flight direction label */}
                  <div className="text-xs font-medium text-muted-foreground">
                    {legIndex === 0 ? "Outbound" : "Return"} flight
                  </div>

                  {/* Airline info */}
                  <div className="flex items-center gap-2">
                    <img src={leg.carriers.marketing[0].logoUrl} alt={leg.carriers.marketing[0].name} className="h-5 w-5 object-contain" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{leg.carriers.marketing[0].name}</span>
                      <span className="text-xs text-muted-foreground">
                        Flight {leg.segments[0].flightNumber}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
                    {/* Origin */}
                    <div className="flex flex-col gap-1">
                      <time className="text-base font-semibold">
                        {new Date(leg.departure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </time>
                      <span className="text-sm font-medium">{leg.origin.city}</span>
                      <span className="text-xs text-muted-foreground">{leg.origin.name}</span>
                    </div>

                    {/* Duration & Flight path */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs font-medium text-muted-foreground">
                        {`${Math.floor(leg.durationInMinutes / 60)}h ${leg.durationInMinutes % 60}m`}
                      </div>
                      <div className="w-full flex items-center gap-2">
                        <div className="h-[2px] flex-1 bg-border"></div>
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="h-[2px] flex-1 bg-border"></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {leg.stopCount === 0 ? "Nonstop" : (
                          <span className="text-primary font-medium">
                            {`${leg.stopCount} stop${leg.stopCount > 1 ? 's' : ''}`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="flex flex-col items-end gap-1">
                      <time className="text-base font-semibold">
                        {new Date(leg.arrival).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </time>
                      <span className="text-sm font-medium">{leg.destination.city}</span>
                      <span className="text-xs text-muted-foreground">{leg.destination.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom info section */}
      <div className="mt-2 pt-2 border-t flex items-center gap-1.5 text-[10px] sm:text-[11px] text-muted-foreground">
        <Info className="w-3 h-3" />
        <span>Flight operated by {firstLeg.carriers.marketing[0].name}</span>
      </div>
    </Card>
  );
}
