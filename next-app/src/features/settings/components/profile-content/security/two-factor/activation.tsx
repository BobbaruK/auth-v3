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
import { Prisma } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { Dispatch, lazy, SetStateAction, Suspense } from "react";
const TwoFactorForm = lazy(() => import("./activation-form"));

interface Props {
  isDesktop: boolean;
  openActivate2faDialog: boolean;
  setOpenActivate2faDialog: Dispatch<SetStateAction<boolean>>;
  setOpenScanQR: Dispatch<SetStateAction<boolean>>;
  setTotpURI: Dispatch<SetStateAction<string>>;
  emitBackupCodes: (backupCodes: string[]) => void;
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

const TwoFactorActivation = ({
  isDesktop,
  openActivate2faDialog,
  setOpenActivate2faDialog,
  setOpenScanQR,
  setTotpURI,
  emitBackupCodes,
  user,
}: Props) => {
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
            <TwoFactorForm
              twoFA={user.twoFactorEnabled}
              closeDialog={({ totpURI, backupCodes }) => {
                setTotpURI(totpURI);

                emitBackupCodes(backupCodes);

                setOpenActivate2faDialog(false);

                setOpenScanQR(totpURI ? true : false);
              }}
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
            <TwoFactorForm
              twoFA={user.twoFactorEnabled}
              className="p-4"
              closeDialog={({ totpURI, backupCodes }) => {
                setTotpURI(totpURI);

                emitBackupCodes(backupCodes);

                setOpenActivate2faDialog(false);

                setOpenScanQR(totpURI ? true : false);
              }}
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
