"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import z from "zod";
import { NewPasswordSchema } from "../schemas/new-password";
import { MESSAGES } from "@/constants/messages";

type NewPasswordResponse =
  | {
      success: string;
      error?: null;
    }
  | {
      success?: null;
      error: string;
    };

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string
): Promise<NewPasswordResponse> => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword)
    return {
      error: MESSAGES.PASSWORDS_NOT_MATCH,
    };

  if (!token)
    return {
      error: MESSAGES.TOKEN_MISSING,
    };

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password, // required
        token, // required
      },
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
