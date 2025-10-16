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
import { useSession } from "@/lib/auth-client";
import { Session, UserSession } from "@/types/session";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { banUser, unbanUser } from "../actions/ban-user";
import { impersonateUser } from "../actions/impersonate-user";
import { removeUser } from "../actions/remove-user";

interface Props {
  session: Session | null;
  user: UserSession;
}

const AdminActions = ({ session, user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refetch } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedText, copy] = useCopyToClipboard();

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
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isPending}>
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
            <DropdownMenuItem onClick={handleCopy(user.id)}>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/profile/${user.id}`}>Go to profile</Link>
            </DropdownMenuItem>
            {session?.user.role !== UserRole.USER &&
              session?.user.id !== user.id &&
              user.role !== UserRole.OWNER && (
                <>
                  <DropdownMenuSeparator />
                  {session?.user.role === UserRole.OWNER && (
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
                    <DropdownMenuItem onClick={handleBan} variant="destructive">
                      Ban
                    </DropdownMenuItem>
                  )}
                  <DialogTrigger asChild>
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                </>
              )}
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
