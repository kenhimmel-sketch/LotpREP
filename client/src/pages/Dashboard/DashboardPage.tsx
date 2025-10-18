import { Link } from "react-router-dom";
import { parks } from "@/data/parks";
import { useAuth } from "@/features/auth/AuthContext";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, selectPark, signOut, supabaseEnabled } = useAuth();

  const park = parks.find((item) => item.slug === (user?.parkSlug ?? ""));

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Player hub</p>
        <h1 className="text-3xl font-semibold text-foreground">Your LOTP footprint</h1>
        <p className="max-w-2xl text-sm text-foreground/70">
          Manage your park allegiance, monitor upcoming drops, and prep for champion-only prize directives.
        </p>
      </header>

      {user ? (
        <div className="grid gap-8 rounded-3xl border border-border/40 bg-black/55 p-8 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/30 bg-black/45 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-primary/80">Identity</p>
              <p className="mt-3 text-sm text-foreground/70">{user.email}</p>
              {user.phone && (
                <p className="text-sm text-foreground/50">SMS verified: {user.phone}</p>
              )}
              <Button
                variant="secondary"
                onClick={() => signOut()}
                className="mt-4 rounded-full border border-border/60 bg-secondary/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em]"
              >
                Sign out
              </Button>
            </div>

            <div className="rounded-2xl border border-border/30 bg-black/45 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-primary/80">Park allegiance</p>
              {park ? (
                <div className="mt-4 space-y-3 text-sm text-foreground/70">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border/40 bg-black/70">
                      <img src={park.crest} alt={`${park.name} crest`} className="h-10 w-10" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{park.name}</p>
                      <p className="text-xs uppercase tracking-[0.24em] text-foreground/50">{park.location}</p>
                    </div>
                  </div>
                  <p>{park.bubbleCallout}</p>
                  <div className="flex gap-3">
                    <Button asChild className="rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black">
                      <Link to={`/parks/${park.slug}`}>Visit park page</Link>
                    </Button>
                    <Button
                      variant="secondary"
                      className="rounded-full border border-border/60 bg-secondary/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em]"
                      onClick={() => selectPark(park.slug)}
                    >
                      Refresh allegiance
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm text-foreground/70">
                  <p>You haven’t picked a park yet. Claim your crew to unlock the legends bubble.</p>
                  <Button asChild className="rounded-full bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black">
                    <Link to="/auth">Choose a park</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border/30 bg-black/45 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-primary/80">Next steps</p>
              <ul className="mt-3 space-y-3 text-sm text-foreground/70">
                <li>• Record a 30-second intro for your park’s #media channel.</li>
                <li>• RSVP to the next park meetup via the community panel.</li>
                <li>• Prep your impact plan—champions publish transparency reports within 7 days.</li>
              </ul>
            </div>
            {!supabaseEnabled && (
              <div className="rounded-2xl border border-border/30 bg-black/40 p-6 text-sm text-foreground/70">
                <p className="text-xs uppercase tracking-[0.24em] text-primary/70">Developer note</p>
                <p className="mt-2">
                  Supabase credentials are not set. Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to enable production authentication flows.
                </p>
              </div>
            )}
          </aside>
        </div>
      ) : (
        <div className="rounded-3xl border border-border/40 bg-black/60 p-10 text-center">
          <p className="text-sm text-foreground/70">You need to sign in to view the dashboard.</p>
          <Button asChild className="mt-4 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black">
            <Link to="/auth">Sign in</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
