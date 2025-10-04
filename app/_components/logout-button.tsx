"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LogoutButton() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);  // New: Track role
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        // Fetch role
        supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setRole(data?.role || 'USER'));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
            .then(({ data }) => setRole(data?.role || 'USER'));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const renderDifferentAdminNav = () => {
    if (role === 'ADMIN') {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" className={cn("rounded-lg text-sm text-white bg-transparent hover:bg-transparent" ,pathname === '/offers' && "text-green-500 hover:text-green-500" )} onClick={() => router.push('/offers')}>
            OFFERS
          </Button>
          <Button variant="ghost" className={cn("rounded-lg text-sm text-white bg-transparent hover:bg-transparent" ,pathname === '/users' && "text-green-500 hover:text-green-500")} onClick={() => router.push('/users')}>
            USERS
          </Button>
          <Button variant="ghost" className={cn("rounded-lg text-sm text-white bg-transparent hover:bg-transparent" ,pathname === '/reports' && "text-green-500 hover:text-green-500")} onClick={() => router.push('/reports')}>
            REPORTS
          </Button>
        </div>
      );
    }
    return null; // No admin nav for non-admin users
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        {renderDifferentAdminNav()}
        <Button variant="ghost" className="rounded-lg text-sm border border-green-500 text-white bg-transparent hover:bg-transparent" onClick={logout}>
          <LogOut /> SIGN OUT
        </Button>
      </div>

    );
  }

  return null;
}