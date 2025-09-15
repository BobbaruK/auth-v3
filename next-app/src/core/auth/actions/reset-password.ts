"use server";

import z from "zod";
import { ResetPasswordSchema } from "../schemas/reset-password";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

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

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email } = validatedFields.data;

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/new-password`,
      },
    });

    return {
      success:
        "Success! An email has been sent to you to confirm password reset.",
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
