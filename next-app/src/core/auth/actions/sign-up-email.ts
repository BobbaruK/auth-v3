"use server";

import { MESSAGES } from "@/constants/messages";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { RegisterSchema } from "@/core/auth/schemas/register";
import { auth } from "@/lib/auth";
import { catchError } from "@/lib/utils/catch-error-action";
import { revalidatePath } from "next/cache";
import z from "zod";

export const signUpEmail = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<
  | {
      success: string;
      error?: undefined;
      username_error?: undefined;
    }
  | {
      error: string;
      username_error?: undefined;
      success?: undefined;
    }
  | {
      error: string;
      username_error: boolean;
      success?: undefined;
    }
> => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { firstName, lastName, userName, email, password } =
    validatedFields.data;

  try {
    const { available } = await auth.api.isUsernameAvailable({
      body: {
        username: userName,
      },
    });

    if (!available) {
      return { error: MESSAGES.USERNAME_NOT_AVAILABLE, username_error: true };
    }

    await auth.api.signUpEmail({
      body: {
        name: `${lastName} ${firstName}`,
        firstName,
        lastName,
        username: userName,
        email,
        password,
        callbackURL: DEFAULT_LOGIN_REDIRECT,
      },
    });

    revalidatePath("/");

    return {
      success: MESSAGES.REGISTRATION_SUCCESS,
    };
  } catch (error) {
    return catchError(error);
  }
};
