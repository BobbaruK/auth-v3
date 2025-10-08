"use server";

import { MESSAGES } from "@/constants/messages";
import { auth } from "@/lib/auth";
import { EMAIL } from "@/schemas/form";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";
import { LoginSchema } from "../schemas/login";

type SignInType = "email" | "username";

const emailSchema = EMAIL;
// const usernameSchema = USERNAME;

const handleSignIn = async (
  type: SignInType,
  values: z.infer<typeof LoginSchema>,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGES.INVALID_FIELDS };

  const { email, password } = validatedFields.data;
  try {
    let response;

    switch (type) {
      case "email":
        response = await auth.api.signInEmail({
          body: {
            email,
            password,
          },
          headers: await headers(),
          // asResponse : true
        });
        break;

      case "username":
        response = await auth.api.signInUsername({
          body: {
            username: email, // username and email are the same field
            password,
          },
          headers: await headers(),
        });
        break;
    }

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

    if (response && "twoFactorRedirect" in response)
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

export const signIn = async (values: z.infer<typeof LoginSchema>) => {
  const type: SignInType = emailSchema.safeParse(values.email).success
    ? "email"
    : "username";

  return handleSignIn(type, values);
};
