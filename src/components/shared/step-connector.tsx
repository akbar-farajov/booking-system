import { cn } from "@/lib/utils";

interface StepConnectorProps {
  active: boolean;
}

export const StepConnector: React.FC<StepConnectorProps> = ({ active }) => (
  <div
    className={cn(
      "h-1 w-12 sm:w-20 rounded-full transition-all duration-500",
      active ? "bg-green-500" : "bg-border"
    )}
  />
);
