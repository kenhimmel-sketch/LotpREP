import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CommunityPanel } from "@/components/layout/CommunityPanel";
import { ChannelView } from "@/components/layout/ChannelView";
import { useCommunityPanel } from "@/contexts/CommunityPanelContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { activeChannel } = useCommunityPanel();
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="relative flex flex-1">
        <CommunityPanel />
        <div className="relative flex-1 px-4 py-8 md:px-10">
          <AnimatePresence mode="wait">
            {activeChannel ? (
              <ChannelView key={`${activeChannel.park}-${activeChannel.channel}`} />
            ) : (
              <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mx-auto flex w-full max-w-6xl flex-col gap-12"
              >
                {children}
              </motion.main>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
