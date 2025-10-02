import { CustomAlert } from "@/components/custom-alert";
import { PageStructure } from "@/components/page-structure";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MESSAGES } from "@/constants/messages";
import { getUser } from "@/core/user/data/get-user";
import { ProfileContent } from "@/features/settings/components/profile-content";
import { ProfileHeader } from "@/features/settings/components/profile-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { MdOutlineEmail } from "react-icons/md";

const SettingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await getUser(session?.user.id || "");

  if (!user)
    return (
      <PageStructure>
        <CustomAlert
          title={"Error!"}
          description={MESSAGES.USER_NOT_EXIST}
          variant="destructive"
        />
      </PageStructure>
    );

  return (
    <PageStructure>
      {!user.emailVerified && (
        <Alert variant="destructive">
          <MdOutlineEmail />
          <AlertTitle>Verify your email</AlertTitle>
          <AlertDescription>
            <p>Please confirm your new email address.</p>
          </AlertDescription>
        </Alert>
      )}
      {/* TODO: create a context around these 2 components (user, isPending, startTransition)  */}
      <ProfileHeader
        data={{
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.displayUsername || user.firstName,
          role: user.role,
          image: user.image,
          meta: {
            email: user.email,
            joined: user.createdAt,
          },
        }}
      />
      <ProfileContent user={user} />
    </PageStructure>
  );
};

export default SettingsPage;
