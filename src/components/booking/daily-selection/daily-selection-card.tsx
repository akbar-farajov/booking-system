import { Sun, Calendar, Hotel, Utensils, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { DaySelection, Hotel as HotelType, Meal } from "@/types/booking";

interface DailySelectionCardProps {
  day: DaySelection;
  index: number;
  availableHotels: HotelType[];
  availableLunches?: Meal[];
  availableDinners?: Meal[];
  noMeals: boolean;
  canSelectOneMeal?: boolean;
  onHotelChange: (index: number, hotelId: string) => void;
  onLunchChange: (index: number, lunchId: string) => void;
  onDinnerChange: (index: number, dinnerId: string) => void;
}

export const DailySelectionCard: React.FC<DailySelectionCardProps> = ({
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
    <Card
      className={cn(
        "border-2 transition-all",
        isComplete
          ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20"
          : "border-border"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Day {day.day}</CardTitle>
          </div>
          {isComplete && (
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Complete
            </Badge>
          )}
        </div>
        <CardDescription className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {format(day.date, "EEEE, MMM dd, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-1.5">
            <Hotel className="h-4 w-4 text-primary" />
            Hotel <span className="text-destructive">*</span>
          </label>
          <Select
            value={day.hotelId?.toString() || ""}
            onValueChange={(value) => onHotelChange(index, value)}
          >
            <SelectTrigger className="h-11">
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
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <Utensils className="h-4 w-4 text-primary" />
              Lunch
            </label>
            <Select
              value={day.lunchId?.toString() || "none"}
              onValueChange={(value) => onLunchChange(index, value)}
              disabled={noMeals}
            >
              <SelectTrigger className={cn("h-11", noMeals && "opacity-50")}>
                <SelectValue placeholder={noMeals ? "N/A" : "Select"} />
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <Utensils className="h-4 w-4 text-primary" />
              Dinner
            </label>
            <Select
              value={day.dinnerId?.toString() || "none"}
              onValueChange={(value) => onDinnerChange(index, value)}
              disabled={noMeals}
            >
              <SelectTrigger className={cn("h-11", noMeals && "opacity-50")}>
                <SelectValue placeholder={noMeals ? "N/A" : "Select"} />
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
