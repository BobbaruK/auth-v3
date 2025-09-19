"use client";

import { BUTTON_EFFECT } from "@/constants/misc";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Button,
  ButtonIconProps,
  ButtonProps,
  buttonVariants,
} from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  buttonLabel: string;
  linkHref?: string;
  hideLabelOnMobile?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
  skeletonClassName?: React.HtmlHTMLAttributes<HTMLButtonElement>["className"];
}

const CustomButton = React.forwardRef<
  HTMLButtonElement,
  Props & ButtonIconProps
>(
  (
    {
      buttonLabel,
      linkHref = "",
      hideLabelOnMobile = true,
      target,
      skeletonClassName,
      ...restProps
    },
    ref
  ) => {
    const matches = useMediaQuery("(min-width: 992px)");
    const [componentLoaded, setComponentLoaded] = useState(false);

    const spanClasses =
      !matches && restProps.icon && hideLabelOnMobile ? "hidden lg:inline" : "";

    useEffect(() => {
      setComponentLoaded(true);

      return () => setComponentLoaded(false);
    }, []);

    if (linkHref)
      return (
        <>
          {componentLoaded ? (
            <Button
              ref={ref}
              size={
                !matches && restProps.icon && hideLabelOnMobile
                  ? "icon"
                  : restProps.size
              }
              {...restProps}
              className={cn("gap-2 cursor-pointer", restProps.className)}
              effect={restProps.effect || BUTTON_EFFECT}
              asChild>
              <Link href={linkHref} target={target}>
                {restProps.size !== "icon" && (
                  <span className={cn(spanClasses)}>{buttonLabel}</span>
                )}
              </Link>
            </Button>
          ) : (
            <ButtonSkeleton className={skeletonClassName} />
          )}
        </>
      );

    return (
      <>
        {componentLoaded ? (
          <Button
            ref={ref}
            size={
              !matches && restProps.icon && hideLabelOnMobile
                ? "icon"
                : restProps.size
            }
            {...restProps}
            className={cn("gap-2 cursor-pointer", restProps.className)}
            effect={restProps.effect || BUTTON_EFFECT}>
            {restProps.size !== "icon" && (
              <span className={cn(spanClasses)}>{buttonLabel}</span>
            )}
          </Button>
        ) : (
          <ButtonSkeleton className={skeletonClassName} />
        )}
      </>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };

function ButtonSkeleton({
  className,
}: (ButtonProps & ButtonIconProps) & React.RefAttributes<HTMLButtonElement>) {
  return (
    <Skeleton
      className={cn(
        "h-10 block items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
    />
  );
}
