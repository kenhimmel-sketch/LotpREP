import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Park } from "@shared/schema";

export default function ChooseParkPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: parks, isLoading } = useQuery<Park[]>({
    queryKey: ["/api/parks"],
  });

  const chooseParkMutation = useMutation({
    mutationFn: async (parkCode: string) => {
      const email = localStorage.getItem("lotpSignupEmail");
      if (!email) {
        throw new Error("No signup email found. Please sign up first.");
      }
      const response = await apiRequest("POST", "/api/choose-park", { parkCode, email });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Park selected!",
        description: "Generating your digital ID badge...",
      });
      setTimeout(() => {
        setLocation("/badge");
      }, 1000);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to select park",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleParkSelection = (parkCode: string) => {
    chooseParkMutation.mutate(parkCode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading parks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-sm text-primary">LOTP</span>
              <span className="text-xs text-muted-foreground">DEFEND WHAT'S LOCAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-4">
              Choose Your Park
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the park you want to represent. This is your team, your community, your legacy.
            </p>
          </div>

          {/* Parks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {parks?.map((park) => (
              <Card
                key={park.parkCode}
                className="hover-elevate overflow-hidden"
                data-testid={`card-park-${park.parkCode}`}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-playfair text-2xl font-bold text-primary mb-1">
                          {park.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{park.city || "Las Vegas, NV"}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-border"
                          style={{ backgroundColor: park.colorPrimary || "#D4AF37" }}
                        />
                        {park.colorSecondary && park.colorSecondary !== park.colorPrimary && (
                          <div
                            className="w-6 h-6 rounded-full border-2 border-border"
                            style={{ backgroundColor: park.colorSecondary }}
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {park.description || park.tagline || "Defend what's local."}
                    </p>
                  </div>

                  <Button
                    className="w-full font-montserrat font-semibold"
                    size="lg"
                    disabled={chooseParkMutation.isPending}
                    onClick={() => handleParkSelection(park.parkCode)}
                    data-testid={`button-choose-${park.parkCode}`}
                    style={{
                      backgroundColor: park.colorPrimary || "#D4AF37",
                      color: "#000000",
                    }}
                  >
                    {chooseParkMutation.isPending ? "Selecting..." : `Choose ${park.name.split(" ")[0]}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Your park choice represents your community. You'll receive a digital ID badge once you make your selection.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
