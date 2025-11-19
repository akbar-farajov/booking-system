import { Flag } from "lucide-react";
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

interface CitizenshipFieldProps {
  control: Control<any>;
}

export const CitizenshipField: React.FC<CitizenshipFieldProps> = ({
  control,
}) => (
  <FormField
    control={control}
    name="citizenship"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2 text-base">
          <Flag className="h-4 w-4 text-primary" />
          Citizenship
        </FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-popover z-50">
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id.toString()}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormDescription>Select your country of citizenship</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);
