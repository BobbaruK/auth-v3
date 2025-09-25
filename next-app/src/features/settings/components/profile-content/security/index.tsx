import { Separator } from "@/components/ui/separator";
import { auth_user } from "@/generated/prisma";
import { ChangePassword } from "./change-password";
import { ActiveSessions as Sessions } from "./sessions";
import { TwoFactor } from "./two-factor";

interface Props {
  user: auth_user | null;
}

export const Security = ({ user }: Props) => {
  return (
    <div className="space-y-4">
      <ChangePassword />
      <Separator />
      <TwoFactor user={user} />
      <Separator />
      <Sessions />
    </div>
  );
};
