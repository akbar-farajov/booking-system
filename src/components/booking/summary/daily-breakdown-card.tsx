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
  <Card className="shadow-xl border-2 hover:shadow-2xl transition-shadow">
    <CardHeader className="bg-accent/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hotel className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Daily Breakdown</CardTitle>
        </div>
        <Badge variant="outline" className="text-sm">
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
