"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import z from "zod";
import { PersonalSchema } from "../schemas/personal";

type UpdateUserResponse =
  | {
      success: string;
      error?: null;
    }
  | {
      success?: null;
      error: string;
    };

export const updateUser = async (
  values: z.infer<typeof PersonalSchema>,
): Promise<UpdateUserResponse> => {
  const validatedFields = PersonalSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { firstName, lastName, userName, bio } = validatedFields.data;

  try {
    await auth.api.updateUser({
      body: {
        firstName,
        lastName,
        username: userName,
        name: `${lastName} ${firstName}`,
        bio,
      },
      headers: await headers(),
    });

    return {
      success: MESSAGES.PROFILE_UPDATED,
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
