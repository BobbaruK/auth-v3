import { ADMIN_EMAILS, OWNER_EMAILS } from "@/constants/admin";
import {
  MAX_USERNAME,
  MIN_PASSWORD,
  MIN_USERNAME,
  SESSION_EXPIRES,
  SESSION_FRESH_AGE,
  VALID_DOMAINS,
} from "@/constants/misc";
import { sendChangeMail } from "@/core/mail/actions/change-email";
import { confirmDeleteAccountMail } from "@/core/mail/actions/confirm-delete-account-email";
import { sendResetPasswordMail } from "@/core/mail/actions/reset-password-mail";
import { sendVerificationMail } from "@/core/mail/actions/verification-mail";
import { UserRole } from "@/generated/prisma";
import { ac, roles } from "@/lib/permissions";
import db from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  lastLoginMethod,
  twoFactor,
  username,
} from "better-auth/plugins";

export const auth = betterAuth({
  appName: "Auth v3",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  user: {
    modelName: "auth_user",
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      bio: {
        type: "string",
        required: false,
      },
      isAccountVisible: {
        type: "boolean",
        required: false,
      },
      lastLoginMethod: {
        type: "string",
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        await sendChangeMail({
          name: user.name,
          oldMail: user.email,
          newMail: newEmail,
          url,
          token,
        });
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        await confirmDeleteAccountMail({
          name: user.name,
          url,
          email: user.email,
          token,
        });
      },
    },
  },
  account: {
    modelName: "auth_account",
  },
  session: {
    modelName: "auth_session",
    expiresIn: SESSION_EXPIRES,
    freshAge: SESSION_FRESH_AGE,
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
      mapProfileToUser: (profile) => ({
        firstName: profile.name.split(" ")[0],
        lastName: profile.name.split(" ")[1] || profile.name.split(" ")[0],
        username: `${profile.login}_${new Date().getTime()}`,
        displayUsername: `${profile.login}_${new Date().getTime()}`,
      }),
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => ({
        firstName: profile.given_name,
        lastName: profile.family_name,
        username: `${profile.given_name}_${new Date().getTime()}`,
        displayUsername: `${profile.given_name}_${new Date().getTime()}`,
      }),
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
          // Emails
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
    session: {
      create: {
        after: async (session, context) => {
          console.log({ session, context });

          // return {
          //   data: {
          //     ...session,
          //   },
          // };
        },
      },
    },
  },
  onAPIError: {
    // throw: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (error, ctx) => {
      // Custom error handling
      console.error("Auth error:", error);
    },
    errorURL: "/auth/error",
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN, UserRole.OWNER],
      ac,
      roles: roles,
    }),
    twoFactor({
      schema: {
        twoFactor: {
          modelName: "auth_two_factor",
        },
        user: {
          modelName: "auth_user",
        },
      },
      totpOptions: {},
      // skipVerificationOnEnable: true,
      otpOptions: {
        sendOTP: async ({ user, otp }) => {
          console.log(`Send email to ${user.name} -  otp: ${otp}`);
        },
      },
    }),
    username({
      minUsernameLength: MIN_USERNAME,
      maxUsernameLength: MAX_USERNAME,
    }),
    lastLoginMethod({
      storeInDatabase: true,
    }),
    nextCookies(),
  ],
});
