import { PageStructure } from "@/components/page-structure";
import { SignInForm } from "@/core/auth/components/sign-in-form";
import SignInProviders from "@/core/auth/components/sign-in-providers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Login</h1>

      <SignInForm session={session} />

      <SignInProviders />

      <p className="text-muted-foreground text-sm">
        Don&apos;t have an account. <Link href={"/register"}>Register</Link>
      </p>
    </PageStructure>
  );
};

export default LoginPage;
