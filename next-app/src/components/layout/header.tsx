import { Navbar } from "@/components/navbar";
import { SignOutButton } from "@/core/auth/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";

export const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header>
      <div className="container flex items-center justify-start py-4">
        <Navbar />
        {session ? (
          <SignOutButton />
        ) : (
          <Button variant={"outline"} asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
