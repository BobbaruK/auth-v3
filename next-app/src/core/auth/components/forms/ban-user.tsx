"use client";

import { CustomButton } from "@/components/custom-button";
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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { chunkArray } from "@/lib/utils/chunk-array";
import { UserSession } from "@/types/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransitionStartFunction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { banUser } from "../../actions/ban-user";
import { BanUserSchema } from "../../schemas/ban-user";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  users: UserSession[];
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  setBanDialog?: (open: boolean) => void;
}

const BanUserForm = ({
  users,
  isLoading,
  startTransition,
  setBanDialog,
  ...restProps
}: Props) => {
  const form = useForm<z.infer<typeof BanUserSchema>>({
    resolver: zodResolver(BanUserSchema),
    defaultValues: {
      banReason: "",
      banExpiresIn: 0,
    },
  });

  const userIdBatches = chunkArray(users, 2);

  const onSubmit = (values: z.infer<typeof BanUserSchema>) => {
    setBanDialog?.(false);

    startTransition(async () => {
      for (const batch of userIdBatches) {
        const results = (await Promise.allSettled(
          batch.map((user) =>
            banUser({
              user,
              banReason: values.banReason,
              banExpiresIn: values.banExpiresIn,
            }),
          ),
        )) as {
          status: string;
          value: {
            error?: string;
            success?: string;
          };
        }[];

        for (const result of results) {
          if (result.value.error) toast.error(result.value.error);
          if (result.value.success) toast.success(result.value.success);
        }

        await new Promise((r) => setTimeout(r, 200));
      }
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
            name="banReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ban Reason</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Spam"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="banExpiresIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ban expires</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="3600"
                    disabled={isLoading}
                    {...form.register("banExpiresIn", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormDescription>In seconds</FormDescription>
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
            onClick={() => setBanDialog?.(false)}
          />
        </div>
      </form>
    </Form>
  );
};

export default BanUserForm;

export function BanUserFormSkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-6", className)} {...restProps}>
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <Skeleton className="h-[14px] w-full" />
          <Skeleton className="h-[36px] w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-6">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 grow" />
      </div>
    </div>
  );
}
