"use client";

import { CustomButton } from "@/components/custom-button";
import { CameraIcon } from "@/components/icons/camera";
import { Button } from "@/components/ui/button";
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
import { lazy, Suspense, useEffect, useState } from "react";
const ChangeAvatarForm = lazy(
  () => import("@/core/auth/components/change-avatar-form"),
);

export const ChangeAvatar = () => {
  const {
    user,
    isLoading,
    openAvatarDialog,
    setOpenAvatarDialog,
    startTransition,
  } = useSettingsContext();
  const isDesktop = useCustomMediaQuery();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        size="icon"
        variant="outline"
        className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
        disabled={isLoading}
      >
        <CameraIcon />
      </Button>
    );
  }

  if (isDesktop) {
    return (
      <Dialog open={openAvatarDialog} onOpenChange={setOpenAvatarDialog}>
        <DialogTrigger asChild>
          <CustomButton
            buttonLabel={`${user.image ? "Change" : "Set"} your avatar`}
            variant="outline"
            icon={CameraIcon}
            iconPlacement="left"
            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
            size={"icon"}
            disabled={isLoading}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {user.image ? "Change" : "Set"} your avatar
            </DialogTitle>
          </DialogHeader>

          <Suspense fallback={<ChangeAvatarSkeleton />}>
            <ChangeAvatarForm
              userImage={user.image}
              isLoading={isLoading}
              startTransition={startTransition}
              setOpenAvatarDialog={setOpenAvatarDialog}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={openAvatarDialog} onOpenChange={setOpenAvatarDialog}>
      <DrawerTrigger asChild>
        <CustomButton
          buttonLabel={`${user.image ? "Change" : "Set"} your avatar`}
          variant="outline"
          icon={CameraIcon}
          iconPlacement="left"
          className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
          size={"icon"}
          disabled={isLoading}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{user.image ? "Change" : "Set"} your avatar</DrawerTitle>
        </DrawerHeader>

        <Suspense fallback={<ChangeAvatarSkeleton className="mb-4 px-4" />}>
          <ChangeAvatarForm
            className="mb-4 px-4"
            userImage={user.image}
            isLoading={isLoading}
            startTransition={startTransition}
            setOpenAvatarDialog={setOpenAvatarDialog}
          />
        </Suspense>
      </DrawerContent>
    </Drawer>
  );
};

function ChangeAvatarSkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div className={cn("flex items-center gap-4", className)} {...restProps}>
        <Skeleton className="border-primary size-24 rounded-full border" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className={cn("flex flex-col gap-6", className)} {...restProps}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-[14px] w-full" />
            <Skeleton className="h-[36px] w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-6">
          <Skeleton className="h-10 grow" />
          <Skeleton className="h-10 grow" />
        </div>
      </div>
    </>
  );
}
