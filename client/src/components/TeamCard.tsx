import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface TeamCardProps {
  name: string;
  park: string;
  image: string;
  colors: string;
  slug: string;
}

export default function TeamCard({ name, park, image, colors, slug }: TeamCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-primary/30 hover-elevate active-elevate-2 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-xl font-bold text-foreground mb-1" data-testid={`text-team-name-${slug}`}>
          {name}
        </h3>
        <p className="font-montserrat text-xs text-muted-foreground mb-1">
          Representing
        </p>
        <p className="font-montserrat text-base text-primary mb-3" data-testid={`text-park-name-${slug}`}>
          {park}
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Team Colors: {colors}
        </p>
        <Link href={`/teams/${slug}`}>
          <Button className="w-full font-montserrat" size="sm" data-testid={`button-view-team-${slug}`}>
            View Team
          </Button>
        </Link>
      </div>
    </Card>
  );
}
