import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Member {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
  parkSlug: string;
}

interface BubbleWallProps {
  parkImage: string;
  parkName: string;
  members: Member[];
  maxMembers?: number;
  emblemSize?: number;
  containerSize?: number;
}

// Generate deterministic positions for avatars in concentric rings
function generateAvatarPositions(
  count: number,
  emblemRadius: number,
  containerRadius: number,
  seed: string = ""
): Array<{ x: number; y: number; scale: number }> {
  const positions: Array<{ x: number; y: number; scale: number }> = [];
  
  // Safe zone around emblem (no overlap)
  const safeZoneRadius = emblemRadius + 25;
  
  // Define concentric rings
  const rings = [
    { radius: safeZoneRadius + 30, capacity: 8, scale: 1 },
    { radius: safeZoneRadius + 70, capacity: 12, scale: 0.95 },
    { radius: safeZoneRadius + 110, capacity: 16, scale: 0.9 },
    { radius: safeZoneRadius + 150, capacity: 20, scale: 0.85 },
  ];
  
  let membersPlaced = 0;
  
  // Use a deterministic hash based on the seed for starting angle
  const seedHash = seed.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  const baseAngle = ((seedHash % 360) * Math.PI) / 180;
  
  for (let ringIndex = 0; ringIndex < rings.length; ringIndex++) {
    const ring = rings[ringIndex];
    if (membersPlaced >= count) break;
    
    const membersInRing = Math.min(ring.capacity, count - membersPlaced);
    const angleStep = (2 * Math.PI) / membersInRing;
    // Deterministic starting angle based on ring index and seed
    const startAngle = baseAngle + (ringIndex * 0.5);
    
    for (let i = 0; i < membersInRing; i++) {
      if (membersPlaced >= count) break;
      
      const angle = startAngle + i * angleStep;
      const x = Math.cos(angle) * ring.radius;
      const y = Math.sin(angle) * ring.radius;
      
      positions.push({ x, y, scale: ring.scale });
      membersPlaced++;
    }
  }
  
  return positions;
}

export function BubbleWall({
  parkImage,
  parkName,
  members,
  maxMembers = 30,
  emblemSize = 160,
  containerSize = 400,
}: BubbleWallProps) {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  
  // Limit members to maxMembers
  const displayMembers = members.slice(0, maxMembers);
  const positions = generateAvatarPositions(
    displayMembers.length,
    emblemSize / 2,
    containerSize / 2,
    parkName // Use park name as seed for deterministic positioning
  );
  
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
      }}
      data-testid="bubble-wall"
      aria-label={`${parkName} community members visualization`}
      role="img"
    >
      {/* Central Park Emblem - highest z-index to ensure no overlap */}
      <div
        className="absolute rounded-full border-4 border-primary shadow-xl overflow-hidden bg-background"
        style={{
          width: `${emblemSize}px`,
          height: `${emblemSize}px`,
          zIndex: 100,
        }}
        data-testid="park-emblem"
      >
        <img
          src={parkImage}
          alt={parkName}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Avatar Ring */}
      {displayMembers.map((member, index) => {
        const position = positions[index];
        if (!position) return null;
        
        const avatarSize = 40 * position.scale;
        
        return (
          <Tooltip key={member.id}>
            <TooltipTrigger asChild>
              <div
                className="absolute rounded-full border-2 border-primary/50 bg-background overflow-hidden cursor-pointer transition-all hover:scale-110 hover:border-primary hover:z-50"
                style={{
                  width: `${avatarSize}px`,
                  height: `${avatarSize}px`,
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${avatarSize / 2}px`,
                  marginTop: `-${avatarSize / 2}px`,
                  zIndex: hoveredMember === member.id ? 50 : 10,
                }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                data-testid={`avatar-${member.id}`}
              >
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-semibold text-xs">
                    {member.initials}
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-medium">{member.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
      
      {/* Member count indicator if there are more members */}
      {members.length > maxMembers && (
        <div className="absolute bottom-0 right-0 bg-background border border-primary/50 rounded-full px-2 py-1 text-xs font-medium text-foreground">
          +{members.length - maxMembers} more
        </div>
      )}
    </div>
  );
}