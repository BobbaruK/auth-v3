"use client";

import { CustomButton } from "@/components/custom-button";
import { AccountIcon } from "@/components/icons/account";
import { BanIcon } from "@/components/icons/ban";
import { CopyIcon } from "@/components/icons/copy";
import { ImpersonateIcon } from "@/components/icons/impersonate";
import { MoreIcon } from "@/components/icons/more";
import { ShieldBanIcon } from "@/components/icons/shield-ban";
import { TrashIcon } from "@/components/icons/trash";
import { UnbanIcon } from "@/components/icons/unban";
import ResponsiveDialog from "@/components/responsive-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MESSAGES } from "@/constants/messages";
import { unbanUser } from "@/core/admin/actions/ban-user";
import { impersonateUser } from "@/core/admin/actions/impersonate-user";
import { revokeUserSessions } from "@/core/admin/actions/revoke-sessions";
import DeleteUser from "@/core/admin/components/delete-user";
import { BanUserFormSkeleton } from "@/core/admin/components/forms/ban-user";
import { useSession } from "@/lib/auth-client";
import { UserSession } from "@/types/session";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useState, useTransition } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
const BanUserForm = lazy(
  () => import("@/core/admin/components/forms/ban-user"),
);

interface Props {
  user: UserSession;
}

const RowActions = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refetch } = useSession();
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

  const handleRevokeUserSessions = () => {
    startTransition(async () => {
      revokeUserSessions(user)
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
            setOpenBanDialog={setOpenBanDialog}
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
        <DeleteUser
          users={[user]}
          isLoading={isPending}
          startTransition={startTransition}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
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
          <DropdownMenuItem onClick={handleCopy(user.id)}>
            <CopyIcon /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user.id}`}>
              <AccountIcon />
              Go to profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleImpersonate}>
            <ImpersonateIcon />
            Impersonate
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleRevokeUserSessions}
            variant="warning"
          >
            <ShieldBanIcon />
            Revoke sessions
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {user.banned ? (
            <DropdownMenuItem
              onClick={handleUnBan}
              variant="warning"
              // className="text-warning-foreground bg-warning"
            >
              <UnbanIcon />
              Unban
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => setOpenBanDialog(true)}
              variant="danger"
            >
              <BanIcon />
              Ban
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default RowActions;
