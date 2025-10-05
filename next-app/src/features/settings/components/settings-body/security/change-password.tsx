"use client";

import { CustomButton } from "@/components/custom-button";
import { KeyIcon } from "@/components/icons/key";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsContext } from "@/features/settings/providers/settings";
import { useCustomMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";
const ChangePasswordForm = lazy(
  () => import("@/core/auth/components/change-password-form"),
);
const SetPasswordForm = lazy(
  () => import("@/core/auth/components/set-password-form"),
);

export const ChangePassword = () => {
  const {
    user,
    openChangePasswordDialog,
    setOpenChangePasswordDialog,
    isLoading,
    startTransition,
  } = useSettingsContext();
  const isDesktop = useCustomMediaQuery();

  const userProviders = user.accounts.map((provider) => provider.providerId);
  const hasCredential = userProviders.includes("credential");

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Password</p>
        <p className="text-muted-foreground text-sm">
          Last changed 3 months ago
        </p>
      </div>

      {isDesktop ? (
        <Dialog
          open={openChangePasswordDialog}
          onOpenChange={setOpenChangePasswordDialog}
        >
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel={`${hasCredential ? "Change" : "Set"} Password`}
              variant={"outline"}
              icon={KeyIcon}
              iconPlacement="left"
              hideLabelOnMobile={false}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {hasCredential ? "Change" : "Set"} your password
              </DialogTitle>
            </DialogHeader>
            {hasCredential ? (
              <Suspense fallback={<ChangePasswordSkeleton />}>
                <ChangePasswordForm
                  isLoading={isLoading}
                  startTransition={startTransition}
                  setOpenChangePasswordDialog={setOpenChangePasswordDialog}
                />
              </Suspense>
            ) : (
              <Suspense fallback={<SetPasswordSkeleton />}>
                <SetPasswordForm
                  isLoading={isLoading}
                  startTransition={startTransition}
                  setOpenChangePasswordDialog={setOpenChangePasswordDialog}
                />
              </Suspense>
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={openChangePasswordDialog}
          onOpenChange={setOpenChangePasswordDialog}
        >
          <DrawerTrigger asChild>
            <CustomButton
              buttonLabel={`${hasCredential ? "Change" : "Set"} Password`}
              variant={"outline"}
              icon={KeyIcon}
              iconPlacement="left"
              hideLabelOnMobile={false}
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>
                {hasCredential ? "Change" : "Set"} your password
              </DrawerTitle>
            </DrawerHeader>

            {hasCredential ? (
              <Suspense
                fallback={<ChangePasswordSkeleton className="mb-4 px-4" />}
              >
                <ChangePasswordForm
                  className="mb-4 px-4"
                  isLoading={isLoading}
                  startTransition={startTransition}
                  setOpenChangePasswordDialog={setOpenChangePasswordDialog}
                />
              </Suspense>
            ) : (
              <Suspense
                fallback={<SetPasswordSkeleton className="mb-4 px-4" />}
              >
                <SetPasswordForm
                  className="mb-4 px-4"
                  isLoading={isLoading}
                  startTransition={startTransition}
                  setOpenChangePasswordDialog={setOpenChangePasswordDialog}
                />
              </Suspense>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

function ChangePasswordSkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...restProps}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
        </div>
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

function SetPasswordSkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...restProps}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
        </div>
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
