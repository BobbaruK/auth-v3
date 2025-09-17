import { ac, roles } from "@/lib/permissions";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    adminClient({
      ac,
      roles: roles,
    }),
    twoFactorClient(),
  ],
});

export const { signUp, signOut, signIn, useSession, twoFactor } = authClient;
