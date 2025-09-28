import { Separator } from "@/components/ui/separator";
import { Prisma } from "@/generated/prisma";
import { ChangePassword } from "./change-password";
import { ActiveSessions as Sessions } from "./sessions";
import { TwoFactor } from "./two-factor";

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

export const Security = ({ user }: Props) => {
  return (
    <div className="space-y-4">
      <ChangePassword user={user} />
      <Separator />
      <TwoFactor user={user} />
      <Separator />
      <Sessions />
    </div>
  );
};
