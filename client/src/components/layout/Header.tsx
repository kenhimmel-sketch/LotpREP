import { NavLink, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCommunityPanel } from "@/contexts/CommunityPanelContext";
import { useAuth } from "@/features/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/parks", label: "Parks" },
  { path: "/rules", label: "Rules" },
  { path: "/dashboard", label: "Dashboard" },
];

export function Header() {
  const { isOpen, togglePanel, activeChannel } = useCommunityPanel();
  const { user } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-black/70 panel-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-black shadow-sm">
            LOTP
          </span>
          <span className="gold-text text-base md:text-lg">Legends of the Park</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "relative transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-foreground/80",
                )
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  {isActive && (
                    <motion.span
                      layoutId="nav-highlight"
                      className="block h-0.5 w-8 rounded-full bg-primary"
                    />
                  )}
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {activeChannel ? (
            <span className="hidden items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-primary/90 md:flex">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
              {activeChannel.channel.replace("-", " ")}
            </span>
          ) : null}
          <Button
            variant="secondary"
            size="sm"
            onClick={togglePanel}
            className="border border-border/60 bg-secondary/60 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/80"
          >
            {isOpen ? "Close Panel" : "Community"}
          </Button>
          <Button asChild size="sm" className="hidden rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black shadow-gold md:inline-flex">
            <Link to={user ? "/dashboard" : "/auth"}>
              {user ? "My Park" : "Join the Movement"}
            </Link>
          </Button>
        </div>
      </div>
      <div className="md:hidden">
        <nav className="flex items-center gap-2 overflow-x-auto px-4 pb-3 text-xs uppercase tracking-[0.2em] text-foreground/70">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "rounded-full border border-transparent px-3 py-1 transition-colors",
                location.pathname === item.path ? "border-primary text-primary" : "hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
