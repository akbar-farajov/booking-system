import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-accent/20 to-background p-4">
      <Card className="max-w-md w-full shadow-2xl animate-in fade-in-50 zoom-in-95 duration-500">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 animate-ping opacity-20">
              <div className="w-24 h-24 rounded-full bg-primary mx-auto"></div>
            </div>
            <div className="relative bg-gradient-primary rounded-full p-6 inline-block">
              <MapPin className="h-12 w-12 text-primary-foreground animate-bounce" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-7xl font-bold text-primary animate-in slide-in-from-bottom-4 duration-700">
              404
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Lost in Transit</h2>
            </div>
          </div>

          <p className="text-muted-foreground animate-in slide-in-from-bottom-3 duration-700 delay-100">
            Looks like this destination doesn't exist. Let's get you back on
            track!
          </p>

          <div className="pt-4 space-y-3">
            <Button
              onClick={() => navigate("/")}
              className="w-full gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Button>

            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Go Back
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Lost route:{" "}
            <code className="bg-muted px-2 py-1 rounded text-xs">
              {location.pathname}
            </code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
