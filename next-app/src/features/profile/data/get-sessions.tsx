"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSessions = async () => {
  try {
    const sessions = await auth.api.listSessions({
      headers: await headers(),
    });

    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });

    console.log({ sessions, currentSession });

    return { sessions, currentSession };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    return null;
  }
};
