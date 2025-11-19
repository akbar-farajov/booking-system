import { Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { boardTypes } from "@/data/bookingData";
import type { Control } from "react-hook-form";

interface BoardTypeFieldProps {
  control: Control<any>;
}

const BOARD_TYPE_DESCRIPTIONS = {
  FB: "Breakfast, Lunch & Dinner included",
  HB: "Breakfast & one meal (lunch or dinner) included",
  NB: "Room only - No meals included",
} as const;

export const BoardTypeField: React.FC<BoardTypeFieldProps> = ({ control }) => (
  <FormField
    control={control}
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
                      <Badge variant="secondary" className="text-xs">
                        Most Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {BOARD_TYPE_DESCRIPTIONS[board.code]}
                  </p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
