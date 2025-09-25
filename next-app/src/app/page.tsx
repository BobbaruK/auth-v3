import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="container flex flex-col items-center gap-4 py-4">
      <h1>Boilerplate for better auth</h1>
      <div className="flex items-center gap-4">
        <Button variant={"default"} effect={"gradientSlideShow"} asChild>
          <Link href={"/login"}>Hello World</Link>
        </Button>
        <UserButton user={session?.user} />
      </div>
    </div>
  );
}
