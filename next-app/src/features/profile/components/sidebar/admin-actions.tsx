"use client";

import { CustomButton } from "@/components/custom-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MESSAGES } from "@/constants/messages";
import { banUser, unbanUser } from "@/core/auth/actions/ban-user";
import { impersonateUser } from "@/core/auth/actions/impersonate-user";
import { removeUser } from "@/core/auth/actions/remove-user";
import { UserRole } from "@/generated/prisma";
import { useSession } from "@/lib/auth-client";
import { Session } from "@/types/session";
import { UserProfile } from "@/types/user-profile";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
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
import { TrashIcon } from "lucide-react";

interface Props {
  user: UserProfile;
  session: Session;
}

const AdminActions = ({ user, session }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refetch } = useSession();

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
            router.push("/users");
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
            router.refresh();
            refetch();
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  return (
    <Card className="@container">
      <CardHeader className="flex flex-col flex-wrap justify-start gap-2">
        <CardTitle className="flex gap-2">Admin</CardTitle>
      </CardHeader>
      <CardContent className="flex columns-3 gap-4 @max-sm:flex-wrap">
        {session?.user.role === UserRole.OWNER && (
          <CustomButton
            buttonLabel="Impersonate"
            variant={"outline"}
            className="w-full"
            disabled={isPending}
            onClick={handleImpersonate}
          />
        )}
        {user.banned ? (
          <CustomButton
            buttonLabel="Unban"
            variant={"warning"}
            className="w-full"
            disabled={isPending}
            onClick={handleUnBan}
          />
        ) : (
          <CustomButton
            buttonLabel="Ban"
            variant={"danger"}
            className="w-full"
            disabled={isPending}
            onClick={handleBan}
          />
        )}

        <Dialog>
          <DialogTrigger asChild>
            <CustomButton
              buttonLabel="Delete"
              variant={"destructive"}
              className="w-full"
              disabled={isPending}
            />
          </DialogTrigger>
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
      </CardContent>
    </Card>
  );
};

export default AdminActions;
