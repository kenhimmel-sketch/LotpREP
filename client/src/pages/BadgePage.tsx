import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Shield, Download } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateBadge, type BadgeData } from "@/lib/badgeGenerator";

export default function BadgePage() {
  const { toast } = useToast();
  const [badgeImage, setBadgeImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Get user email from localStorage
  const email = localStorage.getItem("lotpSignupEmail");

  // Fetch badge data
  const { data: badgeData, isLoading, error } = useQuery({
    queryKey: ["/api/badge", email],
    queryFn: async () => {
      if (!email) throw new Error("No email found");
      const response = await fetch(`/api/badge?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error("Failed to fetch badge");
      return await response.json();
    },
    enabled: !!email,
  });

  // Generate badge image when data is available
  useEffect(() => {
    if (badgeData && !badgeImage && !isGenerating) {
      setIsGenerating(true);
      const generateBadgeImage = async () => {
        try {
          const joinDate = new Date(badgeData.issuedAt);
          const badgeInput: BadgeData = {
            memberName: badgeData.displayName,
            memberId: badgeData.memberId,
            parkCode: badgeData.parkCode,
            parkName: badgeData.badgeData.parkName,
            parkColor: badgeData.badgeData.parkColor,
            role: badgeData.badgeData.role || "Member",
            joinDate: `${String(joinDate.getMonth() + 1).padStart(2, "0")}/${joinDate.getFullYear()}`,
            issuedAt: badgeData.issuedAt,
          };

          const imageDataUrl = await generateBadge(badgeInput);
          setBadgeImage(imageDataUrl);
        } catch (error) {
          console.error("Badge generation error:", error);
          toast({
            title: "Badge generation failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        } finally {
          setIsGenerating(false);
        }
      };

      generateBadgeImage();
    }
  }, [badgeData, badgeImage, isGenerating, toast]);

  const handleDownload = () => {
    if (!badgeImage || !badgeData) return;

    const link = document.createElement("a");
    link.download = `LOTP_${badgeData.memberId}.png`;
    link.href = badgeImage;
    link.click();

    toast({
      title: "Badge downloaded!",
      description: `Your badge has been saved as ${link.download}`,
    });
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Shield className="h-24 w-24 text-destructive mx-auto mb-6" />
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-4">
            No Badge Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Please sign up first to generate your badge.
          </p>
          <Link href="/signup">
            <Button size="lg" data-testid="button-go-signup" asChild>
              <a>Go to Signup</a>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || isGenerating) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Shield className="h-24 w-24 text-primary mx-auto mb-6 animate-pulse" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Generating Your Badge...</h2>
        <p className="text-muted-foreground">Please wait while we create your digital ID.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Shield className="h-24 w-24 text-destructive mx-auto mb-6" />
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-4">
            Error Loading Badge
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <Link href="/choose-park">
            <Button size="lg" data-testid="button-retry" asChild>
              <a>Choose Park Again</a>
            </Button>
          </Link>
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
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-4">
              Your Digital ID Badge
            </h1>
            <p className="text-lg text-muted-foreground">
              Welcome to {badgeData?.badgeData?.parkName}! Here's your official member badge.
            </p>
          </div>

          {/* Badge Display */}
          {badgeImage && (
            <div className="flex flex-col items-center gap-8">
              <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                <img
                  src={badgeImage}
                  alt={`Badge for ${badgeData?.displayName}`}
                  className="w-full max-w-md mx-auto rounded-md"
                  data-testid="img-badge"
                />
              </div>

              {/* Download Button */}
              <Button
                size="lg"
                onClick={handleDownload}
                className="font-montserrat font-semibold px-10"
                data-testid="button-download-badge"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PNG
              </Button>

              {/* Info */}
              <div className="text-center text-sm text-muted-foreground max-w-md">
                <p>
                  Your member ID is <span className="font-mono font-semibold text-foreground">{badgeData?.memberId}</span>.
                  Keep this badge safe and present it at league events.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <Link href="/parks">
                  <Button variant="outline" size="lg" data-testid="button-view-parks" asChild>
                    <a>View All Parks</a>
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="lg" data-testid="button-back-home" asChild>
                    <a>Back to Home</a>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
