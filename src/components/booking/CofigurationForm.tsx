import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CalendarIcon,
  Flag,
  MapPin,
  Calendar as CalendarLucide,
  Hotel,
  Utensils,
  Info,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { countries, boardTypes } from "@/data/bookingData";
import { useBookingStore } from "@/store/bookingStore";
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

interface ConfigurationFormProps {
  onComplete: () => void;
}

export const ConfigurationForm: React.FC<ConfigurationFormProps> = ({
  onComplete,
}) => {
  const booking = useBookingStore((state) => state.booking);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
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
  }, [
    booking.citizenship,
    booking.startDate,
    booking.numberOfDays,
    booking.destination,
    booking.boardType,
  ]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Simulate API call for fetching available hotels/meals
    await new Promise((resolve) => setTimeout(resolve, 1000));

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

    setIsSubmitting(false);
    onComplete();
  };

  return (
    <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-500 border-2 hover:shadow-xl transition-shadow">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary rounded-lg p-2.5">
            <Hotel className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">Plan Your Trip</CardTitle>
            <CardDescription className="text-base">
              Fill in your travel details to get started
            </CardDescription>
          </div>
        </div>
        <div className="bg-accent/50 p-3 rounded-lg flex items-start gap-2 text-sm">
          <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <p className="text-muted-foreground">
            All fields are required. Your selection will determine available
            hotels and meal options.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="citizenship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base">
                      <Flag className="h-4 w-4 text-primary" />
                      Citizenship
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover z-50">
                        {countries.map((country) => (
                          <SelectItem
                            key={country.id}
                            value={country.id.toString()}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your country of citizenship
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center gap-2 text-base">
                        <CalendarLucide className="h-4 w-4 text-primary" />
                        Start Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "h-11 pl-3 text-left font-normal hover:bg-accent",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-popover z-50"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When does your trip begin?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <Clock className="h-4 w-4 text-primary" />
                        Number of Days
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Select between 1 to 30 days</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="30"
                          className="h-11"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>Duration of your stay</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base">
                      <MapPin className="h-4 w-4 text-primary" />
                      Destination Country
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Where are you traveling?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover z-50">
                        {countries.map((country) => (
                          <SelectItem key={country.id} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose your travel destination
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="boardType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="flex items-center gap-2 text-base">
                      <Utensils className="h-4 w-4 text-primary" />
                      Board Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        {boardTypes.map((board) => (
                          <label
                            key={board.code}
                            htmlFor={board.code}
                            className={cn(
                              "relative flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all hover:bg-accent hover:shadow-md",
                              field.value === board.code
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border"
                            )}
                          >
                            <RadioGroupItem
                              value={board.code}
                              id={board.code}
                              className="mt-1"
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-base">
                                  {board.name}
                                </span>
                                {board.code === "FB" && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Most Popular
                                  </Badge>
                                )}
                              </div>
                              {board.code === "FB" && (
                                <p className="text-sm text-muted-foreground">
                                  Breakfast, Lunch & Dinner included
                                </p>
                              )}
                              {board.code === "HB" && (
                                <p className="text-sm text-muted-foreground">
                                  Breakfast & one meal (lunch or dinner)
                                  included
                                </p>
                              )}
                              {board.code === "NB" && (
                                <p className="text-sm text-muted-foreground">
                                  Room only - No meals included
                                </p>
                              )}
                            </div>
                          </label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base shadow-md hover:shadow-lg transition-all"
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
      </CardContent>
    </Card>
  );
};
