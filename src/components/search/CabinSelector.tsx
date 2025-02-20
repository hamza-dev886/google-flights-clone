/**
 * A dropdown component for selecting cabin class (Economy, Premium Economy, Business, First)
 * in the flight search interface.
 */

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export type CabinType = "economy" | "premium_economy" | "business" | "first";

interface CabinSelectorProps {
  value: CabinType;
  onChange: (value: CabinType) => void;
}

const cabinOptions = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business",
  first: "First",
};

export function CabinSelector({ value, onChange }: CabinSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {cabinOptions[value]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {Object.entries(cabinOptions).map(([key, label]) => (
          <DropdownMenuItem key={key} onClick={() => onChange(key as CabinType)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
