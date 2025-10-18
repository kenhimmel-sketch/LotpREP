import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-3xl border border-border/40 bg-black/60 p-10 text-center">
      <span className="text-xs uppercase tracking-[0.28em] text-primary/70">Out of bounds</span>
      <h1 className="text-3xl font-semibold text-foreground">This route isn’t on the schedule.</h1>
      <p className="text-sm text-foreground/70">
        The play you called leads outside the current LOTP season. Head back to the homepage or jump into the parks grid to pick your crew.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black">
          <Link to="/">Return home</Link>
        </Button>
        <Button asChild variant="secondary" className="rounded-full border border-border/60 bg-secondary/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em]">
          <Link to="/parks">Explore parks</Link>
        </Button>
      </div>
    </div>
  );
}
