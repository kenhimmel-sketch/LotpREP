import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { parkDirectory } from "@/data/parks";

type ParkSlug = keyof typeof parkDirectory;

type ChannelIdentifier = {
  park: ParkSlug;
  channel: string;
};

type CommunityPanelContextValue = {
  isOpen: boolean;
  togglePanel: () => void;
  setOpen: (open: boolean) => void;
  activeChannel: ChannelIdentifier | null;
  setActiveChannel: (channel: ChannelIdentifier | null) => void;
};

const PANEL_STATE_KEY = "lotp-community-panel-open";
const ACTIVE_CHANNEL_KEY = "lotp-active-channel";

const CommunityPanelContext = createContext<CommunityPanelContextValue | undefined>(
  undefined,
);

export function CommunityPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem(PANEL_STATE_KEY);
    return stored ? stored === "true" : false;
  });

  const [activeChannel, setActiveChannelState] = useState<ChannelIdentifier | null>(
    () => {
      if (typeof window === "undefined") return null;
      const stored = window.localStorage.getItem(ACTIVE_CHANNEL_KEY);
      if (!stored) return null;
      try {
        const parsed = JSON.parse(stored) as ChannelIdentifier;
        if (parsed && parsed.park && parsed.channel && parkDirectory[parsed.park]) {
          return parsed;
        }
      } catch (error) {
        console.warn("Failed to parse channel cache", error);
      }
      return null;
    },
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(PANEL_STATE_KEY, String(isOpen));
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!activeChannel) {
      window.localStorage.removeItem(ACTIVE_CHANNEL_KEY);
      return;
    }
    window.localStorage.setItem(ACTIVE_CHANNEL_KEY, JSON.stringify(activeChannel));
  }, [activeChannel]);

  const value = useMemo<CommunityPanelContextValue>(
    () => ({
      isOpen,
      togglePanel: () => setIsOpen((prev) => !prev),
      setOpen: setIsOpen,
      activeChannel,
      setActiveChannel: setActiveChannelState,
    }),
    [isOpen, activeChannel],
  );

  return (
    <CommunityPanelContext.Provider value={value}>
      {children}
    </CommunityPanelContext.Provider>
  );
}

export function useCommunityPanel() {
  const context = useContext(CommunityPanelContext);
  if (!context) {
    throw new Error("useCommunityPanel must be used within a CommunityPanelProvider");
  }
  return context;
}

export type { ChannelIdentifier, ParkSlug };
