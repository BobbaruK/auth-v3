"use server";

import { resend } from "@/lib/resend";
import React from "react";
import { ConfirmEmail } from "../components/confirm-email";

export const sendVerificationMail = async ({
  name,
  email,
  url,
}: {
  name: string;
  email: string;
  url: string;
  token?: string;
}) => {
  await resend.emails.send({
    from: "Admin <admin@scsseco.eu>",
    to: email,
    subject: "Confirm email",
    react: React.createElement(ConfirmEmail, {
      name,
      url,
    }),
  });
};
