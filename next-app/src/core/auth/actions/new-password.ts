"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import z from "zod";
import { NewPasswordSchema } from "../schemas/new-password";

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

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword)
    return {
      error: "Passwords do not match!",
    };

  if (!token)
    return {
      error: "Missing token!",
    };

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password, // required
        token, // required
      },
    });

    return {
      success:
        "Your password has been reset. Please login with your new password.",
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
