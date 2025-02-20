/**
 * Dropdown selector for flight cabin classes (Economy, Premium Economy, Business, First)
 */

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

interface CabinClassSelectorProps {
  value: CabinClass;
  onChange: (value: CabinClass) => void;
}

const cabinClasses = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business",
  first: "First",
};

export function CabinClassSelector({ value, onChange }: CabinClassSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {cabinClasses[value]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {Object.entries(cabinClasses).map(([key, label]) => (
          <DropdownMenuItem key={key} onClick={() => onChange(key as CabinClass)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
