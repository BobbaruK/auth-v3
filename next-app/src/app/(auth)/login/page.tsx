import { PageStructure } from "@/components/page-structure";
import { SignInForm } from "@/core/auth/components/sign-in-form";
import Link from "next/link";

const LoginPage = () => {
  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Login</h1>

      <SignInForm />

      <p className="text-muted-foreground text-sm">
        Don&apos;t have an account. <Link href={"/register"}>Register</Link>
      </p>
    </PageStructure>
  );
};

export default LoginPage;
