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

// Generate mock members for a park
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
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    
    members.push({
      id: `${parkSlug}-member-${i}`,
      name,
      initials,
      parkSlug,
      // Randomly assign avatar URLs (30% chance of having an avatar)
      avatarUrl: Math.random() > 0.7 ? undefined : `https://i.pravatar.cc/150?img=${i + 1}`,
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