// Page 11-13: Users Table
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const users = [
  { name: "Fawaz Ahamed", email: "Fawaz.a@greedygame.com", role: "Super Admin", active: true },
  { name: "Prabeen", email: "Prab@greedygame.com", role: "Viewer", active: false },
  { name: "Rahul Singh", email: "Rahul.S@greedygame.com", role: "Viewer", active: false },
];

export default function UsersPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-card rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold mb-2">All Users</h2>
          <p className="text-sm text-muted-foreground">Last Updated : 16/08/2023 18:00</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch checked={user.active} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}