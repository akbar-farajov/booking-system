import { useCallback } from "react";
import { Hotel, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DailySelectionRow } from "./daily-selection/daily-selection-row";
import { DailySelectionCard } from "./daily-selection/daily-selection-card";
import { SelectionActions } from "./daily-selection/selection-actions";
import { useBookingStore } from "@/store/bookingStore";
import { useBookingCalculations } from "@/hooks/use-booking-calculations";
import { useBookingValidation } from "@/hooks/use-booking-validation";
import { useAsyncSubmit } from "@/hooks/use-async-submit";

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

  const { availableHotels, availableMeals } = useBookingCalculations(booking);
  const { canSelectOneMeal, noMeals, isFormValid, selectedDaysCount } =
    useBookingValidation(booking);
  const { isSubmitting: isProcessing, submit } = useAsyncSubmit({
    onSuccess: onComplete,
    delay: 800,
  });

  const handleHotelChange = useCallback(
    (dayIndex: number, hotelId: string) => {
      updateDaySelection(dayIndex, { hotelId: parseInt(hotelId) });
    },
    [updateDaySelection]
  );

  const handleLunchChange = useCallback(
    (dayIndex: number, lunchId: string) => {
      const id = lunchId === "none" ? null : parseInt(lunchId);
      updateDaySelection(dayIndex, { lunchId: id });

      if (canSelectOneMeal && lunchId !== "none") {
        updateDaySelection(dayIndex, { dinnerId: null });
      }
    },
    [updateDaySelection, canSelectOneMeal]
  );

  const handleDinnerChange = useCallback(
    (dayIndex: number, dinnerId: string) => {
      const id = dinnerId === "none" ? null : parseInt(dinnerId);
      updateDaySelection(dayIndex, { dinnerId: id });

      if (canSelectOneMeal && dinnerId !== "none") {
        updateDaySelection(dayIndex, { lunchId: null });
      }
    },
    [updateDaySelection, canSelectOneMeal]
  );

  const handleContinue = () => {
    submit();
  };

  if (!booking.destination || !booking.boardType) {
    return null;
  }

  return (
    <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-500 border-2 hover:shadow-xl transition-shadow">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary rounded-lg p-2.5">
            <Hotel className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl">Daily Selections</CardTitle>
            <p className="text-base text-muted-foreground">
              Choose your hotel and meals for each day of your trip
            </p>
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
              {booking.dailySelections.map((day, index) => (
                <DailySelectionRow
                  key={index}
                  day={day}
                  index={index}
                  availableHotels={availableHotels}
                  availableLunches={availableMeals?.lunch}
                  availableDinners={availableMeals?.dinner}
                  noMeals={noMeals}
                  canSelectOneMeal={canSelectOneMeal}
                  onHotelChange={handleHotelChange}
                  onLunchChange={handleLunchChange}
                  onDinnerChange={handleDinnerChange}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {booking.dailySelections.map((day, index) => (
            <DailySelectionCard
              key={index}
              day={day}
              index={index}
              availableHotels={availableHotels}
              availableLunches={availableMeals?.lunch}
              availableDinners={availableMeals?.dinner}
              noMeals={noMeals}
              canSelectOneMeal={canSelectOneMeal}
              onHotelChange={handleHotelChange}
              onLunchChange={handleLunchChange}
              onDinnerChange={handleDinnerChange}
            />
          ))}
        </div>

        <SelectionActions
          isFormValid={isFormValid}
          isProcessing={isProcessing}
          onBack={onBack}
          onContinue={handleContinue}
        />
      </CardContent>
    </Card>
  );
};
