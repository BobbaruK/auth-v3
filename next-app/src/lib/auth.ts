import { ADMIN_EMAILS, OWNER_EMAILS } from "@/constants/admin";
import { MESSAGES } from "@/constants/messages";
import {
  DELETE_ACCOUNT_TOKEN_EXPIRES,
  MAGIC_LINK_TOKEN_EXPIRES,
  MAX_USERNAME,
  MIN_PASSWORD,
  MIN_USERNAME,
  RESET_PASSWORD_TOKEN_EXPIRES,
  SESSION_EXPIRES,
  SESSION_FRESH_AGE,
  VALID_DOMAINS,
  VERIFICATION_MAIL_TOKEN_EXPIRES,
} from "@/constants/misc";
import { DEFAULT_API_ERROR_REDIRECT } from "@/constants/routes";
import { sendChangeEmail } from "@/core/emails/actions/change-email";
import { confirmDeleteAccountEmail } from "@/core/emails/actions/confirm-delete-account-email";
import { sendMagicLinkEmail } from "@/core/emails/actions/magic-link";
import { sendResetPasswordEmail } from "@/core/emails/actions/reset-password-email";
import { sendVerificationEmail } from "@/core/emails/actions/verification-email";
import { UserRole } from "@/generated/prisma";
import { ac, roles } from "@/lib/permissions";
import db from "@/lib/prisma";
import { UserSession } from "@/types/session";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  lastLoginMethod,
  magicLink,
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
      lastLoginAt: {
        type: "date",
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        const actualUser = user as UserSession;

        await sendChangeEmail({
          name: actualUser.firstName,
          oldMail: actualUser.email,
          newMail: newEmail,
          url,
          token,
        });
      },
    },
    deleteUser: {
      enabled: true,
      deleteTokenExpiresIn: DELETE_ACCOUNT_TOKEN_EXPIRES,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        const actualUser = user as UserSession;

        await confirmDeleteAccountEmail({
          name: actualUser.firstName,
          url,
          email: actualUser.email,
          token,
        });
      },
    },
  },
  account: {
    modelName: "auth_account",
    accountLinking: {
      enabled: true,
    },
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
    resetPasswordTokenExpiresIn: RESET_PASSWORD_TOKEN_EXPIRES,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }) => {
      const actualUser = user as UserSession;

      await sendResetPasswordEmail({
        email: actualUser.email,
        name: actualUser.firstName,
        url,
        token,
      });
    },
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // onPasswordReset: async ({ user }) => {
    //   // your logic here
    //   // console.log(`Password for user ${user.email} has been reset.`);
    // },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    expiresIn: VERIFICATION_MAIL_TOKEN_EXPIRES,
    sendVerificationEmail: async ({ user, url, token }) => {
      const actualUser = user as UserSession;

      await sendVerificationEmail({
        name: actualUser.firstName,
        email: actualUser.email,
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
            message: MESSAGES.INVALID_FIELDS,
          });
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, context) => {
          const timestamp = new Date().getTime();
          const firstName = `Jon_${timestamp}`;
          const lastName = `Doe_${timestamp}`;
          const username = `doughnut_${timestamp}`;
          const displayUsername = `Doughnut_${timestamp}`;
          const name = `${firstName} ${lastName}`;

          const magicLinkData =
            context?.path === "/magic-link/verify"
              ? {
                  firstName,
                  lastName,
                  username,
                  name,
                  displayUsername,
                }
              : {};

          // Emails
          if (OWNER_EMAILS.includes(user.email))
            return {
              data: {
                ...user,
                ...magicLinkData,
                role: UserRole.OWNER,
              },
            };

          if (ADMIN_EMAILS.includes(user.email))
            return {
              data: {
                ...user,
                ...magicLinkData,
                role: UserRole.ADMIN,
              },
            };

          return {
            data: {
              ...user,
              ...magicLinkData,
            },
          };
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          try {
            await db.$transaction([
              db.auth_user.update({
                where: { id: session.userId },
                data: { lastLoginAt: new Date() },
              }),
            ]);
          } catch (error) {
            console.error(
              "[Auth Hook] Failed to update lastLoginAt (session.create.after):",
              error,
            );
          }
        },
      },
    },
  },
  onAPIError: {
    errorURL: DEFAULT_API_ERROR_REDIRECT,
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
    magicLink({
      expiresIn: MAGIC_LINK_TOKEN_EXPIRES,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sendMagicLink: async ({ email, token, url }, request) => {
        const domain = email.split("@")[1];

        if (!VALID_DOMAINS.includes(domain))
          throw new APIError("BAD_REQUEST", {
            message: MESSAGES.INVALID_FIELDS,
          });

        // send email to user
        await sendMagicLinkEmail({
          email,
          url,
          token,
        });
      },
    }),
    nextCookies(),
  ],
});
