"use client";

import { CustomButton } from "@/components/custom-button";
import { MESSAGES } from "@/constants/messages";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { signOut } from "../actions/sign-out";

export const SignOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      signOut()
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push("/login");
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  return (
    <CustomButton
      buttonLabel={`Sign Out`}
      onClick={handleClick}
      size={"sm"}
      variant={"destructive"}
      disabled={isPending}
    />
  );
};
