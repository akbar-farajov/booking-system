import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface SelectionActionsProps {
  isFormValid: boolean;
  isProcessing: boolean;
  onBack: () => void;
  onContinue: () => void;
}

export const SelectionActions: React.FC<SelectionActionsProps> = ({
  isFormValid,
  isProcessing,
  onBack,
  onContinue,
}) => (
  <div className="flex flex-col sm:flex-row gap-4 pt-6">
    <Button
      variant="outline"
      onClick={onBack}
      className="flex-1 h-14 border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-semibold"
      disabled={isProcessing}
    >
      Back to Configuration
    </Button>
    <Button
      onClick={onContinue}
      disabled={!isFormValid || isProcessing}
      className="flex-1 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all font-bold text-base"
    >
      {isProcessing ? (
        <>
          <Spinner className="mr-2" />
          Processing...
        </>
      ) : (
        <>
          Continue to Summary
          <CheckCircle2 className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  </div>
);
