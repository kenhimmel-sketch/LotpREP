# Legends of the Park - Flag Football League Platform

## Overview

Legends of the Park is a premium flag football league platform where teams represent local Nevada parks. The application showcases team information, park histories, and provides team signup functionality. Built with a modern tech stack, it emphasizes a prestigious, sports-league-inspired design aesthetic with a dark mode theme featuring gold accents.

## Recent Changes

**October 17, 2025 - Critical Bug Fixes**
- Fixed auth middleware error handling to properly return 401 responses (server/replitAuth.ts)
- Connected SignupForm component to backend API - team signups now save to database
- Fixed user upsert logic to handle both ID and email conflicts, preventing duplicate key errors
- Removed debug console.log statements from production code
- All bug fixes verified with end-to-end testing - signup form fully functional

**October 17, 2025 - Replit Authentication Integration**
- Implemented Replit Auth (OpenID Connect) for user authentication
- Added users and sessions tables to database schema
- Created authentication middleware with token refresh and session management
- Built frontend authentication flow with useAuth hook and protected routing
- Landing page for logged-out users, Home page for authenticated users
- Header displays user avatar and logout button when authenticated
- All authentication endpoints tested and operational

**October 17, 2025 - Supabase Database Integration**
- Integrated Supabase PostgreSQL database for persistent data storage
- Configured postgres.js driver with SSL enforcement for secure connections
- Migrated from in-memory storage to Supabase-backed DbStorage implementation
- Successfully deployed team_signups table schema to Supabase
- API endpoints verified and operational with live database

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing instead of React Router

**UI & Styling**
- Tailwind CSS for utility-first styling with custom design system
- Shadcn/ui component library (New York style) for consistent, accessible UI components
- Custom color palette: Dark mode primary with gold accents (HSL-based variables)
- Typography: Playfair Display (serif headers), Montserrat (subheadings), Open Sans (body text)
- Design approach inspired by premier sports leagues (Premier League, NFL)

**State Management**
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod validation for form handling
- Local component state with React hooks

**Component Structure**
- Reusable components: Header (with auth-aware avatar/logout), Footer, Hero, TeamCard, TeamStats, ParkInfo, SignupForm
- Page components: Landing (logged-out), Home (logged-in), TeamPage, NotFound
- UI components library from Radix UI primitives
- Authentication: useAuth hook provides user state, isLoading, and isAuthenticated status
- Protected routing: Landing page for unauthenticated, Home/Teams for authenticated users

### Backend Architecture

**Server Framework**
- Express.js for REST API endpoints
- TypeScript for type safety across the stack
- HTTP server using Node's native `http` module

**API Design**
- RESTful endpoints for team signups
- POST `/api/team-signups` - Create new team signup
- GET `/api/team-signups/:teamId` - Retrieve signups by team

**Authentication System**
- Replit Auth (OpenID Connect) for user authentication
- Session-based authentication with PostgreSQL session storage
- Token refresh mechanism for long-lived sessions
- Protected API routes with `isAuthenticated` middleware
- Authentication endpoints:
  - GET `/api/login` - Initiates OIDC login flow
  - GET `/api/logout` - Initiates logout and session cleanup
  - GET `/api/callback` - OIDC callback handler
  - GET `/api/auth/user` - Returns authenticated user data

**Middleware & Utilities**
- Request/response logging with duration tracking
- JSON body parsing
- Error handling middleware with status code mapping
- Development-only Vite integration for HMR
- Authentication middleware with token refresh
- Session management with secure cookie configuration

### Data Storage

**Database**
- PostgreSQL as the primary database (configured for Supabase)
- Drizzle ORM for type-safe database queries and schema management
- Connection pooling with SSL requirement for production security

**Schema Design**
- `users` table: id (UUID), email, firstName, lastName, profileImageUrl, createdAt, updatedAt
- `sessions` table: sid (primary key), sess (jsonb), expire (timestamp) - for authentication
- `team_signups` table: id (UUID), teamId, name, email, phone, experience, message
- Zod schemas generated from Drizzle for runtime validation
- Database migrations managed with `npm run db:push`

**Data Access Layer**
- Storage abstraction pattern with `IStorage` interface
- `DbStorage` implementation for database operations
- Separation of concerns between routes and data access

### Development & Production

**Development Setup**
- Vite dev server with middleware mode integration into Express
- Hot Module Replacement (HMR) for rapid development
- Custom logging system for API request tracking
- Replit-specific plugins for cartographer and dev banner

**Build Process**
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server code to `dist` as ESM
- TypeScript compilation with path aliases (@, @shared, @assets)
- Production server serves static files from build output

**Environment Configuration**
- Database URL required via `DATABASE_URL` environment variable
- NODE_ENV for environment-specific behavior
- SSL enforcement for database connections

## External Dependencies

**UI Component Libraries**
- Radix UI primitives (accordion, dialog, dropdown, popover, etc.)
- Embla Carousel for carousel functionality
- Lucide React for icon system
- CMDK for command palette patterns

**Form & Validation**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for Zod integration
- Drizzle-zod for database schema to Zod conversion

**Database & ORM**
- PostgreSQL database (Supabase)
- Drizzle ORM for queries and migrations
- postgres (postgres.js) driver for database connection with SSL enforcement
- Connection pooling configured for optimal performance

**Styling & Utilities**
- Tailwind CSS with PostCSS
- class-variance-authority for variant-based components
- clsx and tailwind-merge for conditional class handling
- date-fns for date formatting

**Development Tools**
- Vite with React plugin
- esbuild for backend bundling
- TypeScript compiler for type checking
- Replit-specific plugins (runtime error overlay, cartographer)

**Fonts**
- Google Fonts: Playfair Display, Montserrat, Open Sans
- Preconnected for performance optimization