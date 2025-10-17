import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Shield className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="font-serif text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="font-montserrat text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="font-montserrat" data-testid="button-home">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
