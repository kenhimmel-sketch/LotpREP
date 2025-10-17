# Legends of the Park - Design Guidelines

## Design Approach
**Reference-Based Approach:** Drawing inspiration from premier sports league websites (Premier League, NFL) known for prestigious presentation, team-focused layouts, and premium visual treatment. The design emphasizes elegance, credibility, and athletic excellence through sophisticated black and gold aesthetics.

## Core Design Principles
- **Premium Athletic Prestige:** Evoke the grandeur of major sports leagues through refined typography, luxurious color treatments, and generous spacing
- **Team-Centric Narrative:** Each team and park gets distinctive visual treatment while maintaining cohesive league identity
- **Visual Hierarchy:** Bold serif headlines, clean sans-serif body text, and strategic gold accents create sophisticated information architecture

## Color Palette

**Dark Mode Primary (Default):**
- Primary: `0 0% 0%` (Deep Black) - Backgrounds, headers
- Secondary: `51 100% 50%` (Rich Gold) - CTAs, highlights, borders
- Accent: `43 40% 60%` (Antique Gold) - Subtle accents, hover states
- Background: `0 0% 10%` (Charcoal) - Section backgrounds
- Text: `0 0% 100%` (White) - Primary text
- Highlights: `45 100% 93%` (Cream) - Card backgrounds, subtle contrasts

## Typography System

**Font Families:**
- **Headers:** Playfair Display (serif) - Elegant, prestigious feel for H1-H2
- **Subheadings:** Montserrat (sans-serif) - Clean, modern for H3-H6
- **Body Text:** Open Sans (sans-serif) - Highly readable for paragraphs

**Type Scale:**
- Hero Headlines: text-6xl to text-8xl (Playfair Display, font-bold)
- Section Headers: text-4xl to text-5xl (Playfair Display, font-semibold)
- Subheadings: text-xl to text-2xl (Montserrat, font-semibold)
- Body: text-base to text-lg (Open Sans, font-normal)
- Captions: text-sm (Open Sans, font-light)

## Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-8, gap-12, gap-16
- Container max-widths: max-w-7xl for content sections

**Grid Patterns:**
- Team cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 (landing page)
- Content sections: 2-column layouts for feature/benefit splits
- Single column for storytelling and park histories (max-w-4xl)

## Component Library

### Navigation
- Fixed header with semi-transparent dark background (backdrop-blur-md)
- Gold underline hover effects on nav links
- League logo with gold accent border
- Mobile: hamburger menu with slide-in drawer

### Hero Sections
- Full-width backgrounds using uploaded team images with dark overlays
- Large Playfair Display headlines with gold underline accents
- Centered layouts with clear CTAs (gold buttons with hover glow effects)
- Height: min-h-[80vh] for impact

### Team Cards (Landing Page)
- Dark charcoal backgrounds with 2px gold borders
- Team images positioned at top with overlay gradients
- Playfair Display team names, Montserrat park names
- "View Team" CTAs in gold with hover transformations
- Subtle box shadows for depth

### Team Pages Structure
1. **Hero:** Team image background with dark overlay, team name + park name
2. **Park Heritage:** Two-column layout - park history text + park imagery
3. **Team Roster:** Grid layout showcasing team composition (if available)
4. **Stats/Achievements:** Card-based metrics with gold number highlights
5. **Signup Form:** Elegant form with gold accent borders, cream input backgrounds

### Forms
- Input fields: cream backgrounds with dark text, gold focus borders
- Submit buttons: Gold with smooth hover scale effects
- Labels: Montserrat, subtle spacing above inputs
- Validation: Gold highlights for active states

### Footer
- Dark background with gold divider line
- Multi-column layout: League info, Quick links, Social media, Contact
- Copyright in Open Sans light weight
- Gold social icons with hover effects

## Images

**Hero Images:**
- **Landing Page:** Wide-angle flag football action shot or stadium view with team overlay
- **Team Pages:** Integrated uploaded team images as hero backgrounds with 40% dark overlay for text legibility

**Supporting Images:**
- Park photos in heritage sections (warm, inviting community shots)
- Team action shots in roster/about sections
- Icon placeholders for stats (trophy icons, player counts in gold)

## Animations (Minimal, Purposeful)

- **Smooth Transitions:** 300ms ease for all interactive elements
- **Card Hover:** Subtle scale (1.02) and gold glow on team cards
- **Button States:** Scale + brightness increase on hover
- **Page Transitions:** Fade-in for content sections on scroll
- **No:** Excessive parallax, bouncing effects, or distracting motion

## Accessibility & Polish

- Maintain WCAG AA contrast ratios (white text on black backgrounds)
- Gold accents provide sufficient contrast for interactive elements
- Focus indicators: 2px gold outline for keyboard navigation
- Responsive images with proper aspect ratios and lazy loading
- Semantic HTML with proper heading hierarchy

## Key Differentiators

- **Premium Black & Gold Palette:** Sophisticated alternative to typical sports team primary colors
- **Serif Headlines:** Playfair Display adds prestige absent in most sports sites
- **Park-Team Dual Narrative:** Unique approach honoring both athletic and community aspects
- **Elegant Card Borders:** Gold borders create luxury feel vs standard flat cards