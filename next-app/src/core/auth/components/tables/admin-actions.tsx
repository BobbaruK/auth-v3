"use client";

import { CustomButton } from "@/components/custom-button";
import { MoreIcon } from "@/components/icons/more";
import { TrashIcon } from "@/components/icons/trash";
import ResponsiveDialog from "@/components/responsive-dialog";
import { DialogClose } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MESSAGES } from "@/constants/messages";
import { unbanUser } from "@/core/auth/actions/ban-user";
import { impersonateUser } from "@/core/auth/actions/impersonate-user";
import { removeUser } from "@/core/auth/actions/remove-user";
import { UserRole } from "@/generated/prisma";
import { useSession } from "@/lib/auth-client";
import { UserSession } from "@/types/session";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useState, useTransition } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { BanUserFormSkeleton } from "../forms/ban-user";
const BanUserForm = lazy(() => import("@/core/auth/components/forms/ban-user"));

interface Props {
  user: UserSession;
}

const AdminActions = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refetch, data } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedText, copy] = useCopyToClipboard();
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleUnBan = () => {
    startTransition(async () => {
      unbanUser(user)
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
        });
    });
  };

  const handleDeleteUser = () => {
    startTransition(async () => {
      removeUser(user)
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
        });
    });
  };

  const handleImpersonate = () => {
    startTransition(async () => {
      impersonateUser(user)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            router.push("/");
            router.refresh();
            refetch();
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  const handleCopy = (text: string) => () => {
    if (!text) {
      toast.error("Nothing to copy");
      return;
    }

    copy(text)
      .then(() => {
        toast.success("Copied user ID.", {
          description: text,
        });
      })
      .catch((error) => {
        if (error instanceof Error) console.error(error.message);

        toast.error("Failed to copy!");
      });
  };

  return (
    <>
      <ResponsiveDialog
        open={openBanDialog}
        setOpen={setOpenBanDialog}
        trigger={{
          type: "label",
          label: "",
          hidden: true,
        }}
        header={{
          title: {
            label: "Ban user",
          },
        }}
      >
        <Suspense fallback={<BanUserFormSkeleton />}>
          <BanUserForm
            users={[user]}
            isLoading={isPending}
            startTransition={startTransition}
            setBanDialog={setOpenBanDialog}
          />
        </Suspense>
      </ResponsiveDialog>

      <ResponsiveDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        trigger={{
          type: "element",
          element: (
            <CustomButton
              buttonLabel="Delete"
              variant={"destructive"}
              className="w-full"
              disabled={isPending}
              onClick={() => setOpenDeleteDialog(true)}
            />
          ),
          hidden: true,
        }}
        header={{
          title: {
            label: "Are you absolutely sure?",
          },
          description:
            "This action cannot be undone. This will permanently delete this account and remove it's data from our servers.",
        }}
      >
        <div className="flex items-center justify-end gap-4">
          <DialogClose asChild>
            <CustomButton
              buttonLabel="Delete user"
              variant={"danger"}
              icon={TrashIcon}
              iconPlacement="left"
              hideLabelOnMobile={false}
              onClick={handleDeleteUser}
            />
          </DialogClose>
          <DialogClose asChild>
            <CustomButton buttonLabel="Cancel" variant={"outline"} />
          </DialogClose>
        </div>
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isPending}>
          <CustomButton
            buttonLabel="More"
            size={"icon"}
            icon={MoreIcon}
            iconPlacement="left"
            variant={"outline"}
            className="size-8"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCopy(user.id)}>
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user.id}`}>Go to profile</Link>
          </DropdownMenuItem>
          {data?.user.role !== UserRole.USER &&
            data?.user.id !== user.id &&
            user.role !== UserRole.OWNER && (
              <>
                <DropdownMenuSeparator />
                {data?.user.role === UserRole.OWNER && (
                  <DropdownMenuItem onClick={handleImpersonate}>
                    Impersonate
                  </DropdownMenuItem>
                )}
                {user.banned ? (
                  <DropdownMenuItem
                    onClick={handleUnBan}
                    variant="default"
                    className="text-warning-foreground bg-warning"
                  >
                    Unban
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => setOpenBanDialog(true)}
                    variant="destructive"
                  >
                    Ban
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  Delete
                </DropdownMenuItem>
              </>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AdminActions;
