# Legends of the Park (LOTP) - Project Summary

## 🎯 Project Overview

**Legends of the Park** is a Discord-style flag football league platform where players represent local Nevada parks. The platform features FREE membership signup with auto-generated digital ID badges that include Code-128 barcodes.

**Key Tagline:** "Defend What's Local"

**Current Status:** ✅ MVP Complete - Core signup → park selection → badge generation flow is fully functional

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Routing:** Wouter (lightweight alternative to React Router)
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** Shadcn/ui (Radix UI primitives)
- **State Management:** TanStack Query v5 (React Query)
- **Forms:** React Hook Form with Zod validation
- **Typography:** 
  - Cinzel (serif headers)
  - Montserrat (subheadings)
  - Inter (body/UI)
  - Roboto Mono (monospace/IDs)

### Backend
- **Server:** Express.js with TypeScript
- **Database:** PostgreSQL (Supabase)
- **ORM:** Drizzle ORM
- **Database Driver:** postgres.js (with SSL)
- **Session Management:** PostgreSQL-backed sessions
- **Validation:** Zod schemas

### Key Libraries
- **jsbarcode:** Code-128 barcode generation
- **Canvas API:** Client-side badge image rendering
- **Lucide React:** Icon system

---

## 🏗 Architecture

### Frontend Architecture
```
client/src/
├── pages/          # Route components
│   ├── LotpLanding.tsx      # Homepage (/)
│   ├── SignupPage.tsx       # Signup form (/signup)
│   ├── ChooseParkPage.tsx   # Park selection (/choose-park)
│   ├── BadgePage.tsx        # Badge display/download (/badge)
│   └── ParksPage.tsx        # All parks listing (/parks)
├── components/     # Reusable UI components
│   └── ui/         # Shadcn components
├── lib/            # Utilities
│   ├── badgeGenerator.ts    # Canvas badge rendering
│   └── queryClient.ts       # TanStack Query setup
└── App.tsx         # Root component with routing
```

### Backend Architecture
```
server/
├── index.ts        # Express server entry point
├── routes.ts       # API route definitions
├── storage.ts      # Database abstraction layer
├── db.ts           # Drizzle database connection
└── vite.ts         # Vite dev middleware integration
```

### Database Schema
```
shared/schema.ts    # Drizzle schema + Zod validation
```

---

## 🗄 Database Schema

### Tables

**users**
```typescript
- id: varchar (UUID primary key)
- email: varchar (unique, required)
- firstName: varchar (required)
- lastName: varchar (required)
- phone: varchar (optional)
- createdAt: timestamp
- updatedAt: timestamp
```

**user_profiles**
```typescript
- id: varchar (UUID primary key)
- userId: varchar (foreign key → users.id)
- chosenParkCode: varchar (park identifier)
- experience: varchar (beginner/intermediate/advanced)
- createdAt: timestamp
- updatedAt: timestamp
```

**parks**
```typescript
- code: varchar (primary key: ACAC, DISC, VETS, SUNS)
- name: varchar (park team name)
- colors: jsonb (primary/secondary colors)
- description: text
- memberCount: integer (default 0)
```

**member_counters**
```typescript
- parkCode: varchar (primary key)
- nextNumber: integer (auto-incrementing counter)
- updatedAt: timestamp
```
**Purpose:** Thread-safe atomic counter for member ID generation

**badges**
```typescript
- id: varchar (UUID primary key)
- userId: varchar (foreign key → users.id)
- memberId: varchar (format: LTP-PARK4-######)
- parkCode: varchar
- displayName: varchar
- badgeData: jsonb (park name, colors, role, etc.)
- issuedAt: timestamp
- createdAt: timestamp
```

---

## 🎨 Design System

