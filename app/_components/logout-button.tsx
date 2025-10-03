"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

export default function LogoutButton() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const supabase = createClient(); // Sync for client-side

  useEffect(() => {
    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log({session},"SESSION IN LOGOUT BUTTON")
      setSession(session);
    });

    // Listen for auth changes (e.g., sign in/out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, [supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (session) {
    return (
      <Button variant="ghost" onClick={logout}>
        Logout
      </Button>
    );
  }

  return null;
}