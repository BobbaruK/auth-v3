"use client";

import { Switch } from "@/components/ui/switch";
import { MESSAGES } from "@/constants/messages";
import { auth_user } from "@/generated/prisma";
import { updateUser } from "@/lib/auth-client";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  user: auth_user | null;
}

export const AccountVisibility = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState(user?.isAccountVisible || false);

  const handleCheck = () => {
    startTransition(async () => {
      await updateUser({
        isAccountVisible: !isChecked,
      })
        .then(({ data, error }) => {
          if (data?.status) {
            setIsChecked(!isChecked);
            toast.success(MESSAGES.VISIBILITY_UPDATED.BASE, {
              description: !isChecked
                ? MESSAGES.VISIBILITY_UPDATED.POSITIVE
                : MESSAGES.VISIBILITY_UPDATED.NEGATIVE,
            });
          }

          if (error) {
            toast.error(error.message);
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium">Account Visibility</p>
        <p className="text-muted-foreground text-sm">
          Make your profile visible to other users
        </p>
      </div>
      <Switch
        checked={isChecked}
        onCheckedChange={handleCheck}
        disabled={isPending}
      />
    </div>
  );
};
