import { PageStructure } from "@/components/page-structure";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProfileContent } from "@/features/profile/components/profile-content";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { getUser } from "@/features/profile/data/get-user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { MdOutlineEmail } from "react-icons/md";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await getUser(session?.user.id || "");

  return (
    <PageStructure>
      {!user?.emailVerified && (
        <Alert variant="destructive">
          <MdOutlineEmail />
          <AlertTitle>Verify your email</AlertTitle>
          <AlertDescription>
            <p>Please confirm your new email address.</p>
          </AlertDescription>
        </Alert>
      )}
      {/* TODO: create a context around these 2 components (user, isPending, startTransition)  */}
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
    </PageStructure>
  );
};

export default ProfilePage;
