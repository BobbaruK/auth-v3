"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { disable2fa, enable2fa } from "../actions/2fa";

export const SettingsForm = () => {
  const [isPending, startTransition] = useTransition();
  const [totpURI, setTotpURI] = useState<string | null>(null);
  const router = useRouter();

  const add2fa = () => {
    startTransition(async () => {
      enable2fa("Admin!23")
        .then(async (data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(
              `/two-factor-verification?twoFactor=${encodeURIComponent(data.totpURI)}&twoFactorFirstTime=true`
            );
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  const remove2fa = () => {
    startTransition(async () => {
      disable2fa("Admin!23")
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            router.refresh();
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div>
      <Button onClick={add2fa} disabled={isPending}>
        Enable 2FA
      </Button>{" "}
      <Button onClick={remove2fa} disabled={isPending}>
        Disable 2FA
      </Button>
    </div>
  );
};
