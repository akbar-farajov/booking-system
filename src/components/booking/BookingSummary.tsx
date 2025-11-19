import { format } from "date-fns";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Flag,
  Hotel,
  Utensils,
  DollarSign,
  ArrowLeft,
  Sparkles,
  FileCheck,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { countries, hotels, meals, boardTypes } from "@/data/bookingData";
import { useBookingStore } from "@/store/bookingStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <Card className="shadow-xl pt-0 border-2 overflow-hidden hover:shadow-2xl transition-shadow">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles className="h-32 w-32" />
          </div>
          <div className="relative flex items-start gap-3">
            <div className="bg-white/20 rounded-lg p-2.5">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl mb-1">Booking Summary</CardTitle>
              <CardDescription className="text-primary-foreground/90 text-base">
                Review your travel details before confirming
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-4 rounded-lg bg-accent/50 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Flag className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Citizenship</p>
              </div>
              <p className="font-semibold text-lg">{citizenshipName}</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-accent/50 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Destination</p>
              </div>
              <p className="font-semibold text-lg">{booking.destination}</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-accent/50 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Start Date</p>
              </div>
              <p className="font-semibold text-lg">
                {format(booking.startDate, "PPP")}
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-accent/50 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Duration</p>
              </div>
              <p className="font-semibold text-lg">
                {booking.numberOfDays}{" "}
                {booking.numberOfDays === 1 ? "day" : "days"}
              </p>
            </div>
            <div className="md:col-span-2 space-y-2 p-4 rounded-lg bg-accent/50 border border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Utensils className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Board Type</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg">{boardTypeName}</p>
                <Badge variant="secondary">
                  {booking.boardType === "FB" && "All Meals Included"}
                  {booking.boardType === "HB" && "Breakfast + 1 Meal"}
                  {booking.boardType === "NB" && "No Meals"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-2 hover:shadow-2xl transition-shadow">
        <CardHeader className="bg-accent/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hotel className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Daily Breakdown</CardTitle>
            </div>
            <Badge variant="outline" className="text-sm">
              {booking.numberOfDays}{" "}
              {booking.numberOfDays === 1 ? "day" : "days"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
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
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all hover:shadow-md",
                  index % 2 === 0 ? "bg-accent/30" : "bg-background"
                )}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="font-bold text-primary text-sm">
                        {day.day}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-base">Day {day.day}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(day.date, "EEE, MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Day Total</p>
                    <p className="font-bold text-xl text-primary">
                      ${dayTotal}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 pl-10">
                  {hotel && (
                    <div className="flex items-center justify-between text-sm p-2 bg-background rounded border">
                      <div className="flex items-center gap-2">
                        <Hotel className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Hotel:</span>
                        <span className="font-medium">{hotel.name}</span>
                      </div>
                      <span className="font-semibold">${hotel.price}</span>
                    </div>
                  )}
                  {lunch && (
                    <div className="flex items-center justify-between text-sm p-2 bg-background rounded border">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Lunch:</span>
                        <span className="font-medium">{lunch.name}</span>
                      </div>
                      <span className="font-semibold">${lunch.price}</span>
                    </div>
                  )}
                  {dinner && (
                    <div className="flex items-center justify-between text-sm p-2 bg-background rounded border">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Dinner:</span>
                        <span className="font-medium">{dinner.name}</span>
                      </div>
                      <span className="font-semibold">${dinner.price}</span>
                    </div>
                  )}
                </div>
                {index < booking.dailySelections.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="shadow-2xl border-4 border-green-500 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 animate-in slide-in-from-bottom-2 duration-700">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 rounded-full p-3">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Cost
                </p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  ${calculateTotal()}
                </p>
              </div>
            </div>
            <div className="text-center sm:text-right text-sm text-muted-foreground">
              <p>
                For {booking.numberOfDays}{" "}
                {booking.numberOfDays === 1 ? "day" : "days"}
              </p>
              <p className="font-semibold text-foreground">
                ${(calculateTotal() / booking.numberOfDays).toFixed(2)} per day
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
          disabled={isConfirming}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Selections
        </Button>
        <Button
          onClick={handleConfirm}
          className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all text-base font-semibold"
          disabled={isConfirming}
        >
          {isConfirming ? (
            <>
              <Spinner className="mr-2" />
              Confirming Your Booking...
            </>
          ) : (
            <>
              <FileCheck className="mr-2 h-5 w-5" />
              Confirm Booking
            </>
          )}
        </Button>
      </div>

      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          onClick={onReset}
          className="w-full h-11 hover:bg-destructive/10 hover:text-destructive"
          disabled={isConfirming}
        >
          Start New Booking
        </Button>
      </div>
    </div>
  );
};
