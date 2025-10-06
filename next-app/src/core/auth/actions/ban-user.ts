"use server";

import { MESSAGES } from "@/constants/messages";
import { UserRole } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { UserWithRole } from "better-auth/plugins/admin";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const banUser = async (user: UserWithRole) => {
  if (user.role === UserRole.OWNER)
    return {
      error: MESSAGES.USER_ADMIN_OWNER,
    };

  try {
    await auth.api.banUser({
      body: {
        userId: user.id,
      },
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: `${MESSAGES.USER_ADMIN_BAN} ${user.email}`,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof APIError)
      return {
        error: error.message,
      };

    throw error;
  }
};

export const unbanUser = async (user: UserWithRole) => {
  try {
    await auth.api.unbanUser({
      body: {
        userId: user.id,
      },
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: `${MESSAGES.USER_ADMIN_UNBAN} ${user.email}`,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof APIError)
      return {
        error: error.message,
      };

    throw error;
  }
};
