import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Key, Shield } from "lucide-react";
import { TwoFactor } from "./two-factor";
import { auth_user } from "@/generated/prisma";
import { ChangePassword } from "./change-password";

interface Props {
  user: auth_user | null;
}

export const Security = ({ user }: Props) => {
  return (
    <div className="space-y-4">
      <ChangePassword user={user} />
      <Separator />
      <TwoFactor user={user} />
      <Separator />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-base font-medium">Active Sessions</p>
          <p className="text-muted-foreground text-sm">
            Manage devices that are logged into your account
          </p>
        </div>
        <Button variant="outline">
          <Shield className="mr-2 h-4 w-4" />
          View Sessions
        </Button>
      </div>
    </div>
  );
};
