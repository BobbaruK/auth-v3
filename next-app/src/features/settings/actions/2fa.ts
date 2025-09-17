"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export const enable2fa = async (password: string) => {
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
    if (error instanceof APIError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Internal Server Error",
    };
  }
};

export const verifyTOTP = async (code: string) => {
  try {
    const data = await auth.api.verifyTOTP({
      body: {
        code,
        trustDevice: true,
      },
      headers: await headers(),
    });

    return {
      success: "Noice",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Internal Server Error",
    };
  }
};

export const disable2fa = async (pass: string) => {
  try {
    const data = await auth.api.disableTwoFactor({
      body: {
        password: pass,
      },
      headers: await headers(),
    });

    return {
      success: "You have successfully disabled 2 factor authentication.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Internal Server Error",
    };
  }
};
