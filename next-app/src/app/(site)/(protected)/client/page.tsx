"use client";

import { PageStructure } from "@/components/page-structure";
import { UserInfo } from "@/components/user-info";
import { useSession } from "@/lib/auth-client";

const ClientPage = () => {
  const { data: session } = useSession();

  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Client</h1>

      <UserInfo user={session && session.user} />

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </PageStructure>
  );
};

export default ClientPage;
