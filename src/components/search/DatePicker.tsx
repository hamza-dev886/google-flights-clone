/**
 * DatePicker component that provides a calendar-based date selection interface.
 */

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface DatePickerProps {
  selected?: Date;
  minDate?: Date;
  onChange: (date?: Date) => void;
  label?: String;
}

export function DatePicker({ selected, onChange, minDate, label }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !selected && "text-muted-foreground")}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>{label ? label : "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selected} onSelect={onChange} fromDate={minDate} initialFocus disabled={(date) => date < new Date()} />
      </PopoverContent>
    </Popover>
  );
}
