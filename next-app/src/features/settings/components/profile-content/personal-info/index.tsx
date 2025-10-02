import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@/generated/prisma";
import { PersonalForm } from "./personal-form";

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

export const PersonalInformation = ({ user }: Props) => {
  return (
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
  );
};
