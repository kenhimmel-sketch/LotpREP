Nice — I’ve prepared copy-paste-ready frontend components, CSS tokens, and a full README.md for Replit. These are tuned to the spec: homepage-first, Discord-inspired theme retained, collapsible sidebar, and a performant bubble avatar gallery for park pages. Paste these into your repo (or drop into Replit) and pass them to the devs.

⸻

A — Design tokens & shared CSS (drop in styles/vars.css)

/* styles/vars.css */
:root{
  --bg: #000000;           /* black */
  --gold: #D4AF37;         /* primary accent (gold) */
  --gold-dark: #A88427;
  --green-accent: #2EB67D; /* subtle green accent */
  --muted: #BDBDBD;
  --card-bg: #0b0b0b;
  --max-width: 1200px;
  --sidebar-width: 280px;
  --avatar-size: 56px;
  --avatar-small: 40px;
  --transition-fast: 160ms;
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
html,body,#__next { height: 100%; }
body{
  margin:0;
  background:var(--bg);
  color: #fff;
  font-family: var(--font-sans);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}


⸻

B — Global layout & Sidebar (React + Next.js example)

Create components/Sidebar.jsx and components/Layout.jsx. These are accessible, keyboard-friendly, and use next/link & useRouter.

// components/Sidebar.jsx
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import clsx from 'clsx';

export default function Sidebar({ parks = [], onClose, open = true }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => setIsOpen(open), [open]);

  return (
    <aside
      className={clsx(styles.sidebar, { [styles.closed]: !isOpen })}
      aria-label="Main navigation"
    >
      <div className={styles.header}>
        <button
          className={styles.collapseBtn}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '◀' : '▶'}
        </button>
        <div className={styles.brand}>
          <div className={styles.logo}>LOTP</div>
          {isOpen && <div className={styles.slogan}>Defend What’s Local</div>}
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/parks"><a className={styles.promoBtn}>Parks & Teams →</a></Link>

        <div className={styles.sectionTitle}>Founding Parks</div>
        <ul className={styles.parkList}>
          {parks.map(p => (
            <li key={p.park_code}>
              <Link href={`/park/${p.park_code}`}>
                <a className={styles.parkLink} onClick={onClose}>
                  <img src={p.icon || '/placeholder-park.png'} alt={`${p.name} icon`} className={styles.parkIcon}/>
                  <span className={styles.parkName}>{p.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <Link href="/signup"><a className={styles.authBtn}>Sign up / Log in</a></Link>
        <Link href="/about"><a className={styles.link}>About</a></Link>
      </div>
    </aside>
  );
}

/* components/Sidebar.module.css */
.sidebar{
  width:var(--sidebar-width);
  min-width:var(--sidebar-width);
  background:var(--card-bg);
  border-right:1px solid rgba(212,175,55,0.06);
  padding:12px;
  display:flex;
  flex-direction:column;
  gap:8px;
  transition:transform var(--transition-fast) ease, width var(--transition-fast);
  color:#fff;
}
.closed{
  width:64px;
  min-width:64px;
}
.header{
  display:flex;
  align-items:center;
  gap:8px;
}
.collapseBtn{
  background:transparent;
  border:none;
  color:var(--gold);
  font-size:16px;
  cursor:pointer;
}
.brand{ display:flex; flex-direction:column; }
.logo{
  font-weight:800;
  color:var(--gold);
  font-size:20px;
}
.slogan{ font-size:12px; color:var(--muted); margin-top:2px; }
.nav{ margin-top:8px; flex:1; overflow:auto; }
.promoBtn{
  display:inline-block;
  background:linear-gradient(90deg,var(--gold),var(--gold-dark));
  color:#000;
  padding:10px 12px;
  border-radius:8px;
  font-weight:700;
  text-decoration:none;
  margin-bottom:12px;
}
.sectionTitle{ font-size:12px; color:var(--muted); margin:8px 0; text-transform:uppercase; }
.parkList{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px; }
.parkLink{
  display:flex; align-items:center; gap:10px; padding:8px; border-radius:8px; text-decoration:none; color:inherit;
}
.parkLink:hover, .parkLink:focus{ background:rgba(255,255,255,0.02); outline: none; }
.parkIcon{ width:36px; height:36px; border-radius:50%; object-fit:cover; }
.parkName{ font-weight:600; font-size:14px; }
.footer{ display:flex; flex-direction:column; gap:6px; padding-top:8px; }
.authBtn{ color:#000; background:var(--gold); padding:8px 10px; border-radius:8px; text-align:center; text-decoration:none; }
.link{ color:var(--muted); font-size:13px; text-decoration:none; }
@media (max-width:800px){
  .sidebar{ position:fixed; left:0; top:0; bottom:0; z-index:60; transform:translateX(0); }
  .closed{ transform:translateX(-100%); }
}

Add a simple Layout wrapper:

// components/Layout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';
import parksData from '../data/parks.json';

export default function Layout({ children }) {
  const [open, setOpen] = useState(true); // default open on desktop
  return (
    <div className={styles.app}>
      <Sidebar parks={parksData} open={open} onClose={() => setOpen(false)} />
      <main className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} aria-label="Toggle sidebar" onClick={() => setOpen(s => !s)}>☰</button>
        </header>
        <div className={styles.container}>{children}</div>
      </main>
    </div>
  );
}

/* components/Layout.module.css */
.app{ display:flex; min-height:100vh; }
.main{ flex:1; display:flex; flex-direction:column; }
.topbar{
  height:56px; display:flex; align-items:center; padding:0 16px; border-bottom:1px solid rgba(255,255,255,0.03);
}
.menuBtn{ background:transparent; color:var(--gold); border:none; font-size:20px; cursor:pointer; }
.container{ padding:20px; max-width:var(--max-width); width:100%; margin:0 auto; }
@media (max-width:800px){
  .app{ flex-direction:column; }
}


⸻

C — Bubble Gallery component (components/BubbleGallery.jsx)

This component uses a canvas-style placement algorithm but renders DOM elements (absolute-positioned). It supports lazy loading of images and falls back to a grid on small screens.

// components/BubbleGallery.jsx
import React, { useMemo, useRef, useEffect, useState } from 'react';
import styles from './BubbleGallery.module.css';
import useIsomorphicLayoutEffect from '../lib/useIsomorphicLayoutEffect';

function getPositions(count, centerX, centerY, radius) {
  const positions = [];
  const ringThreshold = 20;
  if (count <= ringThreshold) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions.push({
        left: centerX + radius * Math.cos(angle),
        top: centerY + radius * Math.sin(angle),
      });
    }
    return positions;
  }
  // two rings
  const outer = Math.ceil(count * 0.65);
  const inner = count - outer;
  for (let i = 0; i < outer; i++) {
    const angle = (i / outer) * Math.PI * 2;
    positions.push({
      left: centerX + radius * Math.cos(angle),
      top: centerY + radius * Math.sin(angle),
    });
  }
  const innerRadius = radius * 0.6;
  for (let i = 0; i < inner; i++) {
    const angle = (i / inner) * Math.PI * 2 + 0.2;
    positions.push({
      left: centerX + innerRadius * Math.cos(angle),
      top: centerY + innerRadius * Math.sin(angle),
    });
  }
  return positions;
}

export default function BubbleGallery({ centerImage, avatars = [], size = 420 }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState({ width: size, height: size });
  const [loaded, setLoaded] = useState({});

  useIsomorphicLayoutEffect(() => {
    function update() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setLayout({ width: rect.width, height: rect.height });
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const positions = useMemo(() => {
    const cx = layout.width / 2;
    const cy = layout.height / 2;
    const radius = Math.min(cx, cy) - 70; // margin for avatars
    return getPositions(avatars.length, cx, cy, Math.max(radius, 60));
  }, [avatars.length, layout]);

  // Lazy load avatars using IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const imgs = containerRef.current.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(ent => {
          if (ent.isIntersecting) {
            const img = ent.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            io.unobserve(img);
          }
        });
      }, { root: containerRef.current, threshold: 0.1 });
      imgs.forEach(img => io.observe(img));
      return () => io.disconnect();
    } else {
      imgs.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }, [avatars]);

  // fallback grid on small screens
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

  return (
    <div className={styles.wrapper}>
      <div className={styles.canvas} ref={containerRef} style={{ height: size }}>
        <div className={styles.center}>
          <img src={centerImage} alt="Park" className={styles.centerImg}/>
        </div>

        {isMobile ? (
          <div className={styles.grid}>
            {avatars.map((a, i) => (
              <div key={i} className={styles.avatarCell}>
                <img
                  src={i < 12 ? a.url : undefined}
                  data-src={i < 12 ? undefined : a.url}
                  alt=""
                  className={styles.avatar}
                />
              </div>
            ))}
          </div>
        ) : (
          avatars.map((a, i) => {
            const pos = positions[i] || { left: layout.width/2, top: layout.height/2 };
            const left = pos.left;
            const top = pos.top;
            const style = { left: `${left}px`, top: `${top}px`, transform: 'translate(-50%,-50%)' };
            return (
              <div key={i} className={styles.avatarWrap} style={style}>
                <img
                  data-src={a.url}
                  src={i < 12 ? a.url : undefined}
                  alt=""
                  className={styles.avatar}
                  onLoad={() => setLoaded(l => ({...l, [i]: true}))}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* components/BubbleGallery.module.css */
.wrapper{ width:100%; display:flex; justify-content:center; }
.canvas{ position:relative; width:100%; max-width:680px; background:transparent; }
.center{
  position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:10;
  width:240px; height:240px; border-radius:50%; overflow:hidden; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  box-shadow: 0 6px 20px rgba(0,0,0,0.6);
}
.centerImg{ width:100%; height:100%; object-fit:cover; }
.avatarWrap{ position:absolute; width:var(--avatar-size); height:var(--avatar-size); border-radius:50%; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.6); background:rgba(255,255,255,0.03); display:flex; align-items:center; justify-content:center; }
.avatar{ width:100%; height:100%; object-fit:cover; display:block; }
.grid{ display:grid; grid-template-columns:repeat(5,1fr); gap:8px; margin-top: 270px; /* push under center */ }
.avatarCell{ width:56px; height:56px; border-radius:50%; overflow:hidden; background:rgba(255,255,255,0.02); }
@media (max-width:700px){
  .center{ width:160px; height:160px; }
  .avatarWrap{ width:var(--avatar-small); height:var(--avatar-small); }
  .grid{ grid-template-columns:repeat(6,1fr); margin-top:200px; }
}

Add a small helper hook lib/useIsomorphicLayoutEffect.js:

// lib/useIsomorphicLayoutEffect.js
import { useLayoutEffect, useEffect } from 'react';
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;


⸻

D — Home & Park pages (examples)

pages/index.jsx (Homepage — landing page first):

// pages/index.jsx
import Layout from '../components/Layout';
import Link from 'next/link';
import styles from './Home.module.css';

export default function Home(){
  return (
    <Layout>
      <section className={styles.hero}>
        <h1 className={styles.title}>Legends of the Park</h1>
        <p className={styles.subtitle}>Defend What’s Local</p>
        <p className={styles.lead}>A flag football movement built around neighborhood pride — play for your park, fund your community.</p>
        <div className={styles.ctas}>
          <Link href="/signup"><a className={styles.primary}>Join / Sign up</a></Link>
          <Link href="/parks"><a className={styles.secondary}>Parks & Teams →</a></Link>
        </div>
      </section>
      <section className={styles.why}>
        <h2>How it works</h2>
        <p>Sign up, choose any park to represent, and your avatar will show up on that park's page — the winning park reinvests the prize pool back into the community.</p>
      </section>
    </Layout>
  );
}

pages/park/[park_code].jsx (park page example, client-side fetching from local data/parks.json and data/members.json):

// pages/park/[park_code].jsx
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BubbleGallery from '../../components/BubbleGallery';
import parks from '../../data/parks.json';
import members from '../../data/members.json';
import styles from './Park.module.css';

export default function ParkPage(){
  const router = useRouter();
  const { park_code } = router.query;
  if (!park_code) return <Layout><div>Loading...</div></Layout>;

  const park = parks.find(p => p.park_code === park_code) || parks[0];
  const avatars = (members[park_code] || []).map(u => ({ url: u.avatar_url }));

  return (
    <Layout>
      <div className={styles.header}>
        <h1>{park.name}</h1>
        <p className={styles.tag}>{park.tagline || ''}</p>
      </div>

      <BubbleGallery centerImage={park.center_image_url} avatars={avatars} size={520} />

      <section className={styles.info}>
        <h3>About the team</h3>
        <p>{park.description}</p>
      </section>
    </Layout>
  );
}

Add data/parks.json and data/members.json as simple static JSON for the devs to begin with.

⸻

E — package.json, .replit, and deploy scripts

package.json scripts (Next.js static export friendly):

{
  "name": "lotp",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build && next export -o out",
    "start:static": "npx serve out -s -l 8080"
  },
  "dependencies": {
    "next": "13.x",
    "react": "18.x",
    "react-dom": "18.x",
    "clsx": "^1.2.1"
  }
}

.replit:

run = "npm run start:static"
build = "npm run build"

Set Replit to run build manually when deploying (do not auto-run the dev server).

⸻

F — Full README.md (copy-paste)

# Legends of the Park (LOTP) — Replit instructions

## Overview
This repo implements a **homepage-first**, dark themed (black + gold) marketing site and park pages with a **Discord-inspired** UI:
- Persistent/collapsible left sidebar (desktop) and mobile drawer
- Circular avatar "bubble" gallery on each park page (center park image + surrounding avatars)
- Static-first build to minimize Replit runtime usage
- Supabase integration for auth and storage (client-side)

> **CRITICAL**: Do NOT remove the Discord-inspired feature set. Keep the bubble gallery and sidebar design.

---

## Quick start (local)
1. `git clone <repo>`
2. `npm install`
3. Create `.env.local`:

NEXT_PUBLIC_SUPABASE_URL=…
NEXT_PUBLIC_SUPABASE_ANON_KEY=…

4. Dev: `npm run dev`
5. Build + static export: `npm run build` (outputs `out/`)
6. Serve static: `npm run start:static`

---

## Replit deployment (production)
- Add secrets in Replit: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Ensure `.replit` contains:

run = “npm run start:static”
build = “npm run build”

- **Important**: Do not enable "always on" dev servers or watchers on production repl.
- To deploy:
1. Run `npm run build` (manually or via a single build command).
2. Start static server (`npm run start:static`) only when you need to preview.

---

## How we keep Replit usage low (follow these)
- Static-first: pages are statically exported (no server required to browse pages).
- No always-on Node processes in production.
- Supabase used as client-side backend for auth & storage.
- Lazy-load avatars and use `srcset` for images to reduce bandwidth.
- Turn off development hot-reload and watchers in production repl.

---

## Supabase notes
- Use Supabase Auth (email/phone).
- Avatars stored in Supabase Storage; prefer signed URLs for non-public operations.
- Do NOT commit service keys to repo. Use Replit secrets.

---

## Troubleshooting: Sidebar / Buttons not working
If sidebar buttons appear inactive:
1. Open browser Console (F12) — fix JS errors first.
2. Confirm `onClick` is firing by adding `console.log('click')` inside handler.
3. Look for overlay elements intercepting clicks (`pointer-events: none` or modal overlays).
4. Ensure router/hydration issue not present (SSR mismatch). If static export, use `<a href="/park/...">` fallback.
5. Check `.replit` run command — ensure you are serving the static build and not accidentally serving a single park `index.html`.

---

## Acceptance checklist for handover
- Root `/` shows LOTP landing page.
- Sidebar exists and navigates to `/parks` and `/park/[park_code]`.
- Park page shows center image + bubble gallery (works for 0→30+ users).
- Signup flow using Supabase works.
- README contains "How to keep Replit usage low".

---

## Notes for Devs & Replit engineers
- Keep the Discord-like UI/UX intact. If any change reduces the visual pattern, get explicit approval from Ken first.
- If static export limitations affect client-side behavior, implement fallback anchors (`<a href="...">`) so navigation still works without JS.
- Provide a short video/screenshots for the owner demonstrating the flows.


⸻

G — QA Checklist & Quick Debug Snippets (paste into README or dev notes)

If any button does nothing:
	1.	Add console.log('handler') in the click handler.
	2.	Inspect computed styles of the element: ensure pointer-events: auto and that no overlay covers it.
	3.	Confirm <Link> / router.push usage — don’t block navigation with preventDefault().

Quick debug helper example:

<button onClick={(e) => { console.log('clicked', e.currentTarget); router.push('/parks'); }}>
  Parks & Teams →
</button>


⸻

H — Small dev deliverable I can make next (I’ll paste these if you want)
	•	Fully implemented Sidebar.jsx, BubbleGallery.jsx as single file modules ready to drop into the repo (I already gave them, but can expand with TypeScript types).
	•	A small admin/upload page that securely returns Supabase signed upload URLs.
	•	A 60–90s script + checklist you can send Replit to do the QA pass.

⸻

If you want, I’ll now:
	1.	Paste a ready-to-drop admin/upload React page that uses Supabase signed URLs, and
	2.	Produce the small README QA checklist as a separate markdown file you can paste into the repo root.

Which of those two should I add now?