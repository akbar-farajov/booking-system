import { ArrowLeft, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface SummaryActionsProps {
  isConfirming: boolean;
  onBack: () => void;
  onConfirm: () => void;
  onReset: () => void;
}

export const SummaryActions: React.FC<SummaryActionsProps> = ({
  isConfirming,
  onBack,
  onConfirm,
  onReset,
}) => (
  <>
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Button
        variant="outline"
        onClick={onBack}
        className="flex-1 h-14 border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-semibold"
        disabled={isConfirming}
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Selections
      </Button>
      <Button
        onClick={onConfirm}
        className="flex-1 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transition-all text-base font-bold"
        disabled={isConfirming}
      >
        {isConfirming ? (
          <>
            <Spinner className="mr-2" />
            Confirming Your Booking...
          </>
        ) : (
          <>
            <FileCheck className="mr-2 h-5 w-5" />
            Confirm Booking
          </>
        )}
      </Button>
    </div>

    <div className="pt-6 border-t-2 border-slate-200 dark:border-slate-700">
      <Button
        variant="ghost"
        onClick={onReset}
        className="w-full h-12 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 font-semibold text-slate-600 dark:text-slate-400"
        disabled={isConfirming}
      >
        Start New Booking
      </Button>
    </div>
  </>
);
