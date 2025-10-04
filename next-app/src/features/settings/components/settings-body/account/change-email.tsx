"use client";

import { CustomButton } from "@/components/custom-button";
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
import { useProfileContext } from "@/features/settings/providers/settings";
import { useCustomMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";
const ChangeEmailForm = lazy(
  () => import("@/core/auth/components/change-email-form"),
);

export const ChangeEmail = () => {
  const {
    user,
    openChangeEmailDialog,
    setOpenChangeEmailDialog,
    isLoading,
    startTransition,
  } = useProfileContext();
  const isDesktop = useCustomMediaQuery();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Change email</p>
        <p className="text-muted-foreground text-sm">{user?.email}</p>
      </div>
      {isDesktop ? (
        <Dialog
          open={openChangeEmailDialog}
          onOpenChange={setOpenChangeEmailDialog}
        >
          <DialogTrigger asChild>
            <CustomButton buttonLabel="Change" variant="outline" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change your email address</DialogTitle>
            </DialogHeader>

            <Suspense fallback={<TwoFASkeleton />}>
              <ChangeEmailForm
                userEmail={user.email}
                isLoading={isLoading}
                startTransition={startTransition}
                setOpenChangeEmailDialog={setOpenChangeEmailDialog}
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={openChangeEmailDialog}
          onOpenChange={setOpenChangeEmailDialog}
        >
          <DrawerTrigger asChild>
            <CustomButton buttonLabel="Change" variant="outline" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Change your email address</DrawerTitle>
            </DrawerHeader>
            <ChangeEmailForm
              className="mb-4 px-4"
              userEmail={user.email}
              isLoading={isLoading}
              startTransition={startTransition}
              setOpenChangeEmailDialog={setOpenChangeEmailDialog}
            />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

function TwoFASkeleton({
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
