import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@/generated/prisma";
import { ChangePassword } from "./password";
import { Sessions } from "./sessions";
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
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security and authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <ChangePassword user={user} />
          <Separator />
          <TwoFactor user={user} />
          <Separator />
          <Sessions />
        </div>
      </CardContent>
    </Card>
  );
};
