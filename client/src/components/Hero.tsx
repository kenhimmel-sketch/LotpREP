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
  const isHomepage = !backgroundImage || backgroundImage === 'solid-black';
  
  return (
    <div className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      {!isHomepage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </>
      )}
      {isHomepage && (
        <div className="absolute inset-0 bg-black" />
      )}
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col justify-between h-full py-8">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 sm:mb-4">
            {title}
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-primary mx-auto mb-3 sm:mb-4" />
          <p className="font-montserrat text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-4 sm:mb-6">
            {subtitle}
          </p>
        </div>
        {ctaText && ctaAction && (
          <div className="flex justify-center items-center flex-1">
            <Button
              onClick={ctaAction}
              size="lg"
              className="font-montserrat"
              data-testid="button-hero-cta"
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
