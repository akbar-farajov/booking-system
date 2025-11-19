import { cn } from "@/lib/utils";

interface StepConnectorProps {
  active: boolean;
}

export const StepConnector: React.FC<StepConnectorProps> = ({ active }) => (
  <div
    className={cn(
      "h-1.5 w-12 sm:w-20 rounded-full transition-all duration-500",
      active
        ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md"
        : "bg-slate-300 dark:bg-slate-600"
    )}
  />
);
