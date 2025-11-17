import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

type Profile = {
  id: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
};

type UpdateResult = { error: null } | { error: string };

export function useProfileSettings() {
  const { user, supabase } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !supabase) return;
    fetchProfile();
  }, [user, supabase]);

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile({
        ...data,
        email: user.email,
      });
    }

    setLoading(false);
  };

  const updateProfile = async (
    updates: Partial<Profile>
  ): Promise<UpdateResult> => {
    if (!user) return { error: "Not logged in" };

    try {
      const { full_name, avatar_url, email } = updates;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name, avatar_url })
        .eq("id", user.id);

      if (profileError) throw profileError;

      const { error: userError } = await supabase.auth.updateUser({
        email,
        data: { full_name },
      });

      if (userError) throw userError;

      await fetchProfile();
      return { error: null };
    } catch (err) {
      console.error("Update profile failed:", err);
      return { error: err instanceof Error ? err.message : "Unknown error" };
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
    repeatPassword: string
  ): Promise<UpdateResult> => {
    if (!user) return { error: "Not logged in" };
    if (newPassword !== repeatPassword) {
      return { error: "Passwords do not match" };
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword,
      });

      if (signInError) throw new Error("Current password incorrect");

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      return { error: null };
    } catch (err) {
      console.error("Password update failed:", err);
      return { error: err instanceof Error ? err.message : "Unknown error" };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    updatePassword,
    refetch: fetchProfile,
  };
}
