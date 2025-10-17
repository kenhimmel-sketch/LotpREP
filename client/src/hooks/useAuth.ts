import { useQuery, type QueryFunction } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { User } from "@shared/schema";

// Create a stable queryFn outside the hook to prevent recreating on each render
const authQueryFn: QueryFunction<User | null> = getQueryFn({ on401: "returnNull" }) as QueryFunction<User | null>;

export function useAuth() {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: authQueryFn,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    user: user || undefined,
    isLoading,
    isAuthenticated: !!user,
  };
}
