import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, Building2, ChevronRight } from "lucide-react";
import { BubbleWall } from "./BubbleWall";
import { useParkMembers } from "@/hooks/useParkMembers";

// Import park images
import acaciaImage from "@assets/Photoroom_20251003_212917_1760715594814.png";
import logoImage from "@assets/2D9F018A-0943-4164-8A35-03CFA78F9AE1_1760717868263.png";

interface ParkHubProps {
  parkId: string | null;
  onChoosePark: () => void;
}

const parkData: Record<string, { name: string; image: string; color: string }> = {
  "acacia-park-avengers": {
    name: "Acacia Park Avengers",
    image: acaciaImage,
    color: "#2a5434",
  },
  "discovery-park-defenders": {
    name: "Discovery Park Defenders",
    image: logoImage, // Using logo as fallback
    color: "#1e40af",
  },
  "veterans-park-vipers": {
    name: "Veterans Park Vipers",
    image: logoImage, // Using logo as fallback
    color: "#581c87",
  },
  "sunset-park-scorpions": {
    name: "Sunset Park Scorpions",
    image: logoImage, // Using logo as fallback
    color: "#991b1b",
  },
};

export function ParkHub({ parkId, onChoosePark }: ParkHubProps) {
  const { members, isLoading } = useParkMembers(parkId);
  const park = parkId ? parkData[parkId] : null;
  
  if (!parkId || !park) {
    // Default state when no park is selected
    return (
      <div className="flex-1 bg-background p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Welcome to Legends of the Park</h2>
            <p className="text-muted-foreground mb-6">Select a park from the sidebar to explore its community</p>
            <Button onClick={onChoosePark} size="lg" className="font-semibold">
              Choose Your Park
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 bg-background overflow-y-auto">
      {/* Hero Section */}
      <div 
        className="relative h-48 md:h-64 bg-gradient-to-b from-background to-card"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${park.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {park.name}
          </h1>
          <p className="text-sm text-primary/80 uppercase tracking-wider">
            Defend What's Local
          </p>
          <p className="text-base text-foreground mt-3 max-w-2xl">
            Where winning turns into real change.
          </p>
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={onChoosePark}
              size="default"
              className="font-semibold"
              data-testid="hero-choose-park"
            >
              Choose Your Park
            </Button>
            <Button 
              variant="outline"
              size="default"
              className="font-semibold"
              data-testid="hero-learn-more"
            >
              Learn How It Works
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content Cards */}
      <div className="p-4 md:p-6 space-y-4 max-w-5xl mx-auto">
        {/* Bubble Wall Card */}
        <Card className="border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Community Members
            </CardTitle>
            <CardDescription>
              {members.length} defenders protecting {park.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            {!isLoading && (
              <BubbleWall
                parkImage={park.image}
                parkName={park.name}
                members={members}
                emblemSize={120}
                containerSize={300}
              />
            )}
          </CardContent>
        </Card>
        
        {/* Choose Your Park Card */}
        <Card className="border-primary/20 hover-elevate cursor-pointer" onClick={onChoosePark}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Choose Your Park
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Join your local park team and compete for championship prizes that benefit your community.
            </p>
          </CardContent>
        </Card>
        
        {/* Latest Schedule Card */}
        <Card className="border-primary/20 hover-elevate cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Latest Schedule
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View upcoming games, playoffs, and championship events.
            </p>
            <Button variant="ghost" className="p-0 h-auto text-primary mt-2" data-testid="view-schedule">
              View schedule →
            </Button>
          </CardContent>
        </Card>
        
        {/* Become a Member Card */}
        <Card className="border-primary/20 hover-elevate cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Become a Member
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Join the movement. Your membership directly supports your park's championship fund.
            </p>
            <Button variant="ghost" className="p-0 h-auto text-primary mt-2" data-testid="see-membership">
              See membership →
            </Button>
          </CardContent>
        </Card>
        
        {/* Sponsors Strip */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Our Sponsors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-primary/10 rounded-md flex items-center justify-center"
                >
                  <span className="text-xs text-muted-foreground">Sponsor {i}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}