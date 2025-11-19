import { format } from "date-fns";
import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { hotels, meals } from "@/data/bookingData";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Hotel,
  Utensils,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface DailySelectionTableProps {
  onComplete: () => void;
  onBack: () => void;
}

export const DailySelectionTable: React.FC<DailySelectionTableProps> = ({
  onComplete,
  onBack,
}) => {
  const booking = useBookingStore((state) => state.booking);
  const updateDaySelection = useBookingStore(
    (state) => state.updateDaySelection
  );
  const [isProcessing, setIsProcessing] = useState(false);

  if (!booking.destination || !booking.boardType) {
    return null;
  }

  const availableHotels = hotels[booking.destination] || [];
  const availableMeals = meals[booking.destination];

  const handleHotelChange = (dayIndex: number, hotelId: string) => {
    updateDaySelection(dayIndex, { hotelId: parseInt(hotelId) });
  };

  const handleLunchChange = (dayIndex: number, lunchId: string) => {
    const id = lunchId === "none" ? null : parseInt(lunchId);
    updateDaySelection(dayIndex, { lunchId: id });
  };

  const handleDinnerChange = (dayIndex: number, dinnerId: string) => {
    const id = dinnerId === "none" ? null : parseInt(dinnerId);
    updateDaySelection(dayIndex, { dinnerId: id });
  };

  const canSelectOneMeal = booking.boardType === "HB";
  const noMeals = booking.boardType === "NB";

  const isFormValid = booking.dailySelections.every(
    (day) => day.hotelId !== null
  );

  const handleContinue = async () => {
    setIsProcessing(true);

    // Simulate API call for calculating prices
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsProcessing(false);
    onComplete();
  };

  const selectedDaysCount = booking.dailySelections.filter(
    (day) => day.hotelId !== null
  ).length;

  return (
    <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-500 border-2 hover:shadow-xl transition-shadow">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary rounded-lg p-2.5">
            <Hotel className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl">Daily Selections</CardTitle>
            <CardDescription className="text-base">
              Choose your hotel and meals for each day of your trip
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {selectedDaysCount}/{booking.dailySelections.length} days
          </Badge>
        </div>
        {canSelectOneMeal && (
          <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-300">
              <strong>Half Board:</strong> You can select either lunch OR dinner
              for each day, not both.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Day</TableHead>
                <TableHead className="w-[140px]">Date</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Lunch</TableHead>
                <TableHead>Dinner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {booking.dailySelections.map((day, index) => {
                const isComplete = day.hotelId !== null;

                return (
                  <TableRow
                    key={index}
                    className={cn(isComplete && "bg-accent/30")}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {isComplete && (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                        Day {day.day}
                      </div>
                    </TableCell>
                    <TableCell>{format(day.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <Select
                        value={day.hotelId?.toString() || ""}
                        onValueChange={(value) =>
                          handleHotelChange(index, value)
                        }
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select hotel" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          {availableHotels.map((hotel) => (
                            <SelectItem
                              key={hotel.id}
                              value={hotel.id.toString()}
                            >
                              {hotel.name} (${hotel.price}/night)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={day.lunchId?.toString() || "none"}
                        onValueChange={(value) => {
                          handleLunchChange(index, value);
                          if (canSelectOneMeal && value !== "none") {
                            updateDaySelection(index, { dinnerId: null });
                          }
                        }}
                        disabled={noMeals}
                      >
                        <SelectTrigger
                          className={cn("h-10", noMeals && "opacity-50")}
                        >
                          <SelectValue
                            placeholder={
                              noMeals ? "Not available" : "Select lunch"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="none">No lunch</SelectItem>
                          {availableMeals?.lunch.map((meal) => (
                            <SelectItem
                              key={meal.id}
                              value={meal.id.toString()}
                            >
                              {meal.name} (${meal.price})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={day.dinnerId?.toString() || "none"}
                        onValueChange={(value) => {
                          handleDinnerChange(index, value);
                          if (canSelectOneMeal && value !== "none") {
                            updateDaySelection(index, { lunchId: null });
                          }
                        }}
                        disabled={noMeals}
                      >
                        <SelectTrigger
                          className={cn("h-10", noMeals && "opacity-50")}
                        >
                          <SelectValue
                            placeholder={
                              noMeals ? "Not available" : "Select dinner"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="none">No dinner</SelectItem>
                          {availableMeals?.dinner.map((meal) => (
                            <SelectItem
                              key={meal.id}
                              value={meal.id.toString()}
                            >
                              {meal.name} (${meal.price})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {booking.dailySelections.map((day, index) => {
            const isComplete = day.hotelId !== null;

            return (
              <Card
                key={index}
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
                      onValueChange={(value) => handleHotelChange(index, value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select hotel" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        {availableHotels.map((hotel) => (
                          <SelectItem
                            key={hotel.id}
                            value={hotel.id.toString()}
                          >
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
                        onValueChange={(value) => {
                          handleLunchChange(index, value);
                          if (canSelectOneMeal && value !== "none") {
                            updateDaySelection(index, { dinnerId: null });
                          }
                        }}
                        disabled={noMeals}
                      >
                        <SelectTrigger
                          className={cn("h-11", noMeals && "opacity-50")}
                        >
                          <SelectValue
                            placeholder={noMeals ? "N/A" : "Select"}
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="none">No lunch</SelectItem>
                          {availableMeals?.lunch.map((meal) => (
                            <SelectItem
                              key={meal.id}
                              value={meal.id.toString()}
                            >
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
                        onValueChange={(value) => {
                          handleDinnerChange(index, value);
                          if (canSelectOneMeal && value !== "none") {
                            updateDaySelection(index, { lunchId: null });
                          }
                        }}
                        disabled={noMeals}
                      >
                        <SelectTrigger
                          className={cn("h-11", noMeals && "opacity-50")}
                        >
                          <SelectValue
                            placeholder={noMeals ? "N/A" : "Select"}
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="none">No dinner</SelectItem>
                          {availableMeals?.dinner.map((meal) => (
                            <SelectItem
                              key={meal.id}
                              value={meal.id.toString()}
                            >
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
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 h-11"
            disabled={isProcessing}
          >
            Back to Configuration
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!isFormValid || isProcessing}
            className="flex-1 h-11 shadow-md hover:shadow-lg transition-all"
          >
            {isProcessing ? (
              <>
                <Spinner className="mr-2" />
                Processing...
              </>
            ) : (
              <>
                Continue to Summary
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
