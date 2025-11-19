import { format } from "date-fns";
import { Hotel, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { DaySelection, Hotel as HotelType, Meal } from "@/types/booking";

interface DayBreakdownItemProps {
  day: DaySelection;
  index: number;
  availableHotels: HotelType[];
  availableLunches?: Meal[];
  availableDinners?: Meal[];
  isLast: boolean;
}

export const DayBreakdownItem: React.FC<DayBreakdownItemProps> = ({
  day,
  index,
  availableHotels,
  availableLunches,
  availableDinners,
  isLast,
}) => {
  const hotel = availableHotels.find((h) => h.id === day.hotelId);
  const lunch = availableLunches?.find((m) => m.id === day.lunchId);
  const dinner = availableDinners?.find((m) => m.id === day.dinnerId);
  const dayTotal =
    (hotel?.price || 0) + (lunch?.price || 0) + (dinner?.price || 0);

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-2 transition-all hover:shadow-md",
        index % 2 === 0 ? "bg-accent/30" : "bg-background"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="font-bold text-primary text-sm">{day.day}</span>
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
          <p className="font-bold text-xl text-primary">${dayTotal}</p>
        </div>
      </div>
      <div className="space-y-2 pl-10">
        {hotel && (
          <ItemRow
            icon={Hotel}
            label="Hotel"
            name={hotel.name}
            price={hotel.price}
          />
        )}
        {lunch && (
          <ItemRow
            icon={Utensils}
            label="Lunch"
            name={lunch.name}
            price={lunch.price}
          />
        )}
        {dinner && (
          <ItemRow
            icon={Utensils}
            label="Dinner"
            name={dinner.name}
            price={dinner.price}
          />
        )}
      </div>
      {!isLast && <Separator className="mt-4" />}
    </div>
  );
};

interface ItemRowProps {
  icon: React.ElementType;
  label: string;
  name: string;
  price: number;
}

const ItemRow: React.FC<ItemRowProps> = ({
  icon: Icon,
  label,
  name,
  price,
}) => (
  <div className="flex items-center justify-between text-sm p-2 bg-background rounded border">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{name}</span>
    </div>
    <span className="font-semibold">${price}</span>
  </div>
);
