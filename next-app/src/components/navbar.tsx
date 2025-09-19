"use client";

import { BUTTON_EFFECT } from "@/constants/misc";
import { usePathname } from "next/navigation";
import { CustomButton } from "./custom-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full items-center justify-between">
      <div className="flex gap-x-2">
        <CustomButton
          buttonLabel={`Home`}
          effect={pathname === "/" ? "gradientSlideShow" : BUTTON_EFFECT}
          variant={"outline"}
          className=""
          linkHref="/"
        />
        <CustomButton
          buttonLabel={`Server`}
          effect={pathname === "/server" ? "gradientSlideShow" : BUTTON_EFFECT}
          variant={"outline"}
          className=""
          linkHref="/server"
        />
        <CustomButton
          buttonLabel={`Client`}
          effect={pathname === "/client" ? "gradientSlideShow" : BUTTON_EFFECT}
          variant={"outline"}
          className=""
          linkHref="/client"
        />
        <CustomButton
          buttonLabel={`Admin`}
          effect={pathname === "/admin" ? "gradientSlideShow" : BUTTON_EFFECT}
          variant={"outline"}
          className=""
          linkHref="/admin"
        />
        <CustomButton
          buttonLabel={`Profile`}
          effect={pathname === "/profile" ? "gradientSlideShow" : BUTTON_EFFECT}
          variant={"outline"}
          className=""
          linkHref="/profile"
        />
        <CustomButton
          buttonLabel={`Settings`}
          effect={
            pathname === "/settings" ? "gradientSlideShow" : BUTTON_EFFECT
          }
          variant={"outline"}
          className=""
          linkHref="/settings"
        />
      </div>
    </nav>
  );
};
