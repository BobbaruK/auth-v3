import { Badge } from "@/components/ui/badge";
import { Prisma } from "@/generated/prisma";
import { TwoFactorDialog } from "./dialog";

interface Props {
  user: Prisma.auth_userGetPayload<{
    include: {
      accounts: {
        select: {
          providerId: true;
        };
      };
    };
  }>;
}

export const TwoFactor = ({ user }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Two-Factor Authentication</p>
        <p className="text-muted-foreground text-sm">
          Add an extra layer of security to your account
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={user?.twoFactorEnabled ? "success" : "warning"}>
          {user?.twoFactorEnabled ? "Enabled" : "Disabled"}
        </Badge>
        <TwoFactorDialog user={user} />
      </div>
    </div>
  );
};
