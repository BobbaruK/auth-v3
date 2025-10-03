"use client";

import { CustomButton } from "@/components/custom-button";
import { ShieldIcon } from "@/components/icons/shield";
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
import { lazy, Suspense, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
const SessionsTable = lazy(() => import("./sessions-table"));

export const Sessions = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Active Sessions</p>
        <p className="text-muted-foreground text-sm">
          Manage devices that are logged into your account
        </p>
      </div>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel={"View Sessions"}
              variant={"outline"}
              size={"sm"}
              icon={ShieldIcon}
              iconPlacement="left"
              hideLabelOnMobile={false}
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Your sessions</DialogTitle>
            </DialogHeader>

            <Suspense fallback={<SessionFallback />}>
              <SessionsTable closeDialog={() => setOpen(false)} />
            </Suspense>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <CustomButton
              buttonLabel={"View Sessions"}
              variant={"outline"}
              size={"sm"}
              icon={ShieldIcon}
              iconPlacement="left"
              hideLabelOnMobile={false}
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Your sessions</DrawerTitle>
            </DrawerHeader>
            <Suspense fallback={<SessionFallback />}>
              <SessionsTable
                className="mb-4 px-4"
                closeDialog={() => setOpen(false)}
              />
            </Suspense>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

function SessionFallback() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-80 w-full rounded-lg border py-2 ps-2 pe-3">
        Loading...
      </div>
      <div className="flex items-center justify-end gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
