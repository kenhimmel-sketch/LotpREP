import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import { Button } from "@/components/ui/button";
import { Trophy, Shield, Heart } from "lucide-react";
import avengersImage from "@assets/3cc22e32-7360-464e-b72b-bddb6a57bd14_1760688198596.png";
import scorpionsImage from "@assets/86495af0-7d4a-4c62-a14d-d8f763c7cbe8_1760688171920.png";

export default function Home() {
  const scrollToTeams = () => {
    document.getElementById("teams")?.scrollIntoView({ behavior: "smooth" });
  };

  const teams = [
    {
      name: "Acacia Park Avengers",
      park: "Acacia Park",
      image: avengersImage,
      colors: "Forest Green & Cream",
      slug: "acacia-park-avengers",
    },
    {
      name: "Discovery Park Defenders",
      park: "Discovery Park",
      image: avengersImage,
      colors: "Royal Blue & Silver",
      slug: "discovery-park-defenders",
    },
    {
      name: "Sunset Park Scorpions",
      park: "Sunset Park",
      image: scorpionsImage,
      colors: "Crimson Red & Black",
      slug: "sunset-park-scorpions",
    },
    {
      name: "Veterans Park Vipers",
      park: "Veterans Memorial Park",
      image: avengersImage,
      colors: "Navy Blue & Gold",
      slug: "veterans-park-vipers",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="Legends of the Park"
        subtitle="Nevada's Premier Flag Football League"
        backgroundImage={scorpionsImage}
        ctaText="Become a Legend"
        ctaAction={scrollToTeams}
      />

      <section className="py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
              Become a Legend
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4" />
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="flex flex-col items-center p-4 bg-background/50 rounded-md">
                <Shield className="w-10 h-10 text-primary mb-2" />
                <h3 className="font-montserrat font-semibold text-foreground mb-1">Defend What's Local</h3>
                <p className="text-sm text-muted-foreground">Represent your park with pride</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-background/50 rounded-md">
                <Trophy className="w-10 h-10 text-primary mb-2" />
                <h3 className="font-montserrat font-semibold text-foreground mb-1">Win for Your Park</h3>
                <p className="text-sm text-muted-foreground">Grand championship cash prize</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-background/50 rounded-md">
                <Heart className="w-10 h-10 text-primary mb-2" />
                <h3 className="font-montserrat font-semibold text-foreground mb-1">Build Community</h3>
                <p className="text-sm text-muted-foreground">Prize goes to your park</p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-4">
              When you sign up to represent a park, you're not just joining a team—you're signing up for the opportunity to <span className="text-primary font-semibold">Defend What's Local</span>. Compete at the highest level and win your favorite park a grand championship cash prize to be used specifically for that park and the community around it.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Whether you're a seasoned athlete or new to the game, our league welcomes players of all skill levels. Join us in honoring our local parks while competing for something that truly matters to your community.
            </p>
            <Button className="font-montserrat" size="lg" onClick={scrollToTeams} data-testid="button-join-cta">
              Join a Team Today
            </Button>
          </div>
        </div>
      </section>

      <section id="teams" className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 text-center">
            Our Teams
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-3" />
          <p className="text-center text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Each team represents and honors a local Nevada park, building community pride through athletic excellence and sportsmanship.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <TeamCard key={team.slug} {...team} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
