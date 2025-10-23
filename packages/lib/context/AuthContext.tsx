"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

type AuthContextType = {
  user: any;
  setUser: (user: any) => void;
  supabase: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: any;
}) => {
  const [user, setUser] = useState(initialUser ?? null);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    const initSupabase = async () => {
      const isExpo =
        typeof navigator !== "undefined" && navigator.product === "ReactNative";

      if (isExpo) {
        const { supabase: nativeClient } = await import(
          "@routly/lib/supabase/client.native"
        );
        setSupabase(nativeClient);
      } else {
        const webClient = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
        );
        setSupabase(webClient);
      }
    };

    initSupabase();
  }, []);

  useEffect(() => {
    if (!supabase) return;

    const loadUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user) {
        setUser(sessionData.session.user);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        setUser(userData.user);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: any, session: { user: any }) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, setUser, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
