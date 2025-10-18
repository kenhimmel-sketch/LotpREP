import { FormEvent, useEffect, useMemo, useState } from "react";
import { parks, type ParkSlug } from "@/data/parks";
import { useAuth } from "@/features/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AuthPage() {
  const { user, loading, signInWithEmail, signInWithPhone, signOut, selectPark, supabaseEnabled } = useAuth();
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPark, setSelectedPark] = useState<ParkSlug>(parks[0].slug);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const currentParkName = useMemo(() => {
    if (!user?.parkSlug) return null;
    return parks.find((park) => park.slug === user.parkSlug)?.name ?? null;
  }, [user?.parkSlug]);

  useEffect(() => {
    if (user?.parkSlug) {
      setSelectedPark(user.parkSlug);
    }
  }, [user?.parkSlug]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFeedback(null);
    setError(null);

    try {
      setProcessing(true);
      if (mode === "email") {
        const response = await signInWithEmail(email.trim(), selectedPark);
        setFeedback(response.message);
      } else {
        const response = await signInWithPhone(phone.trim(), selectedPark);
        setFeedback(response.message);
      }
      setEmail("");
      setPhone("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start authentication. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleParkUpdate = async (parkSlug: ParkSlug) => {
    setSelectedPark(parkSlug);
    if (user) {
      try {
        await selectPark(parkSlug);
        setFeedback("Park preference updated.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to update park preference");
      }
    }
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">Join the movement</p>
        <h1 className="text-3xl font-semibold text-foreground">Sign in or create your LOTP profile</h1>
        <p className="max-w-2xl text-sm text-foreground/70">
          Verify via Supabase email magic link or SMS OTP. During onboarding you decide which park you defend—no automatic assignments.
        </p>
      </header>

      <div className="grid gap-8 rounded-3xl border border-border/40 bg-black/55 p-8 md:grid-cols-[1.1fr,0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 text-xs uppercase tracking-[0.24em]">
            <Button
              type="button"
              variant={mode === "email" ? "default" : "secondary"}
              onClick={() => setMode("email")}
              className="flex-1 rounded-full"
            >
              Email OTP
            </Button>
            <Button
              type="button"
              variant={mode === "phone" ? "default" : "secondary"}
              onClick={() => setMode("phone")}
              className="flex-1 rounded-full"
            >
              SMS OTP
            </Button>
          </div>

          {mode === "email" ? (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.24em] text-foreground/50">Email address</label>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="bg-black/60"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.24em] text-foreground/50">Phone number</label>
              <Input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+1 702 555 1234"
                required
                className="bg-black/60"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.24em] text-foreground/50">Choose your park</label>
            <Select value={selectedPark} onValueChange={(value: ParkSlug) => handleParkUpdate(value)}>
              <SelectTrigger className="bg-black/60 text-foreground/80">
                <SelectValue placeholder="Pick your park" />
              </SelectTrigger>
              <SelectContent className="bg-black">
                {parks.map((park) => (
                  <SelectItem key={park.slug} value={park.slug}>
                    {park.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={processing || loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black shadow-gold"
          >
            {processing ? "Sending…" : "Send access link"}
          </Button>
          {!supabaseEnabled && (
            <p className="text-xs text-foreground/50">
              Supabase keys are not configured. Authentication will simulate locally until you provide credentials in <code>.env</code>.
            </p>
          )}
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border/30 bg-black/45 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/80">Current status</h2>
            {user ? (
              <div className="mt-4 space-y-3 text-sm text-foreground/70">
                <p><span className="text-foreground/50">Logged in as:</span> {user.email}</p>
                <p>
                  <span className="text-foreground/50">Chosen park:</span> {currentParkName ?? "Select below"}
                </p>
                <Button
                  variant="secondary"
                  onClick={() => signOut()}
                  className="mt-4 w-full rounded-full border border-border/60 bg-secondary/60 text-xs font-semibold uppercase tracking-[0.24em]"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <p className="mt-4 text-sm text-foreground/70">
                Request a one-time code via email or SMS to join the league, then finalize your park selection.
              </p>
            )}
          </div>

          {feedback && (
            <Alert className="border-primary/30 bg-primary/10 text-sm text-foreground/80">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{feedback}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="text-sm">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </aside>
      </div>
    </div>
  );
}
