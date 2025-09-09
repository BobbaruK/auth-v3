import { PageStructure } from "@/components/page-structure";
import { RegisterForm } from "@/core/auth/components/register-form";

const RegisterPage = () => {
  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Register</h1>

      <RegisterForm />
    </PageStructure>
  );
};

export default RegisterPage;
