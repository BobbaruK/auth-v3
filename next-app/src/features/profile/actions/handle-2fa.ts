"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { Handle2faSchema } from "../schemas/handle-2fa";
import z from "zod";
import { MESSAGES } from "@/constants/messages";

export const enable2fa = async (values: z.infer<typeof Handle2faSchema>) => {
  const validatedFields = Handle2faSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { password } = validatedFields.data;

  try {
    const data = await auth.api.enableTwoFactor({
      body: {
        password,
      },
      headers: await headers(),
    });

    return {
      success: "QR code generated. Scan with your phone.",
      totpURI: data.totpURI,
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

export const disable2fa = async (values: z.infer<typeof Handle2faSchema>) => {
  const validatedFields = Handle2faSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { password } = validatedFields.data;

  try {
    await auth.api.disableTwoFactor({
      body: {
        password,
      },
      headers: await headers(),
    });

    return {
      success: MESSAGES.TWO_FACTOR_DISABLED,
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
