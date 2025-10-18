import { useMemo, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { parkDirectory, type ParkSlug } from "@/data/parks";
import { Button } from "@/components/ui/button";
import { useCommunityPanel } from "@/contexts/CommunityPanelContext";

const placeholderMembers = Array.from({ length: 30 });

export default function ParkDetailPage() {
  const { slug } = useParams<{ slug: ParkSlug }>();
  const { setActiveChannel, setOpen } = useCommunityPanel();

  if (!slug || !parkDirectory[slug]) {
    return (
      <div className="space-y-4 rounded-3xl border border-border/40 bg-black/60 p-10 text-center">
        <h1 className="text-2xl font-semibold text-primary">Park not found</h1>
        <p className="text-sm text-foreground/70">
          The park you are looking for is not part of the current season. Return to the park index to choose your crew.
        </p>
        <Button asChild className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black">
          <Link to="/parks">Back to Parks</Link>
        </Button>
      </div>
    );
  }

  const park = parkDirectory[slug];

  const orbitAngles = useMemo(() => {
    return placeholderMembers.map((_, index) => (index / placeholderMembers.length) * 360);
  }, []);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-black/60 p-8 shadow-lg">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/70">{park.shortName}</p>
            <h1 className="text-3xl font-semibold text-foreground">{park.name}</h1>
            <p className="text-sm text-foreground/70">{park.identity}</p>
            <p className="text-xs uppercase tracking-[0.24em] text-foreground/50">{park.location} • {park.foundation}</p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild className="rounded-full bg-primary px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black">
                <Link to="/auth">Choose this park</Link>
              </Button>
              <Button
                variant="secondary"
                className="rounded-full border border-border/60 bg-secondary/60 px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em]"
                onClick={() => {
                  setOpen(true);
                  setActiveChannel({ park: park.slug, channel: "home" });
                }}
              >
                Open channels
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/40 bg-black/70 shadow-gold">
              <img src={park.crest} alt={`${park.name} crest`} className="h-16 w-16" />
            </span>
            <p className="text-xs uppercase tracking-[0.24em] text-foreground/60">{park.motto}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {park.heroStatBlock.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border/30 bg-black/40 p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-foreground/50">{stat.label}</p>
              <p className="mt-2 text-sm text-foreground/75">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-border/40 bg-black/55 p-8 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Park story</p>
          <p className="text-lg font-semibold text-foreground">{park.headline}</p>
          <p className="text-sm text-foreground/70">{park.subheadline}</p>
          <p className="text-sm text-foreground/70">{park.story}</p>
          <div className="grid gap-3">
            {park.legendsHighlights.map((highlight) => (
              <div key={highlight} className="rounded-xl border border-border/30 bg-black/40 p-4">
                <p className="text-sm text-foreground/70">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Legends of {park.shortName}</p>
          <div
            className="relative mx-auto aspect-square w-full max-w-[24rem]"
            style={{ "--orbit": "clamp(6rem, 32vw, 9.5rem)" } as CSSProperties}
          >
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-gradient-to-br from-black/60 via-black/30 to-primary/10 shadow-gold">
              <img
                src={park.crest}
                alt={`${park.name} crest art`}
                className="h-full w-full rounded-full object-contain p-8"
              />
            </div>
            {orbitAngles.map((angle, index) => (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `rotate(${angle}deg) translateX(var(--orbit)) rotate(-${angle}deg)` }}
                whileHover={{ scale: 1.08 }}
              >
                <div className="relative h-full w-full rounded-full border border-primary/30 bg-gradient-to-br from-black/80 via-black/60 to-primary/15">
                  <span className="absolute left-1/2 top-[38%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35" />
                  <span className="absolute left-1/2 top-[68%] h-6 w-10 -translate-x-1/2 rounded-full bg-primary/25" />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-foreground/65">{park.bubbleCallout}</p>
        </div>
      </section>
    </div>
  );
}
