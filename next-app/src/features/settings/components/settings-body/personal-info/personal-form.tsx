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
import { Textarea } from "@/components/ui/textarea";
import { MESSAGES } from "@/constants/messages";
import { updateUser } from "@/core/user/actions/update-user";
import { PersonalSchema } from "@/core/user/schemas/personal";
import { useSettingsContext } from "@/features/settings/providers/settings";
import { useSession } from "@/lib/auth-client";
import { createFormattedSlug } from "@/lib/utils/format-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const PersonalForm = () => {
  const { user, isLoading, startTransition } = useSettingsContext();
  const form = useForm<z.infer<typeof PersonalSchema>>({
    resolver: zodResolver(PersonalSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userName: user?.displayUsername || undefined,
      slug: user.slug,
      bio: user?.bio || undefined,
    },
  });
  const router = useRouter();
  const { refetch } = useSession();

  const onSubmit = (values: z.infer<typeof PersonalSchema>) => {
    startTransition(async () => {
      updateUser(values, user?.displayUsername || "")
        .then((data) => {
          if (data.username_error) {
            form.setError("userName", {
              message: MESSAGES.USERNAME_NOT_AVAILABLE,
            });
          }

          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }

          refetch();
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
                    disabled={isLoading}
                    onKeyUp={() => {
                      form.setValue(
                        "slug",
                        createFormattedSlug(
                          field.value,
                          form.getValues("lastName"),
                          form.getValues("userName"),
                        ),
                      );
                    }}
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
                    disabled={isLoading}
                    onKeyUp={() => {
                      form.setValue(
                        "slug",
                        createFormattedSlug(
                          form.getValues("firstName"),
                          field.value,
                          form.getValues("userName"),
                        ),
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Doughnut"
                    disabled={isLoading}
                    onKeyUp={() => {
                      form.setValue(
                        "slug",
                        createFormattedSlug(
                          form.getValues("firstName"),
                          form.getValues("lastName"),
                          field.value,
                        ),
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="doe-john-doughnut"
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  disabled={isLoading}
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
          disabled={isLoading}
          skeletonClassName="ms-auto block w-16"
        />
      </form>
    </Form>
  );
};
