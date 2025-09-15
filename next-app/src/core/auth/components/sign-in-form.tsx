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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { signIn } from "../actions/sign-in";
import { LoginSchema } from "../schemas/login";

export const SignInForm = () => {
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
      //  Server side signup
      signIn(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(DEFAULT_LOGIN_REDIRECT);
            router.refresh(); // not working
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });

      //  Client side signup
      // await signIn.email(
      //   {
      //     email: values.email,
      //     password: values.password,
      //   },
      //   {
      //     onRequest: () => {},
      //     onResponse: () => {},
      //     onError: (ctx) => {
      //       toast.error(ctx.error.message);
      //     },
      //     onSuccess: () => {
      //       toast.success("Login successful. Good to have you back.");
      //       router.push(DEFAULT_LOGIN_REDIRECT);
      //     },
      //   }
      // );
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
                    <FormLabel>Password</FormLabel>
                    <Button
                      size={"sm"}
                      variant={"link"}
                      asChild
                      className="px-0 font-normal text-foreground ms-auto">
                      <Link href={"/auth/reset"}>Forgot password?</Link>
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Confirm
          </Button>
        </form>
      </Form>
    </>
  );
};
