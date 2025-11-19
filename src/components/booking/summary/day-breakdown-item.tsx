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
        "p-5 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-[1.01]",
        index % 2 === 0
          ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800"
          : "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border-slate-200 dark:border-slate-700"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
            <span className="font-bold text-white text-sm">{day.day}</span>
          </div>
          <div>
            <p className="font-bold text-base text-indigo-900 dark:text-indigo-100">
              Day {day.day}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {format(day.date, "EEE, MMM dd, yyyy")}
            </p>
          </div>
        </div>
        <div className="text-right bg-white/60 dark:bg-slate-800/60 px-3 py-2 rounded-lg border-2 border-indigo-200 dark:border-indigo-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
            Day Total
          </p>
          <p className="font-bold text-xl text-indigo-700 dark:text-indigo-300">
            ${dayTotal}
          </p>
        </div>
      </div>
      <div className="space-y-2 pl-12">
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
      {!isLast && <Separator className="mt-5 bg-slate-300 dark:bg-slate-700" />}
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
  <div className="flex items-center justify-between text-sm p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
      <span className="text-slate-600 dark:text-slate-400 font-semibold">
        {label}:
      </span>
      <span className="font-bold text-slate-900 dark:text-slate-100">
        {name}
      </span>
    </div>
    <span className="font-bold text-indigo-700 dark:text-indigo-300">
      ${price}
    </span>
  </div>
);
