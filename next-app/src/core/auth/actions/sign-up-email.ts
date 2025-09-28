"use server";

import { MESSAGES } from "@/constants/messages";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { auth } from "@/lib/auth";
import { ErrorCode } from "@/types/errors";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import z from "zod";
import { RegisterSchema } from "../schemas/register";

type SignUpResponse =
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
    };

export const signUpEmail = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<SignUpResponse> => {
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
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof APIError) {
      const errCode = error.body?.code as ErrorCode;

      switch (errCode) {
        // case "USER_ALREADY_EXISTS":
        //   return {
        //     error: "Oops! Something went wrong. Please try again.",
        //   };

        default:
          return {
            error: error.message,
          };
      }
    }

    throw error;
  }
};
