"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { FileText, LogOut, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
        <div className=" items-center gap-2 ">
          <Button variant="ghost" className={cn("rounded-lg text-sm text-white bg-transparent hover:bg-transparent", pathname === '/offers' && "text-green-500 hover:text-green-500")} onClick={() => router.push('/offers')}>
            OFFERS
          </Button>
          <Button variant="ghost" className={cn("rounded-lg text-sm text-white bg-transparent hover:bg-transparent", pathname === '/users' && "text-green-500 hover:text-green-500")} onClick={() => router.push('/users')}>
            USERS
          </Button>
          <Button variant="ghost" className={cn("rounded-lg text-sm text-white bg-transparent hover:bg-transparent", pathname === '/reports' && "text-green-500 hover:text-green-500")} onClick={() => router.push('/reports')}>
            REPORTS
          </Button>
        </div>
      );
    }
    return null; // No admin nav for non-admin users
  }

  if (session) {
    return (
      <>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="rounded-lg text-sm border border-green-500 text-white bg-transparent hover:bg-transparent flex md:hidden ">
              <Menu className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 ml-2" align="start">
            <div className="flex flex-col space-y-0">
              {role === 'ADMIN' && (<> <Button
                variant="ghost"
                className={cn(
                  "justify-start text-sm text-white hover:bg-transparent hover:text-green-500 w-full",
                  pathname === '/offers' && "text-green-500"
                )}
                onClick={() => router.push('/offers')}
              >
                <LogOut className="mr-2 h-4 w-4" />
                OFFERS
              </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "justify-start text-sm text-white hover:bg-transparent hover:text-green-500 w-full",
                    pathname === '/users' && "text-green-500"
                  )}
                  onClick={() => router.push('/users')}
                >
                  <User className="mr-2 h-4 w-4" />
                  USERS
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "justify-start text-sm text-white hover:bg-transparent hover:text-green-500 w-full",
                    pathname === '/reports' && "text-green-500"
                  )}
                  onClick={() => router.push('/reports')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  REPORTS
                </Button> </>)}
              <Button
                variant="ghost"
                className="justify-start text-sm text-white hover:bg-transparent hover:text-green-500 w-full"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                SIGN OUT
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <div className=" items-center gap-4 hidden md:flex">
          {renderDifferentAdminNav()}
          <Button variant="ghost" className="rounded-lg text-sm border border-green-500 text-white bg-transparent hover:bg-transparent " onClick={logout}>
            <LogOut /> SIGN OUT
          </Button>
        </div>
      </>
    );
  }

  return null;
}