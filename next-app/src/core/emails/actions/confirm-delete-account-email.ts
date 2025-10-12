"use server";

import { resend } from "@/lib/resend";
import React from "react";
import DeleteAccountConfirmationEmail from "../components/confirm-delete-account-email";

export const confirmDeleteAccountMail = async ({
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
    subject: "Confirm account deletion - Action required",
    react: React.createElement(DeleteAccountConfirmationEmail, {
      name,
      email,
      url,
    }),
  });
};
