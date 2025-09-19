import { PageStructure } from "@/components/page-structure";
import { loadSearchParams } from "@/components/search-params";
import { MESSAGES } from "@/constants/messages";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { AuthCard } from "@/core/auth/components/auth-card";
import { OTPVerificationForm } from "@/core/auth/components/otp-verification-form";
import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>;
}

const TwoFactorVerificationPage = async ({ searchParams }: Props) => {
  const { twoFactor, twoFactorFirstTime } =
    await loadSearchParams(searchParams);
  const cookieStore = await cookies();
  const twoFactorCookie = cookieStore.get("better-auth.two_factor");
  const session = await auth.api.getSession({ headers: await headers() });

  if (session && !twoFactorFirstTime) redirect(DEFAULT_LOGIN_REDIRECT);

  if (!twoFactorCookie && !twoFactorFirstTime) redirect("/login");

  return (
    <PageStructure>
      <AuthCard
        title={"2FA Verification"}
        description={
          twoFactorFirstTime ? MESSAGES.QR_SCAN : MESSAGES.ENTER_OTP
        }>
        <OTPVerificationForm
          otpLink={twoFactor}
          isFirstTime={twoFactorFirstTime}
        />
      </AuthCard>
    </PageStructure>
  );
};

export default TwoFactorVerificationPage;
