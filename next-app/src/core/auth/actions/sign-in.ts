"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { EMAIL } from "@/schemas/form";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { LoginSchema } from "../schemas/login";

const emailSchema = EMAIL;
// const usernameSchema = USERNAME;

type SignInResponse =
  | {
      success?: undefined;
      redirectOTP?: undefined;
      error: string;
    }
  | {
      success: string;
      redirectOTP: boolean;
      error?: undefined;
    }
  | {
      success: string;
      redirectOTP?: undefined;
      error?: undefined;
    };

const signInEmail = async (
  values: z.infer<typeof LoginSchema>,
): Promise<SignInResponse> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { email, password } = validatedFields.data;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
      // asResponse : true
    });

    if ("twoFactorRedirect" in response)
      return {
        success: MESSAGES.ENTER_OTP,
        redirectOTP: true,
      };

    // manual set cookies
    // const setCookieHeader = res.headers.get("set-cookie");
    // if (setCookieHeader) {
    //   const cookie = parseSetCookieHeader(setCookieHeader);
    //   const cookieStore = await cookies();

    //   const [key, cookieAttrs] = [...cookie.entries()][0];
    //   const value = cookieAttrs.value;
    //   const maxAge = cookieAttrs["max-age"];
    //   const path = cookieAttrs.path;
    //   const httpOnly = cookieAttrs.httponly;
    //   const sameSite = cookieAttrs.samesite;

    //   cookieStore.set(key, decodeURIComponent(value), {
    //     maxAge,
    //     path,
    //     httpOnly,
    //     sameSite,
    //   });
    // }

    revalidatePath("/");

    return {
      success: MESSAGES.LOGIN_SUCCESS,
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

const signInUsername = async (
  values: z.infer<typeof LoginSchema>,
): Promise<SignInResponse> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { email: username, password } = validatedFields.data;

  try {
    const data = await auth.api.signInUsername({
      body: {
        username,
        password,
      },
      headers: await headers(),
    });

    if (data && "twoFactorRedirect" in data)
      return {
        success: MESSAGES.ENTER_OTP,
        redirectOTP: true,
      };

    return {
      success: MESSAGES.LOGIN_SUCCESS,
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

export const signIn = async (
  values: z.infer<typeof LoginSchema>,
): Promise<SignInResponse> => {
  if (emailSchema.safeParse(values.email).success) {
    return await signInEmail(values);
  }

  return await signInUsername(values);
};
