import { Hotel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DayBreakdownItem } from "./day-breakdown-item";
import type { DaySelection, Hotel as HotelType, Meal } from "@/types/booking";

interface DailyBreakdownCardProps {
  dailySelections: DaySelection[];
  numberOfDays: number;
  availableHotels: HotelType[];
  availableLunches?: Meal[];
  availableDinners?: Meal[];
}

export const DailyBreakdownCard: React.FC<DailyBreakdownCardProps> = ({
  dailySelections,
  numberOfDays,
  availableHotels,
  availableLunches,
  availableDinners,
}) => (
  <Card className="shadow-2xl border-2 border-indigo-200 dark:border-indigo-800 hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/50 transition-all bg-white/90 dark:bg-slate-800/90">
    <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 border-b-2 border-indigo-200 dark:border-indigo-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hotel className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <CardTitle className="text-2xl text-indigo-900 dark:text-indigo-100">
            Daily Breakdown
          </CardTitle>
        </div>
        <Badge
          variant="outline"
          className="text-sm px-3 py-1.5 border-2 border-indigo-400 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold"
        >
          {numberOfDays} {numberOfDays === 1 ? "day" : "days"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="pt-6 space-y-4">
      {dailySelections.map((day, index) => (
        <DayBreakdownItem
          key={index}
          day={day}
          index={index}
          availableHotels={availableHotels}
          availableLunches={availableLunches}
          availableDinners={availableDinners}
          isLast={index === dailySelections.length - 1}
        />
      ))}
    </CardContent>
  </Card>
);
