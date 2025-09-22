"use server";

import { resend } from "@/lib/resend";
import React from "react";
import ChangeEmailTemplate from "../components/change-email";

export const sendChangeMail = async ({
  name,
  newMail,
  oldMail,
  url,
}: {
  name: string;
  oldMail: string;
  newMail: string;
  url: string;
  token?: string;
}) => {
  await resend.emails.send({
    from: "Admin <admin@scsseco.eu>",
    to: oldMail,
    subject: "Confirm your new email address - Action required",
    react: React.createElement(ChangeEmailTemplate, {
      name,
      oldMail,
      newMail,
      url,
    }),
  });
};
