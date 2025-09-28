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
import { disable2fa, enable2fa } from "@/features/settings/actions/handle-2fa";
import { Handle2faSchema } from "@/features/settings/schemas/handle-2fa";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Props extends React.ButtonHTMLAttributes<HTMLFormElement> {
  twoFA?: boolean | null;
  closeDialog: () => void;
}

export const TwoFactorForm = ({ twoFA, closeDialog, ...restProps }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { refetch } = useSession();
  const form = useForm<z.infer<typeof Handle2faSchema>>({
    resolver: zodResolver(Handle2faSchema),
    defaultValues: {
      password: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
    },
  });

  const onSubmit = (values: z.infer<typeof Handle2faSchema>) => {
    startTransition(async () => {
      if (!twoFA) {
        enable2fa(values)
          .then(async (data) => {
            if (data.error) {
              toast.error(data.error);
            }
            if (data.success) {
              toast.success(data.success);
              router.push(
                `/two-factor-verification?twoFactor=${encodeURIComponent(data.totpURI)}&twoFactorFirstTime=true`,
              );
            }
          })
          .catch(() => {
            toast.error(MESSAGES.SOMETHING_WRONG);
          })
          .finally(() => {
            closeDialog();
          });

        return;
      }

      disable2fa(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            // router.refresh();
            toast.success(data.success);
          }

          refetch();
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        })
        .finally(() => {
          closeDialog();
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
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

        <div className="flex flex-wrap items-center gap-6">
          <CustomButton
            buttonLabel={twoFA ? "Disable" : "Enable"}
            type="submit"
            className="grow"
            variant={twoFA ? "warning" : "success"}
            disabled={isPending}
            skeletonClassName="grow"
          />
          <CustomButton
            buttonLabel={`Cancel`}
            type="button"
            className="grow"
            variant={"outline"}
            disabled={isPending}
            skeletonClassName="grow"
            onClick={closeDialog}
          />
        </div>
      </form>
    </Form>
  );
};
