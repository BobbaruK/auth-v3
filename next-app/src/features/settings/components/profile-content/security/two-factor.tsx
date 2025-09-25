"use client";

import { CustomButton } from "@/components/custom-button";
import { Badge } from "@/components/ui/badge";
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
import { auth_user } from "@/generated/prisma";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { TwoFactorForm } from "./two-factor-form";

interface Props {
  user: auth_user | null;
}

export const TwoFactor = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Two-Factor Authentication</p>
        <p className="text-muted-foreground text-sm">
          Add an extra layer of security to your account
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={user?.twoFactorEnabled ? "success" : "warning"}>
          {user?.twoFactorEnabled ? "Enabled" : "Disabled"}
        </Badge>

        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
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
                <DialogDescription>
                  Enter your password below.
                </DialogDescription>
              </DialogHeader>
              <TwoFactorForm
                twoFA={user?.twoFactorEnabled}
                closeDialog={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
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
                <DrawerDescription>
                  Enter your password below.
                </DrawerDescription>
              </DrawerHeader>

              <TwoFactorForm
                className="mb-4 px-4"
                twoFA={user?.twoFactorEnabled}
                closeDialog={() => setOpen(false)}
              />
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
};
