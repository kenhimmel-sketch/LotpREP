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
const USE_MOCK_DATA = true; // Set to false when Supabase table is ready

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

// Fetch members from Supabase (when available)
async function fetchMembersFromSupabase(parkSlug: string): Promise<Member[]> {
  // TODO: Implement when Supabase user_profiles table is ready
  // const { data, error } = await supabase
  //   .from('user_profiles')
  //   .select('id, display_name, avatar_url')
  //   .eq('park_slug', parkSlug);
  
  // if (error) throw error;
  
  // return data.map(profile => ({
  //   id: profile.id,
  //   name: profile.display_name,
  //   initials: profile.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
  //   avatarUrl: profile.avatar_url,
  //   parkSlug,
  // }));
  
  // For now, return empty array
  return [];
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
      
      return fetchMembersFromSupabase(parkSlug);
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