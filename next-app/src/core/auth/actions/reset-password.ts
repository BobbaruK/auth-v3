"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import z from "zod";
import { ResetPasswordSchema } from "../schemas/reset-password";

type ResetPasswordResponse =
  | {
      success: string;
      error?: null;
    }
  | {
      success?: null;
      error: string;
    };

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
): Promise<ResetPasswordResponse> => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { email } = validatedFields.data;

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/new-password`,
      },
    });

    return {
      success: MESSAGES.PASSWORD_RESET,
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
