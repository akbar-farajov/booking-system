import { Clock, Info } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Control } from "react-hook-form";

interface DurationFieldProps {
  control: Control<any>;
}

export const DurationField: React.FC<DurationFieldProps> = ({ control }) => (
  <FormField
    control={control}
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
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          />
        </FormControl>
        <FormDescription>Duration of your stay</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
