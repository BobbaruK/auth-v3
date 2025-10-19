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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransitionStartFunction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { setPassword } from "../../actions/set-password";
import { NewPasswordSchema } from "../../schemas/new-password";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  setOpenChangePasswordDialog: (open: boolean) => void;
}

const SetPasswordForm = ({
  isLoading,
  startTransition,
  setOpenChangePasswordDialog,
  ...restProps
}: Props) => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
      confirmPassword: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(async () => {
      await setPassword(values)
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
          setOpenChangePasswordDialog(false);
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    id="confirmPassword"
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

        <CustomButton
          buttonLabel={`Set password`}
          type="submit"
          className="w-full"
          disabled={isLoading}
          skeletonClassName="w-full"
        />
      </form>
    </Form>
  );
};

export default SetPasswordForm;

export function SetPasswordSkeleton({
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
      </div>
      <div className="flex items-center justify-end gap-6">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 grow" />
      </div>
    </div>
  );
}
