import { CustomButton } from "@/components/custom-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth_user } from "@/generated/prisma";
import { AccountVisibility } from "./account-visibility";
import { ChangeEmail } from "./change-email";
import { DeleteAccount } from "./delete-account";

interface Props {
  user: auth_user | null;
}

export const Account = ({ user }: Props) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and subscription.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <ChangeEmail user={user} />
            <Separator />
            <AccountVisibility user={user} />
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-base font-medium">Data Export</p>
                <p className="text-muted-foreground text-sm">
                  Download a copy of your data
                </p>
              </div>
              <CustomButton
                buttonLabel="Export Data"
                variant="outline"
                disabled={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/50 shadow-danger">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccount />
        </CardContent>
      </Card>
    </>
  );
};
