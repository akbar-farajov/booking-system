import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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

    onComplete();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Plan Your Trip</CardTitle>
        <CardDescription>
          Fill in your travel details to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Citizenship</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover z-50 ">
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Days</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
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
                  <FormLabel>Destination Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="boardType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Board Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2 items-start"
                    >
                      {boardTypes.map((board) => (
                        <div
                          key={board.code}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <RadioGroupItem value={board.code} id={board.code} />
                          <label
                            htmlFor={board.code}
                            className="font-normal cursor-pointer flex-1 text-sm"
                          >
                            <span className="font-semibold">{board.name}</span>
                            {board.code === "FB" && (
                              <span className="text-muted-foreground ml-2">
                                (Breakfast, Lunch & Dinner included)
                              </span>
                            )}
                            {board.code === "HB" && (
                              <span className="text-muted-foreground ml-2">
                                (Breakfast & one meal included)
                              </span>
                            )}
                            {board.code === "NB" && (
                              <span className="text-muted-foreground ml-2">
                                (No meals included)
                              </span>
                            )}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Continue to Hotel & Meal Selection
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
