import { CustomAlert } from "@/components/custom-alert";
import { PageStructure } from "@/components/page-structure";
import { MESSAGES } from "@/constants/messages";
import { getUser } from "@/core/user/data/get-user";
import ProfileContent from "@/features/profile/components/content";
import ProfileSidebar from "@/features/profile/components/sidebar";
import { auth } from "@/lib/auth";
import { Session } from "@/types/session";
import { headers } from "next/headers";

interface Props {
  params: Promise<{ userId: string }>;
}

const ProfilePage = async ({ params }: Props) => {
  const { userId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await getUser(userId);

  if (!user)
    return (
      <PageStructure>
        <CustomAlert
          title={"Error!"}
          description={MESSAGES.USER_NOT_EXIST}
          variant="danger"
        />
      </PageStructure>
    );

  return (
    <PageStructure>
      <div className="flex flex-wrap gap-4 lg:gap-6">
        {/* TODO: create a context around these 2 components for user and session */}
        <div className="w-full space-y-6 md:w-1/3">
          <ProfileSidebar user={user} session={session || ({} as Session)} />
        </div>
        <div className="w-full space-y-6 md:w-[calc(66.666667%_-_24px)]">
          <ProfileContent user={user} session={session || ({} as Session)} />
        </div>
      </div>
    </PageStructure>
  );
};

export default ProfilePage;
