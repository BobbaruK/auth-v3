"use client";

import { CustomButton } from "@/components/custom-button";
import { EnvelopeIcon } from "@/components/icons/envelope";
import { lazy, Suspense, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
const MagicLinkForm = lazy(() => import("./magic-link-form"));

const SignInMagicLink = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useCustomMediaQuery();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <CustomButton
            buttonLabel="Magic link"
            iconPlacement="left"
            icon={EnvelopeIcon}
            variant={"outline"}
            className="w-full"
            skeletonClassName="grow"
            onClick={() => setOpen(!open)}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter your email address</DialogTitle>
            <DialogDescription>
              We will send you a link by mail that will sign you in instantly!
            </DialogDescription>
          </DialogHeader>

          <Suspense fallback={<MagicLinkFormSkeleton />}>
            <MagicLinkForm setOpen={setOpen} />
          </Suspense>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <CustomButton
          buttonLabel="Magic link"
          iconPlacement="left"
          icon={EnvelopeIcon}
          variant={"outline"}
          className="grow"
          skeletonClassName="grow"
          onClick={() => setOpen(!open)}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Enter your email address</DrawerTitle>
          <DrawerDescription>
            We will send you a link by mail that will sign you in instantly!
          </DrawerDescription>
        </DrawerHeader>

        <Suspense fallback={<MagicLinkFormSkeleton className="mb-4 px-4" />}>
          <MagicLinkForm className="mb-4 px-4" setOpen={setOpen} />
        </Suspense>
      </DrawerContent>
    </Drawer>
  );
};

export default SignInMagicLink;

function MagicLinkFormSkeleton({
  className,
  ...restProps
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4", className)} {...restProps}>
      <div className="flex flex-col items-center justify-end gap-2">
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[36px] w-full" />
      </div>
      <div className="flex items-center justify-end gap-6">
        <Skeleton className="h-10 w-[90px]" />
      </div>
    </div>
  );
}
