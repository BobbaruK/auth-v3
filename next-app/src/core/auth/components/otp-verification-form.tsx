"use client";

import { Button } from "@/components/ui/button";
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
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { signOut, twoFactor } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import z from "zod";
import { OTP } from "../schemas/otp";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  otpLink: string | null;
  isFirstTime: boolean;
}

export const OTPVerificationForm = ({ otpLink, isFirstTime }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof OTP>>({
    resolver: zodResolver(OTP),
    defaultValues: {
      code: "",
      remember: false,
    },
  });

  const onSubmit = (values: z.infer<typeof OTP>) => {
    startTransition(async () => {
      try {
        const { data, error } = await twoFactor.verifyTotp({
          code: values.code,
          trustDevice: values.remember,
        });

        console.log({
          tfaData: data,
          tfaError: error,
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        if (isFirstTime) {
          await signOut();
          toast.success("QR validated. You have been logged out.");
          router.push("/login");
          router.refresh();
          return;
        }

        toast.success("Login successful. Good to have you back.");
        router.push(DEFAULT_LOGIN_REDIRECT);
        router.refresh();
      } catch (error) {
        // console.log({ error });
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div>
      {otpLink && <QRCode value={otpLink} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
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
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        form.setValue("remember", !field.value);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Remember this device.
                  </FormLabel>
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
