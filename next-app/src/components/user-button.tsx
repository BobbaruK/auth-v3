"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MESSAGES } from "@/constants/messages";
import { signOut } from "@/core/auth/actions/sign-out";
import { UserSession } from "@/types/session";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosLogIn } from "react-icons/io";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { toast } from "sonner";
import { CustomAvatar } from "./custom-avatar";

interface Props {
  user: UserSession | undefined;
}

export const UserButton = ({ user }: Props) => {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const [theTheme, setTheTheme] = useState(theme);
  const pathname = usePathname();

  const logOut = () => {
    startTransition(async () => {
      signOut()
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            router.push("/login");
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <CustomAvatar image={user?.image || ""} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {user && (
          <>
            <DropdownMenuLabel>
              {user?.displayUsername || user.name}
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              {pathname !== "/settings" ? (
                <Link
                  href={"/settings"}
                  className="flex cursor-pointer items-center justify-start gap-2 p-2"
                >
                  <IoSettingsOutline /> Settings
                </Link>
              ) : (
                <span className="flex cursor-pointer items-center justify-start gap-2 p-2">
                  <IoSettingsOutline /> Settings
                </span>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {pathname !== `/profile/${user.id}` ? (
                <Link
                  href={`/profile/${user.id}`}
                  className="flex cursor-pointer items-center justify-start gap-2 p-2"
                >
                  <CiUser /> Profile
                </Link>
              ) : (
                <span className="flex cursor-pointer items-center justify-start gap-2 p-2">
                  <CiUser /> Profile
                </span>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theTheme} onValueChange={setTheTheme}>
          <DropdownMenuRadioItem
            value="light"
            onClick={() => setTheme("light")}
            className="cursor-pointer"
          >
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="dark"
            onClick={() => setTheme("dark")}
            className="cursor-pointer"
          >
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="system"
            onClick={() => setTheme("system")}
            className="cursor-pointer"
          >
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        {user ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex cursor-pointer items-center justify-start gap-3 p-2"
              onClick={logOut}
            >
              <IoExitOutline /> Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                className="flex cursor-pointer items-center justify-start gap-3 p-2"
                href={"/login"}
              >
                <IoIosLogIn /> Login
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
