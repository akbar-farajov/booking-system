import {
  CheckCircle2,
  Sparkles,
  Flag,
  MapPin,
  Calendar,
  Utensils,
} from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TripInfoCardProps {
  citizenshipName: string;
  destination: string;
  startDate: Date;
  numberOfDays: number;
  boardTypeName: string;
  boardType: "FB" | "HB" | "NB";
}

const BOARD_TYPE_LABELS = {
  FB: "All Meals Included",
  HB: "Breakfast + 1 Meal",
  NB: "No Meals",
} as const;

export const TripInfoCard: React.FC<TripInfoCardProps> = ({
  citizenshipName,
  destination,
  startDate,
  numberOfDays,
  boardTypeName,
  boardType,
}) => (
  <Card className="shadow-2xl pt-0 border-2 border-indigo-200 dark:border-indigo-800 overflow-hidden hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/50 transition-all">
    <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-xl p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-15">
        <Sparkles className="h-40 w-40" />
      </div>
      <div className="relative flex items-start gap-4">
        <div className="bg-white/30 rounded-xl p-3 shadow-lg backdrop-blur-sm">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <div>
          <CardTitle className="text-3xl mb-2">Booking Summary</CardTitle>
          <CardDescription className="text-white/95 text-base font-medium">
            Review your travel details before confirming
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-8 space-y-6 bg-white/90 dark:bg-slate-800/90">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem icon={Flag} label="Citizenship" value={citizenshipName} />
        <InfoItem icon={MapPin} label="Destination" value={destination} />
        <InfoItem
          icon={Calendar}
          label="Start Date"
          value={format(startDate, "PPP")}
        />
        <InfoItem
          icon={Calendar}
          label="Duration"
          value={`${numberOfDays} ${numberOfDays === 1 ? "day" : "days"}`}
        />
        <div className="md:col-span-2 space-y-2 p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-2 border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
            <Utensils className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <p className="text-sm font-semibold">Board Type</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-bold text-xl text-indigo-900 dark:text-indigo-100">
              {boardTypeName}
            </p>
            <Badge
              variant="secondary"
              className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100"
            >
              {BOARD_TYPE_LABELS[boardType]}
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="space-y-2 p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1">
      <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      <p className="text-sm font-semibold">{label}</p>
    </div>
    <p className="font-bold text-lg text-slate-900 dark:text-slate-100">
      {value}
    </p>
  </div>
);
