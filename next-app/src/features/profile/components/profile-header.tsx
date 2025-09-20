import { CustomAvatar } from "@/components/custom-avatar";
import { Badge } from "@/components/ui/badge";
import { dateFormatter } from "@/lib/utils/format-date";
import { UserSession } from "@/types/session";
import Link from "next/link";
import { GoCalendar, GoMail } from "react-icons/go";
import { HiOutlineMapPin } from "react-icons/hi2";

interface Props {
  user?: UserSession;
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
          <h1 className="text-2xl font-bold">{user.name}</h1>
        </div>
        <Badge variant={"default"}>{user.role}</Badge>
        {/* <p className="text-muted-foreground">{user.role}</p> */}
        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <GoMail />
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineMapPin />
            San Francisco, CA
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
