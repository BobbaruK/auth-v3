"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CalendarIcon } from "@/components/icons/calendar";
import { EnvelopeIcon } from "@/components/icons/envelope";
import { Badge } from "@/components/ui/badge";
import { dateFormatter } from "@/lib/utils/format-date";
import Link from "next/link";
import { useSettingsContext } from "../providers/settings";

export const SettingsHeader = () => {
  const { user } = useSettingsContext();

  const { firstName, image, lastName, meta, role, username } = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.displayUsername || user.firstName,
    role: user.role,
    image: user.image,
    meta: {
      email: user.email,
      joined: user.createdAt,
    },
  };

  return (
    <div className="bg-card text-card-foreground flex w-full flex-row flex-wrap items-center gap-6 rounded-xl border p-4 py-6 shadow-sm lg:p-6">
      <div className="size-24">
        <CustomAvatar image={image} className="h-full w-full" />
      </div>
      <div className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <h1 className="text-2xl font-bold">{username}</h1>
          {role && <Badge variant={"default"}>{role}</Badge>}
        </div>
        <p className="text-muted-foreground">
          {lastName} {firstName}
        </p>
        {meta && (
          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            {meta.email && (
              <div className="flex items-center gap-1">
                <EnvelopeIcon />
                <Link href={`mailto:${meta.email}`}>{meta.email}</Link>
              </div>
            )}
            {meta.joined && (
              <div className="flex items-center gap-1">
                <CalendarIcon />
                Joined{" "}
                {dateFormatter({
                  date: meta.joined,
                  options: {
                    month: "long",
                    year: "numeric",
                  },
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
