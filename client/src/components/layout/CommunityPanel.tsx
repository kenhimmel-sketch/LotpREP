import { AnimatePresence, motion } from "framer-motion";
import { useCommunityPanel } from "@/contexts/CommunityPanelContext";
import { communityChannels, parkDirectory, type ParkSlug } from "@/data/parks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const panelVariants = {
  hidden: { x: -340, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const categories: { slug: ParkSlug; label: string }[] = [
  { slug: "acacia-park-avengers", label: "Acacia Park" },
  { slug: "discovery-park-defenders", label: "Discovery Park" },
  { slug: "veterans-memorial-park-vampires", label: "Veterans Memorial" },
  { slug: "sunset-park-scorpions", label: "Sunset Park" },
];

export function CommunityPanel() {
  const { isOpen, setActiveChannel, activeChannel, setOpen } = useCommunityPanel();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.aside
          key="community-panel"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={panelVariants}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="relative z-30 flex w-[300px] flex-col border-r border-border/40 bg-sidebar panel-blur"
        >
          <div className="border-b border-border/40 px-5 pb-4 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-foreground/70">Community</p>
                <p className="font-semibold text-primary">Parks &amp; channels</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-primary"
              >
                Close
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-6 px-4 py-5">
              {categories.map((category) => {
                const park = parkDirectory[category.slug];
                const channels = communityChannels[category.slug];
                return (
                  <div key={category.slug} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-foreground/60">
                          {category.label}
                        </p>
                        <p className="text-xs text-foreground/70">{park.motto}</p>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-black text-xs uppercase tracking-[0.2em] text-primary/80">
                        {park.shortName.slice(0, 1)}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {channels.map((channel) => {
                        const isActive =
                          activeChannel?.park === category.slug &&
                          activeChannel.channel === channel.id;
                        return (
                          <button
                            key={channel.id}
                            onClick={() =>
                              setActiveChannel({
                                park: category.slug,
                                channel: channel.id,
                              })
                            }
                            className={cn(
                              "group flex w-full items-start gap-3 rounded-lg border border-transparent bg-black/30 px-3 py-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5",
                              isActive && "border-primary bg-primary/10 text-primary",
                            )}
                          >
                            <span className="mt-1 h-2 w-2 rounded-full bg-primary/60" aria-hidden />
                            <span>
                              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
                                {channel.name}
                                {isActive && (
                                  <span className="rounded-full border border-primary/40 bg-primary/20 px-2 py-0.5 text-[0.55rem] font-semibold text-primary">
                                    Live
                                  </span>
                                )}
                              </span>
                              <span className="mt-1 block text-xs text-foreground/65">
                                {channel.description}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

export default CommunityPanel;
