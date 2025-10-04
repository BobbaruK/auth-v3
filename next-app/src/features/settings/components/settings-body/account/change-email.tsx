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
import { ChangeEmailForm } from "@/core/auth/components/change-email-form";
import { useProfileContext } from "@/features/settings/providers/settings";
import { useCustomMediaQuery } from "@/hooks/use-media-query";

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
            <ChangeEmailForm
              isLoading={isLoading}
              startTransition={startTransition}
              setOpenChangeEmailDialog={setOpenChangeEmailDialog}
            />
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
