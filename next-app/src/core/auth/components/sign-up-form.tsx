"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { signUpEmail } from "../actions/sign-up-email";
import { RegisterSchema } from "../schemas/register";

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      //  Server side signup
      signUpEmail(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            router.push(DEFAULT_LOGIN_REDIRECT);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });

      //  Client side signup
      // await signUp.email(
      //   {
      //     name: values.name,
      //     email: values.email,
      //     password: values.password,
      //   },
      //   {
      //     onRequest: () => {
      //       toast.warning("Sending data...");
      //     },
      //     onResponse: () => {},
      //     onError: (ctx) => {
      //       toast.error(ctx.error.message);
      //     },
      //     onSuccess: () => {
      //       toast.success("You have successfully created an account.");
      //       router.push(DEFAULT_LOGIN_REDIRECT);
      //     },
      //   }
      // );
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="john doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="******"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Password must contain at least one of each: lowercase letters,
                  uppercase letters, numbers and special characters
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          Register
        </Button>
      </form>
    </Form>
  );
};
