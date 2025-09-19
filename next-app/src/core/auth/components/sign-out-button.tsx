"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOut } from "../actions/sign-out";
import { toast } from "sonner";
import { CustomButton } from "@/components/custom-button";

export const SignOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      // Client side sign out
      // await signOut({
      //   fetchOptions: {
      //     onError: (ctx) => {
      //       toast.error(ctx.error.message);
      //     },
      //     onRequest: () => {
      //       toast.warning("Logging out...");
      //     },
      //     onSuccess: () => {
      //       toast.success("You have successfully logout");
      //       router.push("/login");
      //     },
      //   },
      // });

      // Server side sign out
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
          toast.error("Something went wrong!");
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
