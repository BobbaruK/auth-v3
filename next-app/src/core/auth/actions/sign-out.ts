"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type SignOutResponse =
  | {
      success: string;
      error?: null;
    }
  | {
      success?: null;
      error: string;
    };

export const signOut = async (): Promise<SignOutResponse> => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: "You have successfully logout",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Internal Server Error",
    };
  }
};
