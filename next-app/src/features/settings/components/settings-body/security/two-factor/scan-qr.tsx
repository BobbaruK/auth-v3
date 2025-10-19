import { CustomButton } from "@/components/custom-button";
import ResponsiveDialog from "@/components/responsive-dialog";
import TextSeparator from "@/components/text-separator";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/constants/messages";
import { useSettingsContext } from "@/features/settings/providers/settings";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";
const OTPVerificationForm = lazy(
  () => import("@/core/auth/components/forms/otp-verification"),
);

const TwoFactorScanQR = () => {
  const {
    totpURI,
    openScanQRCodeDialog,
    setOpenScanQRCodeDialog,
    setOpenBackupCodesDialog,
  } = useSettingsContext();

  return (
    <ResponsiveDialog
      open={openScanQRCodeDialog}
      setOpen={setOpenScanQRCodeDialog}
      trigger={{
        type: "element",
        hidden: true,
        element: (
          <CustomButton
            buttonLabel={"Get the codes"}
            variant={"outline"}
            size={"sm"}
          />
        ),
      }}
      header={{
        title: {
          label: `2FA Verification`,
        },
        description: MESSAGES.QR_SCAN,
      }}
    >
      <Suspense fallback={<TwoFactorScanQRSkeleton />}>
        <OTPVerificationForm
          otpLink={totpURI}
          isFirstTime
          setOpenScanQRCodeDialog={setOpenScanQRCodeDialog}
          setOpenBackupCodesDialog={setOpenBackupCodesDialog}
        />
      </Suspense>
    </ResponsiveDialog>
  );
};

export default TwoFactorScanQR;

function TwoFactorScanQRSkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...restProps}>
      <Skeleton className="aspect-square w-full max-w-[300px] self-center" />

      <TextSeparator label="OR" />

      <div className="flex h-12 flex-col items-center justify-around gap-1">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>

      <div className="flex h-10 gap-2">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full max-w-10" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>

        <Skeleton className="h-5 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
