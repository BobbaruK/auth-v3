import { PageStructure } from "@/components/page-structure";
import { getSession } from "@/core/auth/data/session";
import { ProfileContent } from "@/features/profile/components/profile-content";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { getUser } from "@/features/profile/data/get-user";

const ProfilePage = async () => {
  const session = await getSession();

  const user = await getUser(session?.user.id || "");

  return (
    <PageStructure>
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
    </PageStructure>
  );
};

export default ProfilePage;
