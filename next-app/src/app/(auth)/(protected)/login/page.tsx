import { PageStructure } from "@/components/page-structure";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/core/auth/components/auth-card";
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
      <AuthCard
        title={"Welcome back"}
        description={"Login with your credentials"}>
        <SignInForm session={session} />

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <SignInProviders />

        <div className="flex gap-1 items-center flex-wrap">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account.
          </p>
          <Button
            size={"sm"}
            variant={"link"}
            asChild
            className="px-0 font-normal text-foreground">
            <Link href={"/register"}>Register</Link>
          </Button>
        </div>
      </AuthCard>
    </PageStructure>
  );
};

export default LoginPage;
