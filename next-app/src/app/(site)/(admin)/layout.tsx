import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { UserRole } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  if (session.user.role === UserRole.USER) redirect(DEFAULT_LOGIN_REDIRECT);

  return children;
}
