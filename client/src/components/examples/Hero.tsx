import Hero from "../Hero";

export default function HeroExample() {
  return (
    <Hero
      title="Legends of the Park"
      subtitle="Nevada's Premier Flag Football League"
      backgroundImage="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1600"
      ctaText="Join a Team"
      ctaAction={() => console.log("CTA clicked")}
    />
  );
}
