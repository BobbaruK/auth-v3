import { CustomButton } from "@/components/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGES } from "@/constants/messages";
import { ChangePasswordSchema } from "@/core/auth/schemas/change-password";
import { changePassword } from "@/core/user/actions/change-password";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransitionStartFunction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  setOpenChangePasswordDialog: (open: boolean) => void;
}

const ChangePasswordForm = ({
  isLoading,
  startTransition,
  setOpenChangePasswordDialog,
  ...restProps
}: Props) => {
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
      newPassword: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
      confirmNewPassword:
        process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(async () => {
      await changePassword(values)
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
        })
        .finally(() => {
          setOpenChangePasswordDialog(false);
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(restProps.className, "space-y-6")}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="currentPassword">
                  Current password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    id="currentPassword"
                    placeholder="******"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newPassword">New password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="newPassword"
                    placeholder="******"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmNewPassword">
                  Confirm new password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    id="confirmNewPassword"
                    placeholder="******"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <CustomButton
            buttonLabel={`Change password`}
            type="submit"
            className="grow"
            disabled={isLoading}
            skeletonClassName="w-full"
          />
          <CustomButton
            buttonLabel={`Cancel`}
            type="button"
            className="grow"
            variant={"outline"}
            disabled={isLoading}
            skeletonClassName="grow"
            onClick={() => setOpenChangePasswordDialog(false)}
          />
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;

export function ChangePasswordSkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...restProps}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-6">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 grow" />
      </div>
    </div>
  );
}
