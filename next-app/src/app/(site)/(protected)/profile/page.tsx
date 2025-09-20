import { PageStructure } from "@/components/page-structure";
import { ProfileContent } from "@/features/profile/components/profile-content";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <PageStructure>
      <ProfileHeader user={session?.user} />

      <ProfileContent />
    </PageStructure>
  );
};

export default ProfilePage;
