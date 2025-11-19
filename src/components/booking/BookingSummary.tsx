import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { countries, hotels, meals, boardTypes } from "@/data/bookingData";
import { useBookingStore } from "@/store/bookingStore";
import { toast } from "sonner";

interface BookingSummaryProps {
  onBack: () => void;
  onReset: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  onBack,
  onReset,
}) => {
  const booking = useBookingStore((state) => state.booking);
  const [isConfirming, setIsConfirming] = useState(false);

  if (!booking.destination || !booking.boardType || !booking.startDate) {
    return null;
  }

  const citizenshipName = countries.find(
    (c) => c.id === booking.citizenship
  )?.name;
  const boardTypeName = boardTypes.find(
    (b) => b.code === booking.boardType
  )?.name;
  const availableHotels = hotels[booking.destination] || [];
  const availableMeals = meals[booking.destination];

  const calculateTotal = () => {
    let total = 0;
    booking.dailySelections.forEach((day) => {
      const hotel = availableHotels.find((h) => h.id === day.hotelId);
      if (hotel) total += hotel.price;

      if (day.lunchId) {
        const lunch = availableMeals?.lunch.find((m) => m.id === day.lunchId);
        if (lunch) total += lunch.price;
      }

      if (day.dinnerId) {
        const dinner = availableMeals?.dinner.find(
          (m) => m.id === day.dinnerId
        );
        if (dinner) total += dinner.price;
      }
    });
    return total;
  };

  const handleConfirm = async () => {
    setIsConfirming(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsConfirming(false);
    toast.success("Booking confirmed successfully!", {
      description: `Total cost: $${calculateTotal()}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg pt-0">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-xl p-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6" />
            <div>
              <CardTitle className="text-2xl">Booking Summary</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Review your travel details
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Citizenship</p>
              <p className="font-semibold">{citizenshipName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="font-semibold">{booking.destination}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-semibold">
                {format(booking.startDate, "PPP")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-semibold">{booking.numberOfDays} days</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Board Type</p>
              <p className="font-semibold">{boardTypeName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Daily Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {booking.dailySelections.map((day, index) => {
            const hotel = availableHotels.find((h) => h.id === day.hotelId);
            const lunch = availableMeals?.lunch.find(
              (m) => m.id === day.lunchId
            );
            const dinner = availableMeals?.dinner.find(
              (m) => m.id === day.dinnerId
            );
            const dayTotal =
              (hotel?.price || 0) + (lunch?.price || 0) + (dinner?.price || 0);

            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      Day {day.day} - {format(day.date, "MMM dd, yyyy")}
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1 mt-1">
                      {hotel && (
                        <p>
                          • Hotel: {hotel.name} (${hotel.price})
                        </p>
                      )}
                      {lunch && (
                        <p>
                          • Lunch: {lunch.name} (${lunch.price})
                        </p>
                      )}
                      {dinner && (
                        <p>
                          • Dinner: {dinner.name} (${dinner.price})
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="font-semibold text-primary">${dayTotal}</p>
                </div>
                {index < booking.dailySelections.length - 1 && <Separator />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="shadow-lg border-2 border-green-500">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total Cost</span>
            <span className="text-primary">${calculateTotal()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={isConfirming}
        >
          Back to Selections
        </Button>
        <Button
          onClick={handleConfirm}
          className="flex-1 bg-green-500"
          disabled={isConfirming}
        >
          {isConfirming ? (
            <>
              <Spinner className="mr-2" />
              Confirming...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>

      <Button
        variant="ghost"
        onClick={onReset}
        className="w-full"
        disabled={isConfirming}
      >
        Start New Booking
      </Button>
    </div>
  );
};
