import { CustomAlert } from "@/components/custom-alert";
import { PageStructure } from "@/components/page-structure";
import { MESSAGES } from "@/constants/messages";
import { getUser } from "@/core/user/data/get-user";
import ProfileContent from "@/features/profile/components/content";
import ProfileSidebar from "@/features/profile/components/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).userId;

  const user = await getUser({
    where: {
      slug,
    },
  });

  return {
    title: user?.displayUsername,
  };
}

const ProfilePage = async ({ params }: Props) => {
  const { userId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await getUser({
    where: {
      slug: userId,
    },
  });

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
          <ProfileSidebar user={user} session={session} />
        </div>
        <div className="w-full space-y-6 md:w-[calc(66.666667%-24px)]">
          <ProfileContent user={user} session={session} />
        </div>
      </div>
    </PageStructure>
  );
};

export default ProfilePage;
