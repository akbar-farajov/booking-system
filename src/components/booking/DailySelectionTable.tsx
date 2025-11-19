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

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Daily Selections</CardTitle>
        <CardDescription>
          Choose your hotel and meals for each day of your trip
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
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
              {booking.dailySelections.map((day, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">Day {day.day}</TableCell>
                  <TableCell>{format(day.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <Select
                      value={day.hotelId?.toString() || ""}
                      onValueChange={(value) => handleHotelChange(index, value)}
                    >
                      <SelectTrigger>
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
                      <SelectTrigger className={noMeals ? "opacity-50" : ""}>
                        <SelectValue
                          placeholder={
                            noMeals ? "Not available" : "Select lunch"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="none">No lunch</SelectItem>
                        {availableMeals?.lunch.map((meal) => (
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
                      onValueChange={(value) => {
                        handleDinnerChange(index, value);
                        if (canSelectOneMeal && value !== "none") {
                          updateDaySelection(index, { lunchId: null });
                        }
                      }}
                      disabled={noMeals}
                    >
                      <SelectTrigger className={noMeals ? "opacity-50" : ""}>
                        <SelectValue
                          placeholder={
                            noMeals ? "Not available" : "Select dinner"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="none">No dinner</SelectItem>
                        {availableMeals?.dinner.map((meal) => (
                          <SelectItem key={meal.id} value={meal.id.toString()}>
                            {meal.name} (${meal.price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {canSelectOneMeal && (
          <div className="text-sm text-muted-foreground bg-accent p-4 rounded-lg">
            <strong>Half Board Note:</strong> You can select either lunch OR
            dinner for each day, not both.
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
            disabled={isProcessing}
          >
            Back to Configuration
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!isFormValid || isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Spinner className="mr-2" />
                Processing...
              </>
            ) : (
              "Continue to Summary"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
