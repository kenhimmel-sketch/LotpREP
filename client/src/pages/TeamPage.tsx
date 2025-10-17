import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import ParkInfo from "@/components/ParkInfo";
import TeamStats from "@/components/TeamStats";
import SignupForm from "@/components/SignupForm";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ParkStats } from "@shared/schema";
import avengersPlayerImage from "@assets/image_1760690520098.png";
import defendersPlayerImage from "@assets/image_1760690503486.png";
import scorpionsImage from "@assets/86495af0-7d4a-4c62-a14d-d8f763c7cbe8_1760688171920.png";
import avengersActionImage from "@assets/3cc22e32-7360-464e-b72b-bddb6a57bd14_1760688198596.png";
import acaciaMascot from "@assets/generated_images/Acacia_tree_football_mascot_befd2de2.png";
import scorpionMascot from "@assets/generated_images/Scorpion_football_mascot_sunset_7fad2211.png";
import viperMascot from "@assets/generated_images/Patriotic_viper_football_mascot_9772b044.png";
import defenderMascot from "@assets/generated_images/Shield_defender_football_mascot_2ca50ff9.png";

const teamData = {
  "acacia-park-avengers": {
    name: "Acacia Park Avengers",
    park: "Acacia Park",
    heroImage: avengersPlayerImage,
    parkImage: avengersActionImage,
    mascotImage: acaciaMascot,
    mascotName: "Ace the Acacia",
    parkDescription: "Acacia Park stands as a verdant oasis in the heart of our community, featuring mature acacia trees that provide natural shade and beauty throughout the seasons.",
    parkHistory: "Established in 1985, Acacia Park has been a cornerstone of community gathering for nearly four decades. The park's distinctive acacia trees were planted by founding families and have grown alongside our neighborhood, creating a legacy of natural beauty and community spirit.",
    parkFeatures: [
      "Historic acacia tree grove",
      "Community picnic areas",
      "Children's playground",
      "Walking trails through shaded paths"
    ],
    communityImpact: "Acacia Park serves as a gathering place for families, hosting annual community festivals and providing a natural retreat for residents. The championship prize would enhance our playground equipment and create new recreational facilities for our growing community.",
    colors: "Forest Green & Cream",
    stats: { wins: "0", players: "0", championships: "0", winRate: "0%" },
    teamInfo: "The Avengers embody the strength and resilience of the mighty acacia tree. We're building a team that will represent our park with pride and compete for resources that will directly benefit our community.",
  },
  "discovery-park-defenders": {
    name: "Discovery Park Defenders",
    park: "Discovery Park",
    heroImage: defendersPlayerImage,
    parkImage: defendersPlayerImage,
    mascotImage: defenderMascot,
    mascotName: "Shield the Defender",
    parkDescription: "Discovery Park offers expansive green spaces, modern recreational facilities, and a welcoming environment for families and athletes alike.",
    parkHistory: "Opened in 2005, Discovery Park represents our community's commitment to recreation and wellness. With state-of-the-art facilities and beautiful natural landscapes, it has become a hub for sports and family activities.",
    parkFeatures: [
      "Multi-use sports fields",
      "Fitness stations and outdoor gym",
      "Nature discovery center",
      "Community event pavilion"
    ],
    communityImpact: "Discovery Park is the heart of youth sports and family recreation in our area. Winning the championship would fund new equipment, expanded programming, and scholarship opportunities for underprivileged youth in our community.",
    colors: "Royal Blue & Silver",
    stats: { wins: "0", players: "0", championships: "0", winRate: "0%" },
    teamInfo: "The Defenders are built on a foundation of strategic play and unwavering teamwork. We honor Discovery Park's spirit of exploration and innovation as we build our roster for the inaugural season.",
  },
  "sunset-park-scorpions": {
    name: "Sunset Park Scorpions",
    park: "Sunset Park",
    heroImage: scorpionsImage,
    parkImage: scorpionsImage,
    mascotImage: scorpionMascot,
    mascotName: "Sting the Scorpion",
    parkDescription: "Sunset Park captivates visitors with stunning evening vistas and vibrant community energy, making it a beloved gathering place for all generations.",
    parkHistory: "Since its dedication in 1992, Sunset Park has been renowned for its breathtaking sunset views and active community programs. The park serves as a symbol of unity and natural beauty in our region.",
    parkFeatures: [
      "Panoramic sunset viewing areas",
      "Open-air amphitheater",
      "Community gardens",
      "Evening yoga and fitness programs"
    ],
    communityImpact: "Sunset Park brings our community together through cultural events, outdoor concerts, and wellness programs. Championship funds would expand our community garden, improve lighting for evening safety, and create a covered gathering space.",
    colors: "Crimson Red & Black",
    stats: { wins: "0", players: "0", championships: "0", winRate: "0%" },
    teamInfo: "The Scorpions represent the vibrant energy and competitive spirit of our sunset community. We're recruiting athletes who will fight for every yard and every dollar that benefits our park.",
  },
  "veterans-park-vipers": {
    name: "Veterans Park Vipers",
    park: "Veterans Memorial Park",
    heroImage: avengersActionImage,
    parkImage: avengersActionImage,
    mascotImage: viperMascot,
    mascotName: "Valor the Viper",
    parkDescription: "Veterans Memorial Park stands as a tribute to those who served, featuring memorial monuments, immaculate grounds, and a profound sense of honor and respect.",
    parkHistory: "Dedicated in 1978, Veterans Memorial Park honors the sacrifice and service of our nation's heroes. The park's solemn beauty and patriotic monuments remind us of the values of courage, dedication, and community.",
    parkFeatures: [
      "Memorial wall honoring local veterans",
      "Ceremony grounds for remembrance events",
      "Peaceful reflection gardens",
      "Flag dedication area"
    ],
    communityImpact: "Veterans Memorial Park preserves the memory of those who served while providing a peaceful space for reflection and community gatherings. Championship funds would restore aging monuments, enhance memorial landscaping, and create educational displays honoring our heroes.",
    colors: "Navy Blue & Gold",
    stats: { wins: "0", players: "0", championships: "0", winRate: "0%" },
    teamInfo: "The Vipers play with honor, discipline, and pride, reflecting the values of Veterans Memorial Park. Our team will compete with the same dedication and commitment shown by those we honor.",
  },
};

