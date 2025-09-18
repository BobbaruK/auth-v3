import { PageStructure } from "@/components/page-structure";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/core/auth/components/auth-card";
import { SignUpForm } from "@/core/auth/components/sign-up-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <PageStructure>
      <AuthCard
        title={"Create an account"}
        description={"Create a new account by filling out the form below."}>
        <SignUpForm />

        <div className="flex gap-1 items-center flex-wrap">
          <p className="text-muted-foreground text-sm">
            Already have an account.
          </p>
          <Button
            size={"sm"}
            variant={"link"}
            asChild
            className="px-0 font-normal text-foreground">
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </AuthCard>
    </PageStructure>
  );
};

export default RegisterPage;
