"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

export const SignOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onRequest: () => {
            toast.warning("Logging out...");
          },
          onSuccess: () => {
            toast.success("You have successfully logout");
            router.push("/login");
          },
        },
      });
    });
  };

  return (
    <Button
      onClick={handleClick}
      size={"sm"}
      variant={"destructive"}
      disabled={isPending}>
      Sign Out
    </Button>
  );
};
