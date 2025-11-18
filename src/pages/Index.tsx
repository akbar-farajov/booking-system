import { useState } from "react";
import { Plane } from "lucide-react";
import { ConfigurationForm } from "@/components/booking/CofigurationForm";
import { DailySelectionTable } from "@/components/booking/DailySelectionTable";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { useBookingStore } from "@/store/bookingStore";

type Step = "config" | "daily" | "summary";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("config");
  const resetBooking = useBookingStore((state) => state.resetBooking);

  const handleReset = () => {
    resetBooking();
    setCurrentStep("config");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Plane className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">TravelBook</h1>
              <p className="text-sm text-primary-foreground/90">
                Your Perfect Journey Awaits
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <StepIndicator
                step={1}
                active={currentStep === "config"}
                completed={currentStep !== "config"}
                label="Configuration"
              />
              <StepConnector />
              <StepIndicator
                step={2}
                active={currentStep === "daily"}
                completed={currentStep === "summary"}
                label="Daily Selection"
              />
              <StepConnector />
              <StepIndicator
                step={3}
                active={currentStep === "summary"}
                completed={false}
                label="Summary"
              />
            </div>
          </div>

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
      </main>
    </div>
  );
};

const StepIndicator = ({
  step,
  active,
  completed,
  label,
}: {
  step: number;
  active: boolean;
  completed: boolean;
  label: string;
}) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : completed
          ? "bg-green-500 text-white"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {step}
    </div>
    <span
      className={`text-xs mt-2 font-medium ${
        active ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {label}
    </span>
  </div>
);

const StepConnector = () => <div className="h-0.5 w-16 bg-border" />;

export default Index;
