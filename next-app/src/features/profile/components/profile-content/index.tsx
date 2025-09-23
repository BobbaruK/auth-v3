import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth_user } from "@/generated/prisma";
import { Key, Shield } from "lucide-react";
import { Account } from "./account";
import { DeleteAccount } from "./account/delete-account";
import { PersonalForm } from "./personal-form";

interface Props {
  user: auth_user | null;
}

export const ProfileContent = ({ user }: Props) => {
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      {/* Personal Information */}
      <TabsContent value="personal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <PersonalForm user={user} />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Account Settings */}
      <TabsContent value="account" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and subscription.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Account user={user} />
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
      </TabsContent>

      {/* Security Settings */}
      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security and authentication.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Password</Label>
                  <p className="text-muted-foreground text-sm">
                    Last changed 3 months ago
                  </p>
                </div>
                <Button variant="outline">
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-muted-foreground text-sm">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    Enabled
                  </Badge>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Active Sessions</Label>
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
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
