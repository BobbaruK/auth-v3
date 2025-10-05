import { CustomButton } from "@/components/custom-button";
import TextSeparator from "@/components/text-separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/constants/messages";
import { useSettingsContext } from "@/features/settings/providers/settings";
import { useCustomMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";
const OTPVerificationForm = lazy(
  () => import("@/core/auth/components/otp-verification-form"),
);

const TwoFactorScanQR = () => {
  const {
    user,
    totpURI,
    openScanQRCodeDialog,
    setOpenScanQRCodeDialog,
    setOpenBackupCodesDialog,
  } = useSettingsContext();
  const isDesktop = useCustomMediaQuery();

  return isDesktop ? (
    <>
      <Dialog
        open={openScanQRCodeDialog}
        onOpenChange={setOpenScanQRCodeDialog}
      >
        <DialogTrigger asChild hidden>
          <CustomButton
            buttonLabel={user?.twoFactorEnabled ? "Disable" : "Enable"}
            variant={"outline"}
            size={"sm"}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>2FA Verification</DialogTitle>
            <DialogDescription>{MESSAGES.QR_SCAN}</DialogDescription>
          </DialogHeader>
          <Suspense fallback={<TwoFactorScanQRSkeleton />}>
            <OTPVerificationForm
              otpLink={totpURI}
              isFirstTime
              setOpenScanQRCodeDialog={setOpenScanQRCodeDialog}
              setOpenBackupCodesDialog={setOpenBackupCodesDialog}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <>
      <Drawer
        open={openScanQRCodeDialog}
        onOpenChange={setOpenScanQRCodeDialog}
      >
        <DrawerTrigger asChild hidden>
          <CustomButton
            buttonLabel={user?.twoFactorEnabled ? "Disable" : "Enable"}
            variant={"outline"}
            size={"sm"}
          />
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader className="text-left">
            <DrawerTitle>2FA Verification</DrawerTitle>
            <DrawerDescription>{MESSAGES.QR_SCAN}</DrawerDescription>
          </DrawerHeader>

          <Suspense
            fallback={<TwoFactorScanQRSkeleton className="mb-4 px-4" />}
          >
            <OTPVerificationForm
              otpLink={totpURI}
              isFirstTime
              setOpenScanQRCodeDialog={setOpenScanQRCodeDialog}
              setOpenBackupCodesDialog={setOpenBackupCodesDialog}
            />
          </Suspense>
        </DrawerContent>
      </Drawer>
    </>
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
