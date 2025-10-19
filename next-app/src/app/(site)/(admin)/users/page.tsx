import { PageStructure } from "@/components/page-structure";
import { loadSearchParams } from "@/components/search-params";
import { DataTableTransitionWrapper } from "@/core/admin/components/tables/data-table-transition-wrapper";
import { getPrismaUsers, getUsers } from "@/core/admin/data/get-users";
import { UserSession } from "@/types/session";
import { SearchParams } from "nuqs/server";

interface Props {
  searchParams: Promise<SearchParams>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const {
    // pagination
    pageIndex,
    pageSize,
    // sorting
    sortBy,
    sort,
    // filtering
    search,
    searchBy,
    // Select
    selected,
  } = await loadSearchParams(searchParams);

  const usersData = await getUsers({
    // pagination
    pageNumber: pageIndex,
    perPage: pageSize,
    // sorting
    sortBy,
    sortDirection: sort || undefined,
    // filtering
    searchValue: search,
    searchField: searchBy,
  });
  const users = usersData?.data as UserSession[];

  const totalUsers = usersData?.total || 0;

  const usersSelected = await getPrismaUsers({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
  });

  if (usersData.error) {
    return (
      <PageStructure>
        <h1 className="text-3xl font-bold">Forbidden!</h1>
      </PageStructure>
    );
  }

  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Users ({totalUsers})</h1>

      <DataTableTransitionWrapper
        data={users}
        dataCount={totalUsers}
        dataSelected={usersSelected || []}
      />

      {/*
      <div>
        <pre>{JSON.stringify(usersData, null, 2)}</pre>
      </div> */}
    </PageStructure>
  );
};

export default UsersPage;
