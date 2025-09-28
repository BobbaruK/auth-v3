"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { PersonalSchema } from "../schemas/personal";

export const updateUser = async (
  values: z.infer<typeof PersonalSchema>,
  userUsername: string,
) => {
  const validatedFields = PersonalSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { firstName, lastName, userName, bio } = validatedFields.data;

  try {
    const { available } = await auth.api.isUsernameAvailable({
      body: {
        username: userName,
      },
    });

    if (!available && userUsername !== userName) {
      return {
        error: MESSAGES.USERNAME_NOT_AVAILABLE,
        username_error: true,
      };
    }

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

    revalidatePath("/");

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
