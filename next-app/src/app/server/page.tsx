import { PageStructure } from "@/components/page-structure";
import { UserInfo } from "@/components/user-info";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ServerPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Server</h1>

      <UserInfo user={session && session.user} />

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </PageStructure>
  );
};

export default ServerPage;
