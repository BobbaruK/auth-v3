"use client";

import { CustomButton } from "@/components/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Prisma } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { PersonalSchema } from "../../schemas/personal";
import { updateUser } from "../../actions/update-user";
import { toast } from "sonner";
import { MESSAGES } from "@/constants/messages";

interface Props {
  user: Prisma.auth_userGetPayload<{}> | null;
}

export const PersonalForm = ({ user }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof PersonalSchema>>({
    resolver: zodResolver(PersonalSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      bio: user?.bio || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof PersonalSchema>) => {
    startTransition(async () => {
      await updateUser(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="John"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="userName">User Name X</Label>
            <Input id="userName" defaultValue={user?.name || ""} />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="location">Location X</Label>
            <Input id="location" defaultValue="San Francisco, CA" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone X</Label>
            <Input id="phone" defaultValue="+1 (555) 123-4567" />
          </div>
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomButton
          buttonLabel={`Save`}
          type="submit"
          className="ms-auto block"
          disabled={isPending}
          skeletonClassName="ms-auto block w-16"
        />
      </form>
    </Form>
  );
};
