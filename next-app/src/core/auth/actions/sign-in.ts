"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { LoginSchema } from "../schemas/login";
import { MESSAGES } from "@/constants/messages";

type SignInResponse =
  | {
      success: string;
      redirectOTP: boolean;
      error?: null;
    }
  | {
      success?: null;
      error: string;
    };

export const signIn = async (
  values: z.infer<typeof LoginSchema>
): Promise<SignInResponse> => {
  const { email, password } = values;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
      // asResponse : true
    });

    revalidatePath("/login", "layout");

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

    return {
      success: MESSAGES.LOGIN_SUCCESS,
      redirectOTP: false,
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
