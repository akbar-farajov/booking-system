import { Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  infoMessage?: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  icon: Icon,
  title,
  description,
  infoMessage,
  children,
}) => (
  <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-500 border-2 hover:shadow-xl transition-shadow">
    <CardHeader className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-primary rounded-lg p-2.5">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </div>
      </div>
      {infoMessage && (
        <div className="bg-accent/50 p-3 rounded-lg flex items-start gap-2 text-sm">
          <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <p className="text-muted-foreground">{infoMessage}</p>
        </div>
      )}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
