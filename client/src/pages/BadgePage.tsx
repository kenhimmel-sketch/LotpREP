import { Shield } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function BadgePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <Shield className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="font-playfair text-4xl font-bold text-primary mb-4">
          Badge Generator
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your digital ID badge will be generated here. Badge generator coming soon!
        </p>
        <Link href="/">
          <Button size="lg" data-testid="button-back-home" asChild>
            <a>Back to Home</a>
          </Button>
        </Link>
      </div>
    </div>
  );
}
