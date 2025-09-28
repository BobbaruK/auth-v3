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
import { Prisma } from "@/generated/prisma";
import { Key } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChangePasswordForm } from "./change-password-form";
import { SetPasswordForm } from "./set-password-form";

interface Props {
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

export const ChangePassword = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel={`${hasCredential ? "Change" : "Set"} Password`}
              variant={"outline"}
              icon={Key}
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
              <ChangePasswordForm closeDialog={() => setOpen(false)} />
            ) : (
              <SetPasswordForm closeDialog={() => setOpen(false)} />
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <CustomButton
              buttonLabel={`${hasCredential ? "Change" : "Set"} Password`}
              variant={"outline"}
              icon={Key}
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
              <ChangePasswordForm
                className="mb-4 px-4"
                closeDialog={() => setOpen(false)}
              />
            ) : (
              <SetPasswordForm
                className="mb-4 px-4"
                closeDialog={() => setOpen(false)}
              />
            )}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
