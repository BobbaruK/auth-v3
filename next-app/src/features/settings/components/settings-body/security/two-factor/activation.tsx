import { CustomButton } from "@/components/custom-button";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsContext } from "@/features/settings/providers/settings";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";
const ActivationTwoFactorForm = lazy(
  () => import("@/core/auth/components/forms/activation-2fa"),
);

const TwoFactorActivation = () => {
  const {
    openActivate2faDialog,
    setOpenActivate2faDialog,
    user,
    startTransition,
    isLoading,
    setBackupCodes,
    setTotpURI,
    setOpenScanQRCodeDialog,
  } = useSettingsContext();

  return (
    <ResponsiveDialog
      open={openActivate2faDialog}
      setOpen={setOpenActivate2faDialog}
      trigger={{
        type: "element",
        element: (
          <CustomButton
            buttonLabel={user?.twoFactorEnabled ? "Disable" : "Enable"}
            variant={"outline"}
            size={"sm"}
          />
        ),
      }}
      header={{
        title: {
          label: `${user?.twoFactorEnabled ? "Deactivate" : "Activate"} 2FA`,
        },
        description: "Enter your password below.",
      }}
    >
      <Suspense fallback={<TwoFASkeleton />}>
        <ActivationTwoFactorForm
          user={user}
          isLoading={isLoading}
          startTransition={startTransition}
          setTotpURI={setTotpURI}
          setOpenActivate2faDialog={setOpenActivate2faDialog}
          setBackupCodes={setBackupCodes}
          setOpenScanQRCodeDialog={setOpenScanQRCodeDialog}
        />
      </Suspense>
    </ResponsiveDialog>
  );
};

export default TwoFactorActivation;

function TwoFASkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...restProps}>
      <div className="flex flex-col items-center justify-end gap-2">
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[36px] w-full" />
      </div>
      <div className="flex items-center justify-end gap-6">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 grow" />
      </div>
    </div>
  );
}
