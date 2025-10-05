import { CustomButton } from "@/components/custom-button";
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
import { useSettingsContext } from "@/features/settings/providers/settings";
import { useCustomMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";
const ActivationTwoFactorForm = lazy(
  () => import("@/core/auth/components/activation-2fa-form"),
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
  const isDesktop = useCustomMediaQuery();

  return isDesktop ? (
    <>
      <Dialog
        open={openActivate2faDialog}
        onOpenChange={setOpenActivate2faDialog}
      >
        <DialogTrigger asChild>
          <CustomButton
            buttonLabel={user?.twoFactorEnabled ? "Disable" : "Enable"}
            variant={"outline"}
            size={"sm"}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {user?.twoFactorEnabled ? "Deactivate" : "Activate"} 2FA
            </DialogTitle>
            <DialogDescription>Enter your password below.</DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <>
      <Drawer
        open={openActivate2faDialog}
        onOpenChange={setOpenActivate2faDialog}
      >
        <DrawerTrigger asChild>
          <CustomButton
            buttonLabel={user?.twoFactorEnabled ? "Disable" : "Enable"}
            variant={"outline"}
            size={"sm"}
          />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>
              {user?.twoFactorEnabled ? "Deactivate" : "Activate"} 2FA
            </DrawerTitle>
            <DrawerDescription>Enter your password below.</DrawerDescription>
          </DrawerHeader>

          <Suspense fallback={<TwoFASkeleton className="mb-4 px-4" />}>
            <ActivationTwoFactorForm
              className="p-4"
              user={user}
              isLoading={false}
              startTransition={startTransition}
              setTotpURI={setTotpURI}
              setOpenActivate2faDialog={setOpenActivate2faDialog}
              setBackupCodes={setBackupCodes}
              setOpenScanQRCodeDialog={setOpenScanQRCodeDialog}
            />
          </Suspense>
        </DrawerContent>
      </Drawer>
    </>
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
