import { MIN_PASSWORD, VALID_DOMAINS } from "@/constants/misc";
import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    modelName: "auth_user",
  },
  account: {
    modelName: "auth_account",
  },
  session: {
    modelName: "auth_session",
    expiresIn: 60 * 60 * 24 * 30,
  },
  verification: {
    modelName: "auth_verification",
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MIN_PASSWORD,
    autoSignIn: false,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];

        if (!VALID_DOMAINS.includes(domain))
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain. Please use a valid email.",
          });
      }
    }),
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [nextCookies()],
});
