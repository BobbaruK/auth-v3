"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import z from "zod";
import { LoginSchema } from "../schemas/login";

type SignInResponse =
  | {
      success: string;
      error?: null;
    }
  | {
      success?: null;
      error: string;
    };

export const signInEmail = async (
  values: z.infer<typeof LoginSchema>
): Promise<SignInResponse> => {
  const { email, password } = values;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      // asResponse : true
    });

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
    console.log("rev");

    return {
      success: "Login successful. Good to have you back.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: "Oops! Something went wrong while logging in.",
      };
    }

    return {
      error: "Internal Server Error",
    };
  }
};
