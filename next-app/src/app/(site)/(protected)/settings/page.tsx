import { CustomAlert } from "@/components/custom-alert";
import { EnvelopeIcon } from "@/components/icons/envelope";
import { PageStructure } from "@/components/page-structure";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MESSAGES } from "@/constants/messages";
import { getUser } from "@/core/user/data/get-user";
import SettingsContent from "@/features/settings/components/settings-content";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
          <EnvelopeIcon />
          <AlertTitle>Verify your email</AlertTitle>
          <AlertDescription>
            <p>Please confirm your new email address.</p>
          </AlertDescription>
        </Alert>
      )}

      <SettingsContent user={user} />
    </PageStructure>
  );
};

export default SettingsPage;
