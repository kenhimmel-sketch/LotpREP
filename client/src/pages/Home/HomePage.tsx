import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { parks } from "@/data/parks";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Choose your park",
    description:
      "Declare the park you defend. Every roster spot represents a real neighborhood waiting for a title run.",
  },
  {
    title: "Compete all season",
    description:
      "Battle under Nevada lights in a season built on pace, precision, and park pride.",
  },
  {
    title: "Only champions direct the prize",
    description:
      "Win the league, and your park alone directs the prize pool into local upgrades and community programs.",
  },
];

const heroHighlights = [
  {
    label: "Four founding parks",
    value: "Season 1",
  },
  {
    label: "Prize funds",
    value: "Champion decides",
  },
  {
    label: "Tone",
    value: "Defend What's Local",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-black via-black to-[#1a1410] p-10 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-3xl space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/60">Nevada Flag Football League</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="gold-text block text-5xl">Defend What’s Local.</span>
            <span className="mt-3 block text-foreground/70">Where winning turns into real change.</span>
          </h1>
          <p className="max-w-xl text-base text-foreground/70">
            Legends of the Park (LOTP) is Nevada’s adult flag-football league built on park loyalty. Players pledge
            allegiance to a park, compete all season, and fight for the right to direct every prize dollar back into their neighborhood.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black shadow-gold">
              <Link to="/auth">Join the Movement</Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full border border-border/60 bg-secondary/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em]">
              <Link to="/parks">Explore Parks</Link>
            </Button>
            <Button asChild variant="ghost" className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              <Link to="/rules">How It Works</Link>
            </Button>
          </div>
          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {heroHighlights.map((highlight) => (
              <div key={highlight.label} className="rounded-xl border border-border/40 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-foreground/55">{highlight.label}</p>
                <p className="mt-2 text-lg font-semibold text-primary">{highlight.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="pointer-events-none absolute -right-10 bottom-0 hidden h-80 w-80 rounded-full border border-primary/40 bg-primary/10 blur-3xl md:block"
        />
      </section>

      <section className="grid gap-10 rounded-3xl border border-border/40 bg-black/60 p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Only the champion directs the prize pool</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">How the league works</h2>
          <p className="mt-3 max-w-2xl text-sm text-foreground/70">
            Pick your park. Compete under lights. The league champion—and only the champion—decides how the prize pool gets reinvested into their park and surrounding community. No trophy? No funds.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-border/30 bg-gradient-to-br from-black/40 via-black/20 to-primary/10 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-primary/70">{step.title}</p>
              <p className="mt-3 text-sm text-foreground/70">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-border/40 bg-black/50 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Season 1 founding parks</p>
            <h2 className="text-2xl font-semibold text-foreground">Your home turf decides the future</h2>
          </div>
          <Link to="/parks" className="text-xs uppercase tracking-[0.24em] text-primary hover:text-primary/80">
            View all parks →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {parks.map((park) => (
            <Link
              to={`/parks/${park.slug}`}
              key={park.slug}
              className="group flex flex-col gap-4 rounded-2xl border border-border/30 bg-black/40 p-6 transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-primary/70">{park.shortName}</p>
                  <h3 className="text-lg font-semibold text-foreground">{park.name}</h3>
                </div>
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border/40 bg-black/60">
                  <img src={park.crest} alt={`${park.name} crest`} className="h-10 w-10" />
                </span>
              </div>
              <p className="text-sm text-foreground/70">{park.headline}</p>
              <p className="text-xs uppercase tracking-[0.24em] text-foreground/50">{park.motto}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-border/40 bg-black/45 p-8 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Community layer</p>
          <h2 className="text-2xl font-semibold text-foreground">Optional Discord-style panel</h2>
          <p className="text-sm text-foreground/70">
            Slide open the side panel to jump into park categories and channels. Share film, coordinate meet-ups, and rally your neighborhood in the same interface you scout opponents.
          </p>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li>• Toggle anywhere in the app – state persists.</li>
            <li>• Channels for #home, #announcements, #media per park.</li>
            <li>• Designed for future expansion with bots, tasks, and voice.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-black/50 via-black/20 to-primary/10 p-6">
          <p className="text-xs uppercase tracking-[0.26em] text-primary/70">Non-negotiable rule</p>
          <p className="mt-3 text-lg font-semibold text-primary">Only the League Champion earns the right to direct the prize pool.</p>
          <p className="mt-2 text-sm text-foreground/65">
            Every other team protects momentum and prepares for the next run. No championship? No community payout.
          </p>
        </div>
      </section>
    </div>
  );
}
