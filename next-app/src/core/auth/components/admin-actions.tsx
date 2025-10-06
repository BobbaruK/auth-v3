"use client";

import { CustomButton } from "@/components/custom-button";
import { MoreIcon } from "@/components/icons/more";
import { TrashIcon } from "@/components/icons/trash";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MESSAGES } from "@/constants/messages";
import { UserRole } from "@/generated/prisma";
import { Session } from "@/types/session";
import { UserWithRole } from "better-auth/plugins/admin";
import { useTransition } from "react";
import { toast } from "sonner";
import { banUser, unbanUser } from "../actions/ban-user";
import { removeUser } from "../actions/remove-user";

interface Props {
  session: Session | null;
  user: UserWithRole;
}

const AdminActions = ({ session, user }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleBan = () => {
    startTransition(async () => {
      banUser(user)
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

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            disabled={
              session?.user.id === user.id ||
              isPending ||
              user.role === UserRole.OWNER
            }
          >
            <CustomButton
              buttonLabel="More"
              size={"icon"}
              icon={MoreIcon}
              iconPlacement="left"
              variant={"outline"}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.banned ? (
              <DropdownMenuItem onClick={handleUnBan} variant="destructive">
                Unban
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleBan} variant="destructive">
                Ban
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>Impersonate</DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              account and remove it&apos;s data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <CustomButton
                buttonLabel="Delete user"
                variant={"danger"}
                icon={TrashIcon}
                iconPlacement="left"
                onClick={handleDeleteUser}
              />
            </DialogClose>
            <DialogClose asChild>
              <CustomButton buttonLabel="Cancel" variant={"outline"} />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminActions;
