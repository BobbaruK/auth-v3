"use client";

import { CustomButton } from "@/components/custom-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MESSAGES } from "@/constants/messages";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { twoFactor } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoIosCopy } from "react-icons/io";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import z from "zod";
import { clearTwoFactorCookie } from "../actions/clear-two-factor-cookie";
import { OTP } from "../schemas/otp";

interface Props {
  otpLink: string | null;
  isFirstTime: boolean;
}

export const OTPVerificationForm = ({ otpLink, isFirstTime }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [copiedText, copy] = useCopyToClipboard();

  const form = useForm<z.infer<typeof OTP>>({
    resolver: zodResolver(OTP),
    defaultValues: {
      code: "",
      remember: false,
    },
  });

  const url = otpLink ? new URL(otpLink) : "";
  const secret = url && url.searchParams.get("secret");

  const onSubmit = (values: z.infer<typeof OTP>) => {
    startTransition(async () => {
      try {
        const { data, error } = await twoFactor.verifyTotp({
          code: values.code,
          trustDevice: values.remember,
        });

        if (data) {
          await clearTwoFactorCookie("better-auth.two_factor");
        }

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success(
          isFirstTime ? MESSAGES.QR_VALIDATED : MESSAGES.LOGIN_SUCCESS
        );
        router.push(DEFAULT_LOGIN_REDIRECT);
        router.refresh();
      } catch (error) {
        toast.error(MESSAGES.SOMETHING_WRONG);
      }
    });
  };

  const handleCopy = (text: string | null) => () => {
    if (!text) {
      toast.error("Nothing to copy");
      return;
    }

    copy(text)
      .then(() => {
        toast.success("Copied", {
          description: <div className="line-clamp-1">{copiedText}</div>,
        });
      })
      .catch((error) => {
        toast.error("Failed to copy!");
      });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {otpLink && (
        <>
          <QRCode value={otpLink} className="w-full" />
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              OR
            </span>
          </div>
          <p>
            If you can&apos;t use the QR code, enter this secret key manually in
            your authenticator app.
          </p>
          <div className="flex gap-2 items-center">
            <p className={cn("truncate w-full")}>{secret}</p>
            <CustomButton
              buttonLabel={`Copy secret`}
              variant={"secondary"}
              size={"icon"}
              icon={IoIosCopy}
              iconPlacement="left"
              className="size-10 min-w-10"
              onClick={handleCopy(secret)}
            />
          </div>
        </>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field} ref={inputRef}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-center gap-2 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      className="cursor-pointer"
                      onCheckedChange={(checked) => {
                        form.setValue("remember", !!checked);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    Remember this device.
                  </FormLabel>
                </FormItem>
              );
            }}
          />

          <CustomButton
            buttonLabel={`Validate`}
            type="submit"
            className="w-full"
            disabled={isPending}
            skeletonClassName="w-full"
          />
        </form>
      </Form>
    </div>
  );
};
