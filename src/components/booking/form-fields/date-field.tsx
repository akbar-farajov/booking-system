import { Calendar as CalendarLucide, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Control } from "react-hook-form";

interface DateFieldProps {
  control: Control<any>;
}

export const DateField: React.FC<DateFieldProps> = ({ control }) => (
  <FormField
    control={control}
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
          <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
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
        <FormDescription>When does your trip begin?</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
