import { ADMIN_EMAILS, OWNER_EMAILS } from "@/constants/admin";
import { MIN_PASSWORD, SESSION_EXPIRES, VALID_DOMAINS } from "@/constants/misc";
import { sendResetPasswordMail } from "@/core/mail/actions/reset-password-mail";
import { sendVerificationMail } from "@/core/mail/actions/verification-mail";
import { UserRole } from "@/generated/prisma";
import { ac, roles } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

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
    expiresIn: SESSION_EXPIRES,
  },
  verification: {
    modelName: "auth_verification",
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MIN_PASSWORD,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendResetPasswordMail({
        email: user.email,
        name: user.name,
        url,
        token,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPasswordReset: async ({ user }) => {
      // your logic here
      // console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendVerificationMail({
        name: user.name,
        email: user.email,
        url,
        token,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
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
  databaseHooks: {
    user: {
      create: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        before: async (user, context) => {
          if (OWNER_EMAILS.includes(user.email))
            return {
              data: {
                ...user,
                role: UserRole.OWNER,
              },
            };

          if (ADMIN_EMAILS.includes(user.email))
            return {
              data: {
                ...user,
                role: UserRole.ADMIN,
              },
            };

          return {
            data: {
              ...user,
            },
          };
        },
      },
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN, UserRole.OWNER],
      ac,
      roles: roles,
    }),
  ],
});
