"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { auth } from "@/lib/auth";
import { ErrorCode } from "@/types/errors";
import { APIError } from "better-auth/api";
import z from "zod";
import { RegisterSchema } from "../schemas/register";

type RegisterResponse =
  | {
      success: string;
      error?: null;
    }
  | {
      success?: null;
      error: string;
    };

export const signUpEmail = async (
  values: z.infer<typeof RegisterSchema>
): Promise<RegisterResponse> => {
  const { email, name, password } = values;

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: DEFAULT_LOGIN_REDIRECT,
      },
    });

    return {
      success: "Registration complete, please verify your email.",
    };
  } catch (error) {
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

    return {
      error: "Internal Server Error",
    };
  }
};
