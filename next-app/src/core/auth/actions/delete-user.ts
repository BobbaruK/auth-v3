"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { DeleteAccountSchema } from "../schemas/delete-account";

export const deleteUser = async (
  values: z.infer<typeof DeleteAccountSchema>,
  userEmail: string,
) => {
  const validatedFields = DeleteAccountSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { email } = validatedFields.data;

  if (userEmail !== email)
    return {
      error: MESSAGES.EMAIL_OLD_NOT_MATCH,
    };

  try {
    const data = await auth.api.deleteUser({
      body: {
        callbackURL: "/goodbye",
      },
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: data.message,
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
