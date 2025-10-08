"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { ChangeAvatarSchema } from "../schemas/change-avatar";

export const changeAvatar = async (
  values: z.infer<typeof ChangeAvatarSchema>,
) => {
  const validatedFields = ChangeAvatarSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { url } = validatedFields.data;

  try {
    await auth.api.updateUser({
      body: {
        image: url,
      },
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: MESSAGES.USER_AVATAR_UPDATE,
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

export const removeAvatar = async () => {
  try {
    await auth.api.updateUser({
      body: {
        image: "",
      },
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: MESSAGES.USER_AVATAR_REMOVE,
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
