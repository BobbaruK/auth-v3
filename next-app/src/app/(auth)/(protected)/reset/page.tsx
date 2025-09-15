import { PageStructure } from "@/components/page-structure";
import { ResetPasswordForm } from "@/core/auth/components/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Forgot password</h1>

      <ResetPasswordForm />
    </PageStructure>
  );
};

export default ResetPasswordPage;
