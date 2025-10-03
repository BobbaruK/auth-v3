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
import { Prisma } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { Dispatch, lazy, SetStateAction, Suspense } from "react";
const OTPVerificationForm = lazy(
  () => import("@/core/auth/components/otp-verification-form"),
);

interface Props {
  totpURI: string;
  isDesktop: boolean;
  openScanQR: boolean;
  setOpenScanQR: Dispatch<SetStateAction<boolean>>;
  setOpenBackupCodes: Dispatch<SetStateAction<boolean>>;
  user: Prisma.auth_userGetPayload<{
    include: {
      accounts: {
        select: {
          providerId: true;
        };
      };
    };
  }>;
}

const TwoFactorScanQR = ({
  totpURI,
  isDesktop,
  openScanQR,
  setOpenScanQR,
  setOpenBackupCodes,
  user,
}: Props) => {
  return isDesktop ? (
    <>
      <Dialog open={openScanQR} onOpenChange={setOpenScanQR}>
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
              closeScanQRDialog={() => {
                setOpenScanQR(false);
                setOpenBackupCodes(true);
              }}
              isFirstTime
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <>
      <Drawer open={openScanQR} onOpenChange={setOpenScanQR}>
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
              closeScanQRDialog={() => {
                setOpenScanQR(false);
                setOpenBackupCodes(true);
              }}
              isFirstTime
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
