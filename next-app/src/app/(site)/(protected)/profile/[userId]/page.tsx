import { PageStructure } from "@/components/page-structure";
import { getUser } from "@/core/user/data/get-user";
import { ProfileHeader } from "@/features/settings/components/profile-header";

interface Props {
  params: Promise<{ userId: string }>;
}

const ProfilePage = async ({ params }: Props) => {
  const { userId } = await params;

  const user = await getUser(userId);

  return (
    <PageStructure>
      <ProfileHeader user={user} />
    </PageStructure>
  );
};

export default ProfilePage;
