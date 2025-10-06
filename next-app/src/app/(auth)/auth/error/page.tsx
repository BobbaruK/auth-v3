import { ErrorIcon } from "@/components/icons/error";
import { PageStructure } from "@/components/page-structure";
import { AuthCard } from "@/core/auth/components/auth-card";

interface Props {
  searchParams: Promise<{
    error: string;
  }>;
}

const AuthErrorPage = async ({ searchParams }: Props) => {
  const error = (await searchParams).error;

  let message = "";

  switch (error) {
    case "unable_to_create_user":
      message = "We couldn't create your account.";
      break;
    case "please_restart_the_process":
      message = "The login process has expired. Please try again.";
      break;
    case "banned":
      message =
        "You have been banned from this application. Please contact support if you believe this is an error.";
      break;
    default:
      message = "An authentication error occurred.";
  }

  return (
    <PageStructure>
      <AuthCard
        title={"Something went wrong!"}
        description={message}
        showFooter={false}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <ErrorIcon size={40} className="text-destructive" />
          <p>Error: {error}</p>
        </div>
      </AuthCard>
    </PageStructure>
  );
};

export default AuthErrorPage;
