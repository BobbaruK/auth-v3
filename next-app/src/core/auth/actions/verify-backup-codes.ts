"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { RecoverAccountSchema } from "../schemas/recover-account";

export const verifyBackupCodes = async (
  values: z.infer<typeof RecoverAccountSchema>,
) => {
  const validatedFields = RecoverAccountSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { code, remember } = validatedFields.data;

  try {
    await auth.api.verifyBackupCode({
      body: {
        code,
        disableSession: false,
        trustDevice: remember,
      },
      headers: await headers(),
    });

    revalidatePath("/");

    return {
      success: MESSAGES.BACKUPCODE_SUCCESS,
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
