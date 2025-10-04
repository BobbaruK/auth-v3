"use server";

import { MESSAGES } from "@/constants/messages";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { ChangeEmailSchema } from "../schemas/change-email";

export const changeEmail = async (
  values: z.infer<typeof ChangeEmailSchema>,
  userEmail: string,
) => {
  const validatedFields = ChangeEmailSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { oldEmail, newEmail } = validatedFields.data;

  if (userEmail !== oldEmail)
    return {
      error: MESSAGES.EMAIL_OLD_NOT_MATCH,
    };

  try {
    await auth.api.changeEmail({
      body: {
        newEmail: newEmail,
        callbackURL: DEFAULT_LOGIN_REDIRECT,
      },
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: MESSAGES.EMAIL_CHANGED,
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
