"use client";

import { DataTable } from "@/core/table/components/data-table";
import TableProvider from "@/core/table/providers/table-provider";
import { UserSession } from "@/types/session";
import { VisibilityState } from "@tanstack/react-table";
import { useTransition } from "react";
import { userColumns } from "./users-columns";

interface Props {
  data: UserSession[];
  dataCount: number | null;
  columnVisibilityObj?: VisibilityState;
}

export const DataTableTransitionWrapper = ({
  data,
  dataCount,
  columnVisibilityObj,
}: Props) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <TableProvider
      isLoading={isLoading}
      startTransition={startTransition}
      dataCount={dataCount || 0}
    >
      <DataTable
        columns={userColumns({
          isLoading,
          startTransition,
        })}
        data={data}
        columnVisibilityObj={columnVisibilityObj}
        twSkeletonHeightCell="h-[64px]"
      />
    </TableProvider>
  );
};
