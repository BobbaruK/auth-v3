"use server";

import { auth } from "@/lib/auth";
import z from "zod";
import { RegisterSchema } from "../schemas/register";
import { APIError } from "better-auth/api";
import { ErrorCode } from "@/types/errors";

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
      },
    });

    return {
      success: "Registration complete, You're all set.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      const errCode = error.body?.code as ErrorCode;

      // console.log(errCode);

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
