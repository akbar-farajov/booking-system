import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Hotel, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Form } from "@/components/ui/form";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SectionCard } from "@/components/shared/section-card";
import { CitizenshipField } from "./form-fields/citizenship-field";
import { DateField } from "./form-fields/date-field";
import { DurationField } from "./form-fields/duration-field";
import { DestinationField } from "./form-fields/destination-field";
import { BoardTypeField } from "./form-fields/board-type-field";
import { useBookingStore } from "@/store/bookingStore";
import { useAsyncSubmit } from "@/hooks/use-async-submit";
import type { DaySelection } from "@/types/booking";

const formSchema = z.object({
  citizenship: z.string().min(1, "Please select your citizenship"),
  startDate: z.date({
    error: "Please select a start date",
  }),
  numberOfDays: z.number().min(1, "Minimum 1 day").max(30, "Maximum 30 days"),
  destination: z.string().min(1, "Please select a destination"),
  boardType: z.enum(["FB", "HB", "NB"], {
    error: "Please select a board type",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ConfigurationFormProps {
  onComplete: () => void;
}

export const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  onComplete,
}) => {
  const booking = useBookingStore((state) => state.booking);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const { isSubmitting, submit } = useAsyncSubmit({ onSuccess: onComplete });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      citizenship: booking.citizenship?.toString() || "",
      startDate: booking.startDate || undefined,
      numberOfDays: booking.numberOfDays || 1,
      destination: booking.destination || "",
      boardType: booking.boardType || undefined,
    },
  });

  useEffect(() => {
    if (booking.citizenship) {
      form.reset({
        citizenship: booking.citizenship.toString(),
        startDate: booking.startDate || undefined,
        numberOfDays: booking.numberOfDays,
        destination: booking.destination || "",
        boardType: booking.boardType || undefined,
      });
    }
  }, [booking, form]);

  const onSubmit = async (values: FormValues) => {
    await submit(() => {
      const dailySelections: DaySelection[] = Array.from(
        { length: values.numberOfDays },
        (_, i) => {
          const date = new Date(values.startDate);
          date.setDate(date.getDate() + i);
          return {
            day: i + 1,
            date,
            hotelId: null,
            lunchId: null,
            dinnerId: null,
          };
        }
      );

      updateBooking({
        citizenship: parseInt(values.citizenship),
        startDate: values.startDate,
        numberOfDays: values.numberOfDays,
        destination: values.destination,
        boardType: values.boardType,
        dailySelections,
      });
    });
  };

  return (
    <SectionCard
      icon={Hotel}
      title="Plan Your Trip"
      description="Fill in your travel details to get started"
      infoMessage="All fields are required. Your selection will determine available hotels and meal options."
    >
      <TooltipProvider>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CitizenshipField control={form.control} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DateField control={form.control} />
              <DurationField control={form.control} />
            </div>

            <DestinationField control={form.control} />

            <BoardTypeField control={form.control} />

            <Button
              type="submit"
              className="w-full h-14 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all font-bold text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2" />
                  Loading available options...
                </>
              ) : (
                <>
                  Continue to Hotel & Meal Selection
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </TooltipProvider>
    </SectionCard>
  );
};
