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
import { auth_user } from "@/generated/prisma";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChangeEmailForm } from "./change-email-form";

interface Props {
  user: auth_user | null;
}

export const ChangeEmail = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-base font-medium">Change email</p>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <CustomButton buttonLabel="Change" variant="outline" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change your email address</DialogTitle>
            </DialogHeader>
            <ChangeEmailForm closeDialog={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Change email</p>
        <p className="text-muted-foreground text-sm">{user?.email}</p>
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <CustomButton buttonLabel="Change" variant="outline" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Change your email address</DrawerTitle>
          </DrawerHeader>
          <ChangeEmailForm
            className="mb-4 px-4"
            closeDialog={() => setOpen(false)}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
