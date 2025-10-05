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
import { MESSAGES } from "@/constants/messages";
import { setPassword } from "@/core/auth/actions/set-password";
import { NewPasswordSchema } from "@/core/auth/schemas/new-password";
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
