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
import { MESSAGES } from "@/constants/messages";
import { changeEmail } from "@/core/auth/actions/change-email";
import { ChangeEmailSchema } from "@/core/auth/schemas/change-email";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, TransitionStartFunction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  userEmail: string;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  setOpenChangeEmailDialog: Dispatch<SetStateAction<boolean>>;
}

const ChangeEmailForm = ({
  userEmail,
  isLoading,
  startTransition,
  setOpenChangeEmailDialog,
  ...restProps
}: Props) => {
  const form = useForm<z.infer<typeof ChangeEmailSchema>>({
    resolver: zodResolver(ChangeEmailSchema),
    defaultValues: {
      oldEmail: "",
      newEmail: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ChangeEmailSchema>) => {
    startTransition(async () => {
      changeEmail(values, userEmail)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            return;
          }

          if (data.success) {
            toast.success(data.success);
          }

          setOpenChangeEmailDialog(false);
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
          setOpenChangeEmailDialog(false);
        });
    });
  };

  return (
    <Form {...form} {...restProps}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(restProps.className, "space-y-6")}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="oldEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john.doe@example.com"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john.doe@example.com"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <CustomButton
            buttonLabel={`Confirm`}
            type="submit"
            className="grow"
            disabled={isLoading}
            skeletonClassName="grow"
          />
          <CustomButton
            buttonLabel={`Cancel`}
            type="button"
            className="grow"
            variant={"outline"}
            disabled={isLoading}
            skeletonClassName="grow"
            onClick={() => setOpenChangeEmailDialog(false)}
          />
        </div>
      </form>
    </Form>
  );
};

export default ChangeEmailForm;
