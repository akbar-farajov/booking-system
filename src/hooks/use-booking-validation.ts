import { useMemo } from "react";
import type { BookingConfiguration } from "@/types/booking";

export const useBookingValidation = (booking: BookingConfiguration) => {
  const canSelectOneMeal = booking.boardType === "HB";
  const noMeals = booking.boardType === "NB";

  const isFormValid = useMemo(
    () => booking.dailySelections.every((day) => day.hotelId !== null),
    [booking.dailySelections]
  );

  const selectedDaysCount = useMemo(
    () => booking.dailySelections.filter((day) => day.hotelId !== null).length,
    [booking.dailySelections]
  );

  const completionPercentage = useMemo(
    () =>
      booking.dailySelections.length > 0
        ? (selectedDaysCount / booking.dailySelections.length) * 100
        : 0,
    [selectedDaysCount, booking.dailySelections.length]
  );

  return {
    canSelectOneMeal,
    noMeals,
    isFormValid,
    selectedDaysCount,
    completionPercentage,
  };
};
