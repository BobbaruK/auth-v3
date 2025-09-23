import { ac, roles } from "@/lib/permissions";
import {
  adminClient,
  inferAdditionalFields,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    adminClient({
      ac,
      roles: roles,
    }),
    twoFactorClient(),
    usernameClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const {
  signUp,
  signOut,
  signIn,
  useSession,
  twoFactor,
  updateUser,
  deleteUser,
} = authClient;
