import acaciaCrest from "@/assets/acacia-crest.svg";
import discoveryCrest from "@/assets/discovery-crest.svg";
import veteransCrest from "@/assets/veterans-crest.svg";
import sunsetCrest from "@/assets/sunset-crest.svg";

export type ParkSlug =
  | "acacia-park-avengers"
  | "discovery-park-defenders"
  | "veterans-memorial-park-vampires"
  | "sunset-park-scorpions";

export type ParkChannel = {
  id: string;
  name: string;
  description: string;
  headline: string;
  body: string;
};

export type ParkDefinition = {
  slug: ParkSlug;
  name: string;
  shortName: string;
  location: string;
  foundation: string;
  motto: string;
  headline: string;
  subheadline: string;
  story: string;
  identity: string;
  crest: string;
  heroStatBlock: { label: string; value: string }[];
  legendsHighlights: string[];
  bubbleCallout: string;
  channels: ParkChannel[];
};

const PARK_CHANNELS: Record<ParkSlug, ParkChannel[]> = {
  "acacia-park-avengers": [
    {
      id: "home",
      name: "#home",
      description: "Mission control for Acacia's playbook and game-day strategy.",
      headline: "Avengers assemble",
      body: "Acacia Park thrives on precision and relentless tempo. Drop your introductions and let the squad know how you're defending the grove this season.",
    },
    {
      id: "announcements",
      name: "#announcements",
      description: "League verified updates and community directives.",
      headline: "Command briefs",
      body: "Roster reveals, scrimmage alerts, and weekly strategy clinics roll through here first. Stay sharp—championship windows don't reopen.",
    },
    {
      id: "media",
      name: "#media-room",
      description: "Clips, cut-ups, and behind-the-scenes footage.",
      headline: "Signal boost",
      body: "Upload film, golden-hour portrait shots, and micro-docs about the park heroes powering local impact.",
    },
  ],
  "discovery-park-defenders": [
    {
      id: "home",
      name: "#home",
      description: "Strategic hub for Discovery's tacticians.",
      headline: "Study the field",
      body: "Defenders break down coverages, share scouting intel, and map the next championship charge right here.",
    },
    {
      id: "announcements",
      name: "#announcements",
      description: "Official dispatches from captains and coordinators.",
      headline: "Flash reports",
      body: "Live drafts, practice pods, and analytics drops post fast. Set alerts so you never miss the spark.",
    },
    {
      id: "media",
      name: "#media-lab",
      description: "Data visualisations, film study, and highlight reels.",
      headline: "Decode the legend",
      body: "Upload breakdowns, release-slate teasers, and interactive playbooks to guide new recruits.",
    },
  ],
  "veterans-memorial-park-vampires": [
    {
      id: "home",
      name: "#home",
      description: "Night-shift tactics and late-game scenarios.",
      headline: "Nightfall brief",
      body: "Vampires protect legacy under the lights. State your role, drop film notes, and stay loyal to the midnight regiment.",
    },
    {
      id: "announcements",
      name: "#announcements",
      description: "Ceremonial honors and mission alerts.",
      headline: "Honor roll",
      body: "Championship countdowns, community service ops, and fundraising missions spark here first.",
    },
    {
      id: "media",
      name: "#vault",
      description: "Game tape, lore, and archival content.",
      headline: "Vault access",
      body: "Drop hero portraits, slow-motion interceptions, and lore that fuels the veteran mythology.",
    },
  ],
  "sunset-park-scorpions": [
    {
      id: "home",
      name: "#home",
      description: "Sunset war-room for desert-born sting operations.",
      headline: "Sting ops online",
      body: "New recruits huddle up here. Post your introductions, confirm field times, and prep the next ambush.",
    },
    {
      id: "announcements",
      name: "#announcements",
      description: "Heat advisories, roster moves, and scoreboard pings.",
      headline: "Desert bulletins",
      body: "Practice heat indexes, charity blitzes, and title-chase updates all route through this channel first.",
    },
    {
      id: "media",
      name: "#media-den",
      description: "Game stills, mic'd-up audio, and hype edits.",
      headline: "Strike reel",
      body: "Upload behind-the-scenes footage and neighborhood stories that prove Sunset still stings the hardest.",
    },
  ],
};

