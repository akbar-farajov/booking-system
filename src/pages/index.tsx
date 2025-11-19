import { useState, useMemo } from "react";
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
  const [currentStep, setCurrentStep] = useState<Step>("config");
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
    <div className="min-h-screen bg-linear-to-br from-background via-accent/5 to-background">
      <header className="bg-gradient-hero text-primary-foreground shadow-lg sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                <Plane className="h-8 w-8 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  TravelBook
                </h1>
                <p className="text-sm text-primary-foreground/90 font-medium">
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 mb-8">
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

      <footer className="mt-16 py-6 border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 TravelBook. Making travel planning effortless.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
