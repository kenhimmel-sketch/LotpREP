import { Shield, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <span className="font-serif text-lg sm:text-2xl font-bold text-primary">
                Legends of the Park
              </span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-md">
              Nevada's premier flag football league where teams represent and honor local parks. Join us in building community through athletic excellence.
            </p>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-sm sm:text-base text-foreground mb-2 sm:mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/teams/acacia-park-avengers" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-avengers">
                  Avengers
                </Link>
              </li>
              <li>
                <Link href="/teams/discovery-park-defenders" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-defenders">
                  Defenders
                </Link>
              </li>
              <li>
                <Link href="/teams/veterans-park-vipers" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-vipers">
                  Vipers
                </Link>
              </li>
              <li>
                <Link href="/teams/sunset-park-scorpions" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-scorpions">
                  Scorpions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-sm sm:text-base text-foreground mb-2 sm:mb-3">Connect</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-primary/10 hover-elevate active-elevate-2 flex items-center justify-center" data-testid="button-facebook">
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              </button>
              <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-primary/10 hover-elevate active-elevate-2 flex items-center justify-center" data-testid="button-twitter">
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              </button>
              <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-primary/10 hover-elevate active-elevate-2 flex items-center justify-center" data-testid="button-instagram">
                <Instagram className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary/20">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Legends of the Park. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
