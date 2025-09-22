import { MAX_PASSWORD, MIN_PASSWORD } from "@/constants/misc";
import { USERNAME_SCHEMA } from "@/schemas/form";
import { z } from "zod";
import { passwordRefine } from "../utils/password-refine";

export const LoginSchema = z.object({
  email: z.union([z.email(), USERNAME_SCHEMA]),
  password: z
    .string()
    .min(MIN_PASSWORD, {
      message: `Password must be ${MIN_PASSWORD} or more characters long`,
    })
    .max(MAX_PASSWORD, {
      message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
    })
    .superRefine((password, ctx) => passwordRefine(password, ctx)),
});
