import { PageStructure } from "@/components/page-structure";
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
      <h1 className="text-3xl font-bold">New Password</h1>

      <NewPasswordForm token={token} error={error as ErrorCode} />
    </PageStructure>
  );
};

export default NewPasswordPage;
