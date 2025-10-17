import { Router } from "wouter";
import TeamCard from "../TeamCard";

export default function TeamCardExample() {
  return (
    <Router>
      <div className="p-8 max-w-sm">
        <TeamCard
          name="Acacia Park Avengers"
          park="Acacia Park"
          image="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800"
          colors="Forest Green & Cream"
          slug="acacia-park-avengers"
        />
      </div>
    </Router>
  );
}
