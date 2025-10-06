import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserButton } from "../user-button";

export const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header>
      <div className="container flex items-center justify-start py-4">
        <Navbar />

        <UserButton session={session} />
      </div>
    </header>
  );
};
