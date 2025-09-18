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
import { Input } from "@/components/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { Session } from "@/types/session";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { LoginSchema } from "../schemas/login";
import { signIn } from "@/lib/auth-client";
import { PasswordInput } from "@/components/ui/password-input";

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

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      /**
       * Client side signup
       *
       * for server side signup check ../actions/sign-in.ts > signIn
       */
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onRequest: () => {},
          onResponse: () => {},
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: (context) => {
            if (context.data.twoFactorRedirect) {
              toast.success("Enter OTP");
              router.push("/two-factor-verification");
              return;
            }

            toast.success("Login successful. Good to have you back.");
            router.push(DEFAULT_LOGIN_REDIRECT);
            router.refresh();
          },
        }
      );
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
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
                      className="px-0 font-normal text-foreground ms-auto">
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
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};
