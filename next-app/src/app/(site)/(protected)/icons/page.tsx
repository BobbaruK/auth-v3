import { AccountIcon } from "@/components/icons/account";
import { AirplayIcon } from "@/components/icons/airplay";
import { CalendarIcon } from "@/components/icons/calendar";
import { CogIcon } from "@/components/icons/cog";
import { CopyIcon } from "@/components/icons/copy";
import { EnvelopeIcon } from "@/components/icons/envelope";
import { ErrorIcon } from "@/components/icons/error";
import { GamepadIcon } from "@/components/icons/gamepad";
import { GithubIcon } from "@/components/icons/github";
import { GogglesIcon } from "@/components/icons/goggles";
import { GoogleIcon } from "@/components/icons/google";
import { KeyIcon } from "@/components/icons/key";
import { LoginIcon } from "@/components/icons/login";
import { LogoutIcon } from "@/components/icons/logout";
import { MobileIcon } from "@/components/icons/mobile";
import { MonitorIcon } from "@/components/icons/monitor";
import { MoonIcon } from "@/components/icons/moon";
import { ShieldIcon } from "@/components/icons/shield";
import { TabletIcon } from "@/components/icons/tablet";
import { TerminalIcon } from "@/components/icons/terminal";
import { TrashIcon } from "@/components/icons/trash";
import { TVIcon } from "@/components/icons/tv";
import { UserIcon } from "@/components/icons/user";
import { WatchIcon } from "@/components/icons/watch";
import { PageStructure } from "@/components/page-structure";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const IconsPage = () => {
  const icons: {
    name: string;
    icon: React.ElementType;
  }[] = [
    {
      name: "MoonIcon",
      icon: MoonIcon,
    },
    {
      name: "KeyIcon",
      icon: KeyIcon,
    },
    {
      name: "ShieldIcon",
      icon: ShieldIcon,
    },
    {
      name: "ErrorIcon",
      icon: ErrorIcon,
    },
    {
      name: "AccountIcon",
      icon: AccountIcon,
    },
    {
      name: "EnvelopeIcon",
      icon: EnvelopeIcon,
    },
    {
      name: "TerminalIcon",
      icon: TerminalIcon,
    },
    {
      name: "UserIcon",
      icon: UserIcon,
    },
    {
      name: "LoginIcon",
      icon: LoginIcon,
    },
    {
      name: "LogoutIcon",
      icon: LogoutIcon,
    },
    {
      name: "CogIcon",
      icon: CogIcon,
    },
    {
      name: "GithubIcon",
      icon: GithubIcon,
    },
    {
      name: "GoogleIcon",
      icon: GoogleIcon,
    },
    {
      name: "CalendarIcon",
      icon: CalendarIcon,
    },
    {
      name: "TrashIcon",
      icon: TrashIcon,
    },
    {
      name: "CopyIcon",
      icon: CopyIcon,
    },
    {
      name: "ConsoleControllerIcon",
      icon: GamepadIcon,
    },
    {
      name: "MobileIcon",
      icon: MobileIcon,
    },
    {
      name: "TVIcon",
      icon: TVIcon,
    },
    {
      name: "TabletIcon",
      icon: TabletIcon,
    },
    {
      name: "WatchIcon",
      icon: WatchIcon,
    },
    {
      name: "AirplayIcon",
      icon: AirplayIcon,
    },
    {
      name: "GogglesIcon",
      icon: GogglesIcon,
    },
    {
      name: "MonitorIcon",
      icon: MonitorIcon,
    },
  ];

  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Icons ({icons.length})</h1>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        {icons
          .sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          })
          .map((icon) => (
            <Card key={icon.name}>
              <CardContent className="grid place-items-center gap-2">
                {React.createElement(icon.icon, {
                  size: 80,
                  strokeWidth: 1,
                  // absoluteStrokeWidth: true,
                })}

                <p>{icon.name}</p>
              </CardContent>
            </Card>
          ))}
      </div>
    </PageStructure>
  );
};

export default IconsPage;
