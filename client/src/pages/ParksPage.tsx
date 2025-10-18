import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Trophy, ArrowRight } from "lucide-react";
import type { Park } from "@shared/schema";
import logoImage from "@assets/2D9F018A-0943-4164-8A35-03CFA78F9AE1_1760717868263.png";

export default function ParksPage() {
  const { data: parks, isLoading } = useQuery<Park[]>({
    queryKey: ["/api/parks"],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="LOTP" 
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-primary">LOTP</span>
                <span className="text-xs text-muted-foreground">DEFEND WHAT'S LOCAL</span>
              </div>
            </a>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="sm" data-testid="button-header-signup" asChild>
              <a>Sign Up</a>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-primary/10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Meet the Founding Parks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four legendary teams, each representing their local park and community. 
            Choose your park and become part of the legend.
          </p>
        </div>
      </section>

      {/* Parks Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-8 animate-pulse">
                  <div className="h-8 bg-muted rounded mb-4" />
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {parks?.map((park) => (
                <Link key={park.id} href={`/park/${park.parkCode}`}>
                  <a data-testid={`park-card-${park.parkCode}`}>
                    <Card className="p-8 hover-elevate active-elevate-2 transition-all duration-200 h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div 
                          className="w-12 h-12 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: park.colorPrimary || '#D4AF37' }}
                        />
                        <div className="flex-1">
                          <h2 className="font-serif text-2xl font-bold mb-1">
                            {park.name}
                          </h2>
                          {park.city && (
                            <p className="text-sm text-muted-foreground">{park.city}, Nevada</p>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {park.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Members</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            <span>Stats</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="gap-1"
                        >
                          View Park
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-primary/10 bg-card/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready to Join?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sign up today and choose which park you want to represent. 
            Build neighborhood pride and compete for your community.
          </p>
          <Link href="/signup">
            <Button 
              size="lg" 
              className="font-montserrat font-semibold px-10"
              data-testid="button-signup-cta"
              asChild
            >
              <a>Sign Up Now</a>
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
