import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChangePassword } from "./change-password";
import { Sessions } from "./sessions";
import { TwoFactor } from "./two-factor";

export const Security = () => {
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
          <ChangePassword />
          <Separator />
          <TwoFactor />
          <Separator />
          <Sessions />
        </div>
      </CardContent>
    </Card>
  );
};
