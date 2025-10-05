"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export const revokeSelectedSesh = async (token: string) => {
  try {
    await auth.api.revokeSession({
      body: {
        token,
      },
      headers: await headers(),
    });

    return {
      success: MESSAGES.SESSION_REVOKED,
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

export const revokeOtherSeshs = async () => {
  try {
    await auth.api.revokeOtherSessions({
      headers: await headers(),
    });

    return {
      success: MESSAGES.SESSION_REVOKED_OTHERS,
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

export const revokeSeshs = async () => {
  try {
    await auth.api.revokeSessions({
      headers: await headers(),
    });

    return {
      success: MESSAGES.SESSION_REVOKED_ALL,
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
