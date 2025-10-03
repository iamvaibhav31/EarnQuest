"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation"; 
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const pathname = usePathname(); 
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const goToReports = () => {
    router.push('/reports');
  }

  const goToOffers = () => {
    router.push('/offers');
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        {pathname === '/reports' ? (
          <Button variant="ghost" className="rounded-lg text-sm text-white bg-transparent hover:bg-transparent" onClick={goToOffers}>
            OFFERS
          </Button>
        ) : <Button variant="ghost" className="rounded-lg text-sm text-white bg-transparent hover:bg-transparent" onClick={goToReports}>
          REPORTS
        </Button>}

        <Button variant="ghost" className="rounded-lg text-sm border border-green-500 text-white bg-transparent hover:bg-transparent" onClick={logout}>
          <LogOut /> SIGN OUT
        </Button>
      </div>
    );
  }

  return null;
}