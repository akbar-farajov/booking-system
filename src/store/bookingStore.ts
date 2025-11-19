import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookingConfiguration, DaySelection } from "@/types/booking";

interface BookingStore {
  booking: BookingConfiguration;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  updateBooking: (updates: Partial<BookingConfiguration>) => void;
  updateDaySelection: (
    dayIndex: number,
    updates: Partial<DaySelection>
  ) => void;
  resetBooking: () => void;
}

const initialBooking: BookingConfiguration = {
  citizenship: null,
  startDate: null,
  numberOfDays: 1,
  destination: null,
  boardType: null,
  dailySelections: [],
};

const customStorage = {
  getItem: (name: string) => {
    const str = localStorage.getItem(name);
    if (!str) return null;

    const { state } = JSON.parse(str);

    if (state.booking.startDate) {
      state.booking.startDate = new Date(state.booking.startDate);
    }

    if (state.booking.dailySelections) {
      state.booking.dailySelections = state.booking.dailySelections.map(
        (selection: any) => ({
          ...selection,
          date: new Date(selection.date),
        })
      );
    }

    return { state };
  },
  setItem: (name: string, value: any) => {
    const str = JSON.stringify(value);
    localStorage.setItem(name, str);
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      booking: initialBooking,
      isLoading: false,

      setLoading: (loading) =>
        set(() => ({
          isLoading: loading,
        })),

      updateBooking: (updates) =>
        set((state) => ({
          booking: { ...state.booking, ...updates },
        })),

      updateDaySelection: (dayIndex, updates) =>
        set((state) => {
          const newSelections = [...state.booking.dailySelections];
          newSelections[dayIndex] = {
            ...newSelections[dayIndex],
            ...updates,
          };
          return {
            booking: {
              ...state.booking,
              dailySelections: newSelections,
            },
          };
        }),

      resetBooking: () =>
        set(() => ({
          booking: initialBooking,
        })),
    }),
    {
      name: "booking-storage",
      storage: customStorage,
    }
  )
);
