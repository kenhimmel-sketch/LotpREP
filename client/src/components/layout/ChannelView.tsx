import { motion } from "framer-motion";
import { useCommunityPanel } from "@/contexts/CommunityPanelContext";
import { communityChannels, parkDirectory } from "@/data/parks";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChannelView() {
  const { activeChannel, setActiveChannel } = useCommunityPanel();

  if (!activeChannel) {
    return null;
  }

  const park = parkDirectory[activeChannel.park];
  const channel = communityChannels[activeChannel.park].find(
    (item) => item.id === activeChannel.channel,
  );

  if (!channel) {
    return null;
  }

  return (
    <motion.section
      key={`${park.slug}-${channel.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative mx-auto flex h-full w-full max-w-5xl flex-col rounded-2xl border border-border/60 bg-card/80 px-6 py-8 shadow-xl backdrop-blur"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-foreground/60">{park.shortName}</p>
          <h1 className="mt-2 text-2xl font-semibold text-primary">{channel.headline}</h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70">{channel.description}</p>
        </div>
        <Button
          variant="secondary"
          className="rounded-full border border-border/60 bg-secondary/60 text-xs font-semibold uppercase tracking-[0.24em]"
          onClick={() => setActiveChannel(null)}
        >
          Return to site
        </Button>
      </div>
      <ScrollArea className="mt-6 h-full">
        <div className="space-y-6 pb-8">
          <article className="rounded-2xl border border-border/40 bg-black/40 p-6 shadow-inner">
            <header className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-xs uppercase tracking-[0.2em] text-primary">
                {channel.name.replace("#", "").slice(0, 2).toUpperCase()}
              </span>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">
                  {channel.name}
                </h2>
                <p className="text-xs text-foreground/60">{park.motto}</p>
              </div>
            </header>
            <p className="text-sm leading-relaxed text-foreground/80">{channel.body}</p>
          </article>
          <section className="grid gap-4 rounded-2xl border border-border/40 bg-black/40 p-6">
            <h3 className="text-xs uppercase tracking-[0.28em] text-foreground/60">
              Upcoming drops
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-border/30 bg-gradient-to-br from-black/40 via-black/20 to-primary/10 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-primary/80">Field Brief</p>
                <p className="mt-2 text-sm text-foreground/75">
                  Tactical update queue opens Friday at 6PM PT. Post your scouting intel with clips or playbook links.
                </p>
              </div>
              <div className="rounded-xl border border-border/30 bg-gradient-to-br from-black/40 via-black/20 to-primary/10 p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-primary/80">Community Pulse</p>
                <p className="mt-2 text-sm text-foreground/75">
                  Share the community initiative your park is pushing this week so we can amplify it across channels.
                </p>
              </div>
            </div>
          </section>
        </div>
      </ScrollArea>
    </motion.section>
  );
}

export default ChannelView;
