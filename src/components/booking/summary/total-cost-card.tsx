import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TotalCostCardProps {
  totalCost: number;
  numberOfDays: number;
  averagePerDay: number;
}

export const TotalCostCard: React.FC<TotalCostCardProps> = ({
  totalCost,
  numberOfDays,
  averagePerDay,
}) => (
  <Card className="shadow-2xl border-4 border-green-500 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 animate-in slide-in-from-bottom-2 duration-700">
    <CardContent className="pt-6 pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-3">
            <DollarSign className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Total Cost
            </p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">
              ${totalCost}
            </p>
          </div>
        </div>
        <div className="text-center sm:text-right text-sm text-muted-foreground">
          <p>
            For {numberOfDays} {numberOfDays === 1 ? "day" : "days"}
          </p>
          <p className="font-semibold text-foreground">
            ${averagePerDay.toFixed(2)} per day
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
