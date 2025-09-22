import { PageStructure } from "@/components/page-structure";
import { ProfileContent } from "@/features/profile/components/profile-content";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { getUser } from "@/features/profile/data/get-user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await getUser(session?.user.id || "");

  return (
    <PageStructure>
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
    </PageStructure>
  );
};

export default ProfilePage;
