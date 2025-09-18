import { PageStructure } from "@/components/page-structure";
import { loadSearchParams } from "@/components/search-params";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
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
      <h1 className="text-3xl font-bold">2FA verification</h1>

      <OTPVerificationForm
        otpLink={twoFactor}
        isFirstTime={twoFactorFirstTime}
      />
    </PageStructure>
  );
};

export default TwoFactorVerificationPage;