const baseParks: ParkDefinition[] = [
  {
    slug: "acacia-park-avengers",
    name: "Acacia Park Avengers",
    shortName: "Acacia Park",
    location: "Henderson, Nevada",
    foundation: "Founded 2024",
    motto: "Tight routes. Tighter community.",
    headline: "Acacia orchestrates the gold standard for precision football.",
    subheadline: "Their grove rallies mentors, coaches, and families who believe execution sparks impact.",
    story:
      "Acacia Park runs on speed, discipline, and a shared oath to reinvest every rep into the neighborhood. Alumni coach youth clinics, Saturday volunteers restore park amenities, and every film review ends with action items for the community.",
    identity:
      "The Avengers wear midnight black accented by solid gold typography. Their crest carries a radiant tree that symbolizes deep Henderson roots and relentless growth.",
    crest: acaciaCrest,
    heroStatBlock: [
      { label: "Signature weapon", value: "Tempo offense with tactical audibles" },
      { label: "Community drive", value: "Scholarship pods + park restoration" },
      { label: "Finishing move", value: "Two-minute drill engineered by local alumni" },
    ],
    legendsHighlights: [
      "12 youth mentorship pairings launched from the 2023 pilot season.",
      "Tournament proceeds retrofitted the park's lighting rig for safer night play.",
      "Film study lab offers open sessions for local high school QBs.",
    ],
    bubbleCallout: "Acacia recruits guardians who turn precision into neighborhood momentum.",
    channels: PARK_CHANNELS["acacia-park-avengers"],
  },
  {
    slug: "discovery-park-defenders",
    name: "Discovery Park Defenders",
    shortName: "Discovery Park",
    location: "Green Valley, Nevada",
    foundation: "Founded 2024",
    motto: "Map the coverage. Lead the change.",
    headline: "Discovery's defensive minds track every angle and fight for local classrooms.",
    subheadline: "Analysts, coders, and educators fuse data with purpose for a tech-forward park revolution.",
    story:
      "Discovery Park's roster features engineers by day and tacticians by night. They host analytics bootcamps for teens, operate a device drive that re-equips community centers, and re-invest prize funds into STEM labs for the neighborhood.",
    identity:
      "A golden compass etched into a matte-black badge signals how Discovery navigates every snap and steers resources home.",
    crest: discoveryCrest,
    heroStatBlock: [
      { label: "Signature weapon", value: "Adaptive defensive rotations" },
      { label: "Community drive", value: "STEM lab rebuilds + mentorship sprints" },
      { label: "Finishing move", value: "Data-fueled takeaways in crunch time" },
    ],
    legendsHighlights: [
      "Donated 40 rebuilt laptops to neighborhood learning hubs.",
      "Weekly tactical breakdown stream hits 1,200 local viewers.",
      "Hosts weekend code labs that partner with league mentors.",
    ],
    bubbleCallout: "Defenders scout champions who turn analytics into impact.",
    channels: PARK_CHANNELS["discovery-park-defenders"],
  },
  {
    slug: "veterans-memorial-park-vampires",
    name: "Veterans Memorial Park Vampires",
    shortName: "Veterans Memorial",
    location: "Boulder City, Nevada",
    foundation: "Founded 2024",
    motto: "Honor the legacy. Own the night.",
    headline: "Veterans rally under the lights to fund local remembrance and resilience programs.",
    subheadline: "Every drive channels respect for service members and invests in their families.",
    story:
      "The Vampires host twilight clinics for service families, sponsor memorial scholarships, and coordinate blood drives with the local VA hospital. Their culture thrives on discipline, reverence, and late-game grit.",
    identity:
      "A winged crest with lunar highlights honors sacrifice while celebrating a relentless nighttime squad.",
    crest: veteransCrest,
    heroStatBlock: [
      { label: "Signature weapon", value: "Prime-time defensive stands" },
      { label: "Community drive", value: "Memorial scholarships + VA partnerships" },
      { label: "Finishing move", value: "Two-score swings engineered after sundown" },
    ],
    legendsHighlights: [
      "Annual remembrance run finances support packages for veteran families.",
      "Hosts joint practices with service academies to mentor recruits.",
      "Community vigils and late-night film study keep the park united.",
    ],
    bubbleCallout: "Veterans recruit protectors who fight for remembrance and relief.",
    channels: PARK_CHANNELS["veterans-memorial-park-vampires"],
  },
  {
    slug: "sunset-park-scorpions",
    name: "Sunset Park Scorpions",
    shortName: "Sunset Park",
    location: "Las Vegas, Nevada",
    foundation: "Founded 2024",
    motto: "Strike fast. Guard the desert.",
    headline: "Sunset's desert athletes weaponize speed to fund neighborhood resilience.",
    subheadline: "Heat-ready conditioning sessions and park cleanups feed a relentless identity.",
    story:
      "The Scorpions run sunrise conditioning, host hydration drives, and invest prize pools into cooling stations for elders around Sunset Park. Their sideline is a proving ground for mutual aid and game-breaking acceleration.",
    identity:
      "An angular scorpion silhouette blazes over a golden horizon—the mark of a park that never stops stinging.",
    crest: sunsetCrest,
    heroStatBlock: [
      { label: "Signature weapon", value: "No-huddle strike packages" },
      { label: "Community drive", value: "Cooling stations + emergency relief" },
      { label: "Finishing move", value: "Desert storm blitzes in crunch time" },
    ],
    legendsHighlights: [
      "Built hydration hubs for seniors during last summer's heat dome.",
      "Weekly sand dune sessions available to all park athletes.",
      "Local film crew documents every game to amplify the cause.",
    ],
    bubbleCallout: "Sunset seeks athletes who turn raw speed into desert protection.",
    channels: PARK_CHANNELS["sunset-park-scorpions"],
  },
];

export const parks = baseParks;

export const parkDirectory = baseParks.reduce<Record<ParkSlug, ParkDefinition>>(
  (acc, park) => {
    acc[park.slug] = park;
    return acc;
  },
  {} as Record<ParkSlug, ParkDefinition>,
);

export const communityChannels = PARK_CHANNELS;
