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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, TransitionStartFunction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { deleteUser } from "../actions/delete-user";
import { DeleteAccountSchema } from "../schemas/delete-account";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  userEmail: string;
  isPending: boolean;
  startTransition: TransitionStartFunction;
  setOpenDeleteAccountDialog: (open: boolean) => void;
  closeDialog?: ReactNode;
}

const DeleteAccountForm = ({
  userEmail,
  isPending,
  startTransition,
  setOpenDeleteAccountDialog,
  closeDialog,
  ...restProps
}: Props) => {
  const form = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof DeleteAccountSchema>) => {
    startTransition(async () => {
      deleteUser(values, userEmail)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            return;
          }

          if (data.success) {
            toast.success(data.success);
            setOpenDeleteAccountDialog(false);
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  return (
    <>
      <Form {...form} {...restProps}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6", restProps.className)}
        >
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
          </div>

          <div className="flex items-center gap-x-6 gap-y-2 max-sm:flex-wrap">
            <CustomButton
              buttonLabel={`Send verification email`}
              type="submit"
              className="w-full"
              variant={"danger"}
              disabled={isPending}
              skeletonClassName="w-full"
            />
            {closeDialog}
          </div>
        </form>
      </Form>
    </>
  );
};

export default DeleteAccountForm;
