import { PageStructure } from "@/components/page-structure";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { AuthCard } from "@/core/auth/components/auth-card";
import { RecoverAccountForm } from "@/core/auth/components/recover-account-form";
import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const RecoverAccountPage = async () => {
  const cookieStore = await cookies();
  const twoFactorCookie = cookieStore.get("better-auth.two_factor");
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) redirect(DEFAULT_LOGIN_REDIRECT);

  if (!twoFactorCookie) redirect("/login");
  return (
    <PageStructure>
      <AuthCard title={"Recover account"} description={"Enter your code"}>
        <RecoverAccountForm />
      </AuthCard>
    </PageStructure>
  );
};

export default RecoverAccountPage;
