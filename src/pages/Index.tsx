import { useState } from "react";
import { Plane, Settings, Calendar, CheckCircle } from "lucide-react";
import { ConfigurationForm } from "@/components/booking/CofigurationForm";
import { DailySelectionTable } from "@/components/booking/DailySelectionTable";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { useBookingStore } from "@/store/bookingStore";
import { cn } from "@/lib/utils";

type Step = "config" | "daily" | "summary";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("config");
  const resetBooking = useBookingStore((state) => state.resetBooking);

  const handleReset = () => {
    resetBooking();
    setCurrentStep("config");
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
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentStep === "config" && "bg-green-400 animate-pulse",
                  currentStep !== "config" && "bg-white/50"
                )}
              />
              <span className="text-sm font-medium">
                Step{" "}
                {currentStep === "config"
                  ? "1"
                  : currentStep === "daily"
                  ? "2"
                  : "3"}{" "}
                of 3
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 mb-8">
              <div className="flex items-center justify-center gap-2 sm:gap-6 mb-2">
                <StepIndicator
                  icon={Settings}
                  active={currentStep === "config"}
                  completed={currentStep !== "config"}
                  label="Configuration"
                />
                <StepConnector active={currentStep !== "config"} />
                <StepIndicator
                  icon={Calendar}
                  active={currentStep === "daily"}
                  completed={currentStep === "summary"}
                  label="Daily Selection"
                />
                <StepConnector active={currentStep === "summary"} />
                <StepIndicator
                  icon={CheckCircle}
                  active={currentStep === "summary"}
                  completed={false}
                  label="Summary"
                />
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

const StepIndicator = ({
  icon: Icon,
  active,
  completed,
  label,
}: {
  icon: React.ElementType;
  active: boolean;
  completed: boolean;
  label: string;
}) => (
  <div className="flex flex-col items-center group">
    <div className="relative">
      <div
        className={cn(
          "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-lg border-2",
          active
            ? "bg-primary text-primary-foreground border-primary scale-110 animate-pulse"
            : completed
            ? "bg-green-500 text-white border-green-500"
            : "bg-muted text-muted-foreground border-border"
        )}
      >
        {completed ? (
          <CheckCircle className="h-6 w-6" />
        ) : (
          <Icon
            className={cn("h-5 w-5 sm:h-6 sm:w-6", active && "animate-bounce")}
          />
        )}
      </div>
      {active && (
        <div className="absolute -inset-1 bg-primary/20 rounded-full animate-ping" />
      )}
    </div>
    <span
      className={cn(
        "text-xs sm:text-sm mt-2 font-semibold text-center transition-colors max-w-[80px] sm:max-w-none",
        active ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {label}
    </span>
  </div>
);

const StepConnector = ({ active }: { active: boolean }) => (
  <div
    className={cn(
      "h-1 w-12 sm:w-20 rounded-full transition-all duration-500",
      active ? "bg-green-500" : "bg-border"
    )}
  />
);

export default Index;
