"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { catchError } from "@/lib/utils/catch-error-action";
import { createFormattedSlug } from "@/lib/utils/format-string";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { PersonalSchema } from "../schemas/personal";

export const updateUser = async (
  values: z.infer<typeof PersonalSchema>,
  userUsername: string,
): Promise<
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
  | {
      success: string;
      error?: undefined;
      username_error?: undefined;
    }
> => {
  const validatedFields = PersonalSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { firstName, lastName, userName, bio } = validatedFields.data;

  const slug = createFormattedSlug(firstName, lastName, userName);

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
        slug,
        username: userName,
        name: `${lastName} ${firstName}`,
      },
      headers: await headers(),
    });

    // TODO: handle bio

    revalidatePath("/");

    return {
      success: MESSAGES.PROFILE_UPDATED,
    };
  } catch (error) {
    return catchError(error);
  }
};
