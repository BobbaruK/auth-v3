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
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { signInMagicLink } from "../actions/sign-in";
import { MagicLinkSchema } from "../schemas/magic-link";
import { cn } from "@/lib/utils";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  setOpen: (open: boolean) => void;
}

const MagicLinkForm = ({ setOpen, ...restProps }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof MagicLinkSchema>>({
    resolver: zodResolver(MagicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof MagicLinkSchema>) => {
    startTransition(async () => {
      signInMagicLink(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            setOpen(false);
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...restProps}
        className={cn("space-y-4", restProps.className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="john.doe@example.com"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <CustomButton
            buttonLabel={`Send link`}
            type="submit"
            className="ms-auto"
            disabled={isPending}
            skeletonClassName="w-[90px]"
          />
        </div>
      </form>
    </Form>
  );
};

export default MagicLinkForm;
