import { useMemo } from "react";
import { useQueryState } from "nuqs";
import { Plane, Settings, Calendar, CheckCircle } from "lucide-react";
import { ConfigurationForm } from "@/components/booking/configuration-form";
import { DailySelectionTable } from "@/components/booking/daily-selection-table";
import { BookingSummary } from "@/components/booking/booking-summary";
import { StepIndicator } from "@/components/shared/step-indicator";
import { StepConnector } from "@/components/shared/step-connector";
import { ProgressIndicator } from "@/components/shared/progress-indicator";
import { useBookingStore } from "@/store/bookingStore";

type Step = "config" | "daily" | "summary";

const STEPS_CONFIG = [
  { key: "config" as Step, icon: Settings, label: "Configuration" },
  { key: "daily" as Step, icon: Calendar, label: "Daily Selection" },
  { key: "summary" as Step, icon: CheckCircle, label: "Summary" },
] as const;

const Index = () => {
  const [currentStep, setCurrentStep] = useQueryState<Step>("step", {
    defaultValue: "config",
    parse: (value) => {
      const validSteps: Step[] = ["config", "daily", "summary"];
      return validSteps.includes(value as Step) ? (value as Step) : "config";
    },
  });
  const resetBooking = useBookingStore((state) => state.resetBooking);

  const handleReset = () => {
    resetBooking();
    setCurrentStep("config");
  };

  const currentStepNumber = useMemo(
    () => STEPS_CONFIG.findIndex((step) => step.key === currentStep) + 1,
    [currentStep]
  );

  const isStepCompleted = (stepKey: Step) => {
    const stepIndex = STEPS_CONFIG.findIndex((s) => s.key === stepKey);
    const currentIndex = STEPS_CONFIG.findIndex((s) => s.key === currentStep);
    return stepIndex < currentIndex;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950">
      <header className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/30 rounded-xl p-3 backdrop-blur-md shadow-lg">
                <Plane className="h-10 w-10 animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  TravelBook
                </h1>
                <p className="text-base text-white/95 font-medium">
                  Your Perfect Journey Awaits
                </p>
              </div>
            </div>
            <ProgressIndicator
              currentStep={currentStepNumber}
              totalSteps={STEPS_CONFIG.length}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-indigo-200 dark:border-indigo-800 mb-8">
              <div className="flex items-center justify-center gap-2 sm:gap-6 mb-2">
                {STEPS_CONFIG.map((step, index) => (
                  <div
                    key={step.key}
                    className="flex items-center gap-2 sm:gap-6"
                  >
                    <StepIndicator
                      icon={step.icon}
                      active={currentStep === step.key}
                      completed={isStepCompleted(step.key)}
                      label={step.label}
                    />
                    {index < STEPS_CONFIG.length - 1 && (
                      <StepConnector
                        active={isStepCompleted(STEPS_CONFIG[index + 1].key)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-in fade-in-50 slide-in-from-bottom-8 duration-500">
            {currentStep === "config" && (
              <ConfigurationForm onComplete={() => setCurrentStep("daily")} />
            )}

            {currentStep === "daily" && (
              <DailySelectionTable
                onComplete={() => setCurrentStep("summary")}
                onBack={() => setCurrentStep("config")}
              />
            )}

            {currentStep === "summary" && (
              <BookingSummary
                onBack={() => setCurrentStep("daily")}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 py-8 border-t-2 border-indigo-200 dark:border-indigo-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
          <p className="font-medium">
            © 2025 TravelBook. Making travel planning effortless.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
