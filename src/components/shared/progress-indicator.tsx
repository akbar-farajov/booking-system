import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => (
  <div className="hidden sm:flex items-center gap-3 bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg border border-white/30">
    <div
      className={cn(
        "w-2.5 h-2.5 rounded-full transition-all",
        "bg-yellow-300 animate-pulse shadow-lg shadow-yellow-300/50"
      )}
    />
    <span className="text-sm font-semibold">
      Step {currentStep} of {totalSteps}
    </span>
  </div>
);
