import { PageStructure } from "@/components/page-structure";
import { LoginForm } from "@/core/auth/components/login-form";

const LoginPage = () => {
  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Login</h1>

      <LoginForm />
    </PageStructure>
  );
};

export default LoginPage;
