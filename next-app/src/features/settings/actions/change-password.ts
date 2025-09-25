"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import z from "zod";
import { ChangePasswordSchema } from "../schemas/change-password";

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
) => {
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { currentPassword, newPassword, confirmNewPassword } =
    validatedFields.data;

  if (newPassword !== confirmNewPassword) {
    return {
      error: MESSAGES.PASSWORDS_NOT_MATCH,
    };
  }

  try {
    await auth.api.changePassword({
      body: {
        newPassword,
        currentPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });

    return {
      success: MESSAGES.PASSWORD_NEW,
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
