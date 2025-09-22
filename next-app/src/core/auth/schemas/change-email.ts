import { EMAIL } from "@/schemas/form";
import { z } from "zod";

export const ChangeEmailSchema = z
  .object({
    email: EMAIL,
    confirmEmail: EMAIL,
  })
  .refine((data) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Emails do not match",
  });
