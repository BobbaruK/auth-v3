import { PageStructure } from "@/components/page-structure";
import { AuthCard } from "@/core/auth/components/auth-card";
import { NewPasswordForm } from "@/core/auth/components/new-password-form";
import { ErrorCode } from "@/types/errors";

interface Props {
  searchParams: Promise<{
    token: string;
    error: string;
  }>;
}

const NewPasswordPage = async ({ searchParams }: Props) => {
  const { token, error } = await searchParams;

  return (
    <PageStructure>
      <AuthCard
        title={"Reset Password"}
        description={
          "Password must contain at least one of each: lowercase letters, uppercase letters, numbers and special characters"
        }>
        <NewPasswordForm token={token} error={error as ErrorCode} />
      </AuthCard>
    </PageStructure>
  );
};

export default NewPasswordPage;
