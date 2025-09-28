"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import z from "zod";
import { NewPasswordSchema } from "../schemas/new-password";
import { MESSAGES } from "@/constants/messages";
import { revalidatePath } from "next/cache";

type SetPasswordResponse =
  | {
      error: string;
      success?: undefined;
    }
  | {
      success: string;
      error?: undefined;
    };

export const setPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
): Promise<SetPasswordResponse> => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword)
    return {
      error: MESSAGES.PASSWORDS_NOT_MATCH,
    };

  try {
    await auth.api.setPassword({
      body: { newPassword: password },
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: MESSAGES.PASSWORD_SET,
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
