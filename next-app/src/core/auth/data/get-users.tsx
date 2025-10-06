"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { headers } from "next/headers";

export const getUsers = async () => {
  try {
    const users = await auth.api.listUsers({
      query: {},
      headers: await headers(),
    });

    return {
      data: users.users,
      total: users.total,
    };
  } catch (error) {
    // console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof APIError) {
      // console.log(error.message);
      return {
        error: error.message,
      };
    }

    return null;
  }
};
