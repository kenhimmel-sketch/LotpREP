import { Button } from "@/components/ui/button";
import { Shield, Trophy, Users } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/2D9F018A-0943-4164-8A35-03CFA78F9AE1_1760717868263.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LotpLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="LOTP" 
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col -space-y-0.5">
              <span className="font-bold text-sm text-primary">LOTP</span>
              <span className="text-xs text-muted-foreground">DEFEND WHAT'S LOCAL</span>
            </div>
          </div>
          <Link href="/signup">
            <Button variant="outline" size="sm" data-testid="button-header-signup" asChild>
              <a>Sign Up</a>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <img 
            src={logoImage} 
            alt="Legends of the Park" 
            className="w-32 h-32 mx-auto mb-4 object-contain"
          />
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4">
            Legends of the Park
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-primary" />
            <p className="font-montserrat text-2xl sm:text-3xl font-semibold text-primary">
              Defend What's Local
            </p>
            <div className="h-px w-16 bg-primary" />
          </div>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Nevada's premier flag football league where teams represent local parks. 
            Join your community, compete at the highest level, and win real improvements for your neighborhood.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="font-montserrat font-semibold text-base px-8"
                  data-testid="button-our-mission"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Our Mission
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif">Our Mission</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed pt-4">
                    Legends of the Park brings local communities together through flag football. 
                    Each park has its own team—people sign up to represent their park, build 
                    neighborhood pride, and turn wins into real improvements for the community. 
                    Join your park, defend what's local, and become a legend.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Link href="/signup">
              <Button 
                size="lg" 
                variant="outline"
                className="font-montserrat font-semibold text-base px-8"
                data-testid="button-choose-your-park"
                asChild
              >
                <a>
                  <Trophy className="mr-2 h-5 w-5" />
                  Choose Your Park
                </a>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-2">1. Join Your Park</h3>
              <p className="text-muted-foreground">
                Sign up and choose the park you want to represent. Whether it's your neighborhood park or your favorite local spot.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-2">2. Compete & Win</h3>
              <p className="text-muted-foreground">
                Play flag football at the highest level. Every game matters as you compete for the grand championship.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-2">3. Build Community</h3>
              <p className="text-muted-foreground">
                Championship prize goes directly to your park for improvements that benefit the entire community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Parks CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            Ready to Explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Discover the founding parks, meet the teams, and see the players and supporters who make this league legendary.
          </p>
          <Link href="/parks">
            <Button 
              size="lg" 
              className="font-montserrat font-semibold text-base px-10"
              data-testid="button-explore-parks"
              asChild
            >
              <a>Explore Parks & Teams</a>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Legends of the Park. Defend What's Local.</p>
        </div>
      </footer>
    </div>
  );
}
