import { MapPin } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/bookingData";
import type { Control } from "react-hook-form";

interface DestinationFieldProps {
  control: Control<any>;
}

export const DestinationField: React.FC<DestinationFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
    name="destination"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2 text-base">
          <MapPin className="h-4 w-4 text-primary" />
          Destination Country
        </FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <FormDescription>Choose your travel destination</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
