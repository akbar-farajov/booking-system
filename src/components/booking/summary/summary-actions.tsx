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
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <Button
        variant="outline"
        onClick={onBack}
        className="flex-1 h-12"
        disabled={isConfirming}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Selections
      </Button>
      <Button
        onClick={onConfirm}
        className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all text-base font-semibold"
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

    <div className="pt-4 border-t">
      <Button
        variant="ghost"
        onClick={onReset}
        className="w-full h-11 hover:bg-destructive/10 hover:text-destructive"
        disabled={isConfirming}
      >
        Start New Booking
      </Button>
    </div>
  </>
);
