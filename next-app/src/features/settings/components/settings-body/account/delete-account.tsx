"use client";

import { CustomButton } from "@/components/custom-button";
import { TrashIcon } from "@/components/icons/trash";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileContext } from "@/features/settings/providers/settings";
import { useCustomMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";
const DeleteAccountForm = lazy(
  () => import("@/core/auth/components/delete-account-form"),
);

export const DeleteAccount = () => {
  const {
    isLoading,
    startTransition,
    user,
    openDeleteAccountDialog,
    setOpenDeleteAccountDialog,
  } = useProfileContext();
  const isDesktop = useCustomMediaQuery();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Delete Account</p>
        <p className="text-muted-foreground text-sm">
          Permanently delete your account and all data
        </p>
      </div>
      {isDesktop ? (
        <Dialog
          open={openDeleteAccountDialog}
          onOpenChange={setOpenDeleteAccountDialog}
        >
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel="Delete Account"
              icon={TrashIcon}
              variant={"danger"}
              iconPlacement="left"
              hideLabelOnMobile={false}
              disabled={isLoading}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <Suspense fallback={<DeleteAccountSkeleton />}>
              <DeleteAccountForm
                userEmail={user.email}
                isPending={isLoading}
                startTransition={startTransition}
                setOpenDeleteAccountDialog={setOpenDeleteAccountDialog}
                closeDialog={
                  <DialogClose asChild>
                    <CustomButton
                      buttonLabel="Cancel"
                      variant={"outline"}
                      disabled={isLoading}
                      className="w-full"
                    />
                  </DialogClose>
                }
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={openDeleteAccountDialog}
          onOpenChange={setOpenDeleteAccountDialog}
        >
          <DrawerTrigger asChild>
            <CustomButton
              buttonLabel="Delete Account"
              icon={TrashIcon}
              variant={"danger"}
              iconPlacement="left"
              hideLabelOnMobile={false}
              disabled={isLoading}
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Delete Account</DrawerTitle>
              <DrawerDescription>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </DrawerDescription>
            </DrawerHeader>
            <Suspense fallback={<DeleteAccountSkeleton />}>
              <DeleteAccountForm
                className="p-4"
                userEmail={user.email}
                isPending={isLoading}
                startTransition={startTransition}
                setOpenDeleteAccountDialog={setOpenDeleteAccountDialog}
                closeDialog={
                  <DrawerClose asChild>
                    <CustomButton
                      buttonLabel="Cancel"
                      variant={"outline"}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </DrawerClose>
                }
              />
            </Suspense>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

function DeleteAccountSkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-6", className)} {...restProps}>
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-6">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 grow" />
      </div>
    </div>
  );
}
