import { PageStructure } from "@/components/page-structure";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">{session?.user.name}</h1>

      <div>
        <p>Role: {session?.user.role}</p>
        <p>Email: {session?.user.email}</p>
        <p>Image: {session?.user.image || "no image"}</p>
        <p>Ban: {JSON.stringify(session?.user.banned, null, 2)}</p>
        <p>Ban Reason: {session?.user.banReason || "no reason"}</p>
        <p>Ban Expires: {JSON.stringify(session?.user.banExpires)}</p>
        <p>2FA: {JSON.stringify(session?.user.twoFactorEnabled)}</p>
      </div>
    </PageStructure>
  );
};

export default ProfilePage;
