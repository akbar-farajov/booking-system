import { useMemo } from "react";
import { hotels, meals } from "@/data/bookingData";
import type { BookingConfiguration } from "@/types/booking";

export const useBookingCalculations = (booking: BookingConfiguration) => {
  const availableHotels = useMemo(
    () => (booking.destination ? hotels[booking.destination] || [] : []),
    [booking.destination]
  );

  const availableMeals = useMemo(
    () => (booking.destination ? meals[booking.destination] : undefined),
    [booking.destination]
  );

  const calculateTotal = useMemo(() => {
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
  }, [booking.dailySelections, availableHotels, availableMeals]);

  const calculateDayTotal = (dayIndex: number) => {
    const day = booking.dailySelections[dayIndex];
    if (!day) return 0;

    const hotel = availableHotels.find((h) => h.id === day.hotelId);
    const lunch = availableMeals?.lunch.find((m) => m.id === day.lunchId);
    const dinner = availableMeals?.dinner.find((m) => m.id === day.dinnerId);

    return (hotel?.price || 0) + (lunch?.price || 0) + (dinner?.price || 0);
  };

  const averagePerDay = useMemo(
    () =>
      booking.numberOfDays > 0 ? calculateTotal / booking.numberOfDays : 0,
    [calculateTotal, booking.numberOfDays]
  );

  return {
    availableHotels,
    availableMeals,
    calculateTotal,
    calculateDayTotal,
    averagePerDay,
  };
};
