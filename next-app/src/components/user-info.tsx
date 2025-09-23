import { Card, CardContent } from "@/components/ui/card";
import { UserSession } from "@/types/session";
import { Badge } from "./ui/badge";

interface Props {
  user?: UserSession | null;
}

export const UserInfo = ({ user }: Props) => {
  return (
    <Card className="shadow-md">
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs text-black">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs text-black">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">First Name</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs text-black">
            {user?.firstName}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Last Name</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs text-black">
            {user?.lastName}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Username</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs text-black">
            {user?.displayUsername}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs text-black">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs text-black">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">2FA</p>
          <Badge variant={user?.twoFactorEnabled ? "default" : "destructive"}>
            {user?.twoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
