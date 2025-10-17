import Hero from "@/components/Hero";
import TeamCard from "@/components/TeamCard";
import heroImage from "@assets/generated_images/Flag_football_hero_action_shot_57011126.png";
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
      image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800",
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
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800",
      colors: "Navy Blue & Gold",
      slug: "veterans-park-vipers",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="Legends of the Park"
        subtitle="Nevada's Premier Flag Football League"
        backgroundImage={heroImage}
        ctaText="Explore Our Teams"
        ctaAction={scrollToTeams}
      />

      <section id="teams" className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Our Teams
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto">
            Each team represents and honors a local Nevada park, building community pride through athletic excellence and sportsmanship.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.slug} {...team} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Join the Legend
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Legends of the Park is more than just a flag football league—it's a celebration of community, athleticism, and the natural beauty of Nevada's parks. Each team embodies the spirit and heritage of the park they represent, creating a unique bond between sport and place.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're a seasoned athlete or new to the game, our league welcomes players of all skill levels. Join us in honoring our local parks while competing at the highest level of flag football excellence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
