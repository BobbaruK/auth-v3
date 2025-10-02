import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prisma } from "@/generated/prisma";
import { Account } from "./account";
import { PersonalInformation } from "./personal-info";
import { Security } from "./security";

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

export const ProfileContent = ({ user }: Props) => {
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6">
        <PersonalInformation user={user} />
      </TabsContent>

      <TabsContent value="account" className="space-y-6">
        <Account user={user} />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Security user={user} />
      </TabsContent>
    </Tabs>
  );
};
