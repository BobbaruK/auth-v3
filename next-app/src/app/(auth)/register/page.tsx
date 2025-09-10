import { PageStructure } from "@/components/page-structure";
import { RegisterForm } from "@/core/auth/components/register-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Register</h1>

      <RegisterForm />

      <p className="text-muted-foreground text-sm">
        Already have an account. <Link href={"/login"}>Login</Link>
      </p>
    </PageStructure>
  );
};

export default RegisterPage;
