"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export const SignOutButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <Button onClick={handleClick} size={"sm"} variant={"destructive"}>
      Sign Out
    </Button>
  );
};
