import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-black/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-xs uppercase tracking-[0.2em] text-foreground/50 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-foreground/60">Legends of the Park</p>
          <p className="text-foreground/50">Nevada Flag-Football League</p>
        </div>
        <div className="flex flex-wrap gap-4 text-foreground/50">
          <Link to="/rules" className="hover:text-primary">
            Rules &amp; How It Works
          </Link>
          <Link to="/parks" className="hover:text-primary">
            Explore Parks
          </Link>
          <a
            href="mailto:hello@legendsofthepark.com"
            className="hover:text-primary"
          >
            Contact
          </a>
        </div>
        <p className="text-foreground/45">© {new Date().getFullYear()} Legends of the Park. Defend what's local.</p>
      </div>
    </footer>
  );
}

export default Footer;
