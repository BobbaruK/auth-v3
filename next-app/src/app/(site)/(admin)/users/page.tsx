import { PageStructure } from "@/components/page-structure";
import { loadSearchParams } from "@/components/search-params";
import { DataTableTransitionWrapper } from "@/core/auth/components/tables/data-table-transition-wrapper";
import { getUsers } from "@/core/auth/data/get-users";
import { UserSession } from "@/types/session";
import { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const { pageIndex, pageSize } = await loadSearchParams(searchParams);

  const usersData = await getUsers({
    pageNumber: pageIndex,
    perPage: pageSize,
  });
  const users = usersData?.data as UserSession[];

  const totalUsers = usersData?.total || 0;

  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Users ({totalUsers})</h1>

      <DataTableTransitionWrapper
        data={users}
        dataCount={totalUsers}
        columnVisibilityObj={{
          username: false,
          banReason: false,
          banExpires: false,
          lastLoginAt: false,
          lastLoginMethod: false,
        }}
      />

      {/*
      <div>
        <pre>{JSON.stringify(usersData, null, 2)}</pre>
      </div> */}
    </PageStructure>
  );
};

export default UsersPage;
