import { Card } from "@/components/ui/card";
import { MapPin, Heart, Trophy } from "lucide-react";

interface ParkInfoProps {
  parkName: string;
  parkDescription: string;
  parkImage: string;
  parkHistory: string;
  parkFeatures: string[];
  communityImpact: string;
}

export default function ParkInfo({
  parkName,
  parkDescription,
  parkImage,
  parkHistory,
  parkFeatures,
  communityImpact,
}: ParkInfoProps) {
  return (
    <div className="py-6 sm:py-8 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 text-center">
          About {parkName}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6" />

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="order-2 md:order-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-montserrat text-xl sm:text-2xl font-semibold text-foreground">
                  Park Heritage
                </h3>
              </div>
              <p className="text-sm sm:text-base text-foreground/80 mb-3 leading-relaxed">
                {parkDescription}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {parkHistory}
              </p>
            </div>

            <Card className="p-4 bg-background/50 border-primary/20">
              <h4 className="font-montserrat font-semibold text-foreground mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                Park Features
              </h4>
              <ul className="space-y-2">
                {parkFeatures.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 rounded-md overflow-hidden border-2 border-primary/30 order-1 md:order-2">
            <img
              src={parkImage}
              alt={parkName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Card className="p-4 sm:p-6 bg-primary/5 border-primary/30">
          <div className="flex items-start gap-3 mb-3">
            <Trophy className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-montserrat text-lg sm:text-xl font-semibold text-foreground mb-2">
                Why This Park Matters
              </h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                {communityImpact}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
