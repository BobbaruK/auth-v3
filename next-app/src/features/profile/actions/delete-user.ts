"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { headers } from "next/headers";

type DeleteUserResponse =
  | {
      success: string;
      error?: null;
    }
  | {
      success?: null;
      error: string;
    };

export const deleteUser = async (): Promise<DeleteUserResponse> => {
  try {
    const data = await auth.api.deleteUser({
      body: {
        callbackURL: "/goodbye",
      },
      headers: await headers(),
    });

    return {
      success: data.message,
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
