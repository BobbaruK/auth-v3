"use client";

import { CustomButton } from "@/components/custom-button";
import { BanIcon } from "@/components/icons/ban";
import { MESSAGES } from "@/constants/messages";
import { Session } from "@/types/session";
import { UserWithRole } from "better-auth/plugins/admin";
import { useTransition } from "react";
import { toast } from "sonner";
import { banUser, unbanUser } from "../actions/ban-user";
import { UserRole } from "@/generated/prisma";

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

  return (
    <div>
      {user.banned ? (
        <CustomButton
          buttonLabel="Unban"
          size={"sm"}
          icon={BanIcon}
          iconPlacement="right"
          disabled={
            session?.user.id === user.id ||
            isPending ||
            user.role === UserRole.OWNER
          }
          onClick={handleUnBan}
        />
      ) : (
        <CustomButton
          buttonLabel="Ban"
          size={"sm"}
          icon={BanIcon}
          iconPlacement="right"
          variant={"danger"}
          disabled={
            session?.user.id === user.id ||
            isPending ||
            user.role === UserRole.OWNER
          }
          onClick={handleBan}
        />
      )}
    </div>
  );
};

export default AdminActions;
