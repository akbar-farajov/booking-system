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
  <div className="flex flex-col sm:flex-row gap-3 pt-4">
    <Button
      variant="outline"
      onClick={onBack}
      className="flex-1 h-11"
      disabled={isProcessing}
    >
      Back to Configuration
    </Button>
    <Button
      onClick={onContinue}
      disabled={!isFormValid || isProcessing}
      className="flex-1 h-11 shadow-md hover:shadow-lg transition-all"
    >
      {isProcessing ? (
        <>
          <Spinner className="mr-2" />
          Processing...
        </>
      ) : (
        <>
          Continue to Summary
          <CheckCircle2 className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  </div>
);
