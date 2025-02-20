/**
 * PassengerSelector component provides a dropdown interface for selecting the number of passengers
 * by category (adults, children, infants) with validation rules for each type.
 */

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MinusCircle, PlusCircle, Users } from "lucide-react";

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerSelectorProps {
  value: PassengerCounts;
  onChange: (value: PassengerCounts) => void;
}

export function PassengerSelector({ value, onChange }: PassengerSelectorProps) {
  const totalPassengers = value.adults + value.children + value.infants;

  const updateCount = (type: keyof PassengerCounts, increment: boolean) => {
    const newValue = { ...value };
    if (increment) {
      if (type === "adults" && newValue.adults < 9) newValue.adults += 1;
      if (type === "children" && newValue.children + newValue.adults < 9) newValue.children += 1;
      if (type === "infants" && newValue.infants < newValue.adults) newValue.infants += 1;
    } else {
      if (type === "adults" && newValue.adults > 1) {
        newValue.adults -= 1;
        newValue.infants = Math.min(newValue.infants, newValue.adults);
      }
      if (type === "children" && newValue.children > 0) newValue.children -= 1;
      if (type === "infants" && newValue.infants > 0) newValue.infants -= 1;
    }
    onChange(newValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          {totalPassengers} {totalPassengers === 1 ? "Passenger" : "Passengers"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4 p-4">
          <PassengerTypeSelector label="Adults" value={value.adults} onIncrement={() => updateCount("adults", true)} onDecrement={() => updateCount("adults", false)} disabled={{ minus: value.adults <= 1, plus: value.adults >= 9 }} />
          <PassengerTypeSelector
            label="Children"
            helperText="2-11 years old"
            value={value.children}
            onIncrement={() => updateCount("children", true)}
            onDecrement={() => updateCount("children", false)}
            disabled={{ minus: value.children <= 0, plus: value.adults + value.children >= 9 }}
          />
          <PassengerTypeSelector
            label="Infants"
            helperText="Under 2 years"
            value={value.infants}
            onIncrement={() => updateCount("infants", true)}
            onDecrement={() => updateCount("infants", false)}
            disabled={{ minus: value.infants <= 0, plus: value.infants >= value.adults }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface PassengerTypeSelectorProps {
  label: string;
  helperText?: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled: { minus: boolean; plus: boolean };
}

function PassengerTypeSelector({ label, helperText, value, onIncrement, onDecrement, disabled }: PassengerTypeSelectorProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {helperText && <div className="text-xs text-gray-500">{helperText}</div>}
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={onDecrement} disabled={disabled.minus}>
          <MinusCircle className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{value}</span>
        <Button variant="outline" size="icon" onClick={onIncrement} disabled={disabled.plus}>
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
