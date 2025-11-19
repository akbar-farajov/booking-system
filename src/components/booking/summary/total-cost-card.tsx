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
  <Card className="shadow-2xl border-4 border-emerald-500 dark:border-emerald-600 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 animate-in slide-in-from-bottom-2 duration-700 hover:scale-[1.02] transition-transform">
    <CardContent className="pt-8 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-lg">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-1">
              Total Cost
            </p>
            <p className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              ${totalCost}
            </p>
          </div>
        </div>
        <div className="text-center sm:text-right text-sm bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 border-2 border-emerald-200 dark:border-emerald-800">
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            For {numberOfDays} {numberOfDays === 1 ? "day" : "days"}
          </p>
          <p className="font-bold text-lg text-emerald-700 dark:text-emerald-300 mt-1">
            ${averagePerDay.toFixed(2)} per day
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
