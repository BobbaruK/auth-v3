"use server";

import { PAGINATION_DEFAULT } from "@/constants/table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUsers = async ({
  pageNumber,
  perPage,
  sortBy,
  sortDirection,
}: {
  perPage?: number;
  pageNumber?: number;
  sortBy: string;
  sortDirection: "asc" | "desc" | undefined;
}) => {
  const limit = perPage || PAGINATION_DEFAULT;
  const offset = pageNumber ? pageNumber * limit : 0;

  console.log({ perPage, pageNumber, sortBy, sortDirection });

  try {
    const users = await auth.api.listUsers({
      query: {
        limit,
        offset,
        sortBy,
        sortDirection,
      },
      headers: await headers(),
    });

    return {
      data: users.users,
      total: users.total,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    return null;
  }
};
