import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { parks } from "@/data/parks";

export default function ParksIndexPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Season 1 Lineup</p>
        <h1 className="text-3xl font-semibold text-foreground">Choose a park. Defend its legacy.</h1>
        <p className="max-w-2xl text-sm text-foreground/70">
          Every founding park stands behind a unique identity and a real plan for prize-pool reinvestment. Explore the four crews competing for the right to direct championship funds to their neighborhoods.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {parks.map((park, index) => (
          <motion.article
            key={park.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-4 rounded-3xl border border-border/40 bg-black/50 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-primary/70">{park.shortName}</p>
                <h2 className="text-xl font-semibold text-foreground">{park.name}</h2>
                <p className="text-xs uppercase tracking-[0.24em] text-foreground/50">{park.location}</p>
              </div>
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-border/40 bg-black/60">
                <img src={park.crest} alt={`${park.name} crest`} className="h-12 w-12" />
              </span>
            </div>
            <p className="text-sm text-foreground/70">{park.story}</p>
            <div className="grid gap-3 md:grid-cols-3">
              {park.heroStatBlock.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/30 bg-black/40 p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-foreground/50">{stat.label}</p>
                  <p className="mt-2 text-xs text-foreground/70">{stat.value}</p>
                </div>
              ))}
            </div>
            <Link
              to={`/parks/${park.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-colors hover:bg-primary/20"
            >
              Enter {park.shortName}
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
