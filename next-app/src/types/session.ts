import { auth } from "@/lib/auth";

export type UserSession = typeof auth.$Infer.Session.user;
