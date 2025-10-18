export default function RulesPage() {
  return (
    <div className="space-y-14">
      <section className="space-y-5 rounded-3xl border border-border/40 bg-black/55 p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">How it works</p>
        <h1 className="text-3xl font-semibold text-foreground">The LOTP charter</h1>
        <p className="max-w-3xl text-sm text-foreground/70">
          Legends of the Park exists to turn Nevada flag-football victories into measurable neighborhood change. Every athlete chooses a park to defend, competes under consistent league standards, and fights for the right to direct the season’s prize pool.
        </p>
        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6">
          <h2 className="text-lg font-semibold text-primary">Non-negotiable rule</h2>
          <p className="mt-2 text-sm text-foreground/80">
            Only the League Champion earns the right to direct the league prize pool to their park and surrounding local community. If a team doesn’t win the championship, they do not distribute prize funds.
          </p>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-border/40 bg-black/50 p-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Season structure</h2>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li>• Regular season matches seeded to maximize park rivalries.</li>
            <li>• Playoffs culminate in a single championship game under prime-time lights.</li>
            <li>• Off-field metrics—community service, attendance, and mentorship—inform future seeding but never override the on-field champion.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Eligibility &amp; rosters</h2>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li>• Adult athletes (18+) can sign up via Supabase-powered email or SMS verification.</li>
            <li>• Players may switch parks only between seasons and must re-confirm their allegiance during signup.</li>
            <li>• Captains verify rosters weekly; substitute approvals flow through league ops within 24 hours.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-border/40 bg-black/45 p-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Fair play</h2>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li>• Certified officials handle every matchup; disputes resolve via film review.</li>
            <li>• Zero tolerance for unsportsmanlike conduct. Violations result in suspensions or ejection from the league.</li>
            <li>• Equipment checks ensure uniform black-and-gold compliance—no green allowed anywhere on game day.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Community impact</h2>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li>• Champion directs the prize pool to park upgrades, education programs, or mutual aid selected by that park’s leadership.</li>
            <li>• Non-champion parks catalogue community work but do not distribute prize funds.</li>
            <li>• Transparency reports publish after the championship, detailing every dollar reinvested.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-border/40 bg-black/50 p-8">
        <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-semibold text-primary">Who gets the prize money?</p>
            <p className="text-sm text-foreground/70">
              Only the League Champion’s park and community initiatives receive the prize pool. Everyone else reloads for next season.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">How do I join?</p>
            <p className="text-sm text-foreground/70">
              Visit the Join the Movement flow, verify via Supabase email or SMS, and choose any park that aligns with your mission.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Can parks add more channels?</p>
            <p className="text-sm text-foreground/70">
              Yes. The community panel is built for expansion—additional channels, bots, and integrations can launch without redeploying the core app.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
