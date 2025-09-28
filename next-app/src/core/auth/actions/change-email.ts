"use server";

import { MESSAGES } from "@/constants/messages";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { ChangeEmailSchema } from "../schemas/change-email";

type ChangeEmailResponse =
  | {
      error: string;
      success?: undefined;
    }
  | {
      success: string;
      error?: undefined;
    };

export const changeEmail = async (
  values: z.infer<typeof ChangeEmailSchema>,
): Promise<ChangeEmailResponse> => {
  const validatedFields = ChangeEmailSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { email } = validatedFields.data;

  try {
    await auth.api.changeEmail({
      body: {
        newEmail: email,
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
