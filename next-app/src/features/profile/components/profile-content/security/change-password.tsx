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
import { Key } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChangePasswordForm } from "./change-password-form";

interface Props {
  user: auth_user | null;
}

export const ChangePassword = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Password</p>
        <p className="text-muted-foreground text-sm">
          Last changed 3 months ago
        </p>
      </div>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel={"Change Password"}
              variant={"outline"}
              icon={Key}
              iconPlacement="left"
              hideLabelOnMobile={false}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change your password</DialogTitle>
            </DialogHeader>
            <ChangePasswordForm closeDialog={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <CustomButton
              buttonLabel={"Change Password"}
              variant={"outline"}
              icon={Key}
              iconPlacement="left"
              hideLabelOnMobile={false}
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Change your password</DrawerTitle>
            </DrawerHeader>

            <ChangePasswordForm
              className="mb-4 px-4"
              closeDialog={() => setOpen(false)}
            />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
