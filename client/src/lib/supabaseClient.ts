export type SupabaseUser = {
  id: string;
  email?: string | null;
  phone?: string | null;
  user_metadata?: Record<string, unknown> | null;
};

export type SupabaseAuthChangeHandler = (
  event: string,
  session: { user: SupabaseUser | null } | null,
) => void;

export type SupabaseAuthApi = {
  getUser: () => Promise<{ data: { user: SupabaseUser | null }; error: unknown | null }>;
  onAuthStateChange: (
    callback: SupabaseAuthChangeHandler,
  ) => {
    data?: { subscription?: { unsubscribe?: () => void } };
  };
  signInWithOtp: (params: { email?: string; phone?: string; options?: Record<string, unknown> }) => Promise<{
    error: unknown | null;
  }>;
  updateUser: (payload: { data: Record<string, unknown> }) => Promise<{ error: unknown | null }>;
  signOut: () => Promise<{ error: unknown | null }>;
};

export type SupabaseClient = {
  auth: SupabaseAuthApi;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let cachedClient: SupabaseClient | null = null;
let loadingPromise: Promise<SupabaseClient | null> | null = null;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

type SupabaseModule = {
  createClient: (url: string, anonKey: string, options?: Record<string, unknown>) => SupabaseClient;
};

async function loadSupabaseModule(): Promise<SupabaseModule | null> {
  try {
    const mod = await import(
      /* @vite-ignore */ "https://esm.sh/@supabase/supabase-js@2.47.1"
    );
    return mod as SupabaseModule;
  } catch (error) {
    console.warn("Supabase SDK could not be loaded from CDN.", error);
    return null;
  }
}

export async function getSupabaseClient(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return null;
  if (cachedClient) return cachedClient;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const mod = await loadSupabaseModule();
    if (!mod) return null;
    cachedClient = mod.createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        detectSessionInUrl: true,
        storageKey: "lotp-supabase-session",
      },
    });
    return cachedClient;
  })();

  const client = await loadingPromise;
  loadingPromise = null;
  return client;
}
