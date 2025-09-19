"use server";

import { MESSAGES } from "@/constants/messages";
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
      success: MESSAGES.LOGOUT_SUCCESS,
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
