import { Shield, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-serif text-2xl font-bold text-primary">
                Legends of the Park
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Nevada's premier flag football league where teams represent and honor local parks. Join us in building community through athletic excellence.
            </p>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-foreground mb-3">Quick Links</h3>
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
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold text-foreground mb-3">Connect</h3>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-md bg-primary/10 hover-elevate active-elevate-2 flex items-center justify-center" data-testid="button-facebook">
                <Facebook className="w-4 h-4 text-primary" />
              </button>
              <button className="w-9 h-9 rounded-md bg-primary/10 hover-elevate active-elevate-2 flex items-center justify-center" data-testid="button-twitter">
                <Twitter className="w-4 h-4 text-primary" />
              </button>
              <button className="w-9 h-9 rounded-md bg-primary/10 hover-elevate active-elevate-2 flex items-center justify-center" data-testid="button-instagram">
                <Instagram className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-primary/20">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Legends of the Park. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
