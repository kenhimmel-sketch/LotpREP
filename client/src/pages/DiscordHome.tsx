import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ParkHub } from "@/components/ParkHub";
import { RightRail } from "@/components/RightRail";
import { ParkSelectionModal } from "@/components/ParkSelectionModal";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import logoImage from "@assets/2D9F018A-0943-4164-8A35-03CFA78F9AE1_1760717868263.png";

export default function DiscordHome() {
  const [selectedPark, setSelectedPark] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [parkModalOpen, setParkModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const handleParkSelect = (parkId: string) => {
    setSelectedPark(parkId);
  };
  
  const handleChoosePark = () => {
    setParkModalOpen(true);
  };
  
  const handleJoinPark = async () => {
    if (!isAuthenticated) {
      // Trigger login flow
      window.location.href = "/api/login";
      return;
    }
    
    if (!selectedPark) {
      toast({
        title: "No Park Selected",
        description: "Please select a park first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await fetch(`/api/parks/${selectedPark}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to join park");
      }
      
      const profile = await response.json();
      toast({
        title: "Successfully Joined!",
        description: `You are now a member of ${selectedPark.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      });
      
      // Invalidate cache to refresh member count and stats
      queryClient.invalidateQueries({ queryKey: [`/api/parks/${selectedPark}/stats`] });
      queryClient.invalidateQueries({ queryKey: ["park-members", selectedPark] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to join park",
        variant: "destructive",
      });
    }
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  
  // Custom sidebar width for Discord-style layout
  const sidebarStyle = {
    "--sidebar-width": "17rem", // ~272px for Discord-like width
    "--sidebar-width-icon": "4rem",
  };
  
  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties} defaultOpen={true}>
      <div className="flex h-screen w-full bg-background">
        {/* Left Rail - Sidebar */}
        <AppSidebar 
          selectedPark={selectedPark} 
          onParkSelect={handleParkSelect} 
        />
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header Bar (Mobile + Desktop) */}
          <header className="flex items-center justify-between px-4 h-12 border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-3">
              <SidebarTrigger data-testid="button-sidebar-toggle">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              
              {/* Mobile Logo */}
              <div className="flex items-center gap-2 lg:hidden">
                <img 
                  src={logoImage} 
                  alt="LOTP" 
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold text-sm text-primary">LOTP</span>
              </div>
              
              {/* Desktop Channel Indicator */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-muted-foreground">#</span>
                <span className="text-sm font-medium">announcements</span>
              </div>
            </div>
            
            {/* Right side controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8"
                data-testid="theme-toggle"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </header>
          
          {/* Center + Right Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Center Feed */}
            <ParkHub 
              parkId={selectedPark}
              onChoosePark={handleChoosePark}
            />
            
            {/* Right Rail - Hidden on mobile, visible on desktop */}
            <div className="hidden xl:block">
              <RightRail 
                selectedPark={selectedPark}
                onChoosePark={handleChoosePark}
                onJoinPark={handleJoinPark}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile Bottom Navigation (Optional - not implemented per requirements) */}
      </div>
      
      {/* Park Selection Modal */}
      <ParkSelectionModal
        open={parkModalOpen}
        onOpenChange={setParkModalOpen}
        onSelectPark={(parkId) => {
          setSelectedPark(parkId);
          setParkModalOpen(false);
        }}
      />
    </SidebarProvider>
  );
}