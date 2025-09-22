import { CustomAvatar } from "@/components/custom-avatar";
import { Badge } from "@/components/ui/badge";
import { auth_user } from "@/generated/prisma";
import { dateFormatter } from "@/lib/utils/format-date";
import Link from "next/link";
import { GoCalendar, GoMail } from "react-icons/go";

interface Props {
  user: auth_user | null;
}

export const ProfileHeader = ({ user }: Props) => {
  if (!user) return null;

  return (
    <div className="bg-card text-card-foreground flex w-full flex-row flex-wrap items-center gap-6 rounded-xl border p-4 py-6 shadow-sm lg:p-6">
      <div className="size-24">
        <CustomAvatar image={user.image} className="h-full w-full" />
      </div>
      <div className="space-y-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <h1 className="text-2xl font-bold">{user.displayUsername}</h1>
          <Badge variant={"default"}>{user.role}</Badge>
        </div>
        <p className="text-muted-foreground">
          {user.lastName} {user.firstName}
        </p>
        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <GoMail />
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </div>
          <div className="flex items-center gap-1">
            <GoCalendar />
            Joined{" "}
            {dateFormatter({
              date: user.createdAt,
              options: {
                month: "long",
                year: "numeric",
              },
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
