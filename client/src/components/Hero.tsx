import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText?: string;
  ctaAction?: () => void;
  height?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaAction,
  height = "min-h-[80vh]",
}: HeroProps) {
  return (
    <div className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6">
          {title}
        </h1>
        <div className="w-32 h-1 bg-primary mx-auto mb-6" />
        <p className="font-montserrat text-xl sm:text-2xl md:text-3xl text-foreground/90 mb-8">
          {subtitle}
        </p>
        {ctaText && ctaAction && (
          <Button
            onClick={ctaAction}
            className="font-montserrat text-lg px-8 py-6 h-auto"
            data-testid="button-hero-cta"
          >
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  );
}
