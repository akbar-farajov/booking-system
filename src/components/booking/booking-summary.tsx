import { useState } from "react";
import { countries, boardTypes } from "@/data/bookingData";
import { useBookingStore } from "@/store/bookingStore";
import { useBookingCalculations } from "@/hooks/use-booking-calculations";
import { TripInfoCard } from "./summary/trip-info-card";
import { DailyBreakdownCard } from "./summary/daily-breakdown-card";
import { TotalCostCard } from "./summary/total-cost-card";
import { SummaryActions } from "./summary/summary-actions";
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

  const { availableHotels, availableMeals, calculateTotal, averagePerDay } =
    useBookingCalculations(booking);

  if (!booking.destination || !booking.boardType || !booking.startDate) {
    return null;
  }

  const citizenshipName =
    countries.find((c) => c.id === booking.citizenship)?.name || "";
  const boardTypeName =
    boardTypes.find((b) => b.code === booking.boardType)?.name || "";

  const handleConfirm = async () => {
    setIsConfirming(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsConfirming(false);

    toast.success("Booking confirmed successfully!", {
      description: `Total cost: $${calculateTotal}`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <TripInfoCard
        citizenshipName={citizenshipName}
        destination={booking.destination}
        startDate={booking.startDate}
        numberOfDays={booking.numberOfDays}
        boardTypeName={boardTypeName}
        boardType={booking.boardType}
      />

      <DailyBreakdownCard
        dailySelections={booking.dailySelections}
        numberOfDays={booking.numberOfDays}
        availableHotels={availableHotels}
        availableLunches={availableMeals?.lunch}
        availableDinners={availableMeals?.dinner}
      />

      <TotalCostCard
        totalCost={calculateTotal}
        numberOfDays={booking.numberOfDays}
        averagePerDay={averagePerDay}
      />

      <SummaryActions
        isConfirming={isConfirming}
        onBack={onBack}
        onConfirm={handleConfirm}
        onReset={onReset}
      />
    </div>
  );
};
