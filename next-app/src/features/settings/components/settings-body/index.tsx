import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Account } from "./account";
import { PersonalInformation } from "./personal-info";
import { Security } from "./security";

export const SettingsBody = () => {
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6">
        <PersonalInformation />
      </TabsContent>

      <TabsContent value="account" className="space-y-6">
        <Account />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Security />
      </TabsContent>
    </Tabs>
  );
};
