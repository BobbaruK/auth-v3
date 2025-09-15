import { z } from "zod";

export const ResetPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});
