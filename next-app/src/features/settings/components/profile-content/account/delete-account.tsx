"use client";

import { CustomButton } from "@/components/custom-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MESSAGES } from "@/constants/messages";
import { deleteUser } from "@/features/settings/actions/delete-user";
import { useState, useTransition } from "react";
import { GoTrash } from "react-icons/go";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

export const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleDelete = () => {
    startTransition(async () => {
      deleteUser()
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        })
        .finally(() => {
          setOpen(false);
        });
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Delete Account</p>
        <p className="text-muted-foreground text-sm">
          Permanently delete your account and all data
        </p>
      </div>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel="Delete Account"
              icon={GoTrash}
              variant={"danger"}
              iconPlacement="left"
              hideLabelOnMobile={false}
              disabled={isPending}
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
            <DialogFooter>
              <CustomButton
                buttonLabel="Delete Account"
                icon={GoTrash}
                variant={"danger"}
                iconPlacement="left"
                hideLabelOnMobile={false}
                onClick={handleDelete}
                disabled={isPending}
              />
              <DialogClose asChild>
                <CustomButton
                  buttonLabel="Cancel"
                  variant={"outline"}
                  disabled={isPending}
                />
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <CustomButton
              buttonLabel="Delete Account"
              icon={GoTrash}
              variant={"danger"}
              iconPlacement="left"
              hideLabelOnMobile={false}
              disabled={isPending}
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
            <DrawerFooter className="flex flex-row flex-wrap items-center gap-4">
              <CustomButton
                buttonLabel="Delete Account"
                icon={GoTrash}
                variant={"danger"}
                iconPlacement="left"
                hideLabelOnMobile={false}
                className="grow"
                onClick={handleDelete}
                disabled={isPending}
              />
              <DrawerClose asChild>
                <CustomButton
                  buttonLabel="Cancel"
                  variant={"outline"}
                  className="grow"
                  disabled={isPending}
                />
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
