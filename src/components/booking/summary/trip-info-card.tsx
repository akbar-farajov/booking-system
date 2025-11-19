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
  <Card className="shadow-xl pt-0 border-2 overflow-hidden hover:shadow-2xl transition-shadow">
    <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <Sparkles className="h-32 w-32" />
      </div>
      <div className="relative flex items-start gap-3">
        <div className="bg-white/20 rounded-lg p-2.5">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="text-2xl mb-1">Booking Summary</CardTitle>
          <CardDescription className="text-primary-foreground/90 text-base">
            Review your travel details before confirming
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-6 space-y-6">
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
        <div className="md:col-span-2 space-y-2 p-4 rounded-lg bg-accent/50 border border-border">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Utensils className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">Board Type</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-lg">{boardTypeName}</p>
            <Badge variant="secondary">{BOARD_TYPE_LABELS[boardType]}</Badge>
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
  <div className="space-y-2 p-4 rounded-lg bg-accent/50 border border-border">
    <div className="flex items-center gap-2 text-muted-foreground mb-1">
      <Icon className="h-4 w-4 text-primary" />
      <p className="text-sm font-medium">{label}</p>
    </div>
    <p className="font-semibold text-lg">{value}</p>
  </div>
);
