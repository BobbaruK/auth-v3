"use client";

import { CustomButton } from "@/components/custom-button";
import { TrashIcon } from "@/components/icons/trash";
import ResponsiveDialog from "@/components/responsive-dialog";
import { DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsContext } from "@/features/settings/providers/settings";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";
const DeleteAccountForm = lazy(
  () => import("@/core/user/components/form/delete-account"),
);

export const DeleteAccount = () => {
  const {
    isLoading,
    startTransition,
    user,
    openDeleteAccountDialog,
    setOpenDeleteAccountDialog,
  } = useSettingsContext();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Delete Account</p>
        <p className="text-muted-foreground text-sm">
          Permanently delete your account and all data
        </p>
      </div>

      <ResponsiveDialog
        open={openDeleteAccountDialog}
        setOpen={setOpenDeleteAccountDialog}
        trigger={{
          type: "element",
          element: (
            <CustomButton
              buttonLabel="Delete Account"
              icon={TrashIcon}
              variant={"danger"}
              iconPlacement="left"
              hideLabelOnMobile={false}
              disabled={isLoading}
            />
          ),
        }}
        header={{
          title: {
            label: "Delete Account",
          },
          description:
            "Are you sure you want to delete your account? This action cannot be undone.",
        }}
      >
        <Suspense fallback={<DeleteAccountSkeleton />}>
          <DeleteAccountForm
            userEmail={user.email}
            isPending={isLoading}
            startTransition={startTransition}
            setOpenDeleteAccountDialog={setOpenDeleteAccountDialog}
            closeDialog={
              <DialogClose asChild>
                <CustomButton
                  buttonLabel="Cancel"
                  variant={"outline"}
                  disabled={isLoading}
                  className="w-full"
                />
              </DialogClose>
            }
          />
        </Suspense>
      </ResponsiveDialog>
    </div>
  );
};

function DeleteAccountSkeleton({
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
      </div>
      <div className="flex items-center justify-end gap-6">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 grow" />
      </div>
    </div>
  );
}
