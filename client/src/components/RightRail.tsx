import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Target } from "lucide-react";
import { BubbleWall } from "./BubbleWall";
import { useParkMembers } from "@/hooks/useParkMembers";
import { useAuth } from "@/hooks/useAuth";
import logoImage from "@assets/2D9F018A-0943-4164-8A35-03CFA78F9AE1_1760717868263.png";

interface RightRailProps {
  selectedPark: string | null;
  onChoosePark: () => void;
  onJoinPark: () => void;
}

const parkInfo: Record<string, { name: string; image: string }> = {
  "acacia-park-avengers": { name: "Acacia Park", image: logoImage },
  "discovery-park-defenders": { name: "Discovery Park", image: logoImage },
  "veterans-park-vipers": { name: "Veterans Park", image: logoImage },
  "sunset-park-scorpions": { name: "Sunset Park", image: logoImage },
};

export function RightRail({ selectedPark, onChoosePark, onJoinPark }: RightRailProps) {
  const { isAuthenticated, user } = useAuth();
  const { members, totalCount } = useParkMembers(selectedPark);
  const park = selectedPark ? parkInfo[selectedPark] : null;
  
  return (
    <div className="w-72 lg:w-80 border-l border-primary/10 bg-card/50 h-full overflow-y-auto">
      <div className="p-3 space-y-3">
        {/* Become a Legend CTA */}
        <Card className="border-primary/20 bg-background sticky top-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Become a Legend
            </CardTitle>
            {isAuthenticated && user && (
              <Badge variant="outline" className="w-fit text-xs">
                Your Park: Not selected
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Join your local park team and compete for real community impact.
            </p>
            
            {selectedPark && (
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">{totalCount} members</span>
              </div>
            )}
            
            <Button
              onClick={isAuthenticated ? onJoinPark : onChoosePark}
              className="w-full font-semibold"
              data-testid="become-legend-cta"
            >
              {isAuthenticated ? "Join This Park" : "Choose Your Park"}
            </Button>
            
            <div className="pt-2 border-t border-primary/10">
              <p className="text-xs text-muted-foreground flex items-start gap-1">
                <Target className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>Defend what's local. Win real change for your community.</span>
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Bubble Wall Preview */}
        {selectedPark && park && members.length > 0 && (
          <Card className="border-primary/20 bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Community Preview</CardTitle>
              <CardDescription className="text-xs">
                {park.name} defenders
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="scale-75 origin-center">
                <BubbleWall
                  parkImage={park.image}
                  parkName={park.name}
                  members={members.slice(0, 15)} // Show fewer members in preview
                  maxMembers={15}
                  emblemSize={80}
                  containerSize={200}
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Online Now (Optional) */}
        <Card className="border-primary/20 bg-background">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Online Now</span>
              <Badge variant="secondary" className="text-xs">
                {Math.floor(Math.random() * 20) + 5}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Park Leader</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Team Captains (3)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Members</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Analytics Placeholder */}
        <div 
          className="hidden"
          data-analytics-join-click="placeholder"
          data-analytics-park-view="placeholder"
        />
      </div>
    </div>
  );
}