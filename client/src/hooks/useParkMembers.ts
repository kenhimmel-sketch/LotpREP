import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface Member {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
  parkSlug: string;
}

// Feature flag for using mock data
const USE_MOCK_DATA = false; // Now using real database

// Deterministic pseudo-random number generator using seed
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Linear congruential generator (LCG)
  let state = hash;
  
  return function() {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

// Generate deterministic mock members for a park
function generateMockMembers(parkSlug: string, count: number = 30): Member[] {
  const firstNames = [
    "Jordan", "Alex", "Sam", "Taylor", "Morgan", "Casey", "Riley", "Jamie",
    "Avery", "Cameron", "Drew", "Quinn", "Blake", "Reese", "Skyler", "Peyton",
    "Dakota", "Emerson", "Hayden", "Kai", "River", "Phoenix", "Sage", "Rowan",
    "Charlie", "Bailey", "Harper", "Finley", "Ashton", "Parker"
  ];
  
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas",
    "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris",
    "Clark", "Lewis", "Robinson", "Walker", "Hall", "Allen", "Young"
  ];
  
  const members: Member[] = [];
  
  // Create a deterministic random generator based on park slug
  const random = seededRandom(parkSlug);
  
  for (let i = 0; i < count; i++) {
    // Use deterministic random for name selection
    const firstName = firstNames[Math.floor(random() * firstNames.length)];
    const lastName = lastNames[Math.floor(random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    
    members.push({
      id: `${parkSlug}-member-${i}`,
      name,
      initials,
      parkSlug,
      // Deterministically assign avatar URLs (70% chance of having an avatar)
      avatarUrl: random() > 0.3 ? `https://i.pravatar.cc/150?img=${(i % 70) + 1}` : undefined,
    });
  }
  
  return members;
}

// Fetch members from database
async function fetchMembersFromDatabase(parkSlug: string): Promise<Member[]> {
  const response = await fetch(`/api/parks/${parkSlug}/members`);
  if (!response.ok) {
    throw new Error("Failed to fetch park members");
  }
  
  const data = await response.json();
  
  return data.map((member: any) => {
    const user = member.user;
    const name = user ? 
      `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email.split('@')[0] : 
      'Anonymous';
      
    const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U';
    
    return {
      id: member.id,
      name,
      initials,
      avatarUrl: user?.profileImageUrl,
      parkSlug,
    };
  });
}

export function useParkMembers(parkSlug: string | null) {
  const [members, setMembers] = useState<Member[]>([]);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["park-members", parkSlug],
    queryFn: async () => {
      if (!parkSlug) return [];
      
      if (USE_MOCK_DATA) {
        // Generate different member counts for different parks
        const memberCounts: Record<string, number> = {
          "acacia-park-avengers": 47,
          "discovery-park-defenders": 52,
          "veterans-park-vipers": 38,
          "sunset-park-scorpions": 45,
        };
        
        const count = memberCounts[parkSlug] || 30;
        return generateMockMembers(parkSlug, count);
      }
      
      return fetchMembersFromDatabase(parkSlug);
    },
    enabled: !!parkSlug,
  });
  
  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);
  
  return {
    members,
    isLoading,
    error,
    totalCount: members.length,
  };
}