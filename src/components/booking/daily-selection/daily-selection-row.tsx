import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import type { DaySelection, Hotel, Meal } from "@/types/booking";

interface DailySelectionRowProps {
  day: DaySelection;
  index: number;
  availableHotels: Hotel[];
  availableLunches?: Meal[];
  availableDinners?: Meal[];
  noMeals: boolean;
  canSelectOneMeal?: boolean;
  onHotelChange: (index: number, hotelId: string) => void;
  onLunchChange: (index: number, lunchId: string) => void;
  onDinnerChange: (index: number, dinnerId: string) => void;
}

export const DailySelectionRow: React.FC<DailySelectionRowProps> = ({
  day,
  index,
  availableHotels,
  availableLunches,
  availableDinners,
  noMeals,
  onHotelChange,
  onLunchChange,
  onDinnerChange,
}) => {
  const isComplete = day.hotelId !== null;

  return (
    <TableRow className={cn(isComplete && "bg-accent/30")}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          {isComplete && <CheckCircle2 className="h-4 w-4 text-green-600" />}
          Day {day.day}
        </div>
      </TableCell>
      <TableCell>{format(day.date, "MMM dd, yyyy")}</TableCell>
      <TableCell>
        <Select
          value={day.hotelId?.toString() || ""}
          onValueChange={(value) => onHotelChange(index, value)}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select hotel" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {availableHotels.map((hotel) => (
              <SelectItem key={hotel.id} value={hotel.id.toString()}>
                {hotel.name} (${hotel.price}/night)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select
          value={day.lunchId?.toString() || "none"}
          onValueChange={(value) => onLunchChange(index, value)}
          disabled={noMeals}
        >
          <SelectTrigger className={cn("h-10", noMeals && "opacity-50")}>
            <SelectValue
              placeholder={noMeals ? "Not available" : "Select lunch"}
            />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="none">No lunch</SelectItem>
            {availableLunches?.map((meal) => (
              <SelectItem key={meal.id} value={meal.id.toString()}>
                {meal.name} (${meal.price})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select
          value={day.dinnerId?.toString() || "none"}
          onValueChange={(value) => onDinnerChange(index, value)}
          disabled={noMeals}
        >
          <SelectTrigger className={cn("h-10", noMeals && "opacity-50")}>
            <SelectValue
              placeholder={noMeals ? "Not available" : "Select dinner"}
            />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="none">No dinner</SelectItem>
            {availableDinners?.map((meal) => (
              <SelectItem key={meal.id} value={meal.id.toString()}>
                {meal.name} (${meal.price})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
};
