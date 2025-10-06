"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole } from "../action";  
import { createClient } from "@/lib/supabase/client";
import { Switch } from "@/components/ui/switch"; 
import Table from "@/components/custom/Table";
import { ColumnDef, Row } from '@tanstack/react-table';

interface User {
  id: string;
  full_name?: string;
  email?: string;
  role: "USER" | "ADMIN";
  created_at: string;
}

const UsersTable = () => {
  const supabase = createClient();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const { data: { session } } = await supabase.auth.getSession();
        console.log("fetchUsers :-", session);

        if (!session || !session.user) {
          router.push("/");
          return;
        }

        // Check if admin
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          setError("Failed to check permissions");
          return;
        }

        if (!profile || profile.role !== "ADMIN") {
          router.push("/");
          return;
        }

        // Fetch all profiles (RLS allows admins)
        const { data: fetchedUsers, error: fetchError } = await supabase
          .from("profiles")
          .select(`
            id,
            full_name,
            email,
            role,
            created_at
          `)
          .order("created_at", { ascending: false });

        if (fetchError) {
          console.error("Fetch users error:", fetchError);
          throw new Error("Failed to load users");
        }

        setUsers((fetchedUsers || []).map((user) => ({
          id: user.id,
          full_name: user.full_name ?? undefined,
          email: user.email ?? undefined,
          role: user.role as "USER" | "ADMIN",
          created_at: user.created_at,
        })));
      } catch (err) {
        console.error("Error in fetchUsers:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [supabase, router]);

  const columns: ColumnDef<User>[] = [
    { accessorKey: "full_name", header: "Name" },
    { accessorKey: "email", header: "Email ID" },
    { accessorKey: "role", header: "Role" },
    { 
      accessorKey: "actions", 
      header: "Actions", 
      cell: ({ row }: { row: Row<User> }) => (
        <Switch
          checked={row.original.role === "ADMIN"}
          onCheckedChange={async (checked) => {
            const newRole = checked ? "ADMIN" : "USER";
            try {
              await updateUserRole(row.original.id, newRole);
              const updatedUsers = users.map(user =>
                user.id === row.original.id ? { ...user, role: newRole } : user
              ) as User[]; 
              setUsers(updatedUsers);
            } catch (error) {
              console.error("Failed to update role:", error);
              alert("Error updating role: " + (error instanceof Error ? error.message : "Unknown error"));
            }
          }}
          className="data-[state=checked]:bg-blue-600"
          aria-label={`Set role to ${row.original.role === "ADMIN" ? "USER" : "ADMIN"}`}
        />
      )
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
        <div className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleString("en-US", { 
            month: "short", day: "numeric", year: "numeric", 
            hour: "2-digit", minute: "2-digit" 
          })}
        </div>
      </div>

      <Table columns={columns} data={users} classes={{ toolbar: "flex-row-reverse justify-between item-center" }} />
     
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">No users found.</div>
      )}
    </div>
  );
};

export default UsersTable;