export interface Country {
    id: number;
    name: string;
  }
  
  export interface Hotel {
    id: number;
    name: string;
    price: number;
  }
  
  export interface BoardType {
    code: "FB" | "HB" | "NB";
    name: string;
  }
  
  export interface Meal {
    id: number;
    name: string;
    price: number;
  }
  
  export interface DaySelection {
    day: number;
    date: Date;
    hotelId: number | null;
    lunchId: number | null;
    dinnerId: number | null;
  }
  
  export interface BookingConfiguration {
    citizenship: number | null;
    startDate: Date | null;
    numberOfDays: number;
    destination: string | null;
    boardType: "FB" | "HB" | "NB" | null;
    dailySelections: DaySelection[];
  }
  