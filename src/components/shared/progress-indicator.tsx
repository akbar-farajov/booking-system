import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => (
  <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
    <div
      className={cn(
        "w-2 h-2 rounded-full transition-all",
        "bg-green-400 animate-pulse"
      )}
    />
    <span className="text-sm font-medium">
      Step {currentStep} of {totalSteps}
    </span>
  </div>
);
