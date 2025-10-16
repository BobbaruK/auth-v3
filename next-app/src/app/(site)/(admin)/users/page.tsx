import { CustomAvatar } from "@/components/custom-avatar";
import { PageStructure } from "@/components/page-structure";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminActions from "@/core/auth/components/admin-actions";
import { getUsers } from "@/core/auth/data/get-users";
import { auth } from "@/lib/auth";
import { dateFormatter } from "@/lib/utils/format-date";
import { UserSession } from "@/types/session";
import { headers } from "next/headers";

const UsersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const usersData = await getUsers();
  const users = usersData?.data as UserSession[];
  const totalUsers = usersData?.total;

  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Users ({totalUsers})</h1>

      <Table className="border">
        <TableCaption>A list of all users using this app.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="space-y-4">
                <div className="flex items-center gap-2">
                  <CustomAvatar image={user.image} />
                  <div className="space-y-1">
                    <p>
                      {user.lastName} &quot;{user.displayUsername}&quot;{" "}
                      {user.firstName}
                    </p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {session?.user.id === user.id && (
                    <Badge variant="info">You</Badge>
                  )}
                  {user.banned && <Badge variant={"danger"}>Banned</Badge>}
                  <Badge variant={user.emailVerified ? "outline" : "warning"}>
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>
              <TableCell>
                {dateFormatter({
                  date: user.createdAt,
                  options: { dateStyle: "medium" },
                })}
              </TableCell>
              <TableCell>
                <AdminActions session={session} user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <pre>{JSON.stringify(usersData, null, 2)}</pre>
      </div>
    </PageStructure>
  );
};

export default UsersPage;
