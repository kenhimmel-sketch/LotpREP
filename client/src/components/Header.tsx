import { Link, useLocation } from "wouter";
import { Shield, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ShareCodeDialog from "@/components/ShareCodeDialog";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/teams/acacia-park-avengers", label: "Avengers" },
    { path: "/teams/discovery-park-defenders", label: "Defenders" },
    { path: "/teams/sunset-park-scorpions", label: "Scorpions" },
    { path: "/teams/veterans-park-vipers", label: "Vipers" },
  ];

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  // Placeholder for handleLogin if it were implemented
  const handleLogin = () => {
    console.log("Login button clicked");
    // Typically this would redirect to a login page or trigger a login flow
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold text-primary hidden sm:block">
              Legends of the Park
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`font-montserrat ${
                    location === item.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {!isLoading && isAuthenticated && user && (
              <div className="flex items-center gap-2 ml-2">
                <Avatar className="w-8 h-8" data-testid="avatar-user">
                  <AvatarImage src={user.profileImageUrl || undefined} className="object-cover" />
                  <AvatarFallback>
                    {user.firstName?.[0] || user.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            {!isLoading && isAuthenticated && user && (
              <Avatar className="w-8 h-8" data-testid="avatar-user-mobile">
                <AvatarImage src={user.profileImageUrl || undefined} className="object-cover" />
                <AvatarFallback>
                  {user.firstName?.[0] || user.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary/20">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start font-montserrat ${
                    location === item.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            {!isLoading && isAuthenticated && (
              <Button
                variant="ghost"
                className="w-full justify-start font-montserrat text-foreground mt-2"
                onClick={handleLogout}
                data-testid="button-logout-mobile"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}