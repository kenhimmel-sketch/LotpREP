import { useRoute } from "wouter";
import Hero from "@/components/Hero";
import ParkInfo from "@/components/ParkInfo";
import TeamStats from "@/components/TeamStats";
import SignupForm from "@/components/SignupForm";
import { Card } from "@/components/ui/card";
import avengersPlayerImage from "@assets/image_1760690520098.png";
import defendersPlayerImage from "@assets/image_1760690503486.png";
import scorpionsImage from "@assets/86495af0-7d4a-4c62-a14d-d8f763c7cbe8_1760688171920.png";
import avengersActionImage from "@assets/3cc22e32-7360-464e-b72b-bddb6a57bd14_1760688198596.png";

const teamData = {
  "acacia-park-avengers": {
    name: "Acacia Park Avengers",
    park: "Acacia Park",
    heroImage: avengersPlayerImage,
    parkImage: avengersActionImage,
    parkDescription: "Acacia Park stands as a verdant oasis in the heart of our community, featuring mature acacia trees that provide natural shade and beauty throughout the seasons.",
    parkHistory: "Established in 1985, Acacia Park has been a cornerstone of community gathering for nearly four decades. The park's distinctive acacia trees were planted by founding families and have grown alongside our neighborhood, creating a legacy of natural beauty and community spirit.",
    colors: "Forest Green & Cream",
    stats: { wins: "42", players: "18", championships: "3", winRate: "78%" },
    teamInfo: "The Avengers embody the strength and resilience of the mighty acacia tree. Known for our defensive prowess and team unity, we've built a legacy of excellence on and off the field.",
  },
  "discovery-park-defenders": {
    name: "Discovery Park Defenders",
    park: "Discovery Park",
    heroImage: defendersPlayerImage,
    parkImage: defendersPlayerImage,
    parkDescription: "Discovery Park offers expansive green spaces, modern recreational facilities, and a welcoming environment for families and athletes alike.",
    parkHistory: "Opened in 2005, Discovery Park represents our community's commitment to recreation and wellness. With state-of-the-art facilities and beautiful natural landscapes, it has become a hub for sports and family activities.",
    colors: "Royal Blue & Silver",
    stats: { wins: "38", players: "20", championships: "2", winRate: "71%" },
    teamInfo: "The Defenders are built on a foundation of strategic play and unwavering teamwork. We honor Discovery Park's spirit of exploration by constantly innovating our approach to the game.",
  },
  "sunset-park-scorpions": {
    name: "Sunset Park Scorpions",
    park: "Sunset Park",
    heroImage: scorpionsImage,
    parkImage: scorpionsImage,
    parkDescription: "Sunset Park captivates visitors with stunning evening vistas and vibrant community energy, making it a beloved gathering place for all generations.",
    parkHistory: "Since its dedication in 1992, Sunset Park has been renowned for its breathtaking sunset views and active community programs. The park serves as a symbol of unity and natural beauty in our region.",
    colors: "Crimson Red & Black",
    stats: { wins: "45", players: "19", championships: "4", winRate: "82%" },
    teamInfo: "The Scorpions strike with precision and speed, mirroring the intensity of a Nevada sunset. Our aggressive offensive strategy and fierce competitive spirit make us formidable opponents.",
  },
  "veterans-park-vipers": {
    name: "Veterans Park Vipers",
    park: "Veterans Memorial Park",
    heroImage: avengersActionImage,
    parkImage: avengersActionImage,
    parkDescription: "Veterans Memorial Park stands as a tribute to those who served, featuring memorial monuments, immaculate grounds, and a profound sense of honor and respect.",
    parkHistory: "Dedicated in 1978, Veterans Memorial Park honors the sacrifice and service of our nation's heroes. The park's solemn beauty and patriotic monuments remind us of the values of courage, dedication, and community.",
    colors: "Navy Blue & Gold",
    stats: { wins: "40", players: "17", championships: "3", winRate: "75%" },
    teamInfo: "The Vipers play with honor, discipline, and pride, reflecting the values of Veterans Memorial Park. Our tactical precision and leadership on the field embody the spirit of service and excellence.",
  },
};

export default function TeamPage() {
  const [, params] = useRoute("/teams/:slug");
  const slug = params?.slug || "";
  const team = teamData[slug as keyof typeof teamData];

  if (!team) {
    return <div>Team not found</div>;
  }

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
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
      />

      <section className="py-6 sm:py-8 bg-background">
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

      <TeamStats {...team.stats} />

      <section id="signup" className="py-6 sm:py-8 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SignupForm teamId={slug} teamName={team.name} />
        </div>
      </section>
    </div>
  );
}
