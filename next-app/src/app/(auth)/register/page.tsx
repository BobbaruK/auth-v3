import { PageStructure } from "@/components/page-structure";
import { SignUpForm } from "@/core/auth/components/sign-up-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Register</h1>

      <SignUpForm />

      <p className="text-muted-foreground text-sm">
        Already have an account. <Link href={"/login"}>Login</Link>
      </p>
    </PageStructure>
  );
};

export default RegisterPage;
