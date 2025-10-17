import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { ParkStats } from "@shared/schema";

// Import images
import acaciaImage from "@assets/2D9F018A-0943-4164-8A35-03CFA78F9AE1_1760717868263.png";
import logoImage from "@assets/2D9F018A-0943-4164-8A35-03CFA78F9AE1_1760717868263.png";

interface ParkSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPark: (parkId: string) => void;
}

const parks = [
  {
    id: "acacia-park-avengers",
    name: "Acacia Park Avengers",
    shortName: "Acacia Park",
    description: "Acacia Park stands as a verdant oasis featuring mature acacia trees.",
    color: "#2a5434",
    bgClass: "bg-green-900",
    image: acaciaImage,
  },
  {
    id: "discovery-park-defenders", 
    name: "Discovery Park Defenders",
    shortName: "Discovery Park",
    description: "Discovery Park offers expansive green spaces and modern facilities.",
    color: "#1e40af",
    bgClass: "bg-blue-900",
    image: logoImage,
  },
  {
    id: "veterans-park-vipers",
    name: "Veterans Park Vipers", 
    shortName: "Veterans Park",
    description: "Veterans Park honors our heroes with championship-caliber fields.",
    color: "#581c87",
    bgClass: "bg-purple-900",
    image: logoImage,
  },
  {
    id: "sunset-park-scorpions",
    name: "Sunset Park Scorpions",
    shortName: "Sunset Park",
    description: "Sunset Park provides stunning views and competitive spirit.",
    color: "#991b1b",
    bgClass: "bg-red-900",
    image: logoImage,
  },
];

export function ParkSelectionModal({ open, onOpenChange, onSelectPark }: ParkSelectionModalProps) {
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null);

  const handleSelectPark = (parkId: string) => {
    setSelectedParkId(parkId);
    onSelectPark(parkId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Choose Your Park</DialogTitle>
          <DialogDescription>
            Select a park to represent and compete for your local community
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {parks.map((park) => {
            const { data: stats, isLoading } = useQuery<ParkStats>({
              queryKey: [`/api/parks/${park.id}/stats`],
              enabled: open, // Only fetch when modal is open
            });

            return (
              <div
                key={park.id}
                className="relative group cursor-pointer border-2 border-primary/20 rounded-md overflow-hidden hover-elevate active-elevate-2 transition-all"
                onClick={() => handleSelectPark(park.id)}
                data-testid={`park-card-${park.id}`}
              >
                {/* Park Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={park.image}
                    alt={park.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                {/* Park Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {park.name}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className="mt-1 text-xs"
                        style={{ borderColor: park.color, color: park.color }}
                      >
                        {park.shortName}
                      </Badge>
                    </div>
                    <Shield 
                      className="w-6 h-6 opacity-50"
                      style={{ color: park.color }}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {park.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {isLoading ? (
                        <Skeleton className="h-3 w-8" />
                      ) : (
                        <span>{stats?.totalMembers || "0"} members</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {isLoading ? (
                        <Skeleton className="h-3 w-8" />
                      ) : (
                        <span>{stats?.totalWins || "0"} wins</span>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-3 font-semibold"
                    size="sm"
                    data-testid={`button-select-${park.id}`}
                  >
                    Select Park
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}