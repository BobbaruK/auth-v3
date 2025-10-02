import { CustomAlert } from "@/components/custom-alert";
import { AccountIcon } from "@/components/icons/account";
import { PageStructure } from "@/components/page-structure";
import { MESSAGES } from "@/constants/messages";
import { getUser } from "@/core/user/data/get-user";
import { ProfileHeader } from "@/features/settings/components/profile-header";
import { auth } from "@/lib/auth";
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

  const sameUser = () => (session?.user.id === userId ? true : false);
  const isSameUser = sameUser();

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
      {isSameUser && !user.isAccountVisible && (
        <CustomAlert
          title={"Attention!"}
          description={"Your account visibility is set tot private."}
          variant="warning"
          icon={<AccountIcon />}
        />
      )}
      <ProfileHeader
        data={{
          firstName: isSameUser
            ? user.firstName
            : user.isAccountVisible
              ? user.firstName
              : undefined,
          lastName: isSameUser
            ? user.lastName
            : user.isAccountVisible
              ? user.lastName
              : undefined,
          username: user.displayUsername || user.firstName,
          role: isSameUser
            ? user.role
            : user.isAccountVisible
              ? user.role
              : undefined,
          image: user.image,
          meta: isSameUser
            ? {
                email: user.email,
                joined: user.createdAt,
              }
            : user.isAccountVisible
              ? {
                  email: user.email,
                  joined: user.createdAt,
                }
              : undefined,
        }}
      />

      {user.isAccountVisible && (
        <p>{user.bio || "This user does not have a bio yet."}</p>
      )}
    </PageStructure>
  );
};

export default ProfilePage;
