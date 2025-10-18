import { ChevronDown, ChevronRight, Hash } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import logoImage from "@assets/2D9F018A-0943-4164-8A35-03CFA78F9AE1_1760717868263.png";

// Park data with team information
const parks = [
  {
    id: "acacia-park-avengers",
    name: "Acacia Park Avengers",
    shortName: "Acacia Park",
    color: "#2a5434", // Forest green
    memberCount: 47,
  },
  {
    id: "discovery-park-defenders",
    name: "Discovery Park Defenders",
    shortName: "Discovery Park",
    color: "#1e40af", // Royal blue
    memberCount: 52,
  },
  {
    id: "veterans-park-vipers",
    name: "Veterans Park Vipers",
    shortName: "Veterans Park",
    color: "#581c87", // Purple
    memberCount: 38,
  },
  {
    id: "sunset-park-scorpions",
    name: "Sunset Park Scorpions",
    shortName: "Sunset Park",
    color: "#991b1b", // Crimson red
    memberCount: 45,
  },
];

// Channels for each park
const channels = [
  { id: "home", name: "home", icon: Hash },
  { id: "announcements", name: "announcements", icon: Hash },
  { id: "roster", name: "roster", icon: Hash },
  { id: "game-day", name: "game-day", icon: Hash },
  { id: "media", name: "media", icon: Hash },
  { id: "trades", name: "trades", icon: Hash },
  { id: "governance", name: "governance", icon: Hash },
  { id: "support", name: "support", icon: Hash },
];

interface AppSidebarProps {
  selectedPark: string | null;
  onParkSelect: (parkId: string) => void;
}

export function AppSidebar({ selectedPark, onParkSelect }: AppSidebarProps) {
  const [expandedParks, setExpandedParks] = useState<Set<string>>(
    new Set([selectedPark || parks[0].id])
  );

  const toggleParkExpansion = (parkId: string) => {
    const newExpanded = new Set(expandedParks);
    if (newExpanded.has(parkId)) {
      newExpanded.delete(parkId);
    } else {
      newExpanded.add(parkId);
    }
    setExpandedParks(newExpanded);
  };

  return (
    <Sidebar className="border-r border-primary/10">
      <SidebarHeader className="p-3 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <img 
            src={logoImage} 
            alt="Legends of the Park" 
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm text-primary">LOTP</span>
            <span className="text-xs text-muted-foreground">DEFEND WHAT'S LOCAL</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        {/* Navigation */}
        <SidebarGroup className="border-b border-primary/10">
          <SidebarGroupContent className="px-2 py-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-xs font-medium text-foreground hover-elevate"
                  onClick={() => {}}
                  data-testid="nav-home"
                >
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-xs font-medium text-foreground hover-elevate"
                  onClick={() => {}}
                  data-testid="nav-parks"
                >
                  Parks
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-xs font-medium text-foreground hover-elevate"
                  onClick={() => {}}
                  data-testid="nav-schedule"
                >
                  Schedule
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-xs font-medium text-foreground hover-elevate"
                  onClick={() => {}}
                  data-testid="nav-membership"
                >
                  Membership
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-xs font-medium text-foreground hover-elevate"
                  onClick={() => {}}
                  data-testid="nav-sponsors"
                >
                  Sponsors
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Parks Categories */}
        <SidebarGroup>
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Parks (4 Teams)
            </h3>
          </div>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {parks.map((park) => (
                <div key={park.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        toggleParkExpansion(park.id);
                        onParkSelect(park.id);
                      }}
                      className="text-sm font-medium hover-elevate active-elevate-2 px-2 py-1.5"
                      style={{
                        backgroundColor: selectedPark === park.id ? `${park.color}20` : 'transparent',
                        borderLeft: selectedPark === park.id ? `3px solid ${park.color}` : '3px solid transparent',
                      }}
                      data-testid={`park-link-${park.id}`}
                      aria-label={`${park.name} - ${park.memberCount} members`}
                      aria-expanded={expandedParks.has(park.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          {expandedParks.has(park.id) ? (
                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          )}
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: park.color }}
                          />
                          <span className="text-xs">{park.shortName}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {park.memberCount}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Channels (Discord-style) */}
                  {expandedParks.has(park.id) && (
                    <div className="ml-6 mb-2">
                      {channels.map((channel) => (
                        <SidebarMenuItem key={channel.id}>
                          <SidebarMenuButton
                            className="text-xs text-muted-foreground hover:text-foreground py-0.5 px-2 hover-elevate"
                            onClick={() => {}}
                            data-testid={`channel-${park.id}-${channel.id}`}
                          >
                            <Hash className="h-3 w-3 mr-1.5" />
                            {channel.name}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-primary/10 p-3">
        <div className="flex flex-col gap-1">
          <button 
            className="text-xs text-muted-foreground hover:text-foreground text-left hover-elevate p-1"
            onClick={() => {}}
            data-testid="footer-help"
          >
            Help / FAQ
          </button>
          <button 
            className="text-xs text-muted-foreground hover:text-foreground text-left hover-elevate p-1"
            onClick={() => {}}
            data-testid="footer-contact"
          >
            Contact
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}