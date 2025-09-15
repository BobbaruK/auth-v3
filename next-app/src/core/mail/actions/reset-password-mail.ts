"use server";

import { resend } from "@/lib/resend";
import React from "react";
import ResetPasswordEmail from "../components/reset-password-email";

export const sendResetPasswordMail = async ({
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
    subject: "Reset your password",
    react: React.createElement(ResetPasswordEmail, {
      name,
      email,
      url,
    }),
  });
};
