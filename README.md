# Legends of the Park (LOTP)

Legends of the Park is a black-and-gold flag-football league experience where every player defends a Nevada park. The entire product merges a premium marketing site, park-focused storytelling, and an optional Discord-style navigation panel so communities can rally around their crews. Winning matters: only the league champion chooses where the prize pool lands in their park and the surrounding neighborhood.

## Features

- **Hero marketing site** featuring the core slogan “Defend What’s Local” and the non-negotiable prize pool rule.
- **Parks index and four premium park pages** with custom crests, stories, and responsive “Legends bubble” layouts populated with 30 placeholder avatars.
- **Discord-inspired community panel** with categories for each park, toggleable globally, and channel content that swaps the main view when activated.
- **Auth onboarding** with email or SMS OTP flow (local fallback included) that requires players to choose a park. Supabase integration loads dynamically when credentials are provided.
- **Dashboard** showing the authenticated player’s park allegiance, next steps, and developer notes.
- **Responsive, high-contrast black & gold design** with zero green accents per branding guidelines.

## Technology

- Vite + React 18 + TypeScript
- Tailwind CSS for styling tokens and utility classes
- Framer Motion for panel and page transitions
- Custom React Router v6-compatible shim built on top of the existing `wouter` router (offline-friendly) with the usual `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`, and `<NavLink>` APIs.
- Express server for SPA fallback (already configured for Replit with `process.env.PORT` and `0.0.0.0` binding)

## Running locally

```bash
npm install  # uses the existing lockfile; no new packages are required
npm run dev
```

Vite is configured to bind to `0.0.0.0` for Replit compatibility. The Express server automatically falls back to `index.html` for unknown routes in production builds.

### Production build

```bash
npm run build
npm start
```

The build command outputs the static client bundle to `dist/public` and bundles the Express entry point to `dist/index.js`.

## Supabase configuration

Authentication is wired to load Supabase dynamically from the CDN when credentials are present. Add credentials to `.env` (see `.env.example`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```

- In environments without Supabase credentials, auth gracefully falls back to a local simulated session stored in `localStorage`.
- Once credentials are supplied, email magic links and SMS OTP requests are sent through Supabase. Park selections persist to user metadata.
- The dashboard surfaces a developer note reminding you to configure Supabase before production use.

## Router shim notes

The environment where this build was created does not allow fetching new npm packages. To honor the requirement for React Router v6 patterns, the project exposes a shim at `client/src/vendor/react-router-dom.tsx` that mirrors the core API (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useLocation`, `useParams`). It is powered by `wouter`, which was already present in the workspace. Vite aliases `react-router-dom` to this shim so the rest of the app can use familiar imports without modification.

## Project structure

```
client/src
├── assets/                # Custom black & gold park crests
├── components/
│   ├── layout/            # Header, footer, community panel, channel view
│   └── ui/                # Shadcn-inspired design system primitives
├── contexts/              # Community panel context
├── data/                  # Park definitions and channel copy
├── features/auth/         # Auth context and Supabase/local logic
├── layouts/               # Root layout wrapping routes
├── pages/                 # Home, Parks, Park detail, Rules, Auth, Dashboard, NotFound
├── vendor/                # React Router shim
└── lib/                   # Query client, Supabase loader, utilities
```

## Community panel

- Toggleable from the global header.
- Categories for Acacia Park, Discovery Park, Veterans Memorial Park, and Sunset Park with starter channels (#home, #announcements, #media).
- The panel remembers its open state via `localStorage` and animates with Framer Motion.
- Selecting a channel swaps the main content area to a curated community view with highlights and instructions.

## Legends bubble

Each park detail page features a responsive circular layout:

- Central bubble showcases the custom park crest on a golden gradient.
- 30 placeholder avatar orbits generated with CSS gradients and hover scaling.
- Layout scales responsively via CSS variables; avatars never overlap the central crest.

## Replit deployment

- The Express server already binds to `0.0.0.0` and respects `process.env.PORT`.
- Use `npm run dev` for development mode (`vite --host 0.0.0.0`).
- Use `npm run build && npm start` for production preview.

## TODOs / Future enhancements

- Wire live Supabase tables for persistent park rosters and channel content when credentials are available.
- Add channel management UI so admins can create additional channels beyond the seeded set.
- Expand the dashboard with scheduling, stats, and prize transparency uploads once data sources are ready.
- Introduce code-splitting for page-level bundles if the payload needs to drop under 500 kB.
