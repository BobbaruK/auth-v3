import { PageStructure } from "@/components/page-structure";
import TextSeparator from "@/components/text-separator";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/core/auth/components/auth-card";
import { SignInForm } from "@/core/auth/components/sign-in-form";
import SignInProviders from "@/core/auth/components/sign-in-providers";
import Link from "next/link";

const LoginPage = async () => {
  return (
    <PageStructure>
      <AuthCard
        title={"Welcome back"}
        description={"Login with your credentials"}
      >
        <SignInForm />

        <TextSeparator label="Or continue with" />

        <SignInProviders />

        <div className="flex flex-wrap items-center gap-1">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account.
          </p>
          <Button
            size={"sm"}
            variant={"link"}
            asChild
            className="text-foreground px-0 font-normal"
          >
            <Link href={"/register"}>Register</Link>
          </Button>
        </div>
      </AuthCard>
    </PageStructure>
  );
};

export default LoginPage;