export default function TeamPage() {
  const [, params] = useRoute("/teams/:slug");
  const slug = params?.slug || "";
  const team = teamData[slug as keyof typeof teamData];
  
  // Fetch real stats from database
  const { data: parkStats, isLoading: statsLoading } = useQuery<ParkStats>({
    queryKey: [`/api/parks/${slug}/stats`],
    enabled: !!slug,
  });

  if (!team) {
    return <div>Team not found</div>;
  }

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Use real stats if available, otherwise use defaults
  const calculateWinRate = () => {
    if (!parkStats?.totalWins || !parkStats?.totalLosses) return "0%";
    const wins = parseInt(parkStats.totalWins);
    const losses = parseInt(parkStats.totalLosses);
    const total = wins + losses;
    if (total === 0) return "0%";
    return Math.round((wins / total) * 100) + "%";
  };
  
  const stats = {
    wins: parkStats?.totalWins || "0",
    players: parkStats?.totalMembers || "0",
    championships: parkStats?.championships || "0",
    winRate: calculateWinRate()
  };

  return (
    <div className="min-h-screen">
      <Hero
        title={team.name}
        subtitle={`Representing ${team.park}`}
        backgroundImage={team.heroImage}
        ctaText="Join Our Team"
        ctaAction={scrollToSignup}
        height="min-h-[70vh]"
      />

      <ParkInfo
        parkName={team.park}
        parkDescription={team.parkDescription}
        parkImage={team.parkImage}
        parkHistory={team.parkHistory}
        parkFeatures={team.parkFeatures}
        communityImpact={team.communityImpact}
      />

      <section className="py-6 sm:py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
              Meet {team.mascotName}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4" />
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <img
                src={team.mascotImage}
                alt={team.mascotName}
                className="w-full h-full object-contain"
                data-testid="img-mascot"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 text-center">
            About the Team
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6" />

          <Card className="p-4 sm:p-6 border-primary/30 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-3 sm:mb-4">
                {team.teamInfo}
              </p>
              <div className="inline-block px-4 sm:px-6 py-2 bg-primary/10 rounded-md">
                <span className="font-montserrat text-xs sm:text-sm text-muted-foreground">Team Colors:</span>
                <span className="font-montserrat text-base sm:text-lg text-primary ml-2">{team.colors}</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {statsLoading ? (
        <div className="py-6 sm:py-8 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 text-center">
              Team Statistics
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <TeamStats {...stats} />
      )}

      <section id="signup" className="py-6 sm:py-8 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SignupForm teamId={slug} teamName={team.name} />
        </div>
      </section>
    </div>
  );
}
