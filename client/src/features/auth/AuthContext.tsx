import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  getSupabaseClient,
  isSupabaseConfigured,
  type SupabaseClient,
  type SupabaseUser,
} from "@/lib/supabaseClient";
import type { ParkSlug } from "@/data/parks";

export type AuthUser = {
  id: string;
  email: string;
  phone?: string | null;
  parkSlug?: ParkSlug | null;
};

type AuthResponse = {
  status: "otp-sent" | "signed-in";
  message: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signInWithEmail: (email: string, parkSlug?: ParkSlug | null) => Promise<AuthResponse>;
  signInWithPhone: (phone: string, parkSlug?: ParkSlug | null) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  selectPark: (parkSlug: ParkSlug) => Promise<void>;
  supabaseEnabled: boolean;
};

const LOCAL_AUTH_KEY = "lotp-auth-user";
const PENDING_PARK_KEY = "lotp-pending-park";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type SerializedAuthUser = {
  id: string;
  email: string;
  phone?: string | null;
  parkSlug?: ParkSlug | null;
};

function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}

function readLocalUser(): SerializedAuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(LOCAL_AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SerializedAuthUser;
  } catch (error) {
    console.warn("Failed to parse cached auth user", error);
    return null;
  }
}

function writeLocalUser(user: SerializedAuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(LOCAL_AUTH_KEY);
  }
}

function readPendingPark(): ParkSlug | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(PENDING_PARK_KEY);
  return (value as ParkSlug | null) ?? null;
}

function writePendingPark(value: ParkSlug | null) {
  if (typeof window === "undefined") return;
  if (value) {
    window.localStorage.setItem(PENDING_PARK_KEY, value);
  } else {
    window.localStorage.removeItem(PENDING_PARK_KEY);
  }
}

function mapSupabaseUser(user: SupabaseUser | null): AuthUser | null {
  if (!user) return null;
  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  const parkSlug = (metadata.parkSlug || metadata.park_slug || metadata.park) as
    | ParkSlug
    | undefined;
  return {
    id: user.id,
    email: user.email ?? "",
    phone: user.phone,
    parkSlug: parkSlug ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (isSupabaseConfigured) return null;
    return readLocalUser();
  });
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured);
  const [pendingPark, setPendingPark] = useState<ParkSlug | null>(() => readPendingPark());
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    getSupabaseClient().then((client) => {
      if (!active) return;
      setSupabaseClient(client);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabaseClient) return;

    let mounted = true;
    const loadUser = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient.auth.getUser();
      if (!mounted) return;
      if (error) {
        console.error("Supabase auth error", error);
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(mapSupabaseUser(data.user));
      setLoading(false);
    };

    loadUser();

    const { data: subscription } = supabaseClient.auth.onAuthStateChange((_, session) => {
      setUser(mapSupabaseUser(session?.user ?? null));
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.subscription?.unsubscribe?.();
    };
  }, [supabaseClient]);

  useEffect(() => {
    if (isSupabaseConfigured) return;
    writeLocalUser(user);
  }, [user]);

  useEffect(() => {
    writePendingPark(pendingPark);
  }, [pendingPark]);

  useEffect(() => {
    if (!pendingPark || !user) return;

    if (isSupabaseConfigured) {
      ensureSupabaseClient().then((client) => {
        if (!client) return;
        client.auth
          .updateUser({
            data: {
              parkSlug: pendingPark,
            },
          })
          .then(({ error }) => {
            if (error) {
              console.error("Failed to store park preference", error);
              return;
            }
            setUser((prev) => (prev ? { ...prev, parkSlug: pendingPark } : prev));
            setPendingPark(null);
          });
      });
    } else {
      setUser((prev) => (prev ? { ...prev, parkSlug: pendingPark } : prev));
      setPendingPark(null);
    }
  }, [pendingPark, user, ensureSupabaseClient]);

  const ensureSupabaseClient = useCallback(async () => {
    if (!isSupabaseConfigured) return null;
    if (supabaseClient) return supabaseClient;
    const loaded = await getSupabaseClient();
    setSupabaseClient(loaded);
    return loaded;
  }, [supabaseClient]);

  const signInWithEmail = useCallback<
    AuthContextValue["signInWithEmail"]
  >(async (email, parkSlug) => {
    if (!email) {
      throw new Error("Email is required");
    }

    if (isSupabaseConfigured) {
      const client = await ensureSupabaseClient();
      if (client) {
        const redirectTo =
          typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined;
        const { error } = await client.auth.signInWithOtp({
          email,
          options: {
            data: parkSlug ? { parkSlug } : undefined,
            emailRedirectTo: redirectTo,
          },
        });
        if (error) {
          throw error as Error;
        }
        if (parkSlug) {
          setPendingPark(parkSlug);
        }
        return {
          status: "otp-sent",
          message: "Magic link sent. Confirm the email to finish signing in.",
        };
      }
    }

    const nextUser: AuthUser = {
      id: generateId(),
      email,
      parkSlug: parkSlug ?? null,
    };
    setUser(nextUser);
    return {
      status: "signed-in",
      message: "Signed in locally. Configure Supabase for production auth.",
    };
  }, [ensureSupabaseClient]);

  const signInWithPhone = useCallback<
    AuthContextValue["signInWithPhone"]
  >(async (phone, parkSlug) => {
    if (!phone) {
      throw new Error("Phone number is required");
    }

    if (isSupabaseConfigured) {
      const client = await ensureSupabaseClient();
      if (client) {
        const { error } = await client.auth.signInWithOtp({
          phone,
          options: {
            data: parkSlug ? { parkSlug } : undefined,
          },
        });
        if (error) {
          throw error as Error;
        }
        if (parkSlug) {
          setPendingPark(parkSlug);
        }
        return {
          status: "otp-sent",
          message: "Text message sent. Enter the one-time code from Supabase to finish.",
        };
      }
    }

    const nextUser: AuthUser = {
      id: generateId(),
      email: `${phone}@lotp.local`,
      phone,
      parkSlug: parkSlug ?? null,
    };
    setUser(nextUser);
    return {
      status: "signed-in",
      message: "Phone session simulated locally.",
    };
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      const client = await ensureSupabaseClient();
      if (client) {
        const { error } = await client.auth.signOut();
        if (error) {
          console.error("Failed to sign out", error);
        }
      }
    }
    setUser(null);
    setPendingPark(null);
    if (!isSupabaseConfigured) {
      writeLocalUser(null);
    }
  }, [ensureSupabaseClient]);

  const selectPark = useCallback(async (parkSlug: ParkSlug) => {
    if (isSupabaseConfigured) {
      const client = await ensureSupabaseClient();
      if (client) {
        const { error } = await client.auth.updateUser({
          data: { parkSlug },
        });
        if (error) {
          throw error as Error;
        }
      }
    }
    setUser((prev) => (prev ? { ...prev, parkSlug } : prev));
    if (!isSupabaseConfigured) {
      writeLocalUser({
        id: user?.id ?? generateId(),
        email: user?.email ?? "",
        phone: user?.phone,
        parkSlug,
      });
    }
  }, [ensureSupabaseClient, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signInWithEmail,
      signInWithPhone,
      signOut,
      selectPark,
      supabaseEnabled: isSupabaseConfigured,
    }),
    [user, loading, signInWithEmail, signInWithPhone, signOut, selectPark],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
