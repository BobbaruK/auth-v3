"use client";

import { CustomButton } from "@/components/custom-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { MESSAGES } from "@/constants/messages";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { Session } from "@/types/session";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { signInEmail, signInUsername } from "../actions/sign-in";
import { LoginSchema } from "../schemas/login";

const emailSchema = z.email();
const usernameSchema = z.string();

interface Props {
  session: Session | null;
}

export const SignInForm = ({ session }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
    },
  });

  const signInEmailServer = async (values: z.infer<typeof LoginSchema>) =>
    signInEmail(values)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          if (data.redirectOTP) {
            toast.success(MESSAGES.ENTER_OTP);
            router.push("/two-factor-verification");
            return;
          }

          toast.success(MESSAGES.LOGIN_SUCCESS);
          router.push(DEFAULT_LOGIN_REDIRECT);
          router.refresh();
        }
      })
      .catch(() => {
        toast.error(MESSAGES.SOMETHING_WRONG);
      });

  const signInUsernameServer = async (values: z.infer<typeof LoginSchema>) =>
    signInUsername(values)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          if (data.redirectOTP) {
            toast.success(MESSAGES.ENTER_OTP);
            router.push("/two-factor-verification");
            return;
          }

          toast.success(MESSAGES.LOGIN_SUCCESS);
          router.push(DEFAULT_LOGIN_REDIRECT);
          router.refresh();
        }
      })
      .catch(() => {
        toast.error(MESSAGES.SOMETHING_WRONG);
      });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      if (emailSchema.safeParse(values.email).success) {
        await signInEmailServer(values);

        return;
      }

      await signInUsernameServer(values);
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="john.doe@example.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-wrap items-center gap-4">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Button
                      size={"sm"}
                      variant={"link"}
                      asChild
                      className="text-foreground ms-auto px-0 font-normal"
                    >
                      <Link href={"/reset"}>Forgot password?</Link>
                    </Button>
                  </div>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      placeholder="******"
                      autoComplete="new-password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <CustomButton
            buttonLabel={`Login`}
            type="submit"
            className="w-full"
            disabled={isPending}
            skeletonClassName="w-full"
          />
        </form>
      </Form>
    </>
  );
};
