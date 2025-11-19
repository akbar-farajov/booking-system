import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  icon: React.ElementType;
  active: boolean;
  completed: boolean;
  label: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  icon: Icon,
  active,
  completed,
  label,
}) => (
  <div className="flex flex-col items-center group">
    <div className="relative">
      <div
        className={cn(
          "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-lg border-3",
          active
            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-400 scale-110 animate-pulse"
            : completed
            ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400"
            : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600"
        )}
      >
        {completed ? (
          <CheckCircle className="h-6 w-6" />
        ) : (
          <Icon
            className={cn("h-5 w-5 sm:h-6 sm:w-6", active && "animate-bounce")}
          />
        )}
      </div>
      {active && (
        <div className="absolute -inset-1 bg-indigo-400/30 rounded-full animate-ping" />
      )}
    </div>
    <span
      className={cn(
        "text-xs sm:text-sm mt-2 font-semibold text-center transition-colors max-w-[80px] sm:max-w-none",
        active
          ? "text-indigo-900 dark:text-indigo-200"
          : "text-slate-600 dark:text-slate-400"
      )}
    >
      {label}
    </span>
  </div>
);
