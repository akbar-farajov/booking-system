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
  <Card className="shadow-2xl animate-in fade-in-50 slide-in-from-bottom-4 duration-500 border-2 border-indigo-200 dark:border-indigo-800 hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/50 hover:scale-[1.01] transition-all bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
    <CardHeader className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-3 shadow-lg">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl text-indigo-900 dark:text-indigo-100">
            {title}
          </CardTitle>
          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            {description}
          </CardDescription>
        </div>
      </div>
      {infoMessage && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 p-4 rounded-xl flex items-start gap-3 text-sm">
          <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
          <p className="text-slate-700 dark:text-slate-300">{infoMessage}</p>
        </div>
      )}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
