import { Card } from "@/components/ui/card";
import { Trophy, Users, Target, Award } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatCard({ icon, value, label }: StatProps) {
  return (
    <Card className="p-6 text-center border-primary/30 hover-elevate transition-all duration-300">
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="font-serif text-3xl font-bold text-primary mb-1" data-testid={`stat-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {value}
      </div>
      <div className="font-montserrat text-sm text-muted-foreground">
        {label}
      </div>
    </Card>
  );
}

interface TeamStatsProps {
  wins: string;
  players: string;
  championships: string;
  winRate: string;
}

export default function TeamStats({ wins, players, championships, winRate }: TeamStatsProps) {
  return (
    <div className="py-12 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
          Team Statistics
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Trophy className="w-6 h-6 text-primary" />}
            value={wins}
            label="Total Wins"
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-primary" />}
            value={players}
            label="Active Players"
          />
          <StatCard
            icon={<Award className="w-6 h-6 text-primary" />}
            value={championships}
            label="Championships"
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-primary" />}
            value={winRate}
            label="Win Rate"
          />
        </div>
      </div>
    </div>
  );
}