### Color Palette
- **Primary:** Gold (#D4AF37) - Premium league aesthetic
- **Background:** Black (#000000) - Discord-inspired dark mode
- **Accent:** Green (#2EB67D) - Success/active states
- **Text:** White with opacity variants for hierarchy

### Park Colors
1. **Acacia Avengers** - Gold (#D4AF37)
2. **Discovery Defenders** - Blue (#1E88E5) + Lime (#8BC34A)
3. **Veterans Vipers** - Purple (#6A1B9A)
4. **Sunset Scorpions** - Red (#C62828)

---

## 🔄 User Flow

### Complete Journey
```
1. Landing Page (/)
   ↓
2. Click "Sign Up For Free"
   ↓
3. Signup Form (/signup)
   - Fill: First Name, Last Name, Email (required)
   - Fill: Phone (optional), Experience (dropdown)
   - Submit → Store email in localStorage
   ↓
4. Park Selection (/choose-park)
   - Display all 4 founding parks
   - User clicks park card
   - Backend creates:
     * User profile with chosen park
     * Atomic member ID (LTP-PARK4-######)
     * Badge record
   ↓
5. Badge Page (/badge)
   - Fetch badge data via email
   - Auto-generate badge image using Canvas
   - Display preview
   - Download PNG (filename: LOTP_<member_id>.png)
```

---

## 🔌 API Endpoints

### POST `/api/signup`
**Purpose:** Create new user account  
**Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "702-555-0123",
  "experience": "intermediate"
}
```
**Response:** User object

### POST `/api/choose-park`
**Purpose:** Associate user with park + generate member ID + create badge  
**Body:**
```json
{
  "email": "user@example.com",
  "parkCode": "ACAC"
}
```
**Response:** Badge object with member ID

### GET `/api/badge?email=<email>`
**Purpose:** Retrieve badge data for user  
**Response:**
```json
{
  "id": "uuid",
  "memberId": "LTP-ACAC-000001",
  "parkCode": "ACAC",
  "displayName": "JOHN DOE",
  "badgeData": {
    "parkName": "Acacia Avengers",
    "parkColor": "#D4AF37",
    "role": "Member"
  },
  "issuedAt": "2025-10-18T12:00:00.000Z"
}
```

---

## 🎫 Badge Specifications

### Dimensions
- **Size:** 954×1518px (portrait, 1.5× retina)
- **Aspect Ratio:** Standard ID card proportions

### Layout Sections
1. **Header:** LEGENDS OF THE PARK branding + tagline
2. **Content:** Circular photo (240px) + member info
3. **Footer:** Gold band with Code-128 barcode

### Barcode Details
- **Format:** Code-128
- **Payload:** `LOTP|v1|<member_id>|<park_code>|<issued_at_iso>`
- **Example:** `LOTP|v1|LTP-ACAC-000001|ACAC|2025-10-18T12:00:00.000Z`

### Typography
- **Headline:** Cinzel 700 (48px, +8px letter-spacing)
- **Member Name:** Inter 700 (32px)
- **Labels:** Inter 400 (12px)
- **Member ID:** Roboto Mono 400 (16px)

### Visual Elements
- 1px faint gold inner frame
- Diagonal noise texture overlay (4% opacity)
- Park color accent stripe (3px)
- Gold ring around photo (2px)
- Black background (#000000)

---

## 📁 Key Files

### Badge Generation
**`client/src/lib/badgeGenerator.ts`**
- Canvas-based badge rendering
- Dynamic font loading (Google Fonts)
- Barcode generation via jsbarcode
- PNG export

### Pages
**`client/src/pages/LotpLanding.tsx`**
- Marketing homepage
- Hero section with CTA
- "How It Works" sections

**`client/src/pages/SignupPage.tsx`**
- Form with validation (React Hook Form + Zod)
- Required: firstName, lastName, email
- Optional: phone
- Dropdown: experience level

**`client/src/pages/ChooseParkPage.tsx`**
- Grid display of 4 parks
- Park cards with colors/descriptions
- Click → POST to `/api/choose-park`

**`client/src/pages/BadgePage.tsx`**
- Fetch badge data from API
- Auto-generate badge using badgeGenerator
- Display preview
- Download button

### Backend
**`server/storage.ts`**
- Database abstraction layer (IStorage interface)
- User CRUD operations
- Atomic member ID generation
- Badge creation/retrieval

**`server/routes.ts`**
- Express route handlers
- Input validation with Zod
- Error handling

**`shared/schema.ts`**
- Drizzle table definitions
- Zod schemas (insert/select types)
- Database constraints

---

## ✅ What's Working

### Fully Functional Features
1. ✅ Landing page with branding
2. ✅ Signup form with validation
3. ✅ Park selection with 4 founding parks
4. ✅ Atomic member ID generation (thread-safe)
5. ✅ Canvas-based badge generation
6. ✅ Code-128 barcode with encoded data
7. ✅ Badge preview and PNG download
8. ✅ PostgreSQL database with Supabase
9. ✅ Complete API backend
10. ✅ Dark mode UI (Discord-inspired)

### Data Flow Verified
- ✅ Signup → localStorage email handoff
- ✅ Park selection → profile creation
- ✅ Member ID generation (format: LTP-PARK4-######)
- ✅ Badge creation with park association
- ✅ Badge retrieval by email
- ✅ Client-side badge rendering

---

## 🔧 Environment Setup

### Required Environment Variables
```bash
DATABASE_URL=postgresql://...  # Supabase connection string
NODE_ENV=development
```

### Commands
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (port 5000)
npm run db:push          # Sync schema to database
npm run db:push --force  # Force sync (if warnings)
```

---

## 🚀 Deployment Notes

### Static-First Approach
- Client-side badge generation (no server rendering)
- Supabase for database (no always-running processes)
- Cost-optimized architecture

### Production Considerations
- Badge generation happens in browser (Canvas API)
- No image storage - generated on-demand
- Barcode scannable with any Code-128 reader
- Download as PNG for physical printing

---

## 📊 Current Metrics

- **Parks:** 4 founding parks (Acacia, Discovery, Veterans, Sunset)
- **Member ID Format:** LTP-PARK4-###### (6 digits, zero-padded)
- **Badge Size:** 954×1518px portrait PNG
- **Barcode Standard:** Code-128
- **Database Tables:** 7 (users, user_profiles, parks, badges, member_counters, park_stats, sessions)

---

## 🎯 Next Steps (Future Enhancements)

### Not Yet Implemented
- [ ] Park bubble galleries (circular member showcases)
- [ ] Team rosters on park pages
- [ ] League schedule/standings
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Barcode scanning verification system

### Technical Debt
- [ ] Font loading optimization
- [ ] Image caching strategy
- [ ] Error boundary components
- [ ] Accessibility audit
- [ ] Mobile responsive testing

---

## 💡 Key Technical Decisions

### Why Client-Side Badge Generation?
- **Cost:** No image storage or server processing
- **Speed:** Instant generation in browser
- **Flexibility:** Easy to update design
- **Privacy:** No PII stored as images

### Why Atomic Counters?
- **Thread-safe:** Prevents duplicate member IDs
- **Scalable:** Works across distributed systems
- **Simple:** SQL-based increment

### Why Supabase?
- **Rollback support:** Version control for data
- **Built-in:** Integrates with Replit
- **Free tier:** Cost-effective for MVP

---

## 🐛 Known Issues

### Minor
- Nested `<a>` tag warnings in browser console (cosmetic)
- Font loading happens dynamically (could be optimized)

### Fixed
- ✅ Auth infinite loop (resolved)
- ✅ 404 errors on team pages (resolved)
- ✅ Badge creation not persisting (resolved)
- ✅ Spacing gaps on homepage (resolved)
- ✅ Badge spacing issues (resolved)

---

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode
- Tailwind utility-first CSS
- Component colocation
- Zod for runtime validation

### Database Migrations
- **Never** write SQL migrations manually
- Always use `npm run db:push`
- Use `--force` flag if data loss warnings appear

### Testing Strategy
- End-to-end flows with Playwright
- Manual testing for badge generation
- Barcode scanning verification

---

## 🔗 Important Links

- **Database:** Supabase PostgreSQL
- **Fonts:** Google Fonts (Cinzel, Montserrat, Inter, Roboto Mono)
- **Icons:** Lucide React
- **UI Components:** Shadcn/ui (Radix primitives)

---

## 📞 Contact & Support

This project is built on Replit with full version control and rollback support. All secrets are managed securely through Replit's environment system.

---

**Last Updated:** October 18, 2025  
**Version:** 1.0 (MVP Complete)  
**Status:** ✅ Production Ready for Testing
