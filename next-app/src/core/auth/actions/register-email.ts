"use server";

import { auth } from "@/lib/auth";
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

export const registerEmail = async (
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
    if (error instanceof Error) {
      return {
        error: "Oops! Something went wrong while registering",
      };
    }

    return {
      error: "Internal Server Error",
    };
  }
};
